var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e2) => e2.name !== markName) : this._entries.filter((e2) => e2.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e2) => e2.name !== measureName) : this._entries.filter((e2) => e2.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e2) => e2.entryType !== "resource" || e2.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e2) => e2.name === name && (!type || e2.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e2) => e2.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// dist/server/entry-server.js
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
__name(makeMap, "makeMap");
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var NOOP = /* @__PURE__ */ __name(() => {
}, "NOOP");
var NO = /* @__PURE__ */ __name(() => false, "NO");
var isOn = /* @__PURE__ */ __name((key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97), "isOn");
var isModelListener = /* @__PURE__ */ __name((key) => key.startsWith("onUpdate:"), "isModelListener");
var extend = Object.assign;
var remove = /* @__PURE__ */ __name((arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) arr.splice(i2, 1);
}, "remove");
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var hasOwn = /* @__PURE__ */ __name((val, key) => hasOwnProperty$1.call(val, key), "hasOwn");
var isArray$1 = Array.isArray;
var isMap = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Map]", "isMap");
var isSet = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Set]", "isSet");
var isDate = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Date]", "isDate");
var isFunction = /* @__PURE__ */ __name((val) => typeof val === "function", "isFunction");
var isString = /* @__PURE__ */ __name((val) => typeof val === "string", "isString");
var isSymbol = /* @__PURE__ */ __name((val) => typeof val === "symbol", "isSymbol");
var isObject = /* @__PURE__ */ __name((val) => val !== null && typeof val === "object", "isObject");
var isPromise = /* @__PURE__ */ __name((val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
}, "isPromise");
var objectToString = Object.prototype.toString;
var toTypeString = /* @__PURE__ */ __name((value) => objectToString.call(value), "toTypeString");
var toRawType = /* @__PURE__ */ __name((value) => {
  return toTypeString(value).slice(8, -1);
}, "toRawType");
var isPlainObject$1 = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Object]", "isPlainObject$1");
var isIntegerKey = /* @__PURE__ */ __name((key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key, "isIntegerKey");
var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var cacheStringFunction = /* @__PURE__ */ __name((fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    return cache[str] || (cache[str] = fn(str));
  });
}, "cacheStringFunction");
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (c2) => c2.slice(1).toUpperCase());
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
  return str ? `on${capitalize(str)}` : ``;
});
var hasChanged = /* @__PURE__ */ __name((value, oldValue) => !Object.is(value, oldValue), "hasChanged");
var invokeArrayFns = /* @__PURE__ */ __name((fns, ...arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) fns[i2](...arg);
}, "invokeArrayFns");
var def = /* @__PURE__ */ __name((obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
}, "def");
var looseToNumber = /* @__PURE__ */ __name((val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
}, "looseToNumber");
var _globalThis;
var getGlobalThis = /* @__PURE__ */ __name(() => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
}, "getGlobalThis");
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) for (const key in normalized) res[key] = normalized[key];
    }
    return res;
  } else if (isString(value) || isObject(value)) return value;
}
__name(normalizeStyle, "normalizeStyle");
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
__name(parseStringStyle, "parseStringStyle");
function stringifyStyle(styles) {
  if (!styles) return "";
  if (isString(styles)) return styles;
  let ret = "";
  for (const key in styles) {
    const value = styles[key];
    if (isString(value) || typeof value === "number") {
      const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
__name(stringifyStyle, "stringifyStyle");
function normalizeClass(value) {
  let res = "";
  if (isString(value)) res = value;
  else if (isArray$1(value)) for (let i2 = 0; i2 < value.length; i2++) {
    const normalized = normalizeClass(value[i2]);
    if (normalized) res += normalized + " ";
  }
  else if (isObject(value)) {
    for (const name in value) if (value[name]) res += name + " ";
  }
  return res.trim();
}
__name(normalizeClass, "normalizeClass");
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
__name(includeBooleanAttr, "includeBooleanAttr");
var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
var attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) return attrValidationCache[name];
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) console.error(`unsafe attribute name: ${name}`);
  return attrValidationCache[name] = !isUnsafe;
}
__name(isSSRSafeAttrName, "isSSRSafeAttrName");
var propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
function isRenderableAttrValue(value) {
  if (value == null) return false;
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
__name(isRenderableAttrValue, "isRenderableAttrValue");
var escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) return str;
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) html += str.slice(lastIndex, index);
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
__name(escapeHtml, "escapeHtml");
var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
__name(escapeHtmlComment, "escapeHtmlComment");
function looseCompareArrays(a2, b2) {
  if (a2.length !== b2.length) return false;
  let equal = true;
  for (let i2 = 0; equal && i2 < a2.length; i2++) equal = looseEqual(a2[i2], b2[i2]);
  return equal;
}
__name(looseCompareArrays, "looseCompareArrays");
function looseEqual(a2, b2) {
  if (a2 === b2) return true;
  let aValidType = isDate(a2);
  let bValidType = isDate(b2);
  if (aValidType || bValidType) return aValidType && bValidType ? a2.getTime() === b2.getTime() : false;
  aValidType = isSymbol(a2);
  bValidType = isSymbol(b2);
  if (aValidType || bValidType) return a2 === b2;
  aValidType = isArray$1(a2);
  bValidType = isArray$1(b2);
  if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a2, b2) : false;
  aValidType = isObject(a2);
  bValidType = isObject(b2);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) return false;
    if (Object.keys(a2).length !== Object.keys(b2).length) return false;
    for (const key in a2) {
      const aHasKey = a2.hasOwnProperty(key);
      const bHasKey = b2.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a2[key], b2[key])) return false;
    }
  }
  return String(a2) === String(b2);
}
__name(looseEqual, "looseEqual");
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
__name(looseIndexOf, "looseIndexOf");
var isRef$1 = /* @__PURE__ */ __name((val) => {
  return !!(val && val["__v_isRef"] === true);
}, "isRef$1");
var toDisplayString = /* @__PURE__ */ __name((val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
}, "toDisplayString");
var replacer = /* @__PURE__ */ __name((_key, val) => {
  if (isRef$1(val)) return replacer(_key, val.value);
  else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i2) => {
    entries[stringifySymbol(key, i2) + " =>"] = val2;
    return entries;
  }, {}) };
  else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2)) };
  else if (isSymbol(val)) return stringifySymbol(val);
  else if (isObject(val) && !isArray$1(val) && !isPlainObject$1(val)) return String(val);
  return val;
}, "replacer");
var stringifySymbol = /* @__PURE__ */ __name((v2, i2 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
}, "stringifySymbol");
function normalizeCssVarValue(value) {
  if (value == null) return "initial";
  if (typeof value === "string") return value === "" ? " " : value;
  if (typeof value !== "number" || !Number.isFinite(value)) {
  }
  return String(value);
}
__name(normalizeCssVarValue, "normalizeCssVarValue");
var activeEffectScope;
var EffectScope = class {
  static {
    __name(this, "EffectScope");
  }
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.__v_skip = true;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i2, l2;
      if (this.scopes) for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) this.scopes[i2].pause();
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) this.effects[i2].pause();
    }
  }
  /**
  * Resumes the effect scope, including all child scopes and effects.
  */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i2, l2;
        if (this.scopes) for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) this.scopes[i2].resume();
        for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) this.effects[i2].resume();
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
  * This should only be called on non-detached scopes
  * @internal
  */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
  * This should only be called on non-detached scopes
  * @internal
  */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) this.effects[i2].stop();
      this.effects.length = 0;
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) this.cleanups[i2]();
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) this.scopes[i2].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
};
function effectScope(detached) {
  return new EffectScope(detached);
}
__name(effectScope, "effectScope");
function getCurrentScope() {
  return activeEffectScope;
}
__name(getCurrentScope, "getCurrentScope");
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) activeEffectScope.cleanups.push(fn);
}
__name(onScopeDispose, "onScopeDispose");
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
  static {
    __name(this, "ReactiveEffect");
  }
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 5;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) activeEffectScope.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
  * @internal
  */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) return;
    if (!(this.flags & 8)) batch(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) removeSub(link);
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) pausedQueueEffects.add(this);
    else if (this.scheduler) this.scheduler();
    else this.runIfDirty();
  }
  /**
  * @internal
  */
  runIfDirty() {
    if (isDirty(this)) this.run();
  }
  get dirty() {
    return isDirty(this);
  }
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed2 = false) {
  sub.flags |= 8;
  if (isComputed2) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
__name(batch, "batch");
function startBatch() {
  batchDepth++;
}
__name(startBatch, "startBatch");
function endBatch() {
  if (--batchDepth > 0) return;
  if (batchedComputed) {
    let e2 = batchedComputed;
    batchedComputed = void 0;
    while (e2) {
      const next = e2.next;
      e2.next = void 0;
      e2.flags &= -9;
      e2 = next;
    }
  }
  let error3;
  while (batchedSub) {
    let e2 = batchedSub;
    batchedSub = void 0;
    while (e2) {
      const next = e2.next;
      e2.next = void 0;
      e2.flags &= -9;
      if (e2.flags & 1) try {
        e2.trigger();
      } catch (err) {
        if (!error3) error3 = err;
      }
      e2 = next;
    }
  }
  if (error3) throw error3;
}
__name(endBatch, "endBatch");
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
__name(prepareDeps, "prepareDeps");
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else head = link;
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
__name(cleanupDeps, "cleanupDeps");
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
  if (sub._dirty) return true;
  return false;
}
__name(isDirty, "isDirty");
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) return;
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) return;
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) return;
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
__name(refreshComputed, "refreshComputed");
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l2 = dep.computed.deps; l2; l2 = l2.nextDep) removeSub(l2, true);
    }
  }
  if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
}
__name(removeSub, "removeSub");
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
__name(removeDep, "removeDep");
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
__name(pauseTracking, "pauseTracking");
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
__name(resetTracking, "resetTracking");
function cleanupEffect(e2) {
  const { cleanup } = e2;
  e2.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
__name(cleanupEffect, "cleanupEffect");
var globalVersion = 0;
var Link = class {
  static {
    __name(this, "Link");
  }
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var Dep = class {
  static {
    __name(this, "Dep");
  }
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) return;
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
      else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) link.prevDep.nextDep = next;
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) activeSub.deps = next;
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
    } finally {
      endBatch();
    }
  }
};
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 20;
      for (let l2 = computed2.deps; l2; l2 = l2.nextDep) addSub(l2);
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
__name(addSub, "addSub");
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol("");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("");
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    dep.track();
  }
}
__name(track, "track");
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = /* @__PURE__ */ __name((dep) => {
    if (dep) dep.trigger();
  }, "run");
  startBatch();
  if (type === "clear") depsMap.forEach(run);
  else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) run(dep);
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
      if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
          } else if (isArrayIndex) run(depsMap.get("length"));
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
          break;
        case "set":
          if (isMap(target)) run(depsMap.get(ITERATE_KEY));
          break;
      }
    }
  }
  endBatch();
}
__name(trigger, "trigger");
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
__name(getDepFromReactive, "getDepFromReactive");
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
__name(reactiveReadArray, "reactiveReadArray");
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
__name(shallowReadArray, "shallowReadArray");
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  return toReactive(item);
}
__name(toWrapped, "toWrapped");
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(...args.map((x2) => isArray$1(x2) ? reactiveReadArray(x2) : x2));
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v2) => v2.map((item) => toWrapped(this, item)), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) result.value = wrapValue(result.value);
      return result;
    };
  }
  return iter;
}
__name(iterator, "iterator");
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) wrappedFn = /* @__PURE__ */ __name(function(item, index) {
      return fn.call(this, toWrapped(self2, item), index, self2);
    }, "wrappedFn");
    else if (fn.length > 2) wrappedFn = /* @__PURE__ */ __name(function(item, index) {
      return fn.call(this, item, index, self2);
    }, "wrappedFn");
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
__name(apply, "apply");
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = /* @__PURE__ */ __name(function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      }, "wrappedFn");
    } else if (fn.length > 3) wrappedFn = /* @__PURE__ */ __name(function(acc, item, index) {
      return fn.call(this, acc, item, index, self2);
    }, "wrappedFn");
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
__name(reduce, "reduce");
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
__name(searchProxy, "searchProxy");
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
__name(noTracking, "noTracking");
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
__name(hasOwnProperty, "hasOwnProperty");
var BaseReactiveHandler = class {
  static {
    __name(this, "BaseReactiveHandler");
  }
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") return !isReadonly2;
    else if (key === "__v_isReadonly") return isReadonly2;
    else if (key === "__v_isShallow") return isShallow2;
    else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
      if (key === "hasOwnProperty") return hasOwnProperty;
    }
    const res = Reflect.get(target, key, /* @__PURE__ */ isRef(target) ? target : receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
    if (!isReadonly2) track(target, "get", key);
    if (isShallow2) return res;
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject(res)) return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    return res;
  }
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
  static {
    __name(this, "MutableReactiveHandler");
  }
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) if (isOldValueReadonly) return true;
      else {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, /* @__PURE__ */ isRef(target) ? target : receiver);
    if (target === /* @__PURE__ */ toRaw(receiver)) {
      if (!hadKey) trigger(target, "add", key, value);
      else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
    return result;
  }
  ownKeys(target) {
    track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
  static {
    __name(this, "ReadonlyReactiveHandler");
  }
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var toShallow = /* @__PURE__ */ __name((value) => value, "toShallow");
var getProto = /* @__PURE__ */ __name((v2) => Reflect.getPrototypeOf(v2), "getProto");
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return extend(Object.create(innerIterator), { next() {
      const { value, done } = innerIterator.next();
      return done ? {
        value,
        done
      } : {
        value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
        done
      };
    } });
  };
}
__name(createIterableMethod, "createIterableMethod");
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
__name(createReadonlyMethod, "createReadonlyMethod");
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) return wrap(target.get(key));
      else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
      else if (target !== rawTarget) target.get(key);
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(instrumentations, readonly2 ? {
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear")
  } : {
    add(value) {
      const target = /* @__PURE__ */ toRaw(this);
      const proto = getProto(target);
      const rawValue = /* @__PURE__ */ toRaw(value);
      const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
      if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
        target.add(valueToAdd);
        trigger(target, "add", valueToAdd, valueToAdd);
      }
      return this;
    },
    set(key, value) {
      if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) value = /* @__PURE__ */ toRaw(value);
      const target = /* @__PURE__ */ toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
        key = /* @__PURE__ */ toRaw(key);
        hadKey = has.call(target, key);
      }
      const oldValue = get.call(target, key);
      target.set(key, value);
      if (!hadKey) trigger(target, "add", key, value);
      else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
      return this;
    },
    delete(key) {
      const target = /* @__PURE__ */ toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
        key = /* @__PURE__ */ toRaw(key);
        hadKey = has.call(target, key);
      }
      const oldValue = get ? get.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) trigger(target, "delete", key, void 0, oldValue);
      return result;
    },
    clear() {
      const target = /* @__PURE__ */ toRaw(this);
      const hadItems = target.size !== 0;
      const oldTarget = void 0;
      const result = target.clear();
      if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
      return result;
    }
  });
  [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
__name(createInstrumentations, "createInstrumentations");
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") return !isReadonly2;
    else if (key === "__v_isReadonly") return isReadonly2;
    else if (key === "__v_raw") return target;
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
__name(createInstrumentationGetter, "createInstrumentationGetter");
var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, false) };
var shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, true) };
var readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, false) };
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
__name(targetTypeMap, "targetTypeMap");
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
__name(getTargetType, "getTargetType");
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) return target;
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
__name(reactive, "reactive");
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
__name(shallowReactive, "shallowReactive");
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
__name(readonly, "readonly");
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) return target;
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
  const targetType = getTargetType(target);
  if (targetType === 0) return target;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) return existingProxy;
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
__name(createReactiveObject, "createReactiveObject");
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) return /* @__PURE__ */ isReactive(value["__v_raw"]);
  return !!(value && value["__v_isReactive"]);
}
__name(isReactive, "isReactive");
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
__name(isReadonly, "isReadonly");
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
__name(isShallow, "isShallow");
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
__name(isProxy, "isProxy");
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
__name(toRaw, "toRaw");
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
  return value;
}
__name(markRaw, "markRaw");
var toReactive = /* @__PURE__ */ __name((value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value, "toReactive");
var toReadonly = /* @__PURE__ */ __name((value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value, "toReadonly");
// @__NO_SIDE_EFFECTS__
function isRef(r2) {
  return r2 ? r2["__v_isRef"] === true : false;
}
__name(isRef, "isRef");
// @__NO_SIDE_EFFECTS__
function ref2(value) {
  return createRef(value, false);
}
__name(ref2, "ref");
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
  return createRef(value, true);
}
__name(shallowRef, "shallowRef");
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) return rawValue;
  return new RefImpl(rawValue, shallow);
}
__name(createRef, "createRef");
var RefImpl = class {
  static {
    __name(this, "RefImpl");
  }
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    this.dep.track();
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      this.dep.trigger();
    }
  }
};
function unref2(ref22) {
  return /* @__PURE__ */ isRef(ref22) ? ref22.value : ref22;
}
__name(unref2, "unref");
var shallowUnwrapHandlers = {
  get: /* @__PURE__ */ __name((target, key, receiver) => key === "__v_raw" ? target : unref2(Reflect.get(target, key, receiver)), "get"),
  set: /* @__PURE__ */ __name((target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else return Reflect.set(target, key, value, receiver);
  }, "set")
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
__name(proxyRefs, "proxyRefs");
// @__NO_SIDE_EFFECTS__
function toRefs(object) {
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) ret[key] = propertyToRef(object, key);
  return ret;
}
__name(toRefs, "toRefs");
var ObjectRefImpl = class {
  static {
    __name(this, "ObjectRefImpl");
  }
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = void 0;
    this._raw = /* @__PURE__ */ toRaw(_object);
    let shallow = true;
    let obj = _object;
    if (!isArray$1(_object) || !isIntegerKey(String(_key))) do
      shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
    while (shallow && (obj = obj["__v_raw"]));
    this._shallow = shallow;
  }
  get value() {
    let val = this._object[this._key];
    if (this._shallow) val = unref2(val);
    return this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
      const nestedRef = this._object[this._key];
      if (/* @__PURE__ */ isRef(nestedRef)) {
        nestedRef.value = newVal;
        return;
      }
    }
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(this._raw, this._key);
  }
};
function propertyToRef(source, key, defaultValue) {
  return new ObjectRefImpl(source, key, defaultValue);
}
__name(propertyToRef, "propertyToRef");
var ComputedRefImpl = class {
  static {
    __name(this, "ComputedRefImpl");
  }
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
  * @internal
  */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) link.version = this.dep.version;
    return this._value;
  }
  set value(newValue) {
    if (this.setter) this.setter(newValue);
  }
};
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) getter = getterOrOptions;
  else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter, isSSR);
}
__name(computed$1, "computed$1");
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
__name(onWatcherCleanup, "onWatcherCleanup");
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once: once2, scheduler, augmentJob, call } = options;
  const reactiveGetter = /* @__PURE__ */ __name((source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
    return traverse(source2);
  }, "reactiveGetter");
  let effect;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = /* @__PURE__ */ __name(() => source.value, "getter");
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = /* @__PURE__ */ __name(() => reactiveGetter(source), "getter");
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => /* @__PURE__ */ isReactive(s2) || /* @__PURE__ */ isShallow(s2));
    getter = /* @__PURE__ */ __name(() => source.map((s2) => {
      if (/* @__PURE__ */ isRef(s2)) return s2.value;
      else if (/* @__PURE__ */ isReactive(s2)) return reactiveGetter(s2);
      else if (isFunction(s2)) return call ? call(s2, 2) : s2();
    }), "getter");
  } else if (isFunction(source)) if (cb) getter = call ? () => call(source, 2) : source;
  else getter = /* @__PURE__ */ __name(() => {
    if (cleanup) {
      pauseTracking();
      try {
        cleanup();
      } finally {
        resetTracking();
      }
    }
    const currentEffect = activeWatcher;
    activeWatcher = effect;
    try {
      return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
    } finally {
      activeWatcher = currentEffect;
    }
  }, "getter");
  else getter = NOOP;
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = /* @__PURE__ */ __name(() => traverse(baseGetter(), depth), "getter");
  }
  const scope = getCurrentScope();
  const watchHandle = /* @__PURE__ */ __name(() => {
    effect.stop();
    if (scope && scope.active) remove(scope.effects, effect);
  }, "watchHandle");
  if (once2 && cb) {
    const _cb = cb;
    cb = /* @__PURE__ */ __name((...args) => {
      _cb(...args);
      watchHandle();
    }, "cb");
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = /* @__PURE__ */ __name((immediateFirstRun) => {
    if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue))) {
        if (cleanup) cleanup();
        const currentWatcher = activeWatcher;
        activeWatcher = effect;
        try {
          const args = [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : cb(...args);
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else effect.run();
  }, "job");
  if (augmentJob) augmentJob(job);
  effect = new ReactiveEffect(getter);
  effect.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = /* @__PURE__ */ __name((fn) => onWatcherCleanup(fn, false, effect), "boundCleanup");
  cleanup = effect.onStop = () => {
    const cleanups = cleanupMap.get(effect);
    if (cleanups) {
      if (call) call(cleanups, 4);
      else for (const cleanup2 of cleanups) cleanup2();
      cleanupMap.delete(effect);
    }
  };
  if (cb) if (immediate) job(true);
  else oldValue = effect.run();
  else if (scheduler) scheduler(job.bind(null, true), true);
  else effect.run();
  watchHandle.pause = effect.pause.bind(effect);
  watchHandle.resume = effect.resume.bind(effect);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
__name(watch$1, "watch$1");
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) return value;
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) traverse(value.value, depth, seen);
  else if (isArray$1(value)) for (let i2 = 0; i2 < value.length; i2++) traverse(value[i2], depth, seen);
  else if (isSet(value) || isMap(value)) value.forEach((v2) => {
    traverse(v2, depth, seen);
  });
  else if (isPlainObject$1(value)) {
    for (const key in value) traverse(value[key], depth, seen);
    for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
  }
  return value;
}
__name(traverse, "traverse");
var stack = [];
function pushWarningContext$1(vnode) {
  stack.push(vnode);
}
__name(pushWarningContext$1, "pushWarningContext$1");
function popWarningContext$1() {
  stack.pop();
}
__name(popWarningContext$1, "popWarningContext$1");
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
__name(callWithErrorHandling, "callWithErrorHandling");
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) res.catch((err) => {
      handleError(err, instance, type);
    });
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i2 = 0; i2 < fn.length; i2++) values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
    return values;
  }
}
__name(callWithAsyncErrorHandling, "callWithAsyncErrorHandling");
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) return;
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
__name(handleError, "handleError");
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) throw err;
  else console.error(err);
}
__name(logError, "logError");
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
function nextTick2(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
__name(nextTick2, "nextTick");
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
    else end = middle;
  }
  return start;
}
__name(findInsertionIndex$1, "findInsertionIndex$1");
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
    else queue.splice(findInsertionIndex$1(jobId), 0, job);
    job.flags |= 1;
    queueFlush();
  }
}
__name(queueJob, "queueJob");
function queueFlush() {
  if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
}
__name(queueFlush, "queueFlush");
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else pendingPostFlushCbs.push(...cb);
  queueFlush();
}
__name(queuePostFlushCb, "queuePostFlushCb");
function flushPreFlushCbs(instance, seen, i2 = flushIndex + 1) {
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) continue;
      queue.splice(i2, 1);
      i2--;
      if (cb.flags & 4) cb.flags &= -2;
      cb();
      if (!(cb.flags & 4)) cb.flags &= -2;
    }
  }
}
__name(flushPreFlushCbs, "flushPreFlushCbs");
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort((a2, b2) => getId(a2) - getId(b2));
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) cb.flags &= -2;
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
__name(flushPostFlushCbs, "flushPostFlushCbs");
var getId = /* @__PURE__ */ __name((job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id, "getId");
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (job.flags & 4) job.flags &= -2;
        callWithErrorHandling(job, job.i, job.i ? 15 : 14);
        if (!(job.flags & 4)) job.flags &= -2;
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) job.flags &= -2;
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
  }
}
__name(flushJobs, "flushJobs");
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance$1(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
__name(setCurrentRenderingInstance$1, "setCurrentRenderingInstance$1");
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) return fn;
  const renderFnWithContext = /* @__PURE__ */ __name((...args) => {
    if (renderFnWithContext._d) setBlockTracking(-1);
    const prevInstance = setCurrentRenderingInstance$1(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance$1(prevInstance);
      if (renderFnWithContext._d) setBlockTracking(1);
    }
    return res;
  }, "renderFnWithContext");
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
__name(withCtx, "withCtx");
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding2 = bindings[i2];
    if (oldBindings) binding2.oldValue = oldBindings[i2].value;
    let hook = binding2.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding2,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
__name(invokeDirectiveHook, "invokeDirectiveHook");
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
    provides[key] = value;
  }
}
__name(provide, "provide");
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) return provides[key];
    else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
  }
}
__name(inject, "inject");
function hasInjectionContext() {
  return !!(getCurrentInstance() || currentApp);
}
__name(hasInjectionContext, "hasInjectionContext");
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = /* @__PURE__ */ __name(() => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
    }
    return ctx;
  }
}, "useSSRContext");
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
__name(watch, "watch");
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once: once2 } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = /* @__PURE__ */ __name(() => {
      }, "watchStopHandle");
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") baseWatchOptions.scheduler = (job) => {
    queuePostRenderEffect(job, instance && instance.suspense);
  };
  else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) job();
      else queueJob(job);
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) job.flags |= 4;
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) ssrCleanup.push(watchHandle);
    else if (runsImmediately) watchHandle();
  }
  return watchHandle;
}
__name(doWatch, "doWatch");
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) cb = value;
  else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
