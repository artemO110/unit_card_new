import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/posts';
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
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
    currentPost: {},
    status: null,
    disabledStatus: false,
    isSmallCards: true,
    isShowInfoPopup: false,
    isShowAddPopup: false,
    isShowEditPopup: false,
    isShowRemovePopup: false,
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState,

    reducers: {
        showFirstPosts: (state) => {
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
            state.currentPost = state.showItems.find(item => item.id === action.payload.id)
            state.currentPost.title = action.payload.title
            state.currentPost.body = action.payload.body

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
            const { id, title, body } = action.payload;
            if (title !== "" && body !== "") {

                state.showItems.push({ id, title, body });
                state.isShowAddPopup = false
            } else {
                alert('Create post: write title and content')
            }
        },
        openInfoPopup: (state, action) => {
            state.isShowInfoPopup = true
            state.currentPost = state.items.find(item => item.id === action.payload)
        },

        closeInfoPopup: (state) => {
            state.isShowInfoPopup = false
        },

        openEditPopup: (state, action) => {
            state.currentPost = state.items.find(item => item.id === action.payload)
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
            state.currentPost = state.showItems.find(item => item.id === action.payload)
        },

        closeRemovePopup: (state) => {
            state.isShowRemovePopup = false
        },
    },
    extraReducers: {

        [fetchPosts.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },

        [fetchPosts.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
            state.showItems = state.items.slice(state.start, state.end)

        },

        [fetchPosts.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }

})

export const {
    showFirstPosts,
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



} = postsSlice.actions

export default postsSlice.reducer