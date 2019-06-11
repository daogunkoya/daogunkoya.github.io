(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./banks/banks.module": [
		"./src/app/banks/banks.module.ts",
		"banks-banks-module"
	],
	"./currencies/currencies.module": [
		"./src/app/currencies/currencies.module.ts",
		"currencies-currencies-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing-module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing-module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/page-not-found/page-not-found.component.ts");





var appRoutes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: 'currencies', loadChildren: './currencies/currencies.module#CurrenciesModule' },
    { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
    { path: 'not-found', component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_4__["PageNotFoundComponent"] },
    { path: '**', redirectTo: '/not-found' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                // RouterModule.forRoot(appRoutes, {useHash: true})
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"] })
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n    \n      <div class=\"row\">\n        <div class=\"col-md-12\">\n            <app-header (featureSelected) = \"onNavigate($event)\"></app-header>\n        </div>\n      </div>\n      <div class=\"row\">\n          <div class=\"col-md-3\">\n            <app-sidebar></app-sidebar>\n          </div>\n          \n          <div class=\"col-md-9\" >\n            <router-outlet></router-outlet>\n          </div>\n          <!-- <div class=\"col-md-9\" >\n              <app-home *ngIf = \"loadedFeature === 'home'\"></app-home>\n              <app-transactions  *ngIf = \"loadedFeature === 'transactions'\"></app-transactions>\n              <app-senders  *ngIf = \"loadedFeature === 'senders'\"></app-senders>\n              <app-receivers  *ngIf = \"loadedFeature === 'receivers'\"></app-receivers>\n             <app-users  *ngIf = \"loadedFeature === 'users'\"></app-users>\n              <app-bank  *ngIf = \"loadedFeature === 'bank'\"></app-bank>\n              <app-rate  *ngIf = \"loadedFeature === 'rate'\"></app-rate>\n              <app-currency  *ngIf = \"loadedFeature === 'currency'\"></app-currency>\n              <app-commission  *ngIf = \"loadedFeature === 'commission'\"></app-commission>\n          </div> -->\n      </div>\n\n\t\t\t\t\t"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility.service */ "./src/app/utility.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'MoneyApp-Angular-Node';
        this.loadedFeature = "home";
    }
    AppComponent.prototype.ngOnInit = function () {
        Object(firebase_app__WEBPACK_IMPORTED_MODULE_2__["initializeApp"])({
            apiKey: _utility_service__WEBPACK_IMPORTED_MODULE_3__["api_key"],
            authDomain: _utility_service__WEBPACK_IMPORTED_MODULE_3__["auth_Domain"]
        });
    };
    AppComponent.prototype.onNavigate = function (loadedFeature) {
        this.loadedFeature = loadedFeature;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/auth.module */ "./src/app/auth/auth.module.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing-module */ "./src/app/app-routing-module.ts");
/* harmony import */ var _shared_input_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/input/input.component */ "./src/app/shared/input/input.component.ts");
/* harmony import */ var _commissions_commissions_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./commissions/commissions.module */ "./src/app/commissions/commissions.module.ts");
/* harmony import */ var _outstandings_outstandings_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./outstandings/outstandings.module */ "./src/app/outstandings/outstandings.module.ts");
/* harmony import */ var _payments_payments_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./payments/payments.module */ "./src/app/payments/payments.module.ts");
/* harmony import */ var _receivers_receivers_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./receivers/receivers.module */ "./src/app/receivers/receivers.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _senders_senders_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./senders/senders.module */ "./src/app/senders/senders.module.ts");
/* harmony import */ var _transactions_transactions_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./transactions/transactions.module */ "./src/app/transactions/transactions.module.ts");
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./users/users.module */ "./src/app/users/users.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _rates_rates_modue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./rates/rates.modue */ "./src/app/rates/rates.modue.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _ngrx_router_store__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngrx/router-store */ "./node_modules/@ngrx/router-store/fesm5/router-store.js");
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngrx/store-devtools */ "./node_modules/@ngrx/store-devtools/fesm5/store-devtools.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _store_app_reducers__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./store/app.reducers */ "./src/app/store/app.reducers.ts");
/* harmony import */ var _store_app_effects__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./store/app.effects */ "./src/app/store/app.effects.ts");





























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_8__["PageNotFoundComponent"],
                _shared_input_input_component__WEBPACK_IMPORTED_MODULE_10__["InputComponent"],
            ],
            imports: [
                _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__["AuthModule"],
                _rates_rates_modue__WEBPACK_IMPORTED_MODULE_21__["RatesModule"],
                _commissions_commissions_module__WEBPACK_IMPORTED_MODULE_11__["CommissionsModule"],
                _outstandings_outstandings_module__WEBPACK_IMPORTED_MODULE_12__["OutstandingsModule"],
                _payments_payments_module__WEBPACK_IMPORTED_MODULE_13__["PaymentsModule"],
                _receivers_receivers_module__WEBPACK_IMPORTED_MODULE_14__["ReceiversModules"],
                _senders_senders_module__WEBPACK_IMPORTED_MODULE_17__["SendersModule"],
                _transactions_transactions_module__WEBPACK_IMPORTED_MODULE_18__["TransactionsModule"],
                _users_users_module__WEBPACK_IMPORTED_MODULE_19__["UsersModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__["SharedModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_5__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClientModule"],
                _ngrx_store__WEBPACK_IMPORTED_MODULE_22__["StoreModule"].forRoot(_store_app_reducers__WEBPACK_IMPORTED_MODULE_27__["reducers"]),
                _ngrx_effects__WEBPACK_IMPORTED_MODULE_23__["EffectsModule"].forRoot(_store_app_effects__WEBPACK_IMPORTED_MODULE_28__["effects"]),
                _ngrx_router_store__WEBPACK_IMPORTED_MODULE_24__["StoreRouterConnectingModule"],
                !_environments_environment__WEBPACK_IMPORTED_MODULE_26__["environment"].production ? _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_25__["StoreDevtoolsModule"].instrument() : [],
                _core_core_module__WEBPACK_IMPORTED_MODULE_16__["CoreModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth-guard.service.ts":
/*!***************************************!*\
  !*** ./src/app/auth-guard.service.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth.service */ "./src/app/auth/auth.service.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            return this.router.navigate(['/']);
        }
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _signin_signin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signin/signin.component */ "./src/app/auth/signin/signin.component.ts");





var authRoutes = [
    { path: 'signup', component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_3__["SignupComponent"] },
    { path: 'signin', component: _signin_signin_component__WEBPACK_IMPORTED_MODULE_4__["SigninComponent"] },
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(authRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _signin_signin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signin/signin.component */ "./src/app/auth/signin/signin.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/auth/auth-routing.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");







var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _signin_signin_component__WEBPACK_IMPORTED_MODULE_3__["SigninComponent"],
                _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__["AuthRoutingModule"]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var AuthService = /** @class */ (function () {
    function AuthService(router) {
        this.router = router;
    }
    AuthService.prototype.isAuthenticated = function () {
        return this.token != null;
    };
    AuthService.prototype.signUp = function (email, password) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]()
                            .createUserWithEmailAndPassword(email, password)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (email, password) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]()
                            .signInWithEmailAndPassword(email, password)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            this.router.navigate(['/']);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AuthService.prototype.signout = function () {
        this.token = null;
        firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]().signOut();
        return this.router.navigate(['signin']);
    };
    AuthService.prototype.getToken = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_app__WEBPACK_IMPORTED_MODULE_2__["auth"]().currentUser.getIdToken()];
                    case 1:
                        response = _a.sent();
                        this.token = response;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/signin/signin.component.css":
/*!**************************************************!*\
  !*** ./src/app/auth/signin/signin.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvc2lnbmluL3NpZ25pbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/auth/signin/signin.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signin/signin.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h6>Signin</h6>\n<div class=\"row\">\n    <div class=\" well well-md col-xs-12 col-sm-10 col-md-7 col-sm-offset-1 col-md-offset-2\">\n     \n     <ng-template></ng-template>\n      <form (ngSubmit)=\"onSignin(f)\" #f=\"ngForm\">\n          <p *ngIf=\"error\" class=\"text-center bg-danger\">{{error}}</p>\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n          <input type=\"email\" id=\"email\" name=\"email\" required email ngModel class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input\n            type=\"password\"\n            id=\"password\"\n            name=\"password\"\n            ngModel\n            required\n            class=\"form-control\">\n        </div>\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!f.valid\">Sign In</button>\n      </form>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "./src/app/auth/signin/signin.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signin/signin.component.ts ***!
  \*************************************************/
/*! exports provided: SigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninComponent", function() { return SigninComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var SigninComponent = /** @class */ (function () {
    function SigninComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SigninComponent.prototype.ngOnChanges = function () {
        this.token = this.authService.getToken();
        console.log('token', this.token);
    };
    SigninComponent.prototype.ngOnInit = function () {
        if (this.token) {
            console.log('token', this.token);
        }
    };
    SigninComponent.prototype.onSignin = function (form) {
        var _this = this;
        var response = this.authService
            .signIn(form.value.email, form.value.password);
        console.log(this.authService.getToken());
        response.catch(function (err) { return _this.error = err.message; });
        form.reset();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('ngForm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], SigninComponent.prototype, "ngForm", void 0);
    SigninComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signin',
            template: __webpack_require__(/*! ./signin.component.html */ "./src/app/auth/signin/signin.component.html"),
            styles: [__webpack_require__(/*! ./signin.component.css */ "./src/app/auth/signin/signin.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], SigninComponent);
    return SigninComponent;
}());



/***/ }),

/***/ "./src/app/auth/signup/signup.component.css":
/*!**************************************************!*\
  !*** ./src/app/auth/signup/signup.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvc2lnbnVwL3NpZ251cC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h6>Signup</h6>\n<div class=\"row\">\n    <div class=\" well well-md col-xs-12 col-sm-10 col-md-7 col-sm-offset-1 col-md-offset-2\">\n     <p *ngIf=\"error\" class=\"text-center bg-danger\">{{error}}</p>\n      <form (ngSubmit)=\"onSignup(f)\" #f=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n          <input type=\"email\" id=\"email\" name=\"email\" required email ngModel class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input\n            type=\"password\"\n            id=\"password\"\n            name=\"password\"\n            ngModel\n            required\n            class=\"form-control\">\n        </div>\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!f.valid\">Sign In</button>\n      </form>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "./src/app/auth/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
    }
    SignupComponent.prototype.ngOnInit = function () {
        //this.authService.signUp('danielbillion@yahoo.com','mostbeautiful')
    };
    SignupComponent.prototype.onSignup = function (form) {
        var _this = this;
        var response = this.authService.signUp(form.value.email, form.value.password);
        console.log('signup', response);
        response.catch(function (err) { return _this.error = err.message; });
        form.reset();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('ngForm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"])
    ], SignupComponent.prototype, "ngForm", void 0);
    SignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/auth/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/auth/signup/signup.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/banks/bank-resolver.service.ts":
/*!************************************************!*\
  !*** ./src/app/banks/bank-resolver.service.ts ***!
  \************************************************/
/*! exports provided: BankResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankResolver", function() { return BankResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _banks_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./banks.service */ "./src/app/banks/banks.service.ts");



var BankResolver = /** @class */ (function () {
    function BankResolver(banksService) {
        this.banksService = banksService;
    }
    BankResolver.prototype.resolve = function (route, state) {
        return this.banksService.getBank(+route.params['id']);
    };
    BankResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_banks_service__WEBPACK_IMPORTED_MODULE_2__["BanksService"]])
    ], BankResolver);
    return BankResolver;
}());



/***/ }),

/***/ "./src/app/banks/banks.service.ts":
/*!****************************************!*\
  !*** ./src/app/banks/banks.service.ts ***!
  \****************************************/
/*! exports provided: BanksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BanksService", function() { return BanksService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility.service */ "./src/app/utility.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var BanksService = /** @class */ (function () {
    function BanksService(http) {
        this.http = http;
        this.bankChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        //bankChanged = new Subject<Bank[]>();
        this.banks = [];
        this.fetchBanks();
    }
    BanksService.prototype.ngOnInit = function () {
    };
    BanksService.prototype.getBanks = function () {
        return this.banks.slice();
    };
    BanksService.prototype.fetchBanks = function () {
        var _this = this;
        this.http.get(_utility_service__WEBPACK_IMPORTED_MODULE_2__["uri"] + 'banks.json')
            .subscribe(function (banks) {
            console.log('banks new', banks);
            _this.banks = banks ? banks : [];
            _this.bankChange.emit(_this.banks);
        });
    };
    BanksService.prototype.storeBank = function () {
        var _this = this;
        this.http.put(_utility_service__WEBPACK_IMPORTED_MODULE_2__["uri"] + 'banks.json', this.banks.slice())
            .subscribe(function (banks) {
            console.log('banks new', banks);
            _this.banks = banks ? banks : [];
            _this.bankChange.emit(_this.banks);
        });
    };
    BanksService.prototype.getBank = function (id) {
        return this.banks.slice().find(function (bank, i) { return i === id; });
        //const result = <any>await this.bankChange.subscribe()
        //console.log('banks await', result)
    };
    BanksService.prototype.addBank = function (newBank) {
        var updateBank = this.banks.slice();
        newBank['id'] = updateBank.length + 1;
        updateBank.push(newBank);
        this.banks = updateBank.slice();
        this.bankChange.emit(updateBank.slice());
        this.storeBank();
    };
    BanksService.prototype.updateBank = function (id, bank) {
        //const findBank = this.banks.find(b=>b.id === id)
        var findBank = this.banks.map(function (bankElement) {
            if (bankElement.id === id) {
                bankElement['name'] = bank.name;
                bankElement['status'] = bank.status;
                return bankElement;
            }
        });
        // if(findBank){
        //     findBank.name = bank.name;
        //     findBank.status  = bank.status
        // }
        this.bankChange.next(this.banks);
        console.log(this.banks);
    };
    BanksService.prototype.deleteBank = function (id) {
        console.log('to delete', id);
        this.banks.splice(id, 1);
        // this.bankChanged.next(this.banks)
        this.bankChange.next(this.banks);
        this.storeBank();
    };
    BanksService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], BanksService);
    return BanksService;
}());



/***/ }),

/***/ "./src/app/commissions/Commission.model.ts":
/*!*************************************************!*\
  !*** ./src/app/commissions/Commission.model.ts ***!
  \*************************************************/
/*! exports provided: Commission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Commission", function() { return Commission; });
var Commission = /** @class */ (function () {
    function Commission(id, start_at, end_at, value, agent_quota, user_id, currency_id, created_at, updated_at) {
        this.id = id;
        this.start_at = start_at;
        this.end_at = end_at;
        this.value = value;
        this.agent_quota = agent_quota;
        this.user_id = user_id;
        currency_id = currency_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return Commission;
}());



/***/ }),

/***/ "./src/app/commissions/commission-resolver.service.ts":
/*!************************************************************!*\
  !*** ./src/app/commissions/commission-resolver.service.ts ***!
  \************************************************************/
/*! exports provided: CommissionResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionResolver", function() { return CommissionResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _commissions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commissions.service */ "./src/app/commissions/commissions.service.ts");



var CommissionResolver = /** @class */ (function () {
    function CommissionResolver(commissionsService) {
        this.commissionsService = commissionsService;
    }
    CommissionResolver.prototype.resolve = function (route, state) {
        return this.commissionsService.getCommission(+route.params['id']);
    };
    CommissionResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_commissions_service__WEBPACK_IMPORTED_MODULE_2__["CommissionsService"]])
    ], CommissionResolver);
    return CommissionResolver;
}());



/***/ }),

/***/ "./src/app/commissions/commission/commission.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/commissions/commission/commission.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1pc3Npb25zL2NvbW1pc3Npb24vY29tbWlzc2lvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/commissions/commission/commission.component.html":
/*!******************************************************************!*\
  !*** ./src/app/commissions/commission/commission.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-11\">\n      <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n          <h6>Set Commission</h6>\n      </div>\n      <div class=\"panel-body\">\n          <form [formGroup]=\"commissionForm\" (ngSubmit)=\"onSubmit()\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"User\">Users</label>\n                  <select class=\"form-control\"  formControlName=\"user_id\">\n                    <option value=\"0\">All</option>\n                    <option value=\"23\">Tonka Rokee</option>\n                    <option value=\"22\">Yema Doe</option>\n                    <option value=\"21\">Mas</option>\n                    <option value=\"20\">Hema</option>\n                    </select>\n                </div>\n              </div>\n              \n            </div>\n            <br/>\n            <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"form-group form-group-sm\">\n                <label for=\"Currency Code\">Currency Code</label>\n                  <select class=\"form-control\"  formControlName=\"currency_id\">\n                    <option value=\"1\">UK-NG</option>\n                    <option value=\"2\">UK-AL</option>\n                    <option value=\"3\">UK-DZ</option>\n                    <option value=\"6\">UK-AO</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n            <br/>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Amount From\">Amount From</label>\n                  <input class=\"form-control col-md-12 btn-block\" formControlName=\"start_at\" type=\"text\">\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Amount To\">Amount To</label>\n                  <input class=\"form-control col-md-12 btn-block\"  formControlName=\"end_at\" type=\"text\">\n                </div>\n              </div>\n            </div>\n            <p></p>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Commission\">Commission</label>\n                  <input class=\"form-control\"  formControlName=\"value\" type=\"text\">\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"% For Agent\">% For Agent</label>\n                  <input class=\"form-control\"  formControlName=\"agent_quota\" type=\"text\" value=\"50\">\n                </div>\n              </div>\n            </div>\t\n            <p>\t</p>\n            <div class=\"row\">\n              <input class=\"btn btn-primary btn-lg col-md-12 btn-block\" type=\"submit\" value=\"Submit\">\n            </div>\n\n          </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/commissions/commission/commission.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/commissions/commission/commission.component.ts ***!
  \****************************************************************/
