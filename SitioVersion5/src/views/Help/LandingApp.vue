<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue for component definition
import IconPlay from '@/components/icons/IconPlay.vue'; // Importing the IconPlay component
import IconCheck from '@/components/icons/IconCheck.vue'; // Importing the IconCheck component

export default defineComponent({
	/**
	 * Component data function.
	 * Initializes the component's data properties.
	 * @returns {Object} The data object containing the configuration.
	 */
	data: function () {
		let config = this.$config(); // Fetching the configuration using a custom method
		return {
			config, // Returning the configuration object as part of the component's data
		};
	},
	components: {
		IconPlay, // Registering the IconPlay component for use in the template
		IconCheck, // Registering the IconCheck component for use in the template
	},
	methods: {
		/**
		 * Redirects the user to the application download URL.
		 * If the footer URL is defined, it uses that; otherwise, it falls back to the APK URL.
		 */
		redirectToApp() {
			window.location.assign(
				this.config.footer_ != undefined && // Checking if footer_ is defined
					this.config.footer_.url_download_app != undefined // Checking if the download URL is defined
					? this.config.footer_.url_download_app // Using the footer download URL if available
					: this.config.landing.app.apk_url // Fallback to the APK URL
			);
		},
	},
});
</script>
<template>
	<!-- Main wrapper for the entire page -->
	<div class="page-wrapper">
		<!-- Header section with navigation -->
		<div class="site-header header-one home-page-two">
			<nav
				class="navbar navbar-expand-lg navbar-light header-navigation stricky"
			>
				<!-- Container for the header content -->
				<div class="container clearfix">
					<!-- Logo and menu toggler -->
					<div class="logo-box clearfix">
						<RouterLink :to="'/'" class="navbar-brand">
							<img
								class="logoneww"
								width="250"
								:src="config.header.logo.src"
								alt=""
							/>
						</RouterLink>
						<button
							class="menu-toggler"
							data-target="#main-nav-bar"
						>
							<span class="fa fa-bars"></span>
						</button>
					</div>
					<!-- Main navigation menu -->
					<div class="main-navigation" id="main-nav-bar">
						<ul class="one-page-scroll-menu navigation-box">
							<li class="current scrollToLink"></li>
						</ul>
					</div>
					<!-- Right side buttons -->
					<div class="right-side-box">
						<button @click="redirectToApp" class="header-btn">
							{{ $t('Descargar') }}
						</button>
					</div>
				</div>
			</nav>
		</div>
		<!-- Banner section -->
		<section class="banner-style-one home-page-two" id="banner">
			<!-- Decorative bubbles -->
			<span class="bubble-1"></span>
			<span class="bubble-2"></span>
			<span class="bubble-3"></span>
			<span class="bubble-4"></span>
			<span class="bubble-5"></span>
			<span class="bubble-6"></span>
			<!-- Conditional image display -->
			<img
				width="700"
				v-if="
					config.landing != undefined &&
					config.landing.app != undefined &&
					config.landing.app.assets != undefined &&
					config.landing.app.assets.one != undefined
				"
				:src="config.landing.app.assets.one"
				class="banner-mock m-auto relative md:absolute"
				alt=""
			/>
			<!-- Container for banner content -->
			<div class="container">
				<div
					class="row grid md:grid-flow-col md:grid-cols-2 auto-cols-fr justify-center grid-cols-1 gap-10"
				>
					<div class="col-xl-6 col-lg-8">
						<div class="content-block">
							<h3>
								{{ $t('La mejor App') }}<br />{{
									$t(' de Apuestas Online')
								}}
							</h3>
							<p>
								{{
									$t(
										'Vive la emoción del casino online desde tu dispositivo favorito '
									)
								}}<br />{{
									$t('con nuestra aplicación para Android. ')
								}}<br />{{
									$t(
										'Descárgala para disfrutar de las mejores ligas, torneos, tragamonedas, Live Casino y mucho más.'
									)
								}}
							</p>
							<div class="button-block">
								<button
									id="dercargarApp2"
									class="banner-btn"
									@click="redirectToApp"
								>
									<IconPlay
										:width="'30px'"
										:height="'30px'"
										:fill="'white'"
									/>
									{{ $t('Descargar para')
									}}<span>{{ $t('Android') }}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Services section -->
		<section class="services-style-one" id="service">
			<div class="container">
				<div class="block-title text-center">
					<!-- Conditional image display -->
					<img
						v-if="
							config.landing != undefined &&
							config.landing.app != undefined &&
							config.landing.app.assets != undefined &&
							config.landing.app.assets.two != undefined
						"
						:src="config.landing.app.assets.two"
						alt=""
						class="wow rotateIn m-auto w-20"
						data-wow-duration="1000ms"
					/>
					<h2>{{ $t('¿Como instalar nuestra App?') }}</h2>
				</div>
				<div
					class="row grid md:grid-flow-col auto-cols-fr justify-center grid-cols-1 gap-6"
				>
					<!-- Step 1: Settings -->
					<div class="col-lg-3 col-md-6 col-sm-12">
						<div class="single-pricing-one basic-pack">
							<div class="">
								<span class="price">1</span>
								<span class="pack-name">{{ 'Ajustes' }}</span>
								<i class="step fa fa-cogs"></i>
								<div class="line"></div>
							</div>
							<ul class="feature-lists">
								<li>
									{{
										$t(
											'Busca "Ajustes" en tu dispositivo y selecciona la opción “Seguridad”. Habilita “Fuentes Desconocidas” para permitir la instalación*. .'
										)
									}}
								</li>
							</ul>
						</div>
					</div>
					<!-- Step 2: Download -->
					<div class="col-lg-3 col-md-6 col-sm-12">
						<div class="single-pricing-one pro-pack">
							<div class="lg:py-4">
								<span class="price">2</span>
								<span class="pack-name">{{
									$t('Descarga')
								}}</span>
								<i class="step fa fa-download"></i>
								<div class="line"></div>
							</div>
							<ul class="feature-lists">
								<li>
									{{ $t('Haz clic en el botón ')
									}}<a
										style="color: #ad63f3"
										target="_self"
										id="dercargarApp3"
										:href="
											config.footer_ != undefined &&
											config.footer_.url_download_app !=
												undefined
												? config.footer_
														.url_download_app
												: config.landing.app.apk_url
										"
										>{{ $t('Descargar') }}</a
									>{{ $t(' para bajar la aplicación.') }}
								</li>
							</ul>
						</div>
					</div>
					<!-- Step 3: Install -->
					<div class="col-lg-3 col-md-6 col-sm-12">
						<div class="single-pricing-one biz-pack">
							<div class="lg:py-4">
								<span class="price">3</span>
								<span class="pack-name">{{
									$t('Instalar')
								}}</span>
								<i class="step fa fa-rocket"></i>
								<div class="line"></div>
							</div>
							<ul class="feature-lists">
								<li>
									{{ $t('Abre la carpeta de “Descargas” ')
									}}<br />{{
										$t(
											'y selecciona la aplicación (carpeta de la aplicación).'
										)
									}}
								</li>
							</ul>
						</div>
					</div>
					<!-- Step 4: Play -->
					<div class="col-lg-3 col-md-6 col-sm-12">
						<div class="single-pricing-one basic-pack">
							<div class="">
								<span class="price">4</span>
								<span class="pack-name">{{ $t('Juega') }}</span>
								<i class="step fa fa-star"></i>
								<div class="line"></div>
							</div>
							<ul class="feature-lists">
								<li>
									{{ $t('El ícono de la aplicación de ')
									}}{{
										config.partner_name != undefined
											? config.partner_name
											: config.name
									}}{{
										$t(
											' será agregada a tu pantalla de inicio y ¡estarás listo para jugar!'
										)
									}}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Features section -->
		<section class="feature-style-two" id="features">
			<div class="container">
				<div
					class="row grid md:grid-flow-col auto-cols-fr justify-center grid-cols-1 gap-6"
				>
					<div class="col-lg-6">
						<div class="image-block">
							<!-- Conditional image display -->
							<img
								class="m-auto"
								v-if="
									config.landing != undefined &&
									config.landing.app != undefined &&
									config.landing.app.assets != undefined &&
									config.landing.app.assets.three != undefined
								"
								style="max-width: 120%"
								:src="config.landing.app.assets.three"
								alt=""
							/>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="content-block">
							<div class="block-title">
								<!-- Conditional image display -->
								<img
									v-if="
										config.landing != undefined &&
										config.landing.app != undefined &&
										config.landing.app.assets !=
											undefined &&
										config.landing.app.assets.four !=
											undefined
									"
									:src="config.landing.app.assets.four"
									alt=""
									class="wow rotateIn m-auto d-block"
									data-wow-duration="1000ms"
								/>
								<h2>
									{{ $t('Características de nuestra App') }}
								</h2>
							</div>
							<p>
								{{ $t('Conoce los puntos importantes ')
								}}<br />{{ $t(' de nuestra App de apuestas.') }}
							</p>
							<ul class="feature-lists">
								<li>
									<IconCheck
										:width="'20px'"
										:height="'20px'"
										:fill="'#e94fca'"
										class=""
									/>
									{{
										$t(
											' Un diseño fluido para navegar por nuestros juegos.'
										)
									}}
								</li>
								<li>
									<IconCheck
										:width="'20px'"
										:height="'20px'"
										:fill="'#e94fca'"
										class=""
									/>
									{{
										$t(
											' Tiempos cortos de espera entre cada acción.'
										)
									}}
								</li>
								<li>
									<IconCheck
										:width="'20px'"
										:height="'20px'"
										:fill="'#e94fca'"
										class=""
									/>
									{{
										$t(
											' Puede seguir en vivo los puntajes de cada partido.'
										)
									}}
								</li>
								<li>
									<IconCheck
										:width="'20px'"
										:height="'20px'"
										:fill="'#e94fca'"
										class=""
									/>
									{{
										$t(
											' Con mucha frecuencia ofrecemos ofertas exclusivas por la App.'
										)
									}}
								</li>
								<li>
									<IconCheck
										:width="'20px'"
										:height="'20px'"
										:fill="'#e94fca'"
										class=""
									/>
									{{
										$t(
											' Puede realizar depositos y retiros con muchas mas facilidad.'
										)
									}}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	<!-- Scroll to top button -->
	<a data-target="html" class="scroll-to-target scroll-to-top"
		><i class="fa fa-long-arrow-up"></i
	></a>
</template>
<style scoped>
body {
	/* Set the font family to Roboto with a fallback to sans-serif */
	font-family: 'Roboto', sans-serif;
	/* Set the base font size */
	font-size: 16px;
	/* Set the line height for better readability */
	line-height: 30px;
	/* Set the text color */
	color: #777b92;
}

a:active,
a:hover,
a:focus,
a:visited {
	/* Remove text decoration for links in various states */
	text-decoration: none;
}

.page-wrapper {
	/* Position relative to allow absolute positioning of child elements */
	position: relative;
	/* Center the page wrapper horizontally */
	margin: 0 auto;
	/* Full width of the container */
	width: 100%;
	/* Minimum width to maintain layout */
	min-width: 300px;
	/* Hide overflow content */
	overflow: hidden;
	/* Set background color to white */
	background: white;
}

.view {
	/* Remove top margin */
	margin-top: 0;
	/* Remove top border */
	border-top: none;
}

@media (max-width: 810px) {
	/* Responsive styles for screens smaller than 810px */
	.logoneww {
		/* Set logo width */
		width: 170px;
	}

	.feature-style-two .image-block {
		/* Use flexbox for centering content */
		display: flex;
		justify-content: center;
		align-items: center;
		/* Override left positioning */
		left: 0px !important;
	}

	.feature-style-two .image-block:before {
		/* Override left positioning for the before pseudo-element */
		left: -331px !important;
	}

	.feature-style-two .image-block:after {
		/* Override right positioning for the after pseudo-element */
		right: 338px !important;
	}
}

/* Media query for screens larger than 1200px */
@media (min-width: 1200px) {
	.container {
		/* Sets the maximum width of the container to 1200px */
		max-width: 1200px;
	}
}

/* Style for horizontal rule with class 'style-one' */
hr.style-one {
	/* Removes default margin and sets a top border */
	margin: 0;
	border-top: 1px solid #eaeaea;
}

/* Style for block titles */
.block-title {
	/* Adds bottom margin to separate from following content */
	margin-bottom: 50px;
}

/* Style for h2 elements within block titles */
.block-title h2 {
	/* Resets margin and sets text color, size, weight, and line height */
	margin: 0;
	color: #273167;
	font-size: 46px;
	margin-top: 50px;
	font-weight: 400;
	line-height: 3.233rem;
}

/* Style for scroll-to-top button */
.scroll-to-top {
	/* Sets dimensions, background color, border radius, and positioning */
	display: inline-block;
	width: 45px;
	height: 45px;
	background: #e94fca;
	border-radius: 4px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 99; /* Ensures it appears above other elements */
	text-align: center;
	transition: all 0.4s ease; /* Smooth transition for hover effects */
	display: none; /* Initially hidden */
}

/* Styles for the scroll-to-top button icon */
.scroll-to-top i {
	font-size: 18px; /* Sets the font size of the icon */
	line-height: 45px; /* Aligns the icon vertically */
	color: #fff; /* Sets the icon color to white */
}

/* Styles for the hover state of the scroll-to-top button */
.scroll-to-top:hover {
	background: #273167; /* Changes background color on hover */
}

/* Styles for the header navigation */
.header-navigation {
	background-color: transparent; /* Sets background to transparent */
	margin-bottom: 0; /* Removes bottom margin */
	border: none; /* Removes border */
	border-radius: 0; /* Removes border radius */
	padding: 0; /* Removes padding */
	position: relative; /* Sets positioning context */
	background-color: transparent; /* Ensures background is transparent */
}

/* Styles for the container within the header navigation */
.header-navigation .container {
	background: transparent; /* Sets background to transparent */
	position: relative; /* Sets positioning context */
	display: block; /* Ensures the container is a block element */
}

/* Styles for the logo box within the header navigation container */
.header-navigation .container .logo-box {
	float: left; /* Aligns the logo box to the left */
	position: absolute; /* Positions the logo box absolutely */
	top: 50%; /* Centers the logo box vertically */
	left: 15px; /* Positions the logo box 15px from the left */
	-webkit-transform: translateY(
		-50%
	); /* Centers the logo box vertically in WebKit browsers */
	-ms-transform: translateY(-50%); /* Centers the logo box vertically in IE */
	transform: translateY(-50%); /* Centers the logo box vertically */
}

.header-navigation .container .navbar-brand {
	/* Sets the height to auto and removes margin for the brand element */
	height: auto;
	margin: 0;
}

.header-navigation .container .menu-toggler {
	/* Hides the menu toggler element by default */
	display: none;
}

