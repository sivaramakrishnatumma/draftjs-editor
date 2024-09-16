import kebabCase from 'lodash.kebabcase';
import { Map, OrderedSet } from 'immutable';
import { stateToHTML } from 'draft-js-export-html';
import { customStyleFn } from './renderConfig';

/**
 * Converts a Draft.js editor state to HTML.
 *
 * @param {Object} state - The Draft.js editor state.
 * @returns {string} The HTML representation of the editor state.
 */
export const convertEditorStateToHtml = state => {
  const currentContent = state.getCurrentContent();

  // Check if there is any content, including text and other blocks like images
  const hasContent =
    currentContent.hasText() || currentContent.getBlockMap().some(block => block.getType() !== 'unstyled');

  const options = getStateToHtmlOptions(currentContent);
  const htmlContent = hasContent ? stateToHTML(currentContent, options) : '';
  return htmlContent;
};

/**
 * Returns a set of helper functions used to convert Draft.js internal state into HTML for export outside of Draft.js.
 *
 * @param {Object} contentState - The Draft.js content state.
 * @returns {Object} An object containing helper functions for converting Draft.js state to HTML.
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

  /**
   * Converts (renders) custom block types, like "paragraph" and "horizontal-rule" to HTML.
   *
   * @param {Object} block - The block to convert.
   * @returns {string} The HTML representation of the block.
   */
  blockRenderers: {
    'unordered-list-item': block => {
      const classesAndStyles = getClassesAndStyles({ block });
      return `<li${classesAndStyles}>${buildHtmlForBlockText(block, contentState)}</li>`;
    },
    'ordered-list-item': block => {
      const classesAndStyles = getClassesAndStyles({ block });
      return `<li${classesAndStyles}>${buildHtmlForBlockText(block, contentState)}</li>`;
    },
    unstyled: block => {
      const classesAndStyles = getClassesAndStyles({ block });
      if (block.getLength() === 0) {
        return `<div${classesAndStyles}><br></div>`;
      }
      // get block-level styling and classes if any
      // "result" will be the html eventually returned from this function
      return `<div${classesAndStyles}>${buildHtmlForBlockText(block, contentState)}</div>`;
    },
  },

  defaultBlockTag: 'div',
  /**
   * Returns the entity styling for a given entity.
   *
   * @param {Object} entity - The entity to get styling for.
   * @returns {Object} An object containing the entity styling.
   */
  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase();

    if (entityType === 'image') {
      let { src, width, height, widthType, heightType } = entity.getData();

      width = widthType === 'auto' ? 'auto' : width + 'px';
      height = heightType === 'auto' ? 'auto' : height + 'px';
      return {
        element: 'img',
        attributes: {
          src,
        },
        style: {
          width,
          height,
          maxWidth: '100%',
        },
      };
    }
  },
});

/**
 * Returns the classes and styles for a given block.
 *
 * @param {Object} block - The block to get classes and styles for.
 * @param {OrderedSet} blockStyles - The block styles.
 * @param {OrderedSet} classes - The block classes.
 * @returns {string} The classes and styles as a string.
 */
function getClassesAndStyles({ block, blockStyles = OrderedSet(), classes = OrderedSet() }) {
  const data = block.getData();
  data
    .filter((v, k) => !['depth', 'listStyles', 'listStart', 'alignment'].includes(k))
    .forEach((v, k) => {
      if (v === 'class') {
        classes = classes.add(k);
      } else {
        blockStyles = blockStyles.add(`${k}: ${v}`);
      }
    });
  const margin = block.get('depth');
  if (margin) {
    blockStyles = OrderedSet.of(`margin-left: ${margin * 2.5}em`).union(blockStyles);
  }

  const alignment = data.get('alignment');
  if (alignment) {
    blockStyles = OrderedSet.of(`text-align: ${alignment}`).union(blockStyles);
  }

  // convert classes & styles to strings and return
  classes = (classes.size && ` class="${classes.toArray().join(' ')}"`) || '';
  blockStyles = (blockStyles.size && `style="${blockStyles.toArray().join('; ')}"`) || '';

  const classesAndStyles = classes ? `${classes} ${blockStyles}` : blockStyles;

  return classesAndStyles ? ` ${classesAndStyles}` : classesAndStyles;
}

