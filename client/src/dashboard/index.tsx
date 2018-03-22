import CellphonesDashboard from './routes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import locale from 'locale';

declare global {
    interface Window {
        __localeId__: any;
        __dateDefaultFormat__: string;
        MountCellphonesDashboard?(idElement: string): void;
    }
}

window.__localeId__ = locale.dateFns;
window.__dateDefaultFormat__ = locale.dateDefaultFormat;
window.__locale_langugage__ = locale.locale;

window.MountCellphonesDashboard = (idElement: string) => {
    ReactDOM.render(
        <CellphonesDashboard locale={locale}/>,
        document.getElementById(idElement)
    );
};