import System from '@smartface/native/device/system';

const logger = (store) => (next) => (action) => {
  let result = next(action);
  if (System.isEmulator) {
    console.log(`[REDUX] dispatching: ${action.type} : `, {
      type: action.type,
      action,
      nextState: store.getState()
    });
  }
  return result;
};

export default logger;
