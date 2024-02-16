import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import {
  BASIC_TEXT_EDITOR_OPTIONS,
  EDITOR_API_KEY,
  EDITOR_VERSION,
} from './config';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.props.editorRef = React.createRef();
  }

  render() {
    const {
      height = 200,
      width = 800,
      editorId = '',
      editorOptions = {},
      handleEditorChange,
      text,
      // editorRef,
    } = this.props;

    // handle case where tinymce is directly off the root
    let url = '/tinymce/tinymce.js';
    if (process.env.PUBLIC_URL != '/') {
      url = `${process.env.PUBLIC_URL}/tinymce/tinymce.js`;
    }

    return (
      <Editor
        tinymceScriptSrc={url}
        apiKey={EDITOR_API_KEY}
        id={editorId}
        cloudChannel={EDITOR_VERSION}
        // eslint-disable-next-line
        value={text}
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
