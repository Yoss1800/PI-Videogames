import './App.css';
import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import VideogameCreate from './components/VideogameCreate';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">

      <React.Fragment>
        <Route exact path= '/' component={LandingPage}/>
      </React.Fragment>

      <React.Fragment>
      <Nav/>
        <Route exact path= '/home' component={Home}/>
        <Route exact path= '/create-videogame' component={VideogameCreate}/>
        <Route path='/videogames/:id' component={Detail}/>
      </React.Fragment>
      
    </div>
  );
}

export default App;
