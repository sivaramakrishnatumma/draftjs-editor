/**
 * EditorProvider component that manages the editor state and provides it to child components.
 */
import { useCallback, useReducer } from 'react';
import EditorContext from './EditorContext';
import EditorReducer from './reducer';

// Initial state of the editor
const initialState = {
  editorStates: {}, // stores all editor states
  activeEditorId: null, // stores the currently active editor ID
  activeEditorState: null, // stores the currently active editor state
};

/**
 * EditorProvider component.
 * @param {ReactNode} children - Child components to render
 * @returns {ReactElement} EditorContext provider with the editor state and actions
 */
const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EditorReducer, initialState);

  /**
   * Create a new editor state for a given ID.
   * @param {string} id - Editor ID
   * @param {any} value - Initial value for the editor state
   */
  const createEditorState = useCallback((id, value) => {
    dispatch({ type: 'INITIALIZE_EDITOR_STATE', payload: { id, value } });
  }, []);

  /**
   * Update the editor state for the currently active editor.
   * @param {Object} state - New editor state
   */
  const updateEditorState = useCallback(state => {
    dispatch({ type: 'UPDATE_EDITOR_STATE', payload: state });
  }, []);

  /**
   * Remove an editor state for a given ID.
   * @param {string} id - Editor ID
   */
  const clearEditorState = useCallback(id => {
    dispatch({ type: 'CLEAR_EDITOR_STATE', payload: id });
  }, []);

  /**
   * Activate an editor with a given ID.
   * @param {string} id - Editor ID
   */
  const activateEditor = useCallback(id => {
    dispatch({ type: 'ACTIVATE_SELECTED_EDITOR', payload: id });
  }, []);

  /**
   * Deactivate the currently active editor.
   */
  const deActivateEditor = useCallback(() => {
    dispatch({ type: 'DEACTIVATE_SELECTED_EDITOR' });
  }, []);

  // if (activeEditorState) {
  //   console.log('activeEditorState::', draftjsToHtml(convertToRaw(activeEditorState?.getCurrentContent())));
  // }

  // Provide the editor context to child components
  return (
    <EditorContext.Provider
      value={{
        ...state,

        createEditorState,
        updateEditorState,
        clearEditorState,
        activateEditor,
        deActivateEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
