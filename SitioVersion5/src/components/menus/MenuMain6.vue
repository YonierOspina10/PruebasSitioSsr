<template>
	<!-- Navigation bar fixed at the bottom of the screen, responsive design for mobile -->
	<nav
		class="fixed bottom-0 left-0 right-0 mx-auto w-auto bg-base-300 rounded-t-3xl py-4 px-6 flex flex-col justify-center items-center transition-all duration-300 ease-in-out gap-4 xl:hidden z-[60]"
		:class="[globalStore.onMenuMain ? 'h-auto' : 'h-[70px]']"
	>
		<!-- Container for buttons and links -->
		<div class="w-full flex justify-between items-center max-w-[450px]">
			<!-- Login button displayed if user is not logged in -->
			<button
				v-if="!appComponent.session.logueado"
				v-bind="analyticsAttrs('header:login-btn')"
				@click="appComponent.showModalLogin = true"
				class="w-[116px] h-[35px] bg-secondary relative hover:bg-secondary/80 rounded-xl z-20 flex justify-center items-center text-base font-normal border-2 border-accent-focus"
			>
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
					alt=""
					class="absolute top-[2px] left-[1px]"
				/>
				{{ $t('Iniciar sesión') }}
			</button>
			<!-- Messages link displayed if user is logged in -->
			<RouterLink
				v-else
				to="/mensajes"
				@click="appComponent.gAnalytics('send_mail')"
				v-bind="analyticsAttrs('header:inbox')"
				class="relative w-[116px] h-[35px] bg-secondary hover:bg-secondary/80 rounded-xl z-20 flex justify-center items-center text-lg font-normal border-2 border-accent-focus gap-2"
			>
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
					alt=""
					class="absolute top-[2px] left-[1px]"
				/>
				<span
					v-if="appComponent.mensajesUnread > 0"
					class="absolute blob -top-0 -right-0 w-4 h-4 bg-[#D21817] rounded-full text-xs text-neutral flex justify-center items-center"
				></span>
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
				{{ $t('Mensajes') }}
			</RouterLink>
			<!-- Toggle menu button -->
			<button
				@click="globalStore.onMenuMain = !globalStore.onMenuMain"
				v-bind="analyticsAttrs('menu:toggle')"
				class="w-[56px] h-[56px] flex justify-center items-center bg-warning hover:bg-warning/80 rounded-full border-2 border-neutral"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					:class="[
						globalStore.onMenuMain
							? 'transform rotate-45'
							: 'transform rotate-0',
					]"
				>
					<path
						d="M14 2L14 26"
						stroke="white"
						stroke-width="4"
						stroke-linecap="round"
					/>
					<path
						d="M2 14L26 14"
						stroke="white"
						stroke-width="4"
						stroke-linecap="round"
					/>
				</svg>
			</button>
			<!-- Registration link displayed if user is not logged in -->
			<RouterLink
				v-if="!appComponent.session.logueado"
				to="/registro"
				v-bind="analyticsAttrs('header:signup-btn')"
				class="w-[116px] h-[35px] bg-success hover:bg-success/80 relative rounded-xl z-20 flex justify-center items-center text-base font-normal border-2 border-neutral"
			>
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
					alt=""
					class="absolute top-[2px] left-[1px]"
				/>
				{{ $t('Regístrate') }}
			</RouterLink>
			<!-- Deposit button displayed if user is logged in -->
			<button
				v-else
				@click="deposit()"
				v-bind="analyticsAttrs('header:deposit-btn')"
				class="w-[116px] h-[35px] bg-success hover:bg-success/80 relative rounded-xl z-20 flex justify-center items-center text-lg font-normal border-2 border-neutral gap-2"
			>
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
					alt=""
					class="absolute top-[2px] left-[1px]"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
                    class="text-neutral/50 fill-neutral/50"
				>
					<g clip-path="url(#clip0_391_552)">
						<path
							d="M0.00593615 9.76112C0.584385 10.0221 1.12429 10.2926 1.6811 10.5116C3.51716 11.2342 5.40918 11.5189 7.35417 11.3235C7.44569 11.3142 7.56009 11.218 7.60883 11.1267C7.72323 10.9121 7.80455 10.6758 7.91546 10.4091C7.72895 10.4291 7.57725 10.4475 7.42555 10.4615C4.88296 10.6955 2.46745 10.1852 0.179272 8.94566C0.105411 8.90564 0.015635 8.79435 0.0143915 8.71514C0.00245452 7.87994 0.00693091 7.0442 0.00693091 6.17611C4.14933 8.3673 8.26935 8.37141 12.4326 6.1731V7.14068C12.9412 7.14068 13.4321 7.1522 13.9223 7.13876C16.537 7.06667 18.7553 8.72034 19.6555 11.4203C20.9149 15.1977 18.58 19.4666 14.9531 19.9213C13.9805 20.0433 12.9715 20.0167 11.9984 19.8854C10.6433 19.7029 9.52597 18.9266 8.62298 17.7973C8.51107 17.6575 8.40811 17.6158 8.24597 17.6435C5.74044 18.0698 3.31995 17.7151 0.978307 16.6631C0.345893 16.3788 0.00792566 15.8183 0.00643353 15.0642C0.00543878 14.55 0.00643353 14.036 0.00643353 13.4615C2.32744 14.7284 4.74469 15.2912 7.32309 15.0634C7.27783 14.7282 7.2353 14.4121 7.1888 14.0662C7.05848 14.0662 6.92444 14.0604 6.79065 14.067C4.50172 14.1819 2.33664 13.6474 0.270789 12.5732C0.0648753 12.4668 -0.00401137 12.3396 0.000713701 12.0943C0.0148889 11.3276 0.00593615 10.5604 0.00593615 9.76112ZM18.0771 13.5635C18.0791 10.5141 15.8138 8.00987 13.0464 8.00164C10.2434 7.99315 7.98137 10.4804 7.97689 13.575C7.97241 16.6425 10.232 19.13 13.0292 19.1368C15.8034 19.1437 18.0754 16.6354 18.0774 13.5635H18.0771Z"
                            stroke="currentColor"
						/>
						<path
							d="M6.21815 6.95755C4.12444 6.94358 2.13792 6.42771 0.250874 5.42942C0.0705756 5.33376 -0.00477696 5.2318 -0.000300572 5.0021C0.0151181 4.26531 0.0205892 3.52769 0.000445493 2.79117C-0.0132324 2.29203 0.141452 1.8732 0.498071 1.60841C0.948942 1.27373 1.42294 0.944809 1.92877 0.738134C3.59598 0.0578083 5.33854 -0.0677314 7.09801 0.0284791C8.31906 0.0953605 9.52794 0.280929 10.6634 0.801452C11.1372 1.01854 11.5799 1.34062 11.9999 1.67146C12.3175 1.92172 12.4446 2.31615 12.4363 2.76404C12.4227 3.51097 12.4257 4.25845 12.4371 5.00539C12.4403 5.21398 12.3851 5.32554 12.2093 5.41846C10.3148 6.42086 8.32105 6.94358 6.2184 6.95728L6.21815 6.95755ZM5.8297 1.0328C5.38653 1.0846 4.54597 1.1534 3.71411 1.28908C2.95237 1.41325 2.20954 1.64487 1.53212 2.06918C1.09641 2.34192 1.08846 2.89204 1.52839 3.14696C1.86635 3.34267 2.22347 3.51426 2.58904 3.63295C4.55766 4.27271 6.55835 4.31245 8.57297 3.96406C9.38071 3.82427 10.1691 3.60088 10.8927 3.16368C11.3396 2.89369 11.3456 2.33068 10.8975 2.06644C10.6085 1.89622 10.3024 1.75205 9.99124 1.63747C8.77093 1.18767 7.50561 1.06569 5.82945 1.0328H5.8297Z"
                            stroke="currentColor"
						/>
						<path
							d="M14.4321 11.6955C13.9604 11.386 13.4918 11.1854 12.9741 11.2196C12.7798 11.2325 12.569 11.2821 12.4023 11.3863C12.0795 11.5883 12.0507 12.0592 12.3514 12.2977C12.5928 12.4893 12.8771 12.617 13.1457 12.7659C13.4961 12.9599 13.8698 13.1126 14.1976 13.3448C14.7982 13.7704 15.0954 14.3992 15.035 15.1952C14.9728 16.0126 14.5694 16.5762 13.9044 16.9202C13.7562 16.9969 13.5993 17.0531 13.4123 17.1337V18.2677H12.2467C12.2467 18.0007 12.2355 17.7329 12.2501 17.4673C12.2618 17.254 12.1937 17.1921 12.0012 17.1362C11.5814 17.0145 11.1758 16.8314 10.7662 16.6683C10.6294 16.6137 10.6026 16.5189 10.664 16.3607C10.7933 16.028 10.901 15.6851 11.0099 15.3682C11.3909 15.5299 11.7505 15.7377 12.1328 15.8276C12.4436 15.9008 12.7868 15.8695 13.1064 15.8166C13.3834 15.7706 13.5774 15.5513 13.6271 15.2259C13.6756 14.9091 13.5448 14.6621 13.3138 14.5061C13.0581 14.3335 12.7751 14.2112 12.508 14.0588C12.1278 13.8417 11.7135 13.6704 11.3805 13.3848C10.4111 12.5532 10.5717 10.9908 11.6692 10.2995C11.6851 10.2893 11.7003 10.2734 11.7172 10.2707C12.3272 10.1695 12.3882 9.70905 12.3208 9.15974C12.3113 9.08327 12.3275 9.00323 12.3325 8.91003H13.4622V9.87296C13.9554 10.0561 14.4155 10.2268 14.9027 10.408C14.7323 10.8745 14.5901 11.2643 14.4324 11.696L14.4321 11.6955Z"
                            stroke="currentColor"
						/>
						<path
							d="M10.3816 13.5734C10.3788 13.8765 10.1518 14.1262 9.87574 14.1295C9.58229 14.1331 9.353 13.8831 9.35599 13.5627C9.35897 13.2406 9.59149 12.9964 9.88544 13.0062C10.162 13.0156 10.3846 13.2697 10.3818 13.5734H10.3816Z"
                            stroke="currentColor"
						/>
						<path
							d="M16.03 14.129C15.7351 14.1314 15.5083 13.8839 15.5103 13.5619C15.512 13.2507 15.7266 13.0145 16.0126 13.0082C16.3046 13.0021 16.5369 13.2532 16.5354 13.5734C16.5341 13.8724 16.3028 14.1265 16.03 14.1287V14.129Z"
                            stroke="currentColor"
						/>
					</g>
					<defs>
						<clipPath id="clip0_391_552">
							<rect width="20" height="20" stroke="currentColor" />
						</clipPath>
					</defs>
				</svg>
				{{ $t('Depositar') }}
			</button>
		</div>
		<!-- Main menu displayed when the menu is toggled on -->
		<div
			v-if="globalStore.onMenuMain"
			class="w-full transition-all duration-500 ease-in-out flex justify-center items-center flex-col gap-4 max-w-[650px]"
		>
			<!-- User info section displayed if user is logged in -->
			<div
				v-if="appComponent.session.logueado"
				class="bg-base-300 w-full rounded-xl border p-4 flex flex-col justify-start items-start gap-2"
				:class="appPos ? 'h-auto' : 'h-[220px] tablet:h-[110px]'"
			>
				<div
					class="flex justify-between items-start gap-4 w-full flex-wrap"
				>
					<!-- User avatar -->
					<div
						class="border border-primary-content aspect-square w-[100px] h-[100px] tablet:w-[80px] tablet:h-[80px] flex justify-center items-center rounded-box p-1"
					>
						<img
							src="https://images.virtualsoft.tech/m/msj23212T1712596241.png"
							alt="avatar-icon"
							class="rounded-box w-full h-full object-cover"
						/>
					</div>
					<!-- User details -->
					<div
						class="flex flex-col items-start justify-center h-[100px] tablet:h-[80px] w-[45%] sm:w-[70%] tablet:w-[35%]"
					>
						<span class="text-lg font-semibold text-neutral">
							{{ appComponent.session.nombre }}
						</span>
						<span class="text-sm font-light text-neutral">
							ID:
							{{ appComponent.session.usuario }}
						</span>
						<!-- User balance display -->
						<div
							class="text-sm font-bold text-neutral flex gap-2 justify-center items-center"
						>
							<span>{{ $t('Saldo:') }}</span>
							<img
								src="https://images.virtualsoft.tech/m/msj23212T1712596594.png"
								alt="coin-icon"
								class="aspect-square w-[16px]"
							/>
							<span class="text-neutral text-lg">{{
								appComponent.session.simbolo_moneda != null &&
								appComponent.session.simbolo_moneda != undefined
									? appComponent.session.simbolo_moneda +
										' ' +
										Math.abs(
											parseFloat(appComponent.saldo_total)
										).toFixed(2)
									: '$' +
										' ' +
										Math.abs(
											parseFloat(appComponent.saldo_total)
										).toFixed(2)
							}}</span>
							<!-- Refresh balance button -->
							<button
								id="refreshBalance"
								v-bind="analyticsAttrs('menu:refresh-main-balance-icon')"
								@click="onRefreshBalance()"
								class="hover:scale-105 w-5"
							>
								<font-awesome-icon
									class="fa-refresh text-neutral text-lg cursor-pointer"
									icon="fa-solid fa-refresh"
								/>
							</button>
						</div>
					</div>
					<!-- Services consultation section -->
					<div
						id="serviciesConsult"
						class="w-full tablet:h-[80px] tablet:max-w-[250px] max-w-none flex-col justify-center items-center gap-2 flex order-2 tablet:order-1"
					>
						<div
							v-if="!appPos"
							class="w-full flex justify-center items-center gap-2"
						>
							<!-- Menu items for services -->
							<div
								v-for="menu in appComponent.menus_service"
								:tabindex="menu.MENU_ID"
								class="relative w-full"
								:class="'titleService-' + menu.MENU_ID"
							>
								<button
									@click="menuService(menu.MENU_ID)"
									v-bind="analyticsAttrs('menu:service:' + menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
									class="w-full h-[30px] bg-base-300 hover:bg-base-300/80 rounded z-30 flex justify-center items-center text-base font-light shadow-inner shadow-neutral/50 gap-2"
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
								<!-- Dropdown for submenus -->
								<div
									v-if="
										menu.SUBMENUS != undefined &&
										menu.SUBMENUS != ''
									"
									:id="'dropdown' + menu.MENU_ID + '-mobile'"
								>
									<ul
										:id="'menuService-' + menu.MENU_ID"
										style="display: none"
										class="absolute w-full bg-base-300 max-h-40 overflow-y-scroll border rounded-b-md z-30"
									>
										<li
											v-for="(
												submenu, index
											) in menu.SUBMENUS"
											:key="index"
										>
											<RouterLink
												tabindex="0"
												:id="submenu.MENU_ID"
												:to="
													'/' +
													menu.MENU_SLUG +
													'/' +
													submenu.SUBMENU_URL
												"
												v-bind="analyticsAttrs('menu:service:' + menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-') + '-' + submenu.SUBMENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
												@Click="closeMenu()"
												class="text-neutral text-sm px-2 py-3 grid hover:scale-105"
												:class="
													'collection-item avatar-refresh ' +
													submenu.SUBMENU_URL.replace(
														'.php',
														''
													)
												"
												@click="
													menuService(menu.MENU_ID);
													closeMenu();
												"
												>{{ $t(submenu.SUBMENU_TITLE) }}
											</RouterLink>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- Additional service menu item -->
						<div
							v-if="!appPos"
							tabindex="76586759"
							class="titleService-76586759 relative w-full"
						>
							<button
								@click="menuService('76586759')"
								class="px-4 h-[30px] w-full bg-base-300 hover:bg-base-300/80 rounded z-20 flex justify-between items-center text-base font-light shadow-inner shadow-neutral/50 gap-2"
							>
								<img
									src="https://images.virtualsoft.tech/m/msj-1212T1714083446.png"
									alt="coin-icon"
									class="aspect-square w-[16px]"
								/>
								<div
									class="flex justify-center items-center gap-2 text-lg font-[400]"
								>
									<span>{{ $t('Saldo') }}</span>
									<span class="w-full">{{
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
									}}</span>
									<!-- Refresh balance button -->
									<button
										id="refreshBalance"
										@click="onRefreshBalance()"
										v-bind="analyticsAttrs('menu:balance')"
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
							<!-- Dropdown for additional services -->
							<div :id="'dropdown76586759-mobile'">
								<ul
									id="menuService-76586759"
									style="display: none"
									class="absolute bg-base-300 overflow-y-scroll border rounded-b-md w-full max-h-48"
								>
									<li
										class="w-full flex justify-start items-start gap-2 px-4 py-2"
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
												{{ $t('Saldo recargass') }}
												<!-- Refresh balance button -->
												<button
													id="refreshBalance"
													@click="onRefreshBalance()"
													v-bind="analyticsAttrs('menu:balance:refresh-main-balance')"
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
													appComponent.session.moneda
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
										class="w-full flex justify-start items-start gap-2 px-4 py-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
										>
											<g clip-path="url(#clip0_976_61)">
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
													appComponent.session.moneda
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
										class="w-full flex justify-start items-start gap-2 px-4 py-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
										>
											<g clip-path="url(#clip0_976_72)">
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
													$t('Saldo freebets y bonos')
												}}
											</span>
											<span class="text-neutral/80">
												{{
													appComponent.session.moneda
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
								</ul>
							</div>
						</div>
					</div>
					<!-- Logout button -->
					<button
						@click="
							appComponent.logOut();
							closeMenu();
						"
						v-bind="analyticsAttrs('header:logout-btn')"
						class="hover:scale-105 mt-6 order-1 tablet:order-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="29"
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
			<!-- Grid for menu items -->
			<div
				class="grid grid-cols-4 sm:grid-cols-6 place-content-center gap-y-4 w-full"
			>
				<RouterLink
					v-for="(item, index) in menuList"
					:to="item.MENU_URL"
					:key="index"
					@click="globalStore.onMenuMain = false"
					v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
					class="w-[80px] h-[80px] sm:w-[85px] md:h-[85px] rounded-xl flex flex-col justify-center items-center gap-2 border border-neutral hover:bg-base-300 m-auto capitalize p-1"
					:class="[
						router.path == item.MENU_URL
							? 'bg-accent'
							: 'bg-accent-content',
					]"
				>
					<img
						:src="item.MENU_ICON"
						alt=""
						class="w-[35px] md:w-[45px] aspect-square object-contain"
					/>
					<span class="text-xs font-semibold leading-3 text-center">
						{{ item.MENU_TITLE }}
					</span>
				</RouterLink>
			</div>
		</div>
	</nav>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGlobalStore } from '@/stores/global';
