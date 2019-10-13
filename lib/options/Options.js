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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFFcEI7Ozs7Ozs7Ozs7O0FBWUE7OztBQUdBLGlCQUFZQyxPQUFaLEVBQTZCO0FBQUE7O0FBQUEsbUNBTFYsSUFLVTs7QUFFNUJDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLE9BQXBCO0FBRUEsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYXZhaWxhYmxlIGZvciBLZXloYXdrIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlcywgaWYgYW55IGV4aXN0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ5IGRlZmF1bHQgS2V5aGF3ayB3aWxsIHVzZSB0aGUgRGVsdGFmcmFtZSBtb2R1bGUgdG8gaGFuZGxlIHRoZSBjaGVja2luZyBvZiBrZXliaW5kIHVzZXMuXHJcblx0ICogXHJcblx0ICogSWYgeW91IHdvdWxkIGxpa2UgdG8gdXNlIHlvdXIgb3duIGdhbWUgbG9vcCBvciBldmVuIGp1c3QgcmF0aGVyIHVzZSBhIHNpbXBsZSBkZWJvdW5jZSBtZXRob2QsIFxyXG4gICAqIHlvdSBjYW4gc2V0IHRoaXMgdG8gZmFsc2UuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtib29sZWFufVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IHRydWVcclxuXHQgKi9cclxuXHR1c2VMb29wOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIGluaXRpYWxpemF0aW9uIG9wdGlvbnMgcGFzc2VkIHRvIEtleWhhd2suXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcblxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0fVxyXG5cclxufSJdfQ==