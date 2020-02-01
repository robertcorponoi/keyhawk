'use strict'

import Key from './key/key';
import Keybind from './key/keybind';
import Options from './options/Options';

import Keys from './interfaces/Keys';
import KeybindObject from './interfaces/KeybindObject';

import Deltaframe from 'deltaframe';

/**
 * Create keybinds easily with single and multi key support
 */
export default class Keyhawk {
	/**
	 * The selected options for Keyhawk.
	 * 
	 * @property {Options}
	 * 
   * @private
	 */
  private _options: Options;

	/**
	 * A list of keys that can be selected to be used in keybinds.
	 * 
   * @private
	 */
  private _KEY: Keys = Key;

	/**
	 * A list of the created keybinds.
	 * 
	 * @property {Array<Keybind>}
   * 
   * @private
	 */
  private _keybinds: Array<Keybind> = [];

	/**
	 * If you don't want to create your own game loop to check keykind uses on an interval, you opt in to
   * use the Deltaframe package.
	 * 
	 * @property {Deltaframe|null}
   * 
   * @private
	 */
  private _loop: (Deltaframe | null) = null;

	/**
	 * Keeps track of what keys have been pressed.
   * 
	 * @private
	 * 
	 * @property {Object}
	 */
  private _pressed: any = {};

  /**
   * Indicates whether using keybinds is currently disabled or not.
   * 
   * @private
   * 
   * @property {boolean}
   */
  private _disabled: boolean = false;

  /**
   * The amount of time that keybinds are disabled for, if any.
   * 
   * @private
   * 
   * @property {number} 
   */
  private _disabledTime: number = 0;
  
	/**
	 * @param {Object} [options]
	 * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses. If you would like to use your own game loop or even just rather use a simple debounce method, you can set this to false.
	 */
  constructor(options: Object = {}) {
    this._options = new Options(options);

    this._boot();
  }

  /**
   * Returns the keys that can be used to create keybinds.
   * 
   * @returns {Keys}
   */
  get KEY(): Keys { return this._KEY; }

  /**
   * Returns whether keybinds are currently disabled or not.
   * 
   * @returns {boolean}
   */
  get disabled(): boolean { return this._disabled; }

  /**
   * Returns the disabled time, if it was set.
   * 
   * @returns {number}
   */
  get disabledTime(): number { return this._disabledTime; }

  /**
   * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
   * 
   * @private
   */
  private _boot() {
    window.addEventListener('keydown', (ev) => this._keydown(ev));

    window.addEventListener('keyup', (ev) => this._keyup(ev));

    if (this._options.useLoop) {
      this._loop = new Deltaframe({});

      this._loop.start((time: number) => this.check(time));
    }
  }

	/**
	 * Creates a new keybind with the specified keys.
	 * 
	 * @param {...string} keys One or more keys from the `KEYS` property to attach to this keybind.
	 * 
	 * @returns {Keybind} Returns the newly created keybind.
	 */
  keybind(...keys: Array<string>): (Keybind | undefined) {
    if (!keys) {
      console.warn('At least one key must be provided to create a keybind');

      return;
    }

    const keyObj: KeybindObject = {};

    for (const key of keys) keyObj[key] = true;

    const keybind: Keybind = new Keybind(keyObj);

    this._keybinds.push(keybind);

    return keybind;
  }

	/**
	 * Checks to see which key conditions are currently being met and runs the keybind's attached callback method.
   * 
   * @param {number} time The current timestamp which is used to check for delays and is passed to the keybind's callback method.
	 */
  check(time: number) {
    this._keybinds.forEach(o => {

      const isActive: boolean = Object.entries(o.keys).every(arr => this._pressed[arr[0]] == arr[1]);

      const isPastInitialDelay: boolean = time > o._initialDelay;

      const isTime: boolean = time - o._lastUsed > o._delay;

      if (this._disabled) {
        if (time < time + this._disabledTime) return;

        else this._resetDisabled();
      }

      if (isActive && isPastInitialDelay && isTime) o.run(time);
    });
  }

  /**
   * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
   * 
   * @param {number} [lengthOfTime=Infinity] An optional amount of time to wait until keybinds are automatically enabled again. 
   */
  disable(lengthOfTime: number = Infinity) {
    this._disabled = true;

    this._disabledTime =  lengthOfTime;
  }

  /**
   * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
   * keybinds again.
   */
  enable() {
    this._resetDisabled();
  }

	/**
	 * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
   * 
	 * @private
	 * 
	 * @param {KeyboardEvent} event The event generated from the keypress.
	 */
  private _keydown(event: KeyboardEvent) {
    this._pressed[event.key.toLowerCase()] = true;

    event.preventDefault();

    return;
  }

	/**
	 * When a key is released, set its property in the `pressed` object to `false`.
   * 
	 * @private
	 * 
	 * @param {KeyboardEvent} event The event generated from the keypress.
	 */
  private _keyup(event: KeyboardEvent) {
    this._pressed[event.key.toLowerCase()] = false;

    event.preventDefault();
  }

  /**
   * Resets both disabled properties, disabled to false and disabled time to 0 when keybinds are enabled
   * again after being disabled.
   * 
   * @private
   */
  private _resetDisabled() {
    this._disabled = false
    
    this._disabledTime = 0;
  }
}
