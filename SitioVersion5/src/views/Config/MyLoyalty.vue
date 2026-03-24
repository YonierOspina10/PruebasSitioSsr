<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import { defineComponent } from 'vue'; // Importing defineComponent for creating Vue components
import router from '@/router'; // Importing router for navigation
import ShopBonuses from './ShopBonuses.vue'; // Importing ShopBonuses component

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		ShopBonuses, // Registering ShopBonuses component
	},
	data: function () {
		let config = this.$config(); // Getting configuration data
		let emitter = this.$emitter(); // Getting event emitter
		let appComponent: any = this.$appComponent; // Getting application component reference
		let refreshBalance = this.$refreshBalance; // Getting refresh balance function
		let loyalty: any = {}; // Initializing loyalty object
		let pointsHistory: any = {}; // Initializing points history object
		let typePeriod: string = '0'; // Initializing type period as string '0'
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			loyalty,
			pointsHistory,
			typePeriod,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.appComponent.closeModal(); // Closing modal when event is triggered
		});
		if (
			this.config.loyalty[this.appComponent.country] == undefined || // Checking if loyalty config exists for the country
			!this.config.loyalty[this.appComponent.country]
		) {
			router.push('/'); // Redirecting to home if loyalty config is not found
		}
		this.initMyLoyalty(); // Initializing loyalty data
	},
	methods: {
		closeModal() {
			this.appComponent.closeModal(); // Method to close modal
		},
		initMyLoyalty() {
			apiService.request('my_loyalty', {}).then((response: any) => {
				// Requesting loyalty data
				if (response.code == 0) {
					this.loyalty = response.data.loyalty[0]; // Storing loyalty data if request is successful
				}
			});
			this.changePeriodList(); // Changing period list after initializing loyalty
		},
		changePeriodList() {
			var startDate = new Date(); // Getting current date
			startDate.setDate(startDate.getDate() - parseInt(this.typePeriod)); // Setting start date based on type period
			var startDateFrom = parseInt(
				startDate.setHours(startDate.getHours()).toString().slice(0, 10) // Formatting start date
			);
			var endDate = new Date(); // Getting current date for end date
			startDate.setDate(startDate.getDate() - parseInt(this.typePeriod)); // Setting end date based on type period
			var endDateFrom = parseInt(
				endDate.setHours(endDate.getHours()).toString().slice(0, 10) // Formatting end date
			);
			const params = {
				where: {
					from_date: startDateFrom, // Setting from date for request
					to_date: endDateFrom, // Setting to date for request
				},
			};
			apiService
				.request('my_points_history', params) // Requesting points history data
				.then((response: any) => {
					if (response.code == 0) {
						this.pointsHistory = response.data.pointsHistory; // Storing points history data if request is successful
					}
				});
		},
	},
});
</script>
<template>
	<!-- Header section, displayed if layout is not 3 -->
	<div
		v-if="config.layout != 3"
		class="int-header h-40 bg-gradient-to-r from-primary to-base-content absolute w-full"
	></div>
	<!-- Main content section, displayed if user is logged in and layout is not 3 -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado && (!config.loyalty_type || Object.keys(config.loyalty_type).length === 0 || config.loyalty_type.version !== 3)"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full lg:w-10/12 mx-auto'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Lealtad') }}</span
						>
					</span>
				</div>
				<!-- User menu and content section -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'mi_lealtad'"
						:MENU_ID="'5'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'mi_lealtad'"
						:MENU_ID="'5'"
					/>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div
							class="Container InfoContent mb-5 p-5 rounded-xl shadow-md bg-base-400"
						>
							<div class="myContainer">
								<!-- Loyalty level and points display -->
								<div
									class="list bg-base-content w-full h-full inline-block rounded-lg"
								>
									<div class="rank">
										<div class="lvl">
											<img
												:src="
													'assets/images/lealtad/lvl_' +
													loyalty.level +
													'.png'
												"
												alt=""
											/>
										</div>
									</div>
									<div class="point-left border-neutral">
										<span class="content-test-1 text-neutral"
											>{{ $t('Puntos de lealtad:') }}
											<span
												class="content-test-2 text-primary"
												>{{ loyalty.points }}</span
											>
										</span>
									</div>
									<div class="myContainer-2">
										<!-- Points history collapse section -->
										<div
											class="collapse w-full border rounded-box border-neutral collapse-arrow text-neutral bg-base-300"
										>
											<input
												class="w-full"
												type="checkbox"
											/>
											<div
												class="collapse-title text-xl font-medium text-neutral"
											>
												{{ $t('Historial de puntos') }}
											</div>
											<div class="collapse-content">
												<div class="video-youtube">
													<div
														class="container-filter"
													>
														<div class="filter">
															<span
																class="filters-section"
															>
																<strong class="text-neutral">{{
																	$t(
																		'Intervalo:'
																	)
																}}</strong>
																<select
																	v-model="
																		typePeriod
																	"
																	@change="
																		changePeriodList()
																	"
																	class="bg-base-300 border-neutral rounded-md text-neutral"
																>
																	<option
																		value="0"
																	>
																		{{
																			$t(
																				'Hoy'
																			)
																		}}
																	</option>
																	<option
																		value="1"
																	>
																		{{
																			$t(
																				'Último día'
																			)
																		}}
																	</option>
																	<option
																		value="7"
																	>
																		{{
																			$t(
																				'Últimos 7 días'
																			)
																		}}
																	</option>
																	<option
																		value="31"
																	>
																		{{
																			$t(
																				'Últimos 30 días'
																			)
																		}}
																	</option>
																	<option
																		value="366"
																	>
																		{{
																			$t(
																				'Último año'
																			)
																		}}
																	</option>
																</select>
															</span>
														</div>
													</div>
													<!-- Displaying points history based on selected period -->
													<span
														v-if="
															pointsHistory !==
																null &&
															pointsHistory !==
																undefined &&
															pointsHistory.initialPoints !==
																undefined &&
															pointsHistory.initialPoints !==
																null
														"
														class="content-test-1 text-neutral"
														>{{
															$t(
																'Puntos al inicio del período:'
															)
														}}
														<span
															class="content-test-2"
															>{{
																pointsHistory.initialPoints
															}}</span
														>
													</span>
													<span
														v-if="
															pointsHistory !==
																null &&
															pointsHistory !==
																undefined &&
															pointsHistory.pointsEarned !==
																undefined &&
															pointsHistory.pointsEarned !==
																null
														"
														class="content-test-1 text-neutral"
														>{{
															$t(
																'Puntos obtenidos:'
															)
														}}
														<span
															class="content-test-2"
															>{{
																pointsHistory.pointsEarned
															}}</span
														>
													</span>
													<span
														v-if="
															pointsHistory !==
																null &&
															pointsHistory !==
																undefined &&
															pointsHistory.redeemedPoints !==
																undefined &&
															pointsHistory.redeemedPoints !==
																null
														"
														class="content-test-1 text-neutral"
														>{{
															$t(
																'Puntos redimidos:'
															)
														}}
														<span
															class="content-test-2"
															>{{
																pointsHistory.redeemedPoints
															}}</span
														>
													</span>
													<span
														v-if="
															pointsHistory !==
																null &&
															pointsHistory !==
																undefined &&
															pointsHistory.finalPoints !==
																undefined &&
															pointsHistory.finalPoints !==
																null
														"
														class="content-test-1 text-neutral"
														>{{
															$t(
																'Puntos al final del período:'
															)
														}}
														<span
															class="content-test-2"
															>{{
																pointsHistory.finalPoints
															}}</span
														>
													</span>
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
	</div>
	<!-- Section displayed if layout is 3 -->
	<section
	v-if="
        config.loyalty_type != undefined &&
      config.loyalty_type.version != undefined && 
      config.loyalty_type.version == 3
    "
		class="relative flex justify-center items-center"
	>
		<img
			:src="config.loyalty_type.bgLoyalty !== undefined ? config.loyalty_type.bgLoyalty : 'https://images.virtualsoft.tech/m/msj0212T1750269067.png'"
			alt=""
			class="absolute in top-0 w-full h-full object-cover object-top"
		/>
		<article
			class="flex flex-col justify-center items-center sm:gap-4 w-11/12 h-full max-w-[1000px] text-neutral z-20 my-5 sm:my-20"
		>
			<h2
				class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% max-w-[500px] text-neutral w-full h-10 sm:h-14 flex justify-center items-center font-bold text-xl sm:text-2xl"
			>
				{{ $t('Historial de puntos') }}
			</h2>
			<div
				class="w-full max-w-[700px] h-full flex flex-col justify-center items-center"
			>
				<div
					class="w-full h-full flex flex-col justify-center items-center gap-2 my-4"
				>
					<div class="relative w-[175px] h-[175px]">
						<img
							src="https://images.virtualsoft.tech/m/msjT1686143273.png"
							alt=""
							class="animationImg w-full h-full object-contain object-center"
						/>
						<img
							src="https://images.virtualsoft.tech/m/msjT1686143387.png"
							alt=""
							class="animationImg2 absolute top-0 w-full h-full object-contain object-center"
						/>
					</div>
					<div
						class="w-40 h-12 flex justify-center items-center bg-gradient-to-b from-neutral via-neutral via-50% to-base500 rounded-xl py-2"
					>
						<span
							class="text-primary text-3xl font-semibold"
							>{{ appComponent.loyalty.points }}</span
						>
					</div>
				</div>
				<div
					class="h-full w-11/12 flex flex-col justify-center items-center gap-2 sm:gap-4"
				>
					<div
						class="w-full flex flex-col justify-center items-center gap-1 mb-4 sm:mb-0"
					>
						<h3
							class="w-full text-neutral text-center sm:text-start text-base sm:text-xl font-semibold"
						>
							{{ $t('Intervalo') }}
						</h3>
						<select
							v-model="typePeriod"
							@change="changePeriodList()"
							class="in w-full h-14 sm:h-16 flex justify-center items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-base-200 hover:scale-105 cursor-pointer"
						>
							<option value="0">{{ $t('Hoy') }}</option>
							<option value="1">
								{{ $t('Último día') }}
							</option>
							<option value="7">
								{{ $t('Últimos 7 días') }}
							</option>
							<option value="31">
								{{ $t('Últimos 30 días') }}
							</option>
							<option value="366">
								{{ $t('Último año') }}
							</option>
						</select>
					</div>
					<div
						class="w-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
					>
						<div
							class="in w-full h-12 sm:h-16 flex justify-between items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-base-200 hover:scale-105 cursor-pointer"
						>
							<span class="text-base">{{
								$t('Puntos al inicio del período:')
							}}</span>
							<span
								class="text-neutral"
								v-if="
									pointsHistory !== null &&
									pointsHistory !== undefined &&
									pointsHistory.initialPoints !== undefined &&
									pointsHistory.initialPoints !== null
								"
								>{{ pointsHistory.initialPoints }}</span
							>
						</div>
						<div
							class="in w-full h-12 sm:h-16 flex justify-between items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-base-200 hover:scale-105 cursor-pointer"
						>
							<span class="text-base">{{
								$t('Puntos obtenidos:')
							}}</span>
							<span
								class="text-neutral"
								v-if="
									pointsHistory !== null &&
									pointsHistory !== undefined &&
									pointsHistory.pointsEarned !== undefined &&
									pointsHistory.pointsEarned !== null
								"
								>{{ pointsHistory.pointsEarned }}</span
							>
						</div>
					</div>
					<div
						class="w-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
					>
						<div
							class="in w-full h-12 sm:h-16 flex justify-between items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-base-200 hover:scale-105 cursor-pointer"
						>
							<span class="text-base">{{
								$t('Puntos redimidos:')
							}}</span>
							<span
								class="text-neutral"
								v-if="
									pointsHistory !== null &&
									pointsHistory !== undefined &&
									pointsHistory.redeemedPoints !==
										undefined &&
									pointsHistory.redeemedPoints !== null
								"
								>{{ pointsHistory.redeemedPoints }}</span
							>
						</div>
						<div
							class="in w-full h-12 sm:h-16 flex justify-between items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-base-200 hover:scale-105 cursor-pointer"
						>
							<span class="text-base">{{
								$t('Puntos al final del período:')
							}}</span>
							<span
								class="text-neutral"
								v-if="
									pointsHistory !== null &&
									pointsHistory !== undefined &&
									pointsHistory.finalPoints !== undefined &&
									pointsHistory.finalPoints !== null
								"
								>{{ pointsHistory.finalPoints }}</span
							>
						</div>
					</div>
				</div>
			</div>
		</article>
	</section>
	<ShopBonuses v-if="config.loyalty_type != undefined &&
      config.loyalty_type.version != undefined && 
      config.loyalty_type.version == 3 && !appComponent.infoApp" />
	<!-- ShopBonuses component displayed if layout is 3 -->
