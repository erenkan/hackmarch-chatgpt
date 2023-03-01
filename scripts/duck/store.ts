import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from './middleware/logger';
import chatGptReducer from './reducers/chatgpt';

const rootReducer = combineReducers({
  chatGPT: chatGptReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));
export default Object.assign({}, store, {
  subscribe: (() => {
    let lastState = {};
    return (f) => {
      return store.subscribe(() => {
        return f();
      });
    };
  })()
});
