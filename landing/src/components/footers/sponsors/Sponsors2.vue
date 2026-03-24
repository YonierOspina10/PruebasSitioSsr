<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the main application component.
 */
export default defineComponent({
    data() {
        // Retrieve configuration and app component data
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        return {
            config,
            appComponent,
        };
    },
    methods: {
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

                    return new URL(`https://${imgixHost}${path}`);
                })();

                // If it comes from legacy origins (images.* or virtualsoft.tech) or uses /m/, rewrite to Imgix
                const needsImgix = /\/m\//.test(srcUrl.pathname) || /images\./i.test(srcUrl.host) || /virtualsoft\.tech$/i.test(srcUrl.host);
                const imgixPath = srcUrl.pathname.replace('/m/', '/');
                const targetUrl = needsImgix ? new URL(`https://${imgixHost}${imgixPath}`) : new URL(srcUrl.toString());

                const sp = new URLSearchParams(srcUrl.search);

                const targetW = this.clampW(w);
                if (typeof targetW === 'number') sp.set('w', String(targetW));

                // Defaults de compresión/formato si faltan
                if (!sp.has('auto') && !sp.has('fm')) sp.set('auto', 'format,compress');
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Compresión más agresiva por defecto (respetar si ya viene q/dpr)
                const mobileFlag = (this.appComponent && this.appComponent.config && this.appComponent.config.mobileL != undefined)
                    ? this.appComponent.config.mobileL
                    : (this.config && this.config.mobileL != undefined ? this.config.mobileL : '0');
                const isMobile = String(mobileFlag) === '1';
                if (!sp.has('q')) sp.set('q', isMobile ? '70' : '78');
                if (!sp.has('dpr')) sp.set('dpr', '2');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                // Safe fallback: keep the base URL and append our defaults.
                const baseUrl = String(imageUrl).split('?')[0];
                const qs: string[] = [];
                const targetW = this.clampW(w);
                if (typeof targetW === 'number') qs.push(`w=${targetW}`);
                qs.push('auto=format,compress');
                qs.push('fit=max');
                const mobileFlag = (this.appComponent && this.appComponent.config && this.appComponent.config.mobileL != undefined)
                    ? this.appComponent.config.mobileL
                    : (this.config && this.config.mobileL != undefined ? this.config.mobileL : '0');
                const isMobile = String(mobileFlag) === '1';
                qs.push(`q=${isMobile ? '70' : '78'}`);
                qs.push('dpr=2');
                return `${baseUrl}?${qs.join('&')}`;
            }
        },

        buildSrcset(imageUrl: string, widths: number[]) {
            const clamped = widths
                .map((w) => this.clampW(w))
                .filter((w): w is number => typeof w === 'number');
            const uniq = Array.from(new Set(clamped)).sort((a, b) => a - b);
            return uniq.map((w) => `${this.buildImgUrl(imageUrl, w)} ${w}w`).join(', ');
        },

        // Atributos optimizados para logos pequeños (slot fijo en px) con 1x/1.5x/2x/3x
        getImgAttrs(imageUrl: string, displayWidth: number) {
            if (!imageUrl || !displayWidth) return { src: '', srcset: '', sizes: '' };
            const w1 = this.clampW(displayWidth) ?? 1;
            const widths = [w1, this.clampW(w1 * 1.5), this.clampW(w1 * 2), this.clampW(w1 * 3)]
                .filter((w): w is number => typeof w === 'number');
            return {
                src: this.buildImgUrl(imageUrl, w1),
                srcset: this.buildSrcset(imageUrl, widths),
                sizes: `${w1}px`,
            };
        },

        // Build a safe fallback URL pointing to the legacy image origin.
        buildLegacyImgUrl(imageUrl: string) {
            if (!imageUrl) return '';
            const raw = String(imageUrl).trim();
            if (raw.startsWith('data:') || raw.startsWith('blob:')) return raw;
            if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
            if (raw.startsWith('//')) return `${window.location.protocol}${raw}`;

            const legacyHost = 'https://images.virtualsoft.tech';
            let path = raw;
            if (!path.startsWith('/')) path = `/${path}`;

            // Ensure legacy assets default under /m/ when the value is just a filename
            const parts = path.split('/').filter(Boolean);
            const looksLikeFolder = parts.length > 1;
            if (!path.startsWith('/m/') && !looksLikeFolder) {
                path = `/m${path}`;
            }
            return `${legacyHost}${path}`;
        },

        // If Imgix fails, retry once with legacy origin.
        onSponsorImgError(e: Event, originalImg: string) {
            const img = e.target as HTMLImageElement | null;
            if (!img) return;
            if (img.dataset.fallbackApplied === '1') return;
            img.dataset.fallbackApplied = '1';

            const legacy = this.buildLegacyImgUrl(originalImg);
            if (!legacy) return;

            // Force browser to use the fallback src
            img.removeAttribute('srcset');
            img.removeAttribute('sizes');
            img.src = legacy;
        },

        /**
         * Opens a new browser tab with the specified URL.
         * @param {string} url - The URL to open.
         */
        goToLink(url) {
            window.open(url, '_blank');
        },
    },
});
</script>