</template>
<style scoped>
.animationImg2 {
	animation: zoomRev 3s ease 0s infinite; /* Animation for the second image */
}

@keyframes zoomRev {
	0% {
		scale: 1.07; /* Initial scale */
	}
	50% {
		scale: 1; /* Mid scale */
	}
	100% {
		scale: 1.07; /* Final scale */
	}
}

.animationImg {
	animation: zoom 3s ease 0s infinite; /* Animation for the first image */
}

@keyframes zoom {
	0% {
		scale: 1; /* Initial scale */
	}
	50% {
		scale: 1.07; /* Mid scale */
	}
	100% {
		scale: 1; /* Final scale */
	}
}

.titles {
	background: linear-gradient(
		/* Gradient background for titles */ 270deg,
        hsl(var(--b3)) 0%,
        hsl(var(--b3)) 21.07%,
        hsl(var(--b3)) 50%,
        hsl(var(--b3)) 82.9%,
        hsl(var(--b3)) 100%
	);
}

.myContainer span.porcent {
	width: 240px !important; /* Fixed width for percentage display */
	float: left;
	display: block;
	top: auto;
	z-index: 999;
	margin-top: -17px;
	height: 18px;
	text-align: center;
	font-size: 11px;
	color: white; /* Text color */
}

.myContainer #myProgress {
	border-radius: 0; /* No border radius for progress bar */
	margin: 10px 0px; /* Margin for progress bar */
}

