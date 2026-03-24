<script lang="ts">
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import Logo from '../images/Logo.vue'; // Importing Logo component
import ClockUser from '../ClockUser.vue'; // Importing ClockUser component
import DetailsUser from '../DetailsUser.vue'; // Importing DetailsUser component
import ButtonHeader from '../ButtonHeader.vue'; // Importing ButtonHeader component
import BalanceUser from '../BalanceUser.vue'; // Importing BalanceUser component
import BalanceUserV2 from '../BalanceUserV2.vue'; // Importing BalanceUserV2 component
import BalanceUserV3 from '../BalanceUserV3.vue'; // Importing BalanceUserV3 component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import router from '@/router'; // Importing router for navigation
import HeaderDesktopv4 from './HeaderDesktopv4.vue'; // Importing HeaderDesktopv4 component

export default defineComponent({
	components: {
		IconMenu, // Registering IconMenu component
		Logo, // Registering Logo component
		ClockUser, // Registering ClockUser component
		DetailsUser, // Registering DetailsUser component
		ButtonHeader, // Registering ButtonHeader component
		BalanceUser, // Registering BalanceUser component
		BalanceUserV2, // Registering BalanceUserV2 component
		BalanceUserV3, // Registering BalanceUserV3 component
		HeaderDesktopv4, // Registering HeaderDesktopv4 component
	},
	data() {
		let config = this.$config(); // Retrieving configuration object
		let appComponent: any = this.$appComponent; // Accessing application component
		let flagInfoUser = false; // Flag to track user info visibility
		let openSelectLang = false; // Flag to track language selection visibility
		let notificationsUnread = 0; // Counter for unread notifications
		let notifications: object = []; // Array to hold notifications
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
			flagInfoUser, // Exposing flagInfoUser to the template
			openSelectLang, // Exposing openSelectLang to the template
			notificationsUnread, // Exposing notificationsUnread to the template
			notifications, // Exposing notifications to the template
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		if (
			this.config != undefined && // Check if config is defined
			this.config['not_login'] != undefined && // Check if 'not_login' is defined in config
			this.config['not_login'][this.appComponent.lngProd] != undefined && // Check for language-specific 'not_login'
			this.config['not_login'][this.appComponent.lngProd][
				'social_links'
			] != undefined // Check if social links are defined
		) {
			// Assigning social links to the header based on the current country
			this.config.SOCIAL_NEWTWORKS_HEADER[this.appComponent.country] =
				this.config['not_login'][this.appComponent.lngProd][
					'social_links'
				];
		}
	},
	methods: {
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:HeaderMobile|layout:layout-${this.appComponent.config.layout}`
            };
        },
		/**
		 * Opens a URL in the top window.
		 * @param {any} box - The object containing the URL to open.
		 */
		clickBox(box: any) {
			window.open(box.url, '_top'); // Opens the specified URL
		},
		/**
		 * Placeholder method for closing modal details.
		 */
		closeModalDetails() {},
		/**
		 * Logs out the user and resets application state.
		 */
		logOut() {
			if ((window as any).ws != undefined) {
				(window as any).ws.close(); // Closes WebSocket connection if it exists
			}
			const vthis = this; // Capturing 'this' context
			apiService.request('logout', {}).then((response: any) => {
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					// Check if logout was successful
					vthis.appComponent.tokenSB = ''; // Resetting token
					vthis.appComponent.session = {
						// Resetting session data
						logueado: false,
						usuario: '',
						nombre: '',
						pais: '',
						pais_nom: '',
						pais_id: null,
						moneda: '',
						moneda_nom: '',
						idioma: '',
						utc: '',
						token: '',
						req_cheque: '',
						req_doc: '',
						fecha_crea: '',
						fecha_actualizacion: '',
						origen: '',
						casino_enabled: '',
						verifcedula_ant: '',
						verifcedula_post: '',
						verifcedula_ant_paprob: '',
						verifcedula_post_paprob: '',
						wallet: '',
						last_login_date: null,
						last_login_ip: '',
						cedula: '',
						celular: '',
						fecha_nacim: '',
						iframemini_bannerleft: '',
						iframemini_bannerright: '',
						verifcelular: '',
						formSplaft: 'N',
						paternal_last_name: '',
						mother_last_name: '',
						email: '',
						phone: '',
						doc_type: '',
						nationalityid: '',
						first_name: '',
						identification: '',
					};
					apiService.setAuthToken(''); // Clearing authentication token
					try {
						(window as any).altenarWSDK.set({ token: '' }); // Resetting Altenar SDK token
					} catch (e) {}
					window.localStorage.removeItem('auth_token'); // Removing auth token from local storage
					vthis.appComponent.tokenUser = ''; // Resetting user token
				}
			});
			this.appComponent.tokenSB = ''; // Resetting token again
			this.appComponent.session = {
				// Resetting session data again
				logueado: false,
				usuario: '',
				nombre: '',
				pais: '',
				pais_nom: '',
				pais_id: null,
				moneda: '',
				moneda_nom: '',
				idioma: '',
				utc: '',
				token: '',
				req_cheque: '',
				req_doc: '',
				fecha_crea: '',
				fecha_actualizacion: '',
				origen: '',
				casino_enabled: '',
				verifcedula_ant: '',
				verifcedula_post: '',
				verifcedula_ant_paprob: '',
				verifcedula_post_paprob: '',
				wallet: '',
				last_login_date: null,
				last_login_ip: '',
				cedula: '',
				celular: '',
				fecha_nacim: '',
				iframemini_bannerleft: '',
				iframemini_bannerright: '',
				verifcelular: '',
				formSplaft: 'N',
				paternal_last_name: '',
				mother_last_name: '',
				email: '',
				phone: '',
				doc_type: '',
				nationalityid: '',
				first_name: '',
				identification: '',
			};
			apiService.setAuthToken(''); // Clearing authentication token again
			this.appComponent.tokenUser = ''; // Resetting user token again
			window.localStorage.removeItem('auth_token'); // Removing auth token from local storage again
			this.appComponent.loadView = false; // Disabling view loading
			let actualView = this.appComponent.viewActual; // Storing the current view
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirecting to home if version is 2
			}
			router.push('/'); // Navigating to home route
			setTimeout(() => {
				this.appComponent.loadView = true; // Re-enabling view loading
				router.push(actualView); // Navigating back to the actual view
			}, 1000); // Delay before navigating back
		},
	},
});
</script>
<template>
	<!-- Main sticky header container -->
	<div class="sticky top-0 z-[999999999]">
		<!-- Conditional header section based on route name -->
		<div
			class="w-full transition duration-200 ease-in-out border-b border-base-content text-base-100 bg-opacity-90 bg-base-300 z-[60] h-[30px] max-h-[30px]"
			v-if="
				$route.name != 'banner-right' &&
				$route.name != 'banner-left' &&
				$route.name != 'banner-rightnl' &&
				$route.name != 'banner-leftnl' &&
				$route.name != 'banner-topcenternl' &&
				$route.name != 'banner-topcenter'
			"
		>
			<!-- Navbar container -->
			<div
				class="mx-auto navbar max-w-none min-h-0 h-full font-light p-0"
			>
				<!-- Social networks display for non-logged in users -->
				<template v-if="!appComponent.session.logueado">
					<div
						v-if="
							(config.header_ != undefined &&
							config.header_.social_networks != undefined
								? config.header_.social_networks
								: config.header.showRedes) &&
							config.SOCIAL_NEWTWORKS_HEADER != undefined &&
							config.SOCIAL_NEWTWORKS_HEADER[
								appComponent.country
							] != undefined
						"
						class="items-center justify-end flex mr-2 text-xs ml-auto"
					>
						<a
							@click="
								appComponent.gAnalytics(
									'button_social_network',
									value
								)
							"
							:aria-label="value.SOCIAL_ICON"
							v-for="value in config.SOCIAL_NEWTWORKS_HEADER[
								appComponent.country
							]"
							:href="value.SOCIAL_URL"
							target="_blank"
							class="icons-social-header"
						>
							<font-awesome-icon
								:icon="{
									prefix: 'fab',
									iconName: value.SOCIAL_ICON,
								}"
							/>
						</a>
					</div>
				</template>
				<!-- Upper fringe for logged in users -->
				<div
					v-if="
						(config.header_ != undefined &&
						config.header_.top_band != undefined
							? config.header_.top_band
							: config.header.showTicker) &&
						appComponent.boxes.length > 0 &&
						appComponent.session.logueado
					"
					class="ticker-mobile items-baseline text-start md:text-end flex justify-start md:justify-end md:w-[65%]"
				>
					<div
						class="viewport"
						v-bind:class="{ moving: appComponent.moving }"
					>
						<!-- Display boxes in the ticker -->
						<div
							class="box md:flex justify-start md:justify-end hidden"
							v-for="box in appComponent.boxes"
						>
							<span
								@click="
									clickBox(box);
									appComponent.gAnalytics('pronter');
								"
								v-html="box.title"
							></span>
						</div>
					</div>
				</div>
				<!-- User login section -->
				<div
					class="ml-auto h-full mr-2 container-small flex justify-center items-center"
					v-if="appComponent.session.logueado"
				>
					<!-- Clock display for user -->
					<ClockUser
						v-if="
							config.header_ != undefined &&
							config.header_.clock != undefined
								? config.header_.clock
								: config.header.clock
						"
					/>
					<!-- Notifications for user -->
					<div
						v-if="config.header.notifications"
						class="detail-notifications indicator mx-3"
					>
						<div class="dropdown dropdown-end">
							<a tabindex="0" class="text-2xl md:text-xl">
								<i class="fa fa-bell"></i>
								<!-- Unread notifications count -->
								<small
									v-if="notificationsUnread > 0"
									style="transform: translate(-9px, 2px)"
									class="bg-red-500 border border-red-500 text-neutral inline-flex items-center rounded-lg px-1 h-4 font-bold text-xs absolute top-0 ltr:right-0 rtl:left-0 ring-2 ring-neutral dark:ring-gray-600 h-4"
									>{{ notificationsUnread }}</small
								>
							</a>
							<!-- Notifications dropdown content -->
							<div
								class="detail-notifications-info absolute top-9 -left-20 sm:-left-3 overflow-hidden rounded-2xl w-80 dropdown-content shadow-md w-20"
								tabindex="0"
							>
								<div class="nav-open-view-contain">
									<div class="drop-nav-new-b">
										<div class="drop-items-contain-b">
											<ul
												class="bg-base-100 text-base-content"
											>
												<h5
													class="not-tittle sticky top-0 font-bold text-neutral px-4 py-0 mb-0 border-b-2 border-solid bg-primary"
													style=""
												>
													Notificaciones
												</h5>
												<div
													class="overflow-y-auto h-60 contain-n"
												>
													<!-- Display each notification -->
													<div
														v-for="notification in notifications"
														v-link="{
															path: notification[
																'url'
															],
														}"
														v-bind:class="{
															checked:
																notification[
																	'checked'
																] == 0,
														}"
														class="w-full p-3 mt-0 bg-neutral rounded flex border-indigo-200 border-b-1 border-solid cursor-pointer"
													>
														<div
															style="width: 20px"
															tabindex="0"
															aria-label="heart icon"
															role="img"
															class="focus:outline-none h-8 border rounded-full border-gray-200 flex items-center justify-center"
														>
															<img
																v-if="
																	notification[
																		'img'
																	] !=
																		undefined &&
																	notification[
																		'img'
																	] != ''
																"
																:src="
																	notification[
																		'img'
																	]
																"
																alt="icon"
															/>
															<div
																v-if="
																	notification[
																		'icon'
																	] !=
																		undefined &&
																	notification[
																		'icon'
																	] != ''
																"
																v-html="
																	notification[
																		'icon'
																	]
																"
															></div>
															<img
																v-if="
																	(notification[
																		'img'
																	] ==
																		undefined ||
																		notification[
																			'img'
																		] ==
																			'') &&
																	(notification[
																		'icon'
																	] ==
																		undefined ||
																		notification[
																			'icon'
																		] == '')
																"
																:src="
																	config.favicon
																"
																alt="icon"
															/>
														</div>
													</div>
													<!-- Button to view all notifications -->
													<div
														class="btn btn-xs bg-success text-base-100 w-44 block mx-auto my-4 rounded-xl"
														v-link="{
															path:
																config.baseUrlFx +
																'/notificaciones',
														}"
														style="
															background: linear-gradient(
																0deg,
																rgba(
																		0,
																		82,
																		6,
																		1
																	)
																	0%,
																rgba(
																		0,
																		173,
																		31,
																		1
																	)
																	100%
															);
														"
													>
														<span
															style="
																line-height: 2;
															"
															>{{
																$t(
																	'Ir a Notificaciones'
																)
															}}</span
														>
													</div>
												</div>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Button Header  -->
					<ButtonHeader class="ml-4 w-[87px]" />
					<!-- User details -->
					<DetailsUser class="text-xs font-poppinssl" />
					<!-- Points Loyalty User -->
					<RouterLink
						class="lvl desktop mx-3 border-solid border-x-2 px-1 border-gray-300 block text-xs"
						@click="appComponent.gAnalytics('profile_balance')"
						v-if="config.loyalty[appComponent.country]"
						:to="'/gestion/mi_lealtad'"
						v-bind="analyticsAttrs(`header:menu:user-menu`)"
					>
						<span>Puntos: {{ appComponent.loyalty.points }}</span>
					</RouterLink>
					<!-- End Points Loyalty User -->
					<div
						class="items-center justify-center flex-none mr-2 ml-2 flex"
					>
						<span
							:class="'country-flags ' + appComponent.country"
						></span>
						<span class="text-xs ml-1">{{
							appComponent.session.pais_nom
						}}</span>
					</div>
					<!-- Language change dropdown -->
					<div
						class="items-center flex-none block container-small mb-3"
						v-if="
							config.header_ != undefined &&
							config.header_.change_language != undefined
								? config.header_.change_language
								: config.language.showSelectLang
						"
					>
						<div class="dropdown dropdown-end">
							<div
								tabindex="0"
								class="m-1 btn btn-xs mt-4 gap-2"
								@click="openSelectLang = true"
							>
								<span
									:class="
										'country-flags ' +
										appComponent.selectFlag
									"
								></span>
								<span>{{ appComponent.lngProd }}</span>
							</div>
							<ul
								tabindex="0"
								class="p-2 menu dropdown-content bg-base-100 rounded-box w-24 text-base-content"
								v-if="openSelectLang"
							>
								<!-- Language options -->
								<li
									v-for="country in appComponent.countries"
									@click="
										appComponent.changeLanguage(
											country.name,
											country.flag
										);
										openSelectLang = false;
									"
								>
									<span>
										<span
											:class="
												'country-flags ' + country.flag
											"
										></span>
										{{ country.name.toLocaleUpperCase() }}
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Desktop header for larger screens -->
		<div class="block lg:hidden">
			<HeaderDesktopv4></HeaderDesktopv4>
		</div>
	</div>
</template>
<style>
/* Header with a clipped polygon shape */
.border__header {
	clip-path: polygon(0 0, 100% 0%, 78% 100%, 0% 100%);
}

/* Social icons in the header with padding and font size */
.icons-social-header {
	padding: 3px !important;
	font-size: 2em;
}

/* Title styling for highlighted bonuses with animation */
.bono-destacado .title .spant {
	display: inline-block;
	white-space: nowrap;
	animation: floatText 15s infinite linear; /* Continuous floating animation */
	padding-left: 100%; /* Initial padding for animation */
	padding-top: 1px;
	font-size: 12px;
}

/* Pause animation on hover */
.bono-destacado .title .spant:hover {
	animation-play-state: paused;
}

/* Display property for open elements */
.open {
	display: inherit !important;
}

/* Positioning for version 2 of the menu header */
.version2.menu-header-netabet {
	position: inherit;
}

/* Keyframes for mobile left movement animation */
@-webkit-keyframes moveLeftMobile {
	0% {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
	100% {
		-webkit-transform: translateX(-170%);
		transform: translateX(-170%);
	}
}

/* Keyframes for mobile left movement animation */
@keyframes moveLeftMobile {
	0% {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
	100% {
		-webkit-transform: translateX(-170%);
		transform: translateX(-170%);
	}
}

/* Media query for header minimum height on small screens */
@media (max-width: 810px) {
	header {
		min-height: 42px;
	}
}

/* Media query for ticker box width on smaller screens */
@media (max-width: 700px) {
	.ticker-mobile .viewport .box {
		width: 600px;
	}
}

/* User components positioning and styling */
.usuario-componentes {
	position: absolute !important;
	width: 295px !important;
	right: 0px !important;
	margin-right: 15px !important;
	text-align: right !important;
	font-family: 'Roboto', sans-serif !important;
}

/* Language selection styling for logged-in users */
body.logueado select.select-language {
	height: auto;
	width: 41px;
	padding: 0;
	position: relative;
	top: -2px;
}

/* Animation for moving ticker on mobile */
.ticker-mobile .viewport.moving {
	-webkit-animation: moveLeftMobile 1 3s linear;
	animation: moveLeftMobile 1 3s linear;
}

/* Ticker box width */
.ticker-mobile .viewport .box {
	width: 600px;
}

/* Progress container for highlighted bonuses */
.bono-destacado .progress-container {
	width: 100%;
}

/* Meter styling for progress bars */
.meter {
	box-sizing: content-box;
	height: 10px;
	position: relative;
	background: #ffffff;
	border-radius: 25px;
	padding: 5px;
	box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
}

/* Span inside the meter for progress indication */
.meter > span {
	display: block;
	height: 100%;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	background-color: #2a8601; /* Progress color */
	background-image: linear-gradient(center bottom, #2a8601, #2a8601);
	box-shadow:
		inset 0 2px 9px rgba(255, 255, 255, 0.3),
		inset 0 -2px 6px rgba(0, 0, 0, 0.4);
	position: relative;
	overflow: hidden;
}

/* After pseudo-element for animated effect on the meter */
.meter > span:after,
.animate > span > span {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-image: linear-gradient(
		-45deg,
		rgba(255, 255, 255, 0.2) 25%,
		transparent 25%,
		transparent 50%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0.2) 75%,
		transparent 75%,
		transparent
	);
	z-index: 1;
	background-size: 50px 50px; /* Size of the animated background */
	animation: move 2s linear infinite; /* Continuous movement animation */
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	overflow: hidden;
}

/* Center positioning for scroll-on-top elements */
.scroll-on-top-center {
	top: 38px;
}

/* Keyframes for background movement animation */
@keyframes move {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 50px 50px;
	}
}

/* Percentage display styling */
.porcent {
	position: inherit;
	left: 50%;
	font-size: 12px;
	color: black;
	font-weight: bold;
	top: -15px;
}

/* Icon button color styling */
.mat-icon-button {
	color: black !important;
}

/* Styling for highlighted bonuses */
.bono-destacado {
	border-radius: 10px;
	padding: 5px;
	margin: 4px 15px 0px 15px;
	background: linear-gradient(
		60deg,
		rgba(141, 141, 141, 0.8),
		rgba(217, 215, 215, 0.71),
		rgba(217, 215, 215, 0.68),
		#ffffff,
		#ffffff,
		rgba(217, 215, 215, 0.68),
		rgba(217, 215, 215, 0.71),
		rgba(158, 158, 158, 0.8)
	);
	cursor: pointer; /* Pointer cursor on hover */
	z-index: -2; /* Layering */
	height: 85px; /* Fixed height */
	width: 200px; /* Fixed width */
}

/* Scale effect on hover for highlighted bonuses */
.bono-destacado:hover {
	transform: scale(1.04);
}

/* Title styling for general use */
.mytitle {
	display: block;
	text-align: center;
	line-height: 13px;
	color: black;
	font-weight: bold;
	overflow: hidden;
}

/* Secondary title styling */
.mytitle2 {
	display: block;
	text-align: center;
	line-height: 13px;
	color: black;
	overflow: hidden;
}

/* Styling for count display */
span.cant {
	display: block;
	border-radius: 15px;
	text-align: center;
	background: white;
	color: black;
	font-weight: bold;
	width: calc(100% - 50px); /* Responsive width */
	height: 20px;
	line-height: 20px;
	border-color: black;
}

/* Span with floating text animation */
.spant {
	display: inline-block;
	white-space: nowrap;
	animation: floatText 15s infinite linear; /* Continuous floating animation */
	padding-left: 100%; /* Initial padding for animation */
	padding-top: 1px;
}
</style>

<!-- FILE DOCUMENTED -->
