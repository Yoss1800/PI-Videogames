import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>WELCOME TO VIDEOGAMES</h1>
            <Link to = '/home'>
                <button>START PLAYING</button>

            </Link>
    

        </div>
    )
}