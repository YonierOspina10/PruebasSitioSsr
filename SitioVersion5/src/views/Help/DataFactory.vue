<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary functions from Vue
import { useRoute } from 'vue-router'; // Import useRoute for accessing route parameters

export default defineComponent({
	// Define the component
	data: function () {
		let config = this.$config(); // Retrieve configuration object
		let appComponent: any = this.$appComponent; // Reference to the application component
		let language: any = undefined; // Variable to hold the language setting
		let stats: boolean = false; // State variable to control visibility of statistics
		let text: string = ''; // Variable to hold text content
		let src: string = ''; // Variable to hold the source URL for iframe
		return {
			config,
			appComponent,
			language,
			stats,
			text,
			src,
		};
	},
	setup() {
		const route = useRoute(); // Get the current route
		let ligaId: any = ref(route.params.ligaId); // Reactive reference to ligaId from route parameters
		return {
			ligaId,
		};
	},
	mounted() {
		var str1 = 'https://datafact.virtualplay.co/html/v3/index.html'; // Base URL for iframe source
		// Determine language based on appComponent's lngProd property
		if (this.appComponent.lngProd == 'es') {
			this.language = 'es_LA'; // Set language to Spanish
		} else if (this.appComponent.lngProd == 'en') {
			this.language = 'en_US'; // Set language to English
		} else if (this.appComponent.lngProd == 'pt') {
			this.language = 'pt_BR'; // Set language to Portuguese
		}
		// Construct the iframe source URL with channel and language parameters
		this.src = str1 + '?channel=' + this.ligaId + '&lang=' + this.language;
	},
});
</script>

<template>
	<!-- Main container for statistics display -->
	<div class="container-stats">
		<!-- Text content displayed as HTML -->
		<div class="text" v-html="text"></div>
		<!-- Button to toggle visibility of statistics -->
		<div class="button-show">
			<a @click="stats = !stats"
				><i class="fa fa-eye"></i> Ver Estadísticas</a
			>
		</div>
	</div>
	<!-- Statistics section, shown based on the 'stats' state -->
	<div class="stats" v-show="stats == true">
		<!-- Iframe for displaying external content -->
		<iframe
			class="gamecast"
			style="border: none; overflow: hidden; height: 2784px"
			:src="src"
			width="100%"
			scrolling="no"
			id="iFrameResizer1"
		></iframe>
	</div>
</template>

<style scoped>
/* Styles for the main container of statistics */
.container-stats {
	width: 80%; /* Set width to 80% of the parent */
	max-width: 1028px; /* Maximum width of the container */
	text-align: center; /* Center text alignment */
	margin: 0 auto; /* Center the container horizontally */
	padding: 25px; /* Padding around the container */
}

/* Styles for the button container */
.button-show {
	padding: 15px; /* Padding around the button */
}

/* Styles for the button link */
.button-show a {
	background: #b48500; /* Background color of the button */
	color: white; /* Text color */
	padding: 10px 20px; /* Padding inside the button */
	display: block; /* Display as block element */
	width: 180px; /* Fixed width for the button */
	margin: 0 auto; /* Center the button horizontally */
	font-weight: bold; /* Bold text */
}

/* Styles for the statistics section */
.stats {
	background: #f2f2f2; /* Background color */
	padding-bottom: 50px; /* Bottom padding */
	padding-top: 30px; /* Top padding */
}

/* Styles for the text content */
.text {
	background: transparent; /* Transparent background */
	color: #474747; /* Text color */
	padding: 15px 20px; /* Padding around the text */
	border-radius: 10px; /* Rounded corners */
}

/* Responsive styles for smaller screens */
@media screen and (max-width: 730px) {
	.container-stats {
		width: 100%; /* Full width on small screens */
		padding: 15px; /* Reduced padding */
	}
}
</style>

<!-- FILE DOCUMENTED -->
