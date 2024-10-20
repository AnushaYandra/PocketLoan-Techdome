import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {

  return (
    <div> 
       <Navbar/>
       <ToastContainer />
       <div className="main-content"> 
         <Outlet />
       </div>
       <Footer />
    </div>
  )
}

export default App
