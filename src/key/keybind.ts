'use strict'

/// <reference path="../interfaces/KeybindObject.ts" />

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
export default class Keybind {

	/**
	 * The keys that are assigned to this keybind.
	 * 
	 * @since 0.1.0
	 * @private
	 * 
	 * @property {KeybindObject}
	 */
	private _keys: KeybindObject;

	/**
	 * The callback method to run when this keybind is used.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {Function}
	 * 
	 * @default this.noop
	 */
	private _action: Function = this.noop;

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
	_delay: number = 0;

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
	 * @since 0.1.0
	 * 
	 * @returns {KeybindObject}
	 */
	get keys(): KeybindObject {

		return this._keys;

	}

	/**
	 * Gets the last time that this keybind was used.
	 * 
	 * @since 0.1.0
	 * 
	 * @returns {number}
	 */
	get lastUsed(): number {

		return this._lastUsed;

	}

	/**
	 * Sets the delay between keybind uses.
	 * 
	 * @since 0.1.0
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
	 * Sets the callback method that will be run when this keybind is active.
	 * 
	 * @since 0.1.0
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
	 * @since 0.1.0
	 * 
	 * @param {number} time The time that the keybind was used.
	 */
	run(time: number) {

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
	private noop() { }

}