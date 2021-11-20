//* IMPORTS
//     * REACT
import { useEffect } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';

//     * REDUX
import { useSelector, useDispatch } from 'react-redux';
import { user_auth } from './redux/ducks/user';

//     * COMPONENTS
import Auth from './pages/authentication/Auth';
import Home from './pages/home/Home';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(user?.user).length) dispatch(user_auth(user.user));
  }, []);

  return (
    <Routes>
      <Route path="/auth" exact element={<Auth />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
