const configureStore = require('@reduxjs/toolkit').configureStore;
const reduxLogger = require('redux-logger');
const bookReducer = require('../features/books/bookSlice.js');
const readerReducer = require('../features/readers/readerSlice');
const userReducer = require('../features/users/userSlice');

const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer: {
        book: bookReducer,
        reader: readerReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

module.exports = store;