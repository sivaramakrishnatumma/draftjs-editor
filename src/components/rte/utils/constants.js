import { faAlignCenter, faAlignLeft, faAlignRight, faIndent, faOutdent } from '@fortawesome/free-solid-svg-icons';

export const MAX_INDENT_DEPTH = 6;
export const MAX_LIST_DEPTH = 4;
export const defaultPreTagStyling = [
  ['padding', '9.5px'],
  ['margin', '0 0 10px'],
  ['border', '1px solid rgb(204, 204, 204)'],
  ['background', 'rgb(245, 245, 245)'],
];

export const COLORS = [
  '#000000',
  '#FFFFFF',
  '#888888',
  '#AAAAAA',
  '#EEEEEE',
  '#880000',
  '#CC0000',
  '#FF0000',
  '#FFCCCC',
  '#FF8800',
  '#FFCC00',
  '#FFFF00',
  '#CCFF00',
  '#88FF00',
  '#008800',
  '#00CC00',
  '#00CC88',
  '#00CCCC',
  '#CCEEFF',
  '#00CCFF',
  '#0088FF',
  '#0000FF',
  '#8800FF',
  '#CC00CC',
  '#CC0088',
];

export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 36];

export const availableFontSizes = (() => {
  return FONT_SIZES.map(size => {
    return { type: `fontSize.${size}`, label: size };
  }).concat({ type: 'fontSize.unset', label: 'reset' });
})();

export const availableColors = (() => {
  const availableColors = [];
  COLORS.forEach(color => {
    availableColors.push({ type: `color.${color}`, color: color });
  });
  return availableColors;
})();

export const availableAlignments = [
  { alignment: 'left', icon: faAlignLeft, tooltip: 'Align Left' },
  { alignment: 'center', icon: faAlignCenter, tooltip: 'Align Center' },
  { alignment: 'right', icon: faAlignRight, tooltip: 'Align Right' },
  // { type: 'justify', icon: 'align-justify-sld'  },
];

export const availableIndents = [
  {
    direction: 'INDENT',
    icon: faIndent,
    tooltip: 'Increase Indent',
  },
  {
    direction: 'OUTDENT',
    icon: faOutdent,
    tooltip: 'Decrease Indent',
  },
];
