<template>
	<!-- Header component for the application -->
	<header
		class="w-full h-[58px] bg-base-300 p-4 tablet:px-8 desktop:px-16 desktop:py-2 fixed top-0 left-0 right-0 flex justify-center items-center shadow-md shadow-black z-[70] text-neutral"
	>
		<!-- Container for header content -->
		<div class="w-full flex justify-between items-center">
			<div
				class="w-full xl:max-w-[300px] h-full flex justify-between items-center xl:gap-4"
			>
				<!-- Logo link to home or POS menu -->
				<RouterLink
					:to="appComponent.appPOS ? '/pos/menu' : '/home'"
					class="hover:scale-110 transition-all duration-500 ease-in-out"
					v-bind="analyticsAttrs('header:logo')"
				>
					<img
						:src="appComponent.config.logo_['light']"
						alt="logo"
						class="h-[40px] w-[138px] desktop:w-[115px] object-contain object-center"
					/>
				</RouterLink>
				<!-- Switch button component, visible if not in POS mode -->
				<SiwtchButton v-if="!appComponent.appPOS" />
			</div>
			<!-- Navigation menu, visible on extra-large screens -->
			<div class="hidden xl:flex justify-end items-center gap-1 w-full">
				<ul class="flex justify-center items-center gap-1">
					<!-- Menu items loop -->
					<li v-for="(item, i) in menuList">
						<!-- Router link for menu items without a target -->
						<RouterLink
							v-if="item.TARGER == undefined"
							:key="i"
							:to="appComponent.config.baseUrlFx + item.MENU_URL"
							:id="item.MENU_ID"
							v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
							class="rounded-xl flex justify-center gap-1 items-center hover:bg-accent-content p-2"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[20px] h-[20px] aspect-square object-contain"
							/>
							<span
								class="text-xs leading-4 text-center font-normal w-auto max-w-[110px] capitalize"
							>
								{{ item.MENU_TITLE }}
							</span>
						</RouterLink>
						<!-- External link for menu items with target 'blank' -->
						<a
							v-if="item.TARGER == 'blank'"
							:href="item.MENU_URL"
							target="_blank"
							:title="item.MENU_TITLE"
							v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
							@click="
								appComponent.gAnalytics(
									'menu_top',
									item.MENU_ID
								);
								openSportBook(item);
							"
							class="rounded-xl flex justify-center gap-1 items-center hover:bg-accent-content p-2"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[20px] h-[20px] aspect-square object-contain"
							/>
							<span
								class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]"
							>
								{{ item.MENU_TITLE }}
							</span>
						</a>
						<!-- Top link for menu items with target 'top' -->
						<a
							v-else-if="item.TARGER == 'top'"
							:id="item.MENU_ID"
							class="rounded-xl flex justify-center gap-1 items-center hover:bg-accent-content p-2"
							:href="item.MENU_URL"
							target="_top"
							:title="item.MENU_TITLE"
							@click="openSportBook(item)"
							v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[20px] h-[20px] aspect-square object-contain"
							/>
							<span
								class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]"
							>
								{{ item.MENU_TITLE }}
							</span>
						</a>
						<!-- Button for menu items with target 'chat' -->
						<button
							v-else-if="item.TARGER == 'chat'"
							id="accion_chat"
							class="rounded-xl flex justify-center gap-1 items-center hover:bg-accent-content p-2"
							@click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
							v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[20px] h-[20px]aspect-square object-contain"
							/>
							<span
								class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]"
							>
								{{ item.MENU_TITLE }}
							</span>
						</button>
					</li>
				</ul>

				<!-- Router link for registration, visible if the user is not logged in -->
				<RouterLink
					v-if="!appComponent.session.logueado"
					to="/registro"
					v-bind="analyticsAttrs('header:signup-btn')"
					class="w-full max-w-[110px] h-full desktop:h-[31px] bg-success relative hover:bg-success/80 rounded-xl flex justify-center items-center text-sm font-normal border border-neutral shadow-inner shadow-neutral-content/50"
				>
					<!-- Registration icon -->
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
						alt=""
						class="absolute top-[2px] left-[1px]"
					/>
					<!-- Registration text -->
					{{ $t('Regístrate') }}
				</RouterLink>

				<!-- Router link for messages, visible if the user is logged in -->
				<RouterLink
					v-else
					to="/mensajes"
					@click="appComponent.gAnalytics('send_mail')"
					v-bind="analyticsAttrs('header:inbox')"
					class="relative h-[40px] w-[40px] aspect-square bg-secondary hover:bg-secondary/80 rounded-xl z-20 flex justify-center items-center text-lg font-normal border-2 border-accent-focus gap-2"
				>
					<!-- Unread messages indicator -->
					<span
						v-if="appComponent.mensajesUnread > 0"
						class="absolute blob -top-0 -right-0 w-4 h-4 bg-[#D21817] rounded-full text-xs text-neutral flex justify-center items-center"
					></span>
					<!-- Messages icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 18 15"
						fill="none"
					>
						<g opacity="0.5" clip-path="url(#clip0_391_499)">
							<path
								d="M18 3.73392C18 4.28113 18 4.79937 18 5.31761C18 7.7704 18 10.2232 18 12.676C18 13.9893 17.0999 14.9968 15.934 14.9968C15.1024 14.9968 14.2708 14.9871 13.4364 14.9871C10.9074 14.9871 8.37847 14.9936 5.84664 14.9968C4.59216 14.9968 3.33767 14.9968 2.08319 14.9968C1.06303 14.9968 0.282902 14.3015 0.0457215 13.1846C0.014288 13.0365 0 12.882 0 12.7275C0 10.603 0 8.47855 0 6.35731C0 5.49465 0 4.63199 0 3.74357C0.0428639 3.77576 0.0800127 3.79508 0.108589 3.82405C1.20019 4.83478 2.29179 5.84872 3.38625 6.85945C4.475 7.86696 5.55231 8.89057 6.6582 9.87555C8.00984 11.0794 10.0102 11.073 11.3589 9.85945C12.5849 8.7586 13.7879 7.62233 15.0024 6.49894C15.9654 5.60731 16.9255 4.71568 17.8885 3.82726C17.9171 3.80151 17.9486 3.77898 18.0029 3.73392H18Z"
								fill="white"
							/>
							<path
								d="M17.7598 1.22961C17.3883 1.57725 17.0254 1.91201 16.6654 2.24999C15.7595 3.09012 14.8508 3.93025 13.9421 4.76716C13.5534 5.12446 13.1591 5.47531 12.7733 5.83583C11.9646 6.58583 11.1616 7.33905 10.3558 8.08905C9.51852 8.86802 8.49264 8.86802 7.64965 8.08905C6.83524 7.33905 6.02368 6.58583 5.21212 5.83261C3.59186 4.33583 1.97446 2.83583 0.357065 1.34227C0.265622 1.25858 0.251334 1.20064 0.317059 1.08476C0.725695 0.379821 1.30579 0.00643035 2.04876 -7.42218e-06C4.62917 -0.00644519 7.20958 -7.42218e-06 9.78999 -7.42218e-06C11.8303 -7.42218e-06 13.8706 -0.00644519 15.911 -7.42218e-06C16.7282 -7.42218e-06 17.3369 0.418447 17.7598 1.22961Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_391_499">
								<rect width="18" height="15" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</RouterLink>

				<!-- Button for login, visible if the user is not logged in -->
				<button
					v-if="!appComponent.session.logueado"
					@click="appComponent.showModalLogin = true"
					v-bind="analyticsAttrs('header:login-btn')"
					class="w-full max-w-[110px] h-full desktop:h-[31px] bg-secondary relative hover:bg-secondary/80 rounded-xl flex justify-center items-center text-sm font-normal border border-accent-focus"
				>
					<!-- Login icon -->
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
						alt=""
						class="absolute top-[2px] left-[1px]"
					/>
					<!-- Login text -->
					{{ $t('Iniciar sesión') }}
				</button>

				<!-- Container for user balance and profile actions, visible if the user is logged in -->
				<div
					v-else
					class="relative bg-accent-content rounded-lg px-2 h-[58px] flex flex-col justify-start items-start mx-2"
				>
					<!-- Inner container for balance and profile actions -->
					<div
						class="flex justify-center items-center gap-2 h-full w-full"
					>
						<div
							class="w-[65%] flex justify-between flex-col items-center gap-1"
						>
							<!-- Display user balance -->
							<span
								class="w-full text-sm text-neutral flex gap-1 justify-center items-center"
							>
								<span>{{ $t('Saldo:') }}</span>
								<!-- Coin icon -->
								<img
									src="https://images.virtualsoft.tech/m/msj23212T1712596594.png"
									alt="coin-icon"
									class="aspect-square w-[16px]"
								/>
								<!-- User balance amount -->
								<span
									class="w-full text-neutral text-sm font-bold"
									>{{
										appComponent.session.simbolo_moneda !=
											null &&
										appComponent.session.simbolo_moneda !=
											undefined
											? appComponent.session
													.simbolo_moneda +
												Math.abs(
													parseFloat(
														appComponent.saldo_total
													)
												).toFixed(2)
											: '$' +
												Math.abs(
													parseFloat(
														appComponent.saldo_total
													)
												).toFixed(2)
									}}</span
								>
								<!-- Button to refresh balance -->
								<button
									id="refreshBalance"
									@click="onRefreshBalance()"
									v-bind="analyticsAttrs('header:balance:refresh-main-balance')"
									class="hover:scale-105 w-5"
								>
									<font-awesome-icon
										class="fa-refresh text-neutral text-sm cursor-pointer"
										icon="fa-solid fa-refresh"
									/>
								</button>
							</span>
							<!-- Button to open deposit modal -->
							<button
								@click="
									appComponent.showModalDepositV2 = true;
									onMenuProfile = false;
								"
								v-bind="analyticsAttrs('header:deposit-btn')"
								class="w-full h-[21px] bg-success hover:bg-success/80 rounded border z-20 flex justify-center items-center text-sm font-normal gap-2 shadow-inner shadow-neutral/25 hover:scale-105"
							>
								{{ $t('Depositar') }}
							</button>
						</div>
						<!-- Button to toggle profile menu -->
						<button
							@click="onMenuProfile = !onMenuProfile"
							v-bind="analyticsAttrs('header:user-menu')"
							class="border aspect-square w-[50px] h-[50px] flex justify-center items-center rounded-lg border-success p-[2px] cursor-pointer hover:scale-110"
						>
							<!-- User avatar icon -->
							<img
								src="https://images.virtualsoft.tech/m/msj23212T1712596241.png"
								alt="avatar-icon"
								class="rounded-lg w-full h-full"
							/>
						</button>
					</div>
					<div
						id="viewSaldo"
						v-if="onMenuProfile"
						class="bg-base-300 rounded-xl border p-4 flex flex-col justify-start items-start gap-3 absolute -bottom-[225px] right-0 z-10"
					>
						<!-- Container for user information and avatar -->
						<div
							class="w-full flex justify-center items-center gap-2"
						>
							<!-- User information section -->
							<div
								class="w-full text-sm font-bold text-neutral flex flex-col gap-1 justify-center items-end"
							>
								<!-- Display user name -->
								<span
									class="w-full text-xl font-semibold text-warning leading-4 text-right min-w-[150px]"
								>
									{{ appComponent.session.nombre }}
								</span>
								<!-- Display user ID -->
								<span class="text-lg font-light text-neutral">
									ID:
									{{ appComponent.session.usuario }}
								</span>
								<!-- Display user country flag -->
								<span
									:class="
										'scale-150 country-flags ' +
										appComponent.country
									"
								></span>
							</div>
							<!-- User avatar section -->
							<div
								class="border border-primary-content aspect-square w-[125px] flex justify-center items-center rounded-box p-1 cursor-pointer hover:scale-110"
							>
								<img
									src="https://images.virtualsoft.tech/m/msj23212T1712596241.png"
									alt="avatar-icon"
									class="rounded-box w-full aspect-square object-cover"
								/>
							</div>
						</div>

						<!-- Container for service menu buttons -->
						<div
							class="w-full flex items-center justify-center gap-4"
						>
							<!-- Loop through each service menu item -->
							<div
								v-for="menu in appComponent.menus_service"
								:tabindex="menu.MENU_ID"
								class="relative"
								:class="'titleService-' + menu.MENU_ID"
							>
								<!-- Button for each service menu item -->
								<button
									@click="menuService(menu.MENU_ID)"
									v-bind="analyticsAttrs(`header:user-menu:${menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
									class="w-[120px] h-[40px] bg-input-background hover:bg-primary-content/80 rounded z-30 flex justify-center items-center text-lg font-light shadow-inner shadow-neutral/50 gap-2"
								>
									{{ $t(menu.MENU_TITLE) }}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="7"
										viewBox="0 0 12 7"
										fill="none"
									>
										<path
											d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989592 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989592 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
											fill="white"
										/>
									</svg>
								</button>
								<!-- Dropdown for submenus, if available -->
								<div
									v-if="
										menu.SUBMENUS != undefined &&
										menu.SUBMENUS != ''
									"
									:id="'dropdown' + menu.MENU_ID + '-mobile'"
								>
									<ul
										:id="
											'menuServiceDesktop-' + menu.MENU_ID
										"
										style="display: none"
										class="absolute bg-input-background h-72 overflow-y-scroll border rounded-b-md z-30"
									>
										<!-- Loop through each submenu item -->
										<li
											v-for="(
												submenu, index
											) in menu.SUBMENUS"
											:key="index"
										>
											<!-- Router link for each submenu item -->
											<RouterLink
												tabindex="0"
												:id="submenu.MENU_ID"
												:to="
													'/' +
													menu.MENU_SLUG +
													'/' +
													submenu.SUBMENU_URL
												"
												v-bind="analyticsAttrs(`header:user-menu:${menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}-${submenu.SUBMENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
												class="text-neutral text-base px-2 py-3 grid hover:scale-105"
												:class="
													'collection-item avatar-refresh ' +
													submenu.SUBMENU_URL.replace(
														'.php',
														''
													)
												"
												@click="
													menuService(menu.MENU_ID);
													onMenuProfile = false;
												"
												>{{ $t(submenu.SUBMENU_TITLE) }}
											</RouterLink>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div
							class="w-full flex items-center justify-center gap-4"
						>
							<div
								tabindex="76586758"
								class="titleService-76586758 relative"
							>
								<button
									@click="menuService('76586758')"
									class="mx-auto w-[256px] px-4 h-[40px] bg-input-background hover:bg-primary-content/80 rounded z-20 flex justify-between items-center text-lg font-light shadow-inner shadow-neutral/50 gap-2"
								>
									<img
										src="https://images.virtualsoft.tech/m/msj-1212T1714083446.png"
										alt="coin-icon"
										class="aspect-square w-[16px]"
									/>
									<div
										class="flex justify-center items-center gap-2 text-xl font-[500]"
									>
										<span>{{ $t('Saldo') }}</span>
										<span class="w-full">{{
											appComponent.session
												.simbolo_moneda != null &&
											appComponent.session
												.simbolo_moneda != undefined
												? appComponent.session
														.simbolo_moneda +
													Math.abs(
														parseFloat(
															appComponent.saldo_total
														)
													).toFixed(2)
												: '$' +
													Math.abs(
														parseFloat(
															appComponent.saldo_total
														)
													).toFixed(2)
										}}</span>
										<button
											id="refreshBalance"
											@click="onRefreshBalance()"
											v-bind="analyticsAttrs('header:user-menu:refresh-main-balance')"
											class="hover:scale-105 w-5"
										>
											<font-awesome-icon
												class="fa-refresh text-neutral text-lg cursor-pointer"
												icon="fa-solid fa-refresh"
											/>
										</button>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="7"
										viewBox="0 0 12 7"
										fill="none"
									>
										<path
											d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989592 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989592 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
											fill="white"
										/>
									</svg>
								</button>
								<div :id="'dropdown76586758-mobile'">
									<ul
										id="menuServiceDesktop-76586758"
										style="display: none"
										class="absolute bg-input-background overflow-y-scroll border rounded-b-md w-full"
									>
										<li
											class="w-full flex justify-start items-start gap-2 px-4 py-3"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
											>
												<g opacity="0.5">
													<path
														d="M16.996 9.9975C16.9478 9.9975 16.907 9.9975 16.8643 9.9975C15.7775 9.9975 14.6888 9.9975 13.602 10.0035C13.3961 10.0035 13.1865 10.0234 12.9862 10.0732C12.3501 10.2345 11.9977 10.6966 11.8642 11.3619C11.8197 11.577 11.7974 11.8021 11.7956 12.0231C11.7881 12.7561 11.7881 13.4911 11.7993 14.2241C11.8141 15.2598 12.4855 15.9788 13.4518 15.9888C14.585 16.0007 15.7181 15.9928 16.8532 15.9948C16.8958 15.9948 16.9366 15.9948 16.9867 15.9948C16.9904 16.0346 16.9941 16.0665 16.9941 16.0963C16.9941 17.1201 16.9923 18.1439 16.9867 19.1657C16.9849 19.6397 16.7308 19.9385 16.2894 19.9883C16.1391 20.0062 15.9871 19.9982 15.8368 19.9982C10.9647 19.9982 6.09066 19.9982 1.2185 19.9982C1.0182 19.9982 0.816045 19.9903 0.619452 19.9564C0.272633 19.8986 0.111279 19.7254 0.0463662 19.3569C0.0148372 19.1736 0.00185465 18.9844 0.00185465 18.7992C0 14.8833 0 10.9675 0 7.04967C0 6.91622 0.00927324 6.78078 0.031529 6.64932C0.094587 6.28682 0.298598 6.07768 0.637999 6.02191C0.728877 6.00598 0.821609 6 0.912487 6C5.97011 6 11.0259 6 16.0835 6C16.2226 6 16.3654 6.02191 16.5008 6.05975C16.7326 6.12349 16.8829 6.29478 16.9422 6.54176C16.9756 6.68119 16.996 6.82659 16.996 6.97C17.0016 7.94398 16.9997 8.91796 16.9997 9.89194C16.9997 9.92182 16.996 9.95368 16.9923 9.99551L16.996 9.9975Z"
														fill="white"
													/>
													<path
														d="M15.9712 14.9943C15.2923 14.9943 14.6153 14.9962 13.9364 14.9924C13.7968 14.9924 13.6554 14.9754 13.5215 14.9413C13.265 14.8788 13.1066 14.7046 13.0462 14.449C13.0198 14.3316 13.0047 14.2104 13.0028 14.0911C12.9991 13.3602 12.9991 12.6293 13.0028 11.8965C13.0028 11.7696 13.0198 11.6409 13.0481 11.5178C13.1066 11.2622 13.2687 11.0993 13.5252 11.0425C13.6421 11.016 13.7628 11.0008 13.8817 11.0008C15.3017 10.9989 16.7218 11.0008 18.1419 11.0008C18.2023 11.0008 18.2626 11.0046 18.3211 11.0141C18.7133 11.0728 18.9415 11.3057 18.9887 11.7033C18.9962 11.7658 19 11.8302 19 11.8946C19 12.6217 18.9962 13.3507 18.9925 14.0778C18.9925 14.1782 18.9849 14.2805 18.9679 14.3789C18.9038 14.7349 18.6888 14.9375 18.3267 14.983C18.2381 14.9943 18.1476 14.9981 18.057 15C17.363 15 16.6671 15 15.9731 15L15.9712 14.9943ZM15.7355 12.9947C15.7355 12.4797 15.3338 12.0802 14.8152 12.0821C14.3098 12.0821 13.8911 12.4986 13.8949 13.0023C13.8986 13.4984 14.3248 13.9301 14.8152 13.932C15.3149 13.932 15.7355 13.5041 15.7355 12.9966V12.9947Z"
														fill="white"
													/>
													<path
														d="M13.9963 5H4.00559C4.00559 5 4.00186 4.98411 4 4.97617C4.03356 4.96425 4.06711 4.95234 4.10067 4.94439C4.85943 4.77361 5.6182 4.60282 6.37696 4.43203C8.42394 3.9713 10.4709 3.50659 12.5198 3.04983C12.6857 3.0121 12.8609 2.9982 13.0306 3.00018C13.2655 3.00217 13.4519 3.12331 13.5638 3.34375C13.6346 3.48078 13.6905 3.63171 13.7297 3.78263C13.8248 4.16592 13.9049 4.55516 13.9925 4.94042C13.9963 4.95631 13.9963 4.97418 14 5H13.9963Z"
														fill="white"
													/>
												</g>
											</svg>
											<div
												class="w-full flex flex-col justify-center items-start"
											>
												<span
													class="text-lg flex justify-between items-center w-full"
												>
													{{ $t('Saldo recargas') }}
													<button
														id="refreshBalance"
														@click="
															onRefreshBalance()
														"
														v-bind="analyticsAttrs('header:user-menu:refresh-recharge-balance')"
														class="hover:scale-105 w-5"
													>
														<font-awesome-icon
															class="fa-refresh text-neutral text-lg cursor-pointer"
															icon="fa-solid fa-refresh"
														/>
													</button>
												</span>
												<span class="text-neutral/80">
													{{
														appComponent.session
															.moneda
													}}
													{{
														Math.abs(
															appComponent.saldo_recarga
														).toFixed(2)
													}}
												</span>
											</div>
										</li>
										<hr
											class="w-11/12 border-t border-neutral/80 mx-auto"
										/>
										<li
											class="w-full flex justify-start items-start gap-2 px-4 py-3"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
											>
												<g
													clip-path="url(#clip0_976_61)"
												>
													<path
														d="M10.6968 12.3617C10.6326 12.4156 10.4192 12.5793 10.1454 12.5737C9.82651 12.567 9.51783 12.3377 9.25113 11.9094C9.02183 11.5415 8.66799 11.4229 8.31381 11.5961C7.96173 11.7683 7.78464 12.1581 8.00865 12.5134C8.26442 12.9184 8.58474 13.3124 8.96186 13.6034C9.22115 13.8038 9.34145 13.965 9.34039 14.2829C9.33933 14.7239 9.61379 14.9863 10.0096 14.9923C10.4072 14.998 10.6958 14.7362 10.7007 14.3044C10.7039 14.0137 10.7794 13.868 11.0792 13.7527C11.9823 13.4052 12.5718 12.4552 12.5182 11.5344C12.4607 10.5424 11.8183 9.70243 10.8605 9.41986C10.5744 9.33555 10.2615 9.34295 9.96198 9.30097C9.45751 9.23042 9.08392 8.84448 9.07051 8.38728C9.05817 7.96536 9.37955 7.54661 9.82052 7.45454C10.3137 7.35153 10.6407 7.59106 10.8887 7.9964C11.1452 8.41621 11.5364 8.53121 11.9016 8.32096C12.237 8.12799 12.3767 7.6916 12.1086 7.32542C11.8257 6.93878 11.4609 6.59235 11.0736 6.30589C10.8524 6.14256 10.6958 6.04202 10.7 5.73616C10.7067 5.25144 10.4428 5.00379 10.01 5.00767C9.59721 5.0112 9.33933 5.24862 9.34145 5.70794C9.34286 6.02614 9.22538 6.16584 8.94069 6.30872C7.33555 7.11446 7.22196 9.36059 8.75231 10.2997C9.11285 10.5209 9.58345 10.6055 10.016 10.6648C10.7229 10.7615 10.8372 10.9446 10.9371 11.098C11.1657 11.4494 11.0676 12.0502 10.6965 12.3617H10.6968Z"
														fill="white"
														fill-opacity="0.5"
													/>
													<path
														d="M2.66819 5.09834C2.95571 5.14455 3.24498 5.03166 3.4249 4.80483C3.6983 4.45946 4.00063 4.13314 4.33013 3.83081C5.9088 2.38054 7.95209 1.5882 10.1178 1.5942C12.4539 1.60055 14.6908 2.56751 16.2886 4.2559C17.2425 5.26379 17.9184 6.4657 18.2782 7.76957C18.3731 8.11282 18.6867 8.35165 19.0462 8.35165H19.0625C19.5853 8.35165 19.9698 7.86023 19.8319 7.36034C19.7147 6.93525 19.5687 6.51685 19.3937 6.10728C18.8854 4.9163 18.1576 3.84704 17.2308 2.92876C16.3041 2.01048 15.2246 1.28975 14.0227 0.785988C12.7777 0.264583 11.4559 0 10.0934 0C8.73102 0 7.40917 0.264583 6.16422 0.786341C4.96195 1.29011 3.8828 2.01083 2.95606 2.92911C2.6689 3.2138 2.40079 3.51296 2.15243 3.82587C1.77637 4.29965 2.05048 4.99885 2.65091 5.09551C2.65655 5.09657 2.66255 5.09728 2.66819 5.09834Z"
														fill="white"
														fill-opacity="0.5"
													/>
													<path
														d="M19.2031 11.0666H19.1868C18.8083 11.0666 18.4827 11.3309 18.4069 11.6981C18.0777 13.2958 17.2847 14.7644 16.094 15.9441C14.4914 17.532 12.3606 18.4062 10.094 18.4062C7.82742 18.4062 5.69665 17.5316 4.09398 15.9441C2.61725 14.4812 1.75189 12.574 1.62489 10.5269C1.57021 9.64282 1.65735 8.76546 1.87431 7.92444C1.9946 7.45913 1.67181 6.99417 1.18956 6.94231C1.18392 6.9416 1.17863 6.94125 1.17298 6.94055C0.775404 6.89751 0.407105 7.14974 0.30868 7.53356C0.103717 8.33437 0 9.15951 0 9.99983C0 11.3496 0.267052 12.6591 0.793396 13.8924C1.30175 15.0834 2.02953 16.1526 2.95627 17.0709C3.88302 17.9892 4.96252 18.7099 6.16443 19.2137C7.40938 19.7354 8.73159 20 10.0937 20C11.4557 20 12.7779 19.7354 14.0229 19.2137C15.2248 18.7099 16.3043 17.9892 17.2311 17.0709C18.1578 16.1526 18.8856 15.0834 19.3939 13.8924C19.6539 13.2831 19.8504 12.6552 19.9831 12.0128C20.084 11.5238 19.7061 11.0663 19.2024 11.0663L19.2031 11.0666Z"
														fill="white"
														fill-opacity="0.5"
													/>
													<path
														d="M19.3978 9.08472C19.1043 9.08367 18.8107 9.08296 18.5172 9.08226C18.1055 9.08155 17.6935 9.08155 17.2818 9.08155C16.7131 9.08155 16.1441 9.08226 15.5754 9.08226C15.4498 9.08226 15.3246 9.08226 15.1038 9.08226C15.3581 8.77005 15.5412 8.55168 15.7179 8.32731C15.991 7.98053 15.9998 7.63128 15.7476 7.38504C15.508 7.15115 15.2036 7.18749 14.9369 7.50322C14.4479 8.08213 13.9625 8.66492 13.4845 9.25547C13.1928 9.61565 13.2062 9.91904 13.5254 10.2588C14.0412 10.8077 14.563 11.3496 15.0872 11.8882C15.3669 12.1754 15.682 12.1821 15.9035 11.9225C16.1226 11.6656 16.0986 11.303 15.8315 11.0098C15.6319 10.7904 15.4209 10.5833 15.2149 10.371C15.2258 10.3364 15.2364 10.3018 15.2473 10.2672C15.3775 10.2672 15.5077 10.2672 15.6379 10.2672C16.1981 10.2672 16.7583 10.2669 17.3185 10.2665C17.7281 10.2665 18.138 10.2665 18.5476 10.2665C18.8273 10.2665 19.1071 10.2669 19.3868 10.2676C19.6867 10.2683 19.9227 10.1702 19.9865 9.80298C20.0624 9.3673 19.8359 9.08578 19.3985 9.08402L19.3978 9.08472Z"
														fill="white"
														fill-opacity="0.5"
													/>
												</g>
												<defs>
													<clipPath id="clip0_976_61">
														<rect
															width="20"
															height="20"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
											<div
												class="flex flex-col justify-center items-start"
											>
												<span class="text-lg">
													{{ $t('Saldo retiro') }}
												</span>
												<span class="text-neutral/80">
													{{
														appComponent.session
															.moneda
													}}
													{{
														Math.abs(
															appComponent.saldo_retiro
														).toFixed(2)
													}}
												</span>
											</div>
										</li>
										<hr
											class="w-11/12 border-t border-neutral/80 mx-auto"
										/>
										<li
											class="w-full flex justify-start items-start gap-2 px-4 py-3"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
											>
												<g
													clip-path="url(#clip0_976_72)"
												>
													<path
														d="M1.71661e-05 5.62085V10.7266C0.023653 10.7894 0.0508156 10.8508 0.0698662 10.915C0.265305 11.5715 0.593742 11.8184 1.27495 11.8184C3.77438 11.8184 6.27346 11.8184 8.77288 11.8184C8.87307 11.8184 8.97326 11.8184 9.10696 11.8184V4.55617H10.9047V11.8184H11.1933C13.7534 11.8184 16.3135 11.8139 18.8732 11.823C19.2775 11.8244 19.577 11.6622 19.7386 11.3186C19.8677 11.0434 19.9781 10.7298 19.9827 10.4313C20.0071 8.92955 20.0043 7.42742 19.9845 5.92565C19.981 5.65013 19.8914 5.3605 19.7781 5.10544C19.6067 4.71915 19.292 4.51948 18.8454 4.53077C18.2305 4.54629 17.6145 4.53465 16.9764 4.53465C17.0215 4.40765 17.0593 4.30358 17.0963 4.19916C17.8146 2.17774 16.2687 -0.0496924 14.1273 0.00922136C12.3003 0.0596685 10.9746 0.989942 10.1141 2.59331C10.0799 2.65717 10.0439 2.71996 9.99455 2.80921C9.95645 2.74007 9.93493 2.70444 9.91659 2.6674C9.22479 1.27075 8.1146 0.408565 6.59519 0.0773074C4.41255 -0.398589 2.45888 1.40375 2.76438 3.61672C2.80636 3.92117 2.91255 4.21715 2.99333 4.53465C2.38373 4.53465 1.76884 4.54664 1.15466 4.53077C0.70804 4.51913 0.41065 4.7255 0.214153 5.10086C0.127722 5.26631 0.0705719 5.44728 0.000370026 5.6212L1.71661e-05 5.62085ZM11.231 4.53183C11.5658 3.68163 11.968 2.92422 12.6548 2.35237C13.1219 1.96361 13.6627 1.79075 14.2688 1.81474C14.9789 1.8426 15.5617 2.43845 15.573 3.15C15.5843 3.85732 15.0304 4.50995 14.3499 4.52548C13.3272 4.54911 12.3035 4.53147 11.231 4.53147V4.53183ZM8.76935 4.53571C7.74136 4.53571 6.75394 4.53888 5.76651 4.53465C5.07719 4.53147 4.50745 4.01077 4.42772 3.32286C4.35082 2.65964 4.79356 2.0197 5.45572 1.86201C5.98559 1.73607 6.49676 1.82849 6.95996 2.09872C7.89552 2.64447 8.36366 3.5437 8.769 4.53571H8.76935Z"
														fill="white"
														fill-opacity="0.5"
													/>
													<path
														d="M17.3926 20C17.9945 19.7682 18.192 19.3233 18.1811 18.6922C18.1539 17.1132 18.1719 15.5331 18.1719 13.9534V13.6514H10.9012C10.9012 13.7583 10.9012 13.8595 10.9012 13.9611C10.9012 15.8707 10.9012 17.7799 10.9005 19.6895C10.9005 19.7929 10.8895 19.8966 10.8835 20H17.3926Z"
														fill="white"
														fill-opacity="0.5"
													/>
													<path
														d="M9.11328 20C9.10728 19.8966 9.09635 19.7929 9.09635 19.6895C9.09529 17.7888 9.09564 15.888 9.09564 13.9873V13.6553H1.8249C1.8249 13.7428 1.8249 13.8352 1.8249 13.9273C1.8249 15.5155 1.84289 17.104 1.81608 18.6919C1.8055 19.3223 2.002 19.7682 2.60419 20H9.11328Z"
														fill="white"
														fill-opacity="0.5"
													/>
												</g>
												<defs>
													<clipPath id="clip0_976_72">
														<rect
															width="20"
															height="20"
															fill="white"
															transform="matrix(-1 0 0 1 20 -1.52588e-05)"
														/>
													</clipPath>
												</defs>
											</svg>
											<div
												class="flex flex-col justify-center items-start"
											>
												<span class="text-lg">
													{{
														$t(
															'Saldo freebets y bonos'
														)
													}}
												</span>
												<span class="text-neutral/80">
													{{
														appComponent.session
															.moneda
													}}
													{{
														Math.abs(
															appComponent.saldo_freebet +
																appComponent.saldo_bono
														).toFixed(2)
													}}
												</span>
											</div>
										</li>
										<hr
											v-if="
												appComponent.saldo_freeCasino !=
													undefined &&
												appComponent.saldo_freeCasino !=
													null &&
												appComponent.saldo_freeCasino !=
													'' &&
												appComponent.saldo_freeCasino >
													0
											"
											class="w-11/12 border-t border-neutral/80 mx-auto"
										/>
										<li
											v-if="
												appComponent.saldo_freeCasino !=
													undefined &&
												appComponent.saldo_freeCasino !=
													null &&
												appComponent.saldo_freeCasino !=
													'' &&
												appComponent.saldo_freeCasino >
													0
											"
											class="w-full flex justify-start items-start gap-2 px-4 py-3"
										>
											<svg
												width="20px"
												height="20px"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												class="stroke-neutral opacity-[0.5]"
											>
												<circle
													cx="12"
													cy="12"
													r="10"
													stroke-width="2"
												/>
												<path
													d="M15 9.94728C14.5 9.3 13.8 8.5 12 8.5C10.2 8.5 9 9.51393 9 9.94728C9 10.3806 9.06786 10.9277 10 11.5C10.7522 11.9618 12.6684 12.0439 13.5 12.5C14.679 13.1467 14.8497 13.8202 14.8497 14.0522C14.8497 14.6837 13.4175 15.4852 12 15.5C10.536 15.5153 9.5 14.7 9 14.0522"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
												<path
													d="M12 7V17"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<div
												class="flex flex-col justify-center items-start"
											>
												<span class="text-lg">
													{{ $t('Saldo freecasino') }}
												</span>
												<span class="text-neutral/80">
													{{
														appComponent.session
															.moneda
													}}
													{{
														Math.abs(
															appComponent.saldo_freeCasino
														).toFixed(2)
													}}
												</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Button for logging out the user, visible if the user is logged in -->
				<button
					v-if="appComponent.session.logueado"
					@click="appComponent.logOut()"
					v-bind="analyticsAttrs('header:logout-btn')"
					class="hover:scale-105"
				>
					<!-- SVG icon for the logout button -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 30 29"
						fill="none"
					>
						<g clip-path="url(#clip0_391_572)">
							<path
								d="M5.47701 -7.93303e-07L12.803 -1.43376e-06C13.3101 0.0463395 13.8173 0.0834126 14.3198 0.134386C16.3853 0.356821 18.0127 1.98338 18.1234 4.05481C18.2156 5.82502 18.1926 7.60451 18.2202 9.37472C18.2202 9.43033 18.1972 9.4813 18.1787 9.56008C18.022 9.56008 17.879 9.56008 17.7407 9.56008C15.7629 9.56008 13.7804 9.51838 11.8025 9.58325C8.99476 9.67593 6.80021 12.4795 7.28891 15.26C7.7269 17.7717 9.69094 19.4446 12.2359 19.4585C14.0847 19.4677 15.9334 19.4585 17.7822 19.4585C17.9205 19.4585 18.0588 19.4585 18.1603 19.4585C18.1603 21.2472 18.1972 22.985 18.1418 24.7228C18.1188 25.3345 17.9666 25.9925 17.69 26.5347C16.8832 28.1381 15.5139 28.9212 13.7481 28.949C11.4106 28.9861 9.07775 29 6.74488 29C5.77669 29 4.79928 28.9629 3.83571 28.8795C2.09758 28.7266 0.506985 27.2576 0.21653 25.543C0.101268 24.8757 0.0736061 24.1991 0.00444937 23.5272L0.00444779 5.50991C0.0505522 4.96772 0.0874345 4.42553 0.147369 3.88335C0.336397 2.08533 1.74718 0.528284 3.51298 0.217801C4.16304 0.101949 4.82233 0.0741436 5.48162 0.00926701L5.47701 -7.93303e-07Z"
								fill="white"
							/>
							<path
								d="M23.3981 16.4278C23.2552 16.4278 23.1169 16.4278 22.9739 16.4278C19.4193 16.4278 15.8647 16.4278 12.31 16.4278C11.2681 16.4278 10.4843 15.8254 10.3045 14.9078C10.0648 13.6751 10.9407 12.6232 12.2317 12.6047C13.4027 12.5908 14.5784 12.6047 15.7494 12.6047C18.1653 12.6047 20.5811 12.6047 23.0016 12.6047L23.4534 12.6047C23.3658 12.4935 23.3197 12.4193 23.2598 12.3637C22.9002 11.9976 22.5313 11.6454 22.1809 11.2747C21.4479 10.5008 21.4571 9.34693 22.1902 8.60547C22.9232 7.86402 24.0897 7.83158 24.8412 8.57767C26.3856 10.1069 27.9209 11.6501 29.4424 13.1978C30.18 13.9486 30.18 15.0885 29.4424 15.8346C27.9209 17.387 26.3856 18.9302 24.8412 20.4548C24.085 21.2009 22.9232 21.1731 22.1902 20.4316C21.4571 19.6902 21.4433 18.5363 22.1763 17.7624C22.5821 17.3361 23.0247 16.9375 23.4488 16.5297C23.4304 16.4927 23.4073 16.4602 23.3889 16.4231L23.3981 16.4278Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_391_572">
								<rect
									width="30"
									height="29"
									fill="white"
									transform="translate(30 29) rotate(180)"
								/>
							</clipPath>
						</defs>
					</svg>
				</button>
			</div>
		</div>
	</header>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import SiwtchButton from '@/components/SiwtchButton.vue'; // Import custom component
