// @flow
import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, Menu, Button } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import type { INavigationProps, INavigationState } from './types';

import { getStringToUrlPath } from './utils';

import { SCOPED_OBJECTS, MAP_MENU_ITEMS } from '../../config';

import styles from './styles';

class NavigationBar extends PureComponent<INavigationProps, INavigationState> {
  state: INavigationState = {
    anchorEl: null,
    anchorElMapMenu: null,
    anchorElToolsMenu: null,
  };

  handleClick = (event: Event): void => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMyMapDropdownClick = (event: Event): void => {
    event.preventDefault();
    this.setState({ anchorElMapMenu: event.currentTarget });
  }

  handleToolsClick = (event: Event): void => {
    this.setState({ anchorElToolsMenu: event.currentTarget });
  }

  handleClose = (): void => {
    this.setState({
      anchorEl: null,
      anchorElMapMenu: null,
      anchorElToolsMenu: null,
    });
  }

  handleClickHelp = (): void => {
    this.setState({
      anchorEl: null,
      anchorElMapMenu: null,
      anchorElToolsMenu: null,
    });
    window.open('https://olab4.gitbook.io/help/', '_blank', 'noreferrer');
  }

  render() {
    const { anchorEl, anchorElMapMenu, anchorElToolsMenu } = this.state;
    const { classes, mapId } = this.props;

    // eslint-disable-next-line no-unused-vars
    const processEnv = process.env;

    return (
      <>
        <div className={classes.wrapper}>
          {mapId && (
            <>
              <Button
                className={classes.link}
                component={Link}
                to={`/${mapId}`}
              >
                My Map
                <ExpandMoreIcon
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={this.handleMyMapDropdownClick}
                />
              </Button>
              <Menu
                anchorEl={anchorElMapMenu}
                keepMounted
                open={Boolean(anchorElMapMenu)}
                onClose={this.handleClose}
                className={classes.mapMenu}
              >
                {Object.values(MAP_MENU_ITEMS).map(item => (
                  <MenuItem
                    key={item}
                    onClick={this.handleClose}
                    className={classes.menuItem}
                    component={Link}
                    to={`/${mapId}/${getStringToUrlPath(item)}`}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          <Button
            aria-controls="menu"
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.button}
          >
            Objects
            <ExpandMoreIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            className={classes.menu}
          >
            {Object.values(SCOPED_OBJECTS).filter(item => item.showInNavBar).map(SOName => (
              <MenuItem
                disabled={!SOName.showInNavBar}
                key={SOName.name}
                onClick={this.handleClose}
                className={classes.menuItem}
                component={Link}
                to={`/scopedObject/${SOName.name.toLowerCase()}`}
              >
                {`${SOName.name}s`}
              </MenuItem>
            ))}
          </Menu>

          <Button
            aria-controls="menu"
            aria-haspopup="true"
            onClick={this.handleToolsClick}
            className={classes.button}
          >
            Tools
            <ExpandMoreIcon />
          </Button>

          <Menu
            anchorEl={anchorElToolsMenu}
            keepMounted
            open={Boolean(anchorElToolsMenu)}
            onClose={this.handleClose}
            className={classes.menu}
          >
            <MenuItem
              onClick={this.handleClickHelp}
              className={classes.menuItem}
            >
              Help
            </MenuItem>
            <MenuItem
              onClick={this.handleClickAbout}
              className={classes.menuItem}
            >
              About
            </MenuItem>
          </Menu>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ mapDetails }, { location: { pathname } }) => {
  const [, mapIdFromLocation] = pathname.split('/');
  const mapId = mapDetails.id || Number(mapIdFromLocation) || null;

  return { mapId };
};

export default withRouter(connect(mapStateToProps)(
  withStyles(styles)(NavigationBar),
));
