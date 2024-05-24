import { enToKrCountry } from "../constants/translateLanguage"

export const translateCountry = (country:string) => {
    return enToKrCountry[country]
}