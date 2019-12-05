'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.responseHeaders = exports.responseText = exports.responseBody = void 0;

var _queryKey = require('../lib/query-key');

var responseBody = function responseBody(errorsState, queryConfig) {
  var _ref3;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref3 = errorsState) != null
    ? (_ref3 = _ref3[queryKey]) != null
      ? _ref3.responseBody
      : _ref3
    : _ref3;
};

exports.responseBody = responseBody;

var responseText = function responseText(errorsState, queryConfig) {
  var _ref2;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref2 = errorsState) != null
    ? (_ref2 = _ref2[queryKey]) != null
      ? _ref2.responseText
      : _ref2
    : _ref2;
};

exports.responseText = responseText;

var responseHeaders = function responseHeaders(errorsState, queryConfig) {
  var _ref;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref = errorsState) != null
    ? (_ref = _ref[queryKey]) != null
      ? _ref.responseHeaders
      : _ref
    : _ref;
};

exports.responseHeaders = responseHeaders;
