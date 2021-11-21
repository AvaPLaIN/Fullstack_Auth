//* IMPORTS
//     * REACT
import { useState } from 'react';
import { Link } from 'react-router-dom';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_register } from '../../../redux/ducks/user';

//     * COMPONENTS
import { RegisterFormComponent } from './RegisterForm.styled';
import Loading from '../../loading/Loading';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUnlockAlt,
  faUser,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

const RegisterForm = ({ showLogin }) => {
  //* INIT
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //* USE-STATE
  const [showPassword, setShowPassword] = useState(false);

  //* HANDLER
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

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <RegisterFormComponent>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-data">
          <div className="container">
            <label htmlFor="username">Username</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input type="text" id="username" placeholder="Username..." />
            </div>
          </div>

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

          <div className="container">
            <label htmlFor="confirm-password">Confirm Password</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faUnlockAlt} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirm Password..."
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={user.loading}>
          {user.loading ? <Loading /> : 'Register'}
        </button>

        <p className="server-error">{user.error}</p>
        <p className="server-message">{user.message}</p>
      </form>

      <div className="social-media-signup">
        <p>Or Sign Up Using</p>

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
        <p onClick={showLogin}>Sign In</p>
      </div>
    </RegisterFormComponent>
  );
};

export default RegisterForm;
