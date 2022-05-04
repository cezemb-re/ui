import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, Field } from '@cezembre/forms';
import { JSXElementConstructor } from 'react';
import Input, {
  InputShape,
  InputTheme,
  Suggestion,
  SuggestionsNamespace,
} from '../../src/fields/input';

interface Props {
  label?: string;
  shape?: InputShape;
  theme?: InputTheme;
  placeholder?: string;
  show_suggestions?: boolean;
}

export default {
  title: 'Fields/Input',
  component: Input,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    shape: {
      options: ['square', 'round'],
      defaultValue: 'square',
      control: {
        type: 'select',
      },
    },
    theme: {
      options: ['default', 'discreet', 'discreet-light', 'dark'],
      defaultValue: 'default',
      control: {
        type: 'select',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    show_suggestions: {
      name: 'Show suggestions',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<JSXElementConstructor<Props>>;

const playersSuggestions: Suggestion[] = [
  { value: 'Kylian Mbappé' },
  { value: 'Lionel Messi' },
  { value: 'Neymar JR.' },
];
const clubsSuggestions: Suggestion[] = [
  { value: 'PSG' },
  { value: 'Real Madrid' },
  { value: 'FC Nantes' },
];

const suggestionsNamespaces: SuggestionsNamespace[] = [
  { namespace: 'Joueurs', suggestions: playersSuggestions },
  { namespace: 'Clubs', suggestions: clubsSuggestions },
];

const Template: ComponentStory<JSXElementConstructor<Props>> = ({
  label,
  shape,
  theme,
  placeholder,
  show_suggestions,
}: Props) => (
  <Form>
    <Field
      name="input"
      component={Input}
      label={label}
      shape={shape}
      theme={theme}
      placeholder={placeholder}
      suggestions={show_suggestions ? suggestionsNamespaces : undefined}
    />
  </Form>
);

export const Default = Template.bind({});

Default.args = {};
