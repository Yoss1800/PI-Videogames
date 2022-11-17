import React from "react";
import styles from './PageBraker.module.css';

export default function PageBreaker ({vgPerPage, allVideogames, pageBreaker}){
    const pageNumbers = [];

    //creo un arreglo con los numeros de pags que quiero, todos los countrs/cuantops port pag (redondeado)
    for (let i = 0; i < Math.ceil(allVideogames/vgPerPage); i++) {
        pageNumbers.push(i+1); //i+1, si no, la primer pag es 0
    }

    return(
        <nav>
            {/* este componente renderiza los numeritos */}
            <ul className={styles.pageBreaker}>
                { pageNumbers &&   // fijate si el arreglo pageNumbers tiene algo, si tiene:
                pageNumbers.map(number =>(  //lo mapeo por cada numero que tenga el paginado 
                    //ojo quizas parentesis y no lave - ver selena
                    <li className={styles.btnNumber} key={number}>
                    <a onClick={() => pageBreaker(number)}>{number}</a>
                    </li>
                ))
                } 
            </ul>


        </nav>
    )
}