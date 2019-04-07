import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api.js';


class Tip extends Component {

  render() {
    return (
      <div className="Tip">
        <header className="Tip-header">
          <h2>{this.props.title}</h2>
        </header>
        <p>
          {this.props.text}
        </p>
      </div>
    );
  }
}
  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      position: {},
    }
  }

  componentDidMount() {
    this.updateTips();
  }

  updateTips() {
    api.get("tips/")
    .then(results => {
      let tips = results.data.map((tip) => {
        return(
          <Tip
            key={tip.id}
            title={tip.title}
            text={tip.text}
          />
        )
      })
      this.setState({
        tips: tips,
      });
    })
    .catch(err => console.log("fetch error", err))
  }


  render() {
    return (
      <div className="App">
        <div className="Tips-list">
          {this.state.tips}
        </div>
      </div>
    );
  }
}

export default App;
