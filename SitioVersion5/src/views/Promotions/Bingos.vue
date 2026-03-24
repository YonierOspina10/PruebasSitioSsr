<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import router from '@/router'; // Importing the router for navigation
import moment from 'moment'; // Importing moment.js for date formatting
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Importing animated close icon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing exit icon component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition

export default defineComponent({
	components: {
		animatedCloseIcon, // Registering animated close icon component
		ExitIcon, // Registering exit icon component
	},
	data: function () {
		// Defining component data
		let config = this.$config(); // Configuration object
		let emitter = this.$emitter(); // Event emitter for communication
		let appComponent: any = this.$appComponent; // Reference to the app component
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let flag: string = ''; // Flag for state management
		let container: any = undefined; // Container for DOM manipulation
		let scrollAmount: any = undefined; // Amount scrolled for side scrolling
		let slideTimer: any = ''; // Timer for slide animation
		let country: any = {}; // Country data
		let more: boolean = false; // Flag for additional options
		let roomFilter: string = ''; // Filter for rooms
		let stateFilter: string = 'SELLING'; // Filter for state
		let auth_token: string = ''; // Authentication token
		let bingos: any = []; // Array to hold bingo data
		let raffles: any = []; // Array to hold raffle data
		let raffleSelected: any = []; // Selected raffle data
		let routes: any = []; // Routes for navigation
		let showGame: boolean = false; // Flag to show game
		let model: any = {}; // Model for input data
		let login: any = false; // Login state
		let moneda_nom: any = undefined; // Currency name
		let allRaffles: any = []; // All raffle data
		let now: any = new Date(); // Current date
		let background: string = ''; // Background image URL
		let iframeSrc: string = ''; // Source for iframe
		let awardSelected: any = ''; // Selected award data
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
			roomFilter,
			stateFilter,
			auth_token,
			bingos,
			raffles,
			routes,
			showGame,
			model,
			login,
			moneda_nom,
			allRaffles,
			now,
			background,
			iframeSrc,
			awardSelected,
		};
	},
	unmounted() {
		// Lifecycle hook called when component is unmounted
		this.emitter.all.delete('accept:modal'); // Removing event listener for modal acceptance
	},
	mounted() {
		// Lifecycle hook called when component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing modal on event
		});
		if (this.config.bingo == undefined || !this.config.bingo) {
			router.push('/'); // Redirecting to home if bingo is not configured
		}
		if (this.appComponent.session.logueado) {
			this.login = 'login'; // Setting login state if user is logged in
		} else {
			if (!this.appComponent.session.logueado) {
				this.login = 'notLogin'; // Setting login state if user is not logged in
			}
		}
		this.moneda_nom = this.appComponent.session.moneda_nom; // Setting currency name from session
		this.getBingos(); // Fetching bingo data
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['backgrounds'] != undefined &&
			this.config['not_login']['backgrounds']['bg_bingos'] != undefined
		) {
			this.background =
				this.config['not_login']['backgrounds']['bg_bingos']; // Setting background for not logged in users
		} else {
			if (
				this.config != undefined &&
				this.config['backgrounds'] != undefined &&
				this.config['backgrounds'][this.appComponent.country] !=
					undefined &&
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				] != undefined &&
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				][this.login] != undefined &&
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				][this.login]['bingos'] != undefined &&
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				][this.login]['bingos']['backgrounds'] != undefined &&
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				][this.login]['bingos']['backgrounds'].length > 0
			) {
				this.background =
					this.config['backgrounds'][this.appComponent.country][
						this.appComponent.lngProd
					][this.login]['bingos']['backgrounds'][0].url; // Setting background for logged in users
			}
		}
	},
	methods: {
		/**
		 * Validates that the input is an integer.
		 * @param event - The input event.
		 * @param gameCode - The code of the game.
		 */
		validateInteger(event: Event, gameCode: string) {
			const input = event.target as HTMLInputElement; // Casting event target to HTMLInputElement
			const value = input.value; // Getting input value
			if (!/^\d+$/.test(value)) {
				input.value = value.slice(0, -1); // Removing last character if not a digit
			}
			this.model[gameCode] = input.value; // Updating model with input value
		},
		/**
		 * Closes the modal.
		 */
		closeModal() {
			this.appComponent.closeModal(); // Closing modal via app component
		},
		/**
		 * Formats the date based on the timestamp.
		 * @param timestamp - The timestamp to format.
		 * @returns The difference in milliseconds from now.
		 */
		formatDate(timestamp: any) {
			let newYear: any = new Date(timestamp); // Creating a new date object
			return newYear - this.now; // Returning the difference from now
		},
		/**
		 * Formats a date string to a specified format.
		 * @param dateString - The date string to format.
		 * @param format - The format to apply.
		 * @returns The formatted date string.
		 */
		formatDate2(dateString: any, format: string) {
			const date = new Date(dateString); // Creating a new date object
			return moment(date).format(format); // Formatting date using moment.js
		},
		/**
		 * Navigates to the raffle details based on login state.
		 * @param id - The ID of the raffle.
		 */
		navigate(id: any) {
			if (this.appComponent.session.logueado) {
				this.detailsRaffle(id); // Fetching raffle details if logged in
			} else {
				this.clickButtonLogin(); // Triggering login modal if not logged in
			}
		},
		/**
		 * Changes the main flag for state management.
		 * @param id - The ID to set as the flag.
		 */
		changeMain(id) {
			if (this.flag != id) {
				this.flag = id; // Setting flag if different
			} else {
				this.flag = ''; // Resetting flag if the same
			}
		},
		/**
		 * Scrolls the container to the right.
		 * @param item - The item to scroll.
		 */
		rightScroll(item) {
			this.container = document.querySelector('.a' + item); // Selecting the container
			this.sideScroll(this.container, 'right', 25, 200, 20); // Initiating side scroll
		},
		/**
		 * Scrolls the container to the left.
		 * @param item - The item to scroll.
		 */
		leftScroll(item) {
			this.container = document.querySelector('.a' + item); // Selecting the container
			this.sideScroll(this.container, 'left', 25, 200, 20); // Initiating side scroll
		},
		/**
		 * Handles side scrolling of an element.
		 * @param element - The element to scroll.
		 * @param direction - The direction to scroll ('left' or 'right').
		 * @param speed - The speed of the scroll.
		 * @param distance - The total distance to scroll.
		 * @param step - The amount to scroll each step.
		 */
		sideScroll(element, direction, speed, distance, step) {
			this.scrollAmount = 0; // Initializing scroll amount
			this.slideTimer = setInterval(() => {
				if (direction == 'left') {
					element.scrollLeft -= step; // Scrolling left
				} else {
					element.scrollLeft += step; // Scrolling right
				}
				this.scrollAmount += step; // Updating scroll amount
				if (this.scrollAmount >= distance) {
					window.clearInterval(this.slideTimer); // Clearing interval when distance is reached
				}
			}, speed);
		},
		/**
		 * Fetches bingo data from the API.
		 */
		getBingos() {
			const params = {
				country: this.appComponent.country, // Country parameter for API request
				filter: {
					state: this.stateFilter, // State filter for API request
				},
			};
			this.allRaffles = []; // Resetting all raffles
			apiService.request('get_rooms', params).then((response: any) => {
				if (response.code == 0) {
					this.moneda_nom = response.data.currency; // Setting currency from response
					response.data.rooms?.forEach((input) => {
						input.name = input.room.name; // Setting room name
						input.value = input.room.id; // Setting room ID
						input.roomName = input.room.id; // Setting room name for reference
						const params = {
							country: this.appComponent.country, // Country parameter for raffle request
							filter: {
								state: this.stateFilter, // State filter for raffle request
							},
							roomName: input.room.name, // Room name for raffle request
						};
						apiService
							.request('get_raffles', params)
							.then((response: any) => {
								if (response.code == 0) {
									response.data.raffles.forEach((raffle) => {
										raffle.roomName = input.room.name; // Setting room name for raffle
										raffle.closingDate2 =
											raffle.closingDate; // Storing original closing date
										raffle.closingDate = this.formatDate(
											raffle.closingDate // Formatting closing date
										);
										this.allRaffles.push(raffle); // Adding raffle to all raffles
									});
								}
							});
					});
					this.roomFilter = '0'; // Resetting room filter
					this.raffles = this.allRaffles; // Setting raffles to all raffles
					this.bingos = response.data.rooms; // Setting bingos from response
				}
			});
			window.addEventListener('click', function (e: any) {
				if (
					document.getElementsByClassName('container-awards').length >
					0
				) {
					for (
						let i = 0;
						i <
						document.getElementsByClassName('container-awards')
							.length;
						i++
					) {
						if (
							!(
								document.getElementsByClassName(
									'container-awards'
								)[i] as HTMLElement
							).contains(e.target)
						) {
							(
								document.getElementsByClassName(
									'container-awards'
								)[i] as HTMLElement
							).style.display = 'none'; // Hiding awards container if clicked outside
						}
					}
				}
			});
		},
		/**
		 * Shows the awards container for a specific code.
		 * @param code - The code of the awards container to show.
		 */
		showAwards(code) {
			(
				document.getElementsByClassName(
					'container-awards-' + code
				)[0] as HTMLElement
			).style.display = 'block'; // Displaying the awards container
		},
		/**
		 * Changes the room based on the selected filter.
		 */
		changeRoom() {
			const vthis = this; // Reference to the current context
			if (this.roomFilter != '0') {
				let bingo = this.bingos.filter(function (item) {
					return item.room.id == vthis.roomFilter; // Filtering bingos based on room filter
				})[0];
				this.raffles = bingo.raffles; // Setting raffles based on selected bingo
				this.raffles.forEach((raffle) => {
					raffle.roomName = bingo.room.name; // Setting room name for raffle
					raffle.closingDate2 = raffle.closingDate; // Storing original closing date
					raffle.closingDate = this.formatDate(raffle.closingDate); // Formatting closing date
					var index = this.allRaffles.findIndex(function (item) {
						return item.gameCode == raffle.gameCode; // Finding index of the raffle in all raffles
					});
					raffle.awards = this.allRaffles[index].awards; // Setting awards for the raffle
				});
			} else {
				this.raffles = this.allRaffles; // Resetting raffles to all if no filter
			}
		},
		/**
		 * Triggers the login modal.
		 */
		clickButtonLogin(): void {
			this.appComponent.showModalLogin = true; // Showing login modal
		},
		/**
		 * Fetches details of a specific raffle.
		 * @param id - The ID of the raffle.
		 */
		detailsRaffle(id) {
			this.showGame = true; // Setting flag to show game
			const params = {
				gameCode: id, // Game code for the raffle
				token: this.appComponent.tokenUser, // User token for authentication
				lang: this.appComponent.lngProd, // Language for the request
			};
			apiService
				.request('launch_game_bingo', params)
				.then((response: any) => {
					if (response.code == 0) {
						this.iframeSrc = response.data; // Setting iframe source from response
					}
				});
		},
		/**
		 * Places a bet on a raffle.
		 * @param id - The ID of the raffle.
		 * @param amount - The amount to bet.
		 * @returns A boolean indicating success or failure.
		 */
		betRaffle(id, amount) {
			if (this.model[id] == undefined || this.model[id] <= 0) {
				return false; // Returning false if model is invalid
			}
			if (!this.appComponent.session.logueado) {
				this.clickButtonLogin(); // Triggering login if not logged in
				return false; // Returning false
			}
			let cant = this.model[id]; // Getting the amount from model
			let bonus = this.raffles.filter((bono) => bono.gameCode === id); // Filtering bonuses based on game code
			if (cant >= bonus[0].minCardsByTransaction) {
				const params = {
					gameCode: id, // Game code for the bet
					amount: amount, // Amount to bet
					NumCards: this.model[id], // Number of cards from model
				};
				apiService
					.request('secuencial_external_bet', params)
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification', // Showing notification modal
								titleModal: this.$t('Mensaje'), // Title for the modal
								messageModal: this.$t(
									'Su compra fue realizada satisfactoriamente.' // Success message
								),
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Action on close
							};
							this.appComponent.refreshBalance(); // Refreshing balance after successful bet
							this.model = {}; // Resetting model
						} else {
							var error_mensaje = ''; // Initializing error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Setting error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Showing notification modal
								titleModal: this.$t('Error!'), // Title for the modal
								messageModal: error_mensaje, // Error message
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Action on close
							};
						}
					});
			} else {
				this.appComponent.modal = {
					showModal: 'notification', // Showing notification modal
					titleModal: this.$t('Error!'), // Title for the modal
					messageModal:
						this.$t('La minima compra de cartones es de ') +
						bonus[0].minCardsByTransaction, // Minimum purchase error message
					buttonModal: this.$t('Aceptar'), // Button text
					orderModal: 'closeModal', // Action on close
				};
			}
		},
		/**
		 * Closes the game view.
		 */
		closeGame() {
			this.showGame = false; // Hiding game view
		},
	},
});
</script>
<template>
	<!-- Main container for the casino content -->
	<div id="casino-content" class="old-lobby h-full">
		<!-- Lobby section for casino games -->
		<div id="lobby-casino">
			<!-- Overflow container for big games, shown conditionally -->
			<div class="big-games-overflow" v-if="showGame">
				<!-- Background for big game section -->
				<div class="big-game-background">
					<!-- Container for big game content with dynamic background -->
					<div
						class="big-game-contain"
						class-on-scroll="scrolled,notscrolled"
						:style="{
							backgroundImage: 'url(' + config.casino.bg + ')',
							backgroundSize: 'cover',
						}"
					>
						<!-- Animated casual game container -->
						<div
							class="casual-game animate__animated animate__zoomIn animate__faster"
						>
							<!-- Container for casino game controls -->
							<div class="casino-game-contain">
								<!-- Flash game container -->
								<div class="flash-game-contain">
									<!-- Control section for the big game -->
									<div class="big-game-control">
										<!-- Delete icon for closing the game -->
										<div class="icon-delete">
											<a
												title="close"
												@click="closeGame()"
											>
												<animatedCloseIcon
													:fill="'white'"
													:width="20"
													:height="20"
													class="absolute bottom-3 left-2 text-white cursor-pointer"
												></animatedCloseIcon>
											</a>
										</div>
										<!-- Logo container -->
										<div class="div-logo-j">
											<img :src="config.logo" />
										</div>
									</div>
									<!-- Iframe for game content -->
									<iframe
                                        class="w-[100vw] h-[100vh]"
										id="game-content"
										number-of-window="1"
										initial-width=""
										initial-height=""
										aspect-ratio="16:9"
										:src="iframeSrc"
                                        allow="clipboard-read; clipboard-write"
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Tournaments page container, shown conditionally based on layout -->
	<div
		v-if="config.layout != 3"
		class="tournaments-page torneos"
		:style="{
			backgroundImage: 'url(' + background + ')',
			backgroundSize: 'cover',
		}"
	>
		<!-- Container for tournament filters -->
		<div class="container-tournaments">
			<div class="container-filter">
				<!-- Filter section for selecting room and state -->
				<div class="filter col-12 col-md-6">
					<span class="filters-section">
						<strong>Sala:</strong>
						<select v-model="roomFilter" @change="changeRoom()">
							<option value="0">{{ $t('Todas') }}</option>
							<option
								v-for="option in bingos"
								:value="option.value"
							>
								{{ option.name }}
							</option>
						</select>
					</span>
					<span class="filters-section">
						<strong>Estado:</strong>
						<select v-model="stateFilter" @change="getBingos()">
							<option value="SELLING">
								{{ $t('En venta') }}
							</option>
							<option value="CANCELED">
								{{ $t('Cancelado') }}
							</option>
							<option value="STARTED">
								{{ $t('Empezado') }}
							</option>
							<option value="FINISHED">
								{{ $t('Venta Cerrada') }}
							</option>
						</select>
					</span>
				</div>
			</div>
			<!-- Container for tournament information -->
			<div class="Container InfoContent">
				<div class="row justify-content-center">
					<div class="container-tournaments col-12">
						<!-- Preloader for tournaments, shown conditionally -->
						<div
							class="torneos-preloader"
							v-if="raffles.length <= 0"
						>
							<div class="torneos-p1"></div>
							<div class="torneos-p2"></div>
							<div class="torneos-p3"></div>
						</div>
						<!-- Loop through each raffle item -->
						<div v-for="item in raffles">
							<div class="list-tournaments-border">
								<!-- Tournament list item, clickable to change main game -->
								<div
									class="list-tournaments"
									@click="
										more = false;
										changeMain(item.gameCode);
									"
								>
									<!-- Logo for the tournament -->
									<div class="tournament-logo">
										<img
											:src="config.favicon"
											style="height: 100%"
										/>
									</div>
									<!-- Title container for tournament details -->
									<div class="container-title">
										<div
											class="tournament-title inline-block"
										>
											<span class="room">{{
												$t('Sala')
											}}</span
											>{{ item.roomName }}
										</div>
										<div
											class="tournament-title inline-block"
										>
											<span class="room">{{
												$t('Sorteo')
											}}</span
											>{{ item.name }}
										</div>
										<!-- Icon indicating expandable state -->
										<i
											v-if="flag != item.gameCode"
											class="text-2xl"
											><span
												class="icon-chevron-down"
											></span
										></i>
										<i
											v-if="flag === item.gameCode"
											class="text-2xl"
											><span
												class="icon-chevron-up"
											></span
										></i>
									</div>
									<!-- Expandable container for additional details -->
									<div class="container-expand pt-2">
										<i
											v-if="flag != item.gameCode"
											class="text-2xl"
											><span
												class="icon-chevron-down"
											></span
										></i>
										<i
											v-if="flag === item.gameCode"
											class="text-2xl"
											><span
												class="icon-chevron-up"
											></span
										></i>
									</div>
									<!-- Countdown timer for selling state -->
									<div
										class="timeleft-container"
										v-if="item.state == 'SELLING'"
									>
										<div class="timeleft">
											<vue-countdown
												:time="item.closingDate"
												:interval="100"
												v-slot="{
													days,
													hours,
													minutes,
													seconds,
												}"
												@end="item.state = 'FINISHED'"
											>
												{{ days }} : {{ hours }} :
												{{ minutes }} : {{ seconds }}
											</vue-countdown>
											<div class="tittle leading-3">
												<div>días</div>
												<div>horas</div>
												<div>min</div>
												<div>seg</div>
											</div>
										</div>
										<div class="finish">Empieza en</div>
									</div>
									<!-- Container for tournament state and awards -->
									<div class="tournaments-state-parent">
										<div
											class="tournaments-state"
											style="border-left: 1px solid #000"
											v-if="item.sumAwards > 0"
										>
											<!-- Display award information based on conditions -->
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length == 1
												"
												class="tournament-title inline-block"
											>
												<span class="room"
													>{{ $t('Premio') }}
													{{
														item.awards[0].figure
													}}</span
												><span
													class="gift-price text-primary-content"
													>{{ moneda_nom }}
													{{
														item.awards[0]
															.guaranteed
													}}</span
												>
											</div>
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length > 1
												"
												class="tournament-title inline-block"
											>
												<span class="room"
													>{{ item.awards.length }}
													{{ $t('Premios') }}</span
												>
												<div
													id="btn-awards"
													@click="
														showAwards(
															item.gameCode
														);
														$event.stopPropagation();
													"
													class="buttom btn-xs awards text-neutral"
												>
													{{ moneda_nom }}
													{{ item.sumAwards }}
												</div>
											</div>
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length > 1
												"
												:class="
													'container-awards-' +
													item.gameCode +
													' shadow container-awards'
												"
											>
												<ul>
													<li
														v-for="itemm in item.awards"
													>
														<span class="tittle">{{
															item.figure
														}}</span>
														<span class="guaranteed"
															>{{ moneda_nom }}
															{{
																itemm.guaranteed
															}}</span
														>
													</li>
												</ul>
											</div>
										</div>
										<div
											class="tournaments-state"
											style="border-left: 1px solid #000"
											v-if="item.sumAwards == 0"
										>
											<!-- Display physical prize information -->
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length == 1
												"
												class="tournament-title inline-block"
											>
												<span class="room">{{
													$t('Premio físico')
												}}</span
												><span
													class="gift-price text-primary-content"
													>{{
														item.awards[0]
															.promocional
													}}</span
												>
											</div>
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length > 1
												"
												class="tournament-title inline-block"
											>
												<div
													id="btn-awards"
													@click="
														showAwards(
															item.gameCode
														);
														$event.stopPropagation();
													"
													class="buttom btn-xs awards text-neutral"
												>
													{{ $t('Premios físicos') }}
												</div>
											</div>
											<div
												v-if="
													item.awards != undefined &&
													item.awards.length > 1
												"
												:class="
													'container-awards-' +
													item.gameCode +
													' shadow container-awards'
												"
											>
												<ul>
													<li
														v-for="itemm in item.awards"
													>
														<span
															class="guaranteed"
															>{{
																itemm.promocional
															}}</span
														>
													</li>
												</ul>
											</div>
										</div>
										<!-- Display current state of the tournament -->
										<div class="tournaments-state">
											<div
												class="tournament-title inline-block state font-bold p-5"
											>
												<span
													v-if="
														item.state == 'SELLING'
													"
													>{{ $t('En venta') }}</span
												>
												<span
													v-if="
														item.state == 'CANCELED'
													"
													>{{ $t('Cancelado') }}</span
												>
												<span
													v-if="
														item.state == 'STARTED'
													"
													>{{ $t('Empezado') }}</span
												>
												<span
													v-if="
														item.state == 'FINISHED'
													"
													>{{
														$t('Venta Cerrada')
													}}</span
												>
												<span
													v-if="
														item.state == 'PENDING'
													"
													>{{ $t('Pendiente') }}</span
												>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- Details section for the tournament, shown conditionally -->
							<div
								v-show="flag === item.gameCode"
								@blur="flag = '0'"
								class="details-tournament"
								:class="{ vip: item.type === 1 }"
							>
								<!-- Description container for tournament details -->
								<div class="description-container">
									<!-- Close button for details -->
									<div
										class="cross cursor-pointer"
										@click="
											more = false;
											changeMain(item.gameCode);
										"
									>
										<img
											src="https://images.virtualsoft.tech/m/msjT1648134987.png"
											alt=""
											style="margin-left: auto"
										/>
									</div>
									<!-- Detailed description of the tournament -->
									<div class="desc-contain">
										<div
											class="grid grid-cols-1 sm:grid-cols-4 gap-4"
											:id="item.gameCode"
										>
											<div>
												<img
													class="image"
													:src="item.imageOperator"
												/>
											</div>
											<div class="pt-3">
												<div class="text">
													<h2 class="font-bold m-0">
														<span
															class="icon-gift"
														></span>
														{{
															$t('Total Premios')
														}}
													</h2>
													<p>
														{{ moneda_nom }}
														{{ item.sumAwards }}
													</p>
												</div>
												<div class="text">
													<h2 class="font-bold m-0">
														<span
															class="icon-lock_clock"
														></span>
														{{
															$t(
																'Hora de cierre de venta'
															)
														}}
													</h2>
													<p>
														{{
															formatDate2(
																item.closingDate2,
																'YYYY-MM-DD h:mm:ss a'
															)
														}}
													</p>
												</div>
												<div class="text">
													<h2 class="font-bold m-0">
														<span
															class="icon-access_time"
														></span>
														{{
															$t('Hora de Inicio')
														}}
													</h2>
													<p>
														{{
															formatDate2(
																item.launchingDate,
																'YYYY-MM-DD h:mm:ss a'
															)
														}}
													</p>
												</div>
												<div>
													<div
														@click="
															navigate(
																item.gameCode
															);
															$event.stopPropagation();
															appComponent.gAnalytics(
																'show_lottery',
																item
															);
														"
														class="buttom vip text-neutral"
													>
														{{ $t('Ver Sorteo') }}
													</div>
												</div>
											</div>
											<div class="pt-3">
												<div class="text">
													<h2 class="font-bold m-0">
														{{
															$t(
																'Mínimo de cartones por compra'
															)
														}}
													</h2>
													<p>
														{{
															item.minCardsByTransaction
														}}
													</p>
												</div>
												<div class="text">
													<h2 class="font-bold m-0">
														{{
															$t(
																'Máximo de cartones por usuario'
															)
														}}
													</h2>
													<p>
														{{
															item.maxCardsByUser
														}}
													</p>
												</div>
												<div
													v-if="
														item.state == 'SELLING'
													"
													class=""
												>
													<div class="pb-2 buy-c">
														<span
															class="card-price pl-0 text-primary-content"
															>{{
																$t(
																	'Valor Carton:'
																)
															}}
															{{ moneda_nom }}
															{{
																item.cardPrice
															}}</span
														>
													</div>
													<div
														class="grid grid-cols-2 gap-4 p-5 rounded-xl buy-carton"
													>
														<input
															@click="
																$event.stopPropagation()
															"
															class="input input-bordered text-neutral-content"
															v-model="
																model[
																	item
																		.gameCode
																]
															"
															type="text"
															:placeholder="
																$t(
																	'Cant. Cartones'
																)
															"
															@input="
																validateInteger(
																	$event,
																	item.gameCode
																)
															"
														/>
														<div
															@click="
																betRaffle(
																	item.gameCode,
																	item.cardPrice
																);
																$event.stopPropagation();
																appComponent.gAnalytics(
																	'buy',
																	item
																);
															"
															class="buttom vip btn bg-success text-neutral"
															:class="{
																disabled:
																	model[
																		item
																			.gameCode
																	] ==
																		undefined ||
																	model[
																		item
																			.gameCode
																	] <
																		item.minCardsByTransaction ||
																	model[
																		item
																			.gameCode
																	] >
																		item.maxCardsByUser,
															}"
														>
															{{ $t('Comprar') }}
														</div>
													</div>
													<div
														v-if="
															model[
																item.gameCode
															] > 0 &&
															model[
																item.gameCode
															] <
																item.minCardsByTransaction
														"
														style="
															display: flex;
															color: red;
															background: #ffffffd6;
															text-align: center;
															justify-content: center;
															border-radius: 5px;
														"
													>
														<h6>
															{{
																$t(
																	'La minima compra de cartones es de'
																)
															}}
														</h6>
														<p class="font-bold">
															&nbsp;{{
																$t(
																	item.minCardsByTransaction
																)
															}}
														</p>
													</div>
												</div>
											</div>
											<div class="bingo_moc">
												<img
													src="https://images.virtualsoft.tech/m/msjT1653490233.png"
													alt=""
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Message displayed when no raffles are found -->
						<li
							class="FormItem fldAmount"
							id="fldAmount"
							v-if="raffles.length == 0"
						>
							<div class="row">
								<div
									style="
										width: 100%;
										display: inline-block;
										vertical-align: top;
									"
									class="col col-md-12"
								>
									<label
										class="FormLabel div-inline-block"
										style="
											width: 100%;
											font-size: 12px;
											color: gray;
										"
									>
										{{
											$t(
												'Por el momento no se han encontrado bingos según la busqueda'
											)
										}}
									</label>
								</div>
							</div>
						</li>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Section for layout 3, shown conditionally -->
	<section
		v-if="config.layout != undefined && config.layout == 3"
		class="relative w-full flex justify-center items-center py-16"
		:class="
			$route.path.indexOf('bingos') != -1
				? '[mask-image:_linear-gradient(transparent_,_black_20%)]'
				: ''
		"
	>
		<!-- Background image for the section -->
		<img
			src="https://images.virtualsoft.tech/m/msjT1686660044.png"
			alt=""
			class="absolute w-full h-full object-cover object-left-top z-0"
		/>
		<!-- Main article container for layout 3 -->
		<article
			class="relative w-11/12 h-full max-w-[1300px] flex flex-col justify-center items-center gap-8 z-20"
		>
			<!-- Logo image for the section -->
			<img
				src="https://images.virtualsoft.tech/m/msjT1686331516.png"
				alt=""
				class="in w-60 md:w-96"
			/>
			<!-- Filter section for room and state selection -->
			<div
				class="w-full flex justify-center items-center gap-2 md:gap-8 max-w-[400px]"
			>
				<div
					class="filter3 in w-1/2 h-12 flex justify-center items-center gap-2 px-4 py-2 text-base text-graycontent"
				>
					<span>{{ $t('Sala:') }}</span>
					<select
						v-model="roomFilter"
						@change="changeRoom()"
						class="bg-transparent rounded-full w-full"
					>
						<option value="0">{{ $t('Todas') }}</option>
						<option v-for="option in bingos" :value="option.value">
							{{ option.name }}
						</option>
					</select>
				</div>
				<div
					class="filter3 in w-1/2 h-12 flex justify-center items-center gap-2 px-3 py-2 text-base text-graycontent"
				>
					<span>{{ $t('Estado:') }}</span>
					<select
						v-model="stateFilter"
						@change="getBingos()"
						class="bg-transparent rounded-full w-full"
					>
						<option value="SELLING">{{ $t('En venta') }}</option>
						<option value="CANCELED">{{ $t('Cancelado') }}</option>
						<option value="STARTED">{{ $t('Empezado') }}</option>
						<option value="FINISHED">
							{{ $t('Venta Cerrada') }}
						</option>
					</select>
				</div>
			</div>
			<!-- Container for raffle items -->
			<div
				class="w-full h-auto flex flex-col justify-center items-center gap-5"
			>
				<article
					v-for="item in raffles"
					class="in w-full flex flex-col justify-center items-center gap-4 hover:scale-[1.01] z-30"
				>
					<!-- Raffle item container -->
					<div
						@click="
							more = false;
							changeMain(item.gameCode);
						"
						class="raffles3 cursor-pointer flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center gap-2 md:gap-4 rounded-lg md:rounded-full border-2 border-solid border-accent-content h-auto md:h-20 w-full px-4 md:px-8 py-2 shadow-md shadow-black"
					>
						<!-- Logo for the raffle -->
						<div
							class="w-full md:w-auto flex justify-start md:justify-center items-start md:items-center gap-4"
						>
							<div class="w-12 h-12">
								<img
									:src="config.logo2"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
							</div>
							<!-- Raffle details -->
							<div
								class="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4"
							>
								<div
									class="w-auto md:w-60 h-12 flex flex-col justify-center items-start px-2 py-0 md:py-2 text-white border-2 border-solid border-white rounded-lg"
								>
									<p class="text-xs md:text-sm font-normal">
										{{ $t('Sala') }}
									</p>
									<p class="text-base md:text-lg font-medium">
										{{ item.roomName }}
									</p>
								</div>
								<div
									class="w-full flex flex-col justify-center items-start text-white"
								>
									<p class="text-xs md:text-sm font-normal">
										{{ $t('Sorteo') }}
									</p>
									<p
										class="w-full text-lg md:text-xl font-bold"
									>
										{{ item.name }}
									</p>
								</div>
								<!-- State indicator for the raffle -->
								<div
									class="w-full md:w-auto flex flex-col justify-center items-center text-white"
									v-if="item.state == 'SELLING'"
								>
									<h3 class="text-lg md:text-xs font-bold">
										{{ $t('Empieza en') }}
									</h3>
									<div
										class="flex flex-col justify-start items-center bg-base-100 p-2 md:p-1 rounded-xl"
									>
										<vue-countdown
											:time="item.closingDate"
											:interval="100"
											v-slot="{
												days,
												hours,
												minutes,
												seconds,
											}"
											@end="item.state = 'FINISHED'"
											class="h-10 md:h-7 w-full text-4xl md:text-xl flex justify-center items-center"
										>
											{{ days }} : {{ hours }} :
											{{ minutes }} : {{ seconds }}
										</vue-countdown>
										<div
											class="flex justify-start items-center w-full uppercase text-xs md:text-[10px]"
										>
											<div
												class="flex justify-center items-center mr-4 md:mr-2"
											>
												{{ $t('días') }}
											</div>
											<div
												class="flex justify-center items-center mr-6 md:mr-2"
											>
												{{ $t('horas') }}
											</div>
											<div
												class="flex justify-center items-center mr-11 md:mr-2"
											>
												{{ $t('min') }}
											</div>
											<div
												class="flex justify-center items-center"
											>
												{{ $t('seg') }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Raffle state display -->
						<div
							class="w-full md:w-auto flex justify-between md:justify-end items-center gap-0 md:gap-8"
						>
							<div
								class="h-12 flex justify-center items-center text-sm md:text-lg font-semibold p-2 text-white border-2 border-solid border-white rounded-lg"
							>
								<span v-if="item.state == 'SELLING'">{{
									$t('En venta')
								}}</span>
								<span v-if="item.state == 'CANCELED'">{{
									$t('Cancelado')
								}}</span>
								<span v-if="item.state == 'STARTED'">{{
									$t('Empezado')
								}}</span>
								<span v-if="item.state == 'FINISHED'">{{
									$t('Venta Cerrada')
								}}</span>
								<span v-if="item.state == 'PENDING'">{{
									$t('Pendiente')
								}}</span>
							</div>
							<hr
								class="h-14 w-1 bg-accent-content rounded-full"
							/>
							<!-- Container for tournament state and awards -->
							<div class="tournaments-state-parent">
								<div
									class="tournaments-state"
									v-if="item.sumAwards > 0"
								>
									<!-- Display award information based on conditions -->
									<div
										v-if="
											item.awards != undefined &&
											item.awards.length == 1
										"
										class="flex flex-col justify-center items-start"
									>
										<p
											class="text-sm font-normal leading-3 text-white"
										>
											{{ $t('Premio') }}
											{{ item.awards[0].figure }}
										</p>
										<p
											class="uppercase text-2xl font-bold text-primary"
										>
											{{ moneda_nom }}
											{{ item.awards[0].guaranteed }}
										</p>
									</div>
									<div
										v-if="
											item.awards != undefined &&
											item.awards.length > 1
										"
										@click="
											awardSelected = item.gameCode;
											$event.stopPropagation();
										"
										class="flex flex-col justify-center items-start gap-1"
									>
										<p
											class="text-sm font-normal leading-3 text-white"
										>
											{{ item.awards.length }}
											{{ $t('Premios') }}
										</p>
										<div
											id="btn-awards"
											class="uppercase text-2xl font-bold text-primary px-2 rounded-xl border-2 border-solid border-primary"
										>
											{{ moneda_nom }}
											{{ item.sumAwards }}
										</div>
									</div>
								</div>
								<div
									class="tournaments-state"
									style="border-left: 1px solid #000"
									v-if="item.sumAwards == 0"
								>
									<!-- Display physical prize information -->
									<div
										v-if="
											item.awards != undefined &&
											item.awards.length == 1
										"
										class="tournament-title inline-block"
									>
										<span class="room">{{
											$t('Premio físico')
										}}</span
										><span
											class="gift-price text-primary-content"
											>{{
												item.awards[0].promocional
											}}</span
										>
									</div>
									<div
										v-if="
											item.awards != undefined &&
											item.awards.length > 1
										"
										class="tournament-title inline-block"
									>
										<div
											id="btn-awards"
											@click="
												showAwards(item.gameCode);
												$event.stopPropagation();
											"
											class="buttom btn-xs awards text-neutral"
										>
											{{ $t('Premios físicos') }}
										</div>
									</div>
									<div
										v-if="
											item.awards != undefined &&
											item.awards.length > 1
										"
										:class="
											'container-awards-' +
											item.gameCode +
											' shadow container-awards'
										"
									>
										<ul>
											<li v-for="itemm in item.awards">
												<span class="guaranteed">{{
													itemm.promocional
												}}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Details section for the raffle, shown conditionally -->
					<div
						v-if="flag === item.gameCode"
						class="relative flex flex-col md:flex-row justify-between md:justify-center items-start w-full h-auto md:h-[330px] bg-secondary p-4 rounded-lg shadow-md shadow-black gap-0 md:gap-8"
					>
						<!-- Close button for details -->
						<div
							@click="
								more = false;
								changeMain(item.gameCode);
							"
							class="absolute right-2 top-2 cursor-pointer"
						>
							<ExitIcon
								:height="23"
								:width="23"
								:fill="'#ffffff'"
								:fill2="'#ee3b3f'"
							/>
						</div>
						<!-- Image for the raffle -->
						<div
							class="w-full md:w-[250px] h-[250px] md:h-[300px] flex justify-center items-center"
						>
							<img
								:src="item.imageOperator"
								alt=""
								class="w-full h-full object-contain object-center"
							/>
						</div>
						<!-- Raffle details -->
						<div
							class="w-full h-full md:w-auto flex flex-col justify-center items-center gap-4 md:gap-10"
						>
							<div
								class="w-full flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8"
							>
								<div
									class="text-white flex flex-col justify-center md:justify-around w-full md:w-auto items-start gap-2"
								>
									<div>
										<span class="text-sm font-bold">{{
											$t('Total Premios')
										}}</span>
										<p class="text-xl">
											{{ moneda_nom }}
											{{ item.sumAwards }}
										</p>
									</div>
									<div>
										<span class="text-sm font-bold">{{
											$t('Hora de cierre de venta')
										}}</span>
										<p class="text-xl">
											{{
												formatDate2(
													item.closingDate2,
													'YYYY-MM-DD h:mm:ss a'
												)
											}}
										</p>
									</div>
									<div>
										<span class="text-sm font-bold">{{
											$t('Hora de inicio')
										}}</span>
										<p class="text-xl">
											{{
												formatDate2(
													item.launchingDate,
													'YYYY-MM-DD h:mm:ss a'
												)
											}}
										</p>
									</div>
								</div>
								<div class="text-white">
									<div>
										<span class="text-sm font-bold">{{
											$t('Mínimo de cartones por compra')
										}}</span>
										<p class="text-xl">
											{{ item.minCardsByTransaction }}
										</p>
									</div>
									<div>
										<span class="text-sm font-bold">{{
											$t('Máximo de cartones por usuario')
										}}</span>
										<p class="text-xl">
											{{ item.maxCardsByUser }}
										</p>
									</div>
								</div>
								<!-- Buying section for the raffle -->
								<div
									v-if="item.state == 'SELLING'"
									class="w-full md:w-auto bg-base-100 rounded-xl flex justify-center items-center flex-col p-2"
								>
									<div class="">
										<span class="text-white font-semibold"
											>{{ $t('Valor Carton:') }}
											{{ moneda_nom }}
											{{ item.cardPrice }}</span
										>
									</div>
									<div
										class="w-full flex justify-around items-center"
									>
										<input
											@click="$event.stopPropagation()"
											class="input input-bordered text-neutral-content"
											v-model="model[item.gameCode]"
											type="text"
											:placeholder="$t('Cant. Cartones')"
											@input="
												validateInteger(
													$event,
													item.gameCode
												)
											"
										/>
										<div
											@click="
												betRaffle(
													item.gameCode,
													item.cardPrice
												);
												$event.stopPropagation();
												appComponent.gAnalytics(
													'buy',
													item
												);
											"
											class="buttom rounded-lg vip btn bg-success text-neutral"
											:class="{
												disabled:
													model[item.gameCode] ==
														undefined ||
													model[item.gameCode] <
														item.minCardsByTransaction ||
													model[item.gameCode] >
														item.maxCardsByUser,
											}"
										>
											{{ $t('Comprar') }}
										</div>
									</div>
									<div
										v-if="
											model[item.gameCode] > 0 &&
											model[item.gameCode] <
												item.minCardsByTransaction
										"
										style="
											display: flex;
											color: red;
											background: #ffffffd6;
											text-align: center;
											justify-content: center;
											border-radius: 5px;
										"
									>
										<h6>
											{{
												$t(
													'La minima compra de cartones es de'
												)
											}}
										</h6>
										<p class="font-bold">
											&nbsp;{{
												$t(item.minCardsByTransaction)
											}}
										</p>
									</div>
								</div>
							</div>
							<!-- Button to view the raffle -->
							<button
								@click="
									navigate(item.gameCode);
									$event.stopPropagation();
									appComponent.gAnalytics(
										'show_lottery',
										item
									);
								"
								class="text-white text-bold text-lg w-full md:w-80 h-12 bg-accent-content rounded-full"
							>
								{{ $t('Ver sorteo') }}
							</button>
						</div>
					</div>
					<!-- Awards container, shown conditionally -->
					<div
						v-if="
							item.awards != undefined &&
							item.awards.length > 1 &&
							awardSelected == item.gameCode
						"
						class="h-full w-full flex justify-end items-center"
						:class="'container-awards-' + item.gameCode"
					>
						<ul
							class="relative w-full md:w-96 bg-secondary p-4 rounded-lg shadow-md shadow-black flex flex-col justify-center items-center"
						>
							<!-- Close button for awards -->
							<div
								@click="awardSelected = undefined"
								class="absolute right-2 top-2 cursor-pointer"
							>
								<ExitIcon
									:height="23"
									:width="23"
									:fill="'#ffffff'"
									:fill2="'#ee3b3f'"
								/>
							</div>
							<!-- List of awards -->
							<li
								v-for="itemm in item.awards"
								class="uppercase text-2xl font-bold text-primary"
							>
								<span>{{ item.figure }}</span>
								<span
									>{{ moneda_nom }}
									{{ itemm.guaranteed }}</span
								>
							</li>
						</ul>
					</div>
				</article>
			</div>
		</article>
		<!-- Gradient background at the bottom of the section -->
		<div
			class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content z-10"
		></div>
	</section>
