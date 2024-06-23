import { EditorState, Modifier, RichUtils, SelectionState } from 'draft-js';
import { useEditorContext } from '../provider/EditorContext';
import InlineStyles from './InlineStyles';
import './Toolbar.css';
import FontSizeList from './components/FontSizeList';
import ColorPickerPopup from './components/ColorPickerPopup';
import Alignment from './components/Alignment';
import UndoRedo from './components/UndoRedo';
import Indent from './components/Indent';
import { MAX_INDENT_DEPTH, MAX_LIST_DEPTH } from '../utils/constants';

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
    console.log('alignment', alignment);
    const contentState = activeEditorState.getCurrentContent();
    const selectionState = activeEditorState.getSelection();
    let newContentState = Modifier.mergeBlockData(contentState, selectionState, { 'text-align': alignment });
    // const tableBlocks = tableBlocksInSelection(newContentState);
    // if (tableBlocks) {
    //   newContentState = setAlignmentInTable(alignment, newContentState, tableBlocks);
    // }
    updateEditorState(EditorState.push(activeEditorState, newContentState, 'change-block-data'));
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

  return (
    <div className="toolbar-container" onMouseDown={e => e.preventDefault()}>
      <FontSizeList onChange={toggleInlineStyle} />
      <InlineStyles />
      <ColorPickerPopup onChange={toggleInlineStyle} />
      <Alignment onChange={setAlignment} />
      <UndoRedo onChange={handleUndoRedo} />
      <Indent onChange={setIndent} />
    </div>
  );
};

export default Toolbar;
