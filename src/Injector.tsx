import * as React from 'react';
// @ts-ignore
import * as invariant from 'tiny-invariant';
import {attach, CallEvent, detach, getEventNames} from "./eventManager";
import {eventTypes, injectorTypes} from "./propTypes";

type Hash = { [key: string]: any };
export type CallbackRef = (ref: EventTarget | null) => any;
type RenderCallback = (ref: CallbackRef) => React.ReactNode | null;

export type InjectorProps<T> = {
  children: React.ReactElement<any> | RenderCallback;
  settings?: { passive?: boolean, capture?: boolean };
  pure?: any;
} & React.DOMAttributes<T>;

interface State {
  injectedEvents: CallEvent[];
};

function pick<T extends Hash>(names: Array<keyof T>, data: T, options: any): CallEvent[] {
  return names.reduce((acc, name: string) => {
    acc.push({name, options, cb: data[name]});
    return acc;
  }, [] as CallEvent[]);
}

export class EventInjector<T extends EventTarget> extends React.Component<InjectorProps<T>, State> implements EventTarget {
  static propTypes = {
    ...eventTypes,
    ...injectorTypes,
  };
  ref: EventTarget | null = null;
  state: State = {
    injectedEvents: []
  };

  componentWillUnmount() {
    if (this.ref) {
      detach(this.ref, pick(getEventNames(this.props), this.props, this.props.settings));
      detach(this.ref, this.state.injectedEvents);
    }
  }

  componentDidUpdate(oldProps: InjectorProps<T>, oldState: State) {
    const {props} = this;
    const {pure} = props;

    if (!(pure && pure === oldProps.pure)) {
      const {settings: oldSettings = {}} = oldProps;
      const toRemove = getEventNames(oldProps).filter(name => oldProps[name] !== props[name] && oldProps[name]);
      if (this.ref) {
        detach(this.ref, pick(toRemove, oldProps, oldSettings));
      }

      const {settings = {}} = this.props;
      const toAdd = getEventNames(props).filter(name => oldProps[name] !== props[name] && props[name]);
      if (this.ref) {
        attach(this.ref, pick(toAdd, props, settings));
      }
    }

    if (this.ref) {
      if (oldState !== this.state) {
        const toRemove = oldState.injectedEvents.filter(x => this.state.injectedEvents.indexOf(x) < 0);
        detach(this.ref, toRemove);

        const toAdd = this.state.injectedEvents.filter(x => oldState.injectedEvents.indexOf(x) < 0);
        attach(this.ref, toAdd);
      }
    }
  }

  setRef = (ref: EventTarget | null) => {
    const {settings = {}} = this.props;
    if (ref !== this.ref) {
      if (this.ref) {
        detach(this.ref, pick(getEventNames(this.props), this.props, settings));
        detach(this.ref, this.state.injectedEvents);
      }
      if (ref) {
        invariant(ref.addEventListener, 'React-event-injector: Target should be EventTarget compatible, or any DOM Element');
      }
      this.ref = ref;
      if (this.ref) {
        attach(this.ref, pick(getEventNames(this.props), this.props, settings));
        attach(this.ref, this.state.injectedEvents);
      }
    }
  };

  dispatchEvent = (): boolean => false;

  addEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    const onName = `on${name}`;
    this.setState(({injectedEvents}) => ({
      injectedEvents: [...injectedEvents, {name: onName, cb, options}]
    }))
  };

  removeEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    const onName = `on${name}`;
    this.setState(({injectedEvents}) => ({
      injectedEvents: injectedEvents.filter(c => !(c.name === onName && c.cb === cb && c.options === options))
    }))
  };

  render() {
    const {children} = this.props;
    return typeof children === 'function'
      ? children(this.setRef)
      : React.cloneElement(React.Children.only(children), {ref: this.setRef})
  }
}