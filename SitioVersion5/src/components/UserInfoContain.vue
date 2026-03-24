<script lang="ts">
import { defineComponent, watch } from 'vue';
import NotificationIcon from '@/components/icons/notificationIcon.vue';
import AppModalReferralsAwards from '@/components/modals/ModalReferralsAwards.vue';
import InfoIconRe from '@/components/icons/InfoIconRe.vue';

/**
 * Component definition for managing referral awards.
 */
export default defineComponent({
    components: {
        InfoIconRe,
        NotificationIcon,
        AppModalReferralsAwards,
    },
    props: {
        isActive1: {
            type: Boolean,
            default: false,
        },
        data1: Object,
        data2: Object,
    },
    data: function () {
        // Initialize component data properties
        let emitter = this.$emitter();
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        let info2: any = this.data2;
        let info1: any = this.data1;
        let selecType: any = '';
        let positionY: number | null = null;
        let positionX: number | null = null;
        const index: number | null = null;
        const bonus: object | null = null;
        let pp: any = this.info1;
        return {
            config,
            appComponent,
            info2,
            emitter,
            info1,
            index,
            bonus,
            positionX,
            positionY,
            selecType,
            pp,
        };
    },
    beforeMount() {
        // Set pp to data1 before the component mounts
        this.pp = this.data1;
    },
    mounted() {
        // Initialize appComponent properties after the component is mounted
        this.appComponent.startUnawarded = 0;
        this.appComponent.startAwarded = 0;
    },
    methods: {
        /**
         * Show the modal for referral awards.
         * @param {Object} bonos - The bonus information.
         * @param {number} iUser - The user ID.
         * @param {number} iAward - The award ID.
         */
        showModal(bonos, iUser, iAward, tokenId) {
            this.appComponent.showModalReferralAwards = true;
            const params = {
                userId: iUser,
                tokenId: tokenId,
                AwardId: iAward,
                bonos: bonos,
            };
            this.appComponent.modal.configuredMethod = params;
        },
        /**
         * Handle mouse over event to position tooltip.
         * @param {MouseEvent} e - The mouse event.
         * @param {number} index - The index of the item.
         */
        onMoseOver(e, index) {
            let elementP = e.target.offsetParent;
            const before = getComputedStyle(e.target, 'before');
            const beforeHeight = before.getPropertyValue('height').slice(0, -2);
            const elementClientX = elementP.getBoundingClientRect().x;
            const tooltipClientX = e.target.getBoundingClientRect().x;
            const elementClientY = elementP.getBoundingClientRect().y;
            const tooltipClientY = e.target.getBoundingClientRect().y;
            this.positionY = tooltipClientY;
            this.positionX = tooltipClientX;
            if (elementClientY + parseFloat(beforeHeight) < tooltipClientY == false) {
                this.index = index;
            }
        },
        /**
         * Load more unawarded referrals.
         */
        loadMoreUnawarded() {
            this.emitter.emit('loadMoreReferral', 'unawarded');
            this.appComponent.loadMoreUnawarded = true;
        },
        /**
         * Load more awarded referrals.
         */
        loadMoreAwarded() {
            this.emitter.emit('loadMoreReferral', 'awarded');
            this.appComponent.loadMoreAwarded = true;
        },
        /**
         * Change the filter for displayed awards based on the selected value.
         * @param {number} value - The selected filter value.
         */
        changeFilter(value) {
            this.loadMoreAwarded();
            this.pp = JSON.parse(JSON.stringify(this.data1));
            if (value != 10) {
                this.pp = this.pp.filter((item) => {
                    const award = item.premios.filter((element) => element.estado == value);
                    if (award.length > 0) {
                        item.premios = award;
                        return item;
                    }
                });
            }
        },
    },
});
</script>
<template>
    <!-- Main section for displaying awards if info1 is defined and has items -->
    <section
        v-if="info1 != undefined && info1.length > 0"
        :class="isActive1 ? 'block' : 'hidden'"
        class="w-[100%] h-[70%] flex flex-col"
    >
        <div class="flex justify-center items-center pb-5">
            <!-- Dropdown for filtering awards -->
            <select
                @change="changeFilter(selecType)"
                v-model="selecType"
                name="typeAware"
                class="bg-base-300 text-neutral rounded-full text-center font-poppinssl"
            >
                <option
                    disabled
                    value=""
                >
                    {{ $t('Estado de recompensa') }}
                </option>
                <option value="10">{{ $t('Todos') }}</option>
                <option value="3">{{ $t('Pendientes') }}</option>
                <option value="0">{{ $t('Disponibles') }}</option>
                <option value="1">{{ $t('Redimidos') }}</option>
                <option value="6">{{ $t('Vencidos') }}</option>
            </select>
        </div>
        <!-- Scrollable container for displaying awards -->
        <div class="scroll flex flex-col p-5 gap-5 sm:gap-6 h-[30rem] sm:h-96 bg-neutral-content rounded-3xl">
            <article
                v-for="item in pp"
                class="bg-gradient-to-l from-base-100 rounded-2xl p-2 z-0"
            >
                <div
                    class="bg-base-300 flex items-center gap-5 p-2 rounded-xl"
                >
                    <div class="">
                        <img
                            class="w-12"
                            :src="item.iconUser"
                            alt=""
                        />
                    </div>
                    <div>
                        <h2 class="text-md md:text-sm font-poppinssl">
                            {{ $t('ID: ') }}
                            <span class="font-poppinssl">{{ item.idUser }}</span>
                        </h2>
                    </div>
                    <div class="w-0.5 h-5 bg-neutral" />
                    <div class="w-[45%] sm:w-auto">
                        <h2 class="text-md md:text-sm font-poppinsm">
                            {{ item.userName }}
                        </h2>
                    </div>
                </div>
                <div
                    class="w-[95%] sm:w-full grid grid-cols-1 sm:grid-cols-3 justify-center sm:justify-start items-center sm:items-start gap-6 sm:gap-16 rounded-b-2xl p-2"
                >
                    <div
                        v-for="(premio, i) in item.premios"
                        class="flex flex-wrap gap-2 xl:gap-4 p-3 justify-center relative"
                    >
                        <button
                            @click="
                                () => {
                                    if (premio.estado == 0) {
                                        showModal(premio.bonosInfo.bonosOferta, item.idUser, premio.id, item.tokenId);
                                    }
                                }
                            "
                            :class="premio.estado == 0 ? 'hover:scale-105 transition-all ease-in-out boxAnimation' : ''"
                            class="h-24 w-60 rounded-lg flex flex-col justify-center items-center"
                        >
                            <div
                                class="h-[80%] border-1 rounded-2xl w-full flex justify-center items-center font-poppinsm p-2"
                                :class="[
                                    {
                                        'border-primary bg-accent-content saturate-200 shadow-[inset_0px_0px_20px] shadow-neutral-content/50':
                                            premio.estado == 0,
                                    },
                                    { 'border-success': premio.estado == 1 },
                                    { 'border-accent-content bg-base-300': premio.estado == 3 },
                                    { 'border-red-700': premio.estado == 6 },
                                ]"
                            >
                                {{
                                    premio.deposito !== undefined
                                        ? $t('Recompensa por minimo de deposito')
                                        : premio.apuesta !== undefined
                                          ? $t('Recompensa por minimo de apuesta')
                                          : ''
                                }}
                            </div>
                            <div
                                class="w-[91%] h-[20%] rounded-b-xl flex justify-center items-center shadow-[inset_1px_2px_5px_0px_#000000a6]"
                                :class="[
                                    { 'bg-primary saturate-200': premio.estado == 0 },
                                    { 'bg-success': premio.estado == 1 },
                                    { 'bg-base-100': premio.estado == 3 },
                                    { 'bg-red-700': premio.estado == 6 },
                                ]"
                            >
                                <span
                                    class="font-poppinsm"
                                    :class="premio.estado == 0 ? 'text-sm' : ''"
                                >
                                    {{
                                        premio.estado == 0
                                            ? $t('Disponible hasta: ')
                                            : premio.estado == 1
                                              ? $t('Redimido el: ')
                                              : premio.estado == 3
                                                ? $t('Pendiente')
                                                : premio.estado == 6
                                                  ? $t('Vencido el: ')
                                                  : ''
                                    }}
                                    <span class="font-poppinssl">
                                        {{
                                            premio.estado == 0
                                                ? premio.fechaExpiraPremio
                                                    ? new Date(premio.fechaExpiraPremio).toLocaleDateString('es-ES')
                                                    : ''
                                                : premio.estado == 1
                                                  ? premio.fechaRedimido
                                                      ? new Date(premio.fechaRedimido).toLocaleDateString('es-ES')
                                                      : ''
                                                  : premio.estado == 6
                                                    ? premio.fechaExpiraPremio
                                                        ? new Date(premio.fechaExpiraPremio).toLocaleDateString('es-ES')
                                                        : ''
                                                    : ''
                                        }}
                                    </span>
                                </span>
                            </div>
                        </button>
                        <div
                            v-if="premio.estado == 3"
                            @mouseover="onMoseOver($event, i)"
                            @mouseleave="index = null"
                            :class="index == i ? 'tooltip-bottom sm:tooltip-right' : ''"
                            class="tooltip tooltip-bottom sm:tooltip-right before:fixed absolute top-3 -right-4 sm:-right-0"
                            :data-tip="
                                premio.deposito == 2 && premio.verificado != 2
                                    ? $t('El referido debe completar las siguientes condicione: 1- Depósito de ') +
                                      premio.deposito_ValorObjetivo
                                    : '' || (premio.apuesta == 2 && premio.verificado == 2)
                                      ? $t(
                                            'El referido debe completar las siguientes condicione: 1- Cuenta verificada 2-Apuestas de ',
                                        ) + premio.apuesta_ValorObjetivo
                                      : '' || (premio.deposito == 2 && premio.verificado == 2)
                                        ? $t(
                                              'El referido debe completar las siguientes condicione: 1- Cuenta verificada 2- Depósito de ',
                                          ) + premio.deposito_ValorObjetivo
                                        : '' || (premio.apuesta == 2 && premio.verificado != 2)
                                          ? $t(
                                                'El referido debe completar las siguientes condicione: 1- Apuestas de ',
                                            ) + premio.apuesta_ValorObjetivo
                                          : '' || (premio.verificado == 2 && premio.verificado != 2)
                                            ? $t(
                                                  'El referido debe completar las siguientes condicione: 1- Cuenta verificada',
                                              )
                                            : ''
                            "
                        >
                            <InfoIconRe
                                width="22"
                                height="23px"
                            />
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
    <!-- Section for displaying info2 if it is defined and has items -->
    <section
        v-if="info2 != undefined && info2.length > 0"
        :class="isActive1 ? 'block' : 'hidden'"
        class="w-[100%] h-[70%] bg-neutral-content rounded-3xl p-1 gap-4"
    >
        <div class="scroll relative grid grid-col-1 sm:grid-cols-2 gap-3 h-[95%]">
            <article
                class="pl-2 pt-4 flex flex-col"
                v-for="(item, i) in info2"
            >
                <div class="bg-gradient-to-r from-accent-content/50 rounded-l-full w-[95%] h-[100%] p-1">
                    <div class="flex items-center justify-start gap-5">
                        <div class="pl-1 relative">
                            <img
                                class="w-12"
                                :src="item.iconUser"
                                alt=""
                            />
                        </div>
                        <div>
                            <h2 class="flex flex-row sm:flex-col text-sm sm:text-md">
                                {{ $t('ID: ') }}
                                <span>{{ item.idUser }}</span>
                            </h2>
                        </div>
                        <div class="w-0.5 h-5 bg-accent-content" />
                        <div class="w-[45%] sm:w-auto">
                            <h2 class="text-sm sm:text-md">
                                {{ item.userName }}
                            </h2>
                        </div>
                        <div class="hidden sm:block w-0.5 h-5 bg-accent-content" />
                        <div class="hidden sm:block">
                            <p class="text-sm">
                                {{
                                    $t(
                                        item.premios[0].estado != 5
                                            ? 'Fecha de expiración '
                                            : 'El usuario no cumplió las condiciones establecidas.',
                                    )
                                }}
                            </p>
                            <p>
                                {{ item.premios[0].fechaExpiraCondicion }}
                            </p>
                        </div>
                    </div>
                    <div class="block sm:hidden flex justify-center items-center">
                        <p class="text-sm">
                            {{
                                $t(
                                    item.premios[0].estado != 5
                                        ? 'Fecha de expiración: '
                                        : 'El usuario no cumplió las condiciones establecidas.',
                                )
                            }}
                        </p>
                        <p class="text-sm sm:text-md">
                            {{ item.premios[0].fechaExpiraCondicion }}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>
    <!-- Section for displaying a message when no results are found -->
    <section
        v-else-if="(info1 != undefined && info1.length == 0) || (info2 != undefined && info2.length == 0)"
        :class="isActive1 ? 'block' : 'hidden'"
        class="w-[100%] h-[70%] bg-neutral-content rounded-3xl p-1 flex items-center justify-center"
    >
        <p class="text-center text-gray-500">{{ $t('No se encontraron resultados') }}</p>
    </section>
</template>
<style>
/* Tooltip styling for displaying additional information */
.tooltip:before {
    position: fixed !important;
    top: calc(-40px + v-bind(positionY + 'px'));
    left: v-bind(positionX + 'px');
}
.tooltip::after {
    position: absolute;
    top: -16px;
    left: 0;
    height: 0;
    width: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid white;
}
/* Scrollable container styling */
.scroll {
    max-height: 90%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0.3em;
        height: 0.3em;
    }
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436);
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(217, 217, 217) !important;
        border-radius: 20px;
    }
}
/* Animation for box elements */
.boxAnimation {
    position: relative;
    width: 100%;
    height: 100%;
}
.boxAnimation::before {
    animation: intro 3s ease infinite;
    animation-delay: 0s;
    content: '';
    position: absolute;
    width: 105%;
    height: 110%;
    background: #ffffff3b;
    border-radius: 20px;
    z-index: -2;
}
.boxAnimation::after {
    animation: intro 3s ease infinite;
    animation-delay: 1s;
    content: '';
    position: absolute;
    width: 110%;
    height: 120%;
    background: #dedede57;
    border-radius: 20px;
    z-index: -1;
}
/* Keyframes for intro animation */
@keyframes intro {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>

<!-- FILE DOCUMENTED -->
