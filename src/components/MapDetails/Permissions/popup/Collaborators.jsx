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
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import {
  MapSecurityUser,
  OlabUserObject,
} from '../../../../redux/mapSecurityUsers/types';
import { muiStyles } from '../styles';
import { PersonAdd } from '@material-ui/icons';
import { searchSecurityUsersCandidates } from '../../../../services/api/mapSecurityUsers';

export type IProps = {
  isOpen: Boolean,
  toggleIsOpen: (state: boolean) => void,
  toggleNewUserPopupOpen: (state: boolean) => void,
  mapId: number,
  onSelect: (user: OlabUserObject) => void,
};

let searchTimeout: Number;

const Popup = ({
  isOpen,
  toggleIsOpen,
  toggleNewUserPopupOpen,
  mapId,
  onSelect,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  const [loading, setLoading] = React.useReducer<boolean>(
    (state) => !state,
    false,
  );

  const [search, setSearch] = React.useState<string>('');
  const [users, setUsers] = React.useState<OlabUserObject[]>(undefined);

  React.useEffect(() => {
    if (!isOpen || 0 == search.trim().length) return;

    if (searchTimeout > 0) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      setLoading(true);

      const users = await searchSecurityUsersCandidates(
        mapId,
        search.trim(),
      ).catch(() => []);

      setLoading(false);
      setUsers(users);
    }, 0.75 * 1000);
  }, [search]);

  const selectUser = (
    e: React.MouseEvent<HTMLElement>,
    user: OlabUserObject,
  ) => {
    e.preventDefault();
    onSelect(user);
  };

  return (
    <Dialog open={isOpen} onClose={toggleIsOpen}>
      <DialogTitle className={classes.dialogTitleFlex}>
        <span>Assign Collaborators</span>
        <Tooltip title="Create a new user">
          <IconButton
            aria-label="Create a new user"
            onClick={toggleNewUserPopupOpen}
          >
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent className={classes.dialogContentFixed}>
        <TextField
          label="Search users"
          fullWidth
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          style={{
            minHeight: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {loading && <CircularProgress size={30} style={{ marginTop: 10 }} />}

          {undefined === users && (
            <p>
              Search and select an existing collaborator to configure access
              permissions. You may also create a new system user by clicking the
              user icon in the top-right corner of this dialog.
            </p>
          )}

          {0 === users?.length && <p>No matches found.</p>}

          {users?.length > 0 && (
            <>
              <Paper
                style={{ maxHeight: 200, overflow: 'auto', width: '100%' }}
              >
                <List>
                  {users.map((user, i) => (
                    <ListItem
                      button
                      key={i}
                      onClick={(e) => selectUser(e, user)}
                    >
                      <ListItemText
                        primary={`${
                          user.nickname || user.username || `#${user.id}`
                        } (${user.email || 'no email address'})`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <span style={{ flex: 1 }}></span>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
