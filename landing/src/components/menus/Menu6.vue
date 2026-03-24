<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import traced from '../icons/traced.vue'; // Importing a Vue component for icons
import { register } from 'swiper/element/bundle'; // Importing Swiper's element bundle for registration
register(); // Registering Swiper elements

export default defineComponent({
    data() {
        // Defining component data
        let appComponent: any = this.$appComponent; // Reference to the app component
        let INFO_ICONS: any = []; // Array to hold information icons
        let login2: string = ''; // Variable to hold login status
        let colors: any = {}; // Object to hold color configurations
        let deviceTheme: string = 'theme_colors'; // Default theme variable
        return {
            login2,
            appComponent,
            INFO_ICONS,
            colors,
            deviceTheme,
        };
    },
    components: {
        traced, // Registering the traced component
    },
    created() {
        // Lifecycle hook called after the instance is created
        if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
            this.deviceTheme = 'theme_colors_desktop'; // Setting theme for desktop
        } else if (
            this.appComponent.config.theme_colors_mobile != undefined &&
            this.appComponent.config.mobileL != ''
        ) {
            this.deviceTheme = 'theme_colors_mobile'; // Setting theme for mobile
        }
        this.colors = this.appComponent.config[this.deviceTheme]; // Assigning colors based on device theme
        this.login2 = 'not_login'; // Default login status
        if (
            this.appComponent.config[this.login2] != undefined &&
            this.appComponent.config[this.login2][this.appComponent.lngProd] != undefined &&
            this.appComponent.config[this.login2][this.appComponent.lngProd]['NEW_HOME_ICONS'] != undefined
        ) {
            this.INFO_ICONS = this.appComponent.config[this.login2][this.appComponent.lngProd]['NEW_HOME_ICONS']; // Assigning new home icons if available
        } else {
            if (this.appComponent.mobile) {
                this.INFO_ICONS = this.appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE[this.appComponent.country]; // Assigning mobile icons if not logged in
            } else {
                if (!this.appComponent.mobile) {
                    this.INFO_ICONS = this.appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP[this.appComponent.country]; // Assigning desktop icons if not logged in
                }
            }
        }
        if (this.INFO_ICONS != undefined && this.INFO_ICONS.length > 0) {
            this.INFO_ICONS.forEach(function (element) {
                element.MENU_NEWTAB = element.MENU_URL.indexOf('http') != -1 || element.MENU_URL.indexOf('www') != -1; // Setting MENU_NEWTAB based on URL
            });
        }
    },
    mounted() {
        // Lifecycle hook called after the component is mounted
        let count = 0; // Counter for the interval
        const intervalSwiper = setInterval(() => {
            count++; // Incrementing the counter
            try {
                const swiperEl = document.getElementById('MenuSlider6') as any; // Getting the Swiper element
                if (swiperEl || count > 10) {
                    clearInterval(intervalSwiper); // Clearing the interval if element is found or count exceeds 10
                    const buttonLeft = document.getElementById('buttonLeftMenu6'); // Getting the left button
                    const buttonRight = document.getElementById('buttonRightMenu6'); // Getting the right button
                    buttonLeft?.addEventListener('click', (e) => {
                        e.preventDefault(); // Preventing default action
                        swiperEl?.swiper.slidePrev(); // Sliding to the previous item
                    });
                    buttonRight?.addEventListener('click', (e) => {
                        e.preventDefault(); // Preventing default action
                        swiperEl?.swiper.slideNext(); // Sliding to the next item
                    });
                }
            } catch (e) {
                console.log(e); // Logging any errors
            }
        }, 1000); // Setting the interval to 1000ms
    },
});
</script>
<template>
    <!-- Main section container for the menu slider with buttons -->
    <section class="w-full flex justify-center items-center gap-0 max-w-[1156px] mt-8 md:mt-6">
        <!-- Left navigation button for the menu slider -->
        <button
            id="buttonLeftMenu6"
            class="hover:scale-125 tablet:hidden"
        >
            <!-- SVG icon for the left button -->
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

        <!-- Swiper container for the menu items -->
        <swiper-container
            id="MenuSlider6"
            :slides-per-view="'auto'"
            :mousewheel="true"
            :mousewheel-force-to-axis="true"
            :direction="'horizontal'"
            :controller-control="'.swiper-4'"
            :free-mode="true"
            :breakpoints="{
                320: {
                    spaceBetween: 10,
                },
                740: {
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
          width: 30px;
          height: 30px;
          margin-top: -8px;
        }`,
            ]"
            class="w-[90%] tablet:w-auto tablet:mx-auto tablet:pl-5 desktop:pl-10"
        >
            <!-- Individual slide for each menu item -->
            <swiper-slide
                v-for="(item, index) in INFO_ICONS"
                :key="index"
                class="w-[70px] h-[70px] tablet:w-[75px] tablet:h-[75px] desktop:w-[125px] desktop:h-[125px]"
            >
                <!-- Router link for navigation to menu item -->
                <RouterLink
                    :to="item.MENU_URL"
                    :key="index"
                    :aria-label="item.MENU_TITLE"
                    @click="appComponent.gAnalytics('sub_menu', item)"
                    active-class="scale-110"
                    class="w-full h-full flex flex-col justify-center items-center gap-2 desktop:gap-4 rounded-xl p-2 border-2 hover:scale-[1.02] transition-transform duration-300 ease-in-out"
                    :style="[
                        {
                            backgroundColor: item.MENU_CLASS ? item.MENU_CLASS : colors.secondary_focus,
                        },
                        {
                            color: item.MENU_COLOR == undefined ? colors.secondary_content : item.MENU_COLOR,
                        },
                        {
                            borderColor: item.MENU_BORDER == undefined ? colors.secondary_content : item.MENU_BORDER,
                        },
                        {
                            boxShadow:
                                item.MENU_SHADOW == undefined
                                    ? 'inset 0 4px 6px 0 ' + colors.secondary_content
                                    : 'inset 0 4px 6px 0 ' + item.MENU_SHADOW,
                        },
                    ]"
                >
                    <!-- Image for the menu item -->
                    <img
                        v-lazy="item.MENU_ICON"
                        alt="sports bets, casino"
                        class="w-1/2 aspect-square object-contain"
                    />
                    <!-- Title of the menu item -->
                    <span class="text-xs desktop:text-lg leading-3 desktop:leading-5 text-center capitalize">{{
                        $t(item.MENU_TITLE)
                    }}</span>
                </RouterLink>
            </swiper-slide>
        </swiper-container>

        <!-- Right navigation button for the menu slider -->
        <button
            id="buttonRightMenu6"
            class="hover:scale-125 tablet:hidden"
        >
            <!-- SVG icon for the right button -->
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
