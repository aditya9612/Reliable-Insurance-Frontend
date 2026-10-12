import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

const PolicyNoUpdate: React.FC = () => {
    // Table Search Filter State
    const [searchPolicy, setSearchPolicy] = useState('');
    const [searchAgent, setSearchAgent] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');

    const hasSearched = searchPolicy.length > 0 || searchAgent.length > 0 || searchCustomer.length > 0;

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="Policy No Update"
                description="Search and update existing policy numbers across the daily transaction database."
            />

            {/* Main Content / Table Area */}
            <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Advanced Multi-Search Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Policy No Here"
                            value={searchPolicy}
                            onChange={(e) => setSearchPolicy(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Agent Name Here"
                            value={searchAgent}
                            onChange={(e) => setSearchAgent(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Customer Name Here"
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>
                </div>

                {/* Empty State / Table View */}
                <div className="p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search size={32} className="text-slate-400" />
                    </div>
                    {hasSearched ? (
                        <>
                            <h3 className="text-slate-700 font-semibold mb-1">NO DATA FOUND</h3>
                            <p className="text-slate-500 text-sm">We could not find any active policies based on your current search filters.</p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-slate-700 font-semibold mb-1">START SEARCHING</h3>
                            <p className="text-slate-500 text-sm">Enter a Policy No, Agent Name, or Customer Name to begin.</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PolicyNoUpdate;
