import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeEditPopup, updateItem, } from "../../../redux/slices/usersSlice";
import "../popUpUsers/popUpUsers.css"

const PopupEditUsers = () => {

    const { isShowEditPopup, currentUsers } = useSelector(state => state.users);
    const dispatch = useDispatch()

    const { id, name, username, email, phone, website } = currentUsers

    const inputRefName = React.useRef(null)
    const inputRefUsername = React.useRef(null)
    const inputRefEmail = React.useRef(null)
    const inputRefPhone = React.useRef(null)
    const inputRefSite = React.useRef(null)
    // const inputRefStreet = React.useRef(null)


    const onClickUpdateUsers = () => {
        const updateUsersCard = {
            id: id,
            name: inputRefName.current.value,
            username: inputRefUsername.current.value,
            email: inputRefEmail.current.value,
            phone: inputRefPhone.current.value,
            website: inputRefSite.current.value,


        }
        console.log(name)
        dispatch(updateItem(updateUsersCard))
        dispatch(closeEditPopup())
    }

    return (
        (isShowEditPopup) ? (
            <div className="popup">
                <div className="popup__body">
                    <div className="popup__header">
                        <div className="popup__header__info">
                            <p className="popup__header__title ">Edit</p>
                        </div>
                        <div className="popup__header__close">
                            <p
                                onClick={() => dispatch(closeEditPopup())}
                                className="popup_close"
                            >&#10005;
                            </p>
                        </div>
                    </div>
                    <form className="popup__content">
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
                        <button type="button" className="buttom_blue"
                            onClick={() => onClickUpdateUsers()}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        ) : ''
    )
}

export default PopupEditUsers