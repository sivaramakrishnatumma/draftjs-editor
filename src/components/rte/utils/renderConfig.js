import { DefaultDraftInlineStyle } from 'draft-js';
import { OrderedSet } from 'immutable';
import camelCase from 'lodash.camelcase';
import { buildHtmlForBlockText, getClassesAndStyles } from './helpers';
import { StyledBlock } from './blockRenderComponents';

export const customStyleMap = (() => {
  return { ...DefaultDraftInlineStyle };
})();

// this is for handling inline styles, including draft's default styles, styles from the customStyleMap, and those from the style attribute of the html
export const customStyleFn = style => {
  const styleNames = style.toJS();

  const styles = styleNames.reduce((acc, styleName) => {
    if (styleName.includes('.')) {
      const [key, value] = styleName.split('.');
      acc[key] = value + (key === 'fontSize' ? 'pt' : '');
    } else {
      return { ...acc, ...customStyleMap[styleName] };
    }

    return acc;
  }, {});

  return Object.keys(styles).length ? styles : null;
};

export const getBlockRendererFn = () => block => {
  const type = block.getType();
  switch (type) {
    case 'unstyled':
      return {
        component: StyledBlock,
        editable: true,
      };
    default:
      return null;
  }
};

/**
 * blockRenderMap, customStyleMap, customStyleFn & getBlockRendererFn are used by draft.js to convert its internal data structure
 * into html for display in the editor's content-editable area.
 */
export const blockRenderMap = {
  unstyled: {
    element: 'div',
  },
};

/**
 * function receives contentState from a draft.js instance and returns a set of helper functions
 * used to convert draft.js internal state into html for export outside of draft.js.
 */
export const getStateToHtmlOptions = contentState => ({
  // this handles converting any inline styles not matched by the inlineStyles map above (custom added styles)
  inlineStyleFn: style => {
    style = customStyleFn(style);
    return (
      style && {
        element: 'span',
        style,
      }
    );
  },

  // Converting (rendering) custom block types, like "paragraph" and "horizontal-rule" to html is handled here
  blockRenderers: {
    'center-align': block => {
      return `<div style="text-align: center;">${buildHtmlForBlockText('', block, contentState)}</div>`;
    },
    'left-align': block => {
      return `<div style="text-align: left;">${buildHtmlForBlockText('', block, contentState)}</div>`;
    },
    'right-align': block => {
      return `<div style="text-align: right;">${buildHtmlForBlockText('', block, contentState)}</div>`;
    },
    unstyled: block => {
      if (block.getLength() === 0) {
        return `<div ${getClassesAndStyles({ block })}><br></div>`;
      }
      // get block-level styling and classes if any
      // "result" will be the html eventually returned from this function
      return `<div ${getClassesAndStyles({ block })}>${buildHtmlForBlockText('', block, contentState)}</div>`;
    },
  },

  blockStyleFn: block => {
    const type = block.getType();
    const depth = block.getDepth();
    const data = block.getData();
    const attributes = {};
    let styles = OrderedSet();
    let classes = OrderedSet();

    data.forEach((v, k) => {
      if (v === 'class') {
        classes = classes.add(k);
      } else if (!['depth', 'listStyles', 'listStart'].includes(k)) {
        styles = styles.add(`${k}: ${v}`);
      }
    });

    if (depth > 0 && !type.includes('list-item')) {
      styles = styles.add(`margin-left:${2.5 * depth}em`);
    }
    if (classes.size) attributes.class = classes.toArray().join(' ');
    if (styles.size) attributes.style = styles.toArray().join(';');
    return { attributes };
  },

  defaultBlockTag: 'div',

  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase();
    if (entityType === 'video') {
      const { src } = entity.getData();
      return {
        element: 'video',
        attributes: {
          src: src,
        },
      };
    }
  },
});

/**
 * functions for converting html into draft.js data structure state
 */
export const stateFromHtmlOptions = {
  customBlockFn: element => {
    const align = element.style.textAlign;
    if (align === 'left') {
      return { type: 'left-align' };
    } else if (align === 'center') {
      return { type: 'center-align' };
    } else if (align === 'right') {
      return { type: 'right-align' };
    }
    return undefined;
  },

  // collect inline style data - inline type elements are passed through this function (span, img, a, etc.)
  customInlineFn: (element, { Style }) => {
    if (element.style.fontWeight === 'bold') {
      return Style('BOLD');
    }
    if (element.style.fontStyle === 'italic') {
      return Style('ITALIC');
    }

    let style = element.getAttribute('style');

    if (!style) {
      return null;
    }

    // if the element has multiple styles applied pass them all together as-is because the html import library's
    // "Style" function currently doesn't support processing multiple styles separately
    if (style.includes(';')) {
      return Style(style);
    }
    // otherwise format the style to match the customStyleMap
    style = style.split(':');
    const key = camelCase(style.shift().trim());
    const val = style.join(':').trim();
    style = `${key}.${val}`;
    if (style === 'textDecoration.underline') {
      return null;
    } // underline is handled automatically, don't override it
    return Style(style);

    // const stylesObject = convertStyleStringToObject(styles);

    // const result = [];
    // for (let key in stylesObject) {
    //   const value = stylesObject[key];

    //   key = camelCase(key);
    //   result.push(Style(`${key}.${value}`));
    // }

    // // if the element has multiple styles applied pass them all together as-is because the html import library's
    // // "Style" function currently doesn't support processing multiple styles separately
    // // if (style.includes(';')) {
    // //   return Style(style);
    // // }
    // // otherwise format the style to match the customStyleMap

    // console.log('result::', result);
    // return result;
  },
};
