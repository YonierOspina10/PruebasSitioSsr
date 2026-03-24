<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import methodsDeposit from '@/components/methodsDeposit.vue'; // Importing methodsDeposit component
import ExitIcon from '../icons/ExitIcon.vue'; // Importing ExitIcon component

export default defineComponent({
	props: {
		dataInfo: Object, // Prop to receive data information as an object
	},
	components: {
		methodsDeposit, // Registering methodsDeposit component
		ExitIcon, // Registering ExitIcon component
	},
	data() {
		let appComponent: any = this.$appComponent; // Accessing appComponent from the context
		let emitter = this.$emitter(); // Accessing event emitter from the context
		let config = this.$config(); // Accessing configuration from the context
        let newView = false; // Initializing newView variable
		return {
			appComponent, // Returning appComponent for use in the template
			emitter, // Returning emitter for use in methods
			config, // Returning config for use in the template
            newView, // Returning newView for use in the template
		};
	},
	updated() {}, // Lifecycle hook for when the component is updated
	mounted() {
        // Check if 'newView' is set in localStorage
        if (
		    this.appComponent.config.depositsView !== undefined &&
		    this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
		    this.appComponent.config.depositsView[this.appComponent.country]['switch'] === false &&
		    this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] === true
		) {
		    window.localStorage.removeItem('newViewDeposit');
		    window.localStorage.setItem('newViewDeposit', 'true');
		    this.newView = true;
		    this.appComponent.showModalDepositV2 = false;
		    this.appComponent.showModalDepositV3 = true;
		} else if (
		    this.appComponent.config.depositsView !== undefined &&
		    this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
		    this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
		    this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
		    window.localStorage.getItem('newViewDeposit') == 'true'
		) {
		    this.newView = true;
		    window.localStorage.setItem('newViewDeposit', 'true'); // Ensure localStorage reflects the newView state
		    this.appComponent.showModalDepositV2 = false; // Close the old modal
		    this.appComponent.showModalDepositV3 = true; // Show the new modal
		} else {
		    // Check various conditions to determine if newView should be set to true
		    if (
		        this.appComponent.config.depositsView !== undefined &&
		        this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
		        this.appComponent.config.depositsView[this.appComponent.country].isDefaultView !== undefined &&
		        this.appComponent.config.depositsView[this.appComponent.country].isDefaultView &&
		        !window.localStorage.getItem('newViewDeposit')
		    ) {
		        this.newView = true; // Set newView to true
		        window.localStorage.setItem('newViewDeposit', 'true'); // Update localStorage
		        this.appComponent.showModalDepositV2 = false; // Close the old modal
		        this.appComponent.showModalDepositV3 = true; // Show the new modal
		    } else {
		        this.newView = false; // Set newView to false
		        window.localStorage.setItem('newViewDeposit', 'false'); // Update localStorage
		    }
		}

    }, // Lifecycle hook for when the component is mounted
	methods: {
		close() {
			this.appComponent.showModalDepositV2 = false; // Method to close the modal
		},
		accept() {
			this.emitter.emit('accept:modal'); // Method to emit an 'accept' event
		},
        handleChangeWithdrawalsView() {
            window.localStorage.setItem('newViewDeposit', 'true'); // Update local storage for view state
            this.appComponent.gAnalytics('deposit_new', 'new'); // Track view change
            this.appComponent.showModalDepositV2 = false; // Close the old modal
            this.appComponent.showModalDepositV3 = true; // Show the new modal
        },
	},
});
</script>

<template>
	<!-- Main modal container, shown based on config.layout -->
	<div v-if="config.layout != 3" class="modal z-50">
		<!-- General container for modal content -->
		<div
			class="container-general w-full flex flex-col justify-center items-center"
		>
			<!-- Container for image and text with specific styles -->
			<div
				class="container-img-text w-full md:w-[820px] overflow-y-auto containar p-5 pt-8 rounded-3xl relative bg-base-300"
			>
				<!-- Promotion image container -->
				<div class="promotion-image w-full h-full shadow-md relative">
					<!-- Close button to trigger close method -->
					<label
						@click="close()"
						class="close-btn btn btn-xs btn-circle bg-base-200 absolute text-xs -top-7 -right-2 shadow-lg text-neutral transition ease-in-out hover:scale-105 z-1"
						>✕</label
					>
				</div>
				<!-- Scrollable content area -->
				<div
					class="w-full h-[80vh] overflow-auto text-neutral-content"
					:style="[
						{
							borderRadius: '0px',
						},
						{
							marginTop: '0px',
						},
					]"
				>
					<methodsDeposit />
                    <div
                        v-if="
							appComponent.config.depositsView != undefined &&
							appComponent.config.depositsView[
								appComponent.country
							] != undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].switch !== undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].switch &&
							appComponent.config.depositsView[
								appComponent.country
							].on !== undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].on
						"
                        class="absolute bottom-0 left-0 z-1"
                    >
                        <!-- Label for the view switch -->
                        <label class="label cursor-pointer">
                            <!-- Label text with an image -->
                            <span
                                class="label-text relative text-neutral text-sm font-bold w-14 leading-4"
                            >{{ $t('Nueva visual')
                                }}<img
                                    src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
                                    alt=""
                                    class="absolute -top-1 right-1"
                                /></span>
                            <!-- Switch control for toggling views -->
                            <label
                                class="swap text-9xl flex justify-center items-center relative transition-all duration-700 ease-in-out cursor-pointer scale-110"
                            >
                                <img
                                    src="https://images.virtualsoft.tech/m/msj0212T1709901670.png"
                                    alt=""
                                />
                                <!-- Hidden checkbox for the switch -->
                                <input
                                    type="checkbox"
                                    class="hidden"
                                    v-model="newView"
                                    @click="handleChangeWithdrawalsView()"
                                />
                                <!-- Images for the switch states -->
                                <img
                                    src="https://images.virtualsoft.tech/m/msj0212T1709901547.png"
                                    alt=" "
                                    class="swap-off absolute -left-[2px]"
                                />
                                <img
                                    src="https://images.virtualsoft.tech/m/msj0212T1709901521.png"
                                    alt=" "
                                    class="swap-on absolute -right-3"
                                />
                            </label>
                        </label>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<!-- Teleporting dialog to body for layout 3 -->
	<Teleport to="body">
		<dialog
			v-if="config.layout !== undefined && config.layout === 3"
			class="modal in w-screen h-screen bg-base-content bg-opacity-90"
		>
			<!-- Dialog container with specific dimensions and styles -->
			<div
				class="relative rounded-box w-full min-w-[370px] max-w-5xl min-h-[270px] max-h-[80vh] overflow-hidden text-base-300"
			>
				<!-- Close button for the dialog -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="close()"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="gray" stroke-width="3" />
						<path d="M18 2L2 18" stroke="gray" stroke-width="3" />
					</svg>
				</button>
                <div
                    v-if="
							appComponent.config.depositsView != undefined &&
							appComponent.config.depositsView[
								appComponent.country
							] != undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].switch !== undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].switch &&
							appComponent.config.depositsView[
								appComponent.country
							].on !== undefined &&
							appComponent.config.depositsView[
								appComponent.country
							].on
						"
                    class="absolute right-16 top-1"
                >
                    <!-- Label for the view switch -->
                    <label class="label cursor-pointer">
                        <!-- Label text with an image -->
                        <span
                            class="label-text relative text-neutral text-sm font-bold w-14 leading-4"
                        >{{ $t('Nueva visual')
                            }}<img
                                src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
                                alt=""
                                class="absolute -top-1 right-1"
                            /></span>
                        <!-- Switch control for toggling views -->
                        <label
                            class="swap text-9xl flex justify-center items-center relative transition-all duration-700 ease-in-out cursor-pointer scale-110"
                        >
                            <img
                                src="https://images.virtualsoft.tech/m/msj0212T1709901670.png"
                                alt=""
                            />
                            <!-- Hidden checkbox for the switch -->
                            <input
                                type="checkbox"
                                class="hidden"
                                v-model="newView"
                                @click="handleChangeWithdrawalsView()"
                            />
                            <!-- Images for the switch states -->
                            <img
                                src="https://images.virtualsoft.tech/m/msj0212T1709901547.png"
                                alt=" "
                                class="swap-off absolute -left-[2px]"
                            />
                            <img
                                src="https://images.virtualsoft.tech/m/msj0212T1709901521.png"
                                alt=" "
                                class="swap-on absolute -right-3"
                            />
                        </label>
                    </label>
                </div>
				<!-- Title of the dialog -->
				<h3 class="w-full p-4 bg-base-300 text-xl font-bold uppercase text-neutral">
                        {{ $t('Depositar') }}
				</h3>
				<!-- Scrollable content area within the dialog -->
				<div
					class="w-full h-[70vh] bg-base-300 flex flex-col justify-start items-center gap-4 rounded-b-box overflow-y-auto border-neutral border-2"
				>
					<methods-deposit />
				</div>
			</div>
		</dialog>
	</Teleport>
</template>

<style scoped>
/* Styles for the container with rounded corners and shadow */
.containar {
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.47);
}
/* Styles for the close button */
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important;
}
/* Styles for the modal background */
.modal {
	opacity: 0.8;
	z-index: 999 !important; /* Ensures modal is on top */
}
/* Styles for input labels */
input.FormLabel {
	color: black !important;
}
/* Styles for the submit button */
.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important;
}
/* Custom scrollbar styles */
.scrollWidth::-webkit-scrollbar {
	width: 0.5em; /* Width of the scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->
