<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making API calls
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing the IconHandsUp component
import router from '@/router'; // Importing the router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing the IconHouse component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	components: {
		IconHandsUp, // Registering IconHandsUp component
		IconHouse, // Registering IconHouse component
	},
	methods: {
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktop|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>

<template>
	<!-- Main container for the menu, hidden on medium and down screen sizes -->
	<div
		class="hide-on-med-and-down absolute bottom-0 w-full z-1"
		v-bind:class="{
			'menu-top':
				config.menu_ !== undefined &&
				config.menu_.top_menu !== undefined
					? config.menu_.top_menu
					: config.menu.stylePositionTop,
		}"
	>
		<!-- Row container for menu background and items -->
		<div class="row justify-content-md-center menu-bg text-neutral flex">
			<!-- Conditional column based on menu configuration -->
			<div
				v-if="
					config.menu.styleVersion !== 2 &&
					(config.menu_ !== undefined &&
					config.menu_.full_width !== undefined
						? !config.menu_.full_width
						: !config.menu.styleFullWidth)
				"
				class="col flex-1"
			></div>
			<!-- Main menu container with dynamic classes based on configuration -->
			<div
				class="menu relative bg-gradient-to-r flex-none lg:flex-1 bg-base-300 before:bg-base-300 after:bg-base-300"
				v-bind:class="{
					polygon:
						config.menu_ !== undefined &&
						config.menu_.corner_style !== undefined
							? config.menu_.corner_style == 1
							: config.menu.styleCorners == 1,
					'rounded-3xl':
						config.menu_ !== undefined &&
						config.menu_.corner_style !== undefined
							? config.menu_.corner_style == 2
							: config.menu.styleCorners == 2,
					chevron:
						config.menu_ !== undefined &&
						config.menu_.corner_style !== undefined
							? config.menu_.corner_style == 3
							: config.menu.styleCorners == 3,
					bevel:
						config.menu_ !== undefined &&
						config.menu_.corner_style !== undefined
							? config.menu_.corner_style == 4
							: config.menu.styleCorners == 4,
				}"
			>
				<!-- Conditional rendering for menu version 2 -->
				<div
					v-if="config.menu.styleVersion === 2"
					class="row menu-netabet version2"
				>
					<span v-if="!appComponent.session.logueado">
						<li v-for="menu in config.SUBMENU_NOLOGUEADO">
							<RouterLink :to="menu.MENU_URL">{{
								$t(menu.MENU_TITLE)
							}}</RouterLink>
						</li>
					</span>
					<span
						v-if="
							appComponent.session.logueado &&
							appComponent.typeUser != '' &&
							appComponent.typeUser != undefined &&
							appComponent.typeUser == 'U'
						"
					>
						<li v-for="menu in config.SUBMENU_USUARIO_LOGUEADO">
							<RouterLink :to="menu.MENU_URL">{{
								$t(menu.MENU_TITLE)
							}}</RouterLink>
						</li>
					</span>
					<span
						v-if="
							appComponent.session.logueado &&
							appComponent.typeUser != '' &&
							appComponent.typeUser != undefined &&
							appComponent.typeUser != 'U'
						"
					>
						<li v-for="menu in config.SUBMENU_PUNTOVENTA_LOGUEADO">
							<RouterLink :to="menu.MENU_URL">{{
								$t(menu.MENU_TITLE)
							}}</RouterLink>
						</li>
					</span>
				</div>
				<!-- Conditional rendering for menu version 1 -->
				<div
					v-if="config.menu.styleVersion === 1"
					class="row justify-content-md-center menu-list version1"
				>
					<div
						v-if="!appComponent.session.logueado"
						style="width: 100%"
					>
						<ol style="width: 100%; display: flex">
							<li
								v-for="value in config.MENU_NOLOGUEADO[
									appComponent.country
								]"
								class="main-item text-center"
								v-bind:class="[
									{ 'shadow-clip': value.SHADOW == 1 },
									{'bg-success' : value.MENU_ID === 'accion_registro'}
								]"
							>
								<RouterLink
									:id="value.MENU_ID"
									:to="value.MENU_URL"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_ID
										)
									"
									v-bind="analyticsAttrs(value.MENU_ID === 'accion_registro' ? 'header:signup-btn' : `header:menu:${value.MENU_URL.split('/')[1]}`)"
									class="align-middle text-center menu-desk text-neutral"
									v-if="
										!value.IS_MOBILE &&
										value.TARGER == undefined
									"
								>
									<div
										class=""
										v-bind:class="{
											'inline-block w-5':
												config.partner == 6,
										}"
									>
										<img
											v-if="
												value.MENU_ICON != '' &&
												config.menu.desktopIcons
											"
											class="iconSideMenu shape-Sports desktop"
											:alt="value.MENU_TITLE"
											:src="value.MENU_ICON"
										/>
										<IconHouse
											v-if="
												(value.MENU_TITLE == 'HOME' ||
													value.MENU_TITLE ==
														'INICIO') &&
												value.MENU_ICON == '' &&
												!config.menu.desktopIcons &&
												!config.menu.desktopIcons
											"
											:width="'12px'"
											:height="'12px'"
											:fill="'currentColor'"
										></IconHouse>
										<div
											v-if="value.ICON != undefined"
											class="svg"
											v-html="value.ICON"
										></div>
									</div>
									<span
										v-if="
											value.SUB_MENU == undefined ||
											value.SUB_MENU == ''
										"
										class="text-center"
										>{{ $t(value.MENU_TITLE) }}</span
									>
									<div
										class="dropdown dropdown-hover text-center cursor-pointer h-full w-full"
										v-if="
											value.SUB_MENU != undefined &&
											value.SUB_MENU != ''
										"
									>
										<label
											tabindex="0"
											class="text-center flex items-center justify-center h-full w-full"
											>{{ $t(value.MENU_TITLE) }}</label
										>
										<ul
											tabindex="0"
											class="dropdown-content menu p-2 shadow bg-primary-content rounded-box w-auto text-break break-words"
										>
											<li v-for="item in value.SUB_MENU">
												<RouterLink
													:id="item.MENU_ID"
													@click="
														appComponent.gAnalytics(
															'menu_top',
															'accion_iniciarsesion'
														)
													"
													:to="item.MENU_URL"
													>{{ $t(item.MENU_TITLE) }}
												</RouterLink>
											</li>
										</ul>
									</div>
								</RouterLink>
								<a
									class="menu-item align-middle text-center text-neutral"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_TITLE
										)
									"
									:id="value.MENU_ID"
									v-if="
										value.TARGER !== undefined &&
										value.TARGER == 'blank'
									"
									:aria-label="value.MENU_TITLE"
									:href="value.MENU_URL"
									target="_blank"
									:class="value.MENU_SECCION"
									>{{ $t(value.MENU_TITLE) }}</a
								>
								<a
									class="menu-item align-middle text-center text-neutral"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_TITLE
										)
									"
									:id="value.MENU_ID"
									v-if="
										value.TARGER !== undefined &&
										value.TARGER == '_top'
									"
									:aria-label="value.MENU_TITLE"
									:href="value.MENU_URL"
									target="_top"
									:class="value.MENU_SECCION"
									>{{ $t(value.MENU_TITLE) }}</a
								>
								<div
									v-if="
										value.MENU_ID == 'accion_casinoenvivo'
									"
									id="dropdown-casino"
									class="z-10 dropdown-casino animated fadeInDown"
									style="animation-duration: 0.5s"
								>
									<ul class="text-center">
										<span
											v-if="
												config.menu.casinoEnabled &&
												value.NOLOGUEADO
											"
										>
											<li
												v-for="value in config.MENU_USUARIO_CASINO"
												class="main-item menu-home selected"
											>
												<RouterLink
													v-bind:class="{
														active:
															appComponent.page ==
															value.MENU_URL,
													}"
													:id="value.MENU_ID"
													:to="value.MENU_URL"
													:aria-label="value.MENU_ID"
													class="menu-item align-middle text-center text-neutral"
												>
													<span
														:class="
															value.MENU_CLASS
														"
														class="menu-item_Center"
														>{{
															$t(value.MENU_TITLE)
														}}</span
													>
												</RouterLink>
											</li>
										</span>
									</ul>
								</div>
								<div
									v-if="
										value.MENU_ID == 'accion_deportivas' &&
										config.menu.subMenuApuestas
									"
									id="dropdown-casino"
									class="z-10 dropdown-casino animated fadeInDown"
									style="animation-duration: 0.5s"
								>
									<ul class="text-center">
										<span>
											<li
												v-for="value in config.MENU_USUARIO_APUESTAS"
												class="main-item menu-home selected"
											>
												<RouterLink
													v-bind:class="{
														active:
															appComponent.page ==
															value.MENU_URL,
													}"
													:id="value.MENU_ID"
													:aria-label="value.MENU_ID"
													:to="value.MENU_URL"
													class="menu-item align-middle text-center text-neutral"
												>
													<span
														:class="
															value.MENU_CLASS +
															'menu-item_Center'
														"
														>{{
															$t(value.MENU_TITLE)
														}}</span
													>
												</RouterLink>
											</li>
										</span>
									</ul>
								</div>
							</li>
							<li
								class="main-item menu-login selected text-center"
								:class="appComponent.config.loginSelected !== undefined && appComponent.config.loginSelected ? 'bg-primary' : ''"
							>
								<a
									id="accion_iniciarsesion"
									aria-label="login"
									class="menu-item align-middle text-center text-neutral"
									v-bind="analyticsAttrs('header:login-btn')"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											'accion_iniciarsesion'
										)
									"
								>
									<label
										id="btnMenuLogin"
										@click="
											appComponent.showModalLogin = true
										"
										class="inline-block cursor-pointer text-neutral"
										>{{ $t('Iniciar Sesión') }}</label
									>
								</a>
							</li>
						</ol>
					</div>
					<div
						v-if="appComponent.session.logueado"
						style="width: 100%"
					>
						<ol
							v-if="
								appComponent.typeUser != '' &&
								appComponent.typeUser != undefined &&
								appComponent.typeUser != 'U'
							"
							style="width: 100%; display: flex"
						>
							<li
								v-for="value in config.MENU_PUNTOVENTA_LOGUEADO"
								class="main-item menu-home selected"
								v-bind:class="{
									'shadow-clip': value.SHADOW == 1,
								}"
							>
								<RouterLink
									:id="value.MENU_ID"
									:aria-label="value.MENU_ID"
									:to="value.MENU_URL"
									class="menu-item align-middle text-center text-neutral"
								>
									<div>
										<IconHouse
											v-if="
												value.MENU_TITLE == 'HOME' ||
												(value.MENU_TITLE == 'INICIO' &&
													config.menu.desktopIcons !==
														true)
											"
											:width="'12px'"
											:height="'12px'"
											:fill="'currentColor'"
										></IconHouse>
										<svg
											v-if="value.ISNEW == 1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											version="1.1"
											id="Capa_1"
											x="0px"
											y="0px"
											width="481.045px"
											height="481.045px"
											viewBox="0 0 481.045 481.045"
											xml:space="preserve"
											class="ng-scope"
											style="
												enable-background: new 0 0
													481.045 481.045;
												width: 22px;
												height: 25px;
												margin-top: -30px;
												position: absolute;
												margin-left: -11px;
											"
										>
											<g>
												<path
													d="M434.874,241.031l35.405-36.292c4.403-4.513,6.225-10.947,4.838-17.097c-1.387-6.15-5.79-11.182-11.704-13.37   l-47.546-17.595l16.163-48.054c2.011-5.976,0.859-12.563-3.056-17.504c-3.917-4.94-10.07-7.572-16.344-6.971l-50.479,4.766   l-6.27-50.309c-0.779-6.257-4.672-11.694-10.346-14.448c-5.671-2.753-12.353-2.45-17.75,0.806L283.97,51.391L256.094,8.477   C252.659,3.19,246.782,0,240.478,0c-6.304,0-12.182,3.19-15.617,8.478l-27.616,42.517l-43.322-26.333   c-5.386-3.275-12.065-3.603-17.748-0.868c-5.681,2.735-9.592,8.158-10.394,14.412l-6.448,50.288l-50.457-4.942   c-6.273-0.619-12.435,1.988-16.368,6.915c-3.933,4.927-5.106,11.51-3.117,17.492l15.994,48.109l-47.609,17.429   c-5.92,2.167-10.341,7.184-11.748,13.329c-1.408,6.146,0.39,12.586,4.775,17.114l35.279,36.414l-35.34,36.351   c-4.394,4.521-6.203,10.958-4.808,17.104c1.398,6.148,5.812,11.172,11.728,13.35L65.24,324.67l-16.083,48.082   c-2,5.979-0.84,12.564,3.086,17.498c3.925,4.936,10.082,7.549,16.355,6.943l50.465-4.854l6.362,50.301   c0.792,6.254,4.692,11.684,10.369,14.428c5.677,2.746,12.356,2.43,17.748-0.836l43.37-26.258l27.545,42.566   c3.425,5.293,9.297,8.494,15.601,8.504c0.01,0,0.021,0,0.032,0c6.293,0,12.162-3.178,15.598-8.449l27.692-42.469l43.279,26.41   c5.381,3.285,12.06,3.623,17.745,0.898c5.687-2.727,9.606-8.143,10.42-14.395l6.535-50.277l50.451,5.029   c6.281,0.625,12.438-1.967,16.38-6.887c3.941-4.92,5.126-11.5,3.146-17.486l-15.912-48.135l47.639-17.348   c5.924-2.156,10.354-7.166,11.772-13.309s-0.368-12.586-4.747-17.122L434.874,241.031z M180.785,281.915   c0,3.024-2.451,5.476-5.476,5.476h-16.366c-1.953,0-3.757-1.039-4.737-2.729l-19.148-33.008   c-3.132-5.383-8.644-15.19-13.691-25.864c0.375,10.122,0.558,20.905,0.558,32.748v23.377c0,3.024-2.452,5.476-5.476,5.476h-11.891   c-3.025,0-5.477-2.451-5.477-5.476v-82.781c0-3.024,2.452-5.477,5.477-5.477h18.926c1.933,0,3.722,1.02,4.708,2.681l18.572,31.28   c4.251,7.204,8.511,15.414,12.167,23.404c-0.679-8.5-0.99-17.888-0.99-29.315v-22.571c0-3.024,2.451-5.477,5.476-5.477h11.891   c3.025,0,5.476,2.453,5.476,5.477L180.785,281.915L180.785,281.915z M254.996,281.915c0,3.024-2.452,5.476-5.477,5.476h-52.727   c-3.024,0-5.477-2.451-5.477-5.476v-82.781c0-3.024,2.452-5.477,5.477-5.477h50.755c3.024,0,5.476,2.453,5.476,5.477v8.98   c0,3.024-2.451,5.477-5.476,5.477h-31.56v15.689h29.445c3.025,0,5.477,2.452,5.477,5.477v8.847c0,3.024-2.451,5.476-5.477,5.476   h-29.445v18.379h33.53c3.024,0,5.477,2.452,5.477,5.476L254.996,281.915L254.996,281.915z M381.773,200.563l-22.386,82.78   c-0.646,2.388-2.812,4.048-5.286,4.048h-17.053c-2.6,0-4.841-1.828-5.364-4.373l-7.38-35.841   c-1.332-6.655-2.422-12.51-3.323-18.649c-1.181,6.586-2.387,12.515-3.911,18.703l-8.302,35.916   c-0.574,2.484-2.787,4.244-5.336,4.244h-17.347c-2.517,0-4.708-1.714-5.314-4.156l-20.585-82.779c-0.407-1.635-0.039-3.367,1-4.695   c1.038-1.328,2.63-2.104,4.314-2.104h14.718c2.625,0,4.882,1.864,5.377,4.443l6.575,34.212c1.521,7.751,2.967,15.958,4.237,23.386   c1.299-7.111,2.9-14.836,4.8-23.696l7.362-34.027c0.545-2.52,2.774-4.319,5.353-4.319h16.447c2.611,0,4.859,1.846,5.371,4.407   l6.977,35.029c1.375,6.916,2.567,13.688,3.719,21.153c0.84-4.963,1.786-10.026,2.765-15.268l0.063-0.335   c0.406-2.177,0.812-4.362,1.216-6.554c0.007-0.044,0.016-0.087,0.025-0.13l7.086-33.944c0.53-2.538,2.768-4.358,5.36-4.358h13.536   c1.705,0,3.313,0.794,4.35,2.148C381.872,197.159,382.219,198.918,381.773,200.563z"
													style="
														fill: rgb(255, 218, 68);
													"
												></path>
											</g>
										</svg>
									</div>
									<span class="menu-item_Center text-center">
										{{ $t(value.MENU_TITLE) }}</span
									>
								</RouterLink>
							</li>
							<li style="z-index: 10" class="dropdown menu-serv">
								<a
									id="accion_servicios"
									class="dropdown-toggle"
									data-toggle="dropdown"
									role="button"
									aria-haspopup="true"
									aria-expanded="true"
								>
									<span
										style="display: inline-block"
										class="nav-label"
										>Servicios
										<span class="icon-chevron-down"></span
									></span>
								</a>
								<ul class="dropdown-menu" style="top: 95%">
									<li
										v-for="menu in appComponent.menus_service"
										class="dropdown-submenu"
									>
										<a
											:id="menu.MENU_ID"
											class="dropdown-toggle"
										>
											<span
												style="display: inline-block"
												class="nav-label"
												>{{ $t(menu.MENU_TITLE) }}</span
											>
											<span class="caret"></span>
										</a>
										<ul
											v-if="
												menu.SUBMENUS != undefined &&
												menu.SUBMENUS != ''
											"
											class="dropdown-menu"
										>
											<li
												v-for="submenu in menu.SUBMENUS"
											>
												<RouterLink
													:id="submenu.MENU_ID"
													:to="
														'/' +
														menu.MENU_SLUG +
														'/' +
														submenu.SUBMENU_URL
													"
													v-if="
														menu.TYPE != 'EXTERNAL'
													"
													class="title refresh"
													>{{
														$t(
															submenu.SUBMENU_TITLE
														)
													}}
												</RouterLink>
												<RouterLink
													:id="submenu.MENU_ID"
													:to="
														'/' +
														menu.MENU_SLUG +
														'/' +
														submenu.SUBMENU_URL
													"
													v-if="
														menu.TYPE == 'EXTERNAL'
													"
													class="title refresh"
													>{{
														$t(
															submenu.SUBMENU_TITLE
														)
													}}
												</RouterLink>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ol>
						<ol
							v-if="
								appComponent.typeUser != '' &&
								appComponent.typeUser != undefined &&
								appComponent.typeUser == 'U'
							"
							style="width: 100%; display: flex"
						>
							<li
								v-for="value in config.MENU_USUARIO_LOGUEADO[
									appComponent.country
								]"
								class="main-item menu-home selected px-0 lg:px-5"
							>
								<RouterLink
									v-if="value.TARGER == undefined"
									:id="value.MENU_ID"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_TITLE
										)
									"
									:to="value.MENU_URL"
									:aria-label="value.MENU_ID"
									v-bind="analyticsAttrs(value.MENU_ID === 'accion_depositar' ? 'header:deposit-btn' : `header:menu:${value.MENU_URL.split('/')[1]}`)"
									class="menu-item align-middle text-center text-neutral"
									v-bind:class="{
										'shadow-clip': value.SHADOW == 1,
										'bg-success': value.MENU_ID == 'accion_depositar'
									}"
								>
									<div>
										<IconHouse
											v-if="
												value.MENU_TITLE == 'HOME' ||
												(value.MENU_TITLE == 'INICIO' &&
													config.menu.desktopIcons !==
														true)
											"
											:width="'12px'"
											:height="'12px'"
											:fill="'currentColor'"
										></IconHouse>
										<div
											v-if="value.ICON != undefined"
											class="svg"
											v-html="value.ICON"
										></div>
									</div>
									<span
										v-if="
											value.SUB_MENU == undefined ||
											value.SUB_MENU == ''
										"
										class="menu-item_Center text-center"
									>
										{{ $t(value.MENU_TITLE) }}</span
									>
									<div
										class="text-[11px] font-sans uppercase text-center text-neutral flex justify-center"
										v-if="value.MENU_TITLE == 'DEPOSITAR'"
									>
									</div>
									<div
										class="dropdown dropdown-hover text-center cursor-pointer h-full w-full"
										v-if="
											value.SUB_MENU != undefined &&
											value.SUB_MENU != ''
										"
									>
										<label
											tabindex="0"
											class="text-center flex items-center justify-center h-full w-full"
											>{{ $t(value.MENU_TITLE) }}</label
										>
										<ul
											tabindex="0"
											class="dropdown-content menu p-2 shadow bg-primary-content rounded-box w-auto text-break break-words"
										>
											<li v-for="item in value.SUB_MENU">
												<RouterLink
													:id="item.MENU_ID"
													@click="
														appComponent.gAnalytics(
															'menu_top',
															'accion_iniciarsesion'
														)
													"
													:to="item.MENU_URL"
													>{{ $t(item.MENU_TITLE) }}
												</RouterLink>
											</li>
										</ul>
									</div>
								</RouterLink>
								<a
									class="menu-item align-middle text-center text-neutral"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_TITLE
										)
									"
									:id="value.MENU_ID"
									v-if="
										value.TARGER !== undefined &&
										value.TARGER == 'blank'
									"
									:aria-label="value.MENU_TITLE"
									:href="value.MENU_URL"
									target="_blank"
									:class="value.MENU_SECCION"
									>{{ $t(value.MENU_TITLE) }}</a
								>
								<a
									class="menu-item align-middle text-center text-neutral"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											value.MENU_TITLE
										)
									"
									:id="value.MENU_ID"
									v-if="
										value.TARGER !== undefined &&
										value.TARGER == '_top'
									"
									:aria-label="value.MENU_TITLE"
									:href="value.MENU_URL"
									target="_top"
									:class="value.MENU_SECCION"
									>{{ $t(value.MENU_TITLE) }}</a
								>
								<div
									v-if="
										value.MENU_ID ==
											'accion_casinoenvivo' &&
										config.menu.casinoEnabled
									"
									id="dropdown-casino"
									class="z-10 dropdown-casino animated fadeInDown"
									style="animation-duration: 0.5s"
								>
									<ul class="text-center">
										<li
											v-for="value in config.MENU_USUARIO_CASINO"
											class="main-item menu-home selected"
										>
											<RouterLink
												v-bind:class="{
													active:
														appComponent.page ==
														value.MENU_URL,
												}"
												:id="value.MENU_ID"
												:aria-label="value.MENU_ID"
												:to="value.MENU_URL"
												class="menu-item align-middle text-center text-neutral"
											>
												<span
													:class="value.MENU_CLASS"
													class="menu-item_Center"
													>{{
														$t(value.MENU_TITLE)
													}}</span
												>
											</RouterLink>
										</li>
									</ul>
								</div>
								<div
									v-if="
										value.MENU_ID == 'accion_deportivas' &&
										config.menu.subMenuApuestas
									"
									id="dropdown-casino"
									class="z-10 dropdown-casino animated fadeInDown"
									style="animation-duration: 0.5s"
								>
									<ul class="text-center">
										<span>
											<li
												v-for="value in config.MENU_USUARIO_APUESTAS"
												class="main-item menu-home selected"
											>
												<RouterLink
													v-bind:class="{
														active:
															appComponent.page ==
															value.MENU_URL,
													}"
													:id="value.MENU_ID"
													:aria-label="value.MENU_ID"
													:to="value.MENU_URL"
													class="menu-item align-middle text-center text-neutral"
												>
													<span
														:class="
															value.MENU_CLASS +
															'menu-item_Center'
														"
														>{{
															$t(value.MENU_TITLE)
														}}</span
													>
												</RouterLink>
											</li>
										</span>
									</ul>
								</div>
							</li>
							<li
								style="z-index: 40 !important; display: block"
								class="menu-serv pointer-events-auto dropdown dropdown-hover pl-2"
							>
								<a
									id="accion_servicios"
									v-bind="analyticsAttrs('header:services')"
									style="vertical-align: middle"
								>
									<span
										class="nav-label dropdown-toggle inline-flex text-neutral"
										>{{ $t('Servicios ')
										}}<font-awesome-icon
											class="ml-2"
											icon="fa-solid fa-chevron-down"
									/></span>
								</a>
								<ul
									class="bg-base-300 dropdown-content absolute hidden text-neutral p-0 pl-0 shadow-md"
									style="padding-left: 0px !important"
								>
									<li
										v-for="menu in appComponent.menus_service"
										class="whitespace-no-wrap text-left hover:bg-base-100"
									>
										<div
											class="dropdown dropdown-left dropdown-hover"
										>
											<a
												:id="menu.MENU_ID"
												v-bind="analyticsAttrs(`header:services:${menu.MENU_SLUG}`)"
												class="block whitespace-no-wrap dropdown-toggle p-1"
											>
												<span class="nav-label">{{
													$t(menu.MENU_TITLE)
												}}</span
												><span class="caret"></span>
											</a>
											<ul
												v-if="
													menu.SUBMENUS !=
														undefined &&
													menu.SUBMENUS != ''
												"
												class="bg-base-300 dropdown-content absolute hidden text-neutral ml-24 -mt-1 p-0 w-52 shadow-md"
												style="
													padding-left: 0px !important;
												"
											>
												<li
													v-for="submenu in menu.SUBMENUS"
													class="hover:bg-base-100 whitespace-no-wrap text-left capitalize"
												>
													<RouterLink
														:id="submenu.MENU_ID"
														@click="
															appComponent.gAnalytics(
																'menu_top',
																submenu.SUBMENU_TITLE
															)
														"
														:to="
															'/' +
															menu.MENU_SLUG +
															'/' +
															submenu.SUBMENU_URL
														"
														v-if="
															menu.TYPE !=
															'EXTERNAL'
														"
														v-bind="analyticsAttrs(`header:services:${menu.MENU_SLUG}-${submenu.SUBMENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
														class="title refresh"
														>{{
															$t(
																submenu.SUBMENU_TITLE
															)
														}}
													</RouterLink>
													<RouterLink
														:id="submenu.MENU_ID"
														@click="
															appComponent.gAnalytics(
																'menu_top',
																submenu.SUBMENU_TITLE
															)
														"
														:to="
															'/' +
															menu.MENU_SLUG +
															'/' +
															submenu.SUBMENU_URL
														"
														v-if="
															menu.TYPE ==
															'EXTERNAL'
														"
														class="title refresh"
														>{{
															$t(
																submenu.SUBMENU_TITLE
															)
														}}
													</RouterLink>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</li>
						</ol>
						<li
							style="
								max-width: 60px;
								vertical-align: top;
								font-size: 1em;
							"
							v-for="value in config.MENU_USUARIO_SEGUNDO"
							class="main-item menu-home selected"
						>
							<RouterLink
								:to="value.MENU_URL"
								:aria-label="value.MENU_TITLE"
								class="menu-item align-middle text-center text-neutral"
							>
								<span class="menu-item_Center">
									{{ $t(value.MENU_TITLE) }}
								</span>
							</RouterLink>
						</li>
					</div>
				</div>
			</div>
			<!-- Conditional column based on menu configuration -->
			<div
				v-if="
					config.menu_ !== undefined &&
					config.menu_.full_width !== undefined
						? !config.menu_.full_width
						: !config.menu.styleFullWidth
				"
				class="col flex-1"
			></div>
		</div>
	</div>
