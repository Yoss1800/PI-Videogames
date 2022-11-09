import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVG } from '../redux/actions';
import { Link, useHistory } from 'react-router-dom';

export default function ActivityCreate() {
    const dispatch = useDispatch();
    //history, metodo del router para  redirigir a donde quiera
    const history = useHistory;
    const videogames = useSelector((state) => state.videogames);

    const platformsArray = [
		'PC',
		'iOS',
		'Android',
		'macOS',
		'PlayStation 4',
		'PlayStation 5',
		'Xbox',
		'PS Vita',
	];

    const [input, setInput] = useState({
        name: '',
        rating: 0,
        platforms: [],
        genres: [],
        released: '',
        description: ''
    })

    //vamos guardando el input del usuario en el estado
    // cada vez que se ejecute esta fcn, al estado input, agrego el target value de lo que este modificando
    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleCheck(e) {
        if (e.target.cheked){ //esta chequeado el target? - seteame el input asi:
            setInput({
            ...input,
            platforms: platforms.push(e.target.value)
            })
        }    
    }

    function handleSelect(e) {
        setInput({
            ...input,
            rating: e.target.value*1
        })    
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postVG(input));
        alert('Videogame Added!');
        setInput({ //le reseteo el imput
            name: '',
            rating: 0,
            platforms: [],
            genres: [],
            released: '',
            description: ''
        })
        history.push('/home'); //cuando termina envio al home
    }

    //renderizo las actividades
    useEffect(() => {
        dispatch(getActivities());
    }, []);

    return(
        <div>
            <Link to= '/hone'><button>Home</button></Link>
            <h1>Add Videogame</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div className='name'>
                    <label>Name:</label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={handleInputChange} //se pueden poner asi o ejecutandolos con ()
                    />
                </div>

                <div className='rating'>
                <h3>Rating:</h3>
                <select onChange={e => handleSelect(e)}>
                    <option value= '1'>1</option>
                    <option value= '2'>2</option>
                    <option value= '3'>3</option>
                    <option value= '4'>4</option>
                    <option value= '5'>5</option>
                </select>
                </div>

                <div className='genre'>
                <option value= 'allGenre'>All Genres</option>
                    {allGenresArray.sort().map(g => {
                    return <option value={g}>{g}</option>})} 
                </div>

                <div className='platform'>
							<label>-Platforms-</label>
							<div>
								{platformsArray.map((p) => (
									<div key={p}>
                                        <label>{p}</label>
                                        <input
                                        type= 'checkbox'
                                        value= {p}
                                        name= {p}
                                        onChange={(e) => handleCheck(e)}
                                        />

									</div>
								))}
							</div>
				</div>        

                <button type='submit'>Create</button>

            </form>

        </div>
    )

}