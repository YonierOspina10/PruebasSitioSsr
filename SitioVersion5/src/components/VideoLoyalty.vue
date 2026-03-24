<template>
    <div v-if="videoLoyalty.length > 0" class="overflow-hidden h-auto md:h-4/5">
        <h2 class="text-neutral text-2xl font-semiboild place-self-center">Aprende, Explora y Domina</h2>
        <div class="carousel w-full h-full flex items-center justify-center">

            <!-- Left Arrow -->
            <button class="text-neutral text-5xl hidden md:block moveRight">
                <span class="icon-cheveron-left"></span>
            </button>

            <div class="group videos my-5 mx-1 w-[90%] md:justify-items-center">

                <!-- FILA CONTINUA -->
                <div
                    class="flex flex-row gap-6 px-2 py-2 overflow-x-auto md:overflow-visible md:w-[90%] md:justify-center">
                    <div v-for="item in videoLoyalty" :key="item.idVideo"
                        class="small-video flex-shrink-0 w-64 md:flex-shrink md:w-[30rem] rounded-xl p-3 border border-neutral">

                        <!-- Thumbnail -->
                        <div class="video-small w-full rounded-lg h-32 md:h-40 bg-gray-500 relative overflow-hidden">
                            <div class="absolute inset-0 flex items-center justify-center z-10">
                                <button @click="openVideoModal(item.idVideo)">
                                    <img src="https://images.virtualsoft.tech/m/msjT1659628911.png" width="48"
                                        height="48" alt="Play Video" />
                                </button>
                            </div>

                            <img :src="`http://img.youtube.com/vi/${item.idVideo}/maxresdefault.jpg`"
                                class="w-full h-full object-cover rounded-lg" :alt="item.alt" />
                        </div>

                        <!-- Title -->
                        <div class="mt-2">
                            <p class="text-neutral font-bold text-sm m-0 whitespace-normal">
                                {{ $t(item.title) }}
                            </p>
                        </div>

                    </div>
                </div>

            </div>


            <!-- Right Arrow -->
            <button class="text-neutral text-5xl hidden md:block">
                <span class="icon-cheveron-right"></span>
            </button>

        </div>
    </div>
        <!-- Modal for displaying video content -->
        <div
            v-if="showModalVideo"
            class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
        >
            <div class="rounded-2xl w-4/5 h-3/5 p-10">
                <label
                    @click="showModalVideo = false"
                    class="cursor-pointer text-right block text-neutral"
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
</template>


<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing the user menu component
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import router from '@/router'; // Importing the router for navigation
import InfoCards from '@/components/InfoCards.vue'; // Importing the info cards component
import LiveCasino from '@/views/Products/LiveCasino.vue'; // Importing the live casino view component
import VideoPlayer from '@/components/VideoPlayer.vue'; // Importing the video player component
export default defineComponent({
    components: {
        VideoPlayer, // Registering the VideoPlayer component
        LiveCasino, // Registering the LiveCasino component
        InfoCards, // Registering the InfoCards component
        MenuUser, // Registering the MenuUser component
    },
    data: function () {
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