</template>
<style scoped>
/* Class for a gradient background with a dark theme */
.see3 {
	background: linear-gradient(
		180deg,
		#282c3e 0%,
		/* Dark color at the top */ #444961 5.4%,
		/* Slightly lighter color */ #282c3e 18.2%,
		/* Dark color again */ #282c3e 82.29%,
		/* Maintains dark color */ #10121c 100%
			/* Very dark color at the bottom */
	);
}

/* Class for raffle section with gradient and shadow effect */
.raffles3 {
	background: linear-gradient(
		180deg,
		#515776 0%,
		#454d71 100%
	); /* Gradient from light to dark */
	border-color: #515776; /* Border color matches the top gradient color */
	filter: drop-shadow(
		0px 3px 6px rgba(0, 0, 0, 0.161)
	); /* Adds a subtle shadow effect */
}

/* Class for filter section with a gradient and rounded borders */
.filter3 {
	background: linear-gradient(
		180deg,
		#777777 0%,
		/* Light gray at the top */ #b1b1b1 12.5%,
		/* Medium gray */ #b5b3b3 81.77%,
		/* Slightly lighter gray */ #9c9c9c 100% /* Darker gray at the bottom */
	);
	border-radius: 32px; /* Rounded corners for a softer appearance */
	border-color: #b5b3b3; /* Border color matches the gradient */
}

/* Media query for screens with a maximum width of 500px */
@media screen and (max-width: 500px) {
	/* Ensures tournament list items do not float */
	.container-tournaments .list-tournaments > div {
		float: none !important;
	}

	/* Sets the height of the tournament list to 100% */
	.container-tournaments .list-tournaments-border .list-tournaments {
		height: 100% !important;
	}

	/* Styles the title container to occupy full width minus 50px */
	.container-tournaments .list-tournaments .container-title {
		display: inline-block !important;
		width: calc(100% - 50px) !important;
		position: relative !important;
	}

	/* Adds margin below the tournament title */
	.container-tournaments .list-tournaments .tournament-title {
		margin-bottom: 6px !important;
	}

	/* Removes left border from the time left element */
	.container-tournaments .list-tournaments .timeleft-container .timeleft {
		border-left: 0px !important;
	}

	/* Styles the finish container for proper alignment */
	.container-tournaments .list-tournaments .timeleft-container .finish {
		line-height: 0px !important;
		display: flex !important;
		align-items: center !important;
	}

	/* Flexbox styles for the time left container */
	.container-tournaments .list-tournaments .timeleft-container {
		display: flex !important;
		flex-direction: row-reverse !important;
		align-items: center !important;
		justify-content: center !important;
		border-bottom: 1px solid #f0f0f0 !important;
		border-top: 1px solid #f0f0f0 !important;
		padding: 10px 0px !important;
	}

	/* Positions the icon in the title container to the right */
	.container-tournaments .list-tournaments .container-title i.text-2xl {
		position: absolute !important;
		right: 0px !important;
	}

	/* Ensures the tournament logo is displayed inline */
	.container-tournaments .list-tournaments .tournament-logo {
		display: inline-block !important;
	}

	/* Flexbox styles for the tournament state parent */
	.tournaments-state-parent {
		display: flex !important;
		align-items: center !important;
		justify-content: space-between !important;
		flex-direction: row-reverse !important;
	}

	/* Removes border from the tournament state */
	.tournaments-state {
		border: 0px !important;
	}
}

/* Media query for screens with a maximum width of 500px */
@media screen and (max-width: 500px) {
	/* Set height for tournament player elements */
	.torneos-p1,
	.torneos-p2,
	.torneos-p3 {
		height: 75px; /* Fixed height for player elements */
	}
}

/* Media query for screens with a maximum width of 810px */
@media (max-width: 810px) {
	/* Style for select elements within tournament box */
	.tournament-box select {
		width: calc(
			100% - 20px
		) !important; /* Full width minus 20px for padding */
	}

	/* Hide bingo_moc element */
	.bingo_moc {
		display: none; /* Element is not displayed on smaller screens */
	}
}

/* General filter styling */
.filter {
	display: inline-block; /* Inline block for layout */
	padding: 6px 0px; /* Vertical padding */
	border-radius: 5px; /* Rounded corners */
	font-size: 13px; /* Font size for text */
	width: 50%; /* Width set to 50% of the parent */
	padding: 20px 0px 10px 0; /* Additional padding for top and bottom */
}

/* Styling for filters section */
span.filters-section {
	width: calc(100% / 2); /* Width set to 50% of the parent */
	display: inline-block; /* Inline block for layout */
}

/* Style for strong elements */
strong {
	padding-left: 0; /* Remove left padding */
	padding-left: 0; /* Duplicate line, remove left padding */
	padding: 10px 10px; /* Set padding for all sides */
	display: inline-block; /* Allow width and height to be set */
	font-size: 14px; /* Set font size */
}

/* Style for the last child in filters-section span */
span.filters-section:last-child {
	padding-left: 10px; /* Add left padding for the last child */
}

/* Style for select dropdown elements */
select {
	padding: 5px 6px; /* Set padding for select element */
	border-radius: 3px; /* Round the corners */
	color: grey; /* Set text color */
	width: calc(100% - 80px); /* Set width with calculation */
	display: inline-block; /* Allow width and height to be set */
	float: right; /* Align to the right */
	height: 35px; /* Set height */
}

/* Style for label elements */
label {
	padding-right: 8px; /* Add right padding */
}

/* Style for strong elements within filters-section */
.filters-section strong {
	color: black; /* Set text color to black */
}

.container-tournaments {
	/* Center the container and set maximum width */
	margin: 0 auto;
	max-width: 1200px;
	/* Set text color to white */
	color: white;
	/* Add horizontal padding */
	padding: 0 5px;
	/* Set minimum height for the container */
	min-height: 300px;
}

.container-tournaments div::-webkit-scrollbar-track,
.container-tournaments p::-webkit-scrollbar-track {
	/* Style for the scrollbar track with rounded corners */
	border-radius: 10px;
	background-color: transparent; /* No background color */
}

.container-tournaments div::-webkit-scrollbar,
.container-tournaments p::-webkit-scrollbar {
	/* Set width and height for the scrollbar */
	width: 6px;
	background-color: transparent; /* No background color */
	height: 6px;
}

