import { Component } from 'react';
import { Editor, EditorState, Modifier, CompositeDecorator } from 'draft-js';
import 'draft-js/dist/Draft.css';

// Component to render the image
const Image = props => {
  // eslint-disable-next-line react/prop-types
  const { src } = props.contentState.getEntity(props.entityKey).getData();
  return <img src={src} style={{ width: '50px', height: '50px' }} alt="inline" />;
};

// Strategy to find image entities
const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
  }, callback);
};

// Create a decorator
const decorator = new CompositeDecorator([
  {
    strategy: findImageEntities,
    component: Image,
  },
]);

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    };

    this.onChange = editorState => this.setState({ editorState });
    this.addImageInline = this.addImageInline.bind(this);
  }

  addImageInline(url) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selectionState = editorState.getSelection();

    const contentStateWithText = Modifier.insertText(contentState, selectionState, ' ', null, entityKey);

    const newEditorState = EditorState.push(editorState, contentStateWithText, 'insert-characters');
    this.onChange(newEditorState);
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.addImageInline('http://media.pearsoncmg.com/alt/myspanishlab/arriba6e/images/ch03/A03-07L.jpg')
          }
        >
          Add Inline Image
        </button>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

export default MyEditor;
