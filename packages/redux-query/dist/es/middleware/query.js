'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _backo = _interopRequireDefault(require('backo'));

var _actions = require('../actions');

var actionTypes = _interopRequireWildcard(require('../constants/action-types'));

var _httpMethods = _interopRequireDefault(require('../constants/http-methods'));

var statusCodes = _interopRequireWildcard(require('../constants/status-codes'));

var _queryKey4 = require('../lib/query-key');

var _update2 = require('../lib/update');

var _object = require('../lib/object');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }),
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var defaultConfig = {
  backoff: {
    maxAttempts: 5,
    minDuration: 300,
    maxDuration: 5000,
  },
  retryableStatusCodes: [
    statusCodes.UNKNOWN, // normally means a failed connection
    statusCodes.REQUEST_TIMEOUT,
    statusCodes.TOO_MANY_REQUESTS, // hopefully backoff stops this getting worse
    statusCodes.SERVICE_UNAVAILABLE,
    statusCodes.GATEWAY_TIMEOUT,
  ],
};

var getPendingQueries = function getPendingQueries(queries) {
  var pendingQueries = {};

  for (var queryKey in queries) {
    if (queries.hasOwnProperty(queryKey)) {
      var query = queries[queryKey];

      if (query.isPending) {
        pendingQueries[queryKey] = query;
      }
    }
  }

  return pendingQueries;
};

var isStatusOk = function isStatusOk(status) {
  return status !== null && status !== undefined && status >= 200 && status < 300;
};

var defaultTransform = function defaultTransform(body) {
  return body || {};
};

