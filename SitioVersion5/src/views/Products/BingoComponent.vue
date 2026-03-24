<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/ApiService';
import AppCarousel from '@/components/Carousel.vue';
import favoriteIcon from '@/components/icons/favoriteIcon.vue';
import searchIcon from '@/components/icons/searchIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import Casino3 from '@/views/Products/Casino3.vue';
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue';
import bingos from '@/views/Promotions/Bingos.vue';
import { useFavoriteGames } from '@/composables/useFavoriteGames';
declare var Ticker: any; // Declare a global variable Ticker

export default defineComponent({
	components: {
		// Asynchronously load the SliderNormalComponent
		SliderNormalComponent: defineAsyncComponent(
			() => import('@/components/Carousel.vue')
		),
		AppCarousel,
		favoriteIcon,
		searchIcon,
		IconClose,
		animatedCloseIcon,
		Casino3,
		bingos,
	},
	data: function () {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Get app component
		let gameId = ''; // Initialize game ID
		let urlpayments: any = ''; // Initialize payment URL
		let auth_token = ''; // Initialize authentication token
		let lng = ''; // Initialize language
		let casinoLocal: boolean = true; // Flag for local casino
		let lobbyType: any = ''; // Initialize lobby type
		let searchCommand = {
			input: '', // Search input
		};
		const components: any = ref([]); // Reactive reference for components
		let myCasinoGames: any = []; // Array for casino games
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Flag for preloader visibility
		let showMore: boolean = false; // Flag for showing more games
		let showLoadMoreButton = true; // Flag for load more button visibility
		let selections: any = ''; // Selections variable
		let categoryId = ''; // Initialize category ID
		let providerId = ''; // Initialize provider ID
		let providers: any = ''; // Initialize providers
		let categories: any = ''; // Initialize categories
		let gamesList: any = ''; // Initialize games list
		let optionsGames: any = ''; // Initialize options for games
		let gameSelected: any = ''; // Initialize selected game
		let showGame: boolean = false; // Flag for showing game
		let limit: any = ''; // Initialize limit
		let total_count: any = null; // Total count of games
		let offset: any = null; // Offset for pagination
		let openSearchv3: boolean = false; // Flag for search visibility
		let partnerG: any = ''; // Partner variable
		let logueado: any = ''; // Logged in status
		let routes: any = ''; // Routes variable
		let user_id: any = ''; // User ID
		let urlVirtualplay: any = ''; // URL for virtual play
		let urlCasinoPlay: any = ''; // URL for casino play
		let providersLength: any = ''; // Length of providers
		let categoriesLength: any = ''; // Length of categories
		let urlGame: any = ''; // URL for game
		let limitConfig: any = ''; // Limit configuration
		let hideInputSearch: any = ''; // Flag to hide search input
		let showSearchCommandResults: any = ''; // Flag to show search results
		let sliders: any = ''; // Sliders variable
		let urlbanner: any = ''; // URL for banner
		let limitBefore: any = ''; // Limit before
		let country: any = ''; // Country variable
		let flag: boolean = true; // General flag
		let device: string = ''; // Device type
		let login: string = ''; // Login status
		let login2: string = ''; // Secondary login status
		let provOpen: boolean = false; // Flag for provider visibility
		let banners: any = []; // Array for banners
		let background: string = ''; // Background variable
		let timeoutPromise: any = undefined; // Timeout promise
		let debouncedSearch: any = null; // Debounced search function
		let typeBingo: number = 0; // Type of bingo
		let iconBingo: string =
			'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t  viewBox="0 0 242.539 242.539" style="enable-background:new 0 0 242.539 242.539;"\n\t xml:space="preserve">\n\t <linearGradient id="SVGID_tables" x1="754.359" x2="754.359" y1="-695.753" y2="-664.92" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 -738.875 -664.906)">\n                    <stop offset="0" stop-color="#FF9220"></stop>\n                    <stop offset=".439" stop-color="#FFA82C"></stop>\n                    <stop offset=".48" stop-color="#FCCB8E"></stop>\n                    <stop offset=".525" stop-color="#FFD38A"></stop>\n                    <stop offset="1" stop-color="#FFCC63"></stop>\n                </linearGradient>\n<g>\n\t<g>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M184.489,49.515c6.823,0,10.66-6.366,10.66-14.447c0-7.278-3.612-14.155-10.66-14.155\n\t\t\tc-6.991,0-10.716,6.476-10.716,14.442C173.773,43.269,177.723,49.515,184.489,49.515z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M61.418,26.189c0-3.671-2.751-5.334-7.22-5.334c-2.065,0-3.27,0.117-4.011,0.287v10.605h3.61\n\t\t\tC58.723,31.748,61.418,29.458,61.418,26.189z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M62.504,43.212c0-4.532-3.953-6.361-8.828-6.361h-3.493v12.613c0.919,0.17,2.119,0.17,3.724,0.17\n\t\t\tC58.437,49.63,62.504,47.968,62.504,43.212z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M32.352,242.539h177.834c13.198,0,23.896-10.701,23.896-23.896V23.896C234.082,10.699,223.385,0,210.187,0H32.352\n\t\t\tC19.158,0,8.457,10.699,8.457,23.896v194.748C8.457,231.837,19.158,242.539,32.352,242.539z M148.245,220.235h-54.96v-46.199\n\t\t\th54.96V220.235z M148.245,164.477h-54.96v-41.42h54.96V164.477z M148.245,113.503h-54.96V68.9h54.96V113.503z M214.354,196.339\n\t\t\tc0,13.193-10.701,23.896-23.895,23.896h-32.656v-46.199h56.551V196.339z M214.354,164.477h-56.551v-41.42h56.551V164.477z\n\t\t\t M214.354,92.791v20.708h-56.551V68.896h32.656C203.662,68.896,214.354,79.595,214.354,92.791z M184.723,15.24\n\t\t\tc11.229,0,17.88,8.541,17.88,19.604c0,12.956-7.854,20.344-18.458,20.344c-10.94,0-17.824-8.368-17.824-19.66\n\t\t\tC166.32,23.608,173.83,15.24,184.723,15.24z M149.617,15.527c4.76,0,8.484,0.976,10.258,1.834l-1.54,5.673\n\t\t\tc-2.123-0.974-4.699-1.662-8.77-1.662c-8.256,0-14.043,4.87-14.043,13.868c0,8.774,5.386,13.987,13.413,13.987\n\t\t\tc2.576,0,4.415-0.343,5.33-0.745v-9.687h-6.818v-5.559h13.642v19.546c-2.469,0.917-7.281,2.18-12.387,2.18\n\t\t\tc-6.534,0-11.519-1.664-15.187-5.162c-3.439-3.269-5.386-8.368-5.386-14.213C128.186,23.321,136.839,15.527,149.617,15.527z\n\t\t\t M91.302,15.929h8.083l9.974,16.563c2.518,4.303,4.812,8.77,6.59,12.956h0.114c-0.516-5.159-0.63-10.146-0.63-16.047V15.933h6.532\n\t\t\tv38.63h-7.334L104.54,37.54c-2.464-4.245-4.984-8.942-6.877-13.301l-0.229,0.058c0.287,4.984,0.401,10.088,0.401,16.449v13.817\n\t\t\th-6.539V15.929H91.302z M76.225,15.929h7.05v38.629h-7.05V15.929z M43.191,16.503c2.238-0.46,6.303-0.861,10.319-0.861\n\t\t\tc5.162,0,8.424,0.688,11.005,2.467c2.411,1.433,4.016,3.958,4.016,7.278c0,3.556-2.238,6.762-6.42,8.31v0.173\n\t\t\tc4.067,1.031,7.794,4.245,7.794,9.516c0,3.439-1.491,6.135-3.668,8.022c-2.753,2.353-7.281,3.557-14.386,3.557\n\t\t\tc-3.899,0-6.819-0.287-8.655-0.516V16.503H43.191z M28.768,92.791c0-13.196,10.702-23.896,23.896-23.896h31.064v44.603H28.768\n\t\t\tV92.791z M28.768,123.062h54.959v41.42H28.768V123.062z M28.768,174.036h54.959v46.199H52.663\n\t\t\tc-13.194,0-23.896-10.702-23.896-23.896V174.036z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M57.081,87.897c-2.425,0-4.25,0.968-5.439,2.345h-0.11c0.598-3.354,3.02-6.445,8.123-7.042\n\t\t\tc0.894-0.112,1.641-0.149,2.311-0.112v-3.612c-0.561-0.037-1.305-0.037-2.311,0.105c-3.463,0.264-6.408,1.458-8.606,3.58\n\t\t\tc-2.532,2.385-4.209,6.146-4.209,10.806c0,6.002,3.239,10.471,9.126,10.471c5.144,0,8.536-4.025,8.536-8.646\n\t\t\tC64.497,90.879,61.258,87.897,57.081,87.897z M55.96,101.014c-3.015,0-4.506-2.609-4.583-5.815c0-0.635,0.109-1.085,0.296-1.452\n\t\t\tc0.707-1.458,2.238-2.497,3.953-2.497c2.681,0,4.209,1.975,4.209,4.81C59.836,98.96,58.312,101.014,55.96,101.014z"/>\n\t\t<polygon points="107.385,83.949 107.461,83.949 107.461,104.032 111.891,104.032 111.891,79.807 108.092,79.807 102.165,82.717 \n\t\t\t102.948,86.182 \t\t"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M127.299,95.535c2.306,0,4.061-0.784,5.293-2.124h0.074c-0.448,2.308-1.526,4.135-3.132,5.4\n\t\t\tc-1.339,1.085-3.092,1.717-4.917,1.869c-1.081,0.11-1.792,0.149-2.532,0.077v3.652c0.707,0.037,1.715,0.037,2.756-0.077\n\t\t\tc3.278-0.224,6.182-1.377,8.272-3.312c2.534-2.424,4.21-6.114,4.21-11.294c0-5.92-2.978-10.316-8.644-10.316\n\t\t\tc-5.144,0-8.723,3.985-8.723,8.643C119.953,92.513,123.084,95.535,127.299,95.535z M128.447,82.79\n\t\t\tc2.986,0,4.214,2.795,4.214,6.076c0,0.633-0.106,1.006-0.266,1.34c-0.705,1.118-2.044,2.011-3.906,2.011\n\t\t\tc-2.534,0-3.986-1.935-3.986-4.434C124.503,84.838,126.142,82.79,128.447,82.79z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M176.406,91.066v-0.077c2.978-1.047,4.476-3.131,4.476-5.668c0-3.169-2.534-5.922-7.565-5.922\n\t\t\tc-2.875,0-5.591,0.929-6.968,1.864l1.04,3.312c1.009-0.667,2.987-1.524,4.957-1.524c2.688,0,3.883,1.376,3.883,3.059\n\t\t\tc0,2.385-2.688,3.349-4.77,3.349h-2.091v3.355h2.091c2.791,0,5.507,1.228,5.507,4.096c0,1.902-1.372,3.881-4.877,3.881\n\t\t\tc-2.31,0-4.583-0.932-5.512-1.491l-1.046,3.47c1.308,0.856,3.842,1.673,6.781,1.673c6.002,0,9.433-3.246,9.433-7.341\n\t\t\tC181.698,93.822,179.355,91.62,176.406,91.066z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M185.218,93.967c0,6.002,3.238,10.471,9.129,10.471c5.143,0,8.531-4.025,8.531-8.646c0-4.917-3.244-7.898-7.421-7.898\n\t\t\tc-2.422,0-4.247,0.968-5.438,2.345h-0.107c0.598-3.353,3.016-6.445,8.116-7.042c0.901-0.112,1.647-0.149,2.311-0.112v-3.612\n\t\t\tc-0.556-0.038-1.302-0.038-2.311,0.105c-3.463,0.264-6.407,1.458-8.605,3.58C186.893,85.545,185.218,89.307,185.218,93.967z\n\t\t\t M190.062,93.748c0.7-1.458,2.24-2.497,3.948-2.497c2.688,0,4.21,1.975,4.21,4.81c0,2.9-1.521,4.954-3.873,4.954\n\t\t\tc-3.016,0-4.504-2.609-4.583-5.815C189.764,94.564,189.875,94.114,190.062,93.748z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M61.668,131.78h-5.407l-9.911,15.093v2.979h10.991v6.15h4.326v-6.15h3.129v-3.464h-3.129V131.78z M57.342,139.792v6.595\n\t\t\th-6.595v-0.074l4.469-6.637c0.745-1.335,1.382-2.566,2.121-4.093h0.149C57.414,137.035,57.342,138.417,57.342,139.792z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M116.66,152.203h-9.913v-0.074l2.084-1.825c4.25-3.916,7.304-7.341,7.304-11.598c0-3.943-2.604-7.337-7.976-7.337\n\t\t\tc-3.055,0-5.703,1.083-7.456,2.497l1.342,3.244c1.23-0.929,3.022-2.017,5.181-2.017c3.169,0,4.322,1.899,4.322,4.065\n\t\t\tc-0.04,3.206-2.721,6.108-8.422,11.406l-2.868,2.646v2.791h16.398v-3.799H116.66z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M130.352,156.001h4.326v-6.142h3.132v-3.473h-3.132V131.78h-5.404l-9.913,15.093v2.979h10.991V156.001z M123.757,146.387\n\t\t\tv-0.074l4.476-6.637c0.747-1.335,1.382-2.566,2.119-4.093h0.149c-0.075,1.451-0.149,2.833-0.149,4.209v6.595H123.757z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M172.383,152.763c-2.306,0-4.583-0.934-5.517-1.494l-1.036,3.473c1.303,0.858,3.837,1.671,6.777,1.671\n\t\t\tc6.002,0,9.432-3.244,9.432-7.337c-0.042-3.281-2.385-5.483-5.33-6.039v-0.074c2.982-1.046,4.477-3.132,4.477-5.666\n\t\t\tc0-3.174-2.535-5.928-7.57-5.928c-2.865,0-5.582,0.934-6.963,1.867l1.04,3.313c1.009-0.672,2.982-1.526,4.952-1.526\n\t\t\tc2.688,0,3.878,1.377,3.878,3.058c0,2.39-2.684,3.351-4.77,3.351h-2.086v3.355h2.086c2.796,0,5.517,1.228,5.517,4.094\n\t\t\tC177.265,150.784,175.888,152.763,172.383,152.763z"/>\n\t\t<polygon points="197.734,135.658 187.523,156.001 192.33,156.001 202.579,134.729 202.579,131.78 186.296,131.78 186.296,135.583 \n\t\t\t197.734,135.583 \t\t"/>\n\t\t<polygon points="44.372,187.897 44.444,187.897 44.444,207.974 48.878,207.974 48.878,183.752 45.074,183.752 39.154,186.665 \n\t\t\t39.931,190.127 \t\t"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M65.472,208.385c5.811,0,8.87-4.882,8.87-12.713c0-7.113-2.719-12.331-8.569-12.331c-5.664,0-8.87,5.031-8.87,12.597\n\t\t\tC56.94,203.317,59.918,208.385,65.472,208.385z M65.663,186.851c2.758,0,4.063,3.313,4.063,8.938c0,5.82-1.381,9.096-4.098,9.096\n\t\t\tc-2.494,0-4.1-3.062-4.1-8.983C61.523,189.866,63.239,186.851,65.663,186.851z"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M116.66,204.175h-9.913v-0.074l2.084-1.825c4.25-3.916,7.304-7.341,7.304-11.598c0-3.943-2.604-7.337-7.976-7.337\n\t\t\tc-3.055,0-5.703,1.083-7.456,2.497l1.342,3.243c1.23-0.928,3.022-2.016,5.181-2.016c3.169,0,4.322,1.899,4.322,4.064\n\t\t\tc-0.04,3.207-2.721,6.109-8.422,11.407l-2.868,2.646v2.791h16.398v-3.799H116.66z"/>\n\t\t<polygon points="127.371,187.897 127.446,187.897 127.446,207.974 131.882,207.974 131.882,183.752 128.078,183.752 \n\t\t\t122.151,186.665 122.936,190.127 \t\t"/>\n\t\t<path style="fill: URL(#SVGID_tables);" d="M174.586,208.385c5.139,0,8.531-4.028,8.531-8.648c0-4.914-3.243-7.901-7.416-7.901c-2.422,0-4.252,0.971-5.446,2.348\n\t\t\th-0.107c0.598-3.355,3.02-6.445,8.125-7.043c0.896-0.111,1.639-0.148,2.306-0.111v-3.612c-0.56-0.038-1.302-0.038-2.306,0.103\n\t\t\tc-3.472,0.266-6.412,1.461-8.615,3.584c-2.524,2.381-4.21,6.143-4.21,10.805C165.457,203.914,168.696,208.385,174.586,208.385z\n\t\t\t M170.297,197.693c0.705-1.461,2.235-2.497,3.953-2.497c2.679,0,4.209,1.975,4.209,4.808c0,2.902-1.53,4.956-3.873,4.956\n\t\t\tc-3.015,0-4.509-2.608-4.583-5.815C170.003,198.509,170.11,198.062,170.297,197.693z"/>\n\t\t<path style="fill: URL(#SVGID_tables);"  d="M194.085,208.385c5.815,0,8.867-4.882,8.867-12.713c0-7.113-2.716-12.331-8.568-12.331c-5.666,0-8.868,5.031-8.868,12.597\n\t\t\tC185.554,203.317,188.531,208.385,194.085,208.385z M194.271,186.851c2.758,0,4.061,3.313,4.061,8.938\n\t\t\tc0,5.82-1.372,9.096-4.093,9.096c-2.497,0-4.094-3.062-4.094-8.983C190.137,189.866,191.85,186.851,194.271,186.851z"/>\n\t</g>\n</g>\n\n</svg>'; // Bingo icon SVG tag

		// Determine device type based on app component
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Set login status based on session
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Set secondary login status based on session
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Load banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_bingo'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_bingo'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['bingo'] != undefined &&
			config['components_']['bingo'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['bingo'][
				config['components_']['bingo'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['bingo'][
				config['components_']['bingo'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['bingo'][
						config['components_']['bingo'].findIndex(
							(item) => item.id == 'Carousel3Component'
						)
					]['banners']
				)
			);
		} else {
			if (
				config != undefined &&
				config[device] != undefined &&
				config[device][appComponent.country] != undefined &&
				config[device][appComponent.country][appComponent.lngProd] !=
					undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				] != undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				]['bingo'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['bingo']
					)
				);
			}
		}

		// Populate components with banners based on configuration
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['bingo'] != undefined
		) {
			config['components_']['bingo'].forEach((component: any) => {
				component.banners = banners; // Assign banners to component
				components.value.push(component); // Add component to reactive array
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['bingo'] != undefined
			) {
				config['components'][appComponent.country]['bingo'].forEach(
					(component: any) => {
						component.banners = banners; // Assign banners to component
						components.value.push(component); // Add component to reactive array
					}
				);
			}
		}

		// Return data properties for use in the component
		return {
			config,
			appComponent,
			iconBingo,
			typeBingo,
			gameId,
			urlpayments,
			auth_token,
			lng,
			casinoLocal,
			lobbyType,
			searchCommand,
			myCasinoGames,
			bgGame,
			preloaderShow,
			showMore,
			selections,
			categoryId,
			providerId,
			providers,
			categories,
			gamesList,
			optionsGames,
			gameSelected,
			showGame,
			limit,
			total_count,
			offset,
			openSearchv3,
			partnerG,
			logueado,
			routes,
			user_id,
			urlVirtualplay,
			urlCasinoPlay,
			providersLength,
			categoriesLength,
			urlGame,
			limitConfig,
			hideInputSearch,
			showSearchCommandResults,
			sliders,
			urlbanner,
			limitBefore,
			country,
			flag,
			device,
			login,
			login2,
			provOpen,
			banners,
			components,
			background,
			showLoadMoreButton,
			timeoutPromise,
			debouncedSearch,
            toggleSaveToMyCasinoGamesComposable: null,
            getFavoriteGamesComposable: null,
            selectCategoryFavComposable: null
		};
	},
    async created() {
        const appComponent = this.$root.$options; 
        const emitter = this.$root.$options.emitter;

        const { toggleSaveToMyCasinoGames, getFavoriteGames } = useFavoriteGames(appComponent, emitter);

        this.toggleSaveToMyCasinoGamesComposable = toggleSaveToMyCasinoGames;
        this.getFavoriteGamesComposable = getFavoriteGames;
    },

	setup() {
		const route = useRoute(); // Get the current route
		let gameId: any = ref(route.params.GameId); // Reactive reference for game ID from route params
		let categoryId: any = ref(route.params.CategoryId); // Reactive reference for category ID from route params
		let providerId: any = ref(route.params.ProviderId); // Reactive reference for provider ID from route params
		return {
			gameId,
			categoryId,
			providerId,
		};
	},
	mounted() {
        const emitter = this.$root?.$options?.appContext?.config?.globalProperties?.emitter;

        // Inyect composable
        const { toggleSaveToMyCasinoGames, getFavoriteGames, selectCategoryFav } =
            useFavoriteGames(this.appComponent, emitter);

        // save the refs in the component
        this.toggleSaveToMyCasinoGamesComposable = toggleSaveToMyCasinoGames;
        this.getFavoriteGamesComposable = getFavoriteGames;
        this.selectCategoryFavComposable = selectCategoryFav;
        // Check if the layout configuration is not one of the specified values
        if (
            this.config.layout != 3 &&
            this.config.layout != 4 &&
            this.config.layout != 5 &&
            this.appComponent.config.layout != 6 &&
            this.config.layout != 7
        ) {
            // Initialize games list as empty
            this.gamesList = [];
            // Determine if the casino is local based on configuration and country
            this.casinoLocal = this.config.bingos != undefined && this.config.bingos[this.appComponent.country] != undefined && this.config.bingos[this.appComponent.country].isLocal != undefined ?  this.config.bingos[this.appComponent.country].isLocal : false;
            // Set lobby type from configuration
            this.lobbyType = this.config.casino.lobbyType;
            // Preserve the current configuration
            this.config = this.config;
            // Set limit configuration for casino
            this.limitConfig = this.config.casino.limit;
            // Set URLs for virtual play and casino play
            this.urlVirtualplay = this.config.urlVirtualplay;
            this.urlCasinoPlay = this.config.urlCasinoPlay;
            // Get partner information from app component
            this.partnerG = this.appComponent.partnerG;
            // Check if the user is logged in
            this.logueado = this.appComponent.session.logueado;
            // Set routes from configuration
            this.routes = this.config.routes;
            // Get user ID and authentication token from app component
            this.user_id = this.appComponent.user_id;
            this.auth_token = this.appComponent.tokenUser;
            this.country = this.appComponent.country;
            this.auth_token = this.appComponent.tokenUser; // Duplicate assignment
            // Set default language
            this.lng = 'es';
            // Determine if "show more" button should be displayed based on total count and limit
            if (this.total_count < this.limitConfig) {
                this.showMore = false;
            } else {
                this.showMore = true;
            }
            // Hide all elements with the class 'preload-game-bottom'
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-bottom'),
                function (el, i) {
                    (
                        document.getElementsByClassName('preload-game-bottom')[
                            i
                        ] as HTMLElement
                    ).style.display = 'none';
                }
            );
            // Fetch casino games
            this.getCasinoGames();

            if (this.appComponent.config.activeFavoritesWithBackend !== undefined &&
                this.appComponent.config.activeFavoritesWithBackend === true &&
                this.appComponent.session.logueado) {
                this.getFavoriteGamesComposable()
            }

            var vthis = this; // Preserve context for event listener
            // Add event listener for closing a casino game
            window.document.addEventListener(
                'closeGameCasino',
                (e) => {
                    vthis.closeGame(); // Call closeGame method on event
                },
                false
            );
            // Check for background configuration for not logged in state
            if (
                this.config != undefined &&
                this.config['not_login'] != undefined &&
                this.config['not_login']['backgrounds'] != undefined &&
                this.config['not_login']['backgrounds']['bg_casino'] !=
                    undefined
            ) {
                // Set background for not logged in state
                this.background =
                    this.config['not_login']['backgrounds']['bg_casino'];
            }
            // Create a debounced search function
            this.debouncedSearch = this.debounce(
                this.searchEnter,
                this.appComponent.config['timeDebouncedSearch'] ?? 500
            );
            // Get the current route path
            const currentPath = this.$route.path;
            // Set bingo type based on current path
            if (currentPath.startsWith('/bingos') && currentPath !== '/bingos' && currentPath !== '/bingos/') {
                this.typeBingo = 1;
            }
        }
    }, // Placeholder for mounted lifecycle hook
    watch: {
      'appComponent.session.logueado': {
        immediate: true,
        async handler(isLogueado: boolean) {
          if (!isLogueado) return;

          try {
            await this.getFavoriteGamesComposable();

            this.myCasinoGames = this.appComponent.myCasinoGames;

            this.appComponent.gamesList.forEach((game: any) => {
              game.fav = this.appComponent.myListFavoriteGame.includes(game.id);
            });
          } catch (err) {
            console.error('Error en favoritos', err);
          }
        }
      }
    },
	methods: {
        async toggleSaveToMyCasinoGames(game) {
                    // we use the composable instead of the old logic
                    await this.toggleSaveToMyCasinoGamesComposable(game);
                }, // Placeholder for method to toggle saving to my casino games

                async selectCategoryFav() {
                    // we use the composable instead of the old logic
                    await this.selectCategoryFavComposable(3);

                    this.gamesList = [...this.appComponent.gamesList];
                    this.total_count = this.appComponent.total_count;
                }, // Placeholder for method to select favorite category
		/**
		 * Navigate to the bingo lobby
		 */
		goToLobby() {
			this.$router.push('/bingos'); // Redirect to bingos route
			this.typeBingo = 0; // Reset bingo type
		},
		/**
     * Fetches casino games and updates the UI accordingly.
     */
    getCasinoGames() {
        var vthis = this; // Preserve the context of 'this'
        this.bgGame = {
            background:
                'url(' +
                this.config.casino.preloaderGame +
                ')no-repeat 0 50%/cover', // Set background for the game preloader
        };
        this.preloaderShow = true; // Show preloader
        vthis.showMore = true; // Allow showing more games
        this.selections = {
            category: {
                id: '', // Initialize category selection
            },
            provider: '', // Initialize provider selection
        };
        // Check if categoryId and providerId are not set
        if (
            (this.categoryId == undefined ||
                this.categoryId == '' ||
                this.categoryId == 'todos-all') &&
            (this.providerId == undefined || this.providerId == '')
        ) {
            this.optionsGames = {
                action: 'getGames2', // Action to fetch games
                partner_id: this.partnerG, // Partner ID
                offset: 0, // Offset for pagination
                typelobby: 3, // Type of lobby
                limit: vthis.limitConfig, // Limit of games to fetch
                country: this.appComponent.country, // Country for localization
            };
            // Check if the app is running on mobile
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true; // Set mobile flag
            } else {
                this.optionsGames.isMobile = false; // Clear mobile flag
            }
            // Fetch games with a timeout
            Promise.race([
                apiService.requestGet(
                    this.urlVirtualplay + '/cms/products/games/',
                    this.optionsGames
                ),
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    // Handle response from the API
                    if (response == 'timeout') {
                        vthis.gamesList = []; // Clear games list on timeout
                        vthis.total_count = 0; // Reset total count
                        vthis.offset = 0; // Reset offset
                        vthis.limit = vthis.limitConfig; // Reset limit
                        vthis.preloaderShow = false; // Hide preloader
                    } else {
                        var json = response.data; // Parse response data
                        vthis.gamesList = json.games; // Update games list
                        vthis.total_count = json.total_count; // Update total count
                        vthis.offset = vthis.gamesList.length; // Update offset
                        vthis.limit =
                            vthis.gamesList.length + vthis.limitConfig; // Update limit
                        vthis.preloaderShow = false; // Hide preloader
                        // Hide preload game elements
                        Array.prototype.forEach.call(
                            document.getElementsByClassName(
                                'preload-game-top'
                            ),
                            function (el, i) {
                                (
                                    document.getElementsByClassName(
                                        'preload-game-top'
                                    )[i] as HTMLElement
                                ).style.display = 'none';
                            }
                        );
                        // Check for Playtech jackpot configuration
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot !=
                                undefined &&
                            vthis.config.casino.playtechJackpot[
                                vthis.appComponent.country
                            ] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing script
                            }
                            var script = document.createElement('script'); // Create new script element
                            script.src =
                                'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Preserve context
                            script.onload = function () {
                                // On script load, initialize tickers for games
                                vthis.gamesList.forEach((game) => {
                                    if (
                                        game.provider == 'PLAYTECH' &&
                                        game.jackpot != undefined &&
                                        game.jackpot == 1
                                    ) {
                                        var objParams =
                                            vthis.config.casino
                                                .playtechJackpot[
                                                vthis.appComponent.country
                                            ];
                                        objParams.game = game.front_game_id; // Set game ID for ticker
                                        var ticker = new Ticker(objParams); // Create ticker instance
                                        ticker.attachToTextBox(
                                            'playtech-' + game.id // Attach ticker to game element
                                        );
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Append script to head
                        }
                    }
                })
                .catch((error) => {
                    // Handle errors during API request
                    vthis.gamesList = []; // Clear games list on error
                    vthis.total_count = 0; // Reset total count
                    vthis.offset = 0; // Reset offset
                    vthis.limit = vthis.limitConfig; // Reset limit
                    vthis.preloaderShow = false; // Hide preloader
                });
            // Open game if gameId is defined
            if (this.gameId != undefined) {
                vthis.openGame({ id: vthis.gameId });
            }
        } else {
            // Handle cases where categoryId is defined
            if (
                this.categoryId != undefined &&
                this.categoryId != 'todos-all'
            ) {
                // Hide preload game elements
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-bottom'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-bottom'
                            )[i] as HTMLElement
                        ).style.display = 'none';
                    }
                );
                vthis.selections.category.id =
                    vthis.categoryId.split('-')[1]; // Set selected category ID
                this.optionsGames = {
                    action: 'getGames2', // Action to fetch games
                    partner_id: this.partnerG, // Partner ID
                    category: this.categoryId.split('-')[1], // Set category for fetching games
                    offset: 0, // Offset for pagination
                    typelobby: 3, // Type of lobby
                    limit: vthis.limitConfig, // Limit of games to fetch
                    country: this.appComponent.country, // Country for localization
                };
                // Check if the app is running on mobile
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true; // Set mobile flag
                } else {
                    this.optionsGames.isMobile = false; // Clear mobile flag
                }
                // Fetch games with a timeout
                Promise.race([
                    apiService.requestGet(
                        this.urlVirtualplay + '/cms/products/games/',
                        this.optionsGames
                    ),
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                    }),
                ])
                    .then((response: any) => {
                        // Handle response from the API
                        if (response == 'timeout') {
                            vthis.gamesList = []; // Clear games list on timeout
                            vthis.total_count = 0; // Reset total count
                            vthis.offset = 0; // Reset offset
                            vthis.limit = vthis.limitConfig; // Reset limit
                        } else {
                            var json = response.data; // Parse response data
                            vthis.gamesList = json.games; // Update games list
                            vthis.total_count = json.total_count; // Update total count
                            vthis.offset = vthis.gamesList.length; // Update offset
                            vthis.limit =
                                vthis.gamesList.length + vthis.limitConfig; // Update limit
                            // Check for Playtech jackpot configuration
                            if (
                                vthis.config.casino != undefined &&
                                vthis.config.casino.playtechJackpot !=
                                    undefined &&
                                vthis.config.casino.playtechJackpot[
                                    vthis.appComponent.country
                                ] != undefined
                            ) {
                                var existingScript = document.querySelector(
                                    'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                                );
                                if (existingScript) {
                                    existingScript.remove(); // Remove existing script
                                }
                                var script =
                                    document.createElement('script'); // Create new script element
                                script.src =
                                    'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                const vthis = this; // Preserve context
                                script.onload = function () {
                                    // On script load, initialize tickers for games
                                    vthis.gamesList.forEach((game) => {
                                        if (
                                            game.provider == 'PLAYTECH' &&
                                            game.jackpot != undefined &&
                                            game.jackpot == 1
                                        ) {
                                            var objParams =
                                                vthis.config.casino
                                                    .playtechJackpot[
                                                    vthis.appComponent
                                                        .country
                                                ];
                                            objParams.game =
                                                game.front_game_id; // Set game ID for ticker
                                            var ticker = new Ticker(
                                                objParams
                                            ); // Create ticker instance
                                            ticker.attachToTextBox(
                                                'playtech-' + game.id // Attach ticker to game element
                                            );
                                            ticker.SetCurrencyPos('1'); // Set currency position
                                            ticker.tick(); // Start ticker
                                        }
                                    });
                                };
                                document.head.appendChild(script); // Append script to head
                            }
                        }
                    })
                    .catch((error) => {
                        // Handle errors during API request
                        vthis.gamesList = []; // Clear games list on error
                        vthis.total_count = 0; // Reset total count
                        vthis.offset = 0; // Reset offset
                        vthis.limit = vthis.limitConfig; // Reset limit
                    });
                // Hide preload game elements
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-top'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-top'
                            )[i] as HTMLElement
                        ).style.display = 'none';
                    }
                );
            }
            // Open game if gameId is defined and categoryId is not set
            if (this.gameId != undefined && this.categoryId == undefined) {
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-top'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-top'
                            )[i] as HTMLElement
                        ).style.display = 'none';
                    }
                );
                vthis.openGame({ id: vthis.gameId });
            }
            // Handle case where providerId is defined and no gameId or categoryId is set
            if (
                this.providerId != undefined &&
                this.gameId == undefined &&
                this.categoryId == undefined
            ) {
                vthis.selections.provider = vthis.providerId; // Set selected provider
                this.optionsGames = {
                    action: 'getGames2', // Action to fetch games
                    partner_id: this.partnerG, // Partner ID
                    offset: 0, // Offset for pagination
                    typelobby: 3, // Type of lobby
                    limit: vthis.limitConfig, // Limit of games to fetch
                    country: this.appComponent.country, // Country for localization
                };
                // Check if the app is running on mobile
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true; // Set mobile flag
                } else {
                    this.optionsGames.isMobile = false; // Clear mobile flag
                }
                if (this.providerId != '') {
                    this.optionsGames.provider = this.providerId; // Set provider for fetching games
                }
                // Fetch games with a timeout
                Promise.race([
                    apiService.requestGet(
                        this.urlVirtualplay + '/cms/products/games/',
                        this.optionsGames
                    ),
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                    }),
                ])
                    .then((response: any) => {
                        // Handle response from the API
                        if (response == 'timeout') {
                            vthis.gamesList = []; // Clear games list on timeout
                            vthis.total_count = 0; // Reset total count
                            vthis.offset = 0; // Reset offset
                            vthis.limit = vthis.limitConfig; // Reset limit
                        } else {
                            var json = response.data; // Parse response data
                            vthis.gamesList = json.games; // Update games list
                            vthis.total_count = json.total_count; // Update total count
                            vthis.offset = vthis.gamesList.length; // Update offset
                            vthis.limit =
                                vthis.gamesList.length + vthis.limitConfig; // Update limit
                            // Check for Playtech jackpot configuration
                            if (
                                vthis.config.casino != undefined &&
                                vthis.config.casino.playtechJackpot !=
                                    undefined &&
                                vthis.config.casino.playtechJackpot[
                                    vthis.appComponent.country
                                ] != undefined
                            ) {
                                var existingScript = document.querySelector(
                                    'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                                );
                                if (existingScript) {
                                    existingScript.remove(); // Remove existing script
                                }
                                var script =
                                    document.createElement('script'); // Create new script element
                                script.src =
                                    'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                const vthis = this; // Preserve context
                                script.onload = function () {
                                    // On script load, initialize tickers for games
                                    vthis.gamesList.forEach((game) => {
                                        if (
                                            game.provider == 'PLAYTECH' &&
                                            game.jackpot != undefined &&
                                            game.jackpot == 1
                                        ) {
                                            var objParams =
                                                vthis.config.casino
                                                    .playtechJackpot[
                                                    vthis.appComponent
                                                        .country
                                                ];
                                            objParams.game =
                                                game.front_game_id; // Set game ID for ticker
                                            var ticker = new Ticker(
                                                objParams
                                            ); // Create ticker instance
                                            ticker.attachToTextBox(
                                                'playtech-' + game.id // Attach ticker to game element
                                            );
                                            ticker.SetCurrencyPos('1'); // Set currency position
                                            ticker.tick(); // Start ticker
                                        }
                                    });
                                };
                                document.head.appendChild(script); // Append script to head
                            }
                        }
                    })
                    .catch((error) => {
                        // Handle errors during API request
                        vthis.gamesList = []; // Clear games list on error
                        vthis.total_count = 0; // Reset total count
                        vthis.offset = 0; // Reset offset
                        vthis.limit = vthis.limitConfig; // Reset limit
                        vthis.preloaderShow = false; // Hide preloader
                    });
                // Hide preload game elements
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-top'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-top'
                            )[i] as HTMLElement
                        ).style.display = 'none';
                    }
                );
            }
        }
        // Fetch options for the games
        var options = {
            action: 'getOptions', // Action to fetch options
            partner_id: this.partnerG, // Partner ID
            country: this.appComponent.country, // Country for localization
            typelobby: 3, // Type of lobby
        };
        // Check if the user is logged in
        if (this.appComponent.session.logueado) {
            options["testUser"] = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
        }
        // Fetch options with a timeout
        Promise.race([
            apiService.requestGet(
                this.urlVirtualplay + '/cms/products/games/',
                options
            ),
            new Promise((resolve, reject) => {
                setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
            }),
        ])
            .then((response: any) => {
                // Handle response from the API
                if (
                    response == 'timeout'
                ) {
                    vthis.providers = []; // Clear providers on timeout
                    vthis.categories = []; // Clear categories on timeout
                    vthis.providersLength = 0; // Reset providers length
                    vthis.categoriesLength = 0; // Reset categories length
                } else {
                    var json = response.data; // Parse response data
                    vthis.providers = json.providers; // Update providers
                    vthis.categories = json.categories; // Update categories
                    vthis.providersLength = json.providers.length; // Update providers length
                    vthis.categoriesLength = json.categories.length; // Update categories length
                }
            })
            .catch((error) => {
                // Handle errors during API request
                vthis.providers = []; // Clear providers on error
                vthis.categories = []; // Clear categories on error
                vthis.providersLength = 0; // Reset providers length
                vthis.categoriesLength = 0; // Reset categories length
            });
    }, // Placeholder for method to get casino games
		/**
     * Initiates the game session for the specified game.
     *
     * @param {Object} game - The game object containing game details.
     */
    openGame(game) {
        // Track the game play event with Google Analytics
        this.appComponent.gAnalytics(
            'play_casino',
            {...game, action: 'getGames2'} // Include game details and action
        );

        var vthis = this; // Preserve the context of 'this'
        this.urlGame = ''; // Initialize the game URL
        this.gameSelected = game; // Store the selected game

        // Check if the user is logged in
        if (this.appComponent.session.logueado) {
            this.showGame = true; // Set flag to show the game

            // Prepare options for the game
            this.optionsGames = {
                gameid: game.id, // Game ID
                mode: 'real', // Game mode
                provider: game.provider, // Game provider
                lan: this.appComponent.lngProd, // Language
                partnerid: this.partnerG, // Partner ID
                token: this.auth_token, // Authentication token
                balance: 0, // User balance
                currency: this.appComponent.session.moneda, // User currency
                userid: this.appComponent.session.usuario, // User ID
                isMobile: '', // Mobile flag
            };

            // Determine if the user is on a mobile device
            if (this.appComponent.mobile == '1') {
                vthis.optionsGames.isMobile = true; // Set mobile flag to true
            } else {
                vthis.optionsGames.isMobile = false; // Set mobile flag to false
            }

            // Update browser history if gameId is not defined
            if (this.gameId == undefined) {
                window.history.pushState('', '', '/bingos/' + game.id);
            }

            // Set game content attributes after a delay
            setTimeout(function () {
                (
                    document.getElementById('game-content') as HTMLElement
                ).setAttribute('allowFullScreen', 'true'); // Allow full screen mode

                (
                    document.getElementById('game-content') as HTMLElement
                ).setAttribute(
                    'src',
                    vthis.urlCasinoPlay + // Base URL for casino play
                    '?gameid=' + vthis.optionsGames.gameid + // Game ID parameter
                    '&mode=' + vthis.optionsGames.mode + // Mode parameter
                    '&provider=' + vthis.optionsGames.provider + // Provider parameter
                    '&lan=' + vthis.optionsGames.lan + // Language parameter
                    '&partnerid=' + vthis.optionsGames.partnerid + // Partner ID parameter
                    '&token=' + vthis.optionsGames.token + // Token parameter
                    '&balance=' + vthis.optionsGames.balance + // Balance parameter
                    '&currency=' + vthis.optionsGames.currency + // Currency parameter
                    '&userid=' + vthis.optionsGames.userid + // User ID parameter
                    '&isMobile=' + vthis.optionsGames.isMobile // Mobile flag parameter
                );
            }, 1000); // Delay of 1 second before setting attributes
        } else {
            this.clickButtonLogin(); // Trigger login if not logged in
        }
    }, // Placeholder for method to open a game
		/**
     * Handles the search event when the user presses enter.
     * @param {Event} event - The event object representing the key press event.
     */
    searchEnter(event) {
        var vthis = this; // Preserve the context of 'this' for use in callbacks.
        this.gamesList = []; // Initialize the games list to an empty array.

        // Check if the search input length is at least 3 characters.
        if (this.searchCommand.input.length >= 3) {
            // Prepare options for the API request.
            this.optionsGames = {
                action: 'getGames2', // Action to be performed by the API.
                partner_id: this.partnerG, // Partner ID for the API request.
                search: this.searchCommand.input, // Search query from the input.
                typelobby: 3, // Type of lobby to be used.
                country: this.appComponent.country, // Country information from the app component.
            };

            // Determine if the request is from a mobile device.
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true; // Set mobile flag to true.
            } else {
                this.optionsGames.isMobile = false; // Set mobile flag to false.
            }

            // Make an API GET request to fetch games based on the search input.
            apiService
                .requestGet(
                    this.urlVirtualplay + '/cms/products/games/', // API endpoint.
                    this.optionsGames // Options for the API request.
                )
                .then((response: any) => {
                    var json = response.data; // Parse the response data.
                    vthis.gamesList = json.games; // Update the games list with the fetched games.
                    vthis.total_count = json.total_count; // Update the total count of games.
                    vthis.offset = 0; // Reset the offset for pagination.
                    vthis.limit = vthis.limit; // Maintain the current limit for pagination.

                    // Check if the Playtech jackpot configuration is defined for the current country.
                    if (
                        vthis.config.casino != undefined &&
                        vthis.config.casino.playtechJackpot != undefined &&
                        vthis.config.casino.playtechJackpot[
                            vthis.appComponent.country
                        ] != undefined
                    ) {
                        // Remove existing jackpot script if it exists.
                        var existingScript = document.querySelector(
                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                        );
                        if (existingScript) {
                            existingScript.remove(); // Remove the existing script from the document.
                        }

                        // Create a new script element for the Playtech jackpot ticker.
                        var script = document.createElement('script');
                        script.src =
                            'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Source of the jackpot script.
                        const vthis = this; // Preserve the context of 'this' for the script onload function.

                        // Define the onload function for the script.
                        script.onload = function () {
                            // Iterate over the games list to attach tickers to eligible games.
                            vthis.gamesList.forEach((game) => {
                                // Check if the game is from Playtech and has a jackpot.
                                if (
                                    game.provider == 'PLAYTECH' &&
                                    game.jackpot != undefined &&
                                    game.jackpot == 1
                                ) {
                                    var objParams =
                                        vthis.config.casino.playtechJackpot[
                                            vthis.appComponent.country
                                        ]; // Get jackpot parameters for the current country.
                                    objParams.game = game.front_game_id; // Set the game ID for the ticker.
                                    var ticker = new Ticker(objParams); // Create a new Ticker instance.
                                    ticker.attachToTextBox(
                                        'playtech-' + game.id // Attach ticker to the corresponding game ID.
                                    );
                                    ticker.SetCurrencyPos('1'); // Set the currency position for the ticker.
                                    ticker.tick(); // Start the ticker animation.
                                }
                            });
                        };
                        document.head.appendChild(script); // Append the script to the document head.
                    }
                });
        } else {
            // If the search input is empty, load more games.
            if (this.searchCommand.input.length == 0) {
                this.loadMoreGames(); // Call the function to load more games.
            }
        }
    }, // Placeholder for search enter method
		/**
		 * Check if a game ID is in the saved casino games
		 * @param id - The game ID to check
		 * @returns True if the game ID is found, otherwise false
		 */
		isFromSaved(id) {
			if (this.myCasinoGames.length > 0) {
				for (var i = 0; i < this.myCasinoGames.length; i++) {
					if (id == this.myCasinoGames[i].id) {
						return true; // Game ID found
					}
				}
			}
		},
		/**
		 * Show the login modal
		 */
		clickButtonLogin() {
			this.appComponent.showModalLogin = true; // Set modal visibility
		},
		/**
     * Selects a category and updates the game list based on the selected category.
     *
     * @param {Object} category - The category object containing id and slug.
     */
    selectCategory(category) {
        var vthis = this; // Preserve reference to 'this' for use in callbacks
        this.flag = true; // Set flag to indicate category selection is active

        // Hide all elements with the class 'preload-game-top'
        Array.prototype.forEach.call(
            document.getElementsByClassName('preload-game-top'),
            function (el, i) {
                (
                    document.getElementsByClassName('preload-game-top')[
                        i
                    ] as HTMLElement
                ).style.display = 'none'; // Set display to none
            }
        );

        // Show all elements with the class 'preload-game-bottom'
        Array.prototype.forEach.call(
            document.getElementsByClassName('preload-game-bottom'),
            function (el, i) {
                (
                    document.getElementsByClassName('preload-game-bottom')[
                        i
                    ] as HTMLElement
                ).style.display = 'block'; // Set display to block
            }
        );

        vthis.gamesList = []; // Initialize games list
        vthis.selections.category.id = category.id; // Set selected category id
        vthis.selections.provider = ''; // Reset provider selection

        // Prepare options for API request
        this.optionsGames = {
            action: 'getGames2', // Action to be performed
            partner_id: this.partnerG, // Partner ID for the request
            offset: 0, // Offset for pagination
            typelobby: 3, // Type of lobby
            limit: vthis.limitConfig, // Limit for number of games
            country: this.appComponent.country, // Country for localization
        };

        // Check if the app is running on mobile
        if (this.appComponent.mobile == '1') {
            this.optionsGames.isMobile = true; // Set mobile flag
        } else {
            this.optionsGames.isMobile = false; // Clear mobile flag
        }

        // Set category in options if valid
        if (category.id != '' && category.id != 'all') {
            this.optionsGames.category = category.id; // Assign category id
        }

        // Set provider in options if valid
        if (
            this.selections.provider != '' &&
            this.selections.provider != undefined &&
            this.selections.provider != null
        ) {
            this.optionsGames.provider = this.selections.provider; // Assign provider
        }

        // Update browser history with the selected category
        window.history.pushState(
            '',
            '',
            '/bingos/categoria/' + category.slug + '-' + category.id
        );

        // Make API request to fetch games based on selected options
        apiService
            .requestGet(
                this.urlVirtualplay + '/cms/products/games/',
                this.optionsGames
            )
            .then((response: any) => {
                var json = response.data; // Parse response data
                vthis.gamesList = json.games; // Update games list
                vthis.total_count = json.total_count; // Update total count of games
                vthis.offset = vthis.gamesList.length; // Update offset for pagination
                vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update limit
                vthis.noMoreGames(); // Check for more games to load

                // Hide all elements with the class 'preload-game-top' again
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-top'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-top'
                            )[i] as HTMLElement
                        ).style.display = 'none'; // Set display to none
                    }
                );

                // Check for Playtech Jackpot configuration
                if (
                    vthis.config.casino != undefined &&
                    vthis.config.casino.playtechJackpot != undefined &&
                    vthis.config.casino.playtechJackpot[
                        vthis.appComponent.country
                    ] != undefined
                ) {
                    var existingScript = document.querySelector(
                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                    ); // Check if script already exists
                    if (existingScript) {
                        existingScript.remove(); // Remove existing script
                    }
                    var script = document.createElement('script'); // Create new script element
                    script.src =
                        'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                    const vthis = this; // Preserve reference to 'this'
                    script.onload = function () {
                        // On script load, attach ticker to games
                        vthis.gamesList.forEach((game) => {
                            if (
                                game.provider == 'PLAYTECH' &&
                                game.jackpot != undefined &&
                                game.jackpot == 1
                            ) {
                                var objParams =
                                    vthis.config.casino.playtechJackpot[
                                        vthis.appComponent.country
                                    ]; // Get jackpot parameters
                                objParams.game = game.front_game_id; // Set game ID
                                var ticker = new Ticker(objParams); // Create new ticker instance
                                ticker.attachToTextBox(
                                    'playtech-' + game.id // Attach ticker to text box
                                );
                                ticker.SetCurrencyPos('1'); // Set currency position
                                ticker.tick(); // Start ticker
                            }
                        });
                    };
                    document.head.appendChild(script); // Append script to document head
                }
            });

        // Determine if more games can be shown based on total count
        if (vthis.total_count < vthis.limitConfig) {
            vthis.showMore = false; // Hide 'show more' option
        } else {
            vthis.showMore = true; // Show 'show more' option
        }
    }, // Placeholder for method to select category
		/**
     * Loads more games when the user requests it.
     * This function manages the loading state, prepares the request options,
     * and handles the response to update the game list.
     */
    loadMoreGames() {
        var vthis = this; // Preserve the context of 'this' for use in callbacks
        this.getPreloaderLoadmore(); // Initialize the loading preloader
        this.preloaderShow = true; // Show the preloader indicator
        var limit = 0; // Initialize limit for the number of games to load

        // Determine the limit based on total count of games
        if (this.limit < this.total_count) {
            limit = this.limit; // Set limit to current limit if less than total
        } else {
            limit = this.total_count - this.limit; // Calculate remaining games to load
            this.showMore = false; // Hide the "load more" button if no more games
        }

        // Prepare options for the API request
        this.optionsGames = {
            action: 'getGames2', // Action to fetch games
            partner_id: this.partnerG, // Partner ID for the request
            offset: vthis.offset, // Current offset for pagination
            limit: vthis.limit, // Limit of games to fetch
            typelobby: 3, // Type of lobby
            country: this.appComponent.country, // User's country
        };

        // Set mobile flag based on app component
        if (this.appComponent.mobile == '1') {
            this.optionsGames.isMobile = true; // Mobile user
        } else {
            this.optionsGames.isMobile = false; // Non-mobile user
        }

        // Check if a specific category is selected and add to options
        if (
            this.selections.category.id != '' &&
            this.selections.category.id != undefined &&
            this.selections.category.id != null &&
            this.selections.category.id != 'all'
        ) {
            vthis.optionsGames.category = vthis.selections.category.id; // Set category ID
        }

        // Add provider ID to options if defined
        if (vthis.providerId != undefined || vthis.providerId != '') {
            vthis.optionsGames.provider = vthis.providerId; // Set provider ID
        }

        // Calculate limit before loading more games
        vthis.limitBefore = limit - vthis.limitConfig;
        if (vthis.limitBefore <= 0) {
            vthis.limitBefore = vthis.limitConfig; // Reset to limit config if negative
        }

        // Check if there are more games to load
        if (vthis.offset < vthis.total_count) {
            apiService
                .requestGet(
                    this.urlVirtualplay + '/cms/products/games/', // API endpoint
                    this.optionsGames // Request options
                )
                .then((response: any) => {
                    var json = response.data; // Parse response data
                    var games = json.games; // Extract games from response
                    games.forEach(function (value, key) {
                        vthis.gamesList.push(value); // Add each game to the games list
                    });
                    vthis.offset = vthis.gamesList.length; // Update offset
                    vthis.limit = limit + vthis.limitConfig; // Update limit

                    // Hide preload game elements after loading
                    Array.prototype.forEach.call(
                        document.getElementsByClassName('preload-game-bottom'),
                        function (el, i) {
                            (
                                document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement
                            ).style.display = 'none'; // Hide each preload element
                        }
                    );

                    // Hide load more button if all games are loaded
                    if (vthis.offset >= vthis.total_count) {
                        vthis.showLoadMoreButton = false; // No more games to load
                    }

                    // Check for Playtech jackpot configuration
                    if (
                        vthis.config.casino != undefined &&
                        vthis.config.casino.playtechJackpot != undefined &&
                        vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                    ) {
                        var existingScript = document.querySelector(
                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                        );
                        if (existingScript) {
                            existingScript.remove(); // Remove existing jackpot script
                        }
                        var script = document.createElement('script'); // Create new script element
                        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                        const vthis = this; // Preserve context for script onload
                        script.onload = function () {
                            vthis.gamesList.forEach((game) => {
                                // Check for Playtech games with jackpots
                                if (
                                    game.provider == 'PLAYTECH' &&
                                    game.jackpot != undefined &&
                                    game.jackpot == 1
                                ) {
                                    var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                    objParams.game = game.front_game_id; // Set game ID for jackpot
                                    var ticker = new Ticker(objParams); // Create new ticker instance
                                    ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
                                    ticker.SetCurrencyPos('1'); // Set currency position
                                    ticker.tick(); // Start ticker animation
                                }
                            });
                        };
                        document.head.appendChild(script); // Append script to document head
                    }
                });
        } else {
            vthis.showMore = false; // No more games to show
            // Hide preload game elements if no more games
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-bottom'),
                function (el, i) {
                    (
                        document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement
                    ).style.display = 'none'; // Hide each preload element
                }
            );
        }
    }, // Placeholder for method to load more games
		/**
     * Selects a provider and updates the game list based on the selected provider.
     *
     * @param name - The name of the provider to select.
     * @param img - An image associated with the provider (not used in this fragment).
     * @param name2 - An alternative name for the provider, used if not empty.
     */
    selectProvider(name: any, img: any, name2: any) {
        var vthis = this; // Preserve the context of 'this' for use in callbacks.
        this.flag = true; // Set a flag indicating a provider has been selected.

        // Show all elements with the class 'preload-game-top'.
        Array.prototype.forEach.call(
            document.getElementsByClassName('preload-game-top'),
            function (el, i) {
                (
                    document.getElementsByClassName('preload-game-top')[
                        i
                    ] as HTMLElement
                ).style.display = 'block';
            }
        );

        // Hide all elements with the class 'preload-game-bottom'.
        Array.prototype.forEach.call(
            document.getElementsByClassName('preload-game-bottom'),
            function (el, i) {
                (
                    document.getElementsByClassName('preload-game-bottom')[
                        i
                    ] as HTMLElement
                ).style.display = 'none';
            }
        );

        vthis.gamesList = []; // Initialize the games list.
        vthis.selections.provider = name; // Set the selected provider.

        // If an alternative provider name is provided, use it.
        if (name2 != '') {
            vthis.selections.provider = name2;
        }

        // Configure options for fetching games.
        this.optionsGames = {
            action: 'getGames2',
            partner_id: this.partnerG,
            provider: '',
            offset: 0,
            typelobby: 3,
            limit: vthis.limitConfig,
            country: this.appComponent.country,
        };

        // Check if the app is running on mobile and set the flag accordingly.
        if (this.appComponent.mobile == '1') {
            this.optionsGames.isMobile = true;
        } else {
            this.optionsGames.isMobile = false;
        }

        // Set the provider in options if the name is not empty.
        if (name != '') {
            this.optionsGames.provider = name;
            this.providerId = name; // Store the provider ID.
        }

        // Update the browser history with the selected provider.
        window.history.pushState('', '', '/bingos/proveedor/' + name);

        // Make an API request to fetch games based on the selected provider.
        apiService
            .requestGet(
                this.urlVirtualplay + '/cms/products/games/',
                this.optionsGames
            )
            .then((response: any) => {
                var json = response.data; // Parse the response data.
                vthis.gamesList = json.games; // Update the games list.
                vthis.total_count = json.total_count; // Get the total count of games.
                vthis.offset = vthis.gamesList.length; // Update the offset based on the games list length.
                vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update the limit for pagination.
                vthis.noMoreGames(); // Check if there are no more games to load.

                // Hide all elements with the class 'preload-game-top' after loading games.
                Array.prototype.forEach.call(
                    document.getElementsByClassName('preload-game-top'),
                    function (el, i) {
                        (
                            document.getElementsByClassName(
                                'preload-game-top'
                            )[i] as HTMLElement
                        ).style.display = 'none';
                    }
                );

                // Determine if the "Load More" button should be shown based on the offset and total count.
                if (vthis.offset >= vthis.total_count) {
                    vthis.showLoadMoreButton = false;
                }
                if (vthis.offset < vthis.total_count) {
                    vthis.showLoadMoreButton = true;
                }

                // Check for Playtech jackpot configuration and load the jackpot script if applicable.
                if (
                    vthis.config.casino != undefined &&
                    vthis.config.casino.playtechJackpot != undefined &&
                    vthis.config.casino.playtechJackpot[
                        vthis.appComponent.country
                    ] != undefined
                ) {
                    var existingScript = document.querySelector(
                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
                    );
                    if (existingScript) {
                        existingScript.remove(); // Remove existing jackpot script if present.
                    }
                    var script = document.createElement('script'); // Create a new script element.
                    script.src =
                        'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set the source of the script.
                    const vthis = this; // Preserve the context of 'this' for the script's onload function.
                    script.onload = function () {
                        // Execute this function once the script is loaded.
                        vthis.gamesList.forEach((game) => {
                            // Iterate through the games list to attach jackpot tickers.
                            if (
                                game.provider == 'PLAYTECH' &&
                                game.jackpot != undefined &&
                                game.jackpot == 1
                            ) {
                                var objParams =
                                    vthis.config.casino.playtechJackpot[
                                        vthis.appComponent.country
                                    ];
                                objParams.game = game.front_game_id; // Set the game ID for the ticker.
                                var ticker = new Ticker(objParams); // Create a new Ticker instance.
                                ticker.attachToTextBox(
                                    'playtech-' + game.id // Attach the ticker to the corresponding game element.
                                );
                                ticker.SetCurrencyPos('1'); // Set the currency position for the ticker.
                                ticker.tick(); // Start the ticker animation.
                            }
                        });
                    };
                    document.head.appendChild(script); // Append the script to the document head.
                }
            });
        vthis.showMore = true; // Indicate that more games can be shown.
    }, // Placeholder for method to select provider
		/**
     * Hides or shows game elements based on the availability of games.
     * If there are no games in the gamesList, it hides the game elements
     * and shows a message indicating that there are no games available.
     */
    noMoreGames() {
        // Reference to the current context (this) for use in callbacks
        var vthis = this;

        // Check if the gamesList is empty
        if (vthis.gamesList.length <= 0) {
            // Hide all elements with the class 'preload-game-top'
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-top'),
                function (el, i) {
                    // Set the display style to 'none' for each element
                    (
                        document.getElementsByClassName('preload-game-top')[
                            i
                        ] as HTMLElement
                    ).style.display = 'none';
                }
            );

            // Hide all elements with the class 'preload-game-bottom'
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-bottom'),
                function (el, i) {
                    // Set the display style to 'none' for each element
                    (
                        document.getElementsByClassName(
                            'preload-game-bottom'
                        )[i] as HTMLElement
                    ).style.display = 'none';
                }
            );

            // Show all elements with the class 'bingos-no-games-text'
            Array.prototype.forEach.call(
                document.getElementsByClassName('bingos-no-games-text'),
                function (el, i) {
                    // Set the display style to 'block' for each element
                    (
                        document.getElementsByClassName(
                            'bingos-no-games-text'
                        )[i] as HTMLElement
                    ).style.display = 'block';
                }
            );
        } else {
            // If there are games, hide the 'bingos-no-games-text' elements
            Array.prototype.forEach.call(
                document.getElementsByClassName('bingos-no-games-text'),
                function (el, i) {
                    // Set the display style to 'none' for each element
                    (
                        document.getElementsByClassName(
                            'bingos-no-games-text'
                        )[i] as HTMLElement
                    ).style.display = 'none';
                }
            );
        }
    }, // Placeholder for method to handle no more games
		/**
		 * Open the search interface
		 */
		OpenSearchV3() {
			this.openSearchv3 = true; // Set search visibility
		},
		/**
		 * Close the search interface
		 */
		CloseSearchV3() {
			this.openSearchv3 = false; // Set search visibility
		},
		/**
		 * Scroll left in the casino navigation
		 */
		leftScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scroll right in the casino navigation
		 */
		rightScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Scroll left in the providers navigation
		 */
		leftScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scroll right in the providers navigation
		 */
		rightScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Toggle the visibility of providers
		 */
		openProviders() {
			this.provOpen = !this.provOpen; // Toggle provider visibility
		},
		/**
		 * Placeholder for loading more games with a preloader
		 */
		getPreloaderLoadmore() {
		},
		/**
		 * Filter providers based on selection
		 * @param filter - The filter criteria
		 * @returns The title of the selected provider
		 */
		selectionsProviderFilter(filter: any) {
			try {
				this.providerId = ''; // Reset provider ID
				this.providerId = this.providers.filter((provider) => {
					return provider.name == filter || provider.title == filter; // Filter providers
				})[0].name; // Get the name of the filtered provider
				return this.providers.filter((provider) => {
					return provider.name == filter || provider.title == filter; // Return the title of the filtered provider
				})[0].title;
			} catch (e) {}
		},
		/**
		 * Toggle visibility of the second providers menu
		 */
		openProviders2() {
			const otherButton: any = document.querySelector('#menuProviders');
			otherButton.classList.toggle('ver-drop'); // Toggle class for dropdown visibility
		},
		/**
		 * Close the currently opened game
		 */
		closeGame() {
			this.showGame = false; // Hide game
			window.history.pushState('', '', '/bingos'); // Navigate back to bingos
			this.gameId = undefined; // Reset game ID
		},
		/**
		 * Create a debounced function to limit the rate of function calls
		 * @param func - The function to debounce
		 * @param wait - The number of milliseconds to wait before calling the function
		 * @returns A debounced version of the provided function
		 */
		debounce(func, wait) {
			let timeout;
			return function (...args) {
				const later = () => {
					clearTimeout(timeout);
					func.apply(this, args); // Call the original function
				};
				clearTimeout(timeout);
				timeout = setTimeout(later, wait); // Set timeout for debouncing
			};
		},
	},
});</script>
<template>
    <!-- Main section for the contingency casino, displayed if the condition is true -->
    <section
        v-if="appComponent.contingencyCasino"
        class="flex justify-center items-center py-2"
    >
        <div class="h-full w-full">
            <!-- Container for the casino content with specific height and flex properties -->
            <section
                class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center"
            >
                <!-- Gradient background at the top of the section -->
                <div
                    class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"
                ></div>
                <div
                    class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center"
                >
                    <div
                        class="flex flex-col gap-8 justify-center items-center mt-10 xl:mt-0"
                    >
                        <!-- Message displayed in the casino section -->
                        <p
                            class="text-neutral text-xl md:text-3xl max-w-[700px] text-center"
                            v-html="$t(config.contingencyCasino.message)"
                        ></p>
                        <!-- Conditional RouterLink button based on configuration -->
                        <RouterLink
                            v-if="
								config.contingencyCasino !== undefined &&
								config.contingencyCasino.button !== undefined &&
								config.contingencyCasino.button.url !=
									undefined &&
								config.contingencyCasino.button.text !=
									undefined
							"
                            :to="config.contingencyCasino.button.url"
                            class="text-shadow-xl rounded-full bg-gradient-to-b from-primary-content to-primary-content/60 z-50 text-neutral uppercase font-bold px-5 py-3 hover:scale-105 transition-all ease-in-out"
                        >
                            {{ $t(config.contingencyCasino.button.text) }}
                        </RouterLink>
                    </div>
                    <!-- Conditional image display based on configuration -->
                    <img
                        v-if="
							config.contingencyCasino !== undefined &&
							config.contingencyCasino.img !== undefined
						"
                        :src="config.contingencyCasino.img"
                        alt=""
                        class="object-contain w-[400px] xl:w-[600px]"
                    />
                </div>
                <!-- Background image for the casino section -->
                <img
                    v-if="
						config.contingencyCasino !== undefined &&
						config.contingencyCasino.imgBackground !== undefined
					"
                    :src="config.contingencyCasino.imgBackground"
                    alt=""
                    class="absolute w-full h-full object-cover z-10"
                />
                <!-- Gradient background at the bottom of the section -->
                <div
                    class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute z-10 -bottom-0"
                ></div>
            </section>
        </div>
    </section>
    <!-- Loop through components if contingency casino is not displayed -->
    <div
        v-for="component in components"
        v-if="!appComponent.contingencyCasino"
        :key="component.id"
        class="asd"
    >
        <component
            :is="component.id"
            :category="component.category"
            :images="component.banners"
            :limit="component.limit"
            :shadow="component.shadow"
            :title="component.title"
            :top="component.top"
            :typelobby="component.typelobby"
            :url="component.url"
        ></component>
    </div>
    <!-- Conditional wrapper for casino layout -->
    <div
        v-if="
			casinoLocal == true &&
			config.layout != 3 &&
			config.layout != 4 &&
			config.layout != 5 &&
			appComponent.config.layout != 6 &&
			config.layout != 7 &&
			!appComponent.contingencyCasino
		"
    >
        <div
            v-if="
				appComponent.casinoEnabled && appComponent.session.wallet != '1'
			"
            id="casino-wrapper"
        >
            <div
                v-if="
					lobbyType == 1 || lobbyType == '' || lobbyType == undefined
				"
                id="casino-content"
                class="old-lobby h-full"
            >
                <div
                    id="lobby-casino"
                    :style="{
						backgroundImage: 'url(' + background + ')',
						backgroundSize: 'cover',
					}"
                >
                    <!-- Conditional navigation for casino providers -->
                    <div
                        v-if="config.casino.providersType == 4"
                        class="providers-nav-casino overflow-auto closed bg-casino-providers nav-casino4"
                    >
						<span
                            id="menuRightProviders"
                            class="button float-right relative block right-0 w-7 py-4 text-center bg-casino-providers -top-0 -right-1 rounded-l-2xl shadow-md"
                        >
							<div class="dropdown dropdown-end">
								<div
                                    class="p-0 normal-case btn-ghost btn btn-xs text-lg"
                                    tabindex="0"
                                >
									+
								</div>
								<div
                                    id="menuProviders"
                                    class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-base-100/90 text-neutral text-lg"
                                >
									<ul class="p-4 menu compact gap-1">
										<li class="bg-base-300" v-for="provider in providers">
											<a
                                                class="uppercase"
                                                tabindex="0"
                                                @click="
													selectProvider(
														provider.name,
														provider.image,
														provider.title
													);
													appComponent.gAnalytics(
														'game_type',
														provider.title
													);
												"
                                            >{{ provider.title }}</a
                                            >
										</li>
									</ul>
								</div>
							</div>
						</span>
                        <ul
                            class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                        >
                            <li
                                id="searchv3"
                                class="inline-block align-bottom cursor-pointer"
                                v-bind:class="{ open: openSearchv3 }"
                            >
                                <div class="">
                                    <div class="ng-pristine ng-valid">
                                        <div
                                            class="block-search"
                                            @click="OpenSearchV3()"
                                        >
                                            <div
                                                class="icon"
                                                @click="
													hideInputSearch =
														hideInputSearch
															? false
															: true
												"
                                            ></div>
                                            <searchIcon
                                                :fill="'#a7a7a7'"
                                                :height="15"
                                                :width="15"
                                                class="absolute top-3 left-3"
                                            ></searchIcon>
                                            <input
                                                v-show="openSearchv3"
                                                id="SearchGame"
                                                v-model="searchCommand.input"
                                                :placeholder="
													$t(
														'Search a casino game...'
													)
												"
                                                :title="
													$t('Buscar un juego...')
												"
                                                class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                trans=""
                                                type="text"
                                                @blur="
													appComponent.placeholder =
														appComponent.ph
												"
                                                @input="debouncedSearch"
                                            />
                                            <div
                                                v-show="
													showSearchCommandResults
												"
                                                broadcast-on-close="search.ResultsClosed"
                                                class="search-results-container ng-hide"
                                                class-on-scroll="search-results-container-scroll,search-results-container"
                                                hide-on-click=""
                                                state-flag-var="showSearchCommandResults"
                                            >
                                                <div
                                                    class="search-results-inner casino"
                                                >
                                                    <div
                                                        class="arrow-sport"
                                                    ></div>
                                                    <h3 trans="">
                                                        {{
                                                            $t('Search results')
                                                        }}
                                                    </h3>
                                                    <div
                                                        id="casino-result-search"
                                                        class="ng-isolate-scope"
                                                        keyboard-navigation=""
                                                        result-id-prefix="search-result-casino-"
                                                        results-ids="searchCommandResultGameIds"
                                                        select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                        selected-result-id="selectedSearchCommandResultId"
                                                        show-results-flag="showSearchCommandResults"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-if="openSearchv3"
                                        class="closed-popup-form"
                                        @click="CloseSearchV3()"
                                    >
                                        <IconClose
                                            :fill="'#a7a7a7'"
                                            class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                            @click="CloseSearchV3()"
                                        ></IconClose>
                                    </div>
                                </div>
                            </li>
                            <li
                                v-if="providersLength > 0"
                                class="providers-list inline-block mr-1 w-auto text-center"
                                @click="
									selectProvider('', '', '');
									appComponent.gAnalytics(
										'game_type',
										'Todos los proveedores'
									);
								"
                            >
                                <a
                                    class="rounded-3xl font-bold py-2 px-7 block"
                                    v-bind:class="{
										'text-neutral bg-primary blob':
											selections.provider == '',
									}"
                                >{{ $t('Todos los proveedores') }}</a
                                >
                            </li>
                            <li
                                v-if="
									providersLength > 0 &&
									selections.provider != ''
								"
                                class="providers-list inline-block mr-1 text-center"
                                @click="selectProvider('', '', '')"
                            >
                                <a
                                    class="rounded-3xl font-bold py-2 px-7 block text-neutral bg-primary blob h-10 uppercase"
                                >{{
                                        selectionsProviderFilter(
                                            selections.provider
                                        )
                                    }}</a
                                >
                            </li>
                            <li
                                v-for="provider in providers"
                                v-show="!selections.provider === provider.title"
                                class="capitalize providers-list inline-block mr-1 text-center"
                                @click="
									selectProvider(
										provider.name,
										provider.image,
										provider.title
									);
									appComponent.gAnalytics(
										'game_type',
										provider.title
									);
								"
                            >
                                <a
                                    class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
                                    v-bind:class="{
										'blob':
											selections.provider ===
											provider.title,
									}"
                                >{{ provider.title }}</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div v-if="showGame" class="big-games-overflow">
                        <div class="big-game-background">
                            <div
                                :style="{
									backgroundImage:
										'url(' + config.casino.bg + ')',
									backgroundSize: 'cover',
								}"
                                class="big-game-contain"
                                class-on-scroll="scrolled,notscrolled"
                            >
                                <div
                                    class="casual-game animate__animated animate__zoomIn animate__faster"
                                >
                                    <div class="casino-game-contain">
                                        <div class="flash-game-contain">
                                            <div class="big-game-control">
                                                <div class="top-options">
                                                    <div
                                                        v-if="
															config.casino.inGame
																.deposit
														"
                                                        class="inline-block align-bottom"
                                                    >
                                                        <label
                                                            class="btn btn-primary w-full text-neutral"
                                                            @click="
																appComponent.getPayments()
															"
                                                        ><span
                                                            class="icon-deposit pr-3"
                                                        ></span>
                                                            {{
                                                                $t('Depositar')
                                                            }}</label
                                                        >
                                                    </div>
                                                    <div
                                                        v-if="
															config.casino.inGame
																.refresh
														"
                                                        class="inline-block w-10 h-12 text-center text-2xl"
                                                    >
                                                        <a
                                                            title="Refresh"
                                                            @click="
																openGame(
																	gameSelected
																)
															"
                                                        >
                                                            <font-awesome-icon
                                                                class="text-neutral"
                                                                icon="fa-solid fa-refresh"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div
                                                        v-if="
															config.casino.inGame
																.favorite
														"
                                                        class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
                                                    >
                                                        <a
                                                            title="Add to My Games"
                                                            v-bind:class="{
																'favorite-active':
																	isFromSaved(
																		gameSelected.id
																	),
															}"
                                                            @click="
																toggleSaveToMyCasinoGames(
																	gameSelected
																)
															"
                                                        ><span
                                                            class="icon-star text-neutral"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                    <div
                                                        v-if="
															config.casino.inGame
																.home
														"
                                                        class="icon-delete home inline-block w-10 h-12 text-center text-lg"
                                                    >
                                                        <a
                                                            title="home"
                                                            @click="closeGame()"
                                                        ><span
                                                            class="icon-home1 text-neutral"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                </div>
                                                <div class="icon-delete">
                                                    <a
                                                        title="close"
                                                        @click="closeGame()"
                                                    >
                                                        <animatedCloseIcon
                                                            :fill="'white'"
                                                            :height="20"
                                                            :width="20"
                                                            class="text-xl bottom-1 left-2 absolute text-white cursor-pointer"
                                                            @click="
																CloseSearchV3()
															"
                                                        ></animatedCloseIcon>
                                                    </a>
                                                </div>
                                                <div class="div-logo-j">
                                                    <img :src="config.logo" />
                                                </div>
                                            </div>
                                            <iframe
                                                id="game-content"
                                                aspect-ratio="16:9"
                                                element-id=""
                                                frame-control=""
                                                initial-height=""
                                                initial-width=""
                                                ng-src=""
                                                number-of-window="1"
                                                src=""
                                                allow="clipboard-read; clipboard-write"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Main container for all casino games -->
                    <div
                        class="all-casino-games-box"
                        v-bind:class="{
							style4:
								config.casino.providersType == 4 &&
								appComponent.mobile !== 1,
						}"
                    >
                        <div class="fixed-element-parent">
                            <!-- Header container for the main navigation -->
                            <div
                                id="main-header-container"
                                class="fixed-nav-wrapper-casino-view"
                            >
                                <div class="search-category-nav-contain">
                                    <div class="left-column-casino-nav">
                                        <ul>
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                style="
													width: 0;
													height: 0;
													position: absolute;
												"
                                            >
                                                <linearGradient
                                                    id="SVGID_hot"
                                                    gradientUnits="userSpaceOnUse"
                                                    x1="17.201"
                                                    x2="17.201"
                                                    y1="36.861"
                                                    y2="-.025"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stop-color="#B12509"
                                                    ></stop>
                                                    <stop
                                                        offset=".468"
                                                        stop-color="#FF582C"
                                                    ></stop>
                                                    <stop
                                                        offset=".507"
                                                        stop-color="#FC8D15"
                                                    ></stop>
                                                    <stop
                                                        offset=".547"
                                                        stop-color="#FF8A09"
                                                    ></stop>
                                                    <stop
                                                        offset="1"
                                                        stop-color="#FF7309"
                                                    ></stop>
                                                </linearGradient>
                                                <linearGradient
                                                    id="SVGID_slots2"
                                                    gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                    gradientUnits="userSpaceOnUse"
                                                    x1="585.97"
                                                    x2="585.97"
                                                    y1="-696.746"
                                                    y2="-667.894"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stop-color="#FF9220"
                                                    ></stop>
                                                    <stop
                                                        offset=".389"
                                                        stop-color="#FFA82C"
                                                    ></stop>
                                                    <stop
                                                        offset=".443"
                                                        stop-color="#FCCB8E"
                                                    ></stop>
                                                    <stop
                                                        offset=".493"
                                                        stop-color="#FFD38A"
                                                    ></stop>
                                                    <stop
                                                        offset="1"
                                                        stop-color="#FFCC63"
                                                    ></stop>
                                                </linearGradient>
                                                <linearGradient
                                                    id="SVGID_slots3"
                                                    gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                    gradientUnits="userSpaceOnUse"
                                                    x1="585.97"
                                                    x2="585.97"
                                                    y1="-696.746"
                                                    y2="-667.894"
                                                >
                                                    <stop
                                                        offset="0"
                                                        stop-color="#FF9220"
                                                    ></stop>
                                                    <stop
                                                        offset=".389"
                                                        stop-color="#FFA82C"
                                                    ></stop>
                                                    <stop
                                                        offset=".443"
                                                        stop-color="#FCCB8E"
                                                    ></stop>
                                                    <stop
                                                        offset=".493"
                                                        stop-color="#FFD38A"
                                                    ></stop>
                                                    <stop
                                                        offset="1"
                                                        stop-color="#FFCC63"
                                                    ></stop>
                                                </linearGradient>
                                            </svg>
                                            <!-- Favorites category, shown if there are favorite games -->
                                            <li
                                                v-if="
													appComponent.myListFavoriteGame.length > 0 &&
													!openSearchv3
												"
                                                class="category-list"
                                                @click="selectCategoryFav()"
                                            >
                                                <div class="category-icon">
                                                    <svg
                                                        height="45px"
                                                        version="1.1"
                                                        viewBox="0 0 115 115"
                                                        width="45px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="SVGID_slots"
                                                                gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                                gradientUnits="userSpaceOnUse"
                                                                x1="585.97"
                                                                x2="585.97"
                                                                y1="-696.746"
                                                                y2="-667.894"
                                                            >
                                                                <stop
                                                                    offset="0"
                                                                    stop-color="#FF9220"
                                                                ></stop>
                                                                <stop
                                                                    offset=".389"
                                                                    stop-color="#FFA82C"
                                                                ></stop>
                                                                <stop
                                                                    offset=".443"
                                                                    stop-color="#FCCB8E"
                                                                ></stop>
                                                                <stop
                                                                    offset=".493"
                                                                    stop-color="#FFD38A"
                                                                ></stop>
                                                                <stop
                                                                    offset="1"
                                                                    stop-color="#FFCC63"
                                                                ></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g
                                                            id="favoritos"
                                                            fill="none"
                                                            fill-rule="evenodd"
                                                            stroke="none"
                                                            stroke-width="1"
                                                        >
                                                            <path
                                                                id="Shape"
                                                                d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                                                                stroke="#787f90"
                                                                stroke-width="4"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="text-neutral">{{ $t('Favoritos') }}</div>
                                            </li>
                                            <ng-container>
                                                <!-- Live bingos category, shown if bingos are available -->
                                                <li
                                                    v-if="
                            appComponent.config.bingos != undefined &&
                            appComponent.config.bingos[appComponent.country] != undefined &&
                            appComponent.config.bingos[appComponent.country].lobby != undefined &&
                            appComponent.config.bingos[appComponent.country].lobby
                          "
                                                    class="category-list"
                                                    @click="goToLobby()"
                                                >
                                                    <div
                                                        class="category-icon"
                                                        v-html="iconBingo"
                                                    ></div>
                                                    <div class="category-title text-neutral">
                                                        {{
                                                            $t('Bingos en vivo')
                                                        }}
                                                    </div>
                                                </li>
                                                <!-- Dynamic category list based on available categories -->
                                                <li
                                                    v-for="category in categories"
                                                    class="category-list"
                                                    v-bind:class="[
														{
															active:
																selections
																	.category
																	.id ===
																category.id,
														},
														category.title,
													]"
                                                    @click="
														selectCategory(
															category
														);
														typeBingo = 1;
														appComponent.gAnalytics(
															'category',
															category.title
														);
													"
                                                >
                                                    <div
                                                        class="category-icon"
                                                        v-html="category.icon"
                                                    ></div>
                                                    <div class="category-title text-neutral">
                                                        {{ $t(category.title) }}
                                                    </div>
                                                </li>
                                            </ng-container>
                                            <!-- All games category, shown if there are categories -->
                                            <li
                                                v-if="categoriesLength > 0"
                                                class="category-list all-games"
                                                v-bind:class="{
													active:
														selections.category
															.id === 'all',
												}"
                                                @click="
													selectCategory({
														id: 'all',
														slug: 'todos',
													});
                          typeBingo = 1;
													appComponent.gAnalytics(
														'category',
														'Todos los juegos'
													);
												"
                                            >
                                                <div class="category-icon text-primary">
                                                    <svg
                                                        height="45px"
                                                        version="1.1"
                                                        viewBox="0 0 115 115"
                                                        width="45px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="SVGID_slots2"
                                                                gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                                gradientUnits="userSpaceOnUse"
                                                                x1="585.97"
                                                                x2="585.97"
                                                                y1="-696.746"
                                                                y2="-667.894"
                                                            >
                                                                <stop
                                                                    offset="0"
                                                                    stop-color="#905cc9"
                                                                ></stop>
                                                                <stop
                                                                    offset=".389"
                                                                    stop-color="#905cc9"
                                                                ></stop>
                                                                <stop
                                                                    offset=".443"
                                                                    stop-color="#905cc9"
                                                                ></stop>
                                                                <stop
                                                                    offset=".493"
                                                                    stop-color="#905cc9"
                                                                ></stop>
                                                                <stop
                                                                    offset="1"
                                                                    stop-color="#905cc9"
                                                                ></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g
                                                            id="todos"
                                                            fill="none"
                                                            fill-rule="evenodd"
                                                            stroke="none"
                                                            stroke-width="1"
                                                        >
                                                            <path
                                                                id="Shape"
                                                                d="M97.946,76.396 C94.598,76.396 91.884,73.665 91.884,70.297 C91.884,66.929 94.598,64.198 97.946,64.198 C101.294,64.198 104.008,66.929 104.008,70.297 C104.008,73.665 101.294,76.396 97.946,76.396 Z M97.946,51.796 C94.598,51.796 91.884,49.066 91.884,45.698 C91.884,42.329 94.598,39.599 97.946,39.599 C101.294,39.599 104.008,42.329 104.008,45.698 C104.008,49.066 101.294,51.796 97.946,51.796 Z M97.946,27.197 C94.598,27.197 91.884,24.466 91.884,21.098 C91.884,17.73 94.598,15 97.946,15 C101.294,15 104.008,17.73 104.008,21.098 C104.008,24.466 101.294,27.197 97.946,27.197 Z M11,88.798 L81.963,88.798 L81.963,100.995 L11,100.995 L11,88.798 Z M11,64.198 L81.963,64.198 L81.963,76.396 L11,76.396 L11,64.198 Z M11,39.599 L81.963,39.599 L81.963,51.796 L11,51.796 L11,39.599 Z M11,15 L81.963,15 L81.963,27.197 L11,27.197 L11,15 Z M97.946,88.798 C101.294,88.798 104.008,91.528 104.008,94.896 C104.008,98.264 101.294,100.995 97.946,100.995 C94.598,100.995 91.884,98.264 91.884,94.896 C91.884,91.528 94.598,88.798 97.946,88.798 Z"
                                                                stroke="currentColor"
                                                                stroke-width="3"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="text-neutral">
                                                    {{ $t('Todos los juegos') }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Providers navigation for type 1 -->
                                <div
                                    v-if="
										config.casino.providersType == 1 &&
										typeBingo == 1
									"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        id="menuRightProviders"
                                        class="button float-right relative block right-0 w-7 py-6 text-center bg-gray-500 -top-3 -right-1 rounded-l-3xl shadow-md"
                                    >
										<div class="dropdown dropdown-end">
											<div
                                                class="p-0 normal-case btn-ghost btn btn-xs text-lg"
                                                tabindex="0"
                                            >
												+
											</div>
											<div
                                                id="menuProviders"
                                                class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-base-100/90 text-neutral text-lg"
                                            >
												<ul class="p-4 menu compact gap-1">
													<li class="bg-base-300"
                                                        v-for="provider in providers.slice(
															10
														)"
                                                    >
														<a
                                                            tabindex="0"
                                                            @click="
																selectProvider(
																	provider.name,
																	provider.image,
																	provider.title
																);
																appComponent.gAnalytics(
																	'game_type',
																	provider.title
																);
															"
                                                        >{{
                                                                provider.title
                                                            }}</a
                                                        >
													</li>
												</ul>
											</div>
										</div>
									</span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                                    >
                                        <!-- Search input for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom cursor-pointer"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame2"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral font-bold py-2 px-7 block"
                                                v-bind:class="{
													'text-neutral bg-primary blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
                                            class="providers-list inline-block mr-1 text-center"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl font-bold py-2 px-7 block text-neutral bg-primary blob h-10"
                                            >{{
                                                    selectionsProviderFilter(
                                                        selections.provider
                                                    )
                                                }}</a
                                            >
                                        </li>
                                        <!-- Dynamic provider list -->
                                        <li
                                            v-for="provider in providers.slice(
												0,
												10
											)"
                                            v-show="
												!selections.provider ===
												provider.title
											"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-100 text-neutral font-bold py-2 px-7 block hover:blob"
                                                v-bind:class="{
													'bg-primary blob hidden':
														selections.provider ===
														provider.title,
												}"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!-- Providers navigation for type 2 -->
                                <div
                                    v-if="config.casino.providersType == 2"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        id="menuRightProviders"
                                        class="button float-right block right-0 w-7 py-6 text-center bg-casino-providers -mt-3 -right-1 rounded-l-3xl shadow-md absolute"
                                        style="z-index: 9"
                                    >
										<div class="dropdown dropdown-end">
											<div
                                                class="p-0 normal-case btn-ghost btn btn-xs text-lg btn-prov"
                                                tabindex="0"
                                                @click="openProviders()"
                                            >
												<span v-if="provOpen"> - </span>
												<span v-if="!provOpen">
													+
												</span>
											</div>
										</div>
									</span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                                    >
                                        <!-- Search input for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom cursor-pointer"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
                                                v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
                                            class="providers-list inline-block mr-1 text-center"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{
                                                    selectionsProviderFilter(
                                                        selections.provider
                                                    )
                                                }}</a
                                            >
                                        </li>
                                        <!-- Dynamic provider list -->
                                        <li
                                            v-for="provider in providers"
                                            v-show="
												!selections.provider ===
												provider.name
											"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
                                                v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ===
														provider.name,
												}"
                                            ><img
                                                :src="provider.image"
                                                alt=""
                                                class="img-prov"
                                            /></a>
                                        </li>
                                    </ul>
                                    <div
                                        class="overflow-y-auto shadow-2xl top-px h-auto w-full rounded-b-box text-neutral-content text-lg dropdown-content prov"
                                    >
                                        <ul
                                            class="left-column-casino-providers-nav mx-5 py-2 overflow-auto sm:overflow-hidden grid grid-cols-10 gap-2"
                                        >
                                            <!-- Dynamic provider list for additional providers -->
                                            <li
                                                v-for="provider in providers"
                                                class="capitalize providers-list2 inline-block mr-1 text-center"
                                            >
                                                <a
                                                    class="rounded-3xl bg-base-300 font-bold py-2 px-5 block hover:blob h-10"
                                                    tabindex="0"
                                                    @click="
														selectProvider(
															provider.name,
															provider.image,
															provider.title
														);
														openProviders();
													"
                                                ><img
                                                    :src="provider.image"
                                                    alt=""
                                                    class="img-prov"
                                                /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Providers navigation for type 3 -->
                                <div
                                    v-if="config.casino.providersType == 3"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        id="menuLeftProviders"
                                        class="cursor-pointer button float-left relative block left-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -left-1 rounded-r-3xl shadow-md"
                                        @click="leftScrollProviders()"
                                    >&lt;</span
                                    >
                                    <span
                                        id="menuRightProviders"
                                        class="cursor-pointer button float-right relative block right-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -right-1 rounded-l-3xl shadow-md"
                                        @click="rightScrollProviders()"
                                    >&gt;</span
                                    >
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-x-scroll bg-base-300"
                                    >
                                        <!-- Search input for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom w-auto"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder,appComponent.placeholder = ''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form cursor-pointer"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
                                                v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Dynamic provider list -->
                                        <li
                                            v-for="provider in providers"
                                            class="providers-list inline-block mr-1 w-auto"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-100 text-neutral font-bold py-2 px-7 block hover:blob"
                                                v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content to-neutral-content blob':
														selections.provider ===
															provider.name ||
														selections.provider ===
															provider.title,
												}"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="typeBingo == 1"
                        id="games-casino-list"
                        class="wrapper-separator-games bg-base-content"
                    >
                        <div class="all-games-casino-list">
                            <div class="all-casino-games-list-box">
                                <div>
                                    <ul class="masonry">
                                        <li
                                            v-for="game in gamesList"
                                            :class="
												' col-span-' +
												game.grid_column +
												' row-span-' +
												game.grid_row
											"
                                            class="in relative rounded-xl overflow-hidden inline-block hover:scale-105 animate__animated animate__zoomIn animate__faster"
                                        >
                                            <div class="relative w-full h-full">
                                                <div
                                                    class="z-[99] absolute w-10 h-10 top-0 right-0"
                                                >
                                                    <button
                                                        class="absolute w-10 h-10 top-0 right-0"
                                                        @click="
															$event.stopPropagation;
															toggleSaveToMyCasinoGames(
																game
															);
														"
                                                    >
                                                        <favoriteIcon
                                            v-if="
                                                appComponent.config.activeFavoritesWithBackend != undefined &&
                                                appComponent.config.activeFavoritesWithBackend == true
                                            "
                                            class="favorite-icon-view"
                                            :width="24"
                                            :height="16"
                                            :fill="appComponent.myListFavoriteGame.includes(game.id) ? '#00d30a' : '#88be86'"
                                        ></favoriteIcon>
                                        <favoriteIcon
                                            v-else-if="
                                                appComponent.config.activeFavoritesWithBackend == undefined ||
                                                appComponent.config.activeFavoritesWithBackend == false
                                            "
                                            class="favorite-icon-view"
                                            :width="24"
                                            :height="16"
                                            :fill="isFromSaved(game.id) ? '#00d30a' : '#88be86'"
                                        ></favoriteIcon>
                                                    </button>
                                                </div>
                                                <span
                                                    v-if="
														game.provider ==
														'PLAYTECH'
													"
                                                    :id="'playtech-' + game.id"
                                                    class="playtech-jackpot bg-gray-500 font-bold saturate-150 z-40 text-center"
                                                ></span>
                                                <button
                                                    :aria-label="game.name"
                                                    class="flex justify-start items-start"
                                                    @click="
														appComponent.gamesList.idSelect =
															game.id;
														appComponent.openLink = true;
														appComponent.openGame(
															game
														);
														$event.stopPropagation();
														appComponent.gAnalytics(
															'play_casino',
															{...game, action: 'getGames2'}
														);
													"
                                                >
                                                    <img
                                                        v-show="
															game.icon_2 !=
																undefined &&
															game.icon_2 !=
																null &&
															game.icon_2 != ''
														"
                                                        :class="
															'absolute w-full h-full z-20 hover:z-10' +
															' object-' +
															game.object_fit
														"
                                                        :src="game.icon_2"
                                                        alt=""
                                                    />
                                                    <div
                                                        class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute flex flex-col justify-start items-center gap-4 w-full h-full p-1 break-all"
                                                    >
                                                        <h3
                                                            class="w-[80%] text-neutral font-bold flex justify-center items-center break-words text-base capitalize whitespace-pre-wrap"
                                                        >
                                                            {{
                                                                game.name.toLowerCase()
                                                            }}
                                                        </h3>
                                                        <button
                                                            aria-label="Play"
                                                            class="bg-success w-36 text-xs text-neutral lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
                                                        >
                                                            {{
                                                                $t(
                                                                    'Jugar ahora'
                                                                )
                                                            }}
                                                        </button>
                                                    </div>
                                                    <img
                                                        v-if="
															game.TagImage !=
																undefined &&
															game.TagImage !=
																null &&
															game.TagImage !=
																''
														"
                                                        :class="[
															'absolute left-0 top-0',
															'text-black text-sm font-bold',
															'pb-[1px] z-30  w-[60px] h-[60px]',
															'object-contain flex justify-center',
															'items-center',
														]"
                                                        :src="game.TagImage"
                                                        alt="Etiqueta"
                                                        height="60"
                                                        width="60"
                                                    />
                                                    <span
                                                        v-else-if="
															game.TagText !=
																undefined &&
															game.TagText !=
																null &&
															game.TagText !=
																''
														"
                                                        :class="[
															'absolute left-0 top-0 m-1 text-black',
															'text-sm font-bold pb-[1px] z-30',
															'w-auto h-auto flex justify-center items-center',
															'max-w-2xl overflow-hidden',
														]"
                                                        v-html="game.TagText"
                                                    ></span>
                                                </button>
                                            </div>
                                        </li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                v-if="!showLoadMoreButton"
                                class="bingos-no-games-text pt-10 text-primary font-bold text-2xl"
                            >
                                <p>
                                    {{ $t('No se encontraron juegos') }}
                                </p>
                            </div>
                            <div
                                v-show="showMore"
                                class="w-28 hover:bg-primary text-primary hover:text-neutral border border-primary more-casino-games-load-b py-3 text-center cursor-pointer rounded-3xl mt-5"
                            >
                                <p
                                    v-if="showLoadMoreButton"
                                    id="loadMoreGames"
                                    class="ng-isolate-scope cursor-pointer font-bold"
                                    load-more=""
                                    @click="loadMoreGames()"
                                >
                                    <span>{{ $t('Cargar mas') }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <bingos v-if="typeBingo == 0" />
                </div>
            </div>
            <!-- Main container for the casino content, displayed only if lobbyType is 2 -->
            <div
                v-if="lobbyType == 2"
                id="casino-content "
                class="new-lobby h-full"
            >
                <!-- Casino lobby section -->
                <div id="lobby-casino bg-red-700">
                    <!-- Carousel for displaying sliders -->
                    <div class="carousel w-full relative">
                        <div class="carousel-inner w-full relative">
                            <!-- Loop through sliders to create carousel items -->
                            <div v-for="value in sliders">
                                <input
                                    id="carousel-{{value.order}}"
                                    aria-hidden="true"
                                    class="carousel-open"
                                    hidden
                                    name="carousel"
                                    type="radio"
                                />
                                <div
                                    class="carousel-item absolute opacity-0 transition-opacity duration-700"
                                >
                                    <img
                                        :alt="value.title"
                                        :src="value.url"
                                        class="w-full block"
                                    />
                                </div>
                            </div>
                            <!-- Carousel indicators for navigation -->
                            <ol class="carousel-indicators">
                                <li
                                    v-for="value in sliders"
                                    class="inline-block my-0 mx-2"
                                >
                                    <label
                                        class="carousel-bullet block cursor-pointer"
                                        for="carousel-{{value.order}}"
                                    >.</label
                                    >
                                </li>
                            </ol>
                        </div>
                    </div>
                    <!-- Overlay for big games, shown if showGame is true -->
                    <div
                        v-if="showGame"
                        class="big-games-overflow fixed top-0 w-full h-full z-20"
                        style="z-index: 9999"
                    >
                        <div class="big-game-background w-full h-full">
                            <div
                                class="big-game-contain w-full h-full"
                                class-on-scroll="scrolled,notscrolled"
                            >
                                <div
                                    class="casual-game animate__animated animate__zoomIn animate__faster table m-auto"
                                >
                                    <div
                                        class="casino-game-contain w-full table-cell text-center"
                                    >
                                        <div
                                            class="flash-game-contain text-center relative inline-block m-2 align-top"
                                        >
                                            <div
                                                class="big-game-control absolute inline-block text-right w-full right-0 float-right bg-black h-14"
                                            >
                                                <div
                                                    class="top-options inline-block"
                                                >
                                                    <!-- Deposit button, shown if deposit is allowed -->
                                                    <div
                                                        v-if="
															config.casino.inGame
																.deposit
														"
                                                        class="inline-block align-bottom"
                                                    >
                                                        <label
                                                            class="btn btn-primary w-full text-neutral"
                                                            @click="
																appComponent.getPayments()
															"
                                                        ><span
                                                            class="icon-deposit pr-3"
                                                        ></span>
                                                            {{
                                                                $t('Depositar')
                                                            }}</label
                                                        >
                                                    </div>
                                                    <!-- Close game button -->
                                                    <div
                                                        class="icon-delete fixed right-0 top-0 w-12 h-10 text-center"
                                                    >
                                                        <a
                                                            class="text-xl block my-3 relative text-center"
                                                            title="close"
                                                            @click="closeGame()"
                                                        ><span
                                                            class="icon-close"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                    <!-- Refresh button, shown if refresh is allowed -->
                                                    <div
                                                        v-if="
															config.casino.inGame
																.refresh
														"
                                                        class="icon-delete refresh inline-block w-10 h-12 text-center text-lg"
                                                    >
                                                        <a
                                                            title="Refresh"
                                                            @click="
																openGame(
																	gameSelected
																)
															"
                                                        ><span
                                                            class="icon-refresh text-neutral"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                    <!-- Favorite button, shown if favorites are allowed -->
                                                    <div
                                                        v-if="
															config.casino.inGame
																.favorite
														"
                                                        class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
                                                    >
                                                        <a
                                                            title="Add to My Games"
                                                            v-bind:class="{
																'favorite-active':
																	isFromSaved(
																		gameSelected.id
																	),
															}"
                                                            @click="
																toggleSaveToMyCasinoGames(
																	gameSelected
																)
															"
                                                        ><span
                                                            class="icon-star text-neutral"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                    <!-- Home button, shown if home is allowed -->
                                                    <div
                                                        v-if="
															config.casino.inGame
																.home
														"
                                                        class="icon-delete home inline-block w-10 h-12 text-center text-lg"
                                                    >
                                                        <a
                                                            title="home"
                                                            @click="closeGame()"
                                                        ><span
                                                            class="icon-home1 text-neutral"
                                                        ></span
                                                        ></a>
                                                    </div>
                                                </div>
                                                <div
                                                    class="div-logo-j float-left h-14"
                                                >
                                                    <img
                                                        :src="config.logo"
                                                        class="h-full py-3 px-7"
                                                    />
                                                </div>
                                            </div>
                                            <!-- Iframe for game content -->
                                            <iframe
                                                id="game-content"
                                                aspect-ratio="16:9"
                                                class="relative mt-14 bg-black inline-block"
                                                element-id=""
                                                frame-control=""
                                                initial-height=""
                                                initial-width=""
                                                ng-src=""
                                                number-of-window="1"
                                                src=""
                                                style="
													width: 90vw;
													height: 90vh;
												"
                                                allow="clipboard-read; clipboard-write"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Container for all casino games -->
                    <div class="all-casino-games-box">
                        <div class="fixed-element-parent">
                            <div
                                id="main-header-container"
                                class="fixed-nav-wrapper-casino-view"
                            >
                                <div class="search-category-nav-contain">
                                    <div
                                        class="left-column-casino-nav text-center"
                                    >
                                        <ul
                                            class="px-3 py-4 pt-8 whitespace-nowrap overflow-auto"
                                        >
                                            <!-- Favorites category, shown if there are favorite games -->
                                            <li
                                                v-if="
													myCasinoGames.length > 0 &&
													categoriesLength > 0 &&
													!openSearchv3
												"
                                                class="category-list inline-block"
                                                v-bind:class="{
													active:
														selections.category
															.id === '0',
												}"
                                                @click="selectCategoryFav()"
                                            >
                                                <div class="category-icon">
                                                    <svg
                                                        height="45px"
                                                        version="1.1"
                                                        viewBox="0 0 115 115"
                                                        width="45px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="SVGID_slots"
                                                                gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                                gradientUnits="userSpaceOnUse"
                                                                x1="585.97"
                                                                x2="585.97"
                                                                y1="-696.746"
                                                                y2="-667.894"
                                                            >
                                                                <stop
                                                                    offset="0"
                                                                    stop-color="#FF9220"
                                                                ></stop>
                                                                <stop
                                                                    offset=".389"
                                                                    stop-color="#FFA82C"
                                                                ></stop>
                                                                <stop
                                                                    offset=".443"
                                                                    stop-color="#FCCB8E"
                                                                ></stop>
                                                                <stop
                                                                    offset=".493"
                                                                    stop-color="#FFD38A"
                                                                ></stop>
                                                                <stop
                                                                    offset="1"
                                                                    stop-color="#FFCC63"
                                                                ></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g
                                                            id="favoritos"
                                                            fill="none"
                                                            fill-rule="evenodd"
                                                            stroke="none"
                                                            stroke-width="1"
                                                        >
                                                            <path
                                                                id="Shape"
                                                                d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                                                                stroke="#787f90"
                                                                stroke-width="4"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="text-neutral">{{ $t('Favoritos') }}</div>
                                            </li>
                                            <ng-container>
                                                <!-- Loop through categories to create category list -->
                                                <li
                                                    v-for="category in categories"
                                                    class="category-list inline-block px-6 cursor-pointer"
                                                    v-bind:class="[
														{
															active:
																selections
																	.category
																	.id ===
																category.id,
														},
														category.title,
													]"
                                                    @click="
														selectCategory(category)
													"
                                                >
                                                    <div
                                                        class="category-icon bg-gradient-to-t from-neutral-content to-primary-content/40 border-solid border-1 border-primary-content rounded-lg p-2 w-16 h-16 m-auto"
                                                        v-bind:class="{
															'blob-cat':
																selections
																	.category
																	.id ===
																category.id,
														}"
                                                        v-html="category.icon"
                                                    ></div>
                                                    <div
                                                        class="category-title text-neutral"
                                                    >
                                                        {{ $t(category.title) }}
                                                    </div>
                                                </li>
                                            </ng-container>
                                            <!-- All games category, shown if there are categories -->
                                            <li
                                                v-if="categoriesLength > 0"
                                                class="category-list all-games inline-block cursor-pointer"
                                                v-bind:class="{
													active:
														selections.category
															.id === 'all',
												}"
                                                @click="
													selectCategory({
														id: 'all',
														slug: 'todos',
													})
												"
                                            >
                                                <div class="category-icon">
                                                    <svg
                                                        class="m-auto w-16 h-16"
                                                        height="45px"
                                                        version="1.1"
                                                        viewBox="0 0 115 115"
                                                        width="45px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="SVGID_slots2"
                                                                gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
                                                                gradientUnits="userSpaceOnUse"
                                                                x1="585.97"
                                                                x2="585.97"
                                                                y1="-696.746"
                                                                y2="-667.894"
                                                            >
                                                                <stop
                                                                    offset="0"
                                                                    stop-color="black"
                                                                ></stop>
                                                                <stop
                                                                    offset=".389"
                                                                    stop-color="black"
                                                                ></stop>
                                                                <stop
                                                                    offset=".443"
                                                                    stop-color="black"
                                                                ></stop>
                                                                <stop
                                                                    offset=".493"
                                                                    stop-color="black"
                                                                ></stop>
                                                                <stop
                                                                    offset="1"
                                                                    stop-color="black"
                                                                ></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <g
                                                            id="todos"
                                                            fill="white"
                                                            fill-rule="evenodd"
                                                            stroke="none"
                                                            stroke-width="1"
                                                        >
                                                            <path
                                                                id="Shape"
                                                                d="M97.946,76.396 C94.598,76.396 91.884,73.665 91.884,70.297 C91.884,66.929 94.598,64.198 97.946,64.198 C101.294,64.198 104.008,66.929 104.008,70.297 C104.008,73.665 101.294,76.396 97.946,76.396 Z M97.946,51.796 C94.598,51.796 91.884,49.066 91.884,45.698 C91.884,42.329 94.598,39.599 97.946,39.599 C101.294,39.599 104.008,42.329 104.008,45.698 C104.008,49.066 101.294,51.796 97.946,51.796 Z M97.946,27.197 C94.598,27.197 91.884,24.466 91.884,21.098 C91.884,17.73 94.598,15 97.946,15 C101.294,15 104.008,17.73 104.008,21.098 C104.008,24.466 101.294,27.197 97.946,27.197 Z M11,88.798 L81.963,88.798 L81.963,100.995 L11,100.995 L11,88.798 Z M11,64.198 L81.963,64.198 L81.963,76.396 L11,76.396 L11,64.198 Z M11,39.599 L81.963,39.599 L81.963,51.796 L11,51.796 L11,39.599 Z M11,15 L81.963,15 L81.963,27.197 L11,27.197 L11,15 Z M97.946,88.798 C101.294,88.798 104.008,91.528 104.008,94.896 C104.008,98.264 101.294,100.995 97.946,100.995 C94.598,100.995 91.884,98.264 91.884,94.896 C91.884,91.528 94.598,88.798 97.946,88.798 Z"
                                                                stroke="url(#SVGID_slots2)"
                                                                stroke-width="3"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="text-neutral">
                                                    {{ $t('Todos los juegos') }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Providers navigation, shown if providersType is 1 -->
                                <div
                                    v-if="config.casino.providersType == 1"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        class="button float-right relative block right-0 w-7 py-6 text-center bg-gray-200 -top-3 -right-1 rounded-l-3xl shadow-md"
                                    >
										<div class="dropdown dropdown-end">
											<div
                                                class="p-0 normal-case btn-ghost btn btn-xs text-lg"
                                                tabindex="0"
                                            >
												+
											</div>
											<div
                                                class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-neutral/90 text-neutral-content text-lg"
                                            >
												<ul class="p-4 menu compact">
													<!-- Loop through providers to create provider list -->
													<li
                                                        v-for="provider in providers"
                                                    >
														<a
                                                            class="uppercase text-left"
                                                            tabindex="0"
                                                            @click="
																selectProvider(
																	provider.name,
																	provider.image,
																	provider.title
																);
																appComponent.gAnalytics(
																	'game_type',
																	provider.title
																);
															"
                                                        >{{
                                                                provider.title
                                                            }}</a
                                                        >
													</li>
												</ul>
											</div>
										</div>
									</span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                                    >
                                        <!-- Search bar for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom cursor-pointer"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
                                                v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
                                            class="providers-list inline-block mr-1 text-center"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{
                                                    selectionsProviderFilter(
                                                        selections.provider
                                                    )
                                                }}</a
                                            >
                                        </li>
                                        <!-- Loop through providers to create provider list -->
                                        <li
                                            v-for="provider in providers"
                                            v-show="
												!selections.provider ===
												provider.name
											"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
                                                v-bind:class="{
													'':
														selections.provider ===
														provider.name,
												}"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!-- Providers navigation, shown if providersType is 3 -->
                                <div
                                    v-if="config.casino.providersType == 3"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        id="menuLeftProviders"
                                        class="cursor-pointer button float-left relative block left-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -left-1 rounded-r-3xl shadow-md"
                                        @click="leftScrollProviders()"
                                    >&lt;</span
                                    >
                                    <span
                                        id="menuRightProviders"
                                        class="cursor-pointer button float-right relative block right-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -right-1 rounded-l-3xl shadow-md"
                                        @click="rightScrollProviders()"
                                    >&gt;</span
                                    >
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-x-scroll bg-base-300"
                                    >
                                        <!-- Search bar for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom w-auto"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
                                                v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
                                            class="providers-list inline-block mr-1 text-center"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{
                                                    selectionsProviderFilter(
                                                        selections.provider
                                                    )
                                                }}</a
                                            >
                                        </li>
                                        <!-- Loop through providers to create provider list -->
                                        <li
                                            v-for="provider in providers"
                                            v-show="
												!selections.provider ===
												provider.name
											"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-100 text-neutral font-bold py-2 px-7 block hover:blob"
                                                v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ===
														provider.name,
												}"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!-- Providers navigation, shown if providersType is 2 -->
                                <div
                                    v-if="config.casino.providersType == 2"
                                    class="providers-nav-casino closed bg-casino-providers bg-base-300"
                                >
									<span
                                        id="menuRightProviders"
                                        class="button float-right block right-0 w-7 py-6 text-center bg-casino-providers -mt-3 -right-1 rounded-l-3xl shadow-md absolute"
                                        style="z-index: 9"
                                    >
										<div class="dropdown dropdown-end">
											<div
                                                class="p-0 normal-case btn-ghost btn btn-xs text-lg btn-prov"
                                                tabindex="0"
                                                @click="openProviders()"
                                            >
												<span v-if="provOpen"> - </span>
												<span v-if="!provOpen">
													+
												</span>
											</div>
										</div>
									</span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                                    >
                                        <!-- Search bar for providers -->
                                        <li
                                            id="searchv3"
                                            class="inline-block align-bottom cursor-pointer"
                                            v-bind:class="{
												open: openSearchv3,
											}"
                                        >
                                            <div class="">
                                                <div
                                                    class="ng-pristine ng-valid"
                                                >
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
                                                        ></div>
                                                        <searchIcon
                                                            :fill="'#a7a7a7'"
                                                            :height="15"
                                                            :width="15"
                                                            class="absolute top-3 left-3"
                                                        ></searchIcon>
                                                        <input
                                                            v-show="
																openSearchv3
															"
                                                            id="SearchGame"
                                                            v-model="
																searchCommand.input
															"
                                                            :placeholder="
																$t(
																	'Search a casino game...'
																)
															"
                                                            :title="
																$t(
																	'Buscar un juego...'
																)
															"
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            trans=""
                                                            type="text"
                                                            @blur="
																appComponent.placeholder =
																	appComponent.ph
															"
                                                            @input="
																debouncedSearch
															"
                                                        />
                                                        <div
                                                            v-show="
																showSearchCommandResults
															"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class="search-results-container ng-hide"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                        >
                                                            <div
                                                                class="search-results-inner casino"
                                                            >
                                                                <div
                                                                    class="arrow-sport"
                                                                ></div>
                                                                <h3 trans="">
                                                                    {{
                                                                        $t(
                                                                            'Search results'
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    class="ng-isolate-scope"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="openSearchv3"
                                                    class="closed-popup-form"
                                                    @click="CloseSearchV3()"
                                                >
                                                    <IconClose
                                                        :fill="'#a7a7a7'"
                                                        class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
                                                        @click="CloseSearchV3()"
                                                    ></IconClose>
                                                </div>
                                            </div>
                                        </li>
                                        <!-- All providers button -->
                                        <li
                                            v-if="providersLength > 0"
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            @click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
                                                v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
                                            >{{
                                                    $t('Todos los proveedores')
                                                }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
                                            class="providers-list inline-block mr-1 text-center"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{
                                                    selectionsProviderFilter(
                                                        selections.provider
                                                    )
                                                }}</a
                                            >
                                        </li>
                                        <!-- Loop through providers to create provider list -->
                                        <li
                                            v-for="provider in providers"
                                            v-show="
												!selections.provider ===
												provider.name
											"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
                                                v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ===
														provider.name,
												}"
                                            ><img
                                                :src="provider.image"
                                                alt=""
                                                class="img-prov"
                                            /></a>
                                        </li>
                                    </ul>
                                    <div
                                        class="overflow-y-auto shadow-2xl top-px h-auto w-full rounded-b-box text-neutral-content text-lg dropdown-content prov"
                                    >
                                        <ul
                                            class="left-column-casino-providers-nav mx-5 py-2 overflow-auto sm:overflow-hidden grid grid-cols-10 gap-2"
                                        >
                                            <!-- Loop through providers to create provider list -->
                                            <li
                                                v-for="provider in providers"
                                                class="capitalize providers-list2 inline-block mr-1 text-center"
                                            >
                                                <a
                                                    class="rounded-3xl bg-base-300 font-bold py-2 px-5 block hover:blob h-10"
                                                    tabindex="0"
                                                    @click="
														selectProvider(
															provider.name,
															provider.image,
															provider.title
														);
														openProviders();
													"
                                                ><img
                                                    :src="provider.image"
                                                    alt=""
                                                    class="img-prov"
                                                /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Container for the list of casino games -->
                    <div id="games-casino-list bg-base-content" class="wrapper-separator-games">
                        <div class="mt-2"></div>
                        <div class="all-games-casino-list">
                            <div class="all-casino-games-list-box">
                                <div>
                                    <ul
                                        class="masonry grid md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-7 grid-cols-2 gap-4 p-4 auto-rows-fr auto-cols-fr pt-7 grid-flow-row-dense w-full"
                                    >
                                        <!-- Placeholder for loading games -->
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-top"
                                        ></li>
                                        <!-- Loop through games to create game list -->
                                        <li
                                            v-for="game in gamesList"
                                            class="list-games-casino-view-b list-game-width- columns-{{game.columns}} animate__animated animate__zoomIn animate__faster rounded-xl overflow-hidden games-aspect c-subscribe-box col-span-{{game.columns}} row-span-{{game.rows}}"
                                            v-bind:class="[
												{
													'c-box-rgb':
														game.isBorderNeon,
												},
												'rows-' + game.rows,
											]"
                                            @click="
												gamesList.idSelect = game.id
											"
                                        >
                                            <div v-if="false" class="rainbow">
                                                <span></span><span></span>
                                            </div>
                                            <div class="w-full h-full">
                                                <a
                                                    @click="
														openGame(game);
														$event.stopPropagation();
													"
                                                >
                                                    <p
                                                        class="game-img-box-b w-full h-full m-0 bg-cover bg-center c-preview rounded-xl"
                                                        v-bind:style="{
															'background-image':
																'url(' +
																game.icon_3 +
																')',
														}"
                                                    ></p>
                                                    <div
                                                        class="casino-resize-buttons absolute top-2 w-full h-full text-center"
                                                        style="
															display: none;
															pointer-events: none;
															width: 100%;
															opacity: 0.8;
														"
                                                    >
														<span
                                                            v-if="
																game.provider ==
																'PLAYTECH'
															"
                                                            :id="
																'playtech-' +
																game.id
															"
                                                            class="playtech-jackpot"
                                                        ></span>
                                                        <p
                                                            class="game-name-b-favorite text-neutral font-bold mb-0 mt-5"
                                                        >
															<span
                                                                :title="
																	game.name
																"
                                                            >{{
                                                                    game.name
                                                                }}</span
                                                            >
                                                            <i
                                                                class="favorite-icon-view"
                                                                v-bind:class="{
																	active: isFromSaved(
																		game.id
																	),
																}"
                                                                @click="
																	toggleSaveToMyCasinoGames(
																		game
																	)
																"
                                                            ></i>
                                                        </p>
                                                        <button
                                                            class="btn-play bg-primary-content text-neutral rounded-full font-bold py-2 px-7 uppercase"
                                                            style=""
                                                        >
															<span>{{
                                                                    $t(
                                                                        'Juegue ahora'
                                                                    )
                                                                }}</span>
                                                        </button>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <!-- Placeholder for loading games -->
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                        <li
                                            class="list-games-casino-view-b preload-game-bottom"
                                        ></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Message shown if no games are found -->
                            <div
                                v-if="showLoadMoreButton"
                                class="bingos-no-games-text text-center pt-10 text-primary font-bold text-2xl"
                            >
                                <p>
                                    {{ $t('No se encontraron juegos') }}
                                </p>
                            </div>
                            <!-- Load more games button -->
                            <div
                                v-show="showMore"
                                class="more-casino-games-load-b w-full text-center pt-5"
                            >
                                <p
                                    v-if="showLoadMoreButton"
                                    id="loadMoreGames"
                                    class="btn btn-primary text-neutral rounded-full"
                                    load-more=""
                                    @click="loadMoreGames()"
                                >
                                    <span>{{ $t('Cargar mas') }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Disabled casino wrapper if casino is not enabled -->
        <div v-if="!appComponent.casinoEnabled" id="casino-wrapper-disabled">
            <div class="container-alert">
                <div class="money-img">
                    <img
                        alt="money"
                        src="https://images.virtualsoft.tech/site/money.png"
                    />
                </div>
                <div class="message-alert">
                    <div class="close">
                        <RouterLink :to="config.baseUrlFx"
                        ><i class="fa fa-times"></i
                        ></RouterLink>
                    </div>
                    <i class="fa fa-mobile"></i>
                    <p>
                        {{
                            $t(
                                '¡No es posible jugar desde este punto de venta! '
                            )
                        }}
                    </p>
                    <p>
                        {{
                            $t(
                                'Te invitamos a jugar desde su dispositivo móvil '
                            )
                        }}
                    </p>
                </div>
                <div class="money-img-two">
                    <img
                        alt="money"
                        src="https://images.virtualsoft.tech/site/money-two.png"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Disabled casino wrapper for specific layouts -->
    <div
        v-if="
			!appComponent.casinoEnabled &&
			config.layout != undefined &&
			(config.layout == 3 ||
				config.layout == 4 ||
				config.layout == 5 ||
				config.layout == 7) &&
			!appComponent.contingencyCasino
		"
        id="casino-wrapper-disabled"
    >
        <div class="container-alert">
            <div class="money-img">
                <img
                    alt="money"
                    src="https://images.virtualsoft.tech/site/money.png"
                />
            </div>
            <div class="message-alert">
                <div class="close">
                    <RouterLink :to="config.baseUrlFx"
                    ><i class="fa fa-times"></i
                    ></RouterLink>
                </div>
                <i class="fa fa-mobile"></i>
                <p>
                    {{ $t('¡No es posible jugar desde este punto de venta! ') }}
                </p>
                <p>
                    {{ $t('Te invitamos a jugar desde su dispositivo móvil ') }}
                </p>
            </div>
            <div class="money-img-two">
                <img
                    alt="money"
                    src="https://images.virtualsoft.tech/site/money-two.png"
                />
            </div>
        </div>
    </div>
    <!-- Conditional rendering of casino3 component based on layout and casino status -->
    <casino3
        v-if="
			config.layout != undefined &&
			(config.layout == 3 ||
				config.layout == 4 ||
				config.layout == 5 ||
				appComponent.config.layout == 6 ||
				config.layout == 7) &&
			!appComponent.contingencyCasino &&
			appComponent.casinoEnabled
		"
    />
</template>
<style scoped>
/* Styles for the old lobby casino section */
.old-lobby #lobby-casino {
    height: 100%; /* Full height */
	overflow: hidden; /* Hide overflow */
	background-size: contain; /* Background size */
}

