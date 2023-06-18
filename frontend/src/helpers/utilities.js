
export const buildCities = (data) => {
    return data.map( city => {
        return ({label: city.שם_ישוב_לועזי , value: city._id})
    })
}