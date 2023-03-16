import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import VideogameCreate from './components/VideogameCreate';
//import Nav from './components/Nav';
import About from './components/About';
import Page404 from './components/Page404';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

//SWITCH: si pongo un link que no existe.. te toma el ultimo valido / se mueve solo dentro de lo que envuelve

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path= '/home' component={Home}/>
        <Route exact path= '/create-videogame' component={VideogameCreate}/>
        <Route exact path='/videogames/:id' component={Detail}/>
        <Route exact path='/about' component={About}/>
        <Route path='*' component={Page404}/>
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;