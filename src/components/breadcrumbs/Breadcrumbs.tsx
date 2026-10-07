import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Provide friendly names for root paths or raw names for deep paths
    const routeNameMap: Record<string, string> = {
        'dashboard': 'Dashboard',
        'branch-master': 'Branch Master',
        'policy-master': 'Policy Master',
        'vehicle-master': 'Vehicle Master',
        'account-master': 'Account Master',
        'users': 'User Management',
        'role-master': 'User Role Master',
        'designation-master': 'Designation Master',
        'client-app-user': 'Client App User',
        'assign-privileges': 'Assign Privileges',
        'assign-location-head': 'Assign Location Head',
        'temporary-operator': 'Temporary Operator',
        'login-history': 'Login History',
        'registration': 'Registration',
        'employee': 'Employee',
        'agent': 'Agent',
        'view-agent': 'View Agent',
        'view-employee': 'View Employee',
        'bank-beneficiary': 'Bank Beneficiary',
        'delete-vehicle': 'Delete Vehicle',
        'deactivated-agent-list': 'Deactivated Agent List',
        'hr': 'HR Module',
        'executive-attendance': 'Executive Attendance',
        'attendance': 'Attendance',
        'salary-process': 'Salary Process',
        'employee-payment': 'Employee Payment',
        'holiday-master': 'Holiday Master',
        'employee-master': 'Employee Master',
        'leave-management': 'Leave Management',
        'leave-type': 'Leave Type',
        'organization-master': 'Organization Master',
        'department-master': 'Department Master',
        'salary-slip': 'Salary Slip',
        'employee-advance': 'Employee Advance',
        'view-employee-advance': 'View Employee Advance',
        'apply-leave': 'Apply Leave',
        'leave-report': 'Leave Report',
        'commission-grid': 'Commission Grid',
        'agent-commission': 'Agent Commission',
        'multiple-agent-commission': 'Multiple Agent Commission',
        'broker-commission': 'Broker Commission',
        'multiple-broker-commission': 'Multiple Broker Commission',
        'extra-commission-amount': 'Extra Commission Amount',
        'latest-agent-commission': 'Latest Agent Commission',
        'broker-latest-grid': 'Broker Latest Grid',
        'new-broker-commission': 'New Broker Commission',
        'new-agent-commission': 'New Agent Commission',
        'executive-self-incentive': 'Executive Self Incentive',
        'multiple-executive-self-incentive': 'Multiple Executive Self Incentive',
        'check-grid': 'Check Grid',
        'comm-veh-age': 'Comm Veh Age',
        'year-slab': 'Year Slab',
        'multiple-agent-broker-comm': 'Multiple Agent Broker Comm',
        'import-broker-grid': 'Import Broker Grid',
        'decline-model-new': 'Decline Model New',
        'transactions': 'Transactions',
        'accounts': 'Accounts',
        'reports': 'Reports',
    };

    return (
        <nav className="flex items-center space-x-1 text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors flex items-center">
                <Home size={14} className="mr-1" /> Home
            </Link>

            {pathnames.map((value, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                // Format the route name to title case if not in map
                const friendlyName = routeNameMap[value] || value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                return (
                    <React.Fragment key={to}>
                        <ChevronRight size={14} className="text-slate-300 mx-0.5" />
                        {isLast ? (
                            <span className="text-slate-700 font-medium" aria-current="page">
                                {friendlyName}
                            </span>
                        ) : (
                            <Link to={to} className="hover:text-blue-600 transition-colors">
                                {friendlyName}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
