import React from 'react';
import { Link, NavLink } from 'react-router-dom';
//import Logo from '../NP-Logo.jpeg'
import SearchBar from './SearchBar.jsx';
import styles from'./Nav.module.css';


function Nav({onSearch}) {


    return (
        <div className={styles.navbarDiv}> 
                <NavLink to= '/create-videogame'><button>ADD GAME</button></NavLink>
                <NavLink to= '/home'><button>ALL GAMES</button></NavLink>
                <NavLink to= '/about'><button>ABOUT</button></NavLink>
                <div>
          {/* <SearchBar onSearch={onSearch}/> */}
        </div>
    
        </div>
    )    
  
}

export default Nav;

