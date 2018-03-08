interface Option {
    [id: string]: string;
}
interface SelectProps {
    selectedOption: string | number;
    options: any[];
    labelKey?: string;
    valueKey?: string;
    placeholder?: string;
    onSelectChange: (change: string, valueName: string) => void;
    valueName?: string;
    onBlur?: () => void;
    onClose?: () => void;
    valueRenderer?: (option: any) => JSX.Element | string;
    optionRenderer?: (option: any) => JSX.Element | string;
    className?: string; 
    clear?: boolean; 
    labelColWidth?: string;
    inputColWidth?: string;
    disabled?: boolean; 
}

export default SelectProps;