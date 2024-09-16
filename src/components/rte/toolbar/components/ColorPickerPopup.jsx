import PropTypes from 'prop-types';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import { availableColors } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';
import { getHexaCode } from '../../utils/helpers';

/**
 * ColorPickerPopup component
 *
 * @param {function} onChange - Callback function to handle color changes
 */
function ColorPickerPopup({ onChange }) {
  const { activeEditorState } = useEditorContext();

  /**
   * Gets the active item from the editor state
   *
   * @returns {string|null} The active item or null if none is found
   */
  const getActiveItem = () => {
    return activeEditorState
      ?.getCurrentInlineStyle()
      .filter(style => style.includes('-') && style.split('-')[0] === availableColors[0].type.split('-')[0])
      .toList()
      .get(0);
  };

  /**
   * Gets the active option from the available colors
   *
   * @returns {object|null} The active option or null if none is found
   */
  const getActiveOption = () => {
    const activeItem = getActiveItem();
    if (!activeItem) return null;

    const color = getHexaCode(activeItem.split('-')[1]);
    return availableColors.find(bgColor => bgColor.color.toLowerCase() === color.toLowerCase());
  };

  return (
    <ColorPicker
      tabIndex="0"
      colors={availableColors}
      tooltip="Font Color"
      icon={faFont}
      activeOption={getActiveOption()}
      onChange={onChange}
    />
  );
}

ColorPickerPopup.propTypes = {
  onChange: PropTypes.func,
};

export default ColorPickerPopup;
