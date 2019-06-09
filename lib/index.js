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
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.5
 */
var Keyhawk =
/*#__PURE__*/
function () {
  /**
   * The selected options for Keyhawk.
   * 
   * @since 1.0.0
   * 
   * @property {Options}
   * 
    * @private
   */

  /**
   * A list of keys that can be selected to be used in keybinds.
   * 
   * @since 0.1.0
   * 
    * @private
   */

  /**
   * A list of the created keybinds.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Keybind>}
    * 
    * @private
   */

  /**
   * If you don't want to create your own game loop to check keykind uses on an interval, you opt in to
    * use the Deltaframe package.
   * 
   * @since 1.0.0
   * 
   * @property {Deltaframe|null}
    * 
    * @private
   */

  /**
   * Keeps track of what keys have been pressed.
   * 
   * @since 0.1.0
    * 
   * @private
   * 
   * @property {Object}
   */

  /**
   * Indicates whether using keybinds is currently disabled or not.
   * 
   * @since 1.0.5
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The amount of time that keybinds are disabled for, if any.
   * 
   * @since 1.0.5
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
   * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
        var isTime = time - o._lastUsed > o._delay;

        if (_this2.disabled) {
          if (time < time + _this2.disabledTime) return;else _this2.resetDisabled();
        }

        if (isActive && isTime) o.run(time);
      });
    }
    /**
     * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
     * 
     * @since 1.0.5
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
     * 
     * @since 1.0.5 
     */

  }, {
    key: "enable",
    value: function enable() {
      this.resetDisabled();
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
     * 
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 1.0.5
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIk9wdGlvbnMiLCJib290Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2Iiwia2V5ZG93biIsImtleXVwIiwidXNlTG9vcCIsImxvb3AiLCJEZWx0YWZyYW1lIiwic3RhcnQiLCJ0aW1lIiwiY2hlY2siLCJrZXlzIiwiY29uc29sZSIsIndhcm4iLCJrZXlPYmoiLCJrZXkiLCJrZXliaW5kIiwiS2V5YmluZCIsImtleWJpbmRzIiwicHVzaCIsImZvckVhY2giLCJvIiwiaXNBY3RpdmUiLCJPYmplY3QiLCJlbnRyaWVzIiwiZXZlcnkiLCJhcnIiLCJwcmVzc2VkIiwiaXNUaW1lIiwiX2xhc3RVc2VkIiwiX2RlbGF5IiwiZGlzYWJsZWQiLCJkaXNhYmxlZFRpbWUiLCJyZXNldERpc2FibGVkIiwicnVuIiwibGVuZ3RoT2ZUaW1lIiwiSW5maW5pdHkiLCJldmVudCIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxPOzs7QUFFcEI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7O0FBV0M7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7OztBQVdEOzs7O0FBSUMscUJBQWtDO0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBQUEsaUNBOUR2QkMsZ0JBOER1Qjs7QUFBQSxzQ0FuREMsRUFtREQ7O0FBQUEsa0NBdkNFLElBdUNGOztBQUFBLHFDQTVCWCxFQTRCVzs7QUFBQSxzQ0FqQk4sS0FpQk07O0FBQUEsMENBTkgsQ0FNRzs7QUFFaEMsU0FBS0QsT0FBTCxHQUFlLElBQUlFLG1CQUFKLENBQVlGLE9BQVosQ0FBZjtBQUVBLFNB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SyxDQUFDRSxjQUFOO0FBRUE7QUFFRDtBQUVEOzs7Ozs7Ozs7OztvQ0FRd0I7QUFFdEIsV0FBS1IsUUFBTCxHQUFnQixLQUFoQjtBQUVBLFdBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleSBmcm9tICcuL2tleS9rZXknO1xyXG5pbXBvcnQgS2V5YmluZCBmcm9tICcuL2tleS9rZXliaW5kJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgS2V5YmluZE9iamVjdCBmcm9tICcuL2ludGVyZmFjZXMvS2V5YmluZE9iamVjdCc7XHJcblxyXG5pbXBvcnQgRGVsdGFmcmFtZSBmcm9tICdkZWx0YWZyYW1lJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUga2V5YmluZHMgZWFzaWx5IHdpdGggc2luZ2xlIGFuZCBtdWx0aSBrZXkgc3VwcG9ydFxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnQgQ29ycG9ub2kgPHJvYmVydGNvcnBvbm9pQGdtYWlsLmNvbT5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDEuMC41XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXloYXdrIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNlbGVjdGVkIG9wdGlvbnMgZm9yIEtleWhhd2suXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG5cdCAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpc3Qgb2Yga2V5cyB0aGF0IGNhbiBiZSBzZWxlY3RlZCB0byBiZSB1c2VkIGluIGtleWJpbmRzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgS0VZOiBhbnkgPSBLZXk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbGlzdCBvZiB0aGUgY3JlYXRlZCBrZXliaW5kcy5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0FycmF5PEtleWJpbmQ+fVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBrZXliaW5kczogQXJyYXk8S2V5YmluZD4gPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgeW91IGRvbid0IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGdhbWUgbG9vcCB0byBjaGVjayBrZXlraW5kIHVzZXMgb24gYW4gaW50ZXJ2YWwsIHlvdSBvcHQgaW4gdG9cclxuICAgKiB1c2UgdGhlIERlbHRhZnJhbWUgcGFja2FnZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0RlbHRhZnJhbWV8bnVsbH1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgbG9vcDogKERlbHRhZnJhbWUgfCBudWxsKSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEtlZXBzIHRyYWNrIG9mIHdoYXQga2V5cyBoYXZlIGJlZW4gcHJlc3NlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgcHJlc3NlZDogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHVzaW5nIGtleWJpbmRzIGlzIGN1cnJlbnRseSBkaXNhYmxlZCBvciBub3QuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC41XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IG9mIHRpbWUgdGhhdCBrZXliaW5kcyBhcmUgZGlzYWJsZWQgZm9yLCBpZiBhbnkuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC41XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkaXNhYmxlZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlTG9vcD10cnVlXSBCeSBkZWZhdWx0IEtleWhhd2sgd2lsbCB1c2UgdGhlIERlbHRhZnJhbWUgbW9kdWxlIHRvIGhhbmRsZSB0aGUgY2hlY2tpbmcgb2Yga2V5YmluZCB1c2VzLiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlIGRlYm91bmNlIG1ldGhvZCwgeW91IGNhbiBzZXQgdGhpcyB0byBmYWxzZS5cclxuXHQgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuYm9vdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHVwIHRoZSBrZXlkb3duIGFuZCBrZXl1cCBldmVudCBsaXN0ZW5lcnMgYW5kIGFsc28gaW5pdGlhbGl6ZSBEZWx0YWZyYW1lIGlmIGl0IGlzIGJlaW5nIHVzZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGJvb3QoKSB7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXYpID0+IHRoaXMua2V5ZG93bihldikpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldikgPT4gdGhpcy5rZXl1cChldikpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTG9vcCkge1xyXG5cclxuICAgICAgdGhpcy5sb29wID0gbmV3IERlbHRhZnJhbWUoe30pO1xyXG5cclxuICAgICAgdGhpcy5sb29wLnN0YXJ0KCh0aW1lOiBudW1iZXIpID0+IHRoaXMuY2hlY2sodGltZSkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IGtleWJpbmQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleXMuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsuLi5zdHJpbmd9IGtleXMgT25lIG9yIG1vcmUga2V5cyBmcm9tIHRoZSBgS0VZU2AgcHJvcGVydHkgdG8gYXR0YWNoIHRvIHRoaXMga2V5YmluZC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCBrZXliaW5kLlxyXG5cdCAqL1xyXG4gIGtleWJpbmQoLi4ua2V5czogQXJyYXk8c3RyaW5nPikge1xyXG5cclxuICAgIGlmICgha2V5cykge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdBdCBsZWFzdCBvbmUga2V5IG11c3QgYmUgcHJvdmlkZWQgdG8gY3JlYXRlIGEga2V5YmluZCcpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBrZXlPYmo6IEtleWJpbmRPYmplY3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSBrZXlPYmpba2V5XSA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qga2V5YmluZCA9IG5ldyBLZXliaW5kKGtleU9iaik7XHJcblxyXG4gICAgdGhpcy5rZXliaW5kcy5wdXNoKGtleWJpbmQpO1xyXG5cclxuICAgIHJldHVybiBrZXliaW5kO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB0byBzZWUgd2hpY2gga2V5IGNvbmRpdGlvbnMgYXJlIGN1cnJlbnRseSBiZWluZyBtZXQgYW5kIHJ1bnMgdGhlIGtleWJpbmQncyBhdHRhY2hlZCBjYWxsYmFjayBtZXRob2QuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIGN1cnJlbnQgdGltZXN0YW1wIHdoaWNoIGlzIHVzZWQgdG8gY2hlY2sgZm9yIGRlbGF5cyBhbmQgaXMgcGFzc2VkIHRvIHRoZSBrZXliaW5kJ3MgY2FsbGJhY2sgbWV0aG9kLlxyXG5cdCAqL1xyXG4gIGNoZWNrKHRpbWU6IG51bWJlcikge1xyXG5cclxuICAgIHRoaXMua2V5YmluZHMuZm9yRWFjaChvID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gT2JqZWN0LmVudHJpZXMoby5rZXlzKS5ldmVyeShhcnIgPT4gdGhpcy5wcmVzc2VkW2FyclswXV0gPT0gYXJyWzFdKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzVGltZSA9IHRpbWUgLSBvLl9sYXN0VXNlZCA+IG8uX2RlbGF5O1xyXG5cclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRpbWUgPCB0aW1lICsgdGhpcy5kaXNhYmxlZFRpbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgZWxzZSB0aGlzLnJlc2V0RGlzYWJsZWQoKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0FjdGl2ZSAmJiBpc1RpbWUpIG8ucnVuKHRpbWUpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGVzIHRoZSB1c2Ugb2YgYWxsIGtleWJpbmRzIHVudGlsIGVuYWJsZSBpcyBjYWxsZWQgb3IgdW50aWwgdGhlIHdhaXQgdGltZSBoYXMgZXhwaXJlZCBpZiBpdCBpcyBwcm92aWRlZC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aE9mVGltZT1JbmZpbml0eV0gQW4gb3B0aW9uYWwgYW1vdW50IG9mIHRpbWUgdG8gd2FpdCB1bnRpbCBrZXliaW5kcyBhcmUgYXV0b21hdGljYWxseSBlbmFibGVkIGFnYWluLiBcclxuICAgKi9cclxuICBkaXNhYmxlKGxlbmd0aE9mVGltZTogbnVtYmVyID0gSW5maW5pdHkpIHtcclxuXHJcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmRpc2FibGVkVGltZSA9ICBsZW5ndGhPZlRpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgbm8gZW5kIHRpbWUgaXMgcGFzc2VkIHdoZW4gY2FsbGluZyB0aGUgYGRpc2FibGVgIG1ldGhvZCwgdGhpcyBtZXRob2QgaGFzIHRvIGJlIGNhbGxlZCB0byBlbmFibGUgdGhlIHVzZSBvZlxyXG4gICAqIGtleWJpbmRzIGFnYWluLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuNSBcclxuICAgKi9cclxuICBlbmFibGUoKSB7XHJcblxyXG4gICAgdGhpcy5yZXNldERpc2FibGVkKCk7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBhIGtleSBpcyBwcmVzc2VkLCBhZGQgaXQgdG8gdGhlIGBwcmVzc2VkYCBPYmplY3QgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0IGFuZCBzZXQgaXQgdG8gYHRydWVgLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBUaGUgZXZlbnQgZ2VuZXJhdGVkIGZyb20gdGhlIGtleXByZXNzLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgIHRoaXMucHJlc3NlZFtldmVudC5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgcmV0dXJuO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gYSBrZXkgaXMgcmVsZWFzZWQsIHNldCBpdHMgcHJvcGVydHkgaW4gdGhlIGBwcmVzc2VkYCBvYmplY3QgdG8gYGZhbHNlYC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGdlbmVyYXRlZCBmcm9tIHRoZSBrZXlwcmVzcy5cclxuXHQgKi9cclxuICBwcml2YXRlIGtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgdGhpcy5wcmVzc2VkW2V2ZW50LmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgcmV0dXJuO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBib3RoIGRpc2FibGVkIHByb3BlcnRpZXMsIGRpc2FibGVkIHRvIGZhbHNlIGFuZCBkaXNhYmxlZCB0aW1lIHRvIDAgd2hlbiBrZXliaW5kcyBhcmUgZW5hYmxlZFxyXG4gICAqIGFnYWluIGFmdGVyIGJlaW5nIGRpc2FibGVkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuNVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNldERpc2FibGVkKCkge1xyXG5cclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgXHJcbiAgICB0aGlzLmRpc2FibGVkVGltZSA9IDA7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19