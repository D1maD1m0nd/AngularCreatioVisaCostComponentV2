export function formatNumber(number: number) {
    if (number == null) {
        return '';
    }
    return number.toLocaleString([], {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        minimumIntegerDigits: 1,
        useGrouping: true
    });
}
