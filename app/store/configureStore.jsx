import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer,yrsExpReducer, surveyJsonNameReducer,surveysReducer, setDataReducer, updateQuestionReducer,stepChangeReducer} from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    auth: authReducer,
    discipline:surveyJsonNameReducer,
    yrsExp:yrsExpReducer,
    surveys:surveysReducer,
    data:setDataReducer,
    partaialAnswer:updateQuestionReducer,
    step:stepChangeReducer,
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
