<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { useRoute } from 'vue-router'; // Importing useRoute for accessing route information
import { ref } from 'vue'; // Importing ref for creating reactive references
import CollapsibleCards from '@/components/CollapsibleCards.vue'; // Importing CollapsibleCards component

export default defineComponent({
	components: { CollapsibleCards }, // Registering CollapsibleCards component
	data: function () {
		let config = this.$config(); // Retrieving configuration object
		let appComponent: any = this.$appComponent; // Accessing application component
		let title: string = ''; // Initializing title variable
		let TERMINOSYCONDICIONES: any = []; // Initializing array for terms and conditions
		return {
			config,
			appComponent,
			title,
			TERMINOSYCONDICIONES,
		};
	},
	created() {
		this.$watch(
			() => this.$route.params, // Watching for changes in route parameters
			(toParams) => {
				this.sectionId = toParams.sectionId; // Setting sectionId from route parameters
				let objConfig = ''; // Initializing configuration object variable
				let objConfig2 = ''; // Initializing secondary configuration object variable
				this.path = this.$route.path
					.replace(/^\/[a-z]{2}\//, '/') // Cleaning up the path to remove language code
					.split('/')[1]; // Getting the relevant part of the path
				if (this.path.indexOf('terminosycondiciones') != -1) {
					// Checking for terms and conditions in path
					this.title = this.$t('Términos y Condiciones'); // Setting title for terms and conditions
					objConfig = 'termsandcondition'; // Setting configuration key for terms and conditions
					objConfig2 = 'termns_and_conditions'; // Setting secondary configuration key
				} else {
					if (this.path.indexOf('preguntasfrecuentes') != -1) {
						// Checking for frequently asked questions
						this.title = this.$t('Preguntas frecuentes'); // Setting title for FAQs
						objConfig = 'faq'; // Setting configuration key for FAQs
						objConfig2 = 'faq'; // Setting secondary configuration key
					} else {
						if (this.path.indexOf('juego-responsable') != -1) {
							// Checking for responsible gaming
							this.title = this.$t('Juego responsable'); // Setting title for responsible gaming
							objConfig = 'responsiblegaming'; // Setting configuration key for responsible gaming
							objConfig2 = 'responsible_gaming'; // Setting secondary configuration key
						} else {
							if (
								this.path.indexOf('politica-de-privacidad') !=
								-1
							) {
								// Checking for privacy policy
								this.title = this.$t('Politica de Privacidad'); // Setting title for privacy policy
								objConfig = 'privacypolicy'; // Setting configuration key for privacy policy
								objConfig2 = 'privacy_policies'; // Setting secondary configuration key
							}
						}
					}
				}
				if (
					this.config != undefined && // Checking if config is defined
					this.config['not_login'] != undefined && // Checking if 'not_login' is defined in config
					this.config['not_login'][this.appComponent.lngProd] !=
						undefined && // Checking if language production is defined
					this.config['not_login'][this.appComponent.lngProd][
						objConfig2
					] != undefined // Checking if secondary config key is defined
				) {
					this.TERMINOSYCONDICIONES =
						this.config['not_login'][this.appComponent.lngProd][
							objConfig2
						]; // Setting terms and conditions from config
				} else {
					if (
						this.config != undefined && // Checking if config is defined
						this.config[objConfig] != undefined && // Checking if primary config key is defined
						this.config[objConfig][this.appComponent.country] !=
							undefined && // Checking if country-specific config is defined
						this.config[objConfig][this.appComponent.country][
							this.appComponent.lngProd
						] != undefined // Checking if language production is defined
					) {
						this.TERMINOSYCONDICIONES =
							this.config[objConfig][this.appComponent.country][
								this.appComponent.lngProd
							]; // Setting terms and conditions from country-specific config
					}
				}
			}
		);
	},
	setup() {
		const route = useRoute(); // Accessing the current route
		let sectionId: any = ref(route.params.sectionId); // Creating a reactive reference for sectionId
		let path: any = ref(route)
			.value.path.replace(/^\/[a-z]{2}\//, '/') // Cleaning up the path to remove language code
			.split('/')[1]; // Getting the relevant part of the path
		return {
			sectionId,
			path,
		};
	},
	mounted() {
		let objConfig = ''; // Initializing configuration object variable
		let objConfig2 = ''; // Initializing secondary configuration object variable
		if (this.path.indexOf('terminosycondiciones') != -1) {
			// Checking for terms and conditions in path
			this.title = this.$t('Términos y Condiciones'); // Setting title for terms and conditions
			objConfig = 'termsandcondition'; // Setting configuration key for terms and conditions
			objConfig2 = 'termns_and_conditions'; // Setting secondary configuration key
		} else {
			if (this.path.indexOf('preguntasfrecuentes') != -1) {
				// Checking for frequently asked questions
				this.title = this.$t('Preguntas frecuentes'); // Setting title for FAQs
				objConfig = 'faq'; // Setting configuration key for FAQs
				objConfig2 = 'faq'; // Setting secondary configuration key
			} else {
				if (this.path.indexOf('juego-responsable') != -1) {
					// Checking for responsible gaming
					this.title = this.$t('Juego responsable'); // Setting title for responsible gaming
					objConfig = 'responsiblegaming'; // Setting configuration key for responsible gaming
					objConfig2 = 'responsible_gaming'; // Setting secondary configuration key
				} else {
					if (this.path.indexOf('politica-de-privacidad') != -1) {
						// Checking for privacy policy
						this.title = this.$t('Politica de Privacidad'); // Setting title for privacy policy
						objConfig = 'privacypolicy'; // Setting configuration key for privacy policy
						objConfig2 = 'privacy_policies'; // Setting secondary configuration key
					}
				}
			}
		}
		if (
			this.config != undefined && // Checking if config is defined
			this.config['not_login'] != undefined && // Checking if 'not_login' is defined in config
			this.config['not_login'][this.appComponent.lngProd] != undefined && // Checking if language production is defined
			this.config['not_login'][this.appComponent.lngProd][objConfig2] !=
				undefined // Checking if secondary config key is defined
		) {
			this.TERMINOSYCONDICIONES =
				this.config['not_login'][this.appComponent.lngProd][objConfig2]; // Setting terms and conditions from config
		} else {
			if (
				this.config != undefined && // Checking if config is defined
				this.config[objConfig] != undefined && // Checking if primary config key is defined
				this.config[objConfig][this.appComponent.country] !=
					undefined && // Checking if country-specific config is defined
				this.config[objConfig][this.appComponent.country][
					this.appComponent.lngProd
				] != undefined // Checking if language production is defined
			) {
				this.TERMINOSYCONDICIONES =
					this.config[objConfig][this.appComponent.country][
						this.appComponent.lngProd
					]; // Setting terms and conditions from country-specific config
			}
		}
	},
});
</script>
<template>
	<!-- Header section for the layout, conditionally rendered based on config.layout -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full"
		:class="TERMINOSYCONDICIONES.length > 0 ? 'h-[65px]' : 'h-full'"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div class="Framework InfoPage">
		<!-- Active page title container -->
		<div
			class="Container ActivePageTitle"
			:class="
				config.layout != undefined && config.layout == 3
					? 'my-5 pb-5 border-b-2 border-solid border-primary'
					: 'ActivePageTitle2'
			"
		>
			<span class="h1">
				<span
                    class="font-bold text-3xl text-neutral"

					>{{ $t(title) }}</span
				>
			</span>
		</div>
		<!-- CollapsibleCards component displaying terms and conditions -->
		<CollapsibleCards :data="TERMINOSYCONDICIONES" />
	</div>
</template>
<style scoped>
/* Background color for a specific class */
.bg2 {
	background-color: #b4b4b4; /* Light gray background color */
}
</style>

<!-- FILE DOCUMENTED -->
