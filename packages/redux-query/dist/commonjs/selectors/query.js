'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.queryCount = exports.lastUpdated = exports.headers = exports.status = exports.isPending = exports.isFinished = void 0;

var _queryKey = require('../lib/query-key');

var isFinished = function isFinished(queriesState, queryConfig) {
  var _ref6;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return false;
  }

  return (
    ((_ref6 = queriesState) != null
      ? (_ref6 = _ref6[queryKey]) != null
        ? _ref6.isFinished
        : _ref6
      : _ref6) || false
  );
};

exports.isFinished = isFinished;

var isPending = function isPending(queriesState, queryConfig) {
  var _ref5;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return false;
  }

  return (
    ((_ref5 = queriesState) != null
      ? (_ref5 = _ref5[queryKey]) != null
        ? _ref5.isPending
        : _ref5
      : _ref5) || false
  );
};

exports.isPending = isPending;

var status = function status(queriesState, queryConfig) {
  var _ref4;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref4 = queriesState) != null
    ? (_ref4 = _ref4[queryKey]) != null
      ? _ref4.status
      : _ref4
    : _ref4;
};

exports.status = status;

var headers = function headers(queriesState, queryConfig) {
  var _ref3;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref3 = queriesState) != null
    ? (_ref3 = _ref3[queryKey]) != null
      ? _ref3.headers
      : _ref3
    : _ref3;
};

exports.headers = headers;

var lastUpdated = function lastUpdated(queriesState, queryConfig) {
  var _ref2;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return null;
  }

  return (_ref2 = queriesState) != null
    ? (_ref2 = _ref2[queryKey]) != null
      ? _ref2.lastUpdated
      : _ref2
    : _ref2;
};

exports.lastUpdated = lastUpdated;

var queryCount = function queryCount(queriesState, queryConfig) {
  var _ref;

  var queryKey = (0, _queryKey.getQueryKey)(queryConfig);

  if (!queryKey) {
    return 0;
  }

  return (
    ((_ref = queriesState) != null
      ? (_ref = _ref[queryKey]) != null
        ? _ref.queryCount
        : _ref
      : _ref) || 0
  );
};

exports.queryCount = queryCount;
