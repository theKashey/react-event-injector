import * as React from 'react';
import {attach, detach, getEventNames} from "./eventManager";

export type CallbackRef = (ref: EventTarget | null) => any;
type RenderCallback = (ref: CallbackRef) => React.ReactNode | null;

export type InjectorProps<T> = {
  children: React.ReactElement<any> | RenderCallback;
  settings?: { passive?: boolean, capture?: boolean };
  pure?: any;
} & React.DOMAttributes<T>;


export class EventInjector<T extends EventTarget> extends React.Component<InjectorProps<T>> {
  ref: EventTarget | null = null;

  componentWillUnmount() {
    if (this.ref) {
      detach(this.ref, getEventNames(this.props), this.props, this.props.settings);
    }
  }

  componentDidUpdate(oldProps: InjectorProps<T>) {
    const {props} = this;
    const {pure} = props;
    if (pure && pure === oldProps.pure) {
      return;
    }

    const {settings: oldSettings = {}} = oldProps;
    const toRemove = getEventNames(oldProps).filter(name => oldProps[name] !== props[name] && oldProps[name]);
    if (this.ref) {
      detach(this.ref, toRemove, oldProps, oldSettings);
    }

    const {settings = {}} = this.props;
    const toAdd = getEventNames(props).filter(name => oldProps[name] !== props[name] && props[name]);
    if (this.ref) {
      attach(this.ref, toAdd, props, settings);
    }
  }

  setRef = (ref: EventTarget | null) => {
    const {settings = {}} = this.props;
    if(ref !== this.ref) {
      if (this.ref) {
        detach(this.ref, getEventNames(this.props), this.props, settings);
      }
      this.ref = ref;
      if (this.ref) {
        attach(this.ref, getEventNames(this.props), this.props, settings);
      }
    }
  };

  render() {
    const {children} = this.props;
    return typeof children === 'function'
      ? children(this.setRef)
      : React.cloneElement(React.Children.only(children), {ref: this.setRef})
  }
}