import { useEffect, useId, useRef } from 'react';
import { DefaultDraftBlockRenderMap, Editor as DraftEditor, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Map } from 'immutable';
import { useEditorContext } from '../provider/EditorContext';
import {
  blockRenderMap,
  customStyleFn,
  customStyleMap,
  getBlockRendererFn,
  getStateToHtmlOptions,
} from '../utils/renderConfig';
import { blockStyle } from '../utils/helpers';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const convertEditorStateToHtml = state => {
  const currentContent = state.getCurrentContent();
  const options = getStateToHtmlOptions(currentContent);
  const htmlContent = currentContent.hasText() ? stateToHTML(currentContent, options) : '';
  return htmlContent;
};

const customBlockRenderMap = Map(blockRenderMap);
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);

// eslint-disable-next-line react/prop-types
const Editor = ({ value, placeholder = 'Start typing...', onChange, className }) => {
  const editor = useRef();
  const id = useId();
  const {
    editorStates,
    activeEditorState,
    activeEditorId,
    createEditorState,
    clearEditorState,
    activateEditor,
    updateEditorState,
  } = useEditorContext();

  /**
   * Initializes the editor state for the given id and value.
   */
  useEffect(() => {
    createEditorState(id, value);

    // Cleanup function to clear the editor state when the component unmounts.
    return () => {
      clearEditorState(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handles changes to the active editor state and updates the onChange callback
   * with the raw string representation of the editor content.
   */
  useEffect(() => {
    if (activeEditorId === id) {
      const htmlContent = convertEditorStateToHtml(activeEditorState);
      onChange?.(htmlContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEditorState]);

  /**
   * Handles a key command in the editor.
   *
   * @param {string} command - The key command to handle.
   * @param {Object} editorState - The current state of the editor.
   *
   * @returns {boolean} 'handled' if the command was handled, 'not-handled' otherwise.
   */
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      updateEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  /**
   * Handles changes to the editor state.
   * @param {object} newState The new state of the editor.
   */
  const handleChange = newState => {
    updateEditorState(newState);
  };

  /**
   * Handles focus event by activating the editor with the given id.
   */
  const handleFocus = () => {
    activateEditor(id);
  };

  const getEditorState = () => {
    return editorStates[id];
  };

  const blockRendererFn = getBlockRendererFn(editor.current, getEditorState, onChange);

  return (
    editorStates[id] && (
      <div className={`editable editor ${className}`}>
        <DraftEditor
          ref={editor}
          placeholder={placeholder}
          customStyleMap={customStyleMap}
          customStyleFn={customStyleFn}
          blockRendererFn={blockRendererFn}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={contentBlock => blockStyle(contentBlock)}
          editorState={editorStates[id]}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          onFocus={handleFocus}
        />
      </div>
    )
  );
};

export default Editor;
