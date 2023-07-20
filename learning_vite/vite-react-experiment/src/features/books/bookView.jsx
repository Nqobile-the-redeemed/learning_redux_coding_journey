import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNew, remove, bulkAdd, bulkRemove } from './readerSlice.js';
import { ordered, returned, bulkAddBooks, bulkRemoveBooks  } from '../books/bookSlice.js'; // Import addNew from bookSlice.js


export const BookView = () => {

    // The variouse imports
    const dispatch = useDispatch();



    // The variouse states
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [ShowBulkBookOptions, setShowBulkBookOptions] = useState(false); // State to manage toggle of bulk options
    const [newBookName, setNewBookName] = useState('');
    const [removeBookName, setRemoveBookName] = useState('');
    const [bulkBookNames, setBulkBookNames] = useState([]);
    const [removeBulkBookNames, setRemoveBulkBookNames] = useState([]);



    // The variouse handlers
    const handleNameChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, ...selectedOptions]);
    };


    // Handler for adding a single book
    const handleAddBook = () => {
        if (newBookName.trim() !== '') {
        dispatch(ordered(newBookName));
        setNewBookName('');
        }
    };

    // Handler for removing a single book
    const handleRemoveBook = () => {
        if (removeBookName.trim() !== '') {
        dispatch(returned(removeBookName));
        setRemoveBookName('');
        }
    };

    // Handler for bulk adding books
    const handleBulkAddBooks = () => {
        if (bulkBookNames.trim() !== '') {
        const namesArray = bulkBookNames.split(',').map(name => name.trim());
        dispatch(bulkAddBooks(namesArray));
        setBulkBookNames('');
        }
    };

    // Handler for bulk removing books
    const handleBulkRemoveBooks = () => {
        if (selectedBooks.length > 0) {
        dispatch(bulkRemoveBooks(selectedBooks));
        setSelectedBooks([]);
        }
    };



    // The book data
    const books = useSelector((state) => state.book);
    const bookNames = books.bookNames; // Use bookNames directly from the books object
    const bookQuantity = bookNames.length;


    return (
        <div>
          <h1>Book View</h1>
          <div>
            <p>Book Counter: {bookQuantity} </p>
          </div>
          <div>
            <h3>Book List</h3>
            <ul>
              {bookNames.map((name, index) => (
                <li key={books[index]}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            {/* Toggle switch */}
            <label htmlFor="toggleBulkOptions">Toggle Bulk Options: </label>
            <input
              type="checkbox"
              id="toggleBulkOptions"
              checked={ShowBulkBookOptions}
              onChange={() => setShowBulkBookOptions(prevShowBulkBookOptions => !prevShowBulkBookOptions)}
            />
          </div>
          <div>
            {/* Conditional rendering based on ShowBulkBookOptions state */}
            {ShowBulkBookOptions ? (
              <div>
                <div>
                    {/* Input field for bulk adding books */}
                    <textarea
                        placeholder="New Readers Books. Please add one book per line."
                        value={bulkBookNames}
                        onChange={(e) => setBulkBookNames(e.target.value)}
                    />
                    <button onClick={handleBulkAddBooks}>Bulk Add Books</button>
                 </div>
                <div>
                  <div>
                    <label htmlFor="bookNames">Select Books</label>
                    <select
                      name="bookNames"
                      multiple
                      value={selectedBooks}
                      onChange={handleNameChange}
                      id="bookNames"
                    >
                      {bookNames.map((name, index) => (
                        <option key={name[index]} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <p>Selected Books: {selectedBooks.join(', ')}</p>
                    </div>
                  </div>
                  <button onClick={handleBulkRemoveBooks} >Bulk Remove Book</button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div>
                    <input type="text" placeholder="Book Name" />
                    <button onClick={} >Add Book</button>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="bookName">Select a Book</label>
                      <select name="bookName" id="bookName">
                        {bookNames.map((name, index) => (
                          <option key={books[index]} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button>Remove Book</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}
