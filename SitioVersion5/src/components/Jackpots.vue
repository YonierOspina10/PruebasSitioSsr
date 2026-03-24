<template>
    <!-- Main section for displaying jackpots, shown only if jackpotsList is defined and has items -->
    <section
        v-if="jackpotsList !== undefined && jackpotsList.length > 0"
        class="w-full flex justify-center items-center"
    >
        <!-- Container for jackpot cards, styled for layout and responsiveness -->
        <article
            class="containerJackpot w-11/12 h-full max-w-[1300px] flex flex-wrap justify-around items-center gap-2 px-2 z-[9]"
        >
            <!-- Loop through jackpotsList to render a JackpotCard for each jackpot -->
            <JackpotCard
                v-for="jackpot in jackpotsList"
                :key="jackpot.id"
                :data="jackpot"
                :params="data"
            />
        </article>
    </section>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import JackpotCard from './JackpotCard.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';

/**
 * Component for displaying a list of jackpots.
 */
export default defineComponent({
    components: {
        ExitIcon,
        JackpotCard,
    },
    props: {
        // Prop to receive the jackpot configuration
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        // Configuration and state variables for the component
        let config = this.$config(); 
        let appComponent: any = this.$appComponent; 
        let jackpotsList: any = []; 
        let winner: boolean = false; 
        return {
            config,
            appComponent,
            jackpotsList,
            winner,
        };
    },
    created() {
        // Watch for changes in appComponent's jackpotsList and update local jackpotsList
        if (
            this.config.jackpot != undefined &&
            this.config.jackpot[(window as any).cconfig.countryL] != undefined &&
            this.config.jackpot[(window as any).cconfig.countryL]
        ) {
            watch(
                () => this.appComponent.jackpotsList,
                (newVal) => {
                    this.jackpotsList = newVal;
                    // Format currentValue for jackpots with counterStyle 1
                    this.jackpotsList.forEach((jackpot: any) => {
                        if (jackpot.counterStyle === 1) {
                            jackpot.currentValue = parseFloat(jackpot.currentValue).toFixed(2);
                        }
                    });
                },
            );
        }
    },
    mounted() {
        console.log(this.data);

        // Check loyalty price after 2 seconds and set winner state
        setTimeout(() => {
            if (this.appComponent.loyalty_price !== undefined && this.appComponent.loyalty_price.id !== null) {
                this.winner = true;
            }
        }, 2000);
    },
});
</script>

<style scoped>
/* Styles for the jackpot container with a gradient background and blur effect */
.containerJackpot {
    background: linear-gradient(to bottom, #ffffff20, transparent);
    backdrop-filter: blur(5px);
    border: 1px solid #ffffff40;
    border-radius: 15px;
}

/* Styles for jackpot price text with gradient and shadow effects */
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 3px;
}

/* Styles for jackpot info text with gradient and shadow effects */
.jackpotInfo {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

/* Animation for intro effect */
.intro {
    animation: intro 6s ease 0s forwards;
}

/* Keyframes for intro animation */
@keyframes intro {
    0% {
        opacity: 0;
        scale: 2;
    }
    50% {
        opacity: 0;
        scale: 2;
    }
    75% {
        opacity: 1;
        scale: 1;
    }
    100% {
        opacity: 1;
        scale: 1;
    }
}

/* Animation for zoom effect */
.zoom {
    animation: zoom 10s ease 0s infinite;
}

/* Keyframes for zoom animation */
@keyframes zoom {
    0% {
        scale: 1.3;
    }
    50% {
        scale: 1.4;
    }
    100% {
        scale: 1.3;
    }
}
</style>

<!-- FILE DOCUMENTED -->
