// @flow
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Switch from '../../../shared/components/Switch';
import TextEditor from '../../../shared/components/TextEditor';
import OutlinedInput from '../../../shared/components/OutlinedInput';

import { ORDINARY_TYPE as ORDINARY_NODE_TYPE } from '../../Constructor/Graph/Node/config';

import type { MainTabProps as IProps } from './types';

import {
  TextContent,
  OtherContent,
  NodeContentTitle,
  Container,
  NodeContentPosition,
} from './styles';

const MainTab = ({
  text = '',
  title = '',
  type = 0,
  isEnd = false,
  isVisitOnce = false,
  handleTitleChange,
  handleEditorChange,
  handleCheckBoxChange,
  handleKeyDown,
  x,
  y,
  id,
}: IProps) => {
  const checkBoxes = [
    { label: 'Root Node', value: type, name: 'type' },
    { label: 'End Node', value: isEnd, name: 'isEnd' },
    { label: 'Visit Once', value: isVisitOnce, name: 'isVisitOnce' },
  ];

  const editorOptions = {
    license_key: 'gpl',
    height: 500,
    menubar: true,
    promotion: false,
    plugins:
      'advlist autolink lists link image charmap print preview anchor ' +
      'searchreplace code fullscreen ' +
      'insertdatetime media table paste code help wordcount',
    toolbar:
      'code | undo redo | formatselect | ' +
      'bold italic image backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  };

  const positionInfo = `Position: (${Math.round(x)}, ${Math.round(y)})`;
  const idInfo = `Id: ${id}`;

  return (
    <Container>
      <TextContent>
        <OutlinedInput
          name="title"
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <NodeContentTitle>Node content</NodeContentTitle>
        <TextEditor
          editorId="text"
          height={300}
          width={800}
          text={text}
          handleEditorChange={handleEditorChange}
          handleKeyDown={handleKeyDown}
          editorOptions={editorOptions}
        />
      </TextContent>
      <OtherContent>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            {checkBoxes.map((item) => {
              const isChecked =
                item.value !== ORDINARY_NODE_TYPE && Boolean(item.value);
              return (
                <Switch
                  name={item.name}
                  key={item.label}
                  label={item.label}
                  labelPlacement="start"
                  checked={isChecked}
                  onChange={handleCheckBoxChange}
                />
              );
            })}
          </Grid>
          <Grid item xs={3}>
            <NodeContentPosition>
              {idInfo}
              <br />
              {positionInfo}
            </NodeContentPosition>
          </Grid>
        </Grid>
      </OtherContent>
    </Container>
  );
};

export default MainTab;
