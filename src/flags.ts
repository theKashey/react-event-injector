let passiveSupported = false;

if (typeof window !== 'undefined') {
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return true;
      }
    } as any;

    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}

export const isPassiveSupported = passiveSupported;