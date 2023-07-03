
const isNotEmpty = (str) => {
    return (str.length !== 0);
}

export const validatorForm = (() => {

    const validNotEmpty = (str) => {
        return{
            isValid: isNotEmpty(str),
            message: 'Please enter a non empty text'
        }
    }

    const hasOnlyLetters = (str) => {
        return {
            isValid: /^[a-zA-Z]+( [a-zA-Z]+)?$/.test(str),
            message: 'text must contain letter only'
        }
    }

    const isCellularNumber = (str) => {
        return{
            isValid: /^(05|\+9725)(\d{8}|\d-\d{7}|\d-\d{3}-\d{4}|\d-\d{4}-\d{3})$/.test(str),
            message: 'Please enter a legal cellular number'
        }
    }

    const isLandLineNumber = (str) => {
        return{
            isValid: /^(0|\+972)(\d{9}|\d{2}-\d{7}|\d{2}-\d{3}-\d{4}|\d{2}-\d{4}-\d{3})$/.test(str),
            message: 'Please enter a legal land line number'
        }
    }

    const validateZipCode = (str) => {
        return{
            isValid: /^\d{7}$/.test(str),
            message: 'Please enter a legal zip code'
        }
    }

    return{
        validNotEmpty,
        hasOnlyLetters,
        isCellularNumber,
        isLandLineNumber,
        validateZipCode
    }

})();