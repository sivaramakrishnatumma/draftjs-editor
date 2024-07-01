import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faListOl } from '@fortawesome/free-solid-svg-icons';
import { useEditorContext } from '../../provider/EditorContext';

const availableListTypes = [
  { type: 'unordered-list-item', icon: faListUl, tooltip: 'Bullet List' },
  { type: 'ordered-list-item', icon: faListOl, tooltip: 'Number List' },
];

function ListType(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const currentBlockType = activeEditorState
    ?.getCurrentContent()
    .getBlockForKey(activeEditorState.getSelection().getStartKey())
    .getType();

  const handleListTypeSelection = event => {
    event.preventDefault();

    const listType = event.currentTarget.getAttribute('data-list-type');
    onChange(listType);
  };

  return availableListTypes.map(item => (
    <div
      key={item.type}
      data-list-type={item.type}
      className={`toolbar-item ${currentBlockType === item.type ? 'active' : ''}`}
      onMouseDown={handleListTypeSelection}
      title={item.tooltip}
      tabIndex="0"
    >
      <FontAwesomeIcon icon={item.icon} />
    </div>
  ));
}

ListType.propTypes = {
  onChange: PropTypes.func,
};

export default ListType;
