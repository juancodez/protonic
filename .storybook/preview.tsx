import type { Preview } from '@storybook/react-vite';
import '../src/tokens/theme.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: {
      test: 'error', // fail on a11y violations — this is a React Aria system, it should be clean
    },
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream',  value: '#fff8f1' },
        { name: 'white',  value: '#ffffff' },
        { name: 'dark',   value: '#1e1b17' },
      ],
    },
  },
};

export default preview;
