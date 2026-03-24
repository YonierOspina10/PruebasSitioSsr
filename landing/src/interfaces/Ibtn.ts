import { Component as VueComponent } from 'vue';

// Interface for icon properties
export interface IconProps {
    icon: VueComponent; // Vue component representing the icon
    w: string; // Width of the icon
    h: string; // Height of the icon
    fill: string; // Fill color of the icon
    class?: string; // Optional additional CSS class
}

// Interface for view button properties
export interface ViewBtn {
    key: string | number; // Unique key for the button
    title: string; // Title of the button
    isActive: boolean; // Indicates if the button is active
    background: string; // Background color of the button
    options?: { [key: string]: any }; // Optional additional options
}

// FILE DOCUMENTED
