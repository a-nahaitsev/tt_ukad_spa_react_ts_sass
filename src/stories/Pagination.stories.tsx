import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/Pagination';
import { PaginationItemForm } from '../types/PaginationItemForm';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: { type: 'boolean' },
      description: 'With background of without?',
      defaultValue: false,
    },
    form: {
      control: { type: 'radio' },
      description: 'Round or Square?',
      defaultValue: PaginationItemForm.Round,
    },
    isSearchedProducts: {
      control: { type: 'boolean' },
    },
    initialPage: {
      control: { type: 'number' },
    },
  },
} as Meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const Square: Story = {
  args: {
    form: PaginationItemForm.Square,
  },
};

export const FilledRound: Story = {
  args: {
    background: true,
  },
};

export const FilledSquare: Story = {
  args: {
    background: true,
    form: PaginationItemForm.Square,
  },
};
