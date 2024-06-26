import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import './BaseDropdown.css';

function BaseDropdown(props) {
  const { placeholder, tooltip, options, displayKey, valueKey, activeOption, onChange } = props;
  const ref = useRef();

  const [showOptions, setShowOptions] = useState(false);

  useOnClickOutside(ref, () => {
    if (showOptions) {
      setShowOptions(false);
    }
  });

  const handleMouseDown = (event, option) => {
    event.preventDefault();

    onChange(option[valueKey]);
    setShowOptions(!showOptions);
  };

  const handleDropdownClick = event => {
    event.preventDefault();
    setShowOptions(!showOptions);
  };

  return (
    <div ref={ref} className="dropdown">
      <div className="select" onMouseDown={handleDropdownClick} title={tooltip || ''} tabIndex="0">
        {(activeOption && activeOption[displayKey]) || placeholder}{' '}
        <i className={`arrow ${showOptions ? 'up' : 'down'}`}></i>
      </div>
      <div className={`options ${showOptions ? 'show' : ''}`}>
        {options.map(option => (
          <div
            key={option[valueKey]}
            className={`option ${activeOption && activeOption[displayKey] === option[displayKey] ? 'selected' : ''}`}
            onMouseDown={e => handleMouseDown(e, option)}
            tabIndex="0"
          >
            {option[displayKey]}
          </div>
        ))}
      </div>
    </div>
  );
}

BaseDropdown.propTypes = {
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  displayKey: PropTypes.string,
  valueKey: PropTypes.string,
  activeOption: PropTypes.object,
  onChange: PropTypes.func,
};

export default BaseDropdown;
