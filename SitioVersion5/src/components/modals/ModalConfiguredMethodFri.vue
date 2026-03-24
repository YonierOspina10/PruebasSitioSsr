<script lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { defineComponent } from "vue";
import apiService from "@/services/ApiService";
import IconClose from "../icons/IconClose.vue";
import IconCheck from "../icons/IconCheck.vue";
import IconCheckv2 from "../icons/IconCheckv2.vue";

export default defineComponent({
  components: {
    Form,
    Field,
    IconClose,
    IconCheckv2,
  },

  props: {
    data: { type: Object, default: () => ({ id: "", logo: "" }) },
  },

  data() {
    return {
		progressValue : 0,
      config: this.$config(),
      emitter: this.$emitter(),
      appComponent: this.$appComponent,

      // ✅ Estados del formulario
      showErrorForm: false,
      showSuccessForm: false,
      showLoading: false,

      // Modelo del formulario
      modelConfigMethods: {
        friUsername: "",
        friPhoneNumber: "",
      },

      // Esquema de validación (si lo necesitas)
      schema: Yup.object().shape({
        friUsername: Yup.string().required("Este campo es obligatorio"),
        friPhoneNumber: Yup.string().required("Este campo es obligatorio"),
      }),
    };
  },
  methods: {
	  startProgress() {
    this.progressValue = 0; // ✅ reinicia siempre desde 0
    const interval = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 10; // velocidad del progreso
      } else {
        clearInterval(interval);
      }
    }, 100);
  },

    // ✅ Vuelve al formulario desde el error
    resetFormView() {
      this.showErrorForm = false
      this.showSuccessForm = false
      this.showLoading = false

	    this.modelConfigMethods.friUsername = "";
  this.modelConfigMethods.friPhoneNumber = "";
    },

    // ✅ Enviar datos y mostrar loading mínimo 2 segundos
    async confirmedMethods() {
      this.showErrorForm = false
      this.showSuccessForm = false
      this.showLoading = true
    this.startProgress();

      const delay = new Promise(resolve => setTimeout(resolve, 2000))

      const params = {
        id: this.data.id,
        friUsername: this.modelConfigMethods.friUsername,
        friPhoneNumber: this.modelConfigMethods.friPhoneNumber,
      }

      try {
        const apiRequest = apiService.request("configured_method", params)
        const [response] = await Promise.all([apiRequest, delay])

        if (response.code === 0) {
          this.showSuccessForm = true
        } else {
          this.showErrorForm = true
        }
      } catch (error) {
        this.showErrorForm = true
      } finally {
        this.showLoading = false
      }
    },
  },
})
</script>

