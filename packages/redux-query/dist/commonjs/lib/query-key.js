'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getQueryKey = void 0;

var _jsonStableStringify = _interopRequireDefault(require('json-stable-stringify'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var getQueryKey = function getQueryKey(queryConfig) {
  if (!queryConfig) {
    return null;
  }

  var url = queryConfig.url,
    body = queryConfig.body,
    queryKey = queryConfig.queryKey;

  if (queryKey !== null && queryKey !== undefined) {
    return queryKey;
  } else {
    return (0, _jsonStableStringify['default'])({
      url: url,
      body: body,
    });
  }
};

exports.getQueryKey = getQueryKey;
