import {func, bool, shape, node, oneOfType} from 'prop-types';

export const injectorTypes = {
  children: oneOfType([node, func]),
  pure: bool,
  settings: shape({
    passive: bool,
    capture: bool
  })
};

export const eventTypes =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
// Clipboard Events
      onCopy: func,
      onCopyCapture: func,
      onCut: func,
      onCutCapture: func,
      onPaste: func,
      onPasteCapture: func,

// Composition Events
      onCompositionEnd: func,
      onCompositionEndCapture: func,
      onCompositionStart: func,
      onCompositionStartCapture: func,
      onCompositionUpdate: func,
      onCompositionUpdateCapture: func,

// Focus Events
      onFocus: func,
      onFocusCapture: func,
      onBlur: func,
      onBlurCapture: func,

// Form Events
      onChange: func,
      onChangeCapture: func,
      onInput: func,
      onInputCapture: func,
      onReset: func,
      onResetCapture: func,
      onSubmit: func,
      onSubmitCapture: func,
      onInvalid: func,
      onInvalidCapture: func,

// Image Events
      onLoad: func,
      onLoadCapture: func,
      onError: func, // also a Media Event
      onErrorCapture: func, // also a Media Event

// Keyboard Events
      onKeyDown: func,
      onKeyDownCapture: func,
      onKeyPress: func,
      onKeyPressCapture: func,
      onKeyUp: func,
      onKeyUpCapture: func,

// Media Events
      onAbort: func,
      onAbortCapture: func,
      onCanPlay: func,
      onCanPlayCapture: func,
      onCanPlayThrough: func,
      onCanPlayThroughCapture: func,
      onDurationChange: func,
      onDurationChangeCapture: func,
      onEmptied: func,
      onEmptiedCapture: func,
      onEncrypted: func,
      onEncryptedCapture: func,
      onEnded: func,
      onEndedCapture: func,
      onLoadedData: func,
      onLoadedDataCapture: func,
      onLoadedMetadata: func,
      onLoadedMetadataCapture: func,
      onLoadStart: func,
      onLoadStartCapture: func,
      onPause: func,
      onPauseCapture: func,
      onPlay: func,
      onPlayCapture: func,
      onPlaying: func,
      onPlayingCapture: func,
      onProgress: func,
      onProgressCapture: func,
      onRateChange: func,
      onRateChangeCapture: func,
      onSeeked: func,
      onSeekedCapture: func,
      onSeeking: func,
      onSeekingCapture: func,
      onStalled: func,
      onStalledCapture: func,
      onSuspend: func,
      onSuspendCapture: func,
      onTimeUpdate: func,
      onTimeUpdateCapture: func,
      onVolumeChange: func,
      onVolumeChangeCapture: func,
      onWaiting: func,
      onWaitingCapture: func,

// MouseEvents
      onClick: func,
      onClickCapture: func,
      onContextMenu: func,
      onContextMenuCapture: func,
      onDoubleClick: func,
      onDoubleClickCapture: func,
      onDrag: func,
      onDragCapture: func,
      onDragEnd: func,
      onDragEndCapture: func,
      onDragEnter: func,
      onDragEnterCapture: func,
      onDragExit: func,
      onDragExitCapture: func,
      onDragLeave: func,
      onDragLeaveCapture: func,
      onDragOver: func,
      onDragOverCapture: func,
      onDragStart: func,
      onDragStartCapture: func,
      onDrop: func,
      onDropCapture: func,
      onMouseDown: func,
      onMouseDownCapture: func,
      onMouseEnter: func,
      onMouseLeave: func,
      onMouseMove: func,
      onMouseMoveCapture: func,
      onMouseOut: func,
      onMouseOutCapture: func,
      onMouseOver: func,
      onMouseOverCapture: func,
      onMouseUp: func,
      onMouseUpCapture: func,

// Selection Events
      onSelect: func,
      onSelectCapture: func,

// Touch Events
      onTouchCancel: func,
      onTouchCancelCapture: func,
      onTouchEnd: func,
      onTouchEndCapture: func,
      onTouchMove: func,
      onTouchMoveCapture: func,
      onTouchStart: func,
      onTouchStartCapture: func,

// Pointer Events
      onPointerDown: func,
      onPointerDownCapture: func,
      onPointerMove: func,
      onPointerMoveCapture: func,
      onPointerUp: func,
      onPointerUpCapture: func,
      onPointerCancel: func,
      onPointerCancelCapture: func,
      onPointerEnter: func,
      onPointerEnterCapture: func,
      onPointerLeave: func,
      onPointerLeaveCapture: func,
      onPointerOver: func,
      onPointerOverCapture: func,
      onPointerOut: func,
      onPointerOutCapture: func,
      onGotPointerCapture: func,
      onGotPointerCaptureCapture: func,
      onLostPointerCapture: func,
      onLostPointerCaptureCapture: func,

// UI Events
      onScroll: func,
      onScrollCapture: func,

// Wheel Events
      onWheel: func,
      onWheelCapture: func,

// Animation Events
      onAnimationStart: func,
      onAnimationStartCapture: func,
      onAnimationEnd: func,
      onAnimationEndCapture: func,
      onAnimationIteration: func,
      onAnimationIterationCapture: func,

// Transition Events
      onTransitionEnd: func,
      onTransitionEndCapture: func,
    };