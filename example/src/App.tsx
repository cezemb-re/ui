import { ReactElement, useState } from 'react';
import { Form, Field } from '@cezembre/forms';
import { Table, Button, DataType, Select, Input } from '@cezembre/ui';
import './App.scss';

interface Article {
  id: string;
  date?: Date;
  title?: string;
  author?: { name: string };
  active?: boolean;
  description?: string;
  likes?: number;
}

const articles: Article[] = [
  {
    id: '1',
    date: new Date(),
    title: 'Un premier article',
    author: { name: 'Lucien Perouze' },
    active: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 42,
  },
  {
    id: '2',
    date: new Date(),
    title: 'Un deuxième article',
    author: { name: 'Lucien Perouze' },
    active: true,
    description: 'Hello World!',
    likes: 42,
  },
  {
    id: '3',
    date: new Date(),
    title: "L'article du siecle",
    author: { name: 'Lucien Perouze' },
    active: false,
    description: 'Une description',
    likes: 42,
  },
  {
    id: '4',
    date: new Date(),
    title: 'Les articles sont le kiff',
    author: { name: 'Lucien Perouze' },
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
                label: 'Titre',
              },
              { key: 'date', label: 'Date', type: DataType.DATETIME },
              {
                key: 'authosr',
                label: 'Author',
                Cell: ({ item: { author } }) => <p>Auteur: {author?.name}</p>,
              },
              { key: 'active', label: 'Active' },
              { key: 'likes', label: 'Likes' },
            ]}
            data={articles}
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
            ]}
          />
        </Form>
      </div>
    </div>
  );
}
