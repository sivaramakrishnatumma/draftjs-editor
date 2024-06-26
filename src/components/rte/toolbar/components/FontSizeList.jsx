import PropTypes from 'prop-types';
import BaseDropdown from '../common/BaseDropdown/BaseDropdown';
import { availableFontSizes } from '../../utils/constants';
import { useEditorContext } from '../../provider/EditorContext';

function FontSizeList(props) {
  const { onChange } = props;
  const { activeEditorState } = useEditorContext();

  const handleFontSizeChange = value => {
    onChange(value);
  };

  const activeItem = activeEditorState
    ?.getCurrentInlineStyle()
    .filter(style => style.includes('.') && style.split('.')[0] === availableFontSizes[0].type.split('.')[0]) // compound styles are dot-delimited e.g. fontFamily.Arial
    .toList()
    .get(0);

  let activeOption = availableFontSizes.find(size => size.type === activeItem);

  if (!activeOption) {
    activeOption = availableFontSizes.find(size => size.label === 12);
  }

  return (
    <BaseDropdown
      tooltip="Font Size"
      options={availableFontSizes}
      valueKey="type"
      displayKey="label"
      activeOption={activeOption}
      onChange={handleFontSizeChange}
      tabIndex="0"
    />
  );
}

FontSizeList.propTypes = {
  onChange: PropTypes.func,
};

export default FontSizeList;
