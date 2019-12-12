'use strict'

import KeybindObject from '../interfaces/KeybindObject';

/**
 * A keybind represents one key or a combination of keys that perform an action.
 * 
 * Keybinds can have an optional callback that is run during the `check` method either automatically 
 * or in your own game loop.
 * 
 * Keybinds can also have a delay to ensure that a certain amount of time has passed between presses.
 */
export default class Keybind {

	/**
	 * The keys that are assigned to this keybind.
   * 
	 * @private
	 * 
	 * @property {KeybindObject}
	 */
	private _keys: KeybindObject;

	/**
	 * The callback method to run when this keybind is used.
   * 
   * @private
	 * 
	 * @property {Function}
	 * 
	 * @default this.noop
	 */
	private _action: Function = this._noop;

	/**
	 * A delay to set between uses of this keybind in case it shouldn't
	 * be able to be spammed.
	 * 
	 * @property {number}
	 * 
	 * @default 0
	 */
  _delay: number = 0;
  
  /**
   * A delay to be set before the keybind can even be used at all.
   * 
   * @property {number}
   * 
   * @default 0
   */
  _initialDelay: number = 0;

	/**
	 * The last time that this keybind was used.
	 * 
	 * @property {number}
	 * 
	 * @default 0
	 */
	_lastUsed: number = 0;

	/**
	 * @param {KeybindObject} keys The keys to bind to this keybind.
	 */
	constructor(keys: KeybindObject) {

		this._keys = keys;

	}

	/**
	 * Gets the keys that are a part of this keybind.
	 * 
	 * @returns {KeybindObject}
	 */
	get keys(): KeybindObject { return this._keys; }

	/**
	 * Gets the last time that this keybind was used.
	 * 
	 * @returns {number}
	 */
	get lastUsed(): number { return this._lastUsed; }

	/**
	 * Sets the delay between keybind uses.
	 * 
	 * @param {number} ms The time in milliseconds to delay use.
	 * 
	 * @returns {Keybind} Returns this for chaining.
	 */
	delay(ms: number): Keybind {

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
  initialDelay(ms: number): Keybind {

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
	action(fn: Function): Keybind {

		this._action = fn;

		return this;

	}

	/**
	 * Run the action associated with this keybind.
	 * 
	 * @param {number} time The time that the keybind was used.
	 */
	run(time: number) {

		this._action();

		this._lastUsed = time;

	}

	/**
	 * An empty method to use as the default action for the keybind in case no action is added.
	 * 
	 * @private
	 */
	private _noop() { }

}