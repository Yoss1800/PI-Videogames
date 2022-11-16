import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={styles.myImage}>
            {/* <h1>WELCOME TO VIDEOGAMES</h1> */}
            <Link to = '/home'>
                <button className={styles.landingBtn}>START PLAYING</button>
            </Link>
    

        </div>
    )
}