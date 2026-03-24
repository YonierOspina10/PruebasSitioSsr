<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let seoP: any = ''; // Placeholder for SEO content
        return {
            appComponent,
            seoP,
        };
    },

    /**
     * Lifecycle hook called after the component is created.
     * Retrieves inner HTML of the first hidden div for SEO purposes.
     */
    created() {
        const hiddenDivs = document.querySelectorAll("div[style='display: none']"); // Selects hidden divs
        if (hiddenDivs.length > 0) {
            this.seoP = hiddenDivs[0].innerHTML; // Assigns inner HTML of the first hidden div to seoP
        }
    },
});
</script>
<template>
    <!-- Main container for collapsible section, shown only if seoP is not empty -->
    <div
        tabindex="0"
        v-if="seoP != ''"
        class="collapse collapse-arrow mt-14 md:w-8/12 mx-auto w-11/12 rounded-box bg-base-300 text-neutral border-2 border-solid border-accent-focus"
    >
        <!-- Checkbox input to control the collapse state -->
        <input
            type="checkbox"
            class="w-full"
            aria-labelledby="termsandconditions"
        />
        <!-- Title of the collapsible section -->
        <div
            class="collapse-title text-xl font-medium text-center bg-base-300"
            id="termsandconditions"
        >
            Ver más información
        </div>
        <!-- Content of the collapsible section, scrollable if content exceeds height -->
        <div class="collapse-content h-96 overflow-y-auto text-justify bg-base-300">
            <p
                v-html="seoP"
                class="SeopHTML"
            ></p>
        </div>
    </div>
</template>
<style>
.SeopHTML h1 {
    /* Main heading style */
    display: block; /* Makes the heading a block element */
    font-size: 2em; /* Font size for h1 */
    margin-top: 0.67em; /* Top margin */
    margin-bottom: 0.67em; /* Bottom margin */
    font-weight: bold; /* Bold text */
    line-height: 30px; /* Line height */
}

.SeopHTML h2 {
    /* Secondary heading style */
    display: block; /* Makes the heading a block element */
    font-size: 1.5em; /* Font size for h2 */
    margin-top: 0.83em; /* Top margin */
    margin-bottom: 0.83em; /* Bottom margin */
    font-weight: bold; /* Bold text */
}

.SeopHTML h3 {
    /* Tertiary heading style */
    display: block; /* Makes the heading a block element */
    font-size: 1.17em; /* Font size for h3 */
    margin-top: 1em; /* Top margin */
    margin-bottom: 1em; /* Bottom margin */
    font-weight: bold; /* Bold text */
}

.SeopHTML h4 {
    /* Quaternary heading style */
    display: block; /* Makes the heading a block element */
    font-size: 1em; /* Font size for h4 */
    margin-top: 1.33em; /* Top margin */
    margin-bottom: 1.33em; /* Bottom margin */
    font-weight: bold; /* Bold text */
}
.SeopHTML h5 {
    /* Styles for h5 headings within SeopHTML class */
    display: block; /* Makes the element a block-level element */
    font-size: 0.83em; /* Sets font size relative to the parent */
    margin-top: 1.67em; /* Space above the heading */
    margin-bottom: 1.67em; /* Space below the heading */
    font-weight: bold; /* Makes the text bold */
}

.SeopHTML h6 {
    /* Styles for h6 headings within SeopHTML class */
    display: block; /* Makes the element a block-level element */
    font-size: 0.67em; /* Sets font size relative to the parent */
    margin-top: 2.33em; /* Space above the heading */
    margin-bottom: 2.33em; /* Space below the heading */
    font-weight: bold; /* Makes the text bold */
}

.SeopHTML p {
    /* Styles for paragraphs within SeopHTML class */
    display: block; /* Makes the element a block-level element */
    margin-top: 1em; /* Space above the paragraph */
    margin-bottom: 1em; /* Space below the paragraph */
}

.SeopHTML a {
    /* Styles for links within SeopHTML class */
    color: #007bff; /* Sets the link color */
    text-decoration: none; /* Removes underline from links */
    background-color: transparent; /* Ensures no background color */
}

.SeopHTML a:hover {
    /* Styles for links on hover within SeopHTML class */
    color: #0056b3; /* Changes link color on hover */
    text-decoration: underline; /* Underlines the link on hover */
}
.SeopHTML strong {
    /* Sets the font weight to bold for strong elements */
    font-weight: bold;
}

.SeopHTML img {
    /* Aligns images vertically in the middle and removes border */
    vertical-align: middle;
    border-style: none;
}

.SeopHTML ol {
    /* Styles ordered lists with decimal bullets and specific margins/padding */
    display: block;
    list-style-type: decimal;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    padding-left: 40px;
}

.SeopHTML ul {
    /* Styles unordered lists with disc bullets and specific margins/padding */
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    padding-left: 40px;
}

.SeopHTML li {
    /* Displays list items and aligns text */
    display: list-item;
    text-align: -webkit-match-parent;
}
</style>

<!-- FILE DOCUMENTED -->
