import { Link } from "react-router-dom";

const Orders=()=> {
   return ( 
      <div className="orders">
         <div className="no-orders">
            <p>You Haven't placed any orders today</p>
            <Link to={"/order"} className="btn">Get Start</Link>
         </div>
      </div>
    );
}

export default Orders;