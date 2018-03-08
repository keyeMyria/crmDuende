declare module 'react-telephone-input' {

    export interface ReactTelephoneInputCountry {
        name: string;
        iso2: string;
        dialCode: string;
        priority: number;
        format: string;
    }
    interface ReactTelephoneInputProps {
        value?: string;
        flagsImagePath?: string;
        initialValue?: string;
        autoFormat?: boolean;
        defaultCountry?: string;
        onlyCountries?: {}[];
        preferredCountries?: string[];
        classNames?: string;
        className?: string;
        inputId?: string;
        disabled?: boolean;
        pattern?: string;
        required?: boolean;
        onFocus?(phone: string, selectedCountry: ReactTelephoneInputCountry): void;
        onBlur?(phone: string, selectedCountry: ReactTelephoneInputCountry): void;
        onEnterKeyPress?(event: React.MouseEvent<HTMLInputElement>): void;
        onChange?(phone: string, selectedCountry: ReactTelephoneInputCountry): void;
    }

    type isNumberValid = (phoneNumber: string) => boolean;

    export const isNumberValid: isNumberValid;

    export default class ReactTelephoneInput extends React.Component<ReactTelephoneInputProps> { }

}    