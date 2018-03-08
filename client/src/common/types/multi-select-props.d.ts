export interface Option {
    [id: string]: string;
}

interface MultiSelectProps {
    selectedOptions: string[] | number[];
    options: any[]; //TODO: Use a explicit type
    labelKey?: string;
    valueKey?: string;
    placeholder?: string;
    onSelectChange: (change: string[], valueName: string) => void;
    valueName?: string;
    valueRenderer?: (option: any) => JSX.Element | string;
    optionRenderer?: (option: any) => JSX.Element | string;
    isLoading?: boolean;
    onBlur?: () => void;
    onClose?: () => void;
    disabled?: boolean; 
}

export default MultiSelectProps;