import { useSportBookStore } from '@/stores/sportbook'; // Import store for state management

export default defineComponent({
	components: { SiwtchButton }, // Register the SiwtchButton component
	setup() {
		return {}; // Setup function returns an empty object
	},
	data() {
		let config = this.$config(); // Retrieve configuration settings
		let zendesk: any = this.$zendesk; // Initialize Zendesk integration
		let appComponent: any = this.$appComponent; // Reference to the app component
		let device = appComponent.session.logueado ? 'login' : 'not_login'; // Determine device state based on login status
		let onMenuProfile: boolean = false; // State variable for menu profile visibility
		let menuList: any = []; // Array to hold menu items
		let sportBookStore = useSportBookStore(); // Access the sport book store
		let refreshBalance = this.$refreshBalance; // Reference to refresh balance function
		let lastExecution = Date.now(); // Timestamp for last execution of balance refresh
		return {
			config,
			zendesk,
			appComponent,
			device,
			onMenuProfile,
			menuList,
			sportBookStore,
			refreshBalance,
			lastExecution,
		}; // Return data properties
	},
	mounted() {
		this.getMenuList(); // Fetch menu list when component is mounted

		document.addEventListener('pointerdown', this.clickOut);
	},
	updated() {
		this.getMenuList(); // Fetch menu list when component is updated
	},
	beforeUnmount() {
        document.removeEventListener('pointerdown', this.clickOut);
    },
	methods: {
		clickOut(event) {
            // Saldo
            const viewSaldo = document.getElementById('viewSaldo');
            if (viewSaldo && !viewSaldo.contains(event.target)) {
                this.onMenuProfile = false;
            }
        },
		/**
		 * Toggles the visibility of the selected menu service.
		 * @param {any} id - The ID of the menu service to toggle.
		 */
		menuService(id: any) {
			const allMenus = document.querySelectorAll(
				'[id^="menuServiceDesktop-"]' // Select all menu elements
			);
			const selectedMenu = document.getElementById(
				'menuServiceDesktop-' + id // Get the selected menu by ID
			) as HTMLElement;
			if (selectedMenu.style.display === 'block') {
				selectedMenu.style.display = 'none'; // Hide the selected menu if it's currently visible
			} else {
				allMenus.forEach((menu) => {
					(menu as HTMLElement).style.display = 'none'; // Hide all menus
					const menuId = menu.getAttribute('id')?.split('-')[1]; // Extract menu ID
					const titleServiceElement = document.querySelector(
						'.titleService-' + menuId // Select title service element
					) as HTMLElement;
					const arrowElement = document.querySelector(
						'.arrow' + menuId // Select arrow element
					) as HTMLElement;
					titleServiceElement?.classList.remove('bg-secondary-focus'); // Remove focus class from title
					arrowElement?.classList.remove('rotate-180'); // Reset arrow rotation
				});
				selectedMenu.style.display = 'block'; // Show the selected menu
				const titleServiceElement = document.querySelector(
					'.titleService-' + id // Select title service element for the selected menu
				) as HTMLElement;
				const arrowElement = document.querySelector(
					'.arrow' + id // Select arrow element for the selected menu
				) as HTMLElement;
				titleServiceElement?.classList.add('bg-secondary-focus'); // Add focus class to title
				arrowElement?.classList.add('rotate-180'); // Rotate arrow
			}
		},
		/**
		 * Opens the sports book if the specified menu item is selected.
		 * @param {any} value - The menu item value containing URL and ID.
		 */
		openSportBook(value) {
			if (
				value.MENU_URL === '/deportes' && // Check if the menu URL matches
				value.MENU_ID === 'accion_envivo' // Check if the menu ID matches
			) {
				this.sportBookStore.page = 'live'; // Set the sport book store page to live
			}
		},
		/**
		 * Retrieves the appropriate menu list based on user login status and device type.
		 */
		getMenuList() {
			if (this.appComponent.session.logueado) {
				// Check if user is logged in
				if (this.appComponent.mobile === '1') {
					// Check if the device is mobile
					this.menuList =
						this.appComponent.config.MENU_USUARIO_LOGUEADO_MOBILE[
							this.appComponent.country // Get menu for logged-in mobile users
						];
				} else {
					this.menuList =
						this.appComponent.config.MENU_USUARIO_LOGUEADO[
							this.appComponent.country // Get menu for logged-in desktop users
						];
				}
			} else {
				if (this.appComponent.mobile === '1') {
					// Check if the device is mobile
					this.menuList =
						this.appComponent.config.MENU_NOLOGUEADO_MOBILE[
							this.appComponent.country // Get menu for non-logged-in mobile users
						];
				} else {
					this.menuList =
						this.appComponent.config.MENU_NOLOGUEADO[
							this.appComponent.country // Get menu for non-logged-in desktop users
						];
				}
			}
		},
		/**
		 * Displays the deposit modal.
		 */
		showDeposit() {
			this.appComponent.showModalDepositV2 = true; // Set modal visibility to true
		},
		/**
		 * Refreshes the user's balance with a cooldown to prevent spamming.
		 */
		onRefreshBalance() {
			const button = document.getElementById('refreshBalance'); // Get the refresh balance button
			button?.setAttribute('disabled', 'true'); // Disable the button during refresh
			(
				document.getElementsByClassName(
					'fa-refresh' // Select the refresh icon
				) as HTMLCollectionOf<HTMLElement>
			)[0]?.classList.add('fa-refreshFX'); // Add animation class to the icon
			if (Date.now() - this.lastExecution > 5000) {
				// Check if enough time has passed since last execution
				this.appComponent.refreshBalance2(); // Call the refresh balance function
				this.lastExecution = Date.now(); // Update last execution timestamp
			}
			setTimeout(() => {
				(
					document.getElementsByClassName(
						'fa-refresh' // Select the refresh icon again
					) as HTMLCollectionOf<HTMLElement>
				)[0]?.classList.remove('fa-refreshFX'); // Remove animation class from the icon
				button?.removeAttribute('disabled'); // Re-enable the button
			}, 5000); // Timeout for re-enabling the button
		},
		/**
		 * Placeholder for handling user balance actions.
		 */
		onUserBalance() {},
		/**
		 * Opens the chat interface based on the configuration.
		 */
		onOpenChat() {
			let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal' // Check if the configuration is for Centribal
			) {
				document
					.getElementById('centribal_iframe_layout')
					?.classList.remove('centribal_hidden'); // Show the Centribal chat iframe
				document
					.getElementById('centribal_iframe_layout')
					?.classList.add('centribal_open'); // Open the Centribal chat iframe
				postMessage('show_chat', '', ref_id); // Send message to show chat
			} else {
				this.zendesk.zE(
					this.config.zendesk[this.appComponent.country].name,
					'open' // Open Zendesk chat
				);
				this.zendesk.zE(
					this.config.zendesk[this.appComponent.country].name,
					'show' // Show Zendesk chat
				);
			}
		},
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Header6|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>
<style scoped>
/* 
 * Keyframes for a rotation animation.
 * The animation transitions from 0 degrees to 360 degrees.
 */
@keyframes rotate {
	from {
		rotate: 0deg; /* Starting position of the rotation */
	}
	to {
		rotate: 360deg; /* Ending position of the rotation */
	}
}

/* 
 * Class for applying a refreshing rotation effect.
 * The animation lasts 1 second, uses a linear timing function, 
 * and repeats infinitely.
 */
.fa-refreshFX {
	animation: rotate 1s linear infinite; /* Applies the rotate animation */
}
</style>

<!-- FILE DOCUMENTED -->
