<script lang="ts">
import { defineComponent, toHandlers } from 'vue';

import { register } from 'swiper/element/bundle';
import apiService from '@/services/ApiService';
register(); // Registering Swiper elements for use in the component

/**
 * Component definition for the Thank You Deposit page.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * Initializes appComponent and config from the Vue instance.
	 */
	data: function () {
		let appComponent: any = this.$appComponent; // Reference to the application component
		let config = this.$config(); // Fetches the configuration
        let finalStatus = 'empty'; // Variable to track the final status of the deposit
        let gamesList = []; // List of games to be displayed in the modal
        let keySlide = Math.floor(Math.random() * 1000); // Random key for the slide component
        let depositSuccessData = {
            monto: '',
            metodo: '',
            tienda: '',
            id: '',
            fecha_hora: '',
            saldo_total: '',
        }; // Data for successful deposit
		return {
			config,
			appComponent,
            finalStatus,
            gamesList,
            keySlide,
            depositSuccessData,
		};
	},
	/**
	 * Lifecycle hook called after the component is mounted.
	 * Sets up the modal properties and triggers Google Analytics event.
	 */
	mounted() {
        if (
            (this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                window.localStorage.getItem('newViewDeposit') == 'true') || (
                !window.localStorage.getItem('newViewDeposit') &&
                this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView']
            )
        ) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('transactionId')) {
                const transactionId = urlParams.get('transactionId');
                apiService.request('get_lastDeposit', { Id: transactionId }).then((response: any) => {
                    if (response.code == 0 && response.data != undefined && response.data[0] != undefined) {
                        this.depositSuccessData = response.data[0]; // Set deposit success data
                        window.localStorage.setItem('lastDepositAmount', this.depositSuccessData.monto); // Store last deposit amount
                    }
                });
            }

            if (
                this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                ((this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== '') ||
                    (this.appComponent.config.depositsView[this.appComponent.country]['category'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['category'] !== ''))
            ) {
                let carouselGames = 'getGames2';
                let categoryGames = 'all';

                if (this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['carousel'] !== '') {
                    carouselGames = this.appComponent.config.depositsView[this.appComponent.country]['carousel'];
                }

                if (this.appComponent.config.depositsView[this.appComponent.country]['category'] !== undefined && this.appComponent.config.depositsView[this.appComponent.country]['category'] !== '') {
                    categoryGames = this.appComponent.config.depositsView[this.appComponent.country]['category'];
                }

                if (carouselGames !== '' || categoryGames !== '') {
                    let optionsGames2 = {
                        action: carouselGames, // Action to fetch games
                        partner_id: this.appComponent.partnerG,
                        offset: 0,
                        typelobby: 0,
                        limit: 20,
                        country: this.appComponent.country,
                        isMobile: this.appComponent.mobile == '1',
                        category: categoryGames,
                        testUser: false,
                        userId: this.appComponent.session.id_user, // User ID from session
                    };
                    if (this.appComponent.session.logueado) {
                        optionsGames2.testUser = this.appComponent.session.user_test == 1;
                    }
                    try {
                        apiService
                            .requestGet(
                                this.appComponent.config.urlVirtualplayPython
                                    ? this.appComponent.config.urlVirtualplayPython
                                    : 'https://gameservice.virtualsoft.tech/cms/products',
                                optionsGames2,
                            )
                            .then((response: any) => {
                                this.gamesList = response.data.games;
                            });
                    } catch (e) {
                        console.log(e);
                    }

                    let count = 0;
                    const intervalSwiper = setInterval(() => {
                        count++;
                        try {
                            const swiperEl = document.querySelector(
                                '.swiper-container' + this.keySlide,
                            ) as any;
                            if (swiperEl || count > 10) {
                                clearInterval(intervalSwiper);
                                const buttonNext = document.querySelector(
                                    '.slideNext' + this.keySlide,
                                );
                                const buttonPrev = document.querySelector(
                                    '.slidePrev' + this.keySlide,
                                );
                                // Event listeners for navigation buttons
                                buttonPrev?.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    swiperEl?.swiper.slidePrev();
                                });
                                buttonNext?.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    swiperEl?.swiper.slideNext();
                                });
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }, 1000);
                }
            }

            this.finalStatus = 'successful'; // Set final status to pending

        } else {
            this.$nextTick(() => {
                this.appComponent.modal = {
                    showModal: 'notification', // Modal type
                    titleModal: this.$t('Mensaje'), // Modal title
                    messageModal: this.$t(
                        'El deposito fue enviado correctamente, en los proximos minutos se vera reflejado en el saldo.'
                    ), // Modal message
                    buttonModal: this.$t('Aceptar'), // Modal button text
                    orderModal: 'closeModal', // Modal close action
                };
            });
        }

		this.appComponent.gAnalytics('deposit_success'); // Track deposit success event
	},
});
</script>

