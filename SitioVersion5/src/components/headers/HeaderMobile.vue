<script lang="ts">
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import Logo from '../images/Logo.vue'; // Importing Logo component
import ClockUser from '../ClockUser.vue'; // Importing ClockUser component
import DetailsUser from '../DetailsUser.vue'; // Importing DetailsUser component
import ButtonHeader from '../ButtonHeader.vue'; // Importing ButtonHeader component
import BalanceUser from '../BalanceUser.vue'; // Importing BalanceUser component
import BalanceUserV2 from '../BalanceUserV2.vue'; // Importing BalanceUserV2 component
import BalanceUserV3 from '../BalanceUserV3.vue'; // Importing BalanceUserV3 component
import apiService from '@/services/ApiService'; // Importing API service for handling requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import router from '@/router'; // Importing router for navigation
import ThemeButton from '../ThemeButton.vue';

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
		ThemeButton
	},
	data() {
		let config = this.$config(); // Retrieving configuration object
		let appComponent: any = this.$appComponent; // Accessing app component instance
		let flagInfoUser = false; // Flag to indicate user info visibility
		let openSelectLang = false; // Flag to indicate language selection visibility
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
			this.config != undefined && // Checking if config is defined
			this.config['not_login'] != undefined && // Checking if 'not_login' is defined in config
			this.config['not_login'][this.appComponent.lngProd] != undefined && // Checking if language-specific 'not_login' is defined
			this.config['not_login'][this.appComponent.lngProd][
				'social_links'
			] != undefined // Checking if social links are defined
		) {
			// Assigning social links to the header based on the current country
			this.config.SOCIAL_NEWTWORKS_HEADER[this.appComponent.country] =
				this.config['not_login'][this.appComponent.lngProd][
					'social_links'
				];
		}
	},
	methods: {
		/**
		 * Opens a URL in the top window.
		 * @param {any} box - The object containing the URL to open.
		 */
		clickBox(box: any) {
			window.open(box.url, '_top'); // Opening the specified URL
		},
		/**
		 * Placeholder method for closing modal details.
		 */
		closeModalDetails() {},
		/**
		 * Logs out the user and resets the application state.
		 */
		logOut() {
			if ((window as any).ws != undefined) {
				(window as any).ws.close(); // Closing WebSocket connection if it exists
			}
			const vthis = this; // Storing reference to 'this'
			apiService.request('logout', {}).then((response: any) => {
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					// Checking if logout was successful
					vthis.appComponent.tokenSB = ''; // Clearing token
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
					vthis.appComponent.tokenUser = ''; // Clearing user token
				}
			});
			this.appComponent.tokenSB = ''; // Clearing token again for safety
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
			try {
				(window as any).altenarWSDK.set({ token: '' }); // Resetting Altenar SDK token again
			} catch (e) {}
			this.appComponent.tokenUser = ''; // Clearing user token again
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
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:HeaderMobile|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>
<template>
	<!-- Main navigation container with sticky positioning and dynamic background color -->
	<div
		id="nav"
		class="inset-x-0 top-0 w-full transition duration-200 ease-in-out border-b border-base-content text-neutral sticky bg-base-300 z-30"
		:class="[
			config.headerBar != undefined && config.headerBar.bg != undefined
				? config.headerBar.bg
				: 'bg-neutral-content',
		]"
		v-if="
			$route.name != 'banner-right' &&
			$route.name != 'banner-left' &&
			$route.name != 'banner-rightnl' &&
			$route.name != 'banner-leftnl' &&
			$route.name != 'banner-topcenternl' &&
			$route.name != 'banner-topcenter'
		"
	>
		<!-- Navbar container with responsive height and padding -->
		<div
			class="mx-auto navbar max-w-none min-h-0 h-16 md:h-10 font-light p-0"
		>
			<!-- Drawer button for mobile menu -->
			<div class="flex-none">
				<label
					for="main-menu"
					v-bind="analyticsAttrs('menu:toggle')"
					class="btn btn-square btn-ghost drawer-button lg:hidden text-neutral"
				>
					<IconMenu />
				</label>
			</div>
			<!-- Logo container for mobile view -->
			<div
				class="flex items-center flex-none lg:hidden h-[42px] w-[75px]"
				v-if="config.menuMobile.logo.show"
			>
				<!-- Router link to homepage with logo -->
				<RouterLink
					v-if="!appComponent.appPOS"
					to="/"
					v-bind="analyticsAttrs('header:logo')"
					class="p-0 flex-0 btn btn-ghost nuxt-link-active w-full h-full"
					aria-label="Homepage"
				>
					<Logo
						v-bind:url="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
						v-bind:height="18"
						v-bind:width="88"
						v-bind:c_logo="'header-logo w-full h-full object-contain'"
					></Logo>
				</RouterLink>
				<!-- Alternative router link for POS application -->
				<RouterLink
					v-else
					to="/pos/menu"
					v-bind="analyticsAttrs('header:logo')"
					class="p-0 flex-0 btn btn-ghost nuxt-link-active w-full h-full"
					aria-label="Homepage"
				>
					<Logo
						v-bind:url="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
						v-bind:height="18"
						v-bind:width="88"
						v-bind:c_logo="'header-logo w-full h-full object-contain'"
					></Logo>
				</RouterLink>
			</div>
			<!-- User session and notifications section -->
			<div class="ml-auto mr-3" v-if="!appComponent.session.logueado">
				<ThemeButton class="hidden md:flex"/>
				<div class="flex-1"></div>
				<!-- Registration button for mobile view -->
				<RouterLink
					:to="config.menuMobile.urlRegistro"
					v-bind="analyticsAttrs('header:signup-btn')"
					class="btn btn-sm btn-success lg:hidden mr-2 text-neutral"
					aria-label="Homepage"
				>
					{{ $t('Regístrate') }}
				</RouterLink>
				<!-- Login button for mobile view -->
				<button
					aria-label="Login"
					class="btn btn-sm btn-primary lg:hidden text-neutral"
					v-bind="analyticsAttrs('header:login-btn')"
				>
					<label
						class=""
						for="m-modal-login"
						@click="appComponent.showModalLogin = true"
						>{{ $t('Entrar') }}</label
					>
				</button>
				<!-- Social networks icons section -->
				<div
					v-if="
						(config.header_ != undefined &&
						config.header_.social_networks != undefined
							? config.header_.social_networks
							: config.header.showRedes) &&
						config.SOCIAL_NEWTWORKS_HEADER != undefined &&
						config.SOCIAL_NEWTWORKS_HEADER[appComponent.country] !=
							undefined
					"
					class="items-center flex-none hidden lg:flex mr-2 text-xs"
				>
					<a
						:aria-label="value.SOCIAL_ICON"
						v-for="value in config.SOCIAL_NEWTWORKS_HEADER[
							appComponent.country
						]"
						:href="value.SOCIAL_URL"
						target="_blank"
						class="icons-social-header text-accent-focus"
					>
						<font-awesome-icon
							:icon="{
								prefix: 'fab',
								iconName: value.SOCIAL_ICON,
							}"
						/>
					</a>
				</div>
			</div>
			<!-- Ticker for logged-in users -->
			<div
				v-if="
					(config.header_ != undefined &&
					config.header_.top_band != undefined
						? config.header_.top_band
						: config.header.showTicker) &&
					appComponent.boxes.length > 0 &&
					appComponent.session.logueado
				"
				class="ticker-mobile items-baseline hidden md:block"
			>
				<div
					class="viewport"
					v-bind:class="{ moving: appComponent.moving }"
				>
					<div class="box" v-for="box in appComponent.boxes">
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
			<!-- User session details for logged-in users -->
			<div
				class="ml-auto h-full mx-1"
				v-if="appComponent.session.logueado"
			>
				<ThemeButton class="hidden md:flex"/>
				<ClockUser
					v-if="
						config.header_ != undefined &&
						config.header_.clock != undefined
							? config.header_.clock
							: config.header.clock
					"
				/>
				<!-- Notifications dropdown for logged-in users -->
				<div
					v-if="config.header.notifications"
					class="detail-notifications indicator mx-3"
				>
					<div class="dropdown dropdown-end">
						<a tabindex="0" class="text-2xl md:text-xl">
							<i class="fa fa-bell"></i>
							<small
								v-if="notificationsUnread > 0"
								style="transform: translate(-9px, 2px)"
								class="bg-red-500 border border-red-500 text-neutral inline-flex items-center rounded-lg px-1 h-4 font-bold text-xs absolute top-0 ltr:right-0 rtl:left-0 ring-2 ring-neutral dark:ring-gray-600 h-4"
								>{{ notificationsUnread }}</small
							>
						</a>
						<!-- Notifications detail dropdown -->
						<div
							class="detail-notifications-info absolute top-9 -left-20 sm:-left-3 overflow-hidden rounded-2xl w-80 dropdown-content shadow-md w-20"
							tabindex="0"
						>
							<div class="nav-open-view-contain">
								<div class="drop-nav-new-b">
									<div class="drop-items-contain-b">
										<ul
											class="bg-neutral text-neutral-content"
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
																	] == '') &&
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
													class="btn btn-xs bg-success text-neutral w-44 block mx-auto my-4 rounded-xl"
													v-link="{
														path:
															config.baseUrlFx +
															'/notificaciones',
													}"
													style="
														background: linear-gradient(
															0deg,
															rgba(0, 82, 6, 1) 0%,
															rgba(0, 173, 31, 1)
																100%
														);
													"
												>
													<span
														style="line-height: 2"
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
				<ButtonHeader />
				<DetailsUser />
				<!-- Messages indicator for mobile view -->
				<div
					v-if="!appComponent.appPOS"
					class="indicator md:hidden mx-3"
				>
					<div
						class="indicator-item badge badge-primary rounded-2xl text-neutral mt-1 bg-base-300"
					>
						{{ appComponent.mensajesUnread }}
					</div>
					<RouterLink  :to="'/mensajes'" v-bind="analyticsAttrs('header:inbox')">
                        <svg class="svg-inline--fa fa-envelope fa-2x text-3xl icon-envelope text-neutral" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path class="" fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z">
                            </path>
                        </svg>
					</RouterLink>
				</div>
				<!-- Loyalty points link for logged-in users -->
				<RouterLink
					class="lvl desktop mx-3 border-solid border-x-2 px-1 border-gray-300 hidden md:block"
					v-if="config.loyalty[appComponent.country]"
					:to="'/gestion/mi_lealtad'"
				>
					<span>Puntos: {{ appComponent.loyalty.points }}</span>
				</RouterLink>
				<!-- Country flag and name display -->
				<div
					class="flex items-center flex-none mr-2 ml-2 hidden md:block"
				>
					<span
						:class="'country-flags ' + appComponent.country"
					></span>
					<span class="text-neutral"
                    >{{ appComponent.session.pais_nom }}</span>
				</div>
				<!-- User balance components based on configuration -->
				<BalanceUser
					v-if="
						(config.header_ != undefined &&
						config.header_.balance_style != undefined
							? config.header_.balance_style == 1
							: config.header.styleBalance[
									appComponent.country
								] == 1) && !appComponent.appPOS
					"
				/>
				<BalanceUserV2
					v-if="
						(config.header_ != undefined &&
						config.header_.balance_style != undefined
							? config.header_.balance_style == 2
							: config.header.styleBalance[
									appComponent.country
								] == 2) && !appComponent.appPOS
					"
				/>
				<BalanceUserV3
					v-if="
						(config.header_ != undefined &&
						config.header_.balance_style != undefined
							? config.header_.balance_style == 3
							: config.header.styleBalance[
									appComponent.country
								] == 3) && !appComponent.appPOS
					"
				/>
				<!-- Logout button for mobile view -->
				<div
					class="exit md:hidden"
					id="cerrar_sesion"
					v-bind="analyticsAttrs('header:logout-btn')"
					@click="logOut()"
				>
					<font-awesome-icon
						size="2x"
						class="icon-sign-out leading-0 align-middle pl-2 text-neutral"
						icon="fa-solid fa-sign-out-alt"
					/>
				</div>
			</div>
			<!-- Language selection dropdown for desktop view -->
			<div
				class="items-center flex-none hidden lg:block"
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
							:class="'country-flags ' + appComponent.selectFlag"
						></span>
						<span>{{ appComponent.lngProd }}</span>
					</div>
					<!-- Language options dropdown -->
					<ul
						tabindex="0"
						class="p-2 menu dropdown-content bg-neutral rounded-box w-24 text-neutral-content shadow-lg shadow-neutral-content/50"
						v-if="openSelectLang"
					>
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
									:class="'country-flags ' + country.flag"
								></span
								>{{ country.name.toLocaleUpperCase() }}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
