import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Book from './Components/Book'
import Allcustomer from './Components/Allcustomer'
import Edit from './Components/Edit'
import Footer from './Components/Footer'

const App = () => {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
           <Route path='/' element={<Book/>}></Route>
           <Route path='/allcustomer' element={<Allcustomer/>}></Route>
           <Route path='/edit/:id' element={<Edit/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
