'use strict'

import Keyhawk from '../keyhawk.js';

let keyhawk;

describe('Creating Keybinds', () => {

	beforeEach(() => keyhawk = new Keyhawk());

	afterEach(() => keyhawk = null);

	it('should set the keys of the keybind to true when pressed', (done) => {

		const jump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.W, keyhawk.KEY.SEVEN);

		simKey(' ');
		simKey('w');
		simKey('7');

		setTimeout(function () {

			chai.expect(keyhawk.pressed).to.deep.equal({ ' ': true, w: true, 7: true });

			done();

		}, 1000);

	});

	it('should set the keys of the keybind to false when released after being pressed', (done) => {

		const jump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.W, keyhawk.KEY.SEVEN);

		simKey(' ');
		simKey('w');
		simKey('7');

		simKey(' ', 'keyup');
		simKey('w', 'keyup');
		simKey('7', 'keyup');

		setTimeout(function () {

			chai.expect(keyhawk.pressed).to.deep.equal({ ' ': false, w: false, 7: false });

			done();

		}, 1000);

	});

});

/**
 * Simulate the user pressing a key.
 * 
 * @param {string} key The key to simulate.
 * @param {string} [type=keydown] The event to simulate.
 */
function simKey(key, type = 'keydown') {

	const event = document.createEvent('HTMLEvents');
	event.initEvent(type, true, false);
	event.key = key;

	document.dispatchEvent(event);

}