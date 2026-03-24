<script>
export default {
	name: 'VideoPlayer', // Component name
	data: function () {
		return {
			urlVideoPlayer: '', // Data property to hold the video URL
			CanvasPlayer: null, // Will hold the dynamically imported component (if available)
			useCanvasPlayer: false,
		};
	},
	props: {
		url: {
			type: String, // Prop type definition
			default: '', // Default value for the prop
		},
	},
	mounted: async function () {
		this.urlVideoPlayer = this.url; // Setting the video URL when the component is mounted
		// Solo intentar en cliente
		if (typeof window === 'undefined') return;

		// Construir el nombre del paquete sin exponer la cadena literal para el bundler
		const pkgParts = ['vue3', 'canvas', 'video', 'player'];
		const pkg = pkgParts.join('-');

		try {
			// Evitar que el bundler analice la llamada import estática usando una función dinámica
			// new Function evita que herramientas como Vite/rollup detecten el specifier en build
			const dynamicImport = new Function('id', 'return import(id)');
			const mod = await dynamicImport(pkg);
			// intentar importar también estilos si existen (en runtime)
			try {
				await dynamicImport(pkg + '/dist/style.css');
			} catch (cssErr) {
				console.warn('No se pudo cargar el CSS de ' + pkg + ':', cssErr);
			}
			this.CanvasPlayer = mod.default || mod;
			this.useCanvasPlayer = true;
		} catch (err) {
			// Si falla la importación en runtime, usamos fallback a <video>
			console.warn(pkg + ' no está disponible en runtime, usando <video> nativo como fallback.', err);
		}
	},
};
</script>

<template>
	<!-- Si el componente de canvas está disponible, renderizarlo; si no, usar <video> nativo -->
	<component
		v-if="useCanvasPlayer && CanvasPlayer"
		:is="CanvasPlayer"
		class="block w-full md:w-3/4 mt-6 mb-6 ml-auto mr-auto rounded-2xl"
		:src="urlVideoPlayer"
		:muted="false"
		:autoplay="true"
		:loop="false"
		:range="[0, 0]"
		:fps="0"
		:type="'overlay'"
		:messageTime="0"
		:preview="true"
		:darkMode="true"
	></component>

	<video v-else class="block w-full md:w-3/4 mt-6 mb-6 ml-auto mr-auto rounded-2xl" controls :src="urlVideoPlayer">
		Tu navegador no soporta el elemento <code>video</code>.
	</video>
</template>

<style scoped>
@keyframes initAnimation-76db {
	0% {
		transform: rotateY(0deg); /* Initial rotation state */
	}
	100% {
		transform: rotateY(-30deg); /* Final rotation state */
	}
}

.book-container-76db .book {
	width: 200px; /* Width of the book element */
	height: 319px; /* Height of the book element */
	position: relative; /* Positioning context for child elements */
	transform-style: preserve-3d; /* Enable 3D transformations */
	transform: rotateY(-30deg); /* Initial 3D rotation */
	transition: transform 1s ease; /* Transition effect for transformations */
	animation: 1s ease 0s 1 initAnimation-76db; /* Animation on load */
}

.book-container-76db .book:hover {
	transform: rotateY(0deg); /* Rotation effect on hover */
}

.book-container-76db .book > :first-child {
	position: absolute; /* Positioning for the first child element */
	top: 0; /* Align to the top */
	left: 0; /* Align to the left */
	width: 200px; /* Width of the child element */
	height: 319px; /* Height of the child element */
	transform: translateZ(25px); /* Move forward in 3D space */
	background-color: #01060f; /* Background color */
	border-radius: 0 2px 2px 0; /* Rounded corners */
	box-shadow: 5px 5px 20px #aaaaaa; /* Shadow effect */
	background-color: #01060f; /* Background color (duplicate) */
}

.book-container-76db .book::before {
	position: absolute; /* Positioning for the pseudo-element */
	content: ' '; /* Empty content for the pseudo-element */
	left: 0; /* Align to the left */
	top: 3px; /* Offset from the top */
	width: 48px; /* Width of the pseudo-element */
	height: 313px; /* Height of the pseudo-element */
	transform: translateX(172px) rotateY(90deg); /* Position and rotate in 3D space */
	background: linear-gradient(
		/* Gradient background */ 90deg,
		#fff 0%,
		#f9f9f9 5%,
		#fff 10%,
		#f9f9f9 15%,
		#fff 20%,
		#f9f9f9 25%,
		#fff 30%,
		#f9f9f9 35%,
		#fff 40%,
		#f9f9f9 45%,
		#fff 50%,
		#f9f9f9 55%,
		#fff 60%,
		#f9f9f9 65%,
		#fff 70%,
		#f9f9f9 75%,
		#fff 80%,
		#f9f9f9 85%,
		#fff 90%,
		#f9f9f9 95%,
		#fff 100%
	);
}

.book-container-76db .book::after {
	position: absolute; /* Positioning for the pseudo-element */
	top: 0; /* Align to the top */
	left: 0; /* Align to the left */
	content: ' '; /* Empty content for the pseudo-element */
	width: 200px; /* Width of the pseudo-element */
	height: 319px; /* Height of the pseudo-element */
	transform: translateZ(-25px); /* Move backward in 3D space */
	background-color: #01060f; /* Background color */
	border-radius: 0 2px 2px 0; /* Rounded corners */
	box-shadow: -10px 0 50px 10px #aaaaaa; /* Shadow effect */
}
</style>

<!-- FILE DOCUMENTED -->