.point-left {
	border: solid 1px; /* Border styling for point display */
	border-bottom: none;
	border-radius: 10px 10px 0 0;
	padding-top: 15px;
	margin: 10px;
	margin-bottom: 0;
	padding-bottom: 15px;
}

.myContainer-2 {
	border-radius: 0; /* No border radius for container */
	padding: 10px; /* Padding for container */
	padding-top: 0px; /* No top padding */
}

.myContainer-2 .list-2 {
	padding-top: 10px; /* Padding for list */
	padding-bottom: 10px; /* Padding for list */
}

.myContainer [aria-describedby='list_progress'] {
	padding: 1px 3px !important; /* Padding for progress description */
	vertical-align: middle; /* Vertical alignment */
}

.rank > div {
	display: inline-block; /* Inline block for rank display */
	vertical-align: middle; /* Vertical alignment */
}

.rank > div:first-child {
	width: 30%; /* Width for first child */
	padding-right: 15px; /* Right padding */
	border-right: 1px solid white; /* Right border */
}

.rank > div:last-child span {
	text-align: left; /* Left alignment for last child */
	padding-left: 0; /* No left padding */
}

.rank > div:last-child {
	width: 70%; /* Width for last child */
	padding-left: 20px; /* Left padding */
}

.list-2 {
	width: 100%; /* Full width for list */
	height: 100%; /* Full height for list */
	background: #a6a2b636; /* Background color */
	margin-right: 12px; /* Right margin */
	border-radius: 9px; /* Border radius for list */
	overflow: hidden; /* Hide overflow */
	border: 1px solid black; /* Border for list */
}

