//* IMPORTS
//     * REACT
import { useState } from 'react';

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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //* HANDLER
  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(user_register({ username, email, password, confirmPassword }));

    //* RESET FORM
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
              <input
                type="text"
                id="username"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                pattern="^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                title="username must be a valid username"
              />
            </div>
          </div>

          <div className="container">
            <label htmlFor="email">Email</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input
                type="text"
                id="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                title="email must be a valid email"
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$"
                title="password must be 8-30 chars long and must contain Uppercase, Lowercase, Symbol, Number"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$"
                title="password must be 8-30 chars long and must contain Uppercase, Lowercase, Symbol, Number"
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
