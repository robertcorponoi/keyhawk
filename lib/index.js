'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _key2 = _interopRequireDefault(require("./key/key"));

var _keybind = _interopRequireDefault(require("./key/keybind"));

var _Options = _interopRequireDefault(require("./options/Options"));

var _deltaframe = _interopRequireDefault(require("deltaframe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    _defineProperty(this, "KEY", _key2.default);

    _defineProperty(this, "_keybinds", []);

    _defineProperty(this, "loop", null);

    _defineProperty(this, "pressed", {});

    this.options = new _Options.default(options);
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

      for (var _i = 0; _i < keys.length; _i++) {
        var key = keys[_i];
        keyObj[key] = true;
      }

      var keybind = new _keybind.default(keyObj);

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
        this.loop = new _deltaframe.default({});
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

exports.default = Keyhawk;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJLZXloYXdrIiwib3B0aW9ucyIsIktleSIsIk9wdGlvbnMiLCJzZXR1cCIsImtleXMiLCJjb25zb2xlIiwid2FybiIsImtleU9iaiIsImtleSIsImtleWJpbmQiLCJLZXliaW5kIiwiX2tleWJpbmRzIiwicHVzaCIsInRpbWUiLCJmb3JFYWNoIiwibyIsImlzQWN0aXZlIiwiT2JqZWN0IiwiZW50cmllcyIsImV2ZXJ5IiwiYXJyIiwicHJlc3NlZCIsImlzVGltZSIsIl9sYXN0VXNlZCIsIl9kZWxheSIsInJ1biIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsImtleWRvd24iLCJrZXl1cCIsInVzZUxvb3AiLCJsb29wIiwiRGVsdGFmcmFtZSIsInN0YXJ0IiwiY2hlY2siLCJldmVudCIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7OztJQVFxQkEsTzs7O0FBRXBCOzs7Ozs7Ozs7QUFVQTs7Ozs7OztBQVFBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7OztBQU9BLHFCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLGlDQXJDdkJDLGFBcUN1Qjs7QUFBQSx1Q0E1QkUsRUE0QkY7O0FBQUEsa0NBbkJFLElBbUJGOztBQUFBLHFDQVRYLEVBU1c7O0FBRWpDLFNBQUtELE9BQUwsR0FBZSxJQUFJRSxnQkFBSixDQUFZRixPQUFaLENBQWY7QUFFQSxTQUFLRyxLQUFMO0FBRUE7QUFFRDs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs4QkFTZ0M7QUFBQSx3Q0FBckJDLElBQXFCO0FBQXJCQSxRQUFBQSxJQUFxQjtBQUFBOztBQUUvQixVQUFJLENBQUNBLElBQUwsRUFBVztBQUVWQyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSx1REFBYjtBQUVBO0FBRUE7O0FBRUQsVUFBTUMsTUFBcUIsR0FBRyxFQUE5Qjs7QUFFQSw0QkFBa0JILElBQWxCO0FBQUssWUFBTUksR0FBRyxHQUFJSixJQUFKLElBQVQ7QUFBbUJHLFFBQUFBLE1BQU0sQ0FBQ0MsR0FBRCxDQUFOLEdBQWMsSUFBZDtBQUF4Qjs7QUFFQSxVQUFNQyxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosQ0FBWUgsTUFBWixDQUFoQjs7QUFFQSxXQUFLSSxTQUFMLENBQWVDLElBQWYsQ0FBb0JILE9BQXBCOztBQUVBLGFBQU9BLE9BQVA7QUFFQTtBQUVEOzs7Ozs7Ozs7MEJBTU1JLEksRUFBYztBQUFBOztBQUVuQixXQUFLRixTQUFMLENBQWVHLE9BQWYsQ0FBdUIsVUFBQUMsQ0FBQyxFQUFJO0FBRTNCLFlBQU1DLFFBQVEsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVILENBQUMsQ0FBQ1gsSUFBakIsRUFBdUJlLEtBQXZCLENBQTZCLFVBQUFDLEdBQUc7QUFBQSxpQkFBSSxLQUFJLENBQUNDLE9BQUwsQ0FBYUQsR0FBRyxDQUFDLENBQUQsQ0FBaEIsS0FBd0JBLEdBQUcsQ0FBQyxDQUFELENBQS9CO0FBQUEsU0FBaEMsQ0FBakI7QUFFQSxZQUFNRSxNQUFNLEdBQUdULElBQUksR0FBR0UsQ0FBQyxDQUFDUSxTQUFULEdBQXFCUixDQUFDLENBQUNTLE1BQXRDO0FBRUEsWUFBSVIsUUFBUSxJQUFJTSxNQUFoQixFQUF3QlAsQ0FBQyxDQUFDVSxHQUFGLENBQU1aLElBQU47QUFFeEIsT0FSRDtBQVVBO0FBRUQ7Ozs7Ozs7Ozs0QkFNZ0I7QUFBQTs7QUFFZmEsTUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxVQUFDQyxFQUFEO0FBQUEsZUFBUSxNQUFJLENBQUNDLE9BQUwsQ0FBYUQsRUFBYixDQUFSO0FBQUEsT0FBbkM7QUFFQUYsTUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDQyxFQUFEO0FBQUEsZUFBUSxNQUFJLENBQUNFLEtBQUwsQ0FBV0YsRUFBWCxDQUFSO0FBQUEsT0FBakM7O0FBRUEsVUFBSSxLQUFLNUIsT0FBTCxDQUFhK0IsT0FBakIsRUFBMEI7QUFFekIsYUFBS0MsSUFBTCxHQUFZLElBQUlDLG1CQUFKLENBQWUsRUFBZixDQUFaO0FBRUEsYUFBS0QsSUFBTCxDQUFVRSxLQUFWLENBQWdCLFVBQUNyQixJQUFEO0FBQUEsaUJBQWtCLE1BQUksQ0FBQ3NCLEtBQUwsQ0FBV3RCLElBQVgsQ0FBbEI7QUFBQSxTQUFoQjtBQUVBO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7OzRCQVNnQnVCLEssRUFBc0I7QUFFckMsV0FBS2YsT0FBTCxDQUFhZSxLQUFLLENBQUM1QixHQUFOLENBQVU2QixXQUFWLEVBQWIsSUFBd0MsSUFBeEM7QUFFQUQsTUFBQUEsS0FBSyxDQUFDRSxjQUFOO0FBRUE7QUFFQTtBQUVEOzs7Ozs7Ozs7OzswQkFRY0YsSyxFQUFzQjtBQUVuQyxXQUFLZixPQUFMLENBQWFlLEtBQUssQ0FBQzVCLEdBQU4sQ0FBVTZCLFdBQVYsRUFBYixJQUF3QyxLQUF4QztBQUVBRCxNQUFBQSxLQUFLLENBQUNFLGNBQU47QUFFQTtBQUVBOzs7d0JBbEg4QjtBQUU5QixhQUFPLEtBQUszQixTQUFaO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBLZXkgZnJvbSAnLi9rZXkva2V5JztcclxuaW1wb3J0IEtleWJpbmQgZnJvbSAnLi9rZXkva2V5YmluZCc7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuXHJcbmltcG9ydCBEZWx0YWZyYW1lIGZyb20gJ2RlbHRhZnJhbWUnO1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9LZXliaW5kT2JqZWN0LnRzXCIgLz5cclxuXHJcbi8qKlxyXG4gKiBLZXloYXdrIGxldHMgeW91IGZvY3VzIG9uIGNyZWF0aW5nIHlvdXIgZ2FtZSBvciBhcHBsaWNhdGlvbiB3aXRob3V0XHJcbiAqIGhhdmluZyB0byB3b3JyeSBhYm91dCBrZXkgY29kZXMgYW5kIGtleWJpbmRzLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnQgQ29ycG9ub2kgPHJvYmVydGNvcnBvbm9pQGdtYWlsLmNvbT5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXloYXdrIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgS2V5aGF3ay5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge09wdGlvbnN9XHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUga2V5cyB0aGF0IGNhbiBiZSBzZWxlY3RlZCB0byBiaW5kIHRvIGtleWJpbmRzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqL1xyXG5cdEtFWTogYW55ID0gS2V5O1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgb2YgdGhlIGN1cnJlbnQga2V5YmluZHMgYmVpbmcgd2F0Y2hlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0FycmF5PEtleWJpbmQ+fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2tleWJpbmRzOiBBcnJheTxLZXliaW5kPiA9IFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kcyB0byBEZWx0YWZyYW1lIGlmIHVzZWQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtEZWx0YWZyYW1lfG51bGx9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBsb29wOiAoRGVsdGFmcmFtZSB8IG51bGwpID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogS2VlcHMgdHJhY2sgb2Ygd2hhdCBrZXlzIGhhdmUgYmVlbiBwcmVzc2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcHJlc3NlZDogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUxvb3A9dHJ1ZV0gQnkgZGVmYXVsdCBLZXloYXdrIHdpbGwgdXNlIHRoZSBEZWx0YWZyYW1lIG1vZHVsZSB0byBoYW5kbGUgdGhlIGNoZWNraW5nIG9mXHJcblx0ICogXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCBrZXliaW5kIHVzZXMuXHJcblx0ICogXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgeW91ciBvd24gZ2FtZSBsb29wIG9yIGV2ZW4ganVzdCByYXRoZXIgdXNlIGEgc2ltcGxlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYm91bmNlIG1ldGhvZCwgeW91IGNhbiBzZXQgdGhpcyB0byBmYWxzZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG5cclxuXHRcdHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2V0dXAoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFsbCBvZiB0aGUga2V5YmluZHMgY3JlYXRlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8S2V5YmluZD59XHJcblx0ICovXHJcblx0Z2V0IGtleWJpbmRzKCk6IEFycmF5PEtleWJpbmQ+IHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fa2V5YmluZHM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBrZXliaW5kIHdpdGggdGhlIHNwZWNpZmllZCBrZXlzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7Li4uc3RyaW5nfSBrZXlzIE9uZSBvciBtb3JlIGtleXMgdG8gYXR0YWNoIHRvIHRoaXMga2V5YmluZC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCBrZXliaW5kLlxyXG5cdCAqL1xyXG5cdGtleWJpbmQoLi4ua2V5czogQXJyYXk8c3RyaW5nPikge1xyXG5cclxuXHRcdGlmICgha2V5cykge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCdBdCBsZWFzdCBvbmUga2V5IG11c3QgYmUgcHJvdmlkZWQgdG8gY3JlYXRlIGEga2V5YmluZCcpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBrZXlPYmo6IEtleWJpbmRPYmplY3QgPSB7fTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSBrZXlPYmpba2V5XSA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3Qga2V5YmluZCA9IG5ldyBLZXliaW5kKGtleU9iaik7XHJcblxyXG5cdFx0dGhpcy5fa2V5YmluZHMucHVzaChrZXliaW5kKTtcclxuXHJcblx0XHRyZXR1cm4ga2V5YmluZDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgdG8gc2VlIHdoaWNoIGtleSBjb25kaXRpb25zIGFyZSBjdXJyZW50bHkgYmVpbmcgbWV0IGFuZCBydW5zIHRoZVxyXG5cdCAqIGtleWJpbmRzIGF0dGFjaGVkIGNhbGxiYWNrIG1ldGhvZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKi9cclxuXHRjaGVjayh0aW1lOiBudW1iZXIpIHtcclxuXHJcblx0XHR0aGlzLl9rZXliaW5kcy5mb3JFYWNoKG8gPT4ge1xyXG5cclxuXHRcdFx0Y29uc3QgaXNBY3RpdmUgPSBPYmplY3QuZW50cmllcyhvLmtleXMpLmV2ZXJ5KGFyciA9PiB0aGlzLnByZXNzZWRbYXJyWzBdXSA9PSBhcnJbMV0pO1xyXG5cclxuXHRcdFx0Y29uc3QgaXNUaW1lID0gdGltZSAtIG8uX2xhc3RVc2VkID4gby5fZGVsYXk7XHJcblxyXG5cdFx0XHRpZiAoaXNBY3RpdmUgJiYgaXNUaW1lKSBvLnJ1bih0aW1lKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cCB0aGUga2V5IGV2ZW50IGxpc3RlbmVycyBhbmQgaW5pdGlhbGl6ZSBEZWx0YWZyYW1lIGlmIHJlcXVpcmVkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzZXR1cCgpIHtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldikgPT4gdGhpcy5rZXlkb3duKGV2KSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2KSA9PiB0aGlzLmtleXVwKGV2KSk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy51c2VMb29wKSB7XHJcblxyXG5cdFx0XHR0aGlzLmxvb3AgPSBuZXcgRGVsdGFmcmFtZSh7fSk7XHJcblxyXG5cdFx0XHR0aGlzLmxvb3Auc3RhcnQoKHRpbWU6IG51bWJlcikgPT4gdGhpcy5jaGVjayh0aW1lKSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gYSBrZXkgaXMgcHJlc3NlZCwgYWRkIGl0IHRvIHRoZSBgcHJlc3NlZGAgT2JqZWN0IGlmIGl0IGRvZXNuJ3RcclxuXHQgKiBhbHJlYWR5IGV4aXN0IGFuZCBzZXQgaXQgdG8gYHRydWVgLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtLZXlib2FyZEV2ZW50fSBldmVudCBUaGUgZXZlbnQgZ2VuZXJhdGVkIGZyb20gdGhlIGtleXByZXNzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuXHRcdHRoaXMucHJlc3NlZFtldmVudC5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xyXG5cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gYSBrZXkgaXMgcmVsZWFzZWQsIHNldCBpdHMgcHJvcGVydHkgaW4gdGhlIGBwcmVzc2VkYCBvYmplY3QgdG8gYGZhbHNlYC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGdlbmVyYXRlZCBmcm9tIHRoZSBrZXlwcmVzcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIGtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdFx0dGhpcy5wcmVzc2VkW2V2ZW50LmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xyXG5cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiJdfQ==