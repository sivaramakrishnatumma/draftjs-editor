import { useRef, useState } from 'react';
import './App.css';
import { EditorProvider, Toolbar, Editor } from './components/rte';

const sampleHTML = `<div style="text-align: center;"><span style="font-weight: bold; font-style: italic">dsaf</span></div>`;

function App() {
  // const arr = [1, 2];
  const [value, setValue] = useState('');
  const editorRef = useRef();

  const handleAddblank = () => {
    editorRef.current.insertBlank();
  };

  const handleChange = htmlText => {
    console.log('htmlText::', htmlText);
    setValue(htmlText);
  };

  return (
    <div className="app">
      <div>
        <EditorProvider>
          <Toolbar />

          {/* {arr.map(item => (
            <Editor key={item} />
          ))} */}

          <Editor ref={editorRef} value={value} onChange={handleChange} placeholder="My Rich Text Editor" />

          {/* <Editor placeholder="My Rich Text Editor" />

          <Editor /> */}

          {/* <Editor /> */}
          <button onClick={handleAddblank}>Add blank</button>
        </EditorProvider>
      </div>
    </div>
  );
}

export default App;
