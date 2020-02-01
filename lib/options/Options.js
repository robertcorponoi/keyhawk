'use strict';
/**
 * Defines the options available for Keyhawk and their default values, if any exist.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses.
 * 
 * If you would like to use your own game loop or even just rather use a simple debounce method, 
  * you can set this to false.
 * 
 * @property {boolean}
 * 
 * @default true
 */

/**
 * @param {Object} options The initialization options passed to Keyhawk.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "useLoop", true);

  Object.assign(this, options);
};

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFDcEI7Ozs7Ozs7Ozs7O0FBWUE7OztBQUdBLGlCQUFZQyxPQUFaLEVBQTZCO0FBQUE7O0FBQUEsbUNBTFYsSUFLVTs7QUFDNUJDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE9BQXBCO0FBQ0EsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYXZhaWxhYmxlIGZvciBLZXloYXdrIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlcywgaWYgYW55IGV4aXN0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblx0LyoqXHJcblx0ICogQnkgZGVmYXVsdCBLZXloYXdrIHdpbGwgdXNlIHRoZSBEZWx0YWZyYW1lIG1vZHVsZSB0byBoYW5kbGUgdGhlIGNoZWNraW5nIG9mIGtleWJpbmQgdXNlcy5cclxuXHQgKiBcclxuXHQgKiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlIGRlYm91bmNlIG1ldGhvZCwgXHJcbiAgICogeW91IGNhbiBzZXQgdGhpcyB0byBmYWxzZS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdCAqL1xyXG5cdHVzZUxvb3A6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgaW5pdGlhbGl6YXRpb24gb3B0aW9ucyBwYXNzZWQgdG8gS2V5aGF3ay5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcblx0fVxyXG59Il19