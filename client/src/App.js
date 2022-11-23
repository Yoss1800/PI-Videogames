import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import VideogameCreate from './components/VideogameCreate';
import Nav from './components/Nav';
import About from './components/About';
import Page404 from './components/Page404';


function App() {
  return (
    <div className="App">

      <React.Fragment>
        <Route exact path= '/' component={LandingPage}/>
      </React.Fragment>

      <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path= '/home' component={Home}/>
        <Route exact path= '/create-videogame' component={VideogameCreate}/>
        <Route path='/videogames/:id' component={Detail}/>
        <Route exact path='/about' component={About}/>
        <Route path='*' component={Page404}/>
       </Switch>{/*  revisar que es switch */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
