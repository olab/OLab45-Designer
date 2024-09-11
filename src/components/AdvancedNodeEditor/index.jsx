// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';

import MainTab from './MainTab';
import SecondaryTab from './SecondaryTab';
import PermissionsTab from './PermissionsTab';

import CircularSpinnerWithText from '../../shared/components/CircularSpinnerWithText';

import * as mapActions from '../../redux/map/action';
import * as wholeMapActions from '../../middlewares/app/action';

import { redirectToPlayer } from '../utils';

import { LINK_STYLES, KEY_S } from '../config';
import { NODE_PRIORITIES } from './SecondaryTab/config';
import {
  ROOT_TYPE as ROOT_NODE_TYPE,
  ORDINARY_TYPE as ORDINARY_NODE_TYPE,
} from '../Constructor/Graph/Node/config';

import type { AdvancedNodeEditorProps } from './types';
import type { Node as NodeType } from '../Constructor/Graph/Node/types';

import styles, {
  TabContainer,
  Container,
  ScrollingContainer,
  Title,
  Header,
  ControlsDeleteContainer,
} from './styles';
import { Triangle } from '../Modals/NodeEditor/styles';

class AdvancedNodeEditor extends PureComponent<
  AdvancedNodeEditorProps,
  NodeType,
> {
  tabNumber: number = 0;

  constructor(props) {
    super(props);
    const {
      mapId,
      nodeId,
      node,
      ACTION_GET_NODE_REQUESTED,
      ACTION_GET_ROLES_REQUESTED,
      ACTION_GET_GROUPS_REQUESTED,
    } = this.props;

    ACTION_GET_NODE_REQUESTED(mapId, nodeId);
    ACTION_GET_ROLES_REQUESTED();
    ACTION_GET_GROUPS_REQUESTED();

    this.state = { ...node };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPressed);
  }

  componentDidUpdate(prevProps: IProps) {
    const { history, nodeId: nodeIdPage, mapId, node, isDeleting } = this.props;
    const { node: prevNode, isDeleting: isDeletingPrevious } = prevProps;
    const isDataChanged = node && node.id === nodeIdPage && prevNode !== node;
    const shouldRedirectOnMap = isDeletingPrevious && !isDeleting;
    const isNodeDeleted = !node && nodeIdPage;

    if (isDataChanged) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...node });
    }

    if (shouldRedirectOnMap || isNodeDeleted) {
      history.push(`/${mapId}`, { isFromANE: true });
    }
  }

  applyChanges = (): void => {
    const { mapId, ACTION_UPDATE_NODE } = this.props;
    const updatedNode = { ...this.state };

    ACTION_UPDATE_NODE(updatedNode, true, mapId);
  };

  deleteNode = (): void => {
    const {
      mapId,
      node: { id: nodeId, type: nodeType },
      ACTION_DELETE_NODE_MIDDLEWARE,
    } = this.props;

    ACTION_DELETE_NODE_MIDDLEWARE(mapId, nodeId, nodeType);
  };

  handleCheckBoxChange = (
    e: Event,
    checkedVal: boolean,
    name: string,
  ): void => {
    if (name === 'type') {
      this.setState({
        [name]: checkedVal ? ROOT_NODE_TYPE : ORDINARY_NODE_TYPE,
      });

      return;
    }

    this.setState({ [name]: checkedVal });
  };

  handleChangeTabs = (event: Event, value: number): void => {
    this.tabNumber = value;
    this.forceUpdate();
  };

  handleTitleChange = (e: Event): void => {
    const { value: title } = (e.target: window.HTMLInputElement);
    this.setState({ title });
  };

  handleEditorChange = (text: string): void => {
    this.setState({ text });
  };

  handleSelectChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const selectMenu = name === 'linkStyle' ? LINK_STYLES : NODE_PRIORITIES;
    const index = selectMenu.findIndex((style) => style === value);

    this.setState({ [name]: index + 1 });
  };

  handleKeyPressed = (e: KeyboardEvent): void => {
    const isSavingCombination = e.keyCode === KEY_S && (e.ctrlKey || e.metaKey);

    if (isSavingCombination) {
      e.preventDefault();
      this.applyChanges();
    }
  };

  handleGroupRolesChange = (newGroupRoles): void => {
    this.setState({ groupRoles: newGroupRoles });
  };

  render() {
    const {
      isVisitOnce = false,
      isEnd,
      type,
      title,
      linkStyle,
      priorityId,
      text,
      info,
      annotation,
    } = this.state;
    const { classes, nodeId, mapId, node } = this.props;

    if (!node) {
      return (
        <CircularSpinnerWithText
          text="Data is being fetched..."
          large
          centered
        />
      );
    }

    // these are needed for TinyMCE to 'dis-control' the initialize
    // the editor text
    const initialText = text;
    const initialInfoText = info;
    const initialAnnotationText = annotation;
    // const initialText = node.text;
    // const initialInfoText = node.info;
    // const initialAnnotationText = node.annotation;

    return (
      <Container>
        <Header>
          <ControlsDeleteContainer>
            <Title>Advanced Node Editor</Title>
            <Button
              color="default"
              variant="contained"
              className={classes.button}
              onClick={this.deleteNode}
            >
              Delete
            </Button>
          </ControlsDeleteContainer>
          <div>
            <Button
              color="default"
              variant="contained"
              className={classes.button}
              onClick={redirectToPlayer(mapId, nodeId)}
            >
              <Triangle>&#9658;</Triangle>
              Preview
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={this.applyChanges}
            >
              Save
            </Button>
          </div>
        </Header>
        <Paper className={classes.paper}>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={this.tabNumber}
            onChange={this.handleChangeTabs}
          >
            <Tab label="Main" />
            <Tab label="Secondary" />
            <Tab label="Permissions" />
          </Tabs>
        </Paper>
        <ScrollingContainer>
          <TabContainer>
            {
              [
                <MainTab
                  title={title}
                  text={initialText}
                  type={type}
                  isEnd={isEnd}
                  isVisitOnce={isVisitOnce}
                  x={node.x}
                  y={node.y}
                  id={node.id}
                  handleEditorChange={this.handleEditorChange}
                  handleCheckBoxChange={this.handleCheckBoxChange}
                  handleTitleChange={this.handleTitleChange}
                  handleKeyDown={this.handleKeyPressed}
                />,
                <SecondaryTab
                  nodeId={nodeId}
                  info={initialInfoText}
                  annotation={initialAnnotationText}
                  linkStyle={linkStyle}
                  priorityId={priorityId}
                  handleEditorChange={this.handleEditorChange}
                  handleSelectChange={this.handleSelectChange}
                  handleKeyDown={this.handleKeyPressed}
                />,
                <PermissionsTab
                  node={node}
                  handleGroupRolesChange={this.handleGroupRolesChange}
                />,
              ][this.tabNumber]
            }
          </TabContainer>
        </ScrollingContainer>
      </Container>
    );
  }
}

