<script lang="ts">
import { defineComponent } from 'vue';
import HeaderDesktopv4 from '../headersDesktop/HeaderDesktopv4.vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    components: {
        // Registering the HeaderDesktopv4 component for use in this component.
        HeaderDesktopv4,
    },

    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the global app component.
        return {
            appComponent, // Exposing appComponent to the template.
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     * Configures social networks in the app component if certain conditions are met.
     */
    mounted() {
        if (
            this.appComponent.config != undefined && // Check if config exists.
            this.appComponent.config['not_login'] != undefined && // Check if 'not_login' exists in config.
            this.appComponent.config['not_login'][this.appComponent.lngProd] != undefined && // Check if language-specific config exists.
            this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'] != undefined // Check if social links exist.
        ) {
            // Assign social links to the appropriate country in the app component.
            this.appComponent.config.SOCIAL_NEWTWORKS_HEADER[this.appComponent.country] =
                this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'];
        }
    },

    /**
     * Methods available in the component.
     */
    methods: {
        /**
         * Opens a URL in the top window when a box is clicked.
         * @param {Object} box - The box object containing the URL.
         */
        clickBox(box: any) {
            window.open(box.url, '_top'); // Open the specified URL.
        },
    },
});
</script>
<template>
    <!-- Main sticky container for the header -->
    <div class="sticky top-0 z-[60]">
        <!-- Header bar with transition effects and styling -->
        <div
            class="w-full transition duration-200 ease-in-out border-b border-neutral-content text-neutral bg-opacity-90 bg-base-300 z-[60] h-[30px] max-h-[30px]"
        >
            <!-- Navbar container with flex properties for alignment -->
            <div class="mx-auto navbar max-w-none min-h-0 h-full font-light p-0 flex items-center justify-end">
                <!-- Template for social networks display based on conditions -->
                <template>
                    <div
                        v-if="
                            (appComponent.config.header_ != undefined &&
                            appComponent.config.header_.social_networks != undefined
                                ? appComponent.config.header_.social_networks
                                : appComponent.config.header.showRedes) &&
                            appComponent.config.SOCIAL_NEWTWORKS_HEADER != undefined &&
                            appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country] != undefined
                        "
                        class="items-center justify-end flex mr-2 text-xs ml-auto"
                    >
                        <!-- Loop through social network icons -->
                        <a
                            :aria-label="value.SOCIAL_ICON"
                            v-for="value in appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]"
                            :href="value.SOCIAL_URL"
                            target="_blank"
                            class="icons-social-header"
                        >
                            <!-- Font Awesome icon for social networks -->
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: value.SOCIAL_ICON }" />
                        </a>
                    </div>
                </template>
            </div>
        </div>
        <!-- Desktop header component, hidden on smaller screens -->
        <div class="block lg:hidden">
            <HeaderDesktopv4></HeaderDesktopv4>
        </div>
    </div>
</template>
<style>
/* Header border with a custom shape using clip-path */
.border__header {
    clip-path: polygon(0 0, 100% 0%, 78% 100%, 0% 100%);
}

/* Social icons in the header with padding and increased font size */
.icons-social-header {
    padding: 3px !important;
    font-size: 2em;
}

/* Title styling for highlighted bonus with animation */
.bono-destacado .title .spant {
    display: inline-block; /* Inline block for proper spacing */
    white-space: nowrap; /* Prevents text wrapping */
    animation: floatText 15s infinite linear; /* Floating text animation */
    padding-left: 100%; /* Initial padding for animation */
    padding-top: 1px; /* Small top padding */
    font-size: 12px; /* Font size for the title */
}

/* Pause animation on hover */
.bono-destacado .title .spant:hover {
    animation-play-state: paused; /* Pauses animation when hovered */
}

/* Class to show elements */
.open {
    display: inherit !important; /* Forces display to inherit */
}

