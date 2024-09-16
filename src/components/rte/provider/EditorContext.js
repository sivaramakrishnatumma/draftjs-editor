import { createContext, useContext } from 'react';

/**
 * Creates a context for the Editor component.
 */
const EditorContext = createContext(undefined);

/**
 * Hook to access the Editor context.
 *
 * @throws {Error} If used outside of an EditorProvider.
 * @returns {object} The Editor context.
 */
export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error('useEditorContext must be used within a EditorProvider');
  }

  return context;
};

export default EditorContext;
