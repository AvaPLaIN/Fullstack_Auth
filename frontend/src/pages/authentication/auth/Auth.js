//* IMPORTS
//     * REACT
import { useState } from 'react';

//     * COMPONENTS
import { AuthComponent } from './Auth.styled';
import LoginForm from '../../../components/forms/login-form/LoginForm';
import RegisterForm from '../../../components/forms/register-form/RegisterForm';

const Auth = () => {
  //* USE-STATE
  const [showSignUp, setShowSignUp] = useState(false);

  //* HANDLER
  const handleChangeForm = () => setShowSignUp((prev) => !prev);

  return (
    <AuthComponent>
      {showSignUp ? (
        <RegisterForm showLogin={handleChangeForm} />
      ) : (
        <LoginForm showRegister={handleChangeForm} />
      )}
    </AuthComponent>
  );
};

export default Auth;
