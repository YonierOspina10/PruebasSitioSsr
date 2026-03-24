<template>
	<!-- Main section containing the Swiper component for displaying categories -->
	<section
		class="w-auto flex justify-start items-center px-5 lg:px-14 py-2"
	>
		<Swiper
			:slidesPerView="'auto'"
			:centeredSlides="false"
			:centerInsufficientSlides="true"
			:spaceBetween="10"
			:grabCursor="true"
			:modules="modules"
			class="mySwiper swiper-h max-w-[1300px] w-full h-full flex justify-start items-center rounded-xl"
		>
			<!-- Iterates over categories to create slides -->
			<SwiperSlide
				v-for="category in reelsCategories"
				class="h-[162px] sm:h-full max-h-[325px] w-[100px] sm:w-full max-w-[200px] aspect-[1/2] bg-transparent"
			>
				<button
					@click="onCategoryOpen(category)"
					class="in w-full h-full relative"
				>
					<!-- Displays the GIF of the first reel in the category -->
					<img
						:src="category.reels[0].gif"
						alt=""
						class="w-full h-full object-cover object-top rounded-xl"
					/>
					<!-- Displays the category title -->
					<span
						class="absolute z-20 bottom-1 left-auto w-full h-16 p-2 leading-4 lg:leading-6 text-neutral font-bold flex justify-center items-center text-left sm:text-center break-words text-sm md:text-base lg:text-lg capitalize whitespace-pre-wrap"
					>
						{{ $t(category.title) }}
					</span>
					<div
						class="absolute -bottom-[5px] w-full h-20 bg-gradient-to-t from-black to-transparent"
					></div>
				</button>
			</SwiperSlide>
		</Swiper>
	</section>
	<Transition name="slide-fade">
		<!-- Transition section for when a category is opened -->
		<section
			v-if="categoryOpen != undefined"
			class="fixed top-0 left-0 z-[999] w-screen h-screen bg-black/70 flex justify-center items-center"
		>
			<!-- Vertical Swiper for displaying reels -->
			<Swiper
				class="mySwiper swiper-v relative"
				:direction="'vertical'"
				:spaceBetween="0"
				:autoplay="{
					delay: 16000,
					disableOnInteraction: false,
				}"
				:pagination="{
					clickable: true,
					progressbarOpposite: true,
				}"
				:modules="modules"
				:navigation="{ nextEl: '.slideNext', prevEl: '.slidePrev' }"
				@autoplayTimeLeft="onAutoplayTimeLeft"
			>
				<!-- Iterates over reels in the opened category -->
				<SwiperSlide
					v-for="(reel, i) in categoryOpen.reels"
					class="w-full h-full flex justify-center items-center"
				>
					<div
						class="relative w-[350px] h-[600px] flex justify-center items-center"
					>
						<button
							class="w-full h-full"
							@click="onReelOpen(reel.redirect)"
						>
							<img
								:src="reel.gif"
								alt=""
								class="w-full h-full object-cover object-center rounded-xl"
							/>
						</button>
						<button
							@click="onReelClose()"
							class="absolute top-2 right-3 hover:scale-105"
						>
							<font-awesome-icon
								icon="fa-solid fa-xmark"
								class="text-primary text-3xl lg:text-5xl font-bold"
							/>
						</button>
						<div
							v-if="swipeUp"
							class="absolute bottom-2 z-30 w-full flex justify-center items-center"
						>
							<img
								src="https://images.virtualsoft.tech/m/msjT1688124783.png"
								alt=""
								class="swipeUp w-20 object-contain object-center ml-12"
							/>
						</div>
					</div>
				</SwiperSlide>
				<div
					class="absolute top-2 w-full flex justify-center items-center z-[1000]"
				>
					<button class="slidePrev cursor-pointer">
						<!-- Previous slide button -->
						<font-awesome-icon
							icon="fa-solid fa-chevron-down"
							size="4x"
							class="text-primary rotate-180"
						/>
					</button>
				</div>
				<div
					class="absolute bottom-2 w-full flex justify-center items-center z-[1000]"
				>
					<button class="slideNext cursor-pointer">
						<!-- Next slide button -->
						<font-awesome-icon
							icon="fa-solid fa-chevron-down"
							size="4x"
							class="text-primary"
						/>
					</button>
				</div>
				<template #container-end>
					<div class="autoplay-progress">
						<!-- Progress indicator for autoplay -->
						<svg viewBox="0 0 48 48" ref="progressCircle">
							<circle cx="24" cy="24" r="20"></circle>
						</svg>
						<span ref="progressContent" class="text-2xl"></span>
					</div>
				</template>
			</Swiper>
		</section>
	</Transition>
	<!-- Transition for desktop devices (category opened) -->
	<Transition name="slide-fade">
		<section
			v-if="categoryOpen != undefined"
			class="fixed top-0 left-0 z-[999] w-screen h-screen bg-black/70 flex justify-center items-center"
		>
			<!-- Swiper horizontal -->
			<Swiper
				class="mySwiper swiper-h relative"
				:spaceBetween="0"
				:autoplay="{
					delay: 16000,
					disableOnInteraction: false,
				}"
				:pagination="{
					clickable: true,
					progressbarOpposite: true,
				}"
				:modules="modules"
				:navigation="true"
				@autoplayTimeLeft="onAutoplayTimeLeft"
			>
				<!-- Iterates over each reel in the opened category -->
				<SwiperSlide
					v-for="(reel, i) in categoryOpen.reels"
					class="w-full h-full flex justify-center items-center"
				>
					<div
						class="relative w-[350px] h-[600px] flex justify-center items-center"
					>
						<!-- Button that shows the reel image -->
						<button
							class="w-full h-full"
							@click="onReelOpen(reel.redirect)"
						>
							<!-- Reel image -->
							<img
								:src="reel.gif"
								alt=""
								class="w-full h-full object-cover object-center rounded-xl"
							/>
						</button>
						<!-- Button to close the reel -->
						<button
							@click="onReelClose()"
							class="absolute top-2 right-3 hover:scale-105"
						>
							<font-awesome-icon
								icon="fa-solid fa-xmark"
								class="text-primary text-3xl lg:text-5xl font-bold"
							/>
						</button>
						<!-- Indicator for swipe-left -->
						<div
							v-if="swipeUp"
							class="absolute bottom-2 z-30 w-full flex justify-center items-center"
						>
							<img
								src="https://images.virtualsoft.tech/m/msjT1688124783.png"
								alt=""
								class="swipeLeft w-20 object-contain object-center ml-12"
							/>
						</div>
					</div>
				</SwiperSlide>
				<!-- Template for the autoplay progress bar -->
				<template #container-end>
					<div class="autoplay-progress">
						<!-- Progress indicator for autoplay -->
						<svg viewBox="0 0 48 48" ref="progressCircle">
							<circle cx="24" cy="24" r="20"></circle>
						</svg>
						<span ref="progressContent" class="text-2xl"></span>
					</div>
				</template>
			</Swiper>
		</section>
	</Transition>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importing Vue composition API
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper components
import ExitIcon from './icons/ExitIcon.vue'; // Importing ExitIcon component
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importing Swiper modules
import 'swiper/css'; // Importing Swiper CSS
import 'swiper/css/pagination'; // Importing Swiper pagination CSS
import 'swiper/css/navigation'; // Importing Swiper navigation CSS
import 'swiper/css/autoplay'; // Importing Swiper autoplay CSS
export default defineComponent({
	props: {
		reelsCategories: Object, // Prop for categories of reels
	},
	components: {
		ExitIcon, // Registering ExitIcon component
		Swiper, // Registering Swiper component
		SwiperSlide, // Registering SwiperSlide component
	},
	setup() {
		const progressCircle = ref<any>(null); // Reference for progress circle
		const progressContent = ref<any>(null); // Reference for progress content
		const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
			// Function to handle autoplay time left
			progressCircle.value.style.setProperty('--progress', 1 - progress); // Update progress circle
			progressContent.value.textContent = `${Math.ceil(time / 1000)}s`; // Update time left display
		};
		return {
			onAutoplayTimeLeft, // Exposing function to template
			progressCircle, // Exposing progress circle reference to template
			progressContent, // Exposing progress content reference to template
			modules: [Autoplay, Pagination, Navigation], // Exposing Swiper modules to template
		};
	},
	data: function () {
		let appComponent: any = this.$appComponent; // Reference to app component
		let categoryOpen: any = undefined; // Currently opened category
		let swipeUp: boolean = false; // Swipe up indicator
		let time: number = 0; // Timer variable
		let scrHeight: number = 0; // Screen height variable
		let index: number = 0; // Index variable
		let scrollMain: any = undefined; // Reference to main scroll
		return {
			appComponent, // Exposing app component to template
			categoryOpen, // Exposing opened category to template
			swipeUp, // Exposing swipe up indicator to template
			time, // Exposing timer to template
			scrHeight, // Exposing screen height to template
			index, // Exposing index to template
			scrollMain, // Exposing main scroll reference to template
		};
	},
	mounted() {}, // Lifecycle hook for mounted
	methods: {
		onCategoryOpen(category) {
			// Method to open a category
			this.categoryOpen = category; // Set opened category
			this.swipeUp = true; // Enable swipe up indicator
		},
		onReelOpen(url) {
			// Method to open a reel
			this.$router.push(url); // Navigate to reel URL
		},
		onReelClose() {
			// Method to close the reel
			this.categoryOpen = undefined; // Clear opened category
		},
	},
});
</script>
<style scoped>
.swipeUp {
	animation: swUp 5s ease-in-out 0s 1 forwards; /* Animation for swipe up effect */
}
.swipeLeft {
	animation: swLeft 5s ease-in-out 0s 1 forwards; /* Animation for swipe left effect */
}
@keyframes swUp {
	0% {
		transform: translateY(0px); /* Initial position */
		opacity: 0; /* Initial opacity */
	}
	25% {
		transform: translateY(-50px); /* Move up */
		opacity: 1; /* Full opacity */
	}
	50% {
		transform: translateY(0px); /* Return to initial position */
		opacity: 0.8; /* Slightly transparent */
	}
	75% {
		transform: translateY(-50px); /* Move up again */
		opacity: 1; /* Full opacity */
	}
	100% {
		transform: translateY(0px); /* Return to initial position */
		opacity: 0; /* Fade out */
	}
}
@keyframes swLeft {
	0% {
		transform: translateX(50px) rotate(90deg); /* Initial position */
		opacity: 0; /* Initial opacity */
	}
	25% {
		transform: translateX(-50px) rotate(90deg); /* Move left */
		opacity: 1; /* Full opacity */
	}
	50% {
		transform: translateX(50px) rotate(90deg); /* Return to initial position */
		opacity: 0.8; /* Slightly transparent */
	}
	75% {
		transform: translateX(-50px) rotate(90deg); /* Move left again */
		opacity: 1; /* Full opacity */
	}
	100% {
		transform: translateX(50px) rotate(90deg); /* Return to initial position */
		opacity: 0; /* Fade out */
	}
}
.sliderReels::-webkit-scrollbar,
.main-reels::-webkit-scrollbar {
	display: none; /* Hides the scrollbar */
}
.slide-fade-enter-active {
	transition: all 0.3s ease-out; /* Transition for entering */
}
.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); /* Transition for leaving */
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(30px); /* Slide effect for entering and leaving */
	opacity: 0; /* Fade out effect */
}
.swiper {
	width: 100%; /* Full width for Swiper */
	height: 100%; /* Full height for Swiper */
}
.swiper-slide {
	text-align: center; /* Center text alignment */
	font-size: 18px; /* Font size for slides */
	background: #00000050; /* Semi-transparent background */
	display: flex; /* Flexbox for centering */
	justify-content: center; /* Center content horizontally */
	align-items: center; /* Center content vertically */
}
.swiper-slide img {
	display: block; /* Block display for images */
	width: 100%; /* Full width for images */
	height: 100%; /* Full height for images */
	object-fit: cover; /* Cover the area without distortion */
}
.swiper-v {
	background: #00000050; /* Semi-transparent background for vertical swiper */
}
[data-theme='dorado3'] .autoplay-progress {
	position: absolute; /* Absolute positioning for progress */
	right: 16px; /* Positioning from the right */
	bottom: 16px; /* Positioning from the bottom */
	z-index: 1000; /* High z-index for visibility */
	width: 55px; /* Width of the progress indicator */
	height: 55px; /* Height of the progress indicator */
	display: flex; /* Flexbox for centering */
	align-items: center; /* Center content vertically */
	justify-content: center; /* Center content horizontally */
	font-weight: bold; /* Bold font for text */
	color: #d59c00; /* Color for text */
}
[data-theme='dorado3'] .autoplay-progress svg {
	--progress: 0; /* CSS variable for progress */
	position: absolute; /* Absolute positioning for SVG */
	left: 0; /* Positioning from the left */
	top: 0px; /* Positioning from the top */
	z-index: 1000; /* High z-index for visibility */
	width: 100%; /* Full width for SVG */
	height: 100%; /* Full height for SVG */
	stroke-width: 4px; /* Stroke width for circle */
	stroke: #d59c00; /* Stroke color */
	fill: none; /* No fill for circle */
	stroke-dashoffset: calc(
		125.6 * (1 - var(--progress))
	); /* Dash offset for progress */
	stroke-dasharray: 125.6; /* Total length of the circle */
	transform: rotate(-90deg); /* Rotate circle for progress */
}
[data-theme='dorado4'] .autoplay-progress {
	position: absolute; /* Absolute positioning for progress */
	right: 16px; /* Positioning from the right */
	bottom: 16px; /* Positioning from the bottom */
	z-index: 1000; /* High z-index for visibility */
	width: 55px; /* Width of the progress indicator */
	height: 55px; /* Height of the progress indicator */
	display: flex; /* Flexbox for centering */
	align-items: center; /* Center content vertically */
	justify-content: center; /* Center content horizontally */
	font-weight: bold; /* Bold font for text */
	color: #abc90b; /* Color for text */
}
[data-theme='dorado4'] .autoplay-progress svg {
	--progress: 0; /* CSS variable for progress */
	position: absolute; /* Absolute positioning for SVG */
	left: 0; /* Positioning from the left */
	top: 0px; /* Positioning from the top */
	z-index: 1000; /* High z-index for visibility */
	width: 100%; /* Full width for SVG */
	height: 100%; /* Full height for SVG */
	stroke-width: 4px; /* Stroke width for circle */
	stroke: #abc90b; /* Stroke color */
	fill: none; /* No fill for circle */
	stroke-dashoffset: calc(
		125.6 * (1 - var(--progress))
	); /* Dash offset for progress */
	stroke-dasharray: 125.6; /* Total length of the circle */
	transform: rotate(-90deg); /* Rotate circle for progress */
}
</style>

<!-- FILE DOCUMENTED -->
