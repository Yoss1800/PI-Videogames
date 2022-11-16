import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail, cleanDetail } from '../redux/actions';

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)); //accedo al id: props.match.params.id

        return function () {
            dispatch(cleanDetail());
        };

    }, [dispatch, props.match.params.id])

    const detail = useSelector((state) => state.detail) //traigo el estado

    return (
        <div>
            {
                //detail.length > 0 ? 
                //detail es un arreglo, por eso tengo que poner el [0] para acceder al objeto con el detalle
                <div>
                    <h1>{detail.name}</h1>
                    <img src={detail.image} /* alt='image not found' */ width='250px' heigth='300px'/>
                    <h3>Genres: {detail.genres}</h3>
                    <h3>Released: {detail.released}</h3>
                    <h3>Rating: {detail.rating}</h3>
                    <h3>Platforms: {detail.platforms}</h3>
                    <p>Description: {detail.description}</p>

                </div> //: <p>Loading...</p> //renderizo un loading con : - si no rompe el condicional
            }
            <Link to= '/home'>
                <button>Home</button>
            </Link>

        </div>
    )
}