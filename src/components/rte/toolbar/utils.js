/**
 * Checks if a style is either 'SUBSCRIPT' or 'SUPERSCRIPT'.
 *
 * @param {string} style - The style to check.
 * @returns {boolean} True if the style is 'SUBSCRIPT' or 'SUPERSCRIPT', false otherwise.
 */
export const isSuperscriptOrSubscript = style => ['SUBSCRIPT', 'SUPERSCRIPT'].includes(style);

/**
 * Returns the opposite style of a given style (e.g. 'SUBSCRIPT' becomes 'SUPERSCRIPT' and vice versa).
 *
 * @param {string} style - The style to get the opposite of.
 * @returns {string} The opposite style.
 */
export const getOppositeStyle = style => (style === 'SUBSCRIPT' ? 'SUPERSCRIPT' : 'SUBSCRIPT');
