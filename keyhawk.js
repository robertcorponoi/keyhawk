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
 */
var Keybind =
/*#__PURE__*/
function () {
  /**
   * The keys that are assigned to this keybind.
    * 
   * @private
   * 
   * @property {KeybindObject}
   */

  /**
   * The callback method to run when this keybind is used.
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
   * @property {number}
   * 
   * @default 0
   */

  /**
   * A delay to be set before the keybind can even be used at all.
   * 
   * @property {number}
   * 
   * @default 0
   */

  /**
   * The last time that this keybind was used.
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

    _defineProperty(this, "_action", this._noop);

    _defineProperty(this, "_delay", 0);

    _defineProperty(this, "_initialDelay", 0);

    _defineProperty(this, "_lastUsed", 0);

    this._keys = keys;
  }
  /**
   * Gets the keys that are a part of this keybind.
   * 
   * @returns {KeybindObject}
   */


  _createClass(Keybind, [{
    key: "delay",

    /**
     * Sets the delay between keybind uses.
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
     * Sets the initial delay before the keybind can be used for the first time.
     * 
     * @param {number} ms The time in milliseconds before the keybind can be used.
     * 
     * @returns {Keybind} Retursn this for chaining.
     */

  }, {
    key: "initialDelay",
    value: function initialDelay(ms) {
      this._initialDelay = ms;
      return this;
    }
    /**
     * Sets the callback method sthat will be run when this keybind is active.
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
     * @private
     */

  }, {
    key: "_noop",
    value: function _noop() {}
  }, {
    key: "keys",
    get: function get() {
      return this._keys;
    }
    /**
     * Gets the last time that this keybind was used.
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

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
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

var Options$1 =
/*#__PURE__*/
function () {
  /**
   * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the problem.
   * 
   * @property {number}
    * 
    * @default 15
   */

  /**
   * The fps that the game loop should aim to  achieve.
   * 
   * @property {number}
    * 
    * @default 60
   */

  /**
   * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will  restart before stopping permanently.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run for.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
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

    _classCallCheck$1(this, Options);

    _defineProperty$1(this, "minFps", 15);

    _defineProperty$1(this, "targetFps", 60);

    _defineProperty$1(this, "maxRestartAttempts", Infinity);

    _defineProperty$1(this, "runTime", Infinity);

    _defineProperty$1(this, "forceSetTimeout", false);

    Object.assign(this, options);
  }
  /**
   * Return the minFps as a decimal representing the amount of time before a frame should occur.
   * 
   * @returns {number}
   */


  _createClass$1(Options, [{
    key: "minFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.minFps);
    }
    /**
     * Return the targetFps as a decimal representing the amount of time before a frame should occur.
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

var TaskOptions =
/**
 * Specifies the time in between runs.
 * 
 * @property {number}
 * 
 * @default 1000
 */

/**
 * A delay before running the task for the first time.
 * 
 * @property {number}
 * 
 * @default 0
 */

/**
 * Specify this to have the task be destroyed after being run the specified amount of times.
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The options passed when creating a new task.
 */
function TaskOptions(options) {
  _classCallCheck$1(this, TaskOptions);

  _defineProperty$1(this, "interval", 1000);

  _defineProperty$1(this, "delay", 0);

  _defineProperty$1(this, "timesToRun", Infinity);

  Object.assign(this, options);
};

/**
 * Defines a task that can be created and added to the task manager.
 */

var Task =
/*#__PURE__*/
function () {
  /**
   * The name of this task.
   * 
   * @property {string}
   */

  /**
   * A reference to the function to call when this task is run.
   * 
   * @property {Function}
   */

  /**
   * A reference to the options for this task.
   * 
   * @property {TaskOptions}
   */

  /**
   * The number of times that this task has been run.
   * 
   * @property {number}
   */

  /**
   * The time this task was last run at.
   * 
   * @property {number}
   */

  /**
   * @param {string} name The name of this task.
   * @param {Function} fn The function to call when this task is run.
   * @param {Object} options The options for this task.
   */
  function Task(name, fn, options) {
    _classCallCheck$1(this, Task);

    _defineProperty$1(this, "name", void 0);

    _defineProperty$1(this, "fn", void 0);

    _defineProperty$1(this, "options", void 0);

    _defineProperty$1(this, "timesRun", 0);

    _defineProperty$1(this, "lastRunAt", 0);

    this.name = name;
    this.fn = fn;
    this.options = new TaskOptions(options);
  }
  /**
   * Runs the function associated with this task.
   */


  _createClass$1(Task, [{
    key: "run",
    value: function run() {
      this.fn();
      this.timesRun++;
    }
  }]);

  return Task;
}();

/**
 * The task manager is used to add and manage tasks that are supposed to run at specific times, on repeat, or a 
 * predetermined number of times.
 */

var TaskManager =
/*#__PURE__*/
function () {
  function TaskManager() {
    _classCallCheck$1(this, TaskManager);

    _defineProperty$1(this, "_active", []);
  }

  _createClass$1(TaskManager, [{
    key: "addTask",

    /**
     * Adds a task to the task manager.
     * 
     * @param {string} name The name of the task to add.
     * @param {string} fn The function to call when this task is run.
     * @param {Object} [options]
     * @param {number} [options.interval=1000] Specifies the time in between runs.
     * @param {number} [options.delay=0] A delay before running the task for the first time.
     * @param {number} [options.timesToRun=Infinity] Specify this to have the task be destroyed after being run the specified amount of times.
     */
    value: function addTask(name, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var task = new Task(name, fn, options);

      this._active.push(task);
    }
    /**
     * Removes a task by its name.
     * 
     * @param {string} name The name of the task to remove.
     */

  }, {
    key: "removeTask",
    value: function removeTask(name) {
      this._active = this._active.filter(function (task) {
        return task.name !== name;
      });
    }
    /**
     * Checks to see if any tasks need to be run and runs them if so.
     * 
     * This will also remove tasks if they are no longer needed.
     * 
     * @param {number} time The current timestamp.
     */

  }, {
    key: "update",
    value: function update(time) {
      var _this = this;

      this.active.map(function (task) {
        if (time > task.options.delay && time - task.lastRunAt >= task.options.interval) {
          task.run();
          task.lastRunAt = time;
          if (task.timesRun > task.options.timesToRun) _this.removeTask(task.name);
        }
      });
    }
  }, {
    key: "active",

    /**
     * Returns all of the active tasks.
     * 
     * @returns {Array<Tas>}
     */
    get: function get() {
      return this._active;
    }
  }]);

  return TaskManager;
}();

var RequestAnimationFrame =
/*#__PURE__*/
function () {
  /**
   * A reference to the id returned by requestAnimationFrame or setTimeout so  that we can cancel their operation when needed.
   * 
   * @property {number}
   */

  /**
   * Keeps track of whether the loop is already running or not so it's not accidently restarted.
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * The function that should be run on every update of the loop.
   * 
   * @property {Function}
   * 
   * @default ()=>{}
   */

  /**
   * Indicates whether setTImeout is being used instead of requestAnimationFrame.
   * 
   * @property {boolean}
   * 
   * @default false
   */
  function RequestAnimationFrame() {
    _classCallCheck$1(this, RequestAnimationFrame);

    _defineProperty$1(this, "id", 0);

    _defineProperty$1(this, "running", false);

    _defineProperty$1(this, "fn", function () {});

    _defineProperty$1(this, "usingSetTimeout", false);

    /**
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none are  supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame|setTimeout}
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are supported,  then setTimeout was used 
     * and so we use clearTimeout instead.
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
   * @param {Function} fn The function to run every update of the loop.
   * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
   */


  _createClass$1(RequestAnimationFrame, [{
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
     * Call requestAnimationFrame recursively so that the loop keeps going and also send the timestamps over to Deltaframe.
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
     * Call setTimeout recursively so that the loop keeps going and also send the timestamps over to Deltaframe.
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

/**
 * Deltaframe is an animation and game loop manager that makes sure your application is punctual and performant.
 */

var Deltaframe =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance of Deltaframe.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
   * The amount of times Deltaframe has had to restart due to the average fps dipping below the minimum fps for a 
   * series of frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether Deltaframe is currently is currently running and not pausedor stopped.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @private
   * 
   * @property {Function}
   */

  /**
   * The current frame that Deltaframe is on.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The average difference in time between frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're  on so we can reset to 0 once were at 10.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @private
   * 
   * @property {RequestAnimationFrame}
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @private
   * 
   * @property {document.hidden}
   */

  /**
   * A reference to the task manager.
   * 
   * @private
   * 
   * @property {TaskManager}
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
    _classCallCheck$1(this, Deltaframe);

    _defineProperty$1(this, "_options", void 0);

    _defineProperty$1(this, "_restartAttempts", void 0);

    _defineProperty$1(this, "_running", void 0);

    _defineProperty$1(this, "_paused", void 0);

    _defineProperty$1(this, "_fn", void 0);

    _defineProperty$1(this, "_frame", void 0);

    _defineProperty$1(this, "_time", void 0);

    _defineProperty$1(this, "_prevTime", void 0);

    _defineProperty$1(this, "_delta", void 0);

    _defineProperty$1(this, "_deltaAverage", void 0);

    _defineProperty$1(this, "_deltaHistory", void 0);

    _defineProperty$1(this, "_deltaIndex", void 0);

    _defineProperty$1(this, "_raf", void 0);

    _defineProperty$1(this, "_hidden", void 0);

    _defineProperty$1(this, "_tasks", new TaskManager());

    this._options = new Options$1(options);
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
    this._raf = new RequestAnimationFrame();
    this._hidden = document.hidden;

    this._boot();
  }
  /**
   * Return the number of times that Deltafram has restarted.
   * 
   * @returns {number}
   */


  _createClass$1(Deltaframe, [{
    key: "start",

    /**
     * Start the loop.
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
     */

  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      this._running = false;
    }
    /**
     * Resume the loop from a paused state.
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
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not 
     * interacting with the page running Deltaframe.
     * 
     * @private
     */

  }, {
    key: "_boot",
    value: function _boot() {
      var _this3 = this;

      document.addEventListener("visibilitychange", function () {
        return _this3._visibilityChange();
      });
    }
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60 
     * times per second using setTimeout.
     * 
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

        if (this._tasks.active.length > 0) this._tasks.update(this.time);
        this._prevTime = timestamp;
      }
    }
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe 
     * will pause and when the user comes back it will resume.
     * 
     * @private
     */

  }, {
    key: "_visibilityChange",
    value: function _visibilityChange() {
      var visibility = document.visibilityState;
      if (this.isPaused && visibility === 'visible') this.resume();else if (this.isRunning && visibility === 'hidden') this.pause();
    }
  }, {
    key: "timesRestarted",
    get: function get() {
      return this._restartAttempts;
    }
    /**
     * Returns if Deltaframe is running or not.
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
     * @returns {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
    /**
     * Returns the current time.
     * 
     * @returns {DOMHighResTimeStamp|number}
     */

  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
    /**
     * Returns a reference to the task manager.
     * 
     * @returns {TaskManager}
     */

  }, {
    key: "tasks",
    get: function get() {
      return this._tasks;
    }
  }]);

  return Deltaframe;
}();

/**
 * Create keybinds easily with single and multi key support
 */

var Keyhawk =
/*#__PURE__*/
function () {
  /**
   * The selected options for Keyhawk.
   * 
   * @property {Options}
   * 
    * @private
   */

  /**
   * A list of keys that can be selected to be used in keybinds.
   * 
    * @private
   */

  /**
   * A list of the created keybinds.
   * 
   * @property {Array<Keybind>}
    * 
    * @private
   */

  /**
   * If you don't want to create your own game loop to check keykind uses on an interval, you opt in to
    * use the Deltaframe package.
   * 
   * @property {Deltaframe|null}
    * 
    * @private
   */

  /**
   * Keeps track of what keys have been pressed.
    * 
   * @private
   * 
   * @property {Object}
   */

  /**
   * Indicates whether using keybinds is currently disabled or not.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The amount of time that keybinds are disabled for, if any.
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

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_KEY", Key);

    _defineProperty(this, "_keybinds", []);

    _defineProperty(this, "_loop", null);

    _defineProperty(this, "_pressed", {});

    _defineProperty(this, "_disabled", false);

    _defineProperty(this, "_disabledTime", 0);

    this._options = new Options(options);

    this._boot();
  }
  /**
   * Returns the keys that can be used to create keybinds.
   * 
   * @returns {Keys}
   */


  _createClass(Keyhawk, [{
    key: "_boot",

    /**
     * Setup the keydown and keyup event listeners and also initialize Deltaframe if it is being used.
     * 
     * @private
     */
    value: function _boot() {
      var _this = this;

      window.addEventListener('keydown', function (ev) {
        return _this._keydown(ev);
      });
      window.addEventListener('keyup', function (ev) {
        return _this._keyup(ev);
      });

      if (this._options.useLoop) {
        this._loop = new Deltaframe({});

        this._loop.start(function (time) {
          return _this.check(time);
        });
      }
    }
    /**
     * Creates a new keybind with the specified keys.
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

      this._keybinds.push(keybind);

      return keybind;
    }
    /**
     * Checks to see which key conditions are currently being met and runs the keybind's attached callback method.
      * 
      * @param {number} time The current timestamp which is used to check for delays and is passed to the keybind's callback method.
     */

  }, {
    key: "check",
    value: function check(time) {
      var _this2 = this;

      this._keybinds.forEach(function (o) {
        var isActive = Object.entries(o.keys).every(function (arr) {
          return _this2._pressed[arr[0]] == arr[1];
        });
        var isPastInitialDelay = time > o._initialDelay;
        var isTime = time - o._lastUsed > o._delay;

        if (_this2._disabled) {
          if (time < time + _this2._disabledTime) return;else _this2._resetDisabled();
        }

        if (isActive && isPastInitialDelay && isTime) o.run(time);
      });
    }
    /**
     * Disables the use of all keybinds until enable is called or until the wait time has expired if it is provided.
     * 
     * @param {number} [lengthOfTime=Infinity] An optional amount of time to wait until keybinds are automatically enabled again. 
     */

  }, {
    key: "disable",
    value: function disable() {
      var lengthOfTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      this._disabled = true;
      this._disabledTime = lengthOfTime;
    }
    /**
     * If no end time is passed when calling the `disable` method, this method has to be called to enable the use of
     * keybinds again.
     */

  }, {
    key: "enable",
    value: function enable() {
      this._resetDisabled();
    }
    /**
     * When a key is pressed, add it to the `pressed` Object if it doesn't already exist and set it to `true`.
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "_keydown",
    value: function _keydown(event) {
      this._pressed[event.key.toLowerCase()] = true;
      event.preventDefault();
      return;
    }
    /**
     * When a key is released, set its property in the `pressed` object to `false`.
      * 
     * @private
     * 
     * @param {KeyboardEvent} event The event generated from the keypress.
     */

  }, {
    key: "_keyup",
    value: function _keyup(event) {
      this._pressed[event.key.toLowerCase()] = false;
      event.preventDefault();
    }
    /**
     * Resets both disabled properties, disabled to false and disabled time to 0 when keybinds are enabled
     * again after being disabled.
     * 
     * @private
     */

  }, {
    key: "_resetDisabled",
    value: function _resetDisabled() {
      this._disabled = false;
      this._disabledTime = 0;
    }
  }, {
    key: "KEY",
    get: function get() {
      return this._KEY;
    }
    /**
     * Returns whether keybinds are currently disabled or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
    /**
     * Returns the disabled time, if it was set.
     * 
     * @returns {number}
     */

  }, {
    key: "disabledTime",
    get: function get() {
      return this._disabledTime;
    }
  }]);

  return Keyhawk;
}();

export default Keyhawk;
