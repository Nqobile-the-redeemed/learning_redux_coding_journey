const store = require('./app/store');
const bookActions = require('..\features\books\bookSlice.js').bookActions;

console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("updated state", store.getState())
});

store.dispatch(bookActions.ordered(5));
store.dispatch(bookActions.returned(3));
store.dispatch(bookActions.restocked(10));

unsubscribe();