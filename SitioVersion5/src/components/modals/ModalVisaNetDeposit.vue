<template>
	<Teleport to="body">
		<!-- Modal container that appears based on layout configuration -->
		<div
			v-if="
				appComponent.config.layout == undefined ||
				appComponent.config.layout != 3
			"
			class="modal z-[999999999]"
		>
			<div class="modal-box w-11/12 max-w-xl">
				<!-- Close button for the modal -->
				<label
					@click="appComponent.modalVisaNetDeposit = false"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
				<!-- Modal title -->
				<h3 class="font-bold text-lg text-black" v-t>
					{{ 'VisaNet' }}
				</h3>
				<div class="relative w-full h-full pt-8 pb-4">
					<div
						class="bg-accent w-full h-full rounded-t-xl pt-10 pb-8 px-8 flex flex-col justify-between items-center gap-2 text-base-100 text-center"
					>
						<!-- Icon container -->
						<div
							class="shadow-lg mx-auto rounded-full bg-accent -mt-16 shadow-base-content/25 flex justify-center items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="56"
								height="56"
								viewBox="0 0 73 73"
								fill="none"
								class="fill-accent"
							>
								<g filter="url(#filter0_d_789_7383)">
									<circle
										cx="35"
										cy="35"
										r="28"
										fill="none"
									/>
								</g>
								<g filter="url(#filter1_d_789_7383)">
									<ellipse
										cx="35.1356"
										cy="34.6864"
										rx="14.4256"
										ry="14.4257"
										fill="#00AB46"
									/>
								</g>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M41.086 30.6519C41.2434 30.8094 41.2434 31.0646 41.086 31.2221L33.9521 38.3559C33.6168 38.6912 33.0731 38.6912 32.7378 38.3559L29.3134 34.9316C29.156 34.7741 29.156 34.5188 29.3134 34.3614L29.9576 33.7172C30.115 33.5598 30.3703 33.5598 30.5278 33.7172L33.0599 36.2493C33.2173 36.4068 33.4726 36.4068 33.6301 36.2493L39.8716 30.0078C40.0291 29.8503 40.2844 29.8503 40.4418 30.0078L41.086 30.6519Z"
									fill="#191929"
								/>
								<defs>
									<filter
										id="filter0_d_789_7383"
										x="0.280006"
										y="0.280006"
										width="56"
										height="56"
										filterUnits="userSpaceOnUse"
										color-interpolation-filters="sRGB"
									>
										<feFlood
											flood-opacity="0"
											result="BackgroundImageFix"
										/>
										<feColorMatrix
											in="SourceAlpha"
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="hardAlpha"
										/>
										<feOffset dx="1.344" dy="1.344" />
										<feGaussianBlur stdDeviation="4.032" />
										<feComposite
											in2="hardAlpha"
											operator="out"
										/>
										<feColorMatrix
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
										/>
										<feBlend
											mode="normal"
											in2="BackgroundImageFix"
											result="effect1_dropShadow_789_7383"
										/>
										<feBlend
											mode="normal"
											in="SourceGraphic"
											in2="effect1_dropShadow_789_7383"
											result="shape"
										/>
									</filter>
									<filter
										id="filter1_d_789_7383"
										x="13.99"
										y="13.5407"
										width="44.9795"
										height="44.9793"
										filterUnits="userSpaceOnUse"
										color-interpolation-filters="sRGB"
									>
										<feFlood
											flood-opacity="0"
											result="BackgroundImageFix"
										/>
										<feColorMatrix
											in="SourceAlpha"
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="hardAlpha"
										/>
										<feOffset dx="1.344" dy="1.344" />
										<feGaussianBlur stdDeviation="4.032" />
										<feComposite
											in2="hardAlpha"
											operator="out"
										/>
										<feColorMatrix
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
										/>
										<feBlend
											mode="normal"
											in2="BackgroundImageFix"
											result="effect1_dropShadow_789_7383"
										/>
										<feBlend
											mode="normal"
											in="SourceGraphic"
											in2="effect1_dropShadow_789_7383"
											result="shape"
										/>
									</filter>
								</defs>
							</svg>
						</div>
						<!-- Success message title -->
						<h3 class="font-bold text-2xl">
							{{ $t('Deposito exitoso') }}
						</h3>
						<!-- Success message description -->
						<p class="font-light text-gray-300">
							{{
								$t('Tu deposito ha sido procesado exitosamente')
							}}
						</p>
						<hr
							class="w-full border border-secondary-content my-2"
						/>
						<!-- Display deposit method if available -->
						<div
							v-if="appComponent.modalVisaNetDepositData.method"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Método')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.method
							}}</span>
						</div>
						<!-- Display date and time if available -->
						<div
							v-if="appComponent.modalVisaNetDepositData.dateTime"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Fecha y hora')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.dateTime
							}}</span>
						</div>
						<!-- Display deposit amount if available -->
						<div
							v-if="appComponent.modalVisaNetDepositData.amount"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Valor')
							}}</span>
							<span class="font-bold text-end">{{
								(appComponent.session.simbolo_moneda != null &&
								appComponent.session.simbolo_moneda != undefined
									? appComponent.session.simbolo_moneda
									: '$') +
								' ' +
								appComponent.modalVisaNetDepositData.amount
							}}</span>
						</div>
						<!-- Display card name if available -->
						<div
							v-if="appComponent.modalVisaNetDepositData.cardName"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Nombre de tarjeta')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.cardName
							}}</span>
						</div>
						<!-- Display card number if available -->
						<div
							v-if="
								appComponent.modalVisaNetDepositData.cardNumber
							"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Número de tarjeta')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.cardNumber
							}}</span>
						</div>
						<!-- Display reference number if available -->
						<div
							v-if="
								appComponent.modalVisaNetDepositData
									.referenceNumber
							"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Número de referencia')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData
									.referenceNumber
							}}</span>
						</div>
						<!-- Display authorization number if available -->
						<div
							v-if="
								appComponent.modalVisaNetDepositData
									.authorizationNumber
							"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Número de autorización')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData
									.authorizationNumber
							}}</span>
						</div>
						<!-- Display membership if available -->
						<div
							v-if="
								appComponent.modalVisaNetDepositData.membership
							"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Afiliación')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.membership
							}}</span>
						</div>
						<!-- Display audit number if available -->
						<div
							v-if="
								appComponent.modalVisaNetDepositData.auditNumber
							"
							class="flex justify-between items-center w-full text-base font-light"
						>
							<span class="text-start text-gray-300">{{
								$t('Número de auditoria')
							}}</span>
							<span class="font-bold text-end">{{
								appComponent.modalVisaNetDepositData.auditNumber
							}}</span>
						</div>
						<hr
							class="w-full border border-secondary-content mt-2 mb-6"
						/>
					</div>
					<!-- Decorative dotted border at the bottom -->
					<div
						class="dotted-border w-full absolute bottom-1 left-0"
					></div>
				</div>
			</div>
		</div>
		<!-- Alternative modal layout for specific configuration -->
		<dialog
			v-else-if="appComponent.config.layout == 3"
			class="modal in w-screen h-screen bg-black/80"
		>
			<div
				class="relative rounded-box min-w-[98%] sm:min-w-[470px] sm:max-w-[40%] min-h-[270px] max-h-[90%] overflow-hidden text-base-300"
			>
				<!-- Close button for the dialog -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="appComponent.modalVisaNetDeposit = false"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Dialog title -->
				<h3 class="w-full p-4 bg-secondary text-xl font-bold" v-t>
					{{ 'VisaNet' }}
				</h3>
				<div
					id="visa-content"
					class="w-full h-full bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box max-h-[70vh] overflow-y-auto"
				>
					<div class="relative w-full h-full py-4">
						<div
							class="bg-accent w-full h-full rounded-t-xl pt-10 pb-8 px-8 flex flex-col justify-between items-center gap-2 text-base-100 text-center"
						>
							<!-- Icon container -->
							<div
								class="shadow-lg mx-auto rounded-full bg-accent -mt-16 shadow-base-content/25 flex justify-center items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="56"
									height="56"
									viewBox="0 0 73 73"
									fill="none"
									class="fill-accent"
								>
									<g filter="url(#filter0_d_789_7383)">
										<circle
											cx="35"
											cy="35"
											r="28"
											fill="none"
										/>
									</g>
									<g filter="url(#filter1_d_789_7383)">
										<ellipse
											cx="35.1356"
											cy="34.6864"
											rx="14.4256"
											ry="14.4257"
											fill="#00AB46"
										/>
									</g>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M41.086 30.6519C41.2434 30.8094 41.2434 31.0646 41.086 31.2221L33.9521 38.3559C33.6168 38.6912 33.0731 38.6912 32.7378 38.3559L29.3134 34.9316C29.156 34.7741 29.156 34.5188 29.3134 34.3614L29.9576 33.7172C30.115 33.5598 30.3703 33.5598 30.5278 33.7172L33.0599 36.2493C33.2173 36.4068 33.4726 36.4068 33.6301 36.2493L39.8716 30.0078C40.0291 29.8503 40.2844 29.8503 40.4418 30.0078L41.086 30.6519Z"
										fill="#191929"
									/>
									<defs>
										<filter
											id="filter0_d_789_7383"
											x="0.280006"
											y="0.280006"
											width="56"
											height="56"
											filterUnits="userSpaceOnUse"
											color-interpolation-filters="sRGB"
										>
											<feFlood
												flood-opacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
												result="hardAlpha"
											/>
											<feOffset dx="1.344" dy="1.344" />
											<feGaussianBlur
												stdDeviation="4.032"
											/>
											<feComposite
												in2="hardAlpha"
												operator="out"
											/>
											<feColorMatrix
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
											/>
											<feBlend
												mode="normal"
												in2="BackgroundImageFix"
												result="effect1_dropShadow_789_7383"
											/>
											<feBlend
												mode="normal"
												in="SourceGraphic"
												in2="effect1_dropShadow_789_7383"
												result="shape"
											/>
										</filter>
										<filter
											id="filter1_d_789_7383"
											x="13.99"
											y="13.5407"
											width="44.9795"
											height="44.9793"
											filterUnits="userSpaceOnUse"
											color-interpolation-filters="sRGB"
										>
											<feFlood
												flood-opacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
												result="hardAlpha"
											/>
											<feOffset dx="1.344" dy="1.344" />
											<feGaussianBlur
												stdDeviation="4.032"
											/>
											<feComposite
												in2="hardAlpha"
												operator="out"
											/>
											<feColorMatrix
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
											/>
											<feBlend
												mode="normal"
												in2="BackgroundImageFix"
												result="effect1_dropShadow_789_7383"
											/>
											<feBlend
												mode="normal"
												in="SourceGraphic"
												in2="effect1_dropShadow_789_7383"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</div>
							<!-- Success message title -->
							<h3 class="font-bold text-2xl">
								{{ $t('Deposito exitoso') }}
							</h3>
							<!-- Success message description -->
							<p class="font-light text-gray-300">
								{{
									$t(
										'Tu deposito ha sido procesado exitosamente'
									)
								}}
							</p>
							<hr
								class="w-full border border-secondary-content my-2"
							/>
							<!-- Display deposit method if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData.method
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Método')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData.method
								}}</span>
							</div>
							<!-- Display date and time if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.dateTime
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Fecha y hora')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.dateTime
								}}</span>
							</div>
							<!-- Display deposit amount if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData.amount
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Valor')
								}}</span>
								<span class="font-bold text-end">{{
									(appComponent.session.simbolo_moneda !=
										null &&
									appComponent.session.simbolo_moneda !=
										undefined
										? appComponent.session.simbolo_moneda
										: '$') +
									' ' +
									appComponent.modalVisaNetDepositData.amount
								}}</span>
							</div>
							<!-- Display card name if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.cardName
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Nombre de tarjeta')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.cardName
								}}</span>
							</div>
							<!-- Display card number if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.cardNumber
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Número de tarjeta')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.cardNumber
								}}</span>
							</div>
							<!-- Display reference number if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.referenceNumber
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Número de referencia')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.referenceNumber
								}}</span>
							</div>
							<!-- Display authorization number if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.authorizationNumber
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Número de autorización')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.authorizationNumber
								}}</span>
							</div>
							<!-- Display membership if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.membership
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Afiliación')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.membership
								}}</span>
							</div>
							<!-- Display audit number if available -->
							<div
								v-if="
									appComponent.modalVisaNetDepositData
										.auditNumber
								"
								class="flex justify-between items-center w-full text-base font-light"
							>
								<span class="text-start text-gray-300">{{
									$t('Número de auditoria')
								}}</span>
								<span class="font-bold text-end">{{
									appComponent.modalVisaNetDepositData
										.auditNumber
								}}</span>
							</div>
							<hr
								class="w-full border border-secondary-content mt-2 mb-6"
							/>
						</div>
						<!-- Decorative dotted border at the bottom -->
						<div
							class="dotted-border border-secondary-content w-full absolute bottom-1 left-0"
						></div>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';

export default defineComponent({
	components: { AnimatedPlaceholder },
	// Setup function for component logic
	setup() {
		return {};
	},
	// Data function to initialize component state
	data() {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Access application component
		return {
			config,
			appComponent,
		};
	},
	// Lifecycle hook called after component is mounted
	mounted() {
		console.log('ModalVisaNetDeposit mounted');
	},
});
</script>
<style scoped>
/* Style for dotted border used in the modal */
.dotted-border {
	border-bottom: 20px dotted;
}
</style>

<!-- FILE DOCUMENTED -->
