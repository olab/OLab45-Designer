// @flow
import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TextEditor from '../../../shared/components/TextEditor';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from '../../../shared/components/CopyToClipboard';

import { NODE_PRIORITIES } from './config';
import { LINK_STYLES } from '../../config';

import type { SecondaryTabProps as IProps } from './types';

import styles, {
  Title,
  TextEditorWrapper,
  BlockCheckbox,
  CheckBoxContainer,
  TextFieldContainer,
} from './styles';

import { TextEditorBlock } from '../styles';

const editorOptions = {
  license_key: 'gpl',
  height: 500,
  menubar: true,
  promotion: false,
  plugins:
    'advlist autolink lists link image charmap preview anchor ' +
    'searchreplace code fullscreen ' +
    'insertdatetime media table code help wordcount',
  toolbar:
    'code | undo redo | formatselect | ' +
    'bold italic image backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

const SecondaryTab = ({
  classes,
  info = '',
  nodeId = 0,
  annotation = '',
  linkStyle = 1,
  priorityId = 1,
  handleSelectChange,
  handleEditorChange,
  handleKeyDown,
}: IProps) => {
  const keyword = `[[INFO:${nodeId}]]`;

  return (
    <TextEditorBlock>
      <TextEditorWrapper>
        <Title>Supporting information</Title>
        <TextEditor
          editorId="info"
          height={200}
          text={info}
          handleEditorChange={handleEditorChange}
          handleKeyDown={handleKeyDown}
          editorOptions={editorOptions}
        />
        <TextFieldContainer>
          <TextField
            label="Supporting information keyword:"
            margin="normal"
            className={classes.textField}
            value={keyword}
          />
          <CopyToClipboard text={keyword} medium />
        </TextFieldContainer>
      </TextEditorWrapper>
      <div>
        <Title>Annotation</Title>
        <TextEditor
          editorId="annotation"
          height={200}
          text={annotation}
          handleEditorChange={handleEditorChange}
          handleKeyDown={handleKeyDown}
          editorOptions={editorOptions}
        />
        <BlockCheckbox>
          <CheckBoxContainer>
            <OutlinedSelect
              label="Node Priorities"
              name="priorityId"
              labelWidth={110}
              value={NODE_PRIORITIES[priorityId - 1]}
              values={NODE_PRIORITIES}
              onChange={handleSelectChange}
              fullWidth
            />
          </CheckBoxContainer>
          <OutlinedSelect
            label="Links Style"
            name="linkStyle"
            labelWidth={80}
            value={LINK_STYLES[linkStyle - 1]}
            values={LINK_STYLES}
            onChange={handleSelectChange}
            fullWidth
          />
        </BlockCheckbox>
      </div>
    </TextEditorBlock>
  );
};

export default withStyles(styles)(SecondaryTab);