/* Styles for the new lobby */
.new-lobby {
    background: #000616; /* Dark background color */
}

/* Category icon styles */
.old-lobby .category-icon {
    color: hsl(var(--p)); /* Icon color */
	width: 40px; /* Icon width */
	margin: 0 auto; /* Center icon */
	height: 50px; /* Icon height */
}

/* Category list item styles */
.old-lobby li.category-list {
	float: none; /* No float */
    display: inline-block; /* Inline block display */
	box-sizing: border-box; /* Box sizing */
	color: hsl(var(--n)); /* Text color */
	font: 13px/16px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	transition: color 250ms; /* Color transition */
	white-space: nowrap; /* No wrapping */
	text-overflow: ellipsis; /* Ellipsis for overflow */
	overflow: hidden; /* Hide overflow */
	padding: 0 2%; /* Padding */
    margin-bottom: 5px; /* Bottom margin */
}

/* Left column navigation styles */
.old-lobby .left-column-casino-nav {
	text-align: center; /* Center text */
	padding: 20px; /* Padding */
}

/* Game view styles for two rows */
.old-lobby .list-games-casino-view-b.rows-2 {
	grid-area: span 2 / span 2 / auto / auto; /* Grid area */
    width: 100% !important; /* Full width */
    height: 100% !important; /* Full height */
}

