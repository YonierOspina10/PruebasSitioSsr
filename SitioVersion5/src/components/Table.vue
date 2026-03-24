<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a table with loading state and button actions.
 */
export default defineComponent({
	props: {
		/** Columns configuration for the table */
		tableColumns: Object,
		/** Data to be displayed in the table */
		data: Object,
		/** Loading state indicator */
		loading: Boolean,
	},
	emits: ['button:action'],
	data() {
		/** Configuration object retrieved from the global config */
		let config = this.$config();
		return {
			config,
		};
	},
	methods: {
		/**
		 * Emits an action event with the specified item.
		 * @param item - The item associated with the button action.
		 */
		buttonAction(item) {
			this.$emit('button:action', item);
		},
	},
});
</script>

<template>
	<!-- Main container for the table content -->
	<div class="table-content">
		<!-- Loading indicator displayed when loading is true -->
		<div
			v-if="loading"
			class="flex w-full h-full items-center rounded-3xl bg-white rounded-r-3xl"
		>
			<div class="flex-1"></div>
			<div class="flex flex-col w-12/12">
				<!-- SVG spinner for loading indication -->
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
		<!-- Table displayed when loading is false -->
		<table
			v-if="!loading"
			class="table table-zebra w-full text-xs text-center"
		>
			<thead>
				<tr>
					<!-- Table header generated from tableColumns prop -->
					<th
						v-for="column in tableColumns"
						class="static bg-base-100 text-neutral font-bold"
					>
						{{ $t(column.header) }}
					</th>
				</tr>
			</thead>
			<tbody v-if="data?.length != 0 && !loading">
				<!-- Table rows generated from data prop -->
				<tr v-for="(row, index) in data">
					<th
						v-for="column in tableColumns"
						class="static text-input-placeholder text-sm bg-input-background font-poppinsm"
					>
						<!-- Display text or button based on column type -->
						<span v-if="column.type == 'text'">{{
							row[column.name]
						}}</span>
						<div class="flex items-center justify-center">
							<!-- Button displayed conditionally based on column type and row status -->
							<button
								v-if="column.type == 'button'"
								v-hide="
									row.button_show != undefined ||
									row.status == -1 ||
									row.status == 4 ||
									row.status == 3 ||
									row.status == 5
								"
								class="btn btn-xs text-neutral hover:bg-secondary/50 bg-base-content"
								@click="buttonAction(row)"
							>
								{{ $t(column.header) }}
							</button>
							<button
								v-if="column.type == 'print'"
								@click="buttonAction(row)"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="23"
									viewBox="0 0 22 23"
									fill="currentColor"
									class="text-neutral"
								>
									<path
										d="M11.1804 1.3932C11.264 1.4064 11.3476 1.4284 11.4268 1.4636C11.6512 1.5604 11.8448 1.7364 11.9636 1.9476C12.1088 2.2072 12.0912 2.4448 12.0912 2.7352V13.238C12.1616 13.2556 12.1704 13.2116 12.21 13.1808C13.0724 12.5208 13.8776 11.346 14.74 10.6508C15.6024 9.9556 16.8828 10.752 16.5484 11.8652C16.4912 12.0544 16.3328 12.2392 16.2052 12.3932C14.8544 13.9684 13.046 15.416 11.616 16.9384C11.0396 17.2816 10.5688 17.132 10.0936 16.7228C8.51402 15.3632 7.05322 13.5548 5.53522 12.1072C4.87962 10.994 6.21722 9.8324 7.22922 10.6508C8.09162 11.3504 8.89242 12.5208 9.75922 13.1808C9.79882 13.2116 9.80762 13.2556 9.87802 13.238V2.4492C9.87802 2.392 9.86922 2.3304 9.87802 2.2732C9.95282 1.666 10.6128 1.3096 11.1804 1.3932Z"
									/>
									<path
										d="M0.893192 17.5412C0.849192 17.132 0.849192 16.7228 0.857992 16.3136C0.866792 15.9308 0.853592 15.6228 1.09999 15.3148C1.48719 14.8308 2.16039 14.7252 2.66199 15.0948C3.36599 15.614 3.04479 16.6128 3.11959 17.3652C3.22519 18.4168 4.10959 19.2572 5.15239 19.3672C9.15199 19.332 13.1648 19.442 17.1556 19.31C18.0444 19.0812 18.7572 18.2892 18.8496 17.3652C18.9288 16.5952 18.5988 15.6008 19.3292 15.0772C20.0596 14.5536 21.0188 15.0464 21.1068 15.9044C21.3972 18.848 19.9628 21.29 16.896 21.62H5.07319C4.09199 21.62 3.05359 21.092 2.34079 20.4496C1.52239 19.7104 1.02519 18.7028 0.897592 17.6072C0.897592 17.5852 0.893192 17.5632 0.888792 17.5412H0.893192Z"
									/>
								</svg>
							</button>
						</div>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
/* Styles for the main table content container */
div.table-content {
	min-height: 480px;
	height: 480px;
	max-height: 480px;
}

.select{
  background-color: hsl(var(--n));
}

/* Styles for pagination controls */
ul.Pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

/* Active page style in pagination */
.Page-active {
	background-color: rgb(75 85 99 / var(--tw-bg-opacity)) !important;
	color: white !important;
}

/* Control styles for pagination SVGs */
.PaginationControl svg.Control {
	fill: transparent;
}

/* Zebra striping for table rows */
.table-zebra tbody tr:nth-child(even) th,
.table-zebra tbody tr:nth-child(even) td {
    background: hsl(var(--b3)/70%);
}
.table-zebra tbody tr:nth-child(odd) th, .table-zebra tbody tr:nth-child(odd) td {
  background: hsl(var(--b1));
}

/* Custom scrollbar styles */
div::-webkit-scrollbar {
	width: 1em;
	height: 8px;
}
div::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436);
	border-radius: 20px;
}
div::-webkit-scrollbar-thumb {
	background-color: rgb(217, 217, 217) !important;
	border-radius: 20px;
}
</style>

<!-- FILE DOCUMENTED -->