var queryMiddleware = function queryMiddleware(
  networkInterface,
  queriesSelector,
  entitiesSelector,
  customConfig,
) {
  var networkHandlersByQueryKey = {};

  var abortQuery = function abortQuery(queryKey) {
    var networkHandler = networkHandlersByQueryKey[queryKey];

    if (networkHandler) {
      networkHandler.abort();
      delete networkHandlersByQueryKey[queryKey];
    }
  };

  return function(_ref3) {
    var dispatch = _ref3.dispatch,
      getState = _ref3.getState;
    return function(next) {
      return function(action) {
        var returnValue;

        var config = _objectSpread({}, defaultConfig, customConfig);

        switch (action.type) {
          case actionTypes.REQUEST_ASYNC: {
            var _ref, _ref2;

            var url = action.url,
              body = action.body,
              force = action.force,
              retry = action.retry,
              _action$transform = action.transform,
              transform = _action$transform === void 0 ? defaultTransform : _action$transform,
              update = action.update,
              _action$options = action.options,
              options = _action$options === void 0 ? {} : _action$options,
              meta = action.meta;

            if (!url) {
              throw new Error('Missing required url field for request');
            }

            var queryKey = (0, _queryKey4.getQueryKey)({
              body: action.body,
              queryKey: action.queryKey,
              url: action.url,
            });

            if (!queryKey) {
              throw new Error('Failed to generate queryKey for request');
            }

            var state = getState();
            var queries = queriesSelector(state);
            var queriesState = queries[queryKey];
            var isPending = (_ref2 = queriesState) != null ? _ref2.isPending : _ref2;
            var status = (_ref = queriesState) != null ? _ref.status : _ref;
            var hasSucceeded = isStatusOk(status);

            if (force || !queriesState || (retry && !isPending && !hasSucceeded)) {
              returnValue = new Promise(function(resolve) {
                var start = new Date();
                var _options$method = options.method,
                  method =
                    _options$method === void 0 ? _httpMethods['default'].GET : _options$method;
                var attempts = 0;
                var backoff = new _backo['default']({
                  min: config.backoff.minDuration,
                  max: config.backoff.maxDuration,
                });

                var attemptRequest = function attemptRequest() {
                  var networkHandler = networkInterface(url, method, {
                    body: body,
                    headers: options.headers,
                    credentials: options.credentials,
                  });
                  networkHandlersByQueryKey[queryKey] = networkHandler;
                  dispatch(
                    (0, _actions.requestStart)({
                      body: body,
                      meta: meta,
                      queryKey: queryKey,
                      url: url,
                    }),
                  );
                  attempts += 1;
                  networkHandler.execute(function(
                    err,
                    status,
                    responseBody,
                    responseText,
                    responseHeaders,
                  ) {
                    if (
                      config.retryableStatusCodes.includes(status) &&
                      attempts < config.backoff.maxAttempts
                    ) {
                      // TODO take into account Retry-After header if 503
                      setTimeout(attemptRequest, backoff.duration());
                      return;
                    }

                    var end = new Date();
                    var duration = end - start;
                    var transformed;
                    var newEntities;

                    if (action.unstable_preDispatchCallback) {
                      action.unstable_preDispatchCallback();
                    }

                    if (err || !isStatusOk(status)) {
                      dispatch(
                        (0, _actions.requestFailure)({
                          body: body,
                          duration: duration,
                          meta: meta,
                          queryKey: queryKey,
                          responseBody: responseBody,
                          responseHeaders: responseHeaders,
                          status: status,
                          responseText: responseText,
                          url: url,
                        }),
                      );
                      resolve({
                        body: responseBody,
                        duration: duration,
                        status: status,
                        text: responseText,
                        headers: responseHeaders,
                      });
                    } else {
                      var callbackState = getState();
                      var entities = entitiesSelector(callbackState);
                      transformed = transform(responseBody, responseText);
                      newEntities = (0, _update2.updateEntities)(update, entities, transformed);
                      dispatch(
                        (0, _actions.requestSuccess)({
                          body: body,
                          duration: duration,
                          meta: meta,
                          entities: newEntities,
                          queryKey: queryKey,
                          responseBody: responseBody,
                          responseHeaders: responseHeaders,
                          status: status,
                          responseText: responseText,
                          url: url,
                        }),
                      );
                      resolve({
                        body: responseBody,
                        duration: duration,
                        status: status,
                        text: responseText,
                        transformed: transformed,
                        entities: newEntities,
                        headers: responseHeaders,
                      });
                    }

                    delete networkHandlersByQueryKey[queryKey];
                  });
                };

                attemptRequest();
              });
            }

            break;
          }

          case actionTypes.MUTATE_ASYNC: {
            var _url = action.url,
              _action$transform2 = action.transform,
              _transform = _action$transform2 === void 0 ? defaultTransform : _action$transform2,
              _update = action.update,
              rollback = action.rollback,
              _body = action.body,
              optimisticUpdate = action.optimisticUpdate,
              _action$options2 = action.options,
              _options = _action$options2 === void 0 ? {} : _action$options2,
              _meta = action.meta;

            if (!_url) {
              throw new Error('Missing required url field for mutation');
            }

            var initialState = getState();
            var initialEntities = entitiesSelector(initialState);
            var optimisticEntities;

            if (optimisticUpdate) {
              optimisticEntities = (0, _update2.optimisticUpdateEntities)(
                optimisticUpdate,
                initialEntities,
              );
            }

            var _queryKey = (0, _queryKey4.getQueryKey)({
              queryKey: action.queryKey,
              url: action.url,
              body: action.body,
            });

            if (!_queryKey) {
              throw new Error('Failed to generate queryKey for mutation');
            }

            returnValue = new Promise(function(resolve) {
              var start = new Date();
              var _options$method2 = _options.method,
                method =
                  _options$method2 === void 0 ? _httpMethods['default'].POST : _options$method2;
              var networkHandler = networkInterface(_url, method, {
                body: _body,
                headers: _options.headers,
                credentials: _options.credentials,
              });
              networkHandlersByQueryKey[_queryKey] = networkHandler; // Note: only the entities that are included in `optimisticUpdate` will be passed along in the
              // `mutateStart` action as `optimisticEntities`

              dispatch(
                (0, _actions.mutateStart)({
                  body: _body,
                  meta: _meta,
                  optimisticEntities: optimisticEntities,
                  queryKey: _queryKey,
                  url: _url,
                }),
              );
              networkHandler.execute(function(
                err,
                status,
                responseBody,
                responseText,
                responseHeaders,
              ) {
                var end = new Date();
                var duration = end - start;
                var state = getState();
                var entities = entitiesSelector(state);
                var transformed;
                var newEntities;

                if (action.unstable_preDispatchCallback) {
                  action.unstable_preDispatchCallback();
                }

                if (err || !isStatusOk(status)) {
                  var rolledBackEntities;

                  if (optimisticUpdate) {
                    rolledBackEntities = (0, _update2.rollbackEntities)(
                      rollback,
                      (0, _object.pick)(initialEntities, Object.keys(optimisticEntities)),
                      (0, _object.pick)(entities, Object.keys(optimisticEntities)),
                    );
                  }

                  dispatch(
                    (0, _actions.mutateFailure)({
                      body: _body,
                      duration: duration,
                      meta: _meta,
                      queryKey: _queryKey,
                      responseBody: responseBody,
                      responseHeaders: responseHeaders,
                      status: status,
                      responseText: responseText,
                      rolledBackEntities: rolledBackEntities,
                      url: _url,
                    }),
                  );
                  resolve({
                    body: responseBody,
                    duration: duration,
                    status: status,
                    text: responseText,
                    headers: responseHeaders,
                  });
                } else {
                  transformed = _transform(responseBody, responseText);
                  newEntities = (0, _update2.updateEntities)(_update, entities, transformed);
                  dispatch(
                    (0, _actions.mutateSuccess)({
                      url: _url,
                      body: _body,
                      duration: duration,
                      status: status,
                      entities: newEntities,
                      queryKey: _queryKey,
                      responseBody: responseBody,
                      responseText: responseText,
                      responseHeaders: responseHeaders,
                      meta: _meta,
                    }),
                  );
                  resolve({
                    body: responseBody,
                    duration: duration,
                    status: status,
                    text: responseText,
                    transformed: transformed,
                    entities: newEntities,
                    headers: responseHeaders,
                  });
                }

                delete networkHandlersByQueryKey[_queryKey];
              });
            });
            break;
          }

          case actionTypes.CANCEL_QUERY: {
            var _queryKey2 = action.queryKey;

            if (!_queryKey2) {
              throw new Error('Missing required queryKey field');
            }

            var _state = getState();

            var _queries = queriesSelector(_state);

            var pendingQueries = getPendingQueries(_queries);

            if (_queryKey2 in pendingQueries) {
              abortQuery(_queryKey2);
              returnValue = next(action);
            } else {
              // eslint-disable-next-line
              console.warn('Trying to cancel a request that is not in flight: ', _queryKey2);
              returnValue = null;
            }

            break;
          }

          case actionTypes.RESET: {
            var _state2 = getState();

            var _queries2 = queriesSelector(_state2);

            var _pendingQueries = getPendingQueries(_queries2);

            for (var _queryKey3 in _pendingQueries) {
              if (_pendingQueries.hasOwnProperty(_queryKey3)) {
                abortQuery(_queryKey3);
              }
            }

            returnValue = next(action);
            break;
          }

          default: {
            returnValue = next(action);
          }
        }

        return returnValue;
      };
    };
  };
};

var _default = queryMiddleware;
exports['default'] = _default;
