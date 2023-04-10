import { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../components/Loader';
import { LoaderSize } from '../types/LoaderSize';

export default {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      description: 'Choose a size',
      defaultValue: LoaderSize.M,
    },
    color: {
      control: 'color',
      description: 'Choose a color',
    },
  },
} as Meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: LoaderSize.S,
  },
};

export const MediumRed: Story = {
  args: {
    size: LoaderSize.M,
    color: 'red',
  },
};

export const LargeBlue: Story = {
  args: {
    size: LoaderSize.L,
    color: 'blue',
  },
};
