export type AlertType = 'info' | 'success' | 'error' | 'warning';

export default interface Message {
    id: string;
    message: string | JSX.Element;
    type: AlertType;
}