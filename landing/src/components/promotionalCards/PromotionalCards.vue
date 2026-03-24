<script lang="ts">
import { defineComponent, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useRoute } from 'vue-router';
register();

/**
 * Vue component definition.
 */
export default defineComponent({
    setup() {
        const route = useRoute(); // Get the current route
        let sectionId: any = ref(route.params.sectionId); // Reference to section ID from route parameters
        return {
            sectionId,
        };
    },

    data() {
        let config = this.$config(); // Application configuration
        let appComponent: any = this.$appComponent; // Reference to the app component
        let colors: any = {}; // Object to hold color configurations
        let deviceTheme: string = 'theme_colors'; // Default theme
        let bonuses: any = []; // Array to hold bonuses
        let cards: any = []; // Array to hold card data
        let promotionsList: any = []; // Array to hold promotions
        return {
            config,
            appComponent,
            colors,
            deviceTheme,
            bonuses,
            cards,
            promotionsList,
        };
    },

    created() {
        // Determine the device theme based on configuration
        if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
            this.deviceTheme = 'theme_colors_desktop';
        } else if (
            this.appComponent.config.theme_colors_mobile != undefined &&
            this.appComponent.config.mobileL != ''
        ) {
            this.deviceTheme = 'theme_colors_mobile';
        }
        this.colors = this.appComponent.config[this.deviceTheme]; // Set colors based on device theme
    },

    mounted() {
        // Load bonuses based on configuration and language
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config['not_login'] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd]['promotions'] != undefined
        ) {
            this.bonuses = this.appComponent.config['not_login'][this.appComponent.lngProd]['promotions'];
        } else {
            if (
                this.appComponent.config != undefined &&
                this.appComponent.config.promotions != undefined &&
                this.appComponent.config.promotions[this.appComponent.country] != undefined &&
                this.appComponent.config.promotions[this.appComponent.country][this.appComponent.lngProd] != undefined
            ) {
                this.bonuses =
                    this.appComponent.config.promotions[this.appComponent.country][this.appComponent.lngProd];
            }
        }

        // Filter bonuses based on date criteria
        this.bonuses = this.bonuses.filter((e) => {
            if ((e.startDate == undefined || e.startDate == '') && (e.date == undefined || e.date == '')) {
                return true;
            }
            var currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (e.startDate != undefined && e.startDate != '' && e.date != undefined && e.date != '') {
                var startDate = new Date(e.startDate + 'T00:00:00');
                var endDate = new Date(e.date + 'T00:00:00');
                return currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime();
            }
            if ((e.startDate != undefined || e.startDate != '') && (e.date == undefined || e.date == '')) {
                var startDate = new Date(e.startDate + 'T00:00:00');
                return currentDate.getTime() >= startDate.getTime();
            }
            if ((e.startDate == undefined || e.startDate == '') && (e.date != undefined || e.date != '')) {
                var endDate = new Date(e.date + 'T00:00:00');
                return currentDate.getTime() <= endDate.getTime();
            }
            return true;
        });

        // Handle promotion click based on section ID
        if (this.sectionId != undefined) {
            this.promotionClick(
                this.bonuses.filter((item: any) => {
                    return item.slug.replaceAll(' ', '-').toLowerCase() == this.sectionId;
                })[0],
            );
        }

        // Set cards based on bonuses and device type
        if (this.appComponent.config.mobileL != undefined && this.appComponent.config.mobileL != '')
            this.cards = this.bonuses?.slice(0, 4);
        else this.cards = this.bonuses?.slice(0, 3);

        // Determine promotions list based on configuration version
        this.promotionsList =
            this.appComponent.config.promotions != undefined &&
            this.appComponent.config.promotions[this.appComponent.country] != undefined &&
            this.appComponent.config.promotions[this.appComponent.country].version != undefined &&
            this.appComponent.config.promotions[this.appComponent.country].version == 3
                ? this.cards
                : this.bonuses;

        let count = 0;
        const intervalSwiper = setInterval(() => {
            count++;
            try {
                const swiperEl = document.getElementById('promotionsCardSlider') as any; // Get swiper element
                if (swiperEl || count > 10) {
                    clearInterval(intervalSwiper); // Clear interval if swiper element is found or count exceeds 10
                    const buttonLeft = document.getElementById('buttonLeft'); // Get left button
                    const buttonRight = document.getElementById('buttonRight'); // Get right button
                    buttonLeft?.addEventListener('click', (e) => {
                        e.preventDefault();
                        swiperEl?.swiper.slidePrev(); // Slide to previous
                    });
                    buttonRight?.addEventListener('click', (e) => {
                        e.preventDefault();
                        swiperEl?.swiper.slideNext(); // Slide to next
                    });
                }
            } catch (e) {
                console.log(e); // Log any errors
            }
        }, 1000);
    },

    methods: {
        /**
         * Handles the promotion click event.
         * @param item - The promotion item that was clicked.
         */
        promotionClick(item) {
            this.appComponent.modal.showModal = 'promotion'; // Show promotion modal
            this.appComponent.promotionModal = item; // Set the promotion modal item
            window.history.pushState(
                '',
                '',
                '/promociones-bonos/' + item.slug.replaceAll(' ', '-').toLowerCase(), // Update browser history
            );
        },

        /**
         * Construye una URL de imagen preservando params existentes (incluyendo los que agrega main.js)
         * y sobreescribiendo solo `w` para el candidato actual.
         * También reescribe rutas /m/ al host de Imgix si la URL viene del servidor origen.
         */
        buildImgUrl(imageUrl: string, w?: number) {
            if (!imageUrl) return '';

            const imgixHost = this.appComponent.config !=undefined && this.appComponent.config.urlApi != undefined &&
                this.appComponent.config.urlApi.prefixImg != undefined
                ? this.appComponent.config.urlApi.prefixImg
                :'images.virtualsoft.tech/m';

            try {
                const normalized = (() => {
                    const s = String(imageUrl).trim();
                    if (s.startsWith('http://') || s.startsWith('https://')) return s;
                    if (s.startsWith('//')) return `${window.location.protocol}${s}`;
                    if (s.startsWith('/')) return `${window.location.origin}${s}`;
                    if (s.startsWith('m/')) return `${window.location.origin}/${s}`;
                    return `${window.location.origin}/${s}`;
                })();

                const srcUrl = new URL(normalized);

                // Si viene de tu server origen o trae /m/, reescribe a Imgix
                const needsImgix = /\/m\//.test(srcUrl.pathname) || /images\./i.test(srcUrl.host) || /virtualsoft\.tech$/i.test(srcUrl.host);
                const imgixPath = srcUrl.pathname.replace('/m/', '/');
                const targetUrl = needsImgix ? new URL(`https://${imgixHost}${imgixPath}`) : new URL(srcUrl.toString());

                const sp = new URLSearchParams(srcUrl.search);

                // Setear ancho del candidato
                if (typeof w === 'number' && !Number.isNaN(w)) {
                    sp.set('w', String(w));
                }

                // Defaults de compresión/formato si faltan (compatibles con el main)
                if (!sp.has('auto') && !sp.has('fm')) {
                    sp.set('auto', 'format,compress');
                }
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Respetar q/dpr si ya existen; si no, defaults más agresivos para reducir peso.
                // Mobile (mobileL != '') -> q=70, Desktop -> q=78
                const isMobile = this.appComponent?.config?.mobileL != undefined && this.appComponent?.config?.mobileL != '';
                if (!sp.has('q')) sp.set('q', isMobile ? '70' : '78');
                if (!sp.has('dpr')) sp.set('dpr', '2');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                // Fallback simple
                const baseUrl = String(imageUrl).split('?')[0];
                const qs: string[] = [];
                if (typeof w === 'number') qs.push(`w=${w}`);
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

        /**
         * Atributos optimizados para las cards del carrusel (264/203/350 según breakpoint).
         * Genera 1x/2x/3x por cada tamaño para que el navegador elija el `w` correcto.
         */
        getImgAttrsPromotion(imageUrl: string) {
            if (!imageUrl) return { src: '', srcset: '', sizes: '' };

            // Tamaños por breakpoint según tus clases:
            // base: 264px, tablet: 203px, desktop: 350px
            const base = 264;
            const tablet = 203;
            const desktop = 350;

            const widths = [
                base, base * 2, base * 3,
                tablet, tablet * 2, tablet * 3,
                desktop, desktop * 2, desktop * 3,
            ];

            const srcset = this.buildSrcset(imageUrl, widths);

            // Ajusta a tus breakpoints reales:
            // - desktop (>=1024): 350px
            // - tablet (>=768): 203px
            // - default: 264px
            const sizes = '(min-width: 1024px) 350px, (min-width: 768px) 203px, 264px';

            const src = this.buildImgUrl(imageUrl, base);

            return { src, srcset, sizes };
        },
    },
});
</script>
<template>
    <!-- Section for displaying promotions if the promotionsList has items -->
    <section
        v-if="promotionsList.length > 0"
        class="w-full flex justify-center items-center gap-0 max-w-[1155px] mt-8 md:mt-6"
    >
        <!-- Button to navigate left in the promotions slider -->
        <button
            id="buttonLeft"
            class="hover:scale-125"
        >
            <!-- SVG icon for left navigation -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 14 23"
                fill="none"
            >
                <path
                    d="M0.939438 10.7673C0.353652 11.3531 0.353651 12.3029 0.939438 12.8887L10.4854 22.4346C11.0712 23.0204 12.0209 23.0204 12.6067 22.4346C13.1925 21.8488 13.1925 20.8991 12.6067 20.3133L4.12142 11.828L12.6067 3.34272C13.1925 2.75694 13.1925 1.80719 12.6067 1.2214C12.0209 0.635615 11.0712 0.635615 10.4854 1.2214L0.939438 10.7673ZM5.49902 10.328L2.0001 10.328L2.0001 13.328L5.49902 13.328L5.49902 10.328Z"
                    fill="white"
                />
            </svg>
        </button>
        <!-- Swiper container for the promotions slider -->
        <swiper-container
            id="promotionsCardSlider"
            :slides-per-view="'auto'"
            :autoplay="true"
            :autoplay-delay="5000"
            :autoplay-disable-on-interaction="true"
            :autoplay-pause-on-mouse-enter="true"
            :mousewheel="true"
            :mousewheel-force-to-axis="true"
            :direction="'horizontal'"
            :controller-control="'.swiper-2'"
            :loop="true"
            :breakpoints="{
                320: {
                    centeredSlides: true,
                    initialSlide: promotionsList.length > 1 ? 1 : 0,
                    spaceBetween: 10,
                },
                700: {
                    centeredSlides: false,
                    initialSlide: 0,
                    spaceBetween: 20,
                },
            }"
            :injectStyles="[
                `
        .swiper-button-prev,
        .swiper-button-next,
        .swiper-button-prev::after,
        .swiper-button-next::after {
          color: ${colors.base_100};
          width: 20px;
          height: 20px;
          margin-top: -5px;
        }`,
            ]"
            class="w-[90%] desktop:w-[97%]"
        >
            <!-- Swiper slide for each promotion in the promotionsList -->
            <swiper-slide
                v-for="(promotion, index) in promotionsList"
                :key="index"
                class="w-[264px] h-[146px] tablet:w-[203px] tablet:h-[112px] desktop:w-[350px] desktop:h-[192px] max-w-[85vw] rounded-[14px] border desktop:border-2 border-primary-content/75 cursor-pointer overflow-hidden"
                @click="promotionClick(promotion)"
            >
                <!-- Image of the promotion -->
                <img
                    :src="getImgAttrsPromotion(promotion.urlImage).src"
                    :srcset="getImgAttrsPromotion(promotion.urlImage).srcset"
                    :sizes="getImgAttrsPromotion(promotion.urlImage).sizes"
                    alt=""
                    decoding="async"
                    :fetchpriority="index === 0 ? 'high' : null"
                    :loading="index === 0 ? 'eager' : 'lazy'"
                    class="w-full h-full object-cover rounded-[13px] hover:scale-[1.02] transition-transform duration-300 ease-in-out"
                />
            </swiper-slide>
        </swiper-container>
        <!-- Button to navigate right in the promotions slider -->
        <button
            id="buttonRight"
            class="hover:scale-125"
        >
            <!-- SVG icon for right navigation -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 14 23"
                fill="none"
            >
                <path
                    d="M13.0612 12.8887C13.647 12.3029 13.647 11.3531 13.0612 10.7673L3.51526 1.2214C2.92947 0.635614 1.97973 0.635614 1.39394 1.2214C0.808154 1.80719 0.808154 2.75694 1.39394 3.34272L9.87922 11.828L1.39394 20.3133C0.808154 20.8991 0.808154 21.8488 1.39394 22.4346C1.97973 23.0204 2.92947 23.0204 3.51526 22.4346L13.0612 12.8887ZM10.835 13.328H12.0005V10.328H10.835V13.328Z"
                    fill="white"
                />
            </svg>
        </button>
    </section>
</template>

<!-- FILE DOCUMENTED -->
