import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CarQuotes from './components/CarQuotes';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CarQuotes />
      </Provider>
    );
  };
}

export default App;