/*! exports provided: CommissionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionComponent", function() { return CommissionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var CommissionComponent = /** @class */ (function () {
    function CommissionComponent(route) {
        this.route = route;
    }
    CommissionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commissionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'currency_id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('currency id', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            'user_id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('user id', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            'start_at': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('Start At', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            'end_at': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('End At', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            'value': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('value', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            'agent_quota': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('agent Quota', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
        });
        if (this.route.snapshot.params['id']) {
            console.log('param=', this.route.snapshot.params['id']);
            this.route.data.subscribe(function (data) {
                _this.commissionForm.patchValue({
                    'start_at': data.commission.start_at,
                    'end_at': data.commission.end_at,
                    'value': data.commission.value,
                    'agent_quota': data.commission.agent_quota,
                    'currency_id': data.commission.currency_id,
                    'user_id': data.commission.user_id,
                });
            });
        }
    };
    CommissionComponent.prototype.onSubmit = function () {
        console.log('commissionForm', this.commissionForm);
    };
    CommissionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-commission',
            template: __webpack_require__(/*! ./commission.component.html */ "./src/app/commissions/commission/commission.component.html"),
            styles: [__webpack_require__(/*! ./commission.component.css */ "./src/app/commissions/commission/commission.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CommissionComponent);
    return CommissionComponent;
}());



/***/ }),

/***/ "./src/app/commissions/commissions-list/commissions-list.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/commissions/commissions-list/commissions-list.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1pc3Npb25zL2NvbW1pc3Npb25zLWxpc3QvY29tbWlzc2lvbnMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/commissions/commissions-list/commissions-list.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/commissions/commissions-list/commissions-list.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h6>Commissions Settings</h6>\n\n<table  id=\"sort-table\" class=\"table table-striped table-bordered tablesorter\">\n    <thead>\n          <tr>\n            <th>No</th>\n            <th>Member</th>\n            <th>From</th>\n            <th>To</th>\t\n            <th>Currency</th>\t\n            <th>Commission</th>\n            <th>Commission Ratio, B% Agent%</th>\n            <th colspan = \"2\">Actions</th>\n          </tr>\n      </thead>\n      <tbody>\n          <tr *ngFor = \"let commission of commissions;let i=index\">\n              <td>{{i + 1}}</td>\n              <td>{{commission.user_id}}</td>\n              <td>{{commission.start_at}}</td>\n              <td>{{commission.end_at}}</td>\n              <td>{{commission.agent_quota}}</td>\n              <td>{{commission.value}}</td>\n              <td>{{commission.agent_quota}}</td>\n              <td>\n                  <a [routerLink] =\"[commission.id,'edit']\" class = \"btn btn-default\">\n                    Edit\n                  </a>\n\n                  <a [routerLink] =\"[commission.id,'edit']\" class = \"btn btn-danger\">\n                      Delete\n                    </a>\n\n                </td>\n          </tr>\n        </tbody>\n    </table> "

/***/ }),

/***/ "./src/app/commissions/commissions-list/commissions-list.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/commissions/commissions-list/commissions-list.component.ts ***!
  \****************************************************************************/
/*! exports provided: CommissionsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionsListComponent", function() { return CommissionsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _commissions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../commissions.service */ "./src/app/commissions/commissions.service.ts");



var CommissionsListComponent = /** @class */ (function () {
    function CommissionsListComponent(commissionService) {
        this.commissionService = commissionService;
    }
    CommissionsListComponent.prototype.ngOnInit = function () {
        this.commissions = this.commissionService.getCommissions();
    };
    CommissionsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-commissions-list',
            template: __webpack_require__(/*! ./commissions-list.component.html */ "./src/app/commissions/commissions-list/commissions-list.component.html"),
            styles: [__webpack_require__(/*! ./commissions-list.component.css */ "./src/app/commissions/commissions-list/commissions-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_commissions_service__WEBPACK_IMPORTED_MODULE_2__["CommissionsService"]])
    ], CommissionsListComponent);
    return CommissionsListComponent;
}());



/***/ }),

/***/ "./src/app/commissions/commissions-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/commissions/commissions-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: CommissionRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionRoutingModule", function() { return CommissionRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _commissions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commissions.component */ "./src/app/commissions/commissions.component.ts");
/* harmony import */ var _commission_commission_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commission/commission.component */ "./src/app/commissions/commission/commission.component.ts");
/* harmony import */ var _commission_resolver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commission-resolver.service */ "./src/app/commissions/commission-resolver.service.ts");






var commissionsRoutes = [
    { path: 'commissions', component: _commissions_component__WEBPACK_IMPORTED_MODULE_3__["CommissionsComponent"],
        children: [
            { path: 'create', component: _commission_commission_component__WEBPACK_IMPORTED_MODULE_4__["CommissionComponent"] },
            { path: ':id/edit', component: _commission_commission_component__WEBPACK_IMPORTED_MODULE_4__["CommissionComponent"], resolve: { commission: _commission_resolver_service__WEBPACK_IMPORTED_MODULE_5__["CommissionResolver"] } },
        ] }
];
var CommissionRoutingModule = /** @class */ (function () {
    function CommissionRoutingModule() {
    }
    CommissionRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(commissionsRoutes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], CommissionRoutingModule);
    return CommissionRoutingModule;
}());



/***/ }),

/***/ "./src/app/commissions/commissions.component.css":
/*!*******************************************************!*\
  !*** ./src/app/commissions/commissions.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1pc3Npb25zL2NvbW1pc3Npb25zLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/commissions/commissions.component.html":
/*!********************************************************!*\
  !*** ./src/app/commissions/commissions.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <div row = \"row\">\n          <div class= \"col-md-12\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n      <div row = \"row\">\n          <div class= \"col-md-12\">\n              <a [routerLink]=\"['create']\" class= \"btn btn-primary\">New Commission</a>\n              <app-commissions-list></app-commissions-list>\n          </div>\n      </div>\n  "

/***/ }),

/***/ "./src/app/commissions/commissions.component.ts":
/*!******************************************************!*\
  !*** ./src/app/commissions/commissions.component.ts ***!
  \******************************************************/
/*! exports provided: CommissionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionsComponent", function() { return CommissionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CommissionsComponent = /** @class */ (function () {
    function CommissionsComponent() {
    }
    CommissionsComponent.prototype.ngOnInit = function () {
    };
    CommissionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-commissions',
            template: __webpack_require__(/*! ./commissions.component.html */ "./src/app/commissions/commissions.component.html"),
            styles: [__webpack_require__(/*! ./commissions.component.css */ "./src/app/commissions/commissions.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CommissionsComponent);
    return CommissionsComponent;
}());



/***/ }),

/***/ "./src/app/commissions/commissions.module.ts":
/*!***************************************************!*\
  !*** ./src/app/commissions/commissions.module.ts ***!
  \***************************************************/
/*! exports provided: CommissionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionsModule", function() { return CommissionsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _commissions_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commissions.component */ "./src/app/commissions/commissions.component.ts");
/* harmony import */ var _commissions_list_commissions_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commissions-list/commissions-list.component */ "./src/app/commissions/commissions-list/commissions-list.component.ts");
/* harmony import */ var _commission_commission_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commission/commission.component */ "./src/app/commissions/commission/commission.component.ts");
/* harmony import */ var _commissions_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./commissions-routing.module */ "./src/app/commissions/commissions-routing.module.ts");








var CommissionsModule = /** @class */ (function () {
    function CommissionsModule() {
    }
    CommissionsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _commissions_component__WEBPACK_IMPORTED_MODULE_4__["CommissionsComponent"],
                _commissions_list_commissions_list_component__WEBPACK_IMPORTED_MODULE_5__["CommissionsListComponent"],
                _commission_commission_component__WEBPACK_IMPORTED_MODULE_6__["CommissionComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _commissions_routing_module__WEBPACK_IMPORTED_MODULE_7__["CommissionRoutingModule"]
            ]
        })
    ], CommissionsModule);
    return CommissionsModule;
}());



/***/ }),

/***/ "./src/app/commissions/commissions.service.ts":
/*!****************************************************!*\
  !*** ./src/app/commissions/commissions.service.ts ***!
  \****************************************************/
/*! exports provided: CommissionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommissionsService", function() { return CommissionsService; });
/* harmony import */ var _Commission_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Commission.model */ "./src/app/commissions/Commission.model.ts");

var CommissionsService = /** @class */ (function () {
    function CommissionsService() {
        //CommissionChange = new EventEmitter
        this.Commissions = [
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](1, 1, 100, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](2, 100, 200, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](3, 200, 300, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](4, 300, 400, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](5, 400, 500, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
            new _Commission_model__WEBPACK_IMPORTED_MODULE_0__["Commission"](6, 5, 600, 5, 50, 1, 1, '20/02/2019', '6/02/2018'),
        ];
    }
    CommissionsService.prototype.getCommissions = function () {
        return this.Commissions;
    };
    CommissionsService.prototype.getCommission = function (id) {
        return this.Commissions.find(function (Commission) { return Commission.id === id; });
    };
    CommissionsService.prototype.addCommission = function (newCommission) {
        var bks = this.Commissions.slice();
        newCommission['id'] = bks.length + 1;
        bks.push(newCommission);
        this.Commissions = bks.slice();
        //this.CommissionChange.emit(this.Commissions)
        console.log(this.Commissions);
    };
    CommissionsService.prototype.updateCommission = function (id, Commission) {
        var findCommission = this.Commissions.find(function (b) { return b.id === id; });
        if (findCommission) {
            // findCommission.name = Commission.name;
            // findCommission.status  = Commission.status
        }
        console.log(this.Commissions);
    };
    CommissionsService.prototype.deleteCommission = function (id) {
        return this.Commissions.splice(id, 1);
    };
    return CommissionsService;
}());



/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ "./src/app/core/header/header.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app-routing-module */ "./src/app/app-routing-module.ts");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/core/sidebar/sidebar.component.ts");
/* harmony import */ var _sidebar_link_item_link_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sidebar/link-item/link-item.component */ "./src/app/core/sidebar/link-item/link-item.component.ts");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../users/users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _transactions_transactions_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../transactions/transactions.service */ "./src/app/transactions/transactions.service.ts");
/* harmony import */ var _receivers_receiver_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../receivers/receiver.service */ "./src/app/receivers/receiver.service.ts");
/* harmony import */ var _senders_sender_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../senders/sender.service */ "./src/app/senders/sender.service.ts");
/* harmony import */ var _currencies_currencies_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../currencies/currencies.service */ "./src/app/currencies/currencies.service.ts");
/* harmony import */ var _banks_banks_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../banks/banks.service */ "./src/app/banks/banks.service.ts");
/* harmony import */ var _banks_bank_resolver_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../banks/bank-resolver.service */ "./src/app/banks/bank-resolver.service.ts");
/* harmony import */ var _rates_rate_resolver_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../rates/rate-resolver.service */ "./src/app/rates/rate-resolver.service.ts");
/* harmony import */ var _commissions_commission_resolver_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../commissions/commission-resolver.service */ "./src/app/commissions/commission-resolver.service.ts");
/* harmony import */ var _transactions_transaction_resolver_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../transactions/transaction-resolver.service */ "./src/app/transactions/transaction-resolver.service.ts");
/* harmony import */ var _rates_rates_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../rates/rates.service */ "./src/app/rates/rates.service.ts");
/* harmony import */ var _commissions_commissions_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../commissions/commissions.service */ "./src/app/commissions/commissions.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../auth-guard.service */ "./src/app/auth-guard.service.ts");
/* harmony import */ var _shared_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../shared/can-deactivate-guard.service */ "./src/app/shared/can-deactivate-guard.service.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");























var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
                _sidebar_link_item_link_item_component__WEBPACK_IMPORTED_MODULE_6__["LinkItemComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_22__["SharedModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            ],
            exports: [
                _header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
                _sidebar_link_item_link_item_component__WEBPACK_IMPORTED_MODULE_6__["LinkItemComponent"]
            ],
            providers: [_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"],
                _transactions_transactions_service__WEBPACK_IMPORTED_MODULE_8__["TransactionsService"],
                _receivers_receiver_service__WEBPACK_IMPORTED_MODULE_9__["ReceiverService"],
                _senders_sender_service__WEBPACK_IMPORTED_MODULE_10__["SenderService"],
                _currencies_currencies_service__WEBPACK_IMPORTED_MODULE_11__["CurrenciesService"],
                _banks_banks_service__WEBPACK_IMPORTED_MODULE_12__["BanksService"],
                _banks_bank_resolver_service__WEBPACK_IMPORTED_MODULE_13__["BankResolver"],
                _rates_rate_resolver_service__WEBPACK_IMPORTED_MODULE_14__["RateResolver"],
                _commissions_commission_resolver_service__WEBPACK_IMPORTED_MODULE_15__["CommissionResolver"],
                _transactions_transaction_resolver_service__WEBPACK_IMPORTED_MODULE_16__["TransactionResolver"],
                _rates_rates_service__WEBPACK_IMPORTED_MODULE_17__["RatesService"],
                _commissions_commissions_service__WEBPACK_IMPORTED_MODULE_18__["CommissionsService"],
                _auth_auth_service__WEBPACK_IMPORTED_MODULE_19__["AuthService"],
                _auth_guard_service__WEBPACK_IMPORTED_MODULE_20__["AuthGuard"],
                _shared_can_deactivate_guard_service__WEBPACK_IMPORTED_MODULE_21__["CanDeactivateGuard"]],
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/core/header/header.component.css":
/*!**************************************************!*\
  !*** ./src/app/core/header/header.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/core/header/header.component.html":
/*!***************************************************!*\
  !*** ./src/app/core/header/header.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-primary\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a href=\"#\" class=\"navbar-brand\">MoneyApp</a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n          <li routerLinkActive = \"active\">\n            <a href=\"#\" routerLink = '/'>\n              Home</a></li>\n       \n          <li routerLinkActive = \"active\">\n            <a href=\"#\" routerLink = 'senders'>Senders\n            </a></li>\n          \n          <li><a href=\"#\">Send Money</a></li>\n        \n          <li  routerLinkActive = \"active\">\n            <a href=\"#\" \n              routerLink = \"receivers\">\n              Receivers</a></li>\n        \n          <li routerLinkActive = \"active\">\n            <a href=\"#\" \n              [routerLink] =\"['transactions']\"  \n              (click) =\"onSelect('transactions')\">\n              Transactions</a></li>\n      </ul>\n      \n      <ul class=\"nav navbar-nav navbar-right\">\n          <li class=\"dropdown\" appDropdown>\n              <a href=\"#\"  class=\"dropdown-toggle\" role=\"button\">\n                    General <span class=\"caret\">\n                </span></a>\n              <ul class=\"dropdown-menu\">\n                <li><a routerLink = \"/currencies\" style = \"cursor:pointer\">Currency Setup</a></li>\n                <li><a routerLink = \"/rates\" style = \"cursor:pointer\">Rates</a></li>\n                <li><a routerLink = \"/commissions\" style = \"cursor:pointer\">Commissions</a></li>\n                <li><a routerLink = \"/banks\" style = \"cursor:pointer\">Bank</a></li>\n                <li><a routerLink = \"/payments\" style = \"cursor:pointer\">Payments</a></li>\n                <li><a routerLink = \"/outstandings\" style = \"cursor:pointer\">Outstanding</a></li>\n              </ul>\n            </li>\n\n        <li class=\"dropdown\" appDropdown>\n          <a href=\"#\" routerLink=\"signin\" class=\"dropdown-toggle\" role=\"button\">\n                 My Accounts <span class=\"caret\">\n            </span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a routerLink=\"signin\" >Login</a></li>\n            <li><a (click)=\"logout()\" style=\"cursor:pointer\">Logout</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/core/header/header.component.ts":
/*!*************************************************!*\
  !*** ./src/app/core/header/header.component.ts ***!
  \*************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/auth.service */ "./src/app/auth/auth.service.ts");



var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
        this.featureSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onSelect = function (feature) {
        this.featureSelected.emit(feature);
    };
    HeaderComponent.prototype.logout = function () {
        return this.authService.signout();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], HeaderComponent.prototype, "featureSelected", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/core/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/core/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/core/sidebar/link-item/link-item.component.css":
/*!****************************************************************!*\
  !*** ./src/app/core/sidebar/link-item/link-item.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvc2lkZWJhci9saW5rLWl0ZW0vbGluay1pdGVtLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/core/sidebar/link-item/link-item.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/core/sidebar/link-item/link-item.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  link-item works!\n</p>\n"

/***/ }),

/***/ "./src/app/core/sidebar/link-item/link-item.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/core/sidebar/link-item/link-item.component.ts ***!
  \***************************************************************/
/*! exports provided: LinkItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkItemComponent", function() { return LinkItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var LinkItemComponent = /** @class */ (function () {
    function LinkItemComponent() {
    }
    LinkItemComponent.prototype.ngOnInit = function () {
    };
    LinkItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-link-item',
            template: __webpack_require__(/*! ./link-item.component.html */ "./src/app/core/sidebar/link-item/link-item.component.html"),
            styles: [__webpack_require__(/*! ./link-item.component.css */ "./src/app/core/sidebar/link-item/link-item.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LinkItemComponent);
    return LinkItemComponent;
}());



/***/ }),

/***/ "./src/app/core/sidebar/sidebar.component.css":
/*!****************************************************!*\
  !*** ./src/app/core/sidebar/sidebar.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/core/sidebar/sidebar.component.html":
/*!*****************************************************!*\
  !*** ./src/app/core/sidebar/sidebar.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\"> \n    \n  <div class=\"panel panel-primary\">\n      <div class=\"panel-heading\">\n          <p class=\"text-center text-uppercase \"><strong>\t\tAccount:Agent</strong></p>\n      </div>\n  </div>\n\n  <div class=\"panel-body\">\n    <div id=\"user\">\n            <p class=\"text-Capitalize text-center\"> \n                <strong >Todays Rate!</strong></p>\n        </div>\n        <div class=\"panel-border\">\n            <div id=\"quickinfo\" class=\"well well-lg text-danger\">\n                <strong>currency = 1</strong>          \n            </div>\n        </div>\n        <div class=\"list-group\" >\n             <a href=\"#\" \n                  *ngFor = \"let link of links\"\n                  routerLinkActive=\"active\"\n                  routerLink=\"/{{link.url}}\" \n                  class=\"list-group-item\">\n                  <i class=\"fa fa-{{link.image}}\"></i> {{link.name}}</a>\n          </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/core/sidebar/sidebar.component.ts":
/*!***************************************************!*\
  !*** ./src/app/core/sidebar/sidebar.component.ts ***!
  \***************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.links = [
            { name: 'Members', url: 'users', image: 'users' },
            { name: 'Senders', url: 'senders', image: 'senders' },
            { name: 'Receivers', url: 'receivers', image: 'receivers' },
            { name: 'Transactions', url: 'transactions', image: 'briefcase' },
            { name: 'Send Money', url: 'send', image: 'send' },
            { name: 'Currency', url: 'currencies', image: 'briefcase' },
            { name: 'Commissions', url: 'commissions', image: 'briefcase' },
            { name: 'Payments', url: 'payments', image: 'payments' },
            { name: 'Outstandings', url: 'outstandings', image: 'briefcase' },
            { name: 'Rates', url: 'rates', image: 'unlock-alt' },
            { name: 'Banks', url: 'banks', image: 'instuition' },
            { name: 'Setting', url: 'settings', image: 'lock' },
            { name: 'Turnovers', url: 'turnovers', image: 'briefcase' }
        ];
    };
    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/core/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/core/sidebar/sidebar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/currencies/currencies.service.ts":
/*!**************************************************!*\
  !*** ./src/app/currencies/currencies.service.ts ***!
  \**************************************************/
