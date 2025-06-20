import { Tooltip, Grow } from '@mui/material';
// import { watchlist } from "../data/data";
import { useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import { KeyboardArrowDown } from '@mui/icons-material';
import {BarChart} from '@mui/icons-material';
import {ExpandMore,Search} from '@mui/icons-material';



const WatchList = () => {
    return (<div className="watchlist-container" >
        <div className="search-container">
            <Search/>
            <input type="text" name="search" className="search" placeholder="Search (infy bse, nifty fut, etc)"/>
            <span className="counts">{Watchlist.length}/50</span>
        </div>
        <ul className="list">
            {watchlist.map((stock, index) => {
                return <WatchListItem stock={stock} key={index} />;

            })}

        </ul>
    </div>);
}
export default WatchList;

const WatchListItem = ({ stock }) => {
    const [showwatchListActions, setshowwatchListActions] = useState(false);
    const handleMouseEnter = (e) => {

        setshowwatchListActions(true);
    }
    const handleMouseExit = (e) => {
        setshowwatchListActions(false);
    }
    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            <div className='item'>
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className='itemInfo'>
                    <span className='percent'>{stock.percent}</span>
                    {stock.isDown ? (<KeyboardArrowDown className="down" />) : (<KeyboardArrowUp className="up" />)}
                    <span className='price'>{stock.price}</span>
                </div>
            </div>
            {showwatchListActions && <WatchListAction uid={stock.name}/>}
        </li>
    )
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

//watchList Action Toolbar

    return <span className='actions'>
        <span >
            <Tooltip title="Buy(B)" placement='top' arrow  >
                <button className='buy'>Buy</button>
            </Tooltip>
             <Tooltip title="Sell(S)" placement='top' arrow > onClick={handleBuyClick}
                <button className='sell'>Sell</button>
            </Tooltip>
             <Tooltip title="Graph(G)" placement='top' arrow >
              <button className='icons'>|||</button>
            </Tooltip>
            <Tooltip title="More(M) " placement='top' arrow >
               <button className='icons'>...</button>
            </Tooltip>
         
        </span>
    </span>

}
