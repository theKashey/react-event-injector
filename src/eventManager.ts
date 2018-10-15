import {isPassiveSupported} from "./flags";
import {addEventListener, removeEventListener} from "./eventListeners";

type Hash = { [key: string]: any | undefined };
type Callback = (name: string, propertyName: string, options: AddEventListenerOptions) => any;

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

export const forEventsIn = (names: string[], cb: Callback) => {
  names.forEach(name => {
    const lowerName = name.toLowerCase();
    const capture = lowerName.substr(-7) === 'capture';
    let eventName = lowerName.substring(2);
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    cb(eventName, name, capture ? WITH_CAPTURE : {});
  });
};

export const attach = (ref: EventTarget, names: string[], props: Hash, settings: Hash) => {
  forEventsIn(
    names,
    (name, propertyName, options) => addEventListener(ref, name, props[propertyName], asOption({...settings, ...options}))
  );
};

export const detach = (ref: EventTarget, names: string[], props: Hash, settings: Hash) => {
  forEventsIn(
    names,
    (name, propertyName, options) => removeEventListener(ref, name, props[propertyName], asOption({...settings, ...options}))
  );
};