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
import MyPage from '../pages/admin/other_modules/MyPage'
import MisReports from '../pages/admin/reports_analysis/MisReports'
import Recon from '../pages/admin/reports_analysis/Recon'
import HrModule from '../pages/admin/other_modules/HrModule'
import ClaimPage from '../pages/admin/operations/ClaimPage'
import RenewalPage from '../pages/admin/operations/RenewalPage'

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
            <Route path="/operations/claims" element={<ClaimPage />} />
            <Route path="/operations/renewal" element={<RenewalPage />} />
            <Route path="/other/my-page" element={<MyPage />} />
            <Route path="/other/hr" element={<HrModule />} />
            <Route path="/reports/mis" element={<MisReports />} />
            <Route path="/reports/recon" element={<Recon />} />
            <Route path="/reports" element={<MisReports />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
