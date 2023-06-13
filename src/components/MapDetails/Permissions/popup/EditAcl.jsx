// @flow
import React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { MapSecurityUser } from '../../../../redux/mapSecurityUsers/types';
import { muiStyles } from '../styles';

export type IProps = {
  onSubmit: (user: MapSecurityUser) => void,
  isOpen: Boolean,
  toggleIsOpen: (state: boolean) => void,
  cbRead: boolean,
  setCbRead: (state: boolean) => void,
  cbPlay: boolean,
  setCbPlay: (state: boolean) => void,
  cbEdit: boolean,
  setCbEdit: (state: boolean) => void,
  cbDelete: boolean,
  setCbDelete: (state: boolean) => void,
};

const Popup = ({
  onSubmit,
  isOpen,
  toggleIsOpen,
  cbRead,
  setCbRead,
  cbPlay,
  setCbPlay,
  cbEdit,
  setCbEdit,
  cbDelete,
  setCbDelete,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle>Edit ACL</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <FormControlLabel
          control={
            <Checkbox
              checked={cbRead}
              onChange={() => setCbRead(!cbRead)}
              color="primary"
            />
          }
          label="Read"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={cbPlay}
              onChange={() => setCbPlay(!cbPlay)}
              color="primary"
            />
          }
          label="Play"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={cbEdit}
              onChange={() => setCbEdit(!cbEdit)}
              color="primary"
            />
          }
          label="Edit"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={cbDelete}
              onChange={() => setCbDelete(!cbDelete)}
              color="primary"
            />
          }
          label="Delete"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsOpen} autoFocus color="default">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
