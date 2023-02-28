export function formatNumber(number: number) {
    if (number == null) {
        return '';
    }
    return number.toLocaleString([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        minimumIntegerDigits: 1,
        useGrouping: true
    });
}
