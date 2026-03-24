<script lang="ts">import apiService from '@/services/ApiService'; // Importing the API service for backend communication
import router from '@/router'; // Importing the router for navigation
import moment from 'moment'; // Importing moment.js for date manipulation
import IconChevronRight from '@/components/icons/IconChevronRight.vue'; // Importing right chevron icon component
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'; // Importing left chevron icon component
import CasinoSlider3V3 from '@/components/CasinoSlider3V3.vue'; // Importing the casino slider component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition

export default defineComponent({
    components: {
        IconChevronLeft, // Registering left chevron icon component
        IconChevronRight, // Registering right chevron icon component
        CasinoSlider3V3, // Registering casino slider component
    },
    data: function() {
        // Defining reactive data properties for the component
        let config = this.$config(); // Configuration object
        let emitter = this.$emitter(); // Event emitter for communication
        let appComponent: any = this.$appComponent; // Reference to the main app component
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let flag: string = ''; // Flag for tracking state
        let container: any = undefined; // Container for DOM manipulation
        let scrollAmount: any = undefined; // Amount scrolled for side scrolling
        let slideTimer: any = ''; // Timer for scrolling animation
        let country: any = {}; // Object to hold country data
        let more: boolean = false; // Flag to indicate if more items are available
        let stateFilter: string = 'A'; // Filter for state
        let typeFilter: string = '0'; // Filter for type
        let auth_token: string = ''; // Authentication token
        let background: string = ''; // Background style or image
        let torneos: any = []; // Array to hold tournament data
        let routes: any = []; // Array to hold routes
        let loading: any = undefined; // Loading state
        let torneosDetail: any = []; // Array to hold detailed tournament data
        let login: any = ''; // User login information
        let now: any = new Date(); // Current date and time
        let torneoSelected: any = undefined; // Selected tournament
        let loadingPlayers: boolean = false; // Loading state for players
        return {
            config,
            emitter,
            appComponent,
            refreshBalance,
            flag,
            container,
            scrollAmount,
            slideTimer,
            country,
            more,
            stateFilter,
            typeFilter,
            auth_token,
            torneos,
            routes,
            torneosDetail,
            login,
            now,
            background,
            torneoSelected,
            loading,
            loadingPlayers
        };
    },
    unmounted() {
        // Lifecycle hook called when the component is unmounted
        this.emitter.all.delete('accept:modal'); // Removing event listener for modal acceptance
    },
    mounted() {
        // Set loading state to true when the component is mounted
        this.loading = true;

        // Listen for the "accept:modal" event to close the modal in the app component
        this.emitter.on('accept:modal', () => {
            this.appComponent.closeModal();
        });

        // Check if the user is logged in and set the login state accordingly
        if (this.appComponent.session.logueado) {
            this.login = 'login'; // User is logged in
        } else {
            if (!this.appComponent.session.logueado) {
                this.login = 'notLogin'; // User is not logged in
            }
        }

        // Fetch tournaments data
        this.getTournaments();

        // Check for background configuration for not logged in users
        if (this.config != undefined &&
            this.config['not_login'] != undefined &&
            this.config['not_login']['backgrounds'] != undefined &&
            this.config['not_login']['backgrounds']['bg_tournament'] != undefined) {
            this.background = this.config['not_login']['backgrounds']['bg_tournament']; // Set background for not logged in users
        } else {
            // Check for background configuration for logged in users based on country and language
            if (
                this.config != undefined &&
                this.config['backgrounds'] != undefined &&
                this.config['backgrounds'][this.appComponent.country] != undefined &&
                this.config['backgrounds'][this.appComponent.country][
                    this.appComponent.lngProd
                    ] != undefined &&
                this.config['backgrounds'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login] != undefined &&
                this.config['backgrounds'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login]['torneos'] != undefined &&
                this.config['backgrounds'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login]['torneos']['backgrounds'] != undefined &&
                this.config['backgrounds'][this.appComponent.country][
                    this.appComponent.lngProd
                    ][this.login]['torneos']['backgrounds'].length > 0
            ) {
                // Set background from the tournament backgrounds for logged in users
                this.background =
                    this.config['backgrounds'][this.appComponent.country][
                        this.appComponent.lngProd
                        ][this.login]['torneos']['backgrounds'][0].url;
            }
        }
    },
    updated() {
        // Lifecycle hook called after the component is updated
        const scroll: any = document.getElementById('main-layout'); // Getting the main layout element
        if (scroll != undefined) {
            scroll.scrollTo(0, 0); // Scrolling to the top of the main layout
        }
    },
    watch: {
       'appComponent.tournamnetsList': { // Watches the tournaments list from appComponent
         handler(newVal) { // Function triggered when the value changes
           if (Array.isArray(newVal)) { // Ensures the new value is an array
             this.torneos.forEach(torneo => { // Iterates through the local tournaments
               const wsTorneo = newVal.find(t => t.id == torneo.id); // Finds the matching tournament by id
               if (wsTorneo) { // If a matching tournament is found
                 torneo.totalPlayers = wsTorneo.totalPlayers; // Updates the total players count
                 torneo.loadingPlayers = false; // Marks loading as complete
               }
             });
           }
         },
         immediate: true, // Executes handler immediately on component mount
         deep: true, // Observes nested changes inside the object/array
       },
    },
    methods: {
        closeModal() {
            // Method to close the modal
            this.appComponent.closeModal(); // Calling closeModal on the app component
        },
        formatDate(timestamp: any) {
            // Method to format a timestamp
            let newYear: any = new Date(timestamp); // Creating a new date object from the timestamp
            return newYear - this.now; // Returning the difference between the new date and current date
        },
        navigate(url: any) {
            // Method to navigate to a different route
            if (this.appComponent.session.logueado) {
                router.push(url); // Navigating to the specified URL if logged in
            } else {
                this.appComponent.showModalLogin = true; // Showing login modal if not logged in
            }
        },
        changeMain(item) {
            // Method to change the main item state
            item.flag = !item.flag; // Toggling the flag of the item
            if (this.flag != item.id) {
                this.flag = item.id; // Setting the flag to the item's ID if different
            } else {
                this.flag = ''; // Resetting the flag if the same item is clicked
            }
        },
        rightScroll(item) {
            // Method to scroll right in the container
            this.container = document.querySelector('.a' + item); // Selecting the container element
            this.sideScroll(this.container, 'right', 25, 200, 20); // Initiating side scroll to the right
        },
        leftScroll(item) {
            // Method to scroll left in the container
            this.container = document.querySelector('.a' + item); // Selecting the container element
            this.sideScroll(this.container, 'left', 25, 200, 20); // Initiating side scroll to the left
        },
        sideScroll(element, direction, speed, distance, step) {
            if (this.slideTimer) {
                clearInterval(this.slideTimer);
            }
            // Method to perform side scrolling on a given element
            this.scrollAmount = 0; // Initializing scroll amount
            this.slideTimer = setInterval(() => {
                // Setting up an interval for scrolling
                if (direction == 'left') {
                    element.scrollLeft -= step; // Scrolling left
                } else {
                    element.scrollLeft += step; // Scrolling right
                }
                this.scrollAmount += step; // Incrementing the scroll amount
                if (this.scrollAmount >= distance) {
                    window.clearInterval(this.slideTimer); // Clearing the interval when the distance is reached
                }
            }, speed); // Setting the interval speed
        },
        /**
         * Handles the user joining a tournament.
         *
         * @param {Object} torneo - The tournament object containing tournament details.
         */
        clickJoinUser(torneo) {
            // Prepare data object with tournament ID for the API request
            const data = {
                id: torneo.id,
            };

            // Make an API request to join the tournament
            apiService.request('torneo_join', data).then((response: any) => {
                // Check if the response indicates a successful join
                if (response.code == 0) {
                    // Update the tournament object to reflect that the user has joined
                    torneo.userjoin = true;

                    // Set up the modal for successful notification
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Mensaje'), // Title of the modal
                        messageModal: this.$t('Bienvenido al torneo. ¡Éxitos!'), // Success message
                        buttonModal: this.$t('Aceptar'), // Button text
                        orderModal: 'closeModal', // Modal close order
                    };
                } else {
                    // Initialize error message variable
                    var error_mensaje = '';

                    // Check if there is a specific error code in the response
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }

                    // If no specific error message, set a generic error message
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }

                    // Set up the modal for error notification
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Error!'), // Title of the error modal
                        messageModal: error_mensaje, // Error message to display
                        buttonModal: this.$t('Aceptar'), // Button text
                        orderModal: 'closeModal', // Modal close order
                    };
                }
            });
        },
        /**
         * Fetches tournaments based on the current filters and updates the component state.
         * Initiates a loading state while the request is being processed.
         */
        getTournaments() {
            const vthis = this; // Preserves the context of 'this' for use in nested functions
            const params = {
                State: this.stateFilter, // Current state filter for the tournament
                StateType: this.typeFilter, // Current type filter for the tournament
                Country: this.appComponent.country, // Country from the app component
            };
            this.loading = true; // Set loading state to true while fetching data
            apiService.request('get_tournaments', params).then((response: any) => {
                if (response.code == 0) { // Check if the response indicates success
                    this.torneos = response.data; // Assign the fetched tournament data to the component state
                    this.torneos.forEach((input_template: any, index) => {
                        input_template.fecha_inicio = this.formatDate( // Format the start date of the tournament
                            input_template.fecha_inicio,
                        );
                        input_template.fecha_fin = this.formatDate( // Format the end date of the tournament
                            input_template.fecha_fin,
                        );
                        input_template.flag = false; // Initialize a flag for each tournament
                        input_template.loadingPlayers = true; // Initialize loading state for players
                    });
                    this.loading = false; // Set loading state to false after data is processed
                } else {
                    var error_mensaje = ''; // Initialize error message variable
                    if (response.error_code != undefined) { // Check if an error code is present
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Translate error message
                    }
                    if (error_mensaje == '') { // If no specific error message, set a generic error message
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                    // Configure modal to display the error message to the user
                    this.appComponent.modal = {
                        showModal: 'notification', // Type of modal to show
                        titleModal: this.$t('Error!'), // Title of the modal
                        messageModal: error_mensaje, // Message to display in the modal
                        buttonModal: this.$t('Aceptar'), // Text for the modal button
                        orderModal: 'closeModal', // Action to take when the modal is closed
                    };
                }
            });
        },
        /**
         * Loads the details of a tournament based on the provided ID and index.
         *
         * @param {number} id - The ID of the tournament to load details for.
         * @param {number} index - The index of the tournament in the list.
         */
        loadTorneosDetail(id, index) {
            // Initialize the tournament details array
            this.torneosDetail = [];

            // Parameters for the API request
            const params = {
                idTournament: id,
                State: this.stateFilter // Current state filter for the tournament
            };

            // Make an API request to get tournament details
            apiService.request('get_tournaments', params).then((response: any) => {
                // Check if the response indicates success
                if (response.code == 0) {
                    // Assign the tournament details to the component's state
                    this.torneosDetail = response.data;
                    // Update the ranking for the specific tournament index
                    this.torneos[index]['ranking'] = response.data['ranking'];

                    // Update the selected tournament ranking if the layout is not 3
                    if (this.config.layout != 3) {
                        this.torneoSelected['ranking'] = response.data['ranking'];
                    }
                } else {
                    // Initialize error message variable
                    var error_mensaje = '';

                    // Check if there is a specific error code in the response
                    if (response.error_code != undefined) {
                        // Translate the error message based on the error code
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }

                    // If no specific error message, set a generic error message
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }

                    // Show a modal notification with the error message
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
    },
});</script>

<template>
    <!-- Main container for the tournaments page, conditionally rendered based on layout configuration -->
    <div
        v-if="config.layout != 3"
        class="tournaments-page torneos pt-16 pb-16 relative"
        :style="{
      backgroundImage: 'url(' + background + ')',
      backgroundSize: 'cover',
    }"
    >
        <!-- Container for tournaments, with dynamic class based on layout configuration -->
        <div
            class="container-tournaments"
            :class="
        config.layout != undefined && config.layout == 3
          ? 'bg-base-300 rounded-2xl border-2 border-solid border-secondary'
          : 'text-neutral-content'
      "
        >
            <!-- Filter section for tournaments -->
            <div class="container-filter w-full flex justify-center items-center">
                <div class="filter col-12 col-md-6 flex gap-0 md:gap-16">
                    <!-- Filter for tournament type -->
                    <span
                        class="filters-section flex justify-center p-1 md:justify-center items-center bg-base-300 rounded-xl shadow-[inset_0px_-3px_0px_#0000001f] shadow-base-100/20"
                    >
            <strong
                :class="
                config.layout != undefined && config.layout == 3
                  ? 'text-neutral text-base md:text-xl'
                  : 'text-neutral'
              "
            >Tipo:</strong
            >
            <select
                v-model="typeFilter"
                @change="getTournaments()"
                :class="
                config.layout != undefined && config.layout == 3
                  ? 'rounded-full pl-2 md:pl-5 w-full'
                  : 'rounded-xl bg-input-background text-neutral'
              "
            >
              <option value="0">{{ $t('Todos los torneos') }}</option>
              <option v-if="appComponent.session.logueado" value="1">
                {{ $t('Torneos Registrados') }}
              </option>
            </select>
          </span>
                    <!-- Filter for tournament state -->
                    <span
                        class="filters-section flex justify-center items-center p-1 bg-base-300 rounded-xl shadow-[inset_0px_-3px_0px_#0000001f] shadow-base-100/20">
            <strong
                :class="
                config.layout != undefined && config.layout == 3
                  ? 'text-neutral text-base md:text-xl'
                  : 'text-neutral'
              "
            >Estado:</strong
            >
            <select
                v-model="stateFilter"
                @change="getTournaments()"
                :class="
                config.layout != undefined && config.layout == 3
                  ? 'rounded-full pl-2 md:pl-5 w-full'
                  : 'rounded-xl bg-input-background text-neutral'
              "
            >
              <option value="A">{{ $t('Activo') }}</option>
              <option value="I">{{ $t('Inactivo') }}</option>
            </select>
          </span>
                </div>
            </div>
            <!-- Loading indicator -->
            <div v-if="loading" class="flex flex-col justify-center items-center w-full h-auto my-32 gap-y-4">
                <h1 class="text-neutral text-2xl ">{{ $t('Cargando ...') }}</h1>
                <svg class="w-32 h-32 animate-spin fill-neutral" viewBox="0 0 32 32"
                     xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                          fill-rule='evenodd' />
                </svg>
            </div>
            <!-- Content displayed when not loading -->
            <div v-if="!loading" class="Container InfoContent">
                <div class="row justify-content-center">
                    <div class="container-tournaments col-12">
                        <!-- Preloader for tournaments -->
                        <div class="torneos-preloader" v-if="torneos.length < 0">
                            <div class="torneos-p1"></div>
                            <div class="torneos-p2"></div>
                            <div class="torneos-p3"></div>
                        </div>
                        <!-- Message when no tournaments are available -->
                        <div
                            v-if="torneos.length <= 0"
                            style="height: 335px"
                            class="text-none-coupon text-base text-neutral flex justify-center items-center"
                        >
                            <p class="text-center bg-base-100 px-4 py-2 rounded-3xl">
                                {{ $t('NO HAY TORNEOS ACTUALMENTE PARA MOSTRAR') }}
                            </p>
                        </div>
                        <!-- Loop through tournaments -->
                        <div v-for="(item, i) in torneos">
                            <div
                                @click="
                  item.more = false;
                  changeMain(item);
                  loadTorneosDetail(item.id, i);
                "
                                class="list-tournaments flex justify-between flex-col md:flex-row gap-y-2 bg-base-400 text-neutral"
                            >
                                <div class="tournament-logo hidden md:flex justify-center items-center h-full">
                                    <img :src="config.favicon" />
                                </div>
                                <div
                                    class="flex justify-center items-center md:justify-between w-full flex-col md:flex-row gap-y-4">
                                    <div class="container-title">
                                        <div
                                            class="tournament-title w-full md:w-auto h-auto text-center md:text-left boder-solid border-b-1 border-gray-300 md:border-none"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ item.nombre }}
                                        </div>
                                    </div>
                                    <!-- State of the tournament based on user session -->
                                    <div
                                        class="tournaments-state"
                                        v-if="!appComponent.session.logueado"
                                    >
                                        <div
                                            @click="
                      navigate('/menu/access');
                      appComponent.gAnalytics('play_now', item);
                    "
                                            v-if="
                      (item.type == null || item.type == '0' || item.userNeedSubscribe == true) &&
                      !item.userjoin &&
                      item.state != 2
                    "
                                            class="buttom"
                                            :class="{'bg-success text-white text-xs': appComponent.config.tournaments != undefined && appComponent.config.tournaments.buttonGreen != undefined && appComponent.config.tournaments.buttonGreen }"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ appComponent.config.tournaments == undefined || appComponent.config.tournaments.buttonGreen == undefined ? $t('JUEGA YA') : $t('SUSCRÍBETE')
                                            }}
                                        </div>
                                        <div
                                            @click="
                      navigate('/menu/access');
                      appComponent.gAnalytics('play_now', item);
                    "
                                            v-if="item.type == 1 && !item.userjoin"
                                            class="buttom border border-accent hover:bg-accent hover:text-neutral-content"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ $t('VIP') }}
                                        </div>
                                        <div
                                            @click="
                      navigate('/menu/access'),
                      appComponent.gAnalytics('play_now', item);
                    "
                                            v-if="
                      item.userjoin &&
                      item.state != 2 &&
                      (item.type == null || item.type == '0')
                    "
                                            class="buttom join border border-accent hover:bg-accent hover:text-neutral-content"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ $t('Jugando') }}
                                        </div>
                                    </div>
                                    <div
                                        class="tournaments-state"
                                        v-if="appComponent.session.logueado"
                                    >
                                        <div
                                            @click="
                        clickJoinUser(item);
                        appComponent.gAnalytics('play_now', item);
                      "
                                            v-if="
                        (item.type == null || item.type == '0') && !item.userjoin && item.state != 2
                      "
                                            class="buttom"
                                            :class="{'bg-success text-white text-sm': appComponent.config.tournaments != undefined && appComponent.config.tournaments.buttonGreen != undefined && appComponent.config.tournaments.buttonGreen }"
                                            v-class="{ vip: item.type === 1}"
                                        >
                                            {{ appComponent.config.tournaments == undefined || appComponent.config.tournaments.buttonGreen == undefined ? $t('JUEGA YA') : $t('SUSCRÍBETE')
                                            }}
                                        </div>
                                        <div
                                            @click="appComponent.gAnalytics('play_now', item)"
                                            v-if="item.type == 1 && !item.userjoin"
                                            class="buttom text-md border border-accent hover:bg-accent hover:text-neutral-content"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ $t('VIP') }}
                                        </div>
                                        <div
                                            @click="appComponent.gAnalytics('play_now', item)"
                                            v-if="item.userjoin && item.state != 2 && item.state != 2"
                                            class="buttom text-md border border-accent hover:bg-accent hover:text-neutral-content"
                                            v-class="{ vip: item.type === 1 }"
                                        >
                                            {{ $t('Jugando') }}
                                        </div>
                                    </div>
                                </div>
                                <div class="timeleft-container flex justify-center items-center">
                                    <div>
                                        <div class="finish pr-2" v-show="item.state == 0">
                                            {{ $t('Empieza en') }}
                                        </div>
                                        <div class="finish pr-2" v-show="item.state == 1">
                                            {{ $t('Finaliza en') }}
                                        </div>
                                        <div class="finish pr-2" v-show="item.state == 2">
                                            {{ $t('¡Finalizado!') }}
                                        </div>
                                    </div>
                                    <div class="timeleft text-md border-l border-primary">
                                        <div v-if="item.state == 0" class="grid">
                                            <vue-countdown
                                                :time="item.fecha_inicio"
                                                :interval="100"
                                                v-slot="{ days, hours, minutes, seconds }"
                                                @end="item.state = 1"
                                            >
                                                {{ days }} : {{ hours }} : {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                            <div class="tittle leading-3">
                                                <div>{{ $t('días') }}</div>
                                                <div>{{ $t('horas') }}</div>
                                                <div>{{ $t('min') }}</div>
                                                <div>{{ $t('seg') }}</div>
                                            </div>
                                        </div>
                                        <div v-if="item.state == 1">
                                            <vue-countdown
                                                :time="item.fecha_fin"
                                                :interval="100"
                                                v-slot="{ days, hours, minutes, seconds }"
                                                @end="item.state = 2"
                                            >
                                                {{ days }} : {{ hours }} : {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                            <div class="tittle leading-3">
                                                <div>{{ $t('días') }}</div>
                                                <div>{{ $t('horas') }}</div>
                                                <div>{{ $t('min') }}</div>
                                                <div>{{ $t('seg') }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <i v-if="!item.flag" class="text-xs"
                                        >
                                            <button
                                                type="button"
                                                class="detail-bono text-neutral bg-primary border-primary hover:border-primary-content"
                                                @click="appComponent.gAnalytics('show_view', item)"
                                            >
                                                VER
                                            </button>
                                        </i
                                        >
                                        <i v-if="item.flag" class="text-xs"
                                        >
                                            <button
                                                type="button"
                                                class="detail-bono text-neutral bg-primary border-primary hover:border-primary-content"
                                                @click="appComponent.gAnalytics('show_view', item)"
                                            >
                                                OCULTAR
                                            </button>
                                        </i
                                        >
                                    </div>
                                </div>
                            </div>
                            <!-- More details section for each tournament -->
                            <div v-show="item.more" class="more-details bg-base-300 text-neutral">
                                <div @click="item.more = false" class="close">X</div>
                                <div class="complet-descrip">
                                    <div class="text bg-base-200 text-neutral">
                                        <h2>{{ $t('Reglas') }}</h2>
                                        <p v-html="item.reglas" class="reglas"></p>
                                    </div>
                                    <div class="awards bg-base-200 text-neutral">
                                        <h3 class="bg-base-400 text-neutral">{{ $t('Premios') }}</h3>
                                        <div class="awards-contain">
                                            <div
                                                v-for="(value, name, index) in item.premios"
                                                @click="
                          item.selectAward = name;
                          appComponent.gAnalytics('awards', item);
                        "
                                                class="moneda text-neutral border-accent-focus"
                                            >
                                                {{ name }}
                                            </div>
                                            <table
                                                v-for="(value, name, index) in item.premios"
                                                v-show="item.selectAward === name"
                                                class="text-neutral"
                                            >
                                                <tr>
                                                    <th>{{ $t('Posición') }}</th>
                                                    <th>{{ $t('Descripción') }}</th>
                                                    <th>{{ $t('Valor') }}</th>
                                                </tr>
                                                <tr v-for="itemPremios in value">
                                                    <td>{{ itemPremios.pos }}</td>
                                                    <td
                                                        v-show="
                              itemPremios.tipo == 1 && itemPremios.desc == 2
                            "
                                                    >
                                                        {{ $t('Premio en crédito saldo Bonos') }}
                                                    </td>
                                                    <td
                                                        v-show="
                              itemPremios.tipo == 1 && itemPremios.desc == 0
                            "
                                                    >
                                                        {{ $t('Premio en crédito saldo Créditos') }}
                                                    </td>
                                                    <td v-show="itemPremios.tipo == 0">
                                                        {{ itemPremios.desc }}
                                                    </td>
                                                    <td v-show="itemPremios.tipo != 0">
                                                        {{ itemPremios.valor }}
                                                    </td>
                                                    <td v-show="itemPremios.tipo == 0">
                                                        <img :src="itemPremios.valor" />
                                                    </td>
                                                    <td
                                                        v-show="
                              itemPremios.tipo == 1 && itemPremios.desc == 1
                            "
                                                    >
                                                        <img
                                                            style="height: 50px; width: auto"
                                                            :src="itemPremios.valor !== 0 ? itemPremios.valor : 'https://images.virtualsoft.tech/m/msj0212T1701096278.png'"
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="convertion bg-base-200 text-neutral">
                                        <h3 class="bg-base-400 text-neutral">
                                            <span>{{ $t('Conversión Puntaje') }}</span>
                                            <span v-if="item.typeRank == 1">{{
                                                    $t('por Dinero')
                                                }}</span>
                                            <span v-if="item.typeRank == 2">{{
                                                    $t('por Lineas')
                                                }}</span>
                                        </h3>
                                        <div class="convertion-contain">
                                            <div
                                                v-for="(value, name, index) in item.rangos"
                                                @click="
                          item.selectRange = name;
                          appComponent.gAnalytics('conversion_score', item);
                        "
                                                class="moneda text-neutral border-accent-focus"
                                            >
                                                {{ name }}
                                            </div>
                                            <table
                                                v-for="(value, name, index) in item.rangos"
                                                v-show="item.selectRange === name"
                                                class="text-neutral"
                                            >
                                                <tr>
                                                    <th>{{ $t('Inicial') }}</th>
                                                    <th>{{ $t('Final') }}</th>
                                                    <th>{{ $t('Puntaje') }}</th>
                                                </tr>
                                                <tr v-for="itemConvertion in value">
                                                    <td>{{ itemConvertion.inicial }}</td>
                                                    <td>{{ itemConvertion.final }}</td>
                                                    <td>{{ itemConvertion.valor }}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <span v-if="!appComponent.session.logueado">
                    <div
                        @click="
                        navigate('/menu/access');
                        appComponent.gAnalytics('join', item);
                      "
                        v-if="
                        (item.type == null || item.type == '0') &&
                        !item.userjoin &&
                        item.state != 2
                      "
                        class="buttom join"
                        v-class="{ vip: item.type === 1 }"
                    >
                      {{ $t('UNIRSE') }}
                    </div>
                    <div
                        @click="appComponent.gAnalytics('join', item)"
                        v-if="
                        item.userjoin &&
                        item.state != 2 &&
                        (item.type == null || item.type == '0')
                      "
                        class="buttom join"
                        v-class="{ vip: item.type === 1 }"
                    >
                      {{ $t('Jugando') }}
                    </div>
                  </span>
                                    <span v-if="appComponent.session.logueado">
                    <div
                        @click="
                        clickJoinUser(item);
                        appComponent.gAnalytics('join', item);
                      "
                        v-if="
                        (item.type == null || item.type == '0') &&
                        !item.userjoin &&
                        item.state != 2
                      "
                        class="buttom join"
                        v-class="{ vip: item.type === 1 }"
                    >
                      {{ $t('UNIRSE') }}
                    </div>
                    <div
                        @click="appComponent.gAnalytics('join', item)"
                        v-if="
                        item.userjoin &&
                        item.state != 2 &&
                        (item.type == null || item.type == '0')
                      "
                        class="buttom join"
                        v-class="{ vip: item.type === 1 }"
                    >
                      {{ $t('Jugando') }}
                    </div>
                  </span>
                                </div>
                            </div>
                            <div v-show="item.flag" class="details-tournament bg-base-content text-neutral">
                                <div class="description-container">
                                    <div class="desc-contain">
                                        <img class="image" :src="item.image" />
                                        <div class="text-container" :id="item.id">
                                            <div class="text">
                                                <h2>{{ $t('Descripción') }}</h2>
                                                <p>{{ item.descripcion }}</p>
                                                <div
                                                    @click="
                            item.more = !item.more;
                            appComponent.gAnalytics('show_more', item);
                          "
                                                    class="rules bg-accent text-neutral text-center"
                                                >
                                                    {{ $t('VER MÁS') }}
                                                </div>
                                            </div>
                                            <div
                                            class="text-neutral text-center font-bold uppercase">
                                                {{ $t('Juegos de torneo') }}
                                            </div>
                                            <div class="games-list">
                                                <button
                                                    id="menuLeft"
                                                    class="button flex justify-center items-center"
                                                    @click="leftScroll(item.id)"
                                                >
                                                    <IconChevronLeft
                                                        :width="5"
                                                        :height="10"
                                                        :fill="'white'"
                                                    />
                                                </button>
                                                <button
                                                    id="menuRight"
                                                    class="button flex justify-center items-center text-primary"
                                                    @click="rightScroll(item.id)"
                                                >
                                                    <IconChevronRight
                                                        :width="5"
                                                        :height="10"
                                                        :fill="'currentColor'"
                                                    />
                                                </button>
                                                <div id="carousel" :class="'a' + item.id">
                                                    <div v-for="itemGames in item.games" class="slides">
                                                        <img
                                                            style="cursor: pointer"
                                                            @click="navigate(itemGames.url)"
                                                            :src="itemGames.img"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ranking-container">
                                    <div class="tittle bg-base-400 text-neutral">
                                        <h2>{{ $t('Ranking') }}</h2>
                                    </div>
                                    <div class="ranking-contain">
                                        <table>
                                            <tr>
                                                <th>#</th>
                                                <th>{{ $t('Usuario') }}</th>
                                                <th>{{ $t('Puntaje') }}</th>
                                            </tr>
                                            <tr
                                                v-for="itemRank in item.ranking"
                                                v-class="{ 'current-position': itemRank.is_user }"
                                            >
                                                <td>{{ itemRank.pos }}</td>
                                                <td>{{ itemRank.user }}</td>
                                                <td>{{ itemRank.valor }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Section for layout 3 when no tournament is selected -->
    <section
        v-if="
      config.layout != undefined &&
      config.layout == 3 &&
      torneoSelected == undefined
    "
        class="w-full h-full relative center-center bg-neutral-content"
    >
        <div class="absolute w-full h-[280px] md:h-[750px] top-0">
            <img
                v-if="
          config.tournaments != undefined &&
          config.tournaments[appComponent.country] != undefined &&
          config.tournaments[appComponent.country].background != undefined
        "
                :src="config.tournaments[appComponent.country].background"
                alt=""
                class="in w-full h-full object-cover object-top"
            />
            <div
                class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content"
            ></div>
        </div>
        <article
            class="w-full h-auto flex flex-col justify-center items-center relative"
        >
            <div
            class="absolute z-10 top-0 w-full flex flex-col justify-center items-start max-w-[1100px]"
            >
            <h2
                class="mt-10 w-fit text-neutral text-xl md:text-3xl font-bold relative inline-block"
            >
                {{ $t('TORNEOS') }}
                <span class="block border-b-4 border-primary rounded-full mt-1"></span>
            </h2>
            <div
                v-if="
                config.tournaments != undefined &&
                config.tournaments[appComponent.country] != undefined &&
                config.tournaments[appComponent.country].imgC != undefined
                "
                class="in w-[50%] max-h-[320px] mt-5 md:mt-0 hover:scale-105 cursor-pointer"
            >
                <img
                :src="config.tournaments[appComponent.country].imgC"
                alt=""
                class="in w-full h-full object-contain object-center"
                />
            </div>
            </div>

            <div
                class="pb-10 w-full flex flex-col justify-center items-center z-20 gap-10"
                :class="
          config.tournaments != undefined &&
          config.tournaments[appComponent.country] != undefined &&
          config.tournaments[appComponent.country].background != undefined &&
          config.tournaments[appComponent.country].imgC != undefined
            ? 'mt-[210px] md:mt-[450px]'
            : 'mt-[80px] md:mt-[100px]'
        "
            >
                <div
                    v-if="!loading"
                    v-for="(item, i) in torneos.filter(item => appComponent.casinoEnabled && appComponent.liveCasinoEnabled && appComponent.virtualesEnabled ?
          true :
          item.Type != undefined ? item.Type.TypeId == 4 : item.Type == undefined ? item : '')"
                    :key="i"
                    class="in w-11/12 md:w-[950px] min-h-[120px] md:min-h-[310px] flex justify-center items-center relative hover:scale-105 cursor-pointer"
                    @click="
            loadTorneosDetail(item.id, i); appComponent.gAnalytics('play_now', item);
            torneoSelected = item;
          "
                >
                    <img
                        v-if="item != undefined && item.background != undefined"
                        :src="item.background"
                        alt=""
                        class="w-full h-full object-contain object-center"
                    />
                    <div
                        v-if="item != undefined"
                        class="absolute top-0 w-full h-full flex justify-around items-center mx-auto px-4 md:px-10"
                    >
                        <div
                            class="in w-[30%] h-full flex flex-col justify-center items-center gap-1 md:gap-5"
                        >
                            <p
                                class="in w-full h-auto text-xs md:text-2xl font-bold text-white text-center"
                            >
                                {{ item.nombre }}
                            </p>
                            <div class="flex flex-col justify-center items-center">
                                <p
                                    v-if="item.state == 0"
                                    class="text-[8px] w-24 h-4 md:w-auto md:text-sm flex justify-center items-center font-medium text-white mb-1"
                                >
                                    {{ $t('Empieza en') }}
                                </p>
                                <p
                                    v-if="item.state == 1"
                                    class="text-[8px] w-24 h-4 md:w-auto md:text-sm flex justify-center items-center font-medium text-white mb-1"
                                >
                                    {{ $t('Finaliza en') }}
                                </p>
                                <p
                                    v-if="item.state == 2"
                                    class="text-[8px] w-24 h-4 md:w-auto md:text-sm flex justify-center items-center font-medium text-white mb-1"
                                >
                                    {{ $t('¡Finalizado!') }}
                                </p>
                                <div
                                    v-if="item.state == 0"
                                    class="bg-[#E0E0E0] rounded md:rounded-xl p-0 md:p-1 h-7 md:h-14 w-full"
                                >
                                    <vue-countdown
                                        :time="item.fecha_inicio"
                                        :interval="100"
                                        v-slot="{ days, hours, minutes, seconds }"
                                        @end="item.state = 1"
                                        class="grid grid-cols-4 text-black"
                                    >
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ days }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ hours }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ minutes }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ seconds }}
                                        </div>
                                    </vue-countdown>
                                    <div class="grid grid-cols-4 text-black -mt-3 md:mt-0">
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('días') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('horas') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('min') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('seg') }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="item.state == 1"
                                    class="bg-[#E0E0E0] rounded md:rounded-xl p-0 md:p-1 h-7 md:h-14 w-full"
                                >
                                    <vue-countdown
                                        :time="item.fecha_fin"
                                        :interval="100"
                                        v-slot="{ days, hours, minutes, seconds }"
                                        @end="item.state = 2"
                                        class="grid grid-cols-4 text-black"
                                    >
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ days }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ hours }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ minutes }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-sm md:text-2xl font-semibold"
                                        >
                                            {{ seconds }}
                                        </div>
                                    </vue-countdown>
                                    <div class="grid grid-cols-4 text-black -mt-3 md:mt-0">
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('días') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('horas') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('min') }}
                                        </div>
                                        <div
                                            class="flex justify-center items-center w-6 md:w-12 text-[8px] md:text-xs"
                                        >
                                            {{ $t('seg') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                @click="
                  clickJoinUser(item);
                  appComponent.gAnalytics('play_now', item);
                "
                                v-if="
                  (item.type == null || item.type == '0' || item.userNeedSubscribe == true) &&
                  !item.userjoin &&
                  appComponent.session.logueado &&
                  !appComponent.infoApp
                "
                                class="h-4 md:h-10 bg-success2 rounded-lg px-2 md:px-4 font-bold text-[6px] md:text-base text-white flex justify-center items-center gap-1 md:gap-2 hover:bg-success2/80 hover:scale-105"
                            >
                                <font-awesome-icon icon="fa-solid fa-play" />
                                <span class="flex justify-center items-center mt-[2px]">{{
                                        $t('JUEGA YA')
                                    }}</span>
                            </button>
                            <button
                                @click="appComponent.gAnalytics('play_now', item)"
                                v-if="
                  item.userjoin &&
                  item.state != 2 &&
                  item.state != 2 &&
                  appComponent.session.logueado &&
                  !appComponent.infoApp
                "
                                class="h-4 md:h-10 bg-success2 rounded-lg px-2 md:px-4 font-bold text-[6px] md:text-base text-white flex justify-center items-center gap-1 md:gap-2 hover:bg-success2/80 hover:scale-105"
                            >
                <span class="flex justify-center items-center mt-[2px]">{{
                        $t('Jugando')
                    }}</span>
                            </button>
                            <button
                                @click="appComponent.gAnalytics('play_now', item)"
                                v-if="
                  item.type == 1 &&
                  !item.userjoin &&
                  appComponent.session.logueado &&
                  !appComponent.infoApp
                "
                                class="h-4 md:h-10 bg-success2 rounded-lg px-2 md:px-4 font-bold text-[6px] md:text-base text-white flex justify-center items-center gap-1 md:gap-2 hover:bg-success2/80 hover:scale-105"
                            >
                <span class="flex justify-center items-center mt-[2px]">{{
                        $t('VIP')
                    }}</span>
                            </button>
                        </div>
                        <div
                            v-if="item != undefined && item.imgCentro != undefined"
                            class="w-[40%] h-[110%] flex justify-center items-center"
                        >
                            <img
                                :src="item.imgCentro"
                                alt=""
                                class="animationImg in w-full h-full object-contain object-center"
                            />
                        </div>
                        <div
                            v-if="item != undefined && item.imgDerecha != undefined"
                            class="w-[30%] h-[70%] flex flex-col justify-center items-center"
                        >
                            <img
                                :src="item.imgDerecha"
                                alt=""
                                class="in w-full h-full object-contain object-center"
                            />
                        </div>
                        <!-- -->
                        <div 
                            v-if="item.hasCounter === '1'"
                            class="w-[177px] flex items-center justify-center h-9 absolute -bottom-0 bg-primary rounded-xl">
                            <div class="w-[175px] h-8 flex justify-center items-center bg-base-300 rounded-xl relative overflow-hidden">
                                <img src="https://images.virtualsoft.tech/m/msj0212T1756221644.png" 
                                     alt="" 
                                     class="absolute inset-0 w-full h-full object-cover z-0 opacity-30">
                            
                                <div class="flex justify-center items-center z-10 absolute gap-x-4">
                                    <img src="https://images.virtualsoft.tech/m/msj0212T1756221870.png" 
                                         alt="" 
                                         class="w-6 h-5 mr-2">
                                
                                    
                                    <span class="text-neutral text-sm font-semibold" v-if="!item.loadingPlayers">
                                      {{ item.totalPlayers || 0 }} {{ $t('Participando') }}
                                    </span>
                                    <span v-else class="flex items-center justify-center">
                                      <svg class="animate-spin h-5 w-5 text-neutral" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                      </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </section>
    <!-- Section for selected tournament details -->
    <section
        v-if="torneoSelected != undefined"
        class="w-full h-full z-30 relative flex flex-col justify-center items-center bg-neutral-content"
    >
        <div class="absolute w-full h-[500px] md:h-[600px] top-0">
            <img
                v-if="torneoSelected.imgBg2 != '' && torneoSelected.imgBg2 != undefined"
                :src="torneoSelected.imgBg2"
                alt=""
                class="in w-full h-full object-cover object-top"
            />
            <div
                class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content"
            ></div>
        </div>
        <article
            class="w-11/12 h-auto flex flex-col justify-center items-center relative px-8 gap-4 max-w-[1300px] ml-0 lg:-ml-[69px]"
        >
            <div class="w-full flex flex-col justify-center items-center my-5 gap-2">
                <div
                    class="w-full flex flex-col justify-center items-center gap-6 md:gap-2"
                >
                    <div class="w-full flex justify-start items-center">
                        <button
                            class="w-32 md:w-44 bg-secondary flex justify-center items-center gap-2 rounded-lg text-white text-base shadow-sm shadow-gray-500 hover:bg-secondary/75 hover:scale-105"
                            @click="torneoSelected = undefined"
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-left" />
                            <span class="flex justify-center items-center mt-[2px]">{{
                                    $t('Atrás')
                                }}</span>
                        </button>
                    </div>
                    <h2
                        class="in w-full text-white text-3xl md:text-5xl font-bold text-center max-w-[350px] md:max-w-3xl break-words"
                    >
                        {{ torneoSelected.nombre }}
                    </h2>
                </div>
                <p
                    class="in text-sm md:text-lg text-white text-center font-normal w-96 md:w-full"
                >
                    {{ $t(torneoSelected.descripcion) }}
                </p>
            </div>
            <div
                class="w-full flex flex-col lg:flex-row justify-center items-center gap-4"
            >
                <div
                    v-if="torneoSelected.imgC2 != '' && torneoSelected.imgC2 != undefined"
                    class="w-auto md:w-[450px] h-72 md:h-[600px] my-5"
                >
                    <img
                        :src="torneoSelected.imgC2"
                        alt=""
                        class="in w-full h-full object-contain object-center"
                    />
                </div>
                <div
                    class="w-full max-w-[600px] flex flex-col justify-center items-center gap-6 mt-5"
                >
                    <div
                        v-if="!appComponent.infoApp"
                        class="in w-full flex flex-col justify-center items-center gap-2"
                    >
            <span class="text-white text-base font-semibold text-center">{{
                    $t('Juegos de torneo')
                }}</span>
                        <CasinoSlider3V3 :gamesList="torneoSelected.games" :category="'TournamentId:' + torneoSelected.id" />
                    </div>
                    <div
                        class="in w-full rounded-lg flex flex-col justify-center items-center table"
                    >
                        <h2
                            class="h-10 w-full flex justify-center items-center text-xl md:text-2xl text-white font-semibold rounded-t-xl"
                        >
                            {{ $t('Ranking') }}
                        </h2>
                        <div class="w-full h-80 text-white p-2 gap-1">
                            <div
                                class="h-5 rounded-full w-full flex justify-center items-center text-xs md:text-sm"
                            >
                                <th class="w-[30%] text-center">{{ $t('Puesto') }}</th>
                                <th class="w-[40%] text-center">{{ $t('Usuario') }}</th>
                                <th class="w-[30%] text-center">{{ $t('Puntaje') }}</th>
                            </div>
                            <hr class="w-full bg-gray-500 my-2" />
                            <div
                                class="h-auto max-h-[235px] flex flex-col justify-start items-center gap-1 overflow-x-hidden overflow-y-auto"
                            >
                                <div
                                    v-for="(itemRank, index) in torneoSelected.ranking"
                                    class="bg-[#3E4654] w-full h-8 flex justify-center items-center text-sm rounded-lg"
                                >
                                    <td
                                        class="w-[30%] text-center flex justify-center items-center"
                                    >
                                        <img
                                            v-if="index == 0"
                                            src="https://images.virtualsoft.tech/m/msjT1685624959.png"
                                            alt=""
                                        />
                                        <img
                                            v-else-if="index == 1"
                                            src="https://images.virtualsoft.tech/m/msjT1685625030.png"
                                            alt=""
                                        />
                                        <img
                                            v-else-if="index == 2"
                                            src="https://images.virtualsoft.tech/m/msjT1685625052.png"
                                            alt=""
                                        />
                                        <span v-else>{{ itemRank.pos }}</span>
                                    </td>
                                    <td
                                        class="w-[40%] text-center flex justify-center items-center gap-2"
                                    >
                                        <img
                                            src="https://images.virtualsoft.tech/m/msjT1685626860.png"
                                            alt=""
                                        /><span>{{ itemRank.user }}</span>
                                    </td>
                                    <td class="w-[30%] text-center">{{ itemRank.valor }}</td>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center w-full">
                        <button
                            @click="
                clickJoinUser(torneoSelected);
                appComponent.gAnalytics('join', torneoSelected);
              "
                            v-if="
                (torneoSelected.type == null || torneoSelected.type == '0' || torneoSelected.userNeedSubscribe == true) &&
                !torneoSelected.userjoin &&
                torneoSelected.state != 2 &&
                appComponent.session.logueado &&
                !appComponent.infoApp
              "
                            class="in w-auto md:w-40 h-auto md:h-14 bg-success2 rounded-lg px-4 py-1 text-base md:text-2xl text-white font-semibold shadow-md shadow-[#006D1F] hover:bg-success2/80 hover:scale-105"
                        >
                            {{ $t('UNIRSE') }}
                        </button>
                        <button
                            @click="
                appComponent.showModalLogin = true;
                appComponent.gAnalytics('join', torneoSelected);
              "
                            v-if="
                (torneoSelected.type == null || torneoSelected.type == '0') &&
                !torneoSelected.userjoin &&
                torneoSelected.state != 2 &&
                !appComponent.session.logueado &&
                !appComponent.infoApp
              "
                            class="in w-auto md:w-40 h-auto md:h-14 bg-success2 rounded-lg px-4 py-1 text-base md:text-2xl text-white font-semibold shadow-md shadow-[#006D1F] hover:bg-success2/80 hover:scale-105"
                        >
                            {{ $t('UNIRSE') }}
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="in text-white flex justify-center items-center flex-col gap-2 w-full max-w-[700px] mt-5"
            >
                <div
                    class="h-96 w-full overflow-y-auto text-center text-white my-5 p-2 rounded-xl border-2 border-solid border-neutral"
                >
                    <p v-html="torneoSelected.reglas" class="text-neutral"></p>
                </div>
                <div class="grid gap-8">
                    <div class="grid place-content-center gap-6">
                        <h4 class="text-lg font-semibold text-center text-neutral">
                            {{ $t('Conversion de puntaje') }}
                        </h4>
                        <div
                            class="table w-72 mx-auto flex flex-col justify-center items-center shadow-inner shadow-secondary-content border-2 border-solid border-accent-focus rounded-lg p-2"
                        >
                            <h5 class="font-bold text-center text-lg">
                                {{ appComponent.session.moneda }}
                            </h5>
                            <table
                                v-for="(value, name, index) in torneoSelected.rangos"
                                class="text-center"
                            >
                                <tr>
                                    <th>{{ $t('Inicial') }}</th>
                                    <th>{{ $t('Final') }}</th>
                                    <th>{{ $t('Puntaje') }}</th>
                                </tr>
                                <tr v-for="itemConvertion in value">
                                    <td>{{ itemConvertion.inicial }}</td>
                                    <td>{{ itemConvertion.final }}</td>
                                    <td>{{ itemConvertion.valor }}</td>
                                </tr>
                            </table>
                        </div>
                        <div
                            class="table w-full mx-auto flex flex-col justify-center items-center shadow-inner shadow-secondary-content border-2 border-solid border-accent-focus rounded-lg p-2"
                        >
                            <h5 class="font-medium text-center">{{ $t('Premios') }}</h5>
                            <table
                                v-for="(value, name, index) in torneoSelected.premios"
                                class="text-center"
                            >
                                <tr>
                                    <th>{{ $t('Posición') }}</th>
                                    <th>{{ $t('Descripción') }}</th>
                                    <th>{{ $t('Valor') }}</th>
                                </tr>
                                <tr v-for="itemPremios in value">
                                    <td>{{ itemPremios.pos }}</td>
                                    <td v-show="itemPremios.tipo == 1 && itemPremios.desc == 2">
                                        {{ $t('Premio en crédito saldo Bonos') }}
                                    </td>
                                    <td v-show="itemPremios.tipo == 1 && itemPremios.desc == 0">
                                        {{ $t('Premio en crédito saldo Créditos') }}
                                    </td>
                                    <td v-show="itemPremios.tipo == 0">
                                        {{ itemPremios.desc }}
                                    </td>
                                    <td v-show="itemPremios.tipo != 0">
                                        {{ itemPremios.valor }}
                                    </td>
                                    <td v-show="itemPremios.tipo == 0 && itemPremios.valor.startsWith('http')">
                                        <img :src="itemPremios.valor" />
                                    </td>
                                    <td v-show="itemPremios.tipo == 1 && itemPremios.desc == 1">
                                        {{ itemPremios.valor }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div
                        v-if="
              torneoSelected.imgAwards != '' &&
              torneoSelected.imgAwards != undefined
            "
                        class="w-full flex justify-center items-center gap-2 mx-auto mb-10"
                    >
                        <img
                            :src="torneoSelected.imgAwards"
                            alt=""
                            class="w-full h-full object-contain object-center"
                        />
                    </div>
                </div>
            </div>
        </article>
    </section>
    <!-- Loading indicator for layout 3 -->
    <div v-if="loading && config.layout == 3" class="flex flex-col justify-center items-center w-full h-screen gap-y-4">
        <h1 class="text-neutral text-2xl ">{{ $t('Cargando ...') }}</h1>
        <svg class="w-32 h-32 animate-spin fill-neutral" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
            <path clip-rule='evenodd'
                  d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                  fill-rule='evenodd' />
        </svg>
    </div>
</template>

<style scoped>
.table {
    background: linear-gradient(180deg, #313649 5.62%, #1b213e 99.36%);
    border: 2px solid #535872;
}

.animationImg {
    animation: zoom 10s ease 0s infinite;
}

@keyframes zoom {
    0% {
        scale: 1;
    }
    50% {
        scale: 1.07;
    }
    100% {
        scale: 1;
    }
}

@media screen and (max-width: 500px) {
    .torneos-p1,
    .torneos-p2,
    .torneos-p3 {
        height: 75px;
    }
}

@media (max-width: 810px) {
    .tournament-box select {
        width: calc(100% - 20px) !important;
    }
}

/* .container-filter {
  height: 34px;
} */
.filter {
    display: inline-block;
    /* background: rgba(0, 0, 0, 0.9); */
    padding: 6px 0px;
    border-radius: 5px;
    /* float: right; */
    /* border: 1px solid #ffffff73; */
    font-size: 13px;
    width: 50%;
    padding: 20px 0px 10px 0;
}

span.filters-section {
    width: calc(100% / 2);
    display: inline-block;
}

strong {
    padding-left: 0;
    padding-left: 0;
    padding: 10px 10px;
    display: inline-block;
    font-size: 14px;
}

span.filters-section:last-child {
    padding-left: 10px;
}

select {
    padding: 5px 6px;
    border-radius: 3px;
    color: grey;
    width: calc(100% - 80px);
    display: inline-block;
    /* float: right; */
    height: 35px;
}

label {
    padding-right: 8px;
}

.filters-section strong {
    color: black;
}

.container-tournaments {
    margin: 0 auto;
    max-width: 1200px;
    color: white;
    padding: 0 5px;
    min-height: 432px;
}

.container-tournaments div::-webkit-scrollbar-track,
.container-tournaments p::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    border-radius: 10px;
    background-color: none;
}

.container-tournaments div::-webkit-scrollbar,
.container-tournaments p::-webkit-scrollbar {
    width: 6px;
    background-color: none;
    height: 6px;
}

.container-tournaments div::-webkit-scrollbar-thumb,
.container-tournaments p::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
}

.container-tournaments > div {
    padding-bottom: 10px;
}

.container-tournaments .more-details {
    position: absolute;
    height: auto;
    padding: 20px 25px;
    border-radius: 5px;
    z-index: 20;
    width: 1200px;
    animation: popup-enter 0.3s ease-in-out;
    margin-top: 10px;
}

.container-tournaments .more-details h3 {
    font-size: 14px;
    padding-bottom: 10px;
}

.container-tournaments .more-details .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 14px;
    border-bottom: none;
    font-weight: bold;
}

.container-tournaments .more-details:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 28px;
    width: 0;
    height: 0;
    border-width: 0 15px 15px;
    border-style: solid;
    border-color: transparent transparent hsl(var(--b3));
}

