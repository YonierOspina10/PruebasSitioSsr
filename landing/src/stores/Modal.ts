import { defineStore } from 'pinia';

// Define a Pinia store for managing modal state
export const useModalStore = defineStore('Modal', {
    // State of the modal
    state: () => ({
        open: false, // Modal visibility
        widthModal: 'auto', // Modal width
        heightModal: 'auto', // Modal height
        title: '', // Modal title
        message: '', // Modal message
        action: () => {
            // Action callback
            console.log('Action');
        },
        cancel: () => {
            // Cancel callback
            console.log('Cancel');
        },
        actionText: 'Aceptar', // Text for action button
        cancelText: 'none', // Text for cancel button
        image: '', // Image URL
        widthImage: 'auto', // Image width
        heightImage: 'auto', // Image height
        lineDecoration: false, // Line decoration flag
        loading: false, // Loading state
        component: {
            // Component-specific modal data
            showModal: '',
            titleModal: '',
            messageModal: '',
            buttonModal: '',
            buttonModal2: '',
            link2: '',
            orderModal: '',
            innerHtmlModal: '',
        },
        group: [], // Array of modal components
    }),
    getters: {}, // No getters defined
    actions: {
        // Reset modal state to default values
        reset() {
            this.open = false;
            this.title = '';
            this.message = '';
            this.action = () => {
                console.log('Action');
            };
            this.cancel = () => {
                console.log('Cancel');
            };
            this.actionText = 'Aceptar';
            this.cancelText = 'none';
            this.image = '';
            this.widthImage = 'auto';
            this.heightImage = 'auto';
            this.widthModal = 'auto';
            this.heightModal = 'auto';
            this.lineDecoration = false;
            this.loading = false;
        },
        // Close modal by removing it from the group
        closeModal(component) {
            this.group.forEach((element, index) => {
                if (element.showModal == component) this.group.splice(index, 1);
            });
        },
        // Add a new modal component to the group
        addModal(component) {
            this.group.push(component);
        },
    },
});

// FILE DOCUMENTED
