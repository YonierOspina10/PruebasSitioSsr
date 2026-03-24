/**
 * Represents a Jackpot with its properties.
 */
export interface Jackpot {
	/** Unique identifier for the jackpot */
	id: string;
	/** Name of the jackpot */
	name: string;
	/** Description of the jackpot */
	description: string;
	/** Additional information about the jackpot (optional) */
	information?: string;
	/** Current monetary value of the jackpot */
	currentValue: number;
	/** URL of the jackpot's main image */
	image: string;
	/** URL of an additional image for the jackpot (optional) */
	image2?: string;
	/** URL of a GIF related to the jackpot (optional) */
	gif?: string;
	/** Start date of the jackpot (nullable) */
	startDate: string | null;
	/** End date of the jackpot (optional and nullable) */
	endDate?: string | null;
}

/**
 * Represents the current state of a Jackpot.
 */
export interface CurrentJackpot {
	/** Unique identifier for the jackpot */
	id: string;
	/** Current value associated with the jackpot */
	current: number;
}

/**
 * Represents data related to jackpot images.
 */
export interface DataJackpot {
	/** Background image for desktop view (optional) */
	imgBackgroundDesktop?: string;
	/** Background image for mobile view (optional) */
	imgBackgroundMobile?: string;
	/** Title image for desktop view (optional) */
	imgTitleDesktop?: string;
	/** Title image for mobile view (optional) */
	imgTitleMobile?: string;
}

// FILE DOCUMENTED