<template>
	<!-- Main modal container with overlay -->
	<div
		class="text-base-content content-center md:h-[25rem] md:w-full h-[40rem]"
	>
		<!-- Modal box with rounded corners -->
		<div class="rounded-2xl overflow-visible p-0 relative">
			<!-- Container for form data -->
			<div class="container-data md:flex items-center">
				<!-- Image display section -->
				<div
					class="h-full flex justify-center md:items-start"
				>
				<img src="https://images.virtualsoft.tech/ms/msj0212T1761076201.png" 
					class="w-[10rem] mt-4 md:mt-0 md:w-[17rem]"
					style="
					@media (min-width: 768px) {
					-webkit-mask-image: none;
					mask-image: none;
					}
					-webkit-mask-image: linear-gradient(to right, transparent, black 30%);
					mask-image: linear-gradient(to right, transparent, black 30%);
				"		
				>
					<!-- <img
						width="240"
						height="240"
						class="w-full h-full object-contain p-10"
						:src="data.logo"
					/> -->
				</div>
				<!-- Form for user input -->
                <div
                    v-if="!showLoading && !showErrorForm && !showSuccessForm"
                    class="w-full md:w-[75%] flex justify-center items-center">
                    <Form
                        @submit="confirmedMethods()"
                        :validation-schema="schema"
                        v-slot="{ errors }"
                        class="bg-base-200 p-4 h-[20rem] rounded-xl md:m-4 w-full text-center md:w-[30rem]"
                    >
                        <div>
                            <h2 class="text-primary text-bold py-4">Registra tu cuenta de FRI</h2>
                        </div>
                        <!-- Username input field -->
                        <div class="form-control mb-4">
                            <Field
                                id="friUsername"
                                name="friUsername"
                                :placeholder="$t('Usuario FRI')"
                                required="true"
                                v-model="modelConfigMethods.friUsername"
                                :class="[
							'input input-bordered bg-input-backgraund m-1 py-4 text-center rounded-full placeholder:text-input-neutral text-neutral',
							errors.friUsername ? 'border-error' : ''
							]"
                                type="text"
                            />

                            <!-- Error message pequeño y centrado -->
                            <div
                                v-if="errors.friUsername"
                                class="text-error text-sm text-center bg-error/20 -mt-1 rounded-b-xl w-[15rem] self-center"
                            >
                                {{ errors.friUsername }}
                            </div>
                        </div>
                        <!-- Phone number input field -->
                        <div class="form-control">
                            <Field
                                type="number"
                                id="friPhoneNumber"
                                :class="[
							'input input-bordered bg-input-backgraund m-1 py-4 text-center rounded-full placeholder:text-input-neutral text-neutral',
							errors.friUsername ? 'border-error' : ''
							]"
                                name="friPhoneNumber"
                                :placeholder="$t('Teléfono')"
                                v-model="modelConfigMethods.friPhoneNumber"
                            />
                            <!-- Error message for phone number field -->
                            <div
                                v-if="errors.friPhoneNumber != undefined"
                                class="text-error text-sm text-center bg-error/20 -mt-1 rounded-b-xl w-[15rem] self-center"
                            >

                                {{ $t(errors.friPhoneNumber) }}
                                <!-- Display error message -->
                            </div>
                        </div>
                        <!-- Submit button for the form -->
                        <div class="modal-action flex justify-center items-center">
                            <button
                                type="submit"
                                aria-label="Login"
                                for="m-modal-login"
                                class="bg-primary px-8 w-full py-2 text-neutral rounded-full hover:scale-105 capitalize mb-6"
                                :disabled="
								modelConfigMethods.friUsername == '' &&
								modelConfigMethods.friPhoneNumber == ''
							"
                            >
                                {{ $t('Guardar') }}
                                <!-- Button text -->
                            </button>
                        </div>
                    </Form>
                </div>

				<div
  v-else-if="showLoading"
	class="bg-base-200 text-center flex flex-col justify-center items-center z-10 p-8 rounded-xl w-full md:w-[30rem] h-[20rem] md:m-4"
>
  <p class="text-neutral font-bold mb-4">Estamos procesando tus datos...</p>
<progress
  class="progress progress-primary w-56"
  :value="progressValue"
  max="100">
</progress>
</div>

<div
  v-else-if="showErrorForm"
  class="bg-base-200 text-center flex flex-col justify-center items-center z-10 p-8 rounded-xl w-full md:w-[30rem] h-[20rem] md:m-4"
>
  <IconClose class="text-error border-solid border-2 border-error p-2 rounded-full w-16 h-16 mb-4"></IconClose>
  <p class="text-neutral font-regular mb-1">¡Parece que hay un error con tus datos!</p>
  <p class="text-neutral font-bold mb-6">Inténtalo nuevamente</p>
<button
  @click="resetFormView()"
  class="bg-primary self-end text-white px-6 py-2 rounded-full hover:scale-105 transition"
>
  Reintentar
</button>

</div>

<!-- ✅ MENSAJE DE ÉXITO -->
<div
	v-else-if="showSuccessForm"
  	class="bg-base-200 text-center flex flex-col justify-center items-center z-10 p-8 rounded-xl w-full md:w-[30rem] h-[20rem] md:m-4"
>
  <IconCheckv2 class="fill-success relative  p-2 rounded-full w-20 h-20 mb-4"></IconCheckv2>
	<p class="text-neutral mb-4">
	Te has registrado <span class="font-bold">correctamente</span>
	</p>
  <button
    @click="appComponent.closeModal()"
    class="bg-primary  self-end text-white px-6 py-1 rounded-full hover:scale-105 transition"
  >
    Finalizar 
  </button>
</div>
				
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->