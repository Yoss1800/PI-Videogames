import React from "react";

//componente que muestra la tarjeta de cada pais
// se renderiza en home.. y ahi recibe las props
export default function Card({ name, genres, image }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src={image} alt='image not found' width='250px' heigth='300px'/>
        </div>
    )
}