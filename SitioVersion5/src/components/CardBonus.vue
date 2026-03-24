<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for displaying bonus information.
 */
export default defineComponent({
	// Component props definition
	props: {
		// Bonus object containing various properties related to the bonus
		bonus: Object,
	},
});
</script>

<template>
	<!-- Main container with gradient border and flex layout -->
	<div
		class="gradient-border flex flex-col justify-center items-center p-5 gap-2"
	>
		<!-- Container for images and bonus value display -->
		<div class="w-40 relative flex justify-center items-center">
			<!-- Main image for the bonus -->
			<img
				src="https://images.virtualsoft.tech/m/msjT1682713611.png"
				class=""
			/>
			<!-- Overlay image positioned absolutely -->
			<img
				src="https://images.virtualsoft.tech/m/msjT1682713760.png"
				class="absolute -right-5 top-[65px] w-20"
			/>
			<!-- Displaying the bonus value -->
			<span
				class="text-[#555555] h-6 min-w-[40px] font-bold text-lg absolute left-28 top-[95px] bg-white rounded-lg flex justify-center items-center"
				>{{ bonus?.valor_bono }}</span
			>
		</div>
		<!-- Title displaying the bonus name -->
		<h2 class="text-2xl text-center text-[#555555] font-bold mt-4">
			{{ bonus?.name }}
		</h2>
		<!-- Progress meter for the bonus -->
		<div class="meter w-11/12">
			<!-- Dynamic width based on bonus percentage -->
			<span :style="{ width: bonus?.porcent + '%' }"></span>
			<!-- Displaying the percentage value -->
			<h6 class="porcent">{{ bonus?.porcent }}%</h6>
		</div>
		<!-- Text displaying progress information -->
		<p class="text-[#555555] text-lg text-center mt-4">
			{{ bonus?.progress_text }}
		</p>
		<!-- Expiration date display -->
		<p
			class="bg-white rounded-full h-10 text-[#555555] text-xs text-center font-bold p-5 flex items-center mt-2"
		>
			{{ $t('Expira:') }} {{ bonus?.expireDate }}
		</p>
	</div>
</template>

<style scoped>
/* Styles for the progress meter container */
.meter {
	box-sizing: content-box; /* Ensures padding does not affect total width */
	height: 20px; /* Fixed height for the meter */
	position: relative; /* Positioning context for child elements */
	margin: 10px; /* Margin around the meter */
	background: white; /* Background color of the meter */
	border: 2px solid green; /* Border styling */
	border-radius: 25px; /* Rounded corners */
	padding: 2px; /* Inner padding */
	box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3); /* Inner shadow effect */
}

/* Styles for the progress fill of the meter */
.meter > span {
	display: block; /* Block display for the fill */
	height: 100%; /* Full height of the meter */
	border-top-right-radius: 8px; /* Rounded top right corner */
	border-bottom-right-radius: 8px; /* Rounded bottom right corner */
	border-top-left-radius: 20px; /* Rounded top left corner */
	border-bottom-left-radius: 20px; /* Rounded bottom left corner */
	background-color: #2a8601; /* Fill color */
	background-image: linear-gradient(
		center bottom,
		#2a8601,
		#2a8601
	); /* Gradient effect */
	box-shadow:
		inset 0 2px 9px rgba(255, 255, 255, 0.3),
		/* Inner shadow */ inset 0 -2px 6px rgba(0, 0, 0, 0.4); /* Inner shadow */
	position: relative; /* Positioning context for child elements */
	overflow: hidden; /* Hide overflow */
}

/* Styles for the animated effect on the meter fill */
.meter > span:after,
.animate > span > span {
	content: ''; /* Required for pseudo-elements */
	position: absolute; /* Absolute positioning */
	top: 0; /* Align to top */
	left: 0; /* Align to left */
	bottom: 0; /* Align to bottom */
	right: 0; /* Align to right */
	background-image: linear-gradient(
		-45deg,
		rgba(255, 255, 255, 0.2) 25%,
		/* Light gradient */ transparent 25%,
		/* Transparent section */ transparent 50%,
		/* Transparent section */ rgba(255, 255, 255, 0.2) 50%,
		/* Light gradient */ rgba(255, 255, 255, 0.2) 75%,
		/* Light gradient */ transparent 75%,
		/* Transparent section */ transparent /* Transparent section */
	);
	z-index: 1; /* Layering order */
	background-size: 50px 50px; /* Size of the gradient pattern */
	animation: move 2s linear infinite; /* Animation effect */
	border-top-right-radius: 8px; /* Rounded top right corner */
	border-bottom-right-radius: 8px; /* Rounded bottom right corner */
	border-top-left-radius: 20px; /* Rounded top left corner */
	border-bottom-left-radius: 20px; /* Rounded bottom left corner */
	overflow: hidden; /* Hide overflow */
}

/* Styles for the percentage text display */
.porcent {
	position: inherit; /* Inherit position from parent */
	left: 45%; /* Center horizontally */
	font-size: 18px; /* Font size */
	color: green; /* Text color */
	top: 8px; /* Position from top */
}
</style>

<!-- FILE DOCUMENTED -->
