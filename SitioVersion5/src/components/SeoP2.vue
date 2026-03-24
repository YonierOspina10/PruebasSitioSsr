<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling SEO content display.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's reactive data properties.
	 */
	data() {
		let config = this.$config(); // Configuration object for the component.
		let appComponent: any = this.$appComponent; // Reference to the application component.
        let showMore: boolean = false; // Flag to toggle the display of additional content.
        let seoP: any = ''; // Variable to hold SEO content.
		return {
			config,
			appComponent,
			seoP,
            showMore
		};
	},
	/**
	 * Lifecycle hook called after the component is created.
	 * Retrieves hidden divs and sets the SEO content.
	 */
	created() {
		const hiddenDivs = document.querySelectorAll("div[style='display: none']"); // Selects hidden divs.
		if (hiddenDivs.length > 0) {
			this.seoP = hiddenDivs[0].innerHTML; // Sets SEO content from the first hidden div.
      hiddenDivs.forEach(div => div.remove()); // Removes hidden divs from the DOM.
		}
	},
});
</script>

<template>
	<!-- Main container for SEO content, displayed if seoP is not empty -->
	<div
		tabindex="0"
		v-if="seoP != ''"
		class="flex flex-col my-2 md:w-10/12 h-full mx-auto w-11/12 rounded-box text-info-text items-center justify-center align-center"
	>
		<!-- Container for the SEO content with scrollable text -->
		<div class="textContainer relative max-h-[50vh] overflow-y-auto text-justify" :class="{ 'expanded': showMore }">
			<p class="SeopHTML" v-html="seoP"></p> <!-- Displays SEO content as HTML -->
		</div>
        <div class="w-full">
            <!-- Button to toggle the display of additional content -->
            <button
                class="flex justify-center items-center gap-2 text-lg text-neutral-text font-poppinssl my-8 mb-16 hover:scale-105 transition-all duration-300 ease-in-out"
                @click="showMore = !showMore"
            >
                {{ showMore ? $t('Mostrar menos') : $t('Mostrar más') }} <!-- Button text based on showMore state -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up transition-all duration-300 ease-in-out" :class="!showMore ? 'rotate-180': ''"><path d="m18 15-6-6-6 6"/></svg> <!-- Placeholder for an SVG icon -->
            </button>
        </div>
	</div>
</template>

<style>
/* Styles for the text container when not expanded */
.textContainer:not(.expanded) .SeopHTML {
  overflow: hidden; /* Hides overflow content */
  text-overflow: ellipsis; /* Displays ellipsis for overflow text */
  max-height: calc(1.5em * 10); /* Limits height to 10 lines */
  line-height: 1.5em; /* Sets line height */
}

/* Styles for different heading levels within the SEO content */
.SeopHTML h1 {
	display: block; /* Displays as block element */
	font-size: 2em; /* Sets font size */
	margin-top: 0.67em; /* Sets top margin */
	margin-bottom: 0.67em; /* Sets bottom margin */
	font-weight: bold; /* Sets font weight */
	line-height: 30px; /* Sets line height */
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

/* Styles for paragraphs and links within the SEO content */
.SeopHTML p {
	display: block; /* Displays as block element */
	margin-top: 1em; /* Sets top margin */
	margin-bottom: 1em; /* Sets bottom margin */
}
.SeopHTML a {
	color: #007bff; /* Sets link color */
	text-decoration: none; /* Removes underline from links */
	background-color: transparent; /* Sets background to transparent */
}
.SeopHTML a:hover {
	color: #0056b3; /* Changes link color on hover */
	text-decoration: underline; /* Underlines link on hover */
}
.SeopHTML strong {
	font-weight: bold; /* Sets strong text to bold */
}

/* Styles for images, ordered lists, and unordered lists */
.SeopHTML img {
	vertical-align: middle; /* Aligns images vertically */
	border-style: none; /* Removes border from images */
}
.SeopHTML ol {
	display: block; /* Displays as block element */
	list-style-type: decimal; /* Sets list style to decimal */
	margin-top: 1em; /* Sets top margin */
	margin-bottom: 1em; /* Sets bottom margin */
	margin-left: 0; /* Resets left margin */
	padding-left: 40px; /* Sets left padding */
}
.SeopHTML ul {
	display: block; /* Displays as block element */
	list-style-type: disc; /* Sets list style to disc */
	margin-top: 1em; /* Sets top margin */
	margin-bottom: 1em; /* Sets bottom margin */
	margin-left: 0; /* Resets left margin */
	padding-left: 40px; /* Sets left padding */
}
.SeopHTML li {
	display: list-item; /* Displays list items */
	text-align: -webkit-match-parent; /* Aligns list items */
}
</style>

<!-- FILE DOCUMENTED -->
