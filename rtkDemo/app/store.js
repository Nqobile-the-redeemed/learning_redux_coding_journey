const configureStore = require('@reduxjs/toolkit').configureStore;
const bookSlice = require('..\features\books\bookSlice.js');
const readerSlice = require('../features/readers/readerSlice');

const store = configureStore({
    reducer: {
        book: bookSlice,
        reader: readerSlice,
    }
})

module.exports = store;