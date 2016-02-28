# REACT Context AJAX
[![Build Status](https://travis-ci.org/uhlryk/react-context-ajax.svg)](https://travis-ci.org/uhlryk/react-context-ajax)
[![Downloads](https://img.shields.io/npm/dt/react-context-ajax.svg)](https://www.npmjs.com/package/react-context-ajax)
[![Downloads](https://img.shields.io/npm/dm/react-context-ajax.svg)](https://www.npmjs.com/package/react-context-ajax)
[![NPM version](https://img.shields.io/npm/v/react-context-ajax.svg)](https://www.npmjs.com/package/react-context-ajax)

This is react wrapper on [superagent](https://www.npmjs.com/package/superagent). 
It is component which should be at top of component hierarchy. It make ajax calls available in all child components.
It allow to config it globally and/or in each call.

## Installation:

### npm

    npm install react-context-ajax

It needs react to work correctly. It is compiled without react at its source.

## Quick start: How to use it

Simplest usage with pure react, with ES6/ES7 syntax and jsx *(In next sections it will also be proposition how to usage this with redux, react, react-router)*

Main root jsx file **app.jsx** :

    import React from 'react';
    import ReactDOM from 'react-dom';
    import Request from 'react-context-ajax';
    import SomeComponent from './someComponent';
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

As you can see you have to do two steps in main file:
 
1. import react-context-ajax:

    import Request from 'react-context-ajax';`

2. Wrap your render jsx components by 'react-context-ajax'(<Request>)

    class App extends React.Component {
    //...
      render() {
        return (
          <Request>
            //your normal components
          </Request>
        );
      }

Now all components inside 'react-context-ajax' (<Request>) can have access to router.

If your component need access to router you need to set `contextTypes`.

Example component **someComponent.jsx**:

    class SomeComponent extends React.Component {
      static contextTypes = {
        request: React.PropTypes.object
      };
      constructor(props) {
        super(props);
      };
      componentWillMount() {
        this.context.request.getRequest('http://yourUrl.com/someParam', { key: 'value'}, (err, res)=>{
          //response from server
        });
      }
      //...
    }

As you can see you have to inform component what context take from parent components:

    static contextTypes = {
      request: React.PropTypes.object
    };

And now you can use router

    this.context.request
    
## Options:

    <Request
      baseUrl={'http://yourDomain.com'}
      callback={this.globalCallbackFunction}
    >
    // children components
    </Request>

### baseUrl

 * type: string
 * required: false
 * default: ''
 
First part of url, where request are send. If all your request have similar part then this part can be set here.

### callback

 * type: function
 * required: false
 
This is global callback which is called after all requests from child components. It is not required. You can handle all
requests in local callback (passed as parameter to request call). More about it in section Global callback

## Global callback
This is function which is passed as prop to Request component.

Callback function get three arguments

    globalCallbackFunction(err, res, done) {
      done();
    }

### err
if everything is ok this value is null. If server return status code 4xx and 5xx or there are connection errors then this value exist.
This is error object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#error-handling)

### res 
All data returned from server. 
This is response object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#response-properties)

### done
this is function. If global callback call it, then this will run local callback. Otherwise local callback will not be invoked.
If done is invoked without params it will run local callback with err and res from global callback.
**You can invoke `done` with own error and response object after you process original data.**
This is handy to get everything in global calback, check received data, and return only processed part 
(or for example if you use router, redirect to error page or login page).




## License
MIT
