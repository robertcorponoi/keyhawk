'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A keybind represents one key or a combination of keys that perform an action.
 * 
 * Keybinds can have an optional callback that is run during the `check` method either automatically 
 * or in your own game loop.
 * 
 * Keybinds can also have a delay to ensure that a certain amount of time has passed between presses.
 */
var Keybind =
/*#__PURE__*/
function () {
  /**
   * The keys that are assigned to this keybind.
    * 
   * @private
   * 
   * @property {KeybindObject}
   */

  /**
   * The callback method to run when this keybind is used.
    * 
    * @private
   * 
   * @property {Function}
   * 
   * @default this.noop
   */

  /**
   * A delay to set between uses of this keybind in case it shouldn't
   * be able to be spammed.
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * A delay to be set before the keybind can even be used at all.
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The last time that this keybind was used.
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * @param {KeybindObject} keys The keys to bind to this keybind.
   */
  function Keybind(keys) {
    _classCallCheck(this, Keybind);

    _defineProperty(this, "_keys", void 0);

    _defineProperty(this, "_action", this._noop);

    _defineProperty(this, "_delay", 0);

    _defineProperty(this, "_initialDelay", 0);

    _defineProperty(this, "_lastUsed", 0);

    this._keys = keys;
  }
  /**
   * Gets the keys that are a part of this keybind.
   * 
   * @returns {KeybindObject}
   */


  _createClass(Keybind, [{
    key: "delay",

    /**
     * Sets the delay between keybind uses.
     * 
     * @param {number} ms The time in milliseconds to delay use.
     * 
     * @returns {Keybind} Returns this for chaining.
     */
    value: function delay(ms) {
      this._delay = ms;
      this._lastUsed = -this._delay + 1;
      return this;
    }
    /**
     * Sets the initial delay before the keybind can be used for the first time.
     * 
     * @param {number} ms The time in milliseconds before the keybind can be used.
     * 
     * @returns {Keybind} Retursn this for chaining.
     */

  }, {
    key: "initialDelay",
    value: function initialDelay(ms) {
      this._initialDelay = ms;
      return this;
    }
    /**
     * Sets the callback method sthat will be run when this keybind is active.
     * 
     * @param {Function} fn The callback method to use.
     * 
     * @returns {Keybind} Returns this for chaining.
     */

  }, {
    key: "action",
    value: function action(fn) {
      this._action = fn;
      return this;
    }
    /**
     * Run the action associated with this keybind.
     * 
     * @param {number} time The time that the keybind was used.
     */

  }, {
    key: "run",
    value: function run(time) {
      this._action();

      this._lastUsed = time;
    }
    /**
     * An empty method to use as the default action for the keybind in case no action is added.
     * 
     * @private
     */

  }, {
    key: "_noop",
    value: function _noop() {}
  }, {
    key: "keys",
    get: function get() {
      return this._keys;
    }
    /**
     * Gets the last time that this keybind was used.
     * 
     * @returns {number}
     */

  }, {
    key: "lastUsed",
    get: function get() {
      return this._lastUsed;
    }
  }]);

  return Keybind;
}();

