import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNew, remove, bulkAdd, bulkRemove } from './readerSlice.js';
import { ordered, returned, bulkAddBooks, bulkRemoveBooks  } from '../books/bookSlice.js'; // Import addNew from bookSlice.js


export const ReaderView = () => {

    // The variouse states
    const [selectedNames, setSelectedNames] = useState([]);
    const [showBulkOptions, setShowBulkOptions] = useState(false);
    const [newReaderName, setNewReaderName] = useState('');
    const [selectedReaderName, setSelectedReaderName] = useState('');
    const [newReaderBook, setNewReaderBook] = useState('');
    const [bulkReaderBook, setBulkReaderBook] = useState([]);
    const [bulkReaderNames, setBulkReaderNames] = useState([]);

    
    // The variouse handlers
    const handleNameChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedNames(prevSelectedNames => [...prevSelectedNames, ...selectedOptions]);
    };
    
    const handleAddReader = () => {
        dispatch(addNew(newReaderName));
        setNewReaderName('');
    };

    const handleRemoveReader = () => {
        dispatch(remove(selectedReaderName));
        setSelectedReaderName('');
    };

    const handleBulkAdd = () => {
        const namesArray = bulkReaderNames.split(",").map(name => name.trim());
        console.log(namesArray)
        dispatch(bulkAdd(namesArray));
        setBulkReaderNames('');
    };

    const handleBulkRemove = () => {
        dispatch(bulkRemove(selectedNames));
        setSelectedNames([]);
    };

    const handleBulkAddBooks = () => {
        // Split the textarea value into individual lines
        const books = bulkReaderBook.split(',').map(name => name.trim());
        console.log(books)
        dispatch(bulkAddBooks(books));
        setBulkReaderBook(''); // Clear the textarea after dispatching the action
    };

    const handleNewUserBookSingle = () => {
        dispatch(returned(newReaderBook));
        setNewReaderBook(''); // Clear the input after dispatching the action
      };


    // The variouse imports
    const dispatch = useDispatch();

  
    // The reader data
    const readers = useSelector((state) => state.reader);
    const readerNames = readers.members; // Use members directly from the readers object
    const readerQuantity = readers.numOfMembers;

    // The book data
    const books = useSelector((state) => state.book);
    const bookNames = books.bookNames; // Use bookNames directly from the books object
    const bookQuantity = bookNames.length;

    

    return (
        <div>
          <h1>Reader View</h1>
          <div>
            <p>Readers Counter: {readerQuantity} </p>
          </div>
          <div>
            <h3>Readers List</h3>
            <ul>
              {readerNames.map((name, index) => (
                <li key={readerNames[index]}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            {/* Toggle switch */}
            <label htmlFor="toggleBulkOptions">Toggle Bulk Options: </label>
            <input
              type="checkbox"
              id="toggleBulkOptions"
              checked={showBulkOptions}
              onChange={() => setShowBulkOptions(prevShowBulkOptions => !prevShowBulkOptions)}
            />
          </div>
          <div>
            {/* Conditional rendering based on showBulkOptions state */}
            {showBulkOptions ? (
        <div>
          <div>
            <textarea
              placeholder="Reader Names (one name per line)"
              value={bulkReaderNames}
              onChange={(e) => setBulkReaderNames(e.target.value)}
            />
            <button onClick={handleBulkAdd}>Bulk Add Reader</button>
          </div>
          <div>
            <div>
              <label htmlFor="readerNames">Select Readers To Remove</label>
              <select
                name="readerNames"
                multiple
                value={selectedNames}
                onChange={handleNameChange}
                id="readerNames"
              >
                {readerNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div>
                <p>Selected Readers: {selectedNames.join(', ')}</p>
              </div>
            </div>
            <button onClick={handleBulkRemove}>Bulk Remove Reader</button>
          </div>
            <div>
                <textarea
                placeholder="New Readers Books please add one book per line"
                value={bulkReaderBook}
                onChange={(e) => setBulkReaderBook(e.target.value)}
                />
                <button onClick={handleBulkAddBooks}>Add Books</button>
        </div>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Reader Name"
              value={newReaderName}
              onChange={(e) => setNewReaderName(e.target.value)}
            />
            <button onClick={handleAddReader}>Add Reader</button>
          </div>
          <div>
            <div>
              <label htmlFor="readerName">Select a Reader</label>
              <select
                name="readerName"
                id="readerName"
                value={selectedReaderName}
                onChange={(e) => setSelectedReaderName(e.target.value)}
              >
                {readerNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleRemoveReader}>Remove Reader</button>
          </div>
            <div>
                <input
                type="text"
                placeholder="New Reader Book"
                value={newReaderBook}
                onChange={(e) => setNewReaderBook(e.target.value)}
                />
                <button onClick={handleNewUserBookSingle}>Add Book</button>
            </div>
        </div>
      )}
          </div>
        </div>
      );
}