/* Social icons in the header with padding and font size */
.icons-social-header {
	padding: 3px !important;
	font-size: 2em;
}

/* Title styling for highlighted bonuses with animation */
.bono-destacado .title .spant {
	display: inline-block; /* Inline block for proper spacing */
	white-space: nowrap; /* Prevent text wrapping */
	animation: floatText 15s infinite linear; /* Continuous floating animation */
	padding-left: 100%; /* Initial padding for animation */
	padding-top: 1px; /* Top padding */
	font-size: 12px; /* Font size */
}

/* Pause animation on hover */
.bono-destacado .title .spant:hover {
	animation-play-state: paused; /* Pause animation on hover */
}

/* Class to display elements */
.open {
	display: inherit !important; /* Override display property */
}

/* Menu header positioning for version 2 */
.version2.menu-header-netabet {
	position: inherit; /* Inherit positioning */
}

/* Keyframes for mobile left movement animation */
@-webkit-keyframes moveLeftMobile {
	0% {
		-webkit-transform: translateX(0); /* Start position */
		transform: translateX(0);
	}
	100% {
		-webkit-transform: translateX(-100%); /* End position */
		transform: translateX(-100%);
	}
}

/* Keyframes for mobile left movement animation */
@keyframes moveLeftMobile {
	0% {
		-webkit-transform: translateX(0); /* Start position */
		transform: translateX(0);
	}
	100% {
		-webkit-transform: translateX(-100%); /* End position */
		transform: translateX(-100%);
	}
}

