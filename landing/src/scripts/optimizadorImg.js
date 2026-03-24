import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createContext, runInContext } from 'vm';

// Get the filename and directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the configuration file
const configFilePath = path.join(__dirname, '../../../public/configLanding.js');

// Imgix subdomain and optimization parameters for mobile and desktop
const IMGIX_SUBDOMAIN = 'images.virtualsoft.tech/m';
const imgixOptimizationParamsMobile = '?fm=webp&fit=max&q=70&w=480&dpr=2';
const imgixOptimizationParamsDesktop = '?fm=webp&fit=max&q=85&w=1920&dpr=2';

/**
 * Optimize the image URL based on the device type.
 * @param {string} url - The original image URL.
 * @param {string} deviceType - The type of device ('mobile' or 'desktop').
 * @returns {string} - The optimized image URL.
 */
function optimizeImageUrl(url, deviceType) {
    if (url.includes('/m/') && (url.endsWith('.png') || url.endsWith('.webp'))) {
        const urlObj = new URL(url);
        const imagePath = urlObj.pathname.replace('/m/', '/');
        if (deviceType === 'mobile') {
            return `https://${IMGIX_SUBDOMAIN}${imagePath}${imgixOptimizationParamsMobile}`;
        } else if (deviceType === 'desktop') {
            return `https://${IMGIX_SUBDOMAIN}${imagePath}${imgixOptimizationParamsDesktop}`;
        }
    }
    return url;
}

/**
 * Process the configuration object and optimize image URLs.
 * @param {object} config - The configuration object.
 * @param {string} deviceType - The type of device ('mobile' or 'desktop').
 * @returns {object} - An object containing the original and optimized URLs.
 */
function processConfig(config, deviceType) {
    const updatedUrls = {};
    for (let key in config) {
        if (typeof config[key] === 'string') {
            const optimizedUrl = optimizeImageUrl(config[key], deviceType);
            if (config[key] !== optimizedUrl) {
                updatedUrls[config[key]] = optimizedUrl;
            }
        } else if (typeof config[key] === 'object') {
            const nestedUpdatedUrls = processConfig(config[key], deviceType);
            Object.assign(updatedUrls, nestedUpdatedUrls);
        }
    }
    return updatedUrls;
}

/**
 * Update the configuration file with optimized URLs.
 * @param {object} updatedUrls - An object containing the original and optimized URLs.
 */
function updateConfigFile(updatedUrls) {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo configLanding.js:', err);
            return;
        }
        let updatedData = data;
        for (const [originalUrl, optimizedUrl] of Object.entries(updatedUrls)) {
            const regex = new RegExp(originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            updatedData = updatedData.replace(regex, optimizedUrl);
        }
        fs.writeFile(configFilePath, updatedData, (err) => {
            if (err) {
                console.error('Error sobrescribiendo el archivo de configuración:', err);
            } else {
                console.log('Archivo de configuración actualizado exitosamente.');
            }
        });
    });
}

/**
 * Read and process the configuration file.
 */
function readAndProcessConfig() {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo configLanding.js:', err);
            return;
        }
        let cleanedData = data.replace(/^window\.config\s*=\s*/, '');
        cleanedData = cleanedData.replace(/^\s*[^{}]*\s*{\s*/, '{');
        try {
            const context = createContext();
            const script = `const config = ${cleanedData}; config;`;
            const config = runInContext(script, context);
            const deviceType = config.mobileL === '1' ? 'mobile' : 'desktop';
            console.log(`Tipo de dispositivo detectado: ${deviceType}`);
            const updatedUrls = processConfig(config, deviceType);
            updateConfigFile(updatedUrls);
        } catch (e) {
            console.error('Error procesando el archivo de configuración:', e);
        }
    });
}

// Execute the read and process configuration function
readAndProcessConfig();

// FILE DOCUMENTED
