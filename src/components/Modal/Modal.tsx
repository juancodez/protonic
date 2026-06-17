import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
} from 'react-aria-components';
import { Button } from '../Button';
import type { ProtonicModalProps } from './Modal.types';
import './Modal.css';

export function Modal({ title, children, role = 'dialog', ...props }: ProtonicModalProps) {
  return (
    <ModalOverlay className="protonic-modal-overlay" {...props}>
      <AriaModal className="protonic-modal">
        <Dialog role={role} className="protonic-dialog">
          {({ close }) => (
            <>
              <Heading slot="title" className="protonic-dialog__title">
                {title}
              </Heading>
              <div className="protonic-dialog__body">{children}</div>
              <div className="protonic-dialog__footer">
                <Button variant="secondary" size="small" onPress={close}>
                  Close
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

export { DialogTrigger as ModalTrigger };
