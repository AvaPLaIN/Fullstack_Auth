//* IMPORTS
//     * REACT
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//     * REDUX
import { useSelector, useDispatch } from 'react-redux';
import { user_auth } from './redux/ducks/user';

//     * COMPONENTS
import { AppComponent } from './App.styled';
import Auth from './pages/authentication/auth/Auth';
import ResetPassword from './pages/authentication/reset-password/ResetPassword';
import RequestPassword from './pages/authentication/request-password/RequestPassword';
import ValidateUser from './pages/authentication/validate-user/ValidateUser';
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
      <Routes>
        {user?.isLoggedIn ? (
          <Route path="*" exact element={<Home />} />
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="/resetPassword" element={<RequestPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/validate/:token" element={<ValidateUser />} />
            <Route path="*" element={<Auth />} />
          </>
        )}
      </Routes>
    </AppComponent>
  );
}

export default App;
