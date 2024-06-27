import PropTypes from 'prop-types';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import { availableColors } from '../../utils/constants';

function ColorPickerPopup(props) {
  const { onChange } = props;

  const handleChange = value => {
    onChange(value);
  };

  return <ColorPicker colors={availableColors} tooltip="Font Color" onChange={handleChange} tabindex="0" />;
}

ColorPickerPopup.propTypes = {
  onChange: PropTypes.func,
};

export default ColorPickerPopup;
