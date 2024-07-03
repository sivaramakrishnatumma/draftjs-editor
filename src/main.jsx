// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MediaEditorExample } from './components/MediaEditorExample.jsx';
import MyEditor from './components/MyEditor.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <MyEditor />
    <MediaEditorExample />
    <App />
  </>
);
