import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import NavBar from '../components/dashboard/NavBar';
import AdminSummary from '../components/dashboard/AdminSummary'; // Ensure this is imported
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
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

  return (
    <div className='flex'>
      <AdminSidebar isOpen={isSidebarOpen} /> {/* Pass isOpen prop to AdminSidebar */}
      <div className={`flex-1 bg-gray-100 h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-[256px]' : 'ml-0'}`}>
        <NavBar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to NavBar */}
        <div className="p-6">
          <h1 className="text-2xl">Welcome, {user.name}!</h1>
          
        </div>
        {/* Include AdminSummary directly here */}
       
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;