/*! exports provided: CurrenciesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenciesService", function() { return CurrenciesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility.service */ "./src/app/utility.service.ts");





var CurrenciesService = /** @class */ (function () {
    function CurrenciesService(http) {
        this.http = http;
        this.currenciesChanged = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.currencies = [];
        this.fetchCurrencies();
    }
    CurrenciesService.prototype.fetchCurrencies = function () {
        var _this = this;
        this.http.get(_utility_service__WEBPACK_IMPORTED_MODULE_4__["uri"] + 'currencies.json')
            .subscribe(function (currencies) {
            _this.currencies = currencies;
            var active = currencies.filter(function (currency) { return currency.status === 1; });
            _this.currenciesChanged.next(active);
        });
    };
    CurrenciesService.prototype.storeCurrencies = function () {
        var _this = this;
        this.http.put(_utility_service__WEBPACK_IMPORTED_MODULE_4__["uri"] + 'currencies.json', this.getCurrencies())
            .subscribe(function (currencies) {
            _this.currencies = currencies;
            var active = currencies.filter(function (currency) { return currency.status === 1; });
            _this.currenciesChanged.next(active);
        });
    };
    CurrenciesService.prototype.addCurrency = function (currency) {
        this.currencies.slice().push(currency);
        return this.storeCurrencies();
    };
    CurrenciesService.prototype.updateCurrency = function (index, newCurrency) {
        var currency = this.currencies.slice().find(function (i, currency) { return index === 1; });
        var updated = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ currency: currency }, newCurrency);
        this.currencies[index] = updated;
        this.currenciesChanged.next(this.currencies);
        this.storeCurrencies();
    };
    CurrenciesService.prototype.getCurrencies = function () {
        return this.currencies.slice();
    };
    CurrenciesService.prototype.deleteCurrency = function (index) {
        var currencies = this.currencies.splice(index, 1);
        this.currenciesChanged.next(currencies);
        return this.storeCurrencies();
    };
    CurrenciesService.prototype.getAll = function () {
        return this.currencies.slice();
    };
    CurrenciesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CurrenciesService);
    return CurrenciesService;
}());



/***/ }),

/***/ "./src/app/filter.pipe.ts":
/*!********************************!*\
  !*** ./src/app/filter.pipe.ts ***!
  \********************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (value, filterString, propName) {
        console.log('filter=', filterString);
        if (value) {
            if (value.length === 0 || !filterString) {
                return value;
            }
            var listItems = [];
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var item = value_1[_i];
                if (item[propName] == filterString) {
                    listItems.push(item);
                }
            }
            return listItems;
        }
    };
    FilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'filter'
        })
    ], FilterPipe);
    return FilterPipe;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-md-9\">\n            <!--Transactions-->\n               <app-transactions-list></app-transactions-list>\n                \n          \n          <!-- Customers-->\n        \n               <app-senders \n                [senders] = \"senders\"></app-senders>\n          \n        \n\n         <!-- Receivers-->\n  \n             <app-receivers \n              [receivers] = \"receivers\"></app-receivers> \n        \n</div>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _transactions_transactions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/transactions.service */ "./src/app/transactions/transactions.service.ts");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../users/users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _senders_sender_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../senders/sender.service */ "./src/app/senders/sender.service.ts");
/* harmony import */ var _receivers_receiver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../receivers/receiver.service */ "./src/app/receivers/receiver.service.ts");






var HomeComponent = /** @class */ (function () {
    function HomeComponent(usersService, transactionService, senderService, receiverService) {
        this.usersService = usersService;
        this.transactionService = transactionService;
        this.senderService = senderService;
        this.receiverService = receiverService;
        this.actions = false;
        this.trans_fields = ['No', 'Created_at',
            'Agent', 'Tcode',
            'Sender', 'Receiver',
            'Local Pay', 'C_B',
            'Total', 'Amount', 'Status'];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.transactions = this.transactionService.getTransactions();
        this.users = this.usersService.getUsers();
        this.senders = this.senderService.getSenders();
        this.receivers = this.receiverService.getReceivers();
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"],
            _transactions_transactions_service__WEBPACK_IMPORTED_MODULE_2__["TransactionsService"],
            _senders_sender_service__WEBPACK_IMPORTED_MODULE_4__["SenderService"],
            _receivers_receiver_service__WEBPACK_IMPORTED_MODULE_5__["ReceiverService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/outstandings/outstanding/outstanding.component.css":
/*!********************************************************************!*\
  !*** ./src/app/outstandings/outstanding/outstanding.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL291dHN0YW5kaW5ncy9vdXRzdGFuZGluZy9vdXRzdGFuZGluZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/outstandings/outstanding/outstanding.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/outstandings/outstanding/outstanding.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  outstanding works!\n</p>\n"

/***/ }),

/***/ "./src/app/outstandings/outstanding/outstanding.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/outstandings/outstanding/outstanding.component.ts ***!
  \*******************************************************************/
/*! exports provided: OutstandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutstandingComponent", function() { return OutstandingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OutstandingComponent = /** @class */ (function () {
    function OutstandingComponent() {
    }
    OutstandingComponent.prototype.ngOnInit = function () {
    };
    OutstandingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-outstanding',
            template: __webpack_require__(/*! ./outstanding.component.html */ "./src/app/outstandings/outstanding/outstanding.component.html"),
            styles: [__webpack_require__(/*! ./outstanding.component.css */ "./src/app/outstandings/outstanding/outstanding.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OutstandingComponent);
    return OutstandingComponent;
}());



/***/ }),

/***/ "./src/app/outstandings/outstandings-list/outstandings-list.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/outstandings/outstandings-list/outstandings-list.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL291dHN0YW5kaW5ncy9vdXRzdGFuZGluZ3MtbGlzdC9vdXRzdGFuZGluZ3MtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/outstandings/outstandings-list/outstandings-list.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/outstandings/outstandings-list/outstandings-list.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  outstandings-list works!\n</p>\n"

/***/ }),

/***/ "./src/app/outstandings/outstandings-list/outstandings-list.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/outstandings/outstandings-list/outstandings-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: OutstandingsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutstandingsListComponent", function() { return OutstandingsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OutstandingsListComponent = /** @class */ (function () {
    function OutstandingsListComponent() {
    }
    OutstandingsListComponent.prototype.ngOnInit = function () {
    };
    OutstandingsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-outstandings-list',
            template: __webpack_require__(/*! ./outstandings-list.component.html */ "./src/app/outstandings/outstandings-list/outstandings-list.component.html"),
            styles: [__webpack_require__(/*! ./outstandings-list.component.css */ "./src/app/outstandings/outstandings-list/outstandings-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OutstandingsListComponent);
    return OutstandingsListComponent;
}());



/***/ }),

/***/ "./src/app/outstandings/outstandings-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/outstandings/outstandings-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: OutstandingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutstandingsRoutingModule", function() { return OutstandingsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _outstandings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./outstandings.component */ "./src/app/outstandings/outstandings.component.ts");




var outstandingRouting = [
    { path: 'outstandings', component: _outstandings_component__WEBPACK_IMPORTED_MODULE_3__["OutstandingsComponent"] }
];
var OutstandingsRoutingModule = /** @class */ (function () {
    function OutstandingsRoutingModule() {
    }
    OutstandingsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(outstandingRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], OutstandingsRoutingModule);
    return OutstandingsRoutingModule;
}());



/***/ }),

/***/ "./src/app/outstandings/outstandings.component.css":
/*!*********************************************************!*\
  !*** ./src/app/outstandings/outstandings.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL291dHN0YW5kaW5ncy9vdXRzdGFuZGluZ3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/outstandings/outstandings.component.html":
/*!**********************************************************!*\
  !*** ./src/app/outstandings/outstandings.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  outstandings works!\n</p>\n"

/***/ }),

/***/ "./src/app/outstandings/outstandings.component.ts":
/*!********************************************************!*\
  !*** ./src/app/outstandings/outstandings.component.ts ***!
  \********************************************************/
/*! exports provided: OutstandingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutstandingsComponent", function() { return OutstandingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OutstandingsComponent = /** @class */ (function () {
    function OutstandingsComponent() {
    }
    OutstandingsComponent.prototype.ngOnInit = function () {
    };
    OutstandingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-outstandings',
            template: __webpack_require__(/*! ./outstandings.component.html */ "./src/app/outstandings/outstandings.component.html"),
            styles: [__webpack_require__(/*! ./outstandings.component.css */ "./src/app/outstandings/outstandings.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OutstandingsComponent);
    return OutstandingsComponent;
}());



/***/ }),

/***/ "./src/app/outstandings/outstandings.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/outstandings/outstandings.module.ts ***!
  \*****************************************************/
/*! exports provided: OutstandingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutstandingsModule", function() { return OutstandingsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _outstandings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./outstandings.component */ "./src/app/outstandings/outstandings.component.ts");
/* harmony import */ var _outstandings_list_outstandings_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./outstandings-list/outstandings-list.component */ "./src/app/outstandings/outstandings-list/outstandings-list.component.ts");
/* harmony import */ var _outstanding_outstanding_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./outstanding/outstanding.component */ "./src/app/outstandings/outstanding/outstanding.component.ts");
/* harmony import */ var _outstandings_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./outstandings-routing.module */ "./src/app/outstandings/outstandings-routing.module.ts");








var OutstandingsModule = /** @class */ (function () {
    function OutstandingsModule() {
    }
    OutstandingsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _outstandings_component__WEBPACK_IMPORTED_MODULE_4__["OutstandingsComponent"],
                _outstandings_list_outstandings_list_component__WEBPACK_IMPORTED_MODULE_5__["OutstandingsListComponent"],
                _outstanding_outstanding_component__WEBPACK_IMPORTED_MODULE_6__["OutstandingComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _outstandings_routing_module__WEBPACK_IMPORTED_MODULE_7__["OutstandingsRoutingModule"]
            ]
        })
    ], OutstandingsModule);
    return OutstandingsModule;
}());



/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.css":
/*!*************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/*!**************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  page-not-found works!\n</p>\n"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/*!************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.ts ***!
  \************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__(/*! ./page-not-found.component.html */ "./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__(/*! ./page-not-found.component.css */ "./src/app/page-not-found/page-not-found.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/payments/payment/payment.component.css":
/*!********************************************************!*\
  !*** ./src/app/payments/payment/payment.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BheW1lbnRzL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/payments/payment/payment.component.html":
/*!*********************************************************!*\
  !*** ./src/app/payments/payment/payment.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  payment works!\n</p>\n"

/***/ }),

/***/ "./src/app/payments/payment/payment.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/payments/payment/payment.component.ts ***!
  \*******************************************************/
/*! exports provided: PaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentComponent", function() { return PaymentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PaymentComponent = /** @class */ (function () {
    function PaymentComponent() {
    }
    PaymentComponent.prototype.ngOnInit = function () {
    };
    PaymentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-payment',
            template: __webpack_require__(/*! ./payment.component.html */ "./src/app/payments/payment/payment.component.html"),
            styles: [__webpack_require__(/*! ./payment.component.css */ "./src/app/payments/payment/payment.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PaymentComponent);
    return PaymentComponent;
}());



/***/ }),

/***/ "./src/app/payments/payments-list/payments-list.component.css":
/*!********************************************************************!*\
  !*** ./src/app/payments/payments-list/payments-list.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BheW1lbnRzL3BheW1lbnRzLWxpc3QvcGF5bWVudHMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/payments/payments-list/payments-list.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/payments/payments-list/payments-list.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  payments-list works!\n</p>\n"

/***/ }),

/***/ "./src/app/payments/payments-list/payments-list.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/payments/payments-list/payments-list.component.ts ***!
  \*******************************************************************/
/*! exports provided: PaymentsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsListComponent", function() { return PaymentsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PaymentsListComponent = /** @class */ (function () {
    function PaymentsListComponent() {
    }
    PaymentsListComponent.prototype.ngOnInit = function () {
    };
    PaymentsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-payments-list',
            template: __webpack_require__(/*! ./payments-list.component.html */ "./src/app/payments/payments-list/payments-list.component.html"),
            styles: [__webpack_require__(/*! ./payments-list.component.css */ "./src/app/payments/payments-list/payments-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PaymentsListComponent);
    return PaymentsListComponent;
}());



/***/ }),

/***/ "./src/app/payments/payments-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/payments/payments-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: PaymentsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsRoutingModule", function() { return PaymentsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _payments_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payments.component */ "./src/app/payments/payments.component.ts");




var paymentsRouting = [
    { path: 'payments', component: _payments_component__WEBPACK_IMPORTED_MODULE_3__["PaymentsComponent"] }
];
var PaymentsRoutingModule = /** @class */ (function () {
    function PaymentsRoutingModule() {
    }
    PaymentsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(paymentsRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], PaymentsRoutingModule);
    return PaymentsRoutingModule;
}());



/***/ }),

/***/ "./src/app/payments/payments.component.css":
/*!*************************************************!*\
  !*** ./src/app/payments/payments.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BheW1lbnRzL3BheW1lbnRzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/payments/payments.component.html":
/*!**************************************************!*\
  !*** ./src/app/payments/payments.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  payments works!\n</p>\n"

/***/ }),

/***/ "./src/app/payments/payments.component.ts":
/*!************************************************!*\
  !*** ./src/app/payments/payments.component.ts ***!
  \************************************************/
/*! exports provided: PaymentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsComponent", function() { return PaymentsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent() {
    }
    PaymentsComponent.prototype.ngOnInit = function () {
    };
    PaymentsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-payments',
            template: __webpack_require__(/*! ./payments.component.html */ "./src/app/payments/payments.component.html"),
            styles: [__webpack_require__(/*! ./payments.component.css */ "./src/app/payments/payments.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PaymentsComponent);
    return PaymentsComponent;
}());



/***/ }),

/***/ "./src/app/payments/payments.module.ts":
/*!*********************************************!*\
  !*** ./src/app/payments/payments.module.ts ***!
  \*********************************************/
/*! exports provided: PaymentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsModule", function() { return PaymentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _payments_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payments.component */ "./src/app/payments/payments.component.ts");
/* harmony import */ var _payments_list_payments_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payments-list/payments-list.component */ "./src/app/payments/payments-list/payments-list.component.ts");
/* harmony import */ var _payment_payment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payment/payment.component */ "./src/app/payments/payment/payment.component.ts");
/* harmony import */ var _payments_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payments-routing.module */ "./src/app/payments/payments-routing.module.ts");






var PaymentsModule = /** @class */ (function () {
    function PaymentsModule() {
    }
    PaymentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _payments_component__WEBPACK_IMPORTED_MODULE_2__["PaymentsComponent"],
                _payments_list_payments_list_component__WEBPACK_IMPORTED_MODULE_3__["PaymentsListComponent"],
                _payment_payment_component__WEBPACK_IMPORTED_MODULE_4__["PaymentComponent"]
            ],
            imports: [
                _payments_routing_module__WEBPACK_IMPORTED_MODULE_5__["PaymentsRoutingModule"]
            ]
        })
    ], PaymentsModule);
    return PaymentsModule;
}());



/***/ }),

/***/ "./src/app/rates/rate-resolver.service.ts":
/*!************************************************!*\
  !*** ./src/app/rates/rate-resolver.service.ts ***!
  \************************************************/
/*! exports provided: RateResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateResolver", function() { return RateResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rates_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rates.service */ "./src/app/rates/rates.service.ts");



var RateResolver = /** @class */ (function () {
    function RateResolver(RatesService) {
        this.RatesService = RatesService;
    }
    RateResolver.prototype.resolve = function (route, state) {
        return this.RatesService.getRate(+route.params['id']);
    };
    RateResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_rates_service__WEBPACK_IMPORTED_MODULE_2__["RatesService"]])
    ], RateResolver);
    return RateResolver;
}());



/***/ }),

/***/ "./src/app/rates/rate/rate.component.css":
/*!***********************************************!*\
  !*** ./src/app/rates/rate/rate.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JhdGVzL3JhdGUvcmF0ZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/rates/rate/rate.component.html":
/*!************************************************!*\
  !*** ./src/app/rates/rate/rate.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-9 col-sm-offset-1\">\n      <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n          <h6>Set Rate</h6>\n      </div>\n      <div class=\"panel-body\">\n          <form [formGroup] = \"rateForm\" (ngSubmit) = \"onSubmit()\" >\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"User\">Users</label>\n                  <select \n                     [value]=\"user_id\"\n                        class=\"form-control \n                        btn-block\" formControlName=\"user_id\"\n                        >\n                        <option [ngValue]=\"user.id\"\n                         *ngFor=\"let user of users\">\n                            {{user.name}}</option>\n                    </select>\n                </div>\n              </div>\n              \n            </div>\n            <br/><br/>\t\n            <div class=\"row\">\n              <div class=\"col-md-7\">\n                <div class=\"form-group form-group-sm\">\n                <label for=\"Currency Code\">Currency Code</label>\n                <select \n                      [value]=\"currency_id\"\n                      class=\"form-control \n                      btn-block\" formControlName=\"currency_id\">\n                  <option [ngValue]=\"currency.id\"\n              *ngFor=\"let currency of currencies\">\n                 {{currency.destination}}</option>\n         </select>\n                </div>\n              </div>\n              <div class=\"col-md-5\" id = \"income_commission\" >\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Rate\">Rate,  &pound;1 = </label>\n                  <input class=\"form-control\"  formControlName=\"rate\" type=\"text\" >\n                </div>\n              </div>\n              \n            </div>\n            <p><p>\n            <div id = \"income_profit\" class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Bou Rate\">Bou Rate</label>\n                  <input class=\"form-control\" formControlName='bou_rate'>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\t\n                <div class=\"form-group form-group-sm\">\n                  <label for=\"Sold Rate\">Sold Rate</label>\n                  <input class=\"form-control\"   formControlName=\"sold_rate\" type=\"text\" >\n                </div>\n              </div>\n              \n            </div>\n            <p></p>\n              \n            <p>\t</p>\n            <div class=\"row\">\n               <input class=\"btn btn-primary btn-lg col-md-12 btn-block\" type=\"submit\" value=\"Submit\">\n            </div>\n            \n          </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/rates/rate/rate.component.ts":
/*!**********************************************!*\
  !*** ./src/app/rates/rate/rate.component.ts ***!
  \**********************************************/
