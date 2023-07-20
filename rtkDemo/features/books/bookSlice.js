const createSlice = require('@reduxjs/toolkit').createSlice;
const readerActions = require('../readers/readerSlice.js').readerActions;

const initalState = {
    bookQuantity: 190,
}

const bookSlice = createSlice({
    name: 'book',
    initialState: initalState,
    reducers: {
        ordered: (state, action) => {
            state.bookQuantity += action.payload
        },
        returned: (state, action) => {
            state.bookQuantity -= action.payload
        },
        restocked: (state, action) => {
            state.bookQuantity += action.payload
        }
    },
    // extraReducers: {
    //     ["reader/addNew"]: (state, action) => {
    //         state.bookQuantity += 1
    //     },
    //     ["reader/bulkAdd"]: (state, action) => {
    //         state.bookQuantity += action.payload.length
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase(readerActions.addNew, (state, action) => {
            state.bookQuantity += 1
        })
        builder.addCase(readerActions.bulkAdd, (state, action) => {
            state.bookQuantity += action.payload.length
        })
    }
})

module.exports = bookSlice.reducer;
module.exports.bookActions = bookSlice.actions;
