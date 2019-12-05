'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'httpMethods', {
  enumerable: true,
  get: function get() {
    return _httpMethods['default'];
  },
});
Object.defineProperty(exports, 'getQueryKey', {
  enumerable: true,
  get: function get() {
    return _queryKey.getQueryKey;
  },
});
Object.defineProperty(exports, 'queriesReducer', {
  enumerable: true,
  get: function get() {
    return _queries['default'];
  },
});
Object.defineProperty(exports, 'entitiesReducer', {
  enumerable: true,
  get: function get() {
    return _entities['default'];
  },
});
Object.defineProperty(exports, 'errorsReducer', {
  enumerable: true,
  get: function get() {
    return _errors['default'];
  },
});
Object.defineProperty(exports, 'queryMiddleware', {
  enumerable: true,
  get: function get() {
    return _query2['default'];
  },
});
Object.defineProperty(exports, 'cancelQuery', {
  enumerable: true,
  get: function get() {
    return _actions.cancelQuery;
  },
});
Object.defineProperty(exports, 'mutateAsync', {
  enumerable: true,
  get: function get() {
    return _actions.mutateAsync;
  },
});
Object.defineProperty(exports, 'requestAsync', {
  enumerable: true,
  get: function get() {
    return _actions.requestAsync;
  },
});
Object.defineProperty(exports, 'updateEntities', {
  enumerable: true,
  get: function get() {
    return _actions.updateEntities;
  },
});
exports.querySelectors = exports.errorSelectors = exports.actionTypes = void 0;

var actionTypes = _interopRequireWildcard(require('./constants/action-types'));

exports.actionTypes = actionTypes;

var _httpMethods = _interopRequireDefault(require('./constants/http-methods'));

var errorSelectors = _interopRequireWildcard(require('./selectors/error'));

exports.errorSelectors = errorSelectors;

var querySelectors = _interopRequireWildcard(require('./selectors/query'));

exports.querySelectors = querySelectors;

var _queryKey = require('./lib/query-key');

var _queries = _interopRequireDefault(require('./reducers/queries'));

var _entities = _interopRequireDefault(require('./reducers/entities'));

var _errors = _interopRequireDefault(require('./reducers/errors'));

var _query2 = _interopRequireDefault(require('./middleware/query'));

var _actions = require('./actions');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
