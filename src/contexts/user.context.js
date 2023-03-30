import jwtDecode from 'jwt-decode';
import React from 'react';
import axiosClient from '../api/axios.client';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get(
        `/users/${jwtDecode(localStorage.getItem('access_token'))._id}`,
      );
      setUser(data.data.metadata.user);
    };

    localStorage.getItem('access_token') && fetchData();
  }, []);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
