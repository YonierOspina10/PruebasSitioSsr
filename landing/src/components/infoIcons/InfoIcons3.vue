<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import { register } from 'swiper/element/bundle'; // Importing register from Swiper bundle
register(); // Registering Swiper elements globally

export default defineComponent({
    // Defining a Vue component
    props: {
        homeIcons: Object, // Prop to receive home icons as an object
        keySlide: { type: Number, default: 1000 }, // Prop for slide key with a default value
    },
    data() {
        // Data function to initialize component data
        let appComponent: any = this.$appComponent; // Accessing appComponent from the Vue instance
        return {
            appComponent, // Returning appComponent in the data object
        };
    },
    created() {
        // Lifecycle hook called after the component is created
        if (this.homeIcons != undefined && this.homeIcons.length > 0) {
            // Checking if homeIcons is defined and has elements
            this.homeIcons.forEach(function (element) {
                // Iterating over each home icon element
                if (
                    element.MENU_URL.indexOf('http') != -1 || // Checking if MENU_URL contains 'http'
                    element.MENU_URL.indexOf('www') != -1 // Checking if MENU_URL contains 'www'
                ) {
                    element.MENU_NEWTAB = true; // Setting MENU_NEWTAB to true for external links
                } else {
                    element.MENU_NEWTAB = false; // Setting MENU_NEWTAB to false for internal links
                }
            });
        }
    },
});
</script>
<template>
    <!-- Main section for home page content based on style version -->
    <section
        v-if="
            appComponent.config.homePage.styleVersion == 1 &&
            (appComponent.config.layout == undefined ||
                (appComponent.config.layout != undefined && appComponent.config.layout != 5))
        "
    >
        <!-- Container for home content with specific classes -->
        <div
            id="home-content"
            class="version1 home-slider"
        >
            <!-- Grid layout for icons -->
            <div class="grid md:grid-flow-col auto-cols-fr justify-center py-8 grid-cols-2">
                <!-- Loop through homeIcons to create icon links -->
                <div
                    v-for="(value, index) in homeIcons"
                    :class="value.MENU_SECCION"
                    class="flex justify-center items-center"
                >
                    <!-- RouterLink for menu items that do not open in a new tab -->
                    <RouterLink
                        @click="appComponent.gAnalytics('sub_menu', value)"
                        v-if="!value.MENU_NEWTAB"
                        :id="`icon-${index}-${value.MENU_ID}`"
                        :to="value.MENU_URL"
                        :title="$t(value.MENU_TITLE)"
                        :aria-label="value.MENU_TITLE"
                        class="hover:scale-105 transition max-w-[130px] flex flex-col justify-center items-center gap-4"
                    >
                        <!-- Icon container with conditional classes -->
                        <div
                            class="p-[8px] rounded-full blob white"
                            :class="[
                                {
                                    'border-solid border-4 border-success': value.MENU_ID == 'accion_registro',
                                },
                                value.MENU_CLASS_BORDER == undefined
                                    ? 'border-2 border-solid border-white'
                                    : value.MENU_CLASS_BORDER,
                            ]"
                        >
                            <!-- Inner div for icon image -->
                            <div
                                :class="[
                                    value.MENU_CLASS_DIV == undefined
                                        ? 'bg-neutral w-[110px] h-[110px] overflow-hidden rounded-full'
                                        : value.MENU_CLASS_DIV,
                                ]"
                            >
                                <img
                                    v-lazy="value.MENU_ICON"
                                    width="86"
                                    height="15"
                                    alt="sports bets, casino"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <!-- Title for the icon -->
                        <span
                            :class="[
                                {
                                    'bg-darkgreen rounded-lg ': value.MENU_ID == 'accion_registro',
                                },
                                value.MENU_CLASS,
                            ]"
                            class="text-center text-neutral"
                            >{{ $t(value.MENU_TITLE) }}</span
                        >
                    </RouterLink>
                    <!-- Fallback link for menu items that open in a new tab -->
                    <a
                        @click="appComponent.gAnalytics('sub_menu', value)"
                        v-else-if="!value.MENU_NEWTAB"
                        :id="`icon-${index}-${value.MENU_ID}`"
                        :href="value.MENU_URL"
                        :title="$t(value.MENU_TITLE)"
                        :aria-label="value.MENU_TITLE"
                        class="hover:scale-105 transition max-w-[130px] flex flex-col justify-center items-center gap-4"
                    >
                        <!-- Icon container with conditional classes -->
                        <div
                            class="p-[8px] rounded-full blob white"
                            v-bind:class="[
                                {
                                    'border-solid border-4 border-success': value.MENU_ID == 'accion_registro',
                                },
                                value.MENU_CLASS_BORDER == undefined
                                    ? 'border-2 border-solid border-white'
                                    : value.MENU_CLASS_BORDER,
                            ]"
                        >
                            <!-- Inner div for icon image -->
                            <div
                                :class="[
                                    value.MENU_CLASS_DIV == undefined
                                        ? 'bg-neutral w-[110px] h-[110px] overflow-hidden rounded-full'
                                        : value.MENU_CLASS_DIV,
                                ]"
                            >
                                <img
                                    v-lazy="value.MENU_ICON"
                                    width="86"
                                    height="15"
                                    alt="sports bets, casino"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <!-- Title for the icon -->
                        <span
                            :class="[
                                {
                                    'bg-darkgreen rounded-lg ': value.MENU_ID == 'accion_registro',
                                },
                                value.MENU_CLASS,
                            ]"
                            class="text-center"
                            >{{ $t(value.MENU_TITLE) }}</span
                        >
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Section for home page content when style version is 2 -->
    <section
        v-else-if="appComponent.config.homePage.styleVersion == 2"
        class="py-6 px-0 md:px-10 flex justify-center items-start h-[125px] md:h-[162px] gap-y-10"
    >
        <!-- Button for previous slide -->
        <button
            class="cursor-pointer hover:scale-125 ml-0 lg:ml-3 block md:hidden"
            :class="'slidePrev2' + keySlide"
        >
            <font-awesome-icon
                icon="fa-solid fa-angle-left"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
        </button>
        <!-- Swiper container for sliding icons -->
        <swiper-container
            :slidesPerView="'auto'"
            :centeredSlides="false"
            :spaceBetween="10"
            :grabCursor="true"
            :navigation="{
                nextEl: '.slideNext2' + keySlide,
                prevEl: '.slidePrev2' + keySlide,
            }"
            :mousewheel="true"
            :mousewheel-force-to-axis="true"
            :free-mode="true"
            :direction="'horizontal'"
            :loop="true"
            class="mySwiper swiper-h w-full h-full flex justify-center items-center px-0 md:px-[2%] max-w-[91%] md:max-w-[97%]"
        >
            <!-- Loop through homeIcons for swiper slides -->
            <swiper-slide
                v-for="value in homeIcons"
                class="flex justify-center w-36 md:w-52 h-40 mr-0 md:mr-14"
            >
                <!-- RouterLink for each icon -->
                <RouterLink
                    :id="`icons-${value.MENU_ID}`"
                    :to="value.MENU_URL"
                    :class="value.MENU_SECCION"
                    class="after:w-full after:z-1 after:h-[0.1%] after:bg-primary after:absolute after:bottom-0 after:left-0 after:shadow-primary after:shadow-[0px_10px_20px_19px] lg:after:shadow-[0px_-2px_20px_19px] lg:after:shadow-primary relative overflow-hidden border-solid border-1 md:border-2 border-primary p-2 rounded-lg w-[80px] h-[70px] md:w-[135px] md:h-[120px] hover:scale-95 transition-all ease-in-out flex justify-center items-start"
                >
                    <!-- Title for the icon -->
                    <p
                        :class="
                            value.MENU_TITLE.indexOf(' ') >= 0
                                ? 'first-line:text-primary brightness-125 text-neutral font-bold first-line:font-light max-w-[90px]'
                                : 'font-bold text-neutral'
                        "
                        class="text-xs lg:text-lg break-words text-center leading-3 lg:leading-4 drop-shadow-[0px_2px_1px_black] capitalize z-1"
                    >
                        {{ $t(value.MENU_TITLE) }}
                    </p>
                    <!-- Icon image -->
                    <img
                        :src="value.MENU_ICON"
                        alt=""
                        class="object-contain w-[40px] h-[40px] md:w-[100px] md:h-[80px] absolute bottom-0 left-1/2 -translate-x-1/2 z-1"
                    />
                    <!-- Background image -->
                    <img
                        :src="
                            value.MENU_BG != undefined
                                ? value.MENU_BG
                                : 'https://images.virtualsoft.tech/m/msj15212T1708696971.png'
                        "
                        alt=""
                        class="z-0 w-full h-full absolute top-0 left-0 opacity-100"
                    />
                </RouterLink>
            </swiper-slide>
        </swiper-container>
        <!-- Button for next slide -->
        <button
            class="cursor-pointer hover:scale-125 mr-0 lg:mr-3 block md:hidden"
            :class="'slideNext2' + keySlide"
        >
            <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
        </button>
        <!-- Template for specific menu item -->
        <template v-for="value in homeIcons">
            <div
                v-if="value.MENU_ID == 'accion_registro'"
                class="w-full flex justify-center items-center"
            >
                <!-- RouterLink for registration -->
                <RouterLink
                    to="/registro"
                    class="hover:brightness-90 overflow-hidden relative rounded-lg bg-neutral-content text-neutral bg-gradient-to-r from-success/60 to-success/75 px-2 md:px-4 border-solid border-success/75 border-2 hover:scale-95 transition-all ease-in-out text-sm md:text-xl flex flex-row justify-center items-center gap-x-3"
                >
                    <span class="font-poppinssl z-1">{{ $t(value.MENU_TITLE) }}</span>
                    <img
                        :src="
                            value._MENU_TITLE
                                ? value.MENU_TITLE
                                : 'https://images.virtualsoft.tech/m/msj18212T1708463819.png'
                        "
                        alt="Registro"
                        class="w-10 h-10 z-1 md:w-14 md:h-14 object-contain"
                    />
                    <img
                        src="https://images.virtualsoft.tech/m/msj15212T1708706959.png"
                        alt=""
                        class="absolute left-10 md:left-16"
                    />
                </RouterLink>
            </div>
        </template>
    </section>

    <!-- Section for home page content when style version is 3 -->
    <section v-else-if="appComponent.config.homePage.styleVersion == 3">
        <!-- Container for icon links -->
        <div class="w-full h-auto my-5 flex justify-center items-center flex-wrap gap-4">
            <!-- Loop through homeIcons to create icon links -->
            <RouterLink
                v-for="value in homeIcons"
                :to="value.MENU_URL"
                :class="[
                    'w-24 md:w-28 h-24 md:h-28 text-xs md:text-base transition-all ease-in-out hover:brightness-110',
                    'relative flex flex-col justify-start items-center overflow-hidden bg-secondary rounded-2xl',
                    'border-solid border-2 border-primary',
                ]"
            >
                <!-- Icon image -->
                <img
                    :src="value.MENU_ICON"
                    alt=""
                    class="w-8 h-8 md:w-10 md:h-10 mt-4 object-contain"
                />
                <!-- Title for the icon -->
                <p
                    class="text-neutral z-10 text-center w-full flex-grow-0 overflow-hidden text-ellipsis p-1 md:p-2 leading-4 relative align-middle font-poppinssl text-xs"
                >
                    {{ value.MENU_TITLE }}
                </p>
                <!-- Background image -->
                <img
                    src="https://images.virtualsoft.tech/m/msj17212T1712007346.png"
                    alt="background-button"
                    class="w-full h-full object-fill absolute top-0 left-0"
                />
            </RouterLink>
        </div>
    </section>

    <!-- Section for home page content when style version is 4 -->
	<section v-else-if="appComponent.config.homePage.styleVersion == 4"
	class="flex flex-col justify-center items-center w-full bg-transparent">
		<!-- Container for icons with flex layout -->
		<div
			class="w-full md:w-11/12 max-w-[1300px] h-auto flex justify-center items-center flex-wrap mx-1 md:mx-0 mb-5 gap-3 md:gap-12"
		>
			<!-- Router link for each icon -->
			<RouterLink
				v-for="(value, index) in homeIcons"
				:to="value.MENU_URL"
                :data-analytics-label="`home:shortcut:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
                :data-analytics-position="index + 1"
                :data-analytics-context="`component:InfoIcons3|layout:layout-${appComponent.config.layout}`"
				:class="[
					'w-36 md:w-56 h-32 md:h-40 text-xs md:text-base transition-all ease-in-out',
					'relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-t from-base-100 to-base-content hover:to-base-100 rounded-2xl',
					'border-solid border-2 border-accent hover:border-accent-focus',
				]"
			>
			<div class="relative flex flex-col justify-center items-center gap-2">
				<!-- Icon image -->
				<img
					:src="value.MENU_ICON"
					alt=""
					class="w-18 h-18 md:w-36 md:h-24 object-contain"
				/>
				<!-- Title for the icon -->
				<p
					class="text-neutral z-10 text-center w-full flex-grow-0 overflow-hidden text-ellipsis relative align-middle font-poppinssl font-bold text-md"
				>
					{{ value.MENU_TITLE }}
				</p>
			</div>
			</RouterLink>
		</div>
	</section>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->
