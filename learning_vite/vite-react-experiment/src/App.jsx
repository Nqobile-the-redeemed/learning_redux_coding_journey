import { useState } from 'react'
import './App.css'
import { UserView } from './features/users/userView'
import { ReaderView } from './features/readers/readerView'
import { BookView } from './features/books/bookView'

function App() {

  return (
    <>
      <div className="App">
        <UserView />
        <ReaderView />
        <BookView />
      </div>
    </>
  )
}

export default App
