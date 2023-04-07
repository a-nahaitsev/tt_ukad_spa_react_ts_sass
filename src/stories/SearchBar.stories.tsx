import { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../components/SearchBar';
import { SearchIconStyle } from '../types/SearchIconStyle';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    searchIconStyle: {
      control: 'select',
      description: 'Select a type of the icon from the list',
      defaultValue: SearchIconStyle.S0,
    },
  },
} as Meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    searchIconStyle: SearchIconStyle.S0,
    placeholder: 'Search for products',
    query: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeQuery: () => {},
  },
};

export const Style1: Story = {
  args: {
    searchIconStyle: SearchIconStyle.S1,
    placeholder: 'Search...',
    query: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeQuery: () => {},
  },
};

export const Style2: Story = {
  args: {
    searchIconStyle: SearchIconStyle.S2,
    placeholder: 'Input your request',
    query: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeQuery: () => {},
  },
};

export const Style3: Story = {
  args: {
    searchIconStyle: SearchIconStyle.S3,
    placeholder: 'Find...',
    query: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeQuery: () => {},
  },
};

export const Style4: Story = {
  args: {
    searchIconStyle: SearchIconStyle.S4,
    placeholder: 'Find products',
    query: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeQuery: () => {},
  },
};
