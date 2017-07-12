import moment from 'moment';

import firebase, {firebaseRef, Provider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = [];

      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(Provider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};


export var setSurveyJsonName = (SurveyJsonName) => {
  return {
    type: 'SET_SURVEY_JSON_NAME',
    SurveyJsonName
  };
};

export var setYrsEperience = (yrs) => {
  return {
    type: 'SET_YRS_EXPERIENCE',
    yrs
  };
};
export var addSurvey = (survey) => {
  return {
    type: 'ADD_SURVEY',
    survey
  };
};

export var startAddSurvey = (discipline,yrsExp,data) => {
  return (dispatch, getState) => {
    var survey = {
      discipline,
      yrsExp,
      data,
      createdAt: moment().unix(),
      completed:false
    };
    var uid = getState().auth.uid;
    var surveyRef = firebaseRef.child(`users/${uid}/surveys`).push(survey);

    return surveyRef.then(() => {
      dispatch(addSurvey({
        ...survey,
        id: surveyRef.key
      }));
    });
  };
};


export var addSurveys = (surveys) => {
  return {
    type: 'ADD_SURVEYS',
    surveys
  };
};

export var startAddSurveys = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var surveysRef = firebaseRef.child(`users/${uid}/surveys`);
    return surveysRef.once('value').then((snapshot) => {
      var surveys = snapshot.val() || {};
      var parsedSurveys = [];
      Object.keys(surveys).forEach((surveyId) => {
        parsedSurveys.push({
          id: surveyId,
          ...surveys[surveyId]
        });
      });
      dispatch(addSurveys(parsedSurveys));
    });
  };
};


export var setData = (data) => {
  return {
    type: 'SET_DATA',
    data
  };
};


export var updateAnswer = (question) => {
  return {
    type: 'UPDATE_ANSWER',
    question,
  };
};

export var updateYrsExp = (yrsExp) => {
  return {
    type: 'UPDATE_YRSEXP',
    yrsExp,
  };
};

export var onStepChange = (step) => {
    return {
      type:'ON_STEP_CHANGE',
      step
    };
};

export var updateQuestion = (id,update) => {
  return {
    type: 'UPDATE_QUESTION',
    id,
    update
  };
};

export var addQuestion = (id, question) => {
  return {
    type: 'ADD_QUESTION',
    id,
    question
  };
};



export var startAddUpdate = (id,title,rows) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var exDataRef = firebaseRef.child(`users/${uid}/surveys/${id}/data`);
    exDataRef.once('value').then((snapshot) => {
      var exQuestions=[];
      var exData = snapshot.val() ||{};
      Object.keys(exData).forEach((i) => {
          var el={
              id:i,
              title:exData[i].title,
              rows:exData[i].rows
            };
          exQuestions.push(el);
      });
      console.log(exQuestions);
      var filtered=exQuestions.filter(function (q) {
            return q.title===title;
          });

      console.log(filtered);
      if(filtered.length>0){
        var qid=filtered[0].id;
        console.log(qid);
        var questionRef=firebaseRef.child(`users/${uid}/surveys/${id}/data/${qid}`)

        var updates = {
          rows
        };
        return questionRef.update(updates).then(() => {
        dispatch(updateQuestion(id,{title,rows}));
          });

      }
      else
       {
         console.log('creat new question');
        var newQuestion = {
          title,
          rows
        };

        var surveyRef = firebaseRef.child(`users/${uid}/surveys/${id}/data`).push(newQuestion);
        return surveyRef.then(() => {
          dispatch(addQuestion(id, newQuestion));
        });
      }
    });



//
  // console.log(filtered);

  };
};


export var submitSurvey = (id, dataToSave) => {
  return {
    type: 'SUBMIT_SURVEY',
    id,
    dataToSave
  };
};


export var startSubmitSurvey = (id,title,rows,completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;

    var exDataRef = firebaseRef.child(`users/${uid}/surveys/${id}/data`);
    exDataRef.once('value').then((snapshot) => {
      var exQuestions=[];
      var exData = snapshot.val() ||{};
      Object.keys(exData).forEach((i) => {
          var el={
              id:i,
              title:exData[i].title,
              rows:exData[i].rows
            };
          exQuestions.push(el);
      });
      console.log(exQuestions);
      var filtered=exQuestions.filter(function (q) {
            return q.title===title;
          });

      console.log(filtered);
      if(filtered.length>0){
        var qid=filtered[0].id;
        console.log(qid);
        var questionRef=firebaseRef.child(`users/${uid}/surveys/${id}/data/${qid}`)

        var updates = {
          rows
        };
        return questionRef.update(updates).then(() => {
        dispatch(updateQuestion(id,{title,rows}));
          });

      }
      else
       {
         console.log('creat new question');
        var newQuestion = {
          title,
          rows
        };

        var surveyRef = firebaseRef.child(`users/${uid}/surveys/${id}/data`).push(newQuestion);
        return surveyRef.then(() => {
          dispatch(addQuestion(id, newQuestion));
        });
        };
      });

      var ref = firebaseRef.child(`users/${uid}/surveys/${id}`);
      var updates = {
        completed,
        completedAt: completed ? moment().unix() : null
      };

    ref.update(updates).then(() => {
        console.log("submitted");
      });


    }
}




export var startUpdateYrsExp = (id,yrsExp) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var ref=firebaseRef.child(`users/${uid}/surveys/${id}`)
        var updates = {
          yrsExp
        };
        return ref.update(updates).then(() => {
          
          });
        }
    }
