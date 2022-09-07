import { TinyMCE } from 'tinymce';

import Plugin from '../../main/ts/Plugin';

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'code shan-enhanced-lists lists advlist',
  toolbar: 'shan-enhanced-lists enhanced-list-ordered-list enhanced-list-unordered-list',
});