.container-tournaments div::-webkit-scrollbar-thumb,
.container-tournaments p::-webkit-scrollbar-thumb {
	/* Style for the scrollbar thumb with rounded corners */
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* Inner shadow effect */
	background-color: #555; /* Dark gray color for the thumb */
}

.container-tournaments > div {
	/* Add bottom padding to child divs */
	padding-bottom: 10px;
}

.container-tournaments .more-details {
	/* Container for tournament details, positioned absolutely */
	position: absolute;
	/* Background color of the details box */
	background: white;
	/* Text color for the details box */
	color: black;
	/* Height is set to auto to accommodate content */
	height: auto;
	/* Padding around the content */
	padding: 20px 25px;
	/* Rounded corners for the details box */
	border-radius: 5px;
	/* Z-index to ensure it appears above other elements */
	z-index: 20;
	/* Fixed width for the details box */
	width: 1200px;
	/* Animation for the popup effect */
	animation: popup-enter 0.3s ease-in-out;
	/* Margin to separate from the element above */
	margin-top: 10px;
}

.container-tournaments .more-details h3 {
	/* Font size for the heading within the details box */
	font-size: 14px;
	/* Padding below the heading */
	padding-bottom: 10px;
}

.container-tournaments .more-details .close {
	/* Positioning for the close button */
	position: absolute;
	/* Positioning from the top */
	top: 0;
	/* Positioning from the right */
	right: 0;
	/* Padding around the close button */
	padding: 14px;
	/* No border at the bottom */
	border-bottom: none;
	/* Bold font weight for the close button */
	font-weight: bold;
}

.container-tournaments .more-details:before {
	/* Decorative triangle pointing to the details box */
	content: '';
	/* Positioning of the triangle */
	position: absolute;
	/* Positioning from the top */
	top: -10px;
	/* Positioning from the left */
	left: 28px;
	/* Width and height set to create a triangle */
	width: 0;
	height: 0;
	/* Border width to form the triangle shape */
	border-width: 0 15px 15px;
	/* Border style to create a solid triangle */
	border-style: solid;
	/* Triangle color matching the background of the details box */
	border-color: transparent transparent white;
}

.container-tournaments .more-details > div {
	/* Display as inline-block for horizontal alignment */
	display: inline-block;
	/* Aligns the top of the element with the top of its container */
	vertical-align: top;
	/* Padding for spacing inside the element */
	padding: 16px 5px;
	/* Margin at the bottom for spacing between elements */
	margin-bottom: 10px;
}

.container-tournaments .more-details .complet-descrip {
	/* Sets the width of the complete description section */
	width: calc(76% - 10px);
}

.container-tournaments .more-details .complet-descrip > div {
	/* Margin at the bottom for spacing between child elements */
	margin-bottom: 10px;
	/* Padding at the bottom for spacing inside the element */
	padding-bottom: 10px;
}

.container-tournaments .more-details .complet-descrip .awards img {
	/* Allows the image to maintain its aspect ratio */
	width: auto;
	height: auto;
	/* Sets a maximum height for the image */
	max-height: 80px;
}

.container-tournaments .more-details .complet-descrip .text {
	/* Padding for spacing inside the text container */
	padding: 16px 18px;
	/* Light background color for the text container */
	background: #f7f7f7;
	/* Rounds the corners of the text container */
	border-radius: 5px;
	/* Sets a maximum height for the text container */
	max-height: 300px;
	/* Enables vertical scrolling if content exceeds max height */
	overflow-y: auto;
}

/* Styles for the tournament container and its details */
.container-tournaments .more-details .complet-descrip .text h3 {
	/* Font size for the heading in the tournament description */
	font-size: 20px;
}

/* Styles for the awards section within the tournament details */
.container-tournaments .more-details .complet-descrip .awards {
	/* Background color for the awards section */
	background: #f7f7f7;
	/* Rounded corners for the awards section */
	border-radius: 5px;
	/* Space below the awards section */
	margin-bottom: 10px;
	/* Padding inside the awards section */
	padding: 16px 18px;
	/* Width calculation for the awards section */
	width: calc(50% - 36px);
}

/* Styles for the heading within the awards section */
.container-tournaments .more-details .complet-descrip .awards h3 {
	/* Background color for the awards heading */
	background: #000000;
	/* Text color for the awards heading */
	color: white;
	/* Positioning of the awards heading */
	position: relative;
	/* Adjusts the vertical position of the heading */
	top: -15px;
	/* Padding for the awards heading */
	padding: 7px 18px;
	/* Rounded corners for the top of the awards heading */
	border-radius: 5px 5px 0 0;
	/* Adjusts the horizontal position of the heading */
	left: -17px;
	/* Width calculation for the awards heading */
	width: calc(100% + 36px);
	/* Removes default margin for the heading */
	margin: 0;
}

/* Selector for the awards section */
.container-tournaments
.more-details
.complet-descrip
.awards
  /* Container for awards section */
.awards-contain {
}

/* Styling for currency display */
.moneda {
	/* Border styling */
	border: 2px solid black; /* Solid black border */
	border-radius: 0 0 5px 5px; /* Rounded corners at the bottom */
	font-weight: bold; /* Bold text */
	border-top: 0; /* No top border */
	display: inline-block; /* Inline block display */
	padding: 3px 10px; /* Padding around the text */
	position: relative; /* Positioning context for child elements */
	left: -17px; /* Shift left */
	top: -15px; /* Shift up */
	margin-right: -2px; /* Negative margin to adjust spacing */
}

/* Table cell styling for tournament details */
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
	/* Right border for table cells and headers */
	border-right: 1px solid #d1d1d1; /* Light gray right border */
}

.container-tournaments /* Main container for tournament-related content */
.more-details /* Section for additional details about the tournament */
.complet-descrip /* Container for complete description of the tournament */
.awards /* Section dedicated to awards information */
.awards-contain /* Container for holding award-related elements */
table {
	/* Styles for tables within the tournament container */
	border-collapse: collapse; /* Ensures that table borders are collapsed into a single border */
	width: 100%; /* Sets the table width to fill the container */
}

.container-tournaments
	.more-details
	.complet-descrip
	.awards
	.awards-contain
	th {
	/* Styles for table header cells */
	text-align: left; /* Aligns text to the left within header cells */
	padding: 4px 15px; /* Adds padding around header cell content */
}

.container-tournaments
	.more-details
	.complet-descrip
	.awards
	.awards-contain
	th:last-child {
	/* Styles for the last header cell in the table */
	border-right: none; /* Removes the right border for the last header cell */
}

/* Container for tournament-related elements */
.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
  /* Style for table cells */
td {
	padding: 4px 15px; /* Padding for table cells */
}

/* Remove right border for the last cell in each row */
.container-tournaments
	.more-details
	.complet-descrip
	.awards
	.awards-contain
	td:last-child {
	border-right: none; /* No right border for the last cell */
}

/* Set width for the first cell in each row */
.container-tournaments
	.more-details
	.complet-descrip
	.awards
	.awards-contain
	tr
	td:first-child {
	width: 46px; /* Fixed width for the first cell */
}

/* Container for tournament-related elements */
.container-tournaments
  /* Section for more details about tournaments */
.more-details
  /* Description of the tournament completion */
.complet-descrip
  /* Awards section */
.awards
  /* Container for awards */
.awards-contain
  /* Table row styling */
tr
  /* Set width for the second table cell */
td:nth-child(2) {
	width: 176px; /* Fixed width for the second column */
}

/* Styling for the right section within more details */
.container-tournaments .more-details .right {
	width: calc(23% - 2px); /* Responsive width calculation */
}

/* Visibility section within the right details */
.container-tournaments .more-details .right .visibility > div {
	padding: 7px 13px; /* Padding for inner divs */
	background: #e4e4e4; /* Light gray background */
	color: #cecece; /* Light gray text color */
	display: inline-block; /* Inline block display for alignment */
	width: calc(100% / 2 - 28px); /* Responsive width calculation */
	border-radius: 2px; /* Rounded corners */
	font-weight: bold; /* Bold text */
	text-align: center; /* Centered text */
}

/* VIP visibility styling */
.container-tournaments .more-details .right .visibility > div.vip {
	background: #b48303; /* Gold background for VIP */
	color: white; /* White text color for contrast */
}

.container-tournaments .more-details .right .convertion h3 {
	/* Header style for conversion section */
	background: #000000; /* Black background */
	color: white; /* White text color */
	position: relative; /* Positioning relative to its normal position */
	top: -15px; /* Moves the element up by 15px */
	padding: 7px 18px; /* Padding around the text */
	border-radius: 5px 5px 0 0; /* Rounded corners for the top */
	width: 226px; /* Fixed width */
	left: -17px; /* Moves the element left by 17px */
	margin: 0; /* No margin */
}

.container-tournaments .more-details .right .convertion-contain .moneda {
	/* Style for currency display within conversion container */
	border: 2px solid black; /* Black border */
	border-radius: 0 0 5px 5px; /* Rounded corners for the bottom */
	font-weight: bold; /* Bold text */
	border-top: 0; /* No top border */
	display: inline-block; /* Inline-block display */
	padding: 3px 10px; /* Padding around the text */
	position: relative; /* Positioning relative to its normal position */
	left: -17px; /* Moves the element left by 17px */
	top: -15px; /* Moves the element up by 15px */
	margin-right: -2px; /* Negative margin to adjust spacing */
}

.container-tournaments .more-details .right .convertion-contain td,
.container-tournaments .more-details .right .convertion-contain th {
	/* Border style for table cells in conversion container */
	border-right: 1px solid #d1d1d1; /* Light gray right border */
}

.container-tournaments .more-details .right .convertion-contain table {
	/* Set table layout to collapse borders and take full width */
	border-collapse: collapse;
	width: 100%;
}

.container-tournaments .more-details .right .convertion-contain th {
	/* Align text to the left and add padding for header cells */
	text-align: left;
	padding: 4px 15px;
}

.container-tournaments .more-details .right .convertion-contain th:last-child {
	/* Remove right border for the last header cell */
	border-right: none;
}

.container-tournaments .more-details .right .convertion-contain td {
	/* Add padding for data cells */
	padding: 4px 15px;
}

.container-tournaments .more-details .right .convertion-contain td:last-child {
	/* Remove right border for the last data cell */
	border-right: none;
}

.container-tournaments .more-details .right .join {
	/* Style for the join button with font size, weight, and background color */
	font-size: 28px;
	font-weight: bold;
	border-radius: 6px; /* Rounded corners */
	padding: 5px 12px 4px; /* Padding for button */
	transition: 0.5s; /* Smooth transition for hover effects */
	color: white; /* Text color */
	text-align: center; /* Center text */
	background: #b48303; /* Background color */
}

.container-tournaments .more-details .right .join:hover {
	/* Changes text color to white and background to a highlighted color on hover */
	color: white;
	background: #f4b001;
}

.container-tournaments .more-details .right .join.disabled {
	/* Sets background color for disabled join button */
	background: #f1f1f1;
}

.container-tournaments .more-details .right .join.disabled:hover {
	/* Maintains the same background color for disabled button on hover */
	background: #f1f1f1;
}

.container-tournaments .more-details .right > div {
	/* Styles for the container divs within the right section */
	background: #f7f7f7; /* Light grey background */
	border-radius: 5px; /* Rounded corners */
	margin-bottom: 10px; /* Space below each div */
	padding: 16px 18px; /* Inner spacing */
}

.container-tournaments .list-tournaments {
	/* Styles for the list of tournaments */
	width: 100%; /* Full width */
	background: rgb(221, 221, 221); /* Fallback background color */
	background: linear-gradient(
		/* Gradient background from grey to white */ 180deg,
		rgba(221, 221, 221, 1) 0%,
		rgba(255, 255, 255, 1) 60%
	);
	border-radius: 5px; /* Rounded corners */
	padding: 7px 22px; /* Inner spacing */
	color: black; /* Text color */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
}

.container-tournaments .list-tournaments:hover {
	/* Applies styles when the tournament list item is hovered over */
	border-bottom: 1px solid #b48303; /* Adds a bottom border with a specific color */
	border-radius: 5px; /* Rounds the corners of the element */
	background: rgb(221, 221, 221); /* Sets a fallback background color */
	background: linear-gradient(
		/* Applies a linear gradient background */ 180deg,
		/* Gradient direction */ rgba(221, 221, 221, 1) 0%,
		/* Start color */ rgba(255, 255, 255, 1) 50%,
		/* Middle color */ rgba(221, 221, 221, 1) 100% /* End color */
	);
}

.container-tournaments .list-tournaments > div {
	/* Styles for direct child divs of the tournament list */
	display: inline-block; /* Displays the divs inline */
	vertical-align: top; /* Aligns the divs to the top */
}

.container-tournaments .list-tournaments .tournament-title {
	/* Styles for the tournament title */
	font-size: 15px; /* Sets the font size */
	height: 35px; /* Sets a fixed height */
	font-weight: bold; /* Makes the font bold */
	padding-left: 10px; /* Adds padding to the left */
	line-height: 2.4; /* Sets the line height */
}

.container-tournaments .list-tournaments .tournament-title.vip:before {
	/* Styles for the VIP label before the tournament title */
	content: 'VIP'; /* Sets the content to display */
	display: inline-block; /* Displays the label inline */
	color: #ffffff; /* Sets the text color */
	background: #991eae; /* Sets the background color */
	box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.6); /* Adds a shadow effect */
	position: relative; /* Positions the element relative to its normal position */
	height: 10px; /* Sets a fixed height for the label */
	font: /* Sets the font properties */
		8px/11px Arial,
		/* Font size and line height */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	padding: 0 2px; /* Adds horizontal padding */
	border-radius: 3px 0px 3px 0px; /* Rounds specific corners */
	top: 5px; /* Moves the label down */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	left: 4px; /* Moves the label to the right */
	float: right; /* Floats the label to the right */
}

/* Container for tournaments, including the list of tournaments */
.container-tournaments .list-tournaments .tournament-logo {
	width: 45px; /* Set width of tournament logo */
	height: 35px; /* Set height of tournament logo */
}

/* Container for the time left, aligned to the right */
.container-tournaments .list-tournaments .timeleft-container {
	float: right; /* Float the time left container to the right */
}

/* Styling for the time left display */
.container-tournaments .list-tournaments .timeleft-container .timeleft {
	padding-left: 20px; /* Add padding to the left */
	font-size: 24px; /* Set font size for time left */
	border-left: 1px solid black; /* Add left border */
	width: 190px; /* Set width of time left container */
}

/* Styling for the time display within the time left */
.container-tournaments .list-tournaments .timeleft-container .timeleft .time {
	height: 26px; /* Set height for time display */
	font-weight: bold; /* Make font bold */
}

/* Styling for the title within the time left */
.container-tournaments .list-tournaments .timeleft-container .timeleft .tittle {
	font-size: 9px; /* Set font size for title */
	line-height: 10px; /* Set line height for title */
}

/* Selector for time left container, possibly for further styling */
.container-tournaments
.list-tournaments
.timeleft-container
.timeleft
  /* Title class for styling elements related to titles */
.tittle
div {
	/* Sets the width to one-fourth of the container's width */
	width: calc(100% / 4);
	/* Sets the font size for the text */
	font-size: 9px;
	/* Displays the divs inline-block for horizontal alignment */
	display: inline-block;
	/* Centers the text within the div */
	text-align: center;
	/* Applies a negative right margin to adjust spacing */
	margin-right: -1.9px;
}

/* Container for tournaments, specifically for the time left display */
.container-tournaments .list-tournaments .timeleft-container .finish {
	/* Sets the font size for the finish time text */
	font-size: 13px;
	/* Sets the line height for better readability */
	line-height: 2.9;
	/* Adds padding to the right side */
	padding-right: 20px;
}

/* Styles for the divs within the time left container */
.container-tournaments .list-tournaments .timeleft-container > div {
	/* Floats the divs to the right */
	float: right;
	/* Sets a fixed height for the divs */
	height: 35px;
}

/* Button styles within the tournaments list */
.container-tournaments .list-tournaments .buttom {
	/* Floats the button to the right */
	float: right;
	/* Sets the font size for the button text */
	font-size: 15px;
	/* Makes the button text bold */
	font-weight: bold;
	/* Rounds the corners of the button */
	border-radius: 6px;
	/* Adds padding for better touch targets */
	padding: 7px 12px 6px;
	/* Adds a transition effect for hover states */
	transition: 0.5s;
	/* Adds margin to the left for spacing */
	margin-left: 20px;
	/* Sets the width to auto to fit the content */
	width: auto;
	/* Centers the text within the button */
	text-align: center;
}

/* Style for room span elements */
span.room {
	font-size: 9px; /* Sets the font size */
	font-weight: 400; /* Sets the font weight */
	position: absolute; /* Positions the element absolutely */
	line-height: 7px; /* Sets the line height */
}

/* Styles for tournament buttons on hover */
.container-tournaments .list-tournaments .buttom:hover {
	color: black; /* Changes text color on hover */
	background: white; /* Changes background color on hover */
}

/* Styles for VIP tournament buttons on hover */
.container-tournaments .list-tournaments .buttom.vip:hover {
	color: white; /* Changes text color on hover for VIP buttons */
	background: #991eae; /* Changes background color on hover for VIP buttons */
	border-color: #991eae; /* Changes border color on hover for VIP buttons */
}

/* Styles for tournament detail sections */
.container-tournaments .details-tournament {
	animation: popup-enter 0.3s ease-in-out; /* Animation effect for entering */
	width: 100%; /* Sets width to 100% */
	height: auto; /* Height adjusts automatically */
	color: black; /* Sets text color */
	margin-top: 10px; /* Adds top margin */
	position: relative; /* Positions the element relatively */
	display: inline-block; /* Displays as inline-block */
}

/* Styles for inner divs within tournament details */
.container-tournaments .details-tournament > div {
	background: url(https://images.virtualsoft.tech/m/msjT1646347397.png); /* Background image */
	background-size: cover; /* Ensures background image covers the area */
	background-position: center; /* Centers the background image */
	background-repeat: no-repeat; /* Prevents background image from repeating */
	border-radius: 5px; /* Rounds the corners */
	display: inline-block; /* Displays as inline-block */
	vertical-align: top; /* Aligns to the top */
	height: auto; /* Height adjusts automatically */
	min-height: 265px; /* Sets a minimum height */
	padding: 16px 18px; /* Adds padding inside the element */
}

.container-tournaments .details-tournament .description-container {
	/* Sets the width to 100% and adds a right margin of 6px for spacing */
	width: 100%;
	margin-right: 6px;
}

.container-tournaments
	.details-tournament
	.description-container
	.desc-contain {
	/* Allows the height to adjust automatically based on content */
	height: auto;
}

.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	> div {
	/* Displays child divs inline and aligns them to the top */
	display: inline-block;
	vertical-align: top;
}

.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	.text-container {
	/* Adds left padding of 30px and allows height to adjust automatically */
	padding-left: 30px;
	height: auto;
}

/* Main container for tournaments */
.container-tournaments
  /* Details section for each tournament */
.details-tournament
  /* Container for tournament description */
.description-container
  /* Additional container for description content */
.desc-contain
  /* Container for text elements */
.text-container
  /* Style for text elements */
.text {
	width: 100%; /* Full width for text */
}

.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	.text-container
	.text
	h3 {
	font-size: 16px; /* Font size for headings */
	padding: 0 0 10px 0px; /* Padding below heading */
}

.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	.text-container
	.text
	p {
	height: auto; /* Automatic height for paragraphs */
	overflow-y: auto; /* Enable vertical scrolling if content overflows */
}

/* Main container for tournaments */
.container-tournaments
  /* Details section for each tournament */
.details-tournament
  /* Container for tournament description */
.description-container
  /* Container for description content */
.desc-contain
  /* Container for text elements */
.text-container
  /* Text styling for tournament rules */
.text
.rules {
	background: white; /* Background color for rules */
	color: black; /* Text color for rules */
	padding: 5px 10px; /* Padding around the text */
	margin: 8px 0; /* Margin above and below the rules */
	font-weight: bold; /* Bold text for emphasis */
	max-width: 105px; /* Maximum width of the rules container */
}

/* Hover effect for tournament rules */
.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	.text-container
	.text
	.rules:hover {
	background: #d8d8d8; /* Change background color on hover */
}

/* Additional styling for tournament details */
.container-tournaments
.details-tournament
  /* Container for the description section */
.description-container
  /* Class for additional description containment */
.desc-contain
  /* Container for text elements */
.text-container
  /* List of games with styling for borders and padding */
.games-list {
	border: 1px solid #3d517d; /* Solid border with specific color */
	border-radius: 5px; /* Rounded corners */
	padding: 5px 8px 4px; /* Padding for inner spacing */
	position: relative; /* Positioning context for child elements */
	padding-left: 25px; /* Additional left padding */
}

/* Container for tournament details */
.container-tournaments
  /* Class for tournament details section */
.details-tournament
  /* Repeated description container */
.description-container
  /* Repeated additional description containment */
.desc-contain
  /* Repeated text container */
.text-container
  /* Repeated games list */
.games-list
  /* Carousel container for horizontal scrolling */
#carousel {
	width: 100%; /* Full width of the parent */
	height: 100px; /* Fixed height */
	background-color: transparent; /* No background color set */
	overflow-x: scroll; /* Enable horizontal scrolling */
	overflow-y: hidden; /* Disable vertical scrolling */
	white-space: nowrap; /* Prevent line breaks for child elements */
}

/* Container for tournaments */
.container-tournaments
  /* Main container for tournament details */
.details-tournament {
}

/* Container for the description section */
.description-container {
}

/* Container for the description content */
.desc-contain {
}

/* Container for text elements */
.text-container {
}

/* List of games */
.games-list {
}

/* Carousel element for images */
#carousel {
}

/* Styles for images within the carousel */
#carousel img {
	height: 90px; /* Set height of images */
	padding: 0 4px; /* Add horizontal padding */
}

/* Container for tournaments */
.container-tournaments {
}

/* Slide element within the carousel */
#carousel .slide {
	display: inline-block; /* Display slides inline */
}

/* Additional styles for tournament details */
.container-tournaments .details-tournament {
}

/* Additional styles for description container */
.container-tournaments .description-container {
}

/* Additional styles for description content */
.container-tournaments .desc-contain {
}

/* Styles for images in the description */
.container-tournaments .image {
	width: auto; /* Allow automatic width */
	display: inline-block; /* Display images inline */
	max-height: 250px; /* Set maximum height for images */
}

/* Main container for tournaments */
.container-tournaments
  /* Details section for each tournament */
.details-tournament
  /* Container for tournament description */
.description-container
  /* Inner container for description content */
.desc-contain
.wrapper {
	/* Light gray background for the wrapper */
	background: #efefef;
	/* Shadow effect for depth */
	box-shadow: 1px 1px 10px #999;
	/* Center the wrapper */
	margin: auto;
	/* Center text alignment */
	text-align: center;
	/* Relative positioning for child elements */
	position: relative;
	/* Rounded corners */
	-webkit-border-radius: 5px; /* Safari */
	-moz-border-radius: 5px; /* Firefox */
	border-radius: 5px; /* Standard */
	/* Space below the wrapper */
	margin-bottom: 20px !important;
	/* Fixed width for the wrapper */
	width: 800px;
	/* Padding at the top */
	padding-top: 5px;
}

/* Scrollable container for description content */
.container-tournaments
	.details-tournament
	.description-container
	.desc-contain
	.scrolls {
	/* Enable horizontal scrolling */
	overflow-x: scroll;
	/* Disable vertical scrolling */
	overflow-y: hidden;
	/* Fixed height for the scrollable area */
	height: 80px;
	/* Prevent line breaks, keep content in a single line */
	white-space: nowrap;
}

