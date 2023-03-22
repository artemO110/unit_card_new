import React, { useState } from "react";
import './CardPost.css';
import { useSelector, useDispatch } from "react-redux";
import { openInfoPopup, openEditPopup, openRemovePopup } from "../../redux/slices/photosSlice";


const CardPhoto = ({ id, title, url, thumbnailUrl }) => {

    const isSmall = useSelector(state => state.photos.isSmallCards)
    const dispatch = useDispatch()

    const [backgroundColor, setBackgroundColor] = useState('#c5c5c5');
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

    const changeColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // выбираем случайный цвет из массива colors
        setBackgroundColor(randomColor);
    };



    return (
        <div
            style={{ backgroundColor }}
            className={isSmall ? 'cardSmall' : 'cardBig'}>

            <div className="card__text">
                <p className="card__title">{title}</p>
            </div>
            <div className="card__image">
                <img className="card__image-img" src={thumbnailUrl} alt="img" />
            </div>
            <div className="card__buttons">
                <button
                    className="card__buttons-view card__button"
                    onClick={() => dispatch(openInfoPopup(id))}
                >
                    View
                </button>
                <button
                    className="card__buttons-color card__button"
                    onClick={changeColor}
                >
                    Change color
                </button>
                <button
                    className="card__buttons-edit card__button"
                    onClick={() => dispatch(openEditPopup(id))}
                >
                    Edit
                </button>
                <button
                    className="card__buttons-delete card__button"
                    onClick={() => dispatch(openRemovePopup(id))}
                >
                    Delete
                </button>
            </div>
        </div>

    )
}

export default CardPhoto