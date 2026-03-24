<template>
	<!-- Main section that displays the casino providers if there is no contingency -->
	<section
		v-if="!appComponent.contingencyCasino"
		class="w-full h-full flex justify-center items-center pt-2 pb-4"
	>
		<!-- Article container for the provider navigation -->
		<article
			class="w-11/12 max-w-[1300px] h-full flex justify-center items-center"
		>
			<!-- Navigation for selecting providers -->
			<nav class="w-full h-full flex gap-2 overflow-x-auto z-20">
				<!-- Button for selecting 'all' providers -->
				<button
					@click="
						onProvider({ id: 'all', name: 'all', image: '' });
						othersProviders = false;
					"
					class="relative rounded-lg p-2 w-full max-w-[9.4rem] hover:bg-secondary hover:text-neutral hover:font-bold capitalize cursor-pointer mb-2"
					:class="
						storeCasinoLobby.provider === '' ||
						storeCasinoLobby.provider === 'all' ||
						othersProviders
							? 'bg-secondary text-base-100 blob font-bold'
							: 'text-neutral bg-neutral-content'
					"
                    v-bind="analyticsAttrs.filterAll"
				>
					<!-- Conditional rendering of provider icon -->
					<div
						v-if="
							appComponent.config.iconProviders !== undefined &&
							appComponent.config.iconProviders[
								appComponent.country
							] !== undefined &&
							appComponent.config.iconProviders[
								appComponent.country
							]
						"
                        class="w-[65px] h-[28px] mx-auto mb-1 tablet:w-[80px] tablet:h-[35px]"
					>
						<img
							:src="
								appComponent.selections.providerImage == ''
									? appComponent.config.iconAllProviders !==
											undefined &&
										appComponent.config.iconAllProviders[
											appComponent.country
										] !== undefined &&
										appComponent.config.iconAllProviders[
											appComponent.country
										] !== ''
										? appComponent.config.iconAllProviders[
												appComponent.country
											]
										: 'https://images.virtualsoft.tech/m/msj0212T1716844653.png'
									: appComponent.selections.providerImage
							"
							class="w-full h-full object-contain"
							alt=""
						/>
					</div>
					<!-- Button label for 'all' providers -->
					<span
						class="rounded-lg py-2 px-4 w-full hover:blob hover:text-neutral font-bold capitalize flex justify-center items-center text-lg"
						:class="storeCasinoLobby.provider === '' 
								? 'bg-base-300 text-secondary'
								: 'text-neutral bg-base-300'
						"
					>

						{{
							!othersProviders
								? $t('Todos los proveedores')
								: $t(storeCasinoLobby.provider)
						}}
					</span>
					<!-- Button for showing other providers -->
					<button
						v-if="othersProviders"
						class="absolute top-0 right-0 mx-auto"
						@click="storeCasinoLobby.provider = ''"
					>
						<svg
							:width="20"
							:height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24.94 24.94"
						>
							<circle
								fill="#ffffff"
								cx="12.47"
								cy="12.47"
								r="12.47"
							/>
							<circle
								fill="#ee3b3f"
								cx="12.47"
								cy="12.47"
								r="10.66"
							/>
							<path
								fill="#ffffff"
								d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z"
							/>
						</svg>
					</button>
				</button>
				<!-- Button for each provider in the list -->
				<button
					v-for="provider in providersList.slice(0, 8)"
					@click="
						onProvider(provider);
						othersProviders = false;
					"
					class="relative rounded-lg p-2 w-full max-w-[9.4rem] hover:bg-secondary hover:text-neutral hover:font-bold capitalize cursor-pointer mb-2"
					:class="
						storeCasinoLobby.provider === provider.name
							? 'bg-secondary text-neutral blob font-bold'
							: 'text-neutral bg-neutral-content'
					"
                    v-bind="analyticsAttrs.provider(provider)"
				>
					<!-- Conditional rendering of provider icon -->
					<div
						v-if="
							appComponent.config.iconProviders !== undefined &&
							appComponent.config.iconProviders[
								appComponent.country
							] !== undefined &&
							appComponent.config.iconProviders[
								appComponent.country
							] &&
							provider.image !== undefined &&
							provider.image != ''
						"
                        class="w-[65px] h-[28px] mx-auto mb-1 tablet:w-[80px] tablet:h-[35px]"
					>
						<img
							:src="provider.image"
							class="w-full h-full object-contain"
							alt=""
						/>
					</div>
					<!-- Button label for each provider -->
					<span
						class="rounded-lg py-2 w-full hover:blob font-bold capitalize flex justify-center items-center text-base text-neutral bg-base-300"
						:title="provider.name"
					>
						<span class="truncate max-w-full text-center">
						{{ provider.name }}
						</span>
					</span>
				</button>
				<!-- Placeholder for additional providers if more than 8 exist -->
				<div v-if="providersList.length > 8" class="mr-16"></div>
			</nav>
			<!-- Container for additional providers if more than 8 exist -->
			<div v-if="providersList.length > 8" class="relative">
				<div
					class="absolute -top-10 right-0 text-center rounded-2xl flex justify-around items-start mt-2 z-[60]"
				>
					<!-- Slider for showing other providers -->
					<div
						v-if="onOthers"
						class="slider-casino overflow-y-auto bg-base-200 shadow-2xl h-96 w-64 rounded-b-2xl rounded-tl-2xl text-neutral-content text-lg ml-1 border-4 border-solid border-base-200"
					>
						<ul class="p-1 grid gap-1">
							<!-- List of additional providers -->
							<li
								v-for="provider in providersList.slice(8)"
								class="providerLi w-full h-10 cursor-pointer flex justify-start items-center gap-2 px-2 bg-base-100 rounded"
								:class="'bg-base-300/25 rounded-full'"
								@click="
									onProvider(provider);
									onOthers = false;
									othersProviders = true;
								"
                                v-bind="analyticsAttrs.provider(provider)"
							>
								<div
									class="w-2 h-2 bg-base-100 rounded-full"
								></div>
								<span
									tabindex="0"
									class="capitalize text-base text-neutral font-bold"
									>{{ $t(provider.title) }}</span
								>
							</li>
						</ul>
					</div>
					<!-- Button to toggle the visibility of additional providers -->
					<div
						class="bg-base-300-content"
						:class="onOthers ? 'rounded-r-2xl' : 'rounded-2xl'"
					>
						<button
							tabindex="0"
							class="h-12 lg:h-14 w-12 lg:w-14 bg-base-100 rounded-2xl p-2 m-2 hover:scale-105"
							@click="onOthers = !onOthers"
                            v-bind="analyticsAttrs.viewAll"
						>
							<font-awesome-icon
								v-if="!onOthers"
								icon="fa-solid fa-plus"
								size="2x"
								class="text-neutral"
							/>
							<font-awesome-icon
								v-else
								icon="fa-solid fa-xmark"
								size="2x"
								class="text-neutral"
							/>
						</button>
					</div>
				</div>
			</div>
		</article>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import apiService from '@/services/ApiService';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import { useGlobalStore } from '@/stores/global';
