import React from 'react';
import { Page, Navbar, List, ListItem } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Page name="catalog">
        <Navbar title="Catalog" />
      </Page>
    );
  }
}