.container-tournaments .more-details > div {
    display: inline-block;
    vertical-align: top;
    padding: 16px 5px;
    margin-bottom: 10px;
}

.container-tournaments .more-details .complet-descrip {
    width: calc(76% - 10px);
}

.container-tournaments .more-details .complet-descrip > div {
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.container-tournaments .more-details .complet-descrip .awards img {
    width: auto;
    height: auto;
    max-height: 80px;
    /*background: url(../images/torneo5_premio.png?v=498) no-repeat 0 50%/contain;*/
}

.container-tournaments .more-details .complet-descrip .text {
    padding: 16px 18px;
    border-radius: 5px;
    max-height: 300px;
    overflow-y: auto;
}

.container-tournaments .more-details .complet-descrip .text h3 {
    font-size: 20px;
}

.container-tournaments .more-details .complet-descrip .awards {
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 16px 18px;
    width: calc(50% - 36px);
}

.container-tournaments .more-details .complet-descrip .awards h3 {
    position: relative;
    top: -15px;
    padding: 7px 18px;
    border-radius: 5px 5px 0 0;
    left: -17px;
    width: calc(100% + 36px);
    margin: 0;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
.moneda {
    border: 2px solid black;
    border-radius: 0 0 5px 5px;
    font-weight: bold;
    border-top: 0;
    display: inline-block;
    padding: 3px 10px;
    position: relative;
    left: -17px;
    top: -15px;
    margin-right: -2px;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
td,
.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
th {
    border-right: 1px solid #d1d1d1;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
table {
    border-collapse: collapse;
    width: 100%;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
th {
    text-align: left;
    padding: 4px 15px;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
th:last-child {
    border-right: none;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
td {
    padding: 4px 15px;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
td:last-child {
    border-right: none;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
tr
td:first-child {
    width: 46px;
}

.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
tr
td:nth-child(2) {
    width: 176px;
}

.container-tournaments .more-details .right {
    width: calc(23% - 2px);
}

.container-tournaments .more-details .right .visibility > div {
    padding: 7px 13px;
    display: inline-block;
    width: calc(100% / 2 - 28px);
    border-radius: 2px;
    font-weight: bold;
    text-align: center;
}

.container-tournaments .more-details .right .visibility > div.vip {
    background: #b48303;
    color: white;
}

.container-tournaments .more-details .right .convertion h3 {
    position: relative;
    top: -15px;
    padding: 7px 18px;
    border-radius: 5px 5px 0 0;
    width: 226px;
    left: -17px;
    margin: 0;
}

.container-tournaments .more-details .right .convertion-contain .moneda {
    border: 2px solid black;
    border-radius: 0 0 5px 5px;
    font-weight: bold;
    border-top: 0;
    display: inline-block;
    padding: 3px 10px;
    position: relative;
    left: -17px;
    top: -15px;
    margin-right: -2px;
}

.container-tournaments .more-details .right .convertion-contain td,
.container-tournaments .more-details .right .convertion-contain th {
    border-right: 1px solid #d1d1d1;
}

.container-tournaments .more-details .right .convertion-contain table {
    border-collapse: collapse;
    width: 100%;
}

.container-tournaments .more-details .right .convertion-contain th {
    text-align: left;
    padding: 4px 15px;
}

.container-tournaments .more-details .right .convertion-contain th:last-child {
    border-right: none;
}

.container-tournaments .more-details .right .convertion-contain td {
    padding: 4px 15px;
}

.container-tournaments .more-details .right .convertion-contain td:last-child {
    border-right: none;
}

.container-tournaments .more-details .right .join {
    font-size: 28px;
    font-weight: bold;
    border-radius: 6px;
    padding: 5px 12px 4px;
    transition: 0.5s;
    color: white;
    text-align: center;
    background: #b48303;
}

.container-tournaments .more-details .right .join:hover {
    color: white;
    background: #f4b001;
}

.container-tournaments .more-details .right .join.disabled {
    background: #f1f1f1;
}

.container-tournaments .more-details .right .join.disabled:hover {
    background: #f1f1f1;
}

.container-tournaments .more-details .right > div {
    background: #f7f7f7;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 16px 18px;
}

.container-tournaments .list-tournaments {
    width: 100%;
    border-radius: 5px;
    padding: 10px 7px;
}

.container-tournaments .list-tournaments:hover {
    background: white;
    border-bottom: 1px solid #b48303;
    border-radius: 5px;
}

.container-tournaments .list-tournaments > div {
    display: inline-block;
    vertical-align: top;
}

.container-tournaments .list-tournaments .tournament-title {
    font-size: 18px;
    height: 35px;
    font-weight: bold;
    padding-left: 10px;
}

.container-tournaments .list-tournaments .tournament-title.vip:before {
    content: "VIP";
    display: inline-block;
    color: #ffffff;
    background: #991eae;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.6);
    position: relative;
    height: 10px;
    font: 8px/11px Arial, Helvetica, sans-serif;
    padding: 0 2px;
    border-radius: 3px 0px 3px 0px;
    /* right: 11px; */
    top: 5px;
    box-sizing: border-box;
    left: 4px;
    /* float: right; */
}

.container-tournaments .list-tournaments .tournament-logo {
    width: 45px;
    height: 35px;
    /*background: url('https://images.doradobet.com/site/doradobet/logo-d-color.svg?v=498') no-repeat 0 50%/contain;*/
}

.container-tournaments .list-tournaments .timeleft-container {
    float: right;
}

.container-tournaments .list-tournaments .timeleft-container .timeleft {
    padding-left: 7px;
    font-size: 24px;
    /*line-height: 1.6;*/
    width: 190px;
}

.container-tournaments .list-tournaments .timeleft-container .timeleft .time {
    height: 26px;
    font-weight: bold;
}

.container-tournaments .list-tournaments .timeleft-container .timeleft .tittle {
    font-size: 9px;
    line-height: 10px;
}

.container-tournaments
.list-tournaments
.timeleft-container
.timeleft
.tittle
div {
    width: calc(100% / 4);
    font-size: 9px;
    display: inline-block;
    text-align: center;
    margin-right: -1.9px;
}

.container-tournaments .list-tournaments .buttom {
    float: right;
    font-size: 21px;
    font-weight: bold;
    border-radius: 6px;
    padding: 7px 12px 6px;
    transition: 0.5s;
    margin-left: 20px;
    width: auto;
    text-align: center;
}


.container-tournaments .list-tournaments .buttom.vip:hover {
    color: white;
    background: #991eae;
    border-color: #991eae;
}

.container-tournaments .details-tournament {
    animation: popup-enter 0.3s ease-in-out;
    width: 100%;
    height: auto;
    margin-top: 10px;

    position: relative;
    display: inline-block;
}

.container-tournaments .details-tournament > div {
    border-radius: 5px;
    display: inline-block;
    vertical-align: top;
    height: auto;
    min-height: 265px;
    padding: 16px 18px;
}

.container-tournaments .details-tournament .description-container {
    width: calc(100% - 265px);
    margin-right: 6px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain {
    height: auto;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
> div {
    display: inline-block;
    vertical-align: top;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container {
    padding-left: 10px;
    height: auto;
    width: calc(74% - 5px);
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.text {
    width: 100%;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.text
h3 {
    font-size: 16px;
    padding: 0 0 10px 0px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.text
p {
    height: 39px;
    overflow-y: auto;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.text
.rules {
    /*float: left;*/
    padding: 5px 10px;
    margin: 8px 0;
    font-weight: bold;
    max-width: 105px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.text
.rules:hover {
    background: #d8d8d8;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.games-list {
    border: 1px solid #3d517d;
    border-radius: 5px;
    padding: 5px 8px 4px;
    position: relative;
    padding-left: 25px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.games-list
#carousel {
    width: 100%;
    height: 100px;
    background-color: none;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.games-list
#carousel
img {
    height: 90px;
    padding: 0 4px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.text-container
.games-list
#carousel
.slides {
    display: inline-block;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.image {
    width: 25%;
    /*height: 100%;*/
    display: inline-block;
    /*background: url(../images/TORNERO-playngo.jpg?v=498) no-repeat 0 50%/contain;*/
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.wrapper {
    background: #efefef;
    box-shadow: 1px 1px 10px #999;
    margin: auto;
    text-align: center;
    position: relative;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-bottom: 20px !important;
    width: 800px;
    padding-top: 5px;
}

.container-tournaments
.details-tournament
.description-container
.desc-contain
.scrolls {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 80px;
    white-space: nowrap;
}

.container-tournaments .details-tournament .ranking-container {
    width: 255px;
    min-width: 255px;
}

.container-tournaments .details-tournament .ranking-container .tittle {
    padding-bottom: 5px;
    background: #b48303;
    position: relative;
    top: -16px;
    padding: 8px 15px;
    width: calc(100% + 36px);
    left: -18px;
    border-radius: 5px 5px 0 0;
    font-size: 14px;
}

.container-tournaments .details-tournament .ranking-container .tittle:after {
    content: "";
    position: absolute;
    left: auto;
    right: 0;
    bottom: 0;
    width: 0px;
    height: 0;
    border-bottom: 8px solid #545454;
    border-left: 226px solid transparent;
}

.container-tournaments .details-tournament .ranking-container .ranking-contain {
    overflow-y: auto;
    max-height: 178px;
    font-size: 12px;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
td,
.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
th {
    border-right: 1px solid hsl(var(--p));
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
table {
    border-collapse: collapse;
    width: 100%;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
th {
    text-align: left;
    padding: 4px 15px;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
th:last-child {
    border-right: none;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
td {
    padding: 4px 15px;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
td:last-child {
    border-right: none;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position {
    position: relative;
    width: calc(100% + 36px);
    left: -18px;
    padding-top: 2px;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
td,
.container-tournaments
.details-tournament
.ranking-container
.current-position
th {
    border-right: 1px solid #2f2f2f;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position {
    border-collapse: collapse;
    width: 100%;
    background: #505050;
    font-weight: bold;
    border-radius: 0 0 5px 5px;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
th {
    text-align: left;
    padding: 4px 15px;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
th:last-child {
    border-right: none;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
td {
    padding: 4px 15px;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
td:last-child {
    border-right: none;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
tr
td:first-child {
    width: 21.2px;
    padding-left: 33px;
}

.container-tournaments
.details-tournament
.ranking-container
.current-position
tr
td:nth-child(2) {
    width: 65px;
}

.conteiner.show-fix .second-nav-block,
.conteiner.show-game .second-nav-block {
    display: none;
}



.container-tournaments .more-details .close,
.container-tournaments .list-tournaments,
.rules,
.container-tournaments .more-details .right .convertion-contain .moneda,
.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
.moneda,
.container-tournaments .more-details .right .join,
.container-tournaments .list-tournaments .buttom {
    cursor: pointer;
}

/*popup animation*/
@keyframes popup-bg-enter {
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes popup-bg-closed {
    0% {
        display: block !important;
        opacity: 1;
    }
    1% {
        display: block;
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none !important;
    }
}

@keyframes popup-enter {
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes popup-closed {
    0% {
        display: block !important;
        opacity: 1;
    }
    1% {
        display: block;
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
        display: none !important;
    }
}

/* body .torneos {
  background: url(https://images.virtualsoft.tech/m/msjT1599154488.png) !important;
} */

.container-tournaments .list-tournaments .container-title i {
    display: none;
}

.container-tournaments .list-tournaments .container-expand {
    float: right;
}

.container-tournaments .list-tournaments .container-expand i {
    height: 26px;
    padding-top: 7px;
    padding-left: 5px;
}

@media screen and (max-width: 730px) {
    .container-tournaments .list-tournaments .timeleft-container {
        margin: 5px 0;
    }

    .container-tournaments .list-tournaments .buttom {
        font-size: 18px !important;
        margin-left: 0px !important;
    }

    .container-tournaments .list-tournaments .tournament-logo {
        display: none;
    }

    .container-tournaments .list-tournaments .tournament-title {
        padding-left: 0px !important;
        overflow: hidden;
        width: calc(100% - 85px);
        display: inline-block;
    }

    .container-tournaments .list-tournaments .container-title {
        width: 100%;
    }

    .container-tournaments .list-tournaments .container-title i {
        /* float: right; */
        display: inline-block;
    }

    .container-tournaments .list-tournaments .container-expand {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .container-tournaments .details-tournament .description-container {
        /* width: calc(100% - 272px) !important; */
        width: 100% !important;
        min-height: 218px;
        height: auto !important;
    }

    .container-tournaments .details-tournament .ranking-container {
        width: 100% !important;
        margin: 10px 0;
    }

    .container-tournaments
    .details-tournament
    .description-container
    .desc-contain
    .image {
        width: 100% !important;
        height: auto !important;
    }

    .container-tournaments
    .details-tournament
    .description-container
    .desc-contain
    .text-container {
        padding-left: 0px !important;
        width: 100% !important;
    }

    .container-tournaments
    .details-tournament
    .description-container
    .desc-contain
    .text-container
    .text {
        margin: 10px 0;
    }

    .container-tournaments
    .details-tournament
    .description-container
    .desc-contain
    .text-container
    .text
    p {
        height: auto !important;
    }

    .container-tournaments .more-details .complet-descrip {
        width: 100% !important;
    }

    .container-tournaments .more-details .right {
        width: calc(100% - 10px) !important;
        padding: 0 5px !important;
    }

    .container-tournaments .more-details .right .convertion h3 {
        width: calc(100% + 36px) !important;
    }

    .container-tournaments .more-details > div {
        padding-bottom: 0 !important;
    }

    .container-tournaments .more-details .complet-descrip .awards {
        width: 100% !important;
        margin-bottom: 0 !important;
    }
}

@media screen and (min-width: 769px) and (max-width: 980px) {
    .container-tournaments .details-tournament .description-container {
        width: calc(100% - 272px) !important;
    }
}

@media screen and (max-width: 1220px) {
    .container-tournaments .more-details {
        width: calc(100% - 50px) !important;
    }

    .container-tournaments .details-tournament {
        height: auto !important;
    }
}

@media screen and (min-width: 769px) and (max-width: 1220px) {
    .container-tournaments .more-details .complet-descrip {
        width: calc(100% - 290px) !important;
    }

    .container-tournaments .more-details .right {
        min-width: 260px;
    }
}

@media screen and (max-width: 768px) {
    .container-filter .filter {
        width: 98%;
    }

    .container-tournaments .details-tournament .description-container {
        width: 100%;
    }

    .container-tournaments .details-tournament .ranking-container {
        width: 100%;
        margin: 10px 0;
    }

    .container-tournaments .more-details .complet-descrip .awards {
        width: 100%;
    }

    .tournaments .more-details .complet-descrip {
        width: 100% !important;
    }

    .container-tournaments .more-details .right {
        width: 100% !important;
        padding: 0 5px !important;
    }

    .container-tournaments .more-details .right .convertion h3 {
        width: calc(100% + 36px);
    }
}

.Framework.InfoPage {
    background: transparent;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
th:first-child {
    padding: 0;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
td:first-child {
    padding: 0;
}

.container-tournaments .details-tournament .ranking-container .ranking-contain {
    overflow-x: hidden;
}

.container-tournaments
.details-tournament
.ranking-container
.ranking-contain
td {
    padding: 4px 10px;
}

.tournament-box select,
.tournament-box select.FormInput {
    margin: 0 10px;
    max-width: 100%;
    width: 100%;
    color: #9c9da8;
    background-color: white;
    height: 40px;
}

.SimplePageTitle strong:after {
    display: none;
}

.tournament-box .SimplePageTitle strong {
    color: black;
}

span#menuRight {
    /* float: right; */
    width: 25px;
    padding: 45px 0;
    color: rgba(255, 255, 255, 0.8705882352941177);
    position: absolute;
    right: 0;
    display: block;
    right: 0;
    z-index: 10;
    height: 100%;
    margin-top: -5px;
    /* vertical-align: middle; */
    cursor: pointer;
}

span#menuLeft {
    float: left;
    width: 25px;
    padding: 45px 0;
    background: #262a3a;
    color: rgba(255, 255, 255, 0.8705882352941177);
    position: absolute;
    left: 0;
    display: block;
    z-index: 1;
    margin-top: -5px;
    height: 100%;
    background: -webkit-linear-gradient(
        90deg,
        rgb(20, 21, 24) 1%,
        rgb(42, 45, 58) 48%,
        rgb(17, 18, 23) 100%
    ) !important;
    cursor: pointer;
}

.torneos-preloader {
    -webkit-animation: pulset 3s infinite ease-in-out;
    -o-animation: pulst2 3s infinite ease-in-out;
    -ms-animation: pulset 3s infinite ease-in-out;
    -moz-animation: pulset 3s infinite ease-in-out;
    animation: pulset 3s infinite ease-in-out;
}

.torneos-p1 {
    height: 54px;
    background: #00000040;
    border-radius: 5px;
    margin: 11px 0;
}

.torneos-p2 {
    height: 54px;
    background: #00000025;
    border-radius: 5px;
    margin: 11px 0;
}

.torneos-p3 {
    height: 54px;
    background: #00000010;
    border-radius: 5px;
    margin: 11px 0;
}

.tournaments-state {
    float: right;
    padding-right: 18px;
}

.container-tournaments .list-tournaments .timeleft-container {
    float: right;
}
</style>


<!-- FILE DOCUMENTED -->
