<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for data requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
declare var google; // Declaring the google variable for Google Maps API

export default defineComponent({
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Storing the application component reference
		let country: string = ''; // Variable to hold the selected country
		let departments: object = {}; // Object to hold department data
		let departmentsList: any = []; // Array to hold the list of departments
		let points: any = []; // Array to hold points of interest
		let departmentSelect: number = 0; // Variable to hold the selected department ID
		let CodCountry: number = 0; // Variable to hold the country code
		let CodDep: number = 0; // Variable to hold the department code
		let Zoom: number = 6; // Default zoom level for the map
		let lat: any = 0; // Latitude for map center
		let lng: any = 0; // Longitude for map center
		let mapRef = null; // Reference to the map object
		let script = document.createElement('script'); // Creating a script element for Google Maps API
		script.async = false; // Setting script loading to synchronous
		script.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyAfxXbhLUsWNcpp4X1n5aj1UiH8ZQEVRcI'; // Google Maps API script source
		let activeLocal = false; // Flag to indicate if local data is active
		return {
			config,
			appComponent,
			country,
			departments,
			departmentsList,
			points,
			departmentSelect,
			CodCountry,
			CodDep,
			Zoom,
			lat,
			lng,
			mapRef,
			script,
			activeLocal,
		};
	},
	created() {
		this.script.addEventListener('load', (event) => {
			// Adding event listener for script load
			this.initMap(); // Initializing the map once the script is loaded
		});
		document.head.appendChild(this.script); // Appending the script to the document head
	},
	methods: {
		initMap() {
			if (this.points.length == 0) {
				// Checking if points array is empty
				apiService
					.request('get_points', {
						// Making API request to get points
						country: this.appComponent.country, // Sending the selected country
					})
					.then((response: any) => {
						// Handling the API response
						if (response.data.length > 0) {
							// If data is returned
							this.points = response.data; // Storing points data
							this.departmentsList = response.data; // Storing departments list
							this.departments = this.points[0]; // Setting the first department as default
							this.departmentSelect = this.points[0].Id; // Setting the selected department ID
							this.activeLocal = true; // Activating local data
							this.initMapEnd(); // Finalizing map initialization
						} else {
							this.activeLocal = false; // Deactivating local data if no points found
							this.initMapEnd(); // Finalizing map initialization
						}
					});
			}
		},
		initMapEnd() {
			var prev_infowindow: any = false; // Variable to hold the previous info window
			var iconBase =
				this.appComponent.config.iconMap != undefined
					? this.appComponent.config.iconMap // Getting the icon base from config
					: '';
			if (this.Zoom !== 6 || true) {
				// Checking if zoom level is not default
				var center = this.departments; // Setting the map center to the selected department
				var mapOptions = {
					// Default map options
					lat: 23.634501, // Latitude for map center
					lng: -102.552784, // Longitude for map center
				};
				if (this.activeLocal != false) {
					// If local data is active
					var map = new google.maps.Map( // Creating a new Google Map instance
						document.getElementById('map'), // Targeting the map container
						{
							zoom: this.Zoom, // Setting the zoom level
							center: center, // Setting the center of the map
						}
					);
					for (var j = 0; j < this.points.length; j++) {
						// Looping through points
						for (var i = 0; i < this.points[j].Points.length; i++) {
							// Looping through each point's coordinates
							new google.maps.Marker({
								// Creating a new marker for each point
								position: this.points[j].Points[i], // Setting the marker position
								map: map, // Associating the marker with the map
								title: this.points[j].Points[i].PuntoDeVenta, // Setting the marker title
								PuntoDeVenta:
									this.points[j].Points[i].PuntoDeVenta, // Custom property for point of sale
								Direccion: this.points[j].Points[i].Direccion, // Custom property for address
								Telefono: this.points[j].Points[i].Telefono, // Custom property for phone number
								Indicaciones:
									this.points[j].Points[i].Indicaciones, // Custom property for directions
								icon: iconBase, // Setting the marker icon
								vthis: this, // Storing reference to the Vue instance
							}).addListener('click', function (this: any) {
								// Adding click event listener to the marker
								var texto =
									'<p><b> Punto de Venta: </b>' +
									this.PuntoDeVenta +
									'</p><b><p> Dirección: </b>' +
									this.Direccion +
									'</p><b><p> Teléfono: </b>' +
									this.Telefono +
									'</p><b> Indicaciones: </b>' +
									this.Indicaciones; // Constructing the content for the info window
								var infowindow = new google.maps.InfoWindow({
									// Creating a new info window
									content: texto, // Setting the content of the info window
								});
								if (prev_infowindow) {
									// If there is a previous info window
									prev_infowindow.close(); // Close the previous info window
								}
								prev_infowindow = infowindow; // Updating the previous info window reference
								infowindow.open(map, this); // Opening the info window on the map
							});
						}
					}
				} else {
					// If local data is not active
					var map = new google.maps.Map( // Creating a new Google Map instance
						document.getElementById('map'), // Targeting the map container
						{
							zoom: this.Zoom, // Setting the zoom level
							center: mapOptions, // Setting the center of the map
						}
					);
					new google.maps.Marker({
						// Creating a default marker
						map: map, // Associating the marker with the map
					});
				}
			}
		},
		DepSelect() {
			// Method to handle department selection change
			this.departments =
				this.points[
					this.points.findIndex(
						// Finding the selected department in points
						(i: { Id: number }) => i.Id == this.departmentSelect
					)
				];
			this.Zoom = 12; // Updating zoom level for selected department
			this.initMapEnd(); // Finalizing map initialization
		},
	},
});
</script>
<template>
	<!-- Main container for the points of sale section -->
	<section v-if="config.layout != 3" class="container-puntos">
		<!-- Header section with gradient background -->
		<div
			class="int-header h-32 bg-base-200 w-full"
		>
			<div class="flex pt-5 Container ActivePageTitle">
				<h1 class="text-neutral text-3xl font-bold">
					{{ $t('Puntos de venta') }}
					<!-- Title for points of sale -->
				</h1>
			</div>
		</div>
		<!-- Main content area with map and department selection -->
		<div
			class="w-full flex flex-col-reverse lg:flex-row justify-center items-start gap-2"
		>
			<div
				id="map"
				class="w-4/5 m-0 rounded-2xl"
			></div>
			<!-- Department selection form -->
			<form
				class="w-[100vw] lg:w-64 flex flex-col justify-center items-center gap-2 px-4 py-2 rounded-xl text-neutral bg-base-300 border border-solid border-accent"
			>
				<span>{{ $t('Departamento') }}:</span>
				<!-- Label for department selection -->
				<select
					v-model="departmentSelect"
					interface="popover"
					@change="DepSelect()"
					class="bg-input-background rounded-full w-full text-neutral placeholder-input-placeholder"
				>
					<option
						v-for="department in departmentsList"
						:value="department.Id"
						class="text-neutral"
						placeholder="Seleccionar ciudad"
					>
						{{ $t(department.Name) }}
						<!-- Displaying department name -->
					</option>
				</select>
			</form>
		</div>
	</section>
	<!-- Alternative layout for points of sale section -->
	<section
		v-if="config.layout != undefined && config.layout == 3"
		class="w-full h-full flex justify-center items-center bg-base-content"
	>
		<article
			class="w-full max-w-[1300px] flex flex-col justify-center items-center gap-4"
		>
			<h3
				class="in w-full text-neutral text-3xl font-bold text-start pt-4"
			>
				{{ $t('Puntos de venta') }}
				<!-- Title for points of sale -->
			</h3>
			<hr class="w-full border-2 border-neutral-text" />
			<!-- Divider line -->
			<!-- Main content area with map and department selection -->
			<div
				class="w-full flex flex-col-reverse lg:flex-row justify-between items-start gap-2"
			>
				<div id="map" class="w-full m-0 rounded-2xl"></div>
				<!-- Map container -->
				<!-- Department selection form -->
				<form
					class="w-[100vw] lg:w-64 flex flex-col justify-center items-center gap-2 px-4 py-2 rounded-xl text-neutral bg-base-300 border border-solid border-accent"
				>
					<span>{{ $t('Departamento') }}:</span>
					<!-- Label for department selection -->
					<select
						v-model="departmentSelect"
						interface="popover"
						@change="DepSelect()"
						class="bg-transparent rounded-full w-full"
					>
						<option
							v-for="department in departmentsList"
							:value="department.Id"
						>
							{{ $t(department.Name) }}
							<!-- Displaying department name -->
						</option>
					</select>
				</form>
			</div>
		</article>
	</section>
</template>
<style>
#map {
	height: 400px; /* Height of the map */
	width: calc(100% - 248px); /* Width of the map, adjusting for margins */
	margin: 0 10px; /* Horizontal margin */
	margin-top: 10px; /* Top margin */
	margin-right: 10px; /* Right margin */
	display: inline-block; /* Displaying the map as an inline block */
}
</style>

<!-- FILE DOCUMENTED -->
