import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import {
  BASIC_TEXT_EDITOR_OPTIONS,
  EDITOR_API_KEY,
  EDITOR_VERSION,
} from './config';

class TextEditor extends React.Component {
  render() {
    const {
      height = 200,
      width = 800,
      editorId = '',
      editorOptions = {},
      handleEditorChange,
      text,
    } = this.props;

    return (
      <Editor
        apiKey={EDITOR_API_KEY}
        id={editorId}
        cloudChannel={EDITOR_VERSION}
        // eslint-disable-next-line
        initialValue={text}
        // eslint-disable-next-line
        onEditorChange={handleEditorChange}
        init={{
          width,
          height,
          ...(editorId && { selector: `textarea#${editorId}` }),
          ...BASIC_TEXT_EDITOR_OPTIONS,
          ...editorOptions,
        }}
      />
    );
  }
}

export default TextEditor;
