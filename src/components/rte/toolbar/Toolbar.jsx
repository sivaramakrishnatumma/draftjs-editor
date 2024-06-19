import { EditorState, RichUtils, SelectionState } from 'draft-js';
import { useEditorContext } from '../provider/EditorContext';
import InlineStyles from './InlineStyles';
import './Toolbar.css';
import FontSizeList from './components/FontSizeList';
import ColorPickerPopup from './components/ColorPickerPopup';

const moveSelectionToStart = currentEditorState => {
  let selection = currentEditorState.getSelection();
  const content = currentEditorState.getCurrentContent();
  const firstBlock = content.getFirstBlock();
  const key = firstBlock.getKey();
  selection = SelectionState.createEmpty(key);
  return EditorState.forceSelection(currentEditorState, selection);
};

const setSelectionIfNone = currentEditorState => {
  const selection = currentEditorState.getSelection();
  if (!selection.getHasFocus()) {
    return moveSelectionToStart(currentEditorState);
  }
  return currentEditorState;
};

const Toolbar = () => {
  const { activeEditorState, updateEditorState } = useEditorContext();

  const toggleInlineStyle = inlineStyle => {
    if (activeEditorState) {
      let newEditorState = setSelectionIfNone(activeEditorState);

      // if the new style is a compound style type (fontFamily, fontSize, color, or backgroundColor) and the current style includes the same type,
      // remove the current matching style type before turning on the new style.
      const existingMatch = activeEditorState
        .getCurrentInlineStyle() // getCurrentInlineStyle() returns an Immutable OrderedSet
        .filter(style => style.includes('.') && style.split('.')[0] === inlineStyle.split('.')[0]) // compound styles are dot-delimited e.g. fontFamily.Arial
        .toList()
        .get(0);
      if (existingMatch) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, existingMatch);
      }

      // activeEditorState.getCurrentInlineStyle().filter(style => {
      //   console.log('style::', style);
      //   return true;
      // });

      if (inlineStyle.endsWith('unset')) {
        updateEditorState(newEditorState);
      } else {
        updateEditorState(RichUtils.toggleInlineStyle(newEditorState, inlineStyle));
      }
    }
  };

  return (
    <div className="toolbar-container" onMouseDown={e => e.preventDefault()}>
      <FontSizeList onChange={toggleInlineStyle} />
      <InlineStyles />
      <ColorPickerPopup onChange={toggleInlineStyle} />
    </div>
  );
};

export default Toolbar;
