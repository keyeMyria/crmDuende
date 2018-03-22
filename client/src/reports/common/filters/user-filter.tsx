import * as React from 'react';
import Select from '../../../common/components/select/index';
import { User } from '../../../users/types';


enum POSITION {
    A_FIRST = -1,
    SAME,
    B_FIRST
}

export interface UsersFiltersProps {
    onChange: (users: string[], valueName?: string) => void;
    value: string[];
    usersItems: User[];
    isLoading?: boolean;
    valueName?: string;
    onClose?(): void;
}

export default function UsersFilter(props: UsersFiltersProps) {

    const isGroup = (option: any | User) => option.id.includes('g-');

    const getLabelOption = (option: User) => {
        const user = option as User;
        return (user.lastName || user.name || '').toLowerCase();

    };

    const sortOptions = (a: User, b: User) => {
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

    const filterOption = (option: User, query: string) => {
        if (isGroup(option)) {
            const { name, id } = option as any;
            return (name || id || '').toLowerCase().includes(query);
        } else {
            const { lastName, name } = option as User;
            return (lastName || name || '').toLowerCase().includes(query);
        }
    };

    const renderOption = (option: User) => {
        return <div>{option.name}</div>;
    };

    return (
        <Select
            value={props.value}
            options={props.usersItems.sort(sortOptions)}
            valueName={props.valueName}
            clearable={true}
            valueKey="id"
            handleChange={props.onChange}
            multi={true}
            placeholder={"Filtrar usuarios"}
            optionRenderer={renderOption}
            valueRenderer={renderOption}
            filterOption={filterOption}
            isLoading={props.isLoading}
            searchable={true}
            onClose={props.onClose}
        />
    );
}