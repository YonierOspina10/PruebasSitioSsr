<script setup>
import { ref, reactive, watch, nextTick, getCurrentInstance, onMounted, computed } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';
import CopyIcon2 from '@/components/icons/CopyIcon2.vue';
import { useAppcomponentStore } from '@/stores/AppComponent';
import apiService from "@/services/ApiService"; // Importing API service for network requests

const props = defineProps({
  isOpen: Boolean,
})

const isCodeComplete = computed(() => verificationCode.every((char) => char !== ''))
const verificationCode = reactive(Array(6).fill(''))
const isActivating = ref(false)
const error = ref('')
const backupCode = ref('ABCD-EFGH-IJKL-MNOP') // This should be generated and provided by the backend
const alternativeModalClose = ref(false)
const alternativeModalDone = ref(false)
const appComponent = useAppcomponentStore().appComponent; // Accessing app component from store\
const qrImg = ref('')

const { proxy } = getCurrentInstance()

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    resetState()
    await nextTick()
    proxy.$refs.inputRefs?.[0]?.focus()
  }
})

function resetState() {
  for (let i = 0; i < 6; i++) {
    verificationCode[i] = ''
  }
  isActivating.value = false
  error.value = ''
}

function onClose() {
    alternativeModalClose.value = true
}

function closeModal() {
    appComponent.switch2FA = false;
    appComponent.switch2FAUser = false;
}

function getQr(){

    apiService.request('get_qr_2FA', {id: appComponent.user_id}).then(response => {
        if (response.HasError === false ) {
            backupCode.value = response.text
            qrImg.value = response.data
        } else {
            error.value = response.AlertMessage || 'No se pudo generar el código de respaldo.'
        }
    })
}

function handleCodeChange(event, index) {
  const val = event.target.value
  if (!val) {
    verificationCode[index] = ''
    return
  }
  const char = val.slice(-1)
  if (/^[0-9a-zA-Z]$/.test(char)) {
    verificationCode[index] = char.toUpperCase()
    if (index < 5) {
      nextTick(() => {
        proxy.$refs.inputRefs?.[index + 1]?.focus()
      })
    }
  } else {
    // Invalid character, reset input
    verificationCode[index] = ''
  }
}

