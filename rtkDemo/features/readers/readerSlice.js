const createSlice = require('@reduxjs/toolkit').createSlice;

const initalState = {
    members: [],
    numOfMembers: 0,
}

const readerSlice = createSlice({
    name: 'reader',
    initialState: initalState,
    reducers: {
        addNew: (state, action) => {
            state.members.push(action.payload); // Add new member to the array
            state.numOfMembers++; // Increment numOfMembers
        },
        remove: (state, action) => {
            state.members = state.members.filter(member => member !== action.payload); // Remove member from array
            state.numOfMembers--; // Decrement numOfMembers
        },
        bulkAdd: (state, action) => {
            state.members = state.members.concat(action.payload); // Add new members to array
            state.numOfMembers += action.payload.length; // Increment numOfMembers by the number of new members
        }
    }
})

module.exports = readerSlice.reducer;
module.exports.readerActions = readerSlice.actions;