/* Flex control navigation styles */
.old-lobby #lobby-casino .flex-control-nav {
	max-width: 200px; /* Max width */
    display: inline-table; /* Inline table display */
	left: calc(50% - 100px); /* Center positioning */
    background: #787f90 d1; /* Background color */
    padding: 4px; /* Padding */
    border-radius: 41px; /* Rounded corners */
}

/* Masonry list styles */
.old-lobby ul.masonry {
    padding-top: 15px; /* Top padding */
}

/* Closed providers navigation styles */
.old-lobby .providers-nav-casino.closed {
	animation: provider-closed-animate-b 280ms ease; /* Animation */
}

/* Preload game styles */
.old-lobby li.list-games-casino-view-b.preload-game-top,
.old-lobby li.list-games-casino-view-b.preload-game-bottom {
    background: #787f90 26; /* Background color */
	-webkit-animation: pulset 3s infinite ease-in-out; /* Animation */
	-o-animation: pulst2 3s infinite ease-in-out; /* Animation */
	-ms-animation: pulset 3s infinite ease-in-out; /* Animation */
	-moz-animation: pulset 3s infinite ease-in-out; /* Animation */
	animation: pulset 3s infinite ease-in-out; /* Animation */
}

/* Media query for small screens */
@media screen and (max-width: 550px) {
	/* Styles for small screens can be added here */
}

