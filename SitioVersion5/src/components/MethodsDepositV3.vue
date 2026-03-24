<template>
    <section v-if="isLoading"
    class="w-full h-full flex flex-col justify-center items-center gap-2 m-auto overflow-scroll md:overflow-hidden">
    <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 w-6 h-6 rounded-full z-20"/>
    <div class="hidden md:block mt-4">
        <AnimatedPlaceholder class="bg-base-100 w-[72px] h-4 rounded-xl"/>
    </div>
        <!-- Section displayed when the component is in a loading state -->
        <div class="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 md:px-6 pt-0 md:pt-4 pb-4">
            <div class="w-full max-w-[420px] md:max-w-[220px] h-auto md:h-[407px] flex flex-col justify-center items-center md:gap-8 gap-4 z-0 md:z-10">
                <div class="w-[240px] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8 mx-auto">
                    <div class="md:mt-0 mt-10 relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[240px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50">
                    <AnimatedPlaceholder class="w-36 h-4 bg-base-100 rounded-xl mb-3" />
                    <div class="w-auto md:w-full flex justify-center items-center gap-4">
                        <AnimatedPlaceholder class="absolute left-2 h-7 w-7 rounded-full bg-base-100"/>
                        <AnimatedPlaceholder class="w-24 md:w-32 h-12 bg-base-100 rounded-xl"/>
                        <AnimatedPlaceholder class="absolute right-2 h-7 w-7 rounded-full bg-base-100"/>
                        <AnimatedPlaceholder class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-base-100 rounded-full"/>
                    </div>
                    </div>
                    <div class="min-w-32 w-[95%] flex justify-between items-center">
                        <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                        <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                        <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                    </div>
                </div>
                <div
                    v-if="categoryGames !== '' && gamesList.length > 0"
                    class="w-full h-20 md:h-full flex justify-center items-center">
                    <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                        <AnimatedPlaceholder class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-base-100 opacity-40"/>
                        <div class="absolute grid grid-cols-2 overflow-hidden rounded-[15px] w-[145px] h-[145px]">
                            <AnimatedPlaceholder v-for="i in 4" class="w-[72px] h-[72px]"/>
                        </div>
                    </div>
                </div>
             </div>
             <div v-if="methods.length > 1" class="w-full max-w-[95%] h-full flex flex-col justify-start items-center gap-2 md:gap-8 z-10 rounded-xl p-4 bg-base-300">
                    <div class="w-[100%] flex flex-col items-center gap-3 pl-2">
                        <AnimatedPlaceholder class="w-[324px] h-[21px] bg-base-100 rounded-xl" />
                        <AnimatedPlaceholder class="w-[324px] h-[21px] bg-base-100 rounded-xl" />
                    </div>
                    <div class="w-full flex flex-wrap justify-center gap-2 md:gap-4 z-10 min-h-[270px] md:min-h-[300px] [&>*]:basis-[calc(50%-0.5rem)] [&>*]:max-w-[calc(50%-0.5rem)] md:[&>*]:basis-[calc(50%-1rem)] md:[&>*]:max-w-[calc(50%-1rem)] [&>*:nth-child(3):last-child]:mx-auto">
                        <div v-for="m in methods">
                            <AnimatedPlaceholder class="relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-base-100 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2">
                                <div class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-gradient-to-t from-neutral-content/10 to-neutral-content">
                                    <AnimatedPlaceholder class="w-8 h-7 bg-base-100 rounded-xl" />
                                </div>
                                <AnimatedPlaceholder class="w-40 h-3 bg-base-100 rounded-xl" />
                                <AnimatedPlaceholder class="w-40 h-3 bg-base-100 rounded-xl" />
                            </AnimatedPlaceholder>
                        </div>
                    </div>
             </div>
             <div v-else class="relative w-[305px] md:w-[410px] max-h-[300px] md:h-[407px] md:max-h-[407px] md:aspect-square flex justify-center items-start gap-2 z-1 pl-3 py-3 pr-2 rounded-box overflow-hidden bg-base-300">
                <div class="w-[288px] md:w-full gridList max-h-[283px] md:max-h-[380px] overflow-y-scroll overflow-x-hidden z-10 scroll-edit">
                    <div v-for="i in 9" class="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                        <AnimatedPlaceholder class="w-[88px] md:w-[118px] h-[88px] md:h-[112px] flex flex-col justify-center items-center rounded-[20px] bg-base-100" />
                    </div>
                </div>
             </div>
        </div>
    </section>
    <div
        v-if="isLoading || isLoadingMethod"
        class="absolute left-0 top-1 z-50 pl-3"
        >
        <div class="flex items-center gap-3">
            <AnimatedPlaceholder
                v-if="methodSelected.id != 'empty' && methods.length != 1"
                class="bg-base-100 w-6 h-6 rounded-full"
            />

            <!-- Texto skeleton (Visual anterior) -->
            <div class="flex flex-col items-start leading-4">
            <AnimatedPlaceholder
                class="bg-base-100 h-3 w-14 rounded-md mb-1"
            />
            <AnimatedPlaceholder
                class="bg-base-100 h-3 w-10 rounded-md"
            />
            </div>

            <!-- Switch skeleton -->
            <AnimatedPlaceholder
            class="bg-base-100 w-16 h-8 rounded-full"
            />

        </div>
    </div>
    <div
        v-if="
            !isLoadingMethod &&
            appComponent.config.depositsView != undefined &&
            appComponent.config.depositsView[
                appComponent.country
            ] != undefined &&
            appComponent.config.depositsView[
                appComponent.country
            ].switch !== undefined &&
            appComponent.config.depositsView[
                appComponent.country
            ].switch &&
            appComponent.config.depositsView[
                appComponent.country
            ].on !== undefined &&
            appComponent.config.depositsView[
                appComponent.country
            ].on &&
            !isLoading &&
            !route.path.includes('/gestion/deposito')
        "
        class="absolute top-1  z-50"
        :class="methodSelected.id != 'empty' && methods.length != 1 ? 'left-[3rem]' : 'left-4'"
    >
        <!-- Container for the view switch when specific conditions are met -->
        <label class="label cursor-pointer">
            <!-- Label for the view switch with an image -->
            <span
                class="label-text relative text-neutral text-xs font-bold w-14 leading-4"
            >
                <!-- Text indicating the previous view -->
                {{ $t('Visual anterior') }}
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
                    alt=""
                    class="absolute -top-1 right-1"
                />
            </span>
            <!-- Switch control for toggling between views -->
            <label
                class="swap text-9xl flex justify-center items-center relative transition-all duration-700 ease-in-out cursor-pointer scale-110"
            >
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901670.png"
                    alt=""
                />
                <!-- Hidden checkbox for the switch -->
                <input
                    type="checkbox"
                    class="hidden"
                    v-model="newView"
                    @click="handleChangeWithdrawalsView()"
                    data-analytics-label="deposit:toggle-visual"
                    :data-analytics-context="`component:MethodsDepositV3|layout:${newView ? 'new' : 'old'}`"
                />
                <!-- Images representing the switch states -->
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901547.png"
                    alt=" "
                    class="swap-off absolute -left-[2px]"
                />
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901521.png"
                    alt=" "
                    class="swap-on absolute -right-3"
                />
            </label>
        </label>
    </div>
    <div v-if="isLoadingMethod && step === 'addCreditCardForm'"
        class="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
        <AnimatedPlaceholder class="h-6 w-40 rounded-full bg-base-100 mt-4" />
        <div class="w-full h-[95%] flex flex-col md:flex-row gap-5 justify-center items-center md:gap-6 md:px-6">
            <AnimatedPlaceholder
                class="w-[152px] md:w-[95%] max-w-[217px] h-[180px] md:h-[260px] rounded-box bg-base-100"
            />
            <div class="w-full md:w-[65%] h-[40rem] md:h-[407px] rounded-2xl md:bg-base-400/40 p-4">
                <div class="h-full w-full flex flex-col gap-6">
                    <AnimatedPlaceholder class="w-[70%] h-[180px] mx-auto rounded-xl bg-base-100" />
                    <div class="flex flex-col gap-4 mt-6">
                        <div class="flex flex-col gap-2">
                            <AnimatedPlaceholder class="h-4 w-32 rounded bg-base-100" />
                            <AnimatedPlaceholder class="h-10 w-full rounded-full bg-base-100" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <AnimatedPlaceholder class="h-4 w-24 rounded bg-base-100" />
                            <AnimatedPlaceholder class="h-10 w-full rounded-full bg-base-100" />
                        </div>
                        <div class="flex gap-4">
                            <div class="w-full flex flex-col gap-2">
                                <AnimatedPlaceholder class="h-4 w-28 rounded bg-base-100" />
                                <AnimatedPlaceholder class="h-10 w-full rounded-full bg-base-100" />
                            </div>

                            <div class="w-full flex flex-col gap-2">
                                <AnimatedPlaceholder class="h-4 w-16 rounded bg-base-100" />
                                <AnimatedPlaceholder class="h-10 w-full rounded-full bg-base-100" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <AnimatedPlaceholder class="h-4 w-20 rounded bg-base-100" />
                            <AnimatedPlaceholder class="h-10 w-full rounded-full bg-base-100" />
                        </div>
                    </div>
                    <div class="w-full flex justify-between gap-4 mt-auto pt-6">
                        <AnimatedPlaceholder class="h-10 w-24 rounded-full bg-base-100" />
                        <AnimatedPlaceholder class="h-10 w-28 rounded-full bg-base-100" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button v-if="!isLoading && !isLoadingMethod && methodSelected.id != 'empty' && methods.length != 1"
            class="absolute left-3 top-3 hover:scale-125 z-50 stroke-accent-focus"
            @click="prevStep"
    >
        <!-- Button to reset the selected method when a method is already selected -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-chevron-left-icon lucide-chevron-left">
            <!-- Left arrow icon -->
            <path d="m15 18-6-6 6-6" />
        </svg>
    </button>

    <section v-if="!isLoading && step === 0" class="w-full h-full flex flex-col justify-center items-center gap-2 overflow-scroll md:overflow-hidden">
        <!-- Title of the dialog -->
        <h3 v-if="!noGateways && !isLoadingMethod" class="text-base md:text-lg text-center font-bold capitalize mt-4 text-neutral">
            {{ $t('Depósito') }}</h3>
        <div
            class="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 md:px-6 pt-0 md:pt-4 pb-4">
            <DepositAmount
            v-if="!isLoadingMethod && !noGateways"
            :amountDeposit="amountDeposit"
            :lastDepositAmount="lastDepositAmount"
            :franchiseSelected="franchiseSelected"
            :methodSelected="methodSelected"
            :categoryGames="categoryGames"
            :gamesList="gamesList"
            :appComponent="appComponent"
            @update:amountDeposit="amountDeposit = $event"
            />

            <!-- Horizontal rule used as a separator, hidden on medium and larger screens -->
            <hr class="md:hidden border-secondary w-[90%] md:w-full my-2" />

            <!-- Container displayed when a method is loading -->
            <div
                v-if="isLoadingMethod && methodSelected.id === 'fri_gateway_deposit'"
                class="text-base-content content-center md:h-[25rem] md:w-full h-[40rem]"
                >
                <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 w-6 h-6 rounded-full z-20"/>
                <div class="flex justify-center items-center">
                        <AnimatedPlaceholder class="absolute top-3 bg-base-100 w-[50px] md:w-[72px] h-4 rounded-xl"/>
                    </div>
                <div class="rounded-2xl overflow-visible p-0 relative">
                    <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 hover:scale-125 z-50 stroke-accent-focus fill-accent-focus"/>
                    <div class="container-data md:flex items-center">
                        <div class="h-full flex justify-center md:items-start">
                            <AnimatedPlaceholder class="bg-base-100 w-[10rem] mt-4 md:mt-0 md:w-[17rem] h-[10rem] md:h-[20rem] rounded-xl"/>
                        </div>
                        <div class="w-full md:w-[75%] flex justify-center items-center">
                            <div class="bg-base-200 p-4 h-[20rem] rounded-xl md:m-4 w-full md:w-[30rem] text-center">
                            <AnimatedPlaceholder class="bg-base-100 h-6 w-48 mx-auto mb-6 rounded-full" />
                            <AnimatedPlaceholder class="bg-base-100 h-12 w-full rounded-full mb-4" />
                            <AnimatedPlaceholder class="bg-base-100 h-12 w-full rounded-full mb-6" />
                            <AnimatedPlaceholder class="bg-base-100 h-10 w-full rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="isLoadingMethod && methodSelected.id === 'credit_card'" class="mt-[100px] md:mt-0 w-full h-full flex flex-col gap-4 p-4 z-10 justify-center">
                <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 w-6 h-6 rounded-full z-40"/>
                    <div class="flex justify-center items-center mt-4">
                        <AnimatedPlaceholder class="bg-base-100 w-[50px] md:w-[72px] h-4 rounded-xl"/>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4 mx-4">
                        <div class="relative w-full max-w-[420px] md:max-w-[220px] h-auto md:h-[407px] flex flex-col justify-center items-center md:gap-8 gap-4 z-0 md:z-10">
                            <div class="w-[240px] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8 mx-auto">
                                <div class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[240px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50">
                                <AnimatedPlaceholder class="w-36 h-4 bg-base-100 rounded-xl mb-3" />
                                <div class="w-auto md:w-full flex justify-center items-center gap-4">
                                    <AnimatedPlaceholder class="absolute left-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="w-24 md:w-32 h-12 bg-base-100 rounded-xl"/>
                                    <AnimatedPlaceholder class="absolute right-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-base-100 rounded-full"/>
                                </div>
                                </div>
                                <div class="min-w-32 w-[95%] flex justify-between items-center">
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                </div>
                            </div>
                            <div
                                v-if="categoryGames !== '' && gamesList.length > 0"
                                class="w-full h-20 md:h-full flex justify-center items-center">
                                <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                                    <AnimatedPlaceholder class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-base-100 opacity-40"/>
                                    <div class="absolute grid grid-cols-2 overflow-hidden rounded-[15px] w-[145px] h-[145px]">
                                        <AnimatedPlaceholder v-for="i in 4" class="w-[72px] h-[72px]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-[28%] md:h-[30rem] p-2 md:p-6 rounded-xl bg-base-400/40 pb-10 md:pb-3">
                            <div
                                class="w-full h-[90%] flex items-start overflow-y-scroll scroll-edit"
                            >
                                <div class="w-full grid grid-cols-2 grid-rows-3 justify-items-center items-center gap-2">
                                    <div
                                v-for="(card, index) in (credit_cards.length ? credit_cards : Array(2).fill({}))"
                                :key="'skeleton-' + index"
                                class="flex justify-between items-center h-32 w-full border rounded-xl relative p-4"
                            >
                                <div class="absolute top-2 left-3">
                                    <AnimatedPlaceholder class="h-8 w-12 rounded bg-base-100" />
                                </div>
                                <div class="absolute top-3 right-3">
                                    <AnimatedPlaceholder class="h-5 w-5 rounded-full bg-base-100" />
                                </div>
                                <div class="flex flex-col w-full h-full justify-end gap-2">
                                    <AnimatedPlaceholder class="h-4 w-28 rounded bg-base-100" />
                                    <AnimatedPlaceholder class="h-[1px] w-full bg-base-100" />
                                    <div class="w-full flex items-end justify-end">
                                        <AnimatedPlaceholder class="h-3 w-16 rounded bg-base-100" />
                                    </div>
                                    <AnimatedPlaceholder
                                        v-if="card.activateCvc == 'S'"
                                        class="h-6 w-full rounded-full bg-base-100"
                                    />
                                </div>
                            </div>
                                </div>

                            </div>

                            <div class="w-full flex items-center justify-end py-3">
                                <AnimatedPlaceholder class="h-10 w-32 rounded-full bg-base-100" />
                            </div>
                        </div>
                    </div>
            </div>
            <div v-else-if="isLoadingMethod && methodSelected.id === 'deposit_access'" class="w-full h-full flex flex-col justify-center items-center gap-2 mt-10 md:m-auto stroke-accent-focus">
                <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 w-6 h-6 rounded-full z-20"/>
                <div class="mt-4">
                        <AnimatedPlaceholder class="bg-base-100 w-[72px] h-4 rounded-xl"/>
                    </div>
                    <!-- Section displayed when the component is in a loading state -->
                    <div class="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 md:px-6 pt-0 md:pt-4 pb-4">
                        <div class="relative w-full max-w-[420px] md:max-w-[220px] h-auto md:h-[407px] flex flex-col justify-center items-center md:gap-8 gap-4 z-0 md:z-10">
                            <div class="w-[240px] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8 mx-auto">
                                <div class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[240px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50">
                                <AnimatedPlaceholder class="w-36 h-4 bg-base-100 rounded-xl mb-3" />
                                <div class="w-auto md:w-full flex justify-center items-center gap-4">
                                    <AnimatedPlaceholder class="absolute left-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="w-24 md:w-32 h-12 bg-base-100 rounded-xl"/>
                                    <AnimatedPlaceholder class="absolute right-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-base-100 rounded-full"/>
                                </div>
                                </div>
                                <div class="min-w-32 w-[95%] flex justify-between items-center">
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                </div>
                            </div>
                            <div
                                v-if="categoryGames !== '' && gamesList.length > 0"
                                class="w-full h-20 md:h-full flex justify-center items-center">
                                <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                                    <AnimatedPlaceholder class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-base-100 opacity-40"/>
                                    <div class="absolute grid grid-cols-2 overflow-hidden rounded-[15px] w-[145px] h-[145px]">
                                        <AnimatedPlaceholder v-for="i in 4" class="w-[72px] h-[72px]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="relative w-[305px] md:w-[410px] max-h-[300px] md:h-[407px] md:max-h-[407px] md:aspect-square flex justify-center items-start gap-2 z-1 pl-3 py-3 pr-2 rounded-box overflow-hidden bg-base-300">
                            <div class="w-[288px] md:w-full gridList max-h-[283px] md:max-h-[380px] overflow-y-scroll overflow-x-hidden z-10 scroll-edit">
                                <div v-for="i in 9" class="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                                    <AnimatedPlaceholder class="w-[88px] md:w-[118px] h-[88px] md:h-[112px] flex flex-col justify-center items-center rounded-[20px] bg-base-100" />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
           <div v-else-if="noGateways" class="flex flex-col items-center justify-center w-full gap-5 z-10">
                <div class="rounded-full border-error border-3 bg-transparent p-5">
                    <IconClose class="w-12 h-12 text-error" />
                </div>
                <div class="flex flex-col items-center justify-center text-center font-poppinsb gap-3">
                    <div class="text-neutral flex gap-1">
                        <span> {{ $t('Actualmente no hay pasarelas habilitadas')}} </span>
                    </div>
                </div>
                <div
                    @click="handleGatewaySelected()"
                    class="rounded-full bg-primary px-5 py-2 text-neutral cursor-pointer font-semibold">
                    <span>
                        {{ $t('Intenta nuevamente') }}
                    </span>
                </div>
           </div>

            <div v-if="!isLoadingMethod && methodSelected.id === 'empty' "
                 class="w-full max-w-[95%] h-full flex flex-col justify-start items-center gap-2 md:gap-8 z-10 bg-base-400/40 rounded-xl p-4">

                <div class="w-[100%] flex flex-col items-center gap-3 pl-2">
                    <h2 class="font-poppinssb text-primary">
                        {{$t('Métodos de pago')}}
                    </h2>

                    <p class="font-poppinssl text-center text-neutral">
                        {{$t('Escoge el método de pago para continuar con tu depósito')}}
                    </p>
                </div>

                <div
                    v-if="lastUsedFranchises && lastUsedFranchisesList.length > 0"
                    class="relative w-full min-h-[65px] md:min-h-[127px] grid grid-cols-3 p-2 md:p-6 bg-gradient-to-b from-base-100/50 to-base-content/50 to-10% rounded-box md:rounded-[40px] shadow-inner">
                    <!-- Container for displaying the last used franchises if available -->

                    <div
                        class="absolute left-0 right-0 top-0 bottom-0 w-full h-full overflow-hidden rounded-box md:rounded-[40px]">
                        <!-- Background image for the last used franchises section -->
                        <img
                            v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['backgroundGradientLastUsedFranchises'] !== undefined"
                            :src="appComponent.config.depositsView[appComponent.country]['backgroundGradientLastUsedFranchises']"
                            alt="background-modal"
                            class="w-full h-full object-cover z-1 opacity-50" />
                    </div>

                    <button
                        class="absolute -right-2 md:-right-3 top-[41%] h-6 md:h-8 w-6 md:w-8 hidden md:flex justify-center items-center rounded-full bg-base-00/80 hover:scale-110 cursor-pointer stroke-accent-focus border-[0.5px] border-accent-focus shadow-md shadow-base-content/50"
                        :disabled="methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit"
                        @click="handleMethodSelected(methods.find(method => method.id === 'payment_gateway'))"
                    >
                        <!-- Button to select the payment gateway method -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"
                             stroke-linejoin="round"
                             class="lucide lucide-chevron-right-icon lucide-chevron-right">
                            <!-- Right arrow icon -->
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    <button
                        v-for="(franchise, index) in lastUsedFranchisesList.slice(0, 3)"
                        :disabled="methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit"
                        :key="index"
                        :class="{
                            'relative min-w-[80px] w-full max-w-[112px] h-[70px] md:h-[81px] flex flex-col justify-center items-center overflow-hidden rounded-box border-2 border-white/25 hover:scale-105 z-10 shadow-lg shadow-base-content m-auto': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit
                        }"
                        @click="handleFranchiseSelected(franchise.id_franquicia)"
                    >
                        <!-- Button for each franchise in the last used franchises list -->
                        <img :src="franchise.imagen" :alt="'franchise' + index"
                             class="w-full h-full object-cover object-center z-1" />
                        <span
                            class="absolute bottom-2 mx-auto text-[9px] md:text-xs text-center font-light text-neutral z-10">
                            <!-- Text displaying the minimum deposit amount -->
                            {{ $t('Desde') }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'payment_gateway').amount_min }}
                        </span>
                    </button>
                </div>

                <div v-if="methods.length === 0"
                     class="w-full h-full flex justify-center items-center grid-rows-2 gap-2 md:gap-6 z-10">
                    <!-- Section displayed when no deposit methods are available -->
                    <div
                        class="w-full h-full md:min-h-[266px] flex justify-center items-center">
                        <span class="text-xs md:text-base text-center">
                            <!-- Message indicating no deposit methods are available -->
                            {{ $t('No hay métodos de depósito disponibles') }}
                        </span>
                    </div>
                </div>

                <!-- Container for displaying deposit methods -->
                <!-- This grid layout organizes the deposit methods into 3 columns and 2 rows -->
                <!-- The gap between items adjusts for different screen sizes (default and medium) -->
                <div v-else class="w-full flex flex-wrap justify-center gap-2 md:gap-4 z-10 min-h-[270px] md:min-h-[300px]
                              [&>*]:basis-[calc(50%-0.5rem)] [&>*]:max-w-[calc(50%-0.5rem)]
                              md:[&>*]:basis-[calc(50%-1rem)] md:[&>*]:max-w-[calc(50%-1rem)]
                              [&>*:nth-child(3):last-child]:mx-auto">
                    <button
                        v-if="methods.some(method => method.id === 'bank_accounts')"
                        :disabled="methods.find(method => method.id === 'bank_accounts').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'bank_accounts').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'bank_accounts'))"
                    >
                        <div v-if="methods.find(method => method.id === 'bank_accounts').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'bank_accounts').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'bank_accounts').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 109 110"
                                 fill="none" class="md:hidden">
                                <path d="M9.073 57.7521H86.1934" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M86.1934 47.1822V79.6182C86.0573 92.5472 82.5187 95.8135 69.0453 95.8135H26.2211C12.5209 95.8135 9.073 92.4111 9.073 78.8924V47.1822C9.073 34.9337 11.931 30.9869 22.6825 30.3518C23.7712 30.3065 24.9509 30.2611 26.2211 30.2611H69.0453C82.7456 30.2611 86.1934 33.6635 86.1934 47.1822Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M99.8028 31.0775V62.7876C99.8028 75.0362 96.9448 78.9829 86.1933 79.618V47.1821C86.1933 33.6633 82.7454 30.2609 69.0452 30.2609H26.221C24.9508 30.2609 23.7711 30.3063 22.6824 30.3517C22.8185 17.4226 26.3571 14.1564 39.8305 14.1564H82.6547C96.3549 14.1564 99.8028 17.5587 99.8028 31.0775Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M23.8167 81.3422H31.6193" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M41.3274 81.3422H56.933" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 109 110"
                                 fill="none" class="hidden md:block">
                                <path d="M9.073 57.7521H86.1934" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M86.1934 47.1822V79.6182C86.0573 92.5472 82.5187 95.8135 69.0453 95.8135H26.2211C12.5209 95.8135 9.073 92.4111 9.073 78.8924V47.1822C9.073 34.9337 11.931 30.9869 22.6825 30.3518C23.7712 30.3065 24.9509 30.2611 26.2211 30.2611H69.0453C82.7456 30.2611 86.1934 33.6635 86.1934 47.1822Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M99.8028 31.0775V62.7876C99.8028 75.0362 96.9448 78.9829 86.1933 79.618V47.1821C86.1933 33.6633 82.7454 30.2609 69.0452 30.2609H26.221C24.9508 30.2609 23.7711 30.3063 22.6824 30.3517C22.8185 17.4226 26.3571 14.1564 39.8305 14.1564H82.6547C96.3549 14.1564 99.8028 17.5587 99.8028 31.0775Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M23.8167 81.3422H31.6193" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M41.3274 81.3422H56.933" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Cuentas bancarias')
                            }}</span>
                        <span class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'bank_accounts').amount_min }}</span>
                    </button>
                    <PaymentMethodCard
                      v-if="methods.some(m => m.id === 'deposit_access')"
                      :method="methods.find(m => m.id === 'deposit_access')"
                      :amountDeposit="amountDeposit"
                      :currency="appComponent.session.simbolo_moneda"
                      title="Pasarela de Pago"
                      @select="handleGatewaySelected"
                      data-analytics-label="deposit:method:deposit-access"
                      data-analytics-position="1"
                      data-analytics-context="step:select-method|step-num:1|method:deposit-access"
                    >
                      <template #icon>
                        <GangwayIcon />
                      </template>
                    </PaymentMethodCard>

                    <PaymentMethodCard
                        v-if="methods.some(m => m.id === 'credit_card')"
                        :method="methods.find(m => m.id === 'credit_card')"
                        :amountDeposit="amountDeposit"
                        :currency="appComponent.session.simbolo_moneda"
                        title="Tarjeta de Crédito"
                        @select="handleMethodSelected"
                        data-analytics-label="deposit:method:credit-card"
                        data-analytics-position="1"
                        data-analytics-context="step:select-method|step-num:1|method:credit-card"
                      >
                        <!-- Ícono específico dentro del slot -->
                        <template #icon>
                            <TarjetIcon></TarjetIcon>
                        </template>
                    </PaymentMethodCard>
                    <PaymentMethodCard
                      v-if="paymentsConfigured?.some(p => p.externo_id?.toLowerCase() === 'fri')"
                      :method="methods.find(m => m.id === 'fri_gateway_deposit')"
                      :amountDeposit="amountDeposit"
                      :currency="appComponent.session.simbolo_moneda"
                      title="FRI"
                      @select="handlePaymentCard"
                      data-analytics-label="deposit:method:fri-gateway-deposit"
                      data-analytics-position="1"
                      data-analytics-context="step:select-method|step-num:1|method:fri_gateway_deposit"
                    >
                      <template #icon>
                        <FriIcon />
                      </template>

                      <div
                        v-if="paymentsConfigured?.[0]?.configured === true"
                        class="mt-2 w-full"
                      >
                        <button
                          class="bg-primary/40 text-primary w-full rounded-xl hover:bg-primary hover:text-white transition"
                          @click.stop="handleDeposit({ service: paymentsConfigured[0].id })"
                        >
                          Depositar
                        </button>
                      </div>
                    </PaymentMethodCard>

                    <button
                        v-if="methods.some(method => method.id === 'payment_gateway')"
                        :disabled="methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'payment_gateway'))"
                        data-analytics-label="deposit:method:payment-gateway"
                        data-analytics-position="1"
                        data-analytics-context="step:select-method|step-num:1|method:payment_gateway"
                    >
                        <div v-if="methods.find(method => method.id === 'payment_gateway').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'payment_gateway').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'payment_gateway').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="11" viewBox="0 0 690 126"
                                 fill="none" class="md:hidden">
                                <path
                                    d="M336.441 27.2189H349.369C347.723 31.6796 344.063 41.8571 338.39 57.7513C334.146 69.7045 330.595 79.4489 327.736 86.9845C320.98 104.741 316.216 115.568 313.444 119.466C310.673 123.364 305.909 125.313 299.153 125.313C297.507 125.313 296.229 125.248 295.32 125.118C294.454 124.988 293.371 124.749 292.072 124.403V113.749C294.107 114.312 295.58 114.659 296.489 114.789C297.399 114.918 298.2 114.983 298.893 114.983C301.058 114.983 302.639 114.615 303.635 113.879C304.674 113.186 305.541 112.32 306.234 111.281C306.45 110.934 307.23 109.158 308.572 105.954C309.915 102.749 310.889 100.367 311.495 98.8077L285.77 27.2189H299.023L317.667 83.8663L336.441 27.2189Z"
                                    fill="white" />
                                <path
                                    d="M258.292 7.79553H270.115V27.2194H281.224V36.7689H270.115V82.1778C270.115 84.6031 270.938 86.2271 272.584 87.05C273.493 87.5264 275.009 87.7646 277.131 87.7646C277.694 87.7646 278.301 87.7646 278.95 87.7646C279.6 87.7213 280.358 87.6563 281.224 87.5697V96.7944C279.881 97.1842 278.474 97.4657 277.001 97.6389C275.572 97.8121 274.013 97.8988 272.324 97.8988C266.867 97.8988 263.164 96.5129 261.215 93.7411C259.267 90.9261 258.292 87.2882 258.292 82.8274V36.7689H248.873V27.2194H258.292V7.79553Z"
                                    fill="white" />
                                <path
                                    d="M210.869 25.6603C215.806 25.6603 220.592 26.8296 225.226 29.1683C229.86 31.4636 233.389 34.4519 235.815 38.1331C238.153 41.6411 239.712 45.7337 240.492 50.4111C241.185 53.6159 241.531 58.7263 241.531 65.7422H190.536C190.752 72.8015 192.42 78.4749 195.538 82.7625C198.656 87.0067 203.485 89.1288 210.024 89.1288C216.131 89.1288 221.003 87.115 224.641 83.0873C226.72 80.7486 228.192 78.0418 229.058 74.9669H240.557C240.254 77.5221 239.236 80.3805 237.504 83.542C235.815 86.6602 233.909 89.2154 231.787 91.2076C228.236 94.6723 223.84 97.0109 218.599 98.2236C215.784 98.9165 212.601 99.263 209.05 99.263C200.388 99.263 193.047 96.1231 187.028 89.8434C181.008 83.5204 177.998 74.6854 177.998 63.3386C177.998 52.165 181.029 43.0919 187.093 36.1193C193.156 29.1466 201.081 25.6603 210.869 25.6603ZM229.513 56.4526C229.037 51.3855 227.932 47.3362 226.2 44.3046C222.995 38.6745 217.647 35.8594 210.154 35.8594C204.784 35.8594 200.28 37.8083 196.642 41.7061C193.004 45.5605 191.077 50.476 190.86 56.4526H229.513Z"
                                    fill="white" />
                                <path
                                    d="M147.791 16.6304C147.964 11.7799 148.808 8.2286 150.324 5.97657C153.052 1.99219 158.314 0 166.11 0C166.846 0 167.604 0.0216542 168.384 0.0649627C169.163 0.108271 170.051 0.173234 171.047 0.259851V10.9137C169.835 10.8271 168.947 10.7838 168.384 10.7838C167.864 10.7405 167.366 10.7188 166.89 10.7188C163.338 10.7188 161.216 11.65 160.523 13.5122C159.83 15.3312 159.484 20.0085 159.484 27.5442H171.047V36.7689H159.354V96.7944H147.791V36.7689H138.111V27.5442H147.791V16.6304Z"
                                    fill="white" />
                                <path
                                    d="M79.7743 78.2802C79.7743 81.6583 81.0086 84.3217 83.4771 86.2706C85.9457 88.2195 88.869 89.1939 92.2471 89.1939C96.3614 89.1939 100.346 88.2411 104.2 86.3356C110.696 83.1741 113.945 77.9987 113.945 70.8095V61.3899C112.515 62.2994 110.675 63.0573 108.423 63.6636C106.171 64.2699 103.962 64.703 101.797 64.9629L94.7157 65.8723C90.4714 66.4353 87.2883 67.3232 85.1662 68.5358C81.5716 70.5713 79.7743 73.8194 79.7743 78.2802ZM108.098 54.6338C110.783 54.2873 112.58 53.1613 113.49 51.2557C114.01 50.2163 114.269 48.7222 114.269 46.7733C114.269 42.7889 112.84 39.9089 109.982 38.1333C107.167 36.3143 103.118 35.4048 97.8339 35.4048C91.7274 35.4048 87.3965 37.0506 84.8413 40.342C83.4122 42.161 82.481 44.8677 82.048 48.4623H71.1342C71.3508 39.8873 74.1225 33.9324 79.4494 30.5976C84.8197 27.2195 91.0345 25.5305 98.0937 25.5305C106.279 25.5305 112.927 27.0896 118.037 30.2078C123.104 33.326 125.638 38.1766 125.638 44.7595V84.8414C125.638 86.0541 125.876 87.0285 126.352 87.7648C126.872 88.501 127.933 88.8691 129.536 88.8691C130.055 88.8691 130.64 88.8475 131.29 88.8042C131.939 88.7175 132.632 88.6093 133.368 88.4793V97.1194C131.55 97.6391 130.164 97.9639 129.211 98.0938C128.258 98.2237 126.959 98.2887 125.313 98.2887C121.285 98.2887 118.362 96.8595 116.543 94.0012C115.59 92.4854 114.919 90.3416 114.529 87.5699C112.147 90.6881 108.726 93.3949 104.265 95.6902C99.8044 97.9855 94.8889 99.1332 89.5187 99.1332C83.0657 99.1332 77.7821 97.1843 73.6678 93.2866C69.5968 89.3455 67.5613 84.43 67.5613 78.5401C67.5613 72.0871 69.5751 67.085 73.6028 63.5337C77.6305 59.9824 82.9141 57.7953 89.4537 56.9724L108.098 54.6338Z"
                                    fill="white" />
                                <path
                                    d="M11.2385 74.9674C11.585 78.8652 12.5594 81.8534 14.1619 83.9322C17.1068 87.7001 22.2172 89.584 29.4931 89.584C33.8239 89.584 37.635 88.6529 40.9265 86.7906C44.2179 84.885 45.8636 81.9617 45.8636 78.0206C45.8636 75.0324 44.5427 72.7587 41.9009 71.1996C40.2119 70.2468 36.8771 69.1424 31.8967 67.8865L22.607 65.5478C16.6738 64.0753 12.2996 62.4296 9.48455 60.6106C4.46077 57.4491 1.94888 53.075 1.94888 47.4882C1.94888 40.9053 4.30919 35.5784 9.02981 31.5074C13.7937 27.4364 20.1817 25.4009 28.1938 25.4009C38.6744 25.4009 46.2318 28.4758 50.8658 34.6256C53.7674 38.5233 55.175 42.7243 55.0883 47.2283H44.0447C43.8281 44.5865 42.897 42.1829 41.2513 40.0175C38.5662 36.9426 33.9105 35.4051 27.2843 35.4051C22.8669 35.4051 19.5105 36.2496 17.2151 37.9387C14.9631 39.6277 13.837 41.8581 13.837 44.6298C13.837 47.6614 15.3312 50.0867 18.3195 51.9056C20.0518 52.9884 22.607 53.9411 25.9851 54.764L33.7156 56.6479C42.1175 58.6834 47.7476 60.654 50.6059 62.5595C55.1533 65.5478 57.427 70.2468 57.427 76.6564C57.427 82.8495 55.0667 88.1981 50.3461 92.7022C45.6688 97.2063 38.5229 99.4583 28.9084 99.4583C18.5577 99.4583 11.2169 97.1197 6.88604 92.4424C2.59851 87.7217 0.303159 81.8967 0 74.9674H11.2385Z"
                                    fill="white" />
                                <path
                                    d="M676.261 27.2234H689.189C686.59 31.6842 680.765 41.8616 671.714 57.7558C664.958 69.709 659.349 79.4534 654.888 86.989C644.321 104.746 637.24 115.573 633.646 119.47C630.051 123.368 624.876 125.317 618.119 125.317C616.474 125.317 615.218 125.252 614.352 125.122C613.485 124.992 612.446 124.754 611.233 124.408L613.507 113.754C615.413 114.317 616.799 114.663 617.665 114.793C618.574 114.923 619.375 114.988 620.068 114.988C622.234 114.988 623.901 114.62 625.07 113.884C626.24 113.191 627.279 112.324 628.189 111.285C628.492 110.939 629.639 109.163 631.632 105.958C633.667 102.753 635.161 100.371 636.114 98.8123L625.59 27.2234H638.843L645.469 83.8708L676.261 27.2234Z"
                                    fill="white" />
                                <path
                                    d="M566.993 89.1974C571.107 89.1974 575.308 88.2446 579.596 86.339C586.742 83.1775 591.094 78.0021 592.653 70.8129L594.602 61.3933C593 62.3028 591.008 63.0607 588.626 63.667C586.244 64.2733 583.948 64.7064 581.74 64.9663L574.464 65.8758C570.09 66.4388 566.712 67.3266 564.33 68.5392C560.302 70.5747 557.812 73.8229 556.859 78.2836C556.123 81.6617 556.772 84.3252 558.808 86.274C560.887 88.2229 563.615 89.1974 566.993 89.1974ZM590.185 54.6372C592.957 54.2907 595.014 53.1647 596.356 51.2592C597.092 50.2198 597.655 48.7256 598.045 46.7767C598.911 42.7924 598.11 39.9123 595.642 38.1367C593.173 36.3177 589.297 35.4083 584.013 35.4083C577.907 35.4083 573.23 37.054 569.981 40.3454C568.162 42.1644 566.668 44.8712 565.499 48.4658H554.585C556.621 39.8907 560.67 33.9358 566.733 30.601C572.796 27.223 579.358 25.5339 586.417 25.5339C594.602 25.5339 600.904 27.093 605.321 30.2112C609.739 33.3295 611.254 38.18 609.868 44.7629L601.358 84.8449C601.099 86.0575 601.12 87.0319 601.423 87.7682C601.77 88.5044 602.744 88.8725 604.347 88.8725C604.866 88.8725 605.451 88.8509 606.101 88.8076C606.794 88.721 607.53 88.6127 608.309 88.4828L606.425 97.1228C604.52 97.6425 603.069 97.9673 602.073 98.0972C601.12 98.2272 599.821 98.2921 598.175 98.2921C594.148 98.2921 591.527 96.8629 590.315 94.0046C589.665 92.4888 589.449 90.345 589.665 87.5733C586.59 90.6915 582.584 93.3983 577.647 95.6936C572.71 97.989 567.556 99.1366 562.186 99.1366C555.733 99.1366 550.861 97.1878 547.569 93.29C544.321 89.3489 543.325 84.4334 544.581 78.5435C545.967 72.0905 549.042 67.0884 553.806 63.5371C558.613 59.9858 564.373 57.7987 571.086 56.9759L590.185 54.6372Z"
                                    fill="white" />
                                <path
                                    d="M525.807 61.5882C526.977 56.0447 527.172 51.2808 526.392 47.2964C525.006 39.6308 520.286 35.798 512.23 35.798C504.132 35.798 497.722 39.8474 493.001 47.9461C490.489 52.2769 488.519 57.7771 487.09 64.4466C485.964 69.8168 485.812 74.3859 486.635 78.1537C488.107 85.3429 492.871 88.9375 500.927 88.9375C506.384 88.9375 511.407 86.6638 515.998 82.1164C520.589 77.5257 523.858 70.683 525.807 61.5882ZM483.712 27.5478H495.08L493.131 36.7725C496.119 33.611 499.194 31.164 502.356 29.4317C506.86 26.8332 511.775 25.5339 517.102 25.5339C524.985 25.5339 531.026 28.5655 535.227 34.6287C539.428 40.6486 540.337 49.267 537.955 60.4839C534.751 75.6418 528.493 86.4689 519.181 92.9652C513.291 97.0795 507.012 99.1366 500.342 99.1366C495.102 99.1366 490.944 97.989 487.869 95.6936C486.05 94.3944 484.21 92.164 482.347 89.0025L474.812 124.537H463.118L483.712 27.5478Z"
                                    fill="white" />
                                <path d="M403 67.5L372 89L372 46L403 67.5Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M424.333 63.8462C424.333 45.4933 409.409 30.6154 391 30.6154V14C418.614 14 441 36.3169 441 63.8462V72.1538C441 99.6831 418.614 122 391 122V105.385C409.409 105.385 424.333 90.5067 424.333 72.1538C424.333 53.801 424.333 63.8462 424.333 63.8462Z"
                                      fill="white" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="73" height="28" viewBox="0 0 690 126"
                                 fill="none" class="hidden md:block">
                                <path
                                    d="M336.441 27.2189H349.369C347.723 31.6796 344.063 41.8571 338.39 57.7513C334.146 69.7045 330.595 79.4489 327.736 86.9845C320.98 104.741 316.216 115.568 313.444 119.466C310.673 123.364 305.909 125.313 299.153 125.313C297.507 125.313 296.229 125.248 295.32 125.118C294.454 124.988 293.371 124.749 292.072 124.403V113.749C294.107 114.312 295.58 114.659 296.489 114.789C297.399 114.918 298.2 114.983 298.893 114.983C301.058 114.983 302.639 114.615 303.635 113.879C304.674 113.186 305.541 112.32 306.234 111.281C306.45 110.934 307.23 109.158 308.572 105.954C309.915 102.749 310.889 100.367 311.495 98.8077L285.77 27.2189H299.023L317.667 83.8663L336.441 27.2189Z"
                                    fill="white" />
                                <path
                                    d="M258.292 7.79553H270.115V27.2194H281.224V36.7689H270.115V82.1778C270.115 84.6031 270.938 86.2271 272.584 87.05C273.493 87.5264 275.009 87.7646 277.131 87.7646C277.694 87.7646 278.301 87.7646 278.95 87.7646C279.6 87.7213 280.358 87.6563 281.224 87.5697V96.7944C279.881 97.1842 278.474 97.4657 277.001 97.6389C275.572 97.8121 274.013 97.8988 272.324 97.8988C266.867 97.8988 263.164 96.5129 261.215 93.7411C259.267 90.9261 258.292 87.2882 258.292 82.8274V36.7689H248.873V27.2194H258.292V7.79553Z"
                                    fill="white" />
                                <path
                                    d="M210.869 25.6603C215.806 25.6603 220.592 26.8296 225.226 29.1683C229.86 31.4636 233.389 34.4519 235.815 38.1331C238.153 41.6411 239.712 45.7337 240.492 50.4111C241.185 53.6159 241.531 58.7263 241.531 65.7422H190.536C190.752 72.8015 192.42 78.4749 195.538 82.7625C198.656 87.0067 203.485 89.1288 210.024 89.1288C216.131 89.1288 221.003 87.115 224.641 83.0873C226.72 80.7486 228.192 78.0418 229.058 74.9669H240.557C240.254 77.5221 239.236 80.3805 237.504 83.542C235.815 86.6602 233.909 89.2154 231.787 91.2076C228.236 94.6723 223.84 97.0109 218.599 98.2236C215.784 98.9165 212.601 99.263 209.05 99.263C200.388 99.263 193.047 96.1231 187.028 89.8434C181.008 83.5204 177.998 74.6854 177.998 63.3386C177.998 52.165 181.029 43.0919 187.093 36.1193C193.156 29.1466 201.081 25.6603 210.869 25.6603ZM229.513 56.4526C229.037 51.3855 227.932 47.3362 226.2 44.3046C222.995 38.6745 217.647 35.8594 210.154 35.8594C204.784 35.8594 200.28 37.8083 196.642 41.7061C193.004 45.5605 191.077 50.476 190.86 56.4526H229.513Z"
                                    fill="white" />
                                <path
                                    d="M147.791 16.6304C147.964 11.7799 148.808 8.2286 150.324 5.97657C153.052 1.99219 158.314 0 166.11 0C166.846 0 167.604 0.0216542 168.384 0.0649627C169.163 0.108271 170.051 0.173234 171.047 0.259851V10.9137C169.835 10.8271 168.947 10.7838 168.384 10.7838C167.864 10.7405 167.366 10.7188 166.89 10.7188C163.338 10.7188 161.216 11.65 160.523 13.5122C159.83 15.3312 159.484 20.0085 159.484 27.5442H171.047V36.7689H159.354V96.7944H147.791V36.7689H138.111V27.5442H147.791V16.6304Z"
                                    fill="white" />
                                <path
                                    d="M79.7743 78.2802C79.7743 81.6583 81.0086 84.3217 83.4771 86.2706C85.9457 88.2195 88.869 89.1939 92.2471 89.1939C96.3614 89.1939 100.346 88.2411 104.2 86.3356C110.696 83.1741 113.945 77.9987 113.945 70.8095V61.3899C112.515 62.2994 110.675 63.0573 108.423 63.6636C106.171 64.2699 103.962 64.703 101.797 64.9629L94.7157 65.8723C90.4714 66.4353 87.2883 67.3232 85.1662 68.5358C81.5716 70.5713 79.7743 73.8194 79.7743 78.2802ZM108.098 54.6338C110.783 54.2873 112.58 53.1613 113.49 51.2557C114.01 50.2163 114.269 48.7222 114.269 46.7733C114.269 42.7889 112.84 39.9089 109.982 38.1333C107.167 36.3143 103.118 35.4048 97.8339 35.4048C91.7274 35.4048 87.3965 37.0506 84.8413 40.342C83.4122 42.161 82.481 44.8677 82.048 48.4623H71.1342C71.3508 39.8873 74.1225 33.9324 79.4494 30.5976C84.8197 27.2195 91.0345 25.5305 98.0937 25.5305C106.279 25.5305 112.927 27.0896 118.037 30.2078C123.104 33.326 125.638 38.1766 125.638 44.7595V84.8414C125.638 86.0541 125.876 87.0285 126.352 87.7648C126.872 88.501 127.933 88.8691 129.536 88.8691C130.055 88.8691 130.64 88.8475 131.29 88.8042C131.939 88.7175 132.632 88.6093 133.368 88.4793V97.1194C131.55 97.6391 130.164 97.9639 129.211 98.0938C128.258 98.2237 126.959 98.2887 125.313 98.2887C121.285 98.2887 118.362 96.8595 116.543 94.0012C115.59 92.4854 114.919 90.3416 114.529 87.5699C112.147 90.6881 108.726 93.3949 104.265 95.6902C99.8044 97.9855 94.8889 99.1332 89.5187 99.1332C83.0657 99.1332 77.7821 97.1843 73.6678 93.2866C69.5968 89.3455 67.5613 84.43 67.5613 78.5401C67.5613 72.0871 69.5751 67.085 73.6028 63.5337C77.6305 59.9824 82.9141 57.7953 89.4537 56.9724L108.098 54.6338Z"
                                    fill="white" />
                                <path
                                    d="M11.2385 74.9674C11.585 78.8652 12.5594 81.8534 14.1619 83.9322C17.1068 87.7001 22.2172 89.584 29.4931 89.584C33.8239 89.584 37.635 88.6529 40.9265 86.7906C44.2179 84.885 45.8636 81.9617 45.8636 78.0206C45.8636 75.0324 44.5427 72.7587 41.9009 71.1996C40.2119 70.2468 36.8771 69.1424 31.8967 67.8865L22.607 65.5478C16.6738 64.0753 12.2996 62.4296 9.48455 60.6106C4.46077 57.4491 1.94888 53.075 1.94888 47.4882C1.94888 40.9053 4.30919 35.5784 9.02981 31.5074C13.7937 27.4364 20.1817 25.4009 28.1938 25.4009C38.6744 25.4009 46.2318 28.4758 50.8658 34.6256C53.7674 38.5233 55.175 42.7243 55.0883 47.2283H44.0447C43.8281 44.5865 42.897 42.1829 41.2513 40.0175C38.5662 36.9426 33.9105 35.4051 27.2843 35.4051C22.8669 35.4051 19.5105 36.2496 17.2151 37.9387C14.9631 39.6277 13.837 41.8581 13.837 44.6298C13.837 47.6614 15.3312 50.0867 18.3195 51.9056C20.0518 52.9884 22.607 53.9411 25.9851 54.764L33.7156 56.6479C42.1175 58.6834 47.7476 60.654 50.6059 62.5595C55.1533 65.5478 57.427 70.2468 57.427 76.6564C57.427 82.8495 55.0667 88.1981 50.3461 92.7022C45.6688 97.2063 38.5229 99.4583 28.9084 99.4583C18.5577 99.4583 11.2169 97.1197 6.88604 92.4424C2.59851 87.7217 0.303159 81.8967 0 74.9674H11.2385Z"
                                    fill="white" />
                                <path
                                    d="M676.261 27.2234H689.189C686.59 31.6842 680.765 41.8616 671.714 57.7558C664.958 69.709 659.349 79.4534 654.888 86.989C644.321 104.746 637.24 115.573 633.646 119.47C630.051 123.368 624.876 125.317 618.119 125.317C616.474 125.317 615.218 125.252 614.352 125.122C613.485 124.992 612.446 124.754 611.233 124.408L613.507 113.754C615.413 114.317 616.799 114.663 617.665 114.793C618.574 114.923 619.375 114.988 620.068 114.988C622.234 114.988 623.901 114.62 625.07 113.884C626.24 113.191 627.279 112.324 628.189 111.285C628.492 110.939 629.639 109.163 631.632 105.958C633.667 102.753 635.161 100.371 636.114 98.8123L625.59 27.2234H638.843L645.469 83.8708L676.261 27.2234Z"
                                    fill="white" />
                                <path
                                    d="M566.993 89.1974C571.107 89.1974 575.308 88.2446 579.596 86.339C586.742 83.1775 591.094 78.0021 592.653 70.8129L594.602 61.3933C593 62.3028 591.008 63.0607 588.626 63.667C586.244 64.2733 583.948 64.7064 581.74 64.9663L574.464 65.8758C570.09 66.4388 566.712 67.3266 564.33 68.5392C560.302 70.5747 557.812 73.8229 556.859 78.2836C556.123 81.6617 556.772 84.3252 558.808 86.274C560.887 88.2229 563.615 89.1974 566.993 89.1974ZM590.185 54.6372C592.957 54.2907 595.014 53.1647 596.356 51.2592C597.092 50.2198 597.655 48.7256 598.045 46.7767C598.911 42.7924 598.11 39.9123 595.642 38.1367C593.173 36.3177 589.297 35.4083 584.013 35.4083C577.907 35.4083 573.23 37.054 569.981 40.3454C568.162 42.1644 566.668 44.8712 565.499 48.4658H554.585C556.621 39.8907 560.67 33.9358 566.733 30.601C572.796 27.223 579.358 25.5339 586.417 25.5339C594.602 25.5339 600.904 27.093 605.321 30.2112C609.739 33.3295 611.254 38.18 609.868 44.7629L601.358 84.8449C601.099 86.0575 601.12 87.0319 601.423 87.7682C601.77 88.5044 602.744 88.8725 604.347 88.8725C604.866 88.8725 605.451 88.8509 606.101 88.8076C606.794 88.721 607.53 88.6127 608.309 88.4828L606.425 97.1228C604.52 97.6425 603.069 97.9673 602.073 98.0972C601.12 98.2272 599.821 98.2921 598.175 98.2921C594.148 98.2921 591.527 96.8629 590.315 94.0046C589.665 92.4888 589.449 90.345 589.665 87.5733C586.59 90.6915 582.584 93.3983 577.647 95.6936C572.71 97.989 567.556 99.1366 562.186 99.1366C555.733 99.1366 550.861 97.1878 547.569 93.29C544.321 89.3489 543.325 84.4334 544.581 78.5435C545.967 72.0905 549.042 67.0884 553.806 63.5371C558.613 59.9858 564.373 57.7987 571.086 56.9759L590.185 54.6372Z"
                                    fill="white" />
                                <path
                                    d="M525.807 61.5882C526.977 56.0447 527.172 51.2808 526.392 47.2964C525.006 39.6308 520.286 35.798 512.23 35.798C504.132 35.798 497.722 39.8474 493.001 47.9461C490.489 52.2769 488.519 57.7771 487.09 64.4466C485.964 69.8168 485.812 74.3859 486.635 78.1537C488.107 85.3429 492.871 88.9375 500.927 88.9375C506.384 88.9375 511.407 86.6638 515.998 82.1164C520.589 77.5257 523.858 70.683 525.807 61.5882ZM483.712 27.5478H495.08L493.131 36.7725C496.119 33.611 499.194 31.164 502.356 29.4317C506.86 26.8332 511.775 25.5339 517.102 25.5339C524.985 25.5339 531.026 28.5655 535.227 34.6287C539.428 40.6486 540.337 49.267 537.955 60.4839C534.751 75.6418 528.493 86.4689 519.181 92.9652C513.291 97.0795 507.012 99.1366 500.342 99.1366C495.102 99.1366 490.944 97.989 487.869 95.6936C486.05 94.3944 484.21 92.164 482.347 89.0025L474.812 124.537H463.118L483.712 27.5478Z"
                                    fill="white" />
                                <path d="M403 67.5L372 89L372 46L403 67.5Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M424.333 63.8462C424.333 45.4933 409.409 30.6154 391 30.6154V14C418.614 14 441 36.3169 441 63.8462V72.1538C441 99.6831 418.614 122 391 122V105.385C409.409 105.385 424.333 90.5067 424.333 72.1538C424.333 53.801 424.333 63.8462 424.333 63.8462Z"
                                      fill="white" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Pasarelas')
                            }}</span>
                        <span
                            class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'payment_gateway').amount_min
                            }}</span>
                    </button>
                    <button
                        v-if="methods.some(method => method.id === 'crypto')"
                        :disabled="methods.find(method => method.id === 'crypto').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'crypto').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'crypto'))"
                    >
                        <div v-if="methods.find(method => method.id === 'crypto').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'crypto').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'crypto').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 109 110"
                                 fill="none" class="md:hidden">
                                <path d="M9.073 39.1071H58.9745" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M27.219 75.399H36.292" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M47.6333 75.399H65.7793" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M99.8029 51.9454V73.6297C99.8029 89.5528 95.7654 93.545 79.6609 93.545H29.215C13.1105 93.545 9.073 89.5528 9.073 73.6297V36.3398C9.073 20.4167 13.1105 16.4246 29.215 16.4246H60.2447"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M77.1204 15.2905H91.3196C94.4498 15.2905 96.9902 18.1485 96.9902 20.9611C96.9902 24.0913 94.4498 26.6318 91.3196 26.6318H77.1204V15.2905Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M77.1204 26.6317H93.3157C96.8995 26.6317 99.8028 29.1722 99.8028 32.3023C99.8028 35.4325 96.8995 37.973 93.3157 37.973H77.1204V26.6317Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M85.1047 37.973V43.6436" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M85.1047 9.61987V15.2905" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M82.5189 15.2905H72.584" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M82.5189 37.973H72.584" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 109 110"
                                 fill="none" class="hidden md:block">
                                <path d="M9.073 39.1071H58.9745" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M27.219 75.399H36.292" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M47.6333 75.399H65.7793" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M99.8029 51.9454V73.6297C99.8029 89.5528 95.7654 93.545 79.6609 93.545H29.215C13.1105 93.545 9.073 89.5528 9.073 73.6297V36.3398C9.073 20.4167 13.1105 16.4246 29.215 16.4246H60.2447"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M77.1204 15.2905H91.3196C94.4498 15.2905 96.9902 18.1485 96.9902 20.9611C96.9902 24.0913 94.4498 26.6318 91.3196 26.6318H77.1204V15.2905Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M77.1204 26.6317H93.3157C96.8995 26.6317 99.8028 29.1722 99.8028 32.3023C99.8028 35.4325 96.8995 37.973 93.3157 37.973H77.1204V26.6317Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M85.1047 37.973V43.6436" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M85.1047 9.61987V15.2905" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M82.5189 15.2905H72.584" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M82.5189 37.973H72.584" stroke="white" stroke-width="7.42336"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Criptomonedas')
                            }}</span>
                        <span
                            class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'crypto').amount_min
                            }}</span>
                    </button>
                    <button
                        v-if="methods.some(method => method.id === 'wallet')"
                        :disabled="methods.find(method => method.id === 'wallet').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'wallet').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'wallet'))"
                    >
                        <div v-if="methods.find(method => method.id === 'wallet').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'wallet').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'wallet').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 109 109"
                                 fill="none" class="md:hidden">
                                <path
                                    d="M81.8385 61.4695C79.9331 63.3294 78.8444 66.006 79.1166 68.864C79.5248 73.7634 84.016 77.3472 88.9154 77.3472H97.5347V82.7456C97.5347 92.1362 89.8681 99.8029 80.4775 99.8029H28.3985C19.008 99.8029 11.3413 92.1362 11.3413 82.7456V52.2151C11.3413 42.8246 19.008 35.1578 28.3985 35.1578H80.4775C89.8681 35.1578 97.5347 42.8246 97.5347 52.2151V58.7477H88.371C85.8306 58.7477 83.517 59.7456 81.8385 61.4695Z"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M11.3413 56.2982V35.5667C11.3413 30.1682 14.653 25.3593 19.6885 23.454L55.7082 9.84452C61.3335 7.71237 67.367 11.8861 67.367 17.9196V35.1582"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M102.338 63.3756V72.721C102.338 75.2161 100.342 77.2573 97.8016 77.3481H88.91C84.0106 77.3481 79.5195 73.7642 79.1112 68.8648C78.839 66.0068 79.9278 63.3303 81.8331 61.4703C83.5116 59.7465 85.8252 58.7485 88.3657 58.7485H97.8016C100.342 58.8393 102.338 60.8805 102.338 63.3756Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M31.7554 54.438H63.5108" stroke="white" stroke-width="6.80474"
                                      stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 109 109"
                                 fill="none" class="hidden md:block">
                                <path
                                    d="M81.8385 61.4695C79.9331 63.3294 78.8444 66.006 79.1166 68.864C79.5248 73.7634 84.016 77.3472 88.9154 77.3472H97.5347V82.7456C97.5347 92.1362 89.8681 99.8029 80.4775 99.8029H28.3985C19.008 99.8029 11.3413 92.1362 11.3413 82.7456V52.2151C11.3413 42.8246 19.008 35.1578 28.3985 35.1578H80.4775C89.8681 35.1578 97.5347 42.8246 97.5347 52.2151V58.7477H88.371C85.8306 58.7477 83.517 59.7456 81.8385 61.4695Z"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M11.3413 56.2982V35.5667C11.3413 30.1682 14.653 25.3593 19.6885 23.454L55.7082 9.84452C61.3335 7.71237 67.367 11.8861 67.367 17.9196V35.1582"
                                    stroke="white" stroke-width="7.42336" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M102.338 63.3756V72.721C102.338 75.2161 100.342 77.2573 97.8016 77.3481H88.91C84.0106 77.3481 79.5195 73.7642 79.1112 68.8648C78.839 66.0068 79.9278 63.3303 81.8331 61.4703C83.5116 59.7465 85.8252 58.7485 88.3657 58.7485H97.8016C100.342 58.8393 102.338 60.8805 102.338 63.3756Z"
                                    stroke="white" stroke-width="6.80474" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M31.7554 54.438H63.5108" stroke="white" stroke-width="6.80474"
                                      stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Billeteras móviles')
                            }}</span>
                        <span
                            class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'wallet').amount_min
                            }}</span>
                    </button>
                    <button
                        v-if="methods.some(method => method.id === 'gif')"
                        :disabled="methods.find(method => method.id === 'gif').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'gif').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'gif'))"
                    >
                        <div v-if="methods.find(method => method.id === 'gif').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'gif').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'gif').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 98 98"
                                 fill="none" class="md:hidden">
                                <path
                                    d="M0.576172 69.0577V48.4366C0.576341 32.9487 13.1322 20.3929 28.6201 20.3927V27.8165L28.0879 27.8234C16.9458 28.1058 8.00017 37.2265 8 48.4366V69.0577L8.00684 69.59C8.28482 80.5552 17.1226 89.393 28.0879 89.671L28.6201 89.6779H69.8613L70.3936 89.671C81.3589 89.3932 90.1966 80.5553 90.4746 69.59L90.4814 69.0577V48.4366C90.4813 37.2264 81.5358 28.1057 70.3936 27.8234L69.8613 27.8165V20.3927C85.3494 20.3927 97.9051 32.9486 97.9053 48.4366V69.0577C97.9051 84.5457 85.3494 97.1007 69.8613 97.1007H28.6201C13.3742 97.1005 0.969936 84.9348 0.585938 69.7814L0.576172 69.0577ZM69.8613 20.3927V27.8165H28.6201V20.3927H69.8613Z"
                                    fill="white" />
                                <path
                                    d="M90.4814 47.6127L90.6729 47.6176C92.6339 47.717 94.1934 49.3388 94.1934 51.3246C94.1934 53.3104 92.6339 54.9322 90.6729 55.0316L90.4814 55.0365H8C5.9501 55.0365 4.28809 53.3745 4.28809 51.3246C4.28809 49.2747 5.9501 47.6127 8 47.6127H90.4814Z"
                                    fill="white" />
                                <path
                                    d="M65.5315 33.7948L65.6758 33.9474C67.1238 35.5502 67.0754 38.0238 65.5308 39.5684C63.9863 41.113 61.5126 41.1613 59.9099 39.7134L59.7573 39.5691L46.1475 25.9593C44.5531 24.3649 44.5531 21.7795 46.1475 20.1851C47.742 18.5906 50.3273 18.5906 51.9218 20.1851L65.5315 33.7948Z"
                                    fill="white" />
                                <path
                                    d="M37.0744 33.7948L36.9301 33.9474C35.4822 35.5502 35.5306 38.0238 37.0751 39.5684C38.6197 41.113 41.0933 41.1613 42.6961 39.7134L42.8487 39.5691L56.4584 25.9593C58.0529 24.3649 58.0529 21.7795 56.4584 20.1851C54.864 18.5906 52.2786 18.5906 50.6842 20.1851L37.0744 33.7948Z"
                                    fill="white" />
                                <path
                                    d="M45.3317 19.5131C45.3351 19.5065 45.3819 19.4282 45.3654 19.1766C45.347 18.8964 45.244 18.4037 44.8976 17.7407C44.1883 16.3833 42.6719 14.7438 40.3107 13.5471C37.9491 12.3502 35.7298 12.0962 34.2156 12.3268C33.4759 12.4395 33.0178 12.6478 32.781 12.7986C32.5683 12.934 32.5337 13.0186 32.5304 13.0252C32.526 13.0335 32.48 13.1121 32.4962 13.3604C32.5146 13.6405 32.6175 14.1331 32.964 14.7963C33.6733 16.1539 35.1899 17.7944 37.5514 18.9913L34.2704 25.4651L33.6132 25.1178C27.0429 21.4832 23.6719 14.881 25.94 9.98283L26.0557 9.74369C28.6299 4.66459 36.4814 3.4685 43.5922 7.07235L44.248 7.42007C50.9262 11.1142 54.2993 17.8738 51.8055 22.7942L51.682 23.0294C48.9872 27.9095 41.27 29.0125 34.2704 25.4651L37.5514 18.9913C39.9128 20.188 42.1319 20.4408 43.646 20.2102C44.3858 20.0975 44.8438 19.8892 45.0807 19.7384C45.2905 19.6048 45.3276 19.5217 45.3317 19.5131Z"
                                    fill="white" />
                                <path
                                    d="M45.3317 19.5131C45.3351 19.5065 45.3819 19.4282 45.3654 19.1766C45.347 18.8964 45.244 18.4037 44.8976 17.7407C44.1883 16.3833 42.6719 14.7438 40.3107 13.5471C37.9491 12.3502 35.7298 12.0962 34.2156 12.3268C33.4759 12.4395 33.0178 12.6478 32.781 12.7986C32.5683 12.934 32.5337 13.0186 32.5304 13.0252C32.526 13.0335 32.48 13.1121 32.4962 13.3604C32.5146 13.6405 32.6175 14.1331 32.964 14.7963C33.6733 16.1539 35.1899 17.7944 37.5514 18.9913L34.2704 25.4651L33.6132 25.1178C27.0429 21.4832 23.6719 14.881 25.94 9.98283L26.0557 9.74369C28.6299 4.66459 36.4814 3.4685 43.5922 7.07235L44.248 7.42007C50.9262 11.1142 54.2993 17.8738 51.8055 22.7942L51.682 23.0294C48.9872 27.9095 41.27 29.0125 34.2704 25.4651L37.5514 18.9913C39.9128 20.188 42.1319 20.4408 43.646 20.2102C44.3858 20.0975 44.8438 19.8892 45.0807 19.7384C45.2905 19.6048 45.3276 19.5217 45.3317 19.5131Z"
                                    fill="white" />
                                <path
                                    d="M29.8486 5.1458C29.8478 5.14419 29.8363 5.12533 29.8403 5.06461C29.8447 4.99668 29.8696 4.87675 29.9537 4.71591C30.1257 4.38674 30.4936 3.98902 31.0662 3.69881C31.6388 3.40859 32.1771 3.34703 32.5442 3.40296C32.7237 3.43028 32.8351 3.4811 32.8925 3.51767C32.9438 3.5504 32.9523 3.57077 32.9531 3.57237C32.9539 3.57397 32.9653 3.59284 32.9614 3.65356C32.9569 3.72148 32.932 3.84141 32.848 4.00226C32.676 4.33143 32.3081 4.72914 31.7355 5.01936L32.531 6.58904C34.2552 5.71518 35.1469 4.0084 34.5228 2.77683C33.8986 1.54526 31.9948 1.25527 30.2706 2.12913C28.5464 3.00299 27.6547 4.70977 28.2789 5.94134C28.9031 7.17291 30.8068 7.46289 32.531 6.58904L31.7355 5.01936C31.1628 5.30957 30.6246 5.37114 30.2574 5.31521C30.078 5.28788 29.9666 5.23706 29.9091 5.2005C29.8578 5.16777 29.8494 5.1474 29.8486 5.1458Z"
                                    fill="white" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 98 98"
                                 fill="none" class="hidden md:block">
                                <path
                                    d="M0.576172 69.0577V48.4366C0.576341 32.9487 13.1322 20.3929 28.6201 20.3927V27.8165L28.0879 27.8234C16.9458 28.1058 8.00017 37.2265 8 48.4366V69.0577L8.00684 69.59C8.28482 80.5552 17.1226 89.393 28.0879 89.671L28.6201 89.6779H69.8613L70.3936 89.671C81.3589 89.3932 90.1966 80.5553 90.4746 69.59L90.4814 69.0577V48.4366C90.4813 37.2264 81.5358 28.1057 70.3936 27.8234L69.8613 27.8165V20.3927C85.3494 20.3927 97.9051 32.9486 97.9053 48.4366V69.0577C97.9051 84.5457 85.3494 97.1007 69.8613 97.1007H28.6201C13.3742 97.1005 0.969936 84.9348 0.585938 69.7814L0.576172 69.0577ZM69.8613 20.3927V27.8165H28.6201V20.3927H69.8613Z"
                                    fill="white" />
                                <path
                                    d="M90.4814 47.6127L90.6729 47.6176C92.6339 47.717 94.1934 49.3388 94.1934 51.3246C94.1934 53.3104 92.6339 54.9322 90.6729 55.0316L90.4814 55.0365H8C5.9501 55.0365 4.28809 53.3745 4.28809 51.3246C4.28809 49.2747 5.9501 47.6127 8 47.6127H90.4814Z"
                                    fill="white" />
                                <path
                                    d="M65.5315 33.7948L65.6758 33.9474C67.1238 35.5502 67.0754 38.0238 65.5308 39.5684C63.9863 41.113 61.5126 41.1613 59.9099 39.7134L59.7573 39.5691L46.1475 25.9593C44.5531 24.3649 44.5531 21.7795 46.1475 20.1851C47.742 18.5906 50.3273 18.5906 51.9218 20.1851L65.5315 33.7948Z"
                                    fill="white" />
                                <path
                                    d="M37.0744 33.7948L36.9301 33.9474C35.4822 35.5502 35.5306 38.0238 37.0751 39.5684C38.6197 41.113 41.0933 41.1613 42.6961 39.7134L42.8487 39.5691L56.4584 25.9593C58.0529 24.3649 58.0529 21.7795 56.4584 20.1851C54.864 18.5906 52.2786 18.5906 50.6842 20.1851L37.0744 33.7948Z"
                                    fill="white" />
                                <path
                                    d="M45.3317 19.5131C45.3351 19.5065 45.3819 19.4282 45.3654 19.1766C45.347 18.8964 45.244 18.4037 44.8976 17.7407C44.1883 16.3833 42.6719 14.7438 40.3107 13.5471C37.9491 12.3502 35.7298 12.0962 34.2156 12.3268C33.4759 12.4395 33.0178 12.6478 32.781 12.7986C32.5683 12.934 32.5337 13.0186 32.5304 13.0252C32.526 13.0335 32.48 13.1121 32.4962 13.3604C32.5146 13.6405 32.6175 14.1331 32.964 14.7963C33.6733 16.1539 35.1899 17.7944 37.5514 18.9913L34.2704 25.4651L33.6132 25.1178C27.0429 21.4832 23.6719 14.881 25.94 9.98283L26.0557 9.74369C28.6299 4.66459 36.4814 3.4685 43.5922 7.07235L44.248 7.42007C50.9262 11.1142 54.2993 17.8738 51.8055 22.7942L51.682 23.0294C48.9872 27.9095 41.27 29.0125 34.2704 25.4651L37.5514 18.9913C39.9128 20.188 42.1319 20.4408 43.646 20.2102C44.3858 20.0975 44.8438 19.8892 45.0807 19.7384C45.2905 19.6048 45.3276 19.5217 45.3317 19.5131Z"
                                    fill="white" />
                                <path
                                    d="M45.3317 19.5131C45.3351 19.5065 45.3819 19.4282 45.3654 19.1766C45.347 18.8964 45.244 18.4037 44.8976 17.7407C44.1883 16.3833 42.6719 14.7438 40.3107 13.5471C37.9491 12.3502 35.7298 12.0962 34.2156 12.3268C33.4759 12.4395 33.0178 12.6478 32.781 12.7986C32.5683 12.934 32.5337 13.0186 32.5304 13.0252C32.526 13.0335 32.48 13.1121 32.4962 13.3604C32.5146 13.6405 32.6175 14.1331 32.964 14.7963C33.6733 16.1539 35.1899 17.7944 37.5514 18.9913L34.2704 25.4651L33.6132 25.1178C27.0429 21.4832 23.6719 14.881 25.94 9.98283L26.0557 9.74369C28.6299 4.66459 36.4814 3.4685 43.5922 7.07235L44.248 7.42007C50.9262 11.1142 54.2993 17.8738 51.8055 22.7942L51.682 23.0294C48.9872 27.9095 41.27 29.0125 34.2704 25.4651L37.5514 18.9913C39.9128 20.188 42.1319 20.4408 43.646 20.2102C44.3858 20.0975 44.8438 19.8892 45.0807 19.7384C45.2905 19.6048 45.3276 19.5217 45.3317 19.5131Z"
                                    fill="white" />
                                <path
                                    d="M29.8486 5.1458C29.8478 5.14419 29.8363 5.12533 29.8403 5.06461C29.8447 4.99668 29.8696 4.87675 29.9537 4.71591C30.1257 4.38674 30.4936 3.98902 31.0662 3.69881C31.6388 3.40859 32.1771 3.34703 32.5442 3.40296C32.7237 3.43028 32.8351 3.4811 32.8925 3.51767C32.9438 3.5504 32.9523 3.57077 32.9531 3.57237C32.9539 3.57397 32.9653 3.59284 32.9614 3.65356C32.9569 3.72148 32.932 3.84141 32.848 4.00226C32.676 4.33143 32.3081 4.72914 31.7355 5.01936L32.531 6.58904C34.2552 5.71518 35.1469 4.0084 34.5228 2.77683C33.8986 1.54526 31.9948 1.25527 30.2706 2.12913C28.5464 3.00299 27.6547 4.70977 28.2789 5.94134C28.9031 7.17291 30.8068 7.46289 32.531 6.58904L31.7355 5.01936C31.1628 5.30957 30.6246 5.37114 30.2574 5.31521C30.078 5.28788 29.9666 5.23706 29.9091 5.2005C29.8578 5.16777 29.8494 5.1474 29.8486 5.1458Z"
                                    fill="white" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Tarjetas de regalo')
                            }}</span>
                        <span
                            class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'gif').amount_min
                            }}</span>
                    </button>
                    <button
                        v-if="methods.some(method => method.id === 'cash')"
                        :disabled="methods.find(method => method.id === 'cash').amount_min > amountDeposit"
                        :class="{
                            'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-base-content/10 to-base-content/40 bg-opacity-25 rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
                            'opacity-50 cursor-not-allowed': methods.find(method => method.id === 'cash').amount_min > amountDeposit
                        }"
                        @click="handleMethodSelected(methods.find(method => method.id === 'cash'))">
                        <div v-if="methods.find(method => method.id === 'cash').amount_min > amountDeposit"
                             class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
                             :data-tip="`${$t('Mínimo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'cash').amount_min}, ${$t('Máximo')}: ${appComponent.session.simbolo_moneda}${methods.find(method => method.id === 'cash').amount_max}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="lucide lucide-info-icon lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div
                            class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 109 110"
                                 fill="none" class="md:hidden">
                                <path
                                    d="M77.1204 93.545H31.7555C18.146 93.545 9.073 86.7403 9.073 70.8625V39.107C9.073 23.2293 18.146 16.4246 31.7555 16.4246H77.1204C90.7299 16.4246 99.8029 23.2293 99.8029 39.107V70.8625C99.8029 86.7403 90.7299 93.545 77.1204 93.545Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M54.4379 68.5943C61.9542 68.5943 68.0473 62.5012 68.0473 54.9849C68.0473 47.4685 61.9542 41.3754 54.4379 41.3754C46.9215 41.3754 40.8284 47.4685 40.8284 54.9849C40.8284 62.5012 46.9215 68.5943 54.4379 68.5943Z"
                                    stroke="white" stroke-width="6.80474" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M86.1935 32.3024H72.584" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M36.2919 77.6674H22.6824" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 109 110"
                                 fill="none" class="hidden md:block">
                                <path
                                    d="M77.1204 93.545H31.7555C18.146 93.545 9.073 86.7403 9.073 70.8625V39.107C9.073 23.2293 18.146 16.4246 31.7555 16.4246H77.1204C90.7299 16.4246 99.8029 23.2293 99.8029 39.107V70.8625C99.8029 86.7403 90.7299 93.545 77.1204 93.545Z"
                                    stroke="white" stroke-width="7.42336" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M54.4379 68.5943C61.9542 68.5943 68.0473 62.5012 68.0473 54.9849C68.0473 47.4685 61.9542 41.3754 54.4379 41.3754C46.9215 41.3754 40.8284 47.4685 40.8284 54.9849C40.8284 62.5012 46.9215 68.5943 54.4379 68.5943Z"
                                    stroke="white" stroke-width="6.80474" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M86.1935 32.3024H72.584" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M36.2919 77.6674H22.6824" stroke="white" stroke-width="6.80474"
                                      stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span
                            class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">{{ $t('Efectivo')
                            }}</span>
                        <span
                            class="text-[9px] md:text-xs text-center font-light text-neutral/50">{{ $t('Desde')
                            }} {{ appComponent.session.simbolo_moneda
                            }}{{ methods.find(method => method.id === 'cash').amount_min
                            }}</span>
                    </button>
                </div>
            </div>

            <div
                v-if="!noGateways && !isLoadingMethod && methodSelected.id ==='deposit_access' && franchiseSelected == undefined && appComponent.infoModalDeposit == undefined"
                class="relative w-[305px] md:w-[410px] max-h-[300px] md:h-[407px] md:max-h-[407px] md:aspect-square flex justify-center items-start gap-2 z-1 pl-3 py-3 pr-2 rounded-box overflow-hidden">
                <!-- Background image for the franchise selection section -->
                <img src="https://images.virtualsoft.tech/m/msj0212T1748444253.png"
                     class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover object-center z-1"
                     alt="background" />

                <div v-if="franchises.length > 0"
                     class="w-[288px] md:w-full gridList max-h-[283px] md:max-h-[380px] overflow-y-scroll overflow-x-hidden z-10 scroll-edit"
                >
                    <!-- Button for each available franchise -->
                    <button
                        v-for="(franchise, index) in franchises"
                        :key="index"
                        :disabled="franchise.min !== undefined && franchise.max !== undefined
                            ? amountDeposit < Number(franchise.min) || amountDeposit > Number(franchise.max)
                            : amountDeposit < 1"
                        :class="{
                            'w-[88px] md:w-[118px] h-[88px] md:h-[112px] flex flex-col justify-center items-center rounded-[20px] overflow-hidden border-2 border-white/50': true,
                            'opacity-50 cursor-not-allowed': (franchise.min !== undefined && franchise.max !== undefined
                                ? amountDeposit < Number(franchise.min) || amountDeposit > Number(franchise.max)
                                : amountDeposit < 1)
                        }"
                        @click="handleFranchiseSelected(franchise)"
                    >
                        <img :src="franchise.imagen" :alt="'franchise' + index"
                             class="w-full h-full aspect-square object-center hover:scale-105"
                             :class="{
                                'object-cover': franchise.min === undefined && franchise.max === undefined,
                                'object-contain p-2 bg-neutral': franchise.min !== undefined && franchise.max !== undefined
                            }"
                        />
                    </button>
                </div>
            </div>

            <div
                v-else-if="!isLoadingMethod && methodSelected.id ==='deposit_access' && franchiseSelected != undefined && appComponent.infoModalDeposit != undefined"
                class="relative w-[90%] md:w-[410px] h-[305px] md:h-[407px] flex flex-col justify-start md:justify-center items-center gap-2 z-1">


                <div class="w-full flex justify-start items-start">
                    <!-- Button displaying the selected franchise -->
                    <button
                        class="w-[80px] md:w-[123px] h-[80px] md:h-[123px] flex flex-col justify-center items-center rounded-[20px] overflow-hidden border-2 border-white/50"
                    >
                        <img :src="franchiseSelected.imagen" :alt="'franchise' + franchiseSelected.id_franquicia"
                             class="w-full h-full aspect-square object-cover object-center hover:scale-105" />
                    </button>
                </div>

                <div class="w-full md:h-full h-52 flex flex-col justify-center items-center gap-2">
                    <!-- Title for the step-by-step instructions -->
                    <div class="w-full flex justify-start items-center gap-4">
                        <span class="text-start text-neutral font-bold text-base md:text-lg">{{ $t('Paso a paso:') }}</span>
                                                <button
                                                    v-if="
                                                            appComponent.infoModalDeposit.dataImg != undefined &&
                                                            appComponent.infoModalDeposit.dataImg != ''
                                                        "
                                                    class="bg-base-200 rounded-full aspect-square w-8 md:w-10 flex justify-center items-center hover:scale-105 hover:border hover:border-neutral cursor-pointer text-neutral">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"
                                                         fill="none" class="fill-neutral">
                                                        <path
                                                            d="M11.8974 0C12.2919 0 12.6701 0.156684 12.949 0.435585C13.2279 0.714485 13.3846 1.09275 13.3846 1.48718V10.4103C13.3846 10.8047 13.2279 11.183 12.949 11.4619C12.6701 11.7408 12.2919 11.8974 11.8974 11.8974H10.4103V13.3846C10.4103 13.779 10.2536 14.1573 9.97467 14.4362C9.69577 14.7151 9.3175 14.8718 8.92308 14.8718H1.48718C1.09275 14.8718 0.714485 14.7151 0.435585 14.4362C0.156684 14.1573 0 13.779 0 13.3846V4.46154C0 4.06711 0.156684 3.68884 0.435585 3.40994C0.714485 3.13104 1.09275 2.97436 1.48718 2.97436H2.97436V1.48718C2.97436 1.09275 3.13104 0.714485 3.40994 0.435585C3.68884 0.156684 4.06711 0 4.46154 0H11.8974ZM5.20513 9.66667H3.71795C3.52842 9.66688 3.34613 9.73945 3.20832 9.86955C3.0705 9.99966 2.98757 10.1775 2.97646 10.3667C2.96535 10.5559 3.02691 10.7422 3.14856 10.8875C3.2702 11.0329 3.44275 11.1263 3.63095 11.1486L3.71795 11.1538H5.20513C5.39465 11.1536 5.57695 11.0811 5.71476 10.951C5.85257 10.8209 5.93551 10.643 5.94662 10.4538C5.95772 10.2646 5.89616 10.0783 5.77452 9.933C5.65288 9.78766 5.48033 9.69426 5.29213 9.67187L5.20513 9.66667ZM11.8974 1.48718H4.46154V2.97436H8.92308C9.3175 2.97436 9.69577 3.13104 9.97467 3.40994C10.2536 3.68884 10.4103 4.06711 10.4103 4.46154V10.4103H11.8974V1.48718ZM6.69231 6.69231H3.71795C3.52074 6.69231 3.3316 6.77065 3.19215 6.9101C3.0527 7.04955 2.97436 7.23869 2.97436 7.4359C2.97436 7.63311 3.0527 7.82224 3.19215 7.96169C3.3316 8.10114 3.52074 8.17949 3.71795 8.17949H6.69231C6.88952 8.17949 7.07865 8.10114 7.2181 7.96169C7.35755 7.82224 7.4359 7.63311 7.4359 7.4359C7.4359 7.23869 7.35755 7.04955 7.2181 6.9101C7.07865 6.77065 6.88952 6.69231 6.69231 6.69231Z"
                                                            fill="" />
                                                    </svg>
                                                </button>
                        <button
                            v-if="
                                    appComponent.infoModalDeposit.dataImg != undefined &&
                                    appComponent.infoModalDeposit.dataImg != '' &&
							        appComponent.infoModalDeposit.dataImg.includes('data:image/png;base64')
                                "
                            @click="downloadImage()"
                            class="bg-base-200 rounded-full aspect-square w-8 md:w-10 flex justify-center items-center hover:scale-105 hover:border hover:border-neutral cursor-pointer text-neutral">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13"
                                 fill="currentColor">
                                <path
                                    d="M8.61821 4.46154H7.4359V0.74359C7.4359 0.334615 7.10128 0 6.69231 0H3.71795C3.30897 0 2.97436 0.334615 2.97436 0.74359V4.46154H1.79205C1.13026 4.46154 0.795641 5.26462 1.2641 5.73308L4.67718 9.14615C4.96718 9.43615 5.43564 9.43615 5.72564 9.14615L9.13872 5.73308C9.60718 5.26462 9.28 4.46154 8.61821 4.46154ZM0 11.8974C0 12.3064 0.334615 12.641 0.74359 12.641H9.66667C10.0756 12.641 10.4103 12.3064 10.4103 11.8974C10.4103 11.4885 10.0756 11.1538 9.66667 11.1538H0.74359C0.334615 11.1538 0 11.4885 0 11.8974Z"
                                    fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div class="w-full h-full max-h-[172px] flex justify-center items-start gap-4">
                        <div
                            v-if="
                                    appComponent.infoModalDeposit.dataImg != undefined &&
                                    appComponent.infoModalDeposit.dataImg != ''
                                "
                            class="w-[143px] md:w-[172px] h-[143px] md:h-[172px] aspect-square"
                        >
                            <!-- Image for the step-by-step instructions -->
                            <img
                                :src="appComponent.infoModalDeposit.dataImg"
                                :alt="appComponent.infoModalDeposit.dataImg"
                                class="mx-auto h-full w-full object-contain object-center rounded-box"
                            />
                        </div>
                        <div class="w-full h-full flex flex-col justify-start items-start gap-2 overflow-auto">
                            <!-- Title for the step-by-step instructions if available -->
                            <p
                                v-if="
                                    appComponent.infoModalDeposit.dataTitle != undefined &&
                                    appComponent.infoModalDeposit.dataTitle != ''
                                "
                                class="w-full text-neutral text-xs md:text-sm text-start"
                                v-html="appComponent.infoModalDeposit.dataTitle"
                            ></p>
                            <!-- Text for the step-by-step instructions if available -->
                            <p
                                v-if="
                                    appComponent.infoModalDeposit.dataText != undefined &&
                                    appComponent.infoModalDeposit.dataText != ''
                                "
                                class="text-neutral text-xs md:text-sm text-start w-full break-words"
                                v-html="appComponent.infoModalDeposit.dataText"
                            ></p>
                        </div>
                    </div>
                </div>

                <RouterLink
                    to="/home"
                    class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-base-content font-semibold bg-primary-focus hover:bg-primary/90 hover:scale-105 transition-all duration-300 ease-in-out"
                    @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = true;
                                    franchiseSelected = undefined; // Resetting selected franchise
                                    appComponent.infoModalDeposit = undefined; // Resetting info modal
                                    amountDeposit = amountDeposit; // Resetting deposit amount
                                }"
                >
                    <!-- Button to start a new deposit -->
                    {{ $t('Nuevo depósito') }}
                </RouterLink>
            </div>
        </div>
    </section>

    <section class="w-full" v-else-if="!isLoading && step === 'fri_gateway_deposit'">
        <h3 class="w-full text-lg font-bold text-center text-neutral absolute top-4 place-self-centerl">
            {{ $t("Déposito") }}
        </h3>
        <ModalConfiguredMethodFri></ModalConfiguredMethodFri>
    </section>

    <section v-else-if="!isLoading && !isLoadingMethod && step === 'addCreditCardForm'"  class="w-full h-full flex flex-col justify-center items-center gap-4 p-4 z-10">
        <!-- Title of the dialog -->
        <h3 class="text-base md:text-lg text-center font-bold capitalize mt-4 text-neutral h-auto py-5 md:py-0">
            {{ $t('Depósito') }}</h3>

        <div
            class="w-full h-[95%] flex flex-col md:flex-row gap-5 justify-start md:justify-center items-start md:items-center md:gap-6 md:px-6 pt-0 md:pt-4 pb-0 md:pb-4 "
            :class="viewAmountInAddCard && stateCard == 'successfulCreditCardTicket' ? 'overflow-scroll md:overflow-hidden scroll-edit' : ''"
        >
            <div v-if="viewAmountInAddCard && !isSubmittingCard && stateCard != 'successfulCreditCardTicket'"
                class="w-full max-w-[420px] md:max-w-[220px] h-[150px] md:h-[407px] flex md:flex-col justify-center items-center md:gap-8 z-10">
                <!-- Container for the deposit amount input and game selection section -->

                <div class="w-[48%] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8">
                    <!-- Section for deposit amount input -->

                    <div
                        class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[217px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50"
                    >
                        <!-- Container for the deposit amount input field -->

                        <span v-if="lastDepositAmount === 0"
                              class="" :class="{
                            'text-xs md:text-base w-full text-center text-neutral': true,
                            '': franchiseSelected === undefined
                        }">
                            <!-- Placeholder text when no previous deposit exists -->
                            {{ franchiseSelected === undefined ? $t('Selecciona el monto') : $t('Valor a depositar') }}
                        </span>

                        <span v-else-if="lastDepositAmount > 0"
                              class="absolute left-0 top-0 flex justify-start items-center gap-1 bg-secondary rounded-tl-box rounded-br-box px-2">
                            <!-- Display of the last deposit amount -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" class="lucide lucide-history-icon lucide-history">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M12 7v5l4 2" />
                            </svg>
                            <span class="text-[9px] text-neutral uppercase">{{ $t('Tu último movimiento') }}</span>
                        </span>

                        <div :class="{
                            'relative w-full flex justify-center items-center': true,
                            '': franchiseSelected === undefined
                        }">
                            <!-- Input field for entering the deposit amount -->
                            <button
                                v-if="franchiseSelected === undefined"
                                class="absolute -left-4 md:-left-5 my-auto h-6 md:h-8 w-6 md:w-8 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md shadow-base-content/50"
                                @click="amountDeposit = Math.abs(amountDeposit) - 1"
                            >
                                <!-- Button to decrease the deposit amount -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="4" stroke-linecap="round"
                                     stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus">
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <div
                                class="text-3xl md:text-4xl w-full h-full text-center text-neutral font-bold flex justify-center items-center">
                                <!-- Display of the deposit amount -->
                                {{ appComponent.session.simbolo_moneda }}
                                <input
                                    type="number"
                                    v-model="amountDeposit"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    :disabled="franchiseSelected !== undefined"
                                    class="h-12 text-center text-neutral text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none rounded-box"
                                    :style="{ width: `${(amountDeposit?.toString().length || 1) + 2}ch`, maxWidth: '60%' }"
                                />
                            </div>
                            <button
                                v-if="franchiseSelected === undefined"
                                class="absolute -right-4 md:-right-5 my-auto h-6 md:h-8 w-6 md:w-8 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md shadow-base-content/40"
                                @click="amountDeposit = Math.abs(amountDeposit) + 1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="4" stroke-linecap="round"
                                     stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </button>
                        </div>

                        <div
                            v-if="franchiseSelected === undefined"
                            class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] max-w-[95%] md:max-w-[85%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-accent-focus/50 rounded-full border border-accent-focus/75">
                            <!-- Display of the current balance -->
                            <span
                                class="w-[24px] md:w-[40px] text-[9px] md:text-[11px] leading-3 text-neutral">{{ $t('Saldo actual')
                                }}</span>
                            <span class="text-sm md:text-[14px] font-bold capitalize text-neutral">
                                {{ appComponent.session.simbolo_moneda }}
                                {{ Math.abs(appComponent.saldo_total).toFixed(2) }}
                            </span>
                        </div>
                    </div>

                    <div v-if="franchiseSelected === undefined"
                         class="min-w-32 w-[95%] flex justify-between items-center">
                        <!-- Buttons for quick deposit amount selection -->
                        <button
                            :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm': methodSelected.mount_1 < 1000
                            }"
                            @click="amountDeposit = methodSelected.mount_1 ? methodSelected.mount_1 : 20"
                        >
                            <!-- Button for selecting a deposit amount of 20 -->
                            {{ appComponent.session.simbolo_moneda }}
                            {{ methodSelected.mount_1 ? formatNumber(methodSelected.mount_1) : 20
                            }}
                        </button>
                        <button
                            :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm':methodSelected.mount_1 < 1000
                            }"
                            @click="amountDeposit = methodSelected.mount_2 ? methodSelected.mount_2 : 50"
                        >
                            <!-- Button for selecting a deposit amount of 50 -->
                            {{ appComponent.session.simbolo_moneda }}
                            {{ methodSelected.mount_2 ? formatNumber(methodSelected.mount_2) : 50
                            }}
                        </button>
                        <button
                            :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm': methodSelected.mount_1 < 1000
                            }"
                            @click="amountDeposit = methodSelected.mount_3 ? methodSelected.mount_3 : 80"
                        >
                            <!-- Button for selecting a deposit amount of 80 -->
                            {{ appComponent.session.simbolo_moneda }}
                            {{ methodSelected.mount_3 ? formatNumber(methodSelected.mount_3) : 80
                            }}
                        </button>
                    </div>
                </div>

                <div v-if="categoryGames !== '' && gamesList.length > 0"
                     class="w-[48%] md:w-full h-full flex justify-center items-center">
                    <!-- Section for displaying game options -->

                    <div
                        class="w-[90%] md:hidden min-w-[111px] h-full min-h-[137px] flex justify-center items-center rounded-box">
                        <!-- Mobile view for game selection -->
                        <div
                            class="relative w-[127px] md:w-[90%] sm:w-full h-[137px] md:h-full flex flex-col justify-center items-center rounded-box bg-gradient-to-b from-[#9F019A] to-[#160134] bg-opacity-50 backdrop-blur-sm backdrop-opacity-25">
                            <swiper-container
                                class="w-[72px] h-[135px] overflow-hidden rounded-box py-1"
                                :slides-per-view="1"
                                :grid-rows="2"
                                :direction="'horizontal'"
                                :mousewheel="true"
                                :mousewheel-force-to-axis="true"
                                :class="'swiper-container' + keySlide2"
                                :navigation="{
                                    nextEl: '.slideNext' + keySlide2,
                                    prevEl: '.slidePrev' + keySlide2,
                                }"
                            >
                                <!-- Individual game slide -->
                                <swiper-slide
                                    v-for="(game, index) in gamesList"
                                    :key="index"
                                    :data-index="index"
                                    class="w-[65px] h-[58px] hover:scale-[1.02] cursor-pointer m-auto"
                                >
                                    <!-- Button for selecting a game -->
                                    <button
                                        @click="$event.stopPropagation();
                                                appComponent.openGame(game);"
                                        class="relative w-full h-full"
                                    >
                                        <!-- Game icon image -->
                                        <img
                                            v-show="
                                                game.icon_2 !== undefined &&
                                                game.icon_2 !== null &&
                                                game.icon_2 !== ''
                                            "
                                            :src="game.icon_2"
                                            :alt="game.name + game.id"
                                            class="w-full h-full object-cover object-center"
                                        />
                                    </button>
                                </swiper-slide>
                            </swiper-container>
                            <button
                                v-if="gamesList.length > 2"
                                class="absolute -left-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral"
                                :class="'slidePrev' + keySlide2">
                                <!-- Button to navigate to the previous game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                v-if="gamesList.length > 2"
                                class="absolute -right-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral"
                                :class="'slideNext' + keySlide2">
                                <!-- Button to navigate to the next game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                        <!-- Desktop view for game selection -->
                        <div
                            class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-gradient-to-br from-[#AD01A450] to-[#0E012E] from-10% bg-opacity-25 backdrop-blur-sm backdrop-opacity-25 aspect-square">
                            <swiper-container
                                class="overflow-hidden rounded-[15px] w-[145px] h-[145px]"
                                :slides-per-view="2"
                                :grid-rows="2"
                                :direction="'horizontal'"
                                :space-between="0"
                                :mousewheel="true"
                                :mousewheel-force-to-axis="true"
                                :class="'swiper-container' + keySlide"
                                :navigation="{
                                    nextEl: '.slideNext' + keySlide,
                                    prevEl: '.slidePrev' + keySlide,
                                }"
                            >
                                <!-- Individual game slide -->
                                <swiper-slide
                                    v-for="(game, index) in gamesList"
                                    :key="index"
                                    :data-index="index"
                                    class="w-[72px] h-[72px] cursor-pointer aspect-square"
                                >
                                    <!-- Button for selecting a game -->
                                    <button
                                        @click="
                                                $event.stopPropagation();
                                                appComponent.openGame(game);
                                            "
                                        class="relative w-full h-full"
                                    >
                                        <!-- Game icon image -->
                                        <img
                                            v-show="
                                                game.icon_3 !== undefined &&
                                                game.icon_3 !== null &&
                                                game.icon_3 !== ''
                                            "
                                            :src="game.icon_3"
                                            :alt="game.name + game.id"
                                            class="w-full h-full object-cover object-center aspect-square hover:scale-105"
                                        />
                                    </button>
                                </swiper-slide>
                            </swiper-container>
                            <button
                                v-if="gamesList.length > 4"
                                class="absolute -left-2 md:-left-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                :class="'slidePrev' + keySlide">
                                <!-- Button to navigate to the previous game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                v-if="gamesList.length > 4"
                                class="absolute -right-2 md:-right-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                :class="'slideNext' + keySlide">
                                <!-- Button to navigate to the next game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else-if="!viewAmountInAddCard"
                class="w-full max-w-[40%] h-[407px] hidden md:flex md:flex-col justify-center items-center md:gap-8 mt-0"
            >
                <img
                    :src="appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                        appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                        appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCentral != undefined
                        ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCentral
                        :'https://images.virtualsoft.tech/m/msj19212T1757018247.png'
                    "
                    alt="icon"
                    class=" object-cover object-center rounded-box absolute left-0 bottom-7"
                />
            </div>

            <div v-if="viewAmountInAddCard && stateCard == 'successfulCreditCardTicket'" class="w-full md:w-[40%]  h-full flex flex-col justify-center items-center gap-5">
                <img
                    :src="appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                        appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                        appComponent.config.depositsView[appComponent.country].creditcardConfig.imgSucces != undefined
                        ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgSucces
                        :'https://images.virtualsoft.tech/m/msj19212T1762550204.png'
                    "
                    alt="icon"
                    class=" object-cover object-center rounded-box h-[60%] md:h-auto"
                />
                <div class="w-full flex flex-col justify-center items-center ">
                    <span class="text-neutral text-xl font-poppinssl">
                        {{$t('¡Tu tarjeta se ha agregado ')}}
                    </span>
                    <span class="text-success text-xl font-poppinsm">
                        {{$t('correctamente!')}}
                    </span>

                </div>
            </div>

            <div v-if="viewAmountInAddCard && isSubmittingCard" class="w-full md:w-[40%]  h-[40%] md:h-full flex flex-col justify-center items-center">
                <img
                    :src="appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                        appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                        appComponent.config.depositsView[appComponent.country].creditcardConfig.imgLoading != undefined
                        ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgLoading
                        :'https://images.virtualsoft.tech/m/msj19212T1762550964.png'
                    "
                    alt="icon"
                    class="md:h-auto h-full object-contain md:object-cover object-center rounded-box"
                />
            </div>

            <div class="w-full max-w-[100%] md:max-w-[60%] h-[40rem] md:h-[407px] rounded-2xl bg-transparent md:bg-base-400/40 z-0 md:z-[54]">
                <div v-if="!viewAmountInAddCard" class="w-[90%] h-[30%] md:h-auto md:hidden flex justify-center items-center pb-2 md:pb-10">
                    <img
                        src="https://images.virtualsoft.tech/m/msj19212T1757340725.png"
                        alt="icon"
                        class="w-[209px] max-w-[100%] h-full md:h-auto object-contain md:object-cover object-center rounded-box"
                    />
                </div>
                <div v-if="!isSubmittingCard && stateCard != 'successfulCreditCard' && stateCard != 'successfulCreditCardTicket'" class="h-[39rem] md:h-full w-full flex flex-col gap-2 md:gap-6">
                    <div
                        class="flex flex-col justify-start md:justify-center items-center gap-3 md:gap-10 overflow-y-scroll scroll-edit rounded-2xl md:bg-transparent bg-base-400/40 h-[45%] md:h-full w-full px-5  pt-8 md:pt-[20rem]"
                    >
                        <div class="w-full h-full flex flex-col justify-center items-start gap-2">
                            <h2
                                class="text-xl text-primary-focus font-poppinssb text-center w-full"
                            >
                                {{$t('Agregar tarjeta de crédito')}}
                            </h2>
                            <p class="text-neutral text-center font-poppinssl text-lg">
                                {{$t('Rellena los campos correspondientes de tu tarjeta ')}}
                            </p>
                            <div class="w-[70%] md:w-full  mx-auto relative"
                                :class="isCardBack ? 'pb-5' : ''"
                            >
                                <div class="card-3d mx-auto">
                                    <div class="card-3d-inner" :class="isCardBack ? 'is-back' : ''">
                                        <!-- FRONT -->
                                        <div class="card-face card-front">
                                            <img
                                                :src="!appComponent.themeSportbook && appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                                                    appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                                                    appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardFront != undefined
                                                    ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardFront
                                                    : appComponent.themeSportbook && appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                                                    appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                                                    appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardFrontTheme != undefined
                                                    ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardFrontTheme
                                                    :'https://images.virtualsoft.tech/m/msj19212T1762790929.png'
                                                "
                                                 alt="card-front" class="absolute inset-0 w-full h-full object-contain rounded-xl" />
                                            <!-- Name -->
                                            <div class="absolute left-[20%] top-1/3 text-[10px] md:text-[12px] font-medium tracking-wide text-neutral/90 select-none">
                                                {{ displayHolder }}
                                            </div>
                                            <!-- Number -->
                                            <div
                                                class="absolute left-[40%] -translate-x-1/2 top-[50%] w-[60%] text-center tracking-widest font-semibold text-neutral drop-shadow-sm "
                                                :class="focusedField == 'number' && cardData.number == '' ? 'border-1 border-primary flex gap-4 items-center' : ''"
                                            >
                                                <IconArrow3 v-if="focusedField == 'number' && cardData.number == ''" width="24" height="27" class="fill-primary"/>
                                              <span class="inline-block text-xs md:text-md leading-none select-none">
                                                {{ displayCardNumber }}
                                              </span>
                                            </div>
                                            <!-- Expires -->
                                            <div
                                                class="absolute left-[20%] bottom-[16%] text-[10px] md:text-[12px] font-medium tracking-wide text-neutral/90 select-none"
                                                :class="focusedField == 'date' && cardData.expiration == '' ? 'border-1 border-primary flex gap-4 items-center' : ''"
                                            >
                                                <IconArrow3 v-if="focusedField == 'date' && cardData.expiration == ''" width="24" height="27" class="fill-primary"/>
                                                <span>
                                                    {{ displayExpiry }}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- BACK -->
                                        <div class="card-face card-back pb-5">
                                            <img
                                                :src="!appComponent.themeSportbook && appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                                                    appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                                                    appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardBack != undefined
                                                    ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardBack
                                                    : appComponent.themeSportbook && appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                                                    appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                                                    appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardBackTheme != undefined
                                                    ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgCardBackTheme
                                                    :'https://images.virtualsoft.tech/m/msj0212T1762793483.png'
                                                "
                                                 alt="card-front" class="absolute inset-0 w-full h-full object-contain rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    class="absolute md:hidden bottom-0 -right-1 rounded-full focus:outline-none"
                                    @click="openScanOverlay"
                                    aria-label="Escanear tarjeta"
                                >
                                    <img
                                        :src="appComponent.config != undefined && appComponent.config.depositsView != undefined && appComponent.config.depositsView[appComponent.country] != undefined &&
                                            appComponent.config.depositsView[appComponent.country] != undefined && appComponent.config.depositsView[appComponent.country].creditcardConfig != undefined &&
                                            appComponent.config.depositsView[appComponent.country].creditcardConfig.imgScane != undefined
                                            ? appComponent.config.depositsView[appComponent.country].creditcardConfig.imgScane
                                            :'https://images.virtualsoft.tech/m/msj19212T1759937102.png'
                                        "
                                        class="cursor-pointer hover:scale-105 transition"
                                    />
                                </button>
                            </div>

                        </div>

                        <div class="w-full max-w-md flex flex-col justify-center items-center gap-3 md:gap-6 pt-2 md:pt-20">
                            <div class="flex flex-col w-full gap-1">
                                <label class="text-neutral">{{$t('Número de tarjeta*')}}</label>

                                <div class="relative">
                                    <input
                                        v-model="cardData.numberFormatted"
                                        type="text"
                                        inputmode="numeric"
                                        autocomplete="cc-number"
                                        maxlength="19"
                                        @input="handleCardNumberInput"
                                        @focus="
                                            flipToFront;
                                            focusedField = 'number';
                                        "
                                        placeholder="0000 0000 0000 0000"
                                        required
                                        class="pl-4 pr-12 rounded-full text-center bg-base-100 border-1 border-primary w-full placeholder-neutral/50 text-neutral py-px md:py-2"
                                    />
                                    <img
                                        v-if="currentBrand"
                                        :src="brandLogoSrc()"
                                        alt="brand"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-auto select-none pointer-events-none"
                                    />
                                </div>

                                <span v-if="appComponent.modal.messageModal?.errors?.number" class="error">
                                {{ appComponent.modal.messageModal.errors.number }}
                            </span>
                            </div>

                            <div v-if="!viewAmountInAddCard" class="flex flex-col w-full gap-1">
                                <label class="text-neutral">{{$t('Titular')}}</label>
                                <input
                                    v-model="appComponent.session.nombre"
                                    type="text"
                                    :disabled="true"
                                    required
                                    class="rounded-full bg-base-100/50 border-1 w-full placeholder-neutral text-neutral opacity-25 py-px md:py-2"
                                />
                            </div>

                            <div v-else-if="viewAmountInAddCard" class="flex flex-row justify-center items-center gap-5 w-full">
                                <div class="flex flex-col w-full gap-1">
                                    <label class="text-neutral">{{$t('Titular')}}</label>
                                    <input
                                        v-model="appComponent.session.nombre"
                                        type="text"
                                        :disabled="true"
                                        required
                                        class="rounded-full bg-base-100/50 border-1 w-full placeholder-neutral text-neutral opacity-25 py-px md:py-2"
                                    />
                                </div>

                                <div class="flex flex-col w-full gap-1">
                                    <div class="relative">
                                        <label class="text-neutral">{{$t('Fecha de expiración')}}</label>

                                        <div class="relative mt-1" @click="openMonthPicker">
                                            <!-- VISUAL: input “bonito” con ícono -->
                                            <div
                                                class="flex items-center justify-between h-7 md:h-10 rounded-full bg-base-100 border-1 border-input-border w-full px-4 select-none cursor-pointer py-px md:py-2"
                                            >
                                                <span v-if="!cardData.expiration" class="text-neutral/50">MM/AA</span>
                                                <span v-else class="text-neutral text-base font-medium">{{ cardData.expiration }}</span>
                                                <!-- Icono calendario -->
                                                <svg v-if="!appComponent.themeSportbook"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     class="h-5 w-5 mr-2 shrink-0"
                                                     fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     aria-hidden="true">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                                </svg>

                                                <svg v-else-if="appComponent.themeSportbook"
                                                     class="h-5 w-5 mr-2 shrink-0 "
                                                     id="Capa_2" data-name="Capa 2"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 94.05 102.65"
                                                >
                                                    <g id="Capa_1-2" data-name="Capa 1">
                                                        <path d="M80.28,10.07h-10.17v-5.63c0-1.22-.49-2.34-1.3-3.14-.8-.8-1.91-1.3-3.14-1.3-2.45,0-4.43,1.99-4.43,4.44v5.63h-28.64v-5.63c0-1.22-.5-2.34-1.3-3.14s-1.92-1.3-3.14-1.3c-2.45,0-4.44,1.99-4.44,4.44v5.63h-9.94C6.17,10.07,0,16.24,0,23.85v65.03c0,7.61,6.17,13.77,13.78,13.77h66.5c7.61,0,13.77-6.16,13.77-13.77V23.85c0-7.61-6.16-13.78-13.77-13.78ZM85.05,88.88c0,2.63-2.14,4.77-4.77,4.77H13.78c-2.63,0-4.78-2.14-4.78-4.77v-42.13h76.05v42.13ZM85.05,37.98H9v-14.13c0-2.63,2.15-4.78,4.78-4.78h9.94v4.04c0,2.45,1.99,4.44,4.44,4.44s4.44-1.99,4.44-4.44v-4.04h28.64v4.04c0,2.45,1.98,4.44,4.43,4.44s4.44-1.99,4.44-4.44v-4.04h10.17c2.63,0,4.77,2.15,4.77,4.78v14.13Z"/>
                                                    </g>
                                                </svg>
                                            </div>

                                            <!-- REAL: month picker nativo transparente sobre toda el área -->
                                            <input
                                                ref="monthInput"
                                                v-model="cardData.expiration_date"
                                                type="month"
                                                :min="minMonth"
                                                @focus="
                                                    flipToFront
                                                    focusedField = 'date';
                                                "
                                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                @input="syncExpirationFromDate"
                                                @change="syncExpirationFromDate"
                                                aria-label="Seleccionar mes y año"
                                            />
                                        </div>
                                    </div>
                                    <span v-if="appComponent.modal.messageModal?.errors?.expiration" class="error">
                                  {{ appComponent.modal.messageModal.errors.expiration }}
                                </span>
                                </div>
                            </div>

                            <div class="flex flex-row justify-center items-center gap-5 w-full">
                                <div v-if="!viewAmountInAddCard" class="flex flex-col w-full gap-1">
                                    <div class="relative">
                                        <label class="text-neutral">{{$t('Fecha de expiración')}}</label>

                                        <div class="relative mt-1" @click="openMonthPicker">
                                            <!-- VISUAL: input “bonito” con ícono -->
                                            <div
                                                class="flex items-center justify-between h-7 md:h-10 rounded-full bg-base-100 border-1 border-input-border w-full px-4 select-none cursor-pointer py-px md:py-2"
                                            >
                                                <span v-if="!cardData.expiration" class="text-neutral/50">MM/AA</span>
                                                <span v-else class="text-neutral text-base font-medium">{{ cardData.expiration }}</span>
                                                <!-- Icono calendario -->
                                                <svg v-if="!appComponent.themeSportbook"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     class="h-5 w-5 mr-2 shrink-0 "
                                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     aria-hidden="true">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                                </svg>

                                                <svg v-else-if="appComponent.themeSportbook"
                                                     class="h-5 w-5 mr-2 shrink-0 "
                                                     id="Capa_2" data-name="Capa 2"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 94.05 102.65"
                                                >
                                                    <g id="Capa_1-2" data-name="Capa 1">
                                                        <path d="M80.28,10.07h-10.17v-5.63c0-1.22-.49-2.34-1.3-3.14-.8-.8-1.91-1.3-3.14-1.3-2.45,0-4.43,1.99-4.43,4.44v5.63h-28.64v-5.63c0-1.22-.5-2.34-1.3-3.14s-1.92-1.3-3.14-1.3c-2.45,0-4.44,1.99-4.44,4.44v5.63h-9.94C6.17,10.07,0,16.24,0,23.85v65.03c0,7.61,6.17,13.77,13.78,13.77h66.5c7.61,0,13.77-6.16,13.77-13.77V23.85c0-7.61-6.16-13.78-13.77-13.78ZM85.05,88.88c0,2.63-2.14,4.77-4.77,4.77H13.78c-2.63,0-4.78-2.14-4.78-4.77v-42.13h76.05v42.13ZM85.05,37.98H9v-14.13c0-2.63,2.15-4.78,4.78-4.78h9.94v4.04c0,2.45,1.99,4.44,4.44,4.44s4.44-1.99,4.44-4.44v-4.04h28.64v4.04c0,2.45,1.98,4.44,4.43,4.44s4.44-1.99,4.44-4.44v-4.04h10.17c2.63,0,4.77,2.15,4.77,4.78v14.13Z"/>
                                                    </g>
                                                </svg>
                                            </div>

                                            <!-- REAL: month picker nativo transparente sobre toda el área -->
                                            <input
                                                ref="monthInput"
                                                v-model="cardData.expiration_date"
                                                type="month"
                                                :min="minMonth"
                                                @focus="
                                                    flipToFront;
                                                    focusedField = 'date';
                                                "
                                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                @input="syncExpirationFromDate"
                                                @change="syncExpirationFromDate"
                                                aria-label="Seleccionar mes y año"
                                            />
                                        </div>
                                    </div>
                                    <span v-if="appComponent.modal.messageModal?.errors?.expiration" class="error">
                                  {{ appComponent.modal.messageModal.errors.expiration }}
                                </span>
                                </div>

                                <div class="flex flex-col w-full gap-1">
                                    <label class="text-neutral">{{$t('CVV*')}}</label>
                                    <input
                                        :value="cardData.cvv"
                                        @input="onCvvInputAddCard($event)"
                                        @keydown="onNumericKeydown"
                                        type="password"
                                        placeholder="CVV"
                                        inputmode="numeric"
                                        @focus="flipToBack"
                                        @blur="flipToFront"
                                        pattern="\d*"
                                        :maxlength="cvvExpectedLengthFor(card)"
                                        required
                                        @click.stop
                                        class="rounded-full bg-base-100 border-1 border-input-border w-full text-neutral placeholder-input-placeholder py-px md:py-2"
                                    />
                                    <!-- error message -->
                                    <span v-if="cvvErrorAddCard" class="text-error text-xs mt-1 block">
                                      {{ cvvErrorAddCard }}
                                    </span>
                                </div>

                                <div v-if="viewAmountInAddCard" class="flex flex-col w-full gap-1">
                                    <label class="text-neutral">{{$t('Monto*')}}</label>
                                    <input
                                    v-model="amountDeposit"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    @input="onAmountInputAddCard($event)"
                                    @keydown="onNumericKeydown"
                                    type="text"
                                    placeholder="Monto"
                                    inputmode="numeric"
                                    pattern="\d*"
                                    required
                                    class="rounded-full bg-base-100 border-1 border-input-border w-full text-neutral placeholder-input-placeholder py-px md:py-2"
                                    >
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="w-full flex justify-between gap-4 p-1 md:p-3 sticky bottom-0 left-0 right-0 z-[70] bg-transparent backdrop-blur-sm border-t border-base-content/10 md:static md:bg-transparent md:backdrop-blur-0 md:border-0 ">
                        <button
                            @click="nextStep('creditCardList');
                                cardData = {
                                    number: '',
                                    numberFormatted: '',
                                    holder: '',
                                    expiration: '',
                                    cvv: '',
                                };
                                currentBrand = null;
                                focusedField = '';
                            "
                            class="w-auto px-3 h-10 rounded-full flex gap-1 justify-center items-center text-neutral font-bold bg-secondary"
                            data-analytics-label="deposit:back"
                            data-analytics-context="step:enter-card|step-num:2"
                        >
                            <span class="text-sm">
                                <IconArrow2 width="10" height="10" class="fill-neutral" />
                            </span>
                            {{$t('Atrás')}}
                        </button>
                        <button
                            @click="submitCardDeposit"
                            class="w-auto px-3 h-10 rounded-full bg-primary text-neutral font-bold flex gap-1 justify-center items-center "
                            data-analytics-label="deposit:confirm"
                            data-analytics-context="step:confirm|step-num:3|method:credit-card"
                        >
                            {{$t('Siguiente')}}
                            <span class="rotate-180">
                                <IconArrow2 width="10" height="10" class="fill-neutral" />
                            </span>
                        </button>
                    </div>
                </div>
                <div
                    v-else-if="isSubmittingCard && stateCard != 'successfulCreditCard' && stateCard != 'successfulCreditCardTicket'"
                    class="flex flex-col justify-center items-center gap-10 overflow-y-hidden md:overflow-y-scroll rounded-2xl md:bg-transparent bg-base-400/40 h-[40%] md:h-full w-full "
                >
                    <div class="w-10/12 h-full flex flex-col justify-center items-start gap-2">
                        <h2
                            class="text-xl text-primary-focus font-poppinssb text-center w-full"
                        >
                            {{$t('Agregar tarjeta de crédito')}}
                        </h2>
                        <p class="text-neutral text-center font-poppinssl text-xl text-center w-full">
                            {{$t('Estamos procesando tus datos')}}
                        </p>
                        <!-- Animated progress bar -->
                        <div class="w-full mt-4" aria-live="polite">
                            <div class="vs-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Cargando">
                                <div class="vs-progress__bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="!isSubmittingCard && stateCard == 'successfulCreditCard'"
                    class="flex flex-col justify-center items-center gap-10 overflow-y-hidden md:overflow-y-scroll rounded-2xl md:bg-transparent bg-base-400/40 h-[25rem] md:h-full w-full "
                >
                    <div class="w-10/12 h-full flex flex-col justify-center items-start gap-8">
                        <h2
                            class="text-2xl text-primary-focus font-poppinssb text-center w-full"
                        >
                            {{$t('Agregar tarjeta de crédito')}}
                        </h2>

                        <div class="w-full flex justify-center items-center">
                            <IconCheckCard width="76" height="75"/>
                        </div>

                        <p class="text-neutral text-center font-poppinssl text-2xl">
                            {{$t('Tu tarjeta se ha agregado correctamente')}}
                        </p>

                        <div class=" w-full flex justify-end gap-5 pb-3">
                            <button
                                @click="nextStep('creditCardList');
                                cardData = {
                                    number: '',
                                    numberFormatted: '',
                                    holder: '',
                                    expiration: '',
                                    cvv: '',
                                };
                                currentBrand = null;
                                stateCard = '';
                            "
                                class="w-auto px-8 h-12 rounded-full flex gap-3 justify-center items-center text-neutral font-bold bg-primary"
                                data-analytics-label="deposit:back"
                                data-analytics-context="step:enter-card|step-num:2"
                            >
                                {{$t('Finalizar')}}
                            </button>

                        </div>
                    </div>
                </div>
                <div
                    v-else-if="!isSubmittingCard && stateCard == 'successfulCreditCardTicket'"
                    class="w-full h-full flex flex-col justify-around items-center py-10 md:py-2 rounded-xl bg-base-300 bg-opacity-30">
                    <div class="w-full flex flex-col justify-center items-center gap-1">
                        <h3 class="text-lg md:text-2xl text-center font-bold text-neutral">
                            {{ $t('¡Depósito exitoso!') }}</h3>
                        <span
                            class="text-sm md:text-lg text-center font-light text-neutral">{{ $t('¡Dale un vistazo a tu resumen de déposito!')
                            }}</span>
                    </div>

                    <div
                        class="relative w-full md:w-[90%] grid grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 p-5  shadow-inner"
                    >
                        <!-- (Opcional) Texto/fondo decorativo si existe en config -->
                        <img
                            v-if="appComponent.config.depositsView !== undefined
                                       && appComponent.config.depositsView[appComponent.country] !== undefined
                                       && appComponent.config.depositsView[appComponent.country]['successBackgroundTextImage'] !== undefined"
                            :src="appComponent.config.depositsView[appComponent.country]['successBackgroundTextImage']"
                            alt="background-text"
                            class="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-60"
                        />

                        <!-- Monto depositado -->
                        <span class="text-neutral/80">{{ $t('Monto depositado') }}</span>
                        <span class="text-right font-bold text-neutral">
                              {{ appComponent.session.simbolo_moneda }}{{ formatAmount(ticket.valor) }}
                            </span>

                        <!-- Método -->
                        <span class="text-neutral/80">{{ $t('Método') }}</span>
                        <span class="text-right font-semibold text-neutral">
                              {{ ticket.method || '-' }}
                            </span>

                        <!-- Tienda -->
                        <span class="text-neutral/80">{{ $t('Tienda') }}</span>
                        <span class="text-right font-semibold text-neutral">
                              {{ ticket.store || '-' }}
                            </span>

                        <!-- ID -->
                        <span class="text-neutral/80">ID</span>
                        <span class="text-right font-semibold text-neutral">
                              {{ ticket.id || '-' }}
                            </span>

                        <!-- Fecha y hora -->
                        <span class="text-neutral/80">{{ $t('Fecha y hora') }}</span>
                        <span class="text-right font-semibold text-neutral">
                              {{ formatDateTime(ticket.dataTime) }}
                            </span>

                        <!-- Separador -->
                        <div class="col-span-2 my-1 border-t border-base-content/10"></div>

                        <!-- Monto actual con retiro -->
                        <span class="text-neutral font-extrabold">{{ $t('Monto actual con retiro') }}</span>
                        <span class="text-right font-extrabold text-neutral">
                              {{ appComponent.session.simbolo_moneda }}{{ formatAmount(ticket.balance) }}
                            </span>
                    </div>

                    <div class="w-full flex justify-between items-center gap-4 px-2">
                        <!-- Buttons for further actions -->
                        <RouterLink
                            to="/home"
                            class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-neutral font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                            @click="() => {
                                finalStatus = 'empty';
                                step = 0;
                                stateCard = '';
                                isSubmittingCard = false;
                                cardData = {
                                    number: '',
                                    numberFormatted: '',
                                    holder: '',
                                    expiration: '',
                                    cvv: '',
                                };
                                appComponent.showModalDepositV3 = false;
                            }"
                        >
                            {{ $t('Participar en torneo') }}
                        </RouterLink>
                        <RouterLink
                            to="/home"
                            class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-neutral bg-secondary backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                            @click="() => {
                                finalStatus = 'empty';
                                step = 0;
                                stateCard = '';
                                isSubmittingCard = false;
                                methodSelected = {
                                    id: 'empty',
                                    amount_min: 0,
                                    amount_max: 0,
                                };
                                cardData = {
                                    number: '',
                                    numberFormatted: '',
                                    holder: '',
                                    expiration: '',
                                    cvv: '',
                                };
                                appComponent.showModalDepositV3 = true;
                            }"
                        >
                            {{ $t('Nueva recarga') }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- View of registered cards -->
    <div v-else-if="!isLoading && step === 'creditCardList'" class="w-full h-full flex flex-col gap-4 p-4 z-10 ">
        <h3 class="text-lg font-bold text-center text-neutral">
            {{ $t("Déposito") }}
        </h3>

        <div class="flex flex-col md:flex-row gap-4 mx-4">
        <DepositAmount
        :amountDeposit="amountDeposit"
        :lastDepositAmount="lastDepositAmount"
        :franchiseSelected="franchiseSelected"
        :methodSelected="methodSelected"
        :categoryGames="categoryGames"
        :gamesList="gamesList"
        :appComponent="appComponent"
        @update:amountDeposit="amountDeposit = $event"
        />
            <div v-if="!deleteCardView" class="w-full h-[28%] md:h-[30rem] p-2 md:p-6 rounded-xl bg-base-400/40 pb-10 md:pb-3">

                <div class="w-full h-[90%] flex items-start overflow-y-scroll scroll-edit ">
                    <div class="w-full grid grid-cols-2 grid-rows-3 justify-items-center items-center gap-2 ">
                        <!-- Add new card button -->
                        <button
                            v-if="!disableAddCardButton"
                            class="h-32 flex flex-col justify-center items-center gap-4 p-4 w-full border border-success rounded-xl cursor-pointer bg-gradient-to-b from-base-100 to-neutral-content transition "
                            @click="nextStep('addCreditCardForm')"
                            data-analytics-label="deposit:method:credit-card"
                            data-analytics-position="1"
                            data-analytics-context="step:method:credit-card"
                        >
                            <IconMore class="w-8 h-8" />
                            <p class="text-sm font-poppinssl text-neutral text-center w-10/12">
                                {{ $t("Agregar tarjeta de crédito") }}
                            </p>
                        </button>
                        <div
                            v-for="(card, index) in credit_cards"
                            :key="index"
                            :data-analytics-label="'deposit:method:credit-card'"
                            :data-analytics-position="String(index + 1)"
                            :data-analytics-context="'step:select-method|step-num:1|method:credit-card'"
                            class="flex justify-between items-center h-32 w-full border rounded-xl cursor-pointer transition relative"
                            :class="[
                          card.activateCvc == 'S' ? 'p-2' : 'p-4',
                          (selectedCardId === (card.id ?? card.card_id)) ? 'ring-2 ring-success bg-base-200/60' : 'hover:bg-base-200',
                            !appComponent.themeSportbook && getCardBrand(card) == 'Visa' ? 'bg-[#0343a8] hover:bg-[#0343a8]/60'
                            : appComponent.themeSportbook && getCardBrand(card) == 'Visa' ? 'bg-[#D0D0D0] hover:bg-[#D0D0D0]/60'
                            : !appComponent.themeSportbook && getCardBrand(card) == 'Mastercard' ? 'bg-[#1C1D21] hover:bg-[#1C1D21]/60'
                            : appComponent.themeSportbook && getCardBrand(card) == 'Mastercard' ? 'bg-[#5F6064] hover:bg-[#5F6064]/60'
                            : !appComponent.themeSportbook && getCardBrand(card) == 'amex' ? 'bg-[#002663] hover:bg-[#002663]/60'
                            : appComponent.themeSportbook && getCardBrand(card) == 'amex' ? 'bg-[#1C82C8] hover:bg-[#1C82C8]/60'
                            : !appComponent.themeSportbook && getCardBrand(card) == 'Diners' ? 'bg-[#006272] hover:bg-[#006272]/60'
                            : appComponent.themeSportbook && getCardBrand(card) == 'Diners' ? 'bg-[#838383] hover:bg-[#838383]/60'
                            : !appComponent.themeSportbook && getCardBrand(card) == 'Discover' ? 'bg-[#f76b1c] hover:bg-[#f76b1c]/60'
                            : appComponent.themeSportbook && getCardBrand(card) == 'Discover' ? 'bg-[#f76b1c] hover:bg-[#f76b1c]/60'
                            : 'hover:bg-base-200',
                        ]"
                            @click="card.activateCvc == 'S' && card.Cvc == '' ? '' : selectCreditCard(card)"
                        >
                            <div class="absolute top-2 left-3">
                                <img v-if="getCardLogo(card.initNumber) !== ''" :src="getCardLogo(card.initNumber)" alt="brand" class="h-8" />
                            </div>
                            <button
                                class="absolute top-3 right-3"
                                @click.stop.prevent="openDeleteCard(card)"
                                @mousedown.stop.prevent
                                aria-label="Eliminar tarjeta"
                            >
                                <DustmanIcon width="20" height="20"/>
                            </button>
                            <div
                                class="flex flex-col w-full h-full justify-end"
                            >
                            <span class="font-semibold text-neutral">
                              {{ card.cuenta }}
                            </span>
                                <hr>
                                <div class="w-full flex items-end justify-end">
                                <span class="text-sm text-neutral">
                                    {{ card.expirationDate }}
                                </span>
                                </div>
                                <div
                                    v-if="card.activateCvc == 'S'"
                                    class="w-full"
                                >
                                    <input
                                        v-model="card.Cvc"
                                        type="password"
                                        placeholder="CVV"
                                        maxlength="3"
                                        required
                                        @click.stop
                                        class="rounded-full h-6 sm:h-8 bg-base-100 border-1 border-input-border w-full text-neutral placeholder-input-placeholder"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="w-full flex items-center justify-end py-3">
                    <button
                        class="px-6 py-2 rounded-full bg-primary text-neutral font-bold"
                        :class="!canDeposit ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition ease-in-out'"
                        :disabled="!canDeposit"
                        @click="handleDeposito()"
                        data-analytics-label="deposit:confirm"
                        :data-analytics-context="`step:confirm|step-num:3|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || 'credit-card').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                    >
                        {{ isLoadingDeposit ? $t("Procesando...") : $t("Depositar") }}
                    </button>

                </div>
            </div>
            <div v-else-if="deleteCardView" class="w-full h-[50%] md:h-[30rem] p-2 md:p-10 rounded-xl flex flex-col justify-center items-center gap-3 md:gap-6">
                <h2 class="text-xl text-primary-focus font-poppinssb text-center w-full mb-0 md:mb-6">
                    {{$t("¿Deseas eliminar tu tarjeta de crédito?")}}
                </h2>
                <p class="text-lg text-neutral text-center w-full mb-0 md:mb-6 font-poppinssl">
                    {{$t("Al darle")}}
                    <span class="font-poppinssb">
                        {{$t("'Aceptar'")}}
                    </span>
                    {{$t(", todos los datos de tu tarjeta serán eliminados permanentemente. Si no deseas eliminar, haz clic en ")}}
                    <span class="font-poppinssb">
                        {{$t("'Cancelar'")}}
                    </span>
                </p>
                <div class="w-10/12 flex justify-between">
                    <button
                        class="px-6 py-2 rounded-full bg-primary/30 text-primary font-bold hover:scale-105 transition ease-in-out"
                        @click="deleteCardView = false; cardToDelete = '';"
                    >
                        {{$t("Cancelar")}}
                    </button>
                    <button
                        class="px-6 py-2 rounded-full bg-primary text-neutral-content font-bold hover:scale-105 transition ease-in-out"
                        :disabled="isLoadingDeleteCard"
                        @click="deleteCard(cardToDelete)"
                    >
                        {{ $t("Aceptar") }}
                    </button>

                </div>
            </div>
        </div>

    </div>

    <!-- Loading animation -->
    <div v-if="finalStatus === 'loading'" class="flex flex-col items-center justify-center py-12 gap-4">
        <svg class="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"></path>
        </svg>
        <p class="text-neutral">{{ $t("Procesando tu tarjeta...") }}</p>
    </div>

    <!-- Authentication (3D Secure) -->
    <div v-if="finalStatus === 'authenticating'" class="flex flex-col items-center justify-center py-12 gap-4">
        <p class="text-neutral">{{ $t("Estamos redirigiéndote al banco para autenticación...") }}</p>
    </div>

    <!-- Success -->
    <div v-if="finalStatus === 'successful'" class="flex flex-col items-center justify-center py-12 gap-4">
        <svg class="h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="text-green-600 font-semibold">{{ $t("¡Tu tarjeta fue registrada con éxito!") }}</p>
    </div>

    <!-- Failed -->
    <div v-if="finalStatus === 'failed'" class="flex flex-col items-center justify-center py-12 gap-4">
        <svg class="h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p class="text-red-600 font-semibold">{{ $t("No se pudo registrar la tarjeta. Intenta nuevamente.") }}</p>
    </div>

    <Teleport v-if="finalStatus !== 'empty'" to="body">
        <!-- Teleport component to render the modal outside the current DOM hierarchy -->
        <dialog class="modal in w-screen h-screen bg-base-content bg-opacity-80 backdrop-blur-sm">
            <!-- Dialog container with modal styles -->
            <div
                class="modal-v3 relative rounded-box w-full h-full flex flex-col justify-start items-center min-w-[340px] max-w-[756px] min-h-[542px] max-h-[542px] sm:max-h-[524px] bg-base-200 bg-opacity-90 border-2 border-accent-focus/10"
            >
                <!-- Background image for the modal -->
                <img
                    v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['backgroundGradient'] !== undefined"
                    :src="appComponent.config.depositsView[appComponent.country]['backgroundGradient']"
                    alt="background-modal"
                    class="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-box opacity-25 z-1" />
                    <!-- Botón "Volver" -->
                    <!-- Botón de retroceder v-if="step !== 0"-->



                <!-- Close button for the modal -->
                <RouterLink
                    v-if="finalStatus !== 'processing'"
                    to="/home"
                    class="absolute right-3 top-3 hover:scale-125 z-[99]"
                    data-analytics-label="deposit:close-modal"
                    data-analytics-context="step:select-method|step-num:1"
                    @click="() => {
                    finalStatus = 'empty';
                    appComponent.showModalDepositV3 = false
                }"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-x-icon lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </RouterLink>

                <div v-if="finalStatus === 'processing'"
                    class="relative w-full h-full flex flex-col md:flex-row justify-around items-center p-4 z-10 overflow-y-scroll md:overflow-y-hidden scroll-edit">
                    <AnimatedPlaceholder class="bg-base-100 absolute right-3 top-3 w-6 h-6 rounded-full z-[999]"/>
                    <!-- Section displayed when the component is in a loading state -->
                     <div class="w-full max-w-[420px] md:max-w-[220px] h-[150px] md:h-[407px] flex md:flex-col justify-center items-center md:gap-8 z-10 mt-4 md:mt-0 py-10 md:py-0">
                            <div class="w-[240px] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8 mx-auto">
                                <div class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[240px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50">
                                <AnimatedPlaceholder class="w-36 h-4 bg-base-100 rounded-xl mb-3" />
                                <div class="w-auto md:w-full flex justify-center items-center gap-4">
                                    <AnimatedPlaceholder class="absolute left-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="w-24 md:w-32 h-12 bg-base-100 rounded-xl"/>
                                    <AnimatedPlaceholder class="absolute right-2 h-7 w-7 rounded-full bg-base-100"/>
                                    <AnimatedPlaceholder class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-base-100 rounded-full"/>
                                </div>
                                </div>
                                <div class="min-w-32 w-[95%] flex justify-between items-center">
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                    <AnimatedPlaceholder class="w-16 h-7 bg-base-100 rounded-xl" />
                                </div>
                            </div>
                            <div
                                v-if="categoryGames !== '' && gamesList.length > 0"
                                class="w-full h-20 md:h-full flex justify-center items-center">
                                <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                                    <AnimatedPlaceholder class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-base-100 opacity-40"/>
                                    <div class="absolute grid grid-cols-2 overflow-hidden rounded-[15px] w-[145px] h-[145px]">
                                        <AnimatedPlaceholder v-for="i in 4" class="w-[72px] h-[72px]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="w-full h-full md:max-h-[325px] max-w-[95%] md:max-w-[55%] flex flex-col justify-around items-center py-10 md:py-2 rounded-xl bg-base-300 bg-opacity-30">
                            <div class="w-full flex flex-col justify-center items-center gap-3">
                                <AnimatedPlaceholder class="w-48 h-6 bg-base-100 rounded-xl" />
                                <AnimatedPlaceholder class="w-96 h-6 bg-base-100 rounded-xl" />
                            </div>
                            <div class="relative w-full md:w-[90%] grid grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 p-5 shadow-inner">
                                <AnimatedPlaceholder v-for="i in 12" class="w-full h-6 bg-base-100 rounded-xl" />
                            </div>
                        </div>
                </div>

                <div v-if="finalStatus === 'successful'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-start md:justify-center items-center md:gap-4 py-8 z-10">
                    <!-- Section displayed when the deposit is successful -->
                    <div v-if="gamesList.length > 0"
                         class="w-full md:max-w-[214px] h-full md:max-h-[207px] flex flex-col justify-start items-center gap-10">
                        <!-- Section for displaying games if available -->
                        <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                            <div
                                class="relative w-full h-full max-h-[207px] flex justify-center items-center py-3 px-5 rounded-box bg-purple-500/25 backdrop-blur-sm backdrop-opacity-25 aspect-square">
                                <!-- Swiper container for game slides -->
                                <swiper-container
                                    class="w-full h-full overflow-hidden rounded-box"
                                    :slides-per-view="2"
                                    :grid-rows="2"
                                    :direction="'horizontal'"
                                    :space-between="0"
                                    :mousewheel="true"
                                    :mousewheel-force-to-axis="true"
                                    :class="'swiper-container' + keySlide3"
                                    :navigation="{
                                nextEl: '.slideNext' + keySlide3,
                                prevEl: '.slidePrev' + keySlide3,
                            }"
                                >
                                    <!-- Individual game slide -->
                                    <swiper-slide
                                        v-for="(game, index) in gamesList"
                                        :key="index"
                                        :data-index="index"
                                        class="w-[85px] h-[90px] hover:scale-105 cursor-pointer m-auto"
                                    >
                                        <!-- Button for selecting a game -->
                                        <button
                                            @click="
                                            $event.stopPropagation();
                                            appComponent.openGame(game);
                                        "
                                            class="relative w-full h-full"
                                        >
                                            <!-- Game icon image -->
                                            <img
                                                v-show="
                                            game.icon_2 !== undefined &&
                                            game.icon_2 !== null &&
                                            game.icon_2 !== ''
                                        "
                                                :src="game.icon_2"
                                                :alt="game.name + game.id"
                                                class="w-full h-full object-cover object-center aspect-square"
                                            />
                                        </button>
                                    </swiper-slide>
                                </swiper-container>

                                <!-- Navigation buttons for the swiper -->
                                <button
                                    v-if="gamesList.length > 4"
                                    class="absolute -left-2 md:-left-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-secondary hover:scale-110 cursor-pointer text-xs"
                                    :class="'slidePrev' + keySlide3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                </button>
                                <button
                                    v-if="gamesList.length > 4"
                                    class="absolute -right-2 md:-right-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-secondary hover:scale-110 cursor-pointer"
                                    :class="'slideNext' + keySlide3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-[50%] h-full flex flex-col justify-center items-center gap-10">
                        <!-- Section for displaying deposit success details -->
                        <div class="w-full flex flex-col justify-center items-center gap-2">
                            <h3 :class="depositSuccessData.id !== '' ? '' : 'text-xl' + ' text-lg text-center font-bold'">
                                {{ $t('¡Depósito exitoso!') }}
                            </h3>
                            <span v-if="depositSuccessData.id !== ''" class="text-sm text-center font-light">
                            {{ $t('Dale un vistazo a tu resumen de déposito') }}
                        </span>
                        </div>

                        <div v-if="depositSuccessData.id !== ''"
                             class="w-full flex flex-col justify-between items-center gap-4 text-neutral">
                            <!-- Displaying deposit details -->
                            <div class="flex justify-between items-center w-full text-sm font-light">
                                <span class="text-start text-gray-300">{{ $t('Valor') }}</span>
                                <span class="font-bold text-end">{{ appComponent.session.simbolo_moneda
                                    }}{{ Math.abs(parseFloat(depositSuccessData.monto)).toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between items-center w-full text-sm font-light">
                                <span class="text-start text-gray-300">{{ $t('Metodo') }}</span>
                                <span class="font-bold text-end">{{ depositSuccessData.metodo }}</span>
                            </div>
                            <div class="flex justify-between items-center w-full text-sm font-light">
                                <span class="text-start text-gray-300">{{ $t('Tienda') }}</span>
                                <span class="font-bold text-end">{{ depositSuccessData.tienda }}</span>
                            </div>
                            <div class="flex justify-between items-center w-full text-sm font-light">
                                <span class="text-start text-gray-300">{{ $t('ID') }}</span>
                                <span class="font-bold text-end">{{ depositSuccessData.id }}</span>
                            </div>
                            <div class="flex justify-between items-center w-full text-sm font-light">
                                <span class="text-start text-gray-300">{{ $t('Fecha y hora') }}</span>
                                <span class="font-bold text-end">{{ depositSuccessData.fecha_hora }}</span>
                            </div>
                            <div class="flex justify-between items-center w-full text-base font-bold mt-2">
                                <span class="text-start text-gray-300">{{ $t('Monto actual con retiro') }}</span>
                                <span class="text-end">{{ appComponent.session.simbolo_moneda
                                    }}{{ Math.abs(parseFloat(depositSuccessData.saldo_total)).toFixed(2) }}</span>
                            </div>
                        </div>

                        <div class="w-full flex flex-col md:flex-row justify-center items-center gap-4 mt-12">
                            <!-- Buttons for further actions -->
                            <RouterLink
                                to="/torneos"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] text-neutral font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                appComponent.showModalDepositV3 = false;
                            }"
                            >
                                {{ $t('Participar en torneo') }}
                            </RouterLink>
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-neutral bg-secondary backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                appComponent.showModalDepositV3 = true;
                            }"
                            >
                                {{ $t('Nueva recarga') }}
                            </RouterLink>
                        </div>
                    </div>

                    <!-- Decorative images for the modal -->
                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration1'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration1']" alt="decoration1"
                        class="absolute -left-12 md:left-4 bottom-28 md:bottom-[55%]">

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration2'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration2']" alt="decoration2"
                        class="hidden md:flex absolute -left-2 bottom-5">

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration3'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration3']" alt="decoration3"
                        class="hidden md:flex absolute mx-auto -bottom-2">

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration4'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration4']" alt="decoration4"
                        class="absolute -right-12 bottom-5 md:bottom-[30%]">

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration5'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration5']" alt="decoration5"
                        class="absolute -right-4 bottom-32 md:bottom-[60%]">

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['decoration6'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['decoration6']" alt="decoration6"
                        class="hidden md:flex absolute mx-auto -top-7 right-28">
                </div>

                <div v-else-if="finalStatus === 'successfulTicket'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-around items-center p-4 z-10 overflow-y-scroll md:overflow-y-hidden scroll-edit">
                     <!-- Section displayed when the deposit is pending -->
                    <div
                         class="w-full max-w-[420px] md:max-w-[220px] h-[150px] md:h-[407px] flex md:flex-col justify-center items-center md:gap-8 z-10 mt-4 md:mt-0 py-10 md:py-0">
                        <!-- Container for the deposit amount input and game selection section -->

                        <div class="w-[48%] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8">
                            <!-- Section for deposit amount input -->

                            <div
                                class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[217px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50"
                            >
                                <!-- Container for the deposit amount input field -->

                                <span v-if="lastDepositAmount === 0"
                                      class="" :class="{
                            'text-xs md:text-base w-full text-center text-neutral': true,
                            '': franchiseSelected === undefined
                        }">
                            <!-- Placeholder text when no previous deposit exists -->
                            {{ franchiseSelected === undefined ? $t('Selecciona el monto') : $t('Valor a depositar') }}
                        </span>

                                <span v-else-if="lastDepositAmount > 0"
                                      class="absolute left-0 top-0 flex justify-start items-center gap-1 bg-secondary rounded-tl-box rounded-br-box px-2">
                            <!-- Display of the last deposit amount -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" class="lucide lucide-history-icon lucide-history">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M12 7v5l4 2" />
                            </svg>
                            <span class="text-[9px] text-neutral uppercase">{{ $t('Tu último movimiento') }}</span>
                        </span>

                                <div :class="{
                            'relative w-full flex justify-center items-center': true,
                            '': franchiseSelected === undefined
                        }">
                                    <!-- Input field for entering the deposit amount -->
                                    <button
                                        v-if="franchiseSelected === undefined"
                                        class="absolute -left-4 md:-left-5 my-auto h-6 md:h-8 w-6 md:w-8 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md shadow-base-content/50"
                                        @click="amountDeposit = Math.abs(amountDeposit) - 1"
                                    >
                                        <!-- Button to decrease the deposit amount -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke-width="4" stroke-linecap="round"
                                             stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus">
                                            <path d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <div
                                        class="text-3xl md:text-4xl w-full h-full text-center text-neutral font-bold flex justify-center items-center">
                                        <!-- Display of the deposit amount -->
                                        {{ appComponent.session.simbolo_moneda }}
                                        <input
                                            type="number"
                                            v-model="amountDeposit"
                                            data-analytics-label="deposit:amount-input"
                                            :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                            :disabled="franchiseSelected !== undefined"
                                            class="h-12 text-center text-neutral text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none rounded-box"
                                            :style="{ width: `${(amountDeposit?.toString().length || 1) + 2}ch`, maxWidth: '60%' }"
                                        />
                                    </div>
                                    <button
                                        v-if="franchiseSelected === undefined"
                                        class="absolute -right-4 md:-right-5 my-auto h-6 md:h-8 w-6 md:w-8 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md shadow-base-content/40"
                                        @click="amountDeposit = Math.abs(amountDeposit) + 1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke-width="4" stroke-linecap="round"
                                             stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
                                    </button>
                                </div>

                                <div
                                    v-if="franchiseSelected === undefined"
                                    class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] max-w-[95%] md:max-w-[85%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-accent-focus/50 rounded-full border border-accent-focus/75">
                                    <!-- Display of the current balance -->
                                    <span
                                        class="w-[24px] md:w-[40px] text-[9px] md:text-[11px] leading-3 text-neutral">{{ $t('Saldo actual')
                                        }}</span>
                                    <span class="text-sm md:text-[14px] font-bold capitalize text-neutral">
                                {{ appComponent.session.simbolo_moneda }}
                                {{ Math.abs(appComponent.saldo_total).toFixed(2) }}
                            </span>
                                </div>
                            </div>

                            <div v-if="franchiseSelected === undefined"
                                 class="min-w-32 w-[95%] flex justify-between items-center">
                                <!-- Buttons for quick deposit amount selection -->
                                <button
                                    :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm': methodSelected.mount_1 < 1000
                            }"
                                    @click="amountDeposit = methodSelected.mount_1 ? methodSelected.mount_1 : 20"
                                    :data-analytics-label="`deposit:amount-preset:${methodSelected.mount_1 ? methodSelected.mount_1 : 20}`"
                                    data-analytics-position="1"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                >
                                    <!-- Button for selecting a deposit amount of 20 -->
                                    {{ appComponent.session.simbolo_moneda }}
                                    {{ methodSelected.mount_1 ? formatNumber(methodSelected.mount_1) : 20
                                    }}
                                </button>
                                <button
                                    :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm':methodSelected.mount_1 < 1000
                            }"
                                    @click="amountDeposit = methodSelected.mount_2 ? methodSelected.mount_2 : 50"
                                    :data-analytics-label="`deposit:amount-preset:${methodSelected.mount_2 ? methodSelected.mount_2 : 50}`"
                                    data-analytics-position="2"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                >
                                    <!-- Button for selecting a deposit amount of 50 -->
                                    {{ appComponent.session.simbolo_moneda }}
                                    {{ methodSelected.mount_2 ? formatNumber(methodSelected.mount_2) : 50
                                    }}
                                </button>
                                <button
                                    :class="{
                                'text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md shadow-base-content/25': true,
                                'md:text-sm': methodSelected.mount_1 < 1000
                            }"
                                    @click="amountDeposit = methodSelected.mount_3 ? methodSelected.mount_3 : 80"
                                    :data-analytics-label="`deposit:amount-preset:${methodSelected.mount_3 ? methodSelected.mount_3 : 80}`"
                                    data-analytics-position="3"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelected && (methodSelected.id || methodSelected.pasarela || methodSelected.nombre || methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                >
                                    <!-- Button for selecting a deposit amount of 80 -->
                                    {{ appComponent.session.simbolo_moneda }}
                                    {{ methodSelected.mount_3 ? formatNumber(methodSelected.mount_3) : 80
                                    }}
                                </button>
                            </div>
                        </div>

                        <div v-if="categoryGames !== '' && gamesList.length > 0"
                             class="w-[48%] md:w-full h-full flex justify-center items-center">
                            <!-- Section for displaying game options -->

                            <div
                                class="w-[90%] md:hidden min-w-[111px] h-full min-h-[137px] flex justify-center items-center rounded-box">
                                <!-- Mobile view for game selection -->
                                <div
                                    class="relative w-[127px] md:w-[90%] sm:w-full h-[137px] md:h-full flex flex-col justify-center items-center rounded-box bg-gradient-to-b from-[#9F019A] to-[#160134] bg-opacity-50 backdrop-blur-sm backdrop-opacity-25">
                                    <swiper-container
                                        class="w-[72px] h-[135px] overflow-hidden rounded-box py-1"
                                        :slides-per-view="1"
                                        :grid-rows="2"
                                        :direction="'horizontal'"
                                        :mousewheel="true"
                                        :mousewheel-force-to-axis="true"
                                        :class="'swiper-container' + keySlide2"
                                        :navigation="{
                                    nextEl: '.slideNext' + keySlide2,
                                    prevEl: '.slidePrev' + keySlide2,
                                }"
                                    >
                                        <!-- Individual game slide -->
                                        <swiper-slide
                                            v-for="(game, index) in gamesList"
                                            :key="index"
                                            :data-index="index"
                                            class="w-[65px] h-[58px] hover:scale-[1.02] cursor-pointer m-auto"
                                        >
                                            <!-- Button for selecting a game -->
                                            <button
                                                @click="$event.stopPropagation();
                                                appComponent.openGame(game);"
                                                class="relative w-full h-full"
                                            >
                                                <!-- Game icon image -->
                                                <img
                                                    v-show="
                                                game.icon_2 !== undefined &&
                                                game.icon_2 !== null &&
                                                game.icon_2 !== ''
                                            "
                                                    :src="game.icon_2"
                                                    :alt="game.name + game.id"
                                                    class="w-full h-full object-cover object-center"
                                                />
                                            </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <button
                                        v-if="gamesList.length > 2"
                                        class="absolute -left-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-accent-focus/20 hover:scale-110 cursor-pointer stroke-accent-focus"
                                        :class="'slidePrev' + keySlide2">
                                        <!-- Button to navigate to the previous game slide -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button
                                        v-if="gamesList.length > 2"
                                        class="absolute -right-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-accent-focus/20 hover:scale-110 cursor-pointer stroke-accent-focus"
                                        :class="'slideNext' + keySlide2">
                                        <!-- Button to navigate to the next game slide -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                                <!-- Desktop view for game selection -->
                                <div
                                    class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-gradient-to-br from-[#AD01A450] to-[#0E012E] from-10% bg-opacity-25 backdrop-blur-sm backdrop-opacity-25 aspect-square">
                                    <swiper-container
                                        class="overflow-hidden rounded-[15px] w-[145px] h-[145px]"
                                        :slides-per-view="2"
                                        :grid-rows="2"
                                        :direction="'horizontal'"
                                        :space-between="0"
                                        :mousewheel="true"
                                        :mousewheel-force-to-axis="true"
                                        :class="'swiper-container' + keySlide"
                                        :navigation="{
                                    nextEl: '.slideNext' + keySlide,
                                    prevEl: '.slidePrev' + keySlide,
                                }"
                                    >
                                        <!-- Individual game slide -->
                                        <swiper-slide
                                            v-for="(game, index) in gamesList"
                                            :key="index"
                                            :data-index="index"
                                            class="w-[72px] h-[72px] cursor-pointer aspect-square"
                                        >
                                            <!-- Button for selecting a game -->
                                            <button
                                                @click="
                                                $event.stopPropagation();
                                                appComponent.openGame(game);
                                            "
                                                class="relative w-full h-full"
                                            >
                                                <!-- Game icon image -->
                                                <img
                                                    v-show="
                                                game.icon_3 !== undefined &&
                                                game.icon_3 !== null &&
                                                game.icon_3 !== ''
                                            "
                                                    :src="game.icon_3"
                                                    :alt="game.name + game.id"
                                                    class="w-full h-full object-cover object-center aspect-square hover:scale-105"
                                                />
                                            </button>
                                        </swiper-slide>
                                    </swiper-container>
                                    <button
                                        v-if="gamesList.length > 4"
                                        class="absolute -left-2 md:-left-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                        :class="'slidePrev' + keySlide">
                                        <!-- Button to navigate to the previous game slide -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button
                                        v-if="gamesList.length > 4"
                                        class="absolute -right-2 md:-right-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                        :class="'slideNext' + keySlide">
                                        <!-- Button to navigate to the next game slide -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="w-full h-full md:max-h-[325px] max-w-[95%] md:max-w-[55%] flex flex-col justify-around items-center py-10 md:py-2 rounded-xl bg-base-300 bg-opacity-30">
                        <div class="w-full flex flex-col justify-center items-center gap-1">
                            <h3 class="text-lg md:text-2xl text-center font-bold text-neutral">
                                {{ $t('¡Depósito exitoso!') }}</h3>
                            <span
                                class="text-sm md:text-lg text-center font-light text-neutral">{{ $t('¡Dale un vistazo a tu resumen de déposito!')
                                }}</span>
                        </div>

                        <div
                            class="relative w-full md:w-[90%] grid grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 p-5  shadow-inner"
                        >
                            <!-- (Opcional) Texto/fondo decorativo si existe en config -->
                            <img
                                v-if="appComponent.config.depositsView !== undefined
                                       && appComponent.config.depositsView[appComponent.country] !== undefined
                                       && appComponent.config.depositsView[appComponent.country]['successBackgroundTextImage'] !== undefined"
                                :src="appComponent.config.depositsView[appComponent.country]['successBackgroundTextImage']"
                                alt="background-text"
                                class="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-60"
                            />

                            <!-- Monto depositado -->
                            <span class="text-neutral/80">{{ $t('Monto depositado') }}</span>
                            <span class="text-right font-bold text-neutral">
                              {{ appComponent.session.simbolo_moneda }}{{ formatAmount(ticket.valor) }}
                            </span>

                            <!-- Método -->
                            <span class="text-neutral/80">{{ $t('Método') }}</span>
                            <span class="text-right font-semibold text-neutral">
                              {{ ticket.method || '-' }}
                            </span>

                            <!-- Tienda -->
                            <span class="text-neutral/80">{{ $t('Tienda') }}</span>
                            <span class="text-right font-semibold text-neutral">
                              {{ ticket.store || '-' }}
                            </span>

                            <!-- ID -->
                            <span class="text-neutral/80">ID</span>
                            <span class="text-right font-semibold text-neutral">
                              {{ ticket.id || '-' }}
                            </span>

                            <!-- Fecha y hora -->
                            <span class="text-neutral/80">{{ $t('Fecha y hora') }}</span>
                            <span class="text-right font-semibold text-neutral">
                              {{ formatDateTime(ticket.dataTime) }}
                            </span>

                            <!-- Separador -->
                            <div class="col-span-2 my-1 border-t border-base-content/10"></div>

                            <!-- Monto actual con retiro -->
                            <span class="text-neutral font-extrabold">{{ $t('Monto actual con retiro') }}</span>
                            <span class="text-right font-extrabold text-neutral">
                              {{ appComponent.session.simbolo_moneda }}{{ formatAmount(ticket.balance) }}
                            </span>
                        </div>

                        <div class="w-full flex justify-between items-center gap-4 px-2">
                            <!-- Buttons for further actions -->
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-neutral font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                step = 0;
                                stateCard = '';
                                isSubmittingCard = false;
                                methodSelected = {
                                    id: 'empty',
                                    amount_min: 0,
                                    amount_max: 0,
                                };
                                cardData = {
                                    number: '',
                                    numberFormatted: '',
                                    holder: '',
                                    expiration: '',
                                    cvv: '',
                                };
                                appComponent.showModalDepositV3 = true;
                            }"
                            >
                                {{ $t('Nuevo depósito') }}
                            </RouterLink>
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-neutral bg-secondary backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                appComponent.showModalDepositV3 = false;
                            }"
                            >
                                {{ $t('Ir a inicio') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div v-else-if="finalStatus === 'pending'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-around items-center p-4 z-10">
                    <!-- Section displayed when the deposit is pending -->
                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['pendingImage'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['pendingImage']"
                        alt="pending-image"
                        class="w-full max-w-[200px] md:max-w-[40%] h-full max-h-[212px] md:max-h-[80%] object-contain object-center">

                    <div
                        class="w-full h-full md:max-h-[325px] max-w-[95%] md:max-w-[55%] flex flex-col justify-around items-center">
                        <div class="w-full flex flex-col justify-center items-center gap-1">
                            <h3 class="text-lg md:text-2xl text-center font-bold text-neutral">
                                {{ $t('¡Depósito pendiente!') }}</h3>
                            <span
                                class="text-sm md:text-lg text-center font-light text-neutral">{{ $t('Estamos procesando tu pago')
                                }}</span>
                        </div>

                        <div
                            class="relative flex flex-col justify-center items-center gap-6 p-5 rounded-xl bg-gradient-to-b from-base-100/25 to-base-content/10 bg-opacity-30 shadow-inner">
                            <!-- Background text image for pending state -->
                            <img
                                v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['pendingBackgroundTextImage'] !== undefined"
                                :src="appComponent.config.depositsView[appComponent.country]['pendingBackgroundTextImage']"
                                alt="background-text"
                                class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover object-center">
                            <p class="text-base md:text-lg font-light text-neutral  text-justify">
                                {{ $t('Aún estamos a la espera de confirmación de la entidad bancaria.')
                                }}</p>
                            <p class="text-base md:text-lg font-light text-neutral  text-justify">
                                {{ $t('Una vez tu depósito haya sido aprobado, recibirás un correo de confirmación con el resumen de la transacción.')
                                }}</p>
                        </div>

                        <div class="w-full flex justify-center items-center gap-4">
                            <!-- Buttons for further actions -->
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-base-content font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                appComponent.showModalDepositV3 = true;
                            }"
                            >
                                {{ $t('Nuevo depósito') }}
                            </RouterLink>
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-primary-focus bg-primary-focus/25 backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                finalStatus = 'empty';
                                appComponent.showModalDepositV3 = false;
                            }"
                            >
                                {{ $t('Ir a inicio') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div v-else-if="finalStatus === 'failed'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-around items-center pr-4 py-4 z-10">

                    <!-- Image displayed for mobile devices when the deposit fails -->
                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedImageMobile'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['failedImageMobile']"
                        alt="failed-image-mobile"
                        class="w-full max-w-[200px] md:hidden h-full max-h-[212px] object-contain object-center">

                    <!-- Image displayed for desktop devices when the deposit fails -->
                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedImageDesktop'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['failedImageDesktop']"
                        alt="failed-image-desktop"
                        class="w-full max-w-[326px] hidden md:flex h-full max-h-[510px] object-contain object-center -ml-4 -mr-8">

                    <div
                        class="w-full h-full md:max-h-[325px] max-w-[95%] md:max-w-[55%] flex flex-col justify-around items-center">

                        <!-- Section displaying the failure message -->
                        <div class="w-full flex flex-col justify-center items-center gap-1">
                            <h3 class="text-lg md:text-2xl text-center font-bold text-neutral">
                                {{ $t('¡Depósito fallido!') }}</h3>
                            <span
                                class="text-sm md:text-lg text-center font-light text-neutral">{{ $t('La transacción no ha finalizado con éxito')
                                }}</span>
                        </div>

                        <!-- Section displaying additional information about the failure -->
                        <div
                            class="relative flex flex-col justify-center items-center gap-6 p-5 rounded-xl bg-gradient-to-b from-base-100/25 to-base-content/10 bg-opacity-30 shadow-inner">

                            <!-- Background image for the failure message -->
                            <img
                                v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedBackgroundTextImage'] !== undefined"
                                :src="appComponent.config.depositsView[appComponent.country]['failedBackgroundTextImage']"
                                alt="background-text"
                                class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover object-center opacity-75">

                            <!-- Text providing details about the failure and support options -->
                            <p class="text-base md:text-lg font-light text-neutral  text-justify">
                                {{ $t('Lamentablemente, tu depósito no pudo completarse. Por favor, revisa los detalles de tu transacción e inténtalo nuevamente. Si el problema persiste, ingresa a nuestro chat de soporte para recibir asistencia.')
                                }}</p>
                        </div>

                        <!-- Buttons for retrying the deposit or returning to the home page -->
                        <div class="w-full flex justify-center items-center gap-4">

                            <!-- Button to initiate a new deposit -->
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-base-content font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = true;
                                    nextStep(0);
                                    cardData = {
                                        number: '',
                                        numberFormatted: '',
                                        holder: '',
                                        expiration: '',
                                        cvv: '',
                                    };
                                    focusedField = '';
                                    currentBrand = null;
                                }"
                            >
                                {{ $t('Nuevo depósito') }}
                            </RouterLink>

                            <!-- Button to return to the home page -->
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-primary-focus bg-primary-focus/25 backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                    finalStatus = 'empty';
                                     cardData = {
                                        number: '',
                                        numberFormatted: '',
                                        holder: '',
                                        expiration: '',
                                        cvv: '',
                                    };
                                    currentBrand = null;
                                    appComponent.showModalDepositV3 = false;
                                }"
                            >
                                {{ $t('Ir a inicio') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </Teleport>

    <Teleport v-if="showScanOverlay" to="body">
        <div class="fixed inset-0 z-[2147483647] bg-base-content/80 backdrop-blur-sm flex items-center justify-center"
             style="z-index:2147483647">
            <div class="relative w-[92vw] max-w-[720px] md:max-w-[460px] rounded-2xl overflow-hidden bg-black shadow-xl" style="aspect-ratio: 856 / 540;">
                <!-- Close -->
                <button
                    type="button"
                    class="absolute top-3 right-3 z-20 bg-base-200/70 hover:bg-base-200 rounded-full px-3 py-1 text-sm font-semibold"
                    @click="closeScanOverlay"
                >
                    {{ $t('Cerrar') }}
                </button>

                <!-- Video -->
                <video ref="scanVideo" autoplay playsinline muted class="absolute inset-0 w-full h-full object-cover"></video>
                <!-- Hidden canvas for OCR -->
                <canvas ref="scanCanvas" class="hidden"></canvas>

                <!-- Guide -->
                <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div class="border-2 border-accent rounded-xl w-[86%] max-w-[640px] h-[44%]"></div>
                </div>

                <!-- Estate -->
                <div class="absolute bottom-3 left-0 right-0 mx-auto text-center text-neutral-content text-sm">
                    {{ $t('Alinea los números de la tarjeta dentro del recuadro') }}
                </div>
            </div>
        </div>
    </Teleport>

    <Teleport to="body">
        <div v-if="toastVisible" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-[2147483648]">
            <div role="status" aria-live="polite"
                 class="flex items-center gap-2 rounded-full px-4 py-2 bg-base-100/90 border border-base-content/20 backdrop-blur-md shadow-lg text-neutral">
                <!-- ícono check -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-check-circle">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="m9 11 3 3L22 4"/>
                </svg>
                <span class="text-sm font-medium">{{ toastMessage }}</span>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.vs-progress {
    position: relative;
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.15);  /* pista */
    border-radius: 9999px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.vs-progress__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: 0%;
    height: 100%;
    border-radius: 9999px;
    /* a "nice" gradient that stands out against dark backgrounds */
    background: linear-gradient(
        90deg,
        rgba(255,122,0,0.95) 0%,
        rgba(249,115,22,0.95) 40%,
        rgba(139,92,246,0.95) 100%
    );
    animation: vs-grow 1.6s ease-in-out infinite;
}

/* brightness that passes through the bar as it grows */
.vs-progress__bar::after {
    content: "";
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: vs-shine 1.6s ease-in-out infinite;
}

@keyframes vs-grow {
    0%   { width: 0%; }
    70%  { width: 100%; }
    100% { width: 100%; }
}

@keyframes vs-shine {
    0%   { transform: translateX(-100%); }
    70%  { transform: translateX(0%); }
    100% { transform: translateX(0%); }
}

/* Accessibility: if the user prefers less movement */
@media (prefers-reduced-motion: reduce) {
    .vs-progress__bar,
    .vs-progress__bar::after {
        animation: none !important;
        width: 50%;
    }
}

 .card-3d{ perspective:1200px; width:100%; height:143px; }
@media (min-width:768px){ .card-3d{ height:172px; } }
.card-3d-inner{ position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .6s cubic-bezier(.2,.7,.2,1); }
.card-3d-inner.is-back{ transform:rotateY(180deg); }
.card-face{ position:absolute; inset:0; border-radius:12px; overflow:hidden; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
.card-back{ transform:rotateY(180deg); }
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '@/components/buttons/Button.vue';
import IconMore from '@/components/icons/IconMore.vue';
import { register } from 'swiper/element/bundle';
import { useRoute } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import apiService from '@/services/ApiService';
import Tesseract from 'tesseract.js';
import DustmanIcon from '@/components/icons/DustmanIcon.vue';
import IconArrow from '@/components/icons/Arrow/IconArrow.vue';
import IconArrow2 from '@/components/icons/IconArrow2.vue';
import IconCheckCard from '@/components/icons/IconCheckCard.vue';
import PaymentMethodCard from '@/components/PaymentMethodButton.vue';
import ModalConfiguredMethodFri from './modals/ModalConfiguredMethodFri.vue';
import TarjetIcon from './icons/TarjetIcon.vue';
import FriIcon from './icons/FriIcon.vue';
import GangwayIcon from './icons/GangwayIcon.vue';
import DepositAmount from './DepositAmount.vue';
import ArrowBack2 from './icons/ArrowBack2.vue';
import IconArrow3 from '@/components/icons/IconArrow3.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import IconClose from '@/components/icons/IconClose.vue';
register();
export default defineComponent({
    components: { IconClose, AnimatedPlaceholder, IconCheckCard, IconArrow2, IconArrow, DustmanIcon, Button, IconMore, PaymentMethodCard, ModalConfiguredMethodFri, GangwayIcon, TarjetIcon, FriIcon, DepositAmount, ArrowBack2, IconArrow3,}, // Importing the Button component for use in the template
    setup() {
        // Using the setup function to define reactive variables and return them for use in the template
        const { cookies } = useCookies(); // Accessing cookies using the vue3-cookies library
        const route = useRoute(); // Accessing the current route using vue-router
        return { cookies, route }; // Returning cookies and route for use in the template
    },
    computed: {
        ticketAmount(): number {
            const t: any = this.ticket || {};
            const v = t.amount ?? t.monto ?? t.valor ?? 0;
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        },
        ticketMethod(): string {
            const t: any = this.ticket || {};
            return (t.method ?? t.metodo ?? t.payment_method ?? '').toString();
        },
        ticketShop(): string {
            const t: any = this.ticket || {};
            return (t.store ?? t.tienda ?? t.bank ?? '').toString();
        },
        ticketId(): string {
            const t: any = this.ticket || {};
            return (t.id ?? t.transactionId ?? t.transaction_id ?? t.reference ?? t.referenceId ?? '').toString();
        },
        ticketDate(): any {
            const t: any = this.ticket || {};
            return t.date ?? t.fecha_hora ?? t.datetime ?? t.created_at ?? null;
        },
        ticketBalance(): number {
            const t: any = this.ticket || {};
            const v = t.balance ?? t.saldo_total ?? t.saldo ?? 0;
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        },
    },
    data() {
        // Defining the data function to initialize reactive variables
        let noGateways = false; // Flag to indicate if there are no available gateways
        let appComponent: any = this.$appComponent; // Accessing the appComponent from the context
        let emitter = this.$emitter(); // Accessing the event emitter from the context
        let config = this.$config(); // Accessing the configuration from the context
        let isSubmittingCard = false;
        let minMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
        let toastVisible = false;
        let toastMessage = '';
        let toastTimer: any = null;
        let showScanOverlay = false;
        let isScanning = false;
        let scanStream: MediaStream | null = null;
        let _ocrBusy = false;
        let scanCaptured = false;
        let isClosing = false; // Avoid extra readings while we close
        let tesseractWorker: any = null;
        let tesseractReady = false;
        let quickScan = true; // Quick mode: Closes as soon as there is a valid PAN + date
        let step = 0; // Initializing the current step of the deposit process
        let methods = []; // Initializing the list of available deposit methods
        let cardAdd: any = {
            num_tarjeta: '', // Card number
            expiry_month: '', // Expiry month
            expiry_year: '', // Expiry year
            cvv: '', // CVV code
            amount: null, // Amount for the transaction
            productId: '', // Product ID associated with the payment
            saveCard: false, // Flag to save card information
            saveCardShow: false, // Flag to show save card option
            requireAuth: false, // Flag to require authentication
        };
        let methodSelected = {
            id: 'empty', // Default ID for the selected method
            amount_min: 0, // Minimum deposit amount for the selected method
            amount_max: 0, // Maximum deposit amount for the selected method
        }; // Initializing the selected deposit method
        let cryptos = []; // Initializing the list of cryptocurrency options
        let franchises = []; // Initializing the list of available franchises
        let cash = []; // Initializing the list of cash payment options
        let franchiseSelected = undefined; // Initializing the selected franchise
        let lastUsedFranchises = false; // Flag to indicate if there are last used franchises
        let lastUsedFranchisesList = []; // Initializing the list of last used franchises
        let isLoading = true; // Flag to indicate if the component is in a loading state
        let isLoadingMethod = false; // Flag to indicate if a method is being loaded
        let gamesList = []; // Initializing the list of available games
        let keySlide: number = Math.floor(Math.random() * 1000); // Generating a random key for the first slide
        let keySlide2: number = Math.floor(Math.random() * 1000); // Generating a random key for the second slide
        let keySlide3: number = Math.floor(Math.random() * 1000); // Generating a random key for the third slide
        let amountDeposit = 0; // Initializing the deposit amount
        let paramsModal: any = {}; // Initializing parameters for the modal
        let categoryGames = ''; // Initializing the category of games
        let carouselGames = ''; // Initializing the carousel games
        let newView = false; // Flag to indicate if the new view is enabled
        let finalStatus = 'empty'; // Final status of the deposit process
        let stateCard = ''
        let depositSuccessData = {
            monto: '', // Amount of the successful deposit
            metodo: '', // Method used for the successful deposit
            tienda: '', // Store associated with the successful deposit
            id: '', // ID of the successful deposit
            fecha_hora: '', // Date and time of the successful deposit
            saldo_total: '', // Total balance after the successful deposit
        }; // Initializing data for a successful deposit
        let dataText: string = ''; // Initializing text data for the modal
        let lastDepositAmount = 0; // Initializing the amount of the last deposit
        let metodos_pago_info = []; // Initializing the list of payment method information
        let cardData = {
            number: '',
            holder: '',
            expiration: '',
            cvv: '',
            currency: ''
        }
        let credit_cards = [];
        let currentBrand: string | null = null;
        let authentication: any = { token: '', requestId: '', referenceId: '', deviceDataCollectionUrl: '' };
        let sendCard = {};
        let selectedCardId: any = null;
        let canDeposit = false;
        let sendCvv = '';
        let deleteCardView = false;
        let cardToDelete = '';
        let viewAmountInAddCard = false;
        let ticket = {};
        let disableAddCardButton = false;
        return {
            // Returning all initialized variables for use in the template
            noGateways,
            cardAdd,
            appComponent,
            emitter,
            config,
            step,
            cardData,
            methods,
            methodSelected,
            cryptos,
            cash,
            franchiseSelected,
            franchisesLoaded: false,
            lastUsedFranchises,
            lastUsedFranchisesList,
            isLoading,
            isLoadingMethod,
            gamesList,
            keySlide,
            keySlide2,
            keySlide3,
            amountDeposit,
            franchises,
            paramsModal,
            categoryGames,
            carouselGames,
            newView,
            finalStatus,
            depositSuccessData,
            dataText,
            lastDepositAmount,
            metodos_pago_info,
            errors: {},
            credit_cards,
            authentication,
            minMonth,
            currentBrand,
            showScanOverlay,
            isScanning,
            scanStream,
            _ocrBusy,
            scanCaptured,
            isClosing,
            toastVisible,
            toastMessage,
            toastTimer,
            tesseractWorker,
            tesseractReady,
            quickScan,
            isSubmittingCard,
            sendCard,
            selectedCardId,
            canDeposit,
            sendCvv,
            deleteCardView,
            cardToDelete,
            stateCard,
            viewAmountInAddCard,
            ticket,
            cvvErrorAddCard: '',
            cvvErrorsSavedCards: {},
            isCardBack: false,
            focusedField: '',
            disableAddCardButton
        };
    },
    methods: {
        providerCreditCard() {
            const hasCreditCard = this.methods?.some((m: any) => m.id === 'credit_card' && m.active);

            if (!hasCreditCard) return
            
            apiService.request('provider_credit_cards_details', {}).then((response: any) => {
                    console.log(response);
                    if (response.code == 0) {
                        this.viewAmountInAddCard = response.data.SupplierWithValue;
                        if(response.data.allowAddingCards != undefined && response.data.allowAddingCards) {
                            this.disableAddCardButton = response.data.allowAddingCards
                        }
                    } else {
                        // When the provider is unavailable (code 12), hide the credit card.
                        this._hideCreditCard = true; // flag no reactivo, suficiente para lógica en runtime
                        // Si ya existen métodos cargados, filtrarlos de inmediato
                        if (Array.isArray(this.methods)) {
                            this.methods = this.methods.filter((m: any) => m?.id !== 'credit_card');
                        }
                    }
                });
        },
        flipToFront() { this.isCardBack = false; },
        flipToBack()  { this.isCardBack = true;  },

        callModalAddCard(Ds) {
            this.appComponent.modal = {
                showModal: Ds ? 'addCard3Ds' : 'addCard',
                messageModal: {
                    cardAdd: this.cardAdd,
                },
            };
        },

        cvvExpectedLengthFor(card?: any): number {
            let brand = '';
            if (card) brand = String(card.brand || card.card_brand || '').toLowerCase();
            else      brand = String(this.currentBrand || '').toLowerCase();
            return (brand.includes('american') || brand.includes('amex')) ? 4 : 3;
        },

        onNumericKeydown(e: KeyboardEvent) {
            const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End','Escape','Enter'];
            if (allowed.includes(e.key)) return;
            if (e.ctrlKey || e.metaKey) return;
            if (!/^[0-9]$/.test(e.key)) e.preventDefault();
        },

        onCvvInputAddCard(e: Event) {
            const el = e.target as HTMLInputElement;
            const max = this.cvvExpectedLengthFor();
            const digits = (el.value || '').replace(/\D/g, '').slice(0, max);
            this.cardData.cvv = digits;

            this.cvvErrorAddCard = (digits.length > 0 && digits.length < max)
                ? (this.$t ? this.$t('El CVV debe tener {n} dígitos', { n: max }) : `El CVV debe tener ${max} dígitos`)
                : '';

            this.$nextTick(() => { try { el.setSelectionRange(digits.length, digits.length); } catch {} });
        },

        onCvvInputSavedCard(card: any, e: Event) {
            const el = e.target as HTMLInputElement;
            const max = this.cvvExpectedLengthFor(card);
            const digits = (el.value || '').replace(/\D/g, '').slice(0, max);

            if (Object.prototype.hasOwnProperty.call(card, 'Cvc')) card.Cvc = digits;
            else card.cvv = digits;

            const key = (card.id ?? card.card_id) || card.cuenta;
            const msg = (this.$t ? this.$t('El CVV debe tener {n} dígitos', { n: max }) : `El CVV debe tener ${max} dígitos`);

            if (digits.length > 0 && digits.length < max) {
                this.$set ? this.$set(this.cvvErrorsSavedCards, key, msg) : (this.cvvErrorsSavedCards[key] = msg);
            } else {
                this.$delete ? this.$delete(this.cvvErrorsSavedCards, key) : delete this.cvvErrorsSavedCards[key];
            }

            this.$nextTick(() => { try { el.setSelectionRange(digits.length, digits.length); } catch {} });
        },

        validateSelectedCardCvv(): boolean {
            const selected = this.credit_cards?.find(c => (c.id ?? c.card_id) === this.selectedCardId);
            if (!selected || selected.activateCvc !== 'S') return true;

            const max = this.cvvExpectedLengthFor(selected);
            const current = (selected.Cvc || selected.cvv || '').toString();
            if (current.length !== max) {
                const key = (selected.id ?? selected.card_id) || selected.cuenta;
                const msg = this.$t ? this.$t('El CVV debe tener {n} dígitos', { n: max }) : `El CVV debe tener ${max} dígitos`;
                this.$set ? this.$set(this.cvvErrorsSavedCards, key, msg) : (this.cvvErrorsSavedCards[key] = msg);
                return false;
            }
            return true;
        },

        // 1. longitud esperada
        cvvExpectedLengthFor(card?: any): number {
            let brand = '';
            if (card) {
                brand = String(card.brand || card.card_brand || '').toLowerCase();
            } else {
                // para el form de "agregar tarjeta" usamos la marca detectada
                brand = String(this.currentBrand || '').toLowerCase();
            }
            // American Express
            return (brand.includes('american') || brand.includes('amex')) ? 4 : 3;
        },

// 2. bloquear teclas que no sean numéricas
        onNumericKeydown(e: KeyboardEvent) {
            const allowed = [
                'Backspace', 'Delete', 'Tab',
                'ArrowLeft', 'ArrowRight', 'Home', 'End',
                'Escape', 'Enter'
            ];
            if (allowed.includes(e.key)) return;
            if (e.ctrlKey || e.metaKey) return; // copiar/pegar/seleccionar todo
            if (!/^[0-9]$/.test(e.key)) {
                e.preventDefault();
            }
        },

// 3. input de CVV en "agregar tarjeta"
        onCvvInputAddCard(e: Event) {
            const el = e.target as HTMLInputElement;
            const max = this.cvvExpectedLengthFor();
            const digits = (el.value || '').replace(/\D/g, '').slice(0, max);

            this.cardData.cvv = digits;

            // validar en vivo
            if (digits.length > 0 && digits.length < max) {
                this.cvvErrorAddCard = this.$t
                    ? this.$t('El CVV debe tener {n} dígitos', { n: max })
                    : `El CVV debe tener ${max} dígitos`;
            } else {
                this.cvvErrorAddCard = '';
            }

            // mantener cursor al final
            this.$nextTick(() => {
                try { el.setSelectionRange(digits.length, digits.length); } catch {}
            });
        },

// 4. input de CVV en tarjeta guardada
        onCvvInputSavedCard(card: any, e: Event) {
            const el = e.target as HTMLInputElement;
            const max = this.cvvExpectedLengthFor(card);
            const digits = (el.value || '').replace(/\D/g, '').slice(0, max);

            // asignar al modelo real
            if (Object.prototype.hasOwnProperty.call(card, 'Cvc')) {
                card.Cvc = digits;
            } else {
                card.cvv = digits;
            }

            const key = (card.id ?? card.card_id) || card.cuenta;

            // validar en vivo
            if (digits.length > 0 && digits.length < max) {
                const msg = this.$t
                    ? this.$t('El CVV debe tener {n} dígitos', { n: max })
                    : `El CVV debe tener ${max} dígitos`;
                // soportar Vue 2 con $set
                if (this.$set) {
                    this.$set(this.cvvErrorsSavedCards, key, msg);
                } else {
                    this.cvvErrorsSavedCards[key] = msg;
                }
            } else {
                // limpiar error
                if (this.$delete) {
                    this.$delete(this.cvvErrorsSavedCards, key);
                } else {
                    delete this.cvvErrorsSavedCards[key];
                }
            }

            this.$nextTick(() => {
                try { el.setSelectionRange(digits.length, digits.length); } catch {}
            });
        },

// 5. validar antes de depositar (usa el seleccionado)
        validateSelectedCardCvv(): boolean {
            const selected = this.credit_cards?.find(
                c => (c.id ?? c.card_id) === this.selectedCardId
            );
            if (!selected) return true;             // no hay tarjeta, que lo valide otro flujo
            if (selected.activateCvc !== 'S') return true; // no pide CVV

            const max = this.cvvExpectedLengthFor(selected);
            const current = (selected.Cvc || selected.cvv || '').toString();
            if (current.length !== max) {
                const key = (selected.id ?? selected.card_id) || selected.cuenta;
                const msg = this.$t
                    ? this.$t('El CVV debe tener {n} dígitos', { n: max })
                    : `El CVV debe tener ${max} dígitos`;

                if (this.$set) {
                    this.$set(this.cvvErrorsSavedCards, key, msg);
                } else {
                    this.cvvErrorsSavedCards[key] = msg;
                }
                return false;
            }
            return true;
        },
        /**
         * format Amount.
         */
        formatAmount(v: any): string {
            const n = Number(v);
            if (!Number.isFinite(n)) return '0.00';
            return n.toFixed(2);
        },

        /**
         * format Date Time.
         */
        formatDateTime(val: any): string {
            if (!val) return '';
            try {
                const locale = this.appComponent?.locale || 'es-PE';
                let d: Date;
                if (typeof val === 'number') d = new Date(val);
                else if (typeof val === 'string') {
                    const ts = Number(val);
                    d = Number.isFinite(ts) && /^\d+$/.test(val.trim()) ? new Date(ts) : new Date(val);
                } else {
                    d = new Date(val);
                }
                const date = d.toLocaleDateString(locale, { year: '2-digit', month: '2-digit', day: '2-digit' });
                const time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
                return `${date}, ${time}`;
            } catch {
                return String(val);
            }
        },

        async handleGatewaySelected() {
            this.noGateways = false
            // Find the gateway method with id 'deposit_access' from the available methods
            const gateway = this.methods.find(m => m.id === 'deposit_access')

            // Call the generic method handler for the selected method
            this.handleMethodSelected(gateway)

            // Check if franchises have not been loaded yet
            if (!this.franchisesLoaded) {
                // Set loading state for method selection
                this.isLoadingMethod = true
                try {
                    // Make an API request to fetch franchise data
                    const response = await apiService.request('get_franchises', {})
                    if (response.code === 0) {
                        // Merge API response with existing payment methods info
                        this.franchises = response.data.concat(this.metodos_pago_info)
                        // Mark franchises as loaded to prevent future requests
                        this.franchisesLoaded = true
                    } else {
                        this.noGateways = true; // Set flag if no franchises are available
                    }
                } catch (e) {
                    // Log any error encountered during the API request
                    console.error('Error loading franchises:', e)
                } finally {
                    // Reset loading state regardless of success or failure
                    this.isLoadingMethod = false
                }
            }
        },

        handlePaymentCard(method) {
            const config = this.paymentsConfigured?.[0];
            if (config?.configured === true) {
                this.handleDeposit({ service: config.id_pasarela });
                return;
            }

            this.handleCardClick(method);
        },

        handleCardClick(method) {
            this.methodSelected = method;
            // Check if the first configured payment is not yet set up
            if (!this.paymentsConfigured?.[0]?.configured) {
                // Fetch the configured payments from the backend
                this.getPaymentsConfigured(method);
            } else {
                // If already configured, move to the configured payments step
                this.step = 'fri_gateway_deposit';
            }
        },

        prevStep() {
            this.noGateways = false
            this.isLoading = true;
            this.franchiseSelected = undefined; // Resetting selected franchise
            this.appComponent.infoModalDeposit = undefined;

            if(this.methods.length == 1){
                if(this.methods.some(m => m.id === 'credit_card')) {
                    this.methodSelected = this.methods.find(m => m.id === 'credit_card');
                    this.handleMethodSelected(this.methodSelected)
                    this.step = 'creditCardList';
                }
                else if (this.methods.some(m => m.id === 'deposit_access')) {
                    this.methodSelected = this.methods.find(m => m.id === 'deposit_access');
                    this.handleMethodSelected(this.methodSelected)
                    this.handleGatewaySelected()
                    this.step = 0;
                }
            }else {
                this.methodSelected = { id: 'empty' };
                // back to step 0
                this.step = 0;
            }


            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        },
        /**
         * Updates the current step of the deposit process and manages the loading state.
         * @param {number} step - The step to navigate to.
         */
        nextStep(step: number | string) {
            this.step = step; // Set the current step
            switch (step) {
                case 0:
                    console.log('Step 0: Loading methods...'); // Log step 0
                    break;
                case 1:
                    console.log('Step 1: Loading payment methods...'); // Log step 1
                    break;
                case 2 :
                    console.log('Step 1: Loading fri method...'); // Log step 2
                break;
                case 'addCreditCardForm':
                    console.log('Step addCreditCardForm: Loading payment methods...'); // Log step addCreditCardForm
                    this.isLoadingMethod = true;
                    break;
                case 'creditCardList':
                    apiService.request('get_credit_cards', {}).then((response: any) => {
                        if (response.code == 0) {
                            let cc: any = []; // Array to hold active credit cards
                            response.data.cards.forEach((item: any) => {
                                if (item.state == 'A') {
                                    cc.push(item); // Add active cards to the array
                                }
                            });
                            this.credit_cards = cc; // Assign active cards to the component

                            if (this.credit_cards.length == 0 ) {
                                this.step = 'creditCardList'; // especial step for credit card form
                                this.isLoading = false;
                                this.isLoadingMethod = false
                                return;
                            }else {
                                this.step = 'creditCardList'; // especial step for credit card form
                                this.isLoading = false;
                                this.isLoadingMethod = false
                            }
                        }
                        this.isLoading = false; // Set loading state to false
                    });
                    break;
                default:
                    console.log('Unknown step: ', step); // Log unknown step
                    break;
            }

            setTimeout(() => {
                this.isLoading = false; // Disable loading state after 2 seconds
                this.isLoadingMethod = false;
            }, 1000);
        },

        /**
         * delete Card.
         */
        deleteCard(id) {
            apiService.request('delete_credit_card', {id: id}).then((response: any) => {
                if (response.code == 0) {
                    this.deleteCardView = false;
                    this.isLoadingMethod = true
                    this.isLoading = true;
                    this.cardToDelete = '';
                    apiService.request('get_credit_cards', {}).then((response: any) => {
                        if (response.code == 0) {
                            let cc: any = []; // Array to hold active credit cards
                            response.data.cards.forEach((item: any) => {
                                if (item.state == 'A') {
                                    cc.push(item); // Add active cards to the array
                                }
                            });
                            this.credit_cards = cc; // Assign active cards to the component

                            if (this.credit_cards.length == 0 ) {
                                this.step = 'creditCardList'; // especial step for credit card form
                                this.isLoading = false;
                                this.isLoadingMethod = false
                                return;
                            }else {
                                this.step = 'creditCardList'; // especial step for credit card form
                                this.isLoading = false;
                                this.isLoadingMethod = false
                            }
                        }
                        this.isLoading = false; // Set loading state to false
                    });
                }
                this.isLoading = false; // Set loading state to false
            });
        },

        /**
         * open Month Picker.
         */
        openMonthPicker() {
            const el = this.$refs?.monthInput as HTMLInputElement | undefined;
            if (!el) return;

            // We force focus and, if the browser supports it, we open the picker
            el.focus();
            try {
                // Modern Chrome/Edge
                if (typeof (el as any).showPicker === 'function') {
                    (el as any).showPicker();
                } else {
                    // Reasonable fallback for Safari/others
                    el.click();
                }
            } catch {
                // In some browsers, a focus/click is sufficient.
            }
        },

        /**
         * parse Expiry.
         */
        openDeleteCard(card: any) {
            // Abre confirmación de borrado
            this.deleteCardView = true;
            this.cardToDelete = card?.id ?? card?.card_id ?? '';

            // IMPORTANTE: evita que quede seleccionada y se habilite “Depositar”
            if (this.selectedCardId === (card?.id ?? card?.card_id)) {
                this.selectedCardId = null;
            }
            this.canDeposit = false;
            this.sendCard = {}; // limpia el payload por seguridad
        },

        /**
         * parse Expiry.
         */
        parseExpiry(input: any) {
            if (!input) return { mm: '', yy2: '' };

            // Object with fields
            const m = input.expiry_month ?? input.expiryMonth ?? input.month ?? input.mm ?? '';
            const y = input.expiry_year ?? input.expiryYear ?? input.year ?? input.yy ?? '';
            if (m || y) {
                const mm = String(m || '').padStart(2, '0');
                const yy2 = String(y || '').slice(-2).padStart(2, '0');
                return { mm, yy2 };
            }

            // String
            const s = String(input).trim();

            // YYYY-MM
            const iso = s.match(/^(\d{4})[-/](\d{1,2})$/);
            if (iso) {
                const mm = iso[2].padStart(2, '0');
                const yy2 = iso[1].slice(-2);
                return { mm, yy2 };
            }

            // MM/YY, MM-YY, MM YY
            const mmyy = s.match(/^(\d{1,2})\s*[/\-\s]\s*(\d{2,4})$/);
            if (mmyy) {
                const mm = mmyy[1].padStart(2, '0');
                const yy2 = mmyy[2].slice(-2).padStart(2, '0');
                return { mm, yy2 };
            }

            // MMYY
            const mmyyCompact = s.match(/^(\d{2})(\d{2})$/);
            if (mmyyCompact) {
                const mm = mmyyCompact[1];
                const yy2 = mmyyCompact[2];
                return { mm, yy2 };
            }

            return { mm: '', yy2: '' };
        },

        /**
         * Build the standard payload for `sendCard` from the backend/UI card object.
         */
        extractSendCardFrom(card: any) {
            const raw = String(card?.cuenta ?? card?.number ?? card?.pan ?? '').replace(/\D/g, '');
            const last4 = raw.slice(-4) || '';

            // Brand
            const brand = (card?.brand || card?.franchise || '').toString().toLowerCase();

            // Expiration (accepts various forms)
            const { mm, yy2 } = this.parseExpiry(
                card?.expiration || card?.expiry || {
                    expiry_month: card?.expiry_month,
                    expiry_year:  card?.expiry_year,
                }
            );

            // Possible identifiers
            const id = card?.id ?? card?.card_id ?? card?.token ?? card?.reference ?? null;

            return {
                id,
                brand,
                cuenta: raw,      // raw number if available
                last4,
                expiry_month: mm, // "MM"
                expiry_year: yy2, // "YY" (2 digits)
                cardId: id,       // common alias
                original: card,   // in case you need more fields later
            };
        },

        /**
         * select Credit Card.
         */
        selectCreditCard(card: any) {
            console.log('Seleccionando tarjeta:', card);
            // Build the standard payload for the backend
            const payload = this.extractSendCardFrom(card);
            this.sendCard = card;
            console.log('Payload para enviar:', this.sendCard);

            // Select the option in the UI and enable “Deposit”
            this.selectedCardId = payload?.id ?? card?.id ?? card?.card_id ?? null;
            this.canDeposit = true;

            // Force re-render in case the button depends on canDeposit
            this.$forceUpdate?.();

            // Optional feedback
            try {
                const last4 = payload?.last4 ? `**** ${payload.last4}` : '';
                const brand = payload?.brand ? String(payload.brand).toUpperCase() : '';
                if (last4 || brand) this.showToast(this.$t('Tarjeta seleccionada') + (brand ? ` • ${brand}` : '') + (last4 ? ` • ${last4}` : ''));
            } catch (_) {}
        },

        /**
         * handle Deposito.
         */
        handleDeposito(payload?: any) {
            // GUARD 1: evita doble click/disparos mientras se procesa
            if (this.isSubmittingCard) return;

            // GUARD 2: valida CVV de la tarjeta seleccionada (3 ó 4 según marca)
            if (!this.validateSelectedCardCvv()) {
                // opcional: enfocamos el campo CVV si existe
                try {
                    const el = document.querySelector('input[placeholder="CVV"]') as HTMLInputElement | null;
                    el?.focus();
                } catch (_) {}
                return;
            }

            const p = payload || this.sendCard;
            if (!p || !p.id) {
                this.showToast(this.$t('Selecciona una tarjeta primero'));
                return;
            }

            this.finalStatus = 'processing';
            this.isLoading = true;
            this.canDeposit = false; // evita que el usuario intente enviar varias veces
            this.appComponent.showModalDepositV3 = true

            try { this.isSubmittingCard = true; } catch (_) {}

            const maybePromise = this.creditCardPayment({ sendCard: p });
            // limpia el flag al terminar si creditCardPayment devuelve una Promesa
            try {
                maybePromise?.finally?.(() => { this.isSubmittingCard = false; });
            } catch (_) {}
            return maybePromise;
        },

        /**
         * get Card Brand.
         */
        getCardBrand(card: any): string {
            const raw = String(card?.brand || card?.card_brand || '').toLowerCase();

            if (raw.includes('visa')) return 'Visa';
            if (raw.includes('master')) return 'Mastercard';
            if (raw.includes('american') || raw.includes('amex')) return 'amex';
            if (raw.includes('diners')) return 'Diners';
            if (raw.includes('discover')) return 'Discover';
            if (raw.includes('jcb')) return 'jcb';
            if (raw.includes('maestro')) return 'Maestro';

            const init = String(card?.initNumber || card?.bin || card?.prefix || '').replace(/\D/g, '');
            if (!init) return 'other';

            const i2 = init.slice(0, 2);
            const i3 = init.slice(0, 3);
            const i4 = init.slice(0, 4);
            const i2n = parseInt(i2 || '0', 10);
            const i3n = parseInt(i3 || '0', 10);
            const i4n = parseInt(i4 || '0', 10);

            if (init.startsWith('4')) return 'Visa';
            if ((i2n >= 51 && i2n <= 55) || (i4n >= 2221 && i4n <= 2720)) return 'Mastercard';
            if (i2 === '34' || i2 === '37') return 'amex';
            if (i2 === '36' || i2 === '38') return 'Diners';
            if (i4 === '6011' || i2 === '65' || (i3n >= 644 && i3n <= 649)) return 'Discover';
            if (i4n >= 3528 && i4n <= 3589) return 'jcb';
            if (i2 === '50' || (i2n >= 56 && i2n <= 69)) return 'Maestro';

            return 'other';
        },

        /**
         * get Card Logo.
         */
        getCardLogo(prefixOrBrand?: string) {
            // Logo map (same style as brandLogoSrc)
            const LOGOS: Record<string, string> = {
                visa: 'https://www.svgrepo.com/show/328144/visa.svg',
                mastercard: 'https://www.svgrepo.com/show/328121/mastercard.svg',
                american_express: 'https://www.svgrepo.com/show/328129/amex.svg',
                discover: 'https://www.svgrepo.com/show/328132/discover.svg',
                jcb: 'https://www.svgrepo.com/show/353923/jcb.svg',
                diners: 'https://www.svgrepo.com/show/508420/diners-club-international.svg'
            };

            const normalizeBrand = (b?: string | null): string | null => {
                if (!b) return null;
                const s = String(b).trim().toLowerCase();
                if (!s) return null;
                if (s === 'amex' || (s.includes('american') && s.includes('express'))) return 'american_express';
                if (s.includes('mastercard') || s.startsWith('mc-')) return 'mastercard';
                if (s.includes('visa')) return 'visa';
                if (s.includes('discover')) return 'discover';
                if (s.includes('jcb')) return 'jcb';
                if (s.includes('diners')) return 'diners';
                // It could come already standardized (Visa, Mastercard, etc.)
                return s as any;
            };

            // Detects brand using only numeric prefix (up to 4 digits)
            const detectFromPrefix = (p?: string | null): string | null => {
                if (!p) return null;
                const digits = String(p).replace(/\D/g, '');
                if (!digits) return null;

                const d1 = digits.slice(0, 1);
                const d2 = digits.slice(0, 2);
                const d3 = digits.slice(0, 3);
                const d4 = digits.slice(0, 4);
                const n2 = Number(d2 || 0);
                const n3 = Number(d3 || 0);
                const n4 = Number(d4 || 0);

                // Visa: It starts with 4
                if (d1 === '4') return 'visa';

                // Mastercard: 51–55 o 2221–2720
                if ((n2 >= 51 && n2 <= 55) || (n4 >= 2221 && n4 <= 2720)) return 'mastercard';

                // American Express: 34 o 37
                if (d2 === '34' || d2 === '37') return 'american_express';

                // Discover: 6011, 65, 644–649
                if (d4 === '6011' || d2 === '65' || (n3 >= 644 && n3 <= 649)) return 'discover';

                // JCB: 3528–3589
                if (n4 >= 3528 && n4 <= 3589) return 'jcb';

                // Diners Club: 300–305, 3095, 36, 38, 39
                if ((n3 >= 300 && n3 <= 305) || d4 === '3095' || d2 === '36' || d2 === '38' || d2 === '39') return 'diners';

                return null;
            };

            // 1) Determine the brand: if digits are present, detect; if a name is present, normalize.
            let brandKey: string | null = null;
            if (typeof prefixOrBrand === 'string' && prefixOrBrand.length) {
                if (/\d/.test(prefixOrBrand)) {
                    brandKey = detectFromPrefix(prefixOrBrand);
                } else {
                    brandKey = normalizeBrand(prefixOrBrand);
                }
            }

            // 2) Fallback: if no parameter was passed, use the globally detected mark
            if (!brandKey && this.currentBrand) brandKey = normalizeBrand(this.currentBrand);

            // 3) Returns the logo URL (as brandLogoSrc)
            return brandKey ? (LOGOS[brandKey] || '') : '';
        },

        /**
         * show Toast.
         */
        showToast(message: string, durationMs: number = 2000) {
            try { if (this.toastTimer) { clearTimeout(this.toastTimer); } } catch (_) {}
            this.toastMessage = message;
            this.toastVisible = true;
            this.toastTimer = setTimeout(() => {
                this.toastVisible = false;
                this.toastTimer = null;
            }, durationMs);
        },

        /*async scanCard() {
            if (this.isScanning) return;
            this.isScanning = true;
            let stream = null;
            try {
                // 1) Abrir cámara trasera
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } },
                    audio: false,
                });

                // 2) Video/canvas fuera del DOM
                const video = document.createElement('video');
                video.setAttribute('playsinline', 'true');
                video.srcObject = stream;
                await video.play();
                await new Promise(r => setTimeout(r, 800)); // autoexposición

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let parsed = null;
                // 3) Probar varios frames para mejorar chances
                for (let i = 0; i < 6 && !parsed; i++) {
                    await new Promise(r => setTimeout(r, 250));
                    canvas.width = video.videoWidth || 1280;
                    canvas.height = video.videoHeight || 720;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const { data } = await Tesseract.recognize(canvas, 'eng');
                    parsed = this.extractCardDataFromText(data?.text || '');
                }

                // 4) Volcar al formulario
                if (parsed?.number) {
                    this.fillFormFromParsed(parsed);
                } else {
                    console.warn('No se pudo leer la tarjeta. Mejora iluminación, encuadre y reintenta.');
                }

                // 5) Cerrar cámara
                stream.getTracks().forEach(t => t.stop());
                video.pause();
                stream = null;
            } catch (e) {
                console.error('scanCard error', e);
                if (stream) try { stream.getTracks().forEach(t => t.stop()); } catch {}
            } finally {
                this.isScanning = false;
            }
        },*/

        /**
         * extract Card Data From Text.
         */
        extractCardDataFromText(text) {
            if (!text) return null;

            console.log(text);
            // PAN candidates (13–19 digits with separators)
            const candidates = (text.match(/(?:\d[\s-]?){13,19}/g) || [])
                .map(s => s.replace(/[^\d]/g, ''))
                .filter(s => s.length >= 13 && s.length <= 19);

            let number: string | null = null;
            for (const cand of candidates) {
                if (this.luhnCheck(cand)) { number = cand; break; }
            }

            // MM/YY o MM/YYYY
            let expiryMonth, expiryYear;
            const exp = text.match(/(0[1-9]|1[0-2])[\s\/\-]{0,2}([0-9]{2,4})/);
            if (exp) {
                expiryMonth = Number(exp[1]);
                const yy = exp[2];
                expiryYear = yy.length === 2 ? Number('20' + yy) : Number(yy);
            }

            if (!number) return null;
            return { number, expiryMonth, expiryYear };
        },

        /**
         * luhn Check.
         */
        luhnCheck(num) {
            let sum = 0, dbl = false;
            for (let i = num.length - 1; i >= 0; i--) {
                let d = Number(num[i]);
                if (dbl) { d *= 2; if (d > 9) d -= 9; }
                sum += d; dbl = !dbl;
            }
            return sum % 10 === 0;
        },

        /**
         * fill Form From Parsed.
         */
        fillFormFromParsed({ number, expiryMonth, expiryYear }) {
            const digits = (number || '').replace(/\\D/g, '').slice(0, 19);
            // raw number (backend/validation)
            // @ts-ignore
            this.cardData.number = digits;
            // visible with spaces every 4
            // @ts-ignore
            this.cardData.numberFormatted = this.formatCardNumber
                ? this.formatCardNumber(digits)
                : digits.replace(/(.{4})/g, '$1 ').trim();

            // logo (if you have detectCardBrand)
            // @ts-ignore
            if (this.detectCardBrand) this.currentBrand = this.detectCardBrand(digits);

            if (expiryMonth && expiryYear) {
                const mm = String(expiryMonth).padStart(2, '0');
                const yyyy = String(expiryYear).padStart(4, '0');
                // @ts-ignore
                this.cardData.expiration_date = `${yyyy}-${mm}`; // for <input type=\"month\">
                // @ts-ignore
                this.cardData.expiration = `${mm}/${yyyy.slice(-2)}`; // MM/AA
            }
        },

        /**
         * open Scan Overlay.
         */
        openScanOverlay() {
            this.scanCaptured = false;
            this.showScanOverlay = true;
            try { document.body.classList.add('overflow-hidden'); } catch (_) {}
            this.$nextTick(() => this.startCameraAndLoop());
        },

        /**
         * close Scan Overlay.
         */
        async closeScanOverlay() {
            try {
                if (this.scanStream) {
                    try { this.scanStream.getTracks().forEach(t => t.stop()); } catch (_) {}
                    this.scanStream = null;
                }
                const v = this.$refs?.scanVideo as HTMLVideoElement | undefined;
                if (v) {
                    try { v.pause(); (v as any).srcObject = null; } catch (_) {}
                }
            } finally {
                try { document.body.classList.remove('overflow-hidden'); } catch (_) {}
                this.isScanning = false;
                this._ocrBusy = false;
                this.showScanOverlay = false;
            }
        },

        /**
         * start Camera And Loop.
         */
        async startCameraAndLoop() {
            if (this.isScanning) return;
            try {
                const v = this.$refs?.scanVideo as HTMLVideoElement | undefined;
                if (!v) return;

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } },
                    audio: false,
                });
                this.scanStream = stream;
                (v as any).srcObject = stream;
                await v.play();

                this.isScanning = true;
                await new Promise(r => setTimeout(r, 600)); // warm-up

                let attempts = 0;
                const maxAttempts = 80; // ~50s approx. depending on CPU
                while (this.showScanOverlay && this.isScanning && attempts < maxAttempts) {
                    attempts++;
                    const parsed = await this.scanOnceTesseract();
                    if (parsed?.number && !this.scanCaptured) {
                        this.scanCaptured = true;
                        await this.handleScanSuccess(parsed);
                        break;
                    }
                    await new Promise(r => setTimeout(r, 650)); // pacing
                }
            } catch (e) {
                console.error('startCameraAndLoop error', e);
                await this.closeScanOverlay();
            }
        },

        /**
         * handle Scan Success.
         */
        async handleScanSuccess(parsed: { number: string; expiryMonth?: number; expiryYear?: number }) {
            // Transfer data to the form
            this.fillFormFromParsed(parsed);
            // Ensure the form is visible
            if (this.step !== 'addCreditCardForm') {
                this.step = 'addCreditCardForm';
                await this.$nextTick();
            }

            // Close overlay
            await this.closeScanOverlay();

            // Optional: focus on CVV if it exists, or number as a fallback
            this.$nextTick(() => {
                const cvv = document.querySelector('input[name="cvv"], input[autocomplete="cc-csc" ]') as HTMLInputElement | null;
                if (cvv) {
                    try { cvv.focus(); } catch (_) {}
                    return;
                }
                const num = document.querySelector('input[autocomplete="cc-number"]') as HTMLInputElement | null;
                if (num) {
                    try { num.focus(); } catch (_) {}
                }
            });
        },

        /**
         * scan Once Tesseract.
         */
        async scanOnceTesseract() {
            try {
                if (this._ocrBusy) return null;

                const v = this.$refs?.scanVideo as HTMLVideoElement | undefined;
                const c = this.$refs?.scanCanvas as HTMLCanvasElement | undefined;
                if (!v || !c || !v.videoWidth || !v.videoHeight) return null;

                // ROI centered (matches the guideline): 86% width, 44% height
                const ctx = c.getContext('2d');
                if (!ctx) return null;

                const roiW = Math.floor(v.videoWidth * 0.86);
                const roiH = Math.floor(v.videoHeight * 0.44);
                const roiX = Math.floor((v.videoWidth - roiW) / 2);
                const roiY = Math.floor((v.videoHeight - roiH) / 2);

                c.width = roiW;
                c.height = roiH;
                ctx.drawImage(v, roiX, roiY, roiW, roiH, 0, 0, roiW, roiH);

                this._ocrBusy = true;
                const { data } = await Tesseract.recognize(c, 'eng');
                this._ocrBusy = false;

                const text = data?.text || '';
                return this.extractCardDataFromText ? this.extractCardDataFromText(text) : null;
            } catch (e) {
                this._ocrBusy = false;
                console.warn('scanOnceTesseract error', e);
                return null;
            }
        },

        /**
         * handle Card Number Input.
         */
        handleCardNumberInput(event: InputEvent) {
            const el = event.target as HTMLInputElement;
            // pure digits (up to 19)
            const digits = (el.value || '').replace(/\D/g, '').slice(0, 19);

            // raw food store
            // @ts-ignore
            this.cardData.number = digits;

            // Format visible with spaces every 4
            const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
            // @ts-ignore
            this.cardData.numberFormatted = formatted;
            el.value = formatted;

            // Display logo ONLY if there are already 4+ digits
            // @ts-ignore
            this.currentBrand = digits.length >= 4 ? this.detectCardBrand(digits) : null;
        },

        /**
         * format Card Number with spaces.
         */
        formatCardNumber(value: string) {
            const digits = (value || '').replace(/\D/g, '').slice(0, 19);
            return digits.replace(/(.{4})/g, '$1 ').trim();
        },

        /**
         * detect Card Brand.
         */
        detectCardBrand(num: string): string | null {
            if (!num) return null;
            // Visa: starts with 4 (13–19 digits)
            if (/^4\d{0,18}$/.test(num)) return 'visa';
            // Mastercard: 51–55 or 2221–2720 (16 digits)
            if (/^(5[1-5]\d{0,14}|222[1-9]\d{0,12}|22[3-9]\d{0,13}|2[3-6]\d{0,14}|27[01]\d{0,13}|2720\d{0,12})$/.test(num)) {
                return 'mastercard';
            }
            // American Express: 34 or 37 (15 digits)
            if (/^(34|37)\d{0,13}$/.test(num)) return 'american_express';

            // (optional, in case you want to activate them)
            if (/^(6011|65|64[4-9])\d*$/.test(num)) return 'discover';
            if (/^35(2[89]|[3-8]\d)\d*$/.test(num)) return 'jcb';
            if (/^(30[0-5]|3095|36|3[89])\d*$/.test(num)) return 'diners';

            return null;
        },

        /** Returns the URL of the logo to paint in the input */
        brandLogoSrc(): string {
            // If you already have a getCardLogo(brand) helper in this component, reuse it:
            // Map american_express to amex if your helper expects it that way
            // @ts-ignore
            if (this.currentBrand && this.getCardLogo) {
                // @ts-ignore
                const key = this.currentBrand === 'american_express' ? 'amex' : this.currentBrand;
                // @ts-ignore
                const url = this.getCardLogo(key);
                if (url) return url;
            }
            // Simple fallback (replace with your local routes if necessary)
            const map: Record<string, string> = {
                visa: 'https://www.svgrepo.com/show/328144/visa.svg',
                mastercard: 'https://www.svgrepo.com/show/328121/mastercard.svg',
                american_express: 'https://www.svgrepo.com/show/328129/amex.svg',
                discover: 'https://www.svgrepo.com/show/328132/discover.svg',
                jcb: 'https://www.svgrepo.com/show/353923/jcb.svg',
                diners: 'https://www.svgrepo.com/show/508420/diners-club-international.svg'
            };
            // @ts-ignore
            return this.currentBrand ? map[this.currentBrand] || '' : '';
        },

        syncExpirationFromDate() {
            const v: string = this.cardData?.expiration_date || '';
            if (!v) {
                this.cardData.expiration = '';
                return;
            }
            // v = "YYYY-MM" -> "MM/YY"
            const [y, m] = v.split('-');
            if (y && m) this.cardData.expiration = `${m}/${String(y).slice(-2)}`;
        },

        /**
         * validate Card Fields.
         */
        validateCardFields() {
            const errors = {};

            // Card number
            const number = this.cardData.number.replace(/\s+/g, "");
            if (!number) {
                errors.number = this.$t("El número de tarjeta es obligatorio");
            } else if (!/^\d{13,19}$/.test(number)) {
                errors.number = this.$t("El número de tarjeta debe tener entre 13 y 19 dígitos");
            }


            // Expiration
            if (!this.cardData.expiration) {
                errors.expiration = this.$t("La fecha de expiración es obligatoria");
            } else if (!/^\d{2}\/\d{2}$/.test(this.cardData.expiration)) {
                errors.expiration = this.$t("Formato inválido. Usa MM/AA");
            }

            // CVV
            if (!this.cardData.cvv) {
                errors.cvv = this.$t("El CVV es obligatorio");
            } else if (!/^\d{3,4}$/.test(this.cardData.cvv)) {
                errors.cvv = this.$t("El CVV debe tener 3 o 4 dígitos");
            }


            // Save errors in a modal, just like login.
            this.appComponent.modal.messageModal = {
                ...this.appComponent.modal.messageModal,
                errors
            };

            return Object.keys(errors).length === 0;
        },

        /**
         * submit Card Deposit for the deposit.
         */
        submitCardDeposit() {
            if (!this.validateCardFields()) {
                return; // If there are errors, it does not continue.
            }
            // 👉 Show loading animation

            if (this.cardData.requireAuth) {
                this.authenticationCardFunction();
            } else {
                this.addCardFunction();
            }
            /*this.handleDeposit({
                service: this.franchiseSelected?.id_franquicia || "credit_card",
                card: { ...this.cardData }
            });*/
        },

        /**
         * authentication Card Function for the deposit.
         */
        authenticationCardFunction() {

            const params = {
                num_tarjeta: this.cardData.number.replace(/ /g, ''),
                expiry_month: this.cardData.expiration?.split("/")?.[0] || "",
                expiry_year: this.cardData.expiration?.split("/")?.[1],
                cvv: this.cardData.cvv,
            };
            console.log(params);
            apiService
                .request('authentication_add_card', params)
                .then((response: any) => {
                    if (response.code == 0) {
                        this.finalStatus = 'authenticating';
                        this.authentication.token = response.data.token;
                        this.authentication.requestId = response.data.requestId;
                        this.authentication.referenceId = response.data.referenceId;
                        this.authentication.deviceDataCollectionUrl = response.data.deviceDataCollectionUrl;
                        let form = document.createElement('form');
                        form.method = 'POST';
                        form.action = response.data.deviceDataCollectionUrl;
                        form.target = 'collectionIframe';
                        let input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'JWT';
                        input.value = response.data.token;
                        form.appendChild(input);
                        document.body.appendChild(form);
                        form.submit();
                        let vthis = this;
                        window.addEventListener('message', messageHandler, { once: true });
                        function messageHandler(event) {
                            let rsp = JSON.parse(event.data);
                            if (
                                (event.origin === 'https://centinelapistag.cardinalcommerce.com' ||
                                    event.origin === 'https://centinelapi.cardinalcommerce.com') &&
                                vthis.dataIframe.stepUpUrl == '' &&
                                rsp.SessionId == vthis.authentication.referenceId
                            ) {
                                if (rsp.MessageType == 'profile.completed') {
                                    if (rsp.Status) {
                                        vthis.addCardFunction();
                                        form.remove();
                                    }
                                }
                            }
                        }
                    } else {
                        this.finalStatus = 'failed';
                        // Handle error response
                        var error_mensaje = '';
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString());
                        }
                        if (response.data.result != undefined) {
                            error_mensaje = this.$t(response.data.result);
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            );
                        }
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.buttonEnabledCard = false;
                        this.emitter.emit('closeModalAddCard');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        /**
         * Function to handle card addition logic.
         */
        addCardFunction() {
            this.isSubmittingCard = true
            const params = {
                num_tarjeta: this.cardData.number.replace(/ /g, ''),
                expiry_month: this.cardData.expiration?.split("/")?.[0] || "",
                expiry_year: this.cardData.expiration?.split("/")?.[1],
                cvv: this.cardData.cvv,
                amount: this.amountDeposit || 0,
                saveCard: this.cardData.saveCard || true,
                requestId: this.authentication.requestId,
                referenceId: this.authentication.referenceId,
            };
            apiService.request('register_credit_card', params).then((response: any) => {
                if (response.code == 0) {
                    setTimeout(() => {
                        this.isSubmittingCard = false
                        if(this.viewAmountInAddCard) {
                            this.stateCard = 'successfulCreditCardTicket'
                            this.ticket = response.data.voucher
                        } else {
                            this.stateCard = 'successfulCreditCard'; // Disable loading state after 2 seconds
                        }
                    }, 5000);


                    // Handle 3D Secure authentication
                    if (response.data.code == 'PG402-05') {
                        this.dataIframe = {
                            stepUpUrl: response.data.stepUpUrl,
                        };
                        let iframe = document.createElement('iframe') as any;
                        iframe.id = 'step_up_iframe';
                        iframe.name = 'stepUpIframe';
                        iframe.width = '400';
                        iframe.height = '560';
                        iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
                        iframe.style.background = 'white';
                        iframe.style.border = 'none';
                        iframe.style.marginLeft = 'auto';
                        iframe.style.marginRight = 'auto';
                        iframe.style.display = 'block';
                        let container = document.getElementById('add-card') as any;
                        container.appendChild(iframe);
                        const vthis = this;
                        let count = 0;
                        iframe.addEventListener('load', function () {
                            iframe.addEventListener('load', function () {
                                count++;
                                const params = {
                                    num_tarjeta: vthis.cardData.num_tarjeta.replace(/ /g, ''),
                                    expiry_month: vthis.cardData.expiry_month,
                                    expiry_year: vthis.cardData.expiry_year,
                                    cvv: vthis.cardData.cvv,
                                    amount: vthis.cardData.amount,
                                    productId: vthis.cardData.productId,
                                    saveCard: vthis.cardData.saveCard,
                                    requestId: vthis.authentication.requestId,
                                    referenceId: vthis.authentication.referenceId,
                                    stepUpUrl: response.data.stepUpUrl,
                                    idTransaction: response.data.idTransaction,
                                    transactionOriginal: response.data.transactionOriginal,
                                };
                                if (count == 1) {
                                    vthis.validation3D(params);
                                }
                            });
                        });
                        let step_up_form = document.createElement('form');
                        step_up_form.id = 'step_up_form';
                        step_up_form.action = response.data.stepUpUrl;
                        step_up_form.method = 'POST';
                        step_up_form.target = 'stepUpIframe';
                        let step_up_form_jwt_input = document.createElement('input');
                        step_up_form_jwt_input.id = 'step_up_form_jwt_input';
                        step_up_form_jwt_input.type = 'hidden';
                        step_up_form_jwt_input.name = 'JWT';
                        step_up_form_jwt_input.value = response.data.token;
                        step_up_form.appendChild(step_up_form_jwt_input);
                        container.appendChild(step_up_form);
                        step_up_form.submit();
                    } else if (
                        response.dataVisaNet !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country] !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country]
                    ) {
                        this.buttonEnabledCard = false;
                        this.cardAdd = {
                            num_tarjeta: '',
                            expiry_month: '',
                            expiry_year: '',
                            cvv: '',
                            amount: '',
                            productId: '',
                            saveCard: false,
                            saveCardShow: false,
                            requireAuth: false,
                        };
                        this.emitter.emit('closeModalAddCard');
                        this.appComponent.closeModal();
                        this.appComponent.modalVisaNetDepositData = response.dataVisaNet;
                        this.appComponent.modalVisaNetDeposit = true;
                    } else {
                        // Show success notification modal
                        this.buttonEnabledCard = false;
                        this.refreshBalance();
                        this.cardAdd = {
                            num_tarjeta: '',
                            expiry_month: '',
                            expiry_year: '',
                            cvv: '',
                            amount: '',
                            productId: '',
                            saveCard: false,
                            saveCardShow: false,
                            requireAuth: false,
                        };
                        this.emitter.emit('closeModalAddCard');
                        this.buttonEnabledCard = false;
                    }
                } else {
                    setTimeout(() => {
                        this.isSubmittingCard = false
                        this.finalStatus = 'failed'; // Disable loading state after 2 seconds
                    }, 5000);

                    // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (response.data.result != undefined) {
                        error_mensaje = this.$t(response.data.result);
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                }
            });
        },

        /**
         * Handles the selection of a deposit method and updates the loading state.
         * @param {Object} method - The selected deposit method.
         */
        async handleMethodSelected(method) {
            console.log('Selected method: ', method); // Log the selected method
            this.isLoadingMethod = true; // Enable loading state for method selection
            this.methodSelected = method; // Set the selected method

            switch (method.id) {
                case 'bank_accounts':
                    console.log('Selected method: bank_accounts'); // Log bank accounts method
                    break;
                case 'credit_card':
                    console.log('Selected method: credit_card'); // Log bank accounts method
                    break;
                case 'deposit_access':
                    console.log('Selected method: deposit_access'); // Log payment gateway method
                    break;
                case 'crypto':
                    console.log('Selected method: crypto'); // Log cryptocurrency method
                    break;
                case 'wallet':
                    console.log('Selected method: wallet'); // Log wallet method
                    break;
                case 'gif':
                    console.log('Selected method: gif'); // Log gift card method
                    break;
                case 'cash':
                    console.log('Selected method: cash'); // Log cash method
                    break;
                case 'fri_gateway_deposit':
                console.log('Selected method: fri_gateway_deposit');
                this.getPaymentsConfigured(true);
                    break;
                default:
                    console.log('Unknown method: ', method); // Log unknown method
                    break;
            }

            if (method.id === 'credit_card') {
                this.isLoadingMethod = true
                apiService.request('get_credit_cards', {}).then((response: any) => {
                    if (response.code == 0) {
                        let cc: any = []; // Array to hold active credit cards
                        response.data.cards.forEach((item: any) => {
                            if (item.state == 'A') {
                                if(item.activateCvc == 'S') {
                                    item.Cvc = ''
                                }
                                cc.push(item); // Add active cards to the array
                            }
                        });
                        this.credit_cards = cc; // Assign active cards to the component
                        if (this.credit_cards.length == 0 ) {
                            this.step = 'creditCardList'; // especial step for credit card form
                            this.isLoading = false;
                            this.isLoadingMethod = false
                            return;
                        }else {
                            this.step = 'creditCardList'; // especial step for credit card form
                            this.isLoading = false;
                            this.isLoadingMethod = false
                        }
                    }
                    this.isLoading = false; // Set loading state to false
                });
            }

            setTimeout(() => {
                this.isLoadingMethod = false; // Disable loading state after 2 seconds
            }, 1000);
        },

        /**
         * Handles the selection of a franchise and updates the loading state.
         * If the franchise is for deposit information, it sets the modal data.
         * Otherwise, it proceeds with the deposit process.
         * @param {Object} franchise - The selected franchise.
         */
        handleFranchiseSelected(franchise) {
            console.log('Selected payment gateway method: ', franchise); // Log the selected franchise
            if (franchise.popupTarjeta) {
                this.callModalAddCard(
                    franchise['validation_3DS'] != undefined && franchise['validation_3DS'] != null
                        ? franchise['validation_3DS']
                        : false,
                );
                this.cardAdd.amount = this.amountDeposit
                if (franchise.Commission != undefined && franchise.Commission != null && franchise.Commission != '')
                    this.cardAdd.Commission = franchise.Commission;
                this.cardAdd.productId = franchise.id_franquicia;
                this.cardAdd.saveCardShow = franchise.saveCard;
                this.cardAdd.requireAuth = franchise.requireAuth;
                return
            }
            this.isLoading = true; // Enable loading state
            this.isLoadingMethod = true;
            this.franchiseSelected = franchise; // Set the selected franchise

            if (franchise.tipo === 'credit_card') {
                this.isLoading = true;
                this.isLoadingMethod = true;

                // Ir directamente a la vista de lista de tarjetas
                this.step = 'creditCardList';

                // Cargar las tarjetas en segundo plano
                apiService.request('get_credit_cards', {}).then((response: any) => {
                    if (response.code == 0) {
                        let cc: any = [];
                        response.data.cards.forEach((item: any) => {
                            if (item.state == 'A') {
                                cc.push(item);
                            }
                        });
                        this.credit_cards = cc;
                    }
                }).catch((e) => {
                    console.error("Error loading credit cards:", e);
                }).finally(() => {
                    this.isLoading = false;
                    this.isLoadingMethod = false;
                });
            }

            if (franchise.id_franquicia === 'deposit_info') {
                this.appComponent.infoModalDeposit = franchise; // Set modal data for deposit info

                setTimeout(() => {
                    this.isLoading = false; // Disable loading state after 2 seconds
                    this.isLoadingMethod = false;
                }, 1000);
            } else {
                this.handleDeposit(); // Proceed with the deposit process
            }
        },

        /**
         * Handles the deposit process, including user authentication, analytics tracking,
         * and API requests for deposit actions.
         */
        handleDeposit(extra = {}) {
            // Check if the user is logged in for landing deposits
            if (
                (this.route.path == '/landing/depositos' || this.route.path == '/landing/depositos-ecuador') &&
                !this.appComponent.session.logueado
            ) {
                this.appComponent.showModalLogin = true; // Show login modal
                this.appComponent.depositFromLanding = {
                    amount: this.amountDeposit, // Set deposit amount
                    service: extra.service || (this.franchiseSelected ? this.franchiseSelected.id_franquicia : 'credit_card'), // Set selected franchise/service
                };
            } else {
                // Track deposit analytics
                this.appComponent.gAnalytics('deposit', {
                    moneda: this.appComponent.session.moneda_nom || null, // Currency name
                    info: extra.service || this.franchiseSelected?.id_franquicia || null, // Selected franchise ID or service
                    monto: this.amountDeposit, // Deposit amount
                    type: 'franchise', // Type of deposit
                });
                this.appComponent.disabledButtonForm = true; // Disable form button

                let routeSucess = '';
                // Determine the success route based on configuration
                if (
                    this.appComponent.config.depositos?.showModalConfirm?.[this.appComponent.country]
                ) {
                    routeSucess = this.appComponent.config.depositos.ThankYouDeposit?.[this.appComponent.country]?.show
                        ? this.config.urlSkin + 'graciasdeposito'
                        : this.config.urlSkin + 'gestion/deposito/correcto';
                    
                    const deposits = this.appComponent.config.depositsView?.[this.appComponent.country];
                    const hasFri = deposits?.methods?.find((method:any) => method.id === 'fri_gateway_deposit');

                    let params = {
                        amount: this.amountDeposit, // Deposit amount
                        payer: {
                            status_urls: {
                                cancel: this.config.urlSkin + 'gestion/deposito/pendiente', // Cancel URL
                                fail: this.config.urlSkin + 'gestion/deposito/error', // Fail URL
                                success: routeSucess, // Success URL
                            },
                            forProduct: 'casino', // Product type
                            '1tap': true, // Enable one-tap payment
                        },
                        service: extra.service || (this.franchiseSelected ? this.franchiseSelected.id_franquicia : 'credit_card'), // Selected franchise/service
                        vs_utm_campaign: '',
                        vs_utm_campaign2: '',
                        franchise: true,
                        extra
                    };

                    if (hasFri) {
                      params.franchise = false;
                    }

                    if (
                        this.appComponent.config.depositsView !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country]['type'] !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country]['type'] === 'Pasarela de pago'
                    ) {
                        params.franchise = false; // Disable franchise if using payment gateway
                    }

                    let vs_utm_campaign = '';
                    let vs_utm_source = '';
                    let vs_utm_medium = '';
                    let vs_utm_content = '';
                    let vs_utm_term = '';
                    let stParam = '';
                    // Collect UTM parameters from cookies
                    if (this.cookies.get('vs_utm_campaign') !== '') {
                        vs_utm_campaign = this.cookies.get('vs_utm_campaign');
                        params.vs_utm_campaign = vs_utm_campaign;
                    }
                    if (this.cookies.get('vs_utm_campaign2') !== '') {
                        params.vs_utm_campaign2 = this.cookies.get('vs_utm_campaign2');
                    }
                    if (this.cookies.get('vs_utm_source') !== '') {
                        vs_utm_source = this.cookies.get('vs_utm_source');
                    }
                    if (this.cookies.get('vs_utm_medium') !== '') {
                        vs_utm_medium = this.cookies.get('vs_utm_medium');
                    }
                    if (this.cookies.get('vs_utm_content') !== '') {
                        vs_utm_content = this.cookies.get('vs_utm_content');
                    }
                    if (this.cookies.get('vs_utm_term') !== '') {
                        vs_utm_term = this.cookies.get('vs_utm_term');
                    }
                    // Append UTM parameters to the request
                    if (vs_utm_campaign !== '') {
                        stParam = stParam + '&vs_utm_campaign=' + vs_utm_campaign;
                    }
                    if (vs_utm_source !== '') {
                        stParam = stParam + '&vs_utm_source=' + vs_utm_source;
                    }
                    if (vs_utm_content !== '') {
                        stParam = stParam + '&vs_utm_content=' + vs_utm_content;
                    }
                    if (vs_utm_term !== '') {
                        stParam = stParam + '&vs_utm_term=' + vs_utm_term;
                    }
                    if (vs_utm_medium !== '') {
                        stParam = stParam + '&vs_utm_medium=' + vs_utm_medium;
                    }
                    const vthis = this;
                    this.appComponent.disabledButtonForm = true;

                    console.log(params);

                    // Request deposit action
                    apiService.request('deposit', params).then((response: any) => {
                        if (response.code == 0) {
                            // Handle phone verification if required
                            if (response.data.necesitaVerificacionCelular) {
                                this.callModalVerifyPhone(vthis.appComponent.session.email);
                            } else if (response.data.necesitaAprobacion) {
                                // Handle approval process
                                this.callModalNeedApproval();
                                const data = {
                                    riskId: response.data.riskId,
                                    stateRisk: response.data.stateRisk,
                                };
                                let estadoDeposito = setInterval(() => {
                                    apiService.request('deposit', data).then((response2: any) => {
                                        response2 = response2.data;
                                        if (response2.code == 0) {
                                            if (response2.data.stateRisk === 1) {
                                                vthis.dataText = vthis.$t('You can now continue with your deposit process.');
                                                clearInterval(estadoDeposito);
                                                vthis.appComponent.deposit(response2);
                                            } else if (response2.data.stateRisk === 2) {
                                                vthis.dataText = vthis.$t('Sorry... Please try again later.');
                                                clearInterval(estadoDeposito);
                                            }
                                        }
                                    });
                                }, 5000);
                            } else {
                                // Proceed with deposit
                                try {
                                    vthis.appComponent.deposit(response, {
                                        amount: vthis.amountDeposit,
                                        id: vthis.franchiseSelected.id_franquicia,
                                    });
                                }catch (e) {
                                    console.error("Deposit error:", e);
                                }

                                setTimeout(() => {
                                    this.isLoadingMethod = false;
                                    vthis.isLoading = false; // Disable loading state
                                }, 1000);
                            }
                            this.appComponent.disabledButtonForm = false;
                            this.appComponent.depositFromLanding = null;
                        } else {
                            if (response.error_code == 300236) {
                                    this.appComponent.modal = {
                                        showModal: 'notification',
                                        titleModal: this.$t('Cuenta desverificada'),
                                        messageModal: this.$t(
                                            'Tu documento de identidad está vencido y tu cuenta ha sido desverificada. Debes actualizar tu documento para poder realizar depósitos.',
                                        ),
                                        buttonModal: this.$t('Actualizar documento'),
                                        orderModal: 'unverifiedAccount',
                                    };
                                } else {
                                    // Handle errors
                            const error_mensaje = this.$t('ERROR' + response.error_code.toString()) || this.$t('ERROR_GENERAL');
                            this.appComponent.modal = {
                                showModal: 'notification',
                                titleModal: this.$t('Error!'),
                                messageModal: error_mensaje,
                                buttonModal: this.$t('Accept'),
                                orderModal: 'closeModal',
                            };
                            if (this.appComponent.depositFromLanding) {
                                this.appComponent.depositFromLanding = null;
                            }
                            setTimeout(() => {
                                this.isLoading = false; // Disable loading state
                                this.appComponent.showModalDepositV3 = false; // Close modal
                            }, 1000);
                                }
                        }
                    });
                } else {
                    this.appComponent.depositExtra = extra
                    // Show confirmation modal
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Message'),
                        messageModal: this.$t('Do you want to deposit?'),
                        buttonModal: this.$t('Accept'),
                        orderModal: 'deposit',
                    };
                }
            }
        },

        creditCardPayment(item) {
            const params = {
                id: this.sendCard.id,
                amount: this.amountDeposit,
                cvv: this.sendCard.Cvc,
            };
            console.log(params);
            // Request credit card payment
            apiService.request('credit_card_payment', params).then((response: any) => {
                if (response.code == 0) {
                    this.isLoading = false
                    this.canDeposit = false;
                    this.selectedCardId = null;
                    this.ticket = response.data.voucher;
                    // Check if VisaNet modal should be displayed
                    this.finalStatus = 'successfulTicket';

                    this.sendCvv = '';
                    if (
                        response.dataVisaNet !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country] !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country]
                    ) {
                        this.appComponent.modalVisaNetDepositData = response.dataVisaNet;
                        this.appComponent.modalVisaNetDeposit = true;
                    } else {
                        if (response.result != undefined && response.result != '') {
                            window.location.href = response.result;
                            return false;
                        }

                    }
                } else {
                    this.canDeposit = false;
                    this.selectedCardId = null;
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (error_mensaje == '' && response.data != undefined) {
                        error_mensaje = this.$t(response.data);
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                    this.finalStatus = 'failed';
                    this.isLoading = false;
                }
            });
        },

        /**
         * Fetches a list of casino games based on the current configuration and user session.
         * Updates the `gamesList` with the retrieved data and manages the loading state.
         */
        async getCasinoGames() {
            this.optionsGames = {
                action: this.carouselGames != '' ? this.carouselGames : 'getGames2', // Action to fetch games
                partner_id: this.appComponent.partnerG, // Partner ID for the request
                offset: 0, // Offset for pagination
                typelobby: 0, // Type of lobby
                limit: 20, // Maximum number of games to fetch
                country: this.appComponent.country, // User's country
                isMobile: this.appComponent.mobile == '1', // Whether the user is on a mobile device
                category: this.categoryGames, // Selected game category
                userId: this.appComponent.session.id_user, // User ID from session
            };
            if (this.appComponent.session.logueado) {
                this.optionsGames.testUser = this.appComponent.session.user_test == 1; // Include test user flag if logged in
            }
            try {
                await apiService
                    .requestGet(
                        this.appComponent.config.urlVirtualplayPython
                            ? this.appComponent.config.urlVirtualplayPython
                            : 'https://gameservice.virtualsoft.tech/cms/products',
                        this.optionsGames,
                    )
                    .then((response: any) => {
                        this.gamesList = response.data.games; // Update the games list with the response data
                        setTimeout(() => {
                            this.isLoading = false; // Disable loading state after 2 seconds
                        }, 1000);
                    });
            } catch (e) {
                console.log(e); // Log any errors
                setTimeout(() => {
                    this.isLoading = false; // Disable loading state after 2 seconds
                }, 1000);
            }
        },

        /**
         * Fetches a list of franchises and combines it with existing payment method information.
         * Updates the `franchises` array with the retrieved data.
         */
        async getFranchise() {
            await apiService.request('get_franchises', {}).then((response: any) => {
                if (response.code == 0) {
                    this.franchises = response.data.concat(this.metodos_pago_info); // Merge existing methods with the response data
                    setTimeout(() => {
                        this.isLoading = false; // Disable loading state after 2 seconds
                    }, 1000);
                }
            });
        },

        /**
         * Displays a modal to verify the user's phone number.
         * @param {string} emailVerifyPhone - The email associated with the phone verification.
         */
        callModalVerifyPhone(emailVerifyPhone) {
            this.appComponent.modal = {
                showModal: 'verifyPhone', // Modal type
                messageModal: {
                    emailVerifyPhone: emailVerifyPhone, // Email for verification
                },
            };
        },

        /**
         * Switches the deposit view to the old version and updates the local storage.
         * Tracks the view change using analytics.
         */
        handleChangeWithdrawalsView() {
            window.localStorage.setItem('newViewDeposit', 'false'); // Update local storage for view state
            this.appComponent.gAnalytics('deposit_old', 'new'); // Track view change
            this.appComponent.showModalDepositV3 = false; // Close the new modal
            this.appComponent.showModalDepositV2 = true; // Show the old modal
        },

        /**
         * Displays a modal indicating that the deposit requires approval.
         */
        callModalNeedApproval() {
            this.appComponent.modal = {
                showModal: 'needApproval', // Modal type
                messageModal: {
                    dataText: this.dataText, // Message content
                },
            };
        },


