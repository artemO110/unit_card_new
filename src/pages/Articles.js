import React, { useEffect, useState } from "react";
import PopupInfoPost from "../components/modal/popUpPosts/PopupInfoPost";
import PopupEditPost from "../components/modal/popUpPosts/PopupEditPost";
import PopupDeletePost from "../components/modal/popUpPosts/PopupDeletePost";
import PopupAddPost from "../components/modal/popUpPosts/PopupAddPost";


import { useSelector, useDispatch } from "react-redux";
import CardPost from "../components/cards/CardPost";
import {
    fetchPosts,
    showFirstPosts,
    addThreeItemsShow,
    changeSizeCard,

    openAddPopup,
} from "../redux/slices/postsSlice";

import './Articles.css'


const Articles = (props) => {
    const [showLoadMore, setShowLoadMore] = useState(true);
    const { showItems, isSmallCards, } = useSelector(state => state.posts);
    // const { disabledStatus } = useSelector(state => state.posts.disabledStatus);
    const dispatch = useDispatch()


    const showPosts = showItems.map(post => <CardPost {...post} key={post.id} />)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(showFirstPosts())
    }, [dispatch])

    function handleLoadMore() {
        if (showPosts.length < 5) {
            dispatch(addThreeItemsShow())
            console.log("showLoadMore", showLoadMore)
        } else {
            setShowLoadMore(false);
        }
    }

    return (
        <div className="container">
            <PopupInfoPost />
            <PopupEditPost />
            <PopupDeletePost />
            <PopupAddPost />


            <div className="home__header">
                <h1 className="home__header-title">Article List</h1>
                <div className="home__header-buttons">

                    <button
                        className="buttom_blue"
                        onClick={() => dispatch(changeSizeCard())}
                    // className={'cardSmall' + (isSmallCard ? 'cardBig' : '')}
                    >
                        {isSmallCards ? 'Small card' : 'Big Card'}
                    </button>

                    <button className="buttom_blue"
                        onClick={() => dispatch(openAddPopup())}
                    >Add Articles</button>
                </div>
            </div>
            <div className="cards">
                {showPosts}
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

export default Articles

