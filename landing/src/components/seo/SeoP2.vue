<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for displaying SEO content.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's reactive data properties.
	 */
	data() {
		let appComponent: any = this.$appComponent; // Reference to the app component.
		let seoP: any = ''; // Variable to hold SEO content.
		let showMore: boolean = false; // Flag to toggle visibility of additional content.
		return {
			appComponent,
			seoP,
            showMore
		};
	},
	/**
	 * Lifecycle hook called after the component is created.
	 * Retrieves hidden div content for SEO purposes.
	 */
	created() {
		const hiddenDivs = document.querySelectorAll("div[style='display: none']"); // Select hidden divs.
		if (hiddenDivs.length > 0) {
			this.seoP = hiddenDivs[0].innerHTML; // Assign inner HTML of the first hidden div to seoP.
		}
	},
});
</script>

<template>
	<!-- Main container for SEO content, displayed if seoP is not empty -->
	<div
		tabindex="0"
		v-if="seoP != ''"
		class="flex flex-col my-2 md:w-10/12 h-full mx-auto w-11/12 rounded-box text-neutral items-center justify-center align-center"
	>
		<!-- Container for the SEO text with scrollable overflow -->
		<div class="textContainer relative max-h-[50vh] overflow-y-auto text-justify" :class="{ 'expanded': showMore }">
			<p class="SeopHTML" v-html="seoP"></p> <!-- Render SEO content as HTML -->
		</div>
        <div class="w-full">
            <!-- Button to toggle visibility of additional content -->
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
  overflow: hidden; /* Hide overflow content */
  text-overflow: ellipsis; /* Show ellipsis for overflowed text */
  max-height: calc(1.5em * 10); /* Limit height to 10 lines */
  line-height: 1.5em; /* Set line height */
}

/* Styles for different heading levels within the SEO content */
.SeopHTML h1 {
	display: block; /* Display as block element */
	font-size: 2em; /* Font size for h1 */
	margin-top: 0.67em; /* Top margin */
	margin-bottom: 0.67em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
	line-height: 30px; /* Line height */
}
.SeopHTML h2 {
	display: block; /* Display as block element */
	font-size: 1.5em; /* Font size for h2 */
	margin-top: 0.83em; /* Top margin */
	margin-bottom: 0.83em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
}
.SeopHTML h3 {
	display: block; /* Display as block element */
	font-size: 1.17em; /* Font size for h3 */
	margin-top: 1em; /* Top margin */
	margin-bottom: 1em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
}
.SeopHTML h4 {
	display: block; /* Display as block element */
	font-size: 1em; /* Font size for h4 */
	margin-top: 1.33em; /* Top margin */
	margin-bottom: 1.33em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
}
.SeopHTML h5 {
	display: block; /* Display as block element */
	font-size: 0.83em; /* Font size for h5 */
	margin-top: 1.67em; /* Top margin */
	margin-bottom: 1.67em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
}
.SeopHTML h6 {
	display: block; /* Display as block element */
	font-size: 0.67em; /* Font size for h6 */
	margin-top: 2.33em; /* Top margin */
	margin-bottom: 2.33em; /* Bottom margin */
	font-weight: bold; /* Bold font weight */
}
.SeopHTML p {
	display: block; /* Display as block element */
	margin-top: 1em; /* Top margin */
	margin-bottom: 1em; /* Bottom margin */
}
.SeopHTML a {
	color: #007bff; /* Link color */
	text-decoration: none; /* No underline */
	background-color: transparent; /* Transparent background */
}
.SeopHTML a:hover {
	color: #0056b3; /* Link color on hover */
	text-decoration: underline; /* Underline on hover */
}
.SeopHTML strong {
	font-weight: bold; /* Bold font weight for strong text */
}
.SeopHTML img {
	vertical-align: middle; /* Align images vertically */
	border-style: none; /* No border for images */
}
.SeopHTML ol {
	display: block; /* Display ordered list as block */
	list-style-type: decimal; /* Decimal list style */
	margin-top: 1em; /* Top margin */
	margin-bottom: 1em; /* Bottom margin */
	margin-left: 0; /* No left margin */
	padding-left: 40px; /* Left padding */
}
.SeopHTML ul {
	display: block; /* Display unordered list as block */
	list-style-type: disc; /* Disc list style */
	margin-top: 1em; /* Top margin */
	margin-bottom: 1em; /* Bottom margin */
	margin-left: 0; /* No left margin */
	padding-left: 40px; /* Left padding */
}
.SeopHTML li {
	display: list-item; /* Display list items */
	text-align: -webkit-match-parent; /* Align list items */
}
</style>

<!-- FILE DOCUMENTED -->
