'use strict'

import Key from './key.js';
import { Keybind } from './keybind.js';
import { Deltaframe } from './optional/deltaframe.js';

export class Keyhawk {

  /**
   * @param {Object} [options]
   * @param {boolean} [options.useLoop=true] By default Keyhawk will use the `deltaframe` module to check for any keybinds being pressed
   *                                         every frame. If you have your own loop or wish to implement some other logic, set this to false.
   */
  constructor(options = {}) {

    /**
     * Create an options Object with the user defined options along with the
     * defaults for options not specified.
     * 
     * @property {Object}
     * @readonly
     */
    this._options = Object.assign({

      useLoop: true

    }, options);

    /**
     * The keys that can be chosen for binding.
     * 
     * @property {Object}
     * @readonly
     */
    this.KEY = Key;

    /**
     * The collection of keybinds that are current being watched for.
     * 
     * @property {Array}
     * @readonly
     */
    this._keybinds = [];

    /**
     * Keeps track of the keys pressed throughout the use of the application.
     * 
     * @property {Object}
     * @readonly
     */
    this._pressed = {};

    /**
     * Setup the event listeners for the keydown and keyup events and the responses.
     */
    this._boot();

  }

  /**
   * Returns all of the keybinds created.
   * 
   * @since 0.1.0
   * 
   * @returns {Object} Returns all of the current keybinds.
   */
  get keybinds() {

    return this._keybinds;

  }

  /**
   * Creates a new keybind with the specified keys and options.
   * 
   * @since 0.1.0
   * 
   * @param {...string} keys One or more keys to attach to this keybind.
   */
  keybind(...keys) {

    if (!keys) {

      console.warn('At least a single key must be provided for this keybind');

      return;

    }

    const keyObj = {};

    for (let key of keys) keyObj[key] = true;

    const keybind = new Keybind(keyObj);

    this._keybinds.push(keybind);

    return keybind;

  }

  /**
   * Checks to see which key conditions are currently being met and automatically 
   * runs the keybind's callback.
   * 
   * @since 0.1.0
   * @private
   */
  check(time) {

    this._keybinds.forEach(o => {

      const isActive = Object.entries(o._keys).every(arr => this._pressed[arr[0]] == arr[1]);

      const isTime = time - o._lastActive > o._delay;

      if (isActive && isTime) o._run(time);

    });

  }

  /**
   * Check if a keybind already exists.
   * 
   * @since 0.1.0
   * @private
   * 
   * @param {string} name The name of the keybind to check if exists.
   * 
   * @returns {boolean} Returns true if the keybind exists or false otherwise.
   */
  _keybindExists(name) {

    for (let keybind in this._keybinds) {

      if (keybind.name == name) return true;

    }

    return false;

  }

  /**
   * Setup the event listeners for the keydown and keyup events and the responses.
   * 
   * @since 0.1.0
   * @private
   */
  _boot() {

    window.addEventListener('keydown', (ev) => this._keyDown(ev));

    window.addEventListener('keyup', (ev) => this._keyUp(ev));

    if (this._options.useLoop) {

      this._loop = new Deltaframe();

      this._prevTime = 0;

      this._currTime = 0;

      this._loop.start((time) => this.check(time));

    }

  }

  /**
   * When a key is pressed, add it to the `pressed` Object if it doesn't already
   * exist and set it to `true`.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Object} event The event generated from the keypress.
   */
  _keyDown(event) {

    this._pressed[event.key.toLowerCase()] = true;

    event.preventDefault();

    return;

  }

  /**
   * When a key is released, set its property in the `pressed` Object to false.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Object} event The event generated from the keyup.
   */
  _keyUp(event) {

    this._pressed[event.key.toLowerCase()] = false;

    event.preventDefault();

    return;

  }

}