/*! exports provided: RateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateComponent", function() { return RateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/users/users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var src_app_currencies_currencies_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/currencies/currencies.service */ "./src/app/currencies/currencies.service.ts");
/* harmony import */ var _rates_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rates.service */ "./src/app/rates/rates.service.ts");







var RateComponent = /** @class */ (function () {
    // @Input('users')users:User[]
    // @Input('currencies')currencies:Currency[]
    function RateComponent(route, usersService, currenciesService, ratesService) {
        this.route = route;
        this.usersService = usersService;
        this.currenciesService = currenciesService;
        this.ratesService = ratesService;
    }
    RateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onLoad();
        console.log('users', this.users);
        this.rateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'user_id': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](['jpe', 'ana'], [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
            'currency_id': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
            'rate': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
            'bou_rate': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('Bou Rate', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
            'sold_rate': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('Sold Rate', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
        });
        if (this.route.snapshot.params['id']) {
            this.route.data.subscribe(function (data) {
                console.log('data=', data);
                _this.rateForm.patchValue({
                    'rate': data.rate.rate,
                    'bou_rate': data.rate.bou_rate,
                    'sold_rate': data.rate.sold_rate,
                    'user_id': data.rate.user_id,
                    'currency_id': data.rate.currency_id
                });
            });
        }
    };
    RateComponent.prototype.onLoad = function () {
        var _this = this;
        this.userSubscription = this.usersService.userChanges
            .subscribe(function (users) {
            if (users) {
                _this.users = users;
            }
        });
        this.currenciesSubscription =
            this.currenciesService.currenciesChanged
                .subscribe(function (currencies) {
                if (currencies) {
                    console.log('currencies', currencies);
                    _this.currencies = currencies;
                }
            });
    };
    RateComponent.prototype.onSubmit = function () {
        this.rateForm['created_at'] = new Date();
        console.log('rateForm', this.rateForm.value);
        this.ratesService.addRate(this.rateForm.value);
        this.rateForm.reset();
    };
    RateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rate',
            template: __webpack_require__(/*! ./rate.component.html */ "./src/app/rates/rate/rate.component.html"),
            styles: [__webpack_require__(/*! ./rate.component.css */ "./src/app/rates/rate/rate.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], src_app_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"],
            src_app_currencies_currencies_service__WEBPACK_IMPORTED_MODULE_5__["CurrenciesService"],
            _rates_service__WEBPACK_IMPORTED_MODULE_6__["RatesService"]])
    ], RateComponent);
    return RateComponent;
}());



/***/ }),

/***/ "./src/app/rates/rates-list/rates-list.component.css":
/*!***********************************************************!*\
  !*** ./src/app/rates/rates-list/rates-list.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JhdGVzL3JhdGVzLWxpc3QvcmF0ZXMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/rates/rates-list/rates-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/rates/rates-list/rates-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h6>Rate History</h6>\n    \t\t<table  id=\"sort-table\" class=\"table table-striped table-bordered tablesorter\">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t<th>No</th>\n\t\t\t\t\t\t\t\t\t\t<th>Date</th>\n\t\t\t\t\t\t\t\t\t\t<th>Member</th>\n\t\t\t\t\t\t\t\t\t\t<th>Rate</th>\t\n\t\t\t\t\t\t\t\t\t\t<th>Bou</th>\t\n\t\t\t\t\t\t\t\t\t\t<th>Sold</th>\t\n\t\t\t\t\t\t\t\t\t\t<th>Currrency</th>\t\n\t\t\t\t\t\t\t\t\t\t<th>Actions</th>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n                  <tr *ngFor = \"let rate of rates; let i = index \">\n                        <td>{{i + 1}}</td>\n                        <td>{{rate.created_at}}</td>\n                        <td>{{rate.user_id}}</td>\n                        <td>{{rate.rate}}</td>\n                        <td>{{rate.bou_rate}}</td>\n                        <td>{{rate.sold_at}}</td>\n                        <td>{{rate.currency_id}}</td>\n                        <td>\n                          <a [routerLink] =\"[rate.id,'edit']\" class = \"btn btn-default\">\n                            Edit\n                          </a>\n\n                          <a \n                              (click)=\"deleteRate(index)\" class = \"btn btn-danger\">\n                              Delete\n                            </a>\n\n                        </td>\n                  </tr>\n              </tbody>\n        </table>\n"

/***/ }),

/***/ "./src/app/rates/rates-list/rates-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/rates/rates-list/rates-list.component.ts ***!
  \**********************************************************/
/*! exports provided: RatesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatesListComponent", function() { return RatesListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rates_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rates.service */ "./src/app/rates/rates.service.ts");



var RatesListComponent = /** @class */ (function () {
    function RatesListComponent(rateService) {
        this.rateService = rateService;
    }
    RatesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ratesSubscription = this.rateService.rateChange
            .subscribe(function (rates) {
            if (rates) {
                _this.rates = rates;
            }
        });
        this.rates = this.rateService.getRates();
    };
    RatesListComponent.prototype.deleteRate = function (index) {
    };
    RatesListComponent.prototype.ngOnDestroy = function () {
        return this.ratesSubscription.unsubscribe();
    };
    RatesListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rates-list',
            template: __webpack_require__(/*! ./rates-list.component.html */ "./src/app/rates/rates-list/rates-list.component.html"),
            styles: [__webpack_require__(/*! ./rates-list.component.css */ "./src/app/rates/rates-list/rates-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_rates_service__WEBPACK_IMPORTED_MODULE_2__["RatesService"]])
    ], RatesListComponent);
    return RatesListComponent;
}());



/***/ }),

/***/ "./src/app/rates/rates-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/rates/rates-routing.module.ts ***!
  \***********************************************/
/*! exports provided: RatesRoutingModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatesRoutingModules", function() { return RatesRoutingModules; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _rates_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rates.component */ "./src/app/rates/rates.component.ts");
/* harmony import */ var _rate_rate_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rate/rate.component */ "./src/app/rates/rate/rate.component.ts");
/* harmony import */ var _rate_resolver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rate-resolver.service */ "./src/app/rates/rate-resolver.service.ts");






var ratesRouting = [
    { path: 'rates', component: _rates_component__WEBPACK_IMPORTED_MODULE_3__["RatesComponent"],
        children: [
            { path: 'create', component: _rate_rate_component__WEBPACK_IMPORTED_MODULE_4__["RateComponent"] },
            { path: ':id/edit', component: _rate_rate_component__WEBPACK_IMPORTED_MODULE_4__["RateComponent"], resolve: { rate: _rate_resolver_service__WEBPACK_IMPORTED_MODULE_5__["RateResolver"] } }
        ] },
];
var RatesRoutingModules = /** @class */ (function () {
    function RatesRoutingModules() {
    }
    RatesRoutingModules = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(ratesRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], RatesRoutingModules);
    return RatesRoutingModules;
}());



/***/ }),

/***/ "./src/app/rates/rates.component.css":
/*!*******************************************!*\
  !*** ./src/app/rates/rates.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JhdGVzL3JhdGVzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/rates/rates.component.html":
/*!********************************************!*\
  !*** ./src/app/rates/rates.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-md-12\">\n    <a routerLink=\"create\" class=\"btn btn-primary\">New Rate</a>\n    <div row = \"row\">\n        <div class= \"col-md-12\">\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n    <!-- <div class=\"row\">\n        <div class=\"col-md-12\">\n                <button\n                (click)=\"activate()\"\n              class= \"btn btn-primary\">New Rate</button><hr>\n              <ng-template [ngIf]=\"show\">\n                    <app-rate \n                        [currencies] = \"currencies\"\n                        [users]=\"usersList\">\n                    </app-rate>\n              </ng-template> \n        </div>\n    </div> -->\n    <div row = \"row\">\n        <div class= \"col-md-12\">\n           <app-rates-list></app-rates-list>\n        </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/rates/rates.component.ts":
/*!******************************************!*\
  !*** ./src/app/rates/rates.component.ts ***!
  \******************************************/
/*! exports provided: RatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatesComponent", function() { return RatesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RatesComponent = /** @class */ (function () {
    function RatesComponent() {
    }
    RatesComponent.prototype.ngOnInit = function () {
    };
    RatesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rates',
            template: __webpack_require__(/*! ./rates.component.html */ "./src/app/rates/rates.component.html"),
            styles: [__webpack_require__(/*! ./rates.component.css */ "./src/app/rates/rates.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], RatesComponent);
    return RatesComponent;
}());



/***/ }),

/***/ "./src/app/rates/rates.modue.ts":
/*!**************************************!*\
  !*** ./src/app/rates/rates.modue.ts ***!
  \**************************************/
/*! exports provided: RatesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatesModule", function() { return RatesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rates_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rates.component */ "./src/app/rates/rates.component.ts");
/* harmony import */ var _rates_list_rates_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rates-list/rates-list.component */ "./src/app/rates/rates-list/rates-list.component.ts");
/* harmony import */ var _rate_rate_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rate/rate.component */ "./src/app/rates/rate/rate.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _rates_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rates-routing.module */ "./src/app/rates/rates-routing.module.ts");








var RatesModule = /** @class */ (function () {
    function RatesModule() {
    }
    RatesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _rates_component__WEBPACK_IMPORTED_MODULE_2__["RatesComponent"],
                _rates_list_rates_list_component__WEBPACK_IMPORTED_MODULE_3__["RatesListComponent"],
                _rate_rate_component__WEBPACK_IMPORTED_MODULE_4__["RateComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _rates_routing_module__WEBPACK_IMPORTED_MODULE_7__["RatesRoutingModules"]
            ]
        })
    ], RatesModule);
    return RatesModule;
}());



/***/ }),

/***/ "./src/app/rates/rates.service.ts":
/*!****************************************!*\
  !*** ./src/app/rates/rates.service.ts ***!
  \****************************************/
/*! exports provided: RatesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatesService", function() { return RatesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility.service */ "./src/app/utility.service.ts");




var RatesService = /** @class */ (function () {
    function RatesService(http) {
        this.http = http;
        this.rateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.rates = [];
        this.fetchRates();
    }
    RatesService.prototype.fetchRates = function () {
        var _this = this;
        this.http.get(_utility_service__WEBPACK_IMPORTED_MODULE_3__["uri"] + 'rates.json')
            .subscribe(function (rates) {
            _this.rates = rates;
            _this.rateChange.emit(rates);
        });
    };
    RatesService.prototype.storeRates = function () {
        var _this = this;
        this.http.put(_utility_service__WEBPACK_IMPORTED_MODULE_3__["uri"] + 'Rate.json', this.getRates())
            .subscribe(function (rates) {
            _this.rates = rates;
            _this.rateChange.emit(rates);
        });
    };
    RatesService.prototype.getRates = function () {
        return this.rates.slice();
    };
    RatesService.prototype.getRate = function (id) {
        return this.rates.find(function (bank) { return bank.id === id; });
    };
    RatesService.prototype.addRate = function (newRate) {
        var rates = this.rates.slice();
        newRate['id'] = rates.length + 1;
        rates.push(newRate);
        this.rateChange.emit(rates);
        this.rates = rates.slice();
        this.storeRates();
    };
    RatesService.prototype.updateRate = function (id, bank) {
        var findBank = this.rates.find(function (b) { return b.id === id; });
        if (findBank) {
            // findBank.name = bank.name;
            // findBank.status  = bank.status
        }
        console.log(this.rates);
    };
    RatesService.prototype.deleteBank = function (id) {
        return this.rates.splice(id, 1);
    };
    RatesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], RatesService);
    return RatesService;
}());



/***/ }),

/***/ "./src/app/receivers/receiver.model.ts":
/*!*********************************************!*\
  !*** ./src/app/receivers/receiver.model.ts ***!
  \*********************************************/
/*! exports provided: Receiver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Receiver", function() { return Receiver; });
var Receiver = /** @class */ (function () {
    function Receiver(id, fname, lname, user_id, sender_id, phone, bank, transfer_type, identity_type, account_number, created_at) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.user_id = user_id;
        this.sender_id = sender_id;
        this.phone = phone;
        this.bank = bank;
        this.transfer_type = transfer_type;
        this.identity_type = identity_type;
        this.account_number = account_number;
        this.created_at = created_at;
    }
    return Receiver;
}());



/***/ }),

/***/ "./src/app/receivers/receiver.service.ts":
/*!***********************************************!*\
  !*** ./src/app/receivers/receiver.service.ts ***!
  \***********************************************/
/*! exports provided: ReceiverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverService", function() { return ReceiverService; });
/* harmony import */ var _receiver_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./receiver.model */ "./src/app/receivers/receiver.model.ts");

var ReceiverService = /** @class */ (function () {
    function ReceiverService() {
        this.receivers = [
            new _receiver_model__WEBPACK_IMPORTED_MODULE_0__["Receiver"](1, 'Thomas', 'Gofe', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/02/2014'),
            new _receiver_model__WEBPACK_IMPORTED_MODULE_0__["Receiver"](2, 'Felix', 'Roke', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/02/2016'),
            new _receiver_model__WEBPACK_IMPORTED_MODULE_0__["Receiver"](3, 'Herma', 'Lo', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '9/11/2016'),
            new _receiver_model__WEBPACK_IMPORTED_MODULE_0__["Receiver"](4, 'dema', 'aswa', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/12/2015'),
        ];
    }
    ReceiverService.prototype.getReceivers = function () {
        return this.receivers.slice();
    };
    ReceiverService.prototype.getReceiver = function (id) {
        return this.receivers.find(function (receiver) { return receiver.id === id; });
    };
    return ReceiverService;
}());



/***/ }),

/***/ "./src/app/receivers/receiver/receiver.component.css":
/*!***********************************************************!*\
  !*** ./src/app/receivers/receiver/receiver.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlY2VpdmVycy9yZWNlaXZlci9yZWNlaXZlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/receivers/receiver/receiver.component.html":
/*!************************************************************!*\
  !*** ./src/app/receivers/receiver/receiver.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5>Edit Receivers</h5>\n  <div class=\"well well-md\">\n    <form (ngSubmit) = \"onSubmit(f)\" #f=\"ngForm\">\n      <div class=\"row\">\n            <div class=\"col-md-5\">\n              <div class=\"form-group form-group-sm\">\n                <span class=\"text-danger\">*</span>\n                <label for=\"fname\">First Name</label> \n                <input\n                    type=\"text\"\n                    ngModel\n                    name=\"fname\"\n                    required\n                    class=\"form-control\">\n                   \n              </div>\n            </div>\n            \n            <div class=\"col-md-5 \">\n              <div class=\"form-group form-group-sm\">\n                <span class=\"text-danger\">*</span>\n                <label for=\"lname\">Last Name</label>\n                <input\n                      type=\"text\"\n                      ngModel\n                      name=\"lname\"\n                      required\n                      class=\"form-control\">\n                     \n              </div>\n            </div>\n      </div>\t\t\n      <div class=\"row\">\t\n            <div class=\"col-md-5\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"transfer_type\">Transfer Type:</label>\n                    <select class=\"form-control\" ngModel name=\"transfer_type\" required>\n                      <option value=\"Pick Up\">Pick Up</option>\n                      <option value=\"Pick\">Bank Account</option></select>\n              </div>\n            </div>\n\n            <div class=\"col-md-5\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"phone\">Phone</label>\n                <input class=\"form-control\"ngModel  name=\"phone\" type=\"text\">\n              </div>\n            </div>\n      </div>\n          \n            \n    <div class=\"row\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n              <label for=\"bank\">Bank</label>\n                <select class=\"form-control\" ngModel name=\"bank\">\n                  <optgroup label=\"0\"><option value=\"Keystone Bank\" selected=\"selected\">Keystone Bank</option><option value=\"unitys bank\">unitys bank</option><option value=\"Skye bank\">Skye bank</option><option value=\"Spring Bank\">Spring Bank</option><option value=\"Stanbic Bank\">Stanbic Bank</option><option value=\"Unity bank\">Unity bank</option><option value=\"United Bank Of Africa\">United Bank Of Africa</option><option value=\"Wema Bank\">Wema Bank</option><option value=\"Zenith Bank\">Zenith Bank</option><option value=\"Access Bank\">Access Bank</option><option value=\"Diamond Bank\">Diamond Bank</option><option value=\"Guaranty Trust Bank\">Guaranty Trust Bank</option><option value=\"Enterprise Bank \">Enterprise Bank </option><option value=\"Eco bank\">Eco bank</option><option value=\"First Bank\">First Bank</option><option value=\"first city monument bank\">first city monument bank</option><option value=\"union bank\">union bank</option><option value=\"fidelity bank\">fidelity bank</option><option value=\"standard charterred bank\">standard charterred bank</option><option value=\"mainstreet \">mainstreet </option><option value=\"Equitoria Trust Bank\">Equitoria Trust Bank</option><option value=\"Halifax Bank\">Halifax Bank</option><option value=\"roke bank\">roke bank</option><option value=\"bolis bank\">bolis bank</option><option value=\"Nome Bank\">Nome Bank</option><option value=\"Ramon Bank\">Ramon Bank</option></optgroup></select>\n                \n              </div>\n            </div>\n\n          </div>\n          \n    <div class=\"row\"  id=\"actno\">\n          <div class=\"col-md-5 col-md-offset-3\" >\n            <div class=\"form-group form-group-sm\">\n                <label for=\"account_number\">Account Number</label>\n                <input class=\"form-control\" ngModel name=\"account_number\" type=\"text\" >\n              </div>\n            </div>\n    </div>\n    <div class=\"row\" id=\"modeId\" >\t\n      <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <label for=\"Identity\">Identity</label>\n            <select class=\"form-control\" ngModel name=\"identity_type\">\n              <option value=\"National ID\" selected=\"selected\">National ID</option>\n              <option value=\"Intl Passport\">Intl Passport</option>\n              <option value=\"Drivers Lincence\">Drivers Lincence</option>\n              <option value=\"Any type of ID\">Any type of ID</option></select>\t\n              </div>\n            </div>\n    </div>\n          \n    <div class=\"row\">\n      <div class=\"col-md-5 col-md-offset-4\">\n        <div class=\"form-group form-group-sm\">\n          <br/><br/>\n          <button class=\"btn btn-primary btn-block\" [disabled]=\"!f.valid\">Submit</button> \n              </div>\n            </div>\n    </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./src/app/receivers/receiver/receiver.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/receivers/receiver/receiver.component.ts ***!
  \**********************************************************/
/*! exports provided: ReceiverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverComponent", function() { return ReceiverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _receiver_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../receiver.service */ "./src/app/receivers/receiver.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





var ReceiverComponent = /** @class */ (function () {
    function ReceiverComponent(route, router, receiverService) {
        this.route = route;
        this.router = router;
        this.receiverService = receiverService;
        this.allowEdit = false;
        this.changesSaved = false;
        this.fname = "";
        this.lname = "";
        this.phone = "";
        this.account_number = "";
    }
    ReceiverComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.params['id']) {
            this.route.params.subscribe(function (param) {
                _this.receiver = _this.receiverService.getReceiver(+param['id']);
                console.log('receiver=', _this.receiver);
                _this.fname = _this.receiver.fname;
                _this.lname = _this.receiver.lname;
                _this.phone = _this.receiver.phone;
                _this.account_number = _this.receiver.account_number;
            });
        }
    };
    ReceiverComponent.prototype.canDeactivate = function () {
        if ((this.fname !== this.receiver.fname || this.receiver.lname !== this.lname) && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        }
        else {
            return true;
        }
    };
    ReceiverComponent.prototype.onSubmit = function (fValues) {
        var nValues = fValues.value;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('f'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"])
    ], ReceiverComponent.prototype, "formValue", void 0);
    ReceiverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-receiver',
            template: __webpack_require__(/*! ./receiver.component.html */ "./src/app/receivers/receiver/receiver.component.html"),
            styles: [__webpack_require__(/*! ./receiver.component.css */ "./src/app/receivers/receiver/receiver.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _receiver_service__WEBPACK_IMPORTED_MODULE_3__["ReceiverService"]])
    ], ReceiverComponent);
    return ReceiverComponent;
}());



