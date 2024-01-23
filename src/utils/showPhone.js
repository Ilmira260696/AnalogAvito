const showPhone = ({ isShowPhone, data }) => {
    const firstDigit = data?.phone?.match(/\d/)[0]
    const nextThreeDigits = data?.phone?.match(/\d{3}/)[0]

    if (isShowPhone) {
        return data.phone
    }
    return `${firstDigit} ${nextThreeDigits} ХХХ ХХ ХХ`
};
export default showPhone