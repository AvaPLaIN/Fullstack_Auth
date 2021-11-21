import { LoadingComponent } from './Loading.styled';

const Loading = () => {
  return (
    <LoadingComponent>
      {console.log('loading')}
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </LoadingComponent>
  );
};

export default Loading;
