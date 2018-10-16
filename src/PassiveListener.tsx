import * as React from 'react';
import {EventInjector, InjectorProps} from "./Injector";
import {eventTypes} from "./propTypes";

const PASSIVE = {passive: true};

export class PassiveListener<T extends EventTarget> extends React.Component<InjectorProps<T>> {
  static propTypes = {
    ...eventTypes,
  };
  ref = React.createRef<EventTarget>();

  addEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    if(this.ref.current) {
      this.ref.current.addEventListener(name, cb, options);
    }
  };

  removeEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    if(this.ref.current) {
      this.ref.current.removeEventListener(name, cb, options);
    }
  };

  render() {
    return (
      <EventInjector
        {...this.props}
        settings={PASSIVE}
        ref={this.ref as any}
      />
    );
  }
}