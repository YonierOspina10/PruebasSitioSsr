import emitter from 'tiny-emitter/instance';

/**
 * Vue.js plugin for integrating Zendesk Web Widget.
 * @param {Object} app - The Vue application instance.
 * @param {Object} [options={}] - Configuration options for the plugin.
 * @param {boolean} [options.disabled=false] - Disable the Zendesk integration.
 * @param {string} [options.key] - Zendesk Web Widget Key.
 * @param {Object} [options.settings] - Settings for the Zendesk widget.
 * @param {string} [options.nonce] - Nonce for script security.
 * @param {boolean} [options.hideOnLoad=false] - Hide widget on load.
 */
export default {
	install: (app, options = {}) => {
		// Warn if the widget key is missing when not disabled
		if (!options.disabled && (!options.key || options.key.length === 0)) {
			console.warn('Please enter a Zendesk Web Widget Key');
		}

		// Logger function for when Zendesk is disabled
		const disabledLogger = function (method, ...args) {
			console.log('Zendesk is disabled, you called:', { method, args });
		};

		// Assign disabled logger to window.zE if disabled
		if (options.disabled) {
			window.zE = disabledLogger;
		}

		// Set global settings for Zendesk
		window.zESettings = options.settings;

		const root = {};

		// Event handling methods using tiny-emitter
		root.$on = (...args) => emitter.on(...args);
		root.$once = (...args) => emitter.once(...args);
		root.$off = (...args) => emitter.off(...args);
		root.$emit = (...args) => emitter.emit(...args);

		let isLoaded = false;

		// Check if the widget is loaded
		root.isLoaded = () => isLoaded;

		/**
		 * Load the Zendesk widget script.
		 * @param {string} zendeskKey - The Zendesk Web Widget Key.
		 */
		root.load = (zendeskKey) => {
			if (isLoaded) {
				return; // Prevent loading if already loaded
			}

			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.id = 'ze-snippet';
			const actualZendeskKey = zendeskKey || options.key;

			// Set the source of the script to the Zendesk snippet
			script.src =
				'https://static.zdassets.com/ekr/snippet.js?key=' +
				actualZendeskKey;

			// Set nonce attribute if provided
			if (options.nonce) {
				script.setAttribute('nonce', options.nonce);
			}

			delete window.zE; // Clear previous zE reference

			// Insert the script into the document
			const first = document.getElementsByTagName('script')[0];
			first.parentNode.insertBefore(script, first);

			// On script load, set isLoaded to true and emit events
			script.onload = (event) => {
				isLoaded = true;
				if (options.hideOnLoad) {
					root.hide(); // Hide widget if specified
				}
				root.$emit('loaded', event); // Emit loaded event

				// Event listeners for widget open and close
				window.zE('webWidget:on', 'open', () => {
					root.$emit('open');
				});
				window.zE('webWidget:on', 'close', () => {
					root.$emit('close');
				});
			};
		};

		// Load the widget if not disabled
		if (!options.disabled) {
			root.load(options.key);
		}

		// Methods to control the web widget
		root.hide = () => window.zE('webWidget', 'hide');
		root.show = () => window.zE('webWidget', 'show');
		root.logout = () => window.zE('webWidget', 'logout');
		root.identify = (user) => window.zE('webWidget', 'identify', user);
		root.prefill = (user) => window.zE('webWidget', 'prefill', user);
		root.setLocale = (locale) =>
			window.zE('webWidget', 'setLocale', locale);
		root.updateSettings = (settings) =>
			window.zE('webWidget', 'updateSettings', settings);
		root.clear = () => window.zE('webWidget', 'clear');
		root.updatePath = (options) =>
			window.zE('updatePath', 'clear', options);
		root.toggle = () => window.zE('webWidget', 'toggle');
		root.reset = () => window.zE('webWidget', 'reset');
		root.close = () => window.zE('webWidget', 'close');
		root.open = () => window.zE('webWidget', 'open');

		// Messenger methods (duplicate of web widget methods)
		root.hide = () => window.zE('messenger', 'hide');
		root.show = () => window.zE('messenger', 'show');
		root.logout = () => window.zE('messenger', 'logout');
		root.identify = (user) => window.zE('messenger', 'identify', user);
		root.prefill = (user) => window.zE('messenger', 'prefill', user);
		root.setLocale = (locale) =>
			window.zE('messenger', 'setLocale', locale);
		root.updateSettings = (settings) =>
			window.zE('messenger', 'updateSettings', settings);
		root.clear = () => window.zE('messenger', 'clear');
		root.updatePath = (options) =>
			window.zE('updatePath', 'clear', options);
		root.toggle = () => window.zE('messenger', 'toggle');
		root.reset = () => window.zE('messenger', 'reset');
		root.close = () => window.zE('messenger', 'close');
		root.open = () => window.zE('messenger', 'open');

		// Define a property to access the global zE object
		Object.defineProperty(root, 'zE', {
			get: function get() {
				return window.zE;
			},
		});

		// Attach the root object to the global properties of the Vue app
		app.config.globalProperties.$zendesk = root;
	},
};

// FILE DOCUMENTED
