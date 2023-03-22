import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeEditPopup, updateItem } from "../../../redux/slices/postsSlice";
import "../popUpPosts/popUpPosts.css"

const PopupEditPost = () => {

    const { isShowEditPopup, currentPost } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const { id, title, body } = currentPost

    const inputRef = React.useRef(null)
    const textAreaRef = React.useRef(null)

    const onClickUpdatePost = () => {
        const updatePost = {
            id: id,
            title: inputRef.current.value,
            body: textAreaRef.current.value
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
                    <form className="popup__content">
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
                                defaultValue={body}
                                cols="60"
                                rows="10"
                            ></textarea>
                        </div>
                        <button type="button" className="buttom_blue"
                            onClick={() => onClickUpdatePost()}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        ) : ''
    )
}

export default PopupEditPost