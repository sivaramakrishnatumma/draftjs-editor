import { createContext, useContext } from 'react';

const EditorContext = createContext(undefined);

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error('useEditorContext must be used within a EditorProvider');
  }

  return context;
};

export default EditorContext;
