import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export class Login extends React.Component{

  constructor(props){
    super(props);
    this.onLogin=this.onLogin.bind(this);
  }
  onLogin() {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  }
  render() {
    return (
      <div>
        <h1 className="page-title">Survey App</h1>

        <div className="row">
          <div className="columns small-centered large-10">
            <div className="callout warning">
              <h3>Guidline</h3>
              <p> Please read the following instructions to select a category for each word pair in the next slides.</p>
              <p>Each slide contains a target word at the top and the 10-most-similar words provided by the model in the grid (predicted words). You should consider a target word and a predicted word as a pair and select one of the following categories. Each category is denoted by its abbreviation in the slide. For example for "Synonyms" you will have "SYN".</p>
  <p>  There are 100 slides in total and in each one there are 10 word pairs. Using "Next" and "Back" you can navigate if you have chosen a category for all pairs in the slide. At the end you will find a "Submit" button to send the results.</p>

    <p>The categories are describes below. In all the following the examples the first word in a pair is the target word and the second one is the predicted word.</p>

    <p>1.	Spelling Variant (SPL):  The prediction is an abbreviation or there are differences between prediction and target word because of hyphenation. Example: commander:cmdr, bioscience: bio-science</p>

    <p>2.	Alternative or derived form (ALT):  Inflections or derivations. The prediction is alternative or derived form of the target word.  Example: verb.+er ( provide:provider), Comparative degree ( strong:stronger), verb.+ation (continue:continuation), plural (student:students)</p>

  <p>  3.	Synonym (SYN):  The prediction is a synonym of the target word. Example: sofa:couch, plan:scheme</p>

  <p>  4.	Antonym (ANT):  The prediction is an antonym of a target term. Example: survival:death, cheap:expensive</p>

    <p>5.	Hypernym (HPR):  The prediction is a more general category of the target term. Example: red:color, apple:fruit</p>

  <p>  6.	Hyponym (HPO): The prediction is a more specific type of the target term. Example: color:red, fruit:apple </p>

  <p>  7.	Co-Hyponym (CHP):  The prediction and target term share a common hypernym. Example: red:white,  apple:pear</p>

  <p>  8.	Holonym (HOL): The prediction denotes a whole whose part is denoted by the target term. Example: player:team, engine:car</p>

  <p>  9.	Meronym (MRN): The prediction is a part of the target term. Example: team:player, car:engine</p>

  <p>  10.	Related(REL): Prediction and target term are semantically related. Example: goal:football, icecream:spoon</p>

  <p>11.	Unrelated (UNR): The association between prediction and target term is unknown, they are semantically unrelated  </p>
            </div>
              </div>
      <div className="row">
        <div className="columns small-centered small-4 large-4">
            <div className="callout secondary">
              <h3>Login</h3>
              <p>
                Login with Google account below.
              </p>
              <button className="button" onClick={this.onLogin}>Login With Google</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
};

export default Redux.connect()(Login);
