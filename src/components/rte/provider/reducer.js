import { generateNewState } from './utils';

function EditorReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'INITIALIZE_EDITOR_STATE': {
      const { id, value } = payload;
      if (id) {
        const newState = generateNewState(value);

        return { ...state, editorStates: { ...state.editorStates, [id]: newState } };
      }
      return state;
    }

    case 'UPDATE_EDITOR_STATE':
      if (state.activeEditorId) {
        return {
          ...state,
          activeEditorState: payload,
          editorStates: { ...state.editorStates, [state.activeEditorId]: payload },
        };
      }
      return state;

    case 'CLEAR_EDITOR_STATE': {
      const states = { ...state.editorStates };
      delete states[payload];

      return { ...state, editorStates: states };
    }

    case 'ACTIVATE_SELECTED_EDITOR':
      return {
        ...state,
        activeEditorId: payload,
        activeEditorState: state.editorStates[payload],
      };

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
