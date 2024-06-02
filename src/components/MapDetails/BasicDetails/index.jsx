// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextEditor from '../../../shared/components/TextEditor';
import OutlinedInput from '../../../shared/components/OutlinedInput';

import type { BasicDetailsProps as IProps } from './types';

import styles, { ContainerKeywords } from './styles';
import { ContainerTab, ContentTitle } from '../styles';

const editorOptions = {
  height: 500,
  menubar: false,
  promotion: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace code fullscreen',
    'insertdatetime table paste code help',
  ],
  toolbar:
    'code | formatselect | ' +
    'backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

const BasicDetails = ({
  details,
  text,
  onInputChange,
  handleEditorChange,
}: IProps): React$Element<any> => (
  <ContainerTab>
    <OutlinedInput
      name="name"
      label="Title"
      value={details.name}
      onChange={onInputChange}
      fullWidth
    />
    <ContentTitle>Description</ContentTitle>
    <TextEditor
      editorId="description"
      width={800}
      height={300}
      text={text}
      handleEditorChange={handleEditorChange}
      editorOptions={editorOptions}
    />
    <ContainerKeywords>
      <OutlinedInput
        name="keywords"
        label="Keywords"
        value={details.keywords}
        onChange={onInputChange}
        fullWidth
      />
    </ContainerKeywords>
    <div>
      <b>Creator:</b>
      {` ${details.author}`}
    </div>
  </ContainerTab>
);

export default withStyles(styles)(BasicDetails);
