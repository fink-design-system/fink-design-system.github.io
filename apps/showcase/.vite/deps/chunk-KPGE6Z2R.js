import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";
import {
  devWarning,
  hsl,
  isObject,
  parse,
  rgb
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/props-from-config-LBgEHmcL.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol = root.Symbol;
var objectProto$b = Object.prototype;
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
var nativeObjectToString$1 = objectProto$b.toString;
var symToStringTag$1 = Symbol ? Symbol.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$a = Object.prototype;
var nativeObjectToString = objectProto$a.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
function isObject2(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]";
var funcTag$2 = "[object Function]";
var genTag$1 = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject2(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
})();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype;
var objectProto$9 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject2(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root, "WeakMap");
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ (function() {
  function object() {
  }
  return function(proto) {
    if (!isObject2(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
})();
var defineProperty = (function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
})();
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$7 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$7;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$2;
var Buffer = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var argsTag$1 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var boolTag$2 = "[object Boolean]";
var dateTag$2 = "[object Date]";
var errorTag$1 = "[object Error]";
var funcTag$1 = "[object Function]";
var mapTag$4 = "[object Map]";
var numberTag$2 = "[object Number]";
var objectTag$2 = "[object Object]";
var regexpTag$2 = "[object RegExp]";
var setTag$4 = "[object Set]";
var stringTag$2 = "[object String]";
var weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]";
var dataViewTag$3 = "[object DataView]";
var float32Tag$2 = "[object Float32Array]";
var float64Tag$2 = "[object Float64Array]";
var int8Tag$2 = "[object Int8Array]";
var int16Tag$2 = "[object Int16Array]";
var int32Tag$2 = "[object Int32Array]";
var uint8Tag$2 = "[object Uint8Array]";
var uint8ClampedTag$2 = "[object Uint8ClampedArray]";
var uint16Tag$2 = "[object Uint16Array]";
var uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports$1;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = (function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
})();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if (hasOwnProperty$4.call(value, key) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root, "Map");
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
freeExports && typeof module == "object" && module && !module.nodeType && module;
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
var DataView = getNative(root, "DataView");
var Promise$1 = getNative(root, "Promise");
var Set$1 = getNative(root, "Set");
var mapTag$3 = "[object Map]";
var objectTag$1 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag$3 = "[object Set]";
var weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map$1);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set$1);
var weakMapCtorString = toSource(WeakMap);
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = cloneArrayBuffer(dataView.buffer);
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol ? Symbol.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer);
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var mapTag$2 = "[object Map]";
var numberTag$1 = "[object Number]";
var regexpTag$1 = "[object RegExp]";
var setTag$2 = "[object Set]";
var stringTag$1 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag$1 = "[object Float32Array]";
var float64Tag$1 = "[object Float64Array]";
var int8Tag$1 = "[object Int8Array]";
var int16Tag$1 = "[object Int16Array]";
var int32Tag$1 = "[object Int32Array]";
var uint8Tag$1 = "[object Uint8Array]";
var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
var uint16Tag$1 = "[object Uint16Array]";
var uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag$1;
}
var nodeIsMap = nodeUtil && nodeUtil.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag$1;
}
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result;
  if (result !== void 0) {
    return result;
  }
  if (!isObject2(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFunc ? {} : initCloneObject(value);
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = getAllKeys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function normalizeString(value) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  throw new TypeError(`Cannot convert ${typeof value} to string`);
}
function normalizeLabelSegments(value) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (Array.isArray(value) && value.every(isLabelSegment)) {
    return value;
  }
  throw new TypeError(`Cannot convert ${typeof value} to a label`);
}
function normalizeInteger(value) {
  let parsed;
  try {
    parsed = normalizeNumber(value);
  } catch (_a) {
    throw new Error(`Invalid integer: ${String(value)}`);
  }
  return Number.isInteger(parsed) ? parsed : Math.round(parsed);
}
function normalizeNumber(value) {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  throw new Error(`Invalid number: ${String(value)}`);
}
function normalizeNumberType(value) {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
  throw new Error(`Invalid number: ${String(value)}`);
}
var NUMBER_STRING_PATTERN = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
function isNumberString(value) {
  return typeof value === "string" && NUMBER_STRING_PATTERN.test(value) && Number.isFinite(Number(value));
}
function normalizeInputNumber(value) {
  if (typeof value === "number") {
    return isNaN(value) ? void 0 : value;
  }
  if (isNumberString(value)) {
    return parseFloat(value);
  }
  throw new Error(`Invalid number: ${value}`);
}
function normalizeBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lowerCase = value.toLowerCase();
    if (lowerCase === "true" || lowerCase === "false") {
      return lowerCase === "true";
    }
  }
  throw new Error(`Invalid boolean: ${String(value)}`);
}
function normalizeBooleanToken(value, propLabel) {
  if (value === true || value === "true") {
    return "true";
  }
  if (value === false || value === "false") {
    return "false";
  }
  if (value === "") {
    return "";
  }
  throw new Error(`Invalid ${propLabel} value: expected a boolean, got ${JSON.stringify(value)}`);
}
function isEnumOption(value, options) {
  return typeof value === "string" && options.includes(value);
}
function normalizeObject(value) {
  if (isObject(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = JSON.parse(value);
    if (isObject(parsed)) {
      return parsed;
    }
  }
  throw new Error(`Invalid object: ${value}`);
}
function normalizeArray(value) {
  if (isObject(value) && Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = JSON.parse(value);
    if (isObject(parsed) && Array.isArray(parsed)) {
      return parsed;
    }
  }
  throw new Error(`Invalid array: ${value}`);
}
function normalizeCallbacksObject(value) {
  if (typeof value === "object" && value !== null) {
    return value;
  }
  throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}
function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (_a) {
    return "[unserializable]";
  }
}
function warnInvalidValue(propName, value, cause) {
  const reason = cause instanceof Error ? ` (${cause.message})` : "";
  devWarning(`The property value ${safeStringify(value)} for '${propName}' is not valid${reason}. The value is ignored.`);
}
function createPropDefinition(propName, defaultValue, normalize, validate = () => true, options) {
  return {
    propName,
    getDefaultValue: isObject2(defaultValue) ? () => cloneDeep(defaultValue) : () => defaultValue,
    normalize,
    validate,
    apply(value, callback, required) {
      var _a;
      if (value === void 0 || value === null) {
        if (required) {
          devWarning(`The required property '_${propName}' did not receive a value. ${defaultValue === void 0 ? "The property stays unset." : "The default value is used instead."}`);
        }
        if (defaultValue === void 0) {
          callback(void 0);
          return;
        }
        const fallback = this.getDefaultValue();
        if (this.validate(fallback)) {
          callback(fallback);
        } else {
          throw new Error(`Default value ${safeStringify(defaultValue)} is invalid for prop definition '${propName}'.`);
        }
        return;
      }
      try {
        const normalized = this.normalize(value);
        if (this.validate(normalized)) {
          (_a = options === null || options === void 0 ? void 0 : options.hints) === null || _a === void 0 ? void 0 : _a.call(options, this.propName, normalized);
          callback(normalized);
        } else {
          warnInvalidValue(propName, value);
        }
      } catch (error) {
        warnInvalidValue(propName, value, error);
      }
    }
  };
}
function createDependentPropDefinition(propName, defaultValue, normalize, validate = () => true, options) {
  return {
    propName,
    getDefaultValue: isObject2(defaultValue) ? () => cloneDeep(defaultValue) : () => defaultValue,
    normalize,
    validate,
    apply(value, callback, deps) {
      var _a;
      if (value === void 0 || value === null) {
        if (defaultValue === void 0) {
          callback(void 0);
          return;
        }
        const fallback = this.getDefaultValue();
        if (this.validate(fallback, deps)) {
          callback(fallback);
        } else {
          throw new Error(`Default value ${safeStringify(defaultValue)} is invalid for prop definition '${propName}' with dependencies ${safeStringify(deps)}.`);
        }
        return;
      }
      try {
        const normalized = this.normalize(value, deps);
        if (this.validate(normalized, deps)) {
          (_a = void 0) === null || _a === void 0 ? void 0 : _a.call(options, this.propName, normalized);
          callback(normalized);
        } else {
          warnInvalidValue(propName, value);
        }
      } catch (error) {
        warnInvalidValue(propName, value, error);
      }
    }
  };
}
function createCallbacksPropDefinition() {
  return createPropDefinition("on", {}, (value) => normalizeCallbacksObject(value));
}
function rgba(color) {
  if (Array.isArray(color) && color.raw) color = String.raw(...arguments);
  var values;
  var parsed = parse(color);
  if (!parsed.space) return [];
  const min = parsed.space[0] === "h" ? hsl.min : rgb.min;
  const max = parsed.space[0] === "h" ? hsl.max : rgb.max;
  values = Array(3);
  values[0] = Math.min(Math.max(parsed.values[0], min[0]), max[0]);
  values[1] = Math.min(Math.max(parsed.values[1], min[1]), max[1]);
  values[2] = Math.min(Math.max(parsed.values[2], min[2]), max[2]);
  if (parsed.space[0] === "h") {
    values = hsl.rgb(values);
  }
  values.push(Math.min(Math.max(parsed.alpha, 0), 1));
  return values;
}
var READABLE_CHARS = /[a-zA-Z0-9äöüÄÖÜß]/g;
var ONLY_NUMBERS = /^\d+$/;
function countReadableChars(str) {
  var _a;
  return typeof str === "string" ? ((_a = str.match(READABLE_CHARS)) === null || _a === void 0 ? void 0 : _a.length) || 0 : 0;
}
function hasEnoughReadableChars(str, min = 1) {
  return countReadableChars(str) >= min;
}
function containsOnlyNumbers(str) {
  return ONLY_NUMBERS.test(str);
}
function trimLabel(label) {
  if (typeof label === "string") {
    return label.trim();
  }
  if (Array.isArray(label)) {
    return label.map((item) => item.text).join("").trim();
  }
  return "";
}
function isLabelSegment(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const v = value;
  const keys2 = Object.keys(v);
  if (!keys2.every((k) => k === "text" || k === "lang")) {
    return false;
  }
  if (typeof v.text !== "string") {
    return false;
  }
  if (v.lang !== void 0 && typeof v.lang !== "string") {
    return false;
  }
  return true;
}
var isValidLabelString = (value) => value.length >= 2 || containsOnlyNumbers(value);
function isValidLabelSegments(value) {
  if (typeof value === "string") {
    return isValidLabelString(value);
  }
  if (Array.isArray(value)) {
    return value.length > 0 && value.every(isLabelSegment) && isValidLabelString(trimLabel(value));
  }
  return false;
}
var HEX_REGEX = /^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;
var isColorPair = (value) => typeof value === "object" && value !== null && typeof value.backgroundColor === "string" && typeof value.foregroundColor === "string";
var parseColorPair = (value) => {
  if (value.startsWith("{")) {
    try {
      const parsed = JSON.parse(value);
      return isColorPair(parsed) ? parsed : void 0;
    } catch (_a) {
      return void 0;
    }
  }
  return void 0;
};
var toChannels = (color) => {
  const channels = rgba(color);
  if (!Array.isArray(channels) || channels.length < 3) {
    throw new Error(`Invalid KoliBri color: ${color}`);
  }
  const [red, green, blue] = channels;
  return { red, green, blue };
};
var kolibriColorProp = createPropDefinition("color", toChannels("#003c78"), (value) => {
  if (typeof value === "string" && HEX_REGEX.test(value)) {
    return toChannels(value);
  }
  const pair = isColorPair(value) ? value : typeof value === "string" ? parseColorPair(value) : void 0;
  if (pair) {
    return toChannels(pair.foregroundColor);
  }
  throw new Error("Invalid KoliBri color: expected a hex string or a color pair.");
});
var LOADING_OPTIONS = ["eager", "lazy"];
var LOADING_SET = new Set(LOADING_OPTIONS);
var loadingProp = createPropDefinition("loading", "lazy", (value) => normalizeString(value), (v) => LOADING_SET.has(v));
function clamp(value, deps) {
  if (value < deps.min) {
    return deps.min;
  } else if (value > deps.max) {
    return deps.max;
  }
  return value;
}
var clampedNumberValueDefinition = createDependentPropDefinition("value", 0, (value, deps) => clamp(normalizeNumber(value), deps), (v) => typeof v === "number" && !isNaN(v));
var clampedNumberValueProp = Object.assign(Object.assign({}, clampedNumberValueDefinition), { apply(value, callback, deps) {
  clampedNumberValueDefinition.apply(value, (normalized) => callback(clamp(normalized, deps)), deps);
} });
var DIALOG_VARIANT_OPTIONS = ["blank", "card"];
var DIALOG_VARIANT_SET = new Set(DIALOG_VARIANT_OPTIONS);
var variantDialogProp = createPropDefinition("variant", "blank", (value) => normalizeString(value), (v) => DIALOG_VARIANT_SET.has(v));
var QUOTE_VARIANT_OPTIONS = ["block", "inline"];
var QUOTE_VARIANT_SET = new Set(QUOTE_VARIANT_OPTIONS);
var variantQuoteProp = createPropDefinition("variant", "inline", (value) => normalizeString(value), (v) => QUOTE_VARIANT_SET.has(v));
var toVal = (mix) => {
  let str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object" && mix !== null) {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        if (item) {
          const y = toVal(item);
          if (y) {
            if (str) {
              str += " ";
            }
            str += y;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          if (str) {
            str += " ";
          }
          str += key;
        }
      }
    }
  }
  return str;
};
var clsx = (...args) => {
  let str = "";
  for (const arg of args) {
    if (arg) {
      const x = toVal(arg);
      if (x) {
        if (str) {
          str += " ";
        }
        str += x;
      }
    }
  }
  return str;
};
var blockBemCache = /* @__PURE__ */ new Map();
function getBlockBem(block) {
  let blockBem = blockBemCache.get(block);
  if (!blockBem) {
    blockBem = bem.forBlock(block);
    blockBemCache.set(block, blockBem);
  }
  return blockBem;
}
var renderBemRootNode = (props, children) => {
  var _a;
  const blockBem = getBlockBem(props.block);
  const className = clsx(blockBem(props.modifiers), props.class);
  const attributes = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === "block") {
      attributes.class = className;
    } else if (key !== "class" && key !== "component" && key !== "modifiers") {
      attributes[key] = value;
    }
  }
  const Root = (_a = props.component) !== null && _a !== void 0 ? _a : "div";
  return h(Root, Object.assign({}, attributes), children);
};
var BemRootNodeFC = renderBemRootNode;
function buildDefaultPropsFromConfig(config) {
  var _a, _b;
  const defaults = {};
  for (const def of [...(_a = config.required) !== null && _a !== void 0 ? _a : [], ...(_b = config.optional) !== null && _b !== void 0 ? _b : []]) {
    defaults[def.propName] = def.getDefaultValue();
  }
  return defaults;
}
function resolveFcProps(config, props) {
  return Object.assign(Object.assign({}, buildDefaultPropsFromConfig(config)), props);
}

export {
  baseGetTag,
  isObjectLike,
  isArray,
  normalizeString,
  normalizeLabelSegments,
  normalizeInteger,
  normalizeNumber,
  normalizeNumberType,
  isNumberString,
  normalizeInputNumber,
  normalizeBoolean,
  normalizeBooleanToken,
  isEnumOption,
  normalizeObject,
  normalizeArray,
  normalizeCallbacksObject,
  createPropDefinition,
  createDependentPropDefinition,
  createCallbacksPropDefinition,
  rgba,
  hasEnoughReadableChars,
  containsOnlyNumbers,
  trimLabel,
  isValidLabelString,
  isValidLabelSegments,
  kolibriColorProp,
  loadingProp,
  clampedNumberValueProp,
  variantDialogProp,
  variantQuoteProp,
  clsx,
  getBlockBem,
  BemRootNodeFC,
  buildDefaultPropsFromConfig,
  resolveFcProps
};
//# sourceMappingURL=chunk-KPGE6Z2R.js.map
