<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import AppLogin from '@/components/auth/AppLogin.vue'; // Importing AppLogin component
import AppModal from '@/components/modals/Modal.vue'; // Importing generic modal component
import AppModalBannerInv from '@/components/modals/ModalBannersInv.vue'; // Importing banner invitation modal
import AppModalBannerInvV2 from '@/components/modals/ModalBannersInvV2.vue'; // Importing second version of banner invitation modal
import AppModalSMS from '@/components/modals/ModalSMS.vue'; // Importing SMS modal
import AppModalVoidWithdraw from '@/components/modals/ModalVoidWithdraw.vue'; // Importing void withdraw modal
import AppModalRaffles from '@/components/modals/ModalRaffles.vue'; // Importing raffles modal
import AppModalDeposit from '@/components/modals/ModalDeposit.vue'; // Importing deposit modal
import AppModalDeposit2 from '@/components/modals/ModalDepositv2.vue'; // Importing second version of deposit modal
import AppModalPromotionDeposit from '@/components/modals/ModalPromotionDeposit.vue'; // Importing promotion deposit modal
import AppModalPromotion from '@/components/modals/ModalPromotion.vue'; // Importing promotion modal
import AppModalAlert from '@/components/modals/ModalAlert.vue'; // Importing alert modal
import AppModalSplaft from '@/components/modals/ModalSplaft.vue'; // Importing splaft modal
import AppModalReset from '@/components/modals/ModalReset.vue'; // Importing reset modal
import AppModalData from '@/components/modals/ModalData.vue'; // Importing data modal
import AppModalBonus from '@/components/modals/ModalBonus.vue'; // Importing bonus modal
import AppModalConfirmEmail from '@/components/modals/ModalConfirmEmail.vue'; // Importing confirm email modal
import AppModalConfiguredMethod from '@/components/modals/ModalConfiguredMethod.vue'; // Importing configured method modal
import AppRoulette from '@/components/Roulette.vue'; // Importing roulette component
import ModalVerifyPhone from '@/components/modals/ModalVerifyPhone.vue'; // Importing verify phone modal
import ModalVerifyCodePhone from '@/components/modals/ModalVerifyCodePhone.vue'; // Importing verify code phone modal
import ModalSearchCodePhone from '@/components/modals/ModalSearchCodePhone.vue'; // Importing search code phone modal
import ModalNeedApproval from '@/components/modals/ModalNeedApproval.vue'; // Importing need approval modal
import ModalAddCard from '@/components/modals/ModalAddCard.vue'; // Importing add card modal
import ModalLogin3 from './components/modals/ModalLogin3.vue'; // Importing third version of login modal
import ModalGames from './components/modals/ModalGames.vue'; // Importing games modal
import JackpotWinner from './components/JackpotWinner.vue'; // Importing jackpot winner component
import router from '@/router'; // Importing router instance
import { useI18n } from 'vue-i18n'; // Importing useI18n for internationalization

