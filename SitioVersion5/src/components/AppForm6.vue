<template>
    <!-- Main section for the registration form, styled as a flex container -->
    <section
        class="relative w-full h-full flex flex-col justify-start items-center gap-10 pt-14"
    >
        <!-- Title of the registration form -->
        <h2 class="font-bold text-[30px] text-center">
            {{ $t('Registro') }}
        </h2>
        <!-- Container for the form background and content -->
        <div
            class="in w-[90%] max-w-[900px] h-full bg-base-200 border-2 border-base-200 rounded-[30px] md:rounded-[48px] mb-14 shadow-lg shadow-black z-10"
        >
            <!-- Background image and overlay for the form -->
            <div
                class="relative w-full h-44 md:h-[300px] flex justify-center items-start md:items-center pt-6 md:pt-0"
            >
                <img
                    :src="appComponent.config.registerAssets != undefined && appComponent.config.registerAssets.backgroundImage != undefined ? appComponent.config.registerAssets.backgroundImage : 'https://images.virtualsoft.tech/m/msj23212T1712625599.png'"
                    alt="background-form-register"
                    class="absolute top-0 left-0 right-0 w-full h-full object-cover rounded-[30px] md:rounded-t-[45px]"
                />
                <div
                    class="w-full h-52 absolute -bottom-8 md:-bottom-5 left-0 right-0 bg-gradient-to-t from-base-200 z-10"
                ></div>
                <div
                    class="w-[75%] z-30 flex flex-col justify-center items-center gap-2 md:gap-6 md:-mt-10 ml-20"
                >
                    <!-- Subtitle of the registration form -->
                    <h3
                        class="font-bold text-neutral text-[20px] md:text-[48px] text-center flex justify-center items-center w-full mb-2 max-w-[500px]"
                    >
                        {{ $t('Regístrate y Gana') }}
                    </h3>
                    <!-- Description text, conditionally rendered -->
                    <p
                        v-if="description !== ''"
                        class="description-text text-xs md:text-base text-justify text-[#FEFEFE99] w-[75%] md:max-w-[420px]"
                        v-html="description"
                        v-t
                    ></p>
                </div>
                <!-- Left image decoration -->
                <img
                    :src="appComponent.config.registerAssets != undefined && appComponent.config.registerAssets.leftImage != undefined ? appComponent.config.registerAssets.leftImage : 'https://images.virtualsoft.tech/m/msj23212T1712626621.png'"
                    alt="imagen-left"
                    class="absolute -bottom-4 left-0 object-contain w-[35%] md:w-auto opacity-100 md:opacity-40 lg:opacity-100"
                />
                <!-- Right image decoration -->
                <img
                    :src="appComponent.config.registerAssets != undefined && appComponent.config.registerAssets.rightImage != undefined ? appComponent.config.registerAssets.rightImage : 'https://images.virtualsoft.tech/m/msj23212T1712626850.png'"
                    alt="imagen-right"
                    class="absolute bottom-0 right-0 object-contain w-[15%] md:w-auto opacity-40 lg:opacity-100 z-20"
                />
            </div>
            <!-- Form component with validation and submission handling -->
            <Form
                @submit="onSubmit"
                @invalid-submit="onInvalidSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
                class="msform w-full px-4 py-10 lg:px-10 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center"
                ref="myForm"
            >
                <fieldset class="lg:p-5"
					:class="appComponent.config.registro.textColorForm != undefined && appComponent.config.registro.textColorForm != '' ? appComponent.config.registro.textColorForm : 'text-neutral'">
                    <div
                        id=""
                        class="pb-3 grid tablet:grid-cols-2 w-full"
                        :class="[
							twoColumnsMobile ? 'grid-cols-2' : 'grid-cols-1',
							{ 'gap-6': !shortRegister, 'gap-3': shortRegister },
						]"
                    >
                        <div
                            v-for="item in fields"
                            class="form-control px-2"
                            :class="[
								{ 'tablet:col-span-2': item.widthFull },
								{
									hidden:
										item.page != undefined &&
										item.page != page,
								},
							]"
                        >
                            <div class="form-col w-[100%]">
                                <div
                                    v-if="
										item.type != 'checkbox' &&
										item.type != 'button'
									"
                                    class="form-col-title ng-binding flex justify-between"
                                >
									<span
                                        v-if="!shortRegister"
                                        v-html="$t(item.label)"
                                        ref="contentRefs"
                                        class="font-bold text-lg lg:text-xl mb-2"
                                        :style="{
											color:
												fontColorForm != undefined &&
												fontColorForm != ''
													? fontColorForm
													: '#FFFFFF',
										}"
                                    ></span>
                                    <span
                                        v-if="vRequired(item) && !shortRegister"
                                        class="text-red-500"
                                    >*</span
                                    >
                                </div>
                                <div
                                    class="form-col-content div-input relative"
                                    :class="
										item.type == 'radio'
											? item.colCheckbox != undefined &&
												item.colCheckbox
												? 'grid grid-cols-1 gap-y-4 mt-4'
												: item.style != undefined &&
													  item.style == 2
													? 'flex flex-row justify-around h-auto flex-wrap'
													: 'grid grid-cols-2'
											: ''
									"
                                >
                                    <label
                                        v-if="
											item.type == 'text' ||
											item.type == 'textsearch' ||
											item.type == 'phonesearch' ||
											item.type == 'password' ||
											item.type == 'number' ||
											item.type == 'date' ||
											item.type == 'file' ||
											item.type == 'textarea'
										"
                                        :class="{
											'input-group':
												item.icon != undefined &&
												!shortRegister,
										}"
                                    >
                                        <Field
                                            v-if="
												item.type == 'text' ||
												item.type == 'password' ||
												item.type == 'number' ||
												item.type == 'date'
											"
                                            autocomplete="new-password"
                                            @blur="blurField(item, $event)"
                                            @input="changeField(item, $event)"
                                            class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border text-neutral bg-input-background placeholder-input-placeholder drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                            :id="item.name"
                                            :min="minDate"
                                            :max="maxDate"
                                            :name="item.name"
                                            :placeholder="$t(item.placeholder)"
                                            :class="[
												{ 'pl-9': shortRegister },
												{
													inptDate:
														item.type == 'date',
												},
												{
												'!border-success': 
													errors[item.name] === undefined &&
													modelForm[item.name] !== undefined &&
													modelForm[item.name] !== '' &&
													modelForm[item.name] !== null,
												'!border-error': 
													errors[item.name] !== undefined
												},						
												{
													check:
														(errors[item.name] ==
															undefined ||
															errors[
																item.name
															]) &&
														modelForm[item.name] !=
															undefined,
												},
												{
													uppercase:
														item.type === 'text' &&
														item.upperCase !=
															undefined &&
														item.upperCase === true,
												},

											]"
                                            :disabled="item.disabled"
                                            :type="item.type"
                                            v-model="modelForm[item.name]"
                                            v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
                                        />
                                        <button
                                            v-if="item.type == 'password'"
                                            type="button"
                                            class="absolute top-3 tablet:top-6 right-4 hover:scale-125"
                                            id="showpass"
                                            @click="showpass(item.name)"
                                        >
                                            <font-awesome-icon
                                                class="text-2xl text-gray-400"
                                                icon="fa-solid fa-eye"
                                            />
                                        </button>
                                        <Field
                                            v-if="
												item.type == 'textsearch' ||
												item.type == 'phonesearch'
											"
                                            autocomplete="new-password"
                                            @blur="blurField(item, $event)"
                                            @input="changeField(item, $event)"
                                            class="descripcion input input-bordered w-full"
                                            :id="item.name"
                                            :name="item.name"
                                            :placeholder="$t(item.placeholder)"
                                            :class="[
												{ 'pl-9': shortRegister },
												{
													inptDate:
														item.type == 'date',
												},
												{
												'!border-success': 
													errors[item.name] === undefined &&
													modelForm[item.name] !== undefined &&
													modelForm[item.name] !== '' &&
													modelForm[item.name] !== null,
												'!border-error': 
													errors[item.name] !== undefined
												},
												config.layout != undefined &&
												config.layout == 5 &&
												$route.fullPath == '/registro'
													? 'bg-secondary border-primary text-neutral font-poppinssl placeholder:text-primary'
													: 'text-neutral-content',
											]"
                                            :disabled="item.disabled"
                                            :type="'number'"
                                            v-model="modelForm[item.name]"
                                            v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
                                        />
                                        <a
                                            v-if="
												item.type == 'textsearch' ||
												item.type == 'phonesearch'
											"
                                            @click="onClicEventDocNumber(item)"
                                            id="ok-data"
                                            class="btn btn-sm h-[42px] rounded-md p-2 flex absolute top-0 right-0 border-none bg-primary text-white tooltip"
                                            :class="{
												'tooltip-open':
													errors[item.name] ==
														undefined &&
													modelForm[item.name] !=
														undefined &&
													(modelForm['birth_date'] ==
														undefined ||
														modelForm[
															'birth_date'
														] == ''),
											}"
                                            :data-tip="
												item.type == 'textsearch'
													? $t(
															'Clic en OK para validar CPF'
														)
													: item.type == 'phonesearch'
														? $t(
																'Click aqui para validar'
															)
														: ''
											"
                                        ><span class="bg-primary"
                                        >OK</span
                                        ></a
                                        >
                                        <Field
                                            v-if="item.type == 'file'"
                                            class="descripcion input input-bordered w-full border-input-border bg-input-background placeholder-input-placeholder text-neutral"
                                            :class="[
												{ 'pl-9': shortRegister },
												{
													inptDate:
														item.type == 'date',
												},
											]"
                                            accept=".png,.jpg,jpeg"
                                            :id="item.name"
                                            :name="item.name"
                                            :placeholder="$t(item.placeholder)"
                                            :disabled="item.disabled"
                                            :type="item.type"
                                            v-model="modelForm[item.name]"
                                            @change="initFile($event)"
                                            v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
                                        />
                                        <Field
                                            v-if="item.type == 'textarea'"
                                            class="descripcion overflow-auto input input-bordered w-full border-input-border bg-input-background placeholder-input-placeholder text-neutral min-h-12 h-36 max-h-96"
                                            :class="{ 'pl-9': shortRegister }"
                                            as="textarea"
                                            :id="item.name"
                                            :name="item.name"
                                            :placeholder="$t(item.placeholder)"
                                            :disabled="item.disabled"
                                            v-model="modelForm[item.name]"
                                            v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
                                        />
                                    </label>
                                    <Field
                                        as="select"
                                        :value="item.valueDefault"
                                        v-if="item.type == 'select'"
                                        class="descripcion max-w-[100%] w-[100%] select select-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-neutral text-xl font-light border-input-border bg-input-background placeholder-input-placeholder drop-shadow-xl shadow-inner shadow-neutral/10 border"
                                        :id="item.name"
                                        :name="item.name"
                                        v-model="modelForm[item.name]"
                                        :disabled="item.disabled"
                                        v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
										:class="[
										{
										'!border-success':
											errors[item.name] === undefined &&
											modelForm[item.name] !== undefined &&
											modelForm[item.name] !== '' &&
											modelForm[item.name] !== null,
										'!border-error': 
											errors[item.name] !== undefined
										}
										]"
                                        @change="
											changeSelect(
												$event,
												item.optionsKey
											)
										"
                                    >
                                        <option value="">
                                            {{ $t(item.placeholder) }}
                                        </option>
                                        <option
                                            v-for="option in getArraySelects(
												item.optionsKey
											)"
                                            :value="option.value"
                                        >
                                            {{ $t(option.name) }}
                                        </option>
                                    </Field>
                                    <button
                                        v-if="item.type == 'button'"
                                        @click="
											textButton == 'Regístrate'
												? appComponent.gAnalytics(
														'register'
													)
												: ''
										"
                                        class="m-9 y-4 cursor-pointer w-11/12 btn btn-primary w-52 rounded-xl"
                                        v-show="
											!appComponent.disabledButtonForm
										"
                                        :class="{
											'btn btn-primary w-52 rounded-xl':
												shortRegister,
										}"
                                    >
                                        <input
                                            type="submit"
                                            class="submit text-neutral"
                                            :value="
												lastPage
													? $t(textButton)
													: $t('Siguiente')
											"
                                            :class="
												shortRegister == false
													? 'btn btn-primary'
													: ''
											"
                                        />
                                        <IconChevronRight
                                            v-if="shortRegister"
                                            class="inline-block ml-2 button-icon transition-all ease-in-out duration-700"
                                            :fill="'white'"
                                            :width="15"
                                            :height="15"
                                        />
                                    </button>
                                    <div
                                        v-if="item.type == 'radio'"
                                        v-for="option in item.options"
                                        :class="{
											'flex gap-2':
												option.icon != undefined,
										}"
                                        class="mb-6"
                                    >
                                        <div
                                            class="relative w-[25px] h-[25px] flex justify-center items-center"
                                        >
                                            <div
                                                v-if="
													modelForm[item.name] ==
													option.value
												"
                                                class="absolute animate-ping w-full h-full bg-success rounded-full z-1"
                                            ></div>
                                            <Field
                                                :id="item.name"
                                                :name="item.name"
                                                v-bind:value="option.value"
                                                :type="option.type"
                                                v-model="modelForm[item.name]"
                                                :disabled="item.disabled"
                                                v-bind="analyticsAttrs('auth:register:field:' + toKebabCase(item.name))"
                                                class="radio bg-secondary border-2 border-neutral hover:scale-110 w-8 h-8 text-xl"
                                                @change="
													changeFieldRadio(
														item,
														$event
													)
												"
                                            />
                                        </div>
                                        <div
                                            class="flex justify-center items-center"
                                            :class="
												option.icon != undefined &&
												!option.icon.includes(
													'https'
												) &&
												option.icon != ''
													? 'flex-col'
													: 'gap-2'
											"
                                        >
                                            <font-awesome-icon
                                                v-if="
													option.icon != undefined &&
													!option.icon.includes(
														'https'
													)
												"
                                                size="2x"
                                                :icon="option.icon"
                                                :class="
													config.layout !=
														undefined &&
													config.layout == 3
														? 'text-neutral'
														: 'text-neutral-content'
												"
                                            />
                                            <img
                                                v-else-if="
													option.icon != undefined &&
													option.icon != ''
												"
                                                :src="option.icon"
                                                alt=""
                                                class="w-[20px] aspect-square"
                                            />
                                            <span
                                                v-html="$t(option.title)"
                                                class="text-xl font-light"
                                                :style="{
													color:
														fontColorForm !=
															undefined &&
														fontColorForm != ''
															? fontColorForm
															: '#FFFFFF',
												}"
                                            ></span>
                                        </div>
                                    </div>
                                    <div
                                        v-if="item.type == 'checkbox'"
                                        class="flex gap-x-3 mt-10"
                                    >
                                        <label
                                            v-if="
												item.style != undefined &&
												item.style == 2
											"
                                            :data-tip="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? item?.hoverText
													: ''
											"
                                            :class="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? 'tooltip style-v2 tooltip-right'
													: ''
											"
                                            class="relative w-[37px] min-w-[37px] max-w-[37px] h-[21px] bg-accent rounded-full border-1 border-solid border-white cursor-pointer"
                                        >
                                            <Field
                                                @click="
													item.name ==
													'acepta_terminos'
														? appComponent.gAnalytics(
																'checkbox_older'
															)
														: item.name ==
															  'offerRegister'
															? appComponent.gAnalytics(
																	'checkbox_send'
																)
															: ''
												"
                                                :id="item.name"
                                                :name="item.name"
                                                type="checkbox"
                                                value="true"
                                                v-model="modelForm[item.name]"
                                                v-bind="analyticsAttrs('auth:register:consent:' + toKebabCase(item.name))"
                                                class="opacity-0 absolute top-0 left-0 peer"
                                            />
                                            <span
                                                class="flex justify-center items-center absolute top-[-1px] right-[-2px] w-[21px] h-[21px] bg-gradient-to-b from-red-600 to-black/80 bg-error rounded-full peer-checked:bg-success peer-checked:from-success peer-checked:to-black/80 peer-checked:-translate-x-5 transition-all ease-in-out"
                                            >
												<IconCheck
                                                    v-if="modelForm[item.name]"
                                                    class="fill-white w-3 text-center left-[4px]"
                                                ></IconCheck>
												<IconClose
                                                    v-else
                                                    class="fill-white"
                                                    :width="14"
                                                    :height="14"
                                                    fill="white"
                                                ></IconClose>
											</span>
                                        </label>
                                        <label
                                            v-else-if="
												item.style != undefined &&
												item.style == 3
											"
                                            :data-tip="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? item?.hoverText
													: ''
											"
                                            :class="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? 'tooltip style-v2 tooltip-right'
													: ''
											"
                                            class="bg-secondary w-6 h-6 min-w-[21px] rounded-md border-1 border-solid border-neutral relative"
                                        >
                                            <Field
                                                @click="
													item.name ==
													'acepta_terminos'
														? appComponent.gAnalytics(
																'checkbox_older'
															)
														: item.name ==
															  'offerRegister'
															? appComponent.gAnalytics(
																	'checkbox_send'
																)
															: ''
												"
                                                class="opacity-0 absolute top-0 left-0 peer"
                                                :id="item.name"
                                                :name="item.name"
                                                type="checkbox"
                                                value="true"
                                                v-model="modelForm[item.name]"
                                                v-bind="analyticsAttrs('auth:register:consent:' + toKebabCase(item.name))"
                                            />
                                            <span
                                                class="peer-checked:opacity-100 opacity-0 bg-success rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-1 w-3/5 h-3/5"
                                            ></span>
                                        </label>
                                        <Field
                                            v-else
                                            :data-tip="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? item?.hoverText
													: ''
											"
                                            :class="
												item?.hoverText != undefined &&
												item?.hoverText != ''
													? 'tooltip style-v2 tooltip-right'
													: ''
											"
                                            @click="
												item.name == 'acepta_terminos'
													? appComponent.gAnalytics(
															'checkbox_older'
														)
													: item.name ==
														  'offerRegister'
														? appComponent.gAnalytics(
																'checkbox_send'
															)
														: ''
											"
                                            :id="item.name"
                                            :name="item.name"
                                            type="checkbox"
                                            value="true"
                                            checked="checked"
                                            class="checkbox bg-[#353A47]"
                                            v-model="modelForm[item.name]"
                                            v-bind="analyticsAttrs('auth:register:consent:' + toKebabCase(item.name))"
                                        />
                                        <span
                                            v-html="$t(item.label)"
                                            ref="contentRefs"
                                            class="w-full text-center text-xl lg:text-2xl text-neutral font-light"
                                            :style="{
												color:
													fontColorForm !=
														undefined &&
													fontColorForm != ''
														? fontColorForm
														: '#FFFFFF',
											}"
                                        ></span>
                                    </div>
                                    <div
                                        class="alert alert-error p-1 bg-red-500/10 text-red-500 shadow-lg rounded-t-lg"
                                        :class="{
											'col-span-2': item.type == 'radio',
										}"
                                        v-if="
											errors[item.name] != undefined &&
											clearError &&
											item.type != 'button'
										"
                                    >
                                        <div class="flex-1 px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                class="w-5 h-5 stroke-current"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                ></path>
                                            </svg>
                                            <label class="text-sm" v-t>{{
                                                    errors[item.name]
                                                }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ReCAPTCHA component for validation -->
                    <div
                        v-if="recaptcha"
                        id="g-recaptcha"
                        class="g-recaptcha flex justify-center items-center mt-9"
                    ></div>
                    <button
                        v-if="
							fields.findIndex((item) => item.type == 'button') <
							0
						"
                        @click="
							textButton == 'Regístrate'
								? appComponent.gAnalytics('register')
								: ''
						"
						v-bind="analyticsAttrs('auth:register:submit',undefined,`step:submit|step-num:2|component:Form|layout:layout-${appComponent.config.layout}`)"
                        class="mx-auto my-14 cursor-pointer w-[150px] h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl bg-success hover:bg-success/80 flex justify-center items-center font-normal border-2 border-neutral shadow-inner shadow-neutral-content/50 text-xl hover:scale-105"
                        v-show="!appComponent.disabledButtonForm"
                        :class="[
							{
								'button-submit ': shortRegister,
							},
							'btn btn-primary w-52 rounded-xl',
						]"
                    >
                        <input
                            type="submit"
                            class="cursor-pointer submit text-neutral"
                            :value="lastPage ? $t(textButton) : $t('Siguiente')"
                        />
                        <IconChevronRight
                            v-if="shortRegister"
                            class="inline-block ml-2 button-icon transition-all ease-in-out duration-700"
                            :fill="'white'"
                            :width="15"
                            :height="15"
                        />
                    </button>
                    <div
                        v-if="appComponent.disabledCount"
                        class="text-primary pt-5"
                    >
                        {{ $t('Intente de nuevo en: ') }}
                        <vue-countdown
                            v-if="appComponent.disabledCount"
                            :time="appComponent.count"
                            :interval="100"
                            v-slot="{ seconds }"
                            class="text-primary font-poppinsm text-base tablet:text-lg text-center z-1"
                        >
                            {{ seconds }}
                        </vue-countdown>
                        {{ $t(' segundos.') }}
                    </div>
                    <button
                        disabled
                        class="my-9 flex justify-center items-center mx-auto"
                        v-if="appComponent.disabledButtonForm"
                        :class="[
							{
								'button-submit bg-gradient-to-r from-[#5d5d5d] via-primary to-[#5d5d5d] bg-[length:200%_100%] w-full rounded-full transition-all ease-in-out duration-700 h-[55px] btn-shadow':
									shortRegister,
							},
							{ 'btn btn-primary': shortRegister == false },
						]"
                    >
                        <svg
                            aria-hidden="true"
                            role="status"
                            class="w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        <input
                            type="submit"
                            class="submit text-neutral"
                            :value="lastPage ? $t(textButton) : $t('Siguiente')"
                        />
                        <IconChevronRight
                            v-if="shortRegister"
                            class="inline-block ml-2 button-icon transition-all ease-in-out duration-700"
                            :fill="'white'"
                            :width="15"
                            :height="15"
                        />
                    </button>
                    <div
                        id="text-paso"
                        v-if="
							config.registro != undefined &&
							config.registro.steps != undefined &&
							config.registro.steps[appComponent.country] !=
								undefined
						"
                    >
                        {{ page }} {{ $t('de') }}
                        {{ config.registro.steps[appComponent.country] }}
                    </div>
                    <!-- Google Login component -->
                    <GoogleLogin
                        v-if="loginGoogle"
                        :callback="signInWithGoogle"
                        prompt
						v-bind="analyticsAttrs(`auth:register:google-login`)"
                        class="w-full mt-8 flex justify-center items-center"
                        @click="appComponent.gAnalytics('login_google')"
                    />
                    <div
                        v-if="loginFacebook"
                        class="flex items-center justify-center"
                    >
                        <facebook-login
                            :appId="clientId"
                            @loggedIn="signInWithFacebook"
                            @loginFailed="signInWithFacebookFailed"
                            :type="'custom'"
                            :text="$t('Iniciar sesión con Facebook')"
                            :class="'w-auto bg-white border-[1px] transition-all ease-in-out border-solid border-[#dadce0] px-[12px] h-[40px] mt-4 text-gray-600 rounded-md hover:bg-blue-50/30 font-medium'"
                        ></facebook-login>
                    </div>
                    <div class="row">
                        <div
                            v-if="textDown != '' && lastPage"
                            class="col-12 text-justify pb-9 px-4 text-neutral"
                        >
							<span
                                v-html="textDown"
                                class="hover:scale-125 text-lg lg:text-xl"
                            ></span>
                        </div>
                    </div>
                </fieldset>
            </Form>
        </div>
        <!-- Background image for the section -->
        <img
            src="https://images.virtualsoft.tech/m/msj0212T1712947095.png"
            alt="backgroundRegister"
            class="animateImage w-screen object-contain object-bottom absolute bottom-0 left-0 right-0"
        />
    </section>
