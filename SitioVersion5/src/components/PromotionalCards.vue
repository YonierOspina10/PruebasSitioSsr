<template>
	<!-- Main section for displaying promotions if the list is not empty -->
	<section
		v-if="promotionsList.length > 0"
		class="w-full flex justify-center items-center gap-0  mx-auto"
        :class="{
            'max-w-[1155px]': appComponent.config.layout === 6,
            'max-w-[1300px]': appComponent.config.layout === 3,
        }"
	>
		<!-- Button to navigate left in the promotions slider -->
		<button id="buttonLeft" class="hover:scale-125">
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
		<!-- Swiper container for displaying promotions in a slider format -->
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
			<!-- Slide for each promotion in the promotions list -->
			<swiper-slide
				v-for="(promotion, index) in promotionsList.filter(promotion => promotion.isExpired != true)"
				:key="index"
				class="w-[264px] h-[146px] tablet:w-[203px] tablet:h-[112px] desktop:w-[350px] desktop:h-[192px] max-w-[85vw] rounded-[14px] border desktop:border-2 border-primary-content/75 cursor-pointer overflow-hidden"
				@click="promotionClick(promotion)"
			>
				<!-- Image of the promotion -->
				<img
					:src="promotion.urlImage"
					alt=""
					class="w-full h-full object-cover rounded-[13px] hover:scale-[1.02] transition-transform duration-300 ease-in-out"
				/>
			</swiper-slide>
		</swiper-container>
		<!-- Button to navigate right in the promotions slider -->
		<button id="buttonRight" class="hover:scale-125">
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
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useRoute } from 'vue-router';
register();
export default defineComponent({
	// Setup function for component state management
	setup() {
		const route = useRoute(); // Get current route
		let sectionId: any = ref(route.params.sectionId); // Reference to section ID from route parameters
		return {
			sectionId,
		};
	},
	// Data function for component data properties
	data() {
		let config = this.$config(); // Configuration object
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
	// Lifecycle hook called when the component is created
	created() {
		// Determine the device theme based on configuration
		if (
			this.appComponent.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		) {
			this.deviceTheme = 'theme_colors_desktop';
		} else if (
			this.appComponent.config.theme_colors_mobile != undefined &&
			this.appComponent.config.mobileL != ''
		) {
			this.deviceTheme = 'theme_colors_mobile';
		}
		this.colors = this.appComponent.config[this.deviceTheme]; // Set colors based on theme
	},
	// Lifecycle hook called when the component is mounted
	mounted() {
		// Load bonuses based on configuration and language
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login'][this.appComponent.lngProd] != undefined &&
			this.config['not_login'][this.appComponent.lngProd]['promotions'] !=
				undefined
		) {
			this.bonuses =
				this.config['not_login'][this.appComponent.lngProd][
					'promotions'
				];
		} else {
			if (
				this.config != undefined &&
				this.config.promotions != undefined &&
				this.config.promotions[this.appComponent.country] !=
					undefined &&
				this.config.promotions[this.appComponent.country][
					this.appComponent.lngProd
				] != undefined
			) {
				this.bonuses =
					this.config.promotions[this.appComponent.country][
						this.appComponent.lngProd
					];
			}
		}
		// Filter bonuses based on date criteria
		this.bonuses = this.bonuses.filter((e) => {
			if (
				(e.startDate == undefined || e.startDate == '') &&
				(e.date == undefined || e.date == '')
			) {
				return true;
			}
			var currentDate = new Date();
			currentDate.setHours(0, 0, 0, 0);
			if (
				e.startDate != undefined &&
				e.startDate != '' &&
				e.date != undefined &&
				e.date != ''
			) {
				var startDate = new Date(e.startDate);
				var endDate = new Date(e.date);
				return (
					currentDate.getTime() >= startDate.getTime() &&
					currentDate.getTime() <= endDate.getTime()
				);
			}
			if (
				(e.startDate != undefined || e.startDate != '') &&
				(e.date == undefined || e.date == '')
			) {
				var startDate = new Date(e.startDate);
				return currentDate.getTime() >= startDate.getTime();
			}
			if (
				(e.startDate == undefined || e.startDate == '') &&
				(e.date != undefined || e.date != '')
			) {
				var endDate = new Date(e.date);
				return currentDate.getTime() <= endDate.getTime();
			}
			return true;
		});
		// Trigger promotion click if section ID is defined
		if (this.sectionId != undefined) {
			this.promotionClick(
				this.bonuses.filter((item: any) => {
					return (
						item.slug.replaceAll(' ', '-').toLowerCase() ==
						this.sectionId
					);
				})[0]
			);
		}
		// Set cards based on bonuses and mobile configuration
		if (this.config.mobileL != undefined && this.config.mobileL != '')
			this.cards = this.bonuses?.slice(0, 4);
		else this.cards = this.bonuses?.slice(0, 3);
		// Determine promotions list based on app component configuration
		this.promotionsList =
		    this.appComponent.config.promotions != undefined &&
		    this.appComponent.config.promotions[this.appComponent.country] != undefined &&
		    this.appComponent.config.promotions[this.appComponent.country].version != undefined &&
		    this.appComponent.config.promotions[this.appComponent.country].version == 3
		        ? this.cards
		        : this.bonuses;
			
		// 🔥 FILTRO FINAL PARA EVITAR PROMOS VACÍAS
		this.promotionsList = this.promotionsList.filter(p => {
		    return p 
		        && p.urlImage 
		        && p.urlImage !== '' 
		        && p.isExpired !== true;
		});
		let count = 0;
		// Interval to set up swiper navigation buttons
		const intervalSwiper = setInterval(() => {
			count++;
			try {
				const swiperEl = document.getElementById(
					'promotionsCardSlider'
				) as any;
				if (swiperEl || count > 10) {
					clearInterval(intervalSwiper);
					const buttonLeft = document.getElementById('buttonLeft');
					const buttonRight = document.getElementById('buttonRight');
					buttonLeft?.addEventListener('click', (e) => {
						e.preventDefault();
						swiperEl?.swiper.slidePrev(); // Navigate to previous slide
					});
					buttonRight?.addEventListener('click', (e) => {
						e.preventDefault();
						swiperEl?.swiper.slideNext(); // Navigate to next slide
					});
				}
			} catch (e) {
				console.log(e); // Log any errors encountered
			}
		}, 1000);
	},
	methods: {
		// Method to handle promotion click event
		promotionClick(item) {
			this.appComponent.modal.showModal = 'promotion'; // Show promotion modal
			this.appComponent.promotionModal = item; // Set the selected promotion
			window.history.pushState(
				'',
				'',
				'/promociones-bonos/' +
					item.slug.replaceAll(' ', '-').toLowerCase() // Update URL with promotion slug
			);
		},
	},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->
