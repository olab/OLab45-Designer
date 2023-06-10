// @flow
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { MapSecurityUser } from '../../../../redux/mapSecurityUsers/types';
import { muiStyles } from '../styles';

export type IProps = {
  onSubmit: (user: MapSecurityUser) => void,
  isOpen: Boolean,
  toggleIsOpen: (state: boolean) => void,
};

const Popup = ({
  onSubmit,
  isOpen,
  toggleIsOpen,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle>Add a New System User</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField label="Username" fullWidth autoFocus type="text"></TextField>
        <TextField label="Email" fullWidth type="email"></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsOpen} autoFocus color="default">
          Cancel
        </Button>
        <Button onClick={toggleIsOpen} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
