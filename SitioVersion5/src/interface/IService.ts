/**
 * Represents a submenu item with its properties.
 */
interface Submenu {
	/** Unique identifier for the submenu */
	SUBMENU_ID: string;
	/** URL associated with the submenu */
	SUBMENU_URL: string;
	/** Title of the submenu */
	SUBMENU_TITLE: string;
}

/**
 * Represents a menu with its properties and associated submenus.
 */
interface Menu {
	/** Unique identifier for the menu */
	MENU_ID: string;
	/** Title of the menu */
	MENU_TITLE: string;
	/** Slug for the menu, typically used in URLs */
	MENU_SLUG: string;
	/** Action label for editing the menu */
	MENU_EDITAR: string;
	/** Action label for deleting the menu */
	MENU_ELIMINAR: string;
	/** Action label for adding a new menu item */
	MENU_ADICIONAR: string;
	/** List of submenus associated with this menu */
	SUBMENUS: Submenu[];
}

// FILE DOCUMENTED
