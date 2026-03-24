<template>
    <section
        class="w-full h-full mx-auto"
        :class="maxWidthClass"
        aria-label="Access menu carousel"
    >
        <!-- Access Menu -->
        <AccessMenu
            :options="menuOptions"
            :variant="data.variant"
            @select-option="(option: any) => selectOptionMenu(option)"
        />
    </section>
</template>

<script lang="ts" setup>
/*
 * @fileoverview AccessMenu
 *
 * Using AccessMenu from
 * @tecnologia-general/virtualsoft-widgets library.
 * Fetches and displays menu access.
 *
 * @component AccessMenu
 * @requires @tecnologia-general/virtualsoft-widgets
 */
// ============== IMPORTS ==============
import { NavAccess as AccessMenu } from '@tecnologia-general/virtualsoft-widgets';
import { getCurrentInstance, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// ============== SETUP & COMPOSABLES ==============

const route = useRoute();
const router = useRouter();
const instance = getCurrentInstance();
const config = (window as any).cconfig;
const appComponent = instance?.appContext.config.globalProperties.$appComponent;

// ============== PROPS ==============

const { data } = defineProps(['data']);

// ============== STATE (Refs) ==============

const infoIcons = ref([]);
const menuOptions = ref([]);

// ============== COMPUTED ==============

// Max width class based on layout configuration
const maxWidthClass = computed(() => (config?.layout_ === 8 ? 'max-w-[1112px]' : 'max-w-[1300px]'));

// ============== METHODS ==============

async function getMenuOptions() {
    let isLogin = appComponent.session.logueado ? 'login' : 'not_login';
    if (config?.[isLogin]?.[appComponent.lngProd]?.['NEW_HOME_ICONS']) {
        infoIcons.value = config[isLogin][appComponent.lngProd]['NEW_HOME_ICONS'];
    } else {
        const isLogged = !!appComponent?.session?.logueado;
        const isMobile = String(appComponent?.mobile) === '1';

        const key = isLogged
            ? isMobile
                ? 'INFO_ICONS_LOGUEADO_MOBILE'
                : 'INFO_ICONS_LOGUEADO_DESKTOP'
            : isMobile
            ? 'INFO_ICONS_NOLOGUEADO_MOBILE'
            : 'INFO_ICONS_NOLOGUEADO_DESKTOP';

        infoIcons.value = config?.[key]?.[appComponent.country] ?? [];
    }
    menuOptions.value = formatOptionsMenu(infoIcons.value);
}

function formatOptionsMenu(data: any) {
    const formattedData = [];
    data.forEach((option) => {
        const item = {
            id: option.MENU_ID,
            title: option.MENU_TITLE,
            icon: option.MENU_ICON2 || option.MENU_ICON,
            background: option.MENU_ICON,
        };
        formattedData.push(item);
    });
    return formattedData;
}

function selectOptionMenu(option: any) {
    const optionToRedirect = infoIcons.value.find((item) => item.MENU_ID === option.id);
    const to = optionToRedirect?.MENU_URL;
    appComponent?.gAnalytics?.('sub_menu', optionToRedirect);

    if (!to) return;

    if (/^https?:\/\//i.test(String(to))) {
        window.location.href = String(to);
        return;
    }
    router.push(String(to)).catch(() => {});
}

// ============== LIFE CYCLE ==============

onMounted(() => {
    getMenuOptions();
});
</script>

<style scoped></style>
