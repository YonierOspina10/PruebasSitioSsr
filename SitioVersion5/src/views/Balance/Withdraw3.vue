<template>
    <!-- Main section for displaying withdrawal information -->
    <section class="relative w-full bg-base-200 h-auto rounded-b-box">
        <!-- Placeholder shown while loading -->
        <AnimatedPlaceholder
            v-if="loadingView"
            class="w-full h-[600px] rounded-b-box"
        />
        <!-- Main content displayed when there are withdrawals -->
        <div
            v-if="step == 0 && withdrawals.length > 0 && !loadingView"
            class="flex justify-center md:justify-between items-center flex-col gap-4 py-4 md:py-9"
        >
            <div
                class="flex flex-col md:flex-row justify-center md:justify-between items-center w-full md:h-full px-4 md:px-0"
            >
                <div
                    class="animationLeft w-full md:w-[40%] md:h-full py-6 flex flex-col justify-center items-start gap-8 md:pl-10"
                >
					<span
                        class="hidden md:flex uppercase rounded-full text-sm font-bold text-primary bg-primary-content/25 py-1 px-4 border-[0.28px] border-primary"
                    >{{ $t('Retiros') }}</span
                    >
                    <h2
                        class="w-[80%] history-title text-xl md:text-3xl text-neutral"
                        v-html="
							main.title
								.replaceAll('#NUMBER#', appComponent.pendingWithdrawals)
								.replaceAll(
									'#SOLICITUD#',
									appComponent.pendingWithdrawals > 1
										? 'solicitudes'
										: 'solicitud'
								)
						"
                    ></h2>
                    <p
                        class="history-description text-neutral"
                        v-html="
							main.descriptionTitle.replaceAll(
								'#DATE#',
								(loadingWithdrawals ? new Date() : lastWithdrawal)
									.toLocaleString('en-GB', { hour12: true })
									.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')
									.slice(0, 10)
							)
						"
                    ></p>
                    <div
                        class="w-full flex flex-col justify-center items-center md:items-start gap-6"
                    >
                        <component :is="main.componentSlot.id" :data="main.componentSlot" />
                    </div>
                </div>
                <div
                    class="animationRight w-full md:w-[55%] h-full bg-base-200 border border-primary rounded-r-box md:rounded-r-none rounded-l-box shadow-xl shadow-neutral-content/10 px-4 md:px-8 py-9 text-neutral flex justify-center items-start flex-col"
                >
                    <h3 class="font-bold text-2xl">{{ main.subtitle }}</h3>
                    <p class="font-light text-lg">{{ main.descriptionSubtitle }}</p>
                    <div
                        class="w-full h-full flex flex-col justify-start items-center gap-1 mt-4"
                    >
                        <div
                            class="w-full flex justify-around items-center rounded-lg h-14"
                        >
							<span
                                class="w-1/5 flex justify-center items-center px-1 text-center leading-4"
                            >{{ $t('No. retiro') }}</span
                            >
                            <span
                                class="w-1/5 flex justify-center items-center px-1 text-center leading-4"
                            >{{ $t('Tipo') }}</span
                            >
                            <span
                                class="w-[18%] flex justify-center items-center px-1 text-center leading-4"
                            >{{ $t('Valor') }}</span
                            >
                            <span
                                class="w-[22%] flex justify-center items-center px-1 text-center leading-4"
                            >{{ $t('Fecha') }}</span
                            >
                            <span
                                class="w-1/5 flex justify-center items-center px-1 text-center leading-4"
                            >{{ $t('Acciones') }}</span
                            >
                        </div>
                        <div
                            class="w-full h-[330px] overflow-y-auto scrollWidth flex flex-col justify-start items-center"
                        >
                            <AnimatedPlaceholder
                                v-if="loadingWithdrawals"
                                v-for="index in 4"
                                :key="index"
                                class="w-full h-20 mb-2 rounded-box"
                            />
                            <span
                                v-if="!loadingWithdrawals && withdrawals.length == 0"
                                class="text-center w-full my-5 text-neutral"
                            >
								{{ $t('No tienes retiros pendientes') }}
							</span>
                            <div
                                v-if="!loadingWithdrawals && withdrawals.length > 0"
                                v-for="(withdrawal, index) in withdrawals"
                                :key="index"
                                class="w-full flex flex-col justify-center items-center mb-4"
                            >
                                <div
                                    class="w-full flex justify-around items-center bg-base-200/80 rounded-lg h-14"
                                >
									<span
                                        class="w-1/5 flex justify-center items-center text-neutral px-1 text-center leading-4"
                                    >{{ withdrawal.id }}</span
                                    >
                                    <span
                                        class="w-1/5 flex justify-center items-center text-neutral px-1 text-center leading-4"
                                    >{{ $t(withdrawal.payment_system_name) }}</span
                                    >
                                    <span
                                        class="w-[18%] flex justify-center items-center text-neutral px-1 text-center leading-4"
                                    >{{ withdrawal.amount }}</span
                                    >
                                    <span
                                        class="w-[22%] hidden md:flex justify-center items-center text-neutral px-1 text-center leading-4"
                                    >{{ withdrawal.date.toLocaleString() }}</span
                                    >
                                    <span class="w-1/5 flex justify-center items-center">
										<button
                                            :disabled="withdrawal.status != 1 && withdrawal.status != 7"
                                            @click="handleCancelWithdrawal(withdrawal)"
                                            class="btn btn-sm btn-primary hover:bg-primary-focus hover:border-primary rounded-md text-xs capitalize"
                                            :class="
												withdrawal.status != 1 && withdrawal.status != 7
													? 'text-neutral'
													: 'text-neutral-content'
											"
                                            data-analytics-label="withdrawal:cancel"
                                            :data-analytics-position="String(index + 1)"
                                            :data-analytics-context="`step:history|step-num:0|withdrawal-id:${withdrawal.id}`"
                                        >
											{{ $t('Anular') }}
										</button>
									</span>
                                </div>
                                <div
                                    class="w-[90%] h-20 border-l-1 border-neutral/20 flex flex-col justify-center items-center"
                                >
									<span
                                        class='md:hidden flex justify-center items-center text-neutral py-2 text-center text-xs leading-4'>{{ withdrawal.date.toLocaleString().slice(0, -3)
                                        }}</span>
                                    <ul class="steps text-xs w-full">
                                        <li
                                            :data-content="withdrawal.status == 1 ? '✓' : ''"
                                            class="step"
                                            :class="
												withdrawal.status == 1
													? 'step-primary text-neutral'
													: ''
											"
                                        >
                                            {{ $t('Creado') }}
                                        </li>
                                        <li
                                            :data-content="withdrawal.status == 2 || withdrawal.status == 7 ? '✓' : ''"
                                            class="step"
                                            :class="
												withdrawal.status == 2 || withdrawal.status == 7
													? 'step-primary text-neutral'
													: ''
											"
                                        >
                                            {{ $t('Aprobado') }}
                                        </li>
                                        <li
                                            :data-content="withdrawal.status == 3 ? '?' : ''"
                                            class="step"
                                            :class="
												withdrawal.status == 3
													? 'step-primary text-neutral'
													: ''
											"
                                        >
                                            {{ $t('Procesando') }}
                                        </li>
                                        <li
                                            :data-content="
												withdrawal.status == 4
													? '✓'
													: withdrawal.status == 5
													? '✕'
													: ''
											"
                                            class="step"
                                            :class="{
												'step-success text-neutral': withdrawal.status == 4,
												'step-error text-neutral': withdrawal.status == 5,
											}"
                                        >
                                            {{ $t(withdrawal.status2) }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="animationRight w-full flex justify-center flex-col md:justify-end items-center md:flex-row px-10 gap-6 mt-4"
            >
                <RouterLink
                    to="/gestion/cuenta_cobro_anular"
                    class="btn btn-primary btn-outline hover:bg-primary hover:border-primary hover:text-neutral-content normal-case text-base"
                >
                    {{ $t('Consultar histórico') }}
                </RouterLink>
                <button
                    @click="nextStep(1)"
                    class="btn btn-primary hover:bg-primary hover:border-primary text-neutral-content normal-case text-base"
                    data-analytics-label="withdrawal:open"
                    data-analytics-context="step:open|step-num:0"
                >
                    {{ $t('Solicitar retiro') }}
                </button>
            </div>
        </div>
        <!-- Content displayed when there are no withdrawals -->
        <div
            v-if="step == 0 && withdrawals.length === 0 && !loadingView"
            class="flex justify-center lg:justify-between items-center flex-col gap-4 py-4 md:py-9 overflow-hidden rounded-b-box"
        >
            <div
                class="relative flex flex-col lg:flex-row justify-center md:justify-between items-center w-full md:h-full px-4 md:px-10 gap-10"
            >
                <div class="hidden lg:flex circle-background3 z-1"></div>
                <div
                    class="circle-background-mobile lg:hidden h-[650px] absolute -bottom-10 sm:-bottom-20 -left-96 sm:-left-3"
                ></div>
                <div
                    class="animationLeft w-full lg:w-[50%] md:h-full py-6 flex flex-col justify-center items-start gap-8 z-20"
                >
                    <h2
                        class="w-[80%] history-title text-3xl max-w-3xl text-neutral"
                        v-html="main2.title"
                    ></h2>
                    <p class="history-description text-neutral" v-html="main2.description"></p>
                    <div class="flex justify-center items-center gap-6">
                        <div
                            v-for="(info, index) in main2.info"
                            :key="index"
                            class="flex justify-between items-center gap-6"
                        >
                            <div class="flex flex-col justify-center items-start gap-1">
                                <img
                                    :src="info.image"
                                    alt=""
                                    class="mb-1 w-[22px] aspect-square"
                                />
                                <span class="text-3xl text-neutral font-black">{{
                                        $t(info.title)
                                    }}</span>
                                <span class="text-neutral-focus text-lg">{{
                                        $t(info.description)
                                    }}</span>
                            </div>
                            <hr
                                class="h-20 border-l border-gray-500"
                                v-if="index + 1 < main2.info.length"
                            />
                        </div>
                    </div>
                    <div
                        class="w-full flex flex-col justify-center items-center md:items-start gap-6"
                    >
                        <component :is="main.componentSlot.id" :data="main.componentSlot" />
                    </div>
                    <div
                        v-if="appComponent.session.formSplaft == 'S'"
                        class="GeneralForm WithdrawForm WithdrawAmount Retirar"
                    >
                        <div
                            class="btn-base-300"
                            :class="
										config.layout != undefined && config.layout == 3
											? 'bg-base-200'
											: 'bg-neutral'
									"
                            style="text-align: center"
                        >
                            <div
                                :class="
											config.layout != undefined && config.layout == 3
												? 'text-white'
												: 'text-black'
										"
                            >
                                {{
                                    $t(
                                        'Estimado Usuario para realizar su retiro es necesario actualizar el formulario de SPLAFT.',
                                    )
                                }}
                            </div>
                            <label
                                @click="appComponent.modal.showModal = 'splaft'"
                                class="btn btn-xs btn-base-300"
                                :class="
											config.layout != undefined && config.layout == 3
												? 'text-white'
												: 'text-black'
										"
                            >{{ $t('Actualizar Formulario SPLAFT') }}</label
                            >
                        </div>
                    </div>
                    <div
                        v-else
                        class="w-full flex justify-center flex-col md:justify-start items-center md:flex-row gap-6"
                    >
                        <button
                            @click="nextStep(1)"
                            class="w-48 md:w-auto btn btn-primary hover:bg-primary hover:border-primary text-neutral-content normal-case text-base"
                            data-analytics-label="withdrawal:open"
                            data-analytics-context="step:open|step-num:0"
                        >
                            {{ $t('Solicitar retiro') }}
                        </button>
                        <RouterLink
                            to="/gestion/cuenta_cobro_anular"
                            class="w-48 md:w-auto btn btn-primary hover:bg-primary hover:border-primary btn-outline hover:text-neutral-content normal-case text-base"
                        >
                            {{ $t('Consultar histórico') }}
                        </RouterLink>
                    </div>
                </div>
                <div
                    class="animationRight w-[90%] lg:w-[50%] z-10 flex flex-col justify-center items-center lg:items-end gap-12 md:gap-4 pb-10 lg:pb-0"
                >
                    <RouterLink :to="main2.redirectImage">
                        <img
                            :src="main2.image"
                            alt=""
                            class="drop-shadow-2xl shadow-neutral-content w-full h-full max-w-[471px] max-h-[480px]"
                        />
                    </RouterLink>
                    <div
                        class="lg:hidden w-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0"
                    >
                        <div
                            class="flex flex-col justify-center items-center gap-2 font-bold text-xl"
                        >
							<span
                                class="step-edit rounded-full text-neutral flex justify-center items-center"
                            >1</span
                            >
                            <span class="text-base w-40 text-center text-[#2F2F44]">{{
                                    $t('Dar clic en solicitud de retiro')
                                }}</span>
                        </div>
                        <hr
                            class="h-20 sm:h-0 w-0 sm:w-20 border border-primary-content border-dashed"
                        />
                        <div
                            class="flex flex-col justify-center items-center gap-2 font-bold text-xl"
                        >
							<span
                                class="step-edit rounded-full text-neutral flex justify-center items-center"
                            >2</span
                            >
                            <span class="text-base w-40 text-center text-[#2F2F44]">{{
                                    $t('Selecciona el tipo de retiro')
                                }}</span>
                        </div>
                        <hr
                            class="h-20 sm:h-0 w-0 sm:w-20 border border-primary-content border-dashed"
                        />
                        <div
                            class="flex flex-col justify-center items-center gap-2 font-bold text-xl"
                        >
							<span
                                class="step-edit rounded-full text-neutral flex justify-center items-center"
                            >3</span
                            >
                            <span class="text-base w-40 text-center text-[#2F2F44]">{{
                                    $t('¡Dar clic en aceptar y listo!')
                                }}</span>
                        </div>
                    </div>
                    <div
                        class="hidden lg:flex steps-withdraw w-[95%] flex-col justify-center items-center gap-4 text-neutral font-bold -mr-5 -mb-40 lg:-mb-0"
                    >
                        <span class="text-base">{{ $t('Pasos para retirar:') }}</span>
                        <ul
                            class="steps gap-4 steps-vertical md:steps-horizontal items-start text-[18px]"
                        >
                            <li data-content="1" class="step">
								<span class="text-base">{{
                                        $t('Dar clic en solicitud de retiro')
                                    }}</span>
                            </li>
                            <li data-content="2" class="step">
								<span class="text-base">{{
                                        $t('Selecciona el tipo de retiro')
                                    }}</span>
                            </li>
                            <li data-content="3" class="step">
								<span class="text-base">{{
                                        $t('¡Dar clic en aceptar y listo!')
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main container for the step-based UI, shown when step is not 0 -->
        <div
            v-else-if="step != 0"
            class="relative flex justify-between items-center flex-col gap-8 md:gap-6 px-4 md:px-10 overflow-hidden py-9 rounded-box h-full"
        >
            <!-- Background circle for steps 1 and 2 -->
            <div v-if="step === 1 || step === 2" class="circle-background z-1"></div>
            <!-- Background circle for step 3 -->
            <div v-else-if="step === 3" class="circle-background2 z-1"></div>
            <!-- Step navigation buttons -->
            <div
                class="w-full flex justify-between items-center border-b border-gray-600"
            >
                <div
                    class="animationRight w-full flex justify-around md:justify-end items-center gap-5 md:gap-8 pb-6"
                >
                    <!-- Button for step 1 -->
                    <button
                        @click="nextStep(1)"
                        :disabled="step == 3"
                        class="flex justify-center items-center gap-2"
                        data-analytics-label="withdrawal:open"
                        data-analytics-context="step:open|step-num:0"
                    >
                        <div
                            class="w-8 h-8 flex justify-center items-center rounded-full text-base"
                            :class="
								step == 1
									? 'bg-primary font-bold text-neutral-content'
									: 'border border-primary text-neutral'
							"
                        >
                            {{ step > 1 ? '✓' : 1 }}
                        </div>
                        <span
                            class="text-base text-neutral"
                            :class="
								step === 1
									? 'font-bold'
									: 'font-light'
							"
                        >{{ $t('Información') }}</span
                        >
                    </button>
                    <!-- Button for step 2 -->
                    <button
                        @click="nextStep(2)"
                        :disabled="step == 3"
                        class="flex justify-center items-center gap-2"
                        data-analytics-label="withdrawal:confirm"
                        data-analytics-context="step:info|step-num:2"
                    >
                        <div
                            class="w-8 h-8 flex justify-center items-center rounded-full text-base"
                            :class="
								step == 2
									? 'bg-primary font-bold text-neutral-content'
									: 'border border-primary text-neutral'
							"
                        >
                            {{ step > 2 ? '✓' : 2 }}
                        </div>
                        <span
                            class="text-base text-neutral"
                            :class="
								step === 2
									? 'font-bold'
									: 'font-light'
							"
                        >{{ $t('Tipo') }}</span
                        >
                    </button>
                    <!-- Button for step 3 -->
                    <div class="flex justify-center items-center gap-2">
                        <div
                            class="w-8 h-8 flex justify-center items-center rounded-full text-base"
                            :class="
								step == 3
									? 'bg-primary font-bold text-neutral-content'
									: 'border border-primary text-neutral'
							"
                        >
                            {{ step == 3 ? '✓' : 3 }}
                        </div>
                        <span
                            class="text-base text-neutral"
                            :class="
								step === 3
									? 'font-bold'
									: 'font-light'
							"
                        >{{ $t('Detalle') }}</span
                        >
                    </div>
                </div>
            </div>
            <!-- Content for step 1 -->
            <div
                v-if="step == 1"
                class="flex flex-col md:flex-row justify-between items-center w-full h-full gap-32 md:gap-0 pb-10 md:pb-0"
            >
                <div
                    class="animationLeft w-full md:w-[42%] h-full z-20 mt-0 lg:-mt-10 order-2 md:order-1"
                >
                    <img
                        :src="information.image"
                        alt="Donate Image"
                        class="absolute bottom-0 right-0 md:static -z-10 h-auto md:h-full sm:max-h-[536px] w-1/2 md:w-full md:max-w-[366px] drop-shadow-2xl shadow-neutral-content"
                    />
                    <div
                        class="w-44 md:w-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 sm:mt-20 md:mt-12 pr-10"
                    >
                        <!-- Loop through information.info to display each item -->
                        <div
                            v-for="(info, index) in information.info"
                            :key="index"
                            class="flex flex-col md:flex-row justify-center items-center gap-8"
                        >
                            <div
                                class="flex flex-col justify-center items-center text-neutral text-center"
                            >
                                <img
                                    :src="info.image"
                                    alt="Business Icon"
                                    class="w-12 aspect-square"
                                />
                                <span class="text-3xl md:text-4xl font-black">{{
                                        $t(info.title)
                                    }}</span>
                                <span class="text-xl font-light">{{
                                        $t(info.description)
                                    }}</span>
                            </div>
                            <!-- Divider between items -->
                            <hr
                                v-if="index + 1 < information.info.length"
                                class="w-full md:w-0 md:h-20 border-[0.28px] border-base-300/20"
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="animationRight w-full md:w-[55%] h-full z-50 order-1 md:order-2"
                >
                <span
                    class="uppercase rounded-full text-sm font-bold text-primary bg-primary-content/25 py-1 px-4 border-[0.28px] border-primary"
                >{{ $t('Información') }}</span
                >
                    <h3 class="text-2xl font-bold text-neutral mt-6">
                        {{ $t(information.title) }}
                    </h3>
                    <p class="text-base text-neutral mb-2">
                        {{ $t(information.description) }}
                    </p>
                    <div class="py-6 flex flex-col justify-center items-start gap-10">
                        <!-- Loop through information.info2 to display additional items -->
                        <div
                            v-for="(info, index) in information.info2"
                            :key="index"
                            class="flex justify-center items-start md:items-center gap-4"
                        >
                            <img
                                :src="ligthMode == false ? info.image : info.imageLight"
                                alt="Donate"
                                class="w-10n aspect-square object-contain"
                            />
                            <p
                                class="information-description text-neutral text-base"
                                v-html="info.description"
                            ></p>
                        </div>
                    </div>
                    <div class="flex justify-start items-center gap-8 py-4">
                        <!-- Accept button to proceed to step 2 -->
                        <button
                            class="btn btn-primary hover:bg-primary hover:border-primary text-neutral-content normal-case text-base"
                            @click="nextStep(2)"
                            data-analytics-label="withdrawal:confirm"
                            data-analytics-context="step:info|step-num:2"
                        >
                            {{ $t('Aceptar') }}
                        </button>
                        <!-- Cancel button to return to step 0 -->
                        <button
                            class="btn btn-primary btn-outline hover:border-primary hover:bg-primary hover:text-neutral-content normal-case text-base"
                            @click="nextStep(0)"
                            data-analytics-label="withdrawal:back"
                            data-analytics-context="step:info|step-num:0"
                        >
                            {{ $t('Cancelar') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Content for step 2 -->
            <div
                v-else-if="step == 2"
                class="flex flex-col md:flex-row justify-end items-center w-full h-full min-h-[600px]"
            >
                <!-- Placeholder for mobile view, hidden on medium and larger screens -->
                <div
                    class="h-[90vw] sm:h-[550px] order-2 md:order-1 mt-2 md:hidden"
                ></div>
                <!-- Image container with animation, positioned at the bottom for mobile and top for desktop -->
                <div
                    class="animationLeft absolute bottom-0 md:top-32 left-0 z-20 w-[90%] md:w-[45%] md:max-w-[505px] max-h-[576px] aspect-auto"
                >
                    <img
                        :src="type.image"
                        alt="Donate Image"
                        class="drop-shadow-2xl shadow-neutral-content"
                    />
                </div>
                <!-- Right side container for withdrawal options -->
                <div
                    class="animationRight w-full md:w-[50%] h-full z-50 order-1 md:order-2"
                >
                    <!-- Title for withdrawal type -->
                    <span
                        class="uppercase rounded-full text-sm font-bold text-primary bg-primary-content/25 py-1 px-4 border-[0.28px] border-primary"
                    >{{ $t('Tipo de retiro') }}</span
                    >
                    <h3 class="text-2xl font-bold text-neutral mt-6">
                        {{ $t(type.title) }}
                    </h3>
                    <p class="text-base text-neutral mb-2">
                        {{ $t(type.description) }}
                    </p>
                    <div
                        class="bg-base-300 max-h-[425px] p-6 flex flex-col justify-start items-center gap-5 rounded-lg overflow-y-auto scrollWidth"
                    >
                        <!-- Main container for the withdrawal section, displayed based on the bank account configuration -->
                        <div
                            v-if="
								appComponent.config.retiros.retiroAcountBank == undefined ||
								appComponent.config.retiros.retiroAcountBank[
									appComponent.country
								] == undefined ||
								appComponent.config.retiros.retiroAcountBank[
									appComponent.country
								]
							"
                            class="w-full flex justify-center items-center flex-col gap-2 bg-base-300 rounded-lg px-2 py-4"
                        >
                            <!-- Button to select bank account for withdrawal -->
                            <button
                                @click="
									method = 2;
									accountSelected = '';
									amountWithdraw = parseFloat(
										appComponent.config.retiros.MinWithdrawBank
									);
									getBanksAccounts();
								"
                                class="w-full flex justify-start items-center gap-4"
                                data-analytics-label="withdrawal:method:bank-transfer"
                                data-analytics-position="1"
                                data-analytics-context="step:select-method|step-num:2|method:bank-transfer"
                            >
                                <!-- Radio button for selection -->
                                <div
                                    class="border border-primary rounded-full h-5 w-5 p-1 hover:scale-110 radio-custom"
                                >
                                    <div
                                        class="w-full h-full rounded-full"
                                        :class="method === 2 ? 'bg-primary' : ''"
                                    ></div>
                                </div>
                                <!-- Bank account icon -->
                                <div
                                    class="flex justify-center items-center bg-base-100 rounded-lg p-2 text-accent-focus"
                                >
                                    <div 
                                        v-if="type.bankAccountIcon != undefined && type.bankAccountIcon.includes('<svg')" 
                                        class="w-8 h-8 flex items-center" 
                                        v-html="type.bankAccountIcon">
                                    </div>
                                    <CardIcon v-else class="w-8 h-8"/>
                                </div>
                                <!-- Label for the button -->
                                <span class="font-semibold text-neutral text-lg">{{
                                        $t('Cuenta bancaria')
                                    }}</span>
                            </button>
                            <!-- Container for bank accounts list when method is set to 2 -->
                            <div
                                v-if="method === 2"
                                class="w-full px-6 py-2 flex flex-col justify-center items-center gap-4"
                            >
                                <!-- Placeholder while loading bank accounts -->
                                <div
                                    v-if="loadingBanksAccountslist"
                                    class="w-full flex justify-start items-center"
                                >
                                    <AnimatedPlaceholder
                                        class="w-[178px] h-[113px] bg-base-200 rounded-lg"
                                    />
                                </div>
                                <!-- Display bank accounts if available -->
                                <div
                                    v-else-if="
										!loadingBanksAccountslist && banksAccountsList.length > 0
									"
                                    class="w-full flex gap-2"
                                >
                                    <swiper-container
                                        space-between="10"
                                        slides-per-view="auto"
                                        pagination="true"
                                        direction="horizontal"
                                        mousewheel-force-to-axis="true"
                                        class="w-full md:w-11/12"
                                    >
                                        <swiper-slide
                                            v-for="(acount, index) in banksAccountsList"
                                            :key="index"
                                            class="w-[178px] h-[113px] rounded-lg creditCardSelected"
                                            :class="
												accountSelected.userbank_id == acount.userbank_id
													? 'creditCardSelected'
													: 'creditCard'
											"
                                        >
                                            <!-- Button for selecting a specific bank account -->
                                            <button
                                                @click="accountSelected = acount"
                                                class="w-full h-full flex flex-col justify-between items-center py-8 px-5"
                                            >
                                                <div class="w-full flex justify-between items-start">
                                                    <div class="flex flex-col justify-center items-start">
														<span class="title uppercase">{{
                                                                $t('Nombre')
                                                            }}</span>
                                                        <span
                                                            class="text-xs font-bold text-start text-neutral"
                                                        >{{ acount.bank_name }}</span
                                                        >
                                                    </div>
                                                    <div class="flex flex-col justify-center items-end">
														<span class="title uppercase">{{
                                                                $t('Numero')
                                                            }}</span>
                                                        <span
                                                            class="text-xs font-bold text-end text-neutral"
                                                        >{{ hiddenAccountNumber(acount.account) }}</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="w-full flex justify-between items-start">
                                                    <div class="flex flex-col justify-center items-start">
														<span class="title uppercase">{{
                                                                $t(acount.account_type)
                                                            }}</span>
                                                    </div>
                                                    <div class="flex flex-col justify-center items-end">
														<span class="title uppercase">{{
                                                                $t(acount.coin)
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <!-- Button to add a new bank account -->
                                    <button
                                        @click="
											getBanks();
											onAddAcount = true;
										"
                                        class="hidden md:flex w-16 h-[113px] justify-center items-center hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Message when no bank accounts are available -->
                                <div
                                    v-else-if="
										!loadingBanksAccountslist && banksAccountsList.length < 1
									"
                                    class="w-full flex flex-col justify-center items-center"
                                >
									<span class="text-center w-full my-5 text-neutral">
										{{ $t('No tienes cuentas bancarias') }}
									</span>
                                    <button
                                        @click="
											getBanks();
											onAddAcount = true;
										"
                                        class="hidden md:flex hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Button for mobile view to add a new bank account -->
                                <button
                                    @click="
										getBanks();
										onAddAcount = true;
									"
                                    class="flex md:hidden hover:scale-110"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                                <!-- Container for amount selection when an account is selected -->
                                <div
                                    v-if="accountSelected !== ''"
                                    class="w-full flex flex-col md:flex-row justify-between items-center gap-2"
                                >
                                    <div
                                        class="w-72 bg-base-100 rounded-lg flex justify-center items-center py-2 gap-4"
                                    >
                                        <!-- Button to decrease withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw == 0
													? (amountWithdraw = 0)
													: (amountWithdraw = amountWithdraw - 1);
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M9.6001 12.5924V10.5601H14.2013V12.5924H9.6001Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8805"
                                                        x1="14.2013"
                                                        y1="10.5601"
                                                        x2="9.83491"
                                                        y2="12.9349"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                        <div
                                            class="flex flex-col justify-center items-center gap-1"
                                        >
											<span class="text-neutral text-center w-full">{{
                                                    $t('Valor:')
                                                }}</span>
                                            <div class="flex justify-between items-center gap-1">
												<span class="text-neutral text-xl">{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <input
                                                    type="number"
                                                    :placeholder="$t('valor')"
                                                    class="bg-base-100 text-center text-neutral text-3xl font-black px-0 py-1 border-none rounded-md"
                                                    v-model="amountWithdraw"
                                                    :style="{ width: `${(amountWithdraw?.toString().length || 1) + 2}ch`, maxWidth: '150px' }"
                                                    data-analytics-label="withdrawal:amount-input"
                                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                                />
                                            </div>
                                        </div>
                                        <!-- Button to increase withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw = amountWithdraw + 1;
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M11.2608 15.9594V8.44786H13.3581V15.9594H11.2608ZM8.448 13.1954V11.2118H16.1872V13.1954H8.448Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8801"
                                                        x1="16.1872"
                                                        y1="8.44786"
                                                        x2="7.21987"
                                                        y2="10.6673"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                    </div>
                                    <!-- Quick amount selection buttons -->
                                    <div
                                        class="w-72 md:w-[40%] grid grid-cols-2 grid-rows-2 h-full gap-2 text-base text-neutral-focus lowercase"
                                    >
                                        <button
                                            v-if="
												10 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												10 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 10"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:10"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">10</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												30 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												30 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 30"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:30"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">30</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												50 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												50 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 50"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:50"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">50</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												100 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												100 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 100"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:100"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">100</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												!(
													10 >=
														parseFloat(
															appComponent.config.retiros.MinWithdrawBank
														) &&
													10 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														)
												) ||
												(150 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
													150 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														))
											"
                                            @click="amountWithdraw = 150"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:150"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">150</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												!(
													30 >=
														parseFloat(
															appComponent.config.retiros.MinWithdrawBank
														) &&
													30 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														)
												) ||
												(200 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
													200 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														))
											"
                                            @click="amountWithdraw = 200"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:200"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">200</strong>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- Display minimum and maximum withdrawal limits -->
                            <div
                                v-if="method === 2 && accountSelected !== ''"
                                class="w-full flex justify-center md:justify-start items-center px-6 text-xs md:text-base text-neutral gap-4"
                            >
								<span v-if="appComponent.config.retiros.MinWithdrawBank > 0"
                                >{{ $t('Min: ') }}
									<strong>{{
                                            appComponent.config.retiros.MinWithdrawBank
                                        }}</strong></span
                                >
                                <span
                                    v-if="appComponent.config.retiros.MaxWithdrawBankAccount > 0"
                                >{{ $t('Max: ')
                                    }}<strong>{{
                                            appComponent.config.retiros.MaxWithdrawBankAccount
                                        }}</strong></span
                                >
                            </div>
                        </div>

                        <hr v-if="
								appComponent.config.retiros.retiroAcountBank == undefined ||
								appComponent.config.retiros.retiroAcountBank[
									appComponent.country
								] == undefined ||
								appComponent.config.retiros.retiroAcountBank[
									appComponent.country
								]
							" class="w-full border-gray-500/50" />

                        <!-- Main container for credit card withdrawal section, shown only if credit card configuration is defined -->
                        <div
                            v-if="
							appComponent.config.creditCard !== undefined &&
							appComponent.config.creditCard[appComponent.country] != undefined &&
                            appComponent.config.creditCard[appComponent.country].withdrawActivate !== undefined &&
                            appComponent.config.creditCard[appComponent.country].withdrawActivate
                            "
                            class="w-full flex justify-center items-center flex-col gap-2 bg-base-300 rounded-lg px-2 py-4"
                        >
                            <!-- Button to select credit card withdrawal method -->
                            <button
                                @click="
									method = 3;
									accountSelected = '';
									amountWithdraw = parseFloat(
										appComponent.config.retiros.MinWithdrawBank
									);
									getBanksAccounts();
								"
                                class="w-full flex justify-start items-center gap-4"
                                data-analytics-label="withdrawal:method:credit-card"
                                data-analytics-position="2"
                                data-analytics-context="step:select-method|step-num:2|method:credit-card"
                            >
                                <!-- Radio button for selection -->
                                <div
                                    class="border border-primary rounded-full h-5 w-5 p-1 hover:scale-110 radio-custom"
                                >
                                    <div
                                        class="w-full h-full rounded-full"
                                        :class="method === 3 ? 'bg-primary' : ''"
                                    ></div>
                                </div>
                                <!-- Credit card icon -->
                                <div
                                    class="flex justify-center items-center bg-base-100 rounded-lg p-2 text-accent-focus"
                                >
                                    <div 
                                        v-if="type.creditCardIcon != undefined && type.creditCardIcon.includes('<svg')" 
                                        class="w-8 h-8 flex items-center" 
                                        v-html="type.creditCardIcon">
                                    </div>
                                    <CardIcon v-else class="w-8 h-8"/>
                                </div>
                                <!-- Label for the button -->
                                <span class="font-semibold text-neutral text-lg">{{
                                        $t('Tarjeta de credito')
                                    }}</span>
                            </button>
                            <!-- Container for displaying credit card accounts if method is selected -->
                            <div
                                v-if="method === 3"
                                class="w-full px-6 py-2 flex flex-col justify-center items-center gap-4"
                            >
                                <!-- Placeholder shown while loading bank accounts -->
                                <div
                                    v-if="loadingBanksAccountslist"
                                    class="w-full flex justify-start items-center"
                                >
                                    <AnimatedPlaceholder
                                        class="w-[178px] h-[113px] bg-base-200 rounded-lg"
                                    />
                                </div>
                                <!-- Display credit card accounts if available -->
                                <div
                                    v-else-if="
										!loadingBanksAccountslist && getCreditCard.length > 0
									"
                                    class="w-full flex gap-2"
                                >
                                    <swiper-container
                                        space-between="10"
                                        slides-per-view="auto"
                                        pagination="true"
                                        direction="horizontal"
                                        mousewheel-force-to-axis="true"
                                        class="w-full md:w-11/12"
                                    >
                                        <!-- Loop through each credit card account -->
                                        <swiper-slide
                                            v-for="(account, index) in getCreditCard"
                                            :key="index"
                                            class="w-[178px] h-[113px] rounded-lg"
                                        >
                                            <!-- Button for selecting a specific credit card account -->
                                            <button
                                                @click="accountSelected = account"
                                                class="bg-accent w-[177px] h-[112px] rounded-lg shadow-lg text-neutral relative"
                                                :class="
												accountSelected.account == account.account
													? 'bg-gradient-to-r from-[#48CAFF]/50 to-[#8D61F9]/50'
													: ''
											"
                                            >
                                                <div class="flex flex-col h-full">
                                                    <div
                                                        class="pt-8 flex justify-between items-center text-[10px] text-justify px-4"
                                                    >
                                                        <div class="grid grid-rows-2">
												<span class="text-gray-400">
													{{ $t('Nombre') }}
												</span>
                                                            <span>
													{{
                                                                    appComponent.session
                                                                        .first_name
                                                                }}
												</span>
                                                        </div>
                                                        <div class="grid grid-rows-2">
												<span
                                                    class="text-gray-400 text-end"
                                                >
													{{ $t('Numero') }}
												</span>
                                                            <span>
													{{ account.account }}
												</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex justify-between items-center border-t border-gray-500 w-full py-2 px-4"
                                                    >
                                                        <img
                                                            src="https://images.virtualsoft.tech/m/msj0212T1734655389.png"
                                                            class="w-11 h-8"
                                                        />
                                                        <img
                                                            src="https://images.virtualsoft.tech/m/msj0212T1736948386.png"
                                                            class="w-8 h-4"
                                                        />
                                                    </div>
                                                </div>
                                            </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <!-- Button to register card token, hidden on small screens -->
                                    <button
                                        v-if="
                                            appComponent.config.creditCard !== undefined &&
                                            appComponent.config.creditCard[appComponent.country] != undefined &&
                                            appComponent.config.creditCard[appComponent.country].addButton !== undefined &&
                                            appComponent.config.creditCard[appComponent.country].addButton
                                        "
                                        @click="
											registerCardToken();
										"
                                        class="hidden md:flex w-16 h-[113px] justify-center items-center hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Message if no credit card accounts are available -->
                                <div
                                    v-else-if="
										!loadingBanksAccountslist && getCreditCard.length < 1
									"
                                    class="w-full flex flex-col justify-center items-center"
                                >
									<span class="text-center w-full my-5 text-neutral">
										{{ $t('No tienes tarjetas de creditos') }}
									</span>
                                    <button
                                        @click="
											registerCardToken();
										"
                                        class="hidden md:flex hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Button to add a new account, visible only on small screens -->
                                <button
                                    @click="
										getBanks();
										onAddAcount = true;
									"
                                    class="flex md:hidden hover:scale-110"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                                <!-- Container for withdrawal amount selection if an account is selected -->
                                <div
                                    v-if="accountSelected !== ''"
                                    class="w-full flex flex-col md:flex-row justify-between items-center gap-2"
                                >
                                    <div
                                        class="w-72 bg-base-100 rounded-lg flex justify-center items-center py-2 gap-4"
                                    >
                                        <!-- Button to decrease withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw == 0
													? (amountWithdraw = 0)
													: (amountWithdraw = amountWithdraw - 1);
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                            data-analytics-label="withdrawal:amount-input"
                                            :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M9.6001 12.5924V10.5601H14.2013V12.5924H9.6001Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8805"
                                                        x1="14.2013"
                                                        y1="10.5601"
                                                        x2="9.83491"
                                                        y2="12.9349"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                        <div
                                            class="flex flex-col justify-center items-center gap-1"
                                        >
											<span class="text-neutral text-center w-full">{{
                                                    $t('Valor:')
                                                }}</span>
                                            <div class="flex justify-between items-center gap-1">
												<span class="text-neutral text-xl">{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <input
                                                    type="number"
                                                    :placeholder="$t('valor')"
                                                    class="bg-base-100 text-center text-neutral text-3xl font-black px-0 py-1 border-none rounded-md"
                                                    v-model="amountWithdraw"
                                                    :style="{ width: `${(amountWithdraw?.toString().length || 1) + 2}ch`, maxWidth: '150px' }"
                                                    data-analytics-label="withdrawal:amount-input"
                                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                                />
                                            </div>
                                        </div>
                                        <!-- Button to increase withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw = amountWithdraw + 1;
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M11.2608 15.9594V8.44786H13.3581V15.9594H11.2608ZM8.448 13.1954V11.2118H16.1872V13.1954H8.448Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8801"
                                                        x1="16.1872"
                                                        y1="8.44786"
                                                        x2="7.21987"
                                                        y2="10.6673"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                    </div>
                                    <!-- Predefined withdrawal amount buttons -->
                                    <div
                                        class="w-72 md:w-[40%] grid grid-cols-2 grid-rows-2 h-full gap-2 text-base text-neutral-focus lowercase"
                                    >
                                        <!-- Button for $10 withdrawal -->
                                        <button
                                            v-if="
												10 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												10 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 10"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:10"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">10</strong>
                                            </div>
                                        </button>
                                        <!-- Button for $30 withdrawal -->
                                        <button
                                            v-if="
												30 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												30 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 30"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:30"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">30</strong>
                                            </div>
                                        </button>
                                        <!-- Button for $50 withdrawal -->
                                        <button
                                            v-if="
												50 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												50 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 50"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:50"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">50</strong>
                                            </div>
                                        </button>
                                        <!-- Button for $100 withdrawal -->
                                        <button
                                            v-if="
												100 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
												100 <=
													parseFloat(
														appComponent.config.retiros.MaxWithdrawBankAccount
													)
											"
                                            @click="amountWithdraw = 100"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:100"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">100</strong>
                                            </div>
                                        </button>
                                        <!-- Button for $150 withdrawal -->
                                        <button
                                            v-if="
												!(
													10 >=
														parseFloat(
															appComponent.config.retiros.MinWithdrawBank
														) &&
													10 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														)
												) ||
												(150 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
													150 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														))
											"
                                            @click="amountWithdraw = 150"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:150"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">150</strong>
                                            </div>
                                        </button>
                                        <!-- Button for $200 withdrawal -->
                                        <button
                                            v-if="
												!(
													30 >=
														parseFloat(
															appComponent.config.retiros.MinWithdrawBank
														) &&
													30 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														)
												) ||
												(200 >=
													parseFloat(
														appComponent.config.retiros.MinWithdrawBank
													) &&
													200 <=
														parseFloat(
															appComponent.config.retiros.MaxWithdrawBankAccount
														))
											"
                                            @click="amountWithdraw = 200"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:200"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">200</strong>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <!-- Display minimum and maximum withdrawal limits -->
                                <div
                                    v-if="method === 3 && accountSelected !== ''"
                                    class="w-full flex justify-center md:justify-start items-center px-6 text-xs md:text-base text-neutral gap-4"
                                >
								<span v-if="appComponent.config.retiros.MinWithdrawBank > 0"
                                >{{ $t('Min: ') }}
									<strong>{{
                                            appComponent.config.retiros.MinWithdrawBank
                                        }}</strong></span
                                >
                                    <span
                                        v-if="appComponent.config.retiros.MaxWithdrawBankAccount > 0"
                                    >{{ $t('Max: ')
                                        }}<strong>{{
                                                appComponent.config.retiros.MaxWithdrawBankAccount
                                            }}</strong></span
                                    >
                                </div>
                            </div>
                        </div>

                        <hr  v-if="
							appComponent.config.creditCard !== undefined &&
							appComponent.config.creditCard.withdrawActivate !== undefined" class="w-full border-gray-500/50" />

                        <!-- Conditional rendering based on withdrawal configuration -->
                        <div
                            v-if="
                                appComponent.config.retiros.retiroLocal == undefined ||
                                appComponent.config.retiros.retiroLocal[appComponent.country] ==
                                    undefined ||
                                appComponent.config.retiros.retiroLocal[appComponent.country]
                            "
                            class="w-full flex justify-center items-center flex-col gap-6 bg-base-300 rounded-lg px-2 py-4"
                        >
                            <!-- Button for selecting local withdrawal method -->
                            <button
                                @click="
                                    method = 1;
                                    accountSelected = '';
                                    amountWithdraw = parseFloat(
                                        appComponent.config.retiros.MinWithdraw
                                    );
                                "
                                class="w-full flex justify-start items-center gap-4"
                            >
                                <div
                                    class="border border-primary rounded-full h-5 w-5 p-1 hover:scale-110 radio-custom"
                                >
                                    <div
                                        class="w-full h-full rounded-full"
                                        :class="method === 1 ? 'bg-primary' : ''"
                                    ></div>
                                </div>
                                <div
                                    class="flex justify-center items-center bg-base-100 rounded-lg p-2 text-accent-focus"
                                >
                                    <div 
                                        v-if="type.imgLocal !== undefined && type.imgLocal.includes('<svg')" 
                                        class="w-8 h-8 flex items-center" 
                                        v-html="type.imgLocal">
                                    </div>
                                    <CardIcon v-else class="w-8 h-8"/>
                                </div>
                                <span class="font-semibold text-neutral text-lg">{{
                                        $t('Local Doradobet')
                                    }}</span>
                            </button>
                            <!-- Conditional rendering for amount selection when method is local -->
                            <div
                                v-if="method === 1"
                                class="w-full px-6 py-2 flex flex-col md:flex-row justify-around items-center gap-2"
                            >
                                <div
                                    class="w-72 bg-base-100 rounded-lg flex justify-center items-center py-2 gap-4"
                                >
                                    <!-- Button to decrease withdrawal amount -->
                                    <button
                                        @click="
                                            amountWithdraw == 0
                                                ? (amountWithdraw = 0)
                                                : (amountWithdraw = amountWithdraw - 1);
                                            handleAmoutWithdraw(amountWithdraw);
                                        "
                                        class="hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            class="fill-neutral"
                                        >
                                            <ellipse
                                                cx="11.812"
                                                cy="11.8121"
                                                rx="11.812"
                                                ry="11.8121"
                                                class="fill-base-200"
                                            />
                                            <path
                                                d="M9.6001 12.5924V10.5601H14.2013V12.5924H9.6001Z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_789_8805"
                                                    x1="14.2013"
                                                    y1="10.5601"
                                                    x2="9.83491"
                                                    y2="12.9349"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#E8BD70" />
                                                    <stop offset="1" stop-color="#EDD185" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                    <div class="flex flex-col justify-center items-center gap-1">
                                <span class="text-neutral text-center w-full">{{
                                        $t('Valor:')
                                    }}</span>
                                        <div class="flex justify-between items-center gap-1">
                                    <span class="text-neutral text-xl">{{
                                            appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$'
                                        }}</span>
                                            <input
                                                type="number"
                                                :placeholder="$t('valor')"
                                                class="bg-base-100 text-center text-neutral text-3xl font-black px-0 py-1 border-none rounded-md"
                                                v-model="amountWithdraw"
                                                :style="{ width: `${(amountWithdraw?.toString().length || 1) + 2}ch`, maxWidth: '150px' }"
                                                data-analytics-label="withdrawal:amount-input"
                                                :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                            />
                                        </div>
                                    </div>
                                    <!-- Button to increase withdrawal amount -->
                                    <button
                                        @click="
                                            amountWithdraw = amountWithdraw + 1;
                                            handleAmoutWithdraw(amountWithdraw);
                                        "
                                        class="hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            class="fill-neutral"
                                        >
                                            <ellipse
                                                cx="11.812"
                                                cy="11.8121"
                                                rx="11.812"
                                                ry="11.8121"
                                                class="fill-base-200"
                                            />
                                            <path
                                                d="M11.2608 15.9594V8.44786H13.3581V15.9594H11.2608ZM8.448 13.1954V11.2118H16.1872V13.1954H8.448Z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_789_8801"
                                                    x1="16.1872"
                                                    y1="8.44786"
                                                    x2="7.21987"
                                                    y2="10.6673"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#E8BD70" />
                                                    <stop offset="1" stop-color="#EDD185" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    class="w-72 md:w-[40%] grid grid-cols-2 grid-rows-2 h-full gap-2 text-base text-neutral-focus lowercase"
                                >
                                    <!-- Predefined withdrawal amount buttons -->
                                    <button
                                        v-if="
                                            parseInt(appComponent.config.retiros.MinWithdraw) <= 10 &&
                                            parseInt(appComponent.config.retiros.MaxWithdraw) >= 10
                                        "
                                        @click="amountWithdraw = 10"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:10"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                    <span>{{
                                            appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$'
                                        }}</span>
                                            <strong class="text-xl font-semibold">10</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                            parseInt(appComponent.config.retiros.MinWithdraw) <= 30 &&
                                            parseInt(appComponent.config.retiros.MaxWithdraw) >= 30
                                        "
                                        @click="amountWithdraw = 30"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:30"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                    <span>{{
                                            appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$'
                                        }}</span>
                                            <strong class="text-xl font-semibold">30</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                            parseInt(appComponent.config.retiros.MinWithdraw) <= 50 &&
                                            parseInt(appComponent.config.retiros.MaxWithdraw) >= 50
                                        "
                                        @click="amountWithdraw = 50"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:50"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                    <span>{{
                                            appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$'
                                        }}</span>
                                            <strong class="text-xl font-semibold">50</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                            parseInt(appComponent.config.retiros.MinWithdraw) <=
                                                100 &&
                                            parseInt(appComponent.config.retiros.MaxWithdraw) >= 100
                                        "
                                        @click="amountWithdraw = 100"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:100"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                    <span>{{
                                            appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$'
                                        }}</span
                                    ><strong class="text-xl font-semibold">100</strong>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div
                                v-if="method === 1"
                                class="w-full flex justify-center md:justify-start items-center px-8 text-xs md:text-base text-neutral gap-4 -mt-4"
                            >
                        <span v-if="appComponent.config.retiros.MinWithdraw > 0"
                        >{{ $t('Min: ') }}
                            <strong>{{
                                    appComponent.config.retiros.MinWithdraw
                                }}</strong></span
                        >
                                <span v-if="appComponent.config.retiros.MaxWithdraw > 0"
                                >{{ $t('Max: ')
                                    }}<strong>{{
                                            appComponent.config.retiros.MaxWithdraw
                                        }}</strong></span
                                >
                            </div>
                        </div>

                        <hr v-if="
                                appComponent.config.retiros.retiroLocal == undefined ||
                                appComponent.config.retiros.retiroLocal[appComponent.country] ==
                                    undefined ||
                                appComponent.config.retiros.retiroLocal[appComponent.country]
                            " class="w-full border-gray-500/50" />

                        <!-- Conditional rendering based on withdrawal configuration -->
                        <div
                            v-if="
                                appComponent.config.retiros.walletCrypto != undefined &&appComponent.config.retiros.walletCrypto[appComponent.country] != undefined &&
                                appComponent.config.retiros.walletCrypto[appComponent.country]
                            "
                            class="w-full flex justify-center items-center flex-col gap-2 bg-base-300 rounded-lg px-2 py-4"
                        >
                            <!-- Button to select bank account for withdrawal -->
                            <button
                                @click="
									method = 10;
									accountSelected = '';
									amountWithdraw = parseFloat(
										appComponent.config.retiros.MinCrypto
									);
									getWalletsWithdraw();
								"
                                class="w-full flex justify-start items-center gap-4"
                            >
                                <!-- Radio button for selection -->
                                <div
                                    class="border border-primary rounded-full h-5 w-5 p-1 hover:scale-110 radio-custom"
                                >
                                    <div
                                        class="w-full h-full rounded-full"
                                        :class="method === 10 ? 'bg-primary' : ''"
                                    ></div>
                                </div>
                                <!-- Bank account icon -->
                                <div
                                    class="flex justify-center items-center bg-base-100 rounded-lg p-2 text-accent-focus"
                                >
                                    <div 
                                        v-if="type.cryptoIcon != undefined && type.cryptoIcon.includes('<svg')" 
                                        class="w-8 h-8 flex items-center" 
                                        v-html="type.cryptoIcon">
                                    </div>
                                    <CardIcon v-else class="w-8 h-8"/>
                                </div>
                                <span class="font-semibold text-neutral text-lg">{{
                                        $t('Criptomonedas')
                                    }}</span>
                            </button>
                            <!-- Container for bank accounts list when method is set to 2 -->
                            <div
                                v-if="method === 10"
                                class="w-full px-6 py-2 flex flex-col justify-center items-center gap-4"
                            >
                                <!-- Placeholder while loading bank accounts -->
                                 <div
                                    v-if="loadingBanksAccountslist"
                                    class="w-full flex justify-start items-center"
                                >
                                    <AnimatedPlaceholder
                                        class="w-[178px] h-[113px] bg-base-200 rounded-lg"
                                    />
                                </div>
                                <!-- Display bank accounts if available -->
                                <div
                                    v-if="
                                        !loadingBanksAccountslist && listCrypto.length > 0
									"
                                    class="w-full flex gap-2"
                                >
                                    <swiper-container
                                        space-between="10"
                                        slides-per-view="auto"
                                        pagination="true"
                                        direction="horizontal"
                                        mousewheel-force-to-axis="true"
                                        class="w-full md:w-11/12"
                                    >
                                        <swiper-slide
                                            v-for="(acount, index) in listCrypto"
                                            :key="index"
                                            class="w-[178px] h-[113px] rounded-lg creditCardSelected"
                                            :class="
												accountSelected.id == acount.id
													? 'creditCardSelected'
													: 'creditCard'
											"
                                        >
                                            <!-- Button for selecting a specific bank account -->
                                            <button
                                                @click="accountSelected = acount"
                                                class="w-full h-full flex flex-col justify-between items-center py-8 px-5"
                                            >
                                                <div class="w-full flex justify-between items-start">
                                                    <div class="flex flex-col justify-center items-start">
                                                        <span class="title uppercase">{{
                                                                $t('Id: ')
                                                            }}<span
                                                            class="text-xs font-bold text-end text-neutral"
                                                        >{{ acount.value }}</span
                                                        ></span>
														<span class="title uppercase">{{
                                                                $t('Wallet')
                                                            }}</span>
                                                        <span
                                                            class="text-xs font-bold text-start text-neutral"
                                                        >{{ acount.name }}</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="w-full flex justify-between items-start">
                                                    <div class="flex flex-col justify-center items-start">
														<span class="title uppercase">{{
                                                                $t('Criptomoneda')
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <!-- Button to add a new bank account -->
                                    <RouterLink
                                        to="/gestion/walletcrypto"
                                        class="hidden md:flex w-16 h-[113px] justify-center items-center hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </RouterLink>
                                </div>
                                <!-- Message when no bank accounts are available -->
                                <div
                                    v-else-if="
                                         !loadingBanksAccountslist && listCrypto.length < 1
									"
                                    class="w-full flex flex-col justify-center items-center"
                                >
									<span class="text-center w-full my-5 text-neutral">
										{{ $t('No tienes wallets activas registradas para realizar retiros. Agrega una desde tu perfil') }}
									</span>
                                    <RouterLink
                                        to="/gestion/walletcrypto"
                                        class="hidden md:flex w-16 h-[113px] justify-center items-center hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 32 32"
                                            class="fill-neutral"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                                class="fill-neutral"
                                            />
                                        </svg>
                                    </RouterLink>
                                </div>
                                <!-- Button for mobile view to add a new bank account -->
                                <RouterLink
                                    to="/gestion/walletcrypto"
                                    class="flex md:hidden hover:scale-110"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.2665 16C20.2665 16.5888 19.7887 17.0666 19.1999 17.0666H17.0665V19.2C17.0665 19.7888 16.5887 20.2666 15.9999 20.2666C15.4111 20.2666 14.9332 19.7888 14.9332 19.2V17.0666H12.7999C12.2111 17.0666 11.7332 16.5888 11.7332 16C11.7332 15.4112 12.2111 14.9333 12.7999 14.9333H14.9332V12.8C14.9332 12.2112 15.4111 11.7333 15.9999 11.7333C16.5887 11.7333 17.0665 12.2112 17.0665 12.8V14.9333H19.1999C19.7887 14.9333 20.2665 15.4112 20.2665 16ZM16.0001 24.5333C11.2951 24.5333 7.4668 20.705 7.4668 15.9999C7.4668 11.2949 11.2951 7.4666 16.0001 7.4666C20.7052 7.4666 24.5335 11.2949 24.5335 15.9999C24.5335 20.705 20.7052 24.5333 16.0001 24.5333ZM15.9997 5.33325C10.1085 5.33325 5.33301 10.1087 5.33301 15.9999C5.33301 21.8911 10.1085 26.6666 15.9997 26.6666C21.8909 26.6666 26.6663 21.8911 26.6663 15.9999C26.6663 10.1087 21.8909 5.33325 15.9997 5.33325Z"
                                            fill="white"
                                        />
                                    </svg>
                                </RouterLink>
                                <!-- Container for amount selection when an account is selected -->
                                <div
                                    v-if="accountSelected !== ''"
                                    class="w-full flex flex-col md:flex-row justify-between items-center gap-2"
                                >
                                    <div
                                        class="w-72 bg-base-100 rounded-lg flex justify-center items-center py-2 gap-4"
                                    >
                                        <!-- Button to decrease withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw == 0
													? (amountWithdraw = 0)
													: (amountWithdraw = amountWithdraw - 1);
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M9.6001 12.5924V10.5601H14.2013V12.5924H9.6001Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8805"
                                                        x1="14.2013"
                                                        y1="10.5601"
                                                        x2="9.83491"
                                                        y2="12.9349"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                        <div
                                            class="flex flex-col justify-center items-center gap-1"
                                        >
											<span class="text-neutral text-center w-full">{{
                                                    $t('Valor:')
                                                }}</span>
                                            <div class="flex justify-between items-center gap-1">
												<span class="text-neutral text-xl">{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <input
                                                    type="number"
                                                    :placeholder="$t('valor')"
                                                    class="bg-base-100 text-center text-neutral text-3xl font-black px-0 py-1 border-none rounded-md"
                                                    v-model="amountWithdraw"
                                                    :style="{ width: `${(amountWithdraw?.toString().length || 1) + 2}ch`, maxWidth: '150px' }"
                                                    data-analytics-label="withdrawal:amount-input"
                                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                                />
                                            </div>
                                        </div>
                                        <!-- Button to increase withdrawal amount -->
                                        <button
                                            @click="
												amountWithdraw = amountWithdraw + 1;
												handleAmoutWithdraw(amountWithdraw);
											"
                                            class="hover:scale-110"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="fill-neutral"
                                            >
                                                <ellipse
                                                    cx="11.812"
                                                    cy="11.8121"
                                                    rx="11.812"
                                                    ry="11.8121"
                                                    class="fill-base-200"
                                                />
                                                <path
                                                    d="M11.2608 15.9594V8.44786H13.3581V15.9594H11.2608ZM8.448 13.1954V11.2118H16.1872V13.1954H8.448Z"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_789_8801"
                                                        x1="16.1872"
                                                        y1="8.44786"
                                                        x2="7.21987"
                                                        y2="10.6673"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stop-color="#E8BD70" />
                                                        <stop offset="1" stop-color="#EDD185" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </button>
                                    </div>
                                    <!-- Quick amount selection buttons -->
                                    <div
                                        class="w-72 md:w-[40%] grid grid-cols-2 grid-rows-2 h-full gap-2 text-base text-neutral-focus lowercase"
                                    >
                                        <button
                                            v-if="
												10 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
												10 <=
													parseFloat(
														appComponent.config.retiros.MaxCrypto
													)
											"
                                            @click="amountWithdraw = 10"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:10"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">10</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												30 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
												30 <=
													parseFloat(
														appComponent.config.retiros.MaxCrypto
													)
											"
                                            @click="amountWithdraw = 30"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:30"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">30</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												50 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
												50 <=
													parseFloat(
														appComponent.config.retiros.MaxCrypto
													)
											"
                                            @click="amountWithdraw = 50"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:50"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">50</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												100 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
												100 <=
													parseFloat(
														appComponent.config.retiros.MaxCrypto
													)
											"
                                            @click="amountWithdraw = 100"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:100"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">100</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												!(
													10 >=
														parseFloat(
															appComponent.config.retiros.MinCrypto
														) &&
													10 <=
														parseFloat(
															appComponent.config.retiros.MaxCrypto
														)
												) ||
												(150 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
													150 <=
														parseFloat(
															appComponent.config.retiros.MaxCrypto
														))
											"
                                            @click="amountWithdraw = 150"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:150"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">150</strong>
                                            </div>
                                        </button>
                                        <button
                                            v-if="
												!(
													30 >=
														parseFloat(
															appComponent.config.retiros.MinCrypto
														) &&
													30 <=
														parseFloat(
															appComponent.config.retiros.MaxCrypto
														)
												) ||
												(200 >=
													parseFloat(
														appComponent.config.retiros.MinCrypto
													) &&
													200 <=
														parseFloat(
															appComponent.config.retiros.MaxCrypto
														))
											"
                                            @click="amountWithdraw = 200"
                                            class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                            data-analytics-label="withdrawal:amount-preset:200"
                                            data-analytics-context="step:enter-amount|step-num:2"
                                        >
                                            <div class="flex justify-center items-center gap-1">
												<span>{{
                                                        appComponent.session.simbolo_moneda != null &&
                                                        appComponent.session.simbolo_moneda != undefined
                                                            ? appComponent.session.simbolo_moneda
                                                            : '$'
                                                    }}</span>
                                                <strong class="text-xl font-semibold">200</strong>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- Display minimum and maximum withdrawal limits -->
                            <div
                                v-if="method === 10 && accountSelected !== ''"
                                class="w-full flex justify-center md:justify-start items-center px-6 text-xs md:text-base text-neutral gap-4"
                            >
								<span v-if="appComponent.config.retiros.MinCrypto > 0"
                                >{{ $t('Min: ') }}
									<strong>{{
                                            appComponent.config.retiros.MinCrypto
                                        }}</strong></span
                                >
                                <span
                                    v-if="appComponent.config.retiros.MaxCrypto > 0"
                                >{{ $t('Max: ')
                                    }}<strong>{{
                                            appComponent.config.retiros.MaxCrypto
                                        }}</strong></span
                                >
                            </div>
                        </div>

                        <hr v-if="
                                appComponent.config.retiros.walletCrypto != undefined &&appComponent.config.retiros.walletCrypto[appComponent.country] != undefined &&
                                appComponent.config.retiros.walletCrypto[appComponent.country]
                            " class="w-full border-gray-500/50" />

                        <!-- Placeholder for loading state -->
                        <AnimatedPlaceholder
                            v-if="loadingProductsWithdrawlist"
                            class="w-full h-14 bg-base-200 rounded-lg"
                        />
                        <!-- List of withdrawal products -->
                        <div
                            v-if="productsWithdrawlist.length > 0 && !loadingProductsWithdrawlist"
                            v-for="(item, index) in productsWithdrawlist"
                            :key="index"
                            class="w-full flex justify-center items-center flex-col gap-2 bg-base-300 rounded-lg px-2 py-4"
                        >
                            <!-- Button for selecting a withdrawal product -->
                            <button
                                @click="
                                        method = item.value;
                                        accountSelected = item;
                                        amountWithdraw = item.min ? parseFloat(item.min) : 10;
                                    "
                                    class="w-full flex justify-start items-center gap-4"
                                >
                                    <div
                                        class="border border-primary rounded-full h-5 w-5 p-1 hover:scale-110 radio-custom"
                                    >
                                        <div
                                            class="w-full h-full rounded-full"
                                            :class="method === item.value ? 'bg-primary' : ''"
                                        ></div>
                                    </div>
                                    <div
                                        class="flex justify-center items-center bg-base-100 rounded-lg p-2 text-accent-focus"
                                    >
                                        <CardIcon class="w-8 h-8"/>
                                </div>
                                <div class="w-[80%] flex justify-between items-center">
                                <span class="font-semibold text-neutral text-lg">{{
                                        $t(item.name)
                                    }}</span>
                                </div>
                            </button>
                            <div
                                v-if="method === item.value"
                                class="w-full px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-2"
                            >
                                <div
                                    class="w-72 bg-base-100 rounded-lg flex justify-center items-center py-2 gap-4"
                                >
                                    <!-- Button to decrease withdrawal amount -->
                                    <button
                                        @click="
                                                amountWithdraw == 0
                                                    ? (amountWithdraw = 0)
                                                    : (amountWithdraw = amountWithdraw - 1);
                                                handleAmoutWithdraw(amountWithdraw);
                                            "
                                        class="hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            class="fill-neutral"
                                        >
                                            <ellipse
                                                cx="11.812"
                                                cy="11.8121"
                                                rx="11.812"
                                                ry="11.8121"
                                                class="fill-base-200"
                                            />
                                            <path
                                                d="M9.6001 12.5924V10.5601H14.2013V12.5924H9.6001Z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_789_8805"
                                                    x1="14.2013"
                                                    y1="10.5601"
                                                    x2="9.83491"
                                                    y2="12.9349"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#E8BD70" />
                                                    <stop offset="1" stop-color="#EDD185" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                    <div
                                        class="flex flex-col justify-center items-center gap-1"
                                    >
                                    <span class="text-neutral text-center w-full">{{
                                            $t('Valor:')
                                        }}</span>
                                        <div class="flex justify-between items-center gap-1">
                                        <span class="text-neutral text-xl">{{
                                                appComponent.session.simbolo_moneda != null &&
                                                appComponent.session.simbolo_moneda != undefined
                                                    ? appComponent.session.simbolo_moneda
                                                    : '$'
                                            }}</span>
                                            <input
                                                type="number"
                                                :placeholder="$t('valor')"
                                                class="bg-base-100 text-center text-neutral text-3xl font-black px-0 py-1 border-none rounded-md"
                                                v-model="amountWithdraw"
                                                :style="{ width: `${(amountWithdraw?.toString().length || 1) + 2}ch`, maxWidth: '150px' }"
                                                data-analytics-label="withdrawal:amount-input"
                                                :data-analytics-context="`step:enter-amount|step-num:2|method:${method === 3 ? 'credit-card' : 'bank-transfer'}`"
                                            />
                                        </div>
                                    </div>
                                    <!-- Button to increase withdrawal amount -->
                                    <button
                                        @click="
                                                amountWithdraw = amountWithdraw + 1;
                                                handleAmoutWithdraw(amountWithdraw);
                                            "
                                        class="hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            class="fill-neutral"
                                        >
                                            <ellipse
                                                cx="11.812"
                                                cy="11.8121"
                                                rx="11.812"
                                                ry="11.8121"
                                                class="fill-base-200"
                                            />
                                            <path
                                                d="M11.2608 15.9594V8.44786H13.3581V15.9594H11.2608ZM8.448 13.1954V11.2118H16.1872V13.1954H8.448Z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_789_8801"
                                                    x1="16.1872"
                                                    y1="8.44786"
                                                    x2="7.21987"
                                                    y2="10.6673"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#E8BD70" />
                                                    <stop offset="1" stop-color="#EDD185" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    class="w-72 md:w-[40%] grid grid-cols-2 grid-rows-2 h-full gap-2 text-base text-neutral-focus lowercase"
                                >
                                    <!-- Predefined withdrawal amount buttons for selected product -->
                                    <button
                                        v-if="
                                                parseInt(
                                                    accountSelected.min ? accountSelected.min : '10'
                                                ) <= 10 &&
                                                parseInt(
                                                    accountSelected.max ? accountSelected.max : '99999999'
                                                ) >= 10
                                            "
                                        @click="amountWithdraw = 10"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:10"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                        <span>{{
                                                appComponent.session.simbolo_moneda != null &&
                                                appComponent.session.simbolo_moneda != undefined
                                                    ? appComponent.session.simbolo_moneda
                                                    : '$'
                                            }}</span>
                                            <strong class="text-xl font-semibold">10</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                                parseInt(
                                                    accountSelected.min ? accountSelected.min : '10'
                                                ) <= 30 &&
                                                parseInt(
                                                    accountSelected.max ? accountSelected.max : '99999999'
                                                ) >= 30
                                            "
                                        @click="amountWithdraw = 30"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:30"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                        <span>{{
                                                appComponent.session.simbolo_moneda != null &&
                                                appComponent.session.simbolo_moneda != undefined
                                                    ? appComponent.session.simbolo_moneda
                                                    : '$'
                                            }}</span>
                                            <strong class="text-xl font-semibold">30</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                                parseInt(
                                                    accountSelected.min ? accountSelected.min : '10'
                                                ) <= 50 &&
                                                parseInt(
                                                    accountSelected.max ? accountSelected.max : '99999999'
                                                ) >= 50
                                            "
                                        @click="amountWithdraw = 50"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:50"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                        <span>{{
                                                appComponent.session.simbolo_moneda != null &&
                                                appComponent.session.simbolo_moneda != undefined
                                                    ? appComponent.session.simbolo_moneda
                                                    : '$'
                                            }}</span>
                                            <strong class="text-xl font-semibold">50</strong>
                                        </div>
                                    </button>
                                    <button
                                        v-if="
                                                parseInt(
                                                    accountSelected.min ? accountSelected.min : '10'
                                                ) <= 100 &&
                                                parseInt(
                                                    accountSelected.max ? accountSelected.max : '99999999'
                                                ) >= 100
                                            "
                                        @click="amountWithdraw = 100"
                                        class="bg-base-100 hover:bg-base-100/50 flex justify-center items-center rounded-full px-2 py-1 hover:scale-110 text-neutral"
                                        data-analytics-label="withdrawal:amount-preset:100"
                                        data-analytics-context="step:enter-amount|step-num:2"
                                    >
                                        <div class="flex justify-center items-center gap-1">
                                        <span>{{
                                                appComponent.session.simbolo_moneda != null &&
                                                appComponent.session.simbolo_moneda != undefined
                                                    ? appComponent.session.simbolo_moneda
                                                    : '$'
                                            }}</span>
                                            <strong class="text-xl font-semibold">100</strong>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div
                                v-if="method === item.value"
                                class="w-full flex justify-center md:justify-start items-center px-6 text-xs md:text-base text-neutral gap-4"
                            >
                            <span v-if="item.min && item.min != ''"
                            >{{ $t('Min: ') }} <strong>{{ item.min }}</strong></span
                            >
                                <span v-if="item.max && item.max != ''"
                                >{{ $t('Max: ') }}<strong>{{ item.max }}</strong></span
                                >
                            </div>
                            <hr
                                v-if="index + 1 !== productsWithdrawlist.length"
                                class="w-full border-gray-500/50"
                            />
                        </div>
                    </div>
                    <div class="flex justify-start items-center pt-8 pb-8 md:pb-16 gap-6">
                        <!-- Button to proceed to the next step -->
                        <button
                            v-if="method != 0"
                            class="btn btn-primary text-neutral-content normal-case text-base"
                            @click="nextStep(3)"
                        >
                            {{ $t('Continuar') }}
                        </button>
                        <!-- Button to cancel the operation -->
                        <button
                            class="btn btn-primary hover:bg-primary hover:border-primary hover:text-neutral-content normal-case text-base"
                            :class="method != 0 ? 'btn-outline hover:bg-primary hover:border-primary' : 'text-neutral-content'"
                            @click="
                                nextStep(0);
                                method = 0;
                            "
                            data-analytics-label="withdrawal:back"
                            data-analytics-context="step:info|step-num:1"
                        >
                            {{ $t('Cancelar') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Content for step 3 -->
            <div
                v-if="step == 3"
                class="flex flex-col lg:flex-row justify-between items-center w-full h-full pb-0 md:pb-20"
            >
                <div
                    class="w-full lg:w-[60%] h-full z-50 flex flex-col justify-center items-start gap-12"
                >
                <span
                    class="hidden md:flex uppercase rounded-full text-sm font-bold text-primary bg-primary-content/25 py-1 px-4 border-[0.28px] border-primary"
                >{{ $t('Detalle') }}</span
                >
                    <div
                        class="animationLeft w-full h-full md:h-[440px] flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <div class="relative w-full md:w-1/2 h-full">
                            <AnimatedPlaceholder
                                v-if="loadingWithdrawSubmit"
                                class="w-full h-full"
                            />
                            <div
                                v-else
                                class="bg-base-300 w-full h-full rounded-t-xl pt-10 pb-8 px-8 flex flex-col justify-between items-center gap-2 text-neutral text-center"
                            >
                                <div
                                    class="shadow-lg mx-auto rounded-full bg-base-200 -mt-16 shadow-neutral-content/25 flex justify-center items-center"
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
                                            <circle cx="35" cy="35" r="28" fill="none" />
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
                                                <feComposite in2="hardAlpha" operator="out" />
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
                                                <feComposite in2="hardAlpha" operator="out" />
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
                                <h3 class="font-bold text-2xl">
                                    {{ $t('Solicitud exitosa') }}
                                </h3>
                                <p class="font-light text-neutral-focus">
                                    {{
                                        $t('Tu solicitud de retiro se ha registrado exitosamente')
                                    }}
                                </p>
                                <hr class="w-full border border-primary my-2" />
                                <div
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                <span class="text-start text-neutral-focus">{{
                                        $t('Valor')
                                    }}</span>
                                    <span class="font-bold text-end">{{
                                            (appComponent.session.simbolo_moneda != null &&
                                            appComponent.session.simbolo_moneda != undefined
                                                ? appComponent.session.simbolo_moneda
                                                : '$') +
                                            ' ' +
                                            withdrawCupon.amount
                                        }}</span>
                                </div>
                                <div
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                <span class="text-start text-neutral-focus">{{
                                        $t('Referencia')
                                    }}</span>
                                    <span class="font-bold text-end">{{
                                            withdrawCupon.withdrawId
                                        }}</span>
                                </div>
                                <div
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                <span class="text-start text-neutral-focus">{{
                                        $t('Clave')
                                    }}</span>
                                    <span class="font-bold text-end">{{
                                            withdrawCupon.key
                                        }}</span>
                                </div>
                                <div
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                <span class="text-start text-neutral-focus">{{
                                        $t('Cuenta')
                                    }}</span>
                                    <span class="font-bold text-end">{{
                                            withdrawCupon.account
                                        }}</span>
                                </div>
                                <div
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                <span class="text-start text-neutral-focus">{{
                                        $t('Fecha y hora')
                                    }}</span>
                                    <span class="font-bold text-end">{{
                                            withdrawCupon.date
                                        }}</span>
                                </div>
                                <div
                                    v-if="withdrawCupon.type"
                                    class="flex justify-between items-center w-full text-base font-light"
                                >
                                    <span class="text-start text-neutral-focus">{{ $t('Tipo') }}</span>
                                    <span class="font-bold text-end">{{$t(withdrawCupon.type)}}</span>
                                </div>
                                <hr class="w-full border border-primary my-2" />
                                <button
                                    v-if="base64 != ''"
                                    @click="showModalPrint = true"
                                    class="btn btn-link btn-primary hover:scale-110"
                                >
                                    {{ $t('Descarga tu ticket') }}
                                </button>
                            </div>
                            <div
                                class="dotted-border border-base-200 w-full absolute -bottom-3 left-0"
                            ></div>
                            <button
                                @click="nextStep(0)"
                                class="hidden md:flex btn btn-link btn-primary hover:scale-110 normal-case text-base mt-3 -ml-3"
                                data-analytics-label="withdrawal:back"
                                data-analytics-context="step:info|step-num:1"
                            >
                                {{ $t('Volver a retiro') }}
                            </button>
                        </div>
                        <div
                            class="h-full w-full md:w-1/2 flex flex-col justify-start items-center gap-4"
                        >
                            <div
                                class="bg-base-300 rounded-xl w-full h-full flex justify-center items-center p-8"
                            >
                                <AnimatedPlaceholder
                                    v-if="loadingWithdrawSubmit"
                                    class="w-full h-20 bg-base-200 rounded-xl"
                                />
                                <h4
                                    v-else
                                    class="font-semibold text-neutral text-4xl text-center"
                                >
                                    {{ 'ID ' + withdrawCupon.withdrawId }}
                                </h4>
                            </div>
                            <div
                                class="bg-base-300 rounded-xl w-full h-full flex justify-center items-center p-8"
                            >
                                <p
                                    class="detail-message text-neutral-focus font-light text-base text-justify"
                                    v-html="detail.message"
                                ></p>
                            </div>
                            <div class="w-full flex justify-center items-center gap-4 py-4">
                                <!-- Button to cancel withdrawal -->
                                <button
                                    @click="
										handleCancelWithdrawal({ id: withdrawCupon.withdrawId })
									"
                                    class="w-[48%] btn btn-primary hover:bg-primary hover:border-primary text-neutral-content capitalize text-base"
                                >
                                    {{ $t('Anular retiro') }}
                                </button>
                                <!-- Button to navigate to new casino -->
                                <RouterLink
                                    to="/new-casino"
                                    v-bind="analyticsAttrs('menu:nav:casino')"
                                    class="w-[48%] btn hover:bg-primary border-primary btn-outline hover:border-primary text-primary hover:text-neutral capitalize text-base"
                                >
                                    {{ $t('Seguir jugando') }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-[450px] w-full md:w-auto"></div>
                <img
                    :src="detail.image"
                    alt="Donate Image"
                    class="animationRight absolute bottom-0 right-0 h-full w-full max-h-[450px] max-w-[436px] aspect-auto z-20 drop-shadow-2xl shadow-neutral-content"
                />
            </div>
        </div>
	</section>

    <!-- Modal for printing -->
    <Teleport to="body">
        <dialog
            v-if="showModalPrint"
            class="modal in w-screen h-screen bg-neutral-content/60"
        >
            <div
                class="relative rounded-box w-[90%] h-[90%] lg:max-w-[70%] overflow-hidden text-neutral pb-8"
            >
                <button
                    class="absolute right-6 top-5 hover:scale-125 text-neutral"
                    @click="showModalPrint = false"
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
                <h3 class="w-full p-4 bg-base-200 text-xl font-bold text-neutral">
                    {{ $t('Descargar') }}
                </h3>
                <div
                    class="bg-base-200 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box z-[1000] pb-10 h-full"
                >
                    <embed
                        :src="base64"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </dialog>
    </Teleport>
    <!-- Modal for adding a bank account -->
    <Teleport to="body">
        <dialog
            v-if="onAddAcount"
            class="modal in w-screen h-screen bg-black/90 z-[999]"
        >
            <section
                class="relative bg-base-200 w-full max-w-[840px] max-h-[85vh] h-auto lg:h-[85%] lg:max-h-[860px] rounded-box flex justify-start items-center flex-col"
            >
                <h3
                    class="w-full p-4 bg-base-200 text-xl font-bold text-neutral rounded-t-box"
                >
                    {{ $t('Agregar cuenta bancaria') }}
                </h3>
                <button
                    class="absolute right-6 top-5 hover:scale-125 text-neutral"
                    @click="
						onAddAcount = false;
						onReset();
					"
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
                <div class="h-full w-full overflow-y-auto scrollWidth">
                    <div class="h-full w-full flex flex-col gap-8 justify-center">
                        <AppForm
                            :loading="loadingForm"
                            :title="titleForm"
                            :fields="fields"
                            :styleWidth="widthForm"
                            :arraySelects="arraySelects"
                            :fontColorForm="fontColorForm"
                            :model="model"
                            :textDown="textDownForm"
                            :textButton="'Guardar información'"
                            @onSubmit:form="onSubmit($event)"
                        />
                    </div>
                </div>
            </section>
        </dialog>
    </Teleport>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'; // Import Vue functions for component definition
import apiService from '@/services/ApiService'; // Import API service for making requests
import { useModalStore } from '@/stores/modal'; // Import modal store for managing modal state
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Import animated placeholder component
import Button from '@/App.vue'; // Import button component from App.vue
import { register } from 'swiper/element/bundle'; // Import Swiper registration for using Swiper components
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Import exit icon component
import AppForm from '@/components/Form.vue'; // Import form component
import { useI18n } from 'vue-i18n'; // Import i18n for internationalization support
import CardIcon from '@/components/icons/CardIcon.vue';
register(); // Register Swiper components

export default defineComponent({
    components: {
        AppForm, // Register AppForm component
        ExitIcon, // Register ExitIcon component
        Button, // Register Button component
        AnimatedPlaceholder, // Register AnimatedPlaceholder component
        SliderCardsGames: defineAsyncComponent(() => import('../../components/SliderCardsGames.vue')), // Register SliderCardsGames component asynchronously
        WidgetCarouselComponent: defineAsyncComponent(
            () => import('../../components/alternarWidgets/WTopEventCarousel.vue'), // Register WidgetCarouselComponent asynchronously
        ),
        CardIcon
    },
    setup() {
        return {}; // Setup function returning an empty object
    },
    data() {
        /**
         * List of banks available for selection.
         * @type {Array<any>}
         */
        let listCrypto: any = [];
        /**
         * Retrieves configuration settings for the component.
         * @type {any}
         */
        let config: any = this.$config();

        /**
         * Initializes the event emitter for the component.
         * @type {any}
         */
        let emitter: any = this.$emitter();

        /**
         * References the main application component.
         * @type {any}
         */
        let appComponent: any = this.$appComponent;

        /**
         * Extracts theme colors from the configuration.
         * @type {any}
         */
        let theme_colors: any = config.theme_colors;

        /**
         * Destructures withdrawal view configuration based on the country.
         * @type {Object}
         */
        const { main, main2, information, type, detail, history } =
            appComponent.config.withdrawalsView[appComponent.country];

        /**
         * Destructures specific theme color properties.
         * @type {Object}
         */
        const { primary, primary_focus, secondary, accent_focus, base_300 } = config.theme_colors;

        /**
         * Tracks the current step in the withdrawal process.
         * @type {number}
         */
        let step: number = 0;

        /**
         * Holds the selected withdrawal method.
         * @type {any}
         */
        let method: any = 0;

        /**
         * Indicates if the loading view is active.
         * @type {boolean}
         */
        let loadingView: boolean = true;

        /**
         * Indicates if withdrawals are currently loading.
         * @type {boolean}
         */
        let loadingWithdrawals: boolean = false;

        /**
         * Stores the list of withdrawals.
         * @type {any[]}
         */
        let withdrawals: any = [];

        /**
         * Initializes the modal store for managing modals.
         * @type {any}
         */
        const modalStore = useModalStore();

        /**
         * Stores the list of products available for withdrawal.
         * @type {any[]}
         */
        let productsWithdrawlist: any = [];

        /**
         * Stores the list of bank accounts.
         * @type {any[]}
         */
        let banksAccountsList: any = [];

        /**
         * Holds credit card information.
         * @type {any[]}
         */
        let getCreditCard: any = [];

        /**
         * Indicates if the products withdrawal list is loading.
         * @type {boolean}
         */
        let loadingProductsWithdrawlist: boolean = true;

        /**
         * Indicates if the bank accounts list is loading.
         * @type {boolean}
         */
        let loadingBanksAccountslist: boolean = true;

        /**
         * Indicates if the withdrawal submission is loading.
         * @type {boolean}
         */
        let loadingWithdrawSubmit: boolean = false;

        /**
         * Sets the default amount for withdrawal.
         * @type {number}
         */
        let amountWithdraw: number = 50;

        /**
         * Holds the selected bank account information.
         * @type {any}
         */
        let accountSelected: any = {};

        /**
         * Holds the withdrawal coupon information.
         * @type {any}
         */
        let withdrawCupon: any = {};

        /**
         * Stores the base64 encoded string for receipts.
         * @type {string}
         */
        let base64: string = '';

        /**
         * Stores the base receipt information.
         * @type {string}
         */
        let baseRecibo: string = '';

        /**
         * Controls the visibility of the print modal.
         * @type {boolean}
         */
        let showModalPrint: boolean = false;

        /**
         * Holds information about the last withdrawal made.
         * @type {any}
         */
        let lastWithdrawal: any = {};

        /**
         * Indicates if a new account is being added.
         * @type {boolean}
         */
        let onAddAcount: boolean = false;

        /**
         * Indicates if the form is currently loading.
         * @type {boolean}
         */
        let loadingForm: boolean = false;

        /**
         * Stores the selected options for various fields.
         * @type {any}
         */
        let arraySelects: any = {};

        let titleForm: string = '';
        let fontColorForm: string = '';


        /**
         * Retrieves the fields configuration for bank accounts based on the country.
         * @type {any[]}
         */
        let fields: any =
            this.$config() != undefined &&
            this.$config().forms != undefined &&
            this.$config().forms['Cuentas bancarias'] != undefined &&
            this.$config().forms['Cuentas bancarias'].inputs != undefined
                ? this.$config().forms['Cuentas bancarias'].inputs
                : this.$config().cuentasBancaria != undefined &&
                    this.$config().cuentasBancaria.form != undefined &&
                    this.$config().cuentasBancaria.form[this.$appComponent['country']] != undefined
                    ? this.$config().cuentasBancaria.form[this.$appComponent['country']]
                    : []
        /**
         * Indicates if the form width should be adjusted.
         * @type {boolean}
         */
        let widthForm: boolean = false;

        /**
         * Holds the model data for the form.
         * @type {any}
         */
        let model: any = {};

        /**
         * Stores the text to be displayed below the form.
         * @type {string}
         */
        let textDownForm: string = '';

        /**
         * Merges locale messages for internationalization.
         * @type {Function}
         */
        let { mergeLocaleMessage } = useI18n({ useScope: 'global' });

        /**
         * Stores the original selected options for various fields.
         * @type {any}
         */
        let arraySelectsOrigin: any = {};

        /**
         * Holds the initial model data for the form.
         * @type {any}
         */
        let modelInitial: any = {};

        /**
         * Holds the selected service information.
         * @type {string}
         */
        let service: any = '';

        /**
         * Input configuration for bank selection.
         * @type {Object}
         */
        let bankInput: any = {
            value: 'Selecciona',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        /**
         * Input configuration for account type selection.
         * @type {Object}
         */
        let accountTypeInput: any = {
            value: 'Selecciona',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        /**
         * Input configuration for account number.
         * @type {Object}
         */
        let accountNumberInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        /**
         * Input configuration for confirming account number.
         * @type {Object}
         */
        let accountNumberConfirmInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        /**
         * Input configuration for interbank code.
         * @type {Object}
         */
        let interbankCodeInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        /**
         * Input configuration for confirming interbank code.
         * @type {Object}
         */
        let interbankCodeConfirmInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };

        let localParams: any = null;
        let ligthMode = false;
        let activeView: 'bank' | 'cellphone' | 'initial' = 'initial';

        /**
         * Returns the data properties for the component.
         * @returns {Object} The data properties.
         */

        // Conditional initialization of font color for the form
        if (
            config != undefined &&
            config['forms'] != undefined &&
            config['forms']['Cuentas bancarias'] != undefined &&
            config['forms']['Cuentas bancarias']['fontColorForm'] != undefined
        ) {
            fontColorForm = config['forms']['Cuentas bancarias']['fontColorForm'];
        } else {
            if (
                config != undefined &&
                config['cuentasBancaria'] != undefined &&
                config['cuentasBancaria']['fontColorForm'] != undefined
            ) {
                fontColorForm = config['cuentasBancaria']['fontColorForm'];
            }
        }
        const withdrawalMethod = config?.withdrawalMethod;
        if (!withdrawalMethod || withdrawalMethod.length == 0){
          activeView = 'bank';
        } else if (withdrawalMethod.length == 1){
          activeView = withdrawalMethod[0];
        }
        return {
            config,
            emitter,
            appComponent,
            theme_colors,
            primary,
            primary_focus,
            service,
            main,
            main2,
            step,
            method,
            loadingView,
            loadingWithdrawals,
            withdrawals,
            modalStore,
            productsWithdrawlist,
            amountWithdraw,
            loadingProductsWithdrawlist,
            banksAccountsList,
            loadingBanksAccountslist,
            accountSelected,
            secondary,
            withdrawCupon,
            loadingWithdrawSubmit,
            base64,
            baseRecibo,
            showModalPrint,
            information,
            type,
            detail,
            history,
            lastWithdrawal,
            onAddAcount,
            loadingForm,
            arraySelects,
            fields,
            widthForm,
            activeView,
            model,
            textDownForm,
            mergeLocaleMessage,
            arraySelectsOrigin,
            modelInitial,
            accent_focus,
            base_300,
            bankInput,
            accountTypeInput,
            accountNumberInput,
            accountNumberConfirmInput,
            interbankCodeInput,
            interbankCodeConfirmInput,
            getCreditCard,
            localParams,
            ligthMode,
            listCrypto,
            fontColorForm,
            titleForm
        };
    }, // Placeholder for data function
    beforeMount() {
        // Check if the withdrawalsView configuration is defined for the current country
        if (
            this.appComponent.config.withdrawalsView != undefined &&
            this.appComponent.config.withdrawalsView[this.appComponent.country] != undefined &&
            this.appComponent.config.withdrawalsView[this.appComponent.country].modalWelcome != undefined
        ) {
            // Retrieve the current count of modal displays from localStorage, defaulting to '1'
            let howOften = localStorage.getItem('modalWelcomeWithdrawals') || '1';
            // Get the configured frequency for how often the modal should be shown
            let howOftenConfig =
                this.appComponent.config.withdrawalsView[this.appComponent.country].modalWelcome.howOften || 1;
            // Get the configured repeat limit for how often the modal can be shown
            let howOftenRepeat =
                this.appComponent.config.withdrawalsView[this.appComponent.country].modalWelcome.howOftenRepeat || 10;
            // Check if the current display count is within the configured limits
            if (howOften && parseInt(howOften, 10) >= 0 && parseInt(howOften, 10) <= howOftenConfig) {
                // Access the modalWelcome configuration for the current country
                const modalWelcome = this.appComponent.config.withdrawalsView[this.appComponent.country].modalWelcome;
                // Set the flag to show the modal
                this.appComponent.showModal3Image = true;
                // Set the modal title from the configuration, translated
                this.modalStore.title = this.$t(modalWelcome.title);
                // Set the modal message from the configuration, translated
                this.modalStore.message = this.$t(modalWelcome.message);
                // Set the modal image from the configuration
                this.modalStore.image = modalWelcome.image;
                // Enable line decoration in the modal
                this.modalStore.lineDecoration = true;
                // Set the action text for the modal, translated
                this.modalStore.actionText = this.$t(modalWelcome.action);
                // Define the action to be taken when the modal action is triggered
                this.modalStore.action = () => {
                    this.appComponent.showModal3Image = false; // Hide the modal
                    this.$router.push('/new-casino'); // Navigate to the new casino page
                    this.modalStore.reset(); // Reset the modal store
                };
                // Set the cancel text for the modal, translated
                this.modalStore.cancelText = this.$t('Continuar');
                // Define the action to be taken when the modal cancel is triggered
                this.modalStore.cancel = () => {
                    this.appComponent.showModal3Image = false; // Hide the modal
                    this.modalStore.reset(); // Reset the modal store
                };
                // Update the display count in localStorage
                localStorage.setItem('modalWelcomeWithdrawals', (parseInt(howOften, 10) + 1).toLocaleString());
            } else if (!howOften) {
                // If howOften is not set, initialize it to '1'
                localStorage.setItem('modalWelcomeWithdrawals', '1');
            } else if (howOften && parseInt(howOften, 10) >= howOftenRepeat) {
                // If the display count exceeds the repeat limit, reset it to '1'
                localStorage.setItem('modalWelcomeWithdrawals', '1');
            } else {
                // Increment the display count in localStorage
                localStorage.setItem('modalWelcomeWithdrawals', (parseInt(howOften, 10) + 1).toLocaleString());
            }
        }
    }, // Placeholder for beforeMount lifecycle hook
    mounted() {
        // Event listener for accepting modal
        this.emitter.on('accept:modal', () => {
            this.appComponent.closeModal(); // Close the modal
            this.acceptModal(); // Accept the modal
            this.appComponent.gAnalytics('deposit_accept'); // Track analytics event
        });

        // Listen for 'step:error' event from the emitter
        this.emitter.on('step:error', () => {
            // Check if 'newView' is set to 'true' in localStorage
            if (window.localStorage.getItem('newView') === 'true') {
                // Reset step and method to initial values
                this.step = 0;
                this.method = 0;
                // Clear selected account and set default withdrawal amount
                this.accountSelected = {};
                this.amountWithdraw = 50;
                this.withdrawCupon = {};
                // Fetch withdrawals with a parameter of '0'
                this.getWithdrawals('0');
            }
        });

        // Listen for 'step:3' event from the emitter
        this.emitter.on('step:3', () => {
            // Check if 'newView' is set to 'true' in localStorage
            if (window.localStorage.getItem('newView') === 'true') {
                // Call lastStep method with the response from saveResponseWithdrawal
                this.lastStep(this.appComponent.saveResponseWithdrawal);
            }
        });

        // Initial fetch of withdrawals with a parameter of '0'
        this.getWithdrawals('0');

        // Iterate over fields to process select type fields
        this.fields.forEach((field) => {
            // Check if the field is of type 'select' and has options
            if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                // Assign Id and Name to each option
                field.options.forEach((opt) => {
                    opt.Id = opt.value;
                    opt.Name = opt.name;
                });
                // Create an options object to store field options
                let options: object = {};
                options[field.optionsKey] = field.options;
                // Merge options into arraySelects
                Object.assign(this.arraySelects, options);
            }
        });
            
        // Determine the width of the form based on configuration
        this.widthForm =
            this.config != undefined &&
            this.config.cuentasBancaria != undefined &&
            this.config.cuentasBancaria[this.appComponent.country] != undefined &&
            this.config.cuentasBancaria[this.appComponent.country].widthF != undefined
                ? this.config.cuentasBancaria[this.appComponent.country].widthF
                : false;

        // Set model properties from session data
        this.model.name = this.appComponent.session.nombre;
        this.model.docnumber = this.appComponent.session.cedula;
        this.model.client_type = '0';

        // Create a deep copy of the model for initial state
        this.modelInitial = JSON.parse(JSON.stringify(this.model));
        // Create a deep copy of arraySelects for initial state
        this.arraySelectsOrigin = JSON.parse(JSON.stringify(this.arraySelects));

        // Check for additional configuration text for the form
        if (
            this.config != undefined &&
            this.config['forms'] != undefined &&
            this.config['forms']['Cuentas bancarias'] != undefined &&
            this.config['forms']['Cuentas bancarias']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Cuentas bancarias']['description'];
            } else {
                if (
                this.config != undefined &&
                this.config.cuentasBancaria != undefined &&
                this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1 != undefined
            ) {
                this.textDownForm = this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1;
                }
            }

        // Setting up theme interval to check for theme changes
        this.changeColor = setInterval(() => {
            const localStorageC = localStorage.getItem('changeThemeColor');
            if (localStorageC === 'true' && !this.ligthMode) {
                this.ligthMode = true;
            } else if (localStorageC !== 'true' && this.ligthMode) {
                this.ligthMode = false;
            }
        }, 500);
    }, // Placeholder for mounted lifecycle hook
    unmounted() {
        // Lifecycle hook called when the component is unmounted
        this.emitter.all.delete('step:error'); // Remove error event listener
        this.emitter.all.delete('step:3'); // Remove step 3 event listener
        // Remove the 'accept:modal' event listener from the emitter
        this.emitter.all.delete('accept:modal');
    },
    beforeUnmount() {
        if (this.changeColor) {
            clearInterval(this.changeColor);
        }
    },
    methods: {
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Withdraw3|layout:layout-${this.appComponent.config.layout}`
            };
        },
        /**
         * Handle the bank account view change based on the 'newViewBank' flag.
         * Updates UI elements, fetches data, and sets up form configurations accordingly.             */
        handleChangeBankAccountView() {
            if (this.newViewBank) { // Check if new view is active
                window.localStorage.setItem('newViewBank', 'false'); // Persist the state in localStorage
                setTimeout(() => { // Delay execution to ensure config is loaded
                    if (
                        !this.newViewBank || // Check if new view is inactive
                        this.appComponent.config.bankAccountViewNew == undefined || // Check if config property is undefined
                        !this.appComponent.config.bankAccountViewNew // Check if feature flag is disabled
                    ) {
                    // Set table columns based on country configuration
                        if (
                            this.config != undefined &&
                            this.config.cuentasBancaria != undefined &&
                            this.config.cuentasBancaria.tableColumns != undefined &&
                            this.config.cuentasBancaria.tableColumns[this.appComponent.country] != undefined
                        ) {
                            this.tableColumns = this.config.cuentasBancaria.tableColumns[this.appComponent.country];
                        }
                    // Set form description text based on configuration
                        if (
            this.config != undefined &&
            this.config['forms'] != undefined &&
            this.config['forms']['Cuentas bancarias'] != undefined &&
            this.config['forms']['Cuentas bancarias']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Cuentas bancarias']['description'];
            } else {
                // Fallback to country-specific description
                if (
                this.config != undefined &&
                this.config.cuentasBancaria != undefined &&
                this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textCuentasBancariaR1 != undefined
            ) {
                this.textDownForm = this.config.cuentasBancaria[this.appComponent.country].textCuentasBancariaR1;
                }
            }

                // Define form width based on configuration or default
                        this.widthForm =
                            this.config != undefined &&
                            this.config.cuentasBancaria != undefined &&
                            this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                            this.config.cuentasBancaria[this.appComponent.country].widthF != undefined
                                ? this.config.cuentasBancaria[this.appComponent.country].widthF
                                : false;
                    // Fetch bank list from API
                        apiService.request('get_banks', {}).then((response: any) => {
                            if (response.code == 0) {
                                for (var i = 0; i < response.data.length; i++) {
                                    response.data[i].value = response.data[i].Id; // Map Id to value
                                    response.data[i].name = response.data[i].Name; // Map Name to name
                                }
                                Object.assign(this.arraySelects, {
                                    bankList: response.data, // Update bank list in select options
                                });
                                this.loadingForm = true; // Enable form loading state
                                this.getBankAccounts(this.filter); // Load existing bank accounts
                            }
                        }); 
                    // Fetch provider list from API
                        apiService.request('get_provider', {}).then((response: any) => {
                        if (response.code == 0) {
                            for (let i = 0; i < response.data.length; i++) {
                            response.data[i].value = response.data[i].Id; // Map Id to value
                            response.data[i].name = response.data[i].Name; // Map Name to name
                            }
                            Object.assign(this.arraySelects, {
                            providerList: response.data, // Update provider list in select options
                            });
                            this.loadingForm = true; // Enable form loading state
                        } else {
                            console.error(this.$t('Error retrieving provider list.')); // Log error if request fails
                        }
                        });
                    // Process fields with predefined options
                    this.fields.forEach((field) => {
                    if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                        field.options.forEach((opt) => {
                        opt.Id = opt.value; // Map value to Id
                        opt.Name = opt.name; // Map name to Name
                        });
                        let options: object = {};
                        options[field.optionsKey] = field.options;
                        Object.assign(this.arraySelects, options); // Merge field options into select list
                            }
                        });
                    // Pre-fill model with session data
                    this.model.name = this.appComponent.session.nombre; // Set user name
                    this.model.docnumber = this.appComponent.session.cedula; // Set user document number
                    this.model.client_type = '0'; // Default client type
        
                    // Store initial form state for later resets
                    this.modelInitial = JSON.parse(JSON.stringify(this.model));
                    this.arraySelectsOrigin = JSON.parse(JSON.stringify(this.arraySelects));
                }
                }, 1000); // Delay to allow configs or data to be available
            } else {
                window.localStorage.setItem('newViewBank', 'true'); // Enable new view flag
            }
        },
        /**
		 * Accepts the modal action based on the current modal state.
		 * Handles withdrawal cancellation and email confirmation.
		 */
        acceptModal(){
            if (this.modalOption == 1) {
				this.$router.push('/gestion/deposito'); // Navigate to deposit management
			} else if (this.modalOption == 2) {
				apiService
					.request('send_confirm_email', {}) // Request to send confirmation email
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Confirmar correo'),
								messageModal: this.$t(
									'Hemos enviado una mensaje a tu correo electrónico, debes confirmarlo para continuar con el proceso de retiro.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
						} else {
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString()
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
								);
							}
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
						}
					});
			} else if (this.modalOption == 3) {
				this.$router.push('/gestion/verificar_cuenta'); // Navigate to user verification
			}
        },
        /**
         * Advances to the next step in the withdrawal process based on the provided step number.
         * @param {number} step - The step number to advance to.
         */
        nextStep(step) {
            switch (step) {
                case 1:
                    // Set the current step to 1
                    this.step = 1;
                    break;
                case 2:
                    // Set the current step to 2 and retrieve product withdrawal information
                    this.step = 2;
                    this.getProductWithdraw();
                    break;
                case 3:
                    /**
                     * Finalizes the withdrawal process by preparing the withdrawal details
                     * and displaying a confirmation modal if necessary.
                     */
                    const finish = () => {
                        this.withdrawCupon = {
                            amount: this.amountWithdraw, // Amount to withdraw
                            account: this.accountSelected.account || this.accountSelected.name || 'Local', // Selected account or default to 'Local'
                            date: new Date().toLocaleString(), // Current date and time
                            type: this.accountSelected.account_type, // Type of the selected account
                        };
                        // Check if the modal confirmation configuration exists for the current country
                        if (
                            this.appComponent.config.withdrawalsView[this.appComponent.country] != undefined &&
                            this.appComponent.config.withdrawalsView[this.appComponent.country].modalConfirm !=
                            undefined
                        ) {
                            const modalConfirm =
                                this.appComponent.config.withdrawalsView[this.appComponent.country].modalConfirm;
                            this.appComponent.showModal3Image = true; // Show confirmation modal
                            this.modalStore.title = this.$t(modalConfirm.title); // Set modal title
                            this.modalStore.message = this.$t(modalConfirm.message); // Set modal message
                            this.modalStore.image = modalConfirm.image; // Set modal image
                            this.modalStore.actionText = this.$t(modalConfirm.action); // Set action text
                            this.modalStore.cancelText = this.$t('Continuar jugando'); // Set cancel text
                            // Define cancel action for the modal
                            this.modalStore.cancel = () => {
                                this.$router.push('/new-casino'); // Redirect to new casino
                                this.appComponent.showModal3Image = false; // Hide modal
                                this.modalStore.reset(); // Reset modal store
                            };
                            // Define action for the modal
                            this.modalStore.action = () => {
                                this.withdraw(); // Execute withdrawal
                                this.appComponent.showModal3Image = false; // Hide modal
                                this.modalStore.reset(); // Reset modal store
                            };
                            this.appComponent.showModal3Image = true; // Show modal
                        } else {
                            this.withdraw(); // Execute withdrawal if no modal is needed
                        }
                    };
                    // Check withdrawal method
                    if (this.method == 1) {
                        // Validate withdrawal amount for method 1
                        if (this.appComponent.config.retiros.MinWithdraw) {
                            if (this.amountWithdraw < this.appComponent.config.retiros.MinWithdraw) {
                                // Show warning for minimum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto mínimo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MinWithdraw;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else if (this.amountWithdraw > this.appComponent.config.retiros.MaxWithdraw) {
                                // Show warning for maximum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto maximo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MaxWithdraw;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else {
                                finish(); // Proceed to finish withdrawal
                            }
                        } else {
                            finish(); // Proceed to finish withdrawal if no minimum is set
                        }
                    } else if (this.method == 2 && this.accountSelected != '') {
                        // Validate withdrawal amount for method 2
                        if (this.appComponent.config.retiros.MinWithdrawBank) {
                            if (this.amountWithdraw < this.appComponent.config.retiros.MinWithdrawBank) {
                                // Show warning for minimum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto mínimo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MinWithdrawBank;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else if (this.amountWithdraw > this.appComponent.config.retiros.MaxWithdrawBankAccount) {
                                // Show warning for maximum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto maximo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MaxWithdrawBankAccount;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else {
                                finish(); // Proceed to finish withdrawal
                            }
                        } else {
                            finish(); // Proceed to finish withdrawal if no minimum is set
                        }
                    } else if (this.method == 10 && this.accountSelected != '') {
                        // Validate withdrawal amount for method 2
                        if (this.appComponent.config.retiros.MinCrypto) {
                            if (this.amountWithdraw < this.appComponent.config.retiros.MinCrypto) {
                                // Show warning for minimum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto mínimo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MinCrypto;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else if (this.amountWithdraw > this.appComponent.config.retiros.MaxCrypto) {
                                // Show warning for maximum withdrawal amount
                                this.modalStore.title = this.$t('Advertencia');
                                this.modalStore.message =
                                    this.$t('El monto maximo es de ') +
                                    (this.appComponent.session.simbolo_moneda != null &&
                                    this.appComponent.session.simbolo_moneda != undefined
                                        ? this.appComponent.session.simbolo_moneda
                                        : '$') +
                                    this.appComponent.config.retiros.MaxCrypto;
                                this.modalStore.action = () => {
                                    this.appComponent.showModal3 = false; // Hide modal
                                    this.modalStore.reset(); // Reset modal store
                                };
                                this.appComponent.showModal3 = true; // Show modal
                            } else {
                                finish(); // Proceed to finish withdrawal
                            }
                        } else {
                            finish(); // Proceed to finish withdrawal if no minimum is set
                        }
                    } else if (this.accountSelected != '' && this.method != 1 && this.method != 2) {
                        // Validate withdrawal amount for other methods
                        if (this.amountWithdraw < this.accountSelected.min) {
                            // Show warning for minimum withdrawal amount
                            this.modalStore.title = this.$t('Advertencia');
                            this.modalStore.message =
                                this.$t('El monto mínimo es de ') +
                                (this.appComponent.session.simbolo_moneda != null &&
                                this.appComponent.session.simbolo_moneda != undefined
                                    ? this.appComponent.session.simbolo_moneda
                                    : '$') +
                                this.accountSelected.min;
                            this.modalStore.action = () => {
                                this.appComponent.showModal3 = false; // Hide modal
                                this.modalStore.reset(); // Reset modal store
                            };
                            this.appComponent.showModal3 = true; // Show modal
                        } else if (this.amountWithdraw > this.accountSelected.max) {
                            // Show warning for maximum withdrawal amount
                            this.modalStore.title = this.$t('Advertencia');
                            this.modalStore.message =
                                this.$t('El monto maximo es de ') +
                                (this.appComponent.session.simbolo_moneda != null &&
                                this.appComponent.session.simbolo_moneda != undefined
                                    ? this.appComponent.session.simbolo_moneda
                                    : '$') +
                                this.accountSelected.max;
                            this.modalStore.action = () => {
                                this.appComponent.showModal3 = false; // Hide modal
                                this.modalStore.reset(); // Reset modal store
                            };
                            this.appComponent.showModal3 = true; // Show modal
                        } else {
                            finish(); // Proceed to finish withdrawal
                        }
                    } else if (this.accountSelected == '' && this.method != 1) {
                        // Show error if no account is selected
                        this.modalStore.title = this.$t('Error');
                        this.modalStore.message = this.$t('Debes seleccionar una cuenta');
                        this.modalStore.action = () => {
                            this.appComponent.showModal3 = false; // Hide modal
                            this.modalStore.reset(); // Reset modal store
                        };
                        this.appComponent.showModal3 = true; // Show modal
                    } else {
                        finish(); // Proceed to finish withdrawal
                    }
                    break;
                default:
                    // Reset state for unrecognized step
                    this.step = 0;
                    this.method = 0;
                    this.accountSelected = {};
                    this.amountWithdraw = 50; // Default withdrawal amount
                    this.withdrawCupon = {};
                    this.getWithdrawals('0'); // Retrieve withdrawals with default parameter
                    break;
            }
        }, // Placeholder for nextStep method
        /**
         * Asynchronously retrieves bank accounts and categorizes them into credit cards and other bank accounts.
         * Sets loading state while the request is being processed.
         */
        async getBanksAccounts() {
            // Set loading state to true while fetching bank accounts
            this.loadingBanksAccountslist = true;

            // Make an API request to fetch bank accounts with a specific state
            await apiService
                .request('get_bank_accounts', {
                    State: '1', // Only fetch accounts with state '1'
                })
                .then((response: any) => {
                    // Check if the response code indicates success
                    if (response.code == 0) {
                        // Initialize arrays to hold credit card and bank account data
                        this.getCreditCard = [];
                        this.banksAccountsList = [];

                        // Iterate through the response data to categorize accounts
                        for (var i = 0; i < response.data.length; i++) {
                            // Check if the account type is 'CARD'
                            if (response.data[i].account_type === 'CARD') {
                                // Add to credit card list
                                this.getCreditCard.push(response.data[i]);
                                console.log('this.getCreditCard', this.getCreditCard); // Log credit card data
                            } else {
                                // Add to bank accounts list
                                this.banksAccountsList.push(response.data[i]);
                                console.log('this.bank', this.banksAccountsList); // Log bank account data
                            }
                        }
                        // Set loading state to false after processing the response
                        this.loadingBanksAccountslist = false;
                    }
                });
        }, // Placeholder for getBanksAccounts method
        async getProductWithdraw() {
            // Method to fetch product withdrawal data
            this.loadingProductsWithdrawlist = true; // Set loading state to true
            try {
                const response = await apiService.request('get_product_withdraw', {}); // Make API request
                if (response.code === 0 && response.data && response.data.length > 0) {
                    this.productsWithdrawlist = response.data; // Assign response data to productsWithdrawlist
                }
            } catch (error) {
                console.error('Fallo el llamado', error); // Log error if API request fails
            } finally {
                this.loadingProductsWithdrawlist = false; // Reset loading state
            }
        },

        async getWalletsWithdraw() {
            // Fetch wallets available for withdrawal
            this.loadingBanksAccountslist = true // Set loading state to true

            try {
                await apiService
                .request('get_wallets_accounts', {user_id: this.appComponent.session.usuario})
                .then((response: any) => {
                    if (response.code == 0) {
                        if(response.data.length != 0){
                            response.data.forEach((item) => {
                                item.value = item.id; // Set value to wallet ID
                                item.name = item.wallet; // Combine name and currency
                            });
                            this.listCrypto = [...response.data]; // Update list of wallets
                        }

                        this.loadingBanksAccountslist = false; // Reset loading state
                    }
                });
            } catch (error) {
                console.error('Fallo el llamado', error); // Log error if API request fails
            }
            
            
        },

        /**
         * Asynchronously retrieves a list of banks from the API.
         *
         * This function sends a request to the 'get_banks' endpoint and processes the response.
         * If the response code indicates success (code 0), it maps the bank data to a more usable format.
         * The loadingForm property is set to true, and the bank list is assigned to the arraySelects object.
         */
        async getBanks() {
            // Send a request to the API service to get the list of banks
            await apiService.request('get_banks', {}).then((response: any) => {
                // Check if the response code indicates success
                if (response.code == 0) {
                    // Iterate through the bank data array
                    for (var i = 0; i < response.data.length; i++) {
                        // Map the Id to value and Name to name for easier access
                        response.data[i].value = response.data[i].Id;
                        response.data[i].name = response.data[i].Name;
                    }
                    // Set loadingForm to true to indicate loading state
                    this.loadingForm = true;
                    // Assign the processed bank list to the arraySelects object
                    Object.assign(this.arraySelects, { bankList: response.data });
                }
            });
        }, // Placeholder for getBanks method
        /**
         * Handles the last step of the withdrawal process.
         *
         * @param {Object} response - The response object containing withdrawal details.
         */
        lastStep(response) {
            // Assigns the withdrawal ID from the response to the withdrawCupon object
            this.withdrawCupon.withdrawId = response.data.details.data.WithdrawId;

            // Assigns the date and time of the withdrawal to the withdrawCupon object
            this.withdrawCupon.date = response.data.details.data.date_time;

            // Assigns the key from the response to the withdrawCupon object
            this.withdrawCupon.key = response.data.details.data.Key;

            // Checks if the status message PDF is defined and not empty
            if (
                response.data.details.status_messagePdf != undefined &&
                response.data.details.status_messagePdf != '' &&
                response.data.details.status_messagePdf != null
            ) {
                // Converts the PDF data to a base64 string for display
                this.base64 = 'data:application/pdf;base64,' + response.data.details.status_messagePdf;
            } else {
                // Cleans up the status message by removing specific characters
                this.baseRecibo = response.data.details.status_message.replace(/\u21B5/g, '');
            }

            // Sets the loading state to false after processing the withdrawal
            this.loadingWithdrawSubmit = false;

            // Sends analytics data regarding the withdrawal interaction
            this.appComponent.gAnalytics(
                'withdrawal_interaction',
                this.method == 1
                    ? 'local'
                    : this.method == 2
                        ? 'Cuenta Bancaria'
                        : this.method == 853460
                            ? 'Red Activa Western Union'
                            : this.method == 2894342
                                ? 'Full Carga'
                                : this.method == 5446026
                                    ? 'Mi Negocio Efectivo'
                                    : this.method == 6283508
                                        ? 'Farmacias Medicity'
                                        : this.method == 10
                                            ? 'Wallets Crypto'
										    : '',
            );

            // Sends analytics data for a successful withdrawal
            this.appComponent.gAnalytics('successful_withdrawal_new', {
                type: this.service, // Type of service used for withdrawal
                value: this.amountWithdraw, // Amount withdrawn
            });
        }, // Placeholder for lastStep method
        /**
         * Initiates the withdrawal process.
         * Sets loading state and determines the service and ID based on the selected method.
         * Collects additional information if required and sends a withdrawal request.
         * Handles the response and displays appropriate messages or modals.
         * @returns {Promise<void>} A promise that resolves when the withdrawal process is complete.
         */
        async withdraw() {
            this.loadingWithdrawSubmit = true; // Set loading state for withdrawal submission
            let vthis = this; // Preserve context for use in callbacks
            let id = ''; // Initialize ID variable
            this.service = ''; // Initialize service variable
            this.appComponent.gAnalytics('withdrawal'); // Track withdrawal event in analytics

            // Determine the service and ID based on the selected withdrawal method
            if (this.method == 1) {
                this.service = 'local';
                id = '';
            } else if (this.method == 2) {
                this.service = 'UserBank';
                id = this.accountSelected.userbank_id; // Get user bank ID
            } else if (this.method == 10) {
                this.service = 'UserBank';
                id = this.accountSelected.id; // Get user bank ID for crypto wallets
            }else if (this.method == 3) {
                this.service = 'CreditCard';
                id = this.accountSelected.userbank_id; // Get user bank ID for credit card
            } else if (
                this.productsWithdrawlist.filter((item) => {
                    return item.value == this.method; // Check if method is in the withdrawal list
                }).length > 0
            ) {
                this.service = 'UserAgent';
                id = this.method.toString(); // Convert method to string for ID
            } else {
                this.service = 'local';
                id = this.method.toString(); // Default to local service
            }

            let infoExtra = {}; // Initialize additional information object
            // Collect extra information if defined in the configuration
            if (this.config.retiros.infoExtra != undefined && this.config.retiros.infoExtra.length > 0) {
                this.config.retiros.infoExtra.forEach(function (value, key) {
                    // Check session validity for extra info
                    if (
                        (value.validSessionEmpty &&
                            (vthis.appComponent.session[value.name] == '' ||
                                vthis.appComponent.session[value.name] == undefined ||
                                vthis.appComponent.session[value.name] == null)) ||
                        value.validSessionEmpty == undefined ||
                        value.validSessionEmpty == false
                    ) {
                        infoExtra[value.name] = (document.getElementById(value.name) as any).value; // Get value from DOM
                    }
                });
            }

            // Prepare parameters for the withdrawal request
            let params = {
                user_id: '', // User ID (to be set)
                amount: this.amountWithdraw, // Amount to withdraw
                balance: '1', // Balance indicator
                id: id, // Service ID
                payee: { forProduct: 'casino' }, // Payee information
                service: this.service, // Selected service
                infoExtra: infoExtra, // Additional information
            };

            if (this.localParams !== null && this.localParams !== undefined) {
                params = this.localParams;
            }

            // Send withdrawal request to the API
            await apiService.request('withdraw', params).then((response: any) => {
                // Handle successful response
                if (response.code == 0) {
                    this.localParams = null; // Reset local parameters
                    this.step = 3; // Update step to 3
                    setTimeout(() => {
                        // Check if OTP confirmation is required
                        if (response.data['confirmOTP'] !== undefined && response.data['confirmOTP']) {
                            let error_mensaje = ''; // Initialize error message
                            if (response.data.msg != undefined) {
                                error_mensaje = response.data.msg; // Get message from response
                            }
                            if (error_mensaje == '') {
                                error_mensaje = this.$t('Te enviamos un código al email registrado'); // Default message
                            }
                            // Show modal for OTP verification
                            this.appComponent.modal = {
                                showModal: 'sms',
                                messageModal: {
                                    title: this.$t('Verificar código'), // Modal title
                                    text: error_mensaje, // Modal text
                                    buttonText: this.$t('Verificar'), // Button text
                                    img2: 'https://images.virtualsoft.tech/m/msjT1680297729.png', // Image URL
                                    code: true, // Indicates that a code is required
                                    time: response.data['codeTime']
                                        ? parseInt(response.data['codeTime']) // Code time from response
                                        : 1 * 60 * 1000, // Default to 1 minute
                                    WithdrawId: response.data['WithdrawId'] ? response.data['WithdrawId'] : null, // Withdrawal ID
                                    service: response.data['service'] ? response.data['service'] : null, // Service from response
                                    codeSend: 'email', // Method of code sending
                                },
                            };
                        } else {
                            this.lastStep(response); // Proceed to the last step if no OTP is required
                        }
                    }, 1000); // Delay for 1 second before processing
                } else if (response.error_code == 21015) {
                    // Handle specific error code 21015
                    let error_mensaje = ''; // Initialize error message
                    if (response.msg != undefined) {
                        error_mensaje = response.msg; // Get message from response
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    // Show error modal
                    this.modalStore.title = this.$t('Error!'); // Modal title
                    this.modalStore.message = error_mensaje; // Modal message
                    this.modalStore.open = true; // Open modal
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false; // Close modal
                        this.modalStore.reset(); // Reset modal store
                    };
                    this.appComponent.showModal3 = true; // Show modal
                } else if (response.error_code == 300034) {
                    // Handle specific error code 300034
                    let error_mensaje = ''; // Initialize error message
                    if (response.msg != undefined) {
                        error_mensaje = response.msg; // Get message from response
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    // Show error modal
                    this.modalStore.title = this.$t('Error!'); // Modal title
                    this.modalStore.message = error_mensaje; // Modal message
                    this.modalStore.open = true; // Open modal
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false; // Close modal
                        this.modalStore.reset(); // Reset modal store
                    };
                    this.appComponent.showModal3 = true; // Show modal
                } else if (response.error_code == 300053) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Depositar'),
									messageModal: this.$t(
										'Estimado usuario para retirar debe haber realizado almenos un deposito en su cuenta.' // Prompt to deposit before withdrawal
									),
									buttonModal: this.$t('Depositar'),
									orderModal: 'closeModal',
								};
								this.modalOption = 1; // Set modal option for deposit
							} else if (response.error_code == 300054) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Verificar correo'),
									messageModal: this.$t(
										'Estimado usuario, para poder realizar un retiro es necesario que verifique su correo electrónico.' // Prompt to verify email before withdrawal
									),
									buttonModal: this.$t(
										'Enviar link de verificación'
									),
									orderModal: 'closeModal',
								};
								this.modalOption = 2; // Set modal option for email verification
							} else if (response.error_code == 300237) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Cuenta desverificada'),
									messageModal: this.$t(
										'Tu documento de identidad está vencido y tu cuenta ha sido desverificada. Debes actualizar tu documento para volver a verificarte y poder realizar retiros.' // Prompt to verify email before withdrawal
									),
									buttonModal: this.$t(
										'Actualizar documento'
									),
									orderModal: 'closeModal',
								};
								this.modalOption = 3; // Set modal option for verification
							} else if (response.error_code == 300055) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Verificar celular'),
									messageModal: this.$t(
										'Estimado usuario, para realizar un retiro es necesario que verifique su número de celular.' // Prompt to verify phone number before withdrawal
									),
									buttonModal: this.$t('Aceptar'),
									orderModal: 'closeModal',
								};
							}else if (response.error_code == 300060) {
                    let error_mensaje = '';
                    if (response && response.error_code !== undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }

                    if (response.msg != undefined) {
                        error_mensaje = response.msg;
                    }

                    if (error_mensaje == '' || error_mensaje.length < 3) {
                        error_mensaje = this.$t(
                            'Tienes un bono activo, al crear tu nota de retiro será cancelado de manera permanente ¿Quieres continuar?',
                        );
                    }

                    this.localParams = { ...params, remove_bonuses: true };

                    this.modalStore.title = this.$t('ATENCIÓN!');
                    this.modalStore.message = error_mensaje;
                    this.modalStore.open = true;
                    this.modalStore.cancelText = this.$t('Cancelar');
                    this.modalStore.cancel = () => {
                        this.localParams = null;
                        this.appComponent.showModal3 = false;
                        this.modalStore.reset();
                    };
                    this.modalStore.action = () => {
                        this.withdraw();
                        this.appComponent.showModal3 = false;
                        this.modalStore.reset();
                    };
                    this.appComponent.showModal3 = true;
                } else {
                    console.log('response entro', response);
                    // Handle generic error response
                    let error_mensaje = ''; // Initialize error message
                    error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    // Show error modal
                    this.modalStore.title = this.$t('Error!'); // Modal title
                    this.modalStore.message = error_mensaje; // Modal message
                    this.modalStore.open = true; // Open modal
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false; // Close modal
                        this.modalStore.reset(); // Reset modal store
                    };
                    this.appComponent.showModal3 = true; // Show modal
                }
            });
        }, // Placeholder for withdraw method
        /**
         * Cancels a withdrawal request based on the provided ID.
         *
         * @param {string} id - The unique identifier of the withdrawal to be canceled.
         * @returns {Promise<void>} - A promise that resolves when the cancellation process is complete.
         */
        async cancelWithdrawal(id) {
            // Sends a request to cancel the withdrawal using the API service
            await apiService.request('withdraw_cancel', { id }).then((response: any) => {
                // Checks if the response code indicates success
                if (response.code == 0) {
                    // Tracks the cancellation event for analytics
                    this.appComponent.gAnalytics('cancel_withdrawal_new');
                    // Displays a modal to inform the user of the successful cancellation
                    this.appComponent.showModal3 = true;
                    this.modalStore.title = 'Retiro anulado'; // Title of the modal
                    this.modalStore.message = this.$t(
                        'La nota de retiro ha sido anulada satisfactoriamente. Este valor lo verás reflejado en saldo disponible para apostar.',
                    ); // Success message in the modal
                    this.modalStore.open = true; // Opens the modal
                    // Defines the action to be taken when the modal is closed
                    this.modalStore.action = () => {
                        this.nextStep(0); // Proceeds to the next step
                        this.appComponent.showModal3 = false; // Closes the modal
                        this.modalStore.reset(); // Resets the modal store
                    };
                } else {
                    let error_mensaje = ''; // Variable to hold the error message
                    // Retrieves the error message based on the error code
                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    // Fallback error message if no specific error message is found
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                    // Displays a modal to inform the user of the error
                    this.appComponent.showModal3 = true;
                    this.modalStore.title = this.$t('Error!'); // Title of the error modal
                    this.modalStore.message = error_mensaje; // Error message in the modal
                    this.modalStore.open = true; // Opens the modal
                    // Defines the action to be taken when the error modal is closed
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false; // Closes the modal
                        this.modalStore.reset(); // Resets the modal store
                    };
                }
            });
        }, // Placeholder for cancelWithdrawal method
        /**
         * Asynchronously retrieves withdrawal requests based on the provided state.
         *
         * @param {string} state - The state of the withdrawals to filter by. Defaults to an empty string.
         * @returns {Promise<void>} - A promise that resolves when the withdrawals have been fetched and processed.
         */
        async getWithdrawals(state: string = '') {
            // Set loading view to true while fetching data
            this.loadingView = true;

            // Parameters for the withdrawal request
            const paramsWithdrawals = {
                State: state, // State filter for withdrawals
                count: 10,    // Number of withdrawals to fetch
                start: 0,     // Starting index for pagination
            };

            // Set loading state for withdrawals
            this.loadingWithdrawals = true;

            // Make an API request to fetch withdrawals
            await apiService.request('get_withdrawals', paramsWithdrawals).then((response: any) => {
                // Check if the response code indicates success
                if (response.code == 0) {
                    // Assign the withdrawal requests to the component's state
                    this.withdrawals = response.data.withdrawal_requests.request;

                    // Process each withdrawal request
                    this.withdrawals.forEach((element) => {
                        // Convert date string to Date object
                        element.date = new Date(element.date);

                        // Map status codes to user-friendly status and internal status
                        switch (element.status) {
                            case 0:
                                element.status = 1; // Internal status for 'Pagada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                            case 1:
                                element.status = 2; // Internal status for 'Pagada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                            case 2:
                                element.status = 3; // Internal status for 'Pagada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                            case 3:
                                element.status = 4; // Internal status for 'Pagada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                            case -1:
                                element.status = 5; // Internal status for 'Anulada'
                                element.status2 = 'Anulada'; // User-friendly status
                                break;
                            case 4:
                                element.status = 6; // Internal status for 'Rechazada'
                                element.status2 = 'Rechazada'; // User-friendly status
                                break;
                            case 5:
                                element.status = 7; // Internal status for 'Rechazada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                            default:
                                element.status = 1; // Default to 'Pagada'
                                element.status2 = 'Pagada'; // User-friendly status
                                break;
                        }
                    });

                    // Update last withdrawal date and pending withdrawals count
                    if (this.withdrawals.length > 0) {
                        this.lastWithdrawal = this.withdrawals[0].date; // Set last withdrawal date
                        this.appComponent.pendingWithdrawals = this.withdrawals.length; // Update pending withdrawals count
                    } else if (this.withdrawals.length == 0) {
                        this.appComponent.pendingWithdrawals = 0; // No pending withdrawals
                    }

                    // Set loading view to false after processing
                    this.loadingView = false;

                    // Delay the loading state for withdrawals to false
                    setTimeout(() => {
                        this.loadingWithdrawals = false; // End loading state for withdrawals
                    }, 1000);
                }
            });
        }, // Placeholder for getWithdrawals method
        /**
         * Handles the change event for a select input.
         * Updates various model properties and selects based on the selected bank.
         *
         * @param {any} event - The event object containing the target value and options key.
         */
        changeSelect2(event: any) {
            // Retrieve the selected value from the event target
            let value = event.event.target.value;
            // Get the options key from the event
            let optionsKey = event.optionsKey;

            // Check if the options key corresponds to the bank list
            if (optionsKey == 'bankList') {
                // Update branchesList based on the selected bank
                Object.assign(this.arraySelects, {
                    branchesList:
                    this.arraySelects[optionsKey][
                        this.arraySelects[optionsKey].findIndex((i: { Id: string }) => i.Id === value)
                        ].branches,
                });
                // Reset the branch model
                this.model['branch'] = '';

                // Update interbankCodesList based on the selected bank
                Object.assign(this.arraySelects, {
                    interbankCodesList:
                    this.arraySelects[optionsKey][
                        this.arraySelects[optionsKey].findIndex((i: { Id: string }) => i.Id === value)
                        ].interbankCodes,
                });
                // Reset interbank code models
                this.model['cod_interbank'] = '';
                this.model['cod_interbank2'] = '';

                // Check if the selected bank value is '314'
                if (value == '314') {
                    // Set specific account types for bank '314'
                    Object.assign(this.arraySelects, {
                        accountTypeList: [
                            {
                                name: 'CPF',
                                value: '0',
                            },
                            {
                                name: 'Email',
                                value: '1',
                            },
                            {
                                name: 'Celular',
                                value: '2',
                            },
                            {
                                name: 'Chave Ale',
                                value: '3',
                            },
                        ],
                    });
                    // Merge locale messages for bank '314'
                    this.mergeLocaleMessage('pt', {
                        'Número de cuenta': 'Chave PIX',
                        'Tipo de cuenta': 'Tipo de chave PIX',
                        'Confirmar número de cuenta': 'Confirmar chave PIX',
                    });
                } else {
                    // Reset account types to the original list for other banks
                    Object.assign(this.arraySelects, {
                        accountTypeList: this.arraySelectsOrigin['accountTypeList'],
                    });
                    // Merge locale messages for other banks
                    this.mergeLocaleMessage('pt', {
                        'Número de cuenta': 'Numero de conta',
                        'Tipo de cuenta': 'Tipo De Conta',
                        'Confirmar número de cuenta': 'Confirmar o número da conta',
                    });
                }
            }
        }, // Placeholder for changeSelect2 method
        /**
         * Handles the submission of the form with the provided values.
         *
         * @param values - The form values submitted by the user.
         */
        async onSubmit(values: any) {
            // Check if bank value is defined and filter the bankList to find the corresponding bank object
            values.bank != undefined
                ? (values.bank = this.arraySelects['bankList'].filter((x) => x.Id == values.bank)[0])
                : (values.bank = null); // Set bank to null if not defined

            // Check if account_type value is defined and filter the accountTypeList to find the corresponding account type object
            values.account_type != undefined
                ? (values.account_type = this.arraySelects['accountTypeList'].filter(
                    (x) => x.Id == values.account_type || x.value == values.account_type,
                )[0])
                : (values.account_type = null); // Set account_type to null if not defined

            // Check if client_type value is defined and filter the clientTypeList to find the corresponding client type object
            values.client_type != undefined
                ? (values.client_type = this.arraySelects['clientTypeList'].filter(
                    (x) => x.Id == values.client_type,
                )[0])
                : (values.client_type = null); // Set client_type to null if not defined

            // If account_type is not null, assign Id and Name from the account_type object
            if (values.account_type != null) {
                values.account_type.Id = values.account_type.value;
                values.account_type.Name = values.account_type.name;
            }

            // Create a copy of values to send as parameters in the API request
            let params = { ...values };

            // Make an asynchronous request to save the user bank information
            await apiService.request('save_user_bank', params).then((response: any) => {
                // Check if the response code indicates success
                if (response.code == 0) {
                    // Set modal store properties for success message
                    this.modalStore.title = this.$t('Mensaje');
                    this.modalStore.message = this.$t('Cuenta bancaria guardada satisfactoriamente.');
                    this.modalStore.open = true;

                    // Define action to be taken when the modal is closed
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false;
                        this.onAddAcount = false;
                        this.modalStore.reset();
                    };

                    // Show the success modal
                    this.appComponent.showModal3 = true;

                    // Refresh the list of bank accounts
                    this.getBanksAccounts();

                    // Reset the model to its initial state
                    this.model = JSON.parse(JSON.stringify(this.modelInitial));
                } else {
                    // Handle error response
                    var error_mensaje = '';
                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    // Provide a default error message if no specific error message is found
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }

                    // Set modal store properties for error message
                    this.modalStore.title = this.$t('Error!');
                    this.modalStore.message = error_mensaje;
                    this.modalStore.open = true;

                    // Define action to be taken when the modal is closed
                    this.modalStore.action = () => {
                        this.appComponent.showModal3 = false;
                        this.onAddAcount = false;
                        this.model = JSON.parse(JSON.stringify(this.modelInitial));
                        this.modalStore.reset();
                    };

                    // Show the error modal
                    this.appComponent.showModal3 = true;
                }
            });
        }, // Placeholder for onSubmit method
        hiddenAccountNumber(cuenta) {
            if (!cuenta) return ''; 
            cuenta = String(cuenta);

            // Method to hide part of the account number
            if (cuenta.length > 10) {
                cuenta = cuenta.slice(-10); // Keep only the last 10 characters
            }

            const hiddenCount = Math.max(0, cuenta.length - 5); // Create asterisks for hidden part
            const asteriscos = '*'.repeat(hiddenCount);

            return asteriscos + cuenta.slice(-5); // Return masked account number
        },
        /**
         * Handles the cancellation of a withdrawal.
         *
         * @param {Object} item - The withdrawal item to be canceled.
         * @param {number} item.id - The ID of the withdrawal to cancel.
         */
        handleCancelWithdrawal(item) {
            // Show the modal for cancellation confirmation
            this.appComponent.showModal3 = true;
            // Set the title of the modal
            this.modalStore.title = 'Cancelar retiro';
            // Set the message for the modal, including the withdrawal ID
            this.modalStore.message = this.$t('¿Está seguro que desea cancelar el retiro Nro.') + ' ' + item.id + ' ?';
            // Open the modal
            this.modalStore.open = true;
            // Define the action to take when the user confirms the cancellation
            this.modalStore.action = () => {
                this.cancelWithdrawal(item.id);
            };
            // Define the action to take when the user cancels the modal
            this.modalStore.cancel = () => {
                this.appComponent.showModal3 = false;
                // Reset the modal store to its initial state
                this.modalStore.reset();
            };
        }, // Placeholder for handleCancelWithdrawal method
        /**
         * Handles the withdrawal amount based on the selected method.
         * @param {number} amount - The amount to withdraw.
         */
        handleAmoutWithdraw(amount) {
            // Check if the withdrawal method is bank transfer (method 2)
            if (this.method == 2) {
                // Validate against minimum withdrawal limit for bank transfers
                if (amount < parseFloat(this.appComponent.config.retiros.MinWithdrawBank)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinWithdrawBank);
                    // Validate against maximum withdrawal limit for bank transfers
                } else if (amount > parseFloat(this.appComponent.config.retiros.MaxWithdrawBankAccount)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxWithdrawBankAccount);
                }
                // Check if the withdrawal method is another type (method 1)
            } else if (this.method == 1) {
                // Validate against minimum withdrawal limit for other methods
                if (amount < parseFloat(this.appComponent.config.retiros.MinWithdraw)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinWithdraw);
                    // Validate against maximum withdrawal limit for other methods
                } else if (amount > parseFloat(this.appComponent.config.retiros.MaxWithdraw)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxWithdraw);
                }
                // Handle cases where the method is neither bank transfer nor the other type
            } else if (this.method == 10) {
                // Validate against minimum withdrawal limit for other methods
                if (amount < parseFloat(this.appComponent.config.retiros.MinCrypto)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinCrypto);
                    // Validate against maximum withdrawal limit for other methods
                } else if (amount > parseFloat(this.appComponent.config.retiros.MaxCrypto)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxCrypto);
                }
                // Handle cases where the method is neither bank transfer nor the other type
            } else if (this.method != 2 && this.method != 1) {
                // Validate against minimum withdrawal limit for the selected account
                if (amount < parseFloat(this.accountSelected.min)) {
                    this.amountWithdraw = parseFloat(this.accountSelected.min);
                    // Validate against maximum withdrawal limit for the selected account
                } else if (amount > parseFloat(this.accountSelected.max)) {
                    this.amountWithdraw = parseFloat(this.accountSelected.max);
                }
            }
        }, // Placeholder for handleAmountWithdraw method
        /**
         * Validates the input value for withdrawal amounts based on the selected method.
         * @param {Event} event - The event object containing the target value to validate.
         */
        validateInput(event) {
            // Check if the selected method is 2 (bank withdrawal)
            if (this.method == 2) {
                // Validate against minimum withdrawal limit for bank
                if (event.target.value < parseFloat(this.appComponent.config.retiros.MinWithdrawBank)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinWithdrawBank);
                    // Validate against maximum withdrawal limit for bank account
                } else if (event.target.value > parseFloat(this.appComponent.config.retiros.MaxWithdrawBankAccount)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxWithdrawBankAccount);
                }
                // Check if the selected method is 1 (other withdrawal type)
            } else if (this.method == 1) {
                // Validate against minimum withdrawal limit for other types
                if (event.target.value < parseFloat(this.appComponent.config.retiros.MinWithdraw)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinWithdraw);
                    // Validate against maximum withdrawal limit for other types
                } else if (event.target.value > parseFloat(this.appComponent.config.retiros.MaxWithdraw)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxWithdraw);
                }
                // Handle cases where the method is neither 1 nor 2
            } else if (this.method == 10) {
                // Validate against minimum withdrawal limit for other types
                if (event.target.value < parseFloat(this.appComponent.config.retiros.MinCrypto)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MinCrypto);
                    // Validate against maximum withdrawal limit for other types
                } else if (event.target.value > parseFloat(this.appComponent.config.retiros.MaxCrypto)) {
                    this.amountWithdraw = parseFloat(this.appComponent.config.retiros.MaxCrypto);
                }
                // Handle cases where the method is neither 1 nor 2
            } else if (this.method != 2 && this.method != 1) {
                // Validate against minimum withdrawal limit for the selected account
                if (event.target.value < parseFloat(this.accountSelected.min)) {
                    this.amountWithdraw = parseFloat(this.accountSelected.min);
                    // Validate against maximum withdrawal limit for the selected account
                } else if (event.target.value > parseFloat(this.accountSelected.max)) {
                    this.amountWithdraw = parseFloat(this.accountSelected.max);
                }
            }
        }, // Placeholder for validateInput method
        handleBankInput() {
            // Method to validate bank input
            if (this.bankInput.value !== 'Selecciona') {
                this.bankInput.validation = true; // Set validation to true if a bank is selected
                this.bankInput.color = 'success'; // Set input color to success
                this.bankInput.message = ''; // Clear message
            } else {
                this.bankInput.validation = false; // Set validation to false if no bank is selected
                this.bankInput.color = 'error'; // Set input color to error
                this.bankInput.message = 'Por favor selecciona un banco'; // Set error message
            }
        },
        handleAccountTypeInput() {
            // Method to validate account type input
            if (this.accountTypeInput.value !== 'Selecciona') {
                this.accountTypeInput.validation = true; // Set validation to true if an account type is selected
                this.accountTypeInput.color = 'success'; // Set input color to success
                this.accountTypeInput.message = ''; // Clear message
            } else {
                this.accountTypeInput.validation = false; // Set validation to false if no account type is selected
                this.accountTypeInput.color = 'error'; // Set input color to error
                this.accountTypeInput.message = 'Por favor selecciona un tipo de cuenta'; // Set error message
            }
        },
        /**
         * Handles the input validation for the account number field.
         * Validates the input based on several criteria and updates the
         * validation state, color, and message accordingly.
         */
        handleAccountNumberInput() {
            // Check if the input value is empty
            if (this.accountNumberInput.value == '') {
                this.accountNumberInput.validation = false; // Set validation to false
                this.accountNumberInput.color = 'error'; // Set color to indicate error
                this.accountNumberInput.message = 'Por favor ingresa un número de cuenta'; // Set error message
            }
            // Check if the input length is less than 10 characters
            else if (this.accountNumberInput.value.length < 10) {
                this.accountNumberInput.validation = false; // Set validation to false
                this.accountNumberInput.color = 'yellow-500'; // Set warning color
                this.accountNumberInput.message = 'El número de cuenta debe tener al menos 10 caracteres'; // Set warning message
            }
            // Check if the input length is greater than 18 characters
            else if (this.accountNumberInput.value.length > 18) {
                this.accountNumberInput.validation = false; // Set validation to false
                this.accountNumberInput.color = 'yellow-500'; // Set warning color
                this.accountNumberInput.message = 'El número de cuenta no puede tener más de 18 caracteres'; // Set warning message
            }
            // Check if the input contains only digits
            else if (!/^\d+$/.test(this.accountNumberInput.value)) {
                this.accountNumberInput.validation = false; // Set validation to false
                this.accountNumberInput.color = 'yellow-500'; // Set warning color
                this.accountNumberInput.message = 'El número de cuenta solo puede contener números'; // Set warning message
            }
            // If all validations pass
            else {
                this.accountNumberInput.validation = true; // Set validation to true
                this.accountNumberInput.color = 'success'; // Set color to indicate success
                this.accountNumberInput.message = ''; // Clear message
            }
        }, // Placeholder for handleAccountNumberInput method
        /**
         * Handles the validation of the account number confirmation input.
         * This function checks if the confirmation input is empty, does not match the original account number,
         * or is valid and matches the original account number.
         */
        handleAccountNumberConfirmInput() {
            // Check if the confirmation input is empty
            if (this.accountNumberConfirmInput.value == '') {
                this.accountNumberConfirmInput.validation = false; // Set validation to false
                this.accountNumberConfirmInput.color = 'error'; // Set color to indicate an error
                this.accountNumberConfirmInput.message = 'Por favor confirma el número de cuenta'; // Set error message
            }
            // Check if the confirmation input does not match the original account number
            else if (this.accountNumberConfirmInput.value !== this.accountNumberInput.value) {
                this.accountNumberConfirmInput.validation = false; // Set validation to false
                this.accountNumberConfirmInput.color = 'yellow-500'; // Set color to indicate a warning
                this.accountNumberConfirmInput.message = 'El número de cuenta no coincide'; // Set mismatch message
            }
            // Check if the confirmation input matches the original account number and is valid
            else if (
                this.accountNumberConfirmInput.value == this.accountNumberInput.value &&
                this.accountNumberInput.validation
            ) {
                this.accountNumberConfirmInput.validation = true; // Set validation to true
                this.accountNumberConfirmInput.color = 'success'; // Set color to indicate success
                this.accountNumberConfirmInput.message = ''; // Clear message on success
            }
        }, // Placeholder for handleAccountNumberConfirmInput method
        /**
         * Handles the validation of the interbank code input field.
         * Checks if the input is empty, has the correct length, and contains only numbers.
         * Updates the validation state, color, and message based on the input value.
         */
        handleInterbankCodeInput() {
            // Check if the input value is empty
            if (this.interbankCodeInput.value === '') {
                this.interbankCodeInput.validation = false; // Set validation to false
                this.interbankCodeInput.color = 'error'; // Set color to indicate error
                this.interbankCodeInput.message = 'Por favor ingresa un código interbancario'; // Set error message
                // Check if the input length is not equal to 20
            } else if (this.interbankCodeInput.value.length != 20) {
                this.interbankCodeInput.validation = false; // Set validation to false
                this.interbankCodeInput.color = 'yellow-500'; // Set color to indicate warning
                this.interbankCodeInput.message = 'El código interbancario debe tener 20 caracteres'; // Set warning message
                // Check if the input value does not match the numeric pattern
            } else if (!/^\d+$/.test(this.interbankCodeInput.value)) {
                this.interbankCodeInput.validation = false; // Set validation to false
                this.interbankCodeInput.color = 'yellow-500'; // Set color to indicate warning
                this.interbankCodeInput.message = 'El código interbancario solo puede contener números'; // Set warning message
                // If all validations pass
            } else {
                this.interbankCodeInput.validation = true; // Set validation to true
                this.interbankCodeInput.color = 'success'; // Set color to indicate success
                this.interbankCodeInput.message = ''; // Clear message
            }
        }, // Placeholder for handleInterbankCodeInput method
        /**
         * Handles the confirmation input for the interbank code.
         * Validates the input and sets the appropriate validation state, color, and message.
         */
        handleInterbankCodeConfirmInput() {
            // Check if the confirmation input is empty
            if (this.interbankCodeConfirmInput.value === '') {
                this.interbankCodeConfirmInput.validation = false; // Set validation to false
                this.interbankCodeConfirmInput.color = 'error'; // Set color to indicate an error
                this.interbankCodeConfirmInput.message = 'Por favor confirma el código interbancario'; // Set error message
            }
            // Check if the confirmation input does not match the original interbank code
            else if (this.interbankCodeConfirmInput.value !== this.interbankCodeInput.value) {
                this.interbankCodeConfirmInput.validation = false; // Set validation to false
                this.interbankCodeConfirmInput.color = 'yellow-500'; // Set color to indicate a warning
                this.interbankCodeConfirmInput.message = 'El código interbancario no coincide'; // Set mismatch message
            }
            // Check if the confirmation input matches the original interbank code and is valid
            else if (
                this.interbankCodeConfirmInput.value === this.interbankCodeInput.value &&
                this.interbankCodeInput.validation
            ) {
                this.interbankCodeConfirmInput.validation = true; // Set validation to true
                this.interbankCodeConfirmInput.color = 'success'; // Set color to indicate success
                this.interbankCodeConfirmInput.message = ''; // Clear message on successful validation
            }
        }, // Placeholder for handleInterbankCodeConfirmInput method
        /**
         * Handles the submission of a new bank account form.
         * Validates input fields and constructs a values object to be submitted.
         */
        onSubmitAddNewBankAccount() {
            // Validate bank input
            this.handleBankInput();
            // Validate account type input
            this.handleAccountTypeInput();
            // Validate account number input
            this.handleAccountNumberInput();
            // Validate account number confirmation input
            this.handleAccountNumberConfirmInput();
            // Validate interbank code input
            this.handleInterbankCodeInput();
            // Validate interbank code confirmation input
            this.handleInterbankCodeConfirmInput();

            // Check if all validations are successful
            if (
                this.bankInput.validation &&
                this.accountTypeInput.validation &&
                this.accountNumberInput.validation &&
                this.accountNumberConfirmInput.validation &&
                this.interbankCodeInput.validation &&
                this.interbankCodeConfirmInput.validation
            ) {
                // Construct values object with validated input data
                let values = {
                    name: this.appComponent.session.nombre, // User's name from session
                    bank: this.bankInput.value, // Selected bank
                    bank2: this.bankInput.value, // Duplicate bank value for confirmation
                    account_type: this.accountTypeInput.value, // Selected account type
                    account: this.accountNumberInput.value, // Account number
                    account2: this.accountNumberConfirmInput.value, // Confirmed account number
                    cod_interbank: this.interbankCodeInput.value, // Interbank code
                    cod_interbank2: this.interbankCodeConfirmInput.value, // Confirmed interbank code
                    client_type: {
                        name: 'Personal', // Client type name
                        value: '0', // Client type value
                        Id: '0', // Client type ID
                        Name: 'Personal', // Client type display name
                    },
                    country: this.appComponent.country, // Country from app component
                };
                // Submit the constructed values object
                this.onSubmit(values);
            }
        }, // Placeholder for onSubmitAddNewBankAccount method
        /**
         * Resets the form inputs to their initial state.
         * This method is typically called to clear the form fields and set default values.
         */
        onReset() {
            // Initializes the bank input with default values
            this.bankInput = {
                value: 'Selecciona', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
            // Initializes the account type input with default values
            this.accountTypeInput = {
                value: 'Selecciona', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
            // Initializes the account number input with default values
            this.accountNumberInput = {
                value: '', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
            // Initializes the account number confirmation input with default values
            this.accountNumberConfirmInput = {
                value: '', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
            // Initializes the interbank code input with default values
            this.interbankCodeInput = {
                value: '', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
            // Initializes the interbank code confirmation input with default values
            this.interbankCodeConfirmInput = {
                value: '', // Default display value
                color: 'accent-content', // CSS class for styling
                validation: false, // Validation status
                message: '', // Message to display for validation feedback
            };
        }, // Placeholder for onReset method
        /**
         * Registers a card token by making an API request.
         * This function constructs the parameters needed for the request
         * and handles the response to either proceed with credit card processing
         * or display an error notification.
         */
        registerCardToken() {
            // Define parameters for the API request
            const params = {
                currency: this.appComponent.session.moneda, // Currency from the session
                method: 'auth', // Method type for the request
                productId: this.appComponent.config.creditCard.idProduct ?? '6178', // Product ID for the card token registration
            };
            // Make an API request to register the card token
            apiService.request('register_card_token', params).then((response: any) => {
                // Check if the response code indicates success
                if (response.code === 0) {
                    // Verify if a session token was returned
                    if (response.sessiontoken !== null && response.sessiontoken !== '') {
                        // Proceed with credit card processing using the response
                        this.appComponent.creditCard(response);
                    } else {
                        // Prepare modal notification for error when session token is missing
                        this.appComponent.modal = {
                            showModal: 'notification', // Type of modal to show
                            titleModal: this.$t('Error!'), // Title of the modal
                            messageModal: this.$t('Ha ocurrido un error al intentar agregar la tarjeta de crédito.'), // Error message
                            buttonModal: this.$t('Aceptar'), // Button text for modal
                            orderModal: 'closeModal', // Action to take on modal close
                        };
                    }
                } else {
                    // Prepare modal notification for error based on response message
                    this.appComponent.modal = {
                        showModal: 'notification', // Type of modal to show
                        titleModal: this.$t('Error!'), // Title of the modal
                        messageModal: response.msg, // Error message from the response
                        buttonModal: this.$t('Aceptar'), // Button text for modal
                        orderModal: 'closeModal', // Action to take on modal close
                    };
                }
            });
        }, // Placeholder for registerCardToken method
    },
});</script>

<style scoped>
.history-title {
    /* Title color and font styling for history section */
    color: #fff;
    font-style: normal;
    font-weight: 800;
    line-height: 113.9%;
}
.history-title > strong {
    /* Strong text color within history title */
    color: v-bind(primary);
}
.history-description {
    /* Description text styling for history section */
    color: #e3e3e5;
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-size: 16px;
    font-style: normal;
    font-weight: 200;
    line-height: 23px;
}
.history-description > strong {
    /* Strong text styling within history description */
    font-weight: bold;
}
.information-description > strong {
    /* Strong text styling for information description */
    color: #c9c9c9;
    font-weight: bold;
}
.circle-background {
    /* Background circle styling with gradient for design */
    position: absolute;
    bottom: -70px;
    left: -20px;
    width: 500px;
    height: 473.474px;
    translate: revert;
    flex-shrink: 0;
    border-radius: 0 400px 400px 0;
    background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
}
.circle-background2 {
    /* Second background circle with different positioning */
    position: absolute;
    bottom: -130px;
    right: -80px;
    width: 500px;
    height: 473.474px;
    rotate: 180deg;
    flex-shrink: 0;
    border-radius: 0 440px 440px 0;
    background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
}
.circle-background3 {
    /* Third background circle with responsive width */
    position: absolute;
    bottom: -300px;
    right: -10px;
    width: 45vw;
    max-width: 600px;
    height: 500px;
    rotate: 180deg;
    flex-shrink: 0;
    border-radius: 0 400px 400px 0;
    background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
}
.circle-background-mobile {
    /* Mobile-specific background circle styling */
    width: 1000px;
    border-radius: 500px 0 0 0;
    background: linear-gradient(261deg, #e8bd70 39.99%, #edd185 93.9%);
}
@media (max-width: 1024px) {
    .circle-background3 {
        /* Adjustments for circle background on smaller screens */
        position: absolute;
        bottom: -40px;
        right: 0;
        width: 100%;
        height: 500px;
        rotate: 270deg;
        flex-shrink: 0;
        border-radius: 0 200px 200px 0;
        background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
    }
}
.animateImage {
    /* Animation for image with up-and-down effect */
    animation: 4s ease-in-out up-and-down infinite;
}
@keyframes up-and-down {
    /* Keyframes for up-and-down animation */
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}
@keyframes wipe-in-left {
    /* Keyframes for wipe-in-left animation */
    from {
        clip-path: inset(0 0 0 100%);
    }
    to {
        clip-path: inset(0 0 0 0);
    }
}
[transition-style='in:wipe:left'] {
    /* Animation for transition effect */
    animation: 2.5s cubic-bezier(0.25, 1, 0.3, 1) wipe-in-left both;
}
.creditCardSelected,
.creditCard:hover {
    /* Background gradient for selected or hovered credit card */
    background: linear-gradient(108deg, #2ec2e4 0.95%, #986bfa 94.45%);
}
.title {
    /* Title styling with semi-transparent color */
    color: rgba(255, 255, 255, 0.6);
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 10.807px;
}
.dotted-border {
    /* Dotted border styling */
    border-bottom: 20px dotted;
}
.scrollWidth::-webkit-scrollbar {
    /* Custom scrollbar width */
    width: 0.2em;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    /* Remove default spin buttons for number input */
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    /* Style number input to appear as text field */
    -moz-appearance: textfield;
}
.step::after {
    /* Step indicator styling */
    background-color: v-bind(secondary);
    width: 20px;
    height: 20px;
}
.step::before {
    /* Dashed border for step indicator */
    background-color: transparent;
    height: 1px;
    border: v-bind(secondary) 1px dashed;
}
.step-primary::after {
    /* Primary step indicator styling */
    background-color: #8ecddd;
    width: 20px;
    height: 20px;
    color: black;
}
.step-success::after {
    /* Success step indicator styling */
    background-color: green;
    width: 20px;
    height: 20px;
}
.step-error::after {
    /* Error step indicator styling */
    background-color: red;
    width: 20px;
    height: 20px;
}
.animationLeft {
    /* Animation for sliding in from the left */
    animation: 250ms ease-in-out 0s 1 normal forwards running animationLeft;
}
@keyframes animationLeft {
    /* Keyframes for left slide animation */
    0% {
        opacity: 0;
        transform: translateX(-200px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
.animationRight {
    /* Animation for sliding in from the right */
    animation: 250ms ease-in-out 0s 1 normal forwards running animationRight;
}
@keyframes animationRight {
    /* Keyframes for right slide animation */
    0% {
        opacity: 0;
        transform: translateX(200px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
.animationUp {
    /* Animation for sliding in from above */
    animation: 250ms ease-in-out 0s 1 normal forwards running animationUp;
}
@keyframes animationUp {
    /* Keyframes for upward slide animation */
    0% {
        opacity: 0;
        transform: translateY(200px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
.steps-withdraw > .steps > .step::after {
    /* Step indicator for withdrawal steps */
    background-color: v-bind(primary_focus);
    width: 38px;
    height: 38px;
    box-shadow: 2px 2px 8px 0px rgba(132, 96, 31, 0.4) inset;
}
.steps-withdraw > .steps > .step::before {
    /* Dashed border for withdrawal step indicator */
    border: v-bind(primary_focus) 1px dashed;
}
.step-edit {
    /* Edit step indicator styling */
    background-color: v-bind(primary_focus);
    width: 35px;
    height: 35px;
    box-shadow: 1.4px 1.4px 5.6px 0px rgba(132, 96, 31, 0.4) inset;
}
.radio-custom:hover > div {
    /* Background color change on hover for custom radio button */
    background-color: v-bind(primary);
}
</style>


<!-- FILE DOCUMENTED -->
