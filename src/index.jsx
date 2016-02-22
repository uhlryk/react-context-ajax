import React from 'react';
import Request from './request';

class ContextAjax extends React.Component {

  static propTypes = {
    baseUrl: React.PropTypes.string
  };

  static childContextType = {
    request: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.request = new Request(props.baseUrl);
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

