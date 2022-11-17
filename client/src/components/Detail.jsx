import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { getDetail, cleanDetail } from '../redux/actions';
import styles from './Detail.module.css';


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

    return (
        <div>
            {
                //detail.length > 0 ? 
                //detail es un arreglo, por eso tengo que poner el [0] para acceder al objeto con el detalle
                <div className={styles.detailDiv}>
                    <h1 className={styles.name}>{name}</h1>
                    <img src={image} /* alt='image not found' */ width='250px' heigth='300px'/>
                    <h3 className={styles.genres}>GENRES: {genres?.join(", ")}</h3>
                    <h3 className={styles.released}> RELEASED: {released}</h3>
                    <h3 className={styles.rating}>RATING: {rating}</h3>
                    {/* <h3 className={styles.platforms}>PLATFORMS: {platforms}</h3> */}
                    {/* <p className={styles.description}>{description}</p> */}

                    <h3 className={styles.rating}>PLATFORMS: {platforms?.join(", ")}</h3>
                   {/*  <div>
                    
                    {{__html: description}}
                    </div> */}
                
                    <p className={styles.description}>{description?.replace(/(<([^>]+)>)/gi, "")}</p>

                </div> //: <p>Loading...</p> //renderizo un loading con : - si no rompe el condicional
            }
            {/* <Link to= '/home'>
                <button>Home</button>
            </Link> */}

        </div>
    )
}

