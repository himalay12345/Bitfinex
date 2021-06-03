const get_updated_ticker = (trade, payload) => {
    let [chanId, data] = payload;
    let [
        bid,
        bid_size,
        ask,
        ask_size,
        daily_change,
        daily_change_relative,
        last_price,
        volume,
        high,
        low,
    ] = data;

    return {
        bid,
        bid_size,
        ask,
        ask_size,
        daily_change,
        daily_change_relative,
        last_price,
        volume,
        high,
        low,
    };
};

export default (state = { ticker: {} }, action) => {
    switch (action.type) {
        case "UPDATE_TICKER": {
            let ticker = get_updated_ticker(state.ticker, action.payload);
            return {
                ...state,
                ticker,
            };
        }

        default:
            return state;
    }
};
