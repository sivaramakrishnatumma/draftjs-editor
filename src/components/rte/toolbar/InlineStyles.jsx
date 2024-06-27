import { useEditorContext } from '../provider/EditorContext';
import { RichUtils } from 'draft-js';
import { inlineStyles } from './constants';

const InlineStyles = () => {
  const { activeEditorState, updateEditorState } = useEditorContext();

  /**
   * Applies an inline style to the active editor state.
   *
   * @param {Event} event - The event that triggered the style application.
   * @param {string} style - The style to apply (e.g. 'BOLD', 'ITALIC', etc.).
   */
  const applyStyle = event => {
    event.preventDefault();

    if (activeEditorState) {
      const style = event.currentTarget.getAttribute('data-style');

      const newState = RichUtils.toggleInlineStyle(activeEditorState, style);

      if (newState) {
        updateEditorState(newState);
      }
    }
  };

  /**
   * Checks if a given style is active in the current editor state.
   *
   * @param {string} style - The style to check.
   * @returns {boolean} True if the style is active, false otherwise.
   */
  const isActive = style => {
    return activeEditorState?.getCurrentInlineStyle()?.has(style) ?? false;
  };

  return (
    <div className="inline-styles-container">
      {inlineStyles.map(item => (
        <div
          key={item.style}
          data-style={item.style}
          className={`toolbar-item ${isActive(item.style) ? 'active' : ''}`}
          onMouseDown={applyStyle}
          title={item.tooltip}
          tabIndex="0"
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default InlineStyles;
