// Interface representing a Jackpot entity
export interface Jackpot {
    id: string; // Unique identifier for the jackpot
    name: string; // Name of the jackpot
    description: string; // Description of the jackpot
    information?: string; // Optional additional information about the jackpot
    currentValue: number; // Current value of the jackpot
    image: string; // URL of the jackpot image
    image2?: string; // Optional second image for the jackpot
    gif?: string; // Optional GIF associated with the jackpot
    startDate: string | null; // Start date of the jackpot, can be null
    endDate?: string | null; // Optional end date of the jackpot, can be null
}

// Interface representing the current state of a Jackpot
export interface CurrentJackpot {
    id: string; // Unique identifier for the current jackpot
    current: number; // Current value of the jackpot
}

// Interface for jackpot data related to images
export interface DataJackpot {
    imgBackgroundDesktop?: string; // Optional background image for desktop
    imgBackgroundMobile?: string; // Optional background image for mobile
    imgTitleDesktop?: string; // Optional title image for desktop
    imgTitleMobile?: string; // Optional title image for mobile
}

// FILE DOCUMENTED
