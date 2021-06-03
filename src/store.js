import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

import { composeWithDevTools } from 'redux-devtools-extension';

/* TODO: check if dev env, then only apply redux devtool  */
const store = createStore(rootReducer, composeWithDevTools() );
export default store;