<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import methodsDeposit from '@/components/methodsDeposit.vue'; // Importing methodsDeposit component
import MethodsDepositV2 from '@/components/MethodsDepositV2.vue';
import MethodsDepositV3 from '@/components/MethodsDepositV3.vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/ApiService'; // Importing MethodsDepositV2 component

export default defineComponent({
    components: { MethodsDepositV3, MethodsDepositV2, MenuUser, MenuUser3, methodsDeposit }, // Registering components for use in this component
    setup() {
        const router = useRouter(); // Using Vue Router for navigation
        return {
            router, // Exposing router to the template
        };
    },
    data() {
        let config = this.$config(); // Retrieving configuration object
        let emitter = this.$emitter(); // Retrieving event emitter
        let appComponent: any = this.$appComponent; // Retrieving application component reference
        let newView: boolean = false; // Flag to determine if new view is needed
        let finalStatus: string = 'empty'; // Status of the deposit process
        let gamesList: any[] = []; // List of games to be displayed in the deposit modal
        let depositSuccessData = { id: '', monto: '', metodo: '', tienda: '', fecha_hora: '', saldo_total: '' }; // Data for successful deposit
        const keySlide = Math.random().toString(36).substring(2, 15); // Generating a unique key for swiper slides
        return {
            config, // Exposing config to the template
            emitter, // Exposing emitter to the template
            appComponent, // Exposing appComponent to the template
            newView, // Exposing newView to the template
            finalStatus, // Exposing finalStatus to the template
            gamesList, // Exposing gamesList to the template
            depositSuccessData, // Exposing depositSuccessData to the template
            keySlide, // Exposing keySlide to the template
        };
    },
    mounted() {
        // Check if 'newView' is set in localStorage
        if (
            this.appComponent.config.depositsView !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
            this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
            window.localStorage.getItem('newViewDeposit') == 'true'
        ) {
            this.newView = true;
            window.localStorage.setItem('newViewDeposit', 'true'); // Ensure localStorage reflects the newView state
            setTimeout(() => {
                // Check for error in URL and display appropriate modal
                if (window.location.href.indexOf('error') != -1) {
                    this.finalStatus = 'failed'; // Set final status to failed
                } else if (window.location.href.indexOf('pendiente') != -1) {
                    this.finalStatus = 'pending'; // Set final status to pending
                } else if (window.location.href.indexOf('correcto') != -1) {
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
                                action: carouselGames,
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
                                    const swiperEl3 = document.querySelector(
                                        '.swiper-container' + this.keySlide,
                                    ) as any;
                                    if (swiperEl3 || count > 10) {
                                        clearInterval(intervalSwiper);
                                        const buttonNext3 = document.querySelector(
                                            '.slideNext' + this.keySlide,
                                        );
                                        const buttonPrev3 = document.querySelector(
                                            '.slidePrev' + this.keySlide,
                                        );
                                        // Event listeners for navigation buttons
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
                                    console.log(e);
                                }
                            }, 1000);
                        }
                    }

                    this.finalStatus = 'successful'; // Set final status to successful
                } else {
                    this.router.push('/home'); // Redirect to home if newView is true
                    this.appComponent.showModalDepositV3 = true; // Show new deposit modal
                }
            }, 500);
        } else {
            // Check various conditions to determine if newView should be set to true
            if (
                this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                (
                    (this.appComponent.config.depositsView[this.appComponent.country]['switch'] === false &&
                     this.appComponent.config.depositsView[this.appComponent.country].isDefaultView === true)
                    ||
                    (
                        this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                        this.appComponent.config.depositsView[this.appComponent.country].isDefaultView !== undefined &&
                        this.appComponent.config.depositsView[this.appComponent.country].isDefaultView &&
                        !window.localStorage.getItem('newViewDeposit')
                    )
                )
            ) {
                window.localStorage.removeItem('newViewDeposit');
                this.newView = true; // Set newView to true
                window.localStorage.setItem('newViewDeposit', 'true'); // Update localStorage
                this.router.push('/home'); // Redirect to home if newView is true
                this.appComponent.showModalDepositV3 = true; // Show new deposit modal
            } else {
                this.newView = false; // Set newView to false
                window.localStorage.setItem('newViewDeposit', 'false'); // Update localStorage
            }
        }
    },
    methods: {
        handleChangeWithdrawalsView() {
            if (this.newView) {
                window.localStorage.setItem('newViewDeposit', 'false'); // Update local storage for view state
                this.appComponent.gAnalytics('deposit_old', 'new'); // Track view change
            } else {
                window.localStorage.setItem('newViewDeposit', 'true'); // Update local storage for view state
                this.appComponent.gAnalytics('deposit_new', 'new'); // Track view change
                this.router.push('/home');
                this.appComponent.showModalDepositV3 = true; // Show new deposit modal
            }
        },
    },
});
</script>

