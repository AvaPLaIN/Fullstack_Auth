//* IMPORTS
//     * REACT
import { useState } from 'react';
import { Link } from 'react-router-dom';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';

//     * COMPONENTS
import { RequestPasswordFormComponent } from './RequestPasswordForm.styled';
import Loading from '../../loading/Loading';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { user_request_password } from '../../../redux/ducks/user';

const RequestPasswordForm = () => {
  //* INIT
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //* USE-STATE
  const [email, setEmail] = useState('');

  //* HANDLER
  const handleRequestPassword = (event) => {
    event.preventDefault();
    dispatch(user_request_password(email));
    setEmail('');
  };

  return (
    <RequestPasswordFormComponent>
      <h1>Request new Password</h1>
      <form onSubmit={handleRequestPassword}>
        <div className="form-data">
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
        </div>

        <button type="submit" disabled={user.loading}>
          {user.loading ? <Loading /> : 'Request new password'}
        </button>

        <p className="server-error">{user.error}</p>
        <p className="server-message">{user.message}</p>
      </form>

      <div className="sign-up">
        <Link to="/">Sign In</Link>
      </div>
    </RequestPasswordFormComponent>
  );
};

export default RequestPasswordForm;
