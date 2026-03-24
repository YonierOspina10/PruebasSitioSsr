<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying sponsors and copyright information.
 */
export default defineComponent({
    props: {
        /**
         * Title for the sponsor section.
         */
        sponsorTitle: {
            type: String,
            default: 'Patrocinador Oficial:',
        },
        /**
         * Object containing sponsor data.
         */
        sponsors: Object,
        /**
         * Copyright text to be displayed.
         */
        copyright: {
            type: String,
            default: 'Todos los derechos reservados.',
        },
    },
    data() {
        // Reference to the app component for accessing configuration.
        let appComponent: any = this.$appComponent;
        return {
            appComponent,
        };
    },
    methods: {
        // Clamp widths to avoid requesting oversized images
        clampW(val?: number) {
            const n = typeof val === 'number' ? val : Number(val);
            if (!Number.isFinite(n)) return undefined;
            const intW = Math.round(n);
            return Math.min(800, Math.max(1, intW));
        },

        buildImgUrl(imageUrl: string, w?: number) {
            if (!imageUrl) return '';
            const rawInput = String(imageUrl).trim();
            // Do not rewrite non-network URLs
            if (rawInput.startsWith('data:') || rawInput.startsWith('blob:')) return rawInput;
            const imgixHost = this.appComponent.config !=undefined && this.appComponent.config.urlApi != undefined &&
            this.appComponent.config.urlApi.prefixImg != undefined
                ? this.appComponent.config.urlApi.prefixImg
                :'images.virtualsoft.tech/m';

            // imgixHost/prefixImg puede venir sin protocolo (ej: xa88.../v7/_vsimg_/m)
            // Normalizamos a base URL válido y aseguramos trailing slash.
            const basePrefixUrl = (() => {
                const raw = String(imgixHost || '').trim();
                const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
                const u = new URL(withProto);
                u.pathname = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
                return u;
            })();

            const baseHasM = /\/m\/?$/.test(basePrefixUrl.pathname);

            // Normaliza variantes cloudimg para evitar duplicaciones (/v7/_vsimg_/m/... o /v7/_vsimg_/...)
            const normalizeCloudimgPath = (p: string) => {
                if (!p) return p;
                if (p.startsWith('/v7/_vsimg_/m/')) return `/m/${p.slice('/v7/_vsimg_/m/'.length)}`;
                if (p.startsWith('/v7/_vsimg_/')) return `/${p.slice('/v7/_vsimg_/'.length)}`;
                return p;
            };

            // Si el pathname ya incluye el prefijo del base (ej: /v7/_vsimg_/m/), lo removemos
            // para evitar /v7/_vsimg_/m/v7/_vsimg_/m/...
            const stripBasePrefix = (path: string) => {
                const basePath = basePrefixUrl.pathname.endsWith('/') ? basePrefixUrl.pathname : `${basePrefixUrl.pathname}/`;
                return path.startsWith(basePath) ? path.slice(basePath.length - 1) : path;
            };

            try {
                const srcUrl = (() => {
                    if (rawInput.startsWith('http://') || rawInput.startsWith('https://')) return new URL(rawInput);
                    if (rawInput.startsWith('//')) return new URL(`${window.location.protocol}${rawInput}`);

                    // Relative/filename URLs: treat as Imgix assets (avoid localhost paths)
                    let path = rawInput;
                    if (!path.startsWith('/')) path = `/${path}`;
                    // Normalize legacy /m/ prefix to Imgix root
                    if (path.startsWith('/m/')) path = path.slice(2);
                    if (path === '/m') path = '/';

                    // Resolver sobre basePrefixUrl para evitar duplicaciones de path en Cloudimg
                    path = normalizeCloudimgPath(path);
                    if (baseHasM && path.startsWith('/m/')) path = path.slice(2);
                    if (baseHasM && path === '/m') path = '/';
                    return new URL(path.replace(/^\/+/, ''), basePrefixUrl.toString());
                })();

                const normalizedPathname = normalizeCloudimgPath(srcUrl.pathname);
                const pathForRel = stripBasePrefix(normalizedPathname);

                // Construimos SIEMPRE sobre basePrefixUrl (cloudimg o legacy), evitando duplicar segmentos.
                const relPath = baseHasM
                    ? pathForRel.replace(/^\/m\//, '').replace(/^\/+/, '')
                    : pathForRel.replace('/m/', '/').replace(/^\/+/, '');

                const targetUrl = new URL(relPath, basePrefixUrl.toString());

                const sp = new URLSearchParams(srcUrl.search);
                const targetW = this.clampW(w);
                if (typeof targetW === 'number') sp.set('w', String(targetW));

                // Compression / format defaults
                if (!sp.has('auto') && !sp.has('fm')) sp.set('auto', 'format,compress');
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Quality: more aggressive on mobile. Respect if already provided.
                const isMobile = this.appComponent?.config?.mobileL != undefined && this.appComponent?.config?.mobileL != '';
                if (!sp.has('q')) sp.set('q', isMobile ? '70' : '78');

                // DPR for crisp logos with controlled size
                if (!sp.has('dpr')) sp.set('dpr', '2');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                // Fallback: keep the base URL and append our defaults.
                const baseUrl = (() => {
                    const raw = String(imageUrl).trim();
                    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:') || raw.startsWith('blob:')) return raw.split('?')[0];
                    if (raw.startsWith('//')) return `${window.location.protocol}${raw}`.split('?')[0];
                    let path = raw;
                    if (!path.startsWith('/')) path = `/${path}`;
                    path = normalizeCloudimgPath(path);
                    if (baseHasM && path.startsWith('/m/')) path = path.slice(2);
                    if (baseHasM && path === '/m') path = '/';
                    return new URL(path.replace(/^\/+/, ''), basePrefixUrl.toString()).toString().split('?')[0];
                })();
                const qs: string[] = [];
                const targetW = this.clampW(w);
                if (typeof targetW === 'number') qs.push(`w=${targetW}`);
                qs.push('auto=format,compress');
                qs.push('fit=max');
                const isMobile = this.appComponent?.config?.mobileL != undefined && this.appComponent?.config?.mobileL != '';
                qs.push(`q=${isMobile ? '70' : '78'}`);
                qs.push('dpr=2');
                return `${baseUrl}?${qs.join('&')}`;
            }
        },

        // Builds { src, srcset, sizes } for a fixed-size logo.
        // Using fixed px sizes prevents Lighthouse from assuming 100vw downloads.
        getImgAttrs(imageUrl: string, displayW?: number) {
            const w = this.clampW(displayW) ?? 320;
            const candidates = [w, this.clampW(w * 2)].filter(Boolean) as number[];

            const src = this.buildImgUrl(imageUrl, w);
            const srcset = candidates
                .map((cw) => `${this.buildImgUrl(imageUrl, cw)} ${cw}w`)
                .join(', ');

            return {
                src,
                srcset,
                sizes: `${w}px`,
                decoding: 'async',
            };
        },
    },
});
</script>

<template>
    <!-- Main section for displaying sponsors and copyright -->
    <section class="w-full h-full flex justify-start items-center flex-col gap-4">
        <!-- Sponsor title displayed at the top -->
        <span
            class="div-text text-center text-info-text mx-auto w-full"
            v-html="$t(sponsorTitle)"
        >
        </span>
        <div class="flex flex-col justify-center items-center gap-5">
            <!-- List of sponsors -->
            <ul class="flex flex-wrap justify-center items-center gap-5">
                <li v-for="sponsor in sponsors">
                    <!-- Link to sponsor's website if available -->
                    <a
                        v-if="sponsor.href != '' && sponsor.href != undefined"
                        :href="sponsor.href"
                    >
                        <!-- Sponsor logo image with responsive srcset -->
                        <img
                            :width="sponsor.width"
                            :height="sponsor.height"
                            :alt="sponsor.title"
                            v-bind="getImgAttrs(sponsor.img, sponsor.width)"
                            loading="lazy"
                            v-if="sponsor.show"
                        />
                    </a>
                    <span v-else>
                        <!-- Fallback image if no link is provided -->
                        <img
                            :class="{
                                'max-w-[45px] max-h-[45px] md:max-h-[80px] md:max-w-[80px]':
                                    appComponent.config.layout != undefined && appComponent.config.layout == 4,
                            }"
                            :width="sponsor.width"
                            :height="sponsor.height"
                            :alt="sponsor.title"
                            v-bind="getImgAttrs(sponsor.img, sponsor.width)"
                            loading="lazy"
                            v-if="sponsor.show"
                        />
                    </span>
                </li>
            </ul>
            <!-- Conditional display of additional image based on configuration -->
            <img
                v-if="
                    appComponent.config.footer_ != undefined && appComponent.config.footer_.show_18_more != undefined && appComponent.config.footer_.show_18_more.show != undefined
                        ? appComponent.config.footer_.show_18_more.show
                        : appComponent.config.footer.show18text.show
                "
                v-bind="getImgAttrs(
                    appComponent.config.footer_ != undefined && appComponent.config.footer_.show_18_more != undefined && appComponent.config.footer_.show_18_more.src != undefined ? appComponent.config.footer_.show_18_more.src : appComponent.config.footer.show18text.src,
                    46,
                )"
                width="46"
                height="46"
                loading="lazy"
                alt="+18 Años"
            />
            <!-- Copyright information displayed at the bottom -->
            <span
                v-if="copyright"
                v-html="$t(copyright)"
                class="text-center text-info-text/50"
            ></span>
        </div>
    </section>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->
