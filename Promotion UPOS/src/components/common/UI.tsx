import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, Check, MoreVertical } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#5e5ce6] text-white hover:bg-[#4d4acb] shadow-indigo-100 shadow-md',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-700',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
    };

    const sizes = {
        sm: 'px-6 py-1.5 text-sm',
        md: 'px-8 py-2.5',
        lg: 'px-10 py-3 text-lg font-bold',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
            ) : null}
            {children}
        </button>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
    const InputComponent = props.type === 'textarea' ? 'textarea' : 'input';

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>}
            <div className="relative">
                <InputComponent
                    className={`w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-black focus:outline-none focus:ring-1 focus:ring-[#5e5ce6] transition-all placeholder:text-gray-400 ${icon ? 'pr-10' : ''} ${className}`}
                    {...(props as any)}
                />
                {icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                        {icon}
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export const Select: React.FC<{
    label?: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}> = ({ label, value, options, onChange, placeholder, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
            {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-black cursor-pointer flex justify-between items-center hover:border-gray-300 transition-colors"
            >
                <span className={selectedOption ? 'text-black' : 'text-gray-400'}>
                    {selectedOption ? selectedOption.label : placeholder || 'เลือก...'}
                </span>
                <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm ${value === opt.value ? 'bg-indigo-50 text-[#5e5ce6] font-medium' : 'text-gray-700'
                                }`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const MultiSelect: React.FC<{
    label?: string;
    values: string[];
    options: { label: string; value: string }[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    className?: string;
}> = ({ label, values, options, onChange, placeholder, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (val: string) => {
        if (values.includes(val)) {
            onChange(values.filter(v => v !== val));
        } else {
            onChange([...values, val]);
        }
    };

    const removeValue = (e: React.MouseEvent, val: string) => {
        e.stopPropagation();
        onChange(values.filter(v => v !== val));
    };

    const isAllSelected = filteredOptions.length > 0 && filteredOptions.every(opt => values.includes(opt.value));

    const toggleAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isAllSelected) {
            const remainingValues = values.filter(v => !filteredOptions.some(opt => opt.value === v));
            onChange(remainingValues);
        } else {
            const allFilteredValues = filteredOptions.map(opt => opt.value);
            onChange([...new Set([...values, ...allFilteredValues])]);
        }
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
            {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-200 rounded-lg p-1.5 flex flex-wrap gap-1.5 min-h-[44px] cursor-pointer hover:border-gray-300 transition-colors"
            >
                {values.length === 0 ? (
                    <span className="text-gray-400 px-1.5 py-1">{placeholder || 'เลือกรายการ...'}</span>
                ) : (
                    values.map(val => {
                        const optLabel = options.find(o => o.value === val)?.label || val;
                        return (
                            <div key={val} className="bg-indigo-50 text-[#5e5ce6] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-1 group">
                                {optLabel}
                                <button onClick={(e) => removeValue(e, val)} className="hover:bg-indigo-100 rounded p-0.5">
                                    <X size={14} />
                                </button>
                            </div>
                        );
                    })
                )}
                <div className="ml-auto flex items-center pr-1 text-gray-400">
                    <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="ค้นหา..."
                                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        <div
                            onClick={toggleAll}
                            className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b border-gray-50"
                        >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAllSelected ? 'bg-[#5e5ce6] border-[#5e5ce6]' : 'border-gray-300'}`}>
                                {isAllSelected && <div className="w-2.5 h-0.5 bg-white rounded" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">เลือกทั้งหมด</span>
                        </div>

                        {filteredOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => toggleOption(opt.value)}
                                className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${values.includes(opt.value) ? 'bg-[#5e5ce6] border-[#5e5ce6]' : 'border-gray-300'}`}>
                                    {values.includes(opt.value) && <Check size={14} className="text-white" />}
                                </div>
                                <span className="text-sm text-gray-700">{opt.label}</span>
                            </div>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="px-4 py-8 text-center text-sm text-gray-400">ไม่พบสินค้า</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const GlassPanel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
            {children}
        </div>
    );
};

export const Breadcrumb: React.FC<{ items: { label: string; href?: string }[] }> = ({ items }) => {
    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <span>/</span>}
                    {item.href ? (
                        <a href={item.href} className="hover:text-[#5e5ce6] transition-colors">{item.label}</a>
                    ) : (
                        <span className="font-medium text-gray-900">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export const Badge: React.FC<{
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
    className?: string;
}> = ({ children, variant = 'neutral', className = '' }) => {
    const variants = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        error: 'bg-red-50 text-red-700 border-red-100',
        neutral: 'bg-slate-50 text-slate-600 border-slate-200',
        primary: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border leading-none inline-flex items-center justify-center ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (count: number) => void;
    totalItems: number;
}> = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalItems }) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    แสดง
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#5e5ce6]"
                    >
                        {[10, 20, 50, 100].map(count => (
                            <option key={count} value={count}>{count}</option>
                        ))}
                    </select>
                    ต่อหน้า
                </div>
                <span>ทั้งหมด {totalItems} รายการ</span>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronDown size={18} className="rotate-90" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                                ? 'bg-[#5e5ce6] text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronDown size={18} className="-rotate-90" />
                </button>
            </div>
        </div>
    );
};

export const DropdownMenu: React.FC<{
    options: { label: string; onClick: () => void; variant?: 'default' | 'danger'; icon?: React.ReactNode }[];
    trigger?: React.ReactNode;
}> = ({ options, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger || (
                    <div className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                        <MoreVertical size={18} />
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-[100] py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                opt.onClick();
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${opt.variant === 'danger' ? 'text-red-600' : 'text-gray-700'
                                }`}
                        >
                            {opt.icon}
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
