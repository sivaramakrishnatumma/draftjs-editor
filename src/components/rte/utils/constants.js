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

export const FONT_SIZES = [
  {
    label: 'Small',
    value: 'small',
    size: '12',
  },
  {
    label: 'Medium',
    value: 'medium',
    size: '16',
  },
  {
    label: 'Large',
    value: 'large',
    size: '24',
  },
];

export const availableFontSizes = (() => {
  return FONT_SIZES.map(font => {
    return { type: `fontSize.${font.size}`, label: font.label };
  });
})();

export const availableColors = (() => {
  const availableColors = [];
  COLORS.forEach(color => {
    availableColors.push({ type: `color.${color}`, color: color });
  });
  return availableColors;
})();
