
import { useEffect, useState } from "react";
import axios from 'axios';
import { PositionChart } from "./PositionChart";


const Positions = () => {
  const [allPositions,setallPositions]=useState([]);

  useEffect(()=>{
    axios.get("https://backendkite.onrender.com/allPositions").then((res)=>{
      setallPositions(res.data);
    })


  },[]);


///Graph Chart
const labels = allPositions.map((subArray)=>subArray['name']);

const data = {
  labels,
  datasets: [
    {
      label: 'stock Price',
      data: allPositions.map((stock) =>stock.price ),
      backgroundColor: 'rgba(2, 9, 68, 0.61)',
    },
    
  ],
};

  




   return (<>
       <h1 className="title">({allPositions.length})</h1>
      <div className="order-table">
      <table><thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
               <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
              </thead>
              <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profitClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";
      
                return(
                <tr key={index} >
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                 
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
          <div className="mt-5 mb-5">
         {Array.isArray(allPositions) && allPositions.length > 0 && <PositionChart  data={data}/>}
          </div>
          </>
    );
}

export default Positions;