<template>
	<!-- Main section for displaying information icons, hidden on small screens -->
	<section
		class="w-full flex justify-center items-center overflow-hidden flex-wrap p-[10px] my-[10px] gap-x-28 hidden md:flex"
	>
		<!-- Loop through INFO_ICONS to create RouterLink for each item -->
		<RouterLink
			v-for="(item, index) in INFO_ICONS"
			@click="redirect(item?.MENU_URL)"
			:to="
				item.MENU_URL != undefined && item.MENU_URL && item.MENU != ''
					? item.MENU_URL
					: '/home'
			"
			:data-analytics-label="`home:shortcut:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
            :data-analytics-position="index + 1"
            :data-analytics-context="`component:InfoIcons5|layout:layout-${appComponent.config.layout}`"
			class="group cursor-pointer flex flex-col justify-center items-center gap-4"
		>
			<!-- Container for the icon with border and rounded shape -->
			<div
				class="relative flex justify-center items-center border-solid border-1 border-neutral rounded-full w-[100px] h-[100px]"
			>
				<!-- Conditional rendering of the icon image -->
				<div
					v-if="
						item != undefined &&
						item.MENU_ICON &&
						item.MENU_ICON != ''
					"
					class="z-10"
				>
					
					<div
                    v-html="item.MENU_ICON2"
                    class="w-full h-full text-neutral"
                    />
				</div>
				<!-- SVG overlay that appears on hover -->
				<div
					class="absolute top-[45%] w-[120%] h-[120%] -translate-x-1/2 left-[55%] -translate-y-1/2"
				>
					<svg
						width="102"
						height="103"
						viewBox="0 0 102 103"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="fill-primary opacity-0 transition-all duration-100 group-hover:opacity-100 w-full h-full"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M26.2731 16.8957C10.7716 23.9789 0 39.6198 0 57.7765C0 82.5868 20.1127 102.699 44.923 102.699C69.3707 102.699 89.2571 83.1703 89.8331 58.8611C90.6959 58.3371 91.5306 57.9094 92.2379 57.6013C89.8227 56.0032 91.2034 54.9045 92.6516 53.7521C93.1396 53.3638 93.6353 52.9694 93.996 52.5477C93.7276 52.1761 93.4105 51.8159 93.0933 51.4557C91.9749 50.1854 90.8559 48.9146 91.8749 47.1408C92.1763 46.9124 92.492 46.7419 92.8078 46.5714C93.6144 46.1359 94.4222 45.6997 94.9972 44.296C94.5036 43.9929 94.0118 43.6887 93.5199 43.3844L93.5167 43.3825L93.5109 43.3789C93.0199 43.0752 92.5288 42.7715 92.0361 42.4689C92.2076 38.5127 90.4498 35.0142 88.6918 31.5154C87.0404 28.2288 85.3888 24.9419 85.3361 21.275C85.7835 20.6119 86.4066 20.6831 87.0293 20.7542C87.7103 20.832 88.3908 20.9097 88.8402 20.0269C87.7812 17.597 89.6601 16.0058 91.7879 14.2038C93.6765 12.6044 95.7611 10.8389 96.1618 8.17354C95.6676 7.73828 95.2804 7.75832 94.8934 7.77835C94.4459 7.80152 93.9985 7.82467 93.386 7.14381C88.3876 16.4075 80.8507 18.7602 72.7305 10.762C72.3386 9.11722 72.3524 7.37605 72.3663 5.63398C72.3816 3.71451 72.3969 1.79395 71.8694 0C69.6402 0.229315 69.7686 2.28673 69.9022 4.42738C69.9864 5.77575 70.0726 7.15714 69.5729 8.13549C69.3557 8.22127 69.1418 8.32116 68.9277 8.42109C68.0045 8.85217 67.0797 9.28396 65.8836 8.58626C64.9433 7.12143 63.8926 5.68209 61.5582 4.55044C60.0793 4.60907 59.3804 5.07558 58.7102 5.52297C57.9815 6.00938 57.2867 6.47318 55.6601 6.36551C54.1715 6.26733 52.7133 5.62426 51.3578 5.02647C48.2055 3.63627 45.6084 2.49094 44.4759 9.01312C43.2297 9.38375 41.6961 8.54779 40.1625 7.71184C38.6288 6.87588 37.0952 6.03992 35.8491 6.41056C34.7573 7.75293 35.1196 8.75238 35.4817 9.75132C35.7774 10.5672 36.073 11.3827 35.5762 12.3845C35.174 13.1594 34.7392 13.7242 34.2796 14.1218C33.3512 14.3474 32.4341 14.6018 31.5293 14.884C30.4144 14.7274 29.2525 14.1729 28.1183 13.6316C26.8895 13.0452 25.6932 12.4743 24.6244 12.4415C23.972 13.0883 24.1635 13.5353 24.3551 13.9824C24.5467 14.4295 24.7383 14.8766 24.0859 15.5233C24.8466 16.1149 25.5694 16.5459 26.2731 16.8957ZM96.637 26.2099C96.3914 26.0569 96.1441 25.905 95.8968 25.7532C95.6494 25.6013 95.4021 25.4494 95.1565 25.2964C95.9705 24.1292 96.3976 22.8008 96.8021 21.5423C97.4778 19.4407 98.0907 17.5342 100.338 16.8999C102.239 18.9381 100.711 20.7768 98.9779 22.8611C98.1157 23.8982 97.203 24.9962 96.637 26.2099Z"
						/>
					</svg>
				</div>
			</div>
			<!-- Container for the title and underline -->
			<div class="flex flex-col justify-center items-center gap-2">
				<p
					class="text-neutral font-poppinsl text-xl group-hover:text-primary-content"
				>
					{{ item.MENU_TITLE }}
					<!-- Display the title of the menu item -->
				</p>
				<span
					class="group-hover:bg-primary-content bg-transparent w-[80%] h-[3px] rounded-full transition duration-300"
				></span>
			</div>
		</RouterLink>
	</section>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Importing Vue composition API functions
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the store for app components
import { getInfoIcons } from '@/utils/configHome'; // Importing utility function to get info icons

const appComponent = useAppcomponentStore().appComponent; // Accessing app component state from the store
const INFO_ICONS = ref([]); // Reactive reference for storing info icons

onMounted(() => {
	// Lifecycle hook that runs after the component is mounted
	const loginState = appComponent.session?.logueado // Determine login state
		? 'logged_in'
		: 'not_login'; // Set login state based on session
	INFO_ICONS.value = getInfoIcons(appComponent, loginState); // Fetch info icons based on app component and login state
});
</script>

<!-- FILE DOCUMENTED -->
