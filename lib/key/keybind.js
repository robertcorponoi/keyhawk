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
 * 
 * @version 0.1.0
 */
var Keybind =
/*#__PURE__*/
function () {
  /**
   * The keys that are assigned to this keybind.
   * 
   * @since 0.1.0
    * 
   * @private
   * 
   * @property {KeybindObject}
   */

  /**
   * The callback method to run when this keybind is used.
   * 
   * @since 0.1.0
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
     * An empty method to use as the default action for the keybind in case no action is added.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkva2V5YmluZC50cyJdLCJuYW1lcyI6WyJLZXliaW5kIiwia2V5cyIsIm5vb3AiLCJfa2V5cyIsIm1zIiwiX2RlbGF5IiwiX2xhc3RVc2VkIiwiZm4iLCJfYWN0aW9uIiwidGltZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7Ozs7Ozs7O0lBVXFCQSxPOzs7QUFFcEI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7QUFXQTs7O0FBR0EsbUJBQVlDLElBQVosRUFBaUM7QUFBQTs7QUFBQTs7QUFBQSxxQ0E1QkwsS0FBS0MsSUE0QkE7O0FBQUEsb0NBaEJoQixDQWdCZ0I7O0FBQUEsdUNBTGIsQ0FLYTs7QUFFaEMsU0FBS0MsS0FBTCxHQUFhRixJQUFiO0FBRUE7QUFFRDs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7Ozs7MEJBU01HLEUsRUFBcUI7QUFFMUIsV0FBS0MsTUFBTCxHQUFjRCxFQUFkO0FBRUEsV0FBS0UsU0FBTCxHQUFpQixDQUFDLEtBQUtELE1BQU4sR0FBZSxDQUFoQztBQUVBLGFBQU8sSUFBUDtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7OzsyQkFTT0UsRSxFQUF1QjtBQUU3QixXQUFLQyxPQUFMLEdBQWVELEVBQWY7QUFFQSxhQUFPLElBQVA7QUFFQTtBQUVEOzs7Ozs7Ozs7O3dCQU9JRSxJLEVBQWM7QUFFakIsV0FBS0QsT0FBTDs7QUFFQSxXQUFLRixTQUFMLEdBQWlCRyxJQUFqQjtBQUVBO0FBRUQ7Ozs7Ozs7OzsyQkFNZSxDQUFHOzs7d0JBNUVRO0FBRXpCLGFBQU8sS0FBS04sS0FBWjtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7d0JBT3VCO0FBRXRCLGFBQU8sS0FBS0csU0FBWjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgS2V5YmluZE9iamVjdCBmcm9tICcuLi9pbnRlcmZhY2VzL0tleWJpbmRPYmplY3QnO1xyXG5cclxuLyoqXHJcbiAqIEEga2V5YmluZCByZXByZXNlbnRzIG9uZSBrZXkgb3IgYSBjb21iaW5hdGlvbiBvZiBrZXlzIHRoYXQgcGVyZm9ybSBhbiBhY3Rpb24uXHJcbiAqIFxyXG4gKiBLZXliaW5kcyBjYW4gaGF2ZSBhbiBvcHRpb25hbCBjYWxsYmFjayB0aGF0IGlzIHJ1biBkdXJpbmcgdGhlIGBjaGVja2AgbWV0aG9kIGVpdGhlciBhdXRvbWF0aWNhbGx5IFxyXG4gKiBvciBpbiB5b3VyIG93biBnYW1lIGxvb3AuXHJcbiAqIFxyXG4gKiBLZXliaW5kcyBjYW4gYWxzbyBoYXZlIGEgZGVsYXkgdG8gZW5zdXJlIHRoYXQgYSBjZXJ0YWluIGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQgYmV0d2VlbiBwcmVzc2VzLlxyXG4gKiBcclxuICogQHZlcnNpb24gMC4xLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJpbmQge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUga2V5cyB0aGF0IGFyZSBhc3NpZ25lZCB0byB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBfa2V5czogS2V5YmluZE9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNhbGxiYWNrIG1ldGhvZCB0byBydW4gd2hlbiB0aGlzIGtleWJpbmQgaXMgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdGhpcy5ub29wXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfYWN0aW9uOiBGdW5jdGlvbiA9IHRoaXMubm9vcDtcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWxheSB0byBzZXQgYmV0d2VlbiB1c2VzIG9mIHRoaXMga2V5YmluZCBpbiBjYXNlIGl0IHNob3VsZG4ndFxyXG5cdCAqIGJlIGFibGUgdG8gYmUgc3BhbW1lZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0X2RlbGF5OiBudW1iZXIgPSAwO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbGFzdCB0aW1lIHRoYXQgdGhpcyBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDBcclxuXHQgKi9cclxuXHRfbGFzdFVzZWQ6IG51bWJlciA9IDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7S2V5YmluZE9iamVjdH0ga2V5cyBUaGUga2V5cyB0byBiaW5kIHRvIHRoaXMga2V5YmluZC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihrZXlzOiBLZXliaW5kT2JqZWN0KSB7XHJcblxyXG5cdFx0dGhpcy5fa2V5cyA9IGtleXM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUga2V5cyB0aGF0IGFyZSBhIHBhcnQgb2YgdGhpcyBrZXliaW5kLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kT2JqZWN0fVxyXG5cdCAqL1xyXG5cdGdldCBrZXlzKCk6IEtleWJpbmRPYmplY3Qge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9rZXlzO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGxhc3QgdGltZSB0aGF0IHRoaXMga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCBsYXN0VXNlZCgpOiBudW1iZXIge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9sYXN0VXNlZDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBkZWxheSBiZXR3ZWVuIGtleWJpbmQgdXNlcy5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gbXMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGRlbGF5IHVzZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuXHQgKi9cclxuXHRkZWxheShtczogbnVtYmVyKTogS2V5YmluZCB7XHJcblxyXG5cdFx0dGhpcy5fZGVsYXkgPSBtcztcclxuXHJcblx0XHR0aGlzLl9sYXN0VXNlZCA9IC10aGlzLl9kZWxheSArIDE7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY2FsbGJhY2sgbWV0aG9kIHRoYXQgd2lsbCBiZSBydW4gd2hlbiB0aGlzIGtleWJpbmQgaXMgYWN0aXZlLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBtZXRob2QgdG8gdXNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG5cdGFjdGlvbihmbjogRnVuY3Rpb24pOiBLZXliaW5kIHtcclxuXHJcblx0XHR0aGlzLl9hY3Rpb24gPSBmbjtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSdW4gdGhlIGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXliaW5kLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lIHRoYXQgdGhlIGtleWJpbmQgd2FzIHVzZWQuXHJcblx0ICovXHJcblx0cnVuKHRpbWU6IG51bWJlcikge1xyXG5cclxuXHRcdHRoaXMuX2FjdGlvbigpO1xyXG5cclxuXHRcdHRoaXMuX2xhc3RVc2VkID0gdGltZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBlbXB0eSBtZXRob2QgdG8gdXNlIGFzIHRoZSBkZWZhdWx0IGFjdGlvbiBmb3IgdGhlIGtleWJpbmQgaW4gY2FzZSBubyBhY3Rpb24gaXMgYWRkZWQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vb3AoKSB7IH1cclxuXHJcbn0iXX0=