import React from 'react';
import Request from './request';

class ContextAjax extends React.Component {

  static propTypes = {
    baseUrl: React.PropTypes.string,
    timeout: React.PropTypes.number,
    headers: React.PropTypes.object,
    readyCallback: React.PropTypes.func,
    endCallback: React.PropTypes.func
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

  componentDidMount() {
    if(this.props.readyCallback) {
      this.props.readyCallback(this.request);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ContextAjax;

