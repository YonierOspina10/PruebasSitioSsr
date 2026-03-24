<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Defines the main component for the footer section.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The data object containing configuration and app component.
	 */
	data() {
		let config = this.$config(); // Retrieves the configuration object.
		let appComponent: any = this.$appComponent; // Retrieves the app component reference.
		return {
			config,
			appComponent,
		};
	},
});
</script>

<template>
	<!-- Main container for the footer section with social media links -->
	<div id="siguenos-footer" class="text-center">
		<!-- Conditional rendering of the social widget based on configuration -->
		<div
			v-if="
				config.footer_ != undefined &&
				config.footer_.social_widget != undefined
					? config.footer_.social_widget
					: config.footer != undefined &&
						config.footer[appComponent.country] != undefined &&
						config.footer[appComponent.country].social_widget !=
							undefined &&
						config.footer[appComponent.country].social_widget.show
			"
			class="social_widget social-networks"
		>
			<!-- Facebook social widget -->
			<div class="social_widget-fb">
				<div
					class="fb-like"
					:href="
						config.footer[appComponent.country].social_widget
							.facebook
					"
					target="_blank"
					data-layout="button_count"
					data-action="like"
					data-size="small"
					data-show-faces="false"
					data-share="false"
				></div>
			</div>
			<!-- Twitter social widget -->
			<div class="social_widget-tw">
				<a
					:href="
						config.footer[appComponent.country].social_widget
							.twitter
					"
					target="_blank"
					class="twitter-follow-button text-info-text"
					data-lang="es"
					data-show-count="false"
					>Follow @doradobet</a
				>
			</div>
		</div>
		<!-- Text indicating to follow on social media -->
		<span
			class="my-2 text-neutral"
			>{{ $t('Síguenos en') }}</span
		>
		<!-- Container for social links -->
		<div
			class="redes-sociales text-accent-focus"
		>
			<ul>
				<!-- Loop through social links based on configuration -->
				<li
					v-for="value in config['not_login'] != undefined &&
					config['not_login'][appComponent.lngProd] != undefined &&
					config['not_login'][appComponent.lngProd]['social_links'] !=
						undefined
						? config['not_login'][appComponent.lngProd][
								'social_links'
							]
						: config.SOCIAL_NEWTWORKS[appComponent.country]"
					class="hover:scale-125"
					@click="
						appComponent.gAnalytics('button_social_network', value)
					"
				>
					<a
						class="icons-socials"
						:class="
							(value.SOCIAL_NAME,
							appComponent.config.layout !== undefined &&
							appComponent.config.layout == 3
								|| appComponent.config.layout !== undefined && appComponent.config.layout == 7 ? 'transition-all text-info-text hover:scale-105'
								: '')
						"
						:href="value.SOCIAL_URL"
						target="_blank"
						:aria-label="value.SOCIAL_NAME"
					>
						<!-- Font Awesome icon for social media -->
						<font-awesome-icon
							:id="'1.1 RRSS – ' + value.SOCIAL_NAME"
							v-if="value.SOCIAL_ICON != undefined"
							:icon="
								config['not_login'] != undefined &&
								config['not_login'][appComponent.lngProd] !=
									undefined &&
								config['not_login'][appComponent.lngProd][
									'social_links'
								] != undefined
									? {
											prefix: 'fab',
											iconName: value.SOCIAL_ICON.includes('x') ? 'x-twitter' : value.SOCIAL_ICON,
										}
									: value.SOCIAL_ICON
							"
						/>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scope>
/* Styles for social media icons */
.icons-socials {
	font-size: 39px !important; /* Sets the font size for social icons */
}

/* Hover effects for different social media platforms */
.icons-socials.Facebook:hover {
	color: #3b5998 !important; /* Facebook hover color */
}
.icons-socials.Twitter:hover {
	color: rgb(0, 0, 0) !important; /* Twitter hover color */
}
.icons-socials.Instagram:hover {
	color: #ca0284 !important; /* Instagram hover color */
}
.icons-socials.Whatsapp:hover {
	color: #128c7e !important; /* Whatsapp hover color */
}
.icons-socials.Youtube:hover {
	color: #c4302b !important; /* Youtube hover color */
}
.icons-socials.LinkedIN:hover {
	color: #0b66c2 !important; /* LinkedIn hover color */
}
.icons-socials.Telegram:hover {
	color: #229ed9 !important; /* Telegram hover color */
}
.icons-socials.Threads:hover {
	color: #ffffff !important; /* Threads hover color */
}
.icons-socials.Tiktok:hover {
	color: #000000 !important; /* TikTok hover color */
}

/* Margin for the footer container */
div#siguenos-footer {
	margin-top: 1rem;
}

/* Styles for the social links list */
.redes-sociales ul {
	padding-left: 0; /* Removes padding from the list */
}

/* Styles for the social networks container */
.social-networks {
	width: 100%; /* Full width for the social networks container */
	height: 40px; /* Fixed height for the social networks container */
}

/* Styles for Facebook widget */
.social_widget-fb {
	display: inline-block; /* Inline block display for Facebook widget */
	vertical-align: top; /* Aligns the widget to the top */
	padding: 0 3px; /* Padding for the widget */
}

/* Styles for Twitter widget */
.social_widget-tw {
	display: inline-block; /* Inline block display for Twitter widget */
	padding: 0 3px; /* Padding for the widget */
}
</style>

<!-- FILE DOCUMENTED -->
