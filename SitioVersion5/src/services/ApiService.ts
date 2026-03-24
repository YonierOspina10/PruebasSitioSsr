import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { apm } from '@elastic/apm-rum';
import modal from '@/components/modals/Modal.vue';

const getNames: Record<string, string> = (window as any).cconfig?.newCasino || {};
/**
 * ApiService class to handle API requests and manage application state.
 */
class ApiService {
    loading: any; // Variable to track loading state
    isLoading = false; // Indicates if a request is currently loading
    auth_token: string = ''; // Authentication token for API requests
    auth_token2: any = ''; // Secondary authentication token from local storage
    urlApi = // API base URL from configuration
        (window as any).cconfig.url_api != undefined ? (window as any).cconfig.url_api : (window as any).cconfig.urlApi;
    timeK = (window as any).cconfig.timeKiller != undefined ? (window as any).cconfig.timeKiller : null; // Time killer configuration from settings
    timeR = (window as any).cconfig.restrictionTime != undefined ? (window as any).cconfig.restrictionTime : null; // Restriction time configuration from settings
    timeOP = // Other restriction time configuration from settings
        (window as any).cconfig.otherRestrictionTime != undefined ? (window as any).cconfig.otherRestrictionTime : null;
    partner = (window as any).cconfig.partner; // Partner identifier from configuration
    isMobile = ''; // Indicates if the user is on a mobile device
    lat: any; // Latitude for user location
    lng: any; // Longitude for user location
    baseUrlFx = ''; // Base URL for additional functionality
    userLocation = false; // Flag to determine if user location should be used
    contingency = // Contingency flag based on maintenance window or contingency settings
        (window as any).cconfig.maintenanceWindow != undefined &&
        (window as any).cconfig.maintenanceWindow.on != undefined &&
        (window as any).cconfig.maintenanceWindow.on
            ? true
            : !!(
                  (window as any).cconfig.contingency != undefined &&
                  (window as any).cconfig.contingency.on != undefined &&
                  (window as any).cconfig.contingency.on
              );
    testUser = false; // Flag to indicate if a test user is being used

    /**
     * Sets the test user flag.
     * @param testUser - Boolean indicating if the test user is active.
     */
    setTestUser(testUser: any) {
        this.testUser = testUser;
    }

    /**
     * Sets the contingency flag.
     * @param contingency - Boolean indicating if contingency is active.
     */
    setContingency(contingency: any) {
        this.contingency = contingency;
    }

    /**
     * Sets the authentication token.
     * @param auth_token - The authentication token to set.
     */
    setAuthToken(auth_token: any) {
        this.auth_token = auth_token;
    }

    /**
     * Sets the API URL.
     * @param url - The API URL to set.
     */
    setUrlApi(url: any) {
        this.urlApi.url = url;
    }

    /**
     * Sets the base URL for additional functionality.
     * @param baseUrlFx - The base URL to set.
     */
    setBaseUrlFx(baseUrlFx: any) {
        this.baseUrlFx = baseUrlFx;
    }

    /**
     * Sets the partner identifier.
     * @param partner - The partner identifier to set.
     */
    setPartner(partner: any) {
        this.partner = partner;
    }

    /**
     * Sets the mobile device flag.
     * @param isMobile - Boolean indicating if the user is on a mobile device.
     */
    setIsMobile(isMobile: any) {
        this.isMobile = isMobile;
    }

    /**
     * Sets the user location flag.
     * @param userLocation - Boolean indicating if user location should be used.
     */
    setuserLocation(userLocation: any) {
        this.userLocation = userLocation;
    }

    /**
     * Checks if the user is logged in based on the authentication token.
     * @returns True if the user is logged in, otherwise false.
     */
    isUserLoggedIn() {
        if (this.auth_token != '') {
            return true;
        } else {
            return false;
        }
    }

    getVersionTimestamp() {
        const version = (window as any).versionConfig || '';
        const match = version.match(/vv(\d+)/);
        return match ? match[1] : '';
    }

