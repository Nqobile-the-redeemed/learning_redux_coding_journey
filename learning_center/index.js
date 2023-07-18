const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


const BOOK_ORDERED = 'BOOK_ORDERED';
const BOOK_RETURNED = 'BOOK_RETURNED';
const BOOKS_RESTOCKED = 'BOOKS_RESTOCKED';

const NEW_READER = 'NEW_READER';
const READER_LEFT = 'READER_LEFT';
const BULK_ADD_READERS = 'BULK_ADD_READERS';

function bookOrdered(quantity) {
  return {
    type: BOOK_ORDERED,
    payload: quantity,
  };
}

function bookReturned(quantity) {
  return {
    type: BOOK_RETURNED,
    payload: quantity,
  };
}

function booksRestocked(payload) {
  return {
    type: BOOKS_RESTOCKED,
    payload,
  };
}

function newReader(name) {
  return {
    type: NEW_READER,
    payload: name,
  };
}

function readerLeft(name) {
  return {
    type: READER_LEFT,
    payload: name,
  };
}

function bulkAddReaders(readers) {
  return {
    type: BULK_ADD_READERS,
    payload: readers,
  };
}

// const initialState = {
//     payload: 0,
//     members: [],
//     numOfMembers: 0,
// };

const initalBookState = {
    payload: 0,
};

const initalReaderState = {
    members: [],
    numOfMembers: 0,
};

function bookReducer(state = initalBookState, action) {
    switch (action.type) {
        case BOOK_ORDERED:
        return {
          ...state,
            payload: state.payload + action.payload,
        };
        case BOOK_RETURNED:
          return {
            ...state,
            payload: state.payload - action.payload,
          };
        case BOOKS_RESTOCKED:
          return {
            ...state,
            payload: state.payload + action.payload,
          };
        default:
        return state;
    }
    }

function readerReducer(state = initalReaderState, action) {
  switch (action.type) {
      case NEW_READER:
        return {
          ...state,
          members: [...state.members, action.payload],
          numOfMembers: state.numOfMembers + 1,
        };
      case READER_LEFT:
        return {
          ...state,
          members: state.members.filter(member => member !== action.payload),
          numOfMembers: state.numOfMembers - 1,
        };
      case BULK_ADD_READERS:
        return {
          ...state,
          members: [...state.members, ...action.payload],
          numOfMembers: state.numOfMembers + action.payload.length,
        };
      default:
      return state;
  }
      }

const rootReducer = combineReducers({
    book: bookReducer,
    reader: readerReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initialState", store.getState());

// store.subscribe(() => console.log("updated state", store.getState()));
unsubscribeBook = store.subscribe(() => {});

// store.dispatch(bookOrdered());
// store.dispatch(bookOrdered());
// store.dispatch(bookOrdered());
// store.dispatch(bookReturned());
// store.dispatch(booksRestocked(12));

const actions = bindActionCreators({ bookOrdered, bookReturned, booksRestocked, newReader, readerLeft, bulkAddReaders }, store.dispatch);
actions.bookOrdered(7);
actions.bookReturned(3);
actions.booksRestocked(25);
actions.newReader('John');
actions.newReader('Jane');
actions.readerLeft('John');
actions.bulkAddReaders(['Jack', 'Jill', 'James']);


unsubscribeBook();