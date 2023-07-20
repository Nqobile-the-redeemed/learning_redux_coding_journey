import { createSlice } from '@reduxjs/toolkit';
import { addNew as newUserBook, bulkAdd as bulkAddNewUserBooks } from '../readers/readerSlice.js';

const initalState = {
    bookQuantity: 2,
    bookNames: ["crazy rich Asians", "the lion king"],
}

const bookSlice = createSlice({
    name: 'book',
    initialState: initalState,
    reducers: {
        ordered: (state, action) => {
            state.bookQuantity --
            state.bookNames.filter(book => book !== action.payload)
        },
        returned: (state, action) => {
            state.bookQuantity ++
            state.bookNames.push(action.payload)

        },
        bulkAddBooks: (state, action) => {
            state.bookQuantity += action.payload.length
            state.bookNames = state.bookNames.concat(action.payload)
        },
        bulkRemoveBooks: (state, action) => {
            state.bookQuantity -= action.payload.length
            state.bookNames = state.bookNames.filter(book => !action.payload.includes(book))
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
        builder.addCase(newUserBook, (state, action) => {
            state.bookQuantity ++
            state.bookNames.push(action.payload)
        })
        builder.addCase(bulkAddNewUserBooks, (state, action) => {
            state.bookQuantity += action.payload.length
            state.bookNames = state.bookNames.concat(action.payload)
        })
    }
})

export default bookSlice.reducer;
export const { ordered, returned, bulkAddBooks, bulkRemoveBooks } = bookSlice.actions;