<template>
    <!-- Header section for layout not equal to 3 -->
    <div
        v-if="config.layout != 3 && config.layout != 7"
        class="int-header h-[65px] bg-base-200 absolute w-full"
    ></div>
    <!-- Header section for layout equal to 3 -->
    <div
        v-if="config.layout != undefined && config.layout == 3"
        class="hidden int-header h-40 bg-gradient-to-b from-base-300 from-90% to-neutral-content to-10% absolute z-1 w-full"
    ></div>
    <!-- Header section for layout not equal to 3 -->
    <div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
    <!-- Main content area for logged-in users -->
    <div
        class="Framework InfoPage mi-cuenta"
        v-if="appComponent.session.logueado"
    >
        <div class="Box TextBox NoHeadBox InfoBox">
            <div class="BoxContent InfoBoxContent">
                <!-- Active page title section -->
                <div
                    class="Container ActivePageTitle"
                    :class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto flex justify-between items-center'
							: 'ActivePageTitle2'
					"
                >
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

                        >{{ $t('Depósitos') }}</span
                        >
					</span>

                    <div
                        v-if="
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
							].on
						"
                        class="form-control"
                    >
                        <!-- Label for the view switch -->
                        <label class="label cursor-pointer">
                            <!-- Label text with an image -->
                            <span
                                class="label-text relative text-neutral text-sm font-bold w-14 leading-4"
                            >{{ $t('Nueva visual')
                                }}<img
                                    src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
                                    alt=""
                                    class="absolute -top-1 right-1"
                                /></span>
                            <!-- Switch control for toggling views -->
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
                                />
                                <!-- Images for the switch states -->
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
                </div>
                <!-- Menu and content area -->
                <div
                    class="row justify-content-center w-full mx-auto ActivePageTitle2"
                >
                    <MenuUser
                        v-if="config.layout != 3"
                        :page="'deposito'"
                        :MENU_ID="'3'"
                    />
                    <MenuUser3
                        v-if="config.layout != undefined && config.layout == 3"
                        :page="'deposit'"
                        :MENU_ID="'3'"
                    />
                    <div
                        class="BoxContent TermsContentBox HelpContentBox w-full flex flex-col justify-center items-center"
                        :class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
                    >
                        <methodsDeposit v-if="!newView" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Teleport v-if="finalStatus !== 'empty'" to="body">
        <dialog class="modal in w-screen h-screen bg-base-content bg-opacity-80 backdrop-blur-sm">
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
                <RouterLink
                    to="/home"
                    class="absolute right-3 top-3 hover:scale-125 z-50"
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

                <div v-if="finalStatus === 'successful'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-start md:justify-center items-center md:gap-4 py-8 z-10">
                    <div v-if="gamesList.length > 0"
                         class="w-full md:max-w-[214px] h-full md:max-h-[207px] flex flex-col justify-start items-center gap-10">
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
                                    appComponent.showModalDepositV3 = false;
                                }"
                            >
                                {{ $t('Participar en torneo') }}
                            </RouterLink>
                            <RouterLink
                                to="/home"
                                class="flex justify-center items-center py-2 px-6 rounded-full text-[14px] md:text-base text-primary-focus bg-primary-focus/25 backdrop-blur-sm backdrop-opacity-25 hover:scale-105 hover:bg-primary/40 transition-all duration-300 ease-in-out"
                                @click="() => {
                                    finalStatus = 'empty';
                                    appComponent.showModalDepositV3 = true;
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

                <div v-else-if="finalStatus === 'pending'"
                     class="relative w-full h-full flex flex-col md:flex-row justify-around items-center p-4 z-10">

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

                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedImageMobile'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['failedImageMobile']"
                        alt="failed-image-mobile"
                        class="w-full max-w-[200px] md:hidden h-full max-h-[212px] object-contain object-center">
                    <img
                        v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedImageDesktop'] !== undefined"
                        :src="appComponent.config.depositsView[appComponent.country]['failedImageDesktop']"
                        alt="failed-image-desktop"
                        class="w-full max-w-[326px] hidden md:flex h-full max-h-[510px] object-contain object-center -ml-4 -mr-8">

                    <div
                        class="w-full h-full md:max-h-[325px] max-w-[95%] md:max-w-[55%] flex flex-col justify-around items-center">
                        <div class="w-full flex flex-col justify-center items-center gap-1">
                            <h3 class="text-lg md:text-2xl text-center font-bold text-neutral">
                                {{ $t('¡Depósito fallido!') }}</h3>
                            <span
                                class="text-sm md:text-lg text-center font-light text-neutral">{{ $t('La transacción no ha finalizado con éxito')
                                }}</span>
                        </div>
                        <div
                            class="relative flex flex-col justify-center items-center gap-6 p-5 rounded-xl bg-gradient-to-b from-base-100/25 to-base-content/10 bg-opacity-30 shadow-inner">
                            <img
                                v-if="appComponent.config.depositsView !== undefined && appComponent.config.depositsView[appComponent.country] !== undefined && appComponent.config.depositsView[appComponent.country]['failedBackgroundTextImage'] !== undefined"
                                :src="appComponent.config.depositsView[appComponent.country]['failedBackgroundTextImage']"
                                alt="background-text"
                                class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover object-center opacity-75">
                            <p class="text-base md:text-lg font-light text-neutral  text-justify">
                                {{ $t('Lamentablemente, tu depósito no pudo completarse. Por favor, revisa los detalles de tu transacción e inténtalo nuevamente. Si el problema persiste, ingresa a nuestro chat de soporte para recibir asistencia.')
                                }}</p>
                        </div>

                        <div class="w-full flex justify-center items-center gap-4">
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
            </div>
        </dialog>
    </Teleport>
