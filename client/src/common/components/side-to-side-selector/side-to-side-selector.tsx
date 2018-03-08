import * as React from 'react';
import Title from './title';
import InputFilter from '../input-filter';
import Option from './option';
import { FormattedMessage } from 'react-intl';
import './side-to-side-selector.css';

export interface SideToSideSelectorProps {
    options: {}[];
    valueKey: string;
    filterKeys: string[];
    selectedOptions: {}[];
    picturePlaceholder: string | NodeRequire;
    pictureKey: string;
    titleKey: string;
    subtitleKey: string;
    filterPlaceholder?: string;
    noItemsText?: string;
    isFetching?: boolean;
    disabled?: boolean;
    rendererTitle?(option: {}): string | JSX.Element;
    rendererSubtitle?(option: {}): string | JSX.Element;
    renderPicture?(option: {}): JSX.Element;
    sortFunction?(a: {}, b: {}): number;
    onChange(selected: {}[]): void;
}

interface SideToSideSelectorState {
    availableFiltered: {}[];
    selectedFiltered: {}[];
    wasFiltered: boolean;
}

export default class SideToSideSelector extends React.Component<SideToSideSelectorProps, SideToSideSelectorState> {

    state = {
        availableFiltered: [],
        selectedFiltered: [],
        wasFiltered: false
    };

    componentDidMount() {
        this.setState({
            availableFiltered: this.props.options,
            selectedFiltered: this.props.options
        });
    }

    componentWillReceiveProps(nextProps: SideToSideSelectorProps) {
        if (
            !nextProps.isFetching &&
            !this.state.wasFiltered &&
            (this.state.availableFiltered.length !== nextProps.options.length
                || this.state.selectedFiltered.length !== nextProps.options.length)) {
            this.setState({
                availableFiltered: nextProps.options,
                selectedFiltered: nextProps.options
            });
        }
    }

    getAvailableOptions = () => {
        const selectedOptions = this.props.selectedOptions.map(option => option[this.props.valueKey]);
        return this.props.options.filter(
            option => !selectedOptions.includes(option[this.props.valueKey])
        );
    }

    isntAvailable = (options: {}[]) => (!this.props.isFetching && options.length === 0);

    sortOptions = (a: {}, b: {}) => {
        const titleA = `${a[this.props.titleKey] || ''}`.toLowerCase();
        const titleB = `${b[this.props.titleKey] || ''}`.toLowerCase();
        if (titleA > titleB) { return 1; }
        if (titleA < titleB) { return -1; }
        return 0;
    }

    onChangeFilterAvailable = (results: {}[], query: string) => {
        this.setState({ availableFiltered: results, wasFiltered: true });
    }

    onChangeFilterSelcted = (results: {}[], query: string) => {
        this.setState({ selectedFiltered: results, wasFiltered: true });
    }

    onClickOption = (clickedOption: {}) => {
        const { valueKey } = this.props;
        const selectedOptions = this.props.selectedOptions.map(option => option[valueKey]);
        this.props.onChange(selectedOptions.includes(clickedOption[valueKey])
            ? this.props.selectedOptions.filter(option => option[valueKey] !== clickedOption[valueKey])
            : this.props.selectedOptions.concat(clickedOption)
        );
    }

    renderOptions = (options: {}[], isSelected?: boolean) => options.map((option, index) => (
        <Option
            option={option}
            pictureKey={this.props.pictureKey}
            picturePlaceholder={this.props.picturePlaceholder}
            titleKey={this.props.titleKey}
            subtitleKey={this.props.subtitleKey}
            subTitleRenderer={this.props.rendererSubtitle}
            titleRenderer={this.props.rendererTitle}
            pictureRender={this.props.renderPicture}
            key={`ssoption-${option[this.props.valueKey]}`}
            onClick={this.onClickOption}
            isSelected={isSelected}
            disabled={this.props.disabled}
        />
    ))

    renderIsNotAvailable = () => (
        <div className="stsa-no-items">
            {
                this.props.noItemsText || (
                    <FormattedMessage id="global.side_to_side_selector.no_items" />
                )
            }
        </div>
    )

    renderAvailableSide = () => {
        const availableOptions = this.getAvailableOptions();
        const filteredKeys = this.state.availableFiltered.map(option => option[this.props.valueKey]);
        const filteredOptions = availableOptions.filter(option => filteredKeys.includes(option[this.props.valueKey]));
        const sortedOptions = filteredOptions.sort(this.props.sortFunction || this.sortOptions);
        return (
            <div className="side-container">
                <div className="side-title-container">
                    <Title
                        title_one="global.side_to_side_selector.available_one"
                        title_many="global.side_to_side_selector.available_many"
                        count={availableOptions.length}
                    />
                </div>
                <div className="side-box">
                    <div>
                        <InputFilter
                            valueKey={this.props.valueKey}
                            options={this.props.options}
                            onChange={this.onChangeFilterAvailable}
                            className="form-control side-filter-input"
                            placeholder={this.props.filterPlaceholder}
                            filterKeys={this.props.filterKeys}
                            disabled={this.props.disabled || this.props.isFetching}
                        />
                    </div>
                    <div className="side-list">
                        {
                            this.isntAvailable(sortedOptions)
                                ? this.renderIsNotAvailable()
                                : this.renderOptions(sortedOptions)
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderSelectedSide = () => {
        const filteredKeys = this.state.selectedFiltered.map(option => option[this.props.valueKey]);
        const filteredOptions = this.props.selectedOptions.filter(
            option => filteredKeys.includes(option[this.props.valueKey])
        );
        const sortedOptions = filteredOptions.sort(this.props.sortFunction || this.sortOptions);

        return (
            <div className="side-container">
                <div className="side-title-container">
                    <Title
                        title_one="global.side_to_side_selector.selected_one"
                        title_many="global.side_to_side_selector.selected_many"
                        count={this.props.selectedOptions.length}
                    />
                </div>
                <div className="side-box">
                    <div>
                        {
                            !this.props.isFetching &&
                            (
                                <InputFilter
                                    valueKey={this.props.valueKey}
                                    options={this.props.options}
                                    onChange={this.onChangeFilterSelcted}
                                    className="form-control side-filter-input"
                                    placeholder={this.props.filterPlaceholder}
                                    filterKeys={this.props.filterKeys}
                                    disabled={this.props.disabled || this.props.isFetching}
                                />
                            )
                        }
                    </div>
                    <div className="side-list">
                        {
                            this.isntAvailable(sortedOptions)
                                ? this.renderIsNotAvailable()
                                : this.renderOptions(sortedOptions, true)
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="side-side-container">
                {this.renderAvailableSide()}
                {this.renderSelectedSide()}
            </div>
        );
    }
}