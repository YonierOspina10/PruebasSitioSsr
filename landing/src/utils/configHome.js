/**
 * Determines the type of device based on the mobile property of the appComponent.
 * @param {Object} appComponent - The application component containing device information.
 * @returns {string} - Returns 'bannersDesktop' or 'bannersMobile' based on the mobile property.
 */
export function getDevice(appComponent) {
    let device = '';
    if (appComponent.mobile === '') {
        device = 'bannersDesktop';
    } else if (appComponent.mobile === '1') {
        device = 'bannersMobile';
    }
    return device;
}

/**
 * Retrieves components from the appComponent configuration and adds them to the components array.
 * @param {Object} appComponent - The application component containing configuration.
 * @param {Array} components - The array to which components will be added.
 */
export function getComponents(appComponent, components) {
    if (appComponent.config && appComponent.config['components_'] && appComponent.config['components_']['home']) {
        appComponent.config['components_']['home'].forEach((component) => {
            components.push(component);
        });
    } else if (
        appComponent.config &&
        appComponent.config['components'] &&
        appComponent.config['components'][appComponent.country] &&
        appComponent.config['components'][appComponent.country]['home']
    ) {
        appComponent.config['components'][appComponent.country]['home'].forEach((component) => {
            components.push(component);
        });
    }
}

/**
 * Retrieves information icons based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Object|null} - Returns the INFO_ICONS object or null if not found.
 */
export function getInfoIcons(appComponent) {
    let INFO_ICONS = null;
    if (
        appComponent.config &&
        appComponent.config['not_login'] &&
        appComponent.config['not_login'][appComponent.lngProd] &&
        appComponent.config['not_login'][appComponent.lngProd]['NEW_HOME_ICONS']
    ) {
        INFO_ICONS = appComponent.config['not_login'][appComponent.lngProd]['NEW_HOME_ICONS'];
    } else if (
        appComponent.mobile &&
        appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE &&
        appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE[appComponent.country]
    ) {
        INFO_ICONS = appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE[appComponent.country];
    } else if (
        !appComponent.mobile &&
        appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP &&
        appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP[appComponent.country]
    ) {
        INFO_ICONS = appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP[appComponent.country];
    }
    return INFO_ICONS;
}

/**
 * Retrieves images based on the appComponent configuration and device type.
 * @param {Object} appComponent - The application component containing configuration.
 * @param {string} device - The type of device (desktop or mobile).
 * @returns {Array|null} - Returns an array of images or null if not found.
 */
export function getImages(appComponent, device) {
    let images = null;
    if (
        appComponent.config &&
        appComponent.config['not_login'] &&
        appComponent.config['not_login'][appComponent.lngProd] &&
        appComponent.config['not_login'][appComponent.lngProd]['banners'] &&
        appComponent.config['not_login'][appComponent.lngProd]['banners']['banner_home']
    ) {
        images = JSON.parse(
            JSON.stringify(appComponent.config['not_login'][appComponent.lngProd]['banners']['banner_home']),
        );
    } else if (
        appComponent.config &&
        appComponent.config['components_'] &&
        appComponent.config['components_']['home']
    ) {
        const carouselComponent = appComponent.config['components_']['home'].find(
            (item) => item.id === 'Carousel3Component',
        );
        if (carouselComponent && carouselComponent['banners']) {
            images = JSON.parse(JSON.stringify(carouselComponent['banners']));
        }
    } else if (
        appComponent.config &&
        appComponent.config[device] &&
        appComponent.config[device][appComponent.country] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin'] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin']['home']
    ) {
        images = JSON.parse(
            JSON.stringify(appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin']['home']),
        );
    }
    if (images) {
        images = images.filter((banner) => {
            const startDate = new Date(banner.startDate);
            const endDate = new Date(banner.date);
            const today = new Date();
            return startDate <= today && endDate >= today;
        });
    }
    return images;
}

/**
 * Retrieves casino images based on the appComponent configuration and device type.
 * @param {Object} appComponent - The application component containing configuration.
 * @param {string} device - The type of device (desktop or mobile).
 * @returns {Array|null} - Returns an array of casino images or null if not found.
 */
