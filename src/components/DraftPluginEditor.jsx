import { useState } from 'react';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import { styleMap, customStyleFn, getBlockStyle } from './customStyles';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import './styles.css'; // Import your custom CSS file

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const imagePlugin = createImagePlugin();
const plugins = [toolbarPlugin, imagePlugin];

const MyEditor = () => {
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

  return (
    <div>
      <Toolbar>
        {externalProps => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <button onClick={() => toggleBlockType('left')}>Left</button>
            <button onClick={() => toggleBlockType('center')}>Center</button>
            <button onClick={() => toggleBlockType('right')}>Right</button>
            <button onClick={() => toggleBlockType('justify')}>Justify</button>
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
            <select onChange={e => toggleInlineStyle(`FONT_FAMILY_${e.target.value}`)} defaultValue="">
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
          </>
        )}
      </Toolbar>
      <div style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          customStyleFn={customStyleFn}
          blockStyleFn={getBlockStyle}
          plugins={plugins}
        />
      </div>
      <button onClick={() => addImage(prompt('Enter the URL of the image:'))}>Add Image</button>
    </div>
  );
};

export default MyEditor;
