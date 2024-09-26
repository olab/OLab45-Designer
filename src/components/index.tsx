// @flow
import React, { PureComponent, Suspense, lazy, Box } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Notify } from 'react-redux-notify';

import Login from './Login';
import Home from './Home';

const Constructor = lazy(() =>
  import(/* webpackChunkName: "olab-editor" */ './Constructor'),
);
const CounterGrid = lazy(() =>
  import(/* webpackChunkName: "olab-editor" */ './CounterGrid'),
);
const NodeGrid = lazy(() =>
  import(/* webpackChunkName: "olab-editor" */ './NodeGrid'),
);

import PageNotFound from './404';
import Header from './Header';
import SOEditor from './SOEditor';
import MapDetails from './MapDetails';
import AdvancedNodeEditor from './AdvancedNodeEditor';

import QuestionResponses from './SOEditor/QuestionResponses';
import Questions from './SOEditor/Questions';
import Files from './SOEditor/Files';
import Constants from './SOEditor/Constants';
import Counters from './SOEditor/Counters';
import { SCOPED_OBJECTS, config } from '../config';
import * as authActions from '../redux/login/action';

import * as wholeMapActions from '../middlewares/app/action';
import type { IAppProps, IProtectedRouteProps } from './types';
import 'react-redux-notify/dist/ReactReduxNotify.css';

const ProtectedRoute = ({
  component: Component,
  isAuth,
  path,
  exact,
  ...rest
}: IProtectedRouteProps) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      isAuth ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect push to={`${config.APP_BASEPATH}/login`} />
      )
    }
  />
);

export class App extends PureComponent<IAppProps> {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange(event): void {
    try {
      const { newValue } = event;
      const { ACTION_SYNC_NODE_MIDDLEWARE } = this.props;
      const { nodeId, mapId, actionType } = JSON.parse(newValue);

      ACTION_SYNC_NODE_MIDDLEWARE(mapId, nodeId, actionType);
    } catch (error) {
      if (error && error.message) {
        console.log(error.message);
      }
    }
  }

  handleLogout(): void {
    const { ACTION_USER_AUTH_LOGOUT } = this.props;
    ACTION_USER_AUTH_LOGOUT();
  }

  render() {
    const { isAuth, history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          {isAuth && <Header handleLogout={this.handleLogout} />}
          <Switch>
            <Route
              exact
              path={`${config.APP_BASEPATH}/login`}
              component={Login}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/:mapId`}
              component={Constructor}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/:mapId/:nodeId/ane`}
              component={AdvancedNodeEditor}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/:mapId/countergrid`}
              component={CounterGrid}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/:mapId/mapdetails`}
              component={MapDetails}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/:mapId/nodegrid`}
              component={NodeGrid}
            />
            <ProtectedRoute exact isAuth={isAuth} path="/" component={Home} />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${config.APP_BASEPATH}/scopedObject/:scopedObjectType`}
              component={SOEditor}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.CONSTANT.name.toLowerCase()}/:scopedObjectId`}
              component={Constants}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.CONSTANT.name.toLowerCase()}/add`}
              component={Constants}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.COUNTER.name.toLowerCase()}/:scopedObjectId`}
              component={Counters}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.COUNTER.name.toLowerCase()}/add`}
              component={Counters}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.FILE.name.toLowerCase()}/:scopedObjectId`}
              component={Files}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.FILE.name.toLowerCase()}/add`}
              component={Files}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.QUESTION.name.toLowerCase()}/:scopedObjectId`}
              component={Questions}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.QUESTION.name.toLowerCase()}/add`}
              component={Questions}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.QUESTIONRESPONSES.name.toLowerCase()}/:scopedObjectId`}
              component={QuestionResponses}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path={`${
                config.APP_BASEPATH
              }/scopedObject/${SCOPED_OBJECTS.QUESTIONRESPONSES.name.toLowerCase()}/add`}
              component={QuestionResponses}
            />
            <ProtectedRoute
              exact
              isAuth={isAuth}
              path="*"
              component={PageNotFound}
            />
          </Switch>
        </Suspense>
        <Notify />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({ user: { isAuth }, map: { nodes } }) => ({
  isAuth,
  nodes,
});

const mapDispatchToProps = (dispatch) => ({
  ACTION_USER_AUTH_LOGOUT: () => {
    dispatch(authActions.ACTION_USER_AUTH_LOGOUT());
  },
  ACTION_SYNC_NODE_MIDDLEWARE: (
    mapId: number,
    nodeId: number,
    actionType: string,
  ) => {
    dispatch(
      wholeMapActions.ACTION_SYNC_NODE_MIDDLEWARE(mapId, nodeId, actionType),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
