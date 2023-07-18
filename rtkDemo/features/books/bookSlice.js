const createSlice = require('@reduxjs/toolkit').createSlice;

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
    }
})

module.exports = bookSlice.reducer;
module.exports.bookActions = bookSlice.actions;