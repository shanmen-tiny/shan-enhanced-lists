import { PredicateFilter, SugarElement } from "@ephox/sugar";
import { Editor } from "tinymce";
import * as Dialog from '../ui/Dialog'

import * as Utils from '../core/Utils';

const register = (editor: Editor): void => {
  editor.addCommand('mceEnhancedList', () => {
    Dialog.open(editor);
  })

  editor.addCommand('debugger', () => {
    console.log('getnode', editor.selection.getNode());
    console.log('getstart true', editor.selection.getStart(true));
    console.log('getstart', editor.selection.getStart());
    console.log('getend', editor.selection.getEnd());
    console.log('getseelctedblocks', editor.selection.getSelectedBlocks());
    console.log('getseelctedblocks from dom', editor.selection.getSelectedBlocks());
    console.log('getparent', editor.dom.getParent(editor.selection.getNode(), 'ol>li>ol'));
    console.log('getparent', editor.dom.getParent(editor.selection.getEnd()));
    console.log(PredicateFilter.ancestors(SugarElement.fromDom(editor.selection.getNode()), (x) => Utils.isListNode(x)));
  })
}

export {
  register
};