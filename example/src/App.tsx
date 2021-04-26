import React, { ReactElement } from 'react';
import './App.scss';
import { Form, Field } from '@cezembre/forms';
import { Button, Input } from '@cezembre/ui';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Form className="form">
        <div className="field">
          <Field name="email" component={Input} label="Email" />
        </div>

        <div className="submit">
          <Button size="large" shape="square" buttonStyle="filled">
            Hello World !
          </Button>
        </div>
      </Form>
    </div>
  );
}
