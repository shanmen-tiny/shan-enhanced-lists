import { Mouse, UiControls, UiFinder } from "@ephox/agar";
import { TinyUiActions } from "@ephox/mcagar";
import { Editor } from "@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes";
import { SugarBody, SugarElement, Traverse } from "@ephox/sugar";

const pSetListBoxItem = async (editor: Editor, group: string, itemText: string): Promise<void> => {
  const dialog = await TinyUiActions.pWaitForDialog(editor);
  const element = UiFinder.findIn(dialog, 'label.tox-label:contains(' + group + ') + div.tox-listboxfield > .tox-listbox').getOrDie();
  Mouse.click(element);
  const list = await UiFinder.pWaitForVisible('Wait for list to open', SugarBody.body(), '.tox-menu.tox-collection--list');
  const item = UiFinder.findIn(list, '.tox-collection__item-label:contains(' + itemText + ')').getOrDie();
  const parent = Traverse.parent(item).getOrDie('Failed to find parent');
  Mouse.click(parent);
};

const pSetInputFieldValue = async (editor: Editor, group: string, newValue: string): Promise<void> => {
  const dialog = await TinyUiActions.pWaitForDialog(editor);
  const element = UiFinder.findIn<HTMLInputElement>(dialog, 'label:contains("' + group + '") + input').getOrDie();
  UiControls.setValue(element, newValue);
  fireEvent(element, 'input');
}

const fireEvent = (elem: SugarElement, event: string): void => {
  const evt = new Event(event, {
    bubbles: true,
    cancelable: true
  });
  elem.dom.dispatchEvent(evt);
};


export {
  pSetListBoxItem,
  pSetInputFieldValue
};
