function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Contains a list of keys that can be used to create keybinds.
 * 
 * @version 0.1.0
 */

var Key = {
  ESC: 'escape',
  F1: 'f1',
  F2: 'f2',
  F3: 'f3',
  F4: 'f4',
  F5: 'f5',
  F6: 'f6',
  F7: 'f7',
  F8: 'f8',
  F9: 'f9',
  F10: 'f10',
  F11: 'f11',
  F12: 'f12',
  SCROLL_LOCK: 'scrolllock',
  PAUSE: 'pause',
  TILDE: '`',
  ONE: '1',
  EXCLAMATION_POINT: '!',
  EXCLAMATION_MARK: '!',
  TWO: '2',
  AT: '@',
  THREE: '3',
  POUND: '#',
  NUMBER_SIGN: '#',
  HASH: '#',
  FOUR: '4',
  DOLLAR_SIGN: '$',
  FIVE: '5',
  PERCENT: '%',
  SIX: '6',
  CARET: '^',
  SEVEN: '7',
  AMPERSAND: '&',
  AND: '&',
  EIGHT: '8',
  ASTERISK: '*',
  MULTIPLY: '*',
  MULTIPLICATION: '*',
  NINE: '9',
  LEFT_PARENTHESES: '(',
  LEFT_ROUND_BRACKET: '(',
  ZERO: '0',
  RIGHT_PARENTHESES: ')',
  RIGHT_ROUND_BRACKET: ')',
  DASH: '-',
  MINUS: '-',
  SUBTRACT: '-',
  SUBTRACTION: '-',
  UNDERSCORE: '_',
  EQUALS: '=',
  EQUAL: '=',
  PLUS: '+',
  ADD: '+',
  ADDITION: '+',
  BACKSPACE: 'backspace',
  TAB: 'tab',
  CAPS_LOCK: 'capslock',
  SPACE: ' ',
  ENTER: 'enter',
  CTX: 'contextmenu',
  CONTEXT: 'contextmenu',
  CONTEXT_MENU: 'contextmenu',
  LEFT_BRACKET: '[',
  LEFT_SQUARE_BRACKET: '[',
  LEFT_BRACE: '{',
  RIGHT_BRACKET: ']',
  RIGHT_SQUARE_BRACKET: ']',
  RIGHT_BRACE: '}',
  BACK_SLASH: '\\',
  VERTICAL_SLASH: '|',
  UPRIGHT_SLASH: '|',
  SEMICOLON: ';',
  COLON: ':',
  SINGLE_QUOTATION_MARK: "'",
  DOUBLE_QUOATION_MARK: '"',
  COMMA: ',',
  LESS_THAN: '<',
  LEFT_ANGLE_BRACKET: '<',
  PERIOD: '.',
  DOT: '.',
  GREATER_THAN: '>',
  RIGHT_ANGLE_BRACKET: '>',
  FORWARD_SLASH: '/',
  DIVIDE: '/',
  DIVISION: '/',
  QUESTION_MARK: '?',
  INSERT: 'insert',
  HOME: 'home',
  PAGE_UP: 'pageup',
  DELETE: 'delete',
  END: 'end',
  PAGE_DOWN: 'pagedown',
  ARROW_UP: 'arrowup',
  ARROW_LEFT: 'arrowleft',
  ARROW_DOWN: 'arrowdown',
  ARROW_RIGHT: 'arrowright',
  NUM_LOCK: 'numlock',
  ALT: 'alt',
  META: 'meta',
  CTRL: 'control',
  SHIFT: 'shift',
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z'
};

/**
 * A keybind represents one key or a combination of keys that perform an action.
 * 
 * Keybinds can have an optional callback that is run during the `check` method either automatically 
 * or in your own game loop.
 * 
 * Keybinds can also have a delay to ensure that a certain amount of time has passed between presses.
 * 
 * @version 0.1.0
 */
