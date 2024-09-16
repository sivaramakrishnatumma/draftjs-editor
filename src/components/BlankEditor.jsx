/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  CompositeDecorator,
  ContentState,
  EditorState,
  Editor,
  Modifier,
  SelectionState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
} from 'draft-js';
import { v4 as uuidv4 } from 'uuid';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';

// Strategy to find the blank entities
const findBlankEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
  }, callback);
};

// Component to render blank entities
const BlankSpan = props => {
  const entityKey = props.entityKey;
  const contentState = props.contentState;
  const entity = contentState.getEntity(entityKey);
  const { number, key } = entity.getData();

  return (
    <span style={{ backgroundColor: 'yellow' }} data-key={key}>
      [{number}] {props.children}
    </span>
  );
};

// Create a decorator
const decorator = new CompositeDecorator([
  {
    strategy: findBlankEntities,
    component: BlankSpan,
  },
]);

const MyEditor = () => {
  const defaultText = 'This is a ___ example of a fill in the blank question.';
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(createContentStateWithBlanks(defaultText), decorator)
  );

  const handleEditorChange = state => {
    setEditorState(updateBlankNumbers(state));
  };

  const keyBindingFn = e => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === 'b') {
      return 'insert-blank';
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, state) => {
    if (command === 'insert-blank') {
      insertBlank();
      return 'handled';
    }
    return 'not-handled';
  };

  const insertBlank = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const currentBlanksCount = getBlankCount(editorState);

    const contentStateWithEntity = contentState.createEntity('BLANK', 'IMMUTABLE', {
      number: currentBlanksCount + 1,
      key: uuidv4(),
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.insertText(contentState, selectionState, '___', null, entityKey);
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(updateBlankNumbers(newEditorState));
  };

  const getBlankCount = state => {
    const contentState = state.getCurrentContent();
    let count = 0;

    contentState.getBlockMap().forEach(block => {
      block.findEntityRanges(
        character => {
          const entityKey = character.getEntity();
          return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
        },
        () => {
          count++;
        }
      );
    });

    return count;
  };

  const updateBlankNumbers = state => {
    const contentState = state.getCurrentContent();
    let newContentState = contentState;
    let blankNumber = 1;

    contentState.getBlockMap().forEach(block => {
      block.findEntityRanges(
        character => {
          const entityKey = character.getEntity();
          return entityKey !== null && contentState.getEntity(entityKey).getType() === 'BLANK';
        },
        (start, end) => {
          const entityKey = block.getEntityAt(start);
          if (entityKey) {
            newContentState = newContentState.mergeEntityData(entityKey, { number: blankNumber });
            blankNumber++;
          }
        }
      );
    });

    return EditorState.set(state, { currentContent: newContentState });
  };

  const getContentAsHTML = () => {
    const contentState = editorState.getCurrentContent();
    const options = {
      entityStyleFn: entity => {
        const entityType = entity.getType().toLowerCase();
        console.log('entityStyleFn', entityType);
        if (entityType === 'blank') {
          const { number, key } = entity.getData();
          return {
            element: 'span',
            attributes: {
              'data-key': key,
              style: 'background-color: yellow;',
            },
            style: {
              backgroundColor: 'yellow',
            },
          };
        }
      },
      defaultBlockTag: 'div',
    };
    return stateToHTML(contentState, options);
  };

  return (
    <div>
      <button onClick={insertBlank}>Insert Blank</button>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
      />
      <div>
        <h3>Output HTML:</h3>
        <div dangerouslySetInnerHTML={{ __html: getContentAsHTML() }} />
      </div>
    </div>
  );
};

const createContentStateWithBlanks = text => {
  let contentState = ContentState.createFromText(text);
  const regex = /___/g;
  let match;
  let blankNumber = 1;

  contentState.getBlockMap().forEach(block => {
    let blockText = block.getText();
    while ((match = regex.exec(blockText)) !== null) {
      const selection = SelectionState.createEmpty(block.getKey()).merge({
        anchorOffset: match.index,
        focusOffset: match.index + match[0].length,
      });

      contentState = contentState.createEntity('BLANK', 'IMMUTABLE', { number: blankNumber, key: uuidv4() });
      const entityKey = contentState.getLastCreatedEntityKey();

      contentState = Modifier.replaceText(contentState, selection, match[0], null, entityKey);

      blankNumber++;
    }
  });

  return contentState;
};

export default MyEditor;
