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
        'users': 'Users',
        'registration': 'Registration',
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
