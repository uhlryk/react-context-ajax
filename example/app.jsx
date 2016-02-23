import React from 'react';
import ReactDOM from 'react-dom';
import Request from '../src/index.jsx';

class SomeComponent extends React.Component {
  static contextTypes = {
    request: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    console.log(this.context.request);
  }

  render() {
    return (<span>test</span>);
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

