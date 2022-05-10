import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor } from 'react';
import Table, { Column } from '../../src/data/table';
import { Model } from '@cezembre/fronts';

interface Props {
  active?: boolean;
}

export default {
  title: 'Data/Table',
  component: Table,
  argTypes: {
    active: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<JSXElementConstructor<Props>>;

interface Data extends Model {
  name?: string;
  age?: number;
}

const columns: Column<Data>[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

const data: Data[] = [
  {
    id: '1',
    name: 'John',
    age: 42,
  },
  {
    id: '2',
    name: 'David',
    age: 50,
  },
];

const Template: ComponentStory<JSXElementConstructor<Props>> = ({ active }: Props) => (
  <Table<Data> columns={columns} data={data} />
);

export const Default = Template.bind({});

Default.args = {};
