import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Childpop from "./Childpop";
import ChildLogin from "./ChildLogin";

const Menu = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyCookie = async () => {
      if (!cookies.token) {
        return navigate("/login");
      }

      try {
        const { data } = await axios.post(
          "https://backendkite.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (isMounted) {
          setUsername(user);
          if (status) {
            toast(`Hello ${user}`, {
              position: "top-right",
            });
          } else {
            removeCookie("token");
            navigate("/login");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Verification failed:", error);
          removeCookie("token");
          navigate("/login");
        }
      }
    };

    verifyCookie();

    return () => {
      isMounted = false;
    };
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const Pshow = () => (
    <div
      className="childpop-dropdown"
      style={{
        position: 'absolute',
        top: '100px',
        right: '20px',
        zIndex: 999,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '30px',
      }}
    >
      <ChildLogin />
    </div>
  );

  const Item = () => (
    <div
      className="childpop-dropdown"
      style={{
        position: 'absolute',
        top: '120%',
        right: 0,
        zIndex: 999,
        minWidth: '700px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderLeft: '7px solid rgb(240, 84, 11)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '10px',
      }}
    >
      <Childpop />
    </div>
  );

  return (
    <div className="menu-container">
      <div>
        <img
          src="images/kite-logo.svg"
          alt="logo"
          style={{ height: "30px", width: "50px" }}
        />
      </div>

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/bids" onClick={() => handleMenuClick(4)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Bids</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(5)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li   className="profile" style={{ position: 'relative'}} >
            <Link onClick={() => setShowItem(!showItem)} style={{ textDecoration: "none" }}  >
              <i className="fa-regular fa-bell avatar"></i>
            </Link>
            {showItem && <Item />}
          </li>
        </ul>

        <div className="profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <div className="avatar">
            <i className="fa-solid fa-user" alt="Profile"></i>
           
          </div>
          <p className="username">{username}</p>
          <button onClick={logout} className="btn-menu">
            LOGOUT
          </button>
        </div>

        {isProfileOpen && <Pshow />}
      </div>
    </div>
  );
};

export default Menu;
