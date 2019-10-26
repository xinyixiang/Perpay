import React from 'react';
import { Page, Navbar, NavTitleLarge, List, ListInput, BlockTitle, ListButton, Button, Block } from 'framework7-react';
import firebase from 'firebase';

export default class extends React.Component {
  state = {
    phoneNumber: '',
    code: ''
  };

  componentDidMount() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        this.sendCode();
      },
    });
  }

  sendCode = async () => {
    try {
      this.confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber('+1' + this.state.phoneNumber, this.recaptchaVerifier)
    } catch (error) {
      console.warn(error);
    }
  }

  login = async () => {
    try {

    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    return (
      <Page name="login">
        <Navbar large>
          <NavTitleLarge>PerPay</NavTitleLarge>
        </Navbar>
        <BlockTitle>Set up your account</BlockTitle>
        <List noHairlines style={{ marginBottom: '15px' }}>
          <ListInput
            type="text"
            placeholder="Your phone number"
            info="We will send a verification code to you"
            clearButton
            value={this.state.phoneNumber}
            onChange={event => this.setState({ phoneNumber: event.target.value })}
            onInputClear={() => this.setState({ phoneNumber: '' })}
          />
          <ListButton
            title="Send Verification Code"
            onClick={this.sendCode}
          />
        </List>
        <form style={{ display: 'flex', justifyContent: 'center' }}>
          <div id="recaptcha-container"></div>
          <input style={{ display: 'none' }} type="submit" onSubmit={event => event.preventDefault()}></input>
        </form>
        <List noHairlines style={{ marginTop: '15px' }}>
          <ListInput
            type="text"
            placeholder="Verification Code"
            clearButton
            value={this.state.code}
            onChange={event => this.setState({ code: event.target.value })}
            onInputClear={() => this.setState({ code: '' })}
          />
        </List>
        <Block>
          <Button fill large>Sign in</Button>
        </Block>
      </Page>
    )
  }
}