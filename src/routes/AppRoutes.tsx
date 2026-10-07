import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AuthLayout from '@layouts/AuthLayout'
import AdminLayout from '@layouts/AdminLayout'

// Auth pages
import Login from '@pages/auth/Login'
import ForgotPassword from '@pages/auth/ForgotPassword'
import ResetPassword from '@pages/auth/ResetPassword'

// Dashboard & Master
import Dashboard from '../pages/dashboard/Dashboard'
import BranchMaster from '../pages/admin/master/BranchMaster'
import PolicyMaster from '../pages/admin/master/PolicyMaster'
import VehicleMaster from '../pages/admin/master/VehicleMaster'
import AccountMaster from '../pages/admin/master/AccountMaster'
import BusinessMaster from '../pages/admin/master/BusinessMaster'
import UserMaster from '../pages/admin/user/UserMaster'
import Registration from '../pages/admin/registration/Registration'
import HrModule from '../pages/admin/hr/HrModule'
import CommissionGrid from '../pages/admin/commission/CommissionGrid'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/branch-master" element={<BranchMaster />} />
            <Route path="/policy-master" element={<PolicyMaster />} />
            <Route path="/vehicle-master" element={<VehicleMaster />} />
            <Route path="/account-master" element={<AccountMaster />} />
            <Route path="/operations/business-master" element={<BusinessMaster />} />
            <Route path="/users" element={<Navigate to="/users/role-master" replace />} />
            <Route path="/users/:tab" element={<UserMaster />} />
            <Route path="/registration" element={<Navigate to="/registration/employee" replace />} />
            <Route path="/registration/:tab" element={<Registration />} />
            <Route path="/hr" element={<Navigate to="/hr/executive-attendance" replace />} />
            <Route path="/hr/:tab" element={<HrModule />} />
            <Route path="/commission-grid" element={<Navigate to="/commission-grid/agent-commission" replace />} />
            <Route path="/commission-grid/:tab" element={<CommissionGrid />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
