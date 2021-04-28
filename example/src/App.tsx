import React, { ReactElement } from 'react';
import './App.scss';
import { Table } from '@cezembre/ui';

interface Article {
  id: string;
  title: string;
  author: string;
  description: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Un premier article',
    author: 'Lucien Perouze',
    description: 'Oui ceci est un article',
  },
  {
    id: '2',
    title: 'Un deuxième article',
    author: 'Lucien Perouze',
    description: 'Hello World!',
  },
  {
    id: '3',
    title: "L'article du siecle",
    author: 'Lucien Perouze',
    description: 'Une description',
  },
  {
    id: '4',
    title: 'Les articles sont le kiff',
    author: 'Lucien Perouze',
    description: 'Oui ceci est un article',
  },
];

export default function App(): ReactElement {
  return (
    <div className="App">
      <Table<Article>
        columns={[
          {
            key: 'title',
            title: 'Titre',
          },
          { key: 'author', title: 'Auteur' },
          { key: 'description', title: 'Description' },
        ]}
        data={articles}
        onClickItem={() => null}
      />
    </div>
  );
}
