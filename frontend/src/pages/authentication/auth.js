//* IMPORTS
//     * COMPONENTS
import { AuthComponent } from './Auth.styled';

//     * REDUX
import { useDispatch } from 'react-redux';
import { user_login, user_register } from '../../redux/ducks/user';

const Auth = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      user_login({ email: 'kevin.voss99@gmail.com', password: '123123' })
    );
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      user_register({
        username: 'Ava',
        email: 'kevin.voss99@gmail.com',
        password: '123123',
        confirmPassword: '123123',
      })
    );
  };

  return (
    <AuthComponent>
      <form onSubmit={handleLogin} className="login">
        <input type="text" placeholder="Email..." />
        <input type="password" placeholder="Password..." />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={handleRegister} className="register">
        <input type="text" placeholder="Username..." />
        <input type="text" placeholder="Email..." />
        <input type="password" placeholder="Password..." />
        <input type="confirmPassword" placeholder="Confirm Password..." />
        <button type="submit">Register</button>
      </form>
    </AuthComponent>
  );
};

export default Auth;
