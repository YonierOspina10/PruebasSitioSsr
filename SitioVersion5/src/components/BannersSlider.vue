<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import AppCarousel from '../components/Carousel.vue'; // Importing the AppCarousel component
import { useGetInfoFirestore } from '../composables/useInfoFirestore'; // Import function to get banners data from firestore

export default defineComponent({
	components: {
		AppCarousel, // Registering the AppCarousel component
	},
	data() {
		let config = this.$config(); // Retrieving the application configuration
		let appComponent: any = this.$appComponent; // Storing the application component data
		let banners: any = []; // Array to hold banner data
		let device: string = ''; // Variable to determine the device type
		let height: any = ''; // Variable to hold height class for banners
		let login: string = ''; // Variable to determine login status
		let login2: string = ''; // Variable for an alternate login status
		return {
			config,
			appComponent,
			height,
			banners,
			device,
			login,
			login2,
		};
	},
	async mounted() {
		this.device = 'bannersDesktop'; // Default device type
		if (this.appComponent.mobile == '') {
			this.device = 'bannersDesktop'; // Set to desktop if mobile is not defined
		} else {
			if (this.appComponent.mobile == '1') {
				this.device = 'bannersMobile'; // Set to mobile if mobile is defined as '1'
			}
		}
		// Determine login status based on the current view
		if (
			this.appComponent.viewActual == '/banner-right' ||
			this.appComponent.viewActual == '/banner-left' ||
			this.appComponent.viewActual == '/banner-topcenter'
		) {
			this.login = 'login'; // Set login status to 'login'
		} else {
			this.login = 'notLogin'; // Set login status to 'notLogin'
		}
		// Determine alternate login status based on the current view
		if (
			this.appComponent.viewActual == '/banner-right' ||
			this.appComponent.viewActual == '/banner-left' ||
			this.appComponent.viewActual == '/banner-topcenter'
		) {
			this.login2 = 'login'; // Set login2 status to 'login'
		} else {
			this.login2 = 'not_login'; // Set login2 status to 'not_login'
		}

		//Get banners data from Firebase
		const bannerKey = this.resolveBannerKey()
		if (bannerKey) {
		//(the login depends on viewActual, not on the actual session)
		const appForFirestore = {
		...this.appComponent,
			session: { ...this.appComponent.session, logueado: this.login2 === 'login' },
		}
		const firestoreBanners = await useGetInfoFirestore(this.config, appForFirestore, bannerKey,{ useLogin: true, useScope: true })
		if (firestoreBanners?.length) {
			this.banners = firestoreBanners
			this.applyHeightFromKey(bannerKey)
			return 
     		}
		}

		// Check if configuration and banners are defined for login2
		if (
			this.config != undefined &&
			this.config[this.login2] != undefined &&
			this.config[this.login2][this.appComponent.lngProd] != undefined &&
			this.config[this.login2][this.appComponent.lngProd]['banners'] !=
				undefined
		) {
			// Load banners based on the current view and configuration
			if (
				this.appComponent.viewActual == '/banner-right' &&
				this.config[this.login2][this.appComponent.lngProd]['banners'][
					'banner_right'
				] != undefined
			) {
				this.banners = JSON.parse(
					JSON.stringify(
						this.config[this.login2][this.appComponent.lngProd][
							'banners'
						]['banner_right']
					)
				); // Parse and store right banner data
				this.height = 'h-full md:h-full'; // Set height for right banner
			} else {
				if (
					this.appComponent.viewActual == '/banner-left' &&
					this.config[this.login2][this.appComponent.lngProd][
						'banners'
					]['banner_left'] != undefined
				) {
					this.banners = JSON.parse(
						JSON.stringify(
							this.config[this.login2][this.appComponent.lngProd][
								'banners'
							]['banner_left']
						)
					); // Parse and store left banner data
					this.height = 'h-full'; // Set height for left banner
				} else {
					if (
						this.appComponent.viewActual == '/banner-topcenter' &&
						this.config[this.login2][this.appComponent.lngProd][
							'banners'
						]['banner_center'] != undefined
					) {
						this.banners = JSON.parse(
							JSON.stringify(
								this.config[this.login2][
									this.appComponent.lngProd
								]['banners']['banner_center']
							)
						); // Parse and store center banner data
						this.height = 'h-full'; // Set height for center banner
					} else {
						if (
							this.appComponent.viewActual ==
								'/banner-topcenternl' &&
							this.config[this.login2][this.appComponent.lngProd][
								'banners'
							]['banner_center'] != undefined
						) {
							this.banners = JSON.parse(
								JSON.stringify(
									this.config[this.login2][
										this.appComponent.lngProd
									]['banners']['banner_center']
								)
							); // Parse and store center banner data for 'topcenternl'
							this.height = 'h-full md:h-h-full'; // Set height for center banner
						}
					}
				}
			}
		} else {
			// Check if configuration and banners are defined for device
			if (
				this.config != undefined &&
				this.config[this.device] != undefined &&
				this.config[this.device][this.appComponent.country] !=
					undefined &&
				this.config[this.device][this.appComponent.country][
					this.appComponent.lngProd
				] != undefined &&
				this.config[this.device][this.appComponent.country][
					this.appComponent.lngProd
				][this.login] != undefined
			) {
				// Load banners based on the current view and configuration for device
				if (
					(this.appComponent.viewActual == '/banner-right' ||
						this.appComponent.viewActual == '/banner-rightnl') &&
					this.config[this.device][this.appComponent.country][
						this.appComponent.lngProd
					][this.login]['banner-right'] != undefined
				) {
					this.banners = JSON.parse(
						JSON.stringify(
							this.config[this.device][this.appComponent.country][
								this.appComponent.lngProd
							][this.login]['banner-right']
						)
					); // Parse and store right banner data for device
					this.height = 'h-full md:h-full'; // Set height for right banner
				} else {
					if (
						(this.appComponent.viewActual == '/banner-left' ||
							this.appComponent.viewActual == '/banner-leftnl') &&
						this.config[this.device][this.appComponent.country][
							this.appComponent.lngProd
						][this.login]['banner-left'] != undefined
					) {
						this.banners = JSON.parse(
							JSON.stringify(
								this.config[this.device][
									this.appComponent.country
								][this.appComponent.lngProd][this.login][
									'banner-left'
								]
							)
						); // Parse and store left banner data for device
						this.height = 'h-full'; // Set height for left banner
					} else {
						if (
							this.appComponent.viewActual ==
								'/banner-topcenter' &&
							this.config[this.device][this.appComponent.country][
								this.appComponent.lngProd
							][this.login]['banner-center'] != undefined
						) {
							this.banners = JSON.parse(
								JSON.stringify(
									this.config[this.device][
										this.appComponent.country
									][this.appComponent.lngProd][this.login][
										'banner-center'
									]
								)
							); // Parse and store center banner data for device
							this.height = 'h-full'; // Set height for center banner
						} else {
							if (
								this.appComponent.viewActual ==
									'/banner-topcenternl' &&
								this.config[this.device][
									this.appComponent.country
								][this.appComponent.lngProd][this.login][
									'banner-center'
								] != undefined
							) {
								this.banners = JSON.parse(
									JSON.stringify(
										this.config[this.device][
											this.appComponent.country
										][this.appComponent.lngProd][
											this.login
										]['banner-center']
									)
								); // Parse and store center banner data for 'topcenternl'
								this.height = 'h-full md:h-h-full'; // Set height for center banner
							}
						}
					}
				}
			}
		}
	},
methods: {
    resolveBannerKey() {
      const viewActual = this.appComponent?.viewActual || ''
	  console.log("viewActual", viewActual)
      if (viewActual === '/banner-right' || viewActual === '/banner-rightnl') return 'banner_right'
      if (viewActual === '/banner-left' || viewActual === '/banner-leftnl') return 'banner_left'
      if (viewActual === '/banner-topcenter' || viewActual === '/banner-topcenternl') return 'banner_center'
      return null
    },

    applyHeightFromKey(key: string) {
      if (key === 'banner_right') this.height = 'h-full md:h-full'
      else if (key === 'banner_left') this.height = 'h-full'
      else if (key === 'banner_center') this.height = 'h-full'
    },
},

});

</script>

<template>
	<AppCarousel v-if="banners.length > 0" :images="banners" :height="height" />
	<!-- Render AppCarousel if banners are available -->
</template>

<!-- FILE DOCUMENTED -->
