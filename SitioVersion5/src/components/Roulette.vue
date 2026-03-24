<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
declare var confetti: any; // Declare external confetti library
declare var Winwheel: any; // Declare external Winwheel library
declare var randomColor: any; // Declare external randomColor library
export default defineComponent({
	data() {
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		return {
            config,
            appComponent,
            wheelPower: 0, // Power of the wheel
            wheelSpinning: false, // Indicates if the wheel is currently spinning
            theWheel: undefined, // Reference to the Winwheel instance
            winnerPosition: undefined, // Position of the winner on the wheel
            spinButton: false, // Controls visibility of the spin button
            modalRoulette: true, // Controls visibility of the roulette modal
            modalRouletteWin: false, // Controls visibility of the win modal
            roulette: {
                Id: null, // Roulette ID
                prizes: [], // List of prizes
                BackgroundURL: null, // Background URL for the roulette
                winner: {
                    id: null, // Winner ID
                    image: null, // Winner image
                    prizeWinImageURL: null, // URL for the prize win image
                    text: null, // Text associated with the winner
                },
            },
            giroExtra: false, // Indicates if extra spin is active
		}
	},
	mounted: function () {
		// Dynamically loads the WinWheel.js library and initializes the wheel
		var script = document.createElement("script");
		script.src = this.appComponent.config.roulette.WinWheel;
		script.addEventListener("load", () => {
			// Creates a new Winwheel instance with configuration
			this.theWheel = new Winwheel({
				'numSegments': this.appComponent.roulette.prizes.length,  // Number of segments based on prizes
				'outerRadius': 212,  // Size of the wheel
				'textFontSize': 14,  // Font size for text on segments
				'drawText': true,    // Enables text on segments
				'imageOverlay': true,  // Allows images to be overlaid
				'lineWidth': 1,      // Width of segment lines
				'strokeStyle': 'white',  // Color of segment lines
				'segments': this.appComponent.roulette.prizes,  // Prize data for segments
				'textOrientation': 'curved',  // Text follows curve of the wheel
				'textAlignment': 'outer',  // Text aligned to outer edge
				'textMargin': 15,    // Margin for text from edge
				'textFontFamily': 'monospace',  // Font family for text
				'textStrokeStyle': 'black',  // Text outline color
				'textLineWidth': 2,  // Text outline width
				'textFillStyle': 'white',  // Text color
				'drawMode': 'segmentImage',  // Draw mode using images for segments
				'animation': {
					'type': 'spinToStop',  // Animation type
					'duration': 5,  // Animation duration in seconds
					'spins': 8,     // Number of complete spins
					'callbackFinished': () => { this.alertPrize(); }  // Callback when animation finishes
				}
			});
		});
		document.head.appendChild(script);

		// Loads TweenMax library for animations
		var scriptTweenMax = document.createElement("script");
		scriptTweenMax.src = this.appComponent.config.roulette.TweenMax;
		document.head.appendChild(scriptTweenMax);

		// Loads randomColor library for confetti effects
		var scriptRandomColor = document.createElement("script");
		scriptRandomColor.src = this.appComponent.config.roulette.randomColor;
		document.head.appendChild(scriptRandomColor);

		// Loads confetti library for win celebrations
		var scriptConfetti = document.createElement("script");
		scriptConfetti.src = this.appComponent.config.roulette.confetti;
		document.head.appendChild(scriptConfetti);

		// Initialize UI state
		this.spinButton = true;  // Enable spin button
		this.wheelSpinning = false;  // Wheel is not spinning initially
	},
	watch: {
		modalRoulette(newVal){
			if(newVal){
				this.$nexTick(() => {
					this.$emit('roulette-mounted', this.roulette.Id)
				})
			}
		}
	},
	methods:{
		startSpin(){
			// Calculates a stop angle that will land on the winning segment
			let stopAt = this.theWheel.getRandomForSegment(this.winnerPosition);
			this.theWheel.animation.stopAngle = stopAt;
			this.theWheel.startAnimation();  // Starts the wheel animation
		},
		alertPrize(){
			// Called when wheel stops spinning
			if(this.roulette.winner.text === 'Giro extra') {
				// If prize is "Extra Spin"
				this.modalRouletteWin = true  // Show win modal
				this.spinButton = true;  // Enable spin button

				// Launch confetti celebration effect
				confetti({
					particleCount: 110,  // Number of confetti particles
					angle: 90,  // Launch angle
					startVelocity: 70,  // Initial velocity
					spread: 60,  // Spread angle
					colors: randomColor({ hue: 'orange', count: 18 }),  // Orange-toned colors
					origin: { x: 0.5, y: 0.5 }  // Launch from center of screen
				});

				// After 5 seconds
				setTimeout(() => {
					this.modalRouletteWin = false  // Hide win modal
					this.modalRoulette = true;  // Show roulette modal again
					this.spinButton = true;  // Enable spin button
					this.giroExtra = true;  // Set extra spin flag
					this.wheelSpinning = false;  // Reset wheel spinning state
					this.theWheel.stopAnimation(false);  // Stop any ongoing animation
					this.theWheel.rotationAngle = 0;  // Reset wheel position
					this.theWheel.draw();  // Redraw the wheel
				}, 5000);
			} else {
				// For regular prizes
				this.modalRoulette = false;  // Hide roulette modal
				this.modalRouletteWin = true;  // Show win modal
				this.giroExtra = false;  // Reset extra spin flag
				this.wheelSpinning = false;  // Reset wheel spinning state

				// Launch confetti celebration
				confetti({
					particleCount: 110,
					angle: 90,
					startVelocity: 70,
					spread: 60,
					colors: randomColor({ hue: 'orange', count: 18 }),
					origin: { x: 0.5, y: 0.5 }
				});
			}
		},
		game(){
			// Main game function triggered when user clicks spin
			if (this.wheelSpinning == false) {
				const vthis = this;
				vthis.spinButton = true  // Enable spin button

				// Prepare API request parameters
				let params: any = {
					Id: this.appComponent.roulette.Id  // Roulette ID
				};

				// Add action parameter if this is an extra spin
				if(this.giroExtra) {
					params.action = 'Giro Extra';
				}

				// Call API to determine the prize
				apiService.request('set_game_roulette2', params).then((response:any) => {
					if(response.code == 0) {
						// If API call successful
						vthis.roulette.winner = response.data.winner;  // Set winner info
						// Find position of winning prize in the wheel
						vthis.winnerPosition = vthis.appComponent.roulette.prizes.findIndex(x => x.id === response.data.winner.id) + 1;

						// Animate coins
						let coins = (document.getElementsByClassName("coins") as any)[0];
						coins.className += " transition-spin";

						// Start wheel spinning animation
						vthis.startSpin();
						this.spinButton = false;  // Disable spin button during spin
						this.wheelSpinning = true;  // Set wheel spinning state
					} else {
						// Error handling
						var error_mensaje = "";
						error_mensaje = this.$t('ERROR'+(response.error_code).toString());
						if (error_mensaje == "") {
							error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
						}

						// Show error modal
						this.appComponent.modal = {
							showModal : "notification",
							titleModal : this.$t('Error!'),
							messageModal : error_mensaje,
							buttonModal : this.$t("Aceptar"),
							orderModal : "closeModal"
						}
					}
				});
			}
		}
  }
})
</script>
<template>
    <div
        v-if="modalRoulette"
		:id="'roulette-'+appComponent.roulette.Id"
        class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
    >
        <!-- Modal for roulette display -->
        <div class="bg-coins absolute t-0 l-0">
            <img
                class="coins w-full h-full"
                :src="
                    appComponent.roulette.BackgroundURL !== ''
                        ? appComponent.roulette.BackgroundURL
                        : 'https://images.virtualsoft.tech/m/msjT1646163075.png'
                "
                alt="Coins Background"
            />
        </div>
        <label
            id="close-roulette"
            class="cursor-pointer absolute text-white text-3xl top-0 md:right-40 right-8 transition-all ease-in-out hover:scale-105 hover:text-primary-content"
            @click="
                modalRouletteWin = false;
                appComponent.roulette.Id = null;
            "
        >
            <font-awesome-icon icon="fa-solid fa-close" />
        </label>
        <div>
            <div class="container-roulette relative">
                <div class="absolute top-0 left-0">
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1637272382.png"
                        width="430"
                        height="434"
                        alt=""
                        class="w-full h-full"
                    />
                </div>
                <canvas
                    id="canvas"
                    width="434"
                    height="434"
                    class=""
                >
                    <p
                        style="{color: white}"
                        align="center"
                    >
                        Sorry, your browser doesn't support canvas. Please try another.
                    </p>
                </canvas>
                <div class="text-center pt-10 relative">
                    <button
                        id="spin_button"
                        class="absolute submit text-neutral left-[35%] px-8 w-40 h-14 bg-primary-content rounded-xl ease-in-out transition-all hover:scale-105"
                        v-if="spinButton"
                        @click="game()"
                    >
                        {{ $t('GIRAR') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div
        v-if="modalRouletteWin"
        class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
        id="roulette-win"
    >
        <!-- Modal for displaying winning results -->
        <div class="bg-coins absolute">
            <img
                class="coins"
                :src="
                    appComponent.roulette.BackgroundURL !== ''
                        ? appComponent.roulette.BackgroundURL
                        : 'https://images.virtualsoft.tech/m/msjT1646163075.png'
                "
                :class="this.roulette.winner.text === 'Giro extra' ? 'hidden' : ''"
                alt=""
            />
        </div>
        <div class="w-full relative">
            <label
                v-if="this.roulette.winner.text !== 'Giro extra'"
                id="close-roulette"
                class="cursor-pointer absolute text-white text-3xl top-0 md:right-40 right-8 transition-all ease-in-out hover:scale-105 hover:text-primary-content"
                @click="
                    modalRouletteWin = false;
                    appComponent.roulette.Id = null;
                "
            >
                <font-awesome-icon icon="fa-solid fa-close" />
            </label>
            <img
                class="prize w-full h-full object-contain max-w-[283px] md:max-w-[500px]"
                :src="roulette.winner.prizeWinImageURL"
                alt=""
            />
        </div>
    </div>
</template>
<style scoped>
.modal.text-neutral-content.items-center.bg-neutral-content.bg-opacity-75 {
    z-index: 99 !important; /* Ensure modal is on top */
}
#spin_button {
    box-shadow: inset -1px -7px 5px #00000061; /* Shadow effect for spin button */
}
img.prize {
    max-width: 900px; /* Maximum width for prize image */
    margin: auto; /* Center prize image */
}
.bg-coins {
    animation: 10s loop infinite; /* Animation for coins background */
}
@keyframes loop {
    0% {
        transform: scale(0.5); /* Start scale */
    }
    70% {
        transform: scale(1); /* Scale to full size */
    }
    100% {
        transform: scale(0.5); /* Scale back to start */
    }
}
</style>

<!-- FILE DOCUMENTED -->
