'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _key2 = _interopRequireDefault(require("./key/key"));

var _keybind = _interopRequireDefault(require("./key/keybind"));

var _Options = _interopRequireDefault(require("./options/Options"));

var _deltaframe = _interopRequireDefault(require("deltaframe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Create keybinds easily with single and multi key support
 */
var Keyhawk =
/*#__PURE__*/
function () {
  /**
   * The selected options for Keyhawk.
   * 
   * @property {Options}
   * 
    * @private
   */

  /**
   * A list of keys that can be selected to be used in keybinds.
   * 
    * @private
   */

  /**
   * A list of the created keybinds.
   * 
   * @property {Array<Keybind>}
    * 
    * @private
   */

  /**
   * If you don't want to create your own game loop to check keykind uses on an interval, you opt in to
    * use the Deltaframe package.
   * 
   * @property {Deltaframe|null}
    * 
    * @private
   */

  /**
   * Keeps track of what keys have been pressed.
    * 
   * @private
   * 
   * @property {Object}
   */

  /**
   * Indicates whether using keybinds is currently disabled or not.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The amount of time that keybinds are disabled for, if any.
   * 
   * @private
   * 
   * @property {number} 
   */

  /**
   * @param {Object} [options]
   * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses. If you would like to use your own game loop or even just rather use a simple debounce method, you can set this to false.
   */
  function Keyhawk() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Keyhawk);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "KEY", _key2["default"]);

    _defineProperty(this, "_keybinds", []);

    _defineProperty(this, "_loop", null);

    _defineProperty(this, "_pressed", {});

    _defineProperty(this, "_disabled", false);

    _defineProperty(this, "_disabledTime", 0);

    this._options = new _Options["default"](options);

    this._boot();
  }
  /**
   * Returns whether keybinds are currently disabled or not.
   * 
   * @returns {boolean}
   */


  _createClass(Keyhawk, [{
    key: "_boot",

    /**
     * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
     * 
     * @private
     */
    value: function _boot() {
      var _this = this;

      window.addEventListener('keydown', function (ev) {
        return _this._keydown(ev);
      });
      window.addEventListener('keyup', function (ev) {
        return _this._keyup(ev);
      });

      if (this._options.useLoop) {
        this._loop = new _deltaframe["default"]({});

        this._loop.start(function (time) {
          return _this.check(time);
        });
      }
    }
    /**
     * Creates a new keybind with the specified keys.
     * 
     * @param {...string} keys One or more keys from the `KEYS` property to attach to this keybind.
     * 
     * @returns {Keybind} Returns the newly created keybind.
     */

  }, {
    key: "keybind",
    value: function keybind() {
      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      if (!keys) {
        console.warn('At least one key must be provided to create a keybind');
        return;
      }

      var keyObj = {};

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        keyObj[key] = true;
      }

      var keybind = new _keybind["default"](keyObj);

      this._keybinds.push(keybind);

      return keybind;
    }
    /**
     * Checks to see which key conditions are currently being met and runs the keybind's attached callback method.
      * 
      * @param {number} time The current timestamp which is used to check for delays and is passed to the keybind's callback method.
     */

  }, {
    key: "check",
    value: function check(time) {
      var _this2 = this;

      this._keybinds.forEach(function (o) {
        var isActive = Object.entries(o.keys).every(function (arr) {
          return _this2._pressed[arr[0]] == arr[1];
        });
        var isPastInitialDelay = time > o._initialDelay;
        var isTime = time - o._lastUsed > o._delay;

        if (_this2._disabled) {
          if (time < time + _this2._disabledTime) return;else _this2._resetDisabled();
        }

        if (isActive && isPastInitialDelay && isTime) o.run(time);
      });
    }
    /**
     * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
     * 
     * @param {number} [lengthOfTime=Infinity] An optional amount of time to wait until keybinds are automatically enabled again. 
     */

  }, {
    key: "disable",
    value: function disable() {
      var lengthOfTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      this._disabled = true;
      this._disabledTime = lengthOfTime;
    }
    /**
     * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
     * keybinds again.
     */

  }, {
    key: "enable",
    value: function enable() {
      this._resetDisabled();
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "_keydown",
    value: function _keydown(event) {
      this._pressed[event.key.toLowerCase()] = true;
      event.preventDefault();
      return;
    }
    /**
     * When a key is released, set its property in the `pressed` object to `false`.
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "_keyup",
    value: function _keyup(event) {
      this._pressed[event.key.toLowerCase()] = false;
      event.preventDefault();
      return;
    }
    /**
     * Resets both disabled properties, disabled to false and disabled time to 0 when keybinds are enabled
     * again after being disabled.
     * 
     * @private
     */

  }, {
    key: "_resetDisabled",
    value: function _resetDisabled() {
      this._disabled = false;
      this._disabledTime = 0;
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
    /**
     * Returns the disabled time, if it was set.
     * 
     * @returns {number}
     */

  }, {
    key: "disabledTime",
    get: function get() {
      return this._disabledTime;
    }
  }]);

  return Keyhawk;
}();

