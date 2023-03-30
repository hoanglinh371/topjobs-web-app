import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import axiosClient from '../api/axios.client';
import { UserContext } from '../contexts/user.context';

const Header = () => {
  // const [user, setUser] = React.useState();
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const [id, setId] = React.useState(() =>
    localStorage.getItem('access_token')
      ? jwtDecode(localStorage.getItem('access_token'))._id
      : null,
  );

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axiosClient.get(/users/${id});
  //     setUser(data.data.metadata.user);
  //   };

  //   id && fetchData();
  // }, [id, setUser]);

  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center bg-indigo-500 px-48 py-5">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/1432px-Logo_Real_Madrid.svg.png"
          alt="logo"
          width={64}
        />
      </Link>
      <div>
        {user ? (
          <>
            <span className="cursor-pointer" onClick={() => navigate('/me')}>
              {user.name}
            </span>
            <span> / </span>
            <span onClick={handleLogOut}>Log out</span>
          </>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
