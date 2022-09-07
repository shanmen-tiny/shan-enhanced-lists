import { Editor } from "tinymce";

const register = (editor: Editor): void => {
  const onAction = () => editor.execCommand('mceEnhancedList');
  const debugAcction = () => editor.execCommand('debugger');

  editor.ui.registry.addButton('shan-enhanced-lists', {
    type: 'button',
    text: 'Bold',
    onAction: onAction
  });

  editor.ui.registry.addButton('debugger-button', {
    type: 'button',
    text: 'Debug',
    onAction: debugAcction
  });
}

export {
  register
};