/***/ }),

/***/ "./src/app/receivers/receivers-list/receivers-list.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/receivers/receivers-list/receivers-list.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlY2VpdmVycy9yZWNlaXZlcnMtbGlzdC9yZWNlaXZlcnMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/receivers/receivers-list/receivers-list.component.html":
/*!************************************************************************!*\
  !*** ./src/app/receivers/receivers-list/receivers-list.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n     <h6 class=\"col-md-5\">Receivers</h6>\n     <input \n          [(ngModel)]=\"filterString\"\n          class=\"form-goup col-md-5 col-md-offset-1\"\n         placeholder=\"Search...\" >  \n      <table class=\"table table-striped table-bordered\">\n        <thead>\n          <tr>\n              <th>No</th>\n              <th>Created</th>\n              <th>Name</th>\n              <th>Mobile</th>\n              <th>Actions</th>\n            </thead>\n        <tbody>\t  \n          <tr *ngFor = \"let receiver of (receiversListState | async).receiverList |filter:filterString:'name'; let i = index\">\n            <td>{{i + 1}}</td>\n            <td>{{receiver.created_at}}</td>\n            <td>{{receiver.fname}} {{receiver.lname}}</td>\n            <td>{{receiver.phone}}</td>\n            <td>\n                <a \n                    [routerLink] = \"['transaction/create',receiver.id]\">\n                    Send Money</a>\n              </td>\n            <td>\n              <a class = \"btn btn-default\"\n                  [routerLink] = \"[receiver.id, 'edit']\">\n                  Edit</a>\n              <a class = \"btn btn-danger\"\n                  [routerLink] = \"['/receivers/delete',receiver.id]\">\n                  Delete</a>\n            </td>\n            <td></td>\n          </tr>\n      </tbody>\n      </table>\n  \n"

/***/ }),

/***/ "./src/app/receivers/receivers-list/receivers-list.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/receivers/receivers-list/receivers-list.component.ts ***!
  \**********************************************************************/
/*! exports provided: ReceiversListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiversListComponent", function() { return ReceiversListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _receiver_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../receiver.service */ "./src/app/receivers/receiver.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_receiver_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/receiver.actions */ "./src/app/receivers/store/receiver.actions.ts");





var ReceiversListComponent = /** @class */ (function () {
    function ReceiversListComponent(receiverService, store) {
        this.receiverService = receiverService;
        this.store = store;
    }
    ReceiversListComponent.prototype.ngOnInit = function () {
        // this.receivers = this.receiverService.getReceivers()
        this.store.dispatch(new _store_receiver_actions__WEBPACK_IMPORTED_MODULE_4__["FetchReceivers"]());
        this.receiversListState = this.store.select('receivers');
    };
    ReceiversListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-receivers-list',
            template: __webpack_require__(/*! ./receivers-list.component.html */ "./src/app/receivers/receivers-list/receivers-list.component.html"),
            styles: [__webpack_require__(/*! ./receivers-list.component.css */ "./src/app/receivers/receivers-list/receivers-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_receiver_service__WEBPACK_IMPORTED_MODULE_2__["ReceiverService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], ReceiversListComponent);
    return ReceiversListComponent;
}());



/***/ }),

/***/ "./src/app/receivers/receivers-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/receivers/receivers-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ReceiversRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiversRoutingModule", function() { return ReceiversRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _receivers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./receivers.component */ "./src/app/receivers/receivers.component.ts");
/* harmony import */ var _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./receiver/receiver.component */ "./src/app/receivers/receiver/receiver.component.ts");





var receiversRouting = [
    { path: 'receivers',
        // canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: _receivers_component__WEBPACK_IMPORTED_MODULE_3__["ReceiversComponent"],
        children: [
            { path: 'create', component: _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_4__["ReceiverComponent"] /*, canDeactivate: [CanDeactivateGuard] */ },
            { path: ':id', component: _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_4__["ReceiverComponent"] },
            { path: ':id/edit', component: _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_4__["ReceiverComponent"] /*, canDeactivate: [CanDeactivateGuard] */ }
        ] }
];
var ReceiversRoutingModule = /** @class */ (function () {
    function ReceiversRoutingModule() {
    }
    ReceiversRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(receiversRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], ReceiversRoutingModule);
    return ReceiversRoutingModule;
}());



/***/ }),

/***/ "./src/app/receivers/receivers.component.css":
/*!***************************************************!*\
  !*** ./src/app/receivers/receivers.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlY2VpdmVycy9yZWNlaXZlcnMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/receivers/receivers.component.html":
/*!****************************************************!*\
  !*** ./src/app/receivers/receivers.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " <div class = \"col-md-12\">\n   <a routerLink=\"create\" class=\"btn btn-primary\">New Receiver</a>\n      <br/>\n   <router-outlet></router-outlet>\n  \n   <app-receivers-list ></app-receivers-list>\n </div>\n"

/***/ }),

/***/ "./src/app/receivers/receivers.component.ts":
/*!**************************************************!*\
  !*** ./src/app/receivers/receivers.component.ts ***!
  \**************************************************/
/*! exports provided: ReceiversComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiversComponent", function() { return ReceiversComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _receiver_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receiver.service */ "./src/app/receivers/receiver.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");




var ReceiversComponent = /** @class */ (function () {
    function ReceiversComponent(receiverService, store) {
        this.receiverService = receiverService;
        this.store = store;
    }
    ReceiversComponent.prototype.ngOnInit = function () {
        //this.receivers = this.receiverService.getReceivers()
        this.receiversListState = this.store.select('receivers');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('receivers'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ReceiversComponent.prototype, "receivers", void 0);
    ReceiversComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-receivers',
            template: __webpack_require__(/*! ./receivers.component.html */ "./src/app/receivers/receivers.component.html"),
            styles: [__webpack_require__(/*! ./receivers.component.css */ "./src/app/receivers/receivers.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_receiver_service__WEBPACK_IMPORTED_MODULE_2__["ReceiverService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], ReceiversComponent);
    return ReceiversComponent;
}());



/***/ }),

/***/ "./src/app/receivers/receivers.module.ts":
/*!***********************************************!*\
  !*** ./src/app/receivers/receivers.module.ts ***!
  \***********************************************/
/*! exports provided: ReceiversModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiversModules", function() { return ReceiversModules; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _receivers_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./receivers.component */ "./src/app/receivers/receivers.component.ts");
/* harmony import */ var _receivers_list_receivers_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./receivers-list/receivers-list.component */ "./src/app/receivers/receivers-list/receivers-list.component.ts");
/* harmony import */ var _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./receiver/receiver.component */ "./src/app/receivers/receiver/receiver.component.ts");
/* harmony import */ var _receivers_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./receivers-routing.module */ "./src/app/receivers/receivers-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");









var ReceiversModules = /** @class */ (function () {
    function ReceiversModules() {
    }
    ReceiversModules = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _receivers_component__WEBPACK_IMPORTED_MODULE_4__["ReceiversComponent"],
                _receivers_list_receivers_list_component__WEBPACK_IMPORTED_MODULE_5__["ReceiversListComponent"],
                _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_6__["ReceiverComponent"],
            ],
            exports: [
                _receivers_component__WEBPACK_IMPORTED_MODULE_4__["ReceiversComponent"],
                _receivers_list_receivers_list_component__WEBPACK_IMPORTED_MODULE_5__["ReceiversListComponent"],
                _receiver_receiver_component__WEBPACK_IMPORTED_MODULE_6__["ReceiverComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _receivers_routing_module__WEBPACK_IMPORTED_MODULE_7__["ReceiversRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
            ]
        })
    ], ReceiversModules);
    return ReceiversModules;
}());



/***/ }),

/***/ "./src/app/receivers/store/receiver.actions.ts":
/*!*****************************************************!*\
  !*** ./src/app/receivers/store/receiver.actions.ts ***!
  \*****************************************************/
/*! exports provided: ADD_RECEIVER, ADD_RECEIVERS, UPDATE_RECEIVER, DELETE_RECEIVER, START_EDIT, STOP_EDIT, Fetch_Receivers, FetchReceivers, AddReceivers, AddReceiver, UpdateReceiver, DeleteReceiver, StartEdit, StopEdit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_RECEIVER", function() { return ADD_RECEIVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_RECEIVERS", function() { return ADD_RECEIVERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_RECEIVER", function() { return UPDATE_RECEIVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_RECEIVER", function() { return DELETE_RECEIVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_EDIT", function() { return START_EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_EDIT", function() { return STOP_EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fetch_Receivers", function() { return Fetch_Receivers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchReceivers", function() { return FetchReceivers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddReceivers", function() { return AddReceivers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddReceiver", function() { return AddReceiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateReceiver", function() { return UpdateReceiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteReceiver", function() { return DeleteReceiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartEdit", function() { return StartEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StopEdit", function() { return StopEdit; });
var ADD_RECEIVER = 'ADD_RECEIVER';
var ADD_RECEIVERS = 'ADD_RECEIVERS';
var UPDATE_RECEIVER = 'UPDATE_RECEIVER';
var DELETE_RECEIVER = 'DELETE_RECEIVER';
var START_EDIT = 'START_EDIT';
var STOP_EDIT = 'STOP_EDIT';
var Fetch_Receivers = 'Fetch_Receivers';
var FetchReceivers = /** @class */ (function () {
    function FetchReceivers() {
        this.type = Fetch_Receivers;
    }
    return FetchReceivers;
}());

var AddReceivers = /** @class */ (function () {
    function AddReceivers(payload) {
        this.payload = payload;
        this.type = ADD_RECEIVERS;
    }
    return AddReceivers;
}());

var AddReceiver = /** @class */ (function () {
    function AddReceiver(payload) {
        this.payload = payload;
        this.type = ADD_RECEIVER;
    }
    return AddReceiver;
}());

var UpdateReceiver = /** @class */ (function () {
    function UpdateReceiver(payload) {
        this.payload = payload;
        this.type = UPDATE_RECEIVER;
    }
    return UpdateReceiver;
}());

var DeleteReceiver = /** @class */ (function () {
    function DeleteReceiver() {
        this.type = DELETE_RECEIVER;
    }
    return DeleteReceiver;
}());

var StartEdit = /** @class */ (function () {
    function StartEdit(payload) {
        this.payload = payload;
        this.type = START_EDIT;
    }
    return StartEdit;
}());

var StopEdit = /** @class */ (function () {
    function StopEdit() {
        this.type = STOP_EDIT;
    }
    return StopEdit;
}());



/***/ }),

/***/ "./src/app/receivers/store/receiver.effects.ts":
/*!*****************************************************!*\
  !*** ./src/app/receivers/store/receiver.effects.ts ***!
  \*****************************************************/
/*! exports provided: ReceiverEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiverEffects", function() { return ReceiverEffects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _receiver_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receiver.actions */ "./src/app/receivers/store/receiver.actions.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utility.service */ "./src/app/utility.service.ts");







var ReceiverEffects = /** @class */ (function () {
    function ReceiverEffects(actions$, httpClient) {
        var _this = this;
        this.actions$ = actions$;
        this.httpClient = httpClient;
        this.recipeFetch = this.actions$
            .pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_receiver_actions__WEBPACK_IMPORTED_MODULE_2__["Fetch_Receivers"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (action) {
            return _this.httpClient.get(src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__["uri"] + 'receivers.json');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (receivers) {
            console.log('receivers=', receivers);
            return {
                type: _receiver_actions__WEBPACK_IMPORTED_MODULE_2__["ADD_RECEIVERS"],
                payload: receivers
            };
        }));
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["Effect"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ReceiverEffects.prototype, "recipeFetch", void 0);
    ReceiverEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["Actions"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]])
    ], ReceiverEffects);
    return ReceiverEffects;
}());



/***/ }),

/***/ "./src/app/receivers/store/receiver.reducer.ts":
/*!*****************************************************!*\
  !*** ./src/app/receivers/store/receiver.reducer.ts ***!
  \*****************************************************/
/*! exports provided: initialState, receiverReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiverReducer", function() { return receiverReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _receiver_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../receiver.model */ "./src/app/receivers/receiver.model.ts");
/* harmony import */ var _receiver_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receiver.actions */ "./src/app/receivers/store/receiver.actions.ts");



var initialState = {
    receiverList: [
        new _receiver_model__WEBPACK_IMPORTED_MODULE_1__["Receiver"](1, 'Thomas', 'Gofe', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/02/2014'),
        new _receiver_model__WEBPACK_IMPORTED_MODULE_1__["Receiver"](2, 'Felix', 'Roke', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/02/2016'),
        new _receiver_model__WEBPACK_IMPORTED_MODULE_1__["Receiver"](3, 'Herma', 'Lo', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '9/11/2016'),
        new _receiver_model__WEBPACK_IMPORTED_MODULE_1__["Receiver"](4, 'dema', 'aswa', 1, 2, '0987678', 'Zenith', 'bank', 'passport', '9767890987', '12/12/2015'),
    ],
    receiverEdited: null,
    receiverEditedIndex: null
};
function receiverReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _receiver_actions__WEBPACK_IMPORTED_MODULE_2__["ADD_RECEIVERS"]:
            console.log('am here');
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { receiverList: state.receiverList.concat(action.payload) });
        case _receiver_actions__WEBPACK_IMPORTED_MODULE_2__["ADD_RECEIVER"]:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { receivers: state.receiverList.concat([action.payload]) });
        case _receiver_actions__WEBPACK_IMPORTED_MODULE_2__["UPDATE_RECEIVER"]:
            var receiversList = state.receiverList;
            var receiver = receiversList[action.payload['index']];
            var updatedReceivers = state.receiverList.concat([receiver]);
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { receivers: updatedReceivers });
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/senders/sender.model.ts":
/*!*****************************************!*\
  !*** ./src/app/senders/sender.model.ts ***!
  \*****************************************/
/*! exports provided: Sender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sender", function() { return Sender; });
var Sender = /** @class */ (function () {
    function Sender(id, user_id, fname, lname, mname, name, email, mobile, phone, dob, address, postcode, title, currency_id, address_id, photo_id) {
        this.id = id;
        this.user_id = user_id;
        this.fname = fname;
        this.lname = lname;
        this.mname = mname;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.phone = phone;
        this.dob = dob;
        this.address = address;
        this.postcode = postcode;
        this.title = title;
        this.currency_id = currency_id;
        this.address_id = address_id;
        this.photo_id = photo_id;
    }
    return Sender;
}());



/***/ }),

/***/ "./src/app/senders/sender.service.ts":
/*!*******************************************!*\
  !*** ./src/app/senders/sender.service.ts ***!
  \*******************************************/
/*! exports provided: SenderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderService", function() { return SenderService; });
/* harmony import */ var _sender_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sender.model */ "./src/app/senders/sender.model.ts");

