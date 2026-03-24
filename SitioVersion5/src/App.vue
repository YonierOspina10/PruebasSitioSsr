<script lang="ts">
// This script block is written in TypeScript for type safety and enhanced development experience.

import AppLayout1 from '@/layout/layout_1.vue'; // Importing layout component 1
import AppLayout2 from '@/layout/layout_2.vue'; // Importing layout component 2
import AppLayout3 from '@/layout/layout_3.vue'; // Importing layout component 3
import AppLayout4 from '@/layout/layout_4.vue'; // Importing layout component 4
import AppLayout5 from '@/layout/layout_5.vue'; // Importing layout component 5
import AppLayout6 from '@/layout/layout_6.vue'; // Importing layout component 6
import AppLayout7 from '@/layout/layout_7.vue'; // Importing layout component 7
import AppLayout8 from '@/layout/layout_8.vue'; // Importing layout component 8
import AppLogin from '@/components/auth/AppLogin.vue'; // Importing authentication login component
import AppModal from '@/components/modals/Modal.vue'; // Importing generic modal component
import AppModalProgrammable from '@/components/modals/ModalProgrammable.vue'; // Importing programmable modal component
import AppModalThankYou from '@/components/modals/ModalThankYou.vue'; // Importing thank you modal component
import AppModalBannerInv from '@/components/modals/ModalBannersInv.vue'; // Importing banner invitation modal component
import AppModalBannerInvV2 from '@/components/modals/ModalBannersInvV2.vue'; // Importing version 2 of banner invitation modal
import AppModalSMS from '@/components/modals/ModalSMS.vue'; // Importing SMS modal component
import AppModalVoidWithdraw from '@/components/modals/ModalVoidWithdraw.vue'; // Importing void withdraw modal component
import AppModalRaffles from '@/components/modals/ModalRaffles.vue'; // Importing raffles modal component
import AppModalDeposit from '@/components/modals/ModalDeposit.vue'; // Importing deposit modal component
import AppModalDeposit2 from '@/components/modals/ModalDepositv2.vue'; // Importing version 2 of deposit modal
import AppModalDepositV3 from '@/components/modals/ModalDepositV3.vue'; // Importing version 3 of deposit modal
import AppModalPromotionDeposit from '@/components/modals/ModalPromotionDeposit.vue'; // Importing promotion deposit modal component
import AppModalReferralsAwards from '@/components/modals/ModalReferralsAwards.vue'; // Importing referrals awards modal component
import AppModalPromotion from '@/components/modals/ModalPromotion.vue'; // Importing promotion modal component
import AppModalMessage from '@/components/modals/ModalMessage.vue'; // Importing message modal component
import AppModalAlert from '@/components/modals/ModalAlert.vue'; // Importing alert modal component
import AppModalSplaft from '@/components/modals/ModalSplaft.vue'; // Importing splaft modal component
import AppModalReset from '@/components/modals/ModalReset.vue'; // Importing reset modal component
import AppModalData from '@/components/modals/ModalData.vue'; // Importing data modal component
import AppModalBonus from '@/components/modals/ModalBonus.vue'; // Importing bonus modal component
import AppLoadingCustom from '@/components/LoadingCustom.vue'; // Importing custom loading component
import AppModalDocument from '@/components/modals/ModalDocument.vue'; // Importing document modal component
import AppModalConfirmEmail from '@/components/modals/ModalConfirmEmail.vue'; // Importing confirm email modal component
import AppModalConfiguredMethod from '@/components/modals/ModalConfiguredMethod.vue'; // Importing configured method modal component
import AppModalRegister from '@/components/modals/ModalRegister.vue'; // Importing registration modal component
import AppRoulette from '@/components/Roulette.vue'; // Importing roulette component
import { useCookies } from 'vue3-cookies'; // Importing cookies management from vue3-cookies
import { defineComponent, watch } from 'vue'; // Importing Vue's defineComponent and watch functions
import axios from 'axios'; // Importing axios for HTTP requests
import { useI18n } from 'vue-i18n'; // Importing i18n for internationalization
import apiService from '@/services/ApiService'; // Importing API service for backend communication
import ModalVerifyPhone from '@/components/modals/ModalVerifyPhone.vue'; // Importing phone verification modal component
import ModalVerifyCodePhone from '@/components/modals/ModalVerifyCodePhone.vue'; // Importing phone code verification modal component
import ModalSearchCodePhone from '@/components/modals/ModalSearchCodePhone.vue'; // Importing search code phone modal component
import ModalNeedApproval from '@/components/modals/ModalNeedApproval.vue'; // Importing need approval modal component
import ModalAddCard from '@/components/modals/ModalAddCard.vue'; // Importing add card modal component
import ModalAddCard3Ds from '@/components/modals/ModalAddCard3Ds.vue'; // Importing 3D secure add card modal component
import ModalLogin3 from './components/modals/ModalLogin3.vue'; // Importing login modal version 3
import ModalLoginV3 from './components/modals/ModalLoginV3.vue'; // Importing login modal version 3
import ModalLogin4 from './components/modals/ModalLogin4.vue'; // Importing login modal version 4
import ModalLogin6 from './components/modals/ModalLogin6.vue'; // Importing login modal version 6
import ModalLogin6V2 from './components/modals/ModalLogin6V2.vue'; // Importing login modal version 6
import ModalLogin7 from './components/modals/ModalLogin7.vue'; // Importing login modal version 7
import ModalGames from './components/modals/ModalGames.vue'; // Importing games modal component
import ModalGamesV1 from './components/modals/ModalGamesV1.vue'; // Importing games modal component
import JackpotWinner from './components/JackpotWinner.vue'; // Importing jackpot winner component
import ModalVerifyAccount from '@/components/modals/ModalVerifyAccount.vue'; // Importing account verification modal component
import { apm } from '@elastic/apm-rum'; // Importing Elastic APM for performance monitoring
import { initializeApp } from 'firebase/app'; // Importing Firebase app initialization
import { getMessaging, getToken, onMessage } from 'firebase/messaging'; // Importing Firebase messaging functions
import ModalPayphoneDeposit from '@/components/modals/ModalPayphoneDeposit.vue'; // Importing payphone deposit modal component
import ModalVisaDeposit from '@/components/modals/ModalVisaDeposit.vue'; // Importing Visa deposit modal component
declare var optimoveSDK: any; // Declaring external optimoveSDK variable
import 'swiper/css'; // Importing Swiper CSS for carousel functionality
import ModalUpdateData from '@/components/modals/ModalUpdateData.vue'; // Importing update data modal component
import ModalGenericForm from '@/components/modals/ModalGenericForm.vue'; // Importing generic form modal component
import ModalCambioMoneda from '@/components/modals/ModalCambioMoneda.vue'; // Importing currency change modal component
import ModalTransferencia from '@/components/modals/ModalTransferencia.vue'; // Importing transfer modal component
import { Button } from 'flowbite-vue'; // Importing Button component from Flowbite Vue
import ModalUpdatePassword from '@/components/modals/ModalUpdatePassword.vue'; // Importing update password modal component
import LandingChangePassword from '@/views/Help/LandingChangePassword.vue'; // Importing landing page for change password
import Modal3 from '@/components/modals/Modal3.vue'; // Importing modal version 3
import Modal3Image from '@/components/modals/Modal3Image.vue'; // Importing modal version 3 with image
import LandingVerifyAccount from '@/views/Help/LandingVerifyAccount.vue'; // Importing landing page for account verification
import LandingLogin from '@/views/POS/login/LandingLogin.vue'; // Importing landing page for login
import ModalVisaNetDeposit from '@/components/modals/ModalVisaNetDeposit.vue'; // Importing Visa Net deposit modal component
import ModalJackpotInformation from '@/components/modals/JackpotInformationModal.vue'; // Importing jackpot information modal component
import ModalTerracall from './components/modals/ModalTerracall.vue'; // Importing Terracall modal component
import ModalTigoMoney from './components/modals/ModalTigoMoney.vue'; // Importing Tigo Money modal component
import ModalPlux from './components/modals/ModalPlux.vue'; // Importing Plux modal component
import Modal2FA from '@/components/modals/Modal2FA.vue';
import PopUpAction from './components/PopUpAction.vue';
import NotificationGameModal from '@/components/widgetsComponents/NotificationGameModal.vue';
import OpenGameModal from '@/components/widgetsComponents/OpenGameModal.vue';

