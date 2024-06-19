import { ContentState, EditorState, convertFromHTML } from 'draft-js';

export function generateNewState(value) {
  let newState;

  if (value) {
    const blocksFromHTML = convertFromHTML(value);
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

    newState = EditorState.createWithContent(state);
  } else {
    newState = EditorState.createEmpty();
  }

  return newState;
}
