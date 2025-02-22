import React from 'react'
import {useState} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuestionList from './pages/questions/QuestionList'
import Home from './pages/Home.jsx'
import Sidebar from './pages/Sidebar.jsx'
import Navbar from './pages/Navbar.jsx'
import Tags from './pages/Tags.jsx'
import Users from './pages/Users.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Footer from './pages/Footer.jsx'
import AskQuestion from './pages/questions/AskQuestion.jsx'

import "primereact/resources/themes/lara-light-cyan/theme.css";

        

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/side' element={<Sidebar/>}/>
      <Route path='/nav' element={<Navbar/>}/>
      <Route path='/tag' element={<Tags/>}/>
      <Route path='/user' element={<Users/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/land' element={<LandingPage/>}/>
      <Route path='/abt' element={<About/>}/>
      <Route path='/service' element={<Services/>}/>
      <Route path='/askques' element={<AskQuestion/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='questions' element={<QuestionList/>}/>
    </Routes>
    </Router> 
  )
}

export default App
