/* eslint-disable react/prop-types */
// this component is used to render most Draft block types in the editor,

import { EditorBlock } from 'draft-js';
import camelCase from 'lodash.camelcase';
import { Map } from 'immutable';

// such as paragraph, unstyled, and the six heading levels
export const StyledBlock = props => {
  const { block } = props;
  let blockStyles = block
    .getData()
    .filter((v, k) => v !== 'class' && !['depth', 'listStyles', 'listStart'].includes(k))
    .reduce((styles, v, k) => {
      return styles.set(camelCase(k), v);
    }, Map());
  if (block.getDepth()) {
    blockStyles = blockStyles.set('marginLeft', `${block.getDepth() * 2.5}em`);
  }
  return (
    <div style={blockStyles.toJS()}>
      <EditorBlock {...props} />
    </div>
  );
};
