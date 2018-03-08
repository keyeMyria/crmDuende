import * as React from 'react';
import { Title as title } from './title';
import './styles.css';

export interface ContainerProps {
    children: any | any[];
    style?: {};
    class?: string;
}

export function Container (props: ContainerProps) {
    return (
      <div className={`card-container ${props.class && props.class}`} style={props.style}>
        {props.children}
      </div>
    );
}

export const Title = title;