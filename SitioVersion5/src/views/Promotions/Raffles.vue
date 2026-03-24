<script lang="ts">import apiService from "@/services/ApiService"; // Importing the API service for backend communication
import router from "@/router"; // Importing the router for navigation
import moment from 'moment'; // Importing moment.js for date manipulation
import ArrowBack from "@/components/icons/ArrowBack.vue"; // Importing ArrowBack icon component
import animatedCloseIcon from "@/components/icons/animatedCloseIcon.vue"; // Importing animated close icon component
import {defineComponent, toRaw} from "vue"; // Importing Vue composition API functions
import AppModalData from '@/components/modals/ModalData.vue'; // Importing modal data component

export default defineComponent({
    components:{
        ArrowBack, // Registering ArrowBack component
        animatedCloseIcon, // Registering animatedCloseIcon component
        AppModalData // Registering AppModalData component
    },
    data: function () {
        let config = this.$config(); // Retrieving configuration settings
        let flagMobile : boolean = false; // Flag to indicate mobile view
        let counterCard: number = 0; // Counter for cards
        let disableButton: boolean = false; // Flag to disable buttons
        let emitter = this.$emitter(); // Event emitter for communication
        let appComponent: any = this.$appComponent; // Reference to the app component
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let flag: any  = ''; // General flag variable
        let flagShowStickers: boolean = false; // Flag to show stickers
        let flagShowCoupon: boolean = false; // Flag to show coupons
        let flagShowRoad: boolean = false; // Flag to show road
        let selectStickers : string = ''; // Selected stickers
        let leftArrow: boolean = false; // Flag for left arrow visibility
        let rightArrow: boolean = true; // Flag for right arrow visibility
        let showRoad: boolean = false; // Flag to show road
        let showStickers: boolean = false; // Flag to show stickers
        let showCoupons: boolean = false; // Flag to show coupons
        let container:any = undefined; // Container for scrolling elements
        let scrollAmount:any = undefined; // Amount scrolled
        let slideTimer:any = undefined; // Timer for sliding effect
        let country:any = undefined; // Selected country
        let mobile: boolean=false; // Flag to indicate mobile device
        let more: boolean = false; // Flag for more options
        let moreInfo: boolean = false; // Flag for additional info
        let moreInfo2: boolean = false; // Flag for additional info 2
        let datePrice: any = undefined; // Date for price
        let idPrice: any=[]; // Array of price IDs
        let stateFilter: string = 'A'; // Filter for state
        let typeFilter: string = '0'; // Filter for type
        let auth_token: string = ''; // Authentication token
        let torneos: any = []; // Array of tournaments
        let withPrizes: any = []; // Array of items with prizes
        let stickers: any = {}; // Object to hold stickers
        let coupons: any = []; // Array of coupons
        let totalCoupons: any = '0'; // Total number of coupons
        let routes: any = []; // Array of routes
        let openGlobal: boolean = false; // Flag for global open state
        let login:any = undefined; // Login state
        let openM: boolean = false; // Flag for modal open state
        let objResponse : any = {}; // Object to hold response data
        let imgRaffles : any = ""; // Image for raffles
        let openMC: string = ""; // State for modal close
        let openUG: string = ""; // State for user group
        let openUP: string = ""; // State for user profile
        let openCP: string = ""; // State for coupon
        let openIMG1: string = ""; // State for image 1
        let openIMG: string = ""; // State for image
        let flagOpenIMG: boolean = false; // Flag to open image
        let flagOpenModal2: boolean = false; // Flag to open second modal
        let background: string = ""; // Background style
        let modalTyc: boolean = false; // Flag for terms and conditions modal
        let offset: number = 0; // Represents the current offset used for loading coupons.
        let limit: number = 20; // Defines the maximum number of coupons to request in each API call.
        let loadMoreCouponButton: boolean = false; // Flag that determines whether the "load more coupons" button is displayed.
        let loadingPlayers: boolean = false; // Loading state for players
        return {
            config, // Exposing config to the template
            emitter, // Exposing emitter to the template
            imgRaffles, // Exposing imgRaffles to the template
            showRoad, // Exposing showRoad to the template
            showStickers, // Exposing showStickers to the template
            showCoupons, // Exposing showCoupons to the template
            selectStickers, // Exposing selectStickers to the template
            counterCard, // Exposing counterCard to the template
            flagMobile, // Exposing flagMobile to the template
            leftArrow, // Exposing leftArrow to the template
            rightArrow, // Exposing rightArrow to the template
            appComponent, // Exposing appComponent to the template
            disableButton, // Exposing disableButton to the template
            openGlobal, // Exposing openGlobal to the template
            objResponse, // Exposing objResponse to the template
            refreshBalance, // Exposing refreshBalance to the template
            flag, // Exposing flag to the template
            flagShowStickers, // Exposing flagShowStickers to the template
            flagShowCoupon, // Exposing flagShowCoupon to the template
            flagShowRoad, // Exposing flagShowRoad to the template
            container, // Exposing container to the template
            scrollAmount, // Exposing scrollAmount to the template
            slideTimer, // Exposing slideTimer to the template
            country, // Exposing country to the template
            mobile, // Exposing mobile to the template
            more, // Exposing more to the template
            moreInfo, // Exposing moreInfo to the template
            moreInfo2, // Exposing moreInfo2 to the template
            datePrice, // Exposing datePrice to the template
            idPrice, // Exposing idPrice to the template
            stateFilter, // Exposing stateFilter to the template
            typeFilter, // Exposing typeFilter to the template
            auth_token, // Exposing auth_token to the template
            torneos, // Exposing torneos to the template
            withPrizes, // Exposing withPrizes to the template
            stickers, // Exposing stickers to the template
            coupons, // Exposing coupons to the template
            totalCoupons, // Exposing totalCoupons to the template
            routes, // Exposing routes to the template
            login, // Exposing login to the template
            openM, // Exposing openM to the template
            openMC, // Exposing openMC to the template
            openUG, // Exposing openUG to the template
            openUP, // Exposing openUP to the template
            openCP, // Exposing openCP to the template
            openIMG1, // Exposing openIMG1 to the template
            openIMG, // Exposing openIMG to the template
            flagOpenIMG, // Exposing flagOpenIMG to the template
            flagOpenModal2, // Exposing flagOpenModal2 to the template
            background, // Exposing background to the template
            modalTyc, // Exposing modalTyc to the template
             offset, // Exposing offset to the template
            limit, // Exposing limit to the template
            loadMoreCouponButton, // Exposing loadMoreCouponButton to the template
            loadingPlayers // Exposing loadingPlayers to the template
        }
    },
    unmounted() {
        this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
    },
    updated() {
        // Check if none of the flags for showing stickers, coupons, or road are active
        if (this.showStickers == false && this.showCoupons == false && this.showRoad == false) {
            let isDown = false; // Flag to track if the mouse is down
            let startX; // Variable to store the initial X position
            let scrollLeft; // Variable to store the initial scroll position
            const slider: any = document.querySelector('.container-cards-img'); // Select the slider element

            // Function to end the dragging action
            const end = () => {
                isDown = false; // Set the flag to false
                slider.classList.remove('active'); // Remove active class from slider
            }

            // Function to start the dragging action
            const start = (e) => {
                isDown = true; // Set the flag to true
                slider.classList.add('active'); // Add active class to slider
                startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get the initial X position
                scrollLeft = slider.scrollLeft; // Store the current scroll position
            }

            // Function to handle the dragging movement
            const move = (e) => {
                if (!isDown) return; // Exit if not dragging
                const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
                const dist = (x - startX); // Calculate the distance moved

                // Check if moving left and button is not disabled
                if (scrollLeft < scrollLeft - dist && this.disableButton == false) {
                    // Check if the distance moved is significant enough to trigger a move
                    if (scrollLeft < ((scrollLeft - dist) - 80)) {
                        end(); // End dragging
                        this.moveRight(); // Call method to move right
                    }
                    // Check if moving right and button is not disabled
                } else if (scrollLeft > scrollLeft - dist && this.disableButton == false) {
                    // Check if the distance moved is significant enough to trigger a move
                    if (scrollLeft > ((scrollLeft - dist) + 80)) {
                        end(); // End dragging
                        this.moveLeft(); // Call method to move left
                    }
                }
            }

            // Check if the slider element is defined and not null
            if (slider != undefined && slider != null) {
                // Immediately invoked function to add event listeners for mouse and touch events
                (() => {
                    slider.addEventListener('mousedown', start); // Add mousedown event listener
                    slider.addEventListener('touchstart', start, { passive: true }); // Add touchstart event listener
                    slider.addEventListener('mousemove', move); // Add mousemove event listener
                    slider.addEventListener('touchmove', move, { passive: true }); // Add touchmove event listener
                    slider.addEventListener('mouseleave', end); // Add mouseleave event listener
                    slider.addEventListener('mouseup', end); // Add mouseup event listener
                    slider.addEventListener('touchend', end); // Add touchend event listener
                })();
            }
        }
    }, // Placeholder for updated function
    mounted() {
        const vthis = this; // Preserve the context of 'this' for use in nested functions
        /**
         * Handles the logic for setting the background image based on the device type (mobile or desktop).
         *
         * @param {MediaQueryList} x - The media query list object that contains the information about the current viewport.
         */
        function myFunction(x) {
            /**
             * Selects the container element for home cards.
             * @type {any}
             */
            const container:any = document.querySelector('#containter-home-cards');

            // Checks if the media query matches (i.e., if the device is mobile)
            if (x.matches) {
                vthis.flagMobile = true; // Sets the flag indicating that the device is mobile

                // Checks if the raffle configuration and mobile background image are defined
                if (vthis.appComponent.config.raffles != undefined &&
                    vthis.appComponent.config.raffles.assets != undefined &&
                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].backgroundMobile != undefined) {

                    // Sets the mobile background image from the configuration
                    vthis.imgRaffles = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].backgroundMobile;
                } else {
                    // Fallback to a default mobile background image
                    vthis.imgRaffles = "https://images.virtualsoft.tech/site/doradobet/Webp/Ruta%20Dorada/ruta-dorada-map-mobile.webp";
                }
            } else {
                vthis.flagMobile = false; // Sets the flag indicating that the device is not mobile

                // Checks if the raffle configuration and desktop background image are defined
                if (vthis.appComponent.config.raffles != undefined &&
                    vthis.appComponent.config.raffles.assets != undefined &&
                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].backgroundDesktop != undefined) {

                    // Sets the desktop background image from the configuration
                    vthis.imgRaffles = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].backgroundDesktop;
                } else {
                    // Fallback to a default desktop background image
                    vthis.imgRaffles = "https://images.virtualsoft.tech/site/doradobet/Webp/Ruta%20Dorada/ruta-dorada-map.webp";
                }
            }
        }
        var x = window.matchMedia("(max-width: 767px)"); // Create a media query to check for screen width
        myFunction(x); // Call myFunction with the media query object
        x.addListener(myFunction); // Add a listener to call myFunction when the media query status changes

        // Listen for the "accept:modal" event to close the modal in the app component
        this.emitter.on("accept:modal", () => {
            this.appComponent.closeModal();
        });

        // Listen for the "nextMap" event to handle navigation to the next tournament
        this.emitter.on("nextMap", (id) => {
            var index = this.torneos.findIndex(function(item) {
                return item.id == id; // Find the index of the tournament with the given id
            });

            // Check if the next tournament is valid and exists
            if (this.torneos[index + 1]?.valid != undefined && this.torneos[index + 1].valid) {
                this.appComponent.closeModal(); // Close the modal if the next tournament is valid
                this.openPopup(this.torneos[index + 1].id); // Open the popup for the next tournament
            } else {
                var startDate = new Date(this.torneos[index + 1]?.startDate); // Get the start date of the next tournament
                this.appComponent.modal.openNextMap = moment(startDate).format('DD-MM-YYYY h:mm:ss a'); // Format and set the start date in the modal
            }
        });

        // Set the login status based on the session state
        if (this.appComponent.session.logueado) {
            this.login = "login"; // User is logged in
        } else {
            if (!this.appComponent.session.logueado) {
                this.login = "notLogin"; // User is not logged in
            }
        }

        this.getTournaments(); // Fetch the tournaments

        // Check for background configuration for not logged in users
        if (this.config != undefined &&
            this.config['not_login'] != undefined &&
            this.config['not_login']['backgrounds'] != undefined &&
            this.config['not_login']['backgrounds']['bg_lotterys'] != undefined) {
            this.background = this.config['not_login']['backgrounds']['bg_lotterys']; // Set background for not logged in users
        } else {
            // Check for background configuration for logged in users
            if (this.config != undefined &&
                this.config['backgrounds'] != undefined &&
                this.config['backgrounds'][this.appComponent.country] != undefined &&
                this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd] != undefined &&
                this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd][this.login] != undefined &&
                this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd][this.login]['sorteos'] != undefined &&
                this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd][this.login]['sorteos']['backgrounds'] != undefined &&
                this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd][this.login]['sorteos']['backgrounds'].length > 0) {
                this.background = this.config['backgrounds'][this.appComponent.country][this.appComponent.lngProd][this.login]['sorteos']['backgrounds'][0].url; // Set background from the configuration
            }
        }
    }, // Placeholder for mounted lifecycle hook
    watch: {
        'appComponent.lotteryList': {// Watches the tournaments list from appComponent
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
        }
    },
    methods: {
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Raffles|layout:layout-${this.appComponent.config.layout}`
            };
        },
        /**
         * Opens a popup for a specific tournament identified by its ID.
         *
         * @param {number} id - The ID of the tournament to open the popup for.
         */
        openPopup(id) {
            // Filter the tournaments to find the one with the matching ID
            let value = this.torneos.filter(item => {
                return item.id == id;
            });

            // Find the index of the tournament with the matching ID
            var index = this.torneos.findIndex(function(item) {
                return item.id == id;
            });

            // Call the method to handle the road with prizes for the tournament
            this.roadWithPrizes(id);

            // If the user is logged in, retrieve the coupons for the tournament
            if (this.appComponent.session.logueado) {
                this.getCoupons(id);
            }

            // Retrieve the stickers for the tournament
            this.getStickers(id);

            // Set up the modal properties to display the tournament information
            this.appComponent.modal = {
                showModal: "raffles", // Type of modal to show
                messageModal: value[0], // Tournament details to display
                idRaffle: id // ID of the tournament
            };

            // Determine if there is a next tournament in the list
            if (index == this.torneos.length - 1) {
                this.appComponent.modal.booleanNextMap = false; // No next tournament
            } else {
                this.appComponent.modal.booleanNextMap = true; // There is a next tournament
            }
        }, // Placeholder for openPopup function
        closeModal(){ // Method to close the modal
            this.appComponent.closeModal(); // Calling closeModal on appComponent
        },
        formatDate(timestamp:any) { // Method to format date from timestamp
            let newYear:any = new Date(timestamp); // Creating date object from timestamp
            let now:any = new Date(); // Getting current date
            return newYear - now; // Returning difference in milliseconds
        },
        formatDate2(dateString:any, format: string) { // Method to format date string
            const date = new Date(dateString); // Creating date object from date string
            return moment(date).format(format); // Formatting date using moment.js
        },
        navigate(url : any){ // Method to navigate to a URL
            if(this.appComponent.session.logueado){ // Checking if user is logged in
                router.push(url); // Navigating to the specified URL
            }else{
                this.clickButtonLogin(); // Triggering login if not logged in
            }
        },
        /**
         * Fetches tournaments based on the current state and type filters.
         * Sends a request to the API and processes the response.
         */
        getTournaments(){
            // Parameters for the API request
            const params = {
                State: this.stateFilter, // Current state filter
                StateType: this.typeFilter, // Current type filter
                Country: this.appComponent.country // Current country from the app component
            };

            // API request to get lottery data
            apiService.request('get_lottery', params).then((response:any) => {
                this.objResponse = response; // Store the response object
                // Check if the response code indicates success
                if(response.code==0){
                    // Initialize withPrizes array for each tournament
                    response.data.forEach((with_prizes)=>{
                        with_prizes.withPrizes = [];
                    });

                    this.torneos = response.data; // Store tournament data
                    this.counterCard = 0; // Initialize counter for cards
                    this.rightArrow = this.torneos.length > 1; // Determine if right arrow should be shown

                    // Assign valueCoupons and valueStickers to tournaments
                    this.torneos.valueCoupons = response.valueCoupons;
                    this.torneos.valueStickers = response.valueStickers;

                    const vthis = this; // Preserve context for nested functions

                    // Process the first tournament if it exists
                    if (vthis.torneos[0] != undefined) {
                        // Check for asset configuration and assign Points1 and Points2
                        if(vthis.appComponent.config.raffles != undefined &&
                            vthis.appComponent.config.raffles.assets != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one  &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.Points1 != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.Points2 != undefined ) {
                            vthis.torneos[0].Points1 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.Points1;
                            vthis.torneos[0].Points2= vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.Points2;
                        } else {
                            // Default images if no assets are found
                            vthis.torneos[0].Points1="https://images.virtualsoft.tech/m/msjT1680023636.png";
                            vthis.torneos[0].Points2="https://images.virtualsoft.tech/m/msjT1680023620.png";
                            vthis.torneos[0].Interactive1="https://images.virtualsoft.tech/m/msjT1682093102.gif";
                        }
                    }

                    // Repeat similar processing for the second tournament
                    if (vthis.torneos[1] != undefined) {
                        if(vthis.appComponent.config.raffles != undefined &&
                            vthis.appComponent.config.raffles.assets != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two  &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.Points1 != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.Points2 != undefined ) {
                            vthis.torneos[1].Points1 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.Points1;
                            vthis.torneos[1].Points2 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.Points2;
                        } else {
                            // Default images if no assets are found
                            vthis.torneos[1].Points1="https://images.virtualsoft.tech/m/msjT1680023490.png";
                            vthis.torneos[1].Points2="https://images.virtualsoft.tech/m/msjT1680023477.png";
                            vthis.torneos[1].Interactive1="https://images.virtualsoft.tech/m/msjT1682092422.gif";
                            vthis.torneos[1].Interactive2="https://images.virtualsoft.tech/m/msjT1682092958.gif";
                        }
                    }

                    // Repeat similar processing for the third tournament
                    if (vthis.torneos[2] != undefined) {
                        if(vthis.appComponent.config.raffles != undefined &&
                            vthis.appComponent.config.raffles.assets != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three != undefined  &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points1 != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points2 != undefined ) {
                            vthis.torneos[2].Points1 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points1;
                            vthis.torneos[2].Points2 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points2;
                        } else {
                            // Default images if no assets are found
                            vthis.torneos[2].Points1="https://images.virtualsoft.tech/m/msjT1680023546.png";
                            vthis.torneos[2].Points2="https://images.virtualsoft.tech/m/msjT1680023532.png";
                            vthis.torneos[2].Interactive1="https://images.virtualsoft.tech/m/msjT1682092054.gif";
                        }
                    }

                    // Repeat similar processing for the fourth tournament
                    if (vthis.torneos[3] != undefined) {
                        if(vthis.appComponent.config.raffles != undefined &&
                            vthis.appComponent.config.raffles.assets != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three  &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points1 != undefined &&
                            vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points2 != undefined ) {
                            vthis.torneos[3].Points1 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points1;
                            vthis.torneos[3].Points2 = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.Points2;
                        } else {
                            // Default images if no assets are found
                            vthis.torneos[3].Points1="https://images.virtualsoft.tech/m/msjT1680023585.png";
                            vthis.torneos[3].Points2="https://images.virtualsoft.tech/m/msjT1680023572.png";
                            vthis.torneos[3].Interactive1="https://images.virtualsoft.tech/m/msjT1682434470.gif";
                            vthis.torneos[3].Interactive2="https://images.virtualsoft.tech/m/msjT1682434615.gif";
                        }
                    }

                    /**
                     * Function to update tournament images and backgrounds based on screen size.
                     * @param {MediaQueryList} x - The media query list to determine if the screen matches a specific size.
                     */
                    function myFunction(x) {
                        /**
                         * Selects the container element for home cards.
                         * @type {HTMLElement | null}
                         */
                        const container:any = document.querySelector('#containter-home-cards');

                        // Check if the media query matches (e.g., for mobile view)
                        if (x.matches) {
                            // Update for the first tournament if it exists
                            if (vthis.torneos[0] != undefined) {
                                // Check if the configuration and assets are defined for the first tournament
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.imagesPointsMobile != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.backgroundMobile != undefined) {

                                    // Set images and background for the first tournament
                                    vthis.torneos[0].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.imagesPointsMobile;
                                    vthis.torneos[0].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.backgroundMobile;
                                } else {
                                    // Default images and background if not defined
                                    vthis.torneos[0].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680705948.png";
                                    vthis.torneos[0].background = "https://images.virtualsoft.tech/m/msjT1683149888.png";
                                }
                            }

                            // Repeat similar checks and updates for the second tournament
                            if (vthis.torneos[1] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.imagesPointsMobile != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.backgroundMobile != undefined) {

                                    vthis.torneos[1].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.imagesPointsMobile;
                                    vthis.torneos[1].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.backgroundMobile;
                                } else {
                                    vthis.torneos[1].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680706054.png";
                                    vthis.torneos[1].background = "https://images.virtualsoft.tech/m/msjT1682445897.png";
                                }
                            }

                            // Repeat similar checks and updates for the third tournament
                            if (vthis.torneos[2] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.imagesPointsMobile != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.backgroundMobile != undefined) {

                                    vthis.torneos[2].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.imagesPointsMobile;
                                    vthis.torneos[2].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.backgroundMobile;
                                } else {
                                    vthis.torneos[2].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680706173.png";
                                    vthis.torneos[2].background = "https://images.virtualsoft.tech/m/msjT1682445912.png";
                                }
                            }

                            // Repeat similar checks and updates for the fourth tournament
                            if (vthis.torneos[3] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.imagesPointsMobile != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.backgroundMobile != undefined) {

                                    vthis.torneos[3].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.imagesPointsMobile;
                                    vthis.torneos[3].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.backgroundMobile;
                                } else {
                                    vthis.torneos[3].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680706089.png";
                                    vthis.torneos[3].background = "https://images.virtualsoft.tech/m/msjT1682445884.png";
                                }
                            }
                        } else {
                            // Update for the first tournament if it exists (desktop view)
                            if (vthis.torneos[0] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.imagesPoints != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.background != undefined) {

                                    vthis.torneos[0].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.imagesPoints;
                                    vthis.torneos[0].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].one.background;
                                } else {
                                    vthis.torneos[0].imagesPoints = "https://images.virtualsoft.tech/m/msjT1681753499.png";
                                    vthis.torneos[0].background = "https://images.virtualsoft.tech/m/msjT1682429731.png";
                                }
                            }

                            // Repeat similar checks and updates for the second tournament
                            if (vthis.torneos[1] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.imagesPoints != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.background != undefined) {

                                    vthis.torneos[1].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.imagesPoints;
                                    vthis.torneos[1].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].two.background;
                                } else {
                                    vthis.torneos[1].imagesPoints = "https://images.virtualsoft.tech/m/msjT1681767893.png";
                                    vthis.torneos[1].background = "https://images.virtualsoft.tech/m/msjT1682429673.png";
                                }
                            }

                            // Repeat similar checks and updates for the third tournament
                            if (vthis.torneos[2] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.imagesPoints != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.background != undefined) {

                                    vthis.torneos[2].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.imagesPoints;
                                    vthis.torneos[2].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].three.background;
                                } else {
                                    vthis.torneos[2].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680642855.png";
                                    vthis.torneos[2].background = "https://images.virtualsoft.tech/m/msjT1682429769.png";
                                }
                            }

                            // Repeat similar checks and updates for the fourth tournament
                            if (vthis.torneos[3] != undefined) {
                                if (vthis.appComponent.config.raffles != undefined &&
                                    vthis.appComponent.config.raffles.assets != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country] != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.imagesPoints != undefined &&
                                    vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.background != undefined) {

                                    vthis.torneos[3].imagesPoints = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.imagesPoints;
                                    vthis.torneos[3].background = vthis.appComponent.config.raffles.assets[vthis.appComponent.country].four.background;
                                } else {
                                    vthis.torneos[3].imagesPoints = "https://images.virtualsoft.tech/m/msjT1680642991.png";
                                    vthis.torneos[3].background = "https://images.virtualsoft.tech/m/msjT1682429614.png";
                                }
                            }
                        }
                    }
                    var x = window.matchMedia("(max-width: 767px)"); // Media query for responsive design
                    myFunction(x); // Call function to handle media query
                    x.addListener(myFunction); // Add listener for media query changes

                    var currentDate = new Date(); // Get current date
                    this.torneos = response.data; // Store tournament data again

                    // Process each tournament for date validation and additional properties
                    this.torneos.forEach(input_template=>{
                        input_template.startDate2 = this.formatDate(input_template.startDate); // Format start date
                        input_template.endDate2 = this.formatDate(input_template.endDate); // Format end date
                        var startDate = new Date(input_template.startDate); // Convert start date to Date object
                        var endDate = new Date(input_template.endDate); // Convert end date to Date object

                        // Check if the current date is within the tournament date range
                        input_template.valid = currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime();
                        input_template.loadingPlayers = true; // Set loading state for players
                        // Additional processing based on raffle configuration
                        if(this.appComponent.config.raffles != undefined &&
                            this.appComponent.config.raffles[this.appComponent.country] != undefined &&
                            this.appComponent.config.raffles[this.appComponent.country] == 5){
                            if(this.appComponent.config.raffles.assets != undefined &&
                                this.appComponent.config.raffles.assets[this.appComponent.country] != undefined) {
                                const index = this.appComponent.config.raffles.assets[this.appComponent.country].road?.findIndex((item) => item.id == input_template.id); // Find index of the current tournament
                                if(index != undefined && index > -1) {
                                    // Assign additional properties from the assets
                                    input_template.pointsMap = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].pointsMap!;
                                    input_template.earringMap = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].earringMap!;
                                    input_template.finalMap = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].finalMap!;
                                    input_template.roadBg = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].roadBg!;
                                    input_template.roadBgMobile = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].roadBgMobile!;
                                    input_template.textColor = this.appComponent.config.raffles.assets[this.appComponent.country].road[index].textColor!;
                                }
                            }
                        }
                    });
                } else {
                    // Handle error response
                    var error_mensaje = "";
                    if(response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + (response.error_code).toString()); // Get error message based on error code
                    }
                    if (error_mensaje == "") {
                        error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Default error message
                    }
                    // Show modal with error message
                    this.appComponent.modal = {
                        showModal : "notification",
                        titleModal : this.$t('Error!'),
                        messageModal : error_mensaje,
                        buttonModal : this.$t("Aceptar"),
                        orderModal : "closeModal"
                    }
                }
            });
        }, // Placeholder for getTournaments function
        /**
         * Fetches lottery wards and updates the corresponding tournament's prize information.
         * @param {number} id - The ID of the tournament to fetch lottery wards for.
         */
        roadWithPrizes(id){
            const params = {
                Id: id // Parameters for the API request
            }
            // Request lottery wards from the API
            apiService.request('get_lottery_wards', params).then((response:any) => {
                if(response.code==0){ // Check if the response code indicates success
                    var index = this.torneos.map(x => {
                        return x.id; // Create an array of tournament IDs
                    }).indexOf(id); // Find the index of the tournament with the given ID
                    this.torneos[index].lotteryWards = response.data.lotteryWards; // Update lottery wards for the tournament
                    var currentDate = new Date(); // Get the current date
                    let with_prizes =this.torneos[index]; // Reference to the current tournament
                    let objPrices:any = {date:"",position:"",prizes:[],image:"",type:"",description2:"", state:"", totalCoupons:"", totalPlayers:""}; // Initialize prize object
                    with_prizes.withPrizes = []; // Initialize the withPrizes array
                    // Sort lottery wards by date
                    with_prizes.lotteryWards.sort(function (a, b) {
                        return a.date - b.date
                    });
                    // Iterate over each prize in the lottery wards
                    with_prizes.lotteryWards.forEach((prize:any)=>{
                        objPrices = {date:"",position:"",prizes:[],image:"",type:"",description2:"", state:"", totalCoupons:"", totalPlayers:""}; // Reset prize object
                        objPrices.date = prize.date; // Set prize date
                        objPrices.position = prize.position; // Set prize position
                        objPrices.image = prize.image; // Set prize image
                        objPrices.description2 = prize.description; // Set prize description
                        objPrices.type = prize.type; // Set prize type
                        objPrices.state = prize.state; // Set prize state
                        objPrices.totalCoupons = prize.totalCoupons; // Set total coupons for the prize
                        objPrices.totalPlayers = prize.totalPlayers; // Set total players for the prize
                        objPrices.prizes.push(prize); // Add the prize to the prizes array
                        objPrices.current = objPrices.state != 'R' // Determine if the prize is current
                        // Check if the prize date already exists in withPrizes
                        if(with_prizes.withPrizes.filter(item=>item.date==prize.date).length==0){
                            with_prizes.withPrizes.push(objPrices); // Add new prize object if date is unique
                        }else{
                            const index = with_prizes.withPrizes.findIndex(object => {
                                return object.date === with_prizes.withPrizes.filter(item=>item.date==prize.date)[0].date; // Find index of existing prize by date
                            });
                            with_prizes.withPrizes[index].prizes.push(prize); // Add prize to existing prize object
                        }
                    });
                    const _MS_PER_DAY = 60 * 1000 * 60; // Constant for milliseconds per day
                    /**
                     * Calculates the difference in days between two dates.
                     * @param {Date} a - The first date.
                     * @param {Date} b - The second date.
                     * @returns {number} - The difference in days.
                     */
                    function dateDiffInDays(a, b) {
                        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
                        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
                        return Math.floor((utc2 - utc1) / _MS_PER_DAY); // Return the difference in days
                    }
                    // Update each prize object with additional information
                    with_prizes.withPrizes.forEach((input_template,index)=>{
                        input_template.position = index+1; // Set the position of the prize
                        var dateP = new Date(input_template.date); // Create a date object from the prize date
                        dateP.setSeconds(30); // Adjust seconds for formatting
                        input_template.date = moment(dateP).format('MMM DD, YYYY, h:mm:ss A'); // Format the date
                        let nextDate = dateDiffInDays(new Date(),  new Date(input_template.date)); // Calculate days until the next prize
                        if(nextDate >=0 ){ // If the next date is today or in the future
                            input_template.nextDate = nextDate; // Set the next date
                        }
                    });
                    // Filter prizes that are raffles (nextDate is 0)
                    with_prizes.raffles =  with_prizes.withPrizes.filter(object => {
                        return object.nextDate === 0; // Raffles are those with nextDate of 0
                    });
                    // If there are raffles, set the relevant information
                    if(with_prizes.raffles.length>0){
                        with_prizes.indexLottery = 0; // Set the index for the current lottery
                        with_prizes.datePrice = this.formatDate(new Date(with_prizes.raffles[0].date).getTime()); // Format the date of the first raffle
                        with_prizes.nextLottery = with_prizes.raffles[0].nextDate; // Set the next lottery date
                        with_prizes.image = with_prizes.raffles[0].image; // Set the image for the first raffle
                        with_prizes.description2 = with_prizes.raffles[0].description2; // Set the description for the first raffle
                        with_prizes.type = with_prizes.raffles[0].type; // Set the type for the first raffle
                        with_prizes.state = with_prizes.raffles[0].state; // Set the state for the first raffle
                        with_prizes.totalCoupons = with_prizes.raffles[0].totalCoupons; // Set total coupons for the first raffle
                        with_prizes.totalPlayers = with_prizes.raffles[0].totalPlayers; // Set total players for the first raffle
                        with_prizes.idPrice = []; // Initialize the array for prize IDs
                        // Collect prize IDs from the first raffle
                        with_prizes.raffles[0].prizes.forEach((prize)=>{
                            with_prizes.idPrice.push(prize.detailId); // Push each prize ID into the idPrice array
                        });
                    }
                    this.flag = id; // Set the current flag to the tournament ID
                    this.flagShowStickers= false; // Hide sticker flag
                    this.flagShowCoupon = false; // Hide coupon flag
                    this.flagShowRoad = true; // Show road flag
                }
            })
        }, // Placeholder for roadWithPrizes function
        /**
         * Fetches stickers based on the provided lottery ID.
         *
         * @param {number} id - The ID of the lottery to fetch stickers for.
         */
        getStickers(id){
            // Flags to control the visibility of different components
            this.flagShowStickers = true; // Show stickers
            this.flagShowCoupon = false;   // Hide coupon
            this.flagShowRoad = false;     // Hide road

            // Parameters for the API request
            const params = {
                lottery_id: id,               // Lottery ID
                country: this.appComponent.country // Country from the app component
            };

            // API request to fetch stickers
            apiService.request('get_stickers', params).then((response:any) => {
                // Check if the response code indicates success
                if(response.code == 0){
                    this.stickers = response.data; // Store fetched stickers
                    this.appComponent.modal.stickers = this.stickers; // Update modal with stickers

                    let stickersNumber: any = []; // Array to hold stickers with 100% percent

                    // Sort and collect sportsbook stickers if available
                    if(this.stickers.sportbook != undefined){
                        this.stickers.sportbook.sort(function (a, b) {
                            return b.percent - a.percent; // Sort by percent in descending order
                        });
                        this.stickers.sportbook.forEach((item) =>{
                            stickersNumber.push(item); // Add each item to stickersNumber
                        });
                    }

                    // Sort and collect casino stickers if available
                    if(this.stickers.casino != undefined){
                        this.stickers.casino.sort(function (a, b) {
                            return b.percent - a.percent; // Sort by percent in descending order
                        });
                        this.stickers.casino.forEach((item) =>{
                            stickersNumber.push(item); // Add each item to stickersNumber
                        });
                    }

                    // Collect deposit stickers if available
                    if(this.stickers.deposit != undefined){
                        this.stickers.deposit.forEach((item) =>{
                            stickersNumber.push(item); // Add each item to stickersNumber
                        });
                    }

                    // Determine which type of stickers to select based on availability
                    if(this.stickers['casino'] != undefined && this.stickers['casino'].length > 0){
                        this.selectStickers = "casino"; // Select casino stickers
                    } else if(this.stickers['sportbook'] != undefined && this.stickers['sportbook'].length > 0) {
                        this.selectStickers = "sportbook"; // Select sportsbook stickers
                    } else if(this.stickers['deposit'] != undefined && this.stickers['deposit'].length > 0) {
                        this.selectStickers = "deposit"; // Select deposit stickers
                    } else {
                        this.selectStickers = ""; // No stickers available
                    }

                    // Filter stickers with 100% percent and update modal count
                    this.appComponent.modal.stickersCount = stickersNumber.filter((item) => {
                        return item.percent == 100; // Keep only stickers with 100% percent
                    });
                } else {
                    var error_mensaje = ""; // Variable to hold error message
                    // Check if an error code is present in the response
                    if(response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + (response.error_code).toString()); // Translate error message
                    }
                    // Default error message if no specific error code is found
                    if (error_mensaje == "") {
                        error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
                    }
                    // Update modal with error notification
                    this.appComponent.modal = {
                        showModal: "notification", // Show notification modal
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Error message
                        buttonModal: this.$t("Aceptar"), // Button text
                        orderModal: "closeModal" // Action for the modal
                    };
                }
            });
        }, // Placeholder for getStickers function
        /**
         * Fetches coupons based on the provided lottery ID.
         *
         * @param {number} id - The ID of the lottery for which to fetch coupons.
         */
        getCoupons(id){
            // Flags to control the visibility of UI elements
            this.offset = 0;
            this.flagShowStickers= false; // Hide stickers
            this.flagShowCoupon = true;    // Show coupon section
            this.flagShowRoad = false;      // Hide road section

            // Parameters for the API request
            const params = {
                lottery_id: id, // Lottery ID to be sent in the request
                offset: this.offset,
                limit: this.limit
            };

            // API call to fetch coupons
            apiService.request('get_coupons', params).then((response:any) => {
                // Check if the response indicates success
                if(response.code==0){
                    this.coupons = response.data; // Store the coupons data
                    this.totalCoupons = response.totalCoupons; // Store the total number of coupons

                    // Filter out unwanted keys and map to an array of coupon objects
                    this.coupons = Object.keys(this.coupons).filter(key => key !== 'totalCoupons' && key !== 'sid').map((key) => this.coupons[key]);

                    this.loadMoreCouponButton = this.coupons.length < Number(this.totalCoupons);

                    // Update the modal with the fetched coupons
                    this.appComponent.modal.coupons = this.coupons;
                }else{
                    var error_mensaje = ""; // Initialize error message variable

                    // Check if an error code is present in the response
                    if(response.error_code != undefined) {
                        // Translate the error message based on the error code
                        error_mensaje = this.$t('ERROR' + (response.error_code).toString());
                    }

                    // Default error message if no specific error message is found
                    if (error_mensaje == "") {
                        error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
                    }

                    // Set up the modal to display the error notification
                    this.appComponent.modal = {
                        showModal : "notification", // Type of modal to show
                        titleModal : this.$t('Error!'), // Title of the modal
                        messageModal : error_mensaje, // Message to display in the modal
                        buttonModal : this.$t("Aceptar"), // Text for the modal button
                        orderModal : "closeModal" // Action to take when the modal is closed
                    }
                }
            });
        }, // Placeholder for getCoupons function
        /**
         * Loads additional coupons for a specific lottery when the user clicks "load more".
         *
         * @author Mateo Saldarriaga
         * Notes:
         * - The method first checks if all coupons have already been loaded (offset >= totalCoupons).
         *   If so, it disables the load more button and exits.
         * - The offset is incremented by the limit value to fetch the next batch of coupons.
         * - The request parameters are constructed using this.offset and this.limit.
         * - The response is filtered to exclude irrelevant keys before appending new coupons.
         * - Updates the total number of coupons and toggles the load more button visibility.
         *
         * @param {number} id - The ID of the lottery.
         */
        loadMoreCoupons(id) {
            if (this.offset >= this.totalCoupons) {
                this.loadMoreCouponButton = false;
                return;
            }
            this.offset = this.offset + this.limit;
            const params = {
                lottery_id: id,
                offset: this.offset,
                limit: this.limit
            };
            apiService.request('get_coupons', params).then((response: any) => {
                if(response.code == 0){
                    let newCoupons = Object.keys(response.data)
                        .filter(key => key !== 'totalCoupons' && key !== 'sid')
                        .map((key) => response.data[key]);
                    this.coupons = this.coupons.concat(newCoupons);
                    this.totalCoupons = response.totalCoupons;
                    this.loadMoreCouponButton = this.coupons.length < Number(this.totalCoupons);
                } else {
                    let error_mensaje = "";
                    if(response.error_code !== undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (error_mensaje === "") {
                        error_mensaje = this.$t('Ocurrió un error inesperado en el sistema. Por favor intente más tarde');
                    }
                    this.appComponent.modal = {
                        showModal : "notification",
                        titleModal : this.$t('Error!'),
                        messageModal : error_mensaje,
                        buttonModal : this.$t("Aceptar"),
                        orderModal : "closeModal"
                    }
                }
            });
        },
        changeMain(id) { // Method to change the main item based on ID
            if (this.flag != id) { // Checking if the new ID is different from the current flag
                this.flag = id; // Updating flag with new ID
                this.getStickers(id); // Fetching stickers for the new ID
            } else {
                this.flag = ''; // Resetting flag if the same ID is selected
            }
        },
        rightScroll(item) { // Method to scroll right
            this.container = document.querySelector('.a' + item); // Selecting the container element
            this.sideScroll(this.container, 'right', 25, 200, 20); // Initiating side scroll
        },
        leftScroll(item) { // Method to scroll left
            this.container = document.querySelector('.a' + item); // Selecting the container element
            this.sideScroll(this.container, 'left', 25, 200, 20); // Initiating side scroll
        },
        sideScroll(element, direction, speed, distance, step) { // Method to handle side scrolling
            this.scrollAmount = 0; // Initializing scroll amount
            this.slideTimer = setInterval(() => { // Setting up interval for scrolling
                if (direction == 'left') { // Checking direction for scrolling
                    element.scrollLeft -= step; // Scrolling left
                } else {
                    element.scrollLeft += step; // Scrolling right
                }
                this.scrollAmount += step; // Updating scroll amount
                if (this.scrollAmount >= distance) { // Checking if the distance is reached
                    window.clearInterval(this.slideTimer); // Clearing the interval
                }
            }, speed); // Setting interval speed
        },
        clickButtonLogin(): void { // Method to show login modal
            this.appComponent.showModalLogin = true; // Setting flag to show login modal
        },
        openModal(item){ // Method to open a modal for a specific item
            item.datePrice = this.formatDate(new Date(item.raffles[0].date).getTime()); // Formatting date for the item
            this.flagOpenModal2 = false; // Resetting flag for second modal
            this.openM = false; // Resetting open modal flag
            item.open=true; // Setting item to open
            (document.getElementsByClassName("popuproad-"+item.id)[0] as HTMLElement).style.display = "block"; // Displaying the modal
        },
        /**
         * Opens a modal for displaying prize information.
         *
         * @param {Object} item - The item associated with the prize.
         * @param {Object} prize - The prize details including user and prize information.
         */
        openModal2(item, prize) {
            // Set modal state to closed initially
            this.openM = false;

            // Flag to indicate that the second modal is open
            this.flagOpenModal2 = true;

            // Create a new date object and set it to 6 seconds in the future
            var dateP = new Date();
            dateP.setSeconds(dateP.getSeconds() + 6);

            // Format the date for display
            this.datePrice = this.formatDate(dateP.getTime());

            // Store user win code and user ID from the prize object
            this.openMC = prize.userWin.code;
            this.openUG = prize.userWin.user_id;

            // Store total players and total coupons from the prize object
            this.openUP = prize.totalPlayers;
            this.openCP = prize.totalCoupons;

            // Check the type of prize and set corresponding flags and values
            if (prize.type == 'Fisico') {
                // If the prize is physical, set the image flag to true
                this.flagOpenIMG = true;
                this.openIMG = prize.image; // Store the image for display
            } else {
                // If the prize is not physical, set the image flag to false
                this.flagOpenIMG = false;
                this.openIMG1 = prize.description; // Store the description for display
                this.openIMG = prize.image; // Store the image for display
            }

            // Mark the item as open
            item.open = true;

            // Display the modal by changing the CSS display property
            (document.getElementsByClassName("popuproad-" + item.id)[0] as HTMLElement).style.display = "block";
        }, // Placeholder for openModal2 function
        getPrize2(){ // Method to get prize
            this.openM = true; // Setting flag to open modal
        },
        modalClose(item){ // Method to close the modal for a specific item
            item.open=false; // Setting item to closed
            (document.getElementsByClassName("popuproad-"+item.id)[0] as HTMLElement).style.display = "none"; // Hiding the modal
        },
        openTyC(){ // Method to open terms and conditions modal
            this.modalTyc = true; // Setting flag to open terms and conditions modal
        },
        minimize(key, event) { // Method to minimize an element
            event.preventDefault(); // Preventing default event behavior
            event.stopPropagation(); // Stopping event propagation
        },
        /**
         * Retrieves the prize for a given lottery item.
         *
         * @param {Object} item - The lottery item for which to get the prize.
         * @returns {boolean} - Returns false if the lottery is currently open.
         */
        getPrize(item){
            // Check if the lottery is open
            if(this.openM){
                return false; // Exit if the lottery is open
            }

            // Prepare parameters for the API request
            const params = {
                lottery_id: item.id, // Lottery ID
                prices_ids: item.idPrice // Price IDs associated with the lottery item
            };

            // Reset the next lottery property
            item.nextLottery = null;

            // Preserve the context of 'this' for use in the promise callback
            const vthis = this;

            // Make an API request to get the winning prize
            apiService.request('get_ward_win', params).then((response:any) => {
                // Check if the response indicates success
                if(response.code == 0){
                    // Assign prize details from the response to the item
                    item.idPrize = response.data[0].code; // Winning prize code
                    item.user_id = response.data[0].user_win; // User ID of the winner

                    // Set a timeout to process the next lottery details
                    setTimeout(()=>{
                        // Check if there are more raffles available
                        if(item.raffles.length >= 1 && item.indexLottery < item.raffles.length){
                            // Reset prize and user ID
                            item.idPrize = undefined;
                            item.user_id = undefined;
                            // Move to the next lottery index
                            item.indexLottery = item.indexLottery + 1;
                            // Format and assign the date of the next prize
                            item.datePrice = this.formatDate(item.raffles[item.indexLottery].date.getTime());
                            // Assign details of the next lottery
                            item.nextLottery = item.raffles[item.indexLottery].nextDate;
                            item.image = item.raffles[item.indexLottery].image;
                            item.description2 = item.raffles[item.indexLottery].description2;
                            item.type = item.raffles[item.indexLottery].type;
                            item.state = item.raffles[item.indexLottery].state;
                            item.totalCoupons = item.raffles[item.indexLottery].totalCoupons;
                            item.totalPlayers = item.raffles[item.indexLottery].totalPlayers;
                            // Reset price IDs for the next lottery
                            item.idPrice = [];
                            // Populate the price IDs from the next raffle's prizes
                            item.raffles[item.indexLottery].prizes.forEach((prize)=>{
                                item.idPrice.push(prize.detailId); // Add each prize detail ID
                            });
                            // Close the modal for the current item
                            vthis.modalClose(item);
                            // Open the modal for the next lottery after a delay
                            setTimeout(()=>{
                                vthis.openModal(item);
                            }, 1000);
                        }
                    }, 60000); // Delay of 60 seconds before processing the next lottery
                } else {
                    // If the response indicates failure, refresh the tournaments
                    this.getTournaments();
                }
            });
        }, // Placeholder for getPrize function
        prizeOpen(item){ // Method to open prize for an item
            item.withPrizes.forEach(item2=>{ // Iterating through prizes
                item2.open = false // Setting each prize to closed
            })
        },
        /**
         * Handles the user joining a tournament (torneo).
         *
         * @param {Object} torneo - The tournament object containing tournament details.
         */
        clickJoinUser(torneo) {
            // Prepare data object with tournament ID for the API request
            const data = {
                id: torneo.id
            }

            // Make an API request to join the lottery
            apiService.request('lottery_join', data).then((response: any) => {
                // Check if the response indicates a successful join
                if (response.code == 0) {
                    torneo.userjoin = true; // Mark the user as joined the tournament

                    // Set up modal for successful join notification
                    this.appComponent.modal = {
                        showModal: "notification",
                        titleModal: this.$t('Mensaje'), // Title of the modal
                        messageModal: this.$t('Bienvenido al sorteo. ¡Éxitos!'), // Success message
                        buttonModal: this.$t("Aceptar"), // Button text
                        orderModal: "closeModal" // Action to close the modal
                    }
                } else {
                    var error_mensaje = ""; // Initialize error message variable

                    // Check if there is a specific error code in the response
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + (response.error_code).toString()); // Set error message based on error code
                    }

                    // If no specific error message, set a generic error message
                    if (error_mensaje == "") {
                        error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
                    }

                    // Set up modal for error notification
                    this.appComponent.modal = {
                        showModal: "notification",
                        titleModal: this.$t('Error!'), // Title of the modal
                        messageModal: error_mensaje, // Error message to display
                        buttonModal: this.$t("Aceptar"), // Button text
                        orderModal: "closeModal" // Action to close the modal
                    }
                }
            });
        }, // Placeholder for clickJoinUser function
        /**
         * Moves the card display to the left by scrolling the container.
         * Disables the button during the scroll action to prevent multiple clicks.
         */
        moveLeft() {
            // Disable the button to prevent further clicks during the operation
            this.disableButton = true;

            // Check if the counterCard is less than 1, if so, reset it to 0
            if (this.counterCard < 1) {
                this.counterCard = 0;
            } else {
                // Get the first element with the class name "container-cards-img"
                const casinoSlide = (document.getElementsByClassName("container-cards-img") as HTMLCollectionOf<HTMLElement>)[0];

                // Store the current scroll position of the container
                let scrollNumber = casinoSlide.scrollLeft;

                // Scroll the container to the left by 347 pixels with a smooth behavior
                casinoSlide.scrollTo({ left: scrollNumber - 347, behavior: "smooth" });

                // Decrement the counterCard to reflect the movement
                this.counterCard--;
            }

            // Re-enable the button after a delay of 350 milliseconds
            setTimeout(() => {
                this.disableButton = false;
            }, 350);
        }, // Placeholder for moveLeft function
        /**
         * Moves the card display to the right by scrolling the container.
         * Disables the button during the scroll action to prevent multiple clicks.
         */
        moveRight(){
            // Disable the button to prevent further clicks during the operation
            this.disableButton = true;

            // Check if the current card is the last one
            if(this.counterCard >= this.torneos.length-1)
            {
                // If at the last card, set counterCard to the last index
                this.counterCard = this.torneos.length-1;
            } else {
                // Get the first element with the class 'container-cards-img'
                const casinoSlide = (document.getElementsByClassName("container-cards-img") as HTMLCollectionOf<HTMLElement>)[0];
                // Get the current scroll position of the container
                let scrollNumber = casinoSlide.scrollLeft;
                // Scroll the container to the right by 347 pixels smoothly
                casinoSlide.scrollTo({left: scrollNumber + 347, behavior: "smooth"});
                // Increment the counterCard to reflect the new position
                this.counterCard++;
            }

            // Re-enable the button after a delay of 350 milliseconds
            setTimeout(() =>{
                this.disableButton = false;
            },350);
        } // Placeholder for moveRight function
    }
})</script>

<template>

    <!-- Raffles v1 -->
    <div
        v-if="appComponent.config.raffles == undefined || appComponent.config.raffles[appComponent.country] == undefined || appComponent.config.raffles[appComponent.country] == 1"
        class="tournaments-page torneos"
        :style="{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover'}">
        <div class="container-tournaments">
            <div class="container-filter">
                <div class="filter col-12 col-md-6">
                    <span class="filters-section">
                        <strong>Tipo:</strong>
                        <!-- Dropdown for selecting tournament type -->
                        <select v-model="typeFilter" @change="getTournaments()">
                            <option value="0">{{ $t('Todos los sorteos') }}</option>
                            <option v-if="appComponent.session.logueado"
                                    value="1">{{ $t('Sorteos Registrados') }}</option>
                        </select>
                    </span>
                    <span class="filters-section">
                        <strong>Estado:</strong>
                        <!-- Dropdown for selecting tournament state -->
                        <select v-model="stateFilter" @change="getTournaments()">
                            <option value="A">{{ $t('Activo') }}</option>
                            <option value="I">{{ $t('Inactivo') }}</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="Container InfoContent">
                <div class="row justify-content-center">
                    <div class="container-tournaments col-12">
                        <!-- Preloader displayed while tournaments are loading -->
                        <div class="torneos-preloader" v-if="torneos.length < 0">
                            <div class="torneos-p1"></div>
                            <div class="torneos-p2"></div>
                            <div class="torneos-p3"></div>
                        </div>
                        <!-- Message displayed when no tournaments are available -->
                        <div v-if="torneos.length <= 0" style="height: 335px;"
                             class="text-none-coupon text-base text-neutral flex justify-center items-center">
                            <p class="text-center bg-base-100 px-4 py-2 rounded-3xl">
                                {{ $t('NO HAY SORTEOS ACTUALMENTE PARA MOSTRAR') }}</p>
                        </div>
                        <!-- Loop through each tournament item -->
                        <div v-for="item in torneos">
                            <div @click="changeMain(item.id);" class="list-tournaments">
                                <div class="tournament-logo">
                                    <!-- Display tournament logo -->
                                    <img :src="config.favicon" style="height: 100%;">
                                </div>
                                <div class="container-title">
                                    <div class="tournament-title">{{ item.name }}</div>
                                    <!-- Button to view or hide tournament details based on flag -->
                                    <i v-if="flag!=item.id" class="text-xs">
                                        <button type="button"
                                                class="detail-bono text-black bg-primary-content border-white hover:border-primary-content">
                                            {{ $t('VER') }}
                                        </button>
                                    </i>
                                    <i v-if="flag===item.id" class="text-xs">
                                        <button type="button"
                                                class="detail-bono text-black bg-primary-content border-white hover:border-primary-content">
                                            {{ $t('OCULTAR') }}
                                        </button>
                                    </i>
                                </div>
                                <div class="container-expand">
                                    <i v-if="flag!=item.id" class="text-xs">
                                        <button type="button"
                                                class="detail-bono text-black bg-primary-content border-white hover:border-primary-content">
                                            {{ $t('VER') }}
                                        </button>
                                    </i>
                                    <i v-if="flag===item.id" class="text-xs">
                                        <button type="button"
                                                class="detail-bono text-black bg-primary-content border-white hover:border-primary-content">
                                            {{ $t('OCULTAR') }}
                                        </button>
                                    </i>
                                </div>
                                <div class="timeleft-container">
                                    <div class="timeleft">
                                        <div v-if="item.state=='A'">
                                            <!-- Countdown timer for active tournaments -->
                                            <vue-countdown :time="item.endDate2" :interval="100"
                                                           v-slot="{ days, hours, minutes, seconds }">
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
                                    <!-- Message indicating the status of the tournament -->
                                    <div class="finish" v-show="(item.state=='A')">{{ $t('Sorteo final en') }}</div>
                                    <div class="finish" v-show="(item.state=='I')">{{ $t('¡Finalizado!') }}</div>
                                </div>
                                <div class="tournaments-state"
                                     v-if="!appComponent.session.logueado && item.userjoin != undefined">
                                    <div @click="navigate('/menu/access'); appComponent.gAnalytics('play_now', item)"
                                         v-if="!item.userjoin" class="buttom">
                                        {{ $t('JUEGA YA') }}
                                    </div>
                                    <div @click="navigate('/menu/access'); appComponent.gAnalytics('play_now', item)"
                                         v-if="item.userjoin" class="buttom join">
                                        {{ $t('Jugando') }}
                                    </div>
                                </div>
                                <div class="tournaments-state"
                                     v-if="appComponent.session.logueado && item.userjoin != undefined">
                                    <div @click="clickJoinUser(item); appComponent.gAnalytics('play_now', item)"
                                         v-if="!item.userjoin" class="buttom">
                                        {{ $t('JUEGA YA') }}
                                    </div>
                                    <div @click="appComponent.gAnalytics('play_now', item)" v-if="item.userjoin"
                                         class="buttom">
                                        {{ $t('Jugando') }}
                                    </div>
                                </div>
                                <div class="tournaments-state" v-if="!appComponent.session.logueado">
                                    <div @click="openModal(item)" class="buttom" v-if="item.nextLottery==0">
                                        {{ $t('Ver sorteo') }}
                                    </div>
                                    <div @click="roadWithPrizes(item.id);minimize(item.id, $event)" class="buttom">
                                        {{ $t('Camino') }}
                                    </div>
                                    <div v-if="item.id == 113" @click="openTyC()" class="buttom">
                                        {{ $t('TyC') }}
                                    </div>
                                </div>
                                <div class="tournaments-state" v-if="appComponent.session.logueado">
                                    <div @click="openModal(item);" class="buttom" v-if="item.nextLottery==0">
                                        {{ $t('Ver sorteo') }}
                                    </div>
                                    <div @click="roadWithPrizes(item.id);minimize(item.id, $event);" class="buttom">
                                        {{ $t('Camino') }}
                                    </div>
                                    <div v-if="item.id == 113" @click="openTyC()" class="buttom">
                                        {{ $t('TyC') }}
                                    </div>
                                </div>
                            </div>
                            <!-- Details section for the tournament when expanded -->
                            <div v-if="flagShowStickers==true && flag==item.id" class="details-tournament">
                                <div class="description-container">
                                    <div class="cross cursor-pointer" @click="changeMain(item.gameCode);">
                                        <button aria-label="Cerrar"
                                                class="bg-primary-content rounded-full text-2xl absolute px-2 right-0 m-2"
                                                style="background: linear-gradient(1deg, #00000030, transparent);">X
                                        </button>
                                    </div>
                                    <div class="header-container grid grid-cols-1 lg:grid-cols-5 gap-2">
                                        <div class="pt-3 pl-3">
                                            <div class="cotainer" style="display: flex;">
                                                <p class="text-3xl text-neutral font-extrabold text-left mr-2">
                                                    {{ $t('STICKERS') }}</p>
                                                <img src="https://images.virtualsoft.tech/m/msjT1656610794.png"
                                                     alt="cupon" width="40" height="40">
                                            </div>
                                            <button v-if="appComponent.session.logueado"
                                                    @click="flagShowCoupon=true; flagShowStickers=false; getCoupons(item.id)"
                                                    aria-label="MIS CUPONES"
                                                    class="text-black block rounded-full bg-primary-content px-3 py-1 uppercase font-bold hover:bg-black hover:text-primary-content"
                                                    style="background: linear-gradient(1deg, #00000030, transparent);">
                                                {{ $t('mis cupones') }}
                                            </button>
                                        </div>
                                        <div class="col-span-3 pt-3 relative inline-block text-center m-5">
                                            <div class="mt-3"
                                                 style="background-image: url(https://images.virtualsoft.tech/m/msjT1656610737.png); background-position: center; background-repeat: no-repeat; background-size: 108% 157%;">
                                                <p @click="" class="font-light text-xl">{{ $t(item.description) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Stickers section for sports betting -->
                                    <div class="container mt-10 pl-3"
                                         v-if="stickers != undefined && stickers['sportbook'] != undefined && stickers['sportbook'].length>0">
                                        <div class="title-passport">
                                            <p class="uppercase font-extrabold">
                                                {{ $t('stickers por apuestas deportivas') }}</p>
                                        </div>
                                        <div class="body-passport flex w-full flex-wrap">
                                            <div class="sticker mr-4 mb-3 relative"
                                                 :class="{'inline-block text-center': sticker.percent < 100}"
                                                 v-for="sticker in stickers['sportbook']">
                                                <div v-if="sticker.percent > 0" class="logo absolute flex items-center"
                                                     style="right: 21%; top: 21%; width: 48px; height: 48px;">
                                                    <img :src="config.logo" class="w-full" alt="Logo" width="55"
                                                         height="55">
                                                </div>
                                                <img v-if="sticker.percent > 0 && sticker.percent <= 25"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899570.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 26 && sticker.percent <= 50"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899605.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 51 && sticker.percent <= 75"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899627.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 76 && sticker.percent <= 99"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899667.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent == 100"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896921.png"
                                                     alt="sticker" width="78" height="78">
                                                <div v-if="sticker.percent <= 0"
                                                     class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                                     style="font-size: 9px; width: 69%; height: 55px; right: 15%; top: 20%; line-height: 11px;">
                                                    <p style="max-height: 55px;"
                                                       class="overflow-y-auto break-words m-0">
                                                        {{ $t('Realiza una apuesta para desbloquear el sticker') }}</p>
                                                </div>
                                                <img v-if="sticker.percent <= 0"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896860.png"
                                                     alt="sticker" width="81" height="81">
                                            </div>
                                        </div>
                                        <div class="subtitle-passport mt-3">
                                            <p class="text-neutral text-xs">
                                                {{ $t('Gánate un sticker acumulando un total de $')
                                                }}{{ item.minAmountDetails.sportbookMax }}.
                                                {{ $t('Cada apuesta individual debe ser mayor o igual a $')
                                                }}{{ item.minAmountDetails.sportbookMin }}</p>
                                        </div>
                                    </div>
                                    <!-- Stickers section for casino betting -->
                                    <div class="container mt-8 pl-3"
                                         v-if="stickers != undefined && stickers['casino'] != undefined && stickers['casino'].length>0">
                                        <hr style="border: 1px solid #fff;">
                                        <br>
                                        <div class="title-passport">
                                            <p class="uppercase font-extrabold">
                                                {{ $t('stickers por apuestas de casino') }}</p>
                                        </div>
                                        <div class="body-passport flex w-full flex-wrap">
                                            <div class="sticker mr-4 mb-3 relative"
                                                 :class="{'inline-block text-center': sticker.percent < 100}"
                                                 v-for="sticker in stickers['casino']">
                                                <div v-if="sticker.percent > 0" class="logo absolute flex items-center"
                                                     style="right: 21%; top: 21%; width: 48px; height: 48px;">
                                                    <img :src="config.logo" class="w-full" alt="Logo" width="55"
                                                         height="55">
                                                </div>
                                                <img v-if="sticker.percent > 0 && sticker.percent <= 25"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899570.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 26 && sticker.percent <= 50"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899605.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 51 && sticker.percent <= 75"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899627.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 76 && sticker.percent <= 99"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899667.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent == 100"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896921.png"
                                                     alt="sticker" width="78" height="78">
                                                <div v-if="sticker.percent <= 0"
                                                     class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                                     style="font-size: 9px; width: 69%; height: 55px; right: 15%; top: 20%; line-height: 11px;">
                                                    <p style="max-height: 55px;"
                                                       class="overflow-y-auto break-words m-0">
                                                        {{ $t('Realiza una apuesta para desbloquear el sticker') }}</p>
                                                </div>
                                                <img v-if="sticker.percent <= 0"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896860.png"
                                                     alt="sticker" width="81" height="81">
                                            </div>
                                        </div>
                                        <div class="subtitle-passport mt-3">
                                            <p class="text-neutral text-xs">
                                                {{ $t('Gánate un sticker acumulando un total de $')
                                                }}{{ item.minAmountDetails.casinoMax }}.
                                                {{ $t('Cada apuesta individual debe ser mayor o igual a $')
                                                }}{{ item.minAmountDetails.casinoMin }}</p>
                                        </div>
                                    </div>
                                    <!-- Stickers section for deposits -->
                                    <div class="container mt-8 pl-3"
                                         v-if="stickers != undefined && stickers['deposit'] != undefined && stickers['deposit'].length>0">
                                        <hr style="border: 1px solid #fff;">
                                        <br>
                                        <div class="title-passport">
                                            <p class="uppercase font-extrabold">{{ $t('stickers por deposito') }}</p>
                                        </div>
                                        <div class="body-passport flex w-full flex-wrap">
                                            <div class="sticker mr-4 mb-3 relative"
                                                 :class="{'inline-block text-center': sticker.percent < 100}"
                                                 v-for="sticker in stickers['deposit']">
                                                <div v-if="sticker.percent > 0" class="logo absolute flex items-center"
                                                     style="right: 21%; top: 21%; width: 48px; height: 48px;">
                                                    <img :src="config.logo" class="w-full" alt="Logo" width="55"
                                                         height="55">
                                                </div>
                                                <img v-if="sticker.percent > 0 && sticker.percent <= 25"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899570.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 26 && sticker.percent <= 50"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899605.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 51 && sticker.percent <= 75"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899627.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent >= 76 && sticker.percent <= 99"
                                                     src="https://images.virtualsoft.tech/m/msjT1657899667.png"
                                                     alt="sticker" width="81" height="81">
                                                <img v-if="sticker.percent == 100"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896921.png"
                                                     alt="sticker" width="78" height="78">
                                                <div v-if="sticker.percent <= 0"
                                                     class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                                     style="font-size: 9px; width: 69%; height: 55px; right: 15%; top: 20%; line-height: 11px;">
                                                    <p style="max-height: 55px;"
                                                       class="overflow-y-auto break-words m-0">
                                                        {{ $t('Realiza un depósito para desbloquear el sticker') }}</p>
                                                </div>
                                                <img v-if="sticker.percent <= 0"
                                                     src="https://images.virtualsoft.tech/m/msjT1657896860.png"
                                                     alt="sticker" width="81" height="81">
                                            </div>
                                        </div>
                                        <div class="subtitle-passport mt-3">
                                            <p class="text-neutral text-xs">
                                                {{ $t('Gánate un sticker acumulando un total de $')
                                                }}{{ item.minAmountDetails.depositMax }}.
                                                {{ $t('Cada depósito individual debe ser mayor o igual a $')
                                                }}{{ item.minAmountDetails.depositMin }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Coupon details section when expanded -->
                            <div v-if="flagShowCoupon==true && flag==item.id" class="details-tournament">
                                <div class="description-container">
                                    <div class="cross cursor-pointer" @click="flagShowCoupon = false">
                                        <button aria-label="Cerrar"
                                                class="bg-primary-content rounded-full text-2xl absolute px-2 right-0 m-2"
                                                style="background: linear-gradient(1deg, #00000030, transparent);">X
                                        </button>
                                    </div>
                                    <div class="header-container grid grid-cols-1 md:grid-cols-1 gap-2">
                                        <div class="pt-3 pl-6 mt-8">
                                            <div class="cotainer flex justify-center">
                                                <p class="text-3xl text-primary-content font-extrabold text-left mr-2">
                                                    {{ $t('MIS CUPONES') }}</p>
                                                <img src="https://images.virtualsoft.tech/m/msjT1656610794.png"
                                                     alt="cupon" width="40" height="40">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container mt-10 pl-3">
                                        <!-- Message displayed when no coupons are available -->
                                        <div v-if="coupons.length == 0" class="text-none-coupon text-lg text-neutral">
                                            <p class="text-center">{{ $t('No tienes cupones disponibles actualmente') }}</p>
                                        </div>
                                        <div class="body-passport flex justify-center w-full flex-wrap">
                                            <div class="sticker mr-4 mb-3 relative" v-for="coupon in coupons">
                                                <div class="absolute"
                                                     style="right: 25%; top: 49%; width: 121px; height: 47px;">
                                                    <p class="font-extrabold text-black break-words text-center text-2xl"
                                                       style="line-height: 20px !important;">{{ coupon.code }}</p>
                                                </div>
                                                <div class="absolute"
                                                     style="right: -12%; top: 32%; width: 99px; height: 37px; transform: rotatez(270deg);">
                                                    <p class="text-black break-words text-center"
                                                       style="line-height: 10px; font-size: 9px;">ID:
                                                        {{ coupon.code }}</p>
                                                </div>
                                                <div class="absolute"
                                                     style="right: 25%; top: 24%; width: 121px; height: 47px;">
                                                    <p class="font-extrabold text-primary-content break-words text-center text-3xl tracking-tighter"
                                                       style="line-height: 20px !important;">{{ $t('CUPÓN') }}</p>
                                                </div>
                                                <div class="absolute"
                                                     style="right: 57%; top: 31%; width: 99px; height: 37px; transform: rotatez(270deg);">
                                                    <p class="font-extrabold text-black break-words text-center"
                                                       style="font-size: 9px;">{{ $t('GANASTE UN') }}</p>
                                                </div>
                                                <img src="https://images.virtualsoft.tech/m/msjT1657809484.png"
                                                     alt="sticker" width="220" height="220">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Main container for tournament details, shown based on flags -->
                            <div v-if="flagShowRoad==true && flag==item.id" class="details-tournament">
                                <!-- Container for tournament description with overflow handling -->
                                <div class="description-container overflow-auto" style="padding: inherit;">
                                    <!-- Button to close the road details -->
                                    <div class="cursor-pointer" @click="flagShowRoad=false">
                                        <button aria-label="Cerrar"
                                                class="bg-primary-content rounded-full text-2xl absolute px-2 right-0 m-2"
                                                style="z-index: 3; background: linear-gradient(1deg, #00000030, transparent);">
                                            X
                                        </button>
                                    </div>
                                    <!-- Container for the road display -->
                                    <div class="container-road">
                                        <!-- Road title and image container -->
                                        <div class="absolute left-0 ml-3 flex"
                                             style="width:39%; height:204px; top:13px;">
                                            <div class="break-words" style="width: 163px; height:114px;">
                                                <p class="font-extrabold text-neutral sm:text-3xl text-2xl uppercase"
                                                   style="text-shadow: 2px 2px 7px black;">{{ $t('CAMINO ') }}
                                                    {{ item.name }}</p>
                                            </div>
                                            <div class="ml-3">
                                                <img class="w-full"
                                                     src="https://images.virtualsoft.tech/m/msjT1657057870.png"
                                                     alt="Punto"
                                                     width="29px" height="29px">
                                            </div>
                                        </div>
                                        <!-- Background for the road -->
                                        <div
                                            style="background: url(https://images.virtualsoft.tech/m/msjT1658782342.png); background-position: top; background-size:cover; height: 122vh; max-height: 781px;">
                                            <!-- Dynamic road based on the number of prizes -->
                                            <div :class="'road road-'+item.withPrizes.length">
                                                <!-- Loop through prizes and create buttons for each -->
                                                <div class="absolute text-black" v-for="(item2, i) in item.withPrizes">
                                                    <button
                                                        :class="item2.state == 'R' ? 'bg-primary-content' : 'bg-gray-400'"
                                                        class="font-extrabold"
                                                        style="width: 29px; height:29px; border: 2px solid black; border-radius: 50%; background: linear-gradient(2deg, transparent, #ffffffc7);"
                                                        @click="prizeOpen(item);item2.open=true;">{{ item2.position }}
                                                    </button>
                                                    <!-- Prize details popup -->
                                                    <div v-if="item2.open"
                                                         :class="{'win-top': i < item.withPrizes.length/2}"
                                                         class="bg-gray-100 absolute rounded-2xl overflow-hidden win"
                                                         style="width: 271px; max-width:271px; height: 248px; max-height: 248px; z-index:3; top: -719%; left: -71%;">
                                                        <div class="cross cursor-pointer"
                                                             @click="flagShowCoupon = false">
                                                            <button aria-label="Cerrar"
                                                                    class="bg-white rounded-full text-base absolute px-2 right-0 m-1 text-black"
                                                                    style="background: linear-gradient(1deg, #00000030, transparent);"
                                                                    @click="item2.open=false">X
                                                            </button>
                                                        </div>
                                                        <!-- Header for the prize popup -->
                                                        <div
                                                            class="header-popup-road text-neutral w-full rounded-t-lg bg-success"
                                                            style="background: linear-gradient(1deg, #0000009c, transparent);">
                                                            <p class="text-center font-extrabold py-1 m-0"
                                                               style="font-size: 18px;">PREMIOS</p>
                                                        </div>
                                                        <!-- Container for awards -->
                                                        <div class="awards-containers overflow-auto"
                                                             style="height: 239px; background: linear-gradient(13deg, #00000030, transparent);">
                                                            <!-- Loop through each prize in the item -->
                                                            <div class="container-award-popup mb-6"
                                                                 v-for="prize in item2.prizes">
                                                                <div class="text-date-popup">
                                                                    <p class="text-center text-gray-700"
                                                                       style="font-size: 10px;">
                                                                        {{ $t('FECHA SORTEO') }}</p>
                                                                    <p class="text-center text-gray-700 font-bold">
                                                                        {{ formatDate2(prize.date, 'YYYY-MM-DD h:mm:ss a')
                                                                        }}</p>
                                                                </div>
                                                                <!-- Display winner information based on prize state -->
                                                                <div class="award-road flex m-auto mb-4"
                                                                     style="width: 95%; height: 21px; font-size: 10px;"
                                                                     v-if="prize.state == 'R'">
                                                                    <div
                                                                        class="w-2/4 bg-primary-content rounded-l-full">
                                                                        <p class="text-center text-black font-bold">
                                                                            {{ $t('USUARIO GANADOR') }}</p>
                                                                    </div>
                                                                    <div class="w-2/4 bg-white rounded-r-full">
                                                                        <p class="text-center text-black font-extrabold h-full m-0 overflow-auto">
                                                                            {{ prize.userWin.user_id }}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="award-road flex m-auto mb-4"
                                                                     style="width: 95%; height: 21px; font-size: 10px;"
                                                                     v-if="prize.state == 'A'">
                                                                    <div class="w-full bg-primary-content rounded-full">
                                                                        <p class="text-center text-black font-bold">
                                                                            {{ $t('GANADOR PENDIENTE') }}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="section-win flex">
                                                                    <div class="win-coupon w-2/4">
                                                                        <div class="title-win-coupon">
                                                                            <p class="text-black font-extrabold text-center mb-1"
                                                                               style="font-size: 10px;">
                                                                                {{ $t('CUPÓN GANADOR') }}</p>
                                                                        </div>
                                                                        <div
                                                                            class="container-award-win flex justify-center items-center p-1"
                                                                            style="height: 88px; max-height: 88px;">
                                                                            <div class="body-passport w-full"
                                                                                 v-if="prize.state == 'R'">
                                                                                <div class="sticker relative">
                                                                                    <div class="absolute"
                                                                                         style="right: 20%; top: 49%; width: 80px; height: 47px;">
                                                                                        <p class="font-extrabold text-black break-words text-center"
                                                                                           style="line-height: 20px !important; font-size: 11px;">
                                                                                            {{ prize.userWin.code }}</p>
                                                                                    </div>
                                                                                    <div class="absolute"
                                                                                         style="right: -21%; top: 32%; width: 70px; height: 26px; transform: rotatez(270deg);">
                                                                                        <p class="text-black break-words text-center"
                                                                                           style="line-height: 10px; font-size: 7px;">
                                                                                            ID:
                                                                                            {{ prize.userWin.code }}</p>
                                                                                    </div>
                                                                                    <div class="absolute"
                                                                                         style="right: 6%; top: 18%; width: 121px; height: 47px;">
                                                                                        <p class="font-extrabold break-words text-center tracking-tighter"
                                                                                           style="line-height: 20px !important; color: #f6e66f;">
                                                                                            {{ $t('CUPÓN') }}</p>
                                                                                    </div>
                                                                                    <div class="absolute"
                                                                                         style="right: 42%; top: 19%; width: 99px; height: 37px; transform: rotatez(270deg);">
                                                                                        <p class="font-extrabold text-black break-words text-center"
                                                                                           style="font-size: 5px;">
                                                                                            {{ $t('GANADOR') }}</p>
                                                                                    </div>
                                                                                    <img
                                                                                        src="https://images.virtualsoft.tech/m/msjT1660672064.png"
                                                                                        alt="sticker" width="220"
                                                                                        height="220">
                                                                                </div>
                                                                            </div>
                                                                            <div class="body-passport w-full"
                                                                                 v-if="prize.state == 'A'">
                                                                                <div class="sticker relative">
                                                                                    <img
                                                                                        src="https://images.virtualsoft.tech/m/msjT1657820853.png"
                                                                                        alt="sticker" width="220"
                                                                                        height="220">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="award-win w-2/4">
                                                                        <div class="title-win-coupon">
                                                                            <p class="text-black font-extrabold text-center mb-1"
                                                                               style="font-size: 10px;">{{ $t('PREMIO')
                                                                                }}</p>
                                                                        </div>
                                                                        <div
                                                                            class="container-award-win flex justify-center items-center p-1 flex-wrap"
                                                                            style="height: 88px; max-height: 88px;">
                                                                            <img v-if="prize.type == 'Fisico'"
                                                                                 :src="prize.image"
                                                                                 class="w-full h-full object-contain"
                                                                                 alt="premio" width="220"
                                                                                 height="220">
                                                                            <p v-if="prize.type != 'Fisico'"
                                                                               class="text-black font-extrabold text-center m-0 mt-3 w-full uppercase"
                                                                               style="font-size: 10px;">
                                                                                {{ prize.description }}</p>
                                                                            <p v-if="prize.type != 'Fisico'"
                                                                               class="text-black text-center m-0 -mt-8 w-full"
                                                                               style="font-size: 16px;">{{ prize.image
                                                                                }}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!-- Button to view the draw for the winner -->
                                                                <div class="award-road flex m-auto mb-4"
                                                                     style="width: 42%; height: 21px; font-size: 10px;"
                                                                     v-if="prize.state == 'R'">
                                                                    <div
                                                                        class="w-full bg-success rounded-full cursor-pointer"
                                                                        style="background: linear-gradient(1deg, #0000009c, transparent);">
                                                                        <p class="text-center text-neutral font-bold"
                                                                           @click="openModal2(item, prize)">
                                                                            {{ $t('Ver Sorteo') }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Start and finish titles on the road -->
                                                <div class=" title-road break-words absolute top-0 left-0 right-0"
                                                     style="display: flex; align-items: center; justify-content: center;">
                                                    <p class="text-black text-xs uppercase text-center"
                                                       style="width: 47px; height: 20px; margin-left: 62px; margin-top: 22px;">
                                                        {{ $t('INICIO') }}</p>
                                                </div>
                                                <div class=" title-road break-words absolute bottom-0 left-0 right-0"
                                                     style="display: flex; align-items: center; justify-content: center;">
                                                    <p class="text-neutral text-xs uppercase text-center"
                                                       style="width: 47px; height: 20px; margin-right: 257px; margin-bottom: 53px;">
                                                        {{ $t('META') }}</p>
                                                </div>
                                                <!-- Additional information for specific item ID -->
                                                <div v-if="item.id == 113" class="container-group"
                                                     style="margin-left:55%;">
                                                    <div class="info-terms rounded-2xl overflow-hidden mb-3 bg-white"
                                                         style="width: 246px; max-width:246px; height: auto; z-index:2; font-size: 10px; background: linear-gradient(13deg, #00000030, transparent); outline: 3px ridge rgb(25 146 25);">
                                                        <div class="more flex justify-center items-center flex-col">
                                                            <p class="text-black p-2 font-bold text-center uppercase read-more-wrap m-0">
                                                                {{ 'Fecha de sorteos' }}<span
                                                                v-if="moreInfo || !mobile"><br><br>{{ 'Agosto 2022'
                                                                }}<br>{{ '15 Septiembre'
                                                                }}<br>{{ '15 Octubre' }}</span></p>
                                                            <button @click="moreInfo = !moreInfo"
                                                                    aria-label="Ver más/menos"
                                                                    class="text-neutral m-0 bg-success rounded-full px-2  mb-1 button-more"
                                                                    style="background: linear-gradient(1deg, #0000009c, transparent); display:none;">
                                                                {{ moreInfo ? 'Ver Menos' : 'Ver Más' }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="info-terms bg-white rounded-2xl overflow-hidden"
                                                         style="width: 246px; max-width:246px; height: auto; z-index:2; font-size: 10px; background: linear-gradient(13deg, #00000030, transparent); outline: 3px ridge rgb(25 146 25);">
                                                        <div class="more flex justify-center items-center flex-col">
                                                            <p class="text-black p-2 font-bold text-center uppercase m-0">
                                                                {{ '-Sorteo de 7 viajes a Doha' }}<span
                                                                v-if="moreInfo2 || !mobile"
                                                                class="font-light"><br><br>{{ '-Incluye Pasajes, hotel y entradas a los partidos de ecuador vs Qatar / Paises bajos / Senegal'
                                                                }}</span></p>
                                                            <p class="text-black p-2 font-light text-center uppercase m-0"
                                                               v-if="moreInfo2 || !mobile">
                                                                {{ '-Además, podrás participar por 3 tv 65\'\', 1 celular de última generación, 8 camisetas originales de la selección ecuatoriana'
                                                                }}</p>
                                                            <button @click="moreInfo2 = !moreInfo2"
                                                                    aria-label="Ver más/menos"
                                                                    class="text-neutral m-0 bg-success rounded-full px-2 mb-1 button-more"
                                                                    style="background: linear-gradient(1deg, #0000009c, transparent); display:none;">
                                                                {{ moreInfo2 ? 'Ver Menos' : 'Ver Más' }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal for displaying prize details -->
                            <div
                                :class="'popuproad-'+item.id +' modal text-neutral-content items-center bg-neutral-content bg-opacity-75'"
                                v-show="item.open">
                                <div class="modal-box max-h-[481px] rounded-2xl bg-yellow-800 relative" v-if="item.open"
                                     style="max-width: 100%; height:100%; max-height: 100%; background: url('https://images.virtualsoft.tech/m/msjT1662482092.png'); background-size: cover;">
                                    <!-- Button to close the modal -->
                                    <div class="cursor-pointer" @click="modalClose(item)">
                                        <button aria-label="Cerrar"
                                                class="bg-white text-black rounded-full text-2xl absolute px-2 right-0 mr-5"
                                                style="background: linear-gradient(1deg, #00000030, transparent); background-position: center;">
                                            X
                                        </button>
                                    </div>
                                    <div class="w-full h-full md:px-8">
                                        <!-- Coupon body layout -->
                                        <div class="body-coupon grid grid-cols-1 md:grid-cols-3 w-full h-full">
                                            <div class="w-full h-full flex justify-center"
                                                 style="max-height: 379px !important;">
                                                <img
                                                    v-if="appComponent.config.raffles != undefined && appComponent.config.raffles.imgWinner != undefined && appComponent.config.raffles.imgWinner != ''"
                                                    class="w-9/12 h-full object-contain"
                                                    :src="appComponent.config.raffles.imgWinner"
                                                    alt="qatar" width="100" height="100">
                                            </div>
                                            <div
                                                class="w-full h-full flex items-center justify-center flex-col body-passport my-5 bg-base-300/60 rounded-2xl backdrop-blur-md"
                                                style="max-height: 500px !important;">
                                                <div class="users mb-3">
                                                    <p class="capitalize text-center text-xl md:text-2xl text-neutral italic w-full">
                                                        {{ $t('cantidad de usuarios participando') }} </p>
                                                    <p v-if="!flagOpenModal2"
                                                       class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center italic"
                                                       style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                                        {{ item.totalPlayers }}</p>
                                                    <p v-if="flagOpenModal2"
                                                       class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center italic"
                                                       style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                                        {{ openUP }}</p>
                                                </div>
                                                <div class="coupons">
                                                    <p class="capitalize text-center text-xl md:text-2xl text-neutral italic">
                                                        {{ $t('cantidad de cupones participando') }} </p>
                                                    <p v-if="!flagOpenModal2"
                                                       class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center italic"
                                                       style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                                        {{ item.totalCoupons }}</p>
                                                    <p v-if="flagOpenModal2"
                                                       class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center italic"
                                                       style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                                        {{ openCP }}</p>
                                                </div>
                                                <div
                                                    class="title-countdown items-center justify-center text-neutral text-xl mt-5"
                                                    style="top: 169px;">
                                                    <p class="text-center m-0">Sorteo empieza en:</p>
                                                </div>
                                                <div class="flex items-center justify-center"
                                                     style="height: 53px; width: 101px; top: 211px;">
                                                    <p class="text-3xl text-neutral font-black countdown">
                                                        <vue-countdown v-if="!flagOpenModal2" :time="item.datePrice"
                                                                       :interval="100"
                                                                       v-slot="{ minutes, seconds }">
                                                            {{ minutes }} : {{ seconds }}
                                                        </vue-countdown>
                                                        <vue-countdown v-if="flagOpenModal2" :time="datePrice"
                                                                       :interval="100"
                                                                       v-slot="{ minutes, seconds }"
                                                                       @end="getPrize2();">
                                                            {{ minutes }} : {{ seconds }}
                                                        </vue-countdown>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="award-animation w-full h-full flex justify-center relative">
                                                <img class="w-3/5 h-full object-contain"
                                                     src="https://images.virtualsoft.tech/site/image-lotery.png" alt=""
                                                     width="100"
                                                     height="100">
                                                <div v-if="item.idPrize != undefined && item.idPrize.length>0 && !openM"
                                                     class="w-full h-full flex justify-center absolute"
                                                     style="max-height: 379px !important;">
                                                    <div class="absolute flex items-center justify-center md:mt-20"
                                                         style="height: 206px; width: 60%; overflow: hidden; min-width: 300px;
                                            max-width: 308px;">
                                                        <div
                                                            class="absolute flex items-center justify-center bg-black text-coupon"
                                                            style="width: 59%; height: 27%; margin-bottom: 13%; z-index: 1;">
                                                            <p class="font-extrabold break-words text-center tracking-tighter text-3xl"
                                                               style="color: #f6e66f; line-height: 20px !important;">
                                                                {{ $t('CUPÓN') }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 39%; height: 15%; margin-bottom: 4%; margin-right: 66%; z-index: 1; background-color: #f3e168; transform: rotatez(270deg);">
                                                            <p class="font-bold text-black break-words text-center tracking-normal m-0"
                                                               style="line-height: 20px !important;">{{ $t('GANADOR')
                                                                }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 43%; height: 17%; margin-bottom: -4%; margin-left: 71%; z-index: 1; background-color: #fff; transform: rotatez(270deg);">
                                                            <p class="text-black break-words text-center tracking-tighter m-0"
                                                               style="line-height: 20px !important;">ID: {{ item.idPrize
                                                                }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 59%; height: 28%; margin-bottom: -18%; z-index: 1; background: linear-gradient(88deg, #f6e66f,#e7cd5f, #ce9c09);">
                                                            <p class="font-extrabold text-black break-words text-center tracking-tighter text-xl"
                                                               style="line-height: 20px !important;">{{ item.idPrize
                                                                }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 56%; height: 20%; margin-bottom: -33%; margin-right: 7px; z-index: 1;">
                                                            <p class="text-black break-words text-center tracking-tighter text-xs"
                                                               style="line-height: 12px !important;">
                                                                {{ $t('USUARIO GANADOR:') }}
                                                                {{ item.user_id }}</p>
                                                        </div>
                                                        <img class="w-full absolute text-coupon"
                                                             src="https://images.virtualsoft.tech/m/msjT1660671379.png"
                                                             alt="background"
                                                             width="525" height="634" style="z-index: 2;">
                                                        <img class="w-full absolute coupon-scrape"
                                                             src="https://images.virtualsoft.tech/icons/coupon-scrape.png"
                                                             alt="background"
                                                             width="525" height="634" style="z-index: 2;">
                                                    </div>
                                                </div>
                                                <div v-if="openM" class="w-full h-full flex justify-center absolute"
                                                     style="max-height: 379px !important;">
                                                    <div class="absolute flex items-center justify-center md:mt-20"
                                                         style="height: 206px; width: 60%; overflow: hidden; min-width: 300px;
                                            max-width: 308px;">
                                                        <div
                                                            class="absolute flex items-center justify-center bg-black text-coupon"
                                                            style="width: 59%; height: 27%; margin-bottom: 13%; z-index: 1;">
                                                            <p class="font-extrabold break-words text-center tracking-tighter text-3xl"
                                                               style="color: #f6e66f; line-height: 20px !important;">
                                                                {{ $t('CUPÓN') }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 39%; height: 15%; margin-bottom: 4%; margin-right: 66%; z-index: 1; background-color: #f3e168; transform: rotatez(270deg);">
                                                            <p class="font-bold text-black break-words text-center tracking-normal m-0"
                                                               style="line-height: 20px !important;">{{ $t('GANADOR')
                                                                }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 43%; height: 17%; margin-bottom: -4%; margin-left: 71%; z-index: 1; background-color: #fff; transform: rotatez(270deg);">
                                                            <p class="text-black break-words text-center tracking-tighter m-0"
                                                               style="line-height: 20px !important;">ID: {{ openMC
                                                                }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 59%; height: 28%; margin-bottom: -18%; z-index: 1; background: linear-gradient(88deg, #f6e66f,#e7cd5f, #ce9c09);">
                                                            <p class="font-extrabold text-black break-words text-center tracking-tighter text-xl"
                                                               style="line-height: 20px !important;">{{ openMC }}</p>
                                                        </div>
                                                        <div
                                                            class="absolute flex items-center justify-center text-coupon"
                                                            style="width: 56%; height: 20%; margin-bottom: -33%; margin-right: 7px; z-index: 1;">
                                                            <p class="text-black break-words text-center tracking-tighter text-xs"
                                                               style="line-height: 12px !important;">
                                                                {{ $t('USUARIO GANADOR:') }}
                                                                {{ openUG }}</p>
                                                        </div>
                                                        <img class="w-full absolute text-coupon"
                                                             src="https://images.virtualsoft.tech/m/msjT1660671379.png"
                                                             alt="background"
                                                             width="525" height="634" style="z-index: 2;">
                                                        <img class="w-full absolute coupon-scrape"
                                                             src="https://images.virtualsoft.tech/icons/coupon-scrape.png"
                                                             alt="background"
                                                             width="525" height="634" style="z-index: 2;">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal for terms and conditions -->
                            <div v-if="modalTyc"
                                 class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75">
                                <div class="modal-box rounded-2xl w-8/12 max-w-4xl h-4/5">
                                    <label for="m-modal-tyc" class="cursor-pointer text-right block"><span
                                        class="icon-cross"></span></label>
                                    <p class="title-tyc font-bold text-center mb-3">
                                        {{ $t('Acumula 5 Stickers y participa por uno de los 7 viajes a Qatar. Mientras más Stickers acumules más oportunidades tienes de ganar')
                                        }}</p>
                                    <p class="sub-title-tyc font-bold text-center uppercase text-neutral p-2"
                                       style="background-image: url(https://images.virtualsoft.tech/m/msjT1656610737.png); background-position: center; background-repeat: no-repeat; background-size: 108% 157%;">
                                        {{ $t('¿Cómo participar?') }}</p>
                                    <p class="text-tyc">
                                        {{ $t('Ingresa a tu cuenta de Ecuabet.com y por tus pronósticos y depósitos recibe Stickers. Acumula 5 Stickers en el sorteo de Qatar y recibe un cupón para participar del sorteo.')
                                        }}</p>
                                    <img :src="'imagetycloyalty'" alt="Stickers Info" width="995" height="314"
                                         class="my-3">
                                    <p class="text-tyc">
                                        {{ $t('Puedes  acumular  Stickers  pronosticando en deportes o en casino o también puedes hacerlo depositando por cualquier medio de pago. Cada Stickers tiene un valor de $25')
                                        }}</p>
                                    <p class="text-tyc2 font-bold">
                                        {{ $t('Al completar 5 Stickers recibirás un cupón con el cual estarás participando de nuestro increíble sorteo.')
                                        }}</p>
                                    <img :src="'imagetycloyalty2'" alt="Cupones Info" width="995" height="314"
                                         class="my-3">
                                    <p class="text-tyc">{{ $t('Entre más cupones tengas más es tu posibilidad de ganar')
                                        }}</p>
                                    <p class="text-tyc">
                                        {{ $t('Aplican Términos y condiciones promoción valida solo para usuarios online y mayores de 18 años.')
                                        }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Raffles v1 -->


    <!-- Raffles v2  -->
    <div
        v-if="appComponent.config.raffles != undefined && appComponent.config.raffles[appComponent.country] != undefined && appComponent.config.raffles[appComponent.country] == 2"
        class="w-full relative">
        <div class="m-auto w-full relative">
            <!-- Image representing the raffles -->
            <img :src="imgRaffles" alt="" class="object-cover w-full">
            <div class="arrow absolute left-0 right-0 top-0">
                <!-- Arrow image for visual indication -->
                <img src="https://images.virtualsoft.tech/m/msjT1684527892.png" alt="" width="40" height="80"
                     class="md:w-20 w-16 mt-[30%] ml-[14%] md:mt-[5%] md:ml-[75%] object-cover">
            </div>
            <div class="absolute left-0 right-0 top-0 z-40">
                <!-- Router link to navigate to the new casino page -->
                <RouterLink :to="'/new-casino'"
                            v-bind="analyticsAttrs('menu:nav:casino')"
                            class="rounded-md mt-[32%] ml-[37%] md:mt-[5%] md:ml-[81%] w-[108px] h-[23px] md:w-[184px] md:h-[40px] inline-block"></RouterLink>
            </div>
            <div class="absolute left-0 right-0 top-0 z-10">
                <!-- Display of value coupons -->
                <p class="text-neutral text-xs md:text-base md:mt-[9.3%] md:ml-[87.6%] mt-[43%] ml-[54%]">
                    {{ torneos.valueCoupons }} </p>
            </div>
            <div class="absolute left-0 right-0 top-0 z-10">
                <!-- Display of value stickers -->
                <p class="text-neutral text-xs md:text-base mt-[43%] ml-[39%] md:mt-[9.3%] md:ml-[82.2%]">
                    {{ torneos.valueStickers }} </p>
            </div>
            <div class="points">
                <!-- Loop through each item in torneos to display maps -->
                <div v-for="item in torneos" class="maps">
                    <div class="checkpoint-maps" :class="appComponent.config.name">
                        <div class="absolute top-0 left-0 right-0 img-maps"
                             style="display: flex; align-items: center; justify-content: center;">
                            <!-- Image points that can be clicked to open a popup -->
                            <img :src="item.imagesPoints" @click="openPopup(item.id)" alt="" :id="item.id" width="90"
                                 height="90" class="z-50 hover:cursor-pointer img-pointers"
                                 style="width: 10%; height: 20%; margin-left: -84.0%; margin-top: 13%; cursor:pointer; z-index:1;">
                        </div>
                        <template v-if="appComponent.config.raffles.assets == undefined">
                            <div class="absolute left-0 right-0 top-0 z-40">
                                <!-- Router link for new casino with an arrow image -->
                                <RouterLink :to="'/new-casino'"
                                            v-bind="analyticsAttrs('menu:nav:casino')"
                                            class="arrow rounded-md mt-[170%] ml-[5%] md:mt-[16%] md:ml-[73%] w-[108px] h-[23px] md:w-[50px] md:h-[50px] inline-block">
                                    <img src="https://images.virtualsoft.tech/m/msjT1694721780.png" height="200"
                                         width="200" class="w-[50px] h-[50px] object-contain">
                                </RouterLink>
                            </div>
                            <div class="absolute left-0 right-0 top-0 z-40 flex justify-center items-center">
                                <!-- Router link for winner announcement or countdown -->
                                <RouterLink :to="'/new-casino'"
                                            v-bind="analyticsAttrs('menu:nav:casino')"
                                            class="flex flex-col leading-[.7rem] justify-center items-center rounded-md mt-[167.5%] ml-[-29%] md:mt-[13%] md:ml-[74.8%] w-[108px] h-[23px] md:w-[184px] md:h-[50px]">
                                    <p class="text-[#fddc30] text-[.60rem] md:text-[.75rem] xl:text-[.95rem] bg-[#8c221b] p-[.2rem] border-solid border-1  border-[#e14e48] shadow-[inset_0_0_3px_#00000057] rounded-lg">
                                        {{ objResponse.nameWinner != undefined && objResponse.nameWinner != null && objResponse.nameWinner != '' ? $t('Ganador del premio :') : $t('Sorteo final empieza en:')
                                        }}</p>
                                </RouterLink>
                            </div>
                            <div class="absolute left-0 right-0 top-0 z-40 flex justify-center items-center">
                                <!-- Clickable span to open a modal with winner information or countdown -->
                                <span @click="openGlobal = true; flagOpenModal2 = true"
                                      class="flex cursor-pointer flex-col leading-[.7rem] justify-center items-center rounded-md mt-[172.8%] ml-[-29%] md:mt-[15.2%] md:ml-[74.5%] w-[78px] h-[23px] md:w-[184px] md:h-[50px] 2xl:w-[220px] 2xl:h-[75px] xl:leading-[.9rem]">
                                    <p v-if="objResponse.nameWinner != undefined && objResponse.nameWinner != null && objResponse.nameWinner != ''"
                                       class="text-neutral text-[.50rem] md:text-[.55rem] xl:text-[1rem]  text-center break-words max-h-[19.59px] w-[65px] max-w-[65px] md:max-h-[50px] md:w-[110px] md:max-w-[110px] overflow-hidden text-ellipsis">{{ objResponse.nameWinner
                                        }}</p>
                                    <vue-countdown v-else-if="objResponse.timeGlobal != undefined"
                                                   :time="formatDate(objResponse.timeGlobal)"
                                                   class="text-neutral text-[.50rem] md:text-[.55rem] xl:text-[.80rem]  text-center break-words max-h-[19.59px] max-w-[65px] md:max-h-[50px] md:w-[110px] md:max-w-[110px] font-light overflow-hidden text-ellipsis"
                                                   :interval="100" v-slot="{ days, hours, minutes, seconds }">{{ days }} {{ $t('días')
                                        }} : {{ hours }} {{ $t('horas') }} : {{ minutes }} {{ $t('minutos')
                                        }} : {{ seconds }} {{ $t('segundos') }}</vue-countdown>
                                    <p v-else
                                       class="text-neutral text-[.50rem] md:text-[.55rem] xl:text-[1rem] text-center break-words max-h-[19.59px] w-[65px]  max-w-[65px] md:max-h-[50px] md:w-[170px] md:max-w-[170px] overflow-hidden text-ellipsis">{{ $t('Por definir')
                                        }}</p>
                                </span>
                            </div>
                            <div class="absolute top-0 left-0 right-0 text-maps"
                                 style="display: flex; align-items: center; justify-content: center;">
                                <!-- Text indicating the start of the raffle -->
                                <p class="text-neutral uppercase text-center"
                                   style="font-size: .8vw; transform: matrix(1, -1, 0, 1, 0, 0); width: 47px; height: 20px; margin-left: -77.8%; margin-top: 14.5%;">
                                    {{ $t('INICIO') }}</p>
                            </div>
                        </template>
                        <!-- end text global -->
                    </div>
                </div>
            </div>
            <!-- Flash images for visual effects -->
            <div class=" title-road break-words absolute top-0 left-0 right-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png"
                     class="mt-[174%] ml-[-5%] md:mt-[20%] md:ml-[56%] flash-2" width="65" height="65" alt="destello">
            </div>
            <div class=" title-road break-words absolute top-0 left-0 right-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png"
                     class="mt-[174%] ml-[-54%] md:mt-[20%] md:ml-[91%] flash" width="65" height="65" alt="destello">
            </div>
            <div class=" title-road break-words absolute top-0 left-0 right-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png"
                     class="mt-[169%] ml-[-8%] md:mt-[13%] md:ml-[88%] flash" width="65" height="65" alt="destello">
            </div>
            <div class=" title-road break-words absolute top-0 left-0 right-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png"
                     class="mt-[167%] ml-[-51%] md:mt-[15%] md:ml-[61%] flash-2" width="65" height="65" alt="destello">
            </div>
            <div class=" title-road break-words absolute top-0 left-0 right-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png"
                     class="mt-[73%] ml-[-36%] md:mt-[18%] md:ml-[-78%] flash" width="65" height="65" alt="destello">
            </div>
            <!--End Flash -->
            <!-- Icons Gif -->
            <template
                v-if="(appComponent.config.raffles.assets == undefined || appComponent.config.raffles.assets[appComponent.country] == undefined)">
                <div class=" title-road break-words absolute top-0 left-0 right-0"
                     style="display: flex; align-items: center; justify-content: center;">
                    <img src="https://images.virtualsoft.tech/m/msjT1682092054.gif"
                         class="mt-[100%] ml-[-41%] w-[40px] md:w-[50px] md:mt-[9.5%] md:ml-[-9.5%]" width="65"
                         height="65" alt="destello">
                </div>
                <div class=" title-road break-words absolute top-0 left-0 right-0"
                     style="display: flex; align-items: center; justify-content: center;">
                    <img src="https://images.virtualsoft.tech/m/msjT1682092422.gif"
                         class="mt-[102.2%] ml-[50.5%] w-[75px] md:w-[128px] md:mt-[17.2%] md:ml-[-0.5%]" width="65"
                         height="65" alt="destello">
                </div>
                <div class=" title-road break-words absolute top-0 left-0 right-0"
                     style="display: flex; align-items: center; justify-content: center;">
                    <img src="https://images.virtualsoft.tech/m/msjT1682092958.gif"
                         class="mt-[130%] ml-[-11.8%] w-[43px] md:w-[60px] md:mt-[13.2%] md:ml-[22.5%]" width="65"
                         height="65" alt="destello">
                </div>
                <div class=" title-road break-words absolute top-0 left-0 right-0"
                     style="display: flex; align-items: center; justify-content: center;">
                    <img src="https://images.virtualsoft.tech/m/msjT1682092845.gif"
                         class="mt-[133%] ml-[-9.5%] w-[43px] md:w-[60px] md:mt-[12.2%] md:ml-[25.5%]" width="65"
                         height="65" alt="destello">
                </div>
                <div class=" title-road break-words absolute top-0 left-0 right-0"
                     style="display: flex; align-items: center; justify-content: center;">
                    <img src="https://images.virtualsoft.tech/m/msjT1682093102.gif"
                         class="mt-[132%] ml-[-28.5%] w-[43px] md:w-[60px] md:mt-[13.2%] md:ml-[31.5%]" width="65"
                         height="65" alt="destello">
                </div>
            </template>
            <!-- End Icons Gif -->
            <div class=" h-3/6 absolute top-0 left-0"
                 style="display: flex; align-items: center; justify-content: center;">
                <img src="https://images.virtualsoft.tech/m/msjT1680028103.png" alt="" width="50" height="50"
                     style="width: 50px; height: 50px; margin-top: 281px; margin-left: -1214px;">
                <!-- <p class="text-black text-xs uppercase text-center" style="width: 47px; height: 20px; margin-left: 62px; margin-top: 22px;">{{$t('INICIO')}}</p> -->
            </div>
            <!-- modal sorteo final  -->
            <div :class="'modal text-neutral-content items-center bg-opacity-75'" v-show="openGlobal">
                <div class="modal-box bg-[#006faf]rounded-2xl max-h-[800px] relative lg:max-h-[80%]" v-if="openGlobal"
                     style="max-width: 100%; height:100%;background: url('https://images.virtualsoft.tech/m/msjT1682009458.png'); background-size: cover;">
                    <div
                        class="w-full h-full background-modal top-0 left-0 absolute bg-[url('https://images.virtualsoft.tech/m/msjT1682009503.png')] bg-[length:1500px_800px] bg-no-repeat bg-center">
                    </div>
                    <div class="w-full h-full md:px-8">
                        <div
                            class="award-animation overflow-auto w-full h-full flex flex-col justify-start items-center relative z-1">
                            <div class="cursor-pointer z-10" @click="openGlobal = false">
                                <!-- Button to close the modal -->
                                <button aria-label="Cerrar"
                                        class="bg-white text-black rounded-full text-2xl absolute px-2 right-0 mr-5"
                                        style="background: linear-gradient(1deg, #00000030, transparent); background-position: center;">
                                    X
                                </button>
                            </div>
                            <div class=" w-4/5 h-10 flex justify-center items-center mb-6">
                                <!-- Countdown timer for the raffle -->
                                <p class="text-3xl text-neutral text-center font-black countdown rounded-md">
                                    <vue-countdown v-if="!flagOpenModal2" :time="formatDate(objResponse.timeGlobal)"
                                                   class="h-auto md:text-base text-xs px-5" :interval="100"
                                                   v-slot="{ days, hours, minutes, seconds }">
                                        {{ days }} {{ $t('días') }} : {{ hours }} {{ $t('horas') }} : {{ minutes }}
                                        {{ $t('minutos') }} : {{ seconds }} {{ $t('segundos') }}
                                    </vue-countdown>
                                    <vue-countdown v-if="flagOpenModal2" :time="formatDate(objResponse.timeGlobal)"
                                                   class="h-auto md:text-base text-xs px-5" :interval="100"
                                                   v-slot="{ days, hours, minutes, seconds }" @end="getPrize2();">
                                        {{ days }} {{ $t('días') }} : {{ hours }} {{ $t('horas') }} : {{ minutes }}
                                        {{ $t('minutos') }} : {{ seconds }} {{ $t('segundos') }}
                                    </vue-countdown>
                                </p>
                            </div>
                            <div class="w-full h-auto">
                                <div
                                    class="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:max-h-[379px]">
                                    <div class="w-full lg:w-1/2 h-full flex justify-center items-center ">
                                        <div
                                            class="flex justify-start items-center flex-col w-[200px] h-full rounded-xl gap-y-3 bg-gray-200 overflow-hidden flex-nowrap">
                                            <!-- Display of prize information -->
                                            <p class="w-full h-auto text-center p-2 text-neutral font-bold"
                                               style="background: linear-gradient(85deg, rgb(159, 99, 1), rgb(159, 99, 1), rgb(227, 196, 79), rgb(227, 196, 79), rgba(159, 99, 1, 0.79));">
                                                {{ $t('PREMIOS') }}</p>
                                            <p class="w-full text-center text-xs">
                                                {{ formatDate2(objResponse.timeGlobal, 'YYYY-MM-DD h:mm:ss a') }}</p>
                                            <p class="w-4/5 bg-[#9f6400] text-neutral text-center">
                                                {{ $t('ID GANADOR:') }}</p>
                                            <p class="w-4/5 text-black text-center">
                                                {{ objResponse.nameWinner != undefined && objResponse.nameWinner != null && objResponse.nameWinner != '' ? objResponse.nameWinner : $t('Pendiente')
                                                }}</p>
                                            <p class="w-4/5 bg-[#9f6400] text-neutral text-center">CUPÓN GANADOR:</p>
                                            <img class="" src="https://images.virtualsoft.tech/m/msjT1681937007.png"
                                                 alt="background" width="100" height="50">
                                            <p class="text-xs">ID: {{ objResponse.idCouponGlobal }}</p>
                                            <p class="w-4/5 bg-[#9f6400] text-neutral text-center">
                                                {{ $t('PREMIO GANADOR:') }}</p>
                                            <div
                                                class="img-container w-[63px] h-[63px] flex justify-center items-center">
                                                <img
                                                    v-if="objResponse.awardGlobal != undefined && objResponse.awardGlobal != null && objResponse.awardGlobal != ''"
                                                    :src="objResponse.awardGlobal" width="100" height="100" alt=""
                                                    class="w-full h-hull object-contain">
                                                <p v-else>{{ $t('Pendiente') }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-1/2 h-full flex justify-center items-center">
                                        <!-- Image representing the game -->
                                        <img class="w-full h-full object-contain"
                                             src="https://images.virtualsoft.tech/site/doradobet/gif/Tragamonedas-Correccion-final.gif"
                                             alt="" width="300" height="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal sorteo final  -->
        </div>
    </div>
    <!-- End Raffles v2 -->

    <!-- Raffles v3 -->
    <div v-if="appComponent.config.raffles[appComponent.country] == 3"
         class="relative w-full h-auto transition-all ease-in-out">
        <!-- Background image for the raffle, conditionally rendered based on the presence of data -->
        <img
            v-if="(torneos != undefined && torneos.length > 0 && !disableButton) && (torneos[counterCard] != undefined && torneos[counterCard].raffleBackground != undefined && torneos[counterCard].raffleBackground != '')"
            :src="torneos[counterCard].raffleBackground" :class="!disableButton  ? 'img-background': ''"
            alt="background raffles"
            class="w-full h-full object-cover object-top absolute top-0 left-0 pointer-events-none opacity-60">
        <!-- Gradient overlay at the bottom of the container -->
        <div class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content"></div>
        <!-- Filter options for raffle types and statuses, displayed when no other views are active -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == false"
             class="w-full h-auto pt-14 md:pt-20 mb-10 relative flex flex-row justify-center items-center gap-x-7 md:gap-x-12">
            <div class="flex flex-col md:flex-row justify-center items-center gap-x-5 gap-y-3">
                <p class="text-xl text-neutral font-bold capitalize">{{ $t('Tipo:') }}</p>
                <p class="text-center text-neutral"><label for="raffles-all">{{ $t('Todos los sorteos') }}</label><input
                    class="ml-1 radio border-solid border-neutral" type="radio" id="raffles-all" name="raffles-type" v-model="typeFilter"
                    @change="getTournaments()" value="0"></p>
                <p class="text-center text-neutral"><label
                    for="raffles-register">{{ $t('Sorteos registrados') }}</label><input class="ml-1 radio border-solid border-neutral" type="radio"
                    id="raffles-register"
                    name="raffles-type"
                    v-model="typeFilter"
                    @change="getTournaments()"
                    value="1"
                    :class="typeFilter !== '1' ? 'border-solid border-neutral' : ''"></p>
            </div>
            <div class="flex flex-col md:flex-row justify-center items-center gap-x-5 gap-y-3">
                <p class="text-xl text-neutral font-bold capitalize">{{ $t('Estado:') }}</p>
                <p class="text-center text-neutral"><label for="raffles-active">{{ $t('Activo') }}</label><input
                    class="ml-1 radio border-solid border-neutral" type="radio" id="raffles-active" name="raffles-status" v-model="stateFilter"
                    @change="getTournaments()" value="A"></p>
                <p class="text-center text-neutral"><label for="raffles-inactive">{{ $t('Desactivado') }}</label><input
                    class="ml-1 radio border-solid border-neutral" type="radio" id="raffles-inactive" name="raffles-status" v-model="stateFilter"
                    @change="getTournaments()" value="I"></p>
            </div>
        </div>
        <!-- Container for displaying tournaments when no other views are active -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == false && torneos.length > 0"
             class="w-full h-[600px] flex justify-center items-center overflow-auto relative">
            <div class="w-[50px] h-full flex justify-center items-center px-2">
                <!-- Left arrow for navigating through tournaments -->
                <img :class="disableButton ==false ? 'opacity-100' : 'opacity-50'"
                     v-if="torneos.length > 1 && leftArrow"
                     @click="disableButton == false ? moveLeft() : false, counterCard == 0 ? leftArrow = false : leftArrow = true, counterCard == torneos.length-1 ? rightArrow = false : rightArrow = true"
                     src="https://images.virtualsoft.tech/m/msjT1685643364.png"
                     class="hover:scale-125 transition-all ease-in-out cursor-pointer">
            </div>
            <div
                class="w-auto h-full flex justify-start items-center max-w-[287px] md:max-w-[694px] xl:max-w-[1041px] container-cards-img transition-all ease-in-out overflow-auto">
                <!-- Loop through tournaments to display each one -->
                <article v-for="(item,index) in torneos"
                         class="w-[347px] h-full flex justify-start md:justify-center items-center shrink-0 pt-0 md:pt-[45px]">
                    <div
                        :class="counterCard == index ? 'md:scale-[1.1] transition-all ease-in-out duration-1000 opacity-100' : 'scale-100 opacity-90'"
                        class="w-[287px] h-[340px] rounded-xl flex justify-start items-center flex-col  relative pt-20 img-cont">
                        <!-- Background image for the tournament card -->
                        <img v-if="item != undefined && item.bgContainer != ''" :src="item.bgContainer" alt=""
                             class="w-full h-full object-cover absolute top-0 left-0 pointer-events-none z-0">
                        <div class="absolute -top-36 w-[289px] md:w-[323px] h-[225px] overflow-hidden">
                            <!-- Character background image -->
                            <img v-if="item != undefined && item.characterBg != ''" :src="item.characterBg"
                                 alt="img raffle" width="200"
                                 class="w-full h-full object-contain pointer-events-none img-animation">
                        </div>
                        <p :title="item.name"
                           class="text-white z-10 text-md font-bold mt-9 mb-2 text-center max-w-[18rem] min-h-[40px] max-h-[40px] leading-6 overflow-hidden text-ellipsis">
                            {{ $t(item.name) }}</p>
                        <p class="text-white text-base z-10 font-bold mb-1 max-w-[18rem] leading-5 max-h-[45px] min-h-[45px] overflow-auto touch-pan-y">
                            {{ $t(item.description) }}</p>
                        <p v-if="item.state=='A'" class="text-white capitalize z-10 font-light text-base mb-0">
                            {{ $t('Sorteo finaliza en:') }}</p>
                        <div class="text-white z-10 font-bold text-xl mb-0">
                            <div v-if="item.state=='A'">
                                <!-- Countdown timer for active tournaments -->
                                <vue-countdown class="flex justify-center items-center gap-x-2" :time="item.endDate2"
                                               :interval="100" v-slot="{ days, hours, minutes, seconds }">
                                    <p class="flex flex-col justify-center items-center">{{ days }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('días') }}</span></p>
                                    <p class="flex flex-col justify-center items-center"> {{ hours }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('horas') }}</span></p>
                                    <p class="flex flex-col justify-center items-center"> {{ minutes }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('min') }}</span></p>
                                    <p class="flex flex-col justify-center items-center"> {{ seconds }}<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('seg') }}</span></p>
                                </vue-countdown>
                            </div>
                        </div>
                        <div class="grid grid-cols-1">
                            <!-- Button to show the road for the selected tournament -->
                            <div class="flex gap-x-12">
                                <button
                                @click="showRoad = true, showStickers = false,counterCard = index, roadWithPrizes(torneos[counterCard].id)"
                                class="bg-[#299ABDff] rounded-xl px-5 py-2 text-white text-xs button-submit font-bold hover:bg-success2 hover:scale-105">
                                {{ $t('Camino') }}
                            </button>
                            <!-- Button to show stickers for the selected tournament -->
                            <button
                                @click="showStickers = true, showRoad = false, counterCard = index, getStickers(torneos[counterCard].id), getCoupons(torneos[counterCard].id)"
                                class="bg-[#299ABDff] rounded-xl px-5 py-2 text-white text-xs button-submit font-bold hover:bg-success2 hover:scale-105">
                                {{ $t('Stickers') }}
                            </button>
                            </div>
                            <div v-if="appComponent.session.logueado && item.userjoin != undefined"
                             class="flex justify-center items-center pt-1">
                            <!-- Button for users to join the tournament -->
                            <button @click="clickJoinUser(item)" v-if="!item.userjoin && !appComponent.infoApp"
                                    class="bg-success rounded-2xl py-2 text-white max-w-sm w-[130px] text-xs button-submit capitalize font-bold hover:scale-105 hover:bg-[#299ABDff]">
                                {{ $t('Participa ahora') }}
                            </button>
                            <button v-if="item.userjoin && !appComponent.infoApp"
                                    class="bg-success rounded-2xl py-2 text-white max-w-sm w-[130px] text-xs button-submit capitalize font-bold hover:scale-105 hover:bg-[#299ABDff]">
                                {{ $t('Participando') }}
                            </button>
                        </div>
                        </div>
                        <div
                            v-if="item.hasCounter === '1'"
                            class="w-[177px] flex items-center justify-center h-9 absolute -bottom-4 bg-primary rounded-xl">
                            <div class="w-[175px] h-8 flex justify-center items-center bg-base-300 rounded-xl relative overflow-hidden">
                                <img src="https://images.virtualsoft.tech/m/msj0212T1756221644.png"
                                     alt=""
                                     class="absolute inset-0 w-full h-full object-cover z-0 opacity-30">

                                <div class="flex justify-center items-center z-10 absolute gap-x-4">
                                    <img src="https://images.virtualsoft.tech/m/msj0212T1756221870.png"
                                         alt=""
                                         class="w-6 h-5 mr-2">

                                    <span class="text-neutral text-sm font-semibold" v-if="!item.loadingPlayers">
                                      {{ item.totalPlayers || 0 }} {{ $t('Inscrito') }}
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
                </article>
            </div>
            <div class="w-[50px] h-full flex justify-center items-center px-2">
                <!-- Right arrow for navigating through tournaments -->
                <img :class="disableButton ==false ? 'opacity-100' : 'opacity-50'"
                     v-if="torneos.length > 1 && rightArrow"
                     @click="disableButton == false ? moveRight() : false, counterCard == 0 ? leftArrow = false : leftArrow = true, counterCard == torneos.length-1 ? rightArrow = false : rightArrow = true"
                     :src="$t('https://images.virtualsoft.tech/m/msjT1685643364.png')"
                     class="rotate-180 hover:scale-125 transition-all ease-in-out cursor-pointer">
            </div>
        </div>
        <!-- Road view for the selected tournament -->
        <div v-if="showRoad == true && showStickers == false && showCoupons == false && torneos.length > 0"
             class="w-full h-full flex justify-center items-start overflow-y-auto relative py-0 md:pt-56 md:h-[721px]">
            <button @click="showRoad = false"
                    class="arrow-back rounded-full px-3 py-3 text-neutral text-xs font-bold hover:bg-success2 hover:scale-105 absolute top-[45px] left-[12px]">
                <ArrowBack :width="20" :height="20" :fill="'white'"></ArrowBack>
            </button>
            <button @click="showRoad = false, showStickers = true, getStickers(torneos[counterCard].id)"
                    class="arrow-back rounded-full px-3 py-3 text-neutral text-xs font-bold hover:bg-success2 hover:scale-105 absolute top-[47px] left-[61px]">
                {{ $t('Stickers') }}
            </button>
            <div class="w-auto md:w-full md:h-auto h-auto md:max-w-[3057px] md:max-h-[473px] my-36 md:my-0">
                <div :class="'roadv2-'+torneos[counterCard].withPrizes.length" class="relative">
                    <!-- Loop through prizes for the selected tournament -->
                    <div v-for="(item, i) in torneos[counterCard].withPrizes" class="absolute left-0 right-0 top-0">
                        <div class="w-12 h-12 text-neutral text-xs relative cursor-pointer ">
                            <div @click="prizeOpen(torneos[counterCard]), item.open=true"
                                 class="z-10 relative hover:scale-125 transition-all duration-700 ease-in-out"
                                 :class="item.current && i+1 != torneos[counterCard].withPrizes.length ? 'active-award' : ''">
                                <p :class="item.current && i+1 != torneos[counterCard].withPrizes.length ? 'text-neutral' : 'text-[#4b395e]'"
                                   class="absolute  text-lg top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4  font-bold">
                                    {{ i + 1 }}</p>
                                <img v-if="item.current && i+1 != torneos[counterCard].withPrizes.length"
                                     :src="$t('https://images.virtualsoft.tech/m/msjT1686076724.png')"
                                     class=" w-full h-full object-contain ">
                                <img v-else :src="$t('https://images.virtualsoft.tech/m/msjT1686076702.png')"
                                     class="w-full h-full animated">
                            </div>
                            <div
                                class="w-28 h-28 animate-spin absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 z-0">
                                <img v-if="item.current && i+1 != torneos[counterCard].withPrizes.length"
                                     src="https://images.virtualsoft.tech/m/msjT1686081313.png"
                                     class="w-full h-full object-contain rotate-img opacity-80">
                            </div>
                            <div v-if="item.open"
                                 :class="i<torneos[counterCard].withPrizes.length/2 ? 'left-[-41px] md:left-0': 'right-[-41px] md:right-0'"
                                 class="scale-75 md:scale-100 w-[250px] h-[350px] z-30 absolute top-[-46px] md:top-0 bg-[length:250px_350px] bg-no-repeat"
                                 :style="{'background-image' : `url(${torneos[counterCard].bgContainer})`}">
                                <div class="w-full h-[37px] relative">
                                    <div class="w-[230px] h-[100px] absolute top-[-65px] left-[9px]">
                                        <img :src="$t('https://images.virtualsoft.tech/m/msjT1686236234.png')"
                                             class="img-animation object-contain w-full h-full">
                                    </div>
                                    <button @click="item.open = false"
                                            class="border-1 border-solid border-white rounded-full btn btn-circle btn-sm bg-red-700 text-neutral font-bold absolute bottom-0 right-[-12px] text-center">
                                        X
                                    </button>
                                </div>
                                <div
                                    class="w-[250px] h-[313px] flex flex-col justify-start items-center overflow-y-auto gap-y-4 container-award-detail">
                                    <!-- Loop through prizes for each item -->
                                    <article v-for="prize in item.prizes"
                                             class="w-[250px] h-[313px] flex flex-col justify-start items-center shrink-0 grow-0">
                                        <p class="uppercase text-white font-bold text-lg">{{ $t('GANADOR:') }}</p>
                                        <p v-if="prize.userWin.user_id" class="uppercase text-white text-sm text-center px-4 ml-4 mr-4">
                                            {{ prize.userWin.user_id }}</p>
                                        <p v-else class="uppercase text-white text-sm">{{ $t('PENDIENTE') }}</p>
                                        <div class="relative w-3/5 h-14">
                                            <p class="absolute top-[17px] left-[24px] text-black font-bold text-[0.5rem] rotate-90 text-center">
                                                {{ $t('CUPÓN') }}</p>
                                            <p class="absolute top-[11px] left-[60px] text-black font-bold text-[0.7rem] text-center">
                                                {{ $t('GANADOR') }}</p>
                                            <p v-if="prize.userWin.coupon_id != undefined"
                                               class="absolute top-[24px] left-[60px] text-black text-[0.7rem] text-center">
                                                {{ prize.userWin.coupon_id }}</p>
                                            <p v-else
                                               class="absolute top-[24px] left-[60px] text-black text-[0.7rem] text-center">
                                                {{ $t('PENDIENTE') }}</p>
                                            <img src="https://images.virtualsoft.tech/m/msjT1686333473.png"
                                                 class="w-full h-full object-contain">
                                        </div>
                                        <p class="uppercase text-white font-bold text-lg mt-2">{{ $t('PREMIOS') }}</p>
                                        <div class="relative w-3/5 h-28">
                                            <img v-if="prize.image != undefined && prize.image != ''" :src="prize.image"
                                                 class="w-full h-full object-contain" alt="premio">
                                            <p v-else
                                               class="text-white font-extrabold text-center m-0 mt-3 w-full uppercase"
                                               style="font-size: 10px;">{{ prize.value }} <br /><span
                                                class="text-white font-light">{{ prize.description }}</span></p>
                                        </div>
                                        <p class="uppercase text-white font-bold text-sm mt-2">
                                            {{ $t('FECHA SORTEO') }}</p>
                                        <p class="uppercase text-white text-sm">
                                            {{ formatDate2(prize.date, 'DD-MM-YYYY h:mm:ss a') }}</p>
                                        <!-- Button to view the prize draw -->
                                        <button :disabled="prize.state == 'A'"
                                                @click="openModal2(torneos[counterCard], prize)"
                                                :class="prize.state == 'A' ? 'bg-[#dedede] text-[#9d9d9d]': 'bg-[#299ABDff] text-neutral hover:bg-success2 hover:scale-105 '"
                                                class="rounded-xl px-2 py-2 text-sm button-submit mt-1 uppercase font-bold ">
                                            {{ $t(prize.state == 'A' ? 'Próximamente' : 'Ver sorteo') }}
                                        </button>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mobile background images -->
                <img v-if="flagMobile" src="https://images.virtualsoft.tech/m/msjT1686088799.png"
                     class="w-full h-full object-cover">
                <img v-else src="https://images.virtualsoft.tech/m/msjT1686082197.png"
                     class="w-full h-full object-cover">
            </div>
        </div>
        <!-- Stickers view for the selected tournament -->
        <div v-if="showRoad == false && showStickers == true && showCoupons == false && torneos.length > 0"
             class="w-full h-full flex justify-center items-center overflow-hidden relative">
            <button @click="showStickers = false"
                    class="arrow-back rounded-full px-3 py-3 text-neutral text-xs font-bold hover:bg-success2 hover:scale-105 absolute top-[45px] left-[12px]">
                <ArrowBack :width="20" :height="20" :fill="'white'"></ArrowBack>
            </button>
            <button @click="showStickers = false, showRoad = true"
                    class="arrow-back rounded-full px-3 py-3 text-white text-xs font-bold hover:bg-success2 hover:scale-105 absolute top-[47px] left-[61px]">
                {{ $t('Camino') }}
            </button>
            <div class="container-stickers w-full h-full flex flex-col justify-start items-center md:my-0 my-5">
                <div class="flex flex-col justify-start items-center pt-24 gap-y-14 w-[93%] md:w-[52%] h-auto">
                    <div
                        v-if="(stickers['casino'] != undefined && stickers['casino'].length >0) && (stickers['sportbook'] != undefined && stickers['sportbook'].length > 0)"
                        class="flex flex-col md:flex-row justify-between items-center gap-5">
                        <p class="text-neutral text-4xl uppercase font-extrabold">{{ $t('STICKERS:') }}</p>
                        <div class="group-button flex flex-row justify-center items-center gap-x-5">
                            <button
                                v-if="stickers != undefined && stickers['casino'] != undefined && stickers['casino'].length>0"
                                @click="showRoad = false, selectStickers = 'casino'"
                                :class="selectStickers == 'casino' ? 'bg-success2 scale-105': 'bg-[#299ABDff] scale-100'"
                                class=" rounded-full px-7 py-2 text-white text-2xl button-submit font-bold  hover:scale-105 ">
                                {{ $t('Casino') }}
                            </button>
                            <button
                                v-if="stickers != undefined && stickers['sportbook'] != undefined && stickers['sportbook'].length>0"
                                @click="showRoad = false, selectStickers = 'sportbook'"
                                :class="selectStickers == 'sportbook' ? 'bg-success2 scale-105': 'bg-[#299ABDff] scale-100'"
                                class="rounded-full px-5 py-2 text-white text-2xl button-submit font-bold hover:scale-105">
                                {{ $t('Deportivas') }}
                            </button>
                        </div>
                    </div>
                    <div clas="flex justify-center items-center flex-col">
                        <h3 v-if="selectStickers == 'sportbook'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por pronósticos deportivos') }}</h3>
                        <h3 v-else-if="selectStickers == 'casino'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por pronósticos casino') }}</h3>
                        <h3 v-else-if="selectStickers == 'deposit'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por depósitos') }}</h3>
                        <p v-if="selectStickers == 'sportbook'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.sportbookMax
                            }}.
                            {{ $t('Cada pronóstico individual debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.sportbookMin }}</p>
                        <p v-else-if="selectStickers == 'casino'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.casinoMax
                            }}.
                            {{ $t('Cada pronóstico individual debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.casinoMin }}</p>
                        <p v-else-if="selectStickers == 'deposit'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.depositMax
                            }}.
                            {{ $t('Cada depósito debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.depositMin }}</p>
                    </div>
                </div>
                <div
                    class="body-stickers flex flex-wrap flex-col md:flex-row justify-center items-center w-3/5 h-auto my-8 gap-5">
                    <!-- Loop through stickers for the selected type -->
                    <article v-for="sticker in stickers[selectStickers]"
                             class="w-[100px] h-[100px]  relative flex justify-center items-center pointer-events-none">
                        <div
                            class="w-full h-full rounded-full overflow-hidden relative saturate-150 sticker-animation-circle">
                            <p v-if="sticker.percent <= 0"
                               class="text-center text-neutral text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
                                {{ $t('Realiza un pronóstico para desbloquear el sticker') }}</p>
                            <img v-if="sticker.percent > 0" :src="appComponent.config.logo"
                                 class="w-full h-full object-contain p-4 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
                            <img src="https://images.virtualsoft.tech/m/msjT1686275435.png"
                                 class=" w-full h-full object-cover z-10 relative">
                            <span
                                :class="[sticker.percent > 0 && sticker.percent <= 25 ? 'top-[72px]': sticker.percent >= 26 && sticker.percent <= 50 ? 'top-[53px]': sticker.percent >= 51 && sticker.percent <= 75 ? 'top-[32px]': sticker.percent >= 76 && sticker.percent <= 99 ? 'top-[12px]': sticker.percent == 100 ? 'top-[-17px]' : false]"
                                class="sticker-animation w-[197px] h-[119px] bg-[url(https://images.virtualsoft.tech/m/msjT1686330719.png)] bg-cover bg-no-repeat absolute left-[-97px]"></span>
                        </div>
                    </article>
                </div>
                <div
                    class="w-3/5 h-auto flex flex-col justify-center items-center font-bold text-black capitalize my-14 gap-y-3">
                    <p class="text-neutral text-xs italic font-light text-center">
                        {{ $t('* Completa todos los stickers para obtener 1 cupón') }}</p>
                    <!-- Button to view coupons -->
                    <button @click="showCoupons = true, showStickers = false"
                            class="bg-[url('https://images.virtualsoft.tech/m/msjT1686259683.png')] bg-cover bg-no-repeat relative px-6 py-3 md:px-12 md:py-5 rounded-full capitalize text-neutral hover:scale-105">
                        {{ $t('Mis Cupones') }} <span
                        class="bg-white text-black p-1 ml-3 font-light rounded-md border-2 border-solid border-base500">{{ totalCoupons }}</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Coupons view for the selected tournament -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == true && torneos.length > 0"
             class="w-full h-full flex justify-center items-center overflow-hidden relative">
            <button @click="showCoupons = false"
                    class="arrow-back rounded-full px-3 py-3 text-neutral text-xs font-bold hover:bg-success2 hover:scale-105 absolute top-[45px] left-[12px]">
                <ArrowBack :width="20" :height="20" :fill="'white'"></ArrowBack>
            </button>
            <div class="container-stickers w-full h-full flex flex-col justify-start items-center">
                <div class="flex flex-col justify-start items-center pt-24 gap-y-8 w-[93%] md:w-[52%] h-auto">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-5">
                        <p class="text-neutral text-4xl uppercase font-extrabold">{{ $t('CUPONES:') }}</p>
                    </div>
                    <div clas="flex justify-center items-center flex-col">
                        <p class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Cupones obtenidos por completar todos los stickers. Entre más cupones tengas, más posibilidades tendrás para ganar los premios') }}</p>
                    </div>
                </div>
                <div
                    class="body-stickers flex flex-wrap flex-col md:flex-row justify-center items-center max-h-[476px] overflow-auto w-3/5 h-auto my-8 gap-5">
                    <!-- Loop through coupons -->
                    <article v-if="coupons.length > 0" v-for="coupon in coupons" :key="coupon.code"
                             class="w-[210px] h-[100px] overflow-hidden relative flex justify-center items-center pointer-events-none">
                        <p class="absolute top-[39px] left-[4px] text-black font-bold text-[1rem] rotate-90 text-center">
                            {{ $t('CUPÓN') }}</p>
                        <p class="text-center text-black text-md font-bold absolute top-[27px] left-[79px] ">
                            {{ $t('CUPÓN NÚMERO') }}</p>
                        <p class="text-center text-black text-md font-light absolute top-[47px] left-[79px] ">
                            {{ coupon.code }}</p>
                        <img src="https://images.virtualsoft.tech/m/msjT1686333473.png"
                             class="w-full h-full object-contain">
                    </article>
                    <article v-if="coupons.length == 0" class="h-96 w-full flex justify-center items-center">
                        <h3 class="text-none-coupon text-2xl text-neutral text-center font-bold">
                            {{ $t('NO TIENES CUPONES ACTUALMENTE') }}</h3>
                    </article>
                    <!-- "Show More" button: displayed only if loadMoreCouponButton is true -->
                    <div v-if="loadMoreCouponButton" class="w-full flex justify-center items-center pt-2 pb-10">
                        <button @click="loadMoreCoupons(torneos[counterCard].id)"
                                class="w-36 sm:w-44 h-9 sm:h-12 border-0 sm:border-1 border-neutral rounded-full font-poppinsm text-lg sm:text-xl hover:bg-primary hover:text-neutral-content
                              hover:border-0 bg-primary sm:bg-transparent text-neutral-content sm:text-neutral">
                            {{$t('Mostrar más')}}
                        </button>
                    </div>
                    <!-- Final message: displayed only if at least one batch has been loaded (offset > 0) and there are no more coupons to load (loadMoreCouponButton is false) -->
                    <div v-else-if="offset > 0 && !loadMoreCouponButton" class="w-full flex justify-center items-center pb-10 pt-2">
                        <p class="text-neutral text-lg text-center">
                            {{$t('Has llegado al final de tus cupones.')}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal for displaying details of the selected tournament -->
        <div v-if="torneos[counterCard] != undefined && torneos[counterCard].id  != undefined"
             :class="'popuproad-'+torneos[counterCard].id +' modal text-neutral-content items-center bg-neutral-content bg-opacity-75'"
             v-show="torneos[counterCard].open">
            <div class="modal-box rounded-2xl bg-black relative border-4 border-solid border-white"
                 v-if="torneos[counterCard].open"
                 :style="{'background-image' : `url(${torneos[counterCard].raffleBackground})`}"
                 style="max-width: 100%; height:100%; max-height: 100%; background-size: cover;">
                <div class="cursor-pointer" @click="modalClose(torneos[counterCard])">
                    <button aria-label="Cerrar"
                            class="border-1 border-solid border-white rounded-full btn btn-circle btn-md bg-red-700 text-neutral font-bold absolute right-[9px] text-center top-[8px]">
                        X
                    </button>
                </div>
                <div class="w-full h-full md:px-8">
                    <div class="body-coupon grid grid-cols-1 md:grid-cols-3 w-full h-full">
                        <div class="w-full h-full flex justify-center" style="max-height: 379px !important;">
                            <!-- Winner image for the tournament -->
                            <img
                                v-if="appComponent.config.raffles != undefined && appComponent.config.raffles.imgWinner != undefined && appComponent.config.raffles.imgWinner != ''"
                                class="w-9/12 h-full object-contain" :src="appComponent.config.raffles.imgWinner"
                                alt="qatar" width="100" height="100">
                        </div>
                        <div class="w-full h-full flex items-center justify-center flex-col body-passport my-5 bg-base-300/60 rounded-2xl backdrop-blur-md"
                             style="max-height: 500px !important;">
                            <div class="users mb-3">
                                <p class="capitalize text-center text-xl md:text-2xl text-neutral italic w-full">
                                    {{ $t('cantidad de usuarios participando') }} </p>
                                <p v-if="!flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="-webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ torneos[counterCard].totalPlayers }}</p>
                                <p v-if="flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ openUP }}</p>
                            </div>
                            <div class="coupons">
                                <p class="capitalize text-center text-xl md:text-2xl text-neutral italic">
                                    {{ $t('cantidad de cupones participando') }} </p>
                                <p v-if="!flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ torneos[counterCard].totalCoupons }}</p>
                                <p v-if="flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ openCP }}</p>
                            </div>
                            <div class="title-countdown items-center justify-center text-neutral text-xl mt-5"
                                 style="top: 169px;">
                                <p class="text-center m-0">Sorteo empieza en:</p>
                            </div>
                            <div class="flex items-center justify-center"
                                 style="height: 53px; width: 101px; top: 211px;">
                                <p class="text-3xl text-neutral font-black countdown">
                                    <!-- Countdown timer for the tournament -->
                                    <vue-countdown v-if="!flagOpenModal2" :time="torneos[counterCard].datePrice"
                                                   :interval="100" v-slot="{ minutes, seconds }">
                                        {{ minutes }} : {{ seconds }}
                                    </vue-countdown>
                                    <vue-countdown v-if="flagOpenModal2" :time="datePrice" :interval="100"
                                                   v-slot="{ minutes, seconds }" @end="getPrize2();">
                                        {{ minutes }} : {{ seconds }}
                                    </vue-countdown>
                                </p>
                            </div>
                        </div>
                        <div class="award-animation w-full h-full flex justify-center relative">
                            <img class="w-3/5 h-full object-contain"
                                 src="https://images.virtualsoft.tech/site/image-lotery.png" alt="" width="100"
                                 height="100">
                            <div
                                v-if="torneos[counterCard].idPrize != undefined && torneos[counterCard].idPrize.length>0 && !openM"
                                class="w-full h-full flex justify-center absolute"
                                style="max-height: 379px !important;">
                                <div class="absolute flex items-center justify-center md:mt-20"
                                     style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                    <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                        {{ $t('CUPÓN') }}</p>
                                    <p class="absolute text-black z-10 top-[63px] left-[111px] text-3xl font-black">
                                        {{ $t('GANADOR') }}</p>
                                    <p class="absolute text-black z-10 top-[93px] left-[111px] text-xs font-light">
                                        {{ torneos[counterCard].user_id }}</p>
                                    <p class="absolute text-black z-10 top-[113px] left-[111px] text-md font-black text-center">
                                        {{ $t('CUPÓN: ') }} <br />{{ torneos[counterCard].idPrize }}</p>
                                    <img class="w-full absolute text-coupons"
                                         src="https://images.virtualsoft.tech/m/msjT1686333473.png" alt="background"
                                         width="525" height="634" style="z-index: 2;">
                                </div>
                            </div>
                            <div v-if="openM" class="w-full h-full flex justify-center absolute"
                                 style="max-height: 379px !important;">
                                <div class="absolute flex items-center justify-center md:mt-20"
                                     style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                    <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                        {{ $t('CUPÓN') }}</p>
                                    <p class="absolute text-black z-10 top-[63px] left-[111px] text-3xl font-black">
                                        {{ $t('GANADOR') }}</p>
                                    <p class="absolute text-black z-10 top-[93px] left-[111px] text-xs font-light">
                                        {{ openUG }}</p>
                                    <p class="absolute text-black z-10 top-[113px] left-[111px] text-md font-black text-center">
                                        {{ $t('CUPÓN: ') }} <br />{{ openMC }}</p>
                                    <img class="w-full absolute text-coupons"
                                         src="https://images.virtualsoft.tech/m/msjT1686333473.png" alt="background"
                                         width="525" height="634" style="z-index: 2;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Message displayed when there are no tournaments available -->
        <div v-if="torneos.length <= 0" class="w-full h-full flex justify-center items-center py-52 md:py-72">
            <button class="bg-white text-black rounded-full px-4 py-2">
                {{ $t('No hay sorteos disponibles actualmente') }}
            </button>
        </div>
    </div>
    <!-- End Raffles v3 -->

    <!-- Raffles v4 -->
    <div v-if="appComponent.config.raffles[appComponent.country] == 4"
         class="w-full h-auto flex justify-center items-start">
        <div class="max-w-[1200px] w-full h-auto min-h-screen flex flex-wrap gap-y-11 my-8 flex-col">
            <!-- Message displayed when there are no tournaments available -->
            <div v-if="torneos.length == 0" class="w-full flex h-screen justify-center items-center">
                <p class="bg-primary-content  text-black p-4 rounded-full shadow-[0_7px_2px_#ffffff54_,_inset_0_0_7px_0_black]">
                    {{ $t('Actualmente no hay sorteos para mostrar') }}</p>
            </div>
            <!-- List of raffles, iterating over the 'torneos' array -->
            <div class="raffles__list flex flex-col" v-for="(item,index) in torneos">
                <article
                    class="w-full h-full md:h-[150px] max-w-[444px] md:max-w-full flex flex-row flex-nowrap justify-center items-center">
                    <div
                        class="w-11/12 md:w-[165px] h-[196px] z-1 md:h-[90%] mr-[-12px] md:mr-0 bg-primary-content rounded-2xl md:rounded-2xl p-2 shadow-md">
                        <!-- Image representing the tournament -->
                        <img :src="item.characterBg" alt="representative image" width="200" height="200"
                             class="object-contain w-full h-full drop-shadow-lg">
                    </div>
                    <div
                        class="w-11/12 md:w-[calc(100%_-_165px)] z-0 h-full pl-[13px] md:pl-0 min-h-[196px] md:min-h-[70%] md:h-[70%] bg-gradient-to-b from-gray-200 via-white to-gray-200 rounded-r-3xl md:rounded-l-none flex flex-col md:grid md:grid-cols-2 justify-center items-center">
                        <!-- Tournament name -->
                        <h2 class="text-black font-black text-sm lg:text-4xl ml-0 md:ml-5 my-1 lg:my-4 md:my-0 text-center md:text-start px-1 max-h-[42px] md:max-h-[78px] md:min-h-[78px] overflow-y-auto leading-4 flex justify-center items-center">
                            {{ item.name }}</h2>
                        <div
                            class="flex flex-col md:flex-row justify-center md:justify-around items-center my-1 md:my-4 mb-2">
                            <div class="flex justify-center flex-col items-center gap-y-2">
                                <!-- Button to show the road to prizes -->
                                <button
                                    @click="showRoad = true, selectStickers = '', showStickers = false, showCoupons = false, counterCard = index, roadWithPrizes(torneos[counterCard].id)"
                                    class="text-sm lg:text-xl bg-gradient-to-b from-[#F7D050ff] to-[#f39b49] font-bold px-8 py-1 md:py-2 rounded-xl relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                    {{ $t('Camino') }}<span
                                    class="border-solid border-b-3 border-[#ffffff73] rounded-full -rotate-45 right-[4px] bottom-[2px] w-6 h-6 absolute"></span>
                                </button>
                                <!-- Button to join the tournament if the user is logged in and not already joined -->
                                <button @click="clickJoinUser(torneos[counterCard])"
                                        v-if="appComponent.session.logueado && !torneos[counterCard].userjoin"
                                        class="text-sm lg:text-xl bg-gradient-to-b from-success to-success2 text-neutral font-bold px-8 py-1 md:py-2 rounded-xl relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                    {{ $t('SUSCRÍBETE') }}
                                </button>
                                <!-- Disabled button indicating participation if the user is already joined -->
                                <button v-if="appComponent.session.logueado && torneos[counterCard].userjoin" disabled
                                        class="text-sm lg:text-xl bg-gradient-to-b from-[#F7D050ff] to-[#f39b49] font-bold px-8 py-1 md:py-2 rounded-xl text-black relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                    {{ $t('Participando') }}
                                </button>
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <p class="text-base lg:text-lg">{{ $t('Sorteo final en:') }}</p>
                                <!-- Countdown timer for the tournament -->
                                <vue-countdown v-if="item.state=='A'" class="flex justify-center items-center gap-x-2"
                                               :time="item.endDate2" :interval="100"
                                               v-slot="{ days, hours, minutes, seconds }">
                                    <p class="flex flex-col justify-center items-center font-bold text-md lg:text-3xl">
                                        {{ days }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('días') }}</span></p>
                                    <p class="flex flex-col justify-center items-center font-bold text-md lg:text-3xl">
                                        {{ hours }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('horas') }}</span></p>
                                    <p class="flex flex-col justify-center items-center font-bold text-md lg:text-3xl">
                                        {{ minutes }} :<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('min') }}</span></p>
                                    <p class="flex flex-col justify-center items-center font-bold text-md lg:text-3xl">
                                        {{ seconds }}<span
                                        class="text-[8px] font-extralight -mt-3">{{ $t('seg') }}</span></p>
                                </vue-countdown>
                            </div>
                            <!-- Button to view stickers -->
                            <button
                                @click="showStickers = true, showRoad = false, counterCard = index, getStickers(torneos[counterCard].id), getCoupons(torneos[counterCard].id)"
                                class="text-sm lg:text-2xl bg-gradient-to-b from-[#F7D050ff] to-[#f39b49] font-bold px-8 py-1 md:py-2 rounded-xl uppercase relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                {{ $t('Ver') }}<span
                                class="border-solid border-b-3 border-[#ffffff73] rounded-full -rotate-45 right-[4px] bottom-[2px] w-6 h-6 absolute"></span>
                            </button>
                        </div>
                    </div>
                </article>
                <!-- Conditional display for stickers selection -->
                <div
                    v-if="showRoad == false && showStickers == true && showCoupons == false && torneos.length > 0 && item.id == torneos[counterCard].id && selectStickers == ''"
                    class="w-full relative bg-gradient-to-r text-center from-[#ffd650] to-[#faaf4c] rounded-3xl h-auto p-2 md:p-5 mt-3">
                    <!-- Close button for stickers selection -->
                    <button @click="showStickers = false, selectStickers = ''"
                            class="scale-100 hover:scale-125 ease-in-out transition-all close__button absolute right-[-1px] xl:right-[-14px] top-[-9px] w-[70px] h-[70px] rounded-full bg-gradient-to-b from-[#EE8C89ff] to-[#C83B33ff] border-solid border-[#C83B33ff] border-2 text-neutral ">
                        <animatedCloseIcon class="drop-shadow-[0_3px_0_#00000057] m-auto" :width="38" :height="38"
                                           :fill="'#ffffff'"></animatedCloseIcon>
                        <span
                            class="w-[30px] h-[29px] absolute right-[12px] bottom-[4px] border-solid border-b-[4px] border-[#ffffff3d] rounded-full rotate-[331deg]"></span>
                    </button>
                    <div
                        class="w-full h-full rounded-3xl bg-gradient-to-r from-[#F7CF46ff] to-[#FAE44Cff] shadow-[inset_0_0_20px_14px_#00000061] p-5 overflow-hidden ">
                        <div class="info__raffles">
                            <p class="text-center font-bold text-6xl mt-24 mb-8">{{ $t('Stickers') }}</p>
                            <p class="text-center mb-24 lg:w-3/4 mx-auto ">
                                {{ $t('Pronostica 25USD o más en deportivas o casino y participa por uno de los viajes dobles a los estadios de futbol: La Bombonera (Arg) -El Maracaná (Bra) - El Azteca (Mex)')
                                }}</p>
                            <div
                                class="group__buttons flex gap-y-10 gap-x-28 md:flex-row flex-col justify-center items-center mb-24 ml-[44px] md:ml-0">
                                <!-- Button to select sports stickers -->
                                <button v-if="stickers.sportbook != undefined && stickers.sportbook.length > 0"
                                        @click="showRoad = false, selectStickers = 'sportbook'"
                                        class="text-neutral text-xl min-w-[180px] lg:min-w-[240px] lg:text-3xl bg-[#C49D34ff] font-bold px-5 py-8 rounded-xl relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                    <img src="https://images.virtualsoft.tech/m/msjT1689353881.png"
                                         class="absolute left-[-82px] top-[-16px] w-[130px] h-[130px] object-contain">
                                    {{ $t('Deportivos') }}
                                    <span
                                        class="border-solid border-b-3 border-[#ffffff73] rounded-full -rotate-45 right-[4px] bottom-[2px] w-6 h-6 absolute"></span>
                                </button>
                                <!-- Button to select casino stickers -->
                                <button v-if="stickers.casino != undefined && stickers.casino.length > 0"
                                        @click="showRoad = false, selectStickers = 'casino'"
                                        class="text-neutral text-xl min-w-[180px] lg:min-w-[240px] lg:text-3xl bg-[#C49D34ff] font-bold px-5 py-8 rounded-xl relative button-raffle scale-100 hover:scale-105 transition-all ease-in-out">
                                    <img src="https://images.virtualsoft.tech/m/msjT1689353849.png"
                                         class="absolute left-[-82px] top-[-16px] w-[130px] h-[130px] object-contain">
                                    {{ $t('Casino') }} <span
                                    class="border-solid border-b-3 border-[#ffffff73] rounded-full -rotate-45 right-[4px] bottom-[2px] w-6 h-6 absolute"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Conditional display for selected stickers -->
                <div v-if="selectStickers == 'casino' || selectStickers == 'sportbook'"
                     class="w-full relative bg-gradient-to-r text-center from-[#ffd650] to-[#faaf4c] rounded-3xl h-auto p-2 md:p-5 mt-3">
                    <!-- Close button for selected stickers -->
                    <button @click="selectStickers = '', showRoad = false, showStickers = false"
                            class="scale-100 hover:scale-125 ease-in-out transition-all close__button absolute right-[-1px] xl:right-[-14px] top-[-9px] w-[70px] h-[70px] rounded-full bg-gradient-to-b from-[#EE8C89ff] to-[#C83B33ff] border-solid border-[#C83B33ff] border-2 text-neutral ">
                        <animatedCloseIcon class="drop-shadow-[0_3px_0_#00000057] m-auto" :width="38" :height="38"
                                           :fill="'#ffffff'"></animatedCloseIcon>
                        <span
                            class="w-[30px] h-[29px] absolute right-[12px] bottom-[4px] border-solid border-b-[4px] border-[#ffffff3d] rounded-full rotate-[331deg]"></span>
                    </button>
                    <!-- Back button to return to sticker selection -->
                    <button @click="selectStickers = '', showRoad = false, showStickers = true"
                            class="scale-100 hover:scale-125 ease-in-out transition-all close__button absolute left-[-1px] xl:left-[-14px] top-[-9px] w-[70px] h-[70px] rounded-full bg-gradient-to-b from-[#81C1F3ff] to-[#548FE5ff] border-solid border-[#548FE5ff] border-2 text-neutral ">
                        <ArrowBack :width="38" :height="38" :fill="'white'"
                                   class="drop-shadow-[0_3px_0_#00000057] m-auto"></ArrowBack>
                        <span
                            class="w-[30px] h-[29px] absolute right-[12px] bottom-[4px] border-solid border-b-[4px] border-[#ffffff3d] rounded-full rotate-[331deg]"></span>
                    </button>
                    <div
                        class="w-full h-full rounded-3xl bg-gradient-to-r from-[#F7CF46ff] to-[#FAE44Cff] shadow-[inset_0_0_20px_14px_#00000061] p-5 overflow-hidden ">
                        <div class="info__stickers flex justify-center items-center flex-col">
                            <!-- Title for selected stickers -->
                            <p v-if="selectStickers == 'casino'"
                               class="text-center font-bold text-3xl md:text-6xl mt-24 mb-8">
                                {{ $t('STICKERS CASINO') }}</p>
                            <p v-else class="text-center font-bold text-3xl md:text-6xl mt-24 mb-8">
                                {{ $t('STICKERS DEPORTIVOS') }}</p>
                            <p v-if="selectStickers == 'casino'" class="text-center lg:w-3/4 mx-auto font-">
                                {{ $t('Gánate un sticker acumulando un total de $25.') }}</p>
                            <p v-else class="text-center lg:w-3/4 mx-auto font-">
                                {{ $t('Gánate un sticker acumulando un total de $25.') }}</p>
                            <p v-if="selectStickers == 'casino'" class="text-center mb-5 lg:w-3/4 mx-auto ">
                                {{ $t('Cada pronóstico casino individual debe ser mayor o igual a $25') }}</p>
                            <p v-else class="text-center mb-5 lg:w-3/4 mx-auto ">
                                {{ $t('Cada pronóstico individual debe ser mayor o igual a $25') }}</p>
                            <div
                                class="w-full md:w-5/6 h-auto  flex flex-wrap justify-center md:justify-start items-center md:items-start flex-row gap-[8px]">
                                <!-- Displaying stickers based on selection -->
                                <article v-for="sticker in stickers[selectStickers]"
                                         class="w-[180px] h-[180px] flex justify-center items-center relative">
                                    <p v-if="sticker.percent <= 0"
                                       class="w-3/4 p-2 h-auto absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 text-neutral text-md leading-5">
                                        {{ $t('Realiza un pronóstico para desbloquear el sticker') }}</p>
                                    <img v-else :src="config.logo"
                                         class="w-[100px] h-[100px] object-contain absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                                         alt="">
                                    <img v-if="sticker.percent >= 0 && sticker.percent <= 25"
                                         src="https://images.virtualsoft.tech/m/msjT1689352480.png"
                                         class="w-full h-full object-contain" alt="">
                                    <img v-if="sticker.percent >= 26 && sticker.percent <= 50"
                                         src="https://images.virtualsoft.tech/m/msjT1689350090.png"
                                         class="w-full h-full object-contain" alt="">
                                    <img v-if="sticker.percent >= 51 && sticker.percent <= 75"
                                         src="https://images.virtualsoft.tech/m/msjT1689350061.png"
                                         class="w-full h-full object-contain" alt="">
                                    <img v-if="sticker.percent >= 76 && sticker.percent <= 99"
                                         src="https://images.virtualsoft.tech/m/msjT1689350032.png"
                                         class="w-full h-full object-contain" alt="">
                                    <img v-if="sticker.percent >= 100"
                                         src="https://images.virtualsoft.tech/m/msjT1689352424.png"
                                         class="w-full h-full object-contain" alt="">
                                </article>
                            </div>
                            <div
                                class="w-3/5 h-auto flex flex-col justify-center items-center font-bold text-black capitalize my-14 gap-y-3">
                                <p class="text-black text-xs italic font-light text-center">
                                    {{ $t('* Completa todos los stickers para obtener 1 cupón') }}</p>
                                <!-- Button to view coupons -->
                                <button
                                    @click="showRoad = false, showStickers = false, selectStickers = '', showCoupons = true"
                                    class="bg-[url('https://images.virtualsoft.tech/m/msjT1689611823.png')] bg-cover bg-no-repeat relative px-6 py-3 md:px-12 md:py-5 rounded-full capitalize text-neutral hover:scale-105">
                                    {{ $t('Mis Cupones') }} <span
                                    class="bg-white text-black p-1 ml-3 font-light rounded-md border-2 border-solid border-base500">{{ totalCoupons
                                    }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Conditional display for the road to prizes -->
                <div
                    v-if="showRoad == true && showStickers == false && showCoupons == false && torneos.length > 0 && item.id == torneos[counterCard].id"
                    class="w-full relative bg-gradient-to-b text-center from-[#793B88ff] to-[#3B0F5Aff] rounded-3xl h-auto p-2 md:p-5 mt-3">
                    <!-- Close button for the road to prizes -->
                    <button @click="showRoad = false"
                            class="scale-100 hover:scale-125 ease-in-out transition-all close__button absolute right-[-1px] xl:right-[-14px] top-[-9px] w-[70px] h-[70px] rounded-full bg-gradient-to-b from-[#EE8C89ff] to-[#C83B33ff] border-solid border-[#C83B33ff] border-2 text-neutral ">
                        <animatedCloseIcon class="drop-shadow-[0_3px_0_#00000057] m-auto" :width="38" :height="38"
                                           :fill="'#ffffff'"></animatedCloseIcon>
                        <span
                            class="w-[30px] h-[29px] absolute right-[12px] bottom-[4px] border-solid border-b-[4px] border-[#ffffff3d] rounded-full rotate-[331deg]"></span>
                    </button>
                    <div
                        class="w-full h-full rounded-3xl bg-[url('https://images.virtualsoft.tech/m/msjT1689353421.png')] bg-cover shadow-[inset_0_0_20px_14px_#00000061] p-5 overflow-auto">
                        <div class="info__map flex justify-center items-center flex-col">
                            <section class="w-full h-auto md:h-[434px] my-36 relative">
                                <div :class="'roadv4-'+torneos[counterCard].withPrizes.length" class="relative">
                                    <!-- Iterating over the prizes for the selected tournament -->
                                    <div v-for="(item, i) in torneos[counterCard].withPrizes"
                                         class="absolute left-0 right-0 top-0">
                                        <div class="w-12 h-12 text-neutral text-xs relative cursor-pointer ">
                                            <!-- Prize item that opens details on click -->
                                            <div @click="prizeOpen(torneos[counterCard]), item.open=true"
                                                 class="z-10 relative hover:scale-125 transition-all duration-700 ease-in-out flex justify-center items-center"
                                                 :class="item.current && i+1 != torneos[counterCard].withPrizes.length ? 'active-award' : ''">
                                                <p :class="item.current ? 'bg-[radial-gradient(#ffd100,#ff8c02)]' : 'bg-[radial-gradient(#dbdbdb,#6e6e6e)]'"
                                                   class="absolute w-[35px] h-[35px] md:w-[50px] md:h-[50px] text-orange-900 text-3xl top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 rounded-full font-bold flex justify-center items-center">
                                                    {{ i + 1 }}</p>
                                            </div>
                                            <!-- Prize details modal -->
                                            <div v-if="item.open"
                                                 :class="i<torneos[counterCard].withPrizes.length/2 ? 'left-[-41px] md:left-0': 'right-[-141px] md:right-0'"
                                                 class="scale-75 md:scale-100 w-[250px] h-[350px] z-30 absolute top-[-46px] md:top-0 bg-[length:250px_350px] bg-no-repeat bg-gradient-to-b from-[#F7CC4Fff] to-[#F4B54Aff] border-solid border-4 border-yellow-200 shadow-[inset_0_0_8px_#0000004d_,_0_0_0_5px_#ffffff54] rounded-3xl">
                                                <div class="w-full h-[37px] relative">
                                                    <div class="w-[230px] h-[100px] absolute top-[-65px] left-[9px]">
                                                        <img src="https://images.virtualsoft.tech/m/msjT1689353694.png"
                                                             class="img-animation object-contain w-full h-full">
                                                    </div>
                                                    <!-- Close button for prize details -->
                                                    <button @click="item.open = false"
                                                            class="border-1 border-solid border-white rounded-full btn btn-circle btn-sm bg-red-700 text-neutral font-bold absolute bottom-0 right-[-12px] text-center">
                                                        X
                                                    </button>
                                                </div>
                                                <div
                                                    class="w-[250px] h-[313px] flex flex-col justify-start items-center overflow-y-auto gap-y-4 container-award-detail">
                                                    <!-- Displaying prize details -->
                                                    <article v-for="prize in item.prizes"
                                                             class="w-[250px] h-[313px] flex flex-col justify-start items-center shrink-0 grow-0">
                                                        <p class="capitalize text-black font-bold text-xl">
                                                            {{ $t('Ganador') }}</p>
                                                        <p v-if="prize.userWin.user_id"
                                                           class="uppercase text-black text-xs -mt-1">
                                                            {{ prize.userWin.user_id }}</p>
                                                        <p v-else class="uppercase text-black text-xs -mt-1">
                                                            {{ $t('PENDIENTE') }}</p>
                                                        <div class="relative w-3/5 h-14">
                                                            <p class="absolute top-[17px] left-[24px] text-black font-bold text-[0.5rem] rotate-90 text-center">
                                                                {{ $t('CUPÓN') }}</p>
                                                            <p class="absolute top-[11px] left-[60px] text-neutral font-bold text-[0.7rem] text-center">
                                                                {{ $t('GANADOR') }}</p>
                                                            <p v-if="prize.userWin.coupon_id != undefined"
                                                               class="absolute top-[24px] left-[60px] text-neutral text-[0.7rem] text-center">
                                                                {{ prize.userWin.coupon_id }}</p>
                                                            <p v-else
                                                               class="absolute top-[24px] left-[60px] text-neutral text-[0.7rem] text-center">
                                                                {{ $t('PENDIENTE') }}</p>
                                                            <img
                                                                src="https://images.virtualsoft.tech/m/msjT1689353388.png"
                                                                class="w-full h-full object-contain">
                                                        </div>
                                                        <div class="relative w-3/5 h-28 my-[18px]">
                                                            <img v-if="prize.image != undefined && prize.image != ''"
                                                                 :src="prize.image" class="w-full h-full object-contain"
                                                                 alt="premio">
                                                            <p v-else
                                                               class="text-black font-extrabold text-center m-0 mt-3 w-full uppercase text-lg">
                                                                {{ prize.value }} <br /><span
                                                                class="text-black font-light">{{ prize.description
                                                                }}</span></p>
                                                        </div>
                                                        <p class="uppercase text-black font-bold text-sm mt-2">
                                                            {{ $t('FECHA SORTEO') }}</p>
                                                        <p class="uppercase text-black text-sm">
                                                            {{ formatDate2(prize.date, 'DD-MM-YYYY h:mm:ss a') }}</p>
                                                        <!-- Button to view the draw for the prize -->
                                                        <button :class="prize.state == 'R' ? 'enabled' : 'disabled'"
                                                                @click="openModal2(torneos[counterCard], prize)"
                                                                class="bg-[#299ABDff] rounded-xl px-2 py-2 text-neutral text-sm button-submit mt-1 uppercase font-bold hover:bg-success2 hover:scale-105">
                                                            {{ $t('Ver sorteo') }}
                                                        </button>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Background images for mobile and desktop -->
                                <img v-if="flagMobile" src="https://images.virtualsoft.tech/m/msjT1689353915.png"
                                     class="w-full h-full object-cover">
                                <img v-else src="https://images.virtualsoft.tech/m/msjT1689353504.png"
                                     class="w-full h-full object-cover">
                            </section>
                        </div>
                    </div>
                </div>
                <!-- Conditional display for coupons -->
                <div
                    v-if="showRoad == false && showStickers == false && showCoupons == true && torneos.length > 0 && item.id == torneos[counterCard].id && selectStickers == ''"
                    class="w-full relative bg-gradient-to-r text-center from-[#ffd650] to-[#faaf4c] rounded-3xl h-auto p-2 md:p-5 mt-3">
                    <!-- Close button for coupons -->
                    <button @click="showStickers = false, selectStickers == '', showCoupons = false"
                            class="scale-100 hover:scale-125 ease-in-out transition-all close__button absolute right-[-1px] xl:right-[-14px] top-[-9px] w-[70px] h-[70px] rounded-full bg-gradient-to-b from-[#EE8C89ff] to-[#C83B33ff] border-solid border-[#C83B33ff] border-2 text-neutral ">
                        <animatedCloseIcon class="drop-shadow-[0_3px_0_#00000057] m-auto" :width="38" :height="38"
                                           :fill="'#ffffff'"></animatedCloseIcon>
                        <span
                            class="w-[30px] h-[29px] absolute right-[12px] bottom-[4px] border-solid border-b-[4px] border-[#ffffff3d] rounded-full rotate-[331deg]"></span>
                    </button>
                    <div
                        class="w-full h-full rounded-3xl bg-gradient-to-r from-[#F7CF46ff] to-[#FAE44Cff] shadow-[inset_0_0_20px_14px_#00000061] p-5 overflow-hidden ">
                        <div class="info__raffles">
                            <p class="text-center font-bold text-6xl mt-24 mb-8">{{ $t('Cupones') }}</p>
                            <p class="text-center lg:w-3/4 mx-auto font-">
                                {{ $t('Cupones obtenidos por completar todos los stickers. Entre más cupones tengas, más posibilidades tendrás para ganar los premios')
                                }}</p>
                            <div
                                class="body-stickers flex flex-wrap flex-col md:flex-row justify-center items-center w-full h-auto my-8 gap-5">
                                <!-- Displaying coupons -->
                                <article v-if="coupons.length > 0" v-for="coupon in coupons" :key="coupon.code"
                                         class="w-[210px] h-[100px] overflow-hidden relative flex justify-center items-center pointer-events-none">
                                    <p class="absolute top-[39px] left-[4px] text-black font-bold text-[1rem] rotate-90 text-center">
                                        {{ $t('CUPÓN') }}</p>
                                    <p class="text-center text-neutral text-md font-bold absolute top-[27px] left-[79px] ">
                                        {{ $t('CUPÓN NÚMERO') }}</p>
                                    <p class="text-center text-neutral text-md font-light absolute top-[47px] left-[79px] ">
                                        {{ coupon.code }}</p>
                                    <img src="https://images.virtualsoft.tech/m/msjT1689353388.png"
                                         class="w-full h-full object-contain">
                                </article>
                                <!-- Message displayed when there are no coupons -->
                                <article v-if="coupons.length == 0"
                                         class="h-96 w-full flex justify-center items-center">
                                    <h3 class="text-none-coupon text-2xl text-neutral text-center font-bold">
                                        {{ $t('NO TIENES CUPONES ACTUALMENTE') }}</h3>
                                </article>
                                <!-- "Show More" button: displayed only if loadMoreCouponButton is true -->
                                <div v-if="loadMoreCouponButton" class="w-full flex justify-center items-center pt-2 pb-10">
                                    <button @click="loadMoreCoupons(torneos[counterCard].id)"
                                            class="w-36 sm:w-44 h-9 sm:h-12 border-0 sm:border-1 border-neutral rounded-full font-poppinsm text-lg sm:text-xl hover:bg-primary hover:text-neutral-content
                              hover:border-0 bg-primary sm:bg-transparent text-neutral-content sm:text-neutral">
                                        {{$t('Mostrar más')}}
                                    </button>
                                </div>
                                <!-- Final message: displayed only if at least one batch has been loaded (offset > 0) and there are no more coupons to load (loadMoreCouponButton is false) -->
                                <div v-else-if="offset > 0 && !loadMoreCouponButton" class="w-full flex justify-center items-center pb-10 pt-2">
                                    <p class="text-neutral text-lg text-center">
                                        {{$t('Has llegado al final de tus cupones.')}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal for prize details -->
                <div v-if="torneos[counterCard] != undefined && torneos[counterCard].id  != undefined"
                     :class="'popuproad-'+torneos[counterCard].id +' modal text-neutral-content items-center bg-neutral-content bg-opacity-75'"
                     v-show="torneos[counterCard].open">
                    <div class="modal-box rounded-2xl bg-black relative border-4 border-solid border-white"
                         v-if="torneos[counterCard].open"
                         :style="{'background-image' : `url(https://images.virtualsoft.tech/m/msjT1689353421.png)`}"
                         style="max-width: 100%; height:100%; max-height: 100%; background-size: cover;">
                        <div class="cursor-pointer" @click="modalClose(torneos[counterCard])">
                            <!-- Close button for the modal -->
                            <button aria-label="Cerrar"
                                    class="border-1 border-solid border-white rounded-full btn btn-circle btn-md bg-red-700 text-neutral font-bold absolute right-[9px] text-center top-[8px]">
                                X
                            </button>
                        </div>
                        <div class="w-full h-full md:px-8">
                            <div class="body-coupon grid grid-cols-1 md:grid-cols-3 w-full h-full">
                                <div class="w-full h-full flex justify-center" style="max-height: 379px !important;">
                                    <img
                                        v-if="appComponent.config.raffles != undefined && appComponent.config.raffles.imgWinner != undefined && appComponent.config.raffles.imgWinner != ''"
                                        class="w-9/12 h-full object-contain"
                                        :src="appComponent.config.raffles.imgWinner" alt="qatar" width="100"
                                        height="100">
                                </div>
                                <div class="w-full h-full flex items-center justify-center flex-col body-passport my-5 bg-base-300/60 rounded-2xl backdrop-blur-md"
                                     style="max-height: 500px !important;">
                                    <div class="users mb-3">
                                        <p class="capitalize text-center text-xl md:text-2xl text-neutral italic w-full">
                                            {{ $t('cantidad de usuarios participando') }} </p>
                                        <p v-if="!flagOpenModal2"
                                           class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                           style="-webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                            {{ torneos[counterCard].totalPlayers }}</p>
                                        <p v-if="flagOpenModal2"
                                           class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                           style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                            {{ openUP }}</p>
                                    </div>
                                    <div class="coupons">
                                        <p class="capitalize text-center text-xl md:text-2xl text-neutral italic">
                                            {{ $t('cantidad de cupones participando') }} </p>
                                        <p v-if="!flagOpenModal2"
                                           class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                           style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                            {{ torneos[counterCard].totalCoupons }}</p>
                                        <p v-if="flagOpenModal2"
                                           class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                           style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                            {{ openCP }}</p>
                                    </div>
                                    <div class="title-countdown items-center justify-center text-neutral text-xl mt-5"
                                         style="top: 169px;">
                                        <p class="text-center m-0">{{ $t('Sorteo empieza en:') }}</p>
                                    </div>
                                    <div class="flex items-center justify-center"
                                         style="height: 53px; width: 101px; top: 211px;">
                                        <p class="text-3xl text-neutral font-black countdown">
                                            <!-- Countdown timer for the prize draw -->
                                            <vue-countdown v-if="!flagOpenModal2" :time="torneos[counterCard].datePrice"
                                                           :interval="100" v-slot="{ minutes, seconds }">
                                                {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                            <vue-countdown v-if="flagOpenModal2" :time="datePrice" :interval="100"
                                                           v-slot="{ minutes, seconds }" @end="getPrize2();">
                                                {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                        </p>
                                    </div>
                                </div>
                                <div class="award-animation w-full h-full flex justify-center relative">
                                    <img class="w-3/5 h-full object-contain"
                                         src="https://images.virtualsoft.tech/site/image-lotery.png" alt="" width="100"
                                         height="100">
                                    <div
                                        v-if="torneos[counterCard].idPrize != undefined && torneos[counterCard].idPrize.length>0 && !openM"
                                        class="w-full h-full flex justify-center absolute"
                                        style="max-height: 379px !important;">
                                        <div
                                            class=" absolute flex items-center justify-center md:mt-20 coupon__animation"
                                            style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                            <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                                {{ $t('CUPÓN') }}</p>
                                            <p class="absolute text-neutral z-10 top-[63px] left-[111px] text-3xl font-black">
                                                {{ $t('GANADOR') }}</p>
                                            <p class="absolute text-neutral z-10 top-[93px] left-[111px] text-xs font-light">
                                                {{ torneos[counterCard].user_id }}</p>
                                            <p class="absolute text-neutral z-10 top-[113px] left-[111px] text-md font-black text-center">
                                                {{ $t('CUPÓN: ') }} <br />{{ torneos[counterCard].idPrize }}</p>
                                            <img class="w-full absolute text-coupons"
                                                 src="https://images.virtualsoft.tech/m/msjT1689353388.png"
                                                 alt="background" width="525" height="634" style="z-index: 2;">
                                        </div>
                                    </div>
                                    <div v-if="openM" class="w-full h-full flex justify-center absolute"
                                         style="max-height: 379px !important;">
                                        <div
                                            class="absolute flex items-center justify-center md:mt-20 coupon__animation"
                                            style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                            <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                                {{ $t('CUPÓN') }}</p>
                                            <p class="absolute text-neutral z-10 top-[63px] left-[111px] text-3xl font-black">
                                                {{ $t('GANADOR') }}</p>
                                            <p class="absolute text-neutral z-10 top-[93px] left-[111px] text-xs font-light">
                                                {{ openUG }}</p>
                                            <p class="absolute text-neutral z-10 top-[113px] left-[111px] text-md font-black text-center">
                                                {{ $t('CUPÓN: ') }} <br />{{ openMC }}</p>
                                            <img class="w-full absolute text-coupons"
                                                 src="https://images.virtualsoft.tech/m/msjT1689353388.png"
                                                 alt="background" width="525" height="634" style="z-index: 2;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Raffles v4 -->

    <!-- Raffles v5 -->
    <div v-if="appComponent.config.raffles[appComponent.country] == 5"
         class="relative w-full h-auto transition-all ease-in-out">
        <!-- Background image for the raffle, conditionally rendered based on the existence of tournaments -->
        <img v-if="torneos != undefined && torneos.length > 0 && !disableButton && torneos[counterCard] != undefined"
             :src="torneos[counterCard].raffleBackground != undefined && torneos[counterCard].raffleBackground != '' ? torneos[counterCard].raffleBackground : 'https://images.virtualsoft.tech/m/msjT1699984383.png' "
             :class="!disableButton  ? 'img-background': ''"
             alt="background raffles"
             class="w-full h-full object-cover object-top absolute top-0 left-0 pointer-events-none opacity-60">
        <!-- Gradient overlay at the bottom of the image -->
        <div class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content"></div>
        <!-- Filter options for raffle type and status, displayed conditionally -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == false"
             class="w-full h-auto pt-14 md:pt-20  relative flex flex-row justify-center items-center gap-x-7 md:gap-x-12">
            <div class="flex flex-col md:flex-row justify-center items-center gap-x-5 gap-y-3">
                <p class="text-neutral font-poppinsb">{{ $t('Tipo de sorteo:') }}</p>
                <span class="text-center text-neutral bg-[#AF7504]/70 py-1 px-3 rounded-full">
                    <input class="mr-2 checked:bg-none radio rounded-md w-4 h-4 bg-[#593D06]" type="radio"
                           id="raffles-all" name="raffles-type" v-model="typeFilter" @change="getTournaments()"
                           value="0">
                    <label for="raffles-all" class="font-light font-poppinssl">{{ $t('Todos los sorteos') }}</label>
                </span>
                <span class="text-center text-neutral bg-[#AF7504]/70 py-1 px-3 rounded-full">
                    <input class="mr-2 checked:bg-none radio rounded-md w-4 h-4 bg-[#593D06]" type="radio"
                           id="raffles-register" name="raffles-type" v-model="typeFilter" @change="getTournaments()"
                           value="1">
                    <label for="raffles-register"
                           class="font-light font-poppinssl">{{ $t('Sorteos registrados') }}</label>
                </span>
            </div>
            <div class="flex flex-col md:flex-row justify-center items-center gap-x-5 gap-y-3">
                <p class="text-neutral font-poppinsb capitalize">{{ $t('Estado:') }}</p>
                <span class="text-center text-neutral bg-[#AF7504]/70 py-1 px-3 rounded-full">
                    <input class="mr-2 checked:bg-none radio rounded-md w-4 h-4 bg-[#593D06]" type="radio"
                           id="raffles-active" name="raffles-status" v-model="stateFilter" @change="getTournaments()"
                           value="A">
                    <label for="raffles-active" class="font-poppinssl">{{ $t('Activo') }}</label>
                </span>
                <span class="text-center text-neutral bg-[#AF7504]/70 py-1 px-3 rounded-full">
                    <input class="mr-2 checked:bg-none radio rounded-md w-4 h-4 bg-[#593D06]" type="radio"
                           id="raffles-inactive" name="raffles-status" v-model="stateFilter" @change="getTournaments()"
                           value="I">
                    <label for="raffles-inactive" class="font-poppinssl">{{ $t('Desactivado') }}</label>
                </span>
            </div>
        </div>
        <!-- Container for displaying tournaments, conditionally rendered -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == false && torneos.length > 0"
             class="w-full h-[600px] flex justify-center items-center overflow-auto relative">
            <div class="w-[50px] h-full flex justify-center items-center px-2">
                <!-- Left arrow for navigating through tournaments -->
                <img :class="disableButton ==false ? 'opacity-100' : 'opacity-50'"
                     v-if="torneos.length > 1 && leftArrow"
                     @click="disableButton == false ? moveLeft() : false, counterCard == 0 ? leftArrow = false : leftArrow = true, counterCard == torneos.length-1 ? rightArrow = false : rightArrow = true"
                     :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].arrow != undefined ? appComponent.config.raffles.assets[appComponent.country].arrow : 'https://images.virtualsoft.tech/m/msjT1685643364.png'"
                     class="hover:scale-125 transition-all ease-in-out cursor-pointer">
            </div>
            <div
                class="w-auto h-full flex justify-start items-center max-w-[244px] md:max-w-[694px] xl:max-w-[1041px] container-cards-img transition-all ease-in-out overflow-auto">
                <!-- Loop through tournaments and display each one -->
                <article v-for="(item,index) in torneos"
                         class="w-[347px] h-full flex justify-start md:justify-center items-center shrink-0 pt-0 md:pt-[45px]">
                    <div
                        :class="counterCard == index ? 'md:scale-[1.1] transition-all ease-in-out duration-1000 opacity-100' : 'scale-100 opacity-90'"
                        class="w-[244px] h-[340px] rounded-xl flex justify-between items-center flex-col  relative pt-16 pb-5 img-cont">
                        <!-- Background image for the tournament card -->
                        <img
                            :src="item.bgContainer != undefined && item.bgContainer != ''  ? item.bgContainer : 'https://images.virtualsoft.tech/m/msj0212T1701980933.png'"
                            alt="" class="w-full h-full object-cover absolute top-0 left-0 pointer-events-none z-0">
                        <!-- Character image for the tournament, conditionally rendered -->
                        <img v-if="item != undefined && item.characterBg != ''" :src="item.characterBg" alt="img raffle"
                             width="200"
                             class="absolute -top-20 w-[102px] h-[102px] overflow-hidden object-contain pointer-events-none img-animation">
                        <p class="text-white z-10 text-xl font-poppinssb text-center max-w-[96%] leading-6">
                            {{ $t(item.name) }}</p>
                        <p class="text-white  text-[0.7rem] z-10 font-poppinssl max-w-[90%] leading-[12px]  min-h-[56.8px] max-h-[56.8px] overflow-auto">
                            {{ $t(item.description) }}</p>
                        <p class="text-white capitalize z-10 font-poppinssl text-base mb-1">
                            {{ $t(item.state == 'A' ? 'Sorteo finaliza en:' : 'Sorteo en estado:') }}</p>
                        <div class="h-auto bg-gradient-to-b from-white to-[#9e9e9e] pt-2 rounded-xl w-[70%] z-10">
                            <!-- Countdown timer for active tournaments -->
                            <vue-countdown v-if="item.state=='A'" class="flex justify-around items-center "
                                           :time="item.endDate2" :interval="100"
                                           v-slot="{ days, hours, minutes, seconds }">
                                <p class="flex flex-col justify-center items-center text-black font-poppinssb text-[1.5rem]">
                                    {{ days }}:<span class="text-[0.7rem] font-poppinssl">{{ $t('días') }}</span></p>
                                <p class="flex flex-col justify-center items-center text-black font-poppinssb text-[1.5rem]">
                                    {{ hours }}:<span class="text-[0.7rem] font-poppinssl">{{ $t('horas') }}</span></p>
                                <p class="flex flex-col justify-center items-center text-black font-poppinssb text-[1.5rem]">
                                    {{ minutes }}:<span class="text-[0.7rem] font-poppinssl">{{ $t('min') }}</span></p>
                                <p class="flex flex-col justify-center items-center text-black font-poppinssb text-[1.5rem]">
                                    {{ seconds }}<span class="text-[0.7rem] font-poppinssb">{{ $t('seg') }}</span></p>
                            </vue-countdown>
                            <p v-else class="text-center font-bold">Finalizado</p>
                        </div>
                        <div class="flex gap-x-12">
                            <!-- Button to view the raffle details -->
                            <button
                                @click="showRoad = true, showStickers = false,counterCard = index, roadWithPrizes(torneos[counterCard].id)"
                                class=" bg-gradient-to-l from-[#FFA800] to-[#FFD028] after:border-[#FFA800] rounded-lg  text-black text-xs px-3 z-10 button-submit-v2 relative font-poppinssb hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">
                                {{ $t('Ver sorteo') }}
                            </button>
                            <!-- Button to view stickers related to the raffle -->
                            <button
                                @click="showStickers = true, showRoad = false, counterCard = index, getStickers(torneos[counterCard].id), getCoupons(torneos[counterCard].id)"
                                class="bg-gradient-to-r from-[#B94FDE] to-[#7F0B89] after:border-[#B94FDE] rounded-lg z-10 px-5 py-2 text-neutral text-xs button-submit-v2 relative font-poppinssb hover:bg-success2 hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">
                                {{ $t('Stickers') }}
                            </button>
                        </div>
                        <div v-if="appComponent.session.logueado && item.userjoin != undefined"
                             class="flex justify-center items-center">
                            <!-- Button for users to join the raffle -->
                            <button @click="clickJoinUser(item)" v-if="!item.userjoin && item.state == 'A'"
                                    class="bg-success rounded-lg text-xs z-10 button-submit-v2  font-poppinssb hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038] text-neutral px-10 py-2 absolute -bottom-4 max-w-sm w-auto  after:border-success capitalize font-bold hover:after:border-[#299ABDff] hover:bg-[#299ABDff]">
                                {{ $t('SUSCRIBIRSE') }}
                            </button>
                            <!-- Disabled button indicating the user is already joined -->
                            <button v-if="item.userjoin && item.state == 'A'" disabled
                                    class="bg-[#1a5f32] rounded-lg text-xs z-10 button-submit-v2  font-poppinssb shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038] text-neutral px-10 py-2 absolute -bottom-4 max-w-sm w-auto  capitalize after:border-success font-bold">
                                {{ $t('SUSCRITO') }}
                            </button>
                        </div>
                    </div>
                </article>
            </div>
            <div class="w-[50px] h-full flex justify-center items-center px-2">
                <!-- Right arrow for navigating through tournaments -->
                <img :class="disableButton ==false ? 'opacity-100' : 'opacity-50'"
                     v-if="torneos.length > 1 && rightArrow"
                     @click="disableButton == false ? moveRight() : false, counterCard == 0 ? leftArrow = false : leftArrow = true, counterCard == torneos.length-1 ? rightArrow = false : rightArrow = true"
                     :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].arrow != undefined ? appComponent.config.raffles.assets[appComponent.country].arrow : 'https://images.virtualsoft.tech/m/msjT1685643364.png'"
                     class="rotate-180 hover:scale-125 transition-all ease-in-out cursor-pointer">
            </div>
        </div>
        <!-- Conditional rendering for the road view -->
        <div v-if="showRoad == true && showStickers == false && showCoupons == false && torneos.length > 0"
             class="w-full h-full flex justify-center items-start overflow-y-auto relative py-0 md:pt-40 md:h-[721px]">
            <div class="w-auto absolute top-[45px] left-[12px] flex flex-row gap-x-3 justify-center items-center">
                <!-- Back button to return to the previous view -->
                <img class="hover:scale-105 cursor-pointer w-[40px] h-[40px]" @click="showRoad = false"  :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].back != undefined ? appComponent.config.raffles.assets[appComponent.country].back : 'https://images.virtualsoft.tech/m/msjT1685643364.png'" alt="">
                <!-- Button to view stickers related to the raffle -->
                <button @click="showRoad = false, showStickers = true, getStickers(torneos[counterCard].id)" class="bg-gradient-to-r from-[#B94FDE] to-[#7F0B89] after:border-[#B94FDE] relative rounded-lg z-10 px-5 py-2 text-neutral text-xs button-submit-v2 font-poppinssb hover:bg-success2 hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">{{$t('Stickers')}}</button>
                <!-- Info button to show modal with tournament rules -->
                <img class="hover:scale-105 cursor-pointer w-[40px] h-[40px]" @click="appComponent.modal.showModal = 'data', appComponent.infoModal = {dataText: torneos[counterCard].rules, dataImg: ''}"  :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].info != undefined ? appComponent.config.raffles.assets[appComponent.country].info : 'https://images.virtualsoft.tech/m/msj0212T1702402203.png'" alt="">
            </div>
            <div class="w-auto md:w-full md:h-auto h-auto md:max-w-[3057px] md:max-h-[473px] my-36 md:my-0">
                <div :class="'roadv5-'+torneos[counterCard].withPrizes.length" class="relative">
                    <!-- Loop through prizes associated with the current tournament -->
                    <div v-for="(item, i) in torneos[counterCard].withPrizes" class="absolute left-0 right-0 top-0">
                        <div class="w-12 h-12 text-neutral text-xs relative cursor-pointer">
                            <!-- Prize item, clickable to open details -->
                            <div @click="prizeOpen(torneos[counterCard]), item.open=true"
                                 class="z-10 relative hover:scale-125 transition-all duration-700 ease-in-out"
                                 :class="item.current && i+1 != torneos[counterCard].withPrizes.length ? 'active-award' : ''">
                                <p :style="{color : torneos[counterCard].textColor ? torneos[counterCard].textColor : '#FFFFFF'}"
                                   class="absolute  text-lg top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 drop-shadow-[0px_0px_2px_black]  font-bold">
                                    {{ i + 1 }}</p>
                                <img v-if="!item.current && i+1 != torneos[counterCard].withPrizes.length"
                                     :src="torneos[counterCard].pointsMap ? torneos[counterCard].pointsMap : 'https://images.virtualsoft.tech/m/msjT1686076724.png'"
                                     class=" w-full h-full object-contain ">
                                <img v-else-if="item.current && i+1 != torneos[counterCard].withPrizes.length"
                                     :src="torneos[counterCard].earringMap ? torneos[counterCard].earringMap : 'https://images.virtualsoft.tech/m/msjT1686076724.png'"
                                     class=" w-full h-full object-contain ">
                                <img v-else-if="i+1 == torneos[counterCard].withPrizes.length"
                                     :src="torneos[counterCard].finalMap ? torneos[counterCard].finalMap : 'https://images.virtualsoft.tech/m/msjT1686076702.png'"
                                     class="w-full h-full animated">
                            </div>
                            <div
                                class="w-28 h-28 animate-spin absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 z-0">
                                <img v-if="item.current" src="https://images.virtualsoft.tech/m/msjT1686081313.png"
                                     class="w-full h-full object-contain rotate-img opacity-80">
                            </div>
                            <div v-if="item.open"
                                 class="scale-75 md:scale-100 w-[250px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] z-30 bg-[length:250px_350px] bg-no-repeat"
                                 :style="{'background-image' : `url(${torneos[counterCard].bgContainer != undefined && torneos[counterCard].bgContainer != '' ? torneos[counterCard].bgContainer : 'https://images.virtualsoft.tech/m/msj0212T1701980933.png' })`}">
                                <div class="w-full h-[37px] relative">
                                    <div class="w-[62px] h-[62px] absolute top-[-44px] left-[50%] -translate-x-2/4">
                                        <p :style="{color : torneos[counterCard].textColor ? torneos[counterCard].textColor : '#FFFFFF'}"
                                           class="font-poppinssb absolute top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 text-center text-3xl drop-shadow-[0px_0px_3px_black]">
                                            {{ i + 1 }}</p>
                                        <img
                                            :src="torneos[counterCard].pointsMap ? torneos[counterCard].pointsMap  : 'https://images.virtualsoft.tech/m/msjT1686076724.png'"
                                            class="object-contain ">
                                    </div>
                                    <img @click="item.open = false"
                                         src="https://images.virtualsoft.tech/m/msj212T1701894373.png"
                                         class="absolute bottom-[16px] right-[-8px] w-[28px] h-[28px] hover:brightness-90 ">
                                </div>
                                <div
                                    class="w-[250px] h-[313px] flex flex-col justify-start items-center overflow-y-auto gap-y-4 container-award-detail">
                                    <!-- Loop through prizes for the current item -->
                                    <article v-for="prize in item.prizes"
                                             class="w-[250px] h-[313px] flex flex-col justify-start items-center shrink-0 grow-0">
                                        <div class="flex flex-row justify-center items-center gap-x-2">
                                            <p class="uppercase text-white font-bold text-sm">{{ $t('GANADOR:') }}</p>
                                            <p v-if="prize.userWin.user_id"
                                               class="uppercase text-white text-center text-sm break-words max-w-[158px]">
                                                {{ prize.userWin.user_id }}</p>
                                            <p v-else class="uppercase text-white text-sm">{{ $t('PENDIENTE') }}</p>
                                        </div>
                                        <div class="relative w-3/5 h-14">
                                            <p class="absolute top-[17px] left-[24px] text-black font-bold text-[0.5rem] rotate-90 text-center">
                                                {{ $t('CUPÓN') }}</p>
                                            <p class="absolute top-[11px] left-[60px] text-black font-bold text-[0.7rem] text-center">
                                                {{ $t('GANADOR') }}</p>
                                            <p v-if="prize.userWin.coupon_id != undefined"
                                               class="absolute top-[24px] left-[60px] text-black text-[0.7rem] text-center">
                                                {{ prize.userWin.coupon_id }}</p>
                                            <p v-else
                                               class="absolute top-[24px] left-[60px] text-black text-[0.7rem] text-center">
                                                {{ $t('PENDIENTE') }}</p>
                                            <img src="https://images.virtualsoft.tech/m/msjT1686333473.png"
                                                 class="w-full h-full object-contain">
                                        </div>
                                        <p class="uppercase text-white font-bold text-sm mt-2">{{ $t('PREMIOS') }}</p>
                                        <div
                                            class="relative w-[225px] h-[105px] flex flex-col items-center justify-center">
                                            <img v-if="prize.image != undefined && prize.image != ''" :src="prize.image"
                                                 class="w-full h-full object-contain" alt="premio">
                                            <p v-else
                                               class="text-white font-extrabold text-center m-0 mt-3 w-full uppercase max-w-[225px] break-words text-sm">
                                                {{ prize.value }} <br /><span
                                                class="text-white font-light">{{ prize.description }}</span></p>
                                        </div>
                                        <p class="uppercase text-white font-bold text-sm mt-2">
                                            {{ $t('FECHA SORTEO') }}</p>
                                        <p class="uppercase text-white text-sm">
                                            {{ formatDate2(prize.date, 'DD-MM-YYYY h:mm:ss a') }}</p>
                                        <!-- Button to view prize details -->
                                        <button :disabled="prize.state == 'A'"
                                                @click="openModal2(torneos[counterCard], prize)"
                                                :class="prize.state == 'A' ? 'bg-[#dedede] text-[#9d9d9d] after:border-[#dedede]': 'bg-gradient-to-l from-[#FFA800] to-[#FFD028] after:border-[#FFA800]  hover:scale-105 '"
                                                class="rounded-lg text-black text-xs px-5 py-3 z-10 button-submit-v2 relative font-poppinssb mt-4 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">
                                            {{ $t(prize.state == 'A' ? 'Próximamente' : 'Ver sorteo') }}
                                        </button>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Background images for mobile and desktop views -->
                <img v-if="flagMobile"
                     :src="torneos[counterCard].roadBgMobile ?  torneos[counterCard].roadBgMobile : 'https://images.virtualsoft.tech/m/msjT1689353915.png'"
                     class="w-full h-full object-cover">
                <img v-else
                     :src="torneos[counterCard].roadBg ? torneos[counterCard].roadBg : 'https://images.virtualsoft.tech/m/msjT1689353504.png'"
                     class="w-full h-full object-cover">
            </div>
            <AppModalData v-if="appComponent.modal.showModal == 'data'" />
        </div>
        <!-- Conditional rendering for stickers view -->
        <div v-if="showRoad == false && showStickers == true && showCoupons == false && torneos.length > 0"
             class="w-full h-full flex justify-center items-center overflow-hidden relative">
            <div class="w-auto absolute top-[45px] left-[12px] flex flex-row gap-x-3 justify-center items-center">
                <!-- Back button to return to the previous view -->
                <img class="hover:scale-105 cursor-pointer w-[40px] h-[40px]" @click="showStickers = false"  :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].back != undefined ? appComponent.config.raffles.assets[appComponent.country].back : 'https://images.virtualsoft.tech/m/msjT1685643364.png'" alt="">
                <!-- Button to view the road related to the raffle -->
                <button @click="showStickers = false, showRoad = true, roadWithPrizes(torneos[counterCard].id)" class="bg-gradient-to-l from-[#FFA800] to-[#FFD028] after:border-[#FFA800] relative rounded-lg z-10 px-5 py-2 text-black text-xs button-submit-v2 font-poppinssb hover:bg-success2 hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">{{$t('Ver sorteo')}}</button>
            </div>
            <div class="container-stickers w-full h-full flex flex-col justify-start items-center md:my-0 my-5">
                <div class="flex flex-col justify-start items-center pt-24 gap-y-14 w-[93%] md:w-[52%] h-auto">
                    <!-- Display stickers based on the selected type -->
                    <div
                        v-if="(stickers['casino'] != undefined && stickers['casino'].length >0) && (stickers['sportbook'] != undefined && stickers['sportbook'].length > 0)"
                        class="flex flex-col md:flex-row justify-between items-center gap-5">
                        <p class="text-neutral text-4xl uppercase font-poppinssb">{{ $t('STICKERS:') }}</p>
                        <div class="group-button flex flex-row justify-center items-center gap-x-5">
                            <button
                                v-if="stickers != undefined && stickers['casino'] != undefined && stickers['casino'].length > 0"
                                @click="showRoad = false, selectStickers = 'casino'"
                                :class="selectStickers == 'casino' ? 'from-success to-success/80 after:border-success text-neutral': 'from-[#FFA800] to-[#FFD028] after:border-[#FFA800] text-black'"
                                class="bg-gradient-to-l  relative rounded-lg z-10 px-5 py-2  text-xs button-submit-v2 font-poppinssb hover:bg-success2 hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">
                                {{ $t('Casino') }}
                            </button>
                            <button
                                v-if="stickers != undefined && stickers['sportbook'] != undefined && stickers['sportbook'].length > 0"
                                @click="showRoad = false, selectStickers = 'sportbook'"
                                :class="selectStickers == 'sportbook' ? 'from-success to-success/80 after:border-success text-neutral': 'from-[#FFA800] to-[#FFD028] after:border-[#FFA800] text-black'"
                                class="bg-gradient-to-l relative rounded-lg z-10 px-5 py-2 text-xs button-submit-v2 font-poppinssb hover:bg-success2 hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038]">
                                {{ $t('Deportivas') }}
                            </button>
                        </div>
                    </div>
                    <div clas="flex justify-center items-center flex-col">
                        <h3 v-if="selectStickers == 'sportbook'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por pronósticos deportivos') }}</h3>
                        <h3 v-else-if="selectStickers == 'casino'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por pronósticos casino') }}</h3>
                        <h3 v-else-if="selectStickers == 'deposit'"
                            class="text-neutral text-lg uppercase font-bold text-center">
                            {{ $t('Stickers por depósitos') }}</h3>
                        <p v-if="selectStickers == 'sportbook'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.sportbookMax
                            }}.
                            {{ $t('Cada pronóstico individual debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.sportbookMin }}</p>
                        <p v-else-if="selectStickers == 'casino'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.casinoMax
                            }}.
                            {{ $t('Cada pronóstico individual debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.casinoMin }}</p>
                        <p v-else-if="selectStickers == 'deposit'" class="text-neutral text-base md:text-lg text-center">
                            {{ $t('Gánate un sticker acumulando un total de $') }}{{ torneos[counterCard].minAmountDetails.depositMax
                            }}.
                            {{ $t('Cada deposito debe ser mayor o igual a $') }}{{ torneos[counterCard].minAmountDetails.depositMin }}</p>
                    </div>
                </div>
                <div
                    class="body-stickers flex flex-wrap flex-col md:flex-row justify-center items-center w-3/5 h-auto my-8 gap-5">
                    <!-- Loop through stickers and display each one -->
                    <article v-for="sticker in stickers[selectStickers]"
                             class="relative flex h-[175px] w-[175px] justify-center items-center pointer-events-none">
                        <div
                            class="rounded-full overflow-hidden w-[100px] h-[100px] relative saturate-150 sticker-animation-circle">
                            <p v-if="sticker.percent <= 0"
                               class="text-center text-neutral text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
                                {{ $t('Realiza un pronóstico para desbloquear el sticker') }}</p>
                            <img v-if="sticker.percent > 0" :src="appComponent.config.logo"
                                 class="w-full h-full object-contain p-4 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
                            <span
                                :class="[sticker.percent > 0 && sticker.percent <= 25 ? 'top-[72px]': sticker.percent >= 26 && sticker.percent <= 50 ? 'top-[53px]': sticker.percent >= 51 && sticker.percent <= 75 ? 'top-[32px]': sticker.percent >= 76 && sticker.percent <= 99 ? 'top-[12px]': sticker.percent == 100 ? 'top-[-17px]' : 'hidden']"
                                class="sticker-animation w-[197px] h-[119px] bg-[url(https://images.virtualsoft.tech/m/msj212T1701885500.png)] bg-cover bg-no-repeat absolute left-[-97px]"></span>
                        </div>
                        <img src="https://images.virtualsoft.tech/m/msj0212T1701882050.png"
                             class="absolute w-[174px] top-[7px]">
                    </article>
                </div>
                <div
                    class="w-3/5 h-auto flex flex-col justify-center items-center font-bold text-black capitalize my-14 gap-y-3">
                    <!-- Button to view user's coupons -->
                    <button @click="showCoupons = true, showStickers = false"
                            class="bg-gradient-to-l from-[#FFA800] to-[#FFD028] after:border-[#FFA800] rounded-lg  text-black z-10 button-submit-v2 relative font-poppinssb hover:scale-105 shadow-[0px_6px_0px_#00000038_,_inset_0px_-5px_0px_#00000038] px-10 py-4 mt-2">
                        {{ $t('Mis Cupones') }}: {{ totalCoupons }}
                    </button>
                    <p class="text-neutral text-xs italic font-light text-center">
                        {{ $t('* Completa todos los stickers para obtener 1 cupón') }}</p>
                </div>
            </div>
        </div>
        <!-- Conditional rendering for coupons view -->
        <div v-if="showRoad == false && showStickers == false && showCoupons == true && torneos.length > 0"
             class="w-full h-full flex justify-center items-center overflow-hidden relative">
            <div class="w-auto absolute top-[45px] left-[12px] flex flex-row gap-x-3 justify-center items-center">
                <!-- Back button to return to the previous view -->
                <img class="hover:scale-105 cursor-pointer w-[40px] h-[40px]" @click="showCoupons = false"  :src="appComponent.config.raffles != undefined && appComponent.config.raffles.assets != undefined && appComponent.config.raffles.assets[appComponent.country] != undefined && appComponent.config.raffles.assets[appComponent.country].back != undefined ? appComponent.config.raffles.assets[appComponent.country].back : 'https://images.virtualsoft.tech/m/msjT1685643364.png'" alt="">
            </div>
            <div class="container-stickers w-full h-full flex flex-col justify-start items-center">
                <div class="flex flex-col justify-start items-center pt-24 gap-y-8 w-[93%] md:w-[52%] h-auto">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-5">
                        <p class="text-neutral text-4xl uppercase font-poppinssb">{{ $t('CUPONES:') }}</p>
                    </div>
                    <div clas="flex justify-center items-center flex-col">
                        <p class="text-neutral text-base md:text-lg text-center font-poppinssl">
                            {{ $t('Cupones obtenidos por completar todos los stickers. Entre más cupones tengas, más posibilidades tendrás para ganar los premios') }}</p>
                    </div>
                </div>
                <div
                    class="body-stickers flex flex-wrap flex-col md:flex-row justify-center items-center max-h-[476px] overflow-auto w-3/5 h-auto my-8 gap-5">
                    <!-- Loop through coupons and display each one -->
                    <article v-if="coupons.length > 0" v-for="coupon in coupons" :key="coupon.code"
                             class="w-[210px] h-[100px] overflow-hidden relative flex justify-center items-center pointer-events-none">
                        <p class="absolute top-[39px] left-[4px] text-black font-bold text-[1rem] rotate-90 text-center">
                            {{ $t('CUPÓN') }}</p>
                        <p class="text-center text-black text-md font-bold absolute top-[27px] left-[79px] ">
                            {{ $t('CUPÓN NÚMERO') }}</p>
                        <p class="text-center text-black text-md font-light absolute top-[47px] left-[79px] ">
                            {{ coupon.code }}</p>
                        <img src="https://images.virtualsoft.tech/m/msjT1686333473.png"
                             class="w-full h-full object-contain">
                    </article>
                    <article v-if="coupons.length == 0" class="h-96 w-full flex justify-center items-center">
                        <h3 class="text-none-coupon text-neutral text-center rounded-md font-poppinssl bg-[#656565] p-2 italic">
                            {{ $t('NO TIENES CUPONES ACTUALMENTE') }}</h3>
                    </article>
                    <!-- "Show More" button: displayed only if loadMoreCouponButton is true -->
                    <div v-if="loadMoreCouponButton" class="w-full flex justify-center items-center pt-2 pb-10">
                        <button @click="loadMoreCoupons(torneos[counterCard].id)"
                                class="w-36 sm:w-44 h-9 sm:h-12 border-0 sm:border-1 border-neutral rounded-full font-poppinsm text-lg sm:text-xl hover:bg-primary hover:text-neutral-content
                              hover:border-0 bg-primary sm:bg-transparent text-neutral-content sm:text-neutral">
                            {{$t('Mostrar más')}}
                        </button>
                    </div>
                    <!-- Final message: displayed only if at least one batch has been loaded (offset > 0) and there are no more coupons to load (loadMoreCouponButton is false) -->
                    <div v-else-if="offset > 0 && !loadMoreCouponButton" class="w-full flex justify-center items-center pb-10 pt-2">
                        <p class="text-neutral text-lg text-center">
                            {{$t('Has llegado al final de tus cupones.')}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal for displaying raffle details, conditionally rendered -->
        <div v-if="torneos[counterCard] != undefined && torneos[counterCard].id  != undefined"
             :class="'popuproad-'+torneos[counterCard].id +' modal text-neutral-content items-center bg-neutral-content bg-opacity-75'"
             v-show="torneos[counterCard].open">
            <div class="modal-box rounded-2xl bg-black relative border-3 border-solid border-[#bc7626]"
                 v-if="torneos[counterCard].open"
                 :style="{'background-image' : `url(${torneos[counterCard].raffleBackground})`}"
                 style="max-width: 100%; height:100%; max-height: 100%; background-size: cover;">
                <div class="cursor-pointer" @click="modalClose(torneos[counterCard])">
                    <img src="https://images.virtualsoft.tech/m/msj212T1701894373.png"
                         class="absolute right-[3px] top-[3px] w-[38px] h-[38px] hover:brightness-90 ">
                </div>
                <div class="w-full h-full md:px-8">
                    <div class="body-coupon grid grid-cols-1 md:grid-cols-3 w-full h-full">
                        <div class="w-full h-full flex justify-center" style="max-height: 379px !important;">
                            <img
                                v-if="appComponent.config.raffles != undefined && appComponent.config.raffles.imgWinner != undefined && appComponent.config.raffles.imgWinner != ''"
                                class="w-9/12 h-full object-contain" :src="appComponent.config.raffles.imgWinner"
                                alt="qatar" width="100" height="100">
                        </div>
                        <div class="w-full h-full flex items-center justify-center flex-col body-passport my-5 bg-base-300/60 rounded-2xl backdrop-blur-md"
                             style="max-height: 500px !important;">
                            <div class="users mb-3">
                                <p class="capitalize text-center text-xl md:text-2xl text-neutral italic w-full">
                                    {{ $t('cantidad de usuarios participando') }} </p>
                                <p v-if="!flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="-webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ torneos[counterCard].totalPlayers }}</p>
                                <p v-if="flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ openUP }}</p>
                            </div>
                            <div class="coupons">
                                <p class="capitalize text-center text-xl md:text-2xl text-neutral italic">
                                    {{ $t('cantidad de cupones participando') }} </p>
                                <p v-if="!flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ torneos[counterCard].totalCoupons }}</p>
                                <p v-if="flagOpenModal2"
                                   class="text-5xl md:text-7xl font-black tracking-tighter w-full text-center "
                                   style="background: #F4FB26; background: linear-gradient(to left, #C48E0A 0%, #C48E0A 25%, #F3CF1D 50%, #C48E0A 75%, #C48E0A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    {{ openCP }}</p>
                            </div>
                            <div class="title-countdown items-center justify-center text-neutral text-xl mt-5"
                                 style="top: 169px;">
                                <p class="text-center mb-2 font-poppinssl">Sorteo empieza en:</p>
                            </div>
                            <div
                                class="h-auto bg-gradient-to-b from-white to-[#9e9e9e] p-2 rounded-xl w-auto text-black font-poppinssb text-3xl px-10 py-3 z-10 flex justify-center items-center">
                                <vue-countdown v-if="!flagOpenModal2" :time="torneos[counterCard].datePrice"
                                               :interval="100" v-slot="{ minutes, seconds }">
                                    {{ minutes }} : {{ seconds }}
                                </vue-countdown>
                                <vue-countdown v-if="flagOpenModal2" :time="datePrice" :interval="100"
                                               v-slot="{ minutes, seconds }" @end="getPrize2();">
                                    {{ minutes }} : {{ seconds }}
                                </vue-countdown>
                            </div>
                        </div>
                        <div class="award-animation w-full h-full flex justify-center relative">
                            <img class="w-3/5 h-full object-contain"
                                 src="https://images.virtualsoft.tech/site/image-lotery.png" alt="" width="100"
                                 height="100">
                            <div
                                v-if="torneos[counterCard].idPrize != undefined && torneos[counterCard].idPrize.length > 0 && !openM"
                                class="w-full h-full flex justify-center absolute"
                                style="max-height: 379px !important;">
                                <div class="absolute flex items-center justify-center md:mt-20"
                                     style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                    <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                        {{ $t('CUPÓN') }}</p>
                                    <p class="absolute text-black z-10 top-[63px] left-[111px] text-3xl font-black">
                                        {{ $t('GANADOR') }}</p>
                                    <p class="absolute text-black z-10 top-[93px] left-[111px] text-xs font-light">
                                        {{ torneos[counterCard].user_id }}</p>
                                    <p class="absolute text-black z-10 top-[113px] left-[111px] text-md font-black text-center">
                                        {{ $t('CUPÓN: ') }} <br />{{ torneos[counterCard].idPrize }}</p>
                                    <img class="w-full absolute text-coupons"
                                         src="https://images.virtualsoft.tech/m/msjT1686333473.png" alt="background"
                                         width="525" height="634" style="z-index: 2;">
                                </div>
                            </div>
                            <div v-if="openM" class="w-full h-full flex justify-center absolute"
                                 style="max-height: 379px !important;">
                                <div class="absolute flex items-center justify-center md:mt-20"
                                     style="height: 206px; width: 60%; overflow: hidden; min-width: 300px; max-width: 308px;">
                                    <p class="absolute text-black z-10 top-[93px] left-[9px] rotate-90 text-xl font-black">
                                        {{ $t('CUPÓN') }}</p>
                                    <p class="absolute text-black z-10 top-[63px] left-[111px] text-3xl font-black">
                                        {{ $t('GANADOR') }}</p>
                                    <p class="absolute text-black z-10 top-[93px] left-[111px] text-xs font-light">
                                        {{ openUG }}</p>
                                    <p class="absolute text-black z-10 top-[113px] left-[111px] text-md font-black text-center">
                                        {{ $t('CUPÓN: ') }} <br />{{ openMC }}</p>
                                    <img class="w-full absolute text-coupons"
                                         src="https://images.virtualsoft.tech/m/msjT1686333473.png" alt="background"
                                         width="525" height="634" style="z-index: 2;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fallback message when no tournaments are available -->
        <div v-if="torneos.length <= 0" class="w-full h-full flex justify-center items-center py-52 md:py-72">
            <button class="bg-white text-black rounded-full px-4 py-2">
                {{ $t('No hay sorteos disponibles actualmente') }}
            </button>
        </div>
    </div>
    <!-- End Raffles v5 -->

</template>



<style scoped>
/* Animation for coupon elements */
.coupon__animation {
    animation: coupons 3s 1 ease-out; /* Applies the 'coupons' animation */
}

/* Keyframes for coupon animation */
@keyframes coupons {
    0% {
        opacity: 0; /* Start fully transparent */
        transform: translateX(420px); /* Start off-screen to the right */
    }
    50% {
        transform: translateX(-54px); /* Move to the left */
    }
    100% {
        opacity: 1; /* End fully visible */
        transform: translateX(0px); /* End at original position */
    }
}

/* Styles for the close button's after pseudo-element */
.close__button::after {
    content: ""; /* Empty content for the pseudo-element */
    position: absolute; /* Positioning relative to the close button */
    left: 8px; /* Horizontal position */
    top: 12px; /* Vertical position */
    width: 5px; /* Width of the element */
    height: 7px; /* Height of the element */
    background-color: #ffffffd7; /* Semi-transparent white background */
    border-radius: 50%; /* Circular shape */
    transform: rotate(45deg); /* Rotate the element */
}

/* Styles for the close button's before pseudo-element */
.close__button::before {
    content: ""; /* Empty content for the pseudo-element */
    position: absolute; /* Positioning relative to the close button */
    left: 15px; /* Horizontal position */
    top: 1px; /* Vertical position */
    width: 26px; /* Width of the element */
    height: 15px; /* Height of the element */
    border-radius: 50%; /* Circular shape */
    border-top: 4px solid #ffffffd7; /* Top border for the element */
    transform: rotate(339deg); /* Rotate the element */
}

/* Styles for the raffle button's after pseudo-element */
.button-raffle::after {
    content: ""; /* Empty content for the pseudo-element */
    position: absolute; /* Positioning relative to the button */
    top: 1px; /* Vertical position */
    right: 17px; /* Horizontal position */
    width: 3px; /* Width of the element */
    height: 6px; /* Height of the element */
    border-radius: 190px 61px 61px 190px; /* Custom border radius */
    background-color: #ffffff73; /* Semi-transparent white background */
    transform: rotate(100deg); /* Rotate the element */
}

/* Styles for the raffle button's before pseudo-element */
.button-raffle::before {
    content: ""; /* Empty content for the pseudo-element */
    position: absolute; /* Positioning relative to the button */
    top: 4px; /* Vertical position */
    right: 6px; /* Horizontal position */
    width: 6px; /* Width of the element */
    height: 12px; /* Height of the element */
    border-radius: 190px 155px 155px 190px; /* Custom border radius */
    background-color: #ffffff73; /* Semi-transparent white background */
    transform: rotate(120deg); /* Rotate the element */
}

/* Animation for sticker elements with a circular motion */
.sticker-animation-circle {
    animation: sticker-circle 3s linear infinite alternate-reverse; /* Applies circular animation */
}

/* Keyframes for sticker circular animation */
@keyframes sticker-circle {
    from {
        transform: rotate(-7deg); /* Start rotation */
    }
    to {
        transform: rotate(7deg); /* End rotation */
    }
}

/* Animation for sticker elements with horizontal motion */
.sticker-animation {
    animation: sticker 2.5s linear infinite; /* Applies horizontal animation */
}

/* Keyframes for sticker horizontal animation */
@keyframes sticker {
    from {
        transform: translateX(0px); /* Start at original position */
    }
    to {
        transform: translateX(97px); /* Move to the right */
    }
}

/* Styles for active points */
.point-active {
    position: absolute; /* Positioning relative to the parent */
    z-index: 20; /* Ensure it appears above other elements */
    left: 0; /* Horizontal position */
    top: 0; /* Vertical position */
    transform: translateX(-50%) translateY(-50%); /* Center the point */
    width: 10px; /* Width of the point */
    height: 10px; /* Height of the point */
    background: rgb(0, 255, 51); /* Green background */
}

/* Animation for active awards */
.active-award {
    animation: activate 2s linear infinite alternate-reverse; /* Applies activation animation */
}

/* Keyframes for active award animation */
@keyframes activate {
    from {
        transform: scale(1.2); /* Start slightly larger */
    }
    to {
        transform: scale(1); /* End at original size */
    }
}

/* Styles for the back arrow button */
.arrow-back {
    background: linear-gradient(0deg, #3c8bea, #47adf3, #299ABDff, #a0e1fe); /* Gradient background */
    box-shadow: inset 0px 0px 0px 2px #3c8bea, inset 0px 0px 4px 2px #3c8bea; /* Inner shadow */
}

/* Hover styles for the back arrow button */
.arrow-back:hover {
    background: linear-gradient(0deg, #176a0b, #137732, #29bd2b, #a0feb7); /* Change gradient on hover */
    box-shadow: inset 0px 0px 0px 2px #043f1c, inset 0px 0px 4px 2px #003811; /* Change shadow on hover */
}

/* Animation for rotating images */
.rotate-img {
    animation: rotateImg infinite 8s linear; /* Applies rotation animation */
}

/* Keyframes for image rotation */
@keyframes rotateImg {
    from {
        transform: rotate(0deg); /* Start at 0 degrees */
    }
    to {
        transform: rotate(359deg); /* Complete a full rotation */
    }
}

/* Media query for responsive design */
@media only screen and (max-width: 768px) {
    /* Adjustments for various road versions */
    .roadv2-1 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-2 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-2 > div:nth-child(2) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-3 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-3 > div:nth-child(2) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-3 > div:nth-child(3) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-4 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-4 > div:nth-child(2) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-4 > div:nth-child(3) {
        margin-top: 164.6% !important; /* Adjust top margin */
        margin-left: 37.2% !important; /* Adjust left margin */
    }
    .roadv2-4 > div:nth-child(4) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-5 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-5 > div:nth-child(2) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-5 > div:nth-child(3) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-5 > div:nth-child(4) {
        margin-top: 164.6% !important; /* Adjust top margin */
        margin-left: 37.2% !important; /* Adjust left margin */
    }
    .roadv2-5 > div:nth-child(5) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(2) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(3) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(4) {
        margin-top: 140.2% !important; /* Adjust top margin */
        margin-left: 62.9% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(5) {
        margin-top: 184% !important; /* Adjust top margin */
        margin-left: 37.1% !important; /* Adjust left margin */
    }
    .roadv2-6 > div:nth-child(6) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(2) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(3) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(4) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(5) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(6) {
        margin-top: 184% !important; /* Adjust top margin */
        margin-left: 37.1% !important; /* Adjust left margin */
    }
    .roadv2-7 > div:nth-child(7) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(2) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(3) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(4) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(5) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(6) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(7) {
        margin-top: 184% !important; /* Adjust top margin */
        margin-left: 37.1% !important; /* Adjust left margin */
    }
    .roadv2-8 > div:nth-child(8) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(2) {
        margin-top: 34.6% !important; /* Adjust top margin */
        margin-left: 22.7% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(3) {
        margin-top: 68.6% !important; /* Adjust top margin */
        margin-left: 38.3% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(4) {
        margin-top: 105.6% !important; /* Adjust top margin */
        margin-left: 20.7% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(5) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(6) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(7) {
        margin-top: 177% !important; /* Adjust top margin */
        margin-left: 37.1% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(8) {
        margin-top: 204.6% !important; /* Adjust top margin */
        margin-left: 48.1% !important; /* Adjust left margin */
    }
    .roadv2-9 > div:nth-child(9) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(2) {
        margin-top: 25.6% !important; /* Adjust top margin */
        margin-left: 17.7% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(3) {
        margin-top: 49.6% !important; /* Adjust top margin */
        margin-left: 31.7% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(4) {
        margin-top: 77.7% !important; /* Adjust top margin */
        margin-left: 38.3% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(5) {
        margin-top: 105.6% !important; /* Adjust top margin */
        margin-left: 19.7% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(6) {
        margin-top: 121.2% !important; /* Adjust top margin */
        margin-left: 53.7% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(7) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(8) {
        margin-top: 184.6% !important; /* Adjust top margin */
        margin-left: 38.1% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(9) {
        margin-top: 209.3% !important; /* Adjust top margin */
        margin-left: 48.8% !important; /* Adjust left margin */
    }
    .roadv2-10 > div:nth-child(10) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(2) {
        margin-top: 15.6% !important; /* Adjust top margin */
        margin-left: 16.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(3) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(4) {
        margin-top: 58.7% !important; /* Adjust top margin */
        margin-left: 35.3% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(5) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(6) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(7) {
        margin-top: 117.6% !important; /* Adjust top margin */
        margin-left: 40.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(8) {
        margin-top: 146.2% !important; /* Adjust top margin */
        margin-left: 56.7% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(9) {
        margin-top: 170.8% !important; /* Adjust top margin */
        margin-left: 35.2% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(10) {
        margin-top: 200.2% !important; /* Adjust top margin */
        margin-left: 45.9% !important; /* Adjust left margin */
    }
    .roadv2-11 > div:nth-child(11) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(2) {
        margin-top: 15.6% !important; /* Adjust top margin */
        margin-left: 16.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(3) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(4) {
        margin-top: 58.7% !important; /* Adjust top margin */
        margin-left: 35.3% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(5) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(6) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(7) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(8) {
        margin-top: 119.2% !important; /* Adjust top margin */
        margin-left: 42.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(9) {
        margin-top: 146.2% !important; /* Adjust top margin */
        margin-left: 56.7% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(10) {
        margin-top: 170.8% !important; /* Adjust top margin */
        margin-left: 35.2% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(11) {
        margin-top: 200.2% !important; /* Adjust top margin */
        margin-left: 45.9% !important; /* Adjust left margin */
    }
    .roadv2-12 > div:nth-child(12) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(2) {
        margin-top: 15.6% !important; /* Adjust top margin */
        margin-left: 16.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(3) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(4) {
        margin-top: 58.7% !important; /* Adjust top margin */
        margin-left: 35.3% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(5) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(6) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(7) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(8) {
        margin-top: 119.2% !important; /* Adjust top margin */
        margin-left: 42.7% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(9) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(10) {
        margin-top: 148.2% !important; /* Adjust top margin */
        margin-left: 52.9% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(11) {
        margin-top: 170.8% !important; /* Adjust top margin */
        margin-left: 35.2% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(12) {
        margin-top: 200.2% !important; /* Adjust top margin */
        margin-left: 45.9% !important; /* Adjust left margin */
    }
    .roadv2-13 > div:nth-child(13) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(2) {
        margin-top: 15.6% !important; /* Adjust top margin */
        margin-left: 16.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(3) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(4) {
        margin-top: 58.7% !important; /* Adjust top margin */
        margin-left: 35.3% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(5) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(6) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(7) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(8) {
        margin-top: 119.2% !important; /* Adjust top margin */
        margin-left: 42.7% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(9) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(10) {
        margin-top: 140.2% !important; /* Adjust top margin */
        margin-left: 62.9% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(11) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(12) {
        margin-top: 177.6% !important; /* Adjust top margin */
        margin-left: 37.2% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(13) {
        margin-top: 206% !important; /* Adjust top margin */
        margin-left: 49.1% !important; /* Adjust left margin */
    }
    .roadv2-14 > div:nth-child(14) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(1) {
        margin-top: -4.4% !important; /* Adjust top margin */
        margin-left: 21.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(2) {
        margin-top: 15.6% !important; /* Adjust top margin */
        margin-left: 16.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(3) {
        margin-top: 37.6% !important; /* Adjust top margin */
        margin-left: 24.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(4) {
        margin-top: 58.7% !important; /* Adjust top margin */
        margin-left: 35.3% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(5) {
        margin-top: 78.6% !important; /* Adjust top margin */
        margin-left: 39.3% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(6) {
        margin-top: 96.6% !important; /* Adjust top margin */
        margin-left: 29.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(7) {
        margin-top: 113.6% !important; /* Adjust top margin */
        margin-left: 23.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(8) {
        margin-top: 119.2% !important; /* Adjust top margin */
        margin-left: 42.7% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(9) {
        margin-top: 123.8% !important; /* Adjust top margin */
        margin-left: 62.2% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(10) {
        margin-top: 140.2% !important; /* Adjust top margin */
        margin-left: 62.9% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(11) {
        margin-top: 150.8% !important; /* Adjust top margin */
        margin-left: 49.9% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(12) {
        margin-top: 164.6% !important; /* Adjust top margin */
        margin-left: 37.2% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(13) {
        margin-top: 184% !important; /* Adjust top margin */
        margin-left: 37.1% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(14) {
        margin-top: 204.6% !important; /* Adjust top margin */
        margin-left: 48.1% !important; /* Adjust left margin */
    }
    .roadv2-15 > div:nth-child(15) {
        margin-top: 226.3% !important; /* Adjust top margin */
        margin-left: 68.8% !important; /* Adjust left margin */
    }
}

/* Styles for road version 5 */
.roadv5-1 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-2 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-2 > div:nth-child(2) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv5-3 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-3 > div:nth-child(2) {
    margin-top: 8.2%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv5-3 > div:nth-child(3) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv5-4 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-4 > div:nth-child(2) {
    margin-top: 32%; /* Adjust top margin */
    margin-left: 36.1%; /* Adjust left margin */
}
.roadv5-4 > div:nth-child(3) {
    margin-top: 29.7%; /* Adjust top margin */
    margin-left: 65%; /* Adjust left margin */
}
.roadv5-4 > div:nth-child(4) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv5-5 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-5 > div:nth-child(2) {
    margin-top: 32%; /* Adjust top margin */
    margin-left: 36.1%; /* Adjust left margin */
}
.roadv5-5 > div:nth-child(3) {
    margin-top: 8.2%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv5-5 > div:nth-child(4) {
    margin-top: 29.7%; /* Adjust top margin */
    margin-left: 65%; /* Adjust left margin */
}
.roadv5-5 > div:nth-child(5) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(2) {
    margin-top: 0.5%; /* Adjust top margin */
    margin-left: 23.4%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(3) {
    margin-top: 8.2%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(4) {
    margin-top: 29.7%; /* Adjust top margin */
    margin-left: 65%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(5) {
    margin-top: -1.2%; /* Adjust top margin */
    margin-left: 68.8%; /* Adjust left margin */
}
.roadv5-6 > div:nth-child(6) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(1) {
    margin-top: 27.2%; /* Adjust top margin */
    margin-left: 3.8%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(2) {
    margin-top: 0.5%; /* Adjust top margin */
    margin-left: 23.4%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(3) {
    margin-top: 32%; /* Adjust top margin */
    margin-left: 36.1%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(4) {
    margin-top: 8.2%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(5) {
    margin-top: 29.7%; /* Adjust top margin */
    margin-left: 65%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(6) {
    margin-top: -1.3%; /* Adjust top margin */
    margin-left: 69%; /* Adjust left margin */
}
.roadv5-7 > div:nth-child(7) {
    margin-top: 29.8%; /* Adjust top margin */
    margin-left: 90.8%; /* Adjust left margin */
}
.roadv4-1 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-2 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-2 > div:nth-child(2) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-3 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-3 > div:nth-child(2) {
    margin-top: 11.5%; /* Adjust top margin */
    margin-left: 52.8%; /* Adjust left margin */
}
.roadv4-3 > div:nth-child(3) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-4 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-4 > div:nth-child(2) {
    margin-top: 37.5%; /* Adjust top margin */
    margin-left: 37.8%; /* Adjust left margin */
}
.roadv4-4 > div:nth-child(3) {
    margin-top: 35.5%; /* Adjust top margin */
    margin-left: 66.8%; /* Adjust left margin */
}
.roadv4-4 > div:nth-child(4) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-5 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-5 > div:nth-child(2) {
    margin-top: 10.5%; /* Adjust top margin */
    margin-left: 27.8%; /* Adjust left margin */
}
.roadv4-5 > div:nth-child(3) {
    margin-top: 10.5%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv4-5 > div:nth-child(4) {
    margin-top: 35.5%; /* Adjust top margin */
    margin-left: 67.8%; /* Adjust left margin */
}
.roadv4-5 > div:nth-child(5) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(2) {
    margin-top: 10.5%; /* Adjust top margin */
    margin-left: 27.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(3) {
    margin-top: 10.5%; /* Adjust top margin */
    margin-left: 50.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(4) {
    margin-top: 35.5%; /* Adjust top margin */
    margin-left: 67.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(5) {
    margin-top: 0.5%; /* Adjust top margin */
    margin-left: 71.8%; /* Adjust left margin */
}
.roadv4-6 > div:nth-child(6) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(2) {
    margin-top: 10.5%; /* Adjust top margin */
    margin-left: 27.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(3) {
    margin-top: 35.5%; /* Adjust top margin */
    margin-left: 41.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(4) {
    margin-top: 13.5%; /* Adjust top margin */
    margin-left: 56.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(5) {
    margin-top: 33.5%; /* Adjust top margin */
    margin-left: 71.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(6) {
    margin-top: 0.5%; /* Adjust top margin */
    margin-left: 72.8%; /* Adjust left margin */
}
.roadv4-7 > div:nth-child(7) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(2) {
    margin-top: 2.5%; /* Adjust top margin */
    margin-left: 19.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(3) {
    margin-top: 37.5%; /* Adjust top margin */
    margin-left: 33.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(4) {
    margin-top: 11.5%; /* Adjust top margin */
    margin-left: 49.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(5) {
    margin-top: 35.5%; /* Adjust top margin */
    margin-left: 65.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(6) {
    margin-top: 0.5%; /* Adjust top margin */
    margin-left: 72.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(7) {
    margin-top: 21.5%; /* Adjust top margin */
    margin-left: 78.8%; /* Adjust left margin */
}
.roadv4-8 > div:nth-child(8) {
    margin-top: 36.5%; /* Adjust top margin */
    margin-left: 92.8%; /* Adjust left margin */
}
.roadv4-9 > div:nth-child(1) {
    margin-top: 34.5%; /* Adjust top margin */
    margin-left: 0.8%; /* Adjust left margin */
}
.roadv4-9 > div:nth-child(2) {
    margin-top: 2.5%; /* Adjust top margin */
    margin-left: 19.8%; /* Adjust left margin */
}

.roadv4-9 > div:nth-child(3){ /* Third child of roadv4-9, sets top and left margins */
    margin-top: 37.5%; /* Top margin of 37.5% */
    margin-left: 33.8%; /* Left margin of 33.8% */
}
.roadv4-9 > div:nth-child(4){ /* Fourth child of roadv4-9, sets top and left margins */
    margin-top: 19.5%; /* Top margin of 19.5% */
    margin-left: 42.8%; /* Left margin of 42.8% */
}
.roadv4-9 > div:nth-child(5){ /* Fifth child of roadv4-9, sets top and left margins */
    margin-top: 20.5%; /* Top margin of 20.5% */
    margin-left: 58.8%; /* Left margin of 58.8% */
}
.roadv4-9 > div:nth-child(6){ /* Sixth child of roadv4-9, sets top and left margins */
    margin-top: 9.5%; /* Top margin of 9.5% */
    margin-left: 64.8%; /* Left margin of 64.8% */
}
.roadv4-9 > div:nth-child(7){ /* Seventh child of roadv4-9, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 79.8%; /* Left margin of 79.8% */
}
.roadv4-9 > div:nth-child(8){ /* Eighth child of roadv4-9, sets top and left margins */
    margin-top: 24.5%; /* Top margin of 24.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-9 > div:nth-child(9){ /* Ninth child of roadv4-9, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
.roadv4-10 > div:nth-child(1){ /* First child of roadv4-10, sets top and left margins */
    margin-top: 34.5%; /* Top margin of 34.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv4-10 > div:nth-child(2){ /* Second child of roadv4-10, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 10.8%; /* Left margin of 10.8% */
}
.roadv4-10 > div:nth-child(3){ /* Third child of roadv4-10, sets top and left margins */
    margin-top: 18.5%; /* Top margin of 18.5% */
    margin-left: 24.8%; /* Left margin of 24.8% */
}
.roadv4-10 > div:nth-child(4){ /* Fourth child of roadv4-10, sets top and left margins */
    margin-top: 38.5%; /* Top margin of 38.5% */
    margin-left: 34.8%; /* Left margin of 34.8% */
}
.roadv4-10 > div:nth-child(5){ /* Fifth child of roadv4-10, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 43.8%; /* Left margin of 43.8% */
}
.roadv4-10 > div:nth-child(6){ /* Sixth child of roadv4-10, sets top and left margins */
    margin-top: 35.5%; /* Top margin of 35.5% */
    margin-left: 64.8%; /* Left margin of 64.8% */
}
.roadv4-10 > div:nth-child(7){ /* Seventh child of roadv4-10, sets top and left margins */
    margin-top: 8.5%; /* Top margin of 8.5% */
    margin-left: 64.8%; /* Left margin of 64.8% */
}
.roadv4-10 > div:nth-child(8){ /* Eighth child of roadv4-10, sets top and left margins */
    margin-top: 11.5%; /* Top margin of 11.5% */
    margin-left: 79.8%; /* Left margin of 79.8% */
}
.roadv4-10 > div:nth-child(9){ /* Ninth child of roadv4-10, sets top and left margins */
    margin-top: 26.5%; /* Top margin of 26.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-10 > div:nth-child(10){ /* Tenth child of roadv4-10, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
.roadv4-11 > div:nth-child(1){ /* First child of roadv4-11, sets top and left margins */
    margin-top: 34.5%; /* Top margin of 34.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv4-11 > div:nth-child(2){ /* Second child of roadv4-11, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 10.8%; /* Left margin of 10.8% */
}
.roadv4-11 > div:nth-child(3){ /* Third child of roadv4-11, sets top and left margins */
    margin-top: 18.5%; /* Top margin of 18.5% */
    margin-left: 24.8%; /* Left margin of 24.8% */
}
.roadv4-11 > div:nth-child(4){ /* Fourth child of roadv4-11, sets top and left margins */
    margin-top: 38.5%; /* Top margin of 38.5% */
    margin-left: 34.8%; /* Left margin of 34.8% */
}
.roadv4-11 > div:nth-child(5){ /* Fifth child of roadv4-11, sets top and left margins */
    margin-top: 21.5%; /* Top margin of 21.5% */
    margin-left: 42.8%; /* Left margin of 42.8% */
}
.roadv4-11 > div:nth-child(6){ /* Sixth child of roadv4-11, sets top and left margins */
    margin-top: 20.5%; /* Top margin of 20.5% */
    margin-left: 58.8%; /* Left margin of 58.8% */
}
.roadv4-11 > div:nth-child(7){ /* Seventh child of roadv4-11, sets top and left margins */
    margin-top: 35.5%; /* Top margin of 35.5% */
    margin-left: 67.8%; /* Left margin of 67.8% */
}
.roadv4-11 > div:nth-child(8){ /* Eighth child of roadv4-11, sets top and left margins */
    margin-top: 8.5%; /* Top margin of 8.5% */
    margin-left: 64.8%; /* Left margin of 64.8% */
}
.roadv4-11 > div:nth-child(9){ /* Ninth child of roadv4-11, sets top and left margins */
    margin-top: 15.5%; /* Top margin of 15.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-11 > div:nth-child(10){ /* Tenth child of roadv4-11, sets top and left margins */
    margin-top: 28.5%; /* Top margin of 28.5% */
    margin-left: 79.8%; /* Left margin of 79.8% */
}
.roadv4-11 > div:nth-child(11){ /* Eleventh child of roadv4-11, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
.roadv4-12 > div:nth-child(1){ /* First child of roadv4-12, sets top and left margins */
    margin-top: 34.5%; /* Top margin of 34.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv4-12 > div:nth-child(2){ /* Second child of roadv4-12, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 10.8%; /* Left margin of 10.8% */
}
.roadv4-12 > div:nth-child(3){ /* Third child of roadv4-12, sets top and left margins */
    margin-top: 18.5%; /* Top margin of 18.5% */
    margin-left: 24.8%; /* Left margin of 24.8% */
}
.roadv4-12 > div:nth-child(4){ /* Fourth child of roadv4-12, sets top and left margins */
    margin-top: 37.5%; /* Top margin of 37.5% */
    margin-left: 29.8%; /* Left margin of 29.8% */
}
.roadv4-12 > div:nth-child(5){ /* Fifth child of roadv4-12, sets top and left margins */
    margin-top: 28.5%; /* Top margin of 28.5% */
    margin-left: 43.8%; /* Left margin of 43.8% */
}
.roadv4-12 > div:nth-child(6){ /* Sixth child of roadv4-12, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 57.8%; /* Left margin of 57.8% */
}
.roadv4-12 > div:nth-child(7){ /* Seventh child of roadv4-12, sets top and left margins */
    margin-top: 32.5%; /* Top margin of 32.5% */
    margin-left: 59.8%; /* Left margin of 59.8% */
}
.roadv4-12 > div:nth-child(8){ /* Eighth child of roadv4-12, sets top and left margins */
    margin-top: 19.5%; /* Top margin of 19.5% */
    margin-left: 70.8%; /* Left margin of 70.8% */
}
.roadv4-12 > div:nth-child(9){ /* Ninth child of roadv4-12, sets top and left margins */
    margin-top: 0.5%; /* Top margin of 0.5% */
    margin-left: 71.8%; /* Left margin of 71.8% */
}
.roadv4-12 > div:nth-child(10){ /* Tenth child of roadv4-12, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-12 > div:nth-child(11){ /* Eleventh child of roadv4-12, sets top and left margins */
    margin-top: 27.5%; /* Top margin of 27.5% */
    margin-left: 79.8%; /* Left margin of 79.8% */
}
.roadv4-12 > div:nth-child(12){ /* Twelfth child of roadv4-12, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
.roadv4-13 > div:nth-child(1){ /* First child of roadv4-13, sets top and left margins */
    margin-top: 34.5%; /* Top margin of 34.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv4-13 > div:nth-child(2){ /* Second child of roadv4-13, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 10.8%; /* Left margin of 10.8% */
}
.roadv4-13 > div:nth-child(3){ /* Third child of roadv4-13, sets top and left margins */
    margin-top: 18.5%; /* Top margin of 18.5% */
    margin-left: 24.8%; /* Left margin of 24.8% */
}
.roadv4-13 > div:nth-child(4){ /* Fourth child of roadv4-13, sets top and left margins */
    margin-top: 37.5%; /* Top margin of 37.5% */
    margin-left: 29.8%; /* Left margin of 29.8% */
}
.roadv4-13 > div:nth-child(5){ /* Fifth child of roadv4-13, sets top and left margins */
    margin-top: 28.5%; /* Top margin of 28.5% */
    margin-left: 43.8%; /* Left margin of 43.8% */
}
.roadv4-13 > div:nth-child(6){ /* Sixth child of roadv4-13, sets top and left margins */
    margin-top: 10.5%; /* Top margin of 10.5% */
    margin-left: 50.8%; /* Left margin of 50.8% */
}
.roadv4-13 > div:nth-child(7){ /* Seventh child of roadv4-13, sets top and left margins */
    margin-top: 24.5%; /* Top margin of 24.5% */
    margin-left: 58.8%; /* Left margin of 58.8% */
}
.roadv4-13 > div:nth-child(8){ /* Eighth child of roadv4-13, sets top and left margins */
    margin-top: 35.5%; /* Top margin of 35.5% */
    margin-left: 67.8%; /* Left margin of 67.8% */
}
.roadv4-13 > div:nth-child(9){ /* Ninth child of roadv4-13, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 66.8%; /* Left margin of 66.8% */
}
.roadv4-13 > div:nth-child(10){ /* Tenth child of roadv4-13, sets top and left margins */
    margin-top: 0.5%; /* Top margin of 0.5% */
    margin-left: 71.8%; /* Left margin of 71.8% */
}
.roadv4-13 > div:nth-child(11){ /* Eleventh child of roadv4-13, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-13 > div:nth-child(12){ /* Twelfth child of roadv4-13, sets top and left margins */
    margin-top: 27.5%; /* Top margin of 27.5% */
    margin-left: 79.8%; /* Left margin of 79.8% */
}
.roadv4-13 > div:nth-child(13){ /* Thirteenth child of roadv4-13, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
.roadv4-14 > div:nth-child(1){ /* First child of roadv4-14, sets top and left margins */
    margin-top: 34.5%; /* Top margin of 34.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv4-14 > div:nth-child(2){ /* Second child of roadv4-14, sets top and left margins */
    margin-top: 21.5%; /* Top margin of 21.5% */
    margin-left: 15.8%; /* Left margin of 15.8% */
}
.roadv4-14 > div:nth-child(3){ /* Third child of roadv4-14, sets top and left margins */
    margin-top: 5.5%; /* Top margin of 5.5% */
    margin-left: 25.8%; /* Left margin of 25.8% */
}
.roadv4-14 > div:nth-child(4){ /* Fourth child of roadv4-14, sets top and left margins */
    margin-top: 26.5%; /* Top margin of 26.5% */
    margin-left: 22.8%; /* Left margin of 22.8% */
}
.roadv4-14 > div:nth-child(5){ /* Fifth child of roadv4-14, sets top and left margins */
    margin-top: 37.5%; /* Top margin of 37.5% */
    margin-left: 34.8%; /* Left margin of 34.8% */
}
.roadv4-14 > div:nth-child(6){ /* Sixth child of roadv4-14, sets top and left margins */
    margin-top: 20.5%; /* Top margin of 20.5% */
    margin-left: 41.8%; /* Left margin of 41.8% */
}
.roadv4-14 > div:nth-child(7){ /* Seventh child of roadv4-14, sets top and left margins */
    margin-top: 14.5%; /* Top margin of 14.5% */
    margin-left: 57.8%; /* Left margin of 57.8% */
}
.roadv4-14 > div:nth-child(8){ /* Eighth child of roadv4-14, sets top and left margins */
    margin-top: 30.5%; /* Top margin of 30.5% */
    margin-left: 58.8%; /* Left margin of 58.8% */
}
.roadv4-14 > div:nth-child(9){ /* Ninth child of roadv4-14, sets top and left margins */
    margin-top: 29.5%; /* Top margin of 29.5% */
    margin-left: 74.8%; /* Left margin of 74.8% */
}
.roadv4-14 > div:nth-child(10){ /* Tenth child of roadv4-14, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 65.8%; /* Left margin of 65.8% */
}
.roadv4-14 > div:nth-child(11){ /* Eleventh child of roadv4-14, sets top and left margins */
    margin-top: 3.5%; /* Top margin of 3.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-14 > div:nth-child(12){ /* Twelfth child of roadv4-14, sets top and left margins */
    margin-top: 17.5%; /* Top margin of 17.5% */
    margin-left: 78.8%; /* Left margin of 78.8% */
}
.roadv4-14 > div:nth-child(13){ /* Thirteenth child of roadv4-14, sets top and left margins */
    margin-top: 30.5%; /* Top margin of 30.5% */
    margin-left: 80.8%; /* Left margin of 80.8% */
}
.roadv4-14 > div:nth-child(14){ /* Fourteenth child of roadv4-14, sets top and left margins */
    margin-top: 36.5%; /* Top margin of 36.5% */
    margin-left: 92.8%; /* Left margin of 92.8% */
}
@media only screen and (max-width: 768px) { /* Media query for screens smaller than 768px */
    .roadv4-1 > div:nth-child(1){ /* First child of roadv4-1, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-2 > div:nth-child(1){ /* First child of roadv4-2, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-2 > div:nth-child(2){ /* Second child of roadv4-2, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-3 > div:nth-child(1){ /* First child of roadv4-3, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-3 > div:nth-child(2){ /* Second child of roadv4-3, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 48.8% !important; /* Left margin of 48.8% with !important */
    }
    .roadv4-3 > div:nth-child(3){ /* Third child of roadv4-3, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-4 > div:nth-child(1){ /* First child of roadv4-4, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-4 > div:nth-child(2){ /* Second child of roadv4-4, sets top and left margins */
        margin-top: 68.5% !important; /* Top margin of 68.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-4 > div:nth-child(3){ /* Third child of roadv4-4, sets top and left margins */
        margin-top: 139.5% !important; /* Top margin of 139.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-4 > div:nth-child(4){ /* Fourth child of roadv4-4, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-5 > div:nth-child(1){ /* First child of roadv4-5, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-5 > div:nth-child(2){ /* Second child of roadv4-5, sets top and left margins */
        margin-top: 68.5% !important; /* Top margin of 68.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-5 > div:nth-child(3){ /* Third child of roadv4-5, sets top and left margins */
        margin-top: 139.5% !important; /* Top margin of 139.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-5 > div:nth-child(4){ /* Fourth child of roadv4-5, sets top and left margins */
        margin-top: 181.5% !important; /* Top margin of 181.5% with !important */
        margin-left: 43.8% !important; /* Left margin of 43.8% with !important */
    }
    .roadv4-5 > div:nth-child(5){ /* Fifth child of roadv4-5, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-6 > div:nth-child(1){ /* First child of roadv4-6, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-6 > div:nth-child(2){ /* Second child of roadv4-6, sets top and left margins */
        margin-top: 68.5% !important; /* Top margin of 68.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-6 > div:nth-child(3){ /* Third child of roadv4-6, sets top and left margins */
        margin-top: 107.5% !important; /* Top margin of 107.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-6 > div:nth-child(4){ /* Fourth child of roadv4-6, sets top and left margins */
        margin-top: 140.5% !important; /* Top margin of 140.5% with !important */
        margin-left: 39.8% !important; /* Left margin of 39.8% with !important */
    }
    .roadv4-6 > div:nth-child(5){ /* Fifth child of roadv4-6, sets top and left margins */
        margin-top: 182.5% !important; /* Top margin of 182.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-6 > div:nth-child(6){ /* Sixth child of roadv4-6, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-7 > div:nth-child(1){ /* First child of roadv4-7, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-7 > div:nth-child(2){ /* Second child of roadv4-7, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-7 > div:nth-child(3){ /* Third child of roadv4-7, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-7 > div:nth-child(4){ /* Fourth child of roadv4-7, sets top and left margins */
        margin-top: 107.5% !important; /* Top margin of 107.5% with !important */
        margin-left: 39.8% !important; /* Left margin of 39.8% with !important */
    }
    .roadv4-7 > div:nth-child(5){ /* Fifth child of roadv4-7, sets top and left margins */
        margin-top: 165.5% !important; /* Top margin of 165.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-7 > div:nth-child(6){ /* Sixth child of roadv4-7, sets top and left margins */
        margin-top: 187.5% !important; /* Top margin of 187.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-7 > div:nth-child(7){ /* Seventh child of roadv4-7, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-8 > div:nth-child(1){ /* First child of roadv4-8, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-8 > div:nth-child(2){ /* Second child of roadv4-8, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-8 > div:nth-child(3){ /* Third child of roadv4-8, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-8 > div:nth-child(4){ /* Fourth child of roadv4-8, sets top and left margins */
        margin-top: 107.5% !important; /* Top margin of 107.5% with !important */
        margin-left: 39.8% !important; /* Left margin of 39.8% with !important */
    }
    .roadv4-8 > div:nth-child(5){ /* Fifth child of roadv4-8, sets top and left margins */
        margin-top: 165.5% !important; /* Top margin of 165.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-8 > div:nth-child(6){ /* Sixth child of roadv4-8, sets top and left margins */
        margin-top: 183.5% !important; /* Top margin of 183.5% with !important */
        margin-left: 61.8% !important; /* Left margin of 61.8% with !important */
    }
    .roadv4-8 > div:nth-child(7){ /* Seventh child of roadv4-8, sets top and left margins */
        margin-top: 187.5% !important; /* Top margin of 187.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-8 > div:nth-child(8){ /* Eighth child of roadv4-8, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-9 > div:nth-child(1){ /* First child of roadv4-9, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-9 > div:nth-child(2){ /* Second child of roadv4-9, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-9 > div:nth-child(3){ /* Third child of roadv4-9, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-9 > div:nth-child(4){ /* Fourth child of roadv4-9, sets top and left margins */
        margin-top: 107.5% !important; /* Top margin of 107.5% with !important */
        margin-left: 39.8% !important; /* Left margin of 39.8% with !important */
    }
    .roadv4-9 > div:nth-child(5){ /* Fifth child of roadv4-9, sets top and left margins */
        margin-top: 139.5% !important; /* Top margin of 139.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-9 > div:nth-child(6){ /* Sixth child of roadv4-9, sets top and left margins */
        margin-top: 166.5% !important; /* Top margin of 166.5% with !important */
        margin-left: 42.8% !important; /* Left margin of 42.8% with !important */
    }
    .roadv4-9 > div:nth-child(7){ /* Seventh child of roadv4-9, sets top and left margins */
        margin-top: 180.5% !important; /* Top margin of 180.5% with !important */
        margin-left: 77.8% !important; /* Left margin of 77.8% with !important */
    }
    .roadv4-9 > div:nth-child(8){ /* Eighth child of roadv4-9, sets top and left margins */
        margin-top: 194.5% !important; /* Top margin of 194.5% with !important */
        margin-left: 11.8% !important; /* Left margin of 11.8% with !important */
    }
    .roadv4-9 > div:nth-child(9){ /* Ninth child of roadv4-9, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-10 > div:nth-child(1){ /* First child of roadv4-10, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-10 > div:nth-child(2){ /* Second child of roadv4-10, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-10 > div:nth-child(3){ /* Third child of roadv4-10, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-10 > div:nth-child(4){ /* Fourth child of roadv4-10, sets top and left margins */
        margin-top: 86.5% !important; /* Top margin of 86.5% with !important */
        margin-left: 4.8% !important; /* Left margin of 4.8% with !important */
    }
    .roadv4-10 > div:nth-child(5){ /* Fifth child of roadv4-10, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-10 > div:nth-child(6){ /* Sixth child of roadv4-10, sets top and left margins */
        margin-top: 138.5% !important; /* Top margin of 138.5% with !important */
        margin-left: 42.8% !important; /* Left margin of 42.8% with !important */
    }
    .roadv4-10 > div:nth-child(7){ /* Seventh child of roadv4-10, sets top and left margins */
        margin-top: 167.5% !important; /* Top margin of 167.5% with !important */
        margin-left: 15.8% !important; /* Left margin of 15.8% with !important */
    }
    .roadv4-10 > div:nth-child(8){ /* Eighth child of roadv4-10, sets top and left margins */
        margin-top: 168.5% !important; /* Top margin of 168.5% with !important */
        margin-left: 80.8% !important; /* Left margin of 80.8% with !important */
    }
    .roadv4-10 > div:nth-child(9){ /* Ninth child of roadv4-10, sets top and left margins */
        margin-top: 180.5% !important; /* Top margin of 180.5% with !important */
        margin-left: 43.8% !important; /* Left margin of 43.8% with !important */
    }
    .roadv4-10 > div:nth-child(10){ /* Tenth child of roadv4-10, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-11 > div:nth-child(1){ /* First child of roadv4-11, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-11 > div:nth-child(2){ /* Second child of roadv4-11, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-11 > div:nth-child(3){ /* Third child of roadv4-11, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-11 > div:nth-child(4){ /* Fourth child of roadv4-11, sets top and left margins */
        margin-top: 86.5% !important; /* Top margin of 86.5% with !important */
        margin-left: 4.8% !important; /* Left margin of 4.8% with !important */
    }
    .roadv4-11 > div:nth-child(5){ /* Fifth child of roadv4-11, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 41.8% !important; /* Left margin of 41.8% with !important */
    }
    .roadv4-11 > div:nth-child(6){ /* Sixth child of roadv4-11, sets top and left margins */
        margin-top: 138.5% !important; /* Top margin of 138.5% with !important */
        margin-left: 42.8% !important; /* Left margin of 42.8% with !important */
    }
    .roadv4-11 > div:nth-child(7){ /* Seventh child of roadv4-11, sets top and left margins */
        margin-top: 167.5% !important; /* Top margin of 167.5% with !important */
        margin-left: 15.8% !important; /* Left margin of 15.8% with !important */
    }
    .roadv4-11 > div:nth-child(8){ /* Eighth child of roadv4-11, sets top and left margins */
        margin-top: 168.5% !important; /* Top margin of 168.5% with !important */
        margin-left: 80.8% !important; /* Left margin of 80.8% with !important */
    }
    .roadv4-11 > div:nth-child(9){ /* Ninth child of roadv4-11, sets top and left margins */
        margin-top: 180.5% !important; /* Top margin of 180.5% with !important */
        margin-left: 43.8% !important; /* Left margin of 43.8% with !important */
    }
    .roadv4-11 > div:nth-child(10){ /* Tenth child of roadv4-11, sets top and left margins */
        margin-top: 197.5% !important; /* Top margin of 197.5% with !important */
        margin-left: 9.8% !important; /* Left margin of 9.8% with !important */
    }
    .roadv4-11 > div:nth-child(11){ /* Eleventh child of roadv4-11, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-12 > div:nth-child(1){ /* First child of roadv4-12, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-12 > div:nth-child(2){ /* Second child of roadv4-12, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-12 > div:nth-child(3){ /* Third child of roadv4-12, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-12 > div:nth-child(4){ /* Fourth child of roadv4-12, sets top and left margins */
        margin-top: 86.5% !important; /* Top margin of 86.5% with !important */
        margin-left: 4.8% !important; /* Left margin of 4.8% with !important */
    }
    .roadv4-12 > div:nth-child(5){ /* Fifth child of roadv4-12, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 26.8% !important; /* Left margin of 26.8% with !important */
    }
    .roadv4-12 > div:nth-child(6){ /* Sixth child of roadv4-12, sets top and left margins */
        margin-top: 126.5% !important; /* Top margin of 126.5% with !important */
        margin-left: 58.8% !important; /* Left margin of 58.8% with !important */
    }
    .roadv4-12 > div:nth-child(7){ /* Seventh child of roadv4-12, sets top and left margins */
        margin-top: 142.5% !important; /* Top margin of 142.5% with !important */
        margin-left: 15.8% !important; /* Left margin of 15.8% with !important */
    }
    .roadv4-12 > div:nth-child(8){ /* Eighth child of roadv4-12, sets top and left margins */
        margin-top: 158.5% !important; /* Top margin of 158.5% with !important */
        margin-left: 49.8% !important; /* Left margin of 49.8% with !important */
    }
    .roadv4-12 > div:nth-child(9){ /* Ninth child of roadv4-12, sets top and left margins */
        margin-top: 177.5% !important; /* Top margin of 177.5% with !important */
        margin-left: 79.8% !important; /* Left margin of 79.8% with !important */
    }
    .roadv4-12 > div:nth-child(10){ /* Tenth child of roadv4-12, sets top and left margins */
        margin-top: 182.5% !important; /* Top margin of 182.5% with !important */
        margin-left: 30.8% !important; /* Left margin of 30.8% with !important */
    }
    .roadv4-12 > div:nth-child(11){ /* Eleventh child of roadv4-12, sets top and left margins */
        margin-top: 201.5% !important; /* Top margin of 201.5% with !important */
        margin-left: 8.8% !important; /* Left margin of 8.8% with !important */
    }
    .roadv4-12 > div:nth-child(12){ /* Twelfth child of roadv4-12, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-13 > div:nth-child(1){ /* First child of roadv4-13, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-13 > div:nth-child(2){ /* Second child of roadv4-13, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-13 > div:nth-child(3){ /* Third child of roadv4-13, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-13 > div:nth-child(4){ /* Fourth child of roadv4-13, sets top and left margins */
        margin-top: 86.5% !important; /* Top margin of 86.5% with !important */
        margin-left: 4.8% !important; /* Left margin of 4.8% with !important */
    }
    .roadv4-13 > div:nth-child(5){ /* Fifth child of roadv4-13, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 26.8% !important; /* Left margin of 26.8% with !important */
    }
    .roadv4-13 > div:nth-child(6){ /* Sixth child of roadv4-13, sets top and left margins */
        margin-top: 126.5% !important; /* Top margin of 126.5% with !important */
        margin-left: 58.8% !important; /* Left margin of 58.8% with !important */
    }
    .roadv4-13 > div:nth-child(7){ /* Seventh child of roadv4-13, sets top and left margins */
        margin-top: 142.5% !important; /* Top margin of 142.5% with !important */
        margin-left: 15.8% !important; /* Left margin of 15.8% with !important */
    }
    .roadv4-13 > div:nth-child(8){ /* Eighth child of roadv4-13, sets top and left margins */
        margin-top: 170.5% !important; /* Top margin of 170.5% with !important */
        margin-left: 22.8% !important; /* Left margin of 22.8% with !important */
    }
    .roadv4-13 > div:nth-child(9){ /* Ninth child of roadv4-13, sets top and left margins */
        margin-top: 155.5% !important; /* Top margin of 155.5% with !important */
        margin-left: 55.8% !important; /* Left margin of 55.8% with !important */
    }
    .roadv4-13 > div:nth-child(10){ /* Tenth child of roadv4-13, sets top and left margins */
        margin-top: 175.5% !important; /* Top margin of 175.5% with !important */
        margin-left: 79.8% !important; /* Left margin of 79.8% with !important */
    }
    .roadv4-13 > div:nth-child(11){ /* Eleventh child of roadv4-13, sets top and left margins */
        margin-top: 182.5% !important; /* Top margin of 182.5% with !important */
        margin-left: 44.8% !important; /* Left margin of 44.8% with !important */
    }
    .roadv4-13 > div:nth-child(12){ /* Twelfth child of roadv4-13, sets top and left margins */
        margin-top: 192.5% !important; /* Top margin of 192.5% with !important */
        margin-left: 11.8% !important; /* Left margin of 11.8% with !important */
    }
    .roadv4-13 > div:nth-child(13){ /* Thirteenth child of roadv4-13, sets top and left margins */
        margin-top: 230.5% !important; /* Top margin of 230.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-14 > div:nth-child(1){ /* First child of roadv4-14, sets top and left margins */
        margin-top: 7.5% !important; /* Top margin of 7.5% with !important */
        margin-left: 19.8% !important; /* Left margin of 19.8% with !important */
    }
    .roadv4-14 > div:nth-child(2){ /* Second child of roadv4-14, sets top and left margins */
        margin-top: 50.5% !important; /* Top margin of 50.5% with !important */
        margin-left: 35.8% !important; /* Left margin of 35.8% with !important */
    }
    .roadv4-14 > div:nth-child(3){ /* Third child of roadv4-14, sets top and left margins */
        margin-top: 69.5% !important; /* Top margin of 69.5% with !important */
        margin-left: 38.8% !important; /* Left margin of 38.8% with !important */
    }
    .roadv4-14 > div:nth-child(4){ /* Fourth child of roadv4-14, sets top and left margins */
        margin-top: 86.5% !important; /* Top margin of 86.5% with !important */
        margin-left: 4.8% !important; /* Left margin of 4.8% with !important */
    }
    .roadv4-14 > div:nth-child(5){ /* Fifth child of roadv4-14, sets top and left margins */
        margin-top: 106.5% !important; /* Top margin of 106.5% with !important */
        margin-left: 26.8% !important; /* Left margin of 26.8% with !important */
    }
    .roadv4-14 > div:nth-child(6){ /* Sixth child of roadv4-14, sets top and left margins */
        margin-top: 137.5% !important; /* Top margin of 137.5% with !important */
        margin-left: 51.8% !important; /* Left margin of 51.8% with !important */
    }
    .roadv4-14 > div:nth-child(7){ /* Seventh child of roadv4-14, sets top and left margins */
        margin-top: 142.5% !important; /* Top margin of 142.5% with !important */
        margin-left: 15.8% !important; /* Left margin of 15.8% with !important */
    }
    .roadv4-14 > div:nth-child(8){ /* Eighth child of roadv4-14, sets top and left margins */
        margin-top: 170.5% !important; /* Top margin of 170.5% with !important */
        margin-left: 22.8% !important; /* Left margin of 22.8% with !important */
    }
    .roadv4-14 > div:nth-child(9){ /* Ninth child of roadv4-14, sets top and left margins */
        margin-top: 155.5% !important; /* Top margin of 155.5% with !important */
        margin-left: 55.8% !important; /* Left margin of 55.8% with !important */
    }
    .roadv4-14 > div:nth-child(10){ /* Tenth child of roadv4-14, sets top and left margins */
        margin-top: 175.5% !important; /* Top margin of 175.5% with !important */
        margin-left: 79.8% !important; /* Left margin of 79.8% with !important */
    }
    .roadv4-14 > div:nth-child(11){ /* Eleventh child of roadv4-14, sets top and left margins */
        margin-top: 182.5% !important; /* Top margin of 182.5% with !important */
        margin-left: 44.8% !important; /* Left margin of 44.8% with !important */
    }
    .roadv4-14 > div:nth-child(12){ /* Twelfth child of roadv4-14, sets top and left margins */
        margin-top: 192.5% !important; /* Top margin of 192.5% with !important */
        margin-left: 11.8% !important; /* Left margin of 11.8% with !important */
    }
    .roadv4-14 > div:nth-child(13){ /* Thirteenth child of roadv4-14, sets top and left margins */
        margin-top: 212.5% !important; /* Top margin of 212.5% with !important */
        margin-left: 8.8% !important; /* Left margin of 8.8% with !important */
    }
    .roadv4-14 > div:nth-child(14){ /* Fourteenth child of roadv4-14, sets top and left margins */
        margin-top: 233.5% !important; /* Top margin of 233.5% with !important */
        margin-left: 27.8% !important; /* Left margin of 27.8% with !important */
    }
    .roadv5-1 > div:nth-child(1){ /* First child of roadv5-1, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-2 > div:nth-child(1){ /* First child of roadv5-2, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-2 > div:nth-child(2){ /* Second child of roadv5-2, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
    .roadv5-3 > div:nth-child(1){ /* First child of roadv5-3, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-3 > div:nth-child(2){ /* Second child of roadv5-3, sets top and left margins */
        margin-top: 115.9% !important; /* Top margin of 115.9% with !important */
        margin-left: 60.9% !important; /* Left margin of 60.9% with !important */
    }
    .roadv5-3 > div:nth-child(3){ /* Third child of roadv5-3, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
    .roadv5-4 > div:nth-child(1){ /* First child of roadv5-4, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-4 > div:nth-child(2){ /* Second child of roadv5-4, sets top and left margins */
        margin-top: 82.9% !important; /* Top margin of 82.9% with !important */
        margin-left: 5% !important; /* Left margin of 5% with !important */
    }
    .roadv5-4 > div:nth-child(3){ /* Third child of roadv5-4, sets top and left margins */
        margin-top: 150.9% !important; /* Top margin of 150.9% with !important */
        margin-left: 10.9% !important; /* Left margin of 10.9% with !important */
    }
    .roadv5-4 > div:nth-child(4){ /* Fourth child of roadv5-4, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
    .roadv5-5 > div:nth-child(1){ /* First child of roadv5-5, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-5 > div:nth-child(2){ /* Second child of roadv5-5, sets top and left margins */
        margin-top: 82.9% !important; /* Top margin of 82.9% with !important */
        margin-left: 5% !important; /* Left margin of 5% with !important */
    }
    .roadv5-5 > div:nth-child(3){ /* Third child of roadv5-5, sets top and left margins */
        margin-top: 115.9% !important; /* Top margin of 115.9% with !important */
        margin-left: 60.9% !important; /* Left margin of 60.9% with !important */
    }
    .roadv5-5 > div:nth-child(4){ /* Fourth child of roadv5-5, sets top and left margins */
        margin-top: 150.9% !important; /* Top margin of 150.9% with !important */
        margin-left: 10.9% !important; /* Left margin of 10.9% with !important */
    }
    .roadv5-5 > div:nth-child(5){ /* Fifth child of roadv5-5, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
    .roadv5-6 > div:nth-child(1){ /* First child of roadv5-6, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-6 > div:nth-child(2){ /* Second child of roadv5-6, sets top and left margins */
        margin-top: 52.5% !important; /* Top margin of 52.5% with !important */
        margin-left: 78.9% !important; /* Left margin of 78.9% with !important */
    }
    .roadv5-6 > div:nth-child(3){ /* Third child of roadv5-6, sets top and left margins */
        margin-top: 82.9% !important; /* Top margin of 82.9% with !important */
        margin-left: 5% !important; /* Left margin of 5% with !important */
    }
    .roadv5-6 > div:nth-child(4){ /* Fourth child of roadv5-6, sets top and left margins */
        margin-top: 115.9% !important; /* Top margin of 115.9% with !important */
        margin-left: 60.9% !important; /* Left margin of 60.9% with !important */
    }
    .roadv5-6 > div:nth-child(5){ /* Fifth child of roadv5-6, sets top and left margins */
        margin-top: 150.9% !important; /* Top margin of 150.9% with !important */
        margin-left: 10.9% !important; /* Left margin of 10.9% with !important */
    }
    .roadv5-6 > div:nth-child(6){ /* Sixth child of roadv5-6, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
    .roadv5-7 > div:nth-child(1){ /* First child of roadv5-7, sets top and left margins */
        margin-top: 6% !important; /* Top margin of 6% with !important */
        margin-left: 16.8% !important; /* Left margin of 16.8% with !important */
    }
    .roadv5-7 > div:nth-child(2){ /* Second child of roadv5-7, sets top and left margins */
        margin-top: 52.5% !important; /* Top margin of 52.5% with !important */
        margin-left: 78.9% !important; /* Left margin of 78.9% with !important */
    }
    .roadv5-7 > div:nth-child(3){ /* Third child of roadv5-7, sets top and left margins */
        margin-top: 82.9% !important; /* Top margin of 82.9% with !important */
        margin-left: 5% !important; /* Left margin of 5% with !important */
    }
    .roadv5-7 > div:nth-child(4){ /* Fourth child of roadv5-7, sets top and left margins */
        margin-top: 115.9% !important; /* Top margin of 115.9% with !important */
        margin-left: 60.9% !important; /* Left margin of 60.9% with !important */
    }
    .roadv5-7 > div:nth-child(5){ /* Fifth child of roadv5-7, sets top and left margins */
        margin-top: 150.9% !important; /* Top margin of 150.9% with !important */
        margin-left: 10.9% !important; /* Left margin of 10.9% with !important */
    }
    .roadv5-7 > div:nth-child(6){ /* Sixth child of roadv5-7, sets top and left margins */
        margin-top: 160.6% !important; /* Top margin of 160.6% with !important */
        margin-left: 83.2% !important; /* Left margin of 83.2% with !important */
    }
    .roadv5-7 > div:nth-child(7){ /* Seventh child of roadv5-7, sets top and left margins */
        margin-top: 205% !important; /* Top margin of 205% with !important */
        margin-left: 7.8% !important; /* Left margin of 7.8% with !important */
    }
}
.roadv2-1 > div:nth-child(1){ /* First child of roadv2-1, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-2 > div:nth-child(1){ /* First child of roadv2-2, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-2 > div:nth-child(2){ /* Second child of roadv2-2, sets top and left margins */
    margin-top: 1.1%; /* Top margin of 1.1% */
    margin-left: 95.1%; /* Left margin of 95.1% */
}
.roadv2-3 > div:nth-child(1){ /* First child of roadv2-3, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-3 > div:nth-child(2){ /* Second child of roadv2-3, sets top and left margins */
    margin-top: 12.4%; /* Top margin of 12.4% */
    margin-left: 47.8%; /* Left margin of 47.8% */
}
.roadv2-3 > div:nth-child(3){ /* Third child of roadv2-3, sets top and left margins */
    margin-top: 1.1%; /* Top margin of 1.1% */
    margin-left: 95.1%; /* Left margin of 95.1% */
}
.roadv2-4 > div:nth-child(1){ /* First child of roadv2-4, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-4 > div:nth-child(2){ /* Second child of roadv2-4, sets top and left margins */
    margin-top: 7.5%; /* Top margin of 7.5% */
    margin-left: 33.6%; /* Left margin of 33.6% */
}
.roadv2-4 > div:nth-child(3){ /* Third child of roadv2-4, sets top and left margins */
    margin-top: 2%; /* Top margin of 2% */
    margin-left: 61.5%; /* Left margin of 61.5% */
}
.roadv2-4 > div:nth-child(4){ /* Fourth child of roadv2-4, sets top and left margins */
    margin-top: 1.1%; /* Top margin of 1.1% */
    margin-left: 95.1%; /* Left margin of 95.1% */
}
.roadv2-5 > div:nth-child(1){ /* First child of roadv2-5, sets top and left margins */
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-5 > div:nth-child(2){ /* Second child of roadv2-5, sets top and left margins */
    margin-top: 8.1%; /* Top margin of 8.1% */
    margin-left: 25.3%; /* Left margin of 25.3% */
}
.roadv2-5 > div:nth-child(3){ /* Third child of roadv2-5, sets top and left margins */
    margin-top: 12.4%; /* Top margin of 12.4% */
    margin-left: 47.8%; /* Left margin of 47.8% */
}
.roadv2-5 > div:nth-child(4) {
    margin-top: 2%; /* Top margin for spacing */
    margin-left: 61.5%; /* Left margin for positioning */
}
.roadv2-5 > div:nth-child(5) {
    margin-top: 6.6%; /* Top margin for spacing */
    margin-left: 85.6%; /* Left margin for positioning */
}
.roadv2-6 > div:nth-child(1) {
    margin-top: 12.5%; /* Top margin of 12.5% */
    margin-left: 0.8%; /* Left margin of 0.8% */
}
.roadv2-6 > div:nth-child(2) {
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-6 > div:nth-child(3) {
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-6 > div:nth-child(4) {
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-6 > div:nth-child(5) {
    margin-top: 2%; /* Top margin for spacing */
    margin-left: 61.5%; /* Left margin for positioning */
}
.roadv2-6 > div:nth-child(6) {
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(1){ /* First child of roadv2-7 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(2){ /* Second child of roadv2-7 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(3){ /* Third child of roadv2-7 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(4){ /* Fourth child of roadv2-7 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(5){ /* Fifth child of roadv2-7 */
    margin-top: 2%; /* Top margin for spacing */
    margin-left: 61.5%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(6){ /* Sixth child of roadv2-7 */
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-7 > div:nth-child(7){ /* Seventh child of roadv2-7 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(1){ /* First child of roadv2-8 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(2){ /* Second child of roadv2-8 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(3){ /* Third child of roadv2-8 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(4){ /* Fourth child of roadv2-8 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(5){ /* Fifth child of roadv2-8 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(6){ /* Sixth child of roadv2-8 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(7){ /* Seventh child of roadv2-8 */
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-8 > div:nth-child(8){ /* Eighth child of roadv2-8 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(1){ /* First child of roadv2-9 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(2){ /* Second child of roadv2-9 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 11.8%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(3){ /* Third child of roadv2-9 */
    margin-top: 9.6%; /* Top margin for spacing */
    margin-left: 21.6%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(4){ /* Fourth child of roadv2-9 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(5){ /* Fifth child of roadv2-9 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(6){ /* Sixth child of roadv2-9 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(7){ /* Seventh child of roadv2-9 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(8){ /* Eighth child of roadv2-9 */
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-9 > div:nth-child(9){ /* Ninth child of roadv2-9 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(1){ /* First child of roadv2-10 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(2){ /* Second child of roadv2-10 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 11.8%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(3){ /* Third child of roadv2-10 */
    margin-top: 9.6%; /* Top margin for spacing */
    margin-left: 21.6%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(4){ /* Fourth child of roadv2-10 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(5){ /* Fifth child of roadv2-10 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(6){ /* Sixth child of roadv2-10 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(7){ /* Seventh child of roadv2-10 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(8){ /* Eighth child of roadv2-10 */
    margin-top: 7.8%; /* Top margin for spacing */
    margin-left: 78.1%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(9){ /* Ninth child of roadv2-10 */
    margin-top: 5.7%; /* Top margin for spacing */
    margin-left: 86.4%; /* Left margin for positioning */
}
.roadv2-10 > div:nth-child(10){ /* Tenth child of roadv2-10 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(1){ /* First child of roadv2-11 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(2){ /* Second child of roadv2-11 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 9.3%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(3){ /* Third child of roadv2-11 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 19.3%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(4){ /* Fourth child of roadv2-11 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 28%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(5){ /* Fifth child of roadv2-11 */
    margin-top: 7.9%; /* Top margin for spacing */
    margin-left: 37.4%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(6){ /* Sixth child of roadv2-11 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 46.9%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(7){ /* Seventh child of roadv2-11 */
    margin-top: 1.4%; /* Top margin for spacing */
    margin-left: 52.8%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(8){ /* Eighth child of roadv2-11 */
    margin-top: 3.9%; /* Top margin for spacing */
    margin-left: 64.3%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(9){ /* Ninth child of roadv2-11 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 75.1%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(10){ /* Tenth child of roadv2-11 */
    margin-top: 6%; /* Top margin for spacing */
    margin-left: 85.2%; /* Left margin for positioning */
}
.roadv2-11 > div:nth-child(11){ /* Eleventh child of roadv2-11 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(1){ /* First child of roadv2-12 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(2){ /* Second child of roadv2-12 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 9.3%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(3){ /* Third child of roadv2-12 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(4){ /* Fourth child of roadv2-12 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 25.3%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(5){ /* Fifth child of roadv2-12 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(6){ /* Sixth child of roadv2-12 */
    margin-top: 9.8%; /* Top margin for spacing */
    margin-left: 40.9%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(7){ /* Seventh child of roadv2-12 */
    margin-top: 8.4%; /* Top margin for spacing */
    margin-left: 51%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(8){ /* Eighth child of roadv2-12 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(9){ /* Ninth child of roadv2-12 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(10){ /* Tenth child of roadv2-12 */
    margin-top: 7.7%; /* Top margin for spacing */
    margin-left: 77.8%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(11){ /* Eleventh child of roadv2-12 */
    margin-top: 5.7%; /* Top margin for spacing */
    margin-left: 86.4%; /* Left margin for positioning */
}
.roadv2-12 > div:nth-child(12){ /* Twelfth child of roadv2-12 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(1){ /* First child of roadv2-13 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(2){ /* Second child of roadv2-13 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 9.3%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(3){ /* Third child of roadv2-13 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(4){ /* Fourth child of roadv2-13 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 25.3%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(5){ /* Fifth child of roadv2-13 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(6){ /* Sixth child of roadv2-13 */
    margin-top: 9.8%; /* Top margin for spacing */
    margin-left: 40.9%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(7){ /* Seventh child of roadv2-13 */
    margin-top: 8.4%; /* Top margin for spacing */
    margin-left: 50.8%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(8){ /* Eighth child of roadv2-13 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 55%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(9){ /* Ninth child of roadv2-13 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(10){ /* Tenth child of roadv2-13 */
    margin-top: 7.6%; /* Top margin for spacing */
    margin-left: 74%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(11){ /* Eleventh child of roadv2-13 */
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(12){ /* Twelfth child of roadv2-13 */
    margin-top: 4.5%; /* Top margin for spacing */
    margin-left: 88.7%; /* Left margin for positioning */
}
.roadv2-13 > div:nth-child(13){ /* Thirteenth child of roadv2-13 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(1){ /* First child of roadv2-14 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(2){ /* Second child of roadv2-14 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 9.3%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(3){ /* Third child of roadv2-14 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(4){ /* Fourth child of roadv2-14 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 25.3%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(5){ /* Fifth child of roadv2-14 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(6){ /* Sixth child of roadv2-14 */
    margin-top: 9.8%; /* Top margin for spacing */
    margin-left: 40.9%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(7){ /* Seventh child of roadv2-14 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(8){ /* Eighth child of roadv2-14 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 51.1%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(9){ /* Ninth child of roadv2-14 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(10){ /* Tenth child of roadv2-14 */
    margin-top: 2%; /* Top margin for spacing */
    margin-left: 61.5%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(11){ /* Eleventh child of roadv2-14 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(12){ /* Twelfth child of roadv2-14 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 76%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(13){ /* Thirteenth child of roadv2-14 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 85.8%; /* Left margin for positioning */
}
.roadv2-14 > div:nth-child(14){ /* Fourteenth child of roadv2-14 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(1){ /* First child of roadv2-15 */
    margin-top: 12.5%; /* Top margin for spacing */
    margin-left: 0.8%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(2){ /* Second child of roadv2-15 */
    margin-top: 12.8%; /* Top margin for spacing */
    margin-left: 9.3%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(3){ /* Third child of roadv2-15 */
    margin-top: 10.4%; /* Top margin for spacing */
    margin-left: 17.7%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(4){ /* Fourth child of roadv2-15 */
    margin-top: 8.1%; /* Top margin for spacing */
    margin-left: 25.3%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(5){ /* Fifth child of roadv2-15 */
    margin-top: 7.5%; /* Top margin for spacing */
    margin-left: 33.6%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(6){ /* Sixth child of roadv2-15 */
    margin-top: 9.8%; /* Top margin for spacing */
    margin-left: 40.9%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(7){ /* Seventh child of roadv2-15 */
    margin-top: 12.4%; /* Top margin for spacing */
    margin-left: 47.8%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(8){ /* Eighth child of roadv2-15 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 51.1%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(9){ /* Ninth child of roadv2-15 */
    margin-top: 0.5%; /* Top margin for spacing */
    margin-left: 54.1%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(10){ /* Tenth child of roadv2-15 */
    margin-top: 2%; /* Top margin for spacing */
    margin-left: 61.5%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(11){ /* Eleventh child of roadv2-15 */
    margin-top: 5.9%; /* Top margin for spacing */
    margin-left: 66.6%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(12){ /* Twelfth child of roadv2-15 */
    margin-top: 7.6%; /* Top margin for spacing */
    margin-left: 74%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(13){ /* Thirteenth child of roadv2-15 */
    margin-top: 6.8%; /* Top margin for spacing */
    margin-left: 81.6%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(14){ /* Fourteenth child of roadv2-15 */
    margin-top: 4.5%; /* Top margin for spacing */
    margin-left: 88.7%; /* Left margin for positioning */
}
.roadv2-15 > div:nth-child(15){ /* Fifteenth child of roadv2-15 */
    margin-top: 1.1%; /* Top margin for spacing */
    margin-left: 95.1%; /* Left margin for positioning */
}
.img-background{ /* Class for background image with animation */
    animation: imgOpacity .3s 1 ease-in-out; /* Animation for fading in */
}
@keyframes imgOpacity { /* Keyframes for image opacity animation */
    from{
        opacity: 0; /* Start fully transparent */
    }
    to{
        opacity: 1; /* End fully opaque */
    }
}
div.container-award-detail::-webkit-scrollbar{ /* Custom scrollbar for award detail container */
    background-color: rgba(0, 0, 0, 0) !important; /* Transparent background */
}
div.container-award-detail::-webkit-scrollbar-thumb{ /* Custom scrollbar thumb for award detail container */
    border-radius: 10px !important; /* Rounded corners */
}
div.container-cards-img::-webkit-scrollbar-thumb { /* Hide scrollbar thumb for cards image container */
    display: none !important; /* No display */
}
::-webkit-scrollbar { /* Global scrollbar styles */
    height: 0px; /* No height */
    width: 5px; /* Width of scrollbar */
    background-color: #299ABDff; /* Background color */
}
.img-animation{ /* Class for image animation */
    animation: animation-transform 4s infinite alternate-reverse ease-in-out; /* Animation for vertical movement */
}
@keyframes animation-transform { /* Keyframes for image transform animation */
    from {transform: translateY(-7px)} /* Start position */
    to {transform: translateY(7px)} /* End position */
}
.button-submit{ /* Class for submit button */
    position: relative; /* Relative positioning for child elements */
    box-shadow: 0px 6px 0px #00000038, inset 0px -5px 0px #00000038; /* Shadow effects */
}
.button-submit::after{ /* Pseudo-element for submit button */
    content: ""; /* Empty content */
    position: absolute; /* Absolute positioning */
    width: 70%; /* Width of the pseudo-element */
    height: 7%; /* Height of the pseudo-element */
    background-color: rgba(255, 255, 255, 0.51); /* Semi-transparent background */
    border-radius: 9999px; /* Fully rounded corners */
    top: 8%; /* Position from the top */
    left: 15%; /* Position from the left */
    right: 0; /* Position from the right */
    bottom: 0; /* Position from the bottom */
}
.button-submit-v2::after{ /* Pseudo-element for version 2 of submit button */
    content: ''; /* Empty content */
    width: 111%; /* Width of the pseudo-element */
    height: 134%; /* Height of the pseudo-element */
    position: absolute; /* Absolute positioning */
    top: 50%; /* Centered vertically */
    left: 50%; /* Centered horizontally */
    transform: translate(-50%, -50%); /* Centering transformation */
    border-radius: 7px; /* Rounded corners */
    border: 1px solid transparent; /* Transparent border */
    z-index: 20; /* Layering order */
}
.arrow{ /* Class for arrow animation */
    animation: arrow 2s ease-in-out infinite alternate-reverse; /* Animation for horizontal movement */
}
@keyframes arrow { /* Keyframes for arrow animation */
    0% {
        transform: translateX(0px); /* Start position */
    }
    100% {
        transform: translateX(20px); /* End position */
    }
}
.flash{ /* Class for flash animation */
    animation: flash 2s ease-in-out infinite; /* Animation for flashing effect */
}
@keyframes flash { /* Keyframes for flash animation */
    0%{
        opacity: 0; /* Start fully transparent */
        transform: scale(0); /* Start scaled down */
    }
    50%{
        opacity: 1; /* Midway fully opaque */
        transform: scale(1); /* Midway normal size */
    }
    100%{
        opacity: 0; /* End fully transparent */
        transform: scale(0); /* End scaled down */
    }
}
.flash-2{ /* Class for second flash animation */
    animation: flash2 2.6s ease-in-out infinite; /* Animation for flashing effect */
}
@keyframes flash2 { /* Keyframes for second flash animation */
    0%{
        opacity: 0; /* Start fully transparent */
        transform: scale(0); /* Start scaled down */
    }
    50%{
        opacity: 1; /* Midway fully opaque */
        transform: scale(1); /* Midway normal size */
    }
    100%{
        opacity: 0; /* End fully transparent */
        transform: scale(0); /* End scaled down */
    }
}
div.maps:nth-child(1) .checkpoint-maps.Ecuabet .img-maps img{ /* First map image adjustments */
    margin-left: -27% !important; /* Adjust left margin */
    margin-top: 4% !important; /* Adjust top margin */
}
div.maps:nth-child(2) .checkpoint-maps.Ecuabet .img-maps img{ /* Second map image adjustments */
    margin-left: 33% !important; /* Adjust left margin */
    margin-top: 21% !important; /* Adjust top margin */
}
div.maps:nth-child(3) .checkpoint-maps.Ecuabet .img-maps img{ /* Third map image adjustments */
    margin-left: -27% !important; /* Adjust left margin */
    margin-top: 35% !important; /* Adjust top margin */
}
@media only screen and (max-width: 700px) { /* Media query for small screens */
    div.maps:nth-child(1) .checkpoint-maps.Ecuabet .img-maps img { /* First map image adjustments for small screens */
        margin-left: -61% !important; /* Adjust left margin */
        margin-top: 70% !important; /* Adjust top margin */
        width: 26% !important; /* Adjust width */
    }
    div.maps:nth-child(2) .checkpoint-maps.Ecuabet .img-maps img { /* Second map image adjustments for small screens */
        margin-left: -72% !important; /* Adjust left margin */
        margin-top: 94% !important; /* Adjust top margin */
        width: 22% !important; /* Adjust width */
    }
    div.maps:nth-child(3) .checkpoint-maps.Ecuabet .img-maps img { /* Third map image adjustments for small screens */
        margin-left: -56% !important; /* Adjust left margin */
        margin-top: 134% !important; /* Adjust top margin */
        width: 24% !important; /* Adjust width */
    }
}
div.maps:nth-child(1) .checkpoint-maps .img-maps img{ /* First map image adjustments */
    margin-left: -78% !important; /* Adjust left margin */
    margin-top: 7% !important; /* Adjust top margin */
}
div.maps:nth-child(2) .checkpoint-maps .img-maps img{ /* Second map image adjustments */
    margin-left: -19% !important; /* Adjust left margin */
    margin-top: 4% !important; /* Adjust top margin */
}
div.maps:nth-child(3) .checkpoint-maps .img-maps img{ /* Third map image adjustments */
    margin-left: -15% !important; /* Adjust left margin */
    margin-top: 31% !important; /* Adjust top margin */
}
div.maps:nth-child(4) .checkpoint-maps .img-maps img{ /* Fourth map image adjustments */
    margin-left: 35% !important; /* Adjust left margin */
    margin-top: 3% !important; /* Adjust top margin */
}
@media only screen and (max-width: 700px) { /* Media query for small screens */
    div.maps:nth-child(1) .checkpoint-maps .img-maps img { /* First map image adjustments for small screens */
        margin-left: -53% !important; /* Adjust left margin */
        margin-top: 53% !important; /* Adjust top margin */
        width: 26% !important; /* Adjust width */
    }
    div.maps:nth-child(2) .checkpoint-maps .img-maps img { /* Second map image adjustments for small screens */
        margin-left: -67% !important; /* Adjust left margin */
        margin-top: 88% !important; /* Adjust top margin */
        width: 22% !important; /* Adjust width */
    }
    div.maps:nth-child(3) .checkpoint-maps .img-maps img { /* Third map image adjustments for small screens */
        margin-left: -56% !important; /* Adjust left margin */
        margin-top: 134% !important; /* Adjust top margin */
        width: 24% !important; /* Adjust width */
    }
    div.maps:nth-child(4) .checkpoint-maps .img-maps img { /* Fourth map image adjustments for small screens */
        margin-left: 57% !important; /* Adjust left margin */
        margin-top: 123% !important; /* Adjust top margin */
        width: 21% !important; /* Adjust width */
    }
}
.img-test{ /* Class for test image animation */
    animation: test 1s infinite; /* Animation for continuous effect */
}
.img-testa{ /* Class for test image animation version A */
    animation: test 2.5s infinite; /* Animation for continuous effect */
}
@keyframes test { /* Keyframes for test animation */
    0%{
        opacity: 0; /* Start fully transparent */
        transform: scale(0); /* Start scaled down */
    }
    50% {
        opacity: 1; /* Midway fully opaque */
        transform: scale(2); /* Midway scaled up */
    }
    100%{
        opacity: 0; /* End fully transparent */
        transform: scale(0); /* End scaled down */
    }
}
@keyframes test2 { /* Keyframes for second test animation */
    0%{
        opacity: 0; /* Start fully transparent */
        transform: scale(0); /* Start scaled down */
    }
    50% {
        opacity: 1; /* Midway fully opaque */
        transform: scale(2); /* Midway scaled up */
    }
    100%{
        opacity: 0; /* End fully transparent */
        transform: scale(0); /* End scaled down */
    }
}
@media screen and (max-width: 500px) { /* Media query for very small screens */
    .torneos-p1, .torneos-p2, .torneos-p3{ /* Tournament sections */
        height: 75px; /* Fixed height */
    }
}
@media (max-width: 810px) { /* Media query for small to medium screens */
    .tournament-box select { /* Select box in tournament box */
        width: calc(100% - 20px) !important; /* Full width minus padding */
    }
    .info-terms{ /* Information terms section */
        width: 136px !important; /* Fixed width */
        max-width:136px !important; /* Max width */
    }
    .button-more{ /* More button */
        display: block !important; /* Force display */
    }
}
.container-filter{ /* Container for filters */
    /*height: 34px;}*/ /* Height commented out */
    .filter{ /* Filter button styles */
        display: inline-block; /* Inline display */
        /*background: rgba(0, 0, 0, 0.9);*/ /* Background commented out */
        padding: 6px 0px; /* Padding for spacing */
        border-radius: 5px; /* Rounded corners */
        /*float: right;*/ /* Float commented out */
        /*border: 1px solid #ffffff73;*/ /* Border commented out */
        font-size: 13px; /* Font size */
        width: 50%; /* Width of filter */
        padding: 20px 0px 10px 0; /* Padding for spacing */
    }
    span.filters-section { /* Filter section styles */
        width: calc(100%/2); /* Half width */
        display: inline-block; /* Inline display */
    }
    strong{ /* Strong text styles */
        padding-left: 0; /* No left padding */
        padding-left: 0; /* No left padding */
        padding: 10px 10px; /* Padding for spacing */
        display: inline-block; /* Inline display */
        font-size: 14px; /* Font size */
    }
    span.filters-section:last-child { /* Last filter section styles */
        padding-left: 10px; /* Left padding */
    }
    select{ /* Select box styles */
        padding: 5px 6px; /* Padding for spacing */
        border-radius: 3px; /* Rounded corners */
        color: grey; /* Text color */
        width: calc(100% - 80px); /* Width calculation */
        display: inline-block; /* Inline display */
        float: right; /* Float to the right */
        height: 35px; /* Fixed height */
    }
    label { /* Label styles */
        padding-right: 8px; /* Right padding */
    }
    .filters-section strong { /* Strong text in filter section */
        color: black; /* Text color */
    }
    .container-tournaments { /* Container for tournaments */
        margin: 0 auto; /* Center alignment */
        max-width: 1200px; /* Max width */
        color: white; /* Text color */
        padding: 0 5px; /* Padding for spacing */
        min-height: 432px; /* Minimum height */
    }
    .container-tournaments div::-webkit-scrollbar-track, .container-tournaments p::-webkit-scrollbar-track { /* Scrollbar track styles */
        border-radius: 10px; /* Rounded corners */
        background-color: none; /* No background color */
    }
    .container-tournaments div::-webkit-scrollbar, .container-tournaments p::-webkit-scrollbar { /* Scrollbar styles */
        width: 6px; /* Width of scrollbar */
        background-color: none; /* No background color */
        height: 6px; /* Height of scrollbar */
    }
    .container-tournaments div::-webkit-scrollbar-thumb, .container-tournaments p::-webkit-scrollbar-thumb { /* Scrollbar thumb styles */
        border-radius: 10px; /* Rounded corners */
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* Inner shadow */
        background-color: #555; /* Thumb color */
    }
    .container-tournaments > div { /* Child div in tournaments container */
        padding-bottom: 10px; /* Bottom padding */
    }
    .container-tournaments .more-details { /* More details popup */
        position: absolute; /* Absolute positioning */
        background: white; /* Background color */
        color: black; /* Text color */
        height: auto; /* Auto height */
        padding: 20px 25px; /* Padding for spacing */
        border-radius: 5px; /* Rounded corners */
        z-index: 20; /* Layering order */
        width: 1200px; /* Fixed width */
        animation: popup-enter .3s ease-in-out; /* Animation for entering */
        margin-top: 10px; /* Top margin */
    }
    .container-tournaments .more-details h3 { /* Heading in more details */
        font-size: 14px; /* Font size */
        padding-bottom: 10px; /* Bottom padding */
    }
    .container-tournaments .more-details .close { /* Close button in more details */
        position: absolute; /* Absolute positioning */
        top: 0; /* Top position */
        right: 0; /* Right position */
        padding: 14px; /* Padding for spacing */
        border-bottom: none; /* No bottom border */
        font-weight: bold; /* Bold text */
    }
    .container-tournaments .more-details:before { /* Arrow before more details */
        content: ""; /* Empty content */
        position: absolute; /* Absolute positioning */
        top: -10px; /* Top position */
        left: 28px; /* Left position */
        width: 0; /* No width */
        height: 0; /* No height */
        border-width: 0 15px 15px; /* Triangle shape */
        border-style: solid; /* Solid border */
        border-color: transparent transparent white; /* Triangle color */
    }
    .container-tournaments .more-details > div { /* Child div in more details */
        display: inline-block; /* Inline display */
        vertical-align: top; /* Align to top */
        padding: 16px 5px; /* Padding for spacing */
        margin-bottom: 10px; /* Bottom margin */
    }
    .container-tournaments .more-details .complet-descrip { /* Complete description section */
        width: calc(76% - 10px); /* Width calculation */
    }
    .container-tournaments .more-details .complet-descrip > div { /* Child div in complete description */
        margin-bottom: 10px; /* Bottom margin */
        padding-bottom: 10px; /* Bottom padding */
    }
    .container-tournaments .more-details .complet-descrip .awards img { /* Image in awards section */
        width: auto; /* Auto width */
        height: auto; /* Auto height */
        max-height: 80px; /* Max height */
    }
    .container-tournaments .more-details .complet-descrip .text { /* Text section in complete description */
        padding: 16px 18px; /* Padding for spacing */
        background: #f7f7f7; /* Background color */
        border-radius: 5px; /* Rounded corners */
        max-height: 300px; /* Max height */
        overflow-y: auto; /* Scroll if overflow */
    }
    .container-tournaments .more-details .complet-descrip .text h3 { /* Heading in text section */
        font-size: 20px; /* Font size */
    }
    .container-tournaments .more-details .complet-descrip .awards { /* Awards section */
        background: #f7f7f7; /* Background color */
        border-radius: 5px; /* Rounded corners */
        margin-bottom: 10px; /* Bottom margin */
        padding: 16px 18px; /* Padding for spacing */
        width: calc(50% - 36px); /* Width calculation */
    }
    .container-tournaments .more-details .complet-descrip .awards h3 { /* Heading in awards section */
        background: #000000; /* Background color */
        color: white; /* Text color */
        position: relative; /* Relative positioning */
        top: -15px; /* Position adjustment */
        padding: 7px 18px; /* Padding for spacing */
        border-radius: 5px 5px 0 0; /* Rounded top corners */
        left: -17px; /* Position adjustment */
        width: calc(100% + 36px); /* Width calculation */
        margin: 0; /* No margin */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain .moneda { /* Currency style in awards */
        border: 2px solid black; /* Border style */
        border-radius: 0 0 5px 5px; /* Rounded bottom corners */
        font-weight: bold; /* Bold text */
        border-top: 0; /* No top border */
        display: inline-block; /* Inline display */
        padding: 3px 10px; /* Padding for spacing */
        position: relative; /* Relative positioning */
        left: -17px; /* Position adjustment */
        top: -15px; /* Position adjustment */
        margin-right: -2px; /* Right margin adjustment */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain td, .container-tournaments .more-details .complet-descrip .awards .awards-contain th { /* Table cell styles in awards */
        border-right: 1px solid #d1d1d1; /* Right border */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain table { /* Table in awards section */
        border-collapse: collapse; /* Collapse borders */
        width: 100%; /* Full width */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain th { /* Table header styles in awards */
        text-align: left; /* Left alignment */
        padding: 4px 15px; /* Padding for spacing */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain th:last-child { /* Last table header styles in awards */
        border-right: none; /* No right border */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain td { /* Table cell styles in awards */
        padding: 4px 15px; /* Padding for spacing */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain td:last-child { /* Last table cell styles in awards */
        border-right: none; /* No right border */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain tr td:first-child { /* First cell in row */
        width: 46px; /* Fixed width */
    }
    .container-tournaments .more-details .complet-descrip .awards .awards-contain tr td:nth-child(2) { /* Second cell in row */
        width: 176px; /* Fixed width */
    }
    .container-tournaments .more-details .right { /* Right section in more details */
        width: calc(23% - 2px); /* Width calculation */
    }
    .container-tournaments .more-details .right .visibility > div { /* Visibility section in right */
        padding: 7px 13px; /* Padding for spacing */
        background: #e4e4e4; /* Background color */
        color: #cecece; /* Text color */
        display: inline-block; /* Inline display */
        width: calc(100% / 2 - 28px); /* Width calculation */
        border-radius: 2px; /* Rounded corners */
        font-weight: bold; /* Bold text */
        text-align: center; /* Centered text */
    }
    .container-tournaments .more-details .right .visibility > div.vip { /* VIP visibility section */
        background: #b48303; /* Background color */
        color: white; /* Text color */
    }
    .container-tournaments .more-details .right .convertion h3 { /* Heading in conversion section */
        background: #000000; /* Background color */
        color: white; /* Text color */
        position: relative; /* Relative positioning */
        top: -15px; /* Position adjustment */
        padding: 7px 18px; /* Padding for spacing */
        border-radius: 5px 5px 0 0; /* Rounded top corners */
        width: 226px; /* Fixed width */
        left: -17px; /* Position adjustment */
        margin: 0; /* No margin */
    }
    .container-tournaments .more-details .right .convertion-contain .moneda { /* Currency style in conversion */
        border: 2px solid black; /* Border style */
        border-radius: 0 0 5px 5px; /* Rounded bottom corners */
        font-weight: bold; /* Bold text */
        border-top: 0; /* No top border */
        display: inline-block; /* Inline display */
        padding: 3px 10px; /* Padding for spacing */
        position: relative; /* Relative positioning */
        left: -17px; /* Position adjustment */
        top: -15px; /* Position adjustment */
        margin-right: -2px; /* Right margin adjustment */
    }
    .container-tournaments .more-details .right .convertion-contain td, .container-tournaments .more-details .right .convertion-contain th { /* Table cell styles in conversion */
        border-right: 1px solid #d1d1d1; /* Right border */
    }

    /* Container for tournament details */
    .container-tournaments .more-details .right .convertion-contain table {
        border-collapse: collapse; /* Ensures borders are collapsed */
        width: 100%; /* Full width of the container */
    }

    /* Header cells in the conversion table */
    .container-tournaments .more-details .right .convertion-contain th {
        text-align: left; /* Aligns text to the left */
        padding: 4px 15px; /* Padding for header cells */
    }

    /* Removes right border from the last header cell */
    .container-tournaments .more-details .right .convertion-contain th:last-child {
        border-right: none; /* No right border for the last header */
    }

    /* Data cells in the conversion table */
    .container-tournaments .more-details .right .convertion-contain td {
        padding: 4px 15px; /* Padding for data cells */
    }

    /* Removes right border from the last data cell */
    .container-tournaments .more-details .right .convertion-contain td:last-child {
        border-right: none; /* No right border for the last data cell */
    }

    /* Join button styling */
    .container-tournaments .more-details .right .join {
        font-size: 28px; /* Font size for the button */
        font-weight: bold; /* Bold text */
        border-radius: 6px; /* Rounded corners */
        padding: 5px 12px 4px; /* Padding for the button */
        transition: .5s; /* Smooth transition for hover effects */
        color: white; /* Text color */
        text-align: center; /* Centered text */
        background: #b48303; /* Background color */
    }

    /* Hover effect for the join button */
    .container-tournaments .more-details .right .join:hover {
        color: white; /* Text color on hover */
        background: #f4b001; /* Background color on hover */
    }

    /* Disabled state for the join button */
    .container-tournaments .more-details .right .join.disabled {
        background: #f1f1f1; /* Background color for disabled state */
    }

    /* Disabled state hover effect for the join button */
    .container-tournaments .more-details .right .join.disabled:hover {
        background: #f1f1f1; /* No change on hover when disabled */
    }

    /* Styling for the container holding tournament details */
    .container-tournaments .more-details .right > div {
        background: #f7f7f7; /* Light background color */
        border-radius: 5px; /* Rounded corners */
        margin-bottom: 10px; /* Space below the container */
        padding: 16px 18px; /* Padding inside the container */
    }

    /* List of tournaments styling */
    .container-tournaments .list-tournaments {
        width: 100%; /* Full width of the container */
        background: white; /* White background */
        border-radius: 5px; /* Rounded corners */
        padding: 10px 22px; /* Padding for the list */
        color: black; /* Text color */
    }

    /* Hover effect for tournament list items */
    .container-tournaments .list-tournaments:hover {
        background: white; /* Background remains white */
        border-bottom: 1px solid #b48303; /* Bottom border on hover */
        border-radius: 5px; /* Maintain rounded corners */
    }

    /* Flexbox styling for tournament list items */
    .container-tournaments .list-tournaments > div {
        display: inline-block; /* Inline block for flex layout */
        vertical-align: top; /* Aligns items to the top */
    }

    /* Tournament title styling */
    .container-tournaments .list-tournaments .tournament-title {
        font-size: 18px; /* Font size for the title */
        height: 35px; /* Fixed height */
        font-weight: bold; /* Bold text */
        padding-left: 10px; /* Left padding */
        line-height: 2.4; /* Line height for spacing */
    }

    /* VIP label before the tournament title */
    .container-tournaments .list-tournaments .tournament-title.vip:before {
        content: "VIP"; /* Content for VIP label */
        display: inline-block; /* Inline block for layout */
        color: #ffffff; /* White text color */
        background: #991eae; /* Background color for VIP label */
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.6); /* Shadow effect */
        position: relative; /* Relative positioning */
        height: 10px; /* Fixed height */
        font: 8px/11px Arial, Helvetica, sans-serif; /* Font styling */
        padding: 0 2px; /* Padding for the label */
        border-radius: 3px 0px 3px 0px; /* Rounded corners */
        top: 5px; /* Positioning from the top */
        box-sizing: border-box; /* Box sizing model */
        left: 4px; /* Positioning from the left */
        float: right; /* Float to the right */
    }

    /* Tournament logo styling */
    .container-tournaments .list-tournaments .tournament-logo {
        width: 45px; /* Fixed width */
        height: 35px; /* Fixed height */
    }

    /* Container for time left until the tournament starts */
    .container-tournaments .list-tournaments .timeleft-container {
        float: right; /* Float to the right */
    }

    /* Time left display styling */
    .container-tournaments .list-tournaments .timeleft-container .timeleft {
        padding-left: 20px; /* Left padding */
        font-size: 24px; /* Font size for time left */
        border-left: 1px solid black; /* Left border */
        width: 190px; /* Fixed width */
    }

    /* Time display styling */
    .container-tournaments .list-tournaments .timeleft-container .timeleft .time {
        height: 26px; /* Fixed height */
        font-weight: bold; /* Bold text */
    }

    /* Title styling for time left */
    .container-tournaments .list-tournaments .timeleft-container .timeleft .tittle {
        font-size: 9px; /* Font size for title */
        line-height: 10px; /* Line height for spacing */
    }

    /* Styling for title divs within time left */
    .container-tournaments .list-tournaments .timeleft-container .timeleft .tittle div {
        width: calc(100% / 4); /* Equal width for four items */
        font-size: 9px; /* Font size */
        display: inline-block; /* Inline block for layout */
        text-align: center; /* Centered text */
        margin-right: -1.9px; /* Negative margin for spacing */
    }

    /* Finish time styling */
    .container-tournaments .list-tournaments .timeleft-container .finish {
        font-size: 13px; /* Font size for finish time */
        line-height: 2.9; /* Line height for spacing */
        padding-right: 20px; /* Right padding */
    }

    .container-tournaments .list-tournaments .timeleft-container > div {
        float: right;
        height: 35px;
    }

    /* Container for buttons in the tournament list */
    .container-tournaments .list-tournaments .buttom {
        float: right; /* Float to the right */
        font-size: 21px; /* Font size for button */
        font-weight: bold; /* Bold text */
        border: 1px solid black; /* Border styling */
        border-radius: 6px; /* Rounded corners */
        padding: 7px 12px 6px; /* Padding for button */
        transition: .5s; /* Smooth transition for hover effects */
        margin-left: 20px; /* Left margin */
        width: auto; /* Automatic width */
        text-align: center; /* Centered text */
    }

    /* Hover effect for buttons */
    .container-tournaments .list-tournaments .buttom:hover {
        color: black; /* Text color on hover */
        background: white; /* Background color on hover */
    }

    /* VIP button hover effect */
    .container-tournaments .list-tournaments .buttom.vip:hover {
        color: white; /* Text color for VIP button on hover */
        background: #991eae; /* Background color for VIP button on hover */
        border-color: #991eae; /* Border color for VIP button on hover */
    }

    /* Details tournament container styling */
    .container-tournaments .details-tournament {
        animation: popup-enter .3s ease-in-out; /* Animation for entering */
        width: 100%; /* Full width */
        height: auto; /* Automatic height */
        color: white; /* Text color */
        margin-top: 10px; /* Top margin */
        position: relative; /* Relative positioning */
        display: inline-block; /* Inline block for layout */
    }

    /* Inner div styling for details tournament */
    .container-tournaments .details-tournament > div {
        backdrop-filter: blur(25px); /* Background blur effect */
        border-radius: 5px; /* Rounded corners */
        display: inline-block; /* Inline block for layout */
        vertical-align: top; /* Aligns items to the top */
        height: auto; /* Automatic height */
        min-height: 265px; /* Minimum height */
        padding: 3px 18px; /* Padding for inner div */
    }

    /* Description container styling */
    .container-tournaments .details-tournament .description-container {
        width: 100%; /* Full width */
        min-height: 502px; /* Minimum height */
    }

    /* Description content container */
    .container-tournaments .details-tournament .description-container .desc-contain {
        height: auto; /* Automatic height */
    }

    /* Inner divs for description content */
    .container-tournaments .details-tournament .description-container .desc-contain > div {
        display: inline-block; /* Inline block for layout */
        vertical-align: top; /* Aligns items to the top */
    }

    /* Text container within description */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container {
        padding-left: 10px; /* Left padding */
        height: auto; /* Automatic height */
        width: calc(74% - 5px); /* Width calculation */
    }

    /* Text styling within text container */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .text {
        width: 100%; /* Full width */
    }

    /* Heading styling within text */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .text h3 {
        font-size: 16px; /* Font size for heading */
        padding: 0 0 10px 0px; /* Padding for heading */
    }

    /* Paragraph styling within text */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .text p {
        height: 39px; /* Fixed height */
        overflow-y: auto; /* Vertical overflow handling */
    }

    /* Rules label styling */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .text .rules {
        background: white; /* White background */
        color: black; /* Black text color */
        padding: 5px 10px; /* Padding for rules label */
        margin: 8px 0; /* Margin for spacing */
        font-weight: bold; /* Bold text */
        max-width: 105px; /* Maximum width */
    }

    /* Hover effect for rules label */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .text .rules:hover {
        background: #d8d8d8; /* Background color on hover */
    }

    /* Games list styling */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .games-list {
        border: 1px solid #3d517d; /* Border styling */
        border-radius: 5px; /* Rounded corners */
        padding: 5px 8px 4px; /* Padding for games list */
        position: relative; /* Relative positioning */
        padding-left: 25px; /* Left padding */
    }

    /* Carousel styling within games list */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .games-list #carousel {
        width: 100%; /* Full width */
        height: 100px; /* Fixed height */
        background-color: none; /* No background color */
        overflow-x: scroll; /* Horizontal scrolling */
        overflow-y: hidden; /* No vertical scrolling */
        white-space: nowrap; /* Prevent line breaks */
    }

    /* Image styling within carousel */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .games-list #carousel img {
        height: 90px; /* Fixed height for images */
        padding: 0 4px; /* Padding for images */
    }

    /* Slide styling within carousel */
    .container-tournaments .details-tournament .description-container .desc-contain .text-container .games-list #carousel .slide {
        display: inline-block; /* Inline block for layout */
    }

    /* Image container styling */
    .container-tournaments .details-tournament .description-container .desc-contain .image {
        width: 25%; /* Fixed width */
        display: inline-block; /* Inline block for layout */
    }

    /* Wrapper styling for details tournament */
    .container-tournaments .details-tournament .description-container .desc-contain .wrapper {
        background: #EFEFEF; /* Light gray background */
        box-shadow: 1px 1px 10px #999; /* Shadow effect */
        margin: auto; /* Centered margin */
        text-align: center; /* Centered text */
        position: relative; /* Relative positioning */
        border-radius: 5px; /* Rounded corners */
        margin-bottom: 20px !important; /* Bottom margin */
        width: 800px; /* Fixed width */
        padding-top: 5px; /* Top padding */
    }

    /* Scrollable area styling */
    .container-tournaments .details-tournament .description-container .desc-contain .scrolls {
        overflow-x: scroll; /* Horizontal scrolling */
        overflow-y: hidden; /* No vertical scrolling */
        height: 80px; /* Fixed height */
        white-space: nowrap; /* Prevent line breaks */
    }

    /* Ranking container styling */
    .container-tournaments .details-tournament .ranking-container {
        width: 255px; /* Fixed width */
        min-width: 255px; /* Minimum width */
    }

    /* Title styling for ranking container */
    .container-tournaments .details-tournament .ranking-container .tittle {
        padding-bottom: 5px; /* Bottom padding */
        background: #b48303; /* Background color */
        position: relative; /* Relative positioning */
        top: -16px; /* Positioning from the top */
        padding: 8px 15px; /* Padding for title */
        width: calc(100% + 36px); /* Width calculation */
        left: -18px; /* Positioning from the left */
        border-radius: 5px 5px 0 0; /* Rounded corners */
        font-size: 14px; /* Font size for title */
    }

    /* Arrow styling for title */
    .container-tournaments .details-tournament .ranking-container .tittle:after {
        content: ""; /* Empty content for arrow */
        position: absolute; /* Absolute positioning */
        left: auto; /* Default left positioning */
        right: 0; /* Positioning to the right */
        bottom: 0; /* Positioning to the bottom */
        width: 0px; /* No width */
        height: 0; /* No height */
        border-bottom: 8px solid #545454; /* Arrow styling */
        border-left: 226px solid transparent; /* Transparent left border */
    }

    /* Ranking content styling */
    .container-tournaments .details-tournament .ranking-container .ranking-contain {
        overflow-y: auto; /* Vertical scrolling */
        max-height: 178px; /* Maximum height */
        font-size: 12px; /* Font size for ranking */
    }

    /* Border styling for ranking table cells */
    .container-tournaments .details-tournament .ranking-container .ranking-contain td, .container-tournaments .details-tournament .ranking-container .ranking-contain th {
        border-right: 1px solid #ffffff4a; /* Right border styling */
    }

    /* Ranking table styling */
    .container-tournaments .details-tournament .ranking-container .ranking-contain table {
        border-collapse: collapse; /* Ensures borders are collapsed */
        width: 100%; /* Full width of the container */
    }

    /* Header cells in the ranking table */
    .container-tournaments .details-tournament .ranking-container .ranking-contain th {
        text-align: left; /* Aligns text to the left */
        padding: 4px 15px; /* Padding for header cells */
    }

    /* Removes right border from the last header cell in ranking */
    .container-tournaments .details-tournament .ranking-container .ranking-contain th:last-child {
        border-right: none; /* No right border for the last header */
    }

    /* Data cells in the ranking table */
    .container-tournaments .details-tournament .ranking-container .ranking-contain td {
        padding: 4px 15px; /* Padding for data cells */
    }

    /* Removes right border from the last data cell in ranking */
    .container-tournaments .details-tournament .ranking-container .ranking-contain td:last-child {
        border-right: none; /* No right border for the last data cell */
    }

    /* Current position styling in ranking */
    .container-tournaments .details-tournament .ranking-container .current-position {
        position: relative; /* Relative positioning */
        width: calc(100% + 36px); /* Width calculation */
        left: -18px; /* Positioning from the left */
        padding-top: 2px; /* Top padding */
    }

    /* Border styling for current position table cells */
    .container-tournaments .details-tournament .ranking-container .current-position td, .container-tournaments .details-tournament .ranking-container .current-position th {
        border-right: 1px solid #2f2f2f; /* Right border styling */
    }

    /* Current position table styling */
    .container-tournaments .details-tournament .ranking-container .current-position {
        border-collapse: collapse; /* Ensures borders are collapsed */
        width: 100%; /* Full width */
        background: #505050; /* Background color */
        font-weight: bold; /* Bold text */
        border-radius: 0 0 5px 5px; /* Rounded corners */
    }

    /* Header cells in the current position table */
    .container-tournaments .details-tournament .ranking-container .current-position th {
        text-align: left; /* Aligns text to the left */
        padding: 4px 15px; /* Padding for header cells */
    }

    /* Removes right border from the last header cell in current position */
    .container-tournaments .details-tournament .ranking-container .current-position th:last-child {
        border-right: none; /* No right border for the last header */
    }

    /* Data cells in the current position table */
    .container-tournaments .details-tournament .ranking-container .current-position td {
        padding: 4px 15px; /* Padding for data cells */
    }

    /* Removes right border from the last data cell in current position */
    .container-tournaments .details-tournament .ranking-container .current-position td:last-child {
        border-right: none; /* No right border for the last data cell */
    }

    /* First cell styling in current position */
    .container-tournaments .details-tournament .ranking-container .current-position tr td:first-child {
        width: 21.2px; /* Fixed width */
        padding-left: 33px; /* Left padding */
    }

    /* Second cell styling in current position */
    .container-tournaments .details-tournament .ranking-container .current-position tr td:nth-child(2) {
        width: 65px; /* Fixed width */
    }

    /* Hides second navigation block in specific containers */
    .conteiner.show-fix .second-nav-block, .conteiner.show-game .second-nav-block {
        display: none; /* Hides the element */
    }

    /* Table color for awards and conversion */
    .awards-contain table, .convertion-contain table {
        color: black; /* Text color */
    }

    /* Pointer cursor for clickable elements */
    .container-tournaments .more-details .close, .container-tournaments .list-tournaments, .rules, .container-tournaments .more-details .right .convertion-contain .moneda, .container-tournaments .more-details .complet-descrip .awards .awards-contain .moneda, .container-tournaments .more-details .right .join, .container-tournaments .list-tournaments .buttom {
        cursor: pointer; /* Pointer cursor for clickable elements */
    }

    /* Keyframes for background popup enter animation */
    @keyframes popup-bg-enter {
        0% {
            display: none; /* Hidden at start */
            opacity: 0; /* Fully transparent */
        }
        1% {
            display: block; /* Visible */
            opacity: 0; /* Still transparent */
        }
        100% {
            opacity: 1; /* Fully opaque */
        }
    }

    /* Keyframes for background popup close animation */
    @keyframes popup-bg-closed {
        0% {
            display: block !important; /* Visible */
            opacity: 1; /* Fully opaque */
        }
        1% {
            display: block; /* Still visible */
            opacity: 1; /* Still opaque */
        }
        100% {
            opacity: 0; /* Fully transparent */
            display: none !important; /* Hidden */
        }
    }

    /* Keyframes for popup enter animation */
    @keyframes popup-enter {
        0% {
            display: none; /* Hidden at start */
            opacity: 0; /* Fully transparent */
        }
        1% {
            display: block; /* Visible */
            opacity: 0; /* Still transparent */
            transform: scale(0); /* Scaled down */
        }
        100% {
            opacity: 1; /* Fully opaque */
            transform: scale(1); /* Normal scale */
        }
    }

    /* Keyframes for popup close animation */
    @keyframes popup-closed {
        0% {
            display: block !important; /* Visible */
            opacity: 1; /* Fully opaque */
        }
        1% {
            display: block; /* Still visible */
            opacity: 1; /* Still opaque */
            transform: scale(1); /* Normal scale */
        }
        100% {
            opacity: 0; /* Fully transparent */
            transform: scale(0); /* Scaled down */
            display: none !important; /* Hidden */
        }
    }

    /* General styling for tournaments */
    body .torneos {
    }

    /* Hides icon in the container title */
    .container-tournaments .list-tournaments .container-title i {
        display: none; /* Hidden icon */
    }

    /* Expand button container styling */
    .container-tournaments .list-tournaments .container-expand {
        float: right; /* Float to the right */
    }

    /* Expand button icon styling */
    .container-tournaments .list-tournaments .container-expand i {
        height: 26px; /* Fixed height */
        padding-top: 7px; /* Top padding */
        padding-left: 5px; /* Left padding */
    }

    /* Media query for responsive design */
    @media screen and (max-width: 730px) {
        .container-tournaments .list-tournaments {
            height: 74px !important; /* Fixed height */
        }
        .container-tournaments .list-tournaments .timeleft-container {
            margin: 5px 0; /* Margin for spacing */
        }
        .container-tournaments .list-tournaments .buttom {
            font-size: 18px !important; /* Font size for button */
            margin-left: 0px !important; /* No left margin */
        }
        .container-tournaments .list-tournaments .tournament-logo {
            display: none; /* Hide tournament logo */
        }
        .container-tournaments .list-tournaments .tournament-title {
            padding-left: 0px !important; /* No left padding */
            overflow: hidden; /* Hide overflow */
            width: calc(100% - 85px); /* Width calculation */
            height: 72px; /* Fixed height */
            display: inline-block; /* Inline block for layout */
        }
        .container-tournaments .list-tournaments .container-title {
            width: 100%; /* Full width */
        }
        .container-tournaments .list-tournaments .container-title i {
            float: right; /* Float to the right */
            display: inline-block; /* Inline block for layout */
        }
        .container-tournaments .list-tournaments .container-expand {
            display: none; /* Hide expand button */
        }
    }

    /* Media query for responsive design */
    @media screen and (max-width: 768px) {
        .container-tournaments .details-tournament .description-container {
            width: 100% !important; /* Full width */
            min-height: 502px; /* Minimum height */
            height: auto !important; /* Automatic height */
        }
        .container-tournaments .details-tournament .ranking-container {
            width: 100% !important; /* Full width */
            margin: 10px 0; /* Margin for spacing */
        }
        .container-tournaments .details-tournament .description-container .desc-contain .image {
            width: 100% !important; /* Full width */
            height: auto !important; /* Automatic height */
        }
        .container-tournaments .details-tournament .description-container .desc-contain .text-container {
            padding-left: 0px !important; /* No left padding */
            width: 100% !important; /* Full width */
        }
        .container-tournaments .details-tournament .description-container .desc-contain .text-container .text {
            margin: 10px 0; /* Margin for spacing */
        }
        .container-tournaments .details-tournament .description-container .desc-contain .text-container .text p {
            height: auto !important; /* Automatic height */
        }
        .container-tournaments .more-details .complet-descrip {
            width: 100% !important; /* Full width */
        }
        .container-tournaments .more-details .right {
            width: calc(100% - 10px) !important; /* Width calculation */
            padding: 0 5px !important; /* Padding */
        }
        .container-tournaments .more-details .right .convertion h3 {
            width: calc(100% + 36px) !important; /* Width calculation */
        }
        .container-tournaments .more-details > div {
            padding-bottom: 0 !important; /* No bottom padding */
        }
        .container-tournaments .more-details .complet-descrip .awards {
            width: 100% !important; /* Full width */
            margin-bottom: 0 !important; /* No bottom margin */
        }
    }

    /* Media query for responsive design */
    @media screen and (min-width: 769px) and (max-width: 980px) {
        .container-tournaments .details-tournament .description-container {
            width: 100%; /* Full width */
        }
    }

    /* Media query for responsive design */
    @media screen and (max-width: 1220px) {
        .container-tournaments .more-details {
            width: calc(100% - 50px) !important; /* Width calculation */
        }
        .container-tournaments .details-tournament {
            height: auto !important; /* Automatic height */
        }
    }

    /* Media query for responsive design */
    @media screen and (min-width: 769px) and (max-width: 1220px) {
        .container-tournaments .more-details .complet-descrip {
            width: calc(100% - 290px) !important; /* Width calculation */
        }
        .container-tournaments .more-details .right {
            min-width: 260px; /* Minimum width */
        }
    }

    /* Media query for responsive design */
    @media screen and (max-width: 768px) {
        .container-filter .filter {
            width: 98%; /* Width for filter */
        }
        .container-tournaments .details-tournament .description-container {
            width: 100%; /* Full width */
        }
        .container-tournaments .details-tournament .ranking-container {
            width: 100%; /* Full width */
            margin: 10px 0; /* Margin for spacing */
        }
        .container-tournaments .more-details .complet-descrip .awards {
            width: 100%; /* Full width */
        }
        .tournaments .more-details .complet-descrip {
            width: 100% !important; /* Full width */
        }
        .container-tournaments .more-details .right {
            width: 100% !important; /* Full width */
            padding: 0 5px !important; /* Padding */
        }
        .container-tournaments .more-details .right .convertion h3 {
            width: calc(100% + 36px); /* Width calculation */
        }
    }

    /* Media query for responsive design */
    @media screen and (max-width: 1000px) {
        .container-tournaments .list-tournaments {
            height: 93px !important; /* Fixed height */
        }
    }

    /* Media query for responsive design */
    @media screen and (max-width: 750px) {
        .container-tournaments .list-tournaments {
            height: 174px !important; /* Fixed height */
        }
    }

    /* General styling for info page */
    .Framework.InfoPage {
        background: transparent; /* Transparent background */
    }

    /* Padding reset for first cell in ranking */
    .container-tournaments .details-tournament .ranking-container .ranking-contain th:first-child {
        padding: 0; /* No padding */
    }

    /* Padding reset for first cell in ranking */
    .container-tournaments .details-tournament .ranking-container .ranking-contain td:first-child {
        padding: 0; /* No padding */
    }

    /* Overflow handling for ranking container */
    .container-tournaments .details-tournament .ranking-container .ranking-contain {
        overflow-x: hidden; /* No horizontal scrolling */
    }

    /* Padding for ranking table cells */
    .container-tournaments .details-tournament .ranking-container .ranking-contain td {
        padding: 4px 10px; /* Padding for cells */
    }

    /* Styling for select elements in tournament box */
    .tournament-box select, .tournament-box select.FormInput {
        margin: 0 10px; /* Margin for spacing */
        max-width: 100%; /* Maximum width */
        width: 100%; /* Full width */
        color: #9c9da8; /* Text color */
        background-color: white; /* White background */
        height: 40px; /* Fixed height */
    }

    /* Hides strong element after title */
    .SimplePageTitle strong:after {
        display: none; /* Hidden element */
    }

    /* Strong element styling in title */
    .tournament-box .SimplePageTitle strong {
        color: black; /* Black text color */
    }

    /* Right menu styling */
    span#menuRight {
        width: 25px; /* Fixed width */
        padding: 45px 0; /* Padding for spacing */
        background: #262a3a; /* Background color */
        color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
        position: absolute; /* Absolute positioning */
        right: 0; /* Positioning to the right */
        display: block; /* Block display */
        z-index: 10; /* Z-index for stacking */
        height: 100%; /* Full height */
        margin-top: -5px; /* Negative margin */
        vertical-align: middle; /* Vertical alignment */
        background: -webkit-linear-gradient(90deg, rgb(20, 21, 24) 1%, rgb(42, 45, 58) 48%, rgb(17, 18, 23) 100%) !important; /* Gradient background */
        cursor: pointer; /* Pointer cursor */
    }

    /* Left menu styling */
    span#menuLeft {
        float: left; /* Float to the left */
        width: 25px; /* Fixed width */
        padding: 45px 0; /* Padding for spacing */
        background: #262a3a; /* Background color */
        color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
        position: absolute; /* Absolute positioning */
        left: 0; /* Positioning to the left */
        display: block; /* Block display */
        z-index: 1; /* Z-index for stacking */
        margin-top: -5px; /* Negative margin */
        height: 100%; /* Full height */
        background: -webkit-linear-gradient(90deg, rgb(20, 21, 24) 1%, rgb(42, 45, 58) 48%, rgb(17, 18, 23) 100%) !important; /* Gradient background */
        cursor: pointer; /* Pointer cursor */
    }

    /* Preloader animation styling */
    .torneos-preloader {
        -webkit-animation: pulset 3s infinite ease-in-out; /* Animation for preloader */
        -o-animation: pulst2 3s infinite ease-in-out; /* Animation for preloader */
        -ms-animation: pulset 3s infinite ease-in-out; /* Animation for preloader */
        -moz-animation: pulset 3s infinite ease-in-out; /* Animation for preloader */
        animation: pulset 3s infinite ease-in-out; /* Animation for preloader */
    }

    /* Preloader styling for first stage */
    .torneos-p1 {
        height: 54px; /* Fixed height */
        background: #00000040; /* Background color */
        border-radius: 5px; /* Rounded corners */
        margin: 11px 0; /* Margin for spacing */
    }

    /* Preloader styling for second stage */
    .torneos-p2 {
        height: 54px; /* Fixed height */
        background: #00000025; /* Background color */
        border-radius: 5px; /* Rounded corners */
        margin: 11px 0; /* Margin for spacing */
    }

    /* Preloader styling for third stage */
    .torneos-p3 {
        height: 54px; /* Fixed height */
        background: #00000010; /* Background color */
        border-radius: 5px; /* Rounded corners */
        margin: 11px 0; /* Margin for spacing */
    }

    /* State display styling for tournaments */
    .tournaments-state {
        float: right; /* Float to the right */
        padding-right: 18px; /* Right padding */
    }

    /* Time left container styling */
    .container-tournaments .list-tournaments .timeleft-container {
        float: right; /* Float to the right */
    }

    /* Road layout styling */
    .road {
        display: flex; /* Flexbox layout */
        align-items: center; /* Center items vertically */
        justify-content: space-around; /* Space items evenly */
        height: 100%; /* Full height */
        position: relative; /* Relative positioning */
    }

    /* Specific positioning for road elements */
    .road.road-1 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-2 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-2 > div:nth-child(2) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-3 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-3 > div:nth-child(2) {
        top: 347px; /* Positioning from the top */
        margin-left: -79px; /* Negative left margin */
    }
    .road.road-3 > div:nth-child(3) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-4 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-4 > div:nth-child(2) {
        top: 285px; /* Positioning from the top */
        margin-left: -99px; /* Negative left margin */
    }
    .road.road-4 > div:nth-child(3) {
        bottom: 205px; /* Positioning from the bottom */
        margin-left: 20px; /* Left margin */
    }
    .road.road-4 > div:nth-child(4) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-5 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-5 > div:nth-child(2) {
        top: 220px; /* Positioning from the top */
        margin-left: -68px; /* Negative left margin */
    }
    .road.road-5 > div:nth-child(3) {
        bottom: 362px; /* Positioning from the bottom */
        margin-left: -46px; /* Negative left margin */
    }
    .road.road-5 > div:nth-child(4) {
        bottom: 168px; /* Positioning from the bottom */
        margin-left: -40px; /* Negative left margin */
    }
    .road.road-5 > div:nth-child(5) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-6 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-6 > div:nth-child(2) {
        top: 176px; /* Positioning from the top */
        margin-left: -5px; /* Negative left margin */
    }
    .road.road-6 > div:nth-child(3) {
        bottom: 460px; /* Positioning from the bottom */
        margin-left: -100px; /* Negative left margin */
    }
    .road.road-6 > div:nth-child(4) {
        bottom: 318px; /* Positioning from the bottom */
        margin-left: -6px; /* Negative left margin */
    }
    .road.road-6 > div:nth-child(5) {
        bottom: 161px; /* Positioning from the bottom */
        margin-left: -57px; /* Negative left margin */
    }
    .road.road-6 > div:nth-child(6) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-7 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-7 > div:nth-child(2) {
        top: 202px; /* Positioning from the top */
        margin-left: -40px; /* Negative left margin */
    }
    .road.road-7 > div:nth-child(3) {
        bottom: 460px; /* Positioning from the bottom */
        margin-left: -107px; /* Negative left margin */
    }
    .road.road-7 > div:nth-child(4) {
        bottom: 318px; /* Positioning from the bottom */
        margin-left: -6px; /* Negative left margin */
    }
    .road.road-7 > div:nth-child(5) {
        bottom: 201px; /* Positioning from the bottom */
        margin-left: 2px; /* Left margin */
    }
    .road.road-7 > div:nth-child(6) {
        bottom: 116px; /* Positioning from the bottom */
        margin-left: -163px; /* Negative left margin */
    }
    .road.road-7 > div:nth-child(7) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-8 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-8 > div:nth-child(2) {
        top: 172px; /* Positioning from the top */
        margin-left: 6px; /* Left margin */
    }
    .road.road-8 > div:nth-child(3) {
        bottom: 493px; /* Positioning from the bottom */
        margin-left: -97px; /* Negative left margin */
    }
    .road.road-8 > div:nth-child(4) {
        bottom: 402px; /* Positioning from the bottom */
        margin-left: -82px; /* Negative left margin */
    }
    .road.road-8 > div:nth-child(5) {
        bottom: 301px; /* Positioning from the bottom */
        margin-left: 2px; /* Left margin */
    }
    .road.road-8 > div:nth-child(6) {
        bottom: 194px; /* Positioning from the bottom */
        margin-left: 9px; /* Left margin */
    }
    .road.road-8 > div:nth-child(7) {
        bottom: 114px; /* Positioning from the bottom */
        margin-left: -164px; /* Negative left margin */
    }
    .road.road-8 > div:nth-child(8) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-9 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-9 > div:nth-child(2) {
        top: 172px; /* Positioning from the top */
        margin-left: 6px; /* Left margin */
    }
    .road.road-9 > div:nth-child(3) {
        bottom: 493px; /* Positioning from the bottom */
        margin-left: -97px; /* Negative left margin */
    }
    .road.road-9 > div:nth-child(4) {
        bottom: 402px; /* Positioning from the bottom */
        margin-left: -82px; /* Negative left margin */
    }
    .road.road-9 > div:nth-child(5) {
        bottom: 320px; /* Positioning from the bottom */
        margin-left: -12px; /* Negative left margin */
    }
    .road.road-9 > div:nth-child(6) {
        bottom: 223px; /* Positioning from the bottom */
        margin-left: 24px; /* Left margin */
    }
    .road.road-9 > div:nth-child(7) {
        bottom: 148px; /* Positioning from the bottom */
        margin-left: -84px; /* Negative left margin */
    }
    .road.road-9 > div:nth-child(8) {
        bottom: 96px; /* Positioning from the bottom */
        margin-left: -209px; /* Negative left margin */
    }
    .road.road-9 > div:nth-child(9) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Z-index for stacking */
    }
    .road.road-10 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }

    .road.road-10 > div:nth-child(2) {
        top: 156px; /* Positioning from the top */
        margin-left: 24px; /* Left margin */
    }
    .road.road-10 > div:nth-child(3) {
        bottom: 526px; /* Positioning from the bottom */
        margin-left: -72px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(4) {
        bottom: 438px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(5) {
        bottom: 361px; /* Positioning from the bottom */
        margin-left: -48px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(6) {
        bottom: 271px; /* Positioning from the bottom */
        margin-left: 21px; /* Left margin */
    }
    .road.road-10 > div:nth-child(7) {
        bottom: 177px; /* Positioning from the bottom */
        margin-left: -17px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(8) {
        bottom: 134px; /* Positioning from the bottom */
        margin-left: -127px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(9) {
        bottom: 75px; /* Positioning from the bottom */
        margin-left: -239px; /* Negative left margin */
    }
    .road.road-10 > div:nth-child(10) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-11 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-11 > div:nth-child(2) {
        top: 142px; /* Positioning from the top */
        margin-left: 37px; /* Left margin */
    }
    .road.road-11 > div:nth-child(3) {
        bottom: 555px; /* Positioning from the bottom */
        margin-left: -32px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(4) {
        bottom: 489px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(5) {
        bottom: 417px; /* Positioning from the bottom */
        margin-left: -89px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(6) {
        bottom: 340px; /* Positioning from the bottom */
        margin-left: -23px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(7) {
        bottom: 247px; /* Positioning from the bottom */
        margin-left: 25px; /* Left margin */
    }
    .road.road-11 > div:nth-child(8) {
        bottom: 173px; /* Positioning from the bottom */
        margin-left: -28px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(9) {
        bottom: 118px; /* Positioning from the bottom */
        margin-left: -156px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(10) {
        bottom: 71px; /* Positioning from the bottom */
        margin-left: -241px; /* Negative left margin */
    }
    .road.road-11 > div:nth-child(11) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-12 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-12 > div:nth-child(2) {
        top: 142px; /* Positioning from the top */
        margin-left: 37px; /* Left margin */
    }
    .road.road-12 > div:nth-child(3) {
        bottom: 555px; /* Positioning from the bottom */
        margin-left: -32px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(4) {
        bottom: 503px; /* Positioning from the bottom */
        margin-left: -94px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(5) {
        bottom: 439px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(6) {
        bottom: 374px; /* Positioning from the bottom */
        margin-left: -62px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(7) {
        bottom: 310px; /* Positioning from the bottom */
        margin-left: -3px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(8) {
        bottom: 241px; /* Positioning from the bottom */
        margin-left: 31px; /* Left margin */
    }
    .road.road-12 > div:nth-child(9) {
        bottom: 168px; /* Positioning from the bottom */
        margin-left: -36px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(10) {
        bottom: 123px; /* Positioning from the bottom */
        margin-left: -147px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(11) {
        bottom: 77px; /* Positioning from the bottom */
        margin-left: -236px; /* Negative left margin */
    }
    .road.road-12 > div:nth-child(12) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-13 > div:nth-child(1) {
        top: 83px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-13 > div:nth-child(2) {
        top: 142px; /* Positioning from the top */
        margin-left: 37px; /* Left margin */
    }
    .road.road-13 > div:nth-child(3) {
        bottom: 555px; /* Positioning from the bottom */
        margin-left: -32px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(4) {
        bottom: 503px; /* Positioning from the bottom */
        margin-left: -94px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(5) {
        bottom: 439px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(6) {
        bottom: 374px; /* Positioning from the bottom */
        margin-left: -62px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(7) {
        bottom: 318px; /* Positioning from the bottom */
        margin-left: -8px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(8) {
        bottom: 260px; /* Positioning from the bottom */
        margin-left: 21px; /* Left margin */
    }
    .road.road-13 > div:nth-child(9) {
        bottom: 197px; /* Positioning from the bottom */
        margin-left: 13px; /* Left margin */
    }
    .road.road-13 > div:nth-child(10) {
        bottom: 157px; /* Positioning from the bottom */
        margin-left: -63px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(11) {
        bottom: 119px; /* Positioning from the bottom */
        margin-left: -156px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(12) {
        bottom: 71px; /* Positioning from the bottom */
        margin-left: -244px; /* Negative left margin */
    }
    .road.road-13 > div:nth-child(13) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-14 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-14 > div:nth-child(2) {
        top: 125px; /* Positioning from the top */
        margin-left: 48px; /* Left margin */
    }
    .road.road-14 > div:nth-child(3) {
        bottom: 574px; /* Positioning from the bottom */
        margin-left: -8px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(4) {
        bottom: 525px; /* Positioning from the bottom */
        margin-left: -75px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(5) {
        bottom: 468px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(6) {
        bottom: 411px; /* Positioning from the bottom */
        margin-left: -83px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(7) {
        bottom: 352px; /* Positioning from the bottom */
        margin-left: -41px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(8) {
        bottom: 293px; /* Positioning from the bottom */
        margin-left: 10px; /* Left margin */
    }
    .road.road-14 > div:nth-child(9) {
        bottom: 230px; /* Positioning from the bottom */
        margin-left: 28px; /* Left margin */
    }
    .road.road-14 > div:nth-child(10) {
        bottom: 181px; /* Positioning from the bottom */
        margin-left: -13px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(11) {
        bottom: 143px; /* Positioning from the bottom */
        margin-left: -97px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(12) {
        bottom: 111px; /* Positioning from the bottom */
        margin-left: -174px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(13) {
        bottom: 71px; /* Positioning from the bottom */
        margin-left: -237px; /* Negative left margin */
    }
    .road.road-14 > div:nth-child(14) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-15 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-15 > div:nth-child(2) {
        top: 116px; /* Positioning from the top */
        margin-left: 48px; /* Left margin */
    }
    .road.road-15 > div:nth-child(3) {
        bottom: 587px; /* Positioning from the bottom */
        margin-left: 11px; /* Left margin */
    }
    .road.road-15 > div:nth-child(4) {
        bottom: 542px; /* Positioning from the bottom */
        margin-left: -51px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(5) {
        bottom: 498px; /* Positioning from the bottom */
        margin-left: -94px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(6) {
        bottom: 444px; /* Positioning from the bottom */
        margin-left: -102px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(7) {
        bottom: 386px; /* Positioning from the bottom */
        margin-left: -66px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(8) {
        bottom: 336px; /* Positioning from the bottom */
        margin-left: -22px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(9) {
        bottom: 279px; /* Positioning from the bottom */
        margin-left: 16px; /* Left margin */
    }
    .road.road-15 > div:nth-child(10) {
        bottom: 222px; /* Positioning from the bottom */
        margin-left: 26px; /* Left margin */
    }
    .road.road-15 > div:nth-child(11) {
        bottom: 173px; /* Positioning from the bottom */
        margin-left: -20px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(12) {
        bottom: 142px; /* Positioning from the bottom */
        margin-left: -99px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(13) {
        bottom: 109px; /* Positioning from the bottom */
        margin-left: -179px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(14) {
        bottom: 73px; /* Positioning from the bottom */
        margin-left: -235px; /* Negative left margin */
    }
    .road.road-15 > div:nth-child(15) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-16 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-16 > div:nth-child(2) {
        top: 116px; /* Positioning from the top */
        margin-left: 48px; /* Left margin */
    }
    .road.road-16 > div:nth-child(3) {
        bottom: 596px; /* Positioning from the bottom */
        margin-left: 20px; /* Left margin */
    }
    .road.road-16 > div:nth-child(4) {
        bottom: 558px; /* Positioning from the bottom */
        margin-left: -27px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(5) {
        bottom: 521px; /* Positioning from the bottom */
        margin-left: -79px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(6) {
        bottom: 474px; /* Positioning from the bottom */
        margin-left: -102px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(7) {
        bottom: 428px; /* Positioning from the bottom */
        margin-left: -95px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(8) {
        bottom: 382px; /* Positioning from the bottom */
        margin-left: -67px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(9) {
        bottom: 336px; /* Positioning from the bottom */
        margin-left: -26px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(10) {
        bottom: 292px; /* Positioning from the bottom */
        margin-left: 12px; /* Left margin */
    }
    .road.road-16 > div:nth-child(11) {
        bottom: 235px; /* Positioning from the bottom */
        margin-left: 25px; /* Left margin */
    }
    .road.road-16 > div:nth-child(12) {
        bottom: 181px; /* Positioning from the bottom */
        margin-left: -16px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(13) {
        bottom: 148px; /* Positioning from the bottom */
        margin-left: -87px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(14) {
        bottom: 118px; /* Positioning from the bottom */
        margin-left: -157px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(15) {
        bottom: 78px; /* Positioning from the bottom */
        margin-left: -233px; /* Negative left margin */
    }
    .road.road-16 > div:nth-child(16) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-17 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-17 > div:nth-child(2) {
        top: 116px; /* Positioning from the top */
        margin-left: 48px; /* Left margin */
    }
    .road.road-17 > div:nth-child(3) {
        bottom: 596px; /* Positioning from the bottom */
        margin-left: 20px; /* Left margin */
    }
    .road.road-17 > div:nth-child(4) {
        bottom: 558px; /* Positioning from the bottom */
        margin-left: -27px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(5) {
        bottom: 521px; /* Positioning from the bottom */
        margin-left: -79px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(6) {
        bottom: 474px; /* Positioning from the bottom */
        margin-left: -102px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(7) {
        bottom: 428px; /* Positioning from the bottom */
        margin-left: -95px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(8) {
        bottom: 382px; /* Positioning from the bottom */
        margin-left: -67px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(9) {
        bottom: 336px; /* Positioning from the bottom */
        margin-left: -26px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(10) {
        bottom: 292px; /* Positioning from the bottom */
        margin-left: 12px; /* Left margin */
    }
    .road.road-17 > div:nth-child(11) {
        bottom: 246px; /* Positioning from the bottom */
        margin-left: 25px; /* Left margin */
    }
    .road.road-17 > div:nth-child(12) {
        bottom: 199px; /* Positioning from the bottom */
        margin-left: 9px; /* Left margin */
    }
    .road.road-17 > div:nth-child(13) {
        bottom: 162px; /* Positioning from the bottom */
        margin-left: -48px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(14) {
        bottom: 133px; /* Positioning from the bottom */
        margin-left: -119px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(15) {
        bottom: 106px; /* Positioning from the bottom */
        margin-left: -185px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(16) {
        bottom: 71px; /* Positioning from the bottom */
        margin-left: -235px; /* Negative left margin */
    }
    .road.road-17 > div:nth-child(17) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-18 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-18 > div:nth-child(2) {
        top: 107px; /* Positioning from the top */
        margin-left: 53px; /* Left margin */
    }
    .road.road-18 > div:nth-child(3) {
        bottom: 608px; /* Positioning from the bottom */
        margin-left: 30px; /* Left margin */
    }
    .road.road-18 > div:nth-child(4) {
        bottom: 570px; /* Positioning from the bottom */
        margin-left: -4px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(5) {
        bottom: 540px; /* Positioning from the bottom */
        margin-left: -58px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(6) {
        bottom: 501px; /* Positioning from the bottom */
        margin-left: -93px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(7) {
        bottom: 459px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(8) {
        bottom: 410px; /* Positioning from the bottom */
        margin-left: -88px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(9) {
        bottom: 365px; /* Positioning from the bottom */
        margin-left: -54px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(10) {
        bottom: 319px; /* Positioning from the bottom */
        margin-left: -11px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(11) {
        bottom: 278px; /* Positioning from the bottom */
        margin-left: 17px; /* Left margin */
    }
    .road.road-18 > div:nth-child(12) {
        bottom: 233px; /* Positioning from the bottom */
        margin-left: 24px; /* Left margin */
    }
    .road.road-18 > div:nth-child(13) {
        bottom: 191px; /* Positioning from the bottom */
        margin-left: 1px; /* Left margin */
    }
    .road.road-18 > div:nth-child(14) {
        bottom: 158px; /* Positioning from the bottom */
        margin-left: -68px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(15) {
        bottom: 130px; /* Positioning from the bottom */
        margin-left: -132px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(16) {
        bottom: 103px; /* Positioning from the bottom */
        margin-left: -195px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(17) {
        bottom: 69px; /* Positioning from the bottom */
        margin-left: -244px; /* Negative left margin */
    }
    .road.road-18 > div:nth-child(18) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-19 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-19 > div:nth-child(2) {
        top: 107px; /* Positioning from the top */
        margin-left: 53px; /* Left margin */
    }
    .road.road-19 > div:nth-child(3) {
        bottom: 608px; /* Positioning from the bottom */
        margin-left: 30px; /* Left margin */
    }
    .road.road-19 > div:nth-child(4) {
        bottom: 570px; /* Positioning from the bottom */
        margin-left: -4px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(5) {
        bottom: 540px; /* Positioning from the bottom */
        margin-left: -58px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(6) {
        bottom: 501px; /* Positioning from the bottom */
        margin-left: -93px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(7) {
        bottom: 459px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(8) {
        bottom: 410px; /* Positioning from the bottom */
        margin-left: -88px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(9) {
        bottom: 369px; /* Positioning from the bottom */
        margin-left: -60px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(10) {
        bottom: 331px; /* Positioning from the bottom */
        margin-left: -20px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(11) {
        bottom: 295px; /* Positioning from the bottom */
        margin-left: 11px; /* Left margin */
    }
    .road.road-19 > div:nth-child(12) {
        bottom: 255px; /* Positioning from the bottom */
        margin-left: 24px; /* Left margin */
    }
    .road.road-19 > div:nth-child(13) {
        bottom: 214px; /* Positioning from the bottom */
        margin-left: 24px; /* Left margin */
    }
    .road.road-19 > div:nth-child(14) {
        bottom: 180px; /* Positioning from the bottom */
        margin-left: -13px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(15) {
        bottom: 153px; /* Positioning from the bottom */
        margin-left: -71px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(16) {
        bottom: 129px; /* Positioning from the bottom */
        margin-left: -133px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(17) {
        bottom: 105px; /* Positioning from the bottom */
        margin-left: -189px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(18) {
        bottom: 74px; /* Positioning from the bottom */
        margin-left: -241px; /* Negative left margin */
    }
    .road.road-19 > div:nth-child(19) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .road.road-20 > div:nth-child(1) {
        top: 68px; /* Positioning from the top */
        margin-left: 63px; /* Left margin */
    }
    .road.road-20 > div:nth-child(2) {
        top: 107px; /* Positioning from the top */
        margin-left: 53px; /* Left margin */
    }
    .road.road-20 > div:nth-child(3) {
        bottom: 608px; /* Positioning from the bottom */
        margin-left: 30px; /* Left margin */
    }
    .road.road-20 > div:nth-child(4) {
        bottom: 575px; /* Positioning from the bottom */
        margin-left: -3px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(5) {
        bottom: 545px; /* Positioning from the bottom */
        margin-left: -49px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(6) {
        bottom: 513px; /* Positioning from the bottom */
        margin-left: -88px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(7) {
        bottom: 475px; /* Positioning from the bottom */
        margin-left: -101px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(8) {
        bottom: 436px; /* Positioning from the bottom */
        margin-left: -98px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(9) {
        bottom: 395px; /* Positioning from the bottom */
        margin-left: -75px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(10) {
        bottom: 356px; /* Positioning from the bottom */
        margin-left: -39px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(11) {
        bottom: 318px; /* Positioning from the bottom */
        margin-left: -5px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(12) {
        bottom: 279px; /* Positioning from the bottom */
        margin-left: 18px; /* Left margin */
    }
    .road.road-20 > div:nth-child(13) {
        bottom: 239px; /* Positioning from the bottom */
        margin-left: 24px; /* Left margin */
    }
    .road.road-20 > div:nth-child(14) {
        bottom: 200px; /* Positioning from the bottom */
        margin-left: 14px; /* Left margin */
    }
    .road.road-20 > div:nth-child(15) {
        bottom: 169px; /* Positioning from the bottom */
        margin-left: -32px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(16) {
        bottom: 145px; /* Positioning from the bottom */
        margin-left: -97px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(17) {
        bottom: 120px; /* Positioning from the bottom */
        margin-left: -155px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(18) {
        bottom: 97px; /* Positioning from the bottom */
        margin-left: -205px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(19) {
        bottom: 69px; /* Positioning from the bottom */
        margin-left: -244px; /* Negative left margin */
    }
    .road.road-20 > div:nth-child(20) {
        bottom: 15px; /* Positioning from the bottom */
        margin-left: -261px; /* Negative left margin */
        z-index: 3; /* Layering order */
    }
    .win-top{
        top: 0px !important; /* Fixed position at the top */
    }
    @media (max-width: 600px) {
        .road .win{
            transform: scale(0.7); /* Scale down for smaller screens */
            margin-left: -43px; /* Adjust left margin */
            margin-top: 28px; /* Adjust top margin */
        }
        .win-top{
            margin-left: -60px !important; /* Adjust left margin for win-top */
            margin-top: -42px !important; /* Adjust top margin for win-top */
        }
    }
    @media (min-width: 890px) {
        .img-award{
            margin-left: 738px; /* Positioning for larger screens */
            top: 111px !important; /* Fixed position from the top */
        }
        .modal-box{
            height: 71% !important; /* Set height for modal */
            max-height: 481px !important; /* Maximum height for modal */
        }
    }
    .background-popup {
        -webkit-animation:spin 4s linear infinite; /* Spin animation for background */
        -moz-animation:spin 4s linear infinite; /* Spin animation for background */
        animation:spin 4s linear infinite; /* Spin animation for background */
    }
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } } /* Keyframes for spin animation */
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } } /* Keyframes for spin animation */
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } } /* Keyframes for spin animation */
    .background-popupnotification {
        -webkit-animation:spin2 30s linear infinite; /* Spin animation for popup notification */
        -moz-animation:spin2 30s linear infinite; /* Spin animation for popup notification */
        animation:spin2 30s linear infinite; /* Spin animation for popup notification */
    }
    @-moz-keyframes spin2 { 100% { -moz-transform: rotate(360deg); } } /* Keyframes for spin2 animation */
    @-webkit-keyframes spin2 { 100% { -webkit-transform: rotate(360deg); } } /* Keyframes for spin2 animation */
    @keyframes spin2 { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } } /* Keyframes for spin2 animation */
    .side-small {
        -webkit-animation:side-small 4s linear infinite; /* Side small animation */
        -moz-animation:side-small 4s linear infinite; /* Side small animation */
        animation:side-small 4s linear infinite; /* Side small animation */
    }
    @-moz-keyframes side-small { 100% { -moz-transform: rotate(-360deg); } } /* Keyframes for side-small animation */
    @-webkit-keyframes side-small { 100% { -webkit-transform: rotate(-360deg); } } /* Keyframes for side-small animation */
    @keyframes side-small { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } } /* Keyframes for side-small animation */
    .ball{
        -webkit-animation:ball 2s alternate infinite ease-in;; /* Ball animation */
        -moz-animation:ball 2s alternate infinite ease-in;; /* Ball animation */
        animation:ball 2s alternate infinite ease-in;; /* Ball animation */
    }
    @keyframes ball {0%   {transform: scale(1.0);} 100% {transform: scale(1.1);}} /* Keyframes for ball animation */
    @-webkit-keyframes ball {0%   {-webkit-transform: scale(1.0);} 100% {-webkit-transform: scale(1.1);}} /* Keyframes for ball animation */
    @-moz-keyframes ball {0%   {-moz-transform: scale(1.0);} 100% {-moz-transform: scale(1.1);}} /* Keyframes for ball animation */
    .award-notification{
        -webkit-animation:award-notification 3.5s alternate ease-in;; /* Award notification animation */
        -moz-animation:award-notification 3.5s alternate ease-in;; /* Award notification animation */
        animation:award-notification 3.5s alternate ease-in;; /* Award notification animation */
    }
    @keyframes award-notification {
        0% {
            opacity: 0; /* Start invisible */
            transform: scale(0.0); /* Start scaled down */
        }
        50%{
            opacity: 0; /* Still invisible */
        }
        100%{
            opacity: 1; /* Fully visible */
            transform: scale(1.0); /* Fully scaled */
        }
    }
    .text-coupon{
        animation-name: coupon; /* Coupon animation */
        animation-duration: 5.16s; /* Duration of coupon animation */
        animation-delay: 0s; /* No delay */
        animation-iteration-count: 1; /* Play once */
        opacity:1; /* Fully visible */
    }
    .coupon-scrape{
        animation-name: coupon-scrape; /* Coupon scrape animation */
        animation-duration: 5.16s; /* Duration of coupon scrape animation */
        animation-delay: 0s; /* No delay */
        animation-iteration-count: 1; /* Play once */
        opacity:0; /* Start invisible */
    }
    @keyframes coupon {
        0%   {
            opacity: 0; /* Start invisible */
            display: none; /* Not displayed */
        }
        49%   {
            opacity: 0; /* Still invisible */
            display: none; /* Not displayed */
        }
        50%   {
            display: block; /* Displayed */
            opacity: 1; /* Fully visible */
        }
        99%   {
            display: block; /* Still displayed */
            opacity: 1; /* Fully visible */
        }
        100% {
            display: block; /* Still displayed */
            opacity: 1; /* Fully visible */
        }
    }
    @keyframes coupon-scrape {
        100%   {
            opacity: 0; /* End invisible */
            display: none; /* Not displayed */
        }
        99% {
            display: block; /* Still displayed */
            opacity: 1; /* Fully visible */
        }
        0% {
            display: block; /* Still displayed */
            opacity: 1; /* Fully visible */
        }
    }
}
</style>

<!-- FILE DOCUMENTED -->
