import type { Component as VueComponent } from 'vue';

/**
 * Interface representing the properties for an icon component.
 */
export interface IconProps {
	/** The Vue component representing the icon. */
	icon: VueComponent;
	/** The width of the icon. */
	w: string;
	/** The height of the icon. */
	h: string;
	/** The fill color of the icon. */
	fill: string;
	/** Optional CSS class for additional styling. */
	class?: string;
}

/**
 * Interface representing a view button with its properties.
 */
export interface ViewBtn {
	/** Unique key for the button, can be a string or number. */
	key: string | number;
	/** Title or label of the button. */
	title: string;
	/** Indicates if the button is currently active. */
	isActive: boolean;
	/** Background color of the button. */
	background: string;
	/** Optional additional options for the button. */
	options?: { [key: string]: any };
}

// FILE DOCUMENTED
