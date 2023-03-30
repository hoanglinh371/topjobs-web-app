import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import axiosClient from "../../api/axios.client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", data.data.token);
      alert("Log in Successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-96 mx-auto border py-8 px-6">
      <p className="text-center text-2xl font-bold">Login</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Link to="/auth/forgot-password">Forgot password?</Link>
            <Link to="/auth/registration">Don't have account?</Link>
          </div>

          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
