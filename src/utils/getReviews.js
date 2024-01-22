const getReviews = (comments) => {
    if (comments?.length === 0) {
        return 'Нет отзывов'
    }
    if (comments?.length % 10 === 1 && comments?.length % 100 !== 11) {
        return `${comments?.length} отзыв`
    }
    if (
        comments?.length % 10 >= 2 &&
        comments?.length % 10 <= 4 &&
        (comments?.length % 100 < 10 || comments?.length % 100 >= 20)
    ) {
        return `${comments?.length} отзыва`
    }
    return `${comments?.length} отзывов`
};

export default getReviews;
