import React from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Truck, Tractor, CarFront, Car } from 'lucide-react';

const options = [
    {
        id: 'gcv',
        title: 'GCV',
        subtitle: 'Public GCV',
        icon: Truck,
        color: 'text-blue-500',
        bgHover: 'hover:bg-blue-50',
        borderFocus: 'border-blue-500'
    },
    {
        id: 'misc-d',
        title: 'MISC-D',
        subtitle: 'Agricultural & Special',
        icon: Tractor,
        color: 'text-emerald-500',
        bgHover: 'hover:bg-emerald-50',
        borderFocus: 'border-emerald-500'
    },
    {
        id: 'three-wheeler-gcv',
        title: 'THREE-WHEELER GCV',
        subtitle: 'Cargo / Goods Carrier',
        icon: Car,
        color: 'text-amber-500',
        bgHover: 'hover:bg-amber-50',
        borderFocus: 'border-amber-500'
    },
    {
        id: 'three-wheeler-pcv',
        title: 'THREE-WHEELER PCV',
        subtitle: 'Passenger Carrying Vehicle',
        icon: CarFront,
        color: 'text-indigo-500',
        bgHover: 'hover:bg-indigo-50',
        borderFocus: 'border-indigo-500'
    }
];

const SelfQuotation: React.FC = () => {
    const handleSelectOption = (id: string) => {
        // Placeholder for routing to the respective quotation form
        alert(`Proceeding to quotation flow for: ${id.toUpperCase()}`);
    };

    return (
        <div className="w-full flex flex-col space-y-6">
            <PageHeader
                title="Self Quotation"
                description="Select a vehicle category to initiate a new quotation."
            />

            <div className="w-full max-w-5xl mx-auto mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {options.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSelectOption(option.id)}
                                className={`group flex flex-col items-center justify-center p-12 bg-white rounded-2xl border-2 border-slate-200 shadow-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${option.bgHover} hover:${option.borderFocus} cursor-pointer focus:outline-none`}
                            >
                                <div className={`mb-6 p-6 rounded-full bg-slate-50 group-hover:bg-white transition-colors duration-300 ${option.color}`}>
                                    <Icon size={80} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-center mb-2">
                                    {option.title}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 text-center uppercase tracking-wider">
                                    {option.subtitle}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelfQuotation;
