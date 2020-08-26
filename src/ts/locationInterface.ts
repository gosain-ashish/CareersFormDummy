export interface country{

    Country: string;
    States: states[];
}

export interface states{
    State: string;
    city: string[];
}

export interface location{

    countries: string;
    stateV: {
        State: string;
        city: string[];
    }[];
  //  getcities: ()=> string[]
    
}

export interface eachCountryData{

    country: string;
    state: string;
    city: string;
}

