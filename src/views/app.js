import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Switch, Route } from 'react-router-dom';

// Components
import Loader from '../components/loader';
import Login from './login';
import Register from './register';
import Main from './main';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Loader />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/main' component={Main} />
        </Switch>
      </React.Fragment>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
