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
import { MapGroup } from '../../../redux/mapGroups/types';
import { muiStyles } from './styles';
import classNames from 'classnames';
import { DARK_BLUE, RED } from '../../../shared/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type IProps = {
  groups: Array<MapSecurityGroup>,
  mapGroups: Array<MapSecurityGroup>,
  mapId: number,
};

const GroupsTable = ({
  groups,
  mapGroups,
  mapId,
}: IProps): React$Element<any> => {
  const classes = makeStyles(muiStyles)();

  const [groupsSearchLoading, toggleGroupsSearchLoading] =
    React.useReducer<boolean>((state) => !state, false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="Groups table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '40%', color: DARK_BLUE }}>
                <strong>Group</strong>
              </TableCell>
              <TableCell style={{ width: '30%' }} align="right">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  startIcon={<PersonAdd />}
                  onClick={() => setGroupsDialogOpen(true)}
                >
                  <span>Add Groups</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.groupId}>
                <TableCell component="th" scope="row">
                  <strong>{group.group?.name || `#${group.groupId}`}</strong>
                  <br />
                  <em>
                    {group.group?.email || (
                      <span style={{ opacity: 0.75 }}>(no email address)</span>
                    )}
                  </em>
                </TableCell>
              </TableRow>
            ))}
            {groups.length == 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  <center>
                    <em>No groups to show.</em>
                  </center>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <p>&nbsp;</p>
    </>
  );
};

export default GroupsTable;
