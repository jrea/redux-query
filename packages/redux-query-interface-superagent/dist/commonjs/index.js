'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _superagent = _interopRequireDefault(require('superagent'));

var _reduxQuery = require('redux-query');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createRequest = function createRequest(url, method, body) {
  switch (method) {
    case _reduxQuery.httpMethods.HEAD:
      return _superagent['default'].head(url, body);

    case _reduxQuery.httpMethods.GET:
      return _superagent['default'].get(url, body);

    case _reduxQuery.httpMethods.POST:
      return _superagent['default'].post(url, body);

    case _reduxQuery.httpMethods.PUT:
      return _superagent['default'].put(url, body);

    case _reduxQuery.httpMethods.PATCH:
      return _superagent['default'].patch(url, body);

    case _reduxQuery.httpMethods.DELETE:
      return _superagent['default']['delete'](url, body);

    default:
      throw new Error('Unsupported HTTP method: '.concat(method));
  }
};

var superagentNetworkInterface = function superagentNetworkInterface(url, method) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    body = _ref.body,
    headers = _ref.headers,
    credentials = _ref.credentials;

  var request = createRequest(url, method, body);

  if (headers) {
    request.set(headers);
  }

  if (credentials === 'include') {
    request.withCredentials();
  }

  var execute = function execute(cb) {
    return request.end(function(err, response) {
      var resStatus = (response && response.status) || 0;
      var resBody = (response && response.body) || undefined;
      var resText = (response && response.text) || undefined;
      var resHeaders = (response && response.header) || undefined;
      cb(err, resStatus, resBody, resText, resHeaders);
    });
  };

  var abort = function abort() {
    return request.abort();
  };

  return {
    abort: abort,
    execute: execute,
  };
};

var _default = superagentNetworkInterface;
exports['default'] = _default;
