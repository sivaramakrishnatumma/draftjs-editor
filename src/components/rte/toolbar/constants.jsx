import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faUnderline, faItalic } from '@fortawesome/free-solid-svg-icons';

const inlineStyles = [
  {
    label: 'bold',
    style: 'BOLD',
    icon: <FontAwesomeIcon icon={faBold} />,
    tooltip: 'Bold',
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <FontAwesomeIcon icon={faItalic} />,
    tooltip: 'Italic',
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    icon: <FontAwesomeIcon icon={faUnderline} />,
    tooltip: 'Underline',
  },
];

export { inlineStyles };
