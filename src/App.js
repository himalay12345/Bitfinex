import WsWrapper from "./components/actions/WsWrapper";
import { Provider } from "react-redux";
import store from "./store";
import OrderBookWidget from "./components/OrderBookWidget";
import Ticker from "./components/Ticker";
import "./styles/index.css";
import TradeWidget from "./components/TradeWidget";

function App() {
    return (
        <div className="">
            <Provider store={store}>
                <WsWrapper>
                    <div className="columns">
                    <div className="column is-4">
                            <div className=" columns is-multiline">
                                <div className="column is-full">
                                    <Ticker />
                                </div>
                                <div className="column is-full">
                                    <TradeWidget />
                                </div>
                            </div>
                        </div>
                        <div className="column is-8">
                            <OrderBookWidget />
                        </div>
                        
                    </div>
                </WsWrapper>
            </Provider>
        </div>
    );
}

export default App;
