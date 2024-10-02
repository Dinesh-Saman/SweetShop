// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewStaff from './Pages/view_staff';
import AddStaff from './Pages/add_staff';
import UpdateStaff from './Pages/update_staff';
import Login from './Pages/login';
import MarkAttendance from './Pages/mark_attendance';
import ViewAttendance from './Pages/view_attendance';
import Register from './Pages/register';
import UserDashboard from './Pages/UserDashboard';
import ViewAllAttendance from './Pages/view_all_attendance';
import ViewAllLeaves from './Pages/view_all_leaves';
import StaffDashboard from './Pages/staffDashboard';
import StaffReport from './Pages/staff_report';
import HomePageMain from './Pages/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePageMain />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view-employee" element={<ViewStaff />} />
        <Route path="/add-employee" element={<AddStaff />} />
        <Route path="/employee-report" element={<StaffReport />} />
        <Route path="/all-attendance" element={<ViewAllAttendance />} />
        <Route path="/update-employee/:id" element={<UpdateStaff />} />

        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/view-leaves" element={<ViewAllLeaves />} />

      </Routes>
    </div>
  );
}

export default App;
