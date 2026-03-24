<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { useModalStore } from './stores/Modal.ts';
import router from '@/router';
import apiService from '../src/services/ApiService.ts';
import { useCookies } from 'vue3-cookies'; // Importing cookies management from vue3-cookies
import axios from 'axios'; // Importing axios for HTTP requests
/**
 * Main component definition using Vue's defineComponent.
 * This component handles modal management and layout selection.
 */
export default defineComponent({
    components: {
        // Asynchronously import layout components
        Layout1: defineAsyncComponent(() => import('./layouts/layout_1.vue')),
        Layout2: defineAsyncComponent(() => import('./layouts/layout_2.vue')),
        Layout3: defineAsyncComponent(() => import('./layouts/layout_3.vue')),
        Layout4: defineAsyncComponent(() => import('./layouts/Layout_4.vue')),
        Layout5: defineAsyncComponent(() => import('./layouts/Layout_5.vue')),
        Layout6: defineAsyncComponent(() => import('./layouts/Layout_6.vue')),
        Layout7: defineAsyncComponent(() => import('./layouts/Layout_7.vue')),
        Layout8: defineAsyncComponent(() => import('./layouts/Layout_8.vue')),
        // Asynchronously import modal components
        Modal: defineAsyncComponent(() => import('./components/modals/Modal.vue')),
        ModalNotification: defineAsyncComponent(() => import('./components/modals/ModalNotification.vue')),
        ModalUpdatePassword: defineAsyncComponent(() => import('./components/modals/ModalUpdatePassword.vue')),
        ModalLogin: defineAsyncComponent(() => import('./components/modals/ModalLogin.vue')),
        ModalLogin2: defineAsyncComponent(() => import('./components/modals/ModalLogin2.vue')),
        ModalLogin4: defineAsyncComponent(() => import('./components/modals/ModalLogin4.vue')),
        ModalLogin6: defineAsyncComponent(() => import('./components/modals/ModalLogin6.vue')),
        ModalLogin7: defineAsyncComponent(() => import('./components/modals/ModalLogin7.vue')),
        ModalLoginV3: defineAsyncComponent(() => import('./components/modals/ModalLoginV3.vue')),
        ModalRegister: defineAsyncComponent(() => import('./components/modals/ModalRegister.vue')),
        ModalJackpot: defineAsyncComponent(() => import('./components/modals/JackpotInformationModal.vue')),
    },
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        const modals = useModalStore(); // Modal store for managing modal state
        let contingency: boolean = false; // Flag for contingency state
        let layout: any = ref(''); // Reactive reference for layout selection
        let contingencyData: any = appComponent.config.contingency; // Contingency configuration data
        const { cookies } = useCookies();
        let config = this.$config(); // Retrieve configuration
        let showCookies = false;
        // Watch for changes in the route
		this.$watch(
			() => this.$route,
			(toParams) => {
                // Parse query string parameters from the URL
				let queryString = window.location.search;
                let urlParams = new URLSearchParams(queryString);

                // Handle 'tt' parameter for user token
				if (urlParams.has('tt')) {
			        appComponent.tokenUser = urlParams.get('tt');
					window.localStorage.setItem(
						'auth_token',
						appComponent.tokenUser
					);
					this.$router.push({
						path: toParams.path,
						params: { tt: null },
					});
				}
				// Handle 'cidd' parameter
				if (urlParams.has('cidd')) {
					(window as any).cidd = urlParams.get('cidd');
				}
				// Handle 'btag' parameter for affiliate tracking
				if (urlParams.has('btag')) {
					let btag: any = urlParams.get('btag');
					if (cookies.get('btag') != btag) {
						const apiClient = axios.create({
							baseURL: config.urlAffiliatesApi,
							headers: {
								'Content-Type':
									'application/x-www-form-urlencoded; charset=UTF-8',
								Bt: btag,
							},
						});
                        apiClient.get('/stst').then(() => {
                            cookies.set('btag', btag, {
                                expires: '7d',
                                sameSite: 'None'
                            });
                        });
					}
					cookies.set('btag', btag, {
						expires: '7d',
						sameSite: 'None',
					});
					this.$router.push({
						path: toParams.path,
						params: { btag: null },
					});
				}
				// Handle 'trackerId' parameter
				if (urlParams.has('trackerId')) {
					let trackerId: any = urlParams.get('trackerId');
					if (cookies.get('trackerId') != trackerId) {
						cookies.set('trackerId', trackerId);
					}
                    this.$router.push({
                        path: toParams.path,
                        params: { trackerId: null },
                    });
				}
				// Handle 'rfdo' parameter for referral tracking
				if (urlParams.has('rfdo')) {
					let rfdo: any = urlParams.get('rfdo');
                    if (cookies.get('rfdo') != rfdo) {
                        cookies.set('rfdo', rfdo);
                        let param = {
                            ReferentLink: rfdo,
                        };
                        apiService
                            .request('mark_referent_invitation', param)
                            .then((response: any) => {
                                if (response.code == 0) {
                                    console.log('user referral');
                                }
                            });
                    }
					this.$router.push({
						path: toParams.path,
						params: { rfdo: null },
					});
				}
            }
		);
        
        // Set contingency state based on configuration
        appComponent.contingency = contingencyData?.on ?? false;
        if (
            contingencyData.startDate &&
            contingencyData.endDate &&
            contingencyData.startDate < contingencyData.endDate
        ) {
            const now = new Date(); // Current date
            const startDate = new Date(parseInt(contingencyData.startDate, 10)); // Start date of contingency
            const endDate = new Date(parseInt(contingencyData.endDate, 10)); // End date of contingency

            // Check if current date is within the contingency period
            if (now <= startDate || now <= endDate) {
                const contingencyInterval = setInterval(() => {
                    const now = new Date(); // Current date for interval check
                    if (now >= startDate && now <= endDate) {
                        appComponent.contingency = true; // Set contingency to true
                        apiService.setContingency(true); // Notify API service
                    } else if (now > endDate) {
                        appComponent.contingency = false; // Set contingency to false
                        apiService.setContingency(false); // Notify API service
                        clearInterval(contingencyInterval); // Clear interval when out of range
                    }
                }, 1000); // Check every second
            }
        }

        // Redirect to home if auth token exists
        if (
            window.localStorage.getItem('auth_token') != null ||
            (window.localStorage.getItem('auth_token') != undefined && window.localStorage.getItem('auth_token') != '')
        )
            router.push('/home');

        // Determine layout based on configuration
        layout =
            appComponent.config.layout_ != undefined
                ? `Layout${appComponent.config.layout_}`
                : appComponent.config.layout != undefined
                  ? `Layout${appComponent.config.layout}`
                  : 'Layout1'; // Default layout

        return {
            modals,
            layout,
            appComponent,
            contingency,
            cookies,
            showCookies
        };
    },
    setup() {
		// Destructure the cookies object from the useCookies() composable.
		const { cookies } = useCookies();

		// Return the cookies object to make it available in the component's template and other functions.
		return {
			cookies,
		};
	},
    mounted() {
        // Check if cookies should be shown based on configuration and cookie value
		if (
			this.appComponent.config.showCookies != undefined &&
			this.appComponent.config.showCookies[this.appComponent.country] != undefined &&
			this.cookies.get('cookies-user') !== 'true'
		) {
			this.showCookies = true; // Show cookies if conditions are met
		} else {
			console.log(this.cookies.get('cookies-user')); // Log cookie value
		}
    },
    methods: {
        /**
		 * Sets a cookie with the specified name and value,
		 * and an expiration date of 100 years from now.
		 *
		 * @param {string} name - The name of the cookie.
		 * @param {string} value - The value of the cookie.
		 */
		setCookie(name, value) {
			const date = new Date();
			date.setFullYear(date.getFullYear() + 100);
			document.cookie =
				name + '=' + value + ';path=/;expires=' + date.toUTCString();
		},
		/**
		 * Accepts cookies by setting a specific cookie
		 * and hiding the cookie consent banner.
		 */
		acepptCookies() {
			this.setCookie('cookies-user', 'true');
			this.showCookies = false;
			console.log(this.cookies.get('cookies-user'));
		},
		/**
		 * Declines cookies and hides the cookie consent banner.
		 */
		declineCookies() {
			this.showCookies = false;
        }
    }
});
</script>