.container-tournaments .details-tournament .ranking-container {
	/* Container for tournament ranking, fixed width */
	width: 255px;
	min-width: 255px; /* Ensures minimum width is maintained */
}

.container-tournaments .details-tournament .ranking-container .tittle {
	/* Title styling for the ranking section */
	padding-bottom: 5px; /* Space below the title */
	background: #b48303; /* Background color for the title */
	position: relative; /* Positioning context for the pseudo-element */
	top: -16px; /* Adjusts vertical position */
	padding: 8px 15px; /* Padding around the title text */
	width: calc(100% + 36px); /* Expands width beyond parent container */
	left: -18px; /* Adjusts horizontal position */
	border-radius: 5px 5px 0 0; /* Rounded corners for the top */
	font-size: 14px; /* Font size for the title text */
}

.container-tournaments .details-tournament .ranking-container .tittle:after {
	/* Pseudo-element for decorative triangle below the title */
	content: ''; /* Required for pseudo-elements */
	position: absolute; /* Positioned relative to the title */
	left: auto; /* Default left positioning */
	right: 0; /* Aligns to the right of the title */
	bottom: 0; /* Aligns to the bottom of the title */
	width: 0px; /* No width for the triangle */
	height: 0; /* No height for the triangle */
	border-bottom: 8px solid #545454; /* Color and size of the triangle */
	border-left: 226px solid transparent; /* Creates the triangle shape */
}

.container-tournaments .details-tournament .ranking-container .ranking-contain {
	/* Enables vertical scrolling if content exceeds max height */
	overflow-y: auto;
	/* Sets the maximum height of the ranking container */
	max-height: 178px;
	/* Sets the font size for the text within the container */
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
	/* Adds a right border to table cells and headers with a semi-transparent white color */
	border-right: 1px solid #ffffff4a;
}

.container-tournaments
	.details-tournament
	.ranking-container
	.ranking-contain
	table {
	/* Collapses borders between table cells for a cleaner look */
	border-collapse: collapse;
	/* Sets the table width to fill the container */
	width: 100%;
}

/* Main container for tournaments */
.container-tournaments {
}

/* Details section for each tournament */
.details-tournament {
}

/* Container for ranking information */
.ranking-container {
}

/* Specific container for ranking items */
.ranking-contain {
}

/* Table header styling */
th {
	text-align: left; /* Aligns text to the left */
	padding: 4px 15px; /* Adds padding around header cells */
}

/* Last table header cell styling to remove right border */
th:last-child {
	border-right: none; /* Removes right border for the last header cell */
}

/* Table data cell styling */
td {
	padding: 4px 15px; /* Adds padding around data cells */
}

/* Container for ranking elements */
.ranking-contain td:last-child {
	/* Remove right border for the last table cell */
	border-right: none;
}

/* Main container for tournaments */
.container-tournaments
	.details-tournament
	.ranking-container
	.current-position {
	/* Positioning and sizing for current position element */
	position: relative;
	width: calc(100% + 36px); /* Extend width to accommodate padding */
	left: -18px; /* Shift left to align properly */
	padding-top: 2px; /* Add top padding */
}

/* Table cells and headers within current position */
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
	/* Set right border for table cells and headers */
	border-right: 1px solid #2f2f2f; /* Dark gray border */
}

.container-tournaments {
	/* Main container for the tournaments section */
}

.details-tournament {
	/* Container for tournament details */
}

.ranking-container {
	/* Container for ranking information */
}

.current-position {
	/* Styles for the current position table */
	border-collapse: collapse; /* Ensures borders between cells are collapsed */
	width: 100%; /* Full width of the parent container */
	background: #505050; /* Dark background color */
	font-weight: bold; /* Bold text for emphasis */
	border-radius: 0 0 5px 5px; /* Rounded corners at the bottom */
}

.container-tournaments
	.details-tournament
	.ranking-container
	.current-position
	th {
	/* Styles for table header cells */
	text-align: left; /* Aligns text to the left */
	padding: 4px 15px; /* Padding for spacing within header cells */
}

.container-tournaments
	.details-tournament
	.ranking-container
	.current-position
	th:last-child {
	/* Styles for the last header cell */
	border-right: none; /* Removes right border for the last header cell */
}

/* Main container for tournaments */
.container-tournaments
  /* Details section for each tournament */
.details-tournament
  /* Container for ranking information */
.ranking-container
  /* Current position display */
.current-position
  /* Table cell styling */
td {
	padding: 4px 15px; /* Padding for table cells */
}

/* Remove right border for the last cell in the row */
td:last-child {
	border-right: none; /* No right border for the last cell */
}

/* Styling for the first cell in each row */
tr td:first-child {
	width: 21.2px; /* Fixed width for the first cell */
	padding-left: 33px; /* Left padding for the first cell */
}

/* Container for ranking display */
.ranking-container
  /* Current position indicator */
.current-position
  /* Table row styling */
tr
  /* Style for the second column of table cells */
td:nth-child(2) {
	width: 65px; /* Set fixed width for the second column */
}

/* Hide second navigation block in specific container states */
.conteiner.show-fix .second-nav-block,
.conteiner.show-game .second-nav-block {
	display: none; /* Prevent display of second navigation block */
}

/* Table color settings for awards and conversion sections */
.awards-contain table,
.convertion-contain table {
	color: black; /* Set text color to black */
}

/* Close button and list styling within tournaments container */
.container-tournaments .more-details .close,
.container-tournaments .list-tournaments,

  /* General rules styling */
.rules,

  /* Currency display within conversion section */
.container-tournaments .more-details .right .convertion-contain .moneda,

  /* Award descriptions and currency display */
.container-tournaments
.more-details
.complet-descrip
.awards
.awards-contain
.moneda,

  /* Join button styling within tournaments container */
.container-tournaments .more-details .right .join,
  /* Styles for the tournament button within the tournament list */
.container-tournaments .list-tournaments .buttom {
	cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
}

/* Animation for the popup background entering */
@keyframes popup-bg-enter {
	0% {
		display: none; /* Initially hidden */
		opacity: 0; /* Fully transparent */
	}
	1% {
		display: block; /* Becomes visible */
		opacity: 0; /* Still fully transparent */
	}
	100% {
		opacity: 1; /* Fully opaque */
	}
}

/* Animation for the popup background closing */
@keyframes popup-bg-closed {
	0% {
		display: block !important; /* Remains visible */
		opacity: 1; /* Fully opaque */
	}
	1% {
		display: block; /* Continues to be visible */
		opacity: 1; /* Still fully opaque */
	}
	100% {
		opacity: 0; /* Fades out to fully transparent */
		display: none !important; /* Finally hidden */
	}
}

/* Animation for the popup entering the view */
@keyframes popup-enter {
	0% {
		display: none; /* Initially hidden */
		opacity: 0; /* Fully transparent */
	}
	1% {
		display: block; /* Make it visible */
		opacity: 0; /* Still fully transparent */
		transform: scale(0); /* Start from scale 0 */
	}
	100% {
		opacity: 1; /* Fully opaque */
		transform: scale(1); /* Scale to original size */
	}
}

/* Animation for the popup closing */
@keyframes popup-closed {
	0% {
		display: block !important; /* Ensure it remains visible */
		opacity: 1; /* Fully opaque */
	}
	1% {
		display: block; /* Still visible */
		opacity: 1; /* Fully opaque */
		transform: scale(1); /* Original size */
	}
	100% {
		opacity: 0; /* Fade out to transparent */
		transform: scale(0); /* Scale down to 0 */
		display: none !important; /* Hide the element */
	}
}

/* Styles for the tournaments section */
body .torneos {
}

/* Hides the icon in the tournament title container */
.container-tournaments .list-tournaments .container-title i {
	display: none;
}

/* Aligns the expand container to the right */
.container-tournaments .list-tournaments .container-expand {
	float: right;
}

/* Styles for the icon within the expand container */
.container-tournaments .list-tournaments .container-expand i {
	height: 26px; /* Sets the height of the icon */
	padding-top: 7px; /* Adds top padding */
	padding-left: 5px; /* Adds left padding */
}

/* Media query for screens with a maximum width of 730px */
@media screen and (max-width: 730px) {
	/* Sets a fixed height for the tournament list */
	.container-tournaments .list-tournaments {
		height: 74px !important; /* Forces height */
	}

	/* Adds margin to the time left container */
	.container-tournaments .list-tournaments .timeleft-container {
		margin: 5px 0; /* Vertical margin */
	}

	/* Styles for buttons in the tournament list */
	.container-tournaments .list-tournaments .buttom {
		font-size: 18px !important; /* Increases font size */
		margin-left: 5px !important; /* Adds left margin */
		margin-right: 5px !important; /* Adds right margin */
	}

	/* Hides the tournament logo */
	.container-tournaments .list-tournaments .tournament-logo {
		display: none; /* Hides the logo */
	}

	/* Styles for the tournament title */
	.container-tournaments .list-tournaments .tournament-title {
		overflow: hidden; /* Hides overflow content */
		display: inline-block; /* Displays as inline block */
	}

	/* Sets the width of the title container to full */
	.container-tournaments .list-tournaments .container-title {
		width: 100%; /* Full width */
	}

	/* Styles for the icon in the title container */
	.container-tournaments .list-tournaments .container-title i {
		float: right; /* Aligns icon to the right */
		display: inline-block; /* Displays as inline block */
	}

	/* Hides the expand container */
	.container-tournaments .list-tournaments .container-expand {
		display: none; /* Hides the expand section */
	}

	/* Styles for the gift price span */
	span.gift-price {
		font-size: 16px !important; /* Sets font size */
		padding-right: 0 !important; /* Removes right padding */
	}

	/* Styles for the tournament state */
	.tournaments-state {
		padding-right: 0 !important; /* Removes right padding */
	}
}

/* Media query for screens with a maximum width of 768px */
@media screen and (max-width: 768px) {
	/* Styles for the tournament state container */
	.tournaments-state {
		min-width: 0 !important; /* Override minimum width */
		margin-top: 10px; /* Add top margin */
	}

	/* Styles for the tournament details description container */
	.container-tournaments .details-tournament .description-container {
		width: 100% !important; /* Full width */
		min-height: 218px; /* Minimum height */
		height: auto !important; /* Automatic height */
		padding: 34px 18px !important; /* Padding for content */
	}

	/* Styles for the tournament ranking container */
	.container-tournaments .details-tournament .ranking-container {
		width: 100% !important; /* Full width */
		margin: 10px 0; /* Vertical margin */
	}

	/* Styles for the image within the description container */
	.container-tournaments
		.details-tournament
		.description-container
		.desc-contain
		.image {
		width: auto !important; /* Automatic width */
		height: auto !important; /* Automatic height */
		display: block; /* Block display */
		margin: 15px auto 5px; /* Centered margins */
	}

	/* Styles for the text container within the description */
	.container-tournaments
		.details-tournament
		.description-container
		.desc-contain
		.text-container {
		padding-left: 0px !important; /* Remove left padding */
		width: 100% !important; /* Full width */
	}

	/* Styles for the text within the text container */
	.container-tournaments
		.details-tournament
		.description-container
		.desc-contain
		.text-container
		.text {
		margin: 10px 0; /* Vertical margin */
	}

	/* Styles for paragraphs within the text */
	.container-tournaments
		.details-tournament
		.description-container
		.desc-contain
		.text-container
		.text
		p {
		height: auto !important; /* Automatic height */
	}

	/* Styles for the complete description section */
	.container-tournaments .more-details .complet-descrip {
		width: 100% !important; /* Full width */
	}

	/* Styles for the right section of more details */
	.container-tournaments .more-details .right {
		width: calc(100% - 10px) !important; /* Full width minus 10px */
		padding: 0 5px !important; /* Horizontal padding */
	}

	/* Styles for the heading within the conversion section */
	.container-tournaments .more-details .right .convertion h3 {
		width: calc(100% + 36px) !important; /* Width with additional space */
	}

	/* Styles for direct children of more details */
	.container-tournaments .more-details > div {
		padding-bottom: 0 !important; /* Remove bottom padding */
	}

	/* Styles for awards section within complete description */
	.container-tournaments .more-details .complet-descrip .awards {
		width: 100% !important; /* Full width */
		margin-bottom: 0 !important; /* Remove bottom margin */
	}
}

/* Media query for screens between 769px and 980px */
@media screen and (min-width: 769px) and (max-width: 980px) {
	.container-tournaments .details-tournament .description-container {
		/* No specific styles defined for this container */
	}
}

/* Media query for screens with a maximum width of 1220px */
@media screen and (max-width: 1220px) {
	.container-tournaments .more-details {
		/* Set width to 100% minus 50px, overriding other styles */
		width: calc(100% - 50px) !important;
	}

	.container-tournaments .details-tournament {
		/* Allow height to adjust automatically, overriding other styles */
		height: auto !important;
	}
}

/* Media query for screens between 769px and 1220px */
@media screen and (min-width: 769px) and (max-width: 1220px) {
	.container-tournaments .more-details .complet-descrip {
		/* Set width to 100% minus 290px, overriding other styles */
		width: calc(100% - 290px) !important;
	}

	.container-tournaments .more-details .right {
		/* Set minimum width for the right section */
		min-width: 260px;
	}
}

/* Media query for screens with a maximum width of 768px */
@media screen and (max-width: 768px) {
	.container-filter .filter {
		/* Set filter width to 100% */
		width: 100%;
	}

	.container-tournaments .details-tournament .description-container {
		/* Set description container width to 100% */
		width: 100%;
	}

	.container-tournaments .details-tournament .ranking-container {
		/* Set ranking container width to 100% with margin */
		width: 100%;
		margin: 10px 0;
	}

	.container-tournaments .more-details .complet-descrip .awards {
		/* Set awards section width to 100% */
		width: 100%;
	}

	.tournaments .more-details .complet-descrip {
		/* Force width to 100%, overriding other styles */
		width: 100% !important;
	}

	.container-tournaments .more-details .right {
		/* Set right section width to 100% and add padding */
		width: 100% !important;
		padding: 0 5px !important;
	}

	.container-tournaments .more-details .right .convertion h3 {
		/* Set width of h3 element to 100% plus 36px */
		width: calc(100% + 36px);
	}
}

/* Media query for screens with a maximum width of 800px */
@media screen and (max-width: 800px) {
	/* Set the height of the tournament list to 93px for smaller screens */
	.container-tournaments .list-tournaments {
		height: 93px !important;
	}
}

/* Media query for screens with a maximum width of 500px */
@media screen and (max-width: 500px) {
	/* Set the height of the tournament list to 154px for very small screens */
	.container-tournaments .list-tournaments {
		height: 154px !important;
	}
}

/* Style for the InfoPage class within the Framework */
.Framework.InfoPage {
	/* Set background to transparent */
	background: transparent;
}

/* Padding reset for the first header cell in the ranking container */
.container-tournaments
	.details-tournament
	.ranking-container
	.ranking-contain
	th:first-child {
	/* Remove padding for the first header cell */
	padding: 0;
}

/* Padding reset for the first data cell in the ranking container */
.container-tournaments
	.details-tournament
	.ranking-container
	.ranking-contain
	td:first-child {
	/* Remove padding for the first data cell */
	padding: 0;
}

/* Container for tournament details and rankings */
.container-tournaments .details-tournament .ranking-container .ranking-contain {
	overflow-x: hidden; /* Prevents horizontal overflow */
}

/* Table cell styling within the ranking container */
.container-tournaments
	.details-tournament
	.ranking-container
	.ranking-contain
	td {
	padding: 4px 10px; /* Adds padding for table cells */
}

/* Styling for select elements within tournament boxes */
.tournament-box select,
.tournament-box select.FormInput {
	margin: 0 10px; /* Adds horizontal margin */
	max-width: 100%; /* Ensures the select does not exceed container width */
	width: 100%; /* Sets width to fill the container */
	color: #9c9da8; /* Text color for the select */
	background-color: white; /* Background color for the select */
	height: 40px; /* Fixed height for the select */
}

/* Hides the pseudo-element after strong elements in SimplePageTitle */
.SimplePageTitle strong:after {
	display: none; /* Prevents display of the after pseudo-element */
}

/* Strong text styling within SimplePageTitle */
.tournament-box .SimplePageTitle strong {
	color: black; /* Sets text color to black */
}

/* Styles for the right menu button */
span#menuRight {
	width: 25px; /* Fixed width for the menu button */
	padding: 45px 0; /* Vertical padding for spacing */
	background: #262a3a; /* Background color of the button */
	color: rgba(
		255,
		255,
		255,
		0.8705882352941177
	); /* Text color with transparency */
	position: absolute; /* Positioned absolutely within the parent */
	right: 0; /* Aligns the button to the right */
	display: block; /* Displays the element as a block */
	z-index: 10; /* Stacking order to appear above other elements */
	height: 100%; /* Full height of the parent */
	margin-top: -5px; /* Negative margin for slight upward adjustment */
	vertical-align: middle; /* Aligns the content vertically */
	background: -webkit-linear-gradient(
		/* Gradient background for the button */ 90deg,
		/* Direction of the gradient */ rgb(20, 21, 24) 1%,
		/* Start color */ rgb(42, 45, 58) 48%,
		/* Middle color */ rgb(17, 18, 23) 100% /* End color */
	) !important; /* Ensures this style takes precedence */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Styles for the left menu button */
span#menuLeft {
	float: left; /* Floats the button to the left */
	width: 25px; /* Fixed width for the menu button */
	padding: 45px 0; /* Vertical padding for spacing */
	background: #262a3a; /* Background color of the button */
	color: rgba(
		255,
		255,
		255,
		0.8705882352941177
	); /* Text color with transparency */
	position: absolute; /* Positioned absolutely within the parent */
	left: 0; /* Aligns the button to the left */
	display: block; /* Displays the element as a block */
	z-index: 1; /* Stacking order to appear below the right menu */
	margin-top: -5px; /* Negative margin for slight upward adjustment */
	height: 100%; /* Full height of the parent */
	background: -webkit-linear-gradient(
		/* Gradient background for the button */ 90deg,
		/* Direction of the gradient */ rgb(20, 21, 24) 1%,
		/* Start color */ rgb(42, 45, 58) 48%,
		/* Middle color */ rgb(17, 18, 23) 100% /* End color */
	) !important; /* Ensures this style takes precedence */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Preloader animation for the tournaments section */
.torneos-preloader {
	-webkit-animation: pulset 3s infinite ease-in-out; /* Animation for WebKit browsers */
	-o-animation: pulst2 3s infinite ease-in-out; /* Animation for Opera browsers */
	-ms-animation: pulset 3s infinite ease-in-out; /* Animation for Internet Explorer */
	-moz-animation: pulset 3s infinite ease-in-out; /* Animation for Firefox */
	animation: pulset 3s infinite ease-in-out; /* Standard animation property */
}

/* Style for the first tournament placeholder */
.torneos-p1 {
	height: 54px; /* Fixed height for the placeholder */
	background: #00000040; /* Semi-transparent black background */
	border-radius: 5px; /* Rounded corners */
	margin: 11px 0; /* Vertical margin */
}

/* Style for the second tournament placeholder */
.torneos-p2 {
	height: 54px; /* Fixed height for the placeholder */
	background: #00000025; /* More transparent black background */
	border-radius: 5px; /* Rounded corners */
	margin: 11px 0; /* Vertical margin */
}

/* Style for the third tournament placeholder */
.torneos-p3 {
	height: 54px; /* Fixed height for the placeholder */
	background: #00000010; /* Even more transparent black background */
	border-radius: 5px; /* Rounded corners */
	margin: 11px 0; /* Vertical margin */
}

.tournaments-state {
	/* Aligns the tournaments state element to the right */
	float: right;
	/* Adds right padding for spacing */
	padding-right: 18px;
	/* Sets a minimum width for the element */
	min-width: 140px;
}

.container-tournaments .list-tournaments .timeleft-container {
	/* Aligns the time left container to the right */
	float: right;
}

.old-lobby #lobby-casino {
	/* Sets the height to fill the parent container */
	height: 100%;
	/* Hides overflow content */
	overflow: hidden;
	/* Ensures the background image is contained within the element */
	background-size: contain;
}

.old-lobby .category-icon {
	/* Sets the width of the category icon */
	width: 40px;
	/* Centers the icon horizontally */
	margin: 0 auto;
	/* Sets the height of the category icon */
	height: 50px;
}

.old-lobby li.category-list {
	/* Resets float to none for list items */
	float: none;
	/* Displays list items inline-block */
	display: inline-block;
	/* Ensures padding and border are included in the element's total width and height */
	box-sizing: border-box;
	/* Sets the text color for the category list items */
	color: #fbf2df;
	/* Defines font properties including size, line height, and font family */
	font:
		13px/16px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Adds a transition effect for color changes */
	transition: color 250ms;
	/* Prevents text from wrapping to the next line */
	white-space: nowrap;
	/* Adds ellipsis for overflow text */
	text-overflow: ellipsis;
	/* Hides overflow content */
	overflow: hidden;
	/* Adds horizontal padding */
	padding: 0 2%;
	/* Adds bottom margin for spacing between list items */
	margin-bottom: 5px;
}

/* Styles for the left column navigation in the old lobby */
.old-lobby .left-column-casino-nav {
	text-align: center; /* Center-aligns text within the navigation */
	padding: 20px; /* Adds padding around the navigation */
}

/* Styles for the game list view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 {
	grid-area: span 2 / span 2 / auto / auto; /* Defines grid area for layout */
	width: 100% !important; /* Forces width to 100% */
	height: 100% !important; /* Forces height to 100% */
}

/* Styles for the providers list items in the old lobby */
.old-lobby li.providers-list {
	display: inline-block; /* Displays list items inline */
	vertical-align: top; /* Aligns items to the top */
	color: #fbf2df; /* Sets text color */
	font: /* Sets font properties */
		12px/32px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-transform: uppercase; /* Transforms text to uppercase */
	height: 32px; /* Sets fixed height for list items */
}

/* Styles for the navigation controls in the casino lobby */
.old-lobby #lobby-casino .flex-control-nav {
	max-width: 200px; /* Sets maximum width for navigation */
	display: inline-table; /* Displays navigation as an inline table */
	left: calc(50% - 100px); /* Centers navigation horizontally */
	background: #787f90 d1; /* Sets background color */
	padding: 4px; /* Adds padding around the navigation */
	border-radius: 41px; /* Rounds the corners of the navigation */
}

/* Styles for the casino navigation in the old lobby */
.old-lobby .providers-nav-casino {
	text-align: center; /* Center-aligns text within the navigation */
	float: left; /* Floats the navigation to the left */
	width: 100%; /* Full width of the parent container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	background: #09132f; /* Dark background color */
	margin: 20px 0 0px; /* Margin above and below the element */
	padding: 0; /* No padding */
	animation: provider-open-animate-b 500ms ease-in-out; /* Animation for opening the provider */
	overflow: hidden; /* Hides overflow content */
	max-height: 500px; /* Maximum height of the navigation */
	height: 43px; /* Default height */
}

/* Padding for the masonry layout in the old lobby */
.old-lobby ul.masonry {
	padding-top: 15px; /* Top padding for the masonry list */
}

/* Styles for the closed state of the casino navigation */
.old-lobby .providers-nav-casino.closed {
	animation: provider-closed-animate-b 280ms ease; /* Animation for closing the provider */
	max-height: 46px; /* Maximum height when closed */
}

/* Styles for game list items with preload animations */
.old-lobby li.list-games-casino-view-b.preload-game-top,
.old-lobby li.list-games-casino-view-b.preload-game-bottom {
	background: #787f90 26; /* Background color with opacity */
	-webkit-animation: pulset 3s infinite ease-in-out; /* Animation for webkit browsers */
	-o-animation: pulst2 3s infinite ease-in-out; /* Animation for Opera */
	-ms-animation: pulset 3s infinite ease-in-out; /* Animation for Internet Explorer */
	-moz-animation: pulset 3s infinite ease-in-out; /* Animation for Firefox */
	animation: pulset 3s infinite ease-in-out; /* Standard animation for other browsers */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Adjusts padding for the casino providers navigation list on smaller screens */
	.old-lobby .providers-nav-casino > ul {
		padding-left: 25px; /* Sets left padding */
		padding-right: 25px; /* Sets right padding */
	}
}

