"use client";

import ReactSelect from "react-select";

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
                <ReactSelect 
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                    }}
                    classNames={{ 
                        control: () => "text-sm"
                    }}
                    isMulti
                />
            </div>
        </div>
    );
}
 
export default SelectPeople;