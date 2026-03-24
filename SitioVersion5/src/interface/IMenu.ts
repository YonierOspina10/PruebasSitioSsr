/**
 * Represents a menu item in the application.
 */
export interface MenuList {
	/** The icon associated with the menu item. */
	MENU_ICON: string;
	/** Unique identifier for the menu item. */
	MENU_ID: string;
	/** Section to which the menu item belongs. */
	MENU_SECCION: string;
	/** Title of the menu item displayed to the user. */
	MENU_TITLE: string;
	/** URL linked to the menu item. */
	MENU_URL: string;
	/** Optional logo indicator for the menu item. */
	MENU_LOGO?: boolean;
	/** List of sub-menu items associated with this menu item. */
	SUB_MENU: MenuList[];
	/** Background color for the menu item. */
	BG_COLOR: string;
	/** Text color for the menu item. */
	TEXT_COLOR: string;
	/** Color for the menu item itself. */
	MENU_COLOR: string;
	/** CSS class for additional styling of the menu item. */
	MENU_CLASS: string;
}

/**
 * Represents a floating menu item, typically used for quick actions.
 */
export interface MenuFloating {
	/** Icon associated with the floating menu item. */
	icon: string;
	/** Title of the floating menu item displayed to the user. */
	title: string;
	/** URL linked to the floating menu item. */
	url: string;
}

/**
 * Represents a dropdown menu item with additional actions.
 */
export interface MenuListDropTown {
	/** Action to add a new item in the dropdown menu. */
	MENU_ADICIONAR: string;
	/** Action to edit an existing item in the dropdown menu. */
	MENU_EDITAR: string;
	/** Action to delete an item in the dropdown menu. */
	MENU_ELIMINAR: string;
	/** Unique identifier for the dropdown menu item. */
	MENU_ID: string;
	/** Slug for the dropdown menu item, typically used in URLs. */
	MENU_SLUG: string;
	/** Title of the dropdown menu item displayed to the user. */
	MENU_TITLE: string;
	/** List of sub-menu items associated with this dropdown menu item. */
	SUBMENUS: MenuList[];
	/** Optional flag indicating if the dropdown menu is open. */
	isOpen?: boolean;
}

// FILE DOCUMENTED
