<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue to create a component
import ArrowBack from '@/components/icons/ArrowBack.vue'; // Importing ArrowBack icon component

export default defineComponent({
    components: { ArrowBack }, // Registering the ArrowBack component
    props: {
        data: Object, // Defining a prop 'data' of type Object
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing appComponent from the context
        let config = this.$config(); // Accessing configuration from the context
        return {
            appComponent, // Returning appComponent for use in the template
            config, // Returning config for use in the template
        };
    },
    mounted() {
        window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
        document.querySelectorAll('.table').forEach((item) => {
            item?.classList.remove('table'); // Removing 'table' class from all elements with that class
        });
    },
    methods: {
        backView() {
            window.history.pushState('', '', '/promociones-bonos'); // Updating the browser history
            this.appComponent.promotionModal = {}; // Resetting promotion modal state
            this.appComponent.promotionView = false; // Hiding promotion view
        },
    },
});
</script>
<template>
    <!-- Button to navigate back, triggers backView method on click -->
    <button
        @click="backView()"
        class="absolute z-1 top-5 left-5 p-2 md:p-5 rounded-full hover:border-b-0 hover:scale-105 transition-all ease-in-out bg-base-300 shadow-[inset_0px_-8px_0px_0px_#04040470]"
    >
        <!-- ArrowBack icon component -->
        <ArrowBack
            :height="30"
            :width="30"
            class="h-8 md:h-10 w-8 md:w-10 fill-neutral drop-shadow-[2px_5px_1px_#04040470]"
        />
    </button>
    <!-- Conditional rendering of image based on data.urlImage2 -->
    <img
        v-if="data?.urlImage2 == undefined || data?.urlImage2 == ''"
        :src="data?.urlImage"
        class="object-contain w-full h-[13rem] md:h-auto in [mask-image:_linear-gradient(black_60%_,_transparent)]"
    />
    <img
        v-else
        :src="data?.urlImage2"
        class="object-contain w-full h-[13rem] md:h-auto in [mask-image:_linear-gradient(black_60%_,_transparent)]"
    />
    <div
        class="w-full h-auto"
        :class="config.layout != undefined && config.layout == 5 ? '' : 'bg-base-200'"
    >
        <!-- Title section with dynamic HTML content -->
        <div
            v-html="data?.title"
            class="pt-10 text-primary text-3xl font-bold font-poppinssl md:px-20"
            :class="{ 'container-general': config.layout != undefined && config.layout == 5 }"
        />
        <!-- Content section with dynamic HTML content -->
        <div
            v-html="data?.content"
            class="pt-10 pb-48 text-neutral text-lg font-poppinssl px-5 md:px-20 flex flex-col text-start gap-3 whitespace-pre-wrap"
            :class="{ 'container-general': config.layout != undefined && config.layout == 5 }"
        />
    </div>
</template>
<style>
/* Style for the first strong element in paragraphs and table cells */
div p strong:nth-child(1),
table td strong:nth-child(1) {
    font-size: large; /* Setting font size to large */
}

/* Style for table cells */
table :where(tbody th, tbody td) {
    border: solid 1px black; /* Adding border to table cells */
    padding: 5px; /* Adding padding to table cells */
}

/* Style for strong elements within container-general class */
div.container-general strong {
    color: black !important; /* Ensuring strong elements are black */
}
</style>

<!-- FILE DOCUMENTED -->
