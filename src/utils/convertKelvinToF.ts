/** format */

export default function convertKelvinToF(kelvin: number) : number {
    return Math.floor((kelvin - 273.15) * 9 / 5 + 32);
    
}