export function getImagesCasino(appComponent, device) {
    let images = null;
    if (
        appComponent.config &&
        appComponent.config['not_login'] &&
        appComponent.config['not_login'][appComponent.lngProd] &&
        appComponent.config['not_login'][appComponent.lngProd]['banners'] &&
        appComponent.config['not_login'][appComponent.lngProd]['banners']['banner_casino']
    ) {
        images = JSON.parse(
            JSON.stringify(appComponent.config['not_login'][appComponent.lngProd]['banners']['banner_casino']),
        );
    } else if (
        appComponent.config &&
        appComponent.config['components_'] &&
        appComponent.config['components_']['casino']
    ) {
        const carouselComponent = appComponent.config['components_']['casino'].find(
            (item) => item.id === 'Carousel3Component',
        );
        if (carouselComponent && carouselComponent['banners']) {
            images = JSON.parse(JSON.stringify(carouselComponent['banners']));
        }
    } else if (
        appComponent.config &&
        appComponent.config[device] &&
        appComponent.config[device][appComponent.country] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin'] &&
        appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin']['casino']
    ) {
        images = JSON.parse(
            JSON.stringify(
                appComponent.config[device][appComponent.country][appComponent.lngProd]['notLogin']['casino'],
            ),
        );
    }
    if (images) {
        images = images.filter((banner) => {
            const startDate = new Date(banner.startDate);
            const endDate = new Date(banner.date);
            const today = new Date();
            return startDate <= today && endDate >= today;
        });
    }
    return images;
}

/**
 * Retrieves home icons based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Object|null} - Returns the HOME_ICONS object or null if not found.
 */
export function getHomeIcons(appComponent) {
    let HOME_ICONS = null;
    if (
        appComponent.config &&
        appComponent.config['not_login'] &&
        appComponent.config['not_login'][appComponent.lngProd] &&
        appComponent.config['not_login'][appComponent.lngProd]['HOME_ICONS']
    ) {
        HOME_ICONS = appComponent.config['not_login'][appComponent.lngProd]['HOME_ICONS']
    } else if (
        appComponent.mobile &&
        appComponent.config.HOME_ICONS_NOLOGUEADO_MOBILE &&
        appComponent.config.HOME_ICONS_NOLOGUEADO_MOBILE[appComponent.country]
    ) {
        HOME_ICONS = appComponent.config.HOME_ICONS_NOLOGUEADO_MOBILE[appComponent.country];
    } else if (
        !appComponent.mobile &&
        appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP &&
        appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP[appComponent.country]
    ) {
        HOME_ICONS = appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP[appComponent.country];
    }
    return HOME_ICONS;
}

/**
 * Updates the footer light menu in the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 */
export function updateMenuFooterLight(appComponent) {
    if (appComponent.config.MENU_FOOTER_LIGHT_ !== undefined) {
        appComponent.config.MENU_FOOTER_LIGHT[appComponent.config.countryL] = appComponent.config.MENU_FOOTER_LIGHT_;
    }
}

/**
 * Updates the providers in the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 */
export function updateProviders(appComponent) {
    if (appComponent.config.PROVIDERS_ !== undefined) {
        if (
            appComponent.config.PROVIDERS !== undefined &&
            appComponent.config.PROVIDERS[appComponent.config.countryL] !== undefined
        ) {
            appComponent.config.PROVIDERS[appComponent.config.countryL] = appComponent.config.PROVIDERS_;
        } else {
            appComponent.config.PROVIDERS = { [appComponent.config.countryL]: [] };
            appComponent.config.PROVIDERS[appComponent.config.countryL] = appComponent.config.PROVIDERS_;
        }
    }
}

/**
 * Retrieves sponsors based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Array|null} - Returns an array of sponsors or null if not found.
 */
export function getSponsors(appComponent) {
    let SPONSORS = null;
    if (appComponent.config.SPONSORS_ !== undefined) {
        SPONSORS = appComponent.config.SPONSORS_;
    } else if (
        appComponent.config.footer !== undefined &&
        appComponent.config.footer.sponsors[appComponent.country] !== undefined
    ) {
        SPONSORS = appComponent.config.footer.sponsors[appComponent.country];
    }
    return SPONSORS;
}

/**
 * Retrieves providers based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Array|null} - Returns an array of providers or null if not found.
 */
