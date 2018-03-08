import * as React from 'react';
import * as JsSearch from 'js-search';

export interface InputFilterProps {
    value?: string;
    valueKey?: string;
    filterKeys?: string[];
    className?: string;
    placeholder?: string;
    forceSearch?: boolean;
    options: object[];
    disabled?: boolean;
    onChange(filtered: object[], query: string): void;
}

interface InputFilterState {
    query: string;
    forceSearch?: boolean;
}

export default class InputFilter extends React.Component<InputFilterProps, InputFilterState> {

    state = {
        query: this.props.value || ''
    };

    search: JsSearch.Search;

    componentDidMount() {
        this.configSearch(this.props);
    }

    componentWillReceiveProps(nextProps: InputFilterProps) {
        if (this.props.options.length !== nextProps.options.length) {
            this.configSearch(nextProps);
        }
    }

    configSearch = (props: InputFilterProps) => {
        this.search = new JsSearch.Search(props.valueKey || 'id');
        if (props.filterKeys && props.filterKeys.length > 0) {
            props.filterKeys.forEach(key => this.search.addIndex(key));
        } else {
            const option = props.options[0] || {};
            const keys = Object.keys(option);
            keys.forEach(key => {
                if ( option[key] && typeof option[key] === 'object') {
                    this.search.addIndex(
                        this.objectKeysToArray(option[key], key)
                    );
                } else if (option[key]) {
                    this.search.addIndex(key);
                }
            });
        }
        this.search.addDocuments(props.options);
    }

    browse = (query: string) => {
        this.setState({ query });
        if (query.trim() === '') {
            this.props.onChange(this.props.options, '');
        } else {
            const results = this.search.search(query);
            this.props.onChange(results, query);
        }
    }

    objectKeysToArray = (object: Object, name: string) => [name].concat(Object.keys(object));

    onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.browse(query);
    }

    render() {
        return (
            <input
                type="text"
                className={this.props.className}
                value={this.state.query}
                onChange={this.onChangeFilter}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        );
    }
}