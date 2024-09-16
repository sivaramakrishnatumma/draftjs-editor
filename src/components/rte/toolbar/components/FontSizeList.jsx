import PropTypes from 'prop-types';
import BaseDropdown from '../common/BaseDropdown/BaseDropdown';
import { availableFontSizes } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';

/**
 * FontSizeList component
 *
 * @param {Function} onChange - Callback function to handle changes
 */
function FontSizeList({ onChange }) {
  const { activeEditorState } = useEditorContext();

  /**
   * Get the active font size from the editor state
   */
  const activeItem = activeEditorState
    ?.getCurrentInlineStyle()
    .filter(style => style.includes('-') && style.split('-')[0] === availableFontSizes[0].type.split('-')[0])
    .toList()
    .get(0);

  /**
   * Get the active font size option
   */
  const activeOption =
    availableFontSizes.find(family => family.type === activeItem) ||
    availableFontSizes.find(family => family.label === 12);

  return (
    <BaseDropdown
      tooltip="Font Size"
      options={availableFontSizes}
      valueKey="type"
      displayKey="label"
      activeOption={activeOption}
      onChange={onChange}
      tabIndex="0"
    />
  );
}

FontSizeList.propTypes = {
  onChange: PropTypes.func,
};

export default FontSizeList;