</template>
<script lang="ts">
// Script section for the component logic
// // Import necessary modules and components from libraries and local files
import { configure, Field, Form } from 'vee-validate'; // Vee-validate for form validation
import IconChevronRight from './icons/IconChevronRight.vue'; // Icon component for right chevron
import IconCheck from './icons/IconCheck.vue'; // Icon component for checkmark
import IconClose from './icons/IconClose.vue'; // Icon component for close action
import apiService from '@/services/ApiService'; // API service for backend communication
import { toKebabCase as toKebabCaseUtil } from '@/utils'; // Utility function to convert strings to kebab-case

// Declare grecaptcha variable for Google reCAPTCHA integration
declare var grecaptcha: any;

// Configure Vee-validate settings for form validation
configure({
	validateOnBlur: true, // Validate when the input loses focus
	validateOnChange: true, // Validate when the input value changes
	validateOnInput: true, // Validate on input event
	validateOnModelUpdate: true, // Validate when the model updates
});

// Import Yup for schema validation
import * as Yup from 'yup'; // Yup for validation schema creation

// Import defineComponent from Vue for component definition
import { defineComponent } from 'vue'; // Vue.js component definition utility

// Import Facebook login component
import FacebookLogin from './FacebookLogin.vue'; // Component for Facebook login functionality

