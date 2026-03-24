<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the main application layout.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's data properties.
	 */
	data() {
		let config = this.$config(); // Retrieves the configuration object.
		let appComponent: any = this.$appComponent; // Retrieves the application component.
		return {
			config,
			appComponent,
		};
	},
	methods: {
		/**
		 * Opens a URL in a new browser tab.
		 * @param {string} url - The URL to open.
		 */
		goToLink(url) {
			window.open(url, '_blank'); // Opens the specified URL in a new tab.
		},
	},
});
</script>

<template>
	<div>
		<!-- Main container for the layout -->
		<div
			v-if="
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 7 &&
				appComponent.mobile == '' &&
				(appComponent.country == 'pe' || appComponent.country == 'br')
			"
			class="flex justify-center gap-2"
		>
			<!-- Conditional rendering for footer image based on configuration -->
			<div
				v-if="
					config.footer_ != undefined &&
					config.footer_.show_18_more != undefined
						? config.footer_.show_18_more
						: config.footer.show18text
				"
				class="flex justify-center items-center"
				:class="
					appComponent.config.layout != undefined &&
					appComponent.config.layout == 7 &&
					appComponent.config.mobileL != undefined &&
					appComponent.config.mobileL != undefined &&
					appComponent.config.mobileL == 1
						? 'hidden'
						: 'block'
				"
			>
				<img
					v-lazy="config.footer.show18text.src"
					width="46"
					height="46"
					alt="+18 Años"
				/>
			</div>
			<!-- Text indicating the official sponsor -->
			<div class="div-text text-center w-[80%] text-info-text">
				{{ $t('Patrocinador Oficial:') }}
			</div>
		</div>
		<!-- Alternative layout for different configurations -->
		<div
			v-if="
				appComponent.config.layout != undefined &&
				appComponent.config.layout != 7
			"
			class="div-text text-center text-info-text"
			:class="[
				{ 'my-0': config.layout != undefined && config.layout == 4 },
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 7 &&
				appComponent.config.mobileL != undefined &&
				appComponent.config.mobileL != undefined &&
				appComponent.config.mobileL == 1
					? 'hidden'
					: 'block',
			]"
		>
			{{ $t('Patrocinador Oficial:') }}
		</div>
		<!-- Social media links section -->
		<div class="redes-sociales">
			<div>
				<ul class="flex flex-wrap justify-center items-center">
					<!-- Loop through sponsors and display their links -->
					<li
						v-for="sponsors in config.SPONSORS_ != undefined
							? config.SPONSORS_
							: config.footer.sponsors[appComponent.country]"
					>
						<a
							v-if="
								sponsors.href != '' &&
								sponsors.href != undefined
							"
							:href="sponsors.href"
							@click="goToLink(sponsors.href)"
						>
							<img
								:width="sponsors.width"
								:height="sponsors.height"
								:alt="sponsors.title"
								v-lazy="sponsors.img"
								v-if="sponsors.show"
							/>
						</a>
						<span v-else>
							<img
								:class="{
									'max-w-[45px] max-h-[45px] md:max-h-[80px] md:max-w-[80px]':
										config.layout != undefined &&
										config.layout == 4,
								}"
								:width="sponsors.width"
								:height="sponsors.height"
								:alt="sponsors.title"
								v-lazy="sponsors.img"
								v-if="sponsors.show"
							/>
						</span>
					</li>
				</ul>
				<!-- Conditional rendering for additional footer image -->
				<div
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_18_more != undefined
							? config.footer_.show_18_more.show
							: config.footer.show18text.show
					"
					class="flex justify-center items-center"
					:class="
						appComponent.config.layout != undefined &&
						appComponent.config.layout == 7 &&
						(appComponent.country == 'pe' ||
							appComponent.country == 'br')
							? 'hidden'
							: 'block'
					"
				>
					<img
						v-lazy="config.footer_ != undefined &&
						config.footer_.show_18_more != undefined &&
						config.footer_.show_18_more.src != undefined
							? config.footer_.show_18_more.src
							: config.footer.show18text.src"
						alt="+18 Años"
						class="w-auto h-24"
					/>
				</div>
				<!-- Additional layout for mobile view -->
				<div
					v-if="
						appComponent.config.layout != undefined &&
						appComponent.config.layout == 7 &&
						appComponent.mobile != ''
					"
					class="flex justify-center items-center relative"
				>
					<div
						v-if="
							config.footer_ != undefined &&
							config.footer_.show_18_more != undefined
								? config.footer_.show_18_more
								: config.footer.show18text &&
									appComponent.country != 'mx' &&
									appComponent.country != 've' &&
									appComponent.country != 'cl'
						"
						class="flex justify-center items-center absolute -left-8 top-5"
					>
						<img
							v-lazy="config.footer.show18text.src"
							width="44"
							height="44"
							alt="+18 Años"
						/>
					</div>
					<div class="text-center text-info-text text-sm ml-6 w-full font-bold">
						{{ $t('Patrocinador Oficial:') }}
					</div>
				</div>
			</div>
			<!-- Copyright information -->
			<div>
				<p
					v-if="
						config.footer[appComponent.country] != undefined &&
						config.footer[appComponent.country].copyright !=
							undefined
					"
				>
					<span
						v-html="
							$t(config.footer[appComponent.country].copyright)
						"
					></span>
				</p>
			</div>
		</div>
	</div>
</template>

<style>
/* Styles for the social media section */
.redes-sociales {
	padding-top: 0px; /* No top padding */
}
.redes-sociales ul {
	padding-left: 0; /* No left padding for the list */
}
</style>

<!-- FILE DOCUMENTED -->