/* All casino games list box styles */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
    width: 100%; /* Full width */
	box-sizing: border-box; /* Box sizing */
}

/* All games casino list styles */
.old-lobby .all-games-casino-list {
	box-sizing: border-box; /* Box sizing */
	width: 100%; /* Full width */
    padding: 0; /* No padding */
	min-height: 750px; /* Minimum height */
	margin-bottom: 10px; /* Bottom margin */
}

/* Grid styles for games list */
.old-lobby .all-casino-games-list-box > div > ul {
	display: grid !important; /* Grid display */
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Responsive columns */
	grid-gap: 16px; /* Gap between grid items */
	grid-auto-rows: minmax(129px, auto); /* Auto rows */
	grid-auto-flow: dense; /* Dense grid flow */
}

/* Game view styles */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
    width: 100% !important; /* Full width */
    height: 100% !important; /* Full height */
    border-radius: 6px; /* Rounded corners */
}

/* Game image box before pseudo-element */
.old-lobby .game-img-box-b:before {
	content: ''; /* Empty content */
    display: block; /* Block display */
	position: absolute; /* Absolute positioning */
	top: 0; /* Top position */
	left: 0; /* Left position */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
	z-index: 88; /* Z-index */
    background: #171a22 ed; /* Background color */
	opacity: 0; /* Initial opacity */
	transition: opacity 0.8s; /* Opacity transition */
}

