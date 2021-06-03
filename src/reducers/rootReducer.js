import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import tickerReducer from "./tickerReducer";
import tradeReducer from "./tradeReducer";
export default combineReducers({
    bookReducer,
    tickerReducer,
    tradeReducer
});
