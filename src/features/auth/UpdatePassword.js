import React from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import axiosClient from '../../api/axios.client';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axiosClient.patch(`/auth/update-password`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      localStorage.setItem('access_token', data.data.token);
      alert('Update password Successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='w-96 mx-auto border py-8 px-6'>
      <p className='text-center'>Update password</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Current'
          type='password'
          placeholder='Enter current password'
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          label='New'
          type='password'
          placeholder='Enter new password'
          onChange={(e) => setNewPassword(e.target.value)}
        />{' '}
        <Input
          label='Confirm'
          type='password'
          placeholder='Confirm new password'
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <div className='flex justify-center items-center'>
          <Button type='submit'>Change my Password</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
