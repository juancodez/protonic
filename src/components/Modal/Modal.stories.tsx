import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Modal, ModalTrigger } from './Modal';

const meta: Meta = {
  title: 'Protonic/Modal',
  tags:  ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Modal wraps React Aria's Dialog + ModalOverlay.

**A11y inherited from React Aria (free):**
- Focus moves inside modal on open
- Tab is trapped — cannot reach content behind the modal
- Escape closes it
- Focus returns to the trigger on close
- \`aria-modal="true"\` and \`aria-labelledby\` wired to the title automatically
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal title="Confirm action">
        <p>This is the modal body. Try pressing Tab — focus cannot leave.</p>
        <p>Press Escape or Close to dismiss. Focus returns to the button.</p>
      </Modal>
    </ModalTrigger>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="secondary">Open long modal</Button>
      <Modal title="Terms and conditions">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i}>
            Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </Modal>
    </ModalTrigger>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ModalTrigger>
      <Button variant="destructive">Delete account</Button>
      <Modal title="Delete your account?">
        <p>This action cannot be undone. All your data will be permanently removed.</p>
      </Modal>
    </ModalTrigger>
  ),
};
