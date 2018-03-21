import * as React from 'react';
import Select from '../../../common/components/select/index';
import { FormattedMessage } from 'react-intl';
import { User, UserGroup } from '../../../users-manager/types/index';

enum POSITION {
    A_FIRST = -1,
    SAME,
    B_FIRST
}

export interface UsersFiltersProps {
    onChange: (users: string[], valueName?: string) => void;
    value: string[];
    usersItems: (User | UserGroup)[];
    isLoading?: boolean;
    valueName?: string;
    onClose?(): void;
}

export default function UsersFilter(props: UsersFiltersProps) {

    const isGroup = (option: UserGroup | User) => option.id.includes('g-');

    const getLabelOption = (option: User | UserGroup) => {
        if (isGroup(option)) {
            const userGroup = option as UserGroup;
            return userGroup.name.toLowerCase();
        } else {
            const user = option as User;
            return (user.first_name || user.last_name || user.name || '').toLowerCase();
        }
    };

    const sortOptions = (a: User | UserGroup, b: User | UserGroup) => {
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

    const filterOption = (option: User | UserGroup, query: string) => {
        if (isGroup(option)) {
            const { name, id } = option as UserGroup;
            return (name || id || '').toLowerCase().includes(query);
        } else {
            const { first_name, last_name, name } = option as User;
            return (first_name || last_name || name || '').toLowerCase().includes(query);
        }
    };

    const renderGroup = (group: UserGroup) => (
        <FormattedMessage id="global.group">
            {(text: string) => (
                <div>{text}: {group.name}</div>
            )}
        </FormattedMessage>
    );

    const renderOption = (option: User | UserGroup) => {
        if (option.id.includes('g-')) {
            return renderGroup(option as UserGroup);
        } else {
            return <div>{option.name}</div>;
        }
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
            placeholder={<FormattedMessage id="common.filters.all_users" />}
            optionRenderer={renderOption}
            valueRenderer={renderOption}
            filterOption={filterOption}
            isLoading={props.isLoading}
            searchable={true}
            className="driver-selector"
            onClose={props.onClose}
        />
    );
}