export function getProviders(appComponent) {
    let PROVIDERS = null;
    if (
        appComponent.config.PROVIDERS !== undefined &&
        appComponent.config.PROVIDERS[appComponent.country] !== undefined
    ) {
        PROVIDERS = appComponent.config.PROVIDERS[appComponent.country];
    }
    return PROVIDERS;
}

/**
 * Retrieves the license information from the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {string|null} - Returns the license string or null if not found.
 */
export function getLicense(appComponent) {
    let LICENSE = null;
    if (appComponent.config.footer !== undefined && appComponent.config.footer.license !== undefined) {
        LICENSE = appComponent.config.footer.license;
    }
    return LICENSE;
}

/**
 * Retrieves the download app URL from the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {string|null} - Returns the download app URL or null if not found.
 */
export function getUrlDownloadApp(appComponent) {
    let urlDownloadApp = null;
    if (appComponent.config.footer !== undefined && appComponent.config.footer.downloadApp !== undefined) {
        urlDownloadApp = appComponent.config.footer.downloadApp;
    }
    return urlDownloadApp;
}

/**
 * Retrieves the light menu footer from the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Object|null} - Returns the MENU_FOOTER_LIGHT object or null if not found.
 */
export function getMenuFooterLight(appComponent) {
    let MENU_FOOTER_LIGHT = null;
    if (
        appComponent.config.MENU_FOOTER_LIGHT !== undefined &&
        appComponent.config.MENU_FOOTER_LIGHT[appComponent.country] !== undefined
    ) {
        MENU_FOOTER_LIGHT = appComponent.config.MENU_FOOTER_LIGHT[appComponent.country];
    }
    return MENU_FOOTER_LIGHT;
}

/**
 * Retrieves social media links from the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Object|null} - Returns the SOCIAL_MEDIA object or null if not found.
 */
export function getSocialMedia(appComponent) {
    let SOCIAL_MEDIA = null;
    if (
        appComponent.config['not_login'] !== undefined &&
        appComponent.config['not_login'][appComponent.lngProd] !== undefined &&
        appComponent.config['not_login'][appComponent.lngProd]['social_links'] !== undefined
    ) {
        SOCIAL_MEDIA = appComponent.config['not_login'][appComponent.lngProd]['social_links'];
    } else if (
        appComponent.config.SOCIAL_NEWTWORKS !== undefined &&
        appComponent.config.SOCIAL_NEWTWORKS[appComponent.country] !== undefined
    ) {
        SOCIAL_MEDIA = appComponent.config.SOCIAL_NEWTWORKS[appComponent.country];
    }
    return SOCIAL_MEDIA;
}

/**
 * Retrieves promotional images based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Array|null} - Returns an array of promotional images or null if not found.
 */
export function getPromotional2(appComponent) {
    let PROMOTIONS = null;
    if (
        appComponent != undefined &&
        appComponent.config.HOME_CARDS_IMAGES_NOLOGUEADO != undefined &&
        appComponent.config.HOME_CARDS_IMAGES_NOLOGUEADO[appComponent.country] != undefined &&
        appComponent.config.HOME_CARDS_IMAGES_NOLOGUEADO[appComponent.country][appComponent.lngProd] != undefined
    ) {
        PROMOTIONS = appComponent.config.HOME_CARDS_IMAGES_NOLOGUEADO[appComponent.country][appComponent.lngProd];
    }
    return PROMOTIONS;
}

/**
 * Retrieves jackpot information based on the appComponent configuration.
 * @param {Object} appComponent - The application component containing configuration.
 * @returns {Object|null} - Returns the JACKPOT object or null if not found.
 */
export function getJackpot(appComponent) {
    let JACKPOT = null;
    if (appComponent.config.jackpot2 != undefined && appComponent.config.jackpot2[appComponent.country] != undefined) {
        JACKPOT = appComponent.config.jackpot2[appComponent.country];
    }
    return JACKPOT;
}

/**
 * Retrieves color configuration based on the appComponent and device type.
 * @param {Object} appComponent - The application component containing configuration.
 * @param {string} device - The type of device (desktop or mobile).
 * @returns {Object|null} - Returns the COLORS object or null if not found.
 */
export function getColors(appComponent, device) {
    let COLORS = null;
    if (appComponent.config[device] !== undefined) {
        COLORS = appComponent.config[device];
    }
    return COLORS;
}


// FILE DOCUMENTED