/* Menu header positioning for version 2 */
.version2.menu-header-netabet {
    position: inherit; /* Inherits positioning from parent */
}
/* Animation for moving an element to the left on mobile devices */
@-webkit-keyframes moveLeftMobile {
    0% {
        -webkit-transform: translateX(0); /* Initial position */
        transform: translateX(0); /* Initial position */
    }
    100% {
        -webkit-transform: translateX(-170%); /* Final position */
        transform: translateX(-170%); /* Final position */
    }
}

/* Standard keyframes for moving an element to the left */
@keyframes moveLeftMobile {
    0% {
        -webkit-transform: translateX(0); /* Initial position */
        transform: translateX(0); /* Initial position */
    }
    100% {
        -webkit-transform: translateX(-170%); /* Final position */
        transform: translateX(-170%); /* Final position */
    }
}

/* Media query for styles on screens smaller than 810px */
@media (max-width: 810px) {
    header {
        min-height: 42px; /* Minimum height for header on mobile */
    }
}
/* Media query for mobile devices with a max width of 700px */
@media (max-width: 700px) {
    /* Set width of box inside ticker-mobile viewport */
    .ticker-mobile .viewport .box {
        width: 600px;
    }
}

/* Styles for usuario-componentes class */
.usuario-componentes {
    position: absolute !important; /* Positioning element absolutely */
    width: 295px !important; /* Fixed width */
    right: 0px !important; /* Align to the right */
    margin-right: 15px !important; /* Right margin */
    text-align: right !important; /* Right text alignment */
    font-family: 'Roboto', sans-serif !important; /* Font family */
}

/* Styles for select element when body has logueado class */
body.logueado select.select-language {
    height: auto; /* Automatic height */
    width: 41px; /* Fixed width */
    padding: 0; /* No padding */
    position: relative; /* Relative positioning */
    top: -2px; /* Slight upward adjustment */
}

/* Animation for moving viewport in ticker-mobile */
.ticker-mobile .viewport.moving {
    -webkit-animation: moveLeftMobile 1 3s linear; /* Webkit animation */
    animation: moveLeftMobile 1 3s linear; /* Standard animation */
}

/* Set width of box inside ticker-mobile viewport */
.ticker-mobile .viewport .box {
    width: 600px; /* Fixed width */
}
.bono-destacado .progress-container {
    width: 100%; /* Full width for the progress container */
}

.meter {
    box-sizing: content-box; /* Content box model for sizing */
    height: 10px; /* Fixed height for the meter */
    position: relative; /* Positioning context for child elements */
    background: #ffffff; /* White background for the meter */
    border-radius: 25px; /* Rounded corners for the meter */
    padding: 5px; /* Padding inside the meter */
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3); /* Inner shadow effect */
}

.meter > span {
    display: block; /* Block display for the span */
    height: 100%; /* Full height of the meter */
    border-top-right-radius: 8px; /* Rounded top right corner */
    border-bottom-right-radius: 8px; /* Rounded bottom right corner */
    border-top-left-radius: 20px; /* More pronounced rounded top left corner */
    border-bottom-left-radius: 20px; /* More pronounced rounded bottom left corner */
    background-color: #2a8601; /* Green background color */
    background-image: linear-gradient(center bottom, #2a8601, #2a8601); /* Gradient effect */
    box-shadow: /* Inner shadows for depth */
        inset 0 2px 9px rgba(255, 255, 255, 0.3),
        inset 0 -2px 6px rgba(0, 0, 0, 0.4);
    position: relative; /* Positioning context for overflow */
    overflow: hidden; /* Hide overflow content */
}
/* Styles for the meter component and animated spans */
.meter > span:after,
.animate > span > span {
    content: ''; /* Empty content for pseudo-elements */
    position: absolute; /* Positioning for overlay effect */
    top: 0; /* Align to the top */
    left: 0; /* Align to the left */
    bottom: 0; /* Align to the bottom */
    right: 0; /* Align to the right */

    /* Background gradient for visual effect */
    background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.2) 25%,
        /* Light color at 25% */ transparent 25%,
        /* Transparent at 25% */ transparent 50%,
        /* Transparent at 50% */ rgba(255, 255, 255, 0.2) 50%,
        /* Light color at 50% */ rgba(255, 255, 255, 0.2) 75%,
        /* Light color at 75% */ transparent 75%,
        /* Transparent at 75% */ transparent /* Fully transparent */
    );

    z-index: 1; /* Layering above other elements */
    background-size: 50px 50px; /* Size of the background pattern */
    animation: move 2s linear infinite; /* Animation for movement effect */

    /* Rounded corners for the meter */
    border-top-right-radius: 8px; /* Top right corner radius */
    border-bottom-right-radius: 8px; /* Bottom right corner radius */
    border-top-left-radius: 20px; /* Top left corner radius */
    border-bottom-left-radius: 20px; /* Bottom left corner radius */

    overflow: hidden; /* Hide overflow content */
}
.scroll-on-top-center {
    top: 38px; /* Positions the element 38px from the top */
}

