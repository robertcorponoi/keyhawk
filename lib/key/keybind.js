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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkva2V5YmluZC50cyJdLCJuYW1lcyI6WyJLZXliaW5kIiwia2V5cyIsIl9ub29wIiwiX2tleXMiLCJtcyIsIl9kZWxheSIsIl9sYXN0VXNlZCIsIl9pbml0aWFsRGVsYXkiLCJmbiIsIl9hY3Rpb24iLCJ0aW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7O0lBUXFCQSxPOzs7QUFDcEI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUM7Ozs7Ozs7O0FBU0Q7Ozs7Ozs7O0FBU0E7OztBQUdBLG1CQUFZQyxJQUFaLEVBQWlDO0FBQUE7O0FBQUE7O0FBQUEscUNBakNMLEtBQUtDLEtBaUNBOztBQUFBLG9DQXZCZixDQXVCZTs7QUFBQSwyQ0FkUixDQWNROztBQUFBLHVDQUxiLENBS2E7O0FBQ2hDLFNBQUtDLEtBQUwsR0FBYUYsSUFBYjtBQUNBO0FBRUQ7Ozs7Ozs7Ozs7QUFjQTs7Ozs7OzswQkFPTUcsRSxFQUFxQjtBQUMxQixXQUFLQyxNQUFMLEdBQWNELEVBQWQ7QUFFQSxXQUFLRSxTQUFMLEdBQWlCLENBQUMsS0FBS0QsTUFBTixHQUFlLENBQWhDO0FBRUEsYUFBTyxJQUFQO0FBQ0M7QUFFRDs7Ozs7Ozs7OztpQ0FPYUQsRSxFQUFxQjtBQUNoQyxXQUFLRyxhQUFMLEdBQXFCSCxFQUFyQjtBQUVBLGFBQU8sSUFBUDtBQUNEO0FBRUY7Ozs7Ozs7Ozs7MkJBT09JLEUsRUFBdUI7QUFDN0IsV0FBS0MsT0FBTCxHQUFlRCxFQUFmO0FBRUEsYUFBTyxJQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7d0JBS0lFLEksRUFBYztBQUNqQixXQUFLRCxPQUFMOztBQUVBLFdBQUtILFNBQUwsR0FBaUJJLElBQWpCO0FBQ0E7QUFFRDs7Ozs7Ozs7NEJBS2dCLENBQUc7Ozt3QkFsRU87QUFBRSxhQUFPLEtBQUtQLEtBQVo7QUFBb0I7QUFFaEQ7Ozs7Ozs7O3dCQUt1QjtBQUFFLGFBQU8sS0FBS0csU0FBWjtBQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEtleWJpbmRPYmplY3QgZnJvbSAnLi4vaW50ZXJmYWNlcy9LZXliaW5kT2JqZWN0JztcclxuXHJcbi8qKlxyXG4gKiBBIGtleWJpbmQgcmVwcmVzZW50cyBvbmUga2V5IG9yIGEgY29tYmluYXRpb24gb2Yga2V5cyB0aGF0IHBlcmZvcm0gYW4gYWN0aW9uLlxyXG4gKiBcclxuICogS2V5YmluZHMgY2FuIGhhdmUgYW4gb3B0aW9uYWwgY2FsbGJhY2sgdGhhdCBpcyBydW4gZHVyaW5nIHRoZSBgY2hlY2tgIG1ldGhvZCBlaXRoZXIgYXV0b21hdGljYWxseSBcclxuICogb3IgaW4geW91ciBvd24gZ2FtZSBsb29wLlxyXG4gKiBcclxuICogS2V5YmluZHMgY2FuIGFsc28gaGF2ZSBhIGRlbGF5IHRvIGVuc3VyZSB0aGF0IGEgY2VydGFpbiBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkIGJldHdlZW4gcHJlc3Nlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJpbmQge1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBrZXlzIHRoYXQgYXJlIGFzc2lnbmVkIHRvIHRoaXMga2V5YmluZC5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7S2V5YmluZE9iamVjdH1cclxuXHQgKi9cclxuXHRwcml2YXRlIF9rZXlzOiBLZXliaW5kT2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRvIHJ1biB3aGVuIHRoaXMga2V5YmluZCBpcyB1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCB0aGlzLm5vb3BcclxuXHQgKi9cclxuXHRwcml2YXRlIF9hY3Rpb246IEZ1bmN0aW9uID0gdGhpcy5fbm9vcDtcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWxheSB0byBzZXQgYmV0d2VlbiB1c2VzIG9mIHRoaXMga2V5YmluZCBpbiBjYXNlIGl0IHNob3VsZG4ndFxyXG5cdCAqIGJlIGFibGUgdG8gYmUgc3BhbW1lZC5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcbiAgX2RlbGF5OiBudW1iZXIgPSAwO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEEgZGVsYXkgdG8gYmUgc2V0IGJlZm9yZSB0aGUga2V5YmluZCBjYW4gZXZlbiBiZSB1c2VkIGF0IGFsbC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAwXHJcbiAgICovXHJcbiAgX2luaXRpYWxEZWxheTogbnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxhc3QgdGltZSB0aGF0IHRoaXMga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0X2xhc3RVc2VkOiBudW1iZXIgPSAwO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge0tleWJpbmRPYmplY3R9IGtleXMgVGhlIGtleXMgdG8gYmluZCB0byB0aGlzIGtleWJpbmQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioa2V5czogS2V5YmluZE9iamVjdCkge1xyXG5cdFx0dGhpcy5fa2V5cyA9IGtleXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBrZXlzIHRoYXQgYXJlIGEgcGFydCBvZiB0aGlzIGtleWJpbmQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmRPYmplY3R9XHJcblx0ICovXHJcblx0Z2V0IGtleXMoKTogS2V5YmluZE9iamVjdCB7IHJldHVybiB0aGlzLl9rZXlzOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGxhc3QgdGltZSB0aGF0IHRoaXMga2V5YmluZCB3YXMgdXNlZC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldCBsYXN0VXNlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGFzdFVzZWQ7IH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiBrZXliaW5kIHVzZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyB0byBkZWxheSB1c2UuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0tleWJpbmR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcblx0ZGVsYXkobXM6IG51bWJlcik6IEtleWJpbmQge1xyXG5cdFx0dGhpcy5fZGVsYXkgPSBtcztcclxuXHJcblx0XHR0aGlzLl9sYXN0VXNlZCA9IC10aGlzLl9kZWxheSArIDE7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGluaXRpYWwgZGVsYXkgYmVmb3JlIHRoZSBrZXliaW5kIGNhbiBiZSB1c2VkIGZvciB0aGUgZmlyc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbXMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUga2V5YmluZCBjYW4gYmUgdXNlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7S2V5YmluZH0gUmV0dXJzbiB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBpbml0aWFsRGVsYXkobXM6IG51bWJlcik6IEtleWJpbmQge1xyXG4gICAgdGhpcy5faW5pdGlhbERlbGF5ID0gbXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBjYWxsYmFjayBtZXRob2Qgc3RoYXQgd2lsbCBiZSBydW4gd2hlbiB0aGlzIGtleWJpbmQgaXMgYWN0aXZlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBtZXRob2QgdG8gdXNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtLZXliaW5kfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG5cdGFjdGlvbihmbjogRnVuY3Rpb24pOiBLZXliaW5kIHtcclxuXHRcdHRoaXMuX2FjdGlvbiA9IGZuO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVuIHRoZSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoaXMga2V5YmluZC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSB0aGF0IHRoZSBrZXliaW5kIHdhcyB1c2VkLlxyXG5cdCAqL1xyXG5cdHJ1bih0aW1lOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX2FjdGlvbigpO1xyXG5cclxuXHRcdHRoaXMuX2xhc3RVc2VkID0gdGltZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGVtcHR5IG1ldGhvZCB0byB1c2UgYXMgdGhlIGRlZmF1bHQgYWN0aW9uIGZvciB0aGUga2V5YmluZCBpbiBjYXNlIG5vIGFjdGlvbiBpcyBhZGRlZC5cclxuXHQgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX25vb3AoKSB7IH1cclxufSJdfQ==