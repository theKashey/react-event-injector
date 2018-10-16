import * as React from 'react';
import {mount} from 'enzyme';
import {EventInjector, PassiveListener, TargetedInjector} from "../src";

//jest.mock('../src/eventListeners');

describe('Specs', () => {
  it.skip('smoke', () => {
    const spy = jest.fn();
    const wrapper = mount(<EventInjector onClick={spy}>
      <button>press</button>
    </EventInjector>);
    //wrapper.find('button').simulate('click');
    document.body.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });

  it('target', () => {
    const spy = jest.fn();
    const wrapper = mount(<TargetedInjector onClick={spy} target={document.body}/>);
    document.body.click();
    expect(spy).toHaveBeenCalled();
    document.body.click();
    expect(spy).toHaveBeenCalledTimes(2);
    wrapper.unmount();
    document.body.click();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('target nested', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const wrapper = mount(<PassiveListener onClick={spy}><TargetedInjector target={document.body}/></PassiveListener>);
    document.body.click();
    expect(spy).toHaveBeenCalled();
    document.body.click();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy2).toHaveBeenCalledTimes(0);
    wrapper.setProps({onClick: spy2});
    document.body.click();
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(2);
    wrapper.unmount();
    document.body.click();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('target update', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    const wrapper = mount(<TargetedInjector target={document.body}/>);

    wrapper.setProps({onClick: spy1});
    document.body.click();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(0);

    wrapper.setProps({onClick: spy2});
    document.body.click();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);

    wrapper.setProps({onClick: null});
    document.body.click();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    document.body.click();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  })
});
