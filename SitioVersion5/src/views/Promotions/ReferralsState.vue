<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import HorizontalMenu from '@/components/HorizontalMenu.vue'; // Importing HorizontalMenu component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import CollapCardIcon from '@/components/CollapCardIcon.vue'; // Importing CollapCardIcon component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import router from '@/router'; // Importing router for navigation

export default defineComponent({
	components: {
		VPagination, // Registering VPagination component
		HorizontalMenu, // Registering HorizontalMenu component
		AppTable, // Registering AppTable component
		CollapCardIcon, // Registering CollapCardIcon component
	},
	data: function () {
		let emitter = this.$emitter(); // Event emitter for communication
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Reference to the app component
		let cantidadGanadaPorReferido: number = 0; // Amount earned per referral
		let cantidadReferidos: any = ''; // Number of referrals
		let prueba: number = 0; // Test variable
		let menu = {
			// Menu configuration
			MENU_ID: '48',
			MENU_TITLE: 'Referidos',
			MENU_SLUG: 'referido',
			MENU_EDITAR: true,
			MENU_ELIMINAR: false,
			MENU_ADICIONAR: true,
			SUBMENUS: [
				// Submenu items
				{
					SUBMENU_ID: '2418',
					SUBMENU_URL: 'agregar_referidos',
					SUBMENU_TITLE: 'Agregar referidos',
				},
				{
					SUBMENU_ID: '2419',
					SUBMENU_URL: 'estado_referidos',
					SUBMENU_TITLE: 'Estado de referidos',
				},
			],
		};
		let routers = {}; // Router configuration
		let modeloDeInfoUser2: any = []; // Model for unawarded user info
		let modeloDeInfoUser1: any = []; // Model for awarded user info
		let loader: boolean = true; // Loader state
		let objet1: number = 0; // Object variable 1
		let objet2: number = 0; // Object variable 2
		let objet3: number = 0; // Object variable 3
		return {
			config,
			appComponent,
			cantidadGanadaPorReferido,
			modeloDeInfoUser2,
			modeloDeInfoUser1,
			cantidadReferidos,
			routers,
			emitter,
			loader,
			objet1,
			objet2,
			objet3,
			menu,
			prueba,
		};
	},
	unmounted() {
		this.emitter.all.delete('loadMoreReferral'); // Clean up event listener on component unmount
	},
	beforeMount() {
		this.validUserReferral(); // Validate user referral before mounting
		this.loading(); // Initialize loading state
		if (this.appComponent.menus_service != undefined) {
			this.appComponent.menus_service.forEach((value) => {
				if (value.MENU_ID == 48) {
					this.routers = value; // Set router configuration based on menu ID
				}
			});
		}
	},
	mounted() {
		this.routers = this.menu; // Set routers to menu configuration
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Event listener for accepting modal
		});
		this.emitter.on('loadMoreReferral', (value) => this.loadMore(value)); // Event listener for loading more referrals
		if (
			this.config != undefined &&
			this.config.referrals != undefined &&
			this.config.referrals.collapCardIcon != undefined
		) {
			this.config.referrals.collapCardIcon.forEach((item) => {
				item.open = false; // Initialize collapse card icons to closed
			});
		}
	},
	methods: {
		loading() {
			if (
				this.config != undefined &&
				this.config.referrals != undefined &&
				this.config.referrals.collapCardIcon != undefined
			) {
				this.loader = false; // Set loader state to false
			}
		},
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'newRoute') {
				router.push('/referido/agregar_referidos'); // Navigate to add referrals page
				this.appComponent.closeModal(); // Close modal
			} else {
				this.appComponent.closeModal(); // Close modal
			}
		},
		validUserReferral() {
			apiService
				.request('validate_referent', {}) // Validate referent user
				.then((response: any) => {
					if (response.code == 0) {
						// No action needed for code 0
					} else if (response.code == 1) {
						this.appComponent.modal = {
							// Show notification modal for code 1
							showModal: 'notification',
							titleModal: this.$t(response.data.AlertMessage),
							messageModal: this.$t('No cumple los requisitos'),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'newRoute',
							buttonX: false,
						};
					} else if (
						response.error_code == 4019 ||
						response.error_code == 4008
					) {
						router.push('/home'); // Redirect to home for specific error codes
					}
				});
		},
		openCard(itemF, position) {
			const limit = 10; // Limit for loading items
			if (
				this.config != undefined &&
				this.config.referrals != undefined &&
				this.config.referrals.collapCardIcon != undefined
			) {
				this.config.referrals.collapCardIcon.forEach((item, index) => {
					item.open = index === position ? !item.open : false; // Toggle card open state
				});
				if (itemF.model == 1) {
					if (this.modeloDeInfoUser1.length == 0) {
						const params = {
							Start: this.appComponent.startAwarded,
							Limit: limit,
						};
						apiService
							.request('get_awarded_referred_user', params) // Fetch awarded referred users
							.then((response: any) => {
								if (response.code == 0) {
									this.modeloDeInfoUser1 =
										response.data.AwardedUsers; // Set awarded users data
									if (response.data.TotalCount > limit) {
										this.appComponent.showLoadMoreButtonReferral =
											true; // Show load more button if applicable
									}
								}
							});
					}
				} else if (itemF.model == 2) {
					if (this.modeloDeInfoUser2.length == 0) {
						const params = {
							Start: this.appComponent.startUnawarded,
							Limit: limit,
						};
						apiService
							.request('get_unawarded_referred_user', params) // Fetch unawarded referred users
							.then((response: any) => {
								if (response.code == 0) {
									this.modeloDeInfoUser2 =
										response.data.UnawardedUsers; // Set unawarded users data
									if (
										response.data.UnawardedUsers.length >
										this.cantidadReferidos
									) {
										this.appComponent.showLoadMoreButtonReferral =
											true; // Show load more button if applicable
									}
								}
							});
					}
				}
			}
		},
		loadMore(p) {
			const limit = 10; // Limit for loading more items
			if (p == 'unawarded') {
				this.appComponent.startUnawarded =
					this.appComponent.startUnawarded + limit; // Update start index for unawarded
				let params = {
					Start: this.appComponent.startUnawarded,
					Limit: limit,
				};
				this.loadUnawarded(params); // Load more unawarded users
			}
			if (p == 'awarded') {
				this.appComponent.startAwarded =
					this.appComponent.startAwarded + limit; // Update start index for awarded
				let params = {
					Start: this.appComponent.startAwarded,
					Limit: limit,
				};
				this.loadAwarded(params); // Load more awarded users
			}
		},
		loadUnawarded(p) {
			if (this.appComponent.startUnawarded != p.Start) {
				apiService
					.request('get_unawarded_referred_user', p) // Fetch unawarded referred users
					.then((response: any) => {
						if (response.code == 0) {
							this.modeloDeInfoUser2 = response.Data; // Set unawarded users data
							if (response.Data.length > this.cantidadReferidos) {
								this.appComponent.showLoadMoreButtonReferral =
									true; // Show load more button if applicable
							}
						}
					});
				this.appComponent.loadMoreUnawarded = false; // Reset load more state
			}
		},
		loadAwarded(p) {
			if (this.appComponent.startAwarded != p.Start) {
				apiService
					.request('get_awarded_referred_user', p) // Fetch awarded referred users
					.then((response: any) => {
						if (response.code == 0) {
							this.modeloDeInfoUser1 = response.Data; // Set awarded users data
							if (response.Data.length > p.Limit) {
								this.appComponent.showLoadMoreButtonReferral =
									true; // Show load more button if applicable
							}
						}
					});
				this.appComponent.loadMoreAwarded = false; // Reset load more state
			}
		},
	},
});
</script>
<template>
	<!-- Header section for layout 3 -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Header section for other layouts -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div class="Framework InfoPage mi-cuenta bg-neutral-content">
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1">
						<span
							class="text-neutral font-bold text-3xl text-neutral"

							>{{ $t('REFERIR A UN AMIGO') }}</span
						>
					</span>
				</div>
				<!-- Horizontal menu and content box -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<HorizontalMenu :object="routers" />
					<!-- Horizontal menu component -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Loader display -->
						<div
							v-if="loader"
							class="h-[400px] p-5 rounded-b-xl bg-gradient-to-b from-base-300 to-neutral-content pb-14 max-h-max text-neutral shadow-md w-[80vw] flex items-center justify-center"
						>
							<svg
								fill="none"
								class="w-28 h-28 animate-spin opacity-75"
								viewBox="0 0 32 32"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
									fill="currentColor"
									fill-rule="evenodd"
								/>
							</svg>
						</div>
						<!-- Content display when loader is false -->
						<div
							v-if="!loader"
							class="pt-12 rounded-b-xl bg-base-200 text-neutral shadow-md pb-72 sm:pb-48 max-h-max w-full sm:w-[80vw] flex flex-col gap-8 sm:gap-10"
						>
							<section
								v-if="
									config != undefined &&
									config.referrals != undefined &&
									config.referrals.collapCardIcon != undefined
								"
								v-for="(item, i) in config.referrals
									.collapCardIcon"
								class="w-[90%] mx-auto"
							>
								<CollapCardIcon
									v-if="
										modeloDeInfoUser1 != [] &&
										loader == false
									"
									@click="openCard(item, i)"
									:open="item.open"
									:icon="item.icon"
									:text="
										item.text != undefined ? item.text : ''
									"
									:model="item.model"
									:data-info-user1="modeloDeInfoUser1"
									:data-info-user2="modeloDeInfoUser2"
								/>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->
