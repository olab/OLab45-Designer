// @flow
import React from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd,
} from '@material-ui/icons';
import {
  MapSecurityUser,
  OlabUserObject,
} from '../../../redux/mapSecurityUsers/types';
import { muiStyles } from './styles';
import classNames from 'classnames';
import { DARK_BLUE, RED } from '../../../shared/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteAclPopup from './popup/DeleteAcl';
import EditAclPopup from './popup/EditAcl';
import CollaboratorsPopup from './popup/Collaborators';
import NewUserPopup from './popup/NewUser';

export type IProps = {
  users: Array<MapSecurityUser>,
  updateAcl: (user: MapSecurityUser) => void,
  deleteSecurityUser: (user: MapSecurityUser) => void,
  mapId: number,
};

const aclDisplay = (acl: string) => {
  const list = [
    acl.includes('R') && 'Read',
    acl.includes('X') && 'Play',
    acl.includes('W') && 'Edit',
    acl.includes('D') && 'Delete',
  ].filter(Boolean);

  return list.join(', ').toLowerCase();
};

const AclsTable = ({
  users,
  updateAcl,
  deleteSecurityUser,
  mapId,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  const [deleteDialogOpen, toggleDeleteDialogOpen] = React.useReducer<boolean>(
    (state) => !state,
    false,
  );

  const [editDialogOpen, toggleEditDialogOpen] = React.useReducer<boolean>(
    (state) => !state,
    false,
  );

  const [usersSearchLoading, toggleUsersSearchLoading] =
    React.useReducer<boolean>((state) => !state, false);

  const [usersDialogOpen, setUsersDialogOpen] = React.useState<boolean>(false);

  const [newUserPopupOpen, setNewUserPopupOpen] =
    React.useState<boolean>(false);

  const [cbRead, setCbRead] = React.useState<boolean>(false);
  const [cbPlay, setCbPlay] = React.useState<boolean>(false);
  const [cbEdit, setCbEdit] = React.useState<boolean>(false);
  const [cbDelete, setCbDelete] = React.useState<boolean>(false);

  const [activeUser, setActiveUser] = React.useState<MapSecurityUser>();

  const openEditDialog = (
    e: React.MouseEvent<HTMLElement>,
    user: MapSecurityUser,
  ) => {
    e.preventDefault();
    setCbRead(user.acl.includes('R'));
    setCbPlay(user.acl.includes('X'));
    setCbEdit(user.acl.includes('W'));
    setCbDelete(user.acl.includes('D'));
    toggleEditDialogOpen();
    setActiveUser(user);
  };

  const openDeleteDialog = (
    e: React.MouseEvent<HTMLElement>,
    user: MapSecurityUser,
  ) => {
    e.preventDefault();
    toggleDeleteDialogOpen();
    setActiveUser(user);
  };

  const _updateAcl = () => {
    toggleEditDialogOpen();

    const newAcl = [
      cbRead && 'R',
      cbPlay && 'X',
      cbEdit && 'W',
      cbDelete && 'D',
    ]
      .filter(Boolean)
      .join('');

    const sorted = (str) => str.split('').sort().join('');

    if (sorted(newAcl) != sorted(activeUser.acl)) {
      updateAcl({ ...activeUser, acl: newAcl });
    }
  };

  const _deleteSecurityUser = () => {
    toggleDeleteDialogOpen();
    deleteSecurityUser(activeUser);
  };

  const selectCollaborator = (user: OlabUserObject) => {
    const sysUser = users.find((u) => u.userId == user.id) || {
      userId: user.id,
      acl: '',
      user,
    };

    setActiveUser(sysUser);
    setCbRead(false);
    setCbPlay(false);
    setCbEdit(false);
    setCbDelete(false);
    toggleEditDialogOpen();
    setUsersDialogOpen(false);
    setNewUserPopupOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="ACLs table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '40%', color: DARK_BLUE }}>
              <strong>USER</strong>
            </TableCell>
            <TableCell style={{ width: '30%', color: DARK_BLUE }}>
              <strong>ACL</strong>
            </TableCell>
            <TableCell style={{ width: '30%' }} align="right">
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={() => setUsersDialogOpen(true)}
              >
                <span>Add Users</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell component="th" scope="row">
                <strong>
                  {user.user?.nickname ||
                    user.user?.username ||
                    `#${user.userId}`}
                </strong>
                <br />
                <em>
                  {user.user?.email || (
                    <span style={{ opacity: 0.75 }}>(no email address)</span>
                  )}
                </em>
              </TableCell>
              <TableCell>{aclDisplay(user.acl)}</TableCell>
              <TableCell align="right">
                <Tooltip
                  title="Edit ACLs"
                  onClick={(e) => openEditDialog(e, user)}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete rule">
                  <IconButton onClick={(e) => openDeleteDialog(e, user)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {users.length == 0 && (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={3}>
                <center>
                  <em>No users to show.</em>
                </center>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteAclPopup
        onSubmit={_deleteSecurityUser}
        isOpen={deleteDialogOpen}
        toggleIsOpen={toggleDeleteDialogOpen}
      />

      <EditAclPopup
        onSubmit={_updateAcl}
        isOpen={editDialogOpen}
        toggleIsOpen={toggleEditDialogOpen}
        {...{
          cbRead,
          setCbRead,
          cbPlay,
          setCbPlay,
          cbEdit,
          setCbEdit,
          cbDelete,
          setCbDelete,
        }}
      />

      <CollaboratorsPopup
        isOpen={usersDialogOpen}
        toggleIsOpen={() => setUsersDialogOpen(!usersDialogOpen)}
        toggleNewUserPopupOpen={() => setNewUserPopupOpen(!newUserPopupOpen)}
        mapId={mapId}
        onSelect={selectCollaborator}
      />

      <NewUserPopup
        isOpen={newUserPopupOpen}
        toggleIsOpen={() => setNewUserPopupOpen(!newUserPopupOpen)}
        mapId={mapId}
        onSelect={selectCollaborator}
      />
    </TableContainer>
  );
};

export default AclsTable;
