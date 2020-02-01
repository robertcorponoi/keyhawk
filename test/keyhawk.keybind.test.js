'use strict'

import Keyhawk from '../keyhawk.js';

let keyhawk;

mocha.setup({ globals: '__VUE_DEVTOOLS_TOAST__' });

describe('Creating Keybinds', () => {
	beforeEach(() => keyhawk = new Keyhawk());

	afterEach(() => keyhawk = null);

	it('should create a new keybind with one key', done => {
		const moveLeft = keyhawk.keybind(keyhawk.KEY.A);

		chai.expect(moveLeft.keys).to.deep.equal({ a: true }) && chai.expect(moveLeft._delay).to.equal(0);

		done();
	});

	it('should create a new keybind with multiple keys', done => {
		const crouchJump = keyhawk.keybind(keyhawk.KEY.CTRL, keyhawk.KEY.SPACE);

		chai.expect(crouchJump.keys).to.deep.equal({ control: true, ' ': true }) && chai.expect(crouchJump._delay).to.equal(0);

		done();
	});

	it('should create a new keybind with a 5 second delay', done => {
		const moveForward = keyhawk.keybind(keyhawk.KEY.W).delay(5000);

		chai.expect(moveForward.keys).to.deep.equal({ w: true }) && chai.expect(moveForward._delay).to.equal(5000) && chai.expect(moveForward._lastUsed).to.equal(-4999);

		done();
	});

	it('should create a new keybind with a simple callback method', done => {
		const moveForward = keyhawk.keybind(keyhawk.KEY.W).action(helloWorld);

		chai.expect(moveForward._action.toString()).to.deep.equal(helloWorld.toString());

		done();
	});
});

/**
 * Used to add as a callback method to keybinds.
 */
function helloWorld() {
	return 'Hello World!';
}