.list span.state {
	width: 100%; /* Full width for state display */
	display: block; /* Block display */
	text-align: center; /* Center alignment */
	background: black; /* Background color */
	color: white; /* Text color */
	position: relative; /* Relative positioning */
	font-size: 11px; /* Font size */
	padding: 2px 5px; /* Padding for state display */
}

.list span.title {
	display: block; /* Block display for title */
	text-align: center; /* Center alignment */
	padding: 5px 10px; /* Padding for title */
	line-height: 13px; /* Line height for title */
	color: white; /* Text color */
	padding-top: 10px; /* Top padding */
	font-weight: bold; /* Bold font weight */
	overflow: hidden; /* Hide overflow */
	font-size: 16px; /* Font size */
	text-transform: uppercase; /* Uppercase text */
}

.list span.content-test-1 {
	display: block; /* Block display for content */
	text-align: left; /* Left alignment */
	padding: 1px 15px; /* Padding for content */
	line-height: 10px; /* Line height for content */
	padding-bottom: 10px; /* Bottom padding */
	overflow: hidden; /* Hide overflow */
	font-size: 16px; /* Font size */
}

.list span.content-test-2 {
	text-align: left; /* Left alignment */
	padding: 5px 10px; /* Padding for content */
	line-height: 13px; /* Line height for content */
	padding-bottom: 10px; /* Bottom padding */
	overflow: hidden; /* Hide overflow */
	font-size: 16px; /* Font size */
}

