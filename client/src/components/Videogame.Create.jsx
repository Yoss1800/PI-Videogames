import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, postActivity } from '../actions';
import { Link, useHistory } from 'react-router-dom';

export default function ActivityCreate() {
    const dispatch = useDispatch();
    //history, metodo del router para  redirigir a donde quiera
    const history = useHistory;
    const allActivities = useSelector((state) => state.allActivities);

    const [input, setInput] = useState({
        countryId: '',
        name: '',
        difficulty: '',
        duration: '',
        season: ''
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
            season: e.target.value
            })
        }    
    }

    function handleSelect(e) {
        setInput({
            ...input,
            duration: e.target.value
        })    
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input));
        alert('Activity Created!');
        setInput({ //le reseteo el imput
            countryId: '',
            name: '',
            difficulty: '',
            duration: '',
            season: ''
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
            <h1>Create Activity</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={handleInputChange} //se pueden poner asi o ejecutandolos
                    />
                </div>
                <div>
                    <label>Difficulty:</label>
                    <input
                    type= 'text'
                    value= {input.difficulty}
                    name= 'difficulty'
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Country ID:</label>
                    <input
                    type= 'text'
                    value= {input.countryId}
                    name= 'countryId'
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                <h3>Duration:</h3>
                <select onChange={e => handleSelect(e)}>
                    <option value= '1'>1 hr</option>
                    <option value= '2'>2 hrs</option>
                    <option value= '3'>3 hrs</option>
                    <option value= '4'>4 hrs</option>
                    <option value= '5'>5 hrs</option>
                </select>
                </div>
                <div>
                    <h3>Season:</h3>
                    <label>Summer</label>
                    <input
                    type= 'checkbox'
                    value= 'summer'
                    name= 'summer'
                    onChange={(e) => handleCheck(e)}
                    />
                    <label>Autumn</label>
                     <input
                    type= 'checkbox'
                    value= 'autumn'
                    name= 'autumn'
                    onChange={(e) => handleCheck(e)}
                    />
                    <label>Winter</label>
                     <input
                    type= 'checkbox'
                    value= 'winter'
                    name= 'winter'
                    onChange={(e) => handleCheck(e)}
                    />
                    <label>Spring</label>
                     <input
                    type= 'checkbox'
                    value= 'spring'
                    name= 'spring'
                    onChange={(e) => handleCheck(e)}
                    />
                </div>

                {/* una lista que agarra cada estado input.activity y renderiza cada cosa que marque en select */}
            {/*     <ul><li>{input.activity.map(e => E + ' ,')}</li></ul> */}

                <button type='submit'>Create</button>

            </form>
         </div>
    )

}