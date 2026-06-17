import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
} from 'react-aria-components';
import type { ProtonicModalProps } from './Modal.types';
import './Modal.css';

export function Modal({ title, children, ...props }: ProtonicModalProps) {
  return (
    <ModalOverlay className="protonic-modal-overlay" {...props}>
      <AriaModal className="protonic-modal">
        <Dialog className="protonic-dialog">
          {({ close }) => (
            <>
              <Heading slot="title" className="protonic-dialog__title">
                {title}
              </Heading>
              <div className="protonic-dialog__body">{children}</div>
              <div className="protonic-dialog__footer">
                <button onClick={close} className="protonic-dialog__close">
                  Close
                </button>
              </div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

export { DialogTrigger as ModalTrigger };
