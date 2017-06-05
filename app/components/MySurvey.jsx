import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-material-design/dist/css/bootstrap-material-design.css";

import React, {Component} from 'react';
import * as Survey from 'survey-react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import SurveyQuestionMatrix from 'SurveyQuestionMatrix';
import { Steps, Step } from 'react-multistep-component';
var {hashHistory} = require('react-router');



class MySurvey extends Component {

  constructor(props){
    super(props);
    this.savePartailToServer=this.savePartailToServer.bind(this);
    this.stepShouldChange=this.stepShouldChange.bind(this);
    this.onStepChange=this.onStepChange.bind(this);

  }


  onLogout(e) {
      var {dispatch} = this.props;
      e.preventDefault();
      dispatch(actions.startLogout());
      hashHistory.push('/')
    }

sendDataToServer(survey) {
    console.log(survey.data);
    var {dispatch,discipline,surveys} = this.props;
    var current_survey = surveys.filter(element=> {if (element.discipline === discipline) return element});
    var id =current_survey[0].id
    dispatch(actions.startSubmitSurvey(id,survey.data,true));
  }

  savePartailToServer(survey) {
       var resultAsString = JSON.stringify(survey.data);
       var {dispatch,surveys,discipline} = this.props;
       var current_survey = surveys.filter(element=> {if (element.discipline === discipline) return element});
       var id =current_survey[0].id;
       dispatch(actions.startUpdate(id,survey.data));
       alert(survey.currentPageNo);

       //dispatch(actions.startAddSurveys());
  }


onStepChange(stepNumber){
  var{dispatch}=this.props;
  dispatch(actions.onStepChange(stepNumber));
}
  stepShouldChange() {
    var {dispatch,partaialAnswer,surveys,discipline} = this.props;
    var current_survey = surveys.filter(element=> {if (element.discipline === discipline) return element});
    var id =current_survey[0].id;
    console.log(partaialAnswer);
    if(partaialAnswer.rows!== undefined){
    var partialResult={title:partaialAnswer.title, rows:partaialAnswer.rows};
    dispatch(actions.startUpdate(id,partialResult));
    }
    return true;


    }


  render() {

    var {discipline,data,step,dispatch} = this.props;
    const survey_JSON= require(`../../data/${discipline}.json`);
  // Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  // Survey.Survey.cssType = "bootstrap";
  // Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
  // Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
  // Survey.Survey.cssType = "bootstrapmaterial";
  // var mdl = new Survey.Model(survey_JSON);
  // mdl.showProgressBar = "top";
  // mdl.sendResultOnPageNext= true;
  //onComplete={this.sendDataToServer.bind(this)}
  var pages=survey_JSON.pages;
  var submit= (step===pages.length)? <button className="hollow button success" href="#">Submit</button>:'';
  var questions=pages.map((item,index)=>
    <Step key={index}>
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <div className="container">
            <div className="row">
              <div className="small-3 large-3 columns "><h6>SPL: <small>Spelling Variant</small></h6></div>
              <div className="small-3 large-3 columns "><h6>ALT: <small>Alternative or derivation form</small></h6></div>
              <div className="small-3 large-3 columns "><h6>SYN: <small>Synonym </small></h6></div>
                <div className="small-3 large-3 columns "><h6>ANT: <small>Antonyms </small></h6></div>
            </div>
            <div className="row">
              <div className="small-3 large-3 columns "><h6>HPR: <small> Hypernyms </small></h6></div>
              <div className="small-3 large-3 columns "><h6>HPO: <small> Hyponyms </small></h6></div>
               <div className="small-3 large-3 columns "><h6>CHP: <small> Co-Hyponyms </small></h6></div>
              <div className="small-3 large-3 columns "><h6>HOL: <small> Holonyms </small></h6></div>
            </div>

            <div className="row">
              <div className="small-3 large-3 columns "><h6>MRN: <small> Meronyms </small></h6></div>
              <div className="small-3 large-3 columns "><h6>REL: <small> Related </small></h6></div>
              <div className="small-3 large-3 columns "><h6>UNR: <small> Unrelated </small></h6></div>
              <div className="small-3 large-3 columns "><h6></h6></div>
            </div>
          </div>
    <hr/>
        <div className="row align-center">
              <div className="columns small-3 ">
                  <div className="container">
                  <div>
                      <h5>{item.questions[0].title}</h5>
                      <SurveyQuestionMatrix key={index} question={item.questions[0]}/>
                  </div>
                  </div>
                </div>
        </div>
      </div>
      <div className="page-actions">
        {submit}
      </div>
    </Step>
    );

  //dispatch(actions.startUpdateSurvey(id,mdl.data));
  //console.log(mdl.data);


    return (

      <Steps
          currentStep={1}
          prevButton='&#8592;'
          nextButton='&#8594;'
          stepShouldChange={this.stepShouldChange}
          onStepChange={this.onStepChange}
          mountOnlySiblings={true}
          >
          {}
      {questions}
    </Steps>


    );
  }
}




export default Redux.connect(
  (state) => {
    return  state;

  }
)(MySurvey);
