import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import axiosClient from '../../api/axios.client';
import { UserContext } from '../../contexts/user.context';
import jwtDecode from 'jwt-decode';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosClient.patch(
        `/auth/reset-password/${resetToken}`,
        {
          newPassword,
          confirmNewPassword,
        },
      );
      alert('Change password successfull!');
      localStorage.setItem('access_token', data.data.token);
      const userData = await axiosClient.get(
        `/users/${jwtDecode(localStorage.getItem('access_token'))._id}`,
      );
      setUser(userData.data.metadata.user);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='w-96 mx-auto border py-8 px-6'>
      <p className='text-center'>Reset password</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Password'
          type='password'
          placeholder='Enter your new password'
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          label='Confirm'
          type='password'
          placeholder='Enter your password'
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <div className='flex justify-center items-center'>
          <Button type='submit'>Confirm</Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