async getPaymentsConfigured(changeStep = true) {
  this.isLoadingMethod = true;
  try {
    // Get the configured deposit methods for the current country
    const country = this.appComponent?.country;
    const depositsView = this.appComponent?.config?.depositsView?.[country];

    // Verify that there are configured methods
    const methods = depositsView?.methods;
    if (!Array.isArray(methods)) {
    console.warn(`⚠️ No deposit methods configured for country: ${country}`);
    this.isLoadingMethod = false;
    return;
    }

    // Search for the active FRI method
    const friMethod = methods.find(
    (m) => m.id === "fri_gateway_deposit" && m.active === true
    );

    // If the FRI method does not exist or is not active, stop execution
    if (!friMethod) {
    console.warn("⚠️ Method 'fri_gateway_deposit' is inactive or does not exist. Skipping request.");
    this.isLoadingMethod = false;
    return;
    }
    let response = await apiService.request('get_payments_configured', {});

    if (changeStep) {
      this.step = 'fri_gateway_deposit';
    }
    if (response.code === 0) {
      this.paymentsConfigured = response.data;
    } else {
      console.warn('Error en la respuesta:', response.message);
    }
  } catch (error) {
    console.error('Error en fri_gateway_deposit:', error);
  } finally {
    this.isLoadingMethod = false;
  }
},

        /**
         * Fetches available payment methods and updates the state.
         * Adds a coupon option if configured for the current country.
         */
        getPayments() {
            let params = {};
            // Check if currency change button is defined for the current country
            if (
                this.appComponent.config.header !== undefined &&
                this.appComponent.config.header.currencyChangeButton !== undefined &&
                this.appComponent.config.header.currencyChangeButton[this.appComponent.country] !== undefined &&
                this.appComponent.config.header.currencyChangeButton[this.appComponent.country]
            ) {
                params = { user_id: this.currencySelected.Id }; // Include user ID if currency change is enabled
            }
            // Request payment methods from the API
            apiService.request('get_payments2', params).then((response: any) => {
                console.log({ response }); // Log the response
                if (response.code == 0 && response.data.length > 0) {
                    // Handle successful response
                    // Supón que response.data es el array que recibes
                    const franchisesAdapted = response.data.map(item => ({
                        id_franquicia: item.id, // Cambia 'id' a 'id_franquicia'
                        nombre: item.nombre,
                        imagen: item.imagen,
                        min: item.min,
                        max: item.max,
                        info: item.info,
                        valor: item.valor,
                        commission: item.Commission,
                        tiempo: item.tiempo,
                        pasarela: item.pasarela,
                        id_pasarela: item.id_pasarela,
                        isConfigurable: item.isConfigurable,
                        nombre_pasarela: item.nombre_pasarela,
                        popupTarjeta: item.popupTarjeta,
                    }));

                    // Ahora puedes usar franchisesAdapted como tus cards de franquicias
                    this.franchises = this.metodos_pago_info.concat(franchisesAdapted);

                    console.log(this.metodos_pago_info); // Log the adapted franchises
                } else {
                    // Add a coupon option if configured
                    if (
                        this.config.coupons[this.appComponent.country] != undefined &&
                        this.config.coupons[this.appComponent.country].show != undefined &&
                        this.config.coupons[this.appComponent.country].show
                    ) {
                        this.metodos_pago.unshift({
                            id: 'coupons', // Coupon ID
                            imagen: '', // No image
                            max: '0', // Maximum value
                            min: '0', // Minimum value
                            nombre: 'Cupón', // Name of the method
                            pasarela: '', // No gateway
                            tiempo: null, // No time limit
                            valor: null, // No value
                        });
                    }
                }
                setTimeout(() => {
                    this.isLoading = false; // Disable loading state after 2 seconds
                }, 1000);
            });
        },
        /**
         * Formats a number into a more readable string with 'K' for thousands and 'M' for millions.
         * @param {number} value - The number to format.
         * @returns {string} - The formatted number as a string.
         */
        formatNumber(value) {
            if (value >= 1_000_000) {
                return (value / 1_000_000).toFixed(1).replace('.0', '') + 'M';
            } else if (value >= 1_000) {
                return (value / 1_000).toFixed(1).replace('.0', '') + 'K';
            }
            return value.toString();
        },

        /**
         * Downloads an QR code image for the deposit.
         */
        downloadImage() {
            const link = document.createElement('a'); // Create an element <a>
            link.href = this.appComponent.infoModalDeposit.dataImg; // Set the image URL
            link.download = new Date().toISOString().split('T')[0] + '.png'; // Sets the file name
            document.body.appendChild(link); // Add the link to the DOM
            link.click(); // Simulate a click to start the download
            document.body.removeChild(link); // Remove the link from the DOM
        },

        acceptModal(){
            let extra = this.appComponent.depositExtra || {}
            let routeSucess = '';
            if (this.appComponent.modal.orderModal == 'deposit') {
                console.log('entra al modal de deposit')
                routeSucess = this.appComponent.config.depositos.ThankYouDeposit?.[this.appComponent.country]?.show
                        ? this.config.urlSkin + 'graciasdeposito'
                        : this.config.urlSkin + 'gestion/deposito/correcto';
                    
                    const deposits = this.appComponent.config.depositsView?.[this.appComponent.country];
                    const hasFri = deposits?.methods?.find((method:any) => method.id === 'fri_gateway_deposit');

                    let params = {
                        amount: this.amountDeposit, // Deposit amount
                        payer: {
                            status_urls: {
                                cancel: this.config.urlSkin + 'gestion/deposito/pendiente', // Cancel URL
                                fail: this.config.urlSkin + 'gestion/deposito/error', // Fail URL
                                success: routeSucess, // Success URL
                            },
                            forProduct: 'casino', // Product type
                            '1tap': true, // Enable one-tap payment
                        },
                        service: extra.service || (this.franchiseSelected ? this.franchiseSelected.id_franquicia : 'credit_card'), // Selected franchise/service
                        vs_utm_campaign: '',
                        vs_utm_campaign2: '',
                        franchise: true,
                        extra
                    };

                    if (hasFri) {
                      params.franchise = false;
                    }

                    if (
                        this.appComponent.config.depositsView !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country]['type'] !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country]['type'] === 'Pasarela de pago'
                    ) {
                        params.franchise = false; // Disable franchise if using payment gateway
                    }

                    let vs_utm_campaign = '';
                    let vs_utm_source = '';
                    let vs_utm_medium = '';
                    let vs_utm_content = '';
                    let vs_utm_term = '';
                    let stParam = '';
                    // Collect UTM parameters from cookies
                    if (this.cookies.get('vs_utm_campaign') !== '') {
                        vs_utm_campaign = this.cookies.get('vs_utm_campaign');
                        params.vs_utm_campaign = vs_utm_campaign;
                    }
                    if (this.cookies.get('vs_utm_campaign2') !== '') {
                        params.vs_utm_campaign2 = this.cookies.get('vs_utm_campaign2');
                    }
                    if (this.cookies.get('vs_utm_source') !== '') {
                        vs_utm_source = this.cookies.get('vs_utm_source');
                    }
                    if (this.cookies.get('vs_utm_medium') !== '') {
                        vs_utm_medium = this.cookies.get('vs_utm_medium');
                    }
                    if (this.cookies.get('vs_utm_content') !== '') {
                        vs_utm_content = this.cookies.get('vs_utm_content');
                    }
                    if (this.cookies.get('vs_utm_term') !== '') {
                        vs_utm_term = this.cookies.get('vs_utm_term');
                    }
                    // Append UTM parameters to the request
                    if (vs_utm_campaign !== '') {
                        stParam = stParam + '&vs_utm_campaign=' + vs_utm_campaign;
                    }
                    if (vs_utm_source !== '') {
                        stParam = stParam + '&vs_utm_source=' + vs_utm_source;
                    }
                    if (vs_utm_content !== '') {
                        stParam = stParam + '&vs_utm_content=' + vs_utm_content;
                    }
                    if (vs_utm_term !== '') {
                        stParam = stParam + '&vs_utm_term=' + vs_utm_term;
                    }
                    if (vs_utm_medium !== '') {
                        stParam = stParam + '&vs_utm_medium=' + vs_utm_medium;
                    }
                    const vthis = this;
                    this.appComponent.disabledButtonForm = true;

                    console.log(params);

                    // Request deposit action
                    apiService.request('deposit', params).then((response: any) => {
                        if (response.code == 0) {
                            // Handle phone verification if required
                            if (response.data.necesitaVerificacionCelular) {
                                this.callModalVerifyPhone(vthis.appComponent.session.email);
                            } else if (response.data.necesitaAprobacion) {
                                // Handle approval process
                                this.callModalNeedApproval();
                                const data = {
                                    riskId: response.data.riskId,
                                    stateRisk: response.data.stateRisk,
                                };
                                let estadoDeposito = setInterval(() => {
                                    apiService.request('deposit', data).then((response2: any) => {
                                        response2 = response2.data;
                                        if (response2.code == 0) {
                                            if (response2.data.stateRisk === 1) {
                                                vthis.dataText = vthis.$t('You can now continue with your deposit process.');
                                                clearInterval(estadoDeposito);
                                                vthis.appComponent.deposit(response2);
                                            } else if (response2.data.stateRisk === 2) {
                                                vthis.dataText = vthis.$t('Sorry... Please try again later.');
                                                clearInterval(estadoDeposito);
                                            }
                                        }
                                    });
                                }, 5000);
                            } else {
                                // Proceed with deposit
                                try {
                                    vthis.appComponent.deposit(response, {
                                        amount: vthis.amountDeposit,
                                        id: vthis.franchiseSelected.id_franquicia,
                                    });
                                }catch (e) {
                                    console.error("Deposit error:", e);
                                }

                                setTimeout(() => {
                                    this.isLoadingMethod = false;
                                    vthis.isLoading = false; // Disable loading state
                                }, 1000);
                            }
                            this.appComponent.disabledButtonForm = false;
                            this.appComponent.depositFromLanding = null;
                            this.appComponent.depositExtra = null;
                        } else {
                            if (response.error_code == 300236) {
                                    this.appComponent.modal = {
                                        showModal: 'notification',
                                        titleModal: this.$t('Cuenta desverificada'),
                                        messageModal: this.$t(
                                            'Tu documento de identidad está vencido y tu cuenta ha sido desverificada. Debes actualizar tu documento para poder realizar depósitos.',
                                        ),
                                        buttonModal: this.$t('Actualizar documento'),
                                        orderModal: 'unverifiedAccount',
                                    };
                                } else {
                                    // Handle errors
                            const error_mensaje = this.$t('ERROR' + response.error_code.toString()) || this.$t('ERROR_GENERAL');
                            this.appComponent.modal = {
                                showModal: 'notification',
                                titleModal: this.$t('Error!'),
                                messageModal: error_mensaje,
                                buttonModal: this.$t('Accept'),
                                orderModal: 'closeModal',
                            };
                            if (this.appComponent.depositFromLanding) {
                                this.appComponent.depositFromLanding = null;
                                this.appComponent.depositExtra = null;
                            }
                            setTimeout(() => {
                                this.isLoading = false; // Disable loading state
                                this.appComponent.showModalDepositV3 = false; // Close modal
                            }, 1000);
                                }
                        }
                    });
            } else {
                if (this.appComponent.modal.orderModal == 'unverifiedAccount') {
                    this.$router.push('/gestion/verificar_cuenta');
                    this.appComponent.showModalDepositV2 = false
                    this.appComponent.showModalDepositV3 = false
                    this.appComponent.closeModal();
                } else {
                    this.appComponent.closeModal();
                }
            }
        }
    },
    /**
     * Lifecycle hook that is called when the component is unmounted.
     * This method is responsible for cleaning up event listeners.
     */
    unmounted() {
        // Remove the 'accept:modal' event listener from the emitter
        this.emitter.all.delete('accept:modal');
    },
    mounted() {
        this.emitter.on('closeModalAddCard', () => {
            // Reset card addition form fields
            this.cardAdd = {
                num_tarjeta: '',
                expiry_month: '',
                expiry_year: '',
                cvv: '',
                amount: null,
                productId: '',
                saveCard: false,
                saveCardShow: false,
                requireAuth: false,
            };
        });
        // Event listener for accepting modal
        this.emitter.on('accept:modal', () => {
            this.appComponent.closeModal(); // Close the modal
            this.acceptModal(); // Accept the modal
            this.appComponent.gAnalytics('deposit_accept'); // Track analytics event
        });

        // Check if the 'newViewDeposit' flag is set in localStorage
        if (
            this.appComponent.config.depositsView !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['switch'] === false &&
            this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] === true
        ) {
            window.localStorage.removeItem('newViewDeposit');
            window.localStorage.setItem('newViewDeposit', 'true');
            this.newView = true;
        } else if (window.localStorage.getItem('newViewDeposit') == 'true') {
            this.newView = true; // Enable the new view
            window.localStorage.setItem('newViewDeposit', 'true'); // Ensure localStorage reflects the new view state
        } else {
            // Determine if the new view should be enabled based on configuration
            if (
                this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country].isDefaultView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country].isDefaultView &&
                !window.localStorage.getItem('newViewDeposit')
            ) {
                this.newView = true; // Enable the new view
                window.localStorage.setItem('newViewDeposit', 'true'); // Update localStorage
            } else {
                this.newView = false; // Disable the new view
                window.localStorage.setItem('newViewDeposit', 'false'); // Update localStorage
                this.appComponent.showModalDepositV3 = false; // Close the new modal
                this.appComponent.showModalDepositV2 = true; // Open the old modal
            }
        }

        // Map deposit methods from configuration and prepare additional data
        this.metodos_pago_info = this.config != undefined && this.config.deposists != undefined
            ? this.config.deposists.map(item => ({
                ...item,
                dataText: item.text, // Map text to dataText
                imagen: item.mainimage, // Rename mainimage to imagen
                nombre_franquicia: item.label, // Rename label to nombre_franquicia
                id_franquicia: 'deposit_info', // Add a default id for deposit info
            }))
            : [];

        // Set the default deposit amount if defined in the configuration
        if (
            this.appComponent.config.depositsView !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['default_amount'] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['default_amount'] > 0
        ) {
            this.amountDeposit = this.appComponent.config.depositsView[this.appComponent.country]['default_amount'];
        }

        // Load deposit methods from configuration
        if (this.appComponent.config.depositsView !== undefined &&
        this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
        this.appComponent.config.depositsView[this.appComponent.country]['methods'] !== undefined) {

        this.methods = this.appComponent.config.depositsView[this.appComponent.country]['methods'];
            const configuredMethods = this.appComponent.config.depositsView[this.appComponent.country]['methods'];
            this.methods = Array.isArray(configuredMethods)
                ? configuredMethods.filter((m: any) => !(this._hideCreditCard && m?.id === 'credit_card'))
                : configuredMethods;
        console.log(this.methods);
            this.providerCreditCard();
        if(this.methods.length == 1){
            if(this.methods.some(m => m.id === 'credit_card')) {
                this.methodSelected = this.methods.find(m => m.id === 'credit_card');
                this.handleMethodSelected(this.methodSelected)
                this.step = 'creditCardList';
            }
            else if (this.methods.some(m => m.id === 'deposit_access')) {
                this.methodSelected = this.methods.find(m => m.id === 'deposit_access');
                this.handleMethodSelected(this.methodSelected)
                this.handleGatewaySelected()
                this.step = 0;
            }
        }
    }

        // Load last used franchises if available
        if (
            this.appComponent.config.depositsView !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['lastUsedFranchises'] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['lastUsedFranchises']
        ) {
            this.lastUsedFranchises = this.appComponent.config.depositsView[this.appComponent.country]['lastUsedFranchises'];
        }


        // Load game categories and initialize swiper navigation if defined
        if (
            this.appComponent.config.depositsView !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
            ((this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== '') ||
                (this.appComponent.config.depositsView[this.appComponent.country]['category'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['category'] !== ''))
        ) {
            if (this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== '') {
                this.carouselGames = this.appComponent.config.depositsView[this.appComponent.country]['carousel'];
            } else {
                this.carouselGames = 'getGames2'; // Default to an empty string if no category is defined
            }

            if (this.appComponent.config.depositsView[this.appComponent.country]['category'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['category'] !== '') {
                this.categoryGames = this.appComponent.config.depositsView[this.appComponent.country]['category'];
            } else {
                this.categoryGames = 'all'; // Default to an empty string if no category is defined
            }

            if (this.carouselGames != '' || this.categoryGames !== '') {
                this.getCasinoGames(); // Fetch casino games

                let count = 0;
                const intervalSwiper = setInterval(() => {
                    count++;
                    try {
                        const swiperEl = document.querySelector('.swiper-container' + this.keySlide) as any;
                        const swiperEl2 = document.querySelector('.swiper-container' + this.keySlide2) as any;
                        if (swiperEl || swiperEl2 || count > 10) {
                            clearInterval(intervalSwiper);
                            const buttonNext = document.querySelector('.slideNext' + this.keySlide);
                            const buttonPrev = document.querySelector('.slidePrev' + this.keySlide);
                            const buttonNext2 = document.querySelector('.slideNext' + this.keySlide2);
                            const buttonPrev2 = document.querySelector('.slidePrev' + this.keySlide2);

                            // Add event listeners for swiper navigation buttons
                            buttonPrev?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl?.swiper.slidePrev();
                            });
                            buttonNext?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl?.swiper.slideNext();
                            });
                            buttonPrev2?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl2?.swiper.slidePrev();
                            });
                            buttonNext2?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl2?.swiper.slideNext();
                            });
                        }
                    } catch (e) {
                        console.log(e); // Log any errors
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    this.isLoading = false; // Disable loading state after 2 seconds
                }, 1000);
            }
        } else {
            this.categoryGames = ''; // Default to an empty string if no carousel is defined
            setTimeout(() => {
                this.isLoading = false; // Disable loading state after 2 seconds
            }, 1000);
        }

        // Automatically select the first method if only one is available
        if (this.methods.length === 1) {
            this.methodSelected = this.methods[0];
            // this.amountDeposit = this.methodSelected.amount_min; // Set the deposit amount to the minimu
            this.handleMethodSelected(this.methodSelected); // Handle the selected method
        }

        // Check the URL for specific statuses and update the final status accordingly
        setTimeout(() => {
            if (window.location.href.indexOf('error') != -1) {
                this.finalStatus = 'failed'; // Set status to failed
            }
            if (window.location.href.indexOf('pendiente') != -1) {
                this.finalStatus = 'pending'; // Set status to pending
            }
            if (window.location.href.indexOf('correcto') != -1) {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('transactionId')) {
                    const transactionId = urlParams.get('transactionId');
                    apiService.request('get_lastDeposit', { Id: transactionId }).then((response: any) => {
                        if (response.code == 0 && response.data != undefined && response.data[0] != undefined) {
                            this.depositSuccessData = response.data[0]; // Store deposit success data
                            window.localStorage.setItem('lastDepositAmount', this.depositSuccessData.monto); // Save last deposit amount
                        }
                    });
                }
                this.finalStatus = 'successful'; // Set status to successful

                let count = 0;
                const intervalSwiper = setInterval(() => {
                    count++;
                    try {
                        const swiperEl3 = document.querySelector('.swiper-container' + this.keySlide3) as any;
                        if (swiperEl3 || count > 10) {
                            clearInterval(intervalSwiper);
                            const buttonNext3 = document.querySelector('.slideNext' + this.keySlide3);
                            const buttonPrev3 = document.querySelector('.slidePrev' + this.keySlide3);

                            // Add event listeners for swiper navigation buttons
                            buttonPrev3?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl3?.swiper.slidePrev();
                            });
                            buttonNext3?.addEventListener('click', function(e) {
                                e.preventDefault();
                                swiperEl3?.swiper.slideNext();
                            });
                        }
                    } catch (e) {
                        console.log(e); // Log any errors
                    }
                }, 1000);
            }
        }, 1000);
        this.getPaymentsConfigured(false);
    },
    computed: {
        cardBrandIsAmex(): boolean {
            const b = String(this.currentBrand || '').toLowerCase();
            return b.includes('american') || b.includes('amex');
        },
        displayCardNumber(): string {
            const digits = String(this.cardData?.numberFormatted || '').replace(/\D/g, '');
            const targetLen = this.cardBrandIsAmex ? 15 : 16;
            const padded = (digits + '•'.repeat(targetLen)).slice(0, targetLen);
            return this.cardBrandIsAmex
                ? `${padded.slice(0, 4)} ${padded.slice(4, 10)} ${padded.slice(10, 15)}`
                : `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)} ${padded.slice(12, 16)}`;
        },
        displayExpiry(): string {
            return this.cardData?.expiration || 'MM/AA';
        },
        displayHolder(): string {
            const name = this.appComponent?.session?.nombre || '';
            return name || (this.$t ? this.$t('TU NOMBRE') : 'TU NOMBRE');
        },
        displayCvv(): string {
            const len = this.cvvExpectedLengthFor();
            const digits = String(this.cardData?.cvv || '');
            return digits ? '•'.repeat(Math.min(digits.length, len)) : '•'.repeat(len);
        },
    },
});
</script>

