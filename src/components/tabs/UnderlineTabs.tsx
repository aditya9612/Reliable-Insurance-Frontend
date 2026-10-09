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
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [tabs]);

    useEffect(() => {
        // Timeout ensures DOM layout is computed
        const timeoutId = setTimeout(() => {
            const activeEl = tabRefs.current[activeTab];
            if (activeEl) {
                setIndicatorStyle({
                    left: activeEl.offsetLeft,
                    width: activeEl.offsetWidth,
                    opacity: 1
                });
            }
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [activeTab, tabs]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 350); // check after smooth scroll completes
        }
    };

    return (
        <div className="relative border-b border-[#DCE6F0] bg-white w-full group">
            {/* Optional fade out element to show more items exist */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-start pl-1 bg-gradient-to-r from-white via-white/80 to-transparent text-[#66809F] hover:text-[#2563EB] transition-colors"
                >
                    <div className="bg-white border border-[#DCE6F0] rounded-full shadow-sm p-0.5 flex items-center justify-center">
                        <ChevronLeft size={16} strokeWidth={2.5} />
                    </div>
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex flex-row items-center gap-7 px-2 sm:px-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-[54px] w-full relative z-0 scroll-smooth"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        ref={(el) => { tabRefs.current[tab.id] = el; }}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative h-[54px] flex flex-col justify-center px-1 sm:px-2 font-medium text-sm whitespace-nowrap transition-colors cursor-pointer shrink-0 ${activeTab === tab.id
                            ? 'text-[#2563EB] font-semibold'
                            : 'text-[#102A4C] font-medium hover:text-[#2563EB]'
                            }`}
                    >
                        <span>{tab.label}</span>
                    </button>
                ))}

                {/* Sliding Indicator */}
                <span
                    className="absolute bottom-0 h-[2px] bg-[#2563EB] rounded-t-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none"
                    style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px`, opacity: indicatorStyle.opacity }}
                />
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-end pr-1 bg-gradient-to-l from-white via-white/80 to-transparent text-[#66809F] hover:text-[#2563EB] transition-colors"
                >
                    <div className="bg-white border border-[#DCE6F0] rounded-full shadow-sm p-0.5 flex items-center justify-center">
                        <ChevronRight size={16} strokeWidth={2.5} />
                    </div>
                </button>
            )}
        </div>
    );
};

export default UnderlineTabs;
