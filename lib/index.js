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

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "KEY", _key2["default"]);

    _defineProperty(this, "keybinds", []);

    _defineProperty(this, "loop", null);

    _defineProperty(this, "pressed", {});

    _defineProperty(this, "disabled", false);

    _defineProperty(this, "disabledTime", 0);

    this.options = new _Options["default"](options);
    this.boot();
  }
  /**
   * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
   * 
   * @private
   */


  _createClass(Keyhawk, [{
    key: "boot",
    value: function boot() {
      var _this = this;

      window.addEventListener('keydown', function (ev) {
        return _this.keydown(ev);
      });
      window.addEventListener('keyup', function (ev) {
        return _this.keyup(ev);
      });

      if (this.options.useLoop) {
        this.loop = new _deltaframe["default"]({});
        this.loop.start(function (time) {
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
      this.keybinds.push(keybind);
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

      this.keybinds.forEach(function (o) {
        var isActive = Object.entries(o.keys).every(function (arr) {
          return _this2.pressed[arr[0]] == arr[1];
        });
        var isPastInitialDelay = time > o._initialDelay;
        var isTime = time - o._lastUsed > o._delay;

        if (_this2.disabled) {
          if (time < time + _this2.disabledTime) return;else _this2.resetDisabled();
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
      this.disabled = true;
      this.disabledTime = lengthOfTime;
    }
    /**
     * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
     * keybinds again.
     */

  }, {
    key: "enable",
    value: function enable() {
      this.resetDisabled();
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "keydown",
    value: function keydown(event) {
      this.pressed[event.key.toLowerCase()] = true;
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
    key: "keyup",
    value: function keyup(event) {
      this.pressed[event.key.toLowerCase()] = false;
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
    key: "resetDisabled",
    value: function resetDisabled() {
      this.disabled = false;
      this.disabledTime = 0;
    }
  }]);

  return Keyhawk;
}();

exports["default"] = Keyhawk;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIk9wdGlvbnMiLCJib290Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2Iiwia2V5ZG93biIsImtleXVwIiwidXNlTG9vcCIsImxvb3AiLCJEZWx0YWZyYW1lIiwic3RhcnQiLCJ0aW1lIiwiY2hlY2siLCJrZXlzIiwiY29uc29sZSIsIndhcm4iLCJrZXlPYmoiLCJrZXkiLCJrZXliaW5kIiwiS2V5YmluZCIsImtleWJpbmRzIiwicHVzaCIsImZvckVhY2giLCJvIiwiaXNBY3RpdmUiLCJPYmplY3QiLCJlbnRyaWVzIiwiZXZlcnkiLCJhcnIiLCJwcmVzc2VkIiwiaXNQYXN0SW5pdGlhbERlbGF5IiwiX2luaXRpYWxEZWxheSIsImlzVGltZSIsIl9sYXN0VXNlZCIsIl9kZWxheSIsImRpc2FibGVkIiwiZGlzYWJsZWRUaW1lIiwicmVzZXREaXNhYmxlZCIsInJ1biIsImxlbmd0aE9mVGltZSIsIkluZmluaXR5IiwiZXZlbnQiLCJ0b0xvd2VyQ2FzZSIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxPOzs7QUFFcEI7Ozs7Ozs7O0FBU0E7Ozs7OztBQU9BOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFTQzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTRDs7OztBQUlDLHFCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLGlDQXBEdkJDLGdCQW9EdUI7O0FBQUEsc0NBM0NDLEVBMkNEOztBQUFBLGtDQWpDRSxJQWlDRjs7QUFBQSxxQ0F4QlgsRUF3Qlc7O0FBQUEsc0NBZk4sS0FlTTs7QUFBQSwwQ0FOSCxDQU1HOztBQUVoQyxTQUFLRCxPQUFMLEdBQWUsSUFBSUUsbUJBQUosQ0FBWUYsT0FBWixDQUFmO0FBRUEsU0FBS0csSUFBTDtBQUVEO0FBRUQ7Ozs7Ozs7OzsyQkFLZTtBQUFBOztBQUViQyxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQUNDLEVBQUQ7QUFBQSxlQUFRLEtBQUksQ0FBQ0MsT0FBTCxDQUFhRCxFQUFiLENBQVI7QUFBQSxPQUFuQztBQUVBRixNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQUNDLEVBQUQ7QUFBQSxlQUFRLEtBQUksQ0FBQ0UsS0FBTCxDQUFXRixFQUFYLENBQVI7QUFBQSxPQUFqQzs7QUFFQSxVQUFJLEtBQUtOLE9BQUwsQ0FBYVMsT0FBakIsRUFBMEI7QUFFeEIsYUFBS0MsSUFBTCxHQUFZLElBQUlDLHNCQUFKLENBQWUsRUFBZixDQUFaO0FBRUEsYUFBS0QsSUFBTCxDQUFVRSxLQUFWLENBQWdCLFVBQUNDLElBQUQ7QUFBQSxpQkFBa0IsS0FBSSxDQUFDQyxLQUFMLENBQVdELElBQVgsQ0FBbEI7QUFBQSxTQUFoQjtBQUVEO0FBRUY7QUFFRjs7Ozs7Ozs7Ozs4QkFPd0Q7QUFBQSx3Q0FBNUNFLElBQTRDO0FBQTVDQSxRQUFBQSxJQUE0QztBQUFBOztBQUVyRCxVQUFJLENBQUNBLElBQUwsRUFBVztBQUVUQyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSx1REFBYjtBQUVBO0FBRUQ7O0FBRUQsVUFBTUMsTUFBcUIsR0FBRyxFQUE5Qjs7QUFFQSwrQkFBa0JILElBQWxCO0FBQUssWUFBTUksR0FBRyxZQUFUO0FBQW1CRCxRQUFBQSxNQUFNLENBQUNDLEdBQUQsQ0FBTixHQUFjLElBQWQ7QUFBeEI7O0FBRUEsVUFBTUMsT0FBZ0IsR0FBRyxJQUFJQyxtQkFBSixDQUFZSCxNQUFaLENBQXpCO0FBRUEsV0FBS0ksUUFBTCxDQUFjQyxJQUFkLENBQW1CSCxPQUFuQjtBQUVBLGFBQU9BLE9BQVA7QUFFRDtBQUVGOzs7Ozs7OzswQkFLT1AsSSxFQUFjO0FBQUE7O0FBRWxCLFdBQUtTLFFBQUwsQ0FBY0UsT0FBZCxDQUFzQixVQUFBQyxDQUFDLEVBQUk7QUFFekIsWUFBTUMsUUFBaUIsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVILENBQUMsQ0FBQ1YsSUFBakIsRUFBdUJjLEtBQXZCLENBQTZCLFVBQUFDLEdBQUc7QUFBQSxpQkFBSSxNQUFJLENBQUNDLE9BQUwsQ0FBYUQsR0FBRyxDQUFDLENBQUQsQ0FBaEIsS0FBd0JBLEdBQUcsQ0FBQyxDQUFELENBQS9CO0FBQUEsU0FBaEMsQ0FBMUI7QUFFQSxZQUFNRSxrQkFBMkIsR0FBR25CLElBQUksR0FBR1ksQ0FBQyxDQUFDUSxhQUE3QztBQUVBLFlBQU1DLE1BQWUsR0FBR3JCLElBQUksR0FBR1ksQ0FBQyxDQUFDVSxTQUFULEdBQXFCVixDQUFDLENBQUNXLE1BQS9DOztBQUVBLFlBQUksTUFBSSxDQUFDQyxRQUFULEVBQW1CO0FBRWpCLGNBQUl4QixJQUFJLEdBQUdBLElBQUksR0FBRyxNQUFJLENBQUN5QixZQUF2QixFQUFxQyxPQUFyQyxLQUVLLE1BQUksQ0FBQ0MsYUFBTDtBQUVOOztBQUVELFlBQUliLFFBQVEsSUFBSU0sa0JBQVosSUFBa0NFLE1BQXRDLEVBQThDVCxDQUFDLENBQUNlLEdBQUYsQ0FBTTNCLElBQU47QUFFL0MsT0FsQkQ7QUFvQkQ7QUFFRDs7Ozs7Ozs7OEJBS3lDO0FBQUEsVUFBakM0QixZQUFpQyx1RUFBVkMsUUFBVTtBQUV2QyxXQUFLTCxRQUFMLEdBQWdCLElBQWhCO0FBRUEsV0FBS0MsWUFBTCxHQUFxQkcsWUFBckI7QUFFRDtBQUVEOzs7Ozs7OzZCQUlTO0FBRVAsV0FBS0YsYUFBTDtBQUVEO0FBRUY7Ozs7Ozs7Ozs7NEJBT2lCSSxLLEVBQXNCO0FBRXBDLFdBQUtaLE9BQUwsQ0FBYVksS0FBSyxDQUFDeEIsR0FBTixDQUFVeUIsV0FBVixFQUFiLElBQXdDLElBQXhDO0FBRUFELE1BQUFBLEtBQUssQ0FBQ0UsY0FBTjtBQUVBO0FBRUQ7QUFFRjs7Ozs7Ozs7OzswQkFPZUYsSyxFQUFzQjtBQUVsQyxXQUFLWixPQUFMLENBQWFZLEtBQUssQ0FBQ3hCLEdBQU4sQ0FBVXlCLFdBQVYsRUFBYixJQUF3QyxLQUF4QztBQUVBRCxNQUFBQSxLQUFLLENBQUNFLGNBQU47QUFFQTtBQUVEO0FBRUQ7Ozs7Ozs7OztvQ0FNd0I7QUFFdEIsV0FBS1IsUUFBTCxHQUFnQixLQUFoQjtBQUVBLFdBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleSBmcm9tICcuL2tleS9rZXknO1xyXG5pbXBvcnQgS2V5YmluZCBmcm9tICcuL2tleS9rZXliaW5kJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgS2V5YmluZE9iamVjdCBmcm9tICcuL2ludGVyZmFjZXMvS2V5YmluZE9iamVjdCc7XHJcblxyXG5pbXBvcnQgRGVsdGFmcmFtZSBmcm9tICdkZWx0YWZyYW1lJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUga2V5YmluZHMgZWFzaWx5IHdpdGggc2luZ2xlIGFuZCBtdWx0aSBrZXkgc3VwcG9ydFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5aGF3ayB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzZWxlY3RlZCBvcHRpb25zIGZvciBLZXloYXdrLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuXHQgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgb3B0aW9uczogT3B0aW9ucztcclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIGtleXMgdGhhdCBjYW4gYmUgc2VsZWN0ZWQgdG8gYmUgdXNlZCBpbiBrZXliaW5kcy5cclxuXHQgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIEtFWTogYW55ID0gS2V5O1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpc3Qgb2YgdGhlIGNyZWF0ZWQga2V5YmluZHMuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtBcnJheTxLZXliaW5kPn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUga2V5YmluZHM6IEFycmF5PEtleWJpbmQ+ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHlvdSBkb24ndCB3YW50IHRvIGNyZWF0ZSB5b3VyIG93biBnYW1lIGxvb3AgdG8gY2hlY2sga2V5a2luZCB1c2VzIG9uIGFuIGludGVydmFsLCB5b3Ugb3B0IGluIHRvXHJcbiAgICogdXNlIHRoZSBEZWx0YWZyYW1lIHBhY2thZ2UuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtEZWx0YWZyYW1lfG51bGx9XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuXHQgKi9cclxuICBwcml2YXRlIGxvb3A6IChEZWx0YWZyYW1lIHwgbnVsbCkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBLZWVwcyB0cmFjayBvZiB3aGF0IGtleXMgaGF2ZSBiZWVuIHByZXNzZWQuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge09iamVjdH1cclxuXHQgKi9cclxuICBwcml2YXRlIHByZXNzZWQ6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB1c2luZyBrZXliaW5kcyBpcyBjdXJyZW50bHkgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBvZiB0aW1lIHRoYXQga2V5YmluZHMgYXJlIGRpc2FibGVkIGZvciwgaWYgYW55LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGlzYWJsZWRUaW1lOiBudW1iZXIgPSAwO1xyXG4gIFxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUxvb3A9dHJ1ZV0gQnkgZGVmYXVsdCBLZXloYXdrIHdpbGwgdXNlIHRoZSBEZWx0YWZyYW1lIG1vZHVsZSB0byBoYW5kbGUgdGhlIGNoZWNraW5nIG9mIGtleWJpbmQgdXNlcy4gSWYgeW91IHdvdWxkIGxpa2UgdG8gdXNlIHlvdXIgb3duIGdhbWUgbG9vcCBvciBldmVuIGp1c3QgcmF0aGVyIHVzZSBhIHNpbXBsZSBkZWJvdW5jZSBtZXRob2QsIHlvdSBjYW4gc2V0IHRoaXMgdG8gZmFsc2UuXHJcblx0ICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLmJvb3QoKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCB0aGUga2V5ZG93biBhbmQga2V5dXAgZXZlbnQgbGlzdGVuZXJzIGFuZCBhbHNvIGluaXRpYWxpemUgRGVsdGFmcmFtZSBpZiBpdCBpcyBiZWluZyB1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBib290KCkge1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2KSA9PiB0aGlzLmtleWRvd24oZXYpKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXYpID0+IHRoaXMua2V5dXAoZXYpKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZUxvb3ApIHtcclxuXHJcbiAgICAgIHRoaXMubG9vcCA9IG5ldyBEZWx0YWZyYW1lKHt9KTtcclxuXHJcbiAgICAgIHRoaXMubG9vcC5zdGFydCgodGltZTogbnVtYmVyKSA9PiB0aGlzLmNoZWNrKHRpbWUpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBrZXliaW5kIHdpdGggdGhlIHNwZWNpZmllZCBrZXlzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7Li4uc3RyaW5nfSBrZXlzIE9uZSBvciBtb3JlIGtleXMgZnJvbSB0aGUgYEtFWVNgIHByb3BlcnR5IHRvIGF0dGFjaCB0byB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQga2V5YmluZC5cclxuXHQgKi9cclxuICBrZXliaW5kKC4uLmtleXM6IEFycmF5PHN0cmluZz4pOiAoS2V5YmluZCB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGlmICgha2V5cykge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdBdCBsZWFzdCBvbmUga2V5IG11c3QgYmUgcHJvdmlkZWQgdG8gY3JlYXRlIGEga2V5YmluZCcpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBrZXlPYmo6IEtleWJpbmRPYmplY3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSBrZXlPYmpba2V5XSA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qga2V5YmluZDogS2V5YmluZCA9IG5ldyBLZXliaW5kKGtleU9iaik7XHJcblxyXG4gICAgdGhpcy5rZXliaW5kcy5wdXNoKGtleWJpbmQpO1xyXG5cclxuICAgIHJldHVybiBrZXliaW5kO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB0byBzZWUgd2hpY2gga2V5IGNvbmRpdGlvbnMgYXJlIGN1cnJlbnRseSBiZWluZyBtZXQgYW5kIHJ1bnMgdGhlIGtleWJpbmQncyBhdHRhY2hlZCBjYWxsYmFjayBtZXRob2QuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIGN1cnJlbnQgdGltZXN0YW1wIHdoaWNoIGlzIHVzZWQgdG8gY2hlY2sgZm9yIGRlbGF5cyBhbmQgaXMgcGFzc2VkIHRvIHRoZSBrZXliaW5kJ3MgY2FsbGJhY2sgbWV0aG9kLlxyXG5cdCAqL1xyXG4gIGNoZWNrKHRpbWU6IG51bWJlcikge1xyXG5cclxuICAgIHRoaXMua2V5YmluZHMuZm9yRWFjaChvID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGlzQWN0aXZlOiBib29sZWFuID0gT2JqZWN0LmVudHJpZXMoby5rZXlzKS5ldmVyeShhcnIgPT4gdGhpcy5wcmVzc2VkW2FyclswXV0gPT0gYXJyWzFdKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzUGFzdEluaXRpYWxEZWxheTogYm9vbGVhbiA9IHRpbWUgPiBvLl9pbml0aWFsRGVsYXk7XHJcblxyXG4gICAgICBjb25zdCBpc1RpbWU6IGJvb2xlYW4gPSB0aW1lIC0gby5fbGFzdFVzZWQgPiBvLl9kZWxheTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcblxyXG4gICAgICAgIGlmICh0aW1lIDwgdGltZSArIHRoaXMuZGlzYWJsZWRUaW1lKSByZXR1cm47XHJcblxyXG4gICAgICAgIGVsc2UgdGhpcy5yZXNldERpc2FibGVkKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNBY3RpdmUgJiYgaXNQYXN0SW5pdGlhbERlbGF5ICYmIGlzVGltZSkgby5ydW4odGltZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZXMgdGhlIHVzZSBvZiBhbGwga2V5YmluZHMgdW50aWwgZW5hYmxlIGlzIGNhbGxlZCBvciB1bnRpbCB0aGUgd2FpdCB0aW1lIGhhcyBleHBpcmVkIGlmIGl0IGlzIHByb3ZpZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoT2ZUaW1lPUluZmluaXR5XSBBbiBvcHRpb25hbCBhbW91bnQgb2YgdGltZSB0byB3YWl0IHVudGlsIGtleWJpbmRzIGFyZSBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgYWdhaW4uIFxyXG4gICAqL1xyXG4gIGRpc2FibGUobGVuZ3RoT2ZUaW1lOiBudW1iZXIgPSBJbmZpbml0eSkge1xyXG5cclxuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZGlzYWJsZWRUaW1lID0gIGxlbmd0aE9mVGltZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBubyBlbmQgdGltZSBpcyBwYXNzZWQgd2hlbiBjYWxsaW5nIHRoZSBgZGlzYWJsZWAgbWV0aG9kLCB0aGlzIG1ldGhvZCBoYXMgdG8gYmUgY2FsbGVkIHRvIGVuYWJsZSB0aGUgdXNlIG9mXHJcbiAgICoga2V5YmluZHMgYWdhaW4uXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG5cclxuICAgIHRoaXMucmVzZXREaXNhYmxlZCgpO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gYSBrZXkgaXMgcHJlc3NlZCwgYWRkIGl0IHRvIHRoZSBgcHJlc3NlZGAgT2JqZWN0IGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBleGlzdCBhbmQgc2V0IGl0IHRvIGB0cnVlYC5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGdlbmVyYXRlZCBmcm9tIHRoZSBrZXlwcmVzcy5cclxuXHQgKi9cclxuICBwcml2YXRlIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICB0aGlzLnByZXNzZWRbZXZlbnQua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGEga2V5IGlzIHJlbGVhc2VkLCBzZXQgaXRzIHByb3BlcnR5IGluIHRoZSBgcHJlc3NlZGAgb2JqZWN0IHRvIGBmYWxzZWAuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IFRoZSBldmVudCBnZW5lcmF0ZWQgZnJvbSB0aGUga2V5cHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBrZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgIHRoaXMucHJlc3NlZFtldmVudC5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgYm90aCBkaXNhYmxlZCBwcm9wZXJ0aWVzLCBkaXNhYmxlZCB0byBmYWxzZSBhbmQgZGlzYWJsZWQgdGltZSB0byAwIHdoZW4ga2V5YmluZHMgYXJlIGVuYWJsZWRcclxuICAgKiBhZ2FpbiBhZnRlciBiZWluZyBkaXNhYmxlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXREaXNhYmxlZCgpIHtcclxuXHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcclxuICAgIFxyXG4gICAgdGhpcy5kaXNhYmxlZFRpbWUgPSAwO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==