exports["default"] = Keyhawk;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9ib290Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiX2tleWRvd24iLCJfa2V5dXAiLCJ1c2VMb29wIiwiX2xvb3AiLCJEZWx0YWZyYW1lIiwic3RhcnQiLCJ0aW1lIiwiY2hlY2siLCJrZXlzIiwiY29uc29sZSIsIndhcm4iLCJrZXlPYmoiLCJrZXkiLCJrZXliaW5kIiwiS2V5YmluZCIsIl9rZXliaW5kcyIsInB1c2giLCJmb3JFYWNoIiwibyIsImlzQWN0aXZlIiwiT2JqZWN0IiwiZW50cmllcyIsImV2ZXJ5IiwiYXJyIiwiX3ByZXNzZWQiLCJpc1Bhc3RJbml0aWFsRGVsYXkiLCJfaW5pdGlhbERlbGF5IiwiaXNUaW1lIiwiX2xhc3RVc2VkIiwiX2RlbGF5IiwiX2Rpc2FibGVkIiwiX2Rpc2FibGVkVGltZSIsIl9yZXNldERpc2FibGVkIiwicnVuIiwibGVuZ3RoT2ZUaW1lIiwiSW5maW5pdHkiLCJldmVudCIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLE87OztBQUVwQjs7Ozs7Ozs7QUFTQTs7Ozs7O0FBT0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVNDOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNEOzs7O0FBSUMscUJBQWtDO0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBQUEsaUNBcER2QkMsZ0JBb0R1Qjs7QUFBQSx1Q0EzQ0UsRUEyQ0Y7O0FBQUEsbUNBakNHLElBaUNIOztBQUFBLHNDQXhCVixFQXdCVTs7QUFBQSx1Q0FmTCxLQWVLOztBQUFBLDJDQU5GLENBTUU7O0FBRWhDLFNBQUtDLFFBQUwsR0FB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Ozs7Ozs7Ozs7MkJBT2dCRixLLEVBQXNCO0FBRW5DLFdBQUtaLFFBQUwsQ0FBY1ksS0FBSyxDQUFDeEIsR0FBTixDQUFVeUIsV0FBVixFQUFkLElBQXlDLEtBQXpDO0FBRUFELE1BQUFBLEtBQUssQ0FBQ0UsY0FBTjtBQUVBO0FBRUQ7QUFFRDs7Ozs7Ozs7O3FDQU15QjtBQUV2QixXQUFLUixTQUFMLEdBQWlCLEtBQWpCO0FBRUEsV0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUVEOzs7d0JBN0p1QjtBQUFFLGFBQU8sS0FBS0QsU0FBWjtBQUF3QjtBQUVsRDs7Ozs7Ozs7d0JBSzJCO0FBQUUsYUFBTyxLQUFLQyxhQUFaO0FBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgS2V5IGZyb20gJy4va2V5L2tleSc7XHJcbmltcG9ydCBLZXliaW5kIGZyb20gJy4va2V5L2tleWJpbmQnO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XHJcbmltcG9ydCBLZXliaW5kT2JqZWN0IGZyb20gJy4vaW50ZXJmYWNlcy9LZXliaW5kT2JqZWN0JztcclxuXHJcbmltcG9ydCBEZWx0YWZyYW1lIGZyb20gJ2RlbHRhZnJhbWUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBrZXliaW5kcyBlYXNpbHkgd2l0aCBzaW5nbGUgYW5kIG11bHRpIGtleSBzdXBwb3J0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXloYXdrIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNlbGVjdGVkIG9wdGlvbnMgZm9yIEtleWhhd2suXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG5cdCAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIGtleXMgdGhhdCBjYW4gYmUgc2VsZWN0ZWQgdG8gYmUgdXNlZCBpbiBrZXliaW5kcy5cclxuXHQgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIEtFWTogYW55ID0gS2V5O1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpc3Qgb2YgdGhlIGNyZWF0ZWQga2V5YmluZHMuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtBcnJheTxLZXliaW5kPn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2tleWJpbmRzOiBBcnJheTxLZXliaW5kPiA9IFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgeW91ciBvd24gZ2FtZSBsb29wIHRvIGNoZWNrIGtleWtpbmQgdXNlcyBvbiBhbiBpbnRlcnZhbCwgeW91IG9wdCBpbiB0b1xyXG4gICAqIHVzZSB0aGUgRGVsdGFmcmFtZSBwYWNrYWdlLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7RGVsdGFmcmFtZXxudWxsfVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfbG9vcDogKERlbHRhZnJhbWUgfCBudWxsKSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEtlZXBzIHRyYWNrIG9mIHdoYXQga2V5cyBoYXZlIGJlZW4gcHJlc3NlZC5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ByZXNzZWQ6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB1c2luZyBrZXliaW5kcyBpcyBjdXJyZW50bHkgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbW91bnQgb2YgdGltZSB0aGF0IGtleWJpbmRzIGFyZSBkaXNhYmxlZCBmb3IsIGlmIGFueS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBcclxuICAgKi9cclxuICBwcml2YXRlIF9kaXNhYmxlZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlTG9vcD10cnVlXSBCeSBkZWZhdWx0IEtleWhhd2sgd2lsbCB1c2UgdGhlIERlbHRhZnJhbWUgbW9kdWxlIHRvIGhhbmRsZSB0aGUgY2hlY2tpbmcgb2Yga2V5YmluZCB1c2VzLiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlIGRlYm91bmNlIG1ldGhvZCwgeW91IGNhbiBzZXQgdGhpcyB0byBmYWxzZS5cclxuXHQgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG5cclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIGtleWJpbmRzIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc2FibGVkIHRpbWUsIGlmIGl0IHdhcyBzZXQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgZGlzYWJsZWRUaW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kaXNhYmxlZFRpbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0dXAgdGhlIGtleWRvd24gYW5kIGtleXVwIGV2ZW50IGxpc3RlbmVycyBhbmQgYWxzbyBpbml0aWFsaXplIERlbHRhZnJhbWUgaWYgaXQgaXMgYmVpbmcgdXNlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXYpID0+IHRoaXMuX2tleWRvd24oZXYpKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXYpID0+IHRoaXMuX2tleXVwKGV2KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX29wdGlvbnMudXNlTG9vcCkge1xyXG5cclxuICAgICAgdGhpcy5fbG9vcCA9IG5ldyBEZWx0YWZyYW1lKHt9KTtcclxuXHJcbiAgICAgIHRoaXMuX2xvb3Auc3RhcnQoKHRpbWU6IG51bWJlcikgPT4gdGhpcy5jaGVjayh0aW1lKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcga2V5YmluZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gey4uLnN0cmluZ30ga2V5cyBPbmUgb3IgbW9yZSBrZXlzIGZyb20gdGhlIGBLRVlTYCBwcm9wZXJ0eSB0byBhdHRhY2ggdG8gdGhpcyBrZXliaW5kLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGtleWJpbmQuXHJcblx0ICovXHJcbiAga2V5YmluZCguLi5rZXlzOiBBcnJheTxzdHJpbmc+KTogKEtleWJpbmQgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBpZiAoIWtleXMpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybignQXQgbGVhc3Qgb25lIGtleSBtdXN0IGJlIHByb3ZpZGVkIHRvIGNyZWF0ZSBhIGtleWJpbmQnKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2V5T2JqOiBLZXliaW5kT2JqZWN0ID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykga2V5T2JqW2tleV0gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGtleWJpbmQ6IEtleWJpbmQgPSBuZXcgS2V5YmluZChrZXlPYmopO1xyXG5cclxuICAgIHRoaXMuX2tleWJpbmRzLnB1c2goa2V5YmluZCk7XHJcblxyXG4gICAgcmV0dXJuIGtleWJpbmQ7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIHRvIHNlZSB3aGljaCBrZXkgY29uZGl0aW9ucyBhcmUgY3VycmVudGx5IGJlaW5nIG1ldCBhbmQgcnVucyB0aGUga2V5YmluZCdzIGF0dGFjaGVkIGNhbGxiYWNrIG1ldGhvZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgY3VycmVudCB0aW1lc3RhbXAgd2hpY2ggaXMgdXNlZCB0byBjaGVjayBmb3IgZGVsYXlzIGFuZCBpcyBwYXNzZWQgdG8gdGhlIGtleWJpbmQncyBjYWxsYmFjayBtZXRob2QuXHJcblx0ICovXHJcbiAgY2hlY2sodGltZTogbnVtYmVyKSB7XHJcblxyXG4gICAgdGhpcy5fa2V5YmluZHMuZm9yRWFjaChvID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGlzQWN0aXZlOiBib29sZWFuID0gT2JqZWN0LmVudHJpZXMoby5rZXlzKS5ldmVyeShhcnIgPT4gdGhpcy5fcHJlc3NlZFthcnJbMF1dID09IGFyclsxXSk7XHJcblxyXG4gICAgICBjb25zdCBpc1Bhc3RJbml0aWFsRGVsYXk6IGJvb2xlYW4gPSB0aW1lID4gby5faW5pdGlhbERlbGF5O1xyXG5cclxuICAgICAgY29uc3QgaXNUaW1lOiBib29sZWFuID0gdGltZSAtIG8uX2xhc3RVc2VkID4gby5fZGVsYXk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRpbWUgPCB0aW1lICsgdGhpcy5fZGlzYWJsZWRUaW1lKSByZXR1cm47XHJcblxyXG4gICAgICAgIGVsc2UgdGhpcy5fcmVzZXREaXNhYmxlZCgpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQWN0aXZlICYmIGlzUGFzdEluaXRpYWxEZWxheSAmJiBpc1RpbWUpIG8ucnVuKHRpbWUpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGVzIHRoZSB1c2Ugb2YgYWxsIGtleWJpbmRzIHVudGlsIGVuYWJsZSBpcyBjYWxsZWQgb3IgdW50aWwgdGhlIHdhaXQgdGltZSBoYXMgZXhwaXJlZCBpZiBpdCBpcyBwcm92aWRlZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aE9mVGltZT1JbmZpbml0eV0gQW4gb3B0aW9uYWwgYW1vdW50IG9mIHRpbWUgdG8gd2FpdCB1bnRpbCBrZXliaW5kcyBhcmUgYXV0b21hdGljYWxseSBlbmFibGVkIGFnYWluLiBcclxuICAgKi9cclxuICBkaXNhYmxlKGxlbmd0aE9mVGltZTogbnVtYmVyID0gSW5maW5pdHkpIHtcclxuXHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5fZGlzYWJsZWRUaW1lID0gIGxlbmd0aE9mVGltZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBubyBlbmQgdGltZSBpcyBwYXNzZWQgd2hlbiBjYWxsaW5nIHRoZSBgZGlzYWJsZWAgbWV0aG9kLCB0aGlzIG1ldGhvZCBoYXMgdG8gYmUgY2FsbGVkIHRvIGVuYWJsZSB0aGUgdXNlIG9mXHJcbiAgICoga2V5YmluZHMgYWdhaW4uXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG5cclxuICAgIHRoaXMuX3Jlc2V0RGlzYWJsZWQoKTtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGFkZCBpdCB0byB0aGUgYHByZXNzZWRgIE9iamVjdCBpZiBpdCBkb2Vzbid0IGFscmVhZHkgZXhpc3QgYW5kIHNldCBpdCB0byBgdHJ1ZWAuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IFRoZSBldmVudCBnZW5lcmF0ZWQgZnJvbSB0aGUga2V5cHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgIHRoaXMuX3ByZXNzZWRbZXZlbnQua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGEga2V5IGlzIHJlbGVhc2VkLCBzZXQgaXRzIHByb3BlcnR5IGluIHRoZSBgcHJlc3NlZGAgb2JqZWN0IHRvIGBmYWxzZWAuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IFRoZSBldmVudCBnZW5lcmF0ZWQgZnJvbSB0aGUga2V5cHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfa2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICB0aGlzLl9wcmVzc2VkW2V2ZW50LmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgcmV0dXJuO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBib3RoIGRpc2FibGVkIHByb3BlcnRpZXMsIGRpc2FibGVkIHRvIGZhbHNlIGFuZCBkaXNhYmxlZCB0aW1lIHRvIDAgd2hlbiBrZXliaW5kcyBhcmUgZW5hYmxlZFxyXG4gICAqIGFnYWluIGFmdGVyIGJlaW5nIGRpc2FibGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVzZXREaXNhYmxlZCgpIHtcclxuXHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBcclxuICAgIHRoaXMuX2Rpc2FibGVkVGltZSA9IDA7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19