// const mapStateToProps = (
//   { defaults, map: { nodes, isDeleting } },
//   {
//     match: {
//       params: { mapId, nodeId },
//     },
//   },
// ) => {
const mapStateToProps = (state, ownProps) => {
  const groups = state.defaults.groups;

  let props = {
    node: state.map.nodes[0],
    mapId: Number(ownProps.match.params.mapId),
    nodeId: Number(ownProps.match.params.nodeId),
    isDeleting: state.map.isDeleting,
  };

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  ACTION_GET_GROUPS_REQUESTED: () => {
    dispatch(mapActions.ACTION_GET_GROUPS_REQUESTED());
  },
  ACTION_GET_ROLES_REQUESTED: () => {
    dispatch(mapActions.ACTION_GET_ROLES_REQUESTED());
  },
  ACTION_GET_NODE_REQUESTED: (mapId: number, nodeId: number) => {
    dispatch(mapActions.ACTION_GET_NODE_REQUESTED(mapId, nodeId));
  },
  ACTION_UPDATE_NODE: (
    nodeData: NodeType,
    isShowNotification: boolean,
    mapIdFromURL: number,
  ) => {
    dispatch(
      mapActions.ACTION_UPDATE_NODE(nodeData, isShowNotification, mapIdFromURL),
    );
  },
  ACTION_DELETE_NODE_MIDDLEWARE: (
    mapId: number,
    nodeId: number,
    nodeType: number,
  ) => {
    dispatch(
      wholeMapActions.ACTION_DELETE_NODE_MIDDLEWARE(mapId, nodeId, nodeType),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(AdvancedNodeEditor)));