/* Styles for the casino providers navigation list */
.old-lobby .providers-nav-casino > ul {
	float: left; /* Aligns the list to the left */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-align: center; /* Centers text within the list */
	padding: 0; /* Resets padding */
	font-size: 0; /* Hides text size for child elements */
	height: auto; /* Allows height to adjust based on content */
	overflow: hidden; /* Hides overflow content */
	margin: 2px 0; /* Sets vertical margin */
	padding-top: 4px; /* Adds top padding */
	display: inline-block; /* Allows the element to be inline while maintaining block properties */
	overflow-x: hidden; /* Hides horizontal overflow */
	width: 100%; /* Sets width to full container */
	white-space: nowrap; /* Prevents text from wrapping */
	padding-left: 30px; /* Sets left padding */
}

/* Styles for each list item in the casino providers navigation */
.old-lobby .providers-nav-casino > ul > li {
	display: inline-block; /* Displays list items inline */
	vertical-align: top; /* Aligns items to the top */
	color: #fbf2df; /* Sets text color */
	font: /* Sets font properties */
		12px/32px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-transform: uppercase; /* Transforms text to uppercase */
	height: 32px; /* Sets fixed height for list items */
}

/* Styles for the casino games list box in the old lobby */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
	width: 100%; /* Sets the width to 100% of the parent container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
}

/* Styles for the overall casino games list in the old lobby */
.old-lobby .all-games-casino-list {
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	width: 100%; /* Sets the width to 100% of the parent container */
	padding: 0; /* Removes default padding */
	min-height: 750px; /* Sets a minimum height for the list */
	margin-bottom: 10px; /* Adds space below the list */
}

/* Styles for the unordered list of casino games in the list box */
.old-lobby .all-casino-games-list-box > div > ul {
	display: grid !important; /* Uses CSS Grid layout for the list */
	grid-template-columns: repeat(
		auto-fill,
		minmax(180px, 1fr)
	); /* Creates responsive columns */
	grid-gap: 16px; /* Sets the gap between grid items */
	grid-auto-rows: minmax(129px, auto); /* Sets the height of grid rows */
	grid-auto-flow: dense; /* Fills the grid in a dense manner */
}

/* Styles for the game view container and its elements */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
	width: 100% !important; /* Forces the width to 100% of the parent container */
	height: 100% !important; /* Forces the height to 100% of the parent container */
	border-radius: 6px; /* Rounds the corners of the elements */
}

/* Styles for the old lobby section */
.old-lobby .game-img-box-b:before {
	/* Pseudo-element for overlay effect */
	content: ''; /* Generates an empty content for the pseudo-element */
	display: block; /* Makes the pseudo-element a block-level element */
	position: absolute; /* Positions the element absolutely within its parent */
	top: 0; /* Aligns the top edge to the parent */
	left: 0; /* Aligns the left edge to the parent */
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	z-index: 88; /* Stacking order of the element */
	background: #171a22 ed; /* Background color with a potential typo (extra 'ed') */
	opacity: 0; /* Fully transparent initially */
	transition: opacity 0.8s; /* Smooth transition for opacity changes */
}

.old-lobby .game-img-box-b {
	/* Styles for the game image box */
	float: left; /* Floats the element to the left */
	width: 100%; /* Full width of the parent */
	background-size: cover; /* Scales the background image to cover the element */
	background-repeat: no-repeat; /* Prevents background image from repeating */
	background-position: 50% 50%; /* Centers the background image */
	height: 114px; /* Fixed height for the element */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	position: relative; /* Positions the element relative to its normal position */
	display: block; /* Makes the element a block-level element */
}

.old-lobby
  /* Container for deposit alerts in the casino section */
.deposit-alert-contain.casino
  /* Slider for displaying games */
.games-slider
  /* List of all games available in the casino */
.all-games-casino-list
  /* Unordered list styling for game items */
ul
  /* List item styling for game views in the casino */
li.list-games-casino-view-b,
.old-lobby .list-games-casino-view-b,
.old-lobby .save-games-contain .games-slider ul > .list-games-casino-view-b {
	/* Align items to the left */
	float: left;
	/* Set width to 20% of the container */
	width: 20%;
	/* Allow height to adjust automatically */
	height: auto;
	/* Include padding and border in the element's total width and height */
	box-sizing: border-box;
	/* Display items as block elements */
	display: block;
	/* Margin settings for spacing between items */
	margin: 0 5px 5px 0;
	/* Animation for item appearance */
	animation: popup-enter 0.3s ease-in-out;
	/* 3D transformation placeholder */
	transform: 3d (0, 0, 0);
}

/* Wrapper for separating games in the old lobby */
.old-lobby .wrapper-separator-games {
	/* Full width of the container */
	width: 100%;
	/* Include padding and border in the element's total width and height */
	box-sizing: border-box;
	/* Positioning context for child elements */
	position: relative;
}

/* Padding for the separator in the old lobby */
.old-lobby .wrapper-separator-games {
	/* Padding on the left and right */
	padding: 0 5% !important;
}

/* Styling for casino resize buttons in the old lobby */
.old-lobby .casino-resize-buttons > div {
	/* Display buttons inline */
	display: inline-block;
	/* Fixed height for buttons */
	height: 60px;
}

/* Styles for the favorite game name in the old lobby section */
.old-lobby .deposit-alert-contain.casino .game-name-b-favorite,
.old-lobby .game-name-b-favorite {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	padding: 0 15px 0 8px; /* Adds padding: top 0, right 15px, bottom 0, left 8px */
	height: 28px; /* Sets a fixed height of 28 pixels */
	background: 0 0; /* Resets background properties */
	font: /* Sets the font properties */
		12px/28px Quicksand,
		/* Font size 12px, line height 28px, primary font is Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	font-weight: 700; /* Sets the font weight to bold */
	color: #fbf2df; /* Sets the text color */
	text-decoration: none; /* Removes underline from text */
	white-space: unset; /* Allows text to wrap normally */
	text-overflow: ellipsis; /* Displays ellipsis for overflowed text */
	position: relative; /* Positions the element relative to its normal position */
	z-index: 22; /* Sets the stacking order of the element */
	opacity: 0; /* Sets initial opacity to 0 (invisible) */
	transition: opacity 2s; /* Smooth transition for opacity changes over 2 seconds */
	text-align: center; /* Centers the text within the element */
	margin-bottom: 0; /* Removes bottom margin */
}

/* Styles for the favorite icon view in the old lobby */
.old-lobby .favorite-icon-view {
	width: 24px; /* Set width of the icon */
	height: 16px; /* Set height of the icon */
	position: absolute; /* Positioning the icon absolutely */
	right: 0; /* Align to the right */
	top: 6px; /* Offset from the top */
	font: 14px/16px FontAwesome; /* Font settings using FontAwesome */
	color: #88be86; /* Default color of the icon */
	font-style: normal; /* Normal font style */
	text-decoration: none; /* No text decoration */
	z-index: 88; /* Layering order */
	transition: color 250ms; /* Smooth color transition on hover */
	display: block; /* Display as a block element */
	text-align: center; /* Center align text/icon */
}

/* Active state and hover effect for the favorite icon */
.old-lobby .favorite-icon-view.active,
.old-lobby .favorite-icon-view:hover {
	color: #00d30a; /* Change color on active or hover */
}

/* Styles for casino resize buttons */
.old-lobby .casino-resize-buttons > div button span {
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	display: block; /* Display as a block element */
	overflow: hidden; /* Hide overflow content */
	text-overflow: ellipsis; /* Show ellipsis for overflow text */
	padding: 0 12px; /* Padding on left and right */
	box-sizing: border-box; /* Include padding in width/height calculations */
}

/* Styles for the old lobby section */
.old-lobby .favorite-icon-view:before {
	content: '\f005'; /* Font Awesome star icon */
}

/* Styles for casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of the parent */
	font: /* Font settings for the button text */
		12px/29px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0 auto; /* Center the button horizontally */
}

/* Styles for individual casino resize buttons */
.old-lobby .casino-resize-buttons > div button {
	height: 30px; /* Set button height */
	display: block; /* Make button a block element */
	width: 100%; /* Set button width to 100% of the parent */
	padding: 0; /* Remove padding */
	border: 0; /* Remove border */
	-webkit-border-radius: 5px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 5px; /* Rounded corners for Mozilla browsers */
	border-radius: 5px; /* Standard rounded corners */
	opacity: 0; /* Initially hidden */
	transition: opacity 500ms; /* Smooth transition for opacity change */
	background: linear-gradient(
		to bottom,
		#00ff14,
		#006208
	); /* Green gradient background */
	font-weight: bold !important; /* Bold text */
	color: white; /* Text color */
	font: /* Font settings for the button text */
		12px/30px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	text-transform: uppercase; /* Uppercase text */
	cursor: pointer; /* Pointer cursor on hover */
}

/* Styles for buttons within the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of its parent */
	font: /* Font properties for the button text */
		12px/29px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	margin: 0 auto; /* Center the button horizontally */
}

/* Container for casino resize buttons */
.old-lobby .casino-resize-buttons {
	display: block; /* Display as a block element */
	width: 100%; /* Full width of the parent */
	position: absolute; /* Positioned absolutely within the parent */
	height: 60px; /* Fixed height for the container */
	text-align: center; /* Center text within the container */
	top: 0; /* Align to the top of the parent */
	left: 0; /* Align to the left of the parent */
	right: 0; /* Align to the right of the parent */
	margin: 0; /* No margin */
	z-index: 90; /* Stack order for overlapping elements */
}

/* Hover effect for game image box */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
	opacity: 1; /* Make the pseudo-element fully visible on hover */
}

/* Adjust margin for paragraph within casino resize buttons on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
	margin-bottom: 35px !important; /* Override margin to 35px on hover */
}

/* Styles for the old lobby section of the casino games view */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
	/* Transform button on hover */
	transform: X(0);
}

.old-lobby .list-games-casino-view-b:hover > a {
	/* Change border color of the link on hover */
	border-color: #fea402;
}

.old-lobby .list-games-casino-view-b:hover .play-now-game-b > span {
	/* Apply 3D transform and set opacity for the play now button on hover */
	transform: 3d (0, 0, 0);
	opacity: 1;
}

.old-lobby .list-games-casino-view-b:hover .game-name-b-favorite {
	/* Change text color of the favorite game name on hover */
	color: white;
}

/* Set opacity for various elements on hover */
.old-lobby
	.list-games-casino-view-b:hover
	.casino-resize-buttons
	> div
	.game-name-b-favorite,
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button,
.old-lobby .list-games-casino-view-b:hover > a > .game-img-box-b:before {
	opacity: 1; /* Ensure these elements are fully visible on hover */
}

/* Styles for the game view when displayed in a 2-row layout */
.old-lobby .list-games-casino-view-b.rows-2 {
	/* Span 2 columns and 2 rows in the grid layout */
	grid-column: span 2;
	grid-row: span 2;
	width: 100% !important; /* Force full width */
	height: 100% !important; /* Force full height */
}

/* Keyframes for the pulse animation effect used in the casino lobby */
@keyframes pulseCasino {
	0% {
		transform: scale(1); /* Initial scale of the element */
		box-shadow: 0 0 0 0 #ff9600; /* Initial box shadow with color */
	}
	70% {
		transform: scale(1); /* Scale remains the same */
		box-shadow: 0 0 0 7px #0c1019 0; /* Box shadow expands to create a pulsing effect */
	}
	100% {
		transform: scale(1); /* Scale remains the same */
		box-shadow: 0 0 0 0 #ff9600 40; /* Box shadow returns to initial state */
	}
}

/* Styling for the neon effect in the old lobby section */
.old-lobby .neon1 {
	border: 2px solid #dc8200; /* Border color for the neon effect */
	animation: pulseCasino 2s infinite; /* Apply the pulseCasino animation */
}

/* Media query for screens with a maximum width of 1260px */
@media screen and (max-width: 1260px) {
	.old-lobby .all-games-casino-list {
		padding-left: 0; /* Remove left padding for better layout on smaller screens */
	}
}

/* Media query for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
	.old-lobby {
		/* Additional styles can be added here for the old lobby */
	}

	.old-lobby .wrapper-separator-games {
		float: none; /* Disable floating for better stacking on small screens */
		margin-top: 110px; /* Add top margin for spacing */
		overflow-y: scroll; /* Enable vertical scrolling */
		height: calc(100% - 110px); /* Set height to fill remaining space */
	}

	.old-lobby .left-column-casino-nav > ul > li {
		/* Additional styles can be added here for list items */
	}
}

/* Media query for screens with a maximum width of 416px */
@media only screen and (max-width: 416px) {
	/* Styles for game lists in the old lobby with specific classes */
	.old-lobby .list-game-width-100,
	.old-lobby .list-games-casino-view-b.rows-2 {
		/* Each item spans one column and one row in the grid layout */
		grid-column: span 1;
		grid-row: span 1;
	}

	/* Styles for the casino games list box */
	.old-lobby .all-casino-games-list-box > div > ul {
		/* Sets the minimum height for grid rows and defines the column layout */
		grid-auto-rows: minmax(120px, auto);
		grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
	}
}

/* Styles for the Poker category list in the old lobby */
.old-lobby .category-list.Poker .st0 {
	/* Fill color for the first state */
	fill: #d8d6ce;
}

.old-lobby .category-list.Poker .st1 {
	/* Fill color for the second state */
	fill: #eae9e5;
}

.old-lobby .category-list.Poker .st2 {
	/* Fill color for the third state */
	fill: #b99028;
}

.old-lobby .category-list.Poker .st3 {
	/* Fill color for the fourth state */
	fill: #656d78;
}

.old-lobby .category-list.Poker .st4 {
	/* Fill color for the fifth state */
	fill: #af8527;
}

/* Styles for the casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
	height: 100%; /* Set height to 100% of the parent element */
}

/* Styles for the game image box in the old lobby with 2 columns */
.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
	height: 100% !important; /* Force height to 100% overriding other styles */
}

/* Styles for the divs inside casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
	width: 100%; /* Set width to 100% of the parent element */
}

/* Styles for the favorite icon view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
	width: 25px; /* Set width of the favorite icon */
	height: 25px; /* Set height of the favorite icon */
	font-size: 30px; /* Set font size for the favorite icon */
	right: 5px; /* Position the icon 5px from the right */
}

/* Styles for buttons inside casino resize buttons in the old lobby with 2 rows */
.old-lobby
	.list-games-casino-view-b.rows-2
	.casino-resize-buttons
	> div
	button {
	margin-top: 20%; /* Add top margin of 20% */
	display: inline-block; /* Display buttons inline */
}

/* Styles for the search input in the old lobby */
.old-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width change in WebKit browsers */
	transition: width 2s; /* Smooth transition for width change */
	width: 84px; /* Set initial width of the search input */
}

/* Styles for the casino navigation in the left column of the old lobby */
.old-lobby .left-column-casino-nav > ul {
	float: left; /* Aligns the navigation list to the left */
	width: 100%; /* Sets the width to occupy the full container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	display: block; /* Displays the element as a block */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	padding-top: 10px; /* Adds space above the navigation list */
}

/* Enables horizontal scrolling for the navigation list */
.old-lobby .left-column-casino-nav > ul {
	overflow-x: auto; /* Allows horizontal scrolling if content overflows */
	overflow-y: hidden; /* Hides vertical overflow */
}

/* Styles for each list item in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li {
	float: none; /* Resets float for list items */
	display: inline-block; /* Displays list items inline */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	color: #fbf2df; /* Sets the text color */
	font: /* Defines the font properties */
		13px/15px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	transition: color 250ms; /* Smooth transition for color changes */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	text-overflow: ellipsis; /* Displays ellipsis for overflowing text */
	overflow: hidden; /* Hides overflow content */
	padding: 0 2%; /* Adds horizontal padding */
	margin-bottom: 5px; /* Adds space below each list item */
	vertical-align: top; /* Aligns items to the top */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Styles for the search block in the old lobby section */
.old-lobby #searchv3 .block-search {
	height: 55px !important; /* Sets the height of the search block */
	min-width: 55px !important; /* Minimum width to ensure usability */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width of the container */
	max-width: 100% !important; /* Prevents exceeding container width */
	margin: 0 !important; /* Resets margin */
	margin-top: 10px !important; /* Space above the search block */
	margin-bottom: 5px !important; /* Space below the search block */
	border: 1px solid #ff9600; /* Orange border for visibility */
	border-radius: 40px; /* Rounded corners */
}

/* General styles for the search block in the old lobby */
.old-lobby .block-search {
	padding: 0; /* No padding inside the search block */
	min-width: 35px; /* Minimum width for smaller screens */
	margin: 5px 5px 0 0; /* Margin for spacing around the block */
	height: 30px; /* Height of the search block */
	border-radius: 3px; /* Slightly rounded corners */
	background: #fff; /* White background for the search block */
}

/* Additional positioning styles for the search block */
.old-lobby .block-search {
	float: right; /* Aligns the search block to the right */
	position: relative; /* Allows for absolute positioning of child elements */
	z-index: 999; /* High z-index to ensure visibility above other elements */
	text-align: right; /* Aligns text to the right */
	max-width: 250px; /* Maximum width to prevent overflow */
}

/* Styles for the search icon in the old lobby search block */
.old-lobby #searchv3 .block-search:before {
	content: '\f002' !important; /* FontAwesome icon for search */
	font: 33px/50px FontAwesome !important; /* Font size and line height */
	color: #ff9600 !important; /* Icon color */
	position: absolute; /* Positioning relative to the parent */
	left: 10px; /* Left offset */
	top: 0; /* Top offset */
}

/* Styles for the search input in the old lobby */
.old-lobby li#searchv3 input#SearchGame {
	transition: none !important; /* Disable transition effects */
	cursor: pointer !important; /* Change cursor to pointer */
}

/* Styles for the hidden search input in the old lobby */
.old-lobby input#SearchGame.ng-hide {
	width: 0; /* Initial width when hidden */
	transition: width 1s; /* Transition effect for width change */
	display: block !important; /* Ensure it is displayed as a block */
	float: right; /* Float to the right */
	border: 0; /* Remove border */
}

/* Styles for text input in the search block */
.old-lobby .block-search input[type='text'] {
	color: #686767; /* Text color */
	font: /* Font stack for the input text */
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0; /* Remove default margin */
	padding: 8px 5px 8px 30px; /* Padding for the input */
	background: 0 0; /* Transparent background */
	position: relative; /* Positioning relative to the parent */
	z-index: 22; /* Stacking order */
}

/* Styles for the search input field in the old lobby */
.old-lobby .block-search input[type='text'] {
	width: 0; /* Initial width set to 0 for hidden state */
	border: 0; /* No border for a clean look */
	vertical-align: middle; /* Aligns the input vertically in the middle */
	transition: width 600ms; /* Smooth transition for width change */
	border-radius: 3px; /* Rounded corners for the input field */
}

/* Styles for the search input when the search is open */
.old-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width when search is open */
	padding: 0 0 0 60px !important; /* Padding to position text inside the input */
	height: 100%; /* Full height for the input field */
	color: #fff; /* White text color for visibility */
}

/* Container for the search results in the old lobby */
.old-lobby .search-results-inner {
	float: left; /* Floats the container to the left */
	width: 100%; /* Full width for the results container */
	padding: 10px 0 0; /* Padding for spacing above the results */
	position: relative; /* Allows for absolute positioning of child elements */
	z-index: 999; /* High z-index to ensure visibility above other elements */
	background: #fff; /* White background for the results container */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

/* Positioning for the arrow indicator in the sports section */
.old-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Adjusts the vertical position of the arrow */
}

/* Styles for the arrow icon within the search results in the old lobby */
.old-lobby .search-results-inner .arrow-sport {
	right: 50%; /* Positions the arrow icon to the center horizontally */
}

/* General styles for the arrow icon in the old lobby */
.old-lobby .arrow-sport {
	width: 14px; /* Sets the width of the arrow icon */
	height: 11px; /* Sets the height of the arrow icon */
	display: block; /* Displays the arrow as a block element */
	position: absolute; /* Positions the arrow absolutely within its container */
	right: 2px; /* Positions the arrow 2px from the right edge */
	top: -11px; /* Positions the arrow 11px above its normal position */
	z-index: 999; /* Ensures the arrow is on top of other elements */
}

/* Styles for the heading in the search results section of the old lobby */
.old-lobby .search-results-inner h3 {
	font: /* Sets the font properties for the heading */
		20px/22px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #121623; /* Sets the text color */
	text-transform: uppercase; /* Transforms text to uppercase */
}

/* Additional styles for the heading in the search results section */
.old-lobby .search-results-inner h3 {
	width: 100%; /* Sets the width of the heading to fill its container */
	float: left; /* Floats the heading to the left */
	padding: 0; /* Removes any padding */
	text-indent: 10px; /* Indents the text by 10px */
	text-align: left; /* Aligns the text to the left */
}

/* Styles for various elements within the .old-lobby class */

/* Search result container */
.old-lobby #result-search,
  /* Bet container */
.old-lobby .bet-container,
  /* Block for more events */
.old-lobby .block-more-event,
  /* Language selection dropdown */
.old-lobby .clock .open-lang ul,
  /* Hover state for goals container */
.old-lobby .conteiner-goals .hover-sp,
  /* Games slider within deposit alert for casino */
.old-lobby .deposit-alert-contain.casino .games-slider ul,
  /* Express betting container */
.old-lobby .express-contain,
  /* Feedback information textarea */
.old-lobby .fedback-info ul li textarea,
  /* Sign-in form within deposit container */
.old-lobby .form-contain.deposit .form-sign-in,
  /* General text list */
.old-lobby .general-text-list,
  /* Message container */
.old-lobby .message-contain,
  /* Radio container for withdrawals */
.old-lobby .radio-contein-withdraw,
  /* Modern right betslip container */
.old-lobby .right-betslip-contain-modern,
  /* Right block history message and settings info */
.old-lobby
.right-block-history.message.compose
.settings-info-contain
.form-text
textarea,
  /* Casino search results inner container */
.old-lobby .search-results-inner.casino #casino-result-search,
  /* Text payment container */
.old-lobby .text-payment-contain,
  /* Hover state for current time in timeline */
.old-lobby .tl-new .current-time:hover ~ .tl-info .hover-sp,
  /* Hover state for timeline info */
.old-lobby .tl-new .tl-info:hover .hover-sp,
  /* Draws container */
.old-lobby div.draws-contain {
	/* Enable vertical scrolling and hide horizontal scrolling */
	overflow-y: auto;
	overflow-x: hidden;
	/* Custom scrollbar colors */
	scrollbar-track-color: #0c0e14;
	scrollbar-shadow-color: #0c0e14;
	scrollbar-base-color: #373f4e;
	scrollbar-arrow-color: #373f4e;
}

/* Styles for the search results container in the old lobby */
.old-lobby .search-results-inner.casino #casino-result-search {
	float: left; /* Aligns the search results to the left */
	width: 100%; /* Full width of the parent container */
	max-height: 450px; /* Limits the maximum height of the results */
	overflow-y: auto; /* Enables vertical scrolling if content exceeds max height */
	overflow-x: hidden; /* Hides horizontal overflow */
	margin: 10px 0 0; /* Adds margin to the top */
}

