import React from 'react';
import {
  App,
  Views,
  View,
  Toolbar,
  Link,
} from 'framework7-react';

import routes from '../js/routes';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        name: 'PerPay', // App name
        theme: 'ios', // Automatic theme detection
        // App root data
        data: function () {
          return {};
        },

        // App routes
        routes: routes,
      },
      isLogined: false
    }
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      // Call F7 APIs here
    });
  }

  render() {
    const { isLogined } = this.state;

    return (
      <App params={this.state.f7params} >
        {
          !isLogined ? (
            <View id="view-login" name="login" url="/login"></View>
          ) : (
              <Views tabs className="safe-areas">
                <Toolbar tabbar labels bottom>
                  <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="f7:house_fill" text="Home" />
                  <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
                  <Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
                </Toolbar>

                <View id="view-home" main tab tabActive url="/" />
                <View id="view-catalog" name="catalog" tab url="/catalog/" />
                <View id="view-settings" name="settings" tab url="/settings/" />
              </Views>
            )
        }
      </App>
    )
  }
}