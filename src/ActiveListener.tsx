import * as React from 'react';
import {EventInjector, InjectorProps} from "./Injector";
import {eventTypes} from "./propTypes";

const ACTIVE = {passive: false};

export class ActiveListener<T extends EventTarget> extends React.Component<InjectorProps<T>> {
  static propTypes = {
    ...eventTypes,
  };

  ref = React.createRef<EventTarget>();

  addEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    if (this.ref.current) {
      this.ref.current.addEventListener(name, cb, options);
    }
  };

  removeEventListener = (name: string, cb: any, options: boolean | AddEventListenerOptions) => {
    if (this.ref.current) {
      this.ref.current.removeEventListener(name, cb, options);
    }
  };

  render() {
    return (
      <EventInjector
        {...this.props}
        settings={ACTIVE}
        ref={this.ref as any}
      />
    );
  }
}