import PropTypes from 'prop-types';
import { availableAlignments } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Alignment(props) {
  const { onChange } = props;

  const handleAlignmentSelection = event => {
    event.preventDefault();

    const alignment = event.currentTarget.getAttribute('data-alignment');
    onChange(alignment);
  };

  return availableAlignments.map(item => (
    <div
      key={item.alignment}
      data-alignment={item.alignment}
      className={`toolbar-item`}
      onMouseDown={handleAlignmentSelection}
      title={item.tooltip}
      tabIndex="0"
    >
      <FontAwesomeIcon icon={item.icon} />
    </div>
  ));
}

Alignment.propTypes = {
  onChange: PropTypes.func,
};

export default Alignment;
