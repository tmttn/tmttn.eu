/**
 * Z-Index Constants
 * 
 * Centralized z-index values to maintain consistent stacking order
 * across the application. Values are organized in logical layers:
 * 
 * BACKGROUND (1-10): Background elements like particles, gradients
 * CONTENT (100-500): Main content areas, sections, elevated content
 * INTERFACE (1000-2000): Navigation, headers, interactive elements
 * OVERLAY (9000-10000): Modals, tooltips, dropdowns that should appear above everything
 * 
 * Usage:
 * - Import { Z_INDEX } from '../../styles/zIndex'
 * - Use Z_INDEX.INTERFACE.HEADER instead of hardcoded values
 * - Negative values (like -1) are reserved for pseudo-elements and decorative backgrounds
 */

export const Z_INDEX = {
  // Background layer (1-10)
  BACKGROUND: {
    PARTICLES: 1,
    GRADIENT: 2,
  },

  // Content layer (100-500)
  CONTENT: {
    BASE: 100,
    ELEVATED: 200,
    GLASSMORPHISM: 300,
  },

  // Interface layer (1000-2000)
  INTERFACE: {
    HEADER: 1000,
    NAVIGATION: 1100,
    MOBILE_NAV: 1200,
    SKIP_LINK: 1300,
    THEME_TOGGLE: 1400,
  },

  // Overlay layer (9000-10000)
  OVERLAY: {
    MODAL: 9000,
    TOOLTIP: 9500,
    DROPDOWN: 9600,
  },
} as const;

// Type for z-index values
export type ZIndexValue = typeof Z_INDEX[keyof typeof Z_INDEX][keyof typeof Z_INDEX[keyof typeof Z_INDEX]];
