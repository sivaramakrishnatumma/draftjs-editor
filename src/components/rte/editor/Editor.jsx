import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import { DefaultDraftBlockRenderMap, Editor as DraftEditor, RichUtils } from 'draft-js';
import DOMPurify from 'dompurify';
import { Map } from 'immutable';
import { useEditorContext } from '../provider/EditorContext';
import { blockRenderMap, blockStyle, customStyleFn, customStyleMap, getBlockRendererFn } from '../utils/renderConfig';
import { convertEditorStateToHtml } from '../utils/html-export-utils';
import { deleteBlankInState, insertBlankInState, updateBlankNumbers } from '../utils/blank-utils';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const customBlockRenderMap = Map(blockRenderMap);
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);
const blockRendererFn = getBlockRendererFn();

/**
 * Editor component for Draft.js
 *
 * @param {object} props - Component props
 * @param {string} props.value - Initial editor value
 * @param {string} [props.placeholder='Start typing...'] - Placeholder text
 * @param {function} props.onChange - Callback for editor changes
 * @param {string} [props.className] - Additional CSS class for the editor container
 */
const Editor = forwardRef(({ value, placeholder = 'Start typing...', onChange, className, allowBlanks }, ref) => {
  const editorRef = useRef();
  const outputHTML = useRef();
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

  useImperativeHandle(ref, () => {
    return {
      insertBlank,
      deleteBlank,
    };
  });

  /**
   * Initializes the editor state for the given id and value.
   */
  useEffect(() => {
    createEditorState(id, value);
    editorRef.current?.focus();

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
      if (outputHTML.current !== htmlContent) {
        outputHTML.current = htmlContent;
        onChange?.(DOMPurify.sanitize(htmlContent));
      }
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
    const updatedState = allowBlanks ? updateBlankNumbers(newState) : newState;

    // Update the editor state
    updateEditorState(updatedState);
  };

  /**
   * Handles focus event by activating the editor with the given id.
   */
  const handleFocus = () => {
    activateEditor(id);
  };

  /**
   * returns current editor state.
   */
  const getEditorState = () => {
    return editorStates[id];
  };

  /**
   * Inserts a blank into the editor state.
   */
  const insertBlank = () => {
    const editorState = getEditorState();
    updateEditorState(insertBlankInState(editorState));
  };

  /**
   * Removes a blank in the editor state.
   */
  const deleteBlank = key => {
    editorRef.current.focus();
    const editorState = getEditorState();
    updateEditorState(deleteBlankInState(editorState, key));
  };

  return (
    editorStates[id] && (
      <div className={`editable editor ${className}`} onClick={() => editorRef.current.focus()}>
        <DraftEditor
          ref={editorRef}
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
});

export default Editor;
