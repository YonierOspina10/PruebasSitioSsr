<script lang="ts">
import { defineComponent } from 'vue';// Import Vue helpers to define a component
import { useRoute } from 'vue-router';// Import vue-router hook to access route information
import { useGetInfoFirestore } from '@/composables/useInfoFirestore';
// Map URL section paths to their corresponding Firestore collections
const FIRESTORE_SECTIONS: Record<string, string> = {
  'terminosycondiciones': 'terms_and_conditions',
  'juego-responsable': 'responsible_gaming',
  'politica-de-privacidad': 'privacy_policies',
  'preguntasfrecuentes': 'frequent_questions'
};

export default defineComponent({// Define the Vue component
  // Props received from the parent component
  props: {// Static data for sections that do not use Firestore
    data: Object,
  },
  // Component reactive state
  data() {
    // Retrieve global configuration
    let config = this.$config();
    return {
      // Current section identifier from the route params
      sectionId: null as string | null,
      // Current base path extracted from the route
      path: '',
      // Terms loaded from Firestore
      terms: [] as any[],
      // Loading state for UI feedback
      loading: true,
      // Flag indicating whether Firestore data is being used
      usingFirestore: false,
      // Flag indicating whether the current route maps to Firestore
      isFirestoreSection: false,
      // Global configuration reference
      config,
    };
  },

  // Lifecycle hook executed when the component is mounted
  mounted() {
    // Initialize component state based on the current route
    this.updateSection(this.$route);
  },

  // Watchers definition
  watch: {
    // Watch for route changes
    '$route'(to) {
      // Re-evaluate section logic whenever navigation occurs
      this.updateSection(to);
    },
  },
  methods: {
    // Update component state based on the current route
    updateSection(route: any) {
      // Extract the base path without language prefix
      const newPath = route.path.replace(/^\/[a-z]{2}\//, '/').split('/')[1];
      // Extract section id from route parameters
      const newSectionId = route.params.sectionId;
      // Resolve the Firestore collection for the current path
      const firestoreCollection = FIRESTORE_SECTIONS[newPath];
      // Determine whether this route uses Firestore
      const isFirestore = !!firestoreCollection;
      // If the section path changed, reset Firestore-related state
      const sectionChanged = this.path !== newPath;
      // Persist current route-derived state
      this.path = newPath;
      this.sectionId = newSectionId;
      this.isFirestoreSection = isFirestore;
      // Enable loading state before resolving content
      if (sectionChanged && isFirestore && firestoreCollection) {
        this.loading = true;
        this.loadDynamicCollection(firestoreCollection);
      } else {
        // Disable loading immediately for static sections
        this.loading = false;
      }
    },

    // Load section content dynamically from Firestore
    async loadDynamicCollection(collectionName: string) {
      this.terms = [];
      this.usingFirestore = false;
      this.loading = true;

      try {
        const docs = await useGetInfoFirestore(
          this.config,
          this.$appComponent,
          collectionName,
          {
            useLogin: false,
            useScope: false,
          }
        );

        if (docs && docs.length) {
          this.usingFirestore = true;
          this.terms = docs;
          if (docs && docs.length) {
            this.usingFirestore = true;
            this.terms = docs.sort((a, b) => a.location - b.location);
          }

        } else {
          this.usingFirestore = false;
        }

      } catch (error) {
        console.warn(`⚠️ Could not load Firestore collection "${collectionName}"`, error);
        this.usingFirestore = false;
      } finally {
        this.loading = false;
      }
    },
    // Scroll to top when a term card is opened
    scrollT() {

      // Determine scroll container based on layout configuration
      const scrollContainer: any = this.config?.layout == 3
        ? window
        : document.getElementById('main-layout');

      // Abort if no scroll container is found
      if (!scrollContainer) return;

      // Scroll behavior depending on layout type
      if (this.config?.layout == 3) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    // Remove inline styles from HTML and return sanitized markup
    sanitizeContent(html: string): string {
      // Create a temporary container element
      const container = document.createElement('div');
      // Inject raw HTML
      container.innerHTML = html;
      // Remove all inline style attributes
      container.querySelectorAll('[style]').forEach(el =>
        el.removeAttribute('style')
      );
      // Return cleaned HTML
      return container.innerHTML;
    },
  },
});
</script>


<template>
  <!-- Main container for the component -->
  <div class="Box TextBox NoHeadBox InfoBox">
    <!-- Content container with styling -->
    <div class="BoxContent InfoBoxContent w-full mx-auto ActivePageTitle2">
      <!-- Container for the list of terms -->
      <!-- Loader -->
      <div v-if="loading" class="text-center py-10 text-neutral">
        loading...
      </div>

      <template v-else>
        <div class="TermsList HelpList md:w-2/6 w-full float-left">
          <!-- Ordered list for terms -->
          <ol id="OpenCard" class="MenuList m-0 overflow-visible p-0 shadow-none box-border L">
            <!-- List item for each term -->
            <li v-for="termino in (usingFirestore ? terms : data)" :key="termino.order"
              class="rounded-lg border-1 hover:border-primary transition-all ease-in-out text-left inline-block w-full mb-1.5 h-auto shadow-md bg-base-400 text-neutral"
              :class="{
                'border-accent': sectionId == termino.order
              }" @click="scrollT">
              <RouterLink :id="termino.order" class="MenuLink A Container" :to="'/' + path + '/' + termino.order"
                data-use="preload">
                <span class="PageName N text-neutral">{{
                  $t(termino.title)
                }}</span>
              </RouterLink>
            </li>
          </ol>
        </div>

        <!-- Container for term content -->
        <div class="BoxContent TermsContentBox HelpContentBox md:w-4/6 w-full float-left md:pl-8">
          <div v-for="termino in (usingFirestore ? terms : data)" :key="termino.order">
            <!-- Conditional rendering based on sectionId -->
            <div v-if="sectionId == termino.order">
              <div v-for="pane in termino.parent" :key="pane.order"
                class="shadow-md collapse w-full rounded-box border border-neutral-content collapse-plus mb-3 text-neutral bg-base-400">
                <!-- Checkbox for collapsible functionality -->
                <input type="checkbox" class="w-full" :checked="termino.parent[0] === pane" />
                <!-- Title for collapsible content -->
                <div class="collapse-title text-base font-medium">
                  {{ $t(pane.title) }}
                </div>
                <!-- Content area for collapsible section -->
                <div class="collapse-content overflow-auto">
                  <!-- Container for collapsible content -->
                  <div class="list-collapsible video-youtube" v-html="sanitizeContent($t(pane.content))"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

td,
th {
  border: 1px solid white;
  padding: 5px;
}
</style>
<!-- FILE DOCUMENTED -->
