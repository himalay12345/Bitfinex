import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

function OrderBookRow({ index, book_type = "ask_book", chartType = "commutative" }) {
  
    const count = useSelector(
        (state) => state.bookReducer[book_type][index]?.count
    );
    const amount = useSelector(
        (state) => state.bookReducer[book_type][index]?.amount
    );
    const total = useSelector(
        (state) => state.bookReducer[book_type][index]?.total
    );
    const price = useSelector(
        (state) => state.bookReducer[book_type][index]?.price
    );


    let per = useMemo(()=>
    chartType === "commutative" ? 'c_percentage' : 'percentage', [chartType]);
    const percentage = useSelector(
        (state) => state.bookReducer[book_type][index]?.[per]
    );

    const bg =
        book_type === "bid_book"
            ? `linear-gradient(to right, white ${percentage}% ${
                  100 - percentage
              }%, var(--green) 0% ${percentage}%)`
            : `linear-gradient(to right, var(--red) 0% ${percentage}%, white ${percentage}% ${
                  100 - percentage
              }%)`;
    if (!count)
        return <div className="column is-half is-flex p-0"></div>;
    return (
        <div
            className="column is-half is-flex p-0 bgload"
            style={{
                background: bg,
                color:'black'
            }}
        >
            {book_type === "bid_book" ? (
                <>
                    <div className="col" style={{fontSize:'0.8rem'}}>{count}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{amount}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{total}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{price}</div>
                </>
            ) : (
                <>
                    <div className="col" style={{fontSize:'0.8rem'}}>{price}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{Math.abs(total)}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{Math.abs(amount)}</div>
                    <div className="col" style={{fontSize:'0.8rem'}}>{count}</div>
                </>
            )}
        </div>
    );
}

export default OrderBookRow;
