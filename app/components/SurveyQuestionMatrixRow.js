import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class SurveyQuestionMatrixRow extends Component{
  constructor(props){
    super(props);
    this.question = props.question;
    this.row = props.row;
    this.isFirst = props.isFirst;
    this.handleOnChange = this.handleOnChange.bind(this);

  }

  handleOnChange(event) {
        this.row.value = event.target.value;
        this.setState({ value: this.row.value });
        var {dispatch} = this.props;
        dispatch(actions.updateAnswer(this.question));
    }

  // componentWillReceiveProps(nextProps) {
  //         super.componentWillReceiveProps(nextProps);
  //         this.question = nextProps.question;
  //         this.row = nextProps.row;
  //         this.isFirst = nextProps.isFirst;
  //     }


  render(){
      if (!this.row) return null;

      var firstTD = <td>{this.row.text}</td>;


      var tds = [];
         for (var i = 0; i < this.question.columns.length; i++) {
             var column = this.question.columns[i];
             var key = "value" + i;
             var isChecked = this.row.value == column.value;
             var inputId = this.isFirst && i == 0 ? this.question.inputId : null;
             var labelStyle = { margin: '0', position: 'absolute' };
             var itemStyle={};
             var td =
                 <td key={key}>
                     <label  style={labelStyle}>
                         <input id={inputId} type="radio"  name={this.row.text}
                                value={column.value} checked={isChecked}
                                onChange={this.handleOnChange}/>

                     </label>
                 </td>;
             tds.push(td);
         }


        return (<tr>{firstTD}{tds}</tr>);



  }


}

export default Redux.connect(
  (state) => {
    return  state;

  }
)(SurveyQuestionMatrixRow);
