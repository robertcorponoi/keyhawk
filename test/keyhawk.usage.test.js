'use strict'

import Keyhawk from '../keyhawk.js';

let keyhawk;

describe('Using Keybinds', () => {

	beforeEach(() => keyhawk = new Keyhawk());

	afterEach(() => keyhawk = null);

	it('should run the single key keybind when the key is pressed', (done) => {

		const moveLeft = keyhawk.keybind(keyhawk.KEY.A);

		simKey('a');

		setTimeout(function () {

			chai.expect(moveLeft._lastUsed).to.be.greaterThan(0) && chai.expect(keyhawk._pressed).to.deep.equal({ a: true });

			done();

		}, 1000);

	});

	it('should run the multiple key keybind when the keys are pressed', (done) => {

		const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL);

		simKey(' ');
		simKey('Control');

		setTimeout(function () {

			chai.expect(crouchJump._lastUsed).to.be.greaterThan(0) && chai.expect(keyhawk._pressed).to.deep.equal({ ' ': true, 'control': true });

			done();

		}, 1000);

	});

	it('should run the function associated with the keybind when the keybind is used', (done) => {

		const spy = sinon.spy(testTask);

		const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy);

		simKey(' ');
		simKey('Control');

		setTimeout(() => {

			chai.expect(spy.called).to.equal(true);

			done();

		}, 1000);

	});

	it('should run the function associated with the keybind on a delay', (done) => {

		const spy = sinon.spy(testTask);

		const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy).delay(5000);

		simKey(' ');
		simKey('Control');

		setTimeout(() => {

			chai.expect(crouchJump._lastUsed).to.be.greaterThan(5000) && chai.expect(crouchJump._lastUsed).to.be.lessThan(6000);

			done();

		}, 1000);

  });

  it('should run the function associated with the keybind after the initial delay', function (done) {

    this.timeout(7000);

		const spy = sinon.spy(testTask);

		const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy).initialDelay(5000);

		simKey(' ');
		simKey('Control');

		setTimeout(() => {

      chai.expect(crouchJump._lastUsed).to.be.greaterThan(0);
			done();

		}, 6000);

  });
  
  it('should disable keybinds and not check for keybinds even when they are pressed', (done) => {

    const spy = sinon.spy(testTask);

    keyhawk.disable();

    const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy);

    simKey(' ');
    simKey('Control');

    setTimeout(() => {

      chai.expect(crouchJump._lastUsed).to.equal(0);

      done();

    }, 1000);

  });

  it('should disable keybinds and then enable them after the wait time is over', (done) => {

    const spy = sinon.spy(testTask);

    keyhawk.disable(500);

    const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy);

    simKey(' ');
    simKey('Control');

    setTimeout(() => {

      chai.expect(crouchJump._lastUsed).to.be.lessThan(10000);

      done();

    }, 1000);

  });

  it('should disable keybinds and then enable them', (done) => {

    const spy = sinon.spy(testTask);

    keyhawk.disable();

    keyhawk.enable();

    const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL).action(spy);

    simKey(' ');
    simKey('Control');

    setTimeout(() => {

      chai.expect(crouchJump._lastUsed).to.be.lessThan(20000);

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