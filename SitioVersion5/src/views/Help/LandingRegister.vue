<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import router from '@/router'; // Importing the router for navigation

export default defineComponent({
	data: function () {
		let config = this.$config(); // Fetching configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let landingRegister: any =
			appComponent.config.registro.landingRegister != undefined &&
			appComponent.config.registro.landingRegister[
				appComponent.country
			] != undefined
				? appComponent.config.registro.landingRegister[
						appComponent.country
					] // Getting landing register based on the country
				: undefined;
		return {
			config, // Returning config to the component's data
			appComponent, // Returning appComponent to the component's data
			landingRegister, // Returning landingRegister to the component's data
		};
	},
	methods: {
		onSubmit() {
			// Method to handle form submission
			router.push(
				this.landingRegister != undefined &&
					this.landingRegister['submitRedirect'] != undefined
					? this.landingRegister['submitRedirect'] // Redirecting to submitRedirect if defined
					: '/home' // Default redirect to home
			);
			if (
				this.landingRegister != undefined &&
				this.landingRegister['openLogin'] != undefined &&
				this.landingRegister['openLogin']
			)
				this.appComponent.showModalLogin = true; // Show login modal if openLogin is true
		},
	},
});
</script>

<template>
	<section
		:style="{
			background:
				landingRegister.background != undefined
					? landingRegister.background
					: '#000000',
			backgroundImage:
				landingRegister != undefined &&
				landingRegister['backgroundImg'] != undefined &&
				landingRegister['backgroundImg'] != ''
					? `url('${landingRegister.backgroundImg}')`
					: '',
		}"
		:class="[
			{
				'[mask-image:_linear-gradient(black_70%_,_transparent)]':
					landingRegister != undefined &&
					landingRegister['opacityDown'] != undefined &&
					landingRegister['opacityDown'],
			},
			landingRegister != undefined &&
			landingRegister['modalProperty'] != undefined &&
			landingRegister['modalProperty']
				? 'fixed inset-0 z-[9999] w-full h-full'
				: 'w-screen h-screen',
		]"
		class="flex flex-col justify-center items-center p-8 bg-cover gap-10"
	>
		<img
			v-if="
				landingRegister != undefined &&
				landingRegister['initialImg'] != undefined
			"
			:src="
				this.landingRegister != undefined &&
				this.landingRegister['initialImg'] != undefined &&
				this.landingRegister['initialImg'] != ''
					? this.landingRegister['initialImg']
					: this.appComponent.config.logo
			"
			alt="logo register"
			width="100px"
			height="100px"
		/>
		<div
			v-if="
				landingRegister != undefined &&
				landingRegister['text'] != undefined
			"
			v-html="landingRegister['text']"
		></div>
		<button
			class="bg-primary-content text-neutral rounded-md px-12 py-4 hover:scale-110 transition-all ease-in-out"
			@click="onSubmit()"
		>
			{{ $t('Aceptar') }} // Button text for submission
		</button>
	</section>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->
