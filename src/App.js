import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AirportInfo from './components/AirportInfo';

function App() {
  return (
    <div className="App">
      <Header title="Flight Finder"></Header>
      <AirportInfo></AirportInfo>
      <Footer title="Emily Cohen 2021"></Footer>
    </div>
  );
}

export default App;
