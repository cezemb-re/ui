import React, { ReactElement } from 'react';
import './App.scss';
import { Avatar } from '@cezembre/ui';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Avatar
        size="large"
        type="project"
        image="https://i.pravatar.cc/150"
        name="John Doe"
        badgeImage="https://i.pravatar.cc/800"
        badgeName="Alice Durant"
      />
    </div>
  );
}
