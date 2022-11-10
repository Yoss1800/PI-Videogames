import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVG, getGenres, postVG } from '../redux/actions';
import { Link, useHistory } from 'react-router-dom';

export default function VGCreate() {
    const dispatch = useDispatch();
    //history, metodo del router para  redirigir a donde quiera
    //const history = useHistory;
    const videogames = useSelector((state) => state.videogames);

    const allGenres = useSelector((state) => state.genres);
    const allGenresArray = allGenres.map(g => g.name);
    let genresTemp = [];

    let platformsTemp = [];
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

    const formatDate = () => {
        const date = new Date();
        return date.toISOString().slice(0, 10);
    }

    const [error, setError] = useState({
        name: '',
        rating: '',
        platforms: '',
        genres: '',
        released: '',
        description: ''
      });

    const [input, setInput] = useState({
        name: '',
        rating: 0,
        platforms: [],
        genres: [],
        released: formatDate(),
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

    //chequear esta--- de`prt
    function handleReleased (e) {//que los dias no sean mayor a 30, meses mayores a 12 y año no sea mayor a 2022
        e.preventDefault()
        if(e.target.value.slice(0, 4)>2024) {
          setError({...error, released:'released date cannot be after 2024'})
        }
        if(e.target.value.slice(0, 4)<1970) {
          setError({...error, released:'released date cannot be before 1970'})
        }
          if(e.target.value.slice(0, 4) > 1970 && e.target.value.slice(0, 4) < 2024 ){
            setError({...error, released:''})}
        setInput({ ...input, released: e.target.value })
    }
    

    function handleCheckGenre(e) {      
        if (e.target.cheked){ //esta chequeado el target? - seteame el input asi:
            genresTemp.push(e.target.value)
            setInput({
            ...input,
            genres: genresTemp.sort()
            })
        }  
    }

    function handleCheckPlatform(e) {      
        if (e.target.cheked){ //esta chequeado el target? - seteame el input asi:
            platformsTemp.push(e.target.value)
            console.log(platformsTemp)
            setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
            })
        }  
    }

    function handleSelect(e) {
        if(e === 0) setError({...error, rating:'Must select value'})
        setInput({
            ...input,
            rating: e.target.value*1
        })    
    }

    //revisar fcn  fprt
    function handleDescription(e){ //me faltaria poner que si el .length es mayor a 200 que tire un error y lo de los caracteres
        if(e.target.value === '' || e.target.value.length === 0){
          setError({...error, description:'You must enter a description'})
        }
        else if(e.target.value.length >= 1){
          if(e.target.value.length > 150){
            setError({...error, description:'The description should not have more than 150 characters'})
          }
          setError({...error, description:''})
        }
        setInput({
          ...input,
          description: e.target.value
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
        //genresTemp = [];
       // platformsTemp = [];
        //history.push('/home'); //cuando termina envio al home
    }

    //renderizo las actividades
    /* useEffect(() => {
        dispatch(getAllVG());
    }, []); */

    useEffect (()=>{
        dispatch(getGenres());
    },[dispatch])

    return(
        <div>
            <Link to= '/home'><button>Home</button></Link>
            <h1>Add Videogame</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div className='divInputLabel'>
                    <label>Name:</label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={handleInputChange} //se pueden poner asi o ejecutandolos con ()
                    />
                </div>

                <div className='divInputLabel'>
                    <label>Released: </label>
                    <input  
                    type='date' 
                    name='released' 
                    key='released' 
                    value={input.released}
                    onChange={(e) => handleReleased(e)}
                    />
                </div>

                <div className='divInputLabel'>
                    <h3>Rating:</h3>
                    <select onChange={e => handleSelect(e)}>
                        <option value= '0'>Select</option>
                        <option value= '1'>1</option>
                        <option value= '2'>2</option>
                        <option value= '3'>3</option>
                        <option value= '4'>4</option>
                        <option value= '5'>5</option>
                    </select>
                </div>

                
               {/*  <select onChange={e => handleSelectGenre(e)}> 
                <option value= 'allGenre'>All Genres</option>
                    {allGenresArray.sort().map(g => {
                    return <option value={g}>{g}</option>})} 
                </select> */}


                <div className='divInputLabel'>
					<label>-Genres-</label>
						<div>
							{allGenresArray.sort().map((g) => (
								<div key={g}>
                                    <label>{g}</label>
                                    <input
                                    type= 'checkbox'
                                    value= {g}
                                    name= {g}
                                    onChange={(e) => handleCheckGenre(e)}
                                    />
								</div>
                                    
							))}
						</div>		
				</div> 


                <div className='divInputLabel'>
					<label>-Platforms-</label>
						<div>
							{platformsArray.sort().map((p) => (
								<div key={p}>
                                    <label>{p}</label>
                                    <input
                                    type= 'checkbox'
                                    value= {p}
                                    name= {p}
                                    onChange={(e) => handleCheckPlatform(e)}
                                    />
								</div>
                                    
							))}
						</div>		
				</div>

                <div className='divInputLabel'>
                    <label>Description: </label>
                    <input
                    name='description'
                    placeholder='Description...'
                    value={input.description}
                    onChange={(e) => handleDescription(e)}
                    />            
                </div>       

                <button type='submit'>Create</button>

            </form>

        </div>
    )

}