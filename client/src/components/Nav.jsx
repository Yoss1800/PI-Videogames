import React from 'react';
import { useDispatch, } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVG, cleanVG } from '../redux/actions';
//import SearchBar from './SearchBar.jsx';
import styles from'./Nav.module.css';

function Nav() {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleClickSearched(e){
      e.preventDefault(e);
      history.push("/home");
    }

    function handleClickaClean(e){
        e.preventDefault(e);
        dispatch(cleanVG());
        dispatch(getAllVG());
        history.push("/home");
    }

    return (
        <div className={styles.navbarDiv}> 
                <button className={styles.allgames} onClick={(e) => handleClickSearched(e)}>HOME</button>
                <NavLink to= '/create-videogame'><button>ADD GAME</button></NavLink>
                <button className={styles.allgames} onClick={(e) => handleClickaClean(e)}>ALL GAMES</button>
                <NavLink to= '/about'><button>ABOUT</button></NavLink>
        </div>
    )    
}

export default Nav;


/* return (
    <div className={styles.navbarDiv}> 
            <NavLink to= '/create-videogame'><button>ADD GAME</button></NavLink>
            <NavLink to= '/home'><button>ALL GAMES</button></NavLink>
            <NavLink to= '/about'><button>ABOUT</button></NavLink>
    </div>
)  */ 