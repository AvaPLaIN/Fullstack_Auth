import styled from 'styled-components';

export const LoginFormComponent = styled.div`
  width: clamp(250px, 100%, 450px);
  height: clamp(650px, 80%, 650px);
  background-color: #ffffff;
  padding: 4rem;
  border-radius: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  h1 {
    cursor: default;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-data {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .container {
        display: flex;
        flex-direction: column;

        label {
          cursor: pointer;
          font-weight: 400;
          font-size: var(--font-size-text-small);
        }

        .input-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid grey;

          .icon {
            color: var(--font-color-normal);
            font-size: 2rem;

            &.show-password {
              cursor: pointer;
            }
          }

          input {
            width: 100%;
            border: none;
            outline: none;
            padding: 1rem;

            &:invalid {
              &:not(:placeholder-shown) {
                border-left: 2px solid red;
              }
            }

            &:valid {
              &:not(:placeholder-shown) {
                border-left: 2px solid green;
              }
            }
          }
        }
      }
    }

    a {
      margin-top: 0.5rem;
      cursor: pointer;
      align-self: flex-end;
      font-size: var(--font-size-text-small);
      color: var(--font-color-greyed);
    }

    button {
      font-size: var(--font-size-text-big);
      margin-top: 3rem;
      width: 100%;
      padding: 1rem;
      border-radius: 5rem;
      border: none;
      outline: none;
      cursor: pointer;
      background-color: var(--background-color-main);
      color: var(--font-color-white);
      transition: all 0.2s ease-in-out;

      &:hover:enabled {
        transform: scale(1.05);
      }

      &:active:enabled {
        transform: scale(0.95);
      }
    }

    .server-error {
      margin-top: 2rem;
      color: var(--font-color-failure);
      font-size: var(--font-size-text-small);
    }
  }

  .social-media-signup {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    p {
      cursor: default;
      color: var(--font-color-greyed);
      font-weight: 400;
      font-size: var(--font-size-text-small);
    }

    .social-medias {
      display: flex;
      align-items: center;
      gap: 1rem;

      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .icon {
          color: white;
          font-size: var(--font-size-text-big);
        }

        &.facebook {
          background-color: #1341a5;
        }

        &.twitter {
          background-color: #0f99e9;
        }

        &.google {
          background-color: #b92d40;
        }
      }
    }
  }

  .sign-up {
    margin-top: 4rem;

    p {
      cursor: pointer;
      color: var(--font-color-greyed);
      font-weight: 400;
      font-size: var(--font-size-text-medium);
      text-decoration: underline;
    }
  }
`;
