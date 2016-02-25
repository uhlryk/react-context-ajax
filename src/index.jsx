import React from 'react';
import Request from './request';

class ContextAjax extends React.Component {

  static propTypes = {
    baseUrl: React.PropTypes.string,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string,
    headers: React.PropTypes.object,
    callback: React.PropTypes.func
  };

  static childContextTypes = {
    request: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.request = new Request(props);
  }

  getChildContext() {
    return {
      request: this.request
    }
  }

  render() {
    return this.props.children;
  }
}

export default ContextAjax;

