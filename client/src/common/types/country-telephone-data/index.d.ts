declare module 'country-telephone-data' {

    interface CountryData {
        name: string;
        iso2: string;
        dialCode: string;
        format: string;
        hasAreaCodes: boolean;
    }

    interface CountryTelephoneData {
        allCountries: CountryData[],
        allCountryCodes: string[][];
        iso2Lookup: {
            [iso2: string]: CountryData;
        };
    }

    const module: CountryTelephoneData;
    export default module;

}