var Keybind =
/*#__PURE__*/
function () {
  /**
   * The keys that are assigned to this keybind.
   * 
   * @since 0.1.0
    * 
   * @private
   * 
   * @property {KeybindObject}
   */

  /**
   * The callback method to run when this keybind is used.
   * 
   * @since 0.1.0
    * 
    * @private
   * 
   * @property {Function}
   * 
   * @default this.noop
   */

  /**
   * A delay to set between uses of this keybind in case it shouldn't
   * be able to be spammed.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The last time that this keybind was used.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * @param {KeybindObject} keys The keys to bind to this keybind.
   */
  function Keybind(keys) {
    _classCallCheck(this, Keybind);

    _defineProperty(this, "_keys", void 0);

    _defineProperty(this, "_action", this.noop);

    _defineProperty(this, "_delay", 0);

    _defineProperty(this, "_lastUsed", 0);

    this._keys = keys;
  }
  /**
   * Gets the keys that are a part of this keybind.
   * 
   * @since 0.1.0
   * 
   * @returns {KeybindObject}
   */


  _createClass(Keybind, [{
    key: "delay",

    /**
     * Sets the delay between keybind uses.
     * 
     * @since 0.1.0
     * 
     * @param {number} ms The time in milliseconds to delay use.
     * 
     * @returns {Keybind} Returns this for chaining.
     */
    value: function delay(ms) {
      this._delay = ms;
      this._lastUsed = -this._delay + 1;
      return this;
    }
    /**
     * Sets the callback method that will be run when this keybind is active.
     * 
     * @since 0.1.0
     * 
     * @param {Function} fn The callback method to use.
     * 
     * @returns {Keybind} Returns this for chaining.
     */

  }, {
    key: "action",
    value: function action(fn) {
      this._action = fn;
      return this;
    }
    /**
     * Run the action associated with this keybind.
     * 
     * @since 0.1.0
     * 
     * @param {number} time The time that the keybind was used.
     */

  }, {
    key: "run",
    value: function run(time) {
      this._action();

      this._lastUsed = time;
    }
    /**
     * An empty method to use as the default action for the keybind in case no action is added.
     * 
     * @since 0.1.0
     * @private
     */

  }, {
    key: "noop",
    value: function noop() {}
  }, {
    key: "keys",
    get: function get() {
      return this._keys;
    }
    /**
     * Gets the last time that this keybind was used.
     * 
     * @since 0.1.0
     * 
     * @returns {number}
     */

  }, {
    key: "lastUsed",
    get: function get() {
      return this._lastUsed;
    }
  }]);

  return Keybind;
}();

var Options =
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

/**
 * @param {Object} options The initialization options passed to Keyhawk.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "useLoop", true);

  Object.assign(this, options);
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Options_1 = createCommonjsModule(function (module, exports) {
/**
 * Defines the options available for an instance of Deltaframe along with their default
 * values if any exist.
 * 
 * @since 1.0.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/*#__PURE__*/
function () {
  /**
   * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the
    * problem.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default 15
   */

  /**
   * The fps that the game loop should aim to  achieve.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default 60
   */

  /**
   * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will 
    * restart before stopping permanently.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run for.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default false
   */

  /**
    * @param {Object} options The initialization options passed to Deltaframe.
    */
  function Options() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Options);

    _defineProperty(this, "minFps", 15);

    _defineProperty(this, "targetFps", 60);

    _defineProperty(this, "maxRestartAttempts", Infinity);

    _defineProperty(this, "runTime", Infinity);

    _defineProperty(this, "forceSetTimeout", false);

    Object.assign(this, options);
  }
  /**
   * Return the minFps as a decimal representing the amount of time before a frame should occur.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */


  _createClass(Options, [{
    key: "minFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.minFps);
    }
    /**
     * Return the targetFps as a decimal representing the amount of time before a frame should occur.
     * 
     * @since 1.0.0
     * 
     * @returns {number}
     */

  }, {
    key: "targetFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.targetFps);
    }
  }]);

  return Options;
}();

exports["default"] = Options;

});

unwrapExports(Options_1);