__name(instanceWatch, "instanceWatch");
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) cur = cur[segments[i2]];
    return cur;
  };
}
__name(createPathGetter, "createPathGetter");
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
var isTeleport = /* @__PURE__ */ __name((type) => type.__isTeleport, "isTeleport");
var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else vnode.transition = hooks;
}
__name(setTransitionHooks, "setTransitionHooks");
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? extend({ name: options.name }, extraOptions, { setup: options }) : options;
}
__name(defineComponent, "defineComponent");
function markAsyncBoundary(instance) {
  instance.ids = [
    instance.ids[0] + instance.ids[2]++ + "-",
    0,
    0
  ];
}
__name(markAsyncBoundary, "markAsyncBoundary");
function isTemplateRefKey(refs, key) {
  let desc;
  return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
__name(isTemplateRefKey, "isTemplateRefKey");
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = /* @__PURE__ */ toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (isTemplateRefKey(refs, key)) return false;
    return hasOwn(rawSetupState, key);
  };
  const canSetRef = /* @__PURE__ */ __name((ref22, key) => {
    if (key && isTemplateRefKey(refs, key)) return false;
    return true;
  }, "canSetRef");
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
    } else if (/* @__PURE__ */ isRef(oldRef)) {
      const oldRawRefAtom = oldRawRef;
      if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) callWithErrorHandling(ref3, owner, 12, [value, refs]);
  else {
    const _isString = isString(ref3);
    const _isRef = /* @__PURE__ */ isRef(ref3);
    if (_isString || _isRef) {
      const doSet = /* @__PURE__ */ __name(() => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef(ref3) || !rawRef.k ? ref3.value : refs[rawRef.k];
          if (isUnmount) isArray$1(existing) && remove(existing, refValue);
          else if (!isArray$1(existing)) if (_isString) {
            refs[ref3] = [refValue];
            if (canSetSetupRef(ref3)) setupState[ref3] = refs[ref3];
          } else {
            const newVal = [refValue];
            if (canSetRef(ref3, rawRef.k)) ref3.value = newVal;
            if (rawRef.k) refs[rawRef.k] = newVal;
          }
          else if (!existing.includes(refValue)) existing.push(refValue);
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) setupState[ref3] = value;
        } else if (_isRef) {
          if (canSetRef(ref3, rawRef.k)) ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        }
      }, "doSet");
      if (value) {
        const job = /* @__PURE__ */ __name(() => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        }, "job");
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
__name(setRef, "setRef");
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
__name(invalidatePendingSetRef, "invalidatePendingSetRef");
var hasLoggedMismatchError = false;
var logMismatchError = /* @__PURE__ */ __name(() => {
  if (hasLoggedMismatchError) return;
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError = true;
}, "logMismatchError");
var isSVGContainer = /* @__PURE__ */ __name((container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject", "isSVGContainer");
var isMathMLContainer = /* @__PURE__ */ __name((container) => container.namespaceURI.includes("MathML"), "isMathMLContainer");
var getContainerType = /* @__PURE__ */ __name((container) => {
  if (container.nodeType !== 1) return void 0;
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
}, "getContainerType");
var isComment$1 = /* @__PURE__ */ __name((node) => node.nodeType === 8, "isComment$1");
function createHydrationFunctions(rendererInternals) {
  const { mt: mountComponent, p: patch, o: { patchProp: patchProp2, createText, nextSibling, parentNode, remove: remove2, insert, createComment } } = rendererInternals;
  const hydrate = /* @__PURE__ */ __name((vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
  }, "hydrate");
  const hydrateNode = /* @__PURE__ */ __name((node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const isFragmentStart = isComment$1(node) && node.data === "[";
    const onMismatch = /* @__PURE__ */ __name(() => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart), "onMismatch");
    const { type, ref: ref3, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) if (vnode.children === "") {
          insert(vnode.el = createText(""), parentNode(node), node);
          nextNode = node;
        } else nextNode = onMismatch();
        else {
          if (node.data !== vnode.children) {
            logMismatchError();
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
        } else if (domType !== 8 || isFragmentStart) nextNode = onMismatch();
        else nextNode = nextSibling(node);
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i2 = 0; i2 < vnode.staticCount; i2++) {
            if (needToAdoptContent) vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i2 === vnode.staticCount - 1) vnode.anchor = nextNode;
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else onMismatch();
        break;
      case Fragment:
        if (!isFragmentStart) nextNode = onMismatch();
        else nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) nextNode = onMismatch();
        else nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) nextNode = locateClosingAnchor(node);
          else if (isComment$1(node) && node.data === "teleport start") nextNode = locateClosingAnchor(node, node.data, "teleport end");
          else nextNode = nextSibling(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) if (domType !== 8) nextNode = onMismatch();
        else nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
        else if (shapeFlag & 128) nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
    }
    if (ref3 != null) setRef(ref3, null, parentSuspense, vnode);
    return nextNode;
  }, "hydrateNode");
  const hydrateElement = /* @__PURE__ */ __name((el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if (forcePatch || patchFlag !== -1) {
      if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(null, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          const cls = content.getAttribute("class");
          if (cls) content.$cls = cls;
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        while (next) {
          if (!isMismatchAllowed(el, 1)) logMismatchError();
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        let clientText = vnode.children;
        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) clientText = clientText.slice(1);
        const { textContent } = el;
        if (textContent !== clientText && textContent !== clientText.replace(/\r\n|\r/g, "\n")) {
          if (!isMismatchAllowed(el, 0)) logMismatchError();
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if (forcePatch || !optimized || patchFlag & 48) {
          const isCustomElement = el.tagName.includes("-");
          for (const key in props) if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || key[0] === "." || isCustomElement && !isReservedProp(key)) patchProp2(el, key, null, props[key], void 0, parentComponent);
        } else if (props.onClick) patchProp2(el, "onClick", null, props.onClick, void 0, parentComponent);
        else if (patchFlag & 4 && /* @__PURE__ */ isReactive(props.style)) for (const key in props.style) props.style[key];
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) queueEffectWithSuspense(() => {
        vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
    return el.nextSibling;
  }, "hydrateElement");
  const hydrateChildren = /* @__PURE__ */ __name((node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l2 = children.length;
    for (let i2 = 0; i2 < l2; i2++) {
      const vnode = optimized ? children[i2] : children[i2] = normalizeVNode$1(children[i2]);
      const isText = vnode.type === Text;
      if (node) {
        if (isText && !optimized) {
          if (i2 + 1 < l2 && normalizeVNode$1(children[i2 + 1]).type === Text) {
            insert(createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
            node.data = vnode.children;
          }
        }
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (isText && !vnode.children) insert(vnode.el = createText(""), container);
      else {
        if (!isMismatchAllowed(container, 1)) logMismatchError();
        patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
      }
    }
    return node;
  }, "hydrateChildren");
  const hydrateFragment = /* @__PURE__ */ __name((node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment$1(next) && next.data === "]") return nextSibling(vnode.anchor = next);
    else {
      logMismatchError();
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  }, "hydrateFragment");
  const handleMismatch = /* @__PURE__ */ __name((node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    if (!isMismatchAllowed(node.parentElement, 1)) logMismatchError();
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) remove2(next2);
        else break;
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
    if (parentComponent) {
      parentComponent.vnode.el = vnode.el;
      updateHOCHostEl(parentComponent, vnode.el);
    }
    return next;
  }, "handleMismatch");
  const locateClosingAnchor = /* @__PURE__ */ __name((node, open2 = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment$1(node)) {
        if (node.data === open2) match++;
        if (node.data === close) if (match === 0) return nextSibling(node);
        else match--;
      }
    }
    return node;
  }, "locateClosingAnchor");
  const replaceNode = /* @__PURE__ */ __name((newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) parentNode2.replaceChild(newNode, oldNode);
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) parent.vnode.el = parent.subTree.el = newNode;
      parent = parent.parent;
    }
  }, "replaceNode");
  const isTemplateNode = /* @__PURE__ */ __name((node) => {
    return node.nodeType === 1 && node.tagName === "TEMPLATE";
  }, "isTemplateNode");
  return [hydrate, hydrateNode];
}
__name(createHydrationFunctions, "createHydrationFunctions");
var allowMismatchAttr = "data-allow-mismatch";
var MismatchTypeString = {
  [0]: "text",
  [1]: "children",
  [2]: "class",
  [3]: "style",
  [4]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
  if (allowedType === 0 || allowedType === 1) while (el && !el.hasAttribute(allowMismatchAttr)) el = el.parentElement;
  const allowedAttr = el && el.getAttribute(allowMismatchAttr);
  if (allowedAttr == null) return false;
  else if (allowedAttr === "") return true;
  else {
    const list = allowedAttr.split(",");
    if (allowedType === 0 && list.includes("children")) return true;
    return list.includes(MismatchTypeString[allowedType]);
  }
}
__name(isMismatchAllowed, "isMismatchAllowed");
getGlobalThis().requestIdleCallback;
getGlobalThis().cancelIdleCallback;
var isAsyncWrapper = /* @__PURE__ */ __name((i2) => !!i2.type.__asyncLoader, "isAsyncWrapper");
var isKeepAlive = /* @__PURE__ */ __name((vnode) => vnode.type.__isKeepAlive, "isKeepAlive");
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
__name(onActivated, "onActivated");
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
__name(onDeactivated, "onDeactivated");
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) return;
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
      current = current.parent;
    }
  }
}
__name(registerKeepAliveHook, "registerKeepAliveHook");
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
__name(injectToKeepAliveRoot, "injectToKeepAliveRoot");
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) hooks.unshift(wrappedHook);
    else hooks.push(wrappedHook);
    return wrappedHook;
  }
}
__name(injectHook, "injectHook");
var createHook = /* @__PURE__ */ __name((lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
}, "createHook");
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
__name(onErrorCaptured, "onErrorCaptured");
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !/* @__PURE__ */ isShallow(source);
      isReadonlySource = /* @__PURE__ */ isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) ret[i2] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i2])) : toReactive(source[i2]) : source[i2], i2, void 0, cached && cached[i2]);
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) ret[i2] = renderItem(i2 + 1, i2, void 0, cached && cached[i2]);
  } else if (isObject(source)) if (source[Symbol.iterator]) ret = Array.from(source, (item, i2) => renderItem(item, i2, void 0, cached && cached[i2]));
  else {
    const keys = Object.keys(source);
    ret = new Array(keys.length);
    for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
      const key = keys[i2];
      ret[i2] = renderItem(source[key], key, i2, cached && cached[i2]);
    }
  }
  else ret = [];
  if (cache) cache[index] = ret;
  return ret;
}
__name(renderList, "renderList");
function ensureValidVNode$1(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode$2(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode$1(child.children)) return false;
    return true;
  }) ? vnodes : null;
}
__name(ensureValidVNode$1, "ensureValidVNode$1");
var getPublicInstance = /* @__PURE__ */ __name((i2) => {
  if (!i2) return null;
  if (isStatefulComponent(i2)) return getComponentPublicInstance(i2);
  return getPublicInstance(i2.parent);
}, "getPublicInstance");
var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: /* @__PURE__ */ __name((i2) => i2, "$"),
  $el: /* @__PURE__ */ __name((i2) => i2.vnode.el, "$el"),
  $data: /* @__PURE__ */ __name((i2) => i2.data, "$data"),
  $props: /* @__PURE__ */ __name((i2) => i2.props, "$props"),
  $attrs: /* @__PURE__ */ __name((i2) => i2.attrs, "$attrs"),
  $slots: /* @__PURE__ */ __name((i2) => i2.slots, "$slots"),
  $refs: /* @__PURE__ */ __name((i2) => i2.refs, "$refs"),
  $parent: /* @__PURE__ */ __name((i2) => getPublicInstance(i2.parent), "$parent"),
  $root: /* @__PURE__ */ __name((i2) => getPublicInstance(i2.root), "$root"),
  $host: /* @__PURE__ */ __name((i2) => i2.ce, "$host"),
  $emit: /* @__PURE__ */ __name((i2) => i2.emit, "$emit"),
  $options: /* @__PURE__ */ __name((i2) => resolveMergedOptions(i2), "$options"),
  $forceUpdate: /* @__PURE__ */ __name((i2) => i2.f || (i2.f = () => {
    queueJob(i2.update);
  }), "$forceUpdate"),
  $nextTick: /* @__PURE__ */ __name((i2) => i2.n || (i2.n = nextTick2.bind(i2.proxy)), "$nextTick"),
  $watch: /* @__PURE__ */ __name((i2) => instanceWatch.bind(i2), "$watch")
});
var hasSetupBinding = /* @__PURE__ */ __name((state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key), "hasSetupBinding");
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") return true;
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) switch (n2) {
        case 1:
          return setupState[key];
        case 2:
          return data[key];
        case 4:
          return ctx[key];
        case 3:
          return props[key];
      }
      else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) accessCache[key] = 0;
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") track(instance.attrs, "get", "");
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
    else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) return false;
    if (key[0] === "$" && key.slice(1) in instance) return false;
    else ctx[key] = value;
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) target._.accessCache[key] = 0;
    else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce((normalized, p2) => (normalized[p2] = null, normalized), {}) : props;
}
__name(normalizePropsOrEmits, "normalizePropsOrEmits");
var shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) callHook(options.beforeCreate, instance, "bc");
  const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render: render2, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  if (methods) for (const key in methods) {
    const methodHandler = methods[key];
    if (isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) {
    } else instance.data = /* @__PURE__ */ reactive(data);
  }
  shouldCacheAccess = true;
  if (computedOptions) for (const key in computedOptions) {
    const opt = computedOptions[key];
    const c2 = computed({
      get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
      set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
    });
    Object.defineProperty(ctx, key, {
      enumerable: true,
      configurable: true,
      get: /* @__PURE__ */ __name(() => c2.value, "get"),
      set: /* @__PURE__ */ __name((v2) => c2.value = v2, "set")
    });
  }
  if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) callHook(created, instance, "c");
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
    else if (hook) register(hook.bind(publicThis));
  }
  __name(registerLifecycleHook, "registerLifecycleHook");
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: /* @__PURE__ */ __name(() => publicThis[key], "get"),
          set: /* @__PURE__ */ __name((val) => publicThis[key] = val, "set"),
          enumerable: true
        });
      });
    } else if (!instance.exposed) instance.exposed = {};
  }
  if (render2 && instance.render === NOOP) instance.render = render2;
  if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) markAsyncBoundary(instance);
}
__name(applyOptions, "applyOptions");
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) injectOptions = normalizeInject(injectOptions);
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
    else injected = inject(opt.from || key);
    else injected = inject(opt);
    if (/* @__PURE__ */ isRef(injected)) Object.defineProperty(ctx, key, {
      enumerable: true,
      configurable: true,
      get: /* @__PURE__ */ __name(() => injected.value, "get"),
      set: /* @__PURE__ */ __name((v2) => injected.value = v2, "set")
    });
    else ctx[key] = injected;
  }
}
__name(resolveInjections, "resolveInjections");
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
__name(callHook, "callHook");
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) watch(getter, handler);
  } else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
  else if (isObject(raw)) if (isArray$1(raw)) raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
  else {
    const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
    if (isFunction(handler)) watch(getter, handler, raw);
  }
}
__name(createWatcher, "createWatcher");
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) resolved = cached;
  else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
  else {
    resolved = {};
    if (globalMixins.length) globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) cache.set(base, resolved);
  return resolved;
}
__name(resolveMergedOptions, "resolveMergedOptions");
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) mergeOptions$1(to, extendsOptions, strats, true);
  if (mixins) mixins.forEach((m2) => mergeOptions$1(to, m2, strats, true));
  for (const key in from) if (asMixin && key === "expose") {
  } else {
    const strat = internalOptionMergeStrats[key] || strats && strats[key];
    to[key] = strat ? strat(to[key], from[key]) : from[key];
  }
  return to;
}
__name(mergeOptions$1, "mergeOptions$1");
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) return to;
  if (!to) return from;
  return /* @__PURE__ */ __name(function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  }, "mergedDataFn");
}
__name(mergeDataFn, "mergeDataFn");
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
__name(mergeInject, "mergeInject");
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) res[raw[i2]] = raw[i2];
    return res;
  }
  return raw;
}
__name(normalizeInject, "normalizeInject");
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
__name(mergeAsArray, "mergeAsArray");
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
__name(mergeObjectOptions, "mergeObjectOptions");
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
    return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
  } else return from;
}
__name(mergeEmitsOrPropsOptions, "mergeEmitsOrPropsOptions");
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
  return merged;
}
__name(mergeWatchOptions, "mergeWatchOptions");
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
__name(createAppContext, "createAppContext");
var uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return /* @__PURE__ */ __name(function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
    if (rootProps != null && !isObject(rootProps)) rootProps = null;
    const context2 = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context2.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context2,
      _instance: null,
      version: version2,
      get config() {
        return context2.config;
      },
      set config(v2) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        }
        return app;
      },
      mixin(mixin) {
        if (!context2.mixins.includes(mixin)) context2.mixins.push(mixin);
        return app;
      },
      component(name, component) {
        if (!component) return context2.components[name];
        context2.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) return context2.directives[name];
        context2.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context2;
          if (namespace === true) namespace = "svg";
          else if (namespace === false) namespace = void 0;
          if (isHydrate && hydrate) hydrate(vnode, rootContainer);
          else render2(vnode, rootContainer, namespace);
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
          render2(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context2.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  }, "createApp");
}
__name(createAppAPI, "createAppAPI");
var currentApp = null;
var getModelModifiers = /* @__PURE__ */ __name((props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
}, "getModelModifiers");
function emit2(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    if (modifiers.number) args = rawArgs.map(looseToNumber);
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) handler = props[handlerName = toHandlerKey(hyphenate(event))];
  if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) instance.emitted = {};
    else if (instance.emitted[handlerName]) return;
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
__name(emit2, "emit");
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) return cached;
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = /* @__PURE__ */ __name((raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    }, "extendEmits");
    if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
    if (comp.extends) extendEmits(comp.extends);
    if (comp.mixins) comp.mixins.forEach(extendEmits);
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) raw.forEach((key) => normalized[key] = null);
  else extend(normalized, raw);
  if (isObject(comp)) cache.set(comp, normalized);
  return normalized;
}
__name(normalizeEmitsOptions, "normalizeEmitsOptions");
function isEmitListener(options, key) {
  if (!options || !isOn(key)) return false;
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
__name(isEmitListener, "isEmitListener");
function renderComponentRoot$1(instance) {
  const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit: emit3, render: render2, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
  const prev = setCurrentRenderingInstance$1(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = proxyToUse;
      result = normalizeVNode$1(render2.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      result = normalizeVNode$1(render22.length > 1 ? render22(props, {
        attrs,
        slots,
        emit: emit3
      }) : render22(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & 7) {
        if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) setTransitionHooks(root, vnode.transition);
  result = root;
  setCurrentRenderingInstance$1(prev);
  return result;
}
__name(renderComponentRoot$1, "renderComponentRoot$1");
var getFunctionalFallthrough = /* @__PURE__ */ __name((attrs) => {
  let res;
  for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
  return res;
}, "getFunctionalFallthrough");
var filterModelListeners = /* @__PURE__ */ __name((attrs, props) => {
  const res = {};
  for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
  return res;
}, "filterModelListeners");
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) return true;
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) return true;
    if (patchFlag & 16) {
      if (!prevProps) return !!nextProps;
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) return true;
    }
    if (prevProps === nextProps) return false;
    if (!prevProps) return !!nextProps;
    if (!nextProps) return true;
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
__name(shouldUpdateComponent, "shouldUpdateComponent");
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) return true;
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
  }
  return false;
}
__name(hasPropsChanged, "hasPropsChanged");
function hasPropValueChanged(nextProps, prevProps, key) {
  const nextProp = nextProps[key];
  const prevProp = prevProps[key];
  if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
  return nextProp !== prevProp;
}
__name(hasPropValueChanged, "hasPropValueChanged");
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) root.el = vnode.el;
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else break;
  }
}
__name(updateHOCHostEl, "updateHOCHostEl");
var internalObjectProto = {};
var createInternalObject = /* @__PURE__ */ __name(() => Object.create(internalObjectProto), "createInternalObject");
var isInternalObject = /* @__PURE__ */ __name((obj) => Object.getPrototypeOf(obj) === internalObjectProto, "isInternalObject");
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
  if (isStateful) instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
  else if (!instance.type.props) instance.props = attrs;
  else instance.props = props;
  instance.attrs = attrs;
}
__name(initProps, "initProps");
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = /* @__PURE__ */ toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) continue;
        const value = rawProps[key];
        if (options) if (hasOwn(attrs, key)) {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        } else {
          const camelizedKey = camelize(key);
          props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
        }
        else if (value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
    let kebabKey;
    for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) if (options) {
      if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
    } else delete props[key];
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
        delete attrs[key];
        hasAttrsChanged = true;
      }
    }
  }
  if (hasAttrsChanged) trigger(instance.attrs, "set", "");
}
__name(updateProps, "updateProps");
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) for (let key in rawProps) {
    if (isReservedProp(key)) continue;
    const value = rawProps[key];
    let camelKey;
    if (options && hasOwn(options, camelKey = camelize(key))) if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
    else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
    else if (!isEmitListener(instance.emitsOptions, key)) {
      if (!(key in attrs) || value !== attrs[key]) {
        attrs[key] = value;
        hasAttrsChanged = true;
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
__name(setFullProps, "setFullProps");
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) value = propsDefaults[key];
        else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          reset();
        }
      } else value = defaultValue;
      if (instance.ce) instance.ce._setProp(key, value);
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) value = false;
      else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
    }
  }
  return value;
}
__name(resolvePropValue, "resolvePropValue");
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) return cached;
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = /* @__PURE__ */ __name((raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    }, "extendProps");
    if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
    if (comp.extends) extendProps(comp.extends);
    if (comp.mixins) comp.mixins.forEach(extendProps);
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) for (let i2 = 0; i2 < raw.length; i2++) {
    const normalizedKey = camelize(raw[i2]);
    if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
  }
  else if (raw) for (const key in raw) {
    const normalizedKey = camelize(key);
    if (validatePropName(normalizedKey)) {
      const opt = raw[key];
      const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
      const propType = prop.type;
      let shouldCast = false;
      let shouldCastTrue = true;
      if (isArray$1(propType)) for (let index = 0; index < propType.length; ++index) {
        const type = propType[index];
        const typeName = isFunction(type) && type.name;
        if (typeName === "Boolean") {
          shouldCast = true;
          break;
        } else if (typeName === "String") shouldCastTrue = false;
      }
      else shouldCast = isFunction(propType) && propType.name === "Boolean";
      prop[0] = shouldCast;
      prop[1] = shouldCastTrue;
      if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) cache.set(comp, res);
  return res;
}
__name(normalizePropsOptions, "normalizePropsOptions");
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) return true;
  return false;
}
__name(validatePropName, "validatePropName");
var isInternalKey = /* @__PURE__ */ __name((key) => key === "_" || key === "_ctx" || key === "$stable", "isInternalKey");
var normalizeSlotValue = /* @__PURE__ */ __name((value) => isArray$1(value) ? value.map(normalizeVNode$1) : [normalizeVNode$1(value)], "normalizeSlotValue");
var normalizeSlot$1 = /* @__PURE__ */ __name((key, rawSlot, ctx) => {
  if (rawSlot._n) return rawSlot;
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
}, "normalizeSlot$1");
var normalizeObjectSlots = /* @__PURE__ */ __name((rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) slots[key] = normalizeSlot$1(key, value, ctx);
    else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
}, "normalizeObjectSlots");
var normalizeVNodeSlots = /* @__PURE__ */ __name((instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
}, "normalizeVNodeSlots");
var assignSlots = /* @__PURE__ */ __name((slots, children, optimized) => {
  for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
}, "assignSlots");
var initSlots = /* @__PURE__ */ __name((instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) def(slots, "_", type, true);
    } else normalizeObjectSlots(children, slots);
  } else if (children) normalizeVNodeSlots(instance, children);
}, "initSlots");
var updateSlots = /* @__PURE__ */ __name((instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) if (optimized && type === 1) needDeletionCheck = false;
    else assignSlots(slots, children, optimized);
    else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
  }
}, "updateSlots");
function initFeatureFlags() {
}
__name(initFeatureFlags, "initFeatureFlags");
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
__name(createRenderer, "createRenderer");
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
__name(createHydrationRenderer, "createHydrationRenderer");
function baseCreateRenderer(options, createHydrationFns) {
  initFeatureFlags();
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = /* @__PURE__ */ __name((n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) return;
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
        else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
    }
    if (ref3 != null && parentComponent) setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    else if (ref3 == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
  }, "patch");
  const processText = /* @__PURE__ */ __name((n1, n2, container, anchor) => {
    if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) hostSetText(el, n2.children);
    }
  }, "processText");
  const processCommentNode = /* @__PURE__ */ __name((n1, n2, container, anchor) => {
    if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    else n2.el = n1.el;
  }, "processCommentNode");
  const mountStaticNode = /* @__PURE__ */ __name((n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
  }, "mountStaticNode");
  const moveStaticNode = /* @__PURE__ */ __name(({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  }, "moveStaticNode");
  const removeStaticNode = /* @__PURE__ */ __name(({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  }, "removeStaticNode");
  const processElement = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") namespace = "svg";
    else if (n2.type === "math") namespace = "mathml";
    if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    else {
      const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
      try {
        if (customElement) customElement._beginPatch();
        patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } finally {
        if (customElement) customElement._endPatch();
      }
    }
  }, "processElement");
  const mountElement = /* @__PURE__ */ __name((vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
    if (shapeFlag & 8) hostSetElementText(el, vnode.children);
    else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
    if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
      if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
      if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) transition.beforeEnter(el);
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
      needCallTransitionHooks && transition.enter(el);
      dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
    }, parentSuspense);
  }, "mountElement");
  const setScopeId = /* @__PURE__ */ __name((el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) hostSetScopeId(el, scopeId);
    if (slotScopeIds) for (let i2 = 0; i2 < slotScopeIds.length; i2++) hostSetScopeId(el, slotScopeIds[i2]);
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  }, "setScopeId");
  const mountChildren = /* @__PURE__ */ __name((children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) patch(null, children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode$1(children[i2]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
  }, "mountChildren");
  const patchElement = /* @__PURE__ */ __name((n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
    if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
    else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
    if (patchFlag > 0) {
      if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
      else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
        }
        if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) hostSetElementText(el, n2.children);
      }
    } else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
    }, parentSuspense);
  }, "patchElement");
  const patchBlockChildren = /* @__PURE__ */ __name((oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      patch(oldVNode, newVNode, oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldVNode.el) : fallbackContainer, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
    }
  }, "patchBlockChildren");
  const patchProps = /* @__PURE__ */ __name((el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
      }
      if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
    }
  }, "patchProps");
  const processFragment = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    } else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
      if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
    } else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
  }, "processFragment");
  const processComponent = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
    else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
    else updateComponent(n1, n2, optimized);
  }, "processComponent");
  const mountComponent = /* @__PURE__ */ __name((initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance$1(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
    setupComponent$1(instance, false, optimized);
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
  }, "mountComponent");
  const updateComponent = /* @__PURE__ */ __name((n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) if (instance.asyncDep && !instance.asyncResolved) {
      updateComponentPreRender(instance, n2, optimized);
      return;
    } else {
      instance.next = n2;
      instance.update();
    }
    else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  }, "updateComponent");
  const setupRenderEffect = /* @__PURE__ */ __name((instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = /* @__PURE__ */ __name(() => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) invokeArrayFns(bm);
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = /* @__PURE__ */ __name(() => {
            instance.subTree = renderComponentRoot$1(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          }, "hydrateSubTree");
          if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
          else hydrateSubTree();
        } else {
          if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
          const subTree = instance.subTree = renderComponentRoot$1(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
          initialVNode.el = subTree.el;
        }
        if (m2) queuePostRenderEffect(m2, parentSuspense);
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              queuePostRenderEffect(() => {
                if (!instance.isUnmounted) update();
              }, parentSuspense);
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else next = vnode;
        if (bu) invokeArrayFns(bu);
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot$1(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
        next.el = nextTree.el;
        if (originNext === null) updateHOCHostEl(instance, nextTree.el);
        if (u2) queuePostRenderEffect(u2, parentSuspense);
        if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
      }
    }, "componentUpdateFn");
    instance.scope.on();
    const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect.run.bind(effect);
    const job = instance.job = effect.runIfDirty.bind(effect);
    job.i = instance;
    job.id = instance.uid;
    effect.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  }, "setupRenderEffect");
  const updateComponentPreRender = /* @__PURE__ */ __name((instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  }, "updateComponentPreRender");
  const patchChildren = /* @__PURE__ */ __name((n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
      if (c2 !== c1) hostSetElementText(container, c2);
    } else if (prevShapeFlag & 16) if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    else unmountChildren(c1, parentComponent, parentSuspense, true);
    else {
      if (prevShapeFlag & 8) hostSetElementText(container, "");
      if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  }, "patchChildren");
  const patchUnkeyedChildren = /* @__PURE__ */ __name((c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode$1(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
    if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
  }, "patchUnkeyedChildren");
  const patchKeyedChildren = /* @__PURE__ */ __name((c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode$1(c2[i2]);
      if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      else break;
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode$1(c2[e2]);
      if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      else break;
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode$1(c2[i2]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) while (i2 <= e1) {
      unmount(c1[i2], parentComponent, parentSuspense, true);
      i2++;
    }
    else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode$1(c2[i2]);
        if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i2);
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++) newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
        else for (j2 = s2; j2 <= e2; j2++) if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
          newIndex = j2;
          break;
        }
        if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
        else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
          else moved = true;
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        else if (moved) if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) move(nextChild, container, anchor, 2);
        else j2--;
      }
    }
  }, "patchKeyedChildren");
  const move = /* @__PURE__ */ __name((vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) move(children[i2], container, anchor, moveType);
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    if (moveType !== 2 && shapeFlag & 1 && transition) if (moveType === 0) {
      transition.beforeEnter(el);
      hostInsert(el, container, anchor);
      queuePostRenderEffect(() => transition.enter(el), parentSuspense);
    } else {
      const { leave, delayLeave, afterLeave } = transition;
      const remove22 = /* @__PURE__ */ __name(() => {
        if (vnode.ctx.isUnmounted) hostRemove(el);
        else hostInsert(el, container, anchor);
      }, "remove2");
      const performLeave = /* @__PURE__ */ __name(() => {
        if (el._isLeaving) el[leaveCbKey](true);
        leave(el, () => {
          remove22();
          afterLeave && afterLeave();
        });
      }, "performLeave");
      if (delayLeave) delayLeave(el, remove22, performLeave);
      else performLeave();
    }
    else hostInsert(el, container, anchor);
  }, "move");
  const unmount = /* @__PURE__ */ __name((vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref3, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex } = vnode;
    if (patchFlag === -2) optimized = false;
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) parentComponent.renderCache[cacheIndex] = void 0;
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
    if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
    else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
      else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
      if (doRemove) remove2(vnode);
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
      shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
    }, parentSuspense);
  }, "unmount");
  const remove2 = /* @__PURE__ */ __name((vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = /* @__PURE__ */ __name(() => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
    }, "performRemove");
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = /* @__PURE__ */ __name(() => leave(el, performRemove), "performLeave");
      if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
      else performLeave();
    } else performRemove();
  }, "remove");
  const removeFragment = /* @__PURE__ */ __name((cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  }, "removeFragment");
  const unmountComponent = /* @__PURE__ */ __name((instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m: m2, a: a2 } = instance;
    invalidateMount(m2);
    invalidateMount(a2);
    if (bum) invokeArrayFns(bum);
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) queuePostRenderEffect(um, parentSuspense);
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  }, "unmountComponent");
  const unmountChildren = /* @__PURE__ */ __name((children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
  }, "unmountChildren");
  const getNextHostNode = /* @__PURE__ */ __name((vnode) => {
    if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
    if (vnode.shapeFlag & 128) return vnode.suspense.next();
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  }, "getNextHostNode");
  let isFlushing = false;
  const render2 = /* @__PURE__ */ __name((vnode, container, namespace) => {
    let instance;
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
        instance = container._vnode.component;
      }
    } else patch(container._vnode || null, vnode, container, null, null, null, namespace);
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs(instance);
      flushPostFlushCbs();
      isFlushing = false;
    }
  }, "render");
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
__name(baseCreateRenderer, "baseCreateRenderer");
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
__name(resolveChildrenNamespace, "resolveChildrenNamespace");
function toggleRecurse({ effect, job }, allowed) {
  if (allowed) {
    effect.flags |= 32;
    job.flags |= 4;
  } else {
    effect.flags &= -33;
    job.flags &= -5;
  }
}
__name(toggleRecurse, "toggleRecurse");
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
__name(needTransition, "needTransition");
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) for (let i2 = 0; i2 < ch1.length; i2++) {
    const c1 = ch1[i2];
    let c2 = ch2[i2];
    if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
      if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
        c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
        c2.el = c1.el;
      }
      if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
    }
    if (c2.type === Text) {
      if (c2.patchFlag === -1) c2 = ch2[i2] = cloneIfMounted(c2);
      c2.el = c1.el;
    }
    if (c2.type === Comment && !c2.el) c2.el = c1.el;
  }
}
__name(traverseStaticChildren, "traverseStaticChildren");
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j2, u2, v2, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i2] = j2;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) u2 = c2 + 1;
        else v2 = c2;
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) p2[i2] = result[u2 - 1];
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
__name(getSequence, "getSequence");
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
  else return locateNonHydratedAsyncRoot(subComponent);
}
__name(locateNonHydratedAsyncRoot, "locateNonHydratedAsyncRoot");
function invalidateMount(hooks) {
  if (hooks) for (let i2 = 0; i2 < hooks.length; i2++) hooks[i2].flags |= 8;
}
__name(invalidateMount, "invalidateMount");
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) return anchorVnode.placeholder;
  const instance = anchorVnode.component;
  if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
  return null;
}
__name(resolveAsyncComponentPlaceholder, "resolveAsyncComponentPlaceholder");
var isSuspense = /* @__PURE__ */ __name((type) => type.__isSuspense, "isSuspense");
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) if (isArray$1(fn)) suspense.effects.push(...fn);
  else suspense.effects.push(fn);
  else queuePostFlushCb(fn);
}
__name(queueEffectWithSuspense, "queueEffectWithSuspense");
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
var Text = /* @__PURE__ */ Symbol.for("v-txt");
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
var Static = /* @__PURE__ */ Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
__name(openBlock, "openBlock");
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
__name(closeBlock, "closeBlock");
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
}
__name(setBlockTracking, "setBlockTracking");
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
  return vnode;
}
__name(setupBlock, "setupBlock");
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
__name(createBlock, "createBlock");
function isVNode$2(value) {
  return value ? value.__v_isVNode === true : false;
}
__name(isVNode$2, "isVNode$2");
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
__name(isSameVNodeType, "isSameVNodeType");
var normalizeKey = /* @__PURE__ */ __name(({ key }) => key != null ? key : null, "normalizeKey");
var normalizeRef = /* @__PURE__ */ __name(({ ref: ref3, ref_key, ref_for }) => {
  if (typeof ref3 === "number") ref3 = "" + ref3;
  return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? {
    i: currentRenderingInstance,
    r: ref3,
    k: ref_key,
    f: !!ref_for
  } : ref3 : null;
}, "normalizeRef");
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) type.normalize(vnode);
  } else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
  return vnode;
}
__name(createBaseVNode, "createBaseVNode");
var createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
  if (isVNode$2(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) normalizeChildren(cloned, children);
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
    else currentBlock.push(cloned);
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) type = type.__vccOpts;
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) props.class = normalizeClass(klass);
    if (isObject(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) style = extend({}, style);
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
__name(_createVNode, "_createVNode");
function guardReactiveProps(props) {
  if (!props) return null;
  return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
__name(guardReactiveProps, "guardReactiveProps");
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
  return cloned;
}
__name(cloneVNode, "cloneVNode");
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
__name(createTextVNode, "createTextVNode");
function normalizeVNode$1(child) {
  if (child == null || typeof child === "boolean") return createVNode(Comment);
  else if (isArray$1(child)) return createVNode(Fragment, null, child.slice());
  else if (isVNode$2(child)) return cloneIfMounted(child);
  else return createVNode(Text, null, String(child));
}
__name(normalizeVNode$1, "normalizeVNode$1");
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
__name(cloneIfMounted, "cloneIfMounted");
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) children = null;
  else if (isArray$1(children)) type = 16;
  else if (typeof children === "object") if (shapeFlag & 65) {
    const slot = children.default;
    if (slot) {
      slot._c && (slot._d = false);
      normalizeChildren(vnode, slot());
      slot._c && (slot._d = true);
    }
    return;
  } else {
    type = 32;
    const slotFlag = children._;
    if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
    else if (slotFlag === 3 && currentRenderingInstance) if (currentRenderingInstance.slots._ === 1) children._ = 1;
    else {
      children._ = 2;
      vnode.patchFlag |= 1024;
    }
  }
  else if (isFunction(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else type = 8;
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
__name(normalizeChildren, "normalizeChildren");
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) if (key === "class") {
      if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
    } else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
    else if (isOn(key)) {
      const existing = ret[key];
      const incoming = toMerge[key];
      if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
    } else if (key !== "") ret[key] = toMerge[key];
  }
  return ret;
}
__name(mergeProps, "mergeProps");
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
__name(invokeVNodeHook, "invokeVNodeHook");
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance$1(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : [
      "",
      0,
      0
    ],
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  instance.ctx = { _: instance };
  instance.root = parent ? parent.root : instance;
  instance.emit = emit2.bind(null, instance);
  if (vnode.ce) vnode.ce(instance);
  return instance;
}
__name(createComponentInstance$1, "createComponentInstance$1");
var currentInstance = null;
var getCurrentInstance = /* @__PURE__ */ __name(() => currentInstance || currentRenderingInstance, "getCurrentInstance");
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = /* @__PURE__ */ __name((key, setter) => {
    let setters;
    if (!(setters = g2[key])) setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1) setters.forEach((set) => set(v2));
      else setters[0](v2);
    };
  }, "registerGlobalSetter");
  internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v2) => currentInstance = v2);
  setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v2) => isInSSRComponentSetup = v2);
}
var setCurrentInstance = /* @__PURE__ */ __name((instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
}, "setCurrentInstance");
var unsetCurrentInstance = /* @__PURE__ */ __name(() => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
}, "unsetCurrentInstance");
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
__name(isStatefulComponent, "isStatefulComponent");
var isInSSRComponentSetup = false;
function setupComponent$1(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
__name(setupComponent$1, "setupComponent$1");
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) return setupResult.then((resolvedResult) => {
        handleSetupResult(instance, resolvedResult, isSSR);
      }).catch((e2) => {
        handleError(e2, instance, 0);
      });
      else instance.asyncDep = setupResult;
    } else handleSetupResult(instance, setupResult, isSSR);
  } else finishComponentSetup(instance, isSSR);
}
__name(setupStatefulComponent, "setupStatefulComponent");
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
  else instance.render = setupResult;
  else if (isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
  finishComponentSetup(instance, isSSR);
}
__name(handleSetupResult, "handleSetupResult");
var compile;
var installWithProxy;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        Component.render = compile(template, extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions));
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) installWithProxy(instance);
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
__name(finishComponentSetup, "finishComponentSetup");
var attrsProxyHandlers = { get(target, key) {
  track(target, "get", "");
  return target[key];
} };
function createSetupContext(instance) {
  const expose = /* @__PURE__ */ __name((exposed) => {
    instance.exposed = exposed || {};
  }, "expose");
  return {
    attrs: new Proxy(instance.attrs, attrsProxyHandlers),
    slots: instance.slots,
    emit: instance.emit,
    expose
  };
}
__name(createSetupContext, "createSetupContext");
function getComponentPublicInstance(instance) {
  if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
    get(target, key) {
      if (key in target) return target[key];
      else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
    },
    has(target, key) {
      return key in target || key in publicPropertiesMap;
    }
  }));
  else return instance.proxy;
}
__name(getComponentPublicInstance, "getComponentPublicInstance");
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
__name(isClassComponent, "isClassComponent");
var computed = /* @__PURE__ */ __name((getterOrOptions, debugOptions) => {
  return /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
}, "computed");
function h$1(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l2 = arguments.length;
    if (l2 === 2) if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode$2(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
      return createVNode(type, propsOrChildren);
    } else return createVNode(type, null, propsOrChildren);
    else {
      if (l2 > 3) children = Array.prototype.slice.call(arguments, 2);
      else if (l2 === 3 && isVNode$2(children)) children = [children];
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
__name(h$1, "h$1");
var version2 = "3.5.30";
var warn3 = NOOP;
var ssrUtils = {
  createComponentInstance: createComponentInstance$1,
  setupComponent: setupComponent$1,
  renderComponentRoot: renderComponentRoot$1,
  setCurrentRenderingInstance: setCurrentRenderingInstance$1,
  isVNode: isVNode$2,
  normalizeVNode: normalizeVNode$1,
  getComponentPublicInstance,
  ensureValidVNode: ensureValidVNode$1,
  pushWarningContext: pushWarningContext$1,
  popWarningContext: popWarningContext$1
};
var policy = void 0;
var tt$1 = typeof window !== "undefined" && window.trustedTypes;
if (tt$1) try {
  policy = /* @__PURE__ */ tt$1.createPolicy("vue", { createHTML: /* @__PURE__ */ __name((val) => val, "createHTML") });
} catch (e2) {
}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
  insert: /* @__PURE__ */ __name((child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  }, "insert"),
  remove: /* @__PURE__ */ __name((child) => {
    const parent = child.parentNode;
    if (parent) parent.removeChild(child);
  }, "remove"),
  createElement: /* @__PURE__ */ __name((tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
    return el;
  }, "createElement"),
  createText: /* @__PURE__ */ __name((text) => doc.createTextNode(text), "createText"),
  createComment: /* @__PURE__ */ __name((text) => doc.createComment(text), "createComment"),
  setText: /* @__PURE__ */ __name((node, text) => {
    node.nodeValue = text;
  }, "setText"),
  setElementText: /* @__PURE__ */ __name((el, text) => {
    el.textContent = text;
  }, "setElementText"),
  parentNode: /* @__PURE__ */ __name((node) => node.parentNode, "parentNode"),
  nextSibling: /* @__PURE__ */ __name((node) => node.nextSibling, "nextSibling"),
  querySelector: /* @__PURE__ */ __name((selector) => doc.querySelector(selector), "querySelector"),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) while (true) {
      parent.insertBefore(start.cloneNode(true), anchor);
      if (start === end || !(start = start.nextSibling)) break;
    }
    else {
      templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
  }
};
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  if (value == null) el.removeAttribute("class");
  else if (isSVG) el.setAttribute("class", value);
  else el.className = value;
}
__name(patchClass, "patchClass");
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) transition.beforeEnter(el);
    else setDisplay(el, value);
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) transition.enter(el);
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) if (value) {
      transition.beforeEnter(el);
      setDisplay(el, true);
      transition.enter(el);
    } else transition.leave(el, () => {
      setDisplay(el, false);
    });
    else setDisplay(el, value);
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
__name(setDisplay, "setDisplay");
function initVShowForSSR() {
  vShow.getSSRProps = ({ value }) => {
    if (!value) return { style: { display: "none" } };
  };
}
__name(initVShowForSSR, "initVShowForSSR");
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) if (!isString(prev)) {
      for (const key in prev) if (next[key] == null) setStyle(style, key, "");
    } else for (const prevStyle of prev.split(";")) {
      const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
      if (next[key] == null) setStyle(style, key, "");
    }
    for (const key in next) {
      if (key === "display") hasControlledDisplay = true;
      setStyle(style, key, next[key]);
    }
  } else if (isCssString) {
    if (prev !== next) {
      const cssVarText = style[CSS_VAR_TEXT];
      if (cssVarText) next += ";" + cssVarText;
      style.cssText = next;
      hasControlledDisplay = displayRE.test(next);
    }
  } else if (prev) el.removeAttribute("style");
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) style.display = "none";
  }
}
__name(patchStyle, "patchStyle");
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) val.forEach((v2) => setStyle(style, name, v2));
  else {
    if (val == null) val = "";
    if (name.startsWith("--")) style.setProperty(name, val);
    else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      else style[prefixed] = val;
    }
  }
}
__name(setStyle, "setStyle");
var prefixes = [
  "Webkit",
  "Moz",
  "ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) return cached;
  let name = camelize(rawName);
  if (name !== "filter" && name in style) return prefixCache[rawName] = name;
  name = capitalize(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style) return prefixCache[rawName] = prefixed;
  }
  return rawName;
}
__name(autoPrefix, "autoPrefix");
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
  else el.setAttributeNS(xlinkNS, key, value);
  else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
  else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
