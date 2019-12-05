'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.rollbackEntities = exports.optimisticUpdateEntities = exports.updateEntities = void 0;

var updateEntities = function updateEntities() {
  var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var transformed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // If update is not supplied, then no change to entities will be made
  return Object.keys(update).reduce(function(accum, key) {
    accum[key] = update[key](entities[key], transformed[key]);
    return accum;
  }, {});
};

exports.updateEntities = updateEntities;

var optimisticUpdateEntities = function optimisticUpdateEntities() {
  var optimisticUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(optimisticUpdate).reduce(function(accum, key) {
    accum[key] = optimisticUpdate[key](entities[key]);
    return accum;
  }, {});
};

exports.optimisticUpdateEntities = optimisticUpdateEntities;

var rollbackEntities = function rollbackEntities() {
  var rollback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initialEntities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var entities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Object.keys(initialEntities).reduce(function(accum, key) {
    if (rollback[key]) {
      accum[key] = rollback[key](initialEntities[key], entities[key]);
    } else {
      // Default to just reverting to the initial state for that
      // entity (before the optimistic update)
      accum[key] = initialEntities[key];
    }

    return accum;
  }, {});
};

exports.rollbackEntities = rollbackEntities;
