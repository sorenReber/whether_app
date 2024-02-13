
export function metersToMiles(visibilityInMeters: number) : string {
    const visibilityInMiles = visibilityInMeters / 1609.344;
    return `${visibilityInMiles.toFixed(0)} mi`;
}