import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, Field } from '@cezembre/forms';
import { JSXElementConstructor } from 'react';
import DateTimePicker from '../../src/fields/dateTimePicker';

interface Props {
  label?: string;
}

export default {
  title: 'Fields/DateTimePicker',
  component: DateTimePicker,
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
    <Field name="date-time-picker" component={DateTimePicker} label={label} />
  </Form>
);

export const Default = Template.bind({});

Default.args = {};
