<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the main application layout.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let config = this.$config(); // Retrieves the configuration object.
        let appComponent: any = this.$appComponent; // Retrieves the application component.
        let book = appComponent.config != undefined && appComponent.config.footer_ != undefined && appComponent.config.footer_.complaintsBook_ != undefined ? appComponent.config.footer_.complaintsBook_ : {}; // Retrieves the book configuration if available.
        return {
            config,
            appComponent,
            book,
        };
    },
    mounted() {

    },
});
</script>

<template>
    <div>
        <div class="w-full flex justify-center items-center">
            <RouterLink v-if="book.target == '_self'" :to="book.url" target="_self" >
                <img
                    v-if="book.img != undefined && book.img != ''"
                    :src="book.img != undefined && book.img != '' ? book.img : ''"
                    alt="Book Image"
                    class="w-44 h-24"
                />
            </RouterLink>
            <a  v-else :href="book.url" target="_blank" >
                <img
                    v-if="book.img != undefined && book.img != ''"
                    :src="book.img != undefined && book.img != '' ? book.img : ''"
                    alt="Book Image"
                    class="w-44 h-24"
                />
            </a>
        </div>
    </div>
</template>
