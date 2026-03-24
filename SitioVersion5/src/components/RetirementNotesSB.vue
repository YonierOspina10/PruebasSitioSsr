<template>
	<div>
		<!-- Main container for retirement notes section -->
		<section
			v-if="
				appComponent.config.sportBookVersion.retirementNotes ==
					undefined ||
				appComponent.config.sportBookVersion.retirementNotes
			"
			class="retirement-notes-container"
		>
			<article class="retirement-notes-content">
				<!-- Title section that toggles the visibility of notes -->
				<div @click="open()" class="retirement-notes-title">
					<span>{{ $t('NOTA DE RETIRO') }}</span>
					<!-- Icon indicating whether notes are open or closed -->
					<svg
						v-if="!onOpen"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
						/>
					</svg>
					<svg
						v-else
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path fill="currentColor" d="M19 12.998H5v-2h14z" />
					</svg>
				</div>
				<!-- Table of retirement notes, shown when onOpen is true -->
				<div
					v-if="onOpen && !onModal && !onModalSuccess && !onModal"
					class="retirement-notes-table"
				>
					<!-- Placeholder for loading state -->
					<AnimatedPlaceholder
						v-if="loading"
						v-for="index in 5"
						:key="index"
						class="skeleton-loading"
					/>
					<!-- Message displayed when there are no notes to annul -->
					<span
						class="emptyRetirement"
						v-if="!loading && withdrawalsLength"
						>{{ $t('No hay notas de retiro para anular') }}</span
					>
					<!-- Loop through the first 9 withdrawal notes -->
					<div
						v-else
						v-for="note in withdrawals.splice(0, 9)"
						class="retirement-notes"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1696947410.png"
							alt="retirementIcon"
							class="w-10 aspect-square object-contain"
						/>
						<div>
							<span class="nota">{{
								$t('No. nota de retiro')
							}}</span>
							<span class="numero">{{ note?.cuenta }}</span>
						</div>
						<span class="valor">{{ note?.amount }}</span>
						<!-- Button to annul a withdrawal note -->
						<button
							@click="withdrawCancel(note)"
							class="button-anular"
						>
							{{ $t('Anular') }}
						</button>
					</div>
				</div>
				<!-- Modal for confirmation of withdrawal cancellation -->
				<div v-if="onModal" class="modal">
					<h3 class="subtitle" v-t>{{ title }}</h3>
					<p class="message" v-t>{{ message }}</p>
					<div class="buttons">
						<button
							@click="
								getWithdrawals('');
								onModal = false;
							"
							class="cancel"
							v-t
						>
							{{ $t('Cancel') }}
						</button>
						<button @click="acceptModal()" class="accept" v-t>
							{{ $t('Aceptar') }}
						</button>
					</div>
				</div>
				<!-- Modal for error messages -->
				<div v-if="onModalError" class="modal">
					<h3 class="subtitle" v-t>{{ title }}</h3>
					<p class="message" v-t>{{ message }}</p>
					<div class="buttons">
						<button
							@click="
								onModalError = false;
								getWithdrawals('');
							"
							class="accept"
							v-t
						>
							{{ $t('Aceptar') }}
						</button>
					</div>
				</div>
				<!-- Modal for success messages -->
				<div v-if="onModalSuccess" class="modal">
					<h3 class="subtitle" v-t>{{ title }}</h3>
					<p class="message" v-t>{{ message }}</p>
					<div class="buttons">
						<button
							@click="
								onModalSuccess = false;
								getWithdrawals('');
								refreshBalance();
							"
							class="accept"
							v-t
						>
							{{ $t('Aceptar') }}
						</button>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import AppTable from '@/components/Table.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import ButtonHeader from '@/components/ButtonHeader.vue';
