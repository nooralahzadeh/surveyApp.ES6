import React, {Component} from 'react';
import SurveyQuestionMatrixRow from './SurveyQuestionMatrixRow';
import * as Redux from 'react-redux';
class SurveyQuestionMatrix extends Component{


  constructor(props){
    super(props);
    this.question = props.question;
  }

  render(){
    var firstTH = this.question.rows.length>0 ? <th></th> : null;
    var {data} =this.props;

    //update if it has been answred before

    var previous_row_values=data.filter(element => element.title === this.question.title);
    if(previous_row_values.length>0){
      this.question.rows=previous_row_values[0].rows
    }

        var headers = [];
        for (var i = 0; i < this.question.columns.length; i++) {
            var column = this.question.columns[i];
            var key = "column" + i;
            var columText = column.text;
            headers.push(<th key={key}>{columText}</th>);
        }
        var rows = [];

        for (var i = 0; i < this.question.rows.length; i++) {
            var row = this.question.rows[i];
            var key = "row" + i;

            rows.push(<SurveyQuestionMatrixRow key={key} question={this.question} row={row} isFirst={i == 0} />);
        }
        return (
            <table>
                <thead>
                    <tr>
                        {firstTH}
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
           </table>
        );
  }

}

export default Redux.connect(
  (state) => {
    return state;
  }
)(SurveyQuestionMatrix);
