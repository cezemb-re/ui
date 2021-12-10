import { ReactElement, useState } from 'react';
import { Form, Field } from '@cezembre/forms';
import {
  Table,
  Textarea,
  Wysiwyg,
  UploadImage,
  Button,
  Select,
  Input,
  Switch,
  Selection,
} from '@cezembre/ui';
import { Model } from '@cezembre/fronts';
import './App.scss';

interface Article extends Model {
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
    id: '1A',
    date: new Date(),
    title: 'Un premier article',
    author: { name: 'Lucien Perouze' },
    active: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 42,
  },
  {
    id: '2B',
    date: new Date(),
    title: 'Un deuxième article',
    author: { name: 'Lucien Perouze' },
    active: true,
    description: 'Hello World!',
    likes: 42,
  },
  {
    id: '3C',
    date: new Date(),
    title: "L'article du siecle",
    author: { name: 'Lucien Perouze' },
    active: false,
    description: 'Une description',
    likes: 42,
  },
  {
    id: '4D',
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
  const [selection, setSelection] = useState<Selection>();

  return (
    <div className="App">
      <div className="namespaces-menu">
        <Button
          styleType="namespace"
          fullWidth
          shape="rounded"
          leftIcon="activity"
          active={activeNamespace}
          onClick={() => setActiveNamespace((a) => !a)}>
          Accueil
        </Button>

        <Button
          styleType="link"
          fullWidth
          shape="rounded"
          paddingLeft={40}
          active={activeLink}
          onClick={() => setActiveLink((a) => !a)}>
          Foot
        </Button>

        <Button
          styleType="link"
          fullWidth
          shape="rounded"
          paddingLeft={40}
          rightIcon="chevron-down">
          Clubs
        </Button>
      </div>

      <div className="container">
        {Array.isArray(selection) ? selection.join(',') : selection}

        <div className="table">
          <Table<Article>
            columns={[
              {
                key: 'title',
                label: 'Titre',
              },
              { key: 'date', label: 'Date', type: 'datetime' },
              {
                key: 'author',
                label: 'Author',
                Cell: ({ item }: { item: Article }) => <p>{item.author?.name}</p>,
              },
              { key: 'active', label: 'Active' },
              { key: 'likes', label: 'Likes' },
            ]}
            data={articles}
            onSelectItem={(_selection: Selection) => setSelection(_selection)}
            selectionMode="multiple"
            itemActions={[
              {
                children: 'Éditer',
                onlySingle: true,
              },
              {
                children: 'Effacer',
              },
            ]}
          />
        </div>

        <Form className="form">
          <Field
            component={Input}
            type="number"
            name="amount"
            label="Montant"
            resolver={(value: number | undefined) =>
              value !== undefined ? value / 1000 : undefined
            }
            format={(value: number | undefined) =>
              value !== undefined ? (value / 1000).toFixed(2) : undefined
            }
            adapter={(value: string) =>
              value.length ? Math.round(Number(value) * 1000) : undefined
            }
          />
          <br />
          <Field component={Input} name="name" label="Nom" />
          <br />
          <Field component={Switch} name="active" label="Actif" />
          <br />
          <Field component={Textarea} name="dff" label="Nom" />
          <br />
          <Field component={Wysiwyg} name="fggf" label="Text" type="paragraph" />
          <br />
          <UploadImage
            label="Illustration"
            width="100%"
            aspectRatio="4:3"
            instructions="L'image ne doit pas excéder 100Mo"
            placeholder
          />
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
