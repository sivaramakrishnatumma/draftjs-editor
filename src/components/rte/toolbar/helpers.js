import { AtomicBlockUtils, EditorState, Modifier, RichUtils, SelectionState } from 'draft-js';
import { MAX_INDENT_DEPTH, MAX_LIST_DEPTH } from '../utils/constants';

/**
 * Move the selection to the start of the editor.
 *
 * @param {EditorState} currentEditorState - The current editor state.
 * @returns {EditorState} The updated editor state with the selection moved to the start.
 */
const moveSelectionToStart = currentEditorState => {
  let selection = currentEditorState.getSelection();
  const content = currentEditorState.getCurrentContent();
  const firstBlock = content.getFirstBlock();
  const key = firstBlock.getKey();
  selection = SelectionState.createEmpty(key);

  return EditorState.forceSelection(currentEditorState, selection);
};

/**
 * Set the selection if none is present.
 *
 * @param {EditorState} currentEditorState - The current editor state.
 * @returns {EditorState} The updated editor state with the selection set.
 */
const setSelectionIfNone = currentEditorState => {
  const selection = currentEditorState.getSelection();
  if (!selection.getHasFocus()) {
    return moveSelectionToStart(currentEditorState);
  }

  return currentEditorState;
};

/**
 * Sets the alignment of the selected block in the editor.
 *
 * @param {EditorState} editorState - The current editor state.
 * @param {string} alignment - The new alignment of the block (e.g. 'left', 'center', 'right').
 * @returns {EditorState} A new editor state with the updated block alignment.
 */
export const setAlignment = (editorState, alignment) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const block = contentState.getBlockForKey(selectionState.getStartKey());

  const newBlockData = block.getData().merge({ alignment });
  const newContentState = Modifier.setBlockData(contentState, selectionState, newBlockData);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

/**
 * Function to add an image entity.
 *
 * @param {EditorState} editorState - The current editor state.
 * @param {Object} options - The options for the image entity.
 * @returns {EditorState} The updated editor state with the image entity.
 */
export const addImage = (editorState, options) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', options);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  if (options.type === 'block') {
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  } else {
    const selectionState = editorState.getSelection();
    const contentStateWithText = Modifier.insertText(contentState, selectionState, ' ', null, entityKey);
    return EditorState.push(editorState, contentStateWithText, 'insert-characters');
  }
};

/**
 * Sets the indentation of the selected block in the editor.
 *
 * @param {EditorState} editorState - The current editor state.
 * @param {string} direction - The direction of the indentation (e.g. 'INDENT', 'OUTDENT').
 * @returns {EditorState} A new editor state with the updated block indentation.
 */
export const setIndent = (editorState, direction) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const adjustment = direction === 'INDENT' ? 1 : -1;
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  let blockMap = contentState.getBlockMap();
  const blocks = blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]])
    .map(block => {
      const depth = block.getDepth();
      const maxDepth = block.getType().includes('list-item') ? MAX_LIST_DEPTH : MAX_INDENT_DEPTH;
      const newDepth = Math.max(0, Math.min(depth + adjustment, maxDepth));
      return block.set('depth', newDepth);
    });

  blockMap = blockMap.merge(blocks);
  const newContentState = contentState.merge({
    blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });

  return EditorState.push(editorState, newContentState, 'adjust-depth');
};

/**
 * Sets the inline style of the selected text in the editor.
 *
 * @param {EditorState} editorState - The current editor state.
 * @param {string} inlineStyle - The new inline style to apply (e.g. 'BOLD', 'ITALIC', 'UNDERLINE').
 * @returns {EditorState} A new editor state with the updated inline style.
 */
export const setInlineStyle = (editorState, inlineStyle) => {
  let newEditorState = setSelectionIfNone(editorState);

  // if the new style is a compound style type (fontFamily, fontSize, color, or backgroundColor) and the current style includes the same type,
  // remove the current matching style type before turning on the new style.
  const existingMatch = editorState
    .getCurrentInlineStyle() // getCurrentInlineStyle() returns an Immutable OrderedSet
    .filter(style => style.includes('-') && style.split('-')[0] === inlineStyle.split('-')[0])
    .toList()
    .get(0);
  if (existingMatch) {
    newEditorState = RichUtils.toggleInlineStyle(newEditorState, existingMatch);
  }

  // activeEditorState.getCurrentInlineStyle().filter(style => {
  //   console.log('style::', style);
  //   return true;
  // });

  return newEditorState;
};
