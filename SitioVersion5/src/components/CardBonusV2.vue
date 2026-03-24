<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component instance.
 */
export default defineComponent({
	// Component props definition
	props: {
		/**
		 * Bonus object passed to the component.
		 * @type {Object}
		 */
		bonus: Object,
	},

	/**
	 * Component data function.
	 * @returns {Object} The data properties of the component.
	 */
	data: function () {
		// Retrieve configuration settings
		let config = this.$config();

		/**
		 * Indicates whether the modal is open.
		 * @type {boolean}
		 */
		let openModal: boolean = false;

		/**
		 * Reference to the application component.
		 * @type {any}
		 */
		let appComponent: any = this.$appComponent;

		// Return data properties
		return {
			openModal,
			config,
			appComponent,
		};
	},
});
</script>
<template>
	<!-- Modal container that appears when openModal is true -->
	<div class="modal z-[992] in bg-black/40" v-if="openModal">
		<!-- Inner container for modal content with dynamic background and border based on layout -->
		<div
			:class="
				config.layout == 3
					? 'bg-secondary border-[#b1b8e2]/20'
					: 'bg-white border-primary-content'
			"
			class="container-generalm rounded-2xl border-solid border-1 py-10 px-10 md:px-20 flex flex-col gap-y-6 justify-center items-center relative overflow-hidden"
		>
			<!-- Close button to hide the modal -->
			<label
				@click="openModal = false"
				class="close-btn btn btn-sm btn-circle drop-shadow-[0px_2px_2px_black] bg-gradient-to-b from-[#c21c2d] to-[#7b0713] cursor-pointer absolute font-poppinssb border-solid border-2 border-[#be2323] text-lg top-2 right-4 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
				>✕</label
			>
			<!-- Title of the modal with dynamic text color based on layout -->
			<h3
				:class="
					config.layout == 3 ? 'text-neutral' : 'text-neutral-content'
				"
				class="text-center uppercase text-xl font-poppinssb flex items-center justify-center gap-x-2"
			>
				{{ $t('CONDICIONES') }}
				<!-- Exclamation mark icon with dynamic border color -->
				<span
					:class="
						config.layout == 3
							? 'border-neutral'
							: 'border-neutral-content'
					"
					class="border-solid border-2 w-7 h-7 rounded-full flex justify-center items-center"
					>!</span
				>
			</h3>
			<!-- List of conditions related to the bonus -->
			<ul class="flex flex-col justify-center items-center gap-y-1">
				<!-- Minimum bet amount condition -->
				<li
					v-if="
						bonus?.minimo_apuesta != undefined &&
						bonus?.minimo_apuesta != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Mínimo valor de apuesta: ') }}
					{{ bonus?.minimo_apuesta }}
					{{ appComponent.session.moneda }}
				</li>
				<!-- Minimum quota condition -->
				<li
					v-if="
						bonus?.minimo_cuota != undefined &&
						bonus?.minimo_cuota != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Mínima cantidad de cuota: ') }}
					{{ bonus?.minimo_cuota }}
				</li>
				<!-- Minimum selections condition -->
				<li
					v-if="
						bonus?.minimo_select != undefined &&
						bonus?.minimo_select != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Mínima cantidad de selecciones: ') }}
					{{ bonus?.minimo_select }}
				</li>
				<!-- Minimum total quota condition -->
				<li
					v-if="
						bonus?.minimo_total != undefined &&
						bonus?.minimo_total != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Mínima cantidad de cuota total: ') }}
					{{ bonus?.minimo_total }}
				</li>
				<!-- Bet type condition -->
				<li
					v-if="
						bonus?.tipo_apuesta != undefined &&
						bonus?.tipo_apuesta != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm mt-5"
				>
					{{ $t('Tipo de apuesta: ') }} {{ bonus?.tipo_apuesta }}
				</li>
				<!-- Bonus value condition -->
				<li
					:class="[
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content',
						{
							'mt-5':
								bonus?.tipo_apuesta == undefined ||
								bonus?.tipo_apuesta == '',
						},
					]"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Valor del bono: ') }} {{ bonus?.valor_bono }}
				</li>
				<!-- Minimum bonus value condition -->
				<li
					v-if="
						bonus?.valor_bono_minimo != undefined &&
						bonus?.valor_bono_minimo != ''
					"
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Valor mínimo de bono:') }}
					{{ bonus?.valor_bono_minimo }}
				</li>
				<!-- Expiration date condition -->
				<li
					:class="
						config.layout == 3
							? 'text-neutral'
							: 'text-neutral-content'
					"
					class="text-center font-poppinssl max-w-sm"
				>
					{{ $t('Expira:') }} {{ bonus?.expireDate }}
				</li>
			</ul>
		</div>
	</div>
	<!-- Card container for displaying bonus information -->
	<div
		:class="
			config.layout == 3
				? 'from-accent to-secondary'
				: 'from-neutral to-neutral/80'
		"
		class="flex flex-col justify-center hover:scale-95 md:hover:scale-105 transition-all hover:border-primary-content ease-in-out items-center gap-y-2 h-auto group bg-gradient-to-b shadow-[inset_0px_-15px_0px_#0000009c] rounded-2xl border-solid border-1 border-neutral py-8 container-card"
	>
		<!-- Image representing the bonus type -->
		<img
			:src="
				bonus?.type != undefined && bonus?.type == 'FreeBet'
					? 'https://images.virtualsoft.tech/m/msj0212T1705424080.png'
					: 'https://images.virtualsoft.tech/m/msj0212T1704227995.png'
			"
			:class="bonus?.porcent == 100 ? 'opengif' : 'gif'"
			width="60"
			height="60"
			alt=""
		/>
		<!-- Bonus name display -->
		<p
			:class="config.layout == 3 ? 'text-neutral' : 'text-neutral-content'"
			class="font-poppinssb text-lg w-11/12 text-center my-2"
		>
			{{ bonus?.name }}
		</p>
		<!-- Progress bar container for bonus progress -->
		<span
			class="w-10/12 h-8 box-back rounded-lg border-solid border-2 border-[#b1b8e2] group-hover:border-primary-content shadow-[inset_0px_-10px_11px_2px_#000000c9] relative"
		>
			<!-- Progress bar fill based on bonus percentage -->
			<span
				:style="{ width: bonus?.porcent + '%' }"
				:class="
					bonus?.porcent == 100
						? 'animation-finish'
						: 'animation-loading'
				"
				class="bg-gradient-to-b from-[#FACC4D] to-[#E58008] h-full saturate-150 z-1 rounded-md absolute after:absolute after:h-1/2 after:rounded-md after:top-[2px] after:w-10/12 after:bg-gradient-to-b after:from-neutral after:to-transparent after:left-1/2 after:-translate-x-1/2 after:opacity-75"
			></span>
		</span>
		<!-- Bonus percentage display -->
		<p
			v-if="bonus?.porcent"
			class="font-poppinssb"
			:class="
				config.layout != undefined && config.layout == 3
					? ' text-primary-content'
					: 'text-black'
			"
		>
			{{ bonus?.porcent }} %
		</p>
		<!-- Bonus progress text display -->
		<p
			:class="config.layout == 3 ? 'text-neutral' : 'text-neutral-content'"
			class="font-poppinssl text-md w-11/12 text-center leading-5 my-3"
		>
			{{ bonus?.progress_text }}
		</p>
		<!-- Button to view more details about the bonus -->
		<button
			@click="openModal = true"
			class="bg-gradient-to-b from-[#FACC4D] to-[#E58008] hover:from-[#FACC4D] hover:to-[#FACC4D] text-neutral-content px-9 py-1 rounded-full border-solid border-1 border-neutral shadow-[inset_0px_-4px_0px_#0000004a] hover:scale-105 transition-all ease-in-out"
		>
			{{ $t('Ver más') }}
		</button>
	</div>
