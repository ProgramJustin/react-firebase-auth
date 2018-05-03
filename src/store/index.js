// I am in control of the app state, I am also connected to redux
import { createStore } from 'redux';
import rootReducer from './reducers';

// the store is instiated and connected to the rootReducer
// rootReducer controls the actions being sent to the store
const store = createStore(rootReducer);

export default store;
