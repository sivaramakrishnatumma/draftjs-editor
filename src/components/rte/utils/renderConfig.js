import { DefaultDraftInlineStyle } from 'draft-js';
import { Map, OrderedSet } from 'immutable';
import camelCase from 'lodash.camelcase';
import isEmpty from 'lodash.isempty';
import { COLORS, FONT_SIZES, MAX_LIST_DEPTH, defaultPreTagStyling } from './constants';
import { buildHtmlForBlockText, convertStyleStringToObject, getClassesAndStyles } from './helpers';
import { StyledBlock } from './blockRenderComponents';

export const customStyleMap = (() => {
  const styleMap = { ...DefaultDraftInlineStyle };
  COLORS.forEach(color => {
    styleMap[`color.${color}`] = { color: color };
  });
  // FONTS.forEach(font => {
  //   styleMap[`fontFamily.${font}`] = { fontFamily: font };
  // });
  FONT_SIZES.forEach(font => {
    styleMap[`fontSize.${font.size}`] = { fontSize: `${font.size}pt` };
  });
  return styleMap;
})();

// this is for handling inline styles, including draft's default styles, styles from the customStyleMap, and those from the style attribute of the html
export const customStyleFn = style => {
  // "style" is an Immutable.js OrderedSet of inline styles for a given range of characters that share the same styling

  // handle draftjs default styles
  const defaultStyles = style.intersect(['BOLD', 'CODE', 'ITALIC', 'UNDERLINE']).reduce((map, v) => {
    return map.merge(customStyleMap[v]);
  }, Map());

  style = style.subtract(['BOLD', 'CODE', 'ITALIC', 'UNDERLINE']);

  // separate out any entries that are a string of multiple styles
  let groupedStyles = style.filter(v => v.includes(':'));
  style = style.subtract(groupedStyles);

  // convert string containing multiple styles to a CSS styles object
  groupedStyles = groupedStyles.reduce((map, v) => {
    v = convertStyleStringToObject(v);
    v = Map(v).mapKeys(k => camelCase(k));
    return map.merge(v);
  }, Map());

  // convert style strings with single style to CSS styles objects and merge with groupedStyles
  style = style
    .map(v => v.split('.'))
    .filter(v => v.every(vv => vv.length))
    .reduce((map, v) => {
      const key = v.shift().trim();
      const val = v.join('.').trim();
      return map.merge({ [key]: val });
    }, groupedStyles.merge(defaultStyles))
    .toJS();

  if (isEmpty(style)) {
    return null;
  }
  return style;
};

export const getBlockRendererFn = (editor, getEditorState, onChange) => block => {
  const type = block.getType();
  switch (type) {
    case 'atomic':
      return {
        component: Image,
        editable: false,
        props: {
          editor,
          getEditorState,
          onChange,
        },
      };
    // case 'horizontal-rule':
    //   return {
    //     component: HorizontalRule,
    //   };
    // case 'page-break':
    //   return {
    //     component: Pagebreak,
    //   };
    // case 'pasted-list-item':
    //   return {
    //     component: ListItem,
    //     editable: true,
    //   };
    case 'unstyled':
      // case 'paragraph':
      // case 'header-one':
      // case 'header-two':
      // case 'header-three':
      // case 'header-four':
      // case 'header-five':
      // case 'header-six':
      // case 'code-block':
      return {
        component: StyledBlock,
        editable: true,
      };
    // case 'table':
    //   return {
    //     component: Table,
    //     editable: true,
    //     props: {
    //       editor,
    //     },
    //   };
    default:
      return null;
  }
};

/**
 * blockRenderMap, customStyleMap, customStyleFn & getBlockRendererFn are used by draft.js to convert its internal data structure
 * into html for display in the editor's content-editable area.
 */
