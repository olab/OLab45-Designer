// @flow
import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  MapSecurityUser,
  OlabUserObject,
} from '../../../../redux/mapSecurityUsers/types';
import { insertSystemUser } from '../../../../services/api/mapSecurityUsers';
import { muiStyles } from '../styles';
import * as notificationActions from '../../../../redux/notifications/action';

export type IProps = {
  onSubmit: (user: MapSecurityUser) => void,
  isOpen: Boolean,
  toggleIsOpen: (state: boolean) => void,
  mapId: Number,
  onSelect: (user: OlabUserObject) => void,
};

const Popup = ({
  onSubmit,
  isOpen,
  toggleIsOpen,
  mapId,
  onSelect,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  const [username, setUsername] = React.useState<String>('');
  const [email, setEmail] = React.useState<String>('');
  const [loading, toggleLoading] = React.useReducer<Boolean>((state) => !state);
  const [error, setError] = React.useState<String>('');

  React.useEffect(() => {
    if (error) setError('');
  }, [username, email]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const user: OlabUserObject = {
      username,
      email,
    };

    toggleLoading();

    insertSystemUser(mapId, {
      Username: username,
      Email: email,
    })
      .then((id) => {
        if (id > 0) {
          user.id = id;
          onSelect(user);
          setUsername('');
          setEmail('');
        } else {
          setError('Error occurred, please try again.');
        }
      })
      .catch((err) =>
        setError(
          err.response?.data?.data || 'Error occurred, please try again.',
        ),
      )
      .finally(() => toggleLoading());
  };

  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle>Add a New System User</DialogTitle>
      <DialogContent className={classes.dialogContentFixed}>
        <p>
          Enter a valid username and email address that have not already been
          already used.
        </p>
        <TextField
          label="Username"
          fullWidth
          autoFocus
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        ></TextField>
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        ></TextField>
        {error && <small style={{ color: 'red' }}>{error}</small>}
      </DialogContent>
      <DialogActions style={{ display: 'flex', alignItems: 'center' }}>
        {loading && <CircularProgress size={22} style={{ marginLeft: 15 }} />}
        <span style={{ flex: 1 }}></span>
        <Button onClick={toggleIsOpen} autoFocus color="default">
          Cancel
        </Button>
        <Button
          onClick={submit}
          color="primary"
          disabled={
            loading || 0 == email.trim().length || 0 == username.trim().length
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