/**
 * Builds the HTML for a given block text.
 *
 * @param {Object} block - The block to build the HTML for.
 * @param {Object} contentState - The content state of the editor.
 * @returns {string} The resulting HTML string.
 */
function buildHtmlForBlockText(block, contentState) {
  if (!block) {
    return '<span>&nbsp;</span>';
  }
  let result = '';

  const blankEntitites = getBlankEntities(block, contentState);

  // now build the html for all inline styles for each "styleRange" in the block. A styleRange is
  // any sequence in the block where the characters share the same inline styling.
  const styleRanges = [];
  block.findStyleRanges(
    () => true,
    (s, e) => {
      styleRanges.push({ s, e });
    }
  );

  const htmlParts = styleRanges.map(styleRange => {
    const { s, e } = styleRange;
    const stylesString = getStylesString(block, s);

    const blockText = block.getText();

    let textWithBlankButtons = blockText.slice(s, e);

    blankEntitites.forEach((blankEntity, index) => {
      const { start, end, data } = blankEntity;
      if (s <= start && end <= e) {
        const blankText = textWithBlankButtons.slice(start - s, end - s);
        const blankButton = `<button data-key="${data.key}">${blankText}</button>`;
        // const blankButton = '____________________________';
        textWithBlankButtons =
          textWithBlankButtons.slice(0, start - s) + blankButton + textWithBlankButtons.slice(end - s);
      }
    });

    // Ignore parent span if text is blank button
    if (textWithBlankButtons.startsWith('<button')) {
      return textWithBlankButtons;
    }

    return stylesString ? `<span${stylesString}>${textWithBlankButtons}</span>` : textWithBlankButtons;
  });

  // The multiple "replace" calls prevent empty paragraphs and extra spaces from collapsing and failing to render.
  result = htmlParts
    .join('')
    .replace(/\n/g, '<br>')
    .replace(/\s{2,}?/g, '&nbsp;&nbsp;')
    .replace(/^\s$/g, '&nbsp;');

  return result;
}

/**
 * Retrieves an array of blank entities within a given block in reverse order.
 *
 * @param {Object} block - The block to search for blank entities.
 * @param {Object} contentState - The content state of the editor.
 * @returns {Array} An array of objects containing the start and end positions, entity key, and data for each blank entity.
 */
const getBlankEntities = (block, contentState) => {
  const blankEntitites = [];

  block.findEntityRanges(
    character => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
    },
    (start, end) => {
      const entityKey = block.getEntityAt(start);
      if (entityKey) {
        const entity = contentState.getEntity(entityKey);
        const { data } = entity.toJS();
        blankEntitites.unshift({ start, end, entityKey, data });
      }
    }
  );

  return blankEntitites;
};

/**
 * Returns a string of inline styles for a given block at a specific style position.
 *
 * @param {object} block - The block object.
 * @param {number} styleAt - The position of the style.
 * @returns {string} A string of inline styles, or an empty string if no styles are found.
 */
const getStylesString = (block, styleAt) => {
  let styles = block.getInlineStyleAt(styleAt);
  const customStyles = Map(customStyleFn(styles));

  const stylesArray = customStyles.reduce((acc, value, key) => {
    const kebabKey = kebabCase(key);
    let formattedValue = value;

    if (kebabKey === 'font-size' && /^\d*$/.test(value)) {
      formattedValue += 'pt';
    }

    return [...acc, `${kebabKey}: ${formattedValue}`];
  }, []);

  return stylesArray.length ? ` style="${stylesArray.join('; ')}"` : '';
};
