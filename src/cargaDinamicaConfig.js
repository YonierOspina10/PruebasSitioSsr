/**
 * Loads a script dynamically by creating a script element and appending it to the document head.
 *
 * @param {string} url - The URL of the script to load.
 * @param {string} [type='module'] - The type of the script (default is 'module').
 * @returns {Promise<HTMLScriptElement>} A promise that resolves with the loaded script element.
 */
function loadScript(url, type = 'module') {
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            resolve(existingScript);
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.type = type;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script ${url}`));
        document.head.appendChild(script);
    });
}

/**
 * Handles route changes by loading the appropriate configuration script based on the current path.
 * It loads either the landing configuration or the default configuration.
 */
function handleRouteChange() {
    const path = window.location.pathname;
    let configScript;
    if (path === '/' || path === '') {
        configScript = '/configLanding.js';
    } else {
        configScript = '/config.js';
    }
    loadScript(configScript)
        .then(() => loadScript('/src/main.js'))
        .catch((error) => console.error(error));
}

// Initial route handling
handleRouteChange();

// Event listener for popstate to handle back/forward navigation
window.addEventListener('popstate', handleRouteChange);

// Event listener for click events on anchor tags to handle navigation
document.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        event.preventDefault();
        const url = new URL(event.target.href);
        history.pushState(null, '', url.pathname);
        handleRouteChange();
    }
});

// FILE DOCUMENTED
