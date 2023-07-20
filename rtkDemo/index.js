const store = require('./app/store');
const bookActions = require('./features/books/bookSlice.js').bookActions;
const readerActions = require('./features/readers/readerSlice.js').readerActions;
const fetchUsers = require('./features/users/userSlice.js').fetchUsers;

console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("updated state", store.getState());
});

// store.dispatch(bookActions.ordered(5));
// store.dispatch(readerActions.addNew("John"));
// store.dispatch(readerActions.addNew("Jane"));
// store.dispatch(readerActions.addNew("Jack"));
// store.dispatch(bookActions.returned(3));
// store.dispatch(readerActions.remove("John"));
// store.dispatch(bookActions.restocked(10));
// store.dispatch(readerActions.bulkAdd(["Jill", "James", "Judy", "Jasmine", "Jared"]));
store.dispatch(fetchUsers());

// unsubscribe();