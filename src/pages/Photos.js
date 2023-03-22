import React, { useEffect, useState } from "react";
import PopupInfoPhotos from "../components/modal/popUpPhotos/PopupInfoPhotos";
import PopupEditPhotos from "../components/modal/popUpPhotos/PopupEditPhotos";
import PopupDeletePhotos from "../components/modal/popUpPhotos/PopupDeletePhotos";
import PopupAddPhotos from "../components/modal/popUpPhotos/PopupAddPhotos";


import { useSelector, useDispatch } from "react-redux";
import CardPhoto from "../components/cards/CardPhoto";
import {
    fetchPhotos,
    showFirstItem,
    addThreeItemsShow,
    changeSizeCard,

    openAddPopup,
} from "../redux/slices/photosSlice";

import './Articles.css'


const Photos = (props) => {
    const [showLoadMore, setShowLoadMore] = useState(true);
    const { showItems, isSmallCards, } = useSelector(state => state.photos);
    const dispatch = useDispatch()

    const showPhotos = showItems.map(photo => <CardPhoto {...photo} key={photo.id} />)

    useEffect(() => {
        dispatch(fetchPhotos())
        dispatch(showFirstItem())
    }, [dispatch])

    function handleLoadMore() {
        if (showItems.length < 5) {
            dispatch(addThreeItemsShow())
            console.log("showLoadMore", showLoadMore)
        } else {
            setShowLoadMore(false);
        }
    }

    return (
        <div className="container">
            <PopupInfoPhotos />
            <PopupEditPhotos />
            <PopupDeletePhotos />
            <PopupAddPhotos />


            <div className="home__header">
                <h1 className="home__header-title">Foto List</h1>
                <div className="home__header-buttons">

                    <button
                        className="buttom_blue"
                        onClick={() => dispatch(changeSizeCard())}
                    >
                        {isSmallCards ? 'Small card' : 'Big Card'}
                    </button>

                    <button className="buttom_blue"
                        onClick={() => dispatch(openAddPopup())}
                    >Add Photos</button>
                </div>
            </div>
            <div className="cards">
                {showPhotos}
            </div>
            {
                showLoadMore &&

                <button
                    className="buttom_blue buttom_showMore"

                    onClick={() => handleLoadMore()}
                >
                    Show More
                </button>



            }
        </div>
    )
}

export default Photos

