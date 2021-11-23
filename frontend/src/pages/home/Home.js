//* IMPORTS
//     * REACT
import { useEffect } from 'react';

//     * COMPONENTS
import { HomeComponent } from './Home.styled';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_logout } from '../../redux/ducks/user';
import { fetch_data } from '../../redux/ducks/data';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetch_data(user.accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(user_logout());
  };

  return (
    <HomeComponent>
      <h1>Hello {user.username}</h1>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </HomeComponent>
  );
};

export default Home;
