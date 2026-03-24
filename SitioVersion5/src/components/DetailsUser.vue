<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	// Component data function
	data() {
		let config = this.$config(); // Retrieves the configuration object
		let appComponent: any = this.$appComponent; // Retrieves the application component
		let flagInfoUser = false; // Flag to control the visibility of user info modal
		return {
			config,
			appComponent,
			flagInfoUser,
		};
	},
	methods: {
		// Method to close the modal and navigate to a specified path
		closeModalDetails(path) {
			this.$router.push(path); // Navigates to the given path
			this.flagInfoUser = false; // Hides the user info modal
		},
	},
});
</script>
<template>
	<section>
		<!-- User detail trigger section -->
		<div
			id="accion_detalleusuario"
			class="flex-none"
			data-analytics-label="header:user-info"
			:data-analytics-context="`component:DetailsUser|layout:layout-${config.layout}`"
			@click="flagInfoUser = true"
		>
			<label class="cursor-pointer flex items-center justify-center text-neutral">
				<font-awesome-icon
					:class="
						config.layout != undefined &&
						config.layout != 4 &&
						config.layout != 5
							? 'h-9 sm:h-7 mr-1'
							: 'h-6 mx-2'
					"
					size="1x"
					icon="fa-solid fa-user"
				/>
				<!-- Displays user name and ID -->
				<span class="hidden md:inline" >
					{{ appComponent.session.nombre }} - No.
					{{ appComponent.session.usuario }}
				</span>
			</label>
		</div>

		<!-- Modal for user details -->
		<div class="modal detalle-usuario items-center" v-if="flagInfoUser">
			<div
				class="modal-box rounded-2xl text-neutral relative flex justify-center items-center flex-col text-center bg-base-200"
			>
				<!-- Closes modal on click -->
				<label
					for="my-modal-3"
					@click="flagInfoUser = false"
					class="absolute right-2 top-2 cursor-pointer text-right block text-neutral text-xl"
				>
					<font-awesome-icon
						class="icon-cross"
						icon="fa-solid fa-close"
					/>
				</label>
				<div class="usuario-pais-detaller">
					<font-awesome-icon
						icon="fa-solid fa-user"
						size="2x"
						class="mr-3"
					/>
					{{ appComponent.session.nombre }} - No.
					{{ appComponent.session.usuario }}
					<div class="usuario-pais-detaller mt-3">
						<!-- Displays country flag -->
						<span
							:class="'country-flags ' + appComponent.country"
						></span>
						<!-- Displays country name -->
						<span class="text-neutral">{{ appComponent.session.pais_nom }}</span>
					</div>
					<div
						class="usuario-pais-detaller"
						v-if="
							config.header != undefined &&
							config.header.buttonsDetails != undefined &&
							config.header.buttonsDetails
						"
					>
						<!-- Buttons for user actions -->
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="
								closeModalDetails(
									'/consulta/consulta_tickets_online'
								)
							"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Mis Apuestas') }}</label
								>
							</a>
						</button>
						<!-- Navigates to deposit page -->
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="closeModalDetails('/gestion/deposito')"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Depositar') }}</label
								>
							</a>
						</button>
						<!-- Navigates to withdrawal page -->
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="closeModalDetails('/gestion/cuenta_cobro')"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Retirar') }}</label
								>
							</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
.country-flags {
	width: 16px; /* Width of the country flag */
	height: 10px; /* Height of the country flag */
}
</style>

<!-- FILE DOCUMENTED -->
