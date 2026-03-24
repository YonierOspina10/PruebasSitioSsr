<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';

/**
 * Component definition for displaying user balance information.
 */
export default defineComponent({
	props: {
		/** Color of the text to be displayed. */
		textColor: {
			type: String,
			default: '#FFFFFF',
		},
		/** Determines if the position is relative. */
		isRelative: {
			type: Boolean,
			default: false,
		},
		/** Flag to show or hide the balance. */
		showBalance: {
			type: Boolean,
			default: false,
		},
		/** Width of the component. */
		width: {
			type: String,
			default: '',
		},
		/** Height of the component. */
		height: {
			type: String,
			default: '',
		},
		/** Custom text for the component. */
		textCustom: {
			type: String,
			default: '',
		},
	},
	emits: {
		/** Emits an event to close the modal with a boolean value. */
		onCloseModal: (value: boolean) => typeof value === 'boolean',
	},
	data() {
		/** Initializes component data. */
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let refreshBalance = this.$refreshBalance;
		let onSaldo = false; // State to track if saldo is visible
		let onViewBalance = false; // State to track if balance view is active
		return {
			config,
			appComponent,
			refreshBalance,
			onSaldo,
			onViewBalance,
		};
	},
	mounted() {
		/** Adds event listener for clicks outside the component. */
		document.addEventListener('click', this.handleClickOutside);
	},
	beforeUnmount() {
		/** Removes event listener for clicks outside the component. */
		document.removeEventListener('click', this.handleClickOutside);
	},
	methods: {
		/** Emits an event to close the modal. */
		onClose() {
			this.$emit('onCloseModal', false);
		},
		/** Handles clicks outside the menu to close it. */
		handleClickOutside(event) {
			const menu = this.$refs.menu;
			if (menu && !menu.contains(event.target)) {
				this.onSaldo = false; // Close saldo menu if clicked outside
			}
		},
		/** Toggles the visibility of user balance. */
		onUserBalance(event) {
			event.preventDefault();
			this.onSaldo = !this.onSaldo; // Toggle saldo visibility
			if (this.onSaldo) {
				this.appComponent.refreshBalance2(); // Refresh balance if opened
			}
		},
		/** Refreshes the user balance after a delay. */
		onRefreshBalance2() {
			const params = {
				source: 'user_balances',
				subscribe: true,
				what: { profile: [] },
			};
			this.appComponent.refreshBalance3(); // Refresh balance data
			setTimeout(() => {
				this.onViewBalance = true; // Set view balance state after delay
			}, 5000);
		},
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:BalanceUser|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>

<template>
	<!-- Main container for the balance display -->
	<div
		class="lg:relative"
		ref="menu"
		title="Saldo"
		id="saldo"
		:class="config.partner == '8' ? 'text-neutral-content' : 'text-neutral'"
		v-if="
			appComponent.session.wallet != '1' &&
			(config.header_ != undefined &&
			config.header_.balance_style != undefined
				? config.header_.balance_style == 1
				: config.header.styleBalance[appComponent.country] == 1)
		"
	>
		<!-- Button to display user balance when not showing balance -->
		<button
			v-if="!showBalance"
			@click="onUserBalance"
			v-bind="analyticsAttrs('header:balance')"
			class="relative md:hidden normal-case px-2 rounded-2xl btn-sm bg-base-100 text-neutral"
			id="saldo_usuario_principal"
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
		</button>
		<!-- Display balance when showBalance is true -->
		<div
			v-if="showBalance"
			@click="onUserBalance"
			v-bind="analyticsAttrs('header:balance')"
			class="relative cursor-pointer flex items-center justify-center px-4 text-neutral font-bold text-sm rounded-full bg-base-100 h-[21px] md:h-[18px]"
			:style="{ width: '117px' }"
		>
			<div
				class="flex items-center justify-center gap-1 transform scale-90"
			>
				<span class="font-semibold text-[12px] font-poppins">
					{{ $t('Saldo:') }}
				</span>
				<span class="text-[12px] font-bold font-poppins">
					{{ appComponent.session.moneda }}
				</span>
				<span class="text-[12px] font-bold font-poppins">
					{{
						Math.abs(parseFloat(appComponent.saldo_total)).toFixed(
							2
						)
					}}
				</span>
			</div>
		</div>
		<!-- Dropdown menu for additional balance options -->
		<ul
			class="absolute sm:top-[1.5rem] right-0 p-2 bg-base-100 text-neutral rounded-box w-48 text-sm"
			:class="[textCustom]"
			v-if="onSaldo && appComponent.session.wallet != '1'"
		>
			<!-- Refresh balance option -->
			<li
				@click="appComponent.refreshBalance2()"
				v-bind="analyticsAttrs('header:balance:refresh-main-balance')"
				id="button-refrescar-saldo"
				class="py-1 relative text-base font-bold"
			>
				<a class="refresh">{{ $t('Actualizar Saldo') }}</a>
				<font-awesome-icon
					class="absolute text-neutral cursor-pointer top-2 right-3 p-0"
					icon="fa fa-refresh"
				/>
			</li>
			<!-- Display recharge balance if applicable -->
			<li
				id="saldo_usuario"
				class="flex flex-col py-1"
				v-if="
					config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_recarga
				"
				v-bind="analyticsAttrs('header:balance:recharge-btn')"
			>
				<a class="text-base font-bold">{{ $t('Saldo Recargas:') }}</a>
				<a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}</a
				>
			</li>
			<!-- Display withdrawal balance if applicable -->
			<li
				id="saldo_usuario_segundo"
				class="flex flex-col py-1"
				v-if="
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_retiro) &&
					(config.header.balanceWithdraw == undefined
						? true
						: config.header.balanceWithdraw)
				"
			>
				<a class="text-base font-bold">{{ $t('Saldo Retiro:') }}</a>
				<a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}</a
				>
			</li>
			<!-- Display freebet and bonus balance -->
			<li id="saldo_freebet_bonos" class="flex flex-col py-1">
				<a class="text-base font-bold">{{
					$t('Saldo freebet y bonos:')
				}}</a>
				<a v-if="onViewBalance" class="saldo"
					>{{ appComponent.session.moneda }}
					{{
						Math.abs(
							(Number(appComponent.saldo_freebet) || 0) +
								(Number(appComponent.saldo_bono) || 0)
						).toFixed(2)
					}}</a
				>
				<button
					v-if="!onViewBalance"
					@click="onRefreshBalance2()"
					v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-btn')"
					class="group mt-2 rounded-md p-1 border-1 border-solid border-input-border mx-auto mb-4 text-neutral"
				>
					{{ $t('Consultar') }}
					<font-awesome-icon
						class="fa-refresh2 text-neutral text-sm group-active:-rotate-[920deg] group-active:transition-none transition-all ease-in-out duration-[5500ms]"
						icon="fa-solid fa-refresh"
					/>
				</button>
			</li>
			<!-- Display FreeCasino balance if applicable -->
			<li
				id="saldo_freeCasino"
				class="flex flex-col py-1"
				v-if="
					appComponent.saldo_freeCasino != null &&
					true &&
					appComponent.saldo_freeCasino > 0 &&
					(config.header.typeBalance == undefined
						? true
						: config.header.typeBalance.saldo_freeCasino)
				"
			>
				<a class="text-base font-bold">{{ $t('FreeCasino') }} </a>
				<a class="saldo"
					>{{ appComponent.session.moneda }}
					{{ Math.abs(appComponent.saldo_freeCasino).toFixed(2) }}</a
				>
			</li>
			<!-- Container for additional buttons -->
			<div class="flex flex-col justify-center items-center">
				<!-- Button to change currency if applicable -->
				<button
					v-if="
						appComponent.config.header !== undefined &&
						appComponent.config.header.currencyChangeButton !==
							undefined &&
						appComponent.config.header.currencyChangeButton[
							appComponent.country
						] !== undefined &&
						appComponent.config.header.currencyChangeButton[
							appComponent.country
						]
					"
					@click="
						appComponent.modalCurrencyExchange = true;
						onSaldo = false;
					"
					class="btn btn-primary btn-xs h-7 text-neutral block mx-auto my-1 rounded-xl"
				>
					{{ $t('Cambiar moneda') }}
				</button>
				<!-- Button to navigate to deposit management -->
				<div
					class="btn btn-xs h-7 text-neutral w-24 block mx-auto my-1 rounded-xl success-bg-button"

					><RouterLink
						:to="'/gestion/deposito'"
						@click="onClose"
						v-bind="analyticsAttrs('header:balance:deposit-btn')"
						class="leading-loose"
						>{{ $t('Depositar') }}</RouterLink
					>
				</div>
				<!-- Button to cancel withdrawals if applicable -->
				<div
					v-if="
						config.header.cancelWithdraw !== undefined &&
						config.header.cancelWithdraw
					"
					@click="
						appComponent.showModalCancelWithdraw = true;
						appComponent.gAnalytics('cancel_withdraw');
					"
					class="btn btn-xs text-neutral w-auto block mx-auto my-1 rounded-xl"
					style="
						background: linear-gradient(
							0deg,
							rgba(0, 82, 6, 1) 0%,
							rgba(0, 173, 31, 1) 100%
						);
					"
				>
					<a class="leading-loose">{{ $t('Anular Retiros') }}</a>
				</div>
			</div>
		</ul>
	</div>
</template>

<!-- FILE DOCUMENTED -->