var RequestAnimationFrame_1 = createCommonjsModule(function (module, exports) {
/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe itself does 
 * not have to worry about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the user's browser 
 * and forces setTimeout if desired.
 * 
 * @since 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RequestAnimationFrame =
/*#__PURE__*/
function () {
  /**
   * A reference to the id returned by requestAnimationFrame or setTimeout so 
   * that we can cancel their operation when needed.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * Keeps track of whether the loop is already running or not so it's not accidently 
   * restarted.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * The function that should be run on every update of the loop.
   * 
   * @since 0.1.0
   * 
   * @property {Function}
   * 
   * @default ()=>{}
   */

  /**
   * Indicates whether setTImeout is being used instead of requestAnimationFrame.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * 
   * @default false
   */
  function RequestAnimationFrame() {
    _classCallCheck(this, RequestAnimationFrame);

    _defineProperty(this, "id", 0);

    _defineProperty(this, "running", false);

    _defineProperty(this, "fn", function () {});

    _defineProperty(this, "usingSetTimeout", false);

    /**
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none are 
     * supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame|setTimeout}
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are supported, 
     * then setTimeout was used and so we use clearTimeout instead.
     * 
     * @property {cancelAnimationFrame}
     */


    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function () {
      clearTimeout(this.id);
    };
  }
  /**
   * Start the operation of the requestAnimationFrame or setTimeout loop.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to run every update of the loop.
   * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
   */


  _createClass(RequestAnimationFrame, [{
    key: "start",
    value: function start(fn, forceSetTimeout) {
      var _this = this;

      if (this.running) return;
      this.running = true;
      this.fn = fn;

      if (forceSetTimeout) {
        this.usingSetTimeout = true;
        this.updateTimeout();
      } else {
        window.requestAnimationFrame(function (time) {
          return _this.updateRAF(time);
        });
      }
    }
    /**
     * Call requestAnimationFrame recursively so that the loop keeps going and
     * also send the timestamps over to Deltaframe.
     * 
     * @since 0.1.0
     * 
     * @param {number} timestamp The timestamp from the most recent requestAnimationFrame request.
     */

  }, {
    key: "updateRAF",
    value: function updateRAF(timestamp) {
      var _this2 = this;

      this.running = true;
      this.fn(timestamp);
      this.id = window.requestAnimationFrame(function (time) {
        return _this2.updateRAF(time);
      });
    }
    /**
     * Call setTimeout recursively so that the loop keeps going and also send
     * the timestamps over to Deltaframe.
     * 
     * @since 0.1.0
     */

  }, {
    key: "updateTimeout",
    value: function updateTimeout() {
      var _this3 = this;

      var timestamp = window.performance.now();
      this.fn(timestamp);
      this.id = window.setTimeout(function () {
        return _this3.updateTimeout();
      }, 1000 / 60);
    }
    /**
     * Restart the requestAnimation or setTimeout loop.
     * 
     * @since 0.1.0
     */

  }, {
    key: "restart",
    value: function restart() {
      var _this4 = this;

      if (this.usingSetTimeout) window.clearTimeout(this.id);else window.cancelAnimationFrame(this.id);
      this.id = 0;
      this.running = false;
      if (this.usingSetTimeout) this.updateTimeout();else window.requestAnimationFrame(function (time) {
        return _this4.updateRAF(time);
      });
      this.running = true;
    }
    /**
     * Stop the loop by calling cancelAnimationFrame or clearTimeout.
     * 
     * @since 0.1.0
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.usingSetTimeout) window.clearTimeout(this.id);else window.cancelAnimationFrame(this.id);
      this.id = 0;
      this.running = false;

      this.fn = function () {};

      return;
    }
  }]);

  return RequestAnimationFrame;
}();

exports["default"] = RequestAnimationFrame;

});

unwrapExports(RequestAnimationFrame_1);

var deltaframe = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(Options_1);

var _RequestAnimationFrame = _interopRequireDefault(RequestAnimationFrame_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Deltaframe is an animation and game loop manager that makes sure your application
 * is punctual and performant.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.2
 */
var Deltaframe =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance of Deltaframe.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Options}
   */

  /**
   * The amount of times Deltaframe has had to restart due to the average fps
   * dipping below the minimum fps for a series of frames.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether Deltaframe is currently is currently running and not paused
   * or stopped.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {boolean}
   */

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Function}
   */

  /**
   * The current frame that Deltaframe is on.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * The average difference in time between frames.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're 
   * on so we can reset to 0 once were at 10.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {RequestAnimationFrame}
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @since 1.0.0
   * @private
   * 
   * @property {document.hidden}
   */

  /**
   * @param {Object} [options] The options to pass to this Deltaframe instance.
   * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe will restart to try to correct the issue.
   * @param {number} [options.targetFps=60] The fps that Deltaframe should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe will restart due to problems before stopping entirely.
   * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe will run. This can be used to create an animation that lasts a specific amount of time.
   * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe will use setTimeout for the loop instead of requestAnimationFrame.
   */
  function Deltaframe(options) {
    _classCallCheck(this, Deltaframe);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_restartAttempts", void 0);

    _defineProperty(this, "_running", void 0);

    _defineProperty(this, "_paused", void 0);

    _defineProperty(this, "_fn", void 0);

    _defineProperty(this, "_frame", void 0);

    _defineProperty(this, "_time", void 0);

    _defineProperty(this, "_prevTime", void 0);

    _defineProperty(this, "_delta", void 0);

    _defineProperty(this, "_deltaAverage", void 0);

    _defineProperty(this, "_deltaHistory", void 0);

    _defineProperty(this, "_deltaIndex", void 0);

    _defineProperty(this, "_raf", void 0);

    _defineProperty(this, "_hidden", void 0);

    this._options = new _Options["default"](options);
    this._restartAttempts = 0;
    this._running = false;
    this._paused = false;

    this._fn = function () {};

    this._frame = 0;
    this._time = 0;
    this._prevTime = 0;
    this._delta = 0;
    this._deltaAverage = 0;
    this._deltaHistory = [];
    this._deltaIndex = 0;
    this._raf = new _RequestAnimationFrame["default"]();
    this._hidden = document.hidden;

    this._boot();
  }
  /**
   * Return the number of times that Deltafram has restarted.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */


  _createClass(Deltaframe, [{
    key: "start",

    /**
     * Start the loop.
     * 
     * @since 0.1.0
     * 
     * @param {Function} fn The function to be called every step by the loop.
     */
    value: function start(fn) {
      var _this = this;

      this._fn = fn;
      this._prevTime = 0;
      this._running = true;

      this._raf.start(function (timestamp) {
        return _this._update(timestamp);
      }, this._options.forceSetTimeout);
    }
    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     * 
     * @since 0.1.0
     */

  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      this._running = false;
    }
    /**
     * Resume the loop from a paused state.
     * 
     * @since 0.1.0
     */

  }, {
    key: "resume",
    value: function resume() {
      this._paused = false;
      this._prevTime = window.performance.now();
      this._running = true;
    }
    /**
     * Stop the loop and reset all time values of Deltaframe.
     * 
     * @since 0.1.0
     */

  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._restartAttempts = 0;
      this._running = false;
      this._paused = false;

      this._fn = function () {};

      this._frame = 0;
      this._time = 0;
      this._prevTime = 0;
      this._delta = 0;
      this._deltaHistory = [];
      this._deltaIndex = 0;
      document.removeEventListener('visibilitychange', function () {
        return _this2._visibilityChange;
      });

      this._raf.stop();

      return;
    }
    /**
     * Initialize the page visibility events which will let us save resources by pausing
     * our updates when the user is not interacting with the page running Deltaframe.
     * 
     * @since 0.1.0
     * @private
     */

  }, {
    key: "_boot",
    value: function _boot() {
      var _this3 = this;

      document.addEventListener('visibilitychange', function () {
        return _this3._visibilityChange;
      });
    }
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop 
     * or roughly 60 times per second using setTimeout.
     * 
     * @since 0.1.0
     * @private
     * 
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */

  }, {
    key: "_update",
    value: function _update(timestamp) {
      if (this._paused) return;

      if (timestamp >= this._options.runTime) {
        this.stop();
        return;
      }

      this._time = timestamp;
      this._delta = timestamp - this._prevTime;
      if (this._deltaIndex === 10) this._deltaIndex = 0;
      this._deltaHistory[this._deltaIndex] = this._delta;
      this._deltaIndex++;
      var mean = 0;

      for (var i = 0; i < this._deltaHistory.length; ++i) {
        mean += this._deltaHistory[i];
      }

      mean /= 10;
      this._deltaAverage = mean;

      if (this._deltaAverage >= this._options.minFpsCalc) {
        if (this._restartAttempts === this._options.maxRestartAttempts) {
          this.stop();
          return;
        }

        this._raf.restart();

        this._restartAttempts++;
      }

      if (this._deltaAverage >= this._options.targetFpsCalc) {
        this._frame++;

        this._fn(timestamp, this._delta, this._deltaAverage);

        this._prevTime = timestamp;
      }
    }
    /**
     * When the the user has switched to a different tab and is not on the same page that
     * Deltaframe is running on, Deltaframe will pause and when the user comes back it will resume.
     * 
     * @since 0.2.0
     * @private
     */

  }, {
    key: "_visibilityChange",
    value: function _visibilityChange() {
      var visibility = document.visibilityState;
      if (visibility === 'visible') this.resume();else if (visibility === 'hidden') this.pause();
    }
  }, {
    key: "timesRestarted",
    get: function get() {
      return this._restartAttempts;
    }
    /**
     * Returns if Deltaframe is running or not.
     * 
     * @since 1.0.0
     * 
     * @returns {boolean}
     */

  }, {
    key: "isRunning",
    get: function get() {
      return this._running;
    }
    /**
     * Returns if Deltaframe is paused or not.
     * 
     * @since 0.1.0
     * 
     * @returns {boolean}
     */

  }, {
    key: "isPaused",
    get: function get() {
      return this._paused;
    }
    /**
     * Returns the current frame.
     * 
     * @since 1.0.0
     * 
     * @returns {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
  }]);

  return Deltaframe;
}();

exports["default"] = Deltaframe;

});

var Deltaframe = unwrapExports(deltaframe);

/**
 * Create keybinds easily with single and multi key support
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.5
 */

var Keyhawk =
/*#__PURE__*/
function () {
  /**
   * The selected options for Keyhawk.
   * 
   * @since 1.0.0
   * 
   * @property {Options}
   * 
    * @private
   */

  /**
   * A list of keys that can be selected to be used in keybinds.
   * 
   * @since 0.1.0
   * 
    * @private
   */

  /**
   * A list of the created keybinds.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Keybind>}
    * 
    * @private
   */

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

  /**
   * Keeps track of what keys have been pressed.
   * 
   * @since 0.1.0
    * 
   * @private
   * 
   * @property {Object}
   */

  /**
   * Indicates whether using keybinds is currently disabled or not.
   * 
   * @since 1.0.5
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The amount of time that keybinds are disabled for, if any.
   * 
   * @since 1.0.5
   * 
   * @private
   * 
   * @property {number} 
   */

  /**
   * @param {Object} [options]
   * @param {boolean} [options.useLoop=true] By default Keyhawk will use the Deltaframe module to handle the checking of keybind uses. If you would like to use your own game loop or even just rather use a simple debounce method, you can set this to false.
   */
  function Keyhawk() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Keyhawk);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "KEY", Key);

    _defineProperty(this, "keybinds", []);

    _defineProperty(this, "loop", null);

    _defineProperty(this, "pressed", {});

    _defineProperty(this, "disabled", false);

    _defineProperty(this, "disabledTime", 0);

    this.options = new Options(options);
    this.boot();
  }
  /**
   * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
   * 
   * @since 0.1.0
   * 
   * @private
   */


  _createClass(Keyhawk, [{
    key: "boot",
    value: function boot() {
      var _this = this;

      window.addEventListener('keydown', function (ev) {
        return _this.keydown(ev);
      });
      window.addEventListener('keyup', function (ev) {
        return _this.keyup(ev);
      });

      if (this.options.useLoop) {
        this.loop = new Deltaframe({});
        this.loop.start(function (time) {
          return _this.check(time);
        });
      }
    }
    /**
     * Creates a new keybind with the specified keys.
     * 
     * @since 0.1.0
     * 
     * @param {...string} keys One or more keys from the `KEYS` property to attach to this keybind.
     * 
     * @returns {Keybind} Returns the newly created keybind.
     */

  }, {
    key: "keybind",
    value: function keybind() {
      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      if (!keys) {
        console.warn('At least one key must be provided to create a keybind');
        return;
      }

      var keyObj = {};

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        keyObj[key] = true;
      }

      var keybind = new Keybind(keyObj);
      this.keybinds.push(keybind);
      return keybind;
    }
    /**
     * Checks to see which key conditions are currently being met and runs the keybind's attached callback method.
     * 
     * @since 0.1.0
      * 
      * @param {number} time The current timestamp which is used to check for delays and is passed to the keybind's callback method.
     */

  }, {
    key: "check",
    value: function check(time) {
      var _this2 = this;

      this.keybinds.forEach(function (o) {
        var isActive = Object.entries(o.keys).every(function (arr) {
          return _this2.pressed[arr[0]] == arr[1];
        });
        var isTime = time - o._lastUsed > o._delay;

        if (_this2.disabled) {
          if (time < time + _this2.disabledTime) return;else _this2.resetDisabled();
        }

        if (isActive && isTime) o.run(time);
      });
    }
    /**
     * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
     * 
     * @since 1.0.5
     * 
     * @param {number} [lengthOfTime=Infinity] An optional amount of time to wait until keybinds are automatically enabled again. 
     */

  }, {
    key: "disable",
    value: function disable() {
      var lengthOfTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      this.disabled = true;
      this.disabledTime = lengthOfTime;
    }
    /**
     * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
     * keybinds again.
     * 
     * @since 1.0.5 
     */

  }, {
    key: "enable",
    value: function enable() {
      this.resetDisabled();
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
     * 
     * @since 0.1.0
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "keydown",
    value: function keydown(event) {
      this.pressed[event.key.toLowerCase()] = true;
      event.preventDefault();
      return;
    }
    /**
     * When a key is released, set its property in the `pressed` object to `false`.
     * 
     * @since 0.1.0
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "keyup",
    value: function keyup(event) {
      this.pressed[event.key.toLowerCase()] = false;
      event.preventDefault();
      return;
    }
    /**
     * Resets both disabled properties, disabled to false and disabled time to 0 when keybinds are enabled
     * again after being disabled.
     * 
     * @since 1.0.5
     * 
     * @private
     */

  }, {
    key: "resetDisabled",
    value: function resetDisabled() {
      this.disabled = false;
      this.disabledTime = 0;
    }
  }]);

  return Keyhawk;
}();

export default Keyhawk;
