import React, { useEffect, __html } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { getDetail, cleanDetail } from '../redux/actions';
import DOMPurify from "dompurify"; //para usar variabkes html safe. Source: https://www.pluralsight.com/guides/how-to-use-static-html-with-react
import styles from './Detail.module.css';

//var parse = require('html-react-parser');


export default function Detail(props) {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDetail(props.match.params.id)); //accedo al id: props.match.params.id

        return function () {
            dispatch(cleanDetail());
        };

    }, [dispatch, props.match.params.id])

   //traigo el estado
    let { name, image, genres, released, rating, platforms, description } = useSelector((state) => state.detail)


    console.log(genres)
    console.log(platforms)

    const safeDescription =  DOMPurify.sanitize(description);

    console.log(safeDescription)

    return (
        <div>
            {
                //detail.length > 0 ? 
                //detail es un arreglo, por eso tengo que poner el [0] para acceder al objeto con el detalle
                <div className={styles.detailDiv}>
                    <h1 className={styles.name}>{name}</h1>
                    <img className={styles.img} src={image} /* alt='image not found' */ width='250px' heigth='300px'/>
                    <h2>GENRES:</h2>
                    <h3>{genres?.join(", ")}</h3>
                    <h2>RELEASED:</h2>
                    <h3>{released}</h3>
                    <h2>RATING:</h2>
                    <h3>{rating}</h3>
                    <h2>PLATFORMS:</h2>
                    <h3>{platforms?.join(", ")}</h3>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: safeDescription }} />             
                    {/* <p className={styles.description}>{description?.replace(/(<([^>]+)>)/gi, "")}</p> */}

                </div> //: <p>Loading...</p> //renderizo un loading con : - si no rompe el condicional
            }
            {/* <Link to= '/home'>
                <button>Home</button>
            </Link> */}

        </div>
    )
}

