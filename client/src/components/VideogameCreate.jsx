import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVG } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import Nav from './Nav'
import styles from './VideogameCreate.module.css';

//const { validateCreateVG } =require('../middlewares/checkData')
/* const {
    handleInputChange,
    handleReleased,
    handleCheckGenre,
    handleCheckPlatform,
    handleSelect,
    handleDescription,
    handleSubmit
  } = require('../handlers/createVgHandlers'); */



export default function VGCreate() {
    const dispatch = useDispatch();
    //history, metodo del router para  redirigir a donde quiera
    const history = useHistory();

    const allGenres = useSelector((state) => state.genres);
    const allGenresArray = allGenres.map(g => g.name); //los saco del objeto antes para ordenarlos AZ despues
 
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

    //estado local para manejo de errores
    //guardo en cada uno de los elementos del obj el error correspondiente (enviado por setError)
    //EJECUTO LA FCN VALIDADORA CON LA PRIMERA CARGA DEL COMPONENTE, para validacion continua
    const [errors, setError] = useState({});

    const [input, setInput] = useState({
        name: '',
        rating: 0,
        platforms: [],
        genres: [],
        released: formatDate(),
        image: '',
        description: ''
    })

     //vamos guardando el input del usuario en el estado
    // cada vez que se ejecute esta fcn, al estado input, agrego el target value de lo que este modificando
    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setError(validateCreateVG({ //guardo eñ el objeto de error el si hay error (estado error)
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

    //chequear esta--- de`prt
    function handleReleased (e) {//que los dias no sean mayor a 30, meses mayores a 12 y año no sea mayor a 2022
        e.preventDefault()
        setInput({
            ...input, 
            [e.target.name]: e.target.value })
    }
    
     
    function handleCheckGenre(e) {      
        if (e.target.checked){
            setInput({
            ...input,
            genres: [...input.genres, e.target.value]
            })
        }   
        if (!e.target.checked){
            setInput(prevState => ({
                ...prevState,
                genres: input.genres.filter(g => e.target.value !== g)
            }))
        }  
         
        console.log(input)
    }




    function handleCheckPlatform(e) {      
        if (e.target.checked){
            setInput({
            ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        if (!e.target.checked){
            setInput(prevState => ({
                ...prevState,
                platforms: input.platforms.filter(p => e.target.value !== p)
            }))
        }
        setError(validateCreateVG({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

    function handleSelectRating(e) {
        setInput({
            ...input,
            rating: e.target.value*1
        })
        setError(validateCreateVG({ //guardo eñ el objeto de error el si hay error (estado error)
            ...input,
            [e.target.name] : e.target.value
        }));

    
        console.log(input) 
    }

    function handleSubmit(e) {
        e.preventDefault(); //para que no se refresque navegador automaticamente
        dispatch(postVG(input));
            alert('Videogame Added!');
            setInput({ //le reseteo el imput
                name: '',
                rating: 0,
                platforms: [],
                genres: [],
                released: '',
                image: '',
                description: ''
            })
            history.push('/home'); //cuando termina envio al home 
        }


    useEffect (()=>{
        dispatch(getGenres());
    },[dispatch])

    useEffect (()=>{ //con este useffect mantengo en tiempo real,m renderizado, el estado de los erores
        setError(validateCreateVG(input));
    },[input])


    const validateCreateVG = (input) => {
        let errors =  {};
        if (!input.name){
          errors.name = 'Game name is requiered';
        } else if(!/^(?=[\p{L}])[\p{L}\p{N}_@,.&$%#\s-]{1,40}$/u.test(input.name)){
          errors.name="Name is invalid";
        } else if (input.name.length < 4) {
            errors.name = 'Game Name must have at least 4 characters';
        }
        if (!input.description) {
            errors.description = 'Description is required';
            } else if (input.description.length < 8) {
                errors.description = 'Description must have at least 8 characters'
        }
        if (input.rating === 0) {
            errors.rating = 'Rating is required';
        }
        if (input.platforms.length < 1) {
            errors.platforms = 'Must choose at least one platform';
        }
        if(input.released.slice(0, 4)>2024) {
            setError({...errors.released = 'Date cannot be after 2024'})
            }else if(input.released.slice(0, 4)<1970) {
                setError({...errors.released = 'Date cannot be before 1970'})
        }
        if(input.image && !/\.(jpe?g|png|gif|bmp)$/i.test(input.image)){
            errors.image="Image URL is invalid"
        }

        return errors;
      
    };


    return(
        <div className={styles.addVGgeneral}>
        <Nav />
            {/* <Link to= '/home'><button>Home</button></Link> */}
            <h1 className={styles.h1}>ADD A GAME</h1>

            <div className={styles.formDiv}>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className={styles.inputDiv}>
                        <label>Name: </label>
                        <input
                        className= {styles.boxes}
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={handleInputChange} //se pueden poner asi o ejecutandolos con ()
                        />
                        {/* si hay error, renderizo un p con el error */}
                        {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Released: </label>
                        <input
                        className= {styles.boxes}
                        type='date' 
                        name='released' 
                        key='released' 
                        value={input.released}
                        onChange={(e) => handleReleased(e)}
                        />
                        {errors.released && (<p className={styles.error}>{errors.released}</p>)}
                    </div>

                    <div className={styles.ratingDiv}>
                        <label>Rating: </label>
                        <select className= {styles.boxes} onChange={e => handleSelectRating(e)}>
                            <option value= '0'>Select</option>
                            <option value= '1'>1</option>
                            <option value= '2'>2</option>
                            <option value= '3'>3</option>
                            <option value= '4'>4</option>
                            <option value= '5'>5</option>
                        </select>
            
                        {errors.rating && (<p className={styles.error}>{errors.rating}</p>)}
                
                    </div>

                    <div className={styles.inputCheckDiv}>
                        <label>Genres:</label>
                            <div className={styles.genresDiv}>
                                {allGenresArray.sort().map((g) => (
                                    <div key={g}>
                                        <label>{g}</label>
                                        <input
                                        className= {styles.checkbox}
                                        type= 'checkbox'
                                        value= {g}
                                        name= {g}
                                        onChange={(e) => handleCheckGenre(e)}
                                        />
                                    </div>
                                        
                                ))}
                            </div>		
                    </div> 


                    <div className={styles.inputCheckDiv}>
                        <label>Platforms:</label>
                            <div className={styles.platformsDiv}>
                                {platformsArray.sort().map((p) => (
                                    <div key={p}>
                                        <label>{p}</label>
                                        <input
                                        className={styles.checkbox}
                                        type= 'checkbox'
                                        value= {p}
                                        name= {p}
                                        onChange={(e) => handleCheckPlatform(e)}
                                        />
                                    </div>   
                                ))}
                                {errors.platforms && (<p className={styles.error}>{errors.platforms}</p>)}
                            </div>		
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Image: </label>
                        <input
                        className= {styles.boxes}
                        type= 'text'
                        value= {input.image}
                        name= 'image'
                        onChange={handleInputChange} //se pueden poner asi o ejecutandolos con ()
                        />
                        {errors.image && (<p className={styles.error}>{errors.image}</p>)} 
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Description: </label>
                        <textarea
                        className= {styles.boxesDescription}
                        name='description'
                        /* placeholder='Description...' */
                        value={input.description}
                        onChange={(e) => handleInputChange(e)}
                        />
                        {errors.description && (<p className={styles.error}>{errors.description}</p>)}         
                    </div>       

                    <button className={styles.submitBTN} type='submit' disabled={
                        !input.name || 
                        errors.name ||
                        input.rating === 0 || 
                        input.platforms.length < 1 ||
                        !input.description ||
                        errors.description
                        }>Create</button>
                    {/* DESHABOLITAR BOTON SI HAY ERRORES!!!!! */}

                </form>
            </div>
        </div>
    )
}