import React, { ReactElement } from 'react';
import './App.scss';
import { Button } from '@cezembre/ui';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Button size="medium" shape="square" buttonStyle="outlined">
        Hello World !
      </Button>
    </div>
  );
}
