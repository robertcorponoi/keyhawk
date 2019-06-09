/**
 * Defines the options available for Keyhawk and their default values, if any exist.
 *
 * @version 0.1.0
 */
export default class Options {
    /**
     * By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses.
     *
     * If you would like to use your own game loop or even just rather use a simple debounce method,
   * you can set this to false.
     *
     * @since 0.1.0
     *
     * @property {boolean}
     *
     * @default true
     */
    useLoop: boolean;
    /**
     * @param {Object} options The initialization options passed to Keyhawk.
     */
    constructor(options: Object);
}
