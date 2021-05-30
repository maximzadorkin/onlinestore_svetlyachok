import _ from 'lodash'

const forDatabase = stringDate => stringDate.split('-').join('.')

const forCRM = stringDate => {
    const date = new Date(stringDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

export default {
    forDatabase,
    forCRM
}