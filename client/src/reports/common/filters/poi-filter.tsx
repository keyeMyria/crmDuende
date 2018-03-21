import * as React from 'react';
import Select from '../../../common/components/select/index';
import { Poi } from '../../../common/types/poi';
import PoiGroup from '../../../common/types/poi-group';
import { FormattedMessage } from 'react-intl';
import { PoiIcon } from '../components/poi-icon';
import { PoiGroupIcon } from '../components/poi-group-icon';

enum POSITION {
    A_FIRST = -1,
    SAME,
    B_FIRST
}

enum BASIC_OPTIONS {
    ANY = -1,
    NONE
}

enum OPTIONS_TYPE {
    POI,
    POI_GROUP,
    BASIC
}

interface BasicOption {
    id: number;
    name: string;
}

type PoiFilterOption = BasicOption | Poi | PoiGroup;

export interface PoiFilterProps {
    onChange: (pois: string[] | string, valueName?: string) => void;
    value: string[] | string;
    poiItems: (Poi | PoiGroup)[];
    isLoading: boolean;
    valueName?: string;
    placeholder?: string;
    isMulti?: boolean;
    basicOptions?: boolean;
    onClose?(): void;
}

export function PoiFilter(props: PoiFilterProps) {

    const isGroup = (option: PoiFilterOption) => getOptionType(option) === OPTIONS_TYPE.POI_GROUP;
    const isMulti = props.isMulti !== false;

    const joinBasicOptions = (items: (PoiGroup | Poi)[]) => {
        const options: (Poi | PoiGroup | BasicOption)[] = [
            { name: 'common.any_poi', id: BASIC_OPTIONS.ANY },
            { name: 'common.none_poi', id: BASIC_OPTIONS.NONE }
        ];
        return options.concat(items);
    };

    const getOptionType = (option: PoiFilterOption) => {
        if (option.id <= 0) {
            return OPTIONS_TYPE.BASIC;
        }
        const { id } = option as Poi | PoiGroup;
        if (id.includes('g-')) {
            return OPTIONS_TYPE.POI_GROUP;
        }
        return OPTIONS_TYPE.POI;
    };

    const getLabelOption = (option: PoiFilterOption) => {
        if (isGroup(option)) {
            const poiGroup = option as PoiGroup;
            return poiGroup.name.toLowerCase();
        } else {
            const pois = option as Poi;
            return pois.name.toLowerCase();
        }
    };

    const sortOptions = (a: Poi | PoiGroup, b: Poi | PoiGroup) => {
        const aIsGroup = isGroup(a), bIsGroup = isGroup(b);
        if ((aIsGroup && bIsGroup) || (!aIsGroup && !bIsGroup)) {
            const aKey = getLabelOption(a);
            const bKey = getLabelOption(b);
            if (aKey > bKey) {
                return POSITION.B_FIRST;
            } else if (aKey < bKey) {
                return POSITION.A_FIRST;
            } else { return POSITION.SAME; }
        } else if (aIsGroup && !bIsGroup) {
            return POSITION.A_FIRST;
        } else {
            return POSITION.B_FIRST;
        }
    };

    const filterOption = (option: PoiFilterOption, query: string) => {
        if (isGroup(option)) {
            const { name } = option as PoiGroup;
            return name.toLowerCase().includes(query);
        } else {
            const { name } = option as Poi;
            return name.toLowerCase().includes(query);
        }
    };

    const renderOption = (option: PoiFilterOption) => {
        const optionType = getOptionType(option);
        if (optionType === OPTIONS_TYPE.BASIC) {
            return (<FormattedMessage id={option.name} />);
        } else if (optionType === OPTIONS_TYPE.POI) {
            const poi: Poi = option as Poi;
            return (<div><PoiIcon color={poi.color} /> {poi.name}</div>);
        } else {
            const group = option as PoiGroup;
            return (<div><PoiGroupIcon color={group.color} /> {group.name}</div>);
        }
    };

    const sortedOptions = props.poiItems.sort(sortOptions);

    return (
        <Select
            value={props.value}
            options={props.basicOptions ? joinBasicOptions(sortedOptions) : sortedOptions}
            valueName={props.valueName}
            clearable={true}
            valueKey="id"
            labelKey="name"
            handleChange={props.onChange}
            multi={isMulti}
            placeholder={props.placeholder || <FormattedMessage id="common.all" />}
            isLoading={props.isLoading}
            valueRenderer={renderOption}
            optionRenderer={renderOption}
            filterOption={filterOption}
            searchable={true}
            onClose={props.onClose}
            className="driver-selector"
        />
    );
}