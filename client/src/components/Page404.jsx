import React from 'react';
import styles from './Page404.module.css';
import { Link } from 'react-router-dom';
import redFlash from '../img/redlightdraw.png';
import Nav from './Nav';


export default function Page404() {

    return (
        <div>
        <Nav />
        
        <div className={styles.main404Div}>
                <div className={styles.text404}>
                    <h1>Sorry, this one stays red.</h1>
                    <h4>The page you’re looking for doesn’t exist, but you’re not at a dead end. Here are a few options:</h4>
                    <h5>* Be sure you have the right url and try again</h5>
                    <h5><Link className={styles.link} to='/home'>* Search for videogames</Link></h5>
                    <h5><Link className={styles.link} to= '/create-videogame'>* Add a videogame to our database</Link></h5>                           
                </div>

                <div className={styles.image404}>
                    <img className={styles.image} src={redFlash} alt="" />
                </div> 
            
        </div>  
        </div>
    )
}
 


            