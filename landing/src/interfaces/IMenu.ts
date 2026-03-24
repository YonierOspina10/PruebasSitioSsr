// Interface representing a menu item structure
export interface MenuList {
    MENU_ICON: string; // Icon associated with the menu item
    MENU_ID: string; // Unique identifier for the menu item
    MENU_SECCION: string; // Section to which the menu item belongs
    MENU_TITLE: string; // Display title of the menu item
    MENU_URL: string; // URL linked to the menu item
    MENU_LOGO: boolean; // Indicates if the menu item has a logo
    SUB_MENU: MenuList[]; // Array of sub-menu items
    BG_COLOR: string; // Background color for the menu item
    TEXT_COLOR: string; // Text color for the menu item
    MENU_COLOR: string; // Color associated with the menu item
    MENU_CLASS: string; // CSS class for styling the menu item
}

// FILE DOCUMENTED
