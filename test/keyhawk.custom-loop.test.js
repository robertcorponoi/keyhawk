'use strict'

import Keyhawk from '../keyhawk.js';

let keyhawk;

const options = { useLoop: false };

describe('Using a Custom Game Loop', () => {
	beforeEach(() => {
    keyhawk = new Keyhawk(options);

    loop();
  });

	afterEach(() => keyhawk = null);

	it('should allow a custom game loop to be used', done => {
		const spy = sinon.spy(testTask);

		const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy);

		simKey(' ');
		simKey('Control');

		setTimeout(() => {
			chai.expect(keyhawk._pressed[' ']).to.be.true && chai.expect(keyhawk._pressed['control']).to.be.true;

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

/**
 * Used to test if tasks are working in keybinds.
 */
function testTask() {
	return 'Hello World!';
}

/**
 * Custom game loop.
 */
function loop() {
  keyhawk.check();

  requestAnimationFrame(loop);
}