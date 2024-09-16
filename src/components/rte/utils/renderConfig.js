import { DefaultDraftInlineStyle } from 'draft-js';
import { Image, StyledBlock } from './blockRenderComponents';

/**
 * Custom style map that extends the default Draft.js inline styles.
 * @type {Object}
 */
export const customStyleMap = (() => {
  return { ...DefaultDraftInlineStyle };
})();

/**
 * Mapping of camelCase style names to their corresponding kebab-case names.
 * @type {Object}
 */
const camelCaseMap = {
  fontsize: 'fontSize',
  fontfamily: 'fontFamily',
  bgcolor: 'backgroundColor',
};

/**
 * Converts a kebab-case style name to its corresponding camelCase name.
 * @param {string} style - The kebab-case style name.
 * @returns {string} The camelCase style name.
 */
const getCameCase = style => {
  return camelCaseMap[style] || style;
};

/**
 * Handles inline styles, including Draft.js default styles, custom styles, and styles from the HTML style attribute.
 * @param {Object} style - The inline style object.
 * @returns {Object} The processed inline style object.
 */
export const customStyleFn = style => {
  const styleNames = style.toJS();

  const styles = styleNames.reduce((acc, styleName) => {
    if (styleName.includes('-')) {
      let [key, value] = styleName.split('-');
      key = getCameCase(key);
      acc[key] = value;
    } else {
      return { ...acc, ...customStyleMap[styleName] };
    }

    return acc;
  }, {});

  return Object.keys(styles).length ? styles : null;
};

/**
 * Returns a block renderer function that determines how to render a block based on its type.
 * @returns {Function} The block renderer function.
 */
export const getBlockRendererFn = () => block => {
  const type = block.getType();
  switch (type) {
    case 'unstyled':
      return {
        component: StyledBlock,
        editable: true,
      };
    case 'atomic':
      return {
        component: Image,
        editable: false,
      };
    default:
      return null;
  }
};

/**
 * Block render map that defines how to render different block types.
 * @type {Object}
 */
export const blockRenderMap = {
  unstyled: {
    element: 'div',
  },
};

/**
 * Returns the CSS classes for a block based on its type and depth.
 * @param {Object} block - The block object.
 * @returns {string} The CSS classes for the block.
 */
export const blockStyle = block => {
  const type = block.getType();
  const alignment = block.getData().get('alignment');
  const depth = block.getDepth();
  const data = block.getData();
  const classes = [];
  if (depth > 0 && !type.includes('list-item')) {
    classes.push('indent' + depth);
  }

  if (alignment) {
    classes.push(`align-${alignment}`);
  }

  data.forEach((v, k) => {
    switch (k) {
      case 'float':
        classes.push(`${k}-${v}`);
        break;
      default:
        return null;
    }
  });
  if (classes.length) return classes.join(' ');
};
