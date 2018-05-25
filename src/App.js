import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Movies from './components/Movies/Movies';

import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Movies/>
      </Provider>
    );
  }
}

export default App;