    /**
     * Makes a POST request to the API with the specified command and parameters.
     * @param command - The command to execute.
     * @param param - The parameters for the request.
     * @returns A promise that resolves with the response data or rejects on error.
     */
    async request(command: any, param: any) {
        if (!this.contingency) {
            if (window.localStorage.getItem('auth_token') !== undefined) {
                this.auth_token2 = window.localStorage.getItem('auth_token'); // Retrieve auth token from local storage
            } else {
                this.auth_token2 = '';
            }
            const path = // Determine API path
                (window as any).cconfig.url_api != undefined ? (window as any).cconfig.url_api : this.urlApi.url;
            const apiClient = axios.create({
                // Create an Axios instance for API requests
                baseURL: path,
                headers: {
                    'Content-type': 'application/json',
                    'swarm-session': this.auth_token2,
                },
                timeout:
                    (window as any).cconfig.requestTimeout != undefined
                        ? (window as any).cconfig.requestTimeout
                        : 60000,
                withCredentials: true,
            });
            if (this.userLocation) {
                // Check if user location should be used
                if (navigator.geolocation != undefined) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        // Get user location
                        this.lat = position.coords.latitude;
                        this.lng = position.coords.longitude;
                    });
                } else {
                    console.log('User not allowed'); // Log if geolocation is not allowed
                }
            }
            param.site_id = this.partner; // Set site ID in parameters
            param.isMobile = this.isMobile; // Set mobile flag in parameters
            param.lat = this.lat; // Set latitude in parameters
            param.lng = this.lng; // Set longitude in parameters
            param.country = (window as any).cconfig.countryL; // Set country in parameters
            param.vrsn = this.getVersionTimestamp();
            let vs_utm_campaign = ''; // Initialize UTM campaign variable
            let vs_utm_source = ''; // Initialize UTM source variable
            let vs_utm_medium = ''; // Initialize UTM medium variable
            let vs_utm_content = ''; // Initialize UTM content variable
            let vs_utm_term = ''; // Initialize UTM term variable
            let vs_utm_campaign2 = ''; // Initialize second UTM campaign variable
            const { cookies } = useCookies(); // Get cookies instance
            if (cookies.get('vs_utm_campaign') !== '') {
                // Retrieve UTM campaign from cookies
                vs_utm_campaign = cookies.get('vs_utm_campaign');
            }
            if (cookies.get('vs_utm_campaign2') !== '') {
                // Retrieve second UTM campaign from cookies
                vs_utm_campaign2 = cookies.get('vs_utm_campaign2');
            }
            if (cookies.get('vs_utm_source') !== '') {
                // Retrieve UTM source from cookies
                vs_utm_source = cookies.get('vs_utm_source');
            }
            if (cookies.get('vs_utm_medium') !== '') {
                // Retrieve UTM medium from cookies
                vs_utm_medium = cookies.get('vs_utm_medium');
            }
            if (cookies.get('vs_utm_content') !== '') {
                // Retrieve UTM content from cookies
                vs_utm_content = cookies.get('vs_utm_content');
            }
            if (cookies.get('vs_utm_term') !== '') {
                // Retrieve UTM term from cookies
                vs_utm_term = cookies.get('vs_utm_term');
            }
            if (
                (window as any).cconfig.utm_campaignFixed != undefined &&
                (window as any).cconfig.utm_campaignFixed != ''
            ) {
                // Check for fixed UTM campaign in configuration
                vs_utm_campaign = (window as any).cconfig.utm_campaignFixed;
            }
            if (
                (window as any).cconfig.utm_contentFixed != undefined &&
                (window as any).cconfig.utm_contentFixed != ''
            ) {
                // Check for fixed UTM content in configuration
                vs_utm_content = (window as any).cconfig.utm_contentFixed;
            }
            if ((window as any).cconfig.utm_sourceFixed != undefined && (window as any).cconfig.utm_sourceFixed != '') {
                // Check for fixed UTM source in configuration
                vs_utm_source = (window as any).cconfig.utm_sourceFixed;
            }
            if ((window as any).cconfig.utm_termFixed != undefined && (window as any).cconfig.utm_termFixed != '') {
                // Check for fixed UTM term in configuration
                vs_utm_term = (window as any).cconfig.utm_termFixed;
            }
            if ((window as any).cconfig.utm_mediumFixed != undefined && (window as any).cconfig.utm_mediumFixed != '') {
                // Check for fixed UTM medium in configuration
                vs_utm_medium = (window as any).cconfig.utm_mediumFixed;
            }
            if (
                (window as any).cconfig.utm_campaign2Fixed != undefined &&
                (window as any).cconfig.utm_campaign2Fixed != ''
            ) {
                // Check for fixed second UTM campaign in configuration
                vs_utm_campaign2 = (window as any).cconfig.utm_campaign2Fixed;
            }
            if (vs_utm_campaign2 != undefined && vs_utm_campaign2 != '') {
                // Set second UTM campaign in parameters if available
                param.vs_utm_campaign2 = vs_utm_campaign2;
            }
            if (vs_utm_campaign != undefined && vs_utm_campaign != '') {
                // Set UTM campaign in parameters if available
                param.vs_utm_campaign = vs_utm_campaign;
            }
            if (vs_utm_medium != undefined && vs_utm_medium != '') {
                // Set UTM medium in parameters if available
                param.vs_utm_medium = vs_utm_medium;
            }
            if (vs_utm_term != undefined && vs_utm_term != '') {
                // Set UTM term in parameters if available
                param.vs_utm_term = vs_utm_term;
            }
            if (vs_utm_content != undefined && vs_utm_content != '') {
                // Set UTM content in parameters if available
                param.vs_utm_content = vs_utm_content;
            }
            if (vs_utm_source != undefined && vs_utm_source != '') {
                // Set UTM source in parameters if available
                param.vs_utm_source = vs_utm_source;
            }
            if (
                (window as any).cconfig.sessionSeon !== undefined &&
                (window as any).cconfig.sessionSeon.active !== undefined &&
                (window as any).cconfig.sessionSeon.active
            ) {
                const actions =
                    (window as any).cconfig.sessionSeon.actions !== undefined
                        ? (window as any).cconfig.sessionSeon.actions
                        : [];

                if (actions.includes('all') || actions.includes(command)) {
                    param.sessionSeon = await (window as any).getSeonSession?.();
                }
            }
            let request;
            if (path.includes('gameservice') || path.includes('servicegame') || path.includes('casinogames')) {
                request = {
                    // Construct the request object
                    command: command,
                    params: param,
                    rid: '15718498520569',
                };
            } else {
                request = {
                    // Construct the request object
                    command: command,
                    params: param,
                    rid: '15718498520569', // Request ID
                    wid: (window as any).uniqueId !== undefined ? (window as any).uniqueId : '', // Set uniqueId in parameters
                };
            }

            if (param.timeRequest != undefined && param.timeRequest) {
                // Check if time request is specified
                if (this.timeR != null) {
                    if (localStorage.getItem('timeLogin') == undefined) {
                        // Check if timeLogin is set
                        let Ltime: any = new Date().getTime();
                        localStorage.setItem('timeLogin', Ltime); // Set current time as timeLogin
                    } else {
                        let timeLogin: any = localStorage.getItem('timeLogin'); // Retrieve timeLogin
                        let valorNumber = parseInt(timeLogin);
                        let sumMinutes = new Date();
                        sumMinutes.setTime(valorNumber + this.timeR * 1000); // Calculate expiration time
                        if (sumMinutes.getTime() >= new Date().getTime()) {
                            // Check if still valid
                            let data = {
                                code: 1811, // Return code for valid session
                            };
                            return Promise.resolve(data);
                        } else {
                            let Ltime: any = new Date().getTime();
                            localStorage.setItem('timeLogin', Ltime); // Update timeLogin
                        }
                    }
                }
            }
            if (param.timeOthersRequets != undefined && param.timeOthersRequets) {
                // Check if time for other requests is specified
                if (this.timeOP != null) {
                    if (localStorage.getItem('timeOtherPeticions') == undefined) {
                        // Check if timeOtherPeticions is set
                        let Otime: any = new Date().getTime();
                        localStorage.setItem('timeOtherPeticions', Otime); // Set current time as timeOtherPeticions
                    } else {
                        let otherPeticions: any = localStorage.getItem('timeOtherPeticions'); // Retrieve timeOtherPeticions
                        let numberValue = parseInt(otherPeticions);
                        let sumMinutes = new Date();
                        sumMinutes.setTime(numberValue + this.timeOP * 1000); // Calculate expiration time
                        if (sumMinutes.getTime() >= new Date().getTime()) {
                            // Check if still valid
                            let data = {
                                code: 1118, // Return code for valid session
                            };
                            return Promise.resolve(data);
                        } else {
                            let Otime: any = new Date().getTime();
                            localStorage.setItem('timeOtherPeticions', Otime); // Update timeOtherPeticions
                        }
                    }
                }
            }
            return apiClient // Make the API request
                .post('', request)
                .then((response: any) => {
                    const eventResponse = new Event('endResponse'); // Create event for end of response
                    window.document.dispatchEvent(eventResponse); // Dispatch end response event
                    let apmLabels = apm; // Get APM instance
                    apmLabels.addLabels({ command: command }); // Add command label to APM
                    apmLabels.addLabels({ request_body: JSON.stringify(request) }); // Add request body label to APM
                    if (response.data.code == 20000) {
                        // Check for logout condition
                        window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
                        const event = new Event('notLogin'); // Create event for not logged in
                        window.document.dispatchEvent(event); // Dispatch not login event
                        return response.data; // Return response data
                    }
                    if (response.data.code == 12 && response.data.error_code == 10028) {
                        // Check for email confirmation required
                        const eventConfirmEmail = new Event('confirmEmail'); // Create event for email confirmation
                        window.document.dispatchEvent(eventConfirmEmail); // Dispatch email confirmation event
                    } else if (response.data.code == 12 && response.data.error_code == 100095) {
                        // Check for SMS confirmation required
                        const eventConfirmSms = new Event('confirmSms'); // Create event for SMS confirmation
                        window.document.dispatchEvent(eventConfirmSms); // Dispatch SMS confirmation event
                    } else {
                        return response.data; // Return response data
                    }
                    const eventloadView = new Event('loadView'); // Create event for loading view
                    window.document.dispatchEvent(eventloadView); // Dispatch load view event
                })
                .catch((e) => {
                    // Handle error
                });
        } else {
            return Promise.reject(); // Reject promise if in contingency mode
        }
    }

    /**
     * Makes a GET request to the API with the specified path and parameters.
     * @param path - The API endpoint to request.
     * @param params - The parameters for the request.
     * @returns A promise that resolves with the response data or rejects on error.
     */
    async requestGet(path: any, params: any) {
        if (
            params['action'] &&
            (params['action'] == 'getGames2' || params['action'] == 'getGames9' || params['action'] == 'getGames7') &&
            params['userId']
        ) {
            delete params['userId']; // Remove userId from parameters if specified
        }

        if ((window as any).cconfig.newCasino !== undefined){
            if (params?.action && getNames[params.action]) {
                path = path.replace('/cms/products/games/', '');
                path = `${path.replace(/\/$/, '')}/${getNames[params.action]}/`;
                delete params.action;
            }
        }
        
        if (
            (window as any).cconfig.sessionSeon !== undefined &&
            (window as any).cconfig.sessionSeon.active !== undefined &&
            (window as any).cconfig.sessionSeon.active
        ) {
            const actions =
                (window as any).cconfig.sessionSeon.actions !== undefined
                    ? (window as any).cconfig.sessionSeon.actions
                    : [];

            if (actions.includes('all') || actions.includes(params['action'])) {
                params.sessionSeon = await (window as any).getSeonSession?.();
            }
        }

        if (this.testUser) {
            params['testUser'] = true; // Add testUser flag to parameters if active
        }
        params.country = (window as any).cconfig.countryL; // Add country to parameters
        params.vrsn = this.getVersionTimestamp();
        if (!path.includes('gameservice') && !path.includes('servicegame') && !path.includes('casinogames')) {
            params.wid = (window as any).uniqueId !== undefined ? (window as any).uniqueId : ''; // Set uniqueId in parameters
        }

        if (!this.contingency) {
            // Check if not in contingency mode
            if (
                (window as any).cconfig.contingencyCasino == undefined ||
                (window as any).cconfig.contingencyCasino.on == undefined ||
                !(window as any).cconfig.contingencyCasino.on
            ) {
                const apiClient = axios.create({
                    // Create an Axios instance for API requests
                    baseURL: path,
                    headers: {
                        'Content-type': 'application/json',
                    },
                    timeout:
                        (window as any).cconfig.requestTimeout != undefined
                            ? (window as any).cconfig.requestTimeout
                            : 60000,
                    withCredentials: true,
                });
                return new Promise<never>((resolve, reject) => {
                    apiClient
                        .get(path, { params: params }) // Make GET request
                        .then((response: any) => {
                            resolve(response); // Resolve promise with response
                        })
                        .catch((e) => {
                            reject(e); // Reject promise on error
                        });
                });
            } else {
                return Promise.reject(); // Reject promise if in contingency mode
            }
        } else {
            return Promise.reject(); // Reject promise if in contingency mode
        }
    }
}

export default new ApiService(); // Export a singleton instance of ApiService

// FILE DOCUMENTED
