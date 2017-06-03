var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};


export var surveyJsonNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SURVEY_JSON_NAME':
      return action.SurveyJsonName;
   case 'LOGOUT':
      return '';
    default:
      return state;
  };
};


export var surveysReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SURVEY':
      return [
        ...state
      ];
    case 'ADD_SURVEYS':
        return [
          ...state,
          ...action.surveys
    ];
    case 'UPDATE_SURVEY':
      console.log(state);
          return state.map((surveyItem) => {
            if (surveyItem.id === action.id) {
              return {
                ...surveyItem,
                ...action.updates
              };
            } else {
              return surveyItem;
            }
          });
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};


export var setDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.data;
    case 'LOGOUT':
      return [];
    default:
      return state;
  };
};
