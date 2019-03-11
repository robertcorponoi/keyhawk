'use strict'

import Keyhawk from '../keyhawk.js';

let keyhawk;

describe('Creating a new keybind', () => {

  beforeEach(() => {

    keyhawk = new Keyhawk();

  });

  afterEach(() => {

    keyhawk = null;

  });

  it('should create a new keybind with one key', (done) => {

    const moveLeft = keyhawk.keybind(keyhawk.KEY.A);

    chai.expect(moveLeft.keys).to.deep.equal({ a: true }) &&

      chai.expect(moveLeft._delay).to.equal(0);

    done();

  });

  it('should create a new keybind with multiple keys', (done) => {

    const crouchJump = keyhawk.keybind(keyhawk.KEY.CTRL, keyhawk.KEY.SPACE);

    chai.expect(crouchJump.keys).to.deep.equal({ control: true, ' ': true }) &&

      chai.expect(crouchJump._delay).to.equal(0);

    done();

  });

  it('should create a new keybind with a 5 second delay', (done) => {

    const moveForward = keyhawk.keybind(keyhawk.KEY.W).delay(5000);

    chai.expect(moveForward.keys).to.deep.equal({ w: true }) &&

      chai.expect(moveForward._delay).to.equal(5000) &&

      chai.expect(moveForward._lastActive).to.equal(-4999);

    done();

  });

});

describe('Keydown and keyup event handling', () => {

  beforeEach(() => {

    keyhawk = new Keyhawk();

  });

  afterEach(() => {

    keyhawk = null;

  });

  it('should set the keys of the keybind to true when pressed', (done) => {

    const jump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.W, keyhawk.KEY.SEVEN);

    simKey(' ');
    simKey('w');
    simKey('7');

    setTimeout(function () {

      chai.expect(keyhawk._pressed).to.deep.equal({ ' ': true, w: true, 7: true });

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

      chai.expect(keyhawk._pressed).to.deep.equal({ ' ': false, w: false, 7: false });

      done();

    }, 1000);

  });

});

describe('Using a keybind', () => {

  beforeEach(() => {

    keyhawk = new Keyhawk();

  });

  afterEach(() => {

    keyhawk = null;

  });

  it('should run the single key keybind when the key is pressed', (done) => {

    const moveLeft = keyhawk.keybind(keyhawk.KEY.A);

    simKey('a');

    setTimeout(function () {

      chai.expect(moveLeft._lastActive).to.be.greaterThan(0) &&

      chai.expect(keyhawk._pressed).to.deep.equal({ a: true });

      done();

    }, 1000);

  });

  it('should run the multiple key keybind when the keys are pressed', (done) => {

    const crouchJump = keyhawk.keybind(keyhawk.KEY.SPACE, keyhawk.KEY.CTRL);

    simKey(' ');
    simKey('Control');

    setTimeout(function () {

      chai.expect(crouchJump._lastActive).to.be.greaterThan(0) &&

      chai.expect(keyhawk._pressed).to.deep.equal({ ' ': true, 'control': true });

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

      chai.expect(crouchJump._lastActive).to.be.greaterThan(5000) &&

      chai.expect(crouchJump._lastActive).to.be.lessThan(6000);

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