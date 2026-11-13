"use jco";
import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { monotonicClock, wallClock } from '@bytecodealliance/preview2-shim/clocks';
import { outgoingHandler, types } from '@bytecodealliance/preview2-shim/http';
import { error, poll as poll$1, streams } from '@bytecodealliance/preview2-shim/io';
import { insecureSeed as insecureSeed$1, random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
getEnvironment._isHostProvided = true;

if (getEnvironment=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getEnvironment', was 'getEnvironment' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { exit } = exit$1;
exit._isHostProvided = true;

if (exit=== undefined) {
  const err = new Error("unexpectedly undefined local import 'exit', was 'exit' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStderr } = stderr;
getStderr._isHostProvided = true;

if (getStderr=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStderr', was 'getStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStdin } = stdin;
getStdin._isHostProvided = true;

if (getStdin=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStdin', was 'getStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStdout } = stdout;
getStdout._isHostProvided = true;

if (getStdout=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStdout', was 'getStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { TerminalInput } = terminalInput;
TerminalInput._isHostProvided = true;

if (TerminalInput=== undefined) {
  const err = new Error("unexpectedly undefined local import 'TerminalInput', was 'TerminalInput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { TerminalOutput } = terminalOutput;
TerminalOutput._isHostProvided = true;

if (TerminalOutput=== undefined) {
  const err = new Error("unexpectedly undefined local import 'TerminalOutput', was 'TerminalOutput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStderr } = terminalStderr;
getTerminalStderr._isHostProvided = true;

if (getTerminalStderr=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStderr', was 'getTerminalStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStdin } = terminalStdin;
getTerminalStdin._isHostProvided = true;

if (getTerminalStdin=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdin', was 'getTerminalStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStdout } = terminalStdout;
getTerminalStdout._isHostProvided = true;

if (getTerminalStdout=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdout', was 'getTerminalStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { now,
  subscribeDuration } = monotonicClock;
now._isHostProvided = true;

if (now=== undefined) {
  const err = new Error("unexpectedly undefined local import 'now', was 'now' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

subscribeDuration._isHostProvided = true;

if (subscribeDuration=== undefined) {
  const err = new Error("unexpectedly undefined local import 'subscribeDuration', was 'subscribeDuration' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { now: now$1 } = wallClock;
now$1._isHostProvided = true;

if (now$1=== undefined) {
  const err = new Error("unexpectedly undefined local import 'now$1', was 'now' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { handle } = outgoingHandler;
handle._isHostProvided = true;

if (handle=== undefined) {
  const err = new Error("unexpectedly undefined local import 'handle', was 'handle' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { Fields,
  FutureIncomingResponse,
  IncomingBody,
  IncomingResponse,
  OutgoingBody,
  OutgoingRequest,
  RequestOptions } = types;
Fields._isHostProvided = true;

if (Fields=== undefined) {
  const err = new Error("unexpectedly undefined local import 'Fields', was 'Fields' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

FutureIncomingResponse._isHostProvided = true;

if (FutureIncomingResponse=== undefined) {
  const err = new Error("unexpectedly undefined local import 'FutureIncomingResponse', was 'FutureIncomingResponse' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

IncomingBody._isHostProvided = true;

if (IncomingBody=== undefined) {
  const err = new Error("unexpectedly undefined local import 'IncomingBody', was 'IncomingBody' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

IncomingResponse._isHostProvided = true;

if (IncomingResponse=== undefined) {
  const err = new Error("unexpectedly undefined local import 'IncomingResponse', was 'IncomingResponse' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

OutgoingBody._isHostProvided = true;

if (OutgoingBody=== undefined) {
  const err = new Error("unexpectedly undefined local import 'OutgoingBody', was 'OutgoingBody' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

OutgoingRequest._isHostProvided = true;

if (OutgoingRequest=== undefined) {
  const err = new Error("unexpectedly undefined local import 'OutgoingRequest', was 'OutgoingRequest' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

RequestOptions._isHostProvided = true;

if (RequestOptions=== undefined) {
  const err = new Error("unexpectedly undefined local import 'RequestOptions', was 'RequestOptions' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { Error: Error$1 } = error;
Error$1._isHostProvided = true;

if (Error$1=== undefined) {
  const err = new Error("unexpectedly undefined local import 'Error$1', was 'Error' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { Pollable,
  poll } = poll$1;
Pollable._isHostProvided = true;

if (Pollable=== undefined) {
  const err = new Error("unexpectedly undefined local import 'Pollable', was 'Pollable' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

poll._isHostProvided = true;

if (poll=== undefined) {
  const err = new Error("unexpectedly undefined local import 'poll', was 'poll' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { InputStream,
  OutputStream } = streams;
InputStream._isHostProvided = true;

if (InputStream=== undefined) {
  const err = new Error("unexpectedly undefined local import 'InputStream', was 'InputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

OutputStream._isHostProvided = true;

if (OutputStream=== undefined) {
  const err = new Error("unexpectedly undefined local import 'OutputStream', was 'OutputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { insecureSeed } = insecureSeed$1;
insecureSeed._isHostProvided = true;

if (insecureSeed=== undefined) {
  const err = new Error("unexpectedly undefined local import 'insecureSeed', was 'insecureSeed' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getRandomU64 } = random;
getRandomU64._isHostProvided = true;

if (getRandomU64=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getRandomU64', was 'getRandomU64' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}


function promiseWithResolvers() {
  if (Promise.withResolvers) {
    return Promise.withResolvers();
  } else {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
}

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const _debugLog = (...args) => {
  if (!globalThis?.process?.env?.JCO_DEBUG) { return; }
  console.debug(...args);
};
const ASYNC_DETERMINISM = 'random';
const GLOBAL_COMPONENT_MEMORY_MAP = new Map();
const CURRENT_TASK_META = {};

function _getGlobalCurrentTaskMeta(componentIdx) {
  const v = CURRENT_TASK_META[componentIdx];
  if (v === undefined) { return v; }
  return { ...v };
}

function _setGlobalCurrentTaskMeta(args) {
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  const { taskID, componentIdx } = args;
  return CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
}

function _withGlobalCurrentTaskMeta(args) {
  _debugLog('[_withGlobalCurrentTaskMeta()] args', args);
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  if (!args.fn) { throw new TypeError('missing fn'); }
  const { taskID, componentIdx, fn } = args;
  
  try {
    CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
    return fn();
  } catch (err) {
    _debugLog("error while executing sync callee/callback", {
      ...args,
      err,
    });
    throw err;
  } finally {
    CURRENT_TASK_META[componentIdx] = null;
  }
}

async function _withGlobalCurrentTaskMetaAsync(args) {
  _debugLog('[_withGlobalCurrentTaskMetaAsync()] args', args);
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  if (!args.fn) { throw new TypeError('missing fn'); }
  const { taskID, componentIdx, fn } = args;
  
  // If there is already an async task executing, we must wait for it
  // to complete before we can can run the closure we were given
  //
  let current = CURRENT_TASK_META[componentIdx];
  let cstate;
  if (current && current.taskID !== taskID) {
    cstate = getOrCreateAsyncState(componentIdx);
    while (current && current.taskID !== taskID) {
      const { promise, resolve } = Promise.withResolvers();
      cstate.onNextExclusiveRelease(resolve);
      await promise;
      current = CURRENT_TASK_META[componentIdx];
    }
    
    // Since we've just waited for the component to not be locked, re-lock
    // exclusivity so we can run the fn below (likely a callee/callback)
    cstate.exclusiveLock();
  }
  
  try {
    CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
    return await fn();
  } catch (err) {
    _debugLog("error while executing async callee/callback", {
      ...args,
      err,
    });
    throw err;
  } finally {
    CURRENT_TASK_META[componentIdx] = null;
  }
}

async function _clearCurrentTask(args) {
  _debugLog('[_clearCurrentTask()] args', args);
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  const { taskID, componentIdx } = args;
  
  const meta = CURRENT_TASK_META[componentIdx];
  if (!meta) { throw new Error(`missing current task meta for component idx [${componentIdx}]`); }
  
  if (meta.taskID !== taskID) {
    throw new Error(`task ID [${meta.taskID}] != requested ID [${taskID}]`);
  }
  if (meta.componentIdx !== componentIdx) {
    throw new Error(`component idx [${meta.componentIdx}] != requested idx [${componentIdx}]`);
  }
  
  CURRENT_TASK_META[componentIdx] = null;
}

function lookupMemoriesForComponent(args) {
  const { componentIdx } = args ?? {};
  if (args.componentIdx === undefined) { throw new TypeError("missing component idx"); }
  
  const metas = GLOBAL_COMPONENT_MEMORY_MAP.get(componentIdx);
  if (!metas) { return []; }
  
  if (args.memoryIdx === undefined) {
    return Object.values(metas);
  }
  
  const meta = metas[args.memoryIdx];
  return meta?.memory;
}

function registerGlobalMemoryForComponent(args) {
  const { componentIdx, memory, memoryIdx } = args ?? {};
  if (componentIdx === undefined) { throw new TypeError('missing component idx'); }
  if (memory === undefined && memoryIdx === undefined) { throw new TypeError('missing both memory & memory idx'); }
  let inner = GLOBAL_COMPONENT_MEMORY_MAP.get(componentIdx);
  if (!inner) {
    inner = {};
    GLOBAL_COMPONENT_MEMORY_MAP.set(componentIdx, inner);
  }
  
  inner[memoryIdx] = { memory, memoryIdx, componentIdx };
}

class RepTable {
  #data = [0, null];
  #target;
  
  constructor(args) {
    this.target = args?.target;
  }
  
  data() { return this.#data; }
  
  insert(val) {
    _debugLog('[RepTable#insert()] args', { val, target: this.target });
    const freeIdx = this.#data[0];
    if (freeIdx === 0) {
      this.#data.push(val);
      this.#data.push(null);
      const rep = (this.#data.length >> 1) - 1;
      _debugLog('[RepTable#insert()] inserted', { val, target: this.target, rep });
      return rep;
    }
    this.#data[0] = this.#data[freeIdx << 1];
    const placementIdx = freeIdx << 1;
    this.#data[placementIdx] = val;
    this.#data[placementIdx + 1] = null;
    _debugLog('[RepTable#insert()] inserted', { val, target: this.target, rep: freeIdx });
    return freeIdx;
  }
  
  get(rep) {
    _debugLog('[RepTable#get()] args', { rep, target: this.target });
    if (rep === 0) { throw new Error('invalid resource rep during get, (cannot be 0)'); }
    
    const baseIdx = rep << 1;
    const val = this.#data[baseIdx];
    return val;
  }
  
  contains(rep) {
    _debugLog('[RepTable#contains()] args', { rep, target: this.target });
    if (rep === 0) { throw new Error('invalid resource rep during contains, (cannot be 0)'); }
    
    const baseIdx = rep << 1;
    return !!this.#data[baseIdx];
  }
  
  remove(rep) {
    _debugLog('[RepTable#remove()] args', { rep, target: this.target });
    if (rep === 0) { throw new Error('invalid resource rep during remove, (cannot be 0)'); }
    if (this.#data.length === 2) { throw new Error('invalid'); }
    
    const baseIdx = rep << 1;
    const val = this.#data[baseIdx];
    
    this.#data[baseIdx] = this.#data[0];
    this.#data[0] = rep;
    
    return val;
  }
  
  clear() {
    _debugLog('[RepTable#clear()] args', { rep, target: this.target });
    this.#data = [0, null];
  }
}
const _coinFlip = () => { return Math.random() > 0.5; };
let SCOPE_ID = 0;
const I32_MIN = -2_147_483_648;
const I32_MAX = 2_147_483_647;
const _typeCheckValidI32 = (n) => typeof n === 'number' && n >= I32_MIN && n <= I32_MAX;

const _typeCheckAsyncFn= (f) => {
  return f instanceof ASYNC_FN_CTOR;
};

const ASYNC_FN_CTOR = (async () => {}).constructor;

function clearCurrentTask(componentIdx, taskID) {
  _debugLog('[clearCurrentTask()] args', { componentIdx, taskID });
  
  if (componentIdx === undefined || componentIdx === null) {
    throw new Error('missing/invalid component instance index while ending current task');
  }
  
  const tasks = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
  if (!tasks || !Array.isArray(tasks)) {
    throw new Error('missing/invalid tasks for component instance while ending task');
  }
  if (tasks.length == 0) {
    throw new Error(`no current tasks for component instance [${componentIdx}] while ending task`);
  }
  
  if (taskID !== undefined) {
    const last = tasks[tasks.length - 1];
    if (last.id !== taskID) {
      // throw new Error('current task does not match expected task ID');
      return;
    }
  }
  
  ASYNC_CURRENT_TASK_IDS.pop();
  ASYNC_CURRENT_COMPONENT_IDXS.pop();
  
  const taskMeta = tasks.pop();
  return taskMeta.task;
}
const CURRENT_TASK_MAY_BLOCK = new WebAssembly.Global({ value: 'i32', mutable: true }, 0);
const ASYNC_CURRENT_TASK_IDS = [];
const ASYNC_CURRENT_COMPONENT_IDXS = [];

function unpackCallbackResult(result) {
  if (!(_typeCheckValidI32(result))) { throw new Error('invalid callback return value [' + result + '], not a valid i32'); }
  const eventCode = result & 0xF;
  if (eventCode < 0 || eventCode > 3) {
    throw new Error('invalid async return value [' + eventCode + '], outside callback code range');
  }
  if (result < 0 || result >= 2**32) { throw new Error('invalid callback result'); }
  // TODO: table max length check?
  const waitableSetRep = result >> 4;
  return [eventCode, waitableSetRep];
}

class AsyncSubtask {
  static _ID = 0n;
  
  static State = {
    STARTING: 0,
    STARTED: 1,
    RETURNED: 2,
    CANCELLED_BEFORE_STARTED: 3,
    CANCELLED_BEFORE_RETURNED: 4,
  };
  
  #id;
  #state = AsyncSubtask.State.STARTING;
  #componentIdx;
  
  #parentTask;
  #childTask = null;
  
  #dropped = false;
  #cancelRequested = false;
  
  #memoryIdx = null;
  #lenders = null;
  
  #waitable = null;
  
  #callbackFn = null;
  #callbackFnName = null;
  
  #postReturnFn = null;
  #onProgressFn = null;
  #pendingEventFn = null;
  
  #callMetadata = {};
  
  #resolved = false;
  
  #onResolveHandlers = [];
  #onStartHandlers = [];
  
  #result = null;
  #resultSet = false;
  
  fnName;
  target;
  isAsync;
  isManualAsync;
  
  constructor(args) {
    if (typeof args.componentIdx !== 'number') {
      throw new Error('invalid componentIdx for subtask creation');
    }
    this.#componentIdx = args.componentIdx;
    
    this.#id = ++AsyncSubtask._ID;
    this.fnName = args.fnName;
    
    if (!args.parentTask) { throw new Error('missing parent task during subtask creation'); }
    this.#parentTask = args.parentTask;
    
    if (args.childTask) { this.#childTask = args.childTask; }
    
    if (args.memoryIdx) { this.#memoryIdx = args.memoryIdx; }
    
    if (!args.waitable) { throw new Error("missing/invalid waitable"); }
    this.#waitable = args.waitable;
    
    if (args.callMetadata) { this.#callMetadata = args.callMetadata; }
    
    this.#lenders = [];
    this.target = args.target;
    this.isAsync = args.isAsync;
    this.isManualAsync = args.isManualAsync;
  }
  
  id() { return this.#id; }
  parentTaskID() { return this.#parentTask?.id(); }
  childTaskID() { return this.#childTask?.id(); }
  state() { return this.#state; }
  
  waitable() { return this.#waitable; }
  waitableRep() { return this.#waitable.idx(); }
  
  join() { return this.#waitable.join(...arguments); }
  getPendingEvent() { return this.#waitable.getPendingEvent(...arguments); }
  hasPendingEvent() { return this.#waitable.hasPendingEvent(...arguments); }
  setPendingEvent() { return this.#waitable.setPendingEvent(...arguments); }
  
  setTarget(tgt) { this.target = tgt; }
  
  getResult() {
    if (!this.#resultSet) { throw new Error("subtask result has not been set") }
    return this.#result;
  }
  setResult(v) {
    if (this.#resultSet) { throw new Error("subtask result has already been set"); }
    this.#result = v;
    this.#resultSet = true;
  }
  
  componentIdx() { return this.#componentIdx; }
  
  setChildTask(t) {
    if (!t) { throw new Error('cannot set missing/invalid child task on subtask'); }
    if (this.#childTask) { throw new Error('child task is already set on subtask'); }
    if (this.#parentTask === t) { throw new Error("parent cannot be child"); }
    this.#childTask = t;
  }
  getChildTask(t) { return this.#childTask; }
  
  getParentTask() { return this.#parentTask; }
  
  setCallbackFn(f, name) {
    if (!f) { return; }
    if (this.#callbackFn) { throw new Error('callback fn can only be set once'); }
    this.#callbackFn = f;
    this.#callbackFnName = name;
  }
  
  getCallbackFnName() {
    if (!this.#callbackFn) { return undefined; }
    return this.#callbackFn.name;
  }
  
  setPostReturnFn(f) {
    if (!f) { return; }
    if (this.#postReturnFn) { throw new Error('postReturn fn can only be set once'); }
    this.#postReturnFn = f;
  }
  
  setOnProgressFn(f) {
    if (this.#onProgressFn) { throw new Error('on progress fn can only be set once'); }
    this.#onProgressFn = f;
  }
  
  isNotStarted() {
    return this.#state == AsyncSubtask.State.STARTING;
  }
  
  registerOnStartHandler(f) {
    this.#onStartHandlers.push(f);
  }
  
  onStart(args) {
    _debugLog('[AsyncSubtask#onStart()] args', {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      parentTaskID: this.parentTaskID(),
      fnName: this.fnName,
    });
    
    if (this.#onProgressFn) { this.#onProgressFn(); }
    
    this.#state = AsyncSubtask.State.STARTED;
    
    let result;
    
    // If we have been provided a helper start function as a result of
    // component fusion performed by wasmtime tooling, then we can call that helper and lifts/lowers will
    // be performed for us.
    //
    // See also documentation on `HostIntrinsic::PrepareCall`
    //
    if (this.#callMetadata.startFn) {
      result = this.#callMetadata.startFn.apply(null, args?.startFnParams ?? []);
    }
    
    return result;
  }
  
  
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  
  reject(subtaskErr) {
    this.#childTask?.reject(subtaskErr);
  }
  
  onResolve(subtaskValue) {
    _debugLog('[AsyncSubtask#onResolve()] args', {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      isAsync: this.isAsync,
      childTaskID: this.childTaskID(),
      parentTaskID: this.parentTaskID(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      fnName: this.fnName,
    });
    
    if (this.#resolved) {
      throw new Error('subtask has already been resolved');
    }
    
    if (this.#onProgressFn) { this.#onProgressFn(); }
    
    if (subtaskValue === null) {
      if (this.#cancelRequested) {
        throw new Error('cancel was not requested, but no value present at return');
      }
      
      if (this.#state === AsyncSubtask.State.STARTING) {
        this.#state = AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
      } else {
        if (this.#state !== AsyncSubtask.State.STARTED) {
          throw new Error('resolved subtask must have been started before cancellation');
        }
        this.#state = AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
      }
    } else {
      if (this.#state !== AsyncSubtask.State.STARTED) {
        throw new Error('resolved subtask must have been started before completion');
      }
      this.#state = AsyncSubtask.State.RETURNED;
    }
    
    this.setResult(subtaskValue);
    
    for (const f of this.#onResolveHandlers) {
      try {
        f(subtaskValue);
      } catch (err) {
        console.error("error during subtask resolve handler", err);
        throw err;
      }
    }
    
    const callMetadata = this.getCallMetadata();
    
    // TODO(fix): we should be able to easily have the caller's meomry
    // to lower into here, but it's not present in PrepareCall
    const memory = callMetadata.memory ?? this.#parentTask?.getReturnMemory() ?? lookupMemoriesForComponent({ componentIdx: this.#parentTask?.componentIdx() })[0];
    if (callMetadata && !callMetadata.returnFn && this.isAsync && callMetadata.resultPtr && memory) {
      const { resultPtr, realloc } = callMetadata;
      const lowers = callMetadata.lowers; // may have been updated in task.return of the child
      if (lowers && lowers.length > 0) {
        lowers[0]({
          componentIdx: this.#componentIdx,
          memory,
          realloc,
          vals: [subtaskValue],
          storagePtr: resultPtr,
        });
      }
    }
    
    this.#resolved = true;
    this.#parentTask.removeSubtask(this);
  }
  
  getStateNumber() { return this.#state; }
  isReturned() { return this.#state === AsyncSubtask.State.RETURNED; }
  
  getCallMetadata() { return this.#callMetadata; }
  
  isResolved() {
    if (this.#state === AsyncSubtask.State.STARTING
    || this.#state === AsyncSubtask.State.STARTED) {
      return false;
    }
    if (this.#state === AsyncSubtask.State.RETURNED
    || this.#state === AsyncSubtask.State.CANCELLED_BEFORE_STARTED
    || this.#state === AsyncSubtask.State.CANCELLED_BEFORE_RETURNED) {
      return true;
    }
    throw new Error('unrecognized internal Subtask state [' + this.#state + ']');
  }
  
  addLender(handle) {
    _debugLog('[AsyncSubtask#addLender()] args', { handle });
    if (!Number.isNumber(handle)) { throw new Error('missing/invalid lender handle [' + handle + ']'); }
    
    if (this.#lenders.length === 0 || this.isResolved()) {
      throw new Error('subtask has no lendors or has already been resolved');
    }
    
    handle.lends++;
    this.#lenders.push(handle);
  }
  
  deliverResolve() {
    _debugLog('[AsyncSubtask#deliverResolve()] args', {
      lenders: this.#lenders,
      parentTaskID: this.parentTaskID(),
      subtaskID: this.#id,
      childTaskID: this.childTaskID(),
      resolved: this.isResolved(),
      resolveDelivered: this.resolveDelivered(),
    });
    
    const cannotDeliverResolve = this.resolveDelivered() || !this.isResolved();
    if (cannotDeliverResolve) {
      throw new Error('subtask cannot deliver resolution twice, and the subtask must be resolved');
    }
    
    for (const lender of this.#lenders) {
      lender.lends--;
    }
    
    this.#lenders = null;
  }
  
  resolveDelivered() {
    _debugLog('[AsyncSubtask#resolveDelivered()] args', { });
    if (this.#lenders === null && !this.isResolved()) {
      throw new Error('invalid subtask state, lenders missing and subtask has not been resolved');
    }
    return this.#lenders === null;
  }
  
  drop() {
    _debugLog('[AsyncSubtask#drop()] args', {
      componentIdx: this.#componentIdx,
      parentTaskID: this.#parentTask?.id(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      childTaskID: this.#childTask?.id(),
      childTaskFnName: this.#childTask?.entryFnName(),
      subtaskFnName: this.fnName,
    });
    if (!this.#waitable) { throw new Error('missing/invalid inner waitable'); }
    if (!this.resolveDelivered()) {
      throw new Error('cannot drop subtask before resolve is delivered');
    }
    if (this.#waitable) { this.#waitable.drop() }
    this.#dropped = true;
  }
  
  #getComponentState() {
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) {
      throw new Error('invalid/missing async state for component [' + componentIdx + ']');
    }
    return state;
  }
  
  getWaitableHandleIdx() {
    _debugLog('[AsyncSubtask#getWaitableHandleIdx()] args', { });
    if (!this.#waitable) { throw new Error('missing/invalid waitable'); }
    return this.waitableRep();
  }
}

function _prepareCall(
memoryIdx,
getMemoryFn,
startFn,
returnFn,
callerComponentIdx,
calleeComponentIdx,
taskReturnTypeIdx,
calleeIsAsyncInt,
stringEncoding,
resultCountOrAsync,
) {
  _debugLog('[_prepareCall()]', {
    memoryIdx,
    callerComponentIdx,
    calleeComponentIdx,
    taskReturnTypeIdx,
    calleeIsAsyncInt,
    stringEncoding,
    resultCountOrAsync,
  });
  const argArray = [...arguments];
  
  // value passed in *may* be as large as u32::MAX which may be mangled into -2
  resultCountOrAsync >>>= 0;
  
  let isAsync = false;
  let hasResultPointer = false;
  if (resultCountOrAsync === 2**32 - 1) {
    // prepare async with no result (u32::MAX)
    isAsync = true;
    hasResultPointer = false;
  } else if (resultCountOrAsync === 2**32 - 2) {
    // prepare async with result (u32::MAX - 1)
    isAsync = true;
    hasResultPointer = true;
  }
  
  const currentCallerTaskMeta = getCurrentTask(callerComponentIdx);
  if (!currentCallerTaskMeta) {
    throw new Error('invalid/missing current task for caller during prepare call');
  }
  
  const currentCallerTask = currentCallerTaskMeta.task;
  if (!currentCallerTask) {
    throw new Error('unexpectedly missing task in meta for caller during prepare call');
  }
  
  if (currentCallerTask.componentIdx() !== callerComponentIdx) {
    throw new Error(`task component idx [${ currentCallerTask.componentIdx() }] !== [${ callerComponentIdx }] (callee ${ calleeComponentIdx })`);
  }
  
  let getCalleeParamsFn;
  let resultPtr = null;
  let directParamsArr;
  if (hasResultPointer) {
    directParamsArr = argArray.slice(10, argArray.length - 1);
    getCalleeParamsFn = () => directParamsArr;
    resultPtr = argArray[argArray.length - 1];
  } else {
    directParamsArr = argArray.slice(10);
    getCalleeParamsFn = () => directParamsArr;
  }
  
  let encoding;
  switch (stringEncoding) {
    case 0:
    encoding = 'utf8';
    break;
    case 1:
    encoding = 'utf16';
    break;
    case 2:
    encoding = 'compact-utf16';
    break;
    default:
    throw new Error(`unrecognized string encoding enum [${stringEncoding}]`);
  }
  
  const subtask = currentCallerTask.createSubtask({
    componentIdx: callerComponentIdx,
    parentTask: currentCallerTask,
    isAsync,
    callMetadata: {
      getMemoryFn,
      memoryIdx,
      resultPtr,
      returnFn,
      startFn,
    }
  });
  
  const [newTask, newTaskID] = createNewCurrentTask({
    componentIdx: calleeComponentIdx,
    isAsync,
    getCalleeParamsFn,
    entryFnName: [
    'task',
    subtask.getParentTask().id(),
    'subtask',
    subtask.id(),
    'new-prepared-async-task'
    ].join('/'),
    stringEncoding,
  });
  newTask.setParentSubtask(subtask);
  newTask.setReturnMemoryIdx(memoryIdx);
  newTask.setReturnMemory(getMemoryFn);
  subtask.setChildTask(newTask);
  
  newTask.subtaskMeta = {
    subtask,
    calleeComponentIdx,
    callerComponentIdx,
    getCalleeParamsFn,
    stringEncoding,
    isAsync,
  };
  
  _setGlobalCurrentTaskMeta({
    taskID: newTask.id(),
    componentIdx: newTask.componentIdx(),
  });
}

function _asyncStartCall(args, callee, paramCount, resultCount, flags) {
  const componentIdx = ASYNC_CURRENT_COMPONENT_IDXS.at(-1);
  
  const globalTaskMeta = _getGlobalCurrentTaskMeta(componentIdx);
  if (!globalTaskMeta) { throw new Error('missing global current task globalTaskMeta'); }
  const taskID = globalTaskMeta.taskID;
  
  _debugLog('[_asyncStartCall()] args', { args, componentIdx });
  const { getCallbackFn, callbackIdx, getPostReturnFn, postReturnIdx } = args;
  
  const preparedTaskMeta = getCurrentTask(componentIdx, taskID);
  if (!preparedTaskMeta) { throw new Error('unexpectedly missing current task'); }
  
  const preparedTask = preparedTaskMeta.task;
  if (!preparedTask) { throw new Error('unexpectedly missing current task'); }
  if (!preparedTask.subtaskMeta) { throw new Error('missing subtask meta from prepare'); }
  
  const {
    subtask,
    returnMemoryIdx,
    getReturnMemoryFn,
    callerComponentIdx,
    calleeComponentIdx,
    getCalleeParamsFn,
    isAsync,
    stringEncoding,
  } = preparedTask.subtaskMeta;
  if (!subtask) { throw new Error("missing subtask from cstate during async start call"); }
  if (calleeComponentIdx !== preparedTask.componentIdx()) {
    throw new Error(`meta callee idx [${calleeComponentIdx}] != current task idx [${preparedTask.componentIdx()}] during async start call`);
  }
  if (calleeComponentIdx !== componentIdx) {
    throw new Error("mismatched componentIdx for async start call (does not match prepare)");
  }
  
  const argArray = [...arguments];
  
  if (resultCount < 0 || resultCount > 1) { throw new Error('invalid/unsupported result count'); }
  
  const callbackFnName = 'callback_' + callbackIdx;
  const callbackFn = getCallbackFn();
  preparedTask.setCallbackFn(callbackFn, callbackFnName);
  preparedTask.setPostReturnFn(getPostReturnFn());
  
  if (resultCount < 0 || resultCount > 1) {
    throw new Error(`unsupported result count [${ resultCount }]`);
  }
  
  const params = preparedTask.getCalleeParams();
  if (paramCount !== params.length) {
    throw new Error(`unexpected callee param count [${ params.length }], _asyncStartCall invocation expected [${ paramCount }]`);
  }
  
  const callerComponentState = getOrCreateAsyncState(subtask.componentIdx());
  
  const calleeComponentState = getOrCreateAsyncState(preparedTask.componentIdx());
  const calleeBackpressure = calleeComponentState.hasBackpressure();
  
  // Set up a handler on subtask completion to lower results from the call into the caller's memory region.
  //
  // NOTE: during fused guest->guest calls this handler is triggered, but does not actually perform
  // lowering manually, as fused modules provider helper functions that can
  subtask.registerOnResolveHandler((res) => {
    _debugLog('[_asyncStartCall()] handling subtask result', { res, subtaskID: subtask.id() });
    
    let subtaskCallMeta = subtask.getCallMetadata();
    
    // NOTE: in the case of guest -> guest async calls, there may be no memory/realloc present,
    // as the host will intermediate the value storage/movement between calls.
    //
    // We can simply take the value and lower it as a parameter
    if (subtaskCallMeta.memory || subtaskCallMeta.realloc) {
      throw new Error("call metadata unexpectedly contains memory/realloc for guest->guest call");
    }
    
    const callerTask = subtask.getParentTask();
    const calleeTask = preparedTask;
    const callerMemoryIdx = callerTask.getReturnMemoryIdx();
    const callerComponentIdx = callerTask.componentIdx();
    
    // If a helper function was provided we are likely in a fused guest->guest call,
    // and the result will be delivered (lift/lowered) via helper function
    if (subtaskCallMeta && subtaskCallMeta.returnFn) {
      _debugLog('[_asyncStartCall()] return function present while handling subtask result, returning early (skipping lower)');
      
      // TODO: centralize calling of returnFn to *one place* (if possible)
      if (subtaskCallMeta.returnFnCalled) { return; }
      
      subtaskCallMeta.returnFn.apply(null, [subtaskCallMeta.resultPtr]);
      return;
    }
    
    // If there is no where to lower the results, exit early
    if (!subtaskCallMeta.resultPtr) {
      _debugLog('[_asyncStartCall()] no result ptr during subtask result handling, returning early (skipping lower)');
      return;
    }
    
    let callerMemory;
    if (callerMemoryIdx !== null && callerMemoryIdx !== undefined) {
      callerMemory = lookupMemoriesForComponent({ componentIdx: callerComponentIdx, memoryIdx: callerMemoryIdx });
    } else {
      const callerMemories = lookupMemoriesForComponent({ componentIdx: callerComponentIdx });
      if (callerMemories.length !== 1) { throw new Error(`unsupported amount of caller memories`); }
      callerMemory = callerMemories[0];
    }
    
    if (!callerMemory) {
      _debugLog('[_asyncStartCall()] missing memory', { subtaskID: subtask.id(), res });
      throw new Error(`missing memory for to guest->guest call result (subtask [${subtask.id()}])`);
    }
    
    const lowerFns = calleeTask.getReturnLowerFns();
    if (!lowerFns || lowerFns.length === 0) {
      _debugLog('[_asyncStartCall()] missing result lower metadata for guest->guest call', { subtaskID: subtask.id() });
      throw new Error(`missing result lower metadata for guest->guest call (subtask [${subtask.id()}])`);
    }
    
    if (lowerFns.length !== 1) {
      _debugLog('[_asyncStartCall()] only single result reportetd for guest->guest call', { subtaskID: subtask.id() });
      throw new Error(`only single result supported for guest->guest calls (subtask [${subtask.id()}])`);
    }
    
    _debugLog('[_asyncStartCall()] lowering results', { subtaskID: subtask.id() });
    lowerFns[0]({
      realloc: undefined,
      memory: callerMemory,
      vals: [res],
      storagePtr: subtaskCallMeta.resultPtr,
      componentIdx: callerComponentIdx
    });
    
  });
  
  subtask.setOnProgressFn(() => {
    subtask.setPendingEvent(() => {
      if (subtask.isResolved()) { subtask.deliverResolve(); }
      const event = {
        code: ASYNC_EVENT_CODE.SUBTASK,
        payload0: subtask.waitableRep(),
        payload1: subtask.getStateNumber(),
      };
      return event;
    });
  });
  
  // Start the (event) driver loop that will resolve the task
  queueMicrotask(async () => {
    let startRes = subtask.onStart({ startFnParams: params });
    startRes = Array.isArray(startRes) ? startRes : [startRes];
    
    await calleeComponentState.suspendTask({
      task: preparedTask,
      readyFn: () => !calleeComponentState.isExclusivelyLocked(),
    });
    
    const started = await preparedTask.enter();
    if (!started) {
      _debugLog('[_asyncStartCall()] task failed early', {
        taskID: preparedTask.id(),
        subtaskID: subtask.id(),
      });
      throw new Error("task failed to start");
      return;
    }
    
    let callbackResult;
    try {
      let jspiCallee = WebAssembly.promising(callee);
      callbackResult = await _withGlobalCurrentTaskMetaAsync({
        taskID: preparedTask.id(),
        componentIdx: preparedTask.componentIdx(),
        fn: () => {
          return jspiCallee.apply(null, startRes);
        }
      });
    } catch(err) {
      _debugLog("[_asyncStartCall()] initial subtask callee run failed", err);
      // NOTE: a good place to rejectt the parent task, if rejection API is enabled
      // subtask.reject(err);
      // subtask.getParentTask().reject(err);
      
      subtask.getParentTask().setErrored(err);
      
      return;
    }
    
    // If there was no callback function, we're dealing with a sync function
    // that was lifted as async without one, there is only the callee.
    if (!callbackFn) {
      _debugLog("[_asyncStartCall()] no callback, resolving w/ callee result", {
        taskID: preparedTask.id(),
        componentIdx: preparedTask.componentIdx(),
        preparedTask,
        stateNumber: preparedTask.taskState(),
        isResolved: preparedTask.isResolved(),
        callbackFn,
      });
      preparedTask.resolve([callbackResult]);
      return;
    }
    
    let fnName = callbackFn.fnName;
    if (!fnName) {
      fnName = [
      '<task ',
      subtask.parentTaskID(),
      '/subtask ',
      subtask.id(),
      '/task ',
      preparedTask.id(),
      '>',
      ].join("");
    }
    
    try {
      _debugLog("[_asyncStartCall()] starting driver loop", {
        fnName,
        componentIdx: preparedTask.componentIdx(),
        subtaskID: subtask.id(),
        childTaskID: subtask.childTaskID(),
        parentTaskID: subtask.parentTaskID(),
      });
      
      await _driverLoop({
        componentState: calleeComponentState,
        task: preparedTask,
        fnName,
        isAsync: true,
        callbackResult,
        resolve,
        reject
      });
    } catch (err) {
      _debugLog("[AsyncStartCall] drive loop call failure", { err });
    }
    
  });
  
  const subtaskState = subtask.getStateNumber();
  if (subtaskState < 0 || subtaskState > 2**5) {
    throw new Error('invalid subtask state, out of valid range');
  }
  
  _debugLog('[_asyncStartCall()] returning subtask rep & state', {
    subtask: {
      rep: subtask.waitableRep(),
      state: subtaskState,
    }
  });
  
  return Number(subtask.waitableRep()) << 4 | subtaskState;
}

function _syncStartCall(callbackIdx) {
  _debugLog('[_syncStartCall()] args', { callbackIdx });
  throw new Error('synchronous start call not implemented!');
}

class Waitable {
  #componentIdx;
  
  #pendingEventFn = null;
  
  #promise;
  #resolve;
  #reject;
  
  #waitableSet = null;
  
  #idx = null; // to component-global waitables
  
  target;
  
  constructor(args) {
    const { componentIdx, target } = args;
    this.#componentIdx = componentIdx;
    this.target = args.target;
    this.#resetPromise();
  }
  
  componentIdx() { return this.#componentIdx; }
  isInSet() { return this.#waitableSet !== null; }
  
  idx() { return this.#idx; }
  setIdx(idx) {
    if (idx === 0) { throw new Error("waitable idx cannot be zero"); }
    this.#idx = idx;
  }
  
  setTarget(tgt) { this.target = tgt; }
  
  #resetPromise() {
    const { promise, resolve, reject } = promiseWithResolvers()
    this.#promise = promise;
    this.#resolve = resolve;
    this.#reject = reject;
  }
  
  resolve() { this.#resolve(); }
  reject(err) { this.#reject(err); }
  promise() { return this.#promise; }
  
  hasPendingEvent() {
    // _debugLog('[Waitable#hasPendingEvent()]', {
      //     componentIdx: this.#componentIdx,
      //     waitable: this,
      //     waitableSet: this.#waitableSet,
      //     hasPendingEvent: this.#pendingEventFn !== null,
      // });
      return this.#pendingEventFn !== null;
    }
    
    setPendingEvent(fn) {
      _debugLog('[Waitable#setPendingEvent()] args', {
        waitable: this,
        inSet: this.#waitableSet,
      });
      this.#pendingEventFn = fn;
    }
    
    getPendingEvent() {
      _debugLog('[Waitable#getPendingEvent()] args', {
        waitable: this,
        inSet: this.#waitableSet,
        hasPendingEvent: this.#pendingEventFn !== null,
      });
      if (this.#pendingEventFn === null) { return null; }
      const eventFn = this.#pendingEventFn;
      this.#pendingEventFn = null;
      const e = eventFn();
      this.#resetPromise();
      return e;
    }
    
    join(waitableSet) {
      _debugLog('[Waitable#join()] args', {
        waitable: this,
        waitableSet: waitableSet,
      });
      if (this.#waitableSet) { this.#waitableSet.removeWaitable(this); }
      if (!waitableSet) {
        this.#waitableSet = null;
        return;
      }
      waitableSet.addWaitable(this);
      this.#waitableSet = waitableSet;
    }
    
    drop() {
      _debugLog('[Waitable#drop()] args', {
        componentIdx: this.#componentIdx,
        waitable: this,
      });
      if (this.hasPendingEvent()) {
        throw new Error('waitables with pending events cannot be dropped');
      }
      this.join(null);
    }
    
  }
  
  const ERR_CTX_TABLES = {};
  
  const emptyFunc = () => {};
  
  let dv = new DataView(new ArrayBuffer());
  const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);
  
  const toUint64 = val => BigInt.asUintN(64, BigInt(val));
  
  function toUint16(val) {
    val >>>= 0;
    val %= 2 ** 16;
    return val;
  }
  
  function toUint32(val) {
    return val >>> 0;
  }
  
  function toUint8(val) {
    val >>>= 0;
    val %= 2 ** 8;
    return val;
  }
  const TEXT_DECODER_UTF8 = new TextDecoder();
  const TEXT_ENCODER_UTF8 = new TextEncoder();
  
  function _utf8AllocateAndEncode(s, realloc, memory) {
    if (typeof s !== 'string') {
      throw new TypeError('expected a string, received [' + typeof s + ']');
    }
    if (s.length === 0) { return { ptr: 1, len: 0 }; }
    let buf = TEXT_ENCODER_UTF8.encode(s);
    let ptr = realloc(0, 0, 1, buf.length);
    new Uint8Array(memory.buffer).set(buf, ptr);
    const res = { ptr, len: buf.length, codepoints: [...s].length };
    return res;
  }
  
  
  const T_FLAG = 1 << 30;
  
  function rscTableCreateOwn(table, rep) {
    const free = table[0] & ~T_FLAG;
    if (free === 0) {
      table.push(0);
      table.push(rep | T_FLAG);
      return (table.length >> 1) - 1;
    }
    table[0] = table[free << 1];
    table[free << 1] = 0;
    table[(free << 1) + 1] = rep | T_FLAG;
    return free;
  }
  
  function rscTableRemove(table, handle) {
    const scope = table[handle << 1];
    const val = table[(handle << 1) + 1];
    const own = (val & T_FLAG) !== 0;
    const rep = val & ~T_FLAG;
    if (val === 0 || (scope & T_FLAG) !== 0) {
      throw new TypeError("Invalid handle");
    }
    table[handle << 1] = table[0] | T_FLAG;
    table[0] = handle | T_FLAG;
    return { rep, scope, own };
  }
  
  let curResourceBorrows = [];
  
  function getCurrentTask(componentIdx, taskID) {
    let usedGlobal = false;
    if (componentIdx === undefined || componentIdx === null) {
      throw new Error('missing component idx'); // TODO(fix)
      // componentIdx = ASYNC_CURRENT_COMPONENT_IDXS.at(-1);
      // usedGlobal = true;
    }
    
    const taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
    if (taskMetas === undefined || taskMetas.length === 0) { return undefined; }
    
    if (taskID) {
      return taskMetas.find(meta => meta.task.id() === taskID);
    }
    
    const taskMeta = taskMetas[taskMetas.length - 1];
    if (!taskMeta || !taskMeta.task) { return undefined; }
    
    return taskMeta;
  }
  
  function createNewCurrentTask(args) {
    _debugLog('[createNewCurrentTask()] args', args);
    const {
      componentIdx,
      isAsync,
      isManualAsync,
      entryFnName,
      parentSubtaskID,
      callbackFnName,
      getCallbackFn,
      getParamsFn,
      stringEncoding,
      errHandling,
      getCalleeParamsFn,
      resultPtr,
      callingWasmExport,
    } = args;
    if (componentIdx === undefined || componentIdx === null) {
      throw new Error('missing/invalid component instance index while starting task');
    }
    let taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
    const callbackFn = getCallbackFn ? getCallbackFn() : null;
    
    const newTask = new AsyncTask({
      componentIdx,
      isAsync,
      isManualAsync,
      entryFnName,
      callbackFn,
      callbackFnName,
      stringEncoding,
      getCalleeParamsFn,
      resultPtr,
      errHandling,
    });
    
    const newTaskID = newTask.id();
    const newTaskMeta = { id: newTaskID, componentIdx, task: newTask };
    
    // NOTE: do not track host tasks
    ASYNC_CURRENT_TASK_IDS.push(newTaskID);
    ASYNC_CURRENT_COMPONENT_IDXS.push(componentIdx);
    
    if (!taskMetas) {
      taskMetas = [newTaskMeta];
      ASYNC_TASKS_BY_COMPONENT_IDX.set(componentIdx, [newTaskMeta]);
    } else {
      taskMetas.push(newTaskMeta);
    }
    
    return [newTask, newTaskID];
  }
  const ASYNC_TASKS_BY_COMPONENT_IDX = new Map();
  
  class AsyncTask {
    static _ID = 0n;
    
    static State = {
      INITIAL: 'initial',
      CANCELLED: 'cancelled',
      CANCEL_PENDING: 'cancel-pending',
      CANCEL_DELIVERED: 'cancel-delivered',
      RESOLVED: 'resolved',
    }
    
    static BlockResult = {
      CANCELLED: 'block.cancelled',
      NOT_CANCELLED: 'block.not-cancelled',
    }
    
    #id;
    #componentIdx;
    #state;
    #isAsync;
    #isManualAsync;
    #entryFnName = null;
    
    #onResolveHandlers = [];
    #completionPromise = null;
    #rejected = false;
    
    #exitPromise = null;
    #onExitHandlers = [];
    
    #memoryIdx = null;
    #memory = null;
    
    #callbackFn = null;
    #callbackFnName = null;
    
    #postReturnFn = null;
    
    #getCalleeParamsFn = null;
    
    #stringEncoding = null;
    
    #parentSubtask = null;
    
    #needsExclusiveLock = false;
    
    #errHandling;
    
    #backpressurePromise;
    #backpressureWaiters = 0n;
    
    #returnLowerFns = null;
    
    #subtasks = [];
    
    #entered = false;
    #exited = false;
    #errored = null;
    
    cancelled = false;
    cancelRequested = false;
    alwaysTaskReturn = false;
    
    returnCalls =  0;
    storage = [0, 0];
    borrowedHandles = {};
    
    constructor(opts) {
      this.#id = ++AsyncTask._ID;
      
      if (opts?.componentIdx === undefined) {
        throw new TypeError('missing component id during task creation');
      }
      this.#componentIdx = opts.componentIdx;
      
      this.#state = AsyncTask.State.INITIAL;
      this.#isAsync = opts?.isAsync ?? false;
      this.#isManualAsync = opts?.isManualAsync ?? false;
      this.#entryFnName = opts.entryFnName;
      
      const {
        promise: completionPromise,
        resolve: resolveCompletionPromise,
        reject: rejectCompletionPromise,
      } = promiseWithResolvers();
      this.#completionPromise = completionPromise;
      
      this.#onResolveHandlers.push((results) => {
        if (this.#errored !== null) {
          rejectCompletionPromise(this.#errored);
          return;
        } else if (this.#rejected) {
          rejectCompletionPromise(results);
          return;
        }
        resolveCompletionPromise(results);
      });
      
      const {
        promise: exitPromise,
        resolve: resolveExitPromise,
        reject: rejectExitPromise,
      } = promiseWithResolvers();
      this.#exitPromise = exitPromise;
      
      this.#onExitHandlers.push(() => {
        resolveExitPromise();
      });
      
      if (opts.callbackFn) { this.#callbackFn = opts.callbackFn; }
      if (opts.callbackFnName) { this.#callbackFnName = opts.callbackFnName; }
      
      if (opts.getCalleeParamsFn) { this.#getCalleeParamsFn = opts.getCalleeParamsFn; }
      
      if (opts.stringEncoding) { this.#stringEncoding = opts.stringEncoding; }
      
      if (opts.parentSubtask) { this.#parentSubtask = opts.parentSubtask; }
      
      this.#needsExclusiveLock = this.isSync() || !this.hasCallback();
      
      if (opts.errHandling) { this.#errHandling = opts.errHandling; }
    }
    
    taskState() { return this.#state; }
    id() { return this.#id; }
    componentIdx() { return this.#componentIdx; }
    entryFnName() { return this.#entryFnName; }
    
    completionPromise() { return this.#completionPromise; }
    exitPromise() { return this.#exitPromise; }
    
    isAsync() { return this.#isAsync; }
    isSync() { return !this.isAsync(); }
    
    getErrHandling() { return this.#errHandling; }
    
    hasCallback() { return this.#callbackFn !== null; }
    
    getReturnMemoryIdx() { return this.#memoryIdx; }
    setReturnMemoryIdx(idx) {
      if (idx === null) { return; }
      this.#memoryIdx = idx;
    }
    
    getReturnMemory() { return this.#memory; }
    setReturnMemory(m) {
      if (m === null) { return; }
      this.#memory = m;
    }
    
    setReturnLowerFns(fns) { this.#returnLowerFns = fns; }
    getReturnLowerFns() { return this.#returnLowerFns; }
    
    setParentSubtask(subtask) {
      if (!subtask || !(subtask instanceof AsyncSubtask)) { return }
      if (this.#parentSubtask) { throw new Error('parent subtask can only be set once'); }
      this.#parentSubtask = subtask;
    }
    
    getParentSubtask() { return this.#parentSubtask; }
    
    // TODO(threads): this is very inefficient, we can pass along a root task,
    // and ideally do not need this once thread support is in place
    getRootTask() {
      let currentSubtask = this.getParentSubtask();
      let task = this;
      while (currentSubtask) {
        task = currentSubtask.getParentTask();
        currentSubtask = task.getParentSubtask();
      }
      return task;
    }
    
    setPostReturnFn(f) {
      if (!f) { return; }
      if (this.#postReturnFn) { throw new Error('postReturn fn can only be set once'); }
      this.#postReturnFn = f;
    }
    
    setCallbackFn(f, name) {
      if (!f) { return; }
      if (this.#callbackFn) { throw new Error('callback fn can only be set once'); }
      this.#callbackFn = f;
      this.#callbackFnName = name;
    }
    
    getCallbackFnName() {
      if (!this.#callbackFnName) { return undefined; }
      return this.#callbackFnName;
    }
    
    async runCallbackFn(...args) {
      if (!this.#callbackFn) { throw new Error('on callback function has been set for task'); }
      return await this.#callbackFn.apply(null, args);
    }
    
    getCalleeParams() {
      if (!this.#getCalleeParamsFn) { throw new Error('missing/invalid getCalleeParamsFn'); }
      return this.#getCalleeParamsFn();
    }
    
    mayBlock() { return this.isAsync() || this.isResolvedState() }
    
    mayEnter(task) {
      const cstate = getOrCreateAsyncState(this.#componentIdx);
      if (cstate.hasBackpressure()) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to backpressure', { taskID: this.#id });
        return false;
      }
      if (!cstate.callingSyncImport()) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to sync import call', { taskID: this.#id });
        return false;
      }
      const callingSyncExportWithSyncPending = cstate.callingSyncExport && !task.isAsync;
      if (!callingSyncExportWithSyncPending) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to sync export w/ sync pending', { taskID: this.#id });
        return false;
      }
      return true;
    }
    
    enterSync() {
      if (this.needsExclusiveLock()) {
        const cstate = getOrCreateAsyncState(this.#componentIdx);
        cstate.exclusiveLock();
      }
      return true;
    }
    
    async enter(opts) {
      _debugLog('[AsyncTask#enter()] args', {
        taskID: this.#id,
        componentIdx: this.#componentIdx,
        subtaskID: this.getParentSubtask()?.id(),
      });
      
      if (this.#entered) {
        throw new Error(`task with ID [${this.#id}] should not be entered twice`);
      }
      
      const cstate = getOrCreateAsyncState(this.#componentIdx);
      
      // If a task is either synchronous or host-provided (e.g. a host import, whether sync or async)
      // then we can avoid component-relevant tracking and immediately enter
      if (this.isSync() || opts?.isHost) {
        this.#entered = true;
        
        // TODO(breaking): remove once manually-spccifying async fns is removed
        // It is currently possible for an actually sync export to be specified
        // as async via JSPI
        if (this.#isManualAsync) {
          if (this.needsExclusiveLock()) { cstate.exclusiveLock(); }
        }
        
        return this.#entered;
      }
      
      if (cstate.hasBackpressure()) {
        cstate.addBackpressureWaiter();
        
        const result = await this.waitUntil({
          readyFn: () => !cstate.hasBackpressure(),
          cancellable: true,
        });
        
        cstate.removeBackpressureWaiter();
        
        if (result === AsyncTask.BlockResult.CANCELLED) {
          this.cancel();
          return false;
        }
      }
      
      if (this.needsExclusiveLock()) { cstate.exclusiveLock(); }
      
      this.#entered = true;
      return this.#entered;
    }
    
    isRunningState() { return this.#state !== AsyncTask.State.RESOLVED; }
    isResolvedState() { return this.#state === AsyncTask.State.RESOLVED; }
    isResolved() { return this.#state === AsyncTask.State.RESOLVED; }
    
    async waitUntil(opts) {
      const { readyFn, waitableSetRep, cancellable } = opts;
      _debugLog('[AsyncTask#waitUntil()] args', { taskID: this.#id, waitableSetRep, cancellable });
      
      const state = getOrCreateAsyncState(this.#componentIdx);
      const wset = state.handles.get(waitableSetRep);
      
      let event;
      
      wset.incrementNumWaiting();
      
      const keepGoing = await this.suspendUntil({
        readyFn: () => {
          const hasPendingEvent = wset.hasPendingEvent();
          const ready = readyFn();
          return ready && hasPendingEvent;
        },
        cancellable,
      });
      
      if (keepGoing) {
        event = wset.getPendingEvent();
      } else {
        event = {
          code: ASYNC_EVENT_CODE.TASK_CANCELLED,
          payload0: 0,
          payload1: 0,
        };
      }
      
      wset.decrementNumWaiting();
      
      return event;
    }
    
    async yieldUntil(opts) {
      const { readyFn, cancellable } = opts;
      _debugLog('[AsyncTask#yieldUntil()] args', { taskID: this.#id, cancellable });
      
      const keepGoing = await this.suspendUntil({ readyFn, cancellable });
      if (keepGoing) {
        return {
          code: ASYNC_EVENT_CODE.NONE,
          payload0: 0,
          payload1: 0,
        };
      }
      
      return {
        code: ASYNC_EVENT_CODE.TASK_CANCELLED,
        payload0: 0,
        payload1: 0,
      };
    }
    
    async suspendUntil(opts) {
      const { cancellable, readyFn } = opts;
      _debugLog('[AsyncTask#suspendUntil()] args', { cancellable });
      
      const pendingCancelled = this.deliverPendingCancel({ cancellable });
      if (pendingCancelled) { return false; }
      
      const completed = await this.immediateSuspendUntil({ readyFn, cancellable });
      return completed;
    }
    
    // TODO(threads): equivalent to thread.suspend_until()
    async immediateSuspendUntil(opts) {
      const { cancellable, readyFn } = opts;
      _debugLog('[AsyncTask#immediateSuspendUntil()] args', { cancellable, readyFn });
      
      const ready = readyFn();
      if (ready && ASYNC_DETERMINISM === 'random') {
        // const coinFlip = _coinFlip();
        // if (coinFlip) { return true }
        return true;
      }
      
      const keepGoing = await this.immediateSuspend({ cancellable, readyFn });
      return keepGoing;
    }
    
    async immediateSuspend(opts) { // NOTE: equivalent to thread.suspend()
    // TODO(threads): store readyFn on the thread
    const { cancellable, readyFn } = opts;
    _debugLog('[AsyncTask#immediateSuspend()] args', { cancellable, readyFn });
    
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) { return false; }
    
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    const keepGoing = await cstate.suspendTask({ task: this, readyFn });
    return keepGoing;
  }
  
  deliverPendingCancel(opts) {
    const { cancellable } = opts;
    _debugLog('[AsyncTask#deliverPendingCancel()] args', { cancellable });
    
    if (cancellable && this.#state === AsyncTask.State.PENDING_CANCEL) {
      this.#state = AsyncTask.State.CANCEL_DELIVERED;
      return true;
    }
    
    return false;
  }
  
  isCancelled() { return this.cancelled }
  
  cancel(args) {
    _debugLog('[AsyncTask#cancel()] args', { });
    if (this.taskState() !== AsyncTask.State.CANCEL_DELIVERED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] invalid task state [${this.taskState()}] for cancellation`);
    }
    if (this.borrowedHandles.length > 0) { throw new Error('task still has borrow handles'); }
    this.cancelled = true;
    this.onResolve(args?.error ?? new Error('task cancelled'));
    this.#state = AsyncTask.State.RESOLVED;
  }
  
  onResolve(taskValue) {
    const handlers = this.#onResolveHandlers;
    this.#onResolveHandlers = [];
    for (const f of handlers) {
      try {
        // TODO(fix): resolve handlers getting called a ton?
        f(taskValue);
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    
    if (this.#parentSubtask) {
      const meta = this.#parentSubtask.getCallMetadata();
      // Run the rturn fn if it has not already been called -- this *should* have happened in
      // `task.return`, but some paths do not go through task.return (e.g. async lower of sync fn
      // which goes through prepare + async-start-call)
      if (meta.returnFn && !meta.returnFnCalled) {
        _debugLog('[AsyncTask#onResolve()] running returnFn', {
          componentIdx: this.#componentIdx,
          taskID: this.#id,
          subtaskID: this.#parentSubtask.id(),
        });
        const memory = meta.getMemoryFn();
        meta.returnFn.apply(null, [taskValue, meta.resultPtr]);
        meta.returnFnCalled = true;
      }
    }
    
    if (this.#postReturnFn) {
      _debugLog('[AsyncTask#onResolve()] running post return ', {
        componentIdx: this.#componentIdx,
        taskID: this.#id,
      });
      try {
        this.#postReturnFn(taskValue);
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    
    if (this.#parentSubtask) {
      this.#parentSubtask.onResolve(taskValue);
    }
  }
  
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  
  isRejected() { return this.#rejected; }
  
  setErrored(err) {
    this.#errored = err;
  }
  
  reject(taskErr) {
    _debugLog('[AsyncTask#reject()] args', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      parentSubtask: this.#parentSubtask,
      parentSubtaskID: this.#parentSubtask?.id(),
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
      errMsg: taskErr.message,
    });
    
    if (this.isResolvedState() || this.#rejected) { return; }
    
    for (const subtask of this.#subtasks) {
      subtask.reject(taskErr);
    }
    
    this.#rejected = true;
    this.cancelRequested = true;
    this.#state = AsyncTask.State.PENDING_CANCEL;
    const cancelled = this.deliverPendingCancel({ cancellable: true });
    
    // TODO: do cleanup here to reset the machinery so we can run again?
    
    
    this.cancel({ error: taskErr });
  }
  
  resolve(results) {
    _debugLog('[AsyncTask#resolve()] args', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
    });
    
    if (this.#state === AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}]  is already resolved (did you forget to wait for an import?)`);
    }
    
    if (this.borrowedHandles.length > 0) {
      throw new Error('task still has borrow handles');
    }
    
    this.#state = AsyncTask.State.RESOLVED;
    
    switch (results.length) {
      case 0:
      this.onResolve(undefined);
      break;
      case 1:
      this.onResolve(results[0]);
      break;
      default:
      _debugLog('[AsyncTask#resolve()] unexpected number of results', {
        componentIdx: this.#componentIdx,
        results,
        taskID: this.#id,
        subtaskID: this.#parentSubtask?.id(),
        entryFnName: this.#entryFnName,
        callbackFnName: this.#callbackFnName,
      });
      throw new Error('unexpected number of results');
    }
  }
  
  exit() {
    _debugLog('[AsyncTask#exit()]', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
    });
    
    if (this.#exited)  { throw new Error("task has already exited"); }
    
    if (this.#state !== AsyncTask.State.RESOLVED) {
      // TODO(fix): only fused, manually specified post returns seem to break this invariant,
      // as the TaskReturn trampoline is not activated it seems.
      //
      // see: test/p3/ported/wasmtime/component-async/post-return.js
      //
      // We *should* be able to upgrade this to be more strict and throw at some point,
      // which may involve rewriting the upstream test to surface task return manually somehow.
      //
      //throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] exited without resolution`);
      _debugLog('[AsyncTask#exit()] task exited without resolution', {
        componentIdx: this.#componentIdx,
        taskID: this.#id,
        subtask: this.getParentSubtask(),
        subtaskID: this.getParentSubtask()?.id(),
      });
      this.#state = AsyncTask.State.RESOLVED;
    }
    
    if (this.borrowedHandles > 0) {
      throw new Error('task [${this.#id}] exited without clearing borrowed handles');
    }
    
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) { throw new Error('missing async state for component [' + this.#componentIdx + ']'); }
    
    // Exempt the host from exclusive lock check
    if (this.#componentIdx !== -1 && this.needsExclusiveLock() && !state.isExclusivelyLocked()) {
      throw new Error(`task [${this.#id}] exit: component [${this.#componentIdx}] should have been exclusively locked`);
    }
    
    state.exclusiveRelease();
    
    for (const f of this.#onExitHandlers) {
      try {
        f();
      } catch (err) {
        console.error("error during task exit handler", err);
        throw err;
      }
    }
    
    this.#exited = true;
    clearCurrentTask(this.#componentIdx, this.id());
  }
  
  needsExclusiveLock() {
    return !this.#isAsync || this.hasCallback();
  }
  
  createSubtask(args) {
    _debugLog('[AsyncTask#createSubtask()] args', args);
    const { componentIdx, childTask, callMetadata, fnName, isAsync, isManualAsync } = args;
    
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (!cstate) {
      throw new Error(`invalid/missing async state for component idx [${componentIdx}]`);
    }
    
    const waitable = new Waitable({
      componentIdx: this.#componentIdx,
      target: `subtask (internal ID [${this.#id}])`,
    });
    
    const newSubtask = new AsyncSubtask({
      componentIdx,
      childTask,
      parentTask: this,
      callMetadata,
      isAsync,
      isManualAsync,
      fnName,
      waitable,
    });
    this.#subtasks.push(newSubtask);
    newSubtask.setTarget(`subtask (internal ID [${newSubtask.id()}], waitable [${waitable.idx()}], component [${componentIdx}])`);
    waitable.setIdx(cstate.handles.insert(newSubtask));
    waitable.setTarget(`waitable for subtask (waitable id [${waitable.idx()}], subtask internal ID [${newSubtask.id()}])`);
    
    return newSubtask;
  }
  
  getLatestSubtask() {
    return this.#subtasks.at(-1);
  }
  
  getSubtaskByWaitableRep(rep) {
    if (rep === undefined) { throw new TypeError('missing rep'); }
    return this.#subtasks.find(s => s.waitableRep() === rep);
  }
  
  currentSubtask() {
    _debugLog('[AsyncTask#currentSubtask()]');
    if (this.#subtasks.length === 0) { return undefined; }
    return this.#subtasks.at(-1);
  }
  
  removeSubtask(subtask) {
    if (this.#subtasks.length === 0) { throw new Error('cannot end current subtask: no current subtask'); }
    this.#subtasks = this.#subtasks.filter(t => t !== subtask);
    return subtask;
  }
}

function _lowerImportBackwardsCompat(args) {
  const params = [...arguments].slice(1);
  _debugLog('[_lowerImportBackwardsCompat()] args', { args, params });
  const {
    functionIdx,
    componentIdx,
    isAsync,
    isManualAsync,
    paramLiftFns,
    resultLowerFns,
    funcTypeIsAsync,
    metadata,
    memoryIdx,
    getMemoryFn,
    getReallocFn,
    importFn,
  } = args;
  
  let meta = _getGlobalCurrentTaskMeta(componentIdx);
  let createdTask;
  
  // Some components depend on initialization logic (i.e. `_initialize` or some such
  // core wasm export) that is embedded in the component, but is not executed or wizer'd
  // away before the transpiled component is attempted to be used.
  //
  // These components execut their initialization logic *when they are imported* in the
  // transpiled context -- so we may get a call to an export that is lowered without going
  // through `CallWasm` or `CallInterface`.
  //
  if (!meta) {
    if (funcTypeIsAsync || (isAsync && !isManualAsync)) {
      throw new Error('p3 async wasm exports cannot use backwards compat auto-task init');
    }
    
    const [newTask, newTaskID] = createNewCurrentTask({
      componentIdx,
      isAsync,
      isManualAsync,
      callingWasmExport: false,
    });
    createdTask = newTask;
    
    // Since we're managing the task creation ourselves we must clear ourselves
    createdTask.registerOnResolveHandler(() => {
      _clearCurrentTask({
        taskID: task.id(),
        componentIdx: task.componentIdx(),
      });
    });
    
    _setGlobalCurrentTaskMeta({
      componentIdx,
      taskID: newTaskID,
    });
    
    meta = _getGlobalCurrentTaskMeta(componentIdx);
  }
  
  const { taskID } = meta;
  
  const taskMeta = getCurrentTask(componentIdx, taskID);
  if (!taskMeta) {
    throw new Error('invalid/missing async task meta');
  }
  
  const task = taskMeta.task;
  if (!task) { throw new Error('invalid/missing async task'); }
  
  const cstate = getOrCreateAsyncState(componentIdx);
  
  // TODO: re-enable this check -- postReturn can call imports though,
  // and that breaks things.
  //
  // if (!cstate.mayLeave) {
    //     throw new Error(`cannot leave instance [${componentIdx}]`);
    // }
    
    if (!task.mayBlock() && funcTypeIsAsync && !isAsync) {
      throw new Error("non async exports cannot synchronously call async functions");
    }
    
    // If there is an existing task, this should be part of a subtask
    const memory = getMemoryFn();
    const subtask = task.createSubtask({
      componentIdx,
      parentTask: task,
      fnName: importFn.fnName,
      isAsync,
      isManualAsync,
      callMetadata: {
        memoryIdx,
        memory,
        realloc: getReallocFn(),
        resultPtr: params[0],
        lowers: resultLowerFns,
      }
    });
    task.setReturnMemoryIdx(memoryIdx);
    task.setReturnMemory(getMemoryFn());
    
    subtask.onStart();
    
    // If dealing with a sync lowered sync function, we can directly return results
    //
    // TODO(breaking): remove once we get rid of manual async import specification,
    // as func types cannot be detected in that case only (and we don't need that w/ p3)
    if (!isManualAsync && !isAsync && !funcTypeIsAsync) {
      if (createdTask) { createdTask.enterSync(); }
      
      const res = importFn(...params);
      
      // TODO(breaking): remove once we get rid of manual async import specification,
      // as func types cannot be detected in that case only (and we don't need that w/ p3)
      if (!funcTypeIsAsync && !subtask.isReturned()) {
        throw new Error('post-execution subtasks must either be async or returned');
      }
      
      const syncRes = subtask.getResult();
      if (createdTask) { createdTask.resolve([syncRes]); }
      
      return syncRes;
    }
    
    // Sync-lowered async functions requires async behavior because the callee *can* block,
    // but this call must *act* synchronously and return immediately with the result
    // (i.e. not returning until the work is done)
    //
    // TODO(breaking): remove checking for manual async specification here, once we can go p3-only
    //
    if (!isManualAsync && !isAsync && funcTypeIsAsync) {
      const { promise, resolve } = new Promise();
      queueMicrotask(async () => {
        if (!subtask.isResolvedState()) {
          await task.suspendUntil({ readyFn: () => task.isResolvedState() });
        }
        resolve(subtask.getResult());
      });
      return promise;
    }
    
    // NOTE: at this point we know that we are working with an async lowered import
    
    const subtaskState = subtask.getStateNumber();
    if (subtaskState < 0 || subtaskState > 2**5) {
      throw new Error('invalid subtask state, out of valid range');
    }
    
    subtask.setOnProgressFn(() => {
      subtask.setPendingEvent(() => {
        if (subtask.isResolved()) { subtask.deliverResolve(); }
        const event = {
          code: ASYNC_EVENT_CODE.SUBTASK,
          payload0: subtask.waitableRep(),
          payload1: subtask.getStateNumber(),
        }
        return event;
      });
    });
    
    // This is a hack to maintain backwards compatibility with
    // manually-specified async imports, used in wasm exports that are
    // not actually async (but are specified as so).
    //
    // This is not normal p3 sync behavior but instead anticipating that
    // the caller that is doing manual async will be waiting for a promise that
    // resolves to the *actual* result.
    //
    // TODO(breaking): remove once manually specified async is removed
    //
    // There are a few cases:
    // 1. sync function with async types (e.g. `f: func() -> stream<u32>`)
    // 2. async function with async types (e.g. `f: async func() -> stream<u32>`)
    // 3. async function with sync types (e.g. `f: async func() -> list<u32>`)
    // 4. sync function with non-async types (e.g. `f: func() -> list<u32>`)
    //
    // This hack *only* applies to 4 -- the case where an async JS host function
    // is supplied to a Wasm export which does *not* need to do any async abi
    // lifting/lowering (async ABI did not exist when JSPI integratiton was
    // initially merged to enable asynchronously returning values from the host)
    //
    const requiresManualAsyncResult = !isAsync && !funcTypeIsAsync && isManualAsync;
    let manualAsyncResult;
    if (requiresManualAsyncResult) {
      manualAsyncResult = promiseWithResolvers();
    }
    
    queueMicrotask(async () => {
      try {
        _debugLog('[_lowerImportBackwardsCompat()] calling lowered import', { importFn, params });
        if (createdTask) { await createdTask.enter(); }
        
        const asyncRes = await importFn(...params);
        if (requiresManualAsyncResult) {
          manualAsyncResult.resolve(subtask.getResult());
        }
        
        if (createdTask) { createdTask.resolve([asyncRes]); }
        
        
      } catch (err) {
        _debugLog("[_lowerImportBackwardsCompat()] import fn error:", err);
        if (requiresManualAsyncResult) {
          manualAsyncResult.reject(err);
        }
        throw err;
      }
    });
    
    if (requiresManualAsyncResult) { return manualAsyncResult.promise; }
    
    return Number(subtask.waitableRep()) << 4 | subtaskState;
  }
  
  function _liftFlatU8(ctx) {
    _debugLog('[_liftFlatU8()] args', { ctx });
    let val;
    
    if (ctx.useDirectParams) {
      if (ctx.params.length === 0) { throw new Error('expected at least a single i32 argument'); }
      val = ctx.params[0];
      ctx.params = ctx.params.slice(1);
      return [val, ctx];
    }
    
    if (ctx.storageLen !== undefined && ctx.storageLen < ctx.storagePtr + 1) {
      throw new Error('not enough storage remaining for lift');
    }
    
    val = new DataView(ctx.memory.buffer).getUint8(ctx.storagePtr, true);
    
    ctx.storagePtr += 1;
    if (ctx.storageLen !== undefined) { ctx.storageLen -= 1; }
    
    return [val, ctx];
  }
  
  function _liftFlatU16(ctx) {
    _debugLog('[_liftFlatU16()] args', { ctx });
    let val;
    
    if (ctx.useDirectParams) {
      if (params.length === 0) { throw new Error('expected at least a single i32 argument'); }
      val = ctx.params[0];
      ctx.params = ctx.params.slice(1);
      return [val, ctx];
    }
    
    if (ctx.storageLen !== undefined && ctx.storageLen < ctx.storagePtr + 2) {
      throw new Error('not enough storage remaining for lift');
    }
    
    val = new DataView(ctx.memory.buffer).getUint16(ctx.storagePtr, true);
    
    ctx.storagePtr += 2;
    if (ctx.storageLen !== undefined) { ctx.storageLen -= 2; }
    
    const rem = ctx.storagePtr % 2;
    if (rem !== 0) { ctx.storagePtr += (2 - rem); }
    
    return [val, ctx];
  }
  
  function _liftFlatU32(ctx) {
    _debugLog('[_liftFlatU32()] args', { ctx });
    let val;
    
    if (ctx.useDirectParams) {
      if (ctx.params.length === 0) { throw new Error('expected at least a single i34 argument'); }
      val = ctx.params[0];
      ctx.params = ctx.params.slice(1);
      return [val, ctx];
    }
    
    if (ctx.storageLen !== undefined && ctx.storageLen < ctx.storagePtr + 4) {
      throw new Error('not enough storage remaining for lift');
    }
    val = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
    ctx.storagePtr += 4;
    if (ctx.storageLen !== undefined) { ctx.storageLen -= 4; }
    
    return [val, ctx];
  }
  
  function _liftFlatU64(ctx) {
    _debugLog('[_liftFlatU64()] args', { ctx });
    let val;
    
    if (ctx.useDirectParams) {
      if (ctx.params.length === 0) { throw new Error('expected at least one single i64 argument'); }
      if (typeof ctx.params[0] !== 'bigint') { throw new Error('expected bigint'); }
      val = ctx.params[0];
      ctx.params = ctx.params.slice(1);
      return [val, ctx];
    }
    
    if (ctx.storageLen !== undefined && ctx.storageLen < ctx.storagePtr + 8) {
      throw new Error('not enough storage remaining for lift');
    }
    val = new DataView(ctx.memory.buffer).getBigUint64(ctx.storagePtr, true);
    ctx.storagePtr += 8;
    if (ctx.storageLen !== undefined) { ctx.storageLen -= 8; }
    
    return [val, ctx];
  }
  
  function _liftFlatStringUTF8(ctx) {
    _debugLog('[_liftFlatStringUTF8()] args', { ctx });
    let val;
    
    if (ctx.useDirectParams) {
      if (ctx.params.length < 2) { throw new Error('expected at least two u32 arguments'); }
      const offset = ctx.params[0];
      if (!Number.isSafeInteger(offset)) {  throw new Error('invalid offset'); }
      const len = ctx.params[1];
      if (!Number.isSafeInteger(len)) {  throw new Error('invalid len'); }
      val = TEXT_DECODER_UTF8.decode(new DataView(ctx.memory.buffer, offset, len));
      ctx.params = ctx.params.slice(2);
      return [val, ctx];
    }
    
    const start = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
    const codeUnits = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr + 4, true);
    val = TEXT_DECODER_UTF8.decode(new Uint8Array(ctx.memory.buffer, start, codeUnits));
    
    ctx.storagePtr += 8;
    
    const rem = ctx.storagePtr % 4;
    if (rem !== 0) { ctx.storagePtr += (4 - rem); }
    
    return [val, ctx];
  }
  
  function _liftFlatVariant(casesAndLiftFns) {
    return function _liftFlatVariantInner(ctx) {
      _debugLog('[_liftFlatVariant()] args', { ctx });
      
      const origUseParams = ctx.useDirectParams;
      
      let caseIdx;
      let liftRes;
      const originalPtr = ctx.storagePtr;
      const numCases =  casesAndLiftFns.length;
      if (casesAndLiftFns.length < 256) {
        liftRes = _liftFlatU8(ctx);
      } else if (numCases >= 256 && numCases < 65536) {
        liftRes = _liftFlatU16(ctx);
      } else if (numCases >= 65536 && numCases < 4_294_967_296) {
        liftRes = _liftFlatU32(ctx);
      } else {
        throw new Error(`unsupported number of variant cases [${numCases}]`);
      }
      caseIdx = liftRes[0];
      ctx = liftRes[1];
      
      const [ tag, liftFn, size32, align32, payloadOffset32 ] = casesAndLiftFns[caseIdx];
      if (payloadOffset32 === undefined) { throw new Error('unexpectedly missing payload offset'); }
      
      if (originalPtr !== undefined) {
        ctx.storagePtr = originalPtr + payloadOffset32;
      }
      
      let val;
      if (liftFn === null) {
        val = { tag };
        // NOTE: here we need to move past the entire object in memory
        // despite moving to the payload which we now know is missing/unnecessary
        ctx.storagePtr = originalPtr + size32;
      } else {
        const [newVal, newCtx] = liftFn(ctx);
        val = { tag, val: newVal };
        ctx = newCtx;
        
        // NOTE: Padding can be left over after doing the lift if it was less than
        // space left for the payload normally.
        if (ctx.storagePtr < originalPtr + size32) {
          ctx.storagePtr = originalPtr + size32;
        }
      }
      
      const rem = ctx.storagePtr % align32;
      if (rem !== 0) { ctx.storagePtr += align32 - rem; }
      
      return [val, ctx];
    }
  }
  
  function _liftFlatList(meta) {
    const { elemLiftFn, align32, knownLen } = meta;
    
    const readValuesAndReset = (ctx, originalPtr, dataPtr, len) => {
      ctx.storagePtr = dataPtr;
      const val = [];
      for (var i = 0; i < len; i++) {
        const [res, nextCtx] = elemLiftFn(ctx);
        val.push(res);
        ctx = nextCtx;
        
        const rem = ctx.storagePtr % align32;
        if (rem !== 0) { ctx.storagePtr += align32 - rem; }
      }
      if (originalPtr !== null) { ctx.storagePtr = originalPtr; }
      return [val, ctx];
    };
    
    return function _liftFlatListInner(ctx) {
      _debugLog('[_liftFlatList()] args', { ctx });
      
      let liftResults;
      if (knownLen) { // list with known length
      
      if (ctx.useDirectParams) {
        // list with known length w/ direct params
        const dataPtr = ctx.params[0];
        ctx.params = ctx.params.slice(1);
        
        // TODO: is it possible for all values to come in from params?
        
        ctx.useDirectParams = false;
        const originalPtr = ctx.storagePtr;
        ctx.storageLen = 8;
        
        liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len);
        
        ctx.useDirectParams = true;
        ctx.storagePtr = null;
        ctx.storageLen = null;
        
      } else {
        liftResults = readValuesAndReset(ctx, null, ctx.storagePtr, knownLen);
      }
      
    } else { // unknown length list
    
    if (ctx.useDirectParams) {
      // unknown length list ptr w/ direct params
      const dataPtr = ctx.params[0];
      const len = ctx.params[1];
      ctx.params = ctx.params.slice(2);
      
      ctx.useDirectParams = false;
      const originalPtr = ctx.storagePtr;
      ctx.storageLen = 8;
      
      liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len);
      
      ctx.useDirectParams = true;
      ctx.storagePtr = null;
      ctx.storageLen = null;
      
    } else {
      // unknown length list ptr w/ in-memory params
      const dataPtrLiftRes = _liftFlatU32(ctx);
      const dataPtr = dataPtrLiftRes[0];
      ctx = dataPtrLiftRes[1];
      
      const lenLiftRes = _liftFlatU32(ctx);
      const len = lenLiftRes[0];
      ctx = lenLiftRes[1];
      
      const originalPtr = ctx.storagePtr;
      ctx.storagePtr = dataPtr;
      
      liftResults = readValuesAndReset(ctx, originalPtr, dataPtr, len);
    }
  }
  
  return liftResults;
}
}

function _liftFlatTuple(elemLiftFns) {
  return function _liftFlatTupleInner(ctx) {
    _debugLog('[_liftFlatTuple()] args', { ctx });
    
    const val = [];
    for (const [ liftFn, size32, align32 ]  of elemLiftFns) {
      const [newValue, newCtx] = liftFn(ctx);
      val.push(newValue);
      ctx = newCtx;
      
      const rem = ctx.storagePtr % align32;
      if (rem !== 0) { ctx.storagePtr += align32 - rem; }
    }
    
    return [val, ctx];
  }
}

function _liftFlatOption(casesAndLiftFns) {
  return function _liftFlatOptionInner(ctx) {
    _debugLog('[_liftFlatOption()] args', { ctx });
    return _liftFlatVariant(casesAndLiftFns)(ctx);
  }
}

function _liftFlatResult(casesAndLiftFns) {
  return function _liftFlatResultInner(ctx) {
    _debugLog('[_liftFlatResult()] args', { ctx });
    return _liftFlatVariant(casesAndLiftFns)(ctx);
  }
}

function _liftFlatOwn(meta) {
  const { className, createResourceFn, componentIdx } = meta;
  
  return function _liftFlatOwnInner(ctx) {
    _debugLog('[_liftFlatOwn()] args', { ctx, className });
    
    if (ctx.componentIdx !== componentIdx) {
      throw new Error('invalid component for resource lift');
    }
    
    const [handle, newCtx] = _liftFlatU32(ctx);
    const resource = createResourceFn(handle);
    
    return [resource, newCtx];
  }
}

function _liftFlatBorrow(componentTableIdx, size, memory, vals, storagePtr, storageLen) {
  _debugLog('[_liftFlatBorrow()] args', { size, memory, vals, storagePtr, storageLen });
  throw new Error('flat lift for borrowed resources is not supported!');
}

function _lowerFlatU8(ctx) {
  _debugLog('[_lowerFlatU8()] args', ctx);
  const { memory, realloc, vals, storagePtr, storageLen } = ctx;
  if (vals.length !== 1) {
    throw new Error('unexpected number (' + vals.length + ') of core vals (expected 1)');
  }
  if (vals[0] > 255 || vals[0] < 0) { throw new Error('invalid value for core value representing u8'); }
  if (!memory) { throw new Error("missing memory for lower"); }
  new DataView(memory.buffer).setUint32(storagePtr, vals[0], true);
  
  // TODO: ALIGNMENT IS WRONG?
  
  return 1;
}

function _lowerFlatU16(memory, vals, storagePtr, storageLen) {
  _debugLog('[_lowerFlatU16()] args', { memory, vals, storagePtr, storageLen });
  if (vals.length !== 1) {
    throw new Error('unexpected number (' + vals.length + ') of core vals (expected 1)');
  }
  if (vals[0] > 65_535 || vals[0] < 0) { throw new Error('invalid value for core value representing u16'); }
  new DataView(memory.buffer).setUint16(storagePtr, vals[0], true);
  return 2;
}

function _lowerFlatU32(ctx) {
  _debugLog('[_lowerFlatU32()] args', { ctx });
  const { memory, realloc, vals, storagePtr, storageLen } = ctx;
  if (vals.length !== 1) { throw new Error('expected single value to lower, got (' + vals.length + ')'); }
  if (vals[0] > 4_294_967_295 || vals[0] < 0) { throw new Error('invalid value for core value representing u32'); }
  
  // TODO(refactor): fail loudly on misaligned flat lowers?
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) { ctx.storagePtr += (4 - rem); }
  
  new DataView(memory.buffer).setUint32(storagePtr, vals[0], true);
  
  return 4;
}

function _lowerFlatU64(memory, vals, storagePtr, storageLen) {
  _debugLog('[_lowerFlatU64()] args', { memory, vals, storagePtr, storageLen });
  if (vals.length !== 1) { throw new Error('unexpected number of core vals'); }
  if (vals[0] > 18_446_744_073_709_551_615n || vals[0] < 0n) { throw new Error('invalid value for core value representing u64'); }
  new DataView(memory.buffer).setBigUint64(storagePtr, vals[0], true);
  return 8;
}

function _lowerFlatStringUTF8(ctx) {
  _debugLog('[_lowerFlatStringUTF8()] args', ctx);
  
  const { memory, realloc, vals, storagePtr, storageLen } = ctx;
  
  const s = vals[0];
  const { ptr, len, codepoints } = _utf8AllocateAndEncode(vals[0], realloc, memory);
  
  const view = new DataView(memory.buffer);
  view.setUint32(storagePtr, ptr, true);
  view.setUint32(storagePtr + 4, codepoints, true);
  
  return len;
}

function _lowerFlatRecord(fieldMetas) {
  return (size, memory, vals, storagePtr, storageLen) => {
    const params = [...arguments].slice(5);
    _debugLog('[_lowerFlatRecord()] args', {
      size,
      memory,
      vals,
      storagePtr,
      storageLen,
      params,
      fieldMetas
    });
    
    const [start] = vals;
    if (storageLen !== undefined && size !== undefined && size > storageLen) {
      throw new Error('not enough storage remaining for record flat lower');
    }
    const data = new Uint8Array(memory.buffer, start, size);
    new Uint8Array(memory.buffer, storagePtr, size).set(data);
    return data.byteLength;
  }
}

function _lowerFlatVariant(lowerMetas) {
  return function _lowerFlatVariantInner(ctx) {
    _debugLog('[_lowerFlatVariant()] args', ctx);
    
    const { memory, realloc, vals, storageLen, componentIdx } = ctx;
    let storagePtr = ctx.storagePtr;
    
    const { tag, val } = vals[0];
    const disc = lowerMetas.findIndex(m => m[0] === tag);
    if (disc === -1) {
      throw new Error(`invalid variant tag/discriminant [${tag}] (valid tags: ${variantMetas.map(m => m[0])})`);
    }
    
    const [ _tag, lowerFn, size32, align32, payloadOffset32 ] = lowerMetas[disc];
    
    const originalPtr = ctx.resultPtr;
    ctx.vals = [disc];
    let discLowerRes;
    if (lowerMetas.length < 256) {
      discLowerRes = _lowerFlatU8(ctx);
    } else if (lowerMetas.length >= 256 && lowerMetas.length < 65536) {
      discLowerRes = _lowerFlatU16(ctx);
    } else if (lowerMetas.length >= 65536 && lowerMetas.length < 4_294_967_296) {
      discLowerRes = _lowerFlatU32(ctx);
    } else {
      throw new Error('unsupported number of cases [' + lowerMetas.legnth + ']');
    }
    
    ctx.resultPtr = originalPtr + payloadOffset32;
    
    let payloadBytesWritten = 0;
    if (lowerFn) {
      lowerFn({
        memory,
        realloc,
        vals: [val],
        storagePtr,
        storageLen,
        componentIdx,
      });
    }
    let bytesWritten = payloadOffset + payloadBytesWritten;
    
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      const pad = align32 - rem;
      ctx.storagePtr += pad;
      bytesWritten += pad;
    }
    
    return bytesWritten;
  }
}

function _lowerFlatList(args) {
  const { elemLowerFn } = args;
  if (!elemLowerFn) { throw new TypeError("missing/invalid element lower fn for list"); }
  
  return function _lowerFlatListInner(ctx) {
    _debugLog('[_lowerFlatList()] args', { ctx });
    
    if (ctx.params.length < 2) { throw new Error('insufficient params left to lower list'); }
    const storagePtr = ctx.params[0];
    const elemCount = ctx.params[1];
    ctx.params = ctx.params.slice(2);
    
    if (ctx.useDirectParams) {
      const list = ctx.vals[0];
      if (!list) { throw new Error("missing direct param value"); }
      
      const elemLowerCtx = { storagePtr, memory: ctx.memory };
      for (let idx = 0; idx < list.length; idx++) {
        elemLowerCtx.vals = list.slice(idx, idx+1);
        elemLowerCtx.storagePtr += elemLowerFn(elemLowerCtx);
      }
      
      const bytesLowered = elemLowerCtx.storagePtr - ctx.storagePtr;
      ctx.storagePtr = elemLowerCtx.storagePtr;
      return bytesLowered;
    }
    
    if (ctx.vals.length !== 2) {
      throw new Error('indirect parameter loading must have a pointer and length as vals');
    }
    let [valStartPtr, valLen] = ctx.vals;
    const totalSizeBytes = valLen * size;
    if (ctx.storageLen !== undefined && totalSizeBytes > ctx.storageLen) {
      throw new Error('not enough storage remaining for list flat lower');
    }
    
    const data = new Uint8Array(memory.buffer, valStartPtr, totalSizeBytes);
    new Uint8Array(memory.buffer, storagePtr, totalSizeBytes).set(data);
    
    return totalSizeBytes;
  }
}

function _lowerFlatTuple(size, memory, vals, storagePtr, storageLen) {
  _debugLog('[_lowerFlatTuple()] args', { size, memory, vals, storagePtr, storageLen });
  let [start, len] = vals;
  if (storageLen !== undefined && len > storageLen) {
    throw new Error('not enough storage remaining for tuple flat lower');
  }
  const data = new Uint8Array(memory.buffer, start, len);
  new Uint8Array(memory.buffer, storagePtr, len).set(data);
  return data.byteLength;
}

function _lowerFlatOption(lowerMetas) {
  function _lowerFlatOptionInner(ctx) {
    _debugLog('[_lowerFlatOption()] args', { ctx });
    return _lowerFlatVariant(lowerMetas)(ctx);
  }
}

function _lowerFlatResult(lowerMetas) {
  return function _lowerFlatResultInner(ctx) {
    _debugLog('[_lowerFlatResult()] args', { lowerMetas });
    return _lowerFlatVariant(lowerMetas)(ctx);
  };
}

function _lowerFlatOwn(size, memory, vals, storagePtr, storageLen) {
  _debugLog('[_lowerFlatOwn()] args', { size, memory, vals, storagePtr, storageLen });
  throw new Error('flat lower for owned resources not yet implemented!');
}

const STREAMS = new RepTable({ target: 'global stream map' });
const ASYNC_STATE = new Map();

function getOrCreateAsyncState(componentIdx, init) {
  if (!ASYNC_STATE.has(componentIdx)) {
    const newState = new ComponentAsyncState({ componentIdx });
    ASYNC_STATE.set(componentIdx, newState);
  }
  return ASYNC_STATE.get(componentIdx);
}

class ComponentAsyncState {
  static EVENT_HANDLER_EVENTS = [ 'backpressure-change' ];
  
  #componentIdx;
  #callingAsyncImport = false;
  #syncImportWait = promiseWithResolvers();
  #locked = false;
  #parkedTasks = new Map();
  #suspendedTasksByTaskID = new Map();
  #suspendedTaskIDs = [];
  #errored = null;
  
  #backpressure = 0;
  #backpressureWaiters = 0n;
  
  #handlerMap = new Map();
  #nextHandlerID = 0n;
  
  #tickLoop = null;
  #tickLoopInterval = null;
  
  #onExclusiveReleaseHandlers = [];
  
  mayLeave = true;
  
  handles;
  subtasks;
  
  constructor(args) {
    this.#componentIdx = args.componentIdx;
    this.handles = new RepTable({ target: `component [${this.#componentIdx}] handles (waitable objects)` });
    this.subtasks = new RepTable({ target: `component [${this.#componentIdx}] subtasks` });
  };
  
  componentIdx() { return this.#componentIdx; }
  
  errored() { return this.#errored !== null; }
  setErrored(err) {
    _debugLog('[ComponentAsyncState#setErrored()] component errored', { err, componentIdx: this.#componentIdx });
    if (this.#errored) { return; }
    if (!err) {
      err = new Error('error elswehere (see other component instance error)')
      err.componentIdx = this.#componentIdx;
    }
    this.#errored = err;
  }
  
  callingSyncImport(val) {
    if (val === undefined) { return this.#callingAsyncImport; }
    if (typeof val !== 'boolean') { throw new TypeError('invalid setting for async import'); }
    const prev = this.#callingAsyncImport;
    this.#callingAsyncImport = val;
    if (prev === true && this.#callingAsyncImport === false) {
      this.#notifySyncImportEnd();
    }
  }
  
  #notifySyncImportEnd() {
    const existing = this.#syncImportWait;
    this.#syncImportWait = promiseWithResolvers();
    existing.resolve();
  }
  
  async waitForSyncImportCallEnd() {
    await this.#syncImportWait.promise;
  }
  
  setBackpressure(v) {
    this.#backpressure = v;
    return this.#backpressure
  }
  getBackpressure() { return this.#backpressure; }
  
  incrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2**16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = this.getBackpressure() + 1;
    if (newValue >= 2**16) {
      throw new Error(`invalid new backpressure value [${newValue}], overflow`);
    }
    return this.setBackpressure(newValue);
  }
  
  decrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2**16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = Math.max(0, current - 1);
    if (newValue < 0) {
      throw new Error(`invalid new backpressure value [${newValue}], underflow`);
    }
    return this.setBackpressure(newValue);
  }
  hasBackpressure() { return this.#backpressure > 0; }
  
  waitForBackpressure() {
    let backpressureCleared = false;
    const cstate = this;
    cstate.addBackpressureWaiter();
    const handlerID = this.registerHandler({
      event: 'backpressure-change',
      fn: (bp) => {
        if (bp === 0) {
          cstate.removeHandler(handlerID);
          backpressureCleared = true;
        }
      }
    });
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (backpressureCleared) { return; }
        clearInterval(interval);
        cstate.removeBackpressureWaiter();
        resolve(null);
      }, 0);
    });
  }
  
  registerHandler(args) {
    const { event, fn } = args;
    if (!event) { throw new Error("missing handler event"); }
    if (!fn) { throw new Error("missing handler fn"); }
    
    if (!ComponentAsyncState.EVENT_HANDLER_EVENTS.includes(event)) {
      throw new Error(`unrecognized event handler [${event}]`);
    }
    
    const handlerID = this.#nextHandlerID++;
    let handlers = this.#handlerMap.get(event);
    if (!handlers) {
      handlers = [];
      this.#handlerMap.set(event, handlers)
    }
    
    handlers.push({ id: handlerID, fn, event });
    return handlerID;
  }
  
  removeHandler(args) {
    const { event, handlerID } = args;
    const registeredHandlers = this.#handlerMap.get(event);
    if (!registeredHandlers) { return; }
    const found = registeredHandlers.find(h => h.id === handlerID);
    if (!found) { return; }
    this.#handlerMap.set(event, this.#handlerMap.get(event).filter(h => h.id !== handlerID));
  }
  
  getBackpressureWaiters() { return this.#backpressureWaiters; }
  addBackpressureWaiter() { this.#backpressureWaiters++; }
  removeBackpressureWaiter() {
    this.#backpressureWaiters--;
    if (this.#backpressureWaiters < 0) {
      throw new Error("unexepctedly negative number of backpressure waiters");
    }
  }
  
  isExclusivelyLocked() { return this.#locked === true; }
  setLocked(locked) {
    this.#locked = locked;
  }
  
  // TODO(fix): we might want to check for pre-locked status here, we should be deterministically
  // going from locked -> unlocked and vice versa
  exclusiveLock() {
    _debugLog('[ComponentAsyncState#exclusiveLock()]', {
      locked: this.#locked,
      componentIdx: this.#componentIdx,
    });
    this.setLocked(true);
  }
  
  exclusiveRelease() {
    _debugLog('[ComponentAsyncState#exclusiveRelease()] args', {
      locked: this.#locked,
      componentIdx: this.#componentIdx,
    });
    this.setLocked(false);
    
    this.#onExclusiveReleaseHandlers = this.#onExclusiveReleaseHandlers.filter(v => !!v);
    for (const [idx, f] of this.#onExclusiveReleaseHandlers.entries()) {
      try {
        this.#onExclusiveReleaseHandlers[idx] = null;
        f();
      } catch (err) {
        _debugLog("error while executing handler for next exclusive release", err);
        throw err;
      }
    }
  }
  
  onNextExclusiveRelease(fn) {
    _debugLog('[ComponentAsyncState#()onNextExclusiveRelease] registering');
    this.#onExclusiveReleaseHandlers.push(fn);
  }
  
  #getSuspendedTaskMeta(taskID) {
    return this.#suspendedTasksByTaskID.get(taskID);
  }
  
  #removeSuspendedTaskMeta(taskID) {
    _debugLog('[ComponentAsyncState#removeSuspendedTaskMeta()] removing suspended task', { taskID });
    const idx = this.#suspendedTaskIDs.findIndex(t => t === taskID);
    const meta = this.#suspendedTasksByTaskID.get(taskID);
    this.#suspendedTaskIDs[idx] = null;
    this.#suspendedTasksByTaskID.delete(taskID);
    return meta;
  }
  
  #addSuspendedTaskMeta(meta) {
    if (!meta) { throw new Error('missing task meta'); }
    const taskID = meta.taskID;
    this.#suspendedTasksByTaskID.set(taskID, meta);
    this.#suspendedTaskIDs.push(taskID);
    if (this.#suspendedTasksByTaskID.size < this.#suspendedTaskIDs.length - 10) {
      this.#suspendedTaskIDs = this.#suspendedTaskIDs.filter(t => t !== null);
    }
  }
  
  // TODO(threads): readyFn is normally on the thread
  suspendTask(args) {
    const { task, readyFn } = args;
    const taskID = task.id();
    _debugLog('[ComponentAsyncState#suspendTask()]', {
      taskID,
      componentIdx: this.#componentIdx,
      taskEntryFnName: task.entryFnName(),
      subtask: task.getParentSubtask(),
    });
    
    if (this.#getSuspendedTaskMeta(taskID)) {
      throw new Error(`task [${taskID}] already suspended`);
    }
    
    const { promise, resolve, reject } = promiseWithResolvers();
    this.#addSuspendedTaskMeta({
      task,
      taskID,
      readyFn,
      resume: () => {
        _debugLog('[ComponentAsyncState#suspendTask()] resuming suspended task', { taskID });
        // TODO(threads): it's thread cancellation we should be checking for below, not task
        resolve(!task.isCancelled());
      },
    });
    
    this.runTickLoop();
    
    return promise;
  }
  
  resumeTaskByID(taskID) {
    const meta = this.#removeSuspendedTaskMeta(taskID);
    if (!meta) { return; }
    if (meta.taskID !== taskID) { throw new Error('task ID does not match'); }
    meta.resume();
  }
  
  async runTickLoop() {
    if (this.#tickLoop !== null) { return; }
    this.#tickLoop = 1;
    setTimeout(async () => {
      let done = this.tick();
      while (!done) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        done = this.tick();
      }
      this.#tickLoop = null;
    }, 10);
  }
  
  tick() {
    // _debugLog('[ComponentAsyncState#tick()]', { suspendedTaskIDs: this.#suspendedTaskIDs });
    
    const resumableTasks = this.#suspendedTaskIDs.filter(t => t !== null);
    for (const taskID of resumableTasks) {
      const meta = this.#suspendedTasksByTaskID.get(taskID);
      if (!meta || !meta.readyFn) {
        throw new Error(`missing/invalid task despite ID [${taskID}] being present`);
      }
      
      // If the task failed via any means, allow the task to resume because
      // it's been cancelled -- the callback should immediately exit as well
      if (meta.task.isRejected()) {
        _debugLog('[ComponentAsyncState#suspendTask()] detected task rejection, leaving early', { meta });
        this.resumeTaskByID(taskID);
        return;
      }
      
      const isReady = meta.readyFn();
      if (!isReady) { continue; }
      
      this.resumeTaskByID(taskID);
    }
    
    return this.#suspendedTaskIDs.filter(t => t !== null).length === 0;
  }
  
  addStreamEndToTable(args) {
    _debugLog('[ComponentAsyncState#addStreamEnd()] args', args);
    const { tableIdx, streamEnd } = args;
    if (typeof streamEnd === 'number') { throw new Error("INSERTING BAD STREAMEND"); }
    
    let { table, componentIdx } = STREAM_TABLES[tableIdx];
    if (componentIdx === undefined || !table) {
      throw new Error(`invalid global stream table state for table [${tableIdx}]`);
    }
    
    const handle = table.insert(streamEnd);
    streamEnd.setHandle(handle);
    streamEnd.setStreamTableIdx(tableIdx);
    
    const cstate = getOrCreateAsyncState(componentIdx);
    const waitableIdx = cstate.handles.insert(streamEnd);
    streamEnd.setWaitableIdx(waitableIdx);
    
    _debugLog('[ComponentAsyncState#addStreamEnd()] added stream end', {
      tableIdx,
      table,
      handle,
      streamEnd,
      destComponentIdx: componentIdx,
    });
    
    return { handle, waitableIdx };
  }
  
  createWaitable(args) {
    return new Waitable({ target: args?.target, });
  }
  
  createStream(args) {
    _debugLog('[ComponentAsyncState#createStream()] args', args);
    const { tableIdx, elemMeta } = args;
    if (tableIdx === undefined) { throw new Error("missing table idx while adding stream"); }
    if (elemMeta === undefined) { throw new Error("missing element metadata while adding stream"); }
    
    const { table: localStreamTable, componentIdx } = STREAM_TABLES[tableIdx];
    if (!localStreamTable) {
      throw new Error(`missing global stream table lookup for table [${tableIdx}] while creating stream`);
    }
    if (componentIdx !== this.#componentIdx) {
      throw new Error('component idx mismatch while creating stream');
    }
    
    const readWaitable = this.createWaitable();
    const writeWaitable = this.createWaitable();
    
    const stream = new InternalStream({
      tableIdx,
      componentIdx: this.#componentIdx,
      elemMeta,
      readWaitable,
      writeWaitable,
    });
    stream.setGlobalStreamMapRep(STREAMS.insert(stream));
    
    const writeEnd = stream.writeEnd();
    writeEnd.setWaitableIdx(this.handles.insert(writeEnd));
    writeEnd.setHandle(localStreamTable.insert(writeEnd));
    if (writeEnd.streamTableIdx() !== tableIdx) { throw new Error("unexpectedly mismatched stream table"); }
    
    const writeEndWaitableIdx = writeEnd.waitableIdx();
    const writeEndHandle = writeEnd.handle();
    writeWaitable.setTarget(`waitable for stream write end (waitable [${writeEndWaitableIdx}])`);
    writeEnd.setTarget(`stream write end (waitable [${writeEndWaitableIdx}])`);
    
    const readEnd = stream.readEnd();
    readEnd.setWaitableIdx(this.handles.insert(readEnd));
    readEnd.setHandle(localStreamTable.insert(readEnd));
    if (readEnd.streamTableIdx() !== tableIdx) { throw new Error("unexpectedly mismatched stream table"); }
    
    const readEndWaitableIdx = readEnd.waitableIdx();
    const readEndHandle = readEnd.handle();
    readWaitable.setTarget(`waitable for read end (waitable [${readEndWaitableIdx}])`);
    readEnd.setTarget(`stream read end (waitable [${readEndWaitableIdx}])`);
    
    return {
      writeEndWaitableIdx,
      writeEndHandle,
      readEndWaitableIdx,
      readEndHandle,
    };
  }
  
  getStreamEnd(args) {
    _debugLog('[ComponentAsyncState#getStreamEnd()] args', args);
    const { tableIdx, streamEndHandle, streamEndWaitableIdx } = args;
    if (tableIdx === undefined) { throw new Error('missing table idx while getting stream end'); }
    
    const { table, componentIdx } = STREAM_TABLES[tableIdx];
    const cstate = getOrCreateAsyncState(componentIdx);
    
    let streamEnd;
    if (streamEndWaitableIdx !== undefined) {
      streamEnd = cstate.handles.get(streamEndWaitableIdx);
    } else if (streamEndHandle !== undefined) {
      if (!table) { throw new Error(`missing/invalid table [${tableIdx}] while getting stream end`); }
      streamEnd = table.get(streamEndHandle);
    } else {
      throw new TypeError("must specify either waitable idx or handle to retrieve stream");
    }
    
    if (!streamEnd) {
      throw new Error(`missing stream end (tableIdx [${tableIdx}], handle [${streamEndHandle}], waitableIdx [${streamEndWaitableIdx}])`);
    }
    if (tableIdx && streamEnd.streamTableIdx() !== tableIdx) {
      throw new Error(`stream end table idx [${streamEnd.streamTableIdx()}] does not match [${tableIdx}]`);
    }
    
    return streamEnd;
  }
  
  deleteStreamEnd(args) {
    _debugLog('[ComponentAsyncState#deleteStreamEnd()] args', args);
    const { tableIdx, streamEndWaitableIdx } = args;
    if (tableIdx === undefined) { throw new Error("missing table idx while removing stream end"); }
    if (streamEndWaitableIdx === undefined) { throw new Error("missing stream idx while removing stream end"); }
    
    const { table, componentIdx } = STREAM_TABLES[tableIdx];
    const cstate = getOrCreateAsyncState(componentIdx);
    
    const streamEnd = cstate.handles.get(streamEndWaitableIdx);
    if (!streamEnd) {
      throw new Error(`missing stream end [${streamEndWaitableIdx}] in component handles while deleting stream`);
    }
    if (streamEnd.streamTableIdx() !== tableIdx) {
      throw new Error(`stream end table idx [${streamEnd.streamTableIdx()}] does not match [${tableIdx}]`);
    }
    
    let removed = cstate.handles.remove(streamEnd.waitableIdx());
    if (!removed) {
      throw new Error(`failed to remove stream end [${streamEndWaitableIdx}] waitable obj in component [${componentIdx}]`);
    }
    
    removed = table.remove(streamEnd.handle());
    if (!removed) {
      throw new Error(`failed to remove stream end with handle [${streamEnd.handle()}] from stream table [${tableIdx}] in component [${componentIdx}]`);
    }
    
    return streamEnd;
  }
  
  removeStreamEndFromTable(args) {
    _debugLog('[ComponentAsyncState#removeStreamEndFromTable()] args', args);
    
    const { tableIdx, streamWaitableIdx } = args;
    if (tableIdx === undefined) { throw new Error("missing table idx while removing stream end"); }
    if (streamWaitableIdx === undefined) {
      throw new Error("missing stream end waitable idx while removing stream end");
    }
    
    const { table, componentIdx } = STREAM_TABLES[tableIdx];
    if (!table) { throw new Error(`missing/invalid table [${tableIdx}] while removing stream end`); }
    
    const cstate = getOrCreateAsyncState(componentIdx);
    
    const streamEnd = cstate.handles.get(streamWaitableIdx);
    if (!streamEnd) {
      throw new Error(`missing stream end (handle [${streamWaitableIdx}], table [${tableIdx}])`);
    }
    const handle = streamEnd.handle();
    
    let removed = cstate.handles.remove(streamWaitableIdx);
    if (!removed) {
      throw new Error(`failed to remove streamEnd from handles (waitable idx [${streamWaitableIdx}]), component [${componentIdx}])`);
    }
    
    removed = table.remove(handle);
    if (!removed) {
      throw new Error(`failed to remove streamEnd from table (handle [${handle}]), table [${tableIdx}], component [${componentIdx}])`);
    }
    
    return streamEnd;
  }
}

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const handleTables = [];

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;


let exports0;

const _trampoline0 = function() {
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-u64"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getRandomU64',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getRandomU64()
  })
  ;
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-u64"][Instruction::Return]', {
    funcName: 'get-random-u64',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([toUint64(ret)]);
  task.exit();
  return toUint64(ret);
}
_trampoline0.fnName = 'wasi:random/random@0.2.12#getRandomU64';
const handleTable4 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[4] = handleTable4;

const _trampoline1 = function() {
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]fields"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'new Fields',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => new Fields()
  })
  ;
  if (!(ret instanceof Fields)) {
    throw new TypeError('Resource error: Not a valid "Fields" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt4;
    captureTable4.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable4, rep);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]fields"][Instruction::Return]', {
    funcName: '[constructor]fields',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline1.fnName = 'wasi:http/types@0.2.12#new Fields';
const handleTable5 = [T_FLAG, 0];
const captureTable5= new Map();
let captureCnt5 = 0;
handleTables[5] = handleTable5;

const _trampoline3 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Fields.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  else {
    captureTable4.delete(rep2);
  }
  rscTableRemove(handleTable4, handle1);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]outgoing-request"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'new OutgoingRequest',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => new OutgoingRequest(rsc0)
  })
  ;
  if (!(ret instanceof OutgoingRequest)) {
    throw new TypeError('Resource error: Not a valid "OutgoingRequest" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt5;
    captureTable5.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable5, rep);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]outgoing-request"][Instruction::Return]', {
    funcName: '[constructor]outgoing-request',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}
_trampoline3.fnName = 'wasi:http/types@0.2.12#new OutgoingRequest';
const handleTable7 = [T_FLAG, 0];
const captureTable7= new Map();
let captureCnt7 = 0;
handleTables[7] = handleTable7;

const _trampoline6 = function() {
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]request-options"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'new RequestOptions',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => new RequestOptions()
  })
  ;
  if (!(ret instanceof RequestOptions)) {
    throw new TypeError('Resource error: Not a valid "RequestOptions" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt7;
    captureTable7.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable7, rep);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]request-options"][Instruction::Return]', {
    funcName: '[constructor]request-options',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline6.fnName = 'wasi:http/types@0.2.12#new RequestOptions';

const _trampoline7 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable7.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(RequestOptions.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  let variant3;
  switch (arg1) {
    case 0: {
      variant3 = undefined;
      break;
    }
    case 1: {
      variant3 = BigInt.asUintN(64, BigInt(arg2));
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]request-options.set-connect-timeout"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'setConnectTimeout',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.setConnectTimeout(variant3)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant4 = ret;
let variant4_0;
switch (variant4.tag) {
  case 'ok': {
    const e = variant4.val;
    variant4_0 = 0;
    
    break;
  }
  case 'err': {
    const e = variant4.val;
    variant4_0 = 1;
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]request-options.set-connect-timeout"][Instruction::Return]', {
  funcName: '[method]request-options.set-connect-timeout',
  paramCount: 1,
  async: false,
  postReturn: false
});
task.resolve([variant4_0]);
task.exit();
return variant4_0;
}
_trampoline7.fnName = 'wasi:http/types@0.2.12#setConnectTimeout';
const handleTable8 = [T_FLAG, 0];
const captureTable8= new Map();
let captureCnt8 = 0;
handleTables[8] = handleTable8;
const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

const _trampoline10 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable8.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(FutureIncomingResponse.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]future-incoming-response.subscribe"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'subscribe',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.subscribe()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt0;
    captureTable0.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable0, rep);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]future-incoming-response.subscribe"][Instruction::Return]', {
    funcName: '[method]future-incoming-response.subscribe',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}
_trampoline10.fnName = 'wasi:http/types@0.2.12#subscribe';

const _trampoline11 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Pollable.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/poll@0.2.12", function="[method]pollable.block"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'block',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret;_withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.block()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  _debugLog('[iface="wasi:io/poll@0.2.12", function="[method]pollable.block"][Instruction::Return]', {
    funcName: '[method]pollable.block',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline11.fnName = 'wasi:io/poll@0.2.12#block';
const handleTable9 = [T_FLAG, 0];
const captureTable9= new Map();
let captureCnt9 = 0;
handleTables[9] = handleTable9;

const _trampoline14 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingResponse.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.status"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'status',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.status()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.status"][Instruction::Return]', {
    funcName: '[method]incoming-response.status',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([toUint16(ret)]);
  task.exit();
  return toUint16(ret);
}
_trampoline14.fnName = 'wasi:http/types@0.2.12#status';

const _trampoline15 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingResponse.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.headers"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'headers',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.headers()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Fields)) {
    throw new TypeError('Resource error: Not a valid "Headers" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt4;
    captureTable4.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable4, rep);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.headers"][Instruction::Return]', {
    funcName: '[method]incoming-response.headers',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}
_trampoline15.fnName = 'wasi:http/types@0.2.12#headers';

const _trampoline22 = function(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'exit',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret;_withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => exit(variant0)
  })
  ;
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"][Instruction::Return]', {
    funcName: 'exit',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline22.fnName = 'wasi:cli/exit@0.2.12#exit';
const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;

const _trampoline23 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.subscribe"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'subscribe',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.subscribe()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt0;
    captureTable0.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable0, rep);
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.subscribe"][Instruction::Return]', {
    funcName: '[method]input-stream.subscribe',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}
_trampoline23.fnName = 'wasi:io/streams@0.2.12#subscribe';
const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;

const _trampoline24 = function(arg0) {
  var handle1 = arg0;
  
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.subscribe"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'subscribe',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.subscribe()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt0;
    captureTable0.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable0, rep);
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.subscribe"][Instruction::Return]', {
    funcName: '[method]output-stream.subscribe',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}
_trampoline24.fnName = 'wasi:io/streams@0.2.12#subscribe';

const _trampoline25 = function() {
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getStdin',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStdin()
  })
  ;
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"][Instruction::Return]', {
    funcName: 'get-stdin',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline25.fnName = 'wasi:cli/stdin@0.2.12#getStdin';

const _trampoline26 = function() {
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getStdout',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStdout()
  })
  ;
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"][Instruction::Return]', {
    funcName: 'get-stdout',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline26.fnName = 'wasi:cli/stdout@0.2.12#getStdout';

const _trampoline27 = function() {
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getStderr',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getStderr()
  })
  ;
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"][Instruction::Return]', {
    funcName: 'get-stderr',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline27.fnName = 'wasi:cli/stderr@0.2.12#getStderr';

const _trampoline28 = function() {
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.12", function="now"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'now',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => now()
  })
  ;
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.12", function="now"][Instruction::Return]', {
    funcName: 'now',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([toUint64(ret)]);
  task.exit();
  return toUint64(ret);
}
_trampoline28.fnName = 'wasi:clocks/monotonic-clock@0.2.12#now';

const _trampoline29 = function(arg0) {
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.12", function="subscribe-duration"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'subscribeDuration',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => subscribeDuration(BigInt.asUintN(64, BigInt(arg0)))
  })
  ;
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt0;
    captureTable0.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable0, rep);
  }
  _debugLog('[iface="wasi:clocks/monotonic-clock@0.2.12", function="subscribe-duration"][Instruction::Return]', {
    funcName: 'subscribe-duration',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline29.fnName = 'wasi:clocks/monotonic-clock@0.2.12#subscribeDuration';
let exports1;
let memory0;
let realloc0;
let realloc0Async;

const _trampoline30 = function(arg0, arg1, arg2) {
  var len2 = arg1;
  var base2 = arg0;
  var result2 = [];
  for (let i = 0; i < len2; i++) {
    const base = base2 + i * 16;
    var ptr0 = dataView(memory0).getUint32(base + 0, true);
    var len0 = dataView(memory0).getUint32(base + 4, true);
    var result0 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr0, len0));
    var ptr1 = dataView(memory0).getUint32(base + 8, true);
    var len1 = dataView(memory0).getUint32(base + 12, true);
    var result1 = new Uint8Array(memory0.buffer.slice(ptr1, ptr1 + len1 * 1));
    result2.push([result0, result1]);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]fields.from-list"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'Fields.fromList',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => Fields.fromList(result2)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

var variant5 = ret;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg2 + 0, 0, true);
    if (!(e instanceof Fields)) {
      throw new TypeError('Resource error: Not a valid "Fields" resource.');
    }
    var handle3 = e[symbolRscHandle];
    if (!handle3) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle3 = rscTableCreateOwn(handleTable4, rep);
    }
    dataView(memory0).setInt32(arg2 + 4, handle3, true);
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg2 + 0, 1, true);
    var variant4 = e;
    switch (variant4.tag) {
      case 'invalid-syntax': {
        dataView(memory0).setInt8(arg2 + 4, 0, true);
        break;
      }
      case 'forbidden': {
        dataView(memory0).setInt8(arg2 + 4, 1, true);
        break;
      }
      case 'immutable': {
        dataView(memory0).setInt8(arg2 + 4, 2, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`HeaderError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[static]fields.from-list"][Instruction::Return]', {
  funcName: '[static]fields.from-list',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline30.fnName = 'wasi:http/types@0.2.12#Fields.fromList';

const _trampoline31 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  let variant4;
  switch (arg1) {
    case 0: {
      variant4= {
        tag: 'get',
      };
      break;
    }
    case 1: {
      variant4= {
        tag: 'head',
      };
      break;
    }
    case 2: {
      variant4= {
        tag: 'post',
      };
      break;
    }
    case 3: {
      variant4= {
        tag: 'put',
      };
      break;
    }
    case 4: {
      variant4= {
        tag: 'delete',
      };
      break;
    }
    case 5: {
      variant4= {
        tag: 'connect',
      };
      break;
    }
    case 6: {
      variant4= {
        tag: 'options',
      };
      break;
    }
    case 7: {
      variant4= {
        tag: 'trace',
      };
      break;
    }
    case 8: {
      variant4= {
        tag: 'patch',
      };
      break;
    }
    case 9: {
      var ptr3 = arg2;
      var len3 = arg3;
      var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
      variant4= {
        tag: 'other',
        val: result3
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for Method');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-method"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'setMethod',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.setMethod(variant4)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant5 = ret;
let variant5_0;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    variant5_0 = 0;
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    variant5_0 = 1;
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-method"][Instruction::Return]', {
  funcName: '[method]outgoing-request.set-method',
  paramCount: 1,
  async: false,
  postReturn: false
});
task.resolve([variant5_0]);
task.exit();
return variant5_0;
}
_trampoline31.fnName = 'wasi:http/types@0.2.12#setMethod';

const _trampoline32 = function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  let variant5;
  switch (arg1) {
    case 0: {
      variant5 = undefined;
      break;
    }
    case 1: {
      let variant4;
      switch (arg2) {
        case 0: {
          variant4= {
            tag: 'HTTP',
          };
          break;
        }
        case 1: {
          variant4= {
            tag: 'HTTPS',
          };
          break;
        }
        case 2: {
          var ptr3 = arg3;
          var len3 = arg4;
          var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
          variant4= {
            tag: 'other',
            val: result3
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Scheme');
        }
      }
      variant5 = variant4;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-scheme"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'setScheme',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.setScheme(variant5)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant6 = ret;
let variant6_0;
switch (variant6.tag) {
  case 'ok': {
    const e = variant6.val;
    variant6_0 = 0;
    
    break;
  }
  case 'err': {
    const e = variant6.val;
    variant6_0 = 1;
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-scheme"][Instruction::Return]', {
  funcName: '[method]outgoing-request.set-scheme',
  paramCount: 1,
  async: false,
  postReturn: false
});
task.resolve([variant6_0]);
task.exit();
return variant6_0;
}
_trampoline32.fnName = 'wasi:http/types@0.2.12#setScheme';

const _trampoline33 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  let variant4;
  switch (arg1) {
    case 0: {
      variant4 = undefined;
      break;
    }
    case 1: {
      var ptr3 = arg2;
      var len3 = arg3;
      var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
      variant4 = result3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-authority"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'setAuthority',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.setAuthority(variant4)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant5 = ret;
let variant5_0;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    variant5_0 = 0;
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    variant5_0 = 1;
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-authority"][Instruction::Return]', {
  funcName: '[method]outgoing-request.set-authority',
  paramCount: 1,
  async: false,
  postReturn: false
});
task.resolve([variant5_0]);
task.exit();
return variant5_0;
}
_trampoline33.fnName = 'wasi:http/types@0.2.12#setAuthority';

const _trampoline34 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  let variant4;
  switch (arg1) {
    case 0: {
      variant4 = undefined;
      break;
    }
    case 1: {
      var ptr3 = arg2;
      var len3 = arg3;
      var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
      variant4 = result3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-path-with-query"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'setPathWithQuery',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.setPathWithQuery(variant4)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant5 = ret;
let variant5_0;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    variant5_0 = 0;
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    variant5_0 = 1;
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.set-path-with-query"][Instruction::Return]', {
  funcName: '[method]outgoing-request.set-path-with-query',
  paramCount: 1,
  async: false,
  postReturn: false
});
task.resolve([variant5_0]);
task.exit();
return variant5_0;
}
_trampoline34.fnName = 'wasi:http/types@0.2.12#setPathWithQuery';
const handleTable6 = [T_FLAG, 0];
const captureTable6= new Map();
let captureCnt6 = 0;
handleTables[6] = handleTable6;

const _trampoline35 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.body"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'body',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.body()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant4 = ret;
switch (variant4.tag) {
  case 'ok': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    if (!(e instanceof OutgoingBody)) {
      throw new TypeError('Resource error: Not a valid "OutgoingBody" resource.');
    }
    var handle3 = e[symbolRscHandle];
    if (!handle3) {
      const rep = e[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, e);
      handle3 = rscTableCreateOwn(handleTable6, rep);
    }
    dataView(memory0).setInt32(arg1 + 4, handle3, true);
    
    break;
  }
  case 'err': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-request.body"][Instruction::Return]', {
  funcName: '[method]outgoing-request.body',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline35.fnName = 'wasi:http/types@0.2.12#body';

const _trampoline36 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingBody.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-body.write"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'write',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.write()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant4 = ret;
switch (variant4.tag) {
  case 'ok': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    if (!(e instanceof OutputStream)) {
      throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
    }
    var handle3 = e[symbolRscHandle];
    if (!handle3) {
      const rep = e[symbolRscRep] || ++captureCnt2;
      captureTable2.set(rep, e);
      handle3 = rscTableCreateOwn(handleTable2, rep);
    }
    dataView(memory0).setInt32(arg1 + 4, handle3, true);
    
    break;
  }
  case 'err': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-body.write"][Instruction::Return]', {
  funcName: '[method]outgoing-body.write',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline36.fnName = 'wasi:http/types@0.2.12#write';

const _trampoline37 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingBody.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  else {
    captureTable6.delete(rep2);
  }
  rscTableRemove(handleTable6, handle1);
  let variant6;
  switch (arg1) {
    case 0: {
      variant6 = undefined;
      break;
    }
    case 1: {
      var handle4 = arg2;
      
      var rep5 = handleTable4[(handle4 << 1) + 1] & ~T_FLAG;
      var rsc3 = captureTable4.get(rep5);
      if (!rsc3) {
        rsc3 = Object.create(Fields.prototype);
        Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
        Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
      }
      
      else {
        captureTable4.delete(rep5);
      }
      rscTableRemove(handleTable4, handle4);
      variant6 = rsc3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]outgoing-body.finish"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'OutgoingBody.finish',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => OutgoingBody.finish(rsc0, variant6)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

var variant45 = ret;
switch (variant45.tag) {
  case 'ok': {
    const e = variant45.val;
    dataView(memory0).setInt8(arg3 + 0, 0, true);
    
    break;
  }
  case 'err': {
    const e = variant45.val;
    dataView(memory0).setInt8(arg3 + 0, 1, true);
    var variant44 = e;
    switch (variant44.tag) {
      case 'DNS-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 0, true);
        break;
      }
      case 'DNS-error': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 1, true);
        var {rcode: v7_0, infoCode: v7_1 } = e;
        var variant9 = v7_0;
        if (variant9 === null || variant9=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant9;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr8= encodeRes.ptr;
          var len8 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len8, true);
          dataView(memory0).setUint32(arg3 + 20, ptr8, true);
        }
        var variant10 = v7_1;
        if (variant10 === null || variant10=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant10;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt16(arg3 + 30, toUint16(e), true);
        }
        break;
      }
      case 'destination-not-found': {
        dataView(memory0).setInt8(arg3 + 8, 2, true);
        break;
      }
      case 'destination-unavailable': {
        dataView(memory0).setInt8(arg3 + 8, 3, true);
        break;
      }
      case 'destination-IP-prohibited': {
        dataView(memory0).setInt8(arg3 + 8, 4, true);
        break;
      }
      case 'destination-IP-unroutable': {
        dataView(memory0).setInt8(arg3 + 8, 5, true);
        break;
      }
      case 'connection-refused': {
        dataView(memory0).setInt8(arg3 + 8, 6, true);
        break;
      }
      case 'connection-terminated': {
        dataView(memory0).setInt8(arg3 + 8, 7, true);
        break;
      }
      case 'connection-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 8, true);
        break;
      }
      case 'connection-read-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 9, true);
        break;
      }
      case 'connection-write-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 10, true);
        break;
      }
      case 'connection-limit-reached': {
        dataView(memory0).setInt8(arg3 + 8, 11, true);
        break;
      }
      case 'TLS-protocol-error': {
        dataView(memory0).setInt8(arg3 + 8, 12, true);
        break;
      }
      case 'TLS-certificate-error': {
        dataView(memory0).setInt8(arg3 + 8, 13, true);
        break;
      }
      case 'TLS-alert-received': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 14, true);
        var {alertId: v11_0, alertMessage: v11_1 } = e;
        var variant12 = v11_0;
        if (variant12 === null || variant12=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant12;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt8(arg3 + 17, toUint8(e), true);
        }
        var variant14 = v11_1;
        if (variant14 === null || variant14=== undefined) {
          dataView(memory0).setInt8(arg3 + 20, 0, true);
        } else {
          const e = variant14;
          dataView(memory0).setInt8(arg3 + 20, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr13= encodeRes.ptr;
          var len13 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 28, len13, true);
          dataView(memory0).setUint32(arg3 + 24, ptr13, true);
        }
        break;
      }
      case 'HTTP-request-denied': {
        dataView(memory0).setInt8(arg3 + 8, 15, true);
        break;
      }
      case 'HTTP-request-length-required': {
        dataView(memory0).setInt8(arg3 + 8, 16, true);
        break;
      }
      case 'HTTP-request-body-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 17, true);
        var variant15 = e;
        if (variant15 === null || variant15=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant15;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
        }
        break;
      }
      case 'HTTP-request-method-invalid': {
        dataView(memory0).setInt8(arg3 + 8, 18, true);
        break;
      }
      case 'HTTP-request-URI-invalid': {
        dataView(memory0).setInt8(arg3 + 8, 19, true);
        break;
      }
      case 'HTTP-request-URI-too-long': {
        dataView(memory0).setInt8(arg3 + 8, 20, true);
        break;
      }
      case 'HTTP-request-header-section-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 21, true);
        var variant16 = e;
        if (variant16 === null || variant16=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant16;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-request-header-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 22, true);
        var variant21 = e;
        if (variant21 === null || variant21=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant21;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          var {fieldName: v17_0, fieldSize: v17_1 } = e;
          var variant19 = v17_0;
          if (variant19 === null || variant19=== undefined) {
            dataView(memory0).setInt8(arg3 + 20, 0, true);
          } else {
            const e = variant19;
            dataView(memory0).setInt8(arg3 + 20, 1, true);
            
            var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
            var ptr18= encodeRes.ptr;
            var len18 = encodeRes.len;
            
            dataView(memory0).setUint32(arg3 + 28, len18, true);
            dataView(memory0).setUint32(arg3 + 24, ptr18, true);
          }
          var variant20 = v17_1;
          if (variant20 === null || variant20=== undefined) {
            dataView(memory0).setInt8(arg3 + 32, 0, true);
          } else {
            const e = variant20;
            dataView(memory0).setInt8(arg3 + 32, 1, true);
            dataView(memory0).setInt32(arg3 + 36, toUint32(e), true);
          }
        }
        break;
      }
      case 'HTTP-request-trailer-section-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 23, true);
        var variant22 = e;
        if (variant22 === null || variant22=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant22;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-request-trailer-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 24, true);
        var {fieldName: v23_0, fieldSize: v23_1 } = e;
        var variant25 = v23_0;
        if (variant25 === null || variant25=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant25;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr24= encodeRes.ptr;
          var len24 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len24, true);
          dataView(memory0).setUint32(arg3 + 20, ptr24, true);
        }
        var variant26 = v23_1;
        if (variant26 === null || variant26=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant26;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-incomplete': {
        dataView(memory0).setInt8(arg3 + 8, 25, true);
        break;
      }
      case 'HTTP-response-header-section-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 26, true);
        var variant27 = e;
        if (variant27 === null || variant27=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant27;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-header-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 27, true);
        var {fieldName: v28_0, fieldSize: v28_1 } = e;
        var variant30 = v28_0;
        if (variant30 === null || variant30=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant30;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr29= encodeRes.ptr;
          var len29 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len29, true);
          dataView(memory0).setUint32(arg3 + 20, ptr29, true);
        }
        var variant31 = v28_1;
        if (variant31 === null || variant31=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant31;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-body-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 28, true);
        var variant32 = e;
        if (variant32 === null || variant32=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant32;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
        }
        break;
      }
      case 'HTTP-response-trailer-section-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 29, true);
        var variant33 = e;
        if (variant33 === null || variant33=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant33;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-trailer-size': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 30, true);
        var {fieldName: v34_0, fieldSize: v34_1 } = e;
        var variant36 = v34_0;
        if (variant36 === null || variant36=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant36;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr35= encodeRes.ptr;
          var len35 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len35, true);
          dataView(memory0).setUint32(arg3 + 20, ptr35, true);
        }
        var variant37 = v34_1;
        if (variant37 === null || variant37=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant37;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-transfer-coding': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 31, true);
        var variant39 = e;
        if (variant39 === null || variant39=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant39;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr38= encodeRes.ptr;
          var len38 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len38, true);
          dataView(memory0).setUint32(arg3 + 20, ptr38, true);
        }
        break;
      }
      case 'HTTP-response-content-coding': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 32, true);
        var variant41 = e;
        if (variant41 === null || variant41=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant41;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr40= encodeRes.ptr;
          var len40 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len40, true);
          dataView(memory0).setUint32(arg3 + 20, ptr40, true);
        }
        break;
      }
      case 'HTTP-response-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 33, true);
        break;
      }
      case 'HTTP-upgrade-failed': {
        dataView(memory0).setInt8(arg3 + 8, 34, true);
        break;
      }
      case 'HTTP-protocol-error': {
        dataView(memory0).setInt8(arg3 + 8, 35, true);
        break;
      }
      case 'loop-detected': {
        dataView(memory0).setInt8(arg3 + 8, 36, true);
        break;
      }
      case 'configuration-error': {
        dataView(memory0).setInt8(arg3 + 8, 37, true);
        break;
      }
      case 'internal-error': {
        const e = variant44.val;
        dataView(memory0).setInt8(arg3 + 8, 38, true);
        var variant43 = e;
        if (variant43 === null || variant43=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant43;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr42= encodeRes.ptr;
          var len42 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len42, true);
          dataView(memory0).setUint32(arg3 + 20, ptr42, true);
        }
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant44.tag)}\` (received \`${variant44}\`) specified for \`ErrorCode\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant45, valueType: typeof variant45});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[static]outgoing-body.finish"][Instruction::Return]', {
  funcName: '[static]outgoing-body.finish',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline37.fnName = 'wasi:http/types@0.2.12#OutgoingBody.finish';

const _trampoline38 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Fields.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]fields.entries"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'entries',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.entries()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var vec6 = ret;
  var len6 = vec6.length;
  var result6 = realloc0(0, 0, 4, len6 * 16);
  for (let i = 0; i < vec6.length; i++) {
    const e = vec6[i];
    const base = result6 + i * 16;var [tuple3_0, tuple3_1] = e;
    
    var encodeRes = _utf8AllocateAndEncode(tuple3_0, realloc0, memory0);
    var ptr4= encodeRes.ptr;
    var len4 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 4, len4, true);
    dataView(memory0).setUint32(base + 0, ptr4, true);
    var val5 = tuple3_1;
    var len5 = Array.isArray(val5) ? val5.length : val5.byteLength;
    var ptr5 = realloc0(0, 0, 1, len5 * 1);
    
    let valData5;
    const valLenBytes5 = len5 * 1;
    if (Array.isArray(val5)) {
      // Regular array likely containing numbers, write values to memory
      let offset = 0;
      const dv5 = new DataView(memory0.buffer);
      for (const v of val5) {
        dv5.setUint8(ptr5+ offset, v, true);
        offset += 1;
      }
    } else {
      // TypedArray / ArrayBuffer-like, direct copy
      valData5 = new Uint8Array(val5.buffer || val5, val5.byteOffset, valLenBytes5);
      const out5 = new Uint8Array(memory0.buffer, ptr5,valLenBytes5);
      out5.set(valData5);
    }
    
    dataView(memory0).setUint32(base + 12, len5, true);
    dataView(memory0).setUint32(base + 8, ptr5, true);
  }
  dataView(memory0).setUint32(arg1 + 4, len6, true);
  dataView(memory0).setUint32(arg1 + 0, result6, true);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]fields.entries"][Instruction::Return]', {
    funcName: '[method]fields.entries',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline38.fnName = 'wasi:http/types@0.2.12#entries';
const handleTable10 = [T_FLAG, 0];
const captureTable10= new Map();
let captureCnt10 = 0;
handleTables[10] = handleTable10;

const _trampoline39 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingResponse.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.consume"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'consume',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.consume()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant4 = ret;
switch (variant4.tag) {
  case 'ok': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    if (!(e instanceof IncomingBody)) {
      throw new TypeError('Resource error: Not a valid "IncomingBody" resource.');
    }
    var handle3 = e[symbolRscHandle];
    if (!handle3) {
      const rep = e[symbolRscRep] || ++captureCnt10;
      captureTable10.set(rep, e);
      handle3 = rscTableCreateOwn(handleTable10, rep);
    }
    dataView(memory0).setInt32(arg1 + 4, handle3, true);
    
    break;
  }
  case 'err': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-response.consume"][Instruction::Return]', {
  funcName: '[method]incoming-response.consume',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline39.fnName = 'wasi:http/types@0.2.12#consume';

const _trampoline40 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable10[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable10.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingBody.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-body.stream"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'stream',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.stream()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant4 = ret;
switch (variant4.tag) {
  case 'ok': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    if (!(e instanceof InputStream)) {
      throw new TypeError('Resource error: Not a valid "InputStream" resource.');
    }
    var handle3 = e[symbolRscHandle];
    if (!handle3) {
      const rep = e[symbolRscRep] || ++captureCnt3;
      captureTable3.set(rep, e);
      handle3 = rscTableCreateOwn(handleTable3, rep);
    }
    dataView(memory0).setInt32(arg1 + 4, handle3, true);
    
    break;
  }
  case 'err': {
    const e = variant4.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-body.stream"][Instruction::Return]', {
  funcName: '[method]incoming-body.stream',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline40.fnName = 'wasi:http/types@0.2.12#stream';

const _trampoline41 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable8.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(FutureIncomingResponse.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]future-incoming-response.get"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'get',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => rsc0.get()
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant44 = ret;
  if (variant44 === null || variant44=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant44;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var variant43 = e;
    switch (variant43.tag) {
      case 'ok': {
        const e = variant43.val;
        dataView(memory0).setInt8(arg1 + 8, 0, true);
        var variant42 = e;
        switch (variant42.tag) {
          case 'ok': {
            const e = variant42.val;
            dataView(memory0).setInt8(arg1 + 16, 0, true);
            if (!(e instanceof IncomingResponse)) {
              throw new TypeError('Resource error: Not a valid "IncomingResponse" resource.');
            }
            var handle3 = e[symbolRscHandle];
            if (!handle3) {
              const rep = e[symbolRscRep] || ++captureCnt9;
              captureTable9.set(rep, e);
              handle3 = rscTableCreateOwn(handleTable9, rep);
            }
            dataView(memory0).setInt32(arg1 + 24, handle3, true);
            
            break;
          }
          case 'err': {
            const e = variant42.val;
            dataView(memory0).setInt8(arg1 + 16, 1, true);
            var variant41 = e;
            switch (variant41.tag) {
              case 'DNS-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 0, true);
                break;
              }
              case 'DNS-error': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 1, true);
                var {rcode: v4_0, infoCode: v4_1 } = e;
                var variant6 = v4_0;
                if (variant6 === null || variant6=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant6;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr5= encodeRes.ptr;
                  var len5 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len5, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr5, true);
                }
                var variant7 = v4_1;
                if (variant7 === null || variant7=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant7;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt16(arg1 + 46, toUint16(e), true);
                }
                break;
              }
              case 'destination-not-found': {
                dataView(memory0).setInt8(arg1 + 24, 2, true);
                break;
              }
              case 'destination-unavailable': {
                dataView(memory0).setInt8(arg1 + 24, 3, true);
                break;
              }
              case 'destination-IP-prohibited': {
                dataView(memory0).setInt8(arg1 + 24, 4, true);
                break;
              }
              case 'destination-IP-unroutable': {
                dataView(memory0).setInt8(arg1 + 24, 5, true);
                break;
              }
              case 'connection-refused': {
                dataView(memory0).setInt8(arg1 + 24, 6, true);
                break;
              }
              case 'connection-terminated': {
                dataView(memory0).setInt8(arg1 + 24, 7, true);
                break;
              }
              case 'connection-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 8, true);
                break;
              }
              case 'connection-read-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 9, true);
                break;
              }
              case 'connection-write-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 10, true);
                break;
              }
              case 'connection-limit-reached': {
                dataView(memory0).setInt8(arg1 + 24, 11, true);
                break;
              }
              case 'TLS-protocol-error': {
                dataView(memory0).setInt8(arg1 + 24, 12, true);
                break;
              }
              case 'TLS-certificate-error': {
                dataView(memory0).setInt8(arg1 + 24, 13, true);
                break;
              }
              case 'TLS-alert-received': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 14, true);
                var {alertId: v8_0, alertMessage: v8_1 } = e;
                var variant9 = v8_0;
                if (variant9 === null || variant9=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant9;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt8(arg1 + 33, toUint8(e), true);
                }
                var variant11 = v8_1;
                if (variant11 === null || variant11=== undefined) {
                  dataView(memory0).setInt8(arg1 + 36, 0, true);
                } else {
                  const e = variant11;
                  dataView(memory0).setInt8(arg1 + 36, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr10= encodeRes.ptr;
                  var len10 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 44, len10, true);
                  dataView(memory0).setUint32(arg1 + 40, ptr10, true);
                }
                break;
              }
              case 'HTTP-request-denied': {
                dataView(memory0).setInt8(arg1 + 24, 15, true);
                break;
              }
              case 'HTTP-request-length-required': {
                dataView(memory0).setInt8(arg1 + 24, 16, true);
                break;
              }
              case 'HTTP-request-body-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 17, true);
                var variant12 = e;
                if (variant12 === null || variant12=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant12;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setBigInt64(arg1 + 40, toUint64(e), true);
                }
                break;
              }
              case 'HTTP-request-method-invalid': {
                dataView(memory0).setInt8(arg1 + 24, 18, true);
                break;
              }
              case 'HTTP-request-URI-invalid': {
                dataView(memory0).setInt8(arg1 + 24, 19, true);
                break;
              }
              case 'HTTP-request-URI-too-long': {
                dataView(memory0).setInt8(arg1 + 24, 20, true);
                break;
              }
              case 'HTTP-request-header-section-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 21, true);
                var variant13 = e;
                if (variant13 === null || variant13=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant13;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-request-header-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 22, true);
                var variant18 = e;
                if (variant18 === null || variant18=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant18;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var {fieldName: v14_0, fieldSize: v14_1 } = e;
                  var variant16 = v14_0;
                  if (variant16 === null || variant16=== undefined) {
                    dataView(memory0).setInt8(arg1 + 36, 0, true);
                  } else {
                    const e = variant16;
                    dataView(memory0).setInt8(arg1 + 36, 1, true);
                    
                    var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                    var ptr15= encodeRes.ptr;
                    var len15 = encodeRes.len;
                    
                    dataView(memory0).setUint32(arg1 + 44, len15, true);
                    dataView(memory0).setUint32(arg1 + 40, ptr15, true);
                  }
                  var variant17 = v14_1;
                  if (variant17 === null || variant17=== undefined) {
                    dataView(memory0).setInt8(arg1 + 48, 0, true);
                  } else {
                    const e = variant17;
                    dataView(memory0).setInt8(arg1 + 48, 1, true);
                    dataView(memory0).setInt32(arg1 + 52, toUint32(e), true);
                  }
                }
                break;
              }
              case 'HTTP-request-trailer-section-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 23, true);
                var variant19 = e;
                if (variant19 === null || variant19=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant19;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-request-trailer-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 24, true);
                var {fieldName: v20_0, fieldSize: v20_1 } = e;
                var variant22 = v20_0;
                if (variant22 === null || variant22=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant22;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr21= encodeRes.ptr;
                  var len21 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len21, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr21, true);
                }
                var variant23 = v20_1;
                if (variant23 === null || variant23=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant23;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-incomplete': {
                dataView(memory0).setInt8(arg1 + 24, 25, true);
                break;
              }
              case 'HTTP-response-header-section-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 26, true);
                var variant24 = e;
                if (variant24 === null || variant24=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant24;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-header-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 27, true);
                var {fieldName: v25_0, fieldSize: v25_1 } = e;
                var variant27 = v25_0;
                if (variant27 === null || variant27=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant27;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr26= encodeRes.ptr;
                  var len26 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len26, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr26, true);
                }
                var variant28 = v25_1;
                if (variant28 === null || variant28=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant28;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-body-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 28, true);
                var variant29 = e;
                if (variant29 === null || variant29=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant29;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setBigInt64(arg1 + 40, toUint64(e), true);
                }
                break;
              }
              case 'HTTP-response-trailer-section-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 29, true);
                var variant30 = e;
                if (variant30 === null || variant30=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant30;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-trailer-size': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 30, true);
                var {fieldName: v31_0, fieldSize: v31_1 } = e;
                var variant33 = v31_0;
                if (variant33 === null || variant33=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant33;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr32= encodeRes.ptr;
                  var len32 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len32, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr32, true);
                }
                var variant34 = v31_1;
                if (variant34 === null || variant34=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant34;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-transfer-coding': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 31, true);
                var variant36 = e;
                if (variant36 === null || variant36=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant36;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr35= encodeRes.ptr;
                  var len35 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len35, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr35, true);
                }
                break;
              }
              case 'HTTP-response-content-coding': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 32, true);
                var variant38 = e;
                if (variant38 === null || variant38=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant38;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr37= encodeRes.ptr;
                  var len37 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len37, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr37, true);
                }
                break;
              }
              case 'HTTP-response-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 33, true);
                break;
              }
              case 'HTTP-upgrade-failed': {
                dataView(memory0).setInt8(arg1 + 24, 34, true);
                break;
              }
              case 'HTTP-protocol-error': {
                dataView(memory0).setInt8(arg1 + 24, 35, true);
                break;
              }
              case 'loop-detected': {
                dataView(memory0).setInt8(arg1 + 24, 36, true);
                break;
              }
              case 'configuration-error': {
                dataView(memory0).setInt8(arg1 + 24, 37, true);
                break;
              }
              case 'internal-error': {
                const e = variant41.val;
                dataView(memory0).setInt8(arg1 + 24, 38, true);
                var variant40 = e;
                if (variant40 === null || variant40=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant40;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  
                  var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
                  var ptr39= encodeRes.ptr;
                  var len39 = encodeRes.len;
                  
                  dataView(memory0).setUint32(arg1 + 40, len39, true);
                  dataView(memory0).setUint32(arg1 + 36, ptr39, true);
                }
                break;
              }
              default: {
                throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant41.tag)}\` (received \`${variant41}\`) specified for \`ErrorCode\``);
              }
            }
            
            break;
          }
          default: {
            _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant42, valueType: typeof variant42});
            throw new TypeError('invalid variant specified for result');
          }
        }
        
        break;
      }
      case 'err': {
        const e = variant43.val;
        dataView(memory0).setInt8(arg1 + 8, 1, true);
        
        break;
      }
      default: {
        _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant43, valueType: typeof variant43});
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]future-incoming-response.get"][Instruction::Return]', {
    funcName: '[method]future-incoming-response.get',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline41.fnName = 'wasi:http/types@0.2.12#get';
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

const _trampoline42 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'blockingWriteAndFlush',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingWriteAndFlush(result3)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant6 = ret;
switch (variant6.tag) {
  case 'ok': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg3 + 0, 0, true);
    
    break;
  }
  case 'err': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg3 + 0, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'last-operation-failed': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 4, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle4 = e[symbolRscHandle];
        if (!handle4) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle4 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg3 + 8, handle4, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg3 + 4, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"][Instruction::Return]', {
  funcName: '[method]output-stream.blocking-write-and-flush',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline42.fnName = 'wasi:io/streams@0.2.12#blockingWriteAndFlush';

const _trampoline43 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'blockingRead',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingRead(BigInt.asUintN(64, BigInt(arg1)))
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant6 = ret;
switch (variant6.tag) {
  case 'ok': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg2 + 0, 0, true);
    var val3 = e;
    var len3 = Array.isArray(val3) ? val3.length : val3.byteLength;
    var ptr3 = realloc0(0, 0, 1, len3 * 1);
    
    let valData3;
    const valLenBytes3 = len3 * 1;
    if (Array.isArray(val3)) {
      // Regular array likely containing numbers, write values to memory
      let offset = 0;
      const dv3 = new DataView(memory0.buffer);
      for (const v of val3) {
        dv3.setUint8(ptr3+ offset, v, true);
        offset += 1;
      }
    } else {
      // TypedArray / ArrayBuffer-like, direct copy
      valData3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, valLenBytes3);
      const out3 = new Uint8Array(memory0.buffer, ptr3,valLenBytes3);
      out3.set(valData3);
    }
    
    dataView(memory0).setUint32(arg2 + 8, len3, true);
    dataView(memory0).setUint32(arg2 + 4, ptr3, true);
    
    break;
  }
  case 'err': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg2 + 0, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'last-operation-failed': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg2 + 4, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle4 = e[symbolRscHandle];
        if (!handle4) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle4 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg2 + 8, handle4, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg2 + 4, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"][Instruction::Return]', {
  funcName: '[method]input-stream.blocking-read',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline43.fnName = 'wasi:io/streams@0.2.12#blockingRead';

const _trampoline44 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingRequest.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  else {
    captureTable5.delete(rep2);
  }
  rscTableRemove(handleTable5, handle1);
  let variant6;
  switch (arg1) {
    case 0: {
      variant6 = undefined;
      break;
    }
    case 1: {
      var handle4 = arg2;
      
      var rep5 = handleTable7[(handle4 << 1) + 1] & ~T_FLAG;
      var rsc3 = captureTable7.get(rep5);
      if (!rsc3) {
        rsc3 = Object.create(RequestOptions.prototype);
        Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
        Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
      }
      
      else {
        captureTable7.delete(rep5);
      }
      rscTableRemove(handleTable7, handle4);
      variant6 = rsc3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  _debugLog('[iface="wasi:http/outgoing-handler@0.2.12", function="handle"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'handle',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => handle(rsc0, variant6)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

var variant46 = ret;
switch (variant46.tag) {
  case 'ok': {
    const e = variant46.val;
    dataView(memory0).setInt8(arg3 + 0, 0, true);
    if (!(e instanceof FutureIncomingResponse)) {
      throw new TypeError('Resource error: Not a valid "FutureIncomingResponse" resource.');
    }
    var handle7 = e[symbolRscHandle];
    if (!handle7) {
      const rep = e[symbolRscRep] || ++captureCnt8;
      captureTable8.set(rep, e);
      handle7 = rscTableCreateOwn(handleTable8, rep);
    }
    dataView(memory0).setInt32(arg3 + 8, handle7, true);
    
    break;
  }
  case 'err': {
    const e = variant46.val;
    dataView(memory0).setInt8(arg3 + 0, 1, true);
    var variant45 = e;
    switch (variant45.tag) {
      case 'DNS-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 0, true);
        break;
      }
      case 'DNS-error': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 1, true);
        var {rcode: v8_0, infoCode: v8_1 } = e;
        var variant10 = v8_0;
        if (variant10 === null || variant10=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant10;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr9= encodeRes.ptr;
          var len9 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len9, true);
          dataView(memory0).setUint32(arg3 + 20, ptr9, true);
        }
        var variant11 = v8_1;
        if (variant11 === null || variant11=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant11;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt16(arg3 + 30, toUint16(e), true);
        }
        break;
      }
      case 'destination-not-found': {
        dataView(memory0).setInt8(arg3 + 8, 2, true);
        break;
      }
      case 'destination-unavailable': {
        dataView(memory0).setInt8(arg3 + 8, 3, true);
        break;
      }
      case 'destination-IP-prohibited': {
        dataView(memory0).setInt8(arg3 + 8, 4, true);
        break;
      }
      case 'destination-IP-unroutable': {
        dataView(memory0).setInt8(arg3 + 8, 5, true);
        break;
      }
      case 'connection-refused': {
        dataView(memory0).setInt8(arg3 + 8, 6, true);
        break;
      }
      case 'connection-terminated': {
        dataView(memory0).setInt8(arg3 + 8, 7, true);
        break;
      }
      case 'connection-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 8, true);
        break;
      }
      case 'connection-read-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 9, true);
        break;
      }
      case 'connection-write-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 10, true);
        break;
      }
      case 'connection-limit-reached': {
        dataView(memory0).setInt8(arg3 + 8, 11, true);
        break;
      }
      case 'TLS-protocol-error': {
        dataView(memory0).setInt8(arg3 + 8, 12, true);
        break;
      }
      case 'TLS-certificate-error': {
        dataView(memory0).setInt8(arg3 + 8, 13, true);
        break;
      }
      case 'TLS-alert-received': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 14, true);
        var {alertId: v12_0, alertMessage: v12_1 } = e;
        var variant13 = v12_0;
        if (variant13 === null || variant13=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant13;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt8(arg3 + 17, toUint8(e), true);
        }
        var variant15 = v12_1;
        if (variant15 === null || variant15=== undefined) {
          dataView(memory0).setInt8(arg3 + 20, 0, true);
        } else {
          const e = variant15;
          dataView(memory0).setInt8(arg3 + 20, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr14= encodeRes.ptr;
          var len14 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 28, len14, true);
          dataView(memory0).setUint32(arg3 + 24, ptr14, true);
        }
        break;
      }
      case 'HTTP-request-denied': {
        dataView(memory0).setInt8(arg3 + 8, 15, true);
        break;
      }
      case 'HTTP-request-length-required': {
        dataView(memory0).setInt8(arg3 + 8, 16, true);
        break;
      }
      case 'HTTP-request-body-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 17, true);
        var variant16 = e;
        if (variant16 === null || variant16=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant16;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
        }
        break;
      }
      case 'HTTP-request-method-invalid': {
        dataView(memory0).setInt8(arg3 + 8, 18, true);
        break;
      }
      case 'HTTP-request-URI-invalid': {
        dataView(memory0).setInt8(arg3 + 8, 19, true);
        break;
      }
      case 'HTTP-request-URI-too-long': {
        dataView(memory0).setInt8(arg3 + 8, 20, true);
        break;
      }
      case 'HTTP-request-header-section-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 21, true);
        var variant17 = e;
        if (variant17 === null || variant17=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant17;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-request-header-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 22, true);
        var variant22 = e;
        if (variant22 === null || variant22=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant22;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          var {fieldName: v18_0, fieldSize: v18_1 } = e;
          var variant20 = v18_0;
          if (variant20 === null || variant20=== undefined) {
            dataView(memory0).setInt8(arg3 + 20, 0, true);
          } else {
            const e = variant20;
            dataView(memory0).setInt8(arg3 + 20, 1, true);
            
            var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
            var ptr19= encodeRes.ptr;
            var len19 = encodeRes.len;
            
            dataView(memory0).setUint32(arg3 + 28, len19, true);
            dataView(memory0).setUint32(arg3 + 24, ptr19, true);
          }
          var variant21 = v18_1;
          if (variant21 === null || variant21=== undefined) {
            dataView(memory0).setInt8(arg3 + 32, 0, true);
          } else {
            const e = variant21;
            dataView(memory0).setInt8(arg3 + 32, 1, true);
            dataView(memory0).setInt32(arg3 + 36, toUint32(e), true);
          }
        }
        break;
      }
      case 'HTTP-request-trailer-section-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 23, true);
        var variant23 = e;
        if (variant23 === null || variant23=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant23;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-request-trailer-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 24, true);
        var {fieldName: v24_0, fieldSize: v24_1 } = e;
        var variant26 = v24_0;
        if (variant26 === null || variant26=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant26;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr25= encodeRes.ptr;
          var len25 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len25, true);
          dataView(memory0).setUint32(arg3 + 20, ptr25, true);
        }
        var variant27 = v24_1;
        if (variant27 === null || variant27=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant27;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-incomplete': {
        dataView(memory0).setInt8(arg3 + 8, 25, true);
        break;
      }
      case 'HTTP-response-header-section-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 26, true);
        var variant28 = e;
        if (variant28 === null || variant28=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant28;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-header-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 27, true);
        var {fieldName: v29_0, fieldSize: v29_1 } = e;
        var variant31 = v29_0;
        if (variant31 === null || variant31=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant31;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr30= encodeRes.ptr;
          var len30 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len30, true);
          dataView(memory0).setUint32(arg3 + 20, ptr30, true);
        }
        var variant32 = v29_1;
        if (variant32 === null || variant32=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant32;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-body-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 28, true);
        var variant33 = e;
        if (variant33 === null || variant33=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant33;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
        }
        break;
      }
      case 'HTTP-response-trailer-section-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 29, true);
        var variant34 = e;
        if (variant34 === null || variant34=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant34;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-trailer-size': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 30, true);
        var {fieldName: v35_0, fieldSize: v35_1 } = e;
        var variant37 = v35_0;
        if (variant37 === null || variant37=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant37;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr36= encodeRes.ptr;
          var len36 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len36, true);
          dataView(memory0).setUint32(arg3 + 20, ptr36, true);
        }
        var variant38 = v35_1;
        if (variant38 === null || variant38=== undefined) {
          dataView(memory0).setInt8(arg3 + 28, 0, true);
        } else {
          const e = variant38;
          dataView(memory0).setInt8(arg3 + 28, 1, true);
          dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
        }
        break;
      }
      case 'HTTP-response-transfer-coding': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 31, true);
        var variant40 = e;
        if (variant40 === null || variant40=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant40;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr39= encodeRes.ptr;
          var len39 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len39, true);
          dataView(memory0).setUint32(arg3 + 20, ptr39, true);
        }
        break;
      }
      case 'HTTP-response-content-coding': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 32, true);
        var variant42 = e;
        if (variant42 === null || variant42=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant42;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr41= encodeRes.ptr;
          var len41 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len41, true);
          dataView(memory0).setUint32(arg3 + 20, ptr41, true);
        }
        break;
      }
      case 'HTTP-response-timeout': {
        dataView(memory0).setInt8(arg3 + 8, 33, true);
        break;
      }
      case 'HTTP-upgrade-failed': {
        dataView(memory0).setInt8(arg3 + 8, 34, true);
        break;
      }
      case 'HTTP-protocol-error': {
        dataView(memory0).setInt8(arg3 + 8, 35, true);
        break;
      }
      case 'loop-detected': {
        dataView(memory0).setInt8(arg3 + 8, 36, true);
        break;
      }
      case 'configuration-error': {
        dataView(memory0).setInt8(arg3 + 8, 37, true);
        break;
      }
      case 'internal-error': {
        const e = variant45.val;
        dataView(memory0).setInt8(arg3 + 8, 38, true);
        var variant44 = e;
        if (variant44 === null || variant44=== undefined) {
          dataView(memory0).setInt8(arg3 + 16, 0, true);
        } else {
          const e = variant44;
          dataView(memory0).setInt8(arg3 + 16, 1, true);
          
          var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
          var ptr43= encodeRes.ptr;
          var len43 = encodeRes.len;
          
          dataView(memory0).setUint32(arg3 + 24, len43, true);
          dataView(memory0).setUint32(arg3 + 20, ptr43, true);
        }
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant45.tag)}\` (received \`${variant45}\`) specified for \`ErrorCode\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant46, valueType: typeof variant46});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:http/outgoing-handler@0.2.12", function="handle"][Instruction::Return]', {
  funcName: 'handle',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline44.fnName = 'wasi:http/outgoing-handler@0.2.12#handle';

const _trampoline45 = function(arg0) {
  _debugLog('[iface="wasi:random/insecure-seed@0.2.12", function="insecure-seed"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'insecureSeed',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => insecureSeed()
  })
  ;
  var [tuple0_0, tuple0_1] = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(tuple0_0), true);
  dataView(memory0).setBigInt64(arg0 + 8, toUint64(tuple0_1), true);
  _debugLog('[iface="wasi:random/insecure-seed@0.2.12", function="insecure-seed"][Instruction::Return]', {
    funcName: 'insecure-seed',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline45.fnName = 'wasi:random/insecure-seed@0.2.12#insecureSeed';

const _trampoline46 = function(arg0, arg1, arg2) {
  var len3 = arg1;
  var base3 = arg0;
  var result3 = [];
  for (let i = 0; i < len3; i++) {
    const base = base3 + i * 4;
    var handle1 = dataView(memory0).getInt32(base + 0, true);
    
    var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
    var rsc0 = captureTable0.get(rep2);
    if (!rsc0) {
      rsc0 = Object.create(Pollable.prototype);
      Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
      Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
    }
    
    curResourceBorrows.push(rsc0);
    result3.push(rsc0);
  }
  _debugLog('[iface="wasi:io/poll@0.2.12", function="poll"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'poll',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => poll(result3)
  })
  ;
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var val4 = ret;
  var len4 = val4.length;
  var ptr4 = realloc0(0, 0, 4, len4 * 4);
  
  let valData4;
  const valLenBytes4 = len4 * 4;
  if (Array.isArray(val4)) {
    // Regular array likely containing numbers, write values to memory
    let offset = 0;
    const dv4 = new DataView(memory0.buffer);
    for (const v of val4) {
      dv4.setUint32(ptr4+ offset, v, true);
      offset += 4;
    }
  } else {
    // TypedArray / ArrayBuffer-like, direct copy
    valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
    const out4 = new Uint8Array(memory0.buffer, ptr4,valLenBytes4);
    out4.set(valData4);
  }
  
  dataView(memory0).setUint32(arg2 + 4, len4, true);
  dataView(memory0).setUint32(arg2 + 0, ptr4, true);
  _debugLog('[iface="wasi:io/poll@0.2.12", function="poll"][Instruction::Return]', {
    funcName: 'poll',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline46.fnName = 'wasi:io/poll@0.2.12#poll';

const _trampoline47 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'read',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.read(BigInt.asUintN(64, BigInt(arg1)))
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant6 = ret;
switch (variant6.tag) {
  case 'ok': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg2 + 0, 0, true);
    var val3 = e;
    var len3 = Array.isArray(val3) ? val3.length : val3.byteLength;
    var ptr3 = realloc0(0, 0, 1, len3 * 1);
    
    let valData3;
    const valLenBytes3 = len3 * 1;
    if (Array.isArray(val3)) {
      // Regular array likely containing numbers, write values to memory
      let offset = 0;
      const dv3 = new DataView(memory0.buffer);
      for (const v of val3) {
        dv3.setUint8(ptr3+ offset, v, true);
        offset += 1;
      }
    } else {
      // TypedArray / ArrayBuffer-like, direct copy
      valData3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, valLenBytes3);
      const out3 = new Uint8Array(memory0.buffer, ptr3,valLenBytes3);
      out3.set(valData3);
    }
    
    dataView(memory0).setUint32(arg2 + 8, len3, true);
    dataView(memory0).setUint32(arg2 + 4, ptr3, true);
    
    break;
  }
  case 'err': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg2 + 0, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'last-operation-failed': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg2 + 4, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle4 = e[symbolRscHandle];
        if (!handle4) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle4 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg2 + 8, handle4, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg2 + 4, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"][Instruction::Return]', {
  funcName: '[method]input-stream.read',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline47.fnName = 'wasi:io/streams@0.2.12#read';

const _trampoline48 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'checkWrite',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.checkWrite()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant5 = ret;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var variant4 = e;
    switch (variant4.tag) {
      case 'last-operation-failed': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 8, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle3 = e[symbolRscHandle];
        if (!handle3) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle3 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg1 + 12, handle3, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg1 + 8, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"][Instruction::Return]', {
  funcName: '[method]output-stream.check-write',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline48.fnName = 'wasi:io/streams@0.2.12#checkWrite';

const _trampoline49 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'write',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.write(result3)
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant6 = ret;
switch (variant6.tag) {
  case 'ok': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg3 + 0, 0, true);
    
    break;
  }
  case 'err': {
    const e = variant6.val;
    dataView(memory0).setInt8(arg3 + 0, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'last-operation-failed': {
        const e = variant5.val;
        dataView(memory0).setInt8(arg3 + 4, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle4 = e[symbolRscHandle];
        if (!handle4) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle4 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg3 + 8, handle4, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg3 + 4, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"][Instruction::Return]', {
  funcName: '[method]output-stream.write',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline49.fnName = 'wasi:io/streams@0.2.12#write';

const _trampoline50 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'blockingFlush',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    ret = { tag: 'ok', val: _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingFlush()
    })
  };
} catch (e) {
  ret = { tag: 'err', val: getErrorPayload(e) };
}

for (const rsc of curResourceBorrows) {
  rsc[symbolRscHandle] = undefined;
}
curResourceBorrows = [];
var variant5 = ret;
switch (variant5.tag) {
  case 'ok': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg1 + 0, 0, true);
    
    break;
  }
  case 'err': {
    const e = variant5.val;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var variant4 = e;
    switch (variant4.tag) {
      case 'last-operation-failed': {
        const e = variant4.val;
        dataView(memory0).setInt8(arg1 + 4, 0, true);
        if (!(e instanceof Error$1)) {
          throw new TypeError('Resource error: Not a valid "Error" resource.');
        }
        var handle3 = e[symbolRscHandle];
        if (!handle3) {
          const rep = e[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, e);
          handle3 = rscTableCreateOwn(handleTable1, rep);
        }
        dataView(memory0).setInt32(arg1 + 8, handle3, true);
        break;
      }
      case 'closed': {
        dataView(memory0).setInt8(arg1 + 4, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
      }
    }
    
    break;
  }
  default: {
    _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5});
    throw new TypeError('invalid variant specified for result');
  }
}
_debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"][Instruction::Return]', {
  funcName: '[method]output-stream.blocking-flush',
  paramCount: 0,
  async: false,
  postReturn: false
});
task.resolve([ret]);
task.exit();
}
_trampoline50.fnName = 'wasi:io/streams@0.2.12#blockingFlush';

const _trampoline51 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getEnvironment',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getEnvironment()
  })
  ;
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_0, realloc0, memory0);
    var ptr1= encodeRes.ptr;
    var len1 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 4, len1, true);
    dataView(memory0).setUint32(base + 0, ptr1, true);
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc0, memory0);
    var ptr2= encodeRes.ptr;
    var len2 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 12, len2, true);
    dataView(memory0).setUint32(base + 8, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"][Instruction::Return]', {
    funcName: 'get-environment',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline51.fnName = 'wasi:cli/environment@0.2.12#getEnvironment';
const handleTable11 = [T_FLAG, 0];
const captureTable11= new Map();
let captureCnt11 = 0;
handleTables[11] = handleTable11;

const _trampoline52 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.12", function="get-terminal-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getTerminalStdin',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getTerminalStdin()
  })
  ;
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt11;
      captureTable11.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable11, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.12", function="get-terminal-stdin"][Instruction::Return]', {
    funcName: 'get-terminal-stdin',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline52.fnName = 'wasi:cli/terminal-stdin@0.2.12#getTerminalStdin';
const handleTable12 = [T_FLAG, 0];
const captureTable12= new Map();
let captureCnt12 = 0;
handleTables[12] = handleTable12;

const _trampoline53 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.12", function="get-terminal-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getTerminalStdout',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getTerminalStdout()
  })
  ;
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt12;
      captureTable12.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable12, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.12", function="get-terminal-stdout"][Instruction::Return]', {
    funcName: 'get-terminal-stdout',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline53.fnName = 'wasi:cli/terminal-stdout@0.2.12#getTerminalStdout';

const _trampoline54 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.12", function="get-terminal-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'getTerminalStderr',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => getTerminalStderr()
  })
  ;
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt12;
      captureTable12.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable12, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.12", function="get-terminal-stderr"][Instruction::Return]', {
    funcName: 'get-terminal-stderr',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline54.fnName = 'wasi:cli/terminal-stderr@0.2.12#getTerminalStderr';

const _trampoline55 = function(arg0) {
  _debugLog('[iface="wasi:clocks/wall-clock@0.2.12", function="now"] [Instruction::CallInterface] (sync, @ enter)');
  let hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1, // 0,
      isAsync: false,
      entryFnName: 'now$1',
      getCallbackFn: () => null,
      callbackFnName: 'null',
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(0)?.task;
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  let ret = _withGlobalCurrentTaskMeta({
    componentIdx: task.componentIdx(),
    taskID: task.id(),
    fn: () => now$1()
  })
  ;
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
  _debugLog('[iface="wasi:clocks/wall-clock@0.2.12", function="now"][Instruction::Return]', {
    funcName: 'now',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline55.fnName = 'wasi:clocks/wall-clock@0.2.12#now$1';
let exports2;
let run020Run;

function run() {
  _debugLog('[iface="wasi:cli/run@0.2.0", function="run"][Instruction::CallWasm] enter', {
    funcName: 'run',
    paramCount: 0,
    async: false,
    postReturn: false,
  });
  const hostProvided = false;
  
  const [task, _wasm_call_currentTaskID] = createNewCurrentTask({
    componentIdx: 0,
    isAsync: false,
    isManualAsync: false,
    entryFnName: 'run020Run',
    getCallbackFn: () => null,
    callbackFnName: 'null',
    errHandling: 'throw-result-err',
    callingWasmExport: true,
  });
  
  const started = task.enterSync();
  let ret =   _withGlobalCurrentTaskMeta({
    taskID: task.id(),
    componentIdx: task.componentIdx(),
    fn: () => run020Run(),
  });
  
  let variant0;
  switch (ret) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  _debugLog('[iface="wasi:cli/run@0.2.0", function="run"][Instruction::Return]', {
    funcName: 'run',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  const retCopy = variant0;
  task.resolve([retCopy.val]);
  task.exit();
  
  if (typeof retCopy === 'object' && retCopy.tag === 'err') {
    throw new ComponentError(retCopy.val);
  }
  return retCopy.val;
  
}
let trampoline0 = _trampoline0.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 0,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline0.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatU64],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline0,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 0,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline0.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatU64],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline0,
},
);
let trampoline1 = _trampoline1.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 1,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline1.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 4)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline1,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 1,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline1.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 4)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline1,
},
);
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (Fields[symbolCabiDispose]) {
      Fields[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline3 = _trampoline3.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 3,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline3.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ],
  resultLowerFns: [_lowerFlatOwn.bind(null, 5)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline3,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 3,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline3.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ],
  resultLowerFns: [_lowerFlatOwn.bind(null, 5)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline3,
},
);
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline5(handle) {
  const handleEntry = rscTableRemove(handleTable6, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable6.delete(handleEntry.rep);
    } else if (OutgoingBody[symbolCabiDispose]) {
      OutgoingBody[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline6 = _trampoline6.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 6,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline6.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 7)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline6,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 6,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline6.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 7)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline6,
},
);
let trampoline7 = _trampoline7.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 7,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline7.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7),_liftFlatOption([
  ['none', null, 16, 8, 8 ],
  ['some', _liftFlatU64, 16, 8, 8 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline7,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 7,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline7.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7),_liftFlatOption([
  ['none', null, 16, 8, 8 ],
  ['some', _liftFlatU64, 16, 8, 8 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline7,
},
);
function trampoline8(handle) {
  const handleEntry = rscTableRemove(handleTable7, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable7.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable7.delete(handleEntry.rep);
    } else if (RequestOptions[symbolCabiDispose]) {
      RequestOptions[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline9(handle) {
  const handleEntry = rscTableRemove(handleTable5, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (OutgoingRequest[symbolCabiDispose]) {
      OutgoingRequest[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline10 = _trampoline10.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 10,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline10.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline10,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 10,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline10.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline10,
},
);
let trampoline11 = _trampoline11.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 11,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline11.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 0)],
  resultLowerFns: [],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline11,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 11,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline11.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 0)],
  resultLowerFns: [],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline11,
},
);
function trampoline12(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline13(handle) {
  const handleEntry = rscTableRemove(handleTable8, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable8.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable8.delete(handleEntry.rep);
    } else if (FutureIncomingResponse[symbolCabiDispose]) {
      FutureIncomingResponse[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline14 = _trampoline14.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 14,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline14.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatU16],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline14,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 14,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline14.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatU16],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline14,
},
);
let trampoline15 = _trampoline15.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 15,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline15.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 4)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline15,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 15,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline15.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 4)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline15,
},
);
function trampoline16(handle) {
  const handleEntry = rscTableRemove(handleTable9, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable9.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable9.delete(handleEntry.rep);
    } else if (IncomingResponse[symbolCabiDispose]) {
      IncomingResponse[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline17(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline18(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline19(handle) {
  const handleEntry = rscTableRemove(handleTable10, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable10.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable10.delete(handleEntry.rep);
    } else if (IncomingBody[symbolCabiDispose]) {
      IncomingBody[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline20(handle) {
  const handleEntry = rscTableRemove(handleTable11, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable11.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable11.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline21(handle) {
  const handleEntry = rscTableRemove(handleTable12, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable12.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable12.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline22 = _trampoline22.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 22,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline22.manuallyAsync,
  paramLiftFns: [_liftFlatResult([['ok', null, 0, 0, 0],['err', null, 0, 0, 0],])],
  resultLowerFns: [],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline22,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 22,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline22.manuallyAsync,
  paramLiftFns: [_liftFlatResult([['ok', null, 0, 0, 0],['err', null, 0, 0, 0],])],
  resultLowerFns: [],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline22,
},
);
let trampoline23 = _trampoline23.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 23,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline23.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline23,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 23,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline23.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline23,
},
);
let trampoline24 = _trampoline24.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 24,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline24.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline24,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 24,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline24.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline24,
},
);
let trampoline25 = _trampoline25.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 25,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline25.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 3)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline25,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 25,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline25.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 3)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline25,
},
);
let trampoline26 = _trampoline26.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 26,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline26.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline26,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 26,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline26.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline26,
},
);
let trampoline27 = _trampoline27.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 27,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline27.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline27,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 27,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline27.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn.bind(null, 2)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline27,
},
);
let trampoline28 = _trampoline28.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 28,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline28.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatU64],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline28,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 28,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline28.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatU64],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline28,
},
);
let trampoline29 = _trampoline29.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 29,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline29.manuallyAsync,
  paramLiftFns: [_liftFlatU64],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline29,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 29,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline29.manuallyAsync,
  paramLiftFns: [_liftFlatU64],
  resultLowerFns: [_lowerFlatOwn.bind(null, 0)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  getMemoryFn: () => null,
  getReallocFn: () => null,
  importFn: _trampoline29,
},
);
let trampoline30 = _trampoline30.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 30,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline30.manuallyAsync,
  paramLiftFns: [_liftFlatList({ elemLiftFn: _liftFlatTuple([[_liftFlatStringUTF8, 16, 4],[_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 }), 16, 4],]), align32: 4, size32: 16 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 4), 8, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'invalid-syntax', null, 1, 1, 1 ],[ 'forbidden', null, 1, 1, 1 ],[ 'immutable', null, 1, 1, 1 ],]), 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline30,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 30,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline30.manuallyAsync,
  paramLiftFns: [_liftFlatList({ elemLiftFn: _liftFlatTuple([[_liftFlatStringUTF8, 16, 4],[_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 }), 16, 4],]), align32: 4, size32: 16 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 4), 8, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'invalid-syntax', null, 1, 1, 1 ],[ 'forbidden', null, 1, 1, 1 ],[ 'immutable', null, 1, 1, 1 ],]), 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline30,
},
);
let trampoline31 = _trampoline31.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 31,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline31.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatVariant([['get', null, 0, 0, 0],['head', null, 0, 0, 0],['post', null, 0, 0, 0],['put', null, 0, 0, 0],['delete', null, 0, 0, 0],['connect', null, 0, 0, 0],['options', null, 0, 0, 0],['trace', null, 0, 0, 0],['patch', null, 0, 0, 0],['other', _liftFlatStringUTF8, 12, 4, 4],])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline31,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 31,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline31.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatVariant([['get', null, 0, 0, 0],['head', null, 0, 0, 0],['post', null, 0, 0, 0],['put', null, 0, 0, 0],['delete', null, 0, 0, 0],['connect', null, 0, 0, 0],['options', null, 0, 0, 0],['trace', null, 0, 0, 0],['patch', null, 0, 0, 0],['other', _liftFlatStringUTF8, 12, 4, 4],])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline31,
},
);
let trampoline32 = _trampoline32.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 32,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline32.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 16, 4, 4 ],
  ['some', _liftFlatVariant([['HTTP', null, 0, 0, 0],['HTTPS', null, 0, 0, 0],['other', _liftFlatStringUTF8, 12, 4, 4],]), 16, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline32,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 32,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline32.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 16, 4, 4 ],
  ['some', _liftFlatVariant([['HTTP', null, 0, 0, 0],['HTTPS', null, 0, 0, 0],['other', _liftFlatStringUTF8, 12, 4, 4],]), 16, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline32,
},
);
let trampoline33 = _trampoline33.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 33,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline33.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 12, 4, 4 ],
  ['some', _liftFlatStringUTF8, 12, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline33,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 33,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline33.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 12, 4, 4 ],
  ['some', _liftFlatStringUTF8, 12, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline33,
},
);
let trampoline34 = _trampoline34.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 34,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline34.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 12, 4, 4 ],
  ['some', _liftFlatStringUTF8, 12, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline34,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 34,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline34.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5),_liftFlatOption([
  ['none', null, 12, 4, 4 ],
  ['some', _liftFlatStringUTF8, 12, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 1, 1, 1 ],[ 'err', null, 1, 1, 1 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline34,
},
);
let trampoline35 = _trampoline35.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 35,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline35.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 6), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline35,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 35,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline35.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 5)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 6), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline35,
},
);
let trampoline36 = _trampoline36.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 36,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline36.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 6)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 2), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline36,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 36,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline36.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 6)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 2), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline36,
},
);
let trampoline37 = _trampoline37.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 37,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline37.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ,_liftFlatOption([
  ['none', null, 8, 4, 4 ],
  ['some', _liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  , 8, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline37,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 37,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline37.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ,_liftFlatOption([
  ['none', null, 8, 4, 4 ],
  ['some', _liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  , 8, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline37,
},
);
let trampoline38 = _trampoline38.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 38,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline38.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 4)],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 17), typeIdx: 3 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline38,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 38,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline38.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 4)],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 17), typeIdx: 3 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline38,
},
);
let trampoline39 = _trampoline39.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 39,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline39.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 10), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline39,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 39,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline39.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 9)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 10), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline39,
},
);
let trampoline40 = _trampoline40.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 40,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline40.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 10)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 3), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline40,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 40,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline40.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 10)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 3), 8, 4, 4 ],[ 'err', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline40,
},
);
let trampoline41 = _trampoline41.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 41,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline41.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatResult([[ 'ok', _lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 9), 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],]), 48, 8, 8 ],[ 'err', null, 48, 8, 8 ],]), 56, 8, 8 ],[ 'none', null, 56, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline41,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 41,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline41.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatResult([[ 'ok', _lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 9), 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],]), 48, 8, 8 ],[ 'err', null, 48, 8, 8 ],]), 56, 8, 8 ],[ 'none', null, 56, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline41,
},
);
let trampoline42 = _trampoline42.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 42,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline42.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2),_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline42,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 42,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline42.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2),_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline42,
},
);
let trampoline43 = _trampoline43.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 43,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline43.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3),_liftFlatU64],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline43,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 43,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline43.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3),_liftFlatU64],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline43,
},
);
let trampoline44 = _trampoline44.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 44,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline44.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ,_liftFlatOption([
  ['none', null, 8, 4, 4 ],
  ['some', _liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  , 8, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 8), 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline44,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 44,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline44.manuallyAsync,
  paramLiftFns: [_liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  ,_liftFlatOption([
  ['none', null, 8, 4, 4 ],
  ['some', _liftFlatOwn({
    componentIdx: 0,
    className: null,
    createResourceFn: () => { throw new Error('invalid/missing resource type data'); },
  })
  , 8, 4, 4 ],
  ])],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatOwn.bind(null, 8), 40, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'DNS-timeout', null, 32, 8, 8 ],[ 'DNS-error', _lowerFlatRecord.bind(null, [['rcode', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],['infoCode', _lowerFlatOption([[ 'some', _lowerFlatU16, 4, 2, 2 ],[ 'none', null, 4, 2, 2 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'destination-not-found', null, 32, 8, 8 ],[ 'destination-unavailable', null, 32, 8, 8 ],[ 'destination-IP-prohibited', null, 32, 8, 8 ],[ 'destination-IP-unroutable', null, 32, 8, 8 ],[ 'connection-refused', null, 32, 8, 8 ],[ 'connection-terminated', null, 32, 8, 8 ],[ 'connection-timeout', null, 32, 8, 8 ],[ 'connection-read-timeout', null, 32, 8, 8 ],[ 'connection-write-timeout', null, 32, 8, 8 ],[ 'connection-limit-reached', null, 32, 8, 8 ],[ 'TLS-protocol-error', null, 32, 8, 8 ],[ 'TLS-certificate-error', null, 32, 8, 8 ],[ 'TLS-alert-received', _lowerFlatRecord.bind(null, [['alertId', _lowerFlatOption([[ 'some', _lowerFlatU8, 2, 1, 1 ],[ 'none', null, 2, 1, 1 ],]), 16, 4 ],['alertMessage', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 16, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-denied', null, 32, 8, 8 ],[ 'HTTP-request-length-required', null, 32, 8, 8 ],[ 'HTTP-request-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-request-method-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-invalid', null, 32, 8, 8 ],[ 'HTTP-request-URI-too-long', null, 32, 8, 8 ],[ 'HTTP-request-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-header-size', _lowerFlatOption([[ 'some', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 24, 4, 4 ],[ 'none', null, 24, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-request-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-incomplete', null, 32, 8, 8 ],[ 'HTTP-response-header-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-header-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-body-size', _lowerFlatOption([[ 'some', _lowerFlatU64, 16, 8, 8 ],[ 'none', null, 16, 8, 8 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-section-size', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-trailer-size', _lowerFlatRecord.bind(null, [['fieldName', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 20, 4 ],['fieldSize', _lowerFlatOption([[ 'some', _lowerFlatU32, 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],]), 20, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-transfer-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-content-coding', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],[ 'HTTP-response-timeout', null, 32, 8, 8 ],[ 'HTTP-upgrade-failed', null, 32, 8, 8 ],[ 'HTTP-protocol-error', null, 32, 8, 8 ],[ 'loop-detected', null, 32, 8, 8 ],[ 'configuration-error', null, 32, 8, 8 ],[ 'internal-error', _lowerFlatOption([[ 'some', _lowerFlatStringUTF8, 12, 4, 4 ],[ 'none', null, 12, 4, 4 ],]), 32, 8, 8 ],]), 40, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline44,
},
);
let trampoline45 = _trampoline45.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 45,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline45.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatTuple.bind(null, 47)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline45,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 45,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline45.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatTuple.bind(null, 47)],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline45,
},
);
let trampoline46 = _trampoline46.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 46,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline46.manuallyAsync,
  paramLiftFns: [_liftFlatList({ elemLiftFn: _liftFlatBorrow.bind(null, 0), align32: 4, size32: 4 })],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatU32, typeIdx: 1 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline46,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 46,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline46.manuallyAsync,
  paramLiftFns: [_liftFlatList({ elemLiftFn: _liftFlatBorrow.bind(null, 0), align32: 4, size32: 4 })],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatU32, typeIdx: 1 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline46,
},
);
let trampoline47 = _trampoline47.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 47,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline47.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3),_liftFlatU64],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline47,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 47,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline47.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 3),_liftFlatU64],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatList({ elemLowerFn: _lowerFlatU8, typeIdx: 2 }), 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline47,
},
);
let trampoline48 = _trampoline48.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 48,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline48.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatU64, 16, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 16, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline48,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 48,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline48.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', _lowerFlatU64, 16, 8, 8 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 16, 8, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline48,
},
);
let trampoline49 = _trampoline49.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 49,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline49.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2),_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline49,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 49,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline49.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2),_liftFlatList({ elemLiftFn: _liftFlatU8, align32: 1, size32: 1 })],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline49,
},
);
let trampoline50 = _trampoline50.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 50,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline50.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline50,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 50,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline50.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 2)],
  resultLowerFns: [_lowerFlatResult([[ 'ok', null, 12, 4, 4 ],[ 'err', _lowerFlatVariant([[ 'last-operation-failed', _lowerFlatOwn.bind(null, 1), 8, 4, 4 ],[ 'closed', null, 8, 4, 4 ],]), 12, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline50,
},
);
let trampoline51 = _trampoline51.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 51,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline51.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 43), typeIdx: 4 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline51,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 51,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline51.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({ elemLowerFn: _lowerFlatTuple.bind(null, 43), typeIdx: 4 })],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline51,
},
);
let trampoline52 = _trampoline52.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 52,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline52.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 11), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline52,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 52,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline52.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 11), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline52,
},
);
let trampoline53 = _trampoline53.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 53,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline53.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 12), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline53,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 53,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline53.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 12), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline53,
},
);
let trampoline54 = _trampoline54.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 54,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline54.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 12), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline54,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 54,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline54.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOption([[ 'some', _lowerFlatOwn.bind(null, 12), 8, 4, 4 ],[ 'none', null, 8, 4, 4 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline54,
},
);
let trampoline55 = _trampoline55.manuallyAsync ? new WebAssembly.Suspending(_lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 55,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline55.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatRecord.bind(null, [['seconds', _lowerFlatU64, 16, 8 ],['nanoseconds', _lowerFlatU32, 16, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline55,
},
)) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 55,
  componentIdx: 0,
  isAsync: false,
  isManualAsync: _trampoline55.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatRecord.bind(null, [['seconds', _lowerFlatU64, 16, 8 ],['nanoseconds', _lowerFlatU32, 16, 8 ],])],
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  getMemoryFn: () => memory0,
  getReallocFn: () => null,
  importFn: _trampoline55,
},
);

const $init = (() => {
  let gen = (function* _initGenerator () {
    const module0 = fetchCompile(new URL('./trustee.core.wasm', import.meta.url));
    const module1 = base64Compile('AGFzbQEAAAABNQhgA39/fwBgBH9/f38Bf2AFf39/f38Bf2ACf38AYAR/f39/AGAEf39/fwBgA39+fwBgAX8AAxsaAAECAQEDAwQDAwMDBQYEBwAGAwUDBwcHBwcEBQFwARoaB4QBGwEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXAjI0ABgCMjUAGQgkaW1wb3J0cwEACtcCGg0AIAAgASACQQARAAALDwAgACABIAIgA0EBEQEACxEAIAAgASACIAMgBEECEQIACw8AIAAgASACIANBAxEBAAsPACAAIAEgAiADQQQRAQALCwAgACABQQURAwALCwAgACABQQYRAwALDwAgACABIAIgA0EHEQQACwsAIAAgAUEIEQMACwsAIAAgAUEJEQMACwsAIAAgAUEKEQMACwsAIAAgAUELEQMACw8AIAAgASACIANBDBEFAAsNACAAIAEgAkENEQYACw8AIAAgASACIANBDhEEAAsJACAAQQ8RBwALDQAgACABIAJBEBEAAAsNACAAIAEgAkEREQYACwsAIAAgAUESEQMACw8AIAAgASACIANBExEFAAsLACAAIAFBFBEDAAsJACAAQRURBwALCQAgAEEWEQcACwkAIABBFxEHAAsJACAAQRgRBwALCQAgAEEZEQcACwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjU0LjA');
    const module2 = base64Compile('AGFzbQEAAAABNQhgA39/fwBgBH9/f38Bf2AFf39/f38Bf2ACf38AYAR/f39/AGAEf39/fwBgA39+fwBgAX8AAqIBGwABMAAAAAExAAEAATIAAgABMwABAAE0AAEAATUAAwABNgADAAE3AAQAATgAAwABOQADAAIxMAADAAIxMQADAAIxMgAFAAIxMwAGAAIxNAAEAAIxNQAHAAIxNgAAAAIxNwAGAAIxOAADAAIxOQAFAAIyMAADAAIyMQAHAAIyMgAHAAIyMwAHAAIyNAAHAAIyNQAHAAgkaW1wb3J0cwFwARoaCSABAEEACxoAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGQAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjU0LjA');
    ({ exports: exports0 } = yield instantiateCore(yield module1));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      'wasi:cli/environment@0.2.0': {
        'get-environment': exports0['21'],
      },
      'wasi:cli/exit@0.2.0': {
        exit: trampoline22,
      },
      'wasi:cli/stderr@0.2.0': {
        'get-stderr': trampoline27,
      },
      'wasi:cli/stdin@0.2.0': {
        'get-stdin': trampoline25,
      },
      'wasi:cli/stdout@0.2.0': {
        'get-stdout': trampoline26,
      },
      'wasi:cli/terminal-input@0.2.0': {
        '[resource-drop]terminal-input': trampoline20,
      },
      'wasi:cli/terminal-output@0.2.0': {
        '[resource-drop]terminal-output': trampoline21,
      },
      'wasi:cli/terminal-stderr@0.2.0': {
        'get-terminal-stderr': exports0['24'],
      },
      'wasi:cli/terminal-stdin@0.2.0': {
        'get-terminal-stdin': exports0['22'],
      },
      'wasi:cli/terminal-stdout@0.2.0': {
        'get-terminal-stdout': exports0['23'],
      },
      'wasi:clocks/monotonic-clock@0.2.0': {
        now: trampoline28,
        'subscribe-duration': trampoline29,
      },
      'wasi:clocks/wall-clock@0.2.0': {
        now: exports0['25'],
      },
      'wasi:http/outgoing-handler@0.2.2': {
        handle: exports0['14'],
      },
      'wasi:http/types@0.2.2': {
        '[constructor]fields': trampoline1,
        '[constructor]outgoing-request': trampoline3,
        '[constructor]request-options': trampoline6,
        '[method]fields.entries': exports0['8'],
        '[method]future-incoming-response.get': exports0['11'],
        '[method]future-incoming-response.subscribe': trampoline10,
        '[method]incoming-body.stream': exports0['10'],
        '[method]incoming-response.consume': exports0['9'],
        '[method]incoming-response.headers': trampoline15,
        '[method]incoming-response.status': trampoline14,
        '[method]outgoing-body.write': exports0['6'],
        '[method]outgoing-request.body': exports0['5'],
        '[method]outgoing-request.set-authority': exports0['3'],
        '[method]outgoing-request.set-method': exports0['1'],
        '[method]outgoing-request.set-path-with-query': exports0['4'],
        '[method]outgoing-request.set-scheme': exports0['2'],
        '[method]request-options.set-connect-timeout': trampoline7,
        '[resource-drop]fields': trampoline2,
        '[resource-drop]future-incoming-response': trampoline13,
        '[resource-drop]incoming-body': trampoline19,
        '[resource-drop]incoming-response': trampoline16,
        '[resource-drop]outgoing-body': trampoline5,
        '[resource-drop]outgoing-request': trampoline9,
        '[resource-drop]request-options': trampoline8,
        '[static]fields.from-list': exports0['0'],
        '[static]outgoing-body.finish': exports0['7'],
      },
      'wasi:io/error@0.2.0': {
        '[resource-drop]error': trampoline17,
      },
      'wasi:io/error@0.2.2': {
        '[resource-drop]error': trampoline17,
      },
      'wasi:io/poll@0.2.0': {
        '[method]pollable.block': trampoline11,
        '[resource-drop]pollable': trampoline12,
        poll: exports0['16'],
      },
      'wasi:io/poll@0.2.2': {
        '[method]pollable.block': trampoline11,
        '[resource-drop]pollable': trampoline12,
      },
      'wasi:io/streams@0.2.0': {
        '[method]input-stream.read': exports0['17'],
        '[method]input-stream.subscribe': trampoline23,
        '[method]output-stream.blocking-flush': exports0['20'],
        '[method]output-stream.check-write': exports0['18'],
        '[method]output-stream.subscribe': trampoline24,
        '[method]output-stream.write': exports0['19'],
        '[resource-drop]input-stream': trampoline18,
        '[resource-drop]output-stream': trampoline4,
      },
      'wasi:io/streams@0.2.2': {
        '[method]input-stream.blocking-read': exports0['13'],
        '[method]output-stream.blocking-write-and-flush': exports0['12'],
        '[resource-drop]input-stream': trampoline18,
        '[resource-drop]output-stream': trampoline4,
      },
      'wasi:random/insecure-seed@0.2.12': {
        'insecure-seed': exports0['15'],
      },
      'wasi:random/random@0.2.12': {
        'get-random-u64': trampoline0,
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports1.cabi_realloc;
    
    try {
      realloc0Async = WebAssembly.promising(exports1.cabi_realloc);
    } catch(err) {
      realloc0Async = exports1.cabi_realloc;
    }
    
    ({ exports: exports2 } = yield instantiateCore(yield module2, {
      '': {
        $imports: exports0.$imports,
        '0': trampoline30,
        '1': trampoline31,
        '10': trampoline40,
        '11': trampoline41,
        '12': trampoline42,
        '13': trampoline43,
        '14': trampoline44,
        '15': trampoline45,
        '16': trampoline46,
        '17': trampoline47,
        '18': trampoline48,
        '19': trampoline49,
        '2': trampoline32,
        '20': trampoline50,
        '21': trampoline51,
        '22': trampoline52,
        '23': trampoline53,
        '24': trampoline54,
        '25': trampoline55,
        '3': trampoline33,
        '4': trampoline34,
        '5': trampoline35,
        '6': trampoline36,
        '7': trampoline37,
        '8': trampoline38,
        '9': trampoline39,
      },
    }));
    run020Run = exports1['wasi:cli/run@0.2.0#run'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;
const run020 = {
  run: run,
  
};

export { run020 as run, run020 as 'wasi:cli/run@0.2.0',  }