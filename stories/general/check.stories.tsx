import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor } from 'react';
import Check from '../../src/general/check';

interface Props {
  active?: boolean;
}

export default {
  title: 'General/Check',
  component: Check,
  argTypes: {
    active: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<JSXElementConstructor<Props>>;

const Template: ComponentStory<JSXElementConstructor<Props>> = ({ active }: Props) => (
  <Check active={active} />
);

export const Default = Template.bind({});

Default.args = {};
