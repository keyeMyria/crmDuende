import * as React from 'react';
import CustomSelect, { CustomSelectProps } from '../select';
import { Validator } from './validator';
import { validate } from './validate';

export interface SelectValidationProps extends CustomSelectProps {
    validators: Validator[];
    intlId: string;
    valueName: string;
    forceVerify?: boolean;
    onChangeError?: (valueName: string, error?: string | JSX.Element | null, wasForced?: boolean) => void;
}

interface SelectValidationState {
    errorMessages: string | JSX.Element | null;
    wasForcedToVerify: boolean;
}

export default class SelectValidation extends React.Component<SelectValidationProps, SelectValidationState> {

    state: SelectValidationState = {
        errorMessages: null,
        wasForcedToVerify: false
    };

    componentWillReceiveProps(nextProps: SelectValidationProps) {
        if (this.isSomeChange(this.props.value, nextProps.value)) {
            this.validateSelect(nextProps);
        } else if (nextProps.forceVerify && !this.state.wasForcedToVerify) {
            this.validateSelect(nextProps);
            this.setState({ wasForcedToVerify: true });
        }
    }

    isSomeChange = (a: CustomSelectProps['value'], b: CustomSelectProps['value']): boolean => {
        if (Array.isArray(a) && Array.isArray(b)) {
            const arrayA = ([] as any[]).concat(a);
            const arrayB = ([] as any[]).concat(b);
            return arrayA.some(x => !arrayB.includes(x)) || arrayB.some(x => !arrayA.includes(x));
        } else {
            return a !== b;
        }
    }

    validateSelect = (props: SelectValidationProps, wasForced?: boolean) => {
        const errorMessages = validate(props.validators, props.value, props.intlId);
        if (props.onChangeError) { props.onChangeError(props.valueName, errorMessages, wasForced); }
        this.setState({ errorMessages });
    }

    handleValidate = () => {
        this.validateSelect(this.props);
    }

    render() {
        const shouldShowErrors = !!this.state.errorMessages;
        return (
            <div>
                <CustomSelect {...this.props} onBlur={this.handleValidate} />
                {shouldShowErrors && (
                    <label className="label-validation-alert">{this.state.errorMessages}</label>
                )}
            </div>
        );
    }
}
