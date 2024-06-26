import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ColorPicker.css';

function ColorPicker(props) {
  const { colors, tooltip, onChange } = props;
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
        <FontAwesomeIcon icon={faPalette} />
      </div>
      <div className={`colors-container ${showPicker ? 'show' : ''}`}>
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-picker__item"
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
  onChange: PropTypes.func,
};

export default ColorPicker;
