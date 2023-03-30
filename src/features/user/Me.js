import React from 'react';
import jwtDecode from 'jwt-decode';

import Input from '../../components/Input';
import Button from '../../components/Button';
import axiosClient from '../../api/axios.client';
import { useNavigate } from 'react-router-dom';

const Me = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const { _id } = jwtDecode(localStorage.getItem('access_token'));
      const data = await axiosClient.get(`/users/${_id}`);

      setUser(data.data.metadata.user);
      setName(data.data.metadata.user.name);
      setEmail(data.data.metadata.user.email);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axiosClient.patch(`/users/${user._id}`, {
        name,
        email,
      });
      alert('Update successful!');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-[1000px] mx-auto bg-white flex justify-between px-20 py-40">
      <div>
        <img
          src="https://picsum.photos/200"
          className="rounded-full"
          alt="user"
        />
      </div>

      <div className="w-96">
        {user && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-between">
              <Button type="submit">Update Me</Button>
              <Button
                type="button"
                onClick={() => navigate('/auth/update-password')}
              >
                Change My Password
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Me;
