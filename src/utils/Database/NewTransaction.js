import {_getDataBaseConnection} from './Connector'

const getSalers = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`
        select сотрудники.id, сотрудники.Фамилия from сотрудники
        left join должности_сотрудники on сотрудники.id = должности_сотрудники.Сотрудники_id
        left join должности on должности.id = должности_сотрудники.Должности_id
        where должности.Наименование='Продавец'
    `, callback)
    connection.end()
}

const newTransaction = data => {
    const date = new Date()
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(``)
    connection.end()
}


export default { getSalers }