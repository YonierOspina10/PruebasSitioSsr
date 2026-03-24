<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying payment providers.
 */
export default defineComponent({
    props: {
        /**
         * Object containing payment provider data.
         */
        providers: Object,
    },
    data() {
        /**
         * Retrieves the app component instance.
         * @type {any}
         */
        let appComponent: any = this.$appComponent;
        return {
            appComponent,
        };
    },
    methods: {
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

                // Cloudimg suele exponer: /v7/_vsimg_/m/<file>
                if (p.startsWith('/v7/_vsimg_/m/')) return `/m/${p.slice('/v7/_vsimg_/m/'.length)}`;

                // A veces viene como: /v7/_vsimg_/<file>
                if (p.startsWith('/v7/_vsimg_/')) return `/${p.slice('/v7/_vsimg_/'.length)}`;

                // Protección extra: si el base ya trae /v7/_vsimg_/ (como parte del pathname),
                // y el path entrante aún lo incluye, recortarlo para evitar duplicación.
                if (basePrefixUrl.pathname.includes('/v7/_vsimg_/') && p.startsWith('/v7/_vsimg_/')) {
                    return `/${p.slice('/v7/_vsimg_/'.length)}`;
                }

                return p;
            };

            // Si el pathname ya incluye el prefijo del base (ej: /v7/_vsimg_/m/), lo removemos
            // para evitar /v7/_vsimg_/m/v7/_vsimg_/m/...
            const stripBasePrefix = (path: string) => {
                const basePath = basePrefixUrl.pathname.endsWith('/') ? basePrefixUrl.pathname : `${basePrefixUrl.pathname}/`;
                return path.startsWith(basePath) ? path.slice(basePath.length - 1) : path;
            };

            try {
                const raw = rawInput;

                // 1) Absolute URLs: parse as-is.
                // 2) Protocol-relative URLs: add current protocol.
                // 3) Relative/filename URLs: treat as Imgix assets (avoid localhost paths).
                const srcUrl = (() => {
                    if (raw.startsWith('http://') || raw.startsWith('https://')) return new URL(raw);
                    if (raw.startsWith('//')) return new URL(`${window.location.protocol}${raw}`);

                    // Build an Imgix URL directly (do NOT use window.location.origin)
                    // Accept: "m/xxx.png", "/m/xxx.png", "xxx.png", "folder/xxx.png"
                    let path = raw;
                    if (!path.startsWith('/')) path = `/${path}`;

                    // Normalize cloudimg path variants
                    path = normalizeCloudimgPath(path);

                    // If base already has /m/, avoid duplicating it
                    if (baseHasM && path.startsWith('/m/')) path = path.slice(2);
                    if (baseHasM && path === '/m') path = '/';

                    return new URL(path.replace(/^\/+/, ''), basePrefixUrl.toString());
                })();

                const normalizedPathname = normalizeCloudimgPath(srcUrl.pathname);
                const pathForRel = stripBasePrefix(normalizedPathname);

                let relPath = baseHasM
                    ? pathForRel.replace(/^\/m\//, '').replace(/^\/+/, '')
                    : pathForRel.replace('/m/', '/').replace(/^\/+/, '');

                // Si el base ya trae /v7/_vsimg_/m/, no queremos relPath empezando con v7/_vsimg_/
                // porque terminaría duplicado ( /v7/_vsimg_/m/v7/_vsimg_/... ).
                if (basePrefixUrl.pathname.includes('/v7/_vsimg_/') && relPath.startsWith('v7/_vsimg_/')) {
                    relPath = relPath.slice('v7/_vsimg_/'.length);
                }

                const targetUrl = new URL(relPath, basePrefixUrl.toString());

                // Start from original query string (keeps any business params that might arrive)
                const sp = new URLSearchParams(srcUrl.search);

                const normalizeW = (val?: number) => {
                    if (typeof val !== 'number' || Number.isNaN(val)) return undefined;
                    const intW = Math.round(val);
                    // Hard cap to keep requests reasonable even if a wrong value leaks in
                    return Math.min(800, Math.max(1, intW));
                };

                const targetW = normalizeW(w);
                if (typeof targetW === 'number') {
                    sp.set('w', String(targetW));
                }

                // Compression / format defaults
                // - Prefer auto=format,compress unless the URL already specifies auto or fm
                if (!sp.has('auto') && !sp.has('fm')) {
                    sp.set('auto', 'format,compress');
                }
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Quality: slightly more aggressive on mobile. Respect if already provided.
                const isMobile = this.appComponent?.config?.mobileL != undefined && this.appComponent?.config?.mobileL != '';
                if (!sp.has('q')) sp.set('q', isMobile ? '70' : '78');

                // DPR helps crisp logos while keeping file size under control with lower q.
                if (!sp.has('dpr')) sp.set('dpr', '2');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                // Safe fallback: keep the base URL and append our defaults.
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
                const targetW = (() => {
                    if (typeof w !== 'number' || Number.isNaN(w)) return undefined;
                    const intW = Math.round(w);
                    return Math.min(800, Math.max(1, intW));
                })();
                if (typeof targetW === 'number') qs.push(`w=${targetW}`);
                qs.push('auto=format,compress');
                qs.push('fit=max');
                const isMobile = this.appComponent?.config?.mobileL != undefined && this.appComponent?.config?.mobileL != '';
                qs.push(`q=${isMobile ? '70' : '78'}`);
                qs.push('dpr=2');
                return `${baseUrl}?${qs.join('&')}`;
            }
        },

        buildSrcset(imageUrl: string, widths: number[]) {
            const uniq = Array.from(new Set(widths)).sort((a, b) => a - b);
            return uniq.map((w) => `${this.buildImgUrl(imageUrl, w)} ${w}w`).join(', ');
        },

        // Atributos optimizados para logos pequeños (slot 65px) con 1x/2x/3x
        getImgAttrsProvider(imageUrl: string, displayWidth = 65) {
            if (!imageUrl) return { src: '', srcset: '', sizes: '' };
            const w1 = Math.max(1, Math.round(displayWidth));
            const widths = [w1, w1 * 2, w1 * 3];
            return {
                src: this.buildImgUrl(imageUrl, w1),
                srcset: this.buildSrcset(imageUrl, widths),
                sizes: `${w1}px`,
            };
        },

        // Build a safe fallback URL pointing to the legacy image origin.
        // Many ICON values arrive as relative paths (e.g., "msj....png" or "m/msj....png").
        // This ensures we can retry without Imgix if the Imgix URL fails.
        buildLegacyImgUrl(imageUrl: string) {
            if (!imageUrl) return '';
            const raw = String(imageUrl).trim();
            if (raw.startsWith('data:') || raw.startsWith('blob:')) return raw;
            if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
            if (raw.startsWith('//')) return `${window.location.protocol}${raw}`;

            // Legacy origin used previously in the project
            const legacyHost = 'https://images.virtualsoft.tech';

            let path = raw;
            if (!path.startsWith('/')) path = `/${path}`;
            // Ensure legacy paths are under /m/ when missing
            if (!path.startsWith('/m/')) {
                // If it already contains a folder, keep it; otherwise default to /m/
                const looksLikeFolder = path.split('/').filter(Boolean).length > 1;
                if (!looksLikeFolder) path = `/m${path}`;
            }
            return `${legacyHost}${path}`;
        },

        // If Imgix fails, retry once with legacy origin.
        onProviderImgError(e: Event, originalIcon: string) {
            const img = e.target as HTMLImageElement | null;
            if (!img) return;

            // Avoid infinite loops
            if (img.dataset.fallbackApplied === '1') return;
            img.dataset.fallbackApplied = '1';

            const legacy = this.buildLegacyImgUrl(originalIcon);
            if (!legacy) return;

            // Remove responsive candidates to force the browser to use the fallback src
            img.removeAttribute('srcset');
            img.removeAttribute('sizes');
            img.src = legacy;
        },
    },
});
</script>

<template>
    <!-- Main container for the payment providers section -->
    <div class="overflow-x-auto px-5 flex flex-col pt-2 justify-center items-center w-full">
        <!-- Title for the payment providers section -->
        <span class="text-info-text font-bold">{{ $t('MEDIOS DE PAGO:') }}</span>
        <!-- Container for the payment provider icons -->
        <div
            class="w-full flex flex-wrap gap-8 md:gap-16 justify-center items-center py-4 max-w-[1000px] [&>*]:w-[65px] [&>*]:h-[40px] [&>*]:flex-shrink-0"
        >
            <!-- Loop through each provider and create a link to the deposit management page -->
            <RouterLink
                v-for="value in providers"
                to="/gestion/deposito"
                target="_blank"
                class="block w-[65px] h-[40px]"
            >
                <!-- Image for the payment provider icon -->
                <img
                    v-if="value.ICON != undefined && value.showF"
                    width="65"
                    height="40"
                    :alt="value.NAME"
                    class="object-contain h-full"
                    loading="lazy"
                    :class="value.NAME"
                    v-bind="getImgAttrsProvider(value.ICON, 65)"
                    decoding="async"
                    @error="onProviderImgError($event, value.ICON)"
                />
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->
