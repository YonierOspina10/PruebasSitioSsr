<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for backend interactions

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component instance
		let refreshBalance = this.$refreshBalance; // Method to refresh balance
		let onSaldo = false; // State variable to track balance visibility
		return {
			config,
			appComponent,
			refreshBalance,
			onSaldo,
		};
	},
	methods: {
		/**
		 * Toggles the visibility of the user balance and refreshes it if not already displayed.
		 */
		onUserBalance() {
			const params = {
				source: 'user_balances', // Source of the balance data
				subscribe: true, // Subscription flag for real-time updates
				what: { profile: [] }, // Profile data to be fetched
			};
			if (!this.onSaldo) {
				this.appComponent.refreshBalance2(); // Refresh balance if not currently displayed
			}
			this.onSaldo = !this.onSaldo; // Toggle the onSaldo state
		},
	},
});
</script>

<template>
	<!-- Dropdown component for displaying user balance -->
	<details
		title="Saldo"
		id="saldo"
		class="dropdown dropdown-end rounded-2xl border-solid border-2 border-primary-content btn btn-neutral btn-sm md:hidden text-neutral-content"
		v-if="
			appComponent.session.wallet != '1' &&
			(config.header_ != undefined &&
			config.header_.balance_style != undefined
				? config.header_.balance_style == 2
				: config.header.styleBalance[appComponent.country] == 2)
		"
		style="background: linear-gradient(179deg, white, #b5b5b5)"
	>
		<!-- Summary section that triggers balance display on click -->
		<summary
			@click="onUserBalance()"
			class=""
			id="saldo_usuario_principal"
			style="color: #4e4e4e"
		>
			<span>
				<span class="font-light inline-block text-left text-[12px]">{{
					$t('Saldo:')
				}}</span>
				<span class="saldo font-semibold"
					>{{ appComponent.session.moneda }}
					{{
						Math.abs(parseFloat(appComponent.saldo_total)).toFixed(
							2
						)
					}}</span
				>
			</span>
			<font-awesome-icon
				size="1x"
				class="mas-saldos ml-1"
				icon="fa-solid fa-chevron-down"
			/>
		</summary>
		<!-- Dropdown content for displaying balance details -->
		<ul
			style="background: linear-gradient(130deg, #e6e6e5, transparent)"
			class="menu dropdown-content bg-neutral text-neutral-content rounded-box w-full text-xs top-0"
			v-if="
				appComponent.typeUser == 'U' &&
				appComponent.session.wallet != '1' &&
				onSaldo
			"
		>
			<!-- Main balance display -->
			<span
				id="saldo_usuario_principal"
				class="leading-0 bg-gradient-to-b from-light2 via-primary-content to-shadow2 bg-primary-content text-neutral px-2 flex items-center rounded-t-xl"
				v-if="
					config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_recarga
				"
			>
				<a class="font-light subtitle-menu"
					>Saldo:
					<span class="font-bold"
						>{{ appComponent.session.moneda }}
						{{
							Math.abs(appComponent.saldo_total).toFixed(2)
						}}</span
					></a
				>
				<font-awesome-icon
					size="1x"
					class="mas-saldos absolute right-3"
					icon="fa-solid fa-chevron-down"
				/>
			</span>
			<!-- Refresh balance button -->
			<li
				@click="appComponent.refreshBalance2()"
				id="button-refrescar-saldo"
				class="leading-0 py-1"
			>
				<a class="refresh font-bold">{{ $t('Actualizar Saldo') }}</a>
				<font-awesome-icon
					class="text-gray-700 cursor-pointer top-5 -right-1 absolute"
					icon="fa-solid fa-refresh"
				/>
			</li>
			<hr
				style="
					border-top: 1px solid #70707052;
					width: 90%;
					margin: auto;
				"
			/>
			<!-- Recharge balance display -->
			<li
				id="saldo_usuario"
				class="leading-0 py-1"
				v-if="
					config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_recarga
				"
			>
				<a class="">{{ $t('Saldo Recargas:') }}</a
				><a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}</a
				>
			</li>
			<hr
				style="
					border-top: 1px solid #70707052;
					width: 90%;
					margin: auto;
				"
			/>
			<!-- Withdrawal balance display -->
			<li
				id="saldo_usuario_segundo"
				class="leading-0 py-1"
				v-if="
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_retiro) &&
					(config.header.balanceWithdraw == undefined
						? true
						: config.header.balanceWithdraw)
				"
			>
				<a class="">{{ $t('Saldo Retiro:') }}</a
				><a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}</a
				>
			</li>
			<!-- Bonus balance display -->
			<li
				id="saldo_usuario_tercero"
				class="leading-0 py-1"
				v-if="
					appComponent.saldo_bono != null &&
					true &&
					appComponent.saldo_bono > 0 &&
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_bono)
				"
			>
				<a class="">{{ $t('Bonos por liberar:') }}</a
				><a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_bono).toFixed(2) }}</a
				>
			</li>
			<!-- Freebet balance display -->
			<li
				id="saldo_freebet"
				class="leading-0 py-1"
				v-if="
					appComponent.saldo_freebet != null &&
					true &&
					appComponent.saldo_freebet > 0 &&
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_freebet)
				"
			>
				<a class="">{{ $t('Freebet') }} </a
				><a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_freebet).toFixed(2) }}</a
				>
			</li>
			<!-- FreeCasino balance display -->
			<li
				id="saldo_freeCasino"
				class="leading-0 py-1"
				v-if="
					appComponent.saldo_freeCasino != null &&
					true &&
					appComponent.saldo_freeCasino > 0 &&
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_freeCasino)
				"
			>
				<a class="">{{ $t('FreeCasino') }} </a
				><a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_freeCasino).toFixed(2) }}</a
				>
			</li>
			<!-- Deposit button -->
			<div
				@click="appComponent.gAnalytics('deposit_profile')"
				class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl"
				style="
					background: linear-gradient(
						0deg,
						rgba(0, 82, 6, 1) 0%,
						rgba(0, 173, 31, 1) 100%
					);
				"
			>
				<RouterLink
					to="/gestion/deposito"
					class="saldo font-light leading-loose"
					>{{ $t('Depositar') }}</RouterLink
				>
			</div>
		</ul>
	</details>
</template>

<!-- FILE DOCUMENTED -->
