// import { holdings } from "../data/data";

import { useEffect, useState } from "react";
import axios from 'axios';
import { VerticalGraph } from "./VerticalGraph";

// import { data } from "react-router-dom";

const Holdings = () => {
  const [allHoldings,setallHoldings]=useState([]);

  useEffect(()=>{
    axios.get("https://backendkite.onrender.com/allHoldings").then((res)=>{
      console.log("Fetched Holdings:", res.data);
      setallHoldings(res.data);
    })
 },[]);

//Graph Implimentation
const labels = allHoldings.map((subArray)=>subArray['name']);

const data = {
  labels,
  datasets: [
    {
      label: 'stock Price',
      data: allHoldings.map((stock) =>stock.price ),
      backgroundColor: 'rgba(184, 10, 10, 0.61)',
    },
    
  ],
};

  


  return (<>
    <h1 className="title">Holdings ({allHoldings.length})</h1>

    <div className="order-table">
      <table>
        <thead>
        <tr>
          <th>Instrument</th>
          <th>Qty.</th>
          <th>Avg. cost</th>
          <th>LTP</th>
          <th>Cur. val</th>
          <th>P&L</th>
          <th>Net chg.</th>
          <th>Day chg.</th>
        </tr></thead>
        <tbody>
        {allHoldings.map((stock, index) => {
          const curValue = stock.price * stock.qty;
          const isProfit = curValue - stock.avg * stock.qty >= 0.0;
          const profitClass = isProfit ? "profit" : "loss";
          const dayClass = stock.isLoss ? "loss" : "profit";

          return(
        
          <tr key={index} >
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg.toFixed(2)}</td>
            <td>{stock.price.toFixed(2)}</td>
            <td>{curValue.toFixed(2)}</td>
            <td className={profitClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
            <td className={profitClass}>{stock.net}</td>
            <td className={dayClass}>{stock.day}</td>
          </tr>
         
          )

          })
        }
     </tbody>
    </table>
  </div>
  {Array.isArray(allHoldings) && allHoldings.length > 0 && <VerticalGraph data={data}/>}
    </>
  );
};


export default Holdings;