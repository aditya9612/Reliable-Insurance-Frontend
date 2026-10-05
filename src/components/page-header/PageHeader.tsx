import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
                <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none mb-2">{title}</h1>
                {description && <p className="text-slate-500 text-sm">{description}</p>}
            </div>
            {action && (
                <div className="mt-4 sm:mt-0 flex gap-2">
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
