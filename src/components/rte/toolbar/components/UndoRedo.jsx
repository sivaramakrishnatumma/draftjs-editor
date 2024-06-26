import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function UndoRedo(props) {
  const { onChange } = props;

  const handleUndo = event => {
    event.preventDefault();

    onChange('undo');
  };

  const handleRedo = event => {
    event.preventDefault();

    onChange('redo');
  };

  return (
    <>
      <div className="toolbar-item" onMouseDown={handleUndo} title="Undo" tabIndex="0">
        <FontAwesomeIcon icon={faUndo} />
      </div>

      <div className="toolbar-item" onMouseDown={handleRedo} title="Redo" tabIndex="0">
        <FontAwesomeIcon icon={faRedo} />
      </div>
    </>
  );
}

UndoRedo.propTypes = {
  onChange: PropTypes.func,
};

export default UndoRedo;
