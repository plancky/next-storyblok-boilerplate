export default function reformatDate(dateStr: string) {
    // Split the date part and time part
    const [datePart, timePart] = dateStr.split(' ')

    // Split the date into components
    const [year, month, day] = datePart.split('-')

    // Return the new format
    return `${day}.${month}.${year}`
}

export const formatDateInDigits = (date: string) => {
    return new Date(date)
        .toLocaleDateString('en-uk', {
            weekday: undefined,
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        })
        .replace(/\//g, '.')
}

export const formatDateInShortForm = (date: string) => {
    return new Date(date)
        .toLocaleDateString('en-GB', {
            weekday: undefined,
            day: '2-digit',
            year: 'numeric',
            month: 'short',
        })
        .replace(/\,/g, '')
}
