// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Typography,
  Accordion as ExpansionPanelMaterialUI,
  AccordionDetails,
  AccordionSummary as ExpansionPanelSummary,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
} from '@material-ui/icons';

import { PANEL_NAMES } from './config';
import { importFileUpload } from '../../../services/api/importFileUpload';

import type { ExpansionPanelProps, ExpansionPanelState } from './types';

import styles, { ExpansionPanelWrapper } from './styles';

class ExpansionPanel extends PureComponent<
  ExpansionPanelProps,
  ExpansionPanelState,
> {
  state: ExpansionPanelState = {
    expandedPanel: null,
    selectedFile: null,
    loaded: 0,
    isUploadDisabled: true,
  };

  handleChange =
    (panelName: string): Function =>
    (event: Event, expanded: boolean): void => {
      this.setState({
        expandedPanel: expanded ? panelName : null,
      });
    };

  onFileSelected = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      isUploadDisabled: false,
      importMapError: null,
      importMapDetails: [],
      showImportDetails: false,
    });
  };

  onProgressUpdate = (event) => {
    const percentCompleted = Math.round(
      ((event.loaded * 100) / event.total) * 0.9,
    );
    this.setState({
      loaded: percentCompleted,
    });
  };

  onFileUploadError = (data) => {
    this.setState({
      loaded: 100,
      importMapError: data.message,
      isUploadDisabled: false,
    });
  };

  onFileUploaded = (data) => {
    this.setState({
      loaded: 100,
      isUploadDisabled: false,
      importMapId: data.data['id'],
      importMapName: data.data['name'],
      importMapDetails: data.data['logMessages'],
    });
  };

  toggleImportDetails = () => {
    this.setState({
      showImportDetails: !this.state.showImportDetails,
    });
  };

  onFileUpload = () => {
    const { selectedFile: file } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    // TODO: this should do through the saga/reducer route, but for now
    // it's calling the API helper directly.
    var data = importFileUpload(
      formData,
      this.onProgressUpdate,
      this.onFileUploaded,
      this.onFileUploadError,
    );

    this.setState({
      selectedFile: null,
      loaded: 1,
      isUploadDisabled: true,
    });
  };

  render() {
    const {
      expandedPanel,
      loaded,
      isUploadDisabled,
      importMapId,
      importMapName,
      importMapError,
      importMapDetails,
      showImportDetails,
    } = this.state;
    const { classes, showModal, onChoose, isDisabled } = this.props;

    let importDetailRows = '';
    if (importMapDetails != null && importMapDetails.length > 0) {
      for (let i = 0; i < importMapDetails.length; i++) {
        importDetailRows = importDetailRows.concat(importMapDetails[i] + '\n');
      }
    }

    return (
      <ExpansionPanelWrapper>
        <ExpansionPanelMaterialUI
          expanded={expandedPanel === PANEL_NAMES.MANUAL}
          onChange={this.handleChange(PANEL_NAMES.MANUAL)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Manual Map Creation
            </Typography>
            <Typography className={classes.secondaryHeading}>
              More experienced authors
            </Typography>
          </ExpansionPanelSummary>
          <AccordionDetails>
            <Typography className={classes.content}>
              A single pre-populated root node (named ‘Start node’) is created
              and positioned in middle of Layout Editor window.
              <br />
              <br />
              Then you will be prompted for a Map name to save to before
              proceeding;
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              aria-label="Create"
              classes={{ root: classes.fab }}
              onClick={onChoose}
              disabled={isDisabled}
            >
              Create Map
              <ArrowForwardIcon
                fontSize="small"
                classes={{ root: classes.icon }}
              />
            </Button>
          </AccordionDetails>
        </ExpansionPanelMaterialUI>
        <ExpansionPanelMaterialUI
          expanded={expandedPanel === PANEL_NAMES.FROM_TEMPLATE}
          onChange={this.handleChange(PANEL_NAMES.FROM_TEMPLATE)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Create Map from Template
            </Typography>
            <Typography className={classes.secondaryHeading}>
              General map creation
            </Typography>
          </ExpansionPanelSummary>
          <AccordionDetails>
            <Typography className={classes.content}>
              Allows for the creation of a map from a predefined template.
              <br />
              <br />
              Once a template is selected, the Map Layout Editor window appears
              with pre-defined nodes.
              <br />
              <br />
              The Simple Template consists of a root node (named ‘Start Node’)
              linked to a second node with a one-way, single arrow link icon.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              aria-label="Create"
              classes={{ root: classes.fab }}
              onClick={showModal}
              disabled={isDisabled}
            >
              Choose Template
              <ArrowForwardIcon
                fontSize="small"
                classes={{ root: classes.icon }}
              />
            </Button>
          </AccordionDetails>
        </ExpansionPanelMaterialUI>
        <ExpansionPanelMaterialUI
          expanded={expandedPanel === PANEL_NAMES.IMPORT_MAP}
          onChange={this.handleChange(PANEL_NAMES.IMPORT_MAP)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Import Map</Typography>
            <Typography className={classes.secondaryHeading}>
              Import map from export file
            </Typography>
          </ExpansionPanelSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <input type="file" name="file" onChange={this.onFileSelected} />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  aria-label="Create"
                  classes={{ root: classes.fab }}
                  onClick={this.onFileUpload}
                  disabled={isUploadDisabled}
                >
                  Upload
                  <ArrowForwardIcon
                    fontSize="small"
                    classes={{ root: classes.icon }}
                  />
                </Button>
              </Grid>
              {loaded > 0 && loaded < 100 && (
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={loaded} />
                  </Box>
                </Grid>
              )}
              {loaded == 100 && importMapError != null && (
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <div>Map import error: {importMapError}</div>
                  </Box>
                </Grid>
              )}
              {loaded == 100 && importMapError == null && (
                <Grid item xs={9}>
                  <Box sx={{ width: '100%' }}>
                    <div>
                      Map imported:
                      <br />
                      Id: {importMapId}
                      <br />
                      Name: {importMapName}
                      <br />
                    </div>
                  </Box>
                </Grid>
              )}
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  {loaded == 100 && showImportDetails && (
                    <textarea cols="{{50}}" rows="{{4}}">
                      {importDetailRows}
                    </textarea>
                  )}
                </Grid>
                <Grid item xs={3}>
                  {loaded == 100 && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      aria-label="Create"
                      classes={{ root: classes.fab }}
                      onClick={this.toggleImportDetails}
                    >
                      Show Details
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </ExpansionPanelMaterialUI>
      </ExpansionPanelWrapper>
    );
  }
}

export default withStyles(styles)(ExpansionPanel);
