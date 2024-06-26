import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { availableIndents } from '../../utils/constants';

function Indent(props) {
  const { onChange } = props;

  const handleIndent = (event, indent) => {
    event.preventDefault();

    onChange(indent.direction);
  };

  return (
    <>
      {availableIndents.map(indent => (
        <div
          key={indent.direction}
          className="toolbar-item"
          onMouseDown={event => handleIndent(event, indent)}
          title={indent.tooltip}
          tabIndex="0"
        >
          <FontAwesomeIcon icon={indent.icon} />
        </div>
      ))}
    </>
  );
}

Indent.propTypes = {
  onChange: PropTypes.func,
};

export default Indent;