.header-navigation .container .right-side-box {
	/* Positions the right-side box absolutely, centered vertically */
	position: absolute;
	top: 50%;
	-webkit-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	right: 15px; /* Aligns the box 15px from the right */
}

.header-navigation .main-navigation {
	/* Floats the main navigation to the right and aligns text to the right */
	float: right;
	text-align: right;
}

@media (min-width: 1200px) {
	.header-navigation .main-navigation {
		/* Ensures the main navigation is displayed as a block on larger screens */
		display: block !important;
	}
}

.header-navigation ul.navigation-box {
	/* Resets margin and padding, and removes list styling for the navigation box */
	margin: 0;
	padding: 0;
	list-style: none;
}

/* Hides the sub-navigation toggler element within the navigation links */
.header-navigation ul.navigation-box li a .sub-nav-toggler {
	display: none;
}

/* Styles for list items in the main navigation */
.header-navigation ul.navigation-box > li {
	position: relative; /* Positions the list item relative to its normal position */
	padding: 0px 0; /* No vertical padding */
	display: inline-block; /* Displays list items inline */
	vertical-align: middle; /* Aligns items vertically in the middle */
}

/* Adds left margin to all list items except the first one */
.header-navigation ul.navigation-box > li + li {
	margin-left: 45px; /* Space between list items */
}

/* Removes left padding from the first list item */
.header-navigation ul.navigation-box > li:first-child {
	padding-left: 0; /* No left padding for the first item */
}

/* Removes right padding from the last list item */
.header-navigation ul.navigation-box > li:last-child {
	padding-right: 0; /* No right padding for the last item */
}

/* Styles for anchor tags within the list items */
.header-navigation ul.navigation-box > li > a {
	font-weight: 500; /* Medium font weight */
	font-size: 16px; /* Font size for the links */
	color: #777b92; /* Text color */
	padding: 0; /* No padding */
	transition: all 0.4s ease; /* Smooth transition for all properties */
	position: relative; /* Positions the anchor relative to its normal position */
}

/* Styles for the header navigation links and their hover effects */
.header-navigation ul.navigation-box > li > a:before {
	content: ''; /* Empty content for the pseudo-element */
	position: absolute; /* Positioning the pseudo-element absolutely */
	bottom: -5px; /* Positioning it 5px below the link */
	left: 0; /* Aligning it to the left of the link */
	transform: scale(0, 1); /* Initial scale set to 0 for the x-axis */
	transform-origin: right center; /* Transform origin for scaling */
	width: 100%; /* Full width of the link */
	height: 2px; /* Height of the underline */
	background-color: #e94fca; /* Color of the underline */
	transition: transform 0.4s ease; /* Smooth transition for scaling */
}

/* Styles for the current and hovered navigation links */
.header-navigation ul.navigation-box > li.current > a,
.header-navigation ul.navigation-box > li:hover > a {
	color: #e94fca; /* Change link color on hover or when current */
}

/* Styles for the underline effect on current and hovered links */
.header-navigation ul.navigation-box > li.current > a:before,
.header-navigation ul.navigation-box > li:hover > a:before {
	transform: scale(1, 1); /* Scale to full size on hover or current */
	transform-origin: left center; /* Change transform origin for scaling */
}

/* Styles for the sub-menu under the navigation items */
.header-navigation ul.navigation-box > li > .sub-menu {
	position: absolute; /* Positioning the sub-menu absolutely */
	top: 100%; /* Positioning it directly below the parent item */
	left: 0; /* Aligning it to the left of the parent item */
	z-index: 1000; /* Ensuring it appears above other elements */
	float: left; /* Floating the sub-menu to the left */
	min-width: 220px; /* Minimum width for the sub-menu */
	padding: 0px 0px; /* No padding */
	text-align: left; /* Left-aligning text in the sub-menu */
	list-style: none; /* Removing default list styles */
	background-color: #273167; /* Background color of the sub-menu */
	background-clip: padding-box; /* Clipping background to padding box */
	opacity: 0; /* Initial opacity set to 0 (hidden) */
	border-radius: 0px; /* No border radius */
	visibility: hidden; /* Initially hidden */
	transition:
		opacity 0.4s ease,
		/* Smooth transition for opacity */ visibility 0.4s ease; /* Smooth transition for visibility */
	box-shadow: 0px 10px 18px rgba(0, 0, 0, 0.1); /* Shadow effect for depth */
}

/* Media query for screens larger than 1200px */
@media (min-width: 1200px) {
	/* Display the sub-menu as a block element */
	.header-navigation ul.navigation-box > li > .sub-menu {
		display: block !important;
	}
}

/* Right-aligned sub-menu */
.header-navigation ul.navigation-box > li > .sub-menu.right-align {
	left: auto; /* Reset left positioning */
	right: 0; /* Align to the right */
}

/* Center-aligned sub-menu */
.header-navigation ul.navigation-box > li > .sub-menu.center-align {
	left: 50%; /* Center horizontally */
	transform: translateX(-50%); /* Adjust position to center */
}

