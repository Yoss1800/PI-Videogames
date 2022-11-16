import React from 'react';
import { Link, NavLink } from 'react-router-dom';
//import Logo from '../NP-Logo.jpeg'
import SearchBar from './SearchBar.jsx';
import styles from'./Nav.module.css';


function Nav({onSearch}) {


    return (
        <div className={styles.navbarDiv}> 
                <NavLink to= '/create-videogame'><button>New Videogame</button></NavLink>
                <NavLink to= '/home'><button>All Videogames</button></NavLink>
                <NavLink to="/about"><button>About</button></NavLink>
                <div>
          {/* <SearchBar onSearch={onSearch}/> */}
        </div>
    
        </div>
    )    
  
}

export default Nav;



/* function Nav({onSearch}) { //search que viene de nav, va ahora a searchbar
  return (
    <div className={estilos.contenedor}>
      <img src={Logo}  alt='image not found' width={40} />
      <span>NoPegoUna Weather</span>
      <SearchBar onSearch={(ciudad) => alert(ciudad)}/>


    </div>
  );
};

export default Nav; */