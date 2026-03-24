<script lang="ts">
import AppCarouselProviders3 from '../CarouselProviders3.vue'; // Importing carousel component for providers
import AppMenuFooter3 from '../menus/MenuFooter3.vue'; // Importing footer menu component version 3
import AppMenuFooter3v2 from '../menus/MenuFooter3V2.vue'; // Importing footer menu component version 3.2
import AppMenuFooter3v3 from '../menus/MenuFooter3V3.vue'; // Importing footer menu component version 3.3
import AppSocialNetworks from '../SocialNetworks.vue'; // Importing social networks component
import AppSponsors from '../Sponsors.vue'; // Importing sponsors component
import AppCopyright from '../Copyright.vue'; // Importing copyright component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import CarouselProviders3V2 from '../CarouselProviders3V2.vue';
import AppComplaintsBook from '@/components/ComplaintsBook.vue'; // Importing carousel component version 3.2

export default defineComponent({
	components: {
        AppComplaintsBook,
		AppCarouselProviders3, // Registering carousel providers component
		AppMenuFooter3, // Registering footer menu component version 3
		AppMenuFooter3v2, // Registering footer menu component version 3.2
		AppSocialNetworks, // Registering social networks component
		AppSponsors, // Registering sponsors component
		AppCopyright, // Registering copyright component
		CarouselProviders3V2, // Registering carousel providers component version 3.2
		AppMenuFooter3v3, // Registering footer menu component version 3.3
	},
	data() {
		let config = this.$config(); // Retrieving configuration object
		let appComponent: any = this.$appComponent; // Retrieving application component
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	methods: {
		/**
		 * Redirects to a specified URL when a box is clicked.
		 * @param {any} box - The box object containing the URL.
		 */
		clickBox(box: any) {
			window.location.href = this.config.baseUrlFx + box.url; // Redirecting to the constructed URL
		},
	},
});
</script>

<template>
	<footer
		class="in w-full px-2 flex justify-center items-center bg-base-content bg-gradient-to-b from-base-300/60 to-base-300/30 py-9"
	>
		<div
			class="flex flex-col justify-center items-center text-info-text"
			:class="
				config.providers.lightColor
					? 'light'
					: ''
			"
		>
			<!-- Conditional rendering of footer menu version 3.3 based on configuration -->
			<AppMenuFooter3v3
				v-if="
					config.footer_ != undefined &&
					config.footer_.show_menu != undefined
						? config.footer_.show_menu &&
							config.footer.styleVersion == 5
						: config.footer.showMenuFooter &&
							config.footer.styleVersion == 5
				"
			/>
			<!-- Conditional rendering of carousel providers version 3.2 based on configuration -->
			<CarouselProviders3V2
				v-if="
					config.footer_ != undefined &&
					config.footer_.show_payments != undefined
						? config.footer_.show_payments
						: config.providers.showFooterProviders
				"
			/>
			<div
				class="grid grid-cols-2 lg:grid-cols-3 justify-items-center py-10 max-w-[1250px] mx-auto text-info-text gap-7"
			>
				<!-- Conditional rendering of social networks component based on configuration -->
				<AppSocialNetworks
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_social_networks != undefined
							? config.footer_.show_social_networks
							: config.footer.showSocial
					"
				/>
				<!-- Conditional rendering of sponsors component based on configuration -->
				<AppSponsors
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_partners != undefined
							? config.footer_.show_partners == 1
							: config.footer.showPartners
					"
				/>
				<!-- Rendering copyright component -->
				<AppCopyright class="col-span-3 lg:col-span-1" />
			</div>
            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
		</div>
	</footer>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->
