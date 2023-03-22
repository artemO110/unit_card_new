import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItem, closeAddPopup } from "../../../redux/slices/usersSlice";
import "../popUpUsers/popUpUsers.css"

const PopupAddUsers = ({ id, name, username, email, phone, website }) => {

    const isShowAddPopup = useSelector(state => state.users.isShowAddPopup)
    const dispatch = useDispatch()

    const inputRefName = React.useRef(null)
    const inputRefUsername = React.useRef(null)
    const inputRefEmail = React.useRef(null)
    const inputRefPhone = React.useRef(null)
    const inputRefSite = React.useRef(null)

    return (
        (isShowAddPopup) ? (
            <div className="popup">
                <div className="popup__body">
                    <div className="popup__header">
                        <div className="popup__header__info">
                            <p className="popup__header__title ">Add post</p>
                        </div>
                        <div className="popup__header__close">
                            <p
                                onClick={() => dispatch(closeAddPopup())}
                                className="popup_close"
                            >&#10005;
                            </p>
                        </div>
                    </div>
                    <div className="popup__content-title">
                        <label name='name'>name:</label>
                        <input name='name' className="input_title" ref={inputRefName} type="text"
                            defaultValue={name}
                        />
                    </div>
                    <div className="popup__content-description">

                        <label name='username'>username:</label>
                        <input name='username' className="input_title" ref={inputRefUsername} type="text"
                            defaultValue={username} />

                        <label name='email'>email:</label>
                        <input name='email' className="input_title" ref={inputRefEmail} type="text"
                            defaultValue={email} />

                        <label name='phone'>phone:</label>
                        <input name='phone' className="input_title" ref={inputRefPhone} type="text"
                            defaultValue={phone} />

                        <label name='website'>website:</label>
                        <input name='website' className="input_title" ref={inputRefSite} type="text"
                            defaultValue={website} />

                    </div>


                    <button
                        className="buttom_blue"
                        type="button"
                        onClick={() => dispatch(addItem({
                            id: Date.now(),
                            name: inputRefName.current.value,
                            username: inputRefUsername.current.value,
                            email: inputRefEmail.current.value,
                            phone: inputRefPhone.current.value,
                            website: inputRefSite.current.value,

                        }))}

                    >
                        Create
                    </button>

                </div>
            </div>
        ) : ''
    )
}

export default PopupAddUsers