const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const produce = require('immer').produce;

const initalState = {
    book: "Alegory of a Boken Man",
    category: "Fiction",
    Tags: ["fight", "war", "philosophy"],
    copies: {
        available: 5,
        checkedOut: 0,
        copyIDs: [1, 2, 3, 4, 5],
    },
    readers: {
        members: ["John", "Jane", "Jack", "Jill"],
        numOfMembers: 4,
        checkOutDates: {
            1: "2020-01-01",
            2: "2020-01-02",
            3: "2020-01-03",
            4: "2020-01-04",
            5: "2020-01-05",
        },
    },
    }

const  UPDATE_BOOK_NAME = "UPDATE_NAME";
const NEW_COPY = "NEW_COPY";

function updateBookName(newName) {
    return {
        type: UPDATE_BOOK_NAME,
        payload: newName,
    };
}

function newCopy(copyID) {
    return {
        type: NEW_COPY,
        payload: copyID,
    };
}

function bookReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_BOOK_NAME:
            return {
                ...state,
                book: action.payload,
            };
        case NEW_COPY:
            // return {
            //     ...state,
            //     copies: {
            //         ...state.copies,
            //         copyIDs: [...state.copies.copyIDs, action.payload],
            //         available: state.copies.available + 1,
            //     },
            // };
            return produce(state, draftState => {
                draftState.copies.copyIDs.push(action.payload);
                draftState.copies.available++;
            });
        default: 
            return state;
    }
}

const store = createStore(bookReducer);

console.log( "INITAL STATE", store.getState());

unsubscribeBook = store.subscribe(() => console.log("updated state", store.getState()));

const actions = bindActionCreators({ updateBookName, newCopy }, store.dispatch);

actions.updateBookName("New Aramagedon");
actions.newCopy(12);
actions.updateBookName("Tales of the Abyss");
actions.newCopy(9);
actions.updateBookName("The Last of Us");
actions.newCopy(10);
actions.updateBookName("The Last of Us 2");
actions.newCopy(6);


unsubscribeBook();