!(function(e, r) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = r(require('react'), require('redux-query'), require('react-redux')))
    : 'function' == typeof define && define.amd
    ? define(['react', 'redux-query', 'react-redux'], r)
    : 'object' == typeof exports
    ? (exports.ReduxQueryReact = r(
        require('react'),
        require('redux-query'),
        require('react-redux'),
      ))
    : (e.ReduxQueryReact = r(e.React, e.ReduxQuery, e.ReactRedux));
})(window, function(e, r, t) {
  return (function(e) {
    var r = {};
    function t(n) {
      if (r[n]) return r[n].exports;
      var o = (r[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    return (
      (t.m = e),
      (t.c = r),
      (t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: n });
      }),
      (t.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function(e, r) {
        if ((1 & r && (e = t(e)), 8 & r)) return e;
        if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (t.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & r && 'string' != typeof e)
        )
          for (var o in e)
            t.d(
              n,
              o,
              function(r) {
                return e[r];
              }.bind(null, o),
            );
        return n;
      }),
      (t.n = function(e) {
        var r =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(r, 'a', r), r;
      }),
      (t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
      }),
      (t.p = ''),
      t((t.s = 6))
    );
  })([
    function(r, t) {
      r.exports = e;
    },
    function(e, t) {
      e.exports = r;
    },
    function(e, r) {
      e.exports = t;
    },
    function(e, r, t) {
      'use strict';
      var n = t(4),
        o = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        u = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        c = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        i = {};
      function a(e) {
        return n.isMemo(e) ? c : i[e.$$typeof] || o;
      }
      i[n.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      };
      var f = Object.defineProperty,
        l = Object.getOwnPropertyNames,
        s = Object.getOwnPropertySymbols,
        y = Object.getOwnPropertyDescriptor,
        p = Object.getPrototypeOf,
        d = Object.prototype;
      e.exports = function e(r, t, n) {
        if ('string' != typeof t) {
          if (d) {
            var o = p(t);
            o && o !== d && e(r, o, n);
          }
          var c = l(t);
          s && (c = c.concat(s(t)));
          for (var i = a(r), b = a(t), m = 0; m < c.length; ++m) {
            var v = c[m];
            if (!(u[v] || (n && n[v]) || (b && b[v]) || (i && i[v]))) {
              var O = y(t, v);
              try {
                f(r, v, O);
              } catch (e) {}
            }
          }
          return r;
        }
        return r;
      };
    },
    function(e, r, t) {
      'use strict';
      e.exports = t(5);
    },
    function(e, r, t) {
      'use strict';
      /** @license React v16.8.6
       * react-is.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ Object.defineProperty(r, '__esModule', { value: !0 });
      var n = 'function' == typeof Symbol && Symbol.for,
        o = n ? Symbol.for('react.element') : 60103,
        u = n ? Symbol.for('react.portal') : 60106,
        c = n ? Symbol.for('react.fragment') : 60107,
        i = n ? Symbol.for('react.strict_mode') : 60108,
        a = n ? Symbol.for('react.profiler') : 60114,
        f = n ? Symbol.for('react.provider') : 60109,
        l = n ? Symbol.for('react.context') : 60110,
        s = n ? Symbol.for('react.async_mode') : 60111,
        y = n ? Symbol.for('react.concurrent_mode') : 60111,
        p = n ? Symbol.for('react.forward_ref') : 60112,
        d = n ? Symbol.for('react.suspense') : 60113,
        b = n ? Symbol.for('react.memo') : 60115,
        m = n ? Symbol.for('react.lazy') : 60116;
      function v(e) {
        if ('object' == typeof e && null !== e) {
          var r = e.$$typeof;
          switch (r) {
            case o:
              switch ((e = e.type)) {
                case s:
                case y:
                case c:
                case a:
                case i:
                case d:
                  return e;
                default:
                  switch ((e = e && e.$$typeof)) {
                    case l:
                    case p:
                    case f:
                      return e;
                    default:
                      return r;
                  }
              }
            case m:
            case b:
            case u:
              return r;
          }
        }
      }
      function O(e) {
        return v(e) === y;
      }
      (r.typeOf = v),
        (r.AsyncMode = s),
        (r.ConcurrentMode = y),
        (r.ContextConsumer = l),
        (r.ContextProvider = f),
        (r.Element = o),
        (r.ForwardRef = p),
        (r.Fragment = c),
        (r.Lazy = m),
        (r.Memo = b),
        (r.Portal = u),
        (r.Profiler = a),
        (r.StrictMode = i),
        (r.Suspense = d),
        (r.isValidElementType = function(e) {
          return (
            'string' == typeof e ||
            'function' == typeof e ||
            e === c ||
            e === y ||
            e === a ||
            e === i ||
            e === d ||
            ('object' == typeof e &&
              null !== e &&
              (e.$$typeof === m ||
                e.$$typeof === b ||
                e.$$typeof === f ||
                e.$$typeof === l ||
                e.$$typeof === p))
          );
        }),
        (r.isAsyncMode = function(e) {
          return O(e) || v(e) === s;
        }),
        (r.isConcurrentMode = O),
        (r.isContextConsumer = function(e) {
          return v(e) === l;
        }),
        (r.isContextProvider = function(e) {
          return v(e) === f;
        }),
        (r.isElement = function(e) {
          return 'object' == typeof e && null !== e && e.$$typeof === o;
        }),
        (r.isForwardRef = function(e) {
          return v(e) === p;
        }),
        (r.isFragment = function(e) {
          return v(e) === c;
        }),
        (r.isLazy = function(e) {
          return v(e) === m;
        }),
        (r.isMemo = function(e) {
          return v(e) === b;
        }),
        (r.isPortal = function(e) {
          return v(e) === u;
        }),
        (r.isProfiler = function(e) {
          return v(e) === a;
        }),
        (r.isStrictMode = function(e) {
          return v(e) === i;
        }),
        (r.isSuspense = function(e) {
          return v(e) === d;
        });
    },
    function(e, r, t) {
      'use strict';
      t.r(r);
      var n = t(3),
        o = t.n(n),
        u = t(0),
        c = t.n(u),
        i = t(2),
        a = t(1),
        f = function(e) {
          return c.a.useRef(e).current;
        };
      function l() {
        return (l =
          Object.assign ||
          function(e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r];
              for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function s(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var r = 0, t = new Array(e.length); r < e.length; r++) t[r] = e[r];
              return t;
            }
          })(e) ||
          (function(e) {
            if (
              Symbol.iterator in Object(e) ||
              '[object Arguments]' === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
          })()
        );
      }
      function y(e, r) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, r) {
            var t = [],
              n = !0,
              o = !1,
              u = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) && (t.push(c.value), !r || t.length !== r);
                n = !0
              );
            } catch (e) {
              (o = !0), (u = e);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (o) throw u;
              }
            }
            return t;
          })(e, r) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      function p(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {},
            n = Object.keys(t);
          'function' == typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(t).filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              }),
            )),
            n.forEach(function(r) {
              d(e, r, t[r]);
            });
        }
        return e;
      }
      function d(e, r, t) {
        return (
          r in e
            ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[r] = t),
          e
        );
      }
      var b = function(e, r) {
          var t = new Set(r);
          return e.filter(function(e) {
            return !t.has(e);
          });
        },
        m = function(e, r, t) {
          var n,
            o = ((n = e(r)), (Array.isArray(n) ? n : [n]).filter(Boolean))
              .map(function(e) {
                var r = Object(a.getQueryKey)(e);
                if (r)
                  return p({}, e, {
                    retry: !0,
                    unstable_preDispatchCallback: function() {
                      t(r);
                    },
                  });
              })
              .filter(Boolean),
            c = y(u.useState(o), 2),
            i = c[0],
            f = c[1],
            l = u.useRef(o),
            s = u.useRef(o.map(a.getQueryKey).filter(Boolean));
          return (
            u.useEffect(
              function() {
                var e = o.map(a.getQueryKey).filter(Boolean);
                (e.length !== s.current.length ||
                  e.some(function(e, r) {
                    return s.current[r] !== e;
                  }) ||
                  (function(e, r) {
                    return e.forEach(function(t, n) {
                      if (r[n].options && e[n].options) {
                        var o = r[n].options.headers,
                          u = e[n].options.headers;
                        if ((console.log(o, u), null != o && null != u))
                          return (
                            console.log(Object.values(o) !== Object.values(u)),
                            Object.values(o) !== Object.values(u)
                          );
                      }
                      return !1;
                    });
                  })(o, l)) &&
                  ((s.current = e), f(o));
              },
              [o, l],
            ),
            i
          );
        },
        v = function(e, r) {
          var t = Object(i.useDispatch)(),
            n = u.useRef([]),
            o = u.useRef(new Set()),
            c = f(function(e) {
              if (t(Object(a.requestAsync)(e))) {
                var r = Object(a.getQueryKey)(e);
                r && o.current.add(r);
              }
            }),
            l = f(function(e) {
              o.current.has(e) && (t(Object(a.cancelQuery)(e)), o.current.delete(e));
            }),
            y = m(e, r, function(e) {
              o.current.delete(e);
            }),
            d = u.useCallback(
              function() {
                y.forEach(function(e) {
                  c(p({}, e, { force: !0 }));
                });
              },
              [c, y],
            );
          return (
            u.useEffect(
              function() {
                var e = (function(e, r) {
                    var t = e.map(function(e) {
                        return Object(a.getQueryKey)(e);
                      }),
                      n = r.map(function(e) {
                        return Object(a.getQueryKey)(e);
                      }),
                      o = n.reduce(function(e, t, n) {
                        var o = r[n];
                        return o && e.set(t, o), e;
                      }, new Map());
                    return {
                      cancelKeys: b(t, n).filter(Boolean),
                      requestQueryConfigs: b(n, t)
                        .filter(Boolean)
                        .map(function(e) {
                          return o.get(e);
                        })
                        .filter(Boolean),
                    };
                  })(n.current, y),
                  r = e.cancelKeys;
                e.requestQueryConfigs.forEach(c),
                  r.forEach(function(e) {
                    return l(e);
                  }),
                  (n.current = y);
              },
              [l, c, y],
            ),
            u.useEffect(
              function() {
                return function() {
                  s(o.current).forEach(l);
                };
              },
              [l],
            ),
            d
          );
        },
        O = function(e, r) {
          return function(t) {
            var n = r || {},
              c = n.pure,
              i = void 0 === c || c,
              a = n.forwardRef,
              f = void 0 !== a && a,
              s = function(r) {
                var n = v(e, r);
                return u.createElement(t, l({}, r, { forceRequest: n }));
              },
              y = i ? u.memo(s) : s,
              p = t.displayName || t.name || 'Component',
              d = 'ConnectRequest('.concat(p, ')');
            if (((y.displayName = d), f)) {
              var b = u.forwardRef(function(e, r) {
                return u.createElement(y, l({}, e, { forwardedRef: r }));
              });
              return (b.displayName = d), o()(b, t);
            }
            return o()(y, t);
          };
        },
        j = c.a.createContext(null),
        g = u.memo(function(e) {
          var r = e.queriesSelector,
            t = u.useMemo(
              function() {
                return { queriesSelector: r };
              },
              [r],
            );
          return u.createElement(j.Provider, { value: t }, e.children);
        }),
        h = function(e) {
          var r = u.useContext(j);
          if (!r)
            throw new Error(
              "Could not find redux-query-react's context. Be sure to render a redux-query <Provider> near the root of your React tree.",
            );
          var t = r.queriesSelector,
            n = Object(i.useSelector)(function(r) {
              return a.querySelectors.isPending(t(r), e);
            }),
            o = Object(i.useSelector)(function(r) {
              return a.querySelectors.isFinished(t(r), e);
            }),
            c = Object(i.useSelector)(function(r) {
              return a.querySelectors.status(t(r), e);
            }),
            f = Object(i.useSelector)(function(r) {
              return a.querySelectors.headers(t(r), e);
            }),
            l = Object(i.useSelector)(function(r) {
              return a.querySelectors.lastUpdated(t(r), e);
            }),
            s = Object(i.useSelector)(function(r) {
              return a.querySelectors.queryCount(t(r), e);
            });
          return u.useMemo(
            function() {
              return {
                isPending: n,
                isFinished: o,
                status: c,
                headers: f,
                lastUpdated: l,
                queryCount: s,
              };
            },
            [f, o, n, l, s, c],
          );
        };
      function S(e, r) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, r) {
            var t = [],
              n = !0,
              o = !1,
              u = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) && (t.push(c.value), !r || t.length !== r);
                n = !0
              );
            } catch (e) {
              (o = !0), (u = e);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (o) throw u;
              }
            }
            return t;
          })(e, r) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      var w = function(e) {
        var r = Object(i.useDispatch)(),
          t = S(u.useState(null), 2),
          n = t[0],
          o = t[1];
        return [
          h(n),
          u.useCallback(
            function() {
              var t = e.apply(void 0, arguments);
              return o(t), r(Object(a.mutateAsync)(t));
            },
            [e, r],
          ),
        ];
      };
      function x(e, r) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, r) {
            var t = [],
              n = !0,
              o = !1,
              u = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) && (t.push(c.value), !r || t.length !== r);
                n = !0
              );
            } catch (e) {
              (o = !0), (u = e);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (o) throw u;
              }
            }
            return t;
          })(e, r) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      var P = function(e) {
          return e;
        },
        q = function(e) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : P,
            t = x(u.useState(e ? r(e) : null), 2),
            n = t[0],
            o = t[1],
            c = u.useRef(Object(a.getQueryKey)(e));
          return (
            u.useEffect(
              function() {
                var t = Object(a.getQueryKey)(e);
                t !== c.current && ((c.current = t), o(e ? r(e) : null));
              },
              [e, r],
            ),
            n
          );
        };
      function R(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {},
            n = Object.keys(t);
          'function' == typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(t).filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              }),
            )),
            n.forEach(function(r) {
              E(e, r, t[r]);
            });
        }
        return e;
      }
      function E(e, r, t) {
        return (
          r in e
            ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[r] = t),
          e
        );
      }
      var C = function(e) {
        var r = Object(i.useDispatch)(),
          t = u.useRef(!1),
          n = f(function() {
            t.current = !1;
          }),
          o = f(function(e) {
            return R({}, e, { unstable_preDispatchCallback: n, retry: !0 });
          }),
          c = q(e, o),
          l = h(c),
          s = f(function(e) {
            var n = r(Object(a.requestAsync)(e));
            return n && (t.current = !0), n;
          }),
          y = f(function(e) {
            r(Object(a.cancelQuery)(e)), (t.current = !1);
          }),
          p = u.useCallback(
            function() {
              if (c) return s(R({}, c, { force: !0 }));
            },
            [s, c],
          );
        return (
          u.useEffect(
            function() {
              return (
                c && s(c),
                function() {
                  if (t.current) {
                    var e = Object(a.getQueryKey)(c);
                    e && y(e);
                  }
                }
              );
            },
            [y, s, c],
          ),
          [l, p]
        );
      };
      t.d(r, 'connectRequest', function() {
        return O;
      }),
        t.d(r, 'Provider', function() {
          return g;
        }),
        t.d(r, 'useMutation', function() {
          return w;
        }),
        t.d(r, 'useRequest', function() {
          return C;
        });
    },
  ]);
});