/* Game image box styles */
.old-lobby .game-img-box-b {
	float: left; /* Float left */
    width: 100%; /* Full width */
	background-size: cover; /* Cover background */
	background-repeat: no-repeat; /* No repeat */
	background-position: 50% 50%; /* Center background */
	height: 114px; /* Height */
	box-sizing: border-box; /* Box sizing */
	position: relative; /* Relative positioning */
    display: block; /* Block display */
}

/* Game view styles with animations */
.old-lobby
	.deposit-alert-contain.casino
	.games-slider
	.all-games-casino-list
	ul
	li.list-games-casino-view-b,
.old-lobby .list-games-casino-view-b,
.old-lobby .save-games-contain .games-slider ul > .list-games-casino-view-b {
	float: left; /* Float left */
	width: 20%; /* Width */
	height: auto; /* Auto height */
	box-sizing: border-box; /* Box sizing */
    display: block; /* Block display */
	margin: 0 5px 5px 0; /* Margin */
	animation: popup-enter 0.3s ease-in-out; /* Animation */
	transform: translate3d(0, 0, 0); /* 3D transform */
}

/* Wrapper separator styles */
.old-lobby .wrapper-separator-games {
    width: 100%; /* Full width */
	box-sizing: border-box; /* Box sizing */
}

/* Padding for wrapper separator */
.old-lobby .wrapper-separator-games {
	padding: 0 5% !important; /* Padding */
}

