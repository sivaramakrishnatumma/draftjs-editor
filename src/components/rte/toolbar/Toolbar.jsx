import { EditorState, RichUtils } from 'draft-js';
import { useEditorContext } from '../provider/EditorContext';
import InlineStyles from './InlineStyles';
import FontSizeList from './components/FontSizeList';
import ColorPickerPopup from './components/ColorPickerPopup';
import Alignment from './components/Alignment';
import UndoRedo from './components/UndoRedo';
import Indent from './components/Indent';
import ListType from './components/ListType';
import BackgroundColorPickerPopup from './components/BackgroundColorPickerPopup';
import FontFamilyList from './components/FontFamilyList';
// import ImagePopup from './components/ImagePopup/ImagePopup';
import { setAlignment, setIndent, setInlineStyle } from './helpers';
import './Toolbar.css';

/**
 * Toolbar component for the editor.
 */
const Toolbar = () => {
  const { activeEditorState, updateEditorState } = useEditorContext();

  /**
   * Handle toggle inline style.
   *
   * @param {string} inlineStyle - The inline style to toggle.
   */
  const handleToggleInlineStyle = inlineStyle => {
    if (activeEditorState) {
      const newState = setInlineStyle(activeEditorState, inlineStyle);
      if (inlineStyle.endsWith('unset')) {
        updateEditorState(newState);
      } else {
        updateEditorState(RichUtils.toggleInlineStyle(newState, inlineStyle));
      }
    }
  };

  /**
   * Handle undo/redo.
   *
   * @param {string} event - The event type (undo or redo).
   */
  const handleUndoRedo = event => {
    if (activeEditorState) {
      const newState = event === 'undo' ? EditorState.undo(activeEditorState) : EditorState.redo(activeEditorState);
      updateEditorState(newState);
    }
  };

  /**
   * Handle set indent.
   *
   * @param {string} direction - The direction to indent (INDENT or OUTDENT).
   */
  const handleSetIndent = direction => {
    if (activeEditorState) {
      updateEditorState(setIndent(activeEditorState, direction));
    }
  };

  /**
   * Toggle block type.
   *
   * @param {string} listType - The list type to toggle.
   */
  const hanldeListType = listType => {
    if (activeEditorState) {
      updateEditorState(RichUtils.toggleBlockType(activeEditorState, listType));
    }
  };

  /**
   * Handle set alignment.
   *
   * @param {string} alignment - The alignment to set.
   */
  const handleAlignment = alignment => {
    if (activeEditorState) {
      updateEditorState(setAlignment(activeEditorState, alignment));
    }
  };

  /**
   * Insert an image.
   *
   * @param {Object} options - The options for the image entity.
   */
  // const insertImage = options => {
  //   if (activeEditorState) {
  //     updateEditorState(addImage(activeEditorState, options));
  //   }
  // };

  return (
    <div className="toolbar-container">
      <FontFamilyList onChange={handleToggleInlineStyle} />
      <FontSizeList onChange={handleToggleInlineStyle} />
      <InlineStyles />
      <ColorPickerPopup onChange={handleToggleInlineStyle} />
      <BackgroundColorPickerPopup onChange={handleToggleInlineStyle} />
      <Alignment onChange={handleAlignment} />
      <ListType onChange={hanldeListType} />
      <Indent onChange={handleSetIndent} />
      {/* <ImagePopup editorState={activeEditorState} onChange={insertImage} /> */}
      <UndoRedo onChange={handleUndoRedo} />
    </div>
  );
};

export default Toolbar;
