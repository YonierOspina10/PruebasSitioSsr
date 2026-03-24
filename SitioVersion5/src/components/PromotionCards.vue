<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper and SwiperSlide components
import 'swiper/css'; // Importing Swiper CSS styles
import 'swiper/css/pagination'; // Importing Swiper pagination styles
import 'swiper/css/navigation'; // Importing Swiper navigation styles
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importing Swiper modules for navigation, pagination, and autoplay

export default defineComponent({
	props: {
		media: Array, // Prop to receive an array of media items
		colorBg: { type: String, default: '#9558E3ff' }, // Prop for background color with a default value
	},
	components: {
		Swiper, // Registering Swiper component
		SwiperSlide, // Registering SwiperSlide component
	},
	data() {
		let infoData: any = this.data; // Storing component data
		let config = this.$config(); // Accessing configuration
		let appComponent: any = this.$appComponent; // Accessing application component
		let imagesCarousel: any = this.media; // Storing media for the carousel
		let imagesCarouselRender: any = undefined; // Placeholder for rendered images
		return {
			config,
			infoData,
			appComponent,
			imagesCarousel,
			imagesCarouselRender,
			modules: [Pagination, Autoplay, Navigation], // Swiper modules to be used
		};
	},
	beforeMount() {
		// Logic to determine which images to render based on user session and configuration
		if (
			this.appComponent.session.logueado &&
			this.config != undefined &&
			this.config['BONUS_PROMOTION'] != undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country] !=
				undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country][
				this.appComponent.lngProd
			] != undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country][
				this.appComponent.lngProd
			]['login'] != undefined
		) {
			this.imagesCarouselRender = JSON.parse(
				JSON.stringify(
					this.config['BONUS_PROMOTION'][this.appComponent.country][
						this.appComponent.lngProd
					]['login']
				)
			); // Rendering images for logged-in users
		} else if (
			!this.appComponent.session.logueado &&
			this.config != undefined &&
			this.config['BONUS_PROMOTION'] != undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country] !=
				undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country][
				this.appComponent.lngProd
			] != undefined &&
			this.config['BONUS_PROMOTION'][this.appComponent.country][
				this.appComponent.lngProd
			]['notLogin'] != undefined
		) {
			this.imagesCarouselRender = JSON.parse(
				JSON.stringify(
					this.config['BONUS_PROMOTION'][this.appComponent.country][
						this.appComponent.lngProd
					]['notLogin']
				)
			); // Rendering images for non-logged-in users
		}
	},
	methods: {
		goToLink(url) {
			window.open(url, '_blank'); // Method to open a link in a new tab
		},
	},
});
</script>
<template>
	<!-- Main section for the carousel when layout is 5 -->
	<section
		v-if="
			imagesCarouselRender.length > 0 &&
			config.layout != undefined &&
			config.layout == 5
		"
	>
		<swiper
			:slidesPerView="1"
			:spaceBetween="100"
			:loop="true"
			:autoplay="{
				delay: 2500,
				disableOnInteraction: false,
			}"
			:breakpoints="{
				'1000': {
					slidesPerView: 2,
					spaceBetween: 40,
				},
			}"
			:modules="modules"
			class="mySwiper flex justify-between flex-col items-center gap-y-1 md:gap-y-8 h-auto max-w-[1300px] w-11/12"
		>
			<!-- SwiperSlide component for each item in imagesCarouselRender array -->
			<swiper-slide
				v-for="item in imagesCarouselRender"
				class="group p-5 lg:p-0 flex justify-start bg-secondary items-center shrink-0 h-auto rounded-xl md:rounded-2xl relative my-8 overflow-hidden"
				:style="{
					background:
						'linear-gradient(133deg, ' +
						item.colorBg +
						'8a -12%, #ffffff00, #ffffff00, ' +
						item.colorBg +
						' 114%',
				}"
			>
				<!-- RouterLink to navigate to the item's URL -->
				<RouterLink
					:to="item.MENU_URL"
					class="w-[80%] md:w-[65%] flex flex-col gap-y-3 md:gap-y-4 justify-center items-start pr-14 pl-3 py-3 md:pr-8 md:pl-8 md:py-12"
				>
					<!-- Image element for the item -->
					<img
						:src="item.img"
						class="saturate-[1.3] absolute w-[40%] h-full group-hover:scale-105 transition-all ease-in-out object-contain top-0 right-[-9px]"
						alt=""
					/>
					<!-- Title of the item -->
					<p
						:style="{ color: item.colorBg }"
						class="font-poppinsb brightness-125 text-sm md:text-2xl relative"
					>
						{{ $t(item.title) }}
					</p>
					<!-- Description of the item -->
					<p
						class="text-white text-[0.70rem] relative font-poppinssl leading-[0.80rem] md:leading-[1.75rem] md:text-lg max-h-[34px] min-h-[23px] md:max-h-[75px] overflow-y-auto"
						v-html="$t(item.description)"
					></p>
				</RouterLink>
			</swiper-slide>
		</swiper>
	</section>
	<!-- Main section for the carousel when layout is not 5 -->
	<section
		v-if="
			imagesCarouselRender.length > 0 &&
			config.layout != undefined &&
			config.layout != 5
		"
		class="h-auto py-2 md:py-4"
	>
		<swiper
			:slidesPerView="1"
			:spaceBetween="100"
			:loop="true"
			:autoplay="{
				delay: 2500,
				disableOnInteraction: false,
			}"
			:breakpoints="{
				'640': {
					slidesPerView: 2,
					spaceBetween: 40,
				},
			}"
			:modules="modules"
			class="mySwiper flex justify-between flex-col items-start gap-y-1 md:gap-y-8 h-auto max-w-[1300px] w-11/12"
		>
			<!-- SwiperSlide component for each item in imagesCarouselRender array -->
			<swiper-slide
				v-for="item in imagesCarouselRender"
				class="bg-neutral-content group flex justify-start items-center shrink-0 h-auto rounded-xl md:rounded-2xl border-solid border-2 border-[#3D4958ff] relative"
			>
				<div
					class="w-[80%] md:w-[65%] flex flex-col gap-y-3 md:gap-y-4 justify-center items-start pr-8 pl-3 py-3 md:pr-8 md:pl-8 md:py-12"
				>
					<!-- Title of the item -->
					<p
						:style="{ color: item.colorBg }"
						class="font-bold text-sm md:text-2xl"
					>
						{{ $t(item.title) }}
					</p>
					<!-- Description of the item -->
					<p
						class="text-white text-[0.70rem] leading-[0.80rem] md:leading-[1.75rem] md:text-lg max-h-[34px] min-h-[23px] md:max-h-[75px] overflow-y-auto"
						v-html="$t(item.description)"
					></p>
					<!-- Button to navigate to the item's URL in the same tab -->
					<button
						v-if="!item.MENU_NEWTAB"
						:style="{
							background:
								'linear-gradient(90deg, #ffffff85, ' +
								item.colorBg +
								'),' +
								item.colorBg,
						}"
						class="text-white rounded-full text-xs md:text-lg px-4 group-hover:scale-105 py-1 font-medium transition-all ease-in-out"
					>
						<RouterLink :to="item.MENU_URL">{{
							$t(item.textButton)
						}}</RouterLink>
					</button>
					<!-- Button to navigate to the item's URL in a new tab -->
					<button
						v-else
						:style="{
							background:
								'linear-gradient(90deg, #ffffff85, ' +
								item.colorBg +
								'),' +
								item.colorBg,
						}"
						class="text-white rounded-full text-xs md:text-lg px-4 group-hover:scale-105 py-1 font-medium transition-all ease-in-out"
					>
						<a @click="goToLink(item.MENU_URL)">{{
							$t(item.textButton)
						}}</a>
					</button>
				</div>
				<!-- Decorative span element with box-shadow effect -->
				<span
					class="bg-transparent w-[2px] md:w-[100px] h-[2px] md:h-[100px] rounded-full absolute top-[74px] right-[65px] md:top-[50px] md:right-[56px] opacity-40"
					:style="{
						'box-shadow':
							'0px ' +
							'0px ' +
							'50px ' +
							'50px ' +
							item.colorBg +
							', inset 0 0 50px 50px ' +
							item.colorBg,
					}"
				>
				</span>
				<!-- Image element for the item -->
				<img
					:src="item.img"
					class="saturate-[1.3] absolute top-[-30px] md:top-[-46px] bg w-[132px] group-hover:scale-105 transition-all ease-in-out h-[132px] md:w-[270px] md:h-[270px] object-contain right-[-7px] md:right-[-24px]"
					alt=""
				/>
			</swiper-slide>
			<!-- Slot for custom content at the start of the container -->
			<template v-slot:container-start
				><span class="text-white text-xl text-left">{{
					$t('Bonos')
				}}</span></template
			>
		</swiper>
	</section>
</template>
<style scoped>
::-webkit-scrollbar {
	width: 0.2em; /* Width of the scrollbar */
	height: 8px; /* Height of the scrollbar */
}
::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow for the scrollbar track */
	border-radius: 20px; /* Rounded corners for the track */
}
::-webkit-scrollbar-thumb {
	background-color: #3d4958ff !important; /* Color of the scrollbar thumb */
	border-radius: 20px; /* Rounded corners for the thumb */
}
</style>

<!-- FILE DOCUMENTED -->
