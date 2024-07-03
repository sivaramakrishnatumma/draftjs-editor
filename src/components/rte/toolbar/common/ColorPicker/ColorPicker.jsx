import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ColorPicker.css';

function ColorPicker(props) {
  const { colors, tooltip, icon, activeOption, onChange } = props;
  const ref = useRef();

  const [showPicker, setShowPicker] = useState();

  useOnClickOutside(ref, () => {
    if (showPicker) {
      setShowPicker(false);
    }
  });

  const handlePickerClick = event => {
    event.preventDefault();

    setShowPicker(!showPicker);
  };

  const handleColorSelection = (event, type) => {
    event.preventDefault();
    setShowPicker(false);

    onChange(type);
  };

  return (
    <div ref={ref} className="color-picker" tabIndex="0">
      <div className="toolbar-item picker-icon" onMouseDown={handlePickerClick} title={tooltip}>
        <FontAwesomeIcon icon={icon} />
        <div className="line" style={{ backgroundColor: activeOption?.color }}></div>
      </div>
      <div className={`colors-container ${showPicker ? 'show' : ''}`}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-picker__item ${activeOption?.color === color.color ? 'selected' : ''}`}
            style={{ backgroundColor: color.color }}
            onMouseDown={event => handleColorSelection(event, color.type)}
            tabIndex="0"
          />
        ))}
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  tooltip: PropTypes.string,
  icon: PropTypes.object.isRequired,
  activeOption: PropTypes.object,
  onChange: PropTypes.func,
};

export default ColorPicker;
