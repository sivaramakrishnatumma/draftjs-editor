import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faAlignJustify,
  faIndent,
  faOutdent,
} from '@fortawesome/free-solid-svg-icons';

export const MAX_INDENT_DEPTH = 5;
export const MAX_LIST_DEPTH = 4;

/**
 * Available colors
 * @type {Array<string>}
 */
const COLORS = [
  '#000000',
  '#FFFFFF',
  '#888888',
  '#AAAAAA',
  '#EEEEEE',
  '#880000',
  '#CC0000',
  '#FF0000',
  '#FFCCCC',
  '#FF8800',
  '#FFCC00',
  '#FFFF00',
  '#CCFF00',
  '#88FF00',
  '#008800',
  '#00CC00',
  '#00CC88',
  '#00CCCC',
  '#CCEEFF',
  '#00CCFF',
  '#0088FF',
  '#0000FF',
  '#8800FF',
  '#CC00CC',
  '#CC0088',
];

/**
 * Available background colors
 * @type {Array<string>}
 */
const BACKGROUND_COLORS = [...COLORS];

/**
 * Available font sizes
 * @type {Array<number>}
 */
const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 36];

/**
 * Available font families
 * @type {Array<string>}
 */
const FONT_FAMILIES = ['Arial', 'Courier', 'Helvetica', 'Times New Roman'];

export const availableFontFamilies = FONT_FAMILIES.map(family => ({
  type: `fontfamily-${family}`,
  label: family,
})).concat({ type: 'fontfamily-unset', label: 'reset' });

/**
 * Available font sizes with type and label
 * @returns {Array<{type: string, label: number}>}
 */
export const availableFontSizes = FONT_SIZES.map(size => ({
  type: `fontsize-${size}pt`,
  label: size,
})).concat({ type: 'fontsize-unset', label: 'reset' });

/**
 * Available colors with type and color
 * @returns {Array<{type: string, color: string}>}
 */
export const availableColors = COLORS.map(color => ({
  type: `color-${color}`,
  color,
}));

/**
 * Available background colors with type and color
 * @returns {Array<{type: string, color: string}>}
 */
export const availableBackgroundColors = BACKGROUND_COLORS.map(color => ({
  type: `bgcolor-${color}`,
  color,
}));

/**
 * Available alignments
 * @type {Array<{alignment: string, icon: Icon, tooltip: string}>}
 */
export const availableAlignments = [
  { alignment: 'left', icon: faAlignLeft, tooltip: 'Align Left' },
  { alignment: 'center', icon: faAlignCenter, tooltip: 'Align Center' },
  { alignment: 'right', icon: faAlignRight, tooltip: 'Align Right' },
  { alignment: 'justify', icon: faAlignJustify, tooltip: 'Align Justify' },
];

/**
 * Available indents
 * @type {Array<{direction: string, icon: Icon, tooltip: string}>}
 */
export const availableIndents = [
  {
    direction: 'INDENT',
    icon: faIndent,
    tooltip: 'Increase Indent',
  },
  {
    direction: 'OUTDENT',
    icon: faOutdent,
    tooltip: 'Decrease Indent',
  },
];