var SenderService = /** @class */ (function () {
    function SenderService() {
        this.senders = [
            new _sender_model__WEBPACK_IMPORTED_MODULE_0__["Sender"](1, 1, 'Freeke', 'Vae', 'Density', 'Tamos Gafad', 'ds@yahoo.com', '0987656', '87667', '34/3/2012', '22. red str', 'e34 123', 'Mr', 1, 2, 3),
            new _sender_model__WEBPACK_IMPORTED_MODULE_0__["Sender"](2, 1, 'Freeke', 'Vae', 'Density', 'Tamos Gafad', 'ds@yahoo.com', '0987656', '87667', '34/3/2012', '22. red str', 'e34 123', 'Mr', 1, 2, 3),
            new _sender_model__WEBPACK_IMPORTED_MODULE_0__["Sender"](3, 1, 'Freeke', 'Vae', 'Density', 'Tamos Gafad', 'ds@yahoo.com', '0987656', '87667', '34/3/2012', '22. red str', 'e34 123', 'Mr', 1, 2, 3),
            new _sender_model__WEBPACK_IMPORTED_MODULE_0__["Sender"](4, 1, 'Freeke', 'Vae', 'Density', 'Tamos Gafad', 'ds@yahoo.com', '0987656', '87667', '34/3/2012', '22. red str', 'e34 123', 'Mr', 1, 2, 3)
        ];
    }
    SenderService.prototype.getSenders = function () {
        return this.senders.slice();
    };
    return SenderService;
}());



/***/ }),

/***/ "./src/app/senders/sender/sender.component.css":
/*!*****************************************************!*\
  !*** ./src/app/senders/sender/sender.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbmRlcnMvc2VuZGVyL3NlbmRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/senders/sender/sender.component.html":
/*!******************************************************!*\
  !*** ./src/app/senders/sender/sender.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4>Register New Sender</h4>\n<!-- Form -->\n\t\t<form>\n\t\t    <input id=\"user_id\" name=\"user_id\" type=\"hidden\" value=\"1\">\n\t\t\n\t\t\n\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"title\">Title:</label>\n\t\t\t\t\t\t\t                <select class=\"form-control\" id=\"title\" name=\"title\"><option value=\"mr\">Mr</option><option value=\"miss\">Miss</option><option value=\"mrs\">Mrs</option></select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\t\n\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t<label for=\"Country Destination\">Country Destination</label>\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" required=\"required\" id=\"currency_id\" name=\"currency_id\"><option value=\"1\">Nigeria</option><option value=\"2\">Albania</option><option value=\"3\">Algeria</option><option value=\"6\">Angola</option><option value=\"7\">Anguilla</option><option value=\"13\">Australia</option></select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 \">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t<label for=\"fname\">First Name</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"fname\" type=\"text\" id=\"fname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<label for=\"mname\">Middle Name</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"mname\" type=\"text\" id=\"mname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"lname\">Last Name</label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"lname\" type=\"text\" id=\"lname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"dob\">Date Of Birth</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group input-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t <span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"dob\" type=\"date\" value=\"09/04/2015\" id=\"dob\">\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"title_header\">Contact Information</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"phone\">Phone Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"phone\" type=\"text\" id=\"phone\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t<label for=\"mobile\">Mobile Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"mobile\" type=\"text\" id=\"mobile\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"email\">Email</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"email\" type=\"text\" id=\"email\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"cemail\">Confirm Email</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"cemail\" type=\"text\" id=\"cemail\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"title_header\">Address</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-7 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"Address Postocode\">Address / Postcode</label><span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-7 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input name = \"search\" type=text required name=postcode id=\"autocomplete\" class=\"form-control\"  onFocus=\"geolocate()\">\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\n   \t\t\t\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<br/><br/>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-2 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"No\">Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"street_number\" required=\"required\" name=\"number\" type=\"text\">\n\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"Address\">Address</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"route\" readonly=\"readonly\" name=\"address\" type=\"text\">\n\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 \">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"postcode\">Post Code</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"postal_code\" readonly=\"readonly\" name=\"postcode\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"town\">Town</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"locality\" readonly=\"readonly\" name=\"town\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"county\">County</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"administrative_area_level_1\" readonly=\"readonly\" name=\"county\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"country\">Country</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"country\" readonly=\"readonly\" name=\"country\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"title_header\"><span class=\"essential\">*</span>Terms And Conditions</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><strong>Clicking the submit button you have read and accepted the <a href=\"terms.php\">TERMS AND CONDITIONS</a> and Your information will be held securely \n\t\t\t\t\t\t\t\t\t\t\t\t\t\twith our data protection and management policy?</strong><p>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-3 \">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"btn btn-primary btn-block\" type=\"submit\" value=\"Submit\">\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\t\n          </div>\n        </div>>\n\t\t\t</form>\n\n\t\t  \n"

/***/ }),

/***/ "./src/app/senders/sender/sender.component.ts":
/*!****************************************************!*\
  !*** ./src/app/senders/sender/sender.component.ts ***!
  \****************************************************/
/*! exports provided: SenderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderComponent", function() { return SenderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SenderComponent = /** @class */ (function () {
    function SenderComponent() {
    }
    SenderComponent.prototype.ngOnInit = function () {
    };
    SenderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sender',
            template: __webpack_require__(/*! ./sender.component.html */ "./src/app/senders/sender/sender.component.html"),
            styles: [__webpack_require__(/*! ./sender.component.css */ "./src/app/senders/sender/sender.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SenderComponent);
    return SenderComponent;
}());



/***/ }),

/***/ "./src/app/senders/senders-list/senders-list.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/senders/senders-list/senders-list.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbmRlcnMvc2VuZGVycy1saXN0L3NlbmRlcnMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/senders/senders-list/senders-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/senders/senders-list/senders-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h6 class=\"col-md-5\">Senders</h6>\n<input \n[(ngModel)]=\"filterString\"\nclass=\"form-goup col-md-5 col-md-offset-1\"\nplaceholder=\"Search...\" >\n<table class=\"table table-striped table-bordered\">\n  <thead>\n    <tr>\n        <th>No</th>\n        <th>Created</th>\n        <th>Name</th>\n        <th>Mobile</th>\n        <th>Actions</th>\n      </thead>\n  <tbody>\t  \n  \n    <tr *ngFor = \"let sender of (senderListState | async).senderList |filter:filterString:'name'; let i = index\">\n      <td>{{i + 1}}</td>\n      <td>{{sender.name}}</td>\n      <td>{{sender.mobile}}</td>\n      <td>\n          <a \n              [routerLink] = \"['receiver/create',sender.id]\">\n              New Receiver</a>\n          <a \n              [routerLink] = \"['transaction/create',sender.id]\">\n              Send Money</a>\n        </td>\n      <td>\n        <a class = \"btn btn-default\"\n            [routerLink] = \"['sender/edit',sender.id]\">\n            Edit</a>\n        <a class = \"btn btn-danger\"\n            [routerLink] = \"['sender/delete',sender.id]\">\n            Del</a>\n      </td>\n      <td></td>\n    </tr>\n</tbody>\n</table>"

/***/ }),

/***/ "./src/app/senders/senders-list/senders-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/senders/senders-list/senders-list.component.ts ***!
  \****************************************************************/
/*! exports provided: SendersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendersListComponent", function() { return SendersListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_sender_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/sender.actions */ "./src/app/senders/store/sender.actions.ts");




var SendersListComponent = /** @class */ (function () {
    function SendersListComponent(store) {
        this.store = store;
    }
    SendersListComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new _store_sender_actions__WEBPACK_IMPORTED_MODULE_3__["FetchSenders"]());
        this.senderListState = this.store.select('senders');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('senders'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], SendersListComponent.prototype, "senders", void 0);
    SendersListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-senders-list',
            template: __webpack_require__(/*! ./senders-list.component.html */ "./src/app/senders/senders-list/senders-list.component.html"),
            styles: [__webpack_require__(/*! ./senders-list.component.css */ "./src/app/senders/senders-list/senders-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
    ], SendersListComponent);
    return SendersListComponent;
}());



/***/ }),

/***/ "./src/app/senders/senders-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/senders/senders-routing.module.ts ***!
  \***************************************************/
/*! exports provided: SendersRoutingModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendersRoutingModules", function() { return SendersRoutingModules; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _senders_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./senders.component */ "./src/app/senders/senders.component.ts");
/* harmony import */ var _sender_sender_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sender/sender.component */ "./src/app/senders/sender/sender.component.ts");





var senderRouting = [
    { path: 'senders', component: _senders_component__WEBPACK_IMPORTED_MODULE_3__["SendersComponent"],
        children: [
            { path: 'create', component: _sender_sender_component__WEBPACK_IMPORTED_MODULE_4__["SenderComponent"] },
            { path: ':id', component: _senders_component__WEBPACK_IMPORTED_MODULE_3__["SendersComponent"] },
            { path: ':id/edit', component: _sender_sender_component__WEBPACK_IMPORTED_MODULE_4__["SenderComponent"] }
        ] },
];
var SendersRoutingModules = /** @class */ (function () {
    function SendersRoutingModules() {
    }
    SendersRoutingModules = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(senderRouting)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], SendersRoutingModules);
    return SendersRoutingModules;
}());



/***/ }),

/***/ "./src/app/senders/senders.component.css":
/*!***********************************************!*\
  !*** ./src/app/senders/senders.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbmRlcnMvc2VuZGVycy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/senders/senders.component.html":
/*!************************************************!*\
  !*** ./src/app/senders/senders.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a routerLink = \"create\" class = \"btn btn-primary\">New Sender</a>\n\n<br/>\n<div class = \"col-md-12\">\n    <div class = \"row\">\n        <div class=\"col-md-12\">\n            <router-outlet></router-outlet>\n      </div>\n    </div>\n    <div class = \"row\">\n        <div class=\"col-md-12\">\n            <app-senders-list [senders] = \"senders\"></app-senders-list>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/senders/senders.component.ts":
/*!**********************************************!*\
  !*** ./src/app/senders/senders.component.ts ***!
  \**********************************************/
/*! exports provided: SendersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendersComponent", function() { return SendersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sender_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sender.service */ "./src/app/senders/sender.service.ts");



var SendersComponent = /** @class */ (function () {
    function SendersComponent(senderService) {
        this.senderService = senderService;
    }
    SendersComponent.prototype.ngOnInit = function () {
        this.senders = this.senderService.getSenders();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('senders'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], SendersComponent.prototype, "senders", void 0);
    SendersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-senders',
            template: __webpack_require__(/*! ./senders.component.html */ "./src/app/senders/senders.component.html"),
            styles: [__webpack_require__(/*! ./senders.component.css */ "./src/app/senders/senders.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sender_service__WEBPACK_IMPORTED_MODULE_2__["SenderService"]])
    ], SendersComponent);
    return SendersComponent;
}());



/***/ }),

/***/ "./src/app/senders/senders.module.ts":
/*!*******************************************!*\
  !*** ./src/app/senders/senders.module.ts ***!
  \*******************************************/
/*! exports provided: SendersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendersModule", function() { return SendersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _senders_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./senders-routing.module */ "./src/app/senders/senders-routing.module.ts");
/* harmony import */ var _senders_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./senders.component */ "./src/app/senders/senders.component.ts");
/* harmony import */ var _senders_list_senders_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./senders-list/senders-list.component */ "./src/app/senders/senders-list/senders-list.component.ts");
/* harmony import */ var _sender_sender_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sender/sender.component */ "./src/app/senders/sender/sender.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");









var SendersModule = /** @class */ (function () {
    function SendersModule() {
    }
    SendersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _senders_component__WEBPACK_IMPORTED_MODULE_3__["SendersComponent"],
                _senders_list_senders_list_component__WEBPACK_IMPORTED_MODULE_4__["SendersListComponent"],
                _sender_sender_component__WEBPACK_IMPORTED_MODULE_5__["SenderComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _senders_routing_module__WEBPACK_IMPORTED_MODULE_2__["SendersRoutingModules"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
            ],
            exports: [
                _senders_component__WEBPACK_IMPORTED_MODULE_3__["SendersComponent"],
                _senders_list_senders_list_component__WEBPACK_IMPORTED_MODULE_4__["SendersListComponent"],
                _sender_sender_component__WEBPACK_IMPORTED_MODULE_5__["SenderComponent"]
            ]
        })
    ], SendersModule);
    return SendersModule;
}());



/***/ }),

/***/ "./src/app/senders/store/sender.actions.ts":
/*!*************************************************!*\
  !*** ./src/app/senders/store/sender.actions.ts ***!
  \*************************************************/
/*! exports provided: FETCH_SENDERS, ADD_SENDERS, FetchSenders, AddSenders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SENDERS", function() { return FETCH_SENDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_SENDERS", function() { return ADD_SENDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchSenders", function() { return FetchSenders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddSenders", function() { return AddSenders; });
var FETCH_SENDERS = 'FETCH_SENDERS';
var ADD_SENDERS = 'ADD_SENDERS';
var FetchSenders = /** @class */ (function () {
    function FetchSenders() {
        this.type = FETCH_SENDERS;
    }
    return FetchSenders;
}());

var AddSenders = /** @class */ (function () {
    function AddSenders(payload) {
        this.payload = payload;
        this.type = ADD_SENDERS;
    }
    return AddSenders;
}());



/***/ }),

/***/ "./src/app/senders/store/sender.effects.ts":
/*!*************************************************!*\
  !*** ./src/app/senders/store/sender.effects.ts ***!
  \*************************************************/
/*! exports provided: SenderEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SenderEffects", function() { return SenderEffects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _sender_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sender.actions */ "./src/app/senders/store/sender.actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utility.service */ "./src/app/utility.service.ts");







var SenderEffects = /** @class */ (function () {
    function SenderEffects(actions$, httpClient) {
        var _this = this;
        this.actions$ = actions$;
        this.httpClient = httpClient;
        this.senderEffect = this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_sender_actions__WEBPACK_IMPORTED_MODULE_4__["FETCH_SENDERS"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (actions) {
            return _this.httpClient.get(src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__["uri"] + 'senders.json');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (senders) {
            console.log('senders', senders);
            return {
                type: _sender_actions__WEBPACK_IMPORTED_MODULE_4__["ADD_SENDERS"],
                payload: senders
            };
        }));
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SenderEffects.prototype, "senderEffect", void 0);
    SenderEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SenderEffects);
    return SenderEffects;
}());



/***/ }),

/***/ "./src/app/senders/store/sender.reducer.ts":
/*!*************************************************!*\
  !*** ./src/app/senders/store/sender.reducer.ts ***!
  \*************************************************/
/*! exports provided: senderReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "senderReducer", function() { return senderReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sender_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sender.actions */ "./src/app/senders/store/sender.actions.ts");


var intialState = {
    senderList: [],
    fetching: false
};
function senderReducer(state, action) {
    if (state === void 0) { state = intialState; }
    switch (action.type) {
        case _sender_actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_SENDERS"]:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { fetching: true });
        case _sender_actions__WEBPACK_IMPORTED_MODULE_1__["ADD_SENDERS"]:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { senderList: state.senderList.concat(action.payload) });
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/shared/can-deactivate-guard.service.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/can-deactivate-guard.service.ts ***!
  \********************************************************/
/*! exports provided: CanDeactivateGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanDeactivateGuard", function() { return CanDeactivateGuard; });
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return component.canDeactivate();
    };
    return CanDeactivateGuard;
}());



/***/ }),

/***/ "./src/app/shared/dropdown.directive.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/dropdown.directive.ts ***!
  \**********************************************/
/*! exports provided: DropdownDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownDirective", function() { return DropdownDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DropdownDirective = /** @class */ (function () {
    function DropdownDirective() {
        this.isOpen = false;
    }
    DropdownDirective.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.open'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DropdownDirective.prototype, "isOpen", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('click'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], DropdownDirective.prototype, "toggleOpen", null);
    DropdownDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[appDropdown]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DropdownDirective);
    return DropdownDirective;
}());



/***/ }),

/***/ "./src/app/shared/input/input.component.css":
/*!**************************************************!*\
  !*** ./src/app/shared/input/input.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9pbnB1dC9pbnB1dC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/input/input.component.html":
/*!***************************************************!*\
  !*** ./src/app/shared/input/input.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  input works!\n</p>\n"

/***/ }),

/***/ "./src/app/shared/input/input.component.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/input/input.component.ts ***!
  \*************************************************/
/*! exports provided: InputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return InputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var InputComponent = /** @class */ (function () {
    function InputComponent() {
    }
    InputComponent.prototype.ngOnInit = function () {
    };
    InputComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-input',
            template: __webpack_require__(/*! ./input.component.html */ "./src/app/shared/input/input.component.html"),
            styles: [__webpack_require__(/*! ./input.component.css */ "./src/app/shared/input/input.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], InputComponent);
    return InputComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dropdown_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdown.directive */ "./src/app/shared/dropdown.directive.ts");
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filter.pipe */ "./src/app/filter.pipe.ts");





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _dropdown_directive__WEBPACK_IMPORTED_MODULE_3__["DropdownDirective"],
                _filter_pipe__WEBPACK_IMPORTED_MODULE_4__["FilterPipe"]
            ],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _dropdown_directive__WEBPACK_IMPORTED_MODULE_3__["DropdownDirective"],
                _filter_pipe__WEBPACK_IMPORTED_MODULE_4__["FilterPipe"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/store/app.effects.ts":
/*!**************************************!*\
  !*** ./src/app/store/app.effects.ts ***!
  \**************************************/
/*! exports provided: effects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return effects; });
/* harmony import */ var _users_store_user_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../users/store/user.effects */ "./src/app/users/store/user.effects.ts");
/* harmony import */ var _receivers_store_receiver_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../receivers/store/receiver.effects */ "./src/app/receivers/store/receiver.effects.ts");
/* harmony import */ var _transactions_store_transaction_effects___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/store/transaction.effects. */ "./src/app/transactions/store/transaction.effects..ts");
/* harmony import */ var _senders_store_sender_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../senders/store/sender.effects */ "./src/app/senders/store/sender.effects.ts");




var effects = [
    _users_store_user_effects__WEBPACK_IMPORTED_MODULE_0__["UserEffects"],
    _receivers_store_receiver_effects__WEBPACK_IMPORTED_MODULE_1__["ReceiverEffects"],
    _transactions_store_transaction_effects___WEBPACK_IMPORTED_MODULE_2__["TransactionEffect"],
    _senders_store_sender_effects__WEBPACK_IMPORTED_MODULE_3__["SenderEffects"]
];


/***/ }),

/***/ "./src/app/store/app.reducers.ts":
/*!***************************************!*\
  !*** ./src/app/store/app.reducers.ts ***!
  \***************************************/
