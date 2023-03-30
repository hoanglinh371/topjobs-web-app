import React from "react";

import axiosClient from "../../api/axios.client";

import Input from "../../components/Input";
import Button from "../../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axiosClient.post("/auth/forgot-password", {
      email,
    });
  };

  return (
    <div className="w-96 mx-auto border py-8 px-6">
      <p className="text-center text-2xl font-bold">Forgot Password</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
