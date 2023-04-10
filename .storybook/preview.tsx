import React from 'react';
import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import '../src/index.scss';
import { store } from '../src/app/store';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default preview;
