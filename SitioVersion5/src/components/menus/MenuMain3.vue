<template>
    <!-- Sidebar menu for mobile view, hidden on larger screens -->
    <aside
        class="menu_mobile bg-base-200 fixed w-full h-full z-[101] top-0 p-3 transition-all flex flex-col justify-start lg:hidden overflow-y-auto"
        :style="[{ left: globalStore.onMenuMain ? '0' : '-100%' }]"
    >
        <article class="relative flex flex-col justify-center items-center">
            <!-- Conditional rendering based on user session and app state -->
            <div
                v-if="appComponent.session.logueado &&
						!appComponent.appPOS && (appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.balanceSectionVersion == undefined || appComponent.config.headerAssets.balanceSectionVersion == 1)"
                class="w-full h-60 flex flex-col justify-start items-center gap-3"
                :class="appComponent.infoApp ? 'pt-6' : 'pt-0'"
            >
                <!-- Link to loyalty management if user is logged in and loyalty is enabled -->
                <RouterLink
                    v-if="
						appComponent.session.logueado &&
						config.loyalty[appComponent.country]
					"
                    to="/gestion/mi_lealtad"
                    @click="closeMenu()"
                    class="h-12 relative hover:scale-105"
                >
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1683841601.png"
                        alt=""
                        class="w-24 mt-[2px]"
                    />
                    <span
						class="absolute top-[11px] left-[34px] text-secondary text-center font-bold text-base w-14"
						>{{ appComponent.loyalty.points }}</span
					>
				</RouterLink>
                <!-- Link to account management -->
                <RouterLink to="/gestion/gestion_cuenta" @click="closeMenu()">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1683329139.png"
                        alt=""
                    />
                </RouterLink>
                <div
                    v-if="!appComponent.appPOS"
                    class="flex flex-col justify-center items-center gap-1"
                >
                    <p
                        class="text-neutral text-xl w-60 text-center capitalize"
                    >
                        {{ appComponent.session.nombre }}
                    </p>
                    <!-- Display user ID if certain conditions are met -->
                    <p
                        v-if="
							(appComponent.config != undefined &&
								appComponent.config.newViewIdInMenu !=
									undefined &&
								!appComponent.config.newViewIdInMenu) ||
							(appComponent.config != undefined &&
								appComponent.config.newViewIdInMenu ==
									undefined)
						"
                        class="text-neutral text-sm w-40 text-center"
                    >
                        ID: {{ appComponent.session.usuario }}
                    </p>
                </div>
                <div
                    v-if="
						(!appComponent.appPOS &&
							appComponent.config != undefined &&
							appComponent.config.newViewIdInMenu != undefined &&
							!appComponent.config.newViewIdInMenu) ||
						(appComponent.config != undefined &&
							appComponent.config.newViewIdInMenu == undefined)
					"
                    class="flex flex-col justify-center items-center"
                >
                    <p class="text-neutral text-sm">{{ $t('Saldo') }}</p>
                    <div
                        class="h-10 flex justify-around items-center bg-base-200 rounded-full gap-4 p-1"
                    >
                        <!-- Link to deposit management -->
                        <RouterLink
                            to="/gestion/deposito"
                            class="flex justify-center items-center gap-2 hover:scale-105"
                            @click="closeMenu()"
                        >
                            <img
                                src="https://images.virtualsoft.tech/m/msjT1682370645.png"
                                alt=""
                            />
                            <span class="saldo text-neutral text-base mr-2"
                            >{{ appComponent.session.moneda }}
								{{
                                    Math.abs(
                                        parseFloat(appComponent.saldo_total),
                                    ).toFixed(2)
                                }}</span
                            >
                        </RouterLink>
                        <!-- Button to toggle menu visibility -->
                        <RouterLink
                            v-if="!appComponent.infoApp"
                            @click="
								() =>
									(globalStore.onMenuMain =
										!globalStore.onMenuMain)
							"
                            to="/gestion/deposito"
                            class="bg-success rounded-full h-7 w-7 flex justify-center items-center hover:scale-105"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-plus"
                                class="text-neutral text-md font-bold"
                            />
                        </RouterLink>
                    </div>
                    <div class="flex flex-col justify-center items-center py-4">
                        <!-- Clock component displayed based on configuration -->
                        <ClockUser
                            v-if="
								appComponent.config.header_ != undefined &&
								appComponent.config.header_['clock'] !=
									undefined
									? appComponent.config.header_['clock']
									: appComponent.config.header['clock'] !==
									  undefined
									? appComponent.config.header['clock']
									: false
							"
                        />
                    </div>
                </div>
                <div v-else class="flex justify-center items-center gap-6">
                    <div
                        class="flex flex-col justify-center items-center gap-2"
                    >
                        <p class="text-neutral text-sm">{{ $t('ID') }}</p>
                        <div
                            class="h-10 w-44 flex justify-center items-center bg-base-200 rounded-full gap-4 p-1"
                        >
                            <!-- Link to account management with user ID -->
                            <RouterLink
                                to="/gestion/gestion_cuenta"
                                class="flex justify-center items-center gap-8 hover:scale-105"
                                @click="closeMenu()"
                            >
                                <img
                                    src="https://images.virtualsoft.tech/m/msj19212T1721764697.png"
                                    alt=""
                                />
                                <span
                                    class="saldo text-neutral text-base mr-2"
                                >{{ appComponent.session.usuario }}</span
                                >
                            </RouterLink>
                        </div>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center gap-2"
                    >
                        <p class="text-neutral text-sm">{{ $t('Saldo') }}</p>
                        <div
                            class="h-10 flex justify-around items-center bg-base-200 rounded-full gap-4 p-1"
                        >
                            <!-- Link to deposit management -->
                            <RouterLink
                                to="/gestion/deposito"
                                class="flex justify-center items-center gap-2 hover:scale-105"
                                @click="closeMenu()"
                            >
                                <img
                                    src="https://images.virtualsoft.tech/m/msjT1682370645.png"
                                    alt=""
                                />
                                <span class="saldo text-neutral text-base mr-2"
                                >{{ appComponent.session.moneda }}
									{{
                                        Math.abs(
                                            parseFloat(appComponent.saldo_total),
                                        ).toFixed(2)
                                    }}</span
                                >
                            </RouterLink>
                            <!-- Button to toggle menu visibility -->
                            <RouterLink
                                @click="
									() =>
										(globalStore.onMenuMain =
											!globalStore.onMenuMain)
								"
                                to="/gestion/deposito"
                                class="bg-success rounded-full h-7 w-7 flex justify-center items-center hover:scale-105"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-plus"
                                    class="text-neutral text-md font-bold"
                                />
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="appComponent.session.logueado &&
						!appComponent.appPOS && (appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.balanceSectionVersion != undefined && appComponent.config.headerAssets.balanceSectionVersion == 2)"
                class="w-full flex flex-col justify-center items-center gap-4 mt-14"
            >
                <!-- Container for user information and avatar -->
                <div
                    class="w-full flex justify-center items-center gap-4 mb-4"
                >
                    <!-- User information section -->
                    <div
                        class="text-sm font-bold text-neutral flex flex-col gap-1 justify-center items-end"
                    >
                        <!-- Display user name -->
                        <span
                            class="w-full text-xl font-semibold text-neutral leading-4 text-right min-w-[150px]"
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
                        class="border border-neutral aspect-square w-[100px] flex justify-center items-center rounded-box"
                    >
                        <img
                            :src="appComponent.config.headerAssets.avatar2 != undefined ? appComponent.config.headerAssets.avatar2 : 'https://images.virtualsoft.tech/m/msj23212T1712596241.png'"
                            alt="avatar-icon"
                            class="rounded-box w-full aspect-square object-cover"
                        />
                    </div>
                </div>

                <!-- Container for service menu buttons -->
                <div
                    class="w-full flex items-center justify-between"
                >
                    <!-- Loop through each service menu item -->
                    <div
                        v-for="menu in appComponent.menus_service"
                        :tabindex="menu.MENU_ID"
                        class="relative w-[48%] flex flex-col rounded-lg"
                        :class="'titleService2-' + menu.MENU_ID"
                    >
                        <!-- Button for each service menu item -->
                        <button
                            @click="menuService2(menu.MENU_ID)"
                            class="w-full h-[40px] bg-base-100 hover:bg-base-100/80 rounded-lg z-30 flex justify-center items-center text-lg text-neutral font-light gap-2"
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
                                :id="'menuServiceDesktop2-' + menu.MENU_ID"
                                style="display: none"
                                class="absolute w-full bg-base-100 h-72 overflow-y-scroll border rounded-lg z-30"
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
                                        class="text-neutral text-base px-2 py-3 grid hover:scale-105"
                                        :class="
													'collection-item avatar-refresh ' +
													submenu.SUBMENU_URL.replace(
														'.php',
														''
													)
												"
                                        @click="
													menuService2(menu.MENU_ID);
													closeMenu();
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
                        tabindex="7658675822"
                        class="titleService-7658675822 relative w-full flex flex-col"
                    >
                        <button
                            @click="menuService2('7658675822')"
                            class="mx-auto w-full px-4 h-[50px] bg-gradient-to-r from-primary to-primary-content hover:bg-primary-content/80 rounded-xl z-20 flex justify-between items-center text-lg text-neutral font-light shadow-inner shadow-neutral/50 gap-2"
                        >
                            <img
                                :src="appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.coinBalance != undefined ? appComponent.config.headerAssets.coinBalance : 'https://images.virtualsoft.tech/m/msj-1212T1714083446.png'"
                                alt="coin-icon"
                                class="aspect-square w-[30px]"
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
                                    id="refreshBalance2"
                                    @click="onRefreshBalance2()"
                                    class="hover:scale-105 w-5"
                                >
                                    <font-awesome-icon
                                        class="fa-refresh2 text-neutral text-lg cursor-pointer"
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
                        <div :id="'dropdown7658675822-mobile'">
                            <ul
                                id="menuServiceDesktop2-7658675822"
                                style="display: none"
                                class="absolute bg-primary-content overflow-y-scroll border rounded-lg w-full z-10"
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
                                                        id="refreshBalance2"
                                                        @click="
															onRefreshBalance2()
														"
                                                        class="hover:scale-105 w-5"
                                                    >
														<font-awesome-icon
                                                            class="fa-refresh2 text-neutral text-lg cursor-pointer"
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
            <label
                    v-if="
                appComponent.config != undefined && appComponent.config.swichThemeMode != undefined
                && appComponent.config.swichThemeMode
                "
                    class="swap text-9xl absolute left-1 top-1 cursor-pointer z-[110] hover:scale-105 flex items-center justify-center"
                >
                    <img
                        :src="
                  !ligthMode
                  ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                  : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'"
                        alt=""
                    />
                    <!-- Hidden checkbox for the switch -->
                    <input
                        type="checkbox"
                        class="hidden"
                        @click="changeLigthMode()"
                    />
                    <!-- Images for the switch states -->
                    <img
                        :src="moonIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="!ligthMode ? 'swap-off -left-[0.5px]' : 'swap-on left-[5px]'"
                    />
                    <img
                        :src="sunIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="ligthMode ? 'swap-on -right-[1px]' : 'swap-off right-[5px]'"
                    />
                </label>
            <div
                class="absolute right-0 top-0 flex justify-end items-center gap-3 z-[110]"
            >
                <div
                    class="hover:scale-105"
                >
                    <!-- Language selection dropdown -->
                    <div
                        class="dropdown dropdown-end flex items-center gap-1"
                        @click="openSelectLang = !openSelectLang"
                    >
                        <div
                            tabindex="0"
                            class="m-1 btn btn-xs bg-accent-focus flex justify-center items-center text-sm gap-1"
                        >
							<span
                                :class="
									'country-flags ' + appComponent.selectFlag
								"
                            ></span>
                            <span>{{ appComponent.lngProd }}</span>
                        </div>
                        <ul
                            tabindex="0"
                            class="menu dropdown-content bg-accent-focus rounded-box w-22 text-base-content mt-44"
                            v-if="openSelectLang"
                        >
                            <!-- List of countries for language selection -->
                            <li
                                v-for="country in appComponent.countries"
                                @click="
									appComponent.changeLanguage(
										country.name,
										country.flag
									);
									openSelectLang = false;
								"
                            >
								<span>
									<span
                                        :class="'country-flags ' + country.flag"
                                    ></span>
									{{ country.name.toLocaleUpperCase() }}
								</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Button to close the menu -->
                <button
                    @click="closeMenu()"
                    v-bind="analyticsAttrs('menu:toggle')"
                    class="hover:scale-105"
                    aria-label="Cerrar menu"
                >
                    <ExitIcon
                        :height="23"
                        :width="23"
                        :fill="'#ffffff'"
                        :fill2="'#ee3b3f'"
                    />
                </button>
            </div>
            <!-- Notification component displayed based on configuration -->
            <div
                v-if="
					appComponent.config.header !== undefined &&
					appComponent.config.header.notificationButton !==
						undefined &&
					appComponent.config.header.notificationButton[
						appComponent.country
					] !== undefined &&
					appComponent.config.header.notificationButton[
						appComponent.country
					]
				"
                class="absolute left-0 top-0 hover:scale-105"
            >
                <Notification />
            </div>
            <div
                v-if="!appComponent.appPOS"
                class="w-full flex justify-center items-center gap-2 mt-4"
                :class="appComponent.session.logueado ? (appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.balanceSectionVersion != undefined && appComponent.config.headerAssets.balanceSectionVersion == 2) ? '' : 'mt-32' : 'mt-12'"
            >
                <!-- Swiper component for displaying promotional GIFs -->
                <Swiper
                    v-if="
						(config.gifs !== undefined && config.gifs.length > 0) && !appComponent.infoApp ||
						(config.header !== undefined &&
                            config.header.gifs !== undefined &&
                            config.header.gifs[appComponent.country] !==
							undefined &&
							config.header.gifs[appComponent.country].length > 0) && !appComponent.infoApp
					"
                    :slidesPerView="'auto'"
                    :centeredSlides="false"
                    :centerInsufficientSlides="true"
                    :spaceBetween="10"
                    :grabCursor="true"
                    :modules="modules"
                    class="mySwiper w-full h-full"
                >
                    <SwiperSlide
                        v-for="(item, i) in config.gifs !== undefined
							? config.gifs
							: config.header.gifs[appComponent.country]"
                        class="w-[175px] md:w-56 h-20"
                    >
                        <!-- Link for promotional items with different target options -->
                        <a
                            v-if="item.target !== undefined && item.target == 'top'"
                            :key="i"
                            target="_top"
                            :href="item.redirect"
                            @click="closeMenu()"
                            aria-label="Promocionales"
                            class="w-full h-full flex justify-center items-center rounded-xl gap-2 p-2 lg:hover:scale-105"
                            :style="{
								background: item.color
							}"
                        >
                            <img
                                v-lazy="item.imgTexto"
                                alt=""
                                width="75"
                                height="60"
                                class="h-[60px]"
                            />
                            <div class="flex justify-center items-center">
                                <img
                                    v-lazy="item.gif"
                                    alt=""
                                    width="79"
                                    height="56"
                                    class="w-32"
                                />
                            </div>
                        </a>
                        <a
                            v-else-if="item.target !== undefined && item.target == 'blank'"
                            target="_blank"
                            :href="item.redirect"
                            @click="closeMenu()"
                            aria-label="Promocionales"
                            class="w-full h-full flex justify-center items-center rounded-xl gap-2 p-2 lg:hover:scale-105"
                            :style="{
								background: item.color,
							}"
                        >
                            <img
                                v-lazy="item.imgTexto"
                                alt=""
                                width="75"
                                height="60"
                                class="h-[60px]"
                            />
                            <div class="flex justify-center items-center">
                                <img
                                    v-lazy="item.gif"
                                    alt=""
                                    width="79"
                                    height="56"
                                    class="w-32"
                                />
                            </div>
                        </a>
                        <RouterLink
                            v-else
                            :to="item.redirect"
                            @click="closeMenu()"
                            aria-label="Promocionales"
                            class="w-full h-full flex justify-center items-center rounded-xl gap-2 p-2 lg:hover:scale-105"
                            :style="{
								background: item.color,
							}"
                        >
                            <img
                                v-lazy="item.imgTexto"
                                alt=""
                                width="75"
                                height="60"
                                class="h-[60px]"
                            />
                            <div class="flex justify-center items-center">
                                <img
                                    v-lazy="item.gif"
                                    alt=""
                                    width="79"
                                    height="56"
                                    class="w-32"
                                />
                            </div>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
            <hr v-if="!appComponent.appPOS && (appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.balanceSectionVersion == undefined || appComponent.config.headerAssets.balanceSectionVersion == 1)" class="w-2/3 bg-base500 mt-4" />
        </article>

        <!-- Main container for the article layout -->
        <article class="flex flex-col mt-4">
            <!-- Conditional rendering based on user session status -->
            <div v-if="appComponent.session.logueado" class="w-full">
                <!-- Menu for logged-in users when appPOS is not active -->
                <ul v-if="!appComponent.appPOS" class="grid gap-2">
                    <li
                        v-for="(value, i) in config
							.MENU_USUARIO_LOGUEADO_MOBILE[appComponent.country]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-2"
                        :class="appComponent.infoApp && !(
                                value.MENU_ID == 'accion_lealtad' ||
                                value.MENU_ID == 'accion_promociones' ||
                                value.MENU_ID == 'accion_sorteos' ||
                                value.MENU_ID == 'accion_torneos' ||
                                value.MENU_ID == 'accion_chat_mobile' ||
                                value.MENU_ID == 'accion_chat'
                            )
                            ? 'hidden pt-6'
                            : 'block'
                        "
                    >
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : value.MENU_BG"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank' && !appComponent.infoApp"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary lg:hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                            v-else-if="value.TARGER == 'top' && !appComponent.infoApp"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-100' : value.MENU_BG"
                            @click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[{ animationDelay: '200ms' }]"
                                >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <RouterLink
                            v-else-if="value.TARGER == 'verify' && !appComponent.infoApp"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                >new</span
                                >
                            </div>
                        </RouterLink>
                        <button
                            v-else-if="value.TARGER == 'deposit'"
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="handleDeposit(value.MENU_URL)"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </button>
                        <button
                            id="accion_currency"
                            v-else-if="value.TARGER == 'currency'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : value.MENU_BG"
                            @click="appComponent.modalCurrencyExchange = true"
                        >
                            <div
                                class="uppercase h-full w-full flex items-center gap-4 justify-start"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[{ animationDelay: '200ms' }]"
                                >{{ $t('Cambio de moneda') }}</span
                                >
                            </div>
                        </button>
                        <hr
                            v-if="
								value.BORDER_BOTTOM !== undefined &&
								value.BORDER_BOTTOM && !appComponent.infoApp
							"
                            class="w-2/3 bg-base500 mx-auto"
                        />
                    </li>
                </ul>
                <!-- Menu for logged-in users when appPOS is active -->
                <ul v-else class="grid gap-2 py-8">
                    <li
                        v-for="(value, i) in config
							.MENU_USUARIO_LOGUEADO_APP_POS[
							appComponent.country
						]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-2"
                    >
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            v-else-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary lg:hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center bg-base-100"
                            @click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[{ animationDelay: '200ms' }]"
                                >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                >new</span
                                >
                            </div>
                        </RouterLink>
                        <button
                            v-else-if="value.TARGER == 'deposit'"
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="handleDeposit(value.MENU_URL)"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </button>
                        <hr
                            v-if="
								value.BORDER_BOTTOM !== undefined &&
								value.BORDER_BOTTOM
							"
                            class="w-2/3 bg-base500 mx-auto"
                        />
                    </li>
                </ul>
            </div>
            <div v-else class="w-full">
                <!-- Menu for non-logged-in users -->
                <ul class="grid gap-2">
                    <li
                        v-for="(value, i) in config.MENU_NOLOGUEADO_MOBILE[
							appComponent.country
						]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-2"
                        :class="appComponent.infoApp && !(
                                value.MENU_ID == 'accion_lealtad' ||
                                value.MENU_ID == 'accion_promociones' ||
                                value.MENU_ID == 'accion_sorteos' ||
                                value.MENU_ID == 'accion_torneos' ||
                                value.MENU_ID == 'accion_registro'||
                                value.MENU_ID == 'accion_chat_mobile' ||
                                value.MENU_ID == 'accion_chat'
                            )
                            ? 'hidden  pt-10'
                            : 'block'
                            "
                    >
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :id="value.MENU_ID"
                            :to="config.baseUrlFx + value.MENU_URL"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank' && !appComponent.infoApp"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            v-if="value.TARGER == 'top' && !appComponent.infoApp"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <button
                            id="accion_chat"
                            v-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase bg-base-100"
                            @click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
                        >
                            <div
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[{ animationDelay: '200ms' }]"
                                >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <hr
                            v-if="
                                value.BORDER_BOTTOM !== undefined &&
								value.BORDER_BOTTOM && !appComponent.infoApp
							"
                            class="w-2/3 bg-base500 mx-auto"
                        />
                    </li>
                </ul>
            </div>
            <div
                v-if="appComponent.session.logueado && !appComponent.appPOS && (appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.balanceSectionVersion == undefined || appComponent.config.headerAssets.balanceSectionVersion == 1)"
                class="px-1 mt-4 grid gap-2"
            >
                <p class="text-neutral text-base font-bold ml-3">
                    {{ $t('SERVICIOS') }}
                </p>
                <div
                    tabindex="0"
                    v-for="menu in appComponent.menus_service"
                    class="h-full flex flex-col justify-center items-start pl-4 rounded-xl"
                    :class="'titleService2-' + menu.MENU_ID"
                >
                    <button
                        class="capitalize w-full rounded-lg flex justify-between items-center gap-2 pt-3 pr-3"
                        @click="menuService(menu.MENU_ID)"
                    >
                        <div class="flex justify-start items-center gap-2">
                            <font-awesome-icon
                                icon="fa-solid fa-gear"
                                size="1x"
                                class="text-neutral"
                            />
                            <p class="text-neutral text-lg">
                                {{ $t(menu.MENU_TITLE) }}
                            </p>
                        </div>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            size="1x"
                            class="text-neutral"
                            :class="'arrow' + menu.MENU_ID"
                        />
                    </button>
                    <div
                        v-if="menu.SUBMENUS != undefined && menu.SUBMENUS != ''"
                        :id="'dropdown' + menu.MENU_ID + '-mobile'"
                        class="w-full rounded-lg grid gap-1 my-2 px-1 bg-base-100"
                    >
                        <div
                            :id="'menuService-' + menu.MENU_ID"
                            style="display: none"
                        >
                            <RouterLink
                                v-for="submenu in menu.SUBMENUS"
                                tabindex="0"
                                :id="submenu.MENU_ID"
                                :to="
									'/' +
									menu.MENU_SLUG +
									'/' +
									submenu.SUBMENU_URL
								"
                                @Click="closeMenu()"
                                class="text-neutral text-sm px-2 py-3 grid hover:scale-105"
                                :class="
									'collection-item avatar-refresh ' +
									submenu.SUBMENU_URL.replace('.php', '')
								"
                                @click="
									menuService(menu.MENU_ID);
									closeMenu();
								"
                            >{{ $t(submenu.SUBMENU_TITLE) }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!appComponent.appPOS" class="px-1 my-4 ml-3 mt-4">
                <p class="menu-title text-neutral text-base font-bold">
                    {{ $t('OTROS') }}
                </p>
                <ul class="grid gap-2 mt-2">
                    <li
                        v-for="value in config.MENU_FOOTER[
							appComponent.country
						]"
                        class="hover:scale-105 py-2"
                        :class="appComponent.infoApp && !(
                                value.MENU_ID == 'accion_terminoscondiciones' ||
                                value.MENU_ID == 'accion_politicaprivacidad' ||
                                value.MENU_ID == 'accion_contactenos' ||
                                value.MENU_ID == 'accion_juegoresponsable' ||
                                value.MENU_ID == 'accion_blog'
                            )
                            ? 'hidden  pt-10'
                            : 'block'
                            "
                    >
                        <RouterLink
                            :to="value.MENU_URL"
                            active-class="active-link-otros"
                            :aria-label="value.MENU_TITLE"
                            :data-analytics-label="(() => {
                                const id = String(value.MENU_ID || '').trim().toLowerCase();
                                const title = String(value.MENU_TITLE || '').trim().toLowerCase();

                                const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin');
                                const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica');
                                const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons'));

                                if (isTerms) return 'footer:link:terms';
                                if (isPrivacy) return 'footer:link:privacy';
                                if (isResponsible) return 'footer:link:responsible-gaming';

                                return `footer:link:${String(value.MENU_ID || value.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
                            })()"
                        >
                            <div
                                :id="value.MENU_ID"
                                v-if="value.MENU_TARGET != '_blank'"
                                :title="value.MENU_TITLE"
                                @click="closeMenu()"
                            >
								<span class="text-neutral text-sm">
									{{ $t(value.MENU_TITLE) }}
								</span>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-if="value.MENU_TARGET == '_blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="closeMenu()"
                            :data-analytics-label="(() => {
                                const id = String(value.MENU_ID || '').trim().toLowerCase();
                                const title = String(value.MENU_TITLE || '').trim().toLowerCase();

                                const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin');
                                const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica');
                                const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons'));

                                if (isTerms) return 'footer:link:terms';
                                if (isPrivacy) return 'footer:link:privacy';
                                if (isResponsible) return 'footer:link:responsible-gaming';

                                return `footer:link:${String(value.MENU_ID || value.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
                            })()"
                        >
							<span class="text-neutral text-sm">
								{{ $t(value.MENU_TITLE) }}
							</span>
                        </a>
                    </li>
                </ul>
            </div>
        </article>

        <!-- Logout button for logged-in users -->
        <button
            v-if="appComponent.session.logueado"
            :class="{
                'bg-secondary p-2 w-full flex justify-center items-center rounded-full shadow-lg hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                'bg-error p-2 w-full text-neutral flex justify-center items-center rounded-full shadow-lg hover:scale-105': appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2,
            }"
            @click="
				appComponent.logOut();
				closeMenu();
			"
        >
            <DoorOut :height="22" :width="22" class="ml-1 fill-neutral" />
        </button>
    </aside>

    <!-- Sidebar menu for desktop view, hidden on smaller screens -->
    <aside
        class="menu_desktop bg-base-200 hidden lg:flex flex-col justify-start items-center fixed h-screen z-[80] top-0 left-0 py-2 px-2 gap-5 overflow-x-hidden"
        :style="{
			width: globalStore.onMenuMain && onTitles ? '255px' : '69px',
			transition: 'all 0.2s ease-in-out',
		}"
        @mouseover="openMenu()"
        @mouseleave="closeMenu()"
    >
        <article
            class="flex flex-col w-full justify-center items-center"
            :class="{
                'px-2': globalStore.onMenuMain && onTitles,
                'mt-[60px]': config.header_.styleVersion === undefined || config.header_.styleVersion === 1,
                'mt-[70px]': config.header_.styleVersion !== undefined && config.header_.styleVersion === 2,
            }"
        >
            <!-- Conditional rendering of GIFs based on configuration -->
            <div
                v-if="
					(config.gifs !== undefined && config.gifs.length > 0) ||
					(config.header !== undefined &&
                        config.header.gifs !== undefined &&
                        config.header.gifs[appComponent.country] !== undefined &&
						config.header.gifs[appComponent.country].length > 0)
				"
                class="h-auto mb-2 flex flex-col justify-center items-center gap-3 pb-3"
            >
                <div
                    v-for="(item, i) in config.gifs !== undefined
						? config.gifs
						: config.header.gifs[appComponent.country]"
                >
                    <!-- RouterLink for navigation without target -->
                    <RouterLink
                        v-if="item.target == undefined || item.target == ''"
                        :key="i"
                        :to="item.redirect"
                        class="flex justify-center items-center rounded-xl gap-2 hover:scale-105"
                        :class="onTitles ? 'w-56 h-20 p-2' : 'w-full h-14 p-1'"
                        :style="{
							background: item.color
						}"
                    >
                        <img
                            v-if="onTitles"
                            :src="item.imgTexto"
                            v-lazy="item.imgTexto"
                            alt=""
                            width="85"
                            height="65"
                            class="h-[65px] mr-3"
                        />
                        <div
                            class="relative flex justify-center items-center w-auto"
                        >
                            <img
                                width="87.41"
                                height="62.49"
                                v-lazy="item.gif"
                                alt=""
                                :class="onTitles ? 'w-28' : 'w-14'"
                            />
                        </div>
                    </RouterLink>
                    <!-- Anchor tag for navigation with target="_blank" -->
                    <a
                        v-if="item.target == 'blank'"
                        :key="i"
                        :href="item.redirect"
                        target="_blank"
                        class="flex justify-center items-center rounded-xl gap-2 hover:scale-105"
                        :class="onTitles ? 'w-56 h-20 p-2' : 'w-full h-14 p-1'"
                        :style="{
							background: item.color
						}"
                    >
                        <img
                            v-if="onTitles"
                            :src="item.imgTexto"
                            v-lazy="item.imgTexto"
                            alt=""
                            width="85"
                            height="65"
                            class="h-[65px] mr-3"
                        />
                        <div
                            class="relative flex justify-center items-center w-auto"
                        >
                            <img
                                width="87.41"
                                height="62.49"
                                v-lazy="item.gif"
                                alt=""
                                :class="onTitles ? 'w-28' : 'w-14'"
                            />
                        </div>
                    </a>
                    <!-- Anchor tag for navigation with target="_top" -->
                    <a
                        v-else-if="item.target == 'top'"
                        :href="item.redirect"
                        target="_top"
                        class="flex justify-center items-center rounded-xl gap-2 hover:scale-105"
                        :class="onTitles ? 'w-56 h-20 p-2' : 'w-full h-14 p-1'"
                        :style="{
							background: item.color
						}"
                    >
                        <img
                            v-if="onTitles"
                            :src="item.imgTexto"
                            v-lazy="item.imgTexto"
                            alt=""
                            width="85"
                            height="65"
                            class="h-[65px] mr-3"
                        />
                        <div
                            class="relative flex justify-center items-center w-auto"
                        >
                            <img
                                width="87.41"
                                height="62.49"
                                v-lazy="item.gif"
                                alt=""
                                :class="onTitles ? 'w-28' : 'w-14'"
                            />
                        </div>
                    </a>
                </div>
                <hr class="w-2/3 bg-base500 mt-2" />
            </div>
            <!-- User menu displayed when logged in -->
            <div
                v-if="appComponent.session.logueado"
                class="w-full justify-center items-center"
            >
                <ul class="grid gap-2">
                    <li
                        v-for="(value, i) in config.MENU_USUARIO_LOGUEADO[
							appComponent.country
						]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-2"
                    >
                        <!-- RouterLink for user menu items without target -->
                        <RouterLink
                            v-if="
								value.TARGER == undefined || value.TARGER == ''
							"
                            :id="value.MENU_ID"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :active-class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'bg-base-100' :'bg-gradient-to-r from-primary from-90%'"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                            class="rounded-xl p-3 w-full hover:scale-105 flex justify-center items-center"
                            :class="{
                                'bg-base-300':  value.MENU_BG == undefined,
                                'hover:bg-gradient-to-r hover:from-primary hover:from-90%': config.header_.styleVersion == undefined,
                                'hover:bg-base-100 group': config.header_.styleVersion !== undefined && config.header_.styleVersion === 2
                            }"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    :style="[
										{ animationDelay: i * 40 + 'ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <!-- Anchor tag for user menu items with target="_blank" -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor tag for user menu items with target="_top" -->
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                   class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i * 40 + 'ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:to-transparent hover:scale-105 flex justify-center items-center uppercase bg-base-100"
                            v-bind="analyticsAttrs('menu:nav:chat')"
                            @click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
                        >
                            <div
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i * 40 + 'ms' }
									]"
                                >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- RouterLink for user menu items with target="verify" -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :id="value.MENU_ID"
                            :to="config.baseUrlFx + value.MENU_URL"
                            active-class="bg-gradient-to-r from-primary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i * 40 + 'ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <button
                            v-else-if="value.TARGER == 'deposit'"
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="handleDeposit(value.MENU_URL)"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i * 40 + 'ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </button>
                        <!-- Horizontal rule for menu item separation -->
                        <hr
                            v-if="
								value.BORDER_BOTTOM !== undefined &&
								value.BORDER_BOTTOM
							"
                            class="w-2/3 bg-base500 mx-auto"
                        />
                    </li>
                </ul>
            </div>
            <!-- User menu displayed when not logged in -->
            <div v-else class="w-full justify-center items-center">
                <ul class="grid gap-2">
                    <li
                        v-for="(value, i) in config.MENU_NOLOGUEADO[
							appComponent.country
						]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-2"
                    >
                        <!-- RouterLink for non-logged user menu items without target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :active-class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'bg-base-100' :'bg-gradient-to-r from-primary from-90%'"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                            class="rounded-xl p-3 w-full hover:scale-105 flex justify-center items-center"
                            :class="{
                                'bg-base-300':  value.MENU_BG == undefined,
                                'hover:bg-gradient-to-r hover:from-primary hover:from-90%': config.header_.styleVersion == undefined,
                                'hover:bg-base-100 group': config.header_.styleVersion !== undefined && config.header_.styleVersion === 2
                            }"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <!-- Anchor tag for non-logged user menu items with target="_blank" -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor tag for non-logged user menu items with target="_top" -->
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            v-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
								closeMenu();
								openSportBook(value);
							"
                        >
                            <div
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                            >
								<span
                                    v-if="
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										!value.MENU_ICON.includes('https')
									"
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
								</span>
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:to-transparent hover:scale-105 flex justify-center items-center uppercase bg-base-100"
                            @click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
                        >
                            <div
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[{ animationDelay: '200ms' }]"
                                >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <button
                            v-else-if="value.TARGER == 'deposit'"
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="handleDeposit(value.MENU_URL)"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex items-center gap-4"
                                :class="
									onTitles
										? 'justify-start'
										: 'justify-center'
								"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
									appComponent.gAnalytics(
										'menu_top',
										value.MENU_ID
									);
									closeMenu();
									openSportBook(value);
								"
                            >
                                <div
                                    v-if="
										value.MENU_SVG != undefined &&
										value.MENU_SVG != ''
									"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
										(value.MENU_SVG == undefined ||
											value.MENU_SVG == '') &&
										value.MENU_ICON != undefined &&
										value.MENU_ICON != '' &&
										value.MENU_ICON.includes('https')
									"
                                    :alt="
										'Menu navegacion' +
										' ' +
										value.MENU_TITLE
									"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    v-if="onTitles"
                                    class="titles text-neutral text-base"
                                    :class="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                                    
                                    :style="[
										{ animationDelay: i + 1 + '0ms' }
									]"
                                >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    :class="
										globalStore.onMenuMain && onTitles
											? 'block'
											: 'hidden'
									"
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </button>
                        <!-- Horizontal rule for menu item separation -->
                        <hr
                            v-if="
								value.BORDER_BOTTOM !== undefined &&
								value.BORDER_BOTTOM
							"
                            class="w-2/3 bg-base500 mx-auto"
                        />
                    </li>
                </ul>
            </div>
            <!-- Services section displayed when logged in and titles are shown -->
            <div
                v-if="appComponent.session.logueado && onTitles && appComponent.config.menu_?.services !== false"
                class="w-full flex flex-col justify-center items-center gap-2 mt-4"
            >
                <p class="text-neutral text-base font-bold w-full text-start pl-3">
                    {{ $t('SERVICIOS') }}
                </p>
                <div
                    tabindex="1"
                    v-for="menu in appComponent.menus_service"
                    class="w-full flex flex-col justify-center items-center p-3 hover:bg-base-100 rounded-xl transition-all duration-300 ease-in-out"
                    :class="'titleService-' + menu.MENU_ID"
                >
                    <button
                        class="capitalize w-full rounded-lg flex justify-between items-center gap-2"
                        v-bind="analyticsAttrs('menu:nav:' + menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-'))"
                        @click="menuServiceDesktop(menu.MENU_ID)"
                    >
                        <div class="flex justify-start items-center gap-2">
                            <font-awesome-icon
                                icon="fa-solid fa-gear"
                                size="1x"
                                class="text-neutral"
                            />
                            <p class="text-neutral text-lg">
                                {{ $t(menu.MENU_TITLE) }}
                            </p>
                        </div>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            size="1x"
                            class="text-neutral"
                            :class="'arrow' + menu.MENU_ID"
                        />
                    </button>
                    <div
                        v-if="menu.SUBMENUS != undefined && menu.SUBMENUS != ''"
                        :id="'dropdown' + menu.MENU_ID + '-mobile'"
                        class="w-48 rounded-lg grid gap-1"
                    >
                        <div
                            :id="'menuServiceD-' + menu.MENU_ID"
                            style="display: none"
                            class="mt-2"
                        >
                            <RouterLink
                                v-for="submenu in menu.SUBMENUS"
                                tabindex="1"
                                :id="submenu.MENU_ID"
                                :to="
									'/' +
									menu.MENU_SLUG +
									'/' +
									submenu.SUBMENU_URL
								"
                                @Click="closeMenu()"
                                class="text-neutral text-sm px-2 py-3 grid hover:scale-105"
                                :class="
									'collection-item avatar-refresh ' +
									submenu.SUBMENU_URL.replace('.php', '')
								"
                                @click="
									menuService(menu.MENU_ID);
									closeMenu();
								"
                            >{{ $t(submenu.SUBMENU_TITLE) }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Other menu section displayed when titles are shown -->
            <div v-if="onTitles" class="w-full flex flex-col justify-center items-center pl-3 mt-4">
                <p class="text-neutral text-sm font-bold w-full text-start">
                    {{ $t('OTROS') }}
                </p>
                <ul class="w-full flex flex-col justify-center items-center gap-2 mt-2">
                    <li
                        v-for="value in config.MENU_FOOTER[
							appComponent.country
						]"
                        class="hover:scale-105 w-full text-start py-1"
                    >
                        <RouterLink
                            :to="value.MENU_URL"
                            active-class="active-link-otros"
                        >
                            <div
                                :id="value.MENU_ID"
                                v-if="value.MENU_TARGET != '_blank'"
                                :title="value.MENU_TITLE"
                                @click="closeMenu()"
                            >
								<span class="text-neutral text-sm">
									{{ $t(value.MENU_TITLE) }}
								</span>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-if="value.MENU_TARGET == '_blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="closeMenu()"
                        >
							<span class="text-neutral text-sm">
								{{ $t(value.MENU_TITLE) }}
							</span>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    </aside>
