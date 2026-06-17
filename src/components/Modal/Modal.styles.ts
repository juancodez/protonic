// ponytail: Modal has no CVA variants yet — role prop is passed directly to Dialog
// This file exists per the component contract; extend with cva() when Modal gains a size axis.
export const modalStyles = {
  overlay: 'protonic-modal-overlay',
  modal:   'protonic-modal',
  dialog:  'protonic-dialog',
} as const;
