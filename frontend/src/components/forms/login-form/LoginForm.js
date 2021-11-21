//* IMPORTS
//     * REACT
import { useState } from 'react';
import { Link } from 'react-router-dom';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_login } from '../../../redux/ducks/user';

//     * COMPONENTS
import { LoginFormComponent } from './LoginForm.styled';
import Loading from '../../loading/Loading';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUnlockAlt,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

const LoginForm = ({ showRegister }) => {
  //* INIT
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //* USE-STATE
  const [showPassword, setShowPassword] = useState(false);

  //* HANDLER
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      user_login({ email: 'kevin.voss99@gmail.com', password: '123123' })
    );
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LoginFormComponent>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-data">
          <div className="container">
            <label htmlFor="email">Email</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input type="text" id="email" placeholder="Email..." />
            </div>
          </div>

          <div className="container">
            <label htmlFor="password">Password</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faUnlockAlt} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password..."
              />
              <FontAwesomeIcon
                onClick={handleToggleShowPassword}
                className="icon show-password"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
        </div>

        <Link to="/auth/forgotPassword">Forgot password?</Link>

        <button type="submit" disabled={user.loading}>
          {user.loading ? <Loading /> : 'Login'}
        </button>

        <p className="server-error">{user.error}</p>
      </form>

      <div className="social-media-signup">
        <p>Or Sign In Using</p>

        <div className="social-medias">
          <div className="facebook">
            <FontAwesomeIcon className="icon" icon={faFacebookF} />
          </div>

          <div className="twitter">
            <FontAwesomeIcon className="icon" icon={faTwitter} />
          </div>

          <div className="google">
            <FontAwesomeIcon className="icon" icon={faGoogle} />
          </div>
        </div>
      </div>

      <div className="sign-up">
        <p onClick={showRegister}>Sign Up</p>
      </div>
    </LoginFormComponent>
  );
};

export default LoginForm;
