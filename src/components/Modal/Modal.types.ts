import type { DialogProps, ModalOverlayProps } from 'react-aria-components';

export interface ProtonicModalProps extends ModalOverlayProps {
  title: string;
  children: React.ReactNode;
}

export interface ProtonicDialogProps extends DialogProps {
  title: string;
  children: React.ReactNode;
}
