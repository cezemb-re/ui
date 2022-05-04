import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, Field } from '@cezembre/forms';
import { JSXElementConstructor } from 'react';
import Checkbox from '../../src/fields/checkbox';

interface Props {
  label?: string;
}

export default {
  title: 'Fields/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<JSXElementConstructor<Props>>;

const Template: ComponentStory<JSXElementConstructor<Props>> = ({ label }: Props) => (
  <Form>
    <Field<boolean | undefined> name="checkbox" component={Checkbox} label={label} />
  </Form>
);

export const Default = Template.bind({});

Default.args = {};
