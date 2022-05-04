import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, Field } from '@cezembre/forms';
import { JSXElementConstructor } from 'react';
import DatePicker from '../../src/fields/datePicker';

interface Props {
  label?: string;
}

export default {
  title: 'Fields/DatePicker',
  component: DatePicker,
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
    <Field name="date-picker" component={DatePicker} label={label} />
  </Form>
);

export const Default = Template.bind({});

Default.args = {};
