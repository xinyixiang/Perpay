import { Model } from 'react-model'

const AppModel = {
  state: {
    isAuthenticated: false
  },
  actions: {
    setState: (state) => {
      return newState => {
        Object.assign(newState, state);
        return newState;
      }
    }
  }
};

export default Model(AppModel);