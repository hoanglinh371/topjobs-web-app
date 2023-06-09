import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosClient from '../../api/axios.client';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { UserContext } from '../../contexts/user.context';
import jwtDecode from 'jwt-decode';

const Register = () => {
  const { setUser } = React.useContext(UserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosClient.post('/auth/registration', {
        name,
        email,
        password,
        confirmPassword,
      });

      alert('Register Successful!');
      const userData = await axiosClient.get(
        `/users/${jwtDecode(data.data.token)._id}`,
      );
      setUser(userData.data.metadata.user);
      localStorage.setItem('access_token', data.data.token);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-96 mx-auto border py-8 px-6">
      <p className="text-center text-2xl font-bold">Register</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          label="Password"
          type="password"
          placeholder="Enter your confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Link to="/auth/login">Have an account?</Link>
          </div>

          <Button type="submit">Create account</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
