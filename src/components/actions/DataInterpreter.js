import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function DataInterpreter({ lastMessage, children }) {
    const channelState = useRef({});
    const dispatch = useDispatch();

    const updateSnapshotTrigger = (message) => {
        let [chanId, data] = message;

        if (channelState.current[chanId].channel === "book") {
            let [price, count, amount] = data;

            /**
             * https://docs.bitfinex.com/reference#ws-public-books
             * from Algorithm to create and keep a book instance updated\
             */
            let action = null;
            if (count > 0) {
                if (amount > 0) {
                    // 3.1 if amount > 0 then add/update bids
                    action = "UPDATE_BID_BOOK";
                } else if (amount < 0) {
                    // 3.2 if amount < 0 then add/update asks
                    action = "UPDATE_ASK_BOOK";
                }
            } else if (count === 0) {
                if (amount == 1) {
                    // 4.1 if amount = 1 then remove from bids
                    action = "REMOVE_BID_BOOK";
                } else if (amount === -1) {
                    // 4.2 if amount = -1 then remove from asks
                    action = "REMOVE_ASK_BOOK";
                }
            }

            /* Dispatch appropriate action for bid/ask book */
            dispatch({
                type: action,
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "trade") {
            dispatch({
                type: "UPDATE_TRADE",
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "ticker") {
            dispatch({
                type: "UPDATE_TICKER",
                payload: message,
            });
        }
    };

    const createSnapshotTrigger = (message) => {
        let chanId = message[0];
        channelState.current[chanId] = {
            ...channelState.current[chanId],
            snapshotLoaded: true,
        };

        // TODO: decide trade or book, using chanId;
        if (channelState.current[chanId].channel === "book") {
            dispatch({
                type: "CREATE_BOOK",
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "trades") {
            dispatch({
                type: "CREATE_TRADE",
                payload: message,
            });
        } else if (channelState.current[chanId].channel === "ticker") {
            dispatch({
                type: "UPDATE_TICKER",
                payload: message,
            });
        }
    };

    useEffect(() => {
        if (lastMessage) {
            let data = JSON.parse(lastMessage.data);
            if (data.event === "subscribed") {
                /* Config */
                let { channel, chanId } = data;
                channelState.current[chanId] = {
                    ...data,
                    snapshotLoaded: false,
                };
            } else {
                /* Data */
                let chanId = data[0];
                if (chanId && channelState.current[chanId]) {
                    if (!channelState.current[chanId].snapshotLoaded) {
                        createSnapshotTrigger(data);
                    } else {
                        updateSnapshotTrigger(data);
                    }
                }
            }
        }
    }, [lastMessage]);
    return <>{children}</>;
}

export default DataInterpreter;
