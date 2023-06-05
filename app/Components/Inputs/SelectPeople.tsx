"use client";

interface SelectPeopleProps {
    label: string;
    disabled?: boolean;
    options: Record<string, any>[];
    onChange: (value: Record<string, any>) => void;
    value?: Record<string, any>;
}

const SelectPeople: React.FC<SelectPeopleProps> = ({
    label,
    disabled,
    options,
    onChange,
    value,
}) => {
    return ( 
        <div className="z-[100]">
            <label className="block text-sm font-medium text-gray-900 leading-6">{label}</label>

            <div className="mt-2">
                
            </div>
        </div>
    );
}
 
export default SelectPeople;