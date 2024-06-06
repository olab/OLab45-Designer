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
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd,
} from '@material-ui/icons';
import { Groups } from '../../../redux/defaults/types';
import { muiStyles } from './styles';
import classNames from 'classnames';

export type IProps = {
  groups: Groups,
  mapGroups: Groups,
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

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

const MapGroupsTable = ({
  groups,
  map,
  handleMapGroupChange,
}: IProps): React$Element<any> => {
  // remove map groups from groups list
  const buildLeftList = (groups, mapGroups) => {
    let list = [];

    groups.forEach((outer) => {
      let found = false;

      for (let index = 0; index < mapGroups.length; index++) {
        const inner = mapGroups[index];
        if (inner.id == outer.id) {
          found = true;
          break;
        }
      }

      if (!found) {
        list.push(outer);
      }
    });

    return list;
  };

  const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    let currentIndex = -1;
    if (checked.length > 0) {
      currentIndex = checked.map((e) => e.id).indexOf(value.id);
    }

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    handleMapGroupChange(right.concat(left));
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    handleMapGroupChange(right.concat(leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    handleMapGroupChange(not(right, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    handleMapGroupChange(right);
  };

  const customList = (headerText, items) => (
    <div>
      <center>
        <strong>{headerText}</strong>
      </center>
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value.id}-label`;

            return (
              <ListItem
                key={value.id}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.map((e) => e.id).indexOf(value.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    </div>
  );

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  var leftList = buildLeftList(groups, map.mapGroups);
  const [left, setLeft] = React.useState(leftList);

  const [right, setRight] = React.useState(map.mapGroups);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList('Available Map Groups', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Tooltip title="Move All Right" placement="top">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
          </Tooltip>
          <Tooltip title="Move Selected Right" placement="top">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
          </Tooltip>
          <Tooltip title="Move Selected Left" placement="top">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Tooltip>
          <Tooltip title="Move All Left" placement="top">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item>{customList('Current Map Groups', right)}</Grid>
    </Grid>
  );
};

export default MapGroupsTable;
