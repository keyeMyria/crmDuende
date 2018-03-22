import * as React from 'react';
import { addLocaleData, IntlProvider, injectIntl } from 'react-intl';
import flattenMessages from '../../common/util/flatten-message';
import '../../reports/checkin-report/styles/charts.css';
import '../styles/cellphones-dashboard.css';
import CellphonesDashboard from './cellphones-dashboard';
import store from '../store';

export interface RouteProps {
  locale: any;
}

export default function Route(props: RouteProps) {

  addLocaleData([...props.locale.localeData]);

  const container = (injected: {}) => (
    <CellphonesDashboard store={store} />
  );

  const InjectedContainer = injectIntl(container);

  return (
    <IntlProvider locale={props.locale.locale} messages={flattenMessages(props.locale.messages)}>
      <InjectedContainer />
    </IntlProvider>
  );
}