function handleKeyDown(event, index) {
  if (event.key === 'Backspace') {
    if (verificationCode[index] === '') {
      if (index > 0) {
        nextTick(() => {
          proxy.$refs.inputRefs?.[index - 1]?.focus()
        })
      }
    } else {
      verificationCode[index] = ''
    }
    event.preventDefault()
  } else if (event.key === 'ArrowLeft') {
    if (index > 0) {
      nextTick(() => {
        proxy.$refs.inputRefs?.[index - 1]?.focus()
      })
    }
    event.preventDefault()
  } else if (event.key === 'ArrowRight') {
    if (index < 5) {
      nextTick(() => {
        proxy.$refs.inputRefs?.[index + 1]?.focus()
      })
    }
    event.preventDefault()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const paste = (event.clipboardData || window.clipboardData).getData('text')
  const filtered = paste.toUpperCase().replace(/[^0-9A-Z]/g, '')
  for (let i = 0; i < 6; i++) {
    verificationCode[i] = filtered[i] || ''
  }
  nextTick(() => {
    for (let i = 0; i < 6; i++) {
      if (verificationCode[i] === '') {
        proxy.$refs.inputRefs?.[i]?.focus()
        return
      }
    }
    proxy.$refs.inputRefs?.[5]?.focus()
  })
}

async function copyBackupCode() {
  try {
    await navigator.clipboard.writeText(backupCode.value)
  } catch {
    // fallback or error handling
  }
}

function activate() {
    isActivating.value = true
    error.value = ''
    const code = verificationCode.join('')
    let params = {
        state: 'A',
        idUser: appComponent.session.usuario,
        token: code,
    };

    apiService.request('save_2fa_user', params).then(response => {
        if (response.code == 0) {
            isActivating.value = false
            alternativeModalDone.value = true;
        } else {
            error.value = response.msg || 'El código es inválido.'
            isActivating.value = false
        }
    }).catch(() => {
        error.value = 'Error de red. Inténtalo de nuevo.'
        isActivating.value = false
    })
}

onMounted(() => {
    getQr()
})
</script>

<template>
    <div v-if="alternativeModalClose" class="fixed inset-0 -top-12 bg-neutral-content/50 flex justify-center items-center z-[99]">
        <div class="bg-base-200 rounded-lg shadow-xl h-[50%] md:h-[40%] md:w-3/12 w-[80%]">
            <div class="w-full h-full p-6 flex flex-col items-center gap-4 justify-center">
                <div class="flex justify-center items-center">
                    <img src="https://images.virtualsoft.tech/m/msj19212T1758780463.png">
                </div>

                <div class="flex flex-col gap-2 justify-center items-center">
                    <h2 class="text-lg font-poppinssb text-center">{{$t('¿Deseas cerrar el proceso sin activar el doble factor de autenticación?')}}</h2>
                    <p class="text-neutral text-sm md:text-md font-poppinssl text-center">
                        {{
                            $t('Podrás hacerlo más tarde desde esta misma sección.')
                        }}
                    </p>
                </div>

                <div class="w-full flex justify-center items-center gap-2">
                    <button
                        class="w-1/2 bg-transparent hover:bg-primary hover:text-neutral text-primary font-poppinssl py-2 rounded-md disabled:opacity-50 border-1 border-primary"
                        @click="alternativeModalClose = false"
                    >
                        {{$t('Cancelar')}}
                    </button>

                    <button
                        class="w-1/2 bg-primary hover:bg-transparent hover:text-primary text-neutral font-poppinssl py-2 rounded-md disabled:bg-base-100"
                        @click="closeModal()"
                    >
                        {{ $t('Si, cerrar') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="alternativeModalDone"  class="fixed inset-0 -top-12 bg-neutral-content/50 flex justify-center items-center z-[99]">
        <div class="bg-base-200 rounded-lg shadow-xl h-[45%] md:h-[35%] md:w-[25%] w-[70%]">
            <div class="w-full h-full p-8 flex flex-col items-center gap-4 justify-center">
                <div class="flex justify-center items-center">
                    <img src="https://images.virtualsoft.tech/m/msj0212T1758818078.png">
                </div>

                <div class="flex flex-col gap-2 justify-center items-center">

                    <p class="text-neutral text-sm md:text-md font-poppinssl text-center">
                        {{
                            $t('Doble factor de autenticación activado correctamente.')
                        }}
                    </p>
                </div>

                <div class="w-full flex justify-center items-center gap-2">
                    <button
                        class="w-1/2 bg-transparent hover:bg-primary hover:text-neutral text-primary font-poppinssl py-2 rounded-md disabled:opacity-50 border-1 border-primary"
                        @click="
                            alternativeModalDone = false
                            appComponent.switch2FA = false;
                            appComponent.switch2FAUser = true;
                        "
                    >
                        {{$t('Aceptar')}}
                    </button>

                </div>
            </div>
        </div>
    </div>
    <div v-if="isOpen && !alternativeModalDone" class="fixed inset-0 bg-neutral-content/50 flex justify-center items-center z-[90]">
      <div
          class="bg-base-200 rounded-lg shadow-xl md:max-w-lg md:w-8/12 w-[90%]"
          :class="error ? 'h-[98%] md:h-[92%]' : 'h-[95%] md:h-[88%]'"
      >
      <header class="flex justify-between items-center mb-2 md:mb-4 bg-base-300 w-full px-4 py-2 md:px-4 md:py-4  rounded-t-lg">
        <h2 class=" md:text-md font-poppinssb">{{$t('Activación de doble factor de autenticación')}}</h2>
        <button @click="onClose" class="text-2xl leading-none">
            <IconClose :width="20" :height="20" class="fill-neutral" />
        </button>
      </header>

        <section class="w-full h-full px-6 flex flex-col items-center gap-6">
            <div>
                <p class="text-neutral text-sm md:text-md font-poppinssl">
                    {{
                        $t('Escanea el siguiente código QR con una app como Google Authenticator o Microsoft Authenticator.')
                    }}
                </p>
            </div>

            <div class="h-[19.5rem] md:h-[22rem] w-[21.5rem] md:w-[24rem] flex flex-col gap-4 bg-base-200 border-[1px] border-accent-content rounded-lg pt-4 pb-0 md:pb-6 px-4">
                <div class="flex justify-center ">
                    <div class="rounded-lg">
                        <img :src="qrImg" alt="QR Code" class="md:w-[200px] md:h-[200px] w-[150px] h-[150px]" />
                    </div>
                </div>

                <div class=" rounded-md flex flex-col gap-2 justify-center items-center">
                    <p class="font-poppinssl text-[9px] md:text-xs tracking-wider text-center">
                        {{
                            $t('Si no puedes escanear el código QR usa este código:')
                        }}
                    </p>
                    <code class="bg-transparent p-2 rounded border border-accent-content h-12 w-full text-neutral text-sm font-mono select-all flex justify-between items-center">
                        <span>
                            {{ backupCode }}
                        </span>
                        <button @click="copyBackupCode">
                            <CopyIcon2 :width="16" :height="16" class="fill-neutral" />
                        </button>
                    </code>
                </div>
            </div>

            <div class="w-full flex justify-center items-center flex-col gap-1 md:gap-4">
                <p class="text-neutral text-sm text-left md:text-center font-poppinssl">
                    {{
                        $t('Ingresa el código de verificación generado por la aplicación')
                    }}
                </p>

                <div class="flex justify-center gap-4">
                    <input
                        v-for="(digit, index) in verificationCode"
                        :key="index"
                        type="text"
                        inputmode="numeric"
                        maxlength="1"
                        class="w-10 h-12 md:w-14 md:h-16 text-center text-xl md:text-2xl font-poppinssm border bg-transparent border-neutral text-neutral rounded-lg focus:ring-2 focus:bg-accent-focus/10 focus:border-transparent focus:ring-primary focus:outline-none"
                        v-model="verificationCode[index]"
                        @input="handleCodeChange($event, index)"
                        @keydown="handleKeyDown($event, index)"
                        @paste="handlePaste"
                        ref="inputRefs"
                        autocomplete="one-time-code"
                    />
                </div>
                <transition name="fade">
                    <div
                        v-if="error"
                        class="flex flex-wrap items-center gap-2 px-3 rounded-md bg-error/10 border border-error text-error text-sm md:text-base font-poppinssl max-w-full w-full break-words"
                    >
                        <span class="flex-1 text-left">{{ error }}</span>
                    </div>
                </transition>
            </div>

            <div class="w-full flex flex-col justify-center items-center gap-2">
                <div class="w-full flex flex-col md:flex-row justify-center items-center gap-2">
                    <button
                        class="w-full md:w-1/2 bg-transparent hover:bg-primary hover:text-neutral text-primary font-poppinssl py-2 rounded-md disabled:opacity-50 border-1 border-primary"
                        @click="onClose"
                    >
                        {{$t('Cancelar')}}
                    </button>

                    <button
                        class="w-full md:w-1/2 text-neutral font-poppinssl py-2 rounded-md"
                        :class="isActivating || !isCodeComplete ? 'cursor-not-allowed bg-base-100' : 'bg-primary hover:bg-primary/50'"
                        :disabled="isActivating || !isCodeComplete"
                        @click="activate"
                    >
                        {{ $t('Activar 2FA') }}
                    </button>
                </div>
            </div>
        </section>

    </div>
  </div>
</template>
