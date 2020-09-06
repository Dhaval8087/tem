
function nth(d: number) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
function formatDate(date: Date) {
    return `${getTime(date.getHours().toString(), date.getMinutes().toString())}`
}
function eventDuration(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime()
    return Math.round((diff / 1000) / 60)
}
function getTime(hour: string, minute: string) {
    if (hour && minute) {
        return (hour.length > 1 ? hour : '0' + hour.slice(-1)) + ':' +
            (minute.length > 1 ? minute : '0' + minute.slice(-1));
    }
}
function getEventDateHeader(eventDate: Date) {
    const day = eventDate.getDate();
    return `${eventDate.toLocaleString('default', { weekday: 'long' })} ${day}${nth(day)} ${eventDate.toLocaleString('default', { month: 'long' })}`
}


export { formatDate, eventDuration,getEventDateHeader }