<template>
    <div>
        <!-- Main container for the text and social media links -->
        <div
            class="div-text text-center text-info-text"
            :class="[
                { 'my-0': config.layout != undefined && config.layout.layout == 4 },
            ]"
        >
            {{ $t('Patrocinador Oficial:') }}
        </div>
        <div class="redes-sociales">
            <div>
                <!-- List of sponsors -->
                <ul class="flex flex-wrap justify-center items-center">
                    <li
                        v-for="sponsors in config.SPONSORS_ != undefined
                            ? config.SPONSORS_
                            : config.footer.sponsors[appComponent.country]"
                    >
                        <a
                            v-if="sponsors.href != '' && sponsors.href != undefined"
                            :href="sponsors.href"
                            @click="goToLink(sponsors.href)"
                        >
                            <img
                                :width="sponsors.width"
                                :height="sponsors.height"
                                :alt="sponsors.title"
                                v-bind="getImgAttrs(sponsors.img, Number(sponsors.width) || 65)"
                                decoding="async"
                                loading="lazy"
                                v-if="sponsors.show"
                                @error="onSponsorImgError($event, sponsors.img)"
                            />
                        </a>
                        <span v-else>
                            <img
                                :class="{
                                    'max-w-[45px] max-h-[45px] md:max-h-[80px] md:max-w-[80px]':
                                        config.layout != undefined && config.layout == 4,
                                }"
                                :width="sponsors.width"
                                :height="sponsors.height"
                                :alt="sponsors.title"
                                v-bind="getImgAttrs(sponsors.img, Number(sponsors.width) || 65)"
                                decoding="async"
                                loading="lazy"
                                v-if="sponsors.show"
                                @error="onSponsorImgError($event, sponsors.img)"
                            />
                        </span>
                    </li>
                </ul>
                <!-- Conditional display for additional information -->
                <div
                    v-if="
                        config.footer_ != undefined && config.footer_.show_18_more != undefined
                            ? config.footer_.show_18_more
                            : config.footer.show18text
                    "
                    class="flex justify-center items-center"
                >
                    <img
                        v-bind="getImgAttrs(
                            config.footer_ && config.footer_.show18text
                                ? config.footer_.show18text.src
                                : config.footer.show18text.src,
                            46,
                        )"
                        loading="lazy"
                        decoding="async"
                        width="46"
                        height="46"
                        alt="+18 Años"
                        @error="onSponsorImgError($event, (config.footer_ && config.footer_.show18text ? config.footer_.show18text.src : config.footer.show18text.src))"
                    />
                </div>
            </div>
            <div>
                <!-- Display copyright information -->
                <p
                    v-if="
                        config.footer[appComponent.country] != undefined &&
                        config.footer[appComponent.country].copyright != undefined
                    "
                >
                    <span v-html="$t(config.footer[appComponent.country].copyright)"></span>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
/* Styles for the social media section */
.redes-sociales {
    padding-top: 0px;
}
.redes-sociales ul {
    padding-left: 0;
}
/* Styles for the text container */
.div-text {
    font-weight: bold;
    font-size: 13px;
    margin: 15px 0px;
}
</style>

<!-- FILE DOCUMENTED -->