.list:hover span.title {
	height: auto; /* Auto height on hover */
	overflow: auto; /* Show overflow on hover */
}

.myContainer {
	height: 100%; /* Full height for container */
	width: 70%; /* Width for container */
	margin-left: auto; /* Center alignment */
	margin-right: auto; /* Center alignment */
}

@media (max-width: 768px) {
	.myContainer {
		height: 100%; /* Full height for container on small screens */
		width: 100%; /* Full width for container on small screens */
		margin-left: auto; /* Center alignment */
		margin-right: auto; /* Center alignment */
	}
}

span.cant {
	display: block; /* Block display for count */
	margin: 5px auto; /* Center alignment */
	border-radius: 50%; /* Circular shape */
	text-align: center; /* Center alignment */
	background: #b48500; /* Background color */
	color: white; /* Text color */
	font-weight: bold; /* Bold font weight */
	width: 50px; /* Width for count */
	height: 50px; /* Height for count */
	font-size: 26px; /* Font size */
	line-height: 45px; /* Line height for count */
	border-width: 2px; /* Border width */
	border-style: solid; /* Solid border */
	border-color: #594003; /* Border color */
}

#myBarBonos {
	width: 1%; /* Initial width for bonus bar */
	height: 18px; /* Height for bonus bar */
	background-color: #b48500; /* Background color for bonus bar */
	border-radius: 0 15px 15px 0; /* Rounded corners for bonus bar */
}

.myBarBn {
	width: 1%; /* Initial width for bar */
	text-align: right; /* Right alignment */
	display: inline-block; /* Inline block display */
	height: 20px; /* Height for bar */
	background-color: white; /* Background color for bar */
}

.rank {
	padding: 10px; /* Padding for rank display */
	padding-bottom: 20px; /* Bottom padding for rank display */
}

.open .lealtad.accordionItemContent {
	background-color: transparent; /* Transparent background for open accordion */
	border: none; /* No border for open accordion */
}

.lealtad.accordionItemHeading {
	margin-bottom: 0; /* No bottom margin for heading */
	background: #b48500; /* Background color for heading */
	padding: 12px 16px; /* Padding for heading */
}

.list-2.vAccordion--default .accordionItemHeading {
	border-bottom: none; /* No bottom border for accordion heading */
}

#myProgress {
	background-color: white; /* Background color for progress bar */
	border-radius: 0 15px 15px 0; /* Rounded corners for progress bar */
	background-image: linear-gradient(
		100deg,
		rgb(0, 226, 248),
		red,
		yellow
	); /* Gradient background for progress bar */
	display: block; /* Block display for progress bar */
	height: 20px; /* Height for progress bar */
}

.filter {
	padding: 6px 15px; /* Padding for filter */
	padding-bottom: 20px; /* Bottom padding for filter */
	border-radius: 5px; /* Rounded corners for filter */
	font-size: 13px; /* Font size for filter */
	width: 100%; /* Full width for filter */
	margin-left: auto; /* Center alignment */
	margin-right: auto; /* Center alignment */
	color: white; /* Text color */
}

.lvl {
	display: none !important; /* Hiding level display */
}

.video-youtube iframe {
	max-width: 500px; /* Maximum width for YouTube video */
}
</style>

<!-- FILE DOCUMENTED -->
