import { TinyAssertions, TinyHooks, TinySelections, TinyUiActions } from "@ephox/mcagar";
import * as TestUtils from '../module/Utils';

import Plugin from '../../../main/ts/Plugin';
import { Type } from "@ephox/katamari";

interface Definition {
  readonly inputContent: string;
  readonly type: string;
  readonly style: string;
  readonly expected: string;
  readonly action: (editor) => Promise<void>;
  readonly selection?: Selection
}

interface Selection {
  startPath: number[],
  soffset: number,
  finishPath: number[],
  foffset: number
}

// This an example of a browser test of the editor.
describe('browser.tinymce.plugin.enhancedlist.PluginTest', () => {
  const hook = TinyHooks.bddSetup({
    plugins: 'shan-enhanced-lists lists advlist',
    toolbar: 'shan-enhanced-lists enhanced-list-ordered-list enhanced-list-unordered-list'
  }, [Plugin]);

  const listStyleTest = (title: string, definition: Definition) => {
    it(title, async () => {
      const editor = hook.editor();
      editor.setContent(definition.inputContent);
      if (Type.isNonNullable(definition.selection)) {
        TinySelections.setSelection(editor, definition.selection.startPath, definition.selection.soffset, definition.selection.finishPath, definition.selection.foffset)
      }

      TinyUiActions.clickOnToolbar(editor, 'button[aria-label="shan-enhanced-list"]');
      await TinyUiActions.pWaitForDialog(editor);
      await definition.action(editor);
      TinyUiActions.submitDialog(editor);
      TinyAssertions.assertContent(editor, definition.expected);
    });
  };

  listStyleTest('Disc style', {
    inputContent: '',
    type: 'ul',
    style: 'disc',
    expected: ['<ul style="list-style-type: disc;">',
      '<li>&nbsp;</li>',
      '</ul>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'disc')
    }
  });

  listStyleTest('Square style', {
    inputContent: '',
    type: 'ul',
    style: 'square',
    expected: ['<ul style="list-style-type: square;">',
      '<li>&nbsp;</li>',
      '</ul>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'square')
    },
  })

  listStyleTest('Circle style', {
    inputContent: '',
    type: 'ul',
    style: 'circle',
    expected: ['<ul style="list-style-type: circle;">',
      '<li>&nbsp;</li>',
      '</ul>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'circle')
    }
  })

  listStyleTest('Lower alpha style', {
    inputContent: '',
    type: 'ol',
    style: 'lower-alpha',
    expected: ['<ol style="list-style-type: lower-alpha;">',
      '<li>&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-alpha')
    }
  })

  listStyleTest('Lower greek style', {
    inputContent: '',
    type: 'ol',
    style: 'lower-greek',
    expected: ['<ol style="list-style-type: lower-greek;">',
      '<li>&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-greek')
    }
  })

  listStyleTest('Lower roman style', {
    inputContent: '',
    type: 'ol',
    style: 'lower-roman',
    expected: ['<ol style="list-style-type: lower-roman;">',
      '<li>&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'lower-roman')
    }
  })

  listStyleTest('Upper alpha style', {
    inputContent: '',
    type: 'ol',
    style: 'upper-alpha',
    expected: ['<ol style="list-style-type: upper-alpha;">',
      '<li>&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-alpha')
    }
  })

  listStyleTest('Upper roman style', {
    inputContent: '',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol style="list-style-type: upper-roman;">',
      '<li>&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
    }
  })

  listStyleTest('Setting LI items with Padding Value', {
    inputContent: '',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">&nbsp;</li>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
      await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
    }
  });

  listStyleTest('Applying styles to the selected list only', {
    inputContent: '<ol><li>test</li><ol><li>test2</li></ol></ol>',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol>',
      '<li>test</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test2</li>',
      '</ol>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
      await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
      await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list')
    },
    selection: {
      startPath: [0, 1],
      soffset: 0,
      finishPath: [0, 1],
      foffset: 1
    }
  });

  listStyleTest('Applying styles to the selected list + all parents', {
    inputContent: '<ol><li>test</li><ol><li>test2</li></ol></ol>',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test2</li>',
      '</ol>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
      await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
      await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list + all parent lists')
    },
    selection: {
      startPath: [0, 1],
      soffset: 0,
      finishPath: [0, 1],
      foffset: 1
    }
  });

  listStyleTest('Applying styles to the selected list + all children', {
    inputContent: '<ol><li>test</li><ol><li>test2</li><ol><li>test3</li></ol></ol></ol>',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol>',
      '<li>test</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test2</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test3</li>',
      '</ol>',
      '</ol>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
      await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
      await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'The selected list + all children lists')
    },
    selection: {
      startPath: [0, 1],
      soffset: 0,
      finishPath: [0, 1],
      foffset: 1
    }
  });

  listStyleTest('Applying styles to the whole tree', {
    inputContent: '<ol><li>test</li><ol><li>test2</li><ol><li>test3</li></ol></ol></ol>',
    type: 'ol',
    style: 'upper-roman',
    expected: ['<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test2</li>',
      '<ol style="list-style-type: upper-roman;">',
      '<li style="padding-inline-start: 15px;">test3</li>',
      '</ol>',
      '</ol>',
      '</ol>'].join("\n"),
    action: async (editor) => {
      await TestUtils.pSetListBoxItem(editor, 'List Style', 'upper-roman')
      await TestUtils.pSetInputFieldValue(editor, 'Padding Left', '15')
      await TestUtils.pSetListBoxItem(editor, 'Styles to Applied to', 'Current tree')
    },
    selection: {
      startPath: [0, 1],
      soffset: 0,
      finishPath: [0, 1],
      foffset: 1
    }
  });
});
