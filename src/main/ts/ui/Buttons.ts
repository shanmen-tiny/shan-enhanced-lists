import { ToolbarSplitButtonItemTypes } from "@ephox/bridge/lib/main/ts/ephox/bridge/components/toolbar/ToolbarSplitButton";
import { Editor } from "tinymce";

const register = (editor: Editor): void => {
  const onAction = () => editor.execCommand('mceEnhancedList');

  editor.ui.registry.addButton('shan-enhanced-lists', {
    type: 'button',
    icon: 'smiley',
    tooltip: 'shan-enhanced-list',
    onAction: onAction
  });

  editor.ui.registry.addSplitButton('enhanced-list-unordered-list', {
    icon: 'unordered-list',
    tooltip: 'Enhanced unordered list',
    presets: 'listpreview',
    columns: 3,
    fetch: (callback) => {
      const items: ToolbarSplitButtonItemTypes[] = [
        {
          type: 'choiceitem',
          icon: 'list-bull-default',
          text: 'Disc',
          value: 'disc'
        },
        {
          type: 'choiceitem',
          icon: 'list-bull-circle',
          text: 'Circle',
          value: 'circle'
        },
        {
          type: 'choiceitem',
          icon: 'list-bull-square',
          text: 'Square',
          value: 'square'
        },
      ];
      callback(items);
    },
    onAction: () => {
      editor.execCommand('InsertUnorderedList');
    },
    onItemAction: (api, value) => {
      editor.execCommand('InsertUnorderedList', false, { 'list-style-type': value });
    },
  });

  editor.ui.registry.addSplitButton('enhanced-list-ordered-list', {
    icon: 'ordered-list',
    tooltip: 'Enhanced ordered list',
    columns: 3,
    fetch: (callback) => {
      const items : ToolbarSplitButtonItemTypes[] = [{
        type: 'choiceitem',
        icon: 'list-num-lower-alpha',
        text: 'LowerAlpha',
        value: 'lower-alpha'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-upper-alpha',
        text: 'UpperAlpha',
        value: 'upper-alpha'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-lower-greek',
        text: 'LowerGreek',
        value: 'lower-greek'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-upper-greek',
        text: 'UpperGreek',
        value: 'katakana'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-lower-latin',
        text: 'LowerLatin',
        value: 'lower-latin'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-upper-latin',
        text: 'UpperLatin',
        value: 'hebrew'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-lower-roman',
        text: 'LowerRoman',
        value: 'lower-roman'
      },
      {
        type: 'choiceitem',
        icon: 'list-num-upper-roman',
        text: 'UpperRoman',
        value: 'upper-roman'
      }];
      callback(items);
    },
    onAction: () => {
      editor.execCommand('InsertOrderedList');
    },
    onItemAction: (api, value) => {
      editor.execCommand('InsertOrderedList', false, { 'list-style-type': value });
    },
  });
}

export {
  register
};