@keyframes move {
    0% {
        background-position: 0 0; /* Initial background position */
    }
    100% {
        background-position: 50px 50px; /* Final background position */
    }
}

.porcent {
    position: inherit; /* Inherits position from parent */
    left: 50%; /* Centers the element horizontally */
    font-size: 12px; /* Sets font size */
    color: black; /* Sets text color to black */
    font-weight: bold; /* Makes text bold */
    top: -15px; /* Positions the element 15px above its normal position */
}

.mat-icon-button {
    color: black !important; /* Forces icon button color to black */
}

.bono-destacado {
    border-radius: 10px; /* Rounds the corners of the element */
    padding: 5px; /* Adds padding inside the element */
    margin: 4px 15px 0px 15px; /* Sets margin around the element */
    background: linear-gradient(
        /* Applies a gradient background */ 60deg,
        rgba(141, 141, 141, 0.8),
        rgba(217, 215, 215, 0.71),
        rgba(217, 215, 215, 0.68),
        #ffffff,
        #ffffff,
        rgba(217, 215, 215, 0.68),
        rgba(217, 215, 215, 0.71),
        rgba(158, 158, 158, 0.8)
    );
    cursor: pointer; /* Changes cursor to pointer on hover */
    z-index: -2; /* Sets stacking order */
    height: 85px; /* Sets fixed height */
    width: 200px; /* Sets fixed width */
}
/* Scale effect on hover for highlighted items */
.bono-destacado:hover {
    transform: scale(1.04);
}

/* Title styling with centered text and bold font */
.mytitle {
    display: block;
    text-align: center;
    line-height: 13px;
    color: black;
    font-weight: bold;
    overflow: hidden; /* Prevents overflow of text */
}

/* Secondary title styling, similar to .mytitle */
.mytitle2 {
    display: block;
    text-align: center;
    line-height: 13px;
    color: black;
    overflow: hidden; /* Prevents overflow of text */
}

/* Styling for a span element with a background and rounded corners */
span.cant {
    display: block;
    border-radius: 15px; /* Rounded corners */
    text-align: center;
    background: white; /* White background */
    color: black; /* Black text color */
    font-weight: bold; /* Bold text */
    width: calc(100% - 50px); /* Full width minus 50px */
    height: 20px; /* Fixed height */
    line-height: 20px; /* Center text vertically */
    border-color: black; /* Border color */
}

/* Inline block element with animation for floating text */
.spant {
    display: inline-block;
    white-space: nowrap; /* Prevents text wrapping */
    animation: floatText 15s infinite linear; /* Animation for floating effect */
    padding-left: 100%; /* Initial padding for animation */
    padding-top: 1px; /* Small top padding */
}
</style>

<!-- FILE DOCUMENTED -->