/*! exports provided: reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var _receivers_store_receiver_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../receivers/store/receiver.reducer */ "./src/app/receivers/store/receiver.reducer.ts");
/* harmony import */ var _transactions_store_transaction_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/store/transaction.reducer */ "./src/app/transactions/store/transaction.reducer.ts");
/* harmony import */ var _users_store_user_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users/store/user.reducer */ "./src/app/users/store/user.reducer.ts");
/* harmony import */ var _senders_store_sender_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../senders/store/sender.reducer */ "./src/app/senders/store/sender.reducer.ts");




var reducers = {
    users: _users_store_user_reducer__WEBPACK_IMPORTED_MODULE_2__["userReduer"],
    receivers: _receivers_store_receiver_reducer__WEBPACK_IMPORTED_MODULE_0__["receiverReducer"],
    transactions: _transactions_store_transaction_reducer__WEBPACK_IMPORTED_MODULE_1__["transactionReducer"],
    senders: _senders_store_sender_reducer__WEBPACK_IMPORTED_MODULE_3__["senderReducer"]
};


/***/ }),

/***/ "./src/app/transactions/store/transaction.actions.ts":
/*!***********************************************************!*\
  !*** ./src/app/transactions/store/transaction.actions.ts ***!
  \***********************************************************/
/*! exports provided: FETCH_TRANSACTIONS, SET_TRANSACTIONS, FetchTransactions, SetTransactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRANSACTIONS", function() { return FETCH_TRANSACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TRANSACTIONS", function() { return SET_TRANSACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchTransactions", function() { return FetchTransactions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTransactions", function() { return SetTransactions; });
var FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
var SET_TRANSACTIONS = 'SET_TRANSACTIONS';
var FetchTransactions = /** @class */ (function () {
    function FetchTransactions() {
        this.type = FETCH_TRANSACTIONS;
    }
    return FetchTransactions;
}());

var SetTransactions = /** @class */ (function () {
    function SetTransactions(payload) {
        this.payload = payload;
        this.type = SET_TRANSACTIONS;
    }
    return SetTransactions;
}());



/***/ }),

/***/ "./src/app/transactions/store/transaction.effects..ts":
/*!************************************************************!*\
  !*** ./src/app/transactions/store/transaction.effects..ts ***!
  \************************************************************/
/*! exports provided: TransactionEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionEffect", function() { return TransactionEffect; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _transaction_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transaction.actions */ "./src/app/transactions/store/transaction.actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utility.service */ "./src/app/utility.service.ts");







var TransactionEffect = /** @class */ (function () {
    function TransactionEffect(actions$, httpClient) {
        var _this = this;
        this.actions$ = actions$;
        this.httpClient = httpClient;
        this.FetchTransactions = this.actions$
            .pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_transaction_actions__WEBPACK_IMPORTED_MODULE_4__["FETCH_TRANSACTIONS"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (action) {
            return _this.httpClient.get(src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__["uri"] + 'transactions.json');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (transactions) {
            console.log('transactions', transactions);
            return {
                type: _transaction_actions__WEBPACK_IMPORTED_MODULE_4__["SET_TRANSACTIONS"],
                payload: transactions
            };
        }));
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Effect"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TransactionEffect.prototype, "FetchTransactions", void 0);
    TransactionEffect = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], TransactionEffect);
    return TransactionEffect;
}());



/***/ }),

/***/ "./src/app/transactions/store/transaction.reducer.ts":
/*!***********************************************************!*\
  !*** ./src/app/transactions/store/transaction.reducer.ts ***!
  \***********************************************************/
/*! exports provided: initialState, transactionReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionReducer", function() { return transactionReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _transaction_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction.actions */ "./src/app/transactions/store/transaction.actions.ts");
/* harmony import */ var _transaction_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transaction.model */ "./src/app/transactions/transaction.model.ts");



var initialState = {
    transactionList: [
        new _transaction_model__WEBPACK_IMPORTED_MODULE_2__["Transaction"](1, 'Asdes', '7656789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/01/2019'),
        new _transaction_model__WEBPACK_IMPORTED_MODULE_2__["Transaction"](2, 'uytyui', '345', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/02/2019'),
        new _transaction_model__WEBPACK_IMPORTED_MODULE_2__["Transaction"](3, 'dfsss', '8789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/03/2019'),
        new _transaction_model__WEBPACK_IMPORTED_MODULE_2__["Transaction"](4, 'dfsss', '8789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '07/01/2019')
    ],
    fetching: false,
    transactionEdited: null,
    transactionEditedIndex: null
};
function transactionReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _transaction_actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_TRANSACTIONS"]:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { fetching: true });
        case _transaction_actions__WEBPACK_IMPORTED_MODULE_1__["SET_TRANSACTIONS"]:
            console.log('payload', action.payload);
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { transactionList: action.payload.slice() });
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/transactions/transaction-resolver.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/transactions/transaction-resolver.service.ts ***!
  \**************************************************************/
/*! exports provided: TransactionResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionResolver", function() { return TransactionResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _transactions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transactions.service */ "./src/app/transactions/transactions.service.ts");



// interface Transaction {
//   id: number;
//   name: string;
//   status: string;
// }
var TransactionResolver = /** @class */ (function () {
    function TransactionResolver(transactionsService) {
        this.transactionsService = transactionsService;
    }
    TransactionResolver.prototype.resolve = function (route, state) {
        return this.transactionsService.getTransaction(+route.params['id']);
    };
    TransactionResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_transactions_service__WEBPACK_IMPORTED_MODULE_2__["TransactionsService"]])
    ], TransactionResolver);
    return TransactionResolver;
}());



/***/ }),

/***/ "./src/app/transactions/transaction.model.ts":
/*!***************************************************!*\
  !*** ./src/app/transactions/transaction.model.ts ***!
  \***************************************************/
/*! exports provided: Transaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
var Transaction = /** @class */ (function () {
    function Transaction(id, receipt_number, receiver_phone, type, user_id, sender_id, receiver_id, amount, commission, agent_commission, exchange_rate, currency_id, currency_income, bou_rate, sold_rate, note, status, created_at) {
        this.id = id;
        this.receipt_number = receipt_number;
        this.receiver_phone = receiver_phone;
        this.type = type;
        this.user_id = user_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.amount = amount;
        this.commission = commission;
        this.agent_commission = agent_commission;
        this.exchange_rate = exchange_rate;
        this.currency_id = currency_id;
        this.currency_income = currency_income;
        this.bou_rate = bou_rate;
        this.bou_rate = bou_rate;
        this.sold_rate = sold_rate;
        this.status = status;
        this.created_at = created_at;
    }
    return Transaction;
}());



/***/ }),

/***/ "./src/app/transactions/transaction/transaction.component.css":
/*!********************************************************************!*\
  !*** ./src/app/transactions/transaction/transaction.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RyYW5zYWN0aW9ucy90cmFuc2FjdGlvbi90cmFuc2FjdGlvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/transactions/transaction/transaction.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/transactions/transaction/transaction.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-11 panel panel-default\">\n      <div class=\"panel-heading\">\n        <div id=\"output1\"></div>\n        <h4>Send Money<i class=\"glyphicon glyphicon-send\"></i></h4>\n      </div>\n    <div class=\"panel-body\">\n    <form>\n      <div class=\"row\">\n          <div class=\"col-md-6 col-md-offset-3\">\n  <!--sender details-->\n            <div class=\"form-group\">\t\n                <label for=\"sender\">Sender</label>\n                  <span class=\"essential\">*</span>\n                <select class=\"form-control\" name=\"senders\"></select>\t\n            </div>\n          </div>\n        </div>\n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <div class=\"form-group\">\n            <label for=\"SReceiver\">Select Receiver</label>\n              <span class=\"essential\">*</span>\n            <select class=\"form-control\" id=\"receivers\" name=\"receivers\"></select>\n          </div>\t\t\n              \n        </div>\n      </div>\n\n      <!--Receivers-->\n      <div class=\"well\">\n        <div class=\"row\">\n          <div class=\"col-md-4 col-md-offset-1\">\n            <div class=\"form-group form-group-sm\">\n              <label for=\"Rfirstname\"> Receiver First Name</label>\n              <input id=\"receiver_fname\" class=\"form-control\" placeholder=\"Receiver First name\" readonly=\"readonly\" name=\"receiver_fname\" type=\"text\">\n            </div>\n            </div>\n          <div class=\"col-md-4 col-md-offset-1\">\n            <div class=\"form-group form-group-sm\">\n              <label for=\"Rlastname\">Receiver Last Name</label>\n              <input id=\"receiver_lname\" class=\"form-control\" placeholder=\"Receiver Last name\" readonly=\"readonly\" name=\"receiver_lname\" type=\"text\">\n            </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-4 col-md-offset-1\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"receiver_phone\">Receiver Phone</label>\n                <input  class=\"form-control\" placeholder=\"Receiver phone\" readonly=\"readonly\" name=\"receiver_phone\" type=\"text\">\n              </div>\n            </div>\n            <div class=\"col-md-4 col-md-offset-1\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"Transfer Option\">Transfer Option</label>\n                <input id=\"Transfer_type\" class=\"form-control\" placeholder=\"transfer_type\" readonly=\"readonly\" name=\"transfer_type\" type=\"text\">\n              </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-4 col-md-offset-1\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"bank\">Receiver Bank</label>\n                <input class=\"form-control\" placeholder=\"Receiver Bank\" readonly=\"readonly\" name=\"bank\" type=\"text\" id=\"bank\">\n\n              </div>\n            </div>\n            <div class=\"col-md-4 col-md-offset-1\">\n              <div class=\"form-group form-group-sm\">\n                <label for=\"accountno\">Receiver Account Number</label>\n                <input id=\"account_number\" class=\"form-control\" placeholder=\"Receiver Account number \" readonly=\"readonly\" name=\"account_number\" type=\"text\">\n              </div>\n            </div>\n      </div>\n    </div>\n<!--Transaction operation here-->\n        \n      <div class=\"row\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n          <label for=\"Amount To Send\" id=\"amount_label\">Amount To Send &pound;</label><span class=\"essential\">*</span>\n          <input id=\"amount\" class=\"form-control\" placeholder=\"Enter Amount\" maxlength=\"10\" name=\"amount\" type=\"text\">\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <label for=\"A-C\" id=\"local_label\">Amount To Collect Naira &#8358;</label><span class=\"essential\">*</span>\n            <input id=\"local_payment\" class=\"form-control\" placeholder=\"Amount To Collect\" maxlength=\"13\" name=\"local_payment\" type=\"text\">\n          </div>\n        </div>\n      </div>\n      <div class=\"row currency_commission\" >\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <label for=\"Commission\">Commission</label>\n            <input id=\"commission\" class=\"form-control\" placeholder=\"Commission\" readonly=\"readonly\" name=\"commission\" type=\"text\">\n          </div>\n        </div>\n      </div>\n      <div class=\"row currency_commission\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <label for=\"Total\">Total</label>\n            <input id=\"total\" class=\"form-control\" placeholder=\"Total\" readonly=\"readonly\" name=\"total\" type=\"text\">\n          </div>\n        </div>\n      </div>\n      \n      <div class=\"row currency_commission\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <div class=\"form-group form-group-sm\">\n            <label for=\"Exchange Rate\">Exchange Rate</label>\n            <input id=\"exchange_rate\" class=\"form-control\" placeholder=\"Exchange Rate\" readonly=\"readonly\" name=\"exchange_rate\" type=\"text\" value=\"800\">\n          </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row currency_profit\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <div class=\"form-group form-group-sm\">\n            <label for=\"Bou Rate\">Bou Rate</label>\n            <input id=\"bou_rate\" class=\"form-control\" placeholder=\" Rate\" readonly=\"readonly\" name=\"bou_rate\" type=\"text\" value=\"0\">\n          </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row currency_profit\">\n        <div class=\"col-md-5 col-md-offset-3\">\n          <div class=\"form-group form-group-sm\">\n            <div class=\"form-group form-group-sm\">\n            <label for=\"Sold Rate\">Sold Rate</label>\n            <input id=\"sold_rate\" class=\"form-control\" placeholder=\"Exchange Rate\" readonly=\"readonly\" name=\"sold_rate\" type=\"text\" value=\"0\">\n          </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <input class=\"btn btn-primary \n                col-md-12 btn-block\" type=\"submit\" value=\"Submit\">\n      </div>\n      \n    </form>\n  </div>\n  \n</div>\t\n  "

/***/ }),

/***/ "./src/app/transactions/transaction/transaction.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/transactions/transaction/transaction.component.ts ***!
  \*******************************************************************/
/*! exports provided: TransactionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionComponent", function() { return TransactionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TransactionComponent = /** @class */ (function () {
    function TransactionComponent() {
    }
    TransactionComponent.prototype.ngOnInit = function () {
    };
    TransactionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transaction',
            template: __webpack_require__(/*! ./transaction.component.html */ "./src/app/transactions/transaction/transaction.component.html"),
            styles: [__webpack_require__(/*! ./transaction.component.css */ "./src/app/transactions/transaction/transaction.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TransactionComponent);
    return TransactionComponent;
}());



/***/ }),

/***/ "./src/app/transactions/transactions-list/transactions-list.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/transactions/transactions-list/transactions-list.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RyYW5zYWN0aW9ucy90cmFuc2FjdGlvbnMtbGlzdC90cmFuc2FjdGlvbnMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/transactions/transactions-list/transactions-list.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/transactions/transactions-list/transactions-list.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-md-12\">\n  <h6>Latest Transactions</h6>\n    <table class=\"table table-striped table-bordered\">\n      <thead>\n        <tr>\n            <!-- ['No', 'Created_at',\n            'Agent','Tcode',\n            'Sender','Receiver',\n            'Local Pay', 'C_B',\n            'Total','Amount','Status','Actions']\n            <th *ngFor = \"let field of trans_fields\">{{field}}</th> -->\n            <th>No</th>\n            <th>Date</th>\n            <th>Agent</th>\n            <th>Tcode</th>\n            <th>Sender</th>\n            <th>Receiver</th>\n            <th>Local</th>\n            <th>C_B</th>\n            <th>Total</th>\n            <th>Amount</th>\n            <th>Status</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n      <tbody>\t  \n        <tr *ngFor = \"let transaction of (transactionsListState | async).transactionList; let i = index\">\n          <td>{{i + 1}}</td>\n          <td>{{transaction.created_at}}</td>\n          <td>{{transaction.type}}</td>\n          <td>{{transaction.receipt_number}}</td>\n          <td>Kaleb</td>\n          <td>Mr Re</td>\n          <td>{{(transaction.amount * transaction.commission).toFixed(2)  }}</td>\n          <td>{{transaction.commission}}</td>\n          <td>{{(transaction.amount * transaction.agent_commission).toFixed(2)  }}</td>\n          <td>{{(transaction.amount + transaction.commission).toFixed(2)  }}</td>\n          <td>{{transaction.status }}</td>\n          <td>\n              <a \n              class = \"btn btn-default\"\n              [routerLink] = \"[ transaction.id, 'edit']\"> Edit</a>\n              \n              <a \n              class = \"btn btn-default\"\n              [routerLink] = \"['receipt', transaction.id]\"> Receipt</a>\n              \n              <a \n              class = \"btn btn-danger\"\n              [routerLink] = \"['transactions/edit', transaction.id]\"> Delete</a>\n          </td>\n        </tr>\n  </tbody>\n</table>\n</div>"

/***/ }),

/***/ "./src/app/transactions/transactions-list/transactions-list.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/transactions/transactions-list/transactions-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: TransactionsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsListComponent", function() { return TransactionsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _transactions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions.service */ "./src/app/transactions/transactions.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_transaction_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/transaction.actions */ "./src/app/transactions/store/transaction.actions.ts");





var TransactionsListComponent = /** @class */ (function () {
    function TransactionsListComponent(transactionsService, store) {
        this.transactionsService = transactionsService;
        this.store = store;
        this.actions = false;
    }
    TransactionsListComponent.prototype.ngOnInit = function () {
        //this.transactions = this.transactionsService.getTransactions();
        this.store.dispatch(new _store_transaction_actions__WEBPACK_IMPORTED_MODULE_4__["FetchTransactions"]());
        this.transactionsListState = this.store.select('transactions');
    };
    TransactionsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transactions-list',
            template: __webpack_require__(/*! ./transactions-list.component.html */ "./src/app/transactions/transactions-list/transactions-list.component.html"),
            styles: [__webpack_require__(/*! ./transactions-list.component.css */ "./src/app/transactions/transactions-list/transactions-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_transactions_service__WEBPACK_IMPORTED_MODULE_2__["TransactionsService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], TransactionsListComponent);
    return TransactionsListComponent;
}());



/***/ }),

/***/ "./src/app/transactions/transactions-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/transactions/transactions-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: TransactionsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsRoutingModule", function() { return TransactionsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _transactions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactions.component */ "./src/app/transactions/transactions.component.ts");
/* harmony import */ var _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transaction/transaction.component */ "./src/app/transactions/transaction/transaction.component.ts");
/* harmony import */ var _transaction_resolver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transaction-resolver.service */ "./src/app/transactions/transaction-resolver.service.ts");






var transactionsRouting = [
    { path: 'transactions', component: _transactions_component__WEBPACK_IMPORTED_MODULE_3__["TransactionsComponent"],
        children: [
            { path: ':id/edit', component: _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_4__["TransactionComponent"], resolve: _transaction_resolver_service__WEBPACK_IMPORTED_MODULE_5__["TransactionResolver"] },
            { path: 'create', component: _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_4__["TransactionComponent"], resolve: _transaction_resolver_service__WEBPACK_IMPORTED_MODULE_5__["TransactionResolver"] }
        ]
    }
];
var TransactionsRoutingModule = /** @class */ (function () {
    function TransactionsRoutingModule() {
    }
    TransactionsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(transactionsRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], TransactionsRoutingModule);
    return TransactionsRoutingModule;
}());



/***/ }),

/***/ "./src/app/transactions/transactions.component.css":
/*!*********************************************************!*\
  !*** ./src/app/transactions/transactions.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RyYW5zYWN0aW9ucy90cmFuc2FjdGlvbnMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/transactions/transactions.component.html":
/*!**********************************************************!*\
  !*** ./src/app/transactions/transactions.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-sm-12 col-md-12\" style=\"margin:auto auto;\">\n    <a routerLink=\"create\" class = \"btn btn-primary\">New Transaction</a>\n      <router-outlet></router-outlet>\n      <app-transactions-list></app-transactions-list>\n</div>\n"

/***/ }),

