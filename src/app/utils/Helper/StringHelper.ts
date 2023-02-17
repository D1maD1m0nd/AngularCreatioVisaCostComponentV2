export function formatNumber(number : Number) {
    return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        minimumIntegerDigits: 1,
        useGrouping: true
    });
}
