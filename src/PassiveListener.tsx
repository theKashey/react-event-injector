import * as React from 'react';
import {EventInjector, InjectorProps} from "./Injector";

const PASSIVE = {passive: true};

export class PassiveListener<T extends EventTarget> extends React.Component<InjectorProps<T>> {
  render() {
    return (
      <EventInjector
        {...this.props}
        settings={PASSIVE}
      />
    );
  }
}