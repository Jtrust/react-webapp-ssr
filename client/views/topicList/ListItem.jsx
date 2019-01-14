import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import cx from 'classnames'
import { TABS } from '../../util/variable-define'

import { topicPrimaryStyle, topicSecondaryStyle } from './styles'
import formatDate from '../../util/date-format';


const Primary = ({ topic, classes }) => {
  const className = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <span className={classes.root}>
      <span className={className}>{topic.top ? '置顶' : TABS[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </span>
  )
}
const Secondary = ({ topic, classes }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
创建时间
      {' '}
      {formatDate(topic.create_at, 'yy-mm-dd')}
    </span>
  </span>
)

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    {/* <ListItemAvatar> */}
    <Avatar src={topic.author.avatar_url} />
    {/* </ListItemAvatar> */}

    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />

  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem
