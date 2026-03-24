<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import { useRoute } from 'vue-router'; // Import the useRoute function for routing

export default defineComponent({
	// Define the Vue component
	data: function () {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Get the application component
		let src: string = ''; // Initialize source URL for iframe
		let virtualesList: any = []; // Initialize list for virtual providers
		let selections: any = {}; // Initialize selections object
		return {
			config,
			appComponent,
			src,
			virtualesList,
			selections,
		};
	},
	setup() {
		const route = useRoute(); // Get the current route
		let GameId: any = ref(route.params.GameId); // Create a reactive reference for GameId
		return {
			GameId,
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		if (
			this.config != undefined &&
			this.config.virtualesList != undefined
		) {
			this.virtualesList = this.config.virtualesList; // Set virtualesList from config
			if (this.GameId != undefined) {
				// Check if GameId is defined
				this.virtualesList.forEach((currentValue) => {
					if (currentValue.id == this.GameId) {
						this.selectProvider(currentValue); // Select provider based on GameId
					}
				});
			} else {
				this.selectProvider(this.virtualesList[0]); // Default to the first provider
			}
		}
	},
	methods: {
		selectProvider(selectProvider) {
			// Method to select a provider
			this.selections.provider = selectProvider.title; // Store selected provider title
			window.history.pushState('', '', '/virtual/' + selectProvider.id); // Update browser history
			var str1 = selectProvider.urlGame + '&'; // Construct base URL for the game
			var src =
				str1 +
				'lang=' +
				this.appComponent.lngProd +
				'&mode=real&partnerid=' +
				this.appComponent.partner +
				'&token=' +
				this.appComponent.tokenUser; // Append parameters to the URL
			if (this.appComponent.mobile == '1') {
				src = src + '&isMobile=true'; // Add mobile flag if applicable
			}
			this.src = src; // Update the source URL for the iframe
		},
	},
});
</script>

<template>
	<!-- Navigation bar for selecting virtual providers -->
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="form-inline mx-auto flex-nowrap scroll-y">
			<ul class="navbar-nav d-inline-block scroll-h">
				<!-- Loop through virtualesList to create navigation items -->
				<li
					v-for="virtuales in virtualesList"
					class="nav-item virt inline-block"
					:class="{ active: selections.provider === virtuales.title }"
				>
					<a class="nav-link" @click="selectProvider(virtuales)">{{
						virtuales.title
					}}</a>
					<!-- Click event to select provider -->
				</li>
			</ul>
		</div>
	</nav>
	<div id="casino-wrapper">
		<div id="casino-content">
			<!-- Iframe to display the selected virtual game -->
			<iframe
				title="Casino virtuales"
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
				:src="src"
				frameborder="0"
				width="100%"
				height="101%"
				scrolling="yes"
				id="frameVirtual"
			></iframe>
		</div>
	</div>
</template>

<style scoped>
/* Styles for virtual provider navigation items */
li.nav-item.virt {
	border: 1px solid #1ca51c; /* Border color */
	padding: 0 15px; /* Padding for spacing */
	margin: 0 3px; /* Margin between items */
	border-radius: 15px; /* Rounded corners */
}
li.nav-item.virt a {
	color: #1ca51c; /* Link color */
}
li.nav-item.virt.active {
	background: #1ca51c; /* Background color for active item */
}
li.nav-item.virt.active a {
	color: white; /* Link color for active item */
	font-weight: bold; /* Bold text for active item */
}
iframe#frameVirtual,
#iFrameResizer1 {
	background: black; /* Background color for iframe */
}
#iFrameResizer1 {
	height: 700px; /* Fixed height for iframe resizer */
}
.scroll-h {
	white-space: nowrap; /* Prevent line breaks */
	-webkit-overflow-scrolling: touch; /* Smooth scrolling on touch devices */
}
.scroll-y {
	overflow-y: hidden; /* Hide vertical overflow */
	overflow-x: scroll; /* Enable horizontal scrolling */
}
.scroll-y::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}
.nav-link {
	display: block; /* Block display for links */
	padding: 0.3rem 1rem; /* Padding for links */
}
.bg-light {
	background-color: #f8f9fa !important; /* Light background color */
}
.navbar {
	position: relative; /* Relative positioning */
	padding: 0.5rem 1rem; /* Padding for navbar */
	display: flex; /* Flexbox layout */
	flex-wrap: wrap; /* Allow wrapping */
	align-items: center; /* Center items vertically */
	justify-content: space-between; /* Space items evenly */
	min-height: auto; /* Minimum height */
}
.form-inline {
	display: flex; /* Flexbox layout for inline form */
	flex-flow: row wrap; /* Allow wrapping */
	align-items: center; /* Center items vertically */
}
</style>

<!-- FILE DOCUMENTED -->
