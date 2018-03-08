import { Https } from '../util/https'; 

export default interface Store {
    errors: { [valueKey: string]: string };
    https: Https;
}