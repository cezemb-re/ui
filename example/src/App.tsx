import { ReactElement, useState } from 'react';
import { Form, Field } from '@cezembre/forms';
import { Table, Button, DataType, Select, Input } from '@cezembre/ui';
import './App.scss';

interface Article {
  id: string;
  date: Date;
  title: string;
  author: string;
  active: boolean;
  description: string;
}

const articles: Article[] = [
  {
    id: '1',
    date: new Date(),
    title: 'Un premier article',
    author: 'Lucien Perouze',
    active: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    date: new Date(),
    title: 'Un deuxième article',
    author: 'Lucien Perouze',
    active: true,
    description: 'Hello World!',
  },
  {
    id: '3',
    date: new Date(),
    title: "L'article du siecle",
    author: 'Lucien Perouze',
    active: false,
    description: 'Une description',
  },
  {
    id: '4',
    date: new Date(),
    title: 'Les articles sont le kiff',
    author: 'Lucien Perouze',
    active: false,
    description: 'Oui ceci est un article',
  },
];

export default function App(): ReactElement {
  const [activeNamespace, setActiveNamespace] = useState(false);
  const [activeLink, setActiveLink] = useState(false);

  return (
    <div className="App">
      <div className="namespaces-menu">
        <Button
          style="namespace"
          fullWidth
          shape="rounded"
          leftIcon="activity"
          active={activeNamespace}
          onClick={() => setActiveNamespace((a) => !a)}>
          Accueil
        </Button>

        <Button
          style="link"
          fullWidth
          shape="rounded"
          paddingLeft={40}
          active={activeLink}
          onClick={() => setActiveLink((a) => !a)}>
          Foot
        </Button>

        <Button style="link" fullWidth shape="rounded" paddingLeft={40} rightIcon="chevron-down">
          Clubs
        </Button>
      </div>

      <div className="container">
        <div className="table">
          <Table<Article>
            columns={[
              {
                key: 'title',
                title: 'Titre',
                width: 300,
              },
              { key: 'date', title: 'Date', width: 200, type: DataType.DATETIME },
              { key: 'author', title: 'Auteur', width: 200 },
              { key: 'active', title: 'Active', width: 100 },
              { key: 'description', title: 'Description' },
            ]}
            data={[]}
            onClickItem={() => null}
          />
        </div>

        <Form className="form">
          <Field component={Input} name="name" label="Nom" />
          <br />
          <br />
          <Field
            component={Select}
            name="test"
            label="Choix"
            options={[
              {
                value: 'pk_01',
                item: 'Key one',
              },
              {
                value: 'pk_02',
                item: 'Key two',
              },
              {
                value: 'pk_03',
                item: 'Key three',
              },
              {
                value: 'pk_04',
                item: 'Key four',
              },
              {
                value: 'pk_05',
                item: 'Key five',
              },
              {
                value: 'pk_06',
                item: 'Key six',
              },
              {
                value: 'pk_07',
                item: 'Key seven',
              },
              {
                value: 'pk_08',
                item: 'Key eight',
              },
              {
                value: 'pk_09',
                item: 'Key nine',
              },
              {
                value: 'pk_10',
                item: 'Key ten',
              },
              {
                value: 'pk_11',
                item: 'Key eleven',
              },
              {
                value: 'pk_12',
                item: 'Key twelve',
              },
              {
                value: 'pk_13',
                item: 'Key thirteen',
              },
              {
                value: 'pk_14',
                item: 'Key fourteen',
              },
              {
                value: 'pk_15',
                item: 'Key fifteen',
              },
              {
                value: 'pk_16',
                item: 'Key sixteen',
              },
              {
                value: 'pk_17',
                item: 'Key seventeen',
              },
              {
                value: 'pk_18',
                item: 'Key eighteen',
              },
              {
                value: 'pk_19',
                item: 'Key nineteen',
              },
              {
                value: 'pk_20',
                item: 'Key twenty',
              },
            ]}
          />
        </Form>
      </div>
    </div>
  );
}
