// @flow
import React from 'react';
import {
  Button,
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

export type IProps = {
  users: Array<MapSecurityUsers>,
};

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
    width: 800,
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

const AclsTable = ({ users }: IProps): React$Element<any> => {
  const classes = useStyles();
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
                <Tooltip title="Edit ACLs">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete rule">
                  <IconButton>
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
    </TableContainer>
  );
};

export default AclsTable;
