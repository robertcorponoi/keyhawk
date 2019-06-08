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

/// <reference path="./interfaces/KeybindObject.ts" />

/**
 * Keyhawk lets you focus on creating your game or application without
 * having to worry about key codes and keybinds.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.0
 */
var Keyhawk =
/*#__PURE__*/
function () {
  /**
   * The options for this instance of Keyhawk.
   * 
   * @since 1.0.0
   * 
   * @property {Options}
   * @readonly
   */

  /**
   * The keys that can be selected to bind to keybinds.
   * 
   * @since 0.1.0
   * @readonly
   */

  /**
   * All of the current keybinds being watched.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Keybind>}
   */

  /**
   * Binds to Deltaframe if used.
   * 
   * @since 1.0.0
   * 
   * @property {Deltaframe|null}
   */

  /**
   * Keeps track of what keys have been pressed.
   * 
   * @since 0.1.0
   * @readonly
   * 
   * @property {Object}
   */

  /**
   * @param {Object} [options]
   * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of
   * 																				 keybind uses.
   * 																				 If you would like to use your own game loop or even just rather use a simple
   *                                         debounce method, you can set this to false.
   */
  function Keyhawk() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Keyhawk);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "KEY", _key2["default"]);

    _defineProperty(this, "_keybinds", []);

    _defineProperty(this, "loop", null);

    _defineProperty(this, "pressed", {});

    this.options = new _Options["default"](options);
    this.setup();
  }
  /**
   * Returns all of the keybinds created.
   * 
   * @since 0.1.0
   * 
   * @returns {Array<Keybind>}
   */


  _createClass(Keyhawk, [{
    key: "keybind",

    /**
     * Creates a new keybind with the specified keys.
     * 
     * @since 0.1.0
     * 
     * @param {...string} keys One or more keys to attach to this keybind.
     * 
     * @returns {Keybind} Returns the newly created keybind.
     */
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
     * Checks to see which key conditions are currently being met and runs the
     * keybinds attached callback method.
     * 
     * @since 0.1.0
     */

  }, {
    key: "check",
    value: function check(time) {
      var _this = this;

      this._keybinds.forEach(function (o) {
        var isActive = Object.entries(o.keys).every(function (arr) {
          return _this.pressed[arr[0]] == arr[1];
        });
        var isTime = time - o._lastUsed > o._delay;
        if (isActive && isTime) o.run(time);
      });
    }
    /**
     * Setup the key event listeners and initialize Deltaframe if required.
     * 
     * @since 0.1.0
     * @private
     */

  }, {
    key: "setup",
    value: function setup() {
      var _this2 = this;

      window.addEventListener('keydown', function (ev) {
        return _this2.keydown(ev);
      });
      window.addEventListener('keyup', function (ev) {
        return _this2.keyup(ev);
      });

      if (this.options.useLoop) {
        this.loop = new _deltaframe["default"]({});
        this.loop.start(function (time) {
          return _this2.check(time);
        });
      }
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't
     * already exist and set it to `true`.
     * 
     * @since 0.1.0
     * @private
     * 
     * @property {KeyboardEvent} event The event generated from the keypress.
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
     * @private
     * 
     * @property {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "keyup",
    value: function keyup(event) {
      this.pressed[event.key.toLowerCase()] = false;
      event.preventDefault();
      return;
    }
  }, {
    key: "keybinds",
    get: function get() {
      return this._keybinds;
    }
  }]);

  return Keyhawk;
}();

exports["default"] = Keyhawk;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIk9wdGlvbnMiLCJzZXR1cCIsImtleXMiLCJjb25zb2xlIiwid2FybiIsImtleU9iaiIsImtleSIsImtleWJpbmQiLCJLZXliaW5kIiwiX2tleWJpbmRzIiwicHVzaCIsInRpbWUiLCJmb3JFYWNoIiwibyIsImlzQWN0aXZlIiwiT2JqZWN0IiwiZW50cmllcyIsImV2ZXJ5IiwiYXJyIiwicHJlc3NlZCIsImlzVGltZSIsIl9sYXN0VXNlZCIsIl9kZWxheSIsInJ1biIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsImtleWRvd24iLCJrZXl1cCIsInVzZUxvb3AiLCJsb29wIiwiRGVsdGFmcmFtZSIsInN0YXJ0IiwiY2hlY2siLCJldmVudCIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7OztJQVFxQkEsTzs7O0FBRXBCOzs7Ozs7Ozs7QUFVQTs7Ozs7OztBQVFBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7OztBQU9BLHFCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLGlDQXJDdkJDLGdCQXFDdUI7O0FBQUEsdUNBNUJFLEVBNEJGOztBQUFBLGtDQW5CRSxJQW1CRjs7QUFBQSxxQ0FUWCxFQVNXOztBQUVqQyxTQUFLRCxPQUFMLEdBQWUsSUFBSUUsbUJBQUosQ0FBWUYsT0FBWixDQUFmO0FBRUEsU0FBS0csS0FBTDtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7OEJBU2dDO0FBQUEsd0NBQXJCQyxJQUFxQjtBQUFyQkEsUUFBQUEsSUFBcUI7QUFBQTs7QUFFL0IsVUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFFVkMsUUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsdURBQWI7QUFFQTtBQUVBOztBQUVELFVBQU1DLE1BQXFCLEdBQUcsRUFBOUI7O0FBRUEsK0JBQWtCSCxJQUFsQjtBQUFLLFlBQU1JLEdBQUcsWUFBVDtBQUFtQkQsUUFBQUEsTUFBTSxDQUFDQyxHQUFELENBQU4sR0FBYyxJQUFkO0FBQXhCOztBQUVBLFVBQU1DLE9BQU8sR0FBRyxJQUFJQyxtQkFBSixDQUFZSCxNQUFaLENBQWhCOztBQUVBLFdBQUtJLFNBQUwsQ0FBZUMsSUFBZixDQUFvQkgsT0FBcEI7O0FBRUEsYUFBT0EsT0FBUDtBQUVBO0FBRUQ7Ozs7Ozs7OzswQkFNTUksSSxFQUFjO0FBQUE7O0FBRW5CLFdBQUtGLFNBQUwsQ0FBZUcsT0FBZixDQUF1QixVQUFBQyxDQUFDLEVBQUk7QUFFM0IsWUFBTUMsUUFBUSxHQUFHQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsQ0FBQyxDQUFDWCxJQUFqQixFQUF1QmUsS0FBdkIsQ0FBNkIsVUFBQUMsR0FBRztBQUFBLGlCQUFJLEtBQUksQ0FBQ0MsT0FBTCxDQUFhRCxHQUFHLENBQUMsQ0FBRCxDQUFoQixLQUF3QkEsR0FBRyxDQUFDLENBQUQsQ0FBL0I7QUFBQSxTQUFoQyxDQUFqQjtBQUVBLFlBQU1FLE1BQU0sR0FBR1QsSUFBSSxHQUFHRSxDQUFDLENBQUNRLFNBQVQsR0FBcUJSLENBQUMsQ0FBQ1MsTUFBdEM7QUFFQSxZQUFJUixRQUFRLElBQUlNLE1BQWhCLEVBQXdCUCxDQUFDLENBQUNVLEdBQUYsQ0FBTVosSUFBTjtBQUV4QixPQVJEO0FBVUE7QUFFRDs7Ozs7Ozs7OzRCQU1nQjtBQUFBOztBQUVmYSxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQUNDLEVBQUQ7QUFBQSxlQUFRLE1BQUksQ0FBQ0MsT0FBTCxDQUFhRCxFQUFiLENBQVI7QUFBQSxPQUFuQztBQUVBRixNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQUNDLEVBQUQ7QUFBQSxlQUFRLE1BQUksQ0FBQ0UsS0FBTCxDQUFXRixFQUFYLENBQVI7QUFBQSxPQUFqQzs7QUFFQSxVQUFJLEtBQUs1QixPQUFMLENBQWErQixPQUFqQixFQUEwQjtBQUV6QixhQUFLQyxJQUFMLEdBQVksSUFBSUMsc0JBQUosQ0FBZSxFQUFmLENBQVo7QUFFQSxhQUFLRCxJQUFMLENBQVVFLEtBQVYsQ0FBZ0IsVUFBQ3JCLElBQUQ7QUFBQSxpQkFBa0IsTUFBSSxDQUFDc0IsS0FBTCxDQUFXdEIsSUFBWCxDQUFsQjtBQUFBLFNBQWhCO0FBRUE7QUFFRDtBQUVEOzs7Ozs7Ozs7Ozs7NEJBU2dCdUIsSyxFQUFzQjtBQUVyQyxXQUFLZixPQUFMLENBQWFlLEtBQUssQ0FBQzVCLEdBQU4sQ0FBVTZCLFdBQVYsRUFBYixJQUF3QyxJQUF4QztBQUVBRCxNQUFBQSxLQUFLLENBQUNFLGNBQU47QUFFQTtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7OzBCQVFjRixLLEVBQXNCO0FBRW5DLFdBQUtmLE9BQUwsQ0FBYWUsS0FBSyxDQUFDNUIsR0FBTixDQUFVNkIsV0FBVixFQUFiLElBQXdDLEtBQXhDO0FBRUFELE1BQUFBLEtBQUssQ0FBQ0UsY0FBTjtBQUVBO0FBRUE7Ozt3QkFsSDhCO0FBRTlCLGFBQU8sS0FBSzNCLFNBQVo7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleSBmcm9tICcuL2tleS9rZXknO1xyXG5pbXBvcnQgS2V5YmluZCBmcm9tICcuL2tleS9rZXliaW5kJztcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5cclxuaW1wb3J0IERlbHRhZnJhbWUgZnJvbSAnZGVsdGFmcmFtZSc7XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbnRlcmZhY2VzL0tleWJpbmRPYmplY3QudHNcIiAvPlxyXG5cclxuLyoqXHJcbiAqIEtleWhhd2sgbGV0cyB5b3UgZm9jdXMgb24gY3JlYXRpbmcgeW91ciBnYW1lIG9yIGFwcGxpY2F0aW9uIHdpdGhvdXRcclxuICogaGF2aW5nIHRvIHdvcnJ5IGFib3V0IGtleSBjb2RlcyBhbmQga2V5YmluZHMuXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydCBDb3Jwb25vaSA8cm9iZXJ0Y29ycG9ub2lAZ21haWwuY29tPlxyXG4gKiBcclxuICogQHZlcnNpb24gMS4wLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWhhd2sge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgb3B0aW9ucyBmb3IgdGhpcyBpbnN0YW5jZSBvZiBLZXloYXdrLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBrZXlzIHRoYXQgY2FuIGJlIHNlbGVjdGVkIHRvIGJpbmQgdG8ga2V5YmluZHMuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICovXHJcblx0S0VZOiBhbnkgPSBLZXk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbCBvZiB0aGUgY3VycmVudCBrZXliaW5kcyBiZWluZyB3YXRjaGVkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7QXJyYXk8S2V5YmluZD59XHJcblx0ICovXHJcblx0cHJpdmF0ZSBfa2V5YmluZHM6IEFycmF5PEtleWJpbmQ+ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIHRvIERlbHRhZnJhbWUgaWYgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0RlbHRhZnJhbWV8bnVsbH1cclxuXHQgKi9cclxuXHRwcml2YXRlIGxvb3A6IChEZWx0YWZyYW1lIHwgbnVsbCkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBLZWVwcyB0cmFjayBvZiB3aGF0IGtleXMgaGF2ZSBiZWVuIHByZXNzZWQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPYmplY3R9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBwcmVzc2VkOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlTG9vcD10cnVlXSBCeSBkZWZhdWx0IEtleWhhd2sgd2lsbCB1c2UgdGhlIERlbHRhZnJhbWUgbW9kdWxlIHRvIGhhbmRsZSB0aGUgY2hlY2tpbmcgb2ZcclxuXHQgKiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IGtleWJpbmQgdXNlcy5cclxuXHQgKiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IElmIHlvdSB3b3VsZCBsaWtlIHRvIHVzZSB5b3VyIG93biBnYW1lIGxvb3Agb3IgZXZlbiBqdXN0IHJhdGhlciB1c2UgYSBzaW1wbGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVib3VuY2UgbWV0aG9kLCB5b3UgY2FuIHNldCB0aGlzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCA9IHt9KSB7XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXR1cCgpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYWxsIG9mIHRoZSBrZXliaW5kcyBjcmVhdGVkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxLZXliaW5kPn1cclxuXHQgKi9cclxuXHRnZXQga2V5YmluZHMoKTogQXJyYXk8S2V5YmluZD4ge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9rZXliaW5kcztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IGtleWJpbmQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleXMuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHsuLi5zdHJpbmd9IGtleXMgT25lIG9yIG1vcmUga2V5cyB0byBhdHRhY2ggdG8gdGhpcyBrZXliaW5kLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGtleWJpbmQuXHJcblx0ICovXHJcblx0a2V5YmluZCguLi5rZXlzOiBBcnJheTxzdHJpbmc+KSB7XHJcblxyXG5cdFx0aWYgKCFrZXlzKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oJ0F0IGxlYXN0IG9uZSBrZXkgbXVzdCBiZSBwcm92aWRlZCB0byBjcmVhdGUgYSBrZXliaW5kJyk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGtleU9iajogS2V5YmluZE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIGtleU9ialtrZXldID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdCBrZXliaW5kID0gbmV3IEtleWJpbmQoa2V5T2JqKTtcclxuXHJcblx0XHR0aGlzLl9rZXliaW5kcy5wdXNoKGtleWJpbmQpO1xyXG5cclxuXHRcdHJldHVybiBrZXliaW5kO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB0byBzZWUgd2hpY2gga2V5IGNvbmRpdGlvbnMgYXJlIGN1cnJlbnRseSBiZWluZyBtZXQgYW5kIHJ1bnMgdGhlXHJcblx0ICoga2V5YmluZHMgYXR0YWNoZWQgY2FsbGJhY2sgbWV0aG9kLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqL1xyXG5cdGNoZWNrKHRpbWU6IG51bWJlcikge1xyXG5cclxuXHRcdHRoaXMuX2tleWJpbmRzLmZvckVhY2gobyA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBpc0FjdGl2ZSA9IE9iamVjdC5lbnRyaWVzKG8ua2V5cykuZXZlcnkoYXJyID0+IHRoaXMucHJlc3NlZFthcnJbMF1dID09IGFyclsxXSk7XHJcblxyXG5cdFx0XHRjb25zdCBpc1RpbWUgPSB0aW1lIC0gby5fbGFzdFVzZWQgPiBvLl9kZWxheTtcclxuXHJcblx0XHRcdGlmIChpc0FjdGl2ZSAmJiBpc1RpbWUpIG8ucnVuKHRpbWUpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwIHRoZSBrZXkgZXZlbnQgbGlzdGVuZXJzIGFuZCBpbml0aWFsaXplIERlbHRhZnJhbWUgaWYgcmVxdWlyZWQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHNldHVwKCkge1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2KSA9PiB0aGlzLmtleWRvd24oZXYpKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXYpID0+IHRoaXMua2V5dXAoZXYpKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnVzZUxvb3ApIHtcclxuXHJcblx0XHRcdHRoaXMubG9vcCA9IG5ldyBEZWx0YWZyYW1lKHt9KTtcclxuXHJcblx0XHRcdHRoaXMubG9vcC5zdGFydCgodGltZTogbnVtYmVyKSA9PiB0aGlzLmNoZWNrKHRpbWUpKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBhIGtleSBpcyBwcmVzc2VkLCBhZGQgaXQgdG8gdGhlIGBwcmVzc2VkYCBPYmplY3QgaWYgaXQgZG9lc24ndFxyXG5cdCAqIGFscmVhZHkgZXhpc3QgYW5kIHNldCBpdCB0byBgdHJ1ZWAuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0tleWJvYXJkRXZlbnR9IGV2ZW50IFRoZSBldmVudCBnZW5lcmF0ZWQgZnJvbSB0aGUga2V5cHJlc3MuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdFx0dGhpcy5wcmVzc2VkW2V2ZW50LmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBhIGtleSBpcyByZWxlYXNlZCwgc2V0IGl0cyBwcm9wZXJ0eSBpbiB0aGUgYHByZXNzZWRgIG9iamVjdCB0byBgZmFsc2VgLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtLZXlib2FyZEV2ZW50fSBldmVudCBUaGUgZXZlbnQgZ2VuZXJhdGVkIGZyb20gdGhlIGtleXByZXNzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUga2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcblx0XHR0aGlzLnByZXNzZWRbZXZlbnQua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIl19