<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the main view.
 * This component retrieves configuration data and provides it to the template.
 */
export default defineComponent({
	/**
	 * Data function that initializes the component's state.
	 * @returns {Object} The component's data object containing configuration.
	 */
	data: function () {
		let config = this.$config(); // Retrieve configuration from the global context
		return {
			config, // Expose the configuration to the template
		};
	},
});
</script>

<template>
	<!-- Main container for the component with a background image and flex layout -->
	<div
		class="container-general h-[1000px] lg:h-screen lg:min-h-[700px] lg:max-h-[800px] bg-cover bg-no-repeat bg-center flex flex-col overflow-hidden"
		:style="{
			backgroundImage:
				'url(' +
				$t('https://images.virtualsoft.tech/m/msjT1683210609.png') +
				')',
		}"
	>
		<!-- Text container for the main message and button -->
		<div
			class="text-container flex w-full lg:w-3/5 h-full lg:justify-center items-center lg:pl-60 flex-col gap-y-8 lg:gap-y-16 pt-0 lg:pt-[108px] content-center"
		>
			<!-- Header message displayed to the user -->
			<h4 class="text-white text-3xl lg:text-6xl text-center p-8 lg:p-0">
				{{ $t('¡Gracias por registrarte!') }}
				<!-- Thank you message -->
			</h4>
			<!-- Button to navigate to the home page -->
			<RouterLink to="/home"
				><button
					class="bg-black text-white btn text-xl border-none rounded-full px-8 capitalize font-light"
					to="/home"
				>
					{{ $t('Continúa navegando') }}
					<!-- Continue browsing button -->
				</button></RouterLink
			>
			<!-- Disclaimer text regarding responsible gaming -->
			<p class="text-white break-words text-xs text-center p-9">
				{{
					$t(
						'WWW.GANGABET.MX Operada en México por producciones móviles S.A. de C.V. Titular del permiso DGAJS/SCEVF/P-06/2005-TER, en unión de Unocapali La Paz Operadora S.A. de C.V., de conformidad con los oficios DGJS/1580/2021, DGJS/DCRCA/2772/2021. Juegos prohibidos para menores de edad, juegue responsablemente, no olvide que el principal propósito es la recreación, diversión y esparcimiento.'
					)
				}}
			</p>
		</div>
		<!-- Footer container with links and images -->
		<div
			class="footer-container w-full bg-[#242E41] h-1/4 relative flex justify-start items-center"
		>
			<!-- Flex container for footer content -->
			<div
				class="w-full flex flex-col md:flex-row justify-center lg:justify-start lg:pl-28 xl:pl-72 items-center gap-y-8 md:gap-y-0 gap-x-5 lg:gap-x-24"
			>
				<!-- Security and privacy section -->
				<div class="flex justify-center items-center flex-col gap-y-3">
					<h5 class="text-[#9CC73B] text-sm font-bold text-center">
						{{ $t('Seguridad y privacidad') }}
						<!-- Security and privacy header -->
					</h5>
					<!-- Links related to privacy and responsible gaming -->
					<div
						class="text-white text-center text-xs p-2 leading-5 md:max-w-[185px]"
					>
						<RouterLink
							to="/politica-de-privacidad/politica-de-privacidad"
							>{{ $t('Política de Privacidad') }}</RouterLink
						><br />
						<RouterLink to="/juego-responsable">{{
							$t('Juego Responsable')
						}}</RouterLink
						><br />
						<RouterLink to="/terminosycondiciones">{{
							$t('Términos y Condiciones')
						}}</RouterLink
						><br />
						<RouterLink
							to="/terminosycondiciones/recargas-retiros-bonos"
							>{{
								$t('Recargas, Retiros y Promociones')
							}}</RouterLink
						><br />
					</div>
				</div>
				<!-- Image displayed in the footer -->
				<img
					:src="
						$t(
							'https://images.virtualsoft.tech/m/msjT1683216358.png'
						)
					"
					alt=""
					width="180"
					class="w-[120px] md:w-[180px] p-2"
				/>
			</div>
			<!-- Additional image positioned at the bottom right -->
			<img
				:src="
					$t('https://images.virtualsoft.tech/m/msjT1683212061.png')
				"
				alt=""
				width="550"
				height="500"
				class="w-[400px] lg:max-w-[600px] lg:w-[500px] xl:w-[600px] absolute bottom-[194px] lg:bottom-[-5px] right-[6%] md:right-[24%] lg:right-[6%]"
			/>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->
