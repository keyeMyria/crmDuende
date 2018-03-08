declare module 'react-json-view' {

    interface InteractionObject {
        updated_src: {};
        name: string;
        namespace: string;
        new_value: any;
        existing_value: any;
    }

    // Return false to prevent interaction effects
    type OnInteractionCallback = (obj: InteractionObject) => boolean;

    interface ReactJsonProps {
        src: {};
        name?: string | false;
        style?: {};
        iconStyle?: 'circle' | 'triangle' | 'square';
        indentWidth?: number;
        collapse?: boolean | number;
        collapseStringsAfterLength?: number;
        groupArraysAfterLength?: number;
        enableClipboard?: boolean | OnInteractionCallback;
        displayObjectSize?: boolean;
        displayDataTypes?: boolean;
        onEdit?: OnInteractionCallback;
        onAdd?: OnInteractionCallback;
        onDelete?: OnInteractionCallback;
        onSelect?: OnInteractionCallback;
        validationMessage?: string;
    }

    export default class ReactJson extends React.Component<ReactJsonProps> {

    }
}