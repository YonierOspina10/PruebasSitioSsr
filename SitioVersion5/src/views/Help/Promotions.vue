<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import PromotionsCards from '@/components/PromotionsCards.vue'; // Importing PromotionsCards component
import PromotionsV2 from '@/views/Help/PromotionsV2.vue'; // Importing PromotionsV2 view
import IconChevrondownVue from '@/components/icons/IconChevrondown.vue'; // Importing IconChevrondown component
import { useSectionId } from '@/composables/useSectionId'; // Importing custom composable for section ID
import { useEmitter } from '@/composables/useEmitter'; // Importing custom composable for event emitter
import { useFilterPromotions } from '@/composables/useFilterPromotions'; // Importing custom composable for filtering promotions
import { normalizeSlug, updateHistory } from '@/utils/configHome'; // Importing utility functions for slug normalization and history update

export default defineComponent({
    components: { PromotionsV2, PromotionsCards, IconChevrondownVue }, // Registering components for use in this component
    setup() {
        const { sectionId } = useSectionId(); // Using the section ID from the composable
        return {
            sectionId, // Exposing sectionId to the template
        };
    },
    data() {
        const config = this.$config(); // Retrieving configuration object
        const appComponent: any = this.$appComponent; // Accessing app component reference
        const emitter = this.$emitter(); // Accessing event emitter
        let bonuses: any = []; // Initializing bonuses array
        let cards: any = []; // Initializing cards array
        return {
            config, // Exposing config to the template
            appComponent, // Exposing appComponent to the template
            emitter, // Exposing emitter to the template
            bonuses, // Exposing bonuses to the template
            cards, // Exposing cards to the template
        };
    },
    mounted() {
        useEmitter(this.emitter); // Setting up the event emitter
        // Checking for promotions in the configuration based on user login status and language
        if (this.config?.not_login?.[this.appComponent.lngProd]?.promotions) {
            this.bonuses = this.config.not_login[this.appComponent.lngProd].promotions; // Assigning bonuses for not logged in users
        } else if (this.config?.promotions?.[this.appComponent.country]?.[this.appComponent.lngProd]) {
            this.bonuses = this.config.promotions[this.appComponent.country][this.appComponent.lngProd]; // Assigning bonuses for logged in users
        }
        this.bonuses = useFilterPromotions(this.bonuses); // Filtering bonuses
        // Checking if sectionId matches any promotion slug
        if (this.sectionId) {
            const selectedPromotion = this.bonuses.find((item: any) => normalizeSlug(item.slug) === this.sectionId);
            if (selectedPromotion) {
                this.promotionClick(selectedPromotion); // Triggering promotion click if found
            }
        }
        // Setting cards based on mobile layout
        this.cards = this.config.mobileL ? this.bonuses.slice(0, 4) : this.bonuses.slice(0, 3);
    },
    methods: {
        promotionClick(item: any) {
            this.appComponent.modal.showModal = 'promotion'; // Showing promotion modal
            this.appComponent.promotionModal = item; // Setting the selected promotion in the modal
            updateHistory(`/promociones-bonos/${normalizeSlug(item.slug)}`); // Updating browser history
        },
        loadMore() {
            const increment = this.config.mobileL ? 4 : 3; // Determining increment based on mobile layout
            this.cards = this.bonuses.slice(0, this.cards.length + increment); // Loading more cards
        },
    },
    unmounted() {
        this.emitter.all.delete('accept:modal'); // Cleaning up event listener on unmount
    },
});
</script>
<template>
    <div class="relative overflow-hidden"> <!-- Main container for the component -->
        <img
            v-if="config.layout != undefined && config.layout == 4"
            src="https://images.virtualsoft.tech/m/msj15212T1708660090.png"
            class="w-full h-full absolute top-0 left-0 object-cover"
            alt=""
        />
        <PromotionsV2
            v-if="
                config.promotions != undefined &&
                config.promotions[appComponent.country] != undefined &&
                config.promotions[appComponent.country].version == 2
            "
        />
        <div
            v-if="
                config.layout != 3 &&
                ((config.promotions != undefined &&
                    config.promotions[appComponent.country] != undefined &&
                    config.promotions[appComponent.country].version == undefined) ||
                    (config.promotions != undefined &&
                        config.promotions[appComponent.country] != undefined &&
                        config.promotions[appComponent.country].version !== 2))
            "
            :class="
                config.promotions != undefined &&
                config.promotions[appComponent.country] != undefined &&
                config.promotions[appComponent.country].version != undefined &&
                config.promotions[appComponent.country].version == 3
                    ? ''
                    : 'int-header h-auto bg-base-200 absolute w-full'
            "
        ></div>
        <div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
        <div
            v-if="
                config.layout != undefined &&
                config.layout == 3 &&
                ((config.promotions != undefined &&
                    config.promotions[appComponent.country] != undefined &&
                    config.promotions[appComponent.country].version == undefined) ||
                    (config.promotions != undefined &&
                        config.promotions[appComponent.country].version != undefined &&
                        config.promotions[appComponent.country].version !== 2))
            "
            :class="
                config.promotions != undefined &&
                config.promotions[appComponent.country] != undefined &&
                config.promotions[appComponent.country].version != undefined &&
                config.promotions[appComponent.country].version == 3
                    ? ''
                    : 'int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full'
            "
        ></div>
        <span
            v-if="
                (config.promotions != undefined &&
                    config.promotions[appComponent.country] != undefined &&
                    config.promotions[appComponent.country].version == undefined) ||
                (config.promotions != undefined &&
                    config.promotions[appComponent.country].version != undefined &&
                    config.promotions[appComponent.country].version !== 2)
            "
            :class="
                config.layout != undefined && config.layout == 3
                    ? 'text-primary font-bold text-3xl relative z-1 w-full max-w-[1100px] mx-auto hidden lg:flex py-4 border-b-2 border-solid border-primary-content'
                    : config.promotions != undefined &&
                        config.promotions[appComponent.country] != undefined &&
                        config.promotions[appComponent.country].version != undefined &&
                        config.promotions[appComponent.country].version == 3
                      ? 'text-neutral font-poppinsb md:pl-10 text-lg md:text-3xl uppercase relative z-1 w-11/12 mx-auto md:w-full border-solid border-b-1 flex border-accent-content pt-5 md:pt-10 pb-2 md:pb-5 items-center'
                      : 'text-neutral font-bold text-3xl relative z-1 w-11/12 max-w-[1100px] mx-auto block my-4 px-2 pt-4 pb-5 border-b-2 border-solid border-neutral'
            "
            >{{ $t('Bonos') }} <!-- Title for promotions section -->
            <img
                v-if="config.layout != undefined && config.layout == 4"
                src="https://images.virtualsoft.tech/m/msj15212T1708445080.png"
                alt="Bono"
                class="w-9 h-9 md:w-16 md:h-16"
            />
        </span>
        <div
            v-if="
                (config.promotions != undefined &&
                    config.promotions[appComponent.country] != undefined &&
                    config.promotions[appComponent.country].version == undefined) ||
                (config.promotions != undefined &&
                    config.promotions[appComponent.country].version != undefined &&
                    config.promotions[appComponent.country].version !== 2)
            "
            class="Framework InfoPage mx-auto rounded-xl bg-base-400"
            :class="
                config.layout != undefined && config.layout == 3
                    ? 'w-full max-w-[1100px]'
                    : config.promotions != undefined &&
                        config.promotions[appComponent.country] != undefined &&
                        config.promotions[appComponent.country].version != undefined &&
                        config.promotions[appComponent.country].version == 3
                      ? 'px-2 md:px-10 py-0'
                      : 'w-11/12 max-w-[1100px] shadow-md mb-4'
            "
        >
            <div id="promocion-wrapper"> <!-- Wrapper for promotions -->
                <div id="pnPromotionList"> <!-- List of promotions -->
                    <div class="w-full flex justify-center items-center mx-auto"> <!-- Centering container -->
                        <div
                            :class="
                                config.promotions != undefined &&
                                config.promotions[appComponent.country] != undefined &&
                                config.promotions[appComponent.country].version != undefined &&
                                config.promotions[appComponent.country].version == 3
                                    ? 'grid-cols-2 gap-4 lg:grid-cols-3 gap-y-10'
                                    : 'grid-cols-1 gap-4 md:grid-cols-3'
                            "
                            class="grid"
                        >
                            <PromotionsCards
                                :data="
                                    config.promotions != undefined &&
                                    config.promotions[appComponent.country] != undefined &&
                                    config.promotions[appComponent.country].version != undefined &&
                                    config.promotions[appComponent.country].version == 3
                                        ? cards
                                        : bonuses
                                "
                                :h2-clase="
                                    config.layout != undefined && config.layout == 3
                                        ? 'promotion-title text-neutral bg-base-300 text-sm max-w-[80%] h-auto break-words px-2 py-2 flex justify-center items-center text-center rounded hover:scale-105 cursor-pointer whitespace-pre-wrap'
                                        : 'promotion-title btn btn-primary text-xs flex justify-center items-center rounded btn-sm whitespace-pre-wrap h-auto'
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!-- Container for load more button -->
            <div
                v-if="
                    config.promotions != undefined &&
                    config.promotions[appComponent.country] != undefined &&
                    config.promotions[appComponent.country].version != undefined &&
                    config.promotions[appComponent.country].version == 3 &&
                    cards.length != bonuses.length
                "
                class="flex justify-center my-7"
            >
                <button
                    @click="loadMore"
                    class="relative group hover:brightness-90 bg-primary-content text-neutral uppercase font-poppinssl pl-3 flex flex-row justify-center items-center gap-x-2 h-[30px] box-content rounded-full border-solid border-2 border-primary text-sm md:text-base"
                >
                    {{ $t('Descubre más bonos') }} <!-- Button text -->
                    <span
                        class="fill-neutral bg-primary rounded-full h-full w-[30px] flex justify-center items-center"
                    >
                        <IconChevrondownVue
                            width="15"
                            height="15"
                            class="fill-neutral group-hover:translate-y-1 transition-all ease-in-out"
                        />
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->
