// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from '@material-ui/core';

import type { IOutlinedSelectProps } from './types';

import styles from './styles';

const OutlinedIdNameSelect = ({
  label,
  name,
  classes,
  value = '',
  values,
  onChange,
  labelWidth = 0,
  fullWidth = false,
  disabled = false,
  limitMaxWidth = false,
}: IOutlinedSelectProps) => (
  <FormControl
    variant="outlined"
    className={fullWidth ? classes.fullWidth : ''}
  >
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      input={
        <OutlinedInput
          labelWidth={labelWidth}
          name={name}
          classes={{
            input: classNames(classes.inputSelect, {
              [classes.inputSelectWidth]: limitMaxWidth,
            }),
          }}
          disabled={disabled}
        />
      }
    >
      <MenuItem key={-1} value={-1}>
        {'-- Select --'}
      </MenuItem>
      {values.map((val: string) => (
        <MenuItem key={val.id} value={val.id}>
          {val.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(OutlinedIdNameSelect);
