<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import { useRoute } from 'vue-router'; // Import the useRoute function from vue-router

export default defineComponent({
	// Define the component
	data: function () {
		let config = this.$config(); // Retrieve configuration settings
		let appComponent: any = this.$appComponent; // Get the application component
		let src: string = ''; // Initialize source URL for iframe
		let loadingM: boolean = true; // State to manage loading status
		return {
			config,
			appComponent,
			src,
			loadingM,
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		var str1 = this.config.urlLobbyPoker; // Get the poker lobby URL from config
		this.src =
			str1 +
			'&' +
			'lang=' +
			this.appComponent.lngProd + // Append language parameter
			'&mode=real&partnerid=' +
			this.config.partner + // Append partner ID
			'&token=' +
			this.appComponent.tokenUser; // Append user token
		if (this.appComponent.mobile == '1') {
			// Check if the app is in mobile mode
			this.src = this.src + '&isMobile=true'; // Append mobile parameter
		}
		setTimeout(() => {
			this.loadingM = false; // Set loading status to false after 4 seconds
		}, 4000);
	},
});
</script>

<template>
	<!-- Loading screen displayed while content is loading -->
	<div
		v-if="loadingM"
		id="loadingM"
		class="flex w-full h-screen items-center shadow-lg absolute"
	>
		<div class="flex-1"></div>
		<div class="flex flex-col w-12/12 pb-28 -mt-80 md:-mt-0">
			<div class="prealoader-c">
				<span>EL MEJOR</span>
				<span>POKER</span>
				<span>CASINO ONLINE</span>
			</div>
			<!-- Loading spinner SVG -->
			<svg
				fill="none"
				class="w-28 h-28 animate-spin text-white m-auto"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					clip-rule="evenodd"
					d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
					fill="currentColor"
					fill-rule="evenodd"
				/>
			</svg>
		</div>
		<div class="flex-1"></div>
	</div>
	<!-- Casino content wrapper, displayed if casino is enabled -->
	<div id="casino-wrapper" v-if="appComponent.casinoEnabled">
		<div id="casino-content">
			<!-- Iframe for displaying the casino poker content -->
			<iframe
				title="Casino Poker"
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
	<!-- Alert displayed when casino is disabled -->
	<div id="casino-wrapper-disabled" v-if="!appComponent.casinoEnabled">
		<div class="container-alert">
			<div class="money-img">
				<img
					src="https://images.virtualsoft.tech/site/money.png"
					alt="money"
				/>
			</div>
			<div class="message-alert">
				<div class="close">
					<RouterLink :to="config.baseUrlFx"
						><i class="fa fa-times"></i
					></RouterLink>
				</div>
				<i class="fa fa-mobile"></i>
				<p>¡No es posible jugar desde este punto de venta!</p>
				<p>Te invitamos a jugar desde su dispositivo móvil</p>
			</div>
			<div class="money-img-two">
				<img
					src="https://images.virtualsoft.tech/site/money-two.png"
					alt="money"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
body {
	background: black; /* Set background color to black */
	font-family: 'Roboto', sans-serif; /* Set font family */
}
@font-face {
	font-family: 'icomoon2'; /* Define custom font */
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
[class^='icon-'],
[class*=' icon-'] {
	font-family: 'icomoon2'; /* Apply custom font to icon classes */
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.container-alert {
	width: 100%; /* Full width for alert container */
}
.message-alert {
	width: 90%; /* Set width for message alert */
	margin: 0 auto; /* Center align */
	color: white; /* Text color */
	text-align: center; /* Center text */
	border: 1px solid #b08200; /* Border styling */
	border-radius: 15px; /* Rounded corners */
	padding: 20px; /* Padding inside alert */
}
.message-alert p:nth-child(3) {
	font-weight: 900; /* Bold font for specific paragraph */
	font-size: 22px; /* Font size for specific paragraph */
}
.message-alert p:nth-child(4) {
	font-weight: lighter; /* Lighter font weight for specific paragraph */
}
.message-alert span {
	font-size: 90px; /* Font size for spans in alert */
}
.icon-mobile-d:before {
	content: '\e900'; /* Icon content for mobile */
}
.icon-cross:before {
	content: '\ea0f'; /* Icon content for cross */
}
.message-alert .close {
	width: 100%; /* Full width for close button */
	height: 23px; /* Height for close button
	display: block; /* Display as block
}
.message-alert .close span {
	float: right; /* Float close button to the right */
	font-size: 15px; /* Font size for close button */
}
.money-img {
	width: 70%; /* Width for money image */
	margin: 0 auto; /* Center align */
	margin-top: 100px; /* Top margin */
}
.money-img-two {
	width: 70%; /* Width for second money image */
	margin: 0 auto; /* Center align */
}
.money-img img,
.money-img-two img {
	width: 100%; /* Full width for images */
	display: block; /* Display as block */
}
@media only screen and (min-width: 736px) {
	.message-alert {
		width: 35%; /* Adjust width for larger screens */
		margin: 0 auto; /* Center align */
		color: white; /* Text color */
		text-align: center; /* Center text */
		border: 1px solid #b08200; /* Border styling */
		border-radius: 15px; /* Rounded corners */
	}
	.money-img,
	.money-img-two {
		width: 25%; /* Adjust width for images on larger screens */
	}
}
div#loadingM {
	background: url(https://images.virtualsoft.tech/m/msjT1650579858.png); /* Background image for loading */
	background-size: 100% auto !important; /* Background size */
	background-repeat: no-repeat !important; /* No repeat for background */
}
@media (max-width: 810px) {
	div#loadingM {
		background: url(https://images.virtualsoft.tech/m/msjT1650673166.png); /* Different background for smaller screens */
	}
	.prealoader-c span:nth-child(2) {
		font-size: 95px !important; /* Adjust font size for loading text */
	}
}
.prealoader-c {
	color: white; /* Text color for preloader */
	font-family: 'Poppins'; /* Font family for preloader */
	font-size: 30px; /* Font size for preloader */
}
.prealoader-c span {
	display: block; /* Display spans as block */
	text-align: center; /* Center text */
	line-height: 69px; /* Line height for spans */
}
.prealoader-c span:nth-child(2) {
	font-size: 124px; /* Font size for second span in preloader */
}
</style>

<!-- FILE DOCUMENTED -->
