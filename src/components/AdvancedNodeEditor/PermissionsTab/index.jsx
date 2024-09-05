// @flow
import React from 'react';
import {
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';

import { ContainerTab, ContentTitle, ContentParagraph } from './styles';

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

export default function PermissionsTab({ map, node, groups, roles }) {
  const classes = useStyles();

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
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Tooltip title="Add" placement="top">
            <Button variant="outlined" size="small" className={classes.button}>
              Add
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </ContainerTab>
  );
}
