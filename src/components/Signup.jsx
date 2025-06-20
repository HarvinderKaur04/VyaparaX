import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast } from "react-toastify";

function Signup() {
 const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
       "https://backendkite.onrender.com/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="wrapper-signups mt-5 mb-5">
       <h1> Signup on Kite </h1>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            name="username"
            value={username}
            className="form-control"
            placeholder="Your Name"
            required
            autoComplete="username"
            onChange={handleOnChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Email"
            required
            autoComplete="email"
            onChange={handleOnChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Password"
            required
            autoComplete="new-password"
            onChange={handleOnChange}
          />
        </div>

        <div className="col-12 text-center">
          <button className="button" type="submit">
            Submit
          </button>
          <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        </div>
     
      </form>
    </div>
  );
}

export default Signup;
