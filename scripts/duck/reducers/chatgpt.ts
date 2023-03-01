import * as ACTIONS from 'duck/actions';
import { SET_API_KEY } from 'duck/actions';

type ChatGPT = {
  API_KEY: string;
};

const initialState: ChatGPT = {
  API_KEY: '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'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_API_KEY:
      return setApiKey(state, action);
    default:
      return state;
  }
}

function setApiKey(state: ChatGPT, action: ReturnType<typeof ACTIONS.setApiKey>): ChatGPT {
  const newState = Object.assign({}, state);
  newState.API_KEY = action.apiKey;
  return newState;
}
