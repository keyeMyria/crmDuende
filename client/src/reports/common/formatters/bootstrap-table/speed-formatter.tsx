import * as React from 'react';

export function speedFormatter(avgSpeed: number, row: {}) {
        return (
            <div> 
                {(text: string) => (
                    <span>{avgSpeed} {text} </span>
                )}
           </div> 
        );
    }