import React, { useEffect, useState } from "react";
import PopupInfoUser from "../components/modal/popUpUsers/PopupInfoUsers";
import PopupEditUser from "../components/modal/popUpUsers/PopupEditUsers";
import PopupDeleteUser from "../components/modal/popUpUsers/PopupDeleteUsers";
import PopupAddUser from "../components/modal/popUpUsers/PopupAddUsers";


import { useSelector, useDispatch } from "react-redux";
import { CardUsers } from "../components/cards/CardUsers";
import {
    fetchUsers,
    showFirstUsers,
    addThreeItemsShow,
    changeSizeCard,

    openAddPopup,
} from "../redux/slices/usersSlice";

import './Articles.css'


const Users = (props) => {
    const [showLoadMore, setShowLoadMore] = useState(true);
    const { showItems, isSmallCards, } = useSelector(state => state.users);
    const dispatch = useDispatch()


    const showUsers = showItems.map(user => <CardUsers {...user} key={user.id} />)

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(showFirstUsers())
    }, [dispatch])

    function handleLoadMore() {
        if (showUsers.length < 5) {
            dispatch(addThreeItemsShow())
            console.log("showLoadMore", showLoadMore)
        } else {
            setShowLoadMore(false);
        }
    }

    return (
        <div className="container">
            <PopupInfoUser />
            <PopupEditUser />
            <PopupDeleteUser />
            <PopupAddUser />


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
                {showUsers}
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

export default Users;

