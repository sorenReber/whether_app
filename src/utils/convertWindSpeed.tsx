export function convertWindSpeed(speedInMetersPerSecond: number) : string {
    const speedInMilesPerHour = speedInMetersPerSecond * 2.23694;
    return `${speedInMilesPerHour.toFixed(0)} mph`;
}