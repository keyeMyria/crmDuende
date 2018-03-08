declare module 'react-dates-presets' {

    interface PresetRange {
        id: string;
        label: string;
        range: {
            // TODO: Use moment type
            startDate: any;
            endDate: any;
        }
    }

    interface PresetsValue {
        startDate: any;
        endDate: any
    }

    interface ReactDatesPresetsProps {
        value: PresetsValue;
        ranges?: PresetRange[];
        onChange?(value: PresetsValue): void;
        customRangeLabel?: string | JSX.Element;
        
        // input related props
        startDatePlaceholderText?: string;
        endDatePlaceholderText?: string;
        disabled?: boolean;
        required?: boolean;
        readOnly?: boolean;
        screenReaderInputMessage?: string;
        showClearDates?: boolean;
        showDefaultInputIcon?: boolean;
        customInputIcon?: JSX.Element;
        customArrowIcon?: JSX.Element;
        customCloseIcon?: JSX.Element;

        // calendar presentation and interaction related props
        horizontalMargin?: number;
        withPortal?: boolean;
        withFullScreenPortal?: boolean;
        daySize?: number;
        isRTL?: boolean;
        firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        numberOfMonths?: number;
        keepOpenOnDateSelect?: boolean;
        initialVisibleMonth?:any;
        hideKeyboardShortcutsPanel?: boolean;

        // day presentation and interaction related props
        isOutsideRange?(date: any): boolean;

        // internationalization props
        monthFormat?: string;
        weekDayFormat?: string;
        displayFormat?: string; 
    }

    export default class ReactDatesPresets extends React.Component<ReactDatesPresetsProps> {

    }
}