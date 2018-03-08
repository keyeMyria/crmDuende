declare module 'react-alert'{

    interface AlertContainerProps {
        offset?: number;
        position?: 'bottom left' | 'bottom right' | 'top right' | 'top left' | 'top center' | 'bottom center';
        theme?: 'dark' | 'light';
        time?: number;
        transition?: 'scale' | 'fade';
    }

    type OptionsType = {
        time?: number; // In ms, 0 to prevent auto close
        id?: string;
        icon?: JSX.Element;
        type?: 'info' | 'error' | 'success';
        onClose?(): void;
    }


    export default class AlertContainer extends React.Component<AlertContainerProps> {
        success(message: string | JSX.Element, options?: OptionsType): string;
        error(message: string | JSX.Element, options?: OptionsType): string;
        info(message: string | JSX.Element, options?: OptionsType): string;
        show(message: string | JSX.Element, options?: OptionsType): string;
        removeAlert(id: string): void;
        removeAll(): void;
    }
}