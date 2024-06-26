import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateFromHtmlOptions } from '../utils/renderConfig';

export function generateNewState(html) {
  let newEditorState;

  if (html) {
    newEditorState = EditorState.createWithContent(stateFromHTML(html, stateFromHtmlOptions));
    newEditorState = EditorState.moveSelectionToEnd(newEditorState);
  } else {
    newEditorState = EditorState.createEmpty();
  }

  return newEditorState;
}
