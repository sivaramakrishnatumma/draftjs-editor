// Component to render blank entities
export const BlankButton = props => {
  const { entityKey, contentState } = props;
  const { number } = contentState.getEntity(entityKey).getData();

  return (
    <button className="blank-button">
      {String.fromCharCode(65 + number - 1)}.{props.children}
    </button>
  );
};

// Component to render the inline image
export const InlineImage = props => {
  const { entityKey, contentState } = props;
  let { src, width, height, widthType, heightType } = contentState.getEntity(entityKey).getData();
  width = widthType === 'auto' ? 'auto' : width + 'px';
  height = heightType === 'auto' ? 'auto' : height + 'px';
  return <img src={src} style={{ width, height, maxWidth: '100%' }} alt="inline" />;
};
