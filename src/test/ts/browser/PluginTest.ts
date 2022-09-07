import { TinyAssertions, TinyHooks, TinySelections, TinyUiActions } from "@ephox/mcagar";
import * as TestUtils from '../module/Utils';

import Plugin from '../../../main/ts/Plugin';

// This an example of a browser test of the editor.
describe('browser.tiynmce.plugin.enhancedlist.PluginTest', () => {
  const hook = TinyHooks.bddSetup({
    plugins: 'shan-enhanced-lists lists advlist',
    toolbar: 'shan-enhanced-lists enhanced-list-ordered-list enhanced-list-unordered-list'
  }, [Plugin]);

  const listStyleTest = (title: string, action: (editor) => Promise<void>, definition: Record<string, string>) => {
    it(title, async () => {
      const editor = hook.editor();
      editor.setContent(definition.inputContent);
      TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
      await TinyUiActions.pWaitForDialog(editor);
      await action(editor);
      TinyUiActions.submitDialog(editor);
      TinyAssertions.assertContent(editor, definition.expected);
    });
  };

  listStyleTest('Disc style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'disc')
  }, {
    inputContent: '',
    type: 'ul',
    style: 'disc',
    expected: '<ul style="list-style-type: disc;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ul>'
  });

  listStyleTest('Square style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'square')
  }, {
    inputContent: '',
    type: 'ul',
    style: 'square',
    expected: '<ul style="list-style-type: square;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ul>'
  })

  listStyleTest('Circle style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'circle')
  }, {
    inputContent: '',
    type: 'ul',
    style: 'circle',
    expected: '<ul style="list-style-type: circle;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ul>'
  })

  listStyleTest('Lower alpha style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-alpha')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'lower-alpha',
    expected: '<ol style="list-style-type: lower-alpha;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ol>'
  })

  listStyleTest('Lower greek style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-greek')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'lower-greek',
    expected: '<ol style="list-style-type: lower-greek;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ol>'
  })

  listStyleTest('Lower roman style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-roman')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'lower-roman',
    expected: '<ol style="list-style-type: lower-roman;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ol>'
  })

  listStyleTest('Upper alpha style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-alpha')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'upper-alpha',
    expected: '<ol style="list-style-type: upper-alpha;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ol>'
  })

  listStyleTest('Upper roman style', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'upper-roman',
    expected: '<ol style="list-style-type: upper-roman;">\n' +
      '<li>&nbsp;</li>\n' +
      '</ol>'
  })

  listStyleTest('Setting LI items with Padding Value', async (editor) => {
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
  }, {
    inputContent: '',
    type: 'ol',
    style: 'upper-roman',
    expected: '<ol style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">&nbsp;</li>\n' +
      '</ol>'
  })

  it('Applying styles to the selected list only', async () => {
    const editor = hook.editor();
    editor.setContent('<ul><li>test</li><ul><li>test2</li></ul></ul>');
    TinySelections.setSelection(editor, [0, 1], 0, [0, 1], 1);
    TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
    await TinyUiActions.pWaitForDialog(editor);
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
    await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list')
    TinyUiActions.submitDialog(editor);
    TinyAssertions.assertContent(editor, '<ul>\n' +
      '<li>test</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test2</li>\n' +
      '</ul>\n' +
      '</ul>');
  });

  it('Applying styles to the selected list + all parents', async () => {
    const editor = hook.editor();
    editor.setContent('<ul><li>test</li><ul><li>test2</li></ul></ul>');
    TinySelections.setSelection(editor, [0, 1], 0, [0, 1], 1);
    TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
    await TinyUiActions.pWaitForDialog(editor);
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
    await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list + all parent lists')
    TinyUiActions.submitDialog(editor);
    TinyAssertions.assertContent(editor, '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test2</li>\n' +
      '</ul>\n' +
      '</ul>');
  });

  it('Applying styles to the selected list + all children', async () => {
    const editor = hook.editor();
    editor.setContent('<ul><li>test</li><ul><li>test2</li><ul><li>test3</li></ul></ul></ul>');
    TinySelections.setSelection(editor, [0, 1], 0, [0, 1], 1);
    TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
    await TinyUiActions.pWaitForDialog(editor);
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
    await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list + all children lists')
    TinyUiActions.submitDialog(editor);
    TinyAssertions.assertContent(editor, '<ul>\n' +
      '<li>test</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test2</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test3</li>\n' +
      '</ul>\n' +
      '</ul>\n' +
      '</ul>');
  });

  it('Applying styles to the whole tree', async () => {
    const editor = hook.editor();
    editor.setContent('<ul><li>test</li><ul><li>test2</li><ul><li>test3</li></ul></ul></ul>');
    TinySelections.setSelection(editor, [0, 1], 0, [0, 1], 1);
    TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
    await TinyUiActions.pWaitForDialog(editor);
    await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
    await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'Current tree')
    TinyUiActions.submitDialog(editor);
    TinyAssertions.assertContent(editor, '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test2</li>\n' +
      '<ul style="list-style-type: upper-roman;">\n' +
      '<li style="padding-inline-start: 15px;">test3</li>\n' +
      '</ul>\n' +
      '</ul>\n' +
      '</ul>');
  });
});
