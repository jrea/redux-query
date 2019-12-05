'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _actionTypes = require('../constants/action-types');

var _update = require('../lib/update');

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

var initialState = {};

var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _actionTypes.RESET) {
    return 'entities' in action ? action.entities : initialState;
  } else if (action.type === _actionTypes.MUTATE_START && action.optimisticEntities) {
    return _objectSpread({}, state, action.optimisticEntities);
  } else if (action.type === _actionTypes.MUTATE_FAILURE && action.rolledBackEntities) {
    return _objectSpread({}, state, action.rolledBackEntities);
  } else if (
    action.type === _actionTypes.REQUEST_SUCCESS ||
    action.type === _actionTypes.MUTATE_SUCCESS
  ) {
    return _objectSpread({}, state, action.entities);
  } else if (action.type === _actionTypes.UPDATE_ENTITIES) {
    return _objectSpread({}, state, (0, _update.optimisticUpdateEntities)(action.update, state));
  } else {
    return state;
  }
};

var _default = entities;
exports['default'] = _default;