</template>

<style scoped>
.text-qr {
    font-weight: 300; /* Styling for QR text */
}

.button-ret {
    margin-right: 5px; /* Margin for return button */
}

.button-ret.dep.cryp a {
    background: white; /* Background for crypto return button */
    display: block; /* Display as block */
    height: 100%; /* Full height */
    width: 100%; /* Full width */
    overflow: hidden; /* Hide overflow */
}

.button-ret a {
    background: #f9d000; /* Background color for button */
    padding: 4px 8px; /* Padding for button */
    border-radius: 5px; /* Rounded corners */
    color: black; /* Text color */
    font-weight: bold; /* Bold text */
}

.button-ret {
    margin-top: 8px; /* Margin on top for button */
}

.button-ret.dep {
    display: inline-block; /* Inline block display for return button */
}

.button-ret.dep.cryp {
    display: inline-block; /* Inline block display for crypto return button */
    width: 210px; /* Fixed width */
    height: 91px; /* Fixed height */
    text-align: center; /* Center text */
}

.button-ret.dep.cryp .img {
    width: 78px; /* Width for image */
    display: inline-block; /* Inline block display */
    vertical-align: top; /* Align to top */
    border-radius: 100%; /* Circular image */
    overflow: hidden; /* Hide overflow */
    margin-right: 10px; /* Margin on right */
}

.button-ret.dep.cryp span.name {
    font-size: 13px; /* Font size for name */
    display: inline-block; /* Inline block display */
    width: calc(100% - 88px); /* Dynamic width */
    padding: 5px 10px; /* Padding for name */
    text-align: left; /* Left align text */
    height: 100%; /* Full height */
    border-left: 1px solid #9d9d9d; /* Left border */
    text-transform: uppercase; /* Uppercase text */
    font-size: 12px; /* Font size for name */
}

.cant_dep {
    font-size: 13px; /* Font size for deposit amount */
    display: none; /* Hidden by default */
    width: calc(100% - 88px); /* Dynamic width */
    padding: 5px 10px; /* Padding for deposit amount */
    text-align: left; /* Left align text */
    height: 100%; /* Full height */
    border-left: 1px solid #9d9d9d; /* Left border */
}