export default defineComponent({
	components: { ButtonHeader, AnimatedPlaceholder, AppTable },
	setup() {
		return {};
	},
	data() {
		// Configuration and state variables for the component
		let config: any = this.$config();
		let appComponent: any = this.$appComponent;
		let refreshBalance = this.$refreshBalance;
		let emitter = this.$emitter();
		let onOpen: boolean = false; // State to track if notes are open
		let loadingTable: boolean = false; // State to track loading of table
		let withdrawals: any = ref([]); // Reactive array for withdrawals
		let itemSelect: any = {}; // Selected withdrawal item
		let loading: boolean = false; // Loading state for data fetching
		let withdrawalsLength: boolean = false; // State to check if there are withdrawals
		let onModal: boolean = false; // State for modal visibility
		let onModalError: boolean = false; // State for error modal visibility
		let onModalSuccess: boolean = false; // State for success modal visibility
		let title: string = ''; // Title for modals
		let message: string = ''; // Message for modals
		return {
			config,
			appComponent,
			refreshBalance,
			emitter,
			onOpen,
			loadingTable,
			withdrawals,
			withdrawalsLength,
			itemSelect,
			loading,
			onModal,
			onModalError,
			onModalSuccess,
			title,
			message,
		};
	},
	methods: {
		// Toggles the visibility of the notes section
		open() {
			this.onOpen = !this.onOpen;
			if (this.onOpen && this.withdrawals.length == 0) {
				this.getWithdrawals('');
			}
		},
		// Handles the acceptance of withdrawal cancellation
		acceptModal() {
			apiService
				.request('withdraw_cancel', {
					id: this.itemSelect.id,
				})
				.then((response: any) => {
					if (response.code == 0) {
						this.title = this.$t('OK!');
						this.message = this.$t(
							'La nota de retiro ha sido anulada satisfactoriamente. Este valor se aumentara en saldo disponible para Apostar.'
						);
						this.onModal = false;
						this.onModalSuccess = true;
					} else {
						let error_mensaje: any = '';
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString()
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.title = this.$t('Error!');
						this.message = error_mensaje;
						this.onModalError = true;
					}
				});
		},
		// Prepares the modal for cancelling a specific withdrawal
		withdrawCancel(item: any) {
			this.title = this.$t('Anular Nota de Retiro');
			this.message =
				this.$t(
					'¿ Esta seguro que desea eliminar la nota de retiro #'
				) +
				item.id +
				'?';
			this.itemSelect = item;
			this.onModal = true;
		},
		// Fetches withdrawal requests based on the provided state
		getWithdrawals(state) {
			this.loading = true;
			apiService
				.request('get_withdrawals', {
					State: state,
					count: 10,
					start: 0,
				})
				.then((response: any) => {
					if (response.code == 0) {
						let data = response.data.withdrawal_requests.request;
						for (let i = 0; i < data.length; i++) {
							data[i].cuenta = data[i].id;
							data[i].fecha_crea = data[i].date;
							data[i].valor = data[i].amount;
							data[i].impuesto1 = data[i].tax1;
							data[i].impuesto2 = data[i].tax2;
							data[i].valorfinal =
								data[i].amount - data[i].tax1 - data[i].tax2;
							data[i].tipo = this.$t(data[i].payment_system_name);
							data[i].moneda = this.appComponent.session.moneda;
							data[i].detalle = data[i].detail;
							data[i].estado = '';
							if (data[i].status === '') {
								data[i].estado = this.$t('');
							} else {
								if (data[i].status == 0) {
									data[i].estado = this.$t('Pendientes');
								} else {
									if (data[i].status == 3) {
										data[i].estado = this.$t('Pagadas');
										data[i].button_show = true;
									} else {
										if (data[i].status == -1) {
											data[i].estado =
												this.$t('Anuladas');
											data[i].button_show = true;
										} else {
											if (data[i].status == 4) {
												data[i].estado =
													this.$t('Rechazadas');
												data[i].button_show = true;
											} else {
												if (data[i].status == 2) {
													data[i].estado =
														this.$t('Pendientes');
												}
											}
										}
									}
								}
							}
						}
						this.withdrawals = JSON.parse(JSON.stringify(data));
						this.withdrawals = this.withdrawals.filter(
							(item: any) => {
								return item.status == 0;
							}
						);
						this.withdrawalsLength = this.withdrawals.length == 0;
						this.loading = false;
					}
				});
		},
	},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->
