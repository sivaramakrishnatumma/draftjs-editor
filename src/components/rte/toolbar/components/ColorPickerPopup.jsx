import PropTypes from 'prop-types';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import { availableColors } from '../../utils/constants';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { useEditorContext } from '../../provider/EditorContext';

function ColorPickerPopup(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const handleChange = value => {
    onChange(value);
  };

  const activeItem = activeEditorState
    ?.getCurrentInlineStyle()
    .filter(style => style.includes('.') && style.split('.')[0] === availableColors[0].type.split('.')[0]) // compound styles are dot-delimited e.g. fontFamily.Arial
    .toList()
    .get(0);

  let activeOption = availableColors.find(color => color.type === activeItem);

  return (
    <ColorPicker
      tabindex="0"
      colors={availableColors}
      tooltip="Font Color"
      icon={faFont}
      activeOption={activeOption}
      onChange={handleChange}
    />
  );
}

ColorPickerPopup.propTypes = {
  onChange: PropTypes.func,
};

export default ColorPickerPopup;
