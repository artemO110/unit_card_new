import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeInfoPopup } from "../../../redux/slices/postsSlice";

import "../popUpPosts/popUpPosts.css"

const PopupInfoPost = () => {

    const { isShowInfoPopup, currentPost } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    return (isShowInfoPopup) ? (
        <div className="popup">


            <div className="popup__body">

                <div className="popup__header">
                    <div className="popup__header__info">
                        <p className="popup__header__title ">Article Info</p>
                    </div>
                    <div className="popup__header__close">
                        <p
                            onClick={() => dispatch(closeInfoPopup())}
                            className="popup_close"
                        >&#10005;
                        </p>
                    </div>
                </div>
                <hr />
                <div className="popup__content">
                    <p className="popup__content__title">
                        {currentPost.title}
                    </p>
                    <p className="popup__content">
                        {currentPost.body}
                    </p>
                </div>
            </div>
        </div>
    ) : ''
}

export default PopupInfoPost