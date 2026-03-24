import emitter from 'tiny-emitter/instance'; // Importing TinyEmitter instance for event handling

export default {
    install: (app, options = {}) => {
        // Check if Zendesk is enabled and key is provided
        if (!options.disabled && (!options.key || options.key.length === 0)) {
            console.warn('Please enter a Zendesk Web Widget Key'); // Warn if key is missing
        }

        const disabledLogger = function (method, ...args) {
            console.log('Zendesk is disabled, you called:', { method, args }); // Log calls when Zendesk is disabled
        };

        // Assign disabled logger if Zendesk is disabled
        if (options.disabled) {
            window.zE = disabledLogger;
        }

        window.zESettings = options.settings; // Set Zendesk settings

        const root = {}; // Create root object for methods

        // Event handling methods
        root.$on = (...args) => emitter.on(...args);
        root.$once = (...args) => emitter.once(...args);
        root.$off = (...args) => emitter.off(...args);
        root.$emit = (...args) => emitter.emit(...args);

        let isLoaded = false; // Track if Zendesk is loaded
        root.isLoaded = () => isLoaded; // Method to check if loaded

        root.load = (zendeskKey) => {
            // Load Zendesk script
            if (isLoaded) {
                return; // Prevent loading if already loaded
            }
            const script = document.createElement('script'); // Create script element
            script.type = 'text/javascript'; // Set script type
            script.async = true; // Load script asynchronously
            script.id = 'ze-snippet'; // Set script ID
            const actualZendeskKey = zendeskKey || options.key; // Determine Zendesk key
            script.src = 'https://static.zdassets.com/ekr/snippet.js?key=' + actualZendeskKey; // Set script source

            // Set nonce attribute if provided
            if (options.nonce) {
                script.setAttribute('nonce', options.nonce);
            }

            delete window.zE; // Remove existing zE reference
            const first = document.getElementsByTagName('script')[0]; // Get first script element
            first.parentNode.insertBefore(script, first); // Insert new script before the first script

            script.onload = (event) => {
                isLoaded = true; // Mark as loaded
                if (options.hideOnLoad) {
                    root.hide(); // Hide widget if specified
                }
                root.$emit('loaded', event); // Emit loaded event

                // Event listeners for widget open and close
                window.zE('webWidget:on', 'open', () => {
                    root.$emit('open'); // Emit open event
                });
                window.zE('webWidget:on', 'close', () => {
                    root.$emit('close'); // Emit close event
                });
            };
        };

        // Load Zendesk if not disabled
        if (!options.disabled) {
            root.load(options.key);
        }

        // Define methods for widget interactions
        root.hide = () => window.zE('webWidget', 'hide');
        root.show = () => window.zE('webWidget', 'show');
        root.logout = () => window.zE('webWidget', 'logout');
        root.identify = (user) => window.zE('webWidget', 'identify', user);
        root.prefill = (user) => window.zE('webWidget', 'prefill', user);
        root.setLocale = (locale) => window.zE('webWidget', 'setLocale', locale);
        root.updateSettings = (settings) => window.zE('webWidget', 'updateSettings', settings);
        root.clear = () => window.zE('webWidget', 'clear');
        root.updatePath = (options) => window.zE('updatePath', 'clear', options);
        root.toggle = () => window.zE('webWidget', 'toggle');
        root.reset = () => window.zE('webWidget', 'reset');
        root.close = () => window.zE('webWidget', 'close');
        root.open = () => window.zE('webWidget', 'open');

        // Messenger methods (duplicate of widget methods)
        root.hide = () => window.zE('messenger', 'hide');
        root.show = () => window.zE('messenger', 'show');
        root.logout = () => window.zE('messenger', 'logout');
        root.identify = (user) => window.zE('messenger', 'identify', user);
        root.prefill = (user) => window.zE('messenger', 'prefill', user);
        root.setLocale = (locale) => window.zE('messenger', 'setLocale', locale);
        root.updateSettings = (settings) => window.zE('messenger', 'updateSettings', settings);
        root.clear = () => window.zE('messenger', 'clear');
        root.updatePath = (options) => window.zE('updatePath', 'clear', options);
        root.toggle = () => window.zE('messenger', 'toggle');
        root.reset = () => window.zE('messenger', 'reset');
        root.close = () => window.zE('messenger', 'close');
        root.open = () => window.zE('messenger', 'open');

        // Define property to access zE
        Object.defineProperty(root, 'zE', {
            get: function get() {
                return window.zE; // Getter for zE
            },
        });

        app.config.globalProperties.$zendesk = root; // Attach root to global properties
    },
};

// FILE DOCUMENTED
