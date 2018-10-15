import * as React from 'react';
import {EventInjector, InjectorProps} from "./Injector";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type TargetedProps<T> = Omit<InjectorProps<T>, 'children'> & {
  target: (() => EventTarget | null) | EventTarget | null;
  children?: never;
}

export class TargetedInjector<T extends EventTarget> extends React.Component<TargetedProps<T>> {
  componentDidMount(){
    // schedule an update;
    this.setState({});
  }

  render() {
    const {target, ...rest} = this.props;

    return (
      <EventInjector
        {...rest}
      >
        {ref => {
          ref(typeof target === 'function' ? target() : target);
          return null;
        }}
      </EventInjector>
    );
  }
}