import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class MainAppBar extends React.Component {
  /*eslint-disable*/
  onHomeIconClick() {

  }

  login() {

  }

  createTopic() {

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.onHomeIconClick.bind(this)}  >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Znode
            </Typography>
            <Button raised="true" variant="outlined" color="inherit" onClick={this.createTopic.bind(this)}>
              新建话题
            </Button>
            <Button color="inherit" onClick={this.login.bind(this)}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/* eslint-enable */

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// 使用withStyles函数,给组件传递classes属性和styles属性值
export default withStyles(styles)(MainAppBar);
