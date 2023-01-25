// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Divider } from '@material-ui/core';
import { QUESTION_TYPES, EDITORS_FIELDS, TTALK_QUESTION_TYPES } from '../../config';
import OutlinedSelect from '../../../../shared/components/OutlinedSelect';
import styles, { FieldLabel, SwitchWrapper } from '../../styles';
import Switch from '../../../../shared/components/Switch';
import type { ITTalkQuestionLayoutProps } from './types';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../config';

function TTalkQuestionLayout({
  onInputChange,
  onQuestionTypeChange,
  onSettingsChange,
  onSwitchChange,
  props,
  state,
}: ITTalkQuestionLayoutProps) {
  const { classes } = props;
  const {
    description,
    isFieldsDisabled,
    name,
    questionType,
    settings,
    stem,
  } = state;

  const settingsObject = JSON.parse(settings);

  return (
    <>
      <FieldLabel>
        {EDITORS_FIELDS.QUESTION_TYPES}
      </FieldLabel>
      <OutlinedSelect
        name="questionType"
        value={TTALK_QUESTION_TYPES[questionType]}
        values={Object.values(TTALK_QUESTION_TYPES)}
        onChange={onQuestionTypeChange}
        disabled={isFieldsDisabled}
      />

      <FieldLabel>
        {EDITORS_FIELDS.NAME}
        <TextField
          multiline
          rows="1"
          name="name"
          placeholder={EDITORS_FIELDS.NAME}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={name}
          onChange={onInputChange}
          disabled={isFieldsDisabled}
          fullWidth
        />
      </FieldLabel>

      <FieldLabel>
        {EDITORS_FIELDS.DESCRIPTION}
        <TextField
          multiline
          rows="1"
          name="description"
          placeholder={EDITORS_FIELDS.DESCRIPTION}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={description}
          onChange={onInputChange}
          disabled={isFieldsDisabled}
          fullWidth
        />
      </FieldLabel>

      <FieldLabel>
        {EDITORS_FIELDS.STEM}
        <TextField
          multiline
          rows="1"
          name="stem"
          placeholder={EDITORS_FIELDS.STEM}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={stem}
          onChange={onInputChange}
          disabled={isFieldsDisabled}
          fullWidth
        />
      </FieldLabel>

      <FieldLabel>
        {EDITORS_FIELDS.ROOM_NAME}
        <TextField
          name="roomName"
          placeholder={EDITORS_FIELDS.ROOM_NAME}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={settingsObject.roomName}
          onChange={onSettingsChange}
          disabled={isFieldsDisabled}
          fullWidth
        />
      </FieldLabel>

      <Divider />
    </>
  );
}

export default withStyles(styles)(TTalkQuestionLayout);
