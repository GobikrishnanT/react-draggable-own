import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
 
const Button = (props : {disabled : boolean}) => {
  const {disabled} = props;
  return (
    <button disabled={disabled}>Click me</button>
  )
}
 
const meta: Meta<typeof Button> = {
  component: Button,
};
 
export default meta;
type Story = StoryObj<typeof Button>;
 
export const Primary: Story = {
  args: {
    disabled : true
  },
};