import { useState } from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import { styleMap, customStyleFn, getBlockStyle } from './customStyles';
import 'draft-js/dist/Draft.css';
import './styles.css'; // Import your custom CSS file

const MyNewEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = newState => {
    setEditorState(newState);
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const addImage = url => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    onChange(newEditorState);
  };

  const toggleInlineStyle = style => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const increaseIndent = () => {
    const newState = RichUtils.onTab({ preventDefault: () => {} }, editorState, 4);
    if (newState !== editorState) {
      onChange(newState);
    }
  };

  const decreaseIndent = () => {
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);
    const blockType = block.getType();

    if (block.getDepth() > 0) {
      const newState = RichUtils.toggleBlockType(editorState, blockType); // Toggle to the same block type to decrease depth
      onChange(newState);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
        <button onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
        <button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
        <button onClick={() => toggleBlockType('unordered-list-item')}>Unordered List</button>
        <button onClick={() => toggleBlockType('ordered-list-item')}>Ordered List</button>
        <button onClick={() => toggleBlockType('left')}>Left</button>
        <button onClick={() => toggleBlockType('center')}>Center</button>
        <button onClick={() => toggleBlockType('right')}>Right</button>
        <button onClick={() => toggleBlockType('justify')}>Justify</button>
        <button onClick={increaseIndent}>Indent</button>
        <button onClick={decreaseIndent}>Outdent</button>
        <select onChange={e => toggleInlineStyle(`FONT_SIZE_${e.target.value}`)} defaultValue="">
          <option value="" disabled>
            Font Size
          </option>
          {[8, 10, 12, 14, 16, 18, 24, 30, 36, 48].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <select onChange={e => toggleInlineStyle(`FONT_FAMILY_${e.target.value.replace(' ', '')}`)} defaultValue="">
          <option value="" disabled>
            Font Family
          </option>
          {['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'].map(family => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
        <input type="color" onChange={e => toggleInlineStyle(`COLOR_${e.target.value}`)} title="Text Color" />
        <input
          type="color"
          onChange={e => toggleInlineStyle(`BACKGROUND_COLOR_${e.target.value.replace('#', '')}`)}
          title="Background Color"
        />
      </div>
      <div style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          customStyleFn={customStyleFn}
          blockStyleFn={getBlockStyle}
        />
      </div>
      <button onClick={() => addImage(prompt('Enter the URL of the image:'))}>Add Image</button>
    </div>
  );
};

export default MyNewEditor;
