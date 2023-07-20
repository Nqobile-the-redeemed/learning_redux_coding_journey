import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookReducer from '../features/books/bookSlice.js';
import readerReducer from '../features/readers/readerSlice';
import userReducer from '../features/users/userSlice';


const logger = createLogger();

const store = configureStore({
    reducer: {
        book: bookReducer,
        reader: readerReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;