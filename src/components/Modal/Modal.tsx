import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
} from 'react-aria-components';
import { Button } from '../Button';
import type { ProtonicModalProps } from './Modal.types';
import styles from './Modal.module.css';

export function Modal({ title, children, role = 'dialog', ...props }: ProtonicModalProps) {
  return (
    <ModalOverlay className={styles.overlay} {...props}>
      <AriaModal className={styles.modal}>
        <Dialog role={role} className={styles.dialog}>
          {({ close }) => (
            <>
              <Heading slot="title" className={styles.title}>
                {title}
              </Heading>
              <div className={styles.body}>{children}</div>
              <div className={styles.footer}>
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
