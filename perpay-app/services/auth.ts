import firebase from 'firebase';
import { Alert } from 'react-native';
import { createUser } from './user';

export default class Auth {
  static isAuthenticated = false;
  static currentUser: firebase.User;

  static async subscribe() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
          this.currentUser = user;
        } else {
          this.isAuthenticated = false;
        }
        resolve();
      });
    });
  }

  static async login(email: string, password: string, phoneNumber: string) {
    await firebase.auth().setPersistence('local');

    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      await createUser(user.uid, phoneNumber);
      this.isAuthenticated = true;
      this.currentUser = user;
    } catch (error) {
      if (error.code.includes('not-found')) {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await createUser(user.uid, phoneNumber);
        this.isAuthenticated = true;
        this.currentUser = user;
      } else {
        throw error;
      }
    }
  }

  static async logout() {
    await firebase.auth().signOut();
  }
}