import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    error: "",
    userQuantity: 0,
    userIDs: [],
    userNames: [],
}

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
       return axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data
            // const users = response.data.map(user => user.name)
            return users
        })
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.userQuantity = action.payload.length
            state.userIDs = action.payload.map(user => user.id)
            state.userNames = action.payload.map(user => user.name)
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.userQuantity = 0
            state.userIDs = []
            state.userNames = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer;
