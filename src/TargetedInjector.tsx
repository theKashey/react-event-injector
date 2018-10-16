import * as React from 'react';
import {EventInjector, InjectorProps} from "./Injector";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type TargetedProps<T> = Omit<InjectorProps<T>, 'children'> & {
  target: (() => EventTarget | null) | EventTarget | null;
  children?: never;
}

export class TargetedInjector<T extends EventTarget> extends React.Component<TargetedProps<T>> {
  ref = React.createRef<EventTarget>();

  componentDidMount(){
    // schedule an update;
    this.setState({});
  }

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
    const {target, ...rest} = this.props;

    return (
      <EventInjector
        {...rest}
        ref={this.ref as any}
      >
        {ref => {
          ref(typeof target === 'function' ? target() : target);
          return null;
        }}
      </EventInjector>
    );
  }
}