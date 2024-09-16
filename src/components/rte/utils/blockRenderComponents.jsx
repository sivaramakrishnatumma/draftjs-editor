import { EditorBlock } from 'draft-js';
import camelCase from 'lodash.camelcase';
import { Map } from 'immutable';

/**
 * Block component to render an image.
 *
 * @param {object} props - Component props
 * @param {object} props.contentState - Content state
 * @param {object} props.block - Block object
 * @returns {ReactElement} Block image component
 */
export const Image = props => {
  if (props.block.getEntityAt(0)) {
    const { src, width, height, widthType, heightType } = props.contentState
      .getEntity(props.block.getEntityAt(0))
      .getData();
    const widthStyle = widthType === 'auto' ? 'auto' : `${width}px`;
    const heightStyle = heightType === 'auto' ? 'auto' : `${height}px`;

    return <img src={src} alt="" style={{ width: widthStyle, height: heightStyle, maxWidth: '100%' }} />;
  }
};

/**
 * Component to render a styled block.
 *
 * @param {object} props - Component props
 * @param {object} props.block - Block object
 * @returns {ReactElement} Styled block component
 */
export const StyledBlock = props => {
  const { block } = props;
  const blockData = block.getData();
  let blockStyles = blockData
    .filter((v, k) => v !== 'class' && !['depth', 'listStyles', 'listStart', 'alignment'].includes(k))
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
