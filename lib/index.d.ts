import Keybind from './key/keybind';
/**
 * Create keybinds easily with single and multi key support
 *
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 *
 * @version 1.0.5
 */
export default class Keyhawk {
    /**
     * The selected options for Keyhawk.
     *
     * @since 1.0.0
     *
     * @property {Options}
     *
   * @private
     */
    private options;
    /**
     * A list of keys that can be selected to be used in keybinds.
     *
     * @since 0.1.0
     *
   * @private
     */
    KEY: any;
    /**
     * A list of the created keybinds.
     *
     * @since 0.1.0
     *
     * @property {Array<Keybind>}
   *
   * @private
     */
    private keybinds;
    /**
     * If you don't want to create your own game loop to check keykind uses on an interval, you opt in to
   * use the Deltaframe package.
     *
     * @since 1.0.0
     *
     * @property {Deltaframe|null}
   *
   * @private
     */
    private loop;
    /**
     * Keeps track of what keys have been pressed.
     *
     * @since 0.1.0
   *
     * @private
     *
     * @property {Object}
     */
    private pressed;
    /**
     * Indicates whether using keybinds is currently disabled or not.
     *
     * @since 1.0.5
     *
     * @private
     *
     * @property {boolean}
     */
    private disabled;
    /**
     * The amount of time that keybinds are disabled for, if any.
     *
     * @since 1.0.5
     *
     * @private
     *
     * @property {number}
     */
    private disabledTime;
    /**
     * @param {Object} [options]
     * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses. If you would like to use your own game loop or even just rather use a simple debounce method, you can set this to false.
     */
    constructor(options?: Object);
    /**
     * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
     *
     * @since 0.1.0
     *
     * @private
     */
    private boot;
    /**
     * Creates a new keybind with the specified keys.
     *
     * @since 0.1.0
     *
     * @param {...string} keys One or more keys from the `KEYS` property to attach to this keybind.
     *
     * @returns {Keybind} Returns the newly created keybind.
     */
    keybind(...keys: Array<string>): Keybind | undefined;
    /**
     * Checks to see which key conditions are currently being met and runs the keybind's attached callback method.
     *
     * @since 0.1.0
   *
   * @param {number} time The current timestamp which is used to check for delays and is passed to the keybind's callback method.
     */
    check(time: number): void;
    /**
     * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
     *
     * @since 1.0.5
     *
     * @param {number} [lengthOfTime=Infinity] An optional amount of time to wait until keybinds are automatically enabled again.
     */
    disable(lengthOfTime?: number): void;
    /**
     * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
     * keybinds again.
     *
     * @since 1.0.5
     */
    enable(): void;
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
     *
     * @since 0.1.0
   *
     * @private
     *
     * @param {KeyboardEvent} event The event generated from the keypress.
     */
    private keydown;
    /**
     * When a key is released, set its property in the `pressed` object to `false`.
     *
     * @since 0.1.0
   *
     * @private
     *
     * @param {KeyboardEvent} event The event generated from the keypress.
     */
    private keyup;
    /**
     * Resets both disabled properties, disabled to false and disabled time to 0 when keybinds are enabled
     * again after being disabled.
     *
     * @since 1.0.5
     *
     * @private
     */
    private resetDisabled;
}
