import React from 'react';
import Request from './request';

class ContextAjax extends React.Component {

  static propTypes = {
    options: React.PropTypes.object
  };

  static childContextTypes = {
    request: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.request = new Request(props.options);
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

