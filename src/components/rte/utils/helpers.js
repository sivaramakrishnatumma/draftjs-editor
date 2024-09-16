/**
 * Converts a color component to a hexadecimal string.
 * @param {number} c - The color component value.
 * @returns {string} The hexadecimal string representation of the color component.
 */
const componentToHex = c => {
  const hex = Number(c).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Converts RGB values to a hexadecimal color code.
 * @param {number} r - The red component value.
 * @param {number} g - The green component value.
 * @param {number} b - The blue component value.
 * @returns {string} The hexadecimal color code.
 */
const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

/**
 * Converts a color code to a hexadecimal color code.
 * Supports both #RRGGBB and rgb(R,G,B) formats.
 * @param {string} code - The color code to convert.
 * @returns {string} The hexadecimal color code.
 */
export const getHexaCode = code => {
  if (code.startsWith('#')) return code;

  const [r, g, b] = code.slice(4, -1).split(',');
  return rgbToHex(r, g, b);
};

/**
 * Converts a style attribute string into key-value pairs.
 * @param {string} style - The style attribute string.
 * @param {Object} data - The initial data object to populate.
 * @returns {Object} The resulting key-value pairs object.
 */
export function convertStyleStringToObject(style = '', data = {}) {
  if (!style) {
    return null;
  }
  return style
    .split(';')
    .filter(s => s.includes(':'))
    .map(s => s.split(':'))
    .reduce((map, s) => {
      const key = s.shift().trim();
      const val = s.join(':').trim();
      map[key] = val;
      return map;
    }, data);
}
