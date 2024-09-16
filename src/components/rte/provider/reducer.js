import { generateNewState } from './utils';

/**
 * Reducer function for the editor state.
 *
 * @param {Object} state - The current state of the editor.
 * @param {Object} action - The action to be performed on the state.
 * @returns {Object} The new state of the editor.
 */
function EditorReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    /**
     * Initializes the editor state with a new value.
     *
     * @param {string} id - The ID of the editor.
     * @param {any} value - The initial value of the editor.
     */
    case 'INITIALIZE_EDITOR_STATE': {
      const { id, value } = payload;
      if (id) {
        const newState = generateNewState(value);

        return { ...state, editorStates: { ...state.editorStates, [id]: newState } };
      }
      return state;
    }

    /**
     * Updates the active editor state.
     *
     * @param {any} payload - The new state of the active editor.
     */
    case 'UPDATE_EDITOR_STATE':
      if (state.activeEditorId) {
        return {
          ...state,
          activeEditorState: payload,
          editorStates: { ...state.editorStates, [state.activeEditorId]: payload },
        };
      }
      return state;

    /**
     * Clears the editor state for a specific ID.
     *
     * @param {string} payload - The ID of the editor to clear.
     */
    case 'CLEAR_EDITOR_STATE': {
      const states = { ...state.editorStates };
      delete states[payload];

      return { ...state, editorStates: states };
    }

    /**
     * Activates a selected editor.
     *
     * @param {string} payload - The ID of the editor to activate.
     */
    case 'ACTIVATE_SELECTED_EDITOR':
      return {
        ...state,
        activeEditorId: payload,
        activeEditorState: state.editorStates[payload],
      };

    /**
     * Deactivates the currently active editor.
     */
    case 'DEACTIVATE_SELECTED_EDITOR':
      return {
        ...state,
        activeEditorId: null,
        activeEditorState: null,
      };

    default:
      return state;
  }
}

export default EditorReducer;
