import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopicList from '../views/topicList/index'
import TopicDetail from '../views/topicDetail/index'


export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/list" />} exact />
    <Route path="/list" component={TopicList} />
    <Route path="/detail" component={TopicDetail} />
  </Switch>
)
