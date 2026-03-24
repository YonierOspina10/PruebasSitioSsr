<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import router from '@/router'; // Importing the router for navigation
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition

export default defineComponent({
	// Component definition
	data: function () {
		// Data function returning component state
		let config = this.$config(); // Configuration object
		let emitter = this.$emitter(); // Event emitter for handling events
		let appComponent: any = this.$appComponent; // Reference to the application component
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let msjSelect: number = 0; // Selected message ID
		let selectmsj: number = 0; // Selected message ID for display
		let selectmsjObj: any = undefined; // Selected message object
		let mensajes: any = []; // Array to hold messages
		let loadingM: boolean = false; // Loading state for messages
		let flag: boolean = true; // Flag for message state
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			msjSelect,
			selectmsj,
			selectmsjObj,
			mensajes,
			loadingM,
			flag,
		};
	},
	unmounted() {
		// Lifecycle hook called when the component is unmounted
		this.emitter.all.delete('accept:modal'); // Remove event listener for modal acceptance
	},
	updated() {
		// Lifecycle hook called after the component has been updated
		const messageBody: any = document.querySelector('#u_row_1'); // Select message body element
		if (messageBody != null && messageBody != undefined) {
			messageBody.style.background = 'white'; // Set background color to white
		}
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal on event
		});
		this.loadMensajes(); // Load messages on mount
	},
	methods: {
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close modal
		},
		exitButton() {
			// Method to handle exit button click
			if (this.msjSelect == 0) {
				router.push('/'); // Navigate to home if no message is selected
			}
			this.msjSelect = 0; // Reset selected message ID
			this.selectmsj = 0; // Reset display selected message ID
		},
		loadMensajes() {
			// Method to load messages from the API
			if (!this.loadingM) {
				this.loadingM = true; // Set loading state to true
				this.mensajes = []; // Clear existing messages
				const params = {
					where: {
						type: 0, // Filter for message type
					},
					count: 1000, // Limit the number of messages
					start: 0, // Start index for pagination
				};
				apiService
					.request('user_messages', params) // Request messages from API
					.then((response: any) => {
						if (!response || response == undefined) {
							this.loadingM = false; // Reset loading state if no response
							return;
						}

						if (response.code == 0) {
							this.mensajes = response.data.messages; // Store messages in state
							this.mensajes.forEach((item, i) => {
								item.fecha = item.date; // Map date to fecha
								item.global = false; // Set global flag to false
								if (item.checked == 0) {
									item.read = false; // Mark as unread if not checked
								} else {
									if (item.checked == 1) {
										item.read = true; // Mark as read if checked
									}
								}
							});
							this.loadingM = false; // Reset loading state
						}
					})
					.catch(() => {
						this.loadingM = false; // Reset loading state on error
					});
			}
		},
		clickRead(msj) {
			// Method to mark a message as read
			const params = {
				message_id: msj.id, // Message ID to mark as read
			};
			apiService
				.request('read_user_message', params) // Request to mark message as read
				.then((response: any) => {
					if (response.code == 0) {
						msj.read = true; // Update message state to read
						this.flag = false; // Update flag state
						this.refreshBalance(); // Refresh balance after reading
					}
				});
		},
		selectMsj(item) {
			// Method to select a message
			this.msjSelect = item.id; // Set selected message ID
			this.selectmsj = item.id; // Set display selected message ID
			this.selectmsjObj = item; // Set selected message object
			if (!item.read) {
				this.clickRead(item); // Mark as read if not already read
			}
		},
	/**
	 * Navigates the user back to the previous page in the browser's history.
	 * If there is no previous page in the history (i.e., `history.state.back` is null),
	 * it redirects the user to the '/home' route using the Vue Router.
	 *
	 * @method goBack
	 * @returns {void}
	 */
    goBack(){
		if(history.state.back !== null){
			history.back(); // method loads the previous URL (page) in the history list.
		}else {
			router.push('/home')
		}	
    }
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Alternative header for specific layout -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content area for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<!-- Box for displaying messages -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<!-- Wrapper for inbox -->
			<div id="inbox-wrapper" class="w-12/12 md:w-9/12 mx-auto">
				<!-- Container for header and messages -->
				<div
					class="ActivePageTitle Container w-full"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary'
							: 'mb-4'
					"
				>
					<span class="h1">
						<!-- Title for messages section -->
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Mis mensajes') }}</span
						>
					</span>
				</div>
				<!-- Loading indicator while messages are being fetched -->
				<div
					v-if="loadingM"
					class="flex w-full h-screen items-center shadow-lg rounded-3xl bg-white rounded-r-3xl"
				>
					<div class="flex-1"></div>
					<div class="flex flex-col w-12/12">
						<svg
							fill="none"
							class="w-12 h-12 animate-spin"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								clip-rule="evenodd"
								d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
								fill="currentColor"
								fill-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="flex-1"></div>
				</div>
				<!-- Messages list when not loading -->
				<div
					v-if="!loadingM"
					class="flex w-full justify-center h-screen shadow-lg rounded-3xl"
					:class="
						config.layout != undefined && config.layout == 3
							? 'gap-2 bg-base-200 p-2'
							: ''
					"
				>
					<section
						:class="{ activeBody: selectmsjObj != undefined }"
						class="flex flex-col w-full sm:w-4/12 bg-base-200 overflow-y-auto rounded-3xl"
					>
						<!-- Header for inbox section -->
						<label
							class="px-3 sticky top-0 bg-base-200 border-base-200 border-b-1 border-solid flex flex-row justify-between items-center rounded-t-3xl"
						>
							<img
								:src="config.favicon"
								style="
									width: auto;
									display: inline-block;
									padding: 6px 10px;
									border-radius: 23px;
									max-width: 50px;
								"
							/>
							<p class="text-neutral">
								{{ $t('Bandeja de entrada') }}
							</p>
							<!-- Refresh button for loading messages -->
							<div
								style="
									width: 25px;
									position: relative;
									vertical-align: top;
									padding: 10px;
									cursor: pointer;
									display: inline-block;
									margin-right: 12px;
									margin-top: 4px;
									float: right;
								"
								@click="loadMensajes()"
								:class="{ loading: loadingM, 'text-neutral': true }"
								class=""
							>
								<font-awesome-icon icon="fa-solid fa-refresh" />
							</div>
						</label>
						<ul>
							<!-- Message list when no messages are available -->
							<li
								class="text-center mt-3 py-5 border-base-200 border-1 px-3 transition cursor-pointer rounded-3xl hover:bg-base-200"
								v-if="mensajes.length == 0 && !loadingM"
							>
								<div
									class="flex items-center justify-center text-center"
								>
									<h3
										class="text-lg text-center text-gray-400"
									>
										{{ $t('No tiene mensajes') }}
									</h3>
								</div>
							</li>
							<!-- List of messages -->
							<li
								class="m-3 py-5 border-base-200 border-1 border-solid border-b px-3 transition cursor-pointer rounded-3xl bg-base-200 hover:bg-base-200/70"
								v-for="item in mensajes"
								:class="{
									'messages-item--active':
										item.id == selectmsj,
									unread: !item.read,
								}"
								@click="selectMsj(item)"
							>
								<div class="flex justify-between items-center">
									<h3 class="text-lg font-semibold text-neutral">
										{{ $t(item.subject) }}
									</h3>
									<!-- Indicator for unread messages -->
									<p
										class="rounded-3xl text-neutral"
										v-if="!item.read"
										style="
											background: #00b20b;
											color: white !important;
											height: 100%;
											width: 45px;
											margin: 0px;
											display: block;
											flex: none;
											text-align: center;
											top: 0px;
										"
									>
										{{ $t('NEW') }}
									</p>
								</div>
								<div
									class="text-md italic text-gray-400"
									v-html="$t(item.fecha)"
								></div>
							</li>
						</ul>
					</section>
					<section
						:class="{ activeBody: selectmsjObj == undefined }"
						class="relative w-12/12 sm:w-8/12 p-4 flex flex-col bg-base-300 rounded-3xl"
					>
						<!-- Display area for selected message -->
						<div
							v-if="selectmsjObj != undefined"
							class="flex justify-between items-center border-gray-200 border-b-1 border-solid mb-8"
						>
							<div class="flex space-x-4 items-center mb-4">
								<!-- Back button to deselect message -->
								<button
									@click="selectmsjObj = undefined"
									class="btn btn-square btn-sm bg-base-300 sm:hidden"
								>
                                    <svg data-v-6e8fbbe4="" class="svg-inline--fa fa-arrow-left text-accent-focus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path class="" fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
                                    </svg>
								</button>
                <!--
                  Go Back Button
                  - Positioned absolutely at top-right of the screen
                  - Triggers the goBack() method on click
                -->
                <button
                    class="absolute flex right-7 text-center items-center justify-center text-accent-focus"
                    @click="goBack()"
                >
                  <!-- Close icon (X) using Font Awesome -->
                  <font-awesome-icon icon="fa-solid fa-xmark" class="w-6 h-6"/>
                </button>
								<div
									class="h-10 w-10 md:h-12 md:w-12 overflow-hidden"
								>
									<img
										:src="config.favicon"
										loading="lazy"
										class="h-full w-full object-contain"
									/>
								</div>
								<div class="flex flex-col pl-4 pr-10 m-0">
									<h3 class="font-semibold text-lg text-neutral">
										{{ $t(selectmsjObj.subject) }}
									</h3>
								</div>
							</div>
						</div>
						<section class="overflow-y-auto rounded-xl">
							<!-- Body of the selected message -->
							<article
								v-if="selectmsjObj != undefined"
								class="text-gray-500 leading-7 tracking-wider"
							>
								<div v-html="$t(selectmsjObj.body)"></div>
							</article>
						</section>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
@media (max-width: 640px) {
	.activeBody {
		display: none !important; /* Hide active body on small screens */
	}
}
</style>

<!-- FILE DOCUMENTED -->
