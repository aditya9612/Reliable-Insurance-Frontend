import React from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import PageHeader from '../../components/page-header/PageHeader';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, TrendingUp, Users, Activity } from 'lucide-react';

const data = [
    { name: 'Jan', pv: 2400 },
    { name: 'Feb', pv: 1398 },
    { name: 'Mar', pv: 9800 },
    { name: 'Apr', pv: 3908 },
    { name: 'May', pv: 4800 },
    { name: 'Jun', pv: 3800 },
    { name: 'Jul', pv: 4300 }
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icon size={22} />
            </div>
            {trend && <span className="text-green-500 text-sm font-semibold">{trend}</span>}
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="w-full h-full pb-10">
            <Breadcrumbs />
            <PageHeader
                title="Dashboard Overview"
                description="Monitor reliable associates enterprise KPIs and operational metrics."
                action={
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        Export Report
                    </button>
                }
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Transactions" value="124,592" icon={Activity} trend="+14.2%" />
                <StatCard title="Active Policies" value="45,021" icon={ShieldAlert} trend="+5.4%" />
                <StatCard title="Pending Approvals" value="1,204" icon={TrendingUp} />
                <StatCard title="Registered Agents" value="8,942" icon={Users} trend="+1.2%" />
            </div>

            {/* Chart Area */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Transaction History (YTD)</h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