<template>
	<!-- Main container for the Thank You Deposit page -->
	<div v-if="finalStatus === 'empty'"
		class="container-general h-[1000px] lg:h-screen lg:min-h-[700px] lg:max-h-[800px] bg-cover bg-no-repeat bg-center flex flex-col overflow-hidden"
		:style="[
			appComponent.config.depositos != undefined &&
			appComponent.config.depositos.ThankYouDeposit != undefined &&
			appComponent.config.depositos.ThankYouDeposit[
				appComponent.country
			] != undefined &&
			appComponent.config.depositos.ThankYouDeposit[appComponent.country]
				.imageBg != undefined
				? {
						backgroundImage:
							'url(' +
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							].imageBg +
							')',
					}
				: {
						backgroundImage:
							'url(' +
							'https://images.virtualsoft.tech/m/msj0212T1750269067.png' +
							')',
					},
		]"
	>
		<!-- Container for text and buttons -->
		<div
			class="text-container flex w-full lg:w-3/5 h-full lg:justify-center items-center lg:pl-60 flex-col gap-y-8 lg:gap-y-16 pt-0 lg:pt-[108px] content-center"
		>
			<!-- Thank you message header -->
			<h4
				class="text-white text-3xl lg:text-5xl text-center p-8 lg:p-0 z-20"
			>
				{{ $t('¡Gracias por depositar!') }}
			</h4>
			<!-- Navigation button to home -->
			<RouterLink to="/home"
				><button
					class="bg-primary-content text-white btn text-xl hover:scale-105 border-none rounded-full uppercase px-8 font-light"
					to="/home"
				>
					{{ $t('Continúa navegando') }}
				</button></RouterLink
			>
			<!-- Conditional description paragraph -->
			<p
				v-if="
					appComponent.config.depositos != undefined &&
					appComponent.config.depositos.ThankYouDeposit !=
						undefined &&
					appComponent.config.depositos.ThankYouDeposit[
						appComponent.country
					] != undefined &&
					appComponent.config.depositos.ThankYouDeposit[
						appComponent.country
					].description != undefined
				"
				class="text-white break-words text-xs text-center p-9 z-20"
			>
				{{
					$t(
						appComponent.config.depositos.ThankYouDeposit[
							appComponent.country
						].description
					)
				}}
			</p>
			<!-- Fallback description paragraph -->
			<p
				v-else
				class="text-white break-words text-xs text-center p-9 z-20"
			>
				{{
					$t(
						'Este sitio web esta operado por VS Network Solutions N.V., empresa registrada el 20 de septiembre de 2021 bajo las leyes de Curacao, con el número de registro 158663 y bajo la licencia No 365/JAZ sub-licencia GLH-OCCHKTW0711042021 otorgada por el gobierno de curacao el 4 de noviembre de 2021. Agente de Pagos VS Prosystem Limited, empresa registrada el 29 de noviembre de 2021 bajo las leyes de Chipre, con numero de registro 428414.'
					)
				}}
			</p>
		</div>
		<!-- Footer container -->
		<div
			class="footer-container w-full bg-secondary/90 h-1/4 relative flex justify-start items-center"
		>
			<!-- Footer content -->
			<div
				class="w-full flex flex-col md:flex-row justify-center lg:justify-start lg:pl-28 xl:pl-72 items-center gap-y-8 md:gap-y-0 gap-x-5 lg:gap-x-24"
			>
				<div class="flex justify-center items-center flex-col gap-y-3">
					<!-- Footer title -->
					<h5
						class="text-primary-content text-sm font-bold text-center"
					>
						{{ $t('Continúa navegando') }}
					</h5>
					<!-- Conditional menu links -->
					<div
						v-if="
							appComponent.config.depositos != undefined &&
							appComponent.config.depositos.ThankYouDeposit !=
								undefined &&
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							] != undefined &&
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							].menu != undefined &&
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							].menu.length > 0
						"
						class="text-white text-center text-xs p-2 md:max-w-[185px] flex flex-col justify-center items-center gap-y-2 z-20"
					>
						<RouterLink
							v-for="item in appComponent.config.depositos
								.ThankYouDeposit[appComponent.country].menu"
							class="hover:text-primary-content"
							:to="item.url"
							>{{ item.text }}</RouterLink
						><br />
					</div>
					<!-- Fallback links if no menu is available -->
					<div
						v-else
						class="text-white text-center text-xs p-2 md:max-w-[185px] z-10 leading-5"
					>
						<RouterLink
							class="hover:text-primary-content"
							to="/politica-de-privacidad/politica-de-privacidad"
							>{{ $t('Política de Privacidad') }}</RouterLink
						><br />
						<RouterLink
							class="hover:text-primary-content"
							to="/juego-responsable"
							>{{ $t('Juego Responsable') }}</RouterLink
						><br />
						<RouterLink
							class="hover:text-primary-content"
							to="/terminosycondiciones"
							>{{ $t('Términos y Condiciones') }}</RouterLink
						><br />
						<RouterLink
							class="hover:text-primary-content"
							to="/terminosycondiciones/recargas-retiros-bonos"
							>{{
								$t('Recargas, Retiros y Promociones')
							}}</RouterLink
						><br />
					</div>
				</div>
			</div>
			<!-- Image displayed in the footer -->
			<img
				:src="
					appComponent.config.depositos.ThankYouDeposit[
						appComponent.country
					].image ||
					'https://images.virtualsoft.tech/m/msjT1683212061.png'
				"
				alt=""
				width="550"
				height="500"
				class="w-[400px] lg:max-w-[600px] lg:w-[500px] xl:w-[600px] absolute bottom-[194px] lg:bottom-[-5px] right-[6%] md:right-[24%] lg:right-[6%]"
			/>
		</div>
		<!-- Gradient background at the bottom -->
		<div
			class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content z-10"
		></div>
	</div>

    <Teleport v-else-if="finalStatus === 'successful'" to="body">
        <dialog class="modal in w-screen h-screen bg-base-content bg-opacity-90 backdrop-blur-sm">
            <!-- Dialog container with specific dimensions and styles -->
            <div
                class="modal-v3 relative rounded-box w-full h-full flex flex-col justify-start items-center min-w-[340px] max-w-[756px] min-h-[542px] max-h-[542px] sm:max-h-[524px] bg-base-200 bg-opacity-90 border-2 border-accent-focus/10"
            >
                <img
                    v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['backgroundGradient'] !== undefined"
                    :src="appComponent.config.depositsView[appComponent.country]['backgroundGradient']"
                    alt="background-modal"
                    class="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-box opacity-25 z-1" />
                <!-- Close button for the dialog -->
                <button
                    class="absolute right-3 top-3 hover:scale-125 z-50"
                    @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = false;
                                }"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <div
                     class="relative w-full h-full flex flex-col md:flex-row justify-center items-center md:gap-4 py-8 z-10">
                    <div v-if="gamesList.length > 0"
                         class="hidden w-full md:max-w-[214px] h-full md:max-h-[207px] md:flex flex-col justify-start items-center gap-10">
                        <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                            <div
                                class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-gradient-to-br from-[#AD01A450] to-[#0E012E] from-10% bg-opacity-25 backdrop-blur-sm backdrop-opacity-25 aspect-square">
                                <!-- Swiper container for the game slides -->
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
                                                game.icon_2 !== undefined &&
                                                game.icon_2 !== null &&
                                                game.icon_2 !== ''
                                            "
                                                :src="game.icon_2"
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
                            <RouterLink
                                to="/torneos"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] text-base-content font-semibold bg-primary-focus hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out"
                                @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = false
                                }"
                            >
                                {{ $t('Participar en torneo') }}
                            </RouterLink>
                            <RouterLink
                                to="/gestion/deposito"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-primary-focus bg-primary-focus/25 backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = false
                                }"
                            >
                                {{ $t('Nueva recarga') }}
                            </RouterLink>
                        </div>
                    </div>

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
            </div>
        </dialog>
    </Teleport>
</template>

<!-- FILE DOCUMENTED -->
