import { Model } from 'react-model';
import firebase from 'firebase';

interface State {
  isReady: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: firebase.User;
}

interface Action {
  setReady: boolean;
  setLoadingState: boolean;
  setAuthState: {
    isAuthenticated: boolean;
    currentUser: firebase.User;
  }
}

const AppModel: ModelType<State, Action> = {
  state: {
    isReady: false,
    isLoading: false,
    isAuthenticated: false,
    currentUser: null
  },
  actions: {
    setReady: (isReady) => {
      return state => {
        state.isReady = isReady;
        return state;
      }
    },
    setLoadingState: (isLoading) => {
      return state => {
        state.isLoading = isLoading;
        return state;
      }
    },
    setAuthState: (authState) => {
      return state => {
        Object.assign(state, authState);
        return state;
      };
    }
  }
};

export default Model(AppModel)
