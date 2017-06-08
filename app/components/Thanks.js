import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
var {hashHistory} = require('react-router');


class Thanks extends React.Component{
  onLogout(e) {
      var {dispatch} = this.props;
      e.preventDefault();
      dispatch(actions.startLogout());
      hashHistory.push('/');
    }
  onNew(e){
    e.preventDefault();
    hashHistory.push('/surveys');
  }

  render() {
    return (
      <div>
      <div className="page-actions">
        <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
      </div>
        <h1 className="page-title">Your answer has been submitted</h1>
        <div className="row">
          <div className="columns small-centered large-10">
            <div className="callout warning">
              <h3>Thanks for your collaboration!</h3>
            </div>
           <button className="hollow button" href="#"  onClick={this.onNew.bind(this)}>Start another survey or Edit survey</button>
         </div>
      </div>
    </div>
    );
  }
};

export default Redux.connect(
  (state) => {
    return  state;

  }
)(Thanks);
