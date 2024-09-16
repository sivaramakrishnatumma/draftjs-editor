import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AlignmentDropdown.css';

function AlignmentDropdown(props) {
  const {
    placeholder,
    tooltip,
    options,
    displayKey,
    valueKey,
    activeOption,
    style,
    optionStylesFn,
    className,
    onChange,
    iconKey,
  } = props;
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
    <div ref={ref} className={`AlignmentDropdown ${className || ''}`}>
      <div tabIndex="0" title={tooltip || ''} style={style} className="select" onMouseDown={handleDropdownClick}>
        {iconKey && activeOption && activeOption[iconKey] ? (
          <FontAwesomeIcon icon={activeOption[iconKey]} />
        ) : (
          (activeOption && activeOption[displayKey]) || placeholder
        )}
        <i className={`arrow ${showOptions ? 'up' : 'down'}`}></i>
      </div>
      <div className={`options ${showOptions ? 'show' : ''}`}>
        {options.map(option => (
          <div
            tabIndex="0"
            key={option[valueKey]}
            title={option.tooltip || ''}
            className={`option ${activeOption && activeOption[valueKey] === option[valueKey] ? 'selected' : ''}`}
            onMouseDown={e => handleMouseDown(e, option)}
            style={optionStylesFn && optionStylesFn(option, displayKey)}
          >
            {iconKey && option[iconKey] ? <FontAwesomeIcon icon={option[iconKey]} /> : option[displayKey]}
          </div>
        ))}
      </div>
    </div>
  );
}

AlignmentDropdown.propTypes = {
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  displayKey: PropTypes.string,
  valueKey: PropTypes.string,
  activeOption: PropTypes.object,
  style: PropTypes.object,
  optionStylesFn: PropTypes.func,
  className: PropTypes.string,
  onChange: PropTypes.func,
  iconKey: PropTypes.string,
};

export default AlignmentDropdown;
