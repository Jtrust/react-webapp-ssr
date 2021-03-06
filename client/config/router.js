import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopicList from '../views/topicList/Index'
import TopicDetail from '../views/topicDetail/Index'


export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/list" />} exact />
    <Route path="/list" component={TopicList} />
    <Route path="/detail/:id" component={TopicDetail} />
  </Switch>
)
