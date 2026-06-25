import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title:     'Protonic/Toast',
  component: Toast,
  tags:      ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'warning', 'error', 'info'], description: 'Status axis (axes registry: status)' },
  },
  args: { status: 'info', title: 'Operación completada' },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info:    Story = { args: { status: 'info',    title: 'Datos actualizados',      message: 'Los cambios se han guardado correctamente.' } };
export const Success: Story = { args: { status: 'success', title: 'Declaración enviada',      message: 'Tu declaración ha llegado a la Agencia Tributaria.' } };
export const Warning: Story = { args: { status: 'warning', title: 'Fecha límite próxima',     message: 'Tienes 3 días para presentar tu IVA trimestral.' } };
export const Error:   Story = { args: { status: 'error',   title: 'Error al guardar',          message: 'Comprueba tu conexión e inténtalo de nuevo.' } };
export const Dismissible: Story = { args: { status: 'success', title: 'Guardado', onDismiss: () => {} } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toast status="info"    title="Info"    message="Mensaje informativo." />
      <Toast status="success" title="Éxito"   message="Operación completada." />
      <Toast status="warning" title="Aviso"   message="Revisa este dato." />
      <Toast status="error"   title="Error"   message="Algo salió mal." onDismiss={() => {}} />
    </div>
  ),
};
