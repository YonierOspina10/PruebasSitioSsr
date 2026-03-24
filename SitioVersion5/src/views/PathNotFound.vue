<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the home page.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * Initializes config and appComponent from the Vue instance.
	 */
	data() {
		let config = this.$config(); // Fetches configuration settings.
		let appComponent: any = this.$appComponent; // Retrieves the application component.
		return {
			config,
			appComponent,
		};
	},
	/**
	 * Lifecycle hook called after the component is mounted.
	 */
	mounted() {},
	methods:{
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:PathNotFound|layout:layout-${this.appComponent.config.layout}`
            };
        },
	}
});
</script>

<template>
	<!-- Main wrapper for the home page -->
	<div id="home-wrapper" class="py-8">
		<!-- Slider section, displayed if layout is not equal to 3 -->
		<div id="home-slider" v-if="config.layout != 3">
			<div
				class="Container HomeSliderBox HomeHomeSliderBox flexslider"
				id="HomeSliderBox"
			>
				<ul
					class="Container slides HomeSlider HomeHomeSlider"
					id="HomeSlider"
					role="navigation"
					data-type="HomeSlider"
				>
					<li
						style="text-align: center; display: block"
						class="h-auto text-neutral"
					>
						<div
							class="Container SlideContent flex flex-col justify-center items-center gap-20"
							itemprop="itemOffered"
						>
							<span
								style="
									text-align: center;
									font-size: 10em;
									line-height: 160px;
								"
								class="SlideTitle"
								itemprop="name"
								>404</span
							>
							<!-- Title indicating a 404 error -->
							<p
								style="text-align: center"
								class="SlideText"
								itemprop="description"
							>
								{{ $t('La página buscada no existe.') }}
								<!-- Message for page not found -->
							</p>
							<RouterLink
								style="text-align: center"
								target="_self"
								to="/deportes"
								v-bind="analyticsAttrs('menu:nav:sports')"
								title="{{'Apuesta ya'}}"
								class="button SlideButton btn btn-primary"
								itemprop="url"
							>
								<span class="ButtonText text-white">{{
									$t('Apuesta ya')
								}}</span>
								<!-- Button text for navigation -->
							</RouterLink>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- Section displayed if layout is equal to 3 -->
		<section
			v-if="config.layout != undefined && config.layout == 3"
			class="w-full h-[710px] relative flex justify-center items-center"
		>
			<div
				class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute -top-1"
			></div>
			<img
				src="https://images.virtualsoft.tech/m/msjT1684245164.png"
				alt=""
				class="w-full h-full"
			/>
			<div
				class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute -bottom-16"
			></div>
			<article
				class="absolute w-full h-auto max-w-[1300px] mx-auto flex flex-col justify-center items-center"
			>
				<div
					class="h-72 w-11/12 lg:w-auto lg:h-full from-purple-700/50 to-primary/25 flex flex-col-reverse lg:flex-row justify-center items-center"
				>
					<div
						class="w-auto h-auto flex flex-col justify-center items-center gap-5"
					>
						<div
							class="h-28 lg:h-64 w-full lg:w-[450px] mt-0 lg:mt-20"
						>
							<img
								src="https://images.virtualsoft.tech/m/msjT1684245229.png"
								alt=""
								class="number_notFound w-full h-full object-contain"
							/>
						</div>
						<p
							class="h-16 lg:h-32 w-full text-center lg:text-3xl text-neutral flex justify-center items-center"
						>
							{{ $t('La página buscada no existe.') }}
							<!-- Message for page not found -->
						</p>
						<RouterLink
							to="/deportes"
							v-bind="analyticsAttrs('menu:nav:sports')"
							class="bg-accent-focus hover:bg-accent-content hover:scale-105 h-16 w-52 rounded-xl text-xl text-neutral font-semibold shadow-xl flex justify-center items-center"
							>{{ $t('Apuesta ya') }}</RouterLink
						>
						<!-- Button for navigation -->
					</div>
					<div
						class="w-auto h-96 lg:h-[500px] pl-7 lg:pl-0 mb-5 lg:mb-0 flex justify-center items-end lg:items-center"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1684245196.png"
							alt=""
							class="w-full h-full object-contain"
						/>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>

<style scoped>
/* Styles for elements with the bg_effect class */
.bg_effect {
	transition: none; /* No transition effect */
	animation: none; /* No animation effect */
	border: none; /* No border */
}

/* Keyframes for profile animation */
@keyframes profile__animate {
	0% {
		border-radius: 70% 40% 30% 40%/50% 30% 70% 40%; /* Initial border radius */
	}
	50% {
		border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; /* Midpoint border radius */
	}
	100% {
		border-radius: 70% 40% 30% 40%/50% 30% 70% 40%; /* Final border radius */
	}
}

/* Animation for number_notFound class */
.number_notFound {
	animation: number 10s ease-in-out infinite; /* Infinite animation */
}

/* Keyframes for number animation */
@keyframes number {
	0% {
		scale: 1; /* Initial scale */
	}
	50% {
		scale: 1.15; /* Scale up */
		margin-left: 10px; /* Shift to the right */
	}
	100% {
		scale: 1; /* Return to initial scale */
	}
}

/* Media query for larger screens */
@media (min-width: 768px) {
	.bg_effect {
		transition: 2s; /* Transition effect for larger screens */
		animation: profile__animate 10s ease-in-out infinite; /* Infinite animation */
		border: solid 5px rgb(126, 34, 206, 0.5); /* Border styling */
	}
	.number_notFound {
		animation: none; /* Disable animation for number_notFound */
	}
}
</style>

<!-- FILE DOCUMENTED -->
