import PropTypes from 'prop-types';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import { availableBackgroundColors } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';
import { getHexaCode } from '../../utils/helpers';

/**
 * BackgroundColorPickerPopup component
 *
 * @param {Function} onChange - Callback function to handle color changes
 */
function BackgroundColorPickerPopup({ onChange }) {
  const { activeEditorState } = useEditorContext();

  /**
   * Gets the active item from the editor state
   *
   * @returns {string|null} The active item or null if none is found
   */
  const getActiveItem = () => {
    return activeEditorState
      ?.getCurrentInlineStyle()
      .filter(style => style.includes('-') && style.split('-')[0] === availableBackgroundColors[0].type.split('-')[0])
      .toList()
      .get(0);
  };

  /**
   * Gets the active option from the available background colors
   *
   * @returns {object|null} The active option or null if none is found
   */
  const getActiveOption = () => {
    const activeItem = getActiveItem();
    if (!activeItem) return null;

    const color = getHexaCode(activeItem.split('-')[1]);
    return availableBackgroundColors.find(bgColor => bgColor.color.toLowerCase() === color.toLowerCase());
  };

  return (
    <ColorPicker
      tabIndex="0"
      colors={availableBackgroundColors}
      tooltip="Highlight Color"
      icon={faFillDrip}
      activeOption={getActiveOption()}
      onChange={onChange}
    />
  );
}

BackgroundColorPickerPopup.propTypes = {
  onChange: PropTypes.func,
};

export default BackgroundColorPickerPopup;
