import { Arr } from "@ephox/katamari";
import * as Utils from '../core/Utils';
import { Editor } from "tinymce";
import { PublicDialog } from '@ephox/bridge';
import { PredicateFilter, SugarElement, Traverse } from "@ephox/sugar";
import { EnhancedListDialogData } from "./DialogTypes";

const styleOptions: string[] = ["circle", "disc", "square", "lower-alpha", "lower-greek", "lower-roman", "upper-alpha", "upper-roman"];

const getStyleOptions = (options: string[]) => {
  return Arr.map(options, (o) => ({
    text: o,
    value: o
  }));
};

const items: PublicDialog.BodyComponentSpec[] = [
  {
    type: 'listbox',
    name: 'listStyle',
    label: 'List Style',
    items: getStyleOptions(styleOptions)
  },
  {
    type: 'input',
    name: 'paddingLeft',
    label: 'Padding Left',
    inputMode: 'numeric'
  },
];

const getPanelItems = (selElement: SugarElement<Node>): PublicDialog.BodyComponentSpec[] => {
  if (Utils.isNestedList(selElement)) {
    return items.concat({
      type: 'listbox',
      name: 'itemsToApplyStyle',
      label: 'Styles to Applied to',
      items: [
        { text: 'The selected list', value: 'selectedList' },
        { text: 'The selected list + all parent lists', value: 'selectedListAndParent' },
        { text: 'The selected list + all children lists', value: 'selectedListAndChildren' },
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
        const elements = getElementsToApply(selectedElement, data.itemsToApplyStyle);
        editor.undoManager.transact(() => {
          Arr.each((elements), (x) => {
            if ((/^(LI)$/).test(x.nodeName)) {
              editor.dom.setStyle(x, 'padding-inline-start', `${data.paddingLeft}px`);
            } else {
              editor.dom.setStyle(x, 'list-style-type', `${data.listStyle}`);
            }
          });
        });
      } else {
        const listStyle = data.listStyle;
        if (Arr.find(['circle', 'disc', 'square'], (x) => x === listStyle).isSome()) {
          editor.execCommand('InsertUnorderedList', false, { 'list-style-type': data.listStyle })
        } else {
          editor.execCommand('InsertOrderedList', false, { 'list-style-type': data.listStyle })
        }
        editor.dom.setStyle(editor.selection.getNode(), 'padding-inline-start', data.paddingLeft + 'px');
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

  const childElements = getChildElements(elements);
  elements = elements.concat(childElements)
  return Arr.map(elements, (x) => x.dom);
}

const getChildElements = (elements: SugarElement<Node>[]): SugarElement<Node>[] => {
  return Arr.flatten(
    Arr.map(elements, (x) => PredicateFilter.children(x, Utils.isListItemNode))
  );
}

const open = (editor: Editor): void => {
  const config = nestedListDialog(editor);
  editor.windowManager.open(config);
}

export {
  open
};