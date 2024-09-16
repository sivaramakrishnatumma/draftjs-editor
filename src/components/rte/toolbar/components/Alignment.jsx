import PropTypes from 'prop-types';
import AlignmentDropdown from '../common/AlignmentDropdown/AlignmentDropdown';
import { availableAlignments } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';

function Alignment(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const handleAlignmentChange = value => {
    onChange(value);
  };

  const currentBlockType = activeEditorState
    ?.getCurrentContent()
    .getBlockForKey(activeEditorState.getSelection().getStartKey())
    .getData()
    .get('alignment');

  const activeItem = availableAlignments.find(item => currentBlockType === item.alignment);

  let activeOption = activeItem || availableAlignments.find(item => item.alignment === 'left');

  return (
    <AlignmentDropdown
      tooltip="Alignment"
      options={availableAlignments}
      valueKey="alignment"
      displayKey="tooltip"
      activeOption={activeOption}
      onChange={handleAlignmentChange}
      tabIndex="0"
      iconKey="icon"
    />
  );
}

Alignment.propTypes = {
  onChange: PropTypes.func,
};

export default Alignment;