/* Styles for the no results message in the old lobby */
.old-lobby .search-no-results {
	font: /* Sets the font properties for the message */
		16px/38px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #f2c36f; /* Sets the text color */
	padding: 0 10px; /* Adds horizontal padding */
	box-sizing: border-box; /* Includes padding in the element's total width and height */
}

/* Additional styles for the no results message */
.old-lobby .search-no-results {
	float: left; /* Aligns the no results message to the left */
	width: 100%; /* Full width of the parent container */
	text-align: left; /* Aligns text to the left */
}

/* Hides the left and right menus in the old lobby */
.old-lobby #menuLeft,
.old-lobby #menuRight {
	display: none; /* Prevents the menus from being displayed */
}

/* Styles for the left providers menu in the old lobby */
.old-lobby #menuLeftProviders {
	float: left; /* Aligns the menu to the left */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: #2e3244; /* Background color of the menu */
	color: #fff 7; /* Text color of the menu */
	position: absolute; /* Positions the menu absolutely */
	left: 0; /* Aligns the menu to the left edge */
	display: block; /* Displays the menu as a block element */
	z-index: 99999; /* Ensures the menu is on top of other elements */
}

/* Styles for the right providers menu in the old lobby */
.old-lobby #menuRightProviders {
	float: right; /* Aligns the menu to the right */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: #2e3244; /* Background color of the menu */
	color: #fff 7; /* Text color of the menu */
	position: absolute; /* Positions the menu absolutely */
	right: 0; /* Aligns the menu to the right edge */
	display: block; /* Displays the menu as a block element */
	z-index: 99999; /* Ensures the menu is on top of other elements */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Hides the home slider in the old lobby */
	.old-lobby div#home-slider {
		display: none; /* Hides the element */
	}

	/* Styles for all games category list */
	.old-lobby li.category-list.all-games {
		float: none !important; /* Overrides float property to stack vertically */
	}

	/* Styles for the left menu in the old lobby */
	.old-lobby #menuLeft {
		float: left; /* Aligns the menu to the left */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the menu */
		color: #fff 7; /* Text color of the menu */
		position: absolute; /* Positions the menu absolutely */
		left: 0; /* Aligns the menu to the left edge */
		display: block; /* Displays the menu as a block element */
		z-index: 1000; /* Ensures the menu is on top of other elements */
	}

	/* Styles for the right menu in the old lobby */
	.old-lobby #menuRight {
		float: right; /* Aligns the menu to the right */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the menu */
		color: #fff 7; /* Text color of the menu */
		position: absolute; /* Positions the menu absolutely */
		right: 0; /* Aligns the menu to the right edge */
		display: block; /* Displays the menu as a block element */
		z-index: 1000; /* Ensures the menu is on top of other elements */
	}

	/* Styles for the casino providers navigation */
	.old-lobby .providers-nav-casino > ul {
		padding-left: 25px; /* Adds left padding */
		padding-right: 25px; /* Adds right padding */
		overflow-x: scroll; /* Allows horizontal scrolling */
	}

	/* Styles for the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul {
		padding-left: 0; /* Removes left padding */
		padding-right: 0; /* Removes right padding */
	}

	/* Styles for the search element in the old lobby */
	.old-lobby li#searchv3 {
		width: 66px; /* Sets the width of the search element */
	}
}

/* Container for the search category navigation in the old lobby */
.old-lobby .search-category-nav-contain {
	width: 95%; /* Sets the width of the container to 95% of its parent */
	margin: 0 auto; /* Centers the container horizontally */
}

/* Media query for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
	/* Adjusts the height of SVG icons in the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul > li svg {
		height: 35px !important; /* Forces the height of SVG icons to 35px */
	}
}

/* Styles for the casino content area in the old lobby */
.old-lobby div#casino-content {
	height: 100% !important; /* Forces the height to 100% of the parent */
	padding-bottom: 0 !important; /* Removes bottom padding */
}

/* Styles for the CasinoSliderBox within the lobby casino */
.old-lobby #lobby-casino div#CasinoSliderBox {
	border-radius: 0 0 35px 35px; /* Rounds the bottom corners of the box */
	width: 91%; /* Sets the width of the slider box to 91% of its parent */
	margin: 0 auto; /* Centers the slider box horizontally */
	overflow: hidden; /* Hides any overflow content */
}

/* Styles for the home slider within the lobby casino */
.old-lobby #lobby-casino div#home-slider {
	background: #091023; /* Sets the background color of the home slider */
	box-shadow: none; /* Removes any box shadow */
}

/* Styles for SVG icons in the left column casino navigation */
.old-lobby .left-column-casino-nav > ul > li svg {
	width: 40px; /* Sets the width of SVG icons to 40px */
	height: 50px; /* Sets the height of SVG icons to 50px */
}

.old-lobby .Populares .category-icon svg {
	/* Default fill color for category icons in the Populares section */
	fill: #787f90;
}

.old-lobby .Populares:hover .category-icon svg {
	/* Fill color and transformation for category icons on hover in the Populares section */
	fill: url(#SVGID_hot) #ffc107; /* Gradient fill on hover */
	transform: scale(1.1); /* Scale up the icon */
	transition: 300ms; /* Smooth transition effect */
}

.old-lobby .Populares.active .category-icon svg {
	/* Fill color for active category icons in the Populares section */
	fill: url(#SVGID_hot) #ffc107; /* Gradient fill for active state */
}

.old-lobby li:hover .category-icon svg {
	/* Fill color and transformation for category icons on hover in list items */
	fill: url(#SVGID_slots3) #ffc107; /* Gradient fill on hover */
	transform: scale(1.1); /* Scale up the icon */
	transition: 300ms; /* Smooth transition effect */
}

.old-lobby li.active .category-icon svg {
	/* Fill color for active category icons in list items */
	fill: url(#SVGID_slots3) #ffc107; /* Gradient fill for active state */
}

.old-lobby li .category-icon svg {
	/* Default fill color for category icons in list items */
	fill: #787f90; /* Standard fill color */
}

.old-lobby li.category-list.all-games {
	/* Styles for the all-games category list item */
	border-left: 2px solid #ff9600; /* Left border to highlight the item */
	margin-left: 10px; /* Left margin for spacing */
	padding-left: 15px; /* Left padding for inner spacing */
}

/* Styles for the fixed element parent in the old lobby */
.old-lobby .fixed-element-parent {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent */
	position: relative; /* Positions the element relative to its normal position */
	z-index: 300; /* Sets the stacking order of the element */
}

/* Wrapper for the casino view navigation in the old lobby */
.old-lobby .fixed-nav-wrapper-casino-view {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent */
	background: hsl(var(--bc)); /* Sets the background color */
}

/* Fixed navigation wrapper for casino view when scrolled */
.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed {
	position: fixed; /* Fixes the position relative to the viewport */
	top: 0; /* Positions the element at the top of the viewport */
	max-width: inherit; /* Inherits the maximum width from the parent */
	z-index: 99; /* Sets the stacking order of the element */
	width: 100%; /* Sets the width to 100% of the parent */
	background: hsl(var(--bc)) !important; /* Sets the background color with !important to override other styles */
	padding-top: 0; /* Removes any top padding */
}

/* Fixed position for scrollable elements within the fixed element parent */
.old-lobby .fixed-element-parent .scrollable-fixed {
	position: fixed; /* Fixes the position relative to the viewport */
	z-index: 400; /* Sets the stacking order of the element */
}

/* Sticky class for elements that should remain fixed at the top */
.old-lobby .sticky {
	position: fixed; /* Fixes the position relative to the viewport */
	top: 0; /* Positions the element at the top of the viewport */
	width: 100%; /* Sets the width to 100% of the parent */
}

.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed:before {
	/* Creates a decorative line above the fixed navigation */
	content: '';
	display: block; /* Makes the pseudo-element a block element */
	position: absolute; /* Positions the element absolutely within its parent */
	height: 3px; /* Sets the height of the line */
	width: 100%; /* Makes the line span the full width of the parent */
	left: 0; /* Aligns the line to the left */
	top: -3px; /* Positions the line 3px above the top of the parent */
	background: hsl(var(--bc)); /* Sets the background color of the line */
}

.old-lobby [ng-click],
.old-lobby [ng-mousedown] {
	/* Changes the cursor to a pointer for clickable elements */
	cursor: pointer; /* Indicates that the element is interactive */
}

.old-lobby .all-casino-games-box {
	/* Styles the container for all casino games */
	float: left; /* Allows the box to float to the left */
	width: 100%; /* Sets the width to 100% of the parent */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	margin: 10px 0 0; /* Sets the top margin to 10px and resets left/right margins */
	position: relative; /* Positions the element relative to its normal position */
	z-index: 9; /* Sets the stacking order of the element */
	margin-top: 0; /* Resets the top margin to 0 */
}

.old-lobby .all-casino-games-box {
	/* Prevents user selection of the content within the box */
	-moz-user-select: none; /* Firefox */
	-khtml-user-select: none; /* Older versions of Safari */
	user-select: none; /* Standard syntax */
	-webkit-user-select: none; /* WebKit browsers */
	-ms-user-select: none; /* Internet Explorer */
}

/* Styles for active and hovered list items in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li.active,
.old-lobby .left-column-casino-nav > ul > li:hover {
	color: #fbf2df; /* Text color for active and hovered items */
	text-shadow: /* Multiple shadows for a glowing effect */
		0 0 20px #fff,
		/* White glow */ 0 0 20px #000,
		/* Black shadow */ 0 0 0 #ffd178,
		/* Light orange shadow */ 0 0 0 #f17,
		/* Red shadow */ 0 0 0 #f17,
		/* Red shadow (duplicate) */ 0 0 80px #f17,
		/* Intense red glow */ 0 0 100px #f17,
		/* Intense red glow */ 0 0 150px #f1a; /* Light red glow */
}

/* Style for the search input when open */
.old-lobby li#searchv3.open {
	width: 89% !important; /* Forces the width to 89% */
}

/* Removes text shadow for the search input on hover */
.old-lobby li#searchv3:hover {
	text-shadow: none !important; /* Ensures no shadow on hover */
}

/* Styles for active links in the providers navigation */
.old-lobby .providers-nav-casino > ul > li > a.active {
	background: linear-gradient(
		to bottom,
		#ffc87a,
		#ff9600,
		#9f5d00
	); /* Gradient background */
	color: #171a22; /* Text color for active links */
	font-weight: bold; /* Bold text for emphasis */
}

/* Styles for the casino navigation links in the old lobby */
.old-lobby .providers-nav-casino > ul > li > a:hover {
	background: #393d49; /* Background color on hover */
}

/* Responsive styles for screens smaller than 1260px */
@media screen and (max-width: 1260px) {
	.old-lobby .providers-nav-casino > ul > li > a {
		padding: 0 10px; /* Reduced padding for smaller screens */
	}
}

/* Base styles for the casino navigation links */
.old-lobby .providers-nav-casino > ul > li > a {
	text-decoration: none; /* No underline for links */
	float: left; /* Aligns links horizontally */
	color: #fbf2df; /* Text color */
	display: block; /* Makes the link a block element */
	padding: 0 15px; /* Horizontal padding */
	box-sizing: border-box; /* Includes padding in width/height calculations */
	transition: color 260ms; /* Smooth color transition */
	border-radius: 5px; /* Rounded corners */
	height: 100%; /* Full height */
	width: 100%; /* Full width */
}

/* Styles for the load more button in the casino games section */
.old-lobby .more-casino-games-load-b {
	float: left; /* Aligns the button horizontally */
	width: 100%; /* Full width */
	margin: 30px 0; /* Vertical margin */
	box-sizing: border-box; /* Includes padding in width/height calculations */
	text-align: center; /* Centers text inside the button */
	padding: 0 0 0 10px; /* Padding on the left */
	transform: 3d (0, 0, 0); /* 3D transformation (not applied correctly) */
}

/* Styles for the paragraph element within the more-casino-games-load-b class in the old-lobby */
.old-lobby .more-casino-games-load-b > p {
	/* Font properties including size, line height, and font family */
	font:
		14px/38px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Bold font weight */
	font-weight: 700;
	/* Text color */
	color: hsl(var(--n));
	/* Transition effects for color and border on hover */
	transition:
		color 260ms,
		border 260ms;
	/* Border styling */
	border: 1px solid hsl(var(--p));
	/* Fixed height for the paragraph */
	height: 37px;
	/* Uppercase text transformation */
	text-transform: uppercase;
	/* Background color */
	background-color: hsl(var(--p));
	/* Rounded corners */
	border-radius: 30px;
	/* Fixed width and centered margin */
	width: 300px;
	margin: 0 auto;
}

/* Styles for the paragraph element on hover */
.old-lobby .more-casino-games-load-b > p:hover {
	/* Change background color on hover */
	background-color: hsl(var(--pf));
	/* Change text color on hover */
	color: hsl(var(--n));
	/* Change cursor to pointer on hover */
	cursor: pointer;
}

/* Styles for the span element within the paragraph */
.old-lobby .more-casino-games-load-b > p > span {
	/* Inline block display for the span */
	display: inline-block;
	/* No padding */
	padding: 0;
	/* Center text alignment */
	text-align: center;
	/* Relative positioning */
	position: relative;
}

/* Styles for the old lobby section */
.old-lobby .big-games-overflow {
	/* Full width and height for the overflow container */
	width: 100%;
	/* Prevents content from overflowing */
	overflow: hidden;
	/* Fixed positioning to cover the entire viewport */
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	/* High z-index to ensure it appears above other elements */
	z-index: 999999999999;
}

/* Styles for the logo image within the old lobby */
.old-lobby .div-logo-j img {
	/* Sets the image height to fill the container */
	height: 100%;
}

/* Background styles for the big game section */
.old-lobby .big-game-background {
	/* No padding for the background */
	padding: 0;
	/* Display as a table for layout purposes */
	display: table;
	/* Full height for the background */
	height: 100%;
	/* Maximum height to prevent overflow */
	max-height: 100%;
	/* Absolute positioning to align within the parent */
	position: absolute;
}

/* Common styles for big game background and containment */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Float elements to the left for horizontal alignment */
	float: left;
	/* Full width for both elements */
	width: 100%;
	/* No padding for these elements */
	padding: 0;
	/* Full height for both elements */
	height: 100%;
}

/* Styles for the old lobby section */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Ensures the background covers the entire area */
	background-size: cover !important;
	/* Sets the background color to black */
	background: black;
}

/* Centering casual game container */
.old-lobby .casual-game {
	/* Centers the element horizontally */
	margin: 0 auto;
	/* Displays the element as a table */
	display: table;
}

/* Styles for the casino game container */
.old-lobby .casino-game-contain {
	/* Sets a minimum height for the container */
	min-height: 300px;
	/* Full width of the parent */
	width: 100%;
	/* No padding */
	padding: 0;
	/* Displays the element as a table cell */
	display: table-cell;
	/* Centers the element horizontally */
	margin: 0 auto;
	/* Centers text within the container */
	text-align: center;
	/* Animation for entering the popup */
	animation: popup-enter 400ms ease-in-out;
}

/* Styles for the flash game container */
.old-lobby .flash-game-contain {
	/* Removes border */
	border: none;
	/* Removes border radius */
	border-radius: 0;
	/* Removes box shadow */
	box-shadow: none;
}

/* Additional styles for the flash game container */
.old-lobby .flash-game-contain {
	/* Sets a minimum width for the container */
	min-width: 300px;
	/* Margin around the container */
	margin: 5px;
	/* Centers text within the container */
	text-align: center;
	/* Displays the element as an inline-block */
	display: inline-block;
	/* Positions the element relative to its normal position */
	position: relative;
	/* Aligns the element to the top */
	vertical-align: top;
	/* Hides overflow content */
	overflow: hidden;
	/* Sets a minimum height for the container */
	min-height: 100px;
}

/* Styles for the big game control in the old lobby */
.old-lobby .big-game-control {
	right: 0; /* Aligns the control to the right */
	float: right; /* Floats the control to the right */
	display: inline-block; /* Allows the control to be inline with other elements */
	width: 100%; /* Sets the width to 100% of the parent container */
	text-align: right; /* Aligns text to the right */
	position: absolute; /* Positions the control absolutely within the parent */
	background: #0c1019; /* Sets the background color */
	z-index: 10; /* Ensures the control is above other elements */
}

/* Styles for the top options in the flash game container */
.old-lobby .flash-game-contain .top-options {
	display: inline-block; /* Allows the top options to be inline with other elements */
}

/* Styles for the first delete icon in the casino game container */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) {
	top: 0; /* Positions the icon at the top */
	right: 2; /* Aligns the icon to the right */
	padding-right: 0; /* Removes right padding */
	background: #0c1019; /* Sets the background color */
	height: 38px; /* Sets the height of the icon */
}

/* Common styles for delete icons in the casino game container */
.old-lobby .casino-game-contain .icon-delete,
.old-lobby .casino-game-contain .icon-delete.favorite,
.old-lobby .casino-game-contain .icon-delete.popup,
.old-lobby .casino-game-contain .icon-delete.refresh {
	top: 7px; /* Positions the icons slightly below the top */
	right: 0; /* Aligns the icons to the right */
	width: 40px; /* Sets the width of the icons */
	height: 40px; /* Sets the height of the icons */
	float: none; /* Resets float property */
	display: inline-block; /* Allows the icons to be inline with other elements */
	margin-bottom: 2px; /* Adds a small margin below the icons */
}

.old-lobby .casino-game-contain .icon-delete {
	/* Sets the position of the delete icon relative to its container */
	position: relative;
	/* Hides text visually while keeping it accessible for screen readers */
	text-indent: -9999em;
}

.old-lobby .casino-game-contain .icon-delete.refresh a:before {
	/* Adds a refresh icon before the link using FontAwesome */
	content: '\f021'; /* Unicode for the refresh icon */
	font: 16px/40px FontAwesome; /* Sets font size and line height */
	position: absolute; /* Positions the icon absolutely within the container */
	right: 12px; /* Aligns the icon to the right with a 12px margin */
	top: -1px; /* Adjusts the vertical position of the icon */
	text-indent: 0; /* Resets text indent for the icon */
}

.old-lobby .casino-game-contain .icon-delete.home a:before {
	/* Adds a home icon before the link using FontAwesome */
	content: '\f015'; /* Unicode for the home icon */
	font: 23px/40px FontAwesome; /* Sets font size and line height */
	position: absolute; /* Positions the icon absolutely within the container */
	right: 12px; /* Aligns the icon to the right with a 12px margin */
	top: -1px; /* Adjusts the vertical position of the icon */
	text-indent: 0; /* Resets text indent for the icon */
}

.old-lobby .casino-game-contain .icon-delete.favorite a:before {
	/* Adds a favorite icon before the link using FontAwesome */
	content: '\f005'; /* Unicode for the favorite icon */
	font: 18px/40px FontAwesome; /* Sets font size and line height */
	position: absolute; /* Positions the icon absolutely within the container */
	right: 12px; /* Aligns the icon to the right with a 12px margin */
	top: -1px; /* Adjusts the vertical position of the icon */
	text-indent: 0; /* Resets text indent for the icon */
}

/* Styles for delete icons in the old lobby section of the casino game container */
.old-lobby .casino-game-contain .icon-delete.favorite a,
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active,
.old-lobby .casino-game-contain .icon-delete.favorite a:hover,
.old-lobby .casino-game-contain .icon-delete.popup a,
.old-lobby .casino-game-contain .icon-delete.refresh a,
.old-lobby .casino-game-contain .icon-home.favorite a:hover {
	width: 40px; /* Set width of the icon */
	height: 40px; /* Set height of the icon */
	background: #0c1019; /* Background color for the icon */
}

/* Specific styles for the first delete icon in the container */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) a {
	width: 20px; /* Set width of the first icon */
	margin: 0 auto; /* Center the icon horizontally */
	text-align: center; /* Center text inside the icon */
	padding: 0; /* Remove padding */
	display: block; /* Display as block element */
	position: relative; /* Position relative for absolute positioning of children */
}

/* General styles for delete icons */
.old-lobby .casino-game-contain .icon-delete a {
	background: #0c1019; /* Background color for the icon */
	width: 35px; /* Set width of the icon */
	height: 35px; /* Set height of the icon */
	top: 0; /* Position at the top */
	position: static; /* Static positioning */
	-webkit-border-radius: 25px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 25px; /* Rounded corners for Mozilla browsers */
	border-radius: 25px; /* Standard rounded corners */
}

/* Styles for the delete icon link within the casino game container */
.old-lobby .casino-game-contain .icon-delete a {
	z-index: 99; /* Ensures the link is above other elements */
	display: block; /* Makes the link a block element for better click area */
}

/* Styles for user divs within the flash game container */
.old-lobby .flash-game-contain .user-div {
	display: inline-block; /* Allows user divs to sit next to each other */
	float: left; /* Aligns user divs to the left */
}

/* Container for settings, floated to the left */
.old-lobby .settings-include-contain {
	float: left; /* Aligns settings container to the left */
}

/* Navigation separator container styles */
.old-lobby .separator-contain-nav {
	float: left; /* Aligns the separator to the left */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	padding: 0 10px; /* Adds horizontal padding */
	box-shadow: 1px 0 0 #171a22; /* Adds a shadow effect to the right */
	height: 36px; /* Sets a fixed height for the separator */
	position: relative; /* Allows for absolute positioning of child elements */
}

/* Styles for balance box within settings icon container */
.old-lobby .settings-icon-contain.balance-box {
	font-weight: 400; /* Sets font weight to normal */
	transform: inherit; /* Inherits transform properties from parent */
	border: 1ps solid #ffb124; /* Sets a solid border with a specific color (note: '1ps' may be a typo for '1px') */
}

/* Styles for balance box settings icon container */
.old-lobby .settings-icon-contain.balance-box,
  /* Styles for the settings icon container in the old lobby with specific layout and font settings */
.old-lobby .settings-icon-contain.leng-b {
	width: auto; /* Allows the width to adjust automatically */
	text-align: left; /* Aligns text to the left */
	font: /* Sets the font properties including size, line height, and font family */
		15px/20px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	font-weight: 700; /* Sets the font weight to bold */
	position: relative; /* Positions the element relative to its normal position */
	padding: 0 18px 0 2px; /* Adds padding around the element */
}

/* Styles for the settings icon container in the old lobby */
.old-lobby .settings-icon-contain {
	float: left; /* Floats the element to the left */
	height: 20px; /* Sets a fixed height for the icon */
	cursor: pointer; /* Changes the cursor to a pointer on hover */
	width: 20px; /* Sets a fixed width for the icon */
	font: 16px/20px FontAwesome; /* Sets the font to FontAwesome with specific size and line height */
	color: #fff; /* Sets the text color to white */
	text-align: center; /* Centers the text within the container */
	margin: 8px 0 0; /* Adds margin to the top, with no margin on the sides and bottom */
	transform: rotate(0deg) 3d (0, 0, 0); /* Applies a 3D rotation transformation (currently no rotation) */
	transition: transform 500ms; /* Smooth transition for transform changes over 500 milliseconds */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	position: relative; /* Positions the element relative to its normal position */
}

/* Styles for the settings icon container within the old lobby */
.old-lobby .settings-icon-contain.balance-box > ul {
	float: left; /* Aligns the list to the left */
	width: 100%; /* Sets the width to fill the container */
}

/* Styles for list items within the settings icon container */
.old-lobby .settings-icon-contain.balance-box > ul > li {
	width: 100%; /* Sets the width of each list item to fill the container */
	text-align: left; /* Aligns text to the left */
	height: 11px; /* Sets a fixed height for the list items */
	position: relative; /* Positions the item relative to its normal position */
	z-index: 555; /* Sets the stacking order of the item */
}

/* Styles for the value span within the list items */
.old-lobby .settings-icon-contain.balance-box > ul > li span.valor {
	margin-right: 5px; /* Adds space to the right of the span */
	color: #fea402; /* Sets the text color */
}

