<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import IconPlay from '@/components/icons/IconPlay.vue'; // Importing the IconPlay component
import IconCheckv2Rounde from '@/components/icons/IconCheckv2Rounde.vue'; // Importing the IconCheckv2Rounde component

export default defineComponent({
	data: function () {
		let config = this.$config(); // Retrieving the configuration object
		let urlApk =
			this.$config() != undefined && // Checking if config is defined
			this.$config().landing != undefined && // Checking if landing is defined
			this.$config().landing.app !== undefined && // Checking if app is defined
			this.$config().landing.app.apk_url[this.$appComponent['country']] !=
				undefined // Checking if apk_url for the country is defined
				? this.$config().landing.app.apk_url[
						this.$appComponent['country']
					] // Assigning the country-specific APK URL
				: this.$config().landing.app.apk_url; // Fallback to default APK URL
		let appComponent: any = this.$appComponent; // Storing the app component reference
		return {
			config, // Returning the config object
			urlApk, // Returning the APK URL
			appComponent, // Returning the app component
		};
	},
	components: {
		IconPlay, // Registering the IconPlay component
		IconCheckv2Rounde, // Registering the IconCheckv2Rounde component
	},
	methods: {
		redirectToApp() {
			// Method to redirect to the app
			if (
				this.appComponent.config != undefined && // Checking if appComponent config is defined
				this.appComponent.config.partner != undefined && // Checking if partner is defined
				this.appComponent.config.partner != '8' // Checking if partner is not '8'
			) {
				window.location.assign(this.urlApk); // Redirecting to the APK URL
			} else {
				this.appComponent.gAnalytics('descarga_app'); // Tracking app download event
				window.location.assign(this.urlApk); // Redirecting to the APK URL
			}
		},
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		class="relative w-full h-full flex flex-col justify-center items-center"
	>
		<!-- Background image -->
		<img
			class="absolute w-full h-full object-cover [mask-image:_linear-gradient(black_60%_,_transparent)]"
			:src="config.landing.app.assets.bg"
			alt="background"
		/>
		<!-- Gradient overlay container -->
		<div
			class="absolute bottom-[8rem] w-full h-[23rem] bg-gradient-to-t from-neutral-content [mask-image:_linear-gradient(black_80%_,_transparent)]"
		>
			<!-- Image displayed on larger screens -->
			<img
				src="https://images.virtualsoft.tech/m/msj19212T1721678826.png"
				width="100%"
				alt=""
				class="hidden sm:block absolute inset-0 h-[25rem]"
			/>
			<!-- Centered image container -->
			<div
				class="w-[40%] h-[60%] flex justify-center items-center absolute inset-0 md:visible cursor-pointer"
			>
				<!-- Image displayed on medium and larger screens -->
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1721680428.png"
					alt=""
					width="350px"
					height="100%"
					class="hidden md:block relative top-[40%]"
				/>
			</div>
		</div>
		<!-- Main content section -->
		<section
			class="md:grid gap-2 grid-cols-2 place-content-start relative px-[1.5rem] md:px-[1.5rem] lg:px-[3.5rem] lx:px-[7.5rem] pt-10 max-w-[1300px]"
		>
			<article
				class="flex flex-col md:flex-col w-full h-full md:relative md:top-[3rem]"
			>
				<!-- Content container with headings and paragraphs -->
				<div
					class="relative flex flex-col items-center md:items-start gap-7 w-full h-full"
				>
					<!-- Main heading -->
					<h3
						class="text-center md:text-left text-[35px] h-auto md:text-[40px] font-semibold text-[#FFBB00]"
					>
						{{ $t('Descubre lo') }} <br class="block md:hidden" />
						<br class="block md:hidden" />
						{{ $t('Nuevo') }}
					</h3>
					<!-- Subheading -->
					<p
						class="text-base-200 text-[15px] md:text-[17px] text-center md:text-left"
					>
						{{ $t('Estamos trabajando para traerte lo') }}
						<br class="block md:hidden" />
						{{ $t('último en Apuestas Online') }}
					</p>
					<!-- Additional information heading for larger screens -->
					<h3
						class="text-white text-[17px] hidden md:block h-[20%] leading-[2rem]"
					>
						{{
							$t(
								'Pronto podrás explorar nuestras nuevas incorporaciones'
							)
						}}
						<br class="hidden md:block" />
						{{
							$t(
								'y descubrir productos innovadores que transformarán'
							)
						}}
						<br class="hidden md:block" />
						{{ $t('tu experiencia.') }}
					</h3>
					<!-- Additional information heading for smaller screens -->
					<h3
						class="text-white text-center text-[15px] block md:hidden leading-[1.5rem]"
					>
						{{ $t('Pronto podrás explorar nuestras nuevas') }}
						<br class="block md:hidden" />
						{{ $t('incorporaciones y descubrir productos') }}
						<br class="block md:hidden" />
						{{ $t('innovadores que transformarán') }}
						<br class="block md:hidden" />
						{{ $t('tu experiencia') }}
					</h3>
					<!-- Call to action -->
					<span
						class="relative text-neutral text-[15px] md:text-[17px] font-semibold text-center md:bottom-3"
					>
						{{ $t('¡Mantente atento!') }}
					</span>
					<!-- Image displayed on smaller screens -->
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1721680428.png"
						alt=""
						width="200px"
						height="100%"
						class="block md:hidden relative top-0 text-center"
					/>
				</div>
				<!-- Conditional image for smaller screens -->
				<img
					v-if="
						config.landing != undefined &&
						config.landing.app != undefined &&
						config.landing.app.assets != undefined &&
						config.landing.app.assets.five != undefined
					"
					:src="config.landing.app.assets.five"
					class="w-full h-full object-contain animated-image pb-10 md:hidden"
					alt="mock up"
				/>
			</article>
			<!-- Container for larger screen image -->
			<div class="pt-10">
				<img
					v-if="
						config.landing != undefined &&
						config.landing.app != undefined &&
						config.landing.app.assets != undefined &&
						config.landing.app.assets.five != undefined
					"
					:src="config.landing.app.assets.five"
					class="w-full h-full md:h-[90%] object-contain animated-image hidden md:block"
					alt="mock up"
				/>
			</div>
		</section>
		<!-- Empty section for spacing -->
		<section
			class="relative py-[5rem] md:px-[2rem] md:py-[5rem] sm:py-[3rem] flex justify-center flex-col items-center gap-12"
		></section>
	</div>
</template>
<style scoped>
/* Class for animated images */
.animated-image {
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	object-fit: contain; /* Maintain aspect ratio */
	animation: pulse-animation 3s infinite; /* Infinite pulse animation */
}

/* Class for gradient masking */
.imagegradient {
	mask-image: linear-gradient(
		black 80%,
		transparent
	); /* Gradient mask effect */
}

/* Keyframes for pulse animation */
@keyframes pulse-animation {
	0%,
	100% {
		transform: translate(-2px, -2px); /* Initial and final position */
	}
	50% {
		transform: translate(2px, 10px); /* Mid position for animation */
	}
}

/* Class for text shadow effect */
.bg-shadow {
	text-shadow: 5px 5px #1e2539; /* Shadow effect for text */
}
</style>

<!-- FILE DOCUMENTED -->
