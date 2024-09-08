// @flow
import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Delete as DeleteIcon } from '@material-ui/icons';
import { useState, useEffect } from 'react';

import { getGroups, getRoles } from '../../../services/api/defaults';
import OutlinedIdNameSelect from '../../../shared/components/OutlinedIdNameSelect';

import { ContainerTab, ContentTitle, ContentParagraph } from './styles';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'groupName',
    headerName: 'Group',
    width: 300,
  },
  {
    field: 'roleName',
    headerName: 'Role',
    width: 300,
  },
];

const rows = [
  { id: 1, groupName: 'OLab', roleName: 'Learner' },
  { id: 2, groupName: 'OLab', roleName: 'Moderator' },
  { id: 3, groupName: 'OLab', roleName: 'Superuser' },
  { id: 4, groupName: 'OLab', roleName: 'Author' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 300,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

export default function PermissionsTab({ node }) {
  const classes = useStyles();

  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    getGroups().then((data) => {
      setGroups(data);

      getRoles().then((data) => {
        setRoles(data);
        setLoading(false);
      });
    });
  }, []);

  const onSelectedGroup = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    setSelectedGroupId(value);
  };

  const onSelectedRole = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    setSelectedRoleId(value);
  };
  return (
    <ContainerTab>
      <ContentTitle>Node Group Role Editor</ContentTitle>
      <ContentParagraph>
        Assign a group and role to a node to control it's visibility to specific
        users with same group and role.
      </ContentParagraph>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={5}>
          <OutlinedIdNameSelect
            label="Groups"
            name="groups"
            labelWidth={80}
            value={selectedGroupId}
            values={groups}
            onChange={onSelectedGroup}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <OutlinedIdNameSelect
            label="Roles"
            name="roles"
            labelWidth={80}
            value={selectedRoleId}
            values={roles}
            onChange={onSelectedRole}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Add" placement="top">
            <Button variant="outlined" size="small" className={classes.button}>
              Add
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '90%', height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              autoPageSize
            />
          </Box>
        </Grid>
      </Grid>
    </ContainerTab>
  );
}
