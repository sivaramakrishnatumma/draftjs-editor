/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import React from 'react';

const Image = props => {
  return <img src={props.src} style={styles.media} />;
};

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'image') {
    media = <Image src={src} />;
  }

  return media;
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
};

export class MediaEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      url: '',
      urlType: '',
    };

    // eslint-disable-next-line react/no-string-refs
    this.focus = () => this.refs.editor.focus();
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.onChange = editorState => this.setState({ editorState });
    this.onURLChange = e => this.setState({ urlValue: e.target.value });

    this.addImage = this._addImage.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    this.setState(
      {
        // The third parameter here is a space string, not an empty string
        // If you set an empty string, you will get an error: Unknown DraftEntity key: null
        editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
        showURLInput: false,
        urlValue: '',
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _promptForMedia(type) {
    this.setState(
      {
        showURLInput: true,
        urlValue: '',
        urlType: type,
      },
      () => {
        // eslint-disable-next-line react/no-string-refs
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  }

  _addImage() {
    this._promptForMedia('image');
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            // eslint-disable-next-line react/no-string-refs
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
        </div>
      );
    }

    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>Use the buttons to add image.</div>
        <div style={styles.buttons}>
          <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
            Add Image
          </button>
        </div>
        {urlInput}
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Enter some text..."
            // eslint-disable-next-line react/no-string-refs
            ref="editor"
          />
        </div>
        <input onClick={this.logState} style={styles.button} type="button" value="Log State" />
      </div>
    );
  }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}
