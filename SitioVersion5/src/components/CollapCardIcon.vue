<script lang="ts">
import { defineComponent, watch } from 'vue'; // Import necessary functions from Vue
import UserInfoContain from '@/components/UserInfoContain.vue'; // Import UserInfoContain component
import apiService from '@/services/ApiService'; // Import API service for data fetching
import ArrowIconReferral from '@/components/icons/ArrowIconReferral.vue'; // Import ArrowIconReferral component

export default defineComponent({
	components: {
		ArrowIconReferral, // Register ArrowIconReferral component
		UserInfoContain, // Register UserInfoContain component
	},
	props: {
		icon: String, // Prop for icon source
		text: String, // Prop for display text
		dataInfoUser1: Object, // Prop for user 1 data
		dataInfoUser2: Object, // Prop for user 2 data
		model: Number, // Prop for model selection
		open: {
			type: Boolean, // Prop to control open/close state
			default: false, // Default value for open prop
		},
	},
	data: function () {
		let emitter = this.$emitter(); // Initialize event emitter
		let appComponent: any = this.$appComponent; // Reference to the app component
		let imgIcon = this.icon; // Store icon prop in data
		let text: any = this.text; // Store text prop in data
		let dataUser1: any = this.dataInfoUser1; // Store user 1 data in data
		let dataUser2: any = this.dataInfoUser2; // Store user 2 data in data
		return {
			imgIcon,
			text,
			emitter,
			dataUser1,
			dataUser2,
			appComponent,
		};
	},
	watch: {
		dataInfoUser1: {
			handler(newVal, oldValue) {
				this.dataUser1 = newVal; // Update dataUser1 when prop changes
			},
			deep: true, // Watch for deep changes in dataInfoUser1
		},
		dataInfoUser2: {
			handler(newVal, oldValue) {
				this.dataUser2 = newVal; // Update dataUser2 when prop changes
			},
			deep: true, // Watch for deep changes in dataInfoUser2
		},
	},
});
</script>

<template>
	<!-- Main container for the component -->
	<article class="flex flex-col items-center justify-center gap-4">
		<div
			class="flex gap-8 items-center justify-between rounded-[50px] w-full h-10 sm:h-20 bg-gradient-to-l from-base-100 cursor-pointer"
		>
			<!-- Container for icon and text -->
			<div class="flex gap-8 items-center w-[80%] sm:w-[60%]">
				<div class="w-16 sm:w-[112px]">
					<img :src="imgIcon" alt="icon" class="h-11 sm:h-auto" />
				</div>
				<div
					class="w-full flex items-center justify-center sm:justify-start"
				>
					<p
						class="text-sm text-center sm:text-left w- sm:text-lg font-poppinsm"
					>
						{{ $t(text) }}
						<!-- Translated text -->
					</p>
				</div>
			</div>
			<!-- Container for the referral icon -->
			<div class="pr-3 sm:pr-7">
				<ArrowIconReferral
					class="stroke-primary-content w-[20px] sm:w-[26px] h-[20px] sm:h-[26px]"
					:class="
						open
							? 'rotate-180 transition ease-in'
							: 'transition ease-in'
					"
				/>
			</div>
		</div>
		<div
			@click.stop=""
			v-if="model == 1 && dataUser1.length > 0"
			:class="open ? 'h-auto rounded-3xl w-full' : ''"
		>
			<UserInfoContain :is-active1="open" :data1="dataUser1" />
			<!-- UserInfoContain component for user 1 -->
		</div>
		<div
			@click.stop=""
			v-else-if="model == 2 && dataUser2.length > 0"
			:class="open ? 'h-auto rounded-3xl w-full' : ''"
		>
			<UserInfoContain :is-active1="open" :data2="dataUser2" />
			<!-- UserInfoContain component for user 2 -->
		</div>
		<div
			@click.stop=""
			v-else-if="model == 1 && dataUser1.length == 0"
			:class="open ? 'h-auto rounded-3xl w-full' : ''"
		>
			<UserInfoContain :is-active1="open" :data1="dataUser1" />
			<!-- UserInfoContain component for user 1 -->
		</div>
		<div
			@click.stop=""
			v-else-if="model == 2 && dataUser2.length == 0"
			:class="open ? 'h-auto rounded-3xl w-full' : ''"
		>
			<UserInfoContain :is-active1="open" :data2="dataUser2" />
			<!-- UserInfoContain component for user 2 -->
		</div>
		<div
			v-if="model == 1"
			class="w-[95%] sm:w-[85%] h-0.5 bg-accent-content mt-2 rounded-full"
		></div>
	</article>
</template>

<!-- FILE DOCUMENTED -->