// Import collapsible cards component
import CollapsibleCards from '@/components/CollapsibleCardsPopup.vue'; // Component for collapsible cards popup

// Import exit icon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Icon component for exit action

// Import moment.js for date manipulation
import moment from 'moment'; // Moment.js for handling dates and times

// Export the component definition
export default defineComponent({
	/**
	 * Components used in the Vue instance.
	 * Each component is registered for use within the template.
	 */
	components: {
		/** Icon for exiting or closing actions */
		ExitIcon,

		/** Component for displaying collapsible card elements */
		CollapsibleCards,

		/** Form component for handling user input */
		Form,

		/** Field component representing an individual input field */
		Field,

		/** Chevron icon indicating expandable content */
		IconChevronRight,

		/** Icon representing a checkmark, typically for success */
		IconCheck,

		/** Icon representing a close action */
		IconClose,

		/** Component for handling Facebook login functionality */
		FacebookLogin,
	},
	props: {
		/**
		 * Title of the component.
		 * @type {String}
		 */
		title: String,

		/**
		 * Text to be displayed above the main content.
		 * @type {String}
		 */
		textUp: String,

		/**
		 * Text to be displayed below the main content.
		 * @type {String}
		 */
		textDown: String,

		/**
		 * URL of the primary image.
		 * @type {Object}
		 * @property {String} type - Specifies the type of the property.
		 * @property {String} default - Default value is an empty string.
		 */
		img: {
			type: String,
			default: '',
		},

		/**
		 * URL of the banner image.
		 * @type {Object}
		 * @property {String} type - Specifies the type of the property.
		 * @property {String} default - Default value is an empty string.
		 */
		banner: {
			type: String,
			default: '',
		},

		/**
		 * URL of a secondary image.
		 * @type {Object}
		 * @property {String} type - Specifies the type of the property.
		 * @property {String} default - Default value is an empty string.
		 */
		img2: {
			type: String,
			default: '',
		},

		/**
		 * Text to be displayed on the button.
		 * @type {Object}
		 * @property {String} type - Specifies the type of the property.
		 * @property {String} default - Default value is an empty string.
		 */
		textButton: {
			type: String,
			default: '',
		},

		/**
		 * Fields configuration as an object.
		 * @type {Object}
		 * @property {Array} default - Default value is an empty array.
		 */
		fields: {
			type: Object,
			default: [],
		},

		/**
		 * Boolean to determine if the component should have a specific width style.
		 * @type {Boolean}
		 */
		styleWidth: Boolean,

		/**
		 * Boolean to indicate if the layout should use two columns on mobile devices.
		 * @type {Boolean}
		 */
		twoColumnsMobile: Boolean,

		/**
		 * Configuration for select inputs as an object.
		 * @type {Object}
		 * @property {Object} default - Default value is an empty object.
		 */
		arraySelects: {
			type: Object,
			default: {},
		},

		/**
		 * Model object for v-model binding.
		 * @type {Object}
		 */
		model: Object,

		/**
		 * Boolean to indicate if the component is in a loading state.
		 * @type {Boolean}
		 */
		loading: Boolean,

		/**
		 * Boolean to enable or disable reCAPTCHA.
		 * @type {Boolean}
		 */
		recaptcha: Boolean,

		/**
		 * Background color for the form.
		 * @type {String}
		 */
		backgroundForm: String,

		/**
		 * Font color for the form text.
		 * @type {String}
		 */
		fontColorForm: String,
		/**
		 * Size of the background image.
		 * @type {String}
		 */
		backgroundSize: String,

		/**
		 * Boolean to indicate if the registration form is short.
		 * @type {Boolean}
		 */
		shortRegister: Boolean,

		/**
		 * Boolean to indicate if the component should have a window frame.
		 * @type {Boolean}
		 */
		windowFrame: Boolean,

		/**
		 * Boolean to enable Google login.
		 * @type {Boolean}
		 */
		loginGoogle: Boolean,

		/**
		 * Boolean to enable Facebook login.
		 * @type {Boolean}
		 */
		loginFacebook: Boolean,

		/**
		 * Boolean to indicate if the checkbox column should be displayed.
		 * @type {Boolean}
		 */
		colCheckbox: Boolean,
	},
	data() {
		// Initialize minimum date as an empty string
		let minDate: string = '';
		// Initialize maximum date as an empty string
		let maxDate: string = '';
		// Flag to disable login
		let disabledLogin = false;
		// Retrieve Facebook login client ID from global config
		let clientId: any =
			(window as any).cconfig.facebookLoginClienId != undefined
				? (window as any).cconfig.facebookLoginClienId
				: '';
		// Reference to the refresh balance method
		let refreshBalance = this.$refreshBalance;
		// Retrieve configuration object
		let config = this.$config();
		// Reference to the app component
		let appComponent: any = this.$appComponent;
		// Create an event emitter
		let emitter = this.$emitter();
		// Reference to the model form
		let modelForm: any = this.model;
		// Initialize phone search as an empty string
		let phoneSearch: string = '';
		// Flag to validate phone search
		let phoneSearchValid2: boolean = false;
		// Array to hold terms and conditions
		let TERMINOSYCONDICIONES: any = [];
		/**
		 * Creates a validation schema based on provided fields.
		 * @param fields - Array of field definitions for validation.
		 * @returns Validation schema object.
		 */
		const createValidationSchema = (fields: any = []) => {
			// Reduce fields into a validation schema
			const schema = fields.reduce((schema: any, field: any) => {
				const {
					name,
					validationType,
					validationTypeError,
					validations = [],
				} = field;
				// Initialize validator based on validation type
				let validator = Yup[validationType]().typeError(
					validationTypeError || ''
				);
				// Iterate through validations to apply them
				validations.forEach((validation: any) => {
					let { params, type } = validation;
					if (type == 'when') {
						// Conditional validation based on field values
						if (params[0] == 'bank') {
							params[1] = function (field, schema, test) {
								return name == 'account' &&
									field == '3' &&
									test.parent['account_type'] == '0'
									? schema
											.matches(
												'^[0-9]+$',
												'Apenas números'
											)
											.min(14, 'Mínimo de 14 dígitos')
											.max(14, 'Máximo de 14 dígitos')
									: name == 'account' &&
										  field == '3' &&
										  test.parent['account_type'] == '1'
										? schema
												.matches(
													'^[0-9]+$',
													'Apenas números'
												)
												.min(13, 'Mínimo de 13 dígitos')
												.max(13, 'Máximo de 13 dígitos')
										: name == 'account' && field == '9'
											? schema
													.matches(
														'^[0-9]+$',
														'Apenas números'
													)
													.min(
														13,
														'Mínimo de 13 dígitos'
													)
													.max(
														13,
														'Máximo de 13 dígitos'
													)
											: name == 'account'
												? schema
														.required(
															'Campo requerido'
														)
														.min(
															3,
															'Mínimo de 3 dígitos'
														)
														.max(
															25,
															'Máximo de 25 dígitos'
														)
												: name == 'bank2' &&
													  field !== test.value
													? schema.matches(
															'^[A-Z]+$',
															'Banco y confirmar banco no coinciden.'
														)
													: schema;
							};
						} else {
							// Additional conditional validations for other fields
							if (params[0] == 'account') {
								params[1] = function (field, schema, test) {
									return field !== test.value
										? schema.matches(
												'^[A-Z]+$',
												'Número de cuenta y confirmar número de cuenta no coinciden.'
											)
										: schema;
								};
							} else {
								if (params[0] == 'cod_interbank') {
									params[1] = function (field, schema, test) {
										return field !== test.value
											? schema.matches(
													'^[A-Z]+$',
													'Código interbancario y confirmar código interbancario no coinciden.'
												)
											: schema;
									};
								} else {
									if (params[0] == 'password') {
										params[1] = function (
											field,
											schema,
											test
										) {
											return field !== test.value
												? schema.matches(
														'^[0-9]+$',
														'Contraseña y confirmar contraseña no coinciden.'
													)
												: schema;
										};
									} else {
										if (params[0] == 'new_password') {
											params[1] = function (
												field,
												schema,
												test
											) {
												return field !== test.value
													? schema.matches(
															'^[0-9]+$',
															'Contraseña y confirmar contraseña no coinciden.'
														)
													: schema;
											};
										}
										if (params[0] == 'email') {
											params[1] = function (
												field,
												schema,
												test
											) {
												return field !== test.value
													? schema.matches(
															'^[0-9]+$',
															'Correo electrónico y Confirmar correo electrónico no coinciden.'
														)
													: schema;
											};
										} else {
											if (params[0] == 'is_a_pep') {
												params[1] = function (
													field,
													schema
												) {
													return field == 'S'
														? schema.required(
																'Campo requerido'
															)
														: schema;
												};
											} else {
												if (
													params[0] ==
													'family_members_pep'
												) {
													params[1] = function (
														field,
														schema
													) {
														return field == 'S'
															? schema.required(
																	'Campo requerido'
																)
															: schema;
													};
												} else {
													if (
														params[0] ==
														'situations_to_be_reported'
													) {
														params[1] = function (
															field,
															schema
														) {
															return field == 'S'
																? schema.required(
																		'Campo requerido'
																	)
																: schema;
														};
													} else {
														if (
															params[0] ==
															'account_type'
														) {
															params[1] =
																function (
																	field,
																	schema
																) {
																	return field ==
																		0 ||
																		field ==
																			2
																		? schema
																				.matches(
																					'^[0-9]+$',
																					'Apenas números'
																				)
																				.min(
																					11,
																					'Mínimo de 11 dígitos'
																				)
																				.max(
																					11,
																					'Máximo de 11 dígitos'
																				)
																		: field ==
																			  1
																			? schema.email(
																					'e-mail inválido'
																				)
																			: schema;
																};
														} else {
															if (
																params[0] ==
																'doctype_id'
															) {
																if (
																	validation.validations
																) {
																	let validationDni =
																		validation.validations.filter(
																			(
																				item
																			) =>
																				item.value ==
																				'1'
																		);
																	let validationCc =
																		validation.validations.filter(
																			(
																				item
																			) =>
																				item.value ==
																				'2'
																		);
																	let validationPs =
																		validation.validations.filter(
																			(
																				item
																			) =>
																				item.value ==
																				'3'
																		);
																	params[1] =
																		function (
																			field,
																			schema
																		) {
																			return name ==
																				'docnumber' &&
																				field ==
																					'1' &&
																				validationDni.length >
																					0
																				? schema
																						.matches(
																							'^[0-9]+$',
																							'Sólo números'
																						)
																						.min(
																							validationDni[0]
																								.params[0],
																							validationDni[0]
																								.params[1]
																						)
																						.max(
																							validationDni[1]
																								.params[0],
																							validationDni[1]
																								.params[1]
																						)
																				: name ==
																							'docnumber' &&
																					  field ==
																							'2' &&
																					  validationCc.length >
																							0
																					? schema
																							.matches(
																								'^[0-9]+$',
																								'Sólo números'
																							)
																							.min(
																								validationCc[0]
																									.params[0],
																								validationCc[0]
																									.params[1]
																							)
																							.max(
																								validationCc[1]
																									.params[0],
																								validationCc[1]
																									.params[1]
																							)
																					: name ==
																								'docnumber' &&
																						  field ==
																								'3' &&
																						  validationPs.length >
																								0
																						? schema
																								.matches(
																									'^[0-9]+$',
																									'Sólo números'
																								)
																								.min(
																									validationPs[0]
																										.params[0],
																									validationPs[0]
																										.params[1]
																								)
																								.max(
																									validationPs[1]
																										.params[0],
																									validationPs[1]
																										.params[1]
																								)
																						: schema;
																		};
																} else {
																	params[1] =
																		function (
																			field,
																			schema
																		) {
																			return name ==
																				'docnumber' &&
																				field ==
																					'1'
																				? schema
																						.matches(
																							'^[0-9]+$',
																							'Sólo números'
																						)
																						.min(
																							8,
																							'Mínimo de 8 dígitos'
																						)
																						.max(
																							8,
																							'Máximo de 8 dígitos'
																						)
																				: name ==
																							'docnumber' &&
																					  field ==
																							'2'
																					? schema
																							.matches(
																								'^[0-9]+$',
																								'Sólo números'
																							)
																							.min(
																								9,
																								'Mínimo de 9 dígitos'
																							)
																							.max(
																								9,
																								'Máximo de 9 dígitos'
																							)
																					: schema;
																		};
																}
															} else {
																if (
																	params[0] ==
																	undefined
																) {
																	params[0] =
																		function (
																			schema
																		) {
																			return schema;
																		};
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					// Check if the validator type exists
					if (!validator[type]) {
						return;
					}
					// Apply the validation parameters to the validator
					validator = validator[type](...params);
				});
				// Concatenate the current schema with the new validator
				return schema.concat(Yup.object().shape({ [name]: validator }));
			}, Yup.object().shape({}));
			// Return the constructed validation schema
			return schema;
		};
		// Create the validation schema using the defined fields
		const schema = createValidationSchema(this.fields);
		// Initialize pagination variables
		let page: number = 1;
		let clearError: boolean = true;
		let lastPage: boolean = true;
		// Flag to validate phone search
		let phoneSearchValid: boolean = true;
		// Object to hold color configurations
		let colors: any = {};
		// Define the device theme
		let deviceTheme: string = 'theme_colors';
		// Initialize description as an empty string
		let description = '';
		// Return the data properties for the component
		return {
			config,
			minDate,
			maxDate,
			refreshBalance,
			appComponent,
			emitter,
			disabledLogin,
			clientId,
			schema,
			modelForm,
			page,
			clearError,
			lastPage,
			phoneSearch,
			phoneSearchValid,
			phoneSearchValid2,
			showModal: false,
			TERMINOSYCONDICIONES,
			titleTyC: '',
			isRecaptchaRendered: false,
			colors,
			deviceTheme,
			description,
		};
	},
	created() {
		/**
		 * Lifecycle hook that is called when the component is created.
		 * This function determines the theme colors based on the device type
		 * and sets the description for the 'Registro' form if available.
		 */
		if (
			/**
			 * Check if desktop theme colors are defined and mobileL is empty.
			 */
			this.appComponent.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		) {
			// Set deviceTheme to desktop theme colors
			this.deviceTheme = 'theme_colors_desktop';
		} else if (
			/**
			 * Check if mobile theme colors are defined and mobileL is not empty.
			 */
			this.appComponent.config.theme_colors_mobile != undefined &&
			this.appComponent.config.mobileL != ''
		) {
			// Set deviceTheme to mobile theme colors
			this.deviceTheme = 'theme_colors_mobile';
		}
		// Assign the colors based on the determined deviceTheme
		this.colors = this.appComponent.config[this.deviceTheme];
		if (
			/**
			 * Check if the description for the 'Registro' form is defined.
			 */
			this.appComponent.config['forms']['Registro'].description !=
			undefined
		) {
			// Set the description for the 'Registro' form
			this.description =
				this.appComponent.config['forms']['Registro'].description;
		}
	},
	/**
	 * Lifecycle hook that is called when the component is updated.
	 * This method checks if reCAPTCHA should be rendered and initializes it if necessary.
	 */
	updated() {
		// Check if reCAPTCHA is enabled, not already rendered, and the element exists in the DOM
		if (
			this.recaptcha && // Indicates if reCAPTCHA is enabled
			!this.isRecaptchaRendered && // Ensures reCAPTCHA has not been rendered yet
			document.getElementById('g-recaptcha') != null // Checks for the existence of the reCAPTCHA element
		) {
			try {
				// Set a timeout to render reCAPTCHA after a delay
				setTimeout(() => {
					// Render the reCAPTCHA widget
					grecaptcha.render(
						document.getElementById('g-recaptcha'), // Target element for reCAPTCHA
						{
							sitekey: this.config.captchaKey, // Site key for reCAPTCHA from configuration
						},
						true // Indicates that the reCAPTCHA should be rendered in a specific mode
					);
					this.isRecaptchaRendered = true; // Mark reCAPTCHA as rendered
				}, 500); // Delay of 500 milliseconds before rendering
			} catch (e) {
				// Log any errors that occur during the rendering process
				console.log(e);
			}
		}
	},
	/**
	 * Lifecycle hook that is called when the component is unmounted.
	 * This method checks if the current view is not the landing sorteos page.
	 * If the condition is met, it deletes the 'accept:modal' event from the emitter.
	 */
	unmounted() {
		// Check if the current view is not the landing sorteos page
		if (this.appComponent.viewActual.indexOf('/landing/sorteos') == -1) {
			// Remove the 'accept:modal' event from the emitter
			this.emitter.all.delete('accept:modal');
		}
	},
	/**
	 * Lifecycle hook that is called before the component is unmounted.
	 * This is used to clean up event listeners to prevent memory leaks.
	 */
	beforeUnmount() {
		// Check if contentRefs is defined in the component's references
		if (this.$refs.contentRefs) {
			// Iterate over each reference in contentRefs
			(this.$refs.contentRefs as any).forEach((ref, index) => {
				// Remove the click event listener for each reference
				ref.removeEventListener(
					'click',
					(event) => this.handleContentClick(event, index) // Handle click event with the corresponding index
				);
			});
		}
	},
	mounted() {
		// Check if fields are defined and have elements
		if (
			this.fields != undefined &&
			this.fields != null &&
			this.fields.length > 0
		) {
			// Iterate through each field to find 'birth_date'
			this.fields.forEach((field) => {
				if (field.name != undefined && field.name == 'birth_date') {
					var today = new Date(); // Get today's date
					let dateMin = today.setFullYear(today.getFullYear() - 18); // Set minimum date to 18 years ago
					let dateMax = today.setFullYear(today.getFullYear() - 82); // Set maximum date to 82 years ago
					this.maxDate = moment(dateMin).format('YYYY-MM-DD'); // Format and assign max date
					this.minDate = moment(dateMax).format('YYYY-MM-DD'); // Format and assign min date
				}
			});
		}
		// Filter fields to find document type list
		let DocTypeList2 = this.fields.filter((item) => {
			return item.optionsKey == 'docTypeList'; // Check for document type list
		});
		// If document type list exists
		if (DocTypeList2.length > 0) {
			// Find the default document type
			let defaultDoctype2 = DocTypeList2[0].options.filter((item) => {
				return item.default != undefined && item.default == true; // Check for default option
			})[0];
			const elementName = DocTypeList2[0].name; // Get the name of the document type list
			let inputId = '';
			// Iterate through fields to find input ID based on validations
			this.fields.forEach((item) => {
				item.validations.forEach((validation) => {
					if (
						validation.type == 'when' &&
						validation.params.includes(elementName) // Check for conditional validation
					) {
						inputId = item.name; // Assign input ID
					}
				});
			});
			// Get the input element by ID
			let inputElement = document.getElementById(
				inputId
			) as HTMLInputElement;
			// If input element and default document type are defined, set input type
			if (
				inputElement &&
				defaultDoctype2 != undefined &&
				defaultDoctype2.type != undefined
			) {
				inputElement.type = defaultDoctype2.type; // Set the input type
			}
		}
		// Set a timeout to add click event listeners to content references
		setTimeout(() => {
			if (this.$refs.contentRefs) {
				(this.$refs.contentRefs as any).forEach((ref, index) => {
					ref.addEventListener(
						'click',
						(event) => this.handleContentClick(event, index) // Handle content click
					);
				});
			}
		}, 500);
		// Check if 'registro' is not in the current view
		if (this.appComponent.viewActual.indexOf('registro') == -1) {
			// Delete steps for the current country if defined
			this.appComponent.config.registro != undefined &&
			this.appComponent.config.registro.steps != undefined &&
			this.appComponent.config.registro.steps[
				this.appComponent.country
			] != undefined
				? delete this.appComponent.config.registro.steps[
						this.appComponent.country
					]
				: '';
		}
		// Set a timeout to render reCAPTCHA if conditions are met
		setTimeout(() => {
			if (
				this.recaptcha &&
				!this.isRecaptchaRendered &&
				document.getElementById('g-recaptcha') != null
			) {
				try {
					setTimeout(() => {
						grecaptcha.render(
							document.getElementById('g-recaptcha'),
							{
								sitekey: this.config.captchaKey, // Set reCAPTCHA site key
							},
							true
						);
						this.isRecaptchaRendered = true; // Mark reCAPTCHA as rendered
					}, 500);
				} catch (e) {
					console.log(e); // Log any errors during rendering
				}
			}
		}, 500);
		// Listen for 'accept:modal' event to accept modal
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Call acceptModal method
		});
		// Listen for 'resend:code' event to resend verification code
		this.emitter.on('resend:code', () => {
			var params = {
				type: 1,
				phone: this.modelForm['phone'], // Get phone number from model form
			};
			apiService.request('verify_phone', params).then((response: any) => {
				if (response.code == 0) {
					// If response is successful, show modal with verification info
					this.appComponent.modal = {
						showModal: 'searchCodePhone',
						messageModal: {
							tickedCheckPhone: response.ticked,
						},
					};
				} else {
					var error_mensaje = '';
					// Check for specific error codes and set error message
					if (response.error_code != undefined) {
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString()
						);
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
						); // Default error message
					}
					// Show notification modal with error message
					this.appComponent.modal = {
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
				}
			});
		});
		// Check if registration steps are defined for the current country
		this.config.registro == undefined ||
		this.config.registro.steps == undefined ||
		this.config.registro.steps[this.appComponent.country] == undefined
			? (this.lastPage = true) // Set lastPage to true if not defined
			: (this.lastPage = false); // Otherwise, set to false
	},
	watch: {
		/**
		 * Watches for changes in the 'model' property.
		 * @param {any} val - The new value of the 'model' property.
		 */
		model: function (val) {
			// Updates 'modelForm' with the current value of 'model'
			this.modelForm = this.model;
		},
	},
	/**
	 * @emits {Event} onSubmit:form - Emitted when the form is submitted.
	 * @emits {Event} changeSelect:form - Emitted when a select field changes.
	 * @emits {Event} changeField:form - Emitted when any field in the form changes.
	 */
	emits: ['onSubmit:form', 'changeSelect:form', 'changeField:form'],
	methods: {
		/**
		 * Handles click events on content, specifically for anchor tags.
		 * @param {MouseEvent} event - The click event.
		 * @param {number} index - The index of the clicked item.
		 */
		handleContentClick(event, index) {
			// Check if the clicked element is an anchor tag
			if (event.target.tagName === 'A') {
				event.preventDefault(); // Prevent default anchor behavior
				const href = event.target.getAttribute('href'); // Get the href attribute
				let objConfig = ''; // Configuration object for terms
				let objConfig2 = ''; // Alternate configuration object for terms

				// Determine the type of content based on the href
				if (href.indexOf('terminosycondiciones') != -1) {
					this.titleTyC = this.$t('Términos y Condiciones');
					objConfig = 'termsandcondition';
					objConfig2 = 'termns_and_conditions';
				} else {
					if (href.indexOf('preguntasfrecuentes') != -1) {
						this.titleTyC = this.$t('Preguntas frecuentes');
						objConfig = 'faq';
						objConfig2 = 'faq';
					} else {
						if (href.indexOf('juego-responsable') != -1) {
							this.titleTyC = this.$t('Juego responsable');
							objConfig = 'responsiblegaming';
							objConfig2 = 'responsible_gaming';
						} else {
							if (href.indexOf('politica-de-privacidad') != -1) {
								this.titleTyC = this.$t(
									'Politica de Privacidad'
								);
								objConfig = 'privacypolicy';
								objConfig2 = 'privacy_policies';
							}
						}
					}
				}

				// Check for configuration settings for not logged in users
				if (
					this.config != undefined &&
					this.config['not_login'] != undefined &&
					this.config['not_login'][this.appComponent.lngProd] !=
						undefined &&
					this.config['not_login'][this.appComponent.lngProd][
						objConfig2
					] != undefined
				) {
					this.TERMINOSYCONDICIONES =
						this.config['not_login'][this.appComponent.lngProd][
							objConfig2
						];
				} else {
					// Check for configuration settings for logged in users
					if (
						this.config != undefined &&
						this.config[objConfig] != undefined &&
						this.config[objConfig][this.appComponent.country] !=
							undefined &&
						this.config[objConfig][this.appComponent.country][
							this.appComponent.lngProd
						] != undefined
					) {
						this.TERMINOSYCONDICIONES =
							this.config[objConfig][this.appComponent.country][
								this.appComponent.lngProd
							];
					}
				}
				this.showModal = true; // Show the modal
			}
		},

		/** Closes the modal. */
		closeModal() {
			this.showModal = false; // Set showModal to false
		},

		/**
		 * Handles sign-in with Facebook.
		 * @param {Object} userFacebook - The Facebook user response object.
		 */
		signInWithFacebook(userFacebook) {
			console.log('Handle the response', userFacebook); // Log the response
			this.appComponent.loadView = false; // Set loading view to false
			const params = {
				id_token: userFacebook.authResponse.accessToken, // Get access token
				country: this.appComponent.country, // Get country
				type: 2, // Set type for Facebook sign-in
			};
			this.disabledLogin = true; // Disable login button
			apiService
				.request('external_auth', params) // Make API request for external authentication
				.then((response: any) => {
					if (response.code == 0) {
						// Successful response handling
						this.appComponent.firstReqBalance = false;
						this.appComponent.tokenSB = response.data.tokenSB;
						this.appComponent.user_id = response.data.user_id;
						this.appComponent.channel_id = response.data.channel_id;
						this.appComponent.id_platform =
							response.data.id_platform;
						this.appComponent.tokenUser = response.data.auth_token;
						apiService.setAuthToken(response.data.auth_token); // Set auth token
						this.appComponent.showModalLogin = false; // Hide login modal
						window.localStorage.setItem(
							'auth_token',
							response.data.auth_token // Store auth token in local storage
						);
						this.appComponent.flagMenu = true; // Set menu flag
						this.appComponent.frm = 'lgn'; // Set form type
						this.refreshBalance(); // Refresh user balance
					} else {
						// Error handling
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.loadView = true; // Set loading view to true
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Set modal title
							messageModal: error_mensaje, // Set error message
							buttonModal: this.$t('Aceptar'), // Set button text
							orderModal: 'closeModal', // Set modal order action
						};
					}
				});
		},

		/** Handles failed Facebook sign-in. */
		signInWithFacebookFailed() {
			var error_mensaje = this.$t(
				'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
			);
			this.appComponent.modal = {
				showModal: 'notification', // Show notification modal
				titleModal: this.$t('Error!'), // Set modal title
				messageModal: error_mensaje, // Set error message
				buttonModal: this.$t('Aceptar'), // Set button text
				orderModal: 'closeModal', // Set modal order action
			};
		},

		/**
		 * Handles sign-in with Google.
		 * @param {Object} userGoogle - The Google user response object.
		 */
		signInWithGoogle(userGoogle) {
			console.log('Handle the response', userGoogle); // Log the response
			this.appComponent.loadView = false; // Set loading view to false
			const params = {
				id_token: userGoogle.credential, // Get credential token
				country: this.appComponent.country, // Get country
				type: 1, // Set type for Google sign-in
			};
			apiService
				.request('external_auth', params) // Make API request for external authentication
				.then((response: any) => {
					if (response.code == 0) {
						// Successful response handling
						this.appComponent.firstReqBalance = false;
						this.appComponent.tokenSB = response.data.tokenSB;
						this.appComponent.user_id = response.data.user_id;
						this.appComponent.channel_id = response.data.channel_id;
						this.appComponent.id_platform =
							response.data.id_platform;
						this.appComponent.tokenUser = response.data.auth_token;
						apiService.setAuthToken(response.data.auth_token); // Set auth token
						this.appComponent.showModalLogin = false; // Hide login modal
						window.localStorage.setItem(
							'auth_token',
							response.data.auth_token // Store auth token in local storage
						);
						this.appComponent.flagMenu = true; // Set menu flag
						this.appComponent.frm = 'lgn'; // Set form type
						this.refreshBalance(); // Refresh user balance
					} else {
						// Error handling
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.loadView = true; // Set loading view to true
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Set modal title
							messageModal: error_mensaje, // Set error message
							buttonModal: this.$t('Aceptar'), // Set button text
							orderModal: 'closeModal', // Set modal order action
						};
					}
				});
		},

		/** Accepts the current modal action. */
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'verifyPhone') {
				var params = {
					type: 1, // Set type for phone verification
					phone: this.phoneSearch, // Get phone number
				};
				apiService
					.request('verify_phone', params) // Make API request for phone verification
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'searchCodePhone', // Show search code modal
								messageModal: {
									tickedCheckPhone: response.ticked, // Set message with ticked check
								},
							};
						} else {
							// Error handling
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString()
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set error message
								buttonModal: this.$t('Aceptar'), // Set button text
								orderModal: 'closeModal', // Set modal order action
							};
						}
					});
			} else {
				if (
					this.appComponent.modal.orderModal == 'verifyPhoneSuccess'
				) {
					this.phoneSearchValid = false; // Set phone search validity
					let phoneValue = JSON.parse(
						JSON.stringify(this.modelForm['phone']) // Store current phone value
					);
					this.modelForm['phone'] = null; // Clear phone input
					setTimeout(() => {
						this.schema.fields['phone'].conditions.forEach(
							(item, index) => {
								this.schema.fields['phone'].conditions[index][
									'fn'
								] = (field, schema) => {
									return schema; // Reset validation function
								};
							}
						);
						this.modelForm['phone'] = phoneValue; // Restore phone value
						(document.getElementById('phone') as any).focus(); // Focus on phone input
					}, 10);
				}
			}
			this.appComponent.closeModal(); // Close the modal
		},

		/**
		 * Submits the form.
		 * @param {Object} item - The form data to submit.
		 */
		onSubmit(item) {
			if (this.lastPage) {
				this.appComponent.disabledButtonForm = true; // Disable form button
				var sg = true; // Flag for submission validation
				if (this.recaptcha) {
					if (grecaptcha.getResponse().length === 0) {
						sg = false; // Set flag to false if recaptcha is not completed
					}
				}
				if (sg) {
					this.$emit('onSubmit:form', item); // Emit form submission event
				}
			} else {
				this.page++; // Increment page number
				this.clearError = false; // Clear error flag
				if (
					this.page ==
					this.config.registro.steps[this.appComponent.country]
				) {
					this.lastPage = true; // Set last page flag
				}
			}
		},

		/**
		 * Handles invalid form submission.
		 * @param {Object} errors - The validation errors.
		 */
		onInvalidSubmit({ errors }) {
			this.clearError = true; // Set clear error flag
			if (
				this.config != undefined &&
				this.config.registro != undefined &&
				this.config.registro.steps != undefined &&
				this.config.registro.steps[this.appComponent.country] !=
					undefined &&
				this.config.registro.steps[this.appComponent.country]
			) {
				let fieldsPage: any = []; // Array to hold fields for the current page
				this.fields
					.filter((field) => {
						return field.page == this.page; // Filter fields for the current page
					})
					.forEach((item: any) => {
						fieldsPage.push(item.name); // Add field names to the array
					});
				var common = fieldsPage.filter(
					(x) => Object.keys(errors).indexOf(x) !== -1 // Find common fields with errors
				);
				if (common.length == 0) {
					if (
						this.page <
						this.config.registro.steps[this.appComponent.country]
					) {
						this.page++; // Move to the next page
						this.clearError = false; // Clear error flag
						if (
							this.page ==
							this.config.registro.steps[
								this.appComponent.country
							]
						) {
							this.lastPage = true; // Set last page flag
						}
					}
				}
			}
		},

		/**
		 * Checks if a field is required.
		 * @param {Object} field - The field to check.
		 * @returns {boolean} - True if the field is required, false otherwise.
		 */
		vRequired(field: any) {
			let value = field.validations.filter((item) => {
				return item.type == 'required'; // Filter for required validations
			});
			if (value.length > 0) {
				return true; // Return true if required
			}
			return false; // Return false if not required
		},

		/**
		 * Retrieves an array of select options based on the key.
		 * @param {string} optionsKey - The key for the select options.
		 * @returns {Array} - The array of select options.
		 */
		getArraySelects(optionsKey: string) {
			for (var _key in this.arraySelects) {
				return this.arraySelects[optionsKey]; // Return the select options for the given key
			}
		},

		/**
		 * Handles changes in select inputs.
		 * @param {Event} event - The change event.
		 * @param {any} optionsKey - The key for the select options.
		 */
		changeSelect: function (event: any, optionsKey: any) {
			this.$emit('changeSelect:form', { event, optionsKey }); // Emit change event
		},

		/**
		 * Initializes file input and checks for valid image files.
		 * @param {Event} event - The change event from the file input.
		 */
		initFile(event: any) {
			var file = event.target.files[0]; // Get the selected file
			if (file) {
				if (/^image/.test(file.type)) {
					// Check if the file is an image
					if (
						parseInt((file.size / 1024).toString()) <=
						this.config.maxSizeFile // Check file size against the maximum allowed
					) {
						this.readFile(file, event.target.id); // Read the file
					} else {
						this.modelForm[event.target.id] = ''; // Clear the input if file is too large
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error'), // Set modal title
							messageModal: this.$t(
								'Supera tamaño máximo permitido.' // Set error message
							),
							buttonModal: this.$t('Aceptar'), // Set button text
							orderModal: 'closeModal', // Set modal order action
						};
					}
				} else {
					alert('Not a valid image!'); // Alert if the file is not a valid image
				}
			}
		},
		/**
		 * Reads a file and processes its content.
		 *
		 * @param {File} file - The file to be read.
		 * @param {string} name - The name associated with the file.
		 */
		readFile(file, name) {
			var reader = new FileReader(); // Creates a new FileReader instance to read the file.
			const vthis = this; // Preserves the context of 'this' for use in callbacks.

			// Event handler for when the file reading operation is complete.
			reader.onloadend = function () {
				vthis.processFile(reader.result, file.type, name); // Processes the file content after reading.
			};

			// Event handler for errors that occur during file reading.
			reader.onerror = function () {
				alert('There was an error reading the file!'); // Alerts the user in case of an error.
			};

			reader.readAsDataURL(file); // Initiates reading the file as a data URL.
		},
		/**
		 * Processes an image file by resizing it if necessary and storing it in the modelForm.
		 *
		 * @param {string} dataURL - The data URL of the image to be processed.
		 * @param {string} fileType - The type of the file (e.g., 'image/png', 'image/jpeg').
		 * @param {string} name - The key under which the processed image will be stored in modelForm.
		 */
		processFile(dataURL, fileType, name) {
			var maxWidth = 800; // Maximum width for the resized image
			var maxHeight = 800; // Maximum height for the resized image
			const vthis = this; // Preserve the context of 'this'
			var image = new Image(); // Create a new Image object
			image.src = dataURL; // Set the source of the image to the provided data URL

			// Event handler for when the image has loaded
			image.onload = function () {
				var width = image.width; // Get the original width of the image
				var height = image.height; // Get the original height of the image
				var shouldResize = width > maxWidth || height > maxHeight; // Determine if resizing is needed

				if (!shouldResize) {
					vthis.modelForm[name] = dataURL; // Store the original data URL if no resizing is needed
					return dataURL; // Return the original data URL
				}

				var newWidth; // Variable to hold the new width after resizing
				var newHeight; // Variable to hold the new height after resizing

				// Calculate new dimensions while maintaining aspect ratio
				if (width > height) {
					newHeight = height * (maxWidth / width); // Calculate new height based on maxWidth
					newWidth = maxWidth; // Set new width to maxWidth
				} else {
					newWidth = width * (maxHeight / height); // Calculate new width based on maxHeight
					newHeight = maxHeight; // Set new height to maxHeight
				}

				var canvas = document.createElement('canvas'); // Create a canvas element for drawing
				canvas.width = newWidth; // Set the canvas width to the new width
				canvas.height = newHeight; // Set the canvas height to the new height
				var context: any = canvas.getContext('2d'); // Get the 2D drawing context of the canvas
				context.drawImage(image, 0, 0, newWidth, newHeight); // Draw the resized image onto the canvas
				dataURL = canvas.toDataURL(fileType); // Convert the canvas content back to a data URL
				vthis.modelForm[name] = dataURL; // Store the resized data URL in modelForm
				return dataURL; // Return the resized data URL
			};

			// Event handler for when there is an error loading the image
			image.onerror = function () {
				alert('There was an error processing your file!'); // Alert the user about the error
			};
		},
		/**
		 * Emits an event when a radio field is changed.
		 *
		 * @param {any} item - The item associated with the radio field.
		 * @param {any} event - The event object from the radio field change.
		 */
		changeFieldRadio(item: any, event: any) {
			this.$emit('changeField:form', { item, event });
		},
		/**
		 * Handles changes to form fields and applies validation rules based on the field type.
		 *
		 * @param {any} item - The form field item that is being changed.
		 * @param {any} event - The event triggered by the change in the form field.
		 */
		changeField(item: any, event: any) {
			// Check if the changed field is 'docnumber'
			if (item.name == 'docnumber') {
				// Filter validations related to document number existence
				let existsDocNumber = item.validations.filter((validation) => {
					return (
						validation.type == 'when' &&
						(validation.exists_doc_number || validation.valid_rut)
					);
				});
				// If there are validations for document number
				if (existsDocNumber.length > 0) {
					existsDocNumber.forEach((existDocNumber, index) => {
						// Assign a function to the schema conditions for the field
						this.schema.fields[item.name].conditions[index]['fn'] =
							(field, schema) => {
								return schema;
							};
						// If valid RUT is required
						if (existDocNumber.valid_rut) {
							/**
							 * Cleans the RUT by removing leading zeros and non-numeric characters.
							 *
							 * @param {string} rut - The RUT to clean.
							 * @returns {string} - The cleaned RUT.
							 */
							function clean(rut) {
								return typeof rut === 'string'
									? rut
											.replace(/^0+|[^0-9kK]+/g, '')
											.toUpperCase()
									: '';
							}

							/**
							 * Formats the RUT by adding a hyphen before the last character.
							 *
							 * @param {string} rut - The RUT to format.
							 * @returns {string} - The formatted RUT.
							 */
							function format(rut) {
								rut = clean(rut);
								let result =
									rut.slice(0, -1) +
									'-' +
									rut.substr(rut.length - 1);
								return result;
							}

							// Update the model form with the formatted RUT after a short delay
							setTimeout(() => {
								this.modelForm[item.name] = format(
									event.target.value
								);
							}, 10);
						}
					});
				}
			}
			// Check if the changed field is 'phone'
			if (item.name == 'phone') {
				// Filter validations related to phone existence
				let existsPhone = item.validations.filter((validation) => {
					return (
						validation.type == 'when' &&
						(validation.exists_phone || validation.phone_search)
					);
				});
				// If there are validations for phone
				if (existsPhone.length > 0) {
					existsPhone.forEach((existPhone, index) => {
						// Assign a function to the schema conditions for the field
						this.schema.fields[item.name].conditions[index]['fn'] =
							(field, schema) => {
								return schema;
							};
					});
				}
			}
			// Check if the changed field is 'email'
			if (item.name == 'email') {
				// Filter validations related to email existence
				let existsEmail = item.validations.filter((validation) => {
					return validation.type == 'when' && validation.exists_email;
				});
				// If there are validations for email
				if (existsEmail.length > 0) {
					// Assign a function to the schema conditions for the field
					this.schema.fields[item.name].conditions[0]['fn'] = (
						field,
						schema
					) => {
						return schema;
					};
				}
			}
			// Check if the changed field is 'birth_date'
			if (item.name == 'birth_date') {
				// Filter validations related to minimum age
				let minimumAge = item.validations.filter((validation) => {
					return validation.type == 'when' && validation.minimum_age;
				});
				// If there are validations for minimum age
				if (minimumAge.length > 0) {
					// Assign a function to the schema conditions for the field
					this.schema.fields[item.name].conditions[0]['fn'] = (
						field,
						schema
					) => {
						if (field != undefined) {
							// Calculate age based on the provided birth date
							let date = new Date(field + 'T00:00:00').getTime();
							let diff_ms = Date.now() - date;
							let age_dt = new Date(diff_ms);
							let age = Math.abs(age_dt.getUTCFullYear() - 1970);
							// Return an error if the age is less than 18
							return age < 18
								? schema.length(
										1,
										this.$t('Infringe edad mínima')
									)
								: schema;
						}
					};
				}
			}
			// Check if the changed field is 'doc_number'
			if (item.name == 'doc_number') {
				// Filter validations related to document number check
				let checkDoc = item.validations.filter((validation) => {
					return validation.type == 'when' && validation.check_doc;
				});
				// If there are validations for document number check
				if (checkDoc.length > 0) {
					// Assign a function to the schema conditions for the field
					this.schema.fields[item.name].conditions[0]['fn'] = (
						field,
						schema
					) => {
						if (field != undefined) {
							// Return an error if the document number does not match the session's document
							return field != this.appComponent.session.cedula
								? schema.length(
										0,
										this.$t(
											'Cédula debe coincidir con la registrada'
										)
									)
								: schema;
						}
					};
				}
			}
		},
		/**
		 * Handles the blur event for form fields to validate document number, phone, and email.
		 * @param item - The form field item being validated.
		 * @param event - The event triggered by the blur action.
		 */
		blurField(item: any, event: any) {
			// Check if the field is for document number
			if (item.name == 'docnumber') {
				// Filter validations related to document number
				let existsDocNumber = item.validations.filter((validation) => {
					return (
						validation.type == 'when' &&
						(validation.exists_doc_number || validation.valid_rut)
					);
				});
				// Proceed if there are validations and the field is not empty
				if (existsDocNumber.length > 0 && event.target.value != '') {
					// Iterate through each validation for document number
					existsDocNumber.forEach((existDocNumber, index) => {
						// Check if the validation requires document number existence
						if (existDocNumber.exists_doc_number) {
							// Request to check if the document number exists
							apiService
								.request('exists_identificator', {
									docnumber: event.target.value,
								})
								.then((response: any) => {
									// If the document number exists
									if (response.code == 12) {
										// Set validation function for the schema
										this.schema.fields[
											item.name
										].conditions[index]['fn'] = (
											field,
											schema
										) => {
											return schema.length(
												0,
												this.$t(
													'Cedula ya esta registrada'
												)
											);
										};
										// Focus on the document number input field
										(
											document.getElementById(
												item.name
											) as any
										).focus();
									}
								});
						}
						// Check if the validation requires RUT validation
						if (existDocNumber.valid_rut) {
							const stringWithNumbers = event.target.value;
							// Extract only numbers and valid characters from the input
							const onlyNumbers = stringWithNumbers.replace(
								/[^0-9+-kK]+/g,
								''
							);

							/**
							 * Calculates the verification digit for RUT.
							 * @param T - The RUT number.
							 * @returns The verification digit.
							 */
							function dv(T) {
								var M = 0,
									S = 1;
								for (; T; T = Math.floor(T / 10))
									S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
								return S ? S - 1 : 'k';
							}

							/**
							 * Validates the complete RUT format.
							 * @param rutCompleto - The complete RUT string.
							 * @returns True if valid, otherwise false.
							 */
							function validaRut(rutCompleto) {
								if (
									!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(
										rutCompleto
									)
								)
									return false;
								var tmp = rutCompleto.split('-');
								var digv = tmp[1];
								var rut = tmp[0];
								if (digv == 'K') digv = 'k';
								return dv(rut) == digv;
							}

							// Validate the extracted RUT
							if (!validaRut(onlyNumbers)) {
								// Set validation function for invalid RUT
								this.schema.fields[item.name].conditions[index][
									'fn'
								] = (field, schema) => {
									return schema.length(
										0,
										this.$t(
											'RUT Inválido, Ingrese dígito de verificación separado por -'
										)
									);
								};
								// Focus on the document number input field
								(
									document.getElementById(item.name) as any
								).focus();
							}
						}
					});
				}
			}
			// Check if the field is for phone number
			if (item.name == 'phone') {
				// Filter validations related to phone number
				let existsPhone = item.validations.filter((validation) => {
					return (
						validation.type == 'when' &&
						(validation.exists_phone || validation.phone_search)
					);
				});
				// Proceed if there are validations and the field is not empty
				if (existsPhone.length > 0 && event.target.value != '') {
					// Iterate through each validation for phone number
					existsPhone.forEach((existPhone, index) => {
						// Check if the validation requires phone existence
						if (existPhone.exists_phone) {
							// Request to check if the phone number exists
							apiService
								.request('exists_phone', {
									phone: event.target.value,
								})
								.then((response: any) => {
									// If the phone number exists
									if (response.code == 12) {
										this.phoneSearchValid2 = false;
										// Set validation function for the schema
										this.schema.fields[
											item.name
										].conditions[0]['fn'] = (
											field,
											schema
										) => {
											return schema.length(
												0,
												this.$t(
													'Celular ya esta registrado'
												)
											);
										};
										// Focus on the phone input field
										(
											document.getElementById(
												item.name
											) as any
										).focus();
									} else if (response.code == 0) {
										this.phoneSearchValid2 = true;
									}
								});
						}
						// Check if the validation requires phone search
						if (existPhone.phone_search) {
							if (this.phoneSearchValid) {
								// Set validation function for phone verification
								this.schema.fields[item.name].conditions[index][
									'fn'
								] = (field, schema) => {
									if (this.phoneSearchValid2)
										return schema.length(
											0,
											this.$t(
												'Celular debe ser verificado'
											)
										);
								};
							}
						}
					});
				}
			}
			// Check if the field is for email
			if (item.name == 'email') {
				// Filter validations related to email
				let existsEmail = item.validations.filter((validation) => {
					return validation.type == 'when' && validation.exists_email;
				});
				// Proceed if there are validations and the field is not empty
				if (existsEmail.length > 0 && event.target.value != '') {
					// Request to check if the email exists
					apiService
						.request('exists_email', { email: event.target.value })
						.then((response: any) => {
							// If the email exists
							if (response.code == 12) {
								// Set validation function for the schema
								this.schema.fields[item.name].conditions[0][
									'fn'
								] = (field, schema) => {
									return schema.length(
										0,
										'Usuario ya esta registrado'
									);
								};
								// Focus on the email input field
								(
									document.getElementById(item.name) as any
								).focus();
							}
						});
				}
			}
		},
		/**
		 * Handles the click event for document number input.
		 * @param item - The item that triggered the click event, containing type and name properties.
		 */
		onClicEventDocNumber(item: any) {
			// Check if the item type is 'textsearch'
			if (item.type == 'textsearch') {
				// Filter fields that are marked for text search
				let textSearchFields = this.fields.filter((field) => {
					return field.textSearch;
				});
				// Prepare parameters for API request
				var params = {
					// Document number from the model form
					docnumber: this.modelForm[item.name],
					// Determine the country based on resident ID or fallback to app component's country
					country:
						this.modelForm['countryResident_id'] != undefined
							? this.arraySelects['countryResidentList']
									.filter(
										(x) =>
											x.Id ==
											this.modelForm['countryResident_id']
									)
									.map((x) => x.Iso)[0]
							: this.appComponent.country,
				};
				// Make an API request to validate CPF
				apiService
					.request('validate_cpf', params)
					.then((response: any) => {
						// Check if the response code indicates success
						if (response.code == 0) {
							// If data is returned, process it
							if (response.data.length > 0) {
								// Format birth date by removing the time part
								response.data[0]['birth_date'] =
									response.data[0]['birth_date'].replace(
										'T00:00:00Z',
										''
									);
								// Populate model form fields with response data
								textSearchFields.forEach((field) => {
									this.modelForm[field.name] =
										response.data[0][field.name];
								});
							}
						} else {
							// If response code indicates failure, clear the fields
							textSearchFields.forEach((field) => {
								this.modelForm[field.name] = '';
							});
						}
					});
			} else {
				// If item type is not 'textsearch', set a timeout for further actions
				setTimeout(() => {
					// Focus on the email input field
					(document.getElementById('email') as any).focus();
					// Check if the item type is 'phonesearch' and validate phone number
					if (
						item.type == 'phonesearch' &&
						this.modelForm[item.name].length != '' &&
						this.phoneSearchValid2
					) {
						// Set phone search value
						this.phoneSearch = this.modelForm[item.name];
						// Prepare modal notification for phone verification
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Verificar Celular'),
							messageModal: this.$t(
								'Para verificar su celular enviaremos un código a su celular'
							),
							buttonModal: this.$t('Enviar Código'),
							orderModal: 'verifyPhone',
						};
					}
				}, 500);
			}
		},
		/**
		 * Toggles the visibility of the password input field.
		 *
		 * @param {string} id - The ID of the password input element.
		 */
		showpass(id) {
			// Retrieve the password input element by its ID
			let pwd: any = document.getElementById(id);

			// Check if the current type of the input is 'password'
			if (pwd.type === 'password') {
				// Change the type to 'text' to show the password
				pwd.type = 'text';
			} else {
				// Change the type back to 'password' to hide the password
				pwd.type = 'password';
			}
		},
		toKebabCase(value: string) {
            return toKebabCaseUtil(value);
        },
        analyticsAttrs(label: string, position?: number, context?: string, extra?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context':
                    context ? context : `step:fill-form|step-num:1|component:Form|layout:layout-${this.appComponent.config.layout}${extra ? `|${extra}` : ''}`,
                ...(position !== undefined && { 'data-analytics-position': position }),

            };
        },
	},
});
</script>
<style scoped>
/* Class for animating images with an up-and-down motion */
.animateImage {
	animation: 2s ease-in-out up-and-down infinite; /* Animation duration, easing, and infinite loop */
}

