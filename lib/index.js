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

    _defineProperty(this, "_KEY", _key2["default"]);

    _defineProperty(this, "_keybinds", []);

    _defineProperty(this, "_loop", null);

    _defineProperty(this, "_pressed", {});

    _defineProperty(this, "_disabled", false);

    _defineProperty(this, "_disabledTime", 0);

    this._options = new _Options["default"](options);

    this._boot();
  }
  /**
   * Returns the keys that can be used to create keybinds.
   * 
   * @returns {Keys}
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
    key: "KEY",
    get: function get() {
      return this._KEY;
    }
    /**
     * Returns whether keybinds are currently disabled or not.
     * 
     * @returns {boolean}
     */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9ib290Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwiX2tleWRvd24iLCJfa2V5dXAiLCJ1c2VMb29wIiwiX2xvb3AiLCJEZWx0YWZyYW1lIiwic3RhcnQiLCJ0aW1lIiwiY2hlY2siLCJrZXlzIiwiY29uc29sZSIsIndhcm4iLCJrZXlPYmoiLCJrZXkiLCJrZXliaW5kIiwiS2V5YmluZCIsIl9rZXliaW5kcyIsInB1c2giLCJmb3JFYWNoIiwibyIsImlzQWN0aXZlIiwiT2JqZWN0IiwiZW50cmllcyIsImV2ZXJ5IiwiYXJyIiwiX3ByZXNzZWQiLCJpc1Bhc3RJbml0aWFsRGVsYXkiLCJfaW5pdGlhbERlbGF5IiwiaXNUaW1lIiwiX2xhc3RVc2VkIiwiX2RlbGF5IiwiX2Rpc2FibGVkIiwiX2Rpc2FibGVkVGltZSIsIl9yZXNldERpc2FibGVkIiwicnVuIiwibGVuZ3RoT2ZUaW1lIiwiSW5maW5pdHkiLCJldmVudCIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiLCJfS0VZIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUtBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxPOzs7QUFDcEI7Ozs7Ozs7O0FBU0E7Ozs7OztBQU9BOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFTQzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTRDs7OztBQUlDLHFCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLGtDQXBEYkMsZ0JBb0RhOztBQUFBLHVDQTNDRSxFQTJDRjs7QUFBQSxtQ0FqQ0csSUFpQ0g7O0FBQUEsc0NBeEJWLEVBd0JVOztBQUFBLHVDQWZMLEtBZUs7O0FBQUEsMkNBTkYsQ0FNRTs7QUFDaEMsU0FBS0MsUUFB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QUFFRjs7Ozs7Ozs7OzsyQkFPZ0JGLEssRUFBc0I7QUFDbkMsV0FBS1osUUFBTCxDQUFjWSxLQUFLLENBQUN4QixHQUFOLENBQVV5QixXQUFWLEVBQWQsSUFBeUMsS0FBekM7QUFFQUQsTUFBQUEsS0FBSyxDQUFDRSxjQUFOO0FBQ0Q7QUFFRDs7Ozs7Ozs7O3FDQU15QjtBQUN2QixXQUFLUixTQUFMLEdBQWlCLEtBQWpCO0FBRUEsV0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNEOzs7d0JBM0llO0FBQUUsYUFBTyxLQUFLUSxJQUFaO0FBQW1CO0FBRXJDOzs7Ozs7Ozt3QkFLd0I7QUFBRSxhQUFPLEtBQUtULFNBQVo7QUFBd0I7QUFFbEQ7Ozs7Ozs7O3dCQUsyQjtBQUFFLGFBQU8sS0FBS0MsYUFBWjtBQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleSBmcm9tICcuL2tleS9rZXknO1xyXG5pbXBvcnQgS2V5YmluZCBmcm9tICcuL2tleS9rZXliaW5kJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5cclxuaW1wb3J0IEtleXMgZnJvbSAnLi9pbnRlcmZhY2VzL0tleXMnO1xyXG5pbXBvcnQgS2V5YmluZE9iamVjdCBmcm9tICcuL2ludGVyZmFjZXMvS2V5YmluZE9iamVjdCc7XHJcblxyXG5pbXBvcnQgRGVsdGFmcmFtZSBmcm9tICdkZWx0YWZyYW1lJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUga2V5YmluZHMgZWFzaWx5IHdpdGggc2luZ2xlIGFuZCBtdWx0aSBrZXkgc3VwcG9ydFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5aGF3ayB7XHJcblx0LyoqXHJcblx0ICogVGhlIHNlbGVjdGVkIG9wdGlvbnMgZm9yIEtleWhhd2suXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG5cdCAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIGtleXMgdGhhdCBjYW4gYmUgc2VsZWN0ZWQgdG8gYmUgdXNlZCBpbiBrZXliaW5kcy5cclxuXHQgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX0tFWTogS2V5cyA9IEtleTtcclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIHRoZSBjcmVhdGVkIGtleWJpbmRzLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7QXJyYXk8S2V5YmluZD59XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuXHQgKi9cclxuICBwcml2YXRlIF9rZXliaW5kczogQXJyYXk8S2V5YmluZD4gPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgeW91IGRvbid0IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGdhbWUgbG9vcCB0byBjaGVjayBrZXlraW5kIHVzZXMgb24gYW4gaW50ZXJ2YWwsIHlvdSBvcHQgaW4gdG9cclxuICAgKiB1c2UgdGhlIERlbHRhZnJhbWUgcGFja2FnZS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0RlbHRhZnJhbWV8bnVsbH1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2xvb3A6IChEZWx0YWZyYW1lIHwgbnVsbCkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBLZWVwcyB0cmFjayBvZiB3aGF0IGtleXMgaGF2ZSBiZWVuIHByZXNzZWQuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge09iamVjdH1cclxuXHQgKi9cclxuICBwcml2YXRlIF9wcmVzc2VkOiBhbnkgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdXNpbmcga2V5YmluZHMgaXMgY3VycmVudGx5IGRpc2FibGVkIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IG9mIHRpbWUgdGhhdCBrZXliaW5kcyBhcmUgZGlzYWJsZWQgZm9yLCBpZiBhbnkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWRUaW1lOiBudW1iZXIgPSAwO1xyXG4gIFxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUxvb3A9dHJ1ZV0gQnkgZGVmYXVsdCBLZXloYXdrIHdpbGwgdXNlIHRoZSBEZWx0YWZyYW1lIG1vZHVsZSB0byBoYW5kbGUgdGhlIGNoZWNraW5nIG9mIGtleWJpbmQgdXNlcy4gSWYgeW91IHdvdWxkIGxpa2UgdG8gdXNlIHlvdXIgb3duIGdhbWUgbG9vcCBvciBldmVuIGp1c3QgcmF0aGVyIHVzZSBhIHNpbXBsZSBkZWJvdW5jZSBtZXRob2QsIHlvdSBjYW4gc2V0IHRoaXMgdG8gZmFsc2UuXHJcblx0ICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBrZXlzIHRoYXQgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGtleWJpbmRzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtLZXlzfVxyXG4gICAqL1xyXG4gIGdldCBLRVkoKTogS2V5cyB7IHJldHVybiB0aGlzLl9LRVk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIGtleWJpbmRzIGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRpc2FibGVkIHRpbWUsIGlmIGl0IHdhcyBzZXQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgZGlzYWJsZWRUaW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kaXNhYmxlZFRpbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0dXAgdGhlIGtleWRvd24gYW5kIGtleXVwIGV2ZW50IGxpc3RlbmVycyBhbmQgYWxzbyBpbml0aWFsaXplIERlbHRhZnJhbWUgaWYgaXQgaXMgYmVpbmcgdXNlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldikgPT4gdGhpcy5fa2V5ZG93bihldikpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldikgPT4gdGhpcy5fa2V5dXAoZXYpKTtcclxuXHJcbiAgICBpZiAodGhpcy5fb3B0aW9ucy51c2VMb29wKSB7XHJcbiAgICAgIHRoaXMuX2xvb3AgPSBuZXcgRGVsdGFmcmFtZSh7fSk7XHJcblxyXG4gICAgICB0aGlzLl9sb29wLnN0YXJ0KCh0aW1lOiBudW1iZXIpID0+IHRoaXMuY2hlY2sodGltZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBrZXliaW5kIHdpdGggdGhlIHNwZWNpZmllZCBrZXlzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7Li4uc3RyaW5nfSBrZXlzIE9uZSBvciBtb3JlIGtleXMgZnJvbSB0aGUgYEtFWVNgIHByb3BlcnR5IHRvIGF0dGFjaCB0byB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQga2V5YmluZC5cclxuXHQgKi9cclxuICBrZXliaW5kKC4uLmtleXM6IEFycmF5PHN0cmluZz4pOiAoS2V5YmluZCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKCFrZXlzKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignQXQgbGVhc3Qgb25lIGtleSBtdXN0IGJlIHByb3ZpZGVkIHRvIGNyZWF0ZSBhIGtleWJpbmQnKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBrZXlPYmo6IEtleWJpbmRPYmplY3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSBrZXlPYmpba2V5XSA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qga2V5YmluZDogS2V5YmluZCA9IG5ldyBLZXliaW5kKGtleU9iaik7XHJcblxyXG4gICAgdGhpcy5fa2V5YmluZHMucHVzaChrZXliaW5kKTtcclxuXHJcbiAgICByZXR1cm4ga2V5YmluZDtcclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB0byBzZWUgd2hpY2gga2V5IGNvbmRpdGlvbnMgYXJlIGN1cnJlbnRseSBiZWluZyBtZXQgYW5kIHJ1bnMgdGhlIGtleWJpbmQncyBhdHRhY2hlZCBjYWxsYmFjayBtZXRob2QuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIGN1cnJlbnQgdGltZXN0YW1wIHdoaWNoIGlzIHVzZWQgdG8gY2hlY2sgZm9yIGRlbGF5cyBhbmQgaXMgcGFzc2VkIHRvIHRoZSBrZXliaW5kJ3MgY2FsbGJhY2sgbWV0aG9kLlxyXG5cdCAqL1xyXG4gIGNoZWNrKHRpbWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fa2V5YmluZHMuZm9yRWFjaChvID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGlzQWN0aXZlOiBib29sZWFuID0gT2JqZWN0LmVudHJpZXMoby5rZXlzKS5ldmVyeShhcnIgPT4gdGhpcy5fcHJlc3NlZFthcnJbMF1dID09IGFyclsxXSk7XHJcblxyXG4gICAgICBjb25zdCBpc1Bhc3RJbml0aWFsRGVsYXk6IGJvb2xlYW4gPSB0aW1lID4gby5faW5pdGlhbERlbGF5O1xyXG5cclxuICAgICAgY29uc3QgaXNUaW1lOiBib29sZWFuID0gdGltZSAtIG8uX2xhc3RVc2VkID4gby5fZGVsYXk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcclxuICAgICAgICBpZiAodGltZSA8IHRpbWUgKyB0aGlzLl9kaXNhYmxlZFRpbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgZWxzZSB0aGlzLl9yZXNldERpc2FibGVkKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0FjdGl2ZSAmJiBpc1Bhc3RJbml0aWFsRGVsYXkgJiYgaXNUaW1lKSBvLnJ1bih0aW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZXMgdGhlIHVzZSBvZiBhbGwga2V5YmluZHMgdW50aWwgZW5hYmxlIGlzIGNhbGxlZCBvciB1bnRpbCB0aGUgd2FpdCB0aW1lIGhhcyBleHBpcmVkIGlmIGl0IGlzIHByb3ZpZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoT2ZUaW1lPUluZmluaXR5XSBBbiBvcHRpb25hbCBhbW91bnQgb2YgdGltZSB0byB3YWl0IHVudGlsIGtleWJpbmRzIGFyZSBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgYWdhaW4uIFxyXG4gICAqL1xyXG4gIGRpc2FibGUobGVuZ3RoT2ZUaW1lOiBudW1iZXIgPSBJbmZpbml0eSkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX2Rpc2FibGVkVGltZSA9ICBsZW5ndGhPZlRpbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBubyBlbmQgdGltZSBpcyBwYXNzZWQgd2hlbiBjYWxsaW5nIHRoZSBgZGlzYWJsZWAgbWV0aG9kLCB0aGlzIG1ldGhvZCBoYXMgdG8gYmUgY2FsbGVkIHRvIGVuYWJsZSB0aGUgdXNlIG9mXHJcbiAgICoga2V5YmluZHMgYWdhaW4uXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5fcmVzZXREaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBhIGtleSBpcyBwcmVzc2VkLCBhZGQgaXQgdG8gdGhlIGBwcmVzc2VkYCBPYmplY3QgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0IGFuZCBzZXQgaXQgdG8gYHRydWVgLlxyXG4gICAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBUaGUgZXZlbnQgZ2VuZXJhdGVkIGZyb20gdGhlIGtleXByZXNzLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIHRoaXMuX3ByZXNzZWRbZXZlbnQua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gYSBrZXkgaXMgcmVsZWFzZWQsIHNldCBpdHMgcHJvcGVydHkgaW4gdGhlIGBwcmVzc2VkYCBvYmplY3QgdG8gYGZhbHNlYC5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGdlbmVyYXRlZCBmcm9tIHRoZSBrZXlwcmVzcy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9rZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgdGhpcy5fcHJlc3NlZFtldmVudC5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIGJvdGggZGlzYWJsZWQgcHJvcGVydGllcywgZGlzYWJsZWQgdG8gZmFsc2UgYW5kIGRpc2FibGVkIHRpbWUgdG8gMCB3aGVuIGtleWJpbmRzIGFyZSBlbmFibGVkXHJcbiAgICogYWdhaW4gYWZ0ZXIgYmVpbmcgZGlzYWJsZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXNldERpc2FibGVkKCkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgXHJcbiAgICB0aGlzLl9kaXNhYmxlZFRpbWUgPSAwO1xyXG4gIH1cclxufVxyXG4iXX0=