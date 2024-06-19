import { useState } from 'react';
import './App.css';
import { EditorProvider, Toolbar, Editor } from './components/rte';

const sampleHTML = `<div><span style="font-weight: bold; font-size: 24pt">dsaf</span></div>`;

function App() {
  // const arr = [1, 2];
  const [value, setValue] = useState(sampleHTML);

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

          <Editor value={value} onChange={handleChange} placeholder="My Rich Text Editor" />

          <Editor placeholder="My Rich Text Editor" />

          <Editor />

          <Editor />
        </EditorProvider>
      </div>
    </div>
  );
}

export default App;
