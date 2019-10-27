import { Model } from 'react-model';
import firebase from 'firebase';

interface State {
  profile: any;
}

interface Action {
  setProfile: any;
}

const AppModel: ModelType<State, Action> = {
  state: {
    profile: {}
  },
  actions: {
    setProfile: (profile) => {
      return state => {
        state.profile = profile;
        return state;
      }
    }
  }
};

export default Model(AppModel)
