<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { RouterView } from 'vue-router'; // Importing RouterView for routing
import IconClose from '../icons/IconClose.vue'; // Importing icon components
import WhistleIcon from '../icons/WhistleIcon.vue';
import CasinoCoinIcon from '../icons/CasinoCoinIcon.vue';
import FlagsIcon from '../icons/FlagsIcon.vue';
import LiveIcon from '../icons/LiveIcon.vue';
import WalletIcon from '../icons/WalletIcon.vue';
import ProfileIcon from '../icons/ProfileIcon.vue';
import ExitIcon from '../icons/ExitIcon.vue';
import LiveIcon2 from '@/components/icons/LiveIcon2.vue';
import QueryIcon from '@/components/icons/QueryIcon.vue';
import ResultsIcon from '@/components/icons/ResultsIcon.vue'; // Importing additional icon component

export default defineComponent({
	components: {
        ResultsIcon,
        QueryIcon,
		// Registering components for use in the template
		LiveIcon2,
		IconClose,
		WhistleIcon,
		CasinoCoinIcon,
		FlagsIcon,
		LiveIcon,
		WalletIcon,
		ProfileIcon,
		ExitIcon,
	},
	data() {
		// Defining reactive data properties
		let config = this.$config(); // Accessing configuration
		let appComponent: any = this.$appComponent; // Accessing application component
		let onMenu: boolean = false; // State to track menu visibility
		return {
			config,
			appComponent,
			onMenu,
		};
	},
	methods: {
		// Defining methods for component functionality
		closeMenu() {
			// Method to close the menu
			this.onMenu = false; // Set menu state to closed
		},
		showDeposit() {
            if (
               this.appComponent.config.depositsView !== undefined &&
               this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
               this.appComponent.config.depositsView[this.appComponent.country]['switch'] === false &&
               this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] === true
           ) {
               window.localStorage.removeItem('newViewDeposit');
               window.localStorage.setItem('newViewDeposit', 'true');
               this.appComponent.showModalDepositV3 = true;
               return;
           }
           if (
               (this.appComponent.config.depositsView !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                   window.localStorage.getItem('newViewDeposit') == 'true') ||
               (!window.localStorage.getItem('newViewDeposit') &&
                   this.appComponent.config.depositsView !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                   this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'])
           ) {
               this.appComponent.showModalDepositV3 = true; // Show deposit modal
           } else {
               this.appComponent.showModalDepositV2 = true; // Show deposit modal
           }
		},
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Menu3|layout:layout-${this.appComponent.config.layout}`
            };
        },
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<section class="relative w-full flex justify-center items-center">
		<nav
			v-if="appComponent.session.logueado"
			class="bg-base-300 h-20 w-[101%] flex justify-around items-center text-center p-1 fixed -bottom-[2px] lg:hidden shadow-lg shadow-white"
      :class="appComponent.showGame ? 'z-[101]' : 'z-[51]'"
		>
			<RouterLink
                v-if="!appComponent.infoApp"
				active-class="active-link"
				:to="
					config.MENU_USER !== undefined &&
					config.MENU_USER[appComponent.country] !== undefined
						? config.MENU_USER[appComponent.country][0].url
						: '/deportes'
				"
				v-bind="analyticsAttrs(`menu:nav:${(config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined ? config.MENU_USER[appComponent.country][0].title : 'Deportivas').toLowerCase().replace(/\s/g, '-')}`)"
				@click="
					closeMenu(); 
					appComponent.showGame = false
				"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<img
					v-if="
						config.MENU_USER &&
						config.MENU_USER[appComponent.country] !== undefined
					"
					:src="config.MENU_USER[appComponent.country][0].icon"
					alt="Icon Deportes Menu Inferior"
					class="w-9 aspect-square"
				/>
				<WhistleIcon
					v-if="
						config.MENU_USER == undefined ||
						config.MENU_USER[appComponent.country] == undefined
					"
					:height="30"
					:width="30"
                    :class="$route.fullPath == '/deportes'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
				/>
				<span>{{
					$t(
						config.MENU_USER == undefined ||
							config.MENU_USER[appComponent.country] == undefined
							? 'Deportivas'
							: config.MENU_USER[appComponent.country][0].title
					)
				}}</span>
			</RouterLink>
			<RouterLink
                v-if="!appComponent.infoApp"
				active-class="active-link"
				:to="
					config.MENU_USER !== undefined &&
					config.MENU_USER[appComponent.country] !== undefined
						? config.MENU_USER[appComponent.country][1].url
						: '/new-casino'
				"
				 v-bind="analyticsAttrs(`menu:nav:${(config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined ? config.MENU_USER[appComponent.country][1].title : 'Casino').toLowerCase().replace(/\s/g, '-')}`)"
				@click="
					closeMenu(); 
					appComponent.showGame = false
				"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<img
					v-if="
						config.MENU_USER !== undefined &&
						config.MENU_USER[appComponent.country] !== undefined
					"
					:src="config.MENU_USER[appComponent.country][1].icon"
					alt="Icon Futbol Menu Inferior"
					class="w-9 aspect-square"
				/>
				<CasinoCoinIcon
					v-if="
						config.MENU_USER == undefined ||
						config.MENU_USER[appComponent.country] == undefined
					"
					:height="30"
					:width="30"
                    :class="$route.fullPath == '/new-casino'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
				/>
				<span>{{
					$t(
						config.MENU_USER == undefined ||
							config.MENU_USER[appComponent.country] == undefined
							? 'Casino'
							: config.MENU_USER[appComponent.country][1].title
					)
				}}</span>
			</RouterLink>
            <RouterLink
                v-if="appComponent.infoApp"
                to="/gestion/historial_saldo"
                active-class="active-link"
                class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
                @click="
					closeMenu(); 
					appComponent.showGame = false
				"
            >
                <ResultsIcon
                    :height="30"
                    :width="30"
                    :class="$route.fullPath == '/gestion/historial_saldo'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
                />
                <span>{{
                        $t(
                            'Movimientos'
                        )
                    }}</span>
            </RouterLink>
			<div
				class="w-full max-w-[20%] relative flex justify-center items-center"
			>
				<button
					class="absolute bg-neutral w-20 h-20 rounded-full top-[-55px] border-2 border-secondary"
					@click="
						onMenu = !onMenu;
						appComponent.gAnalytics('menu_mobile');
					"
				>
					<img
						:src="
							config.img_menu_mobile !== undefined
								? config.img_menu_mobile
								: 'https://images.virtualsoft.tech/m/msjT1683329139.png'
						"
						alt=""
						class="w-full h-full"
					/>
					<ExitIcon
						v-if="onMenu && !appComponent.infoApp"
						:height="23"
						:width="23"
						:fill="'#ffffff'"
						:fill2="'#FF0000'"
						class="blob w-7 h-7 absolute top-0 right-0 shadow-lg"
					/>
				</button>
			</div>
            <RouterLink
                v-if="appComponent.infoApp"
                to="/consulta/consulta_tickets_online"
                active-class="active-link"
                class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
                @click="
					closeMenu(); 
					appComponent.showGame = false
				"
            >
                <QueryIcon
                    :height="30"
                    :width="40"
                    :class="$route.fullPath == '/virtuales-lobby'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
                />
                <span>{{
                        $t(
                            'Consultas'
                        )
                    }}</span>
            </RouterLink>
			<RouterLink
                v-if="!appComponent.infoApp &&
		(
			!config?.MENU_USER ||
			!config.MENU_USER[appComponent.country] ||
			!config.MENU_USER[appComponent.country][2] ||
			config.MENU_USER[appComponent.country][2].targer !== 'currency'
		)"
				active-class="active-link"
				:to="
					config.MENU_USER !== undefined &&
					config.MENU_USER[appComponent.country] !== undefined
						? config.MENU_USER[appComponent.country][2].url
						: '/virtuales-lobby'
				"
				v-bind="analyticsAttrs(`menu:nav:${config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined ? config.MENU_USER[appComponent.country][2].title.toLowerCase().replace(/\s/g, '-') : ''}`)"
				@click="
					closeMenu(); 
					appComponent.showGame = false
				"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<img
					v-if="
						config.MENU_USER !== undefined &&
						config.MENU_USER[appComponent.country] !== undefined
					"
					:src="config.MENU_USER[appComponent.country][2].icon"
					alt="Icon Deportes Menu Inferior"
					class="w-9 aspect-square"
				/>
				<FlagsIcon
					v-if="
						config.MENU_USER == undefined ||
						config.MENU_USER[appComponent.country] == undefined
					"
					:height="30"
					:width="40"
                    :class="$route.fullPath == '/virtuales-lobby'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
				/>
				<span>{{
					$t(
						config.MENU_USER == undefined ||
							config.MENU_USER[appComponent.country] == undefined
							? 'Virtuales'
							: config.MENU_USER[appComponent.country][2].title
					)
				}}</span>
			</RouterLink>
			<button
                v-else-if="config?.MENU_USER?.[appComponent.country]?.[2]?.targer === 'currency'"
				active-class="active-link"
				@click="appComponent.modalCurrencyExchange = true"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<img
					v-if="
						config.MENU_USER !== undefined &&
						config.MENU_USER[appComponent.country] !== undefined
					"
					:src="config.MENU_USER[appComponent.country][2].icon"
					alt="Icon Deportes Menu Inferior"
					class="w-9 aspect-square"
				/>
				<FlagsIcon
					v-if="
						config.MENU_USER == undefined ||
						config.MENU_USER[appComponent.country] == undefined
					"
					:height="30"
					:width="40"
                    :class="$route.fullPath == '/virtuales-lobby'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
				/>
				<span>{{
					$t(
						config.MENU_USER == undefined ||
							config.MENU_USER[appComponent.country] == undefined
							? 'Virtuales'
							: config.MENU_USER[appComponent.country][2].title
					)
				}}</span>
			</button>
			<RouterLink
                v-if="!appComponent.infoApp"
				active-class="active-link"
				:to="
					config.MENU_USER !== undefined &&
					config.MENU_USER[appComponent.country] !== undefined
						? config.MENU_USER[appComponent.country][3].url
						: '/live-casino-vivo'
				"
				v-bind="analyticsAttrs(`menu:nav:${(config.MENU_USER !== undefined &&
					config.MENU_USER[appComponent.country] !== undefined ? config.MENU_USER[appComponent.country][3].title : 'En vivo').toLowerCase().replace(/\s/g, '-')}`)"
				@click="
					closeMenu(); 
					appComponent.showGame = false
				"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<img
					v-if="
						config.MENU_USER !== undefined &&
						config.MENU_USER[appComponent.country] !== undefined
					"
					:src="config.MENU_USER[appComponent.country][3].icon"
					alt="Icon  Menu Inferior"
					class="w-9 aspect-square"
				/>
				<LiveIcon
					v-if="
						config.MENU_USER == undefined ||
						config.MENU_USER[appComponent.country] == undefined
					"
					:height="30"
					:width="30"
                    :class="$route.fullPath == '/live-casino-vivo'
							? 'fill-primary'
							: 'fill-neutral'
					"
                    active-class="active-link"
				/>
				<span class="w-12 leading-none text-center">{{
					$t(
						config.MENU_USER == undefined ||
							config.MENU_USER[appComponent.country] == undefined
							? 'En vivo'
							: config.MENU_USER[appComponent.country][3].title
					)
				}}</span>
			</RouterLink>
		</nav>
		<nav
			v-else
			class="menu_user  fixed -bottom-1 left-0 z-[100] flex justify-around items-center gap-2 h-[70px] w-full lg:hidden p-2"
			:class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'bg-base-300' : 'bg-base-200'"
		>
		<div 
				v-if="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2"
				class="flex justify-between items-center gap-6">
				<RouterLink
				id="accion_registro"
				to="/registro"
				v-bind="analyticsAttrs('header:signup')"
				class="bg-success h-12 w-32 flex justify-center items-center rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105l"
			>
				{{ $t('Registrarse') }}
				<!-- Translated text for registration -->
			</RouterLink>
			<RouterLink
				to="/home"
				v-bind="analyticsAttrs('menu:nav:home')"
				class="w-16 h-16 rounded-full flex justify-center items-center"
				aria-label="Redireccion pagina principal"
			>
				<img :src="config.header.logoUrl2" alt="" class="" />
				<!-- Logo image -->
			</RouterLink>
			<button
				class="bg-primary h-12 w-36 rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
				@click="appComponent.showModalLogin = true"
			>
				{{ $t('Iniciar sesión') }}
				<!-- Translated text for login -->
			</button>
			</div>
			<div 
				v-else
				class="flex justify-between items-center">
			<button
                :class="{
                    'btn-pyramid bg-secondary h-10 w-44 rounded-xl text-lg text-neutral font-semibold shadow-xl hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                    'bg-primary-focus h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                        appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
                }"
				@click="appComponent.showModalLogin = true"
			>
				{{ $t('Iniciar sesión') }}
				<!-- Translated text for login -->
			</button>
			<RouterLink
				to="/home"
				v-bind="analyticsAttrs('menu:nav:home')"
				class="w-16 h-16 rounded-full flex justify-center items-center"
				aria-label="Redireccion pagina principal"
			>
				<img :src="config.header.logoUrl2" alt="" class="" />
				<!-- Logo image -->
			</RouterLink>
			<RouterLink
				id="accion_registro"
				to="/registro"
				v-bind="analyticsAttrs('menu:nav:signup')"
                :class="{
                    'btn-pyramid bg-success h-10 w-44 flex justify-center items-center rounded-xl text-lg text-neutral font-semibold shadow-xl hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                    'bg-success h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                        appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
                }"
			>
				{{ $t('Registrate') }}
				<!-- Translated text for registration -->
			</RouterLink>
			</div>
		</nav>
		<article
            v-if="!appComponent.infoApp"
			:class="[
				appComponent.config.bettingHistory != undefined &&
				appComponent.config.bettingHistory[appComponent.country] !=
					undefined &&
				appComponent.config.bettingHistory[appComponent.country].show !=
					undefined &&
				appComponent.config.bettingHistory[appComponent.country].show
					? 'gap-2'
					: 'gap-8',
					appComponent.showGame ? 'z-[100]' : 'z-[50]'
			]"
			class="menu_extra w-72 h-36 fixed bg-secondary-focus/40 rounded-t-full shadow-md shadow-black flex justify-center items-center lg:hidden"
			:style="[
				{ bottom: onMenu ? '65px' : '-300px' },
				{ opacity: onMenu ? '1' : '0' },
			]"
		>
			<div
				class="bg-accent-content/80 w-72 h-36 fixed backdrop-blur-[1px] z-[1] rounded-t-full shadow-md shadow-black flex justify-center items-center lg:hidden"
			></div>
			<RouterLink
				:to="
					config.MENU_USER_EXTRA == undefined
						? '/consulta/consulta_retiros'
						: config.MENU_USER_EXTRA[0].url
				"
				@click="onMenu = false; appComponent.showGame = false"
				class="flex flex-col justify-center items-center mt-16 z-10"
			>
				<img
					v-if="config.MENU_USER_EXTRA != undefined"
					:src="config.MENU_USER_EXTRA[0].icon"
					class="w-[30px] h-[30px]"
				/>
				<WalletIcon
					v-if="config.MENU_USER_EXTRA == undefined"
					:height="30"
					:width="30"
					class="fill-neutral"
				/>
				<p class="text-sm text-neutral">
					{{
						$t(
							config.MENU_USER_EXTRA == undefined
								? 'Retiros'
								: config.MENU_USER_EXTRA[0].title
						)
					}}
				</p>
			</RouterLink>
			<div class="flex flex-col justify-center items-center z-10">
				<div class="flex flex-row justify-center items-center gap-x-4">
					<RouterLink
						to="#"
						@click="
							onMenu = false;
							showDeposit();
							appComponent.showGame = false
						"
						class="flex flex-col justify-center items-center"
						:class="
							(appComponent.config != undefined &&
								appComponent.config.newViewIdInMenu !=
									undefined &&
								!appComponent.config.newViewIdInMenu) ||
							(appComponent.config != undefined &&
								appComponent.config.newViewIdInMenu ==
									undefined)
								? 'mb-12'
								: 'mb-4'
						"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1683330578.png"
							alt=""
							:width="
								(appComponent.config != undefined &&
									appComponent.config.newViewIdInMenu !=
										undefined &&
									!appComponent.config.newViewIdInMenu) ||
								(appComponent.config != undefined &&
									appComponent.config.newViewIdInMenu ==
										undefined)
									? '40'
									: '27'
							"
							:height="40"
							class="scale-125"
						/>
						<p class="text-sm text-neutral">
							{{ $t('Depositar') }}
							<!-- Translated text for deposit -->
						</p>
					</RouterLink>
					<RouterLink
						v-if="
							appComponent.config.bettingHistory != undefined &&
							appComponent.config.bettingHistory[
								appComponent.country
							] != undefined &&
							appComponent.config.bettingHistory[
								appComponent.country
							].show != undefined &&
							appComponent.config.bettingHistory[
								appComponent.country
							].show
						"
						:to="
							appComponent.config.bettingHistory[
								appComponent.country
							].url != undefined
								? appComponent.config.bettingHistory[
										appComponent.country
									].url
								: '/consulta/consulta_tickets_online'
						"
						@click="onMenu = false; appComponent.showGame = false"
						class="flex flex-col justify-center items-center mb-12"
					>
						<img
							:src="
								appComponent.config.bettingHistory[
									appComponent.country
								].img != undefined
									? appComponent.config.bettingHistory[
											appComponent.country
										].img
									: 'https://images.virtualsoft.tech/m/msj0212T1704401123.png'
							"
							alt=""
							width="40"
							height="40"
							class="scale-125"
						/>
						<p class="text-sm text-neutral text-center">
							{{
								$t(
									appComponent.config.bettingHistory[
										appComponent.country
									].text != undefined
										? appComponent.config.bettingHistory[
												appComponent.country
											].text
										: 'Historial'
								)
							}}
						</p>
					</RouterLink>
				</div>
				<div
					v-if="
						appComponent.config != undefined &&
						appComponent.config.newViewIdInMenu != undefined &&
						appComponent.config.newViewIdInMenu
					"
					class="flex justify-center items-center mb-8"
				>
					<RouterLink
						to="/gestion/gestion_cuenta"
						class="flex flex-col justify-center items-center hover:scale-105"
						@click="
					closeMenu(); 
					appComponent.showGame = false
				"
					>
						<img
							src="https://images.virtualsoft.tech/m/msj19212T1722345801.png"
							alt=""
						/>
						<span class="saldo text-neutral text-base">{{
							appComponent.session.usuario
						}}</span>
						<!-- Display user session information -->
					</RouterLink>
				</div>
			</div>
			<RouterLink
				:to="
					config.MENU_USER_EXTRA == undefined
						? '/gestion/gestion_cuenta'
						: config.MENU_USER_EXTRA[2].url
				"
				@click="onMenu = false; appComponent.showGame = false"
				class="flex flex-col justify-center items-center gap-1 mt-16 z-10"
			>
				<img
					v-if="
						config.MENU_USER_EXTRA != undefined &&
						config.MENU_USER_EXTRA[2].icon != undefined
					"
					:src="config.MENU_USER_EXTRA[2].icon"
					class="w-[30px] h-[30px]"
				/>
				<ProfileIcon
					v-if="
						config.MENU_USER_EXTRA == undefined ||
						config.MENU_USER_EXTRA[2].icon == undefined
					"
					:height="32"
					:width="29"
					class="fill-neutral"
				/>
				<p
					class="text-sm text-neutral max-w-[50px] text-center leading-3"
				>
					{{
						$t(
							config.MENU_USER_EXTRA == undefined
								? 'Mi Perfil'
								: config.MENU_USER_EXTRA[2].title
						)
					}}
				</p>
			</RouterLink>
		</article>
	</section>
</template>
<style scoped>
.button__menu {
	text-shadow: 0 0 4px black; /* Text shadow for button */
}
.active-link > span {
	color:  hsl(var(--p)); /* Active link text color */
}
.menu_extra {
	transition: 0.3s linear; /* Smooth transition for menu */
}
</style>

<!-- FILE DOCUMENTED -->
