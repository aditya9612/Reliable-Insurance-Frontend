import React from 'react';

export interface TabItem {
    id: string;
    label: string;
}

interface UnderlineTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const UnderlineTabs: React.FC<UnderlineTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    if (!tabs || tabs.length === 0) return null;

    // Single tab edge-case
    if (tabs.length === 1) {
        const tab = tabs[0];
        return (
            <div className="bg-white rounded-2xl border border-brand-border p-3 shadow-sm w-full max-w-full">
                <button
                    onClick={() => onTabChange(tab.id)}
                    className="w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] font-bold bg-brand-primary text-white shadow-sm flex items-center justify-center border-none cursor-pointer"
                    title={tab.label}
                >
                    <span className="truncate">{tab.label}</span>
                </button>
            </div>
        );
    }

    // Split into exactly two balanced lines
    const mid = Math.ceil(tabs.length / 2);
    const row1 = tabs.slice(0, mid);
    const row2 = tabs.slice(mid);

    return (
        <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
            {/* Row 1 */}
            <div
                className="grid gap-2 w-full border-b border-brand-border pb-2.5"
                style={{ gridTemplateColumns: `repeat(${row1.length}, minmax(0, 1fr))` }}
            >
                {row1.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${
                                isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                            }`}
                            title={tab.label}
                        >
                            <span className="truncate">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Row 2 */}
            <div
                className="grid gap-2 w-full"
                style={{ gridTemplateColumns: `repeat(${row2.length}, minmax(0, 1fr))` }}
            >
                {row2.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${
                                isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                            }`}
                            title={tab.label}
                        >
                            <span className="truncate">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default UnderlineTabs;