import { register } from 'swiper/element/bundle';
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils';
register();
export default defineComponent({
	components: { ExitIcon },
	props: {
		// Data prop to receive configuration or state
		data: {
			type: Object,
			default: {},
		},
	},
	data() {
		// Initialize component data
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let providersList: any = [];
		let providersLength: number = 0;
		let storeCasinoLobby = useGlobalStore();
		let onOthers: boolean = false;
		let othersProviders: boolean = false;
		let emitter = this.$emitter();

        const analyticsAttrs = {}

		return {
			config,
			appComponent,
			providersList,
			providersLength,
			storeCasinoLobby,
			onOthers,
			othersProviders,
			emitter,
            analyticsAttrs
		};
	},
	setup() {
		// Setup function for composition API
		const route = useRoute();
		let gameId: any = ref(route.params.GameId);
		let categoryId: any = ref(route.params.CategoryId);
		let providerId: any = ref(route.params.ProviderId);
		return {
			gameId,
			categoryId,
			providerId,
		};
	},
	methods: {
		// Method to handle provider selection
		onProvider(provider: any) {
			this.appComponent.gAnalytics('game_type', provider.name);
			this.storeCasinoLobby.provider = provider.name;
			// Update browser history based on the selected provider
			if (this.$route.path.indexOf('new-casino') != -1) {
				if (provider.name != '') {
					window.history.pushState(
						'',
						'',
						'/new-casino/proveedor/' + provider.name
					);
				} else {
					window.history.pushState('', '', '/new-casino');
				}
			} else if (this.$route.path.indexOf('virtuales-lobby') != -1) {
				if (provider.name != '') {
					window.history.pushState(
						'',
						'',
						'/virtuales-lobby/proveedor/' + provider.name
					);
				} else {
					window.history.pushState('', '', '/virtuales-lobby');
				}
			} else {
				window.history.pushState(
					'',
					'',
					'/live-casino-vivo/proveedor/' + provider.name
				);
			}
			this.emitter.emit('get:gamesList');
		},
		// Method to filter provider selections
		selectionsProviderFilter(filter: any) {
			try {
				this.providersList.filter((provider) => {
					return provider.name == filter || provider.title == filter;
				})[0].name;
				return this.providersList.filter((provider) => {
					return provider.name == filter || provider.title == filter;
				})[0].title;
			} catch (e) {}
		},
	},
	created() {
		// Fetch provider options on component creation
		let options = {
			action: 'getOptions',
			partner_id: this.appComponent.partnerG,
			country: this.appComponent.country,
			typelobby: this.data.typelobby,
		};
	if (this.appComponent.session.logueado) {
	  options["testUser"] = this.appComponent.session.user_test == 1 ? true : false
	}
		apiService
			.requestGet(
				this.config.urlVirtualplay + '/cms/products/games/',
				options
			)
			.then((response: any) => {
				this.providersList = response.data.providers;
				this.providersLength = response.data.providers.length;
			});
		// Set initial provider based on route parameters
		watch(
			() => this.$route.params.ProviderId,
			(providerId) => {
				this.storeCasinoLobby.provider = providerId || 'all';
			},
			{ immediate: true }
		);

        this.analyticsAttrs = {
            filterAll: {
                'data-analytics-label': `casino:provider-filter:all`,
                'data-analytics-context': `component:MenuProviders3V2|layout:${this.appComponent.config.layout}`
            },
            viewAll: {
                'data-analytics-label': `casino:provider-filter:more`,
                'data-analytics-context': `component:MenuProviders3V2|layout:${this.appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:providers:arrow-prev`,
                'data-analytics-context': `component:MenuProviders3V2|layout:${this.appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:providers:arrow-next`,
                'data-analytics-context': `component:MenuProviders3V2|layout:${this.appComponent.config.layout}`
            },
            provider: (provider) => ({
                'data-analytics-label': `casino:provider-filter:${toKebabCase(provider.name)}`,
                'data-analytics-position': `${this.providersList.findIndex((p) => p.name === provider.name) + 1}`,
                'data-analytics-context': `component:MenuProviders3V2|layout:${this.appComponent.config.layout}`
            })
        };
	},
	mounted() {},
});
</script>
<style scoped>
/* Style for provider list item hover effect */
.providerLi:hover > div:nth-child(1) {
	width: 2rem !important;
	transition: 0.5s ease-in-out !important;
}
</style>

<!-- FILE DOCUMENTED -->
