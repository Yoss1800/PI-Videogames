import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVgByName } from '../redux/actions';
import styles from './SearchBar.module.css';



export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState ('');

    //const Redirect = Redirect();

//guardo el inmput del usuario en el estado local
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    //le paso al back el llamado, con el dispatch llamando a la accion:
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVgByName(name));
    }


    return (
        <div>
            <input
            type = 'text'
            placeholder = 'search...'
            onChange={(e) => handleInputChange(e)}
            />
            <button className={styles.button} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}