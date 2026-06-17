import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
} from 'react-aria-components';
import type { ProtonicModalProps } from './Modal.types';

// Protonic calls this "Modal" — React Aria calls it "Dialog inside a Modal".
// The naming difference is intentional: Dialog = content, Modal = the overlay mechanism.
// We expose one <Modal> component that bundles both.

export function Modal({ title, children, ...props }: ProtonicModalProps) {
  return (
    <ModalOverlay {...props}>
      <AriaModal>
        {/* Dialog provides the focus trap and aria-modal="true" automatically */}
        <Dialog>
          {({ close }) => (
            <>
              <Heading slot="title">{title}</Heading>
              {children}
              <button onClick={close}>Close</button>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

// DialogTrigger re-exported so consumers don't need to import from react-aria-components
export { DialogTrigger as ModalTrigger };