/* Media query for responsive header */
@media (max-width: 810px) {
	header {
		min-height: 42px; /* Minimum height for header */
	}
}

/* User components styling */
.usuario-componentes {
	position: absolute !important; /* Absolute positioning */
	width: 295px !important; /* Fixed width */
	right: 0px !important; /* Align to the right */
	margin-right: 15px !important; /* Right margin */
	text-align: right !important; /* Right text alignment */
	font-family: 'Roboto', sans-serif !important; /* Font family */
}

/* Language selection styling for logged-in users */
body.logueado select.select-language {
	height: auto; /* Automatic height */
	width: 41px; /* Fixed width */
	padding: 0; /* No padding */
	position: relative; /* Relative positioning */
	top: -2px; /* Slight upward adjustment */
}

/* Mobile ticker animation */
.ticker-mobile .viewport.moving {
	-webkit-animation: moveLeftMobile 1 3s linear; /* Animation for moving */
	animation: moveLeftMobile 1 3s linear; /* Animation for moving */
}

/* Ticker box styling */
.ticker-mobile .viewport .box {
	width: 600px; /* Fixed width */
	text-align: left; /* Left text alignment */
}

/* Progress container for highlighted bonuses */
.bono-destacado .progress-container {
	width: 100%; /* Full width */
}

