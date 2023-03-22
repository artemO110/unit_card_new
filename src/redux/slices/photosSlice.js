import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/photos';
export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
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
    currentPhotos: {},
    status: null,
    disabledStatus: false,
    isSmallCards: true,
    isShowInfoPopup: false,
    isShowAddPopup: false,
    isShowEditPopup: false,
    isShowRemovePopup: false,
}


export const usersSlice = createSlice({
    name: 'photos',
    initialState,

    reducers: {
        showFirstItem: (state) => {
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
            state.currentPhotos = state.showItems.find(item => item.id === action.payload.id)
            state.currentPhotos.title = action.payload.title
            state.currentPhotos.url = action.payload.url
            state.currentPhotos.thumbnailUrl = action.payload.thumbnailUrl

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
            const { id, title, thumbnailUrl } = action.payload;
            if (title !== "" && thumbnailUrl !== "") {

                state.showItems.push({ id, title, thumbnailUrl });
                state.isShowAddPopup = false
            } else {
                alert('Create post: write title and content')
            }
        },
        openInfoPopup: (state, action) => {
            state.isShowInfoPopup = true
            state.currentPhotos = state.items.find(item => item.id === action.payload)
        },

        closeInfoPopup: (state) => {
            state.isShowInfoPopup = false
        },

        openEditPopup: (state, action) => {
            state.currentPhotos = state.items.find(item => item.id === action.payload)
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
            state.currentPhotos = state.showItems.find(item => item.id === action.payload)
        },

        closeRemovePopup: (state) => {
            state.isShowRemovePopup = false
        },
    },
    extraReducers: {

        [fetchPhotos.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },

        [fetchPhotos.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
            state.showItems = state.items.slice(state.start, state.end)

        },

        [fetchPhotos.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }

})

export const {
    showFirstItem,
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