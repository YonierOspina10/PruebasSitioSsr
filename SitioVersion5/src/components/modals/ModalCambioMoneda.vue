<template>
	<!-- Main section for the modal, covering the entire screen with a semi-transparent background -->
	<section
		class="fixed top-0 left-0 w-screen h-screen bg-neutral-content/75 z-[999] flex justify-center items-center"
	>
		<!-- Modal container with styling for layout and appearance -->
		<div
			class="modal_open relative max-w-[80vw] flex flex-col justify-center items-center py-12 px-10 sm:px-20 gap-4 bg-base-content rounded-2xl border border-accent text-neutral"
		>
			<!-- Close button to hide the modal -->
			<button
				@click="appComponent.modalCurrencyExchange = false"
				class="absolute -top-2 -right-2 w-10 h-10 flex justify-center items-center cursor-pointer hover:scale-105 bg-gradient-to-b from-[#CF2032] to-[#730510] rounded-full border border-[#BE2323]"
			>
				<font-awesome-icon
					icon="fa-solid fa-xmark"
					size="2x"
					class="text-info-text"
				/>
			</button>
			<!-- Title of the modal -->
			<h3 class="font-bold text-2xl sm:text-3xl uppercase text-center">
				{{ $t('CAMBIA DE MONEDA') }}
			</h3>
			<!-- Current currency display section -->
			<div class="w-full flex flex-col justify-center items-center gap-2">
				<span
					class="w-full text-center font-medium text-lg sm:text-xl"
					>{{ $t('Moneda Actual') }}</span
				>
				<div
					class="w-full flex justify-center items-center bg-neutral-content p-2 h-14 rounded-lg border border-accent"
				>
					<img
						src="https://images.virtualsoft.tech/m/msjT1696857909.png"
						alt="IconCurrencyExchange"
						class="w-10 h-6 object-contain"
					/>
					<span
						class="font-bold w-[80%] text-center text-xl text-neutral"
						>{{ appComponent.session.moneda }}</span
					>
				</div>
			</div>
			<!-- Warning message about currency change -->
			<p class="w-full max-w-xs">
				<strong>{{ $t('ADVERTENCIA') }}:</strong>
				{{
					$t(
						'Al realizar el cambio de moneda se te otorgará un nuevo ID'
					)
				}}
			</p>
			<!-- Section for selecting a new currency -->
			<div
				v-if="currencySelected != ''"
				class="w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-5 mb-5"
			>
				<span class="text-lg sm:text-xl mt-3">{{
					$t('Cambiar a:')
				}}</span>
				<div
					class="relative flex flex-col justify-center items-center bg-base-300 border border-accent font-bold text-center text-xl rounded-md p-1 text-neutral cursor-pointer"
				>
					<!-- Button to toggle currency list visibility -->
					<button
						@click="onCurrencyList = !onCurrencyList"
						class="w-full flex justify-between items-center p-2"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1696857909.png"
							alt="IconCurrencyExchange"
							class="w-10 h-6 object-contain"
						/>
						<span class="px-5 text-xl"
							>{{ currencySelected }}
						</span>
						<font-awesome-icon
							icon="fa-solid fa-chevron-down"
							size="1x"
							class="text-info-text ml-2"
						/>
					</button>
					<!-- Dropdown list of currencies -->
					<div
						v-if="onCurrencyList && currencyList.length > 0"
						class="flex flex-col items-center justify-center text-center w-full p-2 bg-base-300 gap-1"
					>
						<!-- Button for each currency in the list -->
						<button
							v-for="(currency, index) in currencyList"
							:key="index"
							class="w-full h-10 bg-neutral text-neutral-content hover:scale-105 hover:bg-neutral/50 rounded-lg hover"
							@click="onSelectCurrency(currency)"
						>
							{{ currency.Currency }}
						</button>
					</div>
				</div>
			</div>
			<!-- Message when no more currencies are available -->
			<span v-else class="text-lg font-semibold">{{
				$t('No hay mas monedas')
			}}</span>
			<!-- Button to save the selected currency -->
			<button
				v-if="currencySelected != ''"
				class="px-4 sm:px-8 py-2 sm:py-4 rounded-lg flex justify-center items-center text-lg sm:text-xl text-info-text font-bold bg-primary hover:bg-primary/80"
				@click="onSubmitCurrency()"
			>
				{{ $t('Guardar') }}
			</button>
			<!-- Button to go back if no currency is selected -->
			<button
				v-else
				class="px-4 sm:px-8 py-2 sm:py-4 rounded-lg flex justify-center items-center text-lg sm:text-xl text-info-text font-bold bg-gradient-to-b from-success2 to-success2/50 hover:scale-105 hover:bg-success"
				@click="appComponent.modalCurrencyExchange = false"
			>
				{{ $t('Volver') }}
			</button>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import { Button } from 'flowbite-vue'; // Importing Button component from Flowbite
