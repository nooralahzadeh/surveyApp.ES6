import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-material-design/dist/css/bootstrap-material-design.css";

import React, {Component} from 'react';
import * as Survey from 'survey-react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import SurveyQuestionMatrix from 'SurveyQuestionMatrix';
import { Steps, Step } from 'react-multistep-component';
import ReactTooltip from 'react-tooltip'
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

onSubmit(){
  var{dispatch,partaialAnswer,surveys,discipline}=this.props;
  var current_survey = surveys.filter(element=> {if (element.discipline === discipline) return element});
  var id =current_survey[0].id;
  if(partaialAnswer.rows!== undefined){
  dispatch(actions.startSubmitSurvey(id,partaialAnswer.title,partaialAnswer.rows,true));
  }
  hashHistory.push('/thanks');

}

onStepChange(stepNumber){
  var{dispatch}=this.props;
  dispatch(actions.onStepChange(stepNumber));
}

stepShouldChange() {
    var {dispatch,partaialAnswer,surveys,discipline} = this.props;
    var current_survey = surveys.filter(element=> {if (element.discipline === discipline) return element});
    var id =current_survey[0].id;
    if(partaialAnswer.rows!== undefined){
    dispatch(actions.startAddUpdate(id,partaialAnswer.title,partaialAnswer.rows));
    }
    return true;
    }


  render() {

    var {discipline,data,step,dispatch} = this.props;
    console.log(`./${discipline}.json`);
    const survey_JSON= require(`./${discipline}.json`);
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
  var submit= (step===pages.length)? <button className="hollow button success" href="#"  onClick={this.onSubmit.bind(this)}>Submit</button>:'';
  var questions=pages.map((item,index)=>
    <Step key={index}>
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <div className="container">
            <div className="row">
              <div className="small-3 large-3 columns "><h6 data-tip data-for="SLP">SPL: <small>Spelling Variant</small> </h6> <ReactTooltip id='SLP' ><p>The prediction is an abbreviation or there are differences between prediction and target word because of hyphenation.</p><p> Example: commander:cmdr, bioscience: bio-science</p></ReactTooltip> </div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="ALT">ALT: <small>Alternative or derivation form</small> </h6><ReactTooltip id='ALT' ><p>Inflections or derivations. The prediction is alternative or derived form of the target word</p> <p>Example: verb.+er ( provide:provider), Comparative degree ( strong:stronger), verb.+ation (continue:continuation), plural (student:students)</p></ReactTooltip></div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="SYN">SYN: <small>Synonym </small></h6> <ReactTooltip id='SYN' ><p>The prediction is a synonym of the target word.</p><p> Example: sofa:couch, plan:scheme</p></ReactTooltip></div>
                <div className="small-3 large-3 columns "><h6 data-tip data-for="ANT">ANT: <small>Antonyms </small></h6><ReactTooltip id='ANT' ><p>The prediction is an antonym of a target term. </p><p> Example: survival:death, cheap:expensive</p></ReactTooltip></div>
            </div>
            <div className="row">
              <div className="small-3 large-3 columns "><h6 data-tip data-for="HPR">HPR: <small> Hypernyms </small></h6><ReactTooltip id='HPR' ><p>The prediction is a more general category of the target term.</p><p> Example: red:color, apple:fruit</p></ReactTooltip></div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="HPO">HPO: <small> Hyponyms </small></h6><ReactTooltip id='HPO' ><p>The prediction is a more specific type of the target term.</p><p> Example: color:red, fruit:apple</p></ReactTooltip></div>
               <div className="small-3 large-3 columns "><h6 data-tip data-for="CHP">CHP: <small> Co-Hyponyms </small></h6><ReactTooltip id='CHP' ><p>The prediction and target term share a common hypernym.</p><p> Example: red:white, apple:pear</p></ReactTooltip></div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="HOL">HOL: <small> Holonyms </small></h6><ReactTooltip id='HOL' ><p>The prediction denotes a whole whose part is denoted by the target term.</p><p> Example: player:team, engine:car</p></ReactTooltip></div>
            </div>

            <div className="row">
              <div className="small-3 large-3 columns "><h6 data-tip data-for="MRN">MRN: <small> Meronyms </small></h6><ReactTooltip id='MRN'><p>The prediction is a part of the target term.</p><p>Example: team:player, car:engine</p></ReactTooltip></div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="REL">REL: <small> Related </small></h6><ReactTooltip id='REL' ><p>Prediction and target term are semantically related. </p><p>Example: goal:football, icecream:spoon</p></ReactTooltip> </div>
              <div className="small-3 large-3 columns "><h6 data-tip data-for="UNR">UNR: <small> Unrelated </small></h6><ReactTooltip id='UNR' ><span>The association between prediction and target term is unknown, they are semantically unrelated</span></ReactTooltip> </div>
              <div className="small-3 large-3 columns "><h6></h6></div>
            </div>
          </div>
    <hr/>
        <div className="row align-center">
              <div className="columns small-3 ">
                  <div className="container">
                  <div>
                      <h5><span style={{"fontSize":"14x", "color":"gray"}}> Target: </span> <small>{item.questions[0].title}</small></h5>
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