/**
 * Requests permission for notifications and initializes Firebase messaging.
 * If granted, it retrieves the current token for messaging.
 */
async function requestNotificationPermission() {
	const permission = await Notification.requestPermission(); // Requesting notification permission
	if (permission === 'granted') {
		// If permission is granted
		const app = initializeApp(
			(window as any).cconfig.firebaseConfig[
				(window as any).cconfig.countryL
			]
		); // Initializing Firebase app with configuration
		const messaging = getMessaging(); // Getting messaging instance
		onMessage(messaging, (payload) => {}); // Setting up message listener
		getToken(messaging, {
			// Retrieving the current token
			vapidKey:
				'BDLHxzAOMGFC7pSneiBk3qBWpDwn7nZ2GQnXuHBmnju_wKhAwoTsoQqUkPD3O2ziUkV-lO2iS2nMtgD2sy7arlc',
		})
			.then((currentToken) => {
				// Handling the token retrieval
				if (currentToken) {
					// If a token is available
					(window as any).apt = currentToken; // Storing the token
				} else {
					console.log(
						'No registration token available. Request permission to generate one.'
					); // Logging if no token is available
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token. ', err); // Logging errors during token retrieval
			});
	}
}

// Checking if notification push is enabled in configuration
if (
	(window as any).cconfig.general_ != undefined &&
	(window as any).cconfig.general_.notificationPush != undefined &&
	(window as any).cconfig.general_.notificationPush != undefined
		? (window as any).cconfig.general_.notificationPush
		: (window as any).cconfig.notificationPush != undefined &&
			(window as any).cconfig.notificationPush &&
			(window as any).cconfig.firebaseConfig[
				(window as any).cconfig.countryL
			] != undefined
) {
	if ('serviceWorker' in navigator) {
		// Checking if service workers are supported
		navigator.serviceWorker
			.register('/firebase-messaging-sw.js') // Registering the service worker for Firebase messaging
			.then((registration) => {}) // Handling successful registration
			.catch((error) => {}); // Handling registration errors
	}
	requestNotificationPermission(); // Requesting notification permission
}

if (
    ((window as any).cordova_iab !== undefined &&
        (window as any).apt == undefined &&
        (window as any).versionApp == undefined &&
        (window as any).cconfig.versionApp !== undefined) ||
    ((window as any).versionApp != undefined &&
        (window as any).cconfig.versionApp != undefined &&
        (window as any).versionApp !=
        (window as any).cconfig.versionApp)
) {

    if (
        (window as any).cconfig.countryL != undefined &&
        (window as any).cconfig.countryL == 'pe'
    ) {
        (window as any).appDoradoPeruR = true;
    }

}

export default defineComponent({
	components: {
        OpenGameModal,
        NotificationGameModal,
		/**
		 * ModalJackpotInformation - Component for displaying jackpot information in a modal.
		 */
		ModalJackpotInformation,

		/**
		 * ModalVisaNetDeposit - Component for handling VisaNet deposit transactions in a modal.
		 */
		ModalVisaNetDeposit,

		/**
		 * ModalLogin6 - Login modal component, version 6.
		 */
		ModalLogin6,

    /**
     * ModalLogin6V2 - Login modal component, version 6.
     */
    ModalLogin6V2,

		/**
		 * AppModalThankYou - Modal component to display a thank you message.
		 */
		AppModalThankYou,

		/**
		 * LandingVerifyAccount - Component for account verification on the landing page.
		 */
		LandingVerifyAccount,

		/**
		 * Modal3Image - Modal component that displays three images.
		 */
		Modal3Image,

		/**
		 * Modal3 - General modal component, version 3.
		 */
		Modal3,

		/**
		 * ModalUpdatePassword - Modal for updating user password.
		 */
		ModalUpdatePassword,

		/**
		 * Button - Reusable button component.
		 */
		Button,

		/**
		 * ModalTransferencia - Modal for handling transfer transactions.
		 */
		ModalTransferencia,

		/**
		 * ModalCambioMoneda - Modal for currency exchange operations.
		 */
		ModalCambioMoneda,

		/**
		 * ModalUpdateData - Modal for updating user data.
		 */
		ModalUpdateData,

		/**
		 * ModalGenericForm - Generic form modal for various inputs.
		 */
		ModalGenericForm,

		/**
		 * AppModalRegister - Modal component for user registration.
		 */
		AppModalRegister,

		/**
		 * ModalAddCard - Modal for adding a new card.
		 */
		ModalAddCard,

		/**
		 * ModalAddCard3Ds - Modal for adding a 3D secure card.
		 */
		ModalAddCard3Ds,

		/**
		 * PopUpAction - Modal accion.
		 */
		PopUpAction,

		/**
		 * AppLoadingCustom - Custom loading component for the application.
		 */
		AppLoadingCustom,

		/**
		 * AppLayout1 - Layout component version 1.
		 */
		AppLayout1,

		/**
		 * AppLayout2 - Layout component version 2.
		 */
		AppLayout2,

		/**
		 * AppLayout3 - Layout component version 3.
		 */
		AppLayout3,

		/**
		 * AppLayout4 - Layout component version 4.
		 */
		AppLayout4,

		/**
		 * AppLayout5 - Layout component version 5.
		 */
		AppLayout5,

		/**
		 * AppLayout6 - Layout component version 6.
		 */
		AppLayout6,

		/**
		 * AppLayout7 - Layout component version 7.
		 */
		AppLayout7,

		/**
		 * AppLayout8 - Layout component version 8.
		 */
		AppLayout8,

		/**
		 * AppModalBonus - Modal for displaying bonus information.
		 */
		AppModalBonus,

		/**
		 * AppModalPromotionDeposit - Modal for promotional deposit offers.
		 */
		AppModalPromotionDeposit,

		/**
		 * AppLogin - Login component for the application.
		 */
		AppLogin,

		/**
		 * AppModalProgrammable - Modal for programmable features.
		 */
		AppModalProgrammable,

		/**
		 * AppModal - General modal component.
		 */
		AppModal,

		/**
		 * AppModalDocument - Modal for document uploads or displays.
		 */
		AppModalDocument,

		/**
		 * AppModalBannerInv - Modal for displaying investment banners.
		 */
		AppModalBannerInv,

		/**
		 * AppModalBannerInvV2 - Version 2 of the investment banner modal.
		 */
		AppModalBannerInvV2,

		/**
		 * AppModalSMS - Modal for handling SMS notifications.
		 */
		AppModalSMS,

		/**
		 * AppModalRaffles - Modal for displaying raffle information.
		 */
		AppModalRaffles,

		/**
		 * AppModalDeposit - Modal for deposit transactions.
		 */
		AppModalDeposit,

		/**
		 * AppModalDeposit2 - Version 2 of the deposit modal.
		 */
		AppModalDeposit2,

		/**
		 * AppModalDepositV3 - Version 3 of the deposit modal.
		 */
		AppModalDepositV3,

		/**
		 * AppModalMessage - Modal for displaying messages to the user.
		 */
		AppModalMessage,

		/**
		 * AppModalPromotion - Modal for promotional offers.
		 */
		AppModalPromotion,

		/**
		 * AppModalAlert - Modal for alert notifications.
		 */
		AppModalAlert,

		/**
		 * AppModalSplaft - Modal for displaying splaft-related content.
		 */
		AppModalSplaft,

		/**
		 * AppRoulette - Component for the roulette game.
		 */
		AppRoulette,

		/**
		 * AppModalData - Modal for displaying data-related information.
		 */
		AppModalData,

		/**
		 * AppModalConfirmEmail - Modal for confirming user email addresses.
		 */
		AppModalConfirmEmail,

		/**
		 * AppModalConfiguredMethod - Modal for displaying configured payment methods.
		 */
		AppModalConfiguredMethod,

		/**
		 * AppModalReset - Modal for resetting user settings or data.
		 */
		AppModalReset,

		/**
		 * ModalVerifyPhone - Modal for phone verification.
		 */
		ModalVerifyPhone,

		/**
		 * ModalVerifyCodePhone - Modal for verifying phone codes.
		 */
		ModalVerifyCodePhone,

		/**
		 * ModalSearchCodePhone - Modal for searching phone codes.
		 */
		ModalSearchCodePhone,

		/**
		 * ModalNeedApproval - Modal indicating that approval is needed for an action.
		 */
		ModalNeedApproval,

		/**
		 * ModalLogin3 - Login modal component, version 3.
		 */
		ModalLogin3,/**

		 * ModalLoginV3 - Login modal component, version 3.
		 */
        ModalLoginV3,

		/**
		 * ModalLogin4 - Login modal component, version 4.
		 */
		ModalLogin4,

		/**
		 * ModalLogin7 - Login modal component, version 7.
		 */
		ModalLogin7,

		/**
		 * AppModalVoidWithdraw - Modal for voiding withdrawal transactions.
		 */
		AppModalVoidWithdraw,

		/**
		 * ModalGames - Modal for displaying available games.
		 */
		ModalGames,

    /**
     * ModalGamesV1 - Modal for displaying available games.
     */
    ModalGamesV1,

		/**
		 * JackpotWinner - Component for displaying jackpot winners.
		 */
		JackpotWinner,

		/**
		 * AppModalReferralsAwards - Modal for displaying referral awards.
		 */
		AppModalReferralsAwards,

		/**
		 * LandingChangePassword - Component for changing user password on the landing page.
		 */
		LandingChangePassword,

		/**
		 * LandingLogin - Component for login functionality on the landing page.
		 */
		LandingLogin,

		/**
		 * ModalVerifyAccount - Modal for verifying user accounts.
		 */
		ModalVerifyAccount,

		/**
		 * ModalPayphoneDeposit - Modal for handling payphone deposit transactions.
		 */
		ModalPayphoneDeposit,

		/**
		 * ModalPayphoneDeposit - Modal for handling payphone deposit transactions.
		 */
		ModalTerracall,

		/**
		 * ModalVisaDeposit - Modal for handling Visa deposit transactions.
		 */
		ModalVisaDeposit,
		
		/**
		 * ModalTigoMoney - Modal for handling Tigo Money deposit transactions.
		 */
		ModalTigoMoney,

		/**
		 * ModalPlux - Modal for handling Plux deposit transactions.
		 */
		ModalPlux,

        /**
         * Modal2FA - Modal for handling two authenticaion factor.
         */
        Modal2FA
	},
	data() {
		/**
		 * Retrieves the configuration object for the application.
		 * @type {Object}
		 */
		let config = this.$config();
		let modalQueue: any[] = []; // lista de modales activos
		let currentModal: any = null; // modal actual mostrado
		/**
		 * Reference to the main application component.
		 * @type {any}
		 */
		let appComponent: any = this.$appComponent;

		/**
		 * Event emitter for handling events within the application.
		 * @type {Function}
		 */
		let emitter = this.$emitter();

		/**
		 * Variable to hold text data.
		 * @type {any}
		 */
		let myText: any = '';

		/**
		 * Reference to the APM (Application Performance Monitoring) object.
		 * @type {any}
		 */
		let $apm = apm;

		/**
		 * Variable to hold a span element or null.
		 * @type {any}
		 */
		let span: any = null;

		/**
		 * Flag to determine whether to show cookies consent.
		 * @type {boolean}
		 */
		let showCookies = false;

		/**
		 * Conditional routing based on the presence of certain window properties.
		 */
		if (
			((window as any).cordova_iab !== undefined &&
				(window as any).apt == undefined &&
				(window as any).versionApp == undefined &&
				(window as any).cconfig.versionApp !== undefined) ||
			((window as any).versionApp != undefined &&
				(window as any).cconfig.versionApp != undefined &&
				(window as any).versionApp !=
					(window as any).cconfig.versionApp)
		) {
			/**
			 * Redirects to the landing page if the partner configuration is valid.
			 */
			if (
				(window as any).cconfig.partner != undefined &&
				(window as any).cconfig.partner != 0
			) {
				this.$router.push('/landing/app');
			}

            if (
                (window as any).cconfig.countryL != undefined &&
                (window as any).cconfig.countryL == 'pe'
            ) {
                (window as any).appDoradoPeruR = true;
            }

		} else if (
			(window as any).cordova_iab !== undefined &&
			(window as any).POS != undefined
		) {
			/**
			 * Redirects to the POS menu if the POS property is defined.
			 */
			this.$router.push('/pos/menu');
		}

		/**
		 * Returns the data properties for the component.
		 * @returns {Object} The data object containing configuration, components, and other properties.
		 */
		return {
			config,
			appComponent,
			emitter,
			myText,
			span,
			$apm,
			showCookies,
			modalQueue,
			currentModal,
			/**
			 * List of social networks with their respective properties.
			 * @type {Array<Object>}
			 */
			networks: [
				{
					network: 'email',
					name: 'Email',
					icon: 'far fah fa-lg fa-envelope',
					color: '#333333',
				},
				{
					network: 'facebook',
					name: 'Facebook',
					icon: 'fab fah fa-lg fa-facebook-f',
					color: '#1877f2',
				},
				{
					network: 'messenger',
					name: 'Messenger',
					icon: 'fab fah fa-lg fa-facebook-messenger',
					color: '#0084ff',
				},
				{
					network: 'pinterest',
					name: 'Pinterest',
					icon: 'fab fah fa-lg fa-pinterest',
					color: '#bd081c',
				},
				{
					network: 'sms',
					name: 'SMS',
					icon: 'far fah fa-lg fa-comment-dots',
					color: '#333333',
				},
				{
					network: 'telegram',
					name: 'Telegram',
					icon: 'fab fah fa-lg fa-telegram-plane',
					color: '#0088cc',
				},
				{
					network: 'twitter',
					name: 'Twitter',
					icon: 'fab fah fa-lg fa-twitter',
					color: '#1da1f2',
				},
				{
					network: 'whatsapp',
					name: 'Whatsapp',
					icon: 'fab fah fa-lg fa-whatsapp',
					color: '#25d366',
				},
			],
		};
	},
	/**
	 * Vue.js setup function for component initialization.
	 *
	 * @returns {Object} An object containing the cookies object for use in the component.
	 */
	setup() {
		// Destructure the cookies object from the useCookies() composable.
		const { cookies } = useCookies();

		// Return the cookies object to make it available in the component's template and other functions.
		return {
			cookies,
		};
	},
  computed: {
    useNewGameModal(): boolean {
      return this.config?.modalGameVersion === 1;
    }
  },
  methods: {
selectModal(actionModal: string) {
    if (!actionModal) return;

    const modals = this.appComponent?.config?.ModalTemplates;
    if (!Array.isArray(modals)) return;

    const modal = modals.find(m => m.actionModal === actionModal);

    if (!modal || modal.state !== true) {
        return;
    }

    // 3️⃣ Mostrar exactamente ese modal
    this.currentModal = modal;
}

		,
		loadModals() {
			const modals = this.appComponent?.config?.ModalTemplates;

			if (!modals || !Array.isArray(modals)) return;

			// filtramos solo modales activos
			this.modalQueue = modals.filter(m => m.state === true);

			// si hay elementos, mostramos el primero
			if (this.modalQueue.length > 0) {
				this.currentModal = this.modalQueue[0];
			}
		},

		nextModal() {
			// quitar el primero de la cola
			this.modalQueue.shift();

			if (this.modalQueue.length > 0) {
				this.currentModal = this.modalQueue[0];
			} else {
				this.currentModal = null;
			}
		},
		/**
		 * Sets a cookie with the specified name and value,
		 * and an expiration date of 100 years from now.
		 *
		 * @param {string} name - The name of the cookie.
		 * @param {string} value - The value of the cookie.
		 */
		setCookie(name, value) {
			const date = new Date();
			date.setFullYear(date.getFullYear() + 100);
			document.cookie =
				name + '=' + value + ';path=/;expires=' + date.toUTCString();
		},
		/**
		 * Accepts cookies by setting a specific cookie
		 * and hiding the cookie consent banner.
		 */
		acepptCookies() {
			this.setCookie('cookies-user', 'true');
			this.showCookies = false;
			console.log(this.cookies.get('cookies-user'));
		},
		/**
		 * Declines cookies and hides the cookie consent banner.
		 */
		declineCookies() {
			this.showCookies = false;
		},
		/**
		 * Scrolls to the top of the page or a specific element
		 * based on the user's authentication status and current view.
		 */
		scrollTo() {
			this.$nextTick(() => {
				// Check if the user is authenticated
				if (
					this.appComponent.tokenUser == '' ||
					this.appComponent.tokenUser == null ||
					this.appComponent.tokenUser == undefined
				) {
					this.appComponent.loadView = true;
				}
				if (this.appComponent.loadView) {
					const scroll: any = document.getElementById('main-layout');
					// Scroll to the top of the 'main-layout' element if it exists
					if (scroll != undefined) {
						scroll.scrollTo(0, 0);
					}
					// Scroll to the top of the window if the current route is not one of the specified paths
					if (
						this.$route.path.indexOf('new-casino') == -1 &&
						this.$route.path.indexOf('live-casino-vivo') == -1 &&
						this.$route.path.indexOf('virtuales-lobby') == -1 &&
						this.$route.path.indexOf('bingos') == -1
					) {
						window.scrollTo(0, 0);
					}
					// Adjust styles for specific views
					if (
						this.appComponent.viewActual == '/banner-rightnl' ||
						this.appComponent.viewActual == '/banner-leftnl' ||
						this.appComponent.viewActual == '/banner-right' ||
						this.appComponent.viewActual == '/banner-left' ||
						this.appComponent.viewActual == '/banner-rightnl' ||
						this.appComponent.viewActual == '/banner-leftnl' ||
						this.appComponent.viewActual == '/banner-topcenternl' ||
						this.appComponent.viewActual == '/banner-topcenter'
					) {
						(
							document.getElementsByClassName(
								'main-container'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty('height', '100%', 'important');
						(
							document.getElementsByClassName(
								'main-container'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty('margin-top', '0', 'important');
						(
							document.getElementsByClassName(
								'main-container'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty(
							'border-top',
							'none',
							'important'
						);
						(
							document.getElementsByClassName(
								'main-container'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty('padding', '0', 'important');
						(
							document.getElementsByClassName(
								'main-container'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty('rounded', '0', 'important');
						(
							document.getElementsByClassName(
								'main-layout'
							) as HTMLCollectionOf<HTMLElement>
						)[0].style.setProperty(
							'overflow',
							'hidden',
							'important'
						);
					}
				}
			});
		},
	},
	created() {
		// Check if the global POS object is defined and assign it to appPOS
		if ((window as any).POS != undefined) {
			this.appComponent.appPOS = (window as any).POS;
		}
		// Validate the existence of apt and versionApp, and check partner configuration
		if (
			(window as any).apt != undefined &&
			(window as any).apt != '' &&
			(window as any).versionApp != undefined &&
			(window as any).apt != ''
		) {
			if (
				this.appComponent.config != undefined &&
				this.appComponent.config.partner != undefined &&
				this.appComponent.config.partner == '8'
			) {
				// Trigger Google Analytics event for app start
				this.appComponent.gAnalytics('inicio_app');
			}
		}
		// Start a performance monitoring span
		this.span = this.$apm.startSpan('create-mount-duration', 'custom');
		// Watch for changes in the route
		this.$watch(
			() => this.$route,
			(toParams) => {
				// Update the current view based on the route
				this.appComponent.viewActual = toParams.path;
				try {
					// Redirect to change password landing if conditions are met
					if (
						this.appComponent.session.logueado &&
						this.appComponent.session.update_password &&
						this.config.landingChangePassword != undefined
					) {
						this.$router.push('/landing/cambiar-clave');
					} else if (
						this.appComponent.session.logueado &&
						this.appComponent.session.update_password
					) {
						this.$router.push('/gestion/cambiar-clave');
					}
				} catch (e) {
					// Log any errors encountered during redirection
					console.log(e);
				}
				try {
					// Check if optimoveSDK is available and set page visit
					if (
						(window as any).optimoveSDK != undefined &&
						(window as any).optimoveSDK.API != undefined
					) {
						if (this.appComponent.session.logueado) {
							(window as any).optimoveSDK.API.setPageVisit(
								toParams.path,
								'web',
								'general',
								this.appComponent.session.usuario
							);
						} else {
							(window as any).optimoveSDK.API.setPageVisit(
								toParams.path,
								'web',
								'general'
							);
						}
					}
				} catch (e) {
					// Log any errors encountered during optimoveSDK operations
					console.log(e);
				}
				// Scroll to the top of the page
				this.scrollTo();
				// Parse query string parameters from the URL
				let queryString = window.location.search;
				let urlParams = new URLSearchParams(queryString);
				// Handle 'frm' parameter
				if (urlParams.has('frm')) {
					this.appComponent.frm = urlParams.get('frm');
					this.$router.push({
						path: toParams.path,
						params: { frm: null },
					});
				}
				// Handle 'tt' parameter for user token
				if (urlParams.has('tt')) {
					this.appComponent.tokenUser = urlParams.get('tt');
					window.localStorage.setItem(
						'auth_token',
						this.appComponent.tokenUser
					);
					this.$router.push({
						path: toParams.path,
						params: { tt: null },
					});
				}
				// Handle 'cidd' parameter
				if (urlParams.has('cidd')) {
					(window as any).cidd = urlParams.get('cidd');
				}
				// Handle 'btag' parameter for affiliate tracking
				if (urlParams.has('btag')) {
					let btag: any = urlParams.get('btag');
					if (this.cookies.get('btag') != btag) {
						const apiClient = axios.create({
							baseURL: this.config.urlAffiliatesApi,
							headers: {
								'Content-Type':
									'application/x-www-form-urlencoded; charset=UTF-8',
								Bt: btag,
							},
						});
						apiClient.get('/stst').then((response: any) => {
							this.cookies.set('btag', btag, {
								expires: '7d',
								sameSite: 'None',
							});
						});
					}
					this.cookies.set('btag', btag, {
						expires: '7d',
						sameSite: 'None',
					});
					this.$router.push({
						path: toParams.path,
						params: { btag: null },
					});
				}
				// Handle 'trackerId' parameter
				if (urlParams.has('trackerId')) {
					let trackerId: any = urlParams.get('trackerId');
					if (this.cookies.get('trackerId') != trackerId) {
						this.cookies.set('trackerId', trackerId);
					}
					this.$router.push({
						path: toParams.path,
						params: { trackerId: null },
					});
				}
				// Handle 'rfdo' parameter for referral tracking
				if (urlParams.has('rfdo')) {
					let rfdo: any = urlParams.get('rfdo');
					if (this.cookies.get('rfdo') != rfdo) {
						this.cookies.set('rfdo', rfdo);
						let param = {
							ReferentLink: rfdo,
						};
						apiService
							.request('mark_referent_invitation', param)
							.then((response: any) => {
								if (response.code == 0) {
									console.log('user referral');
								}
							});
					}
					this.$router.push({
						path: toParams.path,
						params: { rfdo: null },
					});
				}
				// Redirect to new casino if on home view
				if (this.appComponent.config.name == 'Acropolis') {
					if (
						this.appComponent.viewActual.includes('home') ||
						this.appComponent.viewActual == '/' ||
						this.appComponent.viewActual == ''
					) {
						this.$router.push('/new-casino');
					}
				}
				// Check if user is logged in and manage wallet view
				if (this.appComponent.session.logueado) {
					if (
						this.appComponent.config.wallets != undefined &&
						this.appComponent.config.wallets.length > 1
					) {
						if (this.appComponent.viewActual !== '/wallet') {
							if (
								this.appComponent.session.wallet === '' ||
								this.appComponent.session.wallet ===
									undefined ||
								this.appComponent.session.wallet === null
							) {
								this.$router.push('/wallet');
							}
						}
					}
				}
			}
		);
		// Watch for changes in the logged-in session state
		this.$watch(
			() => this.appComponent.session.logueado,
			() => {
				if (this.appComponent.session.logueado) {
					// Update FCM token if it has changed
					if (
						(window as any).apt != undefined &&
						this.appComponent.tokenFCM != (window as any).apt
					) {
						let currentToken = (window as any).apt;
						apiService.request('update_token_fcm', {
							tokenFCM: currentToken,
						});
					}
				}
			}
		);
		// Set the selected flag from cookies if available
		if (this.cookies.get('fla') != undefined) {
			this.appComponent.selectFlag = this.cookies.get('fla');
		}
		// Set the product language from cookies if available
		if (this.cookies.get('lng') != undefined) {
			this.appComponent.lngProd = this.cookies.get('lng');
			this.$i18n.locale = this.appComponent.lngProd;
		}
		// Manage modal login display based on configuration
		if (this.config.timeModalLogin != undefined) {
			let count = 0;
			let time = setInterval(() => {
				if (this.appComponent.session.logueado) {
					clearInterval(time);
				} else {
					count++;
					// Show modal login after a specified time if conditions are met
					if (
						count >= this.config.timeModalLogin &&
						this.appComponent.viewActual != '/banner-right' &&
						this.appComponent.viewActual != '/banner-left' &&
						this.appComponent.viewActual != '/banner-rightnl' &&
						this.appComponent.viewActual != '/banner-leftnl' &&
						this.appComponent.viewActual != '/banner-topcenternl' &&
						this.appComponent.viewActual != '/banner-topcenter' &&
						this.appComponent.viewActual.indexOf(
							'/landing/registro-corto'
						) == -1 &&
						this.appComponent.viewActual.indexOf('/registro') == -1
					) {
						this.appComponent.showModalLogin = true;
						clearInterval(time);
					}
				}
			}, 1000);
		}
	},
	mounted() {
		    let isFirstRouteEvent = true;

		window.addEventListener("SHOW_LOGIN_MODAL", (e: any) => {
			this.selectModal(e.detail);
		});
this.$watch(
        () => this.$route.path,
        () => {

            // ✅ Navegaciones reales
            window.dispatchEvent(
                new CustomEvent("ROUTE_CHANGED")
            );
        }
    );
		// Watch for changes in the countryL configuration and log the new and old values
		watch(this.config.countryL, (newVal, oldVal) => {
			console.log(newVal, oldVal);
		});

		// End the span if it exists
		this.span && this.span.end();

		// Destructure setLocaleMessage from useI18n with global scope
		let { setLocaleMessage } = useI18n({ useScope: 'global' });

		// Loop to check for cconfig2 and set messages accordingly
		for (var i = 0; i < 100000; i++) {
			if ((window as any).cconfig2 != undefined) {
				// Assign cconfig2 to cconfig
				(window as any).cconfig = (window as any).cconfig2;
				i = 100000; // Exit loop

				// Retrieve messages based on the default language or fallback to languageDefault
				let messages =
					(window as any).cconfig2['not_login'] != undefined &&
					(window as any).cconfig2['not_login'][
						(window as any).cconfig2.default_language != undefined
							? (window as any).cconfig2.default_language
							: (window as any).cconfig2.language.languageDafault
					] != undefined &&
					(window as any).cconfig2['not_login'][
						(window as any).cconfig2.default_language != undefined
							? (window as any).cconfig2.default_language
							: (window as any).cconfig2.language.languageDafault
					]['translations'] != undefined
						? {
								es: (window as any).cconfig2['not_login']['es'][
									'translations'
								],
								en: (window as any).cconfig2['not_login']['en'][
									'translations'
								],
								pt: (window as any).cconfig2['not_login']['pt'][
									'translations'
								],
                                tr: (window as any).cconfig2['not_login']['tr'] !== undefined && (window as any).cconfig2['not_login']['tr']['translations'] !== undefined ? (window as any).cconfig2['not_login']['tr']['translations'] : {},
							}
						: (window as any).cconfig2['languagesData'][
								(window as any).cconfig2.countryL
							];

				// Set locale messages for different languages
				setLocaleMessage('es', messages.es);
				setLocaleMessage('en', messages.en);
				setLocaleMessage('pt', messages.pt);
				setLocaleMessage('tr', messages.pt);
			}
		}

		// Check if cookies should be shown based on configuration and cookie value
		if (
			this.config.showCookies != undefined &&
			this.config.showCookies[this.appComponent.country] != undefined &&
			this.cookies.get('cookies-user') !== 'true'
		) {
			this.showCookies = true; // Show cookies if conditions are met
		} else {
			console.log(this.cookies.get('cookies-user')); // Log cookie value
		}

        // Construct loading text with images for preloader
		if (this.config.preloader.preloader && this.config.preloader.logoPreloader) {
			this.myText =
				" <img  src='" +
				this.config.preloader.preloader +
				"' alt='Loading...' style='position: absolute; left: calc(50% - 125px); top: calc(50vh - 125px); width: 250px;'> <div style='display:flex; justify-content:center; align-items:center; position: absolute;width: 78px; height: 78px; left: calc(50% - 38px);top: calc(50vh - 38px);'><img  src='" +
				this.config.preloader.logoPreloader +
				"' alt='Loading...' style='with:100%; height: 100%; object-fit: contain;'></div>";
		} else if (this.config.preloader.preloader) {
			this.myText =
				" <img  src='" +
				this.config.preloader.preloader +
				"' alt='Loading...' style='position: absolute; left: calc(50% - 125px); top: calc(50vh - 125px); width: 250px;'>";
		} else if (this.config.preloader.logoPreloader) {
			this.myText =
				" <div style='display:flex; justify-content:center; align-items:center; position: absolute;width: 78px; height: 78px; left: calc(50% - 38px);top: calc(50vh - 38px);'><img  src='" +
				this.config.preloader.logoPreloader +
				"' alt='Loading...' style='with:100%; height: 100%; object-fit: contain;'></div>";
		}
        // Event listener for loading view
        this.emitter.on('loadView', (item) => {
			this.appComponent.loadView = true; // Set loadView to true
            // Retrieve messages based on the current language
			let messages =
				this.config != undefined &&
				this.config['not_login'] != undefined &&
				this.config['not_login'][this.appComponent.lngProd] !=
					undefined &&
				this.config['not_login'][this.appComponent.lngProd][
					'translations'
				] != undefined
					? {
							es: this.config['not_login']['es']['translations'],
							en: this.config['not_login']['en']['translations'],
							pt: this.config['not_login']['pt']['translations'],
							tr: this.config['not_login']['tr'] !== undefined && this.config['not_login']['tr']['translations'] !== undefined ? this.config['not_login']['tr']['translations'] : {},
						}
					: this.config.languagesData[item.country];

			// Set locale messages for different languages
			setLocaleMessage('es', messages.es);
			setLocaleMessage('en', messages.en);
			setLocaleMessage('pt', messages.pt);
			setLocaleMessage('tr', messages.tr);
			this.$i18n.locale = this.appComponent.lngProd; // Update locale
		});

		// Event listener for language change
		this.emitter.on('changeLanguage', (item) => {
			this.appComponent.gAnalytics('language_selector', item.langKey); // Track language selection
			this.appComponent.selectFlag = item.flag; // Set selected flag
			this.appComponent.lngProd = item.langKey; // Update current language
			this.cookies.set('lng', item.langKey); // Store language in cookies
			this.cookies.set('fla', item.flag); // Store flag in cookies

			// Set culture based on selected language
			if ((window as any).altenarWSDK && typeof (window as any).altenarWSDK.set === 'function') {
				switch (item.langKey) {
					case 'es':
						(window as any).altenarWSDK.set({ culture: 'es-ES' });
						break;
					case 'en':
						(window as any).altenarWSDK.set({ culture: 'en-GB' });
						break;
					case 'pt':
						(window as any).altenarWSDK.set({ culture: 'pt-BR' });
						break;
					case 'tr':
						(window as any).altenarWSDK.set({ culture: 'tr-TR' });
						break;
					default:
						(window as any).altenarWSDK.set({
							culture: this.appComponent.config.altenar2[this.appComponent.country].culture,
						});
						break;
				}
			}

			const vthis = this; // Preserve context

			// If the user is logged in, request language change
			if (this.appComponent.session.logueado) {
				if (item.langKey != this.appComponent.lngProd || true) {
					const params = {
						lang: item.langKey,
					};
					apiService.request('change_lang', params).then(function (
						response: any
					) {
						if (response.code != 0) {
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = vthis.$t(
									'ERROR' + response.error_code.toString()
								);
							}
							if (error_mensaje == '') {
								error_mensaje = vthis.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
								);
							}
							// Show error modal if there is an error
							vthis.appComponent.modal = {
								showModal: 'notification',
								titleModal: vthis.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: vthis.$t('Aceptar'),
								orderModal: 'closeModal',
							};
						}
					});
				}
			}
			this.$i18n.locale = item.langKey; // Update locale
		});
	},
}); // Exporting the component definition (Placeholder for actual script content)
</script>
<template>
	<!-- Fullscreen loader displayed while the view is loading -->
	<div
		v-if="!appComponent.loadView"
		class="z-[9999999999]"
		:class="
			config.preloader != undefined &&
			config.preloader.style != undefined &&
			config.preloader.style == 3
				? 'bg-black/80'
				: 'bg-black'
		"
		style="position: absolute; width: 100%; height: 100%"
	>
		<div
			class="relative text-center h-[100%] w-[100%] z-[100] ng-isolate-scope"
			id="loader"
		>
			<div class="vertical-centered-box" style="height: 100%">
				<!-- Custom loading component if preloader style is defined and not equal to 1 -->
				<AppLoadingCustom
					v-if="
						config.preloader != undefined &&
						config.preloader.style != undefined &&
						config.preloader.style != '' &&
						config.preloader.style != 1
					"
				/>
				<!-- HTML content for loading text if preloader style is not defined or equal to 1 -->
				<div
					v-else
					v-html="myText"
					class="content"
					style="height: 100%"
				></div>
			</div>
		</div>
	</div>
	<PopUpAction v-if="currentModal" :modal="currentModal" @close="currentModal = null" />
	<!-- Login component for POS users who are not logged in -->
	<LandingLogin
		v-if="!appComponent.session.logueado && appComponent.appPOS"
	/>

	<!-- Modal for verifying user account -->
	<ModalVerifyAccount
		v-if="
			appComponent.session.user_verification &&
			config != undefined &&
			config.modalVerifyAccount != undefined &&
			config.modalVerifyAccount[appComponent.country] != undefined &&
			config.modalVerifyAccount[appComponent.country].active !=
				undefined &&
			config.modalVerifyAccount[appComponent.country].active == true &&
			!appComponent.infoApp
		"
	/>

	<!-- Landing page for account verification -->
	<LandingVerifyAccount
		v-if="
			appComponent.session.user_verification &&
			config != undefined &&
			config.landingVerifyAccount != undefined &&
			config.landingVerifyAccount[appComponent.country] != undefined &&
			config.landingVerifyAccount[appComponent.country].active !=
				undefined &&
			config.landingVerifyAccount[appComponent.country].active == true
		"
	/>

	<!-- Component for changing password -->
	<LandingChangePassword v-if="appComponent.update_password" />

	<!-- Alert modal component -->
	<AppModalAlert
		v-if="appComponent.modalAlert.length > 0"
		:alerts="appComponent.modalAlert"
	/>

	<!-- Layout components based on configuration -->
	<AppLayout1
		v-if="
			(appComponent.config.layout == undefined ||
				appComponent.config.layout == 1 ||
				appComponent.config.layout == '') &&
			appComponent.loadView
		"
	/>
	<AppLayout2
		v-if="appComponent.config.layout == 2 && appComponent.loadView"
	/>
	<AppLayout3
		v-if="appComponent.config.layout == 3 && appComponent.loadView"
	/>
	<AppLayout4
		v-if="appComponent.config.layout == 4 && appComponent.loadView"
	/>
	<AppLayout5
		v-if="appComponent.config.layout == 5 && appComponent.loadView"
	/>
	<AppLayout6
		v-if="appComponent.config.layout == 6 && appComponent.loadView"
	/>
	<AppLayout7
		v-if="appComponent.config.layout == 7 && appComponent.loadView"
	/>
	<AppLayout8
		v-if="appComponent.config.layout == 8 && appComponent.loadView"
	/>

	<!-- Login modal components based on configuration -->
	<AppLogin
		v-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout !== 3 &&
			appComponent.config.layout !== 5 &&
			appComponent.config.layout !== 6 &&
			appComponent.config.layout !== 8
		"
	/>
	<ModalLogin3
		v-else-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout == 3 &&
			appComponent.config.modalLoginVersion === undefined
		"
	/>
    <ModalLoginV3
        v-else-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout == 3 &&
			appComponent.config.modalLoginVersion === 1
		"
    />
	<ModalLogin4
		v-else-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout == 5
		"
	/>
  <ModalLogin6
      v-else-if="
    appComponent.showModalLogin &&
    (appComponent.config.layout == 3 || appComponent.config.layout == 6) &&
    (appComponent.config.modalLoginVersion === undefined ||
     appComponent.config.modalLoginVersion === 2)
  "
  />
  <ModalLogin6V2
      v-else-if="
    appComponent.showModalLogin &&
    (appComponent.config.layout == 3 || appComponent.config.layout == 6) &&
    appComponent.config.modalLoginVersion === 3
  "
  />
	<ModalLogin7
		v-else-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout == 8
		"
	/>

	<!-- Modal for user registration -->
	<AppModalRegister v-if="appComponent.modal.showModal == 'register'" />

	<!-- General notification modal component -->
	<AppModal
		v-if="appComponent.modal.showModal == 'notification'"
		:title="appComponent.modal.titleModal"
		:message="appComponent.modal.messageModal"
		:button="appComponent.modal.buttonModal"
		:button2="appComponent.modal.buttonModal2"
		:link2="appComponent.modal.link2"
		:button-x="appComponent.modal.buttonX"
		:innerHtml="appComponent.modal.innerHtmlModal"
	/>

	<!-- Thank you modal component for deposits -->
	<AppModalThankYou
		v-if="appComponent.modal.showModal == 'thankYouDeposit'"
	/>

	<!-- Banner modal component -->
	<AppModalBannerInv
		v-if="appComponent.modal.showModal == 'banner'"
		:message="appComponent.modal.messageModal"
	/>

	<!-- Version 2 of the banner modal component -->
	<AppModalBannerInvV2
		v-if="appComponent.modal.showModal == 'bannerInvV2'"
		:data="appComponent.modal.messageModal"
	/>

	<!-- SMS modal component -->
	<AppModalSMS
		v-if="appComponent.modal.showModal == 'sms'"
		:dataInfo="appComponent.modal.messageModal"
	/>

	<!-- Raffles modal component -->
	<AppModalRaffles
		v-if="appComponent.modal.showModal == 'raffles'"
		:data="appComponent.modal.messageModal"
	/>

	<!-- Deposit modal component -->
	<AppModalDeposit
		v-if="appComponent.modal.showModal == 'deposit'"
		:data="appComponent.modal.messageModal"
	/>

	<!-- Bonus modal component -->
	<AppModalBonus
		v-if="appComponent.modal.showModal == 'bonus' || appComponent.showMainModalBonus"
		:data="appComponent.modal.messageModal"
	/>

	<!-- Document modal component -->
	<AppModalDocument
		v-if="appComponent.modal.showModal == 'document'"
		:data="appComponent.modal.messageModal"
	/>

	<!-- Promotional deposit modal component -->
	<AppModalPromotionDeposit
		v-if="appComponent.modal.showModal == 'promotiondeposit'"
		:data="appComponent.modal.messageModal"
	/>

	<!-- Version 2 of the deposit modal component -->
	<AppModalDeposit2 v-if="appComponent.showModalDepositV2 && appComponent.session.logueado" />

	<!-- Version 3 of the deposit modal component -->
	<AppModalDepositV3 v-if="appComponent.showModalDepositV3 && appComponent.session.logueado" />

	<!-- Referrals awards modal component -->
	<AppModalReferralsAwards
		:data-b="appComponent.modal.configuredMethod"
		v-if="appComponent.showModalReferralAwards"
	/>

	<!-- Splaft modal component -->
	<AppModalSplaft v-if="appComponent.modal.showModal == 'splaft'" />

	<!-- Reset modal component -->
	<AppModalReset v-if="appComponent.modal.showModal == 'reset'" />

	<!-- Promotion modal component -->
	<AppModalPromotion
		v-if="appComponent.modal.showModal == 'promotion'"
		:promotion="appComponent.promotionModal"
	/>

	<!-- Message modal component -->
	<AppModalMessage v-if="appComponent.modal.showModal == 'message'" />

	<!-- Data modal component -->
	<AppModalData
		v-if="appComponent.modal.showModal == 'data'"
		:infoModal="appComponent.infoModal"
	/>

	<!-- Email confirmation modal component -->
	<AppModalConfirmEmail
		v-if="appComponent.modal.showModal == 'modalConfirmEmail'"
	/>

	<!-- Configured method modal component -->
	<AppModalConfiguredMethod
		v-if="appComponent.modal.showModal == 'modalConfiguredMethod'"
		:data="appComponent.modal.configuredMethod"
	/>

	<!-- Void withdraw modal component -->
	<AppModalVoidWithdraw v-if="appComponent.showModalCancelWithdraw" />

	<!-- Roulette game component -->
	<AppRoulette v-if="appComponent.roulette.Id != null" />

	<!-- Phone verification modal component -->
	<ModalVerifyPhone
		v-if="appComponent.modal.showModal == 'verifyPhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>

    <Modal2FA
        v-if="appComponent.switch2FA"
        :isOpen="appComponent.switch2FA"
    />

	<!-- Phone code verification modal component -->
	<ModalVerifyCodePhone
		v-if="appComponent.modal.showModal == 'verifyCodePhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>

	<!-- Phone code search modal component -->
	<ModalSearchCodePhone
		v-if="appComponent.modal.showModal == 'searchCodePhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>

	<!-- Update data modal component -->
	<ModalUpdateData v-if="appComponent.modal.showModal == 'updateData'" />

	<!-- Need approval modal component -->
	<ModalNeedApproval
		v-if="appComponent.modal.showModal == 'needApproval'"
		:dataInfo="appComponent.modal.messageModal"
	/>

	<!-- Generic form modal component -->
	<ModalGenericForm
		v-if="
			appComponent.modal.showModal == 'genericForm' &&
			config != undefined &&
			config.form != undefined &&
			config.form[appComponent['titleModalGenericForm']]
		"
	/>

	<!-- Add card modal component -->
	<ModalAddCard
		v-if="appComponent.modal.showModal == 'addCard'"
		:dataInfo="appComponent.modal.messageModal"
	/>

	<!-- 3D secure add card modal component -->
	<ModalAddCard3Ds
		v-if="appComponent.modal.showModal == 'addCard3Ds'"
		:dataInfo="appComponent.modal.messageModal"
	/>

    <!-- Games modal component -->
    <ModalGamesV1 v-if="appComponent.showGame && useNewGameModal" />

    <OpenGameModal v-else-if="appComponent.showGame && appComponent.config.modalGameVersion === 2" />

    <ModalGames v-else-if="appComponent.showGame" />

    <NotificationGameModal v-if="appComponent.config.notificationGameModal !== undefined && appComponent.config.notificationGameModal.on" />

    <!-- Currency exchange modal component -->
	<ModalCambioMoneda v-if="appComponent.modalCurrencyExchange" />

	<!-- Transfer modal component -->
	<ModalTransferencia v-if="appComponent.modalTransferencia" />

	<!-- Jackpot winner component -->
	<JackpotWinner
		v-if="
			appComponent.config.jackpot !== undefined &&
			appComponent.config.jackpot[appComponent.country] !== undefined &&
			appComponent.config.jackpot[appComponent.country] &&
			appComponent.loyalty_price != undefined &&
			appComponent.loyalty_price.id != undefined &&
			appComponent.loyalty_price.id != null
		"
	/>

	<!-- Modal component for displaying three images -->
	<Modal3Image v-if="appComponent.showModal3Image" />

	<!-- General modal component, version 3 -->
	<Modal3 v-if="appComponent.showModal3" />

	<!-- Update password email modal component -->
	<ModalUpdatePassword
		v-if="appComponent.modal.showModal == 'updatePasswordEmail'"
	/>

	<!-- Social sharing link component -->
	<div
		id="sharingLinkParent"
		v-if="
			appComponent.sharing != undefined && appComponent.sharing.url != ''
		"
	>
		<div id="sharingLink-title">Compartelo en tu red social</div>
		<div id="sharingLink">
			<ShareNetwork
				v-for="network in networks"
				:network="network.network"
				:key="network.network"
				:style="{ backgroundColor: network.color }"
				:url="appComponent.sharing.url"
				:title="appComponent.sharing.title"
				:description="appComponent.sharing.description"
				:quote="appComponent.sharing.quote"
				:hashtags="appComponent.sharing.hashtags"
				:twitterUser="appComponent.sharing.twitterUser"
			>
				<i :class="network.icon"></i>
			</ShareNetwork>
		</div>
	</div>

	<!-- Cookies consent modal component -->
	<div
		v-if="showCookies == true"
		class="cookies-modal bg-gradient-to-b from-gray-800 to-black rounded-t-2xl grid grid-cols-1 md:grid-cols-3 gap-2 p-1 h-auto fixed w-full left-0 bottom-0 mb-16 lg:mb-0 z-[9999999999]"
	>
		<div class="text-cookies flex items-center justify-center">
			<p class="text-xl m-0">{{ $t('Cookies') }}</p>
		</div>
		<div class="description-cookies flex items-center justify-center">
			<p class="m-0 px-3 text-center">
				{{
					$t(
						'Al aceptar los cookies, permitirá mejorar su experiencia en nuestro sitio.'
					)
				}}
			</p>
		</div>
		<div class="button-cookies flex items-center justify-center">
			<button class="text-gray-400" @click="declineCookies">
				{{ $t('Rechazar cookies') }}
			</button>
			<button
				class="text-white font-bold ml-8 bg-primary-content p-2 rounded-2xl"
				@click="acepptCookies"
			>
				{{ $t('Aceptar cookies') }}
			</button>
		</div>
	</div>

	<!-- Payphone deposit modal component -->
	<ModalPayphoneDeposit v-if="appComponent.modalPayphoneDeposit" />

	<!-- Payphone deposit modal component -->
	<ModalTerracall v-if="appComponent.modalTerracall" />

	<!-- Tigo Money deposit modal component -->
	<ModalTigoMoney v-if="appComponent.modalTigoMoney" />

	<!-- Plux deposit modal component -->
	<ModalPlux v-if="appComponent.modalPlux != ''" />

	<!-- Visa deposit modal component -->
	<ModalVisaDeposit v-if="appComponent.modalVisaDeposit" />

	<!-- VisaNet deposit modal component -->
	<ModalVisaNetDeposit v-if="appComponent.modalVisaNetDeposit" />

	<!-- Jackpot information modal component -->
	<ModalJackpotInformation v-if="appComponent.JackpotInformation !== ''" />
</template>
<style scoped>
/* Scoped styles ensure that these styles apply only to this component, preventing global style leakage. */
</style>

<!-- FILE DOCUMENTED -->
