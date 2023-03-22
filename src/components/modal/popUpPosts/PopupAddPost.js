import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItem, closeAddPopup } from "../../../redux/slices/postsSlice";

const PopupAddPost = () => {

    const isShowAddPopup = useSelector(state => state.posts.isShowAddPopup)
    const dispatch = useDispatch()

    const inputRef = React.useRef(null)
    const textAreaRef = React.useRef(null)

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
                    <form className="popup__content">
                        <div className="popup__content-title">
                            <p className="popup__content-name">title</p>
                            <input className="input_title"
                                ref={inputRef}
                                type="text"
                            />
                        </div>
                        <div className="popup__content-description">
                            <p className="popup__content-name">Description</p>
                            <textarea className="input_content"
                                ref={textAreaRef}
                                cols="30"
                                rows="10"
                            ></textarea>
                        </div>
                        <button
                            className="buttom_blue"
                            type="button"
                            onClick={() => dispatch(addItem({
                                id: Date.now(),
                                title: inputRef.current.value,
                                body: textAreaRef.current.value,

                            }))}

                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        ) : ''
    )
}

export default PopupAddPost