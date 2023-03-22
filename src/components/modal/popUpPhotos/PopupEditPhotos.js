import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeEditPopup, updateItem } from "../../../redux/slices/photosSlice";
import "../popUpPosts/popUpPosts.css"

const PopupEditPhotos = () => {

    const { isShowEditPopup, currentPhotos } = useSelector(state => state.photos)
    const dispatch = useDispatch()

    const { id, title, thumbnailUrl } = currentPhotos

    const inputRef = React.useRef(null)
    const textAreaRef = React.useRef(null)

    const onClickUpdatePost = () => {
        const updatePost = {
            id: id,
            title: inputRef.current.value,
            thumbnailUrl: textAreaRef.current.value
        }
        dispatch(updateItem(updatePost))
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

                    <div className="popup__content-title">
                        <p className="popup__content-name">title</p>
                        <input className="input_title"
                            ref={inputRef}
                            type="text"
                            defaultValue={title}
                        />
                    </div>
                    <div className="popup__content-description">
                        <p className="popup__content-name">Description</p>
                        <textarea className="input_content"
                            ref={textAreaRef}
                            defaultValue={thumbnailUrl}
                            cols="60"
                            rows="10"
                        ></textarea>
                    </div>
                    <button type="button" className="buttom_blue"
                        onClick={() => onClickUpdatePost()}>
                        Update
                    </button>

                </div>
            </div>
        ) : ''
    )
}

export default PopupEditPhotos