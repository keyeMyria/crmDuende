interface Cellphone {
    id: string;
    description: string;
    model?: string;
    make?: string;
    tags?: string[];
    country?: string;
    phone_number?: string;
    os?: number;
    app_version?: string;
    registered?: boolean; 
    account_id?: string; 
    creation_date?: string; 
    registration_code?: string;
  }
  
  export default Cellphone;
  