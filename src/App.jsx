import React from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { ToastContainer } from 'react-toastify';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuestionList from './pages/questions/QuestionList'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Footer from './pages/Footer.jsx'
import AskQuestion from './pages/questions/AskQuestion.jsx'
import Dashboard from './pages/dashboard/Home';
import QuestionDetails from './pages/questions/QuestionDetails';
import Answer from './components/Answer.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import {QuestionsProvider} from "./context/QuestionsContext";
import UserList from "./pages/dashboard/users/UserList.jsx";


        

function App() {
  return (
      <QuestionsProvider>
   <Router>
    <Routes>
      <Route path='/' element={<Layout/>}>

        <Route path='questions' element={<QuestionList/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='question/:questionId' element={<QuestionDetails/>}/>
          <Route path="/users" element={<UserList/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/ans' element={<Answer/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/land' element={<LandingPage/>}/>
      <Route path='/abt' element={<About/>}/>
      <Route path='/service' element={<Services/>}/>
      <Route path='/askques' element={<AskQuestion/>}/>
      <Route path='/footer' element={<Footer/>}/>
       <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
    </Routes>
    <ToastContainer />
    </Router>
    </QuestionsProvider>
  )
}

export default App
