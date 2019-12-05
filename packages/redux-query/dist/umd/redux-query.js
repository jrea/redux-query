!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.ReduxQuery = t())
    : (e.ReduxQuery = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            r.d(
              n,
              o,
              function(t) {
                return e[t];
              }.bind(null, o),
            );
        return n;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, 'a', t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ''),
      r((r.s = 5))
    );
  })([
    function(e, t, r) {
      var n = 'undefined' != typeof JSON ? JSON : r(2);
      e.exports = function(e, t) {
        t || (t = {}), 'function' == typeof t && (t = { cmp: t });
        var r = t.space || '';
        'number' == typeof r && (r = Array(r + 1).join(' '));
        var i,
          a = 'boolean' == typeof t.cycles && t.cycles,
          s =
            t.replacer ||
            function(e, t) {
              return t;
            },
          c =
            t.cmp &&
            ((i = t.cmp),
            function(e) {
              return function(t, r) {
                var n = { key: t, value: e[t] },
                  o = { key: r, value: e[r] };
                return i(n, o);
              };
            }),
          f = [];
        return (function e(t, i, l, y) {
          var d = r ? '\n' + new Array(y + 1).join(r) : '',
            p = r ? ': ' : ':';
          if (
            (l && l.toJSON && 'function' == typeof l.toJSON && (l = l.toJSON()),
            void 0 !== (l = s.call(t, i, l)))
          ) {
            if ('object' != typeof l || null === l) return n.stringify(l);
            if (o(l)) {
              for (var b = [], v = 0; v < l.length; v++) {
                var m = e(l, v, l[v], y + 1) || n.stringify(null);
                b.push(d + r + m);
              }
              return '[' + b.join(',') + d + ']';
            }
            if (-1 !== f.indexOf(l)) {
              if (a) return n.stringify('__cycle__');
              throw new TypeError('Converting circular structure to JSON');
            }
            f.push(l);
            var h = u(l).sort(c && c(l));
            for (b = [], v = 0; v < h.length; v++) {
              var g = e(l, (i = h[v]), l[i], y + 1);
              if (g) {
                var E = n.stringify(i) + p + g;
                b.push(d + r + E);
              }
            }
            return f.splice(f.indexOf(l), 1), '{' + b.join(',') + d + '}';
          }
        })({ '': e }, '', e, 0);
      };
      var o =
          Array.isArray ||
          function(e) {
            return '[object Array]' === {}.toString.call(e);
          },
        u =
          Object.keys ||
          function(e) {
            var t =
                Object.prototype.hasOwnProperty ||
                function() {
                  return !0;
                },
              r = [];
            for (var n in e) t.call(e, n) && r.push(n);
            return r;
          };
    },
    function(e, t) {
      function r(e) {
        (e = e || {}),
          (this.ms = e.min || 100),
          (this.max = e.max || 1e4),
          (this.factor = e.factor || 2),
          (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
          (this.attempts = 0);
      }
      (e.exports = r),
        (r.prototype.duration = function() {
          var e = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var t = Math.random(),
              r = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r;
          }
          return 0 | Math.min(e, this.max);
        }),
        (r.prototype.reset = function() {
          this.attempts = 0;
        });
    },
    function(e, t, r) {
      (t.parse = r(3)), (t.stringify = r(4));
    },
    function(e, t) {
      var r,
        n,
        o,
        u,
        i = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' },
        a = function(e) {
          throw { name: 'SyntaxError', message: e, at: r, text: o };
        },
        s = function(e) {
          return (
            e && e !== n && a("Expected '" + e + "' instead of '" + n + "'"),
            (n = o.charAt(r)),
            (r += 1),
            n
          );
        },
        c = function() {
          var e,
            t = '';
          for ('-' === n && ((t = '-'), s('-')); n >= '0' && n <= '9'; ) (t += n), s();
          if ('.' === n) for (t += '.'; s() && n >= '0' && n <= '9'; ) t += n;
          if ('e' === n || 'E' === n)
            for (t += n, s(), ('-' !== n && '+' !== n) || ((t += n), s()); n >= '0' && n <= '9'; )
              (t += n), s();
          if (((e = +t), isFinite(e))) return e;
          a('Bad number');
        },
        f = function() {
          var e,
            t,
            r,
            o = '';
          if ('"' === n)
            for (; s(); ) {
              if ('"' === n) return s(), o;
              if ('\\' === n)
                if ((s(), 'u' === n)) {
                  for (r = 0, t = 0; t < 4 && ((e = parseInt(s(), 16)), isFinite(e)); t += 1)
                    r = 16 * r + e;
                  o += String.fromCharCode(r);
                } else {
                  if ('string' != typeof i[n]) break;
                  o += i[n];
                }
              else o += n;
            }
          a('Bad string');
        },
        l = function() {
          for (; n && n <= ' '; ) s();
        };
      (u = function() {
        switch ((l(), n)) {
          case '{':
            return (function() {
              var e,
                t = {};
              if ('{' === n) {
                if ((s('{'), l(), '}' === n)) return s('}'), t;
                for (; n; ) {
                  if (
                    ((e = f()),
                    l(),
                    s(':'),
                    Object.hasOwnProperty.call(t, e) && a('Duplicate key "' + e + '"'),
                    (t[e] = u()),
                    l(),
                    '}' === n)
                  )
                    return s('}'), t;
                  s(','), l();
                }
              }
              a('Bad object');
            })();
          case '[':
            return (function() {
              var e = [];
              if ('[' === n) {
                if ((s('['), l(), ']' === n)) return s(']'), e;
                for (; n; ) {
                  if ((e.push(u()), l(), ']' === n)) return s(']'), e;
                  s(','), l();
                }
              }
              a('Bad array');
            })();
          case '"':
            return f();
          case '-':
            return c();
          default:
            return n >= '0' && n <= '9'
              ? c()
              : (function() {
                  switch (n) {
                    case 't':
                      return s('t'), s('r'), s('u'), s('e'), !0;
                    case 'f':
                      return s('f'), s('a'), s('l'), s('s'), s('e'), !1;
                    case 'n':
                      return s('n'), s('u'), s('l'), s('l'), null;
                  }
                  a("Unexpected '" + n + "'");
                })();
        }
      }),
        (e.exports = function(e, t) {
          var i;
          return (
            (o = e),
            (r = 0),
            (n = ' '),
            (i = u()),
            l(),
            n && a('Syntax error'),
            'function' == typeof t
              ? (function e(r, n) {
                  var o,
                    u,
                    i = r[n];
                  if (i && 'object' == typeof i)
                    for (o in i)
                      Object.prototype.hasOwnProperty.call(i, o) &&
                        (void 0 !== (u = e(i, o)) ? (i[o] = u) : delete i[o]);
                  return t.call(r, n, i);
                })({ '': i }, '')
              : i
          );
        });
    },
    function(e, t) {
      var r,
        n,
        o,
        u = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        i = {
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\',
        };
      function a(e) {
        return (
          (u.lastIndex = 0),
          u.test(e)
            ? '"' +
              e.replace(u, function(e) {
                var t = i[e];
                return 'string' == typeof t
                  ? t
                  : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
            : '"' + e + '"'
        );
      }
      e.exports = function(e, t, u) {
        var i;
        if (((r = ''), (n = ''), 'number' == typeof u)) for (i = 0; i < u; i += 1) n += ' ';
        else 'string' == typeof u && (n = u);
        if (
          ((o = t),
          t && 'function' != typeof t && ('object' != typeof t || 'number' != typeof t.length))
        )
          throw new Error('JSON.stringify');
        return (function e(t, u) {
          var i,
            s,
            c,
            f,
            l,
            y = r,
            d = u[t];
          switch (
            (d && 'object' == typeof d && 'function' == typeof d.toJSON && (d = d.toJSON(t)),
            'function' == typeof o && (d = o.call(u, t, d)),
            typeof d)
          ) {
            case 'string':
              return a(d);
            case 'number':
              return isFinite(d) ? String(d) : 'null';
            case 'boolean':
            case 'null':
              return String(d);
            case 'object':
              if (!d) return 'null';
              if (((r += n), (l = []), '[object Array]' === Object.prototype.toString.apply(d))) {
                for (f = d.length, i = 0; i < f; i += 1) l[i] = e(i, d) || 'null';
                return (
                  (c =
                    0 === l.length
                      ? '[]'
                      : r
                      ? '[\n' + r + l.join(',\n' + r) + '\n' + y + ']'
                      : '[' + l.join(',') + ']'),
                  (r = y),
                  c
                );
              }
              if (o && 'object' == typeof o)
                for (f = o.length, i = 0; i < f; i += 1)
                  'string' == typeof (s = o[i]) &&
                    (c = e(s, d)) &&
                    l.push(a(s) + (r ? ': ' : ':') + c);
              else
                for (s in d)
                  Object.prototype.hasOwnProperty.call(d, s) &&
                    (c = e(s, d)) &&
                    l.push(a(s) + (r ? ': ' : ':') + c);
              return (
                (c =
                  0 === l.length
                    ? '{}'
                    : r
                    ? '{\n' + r + l.join(',\n' + r) + '\n' + y + '}'
                    : '{' + l.join(',') + '}'),
                (r = y),
                c
              );
          }
        })('', { '': e });
      };
    },
    function(e, t, r) {
      'use strict';
      r.r(t);
      var n = {};
      r.r(n),
        r.d(n, 'REQUEST_ASYNC', function() {
          return i;
        }),
        r.d(n, 'REQUEST_START', function() {
          return a;
        }),
        r.d(n, 'REQUEST_SUCCESS', function() {
          return s;
        }),
        r.d(n, 'REQUEST_FAILURE', function() {
          return c;
        }),
        r.d(n, 'CANCEL_QUERY', function() {
          return f;
        }),
        r.d(n, 'MUTATE_ASYNC', function() {
          return l;
        }),
        r.d(n, 'MUTATE_START', function() {
          return y;
        }),
        r.d(n, 'MUTATE_SUCCESS', function() {
          return d;
        }),
        r.d(n, 'MUTATE_FAILURE', function() {
          return p;
        }),
        r.d(n, 'RESET', function() {
          return b;
        }),
        r.d(n, 'UPDATE_ENTITIES', function() {
          return v;
        });
      var o = {};
      r.r(o),
        r.d(o, 'responseBody', function() {
          return O;
        }),
        r.d(o, 'responseText', function() {
          return S;
        }),
        r.d(o, 'responseHeaders', function() {
          return T;
        });
      var u = {};
      r.r(u),
        r.d(u, 'isFinished', function() {
          return j;
        }),
        r.d(u, 'isPending', function() {
          return w;
        }),
        r.d(u, 'status', function() {
          return q;
        }),
        r.d(u, 'headers', function() {
          return x;
        }),
        r.d(u, 'lastUpdated', function() {
          return P;
        }),
        r.d(u, 'queryCount', function() {
          return A;
        });
      var i = '@@query/REQUEST_ASYNC',
        a = '@@query/REQUEST_START',
        s = '@@query/REQUEST_SUCCESS',
        c = '@@query/REQUEST_FAILURE',
        f = '@@query/CANCEL_QUERY',
        l = '@@query/MUTATE_ASYNC',
        y = '@@query/MUTATE_START',
        d = '@@query/MUTATE_SUCCESS',
        p = '@@query/MUTATE_FAILURE',
        b = '@@query/RESET',
        v = '@@query/UPDATE_ENTITIES',
        m = {
          DELETE: 'DELETE',
          GET: 'GET',
          HEAD: 'HEAD',
          POST: 'POST',
          PUT: 'PUT',
          PATCH: 'PATCH',
        },
        h = r(0),
        g = r.n(h),
        E = function(e) {
          if (!e) return null;
          var t = e.url,
            r = e.body,
            n = e.queryKey;
          return null != n ? n : g()({ url: t, body: r });
        },
        O = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.responseBody : r) : null;
        },
        S = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.responseText : r) : null;
        },
        T = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.responseHeaders : r) : null;
        },
        j = function(e, t) {
          var r,
            n = E(t);
          return (n && (null != (r = e) && null != (r = r[n]) ? r.isFinished : r)) || !1;
        },
        w = function(e, t) {
          var r,
            n = E(t);
          return (n && (null != (r = e) && null != (r = r[n]) ? r.isPending : r)) || !1;
        },
        q = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.status : r) : null;
        },
        x = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.headers : r) : null;
        },
        P = function(e, t) {
          var r,
            n = E(t);
          return n ? (null != (r = e) && null != (r = r[n]) ? r.lastUpdated : r) : null;
        },
        A = function(e, t) {
          var r,
            n = E(t);
          return (n && (null != (r = e) && null != (r = r[n]) ? r.queryCount : r)) || 0;
        };
      function k(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {},
            n = Object.keys(r);
          'function' == typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
              }),
            )),
            n.forEach(function(t) {
              K(e, t, r[t]);
            });
        }
        return e;
      }
      function K(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var U = {},
        _ = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : U,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case b:
              return {};
            case y:
            case a:
              var r = t.queryKey;
              return k(
                {},
                e,
                K({}, r, {
                  isFinished: !1,
                  isPending: !0,
                  isMutation: t.type === y,
                  queryCount: e[r] ? e[r].queryCount + 1 : 1,
                }),
              );
            case s:
            case p:
            case d:
            case c:
              var n = t.queryKey;
              return k(
                {},
                e,
                K(
                  {},
                  n,
                  k({}, e[n], {
                    isFinished: !0,
                    isPending: !1,
                    lastUpdated: t.time,
                    status: t.status,
                    headers: t.responseHeaders,
                  }),
                ),
              );
            case f:
              var o = t.queryKey;
              return o && e[o].isPending
                ? k({}, e, K({}, o, k({}, e[o], { isFinished: !0, isPending: !1, status: 0 })))
                : e;
            default:
              return e;
          }
        },
        C = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return Object.keys(e).reduce(function(n, o) {
            return (n[o] = e[o](t[o], r[o])), n;
          }, {});
        },
        D = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return Object.keys(e).reduce(function(r, n) {
            return (r[n] = e[n](t[n])), r;
          }, {});
        };
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {},
            n = Object.keys(r);
          'function' == typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
              }),
            )),
            n.forEach(function(t) {
              R(e, t, r[t]);
            });
        }
        return e;
      }
      function R(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var M = {},
        H = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
            t = arguments.length > 1 ? arguments[1] : void 0;
          return t.type === b
            ? 'entities' in t
              ? t.entities
              : M
            : t.type === y && t.optimisticEntities
            ? B({}, e, t.optimisticEntities)
            : t.type === p && t.rolledBackEntities
            ? B({}, e, t.rolledBackEntities)
            : t.type === s || t.type === d
            ? B({}, e, t.entities)
            : t.type === v
            ? B({}, e, D(t.update, e))
            : e;
        };
      function N(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {},
            n = Object.keys(r);
          'function' == typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
              }),
            )),
            n.forEach(function(t) {
              F(e, t, r[t]);
            });
        }
        return e;
      }
      function F(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var Q = {},
        I = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Q,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case b:
              return {};
            case y:
            case a:
              var r = t.queryKey,
                n = N({}, e);
              return delete n[r], n;
            case p:
            case c:
              var o = t.queryKey;
              return N(
                {},
                e,
                F(
                  {},
                  o,
                  N({}, e[o], {
                    responseBody: t.responseBody,
                    responseText: t.responseText,
                    responseHeaders: t.responseHeaders,
                  }),
                ),
              );
            default:
              return e;
          }
        },
        J = r(1),
        L = r.n(J),
        Y = function(e) {
          var t = e.body,
            r = e.force,
            n = e.meta,
            o = e.options,
            u = e.queryKey,
            a = e.retry,
            s = e.transform,
            c = e.update,
            f = e.url,
            l = e.unstable_preDispatchCallback;
          return {
            type: i,
            body: t,
            force: r,
            queryKey: u,
            meta: n,
            options: o,
            retry: a,
            transform: s,
            update: c,
            url: f,
            unstable_preDispatchCallback: l,
          };
        },
        G = function(e) {
          var t = e.body,
            r = e.meta,
            n = e.optimisticUpdate,
            o = e.options,
            u = e.queryKey,
            i = e.rollback,
            a = e.transform,
            s = e.update,
            c = e.url;
          return {
            type: l,
            body: t,
            meta: r,
            optimisticUpdate: n,
            options: o,
            queryKey: u,
            rollback: i,
            transform: a,
            update: s,
            url: c,
          };
        },
        z = function(e) {
          return { type: f, queryKey: e };
        },
        V = function(e) {
          return { type: v, update: e };
        };
      function W(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var X = function(e, t) {
        var r = (function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(r);
              'function' == typeof Object.getOwnPropertySymbols &&
                (n = n.concat(
                  Object.getOwnPropertySymbols(r).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable;
                  }),
                )),
                n.forEach(function(t) {
                  W(e, t, r[t]);
                });
            }
            return e;
          })({}, e),
          n = new Set(t),
          o = Object.keys(e).filter(function(e) {
            return !n.has(e);
          }),
          u = !0,
          i = !1,
          a = void 0;
        try {
          for (var s, c = o[Symbol.iterator](); !(u = (s = c.next()).done); u = !0) {
            var f = s.value;
            r.hasOwnProperty(f) && delete r[f];
          }
        } catch (e) {
          (i = !0), (a = e);
        } finally {
          try {
            u || null == c.return || c.return();
          } finally {
            if (i) throw a;
          }
        }
        return r;
      };
      function Z(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var $ = {
          backoff: { maxAttempts: 5, minDuration: 300, maxDuration: 5e3 },
          retryableStatusCodes: [0, 408, 429, 503, 504],
        },
        ee = function(e) {
          var t = {};
          for (var r in e)
            if (e.hasOwnProperty(r)) {
              var n = e[r];
              n.isPending && (t[r] = n);
            }
          return t;
        },
        te = function(e) {
          return null != e && e >= 200 && e < 300;
        },
        re = function(e) {
          return e || {};
        },
        ne = function(e, t, r, n) {
          var o = {},
            u = function(e) {
              var t = o[e];
              t && (t.abort(), delete o[e]);
            };
          return function(v) {
            var h = v.dispatch,
              g = v.getState;
            return function(v) {
              return function(O) {
                var S,
                  T = (function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var r = null != arguments[t] ? arguments[t] : {},
                        n = Object.keys(r);
                      'function' == typeof Object.getOwnPropertySymbols &&
                        (n = n.concat(
                          Object.getOwnPropertySymbols(r).filter(function(e) {
                            return Object.getOwnPropertyDescriptor(r, e).enumerable;
                          }),
                        )),
                        n.forEach(function(t) {
                          Z(e, t, r[t]);
                        });
                    }
                    return e;
                  })({}, $, n);
                switch (O.type) {
                  case i:
                    var j,
                      w,
                      q = O.url,
                      x = O.body,
                      P = O.force,
                      A = O.retry,
                      k = O.transform,
                      K = void 0 === k ? re : k,
                      U = O.update,
                      _ = O.options,
                      B = void 0 === _ ? {} : _,
                      R = O.meta;
                    if (!q) throw new Error('Missing required url field for request');
                    var M = E({ body: O.body, queryKey: O.queryKey, url: O.url });
                    if (!M) throw new Error('Failed to generate queryKey for request');
                    var H = g(),
                      N = t(H)[M],
                      F = null != (w = N) ? w.isPending : w,
                      Q = null != (j = N) ? j.status : j,
                      I = te(Q);
                    (P || !N || (A && !F && !I)) &&
                      (S = new Promise(function(t) {
                        var n = new Date(),
                          u = B.method,
                          i = void 0 === u ? m.GET : u,
                          f = 0,
                          l = new L.a({ min: T.backoff.minDuration, max: T.backoff.maxDuration });
                        !(function u() {
                          var y = e(q, i, {
                            body: x,
                            headers: B.headers,
                            credentials: B.credentials,
                          });
                          (o[M] = y),
                            h(
                              (function(e) {
                                var t = e.body,
                                  r = e.meta,
                                  n = e.queryKey,
                                  o = e.url;
                                return { type: a, url: o, body: t, meta: r, queryKey: n };
                              })({ body: x, meta: R, queryKey: M, url: q }),
                            ),
                            (f += 1),
                            y.execute(function(e, i, a, y, d) {
                              if (T.retryableStatusCodes.includes(i) && f < T.backoff.maxAttempts)
                                setTimeout(u, l.duration());
                              else {
                                var p,
                                  b,
                                  v = new Date() - n;
                                if (
                                  (O.unstable_preDispatchCallback &&
                                    O.unstable_preDispatchCallback(),
                                  e || !te(i))
                                )
                                  h(
                                    (function(e) {
                                      var t = e.body,
                                        r = e.duration,
                                        n = e.meta,
                                        o = e.queryKey,
                                        u = e.responseBody,
                                        i = e.responseHeaders,
                                        a = e.responseText,
                                        s = e.status,
                                        f = e.url;
                                      return {
                                        type: c,
                                        url: f,
                                        body: t,
                                        duration: r,
                                        status: s,
                                        responseBody: u,
                                        responseText: a,
                                        responseHeaders: i,
                                        meta: n,
                                        queryKey: o,
                                        time: Date.now(),
                                      };
                                    })({
                                      body: x,
                                      duration: v,
                                      meta: R,
                                      queryKey: M,
                                      responseBody: a,
                                      responseHeaders: d,
                                      status: i,
                                      responseText: y,
                                      url: q,
                                    }),
                                  ),
                                    t({ body: a, duration: v, status: i, text: y, headers: d });
                                else {
                                  var m = g(),
                                    E = r(m);
                                  (p = K(a, y)),
                                    (b = C(U, E, p)),
                                    h(
                                      (function(e) {
                                        var t = e.body,
                                          r = e.duration,
                                          n = e.entities,
                                          o = e.meta,
                                          u = e.queryKey,
                                          i = e.responseBody,
                                          a = e.responseHeaders,
                                          c = e.responseText,
                                          f = e.status,
                                          l = e.url;
                                        return {
                                          type: s,
                                          url: l,
                                          body: t,
                                          duration: r,
                                          status: f,
                                          entities: n,
                                          responseBody: i,
                                          responseText: c,
                                          responseHeaders: a,
                                          meta: o,
                                          queryKey: u,
                                          time: Date.now(),
                                        };
                                      })({
                                        body: x,
                                        duration: v,
                                        meta: R,
                                        entities: b,
                                        queryKey: M,
                                        responseBody: a,
                                        responseHeaders: d,
                                        status: i,
                                        responseText: y,
                                        url: q,
                                      }),
                                    ),
                                    t({
                                      body: a,
                                      duration: v,
                                      status: i,
                                      text: y,
                                      transformed: p,
                                      entities: b,
                                      headers: d,
                                    });
                                }
                                delete o[M];
                              }
                            });
                        })();
                      }));
                    break;
                  case l:
                    var J = O.url,
                      Y = O.transform,
                      G = void 0 === Y ? re : Y,
                      z = O.update,
                      V = O.rollback,
                      W = O.body,
                      ne = O.optimisticUpdate,
                      oe = O.options,
                      ue = void 0 === oe ? {} : oe,
                      ie = O.meta;
                    if (!J) throw new Error('Missing required url field for mutation');
                    var ae,
                      se = g(),
                      ce = r(se);
                    ne && (ae = D(ne, ce));
                    var fe = E({ queryKey: O.queryKey, url: O.url, body: O.body });
                    if (!fe) throw new Error('Failed to generate queryKey for mutation');
                    S = new Promise(function(t) {
                      var n = new Date(),
                        u = ue.method,
                        i = e(J, void 0 === u ? m.POST : u, {
                          body: W,
                          headers: ue.headers,
                          credentials: ue.credentials,
                        });
                      (o[fe] = i),
                        h(
                          (function(e) {
                            var t = e.body,
                              r = e.meta,
                              n = e.optimisticEntities,
                              o = e.queryKey,
                              u = e.url;
                            return {
                              type: y,
                              url: u,
                              body: t,
                              optimisticEntities: n,
                              queryKey: o,
                              meta: r,
                            };
                          })({ body: W, meta: ie, optimisticEntities: ae, queryKey: fe, url: J }),
                        ),
                        i.execute(function(e, u, i, a, s) {
                          var c,
                            f,
                            l,
                            y = new Date() - n,
                            b = g(),
                            v = r(b);
                          O.unstable_preDispatchCallback && O.unstable_preDispatchCallback(),
                            e || !te(u)
                              ? (ne &&
                                  (l = (function() {
                                    var e =
                                        arguments.length > 0 && void 0 !== arguments[0]
                                          ? arguments[0]
                                          : {},
                                      t =
                                        arguments.length > 1 && void 0 !== arguments[1]
                                          ? arguments[1]
                                          : {},
                                      r =
                                        arguments.length > 2 && void 0 !== arguments[2]
                                          ? arguments[2]
                                          : {};
                                    return Object.keys(t).reduce(function(n, o) {
                                      return e[o] ? (n[o] = e[o](t[o], r[o])) : (n[o] = t[o]), n;
                                    }, {});
                                  })(V, X(ce, Object.keys(ae)), X(v, Object.keys(ae)))),
                                h(
                                  (function(e) {
                                    var t = e.body,
                                      r = e.duration,
                                      n = e.meta,
                                      o = e.queryKey,
                                      u = e.responseBody,
                                      i = e.responseHeaders,
                                      a = e.responseText,
                                      s = e.rolledBackEntities,
                                      c = e.status,
                                      f = e.url;
                                    return {
                                      type: p,
                                      url: f,
                                      body: t,
                                      duration: r,
                                      status: c,
                                      responseBody: u,
                                      responseText: a,
                                      responseHeaders: i,
                                      rolledBackEntities: s,
                                      queryKey: o,
                                      time: Date.now(),
                                      meta: n,
                                    };
                                  })({
                                    body: W,
                                    duration: y,
                                    meta: ie,
                                    queryKey: fe,
                                    responseBody: i,
                                    responseHeaders: s,
                                    status: u,
                                    responseText: a,
                                    rolledBackEntities: l,
                                    url: J,
                                  }),
                                ),
                                t({ body: i, duration: y, status: u, text: a, headers: s }))
                              : ((c = G(i, a)),
                                (f = C(z, v, c)),
                                h(
                                  (function(e) {
                                    var t = e.body,
                                      r = e.duration,
                                      n = e.entities,
                                      o = e.meta,
                                      u = e.queryKey,
                                      i = e.responseBody,
                                      a = e.responseHeaders,
                                      s = e.responseText,
                                      c = e.status,
                                      f = e.url;
                                    return {
                                      type: d,
                                      url: f,
                                      body: t,
                                      duration: r,
                                      status: c,
                                      responseBody: i,
                                      responseText: s,
                                      responseHeaders: a,
                                      entities: n,
                                      queryKey: u,
                                      time: Date.now(),
                                      meta: o,
                                    };
                                  })({
                                    url: J,
                                    body: W,
                                    duration: y,
                                    status: u,
                                    entities: f,
                                    queryKey: fe,
                                    responseBody: i,
                                    responseText: a,
                                    responseHeaders: s,
                                    meta: ie,
                                  }),
                                ),
                                t({
                                  body: i,
                                  duration: y,
                                  status: u,
                                  text: a,
                                  transformed: c,
                                  entities: f,
                                  headers: s,
                                })),
                            delete o[fe];
                        });
                    });
                    break;
                  case f:
                    var le = O.queryKey;
                    if (!le) throw new Error('Missing required queryKey field');
                    var ye = g(),
                      de = t(ye);
                    le in ee(de)
                      ? (u(le), (S = v(O)))
                      : (console.warn('Trying to cancel a request that is not in flight: ', le),
                        (S = null));
                    break;
                  case b:
                    var pe = g(),
                      be = t(pe),
                      ve = ee(be);
                    for (var me in ve) ve.hasOwnProperty(me) && u(me);
                    S = v(O);
                    break;
                  default:
                    S = v(O);
                }
                return S;
              };
            };
          };
        };
      r.d(t, 'getQueryKey', function() {
        return E;
      }),
        r.d(t, 'queriesReducer', function() {
          return _;
        }),
        r.d(t, 'entitiesReducer', function() {
          return H;
        }),
        r.d(t, 'errorsReducer', function() {
          return I;
        }),
        r.d(t, 'queryMiddleware', function() {
          return ne;
        }),
        r.d(t, 'cancelQuery', function() {
          return z;
        }),
        r.d(t, 'mutateAsync', function() {
          return G;
        }),
        r.d(t, 'requestAsync', function() {
          return Y;
        }),
        r.d(t, 'updateEntities', function() {
          return V;
        }),
        r.d(t, 'actionTypes', function() {
          return n;
        }),
        r.d(t, 'errorSelectors', function() {
          return o;
        }),
        r.d(t, 'httpMethods', function() {
          return m;
        }),
        r.d(t, 'querySelectors', function() {
          return u;
        });
    },
  ]);
});