.button-ret.dep.cryp a:hover .cant_dep {
    display: inline-block; /* Show deposit amount on hover */
}

.button-ret.dep.cryp a:hover span.name {
    display: none; /* Hide name on hover */
}

.button-ret.dep.cryp input {
    border-radius: 15px 15px 0 0; /* Rounded top corners */
    height: 35px; /* Fixed height */
    width: 100%; /* Full width */
    font-weight: bold; /* Bold text */
    padding-left: 7px; /* Padding on left */
    color: #888888; /* Text color */
}

.button-ret.dep.cryp a {
    padding: 6px 8px; /* Padding for button */
}

.button-ret.dep.cryp a:hover {
    background: #cccccc; /* Background color on hover */
}

.button-ret.dep.cryp button:focus {
    outline: none; /* Remove outline on focus */
}

.button-ret.dep.cryp button {
    height: 36px; /* Fixed height for button */
    width: 100%; /* Full width */
    border-radius: 0 0 15px 15px; /* Rounded bottom corners */
    border: none; /* No border */
    background: -webkit-linear-gradient(
        90deg,
        #ad7d29 1%,
        #cc983e 48%,
        #ecc263
    ) !important; /* Gradient background */
    font-weight: bold; /* Bold text */
    color: white; /* Text color */
}

@media (max-width: 810px) {
    .button-ret.dep.cryp {
        width: 100%; /* Full width on small screens */
    }
}

.tlt-crypto {
    text-align: center; /* Center text */
    border-bottom: 1px solid black; /* Bottom border */
    margin-bottom: 20px; /* Margin below */
}

.tlt-crypto img {
    background: white; /* Background for image */
    padding: 5px 5px; /* Padding for image */
    position: relative; /* Relative positioning */
    margin-bottom: -31px; /* Negative margin below */
    width: 170px; /* Fixed width */
}

.selected-item {
    margin: 20px 0; /* Margin above and below */
    text-align: center; /* Center text */
}

.selected-item p {
    font-size: 18px; /* Font size for paragraph */
}

.selected-item p span {
    font-weight: bold; /* Bold text for span */
}

.dropdown {
    margin: 0; /* No margin */
    width: 100%; /* Full width */
    position: relative; /* Relative positioning */
}

.dropdown.active .selLabel:after {
    content: '\25B2'; /* Arrow indicator for active dropdown */
}

.dropdown.active .dropdown-list li {
    position: relative; /* Relative positioning for list items */
}

.dropdown > span {
    width: 100%; /* Full width */
    height: 60px; /* Fixed height */
    line-height: 60px; /* Center text vertically */
    color: #fff; /* Text color */
    font-size: 13px; /* Font size */
    background: #f1ab00; /* Background color */
    display: block; /* Display as block */
    padding: 0 50px 0 20px; /* Padding */
    position: relative; /* Relative positioning */
    z-index: 9999; /* High z-index */
    cursor: pointer; /* Pointer cursor */
}

.dropdown > span:after {
    content: '\25BC'; /* Arrow indicator for dropdown */
    position: absolute; /* Absolute positioning */
    right: 0px; /* Align to right */
    top: 15%; /* Position from top */
    width: 50px; /* Fixed width */
    text-align: center; /* Center text */
    font-size: 12px; /* Font size */
    padding: 10px; /* Padding */
    height: 70%; /* Fixed height */
    line-height: 24px; /* Center text vertically */
    border-left: 1px solid white; /* Left border */
}

.dropdown > span:active:after {
    content: '\25B2'; /* Change arrow on active */
}

.dropdown-list {
    position: absolute; /* Absolute positioning */
    top: 0px; /* Align to top */
    width: 100%; /* Full width */
    max-height: 80vh; /* Max height */
    overflow: auto; /* Scroll if overflow */
}

.dropdown-list li {
    display: block; /* Display as block */
    list-style: none; /* No list style */
    left: 0; /* Align to left */
    opacity: 1; /* Full opacity */
    -webkit-transition: -webkit-transform 300ms ease; /* Transition for transform */
    transition: -webkit-transform 300ms ease; /* Transition for transform */
    transition: transform 300ms ease; /* Transition for transform */
    transition: transform 300ms ease,
    -webkit-transform 300ms ease; /* Combined transition */
    position: absolute; /* Absolute positioning */
    top: 0; /* Align to top */
    width: 100%; /* Full width */
    background-color: white; /* Background color */
}