</template>
<script lang="ts">import { defineComponent, watch } from 'vue'; // Importing the defineComponent function from Vue for component definition
import { useSportBookStore } from '@/stores/sportbook'; // Importing the sportbook store for state management
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing the ExitIcon component
import DoorOut from '@/components/icons/DoorOut.vue'; // Importing the DoorOut component
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper and SwiperSlide components for carousel functionality
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importing Swiper modules for additional features
import { useGlobalStore } from '@/stores/global'; // Importing the global store for shared state management
import Notification from '@/components/Notification.vue'; // Importing the Notification component
import ClockUser from '../ClockUser.vue';
import apiService from '@/services/ApiService';
import { useRouter } from 'vue-router'; // Importing the ClockUser component

export default defineComponent({
    components: {
        Notification, // Registering the Notification component
        SwiperSlide, // Registering the SwiperSlide component
        Swiper, // Registering the Swiper component
        DoorOut, // Registering the DoorOut component
        ExitIcon, // Registering the ExitIcon component
        ClockUser, // Registering the ClockUser component
    },
    setup() {
        let router = useRouter(); // Current route information
        return {
            router,
            modules: [Autoplay, Pagination, Navigation], // Defining Swiper modules to be used in the component
        };
    },
    data() {
        /**
         * Retrieves configuration settings for the component.
         * @returns {Object} The configuration object.
         */
        let config = this.$config();

        /**
         * Reference to the Zendesk integration.
         * @type {any}
         */
        let zendesk: any = this.$zendesk;

        /**
         * Reference to the application component.
         * @type {any}
         */
        let appComponent: any = this.$appComponent;

        /**
         * Accesses the sport book store for state management.
         * @type {ReturnType<typeof useSportBookStore>}
         */
        let sportBookStore = useSportBookStore();

        /**
         * Accesses the global store for state management.
         * @type {ReturnType<typeof useGlobalStore>}
         */
        let globalStore = useGlobalStore();

        /**
         * Flag indicating if titles are currently displayed.
         * @type {boolean}
         */
        let onTitles: boolean = false;

        /**
         * Flag indicating if the language selection dropdown is open.
         * @type {boolean}
         */
        let openSelectLang = false;

        let ligthMode = false; // State for dark mode
        let moonIcon = ''; // Icon for moon
        let sunIcon = ''; // Icon for sun
        let localStorageC = '';
        let lastExecution = 0; // Timestamp for the last execution of a function

        /**
         * Returns the data properties for the component.
         * @returns {Object} The data properties.
         */
        return {
            config,
            zendesk,
            appComponent,
            sportBookStore,
            globalStore,
            onTitles,
            openSelectLang,
            ligthMode,
            moonIcon,
            sunIcon,
            localStorageC,
            lastExecution
        };
    }, // Placeholder for data function or property
    mounted() {
        this.localStorageC = localStorage.getItem('changeThemeColor')

        if (this.localStorageC == 'true') {
            this.ligthMode = true;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
            this.appComponent.themeSportbook = true;
            if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined){
                let deviceTheme = '';
                if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            }
        }
        else {
            this.ligthMode = false;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
            let deviceTheme = '';
            this.appComponent.themeSportbook = false;
            if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                deviceTheme = 'theme_colors_desktop';
            } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                deviceTheme = 'theme_colors_mobile';
            } else {
                deviceTheme = 'theme_colors';
            }
            this.setThemeColor(deviceTheme);

            this.appComponent.gAnalytics('change_theme_color_dark');
        }
    },
    beforeMount() {
        watch(
            () => this.appComponent.session.theme_color_mode,
            (newValue, oldValue) => {
                // Lógica adicional según el nuevo valor
                if (newValue === 1) {
                    localStorage.setItem('changeThemeColor', 'true');
                    this.ligthMode = true;
                    this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
                    this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
                    this.appComponent.themeSportbook = true;
                    if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined){
                        let deviceTheme = '';

                        if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                            deviceTheme = 'theme_colors_ligth_desktop';
                        } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                            deviceTheme = 'theme_colors_ligth_mobile';
                        } else {
                            deviceTheme = 'theme_colors';
                        }
                        this.setThemeColor(deviceTheme);

                        this.appComponent.gAnalytics('change_theme_color_ligth');
                    }
                } else {
                    localStorage.setItem('changeThemeColor', 'false');
                    this.ligthMode = false;
                    this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
                    this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
                    let deviceTheme = '';
                    this.appComponent.themeSportbook = false;
                    if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                        deviceTheme = 'theme_colors_desktop';
                    } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                        deviceTheme = 'theme_colors_mobile';
                    }
                    this.setThemeColor(deviceTheme);

                    this.appComponent.gAnalytics('change_theme_color_dark');
                }
            }
        );
    },
    methods: {
        onRefreshBalance2() {
            const buttons = document.querySelectorAll('#refreshBalance2'); // Get refresh balance button
            buttons.forEach((button) => {
                button.setAttribute('disabled', 'true'); // Disable button to prevent multiple clicks
            });
            const icons = document.querySelectorAll(
                '.fa-refresh2'
            ); // Get all refresh icons

            icons.forEach((element => {
                element.classList.add('fa-refreshFX'); // Add animation class to refresh icon
            }));
            if (Date.now() - this.lastExecution > 5000) { // Check if 5 seconds have passed
                this.appComponent.refreshBalance2(); // Call refresh balance function
                this.lastExecution = Date.now(); // Update last execution timestamp
            }
            setTimeout(() => {
                icons.forEach((element => {
                    element.classList.remove('fa-refreshFX'); // Remove animation class after 5 seconds
                }));
                buttons.forEach((button => {
                    button.removeAttribute('disabled'); // Re-enable button after 5 seconds
                }));
            }, 5000);
        },
        /**
         * Toggles the visibility of the selected menu service.
         * @param {any} id - The ID of the menu service to toggle.
         */
        menuService2(id: any) {
            const allMenus = document.querySelectorAll(
                '[id^="menuServiceDesktop2-"]' // Select all menu elements
            );
            const selectedMenu = document.getElementById(
                'menuServiceDesktop2-' + id // Get the selected menu by ID
            ) as HTMLElement;
            if (selectedMenu.style.display === 'block') {
                selectedMenu.style.display = 'none'; // Hide the selected menu if it's currently visible
            } else {
                allMenus.forEach((menu) => {
                    (menu as HTMLElement).style.display = 'none'; // Hide all menus
                    const menuId = menu.getAttribute('id')?.split('-')[1]; // Extract menu ID
                    const titleServiceElement = document.querySelector(
                        '.titleService2-' + menuId // Select title service element
                    ) as HTMLElement;
                    const arrowElement = document.querySelector(
                        '.arrow' + menuId // Select arrow element
                    ) as HTMLElement;
                    titleServiceElement?.classList.remove('bg-secondary-focus'); // Remove focus class from title
                    arrowElement?.classList.remove('rotate-180'); // Reset arrow rotation
                });
                selectedMenu.style.display = 'block'; // Show the selected menu
                const titleServiceElement = document.querySelector(
                    '.titleService2-' + id // Select title service element for the selected menu
                ) as HTMLElement;
                const arrowElement = document.querySelector(
                    '.arrow' + id // Select arrow element for the selected menu
                ) as HTMLElement;
                titleServiceElement?.classList.add('bg-secondary-focus'); // Add focus class to title
                arrowElement?.classList.add('rotate-180'); // Rotate arrow
            }
        },
        /**
         * Opens the main menu and sets the titles visibility.
         */
        openMenu() {
            this.globalStore.onMenuMain = true; // Sets the global store's menu state to open
            this.onTitles = true; // Sets the titles visibility to true
        },
        /**
         * Closes the main menu and hides the titles.
         */
        closeMenu() {
            this.globalStore.onMenuMain = false; // Sets the global store's menu state to closed
            this.onTitles = false; // Sets the titles visibility to false
        },
        /**
         * Opens the sports book page based on the provided value.
         * @param {Object} value - The value containing menu information.
         */
        openSportBook(value) {
            if (
                value.MENU_URL === '/deportes' && // Checks if the menu URL matches
                value.MENU_ID === 'accion_envivo' // Checks if the menu ID matches
            ) {
                this.sportBookStore.page = 'live'; // Sets the sport book store page to 'live'
            }
        },
        handleDeposit(url: string) {
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
                this.appComponent.config.depositsView !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                window.localStorage.getItem('newViewDeposit') == 'true'
            ) {
                this.appComponent.showModalDepositV3 = true; // Show the new deposit modal
            } else {
                if (
                    this.appComponent.config.depositsView !== undefined &&
                    this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                    this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                    this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                    this.appComponent.config.depositsView[this.appComponent.country].isDefaultView !== undefined &&
                    this.appComponent.config.depositsView[this.appComponent.country].isDefaultView &&
                    !window.localStorage.getItem('newViewDeposit')
                ) {
                    window.localStorage.setItem('newViewDeposit', 'true'); // Update localStorage
                    this.appComponent.showModalDepositV3 = true; // Show the new deposit modal
                } else {
                    this.router.push(url);
                }
            }
        },
        /**
         * Handles the opening of the chat interface.
         * Closes any existing menu and determines the appropriate chat display method
         * based on the application's configuration and country settings.
         */
        onOpenChat() {
            // Close the current menu
            this.closeMenu();

            // Reference ID for the chat iframe
            let ref_id: any = 'cen_ifr_static';

            // Check if the current country configuration is for 'centribal'
            if (
                this.appComponent.config.zendesk[this.appComponent.country]
                    .name == 'centribal'
            ) {
                // Show the centribal iframe layout by removing the hidden class
                document
                    .getElementById('centribal_iframe_layout')
                    ?.classList.remove('centribal_hidden');
                // Add the class to indicate the iframe is open
                document
                    .getElementById('centribal_iframe_layout')
                    ?.classList.add('centribal_open');
                // Send a message to show the chat
                postMessage('show_chat', '', ref_id);
            } else {
                // Open the Zendesk chat for other configurations
                this.zendesk.zE(
                    this.config.zendesk[this.appComponent.country].name,
                    'open',
                );
                // Show the Zendesk chat
                this.zendesk.zE(
                    this.config.zendesk[this.appComponent.country].name,
                    'show',
                );
            }
        }, // Placeholder for chat opening function
        /**
         * Toggles the visibility of a service menu and updates the associated UI elements.
         *
         * @param id - The identifier for the service menu to be toggled.
         */
        menuService(id: any) {
            // Check if the menu is currently displayed
            if (
                (document.getElementById('menuService-' + id) as any).style
                    .display == 'block'
            ) {
                // Hide the menu by setting its display style to 'none'
                (
                    document.getElementById('menuService-' + id) as any
                ).style.display = 'none';
                // Remove the background highlight from the title element
                (
                    document.getElementsByClassName(
                        'titleService-' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-base-100');
                // Remove the rotation effect from the arrow element
                (
                    document.getElementsByClassName(
                        'arrow' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('rotate-180');
            } else {
                // Show the menu by setting its display style to 'block'
                (
                    document.getElementById('menuService-' + id) as any
                ).style.display = 'block';
                // Add the background highlight to the title element
                (
                    document.getElementsByClassName(
                        'titleService-' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-base-100');
                // Add the rotation effect to the arrow element
                (
                    document.getElementsByClassName(
                        'arrow' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('rotate-180');
            }
        }, // Placeholder for menu service function
        /**
         * Toggles the visibility of a service menu and updates the associated UI elements.
         *
         * @param id - The identifier for the service menu to be toggled.
         *
         * This function checks the current display state of the menu associated with the given id.
         * If the menu is currently displayed ('block'), it hides the menu and removes specific classes
         * from the title and arrow elements. If the menu is hidden, it displays the menu and adds
         * the corresponding classes to indicate the active state.
         */
        menuServiceDesktop(id: any) {
            // Check if the menu is currently displayed
            if (
                (document.getElementById('menuServiceD-' + id) as any).style
                    .display == 'block'
            ) {
                // Hide the menu
                (
                    document.getElementById('menuServiceD-' + id) as any
                ).style.display = 'none';
                // Remove the background highlight from the title
                (
                    document.getElementsByClassName(
                        'titleService-' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-base-100');
                // Remove the rotation class from the arrow
                (
                    document.getElementsByClassName(
                        'arrow' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('rotate-180');
            } else {
                // Show the menu
                (
                    document.getElementById('menuServiceD-' + id) as any
                ).style.display = 'block';
                // Add the background highlight to the title
                (
                    document.getElementsByClassName(
                        'titleService-' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-base-100');
                // Add the rotation class to the arrow
                (
                    document.getElementsByClassName(
                        'arrow' + id,
                    ) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('rotate-180');
            }
        }, // Placeholder for desktop menu service function
        hexToHsl(H) {
            if (H !== undefined) {
                let r = 0,
                    g = 0,
                    b = 0;
                if (H.length == 4) {
                    r = '0x' + H[1] + H[1]; // Convert shorthand hex to full hex
                    g = '0x' + H[2] + H[2];
                    b = '0x' + H[3] + H[3];
                } else if (H.length == 7) {
                    r = '0x' + H[1] + H[2]; // Convert full hex to RGB
                    g = '0x' + H[3] + H[4];
                    b = '0x' + H[5] + H[6];
                }
                r /= 255; // Normalize red
                g /= 255; // Normalize green
                b /= 255; // Normalize blue
                let cmin = Math.min(r, g, b),
                    cmax = Math.max(r, g, b),
                    delta = cmax - cmin,
                    h = 0,
                    s = 0,
                    l = 0;
                if (delta == 0) h = 0; // No hue if delta is 0
                else if (cmax == r) h = ((g - b) / delta) % 6; // Calculate hue
                else if (cmax == g) h = (b - r) / delta + 2;
                else h = (r - g) / delta + 4;
                h = Math.round(h * 60); // Convert hue to degrees
                if (h < 0) h += 360; // Adjust hue if negative
                l = (cmax + cmin) / 2; // Calculate lightness
                s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Calculate saturation
                s = +(s * 100).toFixed(1); // Convert saturation to percentage
                l = +(l * 100).toFixed(1); // Convert lightness to percentage
                return '' + h + ' ' + s + '% ' + l + '%'; // Return HSL string
            } else {
                return ''; // Return empty string if input is undefined
            }
        },
        changeLigthMode() {
            this.ligthMode = !this.ligthMode; // Toggle light mode
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
            if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined) {
                localStorage.setItem('changeThemeColor', 'true');
                this.appComponent.themeSportbook = true;
                // If light mode is enabled and light theme is defined
                if (this.appComponent.session.logueado){
                    apiService.request('save_theme_color', {
                        choicedTheme: "1" // Set light theme
                    }).then((response: any) => {
                        if (response.code == 0) {

                        }
                    });
                }


                let deviceTheme = '';

                if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            }
            else {
                localStorage.setItem('changeThemeColor', 'false');
                this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
                this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
                this.appComponent.themeSportbook = false;
                if (this.appComponent.session.logueado){
                    apiService.request('save_theme_color', {
                        choicedTheme: "2" // Set dark theme
                    }).then((response: any) => {
                        if (response.code == 0) {

                        }
                    });
                }

                let deviceTheme = '';
                if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                    deviceTheme = 'theme_colors_desktop';
                } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                    deviceTheme = 'theme_colors_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_dark');
            }
        },
        setThemeColor(device){
            let rootTailwind = document.createElement('style'); // Create a style element for Tailwind CSS variables
            rootTailwind.textContent = `
    	        :root {
				--pf: ${this.hexToHsl(this.appComponent.config[device].primary_focus)} !important;
				--sf: ${this.hexToHsl(this.appComponent.config[device].secondary_focus)} !important;
				--af: ${this.hexToHsl(this.appComponent.config[device].accent_focus)} !important;
				--su: ${this.hexToHsl(this.appComponent.config[device].success)} !important;
				--in: ${this.hexToHsl(this.appComponent.config[device].info)} !important;
				--wa: ${this.hexToHsl(this.appComponent.config[device].warning)} !important;
				--er: ${this.hexToHsl(this.appComponent.config[device].error)} !important;
				--p: ${this.hexToHsl(this.appComponent.config[device].primary)} !important;
				--pc: ${this.hexToHsl(this.appComponent.config[device].primary_content)} !important;
				--s: ${this.hexToHsl(this.appComponent.config[device].secondary)} !important;
				--sc: ${this.hexToHsl(this.appComponent.config[device].secondary_content)} !important;
				--a: ${this.hexToHsl(this.appComponent.config[device].accent)} !important;
				--ac: ${this.hexToHsl(this.appComponent.config[device].accent_content)} !important;
				--n: ${this.hexToHsl(this.appComponent.config[device].neutral)} !important;
				--nf: ${this.hexToHsl(this.appComponent.config[device].neutral_focus)} !important;
				--nc: ${this.hexToHsl(this.appComponent.config[device].neutral_content)} !important;
				--b1: ${this.hexToHsl(this.appComponent.config[device].base_100)} !important;
				--b2: ${this.hexToHsl(this.appComponent.config[device].base_200)} !important;
				--b3: ${this.hexToHsl(this.appComponent.config[device].base_300)} !important;
				--b4: ${this.hexToHsl(this.appComponent.config[device].base_400)} !important;
				--bc: ${this.hexToHsl(this.appComponent.config[device].base_content)} !important;
				--nt: ${this.hexToHsl(this.appComponent.config[device].neutral_text)} !important;
				--it: ${this.hexToHsl(this.appComponent.config[device].info_text)} !important;
				--sb: ${this.hexToHsl(this.appComponent.config[device].sportbook_color)} !important;
				--ic: ${this.hexToHsl(this.appComponent.config[device].input_border)} !important;
				--ip: ${this.hexToHsl(this.appComponent.config[device].input_placeholder)} !important;
				--ib: ${this.hexToHsl(this.appComponent.config[device].input_background)} !important;
                    }
                  [data-theme="main"] .swiper-button-prev,
                  [data-theme="main"] .swiper-button-next,
                  [data-theme="main"] .swiper-button-prev::after,
                  [data-theme="main"] .swiper-button-next::after {
                    color: ${this.appComponent.config[device].primary};
                  }
            `;

            try {
                document.body.appendChild(rootTailwind); // Append the style element to the body
            } catch (e) {
                console.log(e); // Log any errors during appending
            }
        },
        analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMain3|layout:layout-${this.appComponent.config.layout}`,
            };
        },
    },
});</script>
<style scoped>
/* Hide the scrollbar for the desktop menu */
.menu_desktop::-webkit-scrollbar {
    display: none;
}

/* Style for active links with a gradient background and rounded corners */
.active-link {
    background: linear-gradient(
        to right,
        #1c1e2b 28px, /* Color stop at 28px */ #1c1e2b 77%, /* Color stop at 77% */ transparent /* Fades to transparent */
    );
    border-radius: 10px; /* Rounded corners */
}

/* Style for span elements within active links, setting font weight */
.active-link > div > span {
    font-weight: normal !important; /* Override any other font weight */
}

/* Style for SVG icons, setting fixed dimensions */
.svg {
    width: 30px !important; /* Fixed width for SVG */
    height: 35px !important; /* Fixed height for SVG */
}

.fa-refreshFX {
    animation: rotate 1s linear infinite; /* Animation for refresh icon */
}
</style>


<!-- FILE DOCUMENTED -->
