// @flow
import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { MapSecurityUser } from '../../../../redux/mapSecurityUsers/types';
import { muiStyles } from '../styles';
import { PersonAdd } from '@material-ui/icons';

export type IProps = {
  isOpen: Boolean,
  toggleIsOpen: (state: boolean) => void,
  toggleNewUserPopupOpen: (state: boolean) => void,
};

const Popup = ({
  isOpen,
  toggleIsOpen,
  toggleNewUserPopupOpen,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  const [loading, setLoading] = React.useReducer<boolean>(
    (state) => !state,
    false,
  );

  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle className={classes.dialogTitleFlex}>
        <span>Assign Collaborators</span>
        <Tooltip title="Create a new user">
          <IconButton aria-label="Create a new user">
            <PersonAdd onClick={toggleNewUserPopupOpen} />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField label="Search users" fullWidth autoFocus></TextField>
        {loading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsOpen} autoFocus color="default">
          Cancel
        </Button>
        <Button onClick={toggleIsOpen} color="primary">
          Configure Access
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
