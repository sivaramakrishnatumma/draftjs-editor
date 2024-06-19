import PropTypes from 'prop-types';
import BaseDropdown from '../common/BaseDropdown/BaseDropdown';
import { availableFontSizes } from '../../utils/constants';

function FontSizeList(props) {
  const { onChange } = props;

  const handleFontSizeChange = value => {
    console.log('value::', value);
    onChange(value);
  };

  return (
    <BaseDropdown
      placeholder="Size"
      options={availableFontSizes}
      valueKey="type"
      displayKey="label"
      onChange={handleFontSizeChange}
    />
  );
}

FontSizeList.propTypes = {
  onChange: PropTypes.func,
};

export default FontSizeList;
