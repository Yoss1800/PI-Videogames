/* import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVG } from '../redux/actions';
import { Link, useHistory } from 'react-router-dom';
 



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
  image: '',
  description: ''
});

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
        })
        console.log(input)
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
        if (e.target.checked){
            setInput({
            ...input,
            genres: [...input.genres, e.target.value]
            })
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
        console.log(input)
    }

    function handleSelect(e) {
        if(e === 0) setError({...error, rating:'Must select value'})
        setInput({
            ...input,
            rating: e.target.value*1
        })
        console.log(input) 
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
        e.preventDefault(); //par que no se refresqie navegador automaticamente
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


module.exports = {
  handleInputChange,
  handleReleased,
  handleCheckGenre,
  handleCheckPlatform,
  handleSelect,
  handleDescription,
  handleSubmit
}; */