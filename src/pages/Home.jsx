import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

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

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page text-center mt-10">
        <h4 className="text-2xl font-semibold">
          Welcome <span className="text-blue-500">{username}</span>
        </h4>
        <button
          onClick={Logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          LOGOUT
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