<style scoped>
/* Removes the inner and outer spin buttons from number input fields in WebKit browsers */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none; /* Hides the spin buttons */
    margin: 0; /* Removes any default margin */
}

/* Removes the spin buttons from number input fields in Firefox and other compatible browsers */
input[type="number"] {
    -moz-appearance: textfield; /* Hides the spin buttons in Firefox */
    appearance: textfield; /* Hides the spin buttons in other compatible browsers */
}

/* Customizes the scrollbar for elements with the 'scroll-edit' class */
.scroll-edit::-webkit-scrollbar {
    width: 0px; /* Sets the scrollbar width */
}

/* Styles the scrollbar thumb for elements with the 'scroll-edit' class */
.scroll-edit::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3); /* Sets the thumb color with transparency */
    border-radius: 2px; /* Rounds the corners of the thumb */
}

/* Styles the scrollbar track for elements with the 'scroll-edit' class */
.scroll-edit::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0); /* Sets the track background color with transparency */
}

@media (min-width: 768px) {
    .gridList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr)); /* Creates a responsive grid with minimum width of 8rem */
        grid-template-rows: repeat(auto-fill, minmax(8rem, 1fr));
        place-content: start;
        gap: 15px;
    }
}

/* Grid list styling */
.gridList {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* Creates a responsive grid with minimum width of 8rem */
    place-content: start;
}

.error {
    color: #ff6b6b;
    font-size: 12px;
}
</style>
