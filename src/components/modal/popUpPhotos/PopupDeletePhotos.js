import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeRemovePopup, removeItem, } from '../../../redux/slices/photosSlice'
import "../popUpPosts/popUpPosts.css"


const PopupDeletePhotos = () => {
    const dispatch = useDispatch();
    const { isShowRemovePopup } = useSelector(state => state.photos);
    const onClickDeletePost = () => {
        dispatch(removeItem())
        dispatch(closeRemovePopup())
    }

    return (isShowRemovePopup) ? (
        <div className="popup">


            <div className="popup__body">

                <div className="popup__header">
                    <div className="popup__header__info">
                        <p className="popup__header__title ">Delete post?</p>
                    </div>
                    <div className="popup__header__close">
                        <p
                            onClick={() => dispatch(closeRemovePopup())}
                            className="popup_close"
                        >&#10005;
                        </p>
                    </div>
                </div>
                <hr />
                <div className="popup__button">
                    <button
                        onClick={() => onClickDeletePost()}

                        className="buttom_blue">

                        yes
                    </button>
                    <button
                        onClick={() => dispatch(closeRemovePopup())}
                        className="buttom_blue">No</button>
                </div>
            </div>
        </div>
    ) : ''

}

export default PopupDeletePhotos