import type { DialogProps, ModalOverlayProps } from 'react-aria-components';

export interface ProtonicModalProps extends ModalOverlayProps {
  title: string;
  children: React.ReactNode;
  // alertdialog announces immediately to AT — use for destructive/urgent actions
  role?: 'dialog' | 'alertdialog';
}

export interface ProtonicDialogProps extends DialogProps {
  title: string;
  children: React.ReactNode;
}
