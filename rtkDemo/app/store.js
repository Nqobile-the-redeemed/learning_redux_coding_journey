const configureStore = require('@reduxjs/toolkit').configureStore;
const reduxLogger = require('redux-logger');
const bookSlice = require('../features/books/bookSlice.js');
const readerSlice = require('../features/readers/readerSlice');

const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer: {
        book: bookSlice,
        reader: readerSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

module.exports = store;