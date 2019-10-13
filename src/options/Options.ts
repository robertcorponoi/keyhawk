'use strict'

/**
 * Defines the options available for Keyhawk and their default values, if any exist.
 */
export default class Options {

	/**
	 * By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses.
	 * 
	 * If you would like to use your own game loop or even just rather use a simple debounce method, 
   * you can set this to false.
	 * 
	 * @property {boolean}
	 * 
	 * @default true
	 */
	useLoop: boolean = true;

	/**
	 * @param {Object} options The initialization options passed to Keyhawk.
	 */
	constructor(options: Object) {

		Object.assign(this, options);

	}

}