import apiService from '@/services/ApiService'; // Importing API service for requests

export default defineComponent({
	components: { Button, ExitIcon }, // Registering components used in the template
	setup() {
		return {}; // Setup function returning an empty object
	},
	data() {
		// Defining reactive data properties
		let appComponent: any = this.$appComponent; // Reference to the app component
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
		let onCurrencyList: boolean = false; // State to toggle currency list visibility
		let currencyList: any = []; // Array to hold available currencies
		let currencySelected: string = ''; // Currently selected currency
		return {
			appComponent,
			onCurrencyList,
			currencyList,
			currencySelected,
			refreshBalance,
		};
	},
	mounted() {
		this.getCurrencies(); // Fetch currencies when the component is mounted
	},
	methods: {
		// Method to fetch available currencies
		async getCurrencies() {
			await apiService
				.request('user_currency', {
					token: this.appComponent.tokenUser, // Sending user token for authentication
				})
				.then((response: any) => {
					if (response.code === 0) {
						// Check if the response is successful
						if (response.data.length > 0) {
							this.currencySelected =
								response.data.shift().Currency; // Set the first currency as selected
							this.currencyList = response.data; // Store the remaining currencies
						}
					}
				});
		},
		// Method to select a currency from the list
		onSelectCurrency(item: any) {
			this.currencySelected = item.Currency; // Update selected currency
			this.onCurrencyList = false; // Hide currency list
		},
		// Method to submit the selected currency
		async onSubmitCurrency() {
			const params = {
				auth_token: this.appComponent.tokenUser, // Parameters for the API request
			};
			await apiService
				.request('account_change', params) // Request to change the currency
				.then((response: any) => {
					if (response != undefined && response.code == 0) {
						// Check for successful response
						// Update app component with new user data
						this.appComponent.tokenUser = response.data.auth_token;
						this.appComponent.user_id = response.data.user_id;
						this.appComponent.channel_id = response.data.channel_id;
						this.appComponent.id_platform =
							response.data.id_platform;
						apiService.setAuthToken(response.data.auth_token); // Set new auth token
						window.localStorage.setItem(
							'auth_token',
							response.data.auth_token // Store auth token in local storage
						);
						this.refreshBalance(); // Refresh balance after currency change
						try {
							(window as any).fLoadSuccess(
								this.appComponent.user_id,
								this.appComponent.frm // Call success function with user ID and form
							);
						} catch (e) {}
						this.appComponent.modalCurrencyExchange = false; // Close modal
						console.log('restore_login_site end success'); // Log success message
						location.reload(); // Reload the page
					} else {
						// Handle error response
						this.appComponent.tokenSB = '';
						this.appComponent.loadView = true;
						window.localStorage.removeItem('auth_token'); // Remove token from local storage
						this.appComponent.notTokenUser = true; // Set flag for no token
						this.appComponent.loadBalance = true; // Set flag to load balance
						this.appComponent.firstReqBalance = true; // Set flag for first balance request
						console.log('restore_login_site end error'); // Log error message
					}
					// Update logo configuration if available
					if (
						(window as any).cconfig.header != undefined &&
						(window as any).cconfig.header.logo != undefined &&
						(window as any).cconfig.header.logo.src != '' &&
						(window as any).cconfig.header.logo.src != undefined
					) {
						try {
							this.appComponent.config.logo = (
								window as any
							).cconfig.header.logo.src;
							this.appComponent.config.header.logo.src = (
								window as any
							).cconfig.header.logo.src;
							this.appComponent.config.header.logoUrl = (
								window as any
							).cconfig.header.logo.src;
							this.appComponent.config.menuMobile.logo.url = (
								window as any
							).cconfig.menuMobile.logo.url;
						} catch (e) {}
					}
				});
		},
	},
});
</script>
<style scoped>
/* Animation for modal opening */
.modal_open {
	animation: square-in-hesitate 0.2s ease-in-out;
}

/* Keyframes for the square-in-hesitate animation */
@keyframes square-in-hesitate {
	0% {
		clip-path: inset(100% 100% 100% 100%); /* Start fully clipped */
	}
	40% {
		clip-path: inset(33% 33% 33% 33%); /* Partially reveal */
	}
	100% {
		clip-path: inset(0 0 0 0); /* Fully revealed */
	}
}

/* Transition style for the modal */
[transition-style='in:square:hesitate'] {
	animation: 0.2s cubic-bezier(0.25, 1, 0.3, 1) square-in-hesitate both;
}
</style>

<!-- FILE DOCUMENTED -->
