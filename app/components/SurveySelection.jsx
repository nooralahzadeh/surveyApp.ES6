import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
var {hashHistory} = require('react-router');

class SurveySelection extends Component{

  constructor(props){
    super(props);
    this.state={
      selectedOption: props.selectedOption
    };
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
    var {dispatch} = this.props;
    dispatch(actions.setSurveyJsonName(e.target.value));
  }

  handleFormSubmit(e) {
    e.preventDefault();

    console.log('NEXT');
    var{discipline,surveys, dispatch}= this.props;

    console.log(discipline);

    var user_descipline_data = surveys.filter(element=> {if (element.discipline === discipline) return element});
    console.log(user_descipline_data);
    if (user_descipline_data.length>0){
        //   var lastUpdate=Math.max.apply(Math,user_descipline_data.map(function(item){return item.createdAt;}))
         //var data = user_descipline_data.filter(element=> {if (element.createdAt === lastUpdate) return element});
         console.log(user_descipline_data[0].data);
            if(user_descipline_data[0].data!==undefined){
               dispatch(actions.setData(user_descipline_data[0].data));
             }
      }else{
        dispatch(actions.startAddSurvey(discipline,{}));
      }

     //update state with added survey
      dispatch(actions.startAddSurveys());
         hashHistory.push('/survey');
       }

  onLogout(e) {
      var {dispatch} = this.props;
      e.preventDefault();
      dispatch(actions.startLogout());
      hashHistory.push('/');
    }


  render() {
    var {dispatch} = this.props;
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <h2 className="page-title">Discipline Selection</h2>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
                <div className="callout secondary">
                  <p>
                    Please select one of the following disiplines to do survey!
                  </p>
            <form onSubmit={this.handleFormSubmit.bind(this)}>
              <div class="radio">
                  <label>
                    <input type="radio" value="all" checked={this.state.selectedOption === 'all'} onChange={this.handleOptionChange.bind(this)} />
                    All Disciplines
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="drilling_fluids" checked={this.state.selectedOption === 'drilling_fluids'} onChange={this.handleOptionChange.bind(this)} />
                    Drilling Fluids
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="drilling" checked={this.state.selectedOption === 'drilling'} onChange={this.handleOptionChange.bind(this)} />
                    Drilling
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="enhanced_oil_recovery" checked={this.state.selectedOption === 'enhanced_oil_recovery'} onChange={this.handleOptionChange.bind(this)} />
                    Enhanced Oil Recovery
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="formation_evaluation" checked={this.state.selectedOption === 'formation_evaluation'} onChange={this.handleOptionChange.bind(this)} />
                    Formation Evaluation
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="geology" checked={this.state.selectedOption === 'geology'} onChange={this.handleOptionChange.bind(this)} />
                    Geology
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="geophysics" checked={this.state.selectedOption === 'geophysics'} onChange={this.handleOptionChange.bind(this)} />
                    Geophysics
                  </label>
                  </div>


                  <div class="radio">
                  <label>
                    <input type="radio" value="heavy_oil" checked={this.state.selectedOption === 'heavy_oil'} onChange={this.handleOptionChange.bind(this)} />
                    Heavy Oil
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="production_logging" checked={this.state.selectedOption === 'production_logging'} onChange={this.handleOptionChange.bind(this)} />
                    Production Logging
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="production_testing" checked={this.state.selectedOption === 'production_testing'} onChange={this.handleOptionChange.bind(this)} />
                    Production Testing
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="reservoir_characterization" checked={this.state.selectedOption === 'reservoir_characterization'} onChange={this.handleOptionChange.bind(this)} />
                    Reservoir Characterization
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="shale_gas" checked={this.state.selectedOption === 'shale_gas'} onChange={this.handleOptionChange.bind(this)} />
                    Shale Gas
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="well_completions" checked={this.state.selectedOption === 'well_completions'} onChange={this.handleOptionChange.bind(this)} />
                    Well Completions
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="well_testing" checked={this.state.selectedOption === 'well_testing'} onChange={this.handleOptionChange.bind(this)} />
                    Well Testing
                  </label>
                  </div>

                  <div class="radio">
                  <label>
                    <input type="radio" value="well_workover_and_intervention" checked={this.state.selectedOption === 'well_workover_and_intervention'} onChange={this.handleOptionChange.bind(this)} />
                    Well Workover and Intervention
                  </label>
                  </div>
                <button className="hollow button" type="submit">NEXT</button>
            </form>
            </div>
              </div>
            </div>
      </div>
      );
    }
}

SurveySelection.defaultProps={
  selectedOption:""
};

export default Redux.connect(
  (state) => {
    return state;
  }
)(SurveySelection);
