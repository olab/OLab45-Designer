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
      editorId = '',
      editorOptions,
      handleEditorChange,
      text,
      editorRef,
    } = this.props;

    const initOptions = {
      height,
      ...(editorId && { selector: `textarea#${editorId}` }),
      ...BASIC_TEXT_EDITOR_OPTIONS,
      ...editorOptions,
    };

    const tinyurl = `/tinymce/tinymce.min.js`;
    // const tinyurl = `${window.location.protocol}${window.location.host}/tinymce/tinymce.min.js`;

    return (
      <Editor
        tinymceScriptSrc={tinyurl}
        zapiKey={EDITOR_API_KEY}
        id={editorId}
        xcloudChannel={EDITOR_VERSION}
        // eslint-disable-next-line
        value={text}
        // eslint-disable-next-line
        onEditorChange={handleEditorChange}
        init={initOptions}
      />
    );
  }
}

export default TextEditor;