/***/ "./src/app/transactions/transactions.component.ts":
/*!********************************************************!*\
  !*** ./src/app/transactions/transactions.component.ts ***!
  \********************************************************/
/*! exports provided: TransactionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsComponent", function() { return TransactionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _transactions_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transactions.service */ "./src/app/transactions/transactions.service.ts");



var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(transactionsService) {
        this.transactionsService = transactionsService;
        this.trans_fields = ['No', 'Created_at',
            'Agent', 'Tcode',
            'Sender', 'Receiver',
            'Local Pay', 'C_B',
            'Total', 'Amount', 'Status', 'Actions'];
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.admin = true;
        this.transactions = this.transactionsService.getTransactions();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('actions'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TransactionsComponent.prototype, "admin", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('transactionsResult'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TransactionsComponent.prototype, "transactions", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('fields'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TransactionsComponent.prototype, "trans_fields", void 0);
    TransactionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transactions',
            template: __webpack_require__(/*! ./transactions.component.html */ "./src/app/transactions/transactions.component.html"),
            styles: [__webpack_require__(/*! ./transactions.component.css */ "./src/app/transactions/transactions.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_transactions_service__WEBPACK_IMPORTED_MODULE_2__["TransactionsService"]])
    ], TransactionsComponent);
    return TransactionsComponent;
}());



/***/ }),

/***/ "./src/app/transactions/transactions.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/transactions/transactions.module.ts ***!
  \*****************************************************/
/*! exports provided: TransactionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsModule", function() { return TransactionsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction/transaction.component */ "./src/app/transactions/transaction/transaction.component.ts");
/* harmony import */ var _transactions_list_transactions_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactions-list/transactions-list.component */ "./src/app/transactions/transactions-list/transactions-list.component.ts");
/* harmony import */ var _transactions_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactions.component */ "./src/app/transactions/transactions.component.ts");
/* harmony import */ var _transactions_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transactions-routing.module */ "./src/app/transactions/transactions-routing.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");








var TransactionsModule = /** @class */ (function () {
    function TransactionsModule() {
    }
    TransactionsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_2__["TransactionComponent"],
                _transactions_list_transactions_list_component__WEBPACK_IMPORTED_MODULE_3__["TransactionsListComponent"],
                _transactions_component__WEBPACK_IMPORTED_MODULE_4__["TransactionsComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _transactions_routing_module__WEBPACK_IMPORTED_MODULE_5__["TransactionsRoutingModule"]
            ],
            exports: [
                _transaction_transaction_component__WEBPACK_IMPORTED_MODULE_2__["TransactionComponent"],
                _transactions_list_transactions_list_component__WEBPACK_IMPORTED_MODULE_3__["TransactionsListComponent"],
                _transactions_component__WEBPACK_IMPORTED_MODULE_4__["TransactionsComponent"]
            ]
        })
    ], TransactionsModule);
    return TransactionsModule;
}());



/***/ }),

/***/ "./src/app/transactions/transactions.service.ts":
/*!******************************************************!*\
  !*** ./src/app/transactions/transactions.service.ts ***!
  \******************************************************/
/*! exports provided: TransactionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsService", function() { return TransactionsService; });
/* harmony import */ var _transaction_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction.model */ "./src/app/transactions/transaction.model.ts");

var TransactionsService = /** @class */ (function () {
    function TransactionsService() {
        this.transactions = [
            new _transaction_model__WEBPACK_IMPORTED_MODULE_0__["Transaction"](1, 'Asdes', '7656789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/01/2019'),
            new _transaction_model__WEBPACK_IMPORTED_MODULE_0__["Transaction"](2, 'uytyui', '345', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/02/2019'),
            new _transaction_model__WEBPACK_IMPORTED_MODULE_0__["Transaction"](3, 'dfsss', '8789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '12/03/2019'),
            new _transaction_model__WEBPACK_IMPORTED_MODULE_0__["Transaction"](4, 'dfsss', '8789', 'agent', 1, 2, 2, 400, 20, 10, 340, 1, 'commission', 0, 0, 'All well', 'pending', '07/01/2019')
        ];
    }
    TransactionsService.prototype.getTransactions = function () {
        return this.transactions.slice();
    };
    TransactionsService.prototype.getTransaction = function (id) {
        return this.transactions.slice().find(function (transaction) { return transaction.id == id; });
    };
    return TransactionsService;
}());



/***/ }),

/***/ "./src/app/users/store/user.actions.ts":
/*!*********************************************!*\
  !*** ./src/app/users/store/user.actions.ts ***!
  \*********************************************/
/*! exports provided: FETCH_USERS, SET_USERS, FetchUsers, SetUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_USERS", function() { return SET_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchUsers", function() { return FetchUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetUsers", function() { return SetUsers; });
var FETCH_USERS = 'FETCH_USERS';
var SET_USERS = 'SET_USERS';
var FetchUsers = /** @class */ (function () {
    function FetchUsers() {
        this.type = FETCH_USERS;
    }
    return FetchUsers;
}());

var SetUsers = /** @class */ (function () {
    function SetUsers(payload) {
        this.payload = payload;
        this.type = SET_USERS;
    }
    return SetUsers;
}());



/***/ }),

/***/ "./src/app/users/store/user.effects.ts":
/*!*********************************************!*\
  !*** ./src/app/users/store/user.effects.ts ***!
  \*********************************************/
/*! exports provided: UserEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserEffects", function() { return UserEffects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _user_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.actions */ "./src/app/users/store/user.actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utility.service */ "./src/app/utility.service.ts");







var UserEffects = /** @class */ (function () {
    function UserEffects(action$, httpClient) {
        var _this = this;
        this.action$ = action$;
        this.httpClient = httpClient;
        this.userFetch = this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_user_actions__WEBPACK_IMPORTED_MODULE_4__["FETCH_USERS"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (action) {
            return _this.httpClient.get(src_app_utility_service__WEBPACK_IMPORTED_MODULE_6__["uri"] + 'users.json');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (users) {
            console.log('users', users);
            return {
                type: _user_actions__WEBPACK_IMPORTED_MODULE_4__["SET_USERS"],
                payload: users
            };
        }));
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Effect"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], UserEffects.prototype, "userFetch", void 0);
    UserEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], UserEffects);
    return UserEffects;
}());



/***/ }),

/***/ "./src/app/users/store/user.reducer.ts":
/*!*********************************************!*\
  !*** ./src/app/users/store/user.reducer.ts ***!
  \*********************************************/
/*! exports provided: userReduer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userReduer", function() { return userReduer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _user_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.actions */ "./src/app/users/store/user.actions.ts");


var initialState = {
    usersList: [],
    fetching: true
};
function userReduer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _user_actions__WEBPACK_IMPORTED_MODULE_1__["SET_USERS"]:
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { usersList: action.payload });
        case _user_actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_USERS"]: {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { fetching: true });
        }
        default:
            return state;
    }
}


/***/ }),

/***/ "./src/app/users/user.model.ts":
/*!*************************************!*\
  !*** ./src/app/users/user.model.ts ***!
  \*************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(id, title, name, fname, lname, mname, dob, currency_id, phone, mobile, email, password, type, credit, photo_id, address_id, is_active, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.mobile = mobile;
        this.photo_id = photo_id;
        this.address_id = address_id;
        this.currency_id = currency_id;
        this.is_active = is_active;
        this.dob = dob;
        this.title = title;
        this.mname = mname;
        this.credit = credit;
        this.type = type;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/users/user/user.component.css":
/*!***********************************************!*\
  !*** ./src/app/users/user/user.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXIvdXNlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/users/user/user.component.html":
/*!************************************************!*\
  !*** ./src/app/users/user/user.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4>New Member</h4>\n<!-- Form -->\n\t\t<form>\n\t\t    <input id=\"user_id\" name=\"user_id\" type=\"hidden\" value=\"1\">\n\t\t\n\t\t\n\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"title\">Title:</label>\n\t\t\t\t\t\t\t                <select class=\"form-control\" id=\"title\" name=\"title\"><option value=\"mr\">Mr</option><option value=\"miss\">Miss</option><option value=\"mrs\">Mrs</option></select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\t\n\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t<label for=\"Country Destination\">Country Destination</label>\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" required=\"required\" id=\"currency_id\" name=\"currency_id\"><option value=\"1\">Nigeria</option><option value=\"2\">Albania</option><option value=\"3\">Algeria</option><option value=\"6\">Angola</option><option value=\"7\">Anguilla</option><option value=\"13\">Australia</option></select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 \">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t<label for=\"fname\">First Name</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"fname\" type=\"text\" id=\"fname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<label for=\"mname\">Middle Name</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"mname\" type=\"text\" id=\"mname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"lname\">Last Name</label>\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"lname\" type=\"text\" id=\"lname\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"dob\">Date Of Birth</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group input-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t <span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"dob\" type=\"date\" value=\"09/04/2015\" id=\"dob\">\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"title_header\">Contact Information</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"phone\">Phone Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"phone\" type=\"text\" id=\"phone\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t<label for=\"mobile\">Mobile Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"mobile\" type=\"text\" id=\"mobile\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"email\">Email</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"email\" type=\"text\" id=\"email\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"cemail\">Confirm Email</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" name=\"cemail\" type=\"text\" id=\"cemail\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"title_header\">Address</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-7 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t<label for=\"Address Postocode\">Address / Postcode</label><span class=\"essential\">*</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-7 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input name = \"search\" type=text required name=postcode id=\"autocomplete\" class=\"form-control\"  onFocus=\"geolocate()\">\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\n   \t\t\t\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<br/><br/>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-md-2 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"No\">Number</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"street_number\" required=\"required\" name=\"number\" type=\"text\">\n\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"Address\">Address</label>\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"route\" readonly=\"readonly\" name=\"address\" type=\"text\">\n\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 \">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"postcode\">Post Code</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"postal_code\" readonly=\"readonly\" name=\"postcode\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"town\">Town</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"locality\" readonly=\"readonly\" name=\"town\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"county\">County</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"administrative_area_level_1\" readonly=\"readonly\" name=\"county\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"country\">Country</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"country\" readonly=\"readonly\" name=\"country\" type=\"text\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"title_header\"><span class=\"essential\">*</span>Terms And Conditions</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p><strong>Clicking the submit button you have read and accepted the <a href=\"terms.php\">TERMS AND CONDITIONS</a> and Your information will be held securely \n\t\t\t\t\t\t\t\t\t\t\t\t\t\twith our data protection and management policy?</strong><p>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-3 \">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-block\" (click) = \"onSubmit()\">Submit</button>\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\t\n          </div>\n        </div>>\n\t\t\t</form>\n\n\t\t  \n"

/***/ }),

/***/ "./src/app/users/user/user.component.ts":
/*!**********************************************!*\
  !*** ./src/app/users/user/user.component.ts ***!
  \**********************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users.service */ "./src/app/users/users.service.ts");



var UserComponent = /** @class */ (function () {
    function UserComponent(usersService) {
        this.usersService = usersService;
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.onSubmit = function () {
        // return this.usersService.addUser()
        //  .subscribe((response:Response)=>{
        //        console.log(response)
        //  });
    };
    UserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/users/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.css */ "./src/app/users/user/user.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/app/users/users-list/users-list.component.css":
/*!***********************************************************!*\
  !*** ./src/app/users/users-list/users-list.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXJzLWxpc3QvdXNlcnMtbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/users/users-list/users-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/users/users-list/users-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n     <h6 class=\"col-md-5\">Members</h6>\n    \n     <input \n          [(ngModel)]=\"filterString\"\n          class=\"form-goup col-md-5 col-md-offset-1\"\n         placeholder=\"Search...\" >\n    \n      \n     <div *ngIf = \"!(usersListState|async)\"  class=\"lds-hourglass\"></div>\n    <table class=\"text-center table table-striped table-bordered tablesorter\">\n      <thead>\n          <tr>\n                <th>No </th>\n                <th>Type <i class=\"\"></i></th>\n                <th>Name <i class=\"\"></i></th>\n                <th>Senders <i class=\"\"></i></th>\n                <th>Transactions <i class=\"\"></i></th>\n                <th colspan=\"2\" class=\"text-center\">Actions</th>\n                  \n          </tr>\n        </thead>\n      <tbody>\n                <tr *ngFor=\"let user of (usersListState|async).usersList | filter:filterString:'name'; let i=index\">\n                    <td>{{i+1}}</td>\n                    <td>{{user.type}}</td>\n                    <td>{{user.name|uppercase}}</td>\n                    <td>--</td>\n                    <td>---</td>\n                    <td>\n                      <a class=\"btn btn-default\">Note</a>\n                      <a class=\"btn btn-default\">status</a>\n                      <a class=\"btn btn-default\">Edit</a>\n                      <a class=\"btn btn-danger\">Delete</a></td>\n                </tr>\n      </tbody>\n    </table>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/users/users-list/users-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/users/users-list/users-list.component.ts ***!
  \**********************************************************/
/*! exports provided: UsersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersListComponent", function() { return UsersListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.model */ "./src/app/users/user.model.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_user_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/user.actions */ "./src/app/users/store/user.actions.ts");





var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(store) {
        this.store = store;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new _store_user_actions__WEBPACK_IMPORTED_MODULE_4__["FetchUsers"]());
        this.usersListState = this.store.select('users');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('users'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _user_model__WEBPACK_IMPORTED_MODULE_2__["User"])
    ], UsersListComponent.prototype, "users", void 0);
    UsersListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-users-list',
            template: __webpack_require__(/*! ./users-list.component.html */ "./src/app/users/users-list/users-list.component.html"),
            styles: [__webpack_require__(/*! ./users-list.component.css */ "./src/app/users/users-list/users-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], UsersListComponent);
    return UsersListComponent;
}());



/***/ }),

/***/ "./src/app/users/users-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/users/users-routing.module.ts ***!
  \***********************************************/
/*! exports provided: UsersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRoutingModule", function() { return UsersRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user/user.component */ "./src/app/users/user/user.component.ts");





var usersRouting = [
    { path: 'users', component: _users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"], children: [
            { path: 'create', component: _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"] },
            { path: ':id', component: _users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"] },
            { path: ':id/edit', component: _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"] }
        ] }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(usersRouting)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());



/***/ }),

/***/ "./src/app/users/users.component.css":
/*!*******************************************!*\
  !*** ./src/app/users/users.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXJzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/users/users.component.html":
/*!********************************************!*\
  !*** ./src/app/users/users.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"col-md-12\">\n  <div class = \"row\">\n      <div class=\"col-md-12\">\n          <router-outlet></router-outlet>\n    </div>\n  </div>\n  <div class = \"row\">\n      <div class=\"col-md-12\">\n          <a [routerLink]=\"['create']\" class= \"btn btn-primary\">New Users</a>\n          <app-users-list [users] = \"users\"></app-users-list>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/users/users.component.ts":
/*!******************************************!*\
  !*** ./src/app/users/users.component.ts ***!
  \******************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.service */ "./src/app/users/users.service.ts");



var UsersComponent = /** @class */ (function () {
    function UsersComponent(userService) {
        this.userService = userService;
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.userService.userChanges.subscribe(function (users) {
            if (users) {
                _this.users = users;
            }
        });
        this.users = this.userService.getUsers();
    };
    UsersComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/users/users.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/users/users.module.ts":
/*!***************************************!*\
  !*** ./src/app/users/users.module.ts ***!
  \***************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users-list/users-list.component */ "./src/app/users/users-list/users-list.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user/user.component */ "./src/app/users/user/user.component.ts");
/* harmony import */ var _users_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users-routing.module */ "./src/app/users/users-routing.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");









var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _users_component__WEBPACK_IMPORTED_MODULE_2__["UsersComponent"],
                _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_3__["UsersListComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                _users_routing_module__WEBPACK_IMPORTED_MODULE_5__["UsersRoutingModule"]
            ],
            exports: [
                _users_component__WEBPACK_IMPORTED_MODULE_2__["UsersComponent"],
                _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_3__["UsersListComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_4__["UserComponent"]
            ]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ }),

/***/ "./src/app/users/users.service.ts":
/*!****************************************!*\
  !*** ./src/app/users/users.service.ts ***!
  \****************************************/
/*! exports provided: UsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersService", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utility_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility.service */ "./src/app/utility.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this.http = http;
        this.users = [];
        this.userChanges = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.fetchUsers();
    }
    UsersService.prototype.getUsers = function () {
        return this.users.slice();
    };
    UsersService.prototype.fetchUsers = function () {
        var _this = this;
        this.http.get(_utility_service__WEBPACK_IMPORTED_MODULE_2__["uri"] + 'users.json')
            .subscribe(function (users) {
            _this.users = users;
            _this.userChanges.next(users);
        });
    };
    UsersService.prototype.storeUsers = function () {
        this.http.post(_utility_service__WEBPACK_IMPORTED_MODULE_2__["uri"] + 'users.json', this.getUsers())
            .subscribe(function (users) {
        });
    };
    UsersService.prototype.addUser = function (user) {
        this.users.push(user);
        this.userChanges.next(this.users.slice());
        return this.storeUsers();
    };
    UsersService.prototype.updateUser = function (index, user) {
        var oldUser = this.users.slice()[index];
        var updated = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ oldUser: oldUser }, user);
        this.users[index] = updated;
        this.userChanges.next(this.users.slice());
        this.storeUsers();
    };
    UsersService.prototype.deleteUser = function (index) {
        this.users.splice(index, 1);
        this.userChanges.next(this.users.slice());
        this.storeUsers();
    };
    UsersService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], UsersService);
    return UsersService;
}());



/***/ }),

/***/ "./src/app/utility.service.ts":
/*!************************************!*\
  !*** ./src/app/utility.service.ts ***!
  \************************************/
/*! exports provided: uri, api_key, auth_Domain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uri", function() { return uri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api_key", function() { return api_key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth_Domain", function() { return auth_Domain; });
var uri = "https://moneyapp-f669d.firebaseio.com/";
var api_key = "AIzaSyDAFzjBrhuAVKfr6CvHDZVKkXj-New9y_c";
var auth_Domain = "moneyapp-f669d.firebaseapp.com";


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\project\Github-daogunkoya\MoneyApp-Angular-Node\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map