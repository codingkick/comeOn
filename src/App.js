import './App.css';
import React from 'react';
import { EventMap } from './components/EventMap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Header } from './components/Header';

function App() {
  return(
      <div>
        <Header></Header>
        <EventMap></EventMap>
    </div>
  )
}

export default App;
