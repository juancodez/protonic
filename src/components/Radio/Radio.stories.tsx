import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, Radio } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title:     'Protonic/Radio',
  component: RadioGroup,
  tags:      ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid:  { control: 'boolean' },
    orientation:{ control: 'select', options: ['vertical', 'horizontal'] },
  },
  args: { label: 'Tipo de autónomo' },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const Options = () => (
  <>
    <Radio value="freiberufler">Freiberufler</Radio>
    <Radio value="gewerbetreibender">Gewerbetreibender</Radio>
    <Radio value="kleinunternehmer">Kleinunternehmer</Radio>
  </>
);

export const Default:      Story = { render: (args) => <RadioGroup {...args}><Options /></RadioGroup> };
export const WithDefault:  Story = { render: (args) => <RadioGroup {...args} defaultValue="freiberufler"><Options /></RadioGroup> };
export const Horizontal:   Story = { render: (args) => <RadioGroup {...args} orientation="horizontal"><Options /></RadioGroup> };
export const Disabled:     Story = { render: (args) => <RadioGroup {...args} isDisabled><Options /></RadioGroup> };
export const Error:        Story = { render: (args) => <RadioGroup {...args} isInvalid errorMessage="Selecciona una opción."><Options /></RadioGroup> };
export const WithDesc:     Story = { render: (args) => <RadioGroup {...args} description="Esto afecta a tu declaración de impuestos."><Options /></RadioGroup> };
