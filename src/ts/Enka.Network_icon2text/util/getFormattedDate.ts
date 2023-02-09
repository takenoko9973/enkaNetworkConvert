export function getFormattedDate(date: Date, format: string) {
    const symbol = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };

    const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) => {
        const num = symbol[v.slice(-1) as keyof typeof symbol].toString();
        if (v.length > 1) {
            return ("0" + num).slice(-2);  // 一桁の場合、0を入れる。二桁の場合はそのまま
        } else {
            return num;
        }
    });

    return formatted.replace(/(y+)/g, (v) =>
        date.getFullYear().toString().slice(-v.length)
    );
}