import router from '@/router';
export default defineComponent({
	setup() {
		return {};
	},
	data() {
		// Configuration and state variables
		let config = this.$config();
		let zendesk: any = this.$zendesk;
		let appComponent: any = this.$appComponent;
		let globalStore = useGlobalStore();
		let device = appComponent.session.logueado ? 'login' : 'not_login';
		let router = this.$route;
		let menuList: any = [];
		let appPos: boolean = false;
		let refreshBalance = this.$refreshBalance;
		let lastExecution = Date.now();
		return {
			config,
			zendesk,
			appComponent,
			globalStore,
			device,
			router,
			menuList,
			appPos,
			refreshBalance,
			lastExecution,
		};
	},
	mounted() {
		// Fetch menu list when component is mounted
		this.getMenuList();
	},
	updated() {
		// Fetch menu list when component is updated
		this.getMenuList();
	},
	methods: {
		// Toggle visibility of service menus
		menuService(id: any) {
			const allMenus = document.querySelectorAll('[id^="menuService-"]');
			const selectedMenu = document.getElementById(
				'menuService-' + id
			) as HTMLElement;
			if (selectedMenu.style.display === 'block') {
				selectedMenu.style.display = 'none';
			} else {
				allMenus.forEach((menu) => {
					(menu as HTMLElement).style.display = 'none';
					const menuId = menu.getAttribute('id')?.split('-')[1];
					const titleServiceElement = document.querySelector(
						'.titleService-' + menuId
					) as HTMLElement;
					const arrowElement = document.querySelector(
						'.arrow' + menuId
					) as HTMLElement;
					titleServiceElement?.classList.remove('bg-secondary-focus');
					arrowElement?.classList.remove('rotate-180');
				});
				selectedMenu.style.display = 'block';
				const titleServiceElement = document.querySelector(
					'.titleService-' + id
				) as HTMLElement;
				const arrowElement = document.querySelector(
					'.arrow' + id
				) as HTMLElement;
				titleServiceElement?.classList.add('bg-secondary-focus');
				arrowElement?.classList.add('rotate-180');
			}
		},
		// Close the main menu
		closeMenu() {
			this.globalStore.onMenuMain = false;
		},
		// Fetch the menu list based on user session and device type
		getMenuList() {
			if (this.appComponent.session.logueado) {
				if (
					this.appComponent.mobile === '1' &&
					this.appComponent.appPOS
				) {
					this.appPos = true;
					this.menuList =
						this.config != undefined &&
						this.config.MENU_USUARIO_APP_POS != undefined &&
						this.config.MENU_USUARIO_APP_POS[
							this.appComponent.country
						] != undefined
							? this.config.MENU_USUARIO_APP_POS[
									this.appComponent.country
								]
							: [];
					console.log(
						this.config.MENU_USUARIO_APP_POS[
							this.appComponent.country
						]
					);
				} else if (this.appComponent.mobile === '1') {
					this.menuList =
						this.appComponent.config.MENU_USUARIO_LOGUEADO_MOBILE[
							this.appComponent.country
						];
				} else {
					this.menuList =
						this.appComponent.config.MENU_USUARIO_LOGUEADO[
							this.appComponent.country
						];
				}
			} else {
				if (this.appComponent.mobile === '1') {
					this.menuList =
						this.appComponent.config.MENU_NOLOGUEADO_MOBILE[
							this.appComponent.country
						];
				} else {
					this.menuList =
						this.appComponent.config.MENU_NOLOGUEADO[
							this.appComponent.country
						];
				}
			}
		},
		// Open deposit modal or navigate to deposit page
		deposit() {
			if (!this.appPos) {
				this.appComponent.showModalDepositV2 = true;
			} else {
				router.push('/pos/credit-recharge');
			}
		},
		// Refresh the user's balance
		onRefreshBalance() {
			const button = document.getElementById('refreshBalance');
			button?.setAttribute('disabled', 'true');
			(
				document.getElementsByClassName(
					'fa-refresh'
				) as HTMLCollectionOf<HTMLElement>
			)[0]?.classList.add('fa-refreshFX');
			if (Date.now() - this.lastExecution > 5000) {
				this.appComponent.refreshBalance2();
				this.lastExecution = Date.now();
			}
			setTimeout(() => {
				(
					document.getElementsByClassName(
						'fa-refresh'
					) as HTMLCollectionOf<HTMLElement>
				)[0]?.classList.remove('fa-refreshFX');
				button?.removeAttribute('disabled');
			}, 5000);
		},
		analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMain6|layout:layout-${this.appComponent.config.layout}`,
            };
        },
	},
});
</script>
<style scoped>
@keyframes rotate {
	from {
		rotate: 0deg;
	}
	to {
		rotate: 360deg;
	}
}
/* Animation for refresh icon */
.fa-refreshFX {
	animation: rotate 0s linear 1s infinite;
}
</style>

<!-- FILE DOCUMENTED -->
