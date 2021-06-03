import React, { useMemo, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import OrderBookRow from "./CustomOrderBook";
const ar = [...new Array(25)];

function OrderBookWidget() {
    const key = "total";
    const [chartType, setChartType] = useState("amount");
    const onChangeValue = (e) => {
        setChartType(e.target.value);
    };
    return (
        <div className="box" style={{backgroundColor:'#2f3538',color:'white'}}>
            <p className="has-text-centered mb-3">
                <strong>Order Book</strong>
            </p>
            <div className="columns">
                <div className="column">
                    
                </div>
            </div>
            <div className="">
                <div className="is-flex my-4" >
                    <strong className="col" style={{color:'white'}}>Count</strong>
                    <strong className="col" style={{color:'white'}}>Amount</strong>
                    <strong className="col"style={{color:'white'}} >Total</strong>
                    <strong className="col"style={{color:'white'}} >Total</strong>
                    <strong className="col"style={{color:'white'}}>Price</strong>
                    {/* Second half */}
                    <strong className="col"style={{color:'white'}}>Price</strong>
                    <strong className="col"style={{color:'white'}}>Total</strong>
                    <strong className="col"style={{color:'white'}}>Amount</strong>
                    <strong className="col"style={{color:'white'}}>Count</strong>
                </div>
                {ar.map((elm, index) => (
                    <div className="columns" key={index}>
                        <OrderBookRow
                            book_type="bid_book"
                            index={index}
                            chartType={chartType}
                        />
                        <OrderBookRow
                            book_type="ask_book"
                            index={index}
                            chartType={chartType}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderBookWidget;
