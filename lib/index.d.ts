import Keybind from './key/keybind';
/**
 * Keyhawk lets you focus on creating your game or application without
 * having to worry about key codes and keybinds.
 *
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 *
 * @version 1.0.0
 */
export default class Keyhawk {
    /**
     * The options for this instance of Keyhawk.
     *
     * @since 1.0.0
     *
     * @property {Options}
     * @readonly
     */
    private options;
    /**
     * The keys that can be selected to bind to keybinds.
     *
     * @since 0.1.0
     * @readonly
     */
    KEY: any;
    /**
     * All of the current keybinds being watched.
     *
     * @since 0.1.0
     *
     * @property {Array<Keybind>}
     */
    private _keybinds;
    /**
     * Binds to Deltaframe if used.
     *
     * @since 1.0.0
     *
     * @property {Deltaframe|null}
     */
    private loop;
    /**
     * Keeps track of what keys have been pressed.
     *
     * @since 0.1.0
     * @readonly
     *
     * @property {Object}
     */
    private pressed;
    /**
     * @param {Object} [options]
     * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of
     * 																				 keybind uses.
     * 																				 If you would like to use your own game loop or even just rather use a simple
     *                                         debounce method, you can set this to false.
     */
    constructor(options?: Object);
    /**
     * Returns all of the keybinds created.
     *
     * @since 0.1.0
     *
     * @returns {Array<Keybind>}
     */
    readonly keybinds: Array<Keybind>;
    /**
     * Creates a new keybind with the specified keys.
     *
     * @since 0.1.0
     *
     * @param {...string} keys One or more keys to attach to this keybind.
     *
     * @returns {Keybind} Returns the newly created keybind.
     */
    keybind(...keys: Array<string>): Keybind | undefined;
    /**
     * Checks to see which key conditions are currently being met and runs the
     * keybinds attached callback method.
     *
     * @since 0.1.0
     */
    check(time: number): void;
    /**
     * Setup the key event listeners and initialize Deltaframe if required.
     *
     * @since 0.1.0
     * @private
     */
    private setup;
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't
     * already exist and set it to `true`.
     *
     * @since 0.1.0
     * @private
     *
     * @property {KeyboardEvent} event The event generated from the keypress.
     */
    private keydown;
    /**
     * When a key is released, set its property in the `pressed` object to `false`.
     *
     * @since 0.1.0
     * @private
     *
     * @property {KeyboardEvent} event The event generated from the keypress.
     */
    private keyup;
}
