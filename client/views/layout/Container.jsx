import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  },
}

const Container = ({ children, classes }) => (
  <Paper elevation={3} className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default withStyles(styles)(Container);