exports["default"] = Keybind;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkva2V5YmluZC50cyJdLCJuYW1lcyI6WyJLZXliaW5kIiwia2V5cyIsIl9ub29wIiwiX2tleXMiLCJtcyIsIl9kZWxheSIsIl9sYXN0VXNlZCIsIl9pbml0aWFsRGVsYXkiLCJmbiIsIl9hY3Rpb24iLCJ0aW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7O0lBUXFCQSxPOzs7QUFFcEI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUM7Ozs7Ozs7O0FBU0Q7Ozs7Ozs7O0FBU0E7OztBQUdBLG1CQUFZQyxJQUFaLEVBQWlDO0FBQUE7O0FBQUE7O0FBQUEscUNBakNMLEtBQUtDLEtBaUNBOztBQUFBLG9DQXZCZixDQXVCZTs7QUFBQSwyQ0FkUixDQWNROztBQUFBLHVDQUxiLENBS2E7O0FBRWhDLFNBQUtDLEtBQUwsR0FBYUYsSUFBYjtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7QUFjQTs7Ozs7OzswQkFPTUcsRSxFQUFxQjtBQUUxQixXQUFLQyxNQUFMLEdBQWNELEVBQWQ7QUFFQSxXQUFLRSxTQUFMLEdBQWlCLENBQUMsS0FBS0QsTUFBTixHQUFlLENBQWhDO0FBRUEsYUFBTyxJQUFQO0FBRUM7QUFFRDs7Ozs7Ozs7OztpQ0FPYUQsRSxFQUFxQjtBQUVoQyxXQUFLRyxhQUFMLEdBQXFCSCxFQUFyQjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUY7Ozs7Ozs7Ozs7MkJBT09JLEUsRUFBdUI7QUFFN0IsV0FBS0MsT0FBTCxHQUFlRCxFQUFmO0FBRUEsYUFBTyxJQUFQO0FBRUE7QUFFRDs7Ozs7Ozs7d0JBS0lFLEksRUFBYztBQUVqQixXQUFLRCxPQUFMOztBQUVBLFdBQUtILFNBQUwsR0FBaUJJLElBQWpCO0FBRUE7QUFFRDs7Ozs7Ozs7NEJBS2dCLENBQUc7Ozt3QkExRU87QUFBRSxhQUFPLEtBQUtQLEtBQVo7QUFBb0I7QUFFaEQ7Ozs7Ozs7O3dCQUt1QjtBQUFFLGFBQU8sS0FBS0csU0FBWjtBQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleWJpbmRPYmplY3QgZnJvbSAnLi4vaW50ZXJmYWNlcy9LZXliaW5kT2JqZWN0JztcclxuXHJcbi8qKlxyXG4gKiBBIGtleWJpbmQgcmVwcmVzZW50cyBvbmUga2V5IG9yIGEgY29tYmluYXRpb24gb2Yga2V5cyB0aGF0IHBlcmZvcm0gYW4gYWN0aW9uLlxyXG4gKiBcclxuICogS2V5YmluZHMgY2FuIGhhdmUgYW4gb3B0aW9uYWwgY2FsbGJhY2sgdGhhdCBpcyBydW4gZHVyaW5nIHRoZSBgY2hlY2tgIG1ldGhvZCBlaXRoZXIgYXV0b21hdGljYWxseSBcclxuICogb3IgaW4geW91ciBvd24gZ2FtZSBsb29wLlxyXG4gKiBcclxuICogS2V5YmluZHMgY2FuIGFsc28gaGF2ZSBhIGRlbGF5IHRvIGVuc3VyZSB0aGF0IGEgY2VydGFpbiBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIGJldHdlZW4gcHJlc3Nlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJpbmQge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUga2V5cyB0aGF0IGFyZSBhc3NpZ25lZCB0byB0aGlzIGtleWJpbmQuXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBfa2V5czogS2V5YmluZE9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNhbGxiYWNrIG1ldGhvZCB0byBydW4gd2hlbiB0aGlzIGtleWJpbmQgaXMgdXNlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdGhpcy5ub29wXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfYWN0aW9uOiBGdW5jdGlvbiA9IHRoaXMuX25vb3A7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZGVsYXkgdG8gc2V0IGJldHdlZW4gdXNlcyBvZiB0aGlzIGtleWJpbmQgaW4gY2FzZSBpdCBzaG91bGRuJ3RcclxuXHQgKiBiZSBhYmxlIHRvIGJlIHNwYW1tZWQuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG4gIF9kZWxheTogbnVtYmVyID0gMDtcclxuICBcclxuICAvKipcclxuICAgKiBBIGRlbGF5IHRvIGJlIHNldCBiZWZvcmUgdGhlIGtleWJpbmQgY2FuIGV2ZW4gYmUgdXNlZCBhdCBhbGwuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgMFxyXG4gICAqL1xyXG4gIF9pbml0aWFsRGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsYXN0IHRpbWUgdGhhdCB0aGlzIGtleWJpbmQgd2FzIHVzZWQuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdF9sYXN0VXNlZDogbnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtLZXliaW5kT2JqZWN0fSBrZXlzIFRoZSBrZXlzIHRvIGJpbmQgdG8gdGhpcyBrZXliaW5kLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGtleXM6IEtleWJpbmRPYmplY3QpIHtcclxuXHJcblx0XHR0aGlzLl9rZXlzID0ga2V5cztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBrZXlzIHRoYXQgYXJlIGEgcGFydCBvZiB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0Z2V0IGtleXMoKTogS2V5YmluZE9iamVjdCB7IHJldHVybiB0aGlzLl9rZXlzOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGxhc3QgdGltZSB0aGF0IHRoaXMga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCBsYXN0VXNlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGFzdFVzZWQ7IH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiBrZXliaW5kIHVzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyB0byBkZWxheSB1c2UuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcblx0ZGVsYXkobXM6IG51bWJlcik6IEtleWJpbmQge1xyXG5cclxuXHRcdHRoaXMuX2RlbGF5ID0gbXM7XHJcblxyXG5cdFx0dGhpcy5fbGFzdFVzZWQgPSAtdGhpcy5fZGVsYXkgKyAxO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaW5pdGlhbCBkZWxheSBiZWZvcmUgdGhlIGtleWJpbmQgY2FuIGJlIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtcyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSBrZXliaW5kIGNhbiBiZSB1c2VkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cnNuIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGluaXRpYWxEZWxheShtczogbnVtYmVyKTogS2V5YmluZCB7XHJcblxyXG4gICAgdGhpcy5faW5pdGlhbERlbGF5ID0gbXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY2FsbGJhY2sgbWV0aG9kIHN0aGF0IHdpbGwgYmUgcnVuIHdoZW4gdGhpcyBrZXliaW5kIGlzIGFjdGl2ZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRvIHVzZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuXHQgKi9cclxuXHRhY3Rpb24oZm46IEZ1bmN0aW9uKTogS2V5YmluZCB7XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uID0gZm47XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVuIHRoZSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoaXMga2V5YmluZC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSB0aGF0IHRoZSBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqL1xyXG5cdHJ1bih0aW1lOiBudW1iZXIpIHtcclxuXHJcblx0XHR0aGlzLl9hY3Rpb24oKTtcclxuXHJcblx0XHR0aGlzLl9sYXN0VXNlZCA9IHRpbWU7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gZW1wdHkgbWV0aG9kIHRvIHVzZSBhcyB0aGUgZGVmYXVsdCBhY3Rpb24gZm9yIHRoZSBrZXliaW5kIGluIGNhc2Ugbm8gYWN0aW9uIGlzIGFkZGVkLlxyXG5cdCAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfbm9vcCgpIHsgfVxyXG5cclxufSJdfQ==