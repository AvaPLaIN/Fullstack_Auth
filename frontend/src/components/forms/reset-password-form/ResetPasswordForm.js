//* IMPORTS
//     * REACT
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_reset_password } from '../../../redux/ducks/user';

//     * COMPONENTS
import { ResetPasswordFormComponent } from './ResetPasswordForm.styled';
import Loading from '../../loading/Loading';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUnlockAlt,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

const ResetPasswordForm = () => {
  //* INIT
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.user);

  //* USE-STATE
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  //* HANDLER
  const handleResetPassword = (event) => {
    event.preventDefault();
    dispatch(
      user_reset_password(params.token, passwordInput, confirmPasswordInput)
    );
    setPasswordInput('');
    setConfirmPasswordInput('');
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ResetPasswordFormComponent>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-data">
          <div className="container">
            <label htmlFor="password">Password</label>

            <div className="input-container">
              <FontAwesomeIcon className="icon" icon={faUnlockAlt} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
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
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                required
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$"
                title="password must be 8-30 chars long and must contain Uppercase, Lowercase, Symbol, Number"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={user.loading}>
          {user.loading ? <Loading /> : 'Reset'}
        </button>

        <p className="server-error">{user.error}</p>
        <p className="server-message">{user.message}</p>
      </form>

      <div className="sign-up">
        <Link to="/">Sign In</Link>
      </div>
    </ResetPasswordFormComponent>
  );
};

export default ResetPasswordForm;