/* Styles for the logo container in the old lobby */
.old-lobby .div-logo-j {
	float: left; /* Aligns the logo container to the left */
	padding: 5px 20px; /* Adds padding around the logo */
	height: 37px; /* Sets a fixed height for the logo container */
}

/* Styles for the circular progress indicator in the flash game container */
.old-lobby .flash-game-contain .md-progress-circular {
	position: absolute; /* Positions the progress indicator absolutely */
	top: 40%; /* Centers the indicator vertically */
	left: 50%; /* Centers the indicator horizontally */
	margin-left: -50px; /* Offsets the indicator to the left by 50px */
	z-index: 6; /* Sets the stacking order of the progress indicator */
}

.old-lobby .md-progress-circular.md-theme {
	/* Sets the background to transparent and applies a fade animation to the loader */
	background: 0 0;
	animation: loader-animate-fade 1s linear;
}

.old-lobby .md-progress-circular {
	/* Defines the size and positioning of the circular progress indicator */
	width: 100px; /* Width of the progress circular */
	height: 140px; /* Height of the progress circular */
	display: block; /* Displays the element as a block */
	position: inherit; /* Inherits the position from its parent */
	margin-bottom: 0 !important; /* Removes bottom margin, overriding other styles */
	overflow: visible; /* Allows overflow content to be visible */
	margin: 0 auto; /* Centers the element horizontally */
	padding: 20px 0; /* Adds vertical padding */
}

@keyframes wobble {
	/* Defines the wobble animation for the progress indicator */
	0% {
		transform: X(0%); /* Initial state */
	}
	15% {
		transform: X(-25%) rotate(-5deg); /* Moves left and rotates */
	}
	30% {
		transform: X(20%) rotate(3deg); /* Moves right and rotates */
	}
	45% {
		transform: X(-15%) rotate(-3deg); /* Moves left and rotates */
	}
	60% {
		transform: X(10%) rotate(2deg); /* Moves right and rotates */
	}
	75% {
		transform: X(-5%) rotate(-1deg); /* Moves left and rotates */
	}
	100% {
		transform: X(0%); /* Returns to initial state */
	}
}

/* Styles for the spinner wrapper in the old lobby section */
.old-lobby .md-progress-circular .md-spinner-wrapper {
	/* Animation for the outer rotation of the spinner */
	-webkit-animation: outer-rotate 2.91667s linear infinite;
	animation: outer-rotate 2.91667s linear infinite;
}

/* Styles for the inner part of the spinner */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner {
	/* Indicates that the element will change, optimizing performance */
	will-change: transform;
	/* Animation for sporadic rotation of the inner spinner */
	-webkit-animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1)
		infinite;
	animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite;
}

/* Dimensions and positioning for the inner spinner */
.old-lobby .md-progress-circular .md-inner {
	width: 100px; /* Width of the inner spinner */
	height: 100px; /* Height of the inner spinner */
	position: relative; /* Positioning context for absolute children */
}

/* Gap styling for the inner spinner with theme-specific colors */
.old-lobby .md-progress-circular.md-theme .md-inner .md-gap {
	border-top-color: #ffb124; /* Top border color */
	border-bottom-color: #ffb124; /* Bottom border color */
}

