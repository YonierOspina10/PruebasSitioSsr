/**
 * Filters promotions based on the current date and their validity period.
 * 
 * @param {Array} promotions - An array of promotions to be filtered.
 * @returns {Array} - An array of promotions that are valid for the current date.
 */
export function useFilterPromotions(promotions) {
    // Get the current date and set the time to midnight
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Filter the promotions based on their start and end dates
    if (!Array.isArray(promotions)) {
        return [];
    }

    return promotions.filter((e) => {
        // Exclude null or "null" values from the promotions
        if (e === "null" || e === null) return false;

        // Function to check if a date is valid (not undefined or empty)
        const isValidDate = (date) =>
            date != undefined && date != '';

        // If both startDate and date are invalid, include the promotion
        if (!isValidDate(e.startDate) && !isValidDate(e.date)) return true;

        // Parse startDate and date if they are valid
        const startDate = isValidDate(e.startDate) && new Date(`${e.startDate}`);
        const endDate = isValidDate(e.date) && new Date(`${e.date}`);

        // Check if both startDate and endDate are defined
        if (startDate && endDate) {
            // Include promotion if current date is within the range
            return currentDate >= startDate && currentDate <= endDate;
        } else if (startDate) {
            // Include promotion if current date is after startDate
            return currentDate >= startDate;
        } else if (endDate) {
            // Include promotion if current date is before endDate
            return currentDate <= endDate;
        }
        
        // If no valid dates are found, include the promotion
        return true;
    });
}

// FILE DOCUMENTED
