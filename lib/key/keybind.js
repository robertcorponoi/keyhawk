'use strict'; /// <reference path="../interfaces/KeybindObject.ts" />

/**
 * A keybind represents one key or a combination of keys that perform an action.
 * 
 * Keybinds can have an optional callback that is run during the `check` method
 * either automatically or in your own game loop.
 * 
 * Keybinds can also have a delay to ensure that a certain amount of time has
 * passed between presses.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Keybind =
/*#__PURE__*/
function () {
  /**
   * The keys that are assigned to this keybind.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {KeybindObject}
   */

  /**
   * The callback method to run when this keybind is used.
   * 
   * @since 0.1.0
   * 
   * @property {Function}
   * 
   * @default this.noop
   */

  /**
   * A delay to set between uses of this keybind in case it shouldn't
   * be able to be spammed.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The last time that this keybind was used.
   * 
   * @since 0.1.0
   * @private
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

    _defineProperty(this, "_lastUsed", 0);

    this._keys = keys;
  }
  /**
   * Gets the keys that are a part of this keybind.
   * 
   * @since 0.1.0
   * 
   * @returns {KeybindObject}
   */


  _createClass(Keybind, [{
    key: "delay",

    /**
     * Sets the delay between keybind uses.
     * 
     * @since 0.1.0
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
     * Sets the callback method that will be run when this keybind is active.
     * 
     * @since 0.1.0
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
     * @since 0.1.0
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
     * An empty method to use as the default action for the keybind in case
     * no action is added.
     * 
     * @since 0.1.0
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
     * @since 0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkva2V5YmluZC50cyJdLCJuYW1lcyI6WyJLZXliaW5kIiwia2V5cyIsIm5vb3AiLCJfa2V5cyIsIm1zIiwiX2RlbGF5IiwiX2xhc3RVc2VkIiwiZm4iLCJfYWN0aW9uIiwidGltZSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhcUJBLE87OztBQUVwQjs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7QUFZQTs7O0FBR0EsbUJBQVlDLElBQVosRUFBaUM7QUFBQTs7QUFBQTs7QUFBQSxxQ0E3QkwsS0FBS0MsSUE2QkE7O0FBQUEsb0NBakJoQixDQWlCZ0I7O0FBQUEsdUNBTGIsQ0FLYTs7QUFFaEMsU0FBS0MsS0FBTCxHQUFhRixJQUFiO0FBRUE7QUFFRDs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7Ozs7MEJBU01HLEUsRUFBcUI7QUFFMUIsV0FBS0MsTUFBTCxHQUFjRCxFQUFkO0FBRUEsV0FBS0UsU0FBTCxHQUFpQixDQUFDLEtBQUtELE1BQU4sR0FBZSxDQUFoQztBQUVBLGFBQU8sSUFBUDtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7OzsyQkFTT0UsRSxFQUF1QjtBQUU3QixXQUFLQyxPQUFMLEdBQWVELEVBQWY7QUFFQSxhQUFPLElBQVA7QUFFQTtBQUVEOzs7Ozs7Ozs7O3dCQU9JRSxJLEVBQWM7QUFFakIsV0FBS0QsT0FBTDs7QUFFQSxXQUFLRixTQUFMLEdBQWlCRyxJQUFqQjtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7MkJBT2UsQ0FBRzs7O3dCQTdFUTtBQUV6QixhQUFPLEtBQUtOLEtBQVo7QUFFQTtBQUVEOzs7Ozs7Ozs7O3dCQU91QjtBQUV0QixhQUFPLEtBQUtHLFNBQVo7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMvS2V5YmluZE9iamVjdC50c1wiIC8+XHJcblxyXG4vKipcclxuICogQSBrZXliaW5kIHJlcHJlc2VudHMgb25lIGtleSBvciBhIGNvbWJpbmF0aW9uIG9mIGtleXMgdGhhdCBwZXJmb3JtIGFuIGFjdGlvbi5cclxuICogXHJcbiAqIEtleWJpbmRzIGNhbiBoYXZlIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRoYXQgaXMgcnVuIGR1cmluZyB0aGUgYGNoZWNrYCBtZXRob2RcclxuICogZWl0aGVyIGF1dG9tYXRpY2FsbHkgb3IgaW4geW91ciBvd24gZ2FtZSBsb29wLlxyXG4gKiBcclxuICogS2V5YmluZHMgY2FuIGFsc28gaGF2ZSBhIGRlbGF5IHRvIGVuc3VyZSB0aGF0IGEgY2VydGFpbiBhbW91bnQgb2YgdGltZSBoYXNcclxuICogcGFzc2VkIGJldHdlZW4gcHJlc3Nlcy5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaUBnbWFpbC5jb20+XHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5YmluZCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBrZXlzIHRoYXQgYXJlIGFzc2lnbmVkIHRvIHRoaXMga2V5YmluZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7S2V5YmluZE9iamVjdH1cclxuXHQgKi9cclxuXHRwcml2YXRlIF9rZXlzOiBLZXliaW5kT2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRvIHJ1biB3aGVuIHRoaXMga2V5YmluZCBpcyB1c2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdGhpcy5ub29wXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfYWN0aW9uOiBGdW5jdGlvbiA9IHRoaXMubm9vcDtcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWxheSB0byBzZXQgYmV0d2VlbiB1c2VzIG9mIHRoaXMga2V5YmluZCBpbiBjYXNlIGl0IHNob3VsZG4ndFxyXG5cdCAqIGJlIGFibGUgdG8gYmUgc3BhbW1lZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0X2RlbGF5OiBudW1iZXIgPSAwO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbGFzdCB0aW1lIHRoYXQgdGhpcyBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdF9sYXN0VXNlZDogbnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtLZXliaW5kT2JqZWN0fSBrZXlzIFRoZSBrZXlzIHRvIGJpbmQgdG8gdGhpcyBrZXliaW5kLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGtleXM6IEtleWJpbmRPYmplY3QpIHtcclxuXHJcblx0XHR0aGlzLl9rZXlzID0ga2V5cztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBrZXlzIHRoYXQgYXJlIGEgcGFydCBvZiB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0Z2V0IGtleXMoKTogS2V5YmluZE9iamVjdCB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2tleXM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgbGFzdCB0aW1lIHRoYXQgdGhpcyBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0Z2V0IGxhc3RVc2VkKCk6IG51bWJlciB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2xhc3RVc2VkO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4ga2V5YmluZCB1c2VzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtcyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdXNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG5cdGRlbGF5KG1zOiBudW1iZXIpOiBLZXliaW5kIHtcclxuXHJcblx0XHR0aGlzLl9kZWxheSA9IG1zO1xyXG5cclxuXHRcdHRoaXMuX2xhc3RVc2VkID0gLXRoaXMuX2RlbGF5ICsgMTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjYWxsYmFjayBtZXRob2QgdGhhdCB3aWxsIGJlIHJ1biB3aGVuIHRoaXMga2V5YmluZCBpcyBhY3RpdmUuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIG1ldGhvZCB0byB1c2UuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcblx0YWN0aW9uKGZuOiBGdW5jdGlvbik6IEtleWJpbmQge1xyXG5cclxuXHRcdHRoaXMuX2FjdGlvbiA9IGZuO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJ1biB0aGUgYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgdGhhdCB0aGUga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKi9cclxuXHRydW4odGltZTogbnVtYmVyKSB7XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uKCk7XHJcblxyXG5cdFx0dGhpcy5fbGFzdFVzZWQgPSB0aW1lO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGVtcHR5IG1ldGhvZCB0byB1c2UgYXMgdGhlIGRlZmF1bHQgYWN0aW9uIGZvciB0aGUga2V5YmluZCBpbiBjYXNlXHJcblx0ICogbm8gYWN0aW9uIGlzIGFkZGVkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub29wKCkgeyB9XHJcblxyXG59Il19