/* Meter styling for progress bars */
.meter {
	box-sizing: content-box; /* Box sizing model */
	height: 10px; /* Fixed height */
	position: relative; /* Relative positioning */
	background: #ffffff; /* Background color */
	border-radius: 25px; /* Rounded corners */
	padding: 5px; /* Padding */
	box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3); /* Inner shadow */
}

/* Span inside meter for progress indication */
.meter > span {
	display: block; /* Block display */
	height: 100%; /* Full height */
	border-top-right-radius: 8px; /* Rounded corners */
	border-bottom-right-radius: 8px; /* Rounded corners */
	border-top-left-radius: 20px; /* Rounded corners */
	border-bottom-left-radius: 20px; /* Rounded corners */
	background-color: #2a8601; /* Background color */
	background-image: linear-gradient(
		center bottom,
		#2a8601,
		#2a8601
	); /* Gradient background */
	box-shadow:
		inset 0 2px 9px rgba(255, 255, 255, 0.3),
		/* Inner shadow */ inset 0 -2px 6px rgba(0, 0, 0, 0.4); /* Inner shadow */
	position: relative; /* Relative positioning */
	overflow: hidden; /* Hide overflow */
}

/* After pseudo-element for animated effect */
.meter > span:after,
.animate > span > span {
	content: ''; /* Empty content */
	position: absolute; /* Absolute positioning */
	top: 0; /* Align to top */
	left: 0; /* Align to left */
	bottom: 0; /* Align to bottom */
	right: 0; /* Align to right */
	background-image: linear-gradient(
		-45deg,
		rgba(255, 255, 255, 0.2) 25%,
		/* Gradient effect */ transparent 25%,
		transparent 50%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0.2) 75%,
		transparent 75%,
		transparent
	);
	background-size: 50px 50px; /* Background size for animation */
	animation: move 2s linear infinite; /* Continuous animation */
	border-top-right-radius: 8px; /* Rounded corners */
	border-bottom-right-radius: 8px; /* Rounded corners */
	border-top-left-radius: 20px; /* Rounded corners */
	border-bottom-left-radius: 20px; /* Rounded corners */
	overflow: hidden; /* Hide overflow */
}

