import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import DataInterpreter from "./DataInterpreter";
import * as bulmaToast from 'bulma-toast'

const SYMBOL = "tBTCUSD";
const SUBSCRIPTION_PAYLOADS = [
    {
        event: "subscribe",
        channel: "book",
        symbol: SYMBOL,
        frequency: "F1",
        prec: "p1",
    },
    {
        event: "subscribe",
        channel: "trades",
        symbol: SYMBOL,
        frequency: "F1",
    },
    {
        event: "subscribe",
        channel: "ticker",
        symbol: SYMBOL,
        prec: "p1",
    },
];
export const WsWrapper = ({ children }) => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl] = useState("wss://api-pub.bitfinex.com/ws/2");
    const { sendMessage, lastMessage, readyState, } = useWebSocket(socketUrl,{
        onOpen: () => {
            bulmaToast.toast({ message: 'WebSocket Connected', type: 'is-success' })
        },
        shouldReconnect: (closeEvent) => {
            bulmaToast.toast({ message: 'Reconnecting', type: 'is-warning' })
            return true
        },
    });

    const connectChannels = useCallback(() => {
        SUBSCRIPTION_PAYLOADS.map((config) => {
            sendMessage(JSON.stringify(config));
        });
    }, []);

    const disconnectChannels = () => {};
    useEffect(() => {
        connectChannels();
        return () => {
            disconnectChannels();
        };
    }, []);

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: "Connecting",
    //     [ReadyState.OPEN]: "Open",
    //     [ReadyState.CLOSING]: "Closing",
    //     [ReadyState.CLOSED]: "Closed",
    //     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    // }[readyState];

    return (
        <>
            <DataInterpreter lastMessage={lastMessage}>
                {children}
            </DataInterpreter>
        </>
    );
};

export default WsWrapper;
