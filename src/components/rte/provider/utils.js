import { CompositeDecorator, ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { createContentStateWithBlanks } from '../utils/blank-utils';
import { BlankButton, InlineImage } from '../utils/decoratorRenderComponents';

/**
 * Strategy to find image entities in a content block.
 *
 * @param {ContentBlock} contentBlock - The content block to search for image entities.
 * @param {Function} callback - The callback function to call for each image entity found.
 * @param {ContentState} contentState - The content state of the editor.
 */
const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
  }, callback);
};

/**
 * Strategy to find the blank entities in a content block.
 *
 * @param {ContentBlock} contentBlock - The content block to search for image entities.
 * @param {Function} callback - The callback function to call for each image entity found.
 * @param {ContentState} contentState - The content state of the editor.
 */
const findBlankEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
  }, callback);
};

// Create a decorator
const decorator = new CompositeDecorator([
  {
    strategy: findImageEntities,
    component: InlineImage,
  },
  {
    strategy: findBlankEntities,
    component: BlankButton,
  },
]);

/**
 * Generates a new editor state from an HTML string.
 *
 * @param {string} html - The HTML string to generate the editor state from.
 * @returns {EditorState} The new editor state.
 */
export function generateNewState(html) {
  let newEditorState;

  if (html) {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    // htmlToDraft is considering only one block data, so updating blocks data with correct data and depth information
    const blocks = updateBlockData(contentBlocks, html);
    // Create content state from blocks and entityMap
    let contentState = ContentState.createFromBlockArray(blocks, entityMap);
    // Create content state with blank entities from the provided HTML string
    contentState = createContentStateWithBlanks(contentState, html);
    // Create an editor state with the updated content state and decorators
    newEditorState = EditorState.createWithContent(contentState, decorator);
    // Move cursor to the end of the editor state
    newEditorState = EditorState.moveSelectionToEnd(newEditorState);
  } else {
    // Create an empty editor state with the provided decorators
    newEditorState = EditorState.createEmpty(decorator);
  }

  return newEditorState;
}

/**
 * Parses inline styles from a string.
 *
 * @param {string} styleString - The inline style string to parse.
 * @returns {Object} An object with the parsed styles.
 * @example
 * const styleString = 'text-align: center; margin-left: 5rem;';
 * const styles = parseInlineStyles(styleString);
 * console.log(styles); // { 'text-align': 'center', 'margin-left': '5rem' }
 */
const parseInlineStyles = styleString => {
  const styleObject = {};
  const styles = styleString.split(';');
  styles.forEach(style => {
    const [property, value] = style.split(':');
    if (property && value) {
      styleObject[property.trim()] = value.trim();
    }
  });
  return styleObject;
};

/**
 * Updates block data with extracted styles from HTML.
 *
 * @param {Array<ContentBlock>} contentBlocks - The content blocks to update.
 * @param {string} html - The HTML string to extract styles from.
 * @returns {Array<ContentBlock>} The updated content blocks.
 */
const updateBlockData = (contentBlocks, html) => {
  // Temporary container to parse the HTML structure
  const container = document.createElement('div');
  container.innerHTML = html;

  // Iterate over each block and extract styles
  return contentBlocks.map((block, index) => {
    const blockType = block.getType(); // Block type (e.g., 'unordered-list-item', 'unstyled')

    let matchingNode = null;

    // Find matching HTML element based on block index and tag
    if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
      const listItems = container.querySelectorAll('li');
      matchingNode = listItems[index];
    } else {
      const divs = container.querySelectorAll('div');
      matchingNode = divs[index];
    }

    // If a matching node is found, extract the styles
    if (matchingNode && matchingNode.getAttribute('style')) {
      const blockStyle = matchingNode.getAttribute('style');
      const styleData = parseInlineStyles(blockStyle);

      const { 'text-align': alignment, 'margin-left': marginLeft } = styleData;

      let depth = 0;
      let data = block.getData();
      if (marginLeft) {
        depth = parseInt(parseFloat(marginLeft) / 2.5);
        data = data.delete('margin-left');
      }

      if (alignment) {
        data = data.delete('text-align').set('alignment', alignment);
      }

      return block.merge({
        data,
        depth,
      });
    }

    return block;
  });
};
