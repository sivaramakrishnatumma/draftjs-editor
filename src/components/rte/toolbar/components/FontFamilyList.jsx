import PropTypes from 'prop-types';
import { availableFontFamilies } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';
import BaseDropdown from '../common/BaseDropdown/BaseDropdown';

/**
 * FontFamilyList component
 *
 * @param {Function} onChange - Callback function to handle changes
 */
function FontFamilyList({ onChange }) {
  const { activeEditorState } = useEditorContext();

  /**
   * Get the active font family from the editor state
   */
  const activeItem = activeEditorState
    ?.getCurrentInlineStyle()
    .filter(style => style.includes('-') && style.split('-')[0] === availableFontFamilies[0].type.split('-')[0])
    .toList()
    .get(0);

  /**
   * Get the active font family option
   */
  const activeOption =
    availableFontFamilies.find(family => family.type === activeItem) ||
    availableFontFamilies.find(family => family.label === 'Helvetica');

  /**
   * Define the style for the dropdown
   */
  const style = { fontFamily: activeOption ? activeOption.label : 'inherit', width: '135px' };
  return (
    <BaseDropdown
      tabIndex="0"
      tooltip="Font Family"
      options={availableFontFamilies}
      valueKey="type"
      displayKey="label"
      activeOption={activeOption}
      onChange={onChange}
      style={style}
      optionStylesFn={(option, displayKey) => ({ fontFamily: option[displayKey] })}
    />
  );
}

FontFamilyList.propTypes = {
  onChange: PropTypes.func,
};

export default FontFamilyList;
