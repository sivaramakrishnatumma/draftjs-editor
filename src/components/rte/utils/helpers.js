import { Map, OrderedSet } from 'immutable';
import { customStyleFn } from './renderConfig';
import kebabCase from 'lodash.kebabcase';

// helper function converts style attribute string into key-value pairs
export function convertStyleStringToObject(style = '', data = {}) {
  if (!style) {
    return null;
  }
  return style
    .split(';')
    .filter(s => s.includes(':'))
    .map(s => s.split(':'))
    .reduce((map, s) => {
      const key = s.shift().trim();
      const val = s.join(':').trim();
      map[key] = val;
      return map;
    }, data);
}

export function getClassesAndStyles({ block, blockStyles = OrderedSet(), classes = OrderedSet() }) {
  const data = block.getData();
  data
    .filter((v, k) => !['depth', 'listStyles', 'listStart'].includes(k))
    .forEach((v, k) => {
      if (v === 'class') {
        classes = classes.add(k);
      } else {
        blockStyles = blockStyles.add(`${k}: ${v}`);
      }
    });
  const margin = block.get('depth');
  if (margin) {
    blockStyles = OrderedSet.of([`margin-left: ${margin * 2.5}em`]).union(blockStyles);
  }
  // convert classes & styles to strings and return
  classes = (classes.size && ` class="${classes.toArray().join(' ')}"`) || '';
  blockStyles = (blockStyles.size && ` style="${blockStyles.toArray().join('; ')}"`) || '';
  return `${classes}${blockStyles}`;
}

export function buildHtmlForBlockText(result, block, contentState) {
  if (!block) {
    return '<span>&nbsp;</span>';
  }
  // now build the html for all inline styles for each "styleRange" in the block. A styleRange is
  // any sequence in the block where the characters share the same inline styling.
  block.findStyleRanges(
    () => true,
    (s, e) => {
      let close = '';
      let styles = block.getInlineStyleAt(s);
      styles = Map(customStyleFn(styles))
        .reduce((styleSet, v, k) => {
          k = kebabCase(k);
          if (k === 'font-size' && /^\d*$/.test(v)) v += 'pt';
          return styleSet.add(`${k}: ${v}`);
        }, OrderedSet())
        .toArray()
        .join('; ');

      styles = styles ? ` style="${styles}"` : '';
      // If a styleRange overlaps with an "entity" that starts and ends at the same points in the block
      // the entity represents an embeded link
      const startKey = block.getEntityAt(s);
      const endKey = block.getEntityAt(e - 1);
      const entity = startKey && startKey === endKey ? contentState.getEntity(startKey) : null;

      if (styles) {
        result += `<span${styles}>`;
        close = '</span>' + close;
      }
      // Now add the text content of the block for the current styleRange. If a "link" entity exists for this range
      // then wrap the text content in an anchor tag and add the href.
      // The multiple "replace" calls prevent empty paragraphs and extra spaces from collapsing and failing to render.
      const textContent = block
        .getText()
        .slice(s, e)
        .replace(/\n/g, '<br>')
        .replace(/\s{2,}?/g, '&nbsp;&nbsp;')
        .replace(/^\s$/g, '&nbsp;');
      if (entity && entity.get('type') === 'LINK') {
        const { url, target } = entity.getData();
        result += `<a href="${url}" ${target ? `target="${target}" rel="noreferrer"` : ''}>${textContent}</a>`;
      } else {
        result += textContent;
      }
      result += close;
    }
  );
  return result;
}

export const blockStyle = block => {
  const type = block.getType();
  const depth = block.getDepth();
  const data = block.getData();
  const classes = [];
  if (depth > 0 && !type.includes('list-item')) {
    classes.push('indent' + depth);
  }

  if (type === 'left-align') {
    classes.push('left-align');
  } else if (type === 'center-align') {
    classes.push('center-align');
  } else if (type === 'right-align') {
    classes.push('right-align');
  }

  data.forEach((v, k) => {
    switch (k) {
      case 'text-align':
      case 'float':
        classes.push(`${k}-${v}`);
        break;
      default:
        return null;
    }
  });
  if (classes.length) return classes.join(' ');
};
