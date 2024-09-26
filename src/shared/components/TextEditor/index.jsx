import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { config } from '../../../config';

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

    return (
      <Editor
        tinymceScriptSrc={config.APP_BASEPATH + '/tinymce/tinymce.min.js'}
        zapiKey={EDITOR_API_KEY}
        id={editorId}
        xcloudChannel={EDITOR_VERSION}
        value={text}
        onEditorChange={handleEditorChange}
        init={initOptions}
      />
    );
  }
}

export default TextEditor;