.dropdown-list li span {
    -webkit-backface-visibility: hidden; /* Hide backface */
    -webkit-touch-callout: none; /* Disable touch callout */
    -webkit-user-select: none; /* Disable user select */
    user-select: none; /* Disable user select */
    width: 100%; /* Full width */
    font-size: 13px; /* Font size */
    line-height: 60px; /* Center text vertically */
    padding: 0px 20px; /* Padding */
    display: block; /* Display as block */
    color: black; /* Text color */
    cursor: pointer; /* Pointer cursor */
}

ul.dropdown-list img {
    width: 28px; /* Fixed width for images */
    height: auto; /* Auto height */
    margin-right: 10px; /* Margin on right */
    display: inline-block; /* Inline block display */
}

.c-select {
    position: relative; /* Relative positioning */
    z-index: 9; /* High z-index */
}

.text-qr {
    font-weight: 300; /* Styling for QR text */
}

.card-c .cardT {
    background: linear-gradient(
        0deg,
        rgb(216 216 216) 0%,
        rgb(234 234 234) 100%
    ); /* Gradient background for card */
    border: 3px solid white; /* White border */
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 6px; /* Shadow effect */
}

button#accion_depositarvalor,
.add-card {
    background: linear-gradient(
        0deg,
        rgb(0 124 29) 0%,
        rgb(0 182 64) 100%
    ); /* Gradient background for buttons */
    border: none; /* No border */
}

.deposit-c,
.add-card-c {
    background: linear-gradient(
        0deg,
        rgb(0 182 64) 0%,
        rgb(0 124 29) 100%
    ); /* Gradient background for deposit buttons */
    padding: 2px; /* Padding */
    border-radius: 9px; /* Rounded corners */
    margin-left: 10px; /* Margin on left */
}

.cardT input {
    background: linear-gradient(
        0deg,
        rgb(226 226 226) 0%,
        rgb(255 255 255) 100%
    ); /* Gradient background for input */
    border: 2px solid white; /* White border */
    font-weight: bold; /* Bold text */
}

li#fldCurrency {
    font-weight: bold; /* Bold text for currency field */
    margin-bottom: 15px; /* Margin below */
}

button.add-card.btn.w-30.text-neutral::before {
    content: ''; /* Before content for button */
    background: url(/assets/images/add_card.svg); /* Background image for button */
    width: 45px; /* Fixed width */
    height: 45px; /* Fixed height */
    position: absolute; /* Absolute positioning */
    background-size: cover; /* Cover background */
    background-repeat: no-repeat; /* No repeat */
    margin-right: -84px; /* Negative margin on right */
    margin-top: 35px; /* Margin on top */
}

ul.pasarela li img {
    max-height: 100%; /* Max height for images */
    width: auto; /* Auto width */
    max-width: 230px; /* Max width */
    margin: auto; /* Center align */
}

ul.pasarela li {
    background: #e3e3e3; /* Background color for list items */
    margin: 8px 0; /* Margin above and below */
    height: 80px; /* Fixed height */
    text-align: center; /* Center text */
    padding: 15px; /* Padding */
}

.modal-metodos {
    background: #ffffffe0; /* Background color for modal */
    width: 100%; /* Full width */
    position: absolute; /* Absolute positioning */
    left: 0; /* Align to left */
    top: 0; /* Align to top */
    height: 100%; /* Full height */
    z-index: 9; /* High z-index */
    padding: 20px; /* Padding */
    backdrop-filter: blur(10px); /* Blur effect for backdrop */
}

button.go_back {
    width: 100%; /* Full width */
    color: white; /* Text color */
    background: #0a2d61; /* Background color */
    margin-bottom: 10px; /* Margin below */
    padding: 10px 20px; /* Padding */
    font-weight: bold; /* Bold text */
    text-align: left; /* Left align text */
    border-radius: 30px; /* Rounded corners */
}

.Framework.InfoPage {
    min-height: 100vh; /* Minimum height for the framework */
}

.text-qr {
    font-weight: 300; /* Styling for QR text */
}

