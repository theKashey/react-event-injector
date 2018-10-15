<div align="center">
  <h1>💉 React-Event-Injector‍</h1>
  <br/>
  <a href="https://secure.travis-ci.org/theKashey/react-event-injector">
     <img src="https://secure.travis-ci.org/theKashey/react-event-injector.svg" alt="Build status">
  </a>
  
  <a href="https://www.npmjs.com/package/react-event-injector">
   <img src="https://img.shields.io/npm/v/react-event-injector.svg?style=flat-square" />
  </a>
  
  <br/>  
</div>  

-----
Declarative React event manager, slim as 1kb.

# API
There is 3 Components, exported from this package
- `EventInjector` - to inject events somewhere down the tree
- `PassiveListener` - to inject "passive" events, which could be quite useful to make application run smoothly.
- `TargetedInjector` - to inject events to the specific target.

All components will add events on `mount`, remove on `unmount`, and update changed on `update` if `pure` is not set.

# Why
- 😀 to inject passive events. There is no way to inject them in "react-way".
- 😀 to inject events where you need, without relaying on bubbling or capturing or some react details.
- ☹️ to get native DOM event, not React.Synthetic

## Injection API

### Children as React Element
You may provide a single __tag__, as a children, or use `forwardRef` to forward ref to the proper target.
```js
import {EventInjector} from 'react-event-injector';
<EventInjector onClick={event}>
 <div>It will inject onClick on me, please pass a SINGLE and HTML tag inside injector</div>
</EventInjector> 
```

### Children as RenderProp
You may provide a single __tag__, as a children, or use `forwardRef` to forward ref to the proper target.
```js
import {EventInjector} from 'react-event-injector';
<EventInjector onClick={event}>
 { setRef => (
 <div ref={setRef}>
   It will inject onClick on me</div>
 }  
</EventInjector> 
```

`EventInjector` and `PassiveListener` has the same API, and accept only `children` and any on-`event`, or on-`event`-Capture, as any HTML tag does. 

## TargetedInjector
- Inject events to any `target` provided:
```js
import {TargetedInjector} from 'react-event-injector';
<TargetedInjector 
onClick={event}
target={this.ref}
>  
``` 
- You may use function as a target
```js
import {TargetedInjector} from 'react-event-injector';
<TargetedInjector 
onClick={event}
target={() => document.querySelector('#element-i-need')}
>  
``` 
In the case of a function, `target` would be executed twice - on componentDidMount, and right after it,
 thus it will be able to inject events to sibling elements, not existing on mount.



# Inspiration
- `TargetedInjector` is quite similar to [react-event-listener](https://github.com/oliviertassinari/react-event-listener).
- `PassiveListener` is quite similar to [default-passive-events](https://github.com/zzarcon/default-passive-events)

# Licence
MIT