/* Casino resize buttons styles */
.old-lobby .casino-resize-buttons > div {
    display: inline-block; /* Inline block display */
	height: 60px; /* Height */
}

/* Game name styles */
.old-lobby .deposit-alert-contain.casino .game-name-b-favorite,
.old-lobby .game-name-b-favorite {
	float: left; /* Float left */
    width: 100%; /* Full width */
	box-sizing: border-box; /* Box sizing */
	padding: 0 15px 0 8px; /* Padding */
	height: 28px; /* Height */
    background: 0 0; /* Transparent background */
	font: 12px/28px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
    font-weight: 700; /* Bold font */
    color: #fbf2df; /* Text color */
	text-decoration: none; /* No text decoration */
	white-space: unset; /* No white space */
	text-overflow: ellipsis; /* Ellipsis for overflow */
	position: relative; /* Relative positioning */
	z-index: 22; /* Z-index */
	opacity: 0; /* Initial opacity */
	transition: opacity 2s; /* Opacity transition */
	text-align: center; /* Center text */
	margin-bottom: 0; /* No bottom margin */
}

/* Favorite icon view styles */
.old-lobby .favorite-icon-view {
	width: 24px; /* Width */
	height: 16px; /* Height */
	position: absolute; /* Absolute positioning */
	right: 0; /* Right position */
	top: 6px; /* Top position */
	font: 14px/16px FontAwesome; /* Font settings */
	color: #88be86; /* Icon color */
	font-style: normal; /* Normal font style */
	text-decoration: none; /* No text decoration */
	z-index: 88; /* Z-index */
	transition: color 250ms; /* Color transition */
	display: block; /* Block display */
	text-align: center; /* Center text */
}

/* Active and hover states for favorite icon */
svg.favorite-icon-view.active,
svg.favorite-icon-view:hover {
	color: #00d30a; /* Active color */
}

/* Button span styles */
.old-lobby .casino-resize-buttons > div button span {
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	display: block; /* Block display */
	overflow: hidden; /* Hide overflow */
	text-overflow: ellipsis; /* Ellipsis for overflow */
	padding: 0 12px; /* Padding */
	box-sizing: border-box; /* Box sizing */
}

/* Favorite icon before pseudo-element */
.old-lobby .favorite-icon-view:before {
	content: '\f005'; /* FontAwesome content */
}

/* Button styles */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Width */
	font: 12px/29px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	margin: 0 auto; /* Center button */
}

/* Button height and display */
.old-lobby .casino-resize-buttons > div button {
	height: 30px; /* Height */
	display: block; /* Block display */
	width: 100%; /* Full width */
	padding: 0; /* No padding */
	border: 0; /* No border */
	-webkit-border-radius: 5px; /* Rounded corners */
	-moz-border-radius: 5px; /* Rounded corners */
	border-radius: 5px; /* Rounded corners */
	opacity: 0; /* Initial opacity */
	transition: opacity 500ms; /* Opacity transition */
	background: linear-gradient(to bottom, #00ff14, #006208); /* Background gradient */
	font-weight: bold !important; /* Bold font */
	color: white; /* Text color */
	font: 12px/30px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	text-transform: uppercase; /* Uppercase text */
	cursor: pointer; /* Pointer cursor */
}

/* Button styles repeated */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Width */
	font: 12px/29px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	margin: 0 auto; /* Center button */
}

/* Casino resize buttons container styles */
.old-lobby .casino-resize-buttons {
	display: block; /* Block display */
	width: 100%; /* Full width */
	position: absolute; /* Absolute positioning */
	height: 60px; /* Height */
	text-align: center; /* Center text */
	top: 0; /* Top position */
	left: 0; /* Left position */
	right: 0; /* Right position */
	margin: 0; /* No margin */
	z-index: 90; /* Z-index */
}

/* Hover effects for game view */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
	opacity: 1; /* Show on hover */
}

/* Margin adjustments on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
	margin-bottom: 35px !important; /* Bottom margin */
}

/* Transform on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
	transform: translateX(0); /* Reset transform */
}

/* Border color on hover */
.old-lobby .list-games-casino-view-b:hover > a {
	border-color: #fea402; /* Border color */
}

/* Play now game styles on hover */
.old-lobby .list-games-casino-view-b:hover .play-now-game-b > span {
	transform: translate3d(0, 0, 0); /* Reset transform */
	opacity: 1; /* Show on hover */
}

/* Game name color on hover */
.old-lobby .list-games-casino-view-b:hover .game-name-b-favorite {
	color: white; /* Text color */
}

/* Hover effects for favorite game name */
.old-lobby
	.list-games-casino-view-b:hover
	.casino-resize-buttons
	> div
	.game-name-b-favorite,
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button,
.old-lobby .list-games-casino-view-b:hover > a > .game-img-box-b:before {
	opacity: 1; /* Show on hover */
}

