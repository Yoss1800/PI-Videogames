import React from 'react';
import { NavLink } from 'react-router-dom';
//import SearchBar from './SearchBar.jsx';
import styles from'./Nav.module.css';

function Nav() {

    return (
        <div className={styles.navbarDiv}> 
                <NavLink to= '/create-videogame'><button>ADD GAME</button></NavLink>
                <NavLink to= '/home'><button>ALL GAMES</button></NavLink>
                <NavLink to= '/about'><button>ABOUT</button></NavLink>
                <div>

        </div>
        </div>
    )    
  
}

export default Nav;

