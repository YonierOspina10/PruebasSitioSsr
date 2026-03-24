<template>
    <Teleport to="body">
        <div
            v-if="appComponent.config.layout == undefined || appComponent.config.layout != 3"
            class="modal in w-screen h-screen bg-black/80"
        >
            <div
                class="modal-box w-full max-w-[98%] sm:max-w-[700px] h-full max-h-[80svh] sm:max-h-[900px] overflow-hidden"
            >
                <label
                    @click="closeModal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                >
                <h3
                    class="font-bold text-lg text-black"
                    v-t
                >
                    {{ 'Paybox' }}
                </h3>

                <div class="w-full h-[96%]">
                    <!-- Iframe para Plux -->
                    <iframe
                        ref="pluxIframe"
                        :src="appComponent.modalPlux"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"
                        allow="payment"
                        style="width: 100%; height: 100%; border: none"
                    ></iframe>
                </div>
            </div>
        </div>

        <dialog
            v-else-if="appComponent.config.layout == 3"
            class="modal in w-screen h-screen bg-black/80"
        >
            <div
                class="relative rounded-box w-full max-w-[98%] sm:max-w-[700px] h-full max-h-[80svh] sm:max-h-[900px] overflow-hidden text-base-300"
            >
                <button
                    class="absolute right-6 top-5 hover:scale-125"
                    @click="closeModal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M2 2L18 18"
                            stroke="white"
                            stroke-width="3"
                        />
                        <path
                            d="M18 2L2 18"
                            stroke="white"
                            stroke-width="3"
                        />
                    </svg>
                </button>
                <h3
                    class="w-full p-4 bg-secondary text-xl font-bold"
                    v-t
                >
                    {{ 'Paybox' }}
                </h3>
                <div
                    class="w-full h-full bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box max-h-[70vh] overflow-y-auto"
                >
                    <!-- Iframe para Plux -->
                    <iframe
                        ref="pluxIframe"
                        :src="appComponent.modalPlux"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"
                        allow="payment"
                        style="width: 100%; height: 100%; border: none"
                    ></iframe>
                </div>
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;

function closeModal() {
    appComponent.modalPlux = false;
}
</script>
