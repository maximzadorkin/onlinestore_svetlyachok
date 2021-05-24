import {_getDataBaseConnection} from './Connector'

const getTransactions = (callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`
        SELECT Сделки.id, СтатусыСделки.Описание as СтатусСделки, Сделки.Чек_id as НомерЧека, клиенты.Фамилия as Клиент, сотрудники.Фамилия AS Сотрудник FROM Сделки 
        left join СтатусыСделки on Сделки.СтатусыСделки_id = СтатусыСделки.id
        left join клиенты on Сделки.Клиенты_id = Клиенты.id
        left join сотрудники on Сделки.Сотрудники_id = Сотрудники.id
    `, callback)
    connection.end()
}

const add = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`insert into ?(?) values();`, callback)
    connection.end()
}

const update = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`update ? set ? where id='${row.id}';`, callback)
    connection.end()
}

const del = (row, callback = null) => {
    const connection = _getDataBaseConnection()
    connection.connect()
    connection.query(`delete from ? where id='${row.id}';`, callback)
    connection.end()
}

export default { getTransactions, add, update, del }