</template>

<style scoped>
header {
	height: 113px; /* Set header height */
	background-image: none !important; /* Remove background image */
}

.header .menu-bg > .menu.polygon::before {
	content: ''; /* Before pseudo-element for polygon effect */
	height: 41px; /* Height of the pseudo-element */
	width: 20px; /* Width of the pseudo-element */
	position: absolute; /* Position absolutely */
	left: -1px;   
    bottom: 0;
	background: inherit;
	clip-path: polygon(
		100% 0,
		0 100%,
		100% 100%
	); /* Clip path for polygon shape */
}

.header .menu-bg > .menu.polygon::after {
	content: ''; /* After pseudo-element for polygon effect */
	height: 41px; /* Height of the pseudo-element */
	width: 20px; /* Width of the pseudo-element */
	position: absolute; /* Position absolutely */
	background: inherit;
	clip-path: polygon(
		0 0,
		0 100%,
		100% 100%
	); /* Clip path for polygon shape */
	right: -20px;  
    bottom: 0;
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(12),
.header .menu .menu-list div ol > li:first-child:nth-last-child(12) ~ li {
	width: calc(
		(100% / 11) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(11),
.header .menu .menu-list div ol > li:first-child:nth-last-child(11) ~ li {
	width: calc(
		(100% / 10) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(10),
.header .menu .menu-list div ol > li:first-child:nth-last-child(10) ~ li {
	width: calc(
		(100% / 9) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(9),
.header .menu .menu-list div ol > li:first-child:nth-last-child(9) ~ li {
	width: calc(
		(100% / 8) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(8),
.header .menu .menu-list div ol > li:first-child:nth-last-child(8) ~ li {
	width: calc(
		(100% / 7) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(7),
.header .menu .menu-list div ol > li:first-child:nth-last-child(7) ~ li {
	width: calc(
		(100% / 6) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(6),
.header .menu .menu-list div ol > li:first-child:nth-last-child(6) ~ li {
	width: calc(
		(100% / 5) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(5),
.header .menu .menu-list div ol > li:first-child:nth-last-child(5) ~ li {
	width: calc(
		(100% / 4) - 0px
	) !important; /* Set width for specific menu items */
}

.header .menu ol > li:nth-child(1) {
	padding-left: 20px !important; /* Padding for the first menu item */
}

.header .menu .menu-list div ol > li {
	height: 40px; /* Height of menu items */
	line-height: 15px; /* Line height for text */
	font-size: 14px; /* Font size for menu items */
	font-weight: bold; /* Bold font weight */
	display: inline-table; /* Display as inline-table */
	z-index: 2; /* Z-index for stacking */
	text-transform: uppercase; /* Uppercase text transformation */
	padding: 0 15px; /* Padding for menu items */
}

.menu .menu-list > div > ol > li > a {
	display: table-cell; /* Display as table-cell */
	height: 40px; /* Height of links */
	padding: 0; /* No padding for links */
}

.header .menu-bg > .menu {
	text-align: right; /* Align text to the right */
}

.header .menu .menu-list div ol li.login {
	padding-right: 40px; /* Padding for login item */
	clip-path: polygon(
		0% 0%,
		80% 0%,
		100% 100%,
		20% 100%
	); /* Clip path for login item */
	padding-left: 33px; /* Padding for login item */
	background: linear-gradient(
		to right,
		#b1b1b7 0%,
		#444444 100%
	); /* Background gradient for login item */
}

.header .menu .menu-list {
	margin: 0; /* No margin for menu list */
}

.header .menu .menu-list > div > ol > li.main-item {
	-webkit-line-clamp: 2; /* Limit lines to 2 */
	-webkit-box-orient: vertical; /* Vertical orientation for clamping */
	width: 100%; /* Full width for main items */
}

.header .menu .menu-list div ol li a#accion_casinoenvivo {
	min-width: 60px; /* Minimum width for specific link */
}

.menu :where(li) {
	flex-shrink: 1 !important; /* Prevent flex items from shrinking */
	position: static !important; /* Static positioning */
}

.menu-home .active {
	color: #ffc300; /* Active menu item color */
}

.dropdown-casino ul li {
	display: inline-block; /* Display dropdown items inline */
	margin: 0 15px; /* Margin for dropdown items */
	text-align: center; /* Center text in dropdown */
	height: 30px; /* Height for dropdown items */
}

.dropdown-casino ul li a {
	height: 30px; /* Height for dropdown links */
}

.dropdown-casino {
	position: absolute; /* Absolute positioning for dropdown */
	top: 100%; /* Position below the parent */
	float: left; /* Float to the left */
	width: 100%; /* Full width for dropdown */
	left: 0%; /* Align to the left */
	background: white; /* White background for dropdown */
	color: black; /* Black text color */
	height: 35px; /* Height for dropdown */
	border-radius: 0 0 50px 50px; /* Rounded corners for dropdown */
	display: none !important; /* Hidden by default */
	z-index: 10; /* Z-index for stacking */
}

.casino-down:hover .dropdown-casino {
	display: block !important; /* Show dropdown on hover */
}

.casino-down .dropdown-casino {
	pointer-events: all; /* Enable pointer events for dropdown */
}

.casino-down .dropdown-casino a {
	color: black !important; /* Black text color for dropdown links */
}

@media screen and (min-width: 1200px) and (max-width: 1270px) {
	.dropdown-casino {
		width: 110%; /* Adjust width for specific screen sizes */
		left: -5%; /* Adjust left position */
	}
}

.header .menu .menu-list div ol > li:first-child:nth-last-child(10),
.header .menu .menu-list div ol > li:first-child:nth-last-child(10) ~ li {
	z-index: 2 !important; /* Z-index for specific menu items */
}

.menu-top {
	position: sticky !important; /* Sticky positioning for top menu */
	top: 36px; /* Distance from the top */
}

@keyframes fadeInDown {
	from {
		opacity: 0; /* Start with opacity 0 */
		transform: translate3d(0, -100%, 0); /* Start from above */
	}
	to {
		opacity: 1; /* End with full opacity */
		transform: none; /* No transformation */
	}
}

.fadeInDown {
	animation-name: fadeInDown; /* Animation name for fade in effect */
}

@media (max-width: 810px) {
	header {
		height: 46px; /* Adjust header height for smaller screens */
	}
}

.svg {
	enable-background: new 0 0 481.045 481.045; /* Enable background for SVG */
	width: 22px !important; /* Width for SVG */
	height: 25px !important; /* Height for SVG */
	margin-top: -25px; /* Negative margin for positioning */
	position: absolute; /* Absolute positioning for SVG */
	margin-left: -11px; /* Negative left margin for positioning */
}
</style>

<!-- FILE DOCUMENTED -->
