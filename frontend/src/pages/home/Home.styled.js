//* IMPORTS
//     * styled-components
import styled from 'styled-components';

//     * ASSETS
import background from '../../assets/images/form-background.jpg';

export const HomeComponent = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  justify-content: center;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;

  button {
    width: 10rem;
    height: 4rem;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }
`;
