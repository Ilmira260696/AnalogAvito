import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns'
import { ru } from 'date-fns/locale'

const formatDateTime = (date) => {
    if (isToday(date)) {
        return `Сегодня, в ${format(date, 'HH:mm', { locale: ru })}`
    }
    if (isYesterday(date)) {
        return `Вчера, в ${format(date, 'HH:mm', { locale: ru })}`
    }
    if (isThisWeek(date)) {
        return `${format(date, 'eeee, в HH:mm', { locale: ru })}`
    }
    if (isThisYear(date)) {
        return `${format(date, 'dd MMMM, в HH:mm', { locale: ru })}`
    }
    return `${format(date, 'dd MMMM yyyy', { locale: ru })}`
};

const formatDateSellsProduct = (date) => {
    const formatDate = format(date, 'MMMM yyyy', { locale: ru })

    return `Продает товары с ${formatDate}`
};

export { formatDateTime, formatDateSellsProduct }
