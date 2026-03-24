<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying the user's balance and related information.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's data properties.
	 */
	data() {
		let config = this.$config(); // Fetches the configuration settings.
		let appComponent: any = this.$appComponent; // Retrieves the application component.
		let refreshBalance = this.$refreshBalance; // Method to refresh the balance.
		return {
			config,
			appComponent,
			refreshBalance,
		};
	},
	methods: {
		// Methods can be defined here if needed.
	},
});
</script>

<template>
	<!-- Main container for the balance display, shown only if the wallet is not '1' -->
	<div
		title="Saldo"
		id="saldo"
		class="dropdown dropdown-end dropdown-hover rounded-2xl btn btn-primary btn-sm md:hidden mx-0"
		v-if="appComponent.session.wallet != '1'"
	>
		<!-- User's main balance display -->
		<div
			tabindex="0"
			class="normal-case text-left text-neutral"
			id="saldo_usuario_principal"
		>
			<span class="">
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
			<!-- Icon indicating dropdown for more options -->
			<font-awesome-icon
				size="1x"
				class="mas-saldos text-sm mx-1"
				icon="fa-solid fa-chevron-down"
			/>
		</div>
		<!-- Dropdown menu for additional balance details -->
		<ul
			tabindex="0"
			class="p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box uppercase w-[200%]"
			v-if="
				appComponent.typeUser == 'U' &&
				appComponent.session.wallet != '1'
			"
			style="
				background: linear-gradient(313deg, #70707059, transparent);
				border: 2px solid #fff;
			"
		>
			<!-- Header section of the balance dropdown -->
			<div class="header-style flex justify-between">
				<div class="balance-general">
					<div class="title-balance">
						<a class="font-bold text-gray-600 capitalize p-0">{{
							$t('Balance General')
						}}</a>
					</div>
					<div class="balance-money">
						<a class="font-bold text-gray-600 capitalize p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_total)
								).toFixed(2)
							}}</a
						>
					</div>
				</div>
				<!-- Button to refresh the balance -->
				<div
					class="refresh-button"
					@click="refreshBalance()"
					id="button-refrescar-saldo"
				>
					<font-awesome-icon
						class="text-gray-700 cursor-pointer"
						icon="fa-solid fa-refresh"
					/>
				</div>
				<!-- Player information section -->
				<div class="player flex flex-col items-center">
					<a
						class="text-gray-600 text-xs font-bold text-center p-0 pt-2"
						>{{ $t('ID de jugador:') }}</a
					>
					<a class="p-0 text-gray-600">{{
						appComponent.session.usuario
					}}</a>
					<!-- Link to deposit page -->
					<RouterLink
						@click="appComponent.gAnalytics('deposit_profile')"
						class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl text-center leading-[0]"
						to="/gestion/deposito"
						style="
							background: linear-gradient(
								0deg,
								rgba(0, 82, 6, 1) 0%,
								rgba(0, 173, 31, 1) 100%
							);
						"
					>
						{{ $t('Depositar') }}
					</RouterLink>
				</div>
			</div>
			<hr
				class="my-1"
				style="
					border-top: 1px solid #70707052;
					width: 100%;
					margin: auto;
				"
			/>
			<!-- Body section displaying various balance types -->
			<div class="body-balance text-gray-600">
				<ul class="flex flex-col p-0">
					<!-- Conditional display for recharge balance -->
					<li
						v-if="
							config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_recarga
						"
						class="flex w-full justify-between flex-row items-center h-5 capitalize"
					>
						<font-awesome-icon
							class="p-0"
							icon="fa-solid fa-money-check-dollar"
						/>{{ $t('Saldo Recargas') }}
						<a class="font-bold text-xs p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_recarga)
								).toFixed(2)
							}}</a
						>
					</li>
					<!-- Conditional display for withdrawal balance -->
					<li
						v-if="
							config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_retiro
						"
						class="flex w-full justify-between flex-row items-center h-5 capitalize"
					>
						<font-awesome-icon
							class="p-0"
							icon="fa-solid fa-money-check-dollar"
						/>{{ $t('Saldo Retiros') }}
						<a class="font-bold text-xs p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_retiro)
								).toFixed(2)
							}}</a
						>
					</li>
					<!-- Conditional display for free casino balance -->
					<li
						v-if="
							appComponent.saldo_freeCasino !== '' &&
							appComponent.saldo_freeCasino != undefined &&
							appComponent.saldo_freeCasino != null &&
							appComponent.saldo_freeCasino != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_freeCasino)
						"
						class="flex w-full justify-between flex-row items-center h-5 capitalize"
					>
						<font-awesome-icon
							class="p-0"
							icon="fa-solid fa-money-check-dollar"
						/>{{ $t('FreeCasino')
						}}<a class="font-bold text-xs p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_freeCasino)
								).toFixed(2)
							}}</a
						>
					</li>
					<!-- Conditional display for bonus balance -->
					<li
						v-if="
							appComponent.saldo_bono !== '' &&
							appComponent.saldo_bono != undefined &&
							appComponent.saldo_bono != null &&
							appComponent.saldo_bono != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_bono)
						"
						class="flex w-full justify-between flex-row items-center h-5 capitalize"
					>
						<font-awesome-icon
							class="p-0"
							icon="fa-solid fa-money-check-dollar"
						/>{{ $t('Bonos por liberar')
						}}<a class="font-bold text-xs p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_bono)
								).toFixed(2)
							}}</a
						>
					</li>
					<!-- Conditional display for free bet balance -->
					<li
						v-if="
							appComponent.saldo_freebet !== '' &&
							appComponent.saldo_freebet != undefined &&
							appComponent.saldo_freebet != null &&
							appComponent.saldo_freebet != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_freebet)
						"
						class="flex w-full justify-between flex-row items-center h-5 capitalize"
					>
						<font-awesome-icon
							class="p-0"
							icon="fa-solid fa-money-check-dollar"
						/>{{ $t('Freebet')
						}}<a class="font-bold text-xs p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_freebet)
								).toFixed(2)
							}}</a
						>
					</li>
				</ul>
			</div>
			<hr
				class="my-1"
				style="
					border-top: 1px solid #70707052;
					width: 100%;
					margin: auto;
				"
			/>
			<!-- Footer section displaying total balance -->
			<div
				class="footer-balance text-gray-600 flex justify-between capitalize"
			>
				<a class="font-bold p-0">{{ $t('Balance general') }}</a>
				<a class="font-bold p-0"
					>{{ appComponent.session.moneda }}
					{{
						Math.abs(parseFloat(appComponent.saldo_total)).toFixed(
							2
						)
					}}</a
				>
			</div>
		</ul>
	</div>
</template>

<!-- FILE DOCUMENTED -->
