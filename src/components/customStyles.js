export const styleMap = {
  FONT_SIZE_8: { fontSize: '8px' },
  FONT_SIZE_10: { fontSize: '10px' },
  FONT_SIZE_12: { fontSize: '12px' },
  FONT_SIZE_14: { fontSize: '14px' },
  FONT_SIZE_16: { fontSize: '16px' },
  FONT_SIZE_18: { fontSize: '18px' },
  FONT_SIZE_24: { fontSize: '24px' },
  FONT_SIZE_30: { fontSize: '30px' },
  FONT_SIZE_36: { fontSize: '36px' },
  FONT_SIZE_48: { fontSize: '48px' },
  FONT_FAMILY_Arial: { fontFamily: 'Arial' },
  FONT_FAMILY_Georgia: { fontFamily: 'Georgia' },
  FONT_FAMILY_Impact: { fontFamily: 'Impact' },
  FONT_FAMILY_Tahoma: { fontFamily: 'Tahoma' },
  'FONT_FAMILY_Times New Roman': { fontFamily: 'Times New Roman' },
  FONT_FAMILY_Verdana: { fontFamily: 'Verdana' },
};

export const customStyleFn = style => {
  const styles = {};
  style.forEach(value => {
    if (value.startsWith('FONT_SIZE_')) {
      styles.fontSize = value.split('_')[2] + 'px';
    }
    if (value.startsWith('FONT_FAMILY_')) {
      styles.fontFamily = value.split('_')[2];
    }
    if (value.startsWith('COLOR_')) {
      styles.color = value.split('_')[1];
    }
    if (value.startsWith('BACKGROUND_COLOR_')) {
      styles.backgroundColor = value.split('_')[2];
    }
  });
  return styles;
};

export const getBlockStyle = block => {
  switch (block.getType()) {
    case 'left':
      return 'align-left';
    case 'center':
      return 'align-center';
    case 'right':
      return 'align-right';
    case 'justify':
      return 'align-justify';
    default:
      return null;
  }
};
