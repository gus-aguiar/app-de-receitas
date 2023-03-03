import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Provider from './context/myProvider';
import Routes from './routes';

function App() {
  return (
    <Provider>
      <Routes />
      <Footer />
    </Provider>
  );
}

export default App;
