import React from 'react';
import Nav from './Nav'
import styles from './VideogameCreate.module.css';



export default function About() {

    return ( 
        <div>
        <Nav />
            {
                <div className={styles.aboutDiv}>
                    <h2>Proyecto Individual de:</h2>
                    <h3>José Gabriel Szczupak</h3>
                </div>
            }
           
        </div>
    )
}
