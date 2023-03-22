import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeInfoPopup } from "../../../redux/slices/usersSlice";

import "../popUpUsers/popUpUsers.css"

const PopupInfoUsers = () => {

    const { isShowInfoPopup, currentUsers } = useSelector(state => state.users)
    const dispatch = useDispatch()

    return (isShowInfoPopup) ? (
        <div className="popup">


            <div className="popup__body">

                <div className="popup__header">
                    <div className="popup__header__info">
                        <p className="popup__header__title ">Users Info</p>
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
                    <p className="popup__content__title">name: {currentUsers.name}</p>
                    <p className="popup__content">username: {currentUsers.username}</p>
                    <p className="popup__content">phone: {currentUsers.phone}</p>
                    <p className="popup__content">website: {currentUsers.website}</p>
                </div>
            </div>
        </div>
    ) : ''
}

export default PopupInfoUsers