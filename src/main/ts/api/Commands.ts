import { Editor } from "tinymce";
import * as Dialog from '../ui/Dialog'

const register = (editor: Editor): void => {
  editor.addCommand('mceEnhancedList', () => {
    Dialog.open(editor);
  })
}

export {
  register
};