/* Keyframes for the up-and-down animation */
@keyframes up-and-down {
	0% {
		transform: translateY(0); /* Initial position */
	}
	50% {
		transform: translateY(-10px); /* Move up by 10px */
	}
	100% {
		transform: translateY(0); /* Return to initial position */
	}
}

/* Styles for focused date input fields */
input[type='date']:focus::before,
input[type='date'].check::before {
	content: '' !important; /* Override default content */
}

/* Custom styles for the calendar picker indicator in date inputs */
.inptDate::-webkit-calendar-picker-indicator {
	background-color: transparent !important; /* Make background transparent */
	border-radius: 2px; /* Rounded corners */
}

/* Styles for elements within an input group */
.input-group > *,
.input-group > .input,
.input-group > .textarea,
.input-group > .select {
	border-radius: 0.75rem !important; /* Rounded corners for input group elements */
}

/* Button styles with shadow effects */
.btn-shadow {
	box-shadow:
		inset 0px -2px 4px 0px #00000026,
		/* Inner shadow */ inset 0px 4px 4px 0px #ffffff45; /* Inner highlight */
	font-family: Poppins-Medium !important; /* Font family */
}

/* Hover effect for submit buttons */
.button-submit:hover {
	background-position: 100% 0; /* Change background position on hover */
}

