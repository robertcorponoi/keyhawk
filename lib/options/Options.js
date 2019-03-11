'use strict';
/**
 * The Options object defines the options available for Keyhawk along with
 * their defaults in case no options are specified.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * By default Keyhawk will use the Deltaframe module to handle the checking of
 * keybind uses.
 * 
 * If you would like to use your own game loop or even just rather use a simple
 * debounce method, you can set this to false.
 * 
 * @since 0.1.0
 * 
 * @property {boolean}
 * 
 * @default true
 */

/**
 * @param {Object} options The init options passed to Keyhawk.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "useLoop", true);

  // Merge the user specified options with the defaults.
  Object.assign(this, options);
};

exports.default = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFxQkEsTztBQUVwQjs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7O0FBR0EsaUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxtQ0FMVixJQUtVOztBQUU1QjtBQUNBQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUVBLEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBUaGUgT3B0aW9ucyBvYmplY3QgZGVmaW5lcyB0aGUgb3B0aW9ucyBhdmFpbGFibGUgZm9yIEtleWhhd2sgYWxvbmcgd2l0aFxyXG4gKiB0aGVpciBkZWZhdWx0cyBpbiBjYXNlIG5vIG9wdGlvbnMgYXJlIHNwZWNpZmllZC5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaUBnbWFpbC5jb20+XHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ5IGRlZmF1bHQgS2V5aGF3ayB3aWxsIHVzZSB0aGUgRGVsdGFmcmFtZSBtb2R1bGUgdG8gaGFuZGxlIHRoZSBjaGVja2luZyBvZlxyXG5cdCAqIGtleWJpbmQgdXNlcy5cclxuXHQgKiBcclxuXHQgKiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlXHJcblx0ICogZGVib3VuY2UgbWV0aG9kLCB5b3UgY2FuIHNldCB0aGlzIHRvIGZhbHNlLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0ICovXHJcblx0dXNlTG9vcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBpbml0IG9wdGlvbnMgcGFzc2VkIHRvIEtleWhhd2suXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcblxyXG5cdFx0Ly8gTWVyZ2UgdGhlIHVzZXIgc3BlY2lmaWVkIG9wdGlvbnMgd2l0aCB0aGUgZGVmYXVsdHMuXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHR9XHJcblxyXG59Il19