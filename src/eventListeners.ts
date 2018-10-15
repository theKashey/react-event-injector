export const addEventListener = (ref: EventTarget, name: string, cb: any, options: boolean | AddEventListenerOptions) => {
  cb && ref.addEventListener(name, cb, options)
};

export const removeEventListener = (ref: EventTarget, name: string, cb: any, options: boolean | AddEventListenerOptions) => {
  cb && ref.removeEventListener(name, cb, options)
};
