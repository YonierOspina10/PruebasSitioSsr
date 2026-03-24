import { ref, computed } from 'vue'; // Importing reactive references and computed properties from Vue
import { defineStore } from 'pinia'; // Importing the defineStore function from Pinia for state management

// Defining a Pinia store named 'sportbook' using the composition API
export const useSportBookStore = defineStore('sportbook', () => {
	// Reactive reference for the current page, initialized to 'overview'
	const page = ref<string>('overview');
	// Reactive reference for the router type, initialized to 'hash'
	const routerType = ref<string>('hash');
	// Reactive reference for the sport ID, initialized to undefined
	const sportId = ref<any>(undefined);
	// Reactive reference for the event ID, initialized to undefined
	const eventId = ref<any>(undefined);
	// Reactive reference for the share code, initialized to an empty string
	const shareCode = ref<any>('');
	// Reactive reference for championship IDs, initialized to undefined
	const championshipIds = ref<any>(undefined);
	// Reactive reference for category IDs, initialized to undefined
	const categoryIds = ref<any>(undefined);
	// Reactive reference for loading state, initialized to true
	const loading = ref<boolean>(true);
	// Reactive reference for mobile bet slip visibility, initialized to true
	const betSlipMobile = ref<boolean>(true);
	// Reactive reference for the Altenar SDK loading state, initialized to false
	const loadedAltenarSdk = ref<boolean>(false);

	/**
	 * Sets multiple values in the store.
	 * @param pg - The page to set
	 * @param sprt - The sport ID to set
	 * @param evnt - The event ID to set
	 * @param champ - The championship IDs to set
	 * @param cat - The category IDs to set
	 */
	function setValues(pg, sprt, evnt, champ, cat) {
		page.value = pg; // Set the current page
		sportId.value = sprt; // Set the sport ID
		eventId.value = evnt; // Set the event ID
		championshipIds.value = champ; // Set the championship IDs
		categoryIds.value = cat; // Set the category IDs
	}

	/**
	 * Generates styles based on provided colors.
	 * @param colors - An object containing color values
	 * @returns An object with CSS styles as strings
	 */
	function getStyles(colors: any) {
		return {
			asideBanner: `
                .carouselButton {
                    width: 100%;
                    height: 100%;
                    background: none;
                    padding: 0px;
                    border: none;
                    cursor: pointer !important;
                }
                .carouselButton:hover {
                    scale: 1.02 !important;
                }
                #swiper-slide-banners-aside {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    cursor: pointer !important;
                }
                .banner {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    border-radius: 8px;
                    cursor: pointer !important;
                }
                #retirement-notes-aside {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
                .retirement-notes-container {
                    grid-column: 1 / 2;
                }
                .retirement-notes-content {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    display: block;
                    background-color: ${colors.secondary};
                    border-width: 0px;
                    border-color: ${colors.secondary};
                    border-style: solid;
                    border-radius: 8px;
                }
                .retirement-notes-title {
                    padding: 14px !important;
                    background: ${colors.secondary};
                    color: ${colors.neutral};
                    text-transform: uppercase;
                    font-family: Roboto, sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 18px;
                    display: flex;
                    justify-content: between;
                    align-items: center;
                    cursor: pointer !important;
                }
                .retirement-notes-title span {
                    width: 100%;
                    height: 100%;
                }
                .retirement-notes-title svg {
                    width: 25px;
                    height: 25px;
                    fill: ${colors.neutral};
                }
                .retirement-notes-table {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    padding: 14px !important;
                    background: ${colors.secondary};
                    color: ${colors.neutral};
                    text-transform: uppercase;
                    font-family: Roboto, sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 18px;
                }
                .retirement-notes {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 5px;
                    padding: 5px;
                    border-radius: 5px;
                    color: ${colors.neutral};
                    background: ${colors.secondary_content};
                }
                .retirement-notes img {
                    width: 30px;
                    height: 30px;
                    object-fit: contain;
                }
                .retirement-notes div {
                    width: 90px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: start;
                }
                .retirement-notes div .nota {
                    font-size: 8px;
                }
                .retirement-notes div .numero {
                    font-size: 12px;
                    font-weight: bold;
                }
                @media (max-width: 600px) {
                        .retirement-notes div {
                            width: 50%;
                        }
                        .retirement-notes div .nota {
                            font-size: 12px;
                        }
                        .retirement-notes div .numero {
                            font-size: 16px;
                        }
                        .retirement-notes .valor {
                            width: 150px;
                            padding-right: 10px;
                            font-size: 20px;
                        }
                        .retirement-notes {
                            padding: 5px 10px;
                        }
                        .retirement-notes .button-anular {
                            padding: 4px 8px;
                        }
                }
                .retirement-notes .valor {
                  width: 60px;
                  text-align: right;
                    font-size: 14px;
                    font-weight: bold;
                }
                .retirement-notes .button-anular {
                    border-radius: 10px;
                    border: none;
                    padding: 5px 8px;
                    font-size: 15px;
                    font-weight: bold;
                    color: ${colors.neutral};
                    background: ${colors.success};
                    cursor: pointer !important;
                }
                .retirement-notes .button-anular:hover {
                    background: ${colors.error};
                }
                .skeleton-loading {
                    width: 100%;
                    height: 46px;
                    background: ${colors.secondary_content};
                    border-radius: 5px;
                }
                .emptyRetirement {
                    width: 100%;
                    height: 46px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: ${colors.neutral};
                    font-size: 10px;
                    text-align: center;
                    border-radius: 5px;
                }
                .modal {
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 14px;
                    color: ${colors.neutral};
                }
                .subtitle {
                    margin: 0;
                }
                .message {
                    text-align: center;
                    margin: 0;
                }
                .buttons {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    gap: 10px;
                }
                .cancel {
                    border-radius: 10px;
                    border: none;
                    padding: 5px 8px;
                    font-size: 15px;
                    font-weight: bold;
                    color: ${colors.neutral};
                    background: ${colors.error};
                    cursor: pointer !important;
                }
                .cancel:hover {
                    background: ${colors.error};
                    opacity: 0.8;
                }
                .accept {
                    border-radius: 10px;
                    border: none;
                    padding: 5px 8px;
                    font-size: 15px;
                    font-weight: bold;
                    color: ${colors.neutral};
                    background: ${colors.success};
                    cursor: pointer !important;
                }
                .accept:hover {
                    background: ${colors.success};
                    opacity: 0.8;
                }
            `,
			asideCenter: `
                #swiper-slide-banners-center {
                    cursor: pointer !important;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
                .bannerCenter {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    border-radius: 8px;
                    cursor: pointer !important;
                }
            `,
			casinoGames: `
                #topCasinoComponent {
                        height: auto;
                        width: 100%;
                }
                .container {
                    width: 100%;
                    height: 100%;
                }
                .content {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .headerComponent {
                    position: relative;
                    height: 32px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: default;
                }
                .separador {
                    position: absolute;
                    bottom: 2px;
                    left: 0px;
                    width: 35px;
                    height: 4px;
                    background-color: ${colors.primary};
                    border-radius: 9999px;
                }
                .arrows {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer !important;
                }
                #swiper-container {
                    width: 100%;
                    height: 100%;
                }
                #swiper-slide {
                    position: relative;
                    width: 190px;
                    height: 190px;
                    text-align: center;
                    font-size: 18px;
                    background: none;
                    display: inline-block;
                    border-radius: 12px;
                    cursor: pointer !important;
                }
                .title {
                    width: 100%;
                    color: white;
                    font-size: 20px;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                a {
                    text-decoration: none;
                    color: white;
                }
                .slideButton {
                    width: 100%;
                    height: 100%;
                    background: none;
                    padding: 0px;
                    border: none;
                }
                #swiper-button-prev {
                    background: none;
                    padding: 0px;
                    border: none;
                    cursor: pointer !important;
                    color: white;
                }
                #swiper-button-prev:hover {
                    scale: 1.25 !important;
                    color: ${colors.primary} !important;
                }
                #swiper-button-next {
                    background: none;
                    padding: 0px;
                    border: none;
                    cursor: pointer !important;
                    color: white;
                }
                #swiper-button-next:hover {
                    scale: 1.25 !important;
                    color: ${colors.primary} !important;
                }
                .imgGame {
                    width: 190px;
                    height: 190px;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 8px;
                    cursor: pointer !important;
                    z-index: 20 !important;
                }
                .imgGame:hover {
                    z-index: 10 !important;
                }
                .infoGame {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 190px;
                    height: 190px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 8px;
                    word-break: break-all;
                    border-radius: 8px;
                    background-color: #00000095;
                    z-index: 10 !important;
                    cursor: pointer !important;
                }
                .infoGame:hover {
                    z-index: 20 !important;
                }
                .infoGame > p {
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                    max-width: 120px;
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    overflow-wrap: break-word;
                    text-transform: capitalize;
                    white-space: pre-wrap;
                }
                .infoGame > button {
                    width: 140px;
                    background-color: ${colors.accent_focus};
                    color: ${colors.base_100};
                    font-size: 12px;
                    font-weight: bold;
                    border-radius: 9999px;
                    text-transform: uppercase;
                    cursor: pointer !important;
                    padding: 8px;
                }
                .infoGame > button:hover {
                    background-color: ${colors.accent};
                    color: ${colors.base_100};
                    scale: 1.05;
                }
                .top {
                    position: absolute;
                    right: 4px;
                    top: 4px;
                    width: 24px;
                    height: 24px;
                    color: ${colors.base_100};
                    font-size: 13px;
                    font-weight: bold;
                    padding: 5px;
                    z-index: 30;
                    background-color: ${colors.primary};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 9999px;
                }
            }
        `,
		};
	}
	// Returning the reactive references and functions for use in components
	return {
		page,
		routerType,
		sportId,
		championshipIds,
		categoryIds,
		eventId,
		shareCode,
		setValues,
		getStyles,
		loading,
		betSlipMobile,
		loadedAltenarSdk,
	};
});

// FILE DOCUMENTED
