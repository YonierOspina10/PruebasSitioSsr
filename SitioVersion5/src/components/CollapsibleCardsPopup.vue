<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { useRoute } from 'vue-router'; // Importing useRoute for accessing route information
import { ref } from 'vue'; // Importing ref for creating reactive references

export default defineComponent({
	props: {
		data: Object, // Prop to receive data as an object
	},
	data: function () {
		let data: any = this.data; // Storing the received data prop
		let config = this.$config(); // Accessing the configuration object
		let appComponent: any = this.$appComponent; // Accessing the app component
		let TERMINOSYCONDICIONES: any = []; // Initializing an empty array for terms and conditions
		const route = useRoute(); // Getting the current route
		let path: any = ref(route).value.path.split('/')[1]; // Extracting the second segment of the route path
		return {
			data,
			config,
			appComponent,
			TERMINOSYCONDICIONES,
			route,
			path,
			sectionId: '', // Initializing sectionId to track the selected section
		};
	},
	methods: {
		scrollT(e) {
			const scroll: any = window.document.getElementById('popUpRegister'); // Getting the scrollable element
			let y: any | null = (window as any).document.getElementById(
				'OpenCard'
			).clientHeight; // Getting the height of the OpenCard element
			console.log(e); // Logging the event for debugging
			if (this.config.mobileL == 1) {
				// Checking if the layout is mobile
				scroll.scrollTop = y; // Scrolling to the height of OpenCard
			}
		},
	},
});
</script>

<template>
	<div class="Box TextBox NoHeadBox InfoBox">
		<!-- Main container for the component -->
		<div class="BoxContent InfoBoxContent w-full lg:w-10/12 mx-auto">
			<!-- Content container with responsive width -->
			<div class="TermsList HelpList md:w-2/6 w-full float-left md:px-8">
				<!-- Container for the list of terms -->
				<!-- Ordered list for terms -->
				<ol
					id="OpenCard"
					class="MenuList m-0 overflow-visible p-0 shadow-none box-border L"
				>
					<!-- List item for each term -->
					<li
						class="btn text-left inline-block w-full mb-1.5 h-auto shadow-md bg-base-400"
						:class="
							config.layout != undefined && config.layout == 3
								? 'text-neutral'
                                : 'text-neutral'
						"
						v-for="termino in data.filter(
							(item) => item !== 'null'
						)"
						@click="scrollT($event)"
					>
						<a
							:id="termino.order"
							class="MenuLink A Container"
							data-use="preload"
							@click="sectionId = termino.order"
						>
							<span class="PageName N">{{
								$t(termino.title)
							}}</span>
						</a>
					</li>
				</ol>
			</div>

			<!-- Container for term content -->
			<div
				class="BoxContent TermsContentBox HelpContentBox md:w-4/6 w-full float-left md:px-8 bg-base-300"
				v-for="termino in data"
			>
				<!-- Conditional rendering based on selected section -->
				<div v-if="sectionId == termino.order">
					<div
						v-for="pane in termino.parent.filter(
							(item) => item !== 'null'
						)"
						tabindex="0"
						class="shadow-md collapse w-full rounded-box border border-neutral collapse-plus mb-3 bg-base-400 text-neutral"

					>
						<!-- Checkbox for collapsible functionality -->
						<input type="checkbox" class="w-full" :checked="termino.parent[0] === pane" />
						<!-- Title of the collapsible section -->
						<div class="collapse-title text-basefont-medium">
							{{ $t(pane.title) }}
							<!-- Translated title of the pane -->
						</div>
						<!-- Content area of the collapsible section -->
						<div class="collapse-content overflow-auto">
							<div
								class="video-youtube text-neutral"
								v-html="$t(pane.content)"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->
