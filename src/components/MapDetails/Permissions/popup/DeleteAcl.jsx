// @flow
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { muiStyles } from '../styles';

export type IProps = {
  onSubmit: () => void,
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
      <DialogTitle>Confirm Delete Action</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Are you sure you want to delete this ACL rule?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsOpen} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
