import React, { ReactElement } from 'react';
import './App.scss';
import { Button, IconName } from '@cezembre/ui';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Button
        buttonStyle="text"
        shape="square"
        leftIcon={IconName.DASHBOARD}
        size="medium"
        // active
        theme="light">
        Oui
      </Button>
    </div>
  );
}
