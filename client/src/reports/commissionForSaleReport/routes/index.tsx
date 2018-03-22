import * as React from 'react';
import { addLocaleData, IntlProvider, injectIntl } from 'react-intl';
import Manager from './manager';
import IndexStore from '../stores/index';
import { ContextMessage } from '../../../common/components/context-message/index';

export default function (props: { locale: any }) {

    addLocaleData([...props.locale.localeData]);

    const usersContainer = (inject: any) => (
        <div className="container report driver-report">
            <ContextMessage messages={IndexStore.messages.messages} store={IndexStore.messages} />
            <Manager store={IndexStore}/>
        </div>
    );
    let InjectedContainer = injectIntl(usersContainer);

    return (
        <IntlProvider locale={props.locale.locale}>
            <InjectedContainer />
        </IntlProvider>
    );
}