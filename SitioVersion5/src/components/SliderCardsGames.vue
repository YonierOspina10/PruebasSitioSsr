<template>
	<!-- Swiper container for displaying games, shown only if gamesList has items -->
	<swiper-container
		v-if="gamesList.length > 0"
		space-between="10"
		free-mode="true"
		slides-per-view="auto"
		direction="horizontal"
		mousewheel-force-to-axis="true"
		loop="true"
		class="w-full h-full"
	>
		<!-- Each game is represented as a slide -->
		<swiper-slide
			v-for="game in gamesList"
			class="w-[117px] h-[160px] bg-base-200 rounded-xl overflow-hidden hover:scale-105"
		>
			<!-- Link to the game's page -->
			<RouterLink :to="'/new-casino/' + game.id" class="w-full h-full" v-bind="analyticsAttrs.game(game)">
				<!-- Game icon -->
				<img :src="game.icon_3" alt="" class="w-full h-[117px]" />
				<div
					class="w-full h-full p-2 text-neutral text-xs font-semibold uppercase"
				>
					<!-- Game name displayed -->
					<p>{{ game.name }}</p>
				</div>
			</RouterLink>
		</swiper-slide>
	</swiper-container>
	<!-- Navigation buttons for the swiper, shown only if gamesList has items -->
	<div
		v-if="gamesList.length > 0"
		class="flex justify-start items-center gap-3"
	>
		<!-- Button to go to the previous slide -->
		<button @click="prevSlide()" class="rounded-full bg-neutral-content/80" v-bind="analyticsAttrs.arrowPrev">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="31"
				height="31"
				viewBox="0 0 31 31"
				fill="none"
			>
				<circle
					cx="15.3802"
					cy="15.3802"
					r="15.3802"
					transform="matrix(-1 0 0 1 30.7603 0)"
					fill="#191929"
				/>
				<path
					d="M11.7464 15.8038C11.626 15.6836 11.5583 15.5205 11.5581 15.3503V15.0251C11.5601 14.8553 11.6275 14.6929 11.7464 14.5716L16.1448 10.1817C16.2251 10.1007 16.3345 10.0551 16.4486 10.0551C16.5627 10.0551 16.672 10.1007 16.7523 10.1817L17.3599 10.7892C17.4404 10.8681 17.4858 10.9761 17.4858 11.0888C17.4858 11.2014 17.4404 11.3094 17.3599 11.3883L13.5519 15.1877L17.3599 18.9872C17.4409 19.0675 17.4865 19.1769 17.4865 19.2909C17.4865 19.405 17.4409 19.5144 17.3599 19.5947L16.7523 20.1937C16.672 20.2747 16.5627 20.3203 16.4486 20.3203C16.3345 20.3203 16.2251 20.2747 16.1448 20.1937L11.7464 15.8038Z"
					fill="#E8BD70"
				/>
			</svg>
		</button>
		<!-- Button to go to the next slide -->
		<button
			@click="nextSlide()"
			class="rounded-full bg-neutral-content/80 rotate-180"
            v-bind="analyticsAttrs.arrowNext"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="31"
				height="31"
				viewBox="0 0 31 31"
				fill="none"
			>
				<circle
					cx="15.3802"
					cy="15.3802"
					r="15.3802"
					transform="matrix(-1 0 0 1 30.7603 0)"
					fill="#191929"
				/>
				<path
					d="M11.7464 15.8038C11.626 15.6836 11.5583 15.5205 11.5581 15.3503V15.0251C11.5601 14.8553 11.6275 14.6929 11.7464 14.5716L16.1448 10.1817C16.2251 10.1007 16.3345 10.0551 16.4486 10.0551C16.5627 10.0551 16.672 10.1007 16.7523 10.1817L17.3599 10.7892C17.4404 10.8681 17.4858 10.9761 17.4858 11.0888C17.4858 11.2014 17.4404 11.3094 17.3599 11.3883L13.5519 15.1877L17.3599 18.9872C17.4409 19.0675 17.4865 19.1769 17.4865 19.2909C17.4865 19.405 17.4409 19.5144 17.3599 19.5947L16.7523 20.1937C16.672 20.2747 16.5627 20.3203 16.4486 20.3203C16.3345 20.3203 16.2251 20.2747 16.1448 20.1937L11.7464 15.8038Z"
					fill="#E8BD70"
				/>
			</svg>
		</button>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import { register } from 'swiper/element/bundle';
import { toKebabCase } from '@/utils';
register();
export default defineComponent({
	// Component props definition
	props: {
		data: {
			type: Object,
			default: () => {
				// Default values for the data prop
				return {
					category: 1,
					limit: 20,
					lobby: 0,
					type: 1,
					action: 'getGames2',
				};
			},
		},
	},
	setup() {
		return {};
	},
	data() {
		// Component data properties
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let gamesList: any = [];

        const getNames = appComponent.config?.newCasino || {};
        let category = this.data?.action || 'all';
        if (getNames[category]) {
            category = getNames[category];
        }
        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:view-all`,
                'data-analytics-context': `component:SliderCardsGames|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-prev`,
                'data-analytics-context': `component:SliderCardsGames|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-next`,
                'data-analytics-context': `component:SliderCardsGames|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCardsGames|layout:${appComponent.config.layout}`,
            })
        }

		return {
			config,
			appComponent,
			gamesList,
            analyticsAttrs,
		};
	},
	mounted() {
		// Fetch games based on the type prop when the component is mounted
		if (this.data.type === 1) {
			this.getCasinoGames();
		} else if (this.data.type === 2) {
			this.getCasinoGames2();
		}
	},
	methods: {
		// Fetch casino games based on the first type
		async getCasinoGames() {
			let optionsGames = {
				action: this.data.action,
				partner_id: this.appComponent.partner,
				offset: 0,
				typelobby: this.data.lobby,
				limit: this.data.limit,
				category: this.data.category,
				country: this.appComponent.country,
				isMobile: false,
			};
			await apiService
				.requestGet(
					this.config.urlVirtualplay + '/cms/products/games/',
					optionsGames
				)
				.then((response: any) => {
					// Update gamesList with the fetched games
					this.gamesList = response.data.games;
				});
		},
		// Fetch casino games based on the second type
		async getCasinoGames2() {
			let optionsGames = {
				action: this.data.action,
				partner_id: this.appComponent.partnerG,
				offset: 0,
				typelobby: this.data.typelobby,
				limit: this.data.limit,
				category: 'all',
				provider: 'all',
				country: this.appComponent.country,
				isMobile: this.appComponent.mobile == '1',
				userId: '',
			};
			// Check if the user is logged in and set userId accordingly
			if (this.appComponent.session.logueado) {
				optionsGames.userId = this.appComponent.session.id_user;
			}
			try {
				await apiService
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						optionsGames
					)
					.then((response: any) => {
						// Update gamesList with the fetched games
						this.gamesList = response.data.games; 
					});
			} catch (e) {}
		},
		// Navigate to the next slide in the swiper
		nextSlide() {
			(document.querySelector('swiper-container') as any)?.swiper.slideNext();
		},
		// Navigate to the previous slide in the swiper
		prevSlide() {
			(document.querySelector('swiper-container') as any)?.swiper.slidePrev();
		},
	},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->
