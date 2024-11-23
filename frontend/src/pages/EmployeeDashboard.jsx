import React, { useState, useEffect } from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/NavBar';
import { useAuth } from '../context/authContext';


const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  // Close the sidebar when the window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Keep sidebar open on larger screens
      } else {
        setIsSidebarOpen(false); // Hide sidebar on smaller screens
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { user } = useAuth();

  return (
    <div className='flex'>
      <Sidebar isOpen={isSidebarOpen} /> {/* Pass isOpen prop to Sidebar */}
      <div className={`flex-1 bg-gray-100 h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-[256px]' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to Navbar */}
        <div className="p-6">
          <h1 className="text-2xl">Welcome!</h1>
          <h1 className="text-2xl">{user.name}</h1>
          
          {/* This is where the routed content will be displayed */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;