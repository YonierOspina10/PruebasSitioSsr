<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

/**
 * Vue component definition for displaying and managing time-related information.
 */
export default defineComponent({
    data() {
        // Initialize component data properties
        let config = this.$config(); // Configuration object
        let appComponent: any = this.$appComponent; // Main application component reference
        let flagTime = true; // Flag to control timer state
        let detailTime = false; // Flag to control detail modal visibility
        let interval = 0; // Timer interval ID
        let displayTime = '00:00:00';
        return {
            config,
            appComponent,
            flagTime,
            detailTime,
            interval,
            displayTime,
        };
    },
    methods: {
        /**
         * Starts a timer that counts up and updates the timer display every second.
         */
        countUpTimer() {
            const vthis = this; // Preserve 'this' context
            if (this.flagTime) {
                clearInterval(vthis.interval); // Clear any existing interval

                vthis.interval = setInterval(function () {
                    // Calculate hours, minutes, and seconds from total seconds
                    var hour = Math.floor(vthis.appComponent.totalSeconds / 3600);
                    var minute = Math.floor((vthis.appComponent.totalSeconds - hour * 3600) / 60);
                    var seconds = vthis.appComponent.totalSeconds - (hour * 3600 + minute * 60);
                    // Format time values to ensure two digits
                    var hourText = hour < 10 ? '0' + hour : hour.toString();
                    var minuteText = minute < 10 ? '0' + minute : minute.toString();
                    var secondsText = seconds < 10 ? '0' + seconds : seconds.toString();
                    
                    // Assign to reactive status
                    vthis.displayTime = hourText + ':' + minuteText + ':' + secondsText;
                }, 1000);

                this.flagTime = false; // Set flag to prevent multiple timers
            }
        },
        /**
         * Formats a date string to 'h:mm:ss a' format using moment.js.
         * @param dateString - The date string to format.
         * @returns Formatted date string.
         */
        formatDate(dateString: any) {
            const date = new Date(dateString);
            return moment(date).format('h:mm:ss a');
        },
        /**
         * Formats a date string to 'YYYY-MM-DD h:mm:ss a' format using moment.js.
         * @param dateString - The date string to format.
         * @returns Formatted date string.
         */
        formatDate2(dateString: any) {
            const date = new Date(dateString);
            return moment(date).format('YYYY-MM-DD h:mm:ss a');
        },
    },
});
</script>

<template>
    <!-- Main section for displaying the clock and modal -->
    <section>
        <div class="clock">
            <!-- Button to open modal and start timer -->
            <label
                for="my-modal-3"
                class="modal-button bg-base-100 p-2 rounded-box text-neutral"
                @click="
                    detailTime = true; // Show detail modal
                    countUpTimer(); // Start the timer
                "
                data-analytics-label="header:clock"
                :data-analytics-context="`component:ClockUser|layout:layout-${appComponent.config.layout}`"
            >
                <font-awesome-icon icon="fa-solid fa-clock" />
                {{ formatDate(appComponent.time) }} <!-- Display formatted time -->
            </label>
        </div>
        <!-- Modal for displaying detailed time information -->
        <div
            class="modal detalle-usuario items-center"
            v-if="detailTime"
            @click.self="detailTime = false"
        >
            <div class="modal-box rounded-2xl bg-base-content text-neutral">
                <!-- Close button for the modal -->
                <label
                    for="my-modal-3"
                    @click="detailTime = false"
                    class="cursor-pointer text-right block"
                >
                    <font-awesome-icon
                        class="icon-cross"
                        icon="fa-solid fa-close"
                    />
                </label>
                <div class="detail-time">
                    <span class="title">Detalle del tiempo conectado</span><br />
                    <div class="detail-time-info">
                        <i
                            class="fa fa-hourglass-half pr-3"
                            aria-hidden="true"
                        ></i
                        ><span style="font-weight: bold">Tiempo actual de sesión: </span><span>{{ displayTime }}</span> <!-- Timer display -->
                    </div>
                    <div class="detail-time-info">
                        <i
                            class="fa fa-calendar-check-o pr-3"
                            aria-hidden="true"
                        ></i
                        ><span style="font-weight: bold">Última fecha de inicio de sesión: </span
                        >{{ formatDate2(appComponent.session.last_login_date) }} <!-- Display last login date -->
                    </div>
                    <div class="detail-time-info">
                        <i
                            class="fa fa-globe fa-lg pr-3"
                            aria-hidden="true"
                        ></i
                        ><span style="font-weight: bold">Última IP de inicio de sesión: </span
                        >{{ appComponent.session.last_login_ip }} <!-- Display last login IP -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- FILE DOCUMENTED -->
