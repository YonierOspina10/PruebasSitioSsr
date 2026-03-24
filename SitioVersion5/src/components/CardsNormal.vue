<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for the home page.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The data properties for the component.
	 */
	data() {
		let config = this.$config(); // Configuration object from the global context
		let appComponent: any = this.$appComponent; // Reference to the application component
		let HOME_CARDS: any = []; // Array to hold home card data
		let login2: string = ''; // Variable to track login status
		return {
			config,
			login2,
			appComponent,
			HOME_CARDS,
		};
	},
	/**
	 * Lifecycle hook called after the component is created.
	 */
	created() {
		// Determine login status and set login2 accordingly
		if (this.appComponent.session.logueado) {
			this.login2 = 'login';
		} else {
			if (!this.appComponent.session.logueado) {
				this.login2 = 'not_login';
			}
		}
		// Load HOME_CARDS based on configuration and login status
		if (
			this.config != undefined &&
			this.config[this.login2] != undefined &&
			this.config[this.login2][this.appComponent.lngProd] != undefined &&
			this.config[this.login2][this.appComponent.lngProd]['HOME_CARDS'] !=
				undefined
		) {
			this.HOME_CARDS =
				this.config[this.login2][this.appComponent.lngProd][
					'HOME_CARDS'
				];
		} else {
			if (
				!this.appComponent.session.logueado &&
				this.appComponent.mobile
			) {
				this.HOME_CARDS =
					this.config.HOME_CARDS_NOLOGUEADO[
						this.appComponent.country
					][this.appComponent.lngProd];
			} else {
				if (
					!this.appComponent.session.logueado &&
					!this.appComponent.mobile
				) {
					this.HOME_CARDS =
						this.config.HOME_CARDS_NOLOGUEADO[
							this.appComponent.country
						][this.appComponent.lngProd];
				} else {
					if (
						this.appComponent.session.logueado &&
						!this.appComponent.mobile
					) {
						this.HOME_CARDS =
							this.config.HOME_CARDS_LOGUEADO[
								this.appComponent.country
							][this.appComponent.lngProd];
					} else {
						if (
							this.appComponent.session.logueado &&
							this.appComponent.mobile
						) {
							this.HOME_CARDS =
								this.config.HOME_CARDS_LOGUEADO[
									this.appComponent.country
								][this.appComponent.lngProd];
						}
					}
				}
			}
		}
	},
});
</script>

<template>
	<section>
		<!-- Main section for displaying home cards -->
		<div class="Framework">
			<!-- Title for the recommended section -->
			<span class="my-title">{{ $t('RECOMENDADOS') }}</span>
		</div>
		<!-- Grid layout for home cards -->
		<div
			class="grid md:grid-flow-col auto-cols-fr justify-center mt-6 grid-cols-2 mb-10"
		>
			<!-- Loop through HOME_CARDS to create card elements -->
			<div
				class="max-w-md px-10 mr-auto ml-auto grow cursor-pointer"
				:class="value.MENU_CLASS"
				v-for="value in HOME_CARDS"
			>
				<RouterLink :to="value.MENU_URL" :id="value.MENU_ID">
					<!-- Card container with dynamic background color -->
					<div
						class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-xl"
						:style="{ background: value.MENU_COLOR }"
					>
						<!-- Lazy-loaded image for the card -->
						<img
							v-lazy="value.MENU_IMG_URL"
							class="w-full align-middle rounded-t-lg"
						/>
						<blockquote class="relative p-8 mb-4">
							<!-- Card title -->
							<h4 class="text-xl font-bold text-white">
								{{ value.MENU_TITLE }}
							</h4>
							<!-- Card content -->
							<p class="text-md font-light mt-2 text-white">
								{{ value.MENU_CONTENT }}
							</p>
						</blockquote>
					</div>
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<style scoped>
/* Styles for the title in the home section */
.my-title {
	text-align: center; /* Center align the text */
	letter-spacing: 0px; /* No letter spacing */
	color: #ffffff; /* White text color */
	text-shadow: 0px 3px 6px #000000; /* Shadow effect for text */
	opacity: 1; /* Full opacity */
	margin-left: 2.5rem !important; /* Left margin with important flag */
	font-weight: bold; /* Bold font weight */
	font-size: 20px; /* Font size */
}
</style>

<!-- FILE DOCUMENTED -->