<template>
    <!-- Teleport modals to a specific DOM node -->
    <Teleport to="#modals">
        <!-- Transition group for modals with animation -->
        <TransitionGroup
            name="modals"
            tag="div"
        >
            <template
                v-for="component in modals.group"
                :key="component"
            >
                <!-- Render modal component if there are modals to show -->
                <component
                    v-if="modals.group.length > 0"
                    :is="component.showModal"
                    :title="component.titleModal"
                    :message="component.messageModal"
                    :button="component.buttonModal"
                    :button2="component.buttonModal2"
                    :link2="component.link2"
                    @close="() => modals.closeModal(component.showModal)"
                    class="z-[99999999999]"
                >
                </component>
            </template>
        </TransitionGroup>
    </Teleport>
    <!-- Render the selected layout component -->
    <component :is="layout" />
    <!-- Cookies consent modal component -->
	<div
		v-if="showCookies == true"
		class="cookies-modal bg-gradient-to-b from-gray-800 to-black rounded-t-2xl grid grid-cols-1 md:grid-cols-3 gap-2 p-1 h-auto fixed w-full left-0 bottom-0 mb-16 lg:mb-0 z-[9999999999]"
	>
		<div class="text-cookies flex items-center justify-center">
			<p class="text-xl m-0">{{ $t('Cookies') }}</p>
		</div>
		<div class="description-cookies flex items-center justify-center">
			<p class="m-0 px-3 text-center">
				{{
					$t(
						'Al aceptar los cookies, permitirá mejorar su experiencia en nuestro sitio.'
					)
				}}
			</p>
		</div>
		<div class="button-cookies flex items-center justify-center">
			<button class="text-gray-400" @click="declineCookies">
				{{ $t('Rechazar cookies') }}
			</button>
			<button
				class="text-white font-bold ml-8 bg-primary-content p-2 rounded-2xl"
				@click="acepptCookies"
			>
				{{ $t('Aceptar cookies') }}
			</button>
		</div>
	</div>
</template>

<style scoped>
/* Transition styles for modals */
.modals-move,
.modals-enter-active,
.modals-leave-active {
    transition: all 0.5s ease; /* Smooth transition for modal appearance and disappearance */
}
.modals-enter-from,
.modals-leave-to {
    opacity: 0; /* Fade effect for entering and leaving modals */
}
</style>

<!-- FILE DOCUMENTED -->
