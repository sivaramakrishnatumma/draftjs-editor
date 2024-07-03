import { AtomicBlockUtils, EditorState, Entity, Modifier, RichUtils, SelectionState } from 'draft-js';
import { useEditorContext } from '../provider/EditorContext';
import InlineStyles from './InlineStyles';
import FontSizeList from './components/FontSizeList';
import ColorPickerPopup from './components/ColorPickerPopup';
import Alignment from './components/Alignment';
import UndoRedo from './components/UndoRedo';
import Indent from './components/Indent';
import ListType from './components/ListType';
import BackgroundColorPickerPopup from './components/BackgroundColorPickerPopup';
import ImagePopup from './components/ImagePopup';
import { MAX_INDENT_DEPTH, MAX_LIST_DEPTH } from '../utils/constants';
import './Toolbar.css';

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

  const setAlignment = alignment => {
    updateEditorState(RichUtils.toggleBlockType(activeEditorState, alignment));
  };

  const handleUndoRedo = event => {
    const newState = event === 'undo' ? EditorState.undo(activeEditorState) : EditorState.redo(activeEditorState);

    updateEditorState(newState);
  };

  const setIndent = (
    direction,
    newEditorState = activeEditorState,
    listMax = MAX_LIST_DEPTH,
    indentMax = MAX_INDENT_DEPTH,
    setDepth
  ) => {
    const selectionState = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();
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
        const maxDepth = block.getType().includes('list-item') ? listMax : indentMax;
        const newDepth = setDepth !== undefined ? setDepth : Math.max(0, Math.min(depth + adjustment, maxDepth));
        return block.set('depth', newDepth);
      });

    blockMap = blockMap.merge(blocks);
    const newContentState = contentState.merge({
      blockMap,
      selectionBefore: selectionState,
      selectionAfter: selectionState,
    });
    newEditorState = EditorState.push(newEditorState, newContentState, 'adjust-depth');

    updateEditorState(newEditorState);
  };

  const toggleBlockType = blockType => {
    if (activeEditorState) {
      updateEditorState(RichUtils.toggleBlockType(activeEditorState, blockType));
    }
  };

  // Function to add an image entity
  const addImage = (editorState, url) => {
    // const contentState = editorState.getCurrentContent();
    // const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    // const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    // return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // Create a text insertion with the entity
    const textWithEntity = Modifier.insertText(
      contentState,
      editorState.getSelection(),
      ' ', // Space will be replaced with image later
      null,
      entityKey
    );

    const newEditorState = EditorState.push(editorState, textWithEntity, 'insert-characters');
    return newEditorState;
  };

  const insertImage = url => {
    if (url && activeEditorState) {
      const newEditorState = addImage(activeEditorState, url);
      updateEditorState(newEditorState);
    }
  };

  return (
    <div className="toolbar-container">
      <FontSizeList onChange={toggleInlineStyle} />
      <InlineStyles />
      <ColorPickerPopup onChange={toggleInlineStyle} />
      <BackgroundColorPickerPopup onChange={toggleInlineStyle} />
      <Alignment onChange={setAlignment} />
      <Indent onChange={setIndent} />
      <UndoRedo onChange={handleUndoRedo} />
      <ListType onChange={toggleBlockType} />
      <ImagePopup editorState={activeEditorState} onChange={insertImage} />
    </div>
  );
};

export default Toolbar;
