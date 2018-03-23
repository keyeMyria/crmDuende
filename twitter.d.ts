import NodeURL = require('url');
export interface twitter {
    id: number;
    created_at: Date;
    id_str?: number;
    text: string;
    url: string;
    display_url?:string;
    expanded_url?: string;
    location: string
}