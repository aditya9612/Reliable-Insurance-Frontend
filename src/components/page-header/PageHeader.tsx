import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 pb-2.5 border-b border-slate-200">
            <div>
                <h1 className="text-[24px] sm:text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1">{title}</h1>
                {description && <p className="text-slate-500 text-xs sm:text-sm">{description}</p>}
            </div>
            {action && (
                <div className="mt-3 sm:mt-0 flex gap-2">
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
