//* IMPORTS
//     * REACT
import { useEffect } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';

//     * COMPONENTS
import Auth from './pages/authentication/Auth';
import Home from './pages/home/Home';

function App() {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/auth" exact element={<Auth />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