/* Styles for each sub-menu item */
.header-navigation ul.navigation-box > li > .sub-menu > li {
	display: block; /* Display as block */
	position: relative; /* Position relative for absolute children */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

/* Border between sub-menu items */
.header-navigation ul.navigation-box > li > .sub-menu > li + li {
	border-top: 1px solid rgba(255, 255, 255, 0.1); /* Light border for separation */
}

/* Styles for links within sub-menu items */
.header-navigation ul.navigation-box > li > .sub-menu > li > a {
	font-size: 15px; /* Font size for links */
	color: #fff; /* Text color */
	font-weight: 500; /* Medium font weight */
	padding: 12px 30px; /* Padding for clickable area */
	display: block; /* Display as block for full-width clickable area */
	line-height: 26px; /* Line height for text */
	white-space: nowrap; /* Prevent text wrapping */
	position: relative; /* Position relative for potential absolute children */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

/* Styles for the sub-menu links on hover */
.header-navigation ul.navigation-box > li > .sub-menu > li:hover > a {
	color: #273167; /* Text color on hover */
	background: #fff; /* Background color on hover */
}

/* Styles for the list item before pseudo-element on hover */
.header-navigation ul.navigation-box > li:hover:before {
	transform: scale(1, 1); /* Scale transformation on hover */
	transform-origin: left bottom; /* Origin point for the scale transformation */
}

/* Styles for the sub-menu visibility on parent list item hover */
.header-navigation ul.navigation-box > li:hover > .sub-menu {
	opacity: 1; /* Fully visible on hover */
	visibility: visible; /* Ensure visibility on hover */
}

/* Empty rule for list items within the navigation box */
.header-navigation ul.navigation-box > li > ul > li {
}

/* Styles for the sub-menu of nested list items */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu {
	position: absolute; /* Positioned absolutely relative to the parent */
	top: 0%; /* Aligns to the top of the parent */
	left: 100%; /* Positions to the right of the parent */
	z-index: 1000; /* High stacking order to appear above other elements */
	float: left; /* Floats to the left */
	min-width: 220px; /* Minimum width of the sub-menu */
	padding: 0px 0px; /* No padding */
	text-align: left; /* Aligns text to the left */
	list-style: none; /* Removes default list styling */
	background-color: #273167; /* Background color of the sub-menu */
	background-clip: padding-box; /* Background clipping */
	opacity: 0; /* Initially hidden */
	border-radius: 0px; /* No border radius */
	visibility: hidden; /* Hidden by default */
	transition: /* Smooth transition for opacity and visibility */
		opacity 0.4s ease,
		visibility 0.4s ease;
	box-shadow: 0px 10px 18px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

@media (min-width: 1200px) {
	/* Display sub-menu as block for larger screens */
	.header-navigation ul.navigation-box > li > ul > li > .sub-menu {
		display: block !important;
	}
}

/* Right-aligned sub-menu positioning */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu.right-align {
	left: auto; /* Reset left positioning */
	right: 100%; /* Align to the right of the parent */
}

/* Center-aligned sub-menu positioning */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu.center-align {
	left: 50%; /* Center horizontally */
	transform: translateX(-50%); /* Adjust position to center */
}

/* Styles for each item in the sub-menu */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu > li {
	display: block; /* Display items as block */
	position: relative; /* Position relative for absolute children */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Border between sub-menu items */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu > li + li {
	border-top: 1px solid rgba(255, 255, 255, 0.1); /* Light border for separation */
}

/* Styles for links within the sub-menu */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu > li > a {
	font-size: 15px; /* Font size for links */
	color: #fff; /* Text color */
	font-weight: 500; /* Medium font weight */
	padding: 12px 30px; /* Padding for clickable area */
	display: block; /* Display links as block */
	line-height: 26px; /* Line height for readability */
	white-space: nowrap; /* Prevent text wrapping */
	position: relative; /* Position relative for hover effects */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Styles for the navigation links in the sub-menu on hover */
.header-navigation ul.navigation-box > li > ul > li > .sub-menu > li:hover > a {
	color: #273167; /* Text color on hover */
	background: #fff; /* Background color on hover */
}

/* Styles for the sub-menu visibility when the parent list item is hovered */
.header-navigation ul.navigation-box > li > ul > li:hover > .sub-menu {
	opacity: 1; /* Fully opaque when hovered */
	visibility: visible; /* Make the sub-menu visible */
}

/* Hide the sub-menus by default */
.header-navigation ul.navigation-box > li > ul > li ul {
	display: none; /* Sub-menus are not displayed */
}

/* Styles for the sticky header when it is fixed at the top */
.header-navigation.stricky-fixed {
	position: fixed; /* Fixes the header to the top of the viewport */
	top: 0; /* Aligns to the top */
	left: 0; /* Aligns to the left */
	width: 100%; /* Full width of the viewport */
	z-index: 991; /* Stacking order */
	background: #273167; /* Background color for the sticky header */
	border-bottom: 0; /* No border at the bottom */
}

/* Styles for the main site header */
.site-header.header-one {
	background-color: transparent; /* Transparent background initially */
	position: absolute; /* Positioned absolutely within its parent */
	top: 0; /* Aligns to the top */
	left: 0; /* Aligns to the left */
	width: 100%; /* Full width of the parent */
	z-index: 50; /* Stacking order */
}

.site-header.header-one .header-navigation {
	/* Sets the background to transparent for the header navigation */
	background: transparent;
}

.site-header.header-one .header-navigation.stricky-fixed {
	/* Applies a white background and shadow when the navigation is fixed */
	background-color: #fff;
	box-shadow: 0px 5px 30px 0px rgba(233, 79, 202, 0.05);
}

.site-header.header-one .header-navigation .container {
	/* Adds right padding to the container within the header navigation */
	padding-right: 185px;
}

.site-header.header-one .header-navigation ul.navigation-box > li.current > a,
.site-header.header-one .header-navigation ul.navigation-box > li:hover > a {
	/* Changes the text color for the current and hovered navigation links */
	color: #e94fca;
}

.site-header.header-one .header-navigation ul.navigation-box > li {
	/* Sets vertical padding for each navigation list item */
	padding: 45px 0;
}

.site-header.header-one .header-navigation ul.navigation-box > li + li {
	/* Adds left margin to all navigation list items except the first one */
	margin-left: 56px;
}

.site-header.header-one .header-navigation .right-side-box .header-btn {
	/* Styles the header button with border, background, shadow, and padding */
	display: inline-block; /* Makes the button inline with vertical alignment */
	vertical-align: middle; /* Aligns the button vertically in the middle */
	border-style: solid; /* Sets the border style to solid */
	border-width: 1px; /* Sets the border width */
	border-color: #ffd6f3; /* Sets the border color */
	border-radius: 4px; /* Rounds the corners of the button */
	background-color: white; /* Sets the background color to white */
	box-shadow: 0px 15px 30px 0px rgba(233, 79, 202, 0.1); /* Adds a shadow effect */
	color: #e94fca; /* Sets the text color */
	font-size: 16px; /* Sets the font size */
	font-weight: 500; /* Sets the font weight */
	padding: 11px 38px; /* Adds padding inside the button */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

/* Styles for the header button on hover state */
.site-header.header-one .header-navigation .right-side-box .header-btn:hover {
	color: #fff; /* Text color changes to white on hover */
	background-color: #e94fca; /* Background color changes to a pink shade on hover */
	border-color: #e94fca; /* Border color matches the background on hover */
}

/* Padding for list items in the sticky fixed navigation */
.site-header.header-one
	.header-navigation.stricky-fixed
	ul.navigation-box
	> li {
	padding: 25px 0; /* Vertical padding for list items */
}

/* Styles for the sticky fixed navigation on the home page two */
.site-header.home-page-two .header-navigation.stricky-fixed {
	background-image: linear-gradient(
		-145deg,
		#320b82 0%,
		#9c33c3 100%
	); /* Gradient background */
	box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.15); /* Shadow effect for depth */
}

/* Text color for links in the navigation on home page two */
.site-header.home-page-two .header-navigation ul.navigation-box > li > a {
	color: #d6c9e4; /* Light purple color for links */
}

/* Styles for the current list item and hovered list item links */
.site-header.home-page-two
	.header-navigation
	ul.navigation-box
	> li.current
	> a,
.site-header.home-page-two .header-navigation ul.navigation-box > li:hover > a {
	color: #fff; /* Text color changes to white for current and hovered items */
}

/* Styles for the header button in the right-side box of the navigation on the home page */
.site-header.home-page-two .header-navigation .right-side-box .header-btn {
	border-color: #fff; /* Sets the border color to white */
	background-color: transparent; /* Sets the background to transparent */
	color: #fff; /* Sets the text color to white */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

/* Styles for the header button on hover */
.site-header.home-page-two
	.header-navigation
	.right-side-box
	.header-btn:hover {
	color: #fff; /* Keeps the text color white on hover */
	background-color: #e94fca; /* Changes background color to a pink shade on hover */
	border-color: #e94fca; /* Changes border color to match the background on hover */
}

/* Styles for the first banner section */
.banner-style-one {
	position: relative; /* Sets the position to relative for absolute positioning of child elements */
	padding-top: 150px; /* Adds top padding */
	padding-bottom: 220px; /* Adds bottom padding */
	background: #fff url(/assets/images/app-landing/banner-bg-1-1.png) top right
		no-repeat; /* Sets a white background with an image positioned at the top right */
}

/* Circle elements for decorative purposes in the banner */
.banner-style-one:before,
.banner-style-one:after {
	content: ''; /* Generates an empty content for pseudo-elements */
	width: 318px; /* Sets the width of the circles */
	height: 318px; /* Sets the height of the circles */
	border-radius: 50%; /* Makes the elements circular */
	border: 43px solid; /* Sets a solid border with a width of 43px */
	position: absolute; /* Positions the circles absolutely within the banner */
	animation: BannercircleRotate 5s ease-in-out 0s infinite alternate; /* Applies a rotating animation to the circles */
}

/* Keyframes for rotating the banner circle with a fade effect */
@keyframes BannercircleRotate {
	0% {
		-webkit-transform: rotate(0); /* Initial rotation */
		transform: rotate(0); /* Initial rotation */
		opacity: 1; /* Fully visible */
	}
	100% {
		-webkit-transform: rotate(45deg); /* Rotate to 45 degrees */
		transform: rotate(45deg); /* Rotate to 45 degrees */
		opacity: 0.5; /* Semi-transparent */
	}
}

/* Styles for the first banner, using pseudo-elements for decorative borders */
.banner-style-one:before {
	border-color: #fff3fd; /* Light pink border color */
	bottom: 10%; /* Position from the bottom */
	right: 32%; /* Position from the right */
}

.banner-style-one:after {
	border-color: #f3faff; /* Light blue border color */
	top: 10%; /* Position from the top */
	left: 10%; /* Position from the left */
}

/* Positioning and animation for the banner mock element */
.banner-style-one .banner-mock {
	position: absolute; /* Absolute positioning within the parent */
	top: 15%; /* Position from the top */
	right: 10%; /* Position from the right */
	animation: bannerImgBounce 5s ease-in-out 0s infinite alternate; /* Bounce animation */
}

/* Keyframes for the bouncing animation of the banner image */
@keyframes bannerImgBounce {
	0% {
		-webkit-transform: translateY(0) translateX(0); /* Initial position */
		transform: translateY(0) translateX(0); /* Initial position */
	}
	100% {
		-webkit-transform: translateY(-20px) translateX(-20px); /* Final position after bounce */
		transform: translateY(-20px) translateX(-20px); /* Final position after bounce */
	}
}

/* Styles for elements with class names containing 'bubble-' within the .banner-style-one class */
.banner-style-one [class*='bubble-'] {
	width: 26px; /* Width of the bubble */
	height: 26px; /* Height of the bubble */
	border-radius: 50%; /* Makes the bubble circular */
	position: absolute; /* Positions the bubble absolutely within its parent */
	background-color: #ede8ff; /* Light purple background color */
	border: 1px solid #a98fff; /* Border with a darker purple color */
	animation-name: bubbleMover; /* Animation applied to the bubble */
	animation-duration: 9s; /* Duration of the bubble movement animation */
	animation-timing-function: linear; /* Linear timing function for smooth animation */
	animation-iteration-count: infinite; /* Animation repeats indefinitely */
	perspective: 100px; /* Perspective for 3D effects on child elements */
}

/* Keyframes for the bubble movement animation */
@keyframes bubbleMover {
	0% {
		transform: translateY(0px) translateX(0) rotate(0); /* Initial position and rotation */
	}
	30% {
		transform: translateY(30px) translateX(50px) rotate(15deg); /* Moves down and to the right with rotation */
		transform-origin: center center; /* Sets the origin for rotation */
	}
	50% {
		transform: translateY(50px) translateX(100px) rotate(45deg); /* Further movement with increased rotation */
		transform-origin: right bottom; /* Changes the origin for rotation */
	}
	80% {
		transform: translateY(30px) translateX(50px) rotate(15deg); /* Returns to a previous position with rotation */
		transform-origin: left top; /* Changes the origin for rotation */
	}
	100% {
		transform: translateY(0px) translateX(0) rotate(0); /* Returns to the initial position and rotation */
		transform-origin: center center; /* Resets the origin for rotation */
	}
}

.banner-style-one .bubble-1 {
	/* Bubble 1: Light yellow background with a darker yellow border */
	background-color: #fff7e0; /* Background color */
	border-color: #ffdd83; /* Border color */
	top: 10px; /* Position from the top */
	left: 20px; /* Position from the left */
}

.banner-style-one .bubble-2 {
	/* Bubble 2: Light pink background with a darker pink border */
	background-color: #fff1ec; /* Background color */
	border-color: #ffb59d; /* Border color */
	bottom: 30px; /* Position from the bottom */
	left: 10%; /* Position from the left as a percentage */
}

.banner-style-one .bubble-3 {
	/* Bubble 3: Light blue background with a lighter blue border */
	background-color: #ebf3ff; /* Background color */
	border-color: #b9d4ff; /* Border color */
	top: 40px; /* Position from the top */
	left: 40%; /* Position from the left as a percentage */
}

.banner-style-one .bubble-4 {
	/* Bubble 4: Light green background with a bright green border */
	background-color: #ddffe4; /* Background color */
	border-color: #93ff6d; /* Border color */
	top: 10px; /* Position from the top */
	right: 40%; /* Position from the right as a percentage */
}

.banner-style-one .bubble-5 {
	/* Bubble 5: Light purple background with a darker purple border */
	background-color: #ede8ff; /* Background color */
	border-color: #a98fff; /* Border color */
	bottom: 30px; /* Position from the bottom */
	right: 25%; /* Position from the right as a percentage */
}

.banner-style-one .bubble-6 {
	/* Sets the background color and border color for the bubble element */
	background-color: #ffe8fb; /* Light pink background */
	border-color: #ffa6ef; /* Light purple border */
	top: 40%; /* Positions the bubble 40% from the top */
	right: 10%; /* Positions the bubble 10% from the right */
}

.banner-style-one .content-block {
	/* Styles the content block within the banner */
	position: relative; /* Allows for absolute positioning of child elements */
	z-index: 10; /* Ensures the content block is above other elements */
}

.banner-style-one .content-block h3,
.banner-style-one .content-block p {
	/* Resets margin for heading and paragraph elements */
	margin: 0; /* Removes default margin */
}

.banner-style-one .content-block h3 {
	/* Styles for the main heading in the content block */
	color: #273167; /* Dark blue text color */
	font-size: 60px; /* Large font size for prominence */
	line-height: 70px; /* Increases line height for readability */
	font-weight: 500; /* Medium font weight */
	margin-bottom: 40px; /* Space below the heading */
}

.banner-style-one .content-block p {
	/* Styles for the paragraph in the content block */
	color: #777b92; /* Gray text color */
	font-size: 18px; /* Standard font size for paragraph */
	line-height: 34px; /* Increases line height for readability */
	margin-bottom: 55px; /* Space below the paragraph */
}

/* Styles for the button in the first banner style */
.banner-style-one .content-block .banner-btn {
	display: inline-block; /* Displays the button as an inline-block element */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width of 1 pixel */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners with a radius of 4 pixels */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Subtle shadow effect */
	vertical-align: middle; /* Aligns the button vertically in the middle */
	color: #777b92; /* Text color */
	font-weight: 500; /* Medium font weight */
	font-size: 14px; /* Font size of 14 pixels */
	line-height: 1em; /* Line height set to 1em */
	padding: 22.5px 0; /* Vertical padding of 22.5 pixels, no horizontal padding */
	padding-left: 73px; /* Left padding of 73 pixels */
	padding-right: 53px; /* Right padding of 53 pixels */
	position: relative; /* Relative positioning for potential absolute children */
	background-color: #fff; /* White background color */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

/* Styles for the span inside the button */
.banner-style-one .content-block .banner-btn span {
	font-size: 18px; /* Font size of 18 pixels for the span */
	display: block; /* Displays the span as a block element */
	line-height: 1em; /* Line height set to 1em */
	margin-top: 5px; /* Top margin of 5 pixels */
}

/* Styles for the first banner style with button and icon */
.banner-style-one .content-block .banner-btn i {
	font-size: 30px; /* Sets the font size of the icon */
	color: #777b92; /* Sets the icon color */
	position: absolute; /* Positions the icon absolutely within its parent */
	top: 50%; /* Vertically centers the icon */
	left: 40px; /* Positions the icon 40px from the left */
	transform: translateY(
		-50%
	); /* Adjusts the vertical position to center it */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

/* Adds left margin to the second button in the button group */
.banner-style-one .content-block .banner-btn + .banner-btn {
	margin-left: 16px; /* Adds 16px margin to the left of the next button */
}

/* Styles for the button on hover state */
.banner-style-one .content-block .banner-btn:hover {
	color: #fff; /* Changes text color to white on hover */
	background-color: #e94fca; /* Changes background color on hover */
	border-color: #e94fca; /* Changes border color on hover */
}

/* Changes icon color on hover state of the button */
.banner-style-one .content-block .banner-btn:hover i {
	color: #fff; /* Changes icon color to white on hover */
}

/* Specific styles for the banner on the home page two */
.banner-style-one.home-page-two {
	padding-bottom: 277px; /* Adds bottom padding to the banner */
	background: #fff url(https://images.virtualsoft.tech/m/msjT1620745644.png)
		top right no-repeat; /* Sets background image and position */
	background-size: cover; /* Ensures the background image covers the entire area */
	margin-bottom: 60px; /* Adds bottom margin to the banner */
}

/* Styles for the banner in home page two */
.banner-style-one.home-page-two:before {
	/* Sets the border color with slight transparency */
	border-color: rgba(255, 255, 255, 0.04);
}

.banner-style-one.home-page-two:after {
	/* Sets the border color with more transparency */
	border-color: rgba(255, 255, 255, 0.02);
}

.banner-style-one.home-page-two [class*='bubble-'] {
	/* Ensures bubbles have a transparent background and sets border width */
	background-color: transparent !important;
	border-width: 2px;
}

.banner-style-one.home-page-two .banner-mock {
	/* Positions the banner mock element to the right and slightly down */
	right: 0;
	top: 20%;
}

.banner-style-one.home-page-two .content-block h3 {
	/* Sets the text color for h3 headings to white */
	color: #fff;
}

.banner-style-one.home-page-two .content-block p {
	/* Sets the text color for paragraphs to a light purple */
	color: #d6c9e4;
}

.banner-style-one.home-page-two .content-block .banner-btn {
	/* Styles for the banner button with border and shadow effects */
	color: #fff;
	border-style: solid;
	border-width: 1px;
	border-color: white;
	border-radius: 3px;
	background-color: transparent;
	box-shadow: 0px 15px 30px 0px rgba(255, 255, 255, 0.1);
}

.banner-style-one.home-page-two .content-block .banner-btn i {
	/* Sets the icon color to white */
	color: #fff;
}

.banner-style-one.home-page-two .content-block .banner-btn:hover {
	/* Changes background and border color on hover */
	background-color: #e94fca;
	border-color: #e94fca;
}

.site-footer {
	/* Positions the footer relative to its normal position */
	position: relative;
}

.site-footer [class*='bubble-'] {
	/* Styles for bubble elements within the footer */
	width: 26px; /* Sets the width of the bubble */
	height: 26px; /* Sets the height of the bubble */
	border-radius: 50%; /* Makes the bubble circular */
	position: absolute; /* Positions the bubble absolutely within the footer */
	background-color: #ede8ff; /* Sets the background color of the bubble */
	border: 1px solid #a98fff; /* Adds a border to the bubble */
	animation-name: bubbleMover; /* Assigns the bubble movement animation */
	animation-duration: 9s; /* Sets the duration of the animation */
	animation-timing-function: linear; /* Sets a linear timing function for the animation */
	animation-iteration-count: infinite; /* Makes the animation repeat indefinitely */
	perspective: 100px; /* Sets the perspective for 3D transformations */
}

@keyframes bubbleMover {
	/* Defines the keyframes for the bubble movement animation */
	0% {
		transform: translateY(0px) translateX(0) rotate(0); /* Initial position */
	}
	30% {
		transform: translateY(30px) translateX(50px) rotate(15deg); /* Moves and rotates the bubble */
		transform-origin: center center; /* Sets the rotation origin */
	}
	50% {
		transform: translateY(50px) translateX(100px) rotate(45deg); /* Further movement and rotation */
		transform-origin: right bottom; /* Changes the rotation origin */
	}
	80% {
		transform: translateY(30px) translateX(50px) rotate(15deg); /* Returns to a previous position */
		transform-origin: left top; /* Changes the rotation origin again */
	}
	100% {
		transform: translateY(0px) translateX(0) rotate(0); /* Returns to the initial position */
		transform-origin: center center; /* Resets the rotation origin */
	}
}

.site-footer .bubble-1 {
	/* Sets the background color for the first bubble */
	background-color: #fff7e0;
	/* Sets the border color for the first bubble */
	border-color: #ffdd83;
	/* Positions the bubble 10px from the top */
	top: 10px;
	/* Positions the bubble 20px from the left */
	left: 20px;
}

.site-footer .bubble-2 {
	/* Sets the background color for the second bubble */
	background-color: #fff1ec;
	/* Sets the border color for the second bubble */
	border-color: #ffb59d;
	/* Positions the bubble 30px from the bottom */
	bottom: 30px;
	/* Positions the bubble 10% from the left */
	left: 10%;
}

.site-footer .bubble-3 {
	/* Sets the background color for the third bubble */
	background-color: #ebf3ff;
	/* Sets the border color for the third bubble */
	border-color: #b9d4ff;
	/* Positions the bubble 40px from the top */
	top: 40px;
	/* Positions the bubble 40% from the left */
	left: 40%;
}

.site-footer .bubble-4 {
	/* Sets the background color for the fourth bubble */
	background-color: #ddffe4;
	/* Sets the border color for the fourth bubble */
	border-color: #93ff6d;
	/* Positions the bubble 10px from the top */
	top: 10px;
	/* Positions the bubble 40% from the right */
	right: 40%;
}

.site-footer .bubble-5 {
	/* Sets the background color for the fifth bubble */
	background-color: #ede8ff;
	/* Sets the border color for the fifth bubble */
	border-color: #a98fff;
	/* Positions the bubble 30px from the bottom */
	bottom: 30px;
	/* Positions the bubble 25% from the right */
	right: 25%;
}

.site-footer .bubble-6 {
	/* Background color for the bubble element in the footer */
	background-color: #ffe8fb;
	/* Border color for the bubble element */
	border-color: #ffa6ef;
	/* Positioning from the top of the footer */
	top: 40%;
	/* Positioning from the right side of the footer */
	right: 10%;
}

.site-footer {
	/* Border styling for the footer */
	border: 1px solid #eaeaea;
	/* Remove left border */
	border-left: 0;
	/* Remove right border */
	border-right: 0;
	/* Padding for the footer */
	padding: 86px 0;
}

.footer-widget ul,
.footer-widget h3,
.footer-widget p {
	/* Reset margin and padding for list, headings, and paragraphs in footer widgets */
	margin: 0;
	padding: 0;
	/* Remove default list styling */
	list-style: none;
}

.footer-widget .widget-title {
	/* Margin below the widget title */
	margin-bottom: 28px;
}

.footer-widget .widget-title h3 {
	/* Text color for the widget title */
	color: #273167;
	/* Font size for the widget title */
	font-size: 20px;
	/* Font weight for the widget title */
	font-weight: 500;
}

.footer-widget ul.contact-list li {
	/* Sets the text color for list items in the contact list */
	color: #777b92;
}

.footer-widget ul.contact-list li + li {
	/* Adds a top margin to each contact list item except the first one */
	margin-top: 9px;
}

.footer-widget ul.links-list li + li {
	/* Adds a top margin to each link list item except the first one */
	margin-top: 10px;
}

.footer-widget ul.links-list li a {
	/* Styles for anchor tags within the links list */
	color: #777b92; /* Sets the text color */
	font-size: 16px; /* Sets the font size */
	display: inline-block; /* Allows setting width and height */
	position: relative; /* Positions the element relative to its normal position */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

.footer-widget ul.links-list li a:before {
	/* Adds a pseudo-element before the anchor tag for decorative purposes */
	content: '\f101'; /* FontAwesome icon */
	font-family: 'FontAwesome'; /* Specifies the font family for the icon */
	color: #e94fca; /* Sets the icon color */
	font-size: 14px; /* Sets the icon font size */
	position: absolute; /* Positions the icon absolutely within the anchor */
	top: 50%; /* Vertically centers the icon */
	left: 0; /* Aligns the icon to the left */
	transform: translateY(-50%) translateX(-15px); /* Adjusts position to center vertically and offset horizontally */
	opacity: 0; /* Initially hides the icon */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

.footer-widget ul.links-list li a:hover {
	/* Changes link color and applies horizontal translation on hover */
	color: #e94fca;
	transform: translateX(20px);
}

.footer-widget ul.links-list li a:hover:before {
	/* Sets opacity to 1 for the pseudo-element before the link on hover */
	opacity: 1;
}

.footer-widget .social-block a {
	/* Styles for social media links in the footer */
	display: inline-block; /* Allows the element to be inline with other elements */
	vertical-align: middle; /* Aligns the element vertically in the middle */
	width: 51px; /* Sets a fixed width for the social icon */
	height: 51px; /* Sets a fixed height for the social icon */
	border: 1px solid #eaeaea; /* Light gray border around the icon */
	line-height: 49px; /* Centers the text vertically within the icon */
	text-align: center; /* Centers the text horizontally within the icon */
	background-color: #fff; /* White background for the icon */
	color: #777b92; /* Text color for the icon */
	border-radius: 50%; /* Makes the icon circular */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Adds a subtle shadow effect */
	transition: all 0.4s ease; /* Smooth transition for all properties on hover */
}

.footer-widget .social-block a:hover {
	/* Changes styles for social media links on hover */
	color: #fff; /* Changes text color to white */
	background-color: #e94fca; /* Changes background color to pink */
	border-color: #e94fca; /* Changes border color to pink */
}

/* Styles for the bottom footer section */
.bottom-footer {
	padding: 25px 0; /* Vertical padding for spacing */
}

/* Paragraph styles within the bottom footer */
.bottom-footer p {
	color: #777b92; /* Text color for readability */
	font-size: 16px; /* Font size for paragraph text */
}

/* Link styles within paragraphs in the bottom footer */
.bottom-footer p a {
	color: #e94fca; /* Color for links to stand out */
}

/* Styles for the subscription section */
.subscribe-style-one {
	padding-top: 110px; /* Top padding for spacing */
	padding-bottom: 120px; /* Bottom padding for spacing */
}

/* Heading styles within the subscription section */
.subscribe-style-one h3 {
	margin: 0; /* Remove default margin */
	color: #273167; /* Color for the heading text */
	font-size: 40px; /* Font size for the heading */
	font-weight: 400; /* Normal font weight */
	margin-bottom: 60px; /* Bottom margin for spacing */
}

/* Styles for the subscription form container */
.subscribe-style-one .subscribe-form {
	display: flex; /* Use flexbox for layout */
	width: 100%; /* Full width of the container */
	margin-left: auto; /* Center alignment */
	margin-right: auto; /* Center alignment */
	max-width: 700px; /* Maximum width for the form */
}

/* Styles for the input field within the subscribe form of style one */
.subscribe-style-one .subscribe-form input {
	border: none; /* Removes default border */
	outline: none; /* Removes outline on focus */
	display: block; /* Makes the input a block element */
	width: 100%; /* Full width of the parent container */
	max-width: 470px; /* Maximum width constraint */
	border-radius: 4px; /* Rounded corners */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border thickness */
	border-color: #eaeaea; /* Light gray border color */
	height: 84px; /* Fixed height for the input */
	font-size: 16px; /* Font size for the input text */
	padding-left: 30px; /* Left padding for text inside the input */
}

/* Placeholder color for WebKit browsers */
.subscribe-style-one .subscribe-form input::-webkit-input-placeholder {
	color: #777b92; /* Gray color for placeholder text */
}

/* Placeholder color for Mozilla Firefox */
.subscribe-style-one .subscribe-form input::-moz-placeholder {
	color: #777b92; /* Gray color for placeholder text */
}

/* Placeholder color for Internet Explorer 10+ */
.subscribe-style-one .subscribe-form input:-ms-input-placeholder {
	color: #777b92; /* Gray color for placeholder text */
}

/* Placeholder color for older versions of Mozilla Firefox */
.subscribe-style-one .subscribe-form input:-moz-placeholder {
	color: #777b92; /* Gray color for placeholder text */
}

/* Styles for the subscription form in the first style variant */
.subscribe-style-one .subscribe-form input.error {
	/* Error state for input fields */
	border: 1px solid red; /* Red border indicates an error */
	background-color: rgba(
		255,
		0,
		0,
		0.5
	); /* Light red background for visibility */
}

/* Styles for the submit button in the subscription form */
.subscribe-style-one .subscribe-form button[type='submit'] {
	width: 208px; /* Fixed width for the button */
	border-radius: 4px; /* Rounded corners */
	margin-left: 20px; /* Space to the left of the button */
	height: 84px; /* Fixed height for the button */
	border: none; /* No border */
	outline: none; /* No outline on focus */
	background-color: #e94fca; /* Background color for the button */
	cursor: pointer; /* Pointer cursor on hover */
	font-weight: 500; /* Medium font weight */
	font-size: 20px; /* Font size for button text */
	color: #ffffff; /* White text color */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Hover state for the submit button */
.subscribe-style-one .subscribe-form button[type='submit']:hover {
	background-color: #273167; /* Darker background color on hover */
}

/* Error label styling */
.subscribe-style-one .subscribe-form label.error {
	display: none !important; /* Hide error labels */
}

/* Styles for the result message after form submission */
.subscribe-style-one .result {
	text-align: center; /* Centered text alignment */
	font-size: 16px; /* Font size for result message */
	background-color: rgba(
		0,
		128,
		0,
		0.5
	); /* Semi-transparent green background */
	width: 80%; /* Width of the result message */
	color: #fff; /* White text color */
	margin-left: auto; /* Centering the result message */
	margin-right: auto; /* Centering the result message */
}

.blog-style-one {
	/* Main blog container style */
	background-color: #f7fbff; /* Light background color */
	padding-top: 120px; /* Top padding for spacing */
	padding-bottom: 50px; /* Bottom padding for spacing */
}

.blog-style-one.blog-page {
	/* Specific style for blog pages */
	background-color: #fff; /* White background for blog pages */
	padding-bottom: 120px; /* Increased bottom padding for blog pages */
}

.single-blog-style-one {
	/* Style for individual blog posts */
	margin-bottom: 60px; /* Margin below each blog post for spacing */
}

.single-blog-style-one .image-block {
	/* Style for the image block within a single blog post */
	border-radius: 4px; /* Rounded corners for the image block */
	background-color: #273167; /* Dark background color for the image block */
	box-shadow: 0px 15px 30px 0px rgba(39, 49, 103, 0.1); /* Subtle shadow effect */
}

.single-blog-style-one .image-block .inner-block {
	/* Inner container for the image block */
	overflow: hidden; /* Hide overflow content */
	position: relative; /* Positioning context for child elements */
	border-radius: 4px; /* Rounded corners for the inner block */
}

.single-blog-style-one .image-block .inner-block > img {
	/* Style for the image within the inner block */
	width: 100%; /* Image takes full width of the container */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Styles for the date block in the single blog style one layout */
.single-blog-style-one .image-block .inner-block .date-block {
	display: inline-block; /* Displays the date block inline */
	position: absolute; /* Positions the date block absolutely within its parent */
	top: 0; /* Aligns the date block to the top of the parent */
	left: 0; /* Aligns the date block to the left of the parent */
	background-color: #e94fca; /* Sets the background color of the date block */
	border-radius: 4px 0; /* Rounds the top-left corner of the date block */
	font-size: 14px; /* Sets the font size for the date text */
	font-weight: 500; /* Sets the font weight for the date text */
	color: #fff; /* Sets the text color to white */
	padding: 3px 20px; /* Adds padding around the date text */
	z-index: 12; /* Sets the stacking order of the date block */
}

/* Styles for the inner block before pseudo-element in the single blog style one layout */
.single-blog-style-one .image-block .inner-block:before {
	content: ''; /* Generates an empty content for the pseudo-element */
	position: absolute; /* Positions the pseudo-element absolutely within its parent */
	top: 0; /* Aligns the pseudo-element to the top of the parent */
	left: 0; /* Aligns the pseudo-element to the left of the parent */
	width: 100%; /* Sets the width of the pseudo-element to 100% of the parent */
	height: 100%; /* Sets the height of the pseudo-element to 100% of the parent */
	background-color: #273167; /* Sets the background color of the pseudo-element */
	opacity: 0; /* Sets the initial opacity to 0 (invisible) */
	z-index: 11; /* Sets the stacking order of the pseudo-element */
	transition: all 0.4s ease; /* Applies a transition effect for all properties over 0.4 seconds */
}

.single-blog-style-one .image-block:hover {
	/* Changes cursor to pointer on hover for image block */
	cursor: pointer;
}

.single-blog-style-one .image-block:hover .inner-block > img {
	/* Scales the image slightly on hover for a zoom effect */
	transform: scale(1.05);
}

.single-blog-style-one .image-block:hover .inner-block:before {
	/* Sets opacity to 0.5 for the before pseudo-element on hover */
	opacity: 0.5;
}

.single-blog-style-one .text-block .meta-info {
	/* Adds top margin to the meta information block */
	margin-top: 20px;
}

.single-blog-style-one .text-block .meta-info a,
.single-blog-style-one .text-block .meta-info span {
	/* Styles for links and spans in the meta information */
	text-transform: uppercase; /* Transforms text to uppercase */
	font-size: 14px; /* Sets font size */
	color: #e94fca; /* Sets text color */
	font-weight: 500; /* Sets font weight */
	letter-spacing: 0.1em; /* Adds spacing between letters */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.single-blog-style-one .text-block .meta-info span.sep {
	/* Adds left and right margin to the separator span */
	margin-left: 16px; /* Left margin */
	margin-right: 16px; /* Right margin */
}

.single-blog-style-one .text-block .meta-info a:hover {
	/* Change link color on hover for meta information */
	color: #273167;
}

.single-blog-style-one .text-block h3,
.single-blog-style-one .text-block p {
	/* Remove default margin for h3 and p elements */
	margin: 0;
}

.single-blog-style-one .text-block h3 {
	/* Style for the blog title */
	font-size: 26px; /* Set font size */
	line-height: 40px; /* Set line height for spacing */
	font-weight: 400; /* Set font weight */
	margin-bottom: 26px; /* Space below the title */
}

.single-blog-style-one .text-block h3 a {
	/* Style for the blog title link */
	color: #273167; /* Set link color */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

.single-blog-style-one .text-block h3 a:hover {
	/* Change link color on hover for the blog title */
	color: #e94fca;
}

.single-blog-style-one .text-block .line-block {
	/* Style for the decorative line block */
	vertical-align: middle; /* Align vertically in the middle */
	background-color: #e94fca; /* Set background color */
	width: 41px; /* Set width of the line */
	height: 2px; /* Set height of the line */
	display: block; /* Display as a block element */
	margin-top: 20px; /* Space above the line */
	margin-bottom: 20px; /* Space below the line */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Styles for the single blog post in style one */
.single-blog-style-one .text-block a.more-link {
	display: inline-block; /* Displays the link as an inline block */
	vertical-align: middle; /* Aligns the link vertically in the middle */
	text-transform: uppercase; /* Transforms text to uppercase */
	color: #273167; /* Sets the text color */
	font-size: 14px; /* Sets the font size */
	font-weight: 500; /* Sets the font weight */
	letter-spacing: 0.1em; /* Adds spacing between letters */
	line-height: 1em; /* Sets the line height */
	transition: all 0.4s ease; /* Adds a transition effect for all properties */
}

/* Hover effect for the more link */
.single-blog-style-one .text-block a.more-link:hover {
	color: #e94fca; /* Changes text color on hover */
}

/* Expands the width of the line block on hover of the text block */
.single-blog-style-one .text-block:hover .line-block {
	width: 60px; /* Sets the width of the line block */
}

/* Styles for blog post pagination */
.blog-post-pagination {
	margin-top: 0px; /* Sets the top margin to zero */
}

/* Styles for pagination links */
.blog-post-pagination a {
	display: inline-block; /* Displays the link as an inline block */
	vertical-align: middle; /* Aligns the link vertically in the middle */
	width: 52px; /* Sets the width of the pagination link */
	height: 52px; /* Sets the height of the pagination link */
	border-radius: 50%; /* Makes the link circular */
	background: #ebf3ff; /* Sets the background color */
	line-height: 52px; /* Centers text vertically within the link */
	text-align: center; /* Centers text horizontally within the link */
	font-size: 18px; /* Sets the font size */
	color: #273167; /* Sets the text color */
	transition: all 0.4s ease; /* Adds a transition effect for all properties */
}

/* Styles for pagination links in blog posts */
.blog-post-pagination a.prev,
.blog-post-pagination a.next {
	background: #273167; /* Background color for previous and next links */
	color: #fff; /* Text color for links */
	font-size: 14px; /* Font size for links */
}

/* Styles for the active pagination link */
.blog-post-pagination a.active {
	cursor: auto; /* Prevents cursor change on active link */
}

/* Styles for active and hover states of pagination links */
.blog-post-pagination a.active,
.blog-post-pagination a:hover {
	background: #e94fca; /* Background color for active and hovered links */
	color: #fff; /* Text color for active and hovered links */
}

/* Margin between consecutive pagination links */
.blog-post-pagination a + a {
	margin-left: 10px; /* Adds space between links */
}

/* Styles for the blog details page */
.blog-details-page {
	padding: 120px 0; /* Vertical padding for the blog details page */
}

/* Styles for the first blog style on the details page */
.blog-details-page .single-blog-style-one {
	margin-bottom: 0; /* Removes bottom margin for the first blog style */
}

/* Styles for the text block within the first blog style */
.blog-details-page .single-blog-style-one .text-block {
	margin-top: 20px; /* Adds top margin to the text block */
}

.blog-details-page .single-blog-style-one .text-block .meta-info {
	/* Removes default margin for meta information block */
	margin: 0;
}

.blog-details-page .single-blog-style-one .text-block .post-title {
	/* Styles the post title with specific color, size, and weight */
	margin: 0; /* Removes default margin */
	color: #273167; /* Sets title color */
	font-size: 26px; /* Sets font size */
	font-weight: 400; /* Sets font weight */
	margin-bottom: 25px; /* Adds space below the title */
}

.blog-details-page .single-blog-style-one .text-block p {
	/* Removes default margin for paragraph elements */
	margin: 0;
}

.blog-details-page .single-blog-style-one .text-block p + p {
	/* Adds top margin to the second paragraph to create space from the first */
	margin-top: 45px;
}

.blog-details-page .share-block {
	/* Styles the share block with flexbox for alignment and spacing */
	display: flex; /* Enables flexbox layout */
	align-items: center; /* Vertically centers items */
	justify-content: space-between; /* Distributes space between items */
	border-top: 1px solid #eaeaea; /* Adds a top border */
	padding-top: 40px; /* Adds padding at the top */
	margin-top: 50px; /* Adds margin at the top */
}

.blog-details-page .share-block .left-block p {
	/* Styles paragraph within the left block of the share section */
	margin: 0; /* Removes default margin */
	color: #273167; /* Sets text color */
	font-size: 20px; /* Sets font size */
}

/* Styles for the share block links in the blog details page */
.blog-details-page .share-block .left-block p a {
	color: #777b92; /* Default text color */
	font-size: 16px; /* Font size for the links */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
	margin-left: 10px; /* Left margin for spacing */
}

/* Hover state for the share block links */
.blog-details-page .share-block .left-block p a:hover {
	color: #e94fca; /* Text color on hover */
}

/* Styles for social media icons in the share block */
.blog-details-page .share-block .social-block a {
	display: inline-block; /* Inline block for proper alignment */
	vertical-align: middle; /* Aligns the icons vertically */
	width: 51px; /* Fixed width for the icons */
	height: 51px; /* Fixed height for the icons */
	border: 1px solid #eaeaea; /* Light border around the icons */
	line-height: 49px; /* Centers text vertically within the icon */
	text-align: center; /* Centers text horizontally */
	background-color: #fff; /* Background color for the icons */
	color: #777b92; /* Default text color for the icons */
	border-radius: 50%; /* Makes the icons circular */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Subtle shadow for depth */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Hover state for social media icons */
.blog-details-page .share-block .social-block a:hover {
	color: #fff; /* Text color on hover */
	background-color: #e94fca; /* Background color on hover */
	border-color: #e94fca; /* Border color on hover */
}

/* Styles for the author block section on the blog details page */
.blog-details-page .author-block {
	display: flex; /* Use flexbox for layout */
	justify-content: space-between; /* Space items evenly */
	border: 1px solid #eaeaea; /* Light gray border */
	border-radius: 4px; /* Rounded corners */
	padding: 60px; /* Padding inside the block */
	margin-top: 40px; /* Space above the block */
	margin-bottom: 60px; /* Space below the block */
}

/* Padding for the text block within the author block */
.blog-details-page .author-block .text-block {
	padding-left: 40px; /* Left padding for text */
}

/* Styles for the author image within the author block */
.blog-details-page .author-block img {
	width: 169px; /* Fixed width for the image */
	border-radius: 4px; /* Rounded corners for the image */
}

/* Reset margin for heading and paragraph elements within the author block */
.blog-details-page .author-block h3,
.blog-details-page .author-block p {
	margin: 0; /* Remove default margin */
}

/* Styles for the heading in the author block */
.blog-details-page .author-block h3 {
	color: #273167; /* Dark blue color for the heading */
	font-size: 20px; /* Font size for the heading */
	font-weight: 400; /* Normal font weight */
	margin-bottom: 38px; /* Space below the heading */
}

.blog-details-page .author-block p {
	/* Sets the font size and line height for the author block paragraph */
	font-size: 16px;
	line-height: 30px;
}

.blog-details-page .title-line {
	/* Adds bottom margin to the title line for spacing */
	margin-bottom: 50px;
}

.blog-details-page .title-line h3 {
	/* Styles the main title within the title line */
	margin: 0; /* Removes default margin */
	color: #273167; /* Sets the text color */
	font-size: 30px; /* Sets the font size */
	font-weight: 400; /* Sets the font weight */
}

.blog-details-page .single-comment-one {
	/* Styles for individual comments in the comment section */
	border-bottom: 1px solid #eaeaea; /* Adds a bottom border */
	padding-bottom: 60px; /* Adds padding at the bottom */
	margin-bottom: 60px; /* Adds margin at the bottom */
	display: flex; /* Uses flexbox for layout */
}

.blog-details-page .single-comment-one .image-block .inner-block {
	/* Styles for the inner block of the comment image */
	width: 90px; /* Sets a fixed width */
	overflow: hidden; /* Hides overflow content */
	border-radius: 50%; /* Makes the image block circular */
}

.blog-details-page .single-comment-one .image-block .inner-block > img {
	/* Styles for the image within the inner block */
	width: 100%; /* Ensures the image fills the inner block */
}

.blog-details-page .single-comment-one .text-block {
	/* Sets left padding for the text block within a single comment */
	padding-left: 40px;
}

.blog-details-page .single-comment-one .text-block h3,
.blog-details-page .single-comment-one .text-block p {
	/* Resets margin for heading and paragraph elements within the text block */
	margin: 0;
}

.blog-details-page .single-comment-one .text-block h3 {
	/* Styles for the heading in the text block */
	color: #273167; /* Dark blue color for the heading */
	font-size: 20px; /* Font size for the heading */
	font-weight: 400; /* Normal font weight */
	margin-bottom: 5px; /* Space below the heading */
}

.blog-details-page .single-comment-one .text-block p {
	/* Styles for the paragraph in the text block */
	color: #777b92; /* Gray color for the paragraph text */
	font-size: 16px; /* Font size for the paragraph */
	line-height: 30px; /* Line height for better readability */
	width: 82%; /* Width of the paragraph */
}

.blog-details-page .single-comment-one .text-block {
	/* Flexbox layout for the text block to align items */
	display: -webkit-flex; /* For older WebKit browsers */
	display: -moz-flex; /* For older Firefox browsers */
	display: -ms-flex; /* For older Internet Explorer browsers */
	display: -o-flex; /* For older Opera browsers */
	display: flex; /* Standard flex display */
	justify-content: space-between; /* Space between flex items */
	align-items: center; /* Center items vertically */
	margin-bottom: 30px; /* Space below the text block */
}

/* Styles for the blog details page comments section */
.blog-details-page .single-comment-one .text-block .date-line {
	/* Transform text to uppercase for emphasis */
	text-transform: uppercase;
	/* Set font size for the date line */
	font-size: 14px;
	/* Set color for the date line text */
	color: #e94fca;
	/* Set font weight for the date line text */
	font-weight: 500;
	/* Add letter spacing for better readability */
	letter-spacing: 0.1em;
	/* Smooth transition for all properties */
	transition: all 0.4s ease;
}

/* Separator styling for the date line */
.blog-details-page .single-comment-one .text-block .date-line span.sep {
	/* Margin for spacing on the left and right of the separator */
	margin-left: 16px;
	margin-right: 16px;
}

/* Styles for the reply button in the comments section */
.blog-details-page .single-comment-one .text-block .reply-btn {
	/* Solid border style for the button */
	border-style: solid;
	/* Border width of 1px */
	border-width: 1px;
	/* Light gray border color */
	border-color: #eaeaea;
	/* Rounded corners for the button */
	border-radius: 4px;
	/* White background color for the button */
	background-color: white;
	/* Shadow effect for depth */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1);
	/* Set width of the button */
	width: 97px;
	/* Set height of the button */
	height: 42px;
	/* Center text vertically within the button */
	line-height: 40px;
	/* Text color for the button */
	color: #777b92;
	/* Font size for the button text */
	font-size: 16px;
	/* Font weight for the button text */
	font-weight: 500;
	/* Display as inline-block for layout */
	display: inline-block;
	/* Align button vertically in line with other elements */
	vertical-align: middle;
	/* Center text within the button */
	text-align: center;
	/* Smooth transition for all properties */
	transition: all 0.4s ease;
}

/* Styles for the hover effect on the reply button in a single comment */
.blog-details-page .single-comment-one .text-block .reply-btn:hover {
	color: #fff; /* Text color changes to white on hover */
	background-color: #e94fca; /* Background color changes to a pink shade on hover */
	border-color: #e94fca; /* Border color matches the background on hover */
}

/* Styles for the input fields and textarea in the comment form */
.blog-details-page .comment-form input,
.blog-details-page .comment-form textarea {
	border: none; /* No border by default */
	outline: none; /* No outline on focus */
	border: none; /* Redundant, can be removed */
	width: 100%; /* Full width of the parent container */
	height: 84px; /* Default height for input fields */
	display: block; /* Display as block element */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width set to 1px */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners */
	background-color: white; /* White background color */
	margin-bottom: 30px; /* Space below each input field */
	padding-left: 40px; /* Left padding for text inside the input */
}

/* Specific styles for the textarea in the comment form */
.blog-details-page .comment-form textarea {
	height: 234px; /* Increased height for the textarea */
	padding-top: 20px; /* Top padding for text inside the textarea */
}

/* Styles for the comment submission button on the blog details page */
.blog-details-page .comment-form button[type='submit'] {
	width: 276px; /* Set the width of the button */
	border-radius: 4px; /* Rounded corners for the button */
	height: 84px; /* Set the height of the button */
	border: none; /* Remove default border */
	outline: none; /* Remove outline on focus */
	background-color: #e94fca; /* Background color of the button */
	cursor: pointer; /* Change cursor to pointer on hover */
	font-weight: 500; /* Set font weight */
	line-height: 84px; /* Center text vertically */
	font-size: 20px; /* Font size for the button text */
	color: #ffffff; /* Text color */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Styles for the button on hover */
.blog-details-page .comment-form button[type='submit']:hover {
	background-color: #273167; /* Change background color on hover */
}

/* Styles for the FAQ section container */
.faq-style-one .container {
	padding-bottom: 120px; /* Bottom padding for spacing */
}

/* Media query for larger screens */
@media (min-width: 1200px) {
	.faq-style-one .container {
		max-width: 920px; /* Maximum width for the container on large screens */
	}
}

/* Styles for the FAQ section with a specific design */
.faq-style-one .block-title {
	/* Adds top padding to the block title */
	padding-top: 120px;
}

/* Styles for the accordion group within the FAQ section */
.faq-style-one .accrodion-grp .accrodion {
	/* Sets border and padding for each accordion item */
	border: 1px solid #eaeaea;
	padding: 30.5px 40px;
}

/* Adds margin to the accordion items that follow another accordion */
.faq-style-one .accrodion-grp .accrodion + .accrodion {
	/* Creates space between consecutive accordion items */
	margin-top: 20px;
}

/* Cursor style for the accordion title to indicate it's clickable */
.faq-style-one .accrodion-grp .accrodion .accrodion-title {
	cursor: pointer;
}

/* Styles for the heading within the accordion title */
.faq-style-one .accrodion-grp .accrodion .accrodion-title h4 {
	/* Resets margin and sets font properties for the heading */
	margin: 0;
	font-size: 20px;
	font-weight: 400;
	padding: 0px 0;
	padding-top: 0;
	padding-left: 0px;
	position: relative;
	color: #273167;
	/* Smooth transition for any changes */
	transition: all 0.4s ease;
}

/* Styles for the icon before the accordion title */
.faq-style-one .accrodion-grp .accrodion .accrodion-title h4:before {
	/* Uses FontAwesome for the icon, sets size and position */
	font-family: 'FontAwesome';
	content: '\f067'; /* FontAwesome icon for collapsed state */
	display: inline-block;
	width: 22px;
	height: 22px;
	line-height: 22px;
	border-radius: 50%; /* Circular background for the icon */
	text-align: center;
	font-size: 14px;
	color: #273167;
	position: absolute;
	top: 50%; /* Centers the icon vertically */
	right: 0px; /* Aligns the icon to the right */
	transform: translateY(-50%); /* Adjusts for perfect vertical centering */
	/* Smooth transition for any changes */
	transition: all 0.4s ease;
}

/* Styles for FAQ section with accordion functionality */
.faq-style-one .accrodion-grp .accrodion .accrodion-content .inner {
	margin-top: 30px; /* Space above the inner content */
}

/* Paragraph styles within the accordion content */
.faq-style-one .accrodion-grp .accrodion .accrodion-content .inner p {
	margin: 0; /* Remove default margin */
	font-size: 16px; /* Set font size */
	line-height: 30px; /* Set line height for readability */
	color: #777b92; /* Text color */
}

/* Active accordion title styles */
.faq-style-one .accrodion-grp .accrodion.active .accrodion-title h4 {
	color: #e94fca; /* Change color when active */
}

/* Icon before active accordion title */
.faq-style-one .accrodion-grp .accrodion.active .accrodion-title h4:before {
	content: '\f068'; /* Font Awesome icon for expanded state */
	color: #e94fca; /* Icon color when active */
}

/* Styles for the brand carousel section */
.brand-carousel-one {
	padding: 119.5px 0; /* Vertical padding */
	padding-left: 48px; /* Left padding */
	padding-right: 48px; /* Right padding */
}

/* Styles for items within the brand carousel */
.brand-carousel-one .item img {
	width: auto; /* Allow image to maintain its natural width */
	max-width: none; /* Prevent max width restriction */
	margin-left: auto; /* Center image horizontally */
	margin-right: auto; /* Center image horizontally */
	opacity: 0.4; /* Set initial opacity */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

.brand-carousel-one .item img:hover {
	/* Increases the opacity of the image on hover */
	opacity: 1;
}

.brand-carousel-one .owl-dots,
.brand-carousel-one .owl-nav {
	/* Hides the navigation dots and arrows for the carousel */
	display: none;
}

.testimonials-style-one {
	/* Sets the background color and padding for the testimonials section */
	background-color: #f2fff8;
	padding: 120px 0;
	position: relative; /* Allows absolute positioning of child elements */
}

.testimonials-style-one .map-img {
	/* Styles for the map image within the testimonials section */
	position: absolute; /* Positions the image absolutely within the parent */
	top: 50%; /* Centers the image vertically */
	left: 10%; /* Positions the image 10% from the left */
	transform: translateY(
		-50%
	); /* Adjusts the image to be perfectly centered */
	animation-name: mapMover; /* Applies the mapMover animation */
	animation-duration: 5s; /* Duration of the animation */
	animation-timing-function: linear; /* Animation timing function */
	animation-iteration-count: infinite; /* Repeats the animation indefinitely */
	transition: all 0.4s ease; /* Smooth transition for all properties */
	transform-origin: center center; /* Sets the origin for transformations */
}

@keyframes mapMover {
	/* Defines the keyframes for the mapMover animation */
	0% {
		opacity: 0.05; /* Initial opacity */
		transform: translateY(-50%) translateX(0); /* Initial position */
	}
	50% {
		opacity: 0.2; /* Midpoint opacity */
		transform: translateY(-55%) translateX(-20px); /* Moves the image slightly left */
	}
	100% {
		opacity: 0.05; /* Final opacity */
		transform: translateY(-50%) translateX(0); /* Returns to initial position */
	}
}

.testimonials-style-one .block-title {
	/* Margin below the block title for spacing */
	margin-bottom: 45px;
}

.testimonials-style-one .single-testi-one p {
	/* Paragraph styling for testimonial text */
	margin: 0; /* No margin for a clean look */
	color: #777b92; /* Text color */
	font-size: 24px; /* Font size for readability */
	line-height: 46px; /* Line height for spacing between lines */
}

.testimonials-style-one .single-testi-one h3 {
	/* Heading styling for testimonial author */
	color: #273167; /* Author name color */
	font-weight: 500; /* Medium font weight for emphasis */
	font-size: 20px; /* Font size for author name */
	margin: 0; /* No margin for a clean look */
	margin-top: 40px; /* Top margin for spacing from previous elements */
}

.testimonials-style-one .testi-carousel-one .owl-nav {
	/* Navigation styling for the testimonial carousel */
	margin: 0; /* No margin for alignment */
	position: absolute; /* Positioning for placement */
	bottom: -10px; /* Positioning from the bottom */
	right: 0; /* Align to the right */
	background-color: #f2fff8; /* Background color for navigation */
}

.testimonials-style-one .testi-carousel-one .owl-nav [class*='owl-'] {
	/* Styling for individual navigation buttons */
	margin: 0px 5px; /* Horizontal spacing between buttons */
	padding: 0; /* No padding for a clean look */
	background-color: transparent; /* Transparent background */
	opacity: 0.3; /* Initial opacity for a subtle effect */
	color: #273167; /* Color for navigation icons */
	font-size: 32px; /* Font size for navigation icons */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

.testimonials-style-one .testi-carousel-one .owl-nav [class*='owl-']:hover {
	/* Increases opacity of navigation elements on hover for better visibility */
	opacity: 1;
}

.testimonials-style-one .bx-wrapper {
	/* Removes border and shadow for a clean look */
	border: none;
	box-shadow: none;
	/* Sets background to transparent */
	background-color: transparent;
	/* Removes bottom margin */
	margin-bottom: 0;
}

.testimonials-style-one .bx-wrapper ul.slider {
	/* Resets padding and margin for the slider list */
	padding: 0;
	margin: 0;
}

.testimonials-style-one .bx-wrapper .bx-controls-direction {
	/* Positions directional controls absolutely at the bottom right */
	position: absolute;
	bottom: -10px;
	background-color: #f2fff8; /* Light background for controls */
	right: 0;
}

.testimonials-style-one .bx-wrapper .bx-controls-direction a {
	/* Resets text indentation and background image for control links */
	text-indent: 0;
	background-image: none;
	/* Sets font size for control links */
	font-size: 32px;
	position: relative;
	top: 0px;
	/* Sets initial opacity for control links */
	opacity: 0.3;
	color: #273167; /* Dark color for text */
	/* Smooth transition for hover effects */
	transition: all 0.4s ease;
}

/* Styles for the testimonials section with a specific design */
.testimonials-style-one .bx-wrapper .bx-controls-direction a:hover {
	/* Set opacity to fully visible on hover */
	opacity: 1;
}

/* Styles for the previous button in the testimonials slider */
.testimonials-style-one .bx-wrapper .bx-prev {
	/* Position the previous button to the left */
	left: 0px;
	/* Add margin to the right for spacing */
	margin-right: 25px;
}

/* Styles for the next button in the testimonials slider */
.testimonials-style-one .bx-wrapper .bx-next {
	/* Position the next button to the right */
	right: 0px;
}

/* Styles for the testimonials slider pager */
#testimonials-slider-pager {
	/* Set fixed width and height for the pager */
	width: 391px;
	height: 391px;
	/* Define border properties */
	border-style: solid;
	border-width: 1px;
	border-color: rgba(39, 49, 103, 0.15);
	/* Make the pager circular */
	border-radius: 50%;
	/* Set position for animation */
	position: relative;
	/* Define animation properties */
	animation-name: tesiMove;
	animation-duration: 5s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	/* Smooth transition for all properties */
	transition: all 0.4s ease;
	/* Set the origin for transformations */
	transform-origin: center center;
}

/* Keyframes for the tesiMove animation, which rotates an element */
@keyframes tesiMove {
	0% {
		transform: rotate(0deg); /* Initial state with no rotation */
	}
	15% {
		transform: rotate(2deg); /* Slight rotation at 15% of the animation */
	}
	33% {
		transform: rotate(
			4deg
		); /* Increased rotation at 33% of the animation */
	}
	66% {
		transform: rotate(
			2deg
		); /* Decrease rotation back to 2 degrees at 66% */
	}
	100% {
		transform: rotate(0deg); /* Return to the initial state at the end */
	}
}

/* Styles for the testimonials slider pager before element */
#testimonials-slider-pager:before {
	content: ''; /* Empty content for the pseudo-element */
	position: absolute; /* Positioning the element absolutely within its parent */
	top: 50%; /* Center vertically */
	left: 50%; /* Center horizontally */
	transform: translate(-50%, -50%); /* Adjust position to truly center */
	width: 174px; /* Set width of the element */
	height: 174px; /* Set height of the element */
	border-radius: 50%; /* Make the element circular */
	border: 1px solid rgba(0, 0, 0, 0.1); /* Light border with slight transparency */
}

/* Styles for the testimonials slider pager items */
#testimonials-slider-pager .testimonials-slider-pager-one .pager-item {
	width: 71px; /* Set the width of each pager item */
	height: 71px; /* Set the height of each pager item */
	display: inline-block; /* Display items inline */
	vertical-align: middle; /* Align items vertically in the middle */
	position: absolute; /* Position items absolutely within the pager */
}

/* Positioning for the first pager item */
#testimonials-slider-pager
	.testimonials-slider-pager-one
	.pager-item:nth-child(1) {
	top: 55px; /* Position 55px from the top */
	left: -10px; /* Position 10px to the left */
}

/* Positioning for the second pager item */
#testimonials-slider-pager
	.testimonials-slider-pager-one
	.pager-item:nth-child(2) {
	top: 55px; /* Position 55px from the top */
	right: -10px; /* Position 10px to the right */
}

/* Positioning for the third pager item */
#testimonials-slider-pager
	.testimonials-slider-pager-one
	.pager-item:nth-child(3) {
	bottom: 55px; /* Position 55px from the bottom */
	left: -10px; /* Position 10px to the left */
}

#testimonials-slider-pager /* Main container for the testimonials slider pager */
.testimonials-slider-pager-one /* Specific styling for the first testimonials slider pager */
.pager-item:nth-child(4) {
	/* Targeting the fourth pager item */
	bottom: 55px; /* Positioning from the bottom */
	right: -10px; /* Positioning from the right */
}

#testimonials-slider-pager
	.testimonials-slider-pager-one
	.pager-item:nth-child(5) {
	/* Targeting the fifth pager item */
	bottom: -40px; /* Positioning from the bottom */
	left: 50%; /* Centering horizontally */
	transform: translateX(-50%); /* Adjusting position to center */
}

#testimonials-slider-pager
	.testimonials-slider-pager-one
	.pager-item:nth-child(6) {
	/* Targeting the sixth pager item */
	top: -40px; /* Positioning from the top */
	left: 50%; /* Centering horizontally */
	transform: translateX(-50%); /* Adjusting position to center */
}

#testimonials-slider-pager .testimonials-slider-pager-one .pager-item > img {
	/* Styling for images within pager items */
	width: 100%; /* Full width of the container */
	border-radius: 50%; /* Circular images */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

#testimonials-slider-pager
  /* Main container for the testimonials slider pager */
.testimonials-slider-pager-one
  /* Active pager item styling */
.pager-item.active
img {
	/* Set image opacity and scale for active state */
	opacity: 0.75;
	transform: scale(0.95);
}

/* Styling for the second pager item in the testimonials slider */
#testimonials-slider-pager .testimonials-slider-pager-two .pager-item {
	/* Set width, position, and centering for pager items */
	width: 163px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0);
	opacity: 0; /* Initially hidden */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

/* Active state for the second pager item */
#testimonials-slider-pager .testimonials-slider-pager-two .pager-item.active {
	opacity: 1; /* Fully visible */
	transform: translate(-50%, -50%) scale(0.95); /* Slightly scaled */
}

/* Image styling within the second pager item */
#testimonials-slider-pager .testimonials-slider-pager-two .pager-item > img {
	width: 100%; /* Full width of the pager item */
	border-radius: 50%; /* Circular images */
}

/* Padding for the pricing section */
.pricing-style-one {
	padding: 120px 0; /* Vertical padding for spacing */
}

.pricing-style-one .tab-title {
	/* Container for the tab titles in the pricing section */
	margin: 0; /* No margin around the container */
	padding: 0; /* No padding around the container */
	list-style: none; /* Removes default list styling */
	border: 0; /* No border around the container */
	justify-content: center; /* Centers the content horizontally */
	font-size: 0; /* Hides text size for alignment purposes */
	margin-bottom: 60px; /* Space below the tab title container */
}

.pricing-style-one .tab-title li {
	/* Individual list items for each tab title */
	display: inline-block; /* Displays items in a horizontal line */
	margin-bottom: 0 !important; /* Overrides any bottom margin */
}

.pricing-style-one .tab-title li a {
	/* Styles for the anchor tags within the tab titles */
	display: block; /* Makes the anchor a block element */
	border: none; /* No border around the anchor */
	outline: none; /* No outline on focus */
	color: #86909e; /* Default text color */
	display: inline-block; /* Allows padding and margin to be applied */
	padding: 14px 33.5px; /* Padding inside the anchor for spacing */
	cursor: pointer; /* Changes cursor to pointer on hover */
	color: #777b92; /* Text color for the anchor */
	font-size: 18px; /* Font size for the anchor text */
	font-weight: 500; /* Medium font weight */
	border-radius: 0 !important; /* No border radius */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width */
	border-color: #eaeaea; /* Border color */
	background-color: #fefdfe; /* Background color for the anchor */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Shadow effect for depth */
}

/* Styles for the pricing section with tab titles */
.pricing-style-one .tab-title li a:hover {
	/* Changes border, background, and text color on hover */
	border-color: #e94fca;
	background: #e94fca;
	color: #ffffff;
}

/* Styles for the active tab in the pricing section */
.pricing-style-one .tab-title li a.active {
	/* Ensures active tab has distinct border and background */
	border-color: #e94fca;
	background: #e94fca !important; /* !important to override other styles */
	color: #ffffff !important; /* !important to ensure text color is white */
}

/* Styles for the first tab in the pricing section */
.pricing-style-one .tab-title li:first-child a {
	/* Rounds the top-left and bottom-left corners of the first tab */
	border-top-left-radius: 4px !important; /* !important to enforce the style */
	border-bottom-left-radius: 4px !important; /* !important to enforce the style */
}

/* Styles for the last tab in the pricing section */
.pricing-style-one .tab-title li:last-child a {
	/* Rounds the top-right and bottom-right corners of the last tab */
	border-top-right-radius: 4px !important; /* !important to enforce the style */
	border-bottom-right-radius: 4px !important; /* !important to enforce the style */
}

/* Styles for individual pricing items */
.single-pricing-one {
	/* Sets padding, border, background, and text alignment for pricing items */
	padding: 60px 0; /* Vertical padding */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 10px; /* Rounded corners */
	background-color: white; /* White background */
	text-align: center; /* Centered text alignment */
}

.single-pricing-one.basic-pack .price {
	/* Sets the text color for the price in the basic package */
	color: #5dda6c;
}

.single-pricing-one.basic-pack .line {
	/* Sets the background color for the line in the basic package */
	background-color: #5dda6c;
}

.single-pricing-one.basic-pack .price-btn:hover {
	/* Changes the background and border color of the price button on hover in the basic package */
	background-color: #5dda6c;
	border-color: #5dda6c;
}

.single-pricing-one.biz-pack .price {
	/* Sets the text color for the price in the business package */
	color: #f0a734;
}

.single-pricing-one.biz-pack .line {
	/* Sets the background color for the line in the business package */
	background-color: #f0a734;
}

.single-pricing-one.biz-pack .price-btn:hover {
	/* Changes the background and border color of the price button on hover in the business package */
	background-color: #f0a734;
	border-color: #f0a734;
}

.single-pricing-one span,
.single-pricing-one a {
	/* Displays span and anchor elements as block-level elements */
	display: block;
}

.single-pricing-one ul.feature-lists {
	/* Styles the feature lists with no margin, padding, and list style, and adds bottom margin */
	margin: 0;
	padding: 0;
	list-style: none;
	margin-bottom: 40px;
}

.single-pricing-one ul.feature-lists li {
	/* Style for list items in the feature lists */
	font-size: 18px; /* Font size for the list items */
	line-height: 1.5em; /* Line height for better readability */
	color: #777b92; /* Text color for the list items */
}

.single-pricing-one ul.feature-lists li + li {
	/* Margin for the second and subsequent list items */
	margin-top: 20px; /* Space above each list item except the first */
}

.single-pricing-one .price {
	/* Style for the price display */
	color: #ad63f3; /* Price text color */
	font-size: 60px; /* Large font size for emphasis */
	font-weight: bold; /* Bold text for prominence */
	line-height: 1em; /* Line height for the price */
}

.single-pricing-one .pack-name {
	/* Style for the package name */
	font-size: 14px; /* Font size for the package name */
	font-weight: 500; /* Medium weight for the text */
	color: #273167; /* Text color for the package name */
	letter-spacing: 0.1em; /* Slight spacing between letters */
	text-transform: uppercase; /* Uppercase text for emphasis */
	line-height: 1em; /* Line height for the package name */
	margin-top: 22px; /* Space above the package name */
}

.single-pricing-one .line {
	/* Style for the horizontal line separator */
	background-color: #ad63f3; /* Color of the line */
	width: 40px; /* Width of the line */
	height: 2px; /* Height of the line */
	display: block; /* Display as a block element */
	margin-left: auto; /* Center the line horizontally */
	margin-right: auto; /* Center the line horizontally */
	margin-top: 40px; /* Space above the line */
	margin-bottom: 40px; /* Space below the line */
}

.single-pricing-one .price-btn {
	/* Button styling for pricing section */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width set to 1 pixel */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners with 4px radius */
	background-color: white; /* White background color */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Subtle shadow effect */
	display: inline-block; /* Inline-block display for button */
	vertical-align: middle; /* Aligns button vertically in the middle */
	color: #777b92; /* Text color set to a muted gray */
	font-size: 16px; /* Font size set to 16 pixels */
	font-weight: 500; /* Medium font weight */
	padding: 16px 42.5px; /* Padding for top/bottom and left/right */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.single-pricing-one .price-btn:hover {
	/* Hover effect for pricing button */
	background-color: #e94fca; /* Background color changes to pink on hover */
	color: #fff; /* Text color changes to white on hover */
	border-color: #e94fca; /* Border color changes to pink on hover */
}

.single-pricing-one .tag-line {
	/* Styling for the tagline in pricing section */
	font-size: 14px; /* Font size set to 14 pixels */
	text-transform: uppercase; /* Text transformed to uppercase */
	color: #777b92; /* Text color set to a muted gray */
	letter-spacing: 0.1em; /* Slightly increased letter spacing */
	margin-top: 40px; /* Top margin of 40 pixels */
}

/* Main style for the feature section with a background image and padding */
.feature-style-one {
	padding-top: 170px; /* Space above the feature section */
	background: #ffffff url(/assets/images/app-landing/bg-curve-1-2.png) center
		top no-repeat; /* White background with a specific image */
	background-size: cover; /* Ensures the background image covers the entire area */
	margin-top: -90px; /* Negative margin to pull the section upwards */
}

/* Container styling within the feature section */
.feature-style-one .container {
	padding-bottom: 120px; /* Space below the container */
}

/* Horizontal rule styling within the container */
.feature-style-one .container hr.style-one {
	margin-bottom: 130px; /* Space below the horizontal rule */
}

/* Image block styling within the feature section */
.feature-style-one .image-block {
	margin-top: -50px; /* Negative margin to pull the image block upwards */
	position: relative; /* Allows positioning of child elements */
	right: -20px; /* Shifts the image block to the right */
	animation: featureImgBounce 5s ease-in-out 0s infinite alternate; /* Applies a bouncing animation */
}

/* Keyframes for the bouncing animation of the image block */
@keyframes featureImgBounce {
	0% {
		-webkit-transform: translateY(0); /* Initial position */
		transform: translateY(0); /* Initial position */
	}
	100% {
		-webkit-transform: translateY(
			-30px
		); /* Moves the image block upwards */
		transform: translateY(-30px); /* Moves the image block upwards */
	}
}

.feature-style-one .content-block .block-title {
	/* Sets the bottom margin for the block title to create space below it */
	margin-bottom: 50px;
}

.feature-style-one .content-block p {
	/* Styles the paragraph text within the content block */
	font-size: 24px; /* Sets the font size */
	color: #777b92; /* Sets the text color */
	line-height: 40px; /* Sets the line height for better readability */
	margin: 0; /* Resets default margin */
	margin-bottom: 46px; /* Sets the bottom margin for spacing */
}

.feature-style-one .content-block ul.feature-lists {
	/* Styles the unordered list of feature lists */
	margin: 0; /* Resets default margin */
	padding: 0; /* Resets default padding */
	list-style: none; /* Removes default list styling */
	margin-bottom: 54px; /* Sets the bottom margin for spacing */
}

.feature-style-one .content-block ul.feature-lists li {
	/* Styles each list item within the feature lists */
	position: relative; /* Allows for absolute positioning of child elements */
	color: #777b92; /* Sets the text color */
	font-size: 18px; /* Sets the font size */
	padding-left: 35px; /* Adds padding to the left for indentation */
}

.feature-style-one .content-block ul.feature-lists li + li {
	/* Adds margin to the top of each list item except the first one */
	margin-top: 10px; /* Sets the top margin for spacing between items */
}

/* Styles for feature list items in feature-style-one */
.feature-style-one .content-block ul.feature-lists li i {
	position: absolute; /* Positioning icon absolutely within the list item */
	top: 50%; /* Centering vertically */
	transform: translateY(-50%); /* Adjusting for vertical centering */
	left: 0; /* Aligning to the left */
	color: #e94fca; /* Icon color */
}

/* Styles for the feature button in feature-style-one */
.feature-style-one .content-block .feature-btn {
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width of 1 pixel */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners */
	background-color: white; /* White background */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Subtle shadow effect */
	display: inline-block; /* Inline-block display for button */
	vertical-align: middle; /* Aligning vertically in line with other elements */
	color: #777b92; /* Text color */
	font-size: 16px; /* Font size */
	font-weight: 500; /* Medium font weight */
	padding: 16px 42.5px; /* Padding for button */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Hover effects for the feature button */
.feature-style-one .content-block .feature-btn:hover {
	background-color: #e94fca; /* Background color change on hover */
	color: #fff; /* Text color change on hover */
	border-color: #e94fca; /* Border color change on hover */
}

.feature-style-two {
	/* Main container for feature style two with top and bottom padding */
	padding-top: 70px;
	padding-bottom: 60px;
}

.feature-style-two .image-block {
	/* Image block within feature style two with margin and animation */
	margin-top: 50px; /* Space above the image block */
	position: relative; /* Positioning context for absolute children */
	left: -84px; /* Shift the image block to the left */
	animation: featureImgBounce 5s ease-in-out 0s infinite alternate; /* Animation for bouncing effect */
}

.feature-style-two .image-block:before,
.feature-style-two .image-block:after {
	/* Pseudo-elements for decorative circles around the image block */
	content: ''; /* Empty content for pseudo-elements */
	width: 318px; /* Width of the circles */
	height: 318px; /* Height of the circles */
	border-radius: 50%; /* Make the circles round */
	border: 43px solid #fafafa; /* Border styling for the circles */
	position: absolute; /* Positioning relative to the image block */
}

.feature-style-two .image-block:before {
	/* First circle positioned above the image block */
	top: 50px; /* Distance from the top of the image block */
	left: 40px; /* Distance from the left of the image block */
}

.feature-style-two .image-block:after {
	/* Second circle positioned below the image block */
	bottom: 50px; /* Distance from the bottom of the image block */
	right: 518px; /* Distance from the right of the image block */
}

.feature-style-two .image-block img {
	/* Sets the position of the image to relative for positioning context */
	position: relative;
	/* Ensures the image appears above other elements */
	z-index: 10;
}

.feature-style-two .content-block .block-title {
	/* Adds space below the block title */
	margin-bottom: 50px;
}

.feature-style-two .content-block p {
	/* Sets the font size for paragraph text */
	font-size: 24px;
	/* Defines the text color */
	color: #777b92;
	/* Sets the line height for better readability */
	line-height: 40px;
	/* Resets default margin */
	margin: 0;
	/* Adds space below the paragraph */
	margin-bottom: 46px;
}

.feature-style-two .content-block ul.feature-lists {
	/* Resets margin and padding for the feature lists */
	margin: 0;
	padding: 0;
	/* Removes default list styling */
	list-style: none;
	/* Adds space below the list */
	margin-bottom: 54px;
}

.feature-style-two .content-block ul.feature-lists li {
	/* Sets the position of list items to relative for positioning context */
	position: relative;
	/* Defines the text color for list items */
	color: #777b92;
	/* Sets the font size for list items */
	font-size: 18px;
	/* Adds left padding for indentation */
	padding-left: 35px;
}

.feature-style-two .content-block ul.feature-lists li + li {
	/* Adds a top margin of 10px to all list items that follow another list item */
	margin-top: 10px;
}

.feature-style-two .content-block ul.feature-lists li i {
	/* Positions the icon absolutely within the list item */
	position: absolute;
	top: 50%; /* Centers the icon vertically */
	transform: translateY(
		-50%
	); /* Adjusts the icon's position to be perfectly centered */
	left: 0; /* Aligns the icon to the left */
	color: #e94fca; /* Sets the icon color */
}

.feature-style-two .content-block .feature-btn {
	/* Styles for the feature button */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width of 1px */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners with a radius of 4px */
	background-color: white; /* White background color */
	box-shadow: 0px 15px 30px 0px rgba(119, 123, 146, 0.1); /* Subtle shadow effect */
	display: inline-block; /* Allows the button to sit inline with other elements */
	vertical-align: middle; /* Aligns the button vertically in the middle */
	color: #777b92; /* Text color for the button */
	font-size: 16px; /* Font size of 16px */
	font-weight: 500; /* Medium font weight */
	padding: 16px 42.5px; /* Padding around the button */
	transition: all 0.4s ease; /* Smooth transition for all properties over 0.4 seconds */
}

/* Styles for the feature button on hover state */
.feature-style-two .content-block .feature-btn:hover {
	background-color: #e94fca; /* Background color changes on hover */
	color: #fff; /* Text color changes to white on hover */
	border-color: #e94fca; /* Border color changes to match background on hover */
}

/* Styles for step icons */
i.step {
	font-size: 34px; /* Font size for step icons */
	padding: 30px 10px 0 10px; /* Padding around the step icons */
}

/* Main container for service section */
.services-style-one {
	position: relative; /* Positioning context for child elements */
	padding-top: 100px; /* Top padding for spacing */
	padding-bottom: 50px; /* Bottom padding for spacing */
}

/* Individual service block styling */
.services-style-one .single-service-one {
	padding: 60px; /* Padding inside the service block */
	padding-bottom: 50px; /* Additional bottom padding */
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width */
	border-color: #ffe5e5; /* Light pink border color */
	border-radius: 4px; /* Rounded corners */
	background-color: white; /* White background for the service block */
	box-shadow: 0px 15px 30px 0px rgba(255, 228, 228, 0.3); /* Shadow effect for depth */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
	position: relative; /* Positioning context for child elements */
	overflow: hidden; /* Hides overflow content */
}

/* Styles for the first service in the services section */
.services-style-one .single-service-one:before {
	content: ''; /* Empty content for pseudo-element */
	width: 600px; /* Width of the circular background */
	height: 600px; /* Height of the circular background */
	border-radius: 50%; /* Makes the element circular */
	position: absolute; /* Positions the element absolutely within its parent */
	bottom: 25%; /* Positions the element 25% from the bottom of the parent */
	left: 50%; /* Centers the element horizontally */
	transform: translate(
		-50%,
		-100%
	); /* Adjusts position to center the element */
	background-color: #ca00ca; /* Background color of the circular element */
	z-index: 8; /* Stacking order of the element */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

/* Styles for hover effects on the service block */
.services-style-one .single-service-one .hover-block:before,
.services-style-one .single-service-one .hover-block:after {
	content: ''; /* Empty content for pseudo-elements */
	width: 600px; /* Width of the circular hover background */
	height: 600px; /* Height of the circular hover background */
	border-radius: 50%; /* Makes the element circular */
	position: absolute; /* Positions the element absolutely within its parent */
}

/* Styles for the before pseudo-element of the hover block */
.services-style-one .single-service-one .hover-block:before {
	bottom: 65%; /* Positions the element 65% from the bottom of the parent */
	left: 50%; /* Centers the element horizontally */
	transform: translate(
		-50%,
		-100%
	); /* Adjusts position to center the element */
	background-color: #8c00ca; /* Background color of the hover circular element */
	z-index: 10; /* Stacking order of the hover element */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.services-style-one .single-service-one .hover-block:after {
	/* Pseudo-element for hover effect with background color */
	background-color: #ab00ca; /* Background color for the hover effect */
	bottom: 45%; /* Position from the bottom of the parent */
	left: 50%; /* Center horizontally */
	transform: translate(
		-50%,
		-100%
	); /* Adjust position to center and move up */
	z-index: 9; /* Stack order for the hover effect */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.services-style-one .single-service-one i {
	/* Icon styling within the service block */
	font-size: 64px; /* Size of the icon */
	color: #5cda6b; /* Color of the icon */
	transition: all 0.4s ease; /* Smooth transition for all properties */
	position: relative; /* Positioning context for z-index */
	z-index: 10; /* Stack order for the icon */
}

.services-style-one .single-service-one h3 {
	/* Heading styling within the service block */
	color: #273167; /* Text color for the heading */
	font-size: 22px; /* Font size of the heading */
	line-height: 34px; /* Line height for spacing */
	margin: 0; /* Reset margin */
	margin-top: 17px; /* Top margin for spacing */
	margin-bottom: 35px; /* Bottom margin for spacing */
	transition: all 0.4s ease; /* Smooth transition for all properties */
	position: relative; /* Positioning context for z-index */
	z-index: 10; /* Stack order for the heading */
}

.services-style-one .single-service-one p {
	/* Text color for service description */
	color: #777b92;
	/* Font size for service description */
	font-size: 18px;
	/* Line height for spacing between lines */
	line-height: 34px;
	/* No margin for top */
	margin: 0;
	/* Bottom margin for spacing below the paragraph */
	margin-bottom: 23px;
	/* Smooth transition for all properties over 0.4 seconds */
	transition: all 0.4s ease;
	/* Positioning context for child elements */
	position: relative;
	/* Stacking order for the element */
	z-index: 10;
}

.services-style-one .single-service-one .line-block {
	/* Display as a block element */
	display: block;
	/* Background color for the line block */
	background-color: #5dda6c;
	/* Width of the line block */
	width: 41px;
	/* Height of the line block */
	height: 2px;
	/* Bottom margin for spacing below the line block */
	margin-bottom: 20px;
	/* Smooth transition for all properties over 0.4 seconds */
	transition: all 0.4s ease;
	/* Positioning context for child elements */
	position: relative;
	/* Stacking order for the element */
	z-index: 10;
}

.services-style-one .single-service-one a.more-link {
	/* Display as an inline-block element */
	display: inline-block;
	/* Vertical alignment in relation to surrounding elements */
	vertical-align: middle;
	/* Text transformation to uppercase */
	text-transform: uppercase;
	/* Text color for the link */
	color: #273167;
	/* Font size for the link */
	font-size: 14px;
	/* Font weight for the link */
	font-weight: 500;
	/* Letter spacing for the link text */
	letter-spacing: 0.1em;
	/* Line height for spacing */
	line-height: 1em;
	/* Smooth transition for all properties over 0.4 seconds */
	transition: all 0.4s ease;
	/* Positioning context for child elements */
	position: relative;
	/* Stacking order for the element */
	z-index: 10;
}

/* Styles for the service section with a hover effect */
.services-style-one .single-service-one:hover {
	/* Changes background and border color on hover */
	background-color: #e94fca;
	border-color: #e94fca;
}

/* Changes text color of icons, headings, paragraphs, and links on hover */
.services-style-one .single-service-one:hover i,
.services-style-one .single-service-one:hover h3,
.services-style-one .single-service-one:hover p,
.services-style-one .single-service-one:hover a.more-link {
	color: #fff;
}

/* Changes background color of the line block on hover */
.services-style-one .single-service-one:hover .line-block {
	background-color: #fff;
}

/* Transforms the pseudo-element before the service item on hover */
.services-style-one .single-service-one:hover:before {
	transform: translate(-50%, 0%);
	transition-delay: 0.2s; /* Delays the transition effect */
}

/* Transforms the pseudo-element before the hover block on hover */
.services-style-one .single-service-one:hover .hover-block:before {
	transform: translate(-50%, 0%);
	transition-delay: 0.1s; /* Delays the transition effect */
}

/* Transforms the pseudo-element after the hover block on hover */
.services-style-one .single-service-one:hover .hover-block:after {
	transform: translate(-50%, 0%);
}

/* Sets the icon color for the first child service item in a column */
.services-style-one [class*='col-']:nth-child(1) .single-service-one i {
	color: #5cda6b;
}

/* Styles for the first service block in the services section */
.services-style-one
	[class*='col-']:nth-child(1)
	.single-service-one
	.line-block {
	background-color: #5cda6b; /* Background color for the line block */
}

/* Icon color change on hover for the first service block */
.services-style-one [class*='col-']:nth-child(1) .single-service-one:hover i {
	color: #fff; /* Change icon color to white on hover */
}

/* Background color change for the line block on hover for the first service block */
.services-style-one
	[class*='col-']:nth-child(1)
	.single-service-one:hover
	.line-block {
	background-color: #fff; /* Change background color to white on hover */
}

/* Icon color for the second service block */
.services-style-one [class*='col-']:nth-child(2) .single-service-one i {
	color: #ad63f3; /* Icon color for the second service block */
}

/* Styles for the line block of the second service block */
.services-style-one
	[class*='col-']:nth-child(2)
	.single-service-one
	.line-block {
	background-color: #ad63f3; /* Background color for the line block */
}

/* Icon color change on hover for the second service block */
.services-style-one [class*='col-']:nth-child(2) .single-service-one:hover i {
	color: #fff; /* Change icon color to white on hover */
}

.services-style-one {
	/* Main container for service items with specific styling */

	[class*='col-']:nth-child(2) .single-service-one .line-block {
		/* Style for the second column service item on hover */
		background-color: #fff; /* White background on hover */
	}
}

.services-style-one [class*='col-']:nth-child(3) .single-service-one i {
	/* Icon color for the third column service item */
	color: #f0a734; /* Gold color for the icon */
}

.services-style-one
	[class*='col-']:nth-child(3)
	.single-service-one
	.line-block {
	/* Background color for the line block of the third column service item */
	background-color: #f0a734; /* Gold background */
}

.services-style-one [class*='col-']:nth-child(3) .single-service-one:hover i {
	/* Icon color change on hover for the third column service item */
	color: #fff; /* White color for the icon on hover */
}

.services-style-one
	[class*='col-']:nth-child(3)
	.single-service-one:hover
	.line-block {
	/* Background color change on hover for the line block of the third column service item */
	background-color: #fff; /* White background on hover */
}

.fun-fact-style-one {
	/* Container for fun fact items */
	padding-bottom: 100px; /* Bottom padding for spacing */
}

/* Styles for the fun fact section with a specific design */
.fun-fact-style-one .title-line {
	/* Reset margin and set text color */
	margin: 0;
	color: #777b92; /* Gray color for the title */
	letter-spacing: 0.2em; /* Spacing between letters */
	font-weight: 500; /* Medium font weight */
	font-size: 16px; /* Font size for the title */
	text-transform: uppercase; /* Uppercase text */
	text-align: center; /* Center align the text */
	margin-bottom: 90px; /* Space below the title */
}

/* Styles for individual fun facts */
.fun-fact-style-one .single-funfact-one h3,
.fun-fact-style-one .single-funfact-one p {
	/* Reset margin for headings and paragraphs */
	margin: 0;
}

.fun-fact-style-one .single-funfact-one h3 {
	/* Styles for the heading of a fun fact */
	color: #273167; /* Dark blue color for the heading */
	font-size: 60px; /* Large font size for emphasis */
	font-weight: 300; /* Light font weight */
	line-height: 1em; /* Single line height */
}

.fun-fact-style-one .single-funfact-one p {
	/* Styles for the paragraph of a fun fact */
	font-size: 14px; /* Smaller font size for the paragraph */
	color: #777b92; /* Gray color for the paragraph text */
	text-transform: uppercase; /* Uppercase text */
	letter-spacing: 0.2em; /* Spacing between letters */
	font-weight: 500; /* Medium font weight */
	line-height: 1em; /* Single line height */
	margin-top: 20px; /* Space above the paragraph */
}

.inner-banner {
	/* Sets the background image and color for the inner banner */
	background: #fff url(/assets/images/app-landing/inner-banner-1-1.png) center
		center no-repeat;
	/* Ensures the background image covers the entire element */
	background-size: cover;
	/* Positions the element relative to its normal position */
	position: relative;
	/* Adds padding to the bottom and top of the banner */
	padding-bottom: 120px;
	padding-top: 255px;
}

.inner-banner:before {
	/* Creates a pseudo-element for overlay effect */
	content: '';
	/* Positions the overlay absolutely within the inner banner */
	position: absolute;
	top: 0;
	left: 0;
	/* Sets the overlay to cover the entire banner */
	width: 100%;
	height: 100%;
	/* Applies a linear gradient background to the overlay */
	background-image: linear-gradient(-45deg, #320b82 0%, #9c33c3 100%);
	/* Sets the opacity of the overlay */
	opacity: 0.94;
}

.inner-banner .container {
	/* Positions the container relative to the inner banner */
	position: relative;
	/* Centers the text within the container */
	text-align: center;
}

.inner-banner .thm-breadcrumb {
	/* Resets margin and padding for the breadcrumb list */
	margin: 0;
	padding: 0;
	/* Removes default list styling */
	list-style: none;
}

.inner-banner .thm-breadcrumb li {
	/* Display list items inline and align them vertically in the middle */
	display: inline-block;
	vertical-align: middle;
}

.inner-banner .thm-breadcrumb li a,
.inner-banner .thm-breadcrumb li span {
	/* Style for links and spans within breadcrumb items */
	display: inline-block;
	vertical-align: middle;
	text-transform: uppercase; /* Transform text to uppercase */
	color: #fcfbfe; /* Set text color */
	font-size: 14px; /* Set font size */
	letter-spacing: 0.2em; /* Add spacing between letters */
	line-height: 1em; /* Set line height */
}

.inner-banner .thm-breadcrumb li span.sep {
	/* Style for separator spans in breadcrumb */
	margin-left: 10px; /* Add left margin */
	margin-right: 10px; /* Add right margin */
}

.inner-banner h2 {
	/* Style for the main heading in the inner banner */
	color: #fff; /* Set text color */
	margin: 0; /* Remove default margin */
	font-size: 46px; /* Set font size */
	font-weight: 400; /* Set font weight */
	margin-top: 5px; /* Add top margin */
}

/* Styles for the sidebar and its individual widgets, excluding search widget */
.sidebar .single-sidebar:not(.search-widget) {
	border-style: solid; /* Solid border style */
	border-width: 1px; /* Border width of 1 pixel */
	border-color: #eaeaea; /* Light gray border color */
	border-radius: 4px; /* Rounded corners with a radius of 4 pixels */
	padding: 50px; /* Padding of 50 pixels inside the widget */
}

/* Margin between consecutive sidebar widgets */
.sidebar .single-sidebar + .single-sidebar {
	margin-top: 30px; /* 30 pixels margin on top of the next widget */
}

/* Margin below the widget title */
.sidebar .single-sidebar .widget-title {
	margin-bottom: 30px; /* 30 pixels margin below the title */
}

/* Styles for the widget title heading */
.sidebar .single-sidebar .widget-title h3 {
	margin: 0; /* No margin for the heading */
	font-size: 20px; /* Font size of 20 pixels */
	color: #273167; /* Dark blue color for the text */
	font-weight: 400; /* Normal font weight */
}

/* Styles for the unordered list within the sidebar widget */
.sidebar .single-sidebar ul {
	margin: 0; /* No margin for the list */
	padding: 0; /* No padding for the list */
	list-style: none; /* No bullet points for the list items */
}

/* Flexbox layout for single post widget within the sidebar */
.sidebar .single-sidebar .widget-single-post {
	display: -webkit-flex; /* For older versions of WebKit browsers */
	display: -moz-flex; /* For older versions of Firefox */
	display: -ms-flex; /* For older versions of Internet Explorer */
	display: -o-flex; /* For older versions of Opera */
	display: flex; /* Standard flexbox display */
	align-items: center; /* Align items vertically centered */
	justify-content: space-between; /* Space between items */
}

/* Margin between consecutive single post widgets in the sidebar */
.sidebar .single-sidebar .widget-single-post + .widget-single-post {
	margin-top: 30px;
}

/* Styling for the inner block of the image in the single post widget */
.sidebar .single-sidebar .widget-single-post .image-block .inner-block {
	width: 60px; /* Fixed width for the image block */
	overflow: hidden; /* Hides overflow content */
	border-radius: 50%; /* Makes the image block circular */
}

/* Ensures the image fills the inner block */
.sidebar .single-sidebar .widget-single-post .image-block .inner-block > img {
	width: 100%; /* Image takes full width of the inner block */
}

/* Padding for the text block in the single post widget */
.sidebar .single-sidebar .widget-single-post .text-block {
	padding-left: 20px; /* Adds space to the left of the text */
}

/* Styling for the heading in the text block */
.sidebar .single-sidebar .widget-single-post .text-block h3 {
	font-size: 16px; /* Font size for the heading */
	line-height: 24px; /* Line height for better readability */
	font-weight: 400; /* Normal font weight */
}

/* Styling for the link within the heading */
.sidebar .single-sidebar .widget-single-post .text-block h3 a {
	color: #777b92; /* Default link color */
	transition: all 0.4s ease; /* Smooth transition for hover effects */
}

/* Hover effect for the link in the heading */
.sidebar .single-sidebar .widget-single-post .text-block h3 a:hover {
	color: #e94fca; /* Color change on hover */
}

.sidebar .single-sidebar .links-list {
	/* Adjusts the top margin of the links list within a single sidebar */
	margin-top: -10px;
}

.sidebar .single-sidebar .links-list li + li {
	/* Adds a top margin to each list item that follows another list item */
	margin-top: 15px;
}

.sidebar .single-sidebar .links-list li a {
	/* Styles for the anchor tags within the links list */
	color: #777b92; /* Text color */
	font-size: 16px; /* Font size */
	font-weight: 400; /* Font weight */
	transition: all 0.4s ease; /* Smooth transition for all properties */
	position: relative; /* Positioning context for pseudo-elements */
	display: inline-block; /* Allows for padding and margin adjustments */
}

.sidebar .single-sidebar .links-list li a:before {
	/* Pseudo-element for adding an icon before the link text */
	content: '\f101'; /* FontAwesome icon */
	font-family: 'FontAwesome'; /* Specifies the font family for the icon */
	color: #e94fca; /* Icon color */
	font-size: 14px; /* Icon font size */
	position: absolute; /* Positions the icon relative to the anchor */
	top: 50%; /* Vertically centers the icon */
	left: 0; /* Aligns the icon to the left */
	transform: translateY(-50%) translateX(-15px); /* Centers the icon vertically and offsets it to the left */
	opacity: 0; /* Initially hidden */
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.sidebar .single-sidebar .links-list li a:hover {
	/* Changes the link color and applies a horizontal translation on hover */
	color: #e94fca;
	transform: translateX(20px);
}

.sidebar .single-sidebar .links-list li a:hover:before {
	/* Sets the opacity to fully visible for the pseudo-element on hover */
	opacity: 1;
}

.sidebar .single-sidebar .tag-list-wrapper {
	/* Adjusts the top margin of the tag list wrapper */
	margin-top: -10px;
}

.sidebar .single-sidebar .tag-list-wrapper a {
	/* Styles the tag links with font size, color, and transition effect */
	font-size: 16px;
	color: #777b92;
	transition: all 0.4s ease; /* Smooth transition for all properties */
}

.sidebar .single-sidebar .tag-list-wrapper a:hover {
	/* Changes the tag link color on hover */
	color: #e94fca;
}

.sidebar .single-sidebar .search-form {
	/* Styles the search form with width, position, height, border radius, and overflow */
	width: 100%;
	position: relative;
	height: 84px;
	border-radius: 4px;
	overflow: hidden; /* Hides overflow content */
}

/* Styles for the search input field within the sidebar */
.sidebar .single-sidebar .search-form input {
	border: none; /* Removes the default border */
	outline: none; /* Removes the outline on focus */
	background-color: #e94fca; /* Sets the background color */
	color: #fff; /* Sets the text color to white */
	width: 100%; /* Full width of the parent container */
	height: 100%; /* Full height of the parent container */
	display: block; /* Displays as a block element */
	padding-left: 50px; /* Adds left padding for text */
	position: absolute; /* Positions the input absolutely within the parent */
	top: 0; /* Aligns the input to the top */
	left: 0; /* Aligns the input to the left */
}

/* Placeholder text color for WebKit browsers */
.sidebar .single-sidebar .search-form input::-webkit-input-placeholder {
	color: #fff; /* Sets the placeholder text color to white */
}

/* Placeholder text color for Mozilla Firefox */
.sidebar .single-sidebar .search-form input::-moz-placeholder {
	color: #fff; /* Sets the placeholder text color to white */
}

/* Placeholder text color for Internet Explorer 10+ */
.sidebar .single-sidebar .search-form input:-ms-input-placeholder {
	color: #fff; /* Sets the placeholder text color to white */
}

/* Placeholder text color for older versions of Mozilla Firefox */
.sidebar .single-sidebar .search-form input:-moz-placeholder {
	color: #fff; /* Sets the placeholder text color to white */
}

/* Styles for the submit button within the search form in the sidebar */
.sidebar .single-sidebar .search-form button[type='submit'] {
	border: none; /* Removes default border */
	outline: none; /* Removes outline on focus */
	background-color: transparent; /* Sets background to transparent */
	cursor: pointer; /* Changes cursor to pointer on hover */
	color: #fff; /* Sets text color to white */
	position: absolute; /* Positions the button absolutely within its container */
	top: 50%; /* Vertically centers the button */
	right: 50px; /* Positions the button 50px from the right */
	transform: translateY(-50%); /* Adjusts vertical position to truly center */
	font-size: 16px; /* Sets font size */
}

/* Container class for responsive layout */
.container {
	width: 100%; /* Full width of the parent element */
	padding-right: 15px; /* Right padding for spacing */
	padding-left: 15px; /* Left padding for spacing */
	margin-right: auto; /* Centers the container horizontally */
	margin-left: auto; /* Centers the container horizontally */
}
</style>

<!-- FILE DOCUMENTED -->
