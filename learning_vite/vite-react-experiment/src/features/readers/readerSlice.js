import { createSlice } from '@reduxjs/toolkit';


const initalState = {
    members: ["john", "jacob", "Yasaw", "barawa", "dongo", "Frankie"],
    numOfMembers: 6,
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
        },
        bulkRemove: (state, action) => {
            state.members = state.members.filter(member => !action.payload.includes(member)); // Remove members from array
            state.numOfMembers -= action.payload.length; // Decrement numOfMembers by the number of removed members
        }
    }
})

export default readerSlice.reducer;
export const { addNew, remove, bulkAdd, bulkRemove } = readerSlice.actions;