export const blockRenderMap = {
  unstyled: {
    element: 'div',
  },
  // using section tag for paragraph block type because Draftjs inserts extra divs within the content, resulting in
  // a validateDOMNesting warning if p tag is used (<div> cannot be a descendant of <p>).
  // This is only used while content is displayed in the editor. When the paragraph block type
  // is exported to formLinker a <p> tag is used, as provided in the getStateToHtmlOptions function below.
  paragraph: {
    element: 'section',
  },
  // pasted-list-item is used for ul/ol lists that were pasted into the editor from another source, e.g. google docs
  // and thus are formatted differently than natively created lists
  'pasted-list-item': {
    element: 'ol',
  },
  table: {
    element: 'div',
  },
};

/**
 * function receives contentState from a draft.js instance and returns a set of helper functions
 * used to convert draft.js internal state into html for export outside of draft.js.
 */
export const getStateToHtmlOptions = contentState => ({
  /**
   * NOTE: the rich text editor relies on the following styles for ordered lists. For ordered list numbering to display correctly
   * these styles should be included in the style tag or style sheet of any document that includes content from the rich text editor:
   * .ordered-list-item:before { left: -36px; position: absolute; text-align: right; width: 30px; }
   * .ordered-list-item:before { content: counter(ol0) ". "; counter-increment: ol0; }
   * .ordered-list-item.depth1:before { content: counter(ol1, lower-alpha) ") "; counter-increment: ol1; }
   * .ordered-list-item.depth2:before { content: counter(ol2, lower-roman) ". "; counter-increment: ol2; }
   * .ordered-list-item.depth3:before { content: counter(ol3, upper-alpha) ". "; counter-increment: ol3; }
   * .ordered-list-item.depth4:before { content: counter(ol4) ". "; counter-increment: ol4; }
   * .list.depth0:first-of-type { counter-reset: ol0; }
   * .list.depth1:first-of-type { counter-reset: ol1; }
   * .list.depth2:first-of-type { counter-reset: ol2; }
   * .list.depth3:first-of-type { counter-reset: ol3; }
   * .list.depth4:first-of-type { counter-reset: ol4; }
   **/
  inlineStyles: (() => {
    const styles = {
      BOLD: { style: { fontWeight: 'bold' } },
      ITALIC: { style: { fontStyle: 'italic' } },
      UNDERLINE: { style: { textDecoration: 'underline' } },
      STRIKETHROUGH: { style: { textDecoration: 'line-through' } },
    };
    COLORS.forEach(color => {
      styles[`color.${color}`] = { style: { color: color } };
    });
    // FONTS.forEach(font => {
    //   styles[`fontFamily.${font}`] = { style: { fontFamily: font } };
    // });
    FONT_SIZES.forEach(font => {
      styles[`fontSize.${font.size}pt`] = { style: { fontSize: `${font.size}pt` } };
    });
    return styles;
  })(),

  // this handles converting any inline styles not matched by the inlineStyles map above (custom added styles)
  inlineStyleFn: style => {
    style = customStyleFn(style);
    return (
      style && {
        element: 'span',
        style,
      }
    );
  },

  // Converting (rendering) custom block types, like "paragraph" and "horizontal-rule" to html is handled here
  blockRenderers: {
    'code-block': block => {
      const blockStyles = OrderedSet(defaultPreTagStyling.map(v => v.join(': ')));
      return `<pre${getClassesAndStyles({ block, blockStyles })}>${buildHtmlForBlockText(
        '',
        block,
        contentState
      )}</pre>`;
    },
    'page-break': () => {
      return '<div style="page-break-after: always"><br></div>';
    },
    // each draft.js block of type "paragraph" is passed through this function for export as html
    paragraph: block => {
      if (block.getLength() === 0) {
        return `<p${getClassesAndStyles({ block })}><br></p>`;
      }
      // get block-level styling and classes if any
      // "result" will be the html eventually returned from this function
      const result = `<p${getClassesAndStyles({ block })}>${buildHtmlForBlockText('', block, contentState)}</p>`;
      return result;
    },
    unstyled: block => {
      if (block.getLength() === 0) {
        return `<div${getClassesAndStyles({ block })}><br></div>`;
      }
      // get block-level styling and classes if any
      // "result" will be the html eventually returned from this function
      const result = `<div${getClassesAndStyles({ block })}>${buildHtmlForBlockText('', block, contentState)}</div>`;
      return result;
    },
    'horizontal-rule': () => {
      return '<hr>';
    },
    atomic: block => {
      const data = block.getData();
      let figStyle = [];
      let imgStyle = [];
      let classes = [];
      data.forEach((v, k) => {
        if (v === 'class') {
          classes.push(k);
        } else if (k === 'imgStyle') {
          // styles on img tag are saved under the key imgStyle
          v.forEach((vv, kk) => imgStyle.push(`${kk}: ${vv}`));
        } else {
          figStyle.push(`${k}: ${v}`);
        }
      });
      const float = data.get('float');
      if (float && !data.get('margin')) {
        figStyle.push(float === 'right' ? 'margin: 0 8px 0 0' : 'margin: 0 0 0 8px');
      }
      if (block.get('depth')) {
        figStyle.push(`margin-left: ${block.get('depth') * 2.5}em; `);
      }
      classes = classes.join(' ') && ` class="${classes.join(' ')}"`;
      figStyle = figStyle.join('; ') && ` style="${figStyle.join('; ')}"`;
      imgStyle = ` style="${imgStyle.join('; ')}"`;

      const { src } = (block.getEntityAt(0) && contentState.getEntity(block.getEntityAt(0)).getData()) || {};
      return `<figure${classes}${figStyle}><img src="${src}"${imgStyle}/></figure>`;
    },
    'pasted-list-item': block => {
      const prevBlock = contentState.getBlockBefore(block.getKey());
      if (prevBlock?.getType() === block.getType()) {
        return '';
      }
      const data = block.getData();
      let start = data.get('listStart');
      start = (start && ` start="${start}"`) || '';
      let listStyles = Map(data.get('listStyles'))
        .reduce((set, v, k) => {
          return set.add(`${k}: ${v}`);
        }, OrderedSet())
        .toArray()
        .join('; ');
      listStyles = listStyles && ` style="${listStyles}"`;
      const listItems = contentState
        .getBlockMap()
        .skipUntil(v => v === block)
        .takeWhile(v => v.getType().endsWith('list-item'))
        .toList();
      const listTag = block.getData().get('listStart') > 0 ? 'ol' : 'ul';
      let currentDepth = block.getDepth();
      return `<${listTag}${listStyles}${start}>${listItems
        .map(block => {
          const depth = block.getDepth();
          const openTag = depth > currentDepth ? `<${listTag}><li` : depth < currentDepth ? `</${listTag}><li` : '<li';
          currentDepth = depth;
          return `${openTag}${getClassesAndStyles({ block })}>${buildHtmlForBlockText('', block, contentState)}</li>`;
        })
        .toArray()
        .join('')}</${listTag}>`;
    },
    table: block => {
      const prevBlock = contentState.getBlockBefore(block.getKey());
      if (prevBlock && prevBlock.getType() === 'table') {
        return '';
      }
      const data = block.getData();
      const tableShape = data.get('tableShape');
      if (!tableShape) {
        return '<table><tbody><tr><td>&nbsp;</td></tr></tbody></table>';
      }
      let tableStyle = Map(data.get('tableStyle'))
        .reduce((set, v, k) => {
          return set.add(`${k}: ${v}`);
        }, OrderedSet())
        .toArray()
        .join('; ');
      tableStyle = tableStyle && ` style="${tableStyle}"`;
      const tableKey = data.get('tableKey');
      const tableBlocks = contentState
        .getBlockMap()
        .skipUntil(v => v.getType() === 'table' && v.getData().get('tableKey') === tableKey)
        .takeWhile(v => v.getType() === 'table')
        .toList();
      const colgroup = data.get('tableColgroup') ?? '';
      let cellCounter = 0;
      return `<table${tableStyle}>${colgroup}<tbody>${tableShape
        .map((row, i) => {
          let rowStyle = Map(block.getData().get('rowStyle')[i])
            .reduce((set, v, k) => {
              return set.add(`${k}: ${v}`);
            }, OrderedSet())
            .toArray()
            .join('; ');
          rowStyle = rowStyle && ` style="${rowStyle}"`;
          return `<tr${rowStyle}>${row
            .map((cell, j) => {
              const tag = cell.element;
              let cellStyle = Map(cell.style)
                .reduce((set, v, k) => {
                  return set.add(`${k}: ${v}`);
                }, OrderedSet())
                .toArray()
                .join('; ');
              cellStyle = cellStyle && ` style="${cellStyle}"`;
              let cellBlock = tableBlocks.get(cellCounter);
              let colspan = cellBlock.getData().get('colspan');
              colspan = colspan ? ` colspan=${colspan}` : '';
              let rowspan = cellBlock.getData().get('rowspan');
              rowspan = rowspan ? ` rowspan=${rowspan}` : '';

              const [, rowNum, colNum] = cellBlock?.getData().get('tablePosition').split('-') ?? [];
              if (i !== +rowNum || j !== +colNum) {
                cellBlock = null;
              } else {
                cellCounter++;
              }
              return `<${tag}${cellStyle}${colspan}${rowspan}>${buildHtmlForBlockText(
                '',
                cellBlock,
                contentState
              )}</${tag}>`;
            })
            .join('')}</tr>`;
        })
        .join('')}</tbody></table>`;
    },
  },

  blockStyleFn: block => {
    const type = block.getType();
    const depth = block.getDepth();
    const data = block.getData();
    const attributes = {};
    let styles = OrderedSet();
    let classes = OrderedSet();

    data.forEach((v, k) => {
      if (v === 'class') {
        classes = classes.add(k);
      } else if (!['depth', 'listStyles', 'listStart'].includes(k)) {
        styles = styles.add(`${k}: ${v}`);
      }
    });

    if (depth > 0 && !type.includes('list-item')) {
      styles = styles.add(`margin-left:${2.5 * depth}em`);
    } else if (type.includes('unordered-list-item') && depth <= MAX_LIST_DEPTH) {
      classes.remove('ordered-list-item');
      classes = OrderedSet.of('list', 'unordered-list-item', `depth${depth}`).union(classes);
      styles = OrderedSet.of(
        `margin-left:${1.5 + (depth === 0 ? 1 : 0)}em`,
        `list-style-type: ${depth === 0 ? 'disc' : depth === 1 ? 'circle' : 'square'}`,
        'position: relative'
      ).union(styles);
    } else if (type.includes('ordered-list-item') && depth <= MAX_LIST_DEPTH) {
      classes.remove('unordered-list-item');
      classes = OrderedSet.of('list', 'ordered-list-item', `depth${depth}`).union(classes);
      styles = OrderedSet.of(
        `margin-left: ${1.5 + (depth === 0 ? 1 : 0)}em`,
        'list-style-type: none',
        'position: relative'
      ).union(styles);
    }

    if (type === 'blockquote')
      styles = styles.add(
        "color: #999999; font-family: 'Hoefler Text', Georgia, serif; font-style: italic; line-height: 1.15em; border: none; border-left: 5px solid rgba(100, 100, 100, 0.5); margin: 0 2em; padding-left: 1em;"
      );
    if (classes.size) attributes.class = classes.toArray().join(' ');
    if (styles.size) attributes.style = styles.toArray().join(';');
    return { attributes };
  },

  defaultBlockTag: 'div',

  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase();
    if (entityType === 'video') {
      const { src } = entity.getData();
      return {
        element: 'video',
        attributes: {
          src: src,
        },
      };
    }
  },
});
