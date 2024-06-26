import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { availableAlignments } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';

function Alignment(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const currentBlockType = activeEditorState
    ?.getCurrentContent()
    .getBlockForKey(activeEditorState.getSelection().getStartKey())
    .getType();

  const handleAlignmentSelection = event => {
    event.preventDefault();

    const alignment = event.currentTarget.getAttribute('data-alignment');
    onChange(alignment);
  };

  return availableAlignments.map(item => (
    <div
      key={item.alignment}
      data-alignment={`${item.alignment}-align`}
      className={`toolbar-item ${currentBlockType === item.alignment + '-align' ? 'active' : ''}`}
      onMouseDown={handleAlignmentSelection}
      title={item.tooltip}
      tabIndex="0"
    >
      <FontAwesomeIcon icon={item.icon} />
    </div>
  ));
}

Alignment.propTypes = {
  onChange: PropTypes.func,
};

export default Alignment;