/* Centering scroll on top */
.scroll-on-top-center {
	top: 38px; /* Vertical position */
}

/* Keyframes for background movement animation */
@keyframes move {
	0% {
		background-position: 0 0; /* Start position */
	}
	100% {
		background-position: 50px 50px; /* End position */
	}
}

/* Percentage display styling */
.porcent {
	position: inherit; /* Inherit positioning */
	left: 50%; /* Center horizontally */
	font-size: 12px; /* Font size */
	color: black; /* Text color */
	font-weight: bold; /* Bold text */
	top: -15px; /* Slight upward adjustment */
}

/* Icon button styling */
.mat-icon-button {
	color: black !important; /* Override color */
}

/* Styling for highlighted bonuses */
.bono-destacado {
	border-radius: 10px; /* Rounded corners */
	padding: 5px; /* Padding */
	margin: 4px 15px 0px 15px; /* Margin */
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
	); /* Gradient background */
	cursor: pointer; /* Pointer cursor on hover */
	height: 85px; /* Fixed height */
	width: 200px; /* Fixed width */
}

/* Scale effect on hover for highlighted bonuses */
.bono-destacado:hover {
	transform: scale(1.04); /* Slightly enlarge on hover */
}

/* Title styling */
.mytitle {
	display: block; /* Block display */
	text-align: center; /* Center text */
	line-height: 13px; /* Line height */
	color: black; /* Text color */
	font-weight: bold; /* Bold text */
	overflow: hidden; /* Hide overflow */
}

/* Secondary title styling */
.mytitle2 {
	display: block; /* Block display */
	text-align: center; /* Center text */
	line-height: 13px; /* Line height */
	color: black; /* Text color */
	overflow: hidden; /* Hide overflow */
}

/* Count display styling */
span.cant {
	display: block; /* Block display */
	border-radius: 15px; /* Rounded corners */
	text-align: center; /* Center text */
	background: white; /* Background color */
	color: black; /* Text color */
	font-weight: bold; /* Bold text */
	width: calc(100% - 50px); /* Responsive width */
	height: 20px; /* Fixed height */
	line-height: 20px; /* Line height */
	border-color: black; /* Border color */
}

/* Span styling with animation */
.spant {
	display: inline-block; /* Inline block for proper spacing */
	white-space: nowrap; /* Prevent text wrapping */
	animation: floatText 15s infinite linear; /* Continuous floating animation */
	padding-left: 100%; /* Initial padding for animation */
	padding-top: 1px; /* Top padding */
}
</style>

<!-- FILE DOCUMENTED -->
