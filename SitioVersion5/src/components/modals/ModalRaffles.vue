<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { toRaw } from 'vue'; // Importing toRaw from Vue for reactive object handling
import moment from 'moment'; // Importing moment for date formatting
import apiService from '@/services/ApiService'; // Importing apiService for API interactions

export default defineComponent({
	props: {
		data: Object, // Prop to receive data as an object
	},
	data() {
		let emitter = this.$emitter(); // Event emitter for communication
		let appComponent: any = this.$appComponent; // Reference to the application component
		let flagShowStickers: boolean = false; // Flag to control sticker visibility
		let flagShowCoupon: boolean = false; // Flag to control coupon visibility
		let config = this.$config(); // Configuration object
		let coupons: any = []; // Array to hold coupons
		let flagOpenModal2: boolean = false; // Flag to control modal visibility
		let moreInfo: boolean = false; // Flag for additional information display
		let mobile: boolean = false; // Flag to check if the device is mobile
		let moreInfo2: boolean = false; // Additional information flag
		let openM: boolean = false; // Flag to control modal state
		let openMC: string = ''; // Variable to hold the winning code
		let openDATE: string = ''; // Variable to hold the prize date
		let datePrice: any = undefined; // Variable for date price
		let flagOpenIMG: boolean = false; // Flag to control image visibility
		let openIMG1: string = ''; // Variable for the first image
		let openIMG: string = ''; // Variable for the main image
		let openTYPE: string = ''; // Variable for prize type
		let openUG: string = ''; // Variable for user ID of the winner
		let openUP: string = ''; // Variable for total players
		let numberStickers: any = []; // Array to hold the number of stickers
		let openCP: string = ''; // Variable for total coupons
		let stickers: any = {}; // Object to hold stickers
		let flag: any = ''; // General flag variable
		let flagShowRoad: boolean = false; // Flag to control road visibility
		let torneos: any = []; // Array to hold tournaments
		let stickersCount: any = []; // Array to hold sticker counts

		return {
			emitter,
			numberStickers,
			stickersCount,
			moreInfo,
			moreInfo2,
			openM,
			openIMG1,
			openTYPE,
			mobile,
			openIMG,
			openMC,
			openDATE,
			openUG,
			flagOpenIMG,
			openUP,
			openCP,
			appComponent,
			flagShowRoad,
			flagOpenModal2,
			config,
			flagShowStickers,
			stickers,
			datePrice,
			coupons,
			flagShowCoupon,
			torneos,
			flag,
		};
	},
	mounted() {
		setTimeout(() => {
			this.numberStickers = this.appComponent.modal.stickersCount; // Update number of stickers after 1 second
		}, 1000);
		this.roadWithPrizes(this.appComponent.modal.idRaffle); // Call method to handle road with prizes
	},
	updated() {
		setTimeout(() => {
			this.numberStickers = this.appComponent.modal.stickersCount; // Update number of stickers on component update
		}, 1000);
	},
	methods: {
		analyticsAttrs(label: string) {
			return {
				'data-analytics-label': label,
				'data-analytics-context': `component:ModalRaffles|layout:layout-${this.appComponent.config.layout}`
			};
		},
		nextMap(id) {
			this.emitter.emit('nextMap', id); // Emit event to move to the next map
		},
		getPrize2() {
			this.openM = true; // Open modal for prize
		},
		modalClose(item) {
			item.open = false; // Close the modal
			(
				document.getElementsByClassName(
					'popuproad-' + item.id
				)[0] as HTMLElement
			).style.display = 'none'; // Hide the modal element
		},
		close() {
			this.appComponent.closeModal(); // Close the application modal
		},
		prizeOpen(item) {
			item.withPrizes.forEach((item2) => {
				item2.open = false; // Close all prizes in the item
			});
		},
		roadWithPrizes(id) {
			this.flag = id; // Set the current flag to the provided ID
			this.flagShowStickers = false; // Hide stickers
			this.flagShowCoupon = false; // Hide coupons
			this.flagShowRoad = true; // Show road
		},
		openModal2(item, prize) {
			this.openM = false; // Close the main modal
			this.flagOpenModal2 = true; // Open the second modal
			var dateP = new Date(); // Create a new date object
			dateP.setSeconds(dateP.getSeconds() + 6); // Set the date to 6 seconds in the future
			this.datePrice = this.formatDate(dateP.getTime()); // Format the date for display
			this.openMC = prize.userWin.code; // Set winning code
			this.openDATE = prize.date; // Set prize date
			this.openUG = prize.userWin.user_id; // Set user ID of the winner
			this.openTYPE = prize.type; // Set prize type
			this.openUP = prize.totalPlayers; // Set total players
			this.openCP = prize.totalCoupons; // Set total coupons
			if (prize.type == 'Fisico') {
				this.flagOpenIMG = true; // Show image if prize type is physical
				this.openIMG = prize.image; // Set image for the prize
			} else {
				this.flagOpenIMG = false; // Hide image for non-physical prizes
				this.openIMG1 = prize.description; // Set description for the prize
				this.openIMG = prize.image; // Set image for the prize
			}
			item.open = true; // Open the item modal
			(
				document.getElementsByClassName(
					'popuproad-' + item.id
				)[0] as HTMLElement
			).style.display = 'block'; // Show the modal element
		},
		getCoupons(id) {
			this.flagShowStickers = false; // Hide stickers
			this.flagShowCoupon = true; // Show coupons
			this.flagShowRoad = false; // Hide road
			this.coupons = this.appComponent.modal.coupons; // Load coupons from the application component
		},
		getStickers(id) {
			this.flagShowStickers = true; // Show stickers
			this.flagShowCoupon = false; // Hide coupons
			this.flagShowRoad = false; // Hide road
			this.stickers = this.appComponent.modal.stickers; // Load stickers from the application component
		},
		changeMain(id) {
			if (this.flag != id) {
				this.flag = id; // Update flag if the ID is different
				this.getStickers(id); // Fetch stickers for the new ID
			} else {
				this.flag = ''; // Reset flag if the same ID is selected
			}
		},
		accept() {
			this.emitter.emit('accept:modal'); // Emit event to accept the modal
		},
		formatDate(timestamp: any) {
			let newYear: any = new Date(timestamp); // Create a new date object from the timestamp
			let now: any = new Date(); // Get the current date
			return newYear - now; // Return the difference between the two dates
		},
		formatDate2(dateString: any, format: string) {
			const date = new Date(dateString); // Create a date object from the date string
			return moment(date).format(format); // Format the date using moment.js
		},
	},
});
</script>
<template>
    <!-- Main modal container with high z-index for visibility -->
    <div class="modal z-[999999999]">
        <div
            class="container-general w-full md:w-[99.666667%] max-h-full overflow-auto flex flex-col justify-center items-center"
        >
            <div
                class="container-img-text w-full md:w-[95.666667%] overflow-y-auto containar h-auto min-h-[500px] max-w-[1415px] md:max-h-screen rounded-3xl relative"
            >
                <!-- Close button to trigger modal close action -->
                <label
                    @click="close()"
                    class="close-btn btn btn-sm btn-circle bg-[#e14644] absolute text-lg top-2 right-4 shadow-lg text-white transition ease-in-out hover:scale-105"
                    style="z-index: 6"
                >✕</label
                >
                <div>
                    <div
                        class="absolute flex flex-col md:flex-row top-[12%] right-[1%] md:top-[2%] md:left-[48%]"
                        style="z-index: 3"
                    >
                        <!-- Button to show stickers if flagShowRoad is true -->
                        <button
                            v-if="flagShowRoad == true"
                            @click="getStickers(data?.id)"
                            class="text-white block rounded-full bg-primary-content text-xs px-3 py-1 uppercase font-bold hover:bg-black hover:text-primary-content"
                        >
                            {{ $t('Stickers') }}
                        </button>
                        <!-- Button to show road if flagShowRoad is false -->
                        <button
                            v-else
                            @click="roadWithPrizes(data?.id)"
                            class="text-white block rounded-full bg-primary-content text-xs px-3 py-1 uppercase font-bold hover:bg-black hover:text-primary-content"
                        >
                            {{ $t('Ruta') }}
                        </button>
                    </div>
                    <!-- Main container for displaying tournament details and stickers -->
                    <div
                        v-if="flagShowStickers == true && flag == data?.id"
                        class="details-tournament"
                    >
                        <div class="description-container">
                            <!-- Header section containing title and button -->
                            <div
                                class="header-container grid grid-cols-1 lg:grid-cols-5 gap-2"
                            >
                                <div class="pt-3 pl-3">
                                    <div class="cotainer" style="display: flex">
                                        <p
                                            class="text-3xl text-black font-extrabold text-left mr-2"
                                        >
                                            {{ $t('STICKERS') }}
                                        </p>
                                        <img
                                            src="https://images.virtualsoft.tech/m/msjT1656610794.png"
                                            alt="cupon"
                                            width="40"
                                            height="40"
                                        />
                                    </div>
                                    <!-- Button to show coupons if user is logged in -->
                                    <button
                                        v-if="appComponent.session.logueado"
                                        @click="
											flagShowCoupon = true;
											flagShowStickers = false;
											getCoupons(data?.id);
										"
                                        aria-label="MIS CUPONES"
                                        class="text-white block rounded-full bg-primary-content px-3 py-1 uppercase font-bold hover:bg-black hover:text-primary-content"
                                        style="
											background: linear-gradient(
												1deg,
												#00000030,
												transparent
											);
										"
                                    >
                                        {{ $t('mis cupones') }}
                                    </button>
                                </div>
                                <!-- Description section -->
                                <div
                                    class="col-span-3 pt-3 relative inline-block text-center m-5"
                                >
                                    <div
                                        class="mt-3"
                                        style="
											background-image: url(https://images.virtualsoft.tech/m/msjT1684340228.png);
											background-position: center;
											background-repeat: no-repeat;
											background-size: 108% 157%;
										"
                                    >
                                        <p @click="" class="font-light text-xl">
                                            {{ $t(data?.description) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- Stickers section for sportsbook -->
                            <div
                                class="container mt-10 pl-3"
                                v-if="
									stickers != undefined &&
									stickers['sportbook'] != undefined &&
									stickers['sportbook'].length > 0
								"
                            >
                                <div class="title-passport text-black">
                                    <p class="uppercase font-extrabold">
                                        {{
                                            $t(
                                                'stickers por pronósticos deportivos'
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    class="body-passport flex w-full flex-wrap"
                                >
                                    <div
                                        class="sticker mr-4 mb-3 relative"
                                        :class="{
											'inline-block text-center':
												sticker.percent < 100,
										}"
                                        v-for="sticker in stickers['sportbook']"
                                    >
                                        <!-- Conditional rendering of sticker images based on percentage -->
                                        <img
                                            v-if="
												sticker.percent > 0 &&
												sticker.percent <= 25
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent25 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent25
													: 'https://images.virtualsoft.tech/m/msjT1681936371.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 26 &&
												sticker.percent <= 50
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent50 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent50
													: 'https://images.virtualsoft.tech/m/msjT1681936428.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 51 &&
												sticker.percent <= 75
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent75 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent75
													: 'https://images.virtualsoft.tech/m/msjT1681936731.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 76 &&
												sticker.percent <= 99
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent99 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent99
													: 'https://images.virtualsoft.tech/m/msjT1681936480.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="sticker.percent == 100"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent100 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent100
													: 'https://images.virtualsoft.tech/m/msjT1681936820.png'
											"
                                            alt="sticker"
                                            width="78"
                                            height="78"
                                        />
                                        <div
                                            v-if="sticker.percent <= 0"
                                            class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                            style="
												font-size: 9px;
												width: 69%;
												height: 55px;
												right: 15%;
												top: 20%;
												line-height: 11px;
											"
                                        >
                                            <p
                                                style="max-height: 55px"
                                                class="overflow-y-auto break-words m-0"
                                            >
                                                {{
                                                    $t(
                                                        'Realiza un pronóstico para desbloquear el sticker'
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <img
                                            v-if="sticker.percent <= 0"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent0 != undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent0
													: 'https://images.virtualsoft.tech/m/msjT1681936246.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                    </div>
                                </div>
                                <div class="subtitle-passport mt-3">
                                    <p class="text-black text-xs">
                                        {{
                                            $t(
                                                'Gánate un sticker acumulando un total de $'
                                            )
                                        }}{{
                                            data?.minAmountDetails.sportbookMax
                                        }}.
                                        {{
                                            $t(
                                                'Cada pronóstico individual debe ser mayor o igual a $'
                                            )
                                        }}{{
                                            data?.minAmountDetails.sportbookMin
                                        }}
                                    </p>
                                </div>
                            </div>
                            <!-- Stickers section for casino -->
                            <div
                                class="container mt-8 pl-3"
                                v-if="
									stickers != undefined &&
									stickers['casino'] != undefined &&
									stickers['casino'].length > 0
								"
                            >
                                <hr style="border: 1px solid black" />
                                <br />
                                <div class="title-passport text-black">
                                    <p class="uppercase font-extrabold">
                                        {{
                                            $t(
                                                'stickers por pronósticos de casino'
                                            )
                                        }}
                                    </p>
                                </div>
                                <div
                                    class="body-passport flex w-full flex-wrap"
                                >
                                    <div
                                        class="sticker mr-4 mb-3 relative"
                                        :class="{
											'inline-block text-center':
												sticker.percent < 100,
										}"
                                        v-for="sticker in stickers['casino']"
                                    >
                                        <!-- Conditional rendering of sticker images based on percentage -->
                                        <img
                                            v-if="
												sticker.percent > 0 &&
												sticker.percent <= 25
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent25 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent25
													: 'https://images.virtualsoft.tech/m/msjT1681936371.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 26 &&
												sticker.percent <= 50
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent50 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent50
													: 'https://images.virtualsoft.tech/m/msjT1681936428.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 51 &&
												sticker.percent <= 75
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent75 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent75
													: 'https://images.virtualsoft.tech/m/msjT1681936731.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 76 &&
												sticker.percent <= 99
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent99 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent99
													: 'https://images.virtualsoft.tech/m/msjT1681936480.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="sticker.percent == 100"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent100 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent100
													: 'https://images.virtualsoft.tech/m/msjT1681936820.png'
											"
                                            alt="sticker"
                                            width="78"
                                            height="78"
                                        />
                                        <div
                                            v-if="sticker.percent <= 0"
                                            class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                            style="
												font-size: 9px;
												width: 69%;
												height: 55px;
												right: 15%;
												top: 20%;
												line-height: 11px;
											"
                                        >
                                            <p
                                                style="max-height: 55px"
                                                class="overflow-y-auto break-words m-0"
                                            >
                                                {{
                                                    $t(
                                                        'Realiza un pronóstico para desbloquear el sticker'
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <img
                                            v-if="sticker.percent <= 0"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent0 != undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent0
													: 'https://images.virtualsoft.tech/m/msjT1681936246.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                    </div>
                                </div>
                                <div class="subtitle-passport mt-3">
                                    <p class="text-black text-xs">
                                        {{
                                            $t(
                                                'Gánate un sticker acumulando un total de $'
                                            )
                                        }}{{
                                            data?.minAmountDetails.casinoMax
                                        }}.
                                        {{
                                            $t(
                                                'Cada pronóstico individual debe ser mayor o igual a $'
                                            )
                                        }}{{ data?.minAmountDetails.casinoMin }}
                                    </p>
                                </div>
                            </div>
                            <!-- Stickers section for deposits -->
                            <div
                                class="container mt-8 pl-3"
                                v-if="
									stickers != undefined &&
									stickers['deposit'] != undefined &&
									stickers['deposit'].length > 0
								"
                            >
                                <hr style="border: 1px solid black" />
                                <br />
                                <div class="title-passport text-black">
                                    <p class="uppercase font-extrabold">
                                        {{ $t('stickers por recargas') }}
                                    </p>
                                </div>
                                <div
                                    class="body-passport flex w-full flex-wrap"
                                >
                                    <div
                                        class="sticker mr-4 mb-3 relative"
                                        :class="{
											'inline-block text-center':
												sticker.percent < 100,
										}"
                                        v-for="sticker in stickers['deposit']"
                                    >
                                        <!-- Conditional rendering of sticker images based on percentage -->
                                        <img
                                            v-if="
												sticker.percent > 0 &&
												sticker.percent <= 25
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent25 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent25
													: 'https://images.virtualsoft.tech/m/msjT1681936371.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 26 &&
												sticker.percent <= 50
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent50 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent50
													: 'https://images.virtualsoft.tech/m/msjT1681936428.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 51 &&
												sticker.percent <= 75
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent75 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent75
													: 'https://images.virtualsoft.tech/m/msjT1681936731.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="
												sticker.percent >= 76 &&
												sticker.percent <= 99
											"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent99 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent99
													: 'https://images.virtualsoft.tech/m/msjT1681936480.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                        <img
                                            v-if="sticker.percent == 100"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent100 !=
													undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent100
													: 'https://images.virtualsoft.tech/m/msjT1681936820.png'
											"
                                            alt="sticker"
                                            width="78"
                                            height="78"
                                        />
                                        <div
                                            v-if="sticker.percent <= 0"
                                            class="text-sticker absolute text-gray-400 font-bold flex items-center justify-center"
                                            style="
												font-size: 9px;
												width: 69%;
												height: 55px;
												right: 15%;
												top: 20%;
												line-height: 11px;
											"
                                        >
                                            <p
                                                style="max-height: 55px"
                                                class="overflow-y-auto break-words m-0"
                                            >
                                                {{
                                                    $t(
                                                        'Realiza una recarga para desbloquear el sticker'
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <img
                                            v-if="sticker.percent <= 0"
                                            :src="
												appComponent.config.raffles
													.assets != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												] != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers != undefined &&
												appComponent.config.raffles
													.assets[
													appComponent.country
												].stickers.percent0 != undefined
													? appComponent.config
															.raffles.assets[
															appComponent.country
														].stickers.percent0
													: 'https://images.virtualsoft.tech/m/msjT1681936246.png'
											"
                                            alt="sticker"
                                            width="81"
                                            height="81"
                                        />
                                    </div>
                                </div>
                                <div class="subtitle-passport mt-3">
                                    <p class="text-black text-xs">
                                        {{
                                            $t(
                                                'Gánate un sticker acumulando un total de $'
                                            )
                                        }}{{
                                            data?.minAmountDetails.depositMax
                                        }}.
                                        {{
                                            $t(
                                                'Cada recarga individual debe ser mayor o igual a $'
                                            )
                                        }}{{
                                            data?.minAmountDetails.depositMin
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="flagShowCoupon == true && flag == data?.id"
                        class="details-tournament"
                    >
                        <div class="description-container">
                            <div
                                class="header-container grid grid-cols-1 md:grid-cols-1 gap-2"
                            >
                                <div class="pt-3 pl-6 mt-8">
                                    <div class="cotainer flex justify-center">
                                        <p
                                            class="text-3xl text-primary-content font-extrabold text-left mr-2"
                                        >
                                            {{ $t('MIS CUPONES') }}
                                        </p>
                                        <img
                                            src="https://images.virtualsoft.tech/m/msjT1656610794.png"
                                            alt="cupon"
                                            width="40"
                                            height="40"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="container mt-10 pl-3">
                                <!-- Message displayed when there are no coupons -->
                                <div
                                    v-if="coupons.length == 0"
                                    class="text-none-coupon text-lg text-black"
                                >
                                    <p class="text-center">
                                        {{
                                            $t('*NO TIENES CUPONES ACTUALMENTE')
                                        }}
                                    </p>
                                </div>
                                <div
                                    class="body-passport flex justify-center w-full flex-wrap"
                                >
                                    <!-- Loop through coupons to display each one -->
                                    <div
                                        class="sticker mr-4 mb-3 relative"
                                        v-for="coupon in coupons"
                                    >
                                        <div
                                            class="absolute"
                                            style="
												right: 22%;
												top: 79%;
												width: 121px;
												height: 47px;
											"
                                        >
                                            <p
                                                class="text-black break-words text-center text-xs"
                                                style="
													line-height: 20px !important;
												"
                                            >
                                                {{ coupon.code }}
                                            </p>
                                        </div>
                                        <div
                                            class="absolute"
                                            style="
												right: -17%;
												top: 32%;
												width: 99px;
												height: 37px;
												transform: rotatez(270deg);
											"
                                        >
                                            <p
                                                class="text-black break-words text-center"
                                                style="
													line-height: 10px;
													font-size: 9px;
												"
                                            >
                                                ID: {{ coupon.code }}
                                            </p>
                                        </div>
                                        <div
                                            class="absolute"
                                            style="
												right: 61%;
												top: 33%;
												width: 99px;
												height: 37px;
												transform: rotatez(270deg);
											"
                                        >
                                            <p
                                                class="font-extrabold text-black break-words text-center"
                                                style="font-size: 9px"
                                            >
                                                {{ $t('GANASTE UN') }}
                                            </p>
                                        </div>
                                        <img
                                            src="https://images.virtualsoft.tech/m/msjT1681937007.png"
                                            alt="sticker"
                                            width="220"
                                            height="220"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="flagShowRoad == true && flag == data?.id"
                        class="details-tournament"
                    >
                        <div
                            class="description-container overflow-auto"
                            style="padding: inherit"
                        >
                            <div class="container-road">
                                <div
                                    :style="{
										backgroundImage:
											'url(' + data?.background + ')',
									}"
                                    style="
										background-position: top;
										background-size: cover;
										height: 122vh;
										max-height: 781px;
										min-height: 781px;
									"
                                >
                                    <div
                                        :class="
											'overflow-auto road road-' +
											data?.withPrizes.length
										"
                                    >
                                        <!-- Loop through prizes to display each one -->
                                        <div
                                            class="absolute text-black"
                                            v-for="(
												item2, i
											) in data?.withPrizes"
                                        >
                                            <button
                                                class="font-extrabold w-[25px] h-[25px] md:w-[40px] md:h-[40px] bg-cover hover:scale-105 transition-all ease-in-out z-30 relative"
                                                style="
													width: 40px;
													height: 40px;
													border-radius: 50%;
												"
                                                @click="
													prizeOpen(data);
													item2.open = true;
												"
                                            >
                                                <img
                                                    v-if="
														item2.current &&
														i + 1 !=
															data?.withPrizes
																.length
													"
                                                    :src="data?.Points1"
                                                    class="w-full h-full animated"
                                                />
                                                <img
                                                    v-else-if="
														!item2.current &&
														i + 1 !=
															data?.withPrizes
																.length
													"
                                                    :src="data?.Points2"
                                                    class="w-full h-full"
                                                />
                                                <img
                                                    v-else-if="
														i + 1 ==
														data?.withPrizes.length
													"
                                                    :src="
														appComponent.config
															.raffles.assets !=
															undefined &&
														appComponent.config
															.raffles.assets[
															appComponent.country
														] != undefined &&
														appComponent.config
															.raffles.assets[
															appComponent.country
														].finalCoin != undefined
															? appComponent
																	.config
																	.raffles
																	.assets[
																	appComponent
																		.country
																].finalCoin
															: 'https://images.virtualsoft.tech/m/msjT1680023670.png'
													"
                                                    class="w-full h-full animated"
                                                />
                                            </button>
                                            <div
                                                v-if="item2.open"
                                                :class="{
													'win-top':
														i <
														data?.withPrizes
															.length /
															2,
												}"
                                                class="bg-gray-100 absolute rounded-2xl overflow-hidden win scale-75 z-50"
                                                style="
													width: 226px;
													max-width: 226px;
													height: 384px;
													max-height: 384px;
													z-index: 3;
													top: -234%;
													left: -240%;
												"
                                            >
                                                <div
                                                    class="cross cursor-pointer"
                                                    @click="
														flagShowCoupon = false
													"
                                                >
                                                    <button
                                                        aria-label="Cerrar"
                                                        class="bg-white rounded-full text-base absolute px-2 right-0 m-1 text-black"
                                                        style="
															background: linear-gradient(
																1deg,
																#00000030,
																transparent
															);
														"
                                                        @click="
															item2.open = false
														"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                                <div
                                                    class="header-popup-road text-white w-full rounded-t-lg border-1 border-solid border-[#a16300]"
                                                    style="
														background: linear-gradient(
															85deg,
															#9f6301,
															#9f6301,
															#e3c44f,
															#e3c44f,
															#9f6301c9
														);
													"
                                                >
                                                    <p
                                                        class="text-center font-extrabold py-1 m-0"
                                                        style="font-size: 18px"
                                                    >
                                                        PREMIOS
                                                    </p>
                                                </div>
                                                <div
                                                    class="awards-containers overflow-auto"
                                                    style="
														height: 370px;
														background: linear-gradient(
															13deg,
															#00000030,
															transparent
														);
													"
                                                >
                                                    <div
                                                        class="container-award-popup mb-6"
                                                        v-for="prize in item2.prizes"
                                                    >
                                                        <div
                                                            class="text-date-popup"
                                                        >
                                                            <p
                                                                class="text-center text-gray-700"
                                                                style="
																	font-size: 10px;
																"
                                                            >
                                                                {{
                                                                    $t(
                                                                        'FECHA SORTEO'
                                                                    )
                                                                }}
                                                            </p>
                                                            <p
                                                                class="text-center text-gray-700 font-bold"
                                                            >
                                                                {{
                                                                    formatDate2(
                                                                        prize.date,
                                                                        'YYYY-MM-DD h:mm:ss a'
                                                                    )
                                                                }}
                                                            </p>
                                                        </div>
                                                        <div
                                                            class="award-road flex flex-col m-auto mb-4"
                                                            style="
																width: 95%;
																font-size: 10px;
															"
                                                            v-if="
																prize.state ==
																'R'
															"
                                                        >
                                                            <div
                                                                class="title-win-coupon w-3/5 m-auto"
                                                            >
                                                                <p
                                                                    class="text-white bg-[#9f6400] w-full font-extrabold text-center mb-1"
                                                                    style="
																		font-size: 10px;
																	"
                                                                >
                                                                    {{
                                                                        $t(
                                                                            'USUARIO GANADOR'
                                                                        )
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                class="w-full rounded-r-full"
                                                            >
                                                                <p
                                                                    class="text-center text-black font-extrabold h-full m-0 overflow-auto"
                                                                >
                                                                    {{
                                                                        prize
                                                                            .userWin
                                                                            .user_id
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="award-road flex m-auto mb-4 w-3/5"
                                                            style="
																height: 21px;
																font-size: 10px;
															"
                                                            v-if="
																prize.state ==
																'A'
															"
                                                        >
                                                            <div
                                                                class="w-full bg-[#9f6400]"
                                                            >
                                                                <p
                                                                    class="text-center text-white font-bold"
                                                                >
                                                                    {{
                                                                        $t(
                                                                            'GANADOR PENDIENTE'
                                                                        )
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="section-win flex flex-col"
                                                        >
                                                            <div
                                                                class="win-coupon w-full"
                                                            >
                                                                <div
                                                                    class="title-win-coupon w-3/5 m-auto"
                                                                >
                                                                    <p
                                                                        class="text-white bg-[#9f6400] w-full font-extrabold text-center mb-1"
                                                                        style="
																			font-size: 10px;
																		"
                                                                    >
                                                                        {{
                                                                            $t(
                                                                                'CUPÓN GANADOR'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    class="container-award-win flex justify-center items-center p-1"
                                                                    style="
																		height: 88px;
																		max-height: 88px;
																	"
                                                                >
                                                                    <div
                                                                        class="body-passport w-3/5"
                                                                        v-if="
																			prize.state ==
																			'R'
																		"
                                                                    >
                                                                        <div
                                                                            class="sticker relative"
                                                                        >
                                                                            <div
                                                                                class="absolute"
                                                                                style="
																					right: 17%;
																					top: 61%;
																					width: 80px;
																					height: 47px;
																				"
                                                                            >
                                                                                <p
                                                                                    class="text-black break-words text-center"
                                                                                    style="
																						line-height: 20px !important;
																						font-size: 11px;
																					"
                                                                                >
                                                                                    {{
                                                                                        prize
                                                                                            .userWin
                                                                                            .code
                                                                                    }}
                                                                                </p>
                                                                            </div>
                                                                            <div
                                                                                class="absolute"
                                                                                style="
																					right: -21%;
																					top: 32%;
																					width: 70px;
																					height: 26px;
																					transform: rotatez(
																						270deg
																					);
																				"
                                                                            >
                                                                                <p
                                                                                    class="text-black break-words text-center"
                                                                                    style="
																						line-height: 10px;
																						font-size: 7px;
																					"
                                                                                >
                                                                                    ID:
                                                                                    {{
                                                                                        prize
                                                                                            .userWin
                                                                                            .code
                                                                                    }}
                                                                                </p>
                                                                            </div>
                                                                            <div
                                                                                class="absolute"
                                                                                style="
																					right: 42%;
																					top: 19%;
																					width: 99px;
																					height: 37px;
																					transform: rotatez(
																						270deg
																					);
																				"
                                                                            >
                                                                                <p
                                                                                    class="font-extrabold text-black break-words text-center"
                                                                                    style="
																						font-size: 5px;
																					"
                                                                                >
                                                                                    {{
                                                                                        $t(
                                                                                            'GANADOR'
                                                                                        )
                                                                                    }}
                                                                                </p>
                                                                            </div>
                                                                            <img
                                                                                src="https://images.virtualsoft.tech/m/msjT1681937007.png"
                                                                                alt="sticker"
                                                                                width="220"
                                                                                height="220"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="body-passport w-2/5"
                                                                        v-if="
																			prize.state ==
																			'A'
																		"
                                                                    >
                                                                        <div
                                                                            class="sticker relative"
                                                                        >
                                                                            <img
                                                                                src="https://images.virtualsoft.tech/m/msjT1657820853.png"
                                                                                alt="sticker"
                                                                                width="220"
                                                                                height="220"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="award-win w-full"
                                                            >
                                                                <div
                                                                    class="title-win-coupon w-3/5 m-auto"
                                                                >
                                                                    <p
                                                                        class="text-white w-full bg-[#9e6400] font-extrabold text-center mb-1"
                                                                        style="
																			font-size: 10px;
																		"
                                                                    >
                                                                        {{
                                                                            $t(
                                                                                'PREMIO'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    class="container-award-win flex justify-center items-center p-1 flex-wrap"
                                                                    style="
																		height: 88px;
																		max-height: 88px;
																	"
                                                                >
                                                                    <img
                                                                        v-if="
																			prize.type ==
																			'Fisico'
																		"
                                                                        :src="
																			prize.image
																		"
                                                                        class="w-full h-full object-contain"
                                                                        alt="premio"
                                                                        width="220"
                                                                        height="220"
                                                                    />
                                                                    <p
                                                                        v-if="
																			prize.type !=
																			'Fisico'
																		"
                                                                        class="text-black font-extrabold text-center m-0 mt-3 w-full uppercase"
                                                                        style="
																			font-size: 10px;
																		"
                                                                    >
                                                                        {{
                                                                            prize.description
                                                                        }}
                                                                    </p>
                                                                    <p
                                                                        v-if="
																			prize.type !=
																			'Fisico'
																		"
                                                                        class="text-black text-center m-0 -mt-8 w-full"
                                                                        style="
																			font-size: 16px;
																		"
                                                                    >
                                                                        {{
                                                                            prize.image
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="award-road flex m-auto mb-4"
                                                            style="
																width: 42%;
																height: 21px;
																font-size: 10px;
															"
                                                            v-if="
																prize.state ==
																'R'
															"
                                                        >
                                                            <div
                                                                class="w-full bg-success rounded-full cursor-pointer"
                                                                style="
																	background: linear-gradient(
																		1deg,
																		#0000009c,
																		transparent
																	);
																"
                                                            >
                                                                <p
                                                                    class="text-center text-white font-bold"
                                                                    @click="
																		openModal2(
																			data,
																			prize
																		)
																	"
                                                                >
                                                                    {{
                                                                        $t(
                                                                            'Ver Sorteo'
                                                                        )
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span
                                            v-if="
												data?.Interactive1 ==
												'https://images.virtualsoft.tech/m/msjT1682093102.gif'
											"
                                            class="absolute top-[277px] ml-[-242px] md:ml-[-515px] md:top-[209px]"
                                        >
											<img
                                                :src="data?.Interactive1"
                                                width="120"
                                                height="120"
                                            />
										</span>
                                        <span
                                            v-if="
												data?.Interactive1 ==
												'https://images.virtualsoft.tech/m/msjT1682092422.gif'
											"
                                            class="absolute top-[233px] ml-[-47px] md:ml-[-11px] md:top-[109px]"
                                        >
											<img
                                                :src="data?.Interactive1"
                                                width="120"
                                                height="120"
                                                class="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                                            />
										</span>
                                        <span
                                            v-if="
												data?.Interactive2 ==
												'https://images.virtualsoft.tech/m/msjT1682092958.gif'
											"
                                            class="absolute top-[363px] ml-[-164px] md:ml-[-194px] md:top-[239px]"
                                        >
											<img
                                                :src="data?.Interactive2"
                                                width="120"
                                                height="120"
                                                class="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                                            />
										</span>
                                        <span
                                            v-if="
												data?.Interactive1 ==
												'https://images.virtualsoft.tech/m/msjT1682092054.gif'
											"
                                            class="w-[70px] md:w-[120px] absolute top-[312px] ml-[60px] md:ml-[-4px] md:top-[199px]"
                                        >
											<img
                                                :src="data?.Interactive1"
                                                width="120"
                                                height="120"
                                            />
										</span>
                                        <span
                                            v-if="
												data?.Interactive1 ==
												'https://images.virtualsoft.tech/m/msjT1682434470.gif'
											"
                                            class="w-[40px] md:w-[100px] absolute top-[375px] ml-[-95px] md:ml-[-4px] md:top-[269px]"
                                        >
											<img
                                                :src="data?.Interactive1"
                                                width="120"
                                                height="120"
                                            />
										</span>
                                        <span
                                            v-if="
												data?.Interactive2 ==
												'https://images.virtualsoft.tech/m/msjT1682434615.gif'
											"
                                            class="absolute top-[272px] ml-[125px] md:ml-[214px] md:top-[231px]"
                                        >
											<img
                                                :src="data?.Interactive2"
                                                width="120"
                                                height="120"
                                            />
										</span>
                                        <span
                                            v-if="
												appComponent.modal
													.booleanNextMap
											"
                                            class="absolute top-[652px] ml-[10px] block md:hidden"
                                        >
											<img
                                                @click="nextMap(data?.id)"
                                                :src="
													appComponent.config.raffles
														.assets != undefined &&
													appComponent.config.raffles
														.assets[
														appComponent.country
													] != undefined &&
													appComponent.config.raffles
														.assets[
														appComponent.country
													].nextMap != undefined
														? appComponent.config
																.raffles.assets[
																appComponent
																	.country
															].nextMap
														: 'https://images.virtualsoft.tech/m/msjT1680544871.png'
												"
                                                width="120"
                                                height="120"
                                            />
										</span>
                                        <span
                                            v-if="
												appComponent.modal
													.openNextMap != undefined
											"
                                            class="absolute top-[652px] ml-[10px] block md:hidden"
                                        >
											<div class="relative">
												<p
                                                    class="absolute text-black text-xs top-[10px] right-[24px]"
                                                >
													{{
                                                        $t(
                                                            'Siguiente región a partir del'
                                                        )
                                                    }}
												</p>
												<p
                                                    class="absolute text-black top-[47px] right-[16px]"
                                                >
													{{
                                                        appComponent.modal
                                                            .openNextMap
                                                    }}
												</p>
												<img
                                                    src="https://images.virtualsoft.tech/m/msjT1682462336.png"
                                                    width="200"
                                                />
											</div>
										</span>
                                        <span
                                            class="absolute top-[108px] ml-[-4px] md:top-[219px] md:ml-[994px]"
                                        >
											<RouterLink
                                                @click="close()"
                                                :to="'/new-casino'"
												v-bind="analyticsAttrs('menu:nav:casino')"
                                                class="w-[108px] h-[23px] md:w-[184px] md:h-[40px] inline-block"
                                            ></RouterLink>
										</span>
                                        <span
                                            class="absolute top-[144px] ml-[12px] md:ml-[1020px] md:top-[282px]"
                                        >
											<p
                                                class="text-white text-xs md:text-base"
                                            >
												{{
                                                    appComponent.modal.coupons
                                                        ?.length
                                                }}
											</p>
										</span>
                                        <span
                                            class="absolute top-[144px] mr-[80px] md:ml-[937px] md:top-[282px]"
                                        >
											<p
                                                class="text-white text-xs md:text-base"
                                            >
												{{ numberStickers?.length }}
											</p>
										</span>
                                        <span
                                            class="arrow absolute top-[100px] mr-[200px] md:mr-[-702px] md:top-[221px]"
                                        >
											<img
                                                src="https://images.virtualsoft.tech/m/msjT1684527892.png"
                                                alt=""
                                                width="100"
                                                height="100"
                                                class="md:w-20 w-16 object-cover"
                                            />
										</span>
                                        <div
                                            v-if="data?.id == 113"
                                            class="container-group"
                                            style="margin-left: 55%"
                                        >
                                            <div
                                                class="info-terms rounded-2xl overflow-hidden mb-3 bg-white"
                                                style="
													width: 246px;
													max-width: 246px;
													height: auto;
													z-index: 2;
													font-size: 10px;
													background: linear-gradient(
														13deg,
														#00000030,
														transparent
													);
													outline: 3px ridge
														rgb(25 146 25);
												"
                                            >
                                                <div
                                                    class="more flex justify-center items-center flex-col"
                                                >
                                                    <p
                                                        class="text-black p-2 font-bold text-center uppercase read-more-wrap m-0"
                                                    >
                                                        {{ 'Fecha de sorteos'
                                                        }}<span
                                                        v-if="
																moreInfo ||
																!mobile
															"
                                                    ><br /><br />{{
                                                            'Agosto 2022'
                                                        }}<br />{{
                                                            '15 Septiembre'
                                                        }}<br />{{
                                                            '15 Octubre'
                                                        }}</span
                                                    >
                                                    </p>
                                                    <button
                                                        @click="
															moreInfo = !moreInfo
														"
                                                        aria-label="Ver más/menos"
                                                        class="text-white m-0 bg-success rounded-full px-2 mb-1 button-more"
                                                        style="
															background: linear-gradient(
																1deg,
																#0000009c,
																transparent
															);
															display: none;
														"
                                                    >
                                                        {{
                                                            moreInfo
                                                                ? 'Ver Menos'
                                                                : 'Ver Más'
                                                        }}
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                class="info-terms bg-white rounded-2xl overflow-hidden"
                                                style="
													width: 246px;
													max-width: 246px;
													height: auto;
													z-index: 2;
													font-size: 10px;
													background: linear-gradient(
														13deg,
														#00000030,
														transparent
													);
													outline: 3px ridge
														rgb(25 146 25);
												"
                                            >
                                                <div
                                                    class="more flex justify-center items-center flex-col"
                                                >
                                                    <p
                                                        class="text-black p-2 font-bold text-center uppercase m-0"
                                                    >
                                                        {{
                                                            '-Sorteo de 7 viajes a Doha'
                                                        }}<span
                                                        v-if="
																moreInfo2 ||
																!mobile
															"
                                                        class="font-light"
                                                    ><br /><br />{{
                                                            '-Incluye Pasajes, hotel y entradas a los partidos de ecuador vs Qatar / Paises bajos / Senegal'
                                                        }}</span
                                                    >
                                                    </p>
                                                    <p
                                                        class="text-black p-2 font-light text-center uppercase m-0"
                                                        v-if="
															moreInfo2 || !mobile
														"
                                                    >
                                                        {{
                                                            "-Además, podrás participar por 3 tv 65'', 1 celular de última generación, 8 camisetas originales de la selección ecuatoriana"
                                                        }}
                                                    </p>
                                                    <button
                                                        @click="
															moreInfo2 =
																!moreInfo2
														"
                                                        aria-label="Ver más/menos"
                                                        class="text-white m-0 bg-success rounded-full px-2 mb-1 button-more"
                                                        style="
															background: linear-gradient(
																1deg,
																#0000009c,
																transparent
															);
															display: none;
														"
                                                    >
                                                        {{
                                                            moreInfo2
                                                                ? 'Ver Menos'
                                                                : 'Ver Más'
                                                        }}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="
							'popuproad-' +
							data?.id +
							' modal text-base-content items-center bg-opacity-75'
						"
                        v-show="data?.open"
                    >
                        <div
                            class="modal-box bg-[#006faf]rounded-2xl relative max-h-full lg:max-h-[80%]"
                            v-if="data?.open"
                            style="
								max-width: 100%;
								height: 100%;
								background: url('https://images.virtualsoft.tech/m/msjT1682009458.png');
								background-size: cover;
							"
                        >
                            <div
                                class="w-full h-full background-modal top-0 left-0 absolute bg-[url('https://images.virtualsoft.tech/m/msjT1682009503.png')] bg-[length:1500px_800px] bg-no-repeat bg-center"
                            ></div>
                            <div class="w-full h-full md:px-8">
                                <div
                                    class="award-animation overflow-auto w-full h-full flex flex-col justify-start items-center relative z-1"
                                >
                                    <div
                                        class="cursor-pointer z-10"
                                        @click="modalClose(data)"
                                    >
                                        <button
                                            aria-label="Cerrar"
                                            class="bg-white text-black rounded-full text-2xl absolute px-2 right-0 mr-5"
                                            style="
												background: linear-gradient(
													1deg,
													#00000030,
													transparent
												);
												background-position: center;
											"
                                        >
                                            X
                                        </button>
                                    </div>
                                    <div
                                        class="w-4/5 h-10 flex justify-center items-center mb-6"
                                    >
                                        <p
                                            class="text-3xl text-white text-center font-black countdown rounded-md"
                                        >
                                            <vue-countdown
                                                v-if="!flagOpenModal2"
                                                :time="data?.datePrice"
                                                :interval="100"
                                                v-slot="{ minutes, seconds }"
                                            >
                                                {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                            <vue-countdown
                                                v-if="flagOpenModal2"
                                                :time="datePrice"
                                                :interval="100"
                                                v-slot="{ minutes, seconds }"
                                                @end="getPrize2()"
                                            >
                                                {{ minutes }} : {{ seconds }}
                                            </vue-countdown>
                                        </p>
                                    </div>
                                    <div class="w-full h-auto">
                                        <div
                                            v-if="
												data?.idPrize != undefined &&
												data?.idPrize.length > 0 &&
												!openM
											"
                                            class="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:max-h-[379px]"
                                        >
                                            <div
                                                class="w-full lg:w-1/2 h-full flex justify-center items-center"
                                            >
                                                <div
                                                    class="flex justify-start items-center flex-col w-[200px] h-full rounded-xl gap-y-3 bg-gray-200 overflow-hidden flex-nowrap"
                                                >
                                                    <p
                                                        class="w-full h-auto text-center p-2"
                                                        style="
															background: linear-gradient(
																85deg,
																rgb(159, 99, 1),
																rgb(159, 99, 1),
																rgb(
																	227,
																	196,
																	79
																),
																rgb(
																	227,
																	196,
																	79
																),
																rgba(
																	159,
																	99,
																	1,
																	0.79
																)
															);
														"
                                                    >
                                                        PREMIOS
                                                    </p>
                                                    <p
                                                        class="w-full text-center text-xs"
                                                    >
                                                        {{
                                                            formatDate2(
                                                                data?.datePrice,
                                                                'YYYY-MM-DD h:mm:ss a'
                                                            )
                                                        }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        ID GANADOR:
                                                    </p>
                                                    <p
                                                        class="w-4/5 text-black text-center"
                                                    >
                                                        {{ data?.user_id }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        CUPÓN GANADOR:
                                                    </p>
                                                    <img
                                                        class=""
                                                        src="https://images.virtualsoft.tech/m/msjT1681937007.png"
                                                        alt="background"
                                                        width="100"
                                                        height="50"
                                                    />
                                                    <p class="text-xs">
                                                        ID: {{ data?.idPrize }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        PREMIO GANADOR:
                                                    </p>
                                                    <div
                                                        v-if="
															data?.type ==
															'Fisico'
														"
                                                        class="img-container w-[80px] h-[80px]"
                                                    >
                                                        <img
                                                            :src="data?.image"
                                                            width="100"
                                                            height="100"
                                                            alt=""
                                                            class="w-full h-hull object-contain"
                                                        />
                                                    </div>
                                                    <div v-else>
                                                        <p
                                                            class="w-full text-black text-center"
                                                        >
                                                            {{
                                                                data?.description2
                                                            }}
                                                        </p>
                                                        <p
                                                            class="w-full text-black text-center"
                                                        >
                                                            {{ data?.image }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="w-full lg:w-1/2 h-full flex justify-center items-center"
                                            >
                                                <img
                                                    class="w-full h-full object-contain"
                                                    src="https://images.virtualsoft.tech/site/doradobet/gif/Tragamonedas-Correccion-final.gif"
                                                    alt=""
                                                    width="300"
                                                    height="100"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            v-if="openM"
                                            class="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:max-h-[379px]"
                                        >
                                            <div
                                                class="w-full lg:w-1/2 h-full flex justify-center items-center"
                                            >
                                                <div
                                                    class="flex justify-start items-center flex-col w-[200px] h-full rounded-xl gap-y-3 bg-gray-200 overflow-hidden flex-nowrap"
                                                >
                                                    <p
                                                        class="w-full h-auto text-center p-2 text-white font-bold"
                                                        style="
															background: linear-gradient(
																85deg,
																rgb(159, 99, 1),
																rgb(159, 99, 1),
																rgb(
																	227,
																	196,
																	79
																),
																rgb(
																	227,
																	196,
																	79
																),
																rgba(
																	159,
																	99,
																	1,
																	0.79
																)
															);
														"
                                                    >
                                                        PREMIOS
                                                    </p>
                                                    <p
                                                        class="w-full text-center text-xs"
                                                    >
                                                        {{
                                                            formatDate2(
                                                                openDATE,
                                                                'YYYY-MM-DD h:mm:ss a'
                                                            )
                                                        }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        ID GANADOR:
                                                    </p>
                                                    <p
                                                        class="w-4/5 text-black text-center"
                                                    >
                                                        {{ openUG }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        CUPÓN GANADOR:
                                                    </p>
                                                    <img
                                                        class=""
                                                        src="https://images.virtualsoft.tech/m/msjT1681937007.png"
                                                        alt="background"
                                                        width="100"
                                                        height="50"
                                                    />
                                                    <p class="text-xs">
                                                        ID: {{ openMC }}
                                                    </p>
                                                    <p
                                                        class="w-4/5 bg-[#9f6400] text-white text-center"
                                                    >
                                                        PREMIO GANADOR:
                                                    </p>
                                                    <div
                                                        v-if="
															openTYPE == 'Fisico'
														"
                                                        class="img-container w-[80px] h-[80px]"
                                                    >
                                                        <img
                                                            :src="openIMG"
                                                            width="100"
                                                            height="100"
                                                            alt=""
                                                            class="w-full h-hull object-contain"
                                                        />
                                                    </div>
                                                    <div v-else>
                                                        <p
                                                            class="w-full text-black text-center"
                                                        >
                                                            {{ openIMG1 }}
                                                        </p>
                                                        <p
                                                            class="w-full text-black text-center"
                                                        >
                                                            {{ openIMG }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="w-full lg:w-1/2 h-full flex justify-center items-center"
                                            >
                                                <img
                                                    class="w-full h-full object-contain"
                                                    src="https://images.virtualsoft.tech/site/doradobet/gif/Tragamonedas-Correccion-final.gif"
                                                    alt=""
                                                    width="300"
                                                    height="100"
                                                />
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
    </div>
</template>
<style scoped>
/* Container styles with important background color */
.containar {
	background: white !important; /* Sets background color to white */
}

/* Arrow animation for movement */
.arrow {
	animation: arrow 2s ease-in-out infinite alternate-reverse; /* Animation for arrow movement */
}

/* Keyframes for arrow animation */
@keyframes arrow {
	0% {
		transform: translateX(-30px); /* Start position */
	}
	100% {
		transform: translateX(20px); /* End position */
	}
}

/* Animated class for scaling effect */
.animated {
	animation: scale 5s ease-in-out infinite; /* Infinite scaling animation */
}

/* Keyframes for scaling animation */
@keyframes scale {
	0% {
		transform: scale(1); /* Original size */
	}
	50% {
		transform: scale(1.2); /* Scaled up */
	}
	100% {
		transform: scale(1); /* Back to original size */
	}
}

/* Container styles with shadow and background effects */
.containar {
	box-shadow: inset 0px 4px 7px white !important; /* Inner shadow */
	background: rgba(255, 255, 255, 90%); /* Semi-transparent background */
	border-radius: 16px; /* Rounded corners */
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Outer shadow */
	backdrop-filter: blur(5.1px); /* Background blur effect */
	-webkit-backdrop-filter: blur(5.1px); /* Safari support for blur */
	border: 1px solid rgba(255, 255, 255, 0.47); /* Light border */
}

/* Close button styles with inner shadow */
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important; /* Inner shadow effect */
}

/* Modal background color */
.modal {
	background-color: #0000004f !important; /* Semi-transparent black background */
}

/* Submit button styles with inner shadow */
.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important; /* Inner shadow effect */
}

/* Image test animation */
.img-test {
	animation: test 1s infinite; /* Infinite test animation */
}

/* Image test animation with longer duration */
.img-testa {
	animation: test 2.5s infinite; /* Infinite test animation */
}

/* Keyframes for test animation */
@keyframes test {
	0% {
		opacity: 0; /* Start invisible */
		transform: scale(0); /* Start scaled down */
	}
	50% {
		opacity: 1; /* Fully visible */
		transform: scale(2); /* Scaled up */
	}
	100% {
		opacity: 0; /* Back to invisible */
		transform: scale(0); /* Back to scaled down */
	}
}

/* Keyframes for another test animation (duplicate) */
@keyframes test2 {
	0% {
		opacity: 0; /* Start invisible */
		transform: scale(0); /* Start scaled down */
	}
	50% {
		opacity: 1; /* Fully visible */
		transform: scale(2); /* Scaled up */
	}
	100% {
		opacity: 0; /* Back to invisible */
		transform: scale(0); /* Back to scaled down */
	}
}

/* Keyframes for popup background entering animation */
@keyframes popup-bg-enter {
	0% {
		display: none; /* Start hidden */
		opacity: 0; /* Start invisible */
	}
	1% {
		display: block; /* Show block */
		opacity: 0; /* Still invisible */
	}
	100% {
		opacity: 1; /* Fully visible */
	}
}

/* Keyframes for popup background closing animation */
@keyframes popup-bg-closed {
	0% {
		display: block !important; /* Start visible */
		opacity: 1; /* Fully visible */
	}
	1% {
		display: block; /* Still visible */
		opacity: 1; /* Still fully visible */
	}
	100% {
		opacity: 0; /* Fade out */
		display: none !important; /* Hide */
	}
}

/* Keyframes for popup entering animation */
@keyframes popup-enter {
	0% {
		display: none; /* Start hidden */
		opacity: 0; /* Start invisible */
	}
	1% {
		display: block; /* Show block */
		opacity: 0; /* Still invisible */
		transform: scale(0); /* Start scaled down */
	}
	100% {
		opacity: 1; /* Fully visible */
		transform: scale(1); /* Back to original size */
	}
}

/* Keyframes for popup closing animation */
@keyframes popup-closed {
	0% {
		display: block !important; /* Start visible */
		opacity: 1; /* Fully visible */
	}
	1% {
		display: block; /* Still visible */
		opacity: 1; /* Still fully visible */
		transform: scale(1); /* Original size */
	}
	100% {
		opacity: 0; /* Fade out */
		transform: scale(0); /* Scale down */
		display: none !important; /* Hide */
	}
}

/* Road styles for layout */
.road {
	display: flex; /* Flexbox layout */
	align-items: center; /* Center items vertically */
	justify-content: space-around; /* Space items evenly */
	height: 100%; /* Full height */
	position: relative; /* Positioning context */
}

/* Specific positioning for road-1 elements */
.road.road-1 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-1 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-2 elements */
.road.road-2 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-2 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-2 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-2 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-3 elements */
.road.road-3 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-3 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-3 > div:nth-child(3) {
	bottom: 381px; /* Vertical position */
	margin-left: -450px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-3 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-3 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-3 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-4 elements */
.road.road-4 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-4 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-4 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-4 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-4 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-4 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-4 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-4 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-5 elements */
.road.road-5 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-5 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-5 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-5 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-5 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-5 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-5 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-5 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-5 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-5 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-6 elements */
.road.road-6 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-6 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-6 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-6 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-6 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-6 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-6 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-6 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-6 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-6 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-6 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-6 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-7 elements */
.road.road-7 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-7 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-7 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-7 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-7 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-7 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-7 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-7 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-7 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-8 elements */
.road.road-8 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-8 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-8 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-8 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-8 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-8 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-8 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-8 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-8 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-8 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-9 elements */
.road.road-9 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-9 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-9 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-9 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-9 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-9 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-9 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-9 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

.road.road-9 > div:nth-child(9) {
	bottom: 240px; /* Vertical position */
	margin-left: 342px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-9 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}

	.road.road-9 > div:nth-child(9) {
		top: 440px; /* Adjusted vertical position */
		margin-left: -199px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-10 elements */
.road.road-10 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-10 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-10 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-10 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-10 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-10 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-10 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-10 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

.road.road-10 > div:nth-child(9) {
	bottom: 240px; /* Vertical position */
	margin-left: 342px; /* Horizontal position */
}

.road.road-10 > div:nth-child(10) {
	bottom: 223px; /* Vertical position */
	margin-left: 482px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-10 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(9) {
		top: 440px; /* Adjusted vertical position */
		margin-left: -199px; /* Adjusted horizontal position */
	}

	.road.road-10 > div:nth-child(10) {
		top: 483px; /* Adjusted vertical position */
		margin-left: -158px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-11 elements */
.road.road-11 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-11 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-11 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-11 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-11 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-11 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-11 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-11 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

.road.road-11 > div:nth-child(9) {
	bottom: 240px; /* Vertical position */
	margin-left: 342px; /* Horizontal position */
}

.road.road-11 > div:nth-child(10) {
	bottom: 223px; /* Vertical position */
	margin-left: 482px; /* Horizontal position */
}

.road.road-11 > div:nth-child(11) {
	bottom: 207px; /* Vertical position */
	margin-left: 607px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-11 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(9) {
		top: 440px; /* Adjusted vertical position */
		margin-left: -199px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(10) {
		top: 483px; /* Adjusted vertical position */
		margin-left: -158px; /* Adjusted horizontal position */
	}

	.road.road-11 > div:nth-child(11) {
		top: 501px; /* Adjusted vertical position */
		margin-left: -59px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-12 elements */
.road.road-12 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-12 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-12 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-12 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-12 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-12 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-12 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-12 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

.road.road-12 > div:nth-child(9) {
	bottom: 240px; /* Vertical position */
	margin-left: 342px; /* Horizontal position */
}

.road.road-12 > div:nth-child(10) {
	bottom: 223px; /* Vertical position */
	margin-left: 482px; /* Horizontal position */
}

.road.road-12 > div:nth-child(11) {
	bottom: 207px; /* Vertical position */
	margin-left: 607px; /* Horizontal position */
}

.road.road-12 > div:nth-child(12) {
	bottom: 200px; /* Vertical position */
	margin-left: 746px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-12 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(9) {
		top: 440px; /* Adjusted vertical position */
		margin-left: -199px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(10) {
		top: 483px; /* Adjusted vertical position */
		margin-left: -158px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(11) {
		top: 501px; /* Adjusted vertical position */
		margin-left: -59px; /* Adjusted horizontal position */
	}

	.road.road-12 > div:nth-child(12) {
		top: 539px; /* Adjusted vertical position */
		margin-left: 18px; /* Adjusted horizontal position */
	}
}

/* Specific positioning for road-13 elements */
.road.road-13 > div:nth-child(1) {
	top: 353px; /* Vertical position */
	margin-left: -706px; /* Horizontal position */
}

.road.road-13 > div:nth-child(2) {
	bottom: 385px; /* Vertical position */
	margin-left: -564px; /* Horizontal position */
}

.road.road-13 > div:nth-child(3) {
	bottom: 386px; /* Vertical position */
	margin-left: -443px; /* Horizontal position */
}

.road.road-13 > div:nth-child(4) {
	bottom: 372px; /* Vertical position */
	margin-left: -304px; /* Horizontal position */
}

.road.road-13 > div:nth-child(5) {
	bottom: 355px; /* Vertical position */
	margin-left: -171px; /* Horizontal position */
}

.road.road-13 > div:nth-child(6) {
	bottom: 331px; /* Vertical position */
	margin-left: -43px; /* Horizontal position */
}

.road.road-13 > div:nth-child(7) {
	bottom: 304px; /* Vertical position */
	margin-left: 86px; /* Horizontal position */
}

.road.road-13 > div:nth-child(8) {
	bottom: 269px; /* Vertical position */
	margin-left: 218px; /* Horizontal position */
}

.road.road-13 > div:nth-child(9) {
	bottom: 240px; /* Vertical position */
	margin-left: 342px; /* Horizontal position */
}

.road.road-13 > div:nth-child(10) {
	bottom: 223px; /* Vertical position */
	margin-left: 482px; /* Horizontal position */
}

.road.road-13 > div:nth-child(11) {
	bottom: 207px; /* Vertical position */
	margin-left: 607px; /* Horizontal position */
}

.road.road-13 > div:nth-child(12) {
	bottom: 200px; /* Vertical position */
	margin-left: 746px; /* Horizontal position */
}

.road.road-13 > div:nth-child(13) {
	bottom: 200px; /* Vertical position */
	margin-left: 868px; /* Horizontal position */
}

/* Media query for responsive design */
@media only screen and (max-width: 1023px) {
	.road.road-13 > div:nth-child(1) {
		top: 266px; /* Adjusted vertical position */
		margin-left: 81px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(2) {
		top: 289px; /* Adjusted vertical position */
		margin-left: -12px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(3) {
		top: 297px; /* Adjusted vertical position */
		margin-left: -99px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(4) {
		top: 321px; /* Adjusted vertical position */
		margin-left: -182px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(5) {
		top: 352px; /* Adjusted vertical position */
		margin-left: -123px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(6) {
		top: 360px; /* Adjusted vertical position */
		margin-left: -39px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(7) {
		top: 400px; /* Adjusted vertical position */
		margin-left: -32px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(8) {
		top: 414px; /* Adjusted vertical position */
		margin-left: -114px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(9) {
		top: 440px; /* Adjusted vertical position */
		margin-left: -199px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(10) {
		top: 483px; /* Adjusted vertical position */
		margin-left: -158px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(11) {
		top: 501px; /* Adjusted vertical position */
		margin-left: -59px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(12) {
		top: 539px; /* Adjusted vertical position */
		margin-left: 18px; /* Adjusted horizontal position */
	}

	.road.road-13 > div:nth-child(13) {
		top: 594px; /* Adjusted vertical position */
		margin-left: 21px; /* Adjusted horizontal position */
	}
}

/* Win top positioning */
.win-top {
	top: 0px !important; /* Fixed top position */
}

/* Media query for small screens */
@media (max-width: 600px) {
	.road .win {
		transform: scale(0.7); /* Scale down for small screens */
		margin-left: -43px; /* Adjusted horizontal position */
		margin-top: -153px; /* Adjusted vertical position */
	}

	.win-top {
		margin-left: -60px !important; /* Adjusted horizontal position */
		margin-top: -42px !important; /* Adjusted vertical position */
	}
}

/* Media query for larger screens */
@media (min-width: 890px) {
	.img-award {
		margin-left: 738px; /* Adjusted horizontal position */
		top: 111px !important; /* Fixed vertical position */
	}
}

/* Background popup animation */
.background-popup {
	-webkit-animation: spin 4s linear infinite; /* Continuous spinning animation */
	-moz-animation: spin 4s linear infinite; /* Firefox support */
	animation: spin 4s linear infinite; /* Standard animation */
}

/* Keyframes for spinning animation */
@-moz-keyframes spin {
	100% {
		-moz-transform: rotate(360deg); /* Full rotation */
	}
}

@-webkit-keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* Full rotation */
	}
}

@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* Full rotation */
		transform: rotate(360deg); /* Full rotation */
	}
}

/* Background popup notification animation */
.background-popupnotification {
	-webkit-animation: spin2 30s linear infinite; /* Continuous spinning animation */
	-moz-animation: spin2 30s linear infinite; /* Firefox support */
	animation: spin2 30s linear infinite; /* Standard animation */
}

/* Keyframes for second spinning animation */
@-moz-keyframes spin2 {
	100% {
		-moz-transform: rotate(360deg); /* Full rotation */
	}
}

@-webkit-keyframes spin2 {
	100% {
		-webkit-transform: rotate(360deg); /* Full rotation */
	}
}

@keyframes spin2 {
	100% {
		-webkit-transform: rotate(360deg); /* Full rotation */
		transform: rotate(360deg); /* Full rotation */
	}
}

/* Side small animation */
.side-small {
	-webkit-animation: side-small 4s linear infinite; /* Continuous side rotation */
	-moz-animation: side-small 4s linear infinite; /* Firefox support */
	animation: side-small 4s linear infinite; /* Standard animation */
}

/* Keyframes for side small animation */
@-moz-keyframes side-small {
	100% {
		-moz-transform: rotate(-360deg); /* Full rotation */
	}
}

@-webkit-keyframes side-small {
	100% {
		-webkit-transform: rotate(-360deg); /* Full rotation */
	}
}

@keyframes side-small {
	100% {
		-webkit-transform: rotate(-360deg); /* Full rotation */
		transform: rotate(-360deg); /* Full rotation */
	}
}

/* Ball animation */
.ball {
	-webkit-animation: ball 2s alternate infinite ease-in; /* Bouncing animation */
	-moz-animation: ball 2s alternate infinite ease-in; /* Firefox support */
	animation: ball 2s alternate infinite ease-in; /* Standard animation */
}

/* Keyframes for ball animation */
@keyframes ball {
	0% {
		transform: scale(1); /* Original size */
	}
	100% {
		transform: scale(1.1); /* Slightly larger */
	}
}

@-webkit-keyframes ball {
	0% {
		-webkit-transform: scale(1); /* Original size */
	}
	100% {
		-webkit-transform: scale(1.1); /* Slightly larger */
	}
}

@-moz-keyframes ball {
	0% {
		-moz-transform: scale(1); /* Original size */
	}
	100% {
		-moz-transform: scale(1.1); /* Slightly larger */
	}
}

/* Award notification animation */
.award-notification {
	-webkit-animation: award-notification 3.5s alternate ease-in; /* Notification animation */
	-moz-animation: award-notification 3.5s alternate ease-in; /* Firefox support */
	animation: award-notification 3.5s alternate ease-in; /* Standard animation */
}

/* Keyframes for award notification animation */
@keyframes award-notification {
	0% {
		opacity: 0; /* Start invisible */
		transform: scale(0); /* Start scaled down */
	}
	50% {
		opacity: 0; /* Still invisible */
	}
	100% {
		opacity: 1; /* Fully visible */
		transform: scale(1); /* Back to original size */
	}
}

/* Text coupon animation */
.text-coupon {
	animation-name: coupon; /* Coupon animation */
	animation-duration: 5.16s; /* Duration of animation */
	animation-delay: 0s; /* No delay */
	animation-iteration-count: 1; /* Only once */
	opacity: 1; /* Fully visible */
}

/* Coupon scrape animation */
.coupon-scrape {
	animation-name: coupon-scrape; /* Scrape animation */
	animation-duration: 5.16s; /* Duration of animation */
	animation-delay: 0s; /* No delay */
	animation-iteration-count: 1; /* Only once */
	opacity: 0; /* Start invisible */
}

/* Keyframes for coupon animation */
@keyframes coupon {
	0% {
		opacity: 0; /* Start invisible */
		display: none; /* Start hidden */
	}
	49% {
		opacity: 0; /* Still invisible */
		display: none; /* Still hidden */
	}
	50% {
		display: block; /* Show block */
		opacity: 1; /* Fully visible */
	}
	99% {
		display: block; /* Still visible */
		opacity: 1; /* Still fully visible */
	}
	100% {
		display: block; /* Still visible */
		opacity: 1; /* Still fully visible */
	}
}

/* Keyframes for coupon scrape animation */
@keyframes coupon-scrape {
	100% {
		opacity: 0; /* Fade out */
		display: none; /* Hide */
	}
	99% {
		display: block; /* Still visible */
		opacity: 1; /* Fully visible */
	}
	0% {
		display: block; /* Start visible */
		opacity: 1; /* Fully visible */
	}
}
</style>

<!-- FILE DOCUMENTED -->
