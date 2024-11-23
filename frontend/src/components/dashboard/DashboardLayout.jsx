import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import NavBar from './NavBar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-[256px]' : 'ml-0'} md:ml-[256px]`}>
        {/* Your main content goes here */}
        <h1 className="p-6">Dashboard Content</h1>
      </div>
    </>
  );
};

export default DashboardLayout;