import { Arr } from "@ephox/katamari";
import * as Utils from '../core/Utils';
import { Editor } from "tinymce";
import { PublicDialog } from '@ephox/bridge';
import { PredicateFilter, SugarElement, Traverse } from "@ephox/sugar";
import { EnhancedListDialogData } from "./DialogTypes";

const options: string[] = ["circle", "disc", "square", "lower-alpha", "lower-greek", "lower-roman", "upper-alpha", "upper-roman"];

const getListOptions = (options: string[]) => {
  return Arr.map(options, (o) => ({
    text: o,
    value: o
  }));
};

const items: PublicDialog.BodyComponentSpec[] = [
  {
    type: 'selectbox',
    name: 'style',
    label: 'List style',
    items: getListOptions(options)
  },
  {
    type: 'input',
    name: 'paddingLeft',
    label: 'Left Padding',
    inputMode: 'numeric'
  },
];

const getPanelItems = (selElement: SugarElement<Node>): PublicDialog.BodyComponentSpec[] => {
  if (Utils.isNested(selElement)) {
    return items.concat({
      type: 'selectbox',
      name: 'appliedTo',
      label: 'Styles to applied to',
      items: [
        { text: 'The Selected List', value: 'selectedList' },
        { text: 'The Selected List + parent', value: 'selectedListAndParent' },
        { text: 'The Selected List + children', value: 'selectedListAndChildren' },
        { text: 'Current tree', value: 'currentTree' },
      ]
    });
  }

  return items;
}

const nestedListDialog = (editor: Editor): PublicDialog.DialogSpec<EnhancedListDialogData> => {
  const selectedElement = SugarElement.fromDom(editor.selection.getNode());

  return {
    title: 'Enhanced List',
    body: {
      type: 'panel',
      items: getPanelItems(selectedElement),
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    onSubmit: (api) => {
      const data = api.getData();

      if (Utils.isListItemNode(selectedElement) || Utils.isListNode(selectedElement)) {
        const elements = getElementsToApply(selectedElement, data['appliedTo']);
        editor.undoManager.transact(() => {
          Arr.each((elements), (x) => {
            editor.dom.setStyle(x, 'padding-inline-start', `${data['paddingLeft']}px`);
            editor.dom.setStyle(x, 'list-style', `${data['style']}`);
          });
        });
      } else {
        const style = data.style;
        if (Arr.find(['circle', 'disc', 'square'], (x) => x === style).isSome()) {
          editor.execCommand('InsertUnorderedList', false, { 'list-style-type': data['style'] })
        } else {
          editor.execCommand('InsertOrderedList', false, { 'list-style-type': data['style'] })
        }
        editor.dom.setStyle(editor.selection.getNode(), 'padding-inline-start', data['paddingLeft'] + 'px');
      }

      api.close();
    }
  }
}

const getElementsToApply = (selElement: SugarElement, appliedTo: string): Node[] => {
  const parent = Traverse.parent(selElement).getOr(selElement);
  let elements = [parent];
  if (appliedTo === 'selectedListAndParent') {
    const parents = PredicateFilter.ancestors(parent, Utils.isListNode);
    elements = elements.concat(parents);
  } else if (appliedTo === 'selectedListAndChildren') {
    const children = PredicateFilter.descendants(parent, Utils.isListNode);
    elements = elements.concat(children);
  } else if (appliedTo === 'currentTree') {
    const children = PredicateFilter.descendants(parent, Utils.isListNode);
    const parents = PredicateFilter.ancestors(parent, Utils.isListNode);

    elements = elements.concat(parents);
    elements = elements.concat(children);
  }

  return Arr.map(Arr.unique(elements), (x) => x.dom);
}

const open = (editor: Editor): void => {
  const config = nestedListDialog(editor);
  editor.windowManager.open(config);
}

export {
  open
};