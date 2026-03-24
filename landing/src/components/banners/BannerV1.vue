<script lang="ts">
import { defineComponent } from "vue";

import { useGetInfoFirestore } from '@/composables/useInfoFirestore.ts';
import {
    getDevice,
    getImages,
} from '../../utils/configHome';


/**
 * Carousel component that displays images and allows navigation through them.
 */
export default defineComponent({
    props: {
        /** Object containing carousel rendering properties */
        imagesCarouselRender: Object,
        /** Array of image objects with various properties */
        images: Array as () => {
            id: string;
            urlFondo: string;
            url?: string;
            urlImg2?: string;
            startDate?: string;
            date?: string;
        }[],
    },
    data() {
        let appComponent: any = this.$appComponent;
        return {
            /** Default placeholder banner (used only until real banners load) */

            defaultBannerUrl: '',
            /** Current index of the displayed image */
            currentIndex: 1,
            /** Rendered images for the carousel (starts with placeholder for fast LCP discovery) */
            imagesCarouselRender: [
                {
                    id: '__placeholder__',

                    urlFondo: '',
                    url: '',
                    urlImg2: '',
                },
            ] as any[],
            /** Starting X position for touch/mouse events */
            startX: 0,
            /** Threshold for swipe detection */
            threshold: 50,
            /** Flag indicating if a swipe is in progress */
            moving: false,
            /** Interval for automatic sliding */
            autoSlideInterval: null as NodeJS.Timeout | null,
            /** Delay for automatic slide transition */
            autoSlideDelay: 5000,
            /** Flags to disable navigation buttons */
            isTransitioning: true,
            /** Renderiza un hero estático para LCP y habilita el carrusel después del primer paint */
            carouselReady: false,
            appComponent
        };
    },
    async created() {
        const appComponent: any = this.$appComponent;
        // Preconnect temprano para acelerar handshake de Imgix
        this.ensureImgixPreconnect();
        // Preload placeholder ASAP (mejora la descubierta de la request del LCP)
        this.ensureLcpPreload(this.defaultBannerUrl);
        const config = appComponent?.config;
        const device = getDevice(appComponent);

        const firestoreBanner = await useGetInfoFirestore(config, appComponent, 'banner_home', {
            useLogin: true,
            useScope: true,
        });
        if (firestoreBanner?.length) {
            this.imagesCarouselRender = firestoreBanner;
        } else {
            this.imagesCarouselRender = getImages(appComponent, device);
        }

        // Si ya hay banners reales, actualiza el preload al primero
        const firstReal = Array.isArray(this.imagesCarouselRender) && this.imagesCarouselRender.length
            ? this.imagesCarouselRender[0]
            : null;
        if (firstReal?.urlFondo) {
            this.ensureLcpPreload(firstReal.urlFondo);
        }
    },
    watch: {
        imagesCarouselRender: {
            deep: true,
            handler(newVal: any[]) {
                // Mantener el preload apuntando al primer banner real (si existe)
                const first = Array.isArray(newVal) && newVal.length ? newVal[0] : null;
                const firstUrl = first?.urlFondo || '';
                if (firstUrl) {
                    this.ensureLcpPreload(firstUrl);
                }
            },
        },
    },
    methods: {
        /** Preconnect a Imgix host to reduce connection setup time for the LCP image */
        ensureImgixPreconnect() {
            try {
                const id = 'imgix-preconnect';
                const href = this.appComponent.config !=undefined && this.appComponent.config.urlApi != undefined &&
                this.appComponent.config.urlApi.prefixImg != undefined
                    ? this.appComponent.config.urlApi.prefixImg
                    :'images.virtualsoft.tech/m';
                let link = document.getElementById(id) as HTMLLinkElement | null;
                if (!link) {
                    link = document.createElement('link');
                    link.id = id;
                    link.rel = 'preconnect';
                    link.href = href;
                    link.crossOrigin = 'anonymous';
                    document.head.appendChild(link);
                }
            } catch (e) {
                // noop
            }
        },
        /**
         * Inserta/actualiza un <link rel="preload" as="image"> para ayudar a Lighthouse a descubrir la request del LCP.
         * Nota: lo ideal es que este preload exista en el HTML inicial (SSR/plantilla). Esto es el mejor esfuerzo desde el cliente.
         */
        ensureLcpPreload(url: string) {
            try {
                if (!url) return;
                const id = 'lcp-banner-preload';
                const href = this.buildImgUrl(url, 768); // candidato razonable para 100vw mobile/desktop (cap <= 800 en buildImgUrl)

                let link = document.getElementById(id) as HTMLLinkElement | null;
                if (!link) {
                    link = document.createElement('link');
                    link.id = id;
                    link.rel = 'preload';
                    link.as = 'image';
                    link.fetchPriority = 'high' as any;
                    document.head.appendChild(link);
                }

                // Actualiza solo si cambia
                if (link.href !== href) {
                    link.href = href;
                }
            } catch (e) {
                // noop
            }
        },
        /**
         * Construye una URL de imagen preservando los params existentes (los que agrega main.js)
         * y sobreescribiendo solo `w` para el candidato actual.
         * - Si ya viene `auto` o `fm` lo respetamos.
         * - Si no viene ninguno, aplicamos `auto=format,compress`.
         */
        buildImgUrl(imageUrl: string, w?: number) {
            if (!imageUrl) return '';

            // Usa el mismo host que configuraste en main.js
            const imgixHost = this.appComponent.config !=undefined && this.appComponent.config.urlApi != undefined &&
            this.appComponent.config.urlApi.prefixImg != undefined
                ? this.appComponent.config.urlApi.prefixImg
                :'images.virtualsoft.tech/m';

            try {
                // Normalizar URL (soporta http/https, //host/path, /path, m/path, etc.)
                const normalized = ((): string => {
                    const s = String(imageUrl).trim();
                    if (s.startsWith('http://') || s.startsWith('https://')) return s;
                    if (s.startsWith('//')) return `${window.location.protocol}${s}`;
                    if (s.startsWith('/')) return `${window.location.origin}${s}`;
                    // ejemplo: 'm/xxx.png' => '/m/xxx.png'
                    if (s.startsWith('m/')) return `${window.location.origin}/${s}`;
                    return `${window.location.origin}/${s}`;
                })();

                const srcUrl = new URL(normalized);

                // Si viene de tu servidor de imágenes o trae /m/, reescribe a Imgix
                const needsImgix = /\/m\//.test(srcUrl.pathname) || /images\./i.test(srcUrl.host) || /virtualsoft\.tech$/i.test(srcUrl.host);
                const imgixPath = srcUrl.pathname.replace('/m/', '/');
                const targetUrl = needsImgix ? new URL(`https://${imgixHost}${imgixPath}`) : new URL(srcUrl.toString());

                // Merge params: respetar los existentes y agregar defaults si faltan
                const sp = new URLSearchParams(srcUrl.search);

                // Setear ancho del candidato (cap duro para evitar descargas enormes)
                if (typeof w === 'number' && !Number.isNaN(w)) {
                    const clampedW = Math.min(800, Math.max(1, Math.round(w)));
                    sp.set('w', String(clampedW));
                }

                // Defaults de compresión/formato si faltan
                if (!sp.has('auto') && !sp.has('fm')) {
                    sp.set('auto', 'format,compress');
                }
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Compresión más agresiva por defecto para mejorar Lighthouse (respetar si ya viene q/dpr)
                const mobileFlag = (this as any).$appComponent?.config?.mobileL != undefined
                    ? String((this as any).$appComponent.config.mobileL)
                    : '0';
                const isMobile = mobileFlag === '1';
                // Banners/hero suelen tolerar más compresión: mobile q=68, desktop q=74
                if (!sp.has('q')) sp.set('q', isMobile ? '68' : '74');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                // Fallback: construye sobre Imgix directamente
                const baseUrl = String(imageUrl).split('?')[0];
                const path = baseUrl.includes('/m/') ? baseUrl.split('/m/')[1] : baseUrl.replace(/^https?:\/\//, '').replace(/^\/\//, '');
                const qs: string[] = [];
                if (typeof w === 'number') {
                    const clampedW = Math.min(800, Math.max(1, Math.round(w)));
                    qs.push(`w=${clampedW}`);
                }
                qs.push('auto=format,compress');
                qs.push('fit=max');
                const mobileFlag = (this as any).$appComponent?.config?.mobileL != undefined
                    ? String((this as any).$appComponent.config.mobileL)
                    : '0';
                const isMobile = mobileFlag === '1';
                qs.push(`q=${isMobile ? '68' : '74'}`);
                return `https://${imgixHost}/${path}?${qs.join('&')}`;
            }
        },

        buildSrcset(imageUrl: string, widths: number[]) {
            return widths
                .map((w) => `${this.buildImgUrl(imageUrl, w)} ${w}w`)
                .join(', ');
        },

        /**
         * Banners de fondo: ocupan 100vw y altura fija; generamos candidatos razonables.
         * El navegador elige el mejor `w` según viewport + DPR.
         */
        getImgAttrsBg(imageUrl: string) {
            if (!imageUrl) return { src: "", srcset: "", sizes: "" };
            const widths = [360, 480, 640, 768, 1024, 1280, 1440, 1600, 1920];
            const srcset = this.buildSrcset(imageUrl, widths);
            const sizes = "100vw";
            const src = this.buildImgUrl(imageUrl, 480);
            return { src, srcset, sizes };
        },

        /**
         * Promos (botones con tamaños por breakpoint): 300/350/450 (aprox).
         * Usamos `sizes` en px por breakpoint para que pida el w correcto.
         */
        getImgAttrsPromo(imageUrl: string) {
            if (!imageUrl) return { src: "", srcset: "", sizes: "" };
            const widths = [250, 300, 350, 450, 600, 900];
            const srcset = this.buildSrcset(imageUrl, widths);
            const sizes = "(min-width: 1024px) 450px, (min-width: 768px) 350px, (min-width: 640px) 300px, 250px";
            const src = this.buildImgUrl(imageUrl, 300);
            return { src, srcset, sizes };
        },
        /**
         * Retrieves the image URL, resolving relative paths.
         * @param name - The name of the image.
         * @returns The full URL of the image.
         */
        getImg(name: string) {
            if (name.includes("http")) return name;
            else
                return new URL(
                    `../../assets/${name.replace("./src/assets/", "")}`,
                    import.meta.url
                ).href;
        },
        /** Moves to the next slide in the carousel. */
        nextSlide() {
            this.isTransitioning = true;

            if (this.currentIndex >= this.imagesCarouselRender.length + 1) return;

            this.currentIndex++;
            this.resetAutoSlide();
        },
        /** Moves to the previous slide in the carousel. */
        prevSlide() {
            this.isTransitioning = true;
            this.currentIndex--;
            this.resetAutoSlide();
        },

        /** Handles the end of the transition to implement infinite looping. */
        handleTransitionEnd() {
            const total = this.imagesCarouselRender.length;
            if (this.currentIndex === total + 1) {
                setTimeout(() => {
                    this.isTransitioning = false;
                    this.currentIndex = 1;
                }, 80);
            }

            if (this.currentIndex === 0) {
                setTimeout(() => {
                    this.isTransitioning = false;
                    this.currentIndex = total;
                }, 80);
            }
        },

        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:BannerV1|layout:layout-${this.appComponent.config.layout}`
            };
        },

        /** Handles the start of a touch event for swiping. */
        handleTouchStart(event: TouchEvent) {
            this.stopAutoSlide();
            this.startX = event.touches[0].clientX;
            this.moving = false;
        },

        /** Handles the movement during a touch event for swiping. */
        handleTouchMove(event: TouchEvent) {
            const moveX = event.touches[0].clientX;
            const deltaX = this.startX - moveX;
            if (Math.abs(deltaX) > this.threshold) {
                if (!this.moving) {
                    if (deltaX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                    this.moving = true;
                }
                this.startX = moveX;
            }
        },

        /** Handles the end of a touch event, restarting auto slide. */
        handleTouchEnd() {
            this.startAutoSlide();
        },

        /** Handles the start of a mouse event for swiping. */
        handleMouseDown(event: MouseEvent) {
            this.stopAutoSlide();
            this.startX = event.clientX;
            this.moving = false;
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        },

        /** Handles the movement during a mouse event for swiping. */
        handleMouseMove(event: MouseEvent) {
            const moveX = event.clientX;
            const deltaX = this.startX - moveX;
            if (Math.abs(deltaX) > this.threshold) {
                if (!this.moving) {
                    if (deltaX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                    this.moving = true;
                }
                this.startX = moveX;
                document.removeEventListener('mousemove', this.handleMouseMove);
                document.removeEventListener('mouseup', this.handleMouseUp);
            }
        },

        /** Handles the end of a mouse event, restarting auto slide. */
        handleMouseUp() {
            this.startAutoSlide();
            this.moving = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        },

        /** Starts the automatic sliding of images. */
        startAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
            this.autoSlideInterval = setInterval(this.nextSlide, this.autoSlideDelay);
        },

        /** Stops the automatic sliding of images. */
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        },

        /** Resets the automatic sliding timer. */
        resetAutoSlide() {
            this.stopAutoSlide();
            this.startAutoSlide();
        },

        /** Updates the state of the navigation buttons based on the current index. */
        updateButtons() {
            this.disablePrev = this.currentIndex === 0;
            this.disableNext = this.currentIndex === this.imagesCarouselRender.length - 1;
        },

        /**
         * Opens a link in the top window.
         * @param link - The URL to open.
         */
        goToLink(link) {
            window.open(link, '_top');
        },
    },


    /** Sets up event listeners and starts the auto slide after the component mounts. */
    mounted() {
        const carousel = this.$refs.carousel as HTMLElement;
        carousel.addEventListener('touchstart', this.handleTouchStart);
        carousel.addEventListener('touchmove', this.handleTouchMove);
        carousel.addEventListener('touchend', this.handleTouchEnd);
        carousel.addEventListener('mousedown', this.handleMouseDown);

        // 1er paint: dejamos el hero estático (LCP). Luego activamos carrusel.
        requestAnimationFrame(() => {
            this.carouselReady = true;
        });

        // Mantener el carrusel iniciando en 1 (compatibilidad con clones/infinite loop)
        this.currentIndex = 1;

        // Solo auto-slide cuando hay más de 1 banner
        if (this.imagesCarouselRender.length > 1) {
            this.startAutoSlide();
        }
        this.updateButtons();
    },


    /** Cleans up event listeners and stops the auto slide before the component unmounts. */
    beforeUnmount() {
        const carousel = this.$refs.carousel as HTMLElement;
        carousel.removeEventListener('touchstart', this.handleTouchStart);
        carousel.removeEventListener('touchmove', this.handleTouchMove);
        carousel.removeEventListener('touchend', this.handleTouchEnd);
        carousel.removeEventListener('mousedown', this.handleMouseDown);
        this.stopAutoSlide();
    }
});
</script>

<template>
    <!-- Main section for the carousel with specific height and overflow settings -->
    <section class="relative w-full h-[600px] md:h-[500px] lg:h-[700px] -mb-32 md:-mb-40 overflow-hidden">
        <!-- Carousel container that holds the images -->
        <div class="relative w-full h-full overflow-hidden cursor-grab" ref="carousel">

            <!-- Hero estático para LCP (sin clones ni translate). Se reemplaza tras el primer paint. -->
            <div v-if="!carouselReady" class="w-full h-full relative">
                <img
                    :src="getImgAttrsBg(imagesCarouselRender[0]?.urlFondo).src"
                    :srcset="getImgAttrsBg(imagesCarouselRender[0]?.urlFondo).srcset"
                    :sizes="getImgAttrsBg(imagesCarouselRender[0]?.urlFondo).sizes"
                    alt="Banner Home"
                    class="w-full h-[680px] object-cover object-top"
                    decoding="async"
                    fetchpriority="high"
                    loading="eager"
                    :style="{ userSelect: 'none' }"
                />
                <div class="absolute bottom-0 w-full h-1 shadow-[0px_-4px_90px_90px] shadow-neutral-content bg-neutral-content"></div>
            </div>

            <!-- Carrusel (habilitado después del primer paint) -->
            <div
                v-else
                class="flex"
                :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.9s ease-in-out' : 'none',
        }"
                @transitionend="handleTransitionEnd"
            >
                <!-- Clone of the last image for infinite looping -->
                <div
                    v-if="imagesCarouselRender.length"
                    class="w-full h-full flex-shrink-0 flex items-center justify-center relative"
                >
                    <img
                        :src="getImgAttrsBg(imagesCarouselRender[imagesCarouselRender.length - 1].urlFondo).src"
                        :srcset="getImgAttrsBg(imagesCarouselRender[imagesCarouselRender.length - 1].urlFondo).srcset"
                        :sizes="getImgAttrsBg(imagesCarouselRender[imagesCarouselRender.length - 1].urlFondo).sizes"
                        decoding="async"
                        class="w-full h-[680px] object-cover object-top"
                        alt="Banner Clone Last"
                    />
                </div>
                <!-- Loop through the images to create individual banners -->
                <div
                    v-for="(banner, i) in imagesCarouselRender"
                    :key="banner.id"
                    class="w-full h-full flex-shrink-0 flex items-center justify-center relative"
                    :id="'banner-' + i"
                >
                    <!-- Background image for the banner -->
                    <img
                        :src="getImgAttrsBg(banner.urlFondo).src"
                        :srcset="getImgAttrsBg(banner.urlFondo).srcset"
                        :sizes="getImgAttrsBg(banner.urlFondo).sizes"
                        alt="Banner Home"
                        class="w-full h-[680px] object-cover object-top"
                        decoding="async"
                        :fetchpriority="i === 0 ? 'high' : null"
                        :loading="i === 0 ? 'eager' : 'lazy'"
                        :style="{ userSelect: 'none' }"
                    />
                    <!-- Bottom shadow overlay for the banner -->
                    <div
                        class="absolute bottom-0 w-full h-1 shadow-[0px_-4px_90px_90px] shadow-neutral-content bg-neutral-content"
                    ></div>
                    <!-- Container for promotional images with conditional classes -->
                    <div
                        v-bind="analyticsAttrs('promo:banner:hero')"
                        :data-analytics-id="banner.id"
                        :data-analytics-position="'banner-' + i"
                        class="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-10 z-20 mb-44 md:mb-36"
                        :class="
          banner.url == '' ||
          banner.url == undefined ||
          banner.urlImg2 == '' ||
          banner.urlImg2 == undefined
          ? 'justify-center'
          : 'justify-center md:justify-center'
          "
                    >
                        <!-- Button for the first promotional image -->
                        <button
                            v-if="banner.url"
                            class="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] flex justify-center items-center hover:scale-105 transition-transform duration-300"
                            aria-label="Image Promotion"
                            :style="{ userSelect: 'none' }"
                        >
                            <img
                                :src="getImgAttrsPromo(banner.url).src"
                                :srcset="getImgAttrsPromo(banner.url).srcset"
                                :sizes="getImgAttrsPromo(banner.url).sizes"
                                @click="goToLink(banner.redirect);"
                                loading="lazy"
                                decoding="async"
                                alt="Image Promotion"
                                class="w-full h-full object-contain"
                                draggable="false"
                            />
                        </button>
                        <!-- Button for the second promotional image -->
                        <button
                            v-if="banner.urlImg2"
                            class="w-[250px] h-[250px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px] flex justify-center items-center hover:scale-105 transition-transform duration-300"
                            aria-label="Image Promotion"
                            :style="{ userSelect: 'none' }"
                        >
                            <img
                                :src="getImgAttrsPromo(banner.urlImg2).src"
                                :srcset="getImgAttrsPromo(banner.urlImg2).srcset"
                                :sizes="getImgAttrsPromo(banner.urlImg2).sizes"
                                @click="goToLink(banner.redirect)"
                                loading="lazy"
                                decoding="async"
                                alt="Image Promotion"
                                class="w-full h-full object-contain"
                                draggable="false"
                            />
                        </button>
                    </div>
                </div>
                <!-- Clone of the first image for infinite looping -->
                <div
                    v-if="imagesCarouselRender.length"
                    class="w-full h-full flex-shrink-0 flex items-center justify-center relative"
                >
                    <img
                        :src="getImgAttrsBg(imagesCarouselRender[0].urlFondo).src"
                        :srcset="getImgAttrsBg(imagesCarouselRender[0].urlFondo).srcset"
                        :sizes="getImgAttrsBg(imagesCarouselRender[0].urlFondo).sizes"
                        decoding="async"
                        class="w-full h-[680px] object-cover object-top"
                        alt="Banner Clone First"
                    />
                </div>
            </div>
            <!-- Previous button for navigating slides -->
            <button 
            v-bind="analyticsAttrs('promo:carousel:arrow-prev')"
            aria-label="Previous"
                    class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 p-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-none rounded-full transition duration-300"
                    @click="prevSlide"
                    style="color: hsl(var(--pc));"
            >
                <svg class="arrow-icon" width="24" height="45" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.617 0.482966C10.8882 0.211794 10.8882 -0.227858 10.617 -0.49903C10.3459 -0.770201 9.90624 -0.770201 9.63507 -0.49903L0.565892 8.57015C0.16413 8.97191 0.16413 9.62327 0.565892 10.025L9.63507 19.0942C9.90624 19.3654 10.3459 19.3654 10.617 19.0942C10.8882 18.823 10.8882 18.3834 10.617 18.1123L1.80234 9.29768L10.617 0.482966Z" fill="currentColor"></path>
                </svg>
            </button>
            <!-- Next button for navigating slides -->
            <button 
            v-bind="analyticsAttrs('promo:carousel:arrow-next')"
            aria-label="Next"
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 p-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-none rounded-full transition duration-300"
                    @click="nextSlide"
                    style="color: hsl(var(--pc));"
            >
                <svg class="arrow-icon" width="24" height="45" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path>
                </svg>
            </button>
        </div>
    </section>
</template>

<!-- FILE DOCUMENTED -->

