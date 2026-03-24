<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing the user menu component
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import router from '@/router'; // Importing the router for navigation
import AppShopBonuses from '../Config/ShopBonuses.vue'; // Importing the shop bonuses configuration component
import InfoCards from '@/components/InfoCards.vue'; // Importing the info cards component
import LiveCasino from '@/views/Products/LiveCasino.vue'; // Importing the live casino view component
import VideoPlayer from '@/components/VideoPlayer.vue'; // Importing the video player component
import MyLoyaltyV2 from '@/views/Help/MyLoyaltyV2.vue';
import MyLoyaltyV4 from '@/views/Help/MyLoyaltyV4.vue';
export default defineComponent({
    components: {
        VideoPlayer, // Registering the VideoPlayer component
        LiveCasino, // Registering the LiveCasino component
        InfoCards, // Registering the InfoCards component
        MenuUser, // Registering the MenuUser component
        AppShopBonuses, // Registering the AppShopBonuses component
        MyLoyaltyV2, // Registering the view 2 component
        MyLoyaltyV4, // Registering the view 4 component
    },
    data: function() {
        // Defining the component's reactive data properties
        let config = this.$config(); // Configuration object
        let emitter = this.$emitter(); // Event emitter for communication
        let appComponent: any = this.$appComponent; // Reference to the app component
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let loyalty: any = {}; // Object to hold loyalty information
        let mobile: boolean = false; // Flag for mobile view
        let titleModal: string = ''; // Title for modal dialogs
        let descriptionModal: string = ''; // Description for modal dialogs
        let baseUrlFx: string = ''; // Base URL for external resources
        let storeOpen: boolean = false; // Flag to indicate if the store is open
        let menuAction: number = 1; // Current action for the menu
        let videoSmall: any = undefined; // URL for small video
        let slider: any = undefined; // Slider component reference
        let loadbanners: number = 0; // Counter for loading banners
        let sliders: string = ''; // String to hold slider data
        let device: string = ''; // Device type (e.g., mobile, desktop)
        let carouselIndex: number = 0; // Index for carousel navigation
        let login: string = ''; // User login information
        let typeComponent: any = undefined; // Type of component being used
        let videoLoyalty: any = []; // Array to hold loyalty videos
        let videoLoyaltyLarge: any = []; // Array to hold large loyalty videos
        let bonuses: any = []; // Array to hold bonuses information
        let cInterval: any = undefined; // Interval for timing events
        let showModalMessage: boolean = false; // Flag to show message modal
        let showModalVideo: boolean = false; // Flag to show video modal
        let apuestas: any = []; // Array to hold betting information
        return {
            config,
            emitter,
            appComponent,
            refreshBalance,
            loyalty,
            mobile,
            titleModal,
            descriptionModal,
            baseUrlFx,
            storeOpen,
            menuAction,
            videoSmall,
            slider,
            loadbanners,
            sliders,
            device,
            carouselIndex,
            login,
            typeComponent,
            videoLoyalty,
            videoLoyaltyLarge,
            bonuses,
            cInterval,
            showModalMessage,
            showModalVideo,
            apuestas,
        };
    },
    unmounted() {
        // Lifecycle hook called when the component is unmounted
        this.emitter.all.delete('accept:modal'); // Removing event listener for modal acceptance
    },
    mounted() {
        /**
         * Listens for the "accept:modal" event and closes the modal
         * in the app component when the event is triggered.
         */
        this.emitter.on('accept:modal', () => {
            this.appComponent.closeModal();
        });

        /**
         * Checks if the loyalty configuration for the current country
         * is undefined or false. If so, redirects to the home page.
         */
        if (
            this.config.loyalty[this.appComponent.country] == undefined ||
            !this.config.loyalty[this.appComponent.country]
        ) {
            router.push('/');
        }

        /**
         * Fetches loyalty information for the user.
         */
        this.getLoyaltyInformation();

        /**
         * Initializes shop bonuses for the user.
         */
        this.initShopBonuses();

        /**
         * Sets the login status based on the user's session state.
         * If the user is logged in, sets login to "login"; otherwise, sets it to "notLogin".
         */
        if (this.appComponent.session.logueado) {
            this.login = 'login';
        } else {
            if (!this.appComponent.session.logueado) {
                this.login = 'notLogin';
            }
        }

        /**
         * Checks for the existence of video loyalty configurations
         * and assigns the small video loyalty URL if available.
         */
        if (
            this.config['videoLoyalty'] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ][this.login] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ][this.login]['small'] != undefined
        ) {
            this.videoLoyalty =
                this.config['videoLoyalty'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login]['small'];
        }

        /**
         * Checks for the existence of video loyalty configurations
         * and assigns the large video loyalty URL if available.
         */
        if (
            this.config['videoLoyalty'] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ][this.login] != undefined &&
            this.config['videoLoyalty'][this.appComponent.country][
                this.appComponent.lngProd
                ][this.login]['large'] != undefined
        ) {
            this.videoLoyaltyLarge =
                this.config['videoLoyalty'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login]['large'];
        }
    }, // Placeholder for mounted lifecycle hook
    methods: {
        closeModal() {
            // Method to close the modal dialog
            this.appComponent.closeModal(); // Calling closeModal on the app component
        },
        getLoyaltyInformation() {
            // Method to fetch loyalty information from the API
            const params = {
                country: this.appComponent.country, // Parameters for the API request
            };
            apiService.request('loyalty_information', params).then((response) => {
                // Handling the API response
                if (response.code == 0) {
                    this.loyalty = response.data.loyalty; // Storing loyalty data
                }
            });
        },
        initShopBonuses() {
            // Method to initialize shop bonuses
            apiService
                .request('shop_bonuses', { Country: this.appComponent.country }) // API request for shop bonuses
                .then((response: any) => {
                    // Handling the API response
                    if (response.code == 0) {
                        this.bonuses = response.data; // Storing bonuses data
                        this.bonuses.sort((a, b) => a.level - b.level); // Sorting bonuses by level
                    }
                });
        },
        openShop() {
            // Method to open the shop
            if (this.appComponent.session.logueado) {
                // Checking if the user is logged in
                window.location.href = '/gestion/shop-bonuses'; // Redirecting to the shop bonuses page
            } else {
                this.clickButtonLogin(); // Triggering login if not logged in
            }
        },
        clickButtonLogin() {
            // Method to show the login modal
            this.appComponent.showModalLogin = true; // Setting flag to show login modal
        },
        openModal(title, description) {
            // Method to open a modal with a title and description
            this.titleModal = title; // Setting the modal title
            this.descriptionModal = description; // Setting the modal description
            this.showModalMessage = true; // Showing the modal
        },
        openVideoModal(url) {
            // Method to open a video modal with a specified URL
            this.videoSmall = 'https://www.youtube.com/embed/' + url; // Setting the video URL
            this.showModalVideo = true; // Showing the video modal
        },
    },
});</script>
<template>
        <!-- Main container for the loyalty program section, displayed based on specific conditions FOR DEFAULT -->
    <div
        v-if="!config.loyalty_type || Object.keys(config.loyalty_type).length === 0"
        class="loyalty-one pb-8"
    >
        <!-- Header section with gradient background -->
        <div
            class="int-header h-40 bg-gradient-to-r from-primary to-neutral-content absolute w-full"
        ></div>
        <!-- Title of the loyalty program -->
        <span
            class="text-neutral font-bold text-3xl relative z-1 w-11/12 max-w-[1100px] mx-auto block my-4 px-2 pt-4 pb-5 border-b-2 border-solid border-neutral"
        >{{ $t('Programa de Lealtad') }}</span
        >
        <!-- Main content area for loyalty program information -->
        <div
            class="Framework InfoPage lg:w-10/12 xl:w-8/12 w-12/12 bg-neutral mx-auto py-3 rounded-xl shadow-md"
        >
            <div class="Box TextBox NoHeadBox InfoBox">
                <div class="BoxContent InfoBoxContent p-5 text-neutral-content">
                    <!-- Description of loyalty points accumulation -->
                    <span>{{
                            $t(
                                'Cada vez que hagas una apuesta, bien sea en casino o deportes, sumas puntos con los que después podrás disfrutar de premios y beneficios.',
                            )
                        }}</span>
                    <br />
                    <br />
                    <span>{{
                            $t(
                                'Gana puntos por apostar. Recibe más bonos y promociones a medida que acumules mas puntos. ¡Todos los beneficios son acumulativos!',
                            )
                        }}</span>
                    <br />
                    <br />
                    <span>{{
                            $t(
                                'La siguiente tabla te muestra cuántos puntos ganas por monto apostado, por tipo de apuesta deportiva y por tipo de juego de casino:',
                            )
                        }}</span>
                    <br />
                    <br />
                    <!-- Responsive table for displaying points earned -->
                    <div class="table-responsive c-rr-tbl-container">
                        <table
                            class="table table-bordered table-hover c-rr-tbl bvoffsete0 w-full overflow-scroll"
                        >
                            <thead>
                            <tr class="header_numbers">
                                <th
                                    class="dark_blue_bg"
                                    colspan="4"
                                    style="text-align: left; padding: 0px !important"
                                ></th>
                            </tr>
                            <tr class="header_points dark_gold_bg">
                                <!-- Column headers for sports betting -->
                                <th>{{ $t('Deportes: Tipo de Apuesta') }}</th>
                                <th style="width: 51px" class="auto-style3">
                                    {{ $t('por cada') }}
                                </th>
                                <th style="width: 43px" class="auto-style4 text-center">
                                    {{ $t('Puntos') }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <!-- Rows for different types of bets and their corresponding points -->
                            <tr>
                                <td
                                    class="text_info"
                                    style="width: 97px; text-align: left !important"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta sencilla') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.SimpleBet }}</td>
                                <td style="width: 43px" class="text-neutral-content">
                                    {{ loyalty.BasePoints }}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    class="text_info"
                                    style="height: 25px; text-align: left !important"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 2') }}
                                </td>
                                <td style="height: 25px; width: 51px">
                                    {{ loyalty.CombinationBet2 }}
                                </td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td
                                    class="text_info"
                                    style="height: 25px; text-align: left !important"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 3') }}
                                </td>
                                <td style="height: 25px; width: 51px">
                                    {{ loyalty.CombinationBet3 }}
                                </td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td
                                    class="text_info"
                                    style="height: 25px; text-align: left !important"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 4') }}
                                </td>
                                <td style="height: 25px; width: 51px">
                                    {{ loyalty.CombinationBet4 }}
                                </td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td
                                    class="text_info"
                                    style="height: 25px; text-align: left !important"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 5') }}
                                </td>
                                <td style="height: 25px; width: 51px">
                                    {{ loyalty.CombinationBet5 }}
                                </td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 6') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.CombinationBet6 }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 7') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.CombinationBet7 }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 8') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.CombinationBet8 }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 9') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.CombinationBet9 }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Apuesta Combinada de 10-12') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.CombinationBet10 }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            <tr class="header_points dark_gold_bg">
                                <!-- Column headers for casino games -->
                                <th style="">{{ $t('Casino: Tipo de Juego') }}</th>
                                <th style="width: 51px" class="auto-style3">
                                    {{ $t('por cada') }}
                                </th>
                                <th style="width: 43px" class="auto-style4 text-center">
                                    {{ $t('Puntos') }}
                                </th>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left; height: 24px">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Casino Slots / Tragamonedas') }}
                                </td>
                                <td style="height: 24px; width: 51px">
                                    {{ loyalty.Casino }}
                                </td>
                                <td style="width: 43px; height: 24px">
                                    {{ loyalty.BasePoints }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text_info" style="text-align: left !important">
                                    <img
                                        src="https://images.virtualsoft.tech/m/msjT1617602788.png"
                                        class="inline-block mr-4"
                                        alt="info_icon"
                                    />{{ $t('Casino en Vivo') }}
                                </td>
                                <td style="width: 51px">{{ loyalty.Casino }}</td>
                                <td style="width: 43px">{{ loyalty.BasePoints }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <!-- Information about loyalty points deductions -->
                    <span
                    >{{
                            $t(
                                'Deducciones de puntos de lealtad: Para mantener tu nivel de lealtad actual, debes seguir apostando al mismo ritmo que lo has hecho. Los puntos de lealtad se deducirán una vez al día, con base en el promedio de puntos que ganaste hace',
                            )
                        }}
            {{ loyalty.ExpirationDays }} {{ $t('días.') }}</span
                    >
                    <br /><br />
                </div>
            </div>
        </div>
    </div>
    <!-- Main section for displaying loyalty program information VERSION 1-->
    <div
        class="loyalty-two"
        v-if="
      config.loyalty_type != undefined &&
      config.loyalty_type.version !== undefined && 
      config.loyalty_type.version == 1
    "
    >
        <!-- Header section for the loyalty guide -->
        <div class="header-loyalty-guide">
            <!-- Banner image for the loyalty program -->
            <div
                class="banner-loyalty w-full bg-[url('https://images.virtualsoft.tech/m/msjT1678763639.png')]"
            ></div>
            <!-- Button container for actions related to the loyalty program -->
            <div
                class="w-full bg-black flex items-center justify-center gap-x-10 md:gap-x-[25rem] py-5"
                bis_skin_checked="1"
            >
                <!-- Button to open the rewards store -->
                <button
                    class="bg-gradient-to-b from-[#E4C980] to-[#E4C980]/80 border-solid border-2 border-[#E4C980] hover:bg-[#E4C980] p-3 rounded-xl font-bold"
                    @click="(storeOpen = true), (menuAction = 4)"
                >
                    {{ $t('Tienda de premios') }}
                </button>
                <!-- Button to view the loyalty plan -->
                <button
                    class="bg-gradient-to-b from-[#E4C980] to-[#E4C980]/80 border-solid border-2 border-[#E4C980] hover:bg-[#E4C980] transition-all ease-in-out duran p-3 rounded-xl font-bold"
                    @click="
            menuAction = 4;
            storeOpen = false;
          "
                >
                    {{ $t('Plan lealtad') }}
                </button>
            </div>
            <!-- Menu for the loyalty guide -->
            <div class="menu-loyalty-guide bg-primary-content w-full overflow-x-auto">
                <ul
                    class="uppercase flex justify-center items-center text-center font-bold w-full h-full p-1"
                    style="height: 32px; min-width: 929px; z-index: 399999999"
                >
                    <!-- Loop through video loyalty items to create menu items -->
                    <li
                        v-for="(item2, i) in videoLoyaltyLarge"
                        @click="menuAction = i + 1"
                        class="cursor-pointer"
                        style="width: 25%; border-right: 2px solid #000"
                    >
                        {{ $t(item2.title) }}
                    </li>
                    <!-- Menu item for rewards -->
                    <li
                        @click="
              menuAction = 4;
              storeOpen = false;
            "
                        class="cursor-pointer"
                        style="width: 25%"
                    >
                        {{ $t('Premios') }}
                    </li>
                </ul>
            </div>
        </div>
        <!-- Body section for the loyalty guide, displayed when menuAction is not 4 -->
        <div
            v-if="menuAction != 4"
            class="body-loyalty-guide overflow-hidden relative"
            style="width: 100%; height: auto"
        >
            <!-- Media section for displaying video guides -->
            <div class="media-loyalty-guide w-full relative" style="height: 355px">
                <div class="video-guide w-full h-full">
                    <div
                        style="
              width: 100%;
              height: 100%;
              text-align: center;
              margin: 0;
              padding: 0;
            "
                    >
                        <div class="video-class"></div>
                        <!-- Video iframe for the first video, displayed based on menuAction -->
                        <iframe
                            class="w-full h-full rounded-t-lg"
                            v-if="menuAction == 1 && videoLoyaltyLarge[0] != undefined"
                            width="560"
                            height="500"
                            :src="videoLoyaltyLarge[0].video"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <!-- Video iframe for the second video -->
                        <iframe
                            class="w-full h-full rounded-t-lg"
                            v-if="menuAction == 2 && videoLoyaltyLarge[1] != undefined"
                            width="560"
                            height="500"
                            :src="videoLoyaltyLarge[1].video"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <!-- Video iframe for the third video -->
                        <iframe
                            class="w-full h-full rounded-t-lg"
                            v-if="menuAction == 3 && videoLoyaltyLarge[2] != undefined"
                            width="560"
                            height="500"
                            :src="videoLoyaltyLarge[2].video"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
                <!-- Section for displaying video titles and login button -->
                <div
                    class="absolute bottom-0 mb-8 md:mt-28 md:inset-y-0 left-0 text-media-guide text-center flex justify-center flex-col items-center flex-wrap w-full md:w-2/5"
                    style="height: 137px; width: 295px; margin-top: 102px"
                >
                    <div v-for="(item2, i) in videoLoyaltyLarge" class="title">
                        <p
                            v-if="menuAction == i + 1"
                            class="uppercase text-white font-bold w-full text-3xl m-0"
                            style="text-shadow: 2px 2px 4px #000"
                        >
                            {{ $t(item2.title) }}
                        </p>
                    </div>
                    <!-- Button to log in if the user is not logged in -->
                    <button
                        v-if="!appComponent.session.logueado"
                        @click="openShop()"
                        class="bg-primary-content text-black px-8 py-2 rounded-xl font-bold w-2/5"
                    >
                        {{ $t('Ingresar') }}
                    </button>
                </div>
                <!-- Navigation buttons for video selection -->
                <div
                    class="absolute bottom-0 flex justify-center mb-2"
                    style="width: 100%"
                >
                    <button
                        v-for="(item2, i) in videoLoyaltyLarge"
                        @click="menuAction = i + 1"
                        :class="
              menuAction == i + 1 ? 'points-media-active' : 'points-media'
            "
                        aria-label="Swipe Image"
                        class="rounded-full mx-1"
                    ></button>
                </div>
            </div>
            <!-- Footer section for additional video content -->
            <div
                v-if="videoLoyalty.length > 0"
                class="footer-guide bg-black overflow-hidden h-auto md:h-4/5"
            >
                <div class="carousel w-full h-full flex items-center justify-center">
                    <button class="text-white text-5xl hidden md:block moveRight">
                        <span class="icon-cheveron-left"></span>
                    </button>
                    <div class="group videos my-5 mx-1" style="max-width: 1180px">
                        <!-- Video display for non-mobile users -->
                        <div
                            v-if="!mobile"
                            class="w-full flex flex-wrap md:flex-nowrap justify-center items-center overflow-auto"
                        >
                            <div
                                v-for="item in videoLoyalty"
                                class="small-video rounded-lg mb-5 mr-5 md:mx-10 flex-shrink-0 whitespace-normal md:whitespace-nowrap"
                                style="width: 167px; height: 198px"
                            >
                                <div
                                    class="video-small w-full rounded-t-lg h-2/4 bg-gray-500 relative"
                                >
                                    <div class="play-img absolute" style="top: 28px; left: 65px">
                                        <button @click="openVideoModal(item.idVideo)">
                                            <img
                                                src="https://images.virtualsoft.tech/m/msjT1659628911.png"
                                                width="40"
                                                height="40"
                                                alt="Play Video"
                                            />
                                        </button>
                                    </div>
                                    <img
                                        :src="
                      'http://img.youtube.com/vi/' +
                      item.idVideo +
                      '/maxresdefault.jpg'
                    "
                                        class="w-full h-full object-cover rounded-t-lg"
                                        :alt="item.alt"
                                    />
                                </div>
                                <div
                                    class="video-small w-full rounded-b-lg h-2/4"
                                    style="
                    background: #30374a;
                    box-shadow: inset 0px 5px 3px 0px #ffffff30,
                      inset 0px -15px 9px 2px #0000008c;
                  "
                                >
                                    <div class="text-video-small w-full p-2 h-4/5 overflow-auto">
                                        <p class="text-white font-bold m-0 whitespace-normal">
                                            {{ $t(item.title) }}
                                        </p>
                                    </div>
                                    <div class="date-video-small w-full text-xs pr-2">
                                        <p class="text-white m-0 text-right">{{ $t(item.date) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Video display for mobile users -->
                        <div
                            class="mobile-object flex justify-around flex-wrap"
                            v-if="mobile"
                        >
                            <div
                                v-for="item in videoLoyalty"
                                class="small-video rounded-lg mb-5 mr-5 md:mx-10 whitespace-normal md:whitespace-nowrap"
                                style="width: 167px; height: 198px"
                            >
                                <div
                                    class="video-small w-full rounded-t-lg h-2/4 bg-gray-500 relative"
                                >
                                    <div class="play-img absolute" style="top: 28px; left: 65px">
                                        <button @click="openVideoModal(item.idVideo)">
                                            <img
                                                src="https://images.virtualsoft.tech/m/msjT1659628911.png"
                                                width="40"
                                                height="40"
                                                alt="Play Video"
                                            />
                                        </button>
                                    </div>
                                    <img
                                        :src="
                      'http://img.youtube.com/vi/' +
                      item.idVideo +
                      '/maxresdefault.jpg'
                    "
                                        class="w-full h-full object-cover rounded-t-lg"
                                        :alt="item.alt"
                                    />
                                </div>
                                <div
                                    class="video-small w-full rounded-b-lg h-2/4"
                                    style="
                    background: #30374a;
                    box-shadow: inset 0px 5px 3px 0px #ffffff30,
                      inset 0px -15px 9px 2px #0000008c;
                  "
                                >
                                    <div class="text-video-small w-full p-2 h-4/5 overflow-auto">
                                        <p class="text-white font-bold m-0 whitespace-normal">
                                            {{ $t(item.title) }}
                                        </p>
                                    </div>
                                    <div class="date-video-small w-full text-xs pr-2">
                                        <p class="text-white m-0 text-right">{{ $t(item.date) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="text-white text-5xl hidden md:block">
                        <span class="icon-cheveron-right"></span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Section for displaying points awards when store is not open and menuAction is 4 -->
        <div
            v-if="!storeOpen && menuAction == 4"
            class="points-awards overflow-hidden h-auto"
            style="
        background: url(https://images.virtualsoft.tech/m/msjT1658952767.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      "
        >
            <div class="text-awards flex justify-center flex-wrap w-full">
                <div
                    class="text-award text-white text-3xl font-bold mx-5 h-auto text-center my-8"
                    style="width: 583px"
                >
                    <p class="m-0 w-full h-full">
                        {{
                            $t(
                                'Descubre todas las alternativas para acumular puntos en el Club de Oro Ecuabet.',
                            )
                        }}
                    </p>
                </div>
                <!-- Table for displaying awards information -->
                <div
                    class="table-awards w-full flex items-center justify-center overflow-auto"
                >
                    <table
                        class="text-center mb-8 font-bold uppercase"
                        style="width: 78%; min-width: 325px"
                    >
                        <thead>
                        <tr class="uppercase">
                            <th>{{ $t('Tipo de apuesta') }}</th>
                            <th>{{ $t('Por cada (usd)') }}</th>
                            <th>{{ $t('Puntos') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- Row for simple bet -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA SENCILLA'),
                    $t(
                      'se consideran apuestas directas a aquellas realizas en una sola línea al resultado de un solo evento. El valor del premio resulta de multiplicar el logro o cuota asignada al evento por el valor apostado por el usuario.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA SENCILLA') }}
                            </td>
                            <td>{{ $t(loyalty.SimpleBet) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 2 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 2'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 2') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet2) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 3 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 3'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 3') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet3) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 4 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 4'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 4') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet4) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 5 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 5'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 5') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet5) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 6 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 6'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 6') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet6) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 7 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 7'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 7') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet7) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 8 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 8'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 8') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet8) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 9 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 9'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 9') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet9) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for combined bet of 10 -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('APUESTA COMBINADA DE 10'),
                    $t(
                      'La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('APUESTA COMBINADA DE 10') }}
                            </td>
                            <td>{{ $t(loyalty.CombinationBet10) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        <!-- Row for casino/slots/cards -->
                        <tr
                            class="text-white cursor-pointer"
                            @click="
                  openModal(
                    $t('CASINO/SLOTS/CARTAS'),
                    $t(
                      'La plataforma de doradobet.com ofrece una modalidad de casino en el cual el usuario podrá interactuar y experimentar un ambiente de casino de forma cómoda y segura desde su hogar, en esta modalidad se cuentan con apuestas a ruletas, maquinas traga monedas, blackjack, baccarat, etc…'
                    )
                  )
                "
                        >
                            <td class="break-words">
                                <p
                                    class="m-0 bg-primary-content inline-block mr-1"
                                    style="
                      width: 10px;
                      height: 10px;
                      background: brown;
                      border-radius: 50%;
                      border: 1px solid #000;
                      outline: 1px solid #e7cc00;
                    "
                                ></p>
                                {{ $t('Casino/Slots/Cartas') }}
                            </td>
                            <td>{{ $t(loyalty.Casino) }}</td>
                            <td>{{ $t(loyalty.BasePoints) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Button to go to the store -->
                <button
                    class="px-6 py-2 bg-primary-content rounded-xl font-bold mb-5 uppercase"
                    @click="storeOpen = true"
                >
                    {{ $t('IR A LA TIENDA') }}
                </button>
            </div>
        </div>
        <!-- Section for displaying points awards when store is open and menuAction is 4 -->
        <div
            v-if="storeOpen && menuAction == 4"
            class="points-awards overflow-hidden h-auto"
            style="
        background: url(https://images.virtualsoft.tech/m/msjT1658952767.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      "
        >
            <div class="text-awards flex justify-center flex-wrap w-full my-4">
                <div
                    class="text-award text-white text-3xl font-bold mx-5 h-auto text-center my-8"
                    style="width: 583px"
                >
                    <p class="m-0 w-full h-full">
                        {{
                            $t(
                                'Con el Club de Oro acumula puntos por tus jugadas y accede a increíbles beneficios.',
                            )
                        }}
                    </p>
                </div>
            </div>
            <!-- Shop component for loyalty bonuses -->
            <div class="shop-loyalty">
                <AppShopBonuses />
            </div>
        </div>
        <!-- Modal for displaying messages -->
        <div
            v-if="showModalMessage"
            class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
        >
            <div
                class="modal-box rounded-2xl"
                style="
          max-width: 60vh;
          box-shadow: inset -1px -1px 20px 0px #00000080;
          outline: 1px solid #fff;
        "
            >
                <label
                    @click="showModalMessage = false"
                    class="cursor-pointer text-right block"
                >
                    <font-awesome-icon icon="fa-solid fa-close"
                    />
                </label>
                <div
                    class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8"
                >
                    <div class="Container InfoContent">
                        <div class="content-message">
                            <p class="font-bold text-center">{{ $t(titleModal) }}</p>
                            <p class="text-justify">{{ $t(descriptionModal) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal for displaying video content -->
        <div
            v-if="showModalVideo"
            class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
        >
            <div class="rounded-2xl w-4/5 h-3/5 p-10" style="background: #ffffff3d">
                <label
                    @click="showModalVideo = false"
                    class="cursor-pointer text-right block"
                >
                    <font-awesome-icon icon="fa-solid fa-close"
                    />
                </label>
                <div
                    class="BoxContent TermsContentBox HelpContentBox w-full h-full float-left pb-5"
                >
                    <div class="Container InfoContent h-full w-full">
                        <div class="content-message w-full h-full">
                            <iframe
                                class="w-full h-full rounded-t-lg"
                                width="560"
                                height="500"
                                :src="videoSmall"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  Main section for displaying loyalty program information VERSION 2 -->
      <div
               v-if="
      config.loyalty_type != undefined &&
      config.loyalty_type.version !== undefined && 
      config.loyalty_type.version == 2
    ">
            <MyLoyaltyV2></MyLoyaltyV2>
      </div>
    <!-- Main section for displaying loyalty program information VERSION 3-->
    <section
        v-if="
        config.loyalty_type != undefined &&
      config.loyalty_type.version != undefined && 
      config.loyalty_type.version == 3
    "
        class="relative flex justify-center items-center"
    >
        <!-- Background image for the section -->
        <img
            :src="config.loyalty_type.bgLoyalty !== undefined ? config.loyalty_type.bgLoyalty : 'https://images.virtualsoft.tech/m/msj0212T1750269067.png'"
            alt=""
            class="absolute in top-0 w-full h-full object-cover object-top"
        />
        <article
            class="flex flex-col justify-center items-center w-full max-w-[1300px] text-neutral z-20 my-5 lg:my-20"
        >
            <div class="w-[100%] flex lg:flex-row flex-col-reverse md:justify-start justify-center items-center ">
                <div class="w-auto md:w-[20%]">
                    <!-- Video iframe for loyalty program -->
                    <iframe
                        class="h-72 w-72"
                        :src="config.urlVideoMyLoyalty[appComponent.country]"
                        allowfullscreen
                        v-if="config != undefined && config.urlVideoMyLoyalty != undefined && config.urlVideoMyLoyalty[appComponent.country] != undefined"
                    ></iframe>
                </div>
                <div class="w-[60%] flex flex-col justify-center items-center gap-6 my-8 text-neutral">
                    <!-- Welcome message -->
                    <h2 class="in text-3xl lg:text-4xl font-semibold text-center">
                        {{ $t('¡Bienvenido a DoradoClub!') }}
                    </h2>
                    <div
                        class="grid gap-3 text-center text-base lg:text-lg font-normal"
                    >
                        <!-- Description of the loyalty program -->
                        <p class="in">
                            {{
                                $t(
                                    'El programa de beneficios de Doradobet que te da increíbles premios solo por jugar.',
                                )
                            }}
                        </p>
                        <p class="in">
                            {{
                                $t(
                                    'Con DoradoClub, por cada apuesta que hagas en deportes o casino, acumulas puntos que podrás canjear por apuestas deportivas y/o giros gratis.',
                                )
                            }}
                        </p>
                    </div>
                    <!-- Link to the shop for bonuses -->
                    <RouterLink
                        v-if="!appComponent.infoApp"
                        to="/shop-bonuses"
                        class="py-2 px-8 md:text-xl text-sm font-medium rounded-lg bg-success2 hover:bg-success2/70 hover:scale-105 shadow-sm shadow-black/50"
                    >{{ $t('Ir a tienda') }}
                    </RouterLink
                    >
                </div>
            </div>
            <div class="pt-10">
                <!-- Section title for earning points -->
                <h1 class="lg:text-2xl text-xl text-neutral">
                    {{ $t('¿Cómo ganas puntos en DoradoClub?') }}
                </h1>
            </div>
            <div class="w-full flex flex-col justify-center items-center gap-6 my-8">
                <!-- Title for sports section -->
                <h3
                    class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% in w-[75%] lg:w-[30%] h-12 flex justify-center items-center text-2xl font-semibold text-neutral"
                >
                    {{ $t('DEPORTES') }}
                </h3>
                <div
                    class="flex flex-col md:flex-wrap justify-center items-center h-auto md:h-[400px] lg:h-[450px] w-full max-w-[810px] lg:max-w-[890px] gap-4 px-10"
                >
                    <!-- InfoCards for different types of bets -->
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685711893.png" title="Apuesta"
                               sub-title="Sencilla" icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.SimpleBet"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 2"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet2"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 3"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet3"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 4"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet4"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 5"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet5"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 6"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet6"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 7"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet7"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 8"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet8"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685710050.png" title="Apuesta"
                               sub-title="Combinada de 9"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet9"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685712050.png" title="Apuesta"
                               sub-title="Combinada de 10"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CombinationBet10"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                </div>
            </div>
            <div class="w-full flex flex-col justify-center items-center gap-6 my-8">
                <!-- Title for casino section -->
                <h3
                    class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% in w-[75%] lg:w-[30%] h-12 flex justify-center items-center text-2xl font-semibold text-neutral"
                >
                    {{ $t('CASINO') }}
                </h3>
                <div
                    class="w-full flex flex-col md:flex-row justify-center items-center gap-4 px-10 max-w-[810px] lg:max-w-[890px] my-6"
                >
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685712179.png" title=""
                               sub-title="Casino Slots / Tragamonedas"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.Casino" icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685712428.png" title=""
                               sub-title="Casino en vivo"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.CasinoLive"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                </div>
            </div>
            <div class="w-full flex flex-col justify-center items-center gap-6 my-8">
                <!-- Title for virtual bets section -->
                <h3
                    class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% in w-[75%] lg:w-[30%] h-12 flex justify-center items-center text-2xl font-semibold text-neutral"
                >
                    {{ $t('VIRTUALES') }}
                </h3>
                <div
                    class="w-full flex flex-col md:flex-row justify-center items-center gap-4 px-10 max-w-[810px] lg:max-w-[890px] my-6"
                >
                    <InfoCards logo-diamon="https://images.virtualsoft.tech/m/msjT1685712179.png" title=""
                               sub-title="Apuestas Virtuales"
                               icon-mon="https://images.virtualsoft.tech/m/msjT1685710076.png"
                               :amount="loyalty.Virtuals"
                               icon-back="https://images.virtualsoft.tech/m/msjT1685710104.png"
                               :final-number="loyalty.BasePoints" />
                </div>
            </div>
            <!-- List of betting types and their descriptions -->
            <ul
                class="w-full flex flex-col justify-center items-start text-lg gap-4 mt-12 px-12 text-neutral"
            >
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685711893.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Apuesta sencilla') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685710050.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Apuesta combinada hasta 9') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685712050.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Apuesta combinada hasta 10-12') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685712179.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Apuesta en casino Slot / Tragamonedas') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685712428.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Apuesta en casino en vivo') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685710076.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Dinero apostado') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1685710104.png"
                        alt=""
                        class="w-8 object-contain object-center"
                    /><span>{{ $t('Suma de puntos') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1683841601.png"
                        alt=""
                        class="w-24"
                    />
                    <span>{{ $t('Historial de puntos') }}</span>
                </li>
                <li class="in flex justify-center items-center gap-2 pt-5">
                    <h1 class="text-2xl" v-html="$t('Revisa los términos y condiciones de DoradoClub')">
                    </h1>
                </li>
            </ul>
        </article>
        <!-- Gradient overlay at the bottom of the section -->
        <div
            class="absolute -bottom-1 w-full h-[50%]"
        ></div>
    </section>
    <!--  Main section for displaying loyalty program information VERSION 4 -->
    <div
        v-if="
      config.loyalty_type != undefined &&
      config.loyalty_type.version !== undefined && 
      config.loyalty_type.version == 4
    "
    >
            <MyLoyaltyV4></MyLoyaltyV4>

    </div>
</template>
<style scoped>
/* Styles for title elements with a gradient background */
.titles {
    background: linear-gradient(
        270deg,
        hsl(var(--b3)) 0%,
        /* Transparent start */ hsl(var(--b3)) 21.07%,
        /* Dark color at 21.07% */ hsl(var(--b3)) 50%,
        /* Dark color at 50% */ hsl(var(--b3)) 82.9%,
        /* Dark color at 82.9% */ hsl(var(--b3)) 100% /* Semi-transparent end */
    );
}

/* Styles for the loyalty banner */
.banner-loyalty {
    height: 154px; /* Fixed height for the banner */
    background-repeat: no-repeat; /* Prevents background image repetition */
    background-size: cover; /* Ensures background image covers the element */
    background-position: center; /* Centers the background image */
}

/* Styles for the last cell in each row of the awards table */
.table-awards.table > tbody > tr > td:last-child {
    border-right: 1px solid #cfcfcf; /* Right border for the last cell */
    text-align: center; /* Centers text in the cell */
    background: #ff0000; /* Red background for the last cell */
}

/* General styles for the awards table */
.table-awards table {
    margin: 0; /* Removes default margin */
    padding: 0; /* Removes default padding */
    width: 100%; /* Full width of the container */
    border-collapse: separate; /* Allows borders to be separate */
    border-spacing: 0px 6px; /* Space between table rows */
    table-layout: fixed; /* Fixed layout for consistent column widths */
}

/* Styles for the table header */
.table-awards table thead {
    background-color: #dedede; /* Light gray background for the header */
    box-shadow: inset 0px -3px 8px 0px #00000073; /* Subtle shadow effect */
}

/* Styles for header cells in the awards table */
.table-awards table > thead > tr > th {
    padding: 3px; /* Padding inside header cells */
}

/* Rounded corners for the first header cell */
.table-awards table > thead > tr > th:first-child {
    border-top-left-radius: 10px; /* Top left corner rounding */
    border-bottom-left-radius: 10px; /* Bottom left corner rounding */
}

/* Rounded corners for the last header cell */
.table-awards table > thead > tr > th:last-child {
    border-top-right-radius: 10px; /* Top right corner rounding */
    border-bottom-right-radius: 10px; /* Bottom right corner rounding */
}

/* Styles for even header cells in the awards table */
.table-awards table > thead > tr > th:nth-child(2n) {
    background: #e7cc00; /* Yellow background for even header cells */
    box-shadow: inset 0px -3px 8px 0px #00000073; /* Subtle shadow effect */
}

/* Styles for even cells in the body of the awards table */
.table-awards table > tbody > tr > td:nth-child(2n) {
    color: #e7cc00; /* Yellow text color for even cells */
}

.ng-image-slider .ng-image-slider-container .main {
    /* Sets the height of the main container in the image slider to 500px */
    height: 500px !important;
}

.ng-image-slider {
    /* Sets the height of the image slider to 500px */
    height: 500px !important;
}

.ng-image-slider {
    /* Sets the height of the image slider to 100% of its parent container */
    height: 100% !important;
}

.ng-image-slider .ng-image-slider-container .main {
    /* Sets the height of the main container in the image slider to 100% of its parent container */
    height: 100% !important;
}

.points-media-active {
    /* Styles for the active media point indicator */
    width: 42px !important; /* Width of the active point */
    height: 10px; /* Height of the active point */
    background: #ff9700 !important; /* Background color for the active point */
    box-shadow: -1px 0px 7px 2px #ff9700 !important; /* Shadow effect for the active point */
}

.points-media {
    /* Styles for the inactive media point indicator */
    width: 10px; /* Width of the inactive point */
    height: 10px; /* Height of the inactive point */
    background: #5e5e5e; /* Background color for the inactive point */
}

tr.header_points.dark_gold_bg {
    /* Background color for table rows with the class 'header_points' and 'dark_gold_bg' */
    background: #7d7d80; /* Dark gray background color */
}

img.lvl-gui {
    /* Styles for images with the class 'lvl-gui' */
    height: 30px; /* Fixed height for the image */
    width: auto; /* Automatic width to maintain aspect ratio */
    min-width: auto; /* No minimum width constraint */
}

.c-rr-tbl .info_icon {
    /* Styles for the info icon within the 'c-rr-tbl' class */
    width: 36px !important; /* Fixed width for the info icon */
}

img.logo {
    /* Styles for the logo image */
    padding: 10px 15px; /* Padding around the logo */
}

.table > tbody > tr > td:last-child {
    /* Styles for the last cell in each row of the table body */
    border-right: 1px solid #cfcfcf; /* Right border for the last cell */
    text-align: center; /* Center text alignment */
    background: #e5e4e4; /* Light gray background color */
}

.table :where(th, td) {
    /* General styles for table header and data cells */
    white-space: normal !important; /* Allows text to wrap normally */
    padding: 0.4rem; /* Padding for table cells */
}
</style>


<!-- FILE DOCUMENTED -->
