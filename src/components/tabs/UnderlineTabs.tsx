import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 4);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 4);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [tabs]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 350);
        }
    };

    return (
        <div className="relative bg-white rounded-2xl border border border-slate-200 p-2.5 shadow-sm w-full group">
            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white border border-slate-200 rounded-full shadow-md text-slate-600 hover:text-brand-primary transition-all cursor-pointer"
                    title="Scroll Left"
                >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex flex-row items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden w-full relative z-0 scroll-smooth py-0.5 px-0.5"
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer border-none flex items-center justify-center shrink-0 ${
                                isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                            }`}
                        >
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white border border-slate-200 rounded-full shadow-md text-slate-600 hover:text-brand-primary transition-all cursor-pointer"
                    title="Scroll Right"
                >
                    <ChevronRight size={16} strokeWidth={2.5} />
                </button>
            )}
        </div>
    );
};

export default UnderlineTabs;

