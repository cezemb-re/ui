import React, { ReactElement, useState } from 'react';
import './App.scss';
import { Table, Button, Overlay, IconName } from '@cezembre/ui';

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
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  return (
    <div className="App">
      <div className="header">
        <Button
          buttonStyle="text"
          leftIcon={IconName.ARROW}
          leftIconRotation={180}
          onClick={() => {
            setVisible(true);
            setClosed(false);
          }}>
          Oui
        </Button>
      </div>

      <div style={{ position: 'relative' }}>
        <Overlay visible={visible} closed={closed}>
          <Button
            buttonStyle="text"
            onClick={() => {
              setVisible(false);
              setClosed(true);
            }}>
            Close
          </Button>
        </Overlay>
      </div>

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
