import { Fragment } from 'react';
import './App.css';
import Home from './components/sections/Home';
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App;
