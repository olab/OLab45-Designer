// @flow
import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd,
} from '@material-ui/icons';
import { MapSecurityUser } from '../../../redux/mapSecurityUsers/types';
import classNames from 'classnames';
import { DARK_BLUE, RED } from '../../../shared/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type IProps = {
  users: Array<MapSecurityUser>,
  updateAcl: (user: MapSecurityUser) => void,
  deleteSecurityUser: (user: MapSecurityUser) => void,
};

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
    width: 800,
  },
  dialogContent: {
    minWidth: 350,
  },
});

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
}: IProps): React$Element<any> => {
  const classes = useStyles();

  const [deleteDialogOpen, toggleDeleteDialogOpen] = React.useReducer(
    (state) => !state,
    false,
  );

  const [editDialogOpen, toggleEditDialogOpen] = React.useReducer(
    (state) => !state,
    false,
  );

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
                #{user.userId}
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
      <Dialog open={deleteDialogOpen} onClose={toggleDeleteDialogOpen}>
        <DialogTitle>Confirm Delete Action</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Are you sure you want to delete this ACL rule?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeleteDialogOpen} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={_deleteSecurityUser} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={toggleEditDialogOpen}>
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
          <Button onClick={toggleEditDialogOpen} autoFocus color="default">
            Cancel
          </Button>
          <Button onClick={_updateAcl} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default AclsTable;
