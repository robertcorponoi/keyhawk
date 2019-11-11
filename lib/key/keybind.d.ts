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
    private _keys;
    /**
     * The callback method to run when this keybind is used.
   *
   * @private
     *
     * @property {Function}
     *
     * @default this.noop
     */
    private _action;
    /**
     * A delay to set between uses of this keybind in case it shouldn't
     * be able to be spammed.
     *
     * @property {number}
     *
     * @default 0
     */
    _delay: number;
    /**
     * A delay to be set before the keybind can even be used at all.
     *
     * @property {number}
     *
     * @default 0
     */
    _initialDelay: number;
    /**
     * The last time that this keybind was used.
     *
     * @property {number}
     *
     * @default 0
     */
    _lastUsed: number;
    /**
     * @param {KeybindObject} keys The keys to bind to this keybind.
     */
    constructor(keys: KeybindObject);
    /**
     * Gets the keys that are a part of this keybind.
     *
     * @returns {KeybindObject}
     */
    get keys(): KeybindObject;
    /**
     * Gets the last time that this keybind was used.
     *
     * @returns {number}
     */
    get lastUsed(): number;
    /**
     * Sets the delay between keybind uses.
     *
     * @param {number} ms The time in milliseconds to delay use.
     *
     * @returns {Keybind} Returns this for chaining.
     */
    delay(ms: number): Keybind;
    /**
     * Sets the initial delay before the keybind can be used for the first time.
     *
     * @param {number} ms The time in milliseconds before the keybind can be used.
     *
     * @returns {Keybind} Retursn this for chaining.
     */
    initialDelay(ms: number): Keybind;
    /**
     * Sets the callback method sthat will be run when this keybind is active.
     *
     * @param {Function} fn The callback method to use.
     *
     * @returns {Keybind} Returns this for chaining.
     */
    action(fn: Function): Keybind;
    /**
     * Run the action associated with this keybind.
     *
     * @param {number} time The time that the keybind was used.
     */
    run(time: number): void;
    /**
     * An empty method to use as the default action for the keybind in case no action is added.
     *
     * @private
     */
    private noop;
}
