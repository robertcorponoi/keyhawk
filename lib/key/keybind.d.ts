import KeybindObject from '../interfaces/KeybindObject';
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
export default class Keybind {
    /**
     * The keys that are assigned to this keybind.
     *
     * @since 0.1.0
   *
     * @private
     *
     * @property {KeybindObject}
     */
    private _keys;
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
    private _action;
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
    _delay: number;
    /**
     * The last time that this keybind was used.
     *
     * @since 0.1.0
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
     * @since 0.1.0
     *
     * @returns {KeybindObject}
     */
    readonly keys: KeybindObject;
    /**
     * Gets the last time that this keybind was used.
     *
     * @since 0.1.0
     *
     * @returns {number}
     */
    readonly lastUsed: number;
    /**
     * Sets the delay between keybind uses.
     *
     * @since 0.1.0
     *
     * @param {number} ms The time in milliseconds to delay use.
     *
     * @returns {Keybind} Returns this for chaining.
     */
    delay(ms: number): Keybind;
    /**
     * Sets the callback method that will be run when this keybind is active.
     *
     * @since 0.1.0
     *
     * @param {Function} fn The callback method to use.
     *
     * @returns {Keybind} Returns this for chaining.
     */
    action(fn: Function): Keybind;
    /**
     * Run the action associated with this keybind.
     *
     * @since 0.1.0
     *
     * @param {number} time The time that the keybind was used.
     */
    run(time: number): void;
    /**
     * An empty method to use as the default action for the keybind in case no action is added.
     *
     * @since 0.1.0
     * @private
     */
    private noop;
}
