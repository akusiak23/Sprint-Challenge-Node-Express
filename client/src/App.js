import React, { Component } from 'react';
import './App.css';

import Projects from './components/Projects.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Projects:</h1>
          <Projects />
        </header>
        
      </div>
    );
  }
}

export default App;
