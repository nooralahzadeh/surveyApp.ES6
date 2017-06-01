import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import SurveySelection from 'SurveySelection';
import MySurvey from 'MySurvey';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/surveys');
  }

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="surveys" component={SurveySelection} onEnter={requireLogin}/>
      <Route path="survey" component={MySurvey} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
