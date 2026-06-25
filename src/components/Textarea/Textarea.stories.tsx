import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title:     'Protonic/Textarea',
  component: Textarea,
  tags:      ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isInvalid:  { control: 'boolean' },
    isRequired: { control: 'boolean' },
    rows:       { control: 'number' },
  },
  args: { label: 'Descripción del gasto', placeholder: 'Ej: Material de oficina para clientes…' },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default:        Story = {};
export const WithDescription:Story = { args: { description: 'Máximo 500 caracteres.' } };
export const Error:          Story = { args: { isInvalid: true, errorMessage: 'Campo obligatorio.' } };
export const Disabled:       Story = { args: { isDisabled: true, value: 'Valor bloqueado' } };
export const Tall:           Story = { args: { rows: 8 } };
