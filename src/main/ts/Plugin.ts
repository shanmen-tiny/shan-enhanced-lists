import { Editor, TinyMCE } from 'tinymce';
import * as Buttons from '../ts/ui/Buttons';
import * as Commands from '../ts/api/Commands';

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  if (editor.hasPlugin('lists') && editor.hasPlugin('advlist')) {
    Buttons.register(editor);
    Commands.register(editor);
  } else {
    console.error('Please use the Lists and Advanced List plugin together with the Enhanced List plugin.');
  }
};

export default (): void => {
  tinymce.PluginManager.add('shan-enhanced-lists', setup);
};