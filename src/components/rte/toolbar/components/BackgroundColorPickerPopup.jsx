import PropTypes from 'prop-types';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import { availableBackgroundColors } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';

function BackgroundColorPickerPopup(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const handleChange = value => {
    onChange(value);
  };

  const activeItem = activeEditorState
    ?.getCurrentInlineStyle()
    .filter(style => style.includes('.') && style.split('.')[0] === availableBackgroundColors[0].type.split('.')[0]) // compound styles are dot-delimited e.g. fontFamily.Arial
    .toList()
    .get(0);

  let activeOption = availableBackgroundColors.find(color => color.type === activeItem);

  return (
    <ColorPicker
      tabindex="0"
      colors={availableBackgroundColors}
      tooltip="Highlight Color"
      icon={faFillDrip}
      activeOption={activeOption}
      onChange={handleChange}
    />
  );
}

BackgroundColorPickerPopup.propTypes = {
  onChange: PropTypes.func,
};

export default BackgroundColorPickerPopup;
