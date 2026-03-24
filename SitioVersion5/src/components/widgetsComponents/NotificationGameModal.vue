<template>
    <ModalNotification
        v-if="showAgain"
        v-model="appComponent.showNotificationGameModal"
        :variant="dataModal.variant"
        :position="appComponent.notificationGame.position ?? dataModal.position"
        :duration="dataModal.duration"
        :overlay="dataModal.overlay"
        :data-analytics-id="appComponent.notificationGameId"
    >
        <div v-if="appComponent.notificationGame" id="notification-game-modal" class="w-full h-full flex flex-col justify-center items-sar gap-4">
            <div class="w-full h-full flex justify-start items-center gap-2">
                <img
                    v-if="resolvedIcon && resolvedIcon.startsWith('http')"
                    :src="resolvedIcon"
                    :alt="appComponent.notificationGame.titleNotification ?? dataModal.title"
                    class="w-6 h-6 aspect-square"
                />
                <div
                    v-else-if="resolvedIcon && resolvedIcon.startsWith('<svg')"
                    v-html="resolvedIcon"
                    class="w-6 h-6 fill-accent"
                />
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="19" height="27" viewBox="0 0 19 27"
                     class="fill-accent">
                    <path
                        d="M5.48954 17.171H1.35621C0.822876 17.171 0.428431 16.9321 0.172876 16.4543C-0.0826797 15.9766 -0.054902 15.5155 0.256209 15.071L10.2229 0.737681C10.4451 0.42657 10.734 0.209903 11.0895 0.0876812C11.4451 -0.0345411 11.8118 -0.0289855 12.1895 0.104348C12.5673 0.237681 12.8451 0.471014 13.0229 0.804348C13.2007 1.13768 13.2673 1.49324 13.2229 1.87101L12.1562 10.5043H17.3229C17.9007 10.5043 18.3062 10.7599 18.5395 11.271C18.7729 11.7821 18.7007 12.2599 18.3229 12.7043L7.35621 25.8377C7.11177 26.1266 6.81177 26.3155 6.45621 26.4043C6.10065 26.4932 5.75621 26.4599 5.42288 26.3043C5.08954 26.1488 4.82843 25.9099 4.63954 25.5877C4.45065 25.2655 4.37843 24.9155 4.42288 24.5377L5.48954 17.171Z" />
                </svg>
                <h3 class="uppercase text-accent">
                    {{ t(appComponent.notificationGame.titleNotification ?? dataModal.title) }}</h3>
            </div>
            <div class="w-full h-full flex justify-center items-center gap-4">
                <img v-if="appComponent.notificationGame.icon_3 || appComponent.notificationGame.icon_2"
                     :src="appComponent.notificationGame.icon_3 || appComponent.notificationGame.icon_2"
                     alt="Imagen del juego" class="w-[109px] h-[109px] rounded-lg">

                <div class="flex flex-col justify-start items-start gap-2">
                    <h4 class="text-xl uppercase font-bold">{{ appComponent.notificationGame.name }}</h4>
                    <p class="text-sm text-neutral">{{ appComponent.notificationGame.message }}</p>

                    <img v-if="appComponent.notificationGame.TagImage" :src="appComponent.notificationGame.TagImage"
                         alt="Imagen del juego" class="max-w-[50px] max-h-[25px]">
                    <div v-else
                         class="inline-flex px-2 py-1 justify-center items-center bg-red-600 rounded-full text-xs">
                        {{ t('🔥Tendencia') }}
                    </div>
                </div>
            </div>
            <motion.button
                :whileHover="{ scale: 1.05 }"
                :whilePress="{ scale: 0.98 }"
                class="w-full py-3 uppercase rounded-xl fill-neutral font-display font-bold text-sm text-neutral flex items-center justify-center gap-2 animate-shimmer"
                :style="{
                    boxShadow: '0 0 20px hsl(var(--p) / 0.4), 0 0 60px hsl(var(--p) / 0.15)',
                }"
                @click="handleOpenGameModal()"
                data-analytics-label="popup:notification:action"
                :data-analytics-id="appComponent.notificationGameId"
            >
                <span>
                    {{ t(appComponent.notificationGame.buttonText ?? dataModal.buttonText) }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                    <path
                        d="M0 11.35V1C0 0.716667 0.1 0.479167 0.3 0.2875C0.5 0.0958333 0.733333 0 1 0C1.08333 0 1.17083 0.0125 1.2625 0.0375C1.35417 0.0625 1.44167 0.1 1.525 0.15L9.675 5.325C9.825 5.425 9.9375 5.55 10.0125 5.7C10.0875 5.85 10.125 6.00833 10.125 6.175C10.125 6.34167 10.0875 6.5 10.0125 6.65C9.9375 6.8 9.825 6.925 9.675 7.025L1.525 12.2C1.44167 12.25 1.35417 12.2875 1.2625 12.3125C1.17083 12.3375 1.08333 12.35 1 12.35C0.733333 12.35 0.5 12.2542 0.3 12.0625C0.1 11.8708 0 11.6333 0 11.35Z" />
                </svg>
            </motion.button>
            <div v-if="dataModal.showAgain" class="w-full h-full flex justify-start items-center gap-2">
                <input
                    type="checkbox"
                    @change="neverShowAgain"
                    class="checkbox-sm checkbox-primary rounded-md"
                >
                <span>{{ t('No volver a mostrar') }}</span>
            </div>
        </div>
    </ModalNotification>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { motion } from 'motion-v';
import { ModalNotification } from '@tecnologia-general/virtualsoft-widgets';
import { useAppcomponentStore } from '@/stores/AppComponent';
import { useRoute, useRouter } from 'vue-router';
import { analyticsSdk } from '@tecnologia-general/virtualsoft-analytics-sdk';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const appComponent = useAppcomponentStore().appComponent;
const baseConfig = {
    variant: 1,
    position: 'bottom-right',
    overlay: true,
    duration: undefined,
    title: '¡este juego te podría gustar!',
    buttonText: 'jugar ahora',
    showAgain: false,
};

const dataModal = {
    ...baseConfig,
    ...(appComponent.config.notificationGameModal ?? {}),
};

const resolvedIcon = computed<string>(() => {
    const gameIcon = (appComponent.notificationGame as any)?.iconNotification;
    const modalIcon = (dataModal as any)?.icon;
    return String(gameIcon || modalIcon || '').trim();
});

const HIDE_KEY = 'hideNotificationGameModalUntil';
const DEFAULT_HIDE_MINUTES = 6 * 60; // 6 hours by default, now expressed in minutes

const hideMinutes = computed<number>(() => {
    const fromConfig = (appComponent.config.notificationGameModal as any)?.neverShowAgainUntilMinutes;
    const value = Number(fromConfig);
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_HIDE_MINUTES;
});

const showAgain = computed(() => {
    const raw = localStorage.getItem(HIDE_KEY);
    const hideUntil = raw ? Number(raw) : 0;

    if (!hideUntil && localStorage.getItem('hideNotificationGameModal') === 'true') {
        return false;
    }

    return !hideUntil || Date.now() >= hideUntil;
});

function neverShowAgain() {
    const msToHide = hideMinutes.value * 60 * 1000;
    const hideUntil = Date.now() + msToHide;

    localStorage.setItem(HIDE_KEY, String(hideUntil));
    localStorage.removeItem('hideNotificationGameModal');
}

function handleOpenGameModal() {
    const game = appComponent.notificationGame || undefined;
    if (!game) return;

    appComponent.showNotificationGameModal = false;

    if (game.redirectButton && game.redirectButton !== '') {
        if (game.redirectButton.startsWith('http')) {
            window.open(game.redirectButton, game.targetRedirectButton ?? '_blank');
        } else {
            router.push(game.redirectButton);
        }
    } else {
        appComponent.openGame(game);
    }

    try {
        analyticsSdk.track({
            element_section: 'notification_game_modal',
            element_action: 'click_modal_button',
            element_name: game.name,
            element_id: game.id,
            page_path: route.path,
            event_name: 'click_play_now_notification',
        });
    } catch (e) {
        console.log('Analytics tracking failed:', e);
    }
}

const isOpen = computed(() => !!appComponent.showNotificationGameModal);

// Tracks whether *this* modal applied the scroll lock
const didLockScroll = ref(false);

watch(
    isOpen,
    (open) => {
        const body = document.body;

        if (open) {
            // If another modal already locked scroll, don't touch it
            if (getComputedStyle(body).overflow === 'hidden') {
                didLockScroll.value = false;
                return;
            }

            body.style.overflow = 'hidden';
            didLockScroll.value = true;
            return;
        } else {
            const game = appComponent.notificationGame;
            try {
                analyticsSdk.track({
                    element_section: 'notification_game_modal',
                    element_action: 'close_modal',
                    element_name: game.name,
                    element_id: game.id,
                    page_path: route.path,
                    event_name: 'close_notification_game_modal',
                });
            } catch (e) {
                console.log('Analytics tracking failed:', e);
            }
        }

        // Only undo if we were the one that locked it
        if (didLockScroll.value) {
            body.style.overflow = '';
            didLockScroll.value = false;
        }
    },
    { immediate: true },
);

onUnmounted(() => {
    if (didLockScroll.value) {
        document.body.style.overflow = '';
        didLockScroll.value = false;
    }
});
</script>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: 0 50%;
    }
    100% {
        background-position: 200% 50%;
    }
}

.animate-shimmer {
    animation: shimmer 3s linear infinite;
    background-size: 200% 100%;
    background-image: linear-gradient(90deg, hsl(var(--p)) 0%, hsl(var(--b1)) 50%, hsl(var(--p)) 100%);
    transform: none;
}
</style>
