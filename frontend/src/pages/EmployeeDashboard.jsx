import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/NavBar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
    <Navbar/>
    <Outlet/>
    </div>
   </div>
  )
}

export default EmployeeDashboard