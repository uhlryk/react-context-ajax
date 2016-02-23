import React from 'react';
import ReactDOM from 'react-dom';
import Request from '../release/contextAjax.js';

class SomeComponent extends React.Component {
  static contextTypes = {
    request: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    console.log(this.context.request);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Request>
        <SomeComponent></SomeComponent>
      </Request>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