/* Styles for the gap in the inner spinner */
.old-lobby .md-progress-circular .md-inner .md-gap {
	position: absolute; /* Positioned absolutely within the inner spinner */
	left: 49px; /* Left offset */
	right: 49px; /* Right offset */
	top: 0; /* Top offset */
	bottom: 0; /* Bottom offset */
	border-top: 5px solid #000; /* Top border styling */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	/* Styles for the circular progress indicator in the old lobby */

	.old-lobby .md-progress-circular .md-inner .md-left,
	.old-lobby .md-progress-circular .md-inner .md-right {
		/* Positioning elements absolutely within the circular progress */
		position: absolute;
		top: 0; /* Aligns the top of the element */
		height: 100px; /* Sets the height of the progress sections */
		width: 50px; /* Sets the width of the progress sections */
		overflow: hidden; /* Hides any overflow content */
	}

	/* Styles specifically for the left half of the circular progress */

	.old-lobby .md-progress-circular .md-inner .md-left {
		left: 0; /* Aligns the left half to the left side */
	}

	/* Sets the border color for the top of the half circles in the themed circular progress */

	.old-lobby
		.md-progress-circular.md-theme
		.md-inner
		.md-left
		.md-half-circle,
	.old-lobby
		.md-progress-circular.md-theme
		.md-inner
		.md-right
		.md-half-circle {
		border-top-color: #ffb124; /* Sets the top border color */
	}

	/* Sets the left border color for the left half circle in the themed circular progress */

	.old-lobby
		.md-progress-circular.md-theme
		.md-inner
		.md-left
		.md-half-circle {
		border-left-color: #ffb124; /* Sets the left border color */
	}

	/* Incomplete selector for the spinner wrapper and left half circle in the old lobby */

	.old-lobby
  .md-progress-circular
  .md-spinner-wrapper
  .md-inner
  .md-left
  .md-half-circle,
  .old-lobby
    /* Styles for the circular progress indicator and its components */
  .md-progress-circular
  .md-spinner-wrapper
  .md-inner
  .md-right
  .md-half-circle {
		/* Infinite animation iteration */
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		/* Duration of the animation */
		-webkit-animation-duration: 1.3125s;
		animation-duration: 1.3125s;
		/* Timing function for the animation */
		-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
		animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	}

	/* Styles for the left and right half-circles in the progress indicator */

	.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
	.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
		/* Positioning and sizing of the half-circles */
		position: absolute;
		top: 0;
		width: 100px;
		height: 100px;
		box-sizing: border-box; /* Ensures padding and border are included in the element's total width and height */
		border-width: 15px; /* Width of the border */
		border-style: solid; /* Solid border style */
		border-color: transparent; /* Border color set to transparent */
		border-radius: 50%; /* Makes the element circular */
	}

	/* Specific styles for the left half-circle */

	.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle {
		left: 0; /* Positions the left half-circle to the left */
	}

	/* Styles for the right section of the circular progress indicator in the old lobby */

	.old-lobby .md-progress-circular .md-inner .md-right {
		right: 0; /* Aligns the right section to the right */
	}

	/* Styles for the left and right sections of the circular progress indicator */

	.old-lobby .md-progress-circular .md-inner .md-left,
	.old-lobby .md-progress-circular .md-inner .md-right {
		position: absolute; /* Positions elements absolutely within the parent */
		top: 0; /* Aligns the sections to the top */
		height: 100px; /* Sets the height of the sections */
		width: 50px; /* Sets the width of the sections */
		overflow: hidden; /* Hides overflow content */
	}

	/* Sets the border color for the right half-circle in the themed circular progress indicator */

	.old-lobby
		.md-progress-circular.md-theme
		.md-inner
		.md-right
		.md-half-circle {
		border-right-color: #ffb124; /* Specific color for the right border */
	}

	/* Animation settings for the right half-circle wobble effect */

	.old-lobby
		.md-progress-circular
		.md-spinner-wrapper
		.md-inner
		.md-right
		.md-half-circle {
		-webkit-animation-name: right-wobble; /* Animation for WebKit browsers */
		animation-name: right-wobble; /* Standard animation property */
	}

	/* Animation settings for the inner spinner in the circular progress indicator */

	.old-lobby .md-spinner-wrapper .md-inner {
		-webkit-animation-name: spin !important; /* Spin animation for WebKit browsers */
		animation-name: spin !important; /* Standard spin animation property */
	}

	/* Keyframes for spin animation for different browsers */
	@-moz-keyframes spin {
		100% {
			-moz-transform: rotate(360deg); /* Mozilla-specific rotation */
		}
	}
	@-webkit-keyframes spin {
		100% {
			-webkit-transform: rotate(360deg); /* WebKit-specific rotation */
		}
	}
	@keyframes spin {
		100% {
			-webkit-transform: rotate(
				360deg
			); /* Standard rotation for WebKit */
			transform: rotate(360deg); /* Standard rotation */
		}
	}

	/* Styles for the old lobby loading spinner */

	.old-lobby
  .md-progress-circular /* Circular progress indicator for loading */
  .md-spinner-wrapper /* Wrapper for the spinner */
  .md-inner /* Inner part of the spinner */
  .md-left /* Left section of the spinner */
  .md-half-circle, /* Half-circle style for the spinner */
  .old-lobby
  .md-progress-circular /* Circular progress indicator for loading */
  .md-spinner-wrapper /* Wrapper for the spinner */
    /* Styles for the circular progress indicator */
  .md-inner
  .md-right
  .md-half-circle {
		/* Infinite animation iteration */
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		/* Duration of the animation */
		-webkit-animation-duration: 1.3125s;
		animation-duration: 1.3125s;
		/* Timing function for smooth animation */
		-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
		animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	}

	/* Styles for the right half-circle in the old lobby progress indicator */

	.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
		/* Positioning the right half-circle */
		right: 0;
		/* Making the left border transparent */
		border-left-color: transparent;
	}

	/* Styles for the left and right half-circles in the old lobby progress indicator */

	.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
	.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
		/* Positioning and sizing the half-circles */
		position: absolute;
		top: 0;
		width: 100px;
		height: 100px;
		/* Ensuring padding and border are included in the element's total width and height */
		box-sizing: border-box;
		/* Border properties for the half-circles */
		border-width: 15px;
		border-style: solid;
		border-color: transparent;
		/* Making the half-circles circular */
		border-radius: 50%;
	}

	.old-lobby .add-casino-game {
		/* Background color for the casino game button */
		background: #1e2539;
		/* No box shadow applied */
		box-shadow: none;
		/* No text shadow applied */
		text-shadow: none;
		/* Text color for the button */
		color: #454a5a;
		/* Center the button horizontally with a fixed width */
		left: calc((100% - 140px) / 2);
		/* Rounded corners for the button */
		border-radius: 20%;
	}

	.old-lobby .add-casino-game {
		/* Positioning the button absolutely within its container */
		position: absolute;
		/* Layering the button above other elements */
		z-index: 99;
		/* Center the button vertically with a fixed height */
		top: calc((100% - 100px) / 2);
		/* Center the text within the button */
		text-align: center;
	}

	.old-lobby .flash-game-contain #game-content {
		/* Background color for the game content area */
		background: #0c1019;
		/* Display the game content inline-block */
		display: inline-block;
	}

	.old-lobby .flash-game-contain #game-content {
		/* Smooth transition for height changes */
		transition: height 200ms;
		/* Positioning relative to its normal position */
		position: relative;
		/* Layering the game content above other elements */
		z-index: 5;
		/* Margin to create space above the game content */
		margin-top: 45px;
		/* Hide overflow content */
		overflow: hidden;
		/* Width set to 90% of the viewport width */
		width: 90vw;
		/* Height set to 90% of the viewport height */
		height: 90vh;
	}

	/* Styles for the closed popup form in the search section of the old lobby */

	.old-lobby li#searchv3 .closed-popup-form {
		float: right; /* Aligns the form to the right */
		position: relative; /* Positions the form relative to its normal position */
		top: 0; /* No vertical offset */
		right: 0; /* No horizontal offset */
		z-index: 1000; /* High stacking order to appear above other elements */
		margin-top: -35px; /* Negative margin to pull the form upwards */
		margin-right: 20px; /* Space to the right of the form */
	}

	/* Styles for the before pseudo-element of the closed popup form */

	.old-lobby .closed-popup-form:before {
		font: 20px/10px FontAwesome; /* Font settings for FontAwesome icon */
		color: #fbf2df; /* Icon color */
		content: '\f00d'; /* FontAwesome icon content (close icon) */
		cursor: pointer; /* Changes cursor to pointer on hover */
		transition: 250ms color; /* Smooth transition for color changes */
	}

	/* Styles for the favorite icon in the casino game container when active */

	.old-lobby
		.casino-game-contain
		.icon-delete.favorite
		a.favorite-active:before {
		color: #b5d000; /* Color for the active favorite icon */
	}

	/* Styles for the general preloader overlay */

	.old-lobby .preloader-general {
		width: 100%; /* Full width of the viewport */
		background: #000; /* Black background for the preloader */
		height: 100vh; /* Full height of the viewport */
		position: absolute; /* Positioned absolutely to cover the entire viewport */
		left: 0; /* Aligns to the left edge */
		z-index: 999999999; /* Extremely high stacking order to ensure visibility */
	}

	.old-lobby .content-p img {
		/* Center the image vertically and horizontally with specific dimensions */
		top: calc(50vh - 120px) !important; /* Vertical position adjustment */
		width: 240px !important; /* Fixed width for the image */
		left: calc(50% - 120px) !important; /* Horizontal position adjustment */
		position: absolute; /* Absolute positioning for precise placement */
	}

	.old-lobby .new-casino-no-games-text {
		/* Style for the text when no games are available */
		text-align: center; /* Center the text */
		padding: 25px; /* Padding around the text */
	}

	.old-lobby #casino-wrapper-disabled {
		/* Style for the disabled casino wrapper */
		background: black; /* Black background for the wrapper */
		width: 100%; /* Full width of the parent container */
		min-height: 700px; /* Minimum height to ensure visibility */
		padding-top: 1px; /* Small padding at the top */
	}

	.old-lobby #casino-wrapper-disabled .container-alert {
		/* Style for the alert container within the disabled wrapper */
		width: 100%; /* Full width of the alert container */
	}

	.old-lobby #casino-wrapper-disabled .message-alert {
		/* Style for the alert message */
		width: 90%; /* Width of the alert message */
		margin: 0 auto; /* Center the alert message horizontally */
		color: white; /* White text color for visibility */
		text-align: center; /* Center the text within the alert */
		border: 1px solid #b08200; /* Border with a specific color */
		border-radius: 15px; /* Rounded corners for the alert */
		padding: 20px; /* Padding inside the alert for spacing */
	}

	/* Styles for the alert message in the disabled casino wrapper */

	.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(3) {
		font-weight: 900; /* Bold font weight for emphasis */
		font-size: 22px; /* Font size for the third paragraph */
	}

	/* Styles for the fourth paragraph in the alert message */

	.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(4) {
		font-weight: lighter; /* Lighter font weight for a softer appearance */
	}

	/* Styles for spans within the alert message */

	.old-lobby #casino-wrapper-disabled .message-alert span {
		font-size: 90px; /* Large font size for visibility */
	}

	/* Styles for the close button in the alert message */

	.old-lobby #casino-wrapper-disabled .message-alert .close {
		width: 100%; /* Full width for the close button */
		height: 23px; /* Fixed height for the close button */
		display: block; /* Display as a block element */
	}

	/* Styles for the text within the close button */

	.old-lobby #casino-wrapper-disabled .message-alert .close span {
		float: right; /* Align text to the right */
		font-size: 15px; /* Font size for the close button text */
	}

	/* Styles for the first money image in the alert */

	.old-lobby #casino-wrapper-disabled .money-img {
		width: 70%; /* Set width to 70% of the parent */
		margin: 0 auto; /* Center the image horizontally */
		margin-top: 100px; /* Add top margin for spacing */
	}

	/* Styles for the second money image in the alert */

	.old-lobby #casino-wrapper-disabled .money-img-two {
		width: 70%; /* Set width to 70% of the parent */
		margin: 0 auto; /* Center the image horizontally */
	}

	/* Styles for the disabled casino wrapper in the old lobby */

	.old-lobby #casino-wrapper-disabled .money-img img,
	.old-lobby #casino-wrapper-disabled .money-img-two img {
		/* Set images to take full width and display as block elements */
		width: 100%;
		display: block;
	}

	/* Styles for the close icon in the disabled casino wrapper */

	.old-lobby #casino-wrapper-disabled i.fa.fa-times {
		/* Float the close icon to the right and set its color to white */
		float: right;
		color: white;
	}

	/* Styles for the mobile icon in the disabled casino wrapper */

	.old-lobby #casino-wrapper-disabled i.fa.fa-mobile {
		/* Set the font size for the mobile icon */
		font-size: 80px;
	}

	/* Media query for screens wider than 736px */
	@media only screen and (min-width: 736px) {
		.old-lobby #casino-wrapper-disabled .message-alert {
			/* Style for the alert message box */
			width: 35%; /* Set width to 35% of the container */
			margin: 0 auto; /* Center the alert box */
			color: white; /* Set text color to white */
			text-align: center; /* Center align text */
			border: 1px solid #b08200; /* Add a border with a specific color */
			border-radius: 15px; /* Round the corners of the alert box */
		}

		.old-lobby #casino-wrapper-disabled .money-img,
		.old-lobby #casino-wrapper-disabled .money-img-two {
			/* Set the width for money image containers */
			width: 25%; /* Set width to 25% of the container */
		}
	}
	/* Styles for the casino content section in the old lobby */

	.old-lobby div#casino-content {
		height: 100vh; /* Full viewport height */
		padding-bottom: 7px; /* Bottom padding */
	}

	/* Aspect ratio box for game images in the new lobby */

	.new-lobby .games-aspect .game-img-box-b::before {
		content: ''; /* Empty content for pseudo-element */
		display: block; /* Display as block element */
		height: 0; /* No height */
		width: 0; /* No width */
		padding-bottom: calc(16 / 16 * 100%); /* Maintains aspect ratio (1:1) */
	}

	/* Preview container styles in the new lobby */

	.new-lobby .c-preview {
		background: #000; /* Fallback background color */
		background: -moz-linear-gradient(
			/* Gradient for Firefox */ -45deg,
			#000000 0%,
			#000000 25%,
			#1e539e 50%,
			#ff3083 75%,
			#7800a8 100%
		);
		background: -webkit-linear-gradient(
			/* Gradient for WebKit browsers */ -45deg,
			#000000 0%,
			#000000 25%,
			#1e539e 50%,
			#ff3083 75%,
			#7800a8 100%
		);
		background: linear-gradient(
			/* Standard gradient */ 135deg,
			#000000 0%,
			#000000 25%,
			#1e539e 50%,
			#ff3083 75%,
			#7800a8 100%
		);
		background-size: 400% 400%; /* Size of the background gradient */
		background-repeat: no-repeat; /* Prevents background from repeating */
		display: flex; /* Flexbox layout */
		width: 500px; /* Fixed width */
		height: 500px; /* Fixed height */
		max-width: 100vw; /* Maximum width of viewport */
		max-height: 100vh; /* Maximum height of viewport */
		justify-content: center; /* Center content horizontally */
		align-items: center; /* Center content vertically */
		color: #fff; /* Text color */
		position: relative; /* Positioning context for absolute children */
		cursor: pointer; /* Pointer cursor on hover */
		transition: 0.5s all; /* Smooth transition for all properties */
	}

	.new-lobby .c-preview:hover {
		/* Changes background position on hover for .c-preview within .new-lobby */
		background-position: 100% 100% !important;
	}

	.new-lobby .c-preview:hover {
		/* Applies a blur effect on hover for .c-preview within .new-lobby */
		filter: blur(10px) !important;
	}

	.new-lobby .list-games-casino-view-b {
		/* Sets initial opacity and animation properties for .list-games-casino-view-b within .new-lobby */
		opacity: 0; /* Hidden by default */
		animation-name: bounceIn; /* Specifies the animation to use */
		animation-duration: 450ms; /* Duration of the animation */
		animation-timing-function: linear; /* Animation timing function */
		animation-fill-mode: forwards; /* Retains the final state of the animation */
		animation-delay: 2s; /* Delay before the animation starts */
	}

	@keyframes bounceIn {
		/* Defines the keyframes for the bounceIn animation */
		0% {
			opacity: 0; /* Fully transparent at the start */
			transform: scale(0.3) 3d (0, 0, 0); /* Scaled down in 3D space */
		}
		50% {
			opacity: 0.9; /* Nearly fully opaque at halfway point */
			transform: scale(1.1); /* Slightly scaled up */
		}
		80% {
			opacity: 1; /* Fully opaque */
			transform: scale(0.89); /* Slightly scaled down */
		}
		100% {
			opacity: 1; /* Fully opaque at the end */
			transform: scale(1) 3d (0, 0, 0); /* Returns to original scale in 3D space */
		}
	}

	.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
		/* Display the resize buttons when hovering over the game list */
		display: block !important;
	}

	.new-lobby li.providers-list {
		/* Set the width of provider list items, accounting for a fixed width */
		width: calc((100% - 320px) / 6);
		/* Align items vertically in the middle */
		vertical-align: middle;
	}

	.new-lobby .category-list:hover {
		/* Scale up the category list on hover for a zoom effect */
		-webkit-transform: scale(1.1);
		-ms-transform: scale(1.1);
		transform: scale(1.1);
	}

	.new-lobby .category-list {
		/* Apply a smooth transition effect for all properties */
		transition: all 0.3s ease;
	}

	.new-lobby .rainbow {
		/* Full width and height for the rainbow element, with continuous rotation */
		width: 100%;
		height: 100%;
		animation: rotate linear 8s infinite;
		position: absolute;
	}

	.new-lobby .rainbow span {
		/* Span element to cover the rainbow area, positioned relative */
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		/* Incorrect transform syntax, intended to center the element */
		transform: (-50%, -50%);
	}

	.new-lobby .rainbow span:after {
		/* Creates a pseudo-element after each span for visual effects */
		display: block; /* Makes the pseudo-element a block element */
		content: ''; /* Ensures the pseudo-element has no text content */
		width: 100%; /* Sets the width to 100% of the parent span */
		height: 100%; /* Sets the height to 100% of the parent span */
		position: absolute; /* Positions the pseudo-element absolutely within the span */
		left: 100%; /* Positions the pseudo-element to the right of the span */
	}

	.new-lobby .rainbow span:first-child {
		/* Styles for the first span in the rainbow class */
		background: #5500ff; /* Sets the background color to a shade of blue */
	}

	.new-lobby .rainbow span:first-child:after {
		/* Styles for the pseudo-element of the first span */
		background: #ffb000; /* Sets the background color of the pseudo-element to a shade of yellow */
	}

	.new-lobby .rainbow span:last-child {
		/* Styles for the last span in the rainbow class */
		background: #ff006c; /* Sets the background color to a shade of pink */
	}

	.new-lobby .rainbow span:last-child:after {
		/* Styles for the pseudo-element of the last span */
		background: #00ffdc; /* Sets the background color of the pseudo-element to a shade of cyan */
	}

	.new-lobby .c-subscribe-box {
		/* Styles for the subscription box within the new-lobby class */
		overflow: hidden; /* Hides any overflow content */
		position: relative; /* Sets the position to relative for absolute positioning of children */
		box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2); /* Applies a shadow effect for depth */
		border-radius: 8px; /* Rounds the corners of the box */
	}

	.new-lobby .c-subscribe-box__wrapper {
		/* Wrapper for the subscription box with padding and flex layout */
		padding: 4px;
		display: flex; /* Enables flexbox layout */
		flex-direction: column; /* Stacks child elements vertically */
		border-radius: calc(8px / 2); /* Rounds corners with half of 8px */
	}

	.new-lobby .c-subscribe-box__title {
		/* Title styling for the subscription box */
		font-size: 1.6rem; /* Sets font size for the title */
	}

	.new-lobby .c-subscribe-box__desc {
		/* Description styling for the subscription box */
		font-size: 0.935rem; /* Sets font size for the description */
		margin: 0.7rem auto 1.8rem; /* Vertical margins with auto horizontal centering */
		max-width: 240px; /* Limits the maximum width of the description */
	}

	.new-lobby .c-subscribe-box__form {
		/* Form container within the subscription box */
		margin-top: auto; /* Pushes the form to the bottom of the wrapper */
	}

	.new-lobby .c-form--accent input:hover,
	.c-form--accent input:active,
	.c-form--accent input:focus {
		/* Styles for input fields on hover, active, and focus states */
		border-color: #e85f99; /* Changes border color */
		box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Adds shadow effect */
	}

	.new-lobby .c-form--accent [type='submit'] {
		/* Styles for the submit button in the accent form */
		background: #e85f99; /* Sets background color */
		border-color: #e85f99; /* Sets border color */
		color: #fff; /* Sets text color to white */
	}

	/* Define a keyframe animation for rotation */
	@keyframes rotate {
		0% {
			transform: rotate(0); /* Initial state: no rotation */
		}
		100% {
			transform: rotate(360deg); /* Final state: complete rotation */
		}
	}

	/* Styles for the search input in the new lobby */

	.new-lobby li#searchv3 {
		-webkit-transition: width 2s; /* Smooth transition for width changes in WebKit browsers */
		transition: width 2s; /* Smooth transition for width changes */
		width: 84px; /* Initial width of the search input */
	}

	/* Styles for the block search element within the search input */

	.new-lobby #searchv3 .block-search {
		height: 35px !important; /* Fixed height for the search block */
		min-width: 55px !important; /* Minimum width to ensure usability */
		background: transparent; /* Transparent background */
		width: 100% !important; /* Full width of the parent container */
		max-width: 100% !important; /* Prevent exceeding parent width */
		margin: 0 !important; /* Remove margin */
		border: 1px solid #a7a7a7; /* Light gray border */
		border-radius: 40px; /* Rounded corners */
	}

	/* General styles for the block search element */

	.new-lobby .block-search {
		padding: 0; /* No padding */
		min-width: 35px; /* Minimum width for the search block */
		margin: 5px 5px 0 0; /* Margin for spacing */
		height: 30px; /* Fixed height */
		border-radius: 3px; /* Slightly rounded corners */
		background: #fff; /* White background */
	}

	.new-lobby .block-search {
		/* Aligns the search block to the right side of the container */
		float: right;
		/* Positions the search block relative to its normal position */
		position: relative;
		/* Sets the stacking order of the search block */
		z-index: 999;
		/* Aligns text to the right within the search block */
		text-align: right;
		/* Sets the maximum width of the search block */
		max-width: 250px;
	}

	.new-lobby #searchv3 .block-search:before {
		/* Inserts a FontAwesome search icon before the search block */
		content: '\f002' !important;
		/* Sets the font size and line height for the icon */
		font: 20px/35px FontAwesome !important;
		/* Sets the color of the icon */
		color: #979797 !important;
		/* Positions the icon absolutely within the search block */
		position: absolute;
		/* Positions the icon 10px from the left */
		left: 10px;
		/* Positions the icon at the top of the search block */
		top: 0;
	}

	.new-lobby li#searchv3 input#SearchGame {
		/* Disables transition effects for the search input */
		transition: none !important;
		/* Changes the cursor to a pointer when hovering over the input */
		cursor: pointer !important;
	}

	.new-lobby input#SearchGame.ng-hide {
		/* Sets the width to 0 when the input is hidden */
		width: 0;
		/* Animates the width change over 1 second */
		transition: width 1s;
		/* Ensures the input is displayed as a block element */
		display: block !important;
		/* Floats the input to the right */
		float: right;
		/* Removes the border from the input */
		border: 0;
	}

	.new-lobby .block-search input[type='text'] {
		/* Text input styling within the search block of the new lobby */
		color: #686767; /* Text color */
		font: /* Font settings for the input */
			12px Quicksand,
			/* Primary font */ Arial,
			/* Fallback font */ Helvetica,
			/* Fallback font */ sans-serif; /* Fallback font */
		margin: 0; /* No margin */
		padding: 8px 5px 8px 30px; /* Padding for input */
		background: 0 0; /* Transparent background */
		position: relative; /* Positioning context for child elements */
		z-index: 22; /* Stacking order */
	}

	.new-lobby .block-search input[type='text'] {
		/* Additional styling for the text input */
		width: 0; /* Initial width set to 0 for animation */
		border: 0; /* No border */
		vertical-align: middle; /* Aligns input vertically */
		transition: width 600ms; /* Smooth transition for width change */
		border-radius: 3px; /* Rounded corners */
	}

	.new-lobby li#searchv3.open .block-search input[type='text'] {
		/* Styling for the text input when the search block is open */
		width: 100%; /* Full width when open */
		padding: 0 0 0 60px !important; /* Increased left padding */
		height: 100%; /* Full height */
		color: #fff; /* Text color changes to white */
	}

	.new-lobby .search-results-inner {
		/* Container for search results within the new lobby */
		float: left; /* Aligns the container to the left */
		width: 100%; /* Full width of the parent element */
		padding: 10px 0 0; /* Padding at the top */
		position: relative; /* Allows absolute positioning of child elements */
		z-index: 999; /* High stacking order to ensure visibility */
		background: #fff; /* White background color */
		border-radius: 2px; /* Slightly rounded corners */
		box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
	}

	.new-lobby .search-results-inner .arrow-sport {
		/* Positioning for the sport arrow within search results */
		top: -6px; /* Moves the arrow slightly above the container */
	}

	.new-lobby .search-results-inner .arrow-sport {
		/* Positioning for the sport arrow within search results */
		right: 50%; /* Centers the arrow horizontally */
	}

	.new-lobby .arrow-sport {
		/* Styles for the sport arrow */
		width: 14px; /* Width of the arrow */
		height: 11px; /* Height of the arrow */
		display: block; /* Makes the arrow a block element */
		position: absolute; /* Allows positioning relative to the nearest positioned ancestor */
		right: 2px; /* Positions the arrow 2px from the right */
		top: -11px; /* Positions the arrow 11px above its normal position */
		z-index: 999; /* High stacking order to ensure visibility */
	}

	/* Styles for the h3 elements within the search results of the new lobby */

	.new-lobby .search-results-inner h3 {
		font:
			20px/22px Quicksand,
			/* Font size and line height with font family fallback */ Arial,
			Helvetica,
			sans-serif;
		color: #121623; /* Text color */
		text-transform: uppercase; /* Transforms text to uppercase */
	}

	/* Additional styles for h3 elements to control layout and alignment */

	.new-lobby .search-results-inner h3 {
		width: 100%; /* Full width of the container */
		float: left; /* Floats the element to the left */
		padding: 0; /* No padding */
		text-indent: 10px; /* Indents the first line of text */
		text-align: left; /* Aligns text to the left */
	}

	/* Styles for various components within the new lobby */

	.new-lobby #result-search, /* Search result container */
  .bet-container, /* Container for betting elements */
  .block-more-event, /* Block for additional event information */
  .clock .open-lang ul, /* Unordered list for open language options in the clock section */
  .conteiner-goals .hover-sp, /* Hover state styles for goals container */
  .deposit-alert-contain.casino .games-slider ul, /* Unordered list for games slider in deposit alert container */
  .express-contain, /* Container for express elements */
  .fedback-info ul li textarea, /* Textarea within feedback info list items */
  .form-contain.deposit .form-sign-in /* Sign-in form within deposit container */
    /* Styles for various container elements with scrollable content */
  .general-text-list,
  .message-contain,
  .radio-contein-withdraw,
  .right-betslip-contain-modern,
  .right-block-history.message.compose .settings-info-contain .form-text textarea,
  .search-results-inner.casino #casino-result-search,
  .text-payment-contain,
  .tl-new .current-time:hover ~ .tl-info .hover-sp,
  .tl-new .tl-info:hover .hover-sp,
  div.draws-contain {
		overflow-y: auto; /* Enables vertical scrolling */
		overflow-x: hidden; /* Hides horizontal scrolling */
		scrollbar-track-color: #0c0e14; /* Color of the scrollbar track */
		scrollbar-shadow-color: #0c0e14; /* Shadow color for the scrollbar */
		scrollbar-base-color: #373f4e; /* Base color of the scrollbar */
		scrollbar-arrow-color: #373f4e; /* Color of the scrollbar arrows */
	}

	/* Specific styles for the search results container in the new lobby */

	.new-lobby .search-results-inner.casino #casino-result-search {
		float: left; /* Aligns the element to the left */
		width: 100%; /* Sets the width to 100% of the parent */
		max-height: 450px; /* Limits the maximum height to 450px */
		overflow-y: auto; /* Enables vertical scrolling */
		overflow-x: hidden; /* Hides horizontal scrolling */
		margin: 10px 0 0; /* Adds a top margin of 10px */
	}

	.new-lobby .search-no-results {
		/* Font settings for the no results message */
		font:
			16px/38px Quicksand,
			/* Font size and line height with primary font */ Arial,
			/* Fallback font */ Helvetica,
			/* Fallback font */ sans-serif; /* Generic fallback font */
		color: #f2c36f; /* Text color */
		padding: 0 10px; /* Padding for spacing */
		box-sizing: border-box; /* Include padding in width calculations */
	}

	.new-lobby .search-no-results {
		/* Layout settings for the no results message */
		float: left; /* Float to the left */
		width: 100%; /* Full width of the container */
		text-align: left; /* Align text to the left */
	}

	@media screen and (max-width: 550px) {
		/* Responsive styles for screens smaller than 550px */
		.new-lobby li#searchv3 {
			width: 66px; /* Fixed width for search item */
		}

		.new-lobby li.providers-list {
			width: auto; /* Automatic width for providers list */
		}

		.new-lobby li#searchv3.open {
			width: 60% !important; /* Override width to 60% when open */
		}
	}

	.new-lobby li#searchv3.open {
		/* Sets the width of the searchv3 list item when open */
		width: 30%;
	}

	.new-lobby li#searchv3:hover {
		/* Removes text shadow on hover for the searchv3 list item */
		text-shadow: none !important;
	}

	.new-lobby li#searchv3 .closed-popup-form {
		/* Styles for the closed popup form within the searchv3 list item */
		float: right; /* Aligns the form to the right */
		position: relative; /* Positions the form relative to its normal position */
		top: 0; /* No vertical offset */
		right: 0; /* No horizontal offset */
		z-index: 1000; /* Ensures the form is above other elements */
		margin-top: -27px; /* Adjusts the top margin */
		margin-right: 14px; /* Adjusts the right margin */
	}

	.new-lobby .closed-popup-form:before {
		/* Styles the pseudo-element before the closed popup form */
		font: 20px/10px FontAwesome; /* Sets font size and line height using FontAwesome */
		color: #979797; /* Sets the color of the icon */
		content: '\f00d'; /* Uses FontAwesome icon for closing */
		cursor: pointer; /* Changes cursor to pointer on hover */
		transition: 250ms color; /* Smooth transition for color changes */
	}

	.new-lobby .c-box-rgb {
		/* Styles for the RGB color box within the new lobby */
		position: relative; /* Positions the box relative to its normal position */
		overflow: visible !important; /* Ensures overflow is visible */
		background: linear-gradient(
			0deg,
			#000,
			#272727
		); /* Sets a vertical gradient background */
	}

	/* Styles for the new lobby and RGB box effects */

	.new-lobby .c-box-rgb:before,
	.c-box-rgb:after {
		/* Empty content for pseudo-elements */
		content: '';
		/* Positioning the pseudo-elements absolutely */
		position: absolute;
		/* Offset from the left and top */
		left: -3px;
		top: -3px;
		/* Background gradient with multiple colors */
		background: linear-gradient(
			45deg,
			#fb0094,
			/* Pink */ #0000ff,
			/* Blue */ #00ff00,
			/* Green */ #ffff00,
			/* Yellow */ #ff0000,
			/* Red */ #fb0094,
			/* Pink */ #0000ff,
			/* Blue */ #00ff00,
			/* Green */ #ffff00,
			/* Yellow */ #ff0000 /* Red */
		);
		/* Background size to create a smooth animation effect */
		background-size: 400%;
		/* Width and height to cover the parent element with an additional 6px */
		width: calc(100% + 6px);
		height: calc(100% + 6px);
		/* Set z-index to place behind other elements */
		z-index: -1;
		/* Animation for the background gradient */
		animation: steam 20s linear infinite;
		/* Rounded corners for the pseudo-elements */
		border-radius: 13px;
	}

	/* Animation for steam effect, cycling background position */
	@keyframes steam {
		0% {
			background-position: 0 0; /* Start position */
		}
		50% {
			background-position: 400% 0; /* Midpoint position */
		}
		100% {
			background-position: 0 0; /* Return to start position */
		}
	}

	/* After pseudo-element for .c-box-rgb with a blur effect */

	.new-lobby .c-box-rgb:after {
		filter: blur(5px); /* Applies a blur filter */
	}

	/* Margin adjustment for the play button to center it vertically */

	.new-lobby .btn-play {
		margin-top: calc(
			50% - 60px
		); /* Centers button with a specific offset */
	}

	/* Base styles for the carousel component */

	.carousel {
		position: relative; /* Positions carousel relative to its container */
	}

	/* Inner container of the carousel, managing overflow */

	.carousel-inner {
		position: relative; /* Positions inner container relative to the carousel */
		overflow: hidden; /* Hides overflow content */
		width: 100%; /* Full width of the parent container */
	}

	.carousel-open:checked + .carousel-item {
		/* Styles for the active carousel item when the checkbox is checked */
		position: static; /* Positioning the item statically */
		opacity: 100; /* Fully visible */
	}

	.carousel-item {
		/* Base styles for each carousel item */
		position: absolute; /* Positioned absolutely within the carousel */
		opacity: 0; /* Initially hidden */
		-webkit-transition: opacity 0.6s ease-out; /* Transition effect for opacity (WebKit) */
		transition: opacity 0.6s ease-out; /* Transition effect for opacity */
	}

	.carousel-item img {
		/* Styles for images within carousel items */
		display: block; /* Ensures no extra space below the image */
		height: auto; /* Maintains aspect ratio */
		max-width: 100%; /* Responsive image scaling */
	}

	.carousel-control {
		/* Styles for carousel control buttons */
		background: rgba(0, 0, 0, 0.28); /* Semi-transparent background */
		border-radius: 50%; /* Circular buttons */
		color: #fff; /* White text color */
		cursor: pointer; /* Pointer cursor on hover */
		display: none; /* Hidden by default */
		font-size: 40px; /* Font size for control icons */
		height: 40px; /* Height of the control buttons */
		line-height: 35px; /* Centering text vertically */
		position: absolute; /* Positioned absolutely within the carousel */
		top: 50%; /* Vertically centered */
		-webkit-transform: (0, -50%); /* Transform for centering (WebKit) */
		cursor: pointer; /* Pointer cursor on hover */
		-ms-transform: (0, -50%); /* Transform for centering (IE) */
		transform: (0, -50%); /* Transform for centering */
		text-align: center; /* Center text within the button */
		width: 40px; /* Width of the control buttons */
		z-index: 10; /* Ensures controls are above other elements */
	}

	/* Style for the previous carousel control button */

	.carousel-control.prev {
		left: 2%; /* Position the button 2% from the left */
	}

	/* Style for the next carousel control button */

	.carousel-control.next {
		right: 2%; /* Position the button 2% from the right */
	}

	/* Style for carousel controls on hover */

	.carousel-control:hover {
		background: rgba(0, 0, 0, 0.8); /* Dark background on hover */
		color: #aaaaaa; /* Light text color on hover */
	}

	/* Display control elements based on checked state of corresponding carousel */

	#carousel-1:checked ~ .control-1,
	#carousel-2:checked ~ .control-2,
	#carousel-3:checked ~ .control-3 {
		display: block; /* Show the control when the corresponding carousel is checked */
	}

	/* Style for carousel indicators */

	.carousel-indicators {
		list-style: none; /* Remove default list styling */
		margin: 0; /* Remove default margin */
		padding: 0; /* Remove default padding */
		position: absolute; /* Position indicators absolutely */
		bottom: 2%; /* Position indicators 2% from the bottom */
		left: 0; /* Align indicators to the left */
		right: 0; /* Align indicators to the right */
		text-align: center; /* Center the indicators */
		z-index: 10; /* Ensure indicators are above other elements */
	}

	/* Styles for the carousel indicators */

	.carousel-indicators li {
		display: inline-block; /* Displays indicators in a horizontal line */
		margin: 0 5px; /* Adds horizontal spacing between indicators */
	}

	/* Base styles for the carousel bullet */

	.carousel-bullet {
		color: #fff; /* Sets the bullet color to white */
		cursor: pointer; /* Changes cursor to pointer on hover */
		display: block; /* Makes the bullet a block element */
		font-size: 35px; /* Sets the font size for the bullet */
	}

	/* Styles for the carousel bullet on hover */

	.carousel-bullet:hover {
		color: #aaaaaa; /* Changes bullet color to light gray on hover */
	}

	/* Styles for the first carousel bullet when the first carousel is checked */

	#carousel-1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
    /* Styles for the second carousel bullet when the second carousel is checked */
  #carousel-2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet,
    /* Styles for the third carousel bullet when the third carousel is checked */
  #carousel-3:checked
  ~ .control-3
  ~ .carousel-indicators /* Styles for the carousel indicators */
  li:nth-child(3) /* Targeting the third indicator in the carousel */
  .carousel-bullet {
		/* Styles for the carousel bullet */
		color: #428bca; /* Set bullet color to a shade of blue */
	}

	.flex.casino {
		/* Flex container for casino elements */
		background: #091023; /* Dark background color for the casino section */
	}

	#lobby-casino .carousel-inner {
		/* Inner carousel styles specific to the lobby-casino section */
		border-radius: 0 0 30px 30px; /* Rounded corners at the bottom */
	}

	.img-prov {
		/* Styles for provider images */
		height: auto; /* Maintain aspect ratio for height */
		width: auto; /* Maintain aspect ratio for width */
		max-width: 100%; /* Limit maximum width to 100% of the container */
		max-height: 100%; /* Limit maximum height to 100% of the container */
		margin: auto; /* Center the image horizontally */
		filter: grayscale(100%); /* Apply grayscale filter to the image */
	}

	.img-prov.color {
		/* Styles for colored provider images */
		filter: grayscale(
			0%
		) !important; /* Remove grayscale filter, forcing color display */
	}

	.show-drop {
		/* Styles for elements that should be shown */
		opacity: 1 !important; /* Ensure full opacity */
		visibility: visible !important; /* Ensure the element is visible */
		position: relative !important; /* Set position to relative for layout purposes */
	}

	/* Dropdown content for the 'prov' class, initially hidden */

	.dropdown-content.prov {
		opacity: 0; /* Fully transparent */
		visibility: hidden; /* Not visible to the user */
		position: absolute; /* Positioned relative to the nearest positioned ancestor */
		background-color: #dfdfdf; /* Light gray background color */
	}

	/* Styling for the card price span */

	span.card-price {
		font-weight: bold; /* Bold text for emphasis */
		padding: 0 15px; /* Horizontal padding */
		color: #9a1eae !important; /* Purple color, with !important to override other styles */
		font-size: 20px; /* Font size set to 20px */
		display: block; /* Display as a block element */
	}

	/* Styling for the gift price span */

	span.gift-price {
		font-weight: bold; /* Bold text for emphasis */
		padding: 0 5px; /* Horizontal padding */
		color: #b48303; /* Gold color for the gift price */
		font-size: 17px; /* Font size set to 17px */
		display: block; /* Display as a block element */
		height: 34px; /* Fixed height */
		line-height: 37px; /* Line height for vertical alignment */
	}

	/* Buy button container styling */

	.buy-c {
		border: 2px solid #9a1eae; /* Solid border with purple color */
		border-bottom: none; /* No bottom border */
		padding: 10px 17px; /* Padding around the content */
		border-radius: 15px 15px 0 0; /* Rounded corners for the top */
		margin-bottom: -10px; /* Negative margin to overlap with the element below */
		padding-bottom: 20px !important; /* Increased bottom padding, with !important to override other styles */
	}

	/* Styles for the tournament title in a specific state */

	.tournament-title.state {
		border: 1px solid black; /* Black border around the title */
		border-radius: 5px; /* Rounded corners */
		line-height: 1 !important; /* Set line height to 1, overriding other styles */
		padding: 9px !important; /* Padding of 9px, overriding other styles */
	}

	/* Styles for the awards button */

	.buttom.awards {
		float: none; /* No floating, aligns with surrounding elements */
		display: inline-block; /* Allows setting width and height */
		margin-top: 13px; /* Top margin of 13px */
		line-height: 8px; /* Line height set to 8px */
		margin-left: 0 !important; /* No left margin, overriding other styles */
	}

	/* Styles for the first tournament title within the container */

	.container-title .tournament-title:first-child {
		border: 1px solid #000000; /* Black border for the first child */
		border-radius: 5px; /* Rounded corners */
		padding-top: 4px; /* Top padding of 4px */
		padding-right: 10px; /* Right padding of 10px */
		vertical-align: bottom; /* Aligns the element to the bottom */
		font-weight: 400 !important; /* Normal font weight, overriding other styles */
	}

	/* Container for awards with specific styling */

	.container-awards {
		background: white; /* White background for the awards container */
		padding: 15px 12px 10px 12px; /* Padding on all sides */
		border-radius: 0 0 10px 10px; /* Rounded bottom corners */
		position: absolute; /* Positioned absolutely within its parent */
		font-size: 12px; /* Font size set to 12px */
		z-index: 9; /* Stacking order for the container */
		display: none; /* Initially hidden */
	}

	.container-awards span.guaranteed {
		/* Styles for guaranteed award span */
		font-weight: bold; /* Makes the text bold */
		padding: 0 5px; /* Adds horizontal padding */
		color: #b48303; /* Sets text color */
		font-size: 17px; /* Sets font size */
		display: block; /* Displays as a block element */
		height: 38px; /* Sets fixed height */
		line-height: 52px; /* Centers text vertically within the height */
	}

	.container-awards span.tittle {
		/* Styles for title span */
		font-size: 9px; /* Sets font size */
		font-weight: 400; /* Sets normal font weight */
		position: absolute; /* Positions the element absolutely */
	}

	div#btn-awards:hover {
		/* Styles for button on hover */
		background: #e7ad49 !important; /* Changes background color on hover */
	}

	.bingo_moc img {
		/* Styles for bingo image */
		position: absolute; /* Positions the image absolutely */
		bottom: -7px; /* Positions image 7px from the bottom */
		right: -9px; /* Positions image 9px from the right */
		height: 100%; /* Sets height to 100% of the parent */
		pointer-events: none; /* Disables pointer events for the image */
	}

	.buttom.vip {
		/* Styles for VIP button */
		background: #991eae; /* Sets background color */
		border-color: #991eae; /* Sets border color */
		text-align: center; /* Centers text horizontally */
		font-weight: bold; /* Makes the text bold */
		border-radius: 26px; /* Rounds the corners of the button */
		cursor: pointer; /* Changes cursor to pointer on hover */
		height: 32px; /* Sets fixed height */
		line-height: 32px; /* Centers text vertically within the height */
	}

	.buttom.awards {
		/* Sets the background color and border color for the awards button */
		background: #991eae;
		border-color: #991eae;
	}

	.list-tournaments-border {
		/* Styles the tournament list with a black background, padding, and rounded corners */
		background: black;
		padding: 3px;
		border-radius: 7px;
		/* Sets a gradient background for the tournament list */
		background: rgb(255, 255, 255);
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 40%,
			rgba(221, 221, 221, 1) 100%
		);
	}

	.cross {
		/* Positions the cross element absolutely within its container */
		position: absolute;
		right: -7px; /* Aligns the element to the right */
		width: 31px; /* Sets the width of the cross */
		top: -5px; /* Aligns the element to the top */
	}

	.buy-carton {
		/* Applies a gradient background to the buy carton element */
		background: linear-gradient(
			0deg,
			rgba(154, 30, 174, 1) 0%,
			rgba(99, 0, 115, 1) 50%,
			rgba(154, 30, 174, 1) 100%
		);
	}
}
</style>

<!-- FILE DOCUMENTED -->
