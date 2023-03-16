import React from "react";
import styles from './Card.module.css'

//componente que muestra la tarjeta de cada pais
// se renderiza en home.. y ahi recibe las props
export default function Card({ name, genres, image }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{name}</h3>
            <h5 className={styles.genre}>{`${
                    typeof genres === "string"
                      ? genres
                      : genres.join(", ")
                  }`}
            </h5>
            <img className={styles.image} src={image} alt='not found' width='250px' heigth='300px'/>
        </div>
    )
}