import {isPassiveSupported} from "./flags";
import {addEventListener, removeEventListener} from "./eventListeners";

type Callback = (name: string, cb: any, options: AddEventListenerOptions, settings: AddEventListenerOptions) => any;
export interface CallEvent {
  name: string,
  cb: any,
  options: boolean | AddEventListenerOptions
};

const EMPTY = {};
const WITH_CAPTURE = {capture: true};
const FLAG_PC = {capture: true, passive: true};
const FLAG_P = {passive: true};
const FLAG_C = {capture: true, passive: false};


const asOption = ({passive, capture}: AddEventListenerOptions): AddEventListenerOptions | boolean => {
  if (!isPassiveSupported) {
    return !!capture;
  }
  if (!passive && !capture) {
    return false;
  }
  if (passive && capture) {
    return FLAG_PC;
  }
  if (passive) {
    return FLAG_P;
  }
  if (passive === false) {
    return FLAG_C;
  }
  return true;
};

export function getEventNames<T extends object>(names: T): Array<keyof T> {
  return Object
    .keys(names)
    .filter(name => name.indexOf('on') === 0) as any;
};

export const forEventsIn = (events: CallEvent[], cb: Callback) => {
  events.forEach(event => {
    const {name} = event;
    const lowerName = name.toLowerCase();
    const capture = lowerName.substr(-7) === 'capture';
    let eventName = lowerName.substring(2);
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    cb(eventName, event.cb, capture ? WITH_CAPTURE : {}, event.options === true ? WITH_CAPTURE : event.options || EMPTY);
  });
};

export const attach = (ref: EventTarget, events: CallEvent[]) => {
  forEventsIn(
    events,
    (name, cb, options, settings) => addEventListener(ref, name, cb, asOption({...settings, ...options}))
  );
};

export const detach = (ref: EventTarget, events: CallEvent[]) => {
  forEventsIn(
    events,
    (name, cb, options, settings) => removeEventListener(ref, name, cb, asOption({...settings, ...options}))
  );
};