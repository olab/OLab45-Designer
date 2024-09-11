// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';

import Appearance from './Appearance';
import BasicDetails from './BasicDetails';
import ContentDetails from './ContentDetails';
import Permissions from './Permissions';
import AdvancedDetails from './AdvancedDetails';

import * as mapDetailsActions from '../../redux/mapDetails/action';
import * as mapActions from '../../redux/map/action';

import { ACCESS } from './config';

import type { MapDetails } from '../../redux/mapDetails/types';
import type { Groups } from '../../redux/defaults/types';
import type {
  MapDetailsProps as IProps,
  MapDetailsState as IState,
} from './types';

import type { Node as NodeType } from '../Constructor/Graph/Node/types';

import styles, {
  TabContainer,
  Container,
  ScrollingContainer,
  Title,
  Header,
} from './styles';

class MapDetailsEditor extends PureComponent<
  IProps & { nodes: Array<NodeType> },
  IState,
> {
  numberTab: number = 0;

  constructor(props) {
    super(props);
    const {
      mapIdUrl,
      mapDetails,
      nodes,
      groups,
      roles,
      ACTION_GET_MAP_DETAILS_REQUESTED,
      ACTION_GET_MAP_REQUESTED,
    } = this.props;
    const isPageRefreshed = mapIdUrl && !mapDetails.id;

    if (isPageRefreshed) {
      ACTION_GET_MAP_DETAILS_REQUESTED(mapIdUrl);
      ACTION_GET_MAP_REQUESTED(mapIdUrl);
    }

    this.state = { ...mapDetails };
  }

  componentDidUpdate(prevProps: IProps) {
    const {
      mapDetails: { id: prevMapId },
    } = prevProps;
    const {
      mapDetails: { id: mapId },
      mapDetails,
    } = this.props;
    if (prevMapId !== mapId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...mapDetails });
    }
  }

  applyChanges = (): void => {
    const { ACTION_UPDATE_MAP_DETAILS_REQUESTED } = this.props;
    const updatedMapDetails = { ...this.state };

    ACTION_UPDATE_MAP_DETAILS_REQUESTED(updatedMapDetails);
  };

  handleChangeTabs = (event: Event, value: number): void => {
    this.numberTab = value;
    this.forceUpdate();
  };

  onInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  };

  handleEditorChange = (
    text: string,
    { id: editorId }: { editorId: string },
  ): void => {
    this.setState({ [editorId]: text });
  };

  handleMapGroupChange = (groups: Groups): void => {
    const mapId = this.props.mapDetails.id;
    // ensure that that any added map groups
    // have a valid map id in the navigation property
    groups.forEach(function (part, index) {
      this[index].mapId = mapId;
    }, groups);

    var { mapGroups } = this.state;
    this.setState({ mapGroups: groups });
  };

  handleSelectChange = (e: Event): void => {
    const { themesNames } = this.props;
    const { value, name } = (e.target: window.HTMLInputElement);

    const selectMenu = name === 'themeId' ? themesNames : ACCESS;
    const index = selectMenu.findIndex((style) => style === value);
    const isControlled = name === 'securityType' && value === 'Controlled';

    if (isControlled) {
      this.setState({ [name]: index + 2 });

      return;
    }

    this.setState({ [name]: index + 1 });
  };

  handleCheckBoxChange = (
    e: Event,
    checkedVal: boolean,
    name: string,
  ): void => {
    this.setState({ [name]: checkedVal });
  };

  render() {
    const { classes, themesNames, groups, roles } = this.props;
    const { description, devNotes } = this.state;

    return (
      <Container>
        <Header>
          <Title>Map Details</Title>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.applyChanges}
          >
            Save
          </Button>
        </Header>
        <Paper className={classes.paper}>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={this.numberTab}
            onChange={this.handleChangeTabs}
          >
            <Tab label="Basic Details" />
            <Tab label="Appearance" />
            <Tab label="Content Details" />
            <Tab label="Permissions" />
            <Tab label="Advanced Details" />
          </Tabs>
        </Paper>
        <ScrollingContainer>
          <TabContainer>
            {
              [
                <BasicDetails
                  details={this.state}
                  text={description}
                  onInputChange={this.onInputChange}
                  handleEditorChange={this.handleEditorChange}
                  handleSelectChange={this.handleSelectChange}
                />,
                <Appearance
                  details={this.state}
                  themes={themesNames}
                  handleSelectChange={this.handleSelectChange}
                />,
                <ContentDetails
                  details={this.state}
                  text={devNotes}
                  nodes={this.props.nodes}
                  handleEditorChange={this.handleEditorChange}
                  handleCheckBoxChange={this.handleCheckBoxChange}
                />,
                <Permissions
                  map={this.state}
                  groups={groups}
                  roles={roles}
                  handleMapGroupChange={this.handleMapGroupChange}
                />,
                <AdvancedDetails
                  details={this.state}
                  handleCheckBoxChange={this.handleCheckBoxChange}
                />,
              ][this.numberTab]
            }
          </TabContainer>
        </ScrollingContainer>
      </Container>
    );
  }
}

const mapStateToProps = (
  { defaults, map: { nodes }, mapDetails: { themes = [], ...mapDetails } },
  {
    match: {
      params: { mapId: mapIdUrl },
    },
  },
) => {
  const themesNames = themes.map((theme) => theme.name);

  return {
    themesNames,
    mapDetails,
    mapIdUrl,
    nodes,
    groups: defaults.groups,
    roles: defaults.roles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ACTION_GET_MAP_DETAILS_REQUESTED: (mapId: string) => {
    dispatch(mapDetailsActions.ACTION_GET_MAP_DETAILS_REQUESTED(mapId));
  },
  ACTION_UPDATE_MAP_DETAILS_REQUESTED: (mapDetails: MapDetails) => {
    dispatch(mapDetailsActions.ACTION_UPDATE_MAP_DETAILS_REQUESTED(mapDetails));
  },
  ACTION_GET_MAP_REQUESTED: (mapId: string) => {
    dispatch(mapActions.ACTION_GET_MAP_REQUESTED(mapId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MapDetailsEditor));
