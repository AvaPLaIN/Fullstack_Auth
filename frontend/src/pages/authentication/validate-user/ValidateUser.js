//* IMPORTS
//     * REACT
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_validate } from '../../../redux/ducks/user';

//     * COMPONENTS
import { ValidateUserComponent } from './ValidateUser.styled';
import Loading from '../../../components/loading/Loading';

const ValidateUser = () => {
  //* INIT
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.user);

  //* USE-EFFECT
  useEffect(() => {
    const token = params.token;
    dispatch(user_validate(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ValidateUserComponent>
      {user.loading ? (
        <Loading />
      ) : (
        (user.message || user.error) && <Navigate to="/" />
      )}
    </ValidateUserComponent>
  );
};

export default ValidateUser;