/* Game view styles for two rows */
.old-lobby .list-games-casino-view-b.rows-2 {
	grid-column: span 2; /* Grid column span */
	grid-row: span 2; /* Grid row span */
	width: 100% !important; /* Full width */
	height: 100% !important; /* Full height */
}

/* Pulse animation keyframes */
@keyframes pulseCasino {
	0% {
		transform: scale(1); /* Initial scale */
		box-shadow: 0 0 0 0 #ff9600; /* Initial shadow */
	}
	70% {
		transform: scale(1); /* Scale */
		box-shadow: 0 0 0 7px #0c1019 0; /* Shadow */
	}
	100% {
		transform: scale(1); /* Final scale */
		box-shadow: 0 0 0 0 #ff9600 40; /* Final shadow */
	}
}

/* Neon effect styles */
.old-lobby .neon1 {
	border: 2px solid #dc8200; /* Border color */
	animation: pulseCasino 2s infinite; /* Animation */
}

/* Media query for medium screens */
@media screen and (max-width: 1260px) {
	.old-lobby .all-games-casino-list {
		padding-left: 0; /* No left padding */
	}
}

/* Media query for small screens */
@media screen and (max-width: 700px) {
	.old-lobby {
		/* Additional styles can be added here */
	}
	.old-lobby .wrapper-separator-games {
		float: none; /* No float */
		margin-top: 20px; /* Top margin */
		overflow-y: scroll; /* Scrollable overflow */
		height: calc(100% - 110px); /* Height calculation */
	}
	.old-lobby .left-column-casino-nav > ul > li {
		/* Additional styles can be added here */
	}
}

/* Media query for very small screens */
@media only screen and (max-width: 416px) {
	.old-lobby .list-game-width-100,
	.old-lobby .list-games-casino-view-b.rows-2 {
		grid-column: span 1; /* Grid column span */
		grid-row: span 1; /* Grid row span */
	}
	.old-lobby .all-casino-games-list-box > div > ul {
		grid-auto-rows: minmax(120px, auto); /* Auto rows */
		grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); /* Responsive columns */
	}
}

/* Poker category styles */
.old-lobby .category-list.Poker .st0 {
	fill: #d8d6ce; /* Fill color */
}
.old-lobby .category-list.Poker .st1 {
	fill: #eae9e5; /* Fill color */
}
.old-lobby .category-list.Poker .st2 {
	fill: #b99028; /* Fill color */
}
.old-lobby .category-list.Poker .st3 {
	fill: #656d78; /* Fill color */
}
.old-lobby .category-list.Poker .st4 {
	fill: #af8527; /* Fill color */
}

/* Resize buttons for rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
	height: 100%; /* Full height */
}
.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
	height: 100% !important; /* Full height */
}
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
	width: 100%; /* Full width */
}
.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
	width: 25px; /* Width */
	height: 25px; /* Height */
	font-size: 30px; /* Font size */
	right: 5px; /* Right position */
}

/* Button margin for rows */
.old-lobby
	.list-games-casino-view-b.rows-2
	.casino-resize-buttons
	> div
	button {
	margin-top: 20%; /* Top margin */
	display: inline-block; /* Inline block display */
}

/* Search input transition */
.old-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Transition */
	transition: width 2s; /* Transition */
	width: 84px; /* Width */
}

/* Left column navigation styles */
.old-lobby .left-column-casino-nav > ul {
	width: 100%; /* Full width */
	box-sizing: border-box; /* Box sizing */
	display: block; /* Block display */
	white-space: nowrap; /* No wrapping */
	padding-top: 10px; /* Top padding */
}

/* Overflow styles for left column */
.old-lobby .left-column-casino-nav > ul {
	overflow-x: auto; /* Horizontal overflow */
	overflow-y: hidden; /* No vertical overflow */
}

/* List item styles in left column */
.old-lobby .left-column-casino-nav > ul > li {
	float: none; /* No float */
	display: inline-block; /* Inline block display */
	box-sizing: border-box; /* Box sizing */
	color: #fbf2df; /* Text color */
	font: 13px/15px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	transition: color 250ms; /* Color transition */
	white-space: nowrap; /* No wrapping */
	text-overflow: ellipsis; /* Ellipsis for overflow */
	overflow: hidden; /* Hide overflow */
	padding: 0 2%; /* Padding */
	margin-bottom: 5px; /* Bottom margin */
	vertical-align: top; /* Vertical alignment */
	cursor: pointer; /* Pointer cursor */
}

/* Search block styles */
.old-lobby #searchv3 .block-search {
	height: 35px !important; /* Height */
	min-width: 55px !important; /* Minimum width */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width */
	max-width: 100% !important; /* Max width */
	margin: 0 !important; /* No margin */
	border: 1px solid #a7a7a7; /* Border */
	border-radius: 40px; /* Rounded corners */
}

/* Block search styles */
.old-lobby .block-search {
	padding: 0; /* No padding */
	min-width: 35px; /* Minimum width */
	margin: 5px 5px 0 0; /* Margin */
	height: 30px; /* Height */
	border-radius: 3px; /* Rounded corners */
	background: #fff; /* White background */
}

/* Block search positioning */
.old-lobby .block-search {
	float: right; /* Float right */
	position: relative; /* Relative positioning */
	z-index: 40; /* Z-index */
	text-align: right; /* Right text alignment */
	max-width: 250px; /* Max width */
}

/* Search input styles */
.old-lobby li#searchv3 input#SearchGame {
	transition: none !important; /* No transition */
	cursor: pointer !important; /* Pointer cursor */
}

/* Hidden search input */
.old-lobby input#SearchGame.ng-hide {
	width: 0; /* Width */
	transition: width 1s; /* Width transition */
	display: block !important; /* Block display */
	float: right; /* Float right */
	border: 0; /* No border */
}

/* Text input styles */
.old-lobby .block-search input[type='text'] {
	color: #686767; /* Text color */
	font: 12px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	margin: 0; /* No margin */
	padding: 8px 5px 8px 30px; /* Padding */
	background: 0 0; /* Transparent background */
	position: relative; /* Relative positioning */
	z-index: 22; /* Z-index */
}

/* Text input width */
.old-lobby .block-search input[type='text'] {
	width: 0; /* Width */
	border: 0; /* No border */
	vertical-align: middle; /* Vertical alignment */
	transition: width 600ms; /* Width transition */
	border-radius: 3px; /* Rounded corners */
}

/* Open search input styles */
.old-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width */
	padding: 0 0 0 60px !important; /* Padding */
	height: 100%; /* Full height */
	color: #fff; /* Text color */
}

/* Search results inner styles */
.new-lobby .search-results-inner {
	float: left; /* Float left */
	width: 100%; /* Full width */
	padding: 10px 0 0; /* Padding */
	position: relative; /* Relative positioning */
	z-index: 999; /* Z-index */
	background: #fff; /* White background */
	border-radius: 2px; /* Rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Box shadow */
}

/* Arrow styles for search results */
.new-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Top position */
}
.new-lobby .search-results-inner .arrow-sport {
	right: 50%; /* Right position */
}

/* Arrow styles */
.new-lobby .arrow-sport {
	width: 14px; /* Width */
	height: 11px; /* Height */
	display: block; /* Block display */
	position: absolute; /* Absolute positioning */
	right: 2px; /* Right position */
	top: -11px; /* Top position */
	z-index: 999; /* Z-index */
}

/* Heading styles for search results */
.new-lobby .search-results-inner h3 {
	font: 20px/22px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	color: #121623; /* Text color */
	text-transform: uppercase; /* Uppercase text */
}

/* Heading width and float */
.new-lobby .search-results-inner h3 {
	width: 100%; /* Full width */
	float: left; /* Float left */
	padding: 0; /* No padding */
	text-indent: 10px; /* Text indent */
	text-align: left; /* Left text alignment */
}

/* Overflow styles for various containers */
.new-lobby #result-search,
.bet-container,
.block-more-event,
.clock .open-lang ul,
.conteiner-goals .hover-sp,
.deposit-alert-contain.casino .games-slider ul,
.express-contain,
.fedback-info ul li textarea,
.form-contain.deposit .form-sign-in,
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
	overflow-y: auto; /* Vertical overflow */
	overflow-x: hidden; /* No horizontal overflow */
	scrollbar-track-color: #0c0e14; /* Scrollbar track color */
	scrollbar-shadow-color: #0c0e14; /* Scrollbar shadow color */
	scrollbar-base-color: #373f4e; /* Scrollbar base color */
	scrollbar-arrow-color: #373f4e; /* Scrollbar arrow color */
}

/* Search results inner styles for casino */
.new-lobby .search-results-inner.casino #casino-result-search {
	float: left; /* Float left */
	width: 100%; /* Full width */
	max-height: 450px; /* Max height */
	overflow-y: auto; /* Vertical overflow */
	overflow-x: hidden; /* No horizontal overflow */
	margin: 10px 0 0; /* Margin */
}

/* No results styles */
.new-lobby .search-no-results {
	font: 16px/38px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding */
	box-sizing: border-box; /* Box sizing */
}

/* No results float and width */
.new-lobby .search-no-results {
	float: left; /* Float left */
    width: 100%; /* Full width */
	text-align: left; /* Left text alignment */
}

/* Media query for small screens */
@media screen and (max-width: 550px) {
	.new-lobby li#searchv3 {
		width: 66px; /* Width */
	}
	.new-lobby li.providers-list {
		width: auto; /* Auto width */
	}
	.new-lobby li#searchv3.open {
		width: 60% !important; /* Full width */
	}
    }

/* Open search styles */
.new-lobby li#searchv3.open {
	width: 30%; /* Width */
}

/* Hover styles for search */
.new-lobby li#searchv3:hover {
	text-shadow: none !important; /* No text shadow */
    }

/* Closed popup form styles */
.new-lobby li#searchv3 .closed-popup-form {
	float: right; /* Float right */
	position: relative; /* Relative positioning */
	top: 0; /* Top position */
	right: 0; /* Right position */
	z-index: 1000; /* Z-index */
	margin-top: -27px; /* Top margin */
	margin-right: 14px; /* Right margin */
    }

/* RGB box styles */
.new-lobby .c-box-rgb {
	position: relative; /* Relative positioning */
	overflow: visible !important; /* Visible overflow */
	background: linear-gradient(0deg, #000, #272727); /* Background gradient */
}

/* Before and after pseudo-elements for RGB box */
.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
	content: ''; /* Empty content */
	position: absolute; /* Absolute positioning */
	left: -3px; /* Left position */
	top: -3px; /* Top position */
	background: linear-gradient(
		45deg,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000
	); /* Background gradient */
	background-size: 400%; /* Background size */
	width: calc(100% + 6px); /* Width calculation */
	height: calc(100% + 6px); /* Height calculation */
	z-index: -1; /* Z-index */
	animation: steam 20s linear infinite; /* Animation */
	border-radius: 13px; /* Rounded corners */
}

/* Steam animation keyframes */
@keyframes steam {
	0% {
		background-position: 0 0; /* Initial position */
	}
	50% {
		background-position: 400% 0; /* Mid position */
}
	100% {
		background-position: 0 0; /* Final position */
	}
}

/* After pseudo-element styles */
.new-lobby .c-box-rgb:after {
	filter: blur(5px); /* Blur effect */
}

/* Play button styles */
.new-lobby .btn-play {
	margin-top: calc(50% - 60px); /* Margin calculation */
}

/* Carousel styles */
.carousel {
	position: relative; /* Relative positioning */
}

/* Carousel inner styles */
.carousel-inner {
	position: relative; /* Relative positioning */
	overflow: hidden; /* Hide overflow */
    width: 100%; /* Full width */
}

/* Carousel open styles */
.carousel-open:checked + .carousel-item {
	position: static; /* Static positioning */
	opacity: 100; /* Full opacity */
}

/* Carousel item styles */
.carousel-item {
	position: absolute; /* Absolute positioning */
	opacity: 0; /* Initial opacity */
	-webkit-transition: opacity 0.6s ease-out; /* Transition */
	transition: opacity 0.6s ease-out; /* Transition */
}

/* Carousel item image styles */
.carousel-item img {
    display: block; /* Block display */
	height: auto; /* Auto height */
	max-width: 100%; /* Max width */
}

/* Carousel control styles */
.carousel-control {
	background: rgba(0, 0, 0, 0.28); /* Background color */
	border-radius: 50%; /* Rounded corners */
	color: #fff; /* Text color */
	cursor: pointer; /* Pointer cursor */
	display: none; /* Hidden by default */
	font-size: 40px; /* Font size */
	height: 40px; /* Height */
	line-height: 35px; /* Line height */
	position: absolute; /* Absolute positioning */
	top: 50%; /* Top position */
	-webkit-transform: translate(0, -50%); /* Center vertically */
	cursor: pointer; /* Pointer cursor */
	-ms-transform: translate(0, -50%); /* Center vertically */
	transform: translate(0, -50%); /* Center vertically */
	text-align: center; /* Center text */
	width: 40px; /* Width */
	z-index: 10; /* Z-index */
}

/* Styles for the search input when open */
.old-lobby li#searchv3.open {
    width: 100% !important; /* Forces the search input to take full width */
}

.old-lobby li#searchv3 .closed-popup-form {
    /* Aligns the closed popup form to the right */
    float: right;
    /* Positions the form relative to its normal position */
    position: relative;
    /* Sets the vertical position */
    top: 0;
    /* Sets the horizontal position */
    right: 0;
    /* Sets the stacking order of the element */
    z-index: 40;
    /* Adjusts the top margin to position the form */
    margin-top: -27px;
    /* Adjusts the right margin for spacing */
    margin-right: 14px;
}

/* Previous carousel control styles */
.carousel-control.prev {
	left: 2%; /* Left position */
}

/* Next carousel control styles */
.carousel-control.next {
	right: 2%; /* Right position */
}

/* Hover styles for carousel control */
.carousel-control:hover {
	background: rgba(0, 0, 0, 0.8); /* Background color */
	color: #aaaaaa; /* Text color */
}

/* Carousel indicators styles */
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
	display: block; /* Show indicators */
}

/* Carousel indicators container styles */
.carousel-indicators {
	list-style: none; /* No list style */
	margin: 0; /* No margin */
    padding: 0; /* No padding */
	position: absolute; /* Absolute positioning */
	bottom: 2%; /* Bottom position */
	left: 0; /* Left position */
	right: 0; /* Right position */
	text-align: center; /* Center text */
	z-index: 10; /* Z-index */
}

/* Carousel indicator item styles */
.carousel-indicators li {
    display: inline-block; /* Inline block display */
	margin: 0 5px; /* Margin */
}

/* Carousel bullet styles */
.carousel-bullet {
	color: #fff; /* Text color */
	cursor: pointer; /* Pointer cursor */
    display: block; /* Block display */
	font-size: 35px; /* Font size */
}

/* Hover styles for carousel bullet */
.carousel-bullet:hover {
	color: #aaaaaa; /* Text color */
}

/* Active carousel bullet styles */
#carousel-1:checked
	~ .control-1
	~ .carousel-indicators
	li:nth-child(1)
	.carousel-bullet,
#carousel-2:checked
	~ .control-2
	~ .carousel-indicators
	li:nth-child(2)
	.carousel-bullet,
#carousel-3:checked
	~ .control-3
	~ .carousel-indicators
	li:nth-child(3)
	.carousel-bullet {
	color: #428bca; /* Active color */
}

/* Flex casino styles */
.flex.casino {
	background: #091023; /* Background color */
}

/* Carousel inner styles for lobby */
#lobby-casino .carousel-inner {
	border-radius: 0 0 30px 30px; /* Rounded corners */
}

/* Provider image styles */
.img-prov {
	height: auto; /* Auto height */
	width: auto; /* Auto width */
	max-width: 100%; /* Max width */
	max-height: 100%; /* Max height */
	margin: auto; /* Center image */
	filter: grayscale(100%); /* Grayscale filter */
}

/* Color provider styles */
.img-prov.color {
	filter: grayscale(0%) !important; /* No grayscale */
}

/* Show dropdown styles */
.show-drop {
	opacity: 1 !important; /* Full opacity */
	visibility: visible !important; /* Visible */
	position: relative !important; /* Relative positioning */
}

/* Dropdown content styles */
.dropdown-content.prov {
	opacity: 0; /* Initial opacity */
	visibility: hidden; /* Hidden */
	position: absolute; /* Absolute positioning */
	background-color: #dfdfdf; /* Background color */
}

/* Provider list styles */
.old-lobby li.providers-list {
	width: auto; /* Auto width */
	vertical-align: middle; /* Vertical alignment */
}

/* Visible dropdown styles */
.ver-drop {
	visibility: visible !important; /* Visible */
	opacity: 1 !important; /* Full opacity */
}

/* Hide scrollbar for left column */
ul.left-column-casino-providers-nav::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}

/* Style 4 for all casino games box */
.all-casino-games-box.style4 {
	position: absolute; /* Absolute positioning */
	margin-top: -116px !important; /* Negative margin */
}

/* Fixed nav wrapper styles */
.all-casino-games-box.style4 .fixed-nav-wrapper-casino-view {
	background: linear-gradient(
		0deg,
		rgb(0 6 22) 50%,
		rgba(9, 16, 35, 0) 100%
	) !important; /* Background gradient */
}

/* Playtech jackpot styles */
.playtech-jackpot {
	width: 100%; /* Full width */
	color: white; /* Text color */
	border-radius: 4px; /* Rounded corners */
	display: block; /* Block display */
}

/* Right menu button styles */
button#menuRight {
	width: 25px; /* Width */
	padding: 45px 0; /* Padding */
	background: #262a3a; /* Background color */
	color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
	position: absolute; /* Absolute positioning */
	right: 0; /* Right position */
	display: block; /* Block display */
	z-index: 10; /* Z-index */
	height: 100%; /* Full height */
	margin-top: -5px; /* Negative margin */
	vertical-align: middle; /* Vertical alignment */
	background: -webkit-linear-gradient(
		90deg,
		rgb(20, 21, 24) 1%,
		rgb(42, 45, 58) 48%,
		rgb(17, 18, 23) 100%
	) !important; /* Background gradient */
	cursor: pointer; /* Pointer cursor */
}

/* Left menu button styles */
button#menuLeft {
	float: left; /* Float left */
	width: 25px; /* Width */
	padding: 45px 0; /* Padding */
	background: #262a3a; /* Background color */
	color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
	position: absolute; /* Absolute positioning */
	left: 0; /* Left position */
	display: block; /* Block display */
	z-index: 1; /* Z-index */
	margin-top: -5px; /* Negative margin */
	height: 100%; /* Full height */
	background: -webkit-linear-gradient(
		90deg,
		rgb(20, 21, 24) 1%,
		rgb(42, 45, 58) 48%,
		rgb(17, 18, 23) 100%
	) !important; /* Background gradient */
	cursor: pointer; /* Pointer cursor */
}

/* Disabled casino wrapper alert styles */
#casino-wrapper-disabled .message-alert {
	width: 90%; /* Width */
	margin: 0 auto; /* Center margin */
	color: #fff; /* Text color */
	text-align: center; /* Center text */
	border: 1px solid #b08200; /* Border */
	border-radius: 15px; /* Rounded corners */
	padding: 20px; /* Padding */
}

/* Money image styles */
#casino-wrapper-disabled .money-img {
	width: 70%; /* Width */
	margin: 100px auto 0; /* Center margin */
}

/* Second money image styles */
#casino-wrapper-disabled .money-img-two {
	width: 70%; /* Width */
	margin: 0 auto; /* Center margin */
}

/* Money image display styles */
#casino-wrapper-disabled .money-img img,
#casino-wrapper-disabled .money-img-two img {
	width: 100%; /* Full width */
	display: block; /* Block display */
}

/* Close icon styles */
#casino-wrapper-disabled i.fa.fa-times {
	float: right; /* Float right */
	color: white; /* Text color */
}

/* Mobile icon styles */
#casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Font size */
}

/* Media query for larger screens */
@media only screen and (min-width: 736px) {
	#casino-wrapper-disabled .message-alert {
		width: 35%; /* Width */
		margin: 0 auto; /* Center margin */
		color: white; /* Text color */
		text-align: center; /* Center text */
		border: 1px solid #b08200; /* Border */
		border-radius: 15px; /* Rounded corners */
	}
	#casino-wrapper-disabled .money-img,
	#casino-wrapper-disabled .money-img-two {
		width: 25%; /* Width */
	}
}

/* Casino content styles */
div#casino-content {
	height: 100vh; /* Full viewport height */
}

/* New lobby game image box styles */
.new-lobby .games-aspect .game-img-box-b::before {
	content: ''; /* Empty content */
	display: block; /* Block display */
	height: 0; /* Height */
	width: 0; /* Width */
	padding-bottom: calc(16 / 16 * 100%); /* Padding calculation */
}

