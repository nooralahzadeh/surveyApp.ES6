import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-material-design/dist/css/bootstrap-material-design.css";

import React, {Component} from 'react';
import * as Survey from 'survey-react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


class MySurvey extends Component {


  onLogout(e) {
      var {dispatch} = this.props;
      e.preventDefault();
      dispatch(actions.startLogout());
    }

sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    console.log(survey.data);
    var {dispatch,surveyJson} = this.props;
    dispatch(actions.startAddSurvey(surveyJson,survey.data));
  }

  savePartailToServer(survey) {
       var resultAsString = JSON.stringify(survey.data);
       console.log(survey.data);
       var {dispatch,surveyJson} = this.props;
       dispatch(actions.startAddSurvey(surveyJson,survey.data));
       //dispatch(actions.startAddSurveys());
  }



  render() {

    var{surveyJson,data}= this.props;
    const surveyJSON= require(`../../data/${surveyJson}.json`);
  // Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  // Survey.Survey.cssType = "bootstrap";
  Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
  Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
  Survey.Survey.cssType = "bootstrapmaterial";
    var survey = new Survey.Model(surveyJSON);
    var myCss = {
        matrix: {root: "table table-striped", }
      };
    survey.showProgressBar = "top";
    survey.sendResultOnPageNext=true;
    //survey.surveyId='ffe8fb85-4d48-49cc-9eac-b729803a4721';
    //survey.surveyPostId='a155f514-e1e2-4958-8b1b-330dc4697b66';
    survey.data=data;
    return (
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
                <div className="survey-skin">
                  <Survey.Survey model={survey}  css={myCss} onPartialSend={this.savePartailToServer.bind(this)} onComplete={this.sendDataToServer.bind(this)}/>
                </div>
              </div>
            </div>
    </div>
  </div>

    );
  }
}



export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      surveyJson: state.surveyJson,
      surveys:state.surveys,
      data:state.data
    }
  }
)(MySurvey);
