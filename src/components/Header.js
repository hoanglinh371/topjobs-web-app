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
      : null
  );

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axiosClient.get(`/users/${id}`);
  //     setUser(data.data.metadata.user);
  //   };

  //   id && fetchData();
  // }, [id, setUser]);

  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center bg-indigo-500 px-48 py-5 rounded-b-full">
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/1432px-Logo_Real_Madrid.svg.png"
        alt="logo"
        width={64}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png"
        alt="logo"
        width={80}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/1432px-Logo_Real_Madrid.svg.png"
        alt="logo"
        width={64}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png"
        alt="logo"
        width={80}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/1432px-Logo_Real_Madrid.svg.png"
        alt="logo"
        width={64}
      />

      <div>
        {user ? (
          <>
            <span
              className="font-bold text-lg text-white"
              onClick={() => navigate('/me')}
            >
              {user.name}
            </span>
            <span className="text-lg"> | </span>
            <span
              onClick={handleLogOut}
              className="font-bold cursor-pointer text-lg text-white"
            >
              Log out
            </span>
          </>
        ) : (
          <Link to="/auth/login">
            <span className="font-bold cursor-pointer text-lg text-white">
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