/* New lobby preview styles */
.new-lobby .c-preview {
	background: #000; /* Background color */
	background: -moz-linear-gradient(
		-45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: -webkit-linear-gradient(
		-45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: linear-gradient(
		135deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background-size: 400% 400%; /* Background size */
	background-repeat: no-repeat; /* No repeat */
	display: flex; /* Flex display */
	width: 500px; /* Width */
	height: 500px; /* Height */
	max-width: 100vw; /* Max width */
	max-height: 100vh; /* Max height */
	justify-content: center; /* Center content */
	align-items: center; /* Center items */
	color: #fff; /* Text color */
	position: relative; /* Relative positioning */
	cursor: pointer; /* Pointer cursor */
	transition: 0.5s all; /* Transition */
}

/* Hover effect for new lobby preview */
.new-lobby .c-preview:hover {
	background-position: 100% 100% !important; /* Background position */
}

/* Blur effect on hover */
.new-lobby .c-preview:hover {
	filter: blur(10px) !important; /* Blur effect */
}

/* Animation for game view */
.new-lobby .list-games-casino-view-b {
	opacity: 0; /* Initial opacity */
	animation-name: bounceIn; /* Animation name */
	animation-duration: 450ms; /* Animation duration */
	animation-timing-function: linear; /* Timing function */
	animation-fill-mode: forwards; /* Fill mode */
	animation-delay: 2s; /* Delay */
}

/* Bounce in animation keyframes */
@keyframes bounceIn {
	0% {
		opacity: 0; /* Initial opacity */
		transform: scale(0.3) translate3d(0, 0, 0); /* Initial scale */
	}
	50% {
		opacity: 0.9; /* Mid opacity */
		transform: scale(1.1); /* Mid scale */
	}
	80% {
		opacity: 1; /* Final opacity */
		transform: scale(0.89); /* Final scale */
	}
	100% {
		opacity: 1; /* Final opacity */
		transform: scale(1) translate3d(0, 0, 0); /* Final scale */
	}
}

/* Hover styles for new lobby game view */
.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
	display: block !important; /* Show buttons */
}

/* Provider list item styles */
.new-lobby li.providers-list {
	width: calc((100% - 320px) / 6); /* Width calculation */
	vertical-align: middle; /* Vertical alignment */
}

/* Hover effect for category list */
.new-lobby .category-list:hover {
	-webkit-transform: scale(1.1); /* Scale effect */
	-ms-transform: scale(1.1); /* Scale effect */
	transform: scale(1.1); /* Scale effect */
}

/* Category list styles */
.new-lobby .category-list {
	transition: all 0.3s ease; /* Transition */
}

/* Rainbow animation styles */
.new-lobby .rainbow {
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	animation: rotate linear 8s infinite; /* Animation */
	position: absolute; /* Absolute positioning */
}

/* Rainbow span styles */
.new-lobby .rainbow span {
	display: block; /* Block display */
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	position: relative; /* Relative positioning */
	transform: translate(-50%, -50%); /* Center transform */
}

/* Rainbow span after pseudo-element */
.new-lobby .rainbow span:after {
	display: block; /* Block display */
	content: ''; /* Empty content */
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	position: absolute; /* Absolute positioning */
	left: 100%; /* Left position */
}

/* First rainbow span styles */
.new-lobby .rainbow span:first-child {
	background: #5500ff; /* Background color */
}

/* First rainbow span after pseudo-element styles */
.new-lobby .rainbow span:first-child:after {
	background: #ffb000; /* Background color */
}

/* Last rainbow span styles */
.new-lobby .rainbow span:last-child {
	background: #ff006c; /* Background color */
}

/* Last rainbow span after pseudo-element styles */
.new-lobby .rainbow span:last-child:after {
	background: #00ffdc; /* Background color */
}

/* Subscribe box styles */
.new-lobby .c-subscribe-box {
	overflow: hidden; /* Hide overflow */
	position: relative; /* Relative positioning */
	box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2); /* Box shadow */
	border-radius: 8px; /* Rounded corners */
}

/* Subscribe box wrapper styles */
.new-lobby .c-subscribe-box__wrapper {
	padding: 4px; /* Padding */
	display: flex; /* Flex display */
	flex-direction: column; /* Column direction */
	border-radius: calc(8px / 2); /* Rounded corners */
}

/* Subscribe box title styles */
.new-lobby .c-subscribe-box__title {
	font-size: 1.6rem; /* Font size */
}

/* Subscribe box description styles */
.new-lobby .c-subscribe-box__desc {
	font-size: 0.935rem; /* Font size */
	margin: 0.7rem auto 1.8rem; /* Margin */
	max-width: 240px; /* Max width */
}

/* Subscribe box form styles */
.new-lobby .c-subscribe-box__form {
	margin-top: auto; /* Top margin */
}

/* Accent form input hover styles */
.new-lobby .c-form--accent input:hover,
.c-form--accent input:active,
.c-form--accent input:focus {
	border-color: #e85f99; /* Border color */
	box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Box shadow */
}

/* Accent form submit button styles */
.new-lobby .c-form--accent [type='submit'] {
	background: #e85f99; /* Background color */
	border-color: #e85f99; /* Border color */
	color: #fff; /* Text color */
}

/* Rotate animation keyframes */
@keyframes rotate {
	0% {
		transform: rotate(0); /* Initial rotation */
	}
	100% {
		transform: rotate(360deg); /* Full rotation */
	}
}

/* Search input styles for new lobby */
.new-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Transition */
	transition: width 2s; /* Transition */
	width: 84px; /* Width */
}

/* Search block styles for new lobby */
.new-lobby #searchv3 .block-search {
	height: 35px !important; /* Height */
	min-width: 55px !important; /* Minimum width */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width */
	max-width: 100% !important; /* Max width */
	margin: 0 !important; /* No margin */
	border: 1px solid #a7a7a7; /* Border */
	border-radius: 40px; /* Rounded corners */
}

/* Block search styles for new lobby */
.new-lobby .block-search {
	padding: 0; /* No padding */
	min-width: 35px; /* Minimum width */
	margin: 5px 5px 0 0; /* Margin */
	height: 30px; /* Height */
	border-radius: 3px; /* Rounded corners */
	background: #fff; /* White background */
}

/* Block search positioning for new lobby */
.new-lobby .block-search {
	float: right; /* Float right */
	position: relative; /* Relative positioning */
	z-index: 999; /* Z-index */
	text-align: right; /* Right text alignment */
	max-width: 250px; /* Max width */
}

/* Search input styles for new lobby */
.new-lobby li#searchv3 input#SearchGame {
	transition: none !important; /* No transition */
	cursor: pointer !important; /* Pointer cursor */
}

/* Hidden search input for new lobby */
.new-lobby input#SearchGame.ng-hide {
	width: 0; /* Width */
	transition: width 1s; /* Width transition */
	display: block !important; /* Block display */
	float: right; /* Float right */
	border: 0; /* No border */
}

/* Text input styles for new lobby */
.new-lobby .block-search input[type='text'] {
	color: #686767; /* Text color */
	font: 12px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	margin: 0; /* No margin */
	padding: 8px 5px 8px 30px; /* Padding */
	background: 0 0; /* Transparent background */
	position: relative; /* Relative positioning */
	z-index: 22; /* Z-index */
}

/* Text input width for new lobby */
.new-lobby .block-search input[type='text'] {
	width: 0; /* Width */
	border: 0; /* No border */
	vertical-align: middle; /* Vertical alignment */
	transition: width 600ms; /* Width transition */
	border-radius: 3px; /* Rounded corners */
}

/* Open search input styles for new lobby */
.new-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width */
	padding: 0 0 0 60px !important; /* Padding */
	height: 100%; /* Full height */
	color: #fff; /* Text color */
}

/* Search results inner styles for new lobby */
.new-lobby .search-results-inner {
	float: left; /* Float left */
	width: 100%; /* Full width */
	padding: 10px 0 0; /* Padding */
	position: relative; /* Relative positioning */
	z-index: 999; /* Z-index */
	background: #fff; /* White background */
	border-radius: 2px; /* Rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Box shadow */
}

/* Arrow styles for search results in new lobby */
.new-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Top position */
}
.new-lobby .search-results-inner .arrow-sport {
	right: 50%; /* Right position */
}

/* Arrow styles */
.new-lobby .arrow-sport {
	width: 14px; /* Width */
	height: 11px; /* Height */
	display: block; /* Block display */
	position: absolute; /* Absolute positioning */
	right: 2px; /* Right position */
	top: -11px; /* Top position */
	z-index: 999; /* Z-index */
}

/* Heading styles for search results in new lobby */
.new-lobby .search-results-inner h3 {
	font: 20px/22px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	color: #121623; /* Text color */
	text-transform: uppercase; /* Uppercase text */
}

/* Heading width and float for new lobby */
.new-lobby .search-results-inner h3 {
	width: 100%; /* Full width */
	float: left; /* Float left */
	padding: 0; /* No padding */
	text-indent: 10px; /* Text indent */
	text-align: left; /* Left text alignment */
}

/* Overflow styles for various containers in new lobby */
.new-lobby #result-search,
.bet-container,
.block-more-event,
.clock .open-lang ul,
.conteiner-goals .hover-sp,
.deposit-alert-contain.casino .games-slider ul,
.express-contain,
.fedback-info ul li textarea,
.form-contain.deposit .form-sign-in,
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
	overflow-y: auto; /* Vertical overflow */
	overflow-x: hidden; /* No horizontal overflow */
	scrollbar-track-color: #0c0e14; /* Scrollbar track color */
	scrollbar-shadow-color: #0c0e14; /* Scrollbar shadow color */
	scrollbar-base-color: #373f4e; /* Scrollbar base color */
	scrollbar-arrow-color: #373f4e; /* Scrollbar arrow color */
}

/* Search results inner styles for new lobby */
.new-lobby .search-results-inner.casino #casino-result-search {
	float: left; /* Float left */
	width: 100%; /* Full width */
	max-height: 450px; /* Max height */
	overflow-y: auto; /* Vertical overflow */
	overflow-x: hidden; /* No horizontal overflow */
	margin: 10px 0 0; /* Margin */
}

/* No results styles for new lobby */
.new-lobby .search-no-results {
	font: 16px/38px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding */
	box-sizing: border-box; /* Box sizing */
}

/* No results float and width for new lobby */
.new-lobby .search-no-results {
	float: left; /* Float left */
	width: 100%; /* Full width */
	text-align: left; /* Left text alignment */
}

/* Media query for small screens in new lobby */
@media screen and (max-width: 550px) {
	.new-lobby li#searchv3 {
		width: 66px; /* Width */
	}
	.new-lobby li.providers-list {
		width: auto; /* Auto width */
	}
	.new-lobby li#searchv3.open {
		width: 60% !important; /* Full width */
	}
}

/* Open search styles for new lobby */
.new-lobby li#searchv3.open {
	width: 30%; /* Width */
}

/* Hover styles for search in new lobby */
.new-lobby li#searchv3:hover {
	text-shadow: none !important; /* No text shadow */
}

/* Closed popup form styles for new lobby */
.new-lobby li#searchv3 .closed-popup-form {
	float: right; /* Float right */
	position: relative; /* Relative positioning */
	top: 0; /* Top position */
	right: 0; /* Right position */
	z-index: 1000; /* Z-index */
	margin-top: -27px; /* Top margin */
	margin-right: 14px; /* Right margin */
}

/* RGB box styles for new lobby */
.new-lobby .c-box-rgb {
	position: relative; /* Relative positioning */
	overflow: visible !important; /* Visible overflow */
	background: linear-gradient(0deg, #000, #272727); /* Background gradient */
}

/* Before and after pseudo-elements for RGB box in new lobby */
.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
	content: ''; /* Empty content */
	position: absolute; /* Absolute positioning */
	left: -3px; /* Left position */
	top: -3px; /* Top position */
	background: linear-gradient(
		45deg,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000
	); /* Background gradient */
	background-size: 400%; /* Background size */
	width: calc(100% + 6px); /* Width calculation */
	height: calc(100% + 6px); /* Height calculation */
	z-index: -1; /* Z-index */
	animation: steam 20s linear infinite; /* Animation */
	border-radius: 13px; /* Rounded corners */
}

/* Steam animation keyframes for new lobby */
@keyframes steam {
	0% {
		background-position: 0 0; /* Initial position */
	}
	50% {
		background-position: 400% 0; /* Mid position */
	}
	100% {
		background-position: 0 0; /* Final position */
	}
}

/* After pseudo-element styles for new lobby */
.new-lobby .c-box-rgb:after {
	filter: blur(5px); /* Blur effect */
}

/* Play button styles for new lobby */
.new-lobby .btn-play {
	margin-top: calc(50% - 60px); /* Margin calculation */
}

/* Carousel styles for new lobby */
.carousel {
	position: relative; /* Relative positioning */
}

/* Carousel inner styles for new lobby */
.carousel-inner {
	position: relative; /* Relative positioning */
	overflow: hidden; /* Hide overflow */
	width: 100%; /* Full width */
}

/* Carousel open styles for new lobby */
.carousel-open:checked + .carousel-item {
	position: static; /* Static positioning */
	opacity: 100; /* Full opacity */
}

/* Carousel item styles for new lobby */
.carousel-item {
	position: absolute; /* Absolute positioning */
	opacity: 0; /* Initial opacity */
	-webkit-transition: opacity 0.6s ease-out; /* Transition */
	transition: opacity 0.6s ease-out; /* Transition */
}

/* Carousel item image styles for new lobby */
.carousel-item img {
	display: block; /* Block display */
	height: auto; /* Auto height */
	max-width: 100%; /* Max width */
}

/* Carousel control styles for new lobby */
.carousel-control {
	background: rgba(0, 0, 0, 0.28); /* Background color */
	border-radius: 50%; /* Rounded corners */
	color: #fff; /* Text color */
	cursor: pointer; /* Pointer cursor */
	display: none; /* Hidden by default */
	font-size: 40px; /* Font size */
	height: 40px; /* Height */
	line-height: 35px; /* Line height */
	position: absolute; /* Absolute positioning */
	top: 50%; /* Top position */
	-webkit-transform: translate(0, -50%); /* Center vertically */
	cursor: pointer; /* Pointer cursor */
	-ms-transform: translate(0, -50%); /* Center vertically */
	transform: translate(0, -50%); /* Center vertically */
	text-align: center; /* Center text */
	width: 40px; /* Width */
	z-index: 10; /* Z-index */
}

/* Previous carousel control styles for new lobby */
.carousel-control.prev {
	left: 2%; /* Left position */
}

/* Next carousel control styles for new lobby */
.carousel-control.next {
	right: 2%; /* Right position */
}

/* Hover styles for carousel control in new lobby */
.carousel-control:hover {
	background: rgba(0, 0, 0, 0.8); /* Background color */
	color: #aaaaaa; /* Text color */
}

/* Carousel indicators styles for new lobby */
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
	display: block; /* Show indicators */
}

/* Carousel indicators container styles for new lobby */
.carousel-indicators {
	list-style: none; /* No list style */
	margin: 0; /* No margin */
	padding: 0; /* No padding */
	position: absolute; /* Absolute positioning */
	bottom: 2%; /* Bottom position */
	left: 0; /* Left position */
	right: 0; /* Right position */
	text-align: center; /* Center text */
	z-index: 10; /* Z-index */
}

/* Carousel indicator item styles for new lobby */
.carousel-indicators li {
	display: inline-block; /* Inline block display */
	margin: 0 5px; /* Margin */
}

/* Carousel bullet styles for new lobby */
.carousel-bullet {
	color: #fff; /* Text color */
	cursor: pointer; /* Pointer cursor */
	display: block; /* Block display */
	font-size: 35px; /* Font size */
}

/* Hover styles for carousel bullet in new lobby */
.carousel-bullet:hover {
	color: #aaaaaa; /* Text color */
}

/* Active carousel bullet styles for new lobby */
#carousel-1:checked
	~ .control-1
	~ .carousel-indicators
	li:nth-child(1)
	.carousel-bullet,
#carousel-2:checked
	~ .control-2
	~ .carousel-indicators
	li:nth-child(2)
	.carousel-bullet,
#carousel-3:checked
	~ .control-3
	~ .carousel-indicators
	li:nth-child(3)
	.carousel-bullet {
	color: #428bca; /* Active color */
}

/* Flex casino styles for new lobby */
.flex.casino {
	background: #091023; /* Background color */
}

/* Carousel inner styles for lobby in new lobby */
#lobby-casino .carousel-inner {
	border-radius: 0 0 30px 30px; /* Rounded corners */
}

/* Provider image styles for new lobby */
.img-prov {
	height: auto; /* Auto height */
	width: auto; /* Auto width */
	max-width: 100%; /* Max width */
	max-height: 100%; /* Max height */
	margin: auto; /* Center image */
	filter: grayscale(100%); /* Grayscale filter */
}

/* Color provider styles for new lobby */
.img-prov.color {
	filter: grayscale(0%) !important; /* No grayscale */
}

/* Show dropdown styles for new lobby */
.show-drop {
	opacity: 1 !important; /* Full opacity */
	visibility: visible !important; /* Visible */
	position: relative !important; /* Relative positioning */
}

/* Dropdown content styles for new lobby */
.dropdown-content.prov {
	opacity: 0; /* Initial opacity */
	visibility: hidden; /* Hidden */
	position: absolute; /* Absolute positioning */
	background-color: #dfdfdf; /* Background color */
}

/* Provider list styles for new lobby */
.old-lobby li.providers-list {
	width: auto; /* Auto width */
	vertical-align: middle; /* Vertical alignment */
}

/* Visible dropdown styles for new lobby */
.ver-drop {
	visibility: visible !important; /* Visible */
	opacity: 1 !important; /* Full opacity */
}

/* Hide scrollbar for left column in new lobby */
ul.left-column-casino-providers-nav::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}

/* Style 4 for all casino games box in new lobby */
.all-casino-games-box.style4 {
	position: absolute; /* Absolute positioning */
	margin-top: -116px !important; /* Negative margin */
}

/* Fixed nav wrapper styles for new lobby */
.all-casino-games-box.style4 .fixed-nav-wrapper-casino-view {
	background: linear-gradient(
		0deg,
		rgb(0 6 22) 50%,
		rgba(9, 16, 35, 0) 100%
	) !important; /* Background gradient */
}

/* Playtech jackpot styles for new lobby */
.playtech-jackpot {
	width: 100%; /* Full width */
	color: white; /* Text color */
	border-radius: 4px; /* Rounded corners */
	display: block; /* Block display */
}

/* Right menu button styles for new lobby */
button#menuRight {
	width: 25px; /* Width */
	padding: 45px 0; /* Padding */
	background: #262a3a; /* Background color */
	color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
	position: absolute; /* Absolute positioning */
	right: 0; /* Right position */
	display: block; /* Block display */
	z-index: 10; /* Z-index */
	height: 100%; /* Full height */
	margin-top: -5px; /* Negative margin */
	vertical-align: middle; /* Vertical alignment */
	background: -webkit-linear-gradient(
		90deg,
		rgb(20, 21, 24) 1%,
		rgb(42, 45, 58) 48%,
		rgb(17, 18, 23) 100%
	) !important; /* Background gradient */
	cursor: pointer; /* Pointer cursor */
}

/* Left menu button styles for new lobby */
button#menuLeft {
	float: left; /* Float left */
	width: 25px; /* Width */
	padding: 45px 0; /* Padding */
	background: #262a3a; /* Background color */
	color: rgba(255, 255, 255, 0.8705882352941177); /* Text color */
	position: absolute; /* Absolute positioning */
	left: 0; /* Left position */
	display: block; /* Block display */
	z-index: 1; /* Z-index */
	margin-top: -5px; /* Negative margin */
	height: 100%; /* Full height */
	background: -webkit-linear-gradient(
		90deg,
		rgb(20, 21, 24) 1%,
		rgb(42, 45, 58) 48%,
		rgb(17, 18, 23) 100%
	) !important; /* Background gradient */
	cursor: pointer; /* Pointer cursor */
}

/* Disabled casino wrapper alert styles for new lobby */
#casino-wrapper-disabled .message-alert {
	width: 90%; /* Width */
	margin: 0 auto; /* Center margin */
	color: #fff; /* Text color */
	text-align: center; /* Center text */
	border: 1px solid #b08200; /* Border */
	border-radius: 15px; /* Rounded corners */
	padding: 20px; /* Padding */
}

/* Money image styles for disabled casino wrapper */
#casino-wrapper-disabled .money-img {
	width: 70%; /* Width */
	margin: 100px auto 0; /* Center margin */
}

/* Second money image styles for disabled casino wrapper */
#casino-wrapper-disabled .money-img-two {
	width: 70%; /* Width */
	margin: 0 auto; /* Center margin */
}

/* Money image display styles for disabled casino wrapper */
#casino-wrapper-disabled .money-img img,
#casino-wrapper-disabled .money-img-two img {
	width: 100%; /* Full width */
	display: block; /* Block display */
}

/* Close icon styles for disabled casino wrapper */
#casino-wrapper-disabled i.fa.fa-times {
	float: right; /* Float right */
	color: white; /* Text color */
}

/* Mobile icon styles for disabled casino wrapper */
#casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Font size */
}

/* Media query for larger screens in disabled casino wrapper */
@media only screen and (min-width: 736px) {
	#casino-wrapper-disabled .message-alert {
		width: 35%; /* Width */
		margin: 0 auto; /* Center margin */
		color: white; /* Text color */
		text-align: center; /* Center text */
		border: 1px solid #b08200; /* Border */
		border-radius: 15px; /* Rounded corners */
	}
	#casino-wrapper-disabled .money-img,
	#casino-wrapper-disabled .money-img-two {
		width: 25%; /* Width */
	}
}

/* Casino content styles for disabled casino wrapper */
div#casino-content {
	height: 100vh; /* Full viewport height */
}

/* Category list styles for bingos */
li.category-list.Bingos polygon {
	fill: white !important; /* Fill color */
}

/* Casino content height */
div#casino-content {
	height: 100vh; /* Full viewport height */
}
</style>


<!-- FILE DOCUMENTED -->
