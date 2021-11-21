//* IMPORTS
//     * REACT
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//     * REDUX
import { useSelector, useDispatch } from 'react-redux';
import { user_auth } from './redux/ducks/user';

//     * COMPONENTS
import { AppComponent } from './App.styled';
import Auth from './pages/authentication/Auth';
import Home from './pages/home/Home';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.user) dispatch(user_auth(user?.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppComponent>
      {user?.isLoggedIn ? (
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </AppComponent>
  );
}

export default App;
