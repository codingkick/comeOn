import './App.css';
import React from 'react';
import { EventMap } from './components/EventMap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Header } from './components/Header';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { CreateEvent } from './components/CreateEvent';

function App() {
  return(
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Header></Header>
              <EventMap></EventMap>
            </Route>
            <Route path="/createEvent" exact>
              <CreateEvent></CreateEvent>
            </Route>
          </Switch>
        </Router>
    </div>
  )
}

export default App;
