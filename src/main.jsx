// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { MediaEditorExample } from './components/MediaEditorExample.jsx';
// import MyEditor from './components/MyEditor.jsx';
import MyBlankEditor from './components/BlankEditor.jsx';
import MyDraftPluginEditor from './components/DraftPluginEditor.jsx';
import MyNewEditor from './components/new/NewEditor.jsx';
import PrintComponent from './components/PrintComponent';
import { Editor, EditorProvider } from './components/rte/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <MyBlankEditor /> */}
    {/* <MyDraftPluginEditor /> */}
    {/* <MyEditor />
    <MediaEditorExample /> */}
    <App />
    {/* <MyNewEditor /> */}
    {/* <PrintComponent /> */}
  </>
);
