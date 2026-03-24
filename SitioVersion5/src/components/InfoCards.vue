<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying a financial summary card.
 */
export default defineComponent({
    props: {
        /** URL of the logo image */
        logoDiamon: String,
        /** Title of the card, can be undefined */
        title: String || undefined,
        /** Subtitle of the card */
        subTitle: String,
        /** URL of the monetary icon */
        iconMon: String,
        /** Amount to be displayed */
        amount: String,
        /** URL of the background icon */
        iconBack: String,
        /** Final number to be displayed */
        finalNumber: String,
    },
    data: function () {
        /** Initialize component data properties */
        let LogoDiamon = this.logoDiamon;
        let Title: any = this.title;
        let SubTitle: any = this.subTitle;
        let IconMon = this.iconMon;
        let InfoNumber: any = '';
        let IconBack = this.iconBack;
        let FinalNumberV: any = '';
        return {
            LogoDiamon,
            Title,
            SubTitle,
            IconMon,
            InfoNumber,
            IconBack,
            FinalNumberV,
        };
    },
    updated() {
        /** Update InfoNumber and FinalNumberV when component updates */
        this.InfoNumber = this.amount;
        this.FinalNumberV = this.finalNumber;
    },
});
</script>

<template>
    <!-- Main container for the financial summary card -->
    <article
        class="in w-[25rem] sm:w-[30rem]  h-16 flex justify-between items-center bg-base-200 rounded-[31px] px-6 py-2 border-3 border-solid border-accent-content shadow-md shadow-black"
    >
        <!-- Container for logo and title/subtitle -->
        <div class="flex justify-center items-center gap-4">
            <img
                :src="LogoDiamon"
                alt=""
                class="w-8"
            />
            <div class="text-xs lg:text-base h-full lg:w-40 w-20 break-normal">
                <p class="w-full font-bold">{{ $t(Title) }}</p>
                <span class="">{{ $t(SubTitle) }}</span>
            </div>
        </div>
        <!-- Container for monetary icon and amount -->
        <div class="flex justify-center items-center gap-2">
            <img
                :src="IconMon"
                alt=""
                class="mb-1"
            /><span class="text-neutral text-xs lg:text-base">{{ InfoNumber }}</span>
        </div>
        <!-- Container for background icon and final number -->
        <div class="flex justify-center items-center gap-2">
            <img
                :src="IconBack"
                alt=""
                class="mb-1 w-8 object-contain object-center"
            /><span class="text-neutral">{{ FinalNumberV }}</span>
        </div>
    </article>
</template>

<!-- FILE DOCUMENTED -->