export default defineComponent({
	components: {
		ModalAddCard, // Registering add card modal component
		AppModalBonus, // Registering bonus modal component
		AppModalPromotionDeposit, // Registering promotion deposit modal component
		AppLogin, // Registering login component
		AppModal, // Registering generic modal component
		AppModalBannerInv, // Registering banner invitation modal component
		AppModalBannerInvV2, // Registering second version of banner invitation modal component
		AppModalSMS, // Registering SMS modal component
		AppModalRaffles, // Registering raffles modal component
		AppModalDeposit, // Registering deposit modal component
		AppModalDeposit2, // Registering second version of deposit modal component
		AppModalPromotion, // Registering promotion modal component
		AppModalAlert, // Registering alert modal component
		AppModalSplaft, // Registering splaft modal component
		AppRoulette, // Registering roulette component
		AppModalData, // Registering data modal component
		AppModalConfirmEmail, // Registering confirm email modal component
		AppModalConfiguredMethod, // Registering configured method modal component
		AppModalReset, // Registering reset modal component
		ModalVerifyPhone, // Registering verify phone modal component
		ModalVerifyCodePhone, // Registering verify code phone modal component
		ModalSearchCodePhone, // Registering search code phone modal component
		ModalNeedApproval, // Registering need approval modal component
		ModalLogin3, // Registering third version of login modal component
		AppModalVoidWithdraw, // Registering void withdraw modal component
		ModalGames, // Registering games modal component
		JackpotWinner, // Registering jackpot winner component
	},
	data() {
		let config = this.$config(); // Retrieving configuration data
		let appComponent: any = this.$appComponent; // Retrieving application component data
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	mounted() {
		let { setLocaleMessage } = useI18n({ useScope: 'global' }); // Setting up internationalization
		var script = document.createElement('script'); // Creating a new script element
		script.async = true; // Setting script to load asynchronously
		script.src =
			'https://images.virtualsoft.tech/site/general/config_cwv2.js'; // Setting the source of the script
		script.addEventListener('load', (event) => {
			// Adding load event listener to the script
			if ((window as any).cconfig2 != undefined) {
				// Checking if cconfig2 is defined
				(window as any).cconfig = (window as any).cconfig2; // Assigning cconfig2 to cconfig
				let messages =
					(window as any).cconfig2['not_login'] != undefined &&
					(window as any).cconfig2['not_login'][
						(window as any).cconfig2.language.languageDafault
					] != undefined &&
					(window as any).cconfig['not_login'][
						(window as any).cconfig2.default_language != undefined
							? (window as any).cconfig2.default_language
							: (window as any).cconfig2.language.languageDafault
					]['translations'] != undefined
						? (window as any).cconfig2['not_login'][
								(window as any).cconfig2.default_language !=
								undefined
									? (window as any).cconfig2.default_language
									: (window as any).cconfig2.language
											.languageDafault
							]['translations']
						: (window as any).cconfig2['languagesData'][
								this.appComponent.country
							]; // Retrieving messages based on language and country
				setLocaleMessage('es', messages.es); // Setting Spanish locale messages
				setLocaleMessage('en', messages.en); // Setting English locale messages
				setLocaleMessage('pt', messages.pt); // Setting Portuguese locale messages
			}
		});
		document.head.appendChild(script); // Appending the script to the document head
	},
});
</script>
<template>
	<!-- Alert modal that displays if there are alerts -->
	<AppModalAlert
		v-if="appComponent.modalAlert.length > 0"
		:alerts="appComponent.modalAlert"
	/>
	<!-- Login modal displayed based on conditions -->
	<AppLogin
		v-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout !== 3
		"
	/>
	<!-- Alternative login modal for specific layout -->
	<ModalLogin3
		v-if="
			appComponent.showModalLogin == true &&
			appComponent.config.layout == 3
		"
	/>
	<!-- Generic modal for notifications -->
	<AppModal
		v-if="appComponent.modal.showModal == 'notification'"
		:title="appComponent.modal.titleModal"
		:message="appComponent.modal.messageModal"
		:button="appComponent.modal.buttonModal"
	/>
	<!-- Banner invitation modal -->
	<AppModalBannerInv
		v-if="appComponent.modal.showModal == 'banner'"
		:message="appComponent.modal.messageModal"
	/>
	<!-- Second version of banner invitation modal -->
	<AppModalBannerInvV2
		v-if="appComponent.modal.showModal == 'bannerInvV2'"
		:data="appComponent.modal.messageModal"
	/>
	<!-- SMS modal -->
	<AppModalSMS
		v-if="appComponent.modal.showModal == 'sms'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Raffles modal -->
	<AppModalRaffles
		v-if="appComponent.modal.showModal == 'raffles'"
		:data="appComponent.modal.messageModal"
	/>
	<!-- Deposit modal -->
	<AppModalDeposit
		v-if="appComponent.modal.showModal == 'deposit'"
		:data="appComponent.modal.messageModal"
	/>
	<!-- Bonus modal -->
	<AppModalBonus
		v-if="appComponent.modal.showModal == 'bonus'"
		:data="appComponent.modal.messageModal"
	/>
	<!-- Promotion deposit modal -->
	<AppModalPromotionDeposit
		v-if="appComponent.modal.showModal == 'promotiondeposit'"
		:data="appComponent.modal.messageModal"
	/>
	<!-- Second version of deposit modal -->
	<AppModalDeposit2 v-if="appComponent.showModalDepositV2" />
	<!-- Splaft modal -->
	<AppModalSplaft v-if="appComponent.modal.showModal == 'splaft'" />
	<!-- Reset modal -->
	<AppModalReset v-if="appComponent.modal.showModal == 'reset'" />
	<!-- Promotion modal -->
	<AppModalPromotion
		v-if="appComponent.modal.showModal == 'promotion'"
		:promotion="appComponent.promotionModal"
	/>
	<!-- Data modal -->
	<AppModalData
		v-if="appComponent.modal.showModal == 'data'"
		:infoModal="appComponent.infoModal"
	/>
	<!-- Confirm email modal -->
	<AppModalConfirmEmail
		v-if="appComponent.modal.showModal == 'modalConfirmEmail'"
	/>
	<!-- Configured method modal -->
	<AppModalConfiguredMethod
		v-if="appComponent.modal.showModal == 'modalConfiguredMethod'"
		:data="appComponent.modal.configuredMethod"
	/>
	<!-- Void withdraw modal -->
	<AppModalVoidWithdraw v-if="appComponent.showModalCancelWithdraw" />
	<!-- Roulette component -->
	<AppRoulette v-if="appComponent.roulette.Id != null" />
	<!-- Verify phone modal -->
	<ModalVerifyPhone
		v-if="appComponent.modal.showModal == 'verifyPhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Verify code phone modal -->
	<ModalVerifyCodePhone
		v-if="appComponent.modal.showModal == 'verifyCodePhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Search code phone modal -->
	<ModalSearchCodePhone
		v-if="appComponent.modal.showModal == 'searchCodePhone'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Need approval modal -->
	<ModalNeedApproval
		v-if="appComponent.modal.showModal == 'needApproval'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Add card modal -->
	<ModalAddCard
		v-if="appComponent.modal.showModal == 'addCard'"
		:dataInfo="appComponent.modal.messageModal"
	/>
	<!-- Games modal -->
	<ModalGames v-if="appComponent.showGame" />
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
</template>

<!-- FILE DOCUMENTED -->
