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


    import Request from 'react-context-ajax';

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
        this.context.request.getRequest({
          url: 'http://yourUrl.com/someParam', 
          query: { 
            key: 'value'
          }, 
          endCallback: (err, req, res)=>{
            //response from server
          }
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
      headers={this.headerObject}
      endCallback={this.globalCallbackFunction}
    >
    // children components
    </Request>

### baseUrl

 * type: string
 * required: false
 * default: ''
 
First part of url, where request are send. If all your request have similar part then this part can be set here.

### headers

 * type: object
 * required: false
 
Allow to set headers for all request methods. There is also possibility to change global headers using request instance.

### readyCallback

Run after component `componentDidMount` phase and pass to callback request instance.

### endCallback

 * type: function
 * required: false
 
This is global endCallback which is called after ech request from child components. It is not required. You can handle all
requests in local callback (passed as parameter to request call). More about it in section Global endCallback

## Context request methods:

Request object is available in components content:

    this.context.request

And it has methods:

### request()

Return superagent instance.

### addHeader(key, value)

Add next global header (for all request). If user is login you send for each request token in header.
  
### removeHeader(key)

Remove one global header (for all request). For example after user logout we don't want to send token in header

### getRequest(options)
Load data from the server using a HTTP GET request. Return superagent request object.

### postRequest(options)
Load data from the server using a HTTP POST request. Return superagent request object.

### putRequest(options)
Load data from the server using a HTTP PUT request. Return superagent request object.

### deleteRequest(options)
Load data from the server using a HTTP DELETE request. Return superagent request object.

### available options for request methods

#### options.url

 * type: string
 * required: false
 
A string containing the URL to which the request is sent. It is concatenate with baseUrl

Example:

    this.context.request.getRequest({
      url: 'someurl',
    })

#### options.query

 * type: object
 * default: {}  
 * required: false
 
Data that is added as query to url

Example:

    this.context.request.postRequest({
      url: 'someurl',
      query: {
        id: '213241421
      }
    })

#### options.body

 * type: object
 * default: {}
 * required: false

Data that is sent to the server with the request. Not in use for get and delete methods.

Example:

    this.context.request.postRequest({
      url: 'someurl',
      body: {
        name: '213241421,
        something: 'fdsfdsds'
      }
    })

#### options.headers

 * type: object
 * default: {}
 * required: false

Set headers for this request. If header has same key as globally set header, then this header will override it.
If you don't want to sent in this request any global header (but you don't want to remove them globally) you can
set this header here with value null


Example:

    this.context.request.postRequest({
      url: 'someurl',
      headers: {
        'access-token', '1212414fsvsvsdsvdsvsd
      },
      body: {
        name: '213241421,
        something: 'fdsfdsds'
      }
    })

#### options.fields

 * type: object
 * default: {}
 * required: false
 
For Multipart requests. Much like form files inputs in HTML, you can send files to server. 

 
Example:

    this.context.request.postRequest({
      url: 'someurl',
      attachments: {
        file1: 'path/to/myfile.ext',
      },
      fields: {
        field1: 'dsadsa',
        field1: 'vxcxcvxcv'
      }
    })

#### options.attachments

 * type: object
 * default: {}
 * required: false
 
For Multipart requests. Much like form fields in HTML, you can set field values with the fields = { name1: value1, name2: value2 }
 
Example:

    this.context.request.postRequest({
      url: 'someurl',
      attachments: {
        file1: 'path/to/myfile.ext',
        file2: {
          path: 'path/to/secondfile.ext',
        },
        file3: {
          path: 'path/to/thirdfile.ext',
          filename: 'newname.ext2'
        },
      }
    })
    
#### options.endCallback
 
Callback invoked after response from server, error or timeout. More about it in section Local endCallback

#### options.name

You can set identify string for each call. Then in global callback you can check `req.name` to identify which call is processed.

#### options.*

You can add any custom property. All properties will be available in callbacks `req` parameter. 

## Aborting requests

To abort request you have to use superagent request object (this object is returned from all request methods) and invoke its abort() method.

example:

    var request = this.context.request.getRequest({ ... });
    request.abort();
    

## Global endCallback
This function is passed as prop to Request component. And is invoked at the end of request.

Callback function get three arguments

    globalCallbackFunction(err, req, res, done) {
      done();
    }

### err
if everything is ok this value is null. If server return status code 4xx and 5xx or there are connection errors then this value exist.
This is error object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#error-handling)

### req
All data passed as option to each request.
It has also reference to request instance:

    req.request

### res 
All data returned from server. 
This is response object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#response-properties)

### done
this is function. If global callback call it, then this will run local callback. Otherwise local callback will not be invoked.
If done is invoked without params it will run local callback with err and res from global callback.
**You can invoke `done` with own error, request and response object after you process original data.**
This is handy to get everything in global calback, check received data, and return only processed part 
(or for example if you use router, redirect to error page or login page).

## Local endCallback
This function is passed as last argument in request methods. And is invoked at the end of request (after global callback).
Global callback can prevent local callback from being invoked.


Callback function get two arguments

    localCallbackFunction(err, req, res) {
      done();
    }


### err
Error object. By default it is error object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#error-handling).
But in global callback this object could be changed.

### req
All data passed as option to each request.
It has also reference to request instance:

    req.request

### res 
Response object By default this is response object created by superagent. More about it in superagent [documentation](http://visionmedia.github.io/superagent/#response-properties)
But in global callback this object could be changed.

## License
MIT
