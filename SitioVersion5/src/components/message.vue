<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import router from '@/router'; // Importing the router for navigation
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import type { Config } from 'auco-sdk-integration/dist/types'; // Importing Config type for TypeScript

export default defineComponent({
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let msjSelect: number = 0; // Selected message ID
		let selectmsj: number = 0; // Currently selected message ID
		let selectmsjObj: any = undefined; // Object of the currently selected message
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
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	updated() {
		const messageTitle: any = document.querySelector(
			'.v-color.v-text-align.v-line-height' // Selecting the message title element
		);
		if (messageTitle) {
			if (this.config.layout == 3)
				messageTitle.style.color = 'white'; // Change color based on layout
			else messageTitle.style.color = 'black';
		}
		const teeest: any = document.querySelector('#test')?.children[0]; // Selecting the first child of the element with ID 'test'
		if (teeest != null && teeest != undefined) {
			teeest?.style.setProperty(
				'background-color',
				'#ffffff00',
				'important' // Setting background color with important flag
			);
		}
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing modal on event
		});
		this.loadMensajes(); // Loading messages on component mount
	},
	methods: {
		closeModal() {
			this.appComponent.closeModal(); // Method to close the modal
		},
		exitButton() {
			if (this.msjSelect == 0) {
				router.push('/'); // Navigate to home if no message is selected
			}
			this.msjSelect = 0; // Reset selected message ID
			this.selectmsj = 0; // Reset currently selected message ID
		},
		loadMensajes() {
			if (!this.loadingM) {
				this.loadingM = true; // Set loading state to true
				this.mensajes = []; // Clear existing messages
				const params = {
					where: {
						type: 0, // Filter for message type
					},
					count: 1000, // Limit the number of messages
					start: 0, // Starting index for messages
				};
				apiService
					.request('user_messages', params) // Requesting user messages from API
					.then((response: any) => {
						if (response.code == 0) {
							this.mensajes = response.data.messages; // Storing messages in state
							this.mensajes.forEach((item, i) => {
								item.fecha = item.date; // Mapping date to 'fecha'
								item.global = false; // Setting global flag to false
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
					});
			}
		},
		clickRead(msj) {
			const params = {
				message_id: msj.id, // Preparing parameters for marking message as read
			};
			apiService
				.request('read_user_message', params) // Requesting to mark message as read
				.then((response: any) => {
					if (response.code == 0) {
						msj.read = true; // Marking message as read
						this.flag = false; // Updating flag state
						this.refreshBalance(); // Refreshing balance after reading message
					}
				});
		},
		selectMsj(item) {
			this.msjSelect = item.id; // Setting selected message ID
			this.selectmsj = item.id; // Updating currently selected message ID
			this.selectmsjObj = item; // Storing selected message object
			if (!item.read) {
				this.clickRead(item); // Mark message as read if it is unread
			}
		},
	},
});
</script>
<template>
	<!-- Main container for the InfoPage component, shown if user is logged in -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<!-- Box container for the message interface -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<!-- Wrapper for inbox content -->
			<div id="inbox-wrapper" class="mx-auto">
				<!-- Header container for the message section -->
				<div
					class="ActivePageTitle Container w-full mb-4 pb-2 border-b-2 border-solid border-primary-content"
				>
					<span class="h1">
						<span
							:class="
								config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
							class="font-poppinssb text-xl"
							>{{ $t('Mis mensajes') }}</span
						>
					</span>
				</div>
				<!-- Loading indicator shown while messages are being loaded -->
				<div
					v-if="loadingM"
					class="flex w-full items-center shadow-lg rounded-3xl bg-white rounded-r-3xl"
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
				<!-- Message list container -->
				<div
					v-if="!loadingM"
					class="flex w-full justify-center items-start rounded-3xl gap-2 p-2"
					:class="
						config.layout != undefined && config.layout == 3
							? 'bg-secondary-content shadow-lg'
							: ''
					"
				>
					<!-- Section for the list of messages -->
					<section
						:class="[
							{ activeBody: selectmsjObj != undefined },
							config.layout == 3 ? 'bg-accent/75' : 'bg-gray-100',
						]"
						class="flex flex-col w-full sm:w-4/12 overflow-y-auto rounded-xl min-h-[300px]"
					>
						<!-- Header for the inbox section -->
						<label
							:class="
								config.layout == 3
									? 'bg-accent/75 border-gray-200'
									: 'bg-gray-100 border-neutral-content'
							"
							class="py-2 relative border-b-1 border-solid flex flex-row justify-center items-center rounded-t-3xl"
						>
							<p
								:class="
									config.layout == 3
										? 'text-neutral'
										: 'text-neutral-content'
								"
								class="font-poppinssl"
							>
								{{ $t('Bandeja de entrada') }}
							</p>
							<!-- Refresh button to load messages -->
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
								:class="{ loading: loadingM }"
								class="absolute top-[-0.45rem] right-0"
							>
								<font-awesome-icon
									icon="fa-solid fa-refresh"
									:style="{
										color:
											config.layout == 3
												? 'white'
												: 'black',
									}"
								/>
							</div>
						</label>
						<!-- List of messages -->
						<ul class="my-2">
							<!-- Message when no messages are available -->
							<li
								class="text-center p-3 transition cursor-pointer hover:bg-white"
								v-if="mensajes.length == 0 && !loadingM"
							>
								<div
									class="flex items-center justify-center text-center"
								>
									<h3 class="text-lg text-center">
										{{ $t('No tiene mensajes') }}
									</h3>
								</div>
							</li>
							<!-- Individual message items -->
							<li
								class="rounded p-3 m-2 transition cursor-pointer relative"
								v-for="item in mensajes"
								:class="[
									{
										'messages-item--active':
											item.id == selectmsj,
										unread: !item.read,
									},
									config.layout == 3
										? 'bg-[#7F7F8F] hover:bg-[#7F7F8F]/75'
										: 'bg-gray-400 hover:bg-gray-400/75',
								]"
								@click="selectMsj(item)"
							>
								<h3 class="text-sm font text-neutral">
									{{ $t(item.subject) }}
								</h3>
								<div
									class="text-sm font-poppinssl italic text-neutral-300"
									v-html="$t(item.fecha)"
								></div>
								<span
									class="w-2 h-2 bg-success rounded-full absolute top-[5px] right-[5px] blob"
									v-if="!item.read"
								></span>
							</li>
						</ul>
					</section>
					<!-- Section for the selected message details -->
					<section
						:class="[
							{ activeBody: selectmsjObj == undefined },
							{ 'h-[300px]': selectmsjObj == undefined },
							config.layout == 3 ? 'bg-accent/75' : 'bg-gray-100',
						]"
						class="w-full sm:w-8/12 p-4 flex flex-col rounded-xl relative"
					>
						<div
							v-if="selectmsjObj != undefined"
							class="flex justify-center items-center my-8"
						>
							<!-- Back button to deselect message -->
							<button
								@click="selectmsjObj = undefined"
								class="sm:hidden absolute top-[16px] left-[16px]"
							>
								<font-awesome-icon
									style="color: #ffffff"
									icon="fa-solid fa-arrow-left"
								/>
							</button>
							<h3
								:class="
									config.layout == 3
										? 'text-neutral'
										: 'text-neutral-content'
								"
								class="font-semibold text-lg"
							>
								{{ $t(selectmsjObj.subject) }}
							</h3>
						</div>
						<!-- Container for the message body -->
						<section class="overflow-y-auto rounded-xl">
							<article
								v-if="selectmsjObj != undefined"
								class="text-gray-500 leading-7 tracking-wider"
							>
								<div
									id="test"
									class="text-neutral"
									v-html="$t(selectmsjObj.body)"
								></div>
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
		display: none !important; /* Hides active body on small screens */
	}
}
.tesst table {
	background-color: red !important; /* Sets background color for tables in 'tesst' class */
}
</style>

<!-- FILE DOCUMENTED -->