/* Animation for button icon on hover */
.button-submit:hover .button-icon {
	transform: translateX(10px); /* Move icon to the right */
}

/* Tooltip styles for non-version 2 tooltips */
.tooltip:not(.style-v2):after {
	border-color: hsl(221deg 8% 46%) transparent transparent transparent !important; /* Tooltip arrow color */
}

.tooltip:not(.style-v2):before {
	background-color: hsl(
		221deg 8% 46%
	) !important; /* Tooltip background color */
	color: white !important; /* Tooltip text color */
}

/* Responsive styles for tooltips on smaller screens */
@media screen and (max-width: 763px) {
	.tooltip:not(.style-v2):before {
		left: -217% !important; /* Adjust position on small screens */
	}
}

/* Container styles with rounded corners and shadow */
.containar {
	border-radius: 16px; /* Rounded corners */
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
	border: 1px solid rgba(255, 255, 255, 0.47); /* Light border */
}

/* Styles for close button with shadow */
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important; /* Inner shadow */
}

/* Modal background color and z-index */
.modal {
	background-color: #0000004f !important; /* Semi-transparent black background */
	z-index: 999 !important; /* High stacking order */
}

/* Styles for form label inputs */
input.FormLabel {
	color: black !important; /* Text color */
}

/* Styles for submit button with shadow */
.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important; /* Inner shadow */
}

/* Remove default appearance for number input spin buttons */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none; /* Remove default styling */
	margin: 0; /* Remove margin */
}

/* Style for number input to appear as text field */
input[type='number'] {
	-moz-appearance: textfield; /* Firefox specific styling */
}

/* Styles for country flags */
.country-flags {
	width: 16px; /* Width of the flag */
	height: 10px; /* Height of the flag */
}

/* Strong text within description */
.description-text strong {
	font-weight: 800 !important; /* Bold text */
}
</style>

<!-- FILE DOCUMENTED -->
