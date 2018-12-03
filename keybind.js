'use strict'

/**
 * A keybind represents one key or a combination of keys that perform an action.
 * 
 * Keybinds can have an optional callback that is run during the `check` method
 * either automatically or in your own game loop.
 * 
 * Keybinds can also have a delay to ensure that a certain amount of time has
 * passed between presses.
 */
export class Keybind {

  constructor(keys) {

    /**
     * All of the keys that are part of this keybind.
     * 
     * @property {Object}
     * @readonly
     */
    this._keys = keys;

    /**
     * The callback method to run for this keybind.
     * 
     * @property {Function}
     * @readonly
     */
    this._action = this._noop;

    /**
     * The delay between keybind uses.
     * 
     * @property {number}
     * @readonly
     */
    this._delay = 0;

    /**
     * The last time that this keybind was used.
     * 
     * @property {number}
     * @readonly
     */
    this._lastActive = 0;

  }

  /**
   * Returns the keys that are a part of this keybind.
   * 
   * @since 0.1.0
   * 
   * @returns {Array} Returns the keys associated with this keybind.
   */
  get keys() {

    return this._keys;

  }

  /**
   * Set a delay between this keybind's uses.
   * 
   * @since 0.1.0
   * 
   * @param {number} time The delay for this keybind.
   * 
   * @returns {Keybind} Returns this for chaining.
   */
  delay(time) {

    this._delay = time;

    this._lastActive = -this._delay + 1;

    return this;

  }

  /**
   * Set a callback method that will be run when this keybind is active.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The callback method to run for this keybind.
   */
  action(fn) {

    this._action = fn;

    return this;

  }

  /**
   * Run the task associated with this keybind.
   * 
   * @since 0.1.0
   * @private
   * 
   * @param {number} time The time that the keybind was used.
   */
  _run(time) {

    this._action();

    this._lastActive = time;

  }

  /**
   * An empty function used as the default method.
   * 
   * @since 0.1.0
   * @private
   */
  _noop() { }

}