<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import IconPlay from '@/components/icons/IconPlay.vue'; // Importing the IconPlay component
import IconCheckv2Rounde from '@/components/icons/IconCheckv2Rounde.vue'; // Importing the IconCheckv2Rounde component

export default defineComponent({
	data: function () {
		let config = this.$config(); // Retrieving the configuration object
		let urlApk =
			this.$config() != undefined &&
			this.$config().landing != undefined &&
			this.$config().landing.app !== undefined &&
			this.$config().landing.app.apk_url[this.$appComponent['country']] !=
				undefined
				? this.$config().landing.app.apk_url[
						this.$appComponent['country']
					] // URL for APK based on country
				: this.$config().landing.app.apk_url; // Fallback to default APK URL
		let appComponent: any = this.$appComponent; // Storing the app component reference
		return {
			config, // Exposing config to the template
			urlApk, // Exposing urlApk to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	components: {
		IconPlay, // Registering IconPlay component
		IconCheckv2Rounde, // Registering IconCheckv2Rounde component
	},
	methods: {
		redirectToApp() {
			// Method to redirect to the app download
			if (
				this.appComponent.config != undefined &&
				this.appComponent.config.partner != undefined &&
				this.appComponent.config.partner != '8' // Check for partner configuration
			) {
				window.location.assign(this.urlApk); // Redirect to APK URL
			} else {
				this.appComponent.gAnalytics('descarga_app'); // Track app download event
				window.location.assign(this.urlApk); // Redirect to APK URL
			}
		},
	},
});
</script>
<template>
	<!-- Main container for the app landing page -->
	<div
		class="relative w-full h-full flex flex-col justify-center items-center"
	>
		<!-- Background image -->
		<img
			class="absolute w-full h-full object-cover"
			:src="config.landing.app.assets.bg"
			alt="background"
		/>
		<!-- Gradient overlay at the bottom -->
		<div
			class="absolute -bottom-1 w-full h-60 bg-gradient-to-t from-neutral-content"
		></div>
		<!-- Main content section -->
		<section
			class="md:grid gap-2 grid-cols-2 place-content-start relative px-[1.5rem] md:px-[1.5rem] lg:px-[3.5rem] lx:px-[7.5rem] pt-10 max-w-[1300px]"
		>
			<article class="flex flex-col-reverse md:flex-col w-full h-full">
				<div class="relative flex flex-col gap-7">
					<!-- Title of the app -->
					<h3
						class="text-neutral text-center md:text-left text-4xl font-semibold"
					>
						{{ $t('La mejor App de Apuestas Online') }}
					</h3>
					<!-- Description of the app -->
					<p class="text-neutral text-xl text-center md:text-left">
						{{
							$t(
								'Vive la emoción del casino online desde tu dispositivo favorito con nuestra aplicación para Android. Descárgala para disfrutar de las mejores ligas, torneos, tragamonedas, Live Casino y mucho más.'
							)
						}}
					</p>
					<!-- List of app features -->
					<ul class="text-neutral text-xl leading-[3rem] relative">
						<li class="ml-10">
							<span
								><IconCheckv2Rounde
									class="lg:mr-20 mt-3 fill-secondary"
									height="19"
									width="19"
							/></span>
							{{
								$t(
									'Un diseño fluido para navegar por nuestros juegos.'
								)
							}}
						</li>
						<li class="ml-10">
							<span
								><IconCheckv2Rounde
									class="lg:mr-20 mt-3 fill-secondary"
									height="19"
									width="19"
							/></span>
							{{
								$t('Tiempos cortos de espera entre cada acción')
							}}
						</li>
						<li class="ml-10">
							<span
								><IconCheckv2Rounde
									class="lg:mr-20 mt-3 fill-secondary"
									height="19"
									width="19"
							/></span>
							{{
								$t(
									'Puede seguir en vivo los puntajes de cada partido.'
								)
							}}
						</li>
						<li class="ml-10">
							<span
								><IconCheckv2Rounde
									class="lg:mr-20 mt-3 fill-secondary"
									height="19"
									width="19"
							/></span>
							{{
								$t(
									'Con mucha frecuencia ofrecemos ofertas exclusivas por la App.'
								)
							}}
						</li>
						<li class="ml-10">
							<span
								><IconCheckv2Rounde
									class="lg:mr-20 mt-3 fill-secondary"
									height="19"
									width="19"
							/></span>
							{{
								$t(
									'Puede realizar depósitos y retiros con muchas mas facilidad.'
								)
							}}
						</li>
					</ul>
				</div>
				<!-- Mockup image for mobile view -->
				<img
					v-if="
						config.landing != undefined &&
						config.landing.app != undefined &&
						config.landing.app.assets != undefined &&
						config.landing.app.assets.five != undefined
					"
					:src="config.landing.app.assets.five"
					class="w-full h-full object-contain animated-image pb-10 md:hidden"
					alt="mock up"
				/>
				<!-- Download button -->
				<div class="flex justify-center p-5 md:justify-start">
					<button
						@click="redirectToApp()"
						class="relative text-neutral font-semibold text-xl inline-block border-solid border-1 border-neutral rounded-xl leading-4 p-5 pl-20 pr-8 shadow-xl hover:bg-neutral/70 transform transition-all hover:text-base-200 hover:scale-110 gap-x-2"
					>
						<IconPlay
							:width="'30px'"
							:height="'30px'"
							class="fill-neutral"
						/>
						{{ $t('¡Descarga ya!') }}
					</button>
				</div>
			</article>
			<div class="pt-10">
				<!-- Mockup image for desktop view -->
				<img
					v-if="
						config.landing != undefined &&
						config.landing.app != undefined &&
						config.landing.app.assets != undefined &&
						config.landing.app.assets.five != undefined
					"
					:src="config.landing.app.assets.five"
					class="w-full h-full object-contain animated-image hidden md:block"
					alt="mock up"
				/>
			</div>
		</section>
		<!-- Installation instructions section -->
		<section
			class="relative py-[5rem] md:px-[2rem] md:py-[5rem] sm:py-[3rem] flex justify-center flex-col items-center gap-12"
		>
			<h3 class="text-neutral text-5xl text-center font-semibold">
				{{ $t('¿Cómo instalar nuestra App?') }}
			</h3>
			<article class="flex flex-wrap items-stretch justify-center gap-8">
				<!-- Step 1 of installation -->
				<div class="flex flex-col w-[20rem]">
					<div
						class="flex flex-col justify-between items-center gap-6 border-solid border-1 border-neutral/50 rounded-3xl h-[22rem] py-10 px-4 bg-base-content text-center shadow-2xl font-poppinssl"
					>
						<span
							class="text-8xl h-20 font-extrabold text-secondary bg-shadow"
							>1</span
						>
						<div class="w-[5rem] h-0.5 bg-gray-400 mx-auto"></div>
						<div class="flex justify-center items-start h-full">
							<p class="text-neutral/70 text-lg">
								{{ $t('Busca') }}
								<span class="text-secondary font-semibold">{{
									$t('"Ajustes"')
								}}</span>
								{{
									$t(
										'en tu dispositivo y selecciona la opción'
									)
								}}
								<span class="text-secondary font-semibold">{{
									$t('“Seguridad”')
								}}</span
								>.
								{{ $t('Habilita') }}
								<span class="text-secondary font-semibold">{{
									$t('“Fuentes Desconocidas”')
								}}</span>
								{{ $t('para permitir la instalación*. .') }}
							</p>
						</div>
					</div>
				</div>
				<!-- Step 2 of installation -->
				<div class="flex flex-col w-[20rem]">
					<div
						class="flex flex-col justify-between items-center gap-6 border-solid border-1 border-neutral/50 rounded-3xl py-10 px-4 h-[22rem] bg-base-content text-center shadow-2xl font-poppinssl"
					>
						<span
							class="text-8xl h-20 font-extrabold text-secondary bg-shadow"
							>2</span
						>
						<div class="w-[5rem] h-0.5 bg-gray-400 mx-auto"></div>
						<div class="flex justify-center items-start h-full">
							<p class="text-neutral/70 text-lg">
								{{ $t('Haz clic en el botón ')
								}}<a
									target="_self"
									id="dercargarApp3"
									:href="
										config.footer_ != undefined &&
										config.footer_.url_download_app !=
											undefined
											? config.footer_.url_download_app
											: config.landing.app.apk_url
									"
									class="font-semibold text-secondary"
									>{{ $t('Descargar') }}</a
								>{{ $t(' para bajar la aplicación.') }}
							</p>
						</div>
					</div>
				</div>
				<!-- Step 3 of installation -->
				<div class="flex flex-col w-[20rem]">
					<div
						class="flex flex-col justify-between items-center gap-6 border-solid border-1 border-neutral/50 rounded-3xl py-10 px-4 h-[22rem] bg-base-content  text-center shadow-2xl font-poppinssl"
					>
						<span
							class="text-8xl font-extrabold h-20 text-secondary bg-shadow"
							>3</span
						>
						<div class="w-[5rem] h-0.5 bg-gray-400 mx-auto"></div>
						<div class="flex justify-center items-start h-full">
							<p class="text-neutral/70 text-lg">
								{{ $t('Abre la carpeta de ')
								}}<span class="font-semibold text-secondary">{{
									$t('“Descargas”')
								}}</span
								>{{
									$t(
										' y selecciona la aplicación (carpeta de la aplicación).'
									)
								}}
							</p>
						</div>
					</div>
				</div>
				<!-- Step 4 of installation -->
				<div class="flex flex-col w-[20rem]">
					<div
						class="flex flex-col justify-between items-center gap-6 border-solid border-1 border-neutral/50 rounded-3xl py-10 px-4 h-[22rem] bg-base-content  text-center shadow-2xl font-poppinssl">
            <span class="text-8xl font-extrabold h-20 text-secondary bg-shadow"
							>4</span
						>
						<div class="w-[5rem] h-0.5 bg-gray-400 mx-auto"></div>
						<div class="flex justify-center items-start h-full">
							<p class="text-neutral/70 text-lg">
								{{ $t('El ícono de la aplicación de ')
								}}{{
									config.partner_name != undefined
										? config.partner_name
										: config.name
								}}{{
									$t(
										' será agregada a tu pantalla de inicio y ¡estarás listo para jugar!'
									)
								}}
							</p>
						</div>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>
<style scoped>
.animated-image {
	width: 100%; /* Full width for animated images */
	height: 100%; /* Full height for animated images */
	object-fit: contain; /* Maintain aspect ratio */
	animation: pulse-animation 3s infinite; /* Infinite pulse animation */
}
@keyframes pulse-animation {
	0%,
	100% {
		transform: translate(-2px, -2px); /* Initial and final position */
	}
	50% {
		transform: translate(2px, 10px); /* Mid animation position */
	}
}
.bg-shadow {
	text-shadow: 5px 5px #1e2539; /* Text shadow effect */
}
</style>

<!-- FILE DOCUMENTED -->
