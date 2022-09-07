import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('shan-enhanced-lists', {
    text: 'shan-enhanced-lists button',
    onAction: () => {
      editor.setContent('<p>content added from shan-enhanced-lists</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('shan-enhanced-lists', setup);
};
