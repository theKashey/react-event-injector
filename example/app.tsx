import * as React from 'react';
import {Component} from 'react';
import {EventInjector, PassiveListener, TargetedInjector} from "../src";

class Switcher extends React.Component<{}, { enabled: boolean }> {
  state = {
    enabled: true
  };

  onClick = () => this.setState(({enabled}) => ({enabled: !enabled}));

  render() {
    return (
      <div>
        <button onClick={this.onClick}>{this.state.enabled ? 'hide' : 'show'}</button>
        {this.state.enabled
          ? this.props.children
          : 'hidden'
        }
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Switcher>
          <div><h2>PassiveListener</h2>
            <PassiveListener
              onClick={() => console.log('passive.click')}
            >
              <button>passive button</button>
            </PassiveListener>
          </div>
        </Switcher>

        <Switcher>
          <div><h2>Injector</h2>
            <EventInjector
              onClick={() => console.log('injector.click')}
            >
              <button>injected button</button>
            </EventInjector>
          </div>
        </Switcher>

        <Switcher>
          <div><h2>TargetedListener</h2>
            <PassiveListener
              onWheel={() => console.log('passive-top-targeted.wheel')}
              onKeyDown={() => console.log('passive-top-targeted.key-down')}
            >
              <PassiveListener
                onClick={() => console.log('passive-targeted.click')}
              >
                <TargetedInjector
                  onClick={() => console.log('targeted.click')}
                  target={() => document.querySelector('#target-button')}
                />
              </PassiveListener>
            </PassiveListener>
            <button id="target-button">target button</button>
          </div>
        </Switcher>
      </div>
    )
  }
}