import { enToKrCountry } from "../constants/translateCountry"

export const translateCountry = (country:string) => {
    return enToKrCountry[country]
}