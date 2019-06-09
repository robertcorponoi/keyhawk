'use strict';
/**
 * Defines the options available for Keyhawk and their default values, if any exist.
 * 
 * @version 0.1.0
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
 * @since 0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTztBQUVwQjs7Ozs7Ozs7Ozs7OztBQWNBOzs7QUFHQSxpQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBLG1DQUxWLElBS1U7O0FBRTVCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUVBLEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBvcHRpb25zIGF2YWlsYWJsZSBmb3IgS2V5aGF3ayBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXMsIGlmIGFueSBleGlzdC5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcblx0LyoqXHJcblx0ICogQnkgZGVmYXVsdCBLZXloYXdrIHdpbGwgdXNlIHRoZSBEZWx0YWZyYW1lIG1vZHVsZSB0byBoYW5kbGUgdGhlIGNoZWNraW5nIG9mIGtleWJpbmQgdXNlcy5cclxuXHQgKiBcclxuXHQgKiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlIGRlYm91bmNlIG1ldGhvZCwgXHJcbiAgICogeW91IGNhbiBzZXQgdGhpcyB0byBmYWxzZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdCAqL1xyXG5cdHVzZUxvb3A6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgaW5pdGlhbGl6YXRpb24gb3B0aW9ucyBwYXNzZWQgdG8gS2V5aGF3ay5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHR9XHJcblxyXG59Il19