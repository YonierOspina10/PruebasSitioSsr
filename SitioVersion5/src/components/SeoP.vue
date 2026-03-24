<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling SEO content display.
 */
export default defineComponent({
    props: {
        widthF: {
            type: Boolean,
            required: true
        },
    },
	/**
	 * Component data function.
	 * @returns {Object} The component's reactive data properties.
	 */
	data() {
		let config = this.$config(); // Retrieves configuration settings.
		let appComponent: any = this.$appComponent; // Stores the application component reference.
		let seoP: any = ''; // Initializes SEO content variable.
		return {
			config,
			appComponent,
			seoP,
		};
	},
	/**
	 * Lifecycle hook called after the component is created.
	 * It retrieves hidden divs and sets the SEO content.
	 */
	created() {
		const hiddenDivs = document.querySelectorAll(
			"div[style='display: none']" // Selects all hidden div elements.
		);
		if (hiddenDivs.length > 0) {
			this.seoP = hiddenDivs[0].innerHTML; // Sets SEO content from the first hidden div.
			hiddenDivs.forEach((div) => div.remove()); // Removes all hidden divs from the DOM.
		}
	},
});
</script>

<template>
	<!-- Main container for the collapsible SEO content -->
	<div
		tabindex="0"
		:class="{'rounded-[100px] md:w-[95%]': widthF, 'my-14 border-solid rounded-box md:w-8/12': !widthF}"
		class="collapse collapse-arrow mx-auto w-11/12 bg-base-300 text-neutral border-2 border-accent-focus"
	>
		<!-- Checkbox for toggling the collapse -->
		<input
			type="checkbox"
			class="w-full"
			aria-labelledby="termsandconditions"
		/>
		<!-- Title of the collapsible section -->
		<div
			class="collapse-title text-xl font-medium text-center bg-base-300"id="termsandconditions"
		>
			{{ $t('Ver más información') }}
			<!-- Translated title text -->
		</div>
		<!-- Content of the collapsible section -->
		<div
			class="collapse-content h-96 overflow-y-auto text-justify bg-base-300 text-neutral"
		>
			<p v-html="seoP" class="SeopHTML"></p>
			<!-- Displays SEO content with HTML rendering -->
		</div>
	</div>
</template>

<style>
/* Styles for SEO content headings */
.SeopHTML h1 {
	display: block;
	font-size: 2em;
	margin-top: 0.67em;
	margin-bottom: 0.67em;
	font-weight: bold;
	line-height: 30px;
}
.SeopHTML h2 {
	display: block;
	font-size: 1.5em;
	margin-top: 0.83em;
	margin-bottom: 0.83em;
	font-weight: bold;
}
.SeopHTML h3 {
	display: block;
	font-size: 1.17em;
	margin-top: 1em;
	margin-bottom: 1em;
	font-weight: bold;
}
.SeopHTML h4 {
	display: block;
	font-size: 1em;
	margin-top: 1.33em;
	margin-bottom: 1.33em;
	font-weight: bold;
}
.SeopHTML h5 {
	display: block;
	font-size: 0.83em;
	margin-top: 1.67em;
	margin-bottom: 1.67em;
	font-weight: bold;
}
.SeopHTML h6 {
	display: block;
	font-size: 0.67em;
	margin-top: 2.33em;
	margin-bottom: 2.33em;
	font-weight: bold;
}
/* Styles for paragraphs */
.SeopHTML p {
	display: block;
	margin-top: 1em;
	margin-bottom: 1em;
}
/* Styles for links */
.SeopHTML a {
	color: #007bff;
	text-decoration: none;
	background-color: transparent;
}
.SeopHTML a:hover {
	color: #0056b3;
	text-decoration: underline;
}
/* Styles for strong text */
.SeopHTML strong {
	font-weight: bold;
}
/* Styles for images */
.SeopHTML img {
	vertical-align: middle;
	border-style: none;
}
/* Styles for ordered lists */
.SeopHTML ol {
	display: block;
	list-style-type: decimal;
	margin-top: 1em;
	margin-bottom: 1em;
	margin-left: 0;
	padding-left: 40px;
}
/* Styles for unordered lists */
.SeopHTML ul {
	display: block;
	list-style-type: disc;
	margin-top: 1em;
	margin-bottom: 1em;
	margin-left: 0;
	padding-left: 40px;
}
/* Styles for list items */
.SeopHTML li {
	display: list-item;
	text-align: -webkit-match-parent;
}
</style>

<!-- FILE DOCUMENTED -->
