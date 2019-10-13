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

    _defineProperty(this, "_action", this.noop);

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
    key: "noop",
    value: function noop() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkva2V5YmluZC50cyJdLCJuYW1lcyI6WyJLZXliaW5kIiwia2V5cyIsIm5vb3AiLCJfa2V5cyIsIm1zIiwiX2RlbGF5IiwiX2xhc3RVc2VkIiwiX2luaXRpYWxEZWxheSIsImZuIiwiX2FjdGlvbiIsInRpbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7Ozs7Ozs7SUFRcUJBLE87OztBQUVwQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFVQzs7Ozs7Ozs7QUFTRDs7Ozs7Ozs7QUFTQTs7O0FBR0EsbUJBQVlDLElBQVosRUFBaUM7QUFBQTs7QUFBQTs7QUFBQSxxQ0FqQ0wsS0FBS0MsSUFpQ0E7O0FBQUEsb0NBdkJmLENBdUJlOztBQUFBLDJDQWRSLENBY1E7O0FBQUEsdUNBTGIsQ0FLYTs7QUFFaEMsU0FBS0MsS0FBTCxHQUFhRixJQUFiO0FBRUE7QUFFRDs7Ozs7Ozs7OztBQXNCQTs7Ozs7OzswQkFPTUcsRSxFQUFxQjtBQUUxQixXQUFLQyxNQUFMLEdBQWNELEVBQWQ7QUFFQSxXQUFLRSxTQUFMLEdBQWlCLENBQUMsS0FBS0QsTUFBTixHQUFlLENBQWhDO0FBRUEsYUFBTyxJQUFQO0FBRUM7QUFFRDs7Ozs7Ozs7OztpQ0FPYUQsRSxFQUFxQjtBQUVoQyxXQUFLRyxhQUFMLEdBQXFCSCxFQUFyQjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUY7Ozs7Ozs7Ozs7MkJBT09JLEUsRUFBdUI7QUFFN0IsV0FBS0MsT0FBTCxHQUFlRCxFQUFmO0FBRUEsYUFBTyxJQUFQO0FBRUE7QUFFRDs7Ozs7Ozs7d0JBS0lFLEksRUFBYztBQUVqQixXQUFLRCxPQUFMOztBQUVBLFdBQUtILFNBQUwsR0FBaUJJLElBQWpCO0FBRUE7QUFFRDs7Ozs7Ozs7MkJBS2UsQ0FBRzs7O3dCQWxGUTtBQUV6QixhQUFPLEtBQUtQLEtBQVo7QUFFQTtBQUVEOzs7Ozs7Ozt3QkFLdUI7QUFFdEIsYUFBTyxLQUFLRyxTQUFaO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBLZXliaW5kT2JqZWN0IGZyb20gJy4uL2ludGVyZmFjZXMvS2V5YmluZE9iamVjdCc7XHJcblxyXG4vKipcclxuICogQSBrZXliaW5kIHJlcHJlc2VudHMgb25lIGtleSBvciBhIGNvbWJpbmF0aW9uIG9mIGtleXMgdGhhdCBwZXJmb3JtIGFuIGFjdGlvbi5cclxuICogXHJcbiAqIEtleWJpbmRzIGNhbiBoYXZlIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRoYXQgaXMgcnVuIGR1cmluZyB0aGUgYGNoZWNrYCBtZXRob2QgZWl0aGVyIGF1dG9tYXRpY2FsbHkgXHJcbiAqIG9yIGluIHlvdXIgb3duIGdhbWUgbG9vcC5cclxuICogXHJcbiAqIEtleWJpbmRzIGNhbiBhbHNvIGhhdmUgYSBkZWxheSB0byBlbnN1cmUgdGhhdCBhIGNlcnRhaW4gYW1vdW50IG9mIHRpbWUgaGFzIHBhc3NlZCBiZXR3ZWVuIHByZXNzZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXliaW5kIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGtleXMgdGhhdCBhcmUgYXNzaWduZWQgdG8gdGhpcyBrZXliaW5kLlxyXG4gICAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtLZXliaW5kT2JqZWN0fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2tleXM6IEtleWJpbmRPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjYWxsYmFjayBtZXRob2QgdG8gcnVuIHdoZW4gdGhpcyBrZXliaW5kIGlzIHVzZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IHRoaXMubm9vcFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2FjdGlvbjogRnVuY3Rpb24gPSB0aGlzLm5vb3A7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZGVsYXkgdG8gc2V0IGJldHdlZW4gdXNlcyBvZiB0aGlzIGtleWJpbmQgaW4gY2FzZSBpdCBzaG91bGRuJ3RcclxuXHQgKiBiZSBhYmxlIHRvIGJlIHNwYW1tZWQuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG4gIF9kZWxheTogbnVtYmVyID0gMDtcclxuICBcclxuICAvKipcclxuICAgKiBBIGRlbGF5IHRvIGJlIHNldCBiZWZvcmUgdGhlIGtleWJpbmQgY2FuIGV2ZW4gYmUgdXNlZCBhdCBhbGwuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgMFxyXG4gICAqL1xyXG4gIF9pbml0aWFsRGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsYXN0IHRpbWUgdGhhdCB0aGlzIGtleWJpbmQgd2FzIHVzZWQuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdF9sYXN0VXNlZDogbnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtLZXliaW5kT2JqZWN0fSBrZXlzIFRoZSBrZXlzIHRvIGJpbmQgdG8gdGhpcyBrZXliaW5kLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGtleXM6IEtleWJpbmRPYmplY3QpIHtcclxuXHJcblx0XHR0aGlzLl9rZXlzID0ga2V5cztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBrZXlzIHRoYXQgYXJlIGEgcGFydCBvZiB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0Z2V0IGtleXMoKTogS2V5YmluZE9iamVjdCB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2tleXM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgbGFzdCB0aW1lIHRoYXQgdGhpcyBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0Z2V0IGxhc3RVc2VkKCk6IG51bWJlciB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2xhc3RVc2VkO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4ga2V5YmluZCB1c2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtcyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdXNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG5cdGRlbGF5KG1zOiBudW1iZXIpOiBLZXliaW5kIHtcclxuXHJcblx0XHR0aGlzLl9kZWxheSA9IG1zO1xyXG5cclxuXHRcdHRoaXMuX2xhc3RVc2VkID0gLXRoaXMuX2RlbGF5ICsgMTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGluaXRpYWwgZGVsYXkgYmVmb3JlIHRoZSBrZXliaW5kIGNhbiBiZSB1c2VkIGZvciB0aGUgZmlyc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbXMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUga2V5YmluZCBjYW4gYmUgdXNlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJzbiB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBpbml0aWFsRGVsYXkobXM6IG51bWJlcik6IEtleWJpbmQge1xyXG5cclxuICAgIHRoaXMuX2luaXRpYWxEZWxheSA9IG1zO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGNhbGxiYWNrIG1ldGhvZCBzdGhhdCB3aWxsIGJlIHJ1biB3aGVuIHRoaXMga2V5YmluZCBpcyBhY3RpdmUuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIG1ldGhvZCB0byB1c2UuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcblx0YWN0aW9uKGZuOiBGdW5jdGlvbik6IEtleWJpbmQge1xyXG5cclxuXHRcdHRoaXMuX2FjdGlvbiA9IGZuO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJ1biB0aGUgYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgdGhhdCB0aGUga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKi9cclxuXHRydW4odGltZTogbnVtYmVyKSB7XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uKCk7XHJcblxyXG5cdFx0dGhpcy5fbGFzdFVzZWQgPSB0aW1lO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGVtcHR5IG1ldGhvZCB0byB1c2UgYXMgdGhlIGRlZmF1bHQgYWN0aW9uIGZvciB0aGUga2V5YmluZCBpbiBjYXNlIG5vIGFjdGlvbiBpcyBhZGRlZC5cclxuXHQgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm9vcCgpIHsgfVxyXG5cclxufSJdfQ==