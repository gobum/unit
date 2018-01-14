/** -------------------------------------------------------------------------------------------------------------------
 * exec.js
 */

/**
 * function exec(scope: object, code: string): any
 * 安全运行代码
 * @type {function}
 */
const exec = function () {
  const safeties = new Set(["undefined", "NaN", "Infinity", "isFinite", "isNaN", "parseFloat", 
    "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Object", 
    "Boolean", "Symbol", "Error", "EvalError", "InternalError", "RangeError", "ReferenceError",
    "SyntaxError", "TypeError", "URIError", "Number", "Math", "Date", "String", "RegExp", "Array",
    "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array",
    "Uint32Array", "Float32Array", "Float64Array", "Map", "Set", "WeakMap", "WeakSet", 
    "ArrayBuffer", "SharedArrayBuffer", "DataView", "JSON", "Promise", "Reflect", "Proxy", "Intl",
    "console"]);
  with (new Proxy(this, {
    has(o, p) {
      if (p !== "eval" && !safeties.has(p))
        throw ReferenceError(p + " is not defined");
      return o.hasOwnProperty(p);
    }
  }))
  return function () {
    with (arguments[1]||{}) {
      return function exec() {
        "use strict";
        if (/\beval\b/.test(arguments[0]))
          throw ReferenceError('Unexpected word "eval", try to use "exec()" instead.');
        return eval(arguments[0]);
      }(arguments[0]);
    }
  }
}();