</template>
<style scoped>
/* Animation for loading effect with infinite loop */
.animation-loading {
	animation: loading 2s infinite linear; /* Applies loading animation */
}

/* Keyframes for loading animation */
@keyframes loading {
	0% {
		opacity: 0.5; /* Initial opacity */
	}
	50% {
		opacity: 0.9; /* Midway opacity */
	}
	100% {
		opacity: 0.5; /* Final opacity */
	}
}

/* Animation for finish effect with infinite loop */
.animation-finish {
	animation: finish 3s infinite linear; /* Applies finish animation */
}

/* Keyframes for finish animation */
@keyframes finish {
	0% {
		box-shadow: 0px 0px 10px 2px #fac04d; /* Initial box shadow */
	}
	50% {
		box-shadow: 0px 0px 10px 2px transparent; /* Midway box shadow */
	}
	100% {
		box-shadow: 0px 0px 10px 2px #fac04d; /* Final box shadow */
	}
}

/* Background styling for box with gradient effect */
.box-back {
	background-image: linear-gradient(
		-45deg,
		rgba(255, 255, 255, 0.2) 25%,
		/* Gradient color stop */ transparent 25%,
		/* Transparent color stop */ transparent 50%,
		/* Transparent color stop */ rgba(255, 255, 255, 0.2) 50%,
		/* Gradient color stop */ rgba(255, 255, 255, 0.2) 75%,
		/* Gradient color stop */ transparent 75%,
		/* Transparent color stop */ transparent /* Final transparent color */
	);
	background-size: 10px 10px; /* Size of the background pattern */
}

/* Animation for gif on hover effect */
.container-card:hover .gif {
	animation: animation-gif 1s ease-in-out infinite; /* Applies gif animation on hover */
}

/* Keyframes for gif animation */
@keyframes animation-gif {
	0% {
		transform: rotate(0deg); /* Initial rotation */
	}
	30% {
		transform: rotate(-20deg); /* Rotate left */
	}
	60% {
		transform: rotate(20deg); /* Rotate right */
	}
	100% {
		transform: rotate(0deg); /* Return to initial rotation */
	}
}

/* Animation for opening gif on hover effect */
.container-card:hover .opengif {
	animation: animation-open 1s ease-in-out infinite; /* Applies open animation on hover */
}

/* Keyframes for open animation */
@keyframes animation-open {
	0% {
		scale: 1; /* Initial scale */
	}
	50% {
		scale: 0.9; /* Scale down */
	}
	100% {
		scale: 1; /* Return to initial scale */
	}
}
</style>

<!-- FILE DOCUMENTED -->
