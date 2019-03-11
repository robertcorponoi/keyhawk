'use strict'

/**
 * The Options object defines the options available for Keyhawk along with
 * their defaults in case no options are specified.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */
export default class Options {

	/**
	 * By default Keyhawk will use the Deltaframe module to handle the checking of
	 * keybind uses.
	 * 
	 * If you would like to use your own game loop or even just rather use a simple
	 * debounce method, you can set this to false.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {boolean}
	 * 
	 * @default true
	 */
	useLoop: boolean = true;

	/**
	 * @param {Object} options The init options passed to Keyhawk.
	 */
	constructor(options: Object) {

		// Merge the user specified options with the defaults.
		Object.assign(this, options);

	}

}