span.slash {
    position: absolute; /* Absolute positioning */
    font-size: 17px; /* Font size */
    margin: 10px 0 0 3px; /* Margin */
    color: black; /* Text color */
}

.my-input {
    font-size: 20px; /* Font size for input */
    margin: auto; /* Center align */
    display: inline-block; /* Inline block display */
    max-width: 33px; /* Max width */
    border-radius: 0 !important; /* No border radius */
    text-align: center; /* Center text */
    margin: 2px; /* Margin */
}

.my-input-num-card {
    letter-spacing: 2px; /* Letter spacing for card number */
    text-align: center; /* Center text */
}

.digits {
    text-align: center; /* Center text */
}

.my-label {
    text-align: center; /* Center text */
}

@media (max-width: 800px) {
    .left_side {
        display: none; /* Hide left side on small screens */
    }

    .right_side {
        width: 100%; /* Full width for right side */
        border-top-left-radius: 9px; /* Rounded top left corner */
        border-bottom-left-radius: 9px; /* Rounded bottom left corner */
    }
}

.warning {
    border: 1px solid red !important; /* Red border for warning */
}

.cardT {
    background: #d4d4d4; /* Background color for card */
    border-radius: 15px; /* Rounded corners */
    border: none; /* No border */
}

.image-background {
    background: black; /* Black background */
}

.dots span {
    height: 5px; /* Height for dots */
    width: 5px; /* Width for dots */
    margin-right: 3px; /* Margin on right */
    margin-bottom: 2px !important; /* Margin below */
    background-color: rgb(255, 255, 255); /* White background for dots */
    border-radius: 50%; /* Circular dots */
    display: inline-block; /* Inline block display */
}

.number {
    font-size: 14px; /* Font size for number */
}

.cardAdd h5 {
    font-weight: bold; /* Bold text for heading */
    font-size: 22px !important; /* Font size for heading */
    color: #979797; /* Text color */
}

.cardAdd span {
    font-weight: bold; /* Bold text for span */
    font-size: 18px !important; /* Font size for span */
    color: #979797; /* Text color */
}

button#accion_depositarvalor,
.add-card {
    background: linear-gradient(
        0deg,
        rgb(0 124 29) 0%,
        rgb(0 182 64) 100%
    ); /* Gradient background for buttons */
    border: none; /* No border */
}

.deposit-c,
.add-card-c {
    background: linear-gradient(
        0deg,
        rgb(0 182 64) 0%,
        rgb(0 124 29) 100%
    ); /* Gradient background for deposit buttons */
    padding: 2px; /* Padding */
    border-radius: 9px; /* Rounded corners */
    margin-left: 10px; /* Margin on left */
}

li#fldCurrency {
    font-weight: bold; /* Bold text for currency field */
    margin-bottom: 15px; /* Margin below */
}

.card-c .card_ {
    background: linear-gradient(
        0deg,
        rgb(216 216 216) 0%,
        rgb(234 234 234) 100%
    ); /* Gradient background for card */
    border: 3px solid white; /* White border */
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 6px; /* Shadow effect */
}

button.add-card.btn.w-30.text-neutral::before {
    content: ''; /* Before content for button */
    background: url(/assets/images/add_card.svg); /* Background image for button */
    width: 45px; /* Fixed width */
    height: 45px; /* Fixed height */
    position: absolute; /* Absolute positioning */
    background-size: cover; /* Cover background */
    background-repeat: no-repeat; /* No repeat */
    margin-right: -84px; /* Negative margin on right */
    margin-top: 35px; /* Margin on top */
}

.card-img {
    background: url(https://images.virtualsoft.tech/m/msjT1650494523.png); /* Background image for card */
    background-repeat: no-repeat; /* No repeat */
    background-size: contain; /* Contain background */
    height: 205px; /* Fixed height */
}

.my-input-num-card,
input.input_expiry,
input.input_cvv {
    text-align: center; /* Center text */
    border: 2px solid black; /* Black border */
    border-radius: 55px; /* Rounded corners */
}

.tittle-c {
    border-bottom: 2px solid black; /* Bottom border for title */
    margin-bottom: 12px; /* Margin below */
}
</style>

<!-- FILE DOCUMENTED -->
