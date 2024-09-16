import { EditorState, Modifier, SelectionState } from 'draft-js';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

/**
 * Inserts a blank into the editor state at the current selection.
 *
 * @param {EditorState} editorState The current editor state.
 * @returns {EditorState} The updated editor state with the inserted blank.
 */
export function insertBlankInState(editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  // if selection is not collapsed do nothing
  if (!selectionState.isCollapsed()) return editorState;

  const currentBlanksCount = getBlanksCount(editorState);

  const key = uuidv4();
  const contentStateWithEntity = contentState.createEntity('BLANK', 'IMMUTABLE', {
    number: currentBlanksCount + 1,
    key,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newContentState = Modifier.insertText(contentState, selectionState, `Fill Blank`, null, entityKey);

  // Calculate the new selection state to place the cursor after the inserted blank
  const newSelection = selectionState.merge({
    anchorOffset: selectionState.getAnchorOffset() + 10,
    focusOffset: selectionState.getAnchorOffset() + 10,
  });

  let newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');

  // Apply the new selection state
  newEditorState = EditorState.forceSelection(newEditorState, newSelection);

  return updateBlankNumbers(newEditorState);
}

/**
 * Deletes a blank entity from the editor state and updates the selection.
 *
 * @param {EditorState} editorState - The current editor state.
 * @param {string} uuidKey - The UUID key of the blank entity to delete.
 *
 * @returns {EditorState} The updated editor state with the blank entity deleted.
 */
export const deleteBlankInState = (editorState, uuidKey) => {
  const contentState = editorState.getCurrentContent();
  let newContentState = contentState;
  let selectionToApply;

  contentState.getBlockMap().forEach(block => {
    block.findEntityRanges(
      character => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'BLANK' &&
          contentState.getEntity(entityKey).getData().key === uuidKey
        );
      },
      (start, end) => {
        // Capture the selection to apply after deleting the blank
        selectionToApply = SelectionState.createEmpty(block.getKey()).merge({
          anchorOffset: start,
          focusOffset: start,
        });

        const selectionToDelete = SelectionState.createEmpty(block.getKey()).merge({
          anchorOffset: start,
          focusOffset: end,
        });
        newContentState = Modifier.removeRange(newContentState, selectionToDelete, 'forward');
      }
    );
  });

  let newEditorState = EditorState.push(editorState, newContentState, 'remove-range');

  // Apply the new selection state to place the cursor at the position of the deleted blank
  newEditorState = EditorState.forceSelection(newEditorState, selectionToApply);

  return updateBlankNumbers(newEditorState);
};

/**
 * Returns the count of blanks in the editor state.
 *
 * @param {EditorState} state - The current editor state.
 * @returns {number} The count of blanks.
 */
export const getBlanksCount = state => {
  const contentState = state.getCurrentContent();
  let count = 0;

  contentState.getBlockMap().forEach(block => {
    block.findEntityRanges(
      character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
      },
      () => {
        count++;
      }
    );
  });

  return count;
};

/**
 * Creates a content state with blanks from a given content state.
 *
 * @param {ContentState} contentState - The content state to create blanks from.
 * @returns {ContentState} The content state with blanks.
 */
export const createContentStateWithBlanks = (contentState, html) => {
  const regex = /Fill Blank/g;
  let blankNumber = 1;
  const buttons = $('<p></p>').html(html).find('button');
  let count = 0;

  contentState.getBlockMap().forEach(block => {
    let blockText = block.getText();
    let match;

    while ((match = regex.exec(blockText)) !== null) {
      const selection = SelectionState.createEmpty(block.getKey()).merge({
        anchorOffset: match.index,
        focusOffset: match.index + match[0].length,
      });
      const key = $(buttons[count++]).attr('data-key');

      contentState = contentState.createEntity('BLANK', 'IMMUTABLE', { number: blankNumber++, key });
      const entityKey = contentState.getLastCreatedEntityKey();

      contentState = Modifier.replaceText(contentState, selection, match[0], null, entityKey);
    }
  });

  return contentState;
};

/**
 * Updates the numbers of blank entities in the editor state.
 *
 * @param {EditorState} state The current editor state.
 *
 * @returns {EditorState} The updated editor state with blank entities numbered.
 */
export const updateBlankNumbers = state => {
  const contentState = state.getCurrentContent();
  let newContentState = contentState;
  let blankNumber = 1;

  contentState.getBlockMap().forEach(block => {
    block.findEntityRanges(
      character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
      },
      (start, end) => {
        const entityKey = block.getEntityAt(start);
        if (entityKey) {
          newContentState = newContentState.mergeEntityData(entityKey, { number: blankNumber });
          blankNumber++;
        }
      }
    );
  });

  return EditorState.set(state, { currentContent: newContentState });
};
