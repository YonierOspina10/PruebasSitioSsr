<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary functions from Vue
import { useRoute } from 'vue-router'; // Import useRoute for accessing route parameters

export default defineComponent({
	// Define the Vue component
	data: function () {
		let config = this.$config(); // Retrieve configuration settings
		let appComponent: any = this.$appComponent; // Get the application component
		let src: string = ''; // Initialize source URL for iframe
		return {
			config,
			appComponent,
			src,
		};
	},
	setup() {
		const route = useRoute(); // Access the current route
		let GameId: any = ref(route.params.GameId); // Create a reactive reference for GameId from route parameters
		return {
			GameId,
		};
	},
	mounted() {
		var str1 = ''; // Initialize a variable for the lobby URL
		// Determine the lobby URL based on the current pathname
		if (window.location.pathname.indexOf('live-casino') != -1) {
			str1 = this.config.urlLobbyLiveCasino;
		} else {
			if (window.location.pathname.indexOf('pragmatic-vivo') != -1) {
				str1 = this.config.urlLobbyPragmaticLive;
			} else {
				if (window.location.pathname.indexOf('evolution') != -1) {
					str1 = this.config.urlLobbyEvolution;
				} else {
					if (window.location.pathname.indexOf('betgamestv') != -1) {
						str1 = this.config.urlLobbyBetgamestv;
					} else {
						if (
							window.location.pathname.indexOf('vivogaming') != -1
						) {
							str1 = this.config.urlLobbyVivogaming;
						}
					}
				}
			}
		}
		// Construct the source URL for the iframe
		this.src =
			str1 +
			'&' +
			'lang=' +
			this.appComponent.lngProd +
			'&mode=real&partnerid=' +
			this.config.partner +
			'&token=' +
			this.appComponent.tokenUser;
		// Append mobile parameter if applicable
		if (this.appComponent.mobile == '1') {
			this.src = this.src + '&isMobile=true';
		}
		console.log(this.GameId); // Log the GameId for debugging
		// Append GameId to the source URL if it is defined
		if (this.GameId != undefined) {
			this.src = this.src + '&game=' + this.GameId;
		}
	},
});
</script>

<template>
	<!-- Main wrapper for the live casino content -->
	<div id="casino-wrapper" v-if="appComponent.liveCasinoEnabled">
		<div id="casino-content">
			<!-- Iframe for displaying live casino content -->
			<iframe
				title="Casino en vivo"
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
				:src="src"
				frameborder="0"
				width="100%"
				height="101%"
				scrolling="yes"
				id="frameCasino"
			></iframe>
		</div>
	</div>
	<!-- Wrapper for when live casino is disabled -->
	<div id="casino-wrapper-disabled" v-if="!appComponent.liveCasinoEnabled">
		<div class="container-alert">
			<div class="money-img">
				<!-- Image indicating money -->
				<img
					src="https://images.virtualsoft.tech/site/money.png"
					alt="money"
				/>
			</div>
			<div class="message-alert">
				<div class="close">
					<!-- Router link to redirect to the base URL -->
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
				<!-- Second image indicating money -->
				<img
					src="https://images.virtualsoft.tech/site/money-two.png"
					alt="money"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* General body styles */
body {
	background: black; /* Set background color to black */
	font-family: 'Roboto', sans-serif; /* Set font family */
}

/* Font face definition for custom icons */
@font-face {
	font-family: 'icomoon2';
	src: url('https://images.virtualsoft.tech/site/fonts//icomoon.eot');
	src:
		url('https://images.virtualsoft.tech/site/fonts//icomoon.eot?#iefix')
			format('embedded-opentype'),
		url('https://images.virtualsoft.tech/site/fonts//icomoon.woff')
			format('woff'),
		url('https://images.virtualsoft.tech/site/fonts//icomoon.ttf')
			format('truetype'),
		url('https://images.virtualsoft.tech/site/fonts//icomoon.svg#icomoon')
			format('svg');
	font-weight: normal;
	font-style: normal;
}

/* Styles for icon classes */
[class^='icon-'],
[class*=' icon-'] {
	font-family: 'icomoon2';
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/* Styles for alert container */
.container-alert {
	width: 100%; /* Full width */
}

/* Styles for alert message */
.message-alert {
	width: 90%; /* Width of alert message */
	margin: 0 auto; /* Center the alert */
	color: white; /* Text color */
	text-align: center; /* Center text */
	border: 1px solid #b08200; /* Border styling */
	border-radius: 15px; /* Rounded corners */
	padding: 20px; /* Padding inside alert */
}

/* Specific styles for alert message paragraphs */
.message-alert p:nth-child(3) {
	font-weight: 900; /* Bold font weight */
	font-size: 22px; /* Font size */
}
.message-alert p:nth-child(4) {
	font-weight: lighter; /* Lighter font weight */
}
.message-alert span {
	font-size: 90px; /* Font size for spans */
}

/* Icon content definitions */
.icon-mobile-d:before {
	content: '\e900'; /* Mobile icon */
}
.icon-cross:before {
	content: '\ea0f'; /* Cross icon */
}

/* Close button styles */
.message-alert .close {
	width: 100%; /* Full width */
	height: 23px; /* Height */
	display: block; /* Block display */
}
.message-alert .close span {
	float: right; /* Float to the right */
	font-size: 15px; /* Font size */
}

/* Styles for money images */
.money-img {
	width: 70%; /* Width of money image */
	margin: 0 auto; /* Center the image */
	margin-top: 100px; /* Top margin */
}
.money-img-two {
	width: 70%; /* Width of second money image */
	margin: 0 auto; /* Center the image */
}
.money-img img,
.money-img-two img {
	width: 100%; /* Full width for images */
	display: block; /* Block display */
}

/* Media query for larger screens */
@media only screen and (min-width: 736px) {
	.message-alert {
		width: 35%; /* Width for larger screens */
		margin: 0 auto; /* Center the alert */
		color: white; /* Text color */
		text-align: center; /* Center text */
		border: 1px solid #b08200; /* Border styling */
		border-radius: 15px; /* Rounded corners */
	}
	.money-img,
	.money-img-two {
		width: 25%; /* Width for money images on larger screens */
	}
}
</style>

<!-- FILE DOCUMENTED -->
