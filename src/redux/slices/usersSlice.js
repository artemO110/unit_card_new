import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const { data } = await axios
            .get(url);
        return data
    }
)


const initialState = {
    start: 0,
    end: 3,
    items: [],
    showItems: [],
    currentUsers: {},
    status: null,
    disabledStatus: false,
    isSmallCards: true,
    isShowInfoPopup: false,
    isShowAddPopup: false,
    isShowEditPopup: false,
    isShowRemovePopup: false,
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        showFirstUsers: (state) => {
            state.showItems = state.items.slice(state.start, state.end)
        },
        addThreeItemsShow: (state) => {
            if (state.end <= 100) {
                state.start += 3
                state.end += 3
                const nextThreeItems = state.items.slice(state.start, state.end)
                state.showItems = state.showItems.concat(nextThreeItems)
            }
        },

        updateItem: (state, action) => {
            state.currentUsers = state.showItems.find(item => item.id === action.payload.id)
            state.currentUsers.name = action.payload.name
            state.currentUsers.username = action.payload.username
            state.currentUsers.email = action.payload.email
            state.currentUsers.website = action.payload.website
            state.currentUsers.phone = action.payload.phone
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingPostIndex = state.showItems.filter(item => item.id === id)
            state.isShowRemovePopup = false
            if (existingPostIndex !== -1) {
                state.showItems.splice(existingPostIndex, 1);
            }
        },

        changeSizeCard(state) {
            state.isSmallCards = !state.isSmallCards
        },
        addItem: (state, action) => {
            const { id, name, username, email, phone, website } = action.payload;
            if (name !== "" && username !== ""
                && email !== "" && phone !== "" && website !== "") {

                state.showItems.push({ id, name, username, email, phone, website });
                state.isShowAddPopup = false
            } else {
                alert('Create post: write title and content')
            }
        },
        openInfoPopup: (state, action) => {
            state.isShowInfoPopup = true
            state.currentUsers = state.items.find(item => item.id === action.payload)
        },

        closeInfoPopup: (state) => {
            state.isShowInfoPopup = false
        },

        openEditPopup: (state, action) => {
            state.currentUsers = state.items.find(item => item.id === action.payload)
            state.isShowEditPopup = true
        },

        closeEditPopup: (state) => {
            state.isShowEditPopup = false
        },

        openAddPopup: (state) => {
            state.isShowAddPopup = true
        },

        closeAddPopup: (state) => {
            state.isShowAddPopup = false
        },

        openRemovePopup: (state, action) => {
            state.isShowRemovePopup = true
            state.currentUsers = state.showItems.find(item => item.id === action.payload)
        },

        closeRemovePopup: (state) => {
            state.isShowRemovePopup = false
        },
    },
    extraReducers: {

        [fetchUsers.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },

        [fetchUsers.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
            state.showItems = state.items.slice(state.start, state.end)

        },

        [fetchUsers.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }

})

export const {
    showFirstUsers,
    addThreeItemsShow,
    openInfoPopup,
    closeInfoPopup,
    openEditPopup,
    closeEditPopup,
    openAddPopup,
    closeAddPopup,
    openRemovePopup,
    closeRemovePopup,
    removeItem,
    updateItem,
    changeSizeCard,
    addItem,



} = usersSlice.actions

export default usersSlice.reducer