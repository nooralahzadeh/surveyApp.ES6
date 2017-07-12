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
    this.state = {
      checked:false
    };

  }

  handleOnChange(event) {
        this.row.value = event.target.value;

        if(this.state.checked !== event.target.checked) {
        this.setState({
          checked:event.target.checked
        });

     }
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

  unCheckIt() {
      this.setState({
        checked:false
      });
    }

  render(){
      if (!this.row) return null;

      var firstTD = <td>{this.row.text}</td>;


      var tds = [];
         for (var i = 0; i < this.question.columns.length; i++) {
             var column = this.question.columns[i];
             var key = "value" + i;
             var isChecked = (this.row.value == column.value && this.state.checked);
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

         var deselectButton=<td><a className="button warning tiny"   onClick={this.unCheckIt.bind(this)}>Refresh</a></td>;

        return (<tr>{firstTD}{tds}{deselectButton}</tr>);



  }


}

export default Redux.connect(
  (state) => {
    return  state;

  }
)(SurveyQuestionMatrixRow);
