/**
 * Interface representing a promotional item in a menu.
 * Each promotional item may have the following optional properties:
 */
export interface Promotional {
	/**
	 * Optional icon for the menu item, represented as a string URL.
	 */
	MENU_ICON?: string;

	/**
	 * Optional unique identifier for the menu item.
	 */
	MENU_ID?: string;

	idValue?: string;

	/**
	 * Optional URL for the image associated with the menu item.
	 */
	MENU_IMG_URL?: string;

	url?: string;

	/**
	 * Optional section name where the menu item belongs.
	 */
	MENU_SECCION?: string;

	/**
	 * Optional title of the menu item.
	 */
	MENU_TITLE?: string;

	/**
	 * Optional URL that the menu item links to.
	 */
	MENU_URL?: string;

	redirect?: string;
}

// FILE DOCUMENTED
