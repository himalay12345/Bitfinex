import React, { useMemo } from "react";
import { useSelector } from "react-redux";
const Ticker = () => {
    const { last_price, daily_change, daily_change_relative, volume,high,low } = useSelector(
        (state) => state.tickerReducer.ticker
    );
    const last_price_memo = useMemo(() => last_price?.toFixed(0), [
        last_price,
    ]);
    const daily_change_memo = useMemo(() => daily_change?.toFixed(0), [
        daily_change,
    ]);
    const daily_change_relative_memo = useMemo(
        () => (Math.abs(daily_change_relative) * 100)?.toFixed(2),
        [daily_change_relative]
    );
    const volume_memo = useMemo(() => 
        (volume * last_price)
    ?.toFixed(0), [volume, last_price])
    return (
        <div className="box" style={{backgroundColor:'#2f3538',color:'white'}}>
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64" style={{height:'40px',width:'40px'}}>
                        <img
                            src="https://static.bitfinex.com/images/icons/BTC-alt.svg"
                            alt="Image"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <div className="columns is-multiline">
                            <div className="column py-0 is-half">
                                <h3 style={{color:'white'}}>BTC/USD</h3>
                            </div>
                            <div className="column py-0 is-half">
                                <h4>{last_price_memo}</h4>
                            </div>
                            <div className="column py-0 is-half" style={{fontSize:'0.8rem'}}>
                                Volume:<span style={{textDecoration:'underline'}}>{volume_memo} USD</span>
                            </div>
                            <div className={`column py-0 is-half ${daily_change_relative >= 0 ? 'has-text-success':'has-text-danger'}`}>
                                {daily_change_memo} {daily_change_relative >= 0?<i className="fas fa-angle-up"></i>:<i className="fas fa-angle-up"></i>} ({daily_change_relative_memo}
                                %)
                            </div>
                            <div className="column py-0 is-half">
                                High: {high}
                            </div>
                            <div className="column py-0 is-half">
                                Low: {low}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Ticker;