__name(patchAttr, "patchAttr");
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
    if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
    if (value == null) el.removeAttribute(key);
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") value = includeBooleanAttr(value);
    else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
__name(patchDOMProp, "patchDOMProp");
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
__name(addEventListener, "addEventListener");
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
__name(removeEventListener, "removeEventListener");
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) existingInvoker.value = nextValue;
  else {
    const [name, options] = parseName(rawName);
    if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
    else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
__name(patchEvent, "patchEvent");
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
__name(parseName, "parseName");
var cachedNow = 0;
var p$1 = /* @__PURE__ */ Promise.resolve();
var getNow = /* @__PURE__ */ __name(() => cachedNow || (p$1.then(() => cachedNow = 0), cachedNow = Date.now()), "getNow");
function createInvoker(initialValue, instance) {
  const invoker = /* @__PURE__ */ __name((e2) => {
    if (!e2._vts) e2._vts = Date.now();
    else if (e2._vts <= invoker.attached) return;
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
  }, "invoker");
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
__name(createInvoker, "createInvoker");
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e22) => !e22._stopped && fn && fn(e22));
  } else return value;
}
__name(patchStopImmediatePropagation, "patchStopImmediatePropagation");
var isNativeOn = /* @__PURE__ */ __name((key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123, "isNativeOn");
var patchProp = /* @__PURE__ */ __name((el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") patchClass(el, nextValue, isSVG);
  else if (key === "style") patchStyle(el, prevValue, nextValue);
  else if (isOn(key)) {
    if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
  } else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  else {
    if (key === "true-value") el._trueValue = nextValue;
    else if (key === "false-value") el._falseValue = nextValue;
    patchAttr(el, key, nextValue, isSVG);
  }
}, "patchProp");
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") return true;
    if (key in el && isNativeOn(key) && isFunction(value)) return true;
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
  if (key === "sandbox" && el.tagName === "IFRAME") return false;
  if (key === "form") return false;
  if (key === "list" && el.tagName === "INPUT") return false;
  if (key === "type" && el.tagName === "TEXTAREA") return false;
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
  }
  if (isNativeOn(key) && isString(value)) return false;
  return key in el;
}
__name(shouldSetAsProp, "shouldSetAsProp");
function shouldSetAsPropForVueCE(el, key) {
  const props = el._def.props;
  if (!props) return false;
  const camelKey = camelize(key);
  return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
__name(shouldSetAsPropForVueCE, "shouldSetAsPropForVueCE");
var getModelAssigner = /* @__PURE__ */ __name((vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
}, "getModelAssigner");
function onCompositionStart(e2) {
  e2.target.composing = true;
}
__name(onCompositionStart, "onCompositionStart");
function onCompositionEnd(e2) {
  const target = e2.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
__name(onCompositionEnd, "onCompositionEnd");
var assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number) {
  if (trim) value = value.trim();
  if (number) value = looseToNumber(value);
  return value;
}
__name(castValue, "castValue");
var vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e2) => {
      if (e2.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) addEventListener(el, "change", () => {
      el.value = castValue(el.value, trim, castToNumber);
    });
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) return;
      if (trim && el.value.trim() === newValue) return;
    }
    el.value = newValue;
  }
};
var vModelCheckbox = {
  deep: true,
  created(el, _2, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign2 = el[assignKey];
      if (isArray$1(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) assign2(modelValue.concat(elementValue));
        else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign2(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) cloned.add(elementValue);
        else cloned.delete(elementValue);
        assign2(cloned);
      } else assign2(getCheckboxValue(el, checked));
    });
  },
  mounted: setChecked,
  beforeUpdate(el, binding2, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding2, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  let checked;
  if (isArray$1(value)) checked = looseIndexOf(value, vnode.props.value) > -1;
  else if (isSet(value)) checked = value.has(vnode.props.value);
  else {
    if (value === oldValue) return;
    checked = looseEqual(value, getCheckboxValue(el, true));
  }
  if (el.checked !== checked) el.checked = checked;
}
__name(setChecked, "setChecked");
var vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) el.checked = looseEqual(value, vnode.props.value);
  }
};
var vModelSelect = {
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o2) => o2.selected).map((o2) => number ? looseToNumber(getValue(o2)) : getValue(o2));
      el[assignKey](el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
      el._assigning = true;
      nextTick2(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    if (!el._assigning) setSelected(el, value);
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray$1(value);
  if (isMultiple && !isArrayValue && !isSet(value)) return;
  for (let i2 = 0, l2 = el.options.length; i2 < l2; i2++) {
    const option = el.options[i2];
    const optionValue = getValue(option);
    if (isMultiple) if (isArrayValue) {
      const optionType = typeof optionValue;
      if (optionType === "string" || optionType === "number") option.selected = value.some((v2) => String(v2) === String(optionValue));
      else option.selected = looseIndexOf(value, optionValue) > -1;
    } else option.selected = value.has(optionValue);
    else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i2) el.selectedIndex = i2;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
}
__name(setSelected, "setSelected");
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
__name(getValue, "getValue");
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
__name(getCheckboxValue, "getCheckboxValue");
var vModelDynamic = {
  created(el, binding2, vnode) {
    callModelHook(el, binding2, vnode, null, "created");
  },
  mounted(el, binding2, vnode) {
    callModelHook(el, binding2, vnode, null, "mounted");
  },
  beforeUpdate(el, binding2, vnode, prevVNode) {
    callModelHook(el, binding2, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding2, vnode, prevVNode) {
    callModelHook(el, binding2, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
__name(resolveDynamicModel, "resolveDynamicModel");
function callModelHook(el, binding2, vnode, prevVNode, hook) {
  const fn = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type)[hook];
  fn && fn(el, binding2, vnode, prevVNode);
}
__name(callModelHook, "callModelHook");
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value }) => ({ value });
  vModelRadio.getSSRProps = ({ value }, vnode) => {
    if (vnode.props && looseEqual(vnode.props.value, value)) return { checked: true };
  };
  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
    if (isArray$1(value)) {
      if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) return { checked: true };
    } else if (isSet(value)) {
      if (vnode.props && value.has(vnode.props.value)) return { checked: true };
    } else if (value) return { checked: true };
  };
  vModelDynamic.getSSRProps = (binding2, vnode) => {
    if (typeof vnode.type !== "string") return;
    const modelToUse = resolveDynamicModel(vnode.type.toUpperCase(), vnode.props && vnode.props.type);
    if (modelToUse.getSSRProps) return modelToUse.getSSRProps(binding2, vnode);
  };
}
__name(initVModelForSSR, "initVModelForSSR");
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
var enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
__name(ensureRenderer, "ensureRenderer");
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
__name(ensureHydrationRenderer, "ensureHydrationRenderer");
var createApp$1 = /* @__PURE__ */ __name(((...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
    if (container.nodeType === 1) container.textContent = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
}), "createApp$1");
var createSSRApp = /* @__PURE__ */ __name(((...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) return mount(container, true, resolveRootNamespace(container));
  };
  return app;
}), "createSSRApp");
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) return "svg";
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
__name(resolveRootNamespace, "resolveRootNamespace");
function normalizeContainer(container) {
  if (isString(container)) return document.querySelector(container);
  return container;
}
__name(normalizeContainer, "normalizeContainer");
var ssrDirectiveInitialized = false;
var initDirectivesForSSR = /* @__PURE__ */ __name(() => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
}, "initDirectivesForSSR");
var shouldIgnoreProp = /* @__PURE__ */ makeMap(`,key,ref,innerHTML,textContent,ref_key,ref_for`);
function ssrRenderAttrs(props, tag) {
  let ret = "";
  for (let key in props) {
    if (shouldIgnoreProp(key) || isOn(key) || tag === "textarea" && key === "value" || key.startsWith(".")) continue;
    const value = props[key];
    if (key.startsWith("^")) key = key.slice(1);
    if (key === "class") ret += ` class="${ssrRenderClass(value)}"`;
    else if (key === "style") ret += ` style="${ssrRenderStyle(value)}"`;
    else if (key === "className") {
      if (value != null) ret += ` class="${escapeHtml(String(value))}"`;
    } else ret += ssrRenderDynamicAttr(key, value, tag);
  }
  return ret;
}
__name(ssrRenderAttrs, "ssrRenderAttrs");
function ssrRenderDynamicAttr(key, value, tag) {
  if (!isRenderableAttrValue(value)) return ``;
  const attrKey = tag && (tag.indexOf("-") > 0 || isSVGTag(tag)) ? key : propsToAttrMap[key] || key.toLowerCase();
  if (isBooleanAttr(attrKey)) return includeBooleanAttr(value) ? ` ${attrKey}` : ``;
  else if (isSSRSafeAttrName(attrKey)) return value === "" ? ` ${attrKey}` : ` ${attrKey}="${escapeHtml(value)}"`;
  else {
    console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`);
    return ``;
  }
}
__name(ssrRenderDynamicAttr, "ssrRenderDynamicAttr");
function ssrRenderAttr(key, value) {
  if (!isRenderableAttrValue(value)) return ``;
  return ` ${key}="${escapeHtml(value)}"`;
}
__name(ssrRenderAttr, "ssrRenderAttr");
function ssrRenderClass(raw) {
  return escapeHtml(normalizeClass(raw));
}
__name(ssrRenderClass, "ssrRenderClass");
function ssrRenderStyle(raw) {
  if (!raw) return "";
  if (isString(raw)) return escapeHtml(raw);
  return escapeHtml(stringifyStyle(normalizeStyle(ssrResetCssVars(raw))));
}
__name(ssrRenderStyle, "ssrRenderStyle");
function ssrResetCssVars(raw) {
  if (!isArray$1(raw) && isObject(raw)) {
    const res = {};
    for (const key in raw) if (key.startsWith(":--")) res[key.slice(1)] = normalizeCssVarValue(raw[key]);
    else res[key] = raw[key];
    return res;
  }
  return raw;
}
__name(ssrResetCssVars, "ssrResetCssVars");
function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
  return renderComponentVNode(createVNode(comp, props, children), parentComponent, slotScopeId);
}
__name(ssrRenderComponent, "ssrRenderComponent");
var { ensureValidVNode } = ssrUtils;
function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId) {
  push(`<!--[-->`);
  ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId);
  push(`<!--]-->`);
}
__name(ssrRenderSlot, "ssrRenderSlot");
function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition) {
  const slotFn = slots[slotName];
  if (slotFn) {
    const slotBuffer = [];
    const bufferedPush = /* @__PURE__ */ __name((item) => {
      slotBuffer.push(item);
    }, "bufferedPush");
    const ret = slotFn(slotProps, bufferedPush, parentComponent, slotScopeId ? " " + slotScopeId : "");
    if (isArray$1(ret)) {
      const validSlotContent = ensureValidVNode(ret);
      if (validSlotContent) renderVNodeChildren(push, validSlotContent, parentComponent, slotScopeId);
      else if (fallbackRenderFn) fallbackRenderFn();
      else if (transition) push(`<!---->`);
    } else {
      let isEmptySlot = true;
      if (transition) isEmptySlot = false;
      else for (let i2 = 0; i2 < slotBuffer.length; i2++) if (!isComment(slotBuffer[i2])) {
        isEmptySlot = false;
        break;
      }
      if (isEmptySlot) {
        if (fallbackRenderFn) fallbackRenderFn();
      } else {
        let start = 0;
        let end = slotBuffer.length;
        if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
          start++;
          end--;
        }
        if (start < end) for (let i2 = start; i2 < end; i2++) push(slotBuffer[i2]);
        else if (transition) push(`<!---->`);
      }
    }
  } else if (fallbackRenderFn) fallbackRenderFn();
  else if (transition) push(`<!---->`);
}
__name(ssrRenderSlotInner, "ssrRenderSlotInner");
var commentTestRE = /^<!--[\s\S]*-->$/;
var commentRE = /<!--[^]*?-->/gm;
function isComment(item) {
  if (typeof item !== "string" || !commentTestRE.test(item)) return false;
  if (item.length <= 8) return true;
  return !item.replace(commentRE, "").trim();
}
__name(isComment, "isComment");
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
  parentPush("<!--teleport start-->");
  const context2 = parentComponent.appContext.provides[ssrContextKey];
  const teleportBuffers = context2.__teleportBuffers || (context2.__teleportBuffers = {});
  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
  const bufferIndex = targetBuffer.length;
  let teleportContent;
  if (disabled) {
    contentRenderFn(parentPush);
    teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
  } else {
    const { getBuffer, push } = createBuffer();
    push(`<!--teleport start anchor-->`);
    contentRenderFn(push);
    push(`<!--teleport anchor-->`);
    teleportContent = getBuffer();
  }
  targetBuffer.splice(bufferIndex, 0, teleportContent);
  parentPush("<!--teleport end-->");
}
__name(ssrRenderTeleport, "ssrRenderTeleport");
function ssrInterpolate(value) {
  return escapeHtml(toDisplayString(value));
}
__name(ssrInterpolate, "ssrInterpolate");
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = /* @__PURE__ */ __name((key, setter) => {
    let setters;
    if (!(setters = g2[key])) setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1) setters.forEach((set) => set(v2));
      else setters[0](v2);
    };
  }, "registerGlobalSetter");
  registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v2) => v2);
  registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v2) => v2);
}
function ssrRenderList(source, renderItem) {
  if (isArray$1(source) || isString(source)) for (let i2 = 0, l2 = source.length; i2 < l2; i2++) renderItem(source[i2], i2);
  else if (typeof source === "number") for (let i2 = 0; i2 < source; i2++) renderItem(i2 + 1, i2);
  else if (isObject(source)) if (source[Symbol.iterator]) {
    const arr = Array.from(source);
    for (let i2 = 0, l2 = arr.length; i2 < l2; i2++) renderItem(arr[i2], i2);
  } else {
    const keys = Object.keys(source);
    for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
      const key = keys[i2];
      renderItem(source[key], key, i2);
    }
  }
}
__name(ssrRenderList, "ssrRenderList");
function ssrCompile(template, instance) {
  throw new Error(`On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.`);
}
__name(ssrCompile, "ssrCompile");
var { createComponentInstance, setCurrentRenderingInstance, setupComponent, renderComponentRoot, normalizeVNode, pushWarningContext, popWarningContext } = ssrUtils;
function createBuffer() {
  let appendable = false;
  const buffer = [];
  return {
    getBuffer() {
      return buffer;
    },
    push(item) {
      const isStringItem = isString(item);
      if (appendable && isStringItem) {
        buffer[buffer.length - 1] += item;
        return;
      }
      buffer.push(item);
      appendable = isStringItem;
      if (isPromise(item) || isArray$1(item) && item.hasAsync) buffer.hasAsync = true;
    }
  };
}
__name(createBuffer, "createBuffer");
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
  const instance = vnode.component = createComponentInstance(vnode, parentComponent, null);
  const res = setupComponent(instance, true);
  const hasAsyncSetup = isPromise(res);
  let prefetches = instance.sp;
  if (hasAsyncSetup || prefetches) return Promise.resolve(res).then(() => {
    if (hasAsyncSetup) prefetches = instance.sp;
    if (prefetches) return Promise.all(prefetches.map((prefetch) => prefetch.call(instance.proxy)));
  }).catch(NOOP).then(() => renderComponentSubTree(instance, slotScopeId));
  else return renderComponentSubTree(instance, slotScopeId);
}
__name(renderComponentVNode, "renderComponentVNode");
function renderComponentSubTree(instance, slotScopeId) {
  const comp = instance.type;
  const { getBuffer, push } = createBuffer();
  if (isFunction(comp)) {
    let root = renderComponentRoot(instance);
    if (!comp.props) {
      for (const key in instance.attrs) if (key.startsWith(`data-v-`)) (root.props || (root.props = {}))[key] = ``;
    }
    renderVNode(push, instance.subTree = root, instance, slotScopeId);
  } else {
    if ((!instance.render || instance.render === NOOP) && !instance.ssrRender && !comp.ssrRender && isString(comp.template)) comp.ssrRender = ssrCompile(comp.template);
    const ssrRender = instance.ssrRender || comp.ssrRender;
    if (ssrRender) {
      let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
      let hasCloned = false;
      let cur = instance;
      while (true) {
        const scopeId = cur.vnode.scopeId;
        if (scopeId) {
          if (!hasCloned) {
            attrs = { ...attrs };
            hasCloned = true;
          }
          attrs[scopeId] = "";
        }
        const parent = cur.parent;
        if (parent && parent.subTree && parent.subTree === cur.vnode) cur = parent;
        else break;
      }
      if (slotScopeId) {
        if (!hasCloned) attrs = { ...attrs };
        const slotScopeIdList = slotScopeId.trim().split(" ");
        for (let i2 = 0; i2 < slotScopeIdList.length; i2++) attrs[slotScopeIdList[i2]] = "";
      }
      const prev = setCurrentRenderingInstance(instance);
      try {
        ssrRender(instance.proxy, push, instance, attrs, instance.props, instance.setupState, instance.data, instance.ctx);
      } finally {
        setCurrentRenderingInstance(prev);
      }
    } else if (instance.render && instance.render !== NOOP) renderVNode(push, instance.subTree = renderComponentRoot(instance), instance, slotScopeId);
    else {
      warn3(`Component ${comp.name || comp.__file || `<Anonymous>`} is missing template or render function.`);
      push(`<!---->`);
    }
  }
  return getBuffer();
}
__name(renderComponentSubTree, "renderComponentSubTree");
function renderVNode(push, vnode, parentComponent, slotScopeId) {
  const { type, shapeFlag, children, dirs, props } = vnode;
  if (dirs) vnode.props = applySSRDirectives(vnode, props, dirs);
  switch (type) {
    case Text:
      push(escapeHtml(children));
      break;
    case Comment:
      push(children ? `<!--${escapeHtmlComment(children)}-->` : `<!---->`);
      break;
    case Static:
      push(children);
      break;
    case Fragment:
      if (vnode.slotScopeIds) slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
      push(`<!--[-->`);
      renderVNodeChildren(push, children, parentComponent, slotScopeId);
      push(`<!--]-->`);
      break;
    default:
      if (shapeFlag & 1) renderElementVNode(push, vnode, parentComponent, slotScopeId);
      else if (shapeFlag & 6) push(renderComponentVNode(vnode, parentComponent, slotScopeId));
      else if (shapeFlag & 64) renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
      else if (shapeFlag & 128) renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
      else warn3("[@vue/server-renderer] Invalid VNode type:", type, `(${typeof type})`);
  }
}
__name(renderVNode, "renderVNode");
function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
  for (let i2 = 0; i2 < children.length; i2++) renderVNode(push, normalizeVNode(children[i2]), parentComponent, slotScopeId);
}
__name(renderVNodeChildren, "renderVNodeChildren");
function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
  const tag = vnode.type;
  let { props, children, shapeFlag, scopeId } = vnode;
  let openTag = `<${tag}`;
  if (props) openTag += ssrRenderAttrs(props, tag);
  if (scopeId) openTag += ` ${scopeId}`;
  let curParent = parentComponent;
  let curVnode = vnode;
  while (curParent && curVnode === curParent.subTree) {
    curVnode = curParent.vnode;
    if (curVnode.scopeId) openTag += ` ${curVnode.scopeId}`;
    curParent = curParent.parent;
  }
  if (slotScopeId) openTag += ` ${slotScopeId}`;
  push(openTag + `>`);
  if (!isVoidTag(tag)) {
    let hasChildrenOverride = false;
    if (props) {
      if (props.innerHTML) {
        hasChildrenOverride = true;
        push(props.innerHTML);
      } else if (props.textContent) {
        hasChildrenOverride = true;
        push(escapeHtml(props.textContent));
      } else if (tag === "textarea" && props.value) {
        hasChildrenOverride = true;
        push(escapeHtml(props.value));
      }
    }
    if (!hasChildrenOverride) {
      if (shapeFlag & 8) push(escapeHtml(children));
      else if (shapeFlag & 16) renderVNodeChildren(push, children, parentComponent, slotScopeId);
    }
    push(`</${tag}>`);
  }
}
__name(renderElementVNode, "renderElementVNode");
function applySSRDirectives(vnode, rawProps, dirs) {
  const toMerge = [];
  for (let i2 = 0; i2 < dirs.length; i2++) {
    const binding2 = dirs[i2];
    const { dir: { getSSRProps } } = binding2;
    if (getSSRProps) {
      const props = getSSRProps(binding2, vnode);
      if (props) toMerge.push(props);
    }
  }
  return mergeProps(rawProps || {}, ...toMerge);
}
__name(applySSRDirectives, "applySSRDirectives");
function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
  const target = vnode.props && vnode.props.to;
  const disabled = vnode.props && vnode.props.disabled;
  if (!target) {
    if (!disabled) warn3(`[@vue/server-renderer] Teleport is missing target prop.`);
    return [];
  }
  if (!isString(target)) {
    warn3(`[@vue/server-renderer] Teleport target must be a query selector string.`);
    return [];
  }
  ssrRenderTeleport(push, (push2) => {
    renderVNodeChildren(push2, vnode.children, parentComponent, slotScopeId);
  }, target, disabled || disabled === "", parentComponent);
}
__name(renderTeleportVNode, "renderTeleportVNode");
var { isVNode: isVNode$1 } = ssrUtils;
function nestedUnrollBuffer(buffer, parentRet, startIndex) {
  if (!buffer.hasAsync) return parentRet + unrollBufferSync$1(buffer);
  let ret = parentRet;
  for (let i2 = startIndex; i2 < buffer.length; i2 += 1) {
    const item = buffer[i2];
    if (isString(item)) {
      ret += item;
      continue;
    }
    if (isPromise(item)) return item.then((nestedItem) => {
      buffer[i2] = nestedItem;
      return nestedUnrollBuffer(buffer, ret, i2);
    });
    const result = nestedUnrollBuffer(item, ret, 0);
    if (isPromise(result)) return result.then((nestedItem) => {
      buffer[i2] = nestedItem;
      return nestedUnrollBuffer(buffer, "", i2);
    });
    ret = result;
  }
  return ret;
}
__name(nestedUnrollBuffer, "nestedUnrollBuffer");
function unrollBuffer$1(buffer) {
  return nestedUnrollBuffer(buffer, "", 0);
}
__name(unrollBuffer$1, "unrollBuffer$1");
function unrollBufferSync$1(buffer) {
  let ret = "";
  for (let i2 = 0; i2 < buffer.length; i2++) {
    let item = buffer[i2];
    if (isString(item)) ret += item;
    else ret += unrollBufferSync$1(item);
  }
  return ret;
}
__name(unrollBufferSync$1, "unrollBufferSync$1");
async function renderToString(input, context2 = {}) {
  if (isVNode$1(input)) return renderToString(createApp$1({ render: /* @__PURE__ */ __name(() => input, "render") }), context2);
  const vnode = createVNode(input._component, input._props);
  vnode.appContext = input._context;
  input.provide(ssrContextKey, context2);
  const result = await unrollBuffer$1(await renderComponentVNode(vnode));
  await resolveTeleports(context2);
  if (context2.__watcherHandles) for (const unwatch of context2.__watcherHandles) unwatch();
  return result;
}
__name(renderToString, "renderToString");
async function resolveTeleports(context2) {
  if (context2.__teleportBuffers) {
    context2.teleports = context2.teleports || {};
    for (const key in context2.__teleportBuffers) context2.teleports[key] = await unrollBuffer$1(await Promise.all([context2.__teleportBuffers[key]]));
  }
}
__name(resolveTeleports, "resolveTeleports");
var { isVNode } = ssrUtils;
initDirectivesForSSR();
var IS_CLIENT = typeof window !== "undefined";
var activePinia;
var setActivePinia = /* @__PURE__ */ __name((pinia) => activePinia = pinia, "setActivePinia");
var piniaSymbol = /* @__PURE__ */ Symbol();
function isPlainObject(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
__name(isPlainObject, "isPlainObject");
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
var _global = typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null };
function bom(blob, { autoBom = false } = {}) {
  if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
  return blob;
}
__name(bom, "bom");
function download(url, name, opts) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function() {
    console.error("could not download file");
  };
  xhr.send();
}
__name(download, "download");
function corsEnabled(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e2) {
  }
  return xhr.status >= 200 && xhr.status <= 299;
}
__name(corsEnabled, "corsEnabled");
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e2) {
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: 0,
      screenX: 80,
      screenY: 20,
      clientX: 80,
      clientY: 20,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null
    });
    node.dispatchEvent(evt);
  }
}
__name(click, "click");
var _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
var isMacOSWebView = /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent);
var saveAs = !IS_CLIENT ? () => {
} : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
function downloadSaveAs(blob, name = "download", opts) {
  const a2 = document.createElement("a");
  a2.download = name;
  a2.rel = "noopener";
  if (typeof blob === "string") {
    a2.href = blob;
    if (a2.origin !== location.origin) if (corsEnabled(a2.href)) download(blob, name, opts);
    else {
      a2.target = "_blank";
      click(a2);
    }
    else click(a2);
  } else {
    a2.href = URL.createObjectURL(blob);
    setTimeout(function() {
      URL.revokeObjectURL(a2.href);
    }, 4e4);
    setTimeout(function() {
      click(a2);
    }, 0);
  }
}
__name(downloadSaveAs, "downloadSaveAs");
function msSaveAs(blob, name = "download", opts) {
  if (typeof blob === "string") if (corsEnabled(blob)) download(blob, name, opts);
  else {
    const a2 = document.createElement("a");
    a2.href = blob;
    a2.target = "_blank";
    setTimeout(function() {
      click(a2);
    });
  }
  else navigator.msSaveOrOpenBlob(bom(blob, opts), name);
}
__name(msSaveAs, "msSaveAs");
function fileSaverSaveAs(blob, name, opts, popup) {
  popup = popup || open("", "_blank");
  if (popup) popup.document.title = popup.document.body.innerText = "downloading...";
  if (typeof blob === "string") return download(blob, name, opts);
  const force = blob.type === "application/octet-stream";
  const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
  const isChromeIOS = /CriOS\/[\d]+/.test("Cloudflare-Workers");
  if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
    const reader = new FileReader();
    reader.onloadend = function() {
      let url = reader.result;
      if (typeof url !== "string") {
        popup = null;
        throw new Error("Wrong reader.result type");
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
      if (popup) popup.location.href = url;
      else location.assign(url);
      popup = null;
    };
    reader.readAsDataURL(blob);
  } else {
    const url = URL.createObjectURL(blob);
    if (popup) popup.location.assign(url);
    else location.href = url;
    popup = null;
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 4e4);
  }
}
__name(fileSaverSaveAs, "fileSaverSaveAs");
var { assign: assign$1 } = Object;
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => /* @__PURE__ */ ref2({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      pinia._a = app;
      app.provide(piniaSymbol, pinia);
      app.config.globalProperties.$pinia = pinia;
      toBeInstalled.forEach((plugin) => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) toBeInstalled.push(plugin);
      else _p.push(plugin);
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
__name(createPinia, "createPinia");
var noop$1 = /* @__PURE__ */ __name(() => {
}, "noop$1");
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.add(callback);
  const removeSubscription = /* @__PURE__ */ __name(() => {
    subscriptions.delete(callback) && onCleanup();
  }, "removeSubscription");
  if (!detached && getCurrentScope()) onScopeDispose(removeSubscription);
  return removeSubscription;
}
__name(addSubscription, "addSubscription");
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.forEach((callback) => {
    callback(...args);
  });
}
__name(triggerSubscriptions, "triggerSubscriptions");
var fallbackRunWithContext = /* @__PURE__ */ __name((fn) => fn(), "fallbackRunWithContext");
var ACTION_MARKER = /* @__PURE__ */ Symbol();
var ACTION_NAME = /* @__PURE__ */ Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) patchToApply.forEach((value, key) => target.set(key, value));
  else if (target instanceof Set && patchToApply instanceof Set) patchToApply.forEach(target.add, target);
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key)) continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !/* @__PURE__ */ isRef(subPatch) && !/* @__PURE__ */ isReactive(subPatch)) target[key] = mergeReactiveObjects(targetValue, subPatch);
    else target[key] = subPatch;
  }
  return target;
}
__name(mergeReactiveObjects, "mergeReactiveObjects");
var skipHydrateSymbol = /* @__PURE__ */ Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !Object.prototype.hasOwnProperty.call(obj, skipHydrateSymbol);
}
__name(shouldHydrate, "shouldHydrate");
var { assign: assign$2 } = Object;
function isComputed(o2) {
  return !!(/* @__PURE__ */ isRef(o2) && o2.effect);
}
__name(isComputed, "isComputed");
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && true)
      pinia.state.value[id] = state ? state() : {};
    return assign$2(/* @__PURE__ */ toRefs(pinia.state.value[id]), actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  __name(setup, "setup");
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
__name(createOptionsStore, "createOptionsStore");
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = /* @__PURE__ */ new Set();
  let actionSubscriptions = /* @__PURE__ */ new Set();
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && true)
    pinia.state.value[$id] = {};
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = /* @__PURE__ */ Symbol();
    nextTick2().then(() => {
      if (activeListener === myListenerId) isListening = true;
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  __name($patch, "$patch");
  const $reset = isOptionsStore ? /* @__PURE__ */ __name(function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  }, "$reset") : noop$1;
  function $dispose() {
    scope.stop();
    subscriptions.clear();
    actionSubscriptions.clear();
    pinia._s.delete($id);
  }
  __name($dispose, "$dispose");
  const action = /* @__PURE__ */ __name((fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = /* @__PURE__ */ __name(function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackSet = /* @__PURE__ */ new Set();
      const onErrorCallbackSet = /* @__PURE__ */ new Set();
      function after(callback) {
        afterCallbackSet.add(callback);
      }
      __name(after, "after");
      function onError(callback) {
        onErrorCallbackSet.add(callback);
      }
      __name(onError, "onError");
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error3) {
        triggerSubscriptions(onErrorCallbackSet, error3);
        throw error3;
      }
      if (ret instanceof Promise) return ret.then((value) => {
        triggerSubscriptions(afterCallbackSet, value);
        return value;
      }).catch((error3) => {
        triggerSubscriptions(onErrorCallbackSet, error3);
        return Promise.reject(error3);
      });
      triggerSubscriptions(afterCallbackSet, ret);
      return ret;
    }, "wrappedAction");
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  }, "action");
  const store = /* @__PURE__ */ reactive({
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) callback({
          storeId: $id,
          type: MutationType.direct,
          events: debuggerEvents
        }, state);
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  });
  pinia._s.set($id, store);
  const setupStore = (pinia._a && pinia._a.runWithContext || fallbackRunWithContext)(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (/* @__PURE__ */ isRef(prop) && !isComputed(prop) || /* @__PURE__ */ isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) if (/* @__PURE__ */ isRef(prop)) prop.value = initialState[key];
        else mergeReactiveObjects(prop, initialState[key]);
        pinia.state.value[$id][key] = prop;
      }
    } else if (typeof prop === "function") {
      setupStore[key] = action(prop, key);
      optionsForPlugin.actions[key] = prop;
    }
  }
  assign$2(store, setupStore);
  assign$2(/* @__PURE__ */ toRaw(store), setupStore);
  Object.defineProperty(store, "$state", {
    get: /* @__PURE__ */ __name(() => pinia.state.value[$id], "get"),
    set: /* @__PURE__ */ __name((state) => {
      $patch(($state) => {
        assign$2($state, state);
      });
    }, "set")
  });
  pinia._p.forEach((extender) => {
    assign$2(store, scope.run(() => extender({
      store,
      app: pinia._a,
      pinia,
      options: optionsForPlugin
    })));
  });
  if (initialState && isOptionsStore && options.hydrate) options.hydrate(store.$state, initialState);
  isListening = true;
  isSyncListening = true;
  return store;
}
__name(createSetupStore, "createSetupStore");
// @__NO_SIDE_EFFECTS__
function defineStore(id, setup, setupOptions) {
  let options;
  const isSetupStore = typeof setup === "function";
  options = isSetupStore ? setupOptions : setup;
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = pinia || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia) setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) if (isSetupStore) createSetupStore(id, setup, options, pinia);
    else createOptionsStore(id, options, pinia);
    return pinia._s.get(id);
  }
  __name(useStore, "useStore");
  useStore.$id = id;
  return useStore;
}
__name(defineStore, "defineStore");
var isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
__name(isRouteComponent, "isRouteComponent");
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
__name(isESModule, "isESModule");
var assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
__name(applyToParams, "applyToParams");
var noop = /* @__PURE__ */ __name(() => {
}, "noop");
var isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
__name(mergeOptions, "mergeOptions");
var ErrorTypes = /* @__PURE__ */ (function(ErrorTypes2) {
  ErrorTypes2[ErrorTypes2["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes2[ErrorTypes2["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes2[ErrorTypes2["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes2;
})({});
var NavigationFailureSymbol = /* @__PURE__ */ Symbol("");
ErrorTypes.MATCHER_NOT_FOUND, ErrorTypes.NAVIGATION_GUARD_REDIRECT, ErrorTypes.NAVIGATION_ABORTED, ErrorTypes.NAVIGATION_CANCELLED, ErrorTypes.NAVIGATION_DUPLICATED;
function createRouterError(type, params) {
  return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
__name(createRouterError, "createRouterError");
function isNavigationFailure(error3, type) {
  return error3 instanceof Error && NavigationFailureSymbol in error3 && (type == null || !!(error3.type & type));
}
__name(isNavigationFailure, "isNavigationFailure");
var matchedRouteKey = /* @__PURE__ */ Symbol("");
var viewDepthKey = /* @__PURE__ */ Symbol("");
var routerKey = /* @__PURE__ */ Symbol("");
var routeLocationKey = /* @__PURE__ */ Symbol("");
var routerViewLocationKey = /* @__PURE__ */ Symbol("");
function useRoute(_name) {
  return inject(routeLocationKey);
}
__name(useRoute, "useRoute");
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
__name(commonEncode, "commonEncode");
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
__name(encodeHash, "encodeHash");
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
__name(encodeQueryValue, "encodeQueryValue");
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
__name(encodeQueryKey, "encodeQueryKey");
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
__name(encodePath, "encodePath");
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
__name(encodeParam, "encodeParam");
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
__name(decode, "decode");
var TRAILING_SLASH_RE = /\/$/;
var removeTrailingSlash = /* @__PURE__ */ __name((path) => path.replace(TRAILING_SLASH_RE, ""), "removeTrailingSlash");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
    query = parseQuery2(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
__name(parseURL, "parseURL");
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
__name(stringifyURL, "stringifyURL");
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
__name(stripBase, "stripBase");
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
__name(isSameRouteLocation, "isSameRouteLocation");
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
__name(isSameRouteRecord, "isSameRouteRecord");
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length) return false;
  for (var key in a2) if (!isSameRouteLocationParamsValue(a2[key], b2[key])) return false;
  return true;
}
__name(isSameRouteLocationParams, "isSameRouteLocationParams");
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : (a2 && a2.valueOf()) === (b2 && b2.valueOf());
}
__name(isSameRouteLocationParamsValue, "isSameRouteLocationParamsValue");
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
__name(isEquivalentArray, "isEquivalentArray");
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
__name(resolveRelativePath, "resolveRelativePath");
var START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType = /* @__PURE__ */ (function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
  return NavigationType2;
})({});
var NavigationDirection = /* @__PURE__ */ (function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
  return NavigationDirection2;
})({});
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
__name(normalizeBase, "normalizeBase");
var BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
__name(createHref, "createHref");
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
__name(getElementPosition, "getElementPosition");
var computeScrollPosition = /* @__PURE__ */ __name(() => ({
  left: window.scrollX,
  top: window.scrollY
}), "computeScrollPosition");
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) return;
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
__name(scrollToPosition, "scrollToPosition");
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
__name(getScrollKey, "getScrollKey");
var scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
__name(saveScrollPosition, "saveScrollPosition");
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
__name(getSavedScrollPosition, "getSavedScrollPosition");
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
__name(isRouteLocation, "isRouteLocation");
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
__name(isRouteName, "isRouteName");
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
__name(parseQuery, "parseQuery");
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)]).forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null) search += "=" + value2;
      }
    });
  }
  return search;
}
__name(stringifyQuery, "stringifyQuery");
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
__name(normalizeQuery, "normalizeQuery");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i2 = handlers.indexOf(handler);
      if (i2 > -1) handlers.splice(i2, 1);
    };
  }
  __name(add, "add");
  function reset() {
    handlers = [];
  }
  __name(reset, "reset");
  return {
    add,
    list: /* @__PURE__ */ __name(() => handlers.slice(), "list"),
    reset
  };
}
__name(useCallbacks, "useCallbacks");
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = /* @__PURE__ */ __name((valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    }, "next");
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
__name(guardToPromiseFn, "guardToPromiseFn");
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) for (const name in record.components) {
    let rawComponent = record.components[name];
    if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
    if (isRouteComponent(rawComponent)) {
      const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
      guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
    } else {
      let componentPromise = rawComponent();
      guards.push(() => componentPromise.then((resolved) => {
        if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
        const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
        record.mods[name] = resolved;
        record.components[name] = resolvedComponent;
        const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
        return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
      }));
    }
  }
  return guards;
}
__name(extractComponentsGuards, "extractComponentsGuards");
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
__name(extractChangingRecords, "extractChangingRecords");
var createBaseLocation = /* @__PURE__ */ __name(() => location.protocol + "//" + location.host, "createBaseLocation");
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
__name(createCurrentLocation, "createCurrentLocation");
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners2 = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = /* @__PURE__ */ __name(({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners2.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  }, "popStateHandler");
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  __name(pauseListeners, "pauseListeners");
  function listen(callback) {
    listeners2.push(callback);
    const teardown = /* @__PURE__ */ __name(() => {
      const index = listeners2.indexOf(callback);
      if (index > -1) listeners2.splice(index, 1);
    }, "teardown");
    teardowns.push(teardown);
    return teardown;
  }
  __name(listen, "listen");
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history2 } = window;
      if (!history2.state) return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
  }
  __name(beforeUnloadListener, "beforeUnloadListener");
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  __name(destroy, "destroy");
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
__name(useHistoryListeners, "useHistoryListeners");
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
__name(buildState, "buildState");
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = { value: createCurrentLocation(base, location2) };
  const historyState = { value: history2.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history2.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      console.error(err);
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  __name(changeLocation, "changeLocation");
  function replace(to, data) {
    changeLocation(to, assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  __name(replace, "replace");
  function push(to, data) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  __name(push, "push");
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
__name(useHistoryStateNavigation, "useHistoryStateNavigation");
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  __name(go, "go");
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: /* @__PURE__ */ __name(() => historyNavigation.location.value, "get")
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: /* @__PURE__ */ __name(() => historyNavigation.state.value, "get")
  });
  return routerHistory;
}
__name(createWebHistory, "createWebHistory");
function createMemoryHistory(base = "") {
  let listeners2 = [];
  let queue2 = [["", {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location2, state = {}) {
    position++;
    if (position !== queue2.length) queue2.splice(position);
    queue2.push([location2, state]);
  }
  __name(setLocation, "setLocation");
  function triggerListeners(to, from, { direction, delta }) {
    const info3 = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners2) callback(to, from, info3);
  }
  __name(triggerListeners, "triggerListeners");
  const routerHistory = {
    location: "",
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to, state) {
      queue2.splice(position--, 1);
      setLocation(to, state);
    },
    push(to, state) {
      setLocation(to, state);
    },
    listen(callback) {
      listeners2.push(callback);
      return () => {
        const index = listeners2.indexOf(callback);
        if (index > -1) listeners2.splice(index, 1);
      };
    },
    destroy() {
      listeners2 = [];
      queue2 = [["", {}]];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
      position = Math.max(0, Math.min(position + delta, queue2.length - 1));
      if (shouldTrigger) triggerListeners(this.location, from, {
        direction,
        delta
      });
    }
  };
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: /* @__PURE__ */ __name(() => queue2[position][0], "get")
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: /* @__PURE__ */ __name(() => queue2[position][1], "get")
  });
  return routerHistory;
}
__name(createMemoryHistory, "createMemoryHistory");
var TokenType = /* @__PURE__ */ (function(TokenType2) {
  TokenType2[TokenType2["Static"] = 0] = "Static";
  TokenType2[TokenType2["Param"] = 1] = "Param";
  TokenType2[TokenType2["Group"] = 2] = "Group";
  return TokenType2;
})({});
var TokenizerState = /* @__PURE__ */ (function(TokenizerState2) {
  TokenizerState2[TokenizerState2["Static"] = 0] = "Static";
  TokenizerState2[TokenizerState2["Param"] = 1] = "Param";
  TokenizerState2[TokenizerState2["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState2[TokenizerState2["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState2[TokenizerState2["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState2;
})(TokenizerState || {});
var ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  __name(crash, "crash");
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  __name(finalizeSegment, "finalizeSegment");
  let i2 = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  __name(consumeBuffer, "consumeBuffer");
  function addCharToBuffer() {
    buffer += char;
  }
  __name(addCharToBuffer, "addCharToBuffer");
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i2--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
__name(tokenizePath, "tokenizePath");
var BASE_PARAM_PATTERN = "[^/]+?";
var BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ (function(PathScore2) {
  PathScore2[PathScore2["_multiplier"] = 10] = "_multiplier";
  PathScore2[PathScore2["Root"] = 90] = "Root";
  PathScore2[PathScore2["Segment"] = 40] = "Segment";
  PathScore2[PathScore2["SubSegment"] = 30] = "SubSegment";
  PathScore2[PathScore2["Static"] = 40] = "Static";
  PathScore2[PathScore2["Dynamic"] = 20] = "Dynamic";
  PathScore2[PathScore2["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore2[PathScore2["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore2[PathScore2["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore2[PathScore2["BonusOptional"] = -8] = "BonusOptional";
  PathScore2[PathScore2["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore2[PathScore2["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore2;
})(PathScore || {});
var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re2 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  __name(parse, "parse");
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  __name(stringify, "stringify");
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
__name(tokensToParser, "tokensToParser");
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff) return diff;
    i2++;
  }
  if (a2.length < b2.length) return a2.length === 1 && a2[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a2.length > b2.length) return b2.length === 1 && b2[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
__name(compareScoreArray, "compareScoreArray");
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp) return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
__name(comparePathParserScore, "comparePathParserScore");
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
__name(isLastScoreNegative, "isLastScoreNegative");
var PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const matcher = assign(tokensToParser(tokenizePath(record.path), options), {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
__name(createRouteRecordMatcher, "createRouteRecordMatcher");
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  __name(getRecordMatcher, "getRecordMatcher");
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) originalRecord.alias.push(matcher);
      else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) removeRoute(record.name);
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  __name(addRoute, "addRoute");
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  __name(removeRoute, "removeRoute");
  function getRoutes() {
    return matchers;
  }
  __name(getRoutes, "getRoutes");
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  __name(insertMatcher, "insertMatcher");
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location2 });
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k2) => !k2.optional).concat(matcher.parent ? matcher.parent.keys.filter((k2) => k2.optional) : []).map((k2) => k2.name)), location2.params && pickParams(location2.params, matcher.keys.map((k2) => k2.name)));
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location2,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  __name(resolve, "resolve");
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  __name(clearRoutes, "clearRoutes");
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
__name(createRouterMatcher, "createRouterMatcher");
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
__name(pickParams, "pickParams");
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
__name(normalizeRouteRecord, "normalizeRouteRecord");
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
__name(normalizeRecordProps, "normalizeRecordProps");
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
__name(isAliasRecord, "isAliasRecord");
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
__name(mergeMetaFields, "mergeMetaFields");
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  return upper;
}
__name(findInsertionIndex, "findInsertionIndex");
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
__name(getInsertionAncestor, "getInsertionAncestor");
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
__name(isMatchable, "isMatchable");
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref2(props.to);
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      const p2 = router[unref2(props.replace) ? "replace" : "push"](unref2(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p2);
      return p2;
    }
    return Promise.resolve();
  }
  __name(navigate, "navigate");
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
__name(useLink, "useLink");
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
__name(preferSingleVNode, "preferSingleVNode");
var RouterLink = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = /* @__PURE__ */ reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h$1("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey) return;
  if (e2.defaultPrevented) return;
  if (e2.button !== void 0 && e2.button !== 0) return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e2.preventDefault) e2.preventDefault();
  return true;
}
__name(guardEvent, "guardEvent");
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value.valueOf() !== outerValue[i2].valueOf())) return false;
  }
  return true;
}
__name(includesParams, "includesParams");
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
__name(getOriginalPath, "getOriginalPath");
var getLinkClass = /* @__PURE__ */ __name((propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass, "getLinkClass");
var RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref2(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = /* @__PURE__ */ ref2();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = /* @__PURE__ */ __name((vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      }, "onVnodeUnmounted");
      const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
__name(normalizeSlot, "normalizeSlot");
var RouterView = RouterViewImpl;
function createRouter$1(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = /* @__PURE__ */ shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  __name(addRoute, "addRoute");
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
  }
  __name(removeRoute, "removeRoute");
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  __name(getRoutes, "getRoutes");
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  __name(hasRoute, "hasRoute");
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  __name(resolve, "resolve");
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  __name(locationAsObject, "locationAsObject");
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  __name(checkCanceledNavigation, "checkCanceledNavigation");
  function push(to) {
    return pushWithRedirect(to);
  }
  __name(push, "push");
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  __name(replace, "replace");
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  __name(handleRedirectRecord, "handleRedirectRecord");
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace2
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error3) => isNavigationFailure(error3) ? isNavigationFailure(error3, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error3 : markAsReady(error3) : triggerError(error3, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) return pushWithRedirect(assign({ replace: replace2 }, locationAsObject(failure2.to), {
          state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
          force
        }), redirectedFrom || toLocation);
      } else failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  __name(pushWithRedirect, "pushWithRedirect");
  function checkCanceledNavigationAndReject(to, from) {
    const error3 = checkCanceledNavigation(to, from);
    return error3 ? Promise.reject(error3) : Promise.resolve();
  }
  __name(checkCanceledNavigationAndReject, "checkCanceledNavigationAndReject");
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  __name(runWithContext, "runWithContext");
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  __name(navigate, "navigate");
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  __name(triggerAfterEach, "triggerAfterEach");
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error3 = checkCanceledNavigation(toLocation, from);
    if (error3) return error3;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace2 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  __name(finalizeNavigation, "finalizeNavigation");
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info3) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info3.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error3) => {
        if (isNavigationFailure(error3, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error3;
        if (isNavigationFailure(error3, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error3.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info3.delta && info3.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info3.delta) routerHistory.go(-info3.delta, false);
        return triggerError(error3, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info3.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info3.delta, false);
          else if (info3.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  __name(setupListeners, "setupListeners");
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error3, to, from) {
    markAsReady(error3);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error3, to, from));
    else console.error(error3);
    return Promise.reject(error3);
  }
  __name(triggerError, "triggerError");
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  __name(isReady, "isReady");
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  __name(markAsReady, "markAsReady");
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick2().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  __name(handleScroll, "handleScroll");
  const go = /* @__PURE__ */ __name((delta) => routerHistory.go(delta), "go");
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: /* @__PURE__ */ __name(() => go(-1), "back"),
    forward: /* @__PURE__ */ __name(() => go(1), "forward"),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: /* @__PURE__ */ __name(() => unref2(currentRoute), "get")
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: /* @__PURE__ */ __name(() => currentRoute.value[key], "get"),
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, /* @__PURE__ */ shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  __name(runGuardQueue, "runGuardQueue");
  return router;
}
__name(createRouter$1, "createRouter$1");
var t = Object.freeze({
  __proto__: null,
  get start() {
    return It;
  },
  get ensureJQuerySupport() {
    return ft;
  },
  get setBootstrapMaxTime() {
    return K;
  },
  get setMountMaxTime() {
    return H;
  },
  get setUnmountMaxTime() {
    return J;
  },
  get setUnloadMaxTime() {
    return Q;
  },
  get registerApplication() {
    return Tt;
  },
  get unregisterApplication() {
    return At;
  },
  get getMountedApps() {
    return Et;
  },
  get getAppStatus() {
    return Pt;
  },
  get unloadApplication() {
    return Nt;
  },
  get checkActivityFunctions() {
    return bt;
  },
  get getAppNames() {
    return vt;
  },
  get pathToActiveWhen() {
    return Dt;
  },
  get navigateToUrl() {
    return tt;
  },
  get patchHistoryApi() {
    return at;
  },
  get triggerAppChange() {
    return $t;
  },
  get addErrorHandler() {
    return i;
  },
  get removeErrorHandler() {
    return s;
  },
  get mountRootParcel() {
    return G;
  },
  get NOT_LOADED() {
    return c;
  },
  get LOADING_SOURCE_CODE() {
    return l;
  },
  get NOT_BOOTSTRAPPED() {
    return f;
  },
  get BOOTSTRAPPING() {
    return p;
  },
  get NOT_MOUNTED() {
    return h;
  },
  get MOUNTING() {
    return m;
  },
  get UPDATING() {
    return w;
  },
  get LOAD_ERROR() {
    return E;
  },
  get MOUNTED() {
    return d;
  },
  get UNLOADING() {
    return y;
  },
  get UNMOUNTING() {
    return g;
  },
  get SKIP_BECAUSE_BROKEN() {
    return v;
  }
});
var e = ("undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).CustomEvent;
var n = (function() {
  try {
    var t2 = new e("cat", { detail: { foo: "bar" } });
    return "cat" === t2.type && "bar" === t2.detail.foo;
  } catch (t3) {
  }
  return false;
})() ? e : "undefined" != typeof document && "function" == typeof document.createEvent ? function(t2, e2) {
  var n2 = document.createEvent("CustomEvent");
  return e2 ? n2.initCustomEvent(t2, e2.bubbles, e2.cancelable, e2.detail) : n2.initCustomEvent(t2, false, false, void 0), n2;
} : function(t2, e2) {
  var n2 = document.createEventObject();
  return n2.type = t2, e2 ? (n2.bubbles = Boolean(e2.bubbles), n2.cancelable = Boolean(e2.cancelable), n2.detail = e2.detail) : (n2.bubbles = false, n2.cancelable = false, n2.detail = void 0), n2;
};
var r = [];
function o(t2, e2, n2) {
  const o2 = a(t2, e2, n2);
  r.length ? r.forEach(((t3) => t3(o2))) : setTimeout((() => {
    throw o2;
  }));
}
__name(o, "o");
function i(t2) {
  if ("function" != typeof t2) throw Error(u(28, false));
  r.push(t2);
}
__name(i, "i");
function s(t2) {
  if ("function" != typeof t2) throw Error(u(29, false));
  let e2 = false;
  return r = r.filter(((n2) => {
    const r2 = n2 === t2;
    return e2 = e2 || r2, !r2;
  })), e2;
}
__name(s, "s");
function u(t2, e2, ...n2) {
  return `single-spa minified message #${t2}: ${e2 ? e2 + " " : ""}See https://single-spa.js.org/error/?code=${t2}${n2.length ? `&arg=${n2.join("&arg=")}` : ""}`;
}
__name(u, "u");
function a(t2, e2, n2) {
  const r2 = `${A(e2)} '${T(e2)}' died in status ${e2.status}: `;
  let o2;
  if (t2 instanceof Error) {
    try {
      t2.message = r2 + t2.message;
    } catch (t3) {
    }
    o2 = t2;
  } else {
    console.warn(u(30, false, e2.status, T(e2)));
    try {
      o2 = Error(r2 + JSON.stringify(t2));
    } catch (e3) {
      o2 = t2;
    }
  }
  return o2.appOrParcelName = T(e2), e2.status = n2, o2;
}
__name(a, "a");
var c = "NOT_LOADED";
var l = "LOADING_SOURCE_CODE";
var f = "NOT_BOOTSTRAPPED";
var p = "BOOTSTRAPPING";
var h = "NOT_MOUNTED";
var m = "MOUNTING";
var d = "MOUNTED";
var w = "UPDATING";
var g = "UNMOUNTING";
var y = "UNLOADING";
var E = "LOAD_ERROR";
var v = "SKIP_BECAUSE_BROKEN";
function P(t2) {
  return t2.status === d;
}
__name(P, "P");
function O(t2) {
  try {
    return t2.activeWhen(window.location);
  } catch (e2) {
    return o(e2, t2, v), false;
  }
}
__name(O, "O");
function T(t2) {
  return t2.name;
}
__name(T, "T");
function b(t2) {
  return Boolean(t2.unmountThisParcel);
}
__name(b, "b");
function A(t2) {
  return b(t2) ? "parcel" : "application";
}
__name(A, "A");
function N() {
  for (let t2 = arguments.length - 1; t2 > 0; t2--) for (let e2 in arguments[t2]) "__proto__" !== e2 && (arguments[t2 - 1][e2] = arguments[t2][e2]);
  return arguments[0];
}
__name(N, "N");
function S(t2, e2) {
  for (let n2 = 0; n2 < t2.length; n2++) if (e2(t2[n2])) return t2[n2];
  return null;
}
__name(S, "S");
function _(t2) {
  return t2 && ("function" == typeof t2 || (e2 = t2, Array.isArray(e2) && !S(e2, ((t3) => "function" != typeof t3))));
  var e2;
}
__name(_, "_");
function D(t2, e2) {
  let n2 = t2[e2] || [];
  n2 = Array.isArray(n2) ? n2 : [n2], 0 === n2.length && (n2 = [() => Promise.resolve()]);
  const r2 = A(t2), o2 = T(t2);
  return function(t3) {
    return n2.reduce(((n3, i2, s2) => n3.then((() => {
      const n4 = i2(t3);
      return U(n4) ? n4 : Promise.reject(u(15, false, r2, o2, e2, s2));
    }))), Promise.resolve());
  };
}
__name(D, "D");
function U(t2) {
  return t2 && "function" == typeof t2.then && "function" == typeof t2.catch;
}
__name(U, "U");
var M = [];
function j(t2, e2) {
  return Promise.resolve().then((() => t2.status !== "NOT_BOOTSTRAPPED" ? t2 : (t2.status = p, t2.bootstrap ? V(t2, "bootstrap").then(n2).catch(((n3) => {
    if (e2) throw a(n3, t2, v);
    return o(n3, t2, v), t2;
  })) : Promise.resolve().then(n2))));
  function n2() {
    return t2.status = h, t2;
  }
  __name(n2, "n");
}
__name(j, "j");
function $(t2, e2) {
  return Promise.resolve().then((() => {
    if (t2.status !== "MOUNTED") return t2;
    t2.status = g;
    const n2 = Object.keys(t2.parcels).map(((e3) => t2.parcels[e3].unmountThisParcel()));
    return Promise.all(n2).then(r2, ((n3) => r2().then((() => {
      const r3 = Error(n3.message);
      if (e2) throw a(r3, t2, v);
      o(r3, t2, v);
    })))).then((() => t2));
    function r2() {
      return V(t2, "unmount").then((() => {
        t2.status = h;
      }), ((n3) => {
        if (e2) throw a(n3, t2, v);
        o(n3, t2, v);
      }));
    }
    __name(r2, "r");
  }));
}
__name($, "$");
var L = false;
var R = false;
function x(t2, e2) {
  return Promise.resolve().then((() => t2.status !== "NOT_MOUNTED" ? t2 : (L || (window.dispatchEvent(new n("single-spa:before-first-mount")), L = true), t2.status = m, V(t2, "mount").then((() => (t2.status = d, R || (window.dispatchEvent(new n("single-spa:first-mount")), R = true), t2))).catch(((n2) => {
    return t2.status = d, $(t2, true).then(r2, r2);
    function r2() {
      if (e2) throw a(n2, t2, v);
      return o(n2, t2, v), t2;
    }
    __name(r2, "r");
  })))));
}
__name(x, "x");
var I = 0;
var B = { parcels: {} };
function G() {
  return W.apply(B, arguments);
}
__name(G, "G");
function W(t2, e2) {
  const n2 = this;
  if (!t2 || "object" != typeof t2 && "function" != typeof t2) throw Error(u(2, false));
  if (t2.name && "string" != typeof t2.name) throw Error(u(3, false, typeof t2.name));
  const r2 = I++;
  let o2 = t2.name || `parcel-${r2}`;
  if ("object" != typeof e2) throw Error(u(4, false, o2, typeof e2));
  if (!e2.domElement) throw Error(u(5, false, o2));
  const i2 = "function" == typeof t2, s2 = i2 ? t2 : () => Promise.resolve(t2), c2 = {
    id: r2,
    parcels: {},
    status: i2 ? l : f,
    customProps: e2,
    parentName: T(n2),
    unmountThisParcel: /* @__PURE__ */ __name(() => y2.then((() => {
      if (c2.status !== "MOUNTED") throw Error(u(6, false, o2, c2.status));
      return $(c2, true);
    })).then(((t3) => (c2.parentName && delete n2.parcels[c2.id], t3))).then(((t3) => (E2(t3), t3))).catch(((t3) => {
      throw c2.status = v, P2(t3), t3;
    })), "unmountThisParcel")
  };
  let p2;
  n2.parcels[r2] = c2;
  let m2 = s2();
  if (!m2 || "function" != typeof m2.then) throw Error(u(7, false));
  m2 = m2.then(((t3) => {
    if (!t3) throw Error(u(8, false));
    if (o2 = t3.name || `parcel-${r2}`, Object.prototype.hasOwnProperty.call(t3, "bootstrap") && !_(t3.bootstrap)) throw Error(u(9, false, o2));
    if (!_(t3.mount)) throw Error(u(10, false, o2));
    if (!_(t3.unmount)) throw Error(u(11, false, o2));
    if (t3.update && !_(t3.update)) throw Error(u(12, false, o2));
    const e3 = D(t3, "bootstrap"), n3 = D(t3, "mount"), i3 = D(t3, "unmount");
    c2.status = f, c2.name = o2, c2.bootstrap = e3, c2.mount = n3, c2.unmount = i3, c2.timeouts = q(t3.timeouts), t3.update && (c2.update = D(t3, "update"), p2.update = function(t4) {
      return c2.customProps = t4, C((e4 = c2, Promise.resolve().then((() => {
        if (e4.status !== "MOUNTED") throw Error(u(32, false, T(e4)));
        return e4.status = "UPDATING", V(e4, "update").then((() => (e4.status = "MOUNTED", e4))).catch(((t5) => {
          throw a(t5, e4, "SKIP_BECAUSE_BROKEN");
        }));
      }))));
      var e4;
    });
  }));
  const g2 = m2.then((() => j(c2, true))), y2 = g2.then((() => x(c2, true)));
  let E2, P2;
  const O2 = new Promise(((t3, e3) => {
    E2 = t3, P2 = e3;
  }));
  return p2 = {
    mount: /* @__PURE__ */ __name(() => C(Promise.resolve().then((() => {
      if (c2.status !== "NOT_MOUNTED") throw Error(u(13, false, o2, c2.status));
      return n2.parcels[r2] = c2, x(c2);
    }))), "mount"),
    unmount: /* @__PURE__ */ __name(() => C(c2.unmountThisParcel()), "unmount"),
    getStatus: /* @__PURE__ */ __name(() => c2.status, "getStatus"),
    loadPromise: C(m2),
    bootstrapPromise: C(g2),
    mountPromise: C(y2),
    unmountPromise: C(O2)
  }, p2;
}
__name(W, "W");
function C(t2) {
  return t2.then((() => null));
}
__name(C, "C");
function k(e2) {
  const n2 = T(e2);
  let r2 = "function" == typeof e2.customProps ? e2.customProps(n2, window.location) : e2.customProps;
  ("object" != typeof r2 || null === r2 || Array.isArray(r2)) && (r2 = {}, console.warn(u(40, false), n2, r2));
  const o2 = N({}, r2, {
    name: n2,
    mountParcel: W.bind(e2),
    singleSpa: t
  });
  return b(e2) && (o2.unmountSelf = e2.unmountThisParcel), o2;
}
__name(k, "k");
var F = {
  bootstrap: {
    millis: 4e3,
    dieOnTimeout: false,
    warningMillis: 1e3
  },
  mount: {
    millis: 3e3,
    dieOnTimeout: false,
    warningMillis: 1e3
  },
  unmount: {
    millis: 3e3,
    dieOnTimeout: false,
    warningMillis: 1e3
  },
  unload: {
    millis: 3e3,
    dieOnTimeout: false,
    warningMillis: 1e3
  },
  update: {
    millis: 3e3,
    dieOnTimeout: false,
    warningMillis: 1e3
  }
};
function K(t2, e2, n2) {
  if ("number" != typeof t2 || t2 <= 0) throw Error(u(16, false));
  F.bootstrap = {
    millis: t2,
    dieOnTimeout: e2,
    warningMillis: n2 || 1e3
  };
}
__name(K, "K");
function H(t2, e2, n2) {
  if ("number" != typeof t2 || t2 <= 0) throw Error(u(17, false));
  F.mount = {
    millis: t2,
    dieOnTimeout: e2,
    warningMillis: n2 || 1e3
  };
}
__name(H, "H");
function J(t2, e2, n2) {
  if ("number" != typeof t2 || t2 <= 0) throw Error(u(18, false));
  F.unmount = {
    millis: t2,
    dieOnTimeout: e2,
    warningMillis: n2 || 1e3
  };
}
__name(J, "J");
function Q(t2, e2, n2) {
  if ("number" != typeof t2 || t2 <= 0) throw Error(u(19, false));
  F.unload = {
    millis: t2,
    dieOnTimeout: e2,
    warningMillis: n2 || 1e3
  };
}
__name(Q, "Q");
function V(t2, e2) {
  const n2 = t2.timeouts[e2], r2 = n2.warningMillis, o2 = A(t2);
  return new Promise(((i2, s2) => {
    let a2 = false, c2 = false;
    t2[e2](k(t2)).then(((t3) => {
      a2 = true, i2(t3);
    })).catch(((t3) => {
      a2 = true, s2(t3);
    })), setTimeout((() => f2(1)), r2), setTimeout((() => f2(true)), n2.millis);
    const l2 = u(31, false, e2, o2, T(t2), n2.millis);
    function f2(t3) {
      if (!a2) {
        if (true === t3) c2 = true, n2.dieOnTimeout ? s2(Error(l2)) : console.error(l2);
        else if (!c2) {
          const e3 = t3, o3 = e3 * r2;
          console.warn(l2), o3 + r2 < n2.millis && setTimeout((() => f2(e3 + 1)), r2);
        }
      }
    }
    __name(f2, "f");
  }));
}
__name(V, "V");
function q(t2) {
  const e2 = {};
  for (let n2 in F) e2[n2] = N({}, F[n2], t2 && t2[n2] || {});
  return e2;
}
__name(q, "q");
function z(t2) {
  return Promise.resolve().then((() => {
    if (t2.loadPromise) return t2.loadPromise;
    if (t2.status !== "NOT_LOADED" && t2.status !== "LOAD_ERROR") return t2;
    let e2, n2;
    return t2.status = l, t2.loadPromise = Promise.resolve().then((() => {
      const r2 = t2.loadApp(k(t2));
      if (!U(r2)) throw n2 = true, Error(u(33, false, T(t2)));
      return r2.then(((n3) => {
        let r3;
        t2.loadErrorTime = null, e2 = n3, "object" != typeof e2 && (r3 = 34), Object.prototype.hasOwnProperty.call(e2, "bootstrap") && !_(e2.bootstrap) && (r3 = 35), _(e2.mount) || (r3 = 36), _(e2.unmount) || (r3 = 37);
        const i2 = A(e2);
        if (r3) {
          let n4;
          try {
            n4 = JSON.stringify(e2);
          } catch (t3) {
          }
          return console.error(u(r3, false, i2, T(t2), n4), e2), o(void 0, t2, v), t2;
        }
        return e2.devtools && e2.devtools.overlays && (t2.devtools.overlays = N({}, t2.devtools.overlays, e2.devtools.overlays)), t2.status = f, t2.bootstrap = D(e2, "bootstrap"), t2.mount = D(e2, "mount"), t2.unmount = D(e2, "unmount"), t2.unload = D(e2, "unload"), t2.timeouts = q(e2.timeouts), delete t2.loadPromise, t2;
      }));
    })).catch(((e3) => {
      let r2;
      return delete t2.loadPromise, n2 ? r2 = v : (r2 = E, t2.loadErrorTime = (/* @__PURE__ */ new Date()).getTime()), o(e3, t2, r2), t2;
    }));
  }));
}
__name(z, "z");
var X = "undefined" != typeof window;
var Y = {
  hashchange: [],
  popstate: []
};
var Z = ["hashchange", "popstate"];
function tt(t2) {
  let e2;
  if ("string" == typeof t2) e2 = t2;
  else if (this && this.href) e2 = this.href;
  else {
    if (!(t2 && t2.currentTarget && t2.currentTarget.href && t2.preventDefault)) throw Error(u(14, false));
    e2 = t2.currentTarget.href, t2.preventDefault();
  }
  const n2 = ct(window.location.href), r2 = ct(e2);
  0 === e2.indexOf("#") ? window.location.hash = r2.hash : n2.host !== r2.host && r2.host ? window.location.href = e2 : r2.pathname === n2.pathname && r2.search === n2.search ? window.location.hash = r2.hash : window.history.pushState(null, null, e2);
}
__name(tt, "tt");
function et(t2) {
  if (t2) {
    const e2 = t2[0].type;
    Z.indexOf(e2) >= 0 && Y[e2].forEach(((e3) => {
      try {
        e3.apply(this, t2);
      } catch (t3) {
        setTimeout((() => {
          throw t3;
        }));
      }
    }));
  }
}
__name(et, "et");
var nt;
function rt() {
  Lt([], arguments);
}
__name(rt, "rt");
function ot(t2, e2) {
  return function() {
    const n2 = window.location.href, r2 = t2.apply(this, arguments), o2 = window.location.href;
    return nt && n2 === o2 || window.dispatchEvent(it(window.history.state, e2)), r2;
  };
}
__name(ot, "ot");
function it(t2, e2) {
  let n2;
  try {
    n2 = new PopStateEvent("popstate", { state: t2 });
  } catch (e3) {
    n2 = document.createEvent("PopStateEvent"), n2.initPopStateEvent("popstate", false, false, t2);
  }
  return n2.singleSpa = true, n2.singleSpaTrigger = e2, n2;
}
__name(it, "it");
var st = null;
var ut = false;
function at(t2) {
  if (ut) throw Error(u(43, false));
  nt = !t2 || !t2.hasOwnProperty("urlRerouteOnly") || t2.urlRerouteOnly, ut = true, st = window.history.replaceState, window.addEventListener("hashchange", rt), window.addEventListener("popstate", rt);
  const e2 = window.addEventListener, n2 = window.removeEventListener;
  window.addEventListener = function(t3, n3) {
    if (!("function" == typeof n3 && Z.indexOf(t3) >= 0) || S(Y[t3], ((t4) => t4 === n3))) return e2.apply(this, arguments);
    Y[t3].push(n3);
  }, window.removeEventListener = function(t3, e3) {
    return "function" == typeof e3 && Z.indexOf(t3) >= 0 && (Y[t3] = Y[t3].filter(((t4) => t4 !== e3))), n2.apply(this, arguments);
  }, window.history.pushState = ot(window.history.pushState, "pushState"), window.history.replaceState = ot(st, "replaceState");
}
__name(at, "at");
function ct(t2) {
  const e2 = document.createElement("a");
  return e2.href = t2, e2;
}
__name(ct, "ct");
X && (window.singleSpaNavigate ? console.warn(u(41, false)) : window.singleSpaNavigate = tt);
var lt = false;
function ft(t2 = window.jQuery) {
  if (t2 || window.$ && window.$.fn && window.$.fn.jquery && (t2 = window.$), t2 && !lt) {
    const e2 = t2.fn.on, n2 = t2.fn.off;
    t2.fn.on = function(t3, n3) {
      return pt.call(this, e2, window.addEventListener, t3, n3, arguments);
    }, t2.fn.off = function(t3, e3) {
      return pt.call(this, n2, window.removeEventListener, t3, e3, arguments);
    }, lt = true;
  }
}
__name(ft, "ft");
function pt(t2, e2, n2, r2, o2) {
  return "string" != typeof n2 ? t2.apply(this, o2) : (n2.split(/\s+/).forEach(((t3) => {
    Z.indexOf(t3) >= 0 && (e2(t3, r2), n2 = n2.replace(t3, ""));
  })), "" === n2.trim() ? this : t2.apply(this, o2));
}
__name(pt, "pt");
var ht = {};
function mt(t2) {
  return Promise.resolve().then((() => {
    const e2 = ht[T(t2)];
    if (!e2) return t2;
    if (t2.status === "NOT_LOADED") return dt(t2, e2), t2;
    if (t2.status === "UNLOADING") return e2.promise.then((() => t2));
    if (t2.status !== "NOT_MOUNTED" && t2.status !== "LOAD_ERROR") return t2;
    const n2 = t2.status === "LOAD_ERROR" ? Promise.resolve() : V(t2, "unload");
    return t2.status = y, n2.then((() => (dt(t2, e2), t2))).catch(((n3) => ((function(t3, e3, n4) {
      delete ht[T(t3)], delete t3.bootstrap, delete t3.mount, delete t3.unmount, delete t3.unload, o(n4, t3, v), e3.reject(n4);
    })(t2, e2, n3), t2)));
  }));
}
__name(mt, "mt");
function dt(t2, e2) {
  delete ht[T(t2)], delete t2.bootstrap, delete t2.mount, delete t2.unmount, delete t2.unload, t2.status = c, e2.resolve();
}
__name(dt, "dt");
function wt(t2, e2, n2, r2) {
  ht[T(t2)] = {
    app: t2,
    resolve: n2,
    reject: r2
  }, Object.defineProperty(ht[T(t2)], "promise", { get: e2 });
}
__name(wt, "wt");
function gt(t2) {
  return ht[t2];
}
__name(gt, "gt");
var yt = [];
function Et() {
  return yt.filter(P).map(T);
}
__name(Et, "Et");
function vt() {
  return yt.map(T);
}
__name(vt, "vt");
function Pt(t2) {
  const e2 = S(yt, ((e3) => T(e3) === t2));
  return e2 ? e2.status : null;
}
__name(Pt, "Pt");
var Ot = false;
function Tt(t2, e2, n2, r2) {
  const o2 = (function(t3, e3, n3, r3) {
    const o3 = {
      name: null,
      loadApp: null,
      activeWhen: null,
      customProps: null
    };
    return "object" == typeof t3 ? ((function(t4) {
      if (Array.isArray(t4) || null === t4) throw Error(u(39, false));
      const e4 = [
        "name",
        "app",
        "activeWhen",
        "customProps"
      ], n4 = Object.keys(t4).reduce(((t5, n5) => e4.indexOf(n5) >= 0 ? t5 : t5.concat(n5)), []);
      if (0 !== n4.length) throw Error(u(38, false, e4.join(", "), n4.join(", ")));
      if ("string" != typeof t4.name || 0 === t4.name.length) throw Error(u(20, false));
      if ("object" != typeof t4.app && "function" != typeof t4.app) throw Error(u(20, false));
      const r4 = /* @__PURE__ */ __name((t5) => "string" == typeof t5 || "function" == typeof t5, "r");
      if (!(r4(t4.activeWhen) || Array.isArray(t4.activeWhen) && t4.activeWhen.every(r4))) throw Error(u(24, false));
      if (!_t(t4.customProps)) throw Error(u(22, false));
    })(t3), o3.name = t3.name, o3.loadApp = t3.app, o3.activeWhen = t3.activeWhen, o3.customProps = t3.customProps) : ((function(t4, e4, n4, r4) {
      if ("string" != typeof t4 || 0 === t4.length) throw Error(u(20, false));
      if (!e4) throw Error(u(23, false));
      if ("function" != typeof n4) throw Error(u(24, false));
      if (!_t(r4)) throw Error(u(22, false));
    })(t3, e3, n3, r3), o3.name = t3, o3.loadApp = e3, o3.activeWhen = n3, o3.customProps = r3), o3.loadApp = "function" != typeof (i2 = o3.loadApp) ? () => Promise.resolve(i2) : i2, o3.customProps = /* @__PURE__ */ (function(t4) {
      return t4 || {};
    })(o3.customProps), o3.activeWhen = (function(t4) {
      let e4 = Array.isArray(t4) ? t4 : [t4];
      return e4 = e4.map(((t5) => "function" == typeof t5 ? t5 : Dt(t5))), (t5) => e4.some(((e5) => e5(t5)));
    })(o3.activeWhen), o3;
    var i2;
  })(t2, e2, n2, r2);
  if (Bt() || Ot || (Ot = true, setTimeout((() => {
    Bt() || console.warn(u(1, false));
  }), 5e3)), -1 !== vt().indexOf(o2.name)) throw Error(u(21, false, o2.name));
  yt.push(N({
    loadErrorTime: null,
    status: c,
    parcels: {},
    devtools: { overlays: {
      options: {},
      selectors: []
    } }
  }, o2)), X && (ft(), Lt());
}
__name(Tt, "Tt");
function bt(t2 = window.location) {
  return yt.filter(((e2) => e2.activeWhen(t2))).map(T);
}
__name(bt, "bt");
function At(t2) {
  if (0 === yt.filter(((e2) => T(e2) === t2)).length) throw Error(u(25, false, t2));
  return (X ? Nt(t2, { waitForUnmount: false }) : Promise.resolve()).then((() => {
    const e2 = yt.map(T).indexOf(t2);
    yt.splice(e2, 1);
  }));
}
__name(At, "At");
function Nt(t2, e2 = { waitForUnmount: false }) {
  if ("string" != typeof t2) throw Error(u(26, false));
  const n2 = S(yt, ((e3) => T(e3) === t2));
  if (!n2) throw Error(u(27, false, t2));
  const r2 = gt(T(n2));
  if (e2 && e2.waitForUnmount) {
    if (r2) return r2.promise;
    {
      const t3 = new Promise(((e3, r3) => {
        wt(n2, (() => t3), e3, r3);
      }));
      return t3;
    }
  }
  {
    let t3;
    return r2 ? (t3 = r2.promise, St(n2, r2.resolve, r2.reject)) : t3 = new Promise(((e3, r3) => {
      wt(n2, (() => t3), e3, r3), St(n2, e3, r3);
    })), t3;
  }
}
__name(Nt, "Nt");
function St(t2, e2, n2) {
  Promise.resolve().then((() => {
    if (S(bt(), ((e3) => e3 === T(t2)))) return $t();
  })).then((() => $(t2).then(mt).then((() => {
    e2(), setTimeout((() => {
      Lt();
    }));
  })))).catch(n2);
}
__name(St, "St");
function _t(t2) {
  return !t2 || "function" == typeof t2 || "object" == typeof t2 && null !== t2 && !Array.isArray(t2);
}
__name(_t, "_t");
function Dt(t2, e2) {
  const n2 = (function(t3, e3) {
    let n3 = 0, r2 = false, o2 = "^";
    "/" !== t3[0] && (t3 = "/" + t3);
    for (let e4 = 0; e4 < t3.length; e4++) {
      const n4 = t3[e4];
      (!r2 && ":" === n4 || r2 && "/" === n4) && i2(e4);
    }
    return i2(t3.length), new RegExp(o2, "i");
    function i2(i3) {
      const s2 = t3.slice(n3, i3).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      if (o2 += r2 ? "[^/]+/?" : s2, i3 === t3.length) if (r2) e3 && (o2 += "$");
      else {
        const t4 = e3 ? "" : ".*";
        o2 = "/" === o2.charAt(o2.length - 1) ? `${o2}${t4}$` : `${o2}(/${t4})?(#.*)?$`;
      }
      r2 = !r2, n3 = i3;
    }
    __name(i2, "i");
  })(t2, e2);
  return (t3) => {
    let e3 = t3.origin;
    e3 || (e3 = `${t3.protocol}//${t3.host}`);
    const r2 = t3.href.replace(e3, "").replace(t3.search, "").split("?")[0];
    return n2.test(r2);
  };
}
__name(Dt, "Dt");
var Ut = false;
var Mt = [];
var jt = X && window.location.href;
function $t() {
  return Lt();
}
__name($t, "$t");
function Lt(t2 = [], e2, r2 = false) {
  if (Ut) return new Promise(((t3, n2) => {
    Mt.push({
      resolve: t3,
      reject: n2,
      eventArguments: e2
    });
  }));
  const { appsToUnload: o2, appsToUnmount: i2, appsToLoad: s2, appsToMount: a2 } = (function() {
    const t3 = [], e3 = [], n2 = [], r3 = [], o3 = (/* @__PURE__ */ new Date()).getTime();
    return yt.forEach(((i3) => {
      const s3 = i3.status !== "SKIP_BECAUSE_BROKEN" && O(i3);
      switch (i3.status) {
        case E:
          s3 && o3 - i3.loadErrorTime >= 200 && n2.push(i3);
          break;
        case c:
        case l:
          s3 && n2.push(i3);
          break;
        case f:
        case h:
          !s3 && gt(T(i3)) ? t3.push(i3) : s3 && r3.push(i3);
          break;
        case d:
          s3 || e3.push(i3);
      }
    })), {
      appsToUnload: t3,
      appsToUnmount: e3,
      appsToLoad: n2,
      appsToMount: r3
    };
  })();
  let p2, m2 = [], w2 = jt, g2 = jt = window.location.href;
  return Bt() ? (Ut = true, p2 = o2.concat(s2, i2, a2), Promise.resolve().then((() => (S2(0 === p2.length ? "before-no-app-change" : "before-app-change", A2(true)), S2("before-routing-event", A2(true, { cancelNavigation: y2 })), Promise.all(m2).then(((n2) => {
    if (n2.some(((t3) => t3))) return st.call(window.history, history.state, "", w2.substring(location.origin.length)), jt = location.href, Ut = false, Lt(t2, e2, true);
    const r3 = o2.map(mt), u2 = i2.map($).map(((t3) => t3.then(mt))).concat(r3), c2 = Promise.all(u2);
    c2.then((() => {
      S2("before-mount-routing-event", A2(true));
    }), ((t3) => {
      throw t3;
    }));
    const l2 = s2.map(((t3) => z(t3).then(((t4) => Rt(t4, c2))))), f2 = a2.filter(((t3) => s2.indexOf(t3) < 0)).map(((t3) => Rt(t3, c2)));
    return c2.catch(((t3) => {
      throw b2(), t3;
    })).then((() => (b2(), Promise.all(l2.concat(f2)).catch(((e3) => {
      throw t2.forEach(((t3) => t3.reject(e3))), e3;
    })).then(P2).then((() => {
    }), ((t3) => {
      throw t3;
    })))));
  })))))) : (p2 = s2, Promise.resolve().then((() => {
    const t3 = s2.map(z);
    return Promise.all(t3).then(b2).then((() => [])).catch(((t4) => {
      throw b2(), t4;
    })).finally((() => {
    }));
  })));
  function y2(t3 = true) {
    const e3 = "function" == typeof (null == t3 ? void 0 : t3.then) ? t3 : Promise.resolve(t3);
    m2.push(e3.catch(((t4) => (console.warn(Error(u(42, false))), console.warn(t4), false))));
  }
  __name(y2, "y");
  function P2() {
    const e3 = Et();
    t2.forEach(((t3) => t3.resolve(e3)));
    try {
      S2(0 === p2.length ? "no-app-change" : "app-change", A2()), S2("routing-event", A2());
    } catch (t3) {
      setTimeout((() => {
        throw t3;
      }));
    }
    if (Ut = false, Mt.length > 0) {
      const t3 = Mt;
      Mt = [], Lt(t3);
    }
    return e3;
  }
  __name(P2, "P");
  function b2() {
    r2 || (t2.forEach(((t3) => {
      et(t3.eventArguments);
    })), et(e2));
  }
  __name(b2, "b");
  function A2(t3 = false, n2) {
    const r3 = {}, u2 = {
      [d]: [],
      [h]: [],
      [c]: [],
      [v]: []
    };
    t3 ? (s2.concat(a2).forEach(((t4, e3) => {
      f2(t4, d);
    })), o2.forEach(((t4) => {
      f2(t4, c);
    })), i2.forEach(((t4) => {
      f2(t4, h);
    }))) : p2.forEach(((t4) => {
      f2(t4);
    }));
    const l2 = { detail: {
      newAppStatuses: r3,
      appsByNewStatus: u2,
      totalAppChanges: p2.length,
      originalEvent: null == e2 ? void 0 : e2[0],
      oldUrl: w2,
      newUrl: g2
    } };
    return n2 && N(l2.detail, n2), l2;
    function f2(t4, e3) {
      const n3 = T(t4);
      e3 = e3 || Pt(n3), r3[n3] = e3, (u2[e3] = u2[e3] || []).push(n3);
    }
    __name(f2, "f");
  }
  __name(A2, "A");
  function S2(t3, e3) {
    r2 || window.dispatchEvent(new n(`single-spa:${t3}`, e3));
  }
  __name(S2, "S");
}
__name(Lt, "Lt");
function Rt(t2, e2) {
  return O(t2) ? j(t2).then(((t3) => e2.then((() => O(t3) ? x(t3) : t3)))) : e2.then((() => t2));
}
__name(Rt, "Rt");
var xt = false;
function It(t2) {
  xt = true, X && (at(t2), Lt());
}
__name(It, "It");
function Bt() {
  return xt;
}
__name(Bt, "Bt");
var Gt = {
  getRawAppData: /* @__PURE__ */ __name(function() {
    return [...yt];
  }, "getRawAppData"),
  reroute: Lt,
  NOT_LOADED: c,
  toLoadPromise: z,
  toBootstrapPromise: j,
  unregisterApplication: At,
  getProfilerData: /* @__PURE__ */ __name(function() {
    return M;
  }, "getProfilerData")
};
X && window.__SINGLE_SPA_DEVTOOLS__ && (window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = Gt);
var NavItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "NavItem",
  __ssrInlineRender: true,
  props: {
    link: {},
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(_attrs)}><a${ssrRenderAttr("href", __props.link.href)}${ssrRenderAttr("target", !__props.link.isExternal && __props.link.href.startsWith("http") ? "_blank" : void 0)}${ssrRenderAttr("rel", !__props.link.isExternal && __props.link.href.startsWith("http") ? "noopener noreferrer" : void 0)} class="${ssrRenderClass([__props.isActive ? "text-casino-gold" : "text-gray-300 hover:text-casino-gold", "relative text-sm font-medium transition-colors duration-200 py-1 group"])}">${ssrInterpolate(__props.link.label)} <span class="${ssrRenderClass([__props.isActive ? "w-full" : "w-0 group-hover:w-full", "absolute bottom-0 left-0 h-px bg-casino-gold transition-all duration-300"])}"></span></a></li>`);
    };
  }
});
var _sfc_setup$13 = NavItem_vue_vue_type_script_setup_true_lang_default.setup;
NavItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/molecules/NavItem.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var NavItem_default = NavItem_vue_vue_type_script_setup_true_lang_default;
var BaseButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    disabled: {
      type: Boolean,
      default: false
    },
    type: { default: "button" },
    href: {},
    isAnchor: { type: Boolean }
  },
  setup(__props) {
    const variantClasses = {
      primary: "bg-casino-gold text-casino-dark font-bold hover:bg-yellow-400 active:bg-yellow-500 shadow-lg shadow-casino-gold/30 hover:shadow-casino-gold/50",
      secondary: "bg-transparent border-2 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-dark",
      ghost: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
      danger: "bg-casino-red text-white font-bold hover:bg-red-700 active:bg-red-800"
    };
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-5 py-2.5 text-base rounded-lg",
      lg: "px-8 py-3.5 text-lg rounded-xl"
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isAnchor && __props.href) {
        _push(`<a${ssrRenderAttrs(mergeProps({
          href: __props.href,
          class: ["inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold focus-visible:ring-offset-2 focus-visible:ring-offset-casino-dark", [
            variantClasses[__props.variant],
            sizeClasses[__props.size],
            { "opacity-50 pointer-events-none": __props.disabled }
          ]]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</a>`);
      } else {
        _push(`<button${ssrRenderAttrs(mergeProps({
          type: __props.type,
          disabled: __props.disabled,
          class: ["inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold focus-visible:ring-offset-2 focus-visible:ring-offset-casino-dark disabled:opacity-50 disabled:cursor-not-allowed", [variantClasses[__props.variant], sizeClasses[__props.size]]]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      }
    };
  }
});
var _sfc_setup$12 = BaseButton_vue_vue_type_script_setup_true_lang_default.setup;
BaseButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/atoms/BaseButton.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var BaseButton_default = BaseButton_vue_vue_type_script_setup_true_lang_default;
var MAIN_NAV_LINKS = [
  {
    id: "nav-home",
    label: "Inicio",
    href: "/landing-ssr"
  },
  {
    id: "nav-sports",
    label: "Deportes",
    href: "/deportes",
    isExternal: true
  },
  {
    id: "nav-games",
    label: "Juegos",
    href: "#games"
  },
  {
    id: "nav-live",
    label: "Casino en Vivo",
    href: "#live"
  },
  {
    id: "nav-promos",
    label: "Promociones",
    href: "#promotions"
  },
  {
    id: "nav-vip",
    label: "Club VIP",
    href: "#vip"
  }
];
var FOOTER_LINKS = [
  {
    id: "footer-terms",
    label: "T\xE9rminos y Condiciones",
    href: "#terms"
  },
  {
    id: "footer-privacy",
    label: "Privacidad",
    href: "#privacy"
  },
  {
    id: "footer-responsible",
    label: "Juego Responsable",
    href: "#responsible"
  },
  {
    id: "footer-support",
    label: "Soporte",
    href: "#support"
  },
  {
    id: "footer-faq",
    label: "FAQ",
    href: "#faq"
  }
];
var useNavigationStore = /* @__PURE__ */ defineStore("navigation", {
  state: /* @__PURE__ */ __name(() => ({
    mainLinks: MAIN_NAV_LINKS,
    footerLinks: FOOTER_LINKS,
    isMenuOpen: false
  }), "state"),
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
});
var AppHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const navStore = useNavigationStore();
    const route = useRoute();
    const isActive = computed(() => (href) => {
      if (href === "/") return route.path === "/";
      return route.path.startsWith(href);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "fixed top-0 left-0 right-0 z-50 bg-casino-dark/95 backdrop-blur-md border-b border-white/10",
        role: "banner"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><a href="/" class="flex items-center gap-2 shrink-0" aria-label="PaniPlay - Ir al inicio"><span class="text-2xl" aria-hidden="true">\u{1F3B0}</span><span class="text-casino-gold font-black text-xl tracking-tight"> Pani<span class="text-white">Play</span></span></a><nav class="hidden md:block" aria-label="Navegaci\xF3n principal"><ul class="flex items-center gap-7"><!--[-->`);
      ssrRenderList(unref2(navStore).mainLinks, (link) => {
        _push(ssrRenderComponent(NavItem_default, {
          key: link.id,
          link,
          "is-active": isActive.value(link.href)
        }, null, _parent));
      });
      _push(`<!--]--></ul></nav><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(BaseButton_default, {
        variant: "ghost",
        size: "sm",
        "is-anchor": "",
        href: "#login"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` Iniciar Sesi\xF3n `);
          else return [createTextVNode(" Iniciar Sesi\xF3n ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseButton_default, {
        variant: "primary",
        size: "sm",
        "is-anchor": "",
        href: "#register"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` Registrarse `);
          else return [createTextVNode(" Registrarse ")];
        }),
        _: 1
      }, _parent));
      _push(`<button class="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"${ssrRenderAttr("aria-expanded", unref2(navStore).isMenuOpen)} aria-controls="mobile-menu" aria-label="Abrir men\xFA">`);
      if (!unref2(navStore).isMenuOpen) _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      else _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      _push(`</button></div></div>`);
      if (unref2(navStore).isMenuOpen) {
        _push(`<div id="mobile-menu" class="md:hidden border-t border-white/10 py-4"><nav aria-label="Men\xFA m\xF3vil"><ul class="flex flex-col gap-1"><!--[-->`);
        ssrRenderList(unref2(navStore).mainLinks, (link) => {
          _push(ssrRenderComponent(NavItem_default, {
            key: link.id,
            link,
            "is-active": isActive.value(link.href)
          }, null, _parent));
        });
        _push(`<!--]--></ul></nav></div>`);
      } else _push(`<!---->`);
      _push(`</div></header>`);
    };
  }
});
var _sfc_setup$11 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/organisms/AppHeader.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var AppHeader_default = AppHeader_vue_vue_type_script_setup_true_lang_default;
var AppFooter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const navStore = useNavigationStore();
    const socialLinks = [
      {
        id: "tw",
        label: "Twitter / X",
        href: "#",
        icon: "\u{1D54F}"
      },
      {
        id: "tg",
        label: "Telegram",
        href: "#",
        icon: "\u2708\uFE0F"
      },
      {
        id: "dc",
        label: "Discord",
        href: "#",
        icon: "\u{1F4AC}"
      },
      {
        id: "ig",
        label: "Instagram",
        href: "#",
        icon: "\u{1F4F7}"
      }
    ];
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "bg-casino-dark border-t border-white/10 mt-auto",
        role: "contentinfo"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="space-y-4"><div class="flex items-center gap-2"><span class="text-2xl" aria-hidden="true">\u{1F3B0}</span><span class="text-casino-gold font-black text-xl tracking-tight"> Pani<span class="text-white">Play</span></span></div><p class="text-gray-400 text-sm leading-relaxed max-w-xs"> El entretenimiento de casino m\xE1s emocionante, con los mejores juegos y bonos exclusivos. </p><div class="flex gap-3"><!--[-->`);
      ssrRenderList(socialLinks, (s2) => {
        _push(`<a${ssrRenderAttr("href", s2.href)}${ssrRenderAttr("aria-label", s2.label)} class="w-9 h-9 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold flex items-center justify-center text-sm transition-colors duration-200">${ssrInterpolate(s2.icon)}</a>`);
      });
      _push(`<!--]--></div></div><nav aria-label="Links legales" class="space-y-3"><h3 class="text-white font-semibold text-sm uppercase tracking-widest">Legal &amp; Soporte</h3><ul class="space-y-2"><!--[-->`);
      ssrRenderList(unref2(navStore).footerLinks, (link) => {
        _push(`<li><a${ssrRenderAttr("href", link.href)} class="text-gray-400 text-sm hover:text-casino-gold transition-colors duration-200">${ssrInterpolate(link.label)}</a></li>`);
      });
      _push(`<!--]--></ul></nav><div class="space-y-4"><h3 class="text-white font-semibold text-sm uppercase tracking-widest">Juego Responsable</h3><p class="text-gray-400 text-xs leading-relaxed"> PaniPlay es solo para mayores de 18 a\xF1os. El juego debe ser entretenimiento. Si sientes que tienes un problema, busca ayuda. </p><div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">+18</span><span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">\u{1F512} SSL</span><span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">\u{1F6E1}\uFE0F Licenciado</span></div></div></div><div class="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"><p class="text-gray-500 text-xs text-center sm:text-left"> \xA9 ${ssrInterpolate(unref2(year))} PaniPlay. Todos los derechos reservados. </p><p class="text-gray-600 text-xs"> Juego responsable \xB7 Solo mayores de 18 a\xF1os </p></div></div></footer>`);
    };
  }
});
var _sfc_setup$10 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/organisms/AppFooter.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var AppFooter_default = AppFooter_vue_vue_type_script_setup_true_lang_default;
var DefaultLayout_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen bg-casino-dark" }, _attrs))}>`);
      _push(ssrRenderComponent(AppHeader_default, null, null, _parent));
      _push(`<main class="flex-1 pt-16" id="main-content" tabindex="-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(AppFooter_default, null, null, _parent));
      _push(`</div>`);
    };
  }
});
var _sfc_setup$9 = DefaultLayout_vue_vue_type_script_setup_true_lang_default.setup;
DefaultLayout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/templates/DefaultLayout.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var DefaultLayout_default = DefaultLayout_vue_vue_type_script_setup_true_lang_default;
var BaseBadge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "BaseBadge",
  __ssrInlineRender: true,
  props: {
    label: {},
    color: { default: "gold" }
  },
  setup(__props) {
    const colorClasses = {
      gold: "bg-casino-gold/20 text-casino-gold border border-casino-gold/40",
      red: "bg-casino-red/20 text-red-400 border border-casino-red/40",
      purple: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
      green: "bg-green-500/20 text-green-400 border border-green-500/40",
      gray: "bg-white/10 text-gray-400 border border-white/20"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: ["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase", colorClasses[__props.color]] }, _attrs))}>${ssrInterpolate(__props.label)}</span>`);
    };
  }
});
var _sfc_setup$8 = BaseBadge_vue_vue_type_script_setup_true_lang_default.setup;
BaseBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/atoms/BaseBadge.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var BaseBadge_default = BaseBadge_vue_vue_type_script_setup_true_lang_default;
var HeroBanner_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "HeroBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = [
      {
        value: "500+",
        label: "Juegos"
      },
      {
        value: "24/7",
        label: "Soporte"
      },
      {
        value: "$50K",
        label: "Jackpot"
      },
      {
        value: "1M+",
        label: "Jugadores"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "hero",
        class: "relative min-h-[90svh] flex items-center overflow-hidden",
        "aria-labelledby": "hero-heading"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-casino-dark via-[#0d0d2e] to-casino-dark" aria-hidden="true"></div><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-casino-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div><div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-casino-red/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"><div class="max-w-3xl mx-auto text-center space-y-8"><div class="flex justify-center">`);
      _push(ssrRenderComponent(BaseBadge_default, {
        label: "\u{1F3B0} Casino Online #1 en Entretenimiento",
        color: "gold"
      }, null, _parent));
      _push(`</div><h1 id="hero-heading" class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight"> Juega. <span class="text-casino-gold">Gana.</span><br><span class="text-transparent bg-clip-text bg-gradient-to-r from-casino-gold via-yellow-300 to-casino-gold"> Celebra. </span></h1><p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"> Descubre m\xE1s de <strong class="text-white">500 juegos</strong> de casino, slots premium, ruleta en vivo y los mejores bonos del mercado. Tu suerte comienza aqu\xED. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4">`);
      _push(ssrRenderComponent(BaseButton_default, {
        variant: "primary",
        size: "lg",
        "is-anchor": "",
        href: "#register"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` \u{1F381} Reclamar Bono de Bienvenida `);
          else return [createTextVNode(" \u{1F381} Reclamar Bono de Bienvenida ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseButton_default, {
        variant: "secondary",
        size: "lg",
        "is-anchor": "",
        href: "#games"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` Ver Juegos `);
          else return [createTextVNode(" Ver Juegos ")];
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-sm text-gray-400"> \u2705 Sin dep\xF3sito requerido \xB7 \u{1F512} 100% seguro \xB7 \u26A1 Retiros en 24h </p><div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10"><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="text-center space-y-1"><div class="text-3xl font-black text-casino-gold">${ssrInterpolate(stat.value)}</div><div class="text-xs text-gray-400 uppercase tracking-widest">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true"><svg class="w-6 h-6 text-casino-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></section>`);
    };
  }
});
var _sfc_setup$7 = HeroBanner_vue_vue_type_script_setup_true_lang_default.setup;
HeroBanner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/organisms/HeroBanner.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var HeroBanner_default = HeroBanner_vue_vue_type_script_setup_true_lang_default;
var BaseImage_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "BaseImage",
  __ssrInlineRender: true,
  props: {
    src: {},
    alt: {},
    width: {},
    height: {},
    loading: { default: "lazy" },
    objectFit: { default: "cover" },
    aspectRatio: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "overflow-hidden",
        style: __props.aspectRatio ? { aspectRatio: __props.aspectRatio } : {}
      }, _attrs))}><img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("alt", __props.alt)}${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)}${ssrRenderAttr("loading", __props.loading)} class="${ssrRenderClass([{
        "object-cover": __props.objectFit === "cover",
        "object-contain": __props.objectFit === "contain",
        "object-fill": __props.objectFit === "fill"
      }, "w-full h-full transition-transform duration-300"])}" decoding="async"></div>`);
    };
  }
});
var _sfc_setup$6 = BaseImage_vue_vue_type_script_setup_true_lang_default.setup;
BaseImage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/atoms/BaseImage.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var BaseImage_default = BaseImage_vue_vue_type_script_setup_true_lang_default;
var GameCard_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "GameCard",
  __ssrInlineRender: true,
  props: { game: {} },
  setup(__props) {
    const badgeColorMap = {
      hot: "red",
      new: "green",
      exclusive: "purple"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "group relative bg-casino-surface rounded-xl overflow-hidden border border-white/10 hover:border-casino-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-casino-gold/10" }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(BaseImage_default, {
        src: __props.game.thumbnail,
        alt: __props.game.name,
        "aspect-ratio": "3/2",
        loading: "lazy"
      }, null, _parent));
      if (__props.game.badge) {
        _push(`<div class="absolute top-2 left-2">`);
        _push(ssrRenderComponent(BaseBadge_default, {
          label: __props.game.badge === "hot" ? "\u{1F525} HOT" : __props.game.badge === "new" ? "\u2728 NEW" : "\u{1F48E} EXCLUSIVO",
          color: badgeColorMap[__props.game.badge]
        }, null, _parent));
        _push(`</div>`);
      } else _push(`<!---->`);
      if (__props.game.isLive) _push(`<div class="absolute top-2 right-2 flex items-center gap-1 bg-casino-red/90 text-white text-xs font-bold px-2 py-0.5 rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE </div>`);
      else _push(`<!---->`);
      _push(`<div class="absolute inset-0 bg-casino-dark/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">`);
      _push(ssrRenderComponent(BaseButton_default, {
        href: __props.game.playUrl,
        "is-anchor": "",
        size: "md",
        variant: "primary"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` Jugar Ahora `);
          else return [createTextVNode(" Jugar Ahora ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="p-3"><h3 class="text-white font-semibold text-sm truncate">${ssrInterpolate(__props.game.name)}</h3><div class="flex items-center justify-between mt-1"><span class="text-gray-400 text-xs">${ssrInterpolate(__props.game.provider)}</span><span class="text-casino-gold text-xs font-mono">RTP ${ssrInterpolate(__props.game.rtp)}%</span></div></div></article>`);
    };
  }
});
var _sfc_setup$5 = GameCard_vue_vue_type_script_setup_true_lang_default.setup;
GameCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/molecules/GameCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var GameCard_default = GameCard_vue_vue_type_script_setup_true_lang_default;
var MOCK_GAMES = [
  {
    id: "game-001",
    name: "Golden Sphinx",
    category: "slots",
    provider: "PaniPlay Studios",
    thumbnail: "https://placehold.co/300x200/1a1a2e/ffd700?text=Golden+Sphinx",
    badge: "hot",
    rtp: 96.5,
    isLive: false,
    playUrl: "#play"
  },
  {
    id: "game-002",
    name: "Dragon Fortune",
    category: "slots",
    provider: "PaniPlay Studios",
    thumbnail: "https://placehold.co/300x200/1a1a2e/dc143c?text=Dragon+Fortune",
    badge: "new",
    rtp: 97.1,
    isLive: false,
    playUrl: "#play"
  },
  {
    id: "game-003",
    name: "Royal Roulette",
    category: "roulette",
    provider: "Live Masters",
    thumbnail: "https://placehold.co/300x200/0d0d1a/ffd700?text=Royal+Roulette",
    badge: "exclusive",
    rtp: 97.3,
    isLive: true,
    playUrl: "#play"
  },
  {
    id: "game-004",
    name: "Texas Hold'em Pro",
    category: "poker",
    provider: "Card Masters",
    thumbnail: "https://placehold.co/300x200/1a1a2e/22c55e?text=Texas+HoldEm",
    badge: null,
    rtp: 99,
    isLive: false,
    playUrl: "#play"
  },
  {
    id: "game-005",
    name: "Blackjack Elite",
    category: "blackjack",
    provider: "Card Masters",
    thumbnail: "https://placehold.co/300x200/0d0d1a/f3f4f6?text=Blackjack+Elite",
    badge: "hot",
    rtp: 99.5,
    isLive: false,
    playUrl: "#play"
  },
  {
    id: "game-006",
    name: "Mega Jackpot Wheel",
    category: "slots",
    provider: "PaniPlay Studios",
    thumbnail: "https://placehold.co/300x200/1a1a2e/a855f7?text=Mega+Jackpot",
    badge: "exclusive",
    rtp: 95.8,
    isLive: false,
    playUrl: "#play"
  },
  {
    id: "game-007",
    name: "Live Baccarat VIP",
    category: "baccarat",
    provider: "Live Masters",
    thumbnail: "https://placehold.co/300x200/0d0d1a/ffd700?text=Live+Baccarat",
    badge: "new",
    rtp: 98.9,
    isLive: true,
    playUrl: "#play"
  },
  {
    id: "game-008",
    name: "Cleopatra Riches",
    category: "slots",
    provider: "PaniPlay Studios",
    thumbnail: "https://placehold.co/300x200/1a1a2e/fbbf24?text=Cleopatra",
    badge: null,
    rtp: 96.2,
    isLive: false,
    playUrl: "#play"
  }
];
var useGamesStore = /* @__PURE__ */ defineStore("games", {
  state: /* @__PURE__ */ __name(() => ({
    games: MOCK_GAMES,
    activeCategory: null,
    isLoading: false
  }), "state"),
  getters: {
    filteredGames: /* @__PURE__ */ __name((state) => {
      if (!state.activeCategory) return state.games;
      return state.games.filter((g2) => g2.category === state.activeCategory);
    }, "filteredGames"),
    featuredGames: /* @__PURE__ */ __name((state) => state.games.filter((g2) => g2.badge === "hot" || g2.badge === "exclusive"), "featuredGames"),
    liveGames: /* @__PURE__ */ __name((state) => state.games.filter((g2) => g2.isLive), "liveGames")
  },
  actions: { setCategory(category) {
    this.activeCategory = category;
  } }
});
function useCarousel(itemCount, options = {}) {
  const opts = {
    visibleItems: options.visibleItems ?? 4,
    visibleItemsMd: options.visibleItemsMd ?? 2,
    visibleItemsSm: options.visibleItemsSm ?? 1,
    autoPlayInterval: options.autoPlayInterval ?? 4e3,
    loop: options.loop ?? true
  };
  const currentIndex = /* @__PURE__ */ ref2(0);
  const isAnimating = /* @__PURE__ */ ref2(false);
  const isPaused = /* @__PURE__ */ ref2(false);
  let autoPlayTimer = null;
  function next() {
    if (isAnimating.value) return;
    isAnimating.value = true;
    if (opts.loop) currentIndex.value = (currentIndex.value + 1) % itemCount;
    else currentIndex.value = Math.min(currentIndex.value + 1, itemCount - opts.visibleItems);
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  }
  __name(next, "next");
  function prev() {
    if (isAnimating.value) return;
    isAnimating.value = true;
    if (opts.loop) currentIndex.value = (currentIndex.value - 1 + itemCount) % itemCount;
    else currentIndex.value = Math.max(currentIndex.value - 1, 0);
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  }
  __name(prev, "prev");
  function goTo(index) {
    if (index >= 0 && index < itemCount) currentIndex.value = index;
  }
  __name(goTo, "goTo");
  function pause() {
    isPaused.value = true;
  }
  __name(pause, "pause");
  function resume() {
    isPaused.value = false;
  }
  __name(resume, "resume");
  function startAutoPlay() {
    if (opts.autoPlayInterval <= 0) return;
    autoPlayTimer = setInterval(() => {
      if (!isPaused.value) next();
    }, opts.autoPlayInterval);
  }
  __name(startAutoPlay, "startAutoPlay");
  function stopAutoPlay() {
    if (autoPlayTimer !== null) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }
  __name(stopAutoPlay, "stopAutoPlay");
  onMounted(() => {
    startAutoPlay();
  });
  onBeforeUnmount(() => {
    stopAutoPlay();
  });
  return {
    currentIndex,
    isAnimating,
    isPaused,
    next,
    prev,
    goTo,
    pause,
    resume,
    opts
  };
}
__name(useCarousel, "useCarousel");
var VISIBLE$1 = 4;
var GameCarousel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "GameCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const gamesStore = useGamesStore();
    const categories = [
      {
        value: null,
        label: "Todos"
      },
      {
        value: "slots",
        label: "\u{1F3B0} Slots"
      },
      {
        value: "roulette",
        label: "\u{1F3A1} Ruleta"
      },
      {
        value: "poker",
        label: "\u{1F0CF} P\xF3ker"
      },
      {
        value: "blackjack",
        label: "\u{1F0A1} Blackjack"
      },
      {
        value: "live",
        label: "\u{1F4FA} En Vivo"
      }
    ];
    const filteredGames = computed(() => gamesStore.filteredGames);
    const { currentIndex, next, prev, pause, resume } = useCarousel(computed(() => filteredGames.value.length).value, {
      visibleItems: 4,
      visibleItemsMd: 2,
      visibleItemsSm: 1,
      autoPlayInterval: 0
    });
    const visibleGames = computed(() => {
      const all = filteredGames.value;
      const start = currentIndex.value % all.length;
      const result = [];
      for (let i2 = 0; i2 < Math.min(VISIBLE$1, all.length); i2++) result.push(all[(start + i2) % all.length]);
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "games",
        class: "py-16 px-4 sm:px-6 lg:px-8",
        "aria-labelledby": "games-heading"
      }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"><div><p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2"> Cat\xE1logo </p><h2 id="games-heading" class="text-white text-3xl sm:text-4xl font-black"> Juegos Destacados </h2></div><div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categor\xEDa"><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass([unref2(gamesStore).activeCategory === cat.value ? "bg-casino-gold text-casino-dark border-casino-gold" : "bg-white/5 text-gray-400 border-white/10 hover:border-casino-gold/40 hover:text-white", "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"])}">${ssrInterpolate(cat.label)}</button>`);
      });
      _push(`<!--]--></div></div><div class="relative"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(visibleGames.value, (game) => {
        _push(ssrRenderComponent(GameCard_default, {
          key: game.id,
          game
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (filteredGames.value.length > VISIBLE$1) _push(`<div class="flex justify-center mt-8 gap-3"><button class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200" aria-label="Juegos anteriores"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200" aria-label="Siguientes juegos"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
      else _push(`<!---->`);
      _push(`</div><div class="text-center mt-10">`);
      _push(ssrRenderComponent(BaseButton_default, {
        variant: "secondary",
        size: "lg",
        "is-anchor": "",
        href: "#all-games"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(` Ver todos los juegos \u2192 `);
          else return [createTextVNode(" Ver todos los juegos \u2192 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
var _sfc_setup$4 = GameCarousel_vue_vue_type_script_setup_true_lang_default.setup;
GameCarousel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/organisms/GameCarousel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var GameCarousel_default = GameCarousel_vue_vue_type_script_setup_true_lang_default;
var PromoCard_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PromoCard",
  __ssrInlineRender: true,
  props: { promo: {} },
  setup(__props) {
    const typeColorMap = {
      welcome: "gold",
      deposit: "green",
      "free-spins": "purple",
      cashback: "red",
      vip: "purple"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "relative bg-casino-surface rounded-2xl overflow-hidden border border-white/10 hover:border-casino-gold/40 transition-all duration-300 hover:shadow-xl hover:shadow-casino-gold/10 flex flex-col" }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(BaseImage_default, {
        src: __props.promo.imageUrl,
        alt: __props.promo.title,
        "aspect-ratio": "2/1",
        loading: "lazy"
      }, null, _parent));
      _push(`<div class="absolute top-3 left-3">`);
      _push(ssrRenderComponent(BaseBadge_default, {
        label: __props.promo.badgeLabel,
        color: typeColorMap[__props.promo.type]
      }, null, _parent));
      _push(`</div><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-casino-dark to-transparent p-4"><p class="text-casino-gold font-black text-2xl leading-none drop-shadow">${ssrInterpolate(__props.promo.value)}</p></div></div><div class="p-5 flex flex-col flex-1 gap-3"><div><h3 class="text-white font-bold text-lg leading-tight">${ssrInterpolate(__props.promo.title)}</h3><p class="text-casino-gold text-sm font-medium">${ssrInterpolate(__props.promo.subtitle)}</p></div><p class="text-gray-400 text-sm leading-relaxed flex-1">${ssrInterpolate(__props.promo.description)}</p>`);
      _push(ssrRenderComponent(BaseButton_default, {
        href: __props.promo.ctaUrl,
        "is-anchor": "",
        variant: "primary",
        size: "md",
        class: "w-full"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) _push2(`${ssrInterpolate(__props.promo.ctaLabel)}`);
          else return [createTextVNode(toDisplayString(__props.promo.ctaLabel), 1)];
        }),
        _: 1
      }, _parent));
      _push(`</div></article>`);
    };
  }
});
var _sfc_setup$3 = PromoCard_vue_vue_type_script_setup_true_lang_default.setup;
PromoCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/molecules/PromoCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var PromoCard_default = PromoCard_vue_vue_type_script_setup_true_lang_default;
var MOCK_PROMOTIONS = [
  {
    id: "promo-001",
    title: "Bono de Bienvenida",
    subtitle: "Para nuevos jugadores",
    description: "Duplica tu primer dep\xF3sito hasta $500 y recibe 100 giros gratis.",
    type: "welcome",
    badgeLabel: "\xA1NUEVO!",
    value: "200% + 100 FS",
    imageUrl: "https://placehold.co/600x300/1a1a2e/ffd700?text=Bono+Bienvenida",
    ctaLabel: "Reclamar Bono",
    ctaUrl: "#register",
    expiresAt: null
  },
  {
    id: "promo-002",
    title: "Recarga Semanal",
    subtitle: "Cada lunes",
    description: "Recarga los lunes y obt\xE9n un 50% extra hasta $200.",
    type: "deposit",
    badgeLabel: "SEMANAL",
    value: "50% hasta $200",
    imageUrl: "https://placehold.co/600x300/0d0d1a/dc143c?text=Recarga+Semanal",
    ctaLabel: "Depositar Ahora",
    ctaUrl: "#deposit",
    expiresAt: null
  },
  {
    id: "promo-003",
    title: "50 Free Spins",
    subtitle: "Sin dep\xF3sito requerido",
    description: "Solo por registrarte, recibe 50 giros gratis en Golden Sphinx.",
    type: "free-spins",
    badgeLabel: "SIN DEP\xD3SITO",
    value: "50 Free Spins",
    imageUrl: "https://placehold.co/600x300/1a1a2e/a855f7?text=Free+Spins",
    ctaLabel: "Obtener Spins",
    ctaUrl: "#register",
    expiresAt: "2026-04-30T23:59:00Z"
  },
  {
    id: "promo-004",
    title: "Cashback VIP",
    subtitle: "Para jugadores frecuentes",
    description: "Recupera el 15% de tus p\xE9rdidas cada semana. Sin l\xEDmite.",
    type: "cashback",
    badgeLabel: "VIP",
    value: "15% Cashback",
    imageUrl: "https://placehold.co/600x300/0d0d1a/ffd700?text=Cashback+VIP",
    ctaLabel: "Unirme al VIP",
    ctaUrl: "#vip",
    expiresAt: null
  }
];
var usePromotionsStore = /* @__PURE__ */ defineStore("promotions", {
  state: /* @__PURE__ */ __name(() => ({
    promotions: MOCK_PROMOTIONS,
    isLoading: false
  }), "state"),
  getters: {
    activePromotions: /* @__PURE__ */ __name((state) => state.promotions.filter((p2) => {
      if (!p2.expiresAt) return true;
      return new Date(p2.expiresAt) > /* @__PURE__ */ new Date();
    }), "activePromotions"),
    featuredPromotion: /* @__PURE__ */ __name((state) => state.promotions.find((p2) => p2.type === "welcome"), "featuredPromotion")
  }
});
var VISIBLE = 3;
var PromoCarousel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PromoCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const promosStore = usePromotionsStore();
    const promos = computed(() => promosStore.activePromotions);
    const { currentIndex, next, prev, goTo, pause, resume } = useCarousel(computed(() => promos.value.length).value, {
      visibleItems: 3,
      visibleItemsMd: 2,
      visibleItemsSm: 1,
      autoPlayInterval: 5e3
    });
    const visiblePromos = computed(() => {
      const all = promos.value;
      if (all.length === 0) return [];
      const start = currentIndex.value % all.length;
      const result = [];
      for (let i2 = 0; i2 < Math.min(VISIBLE, all.length); i2++) result.push(all[(start + i2) % all.length]);
      return result;
    });
    const totalDots = computed(() => Math.max(1, promos.value.length - VISIBLE + 1));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "promotions",
        class: "py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-casino-surface/30",
        "aria-labelledby": "promos-heading"
      }, _attrs))}><div class="max-w-7xl mx-auto"><div class="text-center mb-10"><p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2"> Ofertas Exclusivas </p><h2 id="promos-heading" class="text-white text-3xl sm:text-4xl font-black"> Nuestras Mejores Promociones </h2><p class="text-gray-400 mt-3 max-w-xl mx-auto"> Bonos dise\xF1ados para que siempre tengas m\xE1s oportunidades de ganar. </p></div><div class="relative"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(visiblePromos.value, (promo) => {
        _push(ssrRenderComponent(PromoCard_default, {
          key: promo.id,
          promo
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center justify-center mt-8 gap-4"><button class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200" aria-label="Promoci\xF3n anterior"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex gap-2" role="tablist" aria-label="Indicador de promociones"><!--[-->`);
      ssrRenderList(totalDots.value, (i2) => {
        _push(`<button class="${ssrRenderClass([unref2(currentIndex) === i2 - 1 ? "w-6 bg-casino-gold" : "w-2 bg-white/20 hover:bg-white/40", "h-2 rounded-full transition-all duration-300"])}"${ssrRenderAttr("aria-label", `Ir a la promoci\xF3n ${i2}`)}${ssrRenderAttr("aria-selected", unref2(currentIndex) === i2 - 1)} role="tab"></button>`);
      });
      _push(`<!--]--></div><button class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200" aria-label="Siguiente promoci\xF3n"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div></div></section>`);
    };
  }
});
var _sfc_setup$2 = PromoCarousel_vue_vue_type_script_setup_true_lang_default.setup;
PromoCarousel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/organisms/PromoCarousel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var PromoCarousel_default = PromoCarousel_vue_vue_type_script_setup_true_lang_default;
var features2 = [
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Seguro y Confiable",
    description: "Plataforma con cifrado SSL y licencia de operaci\xF3n internacional."
  },
  {
    icon: "\u26A1",
    title: "Pagos R\xE1pidos",
    description: "Dep\xF3sitos instant\xE1neos y retiros procesados en menos de 24 horas."
  },
  {
    icon: "\u{1F381}",
    title: "Bonos Exclusivos",
    description: "Promociones semanales, torneos y programa VIP con privilegios \xFAnicos."
  },
  {
    icon: "\u{1F4F1}",
    title: "Mobile First",
    description: "Experiencia optimizada para m\xF3vil. Juega donde quieras, cuando quieras."
  }
];
var HomeView_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "HomeView",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(DefaultLayout_default, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(HeroBanner_default, null, null, _parent2, _scopeId));
            _push2(`<div class="h-px bg-gradient-to-r from-transparent via-casino-gold/30 to-transparent mx-8" aria-hidden="true"${_scopeId}></div>`);
            _push2(ssrRenderComponent(GameCarousel_default, null, null, _parent2, _scopeId));
            _push2(`<div class="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-8" aria-hidden="true"${_scopeId}></div>`);
            _push2(ssrRenderComponent(PromoCarousel_default, null, null, _parent2, _scopeId));
            _push2(`<section class="py-16 px-4 sm:px-6 lg:px-8" id="features" aria-labelledby="features-heading"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="text-center mb-12"${_scopeId}><p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2"${_scopeId}>Ventajas</p><h2 id="features-heading" class="text-white text-3xl sm:text-4xl font-black"${_scopeId}> \xBFPor qu\xE9 elegir PaniPlay? </h2></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(features2, (feature) => {
              _push2(`<div class="bg-casino-surface rounded-xl p-6 border border-white/10 hover:border-casino-gold/30 transition-colors duration-300 text-center space-y-3"${_scopeId}><div class="text-4xl" aria-hidden="true"${_scopeId}>${ssrInterpolate(feature.icon)}</div><h3 class="text-white font-bold"${_scopeId}>${ssrInterpolate(feature.title)}</h3><p class="text-gray-400 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(feature.description)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-casino-dark via-[#0d0d2e] to-casino-dark" aria-labelledby="cta-heading"${_scopeId}><div class="max-w-2xl mx-auto text-center space-y-6"${_scopeId}><h2 id="cta-heading" class="text-white text-4xl sm:text-5xl font-black leading-tight"${_scopeId}> \xBFListo para la <span class="text-casino-gold"${_scopeId}>aventura</span>? </h2><p class="text-gray-300 text-lg"${_scopeId}> \xDAnete a m\xE1s de 1 mill\xF3n de jugadores y reclama tu bono de bienvenida hoy. </p><a href="#register" class="inline-flex items-center justify-center gap-2 px-10 py-4 bg-casino-gold text-casino-dark font-black text-lg rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-2xl shadow-casino-gold/40 hover:shadow-casino-gold/60 hover:-translate-y-0.5"${_scopeId}> \u{1F381} Crear Cuenta Gratis </a><p class="text-gray-500 text-sm"${_scopeId}>Sin tarjeta de cr\xE9dito \xB7 Retiro inmediato</p></div></section>`);
          } else return [
            createVNode(HeroBanner_default),
            createVNode("div", {
              class: "h-px bg-gradient-to-r from-transparent via-casino-gold/30 to-transparent mx-8",
              "aria-hidden": "true"
            }),
            createVNode(GameCarousel_default),
            createVNode("div", {
              class: "h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-8",
              "aria-hidden": "true"
            }),
            createVNode(PromoCarousel_default),
            createVNode("section", {
              class: "py-16 px-4 sm:px-6 lg:px-8",
              id: "features",
              "aria-labelledby": "features-heading"
            }, [createVNode("div", { class: "max-w-7xl mx-auto" }, [createVNode("div", { class: "text-center mb-12" }, [createVNode("p", { class: "text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2" }, "Ventajas"), createVNode("h2", {
              id: "features-heading",
              class: "text-white text-3xl sm:text-4xl font-black"
            }, " \xBFPor qu\xE9 elegir PaniPlay? ")]), createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [(openBlock(), createBlock(Fragment, null, renderList(features2, (feature) => {
              return createVNode("div", {
                key: feature.title,
                class: "bg-casino-surface rounded-xl p-6 border border-white/10 hover:border-casino-gold/30 transition-colors duration-300 text-center space-y-3"
              }, [
                createVNode("div", {
                  class: "text-4xl",
                  "aria-hidden": "true"
                }, toDisplayString(feature.icon), 1),
                createVNode("h3", { class: "text-white font-bold" }, toDisplayString(feature.title), 1),
                createVNode("p", { class: "text-gray-400 text-sm leading-relaxed" }, toDisplayString(feature.description), 1)
              ]);
            }), 64))])])]),
            createVNode("section", {
              class: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-casino-dark via-[#0d0d2e] to-casino-dark",
              "aria-labelledby": "cta-heading"
            }, [createVNode("div", { class: "max-w-2xl mx-auto text-center space-y-6" }, [
              createVNode("h2", {
                id: "cta-heading",
                class: "text-white text-4xl sm:text-5xl font-black leading-tight"
              }, [
                createTextVNode(" \xBFListo para la "),
                createVNode("span", { class: "text-casino-gold" }, "aventura"),
                createTextVNode("? ")
              ]),
              createVNode("p", { class: "text-gray-300 text-lg" }, " \xDAnete a m\xE1s de 1 mill\xF3n de jugadores y reclama tu bono de bienvenida hoy. "),
              createVNode("a", {
                href: "#register",
                class: "inline-flex items-center justify-center gap-2 px-10 py-4 bg-casino-gold text-casino-dark font-black text-lg rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-2xl shadow-casino-gold/40 hover:shadow-casino-gold/60 hover:-translate-y-0.5"
              }, " \u{1F381} Crear Cuenta Gratis "),
              createVNode("p", { class: "text-gray-500 text-sm" }, "Sin tarjeta de cr\xE9dito \xB7 Retiro inmediato")
            ])])
          ];
        }),
        _: 1
      }, _parent));
    };
  }
});
var _sfc_setup$1 = HomeView_vue_vue_type_script_setup_true_lang_default.setup;
HomeView_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HomeView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var HomeView_default = HomeView_vue_vue_type_script_setup_true_lang_default;
function createRouter(options = {}) {
  const { base = "/", useMemoryHistory = true, includeFallbackRoute = true } = options;
  return createRouter$1({
    history: useMemoryHistory ? createMemoryHistory() : createWebHistory(base),
    routes: [
      {
        path: "/",
        name: "home",
        component: HomeView_default,
        meta: {
          title: "PaniPlay \u2014 Casino Online | Slots, Ruleta y m\xE1s",
          description: "Juega en PaniPlay, el mejor casino online con slots, ruleta y las mejores promociones."
        }
      },
      {
        path: "/home",
        name: "home-alias",
        component: HomeView_default,
        meta: {
          title: "PaniPlay \u2014 Casino Online | Slots, Ruleta y m\xE1s",
          description: "Juega en PaniPlay, el mejor casino online con slots, ruleta y las mejores promociones."
        }
      },
      ...includeFallbackRoute ? [{
        path: "/:pathMatch(.*)*",
        name: "shell-fallback",
        component: HomeView_default
      }] : []
    ],
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) return savedPosition;
      return { top: 0 };
    }
  });
}
__name(createRouter, "createRouter");
var App_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref2(RouterView), _attrs, null, _parent));
    };
  }
});
var _sfc_setup = App_vue_vue_type_script_setup_true_lang_default.setup;
App_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var App_default = App_vue_vue_type_script_setup_true_lang_default;
function createApp() {
  const app = createSSRApp(App_default);
  const pinia = createPinia();
  const router = createRouter();
  app.use(pinia);
  app.use(router);
  return {
    app,
    router,
    pinia
  };
}
__name(createApp, "createApp");
async function render(url) {
  const { app, router, pinia } = createApp();
  await router.push(url);
  await router.isReady();
  return {
    html: await renderToString(app),
    state: JSON.stringify(pinia.state.value)
  };
}
__name(render, "render");

// worker.ts
import HTML_TEMPLATE from "./994935eead022c05223946fb60f1a88539eb9e77-index.html";
var cachedPagesAssets = null;
var cachedPagesAssetsExpiresAt = 0;
var CACHE_VERSION = "v6";
var STATIC_EXTENSIONS = /* @__PURE__ */ new Set([
  ".js",
  ".mjs",
  ".css",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".json",
  ".xml",
  ".txt",
  ".map",
  ".mp4",
  ".webm",
  ".ogg",
  ".mp3",
  ".pdf"
]);
function isStaticAsset(pathname) {
  const lastDot = pathname.lastIndexOf(".");
  if (lastDot === -1) return false;
  const ext = pathname.slice(lastDot).toLowerCase();
  return STATIC_EXTENSIONS.has(ext);
}
__name(isStaticAsset, "isStaticAsset");
function shouldSSR(request, pathname) {
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return false;
  if (isStaticAsset(pathname)) return false;
  const accept = request.headers.get("Accept") ?? "";
  return accept.includes("text/html");
}
__name(shouldSSR, "shouldSSR");
function isLandingPath(pathname) {
  return pathname === "/" || pathname === "/home" || pathname === "/home/" || pathname === "/landing-ssr" || pathname === "/landing-ssr/";
}
__name(isLandingPath, "isLandingPath");
function resolveSpaRedirectTarget(spaRootUrl, requestUrl) {
  const { pathname, search } = requestUrl;
  if (!spaRootUrl || isLandingPath(pathname) || isStaticAsset(pathname)) {
    return null;
  }
  try {
    const target = new URL(`${pathname}${search}`, spaRootUrl);
    if (target.origin === requestUrl.origin && target.pathname === pathname && target.search === search) {
      return null;
    }
    return target.toString();
  } catch {
    return null;
  }
}
__name(resolveSpaRedirectTarget, "resolveSpaRedirectTarget");
function buildSecurityHeaders(spaRootUrl) {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": [
      "default-src 'self' https:",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https:`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https:",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https:",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com https:",
      `connect-src 'self' https:`,
      "media-src 'self' https:",
      "frame-ancestors 'none'"
    ].join("; ")
  };
}
__name(buildSecurityHeaders, "buildSecurityHeaders");
async function discoverPagesAssets(env2) {
  const now = Date.now();
  if (cachedPagesAssets && cachedPagesAssetsExpiresAt > now) {
    return cachedPagesAssets;
  }
  const result = { rootShellEntry: "", sitioVersion5Bundle: "" };
  const pagesOrigin = env2.PAGES_ORIGIN;
  if (!pagesOrigin) return result;
  try {
    const manifestCandidates = [
      `${pagesOrigin}/.vite/manifest.json`,
      `${pagesOrigin}/manifest.json`
    ];
    for (const manifestUrl of manifestCandidates) {
      let response;
      try {
        response = await fetch(manifestUrl);
      } catch {
        continue;
      }
      if (!response.ok) continue;
      let manifest;
      try {
        manifest = await response.json();
      } catch {
        continue;
      }
      const indexEntry = manifest["index.html"];
      if (indexEntry?.file) {
        result.rootShellEntry = indexEntry.file.startsWith("/") ? indexEntry.file : `/${indexEntry.file}`;
      }
      if (indexEntry?.dynamicImports) {
        for (const dynKey of indexEntry.dynamicImports) {
          if (dynKey.includes("landing")) continue;
          const dynEntry = manifest[dynKey];
          if (dynEntry?.isDynamicEntry && dynEntry?.file) {
            result.sitioVersion5Bundle = dynEntry.file.startsWith("/") ? dynEntry.file : `/${dynEntry.file}`;
            break;
          }
        }
      }
      if (result.rootShellEntry) break;
    }
    cachedPagesAssets = result;
    cachedPagesAssetsExpiresAt = now + 5 * 60 * 1e3;
    return result;
  } catch {
    return result;
  }
}
__name(discoverPagesAssets, "discoverPagesAssets");
function buildRootShellEntryTag(rootShellEntryUrl) {
  if (!rootShellEntryUrl) return "";
  return `<script type="module" src="${rootShellEntryUrl}"><\/script>`;
}
__name(buildRootShellEntryTag, "buildRootShellEntryTag");
function buildShellConfig(spaRootUrl, configLandingUrl) {
  const configUrl = configLandingUrl || `${spaRootUrl}/configLanding.js`;
  const versionConfigUrl = `${spaRootUrl}/config.js`;
  const scripts = [];
  if (configUrl) {
    scripts.push(`<script src="${encodeURI(configUrl)}"><\/script>`);
  }
  if (spaRootUrl) {
    scripts.push(`<script>window.__SPA_ROOT_URL__="${encodeURI(spaRootUrl)}";<\/script>`);
  }
  if (spaRootUrl) {
    scripts.push(`<script>window.versionConfig="${encodeURI(versionConfigUrl)}";<\/script>`);
  }
  return scripts.join("\n    ");
}
__name(buildShellConfig, "buildShellConfig");
async function handleSSR(url, env2) {
  const { html: appHtml, state } = await render(url);
  const safeState = state.replace(/</g, "\\u003c");
  const piniaScript = `<script>window.__PINIA_STATE__=${safeState}<\/script>`;
  const pagesAssets = await discoverPagesAssets(env2);
  const finalHtml = HTML_TEMPLATE.replace("<!--app-html-->", appHtml).replace("<!--pinia-state-->", piniaScript).replace("<!--head-tags-->", "").replace("<!--importmap-->", "").replace("<!--shell-config-->", buildShellConfig(env2.SPA_ROOT_URL, env2.CONFIG_LANDING_URL)).replace("<!--root-shell-entry-->", buildRootShellEntryTag(pagesAssets.rootShellEntry));
  const headers = new Headers({
    "Content-Type": "text/html;charset=UTF-8",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
    ...buildSecurityHeaders(env2.SPA_ROOT_URL)
  });
  return new Response(finalHtml, { status: 200, headers });
}
__name(handleSSR, "handleSSR");
var worker_default = {
  /**
   * Handler principal del Cloudflare Worker.
   * Cada request HTTP pasa por aquí.
   *
   * Flujo:
   *  1. Si es asset estático → delegar a env.ASSETS (Static Assets binding)
   *  2. Si es SSR → verificar Cache API → si MISS, ejecutar render → cache.put
   *  3. Si no es HTML ni asset → delegar a ASSETS como fallback
   */
  async fetch(request, env2, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    if (pathname === "/landing-ssr" || pathname === "/landing-ssr/") {
      return Response.redirect(new URL(`/${url.search}`, url.origin).toString(), 302);
    }
    if (pathname === "/sw.js" || pathname === "/registerSW.js") {
      const cleanupScript = pathname === "/sw.js" ? `self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});` : `// noop - SW registration disabled in SSR mode`;
      return new Response(cleanupScript, {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    }
    const redirectTarget = resolveSpaRedirectTarget(env2.SPA_ROOT_URL, url);
    if (redirectTarget) {
      return Response.redirect(redirectTarget, 302);
    }
    if (isStaticAsset(pathname)) {
      let assetResponse = await env2.ASSETS.fetch(request);
      if (!assetResponse.ok && env2.PAGES_ORIGIN) {
        try {
          const pagesUrl = new URL(pathname, env2.PAGES_ORIGIN).href;
          const pagesResponse = await fetch(pagesUrl);
          if (pagesResponse.ok) {
            assetResponse = pagesResponse;
          }
        } catch {
        }
      }
      if (!assetResponse.ok) return assetResponse;
      const headers = new Headers(assetResponse.headers);
      if (pathname.startsWith("/assets/")) {
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
      }
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers
      });
    }
    if (shouldSSR(request, pathname)) {
      const cacheKey = new Request(new URL(`${pathname}?_cv=${CACHE_VERSION}`, url.origin).href, {
        method: "GET",
        headers: request.headers
      });
      const cache = caches.default;
      let cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
      if (isLandingPath(pathname)) {
        try {
          const ssrResponse = await handleSSR(pathname, env2);
          ctx.waitUntil(cache.put(cacheKey, ssrResponse.clone()));
          return ssrResponse;
        } catch (error3) {
          console.error("[Worker SSR] Render error:", error3);
          const fallback = await env2.ASSETS.fetch(
            new Request(new URL("/index.html", url.origin).href)
          );
          if (fallback.ok) {
            const headers = new Headers(fallback.headers);
            headers.set("Content-Type", "text/html;charset=UTF-8");
            headers.set("Cache-Control", "no-cache");
            return new Response(fallback.body, { status: 200, headers });
          }
          return new Response("Internal Server Error", { status: 500 });
        }
      }
      if (env2.PAGES_ORIGIN) {
        try {
          const pagesIndexResponse = await fetch(`${env2.PAGES_ORIGIN}/index.html`);
          if (pagesIndexResponse.ok) {
            const pagesHtml = await pagesIndexResponse.text();
            const headers = new Headers({
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60"
            });
            const spaResponse = new Response(pagesHtml, { status: 200, headers });
            ctx.waitUntil(cache.put(cacheKey, spaResponse.clone()));
            return spaResponse;
          }
          console.error("[Worker] Pages returned non-ok for /index.html:", pagesIndexResponse.status);
        } catch (error3) {
          console.error("[Worker] Error fetching root shell HTML from Pages:", error3);
        }
      }
      try {
        const pagesAssets = await discoverPagesAssets(env2);
        const spaHtml = HTML_TEMPLATE.replace("<!--app-html-->", "").replace("<!--pinia-state-->", "").replace("<!--head-tags-->", "").replace("<!--importmap-->", "").replace("<!--shell-config-->", buildShellConfig(env2.SPA_ROOT_URL, env2.CONFIG_LANDING_URL)).replace("<!--root-shell-entry-->", buildRootShellEntryTag(pagesAssets.rootShellEntry));
        const headers = new Headers({
          "Content-Type": "text/html;charset=UTF-8",
          "Cache-Control": "no-cache",
          ...buildSecurityHeaders(env2.SPA_ROOT_URL)
        });
        return new Response(spaHtml, { status: 200, headers });
      } catch (error3) {
        console.error("[Worker SPA shell] Error building fallback template:", error3);
        return new Response("Internal Server Error", { status: 500 });
      }
    }
    const fallbackResponse = await env2.ASSETS.fetch(request);
    if (!fallbackResponse.ok && env2.PAGES_ORIGIN) {
      try {
        const pagesUrl = new URL(pathname, env2.PAGES_ORIGIN).href;
        const pagesResponse = await fetch(pagesUrl);
        if (pagesResponse.ok) return pagesResponse;
      } catch {
      }
    }
    return fallbackResponse;
  }
};
export {
  worker_default as default
};
/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/server-renderer v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*!
* pinia v3.0.4
* (c) 2025 Eduardo San Martin Morote
* @license MIT
*/
/*! #__NO_SIDE_EFFECTS__ */
/*!
* vue-router v5.0.4
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
//# sourceMappingURL=worker.js.map
