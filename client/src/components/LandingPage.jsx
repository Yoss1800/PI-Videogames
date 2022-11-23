import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage(){

    return(
        <div className={styles.myImage}>
            <Link to='/home'>
                <button className={styles.landingBtn}>START PLAYING</button>
            </Link>
        </div>
    )
}